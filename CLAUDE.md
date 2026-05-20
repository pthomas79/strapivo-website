# Strapivo Website
Static marketing site for Strapivo with an AI-gated CMS — no database, GitHub as data store, Claude as the approval layer.

## How we work here
Standard session protocol applies. On `checkpoint`: update files, banana-hunt until two clean rounds. On `resume`: read this file + TASKS.md, report where we left off and what's next.

## Current focus
Site is deployed on Vercel (`strapivo-website`, prod READY) — `VERCEL_TOKEN` is set and the GitHub Actions deploy runs on push to `main`. ⚠️ Vercel deployment protection is still ON, so the prod URLs return 403 to anonymous visitors (turn off for public launch). Responsive pass underway (hero, session, problem, flywheel done). Next steps: disable deployment protection, fix apex `strapivo.com` DNS, set Vercel env vars, register the GitHub + Telegram webhooks.

## Tasks
See [TASKS.md](TASKS.md) — Active section is the source of truth for what's next.

## Mini-brains
- [memory/cms-architecture.md](memory/cms-architecture.md) — how the CMS works end-to-end, file structure, design decisions
- [memory/infra-status.md](memory/infra-status.md) — what's built, what's not, key identifiers (repo, Vercel scope, domain)
- [memory/env-vars.md](memory/env-vars.md) — all environment variables needed, status of each, webhook registration commands
