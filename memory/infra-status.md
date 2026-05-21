# Infrastructure Status

## What's built and pushed

All code is in `main` branch of `pthomas79/strapivo-website`.

- All API files (auth, commit, comments, webhooks, rollback, recent-edits) ✅
- `admin.js` client-side overlay ✅
- `vercel.json` (cleanUrls: true) ✅
- GitHub Actions deploy workflow (`.github/workflows/deploy.yml`) ✅
- `cms-queue` label created on the GitHub repo ✅
- `index.html` — real Claude Design, 5 sections, 33 `data-edit` regions, admin bootstrap ✅
- `imprint.html` — legal imprint, filled with Strapivo Ltd (Cyprus, HE 492139), live at `/imprint` ✅
- `privacy.html` — GDPR/Cyprus privacy policy (+ cookie list), live at `/privacy` ✅
- `terms.html` — website terms (Cyprus governing law), live at `/terms` ✅
- `consent.js` — cookie-consent banner gating PostHog (opted-out by default) + "Cookie settings" withdrawal control, on every page ✅
- All 4 public pages registered in `EDITABLE_FILES` (`api/_lib/editable-files.js` + `admin.js`) ✅
- `styles.css`, `session-ui.js`, `assets/`, `fonts/` from handoff ✅
- `.vercelignore` (excludes `archive/`) ✅
- **Vercel project created + deployed to production** — `VERCEL_TOKEN` secret is set, GitHub Actions deploy runs on push to `main` and succeeds (production READY) ✅
- Site is public at https://strapivo.com — deployment protection disabled, apex + `www` DNS resolving ✅

## What's NOT done yet

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
- Vercel production URL: `strapivo.com` (also `www.strapivo.com`, `strapivo-website.vercel.app`)
- Admin login domain: `strapivo.com`
- Site domain: `strapivo.com`

## Deploy

- Push to `main` → GitHub Actions (`.github/workflows/deploy.yml`) deploys to production via Vercel CLI (`--prod --name strapivo-website`, git metadata stripped). `workflow_dispatch` also available.
- `VERCEL_TOKEN` is configured as a repo Actions secret.
