# Round two: concepts 41 to 50

Read `BRIEF.md` first. This file adds to it. Where the two differ, this file wins.

## 1. The bar

Round one produced 40 concept pieces. Eight were good enough to keep. These ten are different: each is a candidate for Strapivo's real main landing page.

**The five-second test.** A first-time visitor who sees only the header and the hero must know what Strapivo is, who it is for and what to do next. So the hero always has:

- one `h1`,
- one or two sentences that say in plain words what the product does,
- the primary call to action,
- one visual idea.

**One idea, then a normal page.** Your concept gives you one visual idea. Carry it through the page with discipline. Everything else is a well-paced landing page of five to seven sections that a busy person can scroll in a minute.

**Why most round-one pages failed.** Do not repeat these.

- They read as documents: a memo, a datasheet, a glossary.
- They showed dense mock product screens full of tiny text.
- The idea got in the way of the message. The visitor had to decode a museum, a newspaper or a slide deck before learning what the product is.
- They ran to 1,500 or 2,000 words.
- The phone layout was an afterthought.

**Hard limits.**

- 600 to 900 visible words. The count includes labels inside drawings. The upload script refuses a page above 1,000.
- At most three product illustrations on the page, unless your concept says otherwise. Each shows one mechanism, drawn large. The smallest text inside a drawing is 12 px at desktop width and still legible on a phone. No full dashboards.
- Design the 390 px layout on purpose. Body text is at least 16 px, tap targets at least 44 px, and nothing scrolls sideways at 360 px.
- Normal vertical scrolling only. No sideways scrolling, no scroll snapping, no section pinned for longer than one screen, no scroll-driven canvas. Elements may fade or slide in as they enter the screen, as long as all content is visible with JavaScript off and under reduced motion.
- Craft: one spacing scale, lines no longer than about 70 characters, a clear type scale, real hover and focus states, and a closing section as strong as the hero.

## 2. What already exists

Your page must not resemble any of these.

Round one: an executive classic, a board memo, an open letter, a Swiss grid with section numbers, a founding invitation, a product tour of mock screens, a security datasheet, a page for owner-managed companies, a data model for strategy chiefs, a before and after comparison, a long read, a list of hard questions, a case file that follows one decision for ten days, a page on the five options, one week as a calendar, a decision ledger, a session clock, a "cost of waiting" slider, a radar instrument, a manifesto, a self-check quiz, a lexicon, a ship's log on a nautical chart, a filing cabinet drawer, a floor plan, a live agenda, a sealed first take exercise, a newspaper, a brutalist page, a one-screen dashboard, a business model scan, twelve glasses, a weather forecast, a scripted chat with Vivo, a museum, an altitude descent through five roles, two companies over 120 days, a slide deck that archives itself, four thousand dots, and a page with tracked changes.

Round two, the other nine: one degree off course, the invitation to a session, "Strategy got slides", the design system analogy, signal discuss decide, the day after the offsite, the formula, a grid of product tiles, the product in numbers, and four to five hours of onboarding.

## 3. Added content from the 16 November 2026 deck

Use these where they fit your concept.

- "For leaders who already feel that an annual view is too slow."
- "A one degree course deviation today means a different continent in six months."
- "Helping you correct course once a week, so you never miss the mark."
- "Strategy gets reviewed once a year, but today's world doesn't wait that long."
- Three beats: Signal ("Radar flags a shift"), Discuss ("Team works it through with Vivo"), Decide. In everyday words: something changed, you need to talk about it, maybe you do something about it and maybe you don't.
- "The first proactive strategy system to invite you to a strategy session when your attention is needed."
- "Approved by you. Updated as you go. Never stale."
- "One source of truth. Every decision plugs into it."
- On the formula: you can buy monitoring and you can buy an AI conversation. Nobody else can sell the combination, because nobody else holds your approved strategy.
- What leadership teams say after a strategy project: the results were fine and the slides exist. What is missing is commitment, ownership and the feeling that any of it moves.
- Onboarding: "We do the reading first." "You walk into session one with a draft you can correct, not a blank page." "We show you what we got wrong." "You teach it what relevant means." "We use it, once, together." "Four to five hours, and then you run it."
- On data: start with public and non-sensitive material, and widen from there.

All truth rules in `BRIEF.md` section 4 still apply. No prices, no customer names, no testimonials, no invented statistics.

## 4. The live address

Your page goes live at `https://strapivo.com/landings/<your-folder>` with no trailing slash.

- Shared files stay `../../fonts/...` and `../../assets/logo/...`. They resolve correctly at the live address and from `file://`.
- Never link to `./` or `index.html`. Link the header logo to `#`.
- Footer links are `/imprint`, `/privacy` and `/terms`.

## 5. Screenshots that work

The command in `BRIEF.md` section 9 only shows the top of a page. Use this helper instead. It captures real scroll positions at the real screen size.

```bash
/tmp/strapivo-gen/shots.sh <your-folder> desktop        # four screens from the top, 1440 x 900
/tmp/strapivo-gen/shots.sh <your-folder> desktop 3600   # the next four, starting 3600 px down
/tmp/strapivo-gen/shots.sh <your-folder> mobile         # four screens from the top, 390 x 844
/tmp/strapivo-gen/shots.sh <your-folder> mobile 3376    # the next four
```

It prints the path of a PNG. Open it with the Read tool. Each frame is labelled with its position and the total page height, so you know how much is left. Look at the whole page at both sizes, fix what you see, and look again. Check 360 px too by passing `mobile360` as the mode.

## 6. Before you finish

Do these in order.

1. **Look at the whole page** at desktop and phone size with the helper. Fix what is broken or ugly. Then look once more with a critical eye and improve the weakest section.
2. **Run the unslop pass.** Read `/home/hiasinho/Work/strapivo-website/.claude/skills/unslop/SKILL.md` and apply every rule to all visible copy in your `index.html`, including labels inside drawings, alt text, the title and the meta description. Rewrite what fails.
3. **Upload.** Run `/tmp/strapivo-gen/upload.sh <your-folder>`. The script checks the page, commits your folder and publishes it. If it refuses, it tells you why. Fix that and run it again. Do not run any git command yourself.
4. **Reply** with three short lines: what you built, anything you could not do, and the one thing you would improve next. Add the live address the script printed.
