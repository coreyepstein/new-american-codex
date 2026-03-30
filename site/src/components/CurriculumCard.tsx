import Link from "next/link";

interface CurriculumCardProps {
  slug: string;
  title: string;
  pillar: string;
  stage: string;
  contentType: string;
  duration: string;
  materialsCount: number;
}

const CONTENT_TYPE_ICONS: Record<string, string> = {
  lesson: "\u{1F4D6}",
  activity: "\u{1F528}",
  project: "\u{1F3D7}\uFE0F",
  "field-plan": "\u{1F5FA}\uFE0F",
  recipe: "\u{1F373}",
  experiment: "\u{1F52C}",
  adventure: "\u{1F3D4}\uFE0F",
  practice: "\u270F\uFE0F",
  discussion: "\u{1F4AC}",
  service: "\u{1F91D}",
};

const PILLAR_COLORS: Record<string, string> = {
  "agency-critical-thinking": "bg-purple-100 text-purple-800",
  "american-dynamism": "bg-blue-100 text-blue-800",
  "physical-survival": "bg-green-100 text-green-800",
  "building-engineering": "bg-orange-100 text-orange-800",
  "software-ai": "bg-cyan-100 text-cyan-800",
  "food-farming": "bg-lime-100 text-lime-800",
  "core-academics": "bg-amber-100 text-amber-800",
  "character-purpose": "bg-rose-100 text-rose-800",
};

const PILLAR_DISPLAY: Record<string, string> = {
  "agency-critical-thinking": "Agency & Critical Thinking",
  "american-dynamism": "American Dynamism",
  "physical-survival": "Physical & Survival",
  "building-engineering": "Building & Engineering",
  "software-ai": "Software & AI",
  "food-farming": "Food & Farming",
  "core-academics": "Core Academics",
  "character-purpose": "Character & Purpose",
};

const STAGE_COLORS: Record<string, string> = {
  genesis: "bg-slate-100 text-slate-700",
  foundation: "bg-amber-50 text-amber-700",
  explorer: "bg-emerald-50 text-emerald-700",
  builder: "bg-sky-50 text-sky-700",
  apprentice: "bg-violet-50 text-violet-700",
  architect: "bg-red-50 text-red-700",
};

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function formatContentType(ct: string): string {
  return ct
    .split("-")
    .map((w) => capitalize(w))
    .join(" ");
}

export function CurriculumCard({
  slug,
  title,
  pillar,
  stage,
  contentType,
  duration,
  materialsCount,
}: CurriculumCardProps) {
  const icon = CONTENT_TYPE_ICONS[contentType] ?? "\u{1F4D6}";
  const pillarColor = PILLAR_COLORS[pillar] ?? "bg-gray-100 text-gray-800";
  const pillarLabel = PILLAR_DISPLAY[pillar] ?? capitalize(pillar);
  const stageColor = STAGE_COLORS[stage] ?? "bg-gray-100 text-gray-700";

  return (
    <Link
      href={`/browse/${slug}`}
      className="group block bg-white rounded-xl border border-ink/5 p-5 hover:shadow-lg hover:border-amber-warm/20 hover:-translate-y-1 transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className="text-2xl group-hover:scale-110 transition-transform duration-200" role="img" aria-label={contentType}>
          {icon}
        </span>
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full ${stageColor}`}
        >
          {capitalize(stage)}
        </span>
      </div>

      <h3 className="font-serif font-semibold text-ink text-lg leading-snug group-hover:text-amber-warm transition-colors mb-3">
        {title}
      </h3>

      <div className="flex flex-wrap gap-1.5 mb-3">
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full ${pillarColor}`}
        >
          {pillarLabel}
        </span>
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
          {formatContentType(contentType)}
        </span>
      </div>

      <div className="flex items-center gap-4 text-xs text-slate-deep/60">
        {duration && (
          <span className="flex items-center gap-1">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round" />
            </svg>
            {duration}
          </span>
        )}
        {materialsCount > 0 && (
          <span className="flex items-center gap-1">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
            {materialsCount} material{materialsCount !== 1 ? "s" : ""}
          </span>
        )}
      </div>
    </Link>
  );
}
