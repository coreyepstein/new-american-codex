import type { Metadata } from "next";
import { PILLARS, STAGES, CONTENT_TYPES } from "@/lib/data";
import { PillarGrid } from "./pillar-grid";
import { StageTimeline } from "@/components/StageTimeline";

export const metadata: Metadata = {
  title: "Framework — The New American Codex",
  description:
    "8 pillars, 6 lifecycle stages, and 10 content types that form the New American Codex curriculum framework.",
};

export default function FrameworkPage() {
  return (
    <div>
      {/* Header */}
      <section className="section-padding bg-parchment">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-amber-warm mb-3">
            Curriculum Architecture
          </p>
          <h1 className="fluid-h1 font-serif font-bold text-ink mb-6">
            The Framework
          </h1>
          <p className="fluid-body-lg text-slate-deep/70 max-w-2xl">
            The Codex is structured around three dimensions: what we teach
            (pillars), when we teach it (stages), and how we teach it (content
            types). Together they form a complete system for raising capable
            humans.
          </p>
        </div>
      </section>

      {/* 8 Pillars */}
      <section className="bg-cream section-padding">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-serif text-8xl font-bold text-amber-warm/15 leading-none">
              8
            </span>
            <h2 className="fluid-h2 font-serif font-bold text-ink -mt-6 mb-4">
              Pillars
            </h2>
            <p className="text-slate-deep/60 max-w-xl mx-auto leading-relaxed">
              Every child builds competence across all eight domains. Click any
              pillar to learn more.
            </p>
          </div>

          <PillarGrid pillars={PILLARS} />
        </div>
      </section>

      {/* 6 Lifecycle Stages */}
      <section className="section-padding bg-parchment">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-serif text-8xl font-bold text-amber-warm/15 leading-none">
              6
            </span>
            <h2 className="fluid-h2 font-serif font-bold text-ink -mt-6 mb-4">
              Lifecycle Stages
            </h2>
            <p className="text-slate-deep/60 max-w-xl mx-auto leading-relaxed">
              From pregnancy through age 18, each stage honors a child&apos;s
              developmental readiness. Click a stage to see its focus.
            </p>
          </div>

          <StageTimeline stages={STAGES} />
        </div>
      </section>

      {/* 10 Content Types */}
      <section className="bg-cream section-padding">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-serif text-8xl font-bold text-amber-warm/15 leading-none">
              10
            </span>
            <h2 className="fluid-h2 font-serif font-bold text-ink -mt-6 mb-4">
              Content Types
            </h2>
            <p className="text-slate-deep/60 max-w-xl mx-auto leading-relaxed">
              Learning takes many forms. Each content type serves a different
              purpose in the child&apos;s development.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {CONTENT_TYPES.map((ct) => (
              <div
                key={ct.name}
                className="bg-parchment rounded-lg p-6 border border-ink/5"
              >
                <h3 className="font-serif font-semibold text-lg text-ink mb-1">
                  {ct.name}
                </h3>
                <p className="text-sm text-slate-deep/70 mb-3 leading-relaxed">
                  {ct.description}
                </p>
                <p className="text-xs text-amber-warm italic">
                  Example: {ct.example}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
