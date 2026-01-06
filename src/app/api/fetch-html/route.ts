import { NextResponse } from "next/server";
import { load } from "cheerio";
import TurndownService from "turndown";
import { HEADERS } from "@/lib/medium/constants";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "No URL provided" }, { status: 400 });
  }

  try {
    const response = await fetch(url, {
      headers: HEADERS,
    });

    if (!response.ok) {
      return NextResponse.json({ error: `Failed to fetch: ${response.status}` }, { status: response.status });
    }

    const html = await response.text();
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
        let caption = node.querySelector('figcaption')?.textContent;
        caption = caption ? caption : 'captionless image';

        if (srcset) {
          const srcList = srcset.split(" ");
          const bestQualityImgSrc = srcList[srcList.length - 2];
          return '![' + caption + '](' + bestQualityImgSrc + ')';
        } else {
          return "<b>[other]" + caption + "[/other]</b>";
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
    console.error("Fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch article" }, { status: 500 });
  }
}