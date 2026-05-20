import { readOAuthStateCookie, clearOAuthStateCookie, sign, setSessionCookies } from '../_lib/session.js';

export default async function handler(req, res) {
  const statePayload = readOAuthStateCookie(req);
  if (!statePayload || statePayload.nonce == null) {
    return res.status(400).send('Invalid or expired state. Please try signing in again.');
  }

  const { code, state } = req.query || {};
  if (!code) return res.status(400).send('Missing authorization code.');
  if (state !== req.headers.cookie?.match(/oauth_state=([^;]+)/)?.[1]) {
    return res.status(400).send('State mismatch.');
  }

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `https://${req.headers.host}/api/auth/callback`,
      grant_type: 'authorization_code',
    }),
  });

  const tokenData = await tokenRes.json();
  if (!tokenRes.ok || !tokenData.id_token) {
    return res.status(400).send('Token exchange failed.');
  }

  const [, payloadB64] = tokenData.id_token.split('.');
  let claims;
  try {
    claims = JSON.parse(Buffer.from(payloadB64.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString());
  } catch {
    return res.status(400).send('Invalid ID token.');
  }

  const allowedDomain = process.env.GOOGLE_WORKSPACE_DOMAIN;
  if (!claims.email_verified || !claims.email || (allowedDomain && !claims.email.endsWith('@' + allowedDomain))) {
    return res.status(403).send('Account not allowed.');
  }

  const sessionToken = sign({ email: claims.email, name: claims.name, picture: claims.picture, sub: claims.sub });
  const clearState = clearOAuthStateCookie(res);
  const existing = res.getHeader('Set-Cookie') || [];
  res.setHeader('Set-Cookie', [
    ...(Array.isArray(existing) ? existing : [existing]),
    clearState,
  ]);
  setSessionCookies(res, sessionToken);
  res.writeHead(302, { Location: '/' });
  res.end();
}
