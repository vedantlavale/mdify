// Turndown service configuration for converting HTML to Markdown

import TurndownService from "turndown";
import { MEDIUM_URL_PREFIX } from "./constants";
import { escapeHtml } from "./escape";

// Initializes and configures the Turndown service with custom rules
export function initializeTurndownService(): TurndownService {
  const service = new TurndownService();

  service.addRule("code blocks", {
    filter: "pre",
    replacement: (content) => `\`\`\`\n${content}\n\`\`\``,
  });

  service.addRule("line breaks", {
    filter: "br",
    replacement: () => "\n",
  });

  service.addRule("mediumInlineLink", {
    filter: (node, options) => {
      return (
        options.linkStyle === "inlined" &&
        node.nodeName === "A" &&
        (node as HTMLElement).getAttribute("href") != null
      );
    },
    replacement: (content, node) => {
      let href = (node as HTMLElement).getAttribute("href");

      if (href?.startsWith("/")) {
        href = `${MEDIUM_URL_PREFIX}${href}`;
      }

      const title = (node as HTMLElement).title
        ? ` "${(node as HTMLElement).title}"`
        : "";

      return `[${content}](${href}${title})`;
    },
  });

  service.addRule("mediumFigure", {
    filter: "figure",
    replacement: (_, node) => {
      const img = node.querySelector("img");
      const source = node.querySelector("source");
      let imgSrc = "";
      if (source && source.getAttribute("srcset")) {
        const srcset = source.getAttribute("srcset")!;
        const sources = srcset.split(", ");
        const lastSource = sources[sources.length - 1];
        imgSrc = lastSource.split(" ")[0];
      } else if (img && img.getAttribute("src")) {
        imgSrc = img.getAttribute("src")!;
      }
      const caption =
        node.querySelector("figcaption")?.textContent || "captionless image";

      if (imgSrc) {
        if (imgSrc.startsWith("/")) {
          imgSrc = `https://medium.com${imgSrc}`;
        }
        return `![${caption}](${imgSrc})`;
      }

      // The caption is page text but lands in an HTML fragment: escape it.
      return `<b>[other]${escapeHtml(caption)}[/other]</b>`;
    },
  });

  service.addRule("mediumImg", {
    filter: "img",
    replacement: (_, node) => {
      const src = node.getAttribute("src");
      const alt = node.getAttribute("alt") || "";
      if (src) {
        let imgSrc = src;
        if (imgSrc.startsWith("/")) {
          imgSrc = `https://medium.com${imgSrc}`;
        }
        return `![${alt}](${imgSrc})`;
      }
      return "";
    },
  });

  service.keep(["iframe"]);

  return service;
}

// Create singleton instance
export const turndownService = initializeTurndownService();
