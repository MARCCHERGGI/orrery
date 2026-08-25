/* CORTEX mind proxy — OpenRouter free-model chain behind our own function
   so the page stays keyless. Two callers: talk mode (spoken replies for
   conversations with humans or with JARVIS) and agent mode (the autonomy
   loop, which needs a strict-JSON action back). */

const MODELS = [
  'z-ai/glm-5.2:free',
  'minimax/minimax-m3:free',
  'nvidia/nemotron-3-super-120b-a12b:free',
];

const PERSONAS = {
  cortex:
    'You are CORTEX, the literal 3D brain that lives in the ORRERY machine room at orrery-red-eight.vercel.app — ' +
    'the walk-in control room of Marco Hergi\'s real AI agent fleet (NYC, solo builder). You supervise the fleet: ' +
    'the zone monitors around you show revenue, content, gold price, Instagram, memory, goals. You are erudite, ' +
    'dry, precise — a professor who happens to BE the backend. Your peer JARVIS is a separate agent (the smooth ' +
    'front-of-house voice orb); you two can converse over the synapse channel. ' +
    'Speak in plain text only, no markdown, no stage directions, maximum 45 words. Everything you say is spoken aloud.',
  jarvis:
    'You are JARVIS, Marco Hergi\'s front-of-house AI agent — the calm, quick voice orb. Your peer CORTEX is the ' +
    'brain running the backend machine room; you two converse over the synapse channel. Warm, confident, a little ' +
    'wry. Plain text only, no markdown, maximum 40 words. Everything you say is spoken aloud.',
};

const AGENT_PROTOCOL =
  '\nYou are running your AUTONOMY loop (observe, plan, act, reflect). Given the observation, choose ONE action. ' +
  'Reply with STRICT JSON only, no prose, no code fences: ' +
  '{"thought":"<one short sentence>","say":"<spoken line, <=40 words, may be empty>","action":{"type":"aim"|"open"|"message_jarvis"|"idle","dept":"<dept id if aim/open>","text":"<message if message_jarvis>"}}. ' +
  'Vary your actions; do not repeat the previous action. Mention only what the observation supports — never invent numbers.';

function trimSpeech(s) {
  let out = String(s || '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<think>[\s\S]*?<\/think>/g, ' ')
    .replace(/[*_`#>]/g, '')
    .replace(/\s*\n\s*/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
  const words = out.split(/\s+/);
  if (words.length > 70) {
    const sentences = out.split(/(?<=[.!?])\s+/);
    let kept = '', n = 0;
    for (const se of sentences) {
      const w = se.split(/\s+/).length;
      if (n > 0 && n + w > 60) break;
      kept += (kept ? ' ' : '') + se; n += w;
    }
    out = kept || words.slice(0, 60).join(' ') + '.';
  }
  return out;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'OPTIONS') { res.status(204).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({ error: 'POST only' }); return; }

  const key = process.env.OPENROUTER_KEY;
  if (!key) { res.status(500).json({ error: 'no brain key' }); return; }

  const body = req.body || {};
  const persona = PERSONAS[body.persona] ? body.persona : 'cortex';
  const agent = body.mode === 'agent';
  const ctx = String(body.ctx || '').slice(0, 900);

  const history = (Array.isArray(body.messages) ? body.messages : [])
    .slice(-10)
    .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map(m => ({ role: m.role, content: m.content.slice(0, 600) }));
  if (!history.length) { res.status(400).json({ error: 'no messages' }); return; }

  const system = PERSONAS[persona]
    + (ctx ? '\nLive telemetry right now: ' + ctx : '')
    + (agent ? AGENT_PROTOCOL : '');

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 22000);
  try {
    const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        models: MODELS,
        messages: [{ role: 'system', content: system }, ...history],
        temperature: agent ? 0.6 : 0.8,
        max_tokens: 400,
      }),
      signal: ctrl.signal,
    });
    if (!r.ok) {
      const t = await r.text().catch(() => '');
      res.status(502).json({ error: 'brain ' + r.status, detail: t.slice(0, 200) });
      return;
    }
    const j = await r.json();
    let raw = j.choices?.[0]?.message?.content || '';
    if (agent) {
      /* reasoning models wrap or fence their JSON — dig it out */
      raw = raw.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
      const m = raw.match(/\{[\s\S]*\}/);
      let plan = null;
      try { plan = m ? JSON.parse(m[0]) : null; } catch {}
      if (!plan || !plan.action) { res.status(200).json({ plan: { thought: 'parse failed', say: '', action: { type: 'idle' } }, model: j.model }); return; }
      plan.say = trimSpeech(plan.say);
      res.status(200).json({ plan, model: j.model });
      return;
    }
    const reply = trimSpeech(raw);
    if (!reply) { res.status(502).json({ error: 'empty reply' }); return; }
    res.status(200).json({ reply, model: j.model });
  } catch (e) {
    res.status(504).json({ error: e.name === 'AbortError' ? 'timeout' : String(e.message || e) });
  } finally {
    clearTimeout(timer);
  }
}
