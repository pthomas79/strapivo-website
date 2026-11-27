# 108. The crack

- Range: Fourth round: visual, few words
- Visual idea: A crack that grows from the top right until someone acts
- Direction: A plaster-pink wall (#E3B9A8) in flat daylight, one dark hairline crack, one small brass gauge. A light grotesque in dark brown (#3A221B), mono for the day count.

## The task

Build a landing page for Strapivo as a single `index.html` in this folder. It is one of fifty fourth-round concepts. This round is about one image, one sentence and one button: highly visual, very few words, free of the brand's design rules.

## The concept

**The visual.** A full-screen wall in plaster pink, with a faint `feTurbulence` texture and a slightly darker band along the bottom edge. The h1 block (h1, sentence and button) sits bottom left.

One crack, drawn in SVG, starts in the exact top right corner and runs down and to the left, towards the h1. It is a jagged line in #2A1A16 with two short side branches. Next to its tip, in mono: "Top right. Day 3."

First screen: the crack covers about a fifth of the diagonal.

Pin the stage for about 250vh. The crack lengthens (animate `stroke-dashoffset`), thickens from 1px to 3px near the corner, and its branches appear. The counter moves with the tip and counts up, one day at a time, to "Day 14". The crack stops about 60% of the way to the h1.

At day 14 a small brass gauge is fixed across the crack near its tip: two overlapping plates, 120px by 36px together, with a row of tick marks and a screw at each end. Surveyors fix these over a crack to see whether it still moves. A thin line runs from the gauge to a small tag: "Needs you".

**The words.**
- h1: "Nothing stays dangerous and undiscussed."
- Plain sentence: Strapivo is where a leadership team tracks the risks to its strategy and decides on them in time.
- At day 14: "Fourteen days in the danger zone with no decision. It goes on the session lead's list."
- Last line: "Then the team decides."

**Phone.** The crack runs from the top right corner to the left edge at half height. The h1 block sits in the lower third.

**Still.** Day 14, with the gauge and the tag in place.

## Standards

Read `../BRIEF.md` sections 1 to 5 for facts, audience, truth rules and calls to action. Then read `../BRIEF-ROUND-4.md`, which replaces every design and build rule from earlier rounds. 60 to 200 visible words. The first screen says in one plain sentence what Strapivo is. The copy lines above are a starting point: keep the meaning, improve the wording, and cut whatever the visual already says.
