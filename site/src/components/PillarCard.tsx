"use client";

interface PillarCardProps {
  number: number;
  name: string;
  tagline: string;
  description: string;
  expanded?: boolean;
  onClick?: () => void;
  interactive?: boolean;
}

export function PillarCard({
  number,
  name,
  tagline,
  description,
  expanded = false,
  onClick,
  interactive = false,
}: PillarCardProps) {
  const Component = interactive ? "button" : "div";

  return (
    <Component
      onClick={interactive ? onClick : undefined}
      className={`text-left w-full group ${interactive ? "cursor-pointer" : ""}`}
    >
      <div className="pb-6">
        <span className="font-serif text-5xl font-bold text-amber-warm/30 leading-none">
          {String(number).padStart(2, "0")}
        </span>
        <h3 className="font-serif text-xl font-semibold text-ink mt-2 group-hover:text-amber-warm transition-colors">
          {name}
        </h3>
        <p className="text-sm text-amber-warm font-medium mt-1 italic">
          {tagline}
        </p>
        {(expanded || !interactive) && (
          <p className="text-sm text-slate-deep/80 mt-3 leading-relaxed">
            {description}
          </p>
        )}
        {interactive && !expanded && (
          <p className="text-xs text-slate-deep/50 mt-3">
            Click to read more
          </p>
        )}
      </div>
    </Component>
  );
}
