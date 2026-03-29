"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    el.classList.add("animate-fade-in-up");
  }, []);

  return (
    <section className="relative bg-ink text-parchment overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/95 to-slate-deep/90 pointer-events-none" />

      <div
        ref={heroRef}
        className="relative max-w-5xl mx-auto px-6 flex flex-col items-center text-center"
        style={{
          paddingTop: "clamp(5rem, 14vw, 10rem)",
          paddingBottom: "clamp(5rem, 14vw, 10rem)",
        }}
      >
        <p className="text-amber-warm font-sans text-sm font-semibold uppercase tracking-[0.2em] mb-6 animate-fade-in-up">
          Open-Source Curriculum
        </p>

        <h1 className="fluid-h1 font-serif font-bold text-parchment mb-6 animate-fade-in-up-delay-1">
          The New American Codex
        </h1>

        <p className="fluid-body-lg text-parchment/70 max-w-2xl mb-4 animate-fade-in-up-delay-2">
          An open-source curriculum for raising capable, self-governing humans
          &mdash; from pregnancy through age 18.
        </p>

        <p className="text-base text-parchment/50 max-w-xl mb-10 animate-fade-in-up-delay-3 leading-relaxed">
          Eight pillars. Six life stages. A community of families building
          something better than what the system offers. Not a school &mdash; a
          codex. A living document for the next generation.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up-delay-3">
          <Link
            href="/framework"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-amber-warm text-ink font-semibold text-sm rounded-lg hover:bg-amber-light transition-colors"
          >
            Explore the Framework
          </Link>
          <a
            href="#signup"
            className="inline-flex items-center justify-center px-8 py-3.5 border border-parchment/30 text-parchment font-semibold text-sm rounded-lg hover:border-parchment/60 transition-colors"
          >
            Get Updates
          </a>
        </div>
      </div>
    </section>
  );
}
