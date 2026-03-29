"use client";

import { useState } from "react";
import { PillarCard } from "@/components/PillarCard";
import type { Pillar } from "@/lib/data";

interface PillarGridProps {
  pillars: Pillar[];
}

export function PillarGrid({ pillars }: PillarGridProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-2">
      {pillars.map((pillar, i) => (
        <PillarCard
          key={pillar.number}
          number={pillar.number}
          name={pillar.name}
          tagline={pillar.tagline}
          description={pillar.description}
          interactive
          expanded={expandedIndex === i}
          onClick={() =>
            setExpandedIndex(expandedIndex === i ? null : i)
          }
        />
      ))}
    </div>
  );
}
