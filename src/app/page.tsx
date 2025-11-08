"use client";
import Beams from "@/components/Beams";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ClickSpark from "@/components/ClickSpark";
import TextType from "@/components/TextType";
import { Navbar01 } from "@/components/ui/shadcn-io/navbar-01";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";


export default function Page() {
  const [url, setUrl] = useState("");
  const router = useRouter();

  function navigateToEditor() {
    if (url.trim() !== "") {
      router.push(`/editor?url=${encodeURIComponent(url)}`);
    }
  }

  return (
    <div className="w-full min-h-screen relative overflow-hidden bg-black" itemScope itemType="https://schema.org/WebApplication">
      <meta itemProp="name" content="mdify" />
      <meta itemProp="description" content="Convert Medium articles to Markdown format instantly" />
      <meta itemProp="url" content="https://mdify.vercel.app" />
      <meta itemProp="applicationCategory" content="ProductivityApplication" />
      
      {/* GradientBlinds Background */}
      <div className="absolute inset-0 w-full h-full" aria-hidden="true">
        <Beams
          beamWidth={2}
          beamHeight={15}
          beamNumber={8}
          lightColor="#ffffff"
          speed={2}
          noiseIntensity={1.75}
          scale={0.15}
          rotation={30}
        />
      </div>
      
      {/* Content */}
      <ClickSpark
        sparkColor='#fff'
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        <Navbar01/>
        
        <main className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
          <section className="flex flex-col items-center justify-center max-w-4xl w-full text-center space-y-6 sm:space-y-8 font-bricolage">
            {/* Heading */}
            <header>
              <h1 className="sr-only">mdify - Convert Medium Articles to Markdown</h1>
              <TextType 
                text={["Convert Medium to Markdown", "Clean, editable content", "Ready in seconds!"]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white px-2"
              />
            </header>
            
            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl px-4 leading-relaxed">
              Transform any Medium article into clean, editable Markdown format instantly. Perfect for developers, writers, and content creators who need portable, standardized content.
            </p>
            
            {/* SEO Content - Hidden but crawlable */}
            <div className="sr-only" itemScope itemType="https://schema.org/FAQPage">
              <h2>Frequently Asked Questions about mdify</h2>
              
              <div itemScope itemType="https://schema.org/Question" itemProp="mainEntity">
                <h3 itemProp="name">How do I convert a Medium article to Markdown?</h3>
                <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                  <div itemProp="text">
                    Simply paste the Medium article URL into the input field above and click &ldquo;Convert to Markdown&rdquo;. 
                    mdify will instantly transform the article into clean, editable Markdown format.
                  </div>
                </div>
              </div>

              <div itemScope itemType="https://schema.org/Question" itemProp="mainEntity">
                <h3 itemProp="name">Is mdify free to use?</h3>
                <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                  <div itemProp="text">
                    Yes, mdify is completely free to use. No registration, no limits, no hidden fees. 
                    Convert as many Medium articles to Markdown as you need.
                  </div>
                </div>
              </div>

              <div itemScope itemType="https://schema.org/Question" itemProp="mainEntity">
                <h3 itemProp="name">What formats does mdify support?</h3>
                <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                  <div itemProp="text">
                    mdify converts Medium articles to standard Markdown format (.md files). 
                    The output is compatible with GitHub, GitLab, documentation sites, and any Markdown processor.
                  </div>
                </div>
              </div>

              <div itemScope itemType="https://schema.org/Question" itemProp="mainEntity">
                <h3 itemProp="name">Does mdify preserve formatting from Medium articles?</h3>
                <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                  <div itemProp="text">
                    Yes, mdify preserves headings, bold text, italics, links, lists, and other formatting elements 
                    from the original Medium article while converting them to proper Markdown syntax.
                  </div>
                </div>
              </div>

              <h2>Key Features of mdify</h2>
              <ul>
                <li>Instant Medium to Markdown conversion</li>
                <li>Clean, properly formatted output</li>
                <li>Preserves article structure and formatting</li>
                <li>Free and no registration required</li>
                <li>Real-time preview and editing</li>
                <li>Download ready .md files</li>
                <li>Perfect for documentation, blogs, and note-taking</li>
                <li>Compatible with GitHub, GitLab, and static site generators</li>
                <li>Mobile-friendly responsive design</li>
                <li>Copy to clipboard functionality</li>
              </ul>
            </div>
            
            {/* Converter Form */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                navigateToEditor();
              }}
              className="w-full max-w-3xl flex flex-col sm:flex-row gap-3 sm:gap-2 px-4 sm:px-0"
              role="search"
              aria-label="Medium to Markdown converter"
            >
              <label htmlFor="medium-url" className="sr-only">
                Medium article URL
              </label>
              <input
                id="medium-url"
                type="url"
                value={url}
                onChange={(e)=>setUrl(e.target.value)}
                placeholder="Enter Medium article URL (e.g., https://medium.com/@author/article-title)"
                className="flex-1 h-11 sm:h-12 px-3 sm:px-4 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm sm:text-base"
                required
                aria-describedby="url-help"
              />
              <div id="url-help" className="sr-only">
                Enter a valid Medium article URL to convert it to Markdown format
              </div>

              <Button 
                type="submit"
                className="h-11 sm:h-12 px-4 sm:px-6 rounded-lg bg-blend-color text-white font-medium transition-colors w-full sm:w-auto text-sm sm:text-base"
                aria-label="Convert Medium article to Markdown"
              >
                Convert to Markdown
              </Button>
            </form>
          </section>
        </main>

        {/* Buy Me a Coffee Popover */}
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="bg-black/50 hover:bg-black/70 text-white border border-white/20 h-10 w-10 sm:h-12 sm:w-12"
              >
                <Image
                  src="/buymecoffee.png"
                  alt="Buy Me a Coffee"
                  width={20}
                  height={20}
                  className="sm:w-6 sm:h-6"
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72 sm:w-80 mr-2 sm:mr-0" align="end">
              <div className="flex items-start space-x-3">
                <Image
                  src="/buymecoffee.svg"
                  alt="Buy Me a Coffee"
                  width={28}
                  height={28}
                  className="sm:w-8 sm:h-8 mt-1"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm sm:text-base">Support the project</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">
                    Buy me a coffee to keep this tool running!
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3 w-full text-xs sm:text-sm"
                    onClick={() => window.open('https://buymeacoffee.com/vedantlavale', '_blank')}
                  >
                    Buy Me a Coffee
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </ClickSpark>
    </div>
  )
}
