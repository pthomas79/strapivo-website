import { readSession } from './_lib/session.js';
import { listCommits } from './_lib/github.js';
import { resolveEditablePath } from './_lib/editable-files.js';

export default async function handler(req, res) {
  const session = readSession(req);
  if (!session) { res.setHeader('Cache-Control', 'no-store'); return res.status(401).json({ ok: false }); }
  const filePath = resolveEditablePath(req.query?.path);
  if (!filePath) { res.setHeader('Cache-Control', 'no-store'); return res.status(400).json({ ok: false, error: 'invalid_path' }); }
  try {
    const commits = await listCommits({ path: filePath, perPage: 10 });
    const repo = process.env.GITHUB_REPO || '';
    const edits = commits.map((c) => ({
      sha: c.sha, shortSha: c.sha.slice(0, 7),
      message: (c.commit?.message || '').split('\n')[0],
      author: { name: c.commit?.author?.name || 'unknown', email: c.commit?.author?.email || '' },
      date: c.commit?.author?.date || null,
      url: `https://github.com/${repo}/commit/${c.sha}`,
    }));
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ ok: true, path: filePath, edits });
  } catch (err) {
    return res.status(500).json({ ok: false, error: 'list_failed', detail: err?.message });
  }
}
