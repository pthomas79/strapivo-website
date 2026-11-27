# 103. The receipt

- Range: Fourth round: visual, few words
- Visual idea: A till roll that prints one entry for every decision
- Direction: Mustard ground (#E9B824), white thermal paper with a soft shadow, grey-black print. One mono face on the paper, a heavy grotesque for the h1 in near black.

## The task

Build a landing page for Strapivo as a single `index.html` in this folder. It is one of fifty fourth-round concepts. This round is about one image, one sentence and one button: highly visual, very few words, free of the brand's design rules.

## The concept

**The visual.** A flat mustard page, about three screens tall. This page needs no JavaScript.

A dark band (#1F1B12), 12vh high, is fixed to the bottom of the screen: the printer. In its top edge, right of centre, is a slot 380px wide. A strip of white paper, 340px wide, comes up out of the slot and scrolls with the page, behind the band. So as the visitor scrolls down, the paper feeds upward out of the printer. On the first screen the top of the paper is 38vh from the top, and its header and first entry can be read.

The h1 block (h1, sentence and button) is fixed on the left, vertically centred.

The paper is printed in mono, top to bottom, with about 45vh between entries:

- "STRAPIVO" / "RECORD OF DECISIONS" / "Illustrative"
- "SDS-2026-011 HOLD" / "Reviewed 5 March."
- "SDS-2026-012 ADAPT" / "Two activities redrafted."
- "SDS-2026-013 NOT YET" / "Parked. Returns in May."
- "SDS-2026-014 PIVOT" / "Dissent: one member. Reason on file." / "Confirmed by an Owner."
- A row of thin vertical bars, like a barcode. No words.

The top edge of the paper is a torn zigzag (CSS `clip-path`). The footer line sits inside the dark band.

**The words.**
- h1: "Every decision, with a receipt."
- Plain sentence: Strapivo is where a leadership team decides on its strategy and keeps a numbered record of each decision.
- After the last entry, on the mustard: "What was decided, why, who disagreed, and what happened next." Then the button.

**Phone.** The h1 block sits at the top in normal flow and scrolls away. The paper is 84vw wide and centred. The band is 9vh high.

**Still.** The first screen as it is: header and first entry above the slot.

## Standards

Read `../BRIEF.md` sections 1 to 5 for facts, audience, truth rules and calls to action. Then read `../BRIEF-ROUND-4.md`, which replaces every design and build rule from earlier rounds. 60 to 200 visible words. The first screen says in one plain sentence what Strapivo is. The copy lines above are a starting point: keep the meaning, improve the wording, and cut whatever the visual already says.
