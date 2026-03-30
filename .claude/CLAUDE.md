# New American Codex — Agent Context

Open-source curriculum for raising capable, self-governing humans. Two separate surfaces: `/curriculum/` (markdown files) and `/site/` (Next.js app serving them).

## Key Facts

- **Curriculum data is served from the filesystem at runtime** — no database. `site/src/lib/curriculum.ts` walks `curriculum/{stage}/{pillar}/` using Node `fs` + `gray-matter`. The file is `server-only`.
- **Site:** Next.js 15 / React 19 / Tailwind 4 / pnpm. App Router only — no pages directory.
- **Tests:** Vitest for unit tests (`pnpm test`), Playwright for E2E (`pnpm exec playwright test`). Playwright builds the app before running tests.
- **Package manager:** pnpm. Do not use npm or yarn.

## Required Env Vars

| Key | Where used |
|-----|-----------|
| `ANTHROPIC_API_KEY` | `site/src/app/api/personalize/route.ts` — calls `claude-sonnet-4-20250514` |
| `GITHUB_TOKEN` | `site/src/app/api/contribute/*/route.ts` — creates branches, files, and PRs via GitHub REST API. Needs `repo` scope on `coreyepstein/new-american-codex` |

Set both in `site/.env.local`. Without them, `/personalize` → 500, `/contribute` → 503.

## Site Structure

```
site/src/
├── app/
│   ├── page.tsx              # Landing (hero, email signup, donate)
│   ├── browse/               # Curriculum browser + item detail
│   ├── framework/            # Eight pillars + stage timeline
│   ├── personalize/          # AI personalization form + results
│   ├── contribute/           # Community content/idea/issue forms
│   └── api/
│       ├── signup/           # Email signup stub
│       ├── personalize/      # AI week generation
│       └── contribute/
│           ├── content/      # New content → GitHub draft PR
│           ├── idea/         # Content idea → GitHub Issue
│           └── issue/        # Correction report → GitHub Issue
├── components/               # Shared UI components
└── lib/
    ├── curriculum.ts         # Filesystem reader (server-only)
    ├── data.ts               # Pillar/stage/content-type constants
    ├── display-maps.ts       # Slug → display name helpers
    ├── prompts/personalize.ts # Anthropic prompt builders
    └── types/                # TypeScript types
```

## Curriculum Structure

Content files live at `curriculum/{stage}/{pillar}/{content-type}-{slug}.md`. Each file has YAML frontmatter (see ARCHITECTURE.md for full schema). The `curriculum.ts` reader skips `stage-overview.md` files and files without a `title` frontmatter field.

Stages: `genesis`, `foundation`, `explorer`, `builder`, `apprentice`, `architect`
Pillars: `agency-critical-thinking`, `american-dynamism`, `physical-survival`, `building-engineering`, `software-ai`, `food-farming`, `core-academics`, `character-purpose`
Content types: `lesson`, `activity`, `project`, `field-plan`, `recipe`, `experiment`, `adventure`, `practice`, `discussion`, `service`

## Design System — American Industrial Aesthetic

**Fonts (3-font system, all via Google Fonts):**
- `font-heading` — Oswald (400/600/700). Headlines, pillar names, uppercase. Commands.
- `font-body` — Source Serif 4 (400/600, italic 400). Body copy, descriptions. Narrative.
- `font-mono` — Space Mono (400/700). Labels, metadata, technical info, uppercase tracked. Data.

**Colors (defined in `globals.css` `@theme {}`):**
- Red `#B91C1C` — primary accent, CTA buttons, left-border cards, labels
- Navy `#1E3A5F` — secondary accent, bottom bars, stage left-borders
- Black `#0F0F0F` — dark sections (hero, footer, donate CTA)
- Off-white `#FAFAFA` — page background
- Text hierarchy: `text-primary` (#000000BF), `text-secondary` (#00000080), `text-tertiary` (#00000040), `text-label` (#0000004D)

**Utility classes (in `globals.css`):**
- `.accent-bar-top` / `.accent-bar-bottom` — 8px red/navy full-width bars
- `.label-text` — Space Mono 11px bold uppercase, red, tracked
- `.meta-text` — Space Mono 11px uppercase, muted (ONLY for light backgrounds)
- `.industrial-card` / `.industrial-card-navy` — card with 4px left-border accent
- `.red-divider` — 5rem × 4px red bar
- `.fluid-h1/h2/h3` — responsive Oswald uppercase headings

**Key patterns:**
- All cards use sharp corners (no `rounded-*`)
- Pillar/stage badges use uniform structural accents (red/navy left-border), NOT per-pillar colors
- Dark sections: hero, footer, donate CTA use `bg-black text-offwhite`
- Paper design board: accessible via Paper MCP (file: "The New American")

## Gotchas

- **`curriculum.ts` is `server-only`** — do not import it from client components. Use API routes or server components.
- **Rate limits are in-memory** — they reset on every server restart (dev or prod restart). Not suitable for multi-instance deployments without shared state.
- **`getCurriculumItems()` result is module-cached** — changes to curriculum files during dev are NOT picked up without a server restart (or manual cache invalidation).
- **GitHub contribution flow creates draft PRs** — the `GITHUB_TOKEN` must have `repo` scope. Fine-grained tokens work if scoped to the target repo.
- **Playwright config** builds the site before running (`pnpm build && pnpm start`). This is slow locally — use `reuseExistingServer: true` (default for non-CI) to skip rebuilds when server is already running.
- **The `browse/[...slug]/page.tsx` route** takes a slug of format `{stage}/{pillar}/{filename-without-md}`.
- **`modality` valid values** include `field`, `practice`, and `reflective` in addition to the standard four — the frontmatter schema and the personalize validator both accept all seven.

## Running Locally

```bash
cd site
pnpm install
# create site/.env.local with ANTHROPIC_API_KEY and GITHUB_TOKEN
pnpm dev          # http://localhost:3000
pnpm test         # unit tests
pnpm typecheck    # TypeScript check
pnpm exec playwright test  # E2E (builds first)
```

## Commit Convention

- Curriculum content: `feat(curriculum): add {content-type} to {stage}/{pillar}`
- Site features: `feat(site): ...`
- Site fixes: `fix(site): ...`
- Docs: `docs: ...`
