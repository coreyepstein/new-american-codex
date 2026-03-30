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
        <span className="font-heading text-5xl font-bold text-red/20 leading-none">
          {String(number).padStart(2, "0")}
        </span>
        <h3 className="font-heading text-xl font-bold uppercase text-black mt-2 group-hover:text-red transition-colors">
          {name}
        </h3>
        <p className="font-mono text-xs uppercase tracking-wider text-red font-bold mt-1">
          {tagline}
        </p>
        {(expanded || !interactive) && (
          <p className="text-sm text-text-secondary mt-3 leading-relaxed font-body">
            {description}
          </p>
        )}
        {interactive && !expanded && (
          <p className="text-xs text-text-secondary/50 mt-3 font-body">
            Click to read more
          </p>
        )}
      </div>
    </Component>
  );
}
