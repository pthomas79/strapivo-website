import { clearSessionCookies } from '../_lib/session.js';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  clearSessionCookies(res);
  res.status(200).json({ ok: true });
}
