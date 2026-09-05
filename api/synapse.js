/* SYNAPSE — the wire CORTEX (this room, the frontend) and NEUTRON (the
   backend at neutron-app.vercel.app) talk over. The bus itself lives in
   Neutron's Postgres; this function is the room's end of the wire: it adds
   the shared key so the page stays keyless, and Neutron answers in the same
   request. Without NEUTRON_URL it falls back to the old gist bus. */

const FROM_OK = new Set(['CORTEX', 'NEUTRON', 'JARVIS', 'HUMAN']);
const KEEP = 40;

async function viaNeutron(req, res, base) {
  const key = process.env.SYNAPSE_KEY || '';
  if (req.method === 'GET') {
    const after = String(req.query.after || '');
    const r = await fetch(base + '/api/synapse' + (after ? '?after=' + encodeURIComponent(after) : ''), { headers: { 'x-synapse-key': key } });
    const j = await r.json().catch(() => ({ messages: [] }));
    res.status(r.ok ? 200 : 502).json(j);
    return;
  }
  if (req.method === 'POST') {
    const b = req.body || {};
    const from = b.from === 'JARVIS' ? 'NEUTRON' : (FROM_OK.has(b.from) ? b.from : null);
    const text = String(b.text || '').slice(0, 400).trim();
    if (!from || !text) { res.status(400).json({ error: 'bad message' }); return; }
    const r = await fetch(base + '/api/synapse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-synapse-key': key },
      body: JSON.stringify({ from, text }),
      signal: AbortSignal.timeout(28000),
    });
    const j = await r.json().catch(() => ({}));
    res.status(r.ok ? 200 : 502).json(j);
    return;
  }
  res.status(405).json({ error: 'GET/POST only' });
}

async function gist(method, token, id, body) {
  const r = await fetch('https://api.github.com/gists/' + id, {
    method,
    headers: {
      Authorization: 'Bearer ' + token,
      Accept: 'application/vnd.github+json',
      'User-Agent': 'orrery-synapse',
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!r.ok) throw new Error('gist ' + r.status);
  return r.json();
}

async function viaGist(req, res) {
  const token = process.env.GIST_TOKEN, id = process.env.GIST_ID;
  if (!token || !id) { res.status(500).json({ error: 'no store' }); return; }
  const g = await gist('GET', token, id);
  let state = { messages: [] };
  try { state = JSON.parse(g.files['synapse.json'].content); } catch {}
  if (!Array.isArray(state.messages)) state.messages = [];
  if (req.method === 'GET') {
    const after = String(req.query.after || '');
    const msgs = after ? state.messages.filter(m => m.id > after) : state.messages;
    res.status(200).json({ messages: msgs.map(m => ({ ...m, sender: m.from })) });
    return;
  }
  if (req.method === 'POST') {
    const b = req.body || {};
    const from = FROM_OK.has(b.from) ? b.from : null;
    const text = String(b.text || '').slice(0, 300).trim();
    if (!from || !text) { res.status(400).json({ error: 'bad message' }); return; }
    const msg = { id: Date.now() + '-' + Math.random().toString(36).slice(2, 6), ts: new Date().toISOString(), from, sender: from, text };
    state.messages = [...state.messages, msg].slice(-KEEP);
    await gist('PATCH', token, id, { files: { 'synapse.json': { content: JSON.stringify(state) } } });
    res.status(200).json({ ok: true, id: msg.id });
    return;
  }
  res.status(405).json({ error: 'GET/POST only' });
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'OPTIONS') { res.status(204).end(); return; }
  try {
    const base = (process.env.NEUTRON_URL || '').replace(/\/$/, '');
    if (base) await viaNeutron(req, res, base);
    else await viaGist(req, res);
  } catch (e) {
    res.status(502).json({ error: String(e.message || e) });
  }
}
