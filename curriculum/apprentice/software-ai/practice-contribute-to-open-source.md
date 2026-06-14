---
title: "Contribute to Open Source"
pillar: "software-ai"
stage: "apprentice"
content-type: practice
readiness-indicators:
  - "Has written and finished at least one project in a real programming language, not just tutorials"
  - "Is comfortable with Git basics — clone, branch, commit, push — and has used GitHub"
  - "Can read code written by someone else and follow what it does without running it"
  - "Can ask a clear, specific question instead of 'it doesn't work'"
learning-objectives:
  - "Navigate an unfamiliar codebase well enough to make a targeted, correct change"
  - "Run the full contribution loop: fork, branch, change, test, pull request, review, merge"
  - "Communicate with maintainers like a professional — concise, respectful, and useful"
  - "Build a public track record of accepted contributions across multiple projects"
modality: hands-on
duration: "Ongoing — one contribution every 2-3 weeks for at least three months"
materials:
  - "A computer with Git and a code editor installed"
  - "A GitHub account with a real name or a handle you are willing to keep"
  - "The languages and tools the projects you target are built in (varies by project)"
  - "A running log — a text file or notebook — of every contribution attempt"
safety-level: green
age-range: "13-15"
parent-role: observe
---

# Contribute to Open Source

## Overview

Almost every piece of software you use is built on open source — code that strangers wrote, gave away, and let anyone improve. The browser you are reading this in, the language your programs run in, the tools that build the apps on your phone: open source, all the way down. This practice is about joining that. Not someday, when you are "ready." Now, in small, real ways, repeatedly, until contributing to other people's code is something you simply know how to do.

This is a practice, not a one-time project, because the skill you are building is not "make one pull request." It is the rhythm of finding a problem in code you did not write, fixing it without breaking anything else, and convincing a busy maintainer to accept your work. That rhythm only comes from repetition. Your first contribution will be slow and probably a little embarrassing. Your tenth will feel normal. That is the whole point.

## The Skill

You are practicing four things at once, and you will get better at each one with every contribution:

1. **Reading code you did not write.** Most of programming is reading, not writing. A real codebase is a city built by hundreds of people over years, with no single person who knows all of it. You will learn to find your way to the one street you need without a map of the whole place.

2. **Making a surgical change.** A good contribution does one thing. It does not also reformat the file, rename three variables you happened to dislike, and "clean up" code you do not understand. The discipline of touching only what you must is the difference between a contribution that gets merged and one that gets closed.

3. **Communicating across a screen with strangers.** The maintainer reviewing your pull request does not know you, owes you nothing, and is probably doing this in their spare time. You will learn to write descriptions, respond to feedback, and disagree productively — all in text, all in public, all on the record.

4. **Handling rejection without taking it personally.** Some of your contributions will be closed. "Thanks, but we are going a different direction." "This doesn't fit the project's goals." That is not failure. That is information. You learn the norms of a project by bumping into them.

## Frequency & Duration

- **How often:** Aim for one contribution every two to three weeks. Some weeks you will scout for issues. Some weeks you will fight a single bug. That is fine — the cadence matters more than the speed.
- **How long per session:** Block at least 90 minutes. Contributing in 15-minute scraps does not work — you lose your mental map of the codebase every time you stop, and rebuilding it eats your whole next session.
- **Minimum commitment:** Three months, with at least five real pull requests opened. Not five merged — five opened. Some will be rejected, and learning why is part of the deal.

## The Routine

Treat every contribution as a loop with the same three movements. Over time the loop becomes automatic.

### Warm-Up (15-20 minutes): Scout and Choose

Before you touch any code, you find something worth doing. Good first contributions share a profile:

- **A project you actually use or genuinely care about.** You will be reading a lot of its code. Pick something you have a reason to understand.
- **An active project.** Look at the commit history. If the last commit was eight months ago, the maintainer may never review your work. You want a project where pull requests get merged regularly.
- **A friendly project.** Read the `CONTRIBUTING.md` file. Look for a `good first issue` or `help wanted` label on the issue tracker — these are problems maintainers have deliberately set aside for newcomers. Read a few recent merged pull requests to see how the maintainers treat contributors. If they are sarcastic or dismissive, find a different project. Your time is worth a welcoming community.

Start absurdly small. A typo in the documentation. A broken link. A confusing error message. An example in the docs that no longer runs. These feel beneath you. They are not. They teach you the entire contribution loop — fork, branch, change, pull request, review, merge — with almost zero risk of breaking anything. Get that loop under your fingers before you attempt a logic bug.

### Core Practice (60-90 minutes): The Contribution Loop

This is the same loop every time, regardless of project. Learn it cold.

1. **Read the issue completely.** If you are inventing your own fix, open an issue first and ask the maintainers whether they would accept a fix before you write it. Nothing is more deflating than spending a weekend on code that gets closed with "we don't want this."

2. **Reproduce the problem.** Before you fix a bug, see it with your own eyes. Get the project running locally. Trigger the bug. If you cannot reproduce it, you cannot be sure your fix works — and you might "fix" something that was never broken.

3. **Find the relevant code.** This is the hard part and the part you are really practicing. Use search. Search the codebase for the error message, the function name, the label on the button. Follow the thread from where the problem appears to where it originates. Most bugs are not where they look like they are.

4. **Make the smallest change that fixes it.** Touch one thing. Resist every urge to also clean up the surrounding code. If you spot something else worth fixing, write it down and do it in a separate contribution later.

5. **Run the tests.** Almost every serious project has an automated test suite. Run it before your change to confirm it passes, then after to confirm you did not break anything. If the project has tests for the area you touched, add a test that would have caught the bug. Maintainers love this — a fix with a test is far more likely to be merged than a fix without one.

6. **Write a clean pull request.** The title says what it does in one line. The description says what the problem was, how you fixed it, and how you verified the fix. If there is an issue number, reference it. Be brief. The maintainer is busy.

7. **Respond to review like a professional.** They will ask for changes. "Can you rename this?" "Did you consider this edge case?" "Our style is to do it this way." Make the changes promptly, thank them for the review, and do not argue about taste. If you genuinely disagree on something substantive, say so once, clearly, with your reasoning — then defer to the maintainer. It is their project.

### A Walkthrough: Your First Real Contribution

Here is what the loop actually feels like the first time you do something beyond a typo, so the steps above are not just abstract.

You use a small command-line tool — say, one that renames files in bulk. You notice that when you give it a filename with a space in it, it crashes with an ugly error instead of handling it. That is your bug. You check the project's issue tracker; nobody has reported it. You open an issue describing exactly how to reproduce it: "Running the tool on a file named `my report.txt` produces this error," and you paste the error. A maintainer replies: "Good catch, a fix would be welcome."

Now you fork the project and clone your fork. You get it running locally and confirm the crash with your own eyes — `my report.txt`, same error. You search the codebase for a distinctive piece of the error message. It leads you to a function that splits filenames. You read it, slowly, and see the problem: it splits on spaces, so a filename with a space gets torn in two. You did not need to understand the other ninety files in the project. You needed to understand this one function, and you found it by following the error.

You make the smallest change that fixes it — a few characters so the split handles the space correctly. You run the project's test suite: still passing, you broke nothing. You add one new test with a spaced filename, confirm it fails on the old code and passes on yours, and you commit. You push to your fork and open a pull request: a one-line title, a short description of the bug and the fix, and "fixes issue #47." A day later the maintainer comments: "Nice, can you also handle tabs while you're here?" You make the small addition, push again, thank them. They merge it.

That is the entire loop, and you just ran every step of it on real software that real people use. Your next bug will feel half as hard. That is not because the bugs get easier. It is because *you* changed.

### Cool-Down (10 minutes): Log It

After every contribution, win or lose, write a single entry in your log:

- Project name and link to the pull request
- What you tried to do
- Outcome: merged, changes requested, rejected, abandoned
- One thing you learned — about the code, the tools, the people, or yourself

This log is your evidence. In three months it is a record of real, public, accepted work that almost no other person your age can show. That matters more than you think.

## How to Write a Pull Request a Maintainer Will Love

The code is only half of a contribution. The other half is the pull request description, and a surprising number of otherwise-fine contributions get ignored because the description made the maintainer's job harder instead of easier. Remember the maintainer's situation: they are busy, they did not ask you to do this, and they are looking at your change with zero context about what you were thinking. Your description's only job is to give them that context fast, so they can say yes.

A strong description has three short parts. First, **the problem**: one or two sentences on what was wrong, ideally linking the issue number so they do not have to go hunting ("Fixes #47 — the tool crashes on filenames containing spaces"). Second, **the change**: what you did, in plain language, not a line-by-line narration of the code — they can read the code; what they cannot read is your reasoning ("Updated the filename parser to handle spaces and tabs"). Third, **the verification**: how you know it works ("Added a test with a spaced filename; ran the full suite and everything passes"). That is the whole thing. Three or four sentences. Resist the urge to write an essay, and equally resist the temptation to write nothing and assume the code speaks for itself — it does not, because the maintainer cannot see inside your head.

Two small habits separate amateurs from people maintainers want back. Keep the pull request to one logical change; if you fixed a bug and also reformatted a file, split them, because a reviewer can approve a clean small change in thirty seconds but has to scrutinize a sprawling one. And after you open it, watch the project's automated checks run — most serious projects run tests and style checks automatically on every pull request. If a check goes red, fix it yourself before the maintainer even looks. Showing up with green checks and a clear description tells them, without saying a word, that you respect their time. That reputation compounds: the contributor who is easy to review is the contributor who gets reviewed first.

## Progression

| Level | Criteria | Adjustment |
|-------|----------|------------|
| Beginner | First 1-2 contributions are documentation fixes, typos, or broken links | Focus entirely on getting the fork-branch-PR-merge loop smooth. Do not touch logic yet. |
| Intermediate | Fixing small, well-defined bugs with a clear reproduction; adding a test alongside the fix | Start picking issues without step-by-step instructions. Learn to read a stack trace and trace it to the source. |
| Advanced | Implementing a small feature from a `help wanted` issue; reviewing other people's pull requests; becoming a recognized name in one project | Pick one project to go deep on. Read its full architecture docs. Offer to triage issues. Maintainers remember reliable contributors. |

## Tracking Progress

Keep two numbers in your log and watch them over the three months:

- **Contributions opened** versus **contributions merged.** Early on, your merge rate will be low and that is normal. By month three it should climb as you internalize each project's norms.
- **Time from "start reading code" to "found the right place to change."** This is the truest measure of your growth. The first time it might take you two hours to locate the right function. By your tenth contribution it might take ten minutes. That shrinking number is the skill becoming real.

Also save links to every merged pull request. This is a public portfolio. A merged contribution to a project that real people use is worth more than any certificate, and anyone — a future employer, a mentor, a program you want to join — can click the link and see the actual code you wrote.

## Common Plateaus

- **Plateau:** You can fix typos and docs all day, but every time you open a real source file your eyes glaze over and you do not know where to start.
  **Solution:** Stop trying to understand the whole file. Pick one specific thing — the function named in the stack trace, the handler for the button that breaks — and trace only that. Use your editor's "go to definition" and "find all references." You do not need to understand the city to walk one street.

- **Plateau:** Your pull requests sit untouched for weeks and you do not know whether to wait or give up.
  **Solution:** After about a week of silence, post one polite comment: "Hi, is there anything I can do to move this forward?" If still nothing after two more weeks, the project may simply be inactive — note it in your log and move on. You picked an inactive project; next time check the commit history first.

- **Plateau:** A maintainer's blunt feedback stings and you want to quit.
  **Solution:** Reread their words assuming zero emotion behind them. "This needs a test" is not an attack; it is a fact. Maintainers communicate in compressed, direct text because they are busy, not because they think less of you. Separate the technical content from the imagined tone.

## Motivation Tips

- **Contribute to something you use.** When the project is a game you play, a tool you rely on, or a library that powers your own app, fixing it feels like fixing your own house. The motivation is built in.
- **Find one welcoming project and stay.** It is far more rewarding to become a known, trusted contributor to one community than a stranger who drops a single pull request into ten projects. Maintainers who recognize your name review your work faster and mentor you more.
- **Reread your log when you feel stuck.** Three months in, that list of merged contributions is proof. You are not "learning to code" in the abstract. You have changed software that strangers around the world now run. Few people your age can say that — and you can show the receipts.

## Safety Notes

This work is low physical risk, but two real-world cautions apply. First, everything you do here is **public and permanent** — your username, your code, your comments, and any mistakes are on the internet under your name, likely forever. Communicate the way you would want a future employer or mentor to read it, because one day one of them will. Second, before installing and running any open-source project locally, glance at what it does and roughly how many people use it. Established, widely-used projects are safe; running code from an unknown, unstarred repository on your main machine is a small but real risk. When in doubt, run unfamiliar projects in a sandbox or a throwaway environment, and never paste passwords, tokens, or API keys into a public pull request or issue.
