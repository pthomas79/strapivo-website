# Infrastructure Status

## What's built and pushed

All code is in `main` branch of `pthomas79/strapivo-website`.

- All API files (auth, commit, comments, webhooks, rollback, recent-edits) ✅
- `admin.js` client-side overlay ✅
- `vercel.json` (cleanUrls: true) ✅
- GitHub Actions deploy workflow (`.github/workflows/deploy.yml`) ✅
- `cms-queue` label created on the GitHub repo ✅
- Placeholder `index.html` with admin bootstrap snippet and stub `data-edit` attributes ✅

## What's NOT done yet

- Vercel project does not exist yet — GitHub Actions deploy failed (VERCEL_TOKEN secret not set in repo)
- index.html needs to be replaced with real Claude Design output
- No Vercel env vars set
- Google OAuth client not created
- GitHub fine-grained PAT not created (needed for GITHUB_TOKEN env var)
- Telegram bot not created yet (user said "later")
- GitHub webhook not registered (needs live Vercel URL first)
- Telegram webhook not registered (needs live Vercel URL first)
- Custom domain strapivo.com not configured on Vercel

## Key identifiers

- GitHub repo: `pthomas79/strapivo-website`
- Vercel project name (to be created): `strapivo-website`
- Vercel scope: `paris-5285`
- Admin login domain: `strapivo.com`
- Site domain: `strapivo.com`

## To unblock deploy (do this in order)

1. **First:** receive Claude Design file and replace `index.html` with real design (Active task in TASKS.md)
2. Add `VERCEL_TOKEN` as a GitHub Actions secret on `pthomas79/strapivo-website`
   (get token from vercel.com/account/tokens, full account scope)
3. The `git push` of the new index.html will trigger the workflow and auto-create the Vercel project
