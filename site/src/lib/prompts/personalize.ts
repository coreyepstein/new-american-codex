import { PILLARS, STAGES, CONTENT_TYPES } from "@/lib/data";
import {
  VALID_PILLARS,
  VALID_STAGES,
  VALID_CONTENT_TYPES,
  type ChildProfileRequest,
} from "@/lib/types/personalize";

function slugifyPillar(name: string): string {
  return name
    .toLowerCase()
    .replace(/[&\s]+/g, "-")
    .replace(/-+/g, "-");
}

function slugifyContentType(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export function buildSystemPrompt(): string {
  const pillarBlock = PILLARS.map(
    (p) =>
      `${p.number}. ${p.name} (slug: "${slugifyPillar(p.name)}")\n   Tagline: ${p.tagline}\n   ${p.description}`
  ).join("\n\n");

  const stageBlock = STAGES.filter((s) => s.name.toLowerCase() !== "genesis")
    .map(
      (s) =>
        `- ${s.name} (slug: "${s.name.toLowerCase()}", ages: ${s.ages})\n  Focus: ${s.focus}`
    )
    .join("\n");

  const contentTypeBlock = CONTENT_TYPES.map(
    (ct) =>
      `- ${ct.name} (slug: "${slugifyContentType(ct.name)}"): ${ct.description}. Example: ${ct.example}`
  ).join("\n");

  return `You are the curriculum engine for The New American Codex, an alternative education framework that raises capable, self-reliant, critically thinking children.

## Philosophy
The Codex rejects passive screen-based learning. Every unit must be actionable — something a parent and child can DO together. Content should build real skills, spark genuine curiosity, and treat children as capable humans rather than fragile consumers.

## The 8 Pillars
${pillarBlock}

## Stages (excluding Genesis — prenatal only)
${stageBlock}

## Content Types
${contentTypeBlock}

## Valid Slug Values
Pillar slugs (use EXACTLY these): ${VALID_PILLARS.map((s) => `"${s}"`).join(", ")}
Stage slugs (use EXACTLY these): ${VALID_STAGES.map((s) => `"${s}"`).join(", ")}
Content type slugs (use EXACTLY these): ${VALID_CONTENT_TYPES.map((s) => `"${s}"`).join(", ")}

## Output Format
Respond with ONLY a JSON array of GeneratedUnit objects. No markdown fencing, no surrounding text, no explanation — just the raw JSON array.

Each object in the array must have exactly these fields:
{
  "title": string,
  "pillar": string (must be one of the valid pillar slugs above),
  "stage": string (must be one of the valid stage slugs above),
  "contentType": string (must be one of the valid content type slugs above),
  "duration": string (e.g. "45 minutes", "2 hours", "3 days"),
  "materials": string[] (specific, real items — not vague categories),
  "learningObjectives": string[] (2-4 measurable objectives),
  "body": string (markdown, 150-300 words of actionable instructions)
}

## Quality Rules
1. Content must be REAL and ACTIONABLE — specific steps a parent can follow today, not vague platitudes.
2. Age-appropriate for the specified stage. Foundation (0-4) content is sensory and play-based. Architect (16-18) content involves real-world complexity.
3. Vary the pillars: use AT LEAST 4 different pillars across the generated units.
4. Vary the content types: use AT LEAST 3 different content types.
5. Materials must be specific and obtainable (e.g. "2 cups all-purpose flour" not "ingredients").
6. The body markdown should include clear sections: an introduction, step-by-step instructions, and a reflection or extension prompt.
7. All content must be safe for children. No dangerous unsupervised activities. Include safety notes where relevant.
8. Learning objectives should be measurable (e.g. "Child can identify 3 edible plants" not "Learn about nature").`;
}

export function buildUserPrompt(profile: ChildProfileRequest): string {
  const stage = STAGES.find(
    (s) => s.name.toLowerCase() === profile.stage.toLowerCase()
  );
  const ageRange = stage?.ages ?? profile.stage;
  const stageFocus = stage?.focus ?? "";

  const nameInstruction = profile.childName
    ? `The child's name is ${profile.childName}. Where it feels natural, weave their name into unit titles to make the curriculum feel personalized (e.g. "${profile.childName}'s Garden Lab" or "Code Challenge: ${profile.childName} Builds a Calculator"). Don't force it — only use the name when it reads naturally.`
    : "No child name was provided. Use generic but engaging titles.";

  return `Generate 5-7 personalized curriculum units for the following child profile:

**Stage:** ${profile.stage} (ages ${ageRange})
**Stage focus areas:** ${stageFocus}
**Interests:** ${profile.interests.join(", ")}
**Learning modality:** ${profile.learningModality}

${nameInstruction}

**Instructions:**
- Spread units across at least 4 different pillars. Lean toward pillars that connect to the child's interests, but ensure breadth.
- Use at least 3 different content types. Match the modality preference: "${profile.learningModality}" learners benefit most from ${modalityGuidance(profile.learningModality)}.
- Sequence from lighter/shorter units to heavier/longer ones — build momentum.
- Weave the child's interests naturally into each unit. Don't just slap an interest label on generic content — genuinely integrate it.
- Each unit body should be 150-300 words of actionable markdown with clear steps.
- Remember: output ONLY the JSON array, nothing else.`;
}

function modalityGuidance(modality: string): string {
  switch (modality) {
    case "hands-on":
      return "activities, projects, experiments, and recipes — things they build, touch, and create";
    case "verbal":
      return "discussions, lessons, storytelling, and debates — language-rich exploration";
    case "visual":
      return "diagrams, field plans, observation journals, and visual projects — seeing and mapping";
    case "mixed":
      return "a balanced variety of all content types";
    default:
      return "a balanced variety of all content types";
  }
}
