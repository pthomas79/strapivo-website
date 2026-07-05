# Strapivo Website
Static marketing site for Strapivo with an AI-gated CMS — no database, GitHub as data store, Claude as the approval layer.

## How we work here
Standard session protocol applies. On `checkpoint`: update files, banana-hunt until two clean rounds. On `resume`: read this file + TASKS.md, report where we left off and what's next.

## Current focus
Site is live and public on Vercel (`strapivo-website`, prod READY) at https://strapivo.com — `VERCEL_TOKEN` is set and the GitHub Actions deploy runs on push to `main`. Responsive pass complete across all sections. Legal pages COMPLETE and live: Imprint (`/imprint`), Privacy Policy (`/privacy`), Terms (`/terms`), plus a consent banner (`consent.js`) that gates PostHog (opted-out by default) with a "Cookie settings" control to withdraw consent. No separate cookie policy — covered in the Privacy Policy. Narrative: site copy repositioned around **strategic memory** (founder briefing, July 2026) — Strapivo is "the strategic memory layer for enterprise"; sessions are how you use the memory, the memory is what you own. Hero H1 and Paul's formula remain locked/verbatim. Remaining infra (all gated on secrets only the user can provide): set Vercel env vars, register the GitHub + Telegram webhooks, end-to-end CMS smoke test.

## Tasks
See [TASKS.md](TASKS.md) — Active section is the source of truth for what's next.

## Mini-brains
- [memory/cms-architecture.md](memory/cms-architecture.md) — how the CMS works end-to-end, file structure, design decisions
- [memory/infra-status.md](memory/infra-status.md) — what's built, what's not, key identifiers (repo, Vercel scope, domain)
- [memory/env-vars.md](memory/env-vars.md) — all environment variables needed, status of each, webhook registration commands
