"use client";

import { useState } from "react";
import type { ContributeResponse } from "@/lib/types/contribute";
import { VALID_PILLARS, VALID_STAGES } from "@/lib/types/personalize";

const PILLAR_LABELS: Record<string, string> = {
  "agency-critical-thinking": "Agency & Critical Thinking",
  "american-dynamism": "American Dynamism",
  "physical-survival": "Physical Survival",
  "building-engineering": "Building & Engineering",
  "software-ai": "Software & AI",
  "food-farming": "Food & Farming",
  "core-academics": "Core Academics",
  "character-purpose": "Character & Purpose",
};

const STAGE_LABELS: Record<string, string> = {
  foundation: "Foundation (0–4)",
  explorer: "Explorer (5–8)",
  builder: "Builder (9–12)",
  apprentice: "Apprentice (13–15)",
  architect: "Architect (16–18)",
};

type FormState =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success"; result: ContributeResponse }
  | { kind: "error"; message: string };

const inputClass =
  "w-full border border-card-border px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-red focus:border-red transition-colors";
const labelClass = "block font-mono text-xs uppercase tracking-wider font-bold text-text-primary mb-1";
const selectClass =
  "w-full border border-card-border px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-red focus:border-red transition-colors";

export function IdeaForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pillar, setPillar] = useState("");
  const [stage, setStage] = useState("");
  const [submitterName, setSubmitterName] = useState("");
  const [submitterEmail, setSubmitterEmail] = useState("");
  const [trap, setTrap] = useState("");
  const [formState, setFormState] = useState<FormState>({ kind: "idle" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setFormState({ kind: "loading" });
    try {
      const res = await fetch("/api/contribute/idea", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          pillar: pillar || undefined,
          stage: stage || undefined,
          submitterName: submitterName.trim() || undefined,
          submitterEmail: submitterEmail.trim() || undefined,
          _trap: trap,
        }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(data?.error || `Request failed (${res.status})`);
      }
      setFormState({ kind: "success", result: data as ContributeResponse });
    } catch (err) {
      setFormState({
        kind: "error",
        message: err instanceof Error ? err.message : "Something went wrong. Please try again.",
      });
    }
  }

  if (formState.kind === "success") {
    return (
      <div className="bg-navy/5 border border-navy/20 p-8 text-center">
        <div className="text-3xl mb-3">✓</div>
        <h3 className="font-heading text-xl font-semibold text-black uppercase mb-2">
          Idea submitted!
        </h3>
        <p className="text-sm text-text-secondary font-body mb-4">
          Your idea has been added to the curriculum backlog. Contributors can now pick it up and build it.
        </p>
        {formState.result.url && formState.result.url !== "#" && (
          <a
            href={formState.result.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-red hover:underline"
          >
            View Issue #{formState.result.number} on GitHub →
          </a>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot — hidden from real users, bots fill it in */}
      <input
        type="text"
        name="_trap"
        value={trap}
        onChange={(e) => setTrap(e.target.value)}
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="off"
        className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden"
      />

      <div>
        <label className={labelClass} htmlFor="idea-title">
          Idea title <span className="text-red-500">*</span>
        </label>
        <input
          id="idea-title"
          type="text"
          className={inputClass}
          placeholder="e.g., Build a simple water filter from sand and gravel"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={200}
          required
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="idea-description">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="idea-description"
          className={`${inputClass} h-28 resize-none`}
          placeholder="What would this content cover? Why does it matter? What age is it for?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={2000}
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass} htmlFor="idea-pillar">
            Suggested pillar
          </label>
          <select
            id="idea-pillar"
            className={selectClass}
            value={pillar}
            onChange={(e) => setPillar(e.target.value)}
          >
            <option value="">Not sure</option>
            {VALID_PILLARS.map((p) => (
              <option key={p} value={p}>
                {PILLAR_LABELS[p] ?? p}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="idea-stage">
            Suggested stage
          </label>
          <select
            id="idea-stage"
            className={selectClass}
            value={stage}
            onChange={(e) => setStage(e.target.value)}
          >
            <option value="">Not sure</option>
            {VALID_STAGES.map((s) => (
              <option key={s} value={s}>
                {STAGE_LABELS[s] ?? s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass} htmlFor="idea-name">
            Your name <span className="text-text-secondary font-normal">(optional)</span>
          </label>
          <input
            id="idea-name"
            type="text"
            className={inputClass}
            placeholder="Jane Smith"
            value={submitterName}
            onChange={(e) => setSubmitterName(e.target.value)}
            maxLength={100}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="idea-email">
            Email <span className="text-text-secondary font-normal">(optional)</span>
          </label>
          <input
            id="idea-email"
            type="email"
            className={inputClass}
            placeholder="jane@example.com"
            value={submitterEmail}
            onChange={(e) => setSubmitterEmail(e.target.value)}
            maxLength={200}
          />
        </div>
      </div>

      {formState.kind === "error" && (
        <p className="text-sm text-red bg-red/5 border border-red/20 px-4 py-3">
          {formState.message}
        </p>
      )}

      <button
        type="submit"
        disabled={formState.kind === "loading" || !title.trim() || !description.trim()}
        className="w-full bg-red text-offwhite font-mono text-xs uppercase tracking-[0.15em] py-3 px-6 hover:bg-red/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {formState.kind === "loading" ? "Submitting…" : "Submit Idea"}
      </button>
    </form>
  );
}
