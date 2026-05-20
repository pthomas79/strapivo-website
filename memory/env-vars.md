# Environment Variables

All of these need to be set in Vercel (Project → Settings → Environment Variables, production).
The `VERCEL_TOKEN` goes in GitHub Actions secrets (not Vercel).

| Variable | How to get it | Status |
|---|---|---|
| `GOOGLE_CLIENT_ID` | Google Cloud Console → OAuth 2.0 Credentials | ⏳ not created |
| `GOOGLE_CLIENT_SECRET` | Same credential | ⏳ not created |
| `GOOGLE_WORKSPACE_DOMAIN` | `strapivo.com` | ✅ known |
| `SESSION_SECRET` | `openssl rand -hex 32` | ⏳ not generated |
| `TELEGRAM_BOT_TOKEN` | @BotFather on Telegram | ⏳ user said "later" |
| `TELEGRAM_CHAT_ID` | @userinfobot on Telegram (numeric user ID) | ⏳ user said "later" |
| `TELEGRAM_WEBHOOK_SECRET` | `openssl rand -hex 32` | ⏳ not generated |
| `GITHUB_TOKEN` | GitHub → fine-grained PAT (Contents + Issues R/W on pthomas79/strapivo-website) | ⏳ not created |
| `GITHUB_REPO` | `pthomas79/strapivo-website` | ✅ known |
| `GITHUB_WEBHOOK_SECRET` | `openssl rand -hex 32` | ⏳ not generated |
| `CLAUDE_API_KEY` | console.anthropic.com | ⏳ not provided |
| `SITE_BRAND_DESCRIPTION` | Short description of brand colors/fonts | ⏳ waiting for Claude Design file |
| `VERCEL_TOKEN` | vercel.com/account/tokens (full account scope) → GitHub Actions secret | ⏳ not created |

## Google OAuth redirect URIs to add

- `https://strapivo.com/api/auth/callback`
- `https://strapivo-website.vercel.app/api/auth/callback` (or whatever the preview URL ends up being)

## Webhook registration commands (run after first deploy)

```bash
# GitHub: set in repo Settings → Webhooks
# Payload URL: https://strapivo.com/api/github-webhook
# Content type: application/json
# Secret: GITHUB_WEBHOOK_SECRET value
# Event: Issues only

# Telegram (run once after deploy):
curl "https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/setWebhook" \
  -d "url=https://strapivo.com/api/telegram-webhook" \
  -d "secret_token=<TELEGRAM_WEBHOOK_SECRET>"
```
