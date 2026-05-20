# CMS Architecture

Static site hosted on Vercel. No database. GitHub repo is the data store. Claude AI is the approval layer for non-technical edits.

## How it works

```
Browser (admin logged in)
    |
    |-- Edit Mode: POST /api/commit  ──────────────────────────────────────┐
    |                                                                       |
    |-- Comment Mode: POST /api/comments                                   |
         └──> GitHub Issue (label: cms-queue)                             |
                   └──> GitHub Webhook → /api/github-webhook              |
                              └──> Claude Opus drafts plan                |
                                        └──> Telegram (Approve/Decline)  |
                                                   └──> /api/telegram-webhook
                                                              └──> Claude Sonnet generates JSON patch
                                                                        └──> GitHub commit → Vercel redeploys (~45s)
```

## Key design decisions

- `data-edit="id"` attributes on HTML elements are the contract between the CMS and the HTML
- Claude never rewrites entire files — it generates a tiny JSON `{edits:[{find,replace}]}` patch
- Every commit is a real git commit; history and rollback are free
- Google SSO restricted to `strapivo.com` domain via `hd=` param
- Two cookies: `admin_session` (HttpOnly HMAC-signed) + `admin_hint` (visible to JS, triggers loading admin bundle)
- Every API endpoint re-validates the HMAC session — the hint cookie carries no authority

## File structure

```
api/
  _lib/
    editable-files.js   ← allowlist of HTML files the CMS can edit
    github.js           ← GitHub REST API wrapper
    session.js          ← HMAC-signed cookies
    anthropic.js        ← Claude API wrapper
    telegram.js         ← Telegram notifications
    sanitize.js         ← plain-text sanitizer for inline edits
  auth/
    login.js            ← initiates Google OAuth
    callback.js         ← handles OAuth redirect, sets cookies
    logout.js           ← clears cookies
    me.js               ← returns current session user
  commit.js             ← Phase A: batch inline edits → GitHub commit
  comments.js           ← Phase B entry: creates GitHub Issue
  github-webhook.js     ← Phase B: receives issue webhook, calls Claude for plan, pings Telegram
  telegram-webhook.js   ← Phase B: receives Approve/Decline, executes or declines
  recent-edits.js       ← returns last 10 commits to a file
  rollback.js           ← reverts a file to pre-commit state
admin.js                ← client-side admin overlay (loaded only for authenticated admins)
vercel.json             ← cleanUrls: true
.github/workflows/deploy.yml  ← strips .git then runs vercel deploy --prod
```

## Claude models used

- Plan drafting (github-webhook): `claude-opus-4-7`
- Edit execution (telegram-webhook): `claude-sonnet-4-6`
