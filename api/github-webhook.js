import crypto from 'node:crypto';
import { getFile, addIssueComment } from './_lib/github.js';
import { complete } from './_lib/anthropic.js';
import { notifyTelegram, escapeTelegramHtml } from './_lib/telegram.js';
import { resolveEditablePath } from './_lib/editable-files.js';

export const config = { api: { bodyParser: false } };

const PLAN_MARKER = '<!-- cms-admin:plan -->';
const META_MARKER_RE = /<!--\s*cms-admin:meta\s*([\s\S]*?)\s*-->/;

async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  return Buffer.concat(chunks);
}

function verifySignature(rawBody, signatureHeader) {
  const secret = process.env.GITHUB_WEBHOOK_SECRET;
  if (!secret || !signatureHeader?.startsWith('sha256=')) return false;
  const expected = 'sha256=' + crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
  try { return crypto.timingSafeEqual(Buffer.from(signatureHeader), Buffer.from(expected)); } catch { return false; }
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

function buildPlanPrompt({ comment, regionId, filePath, fileContent }) {
  const brand = process.env.SITE_BRAND_DESCRIPTION ||
    'Preserve existing colors, fonts, and layout. Make surgical changes only.';
  const regionLine = regionId
    ? `The comment refers to the region marked \`data-edit="${regionId}"\` in ${filePath}.`
    : `The comment is page-level (no specific region) on ${filePath}.`;
  return [
    `You are the copy and design executor for this static website. The change targets \`${filePath}\`.`,
    'A non-technical admin has left a comment requesting a change.',
    'Draft a focused plan that a non-developer can approve at a glance.',
    '',
    '### Constraints',
    `- The site is vanilla HTML/CSS/JS (no build step). All styles live inside <style> in ${filePath}.`,
    `- Brand: ${brand}`,
    '- Stay surgical — small, targeted changes. Do not refactor unrelated sections.',
    '- Preserve every existing data-edit="..." attribute exactly.',
    '',
    '### Output format',
    '**Plan summary** — one sentence, plain English.',
    '',
    '**Changes** — 3 to 6 bullet points, each describing one concrete edit.',
    '',
    '**Risks / notes** — one or two lines on anything that might surprise the admin.',
    '',
    'Do NOT include code blocks or file content. Just the plan.',
    '',
    '### Admin comment',
    regionLine, '',
    '> ' + comment.split('\n').join('\n> '), '',
    `### Current ${filePath}`,
    '```html', fileContent, '```',
  ].join('\n');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'method_not_allowed' });

  let raw;
  try { raw = await readRawBody(req); }
  catch { return res.status(400).json({ ok: false, error: 'bad_body' }); }

  if (!verifySignature(raw, req.headers['x-hub-signature-256']))
    return res.status(401).json({ ok: false, error: 'bad_signature' });

  const event = req.headers['x-github-event'];
  if (event === 'ping') return res.status(200).json({ ok: true, pong: true });
  if (event !== 'issues') return res.status(200).json({ ok: true, ignored: 'event' });

  let payload;
  try { payload = JSON.parse(raw.toString('utf8')); }
  catch { return res.status(400).json({ ok: false, error: 'bad_json' }); }

  if (payload.action !== 'opened') return res.status(200).json({ ok: true, ignored: 'action' });
  const labels = (payload.issue?.labels || []).map((l) => l.name);
  if (!labels.includes('cms-queue')) return res.status(200).json({ ok: true, ignored: 'label' });

  const issueNumber = payload.issue.number;
  const issueUrl = payload.issue.html_url;
  const issueBody = payload.issue.body || '';
  const meta = parseMetaFromIssueBody(issueBody);
  const comment = extractUserComment(issueBody);
  const filePath = resolveEditablePath(meta.path) || 'index.html';

  try {
    const { content: fileContent } = await getFile(filePath);
    const planMarkdown = await complete({
      system: 'You are a careful, surgical web editor. Plain language only.',
      user: buildPlanPrompt({ comment, regionId: meta.regionId, filePath, fileContent }),
      maxTokens: 1200,
    });

    const planComment = [
      PLAN_MARKER,
      '## Proposed plan (Claude)', '',
      planMarkdown.trim(), '',
      '---',
      '_Reply via Telegram to Approve or Decline._',
    ].join('\n');

    await addIssueComment(issueNumber, planComment);

    const tgText = [
      '<b>New admin comment — plan ready</b>',
      `Issue <a href="${escapeTelegramHtml(issueUrl)}">#${issueNumber}</a> from ${escapeTelegramHtml(meta.name || 'admin')}`,
      `File: <code>${escapeTelegramHtml(filePath)}</code>`,
      meta.regionId ? `Region: <code>${escapeTelegramHtml(meta.regionId)}</code>` : '<i>Page-level</i>',
      '',
      `<i>Comment:</i> ${escapeTelegramHtml(comment.slice(0, 280))}${comment.length > 280 ? '…' : ''}`,
      '',
      '<b>Plan:</b>',
      escapeTelegramHtml(planMarkdown.trim().slice(0, 1500)),
    ].join('\n');

    await notifyTelegram(tgText, {
      replyMarkup: {
        inline_keyboard: [[
          { text: 'Approve', callback_data: `approve:${issueNumber}` },
          { text: 'Decline', callback_data: `decline:${issueNumber}` },
        ]],
      },
    });

    return res.status(200).json({ ok: true, issue: issueNumber });
  } catch (err) {
    console.error('github-webhook failed:', err?.message || err);
    notifyTelegram(`<b>Webhook error</b>\nIssue #${issueNumber}: ${escapeTelegramHtml(String(err?.message || err).slice(0, 300))}`).catch(() => {});
    return res.status(500).json({ ok: false, error: 'webhook_failed', detail: err?.message });
  }
}
