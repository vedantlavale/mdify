'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';

// Logo component using logo.svg from public folder
const Logo = () => {
  return (
    <Image
      src="/logo.svg"
      alt="mdify logo"
      width={40}
      height={40}
      className="w-9 h-8"
    />
  );
};

// GitHub icon component
const GitHubIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="currentColor"
  >
    <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

export const Navbar01 = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  (
    {
      className,
      ...props
    },
    ref
  ) => {
    return (
      <header
        ref={ref}
        className={cn(
          'sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur supports-backdrop-filter:bg-black/60 px-2 sm:px-4 md:px-6',
          className
        )}
        {...props}
      >
        <div className="flex h-16 w-full max-w-screen-2xl mx-auto items-center justify-between min-w-0">
          {/* Left side - Logo and Brand */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Logo />
            <span className="text-white font-bold text-lg sm:text-xl font-bricolage" itemProp="name">
              mdify
            </span>
          </div>
          
          {/* Right side - Social links */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <Button
              variant="ghost"
              size="sm"
              className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 sm:p-2 h-8 w-8 sm:h-9 sm:w-9"
              onClick={() => window.open('https://github.com/vedantlavale/medium-to-md', '_blank')}
            >
              <GitHubIcon />
              <span className="sr-only">GitHub</span>
            </Button>
          </div>
        </div>
      </header>
    );
  }
);

Navbar01.displayName = 'Navbar01';