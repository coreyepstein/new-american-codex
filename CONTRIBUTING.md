# Contributing to The New American Codex

This curriculum is built by a community, not a committee. Every family that uses it, every expert who reviews it, and every contributor who improves it makes the whole thing better for everyone.

Here's how to participate.

## Contribution Layers

Not everyone contributes the same way, and that's by design.

| Layer | Who | What You Do |
|-------|-----|-------------|
| **Core Maintainers** | Project leads and trusted editors | Set philosophical direction, maintain structure, review and merge PRs, manage releases |
| **Domain Experts** | Farmers, engineers, survivalists, educators, doctors | Author content in your area of expertise, review submissions for accuracy and safety |
| **Parents & Teachers** | Homeschool families, micro-school founders, educators | Field-test content with real children, submit modifications, report what worked and what didn't |
| **Students** | Older learners (Apprentice/Architect stage) | Create project showcases, write peer teaching materials, suggest content from the learner's perspective |
| **Community** | Anyone | Submit resource links, book recommendations, translations, ideas, corrections |

You don't need to be an expert to contribute. You don't need to know Git. You just need something to teach or something to improve.

## How to Contribute

### Submit an Idea

Have a concept for a lesson, activity, or project? Open an issue using the **[Content Idea](../../issues/new?template=content-idea.yml)** template. Describe:

- What the content would cover
- Which pillar and stage it fits
- What content type it should be (lesson, activity, project, etc.)
- Why it matters

Good ideas get picked up by contributors and turned into real content. Great ideas come from noticing what your child needed and couldn't find.

### Submit Content

This is how the curriculum actually grows. Follow these steps:

1. **Fork** this repository
2. **Choose the right template** from [`/templates/`](./templates/) — there are 10, one for each content type
3. **Copy the template** into the correct directory: `curriculum/{stage}/{pillar}/`
4. **Name your file** following the convention: `{content-type}-{slug}.md` (e.g., `lesson-fire-starting-basics.md`, `recipe-sourdough-starter.md`)
5. **Fill out all YAML frontmatter fields** — every required field must be present and accurate. See [ARCHITECTURE.md](./ARCHITECTURE.md) for the full schema
6. **Write the content** — use the template's body sections as your guide
7. **Submit a Pull Request** using the [PR template](../../compare)

Your file's directory path and its frontmatter `stage` and `pillar` fields must match. A file in `curriculum/explorer/food-farming/` must have `stage: explorer` and `pillar: food-farming` in its frontmatter.

### Report an Issue

Found an error? A safety concern? Something that doesn't work as described? Open an issue using the **[Correction](../../issues/new?template=correction.yml)** template.

Safety concerns are treated with the highest priority. If content is physically dangerous, factually wrong, or could harm a child, flag it immediately.

## Editorial Review Process

All submitted content goes through review before it's merged. The depth of review depends on what the content is.

**Standard content** (green safety level): reviewed by at least one core maintainer for editorial quality, frontmatter completeness, and philosophical alignment. Target: merge within **7 days**.

**Safety-critical content** (yellow or red safety level, plus all field plans, recipes, experiments, and adventures regardless of safety level): reviewed by at least one domain expert in addition to editorial review. Target: merge within **14 days**.

**Philosophy and structure changes** (modifications to pillars, stages, content types, or core framework): require core team consensus. These are rare and significant.

**Resource additions** (book recommendations, links, supplementary materials): lower review bar. One reviewer, fast turnaround.

### What Reviewers Look For

Every piece of content is evaluated against these criteria:

- **Frontmatter completeness.** All required fields present and valid
- **Learning objectives.** Specific and measurable — "Identify three fire-starting methods" not "Learn about fire"
- **Materials list.** Realistic and accessible. No exotic or expensive items without alternatives listed
- **Safety.** Warnings explicit and prominent. Nothing hand-waved
- **Readiness indicators.** Observable and practical — things a parent can actually see in their child
- **Tone.** Authoritative but warm. No edu-speak, no buzzwords, no condescension. Write like you're talking to a capable parent
- **Philosophical alignment.** Content reflects the Codex values: independence, curiosity, agency, Tikkun Olam, practical capability
- **Inclusivity.** Content works for all families. No assumptions about family structure, income level, geography, or religious affiliation beyond the stated philosophical foundations

## Content Quality Guidelines

These apply to every piece of content in the Codex.

**Every unit must have complete YAML frontmatter.** No exceptions. The frontmatter is the contract between content authors and the site. Missing fields break rendering and discoverability. See [ARCHITECTURE.md](./ARCHITECTURE.md) for the full schema specification.

**Learning objectives must be specific and measurable.** "Understand ecosystems" is too vague. "Identify three producer-consumer relationships in a backyard habitat" is specific. A parent should be able to look at the objective and know whether their child met it.

**Materials lists must be realistic.** If a project requires a 3D printer, say so — and provide an alternative for families that don't have one. If an activity needs a specific plant, list what seasons and regions it grows in. No content should require a trip to a specialty store unless that's part of the learning.

**Safety warnings must be explicit and prominent.** If a child will use a knife, be near water, work with heat, handle chemicals, or go into wilderness, the safety section must exist and must be detailed. "Be careful" is not a safety warning. "An adult must supervise all knife use. Demonstrate the proper grip before the child handles the knife. Keep a first aid kit within reach." — that is a safety warning.

**Readiness-based, not age-gated.** Content uses readiness indicators ("Can follow multi-step safety instructions") rather than grade levels. The `age-range` field is guidance, not a gate. A child may be ready for Builder-level engineering at 8 or at 14. Both are fine.

**Inclusive language.** The Codex is for all families. Write for a single parent, two parents, a grandparent, a co-op, a micro-school. Don't assume a yard, a farm, a kitchen island, or a two-car garage. Provide adaptations when the default setting won't work for everyone.

## PR Guidance by Content Type

Each content type has different priorities. Here's what reviewers focus on:

**Lesson** — Are the learning objectives clear? Is the lesson flow logical? Does the assessment measure what the objectives promise?

**Activity** — Is it completable in the stated duration? Are materials truly needed or is the list inflated? Will a child actually find this engaging?

**Project** — Is the multi-session scope realistic? Are milestones defined so a child can feel progress? Is the final deliverable something a child would be proud of?

**Field Plan** — Is the location type accessible to most families? Are the pre-visit, during-visit, and post-visit sections all substantive? Are safety considerations addressed for the specific environment?

**Recipe** — Is the recipe tested and accurate? Are the learning objectives genuinely integrated, not bolted on? Are allergen and dietary notes included?

**Experiment** — Is the hypothesis clearly stated? Can the experiment actually be conducted with the listed materials? Are the expected results honest (including "it might not work, and here's why that's okay")?

**Adventure** — Is the safety section thorough? Is there a clear distinction between what the child does independently vs. with adult supervision? Is there a bail-out plan if conditions aren't right?

**Practice** — Is the routine actually repeatable? Is there progression built in (beginner to advanced)? Does it avoid being tedious?

**Discussion** — Are the prompts genuinely open-ended, not leading? Is there a "Background for Parents" section so the facilitator is prepared? Are multiple reasonable viewpoints acknowledged?

**Service** — Is the service activity real and meaningful, not performative? Does it connect to a genuine community need? Is the reflection component substantive?

## Code of Conduct

The New American Codex is a project built on the belief that ordinary people — parents, teachers, farmers, engineers, students — can build something extraordinary together.

**Be constructive.** Critique content, not people. "This safety section needs more detail on knife handling" is constructive. "This is dangerous and irresponsible" without specifics is not.

**Be honest.** If content doesn't work, say so. If an approach failed with your children, report it. Honest feedback is how the curriculum gets better. Polite silence helps no one.

**Be welcoming.** Not everyone knows Git. Not everyone writes polished prose on the first try. Help people contribute better rather than gatekeeping who gets to contribute.

**Be safe.** Content involving physical risk is taken seriously. If you see something that could hurt a child, flag it immediately. Don't wait for a formal review cycle.

**Build together.** This is a commons, not a competition. The best version of this curriculum is one that a thousand families contributed to, not one that a single team produced. Every improvement you make helps every family that uses it.
