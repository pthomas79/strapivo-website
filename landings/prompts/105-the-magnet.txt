# 105. The magnet

- Range: Fourth round: visual, few words
- Visual idea: Scattered iron filings that line up when the magnet arrives
- Direction: White paper (#F7F6F2), graphite filings (#2A2A2A), one bar magnet in red (#D12F2F) and steel grey (#8E979F). A plain grotesque, small, like a plate in a physics textbook.

## The task

Build a landing page for Strapivo as a single `index.html` in this folder. It is one of fifty fourth-round concepts. This round is about one image, one sentence and one button: highly visual, very few words, free of the brand's design rules.

## The concept

**The visual.** A full-screen 2D canvas on white paper. About 2,400 iron filings (900 on a phone): each is a graphite line 9px long and 1.2px wide, at a fixed random position and a random angle. Leave a clear area bottom left for the h1 block (h1, sentence and button).

The magnet is a bar 300px by 64px with square ends. Its left half is red, its right half steel grey, and the word "AMBITION" is engraved along it in white capitals. On the first screen the magnet is half in view at the right edge and the filings lie at random. Above them, small: "Over 4,000 sources a day."

Pin the stage for about 250vh. The magnet slides to the centre of the screen. Each filing turns from its random angle to the direction of the magnetic field at its position. Treat the two ends of the bar as poles: `B = r1/|r1|^3 - r2/|r2|^3`, `angle = atan2(By, Bx)`. Filings near the magnet turn first, the far ones last. By the end, clear arcs run from one pole to the other. Do not draw filings under the bar.

The fifteen filings nearest the poles turn Azure (#0082E6) and get one label: "Signals".

Redraw only when the scroll position changes.

**The words.**
- h1: "News has no direction until you do."
- Plain sentence: Strapivo is where a leadership team keeps its strategy and reads the outside world against it.
- At the end: "The same news, read against what you said must succeed."

**Phone.** The bar is 200px wide and sits in the middle of the screen. The h1 block sits at the top on a clear band of paper.

**Still.** The finished field: magnet in the centre, filings in arcs, the Azure few and their label.

## Standards

Read `../BRIEF.md` sections 1 to 5 for facts, audience, truth rules and calls to action. Then read `../BRIEF-ROUND-4.md`, which replaces every design and build rule from earlier rounds. 60 to 200 visible words. The first screen says in one plain sentence what Strapivo is. The copy lines above are a starting point: keep the meaning, improve the wording, and cut whatever the visual already says.
