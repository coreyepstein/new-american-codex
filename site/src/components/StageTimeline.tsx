"use client";

import { useState } from "react";
import type { Stage } from "@/lib/data";

interface StageTimelineProps {
  stages: Stage[];
}

export function StageTimeline({ stages }: StageTimelineProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div>
      {/* Desktop: horizontal timeline */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-6 left-0 right-0 h-px bg-amber-warm/30" />

          <div className="grid grid-cols-6 gap-2">
            {stages.map((stage, i) => (
              <button
                key={stage.name}
                onClick={() =>
                  setActiveIndex(activeIndex === i ? null : i)
                }
                className="relative pt-0 text-left group cursor-pointer"
              >
                {/* Dot */}
                <div
                  className={`w-3 h-3 rounded-full border-2 mb-4 transition-colors ${
                    activeIndex === i
                      ? "bg-amber-warm border-amber-warm"
                      : "bg-parchment border-amber-warm/50 group-hover:border-amber-warm"
                  }`}
                />

                <p
                  className={`font-serif font-semibold text-base transition-colors ${
                    activeIndex === i
                      ? "text-amber-warm"
                      : "text-ink group-hover:text-amber-warm"
                  }`}
                >
                  {stage.name}
                </p>
                <p className="text-xs text-slate-deep/60 mt-1">
                  {stage.ages}
                </p>

                {activeIndex === i && (
                  <p className="text-sm text-slate-deep/80 mt-3 leading-relaxed">
                    {stage.focus}
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: vertical list */}
      <div className="md:hidden space-y-6">
        {stages.map((stage, i) => (
          <button
            key={stage.name}
            onClick={() =>
              setActiveIndex(activeIndex === i ? null : i)
            }
            className="w-full text-left flex gap-4 cursor-pointer"
          >
            {/* Vertical line + dot */}
            <div className="flex flex-col items-center">
              <div
                className={`w-3 h-3 rounded-full border-2 shrink-0 transition-colors ${
                  activeIndex === i
                    ? "bg-amber-warm border-amber-warm"
                    : "bg-parchment border-amber-warm/50"
                }`}
              />
              {i < stages.length - 1 && (
                <div className="w-px flex-1 bg-amber-warm/20 mt-2" />
              )}
            </div>

            <div className="pb-4">
              <p
                className={`font-serif font-semibold text-base transition-colors ${
                  activeIndex === i ? "text-amber-warm" : "text-ink"
                }`}
              >
                {stage.name}
              </p>
              <p className="text-xs text-slate-deep/60 mt-0.5">
                {stage.ages}
              </p>
              {activeIndex === i && (
                <p className="text-sm text-slate-deep/80 mt-2 leading-relaxed">
                  {stage.focus}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Philosophy note */}
      <p className="text-center text-sm text-slate-deep/50 italic mt-8">
        &ldquo;No child is behind &mdash; only not yet.&rdquo;
      </p>
    </div>
  );
}
