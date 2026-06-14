---
title: "Security Audit Project"
pillar: "software-ai"
stage: "architect"
content-type: project
readiness-indicators:
  - "Understands how web applications work end to end — requests, sessions, databases, authentication — well enough to reason about where they fail"
  - "Can read code they did not write and trace how data flows through it"
  - "Has the discipline to follow a methodology rather than poke randomly and call it testing"
  - "Understands the difference between finding a flaw and exploiting one without permission, and takes that line seriously"
learning-objectives:
  - "Conduct a structured security assessment of a real application against a recognized methodology"
  - "Think adversarially — model how a system could be misused, not just how it is meant to be used"
  - "Operate strictly within explicit authorization and the law, treating scope as a hard boundary"
  - "Produce a professional security report that an engineering team can actually act on, with severity, evidence, and remediation"
modality: hands-on
duration: "6-10 weeks (6-10 hours per week)"
materials:
  - "A computer with a browser, browser developer tools, and a code editor"
  - "An application you are explicitly authorized to test — ideally your own deployed product, or a purpose-built vulnerable app (OWASP Juice Shop, DVWA) for the learning phase"
  - "Written authorization from the owner if the application is not yours — this is non-negotiable"
  - "A free intercepting proxy (OWASP ZAP) and a notebook or issue tracker for findings"
  - "The OWASP Top 10 and the OWASP Web Security Testing Guide as your methodology backbone"
  - "Optional: a virtual machine or isolated environment for any active testing"
safety-level: yellow
age-range: "16-18"
parent-role: mentor
---

# Security Audit Project

## Overview

Every application is a promise: that the data people entrust to it stays private, that the system does what it claims and nothing it does not, that an attacker cannot turn it against its own users. Most applications break that promise somewhere, usually without anyone noticing until it is exploited. A security audit is the disciplined practice of finding where the promise breaks *before* an adversary does — thinking like an attacker so you can defend like a professional. In this project you will conduct a real security assessment of a real application, against a recognized methodology, and produce a professional report that an engineering team could act on.

This is a project, not an exercise, because the deliverable is real and the standard is professional. You will not be graded on effort. You will be measured against the question a real security consultant is measured against: *did your report make the application meaningfully safer?* That means finding genuine vulnerabilities, proving they are real with evidence, judging how serious each one is, and explaining clearly enough that someone can fix it. A report full of theoretical worries no one can act on is a failure even if every worry is technically valid. A report that finds one real, exploitable flaw and explains exactly how to close it is a success even if it is short.

Before anything else, understand the most important rule in this entire discipline, because it is the one that separates a security professional from a criminal: **you test only what you are explicitly authorized to test, and you stay rigidly inside that scope.** The exact same action — probing an application for vulnerabilities — is a valued professional service when authorized and a serious crime when not. The skill is identical; the authorization is everything. This project exists in part to teach you that boundary so deeply that you never even approach it carelessly. Read the Safety Notes section before you do anything else, and treat it as the spine of the project rather than a disclaimer at the end.

## The Deliverable

A professional security assessment report on a single, authorized application. A complete report contains:

- **An executive summary** — what you assessed, what you found, and the bottom-line risk picture, written so a non-technical decision-maker understands the stakes in two minutes.
- **Scope and methodology** — exactly what was in and out of scope, what authorization you had, what methodology you followed, and what you did *not* test, stated honestly.
- **Findings**, each one a self-contained entry with: a clear title, a severity rating with justification, the evidence that proves it is real (steps to reproduce, screenshots, the specific request and response), the realistic impact if exploited, and a concrete remediation recommendation.
- **A remediation roadmap** — the findings prioritized, so the team knows what to fix first.

"Done" means a report a real engineering team could pick up and use to make their application safer, with findings credible enough to act on and clear enough to act on *correctly*.

## Materials & Tools

| Material | Quantity | Notes |
|----------|----------|-------|
| Authorized target application | 1 | Your own deployed product is ideal — you own it, so authorization is automatic. Otherwise, a purpose-built vulnerable app for learning, or written permission from an owner. |
| Written authorization | 1 | Required for anything you do not own. No exceptions. Defines scope, timing, and limits in writing before you touch the target. |
| Intercepting proxy (OWASP ZAP) | 1 | Free and open source. Lets you see and modify the traffic between browser and server — the central tool of web security testing. |
| Browser developer tools | — | Built into every modern browser. Your first lens on how the application actually behaves. |
| OWASP Top 10 + Web Security Testing Guide | — | Free. Your methodology. The Top 10 tells you the categories of common flaws; the Testing Guide tells you how to test for each. |
| Isolated test environment | optional | A local copy or a VM so that active testing cannot harm production data or real users. |
| Findings tracker | 1 | A notebook, spreadsheet, or issue tracker. You will accumulate findings over weeks and must keep evidence organized. |

## Project Phases

### Phase 1: Plan and Authorize (Week 1)

Begin with the boundary, not the testing. Choose your target and establish, in writing, exactly what you are authorized to do. If the target is your own deployed product, write down its scope anyway — which domains, which features, whether you will test against production or a copy — because the discipline of defining scope explicitly is part of what you are learning. If the target belongs to anyone else, you need genuine written authorization specifying what is in scope, what is out of scope, when you may test, and what you must do if you find something serious. No authorization, no testing. This is not bureaucracy; it is the line between your profession and a crime.

With scope fixed, learn the methodology. Read the OWASP Top 10 until you understand each category not as a name but as a *mechanism* — what actually goes wrong, why, and what it lets an attacker do. Then build your test plan: for each category, what will you check on this specific application, and how? A plan turns testing from random poking into systematic coverage, and it is what lets you say honestly at the end what you did and did not examine.

If you are new to this, spend part of this phase on a purpose-built vulnerable application like OWASP Juice Shop before you touch anything real. These exist precisely so you can learn to find and confirm vulnerabilities in an environment designed to contain them, where there is no scope to violate and no user to harm.

### Phase 2: Map and Test (Weeks 2-6)

**Milestone 1 — Reconnaissance and mapping.** Before hunting for flaws, understand the application as a whole. Map every page, every form, every input, every place data enters and leaves the system. Use the intercepting proxy to watch the real traffic — the requests the browser sends and the responses it gets, including the ones you never see in the interface. Catalog the attack surface: every input is a place where an attacker might inject something the system did not expect. You cannot test what you have not mapped, and the discipline of thorough mapping is what separates a real assessment from spot-checking.

**Milestone 2 — Systematic testing against the methodology.** Now work through your plan category by category, thinking adversarially at each input. The core mental shift is this: stop asking "how is this supposed to be used?" and start asking "how could this be misused?" For each common vulnerability class, test the relevant inputs:

- **Injection** — does the application safely handle input that contains code or query fragments, or can crafted input change what the database or system does?
- **Broken authentication and session management** — can you stay logged in when you should not, guess or fix session identifiers, or bypass the login?
- **Broken access control** — can you reach or modify data that belongs to another user by changing an identifier in a request? This is one of the most common and most damaging real-world flaws.
- **Sensitive data exposure** — is data that should be protected traveling or stored in the clear, leaking in error messages, or visible in places it should not be?
- **Security misconfiguration** — are there default credentials, verbose error pages, unnecessary exposed services, or missing security headers?

Test deliberately and document as you go. The cardinal discipline of active testing: **never run an exploit that could damage data, degrade the service, or affect real users.** You are confirming that a flaw exists, not weaponizing it. Confirm with the gentlest possible proof and stop.

**Milestone 3 — Confirm and gather evidence.** A suspicion is not a finding. For each potential vulnerability, confirm it is real and capture the evidence that proves it: the exact request, the response, the steps to reproduce, a screenshot. Discard the things you suspected but could not confirm, or note them explicitly as unverified. A report's credibility lives entirely in the quality of its evidence; a finding you cannot reproduce on demand is not a finding.

#### A worked finding, start to finish

To see how the abstract methodology becomes a concrete deliverable, follow one finding all the way through. Suppose during mapping you noticed that when a logged-in user views their own profile, the request to the server includes their user identifier — something like a request for `account number 1043`. That is an ordinary, necessary request. But it should make you ask the adversarial question immediately: *what stops me from asking for account number 1042?*

You test it the gentle way. You change the identifier in your own request from your account to a different one — ideally a second test account you control, never a real user's — and you watch the response. If the server returns the other account's data, you have found one of the most common and most damaging real-world vulnerabilities: broken access control, specifically what is called an insecure direct object reference. The application checked that you were logged in, but never checked that the data you asked for was *yours*. That distinction — authentication versus authorization — is where an enormous fraction of real breaches live.

Now you do the disciplined part, the part that separates an assessment from an attack. You do *not* iterate through every account number to see how much data you can pull. You have proven the flaw with a single, gentle request against an account you are authorized to use. You stop. You capture the evidence: the exact request you sent, the response you got back, a screenshot, and the precise steps to reproduce. You note that you used only test accounts and accessed no real user's data.

Then you write the finding. The title is specific: "Any logged-in user can read any other user's account by changing the account identifier in the profile request." The severity is high — the impact is exposure of every user's private data, the likelihood is high because exploitation requires only changing one number in a request any browser sends. The evidence is the reproducible steps. And the remediation is concrete and actionable, written for the engineer who has to fix it: "On the server, enforce that the requested account belongs to the authenticated user before returning data; never rely on the client to request only its own records." That single finding — confirmed gently, evidenced cleanly, rated honestly, and paired with a fix an engineer can implement this afternoon — is worth more than a page of vague warnings. It is the whole project in miniature.

### Phase 3: Assess and Prioritize

Raw findings are not yet a report. For each confirmed vulnerability, judge two things honestly: how severe is it, and how realistic is exploitation? Severity is a function of impact (what an attacker gains) and likelihood (how easily they could). A flaw that exposes every user's data with a trivial request is critical. A flaw that requires unlikely conditions and yields little is low. Resist two opposite temptations: inflating findings to seem impressive, and downplaying real risks because they are embarrassing or hard to fix. The report's value is its honesty. Rank everything so the team knows what to fix first — a prioritized list of five findings is worth more than an unranked list of twenty.

### Phase 4: Report and Deliver

Write the report for the people who must act on it. The executive summary speaks to whoever decides where engineering time goes — it must convey the risk picture without jargon. Each finding speaks to the engineer who must fix it — it must be specific, evidenced, and paired with a concrete, actionable remediation, not a vague "improve security." The remediation roadmap speaks to whoever sequences the work.

Then deliver it the way a professional would: present the findings to the owner or team, walk them through the most serious ones, and answer their questions. If this is your own product, fix the findings and write up what you changed. If it is someone else's, you have just performed a genuine service — you found their promise breaking before an attacker did, and gave them what they need to mend it.

## Success Criteria

- [ ] You operated entirely within explicit, written authorization and stayed inside the defined scope at every moment.
- [ ] You followed a recognized methodology and can state honestly what you tested and what you did not.
- [ ] Every finding in the report is confirmed, reproducible, and supported by concrete evidence.
- [ ] Each finding has a justified severity rating and a specific, actionable remediation an engineer could implement.
- [ ] The report is clear enough that both a decision-maker and an engineer could act on it correctly without you in the room.
- [ ] You did no harm — no data was damaged, no service degraded, no real user affected by your testing.

## Common Pitfalls

- **Treating scope as a suggestion.** The single most serious failure. "I'll just check that one extra thing" is how a learning exercise becomes a crime and a career ends before it starts. Scope is a hard wall. If you find a reason to test something outside it, the answer is not to test it — it is to go back and get explicit authorization, in writing, first.
- **Confusing finding with exploiting.** You confirm a vulnerability exists with the lightest possible touch and stop. You never dump the database, deface the page, or pivot deeper "to see how far it goes." That is the line between an assessment and an attack, and you must never cross it even on a system you own if real users depend on it.
- **Random poking instead of systematic coverage.** Without a methodology you will check the things that occur to you, miss whole categories, and have no honest way to say what you covered. Work the plan. Coverage is what makes an assessment trustworthy.
- **Unreproducible or inflated findings.** A finding you cannot reproduce on demand will not survive contact with a skeptical engineer, and it will burn your credibility for the real findings. Confirm everything, evidence everything, and rate honestly. One credible critical finding is worth more than ten dramatic guesses.
- **A report no one can act on.** "The application has security issues" helps no one. "User A can read User B's private messages by changing the `id` parameter in this request; fix by enforcing an ownership check server-side" is a finding a team can close this afternoon. The remediation is as important as the finding.

## Extensions

- After the team remediates, perform a focused re-test to verify each fix actually closes the hole — fixes sometimes do not, or open new ones. A verified-remediation report is the full professional cycle.
- Expand beyond the OWASP web categories into a threat-modeling exercise: map the application's most valuable assets and reason systematically about every way an adversary might reach them, including non-technical paths like social engineering and misconfigured cloud storage.
- Write up your methodology and findings (with the owner's permission, and any sensitive details redacted) as a public technical post. Explaining a vulnerability clearly to a general audience is its own skill, and a strong portfolio piece for anyone pursuing security professionally.
- If you find a vulnerability in widely-used open-source software during your learning phase, research and follow *responsible disclosure* — privately reporting it to the maintainers and giving them time to fix it before any public mention. Learning to disclose well is a core professional ethic of the field.

## Safety Notes

Security testing carries real legal, ethical, and operational risk. These rules are not optional, and they are the most important content in this project.

**Authorization is absolute.** You may test only systems you own or have explicit, written permission to test, and only within the scope that permission defines. Probing a system you are not authorized to probe is a crime in most jurisdictions — under laws like the U.S. Computer Fraud and Abuse Act — regardless of your intent, regardless of whether you cause harm, and regardless of your age. "I was just curious" and "I wanted to help" are not defenses. Before you touch any target, you must be able to point to your authorization for it. If you cannot, you stop. A mentor should review your authorization and scope before any active testing begins.

**Never harm a live system or real users.** Active testing can crash services, corrupt data, or expose the information of real people. Prefer an isolated copy or a purpose-built vulnerable application for learning. When testing a live system you are authorized to test, use only the gentlest confirmation of a flaw — never an exploit that could damage data, degrade availability, or affect a real user. If you are unsure whether a test could cause harm, do not run it; ask first.

**Confirm, do not weaponize.** The line between a security assessment and an attack is whether you stop at proving the flaw exists. Once confirmed, you document and move on. You never exfiltrate data, escalate access, or "see how far it goes." Crossing that line is both unethical and, very likely, criminal.

**Handle what you find responsibly.** If you discover a serious vulnerability — especially in software others depend on — keep it confidential and report it privately to the people who can fix it, following responsible disclosure. Never post a live vulnerability publicly, sell it, or use it. A discovered flaw is a responsibility, not a trophy.

**When in doubt, involve a knowledgeable adult.** This is a domain where a single careless action can have legal consequences. A mentor with security or legal knowledge should be available throughout, should review your scope and authorization before you begin, and should be the person you go to the moment you are unsure whether something is permitted.
