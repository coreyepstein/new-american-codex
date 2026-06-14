---
title: "Build a Tool for Someone Else"
pillar: "software-ai"
stage: "apprentice"
content-type: project
readiness-indicators:
  - "Can write working programs in at least one language and finish what they start"
  - "Has built something — a script, a site, a small app — that actually ran and did its job"
  - "Can talk to an adult outside the family clearly and ask good questions"
  - "Understands that real users behave differently than the person who wrote the code"
learning-objectives:
  - "Discover a real person's real problem through interviewing, not assuming"
  - "Choose the simplest technology that solves the problem, rather than the most impressive"
  - "Deliver working software to a non-technical user and support it until it actually helps"
  - "Practice the full arc of building for someone other than yourself — the core of all professional software"
modality: hands-on
duration: "4-6 weeks (4-8 hours per week)"
materials:
  - "A computer with a code editor and whatever runtime your chosen solution needs"
  - "A real person — outside your immediate household — with a real, recurring annoyance"
  - "A notebook for interview notes, sketches, and the problem statement"
  - "A way for your user to reach you with feedback (in person, text, or email)"
safety-level: green
age-range: "13-15"
parent-role: observe
---

# Build a Tool for Someone Else

## Overview

There is a profound difference between building something for yourself and building something for another person. When you build for yourself, you already know how it works, you forgive its rough edges, and you never have to explain it. When you build for someone else, none of that is true — and that gap is exactly where real software engineering lives. Almost no professional developer builds for themselves. They build for users, for customers, for clients: people who do not think like a programmer and do not care how clever the code is, only whether it makes their life easier.

This project drops you into that reality. You will find one real person with one real problem — not a hypothetical user, not "people in general," but a specific human being you can talk to — and you will build them a working tool that solves it. The technology is deliberately your choice and may turn out to be modest: a small script, a spreadsheet that does the math automatically, a simple web page, a tiny app. The point of this project is not technical ambition. The point is to serve a person well, and to discover how hard and how rewarding that actually is.

## The Deliverable

A working software tool, in regular use by a real person who is not you and not a member of your immediate household, that solves a problem they genuinely have. "In regular use" is the bar. A tool you built and demoed once is not done. A tool your user reaches for on their own, again, because it helps — that is the deliverable. Alongside it: a one-page write-up of the problem you found, what you built, and what you learned from watching a real person use it.

## Materials & Tools

| Material | Quantity | Notes |
|----------|----------|-------|
| A real, willing user | 1 person | Outside your household. A neighbor, a relative, a coach, a small-business owner, a teacher, a club leader. Someone who will talk to you and try what you build. |
| A development setup | 1 | Whatever your chosen tech needs. Keep it simple — you do not need a fancy stack. |
| A notebook | 1 | For interview notes and your written problem statement. The thinking matters more than the code here. |
| A feedback channel | 1 | A reliable way for your user to tell you what is broken or confusing. |

## Project Phases

### Phase 1: Plan — Find the Real Problem (Week 1)

This phase is the hardest and the most important, and beginners rush through it to get to the "fun" coding. Do not. A tool that solves the wrong problem perfectly is worthless.

**Find your person.** Look for someone who does a repetitive, annoying task by hand. The signs are everywhere once you look: someone who keeps a messy spreadsheet, copies the same information between two places every week, tallies something on paper, manually reminds people of the same thing over and over, or sighs and says "ugh, I have to do *this* again." Small-business owners, coaches, club organizers, and busy relatives are rich sources. You want someone whose annoyance is real and recurring, not someone doing you a favor by inventing a task.

**Interview them — and resist building.** Sit down with your person and ask them to walk you through the annoying task, start to finish, while you take notes. Ask:

- "Show me exactly how you do this now." (Watch the actual process. It is never what they describe in summary.)
- "What part takes the longest? What part do you hate most?"
- "How often do you do this? What happens if you skip it or get it wrong?"
- "What have you tried before? Why didn't it stick?"

Notice the strong pull to interrupt with "I could build you a—!" Suppress it. You are not here to pitch. You are here to understand. The most common failure in software is building a confident solution to a problem you did not actually understand. Listen twice as much as you talk.

**Write the problem statement.** Before any code, write one page in your notebook:

- **Who** is this for, specifically (name, situation)?
- **What** problem are you solving, in their words?
- **How do they do it today**, and what specifically is wrong with that?
- **What does "solved" look like** — how will you know the tool actually helped?

Show this page to your user and ask: "Did I get this right?" If they correct you, you just avoided building the wrong thing. That is the most valuable conversation in the whole project.

**A worked example of finding the problem.** Imagine you talk to your aunt, who coaches a youth soccer team. You ask her to walk you through her week. Buried in the middle, almost as an afterthought, she mentions that every Sunday night she texts each of fourteen families individually to confirm who is coming to practice, then counts the replies by hand on a sticky note, then texts the assistant coach the number. It takes her over an hour and she dreads it. *That* is the problem — not "soccer team management," which is enormous and vague, but one specific, recurring, hated hour. You almost missed it, because she did not lead with it; she led with the things she thought were "real" coaching. The annoying tasks people have lived with for years become invisible to them. Your job in the interview is to make them visible again by watching the actual week, not the summary of it. Notice, too, that the right tool here might be small — a simple form that families tap, with a running tally she can see. Not an app store launch. A solved hour.

### Phase 2: Build — Simplest Thing That Works (Weeks 2-4)

Now choose your technology, and here is the discipline: **pick the simplest tool that solves the problem, not the most impressive one.** Your instinct will be to build something flashy that shows off what you can do. Fight it. The user does not care that you used a fancy framework; they care that the thing works and they can use it without you standing there. A problem that a smart spreadsheet formula solves does not need a web app. A problem solved by a 40-line script does not need a database. Matching the size of the solution to the size of the problem is itself an advanced engineering skill, and most professionals learn it the hard way.

Build in milestones, and after each one, **put it in front of your user.** This is the single most important habit of the build phase. Do not disappear for three weeks and emerge with a finished tool — you will have built three weeks of wrong assumptions.

**Milestone 1 — The core function works (for you).** Get the central thing working: the calculation runs, the data saves, the reminder sends. It can be ugly. It only has to work, and only on your machine for now. Show your user even at this stage and describe what it will do.

**Milestone 2 — Your user can run it themselves.** This is a giant leap, and where most "it works on my machine" tools die. A tool only you can operate is not a tool you built for someone else — it is a tool you built for yourself that they have to ask you to use. Make it something they can open, run, and use without you. Sit with them while they try it the first time, and **say nothing.** Watch where they get confused. Their confusion is your bug list, and it will surprise you — things you thought were obvious will stop them cold.

**Milestone 3 — It handles the messy real world.** Real users do things you never imagined: leave fields blank, paste weird data, click the wrong button, use it on their phone. What does your tool do when that happens? It must not crash, lose their data, or show a cryptic error. It should fail gently — a clear message, a sensible default, an undo. This is the difference between a school exercise and a tool a real person can rely on.

### Phase 3: Test & Refine — Watch, Don't Explain

Hand the tool to your user for real, daily use, and then do the hardest thing: get out of the way and watch. Resist the urge to explain how to use it or to defend your choices. If they cannot figure it out, that is information about your tool, not about them. Collect their feedback specifically:

- Where did they hesitate or get confused?
- What did they try to do that the tool did not let them do?
- Did they actually keep using it on their own, or did they quietly go back to the old way? (If they reverted, find out honestly why — that is the most important feedback you will get.)

Then fix the top two or three issues and give it back. This loop — watch, fix, return — is the actual core of professional software work, and you are doing the real version of it.

### Phase 4: Present — Deliver and Document

When the tool is genuinely in use, finish properly. Make sure your user can keep using it without you — write them a short, plain-language note on how it works and how to reach you if something breaks. Then write your one-page reflection: the problem you found, what you built and why you chose that technology, what surprised you when a real person used it, and what you would do differently. Keep this with the tool itself as your portfolio artifact — it shows not just that you can code, but that you can serve a user, which is rarer and worth more.

## Success Criteria

- [ ] The tool is in regular, voluntary use by a real person outside your household.
- [ ] That person can operate it on their own, without you present.
- [ ] You wrote a problem statement *before* coding and confirmed it with your user.
- [ ] You chose a technology proportional to the problem and can explain why you did not build something bigger.
- [ ] You watched your user use the tool, collected feedback, and made at least two changes based on it.
- [ ] The tool fails gracefully on bad input — it does not crash or lose data.
- [ ] You delivered a short usage note and wrote a one-page reflection.

## Common Pitfalls

- **Building for an imaginary user.** "People who plan events would love this." Which person? Named, real, talked-to? If you cannot point to them, you are guessing, and guessing is how most software dies. Find a specific human first.
- **Solving the problem you wish they had.** You want to build a slick app; their actual problem is a spreadsheet that needs one formula. Build what serves them, not what flatters you.
- **The "works on my machine" trap.** A tool only you can run is not delivered. Milestone 2 — your user operating it alone — is the real finish line of the build, not Milestone 1.
- **Disappearing to build in secret.** Three weeks of solo work followed by a big reveal is the highest-risk way to build anything. Show ugly, early, and often. Every time you show your user, you correct your course before the mistake gets expensive.
- **Defending instead of watching.** When your user gets confused, the wrong move is to explain why it's actually fine. The right move is to write down that they got confused and fix it. Their confusion is never wrong.

## Why Building for Others Is the Whole Game

It is worth understanding why this project matters so much more than its modest technology suggests. When you build for yourself, you are both the engineer and the entire user base, and that hides every hard part of software. You never have to explain the tool, because you already know it. You never hit a confusing screen, because you designed it to match your own head. You never deal with someone using it "wrong," because the only user thinks exactly like you — being you.

The moment you build for another person, all of those hidden difficulties appear at once. You discover that what was obvious to you is baffling to them. You discover that the feature you were proudest of, they never touch, and the boring thing you almost skipped is the thing they use every day. You discover that a tool is not "done" when the code runs — it is done when a human who is not you can rely on it without your help. Every one of those discoveries is uncomfortable, and every one of them is the actual job. This is why companies spend enormous effort on understanding users, testing with real people, and writing clear interfaces: because the gap between "works for me" and "works for them" is where almost all software succeeds or fails. You are crossing that gap, in miniature, on purpose, while the stakes are low. The person you build for this month is teaching you the lesson that will define whether the things you build for the rest of your life are useful or ignored.

## Extensions

- **Build for a second, different user.** Find someone with a genuinely different problem and do it again. The second time, you will move faster and listen better — and you will start to see the patterns that all good tools share.
- **Add gentle reliability.** If your tool stores data, give your user a way to back it up or export it. Losing someone's data is the fastest way to lose their trust.
- **Turn it into something others can use.** If the problem you solved is common, generalize the tool so other people with the same problem could use it too — and share it. That is the bridge to the open-source and full-stack work elsewhere in this pillar.

## Safety Notes

This is a green-safety project, but because you are building for a real person, two responsibilities come with it. First, **respect their data.** If your tool handles any real information that belongs to your user — names, schedules, customer lists, anything private — keep it secure, do not share it, and do not store it anywhere public. Treat their data with the same care you would want for your own. Second, **be honest about what your tool can and cannot do.** Do not let your user rely on it for something important — money, safety, deadlines that matter — beyond what it can actually handle reliably. If it is a rough first version, say so plainly, so they can decide how much to trust it. Building someone a tool means taking responsibility for how they use it.
