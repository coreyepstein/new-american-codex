import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Donate — The New American Codex",
  description:
    "Support the New American Codex — an open-source curriculum for raising capable, self-governing humans.",
};

export default function DonatePage() {
  return (
    <div className="section-padding">
      <div className="max-w-3xl mx-auto px-6">
        <p className="label-text mb-3">
          Support the Mission
        </p>
        <h1 className="fluid-h1 font-heading font-bold uppercase text-black mb-6">
          Help Build the Codex
        </h1>
        <p className="fluid-body-lg text-text-secondary/70 mb-12 max-w-2xl">
          The New American Codex is free, open-source, and community-driven.
          Your support helps us keep it that way — and keeps the curriculum
          growing.
        </p>

        {/* Donation options */}
        <div className="space-y-8 mb-16">
          {/* GitHub Sponsors */}
          <div className="bg-card-bg p-8 border border-card-border">
            <h2 className="font-heading text-xl font-bold uppercase text-black mb-3">
              GitHub Sponsors
            </h2>
            <p className="text-text-secondary/70 mb-6 leading-relaxed">
              The simplest way to support the project. GitHub Sponsors lets you
              make one-time or recurring contributions directly. Every dollar
              goes toward curriculum development and keeping the project open.
            </p>
            <Link
              href="https://github.com/sponsors/coreyepstein"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-red text-offwhite font-mono text-xs uppercase tracking-[0.15em] px-8 py-3.5 hover:bg-red/90 transition-colors"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              Sponsor on GitHub
            </Link>
          </div>

          {/* Future Stripe */}
          <div className="bg-offwhite p-8 border border-card-border">
            <h2 className="font-heading text-xl font-bold uppercase text-black mb-3">
              Direct Donations
            </h2>
            <p className="text-text-secondary/70 leading-relaxed">
              We&apos;re working on setting up direct donation processing for
              those who prefer it. In the meantime, GitHub Sponsors is the best
              way to contribute. Check back soon for additional options.
            </p>
          </div>
        </div>

        {/* What your support does */}
        <section className="mb-16">
          <h2 className="font-heading text-xl font-bold uppercase text-black mb-6">
            What Your Support Makes Possible
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "Curriculum Development",
                desc: "Researching, writing, and field-testing lessons, activities, and projects across all eight pillars.",
              },
              {
                title: "Open Access",
                desc: "Keeping the entire curriculum free under Creative Commons, so any family can use it regardless of income.",
              },
              {
                title: "Community Tools",
                desc: "Building the website, templates, and planning tools that make the curriculum easy to use at home.",
              },
              {
                title: "Field Testing",
                desc: "Working with real families to test lessons, gather feedback, and continuously improve the content.",
              },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="font-heading font-bold uppercase text-base text-black mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-text-secondary/70 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission statement */}
        <section className="border-t border-card-border pt-12 text-center">
          <blockquote className="font-body text-xl md:text-2xl text-black font-medium italic leading-relaxed max-w-xl mx-auto">
            &ldquo;The test of a civilization is in the way it cares for its
            helpless members — and in the way it prepares its young to be
            anything but helpless.&rdquo;
          </blockquote>
          <p className="text-sm text-text-secondary/50 mt-6">
            Thank you for believing in this work.
          </p>
        </section>
      </div>
    </div>
  );
}
