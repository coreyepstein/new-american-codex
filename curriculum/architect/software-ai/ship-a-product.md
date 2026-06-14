---
title: "Ship a Product"
pillar: "software-ai"
stage: "architect"
content-type: project
readiness-indicators:
  - "Has built and deployed at least one full-stack web application and can debug it across frontend, backend, and database without help"
  - "Has received feedback from real users and changed the product in response, rather than defending the original design"
  - "Can sustain a multi-month project on self-imposed deadlines without anyone assigning the work"
learning-objectives:
  - "Ship a software product from a validated problem through public launch and into ongoing maintenance"
  - "Build for users who are not yourself — research their needs, design for their workflows, and resist building for your own taste"
  - "Operate a product like a professional: error handling, monitoring, backups, and security that hold up when strangers use it"
  - "Get and keep users, then iterate on usage data and feedback rather than assumptions"
modality: hands-on
duration: "16-24 weeks (10-20 hours per week)"
materials:
  - "A computer with a modern development environment"
  - "A GitHub account"
  - "A hosting platform account (Vercel, Railway, AWS, or similar)"
  - "A domain name ($10-15/year from any registrar)"
  - "An analytics tool (Plausible, PostHog, or similar — many have free tiers)"
  - "A feedback collection method (email, a simple form, or a feedback widget)"
  - "A notebook for product decisions and user research notes"
safety-level: green
age-range: "16-18"
parent-role: absent
---

# Ship a Product

## Overview

There are millions of developers in the world who can write code. There are far fewer who can ship a product. The difference is not technical skill — it is everything that surrounds the code. Understanding what to build. Knowing when to stop building and start shipping. Getting the product in front of people who need it. Listening to their feedback without becoming defensive. Fixing what matters and ignoring what does not. Sustaining the effort over months, not weeks.

In this project, you will build and ship a real software product. Not a portfolio piece. Not a toy. A product that people use, that solves a real problem, and that you maintain and improve over time. The product does not need to be large — many successful products do one thing well. But it must be complete: it works, it is reliable, real people use it, and you are responsible for it.

This is the most demanding project in the software pillar. It requires technical skill, product thinking, marketing instinct, and sustained discipline. You will spend as many hours on non-coding work — research, design, marketing, support, documentation — as on coding. That ratio is what separates a developer from a product builder, and it is the single thing most first-time builders refuse to believe until it is too late. Coding is the part that feels like progress, so it is the part you will overdo; the rest is the part that feels like overhead, so it is the part you will skip, and skipping it is exactly how a working piece of software fails to become a product anyone uses.

Hold yourself to the standard of the thing, not the standard of effort. No one will grade you on how hard you worked or how clever your architecture is. The honest measure is simpler and harsher: did real people, who are not your friends, choose to use what you built, come back to it, and miss it if it disappeared? Everything in this project bends toward that question. When you are deciding what to work on, what to cut, and when to stop, ask which choice moves you closer to a stranger relying on your software. That discipline — building toward use rather than toward completeness — is what you are really here to learn.

## Phase 1: Find the Problem (Weeks 1-3)

### The Problem-First Approach

Do not start with a technology. Do not start with a feature idea. Start with a problem.

Talk to people. Not your friends — people who work, who run households, who manage teams, who create content, who organize communities. Ask them: "What is the most annoying repetitive task in your day?" "What tool do you wish existed?" "What do you currently use that frustrates you?"

Write down every problem you hear, in the speaker's own words rather than your paraphrase, because the exact language people use to describe their pain is the language you will later use to describe your product back to them. After ten to fifteen conversations, patterns will emerge. Three unrelated people complaining about the same thing, unprompted, is a signal worth chasing. One person's vivid complaint that no one else echoes is usually a problem specific to that person, not a market.

Resist the strongest temptation of this phase, which is to fall in love with a solution before you have confirmed the problem. The moment you think "I could build an app for that," your brain stops listening for the real shape of the pain and starts collecting evidence for the thing you already want to build. Stay in the problem. Keep asking how the person handles it today, what they have already tried, how much time or money it costs them, and how often it bites — because a problem people currently solve with an ugly spreadsheet and a lot of swearing is a far better opportunity than a problem they have never bothered to solve at all, which usually means it does not hurt enough to pay for a fix.

### Validating the Problem

Before building anything, validate that the problem is real, painful enough to motivate a switch, and underserved:

1. **Is this a real problem?** (Do people actually experience it, or is it theoretical?)
2. **Is it painful enough?** (Will people change their behavior to solve it? A mild annoyance is not a product opportunity.)
3. **Are existing solutions inadequate?** (If a good solution already exists, you need a compelling reason to build another one.)
4. **Can I reach the people who have this problem?** (A great product for a market you cannot reach is worthless.)

### The Product Definition

Write a one-page product definition:

**Problem:** [One sentence describing the pain.]
**User:** [Who has this problem? Be specific.]
**Solution:** [What your product does. Not how it works technically — what it does for the user.]
**Core workflow:** [The 3-5 steps a user takes to accomplish their goal in your product.]
**Not building:** [Features you will not build. This is as important as what you will build. Write them down so you resist the temptation later.]

## Phase 2: Design and Prototype (Weeks 4-6)

### User Interface Design

Before writing code, sketch every screen of your product on paper. Not in Figma — on paper, with a pencil. Paper prototypes are fast to create, fast to change, and do not trick you into thinking a design is good because it looks polished.

For each screen, ask:
- What is the user trying to accomplish on this screen?
- What is the minimum information they need to see?
- What is the primary action? (There should be one obvious thing to do, not five.)
- How do they get to the next screen?

Show your paper sketches to 2-3 potential users. Walk them through the workflow. Ask: "Does this make sense? Where would you get confused?" Revise based on their feedback. This costs zero code and saves weeks of rework.

### Technical Architecture

Now — and only now — decide how to build it.

**Choose your stack based on what you know and what the product needs:**

For most products built by a single developer, this stack works well:
- **Frontend:** React or Svelte (component-based, large ecosystem)
- **Backend:** Node.js with Express, or a serverless approach (Vercel Functions, AWS Lambda)
- **Database:** PostgreSQL (the right default for almost everything)
- **Hosting:** Vercel (frontend), Railway or Supabase (database)
- **Auth:** A managed service (Clerk, Supabase Auth, or Auth.js) — do not build authentication yourself

Draw the architecture on paper. Show how data flows: user action in browser, request to server, database query, response, render. Every product is just this loop, repeated for every feature.

## Phase 3: Build (Weeks 7-14)

### The Build Discipline

You have eight weeks to build version 1.0. That is not much time, and the surest way to waste it is to spend it building the wrong things well. The discipline of this phase is sequencing — doing the load-bearing work first and refusing the seductive work until the load-bearing work holds.

Build the core workflow first, and finish it completely before you build anything else. The three to five steps from your product definition are the entire reason your product exists; until a user can move through all of them and accomplish the thing they came to do, nothing else you add has any value to attach to. It is tempting to build the settings page, the account dashboard, the dark-mode toggle — all the satisfying scaffolding around a product — because each one is a small, well-defined task you can finish in an afternoon. Resist all of it. A product where the core workflow works and nothing else is a product. A product with a beautiful settings page and a broken core workflow is a pile of code.

Deploy after every meaningful change, from the very first week, so that "it works in production" is a fact you re-establish constantly rather than a terrifying event you postpone until launch. The gap between your machine and the real server is where a huge fraction of launch-day disasters live — an environment variable you set locally and forgot, a dependency that is on your laptop but not in the build, a path that works on your filesystem and not on the host's. If you deploy a hundred small changes over eight weeks, you discover each of these the moment you introduce it, when the cause is obvious. If you deploy once at the end, you discover all of them at once, tangled together, the night before you wanted to launch.

Commit every day you work, in small, frequent, honestly-described commits. This is partly a safety net — the ability to walk back to the last working state when an experiment goes wrong is the difference between losing an hour and losing a weekend — and partly a record of your own progress that will keep you sane across a long project. On the weeks when it feels like nothing is happening, your commit history is the evidence that it is.

Guard the scope as fiercely as you guard the time, because they are the same thing. Every feature you add is time taken from making the core workflow excellent. When a great new idea arrives mid-build, and it will, do not start building it and do not argue with yourself about it — write it in the notebook under "Version 2.0" and return to version 1.0. The notebook is not where ideas go to die; it is where they go to wait until they have earned their place, which is after real users have told you they want them. Most of the features you are sure you need in week seven will look obviously unnecessary once strangers are actually using the thing.

Finally, spend real time on the parts of the product the user actually touches. The difference between a prototype and a product lives almost entirely in the states you are tempted to ignore: the error message when something fails, the loading state while they wait, the empty state before they have any data, the way the whole thing reflows on a phone. A developer testing their own happy path never sees these, which is exactly why users hit them constantly. Polishing them is not gold-plating; it is the work.

### Production Practices

Your product has to work reliably for people who did not build it, do not know its quirks, and will not give you the benefit of the doubt. That standard is higher than "it works on my machine," and meeting it is not optional polish — it is the floor below which you do not have a product at all.

Start with error handling, because in production everything that can fail eventually does. Every network request can time out, every form will eventually receive input you did not anticipate, every database query can fail under load you have never tested. The amateur move is to assume the happy path and let the failure path crash; the professional move is to treat every failure as an event you have already decided how to handle. When something goes wrong, the user should see a clear, human message that tells them what happened and what to do next — never a blank screen, never a spinner that spins forever, and above all never a raw stack trace, which leaks how your system works to anyone curious enough to read it and tells the user only that you did not anticipate this. Decide, for each thing that can fail, what the user sees when it does, and build that.

Take data safety just as seriously, because losing a user's data is the one mistake from which trust does not recover. A product that occasionally has a bug is forgivable; a product that loses the work someone entrusted to it is finished. If you are using a hosted database, turn on automatic backups today, before there is any data to lose, and then actually test that you can restore from one — an untested backup is a guess, not a safeguard. If you are running your own database, write a daily backup that copies to a separate place, because a backup that lives on the same machine as the database it protects is no backup at all once that machine fails.

Security is the same kind of obligation, and the basics are not negotiable once real people are trusting you with their accounts. Never store passwords as plain text — hash them with a purpose-built password hash so that even you cannot read them and a leaked database does not become a leaked set of credentials. Better still, do not build authentication yourself at all; use a managed service so that the hardest, highest-stakes security work is done by people who do it full time. Treat every input from a user as potentially hostile: validate and sanitize it so that crafted input cannot rewrite your database queries or smuggle scripts into other users' browsers. Serve everything over HTTPS, which your hosting platform almost certainly provides for free. Keep every secret — API keys, database credentials, tokens — out of any code that ships to the browser, where anyone can read it, and on the server where it belongs. And put rate limits on the endpoints an attacker would hammer, especially login and registration, so that no one can sit there guessing passwords a thousand times a second. None of this is exotic; all of it is the difference between a product and a liability.

Last, set up monitoring so that you learn about problems before your users have to tell you. Wire in error tracking — a free tier is plenty at your scale — so that when something throws an exception in production, you get a report with the details instead of a confused email from a user three days later. Add basic uptime monitoring that checks every few minutes that your site is actually responding and alerts you when it is not. The goal is simple and it is the whole posture of running a product rather than just writing one: you should be the first to know when something breaks, not the last.

### Dogfooding

Use your own product, every day, for the real thing it is supposed to do — not to test it, but to actually rely on it. This habit has a name in the industry, dogfooding, and it is the cheapest and most honest source of feedback you will ever have. Every point of friction you feel — the step that takes one click too many, the message that confused you for half a second, the thing you wished it did — is a point of friction every one of your users will feel, except they will not file a bug report about it; they will just quietly leave. Fix the things that annoy you, because they are annoying everyone. And take seriously the hardest signal this practice can send: if you find yourself not wanting to use your own product, reaching for the old spreadsheet or the competitor instead, that is not a small problem to note and move past. That is the product telling you it is not yet good enough for anyone, and you are the only person who will hear it early enough to do something about it.

## Phase 4: Launch (Weeks 15-16)

### Before You Tell Anyone

The launch is the one moment you cannot redo. You get a single first impression with each person who hears about your product, and if the first thing they experience is a broken signup or a core feature that errors out, most of them will never come back to give you a second chance. So before you tell a single stranger your product exists, you walk it like a stranger would, and you do not declare it ready until it survives that walk.

Sit down and go through the entire core workflow yourself, end to end, as if you had never seen the product before — sign up with a fresh account, accomplish the main task from a cold start, and confirm there is not a single error or dead end between arriving and succeeding. Do it again in a browser you do not normally use, because the thing that works flawlessly in your daily Chrome has a real chance of breaking in Safari or Firefox in ways you would never catch otherwise. Do it again on your phone, holding it the way a real person would, because a large fraction of your first visitors will arrive on mobile and bounce instantly if the layout is broken. Deliberately do the wrong things — submit the empty form, enter the malformed email, lose your connection mid-action — and confirm that each failure produces a clear message rather than a crash.

Then step back from the product to the things around it. Look at your landing page as a stranger who has three seconds of patience: does it say, plainly and immediately, what this does and who it is for, or does it make them work to understand it? Confirm there is an obvious way for a confused or delighted user to reach you — an email address, a feedback form, anything — because the messages those first users send are the most valuable input you will get and you must not make it hard. And confirm, one last time, that the unglamorous machinery is running: backups are actually happening, error monitoring is actually reporting, so that when launch day brings traffic and edge cases you did not anticipate, you find out immediately instead of from an angry user a week later. When every one of these is true, and not before, you are ready.

### The Launch

Write a clear, honest description of what your product does. Post it where your target users are:

- **If your users are developers:** Post on Hacker News (Show HN), Reddit (relevant subreddits), or Dev.to.
- **If your users are local businesses:** Email them directly with a personal note and a link.
- **If your users are a specific community:** Post in that community's forum, Discord, or Facebook group.
- **If your users are general consumers:** Post on Product Hunt, Twitter/X, or relevant social media.

Do not spam. Write one thoughtful post that explains the problem, how your product solves it, and invites people to try it. Be honest about the stage — "I built this myself, it's early, and I would love your feedback" is more compelling than fake polish.

### Launch Day

Watch the analytics. Watch the feedback. Watch the error logs. You will feel a mix of excitement and terror. Both are appropriate.

Things will break. Users will do things you did not anticipate. Some feedback will be harsh. This is all data. Capture it, prioritize it, and stay calm.

## Phase 5: Iterate (Weeks 17-24)

### The Feedback Loop

After launch, your job shifts from building to listening. Every week:

1. **Review analytics.** How many users signed up? How many came back? Where do they drop off?
2. **Read feedback.** What are people asking for? What are they confused by? What do they love?
3. **Prioritize.** You cannot build everything. Use this framework: Is this request about the core workflow (high priority) or a nice-to-have feature (low priority)? Is this a problem many users have or just one person? Can I fix it in an hour or does it require a major change?
4. **Build and deploy.** Pick the highest-priority item. Fix it or build it. Deploy. Tell the user who requested it.

This cycle — listen, prioritize, build, ship, listen — is product development. It runs until you decide to stop.

#### A worked iteration, start to finish

Abstract advice about "listening to users" is forgettable; a concrete example of the judgment it requires is not. So follow one week of iteration all the way through. Suppose you have launched a small tool that helps people track shared expenses, and in your first two weeks you have twenty-five signups. You sit down for your weekly review and look at three things at once.

The analytics tell you a story you did not want to hear: of those twenty-five signups, eighteen created an account, eleven added a single expense, and only four ever came back a second day. People are arriving, trying it once, and not returning. That is the most important fact in front of you, more important than any single feature request, because a product no one returns to is not retaining anyone no matter how many sign up. The feedback fills in why. Three separate users have emailed some version of the same thing: they added an expense, and then could not figure out how to actually split it with the other person — the entire point of the product. Meanwhile, two other users have written in asking for a feature to export their data to a spreadsheet, and one has asked for dark mode.

Here is the discipline. The dark-mode request is real, and you could build it this afternoon, and it would feel like progress, and you should not touch it. The export feature is a reasonable Version 2.0 idea; into the notebook it goes. The thing you build this week is the splitting flow, because it is squarely on the core workflow, because three different people independently hit it, and because the analytics confirm it is exactly where users drop off — the eleven who added an expense and the seven who then vanished are almost certainly the people who could not figure out the next step. You are not guessing; the data and the feedback are pointing at the same wound. So you redesign that step to make splitting an expense obvious and immediate, you deploy it, and then you do the thing that turns a fix into a relationship: you reply personally to each of the three users who reported it, tell them it is fixed, and ask them to try again. Some of them will come back, and a user who watched you take their complaint seriously and fix it within a week is far more loyal than one for whom it simply worked the first time.

Notice what made that a good iteration. You let the data tell you where the bleeding was instead of building the request that was loudest or easiest. You distinguished a core-workflow failure from a nice-to-have. You shipped one thing fully rather than three things halfway. And you closed the loop with the humans, because retention is built one rescued user at a time. Run every week of this phase that way.

### Retention Over Acquisition

It is more valuable to make 10 users love your product than to get 100 users who try it once and leave. Focus on retention: why do users come back? Why do they leave? What would make them recommend it to someone else?

Send a personal email to every user who signs up in the first month. Ask: "Thanks for trying [product]. What brought you here? Is it solving the problem you expected?" The responses will teach you more than any analytics dashboard.

## Success Criteria

These are not boxes to check for credit; they are the evidence that you built a product rather than a portfolio piece. The test of this project is not that you finished it but that something real exists in the world because you did — software at a real address, used by real people who are not obligated to be kind to you. Hold yourself to that. You have succeeded when the following are true:

- The product is live at a custom domain and accessible to the public
- At least 20 users have signed up (not including friends and family)
- The product has been iterated at least 3 times based on real user feedback
- Error monitoring and database backups are active and functioning
- The student can articulate their product's core value proposition in one sentence
- The student can describe the full technical architecture (frontend, backend, database, hosting) from memory
- The student can show analytics data and explain what it tells them about user behavior
- The student has written at least one post-mortem on a bug or incident that affected users

## Common Pitfalls

- **Building for months without shipping.** Version 1.0 should be embarrassingly simple. If you are not slightly embarrassed by it, you waited too long to launch. Ship early, iterate fast.
- **Building what you think users want instead of asking them.** Every assumption you make about users is probably wrong. Ask them. Watch them. The product they need is not the product you imagined.
- **Neglecting the non-code work.** A great product that no one knows about is not a product. Marketing, documentation, and user communication are at least 40% of the work.
- **Comparing to established products.** Notion had 100 engineers and $100 million in funding. You are one person. Build something small that works perfectly, not something big that works badly.
- **Giving up after a quiet launch.** Most products launch to crickets. The first 10 users are the hardest. Keep building, keep sharing, keep improving. Growth is slow until it is not.

## Going Deeper

- **Read *The Mom Test* by Rob Fitzpatrick.** The best book on talking to users and validating product ideas. Short, practical, and immediately useful.
- **Study how successful indie products launched.** Many founders write about their launch process: the early mistakes, the first users, the pivots. Find these stories on Indie Hackers, Hacker News, or personal blogs.
- **Add payment processing.** If your product provides real value, charge for it. Stripe makes this straightforward. Even $5/month from 10 users is real revenue and real validation.
- **Open-source the code.** If the product is a tool for developers, put the code on GitHub. Contributions from others can accelerate development and build your reputation.
- **Write about what you built.** A detailed blog post about your architecture decisions, your mistakes, and your learnings is itself a portfolio piece. Developers love reading about how things were built.
