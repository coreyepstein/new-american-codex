import { describe, it, expect, beforeAll } from "vitest";
import {
  getAllCurriculumItems,
  getCurriculumItemBySlug,
  type CurriculumItem,
} from "./curriculum";

const VALID_STAGES = [
  "genesis",
  "foundation",
  "explorer",
  "builder",
  "apprentice",
  "architect",
];

const VALID_PILLARS = [
  "agency-critical-thinking",
  "american-dynamism",
  "physical-survival",
  "building-engineering",
  "software-ai",
  "food-farming",
  "core-academics",
  "character-purpose",
];

const VALID_CONTENT_TYPES = [
  "lesson",
  "activity",
  "project",
  "field-plan",
  "recipe",
  "experiment",
  "adventure",
  "practice",
  "discussion",
  "service",
];

let items: CurriculumItem[];

beforeAll(() => {
  items = getAllCurriculumItems();
});

describe("getAllCurriculumItems", () => {
  it("returns items (count > 0)", () => {
    expect(items.length).toBeGreaterThan(0);
  });

  it("returns at least 100 items from the curriculum corpus", () => {
    // The repo has 124+ markdown files; sanity-check a reasonable floor
    expect(items.length).toBeGreaterThanOrEqual(100);
  });

  it("every item has required fields", () => {
    for (const item of items) {
      expect(item.slug, `slug missing on item`).toBeTruthy();
      expect(item.title, `title missing on ${item.slug}`).toBeTruthy();
      expect(item.pillar, `pillar missing on ${item.slug}`).toBeTruthy();
      expect(item.stage, `stage missing on ${item.slug}`).toBeTruthy();
      expect(
        item.contentType,
        `contentType missing on ${item.slug}`
      ).toBeTruthy();
    }
  });

  it("every slug has the format {stage}/{pillar}/{filename}", () => {
    for (const item of items) {
      const parts = item.slug.split("/");
      expect(parts.length, `slug '${item.slug}' should have 3 segments`).toBe(
        3
      );
      // First segment should be a known stage directory name
      expect(
        VALID_STAGES,
        `slug '${item.slug}' first segment should be a valid stage`
      ).toContain(parts[0]);
      // Second segment should be a known pillar slug
      expect(
        VALID_PILLARS,
        `slug '${item.slug}' second segment should be a valid pillar`
      ).toContain(parts[1]);
      // Third segment should not be empty and should not end with .md
      expect(parts[2].length).toBeGreaterThan(0);
      expect(parts[2]).not.toMatch(/\.md$/);
    }
  });

  it("stage-overview.md files are excluded", () => {
    const overviewSlugs = items.filter((item) =>
      item.slug.endsWith("/stage-overview")
    );
    expect(overviewSlugs).toHaveLength(0);
  });

  it("no duplicate slugs exist", () => {
    const slugs = items.map((i) => i.slug);
    const unique = new Set(slugs);
    expect(unique.size).toBe(slugs.length);
  });

  it("every item has a non-empty body (markdown content)", () => {
    for (const item of items) {
      expect(
        item.body.trim().length,
        `body empty on ${item.slug}`
      ).toBeGreaterThan(0);
    }
  });

  it("every stage value is a known stage", () => {
    for (const item of items) {
      expect(
        VALID_STAGES,
        `unknown stage '${item.stage}' on ${item.slug}`
      ).toContain(item.stage);
    }
  });

  it("every contentType value is a known content type", () => {
    for (const item of items) {
      expect(
        VALID_CONTENT_TYPES,
        `unknown contentType '${item.contentType}' on ${item.slug}`
      ).toContain(item.contentType);
    }
  });
});

describe("filtering by stage", () => {
  it("filtering for 'explorer' returns only explorer items", () => {
    const explorerItems = items.filter((i) => i.stage === "explorer");
    expect(explorerItems.length).toBeGreaterThan(0);
    for (const item of explorerItems) {
      expect(item.stage).toBe("explorer");
    }
  });

  it("filtering for 'foundation' returns only foundation items", () => {
    const foundationItems = items.filter((i) => i.stage === "foundation");
    expect(foundationItems.length).toBeGreaterThan(0);
    for (const item of foundationItems) {
      expect(item.stage).toBe("foundation");
    }
  });

  it("every stage in the data has at least one item", () => {
    for (const stage of VALID_STAGES) {
      const stageItems = items.filter((i) => i.stage === stage);
      expect(
        stageItems.length,
        `stage '${stage}' has no items`
      ).toBeGreaterThan(0);
    }
  });

  it("stage filter is exact match (not substring)", () => {
    // "build" should not match "builder"
    const buildItems = items.filter((i) => i.stage === "build");
    expect(buildItems).toHaveLength(0);
  });
});

describe("filtering by content type", () => {
  it("filtering for 'recipe' returns only recipe items", () => {
    const recipeItems = items.filter((i) => i.contentType === "recipe");
    expect(recipeItems.length).toBeGreaterThan(0);
    for (const item of recipeItems) {
      expect(item.contentType).toBe("recipe");
    }
  });

  it("filtering for 'lesson' returns only lesson items", () => {
    const lessonItems = items.filter((i) => i.contentType === "lesson");
    expect(lessonItems.length).toBeGreaterThan(0);
    for (const item of lessonItems) {
      expect(item.contentType).toBe("lesson");
    }
  });
});

describe("filtering by pillar", () => {
  it("filtering for 'food-farming' returns only food-farming items", () => {
    const ffItems = items.filter((i) => i.pillar === "food-farming");
    expect(ffItems.length).toBeGreaterThan(0);
    for (const item of ffItems) {
      expect(item.pillar).toBe("food-farming");
    }
  });
});

describe("combined filters", () => {
  it("stage + contentType narrows results correctly", () => {
    const combo = items.filter(
      (i) => i.stage === "explorer" && i.contentType === "activity"
    );
    // Should have some explorer activities
    expect(combo.length).toBeGreaterThan(0);
    for (const item of combo) {
      expect(item.stage).toBe("explorer");
      expect(item.contentType).toBe("activity");
    }
  });

  it("text search on title works", () => {
    // Pick a word from a known item title
    const firstTitle = items[0].title.split(" ")[0].toLowerCase();
    const matches = items.filter((i) =>
      i.title.toLowerCase().includes(firstTitle)
    );
    expect(matches.length).toBeGreaterThan(0);
  });
});

describe("getCurriculumItemBySlug", () => {
  it("returns an item for a valid slug", () => {
    const slug = items[0].slug;
    const item = getCurriculumItemBySlug(slug);
    expect(item).toBeDefined();
    expect(item!.slug).toBe(slug);
  });

  it("returns undefined for a non-existent slug", () => {
    const item = getCurriculumItemBySlug("nonexistent/fake/slug");
    expect(item).toBeUndefined();
  });

  it("returns the correct item with full fields", () => {
    const slug = items[0].slug;
    const item = getCurriculumItemBySlug(slug);
    expect(item).toBeDefined();
    expect(item!.title).toBeTruthy();
    expect(item!.body.length).toBeGreaterThan(0);
    expect(item!.stage).toBeTruthy();
    expect(item!.pillar).toBeTruthy();
    expect(item!.contentType).toBeTruthy();
  });

  it("materials and learningObjectives are arrays", () => {
    const slug = items[0].slug;
    const item = getCurriculumItemBySlug(slug);
    expect(item).toBeDefined();
    expect(Array.isArray(item!.materials)).toBe(true);
    expect(Array.isArray(item!.learningObjectives)).toBe(true);
    expect(Array.isArray(item!.readinessIndicators)).toBe(true);
  });
});
