# 104. Tailor's chalk

- Range: Fourth round: visual, few words
- Visual idea: Chalk marks on cloth, and one cut that a person makes
- Direction: A length of indigo wool (#2E4468) seen from above with a visible twill, chalk white (#F4F1EA) lines, one small woven label. A handwritten chalk face for the notes, a refined serif for the h1.

## The task

Build a landing page for Strapivo as a single `index.html` in this folder. It is one of fifty fourth-round concepts. This round is about one image, one sentence and one button: highly visual, very few words, free of the brand's design rules.

## The concept

**The visual.** Full-screen cloth: indigo with a fine twill (`repeating-linear-gradient` at 45 degrees, 3px pitch, slightly lighter) and a light `feTurbulence` grain. The h1 block (h1, sentence and button) sits on the left, in chalk white.

On the cloth, in SVG, two chalk outlines of the same pattern piece: a tall panel with one curved side, like the front of a jacket, about 56vh tall.

- Outline A, right of centre: dashed chalk, a small cross at each corner, and the chalk note "Proposed".
- Outline B, further right and running off the screen edge: smudged to 20% opacity, with the note "Rejected".

Chalk strokes are 3px wide with round caps, roughened with a displacement filter.

Pin the stage for about 250vh.

1. Outline A draws itself again from the top (animate `stroke-dashoffset`).
2. The cut: a dark line (#141C2B, 2px) follows outline A all the way round.
3. The piece inside the outline (a clipped copy of the cloth) moves 14px down and to the right. A shadow shows in the gap.
4. A small woven label, cream with a red stitched edge, appears sewn to the piece: "Confirmed by a person".

**The words.**
- h1: "Vivo marks the cloth. You make the cut."
- Plain sentence: Strapivo is where a leadership team keeps its strategy, with an AI that proposes changes and people who decide.
- Last line: "Chalk brushes off. A cut does not. So the cut is yours."

**Phone.** The h1 block sits at the top. Outline A fills 70% of the width below it. Outline B is mostly cut off by the right edge.

**Still.** The cut made, the piece shifted, the label on it, outline B faint beside it.

## Standards

Read `../BRIEF.md` sections 1 to 5 for facts, audience, truth rules and calls to action. Then read `../BRIEF-ROUND-4.md`, which replaces every design and build rule from earlier rounds. 60 to 200 visible words. The first screen says in one plain sentence what Strapivo is. The copy lines above are a starting point: keep the meaning, improve the wording, and cut whatever the visual already says.
