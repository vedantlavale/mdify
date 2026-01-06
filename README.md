# mdify - Free Medium to Markdown Converter

Convert Medium articles to clean, editable Markdown format instantly. **mdify** is the best free Medium to MD converter - a fast, user-friendly web application built with Next.js for developers and writers.

🔗 **Live Demo:** [mdify.vedant.works](https://mdify.vedant.works/)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)

## Overview

**mdify** is a powerful web application that instantly transforms Medium articles into properly formatted Markdown files. It's the #1 free **Medium to Markdown converter** for developers, writers, and content creators who need portable, standardized content that works seamlessly with GitHub, GitLab, Hugo, Jekyll, documentation sites, and any Markdown processor.

**Why mdify?**

- 🚀 Lightning fast Medium to MD conversion (2-5 seconds)
- ✨ Clean, properly formatted Markdown output
- 💯 100% free with unlimited conversions
- 🔒 Privacy-focused - no data storage
- 📝 Live preview editor with real-time rendering
- 💾 Download as .md files or copy to clipboard

**Popular searches:** medium to markdown, medium to md, convert medium article, mdify, medium markdown converter, export medium to markdown

## Features

### Core Features

- ⚡ **Instant Medium to Markdown Conversion**: Convert any Medium article to MD format in 2-5 seconds
- 👁️ **Live Preview Editor**: Real-time split-screen editor with Markdown rendering
- 🎨 **Format Preservation**: Perfectly maintains headings, bold, italics, links, lists, code blocks, and images
- 💻 **Syntax Highlighting**: Code blocks properly formatted with language-specific highlighting
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- 💾 **Multiple Export Options**: Download as .md file or copy to clipboard instantly
- 🆓 **100% Free**: No registration, no limits, no hidden fees - unlimited conversions
- 🔒 **Privacy First**: No data storage, no tracking, all processing in real-time
- ✨ **Clean Output**: Removes Medium UI clutter and generates pure, standards-compliant Markdown

### Perfect For

- 👨‍💻 **Developers**: Export tutorials to GitHub, create documentation, backup technical posts
- ✍️ **Writers**: Backup Medium stories, cross-post content, migrate to personal blogs
- 📚 **Content Creators**: Repurpose content, build Markdown libraries, archive articles
- 🏢 **Teams**: Standardize content format, create knowledge bases, maintain backups

## 🚀 Live Demo

**Try mdify now:** [mdify.vedant.works](https://mdify.vedant.works/)

No sign-up required. Just paste a Medium URL and convert!

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Markdown Processing**:
  - [Turndown](https://github.com/mixmark-io/turndown) for HTML to Markdown conversion
  - [React Markdown](https://github.com/remarkjs/react-markdown) for rendering
  - [remark-gfm](https://github.com/remarkjs/remark-gfm) for GitHub Flavored Markdown
  - [rehype-highlight](https://github.com/rehypejs/rehype-highlight) for syntax highlighting
- **HTML Parsing**: [Cheerio](https://cheerio.js.org/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Animations**: GSAP, Framer Motion

## Getting Started

### Prerequisites

- Node.js 20.x or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/mdify.git
cd mdify
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm run start
```

## CLI Usage

mdify also provides a powerful command-line interface for converting articles directly from your terminal.

**Features:**
- Interactive mode (prompts for URL if not provided)
- Copy to clipboard support
- Batch processing from a file
- Save to custom output path

**Commands:**

1. **Interactive Mode:**
   ```bash
   npm run cli
   ```

2. **Single URL:**
   ```bash
   npm run cli -- <url>
   ```

3. **Copy to Clipboard:**
   ```bash
   npm run cli -- <url> --copy
   ```

4. **Batch Processing:**
   Create a file `urls.txt` with one URL per line, then run:
   ```bash
   npm run cli -- --batch urls.txt
   ```

5. **Custom Output:**
   ```bash
   npm run cli -- <url> --output ./my-article.md
   ```

## Project Structure

```
mdify/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/
│   │   │   └── convert/        # API route for Medium conversion
│   │   ├── editor/             # Editor page with live preview
│   │   └── page.tsx            # Landing page
│   ├── components/             # React components
│   │   └── ui/                 # UI components (buttons, dialogs, etc.)
│   ├── lib/
│   │   └── medium/             # Core Medium conversion logic
│   │       ├── convert.ts      # Main conversion orchestrator
│   │       ├── fetcher.ts      # Article HTML fetcher
│   │       ├── extractors.ts   # Metadata extraction
│   │       ├── cleaners.ts     # HTML/Markdown cleaning
│   │       ├── turndown.ts     # Turndown configuration
│   │       └── types.ts        # TypeScript types
│   ├── store/                  # Zustand state management
│   └── hooks/                  # Custom React hooks
├── public/                     # Static assets
└── package.json
```

## How It Works

mdify uses advanced parsing algorithms to convert Medium articles to Markdown:

1. **URL Validation**: Validates that the provided URL is a valid Medium article
2. **HTML Fetching**: Retrieves the article HTML content using axios
3. **Parsing**: Uses Cheerio to parse and navigate the HTML DOM structure
4. **Metadata Extraction**: Extracts title, author information, publication date, and metadata
5. **Cleaning**: Intelligently removes Medium-specific UI elements, ads, and clutter
6. **Markdown Conversion**: Converts cleaned HTML to Markdown using optimized Turndown configuration
7. **Post-processing**: Filters unwanted elements and cleans up the Markdown output
8. **Live Preview**: Displays result in split-screen editor with real-time preview and editing

**Technical Details:**

- GitHub Flavored Markdown (GFM) output
- Preserves code block syntax highlighting
- Handles embedded content intelligently
- Maintains image URLs and alt text
- Proper list and table formatting

## API Reference

### Convert Endpoint

**GET** `/api/convert?url={medium_url}`

Converts a Medium article to Markdown format.

**Query Parameters:**

- `url` (required): The Medium article URL to convert

**Response:**

```json
{
  "error": false,
  "markdown": "# Article Title\n\n...",
  "title": "Article Title"
}
```

**Error Response:**

```json
{
  "error": true,
  "markdown": "Error message here"
}
```

**Status Codes:**

- `200`: Success
- `400`: Invalid request (no URL provided)
- `429`: Rate limit exceeded
- `500`: Server error

## Configuration

### Turndown Configuration

The Turndown service is configured in `src/lib/medium/turndown.ts` with custom rules for:

- Code blocks
- Image handling
- Link formatting
- List processing

### Medium-Specific Cleaning

The conversion process includes:

- Removal of Medium UI elements (clap buttons, share buttons, etc.)
- Filtering of empty paragraphs and divs
- Proper handling of embedded content
- Author attribution preservation

## Development

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Environment Variables

No environment variables are required for basic operation.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## SEO & Keywords

**mdify** - medium to markdown, medium to md, convert medium article, medium markdown converter, medium to markdown converter, export medium to markdown, medium article to md, free markdown converter, medium downloader, medium backup tool, medium migration, convert medium post, medium exporter, markdown converter online, medium content converter

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support the Project

If **mdify** has helped you convert Medium articles to Markdown, consider supporting the project:

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Support-yellow)](https://buymeacoffee.com/0xVedant)

Your support helps keep mdify free and continuously improved!

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Markdown conversion powered by [Turndown](https://github.com/mixmark-io/turndown)
- Inspired by the need for portable content formats

## Author

Created with ❤️ by [Vedant Lavale](https://vedant.works/)

- GitHub: [@vedantlavale](https://github.com/vedantlavale)
- Twitter: [@vedantlavale](https://twitter.com/vedantlavale)
- Website: [vedant.works](https://vedant.works/)

---

## Related Resources

- 📖 [How to Convert Medium to Markdown](https://mdify.vedant.works/how-to-convert-medium-to-markdown) - Complete guide
- ⚡ [mdify Features](https://mdify.vedant.works/features) - Full feature list
- 🔧 [API Documentation](https://mdify.vedant.works/api/convert) - For developers

---

**Note**: This tool is not affiliated with or endorsed by Medium. mdify is designed for personal use to help users convert publicly available Medium articles to Markdown format for backup, migration, and content management purposes.

**Disclaimer**: Please respect Medium's Terms of Service and copyright laws. Only convert content you have rights to use.
