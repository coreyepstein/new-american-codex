# Architecture

The New American Codex is a structured, open-source curriculum for raising capable, self-governing humans. This document defines the project's directory layout, content schema, naming conventions, and contribution workflow.

## Directory Layout

```
new-american-codex/
├── ARCHITECTURE.md          # This file
├── README.md                # Manifesto, vision, framework overview
├── CONTRIBUTING.md          # Contribution guide
├── LICENSE                  # Dual license (CC BY-SA 4.0 + MIT)
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── content-idea.yml     # Structured template for proposing content
│   │   └── correction.yml       # Template for reporting errors
│   ├── PULL_REQUEST_TEMPLATE.md # PR template for content contributions
│   └── DISCUSSION_TEMPLATE/     # (configured via GitHub UI)
├── curriculum/
│   ├── {stage}/
│   │   ├── {pillar}/
│   │   │   ├── lesson-fire-starting-basics.md
│   │   │   ├── activity-compass-navigation.md
│   │   │   └── ...
│   │   └── ...
│   └── ...
├── templates/
│   ├── lesson.md
│   ├── activity.md
│   ├── project.md
│   ├── field-plan.md
│   ├── recipe.md
│   ├── experiment.md
│   ├── adventure.md
│   ├── practice.md
│   ├── discussion.md
│   └── service.md
└── site/                    # Next.js 15 application (deployed)
    ├── src/
    │   ├── app/
    │   │   ├── page.tsx                    # Landing page (hero, email signup, donations)
    │   │   ├── layout.tsx                  # Root layout + Nav + Footer
    │   │   ├── browse/
    │   │   │   ├── page.tsx                # Curriculum browser (filter by stage/pillar/type)
    │   │   │   └── [...slug]/page.tsx      # Individual curriculum item detail view
    │   │   ├── framework/page.tsx          # Eight pillars + stage timeline
    │   │   ├── personalize/page.tsx        # AI personalization UI
    │   │   ├── contribute/page.tsx         # Community contribution forms
    │   │   ├── donate/page.tsx             # Donation links
    │   │   ├── about/page.tsx              # About page
    │   │   └── api/
    │   │       ├── signup/route.ts         # Email signup (stub → extend with provider)
    │   │       ├── personalize/route.ts    # AI week generation (Anthropic SDK)
    │   │       └── contribute/
    │   │           ├── content/route.ts    # Community content → GitHub PR
    │   │           ├── idea/route.ts       # Content idea → GitHub Issue
    │   │           └── issue/route.ts      # Correction report → GitHub Issue
    │   ├── components/                     # Shared React components
    │   └── lib/
    │       ├── curriculum.ts               # Filesystem reader (server-only, gray-matter)
    │       ├── data.ts                     # Pillar/stage/content-type constants
    │       ├── display-maps.ts             # Slug → display name helpers
    │       ├── prompts/personalize.ts      # Anthropic system + user prompt builders
    │       └── types/
    │           ├── personalize.ts          # ChildProfileRequest, GeneratedUnit types
    │           └── contribute.ts           # ContentSubmission, ContributeResponse types
    ├── e2e/                                # Playwright E2E tests
    │   ├── smoke.spec.ts                   # Homepage, framework, browse, personalize
    │   ├── browse.spec.ts                  # Curriculum browser acceptance tests
    │   └── personalize.spec.ts             # AI personalization acceptance tests
    ├── next.config.ts
    ├── playwright.config.ts
    ├── vitest.config.ts                    # Unit test runner
    └── package.json
```

## Stages

Six developmental stages, ordered from earliest to most advanced. These are NOT strict age brackets -- they are readiness-based progressions.

| Stage | Directory | Description |
|-------|-----------|-------------|
| Genesis | `genesis` | Parenting philosophy, prenatal nutrition, preparing the environment. The world before arrival. |
| Foundation | `foundation` | Sensory learning, nature exposure, motor skills, language immersion. Building the base through the body. |
| Explorer | `explorer` | Curiosity-driven discovery, reading/math foundations, outdoor skills, asking "why." |
| Builder | `builder` | Project-based learning, making things, programming basics, logic. Hands in the material. |
| Apprentice | `apprentice` | Specialization, real-world projects, independent work, forming opinions. Skin in the game. |
| Architect | `architect` | Capstone projects, entrepreneurship, leadership, college/trade prep. Building the next thing. |

## Pillars

Eight curriculum pillars spanning the full range of human capability.

| Pillar | Directory | Description |
|--------|-----------|-------------|
| Agency & Critical Thinking | `agency-critical-thinking` | Reasoning, decision-making, intellectual self-defense, sovereignty of mind |
| American Dynamism | `american-dynamism` | Civics, entrepreneurship, history of builders, democratic participation |
| Physical & Survival | `physical-survival` | Wilderness skills, fitness, first aid, self-defense, resilience |
| Building & Engineering | `building-engineering` | Construction, mechanics, electronics, making things that work |
| Software & AI | `software-ai` | Programming, computational thinking, AI literacy, digital creation |
| Food & Farming | `food-farming` | Growing, cooking, nutrition, food systems, land stewardship |
| Core Academics | `core-academics` | Reading, writing, math, science, history -- the intellectual backbone |
| Character & Purpose | `character-purpose` | Ethics, service, identity, meaning-making, spiritual grounding |

## Content Types

Ten content types, each with a dedicated template in `/templates/`.

| Type | Template | Description |
|------|----------|-------------|
| Lesson | `lesson.md` | Structured teaching unit with objectives and assessment |
| Activity | `activity.md` | Hands-on exercise, typically 15-60 minutes |
| Project | `project.md` | Multi-session build or creation with deliverable |
| Field Plan | `field-plan.md` | Outdoor or location-based learning experience |
| Recipe | `recipe.md` | Food preparation with learning objectives woven in |
| Experiment | `experiment.md` | Hypothesis-driven investigation |
| Adventure | `adventure.md` | Extended experience (day trip, overnight, expedition) |
| Practice | `practice.md` | Repeatable skill-building routine |
| Discussion | `discussion.md` | Guided conversation or Socratic inquiry |
| Service | `service.md` | Community service project with civic learning |

## Content Schema (YAML Frontmatter)

Every content file begins with YAML frontmatter. This schema is the contract between content authors and the site renderer.

### Required Fields

```yaml
---
title: "Fire Starting: Three Methods"
pillar: physical-survival
stage: explorer
content-type: lesson
readiness-indicators:
  - "Can follow multi-step safety instructions"
  - "Shows interest in outdoor skills"
learning-objectives:
  - "Identify three fire-starting methods and when to use each"
  - "Demonstrate safe fire circle preparation"
modality: hands-on          # hands-on | verbal | visual | mixed
duration: "45 minutes"      # free text: "30 minutes", "2-3 hours", "multi-session"
materials:
  - "Ferrocerium rod"
  - "Cotton balls with petroleum jelly"
  - "Dry kindling (collected)"
safety-level: yellow         # green | yellow | red
age-range: "8-12"           # typical age range, free text
parent-role: facilitate      # guide | facilitate | observe | participate
---
```

### Field Definitions

| Field | Type | Required | Valid Values | Description |
|-------|------|----------|--------------|-------------|
| `title` | string | yes | free text | Human-readable title |
| `pillar` | string | yes | `agency-critical-thinking`, `american-dynamism`, `physical-survival`, `building-engineering`, `software-ai`, `food-farming`, `core-academics`, `character-purpose` | Curriculum pillar |
| `stage` | string | yes | `genesis`, `foundation`, `explorer`, `builder`, `apprentice`, `architect` | Developmental stage |
| `content-type` | string | yes | `lesson`, `activity`, `project`, `field-plan`, `recipe`, `experiment`, `adventure`, `practice`, `discussion`, `service` | Content format |
| `readiness-indicators` | string[] | yes | free text | Observable signs a child is ready for this content |
| `learning-objectives` | string[] | yes | free text | What the learner will know or be able to do |
| `modality` | string | yes | `hands-on`, `verbal`, `visual`, `mixed`, `field`, `practice`, `reflective` | Primary learning modality |
| `duration` | string | yes | free text | Expected time commitment |
| `materials` | string[] | yes | free text (empty `[]` if none) | Required materials or tools |
| `safety-level` | string | yes | `green`, `yellow`, `red` | Risk level |
| `age-range` | string | yes | free text | Typical age range (guidance, not gatekeeping) |
| `parent-role` | string | yes | `guide`, `facilitate`, `observe`, `participate`, `lead`, `absent` | Parent/adult role during the activity. Use `lead` for Genesis stage (parent-directed). Use `absent` when the student works fully independently (typical Architect stage). |

### Optional Fields

These fields may be added to any content file for richer metadata:

| Field | Type | Description |
|-------|------|-------------|
| `cross-pillar` | string[] | Other pillars this content touches |
| `prerequisites` | string[] | File paths to content that should come first |
| `seasons` | string[] | Best seasons: `spring`, `summer`, `fall`, `winter`, `any` |
| `setting` | string | `indoor`, `outdoor`, `kitchen`, `workshop`, `anywhere` |
| `group-size` | string | `individual`, `pair`, `small-group`, `large-group`, `any` |
| `cost` | string | `free`, `low` (<$20), `medium` ($20-100), `high` (>$100) |
| `adaptations` | object | Accessibility adaptations keyed by need |
| `related` | string[] | Paths to related content |
| `tags` | string[] | Free-form tags for discoverability |
| `author` | string | GitHub username of primary author |
| `reviewers` | string[] | GitHub usernames who reviewed |
| `created` | string | ISO 8601 date |
| `updated` | string | ISO 8601 date |

### Safety Levels

| Level | Badge | Meaning | Examples |
|-------|-------|---------|----------|
| `green` | Safe | No meaningful physical risk. Child can work independently. | Reading, discussion, indoor crafts |
| `yellow` | Supervised | Requires adult supervision. Moderate risk if unsupervised. | Cooking with heat, hand tools, water activities |
| `red` | Expert | Requires expert guidance. Significant risk without proper training. | Fire, sharp tools, heights, power tools, wilderness navigation |

### Parent Roles

| Role | Description |
|------|-------------|
| `guide` | Actively teach, demonstrate, and direct. Heavy involvement. |
| `facilitate` | Set up the activity, answer questions, monitor progress. Medium involvement. |
| `observe` | Be present and available but let the child lead. Light involvement. |
| `participate` | Do the activity alongside the child as a co-learner. Shared involvement. |

## File Naming Convention

Content files follow this pattern:

```
{content-type}-{slug}.md
```

**Rules:**
- `{content-type}` matches one of the 10 content types exactly
- `{slug}` is lowercase, hyphen-separated, descriptive
- No numbers, dates, or version suffixes in filenames
- Keep slugs under 60 characters

**Examples:**
```
lesson-fire-starting-basics.md
activity-compass-navigation.md
project-birdhouse-build.md
field-plan-creek-ecology-survey.md
recipe-sourdough-starter.md
experiment-soil-ph-testing.md
adventure-overnight-backpack.md
practice-daily-journal-routine.md
discussion-what-is-fairness.md
service-neighborhood-cleanup.md
```

**Placement:** Files go in `curriculum/{stage}/{pillar}/` based on their frontmatter `stage` and `pillar` values. The directory path and frontmatter must agree.

## Contribution Workflow

```
1. IDEA                2. DRAFT               3. REVIEW              4. MERGE
   ┌──────────┐          ┌──────────┐          ┌──────────┐          ┌──────────┐
   │ Open an  │          │ Fork +   │          │ Peer     │          │ Maintainer│
   │ issue    │───────►  │ write    │───────►  │ review + │───────►  │ merge +  │
   │ (template│          │ content  │          │ editorial│          │ publish  │
   │ required)│          │ (use     │          │ pass     │          │          │
   └──────────┘          │ template)│          └──────────┘          └──────────┘
                         └──────────┘
```

### Steps

1. **Idea** -- Open an issue using the "Content Idea" template. Describe the content, target stage/pillar, and why it matters.
2. **Draft** -- Fork the repo. Copy the appropriate template from `/templates/`. Fill in frontmatter and body. Place the file in the correct `curriculum/{stage}/{pillar}/` directory.
3. **Review** -- Open a PR using the PR template. At least one core maintainer must approve. Safety-critical content (yellow/red safety level, field plans, recipes, experiments, adventures) also requires domain expert review. See CONTRIBUTING.md for the full tiered review policy.
4. **Merge** -- A core maintainer merges after review passes. Frontmatter validation (future CI) and site deployment (future story) will be automated once the `/site/` app ships.

### Contributor Layers

| Layer | Who | Can Do |
|-------|-----|--------|
| Core Maintainers | Project leads | Merge PRs, set direction, manage releases |
| Domain Experts | Subject-matter specialists | Author content, review for accuracy |
| Parents | Homeschoolers, educators | Author content, field-test, report results |
| Students | Learners (with parent account) | Suggest content, report field experiences |
| Community | Anyone | Open issues, suggest ideas, translate, discuss |

### Review Requirements by Content Type

| Content Type | Domain Review | Editorial Review | Safety Review |
|--------------|:------------:|:---------------:|:------------:|
| lesson | required | required | if yellow/red |
| activity | required | required | if yellow/red |
| project | required | required | if yellow/red |
| field-plan | required | required | always |
| recipe | required | required | always |
| experiment | required | required | always |
| adventure | required | required | always |
| practice | optional | required | if yellow/red |
| discussion | optional | required | n/a |
| service | required | required | if yellow/red |

## Validation Rules

These rules should be enforced by CI (future story) and respected by all contributors:

1. **Frontmatter completeness** -- All required fields must be present and non-empty
2. **Enum validity** -- `pillar`, `stage`, `content-type`, `modality`, `safety-level`, `parent-role` must match valid values listed above
3. **Path consistency** -- File must live in `curriculum/{stage}/{pillar}/` matching its frontmatter
4. **Filename convention** -- File must be named `{content-type}-{slug}.md`
5. **Content-type match** -- Filename content-type prefix must match frontmatter `content-type`
6. **Non-empty objectives** -- `learning-objectives` must have at least one item
7. **Non-empty readiness** -- `readiness-indicators` must have at least one item
8. **Safety escalation** -- `field-plan`, `recipe`, `experiment`, and `adventure` types must document safety considerations in the body regardless of safety-level

## GitHub Discussions Categories

Configure these via GitHub UI (Settings > Discussions):

| Category | Description | Format |
|----------|-------------|--------|
| General | General conversation about the project | Open |
| Pedagogy | Educational philosophy and approach discussions | Open |
| Content Ideas | Propose new content before writing | Idea (votable) |
| Field Reports | Share experiences using the curriculum | Open |
| Translations | Coordinate translation efforts | Open |

## Technology Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Content format | Markdown + YAML frontmatter | Universal, version-controllable, readable |
| Site framework | Next.js 15 / React 19 | App Router, RSC for filesystem reads, SSG for content |
| Unit tests | Vitest | Fast, ESM-native, compatible with Next.js |
| E2E tests | Playwright | Full browser automation; Chromium only in CI |
| AI personalization | Anthropic SDK (`claude-sonnet-4-20250514`) | Generates 5-7 units per week from child profile |
| Community contributions | GitHub REST API (branch → file → PR) | Contributions land as draft PRs for maintainer review |
| Curriculum data layer | `gray-matter` + Node `fs` at runtime | No database; filesystem is the source of truth |
| Deployment | Vercel | Native Next.js integration, edge CDN |
| License (content) | CC BY-SA 4.0 | Open, share-alike ensures derivatives stay open |
| License (code) | MIT | Standard for open-source code |
| CI validation | GitHub Actions (future) | Native to GitHub, free for public repos |
| Content structure | Stage-first, then pillar | Parents think "what stage is my child at?" first |

## Running the Site Locally

```bash
cd site
pnpm install
cp .env.local.example .env.local   # fill in the two required keys
pnpm dev
```

### Required Environment Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `ANTHROPIC_API_KEY` | Yes (for AI personalization) | Calls `claude-sonnet-4-20250514` to generate personalized weekly plans |
| `GITHUB_TOKEN` | Yes (for contributions) | Creates branches, files, and draft PRs via GitHub REST API. Needs `repo` scope on `coreyepstein/new-american-codex` |

Without `ANTHROPIC_API_KEY`, the `/personalize` route returns 500. Without `GITHUB_TOKEN`, the `/contribute` routes return 503.

### Test Commands

```bash
# Unit tests (Vitest)
pnpm test

# E2E tests (Playwright) — requires a running build
pnpm exec playwright test

# Type check
pnpm typecheck
```

## API Routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/signup` | POST | Email list signup (body: `{ email }`) |
| `/api/personalize` | POST | Generate personalized weekly plan (body: `ChildProfileRequest`) |
| `/api/contribute/content` | POST | Submit curriculum content → GitHub draft PR |
| `/api/contribute/idea` | POST | Submit content idea → GitHub Issue |
| `/api/contribute/issue` | POST | Report correction → GitHub Issue |

All routes implement in-memory per-IP rate limiting (3 req/min for `/personalize`, 3 req/min for `/contribute/content`, 5 req/min for idea/issue routes). Rate limits reset on server restart.

### `POST /api/personalize` Request Schema

```typescript
{
  childName?: string        // optional, max stripped of HTML
  interests: string[]       // 1-5 items
  stage: string             // foundation | explorer | builder | apprentice | architect
  learningModality: string  // hands-on | verbal | visual | mixed | field | practice | reflective
}
```

Response: `{ units: GeneratedUnit[], childName?: string, stage: string }` — 5-7 units.

### `POST /api/contribute/content` Request Schema

```typescript
{
  title: string
  pillar: string            // valid pillar slug
  stage: string             // valid stage slug
  contentType: string       // valid content type slug
  learningObjectives: string  // newline-separated list
  materials: string           // newline-separated list
  duration: string
  body: string                // markdown body
  submitterName?: string
  submitterEmail?: string
  _trap?: string              // honeypot — non-empty triggers silent no-op response
}
```

On success, creates `contribute/content-{slug}-{timestamp}` branch, commits the file to `curriculum/{stage}/{pillar}/{contentType}-{slug}.md`, and opens a draft PR. Returns `{ url: string, number: number }`.
