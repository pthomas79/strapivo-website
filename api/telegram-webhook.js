import { getFile, putFile, getIssue, listIssueComments, addIssueComment, closeIssue } from './_lib/github.js';
import { complete, extractJson } from './_lib/anthropic.js';
import { answerCallbackQuery, editTelegramMessage, escapeTelegramHtml, notifyTelegram } from './_lib/telegram.js';
import { resolveEditablePath } from './_lib/editable-files.js';

export const config = { api: { bodyParser: false }, maxDuration: 60 };

const PLAN_MARKER = '<!-- cms-admin:plan -->';
const META_MARKER_RE = /<!--\s*cms-admin:meta\s*([\s\S]*?)\s*-->/;

async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  return Buffer.concat(chunks);
}

function parseMetaFromIssueBody(body) {
  if (!body) return {};
  const m = META_MARKER_RE.exec(body);
  if (!m) return {};
  try { return JSON.parse(m[1]) || {}; } catch { return {}; }
}

function extractUserComment(body) {
  if (!body) return '';
  const headerIdx = body.indexOf('### Comment');
  if (headerIdx === -1) return body.trim();
  const after = body.slice(headerIdx + '### Comment'.length);
  const metaIdx = after.indexOf('<!-- cms-admin:meta');
  return (metaIdx === -1 ? after : after.slice(0, metaIdx)).trim();
}

function buildExecPrompt({ comment, regionId, filePath, planMarkdown, fileContent }) {
  const brand = process.env.SITE_BRAND_DESCRIPTION || 'Preserve existing design. Surgical changes only.';
  const regionLine = regionId
    ? `The comment refers to the region marked \`data-edit="${regionId}"\` in ${filePath}.`
    : `The comment is page-level on ${filePath}.`;
  return [
    `You are executing an already-approved plan against \`${filePath}\`.`,
    'Produce a MINIMAL JSON patch describing only the bytes that need to change.',
    'You do NOT re-emit the file. The harness applies your patch literally.',
    '',
    '### Output format',
    '```json',
    '{ "edits": [ { "find": "<exact text from the current file>", "replace": "<new text>" } ] }',
    '```',
    '',
    '### Rules',
    '- `find` must appear EXACTLY ONCE in the file. Include enough context to be unique.',
    '- Multi-line find is fine — escape newlines as \\n in the JSON string.',
    '- Edits apply in order.',
    '- Preserve every data-edit="..." attribute. Do not remove the admin bootstrap script.',
    `- Brand: ${brand}`,
    '- Vanilla HTML/CSS/JS only.',
    '',
    '### Admin comment', regionLine, '',
    '> ' + comment.split('\n').join('\n> '), '',
    '### Approved plan', planMarkdown, '',
    `### Current ${filePath}`,
    '```html', fileContent, '```', '',
    'Now output the JSON patch.',
  ].join('\n');
}

function applyEdits(content, edits) {
  if (!Array.isArray(edits) || edits.length === 0) throw new Error('patch contained no edits');
  let result = content;
  for (let i = 0; i < edits.length; i++) {
    const e = edits[i];
    if (!e || typeof e.find !== 'string' || typeof e.replace !== 'string')
      throw new Error(`edit ${i + 1}: malformed`);
    if (e.find.length === 0) throw new Error(`edit ${i + 1}: find is empty`);
    const idx = result.indexOf(e.find);
    if (idx === -1) throw new Error(`edit ${i + 1}: find not found`);
    if (result.indexOf(e.find, idx + 1) !== -1) throw new Error(`edit ${i + 1}: find not unique`);
    result = result.slice(0, idx) + e.replace + result.slice(idx + e.find.length);
  }
  return result;
}

function validateNewContent(oldContent, newContent) {
  if (!newContent || newContent.length < 1000) return 'too_short';
  if (!/<\/html>\s*$/i.test(newContent)) return 'missing_html_close';
  const re = /data-edit=["']([a-zA-Z0-9_.-]+)["']/g;
  const oldIds = new Set(); const newIds = new Set(); let m;
  while ((m = re.exec(oldContent))) oldIds.add(m[1]);
  while ((m = re.exec(newContent))) newIds.add(m[1]);
  const missing = [...oldIds].filter((id) => !newIds.has(id));
  if (missing.length) return 'data_edit_dropped:' + missing.slice(0, 3).join(',');
  return null;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'method_not_allowed' });

  const expectedSecret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (!expectedSecret) return res.status(500).json({ ok: false, error: 'misconfigured' });
  if (req.headers['x-telegram-bot-api-secret-token'] !== expectedSecret)
    return res.status(401).json({ ok: false, error: 'bad_secret' });

  let raw;
  try { raw = await readRawBody(req); }
  catch { return res.status(400).json({ ok: false, error: 'bad_body' }); }

  let update;
  try { update = JSON.parse(raw.toString('utf8')); }
  catch { return res.status(400).json({ ok: false, error: 'bad_json' }); }

  const cb = update.callback_query;
  if (!cb) return res.status(200).json({ ok: true, ignored: 'not_callback' });

  const expectedChat = String(process.env.TELEGRAM_CHAT_ID || '');
  if (String(cb.from?.id || '') !== expectedChat) {
    await answerCallbackQuery(cb.id, { text: 'Not authorized.', showAlert: true });
    return res.status(200).json({ ok: true, ignored: 'unauthorized' });
  }

  const data = String(cb.data || '');
  const m = /^(approve|decline):(\d+)$/.exec(data);
  if (!m) {
    await answerCallbackQuery(cb.id, { text: 'Unknown action.' });
    return res.status(200).json({ ok: true, ignored: 'unknown_action' });
  }

  const action = m[1];
  const issueNumber = Number(m[2]);
  const messageId = cb.message?.message_id;

  await answerCallbackQuery(cb.id, { text: action === 'approve' ? 'Approved — applying…' : 'Declining…' });

  try {
    if (action === 'decline') {
      await addIssueComment(issueNumber, 'Declined via Telegram.');
      await closeIssue(issueNumber, { stateReason: 'not_planned' });
      if (messageId) await editTelegramMessage(messageId, `<b>Declined</b> · issue #${issueNumber} closed.`);
      return res.status(200).json({ ok: true, action, issueNumber });
    }

    const issue = await getIssue(issueNumber);
    if (issue.state !== 'open') {
      if (messageId) await editTelegramMessage(messageId, `<b>Already handled</b> · issue #${issueNumber}.`);
      return res.status(200).json({ ok: true, ignored: 'already_closed' });
    }

    const meta = parseMetaFromIssueBody(issue.body);
    const userComment = extractUserComment(issue.body);
    const filePath = resolveEditablePath(meta.path) || 'index.html';
    const comments = await listIssueComments(issueNumber);
    const planComment = [...comments].reverse().find((c) => (c.body || '').includes(PLAN_MARKER));
    if (!planComment) throw new Error('plan comment not found on issue');
    const planMarkdown = planComment.body.replace(PLAN_MARKER, '').replace(/^[\s\S]*?## Proposed plan \(Claude\)\s*/, '').trim();

    const { content: fileContent, sha } = await getFile(filePath);
    const claudeOut = await complete({
      model: 'claude-sonnet-4-6',
      system: 'You are a careful, surgical web editor. Output a minimal JSON patch — never the full file.',
      user: buildExecPrompt({ comment: userComment, regionId: meta.regionId, filePath, planMarkdown, fileContent }),
      maxTokens: 4096,
    });

    const patch = extractJson(claudeOut);
    if (!patch || !Array.isArray(patch.edits)) throw new Error('Claude output had no valid {edits:[…]} JSON');
    const newContent = applyEdits(fileContent, patch.edits);
    const validationErr = validateNewContent(fileContent, newContent);
    if (validationErr) throw new Error('validation failed: ' + validationErr);

    const message = `Phase B: apply approved plan for issue #${issueNumber} on ${filePath}\n\nApproved by ${meta.name || 'admin'} via Telegram.\nIssue: ${issue.html_url}`;
    const putResult = await putFile({ path: filePath, content: newContent, sha, message,
      author: { name: meta.name || 'admin', email: meta.email || 'admin@example.com' } });

    if (putResult.conflict) {
      await addIssueComment(issueNumber, 'Conflict: file changed while plan awaited approval. Re-open to retry.');
      if (messageId) await editTelegramMessage(messageId, `<b>Conflict</b> · file changed during approval.`);
      return res.status(200).json({ ok: false, error: 'conflict' });
    }

    const commitSha = putResult.commit?.sha;
    const repo = process.env.GITHUB_REPO || '';
    const commitUrl = commitSha ? `https://github.com/${repo}/commit/${commitSha}` : null;

    await addIssueComment(issueNumber, ['Applied.', commitUrl ? `Commit: ${commitUrl}` : '', 'Live in ~45s.'].filter(Boolean).join('\n'));
    await closeIssue(issueNumber, { stateReason: 'completed' });

    if (messageId) {
      await editTelegramMessage(messageId, [
        `<b>Applied</b> · issue #${issueNumber} closed.`,
        `File: <code>${escapeTelegramHtml(filePath)}</code>`,
        commitSha ? `Commit <a href="${escapeTelegramHtml(commitUrl)}">${commitSha.slice(0, 7)}</a>` : '',
        'Live in ~45s.',
      ].filter(Boolean).join('\n'));
    }

    return res.status(200).json({ ok: true, action, issueNumber, commit: commitSha });
  } catch (err) {
    console.error('telegram-webhook failed:', err?.message || err);
    if (messageId) {
      await editTelegramMessage(messageId, `<b>Failed</b> · issue #${issueNumber}: ${escapeTelegramHtml(String(err?.message || err).slice(0, 300))}`).catch(() => {});
    }
    return res.status(200).json({ ok: false, error: 'exec_failed', detail: err?.message });
  }
}
