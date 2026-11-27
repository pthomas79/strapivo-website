# Round four: concepts 71 to 90

Seventy pages exist. They follow the brand and they explain. This round does neither. The owner's instruction, in their words: break the design, set yourself free from constraints, less is more, no noise, not lots of text, highly visual.

Read `BRIEF.md` sections 1 to 5 for the facts, the audience, the truth rules and the calls to action. Ignore its sections 6 to 9. Ignore `BRIEF-ROUND-2.md` and `BRIEF-ROUND-3.md`. This file replaces them.

## 1. The idea of this round

One image, one sentence, one button.

- **Show, do not explain.** If a section needs a paragraph, the visual is not doing its job. Fix the visual.
- **One visual idea, at full size.** It owns the screen. Nothing competes with it: no cards, no icon rows, no feature lists, no mock product screens, no interface fragments.
- **Empty space is material.** Use a lot of it.
- **The visual is the product of your work.** Spend most of your effort there. It should look like a poster, a title sequence or a piece in a gallery, not like a website section.

## 2. What you are free of

- **The brand system.** Any typeface from Google Fonts (two families at most) or the system, any weight, any colour, any radius, gradients, shadows, glass, grain. Your concept suggests a direction. You may go further.
- **The page skeleton.** No navigation, no "how it works", no trust section, no fixed section count. A page may be a single screen.
- **The scrolling rules.** Pinned stages, scroll-driven animation, full-bleed canvas and generative drawing are all allowed.

## 3. What still holds

- **The first screen answers two questions:** what is this, and what do I do. So it carries one `h1`, one plain sentence that says what Strapivo is, and a way to act. Example of a plain sentence: "Strapivo is where a leadership team keeps its strategy and corrects it every week." Write your own.
- **Words: 60 to 200 visible, everything counted**, including labels in the visual and the footer. The upload script refuses a page above 300. No sentence over 20 words. No block of more than two sentences. Text is at least 14 px, apart from the footer line.
- **Truth.** `BRIEF.md` section 4 applies in full. Name no companies and no people. No prices, no testimonials, no invented statistics.
- **Calls to action.** "Start the conversation" links to `mailto:strategy@strapivo.com`, at the end of the page and ideally on the first screen too. A small "Sign in" link to `https://strapivo.app` is optional. One footer line: © 2026 Strapivo, with links to `/imprint`, `/privacy`, `/terms`.
- **The logo appears once.** Use a file from `../../assets/logo/` (look at it first). Pick the ink or paper variant that suits your ground. Do not redraw the wordmark. This is the only fixed brand element.
- **One file.** `index.html` with inline CSS and vanilla JavaScript. No libraries. No external resources except Google Fonts. No images from the web. Add `<meta name="robots" content="noindex">`. Shared files are `../../fonts/...` and `../../assets/logo/...`. Never link to `./` or `index.html`; link the logo to `#`.
- **It works on a phone.** Design the 390 px layout on purpose and check 360 px. No sideways page scroll. Anything driven by a pointer needs a touch version or runs on its own.
- **It survives without motion.** With JavaScript off, or under `prefers-reduced-motion`, the page shows a composed still of the visual and all the words. The overview thumbnail is taken at 1440 by 900 with reduced motion on, so that still is the page's public face. Make it good.
- **It runs smoothly.** Animation loops stop when the visual is off screen or the tab is hidden. Cap the pixel ratio at 2. Prefer SVG and 2D canvas. Use WebGL only with a 2D fallback.
- **Access.** Text contrast at AA, visible focus states, keyboard access to every control, one text alternative for the visual.
- **Taste.** The reader is a chief executive or a board member. Bold, strange and beautiful are welcome. Cute, jokey, gamer and science-fiction cockpit are not. No emoji, no mascots, no stock imagery.
- **Copy.** British English, sentence case, no em dashes or en dashes, plain words.

## 4. The other nineteen

Yours must not look like any of these.

71 one ring that changes meaning. 72 a field of drifting lines. 73 a sentence whose ink fades. 74 five words that behave as they mean. 75 a single pulse line. 76 one continuous line drawing. 77 an ink tree that gets pruned. 78 growth rings, one per decision. 79 one large switch that turns the page on. 80 three glass layers pulled apart. 81 a transit map. 82 two-ink print posters. 83 a triangle, a circle and a square. 84 a quiet page of large serif type. 85 a sky that goes from night to dawn. 86 a dark page and a torch. 87 a split-flap departure board. 88 a letterboxed film in five shots. 89 an orrery. 90 a poster that fits one screen with no scrolling.

## 5. Looking at your page

```bash
/tmp/strapivo-gen/shots.sh <your-folder> desktop        # four screens from the top, 1440 x 900
/tmp/strapivo-gen/shots.sh <your-folder> desktop 3600   # the next four, starting 3600 px down
/tmp/strapivo-gen/shots.sh <your-folder> mobile         # four screens from the top, 390 x 844
/tmp/strapivo-gen/shots.sh <your-folder> mobile360      # the same at 360 x 780
```

It prints the path of a PNG. Open it with the Read tool. Each frame shows a real scroll position and is labelled with it and with the total page height. Scroll-driven and pinned pages show their true state at each position. Time-based animation is captured about nine seconds in.

```bash
/tmp/strapivo-gen/still.sh <your-folder> desktop   # the first screen with reduced motion on
/tmp/strapivo-gen/still.sh <your-folder> mobile
```

This is the still that the overview thumbnail shows.

## 6. Before you finish

Do these in order.

1. **Look at the visual** at desktop and phone size, at several scroll positions. Ask whether a stranger would stop and look at it. If it reads as a default, redo it. Then look at the still version with `still.sh`.
2. **Cut words.** Read every line and delete what the visual already says.
3. **Run the unslop pass.** Read `/home/hiasinho/Work/prot-strapivo-dynamic-strategy/.claude/skills/unslop/SKILL.md` and apply every rule to all visible copy, including labels in the visual, alt text, the title and the meta description.
4. **Upload.** Run `/tmp/strapivo-gen/upload.sh <your-folder>`. It checks the page, commits your folder and publishes it. If it refuses, it tells you why. Fix that and run it again. Do not run any git command yourself.
5. **Reply** with three short lines: what you built, anything you could not do, and the one thing you would improve next. Add the live address the script printed.
