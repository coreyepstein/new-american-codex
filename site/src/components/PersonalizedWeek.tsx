"use client";

import type { PersonalizeResponse } from "@/lib/types/personalize";
import { capitalize, STAGE_COLORS } from "@/lib/display-maps";
import { GeneratedUnitCard } from "@/components/GeneratedUnitCard";

interface PersonalizedWeekProps {
  response: PersonalizeResponse;
}

export function PersonalizedWeek({ response }: PersonalizedWeekProps) {
  const { units, childName, stage } = response;
  const stageColor = STAGE_COLORS[stage] ?? "bg-gray-100 text-gray-700";

  const heading = childName
    ? `${childName}\u2019s Personalized Week`
    : "Your Personalized Week";

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif fluid-h3 font-bold text-ink mb-2">
            {heading}
          </h1>
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full ${stageColor}`}
            >
              {capitalize(stage)}
            </span>
            <span className="text-sm text-slate-deep/60">
              {units.length} unit{units.length !== 1 ? "s" : ""} generated
            </span>
          </div>
        </div>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-ink/10 rounded-lg text-sm font-medium text-slate-deep hover:border-amber-warm/30 hover:text-amber-warm transition-colors no-print"
          aria-label="Print this week's curriculum"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4H7v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Print Week
        </button>
      </div>

      {/* Unit cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {units.map((unit, index) => (
          <GeneratedUnitCard key={index} unit={unit} index={index} />
        ))}
      </div>
    </div>
  );
}
