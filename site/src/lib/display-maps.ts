export const PILLAR_COLORS: Record<string, string> = {
  "agency-critical-thinking": "bg-card-bg text-text-primary border-l-4 border-l-red",
  "american-dynamism": "bg-card-bg text-text-primary border-l-4 border-l-red",
  "physical-survival": "bg-card-bg text-text-primary border-l-4 border-l-red",
  "building-engineering": "bg-card-bg text-text-primary border-l-4 border-l-red",
  "software-ai": "bg-card-bg text-text-primary border-l-4 border-l-red",
  "food-farming": "bg-card-bg text-text-primary border-l-4 border-l-red",
  "core-academics": "bg-card-bg text-text-primary border-l-4 border-l-red",
  "character-purpose": "bg-card-bg text-text-primary border-l-4 border-l-red",
};

export const PILLAR_DISPLAY: Record<string, string> = {
  "agency-critical-thinking": "Agency & Critical Thinking",
  "american-dynamism": "American Dynamism",
  "physical-survival": "Physical & Survival",
  "building-engineering": "Building & Engineering",
  "software-ai": "Software & AI",
  "food-farming": "Food & Farming",
  "core-academics": "Core Academics",
  "character-purpose": "Character & Purpose",
};

export const STAGE_COLORS: Record<string, string> = {
  genesis: "bg-card-bg text-text-primary border-l-4 border-l-navy",
  foundation: "bg-card-bg text-text-primary border-l-4 border-l-navy",
  explorer: "bg-card-bg text-text-primary border-l-4 border-l-navy",
  builder: "bg-card-bg text-text-primary border-l-4 border-l-navy",
  apprentice: "bg-card-bg text-text-primary border-l-4 border-l-navy",
  architect: "bg-card-bg text-text-primary border-l-4 border-l-navy",
};

export const CONTENT_TYPE_ICONS: Record<string, string> = {
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

export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function formatContentType(ct: string): string {
  return ct
    .split("-")
    .map((w) => capitalize(w))
    .join(" ");
}
