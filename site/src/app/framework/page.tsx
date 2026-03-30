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
      <section className="section-padding bg-offwhite">
        <div className="max-w-3xl mx-auto px-6">
          <p className="label-text mb-3">
            Curriculum Architecture
          </p>
          <h1 className="fluid-h1 font-heading font-bold uppercase text-black mb-6">
            The Framework
          </h1>
          <p className="fluid-body-lg text-text-secondary/70 max-w-2xl">
            The Codex is structured around three dimensions: what we teach
            (pillars), when we teach it (stages), and how we teach it (content
            types). Together they form a complete system for raising capable
            humans.
          </p>
        </div>
      </section>

      {/* 8 Pillars */}
      <section className="bg-card-bg section-padding">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-heading text-8xl font-bold text-red/15 leading-none">
              8
            </span>
            <h2 className="fluid-h2 font-heading font-bold uppercase text-black -mt-6 mb-4">
              Pillars
            </h2>
            <p className="text-text-secondary/60 max-w-xl mx-auto leading-relaxed">
              Every child builds competence across all eight domains. Click any
              pillar to learn more.
            </p>
          </div>

          <PillarGrid pillars={PILLARS} />
        </div>
      </section>

      {/* 6 Lifecycle Stages */}
      <section className="section-padding bg-offwhite">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-heading text-8xl font-bold text-navy/15 leading-none">
              6
            </span>
            <h2 className="fluid-h2 font-heading font-bold uppercase text-black -mt-6 mb-4">
              Lifecycle Stages
            </h2>
            <p className="text-text-secondary/60 max-w-xl mx-auto leading-relaxed">
              From pregnancy through age 18, each stage honors a child&apos;s
              developmental readiness. Click a stage to see its focus.
            </p>
          </div>

          <StageTimeline stages={STAGES} />
        </div>
      </section>

      {/* 10 Content Types */}
      <section className="bg-card-bg section-padding">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-heading text-8xl font-bold text-red/15 leading-none">
              10
            </span>
            <h2 className="fluid-h2 font-heading font-bold uppercase text-black -mt-6 mb-4">
              Content Types
            </h2>
            <p className="text-text-secondary/60 max-w-xl mx-auto leading-relaxed">
              Learning takes many forms. Each content type serves a different
              purpose in the child&apos;s development.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {CONTENT_TYPES.map((ct) => (
              <div
                key={ct.name}
                className="bg-offwhite p-6 border-l-4 border-l-red border border-card-border"
              >
                <h3 className="font-heading font-bold uppercase text-lg text-black mb-1">
                  {ct.name}
                </h3>
                <p className="text-sm text-text-secondary/70 mb-3 leading-relaxed">
                  {ct.description}
                </p>
                <p className="text-xs text-red font-mono italic">
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
