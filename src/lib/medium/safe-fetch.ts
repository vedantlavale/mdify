// SSRF-safe fetching for user-supplied article URLs.
//
// Mdify downloads whatever URL a visitor pastes, from our own server. Every
// request therefore has to be limited to the public internet:
//   - https only, no credentials, no custom ports, no IP-literal hosts
//   - the resolved address is checked at connect time (inside the socket's own
//     DNS lookup), so a hostname can't pass a check and then rebind to a
//     private address before the connection is made
//   - redirects are followed manually and every hop is re-validated
//   - the whole chain has a deadline, and the response body has a size cap

import https from "node:https";
import dns from "node:dns";
import { BlockList, isIP } from "node:net";
import type { Readable } from "node:stream";
import type { IncomingHttpHeaders } from "node:http";
import { createBrotliDecompress, createGunzip, createInflate } from "node:zlib";
import { HEADERS } from "./constants";

/** The request was refused by policy; retrying cannot help. */
export class FetchRejectedError extends Error {}

/** The URL itself is unacceptable. Safe to show to the caller. */
export class UnsafeUrlError extends FetchRejectedError {}

const DEFAULT_TIMEOUT_MS = 15_000;
const DEFAULT_MAX_BYTES = 5 * 1024 * 1024;
const DEFAULT_MAX_REDIRECTS = 5;

// Loopback, private, link-local (cloud metadata lives at 169.254.169.254),
// CGNAT, documentation, multicast and other non-public ranges.
const blockedRanges = new BlockList();
const BLOCKED_IPV4: [string, number][] = [
  ["0.0.0.0", 8],
  ["10.0.0.0", 8],
  ["100.64.0.0", 10],
  ["127.0.0.0", 8],
  ["169.254.0.0", 16],
  ["172.16.0.0", 12],
  ["192.0.0.0", 24],
  ["192.0.2.0", 24],
  ["192.88.99.0", 24],
  ["192.168.0.0", 16],
  ["198.18.0.0", 15],
  ["198.51.100.0", 24],
  ["203.0.113.0", 24],
  ["224.0.0.0", 4],
  ["240.0.0.0", 4],
];
const BLOCKED_IPV6: [string, number][] = [
  ["::", 128],
  ["::1", 128],
  // No ::ffff:0:0/96 here: BlockList maps IPv4 into that range, so adding it
  // would block every IPv4 address. Mapped addresses are matched against the
  // IPv4 ranges above instead.
  ["64:ff9b::", 96], // NAT64
  ["64:ff9b:1::", 48],
  ["100::", 64],
  ["2001::", 23], // IETF protocol assignments (Teredo, ORCHID, ...)
  ["2001:db8::", 32],
  ["2002::", 16], // 6to4
  ["fc00::", 7], // unique local
  ["fe80::", 10], // link-local
  ["fec0::", 10],
  ["ff00::", 8],
];
for (const [address, prefix] of BLOCKED_IPV4) blockedRanges.addSubnet(address, prefix, "ipv4");
for (const [address, prefix] of BLOCKED_IPV6) blockedRanges.addSubnet(address, prefix, "ipv6");

/** True for anything that is not a plain public unicast address. */
export function isBlockedAddress(address: string): boolean {
  const family = isIP(address);
  if (!family) return true;
  try {
    return blockedRanges.check(address, family === 4 ? "ipv4" : "ipv6");
  } catch {
    return true;
  }
}

/** Parses a URL and enforces the static rules (no network access). */
export function parsePublicHttpsUrl(raw: string): URL {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new UnsafeUrlError("Invalid URL. Please provide a valid article URL.");
  }
  if (url.protocol !== "https:") {
    throw new UnsafeUrlError("Only https:// URLs are supported.");
  }
  if (url.username || url.password) {
    throw new UnsafeUrlError("URLs with embedded credentials are not supported.");
  }
  if (url.port) {
    throw new UnsafeUrlError("URLs with a custom port are not supported.");
  }
  const host = url.hostname.toLowerCase().replace(/\.$/, "");
  // `new URL` normalises decimal/hex/octal IPv4 forms, so isIP covers those.
  // IPv6 literals keep their brackets, so they are caught by the ":" check.
  if (!host || isIP(host) || host.includes(":") || !host.includes(".")) {
    throw new UnsafeUrlError("Please use a public website address, not an IP address or internal host.");
  }
  return url;
}

// Runs inside the socket's connect, so the addresses checked here are the ones
// actually dialled.
function guardedLookup(
  hostname: string,
  options: dns.LookupOptions,
  callback: (err: NodeJS.ErrnoException | null, address: string | dns.LookupAddress[], family?: number) => void
): void {
  dns.lookup(hostname, { ...options, all: true }, (error, addresses) => {
    if (error) return callback(error, "", 0);
    if (addresses.length === 0 || addresses.some(({ address }) => isBlockedAddress(address))) {
      return callback(new Error("Address not allowed"), "", 0);
    }
    if (options.all) return callback(null, addresses);
    return callback(null, addresses[0].address, addresses[0].family);
  });
}

type RawResponse = {
  status: number;
  headers: IncomingHttpHeaders;
  body: string;
  location?: string;
};

type RequestLimits = { deadline: number; maxBytes: number };

function requestOnce(url: URL, { deadline, maxBytes }: RequestLimits): Promise<RawResponse> {
  return new Promise((resolve, reject) => {
    const remaining = deadline - Date.now();
    if (remaining <= 0) return reject(new Error("Request timed out"));

    let settled = false;
    const finish = (fn: () => void) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      fn();
    };

    const req = https.request(
      url,
      {
        method: "GET",
        headers: { ...HEADERS, Connection: "close" },
        lookup: guardedLookup,
        agent: false,
      },
      (res) => {
        const status = res.statusCode ?? 0;
        const headers = res.headers;

        const redirectTarget = status >= 300 && status < 400 ? headers.location : undefined;
        if (redirectTarget || status < 200 || status >= 300) {
          res.resume();
          return finish(() => resolve({ status, headers, body: "", location: redirectTarget }));
        }

        const contentType = String(headers["content-type"] ?? "").toLowerCase();
        if (contentType && !/^(text\/html|application\/xhtml\+xml)\b/.test(contentType)) {
          res.destroy();
          return finish(() => reject(new FetchRejectedError("That URL did not return an HTML page.")));
        }

        const encoding = String(headers["content-encoding"] ?? "identity").toLowerCase();
        let stream: Readable = res;
        if (encoding === "gzip" || encoding === "x-gzip") stream = res.pipe(createGunzip());
        else if (encoding === "deflate") stream = res.pipe(createInflate());
        else if (encoding === "br") stream = res.pipe(createBrotliDecompress());
        else if (encoding !== "identity") {
          res.destroy();
          return finish(() => reject(new FetchRejectedError("Unsupported response encoding.")));
        }

        const chunks: Buffer[] = [];
        let received = 0;
        stream.on("data", (chunk: Buffer) => {
          received += chunk.length;
          if (received > maxBytes) {
            res.destroy();
            stream.destroy();
            return finish(() => reject(new FetchRejectedError("The page is too large to convert.")));
          }
          chunks.push(chunk);
        });
        stream.on("end", () =>
          finish(() => resolve({ status, headers, body: Buffer.concat(chunks).toString("utf8") }))
        );
        stream.on("error", (error) => finish(() => reject(error)));
        res.on("error", (error) => finish(() => reject(error)));
      }
    );

    const timer = setTimeout(() => {
      req.destroy();
      finish(() => reject(new Error("Request timed out")));
    }, remaining);

    req.on("error", (error) => finish(() => reject(error)));
    req.end();
  });
}

export type SafeFetchOptions = {
  timeoutMs?: number;
  maxBytes?: number;
  maxRedirects?: number;
  /** Replaces the network call. Tests only. */
  request?: (url: URL, limits: RequestLimits) => Promise<RawResponse>;
};

export type SafeFetchResult = {
  status: number;
  headers: IncomingHttpHeaders;
  body: string;
  finalUrl: string;
};

/**
 * GETs an HTML page from a public https host. Throws UnsafeUrlError for a URL
 * that is not allowed (including redirect targets), FetchRejectedError when the
 * response is refused (not HTML, too large), and a plain Error for network
 * failures and timeouts. A response with a non-2xx status is returned, not thrown.
 */
export async function safeFetchHtml(
  rawUrl: string,
  {
    timeoutMs = DEFAULT_TIMEOUT_MS,
    maxBytes = DEFAULT_MAX_BYTES,
    maxRedirects = DEFAULT_MAX_REDIRECTS,
    request = requestOnce,
  }: SafeFetchOptions = {}
): Promise<SafeFetchResult> {
  const deadline = Date.now() + timeoutMs;
  let url = parsePublicHttpsUrl(rawUrl);

  for (let hop = 0; hop <= maxRedirects; hop++) {
    const response = await request(url, { deadline, maxBytes });

    if (response.location) {
      let next: string;
      try {
        next = new URL(response.location, url).toString();
      } catch {
        throw new UnsafeUrlError("The page redirected to an invalid URL.");
      }
      url = parsePublicHttpsUrl(next);
      continue;
    }

    return {
      status: response.status,
      headers: response.headers,
      body: response.body,
      finalUrl: url.toString(),
    };
  }

  throw new FetchRejectedError("The page redirected too many times.");
}
