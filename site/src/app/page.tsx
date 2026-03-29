import { Hero } from "@/components/Hero";
import { EmailSignup } from "@/components/EmailSignup";
import { PillarCard } from "@/components/PillarCard";
import { PILLARS } from "@/lib/data";
import Link from "next/link";

const philosophies = [
  {
    title: "The Magical Child",
    description:
      "Children are unfolding intelligences, not empty vessels. Based on Joseph Chilton Pearce's work, we honor each child's readiness signals and build on sensory learning before abstract thinking.",
  },
  {
    title: "Tikkun Olam",
    description:
      "Repairing the world. Service isn't extracurricular — it's a pillar. Children learn moral courage by doing, not by being told. They leave every place better than they found it.",
  },
  {
    title: "American Dynamism",
    description:
      "Liberty, entrepreneurship, civic responsibility, and making things. The American experiment is an ongoing act of creation — and our children are its next builders.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Philosophy section */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-sm font-semibold uppercase tracking-[0.15em] text-amber-warm mb-3">
            Three Foundations
          </p>
          <h2 className="fluid-h2 font-serif font-bold text-ink text-center mb-4">
            What We Believe
          </h2>
          <p className="text-center text-slate-deep/60 max-w-2xl mx-auto mb-16 leading-relaxed">
            The Codex stands on three philosophical pillars that shape every
            lesson, every activity, every conversation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
            {philosophies.map((p) => (
              <div key={p.title}>
                <h3 className="font-serif text-xl font-semibold text-ink mb-3">
                  {p.title}
                </h3>
                <p className="text-sm text-slate-deep/70 leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars preview */}
      <section className="bg-cream section-padding">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-serif text-7xl font-bold text-amber-warm/20">
              8
            </span>
            <h2 className="fluid-h2 font-serif font-bold text-ink -mt-4 mb-4">
              Pillars of the Codex
            </h2>
            <p className="text-slate-deep/60 max-w-xl mx-auto leading-relaxed">
              Every child deserves competence across all eight domains — not
              just academics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-2">
            {PILLARS.map((pillar) => (
              <PillarCard
                key={pillar.number}
                number={pillar.number}
                name={pillar.name}
                tagline={pillar.tagline}
                description={pillar.description}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/framework"
              className="inline-flex items-center gap-2 text-amber-warm font-semibold text-sm hover:text-amber-deep transition-colors"
            >
              Explore the full framework
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Email signup */}
      <EmailSignup />

      {/* Core values */}
      <section className="section-padding-sm bg-parchment">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-deep/40 mb-6">
            Core Values
          </p>
          <p className="font-serif text-2xl md:text-3xl text-ink font-semibold tracking-tight">
            Independence &middot; Creativity &middot; Curiosity &middot;
            Confidence &middot; Strength
          </p>
        </div>
      </section>

      {/* Donate CTA */}
      <section className="bg-ink text-parchment section-padding-sm">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-2xl font-semibold mb-4">
            Help Build the Codex
          </h2>
          <p className="text-parchment/60 mb-8 leading-relaxed">
            This is a community project. Your support helps us keep the
            curriculum free, open, and growing.
          </p>
          <Link
            href="/donate"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-amber-warm text-ink font-semibold text-sm rounded-lg hover:bg-amber-light transition-colors"
          >
            Support the Project
          </Link>
        </div>
      </section>
    </>
  );
}
