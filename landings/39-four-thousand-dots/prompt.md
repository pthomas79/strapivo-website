# 39 · Four thousand dots

Range: A bit nuts (concept 39 of 40, ordered from conservative to a bit nuts)
Audience: Executives who feel they cannot keep up with what is published
Colours: Paper ground, ink dots, Azure for what matters. One additional colour: a warm red #D2452F for the single dot that enters the danger zone.

## The task

Build a complete landing page for Strapivo as a single `index.html` in this folder (`landings/39-four-thousand-dots/`). It is one of 40 deliberately different concepts, so commit fully to this one and do not drift toward a generic software landing page.

Read `../BRIEF.md` first. It holds the facts about Strapivo and Dynamic Strategy, the truth rules, the brand (fonts, colour tokens, logo), the build rules and the finishing steps. The brief decides what is true and what the brand allows. This prompt decides everything else.

## The concept

Market intelligence reads "over 4,000 sources a day". The page draws them: four thousand small ink dots on a canvas that fills the first screen. That is the noise. Then, as the visitor scrolls, the field resolves, stage by stage, into the very little that matters.

Stages, each with one short line of copy set over or beside the field. All 4,000 dots: one day of sources. Most fade to faint grey: not about what you said must succeed. A few dozen turn Azure and gather into four clusters: read against your focus areas. Within the clusters, a handful remain after triage: relevant. One moves and turns red: a risk entering the top right, backed by a primary source. That one dot travels to the centre and becomes the O-mark ring: on Thursday's agenda. The ring resolves into a single line of mono text: a decision number.

Label the counts after the first as illustrative. Do not invent conversion statistics.

After the sequence, a compact conventional section explains the mechanism in words: the radar's search brief, source classes, triage, the primary-source rule, the agenda, the record. Then the call to action.

Signature element: the canvas. Use a 2D canvas sized for device pixel ratio, positions computed once from a seeded generator so the field is stable, transitions tied to scroll position and eased. It must stay smooth on a mid-range laptop: draw only on change. Reduced motion and no-JavaScript fallbacks show five static SVG frames of the stages. Copy on this page is sparse: let the field do the work.

## Standards

- Strapivo sells to SMEs and corporates. The result must be something a CEO would forward to their board: confident, well made, never playful for its own sake.
- Fonts and base colours are those of the current site (Inter 400 and 500, JetBrains Mono, Paper, Navy, Azure). The additional colours above are yours to use with a clear role.
- Craft matters more than volume. Spend your effort on the signature element and on the copy.
- Finish with the two steps in section 9 of the brief: screenshot and fix, then the unslop pass using `/home/hiasinho/Work/prot-strapivo-dynamic-strategy/.claude/skills/unslop/SKILL.md`.
