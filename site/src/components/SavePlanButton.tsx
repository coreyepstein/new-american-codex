"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import type { Child } from "@/lib/db/types";

interface Props {
  planId?: string;
  stage: string;
  interests: string[];
  childName?: string;
  onSaved?: (planId: string) => void;
}

export function SavePlanButton({ planId, stage, interests, childName, onSaved }: Props) {
  const { isSignedIn } = useAuth();
  const [children, setChildren] = useState<Child[] | null>(null);
  const [selectedChildId, setSelectedChildId] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  // Already saved
  if (planId) {
    return (
      <Link
        href={`/dashboard/plan/${planId}`}
        className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-offwhite font-mono text-xs uppercase tracking-[0.15em] hover:bg-navy/90 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Saved — View in My Plans
      </Link>
    );
  }

  if (!isSignedIn) {
    return (
      <p className="font-mono text-xs text-text-secondary">
        <Link href="/sign-in" className="text-red hover:underline">Sign in</Link>{" "}
        to save this plan and track progress.
      </p>
    );
  }

  async function handleOpenPicker() {
    if (!children) {
      const res = await fetch("/api/children");
      const data = await res.json();
      const loaded = (data.children ?? []) as Child[];
      setChildren(loaded);
      if (loaded.length > 0) setSelectedChildId(loaded[0].id);
    }
    setShowPicker(true);
  }

  async function handleSave() {
    if (!selectedChildId) return;
    setSaving(true);
    setError(null);

    try {
      const res = await fetch("/api/personalize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stage,
          learningModality: "mixed",
          interests,
          childName,
          childId: selectedChildId,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.planId) onSaved?.(data.planId as string);
      } else {
        setError("Failed to save plan");
      }
    } catch {
      setError("Failed to save plan");
    } finally {
      setSaving(false);
    }
  }

  if (!showPicker) {
    return (
      <button
        onClick={handleOpenPicker}
        className="inline-flex items-center gap-2 px-6 py-3 border border-card-border text-black font-mono text-xs uppercase tracking-[0.15em] hover:bg-card-bg transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>
        Save to My Plans
      </button>
    );
  }

  if (children?.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2">
        <p className="font-mono text-xs text-text-secondary">
          Add a child profile first to save plans.
        </p>
        <Link
          href="/dashboard/children"
          className="font-mono text-xs text-red hover:underline uppercase tracking-[0.1em]"
        >
          Add Child →
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-3">
        <select
          value={selectedChildId}
          onChange={(e) => setSelectedChildId(e.target.value)}
          className="border border-card-border px-3 py-2 font-body text-sm bg-offwhite focus:outline-none focus:border-red"
        >
          {(children ?? []).map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <button
          onClick={handleSave}
          disabled={saving || !selectedChildId}
          className="px-5 py-2 bg-red text-offwhite font-mono text-xs uppercase tracking-[0.15em] hover:bg-red/90 transition-colors disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save"}
        </button>
      </div>
      {error && <p className="font-mono text-xs text-red">{error}</p>}
    </div>
  );
}
