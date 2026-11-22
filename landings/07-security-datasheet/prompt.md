# 07 · The security and governance datasheet

Range: Conservative (concept 7 of 40, ordered from conservative to a bit nuts)
Audience: Corporate IT, risk, legal and procurement
Colours: Paper, ink, Azure. One additional colour: slate green #2F5D50 for 'yes, by design' markers.

## The task

Build a complete landing page for Strapivo as a single `index.html` in this folder (`landings/07-security-datasheet/`). It is one of 40 deliberately different concepts, so commit fully to this one and do not drift toward a generic software landing page.

Read `../BRIEF.md` first. It holds the facts about Strapivo and Dynamic Strategy, the truth rules, the brand (fonts, colour tokens, logo), the build rules and the finishing steps. The brief decides what is true and what the brand allows. This prompt decides everything else.

## The concept

The page a CISO, a data protection officer and a procurement lead read before the CEO is allowed to say yes. Sober, dense, well organised. It answers "can we trust an AI near our strategy?" with mechanisms, not adjectives.

Structure: a short hero that states the position ("Humans decide. Humans validate."); a 'What the AI may do / what it may never do' two-column table drawn from the brief (Vivo proposes placements, triage, ghost moves, agendas, drafts; Vivo never changes accepted truth, a light or a risk position on its own); the authority model (Owner, Admin, Member, Contributor, 'Can lead sessions', 'Can triage signals', escalation and Owner acceptance); the audit trail (trail of confirmed moves, numbered decisions, dissent by name, every hand-off of a signal recorded); data and hosting ("EU-only infrastructure. GDPR by design."), stated only as far as the brief goes; exports in open formats; a questions section for procurement.

Do not invent certifications, penetration test results, SLAs, retention periods or sub-processor names. Where a reader would expect one, say "Ask us" and link the call to action.

Signature element: a specification-sheet layout with a fixed left rail of section numbers, tabular rows, mono labels, and a compact 'at a glance' panel at the top. It should print well.

## Standards

- Strapivo sells to SMEs and corporates. The result must be something a CEO would forward to their board: confident, well made, never playful for its own sake.
- Fonts and base colours are those of the current site (Inter 400 and 500, JetBrains Mono, Paper, Navy, Azure). The additional colours above are yours to use with a clear role.
- Craft matters more than volume. Spend your effort on the signature element and on the copy.
- Finish with the two steps in section 9 of the brief: screenshot and fix, then the unslop pass using `/home/hiasinho/Work/prot-strapivo-dynamic-strategy/.claude/skills/unslop/SKILL.md`.
