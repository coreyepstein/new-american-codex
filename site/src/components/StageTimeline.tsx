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
          <div className="absolute top-6 left-0 right-0 h-px bg-red/30" />

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
                  className={`w-3 h-3 border-2 mb-4 transition-colors ${
                    activeIndex === i
                      ? "bg-red border-red"
                      : "bg-offwhite border-red/50 group-hover:border-red"
                  }`}
                />

                <p
                  className={`font-heading uppercase font-bold text-base transition-colors ${
                    activeIndex === i
                      ? "text-red"
                      : "text-black group-hover:text-red"
                  }`}
                >
                  {stage.name}
                </p>
                <p className="meta-text mt-1">
                  {stage.ages}
                </p>

                {activeIndex === i && (
                  <p className="text-sm text-text-secondary mt-3 font-body leading-relaxed">
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
                className={`w-3 h-3 border-2 shrink-0 transition-colors ${
                  activeIndex === i
                    ? "bg-red border-red"
                    : "bg-offwhite border-red/50"
                }`}
              />
              {i < stages.length - 1 && (
                <div className="w-px flex-1 bg-red/20 mt-2" />
              )}
            </div>

            <div className="pb-4">
              <p
                className={`font-heading uppercase font-bold text-base transition-colors ${
                  activeIndex === i ? "text-red" : "text-black"
                }`}
              >
                {stage.name}
              </p>
              <p className="meta-text mt-0.5">
                {stage.ages}
              </p>
              {activeIndex === i && (
                <p className="text-sm text-text-secondary mt-2 font-body leading-relaxed">
                  {stage.focus}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Philosophy note */}
      <p className="text-center text-sm text-text-secondary italic mt-8 font-body">
        &ldquo;No child is behind &mdash; only not yet.&rdquo;
      </p>
    </div>
  );
}
