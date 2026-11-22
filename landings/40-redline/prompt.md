# 40 · Redline

Range: A bit nuts (concept 40 of 40, ordered from conservative to a bit nuts)
Audience: Strategy teams who know a strategy is never finished
Colours: Paper, ink, Azure for accepted text. Two additional colours: revision red #C0392B for deletions and proposal green #23805A for Vivo's pending suggestions.

## The task

Build a complete landing page for Strapivo as a single `index.html` in this folder (`landings/40-redline/`). It is one of 40 deliberately different concepts, so commit fully to this one and do not drift toward a generic software landing page.

Read `../BRIEF.md` first. It holds the facts about Strapivo and Dynamic Strategy, the truth rules, the brand (fonts, colour tokens, logo), the build rules and the finishing steps. The brief decides what is true and what the brand allows. This prompt decides everything else.

## The concept

A strategy is a living document, so this landing page is one too. It is shown with its tracked changes visible: struck-through earlier wording, inserted text, margin notes, and a decision number against every change. The page demonstrates what it describes: nothing changes without a recorded decision, and the reason stays attached.

The body is a complete landing page in normal reading order. Over it lies the revision layer. The headline carries a visible history: an earlier, weaker version struck through and the current one beside it, with a margin note such as 'SDS-2026-009 · Adapt · headline said what we are, not what you get. Dissent: one member preferred the old line.' Several paragraphs show the same treatment. Two passages carry pending suggestions in green marked 'Proposed by Vivo. Awaiting Owner.' with Accept and Reject controls that work: accepting turns the text Azure then ink and adds a line to a change log, rejecting restores the original and logs that as well. One question is marked 'Parked until 15 January 2027' with its trigger.

A switch at the top offers three views: 'Clean', 'Changes' and 'History'. History lists the change log as a small Record of Decisions. Default to 'Changes'.

Write the revisions with care: each earlier version should be a line a marketing team might plausibly have written, and each change should improve it for a stated reason. The page thereby also explains the product: accepted truth, proposals, Owner acceptance, the announcement of what changed and why.

Signature element: the revision layer. Proper `<del>` and `<ins>` markup, margin notes that become inline notes on mobile, and a 'Clean' view that reads as a finished, handsome page. With JavaScript off, show the Changes view.

## Standards

- Strapivo sells to SMEs and corporates. The result must be something a CEO would forward to their board: confident, well made, never playful for its own sake.
- Fonts and base colours are those of the current site (Inter 400 and 500, JetBrains Mono, Paper, Navy, Azure). The additional colours above are yours to use with a clear role.
- Craft matters more than volume. Spend your effort on the signature element and on the copy.
- Finish with the two steps in section 9 of the brief: screenshot and fix, then the unslop pass using `/home/hiasinho/Work/prot-strapivo-dynamic-strategy/.claude/skills/unslop/SKILL.md`.
