"use client";

import { useState } from "react";
import type { ContributeResponse } from "@/lib/types/contribute";
import { VALID_PILLARS, VALID_STAGES, VALID_CONTENT_TYPES } from "@/lib/types/personalize";

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

const CONTENT_TYPE_LABELS: Record<string, string> = {
  lesson: "Lesson",
  activity: "Activity",
  project: "Project",
  "field-plan": "Field Plan",
  recipe: "Recipe",
  experiment: "Experiment",
  adventure: "Adventure",
  practice: "Practice",
  discussion: "Discussion",
  service: "Service",
};

type FormState =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success"; result: ContributeResponse }
  | { kind: "error"; message: string };

const inputClass =
  "w-full border border-ink/20 rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-warm/40 focus:border-amber-warm transition-colors";
const labelClass = "block text-sm font-medium text-slate-deep mb-1";
const selectClass =
  "w-full border border-ink/20 rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-warm/40 focus:border-amber-warm transition-colors";

export function ContentForm() {
  const [title, setTitle] = useState("");
  const [pillar, setPillar] = useState("");
  const [stage, setStage] = useState("");
  const [contentType, setContentType] = useState("");
  const [learningObjectives, setLearningObjectives] = useState("");
  const [materials, setMaterials] = useState("");
  const [duration, setDuration] = useState("");
  const [body, setBody] = useState("");
  const [submitterName, setSubmitterName] = useState("");
  const [submitterEmail, setSubmitterEmail] = useState("");
  const [trap, setTrap] = useState("");
  const [formState, setFormState] = useState<FormState>({ kind: "idle" });

  const isValid =
    title.trim() &&
    pillar &&
    stage &&
    contentType &&
    learningObjectives.trim() &&
    materials.trim() &&
    duration.trim() &&
    body.trim();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;

    setFormState({ kind: "loading" });
    try {
      const res = await fetch("/api/contribute/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          pillar,
          stage,
          contentType,
          learningObjectives: learningObjectives.trim(),
          materials: materials.trim(),
          duration: duration.trim(),
          body: body.trim(),
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
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="text-3xl mb-3">✓</div>
        <h3 className="font-serif text-xl font-semibold text-ink mb-2">
          Content submitted!
        </h3>
        <p className="text-sm text-slate-deep mb-4">
          A draft pull request has been created. A maintainer will review it and may follow up with feedback.
        </p>
        {formState.result.url && formState.result.url !== "#" && (
          <a
            href={formState.result.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-amber-warm hover:underline"
          >
            View Draft PR #{formState.result.number} on GitHub →
          </a>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot */}
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
        <label className={labelClass} htmlFor="content-title">
          Content title <span className="text-red-500">*</span>
        </label>
        <input
          id="content-title"
          type="text"
          className={inputClass}
          placeholder="e.g., Fire Starting Basics: Bow Drill Method"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={200}
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className={labelClass} htmlFor="content-pillar">
            Pillar <span className="text-red-500">*</span>
          </label>
          <select
            id="content-pillar"
            className={selectClass}
            value={pillar}
            onChange={(e) => setPillar(e.target.value)}
            required
          >
            <option value="">Select pillar</option>
            {VALID_PILLARS.map((p) => (
              <option key={p} value={p}>
                {PILLAR_LABELS[p] ?? p}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="content-stage">
            Stage <span className="text-red-500">*</span>
          </label>
          <select
            id="content-stage"
            className={selectClass}
            value={stage}
            onChange={(e) => setStage(e.target.value)}
            required
          >
            <option value="">Select stage</option>
            {VALID_STAGES.map((s) => (
              <option key={s} value={s}>
                {STAGE_LABELS[s] ?? s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="content-type">
            Content type <span className="text-red-500">*</span>
          </label>
          <select
            id="content-type"
            className={selectClass}
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
            required
          >
            <option value="">Select type</option>
            {VALID_CONTENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {CONTENT_TYPE_LABELS[t] ?? t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="content-objectives">
          Learning objectives <span className="text-red-500">*</span>
        </label>
        <p className="text-xs text-slate-deep/60 mb-1.5">
          One per line. Be specific: &ldquo;Identify three fire-starting methods&rdquo; not &ldquo;Learn about fire&rdquo;.
        </p>
        <textarea
          id="content-objectives"
          className={`${inputClass} h-24 resize-none`}
          placeholder={"Demonstrate correct bow drill technique\nIdentify three types of tinder\nBuild a fire lay without assistance"}
          value={learningObjectives}
          onChange={(e) => setLearningObjectives(e.target.value)}
          maxLength={2000}
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass} htmlFor="content-materials">
            Materials <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-slate-deep/60 mb-1.5">One per line.</p>
          <textarea
            id="content-materials"
            className={`${inputClass} h-28 resize-none`}
            placeholder={"Dry softwood spindle\nDry hardwood fireboard\nDry tinder bundle (dried grass or bark)"}
            value={materials}
            onChange={(e) => setMaterials(e.target.value)}
            maxLength={2000}
            required
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="content-duration">
            Duration <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-slate-deep/60 mb-1.5">Estimated time.</p>
          <input
            id="content-duration"
            type="text"
            className={inputClass}
            placeholder="e.g., 45–60 minutes"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            maxLength={50}
            required
          />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="content-body">
          Content body <span className="text-red-500">*</span>
        </label>
        <p className="text-xs text-slate-deep/60 mb-1.5">
          Write the full content using Markdown. Include an introduction, step-by-step instructions, and any safety notes.
        </p>
        <textarea
          id="content-body"
          className={`${inputClass} h-64 resize-y font-mono text-xs`}
          placeholder={"## Introduction\n\nFire is one of humanity's oldest tools...\n\n## Materials\n\n(list your materials here)\n\n## Instructions\n\n1. Prepare your fireboard...\n\n## Safety Notes\n\n⚠️ Always supervise children near open flame."}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxLength={20000}
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass} htmlFor="content-name">
            Your name <span className="text-ink/40 font-normal">(optional)</span>
          </label>
          <input
            id="content-name"
            type="text"
            className={inputClass}
            placeholder="Jane Smith"
            value={submitterName}
            onChange={(e) => setSubmitterName(e.target.value)}
            maxLength={100}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="content-email">
            Email <span className="text-ink/40 font-normal">(optional)</span>
          </label>
          <input
            id="content-email"
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
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {formState.message}
        </p>
      )}

      <button
        type="submit"
        disabled={formState.kind === "loading" || !isValid}
        className="w-full bg-amber-warm text-white font-medium py-3 px-6 rounded-lg hover:bg-amber-warm/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {formState.kind === "loading" ? "Submitting…" : "Submit Content Draft"}
      </button>

      <p className="text-xs text-slate-deep/50 text-center">
        This creates a draft pull request on GitHub. A maintainer will review it before it goes live.
      </p>
    </form>
  );
}
