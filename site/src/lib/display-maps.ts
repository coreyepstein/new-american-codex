export const PILLAR_COLORS: Record<string, string> = {
  "agency-critical-thinking": "bg-purple-100 text-purple-800",
  "american-dynamism": "bg-blue-100 text-blue-800",
  "physical-survival": "bg-green-100 text-green-800",
  "building-engineering": "bg-orange-100 text-orange-800",
  "software-ai": "bg-cyan-100 text-cyan-800",
  "food-farming": "bg-lime-100 text-lime-800",
  "core-academics": "bg-amber-100 text-amber-800",
  "character-purpose": "bg-rose-100 text-rose-800",
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
  genesis: "bg-slate-100 text-slate-700",
  foundation: "bg-amber-50 text-amber-700",
  explorer: "bg-emerald-50 text-emerald-700",
  builder: "bg-sky-50 text-sky-700",
  apprentice: "bg-violet-50 text-violet-700",
  architect: "bg-red-50 text-red-700",
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
