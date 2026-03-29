---
title: "Ship a Product"
pillar: "software-ai"
stage: "architect"
content-type: project
readiness-indicators:
  - "Has built and deployed at least one web application with real users"
  - "Understands full-stack development: frontend, backend, database, and deployment"
  - "Can debug complex, multi-component systems independently"
  - "Has received feedback from real users and implemented changes based on it"
  - "Can manage a multi-month project with self-imposed deadlines"
learning-objectives:
  - "Ship a software product from idea through public launch"
  - "Build for users who are not yourself — understand their needs, design for their workflows"
  - "Implement production-grade practices: error handling, monitoring, backups, and security"
  - "Market and distribute a product — getting users is harder than building the product"
  - "Iterate based on usage data and feedback, not assumptions"
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

This is the most demanding project in the software pillar. It requires technical skill, product thinking, marketing instinct, and sustained discipline. You will spend as many hours on non-coding work (research, design, marketing, support, documentation) as on coding. That ratio is what separates a developer from a product builder.

## Phase 1: Find the Problem (Weeks 1-3)

### The Problem-First Approach

Do not start with a technology. Do not start with a feature idea. Start with a problem.

Talk to people. Not your friends — people who work, who run households, who manage teams, who create content, who organize communities. Ask them: "What is the most annoying repetitive task in your day?" "What tool do you wish existed?" "What do you currently use that frustrates you?"

Write down every problem you hear. After 10-15 conversations, patterns will emerge. Three people complaining about the same thing is a signal.

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

You have 8 weeks to build version 1.0. That is not much time. Protect it ruthlessly.

**Rules:**
1. **Build the core workflow first.** The 3-5 steps from your product definition. Nothing else until those work perfectly.
2. **Deploy after every meaningful change.** Continuous deployment keeps you honest — if it works on your machine but not in production, you find out immediately.
3. **Commit every day you work.** Small, frequent commits with descriptive messages. This is your safety net and your progress record.
4. **Do not add features that are not in the product definition.** If you think of a great new feature, write it in the notebook under "Version 2.0" and keep building version 1.0.
5. **Spend time on what users see.** Error messages, loading states, empty states, responsive design. These details separate a product from a prototype.

### Production Practices

Your product must work reliably for people who did not build it. This requires:

**Error handling:** Every API call can fail. Every form can have bad input. Every database query can time out. Handle all of these gracefully. Show the user a clear message. Never show a stack trace.

**Data safety:** Back up the database. If you are using a hosted database, enable automatic backups. If you are managing your own, set up a daily backup script. A product that loses user data is worse than no product at all.

**Security basics:**
- Never store passwords in plain text (use bcrypt or similar hashing)
- Validate and sanitize all user input (prevent SQL injection and XSS)
- Use HTTPS (most hosting platforms provide this automatically)
- Do not expose API keys or secrets in frontend code
- Rate-limit sensitive endpoints (login, registration)

**Monitoring:** You need to know when something breaks before your users tell you. Set up error tracking (Sentry has a free tier) and basic uptime monitoring (UptimeRobot, free).

### Dogfooding

Use your own product daily. This is called dogfooding — eating your own dog food. Every friction point you experience is something your users will experience. Fix the things that annoy you. If you would not use your own product, no one else will either.

## Phase 4: Launch (Weeks 15-16)

### Pre-Launch Checklist

Before telling anyone about your product, verify:

- [ ] The core workflow works completely — start to finish, no errors
- [ ] The product works on Chrome, Firefox, and Safari
- [ ] The product works on mobile devices
- [ ] Error handling covers the common failure cases
- [ ] A new user can sign up and accomplish the core task without instructions
- [ ] The landing page clearly explains what the product does and who it is for
- [ ] There is a way for users to contact you (email, feedback form)
- [ ] Database backups are running
- [ ] Error monitoring is active

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

### Retention Over Acquisition

It is more valuable to make 10 users love your product than to get 100 users who try it once and leave. Focus on retention: why do users come back? Why do they leave? What would make them recommend it to someone else?

Send a personal email to every user who signs up in the first month. Ask: "Thanks for trying [product]. What brought you here? Is it solving the problem you expected?" The responses will teach you more than any analytics dashboard.

## Success Criteria

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
