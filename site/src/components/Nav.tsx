"use client";

import Link from "next/link";
import { useState } from "react";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/browse", label: "Browse" },
    { href: "/personalize", label: "Personalize" },
    { href: "/contribute", label: "Contribute" },
    { href: "/framework", label: "Framework" },
    { href: "/about", label: "About" },
    { href: "/get-involved", label: "Get Involved" },
  ];

  return (
    <nav className="sticky top-0 z-50">
      <div className="accent-bar-top" />
      <div className="bg-offwhite/90 backdrop-blur-md border-b border-card-border">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="font-heading font-bold text-sm uppercase tracking-[0.2em] text-black hover:text-red transition-colors whitespace-nowrap"
          >
            The New American Codex
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-secondary hover:text-red transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <SignedIn>
              <Link
                href="/dashboard"
                className="font-mono text-[10px] uppercase tracking-[0.15em] text-red hover:text-red/80 transition-colors font-bold"
              >
                My Plans
              </Link>
              <UserButton
                appearance={{
                  elements: { avatarBox: "w-7 h-7" },
                }}
              />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-secondary hover:text-red transition-colors">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <Link
              href="https://github.com/coreyepstein/new-american-codex"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-secondary hover:text-red transition-colors"
            >
              GitHub
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-black"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {isOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden border-t border-card-border bg-offwhite/95 backdrop-blur-md">
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-mono text-xs uppercase tracking-[0.15em] text-text-secondary hover:text-red transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <SignedIn>
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="font-mono text-xs uppercase tracking-[0.15em] text-red hover:text-red/80 transition-colors font-bold"
                >
                  My Plans
                </Link>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="font-mono text-xs uppercase tracking-[0.15em] text-text-secondary hover:text-red transition-colors text-left"
                  >
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
              <Link
                href="https://github.com/coreyepstein/new-american-codex"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="font-mono text-xs uppercase tracking-[0.15em] text-text-secondary hover:text-red transition-colors"
              >
                GitHub
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
