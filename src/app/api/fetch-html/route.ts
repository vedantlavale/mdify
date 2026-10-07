import { NextResponse } from "next/server";
import { load } from "cheerio";
import TurndownService from "turndown";
import { escapeHtml } from "@/lib/medium/escape";
import {
  FetchRejectedError,
  UnsafeUrlError,
  safeFetchHtml,
} from "@/lib/medium/safe-fetch";

// safe-fetch uses node:https
export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "No URL provided" }, { status: 400 });
  }

  try {
    // Public https hosts only; redirects are re-validated hop by hop
    const response = await safeFetchHtml(url);

    if (response.status < 200 || response.status >= 300) {
      // Don't echo arbitrary upstream status codes back to the caller
      const status = [403, 404, 429].includes(response.status) ? response.status : 502;
      return NextResponse.json({ error: `Failed to fetch: ${response.status}` }, { status });
    }

    const html = response.body;
    const $ = load(html);
    const articleHtml = $('article').html();

    if (!articleHtml) {
      return NextResponse.json({ error: "No article found" }, { status: 404 });
    }

    // Process with Turndown
    const turndownService = new TurndownService();
    turndownService.addRule('code blocks', {
      filter: 'pre',
      replacement: function (content) {
        return "```\n" + content + "\n```";
      }
    });

    turndownService.addRule('line breaks', {
      filter: 'br',
      replacement: function () {
        return '\n';
      }
    });

    turndownService.addRule('mediumInlineLink', {
      filter: function (node, options) {
        return (
          options.linkStyle === 'inlined' &&
          node.nodeName === 'A' &&
          !!node.getAttribute('href')
        );
      },
      replacement: function (content, node) {
        if (!content.trim()) return ''; // Remove links with no text
        let href = node.getAttribute('href');
        if (href && href.startsWith('/')) {
          href = "https://medium.com" + href;
        }
        const title = node.title ? ' "' + node.title + '"' : '';
        return '[' + content + '](' + href + title + ')';
      }
    });

    turndownService.addRule('mediumFigure', {
      filter: 'figure',
      replacement: function (_, node) {
        const source = node.querySelector('source');
        const srcset = source ? source.getAttribute('srcset') : '';
        const caption = node.querySelector('figcaption')?.textContent || 'captionless image';

        if (srcset) {
          const srcList = srcset.split(" ");
          const bestQualityImgSrc = srcList[srcList.length - 2];
          return '![' + caption + '](' + bestQualityImgSrc + ')';
        } else {
          // The caption is page text, but it lands in an HTML fragment here:
          // escape it so it can't add markup.
          return "<b>[other]" + escapeHtml(caption) + "[/other]</b>";
        }
      }
    });

    turndownService.keep(['iframe']);

    const markdown = turndownService.turndown(articleHtml);
    let markdownCleaned = markdown.replace(/\\([^a-zA-Z0-9\s])/g, "$1");
    markdownCleaned = markdownCleaned.replace(/\[\n+/g, "[");
    markdownCleaned = markdownCleaned.replace(/\n+\]\(/g, "](");
    markdownCleaned = markdownCleaned.replace(/\[\]\(/g, "[nameless link](");

    return NextResponse.json({ markdown: markdownCleaned, title: $('article h1').first().text().trim() || "Medium2Markdown" });
  } catch (error) {
    if (error instanceof UnsafeUrlError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    if (error instanceof FetchRejectedError) {
      return NextResponse.json({ error: error.message }, { status: 422 });
    }
    // Blocked addresses, DNS failures, refused connections and timeouts all
    // look the same from outside, so this can't be used to probe the network.
    console.error("Fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch article" }, { status: 502 });
  }
}