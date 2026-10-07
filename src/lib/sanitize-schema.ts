// Sanitising rules for the editor's live preview.
//
// The preview renders markdown with raw HTML enabled (rehype-raw), and the
// markdown can come from any page a visitor points /editor?url= at. Without a
// sanitiser that HTML is rendered on our origin as-is: forms, <meta> refreshes
// that React hoists into <head>, and <iframe srcdoc> (which runs script with
// our origin). This starts from the GitHub-style default schema, which already
// drops all of those, and only adds <iframe> back for known embed hosts, with
// no srcdoc.

import { defaultSchema, type Options } from "rehype-sanitize";

const EMBED_SRC =
  /^https:\/\/(www\.)?(youtube\.com|youtube-nocookie\.com|player\.vimeo\.com|medium\.com|gist\.github\.com|cdn\.embedly\.com)\//;

export const previewSchema: Options = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames ?? []), "iframe"],
  attributes: {
    ...defaultSchema.attributes,
    iframe: [
      ["src", EMBED_SRC],
      "width",
      "height",
      "title",
      "allow",
      "allowFullScreen",
      "frameBorder",
      "referrerPolicy",
      "loading",
    ],
  },
};
