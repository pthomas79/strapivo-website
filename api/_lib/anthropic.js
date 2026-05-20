const BASE = 'https://api.anthropic.com/v1';
const DEFAULT_MODEL = 'claude-opus-4-7';
const ANTHROPIC_VERSION = '2023-06-01';

function env(name) {
  const v = process.env[name];
  if (!v) throw new Error(`${name} env var is not set`);
  return v;
}

export async function complete({ system, user, maxTokens = 4096, model = DEFAULT_MODEL }) {
  if (!user || typeof user !== 'string') throw new Error('anthropic.complete: `user` text is required');
  const body = { model, max_tokens: maxTokens, messages: [{ role: 'user', content: user }] };
  if (system) body.system = system;
  const res = await fetch(`${BASE}/messages`, {
    method: 'POST',
    headers: {
      'x-api-key': env('CLAUDE_API_KEY'),
      'anthropic-version': ANTHROPIC_VERSION,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let data = null;
  if (text) { try { data = JSON.parse(text); } catch {} }
  if (!res.ok) {
    const detail = data?.error?.message || text.slice(0, 300);
    throw new Error(`anthropic.complete failed status=${res.status} detail=${detail}`);
  }
  return (data?.content || []).filter((b) => b?.type === 'text').map((b) => b.text).join('');
}

export function extractJson(text) {
  if (typeof text !== 'string') return null;
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const candidate = fenced ? fenced[1].trim() : text.trim();
  const first = candidate.indexOf('{');
  const last = candidate.lastIndexOf('}');
  if (first === -1 || last === -1 || last <= first) return null;
  try { return JSON.parse(candidate.slice(first, last + 1)); } catch { return null; }
}
