# 119. The mill

- Range: Fourth round: visual, few words
- Visual idea: A windmill whose tower stays put while its cap turns
- Direction: A three-colour linocut landscape: dusk-pink sky (#F1D3C4), ink-green land (#17383A), a near-black mill (#161A18) with cream sails (#F6EEDD). A bold slab serif in ink green.

## The task

Build a landing page for Strapivo as a single `index.html` in this folder. It is one of fifty fourth-round concepts. This round is about one image, one sentence and one button: highly visual, very few words, free of the brand's design rules.

## The concept

**The visual.** SVG, flat colours, no outlines. The horizon is low: the land is a band across the bottom 22% of the screen. The rest is sky. The h1 block (h1, sentence and button) sits on the sky, top left.

One tower mill stands 62% across, on the horizon.

- The tower: a tapered shape, 9vw wide at its base, 5vw at its top, 30vh tall, with one small cream window and a door.
- The cap: a low rounded hood on top of the tower.
- Four sails in a cross, fixed to the cap: each a ladder-like frame 24vh long and 3.5vh wide, in cream. They turn once every 14 seconds.
- The wind: fourteen thin cream lines of different lengths in the sky, drifting slowly to the right.

Two labels in cream: on the land at the foot of the tower, "The strategy holds." Beside the cap, "The tactics turn."

Pin the stage for about 250vh.

1. The wind lines slow, stop and begin to drift to the left. The sails slow to a stop.
2. The cap turns to face the new wind. Show this by narrowing the cross of sails to 15% of its width and widening it again (`scaleX`), over about a second.
3. The sails turn again at full speed.

**The words.**
- h1: "The tower stays. The cap turns."
- Plain sentence: Strapivo is where a leadership team holds its strategy steady and adjusts its tactics every week.
- With step 1: "The wind has changed. Stand still and the sails stop."
- Last line: "Not a new strategy every week. A small turn, made early."

**Phone.** The mill stands in the centre and the tower is 26vw wide at its base. The h1 block sits on the sky above the sails.

**Still.** The sails at rest as a diagonal cross, the wind lines, both labels.

## Standards

Read `../BRIEF.md` sections 1 to 5 for facts, audience, truth rules and calls to action. Then read `../BRIEF-ROUND-4.md`, which replaces every design and build rule from earlier rounds. 60 to 200 visible words. The first screen says in one plain sentence what Strapivo is. The copy lines above are a starting point: keep the meaning, improve the wording, and cut whatever the visual already says.
