# mdify

Convert Medium articles to clean, editable Markdown format instantly. A free, fast, and user-friendly web application built with Next.js.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)

## Overview

**mdify** is a web application that transforms Medium articles into properly formatted Markdown files. Perfect for developers, writers, and content creators who need portable, standardized content that works with GitHub, GitLab, documentation sites, and any Markdown processor.

## Features

- **Instant Conversion**: Convert any Medium article to Markdown in seconds
- **Live Preview**: Real-time split-screen editor with Markdown rendering
- **Syntax Highlighting**: Code blocks are properly formatted with syntax highlighting
- **Format Preservation**: Maintains headings, bold text, italics, links, lists, and images
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Copy & Download**: Easy clipboard copy and file download functionality
- **No Registration**: Free to use, no sign-up required, no limits
- **Clean Output**: Removes Medium UI elements and generates clean Markdown

## Demo

Visit [mdify.vedant.works](https://mdify.vedant.works/) to try it out!

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

1. **URL Validation**: Validates that the provided URL is a valid Medium article
2. **HTML Fetching**: Retrieves the article HTML using axios
3. **Parsing**: Uses Cheerio to parse and navigate the HTML DOM
4. **Metadata Extraction**: Extracts title, author information, and other metadata
5. **Cleaning**: Removes Medium-specific UI elements and ads
6. **Conversion**: Converts cleaned HTML to Markdown using Turndown
7. **Post-processing**: Filters unwanted lines and cleans up the Markdown
8. **Preview**: Displays the result in a split-screen editor with live preview

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

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you find this tool useful, consider supporting the project:

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Support-yellow)](https://buymeacoffee.com/0xVedant)

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Markdown conversion powered by [Turndown](https://github.com/mixmark-io/turndown)
- Inspired by the need for portable content formats

## Author

Created by [Vedant](https://vedant.works/)

---

**Note**: This tool is not affiliated with or endorsed by Medium. It's designed for personal use to help users convert publicly available articles to Markdown format.
