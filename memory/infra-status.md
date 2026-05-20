# Infrastructure Status

## What's built and pushed

All code is in `main` branch of `pthomas79/strapivo-website`.

- All API files (auth, commit, comments, webhooks, rollback, recent-edits) ✅
- `admin.js` client-side overlay ✅
- `vercel.json` (cleanUrls: true) ✅
- GitHub Actions deploy workflow (`.github/workflows/deploy.yml`) ✅
- `cms-queue` label created on the GitHub repo ✅
- `index.html` — real Claude Design, 5 sections, 33 `data-edit` regions, admin bootstrap ✅
- `imprint.html` — European legal page, 6 `data-edit` regions (placeholders to fill), admin bootstrap ✅
- `styles.css`, `session-ui.js`, `assets/`, `fonts/` from handoff ✅
- `.vercelignore` (excludes `archive/`) ✅
- **Vercel project created + deployed to production** — `VERCEL_TOKEN` secret is set, GitHub Actions deploy runs on push to `main` and succeeds (production READY) ✅
- `www.strapivo.com` + `strapivo-website.vercel.app` aliased to production ✅

## What's NOT done yet

- ⚠️ Vercel **deployment protection is ON** — anonymous visitors get HTTP 403 on the prod URLs. Must be turned off (Vercel → Project → Settings → Deployment Protection) for the public marketing site to be reachable.
- Apex `strapivo.com` not resolving yet (HTTP 000) — only `www.strapivo.com` reaches Vercel. Add the apex A/ALIAS DNS record.
- No Vercel env vars set
- Google OAuth client not created
- GitHub fine-grained PAT not created (needed for GITHUB_TOKEN env var)
- Telegram bot not created yet (user said "later")
- GitHub webhook not registered (needs live Vercel URL first)
- Telegram webhook not registered (needs live Vercel URL first)

## Key identifiers

- GitHub repo: `pthomas79/strapivo-website`
- Vercel project: `strapivo-website` (id `prj_BL14wJUjnAFhtsvnLdv2ZOfkg1OG`)
- Vercel team: `Paris' projects` — slug `paris-projects-92a64a20`, id `team_6rWUuHi3o2UINILljihFvdRD`
- Vercel production URL: `strapivo-website.vercel.app` (also aliased: `www.strapivo.com`; apex `strapivo.com` DNS pending)
- Admin login domain: `strapivo.com`
- Site domain: `strapivo.com`

## Deploy

- Push to `main` → GitHub Actions (`.github/workflows/deploy.yml`) deploys to production via Vercel CLI (`--prod --name strapivo-website`, git metadata stripped). `workflow_dispatch` also available.
- `VERCEL_TOKEN` is configured as a repo Actions secret.
