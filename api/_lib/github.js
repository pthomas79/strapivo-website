const BASE = 'https://api.github.com';

function env(name) {
  const v = process.env[name];
  if (!v) throw new Error(`${name} env var is not set`);
  return v;
}

async function gh(method, path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${env('GITHUB_TOKEN')}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'site-admin-cms',
      ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let data = null;
  if (text) { try { data = JSON.parse(text); } catch {} }
  return { status: res.status, ok: res.ok, data, text };
}

export async function getFile(path, ref = 'main') {
  const r = await gh('GET', `/repos/${env('GITHUB_REPO')}/contents/${encodePath(path)}?ref=${encodeURIComponent(ref)}`);
  if (!r.ok) throw new Error(`GitHub getFile ${path}@${ref} failed status=${r.status} detail=${truncate(r.text)}`);
  return { sha: r.data.sha, content: Buffer.from(r.data.content, 'base64').toString('utf8') };
}

export async function putFile({ path, content, sha, message, author, branch = 'main' }) {
  const body = { message, content: Buffer.from(content, 'utf8').toString('base64'), sha, branch };
  if (author) { body.author = author; body.committer = author; }
  const r = await gh('PUT', `/repos/${env('GITHUB_REPO')}/contents/${encodePath(path)}`, body);
  if (r.status === 409 || (r.status === 422 && /does not match|sha/i.test(r.text))) {
    return { ok: false, conflict: true, status: r.status };
  }
  if (!r.ok) throw new Error(`GitHub putFile ${path} failed status=${r.status} detail=${truncate(r.text)}`);
  return { ok: true, commit: r.data?.commit };
}

export async function listCommits({ path, perPage = 10 }) {
  const r = await gh('GET', `/repos/${env('GITHUB_REPO')}/commits?path=${encodeURIComponent(path)}&per_page=${perPage}`);
  if (!r.ok) throw new Error(`GitHub listCommits ${path} failed status=${r.status} detail=${truncate(r.text)}`);
  return Array.isArray(r.data) ? r.data : [];
}

export async function getCommit(sha) {
  const r = await gh('GET', `/repos/${env('GITHUB_REPO')}/commits/${sha}`);
  if (!r.ok) throw new Error(`GitHub getCommit ${sha} failed status=${r.status} detail=${truncate(r.text)}`);
  return r.data;
}

export async function createIssue({ title, body, labels = [] }) {
  const r = await gh('POST', `/repos/${env('GITHUB_REPO')}/issues`, { title, body, labels });
  if (!r.ok) throw new Error(`GitHub createIssue failed status=${r.status} detail=${truncate(r.text)}`);
  return { number: r.data.number, url: r.data.html_url, id: r.data.id };
}

export async function getIssue(number) {
  const r = await gh('GET', `/repos/${env('GITHUB_REPO')}/issues/${number}`);
  if (!r.ok) throw new Error(`GitHub getIssue #${number} failed status=${r.status} detail=${truncate(r.text)}`);
  return r.data;
}

export async function addIssueComment(number, body) {
  const r = await gh('POST', `/repos/${env('GITHUB_REPO')}/issues/${number}/comments`, { body });
  if (!r.ok) throw new Error(`GitHub addIssueComment #${number} failed status=${r.status} detail=${truncate(r.text)}`);
  return r.data;
}

export async function listIssueComments(number, { perPage = 30 } = {}) {
  const r = await gh('GET', `/repos/${env('GITHUB_REPO')}/issues/${number}/comments?per_page=${perPage}`);
  if (!r.ok) throw new Error(`GitHub listIssueComments #${number} failed status=${r.status} detail=${truncate(r.text)}`);
  return Array.isArray(r.data) ? r.data : [];
}

export async function closeIssue(number, { stateReason = 'completed' } = {}) {
  const r = await gh('PATCH', `/repos/${env('GITHUB_REPO')}/issues/${number}`, {
    state: 'closed', state_reason: stateReason,
  });
  if (!r.ok) throw new Error(`GitHub closeIssue #${number} failed status=${r.status} detail=${truncate(r.text)}`);
  return r.data;
}

function encodePath(p) { return p.split('/').map(encodeURIComponent).join('/'); }
function truncate(s, n = 200) { return s && s.length > n ? s.slice(0, n) + '…' : (s || ''); }
