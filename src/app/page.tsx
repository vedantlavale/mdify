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
    <div className="w-full min-h-screen relative overflow-hidden bg-black">
      {/* GradientBlinds Background */}
      <div className="absolute inset-0 w-full h-full">
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
        
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center max-w-4xl w-full text-center space-y-6 sm:space-y-8 font-bricolage">
            {/* Heading */}
            <TextType 
              text={["Convert Medium to Markdown", "Clean, editable content", "Ready in seconds!"]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white px-2"
            />
            
            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl px-4 leading-relaxed">
              Paste any Medium link below and instantly get a Markdown version formatted, editable, and ready for your site or notes.
            </p>
            
            {/* Input Section */}
            <div className="w-full max-w-3xl flex flex-col sm:flex-row gap-3 sm:gap-2 px-4 sm:px-0">
              <input
                type="url"
                value={url}
                onChange={(e)=>setUrl(e.target.value)}
                placeholder="Enter Medium blog URL"
                className="flex-1 h-11 sm:h-12 px-3 sm:px-4 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm sm:text-base"
              />

              <Button 
                onClick={navigateToEditor} 
                className="h-11 sm:h-12 px-4 sm:px-6 rounded-lg bg-blend-color text-white font-medium transition-colors w-full sm:w-auto text-sm sm:text-base"
              >
                Convert
              </Button>
            </div>
          </div>
        </div>

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
