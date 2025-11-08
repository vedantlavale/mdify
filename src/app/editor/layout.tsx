import { SidebarProvider } from "@/components/ui/sidebar"
// import { AppSidebar } from "@/components/app-sidebar"
import { Toaster } from "@/components/ui/sonner"
import { Suspense } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Editor - mdify | Convert and Edit Markdown",
  description: "Edit and refine your converted Medium articles in Markdown format. Real-time preview, formatting tools, and instant download options.",
  robots: {
    index: false, // Don't index dynamic editor pages
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex flex-row w-screen h-screen overflow-hidden">
        {/* <AppSidebar > */}
        <main className="flex-1 flex flex-col h-full overflow-hidden">
          <Suspense fallback={<div>Loading...</div>}>
            {children}
          </Suspense>
          <Toaster /> 
        </main>
        {/* </AppSidebar> */}
      </div>
      {/* <SidebarTrigger /> */}
    </SidebarProvider>
  )
}