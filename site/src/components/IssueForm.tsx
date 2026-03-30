"use client";

import { useState } from "react";
import type { ContributeResponse } from "@/lib/types/contribute";

type FormState =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success"; result: ContributeResponse }
  | { kind: "error"; message: string };

const inputClass =
  "w-full border border-ink/20 rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-warm/40 focus:border-amber-warm transition-colors";
const labelClass = "block text-sm font-medium text-slate-deep mb-1";

export function IssueForm() {
  const [contentUnit, setContentUnit] = useState("");
  const [description, setDescription] = useState("");
  const [suggestedFix, setSuggestedFix] = useState("");
  const [submitterName, setSubmitterName] = useState("");
  const [submitterEmail, setSubmitterEmail] = useState("");
  const [trap, setTrap] = useState("");
  const [formState, setFormState] = useState<FormState>({ kind: "idle" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!contentUnit.trim() || !description.trim()) return;

    setFormState({ kind: "loading" });
    try {
      const res = await fetch("/api/contribute/issue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentUnit: contentUnit.trim(),
          description: description.trim(),
          suggestedFix: suggestedFix.trim() || undefined,
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
          Report submitted!
        </h3>
        <p className="text-sm text-slate-deep mb-4">
          Safety concerns are prioritized and reviewed immediately. Thank you for helping keep the curriculum accurate and safe.
        </p>
        {formState.result.url && formState.result.url !== "#" && (
          <a
            href={formState.result.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-amber-warm hover:underline"
          >
            View Issue #{formState.result.number} on GitHub →
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

      <div className="bg-amber-warm/5 border border-amber-warm/20 rounded-lg px-4 py-3 text-sm text-slate-deep">
        <strong>Safety concerns are treated with the highest priority.</strong> If content could physically harm a child, flag it here and it will be reviewed immediately.
      </div>

      <div>
        <label className={labelClass} htmlFor="issue-unit">
          Which content unit? <span className="text-red-500">*</span>
        </label>
        <input
          id="issue-unit"
          type="text"
          className={inputClass}
          placeholder="e.g., Explorer / Physical Survival / activity-fire-starting-bow-drill"
          value={contentUnit}
          onChange={(e) => setContentUnit(e.target.value)}
          maxLength={300}
          required
        />
        <p className="text-xs text-slate-deep/50 mt-1">
          The title, URL, or file path of the content with the issue.
        </p>
      </div>

      <div>
        <label className={labelClass} htmlFor="issue-description">
          What&apos;s wrong? <span className="text-red-500">*</span>
        </label>
        <textarea
          id="issue-description"
          className={`${inputClass} h-28 resize-none`}
          placeholder="Describe the error, safety concern, or inaccuracy. Be specific."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={3000}
          required
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="issue-fix">
          Suggested fix <span className="text-ink/40 font-normal">(optional)</span>
        </label>
        <textarea
          id="issue-fix"
          className={`${inputClass} h-20 resize-none`}
          placeholder="If you know how to correct it, share your suggestion here."
          value={suggestedFix}
          onChange={(e) => setSuggestedFix(e.target.value)}
          maxLength={2000}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass} htmlFor="issue-name">
            Your name <span className="text-ink/40 font-normal">(optional)</span>
          </label>
          <input
            id="issue-name"
            type="text"
            className={inputClass}
            placeholder="Jane Smith"
            value={submitterName}
            onChange={(e) => setSubmitterName(e.target.value)}
            maxLength={100}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="issue-email">
            Email <span className="text-ink/40 font-normal">(optional)</span>
          </label>
          <input
            id="issue-email"
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
        disabled={formState.kind === "loading" || !contentUnit.trim() || !description.trim()}
        className="w-full bg-amber-warm text-white font-medium py-3 px-6 rounded-lg hover:bg-amber-warm/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {formState.kind === "loading" ? "Submitting…" : "Submit Report"}
      </button>
    </form>
  );
}
