"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link2,
  Unlink,
  Copy,
  Download,
  FileText,
  FileX2,
  Pencil,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { addBold } from "@/lib/utils";
import { addItalic } from "@/lib/utils";
import { addOrderedList } from "@/lib/utils";
import { addUnorderedList } from "@/lib/utils";
import { copyMarkdownToClipboard } from "@/lib/utils";
import { downloadMarkdown } from "@/lib/utils";
import { addMakdownLink } from "@/lib/utils";
import { useEditorStore } from "@/store/EditorStore";
import { removeMarkdownLink } from "@/lib/utils";

export function ReviewToolbar() {
  const { title, setTitle } = useEditorStore();

  const { toast } = useToast();
  const [rename, setRename] = useState("");
  const [link, setLink] = useState("");

  return (
    <div className="flex flex-col bg-black text-white border-b border-zinc-800">
      <div className="flex items-center justify-between px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
          <div className="flex items-center gap-1 sm:gap-2 min-w-0">
            <FileX2 className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
            <h3 className="font-bold font-mono text-xs sm:text-sm truncate max-w-[120px] sm:max-w-none">
              {`${title}.md`}
            </h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="w-6 h-6 sm:w-8 sm:h-8 hover:bg-zinc-900 hover:text-white shrink-0">
                  <Pencil className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-black border-zinc-800 mx-4">
                <DialogHeader>
                  <DialogTitle className="text-white">Rename File</DialogTitle>
                </DialogHeader>
                <div className="flex items-end gap-1">
                  <Input
                    value={rename}
                    id="filename"
                    placeholder="Enter a new name"
                    className="w-full bg-zinc-900 border-zinc-800 text-white"
                    onChange={(event) => setRename(event.target.value)}
                  />
                  <span className="text-xs font-bold text-white shrink-0">.md</span>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="ghost" className="hover:bg-zinc-900">Cancel</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button
                      onClick={() => {
                        setTitle(rename);
                        setRename("");
                      }}
                      className="bg-white text-black hover:bg-zinc-200"
                      type="submit"
                    >
                      Rename
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 lg:gap-4 shrink-0">
          <Button
            className="outline-none shadow-lg transform active:scale-95 transition-all hover:bg-zinc-900 hover:text-white text-xs sm:text-sm px-2 sm:px-3 h-7 sm:h-8"
            onClick={() => {
              const textarea = document.querySelector(
                "textarea"
              ) as HTMLTextAreaElement;
              copyMarkdownToClipboard(textarea.value);
              toast({
                title: "Copied to clipboard",
                description:
                  "The markdown content has been copied to the clipboard",
              });
            }}
            variant="ghost"
            size="sm"
          >
            <Copy className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden xs:inline">Copy</span>
          </Button>

          <Button
            onClick={async () => {
              const element = document.querySelector(".markdown-body") as HTMLElement;
              if (element) {
                try {
                  const html2pdf = (await import("html2pdf.js")).default;
                  const opt = {
                    margin: [0.5, 0.5],
                    filename: `${title}.pdf`,
                    image: { type: "jpeg" as const, quality: 0.98 },
                    html2canvas: { scale: 4, useCORS: true, letterRendering: true },
                    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
                    pagebreak: { mode: ['css', 'legacy'] }
                  };
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  html2pdf().set(opt as any).from(element).save();
                  toast({
                    title: "PDF Download Started",
                    description: "Your PDF is being generated and will download shortly.",
                  });
                } catch (error) {
                  console.error("PDF generation failed:", error);
                  toast({
                    title: "Error",
                    description: "Failed to generate PDF.",
                    variant: "destructive",
                  });
                }
              }
            }}
            className="hidden sm:flex outline-none shadow-lg transform active:scale-95 transition-all hover:bg-zinc-900 hover:text-white text-xs sm:text-sm px-2 sm:px-3 h-7 sm:h-8"
            variant="ghost"
            size="sm"
          >
            <FileText className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            PDF
          </Button>

          <Button
            onClick={() => {
              const textarea = document.querySelector(
                "textarea"
              ) as HTMLTextAreaElement;
              downloadMarkdown(textarea.value, `${title}`);
            }}
            className="hidden sm:flex outline-none shadow-lg transform active:scale-95 transition-all hover:bg-zinc-900 hover:text-white text-xs sm:text-sm px-2 sm:px-3 h-7 sm:h-8"
            variant="ghost"
            size="sm"
          >
            <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Download
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between px-3 sm:px-4 lg:px-6 py-2 border-t border-zinc-800 overflow-x-auto">
        <div className="flex items-center gap-0.5 sm:gap-1 min-w-fit">
          <Button
            onClick={(event) => {
              event.preventDefault();
              const textarea = document.querySelector(
                "textarea"
              ) as HTMLTextAreaElement;
              addBold(textarea);
            }}
            variant="ghost"
            size="icon"
            className="w-6 h-6 sm:w-8 sm:h-8 hover:bg-zinc-900 hover:text-white shrink-0"
          >
            <Bold className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
          <Button
            onClick={(event) => {
              event.preventDefault();
              const textarea = document.querySelector(
                "textarea"
              ) as HTMLTextAreaElement;
              addItalic(textarea);
            }}
            variant="ghost"
            size="icon"
            className="w-6 h-6 sm:w-8 sm:h-8 hover:bg-zinc-900 hover:text-white shrink-0"
          >
            <Italic className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="w-6 h-6 sm:w-8 sm:h-8 hover:bg-zinc-900 hover:text-white shrink-0">
            <Underline className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>

          <Separator orientation="vertical" className="mx-0.5 sm:mx-1 h-4 sm:h-6 bg-zinc-800" />

          <Button
            onClick={(event) => {
              event.preventDefault();
              const textarea = document.querySelector(
                "textarea"
              ) as HTMLTextAreaElement;
              addUnorderedList(textarea);
            }}
            variant="ghost"
            size="icon"
            className="w-6 h-6 sm:w-8 sm:h-8 hover:bg-zinc-900 hover:text-white shrink-0"
          >
            <List className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
          <Button
            onClick={(event) => {
              event.preventDefault();
              const textarea = document.querySelector(
                "textarea"
              ) as HTMLTextAreaElement;
              addOrderedList(textarea);
            }}
            variant="ghost"
            size="icon"
            className="w-6 h-6 sm:w-8 sm:h-8 hover:bg-zinc-900 hover:text-white shrink-0"
          >
            <ListOrdered className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>

          <Separator orientation="vertical" className="mx-0.5 sm:mx-1 h-4 sm:h-6 bg-zinc-800" />

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="w-6 h-6 sm:w-8 sm:h-8 hover:bg-zinc-900 hover:text-white shrink-0">
                <Link2 className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72 sm:w-80 bg-black border-zinc-800 mr-2 sm:mr-0" align="start">
              <div className="grid gap-4">
                <div className="space-y-2 w-full justify-center items-center">
                  <h4 className="font-semibold text-sm leading-none text-white">Create Link</h4>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-1">
                    <Input
                      id="maxHeight"
                      placeholder="Insert URL"
                      className="col-span-2 h-7 sm:h-8 w-full text-xs sm:text-sm bg-zinc-900 border-zinc-800 text-white"
                      value={link}
                      onChange={(event) => setLink(event.target.value)}
                    />
                    <Button
                      onClick={() => {
                        const textarea = document.querySelector(
                          "textarea"
                        ) as HTMLTextAreaElement;
                        addMakdownLink(textarea, link);
                        setLink("");
                      }}
                      size="sm" 
                      className="w-full h-7 sm:h-8 bg-white text-black hover:bg-zinc-200 text-xs sm:text-sm"
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Button 
            onClick={(event) => {
              event.preventDefault();
              const textarea = document.querySelector(
                "textarea"
              ) as HTMLTextAreaElement;
              removeMarkdownLink(textarea);
            }}
            variant="ghost" 
            size="icon" 
            className="w-6 h-6 sm:w-8 sm:h-8 hover:bg-zinc-900 hover:text-white shrink-0"
          >
            <Unlink className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}