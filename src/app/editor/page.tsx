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

export default function EditorPage() {
  const searchParams = useSearchParams();
  const url = searchParams.get("url");

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
          const res = await fetch(`/api/convert?url=${encodeURIComponent(url)}`);
          const data = await res.json();
          if (data.error) {
            setMarkdown(data.markdown);
          } else {
            setMarkdown(data.markdown);
            setTitle(data.title || "Medium2Markdown");
          }
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
          <ResizablePanelGroup direction="horizontal" className="flex-1 overflow-hidden">
            {/* Left Panel with textarea */}
            <ResizablePanel defaultSize={50} className="relative w-full overflow-hidden">
              <textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                placeholder="Your markdown here..."
                className="bg-black text-white h-full w-full p-6 font-mono text-sm outline-none overflow-auto border-r border-zinc-800 placeholder:text-zinc-600"
              ></textarea>
            </ResizablePanel>

            <ResizableHandle withHandle className="bg-zinc-800" />

            {/* Right Panel with markdown preview */}
            <ResizablePanel defaultSize={50} className="bg-white w-full overflow-hidden">
              <div className="p-6 h-full overflow-auto">
                {loading ? (
                  // Loading Spinner
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                  </div>
                ) : (
                  // Markdown Preview (including errors with embeds)
                  <div className="markdown-body bg-white text-black">
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
        <footer className="flex items-center pl-6 py-3 bg-black border-t border-zinc-800 gap-3">
          <RefreshCcw className="w-3 h-3" color="white" />
          <p className="text-zinc-400 text-xs font-mono">
            Last updated on {date}
          </p>
        </footer>
      </div>
  );
}