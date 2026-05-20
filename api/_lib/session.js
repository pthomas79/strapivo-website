import crypto from 'node:crypto';

const SESSION_COOKIE = 'admin_session';
const HINT_COOKIE = 'admin_hint';
const OAUTH_STATE_COOKIE = 'oauth_state';
const SESSION_TTL_SEC = 7 * 24 * 60 * 60;

function b64urlEncode(input) {
  const buf = typeof input === 'string' ? Buffer.from(input, 'utf8') : Buffer.from(input);
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function b64urlDecode(s) {
  let t = s.replace(/-/g, '+').replace(/_/g, '/');
  while (t.length % 4) t += '=';
  return Buffer.from(t, 'base64');
}

function hmac(data, secret) {
  return b64urlEncode(crypto.createHmac('sha256', secret).update(data).digest());
}

export function sign(payload, { ttlSec = SESSION_TTL_SEC } = {}) {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error('SESSION_SECRET env var is not set');
  const full = { ...payload, exp: Math.floor(Date.now() / 1000) + ttlSec };
  const body = b64urlEncode(JSON.stringify(full));
  const sig = hmac(body, secret);
  return `${body}.${sig}`;
}

export function verify(token) {
  if (!token || typeof token !== 'string') return null;
  const secret = process.env.SESSION_SECRET;
  if (!secret) return null;
  const dot = token.indexOf('.');
  if (dot <= 0) return null;
  const body = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = hmac(body, secret);
  if (sig.length !== expected.length) return null;
  let diff = 0;
  for (let i = 0; i < sig.length; i++) diff |= sig.charCodeAt(i) ^ expected.charCodeAt(i);
  if (diff !== 0) return null;
  try {
    const payload = JSON.parse(b64urlDecode(body).toString('utf8'));
    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch { return null; }
}

export function parseCookies(header) {
  const out = {};
  if (!header) return out;
  for (const part of String(header).split(/;\s*/)) {
    const eq = part.indexOf('=');
    if (eq <= 0) continue;
    const k = part.slice(0, eq).trim();
    const v = part.slice(eq + 1).trim();
    try { out[k] = decodeURIComponent(v); } catch { out[k] = v; }
  }
  return out;
}

export function readSession(req) {
  const cookies = parseCookies(req.headers.cookie);
  return verify(cookies[SESSION_COOKIE]);
}

function cookieString(name, value, { maxAgeSec, httpOnly = true } = {}) {
  const parts = [`${name}=${encodeURIComponent(value)}`, 'Path=/', 'Secure', 'SameSite=Lax'];
  if (httpOnly) parts.push('HttpOnly');
  if (maxAgeSec !== undefined) parts.push(`Max-Age=${maxAgeSec}`);
  return parts.join('; ');
}

export function setSessionCookies(res, token, { maxAgeSec = SESSION_TTL_SEC } = {}) {
  res.setHeader('Set-Cookie', [
    cookieString(SESSION_COOKIE, token, { maxAgeSec, httpOnly: true }),
    cookieString(HINT_COOKIE, '1', { maxAgeSec, httpOnly: false }),
  ]);
}

export function clearSessionCookies(res) {
  res.setHeader('Set-Cookie', [
    cookieString(SESSION_COOKIE, '', { maxAgeSec: 0, httpOnly: true }),
    cookieString(HINT_COOKIE, '', { maxAgeSec: 0, httpOnly: false }),
  ]);
}

export function setOAuthStateCookie(res, token) {
  res.setHeader('Set-Cookie', cookieString(OAUTH_STATE_COOKIE, token, { maxAgeSec: 600, httpOnly: true }));
}

export function readOAuthStateCookie(req) {
  const cookies = parseCookies(req.headers.cookie);
  return verify(cookies[OAUTH_STATE_COOKIE]);
}

export function clearOAuthStateCookie(res) {
  return cookieString(OAUTH_STATE_COOKIE, '', { maxAgeSec: 0, httpOnly: true });
}

export { SESSION_COOKIE, HINT_COOKIE, OAUTH_STATE_COOKIE };
