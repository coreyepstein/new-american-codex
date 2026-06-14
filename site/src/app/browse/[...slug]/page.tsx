import { notFound } from "next/navigation";
import Link from "next/link";
import { Marked } from "marked";
import {
  getAllCurriculumItems,
  getCurriculumItemBySlug,
} from "@/lib/curriculum";
import {
  PILLAR_COLORS,
  PILLAR_DISPLAY,
  STAGE_COLORS,
  CONTENT_TYPE_ICONS,
  capitalize,
  formatContentType,
} from "@/lib/display-maps";

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

type Heading = { depth: number; text: string; id: string };

function slugify(s: string): string {
  return (
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "section"
  );
}

// Classify an H2 by its title so the body can give recurring section types
// distinct visual treatment (safety warnings, sessions, extensions, etc.).
function sectionKind(text: string): string | null {
  const t = text.toLowerCase();
  if (/^(session|day|week|phase|part|step)\b/.test(t)) return "session";
  if (t.includes("safety")) return "safety";
  if (
    t.includes("extension") ||
    t.includes("go further") ||
    t.includes("going deeper") ||
    t.includes("take it further")
  )
    return "extension";
  if (
    t.includes("common failure") ||
    t.includes("pitfall") ||
    t.includes("troubleshoot") ||
    t.includes("what to watch") ||
    t.includes("watch for")
  )
    return "watch";
  if (t.includes("deliverable") || t.includes("success criteria"))
    return "deliverable";
  return null;
}

// Post-process the trusted, already-escaped markdown HTML: add stable ids to
// H2/H3 (for the section nav), tag recurring section types, and class the
// blockquotes/tables so the lesson-body stylesheet can style them.
function enhanceHtml(html: string): { html: string; headings: Heading[] } {
  const headings: Heading[] = [];
  const used = new Set<string>();

  let out = html.replace(
    /<h([23])>([\s\S]*?)<\/h\1>/g,
    (_match, d: string, inner: string) => {
      const depth = Number(d);
      const plain = inner.replace(/<[^>]+>/g, "").trim();
      const base = slugify(plain);
      let id = base;
      let n = 2;
      while (used.has(id)) id = `${base}-${n++}`;
      used.add(id);
      headings.push({ depth, text: plain, id });
      const kind = depth === 2 ? sectionKind(plain) : null;
      const kindAttr = kind ? ` data-kind="${kind}"` : "";
      return `<h${depth} id="${id}"${kindAttr}>${inner}</h${depth}>`;
    }
  );

  out = out.replace(/<blockquote>/g, '<blockquote class="lesson-callout">');
  out = out.replace(/<table>/g, '<table class="lesson-table">');

  return { html: out, headings };
}

const SAFETY_DOT: Record<string, string> = {
  green: "#3F7D5C",
  yellow: "#B7791F",
  red: "#B91C1C",
};

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
  const rawHtml = await safeMarked.parse(item.body);
  const { html: htmlContent, headings } = enhanceHtml(rawHtml);

  const wordCount = item.body.trim().split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.round(wordCount / 200));
  const navHeadings = headings.filter((h) => h.depth === 2);
  const showNav = navHeadings.length >= 3;

  const pillarColor =
    PILLAR_COLORS[item.pillar] ?? "bg-gray-100 text-gray-800";
  const pillarLabel = PILLAR_DISPLAY[item.pillar] ?? capitalize(item.pillar);
  const stageColor = STAGE_COLORS[item.stage] ?? "bg-gray-100 text-gray-700";
  const contentIcon = CONTENT_TYPE_ICONS[item.contentType] ?? "\u{1F4D6}";

  const specs: { label: string; value: string; dot?: string }[] = [];
  if (item.duration) specs.push({ label: "Duration", value: item.duration });
  if (item.ageRange) specs.push({ label: "Age", value: item.ageRange });
  if (item.modality)
    specs.push({ label: "Format", value: capitalize(item.modality) });
  if (item.parentRole)
    specs.push({ label: "Parent Role", value: capitalize(item.parentRole) });
  specs.push({ label: "Read", value: `${readingTime} min` });
  if (item.safetyLevel)
    specs.push({
      label: "Safety",
      value: capitalize(item.safetyLevel),
      dot: SAFETY_DOT[item.safetyLevel.toLowerCase()] ?? undefined,
    });

  const tocLinks = (
    <ol className="lesson-toc-list">
      {navHeadings.map((h, i) => (
        <li key={h.id}>
          <a href={`#${h.id}`}>
            <span className="lesson-toc-num">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{h.text}</span>
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <section className="section-padding">
      <div className="max-w-5xl mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-text-secondary/60 mb-8">
          <Link href="/browse" className="hover:text-red transition-colors">
            Browse
          </Link>
          <span>/</span>
          <Link
            href={`/browse?stage=${item.stage}`}
            className="hover:text-red transition-colors"
          >
            {capitalize(item.stage)}
          </Link>
          <span>/</span>
          <Link
            href={`/browse?pillar=${item.pillar}`}
            className="hover:text-red transition-colors"
          >
            {pillarLabel}
          </Link>
          <span>/</span>
          <span className="text-black font-medium truncate">{item.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className={`text-xs font-medium px-2.5 py-1 ${stageColor}`}>
              {capitalize(item.stage)}
            </span>
            <span className={`text-xs font-medium px-2.5 py-1 ${pillarColor}`}>
              {pillarLabel}
            </span>
            <span className="text-xs font-medium px-2.5 py-1 bg-gray-100 text-gray-600">
              {contentIcon} {formatContentType(item.contentType)}
            </span>
          </div>
          <h1 className="font-heading fluid-h2 font-bold uppercase text-black">
            {item.title}
          </h1>
          <div className="red-divider mt-5 mb-6" />

          {/* Spec strip */}
          <div className="border border-card-border bg-card-bg/40">
            <div className="accent-bar-top" style={{ height: "4px" }} />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-y sm:divide-y-0 sm:divide-x divide-card-border">
              {specs.map((s) => (
                <div key={s.label} className="px-4 py-3">
                  <p className="font-mono text-[10px] text-text-secondary/50 uppercase tracking-[0.15em] font-medium mb-1">
                    {s.label}
                  </p>
                  <p className="text-sm text-black flex items-center gap-1.5">
                    {s.dot && (
                      <span
                        className="inline-block w-2 h-2 shrink-0"
                        style={{ backgroundColor: s.dot }}
                        aria-hidden
                      />
                    )}
                    {s.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </header>

        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-12 lg:items-start">
          {/* Main column */}
          <div className="min-w-0">
            {/* Mobile section nav */}
            {showNav && (
              <details className="lesson-toc-mobile lg:hidden">
                <summary>
                  Contents
                  <span>
                    {navHeadings.length} sections &middot; {readingTime} min
                  </span>
                </summary>
                {tocLinks}
              </details>
            )}

            {/* Learning Objectives — the "why" of the lesson, given top billing */}
            {item.learningObjectives.length > 0 && (
              <div className="lesson-objectives mb-8">
                <div className="accent-bar-top" style={{ height: "4px" }} />
                <div className="p-5">
                  <h2 className="font-heading font-bold uppercase text-black text-lg mb-1">
                    What You&rsquo;ll Be Able To Do
                  </h2>
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-secondary/50 mb-4">
                    Learning Objectives
                  </p>
                  <ol className="space-y-3">
                    {item.learningObjectives.map((lo, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="font-heading text-red font-bold text-lg leading-none shrink-0 w-6">
                          {i + 1}
                        </span>
                        <span className="text-base text-text-primary leading-snug">
                          {lo}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}

            {/* Readiness + Materials — secondary prep info, side by side */}
            {(item.readinessIndicators.length > 0 ||
              item.materials.length > 0) && (
              <div className="grid sm:grid-cols-2 gap-4 mb-10">
                {item.readinessIndicators.length > 0 && (
                  <div className="border border-card-border bg-white p-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-secondary/50 mb-3">
                      Ready When They Can
                    </p>
                    <ul className="space-y-2">
                      {item.readinessIndicators.map((r, i) => (
                        <li
                          key={i}
                          className="text-sm text-text-primary/85 flex items-start gap-2.5"
                        >
                          <span
                            className="text-navy mt-0.5 shrink-0"
                            aria-hidden
                          >
                            &#10003;
                          </span>
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {item.materials.length > 0 && (
                  <div className="border border-card-border bg-white p-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-secondary/50 mb-3">
                      Materials Needed
                    </p>
                    <ul className="space-y-2">
                      {item.materials.map((m, i) => (
                        <li
                          key={i}
                          className="text-sm text-text-primary/85 flex items-start gap-2.5"
                        >
                          <span className="text-red mt-1 shrink-0 w-2 h-px bg-red" />
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Lesson body */}
            <article
              className="lesson-body"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            {/* Back to browse */}
            <div className="mt-14 pt-8 border-t border-card-border">
              <Link
                href="/browse"
                className="inline-flex items-center gap-2 text-sm font-medium text-red hover:text-black transition-colors"
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

          {/* Desktop section nav */}
          {showNav && (
            <aside className="hidden lg:block">
              <div className="sticky top-24 lesson-toc">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-secondary/50 mb-4">
                  On This Page
                </p>
                {tocLinks}
              </div>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}
