export interface Pillar {
  number: number;
  name: string;
  tagline: string;
  description: string;
  icon: string;
}

export interface Stage {
  name: string;
  ages: string;
  focus: string;
}

export interface ContentType {
  name: string;
  description: string;
  example: string;
}

export const PILLARS: Pillar[] = [
  {
    number: 1,
    name: "Agency & Critical Thinking",
    tagline: "Think for yourself.",
    description:
      "Socratic method, logic, media literacy, first-principles reasoning. Children learn to question assumptions, evaluate evidence, and form their own conclusions rather than accepting received wisdom.",
    icon: "\u{1F9E0}",
  },
  {
    number: 2,
    name: "American Dynamism",
    tagline: "Build the republic.",
    description:
      "Founding documents, constitutional principles, builders and inventors, free markets, civic responsibility. Understanding the American experiment not as a finished project but as an ongoing act of creation.",
    icon: "\u{1F3DB}\uFE0F",
  },
  {
    number: 3,
    name: "Physical & Survival",
    tagline: "Be capable in the world.",
    description:
      "Wilderness navigation, fire and shelter building, first aid, physical fitness, self-defense. The confidence that comes from knowing you can handle what the world throws at you.",
    icon: "\u{1F3D4}\uFE0F",
  },
  {
    number: 4,
    name: "Building & Engineering",
    tagline: "Make things with your hands.",
    description:
      "Woodworking, electrical circuits, mechanical systems, 3D printing, architecture fundamentals. The deep satisfaction and practical intelligence that comes from turning raw materials into something real.",
    icon: "\u{1F528}",
  },
  {
    number: 5,
    name: "Software & AI",
    tagline: "Code is the new literacy.",
    description:
      "Programming as literacy, how computers work, AI literacy, digital citizenship, building with technology. Understanding the tools that shape the modern world — and learning to shape them back.",
    icon: "\u{1F4BB}",
  },
  {
    number: 6,
    name: "Food & Farming",
    tagline: "Know where your food comes from.",
    description:
      "Gardening, animal husbandry, food preservation, nutrition, cooking real meals, soil science. Reconnecting children with the food chain and the land that sustains them.",
    icon: "\u{1F331}",
  },
  {
    number: 7,
    name: "Core Academics",
    tagline: "The fundamentals, reimagined.",
    description:
      "Math, science, reading, writing, history — taught through the lens of the other pillars. Academics aren't separate from life; they're the tools for understanding it.",
    icon: "\u{1F4DA}",
  },
  {
    number: 8,
    name: "Character & Purpose",
    tagline: "Do the right thing.",
    description:
      "Tikkun Olam in practice, service projects, moral reasoning, stewardship, doing the right thing when no one is watching. Character isn't taught in a lecture — it's built through action.",
    icon: "\u2B50",
  },
];

export const STAGES: Stage[] = [
  {
    name: "Genesis",
    ages: "Pregnancy \u2013 Birth",
    focus:
      "Parenting philosophy, prenatal nutrition, preparing the environment",
  },
  {
    name: "Foundation",
    ages: "0\u20134",
    focus: "Sensory learning, nature exposure, motor skills, play-based",
  },
  {
    name: "Explorer",
    ages: "5\u20138",
    focus:
      "Reading/math foundations, garden projects, outdoor skills, storytelling",
  },
  {
    name: "Builder",
    ages: "9\u201312",
    focus: "Project-based learning, cooking, American history, logic",
  },
  {
    name: "Apprentice",
    ages: "13\u201315",
    focus:
      "Specialization tracks, real software projects, debate, economics",
  },
  {
    name: "Architect",
    ages: "16\u201318",
    focus:
      "Capstone projects, entrepreneurship, leadership, college prep",
  },
];

export const CONTENT_TYPES: ContentType[] = [
  {
    name: "Lesson",
    description: "Structured teaching unit with objectives and assessment",
    example: "The Constitutional Convention: What They Argued About",
  },
  {
    name: "Activity",
    description: "Hands-on exercise that reinforces a concept",
    example: "Build a simple circuit to light an LED",
  },
  {
    name: "Project",
    description: "Multi-day endeavor producing a tangible outcome",
    example: "Design and build a raised garden bed",
  },
  {
    name: "Field Plan",
    description: "Outdoor or off-site learning experience",
    example: "Orienteering challenge at a local state park",
  },
  {
    name: "Recipe",
    description: "Cooking instruction tied to nutrition and culture",
    example: "Sourdough bread from scratch",
  },
  {
    name: "Experiment",
    description: "Scientific inquiry with hypothesis and observation",
    example: "Testing soil pH across different garden zones",
  },
  {
    name: "Adventure",
    description: "Extended outdoor challenge building resilience",
    example: "Overnight campout with fire-building and shelter",
  },
  {
    name: "Practice",
    description: "Repetitive skill-building exercise",
    example: "Daily journaling: 15 minutes of freewriting",
  },
  {
    name: "Discussion",
    description: "Guided Socratic dialogue on a theme",
    example: "Is it ever right to break an unjust law?",
  },
  {
    name: "Service",
    description: "Community-oriented project embodying Tikkun Olam",
    example: "Organize a neighborhood tool-lending library",
  },
];
