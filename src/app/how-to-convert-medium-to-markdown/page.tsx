import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar01 } from "@/components/ui/shadcn-io/navbar-01";

export const metadata: Metadata = {
  title: "How to Convert Medium Articles to Markdown | mdify Guide",
  description:
    "Learn how to convert Medium articles to Markdown format using mdify. Step-by-step guide to export Medium posts to MD files for free. Perfect for developers and writers.",
  keywords: [
    "how to convert medium to markdown",
    "convert medium article to md",
    "medium to markdown tutorial",
    "export medium to markdown",
    "medium markdown conversion guide",
    "mdify tutorial",
    "medium to md how to",
  ],
  openGraph: {
    title: "How to Convert Medium Articles to Markdown | mdify Guide",
    description:
      "Step-by-step guide to convert Medium articles to Markdown format using mdify. Free, fast, and easy.",
    url: "https://mdify.vedantworks.com/how-to-convert-medium-to-markdown",
    type: "article",
  },
  alternates: {
    canonical: "https://mdify.vedantworks.com/how-to-convert-medium-to-markdown",
  },
};

export default function HowToConvertPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Convert Medium Articles to Markdown",
    description:
      "A complete guide on converting Medium articles to Markdown format using mdify",
    totalTime: "PT2M",
    tool: [
      {
        "@type": "HowToTool",
        name: "mdify - Medium to Markdown Converter",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Find the Medium Article",
        text: "Navigate to the Medium article you want to convert to Markdown and copy its URL from your browser's address bar.",
        url: "https://mdify.vedantworks.com/how-to-convert-medium-to-markdown#step-1",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Open mdify",
        text: "Go to mdify.vedantworks.com, the free Medium to Markdown converter tool.",
        url: "https://mdify.vedantworks.com/how-to-convert-medium-to-markdown#step-2",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Paste the URL",
        text: "Paste the Medium article URL into the input field on the mdify homepage.",
        url: "https://mdify.vedantworks.com/how-to-convert-medium-to-markdown#step-3",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Convert to Markdown",
        text: "Click the &apos;Convert to MD&apos; button. mdify will instantly convert the Medium article to Markdown format.",
        url: "https://mdify.vedantworks.com/how-to-convert-medium-to-markdown#step-4",
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Edit and Download",
        text: "Review the Markdown output, make any edits if needed, and download the .md file or copy it to your clipboard.",
        url: "https://mdify.vedantworks.com/how-to-convert-medium-to-markdown#step-5",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-white">
        <Navbar01 />

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <header className="mb-12">
            <Link
              href="/"
              className="text-sm text-black mb-4 inline-block font-medium"
            >
              ← Back to mdify
            </Link>
            <h1 className="text-4xl sm:text-5xl font-bold text-black mb-4">
              How to Convert Medium Articles to Markdown
            </h1>
            <p className="text-xl text-black">
              A complete guide to converting Medium posts to Markdown format
              using <strong>mdify</strong> - the free, fast Medium to MD
              converter.
            </p>
          </header>

          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-black mb-4">
                Why Convert Medium to Markdown?
              </h2>
              <p className="text-black mb-4">
                Converting Medium articles to Markdown format offers several
                benefits:
              </p>
              <ul className="list-disc pl-6 text-black space-y-2">
                <li>
                  <strong>Portability:</strong> Use your content anywhere -
                  GitHub, GitLab, static site generators, or documentation
                  platforms
                </li>
                <li>
                  <strong>Backup:</strong> Keep a local copy of your Medium
                  articles in a universal format
                </li>
                <li>
                  <strong>Migration:</strong> Easily move content from Medium to
                  your own blog or website
                </li>
                <li>
                  <strong>Version Control:</strong> Track changes to your
                  content using Git with Markdown files
                </li>
                <li>
                  <strong>Editing Freedom:</strong> Edit your content in any
                  text editor or Markdown tool
                </li>
              </ul>
            </section>

            <section className="mb-12 p-6">
              <h2 className="text-2xl font-bold text-black mb-4">
                Quick Start: Convert Medium to MD in 30 Seconds
              </h2>
              <ol className="list-decimal pl-6 text-black space-y-2">
                <li>Copy your Medium article URL</li>
                <li>Visit mdify.vedantworks.com</li>
                <li>Paste the URL and click &quot;Convert to MD&quot;</li>
                <li>Download your Markdown file</li>
              </ol>
              <Link href="/">
                <Button className="mt-4 bg-white text-black hover:text-white">
                  Try mdify Now →
                </Button>
              </Link>
            </section>

            <section className="mb-12" id="step-by-step">
              <h2 className="text-3xl font-bold text-black mb-6">
                Step-by-Step Guide: Medium to Markdown Conversion
              </h2>

              <div className="space-y-8">
                <div
                  id="step-1"
                  className="p-6"
                >
                  <h3 className="text-2xl font-semibold text-black mb-3">
                    Step 1: Find Your Medium Article URL
                  </h3>
                  <p className="text-black mb-4">
                    Navigate to the Medium article you want to convert. The URL
                    will look something like:
                  </p>
                  <code className="block bg-white p-3 rounded text-sm">
                    https://medium.com/@username/article-title-123abc
                  </code>
                  <p className="text-black mt-4">
                    Copy the entire URL from your browser&apos;s address bar. This
                    works for:
                  </p>
                  <ul className="list-disc pl-6 text-black space-y-1 mt-2">
                    <li>Your own Medium articles</li>
                    <li>Any public Medium post</li>
                    <li>Medium publications</li>
                    <li>Custom domain Medium blogs</li>
                  </ul>
                </div>

                <div
                  id="step-2"
                  className="p-6"
                >
                  <h3 className="text-2xl font-semibold text-black mb-3">
                    Step 2: Open mdify
                  </h3>
                  <p className="text-black mb-4">
                    Go to{" "}
                    <Link
                      href="/"
                      className="text-black hover:underline font-semibold"
                    >
                      mdify.vedantworks.com
                    </Link>
                    . No sign-up or registration required - just open the
                    website and you&apos;re ready to convert Medium articles to
                    Markdown.
                  </p>
                  <p className="text-black">
                    <strong>mdify</strong> is completely free with no limits on
                    how many articles you can convert.
                  </p>
                </div>

                <div
                  id="step-3"
                  className="p-6"
                >
                  <h3 className="text-2xl font-semibold text-black mb-3">
                    Step 3: Paste the Medium URL
                  </h3>
                  <p className="text-black mb-4">
                    Find the input field on the mdify homepage and paste your
                    Medium article URL. The converter automatically validates
                    the URL to ensure it&apos;s a valid Medium article.
                  </p>
                </div>

                <div
                  id="step-4"
                  className="p-6"
                >
                  <h3 className="text-2xl font-semibold text-black mb-3">
                    Step 4: Click &quot;Convert to MD&quot;
                  </h3>
                  <p className="text-black mb-4">
                    Click the conversion button. mdify will:
                  </p>
                  <ul className="list-disc pl-6 text-black space-y-2">
                    <li>Fetch the Medium article content</li>
                    <li>Parse the HTML structure</li>
                    <li>Convert it to clean Markdown format</li>
                    <li>
                      Preserve all formatting (headings, bold, italic, links)
                    </li>
                    <li>Handle code blocks with proper syntax</li>
                    <li>Include images with correct Markdown syntax</li>
                  </ul>
                  <p className="text-black mt-4">
                    The conversion typically takes 2-5 seconds depending on
                    article length.
                  </p>
                </div>

                <div
                  id="step-5"
                  className="p-6"
                >
                  <h3 className="text-2xl font-semibold text-black mb-3">
                    Step 5: Review, Edit, and Download
                  </h3>
                  <p className="text-black mb-4">
                    After conversion, you&apos;ll see a split-screen editor with:
                  </p>
                  <ul className="list-disc pl-6 text-black space-y-2 mb-4">
                    <li>
                      <strong>Left Panel:</strong> Raw Markdown text (editable)
                    </li>
                    <li>
                      <strong>Right Panel:</strong> Live preview of rendered
                      Markdown
                    </li>
                  </ul>
                  <p className="text-black mb-4">You can:</p>
                  <ul className="list-disc pl-6 text-black space-y-2">
                    <li>Edit the Markdown directly in the browser</li>
                    <li>See changes in real-time preview</li>
                    <li>Download as a .md file</li>
                    <li>Copy the entire Markdown to clipboard</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12 p-6">
              <h2 className="text-2xl font-bold text-black mb-4">
                What Gets Converted?
              </h2>
              <p className="text-black mb-4">
                <strong>mdify</strong> preserves and converts:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="list-disc pl-6 text-black space-y-1">
                  <li>Headings (H1 - H6)</li>
                  <li>Bold and italic text</li>
                  <li>Links and URLs</li>
                  <li>Ordered and unordered lists</li>
                  <li>Code blocks with syntax highlighting</li>
                </ul>
                <ul className="list-disc pl-6 text-black space-y-1">
                  <li>Inline code snippets</li>
                  <li>Images with alt text</li>
                  <li>Blockquotes</li>
                  <li>Horizontal rules</li>
                  <li>Paragraph formatting</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-black mb-4">
                Common Use Cases
              </h2>

              <div className="space-y-6">
                <div className=" pl-4">
                  <h3 className="text-xl font-semibold text-black mb-2">
                    Backing Up Medium Articles
                  </h3>
                  <p className="text-black">
                    Convert all your Medium posts to Markdown to keep local
                    backups. Store them in a Git repository for version control
                    and safety.
                  </p>
                </div>

                <div className=" pl-4">
                  <h3 className="text-xl font-semibold text-black mb-2">
                    Migrating to Static Site Generators
                  </h3>
                  <p className="text-black">
                    Moving from Medium to Hugo, Jekyll, Gatsby, or Next.js? Use
                    mdify to convert your Medium articles to Markdown files that
                    work seamlessly with these platforms.
                  </p>
                </div>

                <div className=" pl-4">
                  <h3 className="text-xl font-semibold text-black mb-2">
                    Creating Documentation
                  </h3>
                  <p className="text-black">
                    Convert Medium tutorials into Markdown for GitHub README
                    files, documentation sites, or internal wikis.
                  </p>
                </div>

                <div className=" pl-4">
                  <h3 className="text-xl font-semibold text-black mb-2">
                    Content Syndication
                  </h3>
                  <p className="text-black">
                    Publish the same content on Medium and your personal blog.
                    Convert Medium versions to Markdown for easy cross-posting.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-black mb-4">
                Frequently Asked Questions
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-black mb-2">
                    Is mdify free?
                  </h3>
                  <p className="text-black">
                    Yes! mdify is 100% free with no hidden costs, no
                    registration required, and no limits on conversions.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-black mb-2">
                    Can I convert paywalled Medium articles?
                  </h3>
                  <p className="text-black">
                    mdify can convert any publicly accessible Medium article.
                    For paywalled content, you&apos;ll need to have access to view
                    the article first.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-black mb-2">
                    Does mdify work with custom Medium domains?
                  </h3>
                  <p className="text-black">
                    Yes! mdify works with custom Medium publication domains and
                    standard Medium URLs.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-black mb-2">
                    What happens to images in the conversion?
                  </h3>
                  <p className="text-black">
                    Images are preserved with their original URLs in proper
                    Markdown image syntax. The Markdown will reference the
                    Medium-hosted images.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-black mb-2">
                    Can I edit the Markdown after conversion?
                  </h3>
                  <p className="text-black">
                    Absolutely! mdify provides a live editor where you can
                    modify the Markdown before downloading. Changes are
                    previewed in real-time.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white text-black rounded-lg p-8 text-center border border-black">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Convert Medium to Markdown?
              </h2>
              <p className="text-lg mb-6 text-black">
                Start converting your Medium articles to Markdown format with
                mdify - it&apos;s fast, free, and easy!
              </p>
              <Link href="/">
                <Button
                  size="lg"
                  className="bg-white text-black hover:text-white font-semibold"
                >
                  Convert with mdify Now →
                </Button>
              </Link>
            </section>

            <footer className="mt-12 pt-8 border-t border-black">
              <p className="text-sm text-black">
                <strong>Keywords:</strong> mdify, medium to markdown, medium to
                md, convert medium article, how to convert medium to markdown,
                medium markdown converter, export medium, medium downloader,
                medium backup, medium migration tool, free markdown converter
              </p>
            </footer>
          </div>
        </article>
      </div>
    </>
  );
}
