# Tasks

## Active

- [ ] Legal pages — Terms & Conditions next (Imprint + Privacy Policy live; cookie-consent banner live)
- [ ] Set all Vercel env vars (see `memory/env-vars.md`)
- [ ] Register GitHub webhook (Settings → Webhooks, Issues event only, secret = `GITHUB_WEBHOOK_SECRET`)
- [ ] Register Telegram webhook via `setWebhook` curl (after first deploy)

## Waiting On

- [ ] Google OAuth client ID + secret (Google Cloud Console)
- [ ] GitHub fine-grained PAT for `GITHUB_TOKEN` env var (Contents + Issues R/W on pthomas79/strapivo-website)
- [ ] Anthropic API key (`CLAUDE_API_KEY`)
- [ ] Telegram bot token + chat ID (user said "set up later")

## Someday

- [ ] Set Vercel env vars (all variables listed in `memory/env-vars.md`)
- [ ] Register GitHub webhook pointing to `https://strapivo.com/api/github-webhook`
- [ ] Register Telegram webhook via `setWebhook` curl
- [ ] End-to-end smoke test (login → edit → commit → comment → approve → revert)

## Done

- [x] Created GitHub repo `pthomas79/strapivo-website`
- [x] Built all API infrastructure (auth, commit, comments, github-webhook, telegram-webhook, rollback, recent-edits)
- [x] Built `admin.js` client-side overlay (edit mode, comment mode, history panel, rollback, sign out)
- [x] Created `vercel.json` and GitHub Actions deploy workflow (scope: `paris-5285`, project: `strapivo-website`)
- [x] Created `cms-queue` label on GitHub repo
- [x] Pushed initial commit to `main`
- [x] Confirmed Vercel scope: `paris-5285`
- [x] Imported Claude Design handoff — replaced placeholder `index.html` with real 5-section design
- [x] Added `imprint.html`, `styles.css`, `session-ui.js`, `assets/`, `fonts/` from handoff
- [x] Added `data-edit` attributes to 33 regions in `index.html`, 6 regions in `imprint.html`
- [x] Added admin bootstrap snippet + hidden Admin footer link to both pages
- [x] Added `.vercelignore` (excludes `archive/`)
- [x] Updated `EDITABLE_FILES` in `api/_lib/editable-files.js` and `admin.js` to include both pages
- [x] Hero responsive: show Ovatar + live-output card on all screen sizes (were hidden <1024px), anchored to card corner, no right-edge clip; reset default 8px body margin
- [x] Session responsive: browser-frame URL truncates to one line (ellipsis) instead of wrapping
- [x] Problem responsive: mode labels (DEFEND/EXPLOIT/…) sized to fit cards (were overflowing even on desktop); cards pin + stack on scroll on mobile via native position:sticky
- [x] Flywheel responsive: mobile is now a connected vertical timeline (engine Ovatar + rail + loop cue); auto-cycling active step adds interactivity on desktop + mobile
- [x] `VERCEL_TOKEN` set + Vercel project `strapivo-website` deployed to production via GitHub Actions (push to `main`); responsive build verified live
- [x] `www.strapivo.com` aliased to the production deployment
- [x] Responsive pass complete across all sections (hero, session, problem, flywheel, access/CTA, footer, quote band) — confirmed OK on device
- [x] Site made public (Vercel deployment protection disabled) and `strapivo.com` domain resolving
- [x] Imprint page filled with Strapivo Ltd (Cyprus, HE 492139) and deployed live at strapivo.com/imprint
- [x] Privacy Policy page (GDPR/Cyprus) added at strapivo.com/privacy + footer links wired
- [x] Cookie-consent banner (`consent.js`): PostHog opted-out by default, gated behind Accept; form submit counts as consent
