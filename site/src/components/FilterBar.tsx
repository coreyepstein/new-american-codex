"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

interface FilterBarProps {
  activeStage: string;
  activePillar: string;
  activeContentType: string;
  activeSearch: string;
  totalCount: number;
  filteredCount: number;
}

const STAGES = [
  { value: "genesis", label: "Genesis" },
  { value: "foundation", label: "Foundation" },
  { value: "explorer", label: "Explorer" },
  { value: "builder", label: "Builder" },
  { value: "apprentice", label: "Apprentice" },
  { value: "architect", label: "Architect" },
];

const PILLARS = [
  { value: "agency-critical-thinking", label: "Agency & Critical Thinking" },
  { value: "american-dynamism", label: "American Dynamism" },
  { value: "physical-survival", label: "Physical & Survival" },
  { value: "building-engineering", label: "Building & Engineering" },
  { value: "software-ai", label: "Software & AI" },
  { value: "food-farming", label: "Food & Farming" },
  { value: "core-academics", label: "Core Academics" },
  { value: "character-purpose", label: "Character & Purpose" },
];

const CONTENT_TYPES = [
  { value: "lesson", label: "Lesson" },
  { value: "activity", label: "Activity" },
  { value: "project", label: "Project" },
  { value: "field-plan", label: "Field Plan" },
  { value: "recipe", label: "Recipe" },
  { value: "experiment", label: "Experiment" },
  { value: "adventure", label: "Adventure" },
  { value: "practice", label: "Practice" },
  { value: "discussion", label: "Discussion" },
  { value: "service", label: "Service" },
];

export function FilterBar({
  activeStage,
  activePillar,
  activeContentType,
  activeSearch,
  totalCount,
  filteredCount,
}: FilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Controlled input state — syncs with URL param so "Clear filters" resets the field
  const [localSearch, setLocalSearch] = useState(activeSearch);
  useEffect(() => {
    setLocalSearch(activeSearch);
  }, [activeSearch]);

  const cancelDebounce = useCallback(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
  }, []);

  const updateFilter = useCallback(
    (key: string, value: string) => {
      cancelDebounce();
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`/browse?${params.toString()}`);
    },
    [router, searchParams, cancelDebounce]
  );

  const clearFilters = useCallback(() => {
    cancelDebounce();
    router.push("/browse");
  }, [router, cancelDebounce]);

  const hasFilters =
    activeStage || activePillar || activeContentType || activeSearch;

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8" strokeWidth="2" />
          <path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          placeholder="Search curriculum..."
          value={localSearch}
          onChange={(e) => {
            const value = e.target.value;
            setLocalSearch(value);
            // Debounce: update URL after user stops typing
            cancelDebounce();
            debounceRef.current = setTimeout(
              () => updateFilter("search", value),
              300
            );
          }}
          className="w-full pl-10 pr-4 py-2.5 border border-card-border bg-white text-sm text-black font-mono text-xs uppercase placeholder:text-text-secondary/60 placeholder:normal-case placeholder:capitalize-none focus:outline-none focus:ring-2 focus:ring-red focus:border-red transition-colors"
        />
      </div>

      {/* Filter dropdowns */}
      <div className="flex flex-wrap gap-3">
        <select
          value={activeStage}
          onChange={(e) => updateFilter("stage", e.target.value)}
          className="px-3 py-2 border border-card-border bg-white font-mono text-xs uppercase text-black focus:outline-none focus:ring-2 focus:ring-red focus:border-red transition-all duration-300"
        >
          <option value="">All Stages</option>
          {STAGES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>

        <select
          value={activePillar}
          onChange={(e) => updateFilter("pillar", e.target.value)}
          className="px-3 py-2 border border-card-border bg-white font-mono text-xs uppercase text-black focus:outline-none focus:ring-2 focus:ring-red focus:border-red transition-all duration-300"
        >
          <option value="">All Pillars</option>
          {PILLARS.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>

        <select
          value={activeContentType}
          onChange={(e) => updateFilter("type", e.target.value)}
          className="px-3 py-2 border border-card-border bg-white font-mono text-xs uppercase text-black focus:outline-none focus:ring-2 focus:ring-red focus:border-red transition-all duration-300"
        >
          <option value="">All Types</option>
          {CONTENT_TYPES.map((ct) => (
            <option key={ct.value} value={ct.value}>
              {ct.label}
            </option>
          ))}
        </select>

        {hasFilters && (
          <button
            onClick={clearFilters}
            className="px-3 py-2 font-mono text-xs uppercase font-medium text-red hover:text-red/80 hover:bg-red/5 transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Results count */}
      <p className="text-sm text-text-secondary font-mono">
        {hasFilters ? (
          <>
            Showing <span className="font-medium text-black">{filteredCount}</span>{" "}
            of {totalCount} content units
          </>
        ) : (
          <>
            <span className="font-medium text-black">{totalCount}</span> content
            units available
          </>
        )}
      </p>
    </div>
  );
}
