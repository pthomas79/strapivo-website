# Round three: concepts 51 to 70

Read `BRIEF.md` and `BRIEF-ROUND-2.md` first. This file adds to both. Where earlier briefs differ from this one, this file wins.

## 1. The bar

Round one produced 40 concept pieces; round two produced 10 landing page candidates. These 20 are the third round: each is a candidate for Strapivo's real main landing page ("1A landing page material").

**The five-second test.** A first-time visitor who sees only the header and the hero must know what Strapivo is, who it is for and what to do next. Every hero has:

- one `h1`,
- one or two sentences in plain words stating what Strapivo is and does,
- the primary call to action (`mailto:strategy@strapivo.com`),
- one visual idea that fills the desktop hero cleanly (never leave an empty right half on desktop).

**One idea, then a disciplined page.** Carry your concept's single visual idea through the page. Everything else is a well-paced landing page of five to seven sections that a senior, time-poor executive can scan in a minute. Mix calm, conservative craft with sharper editorial contrast where the concept asks for it, never playful.

**Hard limits (non-negotiable).**

- **Word count:** 600 to 900 visible words, including labels inside drawings. The upload script refuses any page above 1,000 or below 450.
- **Product drawings:** at most three product drawings on the page, unless your concept prompt specifies otherwise. Each shows one mechanism, drawn large. Smallest text inside a drawing is 12 px at desktop width and legible on a 360 px phone. No full dashboards.
- **Desktop hero balance:** never leave an empty right half in the desktop hero. Use either a balanced two-column split (copy on the left, main visual filling the right column) or a tight hero heading over a full-width visual strip visible above the fold.
- **Phone height ceiling:** design the 390 px layout on purpose. Keep total mobile page height under 8,500 px (ideally 4,800 to 7,500 px) and never above 9,000 px. Body text at least 16 px, tap targets at least 44 px, zero horizontal scroll at 360 px.
- **Always visible content:** normal vertical scrolling only. Never hide sections or elements at `opacity: 0` waiting for a scroll or entrance animation. Every section and graphic must be immediately visible at full contrast on load, with JavaScript off, and under `prefers-reduced-motion`.
- **No repetition of "over 4,000 sources a day":** do NOT use the phrase "over 4,000 sources a day" (or "4,000 sources") unless your own `prompt.md` explicitly authorizes it. Only two pages in round three (57 and 66) use that line.
- **Truth rules:** all rules in `BRIEF.md` section 4 apply strictly. No prices, no customer names, no testimonials, no invented statistics, no free trial or self-serve offer, no mention of founding places or how many are left. Name the founders only if your own `prompt.md` explicitly asks for it, with no biography beyond the roles listed in `BRIEF.md`. If you draw the Business Model Canvas, include the exact credit line: `Business Model Canvas adapted from Strategyzer.com, licensed under CC BY-SA 3.0.`

## 2. What already exists

Your page must not resemble any of these 69 other pages.

**Round one (01 to 40):** an executive classic, a board memo, an open letter, a Swiss grid with section numbers, a founding invitation, a product tour of mock screens, a security datasheet, a page for owner-managed companies, a data model for strategy chiefs, a before and after comparison, a long read, a list of hard questions, a case file that follows one decision for ten days, a page on the five options, one week as a calendar, a decision ledger, a session clock, a "cost of waiting" slider, a radar instrument, a manifesto, a self-check quiz, a lexicon, a ship's log on a nautical chart, a filing cabinet drawer, a floor plan, a live agenda, a sealed first take exercise, a newspaper, a brutalist page, a one-screen dashboard, a business model scan, twelve glasses, a weather forecast, a scripted chat with Vivo, a museum, an altitude descent through five roles, two companies over 120 days, a slide deck that archives itself, four thousand dots, and a page with tracked changes.

**Round two (41 to 50):** one degree off course, the invitation to a session, "Strategy got slides", the design system analogy, signal discuss decide, the day after the offsite, the formula, a dark bento grid of product tiles, the product in big numbers, and four to five hours of onboarding.

**Round three (51 to 70, the other 19):**
- 51: generic AI answer vs Vivo answering as you (side-by-side question comparison)
- 52: the human approval boundary ("Vivo proposes; people decide")
- 53: between inertia and thrash (three-band 12-month trajectory chart)
- 54: dissent on the record (two-column layout with a dedicated named-dissent margin)
- 55: "Light still green?" (honest status rail challenging stale green lights)
- 56: fourteen days in the danger zone (14-day escalation rule to "Needs you")
- 57: primary source required (two-stage filter stopping blog-post noise)
- 58: between board meetings (90-day quarterly arc into a ready board pack)
- 59: five roles in the room (Auditor, Advisor, Scout, Colleague, Researcher + Lenses)
- 60: not a to-do list, not a KPI dashboard (three-frame contrast by subtraction)
- 61: park it properly ("Not yet", return triggers and letting go with rationale)
- 62: hardwired to the Business Model Canvas (9-block schematic linked to signals and risks)
- 63: execution talks back (lightweight Contributor check-in feeding leadership sessions)
- 64: bring what you already have (method-agnostic intake from reports, emails and prompts)
- 65: one portfolio, many business models (portfolio-wide vs single-model risk scope)
- 66: Monday, Thursday, and the red line (quiet 7-day cadence with exception interruption)
- 67: before anyone speaks (five sealed executive first takes revealed together)
- 68: EU-only, human-approved (European sovereignty and decision provenance chain)
- 69: stop restarting the same argument (closed debate loop broken into a stepped record)
- 70: built for the strategy room (the founders, Business Model Canvas lineage and Strategic Design System)

## 3. Links, assets and metadata

Your page goes live at `https://strapivo.com/landings/<your-folder>` with no trailing slash.

- Include `<meta name="robots" content="noindex">` in `<head>`.
- Shared files: `../../fonts/...` and `../../assets/logo/...` only.
- Header logo links to `#`, never `./` or `index.html`.
- Header secondary link: "Sign in" to `https://strapivo.app`.
- Primary CTA: "Start the conversation" to `mailto:strategy@strapivo.com`.
- Footer: `© 2026 Strapivo` with links to `/imprint`, `/privacy`, `/terms`.
- Only external network request allowed: Google Fonts for JetBrains Mono (400 and 500). No analytics, no cookies, no third-party scripts, no forms that post anywhere.
- No em dashes (`—`), no en dashes (`–`), no `&mdash;` or `&ndash;`, no hyphens used as dashes anywhere in visible copy or HTML text.

## 4. Before you finish

Do these strictly in order:

1. **Screenshot and inspect the whole page** at 1440, 390 and 360 px wide using `/tmp/strapivo-gen/shots.sh`:
   ```bash
   /tmp/strapivo-gen/shots.sh <your-folder> desktop 0 4
   /tmp/strapivo-gen/shots.sh <your-folder> desktop 3600 4
   /tmp/strapivo-gen/shots.sh <your-folder> mobile 0 4
   /tmp/strapivo-gen/shots.sh <your-folder> mobile 3376 4
   /tmp/strapivo-gen/shots.sh <your-folder> mobile360 0 4
   ```
   Open every generated PNG with the Read tool. Check total height (mobile MUST be under 8,500 px), check that the desktop hero has no empty right half, check that no section is invisible or blank, check that there is zero sideways scroll at 360 px, and fix anything weak. Re-screenshot after fixing.
2. **Apply every rule of the unslop skill.** Read `/home/hiasinho/Work/prot-strapivo-dynamic-strategy/.claude/skills/unslop/SKILL.md` (the project's unslop skill) and apply every single rule to all visible copy in `index.html`, including labels inside drawings, alt text, `<title>` and meta description. Rewrite every sentence that fails. Verify zero em/en dashes, straight quotes only, British English, and 600 to 900 visible words.
3. **Upload via the script only.** Run `/tmp/strapivo-gen/upload.sh <your-folder>`. If it refuses, fix the reason and run it again. Do not run any git command yourself and do not spawn subagents.
4. **Reply** in three concise lines (what you built, anything you could not do, one thing you would improve next) plus the live address printed by `upload.sh`.
