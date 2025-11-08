import type { Metadata } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

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
  metadataBase: new URL('https://mdify.vedant.works/'),
  title: "mdify - Convert Medium Articles to Markdown | Free Online Tool",
  description: "Convert any Medium article to clean, editable Markdown format instantly. Free online tool to transform Medium posts into Markdown files for your blog, documentation, or notes.",
  keywords: [
    "medium to markdown",
    "convert medium article",
     "convert medium article to md",
      "convert medium blogs to md",
       "medium to md",
    "markdown converter",
    "medium export",
    "blog converter",
    "markdown tool",
    "mdify",
    "medium markdown",
    "article converter",
    "content migration"
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
    url: "https://mdify.vedant.works/",
    title: "mdify - Convert Medium Articles to Markdown",
    description: "Convert any Medium article to clean, editable Markdown format instantly. Free online tool for content creators and developers.",
    siteName: "mdify",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "mdify - Medium to Markdown Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "mdify - Convert Medium Articles to Markdown",
    description: "Convert any Medium article to clean, editable Markdown format instantly. Free online tool for content creators and developers.",
    creator: "@vedantlavale",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://mdify.vedant.works/",
  },
  category: "Technology",
  classification: "Productivity Tool",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "mdify",
    "description": "Convert Medium articles to Markdown format instantly. Free online tool for content creators and developers.",
    "url": "https://mdify.vedant.works/",
    "applicationCategory": "ProductivityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Person",
      "name": "Vedant Lavale",
      "url": "https://github.com/vedantlavale"
    },
    "featureList": [
      "Convert Medium articles to Markdown",
      "Clean and editable output",
      "Instant conversion",
      "Free to use",
      "No registration required"
    ]
  };

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
      </body>
    </html>
  );
}
