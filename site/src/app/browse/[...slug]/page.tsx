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
        <nav className="flex flex-wrap items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-text-secondary/60 mb-8">
          <Link
            href="/browse"
            className="hover:text-red transition-colors"
          >
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
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span
              className={`text-xs font-medium px-2.5 py-1 ${stageColor}`}
            >
              {capitalize(item.stage)}
            </span>
            <span
              className={`text-xs font-medium px-2.5 py-1 ${pillarColor}`}
            >
              {pillarLabel}
            </span>
            <span className="text-xs font-medium px-2.5 py-1 bg-gray-100 text-gray-600">
              {contentIcon} {formatContentType(item.contentType)}
            </span>
          </div>
          <h1 className="font-heading fluid-h2 font-bold uppercase text-black mb-4">
            {item.title}
          </h1>

          {/* Metadata grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-card-bg/50 border border-card-border">
            {item.duration && (
              <div>
                <p className="font-mono text-xs text-text-secondary/50 uppercase tracking-wider font-medium mb-1">
                  Duration
                </p>
                <p className="text-sm text-black">{item.duration}</p>
              </div>
            )}
            {item.ageRange && (
              <div>
                <p className="font-mono text-xs text-text-secondary/50 uppercase tracking-wider font-medium mb-1">
                  Age Range
                </p>
                <p className="text-sm text-black">{item.ageRange}</p>
              </div>
            )}
            {item.parentRole && (
              <div>
                <p className="font-mono text-xs text-text-secondary/50 uppercase tracking-wider font-medium mb-1">
                  Parent Role
                </p>
                <p className="text-sm text-black capitalize">{item.parentRole}</p>
              </div>
            )}
            {item.safetyLevel && (
              <div>
                <p className="font-mono text-xs text-text-secondary/50 uppercase tracking-wider font-medium mb-1">
                  Safety Level
                </p>
                <p className="text-sm text-black capitalize">
                  {item.safetyLevel}
                </p>
              </div>
            )}
          </div>
        </header>

        {/* Materials */}
        {item.materials.length > 0 && (
          <div className="mb-8 p-4 bg-white border border-card-border">
            <h2 className="font-heading font-bold uppercase text-black text-lg mb-3">
              Materials Needed
            </h2>
            <ul className="space-y-1.5">
              {item.materials.map((m, i) => (
                <li
                  key={i}
                  className="text-sm text-text-primary/80 flex items-start gap-2"
                >
                  <span className="text-red mt-0.5 shrink-0">
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
          <div className="mb-8 p-4 bg-white border border-card-border">
            <h2 className="font-heading font-bold uppercase text-black text-lg mb-3">
              Readiness Indicators
            </h2>
            <ul className="space-y-1.5">
              {item.readinessIndicators.map((r, i) => (
                <li
                  key={i}
                  className="text-sm text-text-primary/80 flex items-start gap-2"
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
          <div className="mb-8 p-4 bg-white border border-card-border">
            <h2 className="font-heading font-bold uppercase text-black text-lg mb-3">
              Learning Objectives
            </h2>
            <ul className="space-y-1.5">
              {item.learningObjectives.map((lo, i) => (
                <li
                  key={i}
                  className="text-sm text-text-primary/80 flex items-start gap-2"
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

        {/* Markdown content */}
        <article
          className="prose prose-lg max-w-none
            prose-headings:font-heading prose-headings:text-black prose-headings:uppercase
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-text-primary/80 prose-p:leading-relaxed
            prose-li:text-text-primary/80
            prose-strong:text-black
            prose-a:text-red prose-a:no-underline hover:prose-a:text-red/80
            prose-blockquote:border-l-red prose-blockquote:text-text-secondary/70
            prose-code:text-red prose-code:bg-card-bg prose-code:px-1 prose-code:py-0.5
          "
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Back to browse */}
        <div className="mt-12 pt-8 border-t border-card-border">
          <Link
            href="/browse"
            className="inline-flex items-center gap-2 text-sm font-medium text-red hover:text-red/80 transition-colors"
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
