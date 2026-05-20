import { readSession } from './_lib/session.js';
import { createIssue } from './_lib/github.js';
import { resolveEditablePath } from './_lib/editable-files.js';

const recent = new Map();
function rateLimitOk(key) {
  const now = Date.now();
  const arr = (recent.get(key) || []).filter((t) => now - t < 60_000);
  arr.push(now);
  recent.set(key, arr);
  return arr.length <= 10;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  const session = readSession(req);
  if (!session) return res.status(401).json({ ok: false, error: 'unauthenticated' });
  if (!rateLimitOk(session.email)) return res.status(429).json({ ok: false, error: 'rate_limited' });

  const body = typeof req.body === 'string' ? safeParse(req.body) : (req.body || {});
  const regionId = typeof body.regionId === 'string' ? body.regionId.trim() : '';
  const comment = typeof body.comment === 'string' ? body.comment.trim() : '';
  const filePath = resolveEditablePath(body.path);
  if (!filePath) return res.status(400).json({ ok: false, error: 'invalid_path' });
  if (regionId && (!/^[a-zA-Z0-9_.-]+$/.test(regionId) || regionId.length > 80))
    return res.status(400).json({ ok: false, error: 'invalid_region_id' });
  if (!comment || comment.length < 4) return res.status(400).json({ ok: false, error: 'comment_too_short' });
  if (comment.length > 2000) return res.status(400).json({ ok: false, error: 'comment_too_long' });

  const titleRegion = regionId ? `[${regionId}]` : '[page]';
  const title = `Admin comment ${titleRegion} on ${filePath}: ${comment.replace(/\s+/g, ' ').slice(0, 60)}${comment.length > 60 ? '…' : ''}`;

  const issueBody = [
    `**From:** ${session.name} <${session.email}>`,
    `**File:** \`${filePath}\``,
    `**Region:** ${regionId ? '`' + regionId + '`' : '_(page-level)_'}`,
    `**Submitted:** ${new Date().toISOString()}`,
    '', '---', '',
    '### Comment', '', comment, '',
    '<!-- cms-admin:meta',
    JSON.stringify({ path: filePath, regionId: regionId || null, email: session.email, name: session.name }),
    '-->',
  ].join('\n');

  try {
    const issue = await createIssue({ title, body: issueBody, labels: ['cms-queue'] });
    return res.status(200).json({ ok: true, path: filePath, issue: { number: issue.number, url: issue.url } });
  } catch (err) {
    return res.status(500).json({ ok: false, error: 'create_failed', detail: err?.message });
  }
}

function safeParse(s) { try { return JSON.parse(s); } catch { return {}; } }
