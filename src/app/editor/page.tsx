"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import "github-markdown-css/github-markdown.css";
import "highlight.js/styles/atom-one-dark.css";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import { ReviewToolbar } from "@/components/toolbar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { RefreshCcw } from "lucide-react";
import { useEditorStore } from "@/store/EditorStore";
import { useIsMobile } from "@/hooks/use-mobile";

export default function EditorPage() {
  const searchParams = useSearchParams();
  const url = searchParams.get("url");
  const isMobile = useIsMobile();

  const { content: markdown, setContent: setMarkdown, setTitle } = useEditorStore();
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setDate(new Date().toLocaleDateString("en-US", { dateStyle: "full" }));
  }, []);

  useEffect(() => {
    if (url) {
      setLoading(true);
      (async () => {
        try {
          const res = await fetch(`/api/fetch-html?url=${encodeURIComponent(url)}`);
          const data = await res.json();
          if (data.error) {
            throw new Error(data.error);
          }
          setMarkdown(data.markdown);
          setTitle(data.title || "Medium2Markdown");
          document.title = data.title || "Medium2Markdown";
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
          setMarkdown("# Error\n\n" + errorMessage);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [url, setMarkdown, setTitle]);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-black">
        {/* Toolbar at the top */}
        <ReviewToolbar />

        {/* Main content area: fill available space */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <ResizablePanelGroup 
            direction={isMobile ? "vertical" : "horizontal"} 
            className="flex-1 overflow-hidden"
          >
            {/* Left/Top Panel with textarea */}
            <ResizablePanel defaultSize={50} className="relative w-full overflow-hidden">
              <textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                placeholder="Your markdown here..."
                className={`bg-black text-white h-full w-full p-3 ${!isMobile ? 'sm:p-4 lg:p-6' : ''} font-mono text-xs ${!isMobile ? 'sm:text-sm' : ''} outline-none overflow-auto ${isMobile ? 'border-b' : 'border-r'} border-zinc-800 placeholder:text-zinc-600 resize-none`}
              ></textarea>
            </ResizablePanel>

            <ResizableHandle withHandle className="bg-zinc-800" />

            {/* Right/Bottom Panel with markdown preview */}
            <ResizablePanel defaultSize={50} className="bg-white w-full overflow-hidden">
              <div className={`p-3 ${!isMobile ? 'sm:p-4 lg:p-6' : ''} h-full overflow-auto`}>
                {loading ? (
                  // Loading Spinner
                  <div className="flex items-center justify-center h-full">
                    <div className={`animate-spin rounded-full ${isMobile ? 'h-6 w-6' : 'h-6 w-6 sm:h-8 sm:w-8'} border-b-2 border-black`}></div>
                  </div>
                ) : (
                  // Markdown Preview (including errors with embeds)
                  <div className={`markdown-body bg-white text-black ${isMobile ? 'text-sm' : ''}`}>
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw, rehypeHighlight]}
                    >
                      {markdown}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>

        {/* Footer at the bottom */}
        <footer className="flex items-center px-3 sm:px-4 lg:px-6 py-2 sm:py-3 bg-black border-t border-zinc-800 gap-2 sm:gap-3">
          <RefreshCcw className="w-3 h-3 shrink-0" color="white" />
          <p className="text-zinc-400 text-xs font-mono truncate">
            Last updated on {date}
          </p>
        </footer>
      </div>
  );
}