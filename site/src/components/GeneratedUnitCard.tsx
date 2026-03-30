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
    <article className="industrial-card p-5 print-break-avoid">
      {/* Day badge + Stage */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="text-xs font-bold px-2.5 py-1 bg-red/10 text-red font-mono uppercase">
          Day {index + 1}
        </span>
        <span
          className={`text-xs font-medium px-2 py-0.5 ${stageColor}`}
        >
          {capitalize(unit.stage)}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-heading font-semibold text-black text-lg uppercase leading-snug mb-3">
        {unit.title}
      </h3>

      {/* Badges */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        <span
          className={`text-xs font-medium px-2 py-0.5 ${pillarColor}`}
        >
          {pillarLabel}
        </span>
        <span className="text-xs font-medium px-2 py-0.5 bg-card-bg text-text-secondary border border-card-border">
          {contentIcon} {formatContentType(unit.contentType)}
        </span>
      </div>

      {/* Duration & materials count */}
      <div className="flex items-center gap-4 text-text-secondary font-mono text-xs mb-4">
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
          <h4 className="font-mono text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
            Learning Objectives
          </h4>
          <ul className="space-y-1">
            {unit.learningObjectives.map((lo, i) => (
              <li
                key={i}
                className="text-sm text-text-secondary font-body flex items-start gap-2"
              >
                <span className="text-red mt-0.5 shrink-0">
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
            <div className="pt-4 border-t border-card-border">
              <article
                className="prose prose-sm max-w-none
                  prose-headings:font-heading prose-headings:text-black prose-headings:uppercase
                  prose-h2:text-lg prose-h2:mt-6 prose-h2:mb-3
                  prose-h3:text-base prose-h3:mt-4 prose-h3:mb-2
                  prose-p:text-text-secondary prose-p:leading-relaxed prose-p:font-body
                  prose-li:text-text-secondary prose-li:font-body
                  prose-strong:text-black
                  prose-a:text-red prose-a:no-underline hover:prose-a:text-red/80
                  prose-blockquote:border-l-red prose-blockquote:text-text-secondary
                  prose-code:text-red prose-code:bg-card-bg prose-code:px-1 prose-code:py-0.5 prose-code:font-mono"
                dangerouslySetInnerHTML={{ __html: bodyHtml }}
              />
            </div>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 font-mono text-xs uppercase font-medium text-red hover:text-red/80 transition-colors no-print flex items-center gap-1"
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
