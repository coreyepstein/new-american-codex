export interface ChildProfileRequest {
  childName?: string;
  interests: string[];
  stage: string;
  learningModality: "hands-on" | "verbal" | "visual" | "mixed";
}

export interface GeneratedUnit {
  title: string;
  pillar: string;
  stage: string;
  contentType: string;
  duration: string;
  materials: string[];
  learningObjectives: string[];
  body: string;
}

export interface PersonalizeResponse {
  units: GeneratedUnit[];
  childName?: string;
  stage: string;
}

export const VALID_STAGES = [
  "foundation",
  "explorer",
  "builder",
  "apprentice",
  "architect",
] as const;

export const VALID_PILLARS = [
  "agency-critical-thinking",
  "american-dynamism",
  "physical-survival",
  "building-engineering",
  "software-ai",
  "food-farming",
  "core-academics",
  "character-purpose",
] as const;

export const VALID_CONTENT_TYPES = [
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
] as const;

export const VALID_MODALITIES = [
  "hands-on",
  "verbal",
  "visual",
  "mixed",
] as const;
