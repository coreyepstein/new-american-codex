---
title: "Code Review Bug Hunt"
pillar: "software-ai"
stage: "builder"
content-type: activity
readiness-indicators:
  - "Has written at least one working program (Python, JavaScript, or Scratch)"
  - "Understands variables, conditionals, and loops well enough to read code, not just write it"
  - "Can stay focused on a careful, detailed task for 30-45 minutes"
  - "Is willing to slow down and read line by line instead of skimming"
learning-objectives:
  - "Read code written by someone else and explain what each part is supposed to do"
  - "Find logic bugs by tracing a program by hand before running it"
  - "Tell the difference between a syntax error, a logic error, and a style problem"
  - "Give specific, kind, useful feedback on code instead of vague reactions"
modality: hands-on
duration: "45 minutes"
materials:
  - "A computer with Python 3 installed (or a free online editor like replit.com)"
  - "A printout of the four programs below, or this file open on screen"
  - "A notebook and pencil for tracing programs by hand"
  - "A red pen for marking up the printout (optional but fun)"
safety-level: green
age-range: "9-12"
parent-role: facilitate
---

# Code Review Bug Hunt

## Overview

Writing code is only half the job. The other half is reading it — finding the mistakes, understanding what someone else built, and making it better. Every professional programmer in the world spends huge amounts of time reviewing code, both their own and other people's. It is called a *code review*, and it is one of the most respected skills in the field.

In this activity, you become the reviewer. You will be handed four short programs. Three of them look like they work but each hides a bug, and the fourth works correctly but is written badly. Your job is to hunt down the problems — by reading carefully and thinking like the computer — and to write a review that would actually help the person who wrote them.

## Setup

Have the four programs ready, either printed out or open on screen. Get out your notebook and pencil — you will trace some of these by hand before you ever run them, because the best reviewers can find a bug just by reading. Keep Python or an online editor open so you can test your fixes at the end.

The most important rule of this activity: **read first, run second.** Anyone can run a program and watch it break. A real reviewer spots the problem in the code itself.

## Instructions

### Step 1: Learn the three kinds of problems

Before you hunt, you need to know what you are hunting. Write these three categories in your notebook:

1. **Syntax errors** — the code breaks the rules of the language and will not run at all. A missing colon, a misspelled keyword, an unclosed quote. The computer catches these for you and shows an error, usually pointing at or near the broken line. Annoying, but the easiest kind to fix, because you are not searching — the computer has already found it for you.
2. **Logic errors** — the code runs perfectly fine but does the *wrong thing*. These are the dangerous ones, because nothing warns you. The program looks happy while quietly giving wrong answers. A calculator that runs beautifully but secretly adds when it should subtract has a logic error. Finding these is the real art of code review, and it is the skill that separates a beginner from a serious programmer.
3. **Style problems** — the code works and is correct, but it is hard to read: confusing names like `x` and `data2`, no spacing, the same chunk of code copied three times instead of written once. Style problems are not bugs, but they matter more than beginners think. Messy code hides bugs the way a messy room hides a lost key, and code is read far more often than it is written. The next person to open this file might be a teammate — or it might be *you*, six months from now, with no memory of what you were thinking.

Keep these three categories in front of you. For every problem you find, your first job is to name which kind it is. That habit alone will make you a sharper reviewer, because each kind is hunted in a different way: you let the computer find the syntax errors, you trace by hand to find the logic errors, and you read with fresh eyes to find the style problems.

### Step 2: Trace and review Program A

```python
# Program A: This should print the numbers 1 through 5.
count = 1
while count < 5:
    print(count)
    count = count + 1
```

Before you run it, *trace it by hand* in your notebook. Make a column for `count` and a column for what gets printed. Write down `count = 1`, check the condition `1 < 5` (true), print `1`, add one. Keep going until the condition is false.

What did you get? You should see that it prints 1, 2, 3, 4 — but **not 5**. The program promised 1 through 5 and delivered only 1 through 4. That is a logic error, the sneaky kind. The condition `count < 5` stops the loop as soon as `count` reaches 5, so 5 never gets printed. The fix is `count <= 5` (less than *or equal to*).

Write your review of Program A in your notebook, using the format you will learn in Step 6.

### Step 3: Trace and review Program B

```python
# Program B: This should tell the user if they can vote (age 18 or older).
age = input("How old are you? ")
if age >= 18:
    print("You can vote.")
else:
    print("Not yet old enough to vote.")
```

Trace this one too. Picture what `input()` hands back. Remember from your Python work: `input()` always gives back *text*, never a number. So `age` holds something like `"15"` — the characters, not the value. The line `if age >= 18` tries to compare text to a number, and Python will stop with a `TypeError`.

This is partly a logic error (the programmer forgot the type) that shows up as an error when run. The fix is to convert the input to a whole number: `age = int(input("How old are you? "))`. Note the bug in your review.

### Step 4: Trace and review Program C

```python
# Program C: This should print "Even" for even numbers and "Odd" for odd ones.
def check(n):
    if n % 2 == 0:
        print("Even")
    else
        print("Odd")

check(4)
check(7)
```

Look closely at the `else` line. Notice anything missing? Every `else` in Python ends with a colon — this one does not. That is a **syntax error**: the program will not even start. The computer will catch this one for you and point near the line. The fix is `else:`.

This program teaches an important lesson for reviewers: syntax errors are the *easiest* to find because the computer finds them. Save your sharpest attention for logic errors, which hide in code that runs just fine.

### Step 5: Hunt for style problems in Program D

```python
# Program D: This works correctly, but is it good code?
def f(x):
    if x>=90:
        return "A"
    if x>=80:
        return "B"
    if x>=70:
        return "C"
    return "F"

print(f(95))
print(f(72))
print(f(50))
```

Run it. It works — it prints `A`, `C`, `F`. There is no bug here. So what could a reviewer possibly say? Plenty. This is a code review, not a bug hunt, and good reviewers improve code that already works.

Read it slowly and write down everything that makes it hard to read:

- **The name `f` tells you nothing.** What does this function do? You have to read the whole thing to find out. A name like `letter_grade` would tell the reader instantly. Good names are the cheapest, most powerful way to make code clear.
- **`x` is no better.** It is a score, so call it `score`. Code should read almost like a sentence: `if score >= 90`.
- **The spacing is cramped.** `x>=90` is harder to read than `score >= 90`. Spaces around the comparison cost nothing and help the eye.

None of these are bugs. The program would pass every test. But imagine a teammate inheriting this file. With clear names and spacing it takes ten seconds to understand; without them it takes a minute and invites mistakes. Multiply that across a real project with thousands of lines, and you see why professionals care so much about style. Write a review of Program D that praises that it works and correctly handles the failing grade, then suggests the renaming and spacing improvements.

### Step 6: Write a real code review

For each program, write a short review in your notebook using this three-part format that professional reviewers use:

1. **What it does well.** Always start here. "The loop is set up correctly and the variable name `count` is clear." This is not just politeness. Real reviewers begin with the positive because it keeps the other person open to hearing the rest, and because noticing what works is itself part of learning to write well. Reviewing is not about tearing someone down — it is about making the code, and the coder, better.
2. **The bug, specifically.** Name the exact line and the exact problem. Not "it's broken" but "On the `while` line, `count < 5` stops one number too early, so it never prints 5." The test of a good bug report is whether someone could fix the problem from your description alone, without rediscovering it themselves. Vague feedback wastes everyone's time; precise feedback is a gift.
3. **A suggested fix.** Offer the solution. "Change `< 5` to `<= 5`." You do not have to be right — sometimes the author knows a better fix — but proposing one shows you understood the problem deeply enough to solve it, and it gives the author somewhere to start.

This three-part shape — *praise, then problem, then fix* — is exactly how professional engineers comment on each other's work every day, on teams at every software company in the world. Practice it now on these tiny programs and it will be second nature when you are reviewing a friend's game or your own project a year from now. The kindest thing you can do for another programmer is to read their code carefully and tell them the truth about it, clearly.

### Step 7: Fix and verify

Now open your editor, type in each program, apply your fixes, and run them. Confirm Program A prints all five numbers, Program B handles a typed age correctly, and Program C prints "Even" then "Odd." For Program D, apply your renaming suggestions and confirm it still prints `A`, `C`, `F` — proving that good style changes nothing about *what* the code does, only how easy it is to read. A review is only proven when the fixed code actually works.

## What to Watch For

Watch for the moment your apprentice catches a logic error *by reading*, before running the code. That is the breakthrough — it means they are tracing the program in their head the way the computer would. Praise it specifically.

Listen for vague feedback like "this is wrong" or "I don't get it." Push gently: "Which line? What exactly does it do that it shouldn't?" Specificity is the whole skill. A reviewer who cannot point to a line is not yet reviewing.

Notice whether they start with the syntax error in Program C and feel they have "found the bug." Remind them the computer would have found that one instantly — the valuable hunting is for the logic errors the computer cannot catch.

## Variations

- **Solo:** Work through all four programs alone, then read your reviews aloud to a parent and defend each one.
- **With a partner:** Each person secretly writes a short working program, then plants one bug in it and trades with their partner. Race to find each other's planted bug. This is the most fun version and mirrors exactly how real teams work.
- **Group:** Project one program on a screen and review it together out loud, each person taking one line. Whoever spots the bug explains it to the group.

## Reflection Prompts

- Which kind of bug was hardest to find — syntax, logic, or style? Why?
- Did you find any bug just by reading, before running? How did it feel compared to watching it break?
- When someone reviews *your* code someday, what kind of feedback would help you most?
- Why do you think professional programmers review each other's code instead of just trusting that it works?
