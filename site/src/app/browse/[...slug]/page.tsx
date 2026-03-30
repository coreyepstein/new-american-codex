import { notFound } from "next/navigation";
import Link from "next/link";
import { Marked } from "marked";
import {
  getAllCurriculumItems,
  getCurriculumItemBySlug,
} from "@/lib/curriculum";

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

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function formatContentType(ct: string): string {
  return ct
    .split("-")
    .map((w) => capitalize(w))
    .join(" ");
}

export async function generateStaticParams() {
  const items = getAllCurriculumItems();
  return items.map((item) => ({
    slug: item.slug.split("/"),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const slugStr = slug.join("/");
  const item = getCurriculumItemBySlug(slugStr);

  if (!item) {
    return { title: "Not Found | The New American Codex" };
  }

  return {
    title: `${item.title} | The New American Codex`,
    description: item.learningObjectives.join(". ") || item.title,
  };
}

export default async function CurriculumDetailPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const slugStr = slug.join("/");
  const item = getCurriculumItemBySlug(slugStr);

  if (!item) {
    notFound();
  }

  // Defense-in-depth XSS protection for curriculum markdown.
  // Escapes raw HTML blocks and strips javascript:/data:/vbscript: link hrefs.
  const safeMarked = new Marked({
    renderer: {
      html({ text }: { text: string }): string {
        return text
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
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
          : href;
        const titleAttr = title
          ? ` title="${title.replace(/"/g, "&quot;")}"`
          : "";
        return `<a href="${safeHref}"${titleAttr}>${text}</a>`;
      },
    },
  });
  const htmlContent = await safeMarked.parse(item.body);
  const pillarColor =
    PILLAR_COLORS[item.pillar] ?? "bg-gray-100 text-gray-800";
  const pillarLabel = PILLAR_DISPLAY[item.pillar] ?? capitalize(item.pillar);
  const stageColor =
    STAGE_COLORS[item.stage] ?? "bg-gray-100 text-gray-700";
  const contentIcon = CONTENT_TYPE_ICONS[item.contentType] ?? "\u{1F4D6}";

  return (
    <section className="section-padding">
      <div className="max-w-3xl mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-1.5 text-sm text-slate-deep/60 mb-8">
          <Link
            href="/browse"
            className="hover:text-amber-warm transition-colors"
          >
            Browse
          </Link>
          <span>/</span>
          <Link
            href={`/browse?stage=${item.stage}`}
            className="hover:text-amber-warm transition-colors"
          >
            {capitalize(item.stage)}
          </Link>
          <span>/</span>
          <Link
            href={`/browse?pillar=${item.pillar}`}
            className="hover:text-amber-warm transition-colors"
          >
            {pillarLabel}
          </Link>
          <span>/</span>
          <span className="text-ink font-medium truncate">{item.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full ${stageColor}`}
            >
              {capitalize(item.stage)}
            </span>
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full ${pillarColor}`}
            >
              {pillarLabel}
            </span>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
              {contentIcon} {formatContentType(item.contentType)}
            </span>
          </div>
          <h1 className="font-serif fluid-h2 font-bold text-ink mb-4">
            {item.title}
          </h1>

          {/* Metadata grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-cream/50 rounded-xl border border-ink/5">
            {item.duration && (
              <div>
                <p className="text-xs text-slate-deep/50 uppercase tracking-wide font-medium mb-1">
                  Duration
                </p>
                <p className="text-sm text-ink">{item.duration}</p>
              </div>
            )}
            {item.ageRange && (
              <div>
                <p className="text-xs text-slate-deep/50 uppercase tracking-wide font-medium mb-1">
                  Age Range
                </p>
                <p className="text-sm text-ink">{item.ageRange}</p>
              </div>
            )}
            {item.parentRole && (
              <div>
                <p className="text-xs text-slate-deep/50 uppercase tracking-wide font-medium mb-1">
                  Parent Role
                </p>
                <p className="text-sm text-ink capitalize">{item.parentRole}</p>
              </div>
            )}
            {item.safetyLevel && (
              <div>
                <p className="text-xs text-slate-deep/50 uppercase tracking-wide font-medium mb-1">
                  Safety Level
                </p>
                <p className="text-sm text-ink capitalize">
                  {item.safetyLevel}
                </p>
              </div>
            )}
          </div>
        </header>

        {/* Materials */}
        {item.materials.length > 0 && (
          <div className="mb-8 p-4 bg-white rounded-xl border border-ink/5">
            <h2 className="font-serif font-semibold text-ink text-lg mb-3">
              Materials Needed
            </h2>
            <ul className="space-y-1.5">
              {item.materials.map((m, i) => (
                <li
                  key={i}
                  className="text-sm text-slate-deep/80 flex items-start gap-2"
                >
                  <span className="text-amber-warm mt-0.5 shrink-0">
                    &bull;
                  </span>
                  {m}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Readiness Indicators */}
        {item.readinessIndicators.length > 0 && (
          <div className="mb-8 p-4 bg-white rounded-xl border border-ink/5">
            <h2 className="font-serif font-semibold text-ink text-lg mb-3">
              Readiness Indicators
            </h2>
            <ul className="space-y-1.5">
              {item.readinessIndicators.map((r, i) => (
                <li
                  key={i}
                  className="text-sm text-slate-deep/80 flex items-start gap-2"
                >
                  <span className="text-sage mt-0.5 shrink-0">&#10003;</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Learning Objectives */}
        {item.learningObjectives.length > 0 && (
          <div className="mb-8 p-4 bg-white rounded-xl border border-ink/5">
            <h2 className="font-serif font-semibold text-ink text-lg mb-3">
              Learning Objectives
            </h2>
            <ul className="space-y-1.5">
              {item.learningObjectives.map((lo, i) => (
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

        {/* Markdown content */}
        <article
          className="prose prose-lg max-w-none
            prose-headings:font-serif prose-headings:text-ink
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-slate-deep/80 prose-p:leading-relaxed
            prose-li:text-slate-deep/80
            prose-strong:text-ink
            prose-a:text-amber-warm prose-a:no-underline hover:prose-a:text-amber-deep
            prose-blockquote:border-l-amber-warm prose-blockquote:text-slate-deep/70
            prose-code:text-amber-deep prose-code:bg-cream prose-code:px-1 prose-code:py-0.5 prose-code:rounded
          "
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Back to browse */}
        <div className="mt-12 pt-8 border-t border-ink/5">
          <Link
            href="/browse"
            className="inline-flex items-center gap-2 text-sm font-medium text-amber-warm hover:text-amber-deep transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to Browse
          </Link>
        </div>
      </div>
    </section>
  );
}
