import "server-only";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { PILLARS, STAGES, CONTENT_TYPES } from "./data";

export interface CurriculumItem {
  slug: string;
  title: string;
  pillar: string;
  stage: string;
  contentType: string;
  duration: string;
  materials: string[];
  readinessIndicators: string[];
  learningObjectives: string[];
  modality: string;
  safetyLevel: string;
  ageRange: string;
  parentRole: string;
  body: string;
}

const CURRICULUM_DIR = path.join(process.cwd(), "..", "curriculum");

function getPillarDisplayName(slug: string): string {
  const pillar = PILLARS.find(
    (p) => p.name.toLowerCase().replace(/[&\s]+/g, "-").replace(/-+/g, "-") === slug
  );
  return pillar?.name ?? slug;
}

function getStageDisplayName(slug: string): string {
  const stage = STAGES.find((s) => s.name.toLowerCase() === slug);
  return stage?.name ?? slug;
}

function getContentTypeDisplayName(slug: string): string {
  const ct = CONTENT_TYPES.find(
    (c) => c.name.toLowerCase().replace(/\s+/g, "-") === slug
  );
  return ct?.name ?? slug;
}

export { getPillarDisplayName, getStageDisplayName, getContentTypeDisplayName };

function readCurriculumFiles(): CurriculumItem[] {
  const items: CurriculumItem[] = [];
  const stages = fs.readdirSync(CURRICULUM_DIR);

  for (const stage of stages) {
    const stagePath = path.join(CURRICULUM_DIR, stage);
    if (!fs.statSync(stagePath).isDirectory()) continue;

    const pillars = fs.readdirSync(stagePath);
    for (const pillar of pillars) {
      const pillarPath = path.join(stagePath, pillar);
      if (!fs.statSync(pillarPath).isDirectory()) continue;

      const files = fs.readdirSync(pillarPath);
      for (const file of files) {
        if (!file.endsWith(".md")) continue;
        if (file === "stage-overview.md") continue;

        const filePath = path.join(pillarPath, file);
        const raw = fs.readFileSync(filePath, "utf-8");
        const { data, content } = matter(raw);

        if (!data.title) continue;

        const slug = `${stage}/${pillar}/${file.replace(/\.md$/, "")}`;

        items.push({
          slug,
          title: data.title ?? "",
          pillar: data.pillar ?? pillar,
          stage: data.stage ?? stage,
          contentType: data["content-type"] ?? "",
          duration: data.duration ?? "",
          materials: Array.isArray(data.materials) ? data.materials : [],
          readinessIndicators: Array.isArray(data["readiness-indicators"])
            ? data["readiness-indicators"]
            : [],
          learningObjectives: Array.isArray(data["learning-objectives"])
            ? data["learning-objectives"]
            : [],
          modality: data.modality ?? "",
          safetyLevel: data["safety-level"] ?? "",
          ageRange: data["age-range"] ?? "",
          parentRole: data["parent-role"] ?? "",
          body: content,
        });
      }
    }

    // Also check for files directly in the stage directory (non-pillar files)
    const stageFiles = fs.readdirSync(stagePath);
    for (const file of stageFiles) {
      const filePath = path.join(stagePath, file);
      if (!file.endsWith(".md") || file === "stage-overview.md") continue;
      if (fs.statSync(filePath).isDirectory()) continue;

      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      if (!data.title || !data.pillar) continue;

      const slug = `${stage}/${data.pillar}/${file.replace(/\.md$/, "")}`;
      if (items.some((i) => i.slug === slug)) continue;

      items.push({
        slug,
        title: data.title ?? "",
        pillar: data.pillar,
        stage: data.stage ?? stage,
        contentType: data["content-type"] ?? "",
        duration: data.duration ?? "",
        materials: Array.isArray(data.materials) ? data.materials : [],
        readinessIndicators: Array.isArray(data["readiness-indicators"])
          ? data["readiness-indicators"]
          : [],
        learningObjectives: Array.isArray(data["learning-objectives"])
          ? data["learning-objectives"]
          : [],
        modality: data.modality ?? "",
        safetyLevel: data["safety-level"] ?? "",
        ageRange: data["age-range"] ?? "",
        parentRole: data["parent-role"] ?? "",
        body: content,
      });
    }
  }

  return items;
}

let cachedItems: CurriculumItem[] | null = null;

export function getAllCurriculumItems(): CurriculumItem[] {
  if (!cachedItems) {
    cachedItems = readCurriculumFiles();
  }
  return cachedItems;
}

export function getCurriculumItemBySlug(
  slug: string
): CurriculumItem | undefined {
  return getAllCurriculumItems().find((item) => item.slug === slug);
}
