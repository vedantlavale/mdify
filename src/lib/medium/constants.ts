// Constants and configuration for Medium conversion

export const MEDIUM_DOMAIN = "medium.com";
export const MEDIUM_URL_PREFIX = "https://medium.com";

export const DEFAULT_TITLE = "Untitled Article";
export const DEFAULT_AUTHOR = "Unknown Author";

export const ERROR_NO_ARTICLE = "Error: No article found on the page.";
export const ERROR_INVALID_URL = "# Invalid URL: Please use a medium.com URL.";
export const INVALID_URL_VIDEO_ID = "2qBlE2-WL60";

export const UNDESIRED_LINES = new Set([
  "·",
  "Published in",
  "--",
  "1",
  "Listen",
  "Share",
]);

// User agents for rotation
const USER_AGENTS = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15",
];

// Get random user agent
const getRandomUserAgent = () =>
  USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];

export const HEADERS = {
  "User-Agent": getRandomUserAgent(),
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
  "Accept-Encoding": "gzip, deflate, br",
  "Connection": "keep-alive",
  "Upgrade-Insecure-Requests": "1",
  "Sec-Fetch-Dest": "document",
  "Sec-Fetch-Mode": "navigate",
  "Sec-Fetch-Site": "none",
  "Sec-Fetch-User": "?1",
  "Referer": "https://medium.com/",
  "Cache-Control": "max-age=0",
};

export const LINES_TO_CHECK_FOR_REMOVAL = 40;
