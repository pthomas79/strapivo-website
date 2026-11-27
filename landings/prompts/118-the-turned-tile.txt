# 118. The turned tile

- Range: Fourth round: visual, few words
- Visual idea: A wall of identical tiles, and one turned the other way
- Direction: Glazed blue and white tiles (#1F4FA3, #F4F2EC) with pale grout (#D9D6CE) and a soft highlight on each. A white enamel plaque with black type in a plain condensed sans, like a street sign.

## The task

Build a landing page for Strapivo as a single `index.html` in this folder. It is one of fifty fourth-round concepts. This round is about one image, one sentence and one button: highly visual, very few words, free of the brand's design rules.

## The concept

**The visual.** A tiled wall fills the page and runs for about three screens. Build it in CSS. Tiles are 150px squares with 4px grout. Each tile is split on its diagonal: blue at the lower left, white at the upper right (`linear-gradient` at 45 degrees with a hard stop). Over each lies a faint white highlight from its top left corner. Every tile faces the same way, so the wall is one regular sawtooth pattern.

First screen: a white enamel plaque with a thin black inset border covers a block of tiles on the left. It carries the h1 block (h1, sentence and button). Right of centre, one tile is turned a quarter turn, so it breaks the pattern. Under it, a small brass plate (#C9A24A, dark engraved type): "SDS-2026-014. One dissent, reason recorded."

There is no pinned stage. The visitor scrolls down the wall. Two more turned tiles appear, one per screen, at different positions. Each starts in line with the others and turns a quarter turn, over 600ms, when it enters the middle of the screen. Its brass plate then fades in:

- "SDS-2026-019. Two dissents, reasons recorded."
- "SDS-2026-023. One dissent. Later proved right."

At the foot of the wall a second enamel plaque carries the last line, the word "Illustrative" and the button.

**The words.**
- h1: "The record keeps the one who disagreed."
- Plain sentence: Strapivo is where a leadership team decides on its strategy and records each decision, including who disagreed and why.
- Last line: "Dissent is read back, by name and with its reason, before the decision is numbered."

**Phone.** Tiles are 96px. The plaque spans the width near the top, and the first turned tile sits below it in the first screen.

**Still.** The wall with each turned tile already turned and every plate showing.

## Standards

Read `../BRIEF.md` sections 1 to 5 for facts, audience, truth rules and calls to action. Then read `../BRIEF-ROUND-4.md`, which replaces every design and build rule from earlier rounds. 60 to 200 visible words. The first screen says in one plain sentence what Strapivo is. The copy lines above are a starting point: keep the meaning, improve the wording, and cut whatever the visual already says.
