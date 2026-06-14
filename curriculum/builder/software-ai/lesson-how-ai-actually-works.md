---
title: "How AI Actually Works (and Where It Fails)"
pillar: "software-ai"
stage: "builder"
content-type: lesson
readiness-indicators:
  - "Has used a chatbot, image generator, or recommendation system and is curious how it works"
  - "Can hold a multi-step explanation in their head and ask follow-up questions"
  - "Understands the difference between a fact and a guess"
  - "Can follow written instructions and run a simple program or use a web tool"
learning-objectives:
  - "Explain in plain language that modern AI is pattern-matching trained on huge amounts of data, not a thinking mind"
  - "Describe what training data is and how it shapes — and limits — what an AI can do"
  - "Identify at least three specific situations where an AI will confidently give a wrong answer"
  - "State the rule for using AI responsibly: verify before you trust"
modality: mixed
duration: "2 sessions, 60 minutes each"
materials:
  - "A computer with internet access"
  - "Access to a free AI chatbot (an adult sets this up — many require an account and have age rules)"
  - "A notebook and pencil"
  - "A deck of regular playing cards (for the prediction game in Session 1)"
safety-level: green
age-range: "9-12"
parent-role: facilitate
---

# How AI Actually Works (and Where It Fails)

## Overview

You have probably talked to an AI. You have asked it questions, maybe had it write a story or make a picture. It can feel like magic — like there is a clever little person inside the computer who knows everything. There is not. This lesson pulls back the curtain so you can see exactly what is happening, why it works as well as it does, and — most importantly — why you can never fully trust what it tells you.

Understanding this is one of the most important skills of your whole life. The people who use AI well are not the ones who believe it. They are the ones who know precisely when to doubt it.

## Background for Parents

The goal here is not to teach the math behind neural networks. It is to build an accurate *mental model*: modern AI (the large language models behind chatbots) is a sophisticated pattern-prediction system trained on enormous text datasets. It predicts the most likely next word, over and over. It has no understanding, no memory of truth, and no way to know when it is wrong.

The key vocabulary your child will learn: **training data**, **pattern matching**, **prediction**, and **hallucination** (when an AI states something false with total confidence). The single behavioral takeaway is the verification rule: *AI output is a starting point to check, never an answer to trust.*

The most common misconception to correct is that the AI "looks things up" or "knows" facts the way a person consults a memory. It does neither. It generates plausible-sounding text based on patterns. Sometimes that text is true. Sometimes it is confidently false. Your child needs to feel the difference between those two in their gut, which is why this lesson is built around demonstrations, not lectures.

## Lesson Flow

### Session 1: What AI Is

#### Opening: The Prediction Game (10 minutes)

Get out a deck of cards. Tell your apprentice you are going to flip cards one at a time, and before each flip, they should guess whether the next card is higher or lower than the one showing. Play ten rounds. Keep score.

Now ask: *How did you make your guesses?* They will say something like "the last card was low, so the next is probably higher" or "lots of high cards came up, so a low one is due." They were finding patterns and predicting. They were not *knowing* the next card — they were guessing the most likely one based on what they had seen.

Then say the sentence that this whole lesson hangs on: **That is exactly what an AI does, except instead of cards, it predicts the next word, and instead of ten rounds of practice, it has read more text than any human could read in a thousand lifetimes.**

#### Core Instruction: The Three Big Ideas (35 minutes)

Write each idea in your notebook as you go.

1. **AI learns from training data.** Before an AI can do anything, it is *trained*. Engineers feed it a staggering amount of text — books, websites, articles, conversations. The AI reads all of it and learns the patterns in how words go together. If the training data has lots of recipes, the AI gets good at recipes. If the training data has very little about your specific small town, the AI will be vague or wrong about it. The AI is a mirror of what it was trained on. It cannot know anything that was not in its data, and it cannot know what happened after its training ended.

   Try this in your notebook. Finish these sentences with the first word that fits:
   - "The cat sat on the ___"
   - "Once upon a ___"
   - "Twinkle twinkle little ___"

   You probably wrote *mat*, *time*, and *star*. You did not "know" those answers were coming — you have just seen those patterns so many times that the next word feels obvious. That feeling, scaled up to billions of patterns, is how an AI predicts.

2. **AI predicts the most likely next word — one at a time.** When you ask a chatbot a question, it does not look up an answer. It starts generating a response one word at a time, each time picking a word that fits the pattern of everything before it. It is an extremely well-read autocomplete. This is why its writing flows so smoothly: smoothness is exactly what it was trained to produce. But smooth and true are not the same thing. A confident, well-written sentence can be completely false.

3. **AI does not understand — and does not know when it is wrong.** This is the most important idea of all. The AI has no sense of truth. It cannot check the world. It cannot feel uncertain. When it does not have a good pattern to draw from, it does not say "I don't know." It generates plausible-sounding words anyway — and those words can be totally made up. Engineers have a name for this: a **hallucination**. The AI invents a fact, a quote, a book title, or a date, and presents it with the exact same confidence as a true one. It is not lying — lying requires knowing the truth. It simply does not know the difference.

#### Practice: Spot the Pattern (10 minutes)

Ask your apprentice: if an AI were trained only on text written before the year 2000, what could it *not* tell you about? (Anything invented since: smartphones, modern games, recent events.) If it were trained mostly on text in English, how good would it be at a language with very little online text? (Not very.) These questions cement the core truth: an AI is bounded by its training data, full stop.

#### Closing (5 minutes)

End Session 1 by having your apprentice say the three ideas back to you in their own words, without looking at their notebook. If they can, they are ready for Session 2, where they will catch an AI being wrong with their own eyes.

### Session 2: Where AI Fails

#### Opening (5 minutes)

Remind your apprentice of the word *hallucination*. Tell them today's job is to be a detective: they are going to try to catch the AI making things up, and they are going to verify every answer instead of trusting it.

#### Core Instruction: Three Tests (40 minutes)

An adult should set up access to a free AI chatbot. (Many require an account and have minimum ages — the facilitator handles the account and sits alongside.) Run these three tests and write the results in your notebook.

**Test 1: The made-up question.** Ask the AI about something that does not exist. For example: *"Tell me about the famous 1850 invention called the steam-powered umbrella by James Whitfield."* There is no such thing. Watch carefully. A weaker or older AI will often happily invent a detailed history, complete with fake dates and a fake inventor. That is a hallucination, caught live. (Some newer models will catch the trap and say it cannot find such a thing — that is good behavior, and worth noticing too. The lesson is that you cannot know in advance which you will get.)

**Test 2: The math test.** Ask the AI a multi-step arithmetic problem, like *"What is 487 times 936?"* Then do it yourself on paper or a calculator. AI language models are pattern-matchers, not calculators, and they sometimes get arithmetic wrong because they are predicting what the answer *looks like* rather than computing it. Check whether it matched your real answer.

**Test 3: The local-knowledge test.** Ask it something specific and small that only a local would know: *"What time does the library in my town close on Saturdays?"* It will either refuse (good — it knows it does not know) or it will guess (bad — that guess could send you to a locked door). Compare its answer to the real one by checking the library's actual website.

After each test, ask the same two questions: *Was it right? How do you know?* The answer to "how do you know" must always be: *because I checked another source.* Never *because the AI said so.*

#### Practice: The Verification Rule (10 minutes)

Have your apprentice write this rule on a card and tape it near the computer:

> **AI gives me a starting point, not an answer. I verify before I trust.**

Then talk through real situations: Using AI to brainstorm ideas for a story? Great — there is nothing to verify, you are just collecting sparks. Using AI to get a fact for a research report? You must check that fact in a real, reliable source before you write it down. Using AI to write code? You must run the code and test it yourself, because it may look right and still be broken.

#### Closing (5 minutes)

Ask the closing question: *Is AI smart?* The honest answer your apprentice should reach is: it is incredibly good at one thing — predicting language — and that one thing is so powerful it can feel like intelligence. But it does not know, understand, or care about the truth. That is your job.

## Assessment

- [ ] Learner can explain, without notes, that AI predicts likely patterns from training data rather than knowing facts
- [ ] Learner can describe what training data is and give one example of something an AI could not know because of its data limits
- [ ] Learner caught at least one wrong or unverifiable AI answer during the three tests, or can explain why the AI refused
- [ ] Learner can state the verification rule and explain when verification matters (facts, math, code) versus when it does not (brainstorming)

## Adaptations

- **Simpler:** Do only the prediction game and Test 1. The single takeaway — "it guesses, and the guess can be wrong" — is enough for a younger or newer learner.
- **More challenging:** Have your apprentice design their own "trap" question to expose a hallucination, predict whether the AI will fall for it, and explain afterward why it did or did not.
- **Different setting:** No AI access available? The prediction game, the sentence-completion exercise, and a discussion of "what could an AI not know if it only read books from 100 years ago" teach the full mental model with zero screen time.

## Going Deeper

- Look up "how image generators work" together — the same pattern-prediction idea applies, but with pixels instead of words.
- Discuss bias: if training data contains human mistakes and unfairness, the AI learns those too. Why does that matter for the kinds of jobs we give AI?
- Connect to the Source Evaluation unit in the Agency & Critical Thinking pillar — verifying an AI is the same skill as verifying any source.
