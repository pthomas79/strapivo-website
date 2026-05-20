import { sign, setOAuthStateCookie } from '../_lib/session.js';

export default function handler(req, res) {
  const state = sign({ nonce: Math.random().toString(36).slice(2) }, { ttlSec: 600 });
  setOAuthStateCookie(res, state);

  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: `https://${req.headers.host}/api/auth/callback`,
    response_type: 'code',
    scope: 'openid email profile',
    state,
    hd: process.env.GOOGLE_WORKSPACE_DOMAIN || 'strapivo.com',
    prompt: 'select_account',
  });

  res.writeHead(302, { Location: `https://accounts.google.com/o/oauth2/v2/auth?${params}` });
  res.end();
}
