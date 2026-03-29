---
title: "The Algorithm Race"
pillar: "software-ai"
stage: "explorer"
content-type: experiment
readiness-indicators:
  - "Can compare two numbers and identify which is larger"
  - "Understands the concept of 'in order' (first, second, third)"
  - "Can follow a multi-step process with patience"
learning-objectives:
  - "Understand that an algorithm is a step-by-step method for solving a problem"
  - "Experience that different algorithms solve the same problem at different speeds"
  - "Compare at least two sorting methods and articulate which is faster and why"
modality: hands-on
duration: "45 minutes"
materials:
  - "A deck of playing cards (use only Ace through 10, one suit — 10 cards)"
  - "A second set of 10 numbered index cards (write numbers 1-10)"
  - "A timer or stopwatch"
  - "A notebook for recording results"
  - "Optional: a set of 10 books of different heights"
safety-level: green
age-range: "5-8"
parent-role: guide
---

# The Algorithm Race

## Overview

An algorithm is just a set of steps for solving a problem. That's it. But not all algorithms are created equal — some are fast, some are slow, and the difference matters enormously when you're dealing with millions of things instead of ten. This experiment lets children discover that truth with their own hands, racing two different sorting methods against each other and timing the results.

## The Question

*"Is there a best way to put things in order? Or does it not matter how you do it?"*

## Background

Sorting is one of the oldest problems in computer science, and it's still one of the most important. Every time you sort emails by date, organize a playlist, or see search results ranked by relevance, a sorting algorithm is running. Computer scientists have invented dozens of sorting methods, and choosing the right one can mean the difference between a program that finishes in a second and one that takes hours.

You don't need to teach your child algorithm names. What you're teaching is the idea that **method matters** — how you approach a problem changes how long it takes and how well it works.

## Hypothesis

Before starting, ask your child: *"Do you think it matters HOW we sort the cards, or will every way take the same amount of time?"*

Write down their prediction. Most children assume all methods will take roughly the same time.

## Materials

- 10 playing cards (Ace through 10 of one suit) or 10 index cards numbered 1-10
- A timer
- A notebook to record times
- A flat surface with room to spread cards out

## Procedure

### Setup (5 minutes)

Shuffle the 10 cards thoroughly. Lay them face-up in a row, out of order. Make sure your child can see all the numbers.

Explain: *"We're going to put these in order from 1 to 10. But we're going to try TWO different methods and see which one is faster."*

### Method 1: The Scan Method (10 minutes)

This is a simplified version of **selection sort** — but don't use that name yet.

*"Here are the rules for Method 1: Look at ALL the cards. Find the smallest number. Put it first. Now look at all the remaining cards. Find the smallest. Put it second. Keep going until they're all in order."*

Demonstrate with the first card. Then let your child do the rest.

**Start the timer** when they begin looking for the first card. **Stop it** when the last card is placed.

Record the time.

Shuffle the cards again.

### Method 2: The Neighbor Method (10 minutes)

This is a simplified version of **bubble sort.**

*"Here are the rules for Method 2: Look at the first two cards. If they're out of order, swap them. Now look at the second and third cards. If they're out of order, swap them. Keep going to the end. Then start over from the beginning. Keep doing passes until you make it through the whole row without swapping anything."*

Demonstrate the first pass. Swapping means physically picking up two cards and trading their positions.

**Start the timer.** Let your child work through it. They'll likely need multiple passes. **Stop the timer** when they complete a pass with zero swaps.

Record the time.

### Trial 2 (10 minutes)

Shuffle and repeat both methods. Recording two trials for each method helps show that the pattern is consistent, not a fluke.

### Record

In the notebook, create a simple table:

| Method | Trial 1 Time | Trial 2 Time |
|--------|-------------|-------------|
| Scan (find smallest) | | |
| Neighbor (swap pairs) | | |

## Analysis

Sit down with the results. Ask:

- *"Which method was faster?"* (The Scan method is almost always faster with 10 items.)
- *"Which method felt easier to do?"* (Many children say the Neighbor method felt easier even though it was slower.)
- *"Why do you think one was faster?"*

Guide the discussion: *"In the Scan method, you look at everything and make a smart choice — you FIND the smallest. In the Neighbor method, you only look at two cards at a time and make small fixes. The Scan method is smarter — it does fewer moves. But the Neighbor method is simpler — the rule is easier to follow."*

*"In computer science, this is a real tradeoff. Sometimes a simple method is slow. Sometimes a clever method is fast but harder to set up."*

## The Explanation

*"An algorithm is a step-by-step method for solving a problem. Today you tested two algorithms for the same problem — sorting cards. They both worked, but one was faster. Computer scientists spend a lot of time figuring out the fastest algorithm for different problems. The best programmers aren't the fastest typers — they're the ones who pick the best algorithm."*

Ask: *"Can you think of other problems where the METHOD you use matters?"* (Finding something in a messy room vs. an organized room. Looking up a word in the dictionary by flipping randomly vs. opening to roughly the right section.)

## Extensions

- **Scale it up:** Try both methods with 20 cards instead of 10. The difference in time becomes much more dramatic. This is the beginning of understanding computational complexity — more data makes bad algorithms much worse.

- **Invent your own:** Challenge your child to come up with a THIRD sorting method. Any rules they want. Time it. Is it faster or slower? There's no wrong answer — inventing algorithms is real computer science.

- **The Library Shelf:** Sort a shelf of books by height using each method. The physical weight of moving books makes the difference between methods even more visceral.

- **Human sort:** If you have a group of children (siblings, playdate, homeschool co-op), give each child a number card to hold. Sort the humans using each method. Children physically walk to new positions. This is unforgettable.

## Safety Notes

No physical risks in this activity. The only caution: if your child gets frustrated with the Neighbor method (it does take longer and can feel tedious), acknowledge it. *"You're right, it IS slow. That's exactly what computer scientists discovered too. That frustration is actually the point of the experiment."*
