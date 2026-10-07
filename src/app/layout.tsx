import type { Metadata } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mdify.vedantworks.com/"),
  title: "mdify - Free Medium to Markdown Converter",
  description:
    "mdify is the best free tool to convert Medium articles to Markdown. Instantly transform Medium posts to MD format with our online converter. Clean, editable Markdown exports for developers and writers.",
  keywords: [
    "mdify",
    "mdify tool",
    "mdify converter",
    "medium to markdown",
    "medium to md",
    "medium to markdown converter",
    "convert medium to markdown",
    "convert medium article to markdown",
    "convert medium article to md",
    "convert medium blogs to md",
    "convert medium post to markdown",
    "medium markdown converter",
    "medium markdown export",
    "medium export markdown",
    "medium article converter",
    "markdown converter",
    "medium export",
    "blog converter",
    "markdown tool",
    "medium markdown",
    "article converter",
    "content migration",
    "medium exporter",
    "medium downloader markdown",
    "export medium to markdown",
    "medium content converter",
    "free medium converter",
    "online markdown converter",
    "medium backup markdown",
  ],
  authors: [{ name: "Vedant Lavale", url: "https://github.com/vedantlavale" }],
  creator: "Vedant Lavale",
  publisher: "mdify",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mdify.vedantworks.com/",
    title: "mdify - Convert Medium to Markdown | Free Medium to MD Converter",
    description:
      "mdify instantly converts Medium articles to Markdown format. Free, fast, and easy-to-use online tool for developers and writers. Export Medium posts to clean MD files.",
    siteName: "mdify - Medium to Markdown Converter",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "mdify - Free Medium to Markdown Converter Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "mdify - Convert Medium to Markdown | Free MD Converter",
    description:
      "mdify converts Medium articles to Markdown instantly. Free online Medium to MD converter for developers and writers. Export Medium posts with one click.",
    creator: "@vedantlavale",
    images: ["/og-image.png"],
    site: "@vedantlavale",
  },
  alternates: {
    canonical: "https://mdify.vedantworks.com/",
  },
  category: "Technology",
  classification: "Productivity Tool",
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "mdify - Medium to Markdown Converter",
      alternateName: ["mdify", "Medium to MD", "Medium Markdown Converter"],
      description:
        "mdify is a free online tool to convert Medium articles to Markdown format instantly. Transform Medium posts to clean, editable MD files for developers, writers, and content creators.",
      url: "https://mdify.vedantworks.com/",
      applicationCategory: "ProductivityApplication",
      operatingSystem: "Web Browser",
      browserRequirements: "Requires JavaScript. Requires HTML5.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      creator: {
        "@type": "Person",
        name: "Vedant Lavale",
        url: "https://github.com/vedantlavale",
      },
      keywords:
        "mdify, medium to markdown, medium to md, convert medium, markdown converter, medium export",
      featureList: [
        "Convert Medium articles to Markdown format",
        "Medium to MD conversion in one click",
        "Clean and editable Markdown output",
        "Instant conversion with no delays",
        "Free to use with no registration required",
        "Export Medium posts to Markdown files",
        "Preserve formatting and code blocks",
        "Real-time Markdown preview",
        "Download as .md files",
        "Copy to clipboard functionality",
      ],
      screenshot: "https://mdify.vedantworks.com/og-image.png",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5",
        ratingCount: "1",
        bestRating: "5",
        worstRating: "1",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "mdify",
      url: "https://mdify.vedantworks.com/",
      logo: "https://mdify.vedantworks.com/logo.svg",
      sameAs: [
        "https://github.com/vedantlavale/medium-to-md",
        "https://twitter.com/vedantlavale",
      ],
      founder: {
        "@type": "Person",
        name: "Vedant Lavale",
        url: "https://vedantworks.com/",
      },
      description:
        "Free online tool to convert Medium articles to Markdown format instantly",
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareSourceCode",
      name: "mdify",
      description:
        "Open source Medium to Markdown converter built with Next.js",
      codeRepository: "https://github.com/vedantlavale/medium-to-md",
      programmingLanguage: "TypeScript",
      runtimePlatform: "Next.js",
      author: {
        "@type": "Person",
        name: "Vedant Lavale",
      },
    },
  ];

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bricolageGrotesque.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
