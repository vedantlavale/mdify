// HTTP fetching logic for Medium articles

import { HEADERS } from "./constants";

// Sleep utility for retry delays
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Fetches the HTML content from a given URL with retry logic
export async function fetchArticleHtml(
  url: string,
  maxRetries: number = 3
): Promise<string> {
  let lastError: Error | undefined;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch(url, {
        headers: HEADERS,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Handle rate limiting
      if (response.status === 429) {
        const retryAfter = parseInt(
          response.headers.get("retry-after") || "60",
          10
        );
        const delay = Math.min(retryAfter * 1000, 60000); 

        if (attempt < maxRetries - 1) {
          console.log(
            `Rate limited. Waiting ${delay / 1000}s before retry ${attempt + 1}/${maxRetries}...`
          );
          await sleep(delay);
          continue;
        }

        throw new Error(
          `Medium is rate limiting requests. Please try again in ${retryAfter} seconds.`
        );
      }

      // Handle other client errors
      if (response.status >= 400 && response.status < 500) {
        throw new Error(
          `Failed to fetch article: ${response.status} ${response.statusText}`
        );
      }

      if (!response.ok) {
         throw new Error(`Failed to fetch article: ${response.status} ${response.statusText}`);
      }

      return await response.text();
    } catch (error) {
      lastError = error as Error;
      console.error(`Fetch attempt ${attempt + 1} failed:`, error);

      // Exponential backoff for retries
      if (attempt < maxRetries - 1) {
        const delay = Math.min(2000 * Math.pow(2, attempt), 30000); // Max 30 seconds
        console.log(
          `Fetch failed. Retrying in ${delay / 1000}s (${attempt + 1}/${maxRetries})...`
        );
        await sleep(delay);
      }
    }
  }

  throw lastError || new Error("Failed to fetch article after retries");
}
