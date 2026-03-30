"use client";

import { useState, useMemo } from "react";
import { Marked } from "marked";
import type { GeneratedUnit } from "@/lib/types/personalize";
import {
  PILLAR_COLORS,
  PILLAR_DISPLAY,
  STAGE_COLORS,
  CONTENT_TYPE_ICONS,
  capitalize,
  formatContentType,
} from "@/lib/display-maps";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const safeMarked = new Marked({
  renderer: {
    html({ text }: { text: string }): string {
      return escapeHtml(text);
    },
    link({
      href,
      title,
      text,
    }: {
      href: string;
      title?: string | null;
      text: string;
    }): string {
      const safeHref = /^(javascript|data|vbscript):/i.test(href ?? "")
        ? "#"
        : escapeHtml(href);
      const titleAttr = title ? ` title="${escapeHtml(title)}"` : "";
      // Sanitize link text to prevent injected HTML within anchor content
      const safeText = text.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/on\w+\s*=/gi, "");
      return `<a href="${safeHref}"${titleAttr} rel="noopener noreferrer">${safeText}</a>`;
    },
    image({
      href,
      title,
      text,
    }: {
      href: string;
      title?: string | null;
      text: string;
    }): string {
      // Block dangerous protocols in image src
      const safeHref = /^(javascript|data|vbscript):/i.test(href ?? "")
        ? ""
        : escapeHtml(href);
      const titleAttr = title ? ` title="${escapeHtml(title)}"` : "";
      return safeHref
        ? `<img src="${safeHref}" alt="${escapeHtml(text)}"${titleAttr} />`
        : `<span>${escapeHtml(text)}</span>`;
    },
  },
});

interface GeneratedUnitCardProps {
  unit: GeneratedUnit;
  index: number;
}

export function GeneratedUnitCard({ unit, index }: GeneratedUnitCardProps) {
  const [expanded, setExpanded] = useState(false);

  const pillarColor =
    PILLAR_COLORS[unit.pillar] ?? "bg-gray-100 text-gray-800";
  const pillarLabel = PILLAR_DISPLAY[unit.pillar] ?? capitalize(unit.pillar);
  const stageColor = STAGE_COLORS[unit.stage] ?? "bg-gray-100 text-gray-700";
  const contentIcon = CONTENT_TYPE_ICONS[unit.contentType] ?? "\u{1F4D6}";

  const bodyHtml = useMemo(() => {
    if (!unit.body) return "";
    // safeMarked.parse returns string | Promise<string>; we use parseInline
    // approach or handle synchronously since our config is sync
    const result = safeMarked.parse(unit.body);
    // Marked with sync renderer returns string directly
    return typeof result === "string" ? result : "";
  }, [unit.body]);

  return (
    <article className="bg-white rounded-xl border border-ink/5 p-5 print-break-avoid">
      {/* Day badge + Stage */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-warm/10 text-amber-warm">
          Day {index + 1}
        </span>
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full ${stageColor}`}
        >
          {capitalize(unit.stage)}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-serif font-semibold text-ink text-lg leading-snug mb-3">
        {unit.title}
      </h3>

      {/* Badges */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full ${pillarColor}`}
        >
          {pillarLabel}
        </span>
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
          {contentIcon} {formatContentType(unit.contentType)}
        </span>
      </div>

      {/* Duration & materials count */}
      <div className="flex items-center gap-4 text-xs text-slate-deep/60 mb-4">
        {unit.duration && (
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
            {unit.duration}
          </span>
        )}
        {unit.materials.length > 0 && (
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
            {unit.materials.length} material
            {unit.materials.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Learning objectives */}
      {unit.learningObjectives.length > 0 && (
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-slate-deep/50 uppercase tracking-wide mb-2">
            Learning Objectives
          </h4>
          <ul className="space-y-1">
            {unit.learningObjectives.map((lo, i) => (
              <li
                key={i}
                className="text-sm text-slate-deep/80 flex items-start gap-2"
              >
                <span className="text-amber-warm mt-0.5 shrink-0">
                  {i + 1}.
                </span>
                {lo}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Expandable body */}
      {bodyHtml && (
        <div>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              expanded ? "max-h-none print-expanded" : "max-h-0"
            }`}
          >
            <div className="pt-4 border-t border-ink/5">
              <article
                className="prose prose-sm max-w-none
                  prose-headings:font-serif prose-headings:text-ink
                  prose-h2:text-lg prose-h2:mt-6 prose-h2:mb-3
                  prose-h3:text-base prose-h3:mt-4 prose-h3:mb-2
                  prose-p:text-slate-deep/80 prose-p:leading-relaxed
                  prose-li:text-slate-deep/80
                  prose-strong:text-ink
                  prose-a:text-amber-warm prose-a:no-underline hover:prose-a:text-amber-deep
                  prose-blockquote:border-l-amber-warm prose-blockquote:text-slate-deep/70
                  prose-code:text-amber-deep prose-code:bg-cream prose-code:px-1 prose-code:py-0.5 prose-code:rounded"
                dangerouslySetInnerHTML={{ __html: bodyHtml }}
              />
            </div>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 text-sm font-medium text-amber-warm hover:text-amber-deep transition-colors no-print flex items-center gap-1"
            aria-expanded={expanded}
            aria-label={expanded ? "Collapse details" : "Read more details"}
          >
            {expanded ? (
              <>
                Show less
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M5 15l7-7 7 7"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </>
            ) : (
              <>
                Read more
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M19 9l-7 7-7-7"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </>
            )}
          </button>
        </div>
      )}
    </article>
  );
}
