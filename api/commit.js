import { readSession } from './_lib/session.js';
import { getFile, putFile } from './_lib/github.js';
import { sanitizePlainText, plainTextToHtml } from './_lib/sanitize.js';
import { notifyTelegram, escapeTelegramHtml } from './_lib/telegram.js';
import { resolveEditablePath } from './_lib/editable-files.js';

const recentCommits = new Map();
const RATE_WINDOW_MS = 10_000;
const RATE_MAX = 3;

function rateLimitOk(key) {
  const now = Date.now();
  const arr = (recentCommits.get(key) || []).filter((t) => now - t < RATE_WINDOW_MS);
  arr.push(now);
  recentCommits.set(key, arr);
  return arr.length <= RATE_MAX;
}

function replaceEditRegion(source, id, newInnerHtml) {
  const safeId = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const occurrences = (source.match(new RegExp(`data-edit=["']${safeId}["']`, 'g')) || []).length;
  if (occurrences === 0) return { ok: false, reason: 'not_found' };
  if (occurrences > 1) return { ok: false, reason: 'duplicate', count: occurrences };
  const openRe = new RegExp(`<([a-zA-Z][a-zA-Z0-9]*)\\b([^>]*?\\s)?data-edit=["']${safeId}["']([^>]*?)>`);
  const openMatch = openRe.exec(source);
  if (!openMatch) return { ok: false, reason: 'not_found' };
  const tagName = openMatch[1];
  const openEnd = openMatch.index + openMatch[0].length;
  const sameOpenRe = new RegExp(`<${tagName}\\b[^>]*>`, 'gi');
  const sameCloseRe = new RegExp(`</${tagName}\\s*>`, 'gi');
  let depth = 1;
  let cursor = openEnd;
  while (depth > 0) {
    sameOpenRe.lastIndex = cursor;
    sameCloseRe.lastIndex = cursor;
    const nextOpen = sameOpenRe.exec(source);
    const nextClose = sameCloseRe.exec(source);
    if (!nextClose) return { ok: false, reason: 'unclosed' };
    if (nextOpen && nextOpen.index < nextClose.index && !/\/>\s*$/.test(nextOpen[0])) {
      depth++;
      cursor = nextOpen.index + nextOpen[0].length;
    } else {
      depth--;
      if (depth === 0) {
        return { ok: true, source: source.slice(0, openEnd) + newInnerHtml + source.slice(nextClose.index) };
      }
      cursor = nextClose.index + nextClose[0].length;
    }
  }
  return { ok: false, reason: 'unclosed' };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  const session = readSession(req);
  if (!session) return res.status(401).json({ ok: false, error: 'unauthenticated' });
  if (!rateLimitOk(session.email)) return res.status(429).json({ ok: false, error: 'rate_limited' });

  const body = typeof req.body === 'string' ? safeParse(req.body) : (req.body || {});
  const filePath = resolveEditablePath(body.path);
  if (!filePath) return res.status(400).json({ ok: false, error: 'invalid_path' });

  const edits = Array.isArray(body.edits) ? body.edits : [];
  if (!edits.length) return res.status(400).json({ ok: false, error: 'no_edits' });
  if (edits.length > 50) return res.status(400).json({ ok: false, error: 'too_many_edits' });

  for (const e of edits) {
    if (typeof e.id !== 'string' || !/^[a-zA-Z0-9_.-]+$/.test(e.id) || e.id.length > 80)
      return res.status(400).json({ ok: false, error: 'invalid_id', id: e.id });
    if (typeof e.text !== 'string' || e.text.length > 5000)
      return res.status(400).json({ ok: false, error: 'invalid_text', id: e.id });
  }

  try {
    const { sha, content } = await getFile(filePath);
    let working = content;
    const applied = [];
    const missing = [];
    for (const e of edits) {
      const cleanText = sanitizePlainText(e.text);
      const html = plainTextToHtml(cleanText);
      const result = replaceEditRegion(working, e.id, html);
      if (!result.ok) { missing.push({ id: e.id, reason: result.reason }); continue; }
      working = result.source;
      applied.push({ id: e.id, text: cleanText });
    }
    if (!applied.length) return res.status(400).json({ ok: false, error: 'no_matching_regions', missing });
    if (working === content) return res.status(200).json({ ok: true, noop: true });

    const summary = applied.length === 1
      ? `Admin edit (${filePath}): ${applied[0].id}`
      : `Admin batch edit (${filePath}): ${applied.length} regions`;
    const detailLines = applied.map((e) => `- ${e.id}: ${e.text.slice(0, 120).replace(/\n/g, ' ')}`).join('\n');
    const message = `${summary}\n\nBy: ${session.name} <${session.email}>\n\n${detailLines}`;

    const result = await putFile({ path: filePath, content: working, sha, message,
      author: { name: session.name, email: session.email } });

    if (result.conflict) {
      return res.status(409).json({ ok: false, error: 'conflict', message: `Reload and try again.` });
    }

    const commitSha = result.commit?.sha;
    const repo = process.env.GITHUB_REPO || '';
    const commitUrl = commitSha ? `https://github.com/${repo}/commit/${commitSha}` : null;

    await notifyTelegram([
      `<b>Admin edit committed</b>`,
      `File: <code>${escapeTelegramHtml(filePath)}</code>`,
      `By: ${escapeTelegramHtml(session.name)}`,
      applied.map((e) => `• <code>${escapeTelegramHtml(e.id)}</code> — ${escapeTelegramHtml(e.text.slice(0, 80))}`).join('\n'),
      commitUrl ? `<a href="${commitUrl}">View commit</a>` : '',
    ].filter(Boolean).join('\n')).catch(() => {});

    return res.status(200).json({ ok: true, path: filePath, applied, missing,
      commit: { sha: commitSha, message: summary, url: commitUrl } });
  } catch (err) {
    console.error('commit failed:', err?.message || err);
    return res.status(500).json({ ok: false, error: 'commit_failed', detail: err?.message });
  }
}

function safeParse(s) { try { return JSON.parse(s); } catch { return {}; } }
