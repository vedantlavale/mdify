// Cleaning and transformation functions for DOM and Markdown

import type { CheerioAPI } from "cheerio";
import { UNDESIRED_LINES, LINES_TO_CHECK_FOR_REMOVAL } from "./constants";
import type { AuthorInfo } from "./types";
import { escapeHtml } from "./escape";

// Removes Medium-specific UI elements and metadata
export function removeMediumUiElements($: CheerioAPI): void {
  // Remove speechify div's third child
  const speechifyDiv = $("div.speechify-ignore.ab.cp").first();
  if (speechifyDiv.children().length >= 3) {
    speechifyDiv.children().eq(2).remove();
  }

  // Remove author and publication images
  $("img[data-testid='authorPhoto']").closest("a").remove();
  $("img[data-testid='publicationPhoto']").closest("a").remove();

  // Remove signin/follow links
  $("a[href*='/m/signin']").remove();

  // Remove publication metadata
  $("[data-testid='publicationName']").closest("div").remove();
  $("[data-testid='storyReadTime']").closest("span").remove();
  $("[data-testid='storyPublishDate']").closest("span").remove();
  $("[data-testid='authorName']").remove();
  $("[data-testid='headerClapButton']").remove();
}

// Removes empty paragraphs and isolated decorative characters
export function removeEmptyElements($: CheerioAPI): void {
  // Remove paragraphs containing only dots
  $("p:contains('·')").each(function () {
    if ($(this).text().trim() === "·") {
      $(this).remove();
    }
  });

  // Remove empty paragraphs
  $("p").each(function () {
    if (!$(this).text().trim()) {
      $(this).remove();
    }
  });
}

// Reorganizes the article structure (moves banner image and adds metadata)
export function restructureArticle(
  $: CheerioAPI,
  url: string,
  author: AuthorInfo,
): void {
  // Add target="_blank" to all anchors
  $("a").attr("target", "_blank");

  const mainFigure = $("figure.paragraph-image").first();
  const titleElement = $("article h1").first();

  // Move main figure right after the title
  if (mainFigure.length > 0 && titleElement.length > 0) {
    titleElement.after(mainFigure);
  }

  // Insert reference and author information. The URL and author come from the
  // request and the scraped page, so they are escaped before becoming markup.
  const insertAfterElement =
    mainFigure.length > 0 ? mainFigure : titleElement;

  insertAfterElement.after(`
    <p><br></p>
    <p><a href="${escapeHtml(url)}" target="_blank">Reference</a></p>
    <p><br></p>
    <p>by <a href="${escapeHtml(author.profileLink)}" target="_blank">${escapeHtml(author.name)}</a></p>
    <p><br></p>
  `);
}

// Cleans up markdown formatting issues
export function cleanMarkdown(markdown: string): string {
  let cleaned = markdown;

  // Remove unnecessary backslash escapes
  cleaned = cleaned.replace(/\\([^a-zA-Z0-9\s])/g, "$1");

  // Fix broken markdown links by removing newlines
  cleaned = cleaned.replace(/\[\n+/g, "[");
  cleaned = cleaned.replace(/\n+\]\(/g, "](");

  // Fix nameless links
  cleaned = cleaned.replace(/\[\]\(/g, "[nameless link](");

  return cleaned;
}

// Filters out undesired lines from the beginning of the document
export function filterUndesiredLines(markdown: string): string {
  const lines = markdown.split("\n");

  const filtered = lines.filter((line, index) => {
    return !(index < LINES_TO_CHECK_FOR_REMOVAL && UNDESIRED_LINES.has(line.trim()));
  });

  return filtered.join("\n");
}
