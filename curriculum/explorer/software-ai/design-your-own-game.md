---
title: "Design Your Own Game"
pillar: "software-ai"
stage: "explorer"
content-type: project
readiness-indicators:
  - "Can explain the rules of a game they already know (Go Fish, Candy Land, tag)"
  - "Can work on a creative project across multiple sittings"
  - "Shows interest in fairness and rules during play"
learning-objectives:
  - "Apply computational thinking to design a system with rules, conditions, and win states"
  - "Experience the full design cycle: plan, build, test, iterate"
  - "Understand that rules must be complete and unambiguous for others to follow them"
modality: hands-on
duration: "4 sessions of 30-40 minutes"
materials:
  - "Poster board or large cardboard (for the game board)"
  - "Index cards (for game cards, if applicable)"
  - "Markers, colored pencils, crayons"
  - "A ruler"
  - "Dice (one or two), coins for flipping, or a homemade spinner"
  - "Small objects for game pieces (buttons, LEGO minifigures, coins, bottle caps)"
  - "Tape, glue, scissors"
  - "A notebook for drafting rules"
safety-level: green
age-range: "5-8"
parent-role: guide
---

# Design Your Own Game

## Overview

Every board game is a program. It has inputs (dice rolls, card draws, player choices), processes (rules that determine what happens), and outputs (movement, scoring, winning). When a child designs a game from scratch, they are doing software engineering — without a screen, without code, without knowing that's what they're doing. They must define rules precisely enough that someone else can follow them, handle edge cases ("What if two people land on the same square?"), and iterate when playtesting reveals problems.

## The Deliverable

A complete, playable game with:
- A physical board, cards, or play surface
- Written rules that another family could follow without explanation
- Game pieces and any randomization elements (dice, spinner, cards)
- A clear win condition
- At least one round of playtesting and revision

## Materials & Tools

See the materials list in the frontmatter. You don't need to buy anything — raid your craft supplies, recycling bin, and existing game collections. Bottle caps make great game pieces. A cereal box unfolded makes a fine game board.

## Project Phases

### Phase 1: Research & Plan (Session 1, 30 minutes)

**Study existing games (10 minutes):**

Pull out 2-3 games your child knows well. Don't play them — analyze them.

*"Let's look at this game like a designer, not a player. What are the RULES? How do you WIN? What makes it fun?"*

For each game, identify:
- How do you decide who goes first?
- What happens on your turn?
- Is there luck, skill, or both?
- How does someone win?
- What makes it fun (and what's boring)?

**Brainstorm (10 minutes):**

*"Now you're going to invent YOUR game. Let's start with the big questions."*

Work through these together:
1. **Theme:** What is the game about? (Space adventure, treasure hunt, animal race, cooking competition — anything.)
2. **Players:** How many people can play? (2-4 is a good range.)
3. **Goal:** How does someone win? (Reach the end first? Collect the most points? Survive the longest?)
4. **Turn structure:** What happens on each turn? (Roll dice and move? Draw a card? Make a choice?)

**Draft rules (10 minutes):**

In the notebook, write (or have your child dictate) a first draft of the rules. It will be incomplete — that's fine. The point is to get ideas on paper.

### Phase 2: Build (Session 2, 40 minutes)

**Create the board or play surface (20 minutes):**

If it's a board game: draw the path, spaces, or grid. Add special squares (go back 3, take another turn, draw a card). Color and decorate it.

If it's a card game: make the cards. Index cards work perfectly. Each card needs clear text or symbols.

*"Remember — another person has to understand this without you explaining it. Label things clearly."*

**Make the pieces (10 minutes):**

Game pieces, tokens, a spinner if needed. Keep it simple — function matters more than beauty in a prototype.

**Write the final rules (10 minutes):**

Take the draft from Session 1 and write a complete version. Guide your child to cover:
- Setup (how to arrange the board, deal cards, etc.)
- Turn order (who goes first and which direction play moves)
- Turn actions (exactly what a player does on their turn)
- Special rules (what happens when you land on special squares, draw certain cards)
- Winning (exactly how someone wins and how you know the game is over)

*"Imagine someone who has never seen this game is reading these rules. Would they know what to do?"*

### Phase 3: Playtest (Session 3, 35 minutes)

**Play the game (20 minutes):**

Play a full round with your child. Follow the written rules EXACTLY as written — just like the Human Robot activity. If a situation comes up that the rules don't cover, stop and say: *"The rules don't say what happens here. What should we do?"*

Write down every problem, question, or confusion that comes up during play.

**Debug (15 minutes):**

Review the list of problems. For each one:
- *"What went wrong?"*
- *"What rule could we add or change to fix it?"*

Common bugs children discover:
- The game takes too long (shorten the board, increase movement)
- One player always wins (the game isn't balanced)
- A situation comes up with no rule for it (add a rule)
- It's boring in the middle (add events, choices, or surprises)

*"Every game designer playtests. Every software programmer tests their code. Finding problems isn't failure — it's the most important step."*

### Phase 4: Revise & Present (Session 4, 30 minutes)

**Revise (15 minutes):**

Make the fixes identified in playtesting. Update the rules. Fix the board if needed. Add missing cards.

**Play again (10 minutes):**

Play a second round with the revisions. Is it better? Are there new issues?

**Present (5 minutes):**

Have your child teach the game to someone who hasn't played it — a sibling, other parent, grandparent, friend. They can ONLY use the written rules and the game materials. No verbal additions.

*"If they can play it correctly just from your rules, you wrote a great program."*

## Success Criteria

| Criteria | What It Looks Like |
|----------|-------------------|
| Complete rules | Another person can play using only the written rules |
| Functional game | The game reaches a natural end with a winner |
| Iteration | At least one change was made based on playtesting |
| Computational concepts | The game includes sequencing (turns), conditions (special squares/cards), and a clear end state |

## Common Pitfalls

- **Scope creep:** Children want to add 47 special squares, 12 card types, and a bonus round. Guide them toward simplicity. *"Great game designers make the simplest game that's still fun."*
- **Rules that live in the designer's head:** The child knows what they meant but didn't write it down. The playtest with an outside person will reveal this instantly.
- **Unbalanced randomness:** If the game is pure luck (roll and move, no choices), it won't feel satisfying. Nudge them toward at least one decision point per turn.
- **Frustration during playtesting:** When the game breaks, some children feel like they failed. Reframe it: *"Professional game designers playtest 50 times before a game is finished. You're doing real design work."*

## Extensions

- **Digital version:** For ages 7-8, recreate the game in Scratch (scratch.mit.edu). This bridges the physical game design to actual code.
- **Game design journal:** Keep a notebook where your child sketches game ideas, notes what makes other games fun, and drafts new concepts. Many professional designers keep idea journals.
- **Game night showcase:** Invite friends or family for a "game premiere" where your child's game is the featured event.
- **Study a game they love:** Pick a commercial game and reverse-engineer it. How many rules does it have? What makes it balanced? What would they change?
