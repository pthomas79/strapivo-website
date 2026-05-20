# Tasks

## Active

- [ ] Receive Claude Design file from user → replace `index.html` with real HTML, add `data-edit` attributes to all editable regions, update `EDITABLE_FILES` in `api/_lib/editable-files.js` and `admin.js` to match actual pages

## Waiting On

- [ ] Claude Design file (user is preparing it)
- [ ] `VERCEL_TOKEN` — user needs to create at vercel.com/account/tokens and add as GitHub Actions secret on `pthomas79/strapivo-website`
- [ ] Google OAuth client ID + secret (Google Cloud Console)
- [ ] GitHub fine-grained PAT for `GITHUB_TOKEN` env var (Contents + Issues R/W on pthomas79/strapivo-website)
- [ ] Anthropic API key (`CLAUDE_API_KEY`)
- [ ] Telegram bot token + chat ID (user said "set up later")

## Someday

- [ ] Set Vercel env vars (all variables listed in `memory/env-vars.md`)
- [ ] Register GitHub webhook pointing to `https://strapivo.com/api/github-webhook`
- [ ] Register Telegram webhook via `setWebhook` curl
- [ ] Configure custom domain `strapivo.com` on Vercel
- [ ] End-to-end smoke test (login → edit → commit → comment → approve → revert)

## Done

- [x] Created GitHub repo `pthomas79/strapivo-website`
- [x] Built all API infrastructure (auth, commit, comments, github-webhook, telegram-webhook, rollback, recent-edits)
- [x] Built `admin.js` client-side overlay (edit mode, comment mode, history panel, rollback, sign out)
- [x] Created `vercel.json` and GitHub Actions deploy workflow (scope: `paris-5285`, project: `strapivo-website`)
- [x] Created `cms-queue` label on GitHub repo
- [x] Pushed initial commit to `main`
- [x] Confirmed Vercel scope: `paris-5285`
