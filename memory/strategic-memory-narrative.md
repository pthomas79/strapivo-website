# Briefing: The Strategic Memory Narrative

**Purpose:** Hand this to any agent updating strapivo.com. It explains what "strategic memory" is, how the product uses it, why it matters, and how to weave it into the website copy. It is self-contained — no access to Outline or other sources required.

**Origin:** Founder alignment, July 2026. Mathias (product co-founder), after reviewing the strategy.ai competitive analysis:

> "Strapivo is actually all about memory. The strategic memory layer for enterprise. Strategic intelligence and 'decisioning' keep the memory alive and adapt to changes. It keeps stakeholders informed and at the steering wheel. It amplifies great strategists and takes away the donkey work they hate doing and that takes time."

This is a **narrative elevation, not a pivot**. The site already gestures at memory ("It learns from every strategy session," "context already loaded," "your strategy room remembers"). The change: memory stops being a supporting feature of strategy sessions and becomes **the core asset the product exists to build**. Sessions are how you use the memory; the memory is what you own.

---

## 1. What strategic memory is

Strategic memory is the living, structured record of how a company intends to win — and what that intention rests on. Concretely, it holds:

- **Business model context** — products, value propositions, segments, channels, revenue streams, cost structure, market environment, competitors (the "Strategic Snapshot").
- **Assumptions** — every important belief the strategy relies on, each carrying a confidence label (High / Medium / Low / Unknown), an exposure label (Stable / Watch / Exposed / Urgent), and freshness (when it was last checked).
- **Evidence with provenance** — every data point is marked: AI draft, added by user, human-confirmed, needs evidence, rejected, or stale-needs-recheck. Nothing pretends to be more certain than it is.
- **Decisions and rejected options** — what was decided, what was ruled out, and *why*. The reasoning survives the meeting.
- **Principles and anti-principles** — "We do not compete primarily on price"-type commitments, confirmed and ranked by the user.

Two properties make it *memory* rather than a document store:

1. **It's alive.** Strategic intelligence (external signals, stress tests) and decisioning (what the user confirms, corrects, decides) continuously update it. Assumptions age, get rechecked, get re-labeled as the world changes.
2. **It compounds.** Every strategy session both draws on the memory and improves it. The user's judgment — confirmations, corrections, rejections — becomes part of the system. The more it's used, the sharper it gets.

## 2. How the product uses it

- **Session start:** the memory is already loaded — business model, environment, competitive landscape, past decisions, rejected options. No blank chat, no re-briefing the AI.
- **During work:** every stress test, assumption review, or context audit reads from and writes to the same memory. Three workflows, one compounding asset.
- **Validation loop:** the user accepts, edits, or rejects what the AI drafts. That act converts AI drafts into human-confirmed knowledge — this is how memory becomes *trusted* memory, and it is why the human stays at the steering wheel.
- **Over time:** stale items resurface for recheck; new signals attach to the specific assumptions they threaten; the next session starts smarter than the last.

## 3. Why it matters (three layers of the argument)

**For the customer (use this on the site):**
- Every other tool starts from scratch, every time. Generic AI has no memory of your business model, your last board decision, or what you ruled out last quarter. Consultants' reports freeze the moment they're delivered. Decks don't update themselves.
- Defensibility: when the board asks "what does this rest on?", the memory *is* the answer — assumptions, evidence, confidence, provenance, all traceable.
- Amplification: senior strategists stop spending their scarce time on donkey work — re-assembling context, reconciling sources, re-litigating settled questions — and spend it on judgment.

**For the business (context for the agent — do not publish):**
- Memory is the moat. Doctrine principle #10: "the more trusted strategic context Strapivo accumulates, the harder it is to replace with a generic tool." Compounding memory = switching cost = retention.

**Against competitors (context — publish only the implicit contrast, never name competitors):**
- Generic AI (ChatGPT/Claude): brilliant, amnesiac. The site's existing "starts from scratch" problem section already handles this — keep it.
- Enterprise "strategy context layer" plays (e.g. strategy.ai) store *approved* strategy as static, governed reference material for other AI tools. They file the strategy; nothing keeps it honest. Strapivo's memory is *alive* — it stress-tests, ages, and updates what's stored. The implicit line: **a filing cabinet remembers too; it just never tells you when it's wrong.**

## 4. The narrative, in copy-ready form

Core sentence (candidate positioning):
> **Strapivo is the strategic memory layer for your business.** Strategic intelligence and decision-making keep that memory alive — so it adapts as your market changes, keeps every stakeholder informed, and keeps you at the steering wheel.

Supporting beats (each maps to an existing site section):

| Beat | Message | Site section it upgrades |
|---|---|---|
| The asset | Your strategy finally has a home — a living memory of your business model, assumptions, evidence, and decisions | Hero ("Strategy has a home now" — keeps working, now with a concrete referent) |
| The problem | Everything else is amnesiac: generic AI, consultants' reports, decks — every answer starts from nothing | Problem section (already exists — sharpen with "memory" vocabulary) |
| Alive, not archived | Intelligence and decisions keep the memory current; assumptions age and get rechecked; signals attach to what they threaten | "How it works" loop (steps 2, 4, 5) |
| The steering wheel | You confirm, correct, reject — your judgment becomes part of the system; the AI drafts, you decide | Step 3 ("You bring your judgment") — elevate |
| Amplification | Great strategists freed from donkey work; sharper in every high-stakes conversation | Four-moments cards (Defend / Exploit / Explore / Plan) |
| Compounding | The more you use it, the sharper your strategy gets — and the harder it is to live without | Closing/access section (line already exists) |

Vocabulary rules (from product doctrine — binding):
- **Preferred verbs:** remember, surface, challenge, test, compare, pressure-test, verify, sharpen, compound.
- **Cautioned verbs:** recommend, decide, choose, prioritize. Never "AI strategist," never "autopilot," never language implying the AI owns the decision.
- **Honesty is a product value:** memory shows confidence and staleness; never imply certainty the system doesn't have. "Drafts stay drafts until confirmed."
- The user owns judgment, trade-offs, and final direction. Strapivo owns memory, evidence visibility, assumption tracking, and challenge.

## 5. Constraints for the website agent

1. **Don't invent enterprise features.** No team permissions, integrations, automated monitoring, or "enterprise memory" claims — those are explicitly out of the current MVP. "Strategic memory layer for enterprise" is a *direction* Mathias is naming, not a shipped capability; on the public site, anchor memory claims to what exists: persistent business context, assumption tracking with confidence/freshness, compounding sessions.
2. **Don't name competitors.** The contrast with amnesiac AI is fine (already on the site); the contrast with static context layers should stay implicit.
3. **Keep the existing voice:** confident, terse, board-room register, European. The current hero, four-moments structure, and five-step loop are validated scaffolding — *upgrade their language*, don't demolish them.
4. **Keep "Strategy has a home now."** Memory is what makes the home real; the two ideas reinforce each other ("a home" = where the memory lives).
5. **Preserve all `data-edit` attributes** on edited elements (the CMS depends on them) and the early-access CTA flow.
6. Claims must stay honest: "in use with selected strategy teams across Europe" — nothing bigger.

## 6. One-line summary for the agent

Reframe the site so that **persistent, living, human-confirmed strategic memory** is unmistakably the product's core asset — the reason sessions start smart, outputs are defensible, and value compounds — while keeping the existing structure, voice, honesty rules, and the human firmly at the steering wheel.
