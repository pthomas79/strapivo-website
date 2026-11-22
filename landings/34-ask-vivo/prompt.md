# 34 · Ask Vivo

Range: Experimental (concept 34 of 40, ordered from conservative to a bit nuts)
Audience: Executives who have tried a chatbot on strategy and were unimpressed
Colours: Paper, ink, Azure for Vivo. Five muted role colours: Auditor graphite #4A5560, Advisor navy #1F3A5F, Scout green #2E7D5B, Colleague Azure #0082E6, Researcher plum #6A4C7D.

## The task

Build a complete landing page for Strapivo as a single `index.html` in this folder (`landings/34-ask-vivo/`). It is one of 40 deliberately different concepts, so commit fully to this one and do not drift toward a generic software landing page.

Read `../BRIEF.md` first. It holds the facts about Strapivo and Dynamic Strategy, the truth rules, the brand (fonts, colour tokens, logo), the build rules and the finishing steps. The brief decides what is true and what the brand allows. This prompt decides everything else.

## The concept

"Any AI can answer a question. Only Strapivo answers it as you." The page demonstrates the difference with a scripted conversation. It is an illustration, not a live assistant, and a visible label says so: 'Scripted example. Nothing you select is sent anywhere.'

Hero: a question bar with five or six preset questions, including "Roast my business model.", "Will my business survive AI?", "What moved against the plan?", "Does this fit our principles?", "Where did this number come from?". Selecting one plays a short written exchange for a fictional company. The point of each answer is that it cites the company's own strategic memory: its Ambition, a named success criterion, a past decision by number, a principle it approved. Beside each answer, a 'Drawn from' panel lists those sources. Then a second view of the same question: 'A generic assistant would say', three bland lines, greyed.

A role switch changes who answers: Auditor, Advisor, Scout, Colleague, Researcher. The same question gets a visibly different answer in each role, in tone and in what it checks.

Below: what strategic memory holds, the rule that every recommendation traces back to memory you approved, where Vivo's authority ends ("Vivo proposes; people decide."), and how this conversation sits inside a session that ends in a recorded decision.

Signature element: the exchange and its sources panel. Text appears at reading pace, with a 'Show all' control and reduced-motion support. Write every scripted answer in full in the HTML.

## Standards

- Strapivo sells to SMEs and corporates. The result must be something a CEO would forward to their board: confident, well made, never playful for its own sake.
- Fonts and base colours are those of the current site (Inter 400 and 500, JetBrains Mono, Paper, Navy, Azure). The additional colours above are yours to use with a clear role.
- Craft matters more than volume. Spend your effort on the signature element and on the copy.
- Finish with the two steps in section 9 of the brief: screenshot and fix, then the unslop pass using `/home/hiasinho/Work/prot-strapivo-dynamic-strategy/.claude/skills/unslop/SKILL.md`.
