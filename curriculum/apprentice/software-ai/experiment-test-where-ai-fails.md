---
title: "Test Where the AI Fails"
pillar: "software-ai"
stage: "apprentice"
content-type: experiment
readiness-indicators:
  - "Has used an AI chatbot for at least a few real tasks — homework help, coding, writing, or research"
  - "Can tell the difference between a fact, an opinion, and a guess"
  - "Knows how to verify a claim against a primary source — a textbook, a calculator, a dictionary, an official site"
  - "Can keep careful written records and resist the urge to round results in their own favor"
learning-objectives:
  - "Design a controlled test that maps where an AI assistant is reliable and where it is not"
  - "Recognize and document hallucination — confident, fluent, completely false output"
  - "Distinguish the kinds of tasks AI does well from the kinds where it must be verified"
  - "Build a personal, evidence-based rule for when to trust AI and when to check it yourself"
modality: hands-on
duration: "One week — about 4-5 hours total across several sessions"
materials:
  - "Access to at least one AI chatbot (a free tier is fine)"
  - "A reliable way to check answers — a calculator, a textbook, a map, official reference sites"
  - "A spreadsheet or notebook to record every prompt, response, and verification"
  - "Optional: access to a second AI tool, to compare two systems on the same questions"
safety-level: green
age-range: "13-15"
parent-role: observe
---

# Test Where the AI Fails

## Overview

You have almost certainly used an AI chatbot, and you have almost certainly noticed that it sounds confident no matter what. It sounds equally sure whether it is right or completely making something up. This experiment turns that observation into a method. You are going to deliberately probe an AI to find its edges — the places where its fluent, confident answers quietly become wrong — and you are going to document exactly where those edges are.

This matters because the most dangerous thing about AI is not that it makes mistakes. Everything makes mistakes. The dangerous thing is that it makes mistakes in the exact same confident voice it uses when it is right. There is no tone of uncertainty, no "I'm not sure about this one." By the end of this week you will have your own map of when to trust the machine and when to check it — built from your own data, not from someone telling you "be careful with AI."

## The Question

**Where, specifically, does an AI assistant stop being reliable — and can you tell from the answer alone whether you have crossed that line?**

You are not asking "is AI good or bad." That question has no answer. You are asking the sharp, testable version: on which kinds of tasks does it give correct answers, on which kinds does it give wrong ones, and is there any signal in the output that tells the difference? Spoiler from the people who build these systems: the second question is the unsettling one.

## Background

Modern AI chatbots are **large language models**. Here is the one thing you need to understand to design a good test: they are not databases and they are not search engines. They do not "look up" the answer to your question. They generate text by predicting, one piece at a time, what word is most likely to come next given everything before it. They are extraordinarily good at producing text that *sounds* like a correct answer.

Most of the time, sounding correct and being correct line up — because in the vast amount of text these systems learned from, true statements are common. But the two can come apart. When a model produces fluent, confident text that is factually false, that is called a **hallucination**. It is not lying, because lying requires knowing the truth and choosing to hide it. The model has no concept of truth at all. It is doing exactly what it was built to do — predict plausible text — and plausible is not the same as true.

This predicts where you will find the failures, which is what makes a good experiment. You should expect more failures where text *about* a topic is rare, contested, or easy to confuse: obscure facts, very recent events, precise arithmetic, specific page numbers and citations, and anything where a plausible-sounding wrong answer is easy to generate. You should expect fewer failures on common, well-documented topics and on tasks of language rather than fact — summarizing, rephrasing, brainstorming.

## Hypothesis

> Before you begin, write down what you think will happen and why:
>
> "I think the AI will be reliable for _______ and unreliable for _______, because _______. And I think I will / will not be able to tell from the answer alone when it is wrong, because _______."

Be specific. "It'll be wrong sometimes" is not a hypothesis. "It will be accurate on basic arithmetic but will invent fake book citations, and I will not be able to tell the fakes apart from the real ones" is a hypothesis. You will check your real results against this prediction at the end, so commit to it now and do not edit it later.

## Materials

- An AI chatbot you can use freely
- A trustworthy reference for each category you test — a calculator for math, a real textbook for facts you can verify, a map for geography, official sites for current events
- A spreadsheet (best) or notebook with columns: **category, exact prompt, AI's answer, verified truth, verdict (correct / wrong / partly), did the answer sound confident? (yes/no)**
- Optional second AI tool for comparison

## Procedure

### Setup

1. Build your recording sheet first, with the columns above. You will run dozens of prompts; without a sheet you will lose track and your conclusions will be vague guesses instead of evidence.
2. Choose six **categories** to test, mixing kinds where you expect success with kinds where you expect failure. A strong set:
   - **Basic arithmetic and simple math** (e.g., multiply two four-digit numbers; compute a percentage)
   - **Well-known facts** (capital cities, famous dates, basic science)
   - **Obscure or specific facts** (the population of a small town, a minor historical figure, a precise statistic)
   - **Citations and sources** (ask it to name three books or studies on a topic, with authors and years)
   - **Very recent events** (something from the last few weeks)
   - **Language tasks** (summarize a paragraph you provide; rewrite a sentence in a different tone)
3. Decide on a fixed number of prompts per category — five is a good number. Thirty prompts total is enough to see real patterns. Plan them in advance so you are not unconsciously steering toward results that fit your hypothesis.

A word on why planning the prompts ahead of time matters so much. Scientists call the problem you are avoiding *confirmation bias*: the human tendency to notice and remember evidence that fits what we already believe, and to wave away evidence that does not. If you write your prompts as you go, you will — without meaning to — drift toward questions that produce the result you expect. If you secretly believe the AI is brilliant, you will keep feeding it softballs. If you secretly want to catch it failing, you will hunt for trick questions. Either way your "experiment" becomes a performance that proves what you already thought. Locking your thirty prompts in advance, before you have run a single one, is the same discipline a real researcher uses when they register their methods before collecting data. It is not bureaucracy. It is the thing that makes your conclusion trustworthy — including trustworthy to *you*, six months from now, when you have forgotten the details and only have the data.

### Experiment

1. Run each prompt exactly as written. Paste the AI's full answer into your sheet. Do **not** verify yet — record first. Verifying as you go tempts you to stop early or to phrase the next prompt to confirm what you are already seeing.
2. For the **citations** category, this is the key move: after you record the answer, search for each book, study, or source the AI named. Does it actually exist? Are the author and year right? You are very likely to find fabricated sources presented with total confidence — a fake title, real-sounding author, plausible year, all invented. This is hallucination in its purest, most visible form.
3. For each answer, before you check it, note in the "sounded confident?" column whether the answer *read* as sure of itself. The goal is to test whether confidence is any signal of correctness. (You will find it is not — the wrong answers sound exactly as sure as the right ones.)
4. Now verify every answer against your trustworthy reference and fill in the "verified truth" and "verdict" columns. Be ruthlessly honest. "Close" on a factual question is wrong. An invented citation is wrong even if the topic is real.

### Record

Track every prompt in the sheet. After all prompts are run and verified, total up the verdicts by category.

| Variable | Observation |
|----------|-------------|
| Category tested | (the kind of task) |
| Number of prompts | (e.g., 5) |
| Correct | (count) |
| Wrong | (count) |
| Partly correct | (count) |
| Did wrong answers sound less confident? | (almost always: no) |

## Analysis

Work through these with your filled-in sheet in front of you:

- **What happened?** Rank your six categories from most reliable to least. Where was the AI nearly perfect? Where did it fall apart?
- **Did it match your hypothesis?** Compare your category-by-category results to the prediction you wrote and did not edit. Where were you right? Where did the machine surprise you?
- **The confidence question.** Look down your "sounded confident?" column next to your "verdict" column. How often did a wrong answer sound just as confident as a right one? This is the single most important finding of the experiment. Write down the exact ratio.
- **The citations finding.** What fraction of the sources it gave you were real? This is usually the most alarming result, and the most useful — because fabricated citations look completely legitimate until you actually go looking for them.
- **What would you change if you did it again?** Were your categories well chosen? Did any prompt accidentally test two things at once?
- **What is your false-confidence rate?** Combine the two columns into one number: of all the answers that were *wrong*, what percentage *sounded* confident? Then do the reverse: of all the answers that *sounded* confident, what percentage were actually right? Hold those two numbers next to each other. They tell you, in your own data, exactly how much the AI's tone is worth as a signal — which is to say, almost nothing.

## The Explanation

Now connect your results back to how these systems work. You almost certainly found the same pattern the researchers who build these systems find:

- **The AI did well on language tasks** — summarizing, rephrasing, brainstorming. These play directly to its strength. It is a text-prediction engine, and these are pure text-shaping tasks with no single "true" answer to get wrong.
- **It did well on common, well-documented facts** but degraded on obscure ones. The more text existed about a topic, the more reliably it produced true statements — because true statements were the common pattern it learned. On rare topics, plausible-but-wrong text was just as easy to generate as the truth.
- **It probably failed badly on precise citations and specific statistics**, often inventing them wholesale. A citation is a perfect hallucination trap: the model knows what a citation *looks like* — author, title, year, journal — and can generate a flawless-looking one without any of it being real.
- **Confidence was not a signal.** This is the lesson. The wrong answers sounded exactly as sure as the right ones, because the model has no internal sense of which it is. It cannot warn you, because it does not know.

So the takeaway is not "AI is bad." Your language-task results probably showed it is genuinely, usefully good. The takeaway is the rule you can now write from your own evidence: **use AI freely where being wrong is cheap or where there is no single right answer, and verify it ruthlessly where being wrong is expensive and there is a single right answer — especially facts, numbers, and sources.** You did not get that rule from a warning label. You proved it.

### A Worked Example

To make the method concrete, here is one row from the citations category, the way your sheet should read it.

You prompt: *"Name three peer-reviewed studies on the effects of sleep on teenage memory, with authors and years."* The AI returns, instantly and fluently, three entries — each with a real-sounding author surname, a plausible journal, and a recent year. It reads exactly like the bibliography at the back of a textbook. You record it without judging it.

Then you verify. You search for the first title in a library database and a search engine. Nothing. You search the author's name plus the topic. The author may be a real researcher in a completely different field, or may not exist at all. You repeat for the second and third. Perhaps one of the three turns out to be loosely based on a real paper with the title slightly mangled and the year wrong; the other two are pure invention. Your verdict column reads: wrong, wrong, partly. Your confidence column, for all three: yes — every one was delivered with total assurance.

That single row teaches more than a lecture could. The machine did not say "I'm not certain these exist." It could not, because it does not know whether they exist. It generated three things shaped like citations, because you asked for things shaped like citations, and shape is all it traffics in. Now imagine you had pasted those three "sources" into a school essay without checking. You would have cited work that does not exist — and stood behind it. This is precisely the failure that has gotten real adults, including lawyers and journalists, into serious public trouble. You are learning the lesson the cheap way: on a worksheet, not in front of a judge.

## Extensions

- **Change one variable:** Run the same thirty prompts through a *second* AI tool and compare. Do the two systems fail on the same questions, or different ones? When they disagree, which is right? When they agree, are they ever confidently wrong together?
- **Real-world connection:** Take a real assignment you would actually use AI for — a research summary, a coding problem, a study guide — and apply your new rule. Use the AI for the parts your experiment showed it handles well, verify the parts it handles badly, and notice how much more you now trust your own judgment over its tone.
- **Further reading:** Look up "AI hallucination" and "large language model" from a reputable technology or science source. You will recognize, from your own data, exactly what they are describing — which is the best way to understand any concept.

## Safety Notes

### Information Hazards

The central risk of this experiment is the thing you are studying: acting on a confident wrong answer. Never use an AI's output for anything that matters — medical questions, legal questions, safety instructions, financial decisions — without verifying it against a real, authoritative source or a qualified human. This experiment exists to make that habit instinctive.

### Privacy

Do not paste private information into an AI chatbot for this experiment or any other — no full names of real people, home addresses, passwords, account numbers, or anything you would not post publicly. Many AI services store and review conversations. Keep every test prompt impersonal.

### Honest Recording

The integrity of this experiment depends entirely on honest verification. The temptation is to mark a wrong answer "close enough" to make the AI look better, or to give it credit you would not give a textbook. Hold the AI to the same standard you would hold any other source: a fact is either right or it is not, and an invented citation is wrong no matter how real it sounds.
