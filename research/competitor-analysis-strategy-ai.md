# Competitive Analysis: Strategy.ai vs. Strapivo

**Date:** 2026-07-03
**Prepared for:** Paris (GTM/testing)
**Sources:** strategy.ai public site + pricing guidebook PDF (via search-indexed content — direct fetch was blocked by the session network policy, see Caveats), Strapivo Outline Product Brain + Testing collections, strapivo.com live copy.

---

## 1. Executive summary

Strategy.ai and Strapivo start from the **same core insight** — a company's strategy must live somewhere structured, governed, and machine-usable, because generic AI has no idea what your business actually decided — but they attack it from **opposite directions**:

- **Strategy.ai** is a **top-down enterprise infrastructure play**: a "Strategy Context Layer™" that turns board-approved plans, OKRs, and leadership decisions into governed context that *other AI tools* (copilots, agents, Salesforce, SharePoint, Workday embeds) query via API/MCP. The buyer is enterprise leadership/IT; the fear being sold is *ungoverned AI outputs* ("every tool, every day, operating on assumptions nobody has approved").
- **Strapivo** is a **bottom-up decision-defensibility play**: strategic memory + assumption stress-testing for the human who has to defend a decision in front of a board, client, or market. The fear we sell is *exposed strategic assumptions* ("you lose credibility not when you're wrong, but when you're uninformed").

**Net read:** not a head-on collision today, but a real one within 12–18 months. They govern strategy *for machines*; we sharpen strategy *for humans*. Both roads lead to owning the same asset — the canonical, versioned, approved model of "how this company intends to win." Whoever owns that asset owns the category. Their pricing and enterprise sales mechanics are genuinely instructive for us (especially the $20K pilot sized under signature thresholds); their product depth on *strategy thinking* looks shallow compared to ours.

---

## 2. Who Strategy.ai is

### Positioning
- Tagline/frame: **"Strategy Context Layer for Enterprise AI."**
- Problem: AI systems give teams answers that look useful but are "disconnected from enterprise priorities." Risk framing: "It's not one rogue AI output — it's every tool, every day, operating on assumptions nobody has approved."
- Solution: turn approved strategy artifacts into a structured model of "how your business intends to win" — goals, priorities, initiatives, KPIs, **assumptions, risks, constraints, tradeoffs, owners, time horizons** — and serve it to third-party AI via a **Strategy Access Gateway (API + MCP)**.

### Product surface
| Component | What it does |
|---|---|
| Strategy Context Layer™ | Governed, versioned, approval-tracked model of the approved strategy; pitched as replacing "system prompts" |
| Strategy Access Gateway | API + MCP access so third-party AI tools retrieve context, priorities, guardrails |
| Strategy Governance Console | Leaders review/approve strategic claims, resolve conflicting interpretations, retire outdated guidance |
| Decision-Strategy Audit Trail | Shows how an AI recommendation connects back to approved goals/assumptions/guardrails |
| Strategy Chat | Doc-grounded chat with ranked side-by-side source citations; embeddable widget in SharePoint/Salesforce/Workday; language switching; comment-to-document-owner feedback loop |
| Strategy Sidebar | Presentation companion — audience asks questions against the deck's controlled context |
| Data Quality | AI processes that scan/detect/rectify stale or inconsistent content |
| Services | AI Bootcamps (leadership teams / "AI Councils"), eLearning courses, podcasts |

### Pricing (their most interesting artifact — a public "Pricing & Engagement Guidebook" PDF)
- **Pilot: $20K, 90 days, 3 governed AI connections.** Explicitly "deliberately sized to sit below most single-manager or single-signature approval thresholds… usually approved as professional services spend under existing budget authority." Structured proof-of-concept with a defined decision point and three reportable milestones; all implementation/onboarding included.
- **Functional: $52K/year for 4 connections** (~$13K/connection). Shared support only, no dedicated CSM.
- **Enterprise: $75K base + $9K per connection** (e.g., 9 connections = $156K/yr). Multi-year discounts from year 2+.
- **Services rail: $2,000/day** for anything out of scope (extra document intake, custom integrations, extended training, post-year-one re-ingestion).
- Engagement model: **named Solutions Architect from day one**, quarterly reviews of leadership priorities to keep the governed layer current ("strategy changes every quarter").
- **Pricing metric = number of governed AI connections**, not seats. Value scales with how much of the AI estate they govern — clean expansion story.

### GTM
Classic enterprise sales-led: request-a-demo, contact-sales, downloadable pricing guidebook (transparency as a sales weapon), training bootcamps as a beachhead/relationship wedge, solutions pages per team (strategy, marketing, customer success, HR). Notably: **near-zero external footprint** — no funding announcements, reviews, or press found in a broad search. They look like a small/self-funded firm dressed in enterprise clothing (staging URLs are even indexed publicly — sloppy ops hygiene).

---

## 3. Where we might collide head-on

1. **The "canonical strategy context" asset.** Their Context Layer stores goals, priorities, *assumptions, risks, constraints, tradeoffs, owners, time horizons*. Our strategic memory stores business model context, *assumptions, evidence, confidence, freshness, decisions, rejected options* with provenance/trust states. These are near-identical data models built for different consumers (their: machines; ours: the human in the room). If a CSO asks "where does our strategy live in structured form?" — both products are the answer.
2. **The same buyer, eventually.** Their solutions page targets strategy teams and executives; our primary ICPs are CSOs, strategy offices, and consultants serving them. Today they enter via IT/AI-governance budgets and we enter via decision-prep pain, but it's the same executive sponsor.
3. **Audit-trail language.** Their "Decision-Strategy Audit Trail" and our "Exposed Assumptions Brief" both sell *defensibility* — "here's what this recommendation rests on." Expect messaging collision even before product collision.
4. **The name.** They own strategy.ai. In any "AI + strategy" search or word-of-mouth moment, they get free gravity. We should assume prospects will find them when evaluating us.

## 4. Where they diverge from us (white space, both directions)

- **They govern AI tools; we don't.** Strapivo treats AI mainly as a threat vector (AI Disruption lens) and a portfolio to evaluate — not as a fleet of enterprise tools needing shared context. That's their moat and our gap.
- **We think; they store.** Nothing on their site stress-tests the strategy itself. They take "board-approved strategy" as ground truth and distribute it. Strapivo's entire premise is that approved strategy is full of weak, stale, unstated assumptions — we pressure-test *before* approval. Their product would faithfully govern a broken business model; ours exists to catch that.
- **Bottom-up vs top-down.** Our MVP deliberately excludes team permissions, deep integrations, enterprise memory; theirs is nothing but that. Different first buyers, different sales cycles.
- **Their AI products look commodity.** Strategy Chat/Sidebar are RAG-with-citations doc chat — 2024-era table stakes, exactly the "generic AI chatbot" we explicitly refuse to be. The genuinely differentiated parts of their stack are the governance console and connection gateway, not the intelligence.

## 5. What we can learn from them

### Pricing lessons (the big ones)
1. **Price the pilot under the signature threshold.** Their $20K/90-day pilot "approvable as professional services spend under existing budget authority" is the single smartest thing on their site. We currently have *no pricing model* ("no alignment on what's free vs. paid" — Testing collection) and an unresolved freemium-vs-paid decision gating the Aug 12 keynote CTA. A **paid pilot with a defined decision point** matches our validated sales motion (pilot → work change → paid continuation) and dodges the freemium trap entirely. Our validation plan already asks "who would sponsor a pilot?" — they show what the productized answer looks like.
2. **Pick a value metric that isn't seats.** They charge per *governed AI connection* — a metric that scales with the value surface. Our analog candidates: per **business model / strategic entity**, per **stress-test workflow**, per **client engagement** (for consultants) — not per seat, since our ICP is a small senior team where seat-pricing caps revenue.
3. **Publish a pricing guidebook.** A downloadable PDF that explains *why* the pricing is shaped this way (approval thresholds, milestones, what's in scope) doubles as a sales-enablement artifact for our champion to forward internally. Cheap to produce, high trust signal, and it pre-answers procurement.
4. **Separate the services rail explicitly ($2K/day).** Protects margins and makes the SaaS price look clean. Relevant to us the moment consultants ask for white-label or bespoke lens work.
5. **Multi-year discounts only from year 2+.** Keeps year-1 price integrity while giving expansion levers.

### GTM / packaging lessons
6. **Named human accountability.** "A named Solutions Architect, not a ticketing system" — for a trust-critical product sold to executives, this beats our current unresolved "no manual onboarding at scale" tension. Possible synthesis: self-serve first value (<10 min, as required), *named human* for paid pilots only.
7. **Quarterly strategy reviews as a retention ritual.** "Strategy changes every quarter" → recurring touchpoint that keeps the context layer current. This is *our* freshness/staleness concept (`last_checked_at`, Stale-needs-recheck) turned into a billable cadence and a churn-killer. We should productize the **quarterly assumption re-check** the same way.
8. **Bootcamps as wedge.** Their AI bootcamps get them into leadership rooms before the platform sale. Michael's keynote channel is our version — but they've productized it into a standing offer rather than a one-off event.
9. **Solutions-by-team pages.** Their per-function pages (strategy, marketing, CS, HR) are how enterprise buyers self-qualify. When we're past single-wedge stage, per-ICP landing pages (CSO / strategy office / boutique consultancy) are the equivalent.

### Messaging lessons
10. **"Governed / approved / versioned" is executive-legible language.** They talk approval workflows and audit trails; we talk confidence labels and provenance. Same substance — theirs sounds like something a board signs off on. Our Customer Problems doc already owns "AI risk boundaries for strategy work: provenance, verification, confidence, human confirmation"; we should elevate that vocabulary in board-facing materials.

## 6. Where we're likely better

1. **Actual strategic intelligence.** Seven strategic lenses (incl. Strategyzer's Leader's Assessment), Paul's board-level CSO question set distilled from 60 years of strategy literature, role-based sparring (CFO/board/competitor/regulator), principles & anti-principles extraction, exposure/confidence labeling. They have *nothing* comparable — their intelligence layer is document retrieval.
2. **Time to first value.** Our requirement: company URL → useful strategic context in 5–10 minutes, agent conversation not a wizard. Their model: 90-day implementation program with a Solutions Architect. For a strategy leader with a board meeting Thursday, we win by weeks.
3. **Honesty as product.** Visible uncertainty, trust states on every data point, "drafts stay drafts until confirmed." Their marketing claims AI "understands" your documents — the confident-black-box framing our doctrine explicitly rejects. If our bet that "visible uncertainty increases trust" is right, we're differentiated where it matters most to skeptical executives.
4. **The compounding-memory loop for humans.** Our retention thesis (every session sharpens the memory; memory is the switching cost) has no equivalent on their side — their layer only updates when governance reviews it quarterly.
5. **Consultant motion.** They have no consultant/boutique story at all. If Matthias's consultant bet pays off, that's a channel they structurally can't serve (their pricing floor is $20K enterprise pilots).
6. **EU positioning.** "Built in Europe, in use with selected strategy teams across Europe" + our live legal/consent infrastructure is a real advantage for EU enterprise buyers; strategy.ai shows no EU posture.

## 7. Where they're ahead / threats to take seriously

1. **They have pricing; we don't.** Public, confident, mechanically clever pricing vs. our unresolved freemium debate. They can close revenue today.
2. **They ride the AI-governance budget wave.** "Govern your AI estate" attaches to live 2026 enterprise budgets (AI councils, compliance). Our budget line ("decision-quality infrastructure") still has to be created.
3. **MCP/API distribution.** Serving context *into* Copilot/Claude/agents means they benefit from every AI tool their customer adopts. Our "why not just Claude?" objection gets harder if a customer's Claude is already wired to strategy.ai's context layer. Strategic note: **an MCP endpoint for Strapivo's strategic memory would neutralize this** and fits our existing architecture thinking.
4. **The domain + category name.** "Strategy Context Layer" is a nameable category; strategy.ai is the URL you guess. We should decide whether to contest the "context layer" term or name our own category ("strategic memory," "assumption intelligence") and drive it hard.
5. **Enterprise trust artifacts.** Governance console, audit trail, support policy, ToS — procurement-ready furniture. We have Grant Thornton pen test + Nestlé/Nespresso/Lauft references; we should package them as visibly.

## 8. Recommended actions (ranked)

1. **Decide pricing with their model as reference:** paid pilot (€5–15K range, sized under a single-signature threshold for our smaller-company ICP), defined decision point, quarterly assumption re-check built into the annual price. Kills the freemium debate with a shape that matches our sales motion.
2. **Ship a pricing/engagement one-pager** (guidebook-lite) before the Aug 12 keynote — even if numbers are "pilot pricing on request," the *structure* signals maturity.
3. **Add "works with your AI stack" to the roadmap narrative:** an MCP endpoint exposing confirmed strategic memory to Claude/Copilot turns their moat into our feature and directly answers "why not just Claude?"
4. **Elevate governance vocabulary** (approved / versioned / audit-ready) in board-facing copy without abandoning the honesty positioning.
5. **Productize the quarterly re-check ritual** as the retention/renewal anchor.
6. **Add strategy.ai to a competitor watch list** (pricing page, resources PDF, release notes) — their pricing guidebook updates will telegraph their strategy shifts.
7. **Don't chase their enterprise integration surface now** — our launch exclusions (no deep integrations, no permissions) remain correct for the wedge; revisit after BMST validation.

## 9. Addendum: further pricing-guidebook details (extracted 2026-07-03)

Additional mechanics surfaced from deeper extraction of their pricing guidebook:

- **Pilot extension:** one 30-day extension only, at $6,000 (prorated from the $20K base); hard stop at 120 days — framed as "if you still can't decide, your internal governance isn't ready," which gracefully disqualifies bad-fit accounts.
- **Pilot fee is non-refundable** ("it covers the cost of delivering a real implementation") but explicitly no lock-in; they normalize clients returning 12–18 months later.
- **"You keep everything":** approved claim set, governance console export, strategy data schema, formal readout stay with the client — removes pilot risk perception without discounting.
- **No-negotiation policy, stated in writing:** "We do not negotiate the per-connection price or the platform fee as a matter of policy… our pricing is calibrated to what it actually costs to deliver the outcome we describe." Flex is confined to payment terms, instalments, year-2+ multi-year discounts (three-year rate lock = 5% off the per-connection fee), and onboarding scope.
- **Custom ROI model** per client based on AI usage volume and governance baseline; claims quantifiable value within 60 days of live operation.
- Post-pilot narrative: a live pilot outcome shifts procurement from "does this work?" to "how much should we spend scaling it?"

**Extra lessons for us:** the written no-negotiation policy + narrow named flex zones is a strong pattern for a two-person GTM (prevents every deal becoming a negotiation); the paid-pilot-with-dignified-exit ("keep everything," return later) removes the exact objection our consulting ICP would raise; and the 120-day hard stop is a qualification filter disguised as a policy.

## 10. Caveats

- Direct fetches of strategy.ai were blocked by this session's network policy (proxy CONNECT denied); all site/pricing details come from search-engine-indexed copies of their pages and their public PDFs. Figures ($20K/$52K/$75K+$9K/$2K-day) should be re-verified against the live pricing guidebook before quoting externally.
- No third-party coverage (funding, reviews, press) of strategy.ai was found — team size, traction, and funding are unknown; treat their enterprise polish as claims, not evidence.
- Strapivo-side facts reflect Outline as of 2026-07-03; several are explicitly unvalidated hypotheses (consultant ICP dispute, framework-vs-prompt blind test pending, WTP unknown).
