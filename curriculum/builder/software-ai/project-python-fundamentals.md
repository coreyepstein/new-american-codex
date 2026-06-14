---
title: "Python Fundamentals: Build Three Real Programs"
pillar: "software-ai"
stage: "builder"
content-type: project
readiness-indicators:
  - "Can type comfortably and navigate a computer file system"
  - "Has completed an unplugged coding activity or basic Scratch project"
  - "Can follow written technical instructions step by step without giving up at the first error"
  - "Understands the difference between a file and a folder"
learning-objectives:
  - "Write and run a Python program from a file using variables, input, and output"
  - "Use conditionals (if/elif/else) and loops (for/while) to control what a program does"
  - "Store and process collections of data using lists"
  - "Debug a broken program by reading the error message and fixing the cause"
modality: hands-on
duration: "4 sessions, 60 minutes each"
materials:
  - "A computer (Mac, Windows, or Linux)"
  - "Python 3 installed (free download at python.org — get version 3.10 or newer)"
  - "A text editor (VS Code — free at code.visualstudio.com)"
  - "A notebook for sketching out your programs before you write them"
  - "A pencil"
safety-level: green
age-range: "9-12"
parent-role: facilitate
---

# Python Fundamentals: Build Three Real Programs

## Overview

You have used computers your whole life. Now you are going to tell one what to do. Not by clicking buttons someone else made, but by writing the instructions yourself, in a real programming language that professional engineers use every single day.

Python is that language. It runs the recommendation systems at YouTube, the math behind weather forecasts, and the analysis that scientists use to study everything from black holes to bacteria. It is also the friendliest language to learn first, because it reads almost like plain English. In this project you will build three working programs from nothing but a blank file: a calculator, a quiz game, and a data sorter. Each one solves a real problem. Each one is yours.

## The Deliverable

By the end, you will have three Python programs that actually run:

1. **`calculator.py`** — asks the user for two numbers and an operation, then prints the answer. It handles addition, subtraction, multiplication, and division, and it does not crash when someone tries to divide by zero.
2. **`quiz.py`** — asks a series of questions, keeps score, and tells the player how they did at the end.
3. **`sorter.py`** — takes a list of items (names, scores, words) and sorts them, finds the biggest and smallest, and prints a small report.

"Done" means a program you can run from start to finish, that does what you designed it to do, and that you can explain line by line.

## Materials & Tools

| Material | Quantity | Notes |
|----------|----------|-------|
| Computer | 1 | Any operating system works |
| Python 3 | 1 install | python.org. During Windows install, check the box "Add Python to PATH" |
| VS Code | 1 install | Install the official Python extension when prompted |
| Notebook + pencil | 1 each | You will plan on paper first — this is not optional |

To check Python is installed, open a terminal (in VS Code, choose Terminal → New Terminal) and type `python3 --version`. You should see something like `Python 3.11.4`. If you see an error, ask your facilitator to help with the install before Session 1.

## Project Phases

### Phase 1: Plan (Session 1)

A real engineer never opens a blank file and starts typing. They plan first. So before you write a single line of code, you are going to learn the building blocks and sketch your first program on paper.

**The five building blocks of every program**

Almost every program ever written uses just five ideas. Write these in your notebook:

1. **Variables** — a named box that holds a value. `score = 0` makes a box called `score` and puts `0` in it.
2. **Input** — getting information from the user. `name = input("What is your name? ")` waits for the person to type something.
3. **Output** — showing information. `print("Hello!")` displays text on the screen.
4. **Conditionals** — making decisions. `if score > 10: print("You win!")` only runs when the condition is true.
5. **Loops** — repeating work. `for item in mylist:` runs the same code once for each thing in a list.

**Your first program**

Create a folder called `python-projects`. Inside it, make a file called `hello.py`. Type this exactly:

```python
name = input("What is your name? ")
print("Hello, " + name + ". Let's write some code.")
```

Save it. In the terminal, type `python3 hello.py` and press Enter. The program will ask your name, wait for you to type it, then greet you. You just ran your first Python program.

**Notice three things.** The `input()` function always gives you back *text*, even if the person types a number. The `+` sign glues text together. And the program runs top to bottom, one line at a time, exactly in order.

**Plan the calculator on paper.** In your notebook, write out in plain English what the calculator should do, step by step:

1. Ask the user for the first number.
2. Ask for the second number.
3. Ask which operation: + - × ÷
4. Do the math.
5. Print the answer.

This plain-English plan is called *pseudocode*. Engineers write it before real code because it is much easier to fix a bad idea on paper than a bad program on screen.

### Phase 2: Build (Sessions 2-4)

**Milestone 1: The Calculator (Session 2)**

Create `calculator.py`. Build it in pieces, running it after each piece so you catch mistakes early.

```python
print("Simple Calculator")

first = float(input("Enter the first number: "))
second = float(input("Enter the second number: "))
operation = input("Choose an operation (+, -, *, /): ")

if operation == "+":
    answer = first + second
elif operation == "-":
    answer = first - second
elif operation == "*":
    answer = first * second
elif operation == "/":
    if second == 0:
        answer = "Error: you cannot divide by zero."
    else:
        answer = first / second
else:
    answer = "That is not an operation I know."

print("Result:", answer)
```

Run it. Try `5 + 3`. Try `10 / 2`. Now try `10 / 0` — instead of crashing, your program politely refuses, because *you* told it to check for zero first. That check is the difference between a toy and a real tool. A program that crashes on bad input is not finished.

**Why `float`?** Remember that `input()` gives back text. `float(...)` converts that text into a number with decimals so the math works. If you typed `"5" + "3"` without converting, Python would glue them into `"53"` instead of adding them to `8`. Try removing the `float()` once, on purpose, to see this happen. Then put it back. Breaking things on purpose is one of the fastest ways to understand them.

**Milestone 2: The Quiz Game (Session 3)**

Create `quiz.py`. This program introduces *score-keeping* — a variable that changes as the program runs.

```python
print("Welcome to the Quiz!")
score = 0

answer = input("What is the capital of France? ")
if answer.lower() == "paris":
    print("Correct!")
    score = score + 1
else:
    print("The answer was Paris.")

answer = input("How many legs does a spider have? ")
if answer == "8":
    print("Correct!")
    score = score + 1
else:
    print("The answer was 8.")

answer = input("What planet do we live on? ")
if answer.lower() == "earth":
    print("Correct!")
    score = score + 1
else:
    print("The answer was Earth.")

print("You scored", score, "out of 3.")

if score == 3:
    print("Perfect! You are a genius.")
elif score >= 1:
    print("Not bad. Try again to beat your score.")
else:
    print("Tough round. Study up and come back.")
```

Run it. Notice `.lower()` — it turns the player's answer into lowercase so `"Paris"`, `"PARIS"`, and `"paris"` are all accepted. Without it, only an exact match would count, which would frustrate every player. Small touches like this are what separate a thoughtful program from a sloppy one.

Now make it yours: replace the three questions with your own — facts about woodworking, cooking, your favorite sport, anything. Add a fourth and fifth question by copying the pattern.

**Milestone 3: The Data Sorter (Session 4)**

Create `sorter.py`. This is where *lists* and *loops* come in — the tools for handling many items at once.

```python
scores = [88, 92, 75, 100, 67, 81]

print("Original scores:", scores)

scores.sort()
print("Sorted scores:", scores)

highest = max(scores)
lowest = min(scores)
total = sum(scores)
average = total / len(scores)

print("Highest score:", highest)
print("Lowest score:", lowest)
print("Average score:", average)

print("--- Full Report ---")
for s in scores:
    if s >= 90:
        print(s, "- excellent")
    elif s >= 70:
        print(s, "- passing")
    else:
        print(s, "- needs work")
```

Run it. The `for` loop visits every score, one at a time, and prints a label for each. That loop is doing the same work the calculator did once, but now it does it six times without you copying any code. This is the whole point of loops: write the instruction once, let the computer repeat it.

Make it yours: change the list to your own data. A list of your friends' ages. The number of pages you read each day this week. The weights you lifted in your fitness program. Then add a `print()` that announces the highest and lowest by name.

### Phase 3: Test & Refine

A program is not done when it runs once. It is done when it survives being misused. For each of your three programs, try to break it:

- In the calculator, type a word where it asks for a number. What happens? (It will crash with a `ValueError`. That is a real bug. Write it in your notebook — you will learn to handle it in a later unit.)
- In the quiz, type the right answer with extra spaces or capital letters. Does it still count?
- In the sorter, change the list to have only one item, or make it empty (`scores = []`). Does dividing by length still work?

Engineers call this *edge-case testing*. The normal case is easy. The weird cases are where bugs hide.

### Phase 4: Present

Show one program to a family member who has never coded. Do not just run it — *explain* it. Point at a line and say what it does. Point at the `if` statement and explain how the computer makes a decision. If you can teach it, you understand it. If you stumble, that is the part to go back and study.

## Success Criteria

- [ ] All three programs run from the terminal without crashing on normal input
- [ ] The calculator refuses to divide by zero instead of crashing
- [ ] The quiz keeps score correctly and gives a final result
- [ ] The sorter sorts a list and reports the highest, lowest, and average
- [ ] You wrote pseudocode in your notebook before coding the calculator
- [ ] You can point at any line and explain what it does and why it is there
- [ ] You customized at least one program with your own questions or data

## Common Pitfalls

- **`IndentationError`.** Python cares deeply about spacing. The lines inside an `if` or a `for` must be indented (usually four spaces). VS Code does this automatically when you press Enter after a colon. If you see this error, check that your indenting is consistent — never mix tabs and spaces.
- **Forgetting the colon.** Every `if`, `elif`, `else`, `for`, and `while` line ends with a colon `:`. Leaving it off causes a `SyntaxError`. Read the error message — Python usually points right at the line.
- **Comparing text to numbers.** `input()` gives text. `"8" == 8` is False because one is text and one is a number. Either compare text to text (`answer == "8"`) or convert first (`int(answer) == 8`). Pick one and be consistent.
- **Giving up at the first red error.** Errors are not failure. They are the computer telling you exactly what is wrong and what line it is on. Read the last line of the error first — it names the problem. Real engineers read errors all day long. It is a skill, and you are building it.

## Extensions

- **Loop the calculator.** Wrap the whole thing in a `while True:` loop so it keeps asking for new problems until the user types "quit." Search "Python while loop" to learn how.
- **Functions.** Once your quiz has eight questions, the copy-paste gets tedious. Learn to write a function called `ask_question(question, correct_answer)` so you write the asking logic once and reuse it. This is the single most important next step in your programming.
- **Save the high score.** Make the quiz read and write a file so the best score is remembered between runs. Search "Python read write text file."
- **Build a fourth program.** A unit converter (miles to kilometers), a password generator, or a simple to-do list. Plan it on paper first, then build it.
