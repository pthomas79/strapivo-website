import { readSession } from '../_lib/session.js';

export default function handler(req, res) {
  const session = readSession(req);
  if (!session) return res.status(401).json({ ok: false });
  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({ ok: true, email: session.email, name: session.name, picture: session.picture });
}
