"use client";

import { useState, useCallback } from "react";
import type { ChildProfileRequest } from "@/lib/types/personalize";
import { STAGES } from "@/lib/data";

const PRESET_INTERESTS = [
  "dinosaurs",
  "space",
  "cooking",
  "animals",
  "building",
  "nature",
  "art",
  "music",
  "sports",
  "ocean",
  "robots",
  "gardening",
];

const MODALITIES: { value: ChildProfileRequest["learningModality"]; label: string; description: string }[] = [
  { value: "hands-on", label: "Hands-On", description: "Learns by doing and building" },
  { value: "visual", label: "Visual", description: "Learns through images and diagrams" },
  { value: "verbal", label: "Verbal", description: "Learns through reading and discussion" },
  { value: "mixed", label: "Mixed", description: "A blend of all styles" },
];

const MAX_INTERESTS = 5;

// Stages excluding Genesis (not appropriate for personalized curriculum)
const ELIGIBLE_STAGES = STAGES.filter((s) => s.name !== "Genesis");

interface ChildProfileFormProps {
  onSubmit: (profile: ChildProfileRequest) => void;
}

export function ChildProfileForm({ onSubmit }: ChildProfileFormProps) {
  const [childName, setChildName] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [customInterest, setCustomInterest] = useState("");
  const [stage, setStage] = useState("");
  const [modality, setModality] = useState<ChildProfileRequest["learningModality"] | "">("");

  const toggleInterest = useCallback((interest: string) => {
    setInterests((prev) => {
      if (prev.includes(interest)) {
        return prev.filter((i) => i !== interest);
      }
      if (prev.length >= MAX_INTERESTS) return prev;
      return [...prev, interest];
    });
  }, []);

  const addCustomInterest = useCallback(() => {
    const trimmed = customInterest.trim().toLowerCase();
    if (!trimmed || interests.length >= MAX_INTERESTS || interests.includes(trimmed)) {
      return;
    }
    setInterests((prev) => [...prev, trimmed]);
    setCustomInterest("");
  }, [customInterest, interests]);

  const removeInterest = useCallback((interest: string) => {
    setInterests((prev) => prev.filter((i) => i !== interest));
  }, []);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      addCustomInterest();
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (interests.length === 0 || !stage || !modality) return;

    onSubmit({
      childName: childName.trim() || undefined,
      interests,
      stage: stage.toLowerCase(),
      learningModality: modality,
    });
  }

  const isValid = interests.length > 0 && stage !== "" && modality !== "";

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto space-y-8"
    >
      {/* Child's name */}
      <div>
        <label
          htmlFor="child-name"
          className="block font-serif font-semibold text-ink text-lg mb-2"
        >
          Child&rsquo;s Name{" "}
          <span className="text-sm font-sans font-normal text-slate-deep/50">
            (optional)
          </span>
        </label>
        <input
          id="child-name"
          type="text"
          value={childName}
          onChange={(e) => setChildName(e.target.value)}
          maxLength={50}
          placeholder="e.g. Luna"
          className="w-full px-5 py-3.5 bg-white border border-ink/10 rounded-lg text-ink placeholder:text-slate-deep/40 focus:outline-none focus:ring-2 focus:ring-amber-warm/40 focus:border-amber-warm transition-shadow"
        />
      </div>

      {/* Interests */}
      <fieldset>
        <legend className="block font-serif font-semibold text-ink text-lg mb-1">
          Interests
        </legend>
        <p className="text-sm text-slate-deep/60 mb-4">
          Select up to {MAX_INTERESTS} topics your child loves. You can also add your own.
        </p>

        {/* Preset chips */}
        <div className="flex flex-wrap gap-2 mb-4" role="group" aria-label="Preset interests">
          {PRESET_INTERESTS.map((interest) => {
            const selected = interests.includes(interest);
            const disabled = !selected && interests.length >= MAX_INTERESTS;
            return (
              <button
                key={interest}
                type="button"
                onClick={() => toggleInterest(interest)}
                disabled={disabled}
                aria-pressed={selected}
                aria-label={`${interest}${selected ? " (selected)" : ""}`}
                className={`rounded-full px-3 py-1.5 text-sm border transition-colors ${
                  selected
                    ? "bg-amber-warm/10 border-amber-warm text-amber-warm font-medium"
                    : disabled
                      ? "bg-white border-ink/5 text-slate-deep/30 cursor-not-allowed"
                      : "bg-white border-ink/10 text-slate-deep cursor-pointer hover:border-amber-warm/30 hover:text-amber-warm"
                }`}
              >
                {interest}
              </button>
            );
          })}
        </div>

        {/* Custom interest input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={customInterest}
            onChange={(e) => setCustomInterest(e.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={30}
            placeholder="Add a custom interest..."
            disabled={interests.length >= MAX_INTERESTS}
            aria-label="Custom interest"
            className="flex-1 px-4 py-2.5 bg-white border border-ink/10 rounded-lg text-sm text-ink placeholder:text-slate-deep/40 focus:outline-none focus:ring-2 focus:ring-amber-warm/40 focus:border-amber-warm transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            type="button"
            onClick={addCustomInterest}
            disabled={!customInterest.trim() || interests.length >= MAX_INTERESTS}
            className="px-4 py-2.5 bg-cream border border-ink/10 rounded-lg text-sm font-medium text-slate-deep hover:bg-amber-warm/10 hover:border-amber-warm/30 hover:text-amber-warm transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Add
          </button>
        </div>

        {/* Selected interests display */}
        {interests.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4" aria-label="Selected interests">
            {interests.map((interest) => (
              <span
                key={interest}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm bg-amber-warm/10 border border-amber-warm text-amber-warm font-medium"
              >
                {interest}
                <button
                  type="button"
                  onClick={() => removeInterest(interest)}
                  aria-label={`Remove ${interest}`}
                  className="ml-0.5 text-amber-warm/60 hover:text-amber-warm transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </span>
            ))}
            <span className="text-xs text-slate-deep/40 self-center">
              {interests.length}/{MAX_INTERESTS}
            </span>
          </div>
        )}
      </fieldset>

      {/* Stage */}
      <div>
        <label
          htmlFor="stage-select"
          className="block font-serif font-semibold text-ink text-lg mb-2"
        >
          Stage
        </label>
        <p className="text-sm text-slate-deep/60 mb-3">
          Choose the developmental stage that best fits your child.
        </p>
        <select
          id="stage-select"
          value={stage}
          onChange={(e) => setStage(e.target.value)}
          className="w-full px-5 py-3.5 bg-white border border-ink/10 rounded-lg text-ink appearance-none focus:outline-none focus:ring-2 focus:ring-amber-warm/40 focus:border-amber-warm transition-shadow"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%234a5568'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 1rem center",
            backgroundSize: "1.25rem",
          }}
        >
          <option value="">Select a stage...</option>
          {ELIGIBLE_STAGES.map((s) => (
            <option key={s.name} value={s.name}>
              {s.name} ({s.ages}) &mdash; {s.focus.split(",")[0]}
            </option>
          ))}
        </select>
      </div>

      {/* Learning Modality */}
      <fieldset>
        <legend className="block font-serif font-semibold text-ink text-lg mb-2">
          Learning Style
        </legend>
        <p className="text-sm text-slate-deep/60 mb-4">
          How does your child learn best?
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {MODALITIES.map((m) => {
            const selected = modality === m.value;
            return (
              <label
                key={m.value}
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  selected
                    ? "bg-amber-warm/5 border-amber-warm shadow-sm"
                    : "bg-white border-ink/10 hover:border-amber-warm/30"
                }`}
              >
                <input
                  type="radio"
                  name="modality"
                  value={m.value}
                  checked={selected}
                  onChange={() => setModality(m.value)}
                  className="mt-1 accent-amber-warm"
                  aria-label={m.label}
                />
                <div>
                  <span className="block text-sm font-semibold text-ink">
                    {m.label}
                  </span>
                  <span className="block text-xs text-slate-deep/60 mt-0.5">
                    {m.description}
                  </span>
                </div>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Submit */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={!isValid}
          className="w-full sm:w-auto px-8 py-3.5 bg-amber-warm text-ink font-semibold text-sm rounded-lg hover:bg-amber-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Generate My Week
        </button>
        {!isValid && (
          <p className="text-xs text-slate-deep/50 mt-2">
            Please select at least one interest, a stage, and a learning style.
          </p>
        )}
      </div>
    </form>
  );
}
