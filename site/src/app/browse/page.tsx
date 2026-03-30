import { Suspense } from "react";
import { getAllCurriculumItems } from "@/lib/curriculum";
import { CurriculumCard } from "@/components/CurriculumCard";
import { FilterBar } from "@/components/FilterBar";
import Link from "next/link";

const SCAFFOLD_THRESHOLD = 5;

const SCAFFOLD_STAGES = new Set([
  "genesis",
  "builder",
  "apprentice",
  "architect",
]);

export const metadata = {
  title: "Browse Curriculum | The New American Codex",
  description:
    "Browse all curriculum content by stage, pillar, and content type. Find lessons, activities, projects, and more for raising capable humans.",
};

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  const stageFilter = typeof params.stage === "string" ? params.stage : "";
  const pillarFilter = typeof params.pillar === "string" ? params.pillar : "";
  const typeFilter = typeof params.type === "string" ? params.type : "";
  const searchFilter = typeof params.search === "string" ? params.search : "";

  const allItems = getAllCurriculumItems();

  // Apply filters
  let filteredItems = allItems;

  if (stageFilter) {
    filteredItems = filteredItems.filter((item) => item.stage === stageFilter);
  }

  if (pillarFilter) {
    filteredItems = filteredItems.filter(
      (item) => item.pillar === pillarFilter
    );
  }

  if (typeFilter) {
    filteredItems = filteredItems.filter(
      (item) => item.contentType === typeFilter
    );
  }

  if (searchFilter) {
    const query = searchFilter.toLowerCase();
    filteredItems = filteredItems.filter((item) => {
      const searchable = [
        item.title,
        ...item.learningObjectives,
        item.pillar,
        item.stage,
        item.contentType,
      ]
        .join(" ")
        .toLowerCase();
      return searchable.includes(query);
    });
  }

  // Check if the current stage filter shows a scaffold stage with few items
  const showEmptyState =
    stageFilter &&
    SCAFFOLD_STAGES.has(stageFilter) &&
    filteredItems.length < SCAFFOLD_THRESHOLD;

  return (
    <section className="section-padding">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading fluid-h2 font-bold uppercase text-black mb-2">
            Browse Curriculum
          </h1>
          <p className="text-text-secondary/70 text-lg">
            Explore lessons, activities, projects, and more — organized by stage
            and pillar.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <Suspense fallback={null}>
            <FilterBar
              activeStage={stageFilter}
              activePillar={pillarFilter}
              activeContentType={typeFilter}
              activeSearch={searchFilter}
              totalCount={allItems.length}
              filteredCount={filteredItems.length}
            />
          </Suspense>
        </div>

        {/* Empty state for scaffold stages */}
        {showEmptyState && filteredItems.length === 0 ? (
          <div className="animate-fade-in-up text-center py-16 bg-card-bg/50 border border-card-border">
            <p className="font-heading text-xl uppercase text-black mb-2">
              This stage is just getting started.
            </p>
            <p className="text-text-secondary/60 mb-6">
              Be one of the first to contribute!
            </p>
            <Link
              href="https://github.com/coreyepstein/new-american-codex"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-red text-offwhite font-mono text-xs uppercase tracking-[0.15em] hover:bg-red/90 transition-colors"
            >
              Contribute on GitHub
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="animate-fade-in-up text-center py-16">
            <p className="font-heading text-xl uppercase text-black mb-2">
              No content found
            </p>
            <p className="text-text-secondary/60">
              Try adjusting your filters or search term.
            </p>
          </div>
        ) : (
          <>
            {/* Scaffold CTA banner for stages with some but limited content */}
            {showEmptyState && filteredItems.length > 0 && (
              <div className="mb-6 p-4 bg-card-bg/50 border border-card-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <p className="text-sm text-text-secondary/70">
                  This stage is just getting started. Be one of the first to
                  contribute!
                </p>
                <Link
                  href="https://github.com/coreyepstein/new-american-codex"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-red hover:text-red/80 transition-colors whitespace-nowrap"
                >
                  Contribute on GitHub →
                </Link>
              </div>
            )}

            {/* Grid */}
            <div className="curriculum-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems.map((item) => (
                <CurriculumCard
                  key={item.slug}
                  slug={item.slug}
                  title={item.title}
                  pillar={item.pillar}
                  stage={item.stage}
                  contentType={item.contentType}
                  duration={item.duration}
                  materialsCount={item.materials.length}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
