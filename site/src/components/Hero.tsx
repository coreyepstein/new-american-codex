"use client";

import Link from "next/link";

export function Hero() {
  return (
    <section className="relative bg-black text-offwhite overflow-hidden">
      <div
        className="relative max-w-5xl mx-auto px-6 flex flex-col items-start text-left"
        style={{
          paddingTop: "clamp(5rem, 14vw, 10rem)",
          paddingBottom: "clamp(5rem, 14vw, 10rem)",
        }}
      >
        <p className="label-text mb-6 animate-fade-in-up">
          Open Source Education
        </p>

        <h1 className="fluid-h1 font-heading font-bold mb-8 animate-fade-in-up-delay-1">
          <span className="block text-offwhite/30">The</span>
          <span className="block text-offwhite">New</span>
          <span className="block text-red">American</span>
          <span className="block text-offwhite">Codex</span>
        </h1>

        <div className="red-divider mb-8 animate-fade-in-up-delay-2" />

        <p className="fluid-body-lg font-body italic text-offwhite/60 max-w-2xl mb-4 animate-fade-in-up-delay-2">
          An open-source curriculum for raising capable, self-governing humans
          &mdash; from pregnancy through age 18.
        </p>

        <p className="text-base text-offwhite/40 font-body max-w-xl mb-10 animate-fade-in-up-delay-3 leading-relaxed">
          Eight pillars. Six life stages. A community of families building
          something better than what the system offers. Not a school &mdash; a
          codex. A living document for the next generation.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up-delay-3">
          <Link
            href="/framework"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-red text-offwhite font-mono text-xs uppercase tracking-[0.15em] hover:bg-red/90 transition-colors"
          >
            Explore the Framework
          </Link>
          <a
            href="#signup"
            className="inline-flex items-center justify-center px-8 py-3.5 border border-offwhite/30 text-offwhite font-mono text-xs uppercase tracking-[0.15em] hover:border-offwhite/60 transition-colors"
          >
            Get Updates
          </a>
        </div>
      </div>

      <div className="accent-bar-bottom" />
    </section>
  );
}
