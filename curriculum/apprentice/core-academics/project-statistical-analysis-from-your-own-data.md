---
title: "Statistical Analysis: Collect Your Own Data, Draw Your Own Conclusions"
pillar: "core-academics"
stage: "apprentice"
content-type: project
readiness-indicators:
  - "Comfortable with arithmetic, fractions, decimals, and percentages"
  - "Has used a spreadsheet at least once, or is willing to learn the basics"
  - "Notices patterns and asks 'is that actually true, or does it just feel true?'"
  - "Can stick with a multi-week project that requires daily or weekly data collection"
learning-objectives:
  - "Design a real data-collection plan around a question you genuinely want answered"
  - "Calculate and correctly interpret mean, median, mode, range, and standard deviation"
  - "Build clear visualizations and explain what they show — and what they do not"
  - "Distinguish correlation from causation and state honest, appropriately-hedged conclusions"
modality: hands-on
duration: "5-6 weeks (2-3 hours per week, plus brief daily or weekly data collection)"
materials:
  - "A notebook for the data plan and observations (the data journal)"
  - "A spreadsheet program (Google Sheets, Excel, or LibreOffice Calc — all work; the first is free)"
  - "A measuring instrument appropriate to your question (timer, scale, thermometer, ruler, counter, or just a tally sheet)"
  - "A calculator (or the spreadsheet's built-in functions)"
  - "Optional: graph paper for hand-drawn charts before going digital"
  - "Optional: a free online tool for double-checking calculations (any spreadsheet does this natively)"
safety-level: green
age-range: "13-15"
parent-role: advise
---

# Statistical Analysis: Collect Your Own Data, Draw Your Own Conclusions

## Overview

Statistics is the most weaponized branch of mathematics in modern life. Every advertisement, every political claim, every news headline that says "studies show" is leaning on statistics — and a startling amount of it is wrong, misleading, or deliberately bent. The only real defense is to understand how statistics are actually made: where the numbers come from, what the calculations mean, and how easily an honest-looking chart can lie. The way you learn that is not from a textbook of made-up problems. It is by collecting your own data on a question you care about and analyzing it yourself.

Over five to six weeks you will pick a question, design a way to measure it, collect real data, run the core statistical calculations by your own hand, visualize the results, and write up an honest conclusion. The final artifact is a short report — your question, your data, your math, your charts, and your findings, with the limitations stated plainly. By the end you will never look at a statistic in the wild the same way again.

## Choosing Your Question

The question is everything. A good statistical question has three properties: it is something you genuinely wonder about, it can be measured with numbers, and you can gather enough data points in a few weeks to say something. Aim for at least 30 observations — fewer than that and almost any conclusion is just noise.

Strong questions students have actually used:

- Does the time of day affect how long it takes me to finish a math worksheet? (Measure completion time across morning, afternoon, evening.)
- Is the cereal box's serving count honest? (Weigh out the "30 servings" and see how many you really get.)
- Does sleep affect my morning resting heart rate? (Log hours slept and heart rate for a month.)
- Which checkout line at the store is actually fastest? (Time them.)
- Does the local bus run on time, and does it depend on the day of the week?
- How much does my phone battery drain per hour under different uses?
- Are the "5-minute" recipes actually five minutes?

Notice these are small, local, and checkable. You are not solving climate change. You are answering one honest question with real numbers — and learning that the honest answer is usually messier than you expected.

## Phase 1: Design the Study (Week 1)

### State the Question and the Variables

In your data journal, write the question precisely. Then identify your variables:

- **What you are measuring (the dependent variable).** The thing you want to learn about — completion time, heart rate, battery percentage.
- **What you are varying or grouping by (the independent variable).** Time of day, hours slept, day of week.

Write down the *units* and exactly how you will measure each one. "I will record completion time in seconds using my phone's stopwatch, starting when I read the first problem and stopping when I write the last answer." Vague measurement is the most common way a study quietly breaks. Pin it down before you collect a single number.

### Plan for Honesty

Before you collect anything, write down your prediction — what you expect to find and why. This protects you later from the most natural and dangerous bias in all of data work: deciding what the data "should" say and then unconsciously collecting or reading it to match. Committing your guess to paper first means you cannot later pretend you knew it all along, and it makes the surprises honest.

Then plan your collection schedule. How many observations? Over how many days? At what times? Build a blank data table in your spreadsheet now, with the columns labeled, so collection is just filling in rows.

## Phase 2: Collect the Data (Weeks 2-3)

### Be Disciplined and Boring

Data collection is not glamorous. It is showing up every day and recording the number, even when you are tired, even when the number is boring, even when it does not match your prediction. Especially when it does not match your prediction.

Rules for clean data:

- **Record every observation, including the weird ones.** The temptation to drop a number because it "doesn't seem right" is the road to lying with data. If something truly went wrong (you forgot to start the timer), note *why* you are excluding it. Never silently delete.
- **Measure the same way every time.** Same instrument, same procedure, same conditions where possible. Inconsistent measurement creates fake patterns.
- **Date and timestamp everything.** You will want to slice the data later, and you cannot recover a timestamp you did not write down.
- **Aim past your minimum.** If you need 30 observations, collect 40. Some will turn out unusable.

Fill the spreadsheet as you go. By the end of week 3 you should have a full table of real numbers you gathered yourself.

## Phase 3: Run the Statistics (Week 4)

### The Five Core Measures — By Hand First, Then by Spreadsheet

Calculate each of these *by hand on a small subset first* so you understand what the spreadsheet is doing, then let the spreadsheet do the full set.

1. **Mean (average).** Add all the values, divide by how many there are. The most familiar measure — and the most easily distorted by extremes.

2. **Median (the middle value).** Sort the values, take the middle one. The median ignores extremes, which is exactly why it is often more honest than the mean. If one observation is wildly large, the mean lurches toward it while the median holds steady. *This is why "average income" and "median income" tell very different stories — a single billionaire drags the average up while leaving the median where most people actually live.* Understanding that difference is one of the most useful things in this entire project.

3. **Mode (the most common value).** The value that appears most often. Most useful for categories and repeated whole numbers.

4. **Range (spread).** The largest value minus the smallest. A first, crude measure of how spread out your data is.

5. **Standard deviation (real spread).** This is the one that separates people who use statistics from people who are fooled by them. Standard deviation measures how far, on average, the values sit from the mean. A small standard deviation means the data clusters tightly; a large one means it is scattered. Two data sets can have the *same mean* and tell completely opposite stories because their standard deviations differ. Compute it like this:
   - Find the mean.
   - For each value, subtract the mean and square the result.
   - Average those squared differences (this is the variance).
   - Take the square root. That is the standard deviation.

   Do this by hand for five numbers once. It is tedious and clarifying. Then use the spreadsheet function `STDEV` for the rest and trust it, because now you know what it is doing.

### Group and Compare

If your question compared groups (morning vs. evening, weekday vs. weekend), calculate the mean and standard deviation *for each group separately*. The comparison between groups is usually where your answer lives.

## Phase 4: Visualize and Conclude (Weeks 5-6)

### Make Honest Charts

Build at least two visualizations in your spreadsheet:

- A **histogram or bar chart** showing the distribution of your data — how the values are spread out.
- A **chart comparing your groups** if you have them (a grouped bar chart or two histograms side by side), or a **scatter plot** if you are looking for a relationship between two numeric variables.

Then study your own chart for dishonesty, because charts lie constantly:

- **Does your axis start at zero?** A bar chart with a y-axis starting at 95 instead of 0 makes a tiny difference look enormous. This is the single most common visual deception in news and advertising. Look at your own chart and ask whether the axis is making a small effect look big.
- **Is the scale consistent?** Uneven spacing fakes trends.
- **Are you showing all the data, or only the flattering part?**

### A Gallery of Chart Lies To Watch For In Your Own Work

You will be tempted by every one of these, because they all make your finding look stronger than it is. Audit your own charts against this list before you show anyone:

- **The truncated axis.** Starting the y-axis at 95 instead of 0 turns a rise from 96 to 98 into a chart where the second bar towers over the first. The data changed by 2 percent; the picture screams 50 percent. This is the most common deception in news graphics. Unless you have a deliberate, stated reason, start bar-chart axes at zero.
- **The cherry-picked window.** Showing only the three days that support your story instead of all thirty. If you collected thirty observations, your chart shows thirty.
- **The misleading average.** Reporting only a mean when the spread is huge. "Average wait time: 4 minutes" hides the fact that half the waits were 1 minute and half were 7. Show the distribution, not just the center.
- **The fake precision.** Reporting "the morning average was 363.7142 seconds" from six trials implies a precision your crude measurement never had. Round to the precision your instrument actually delivers. False decimals are a quiet lie.
- **The dual-axis trick.** Putting two different measures on two different scales in one chart so they appear to move together. Avoid it; if two things genuinely relate, a scatter plot shows it honestly.
- **The volume illusion.** Using a picture (a bag of money twice as tall *and* twice as wide) to represent a doubling — but doubling both dimensions quadruples the apparent area, exaggerating the effect. Bars, not pictures.

Run this gallery against your own work, then run it against the next chart you see in an advertisement or a news story. You will start seeing these everywhere, and you will never be quite as easy to fool again. That is the real product of this whole project: not the report, but the eye.

### State the Honest Conclusion

Now answer your question — carefully. Two rules govern an honest conclusion:

1. **Hedge to match your certainty.** With 30-40 observations from one person over a few weeks, you have a suggestive finding, not a law of nature. "My data suggests I tend to finish worksheets faster in the morning, though the spread is wide enough that the effect is not dramatic" is honest. "Mornings make you smarter" is a lie your data cannot support. Match your confidence to your evidence.

2. **Correlation is not causation.** This is the most important sentence in statistics. If two things move together, it does *not* mean one caused the other. Maybe a third thing caused both. Maybe it is coincidence — with enough variables, some will line up by pure chance. If your heart rate is lower on days you slept more, sleep *might* lower heart rate, or a calm week might have produced both more sleep and a lower heart rate. Your data shows the pattern; it cannot, by itself, prove the cause. Saying so is not weakness. It is the mark of someone who actually understands what they measured.

### Write the Report

Your final artifact is a short report (1-2 pages plus charts) with these sections: the question, how you measured it, your data summary (the five measures, by group if relevant), your charts, and your honest conclusion including its limitations. This goes in your portfolio. It is proof you can take a real question, gather real evidence, and reason from it without fooling yourself.

## Success Criteria

- The student collected at least 30 real observations they gathered themselves
- The student calculated mean, median, mode, range, and standard deviation, and can explain by hand what standard deviation measures
- The student can explain, with an example, why the mean and median can tell different stories
- At least two honest visualizations are produced, and the student checked their own charts for axis manipulation
- The written conclusion is hedged appropriately and explicitly addresses why correlation does not prove causation
- The final report contains the question, method, data summary, charts, and limitations

## Common Pitfalls

- **Deleting data that does not fit the prediction.** This is the cardinal sin. The whole point is to find out what is true, not to prove what you guessed. Keep every honest observation.
- **Too few data points.** Five observations prove nothing. Conclusions from tiny samples are the most common way people fool themselves. Get to at least 30.
- **Confusing the mean for the whole story.** A mean with no standard deviation is half a fact. Always report spread, not just center.
- **Overclaiming.** "My study proves..." is almost never true at this scale. "My data suggests..." almost always is. Calibrate your language to your evidence.
- **Letting the spreadsheet think for you.** If you do not understand what `STDEV` computes, you are not doing statistics — you are operating a magic box. Compute it by hand once, then automate.
- **Cherry-picking the chart.** Showing only the flattering subset, or starting an axis above zero, turns honest data into propaganda. Hold yourself to the standard you wish the news held itself to.

## Going Deeper

- **Read *How to Lie with Statistics* by Darrell Huff.** It is short, old, slightly dated in its examples, and one of the most useful books you will ever read. It teaches you every trick so you can spot it being used on you.
- **Audit a real statistic.** Find a statistic in an ad or news headline ("4 out of 5 dentists recommend...") and dig into how it was made. Sample size? Who paid for the study? What was the exact question asked? You will frequently find the impressive number is built on a flimsy foundation.
- **Run a second study on a question where you are genuinely uncertain of the outcome.** The discipline of not knowing the answer in advance is where the real learning lives.
- **Learn one inferential concept next.** Once you are comfortable with descriptive statistics, look up what a "p-value" and "statistical significance" actually mean. They are the most misused terms in science reporting, and understanding them is a superpower.
