---
title: "What Makes a Game Fun? Build One and Find Out"
pillar: "software-ai"
stage: "builder"
content-type: experiment
readiness-indicators:
  - "Has written and run at least a few small Python programs using variables, loops, and conditionals"
  - "Can run a program from the terminal and read error messages"
  - "Can keep a fair, written record of results instead of relying on memory"
  - "Is willing to test the same thing several times to see a real pattern"
learning-objectives:
  - "Build a complete, playable number-guessing game in Python"
  - "Form a testable hypothesis about a game design choice and test it on real players"
  - "Collect and record data from playtests, then change one variable at a time"
  - "Use evidence from players — not just personal opinion — to decide how to improve a game"
modality: hands-on
duration: "3 sessions, 60 minutes each"
materials:
  - "A computer with Python 3 installed"
  - "A text editor (VS Code) or a free online editor like replit.com"
  - "A notebook with a section for recording playtest data"
  - "A pencil"
  - "3-5 willing playtesters (family members or friends of any age)"
safety-level: green
age-range: "9-12"
parent-role: facilitate
---

# What Makes a Game Fun? Build One and Find Out

## Overview

Everyone has an opinion about what makes a game fun. Most opinions are wrong, because they are just guesses. Real game designers do not guess — they build, they test on real players, they collect data, and they change one thing at a time to see what actually works. In this experiment you will build a complete game in Python and then turn yourself into a game-design scientist: you will form a hypothesis, run playtests, and let the evidence — not your gut — tell you how to make it better.

## The Question

**Does giving the player a hint ("higher" or "lower") make a guessing game more fun, or does it make it too easy and boring?**

You will build a number-guessing game, then test two versions of it on real people to find out.

## Background

You need three things before you can run this experiment.

**First, the game idea.** In a number-guessing game, the computer secretly picks a number between 1 and 100. The player guesses. The game tells them if they were right, and the game keeps going until they get it. That is the whole game. It is simple on purpose — a simple game is easy to change, and changing one thing at a time is the heart of any experiment.

**Second, the design idea you are testing.** There are two versions:
- **Version A (no hints):** the game only says "wrong, try again."
- **Version B (with hints):** the game says "too high, guess lower" or "too low, guess higher."

Version B is easier. The question is whether easier means *more fun* or *less fun*. You genuinely do not know the answer yet — that is what makes it a real experiment.

**Third, the idea of a fair test.** To compare the two versions fairly, you must change *only* the hints. Same number range, same wording everywhere else, same instructions to the players. If you change two things at once, you will never know which one caused the difference. Suppose you added hints *and* shrank the range from 1-100 to 1-20 at the same time, and players liked the new version better. Was it the hints? The smaller range? Both? You would have no way to tell, and your whole experiment would be wasted. Scientists call this *controlling your variables*. Game designers call it the only way to actually learn anything.

This is the single hardest discipline in this experiment, and it is the same discipline a real scientist uses every day. The thing you deliberately change is called the **variable** — here, the hints. Everything else you hold perfectly still is a **control**. The players' fun ratings and guess counts are your **data** — the evidence you collect. Get these three words into your notebook and your vocabulary, because they are the bones of every experiment you will ever run, in software or anywhere else.

## Hypothesis

> Before you begin, write down what you think will happen and why:
>
> "I think Version ____ (A or B) will be more fun because _______."
>
> Also predict: "I think players will give Version B a fun rating about ____ points (higher / lower / the same) compared to Version A."

Write it in pen, in your notebook, before you build anything. You are not allowed to change your prediction after you see the results — that would not be honest science.

## Materials

- A computer with Python 3
- VS Code or replit.com
- Notebook with a data-recording page set up before Session 2
- 3-5 playtesters (mix of ages if you can — it makes the results more interesting)

## Procedure

### Setup

**Session 1 — Build the game.** Create a file called `guessing_game.py`. Build Version B first (it has everything Version A has, plus hints), then you will make Version A by removing two lines.

```python
import random

print("I'm thinking of a number between 1 and 100.")
print("Can you guess it?")

secret = random.randint(1, 100)
guesses = 0
guessing = True

while guessing:
    guess = int(input("Your guess: "))
    guesses = guesses + 1

    if guess == secret:
        print("You got it! It took you", guesses, "guesses.")
        guessing = False
    elif guess < secret:
        print("Too low — guess higher.")
    else:
        print("Too high — guess lower.")
```

Type it in and run it with `python3 guessing_game.py`. Play it a few times yourself. Notice the new tool: `import random` at the top loads Python's random-number library, and `random.randint(1, 100)` makes the computer pick a different secret number every game, so it is never the same twice. Without it, you would be the only one who knew the answer and the game would be no fun to design or test. The `while guessing:` loop keeps asking until the player wins, then sets `guessing = False` to stop the loop. And `guesses = guesses + 1` quietly counts every attempt — that counter is your built-in data collector, measuring how hard each game was without you having to watch and tally by hand. A good experimenter builds the measurement right into the tool.

Play it once with the goal of winning in as few guesses as possible. Did you naturally start guessing 50, then 25 or 75 depending on the hint? That is a real strategy called *binary search*, and you just invented it by playing. Keep that in mind — it matters for understanding your results later.

That is **Version B (with hints)**. To make **Version A (no hints)**, save a second copy called `guessing_game_a.py` and replace the two hint lines with a single line:

```python
    if guess == secret:
        print("You got it! It took you", guesses, "guesses.")
        guessing = False
    else:
        print("Nope — try again.")
```

Now you have both versions, identical except for the one variable you are testing. That is a fair test.

### Experiment

**Session 2 — Run the playtests.** This is the experiment. Follow the same script for every player so the test stays fair.

1. Set up your data table in your notebook (see the Record section below) before the first player sits down.
2. For each playtester, have them play **Version A first, then Version B** (or flip the order for half your players — that way the *order* itself does not secretly affect the results).
3. After each version, write down two numbers: how many guesses it took them to win, and a **fun rating from 1 to 5** that they give you out loud ("On a scale of 1 to 5, how fun was that?").
4. Do not coach, do not hint at which version you think is better, and do not let them see your hypothesis. If they know what you are hoping for, they may give you the answer they think you want — that ruins the data.
5. Test all 3-5 players the same way.

### Record

Make a table like this in your notebook and fill in a row for every player:

| Player | Version A: guesses | Version A: fun (1-5) | Version B: guesses | Version B: fun (1-5) |
|--------|-------------------|----------------------|--------------------|----------------------|
| 1      |                   |                      |                    |                      |
| 2      |                   |                      |                    |                      |
| 3      |                   |                      |                    |                      |

When you are done, add an **average** row at the bottom: add up each column and divide by the number of players. Those averages are your real results.

## Analysis

- What happened? Which version got the higher average fun rating?
- Did it match your hypothesis, or did the players surprise you?
- Look at the guesses columns. Version B (with hints) almost certainly took *fewer* guesses — but did fewer guesses mean *more* fun, *less* fun, or did it not matter? This is the interesting part.
- Did age seem to change the answer? Younger players and older players sometimes want very different things from a game. What did you notice?
- What might explain your results? Write your best explanation, in your own words, in your notebook.

**A word about small samples.** You tested 3-5 players. That is enough to *see a hint* of a pattern, but not enough to be certain. If two players loved Version B and one hated it, you cannot announce "everyone prefers hints" — you can only say "most of my testers preferred hints, and I would need more players to be sure." Real scientists test hundreds or thousands of people for exactly this reason. Being honest about how much your small experiment can and cannot prove is itself a sign of a good scientist. Beware of deciding the answer from a single player, and beware of trusting your average if one player's score is wildly different from the rest — that odd result is worth a second look, not a shrug.

## The Explanation

Here is what game designers have learned over decades, which you may have just discovered yourself: fun usually lives in a *balance* between too easy and too hard. This is sometimes called the difficulty "sweet spot." A game with no hints can feel frustrating and random — the player is just guessing blindly. A game with hints feels fair, because every guess teaches them something and they can feel themselves closing in. That feeling of *making progress through skill* is one of the deepest sources of fun in any game.

But — and this is why you ran a real experiment instead of trusting an expert — the sweet spot is different for different people. A skilled older player might find Version B too easy and therefore boring, while a younger player finds the same version perfectly satisfying. There is no single right answer, which is exactly why designers test on real players instead of guessing. You did not learn "hints are good" or "hints are bad." You learned something far more valuable: *the only way to know if a design works is to test it on the people who will use it.* That is true for games, websites, tools, and almost everything you will ever build.

## Extensions

- **Change one variable:** Run a new experiment testing a different single change — limit the player to 7 guesses, or change the range to 1-1000, or add a "you're getting warmer" message. Form a new hypothesis, test it the same fair way, and compare.
- **Real-world connection:** The thing you just did has a professional name: *A/B testing*. Real companies show Version A of a website to half their visitors and Version B to the other half, then keep whichever performs better. You used the exact same method, by hand, on your guessing game.
- **Further reading:** Look up the idea of "flow" in games — the state where a challenge is hard enough to be interesting but not so hard you give up. Then look back at your data and see if it shows up.

## Safety Notes

This is a screen-based programming experiment with no physical hazards, but the always-required safety review still applies.

### Chemical/Material Hazards

- None. No physical materials beyond a computer, notebook, and pencil are used.

### Disposal

- Nothing to dispose of. Save your two program files — you can reuse them for the extension experiments.

### Protective Equipment

- None required. Take a standard screen break: every 20 minutes, look at something at least 20 feet away for 20 seconds to rest your eyes. Keep playtest sessions to the stated length so neither you nor your playtesters get tired enough that the data stops being reliable.
