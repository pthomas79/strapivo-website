import { readSession } from './_lib/session.js';
import { getFile, putFile, getCommit } from './_lib/github.js';
import { notifyTelegram, escapeTelegramHtml } from './_lib/telegram.js';
import { resolveEditablePath } from './_lib/editable-files.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  const session = readSession(req);
  if (!session) return res.status(401).json({ ok: false, error: 'unauthenticated' });

  const body = typeof req.body === 'string' ? safeParse(req.body) : (req.body || {});
  const filePath = resolveEditablePath(body.path);
  if (!filePath) return res.status(400).json({ ok: false, error: 'invalid_path' });
  const targetSha = body.commitSha;
  if (typeof targetSha !== 'string' || !/^[a-f0-9]{7,40}$/i.test(targetSha))
    return res.status(400).json({ ok: false, error: 'invalid_commit_sha' });

  try {
    const commit = await getCommit(targetSha);
    const parent = commit.parents?.[0]?.sha;
    if (!parent) return res.status(404).json({ ok: false, error: 'no_parent' });
    const { content: parentContent } = await getFile(filePath, parent);
    const { sha: currentSha, content: currentContent } = await getFile(filePath);
    if (parentContent === currentContent) return res.status(200).json({ ok: true, noop: true });
    const shortTarget = targetSha.slice(0, 7);
    const message = `Revert admin edit ${shortTarget} on ${filePath}\n\nReverted by: ${session.name} <${session.email}>`;
    const result = await putFile({ path: filePath, content: parentContent, sha: currentSha, message,
      author: { name: session.name, email: session.email } });
    if (result.conflict) return res.status(409).json({ ok: false, error: 'conflict' });
    const commitSha = result.commit?.sha;
    const repo = process.env.GITHUB_REPO || '';
    const commitUrl = commitSha ? `https://github.com/${repo}/commit/${commitSha}` : null;
    await notifyTelegram([
      `<b>Admin edit reverted</b>`,
      `File: <code>${escapeTelegramHtml(filePath)}</code>`,
      `By: ${escapeTelegramHtml(session.name)}`,
      `Reverted: <code>${shortTarget}</code>`,
      commitUrl ? `<a href="${escapeTelegramHtml(commitUrl)}">View revert commit</a>` : '',
    ].filter(Boolean).join('\n')).catch(() => {});
    return res.status(200).json({ ok: true, path: filePath, commit: { sha: commitSha, message, url: commitUrl } });
  } catch (err) {
    console.error('rollback failed:', err?.message || err);
    return res.status(500).json({ ok: false, error: 'rollback_failed', detail: err?.message });
  }
}

function safeParse(s) { try { return JSON.parse(s); } catch { return {}; } }
