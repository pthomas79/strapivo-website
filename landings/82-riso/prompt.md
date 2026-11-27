# 82. Two inks

- Range: Fourth round: visual, few words
- Visual idea: Five stacked posters in a two-ink print look
- Direction: Warm uncoated paper (#F3EEE3), Azure and a fluorescent coral (#FF5A4F) overprinting to a dark third colour. Halftone screens, slight misregistration, paper grain. One condensed heavy grotesque.

## The task

Build a landing page for Strapivo as a single `index.html` in this folder. It is one of twenty fourth-round concepts. This round is about one image, one sentence and one button: highly visual, very few words, free of the brand's design rules.

## The concept

**The visual.** Five posters, each one full screen, stacked. They look printed on a two-drum stencil press: flat ink, visible halftone dots in the tints, a two or three pixel offset between the two inks, grain in the paper. Where the inks overlap they multiply.

Each poster is one big geometric form and one line of very large type.

1. A ring overprinted by a coral disc. "Strategy finally has a home."
2. A flat drawer front with one handle. "Agreed once. Filed."
3. A wedge of arrows crossing the sheet. "The world moves weekly."
4. Five bars of different lengths. "Hold. Adapt. Pivot. Take advantage. Not yet."
5. The ring alone, and the button.

Build the textures with CSS gradients, SVG patterns and `feTurbulence`. Use `mix-blend-mode: multiply` for the overprint.

**The words.** The five lines above, plus:
- Plain sentence on poster 1, small, like a print credit: Strapivo is where a leadership team keeps its strategy and corrects it every week.

**Phone.** Each poster is recomposed for portrait. Type gets taller, forms get cropped harder.

**Still.** The posters as they are. This page needs no motion beyond a gentle settle of the inks.

## Standards

Read `../BRIEF.md` sections 1 to 5 for facts, audience, truth rules and calls to action. Then read `../BRIEF-ROUND-4.md`, which replaces every design and build rule from earlier rounds. 60 to 200 visible words. The first screen says in one plain sentence what Strapivo is. The copy lines below are a starting point: keep the meaning, improve the wording, and cut whatever the visual already says.
