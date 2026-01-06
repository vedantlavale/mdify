import { describe, it, expect, vi, beforeEach } from 'vitest';
import { convertToMD } from './convert';
import * as fetcher from './fetcher';

// Mock the fetcher module
vi.mock('./fetcher', () => ({
  fetchArticleHtml: vi.fn(),
}));

describe('convertToMD', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return error for invalid URL', async () => {
    const result = await convertToMD('invalid-url');
    expect(result.error).toBe(true);
    // The error message from constants.ts might vary, but checking for error flag is safe
    expect(result.markdown).toBeTruthy(); 
  });

  it('should convert valid article successfully', async () => {
    const dummyHtml = `
      <html>
        <body>
          <article>
            <h1>Test Title</h1>
            <p>Test paragraph content.</p>
          </article>
        </body>
      </html>
    `;
    
    // Mock the fetcher response
    vi.mocked(fetcher.fetchArticleHtml).mockResolvedValue(dummyHtml);

    const result = await convertToMD('https://medium.com/@user/test-article');
    
    expect(result.error).toBe(false);
    // Title extraction might depend on extractTitle implementation. 
    // Usually it looks for h1 or title tag.
    // If extractTitle uses cheerio on the full HTML, our dummy HTML should be enough.
    
    expect(result.markdown).toContain('Test Title');
    expect(result.markdown).toContain('Test paragraph content.');
  });

  it('should handle fetch errors', async () => {
    vi.mocked(fetcher.fetchArticleHtml).mockRejectedValue(new Error('Network error'));

    const result = await convertToMD('https://medium.com/@user/test-article');
    
    expect(result.error).toBe(true);
    expect(result.markdown).toBe('Network error');
  });
});
