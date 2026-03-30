"use client";

import { useState } from "react";
import { IdeaForm } from "@/components/IdeaForm";
import { ContentForm } from "@/components/ContentForm";
import { IssueForm } from "@/components/IssueForm";

type Tab = "idea" | "content" | "issue";

const TABS: { id: Tab; label: string; headline: string; description: string }[] = [
  {
    id: "idea",
    label: "Submit an Idea",
    headline: "Have a concept but not the time to write it?",
    description:
      "Share an idea for a lesson, activity, project, or field plan. Good ideas get picked up by contributors and turned into real curriculum.",
  },
  {
    id: "content",
    label: "Submit Content",
    headline: "Ready to write a full unit?",
    description:
      "Submit a complete piece of curriculum using our content template. This creates a draft pull request for maintainer review.",
  },
  {
    id: "issue",
    label: "Report an Issue",
    headline: "Found an error or safety concern?",
    description:
      "Report a factual mistake, safety issue, or correction. Safety concerns are prioritized and reviewed immediately.",
  },
];

const GUIDELINES = [
  {
    title: "You don't need to know Git",
    body: "These forms handle everything. If you want to contribute directly via GitHub, see CONTRIBUTING.md in the repo.",
  },
  {
    title: "Content is reviewed before it goes live",
    body: "All submissions go through editorial review. Safety-critical content gets domain expert review. Standard content: merged within 7 days.",
  },
  {
    title: "What reviewers look for",
    body: "Specific learning objectives, realistic materials, explicit safety warnings, appropriate readiness indicators, and alignment with Codex values: independence, curiosity, practical capability.",
  },
  {
    title: "Who can contribute",
    body: "Parents, teachers, farmers, engineers, doctors, survivalists, students — anyone with something to teach. Expertise helps; lived experience is enough.",
  },
];

export default function ContributePage() {
  const [activeTab, setActiveTab] = useState<Tab>("idea");

  const activeTabData = TABS.find((t) => t.id === activeTab)!;

  return (
    <main>
      {/* Hero */}
      <section className="section-padding border-b border-card-border">
        <div className="max-w-4xl mx-auto px-6">
          <div className="max-w-2xl">
            <span className="label-text mb-4 inline-block">
              Contribute
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase text-black mb-6 leading-tight">
              Build the curriculum with us
            </h1>
            <p className="text-lg text-text-primary/80 leading-relaxed">
              This curriculum is built by the community — parents, teachers, farmers, engineers, and domain experts who know what children actually need.
              You don&apos;t need to know Git. You just need something to teach or something to improve.
            </p>
          </div>
        </div>
      </section>

      {/* Contribution paths */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-heading text-2xl font-bold uppercase text-black mb-2">
            How would you like to contribute?
          </h2>
          <p className="text-sm text-text-secondary/60 mb-8">
            Choose a path below. Each one takes about 5–15 minutes.
          </p>

          {/* Tab buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 text-left px-5 py-4 border-2 transition-all ${
                  activeTab === tab.id
                    ? "border-red bg-red/5 text-black"
                    : "border-card-border bg-white text-text-secondary hover:border-red/40"
                }`}
              >
                <span className="block font-mono text-xs uppercase tracking-wider font-semibold mb-0.5">{tab.label}</span>
                <span className="block text-xs text-text-secondary/60 leading-snug">
                  {tab.headline}
                </span>
              </button>
            ))}
          </div>

          {/* Active form panel */}
          <div className="bg-white border border-card-border p-6 md:p-8">
            <div className="mb-6">
              <h3 className="font-heading text-xl font-bold uppercase text-black mb-1">
                {activeTabData.label}
              </h3>
              <p className="text-sm text-text-secondary/70">{activeTabData.description}</p>
            </div>

            {activeTab === "idea" && <IdeaForm />}
            {activeTab === "content" && <ContentForm />}
            {activeTab === "issue" && <IssueForm />}
          </div>
        </div>
      </section>

      {/* Contributor guidelines */}
      <section className="section-padding bg-black/2 border-t border-card-border">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-bold uppercase text-black mb-2">
              Contributor guidelines
            </h2>
            <p className="text-sm text-text-secondary/60">
              What you need to know before submitting.{" "}
              <a
                href="https://github.com/coreyepstein/new-american-codex/blob/main/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red hover:underline"
              >
                Full guidelines on GitHub →
              </a>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {GUIDELINES.map((g) => (
              <div
                key={g.title}
                className="bg-white border border-card-border p-5"
              >
                <h3 className="font-medium text-black mb-1.5 text-sm">{g.title}</h3>
                <p className="text-sm text-text-secondary/70 leading-relaxed">{g.body}</p>
              </div>
            ))}
          </div>

          {/* Contribution layers */}
          <div className="mt-8 bg-white border border-card-border p-6">
            <h3 className="font-heading text-lg font-bold uppercase text-black mb-4">
              Who contributes
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-card-border">
                    <th className="text-left pb-2 font-mono text-xs uppercase tracking-wider font-semibold text-black pr-6">Layer</th>
                    <th className="text-left pb-2 font-mono text-xs uppercase tracking-wider font-semibold text-black pr-6">Who</th>
                    <th className="text-left pb-2 font-mono text-xs uppercase tracking-wider font-semibold text-black">What</th>
                  </tr>
                </thead>
                <tbody className="text-text-secondary/70">
                  <tr className="border-b border-card-border">
                    <td className="py-2.5 pr-6 font-medium text-black">Core Maintainers</td>
                    <td className="py-2.5 pr-6">Project leads</td>
                    <td className="py-2.5">Set direction, review and merge PRs</td>
                  </tr>
                  <tr className="border-b border-card-border">
                    <td className="py-2.5 pr-6 font-medium text-black">Domain Experts</td>
                    <td className="py-2.5 pr-6">Farmers, engineers, doctors</td>
                    <td className="py-2.5">Author expert content, review for accuracy</td>
                  </tr>
                  <tr className="border-b border-card-border">
                    <td className="py-2.5 pr-6 font-medium text-black">Parents & Teachers</td>
                    <td className="py-2.5 pr-6">Homeschool families, educators</td>
                    <td className="py-2.5">Field-test content, submit modifications</td>
                  </tr>
                  <tr className="border-b border-card-border">
                    <td className="py-2.5 pr-6 font-medium text-black">Students</td>
                    <td className="py-2.5 pr-6">Older learners (Apprentice+)</td>
                    <td className="py-2.5">Project showcases, peer teaching materials</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-6 font-medium text-black">Community</td>
                    <td className="py-2.5 pr-6">Anyone</td>
                    <td className="py-2.5">Ideas, corrections, translations, links</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
