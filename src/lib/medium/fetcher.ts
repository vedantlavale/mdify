// HTTP fetching logic for Medium articles

import { STATUS_CODES } from "node:http";
import { FetchRejectedError, safeFetchHtml } from "./safe-fetch";

// Sleep utility for retry delays
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Waiting out a long Retry-After inside a request helps nobody; cap it.
const MAX_RATE_LIMIT_WAIT_MS = 10_000;

class HttpStatusError extends Error {
  constructor(
    readonly status: number,
    message: string
  ) {
    super(message);
  }
}

// Fetches the HTML content from a given URL with retry logic
export async function fetchArticleHtml(
  url: string,
  maxRetries: number = 3
): Promise<string> {
  let lastError: Error | undefined;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      // Only public https hosts are fetched, redirects included
      const response = await safeFetchHtml(url);

      // Handle rate limiting
      if (response.status === 429) {
        const retryAfter =
          parseInt(String(response.headers["retry-after"] ?? "60"), 10) || 60;
        const delay = Math.min(retryAfter * 1000, MAX_RATE_LIMIT_WAIT_MS);

        if (attempt < maxRetries - 1) {
          console.log(
            `Rate limited. Waiting ${delay / 1000}s before retry ${attempt + 1}/${maxRetries}...`
          );
          await sleep(delay);
          continue;
        }

        throw new Error(
          `Medium is rate limiting requests. Please try again in ${retryAfter} seconds.`
        );
      }

      if (response.status >= 400) {
        throw new HttpStatusError(
          response.status,
          `Failed to fetch article: ${response.status} ${STATUS_CODES[response.status] ?? ""}`.trim()
        );
      }

      return response.body;
    } catch (error) {
      lastError = error as Error;

      console.error(
        `Fetch attempt ${attempt + 1} failed:`,
        error instanceof Error ? error.message : error
      );

      // Policy rejections and client errors (4xx) will not change on retry
      if (
        error instanceof FetchRejectedError ||
        (error instanceof HttpStatusError && error.status < 500)
      ) {
        throw error;
      }

      // Exponential backoff for retries
      if (attempt < maxRetries - 1) {
        const delay = Math.min(2000 * Math.pow(2, attempt), 30000); // Max 30 seconds
        console.log(
          `Fetch failed. Retrying in ${delay / 1000}s (${attempt + 1}/${maxRetries})...`
        );
        await sleep(delay);
      }
    }
  }

  throw lastError || new Error("Failed to fetch article after retries");
}
