"use client";

import Link from "next/link";
import { useState } from "react";

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/browse", label: "Browse" },
    { href: "/personalize", label: "Personalize" },
    { href: "/framework", label: "Framework" },
    { href: "/about", label: "About" },
    { href: "/donate", label: "Donate" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-parchment/90 backdrop-blur-md border-b border-ink/5">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif font-semibold text-xl text-ink tracking-tight hover:text-amber-warm transition-colors"
        >
          New American Codex
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-deep hover:text-amber-warm transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="https://github.com/coreyepstein/new-american-codex"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-slate-deep hover:text-amber-warm transition-colors"
          >
            GitHub
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-ink"
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
        <div className="md:hidden border-t border-ink/5 bg-parchment/95 backdrop-blur-md">
          <div className="px-6 py-4 flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-base font-medium text-slate-deep hover:text-amber-warm transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="https://github.com/coreyepstein/new-american-codex"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="text-base font-medium text-slate-deep hover:text-amber-warm transition-colors"
            >
              GitHub
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
