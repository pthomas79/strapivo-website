# 102. Sealed

- Range: Fourth round: visual, few words
- Visual idea: Five sealed envelopes on green baize, opened at the same moment
- Direction: A table seen from directly above. Green baize (#1F5C45) with fine grain, cream envelopes (#F3EBDD) with soft shadows, red wax (#A3231F). A calm serif for the h1, a typewriter face on the cards.

## The task

Build a landing page for Strapivo as a single `index.html` in this folder. It is one of fifty fourth-round concepts. This round is about one image, one sentence and one button: highly visual, very few words, free of the brand's design rules.

## The concept

**The visual.** Full-screen baize: a flat green with an `feTurbulence` grain at low opacity. Darken the four corners slightly and nothing else. The h1 block (h1, sentence and button) sits top left, in cream.

Across the middle, five envelopes in a row, flap side up. Each is about 15vw wide and 10vw tall, turned between 4 degrees one way and 5 the other, with a soft shadow. Each has a triangular flap pointing down, closed with a small red wax seal. Above the row lies one face-up card with a question: "Supplier prices are up. What do we do?" and the word "Illustrative".

Pin the stage for about 220vh. Both steps happen to all five envelopes in the same frame. That is the point, so do not stagger them.

1. The seals split and the flaps swing open (CSS `rotateX` on the flap, hinged at its top edge).
2. A card rises out of each envelope by 60% of its height. The cards read "Adapt", "Hold", "Adapt", "Pivot" and "Not yet".

Build it in HTML and CSS.

**The words.**
- h1: "Five views, before anyone speaks."
- Plain sentence: Strapivo is where a leadership team runs its strategy sessions, and each member answers before the discussion starts.
- When the cards are out: "Sealed first takes, revealed together. The loudest voice cannot anchor the room."
- Last line, next to the button: "Then you talk. Then you decide."

**Phone.** Two rows: three envelopes above, two below, each 28vw wide. The question card sits above them and the h1 block above that.

**Still.** All five envelopes open, all five cards out, both captions showing.

## Standards

Read `../BRIEF.md` sections 1 to 5 for facts, audience, truth rules and calls to action. Then read `../BRIEF-ROUND-4.md`, which replaces every design and build rule from earlier rounds. 60 to 200 visible words. The first screen says in one plain sentence what Strapivo is. The copy lines above are a starting point: keep the meaning, improve the wording, and cut whatever the visual already says.
