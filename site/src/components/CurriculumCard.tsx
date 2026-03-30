import Link from "next/link";
import {
  PILLAR_COLORS,
  PILLAR_DISPLAY,
  STAGE_COLORS,
  CONTENT_TYPE_ICONS,
  capitalize,
  formatContentType,
} from "@/lib/display-maps";

interface CurriculumCardProps {
  slug: string;
  title: string;
  pillar: string;
  stage: string;
  contentType: string;
  duration: string;
  materialsCount: number;
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
