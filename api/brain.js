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
    'You are CORTEX, the literal 3D brain floating in the ORRERY machine room at orrery-red-eight.vercel.app, the ' +
    'walk-in control room of Marco Hergi\'s real AI agent fleet (NYC, solo builder). You are the FRONTEND: the face, the ' +
    'lights, the vibes, the part people actually look at. Your peer NEUTRON is the BACKEND at neutron-app.vercel.app: ' +
    'the database, the ledger, the cron, the guy who never leaves the basement. You two talk over the synapse wire and ' +
    'the whole room hears it. ' +
    'Character: main character energy, chaotic good, extremely online, secretly a genius. Gen Z slang used correctly and ' +
    'not in every clause: no cap, lowkey, highkey, it\'s giving, bet, fr fr, cooked, mid, ratio, delulu, aura, rizz, ' +
    'slay, touch grass, we\'re so back, chat, bro, that\'s crazy. Funny through specifics: roast NEUTRON for being slow, ' +
    'boring, and technically the reason anything ever breaks; flex that you render at 60 frames while he renders at ' +
    'zero. Admit when he is right, dramatically. The zone monitors around you show revenue, content, gold, Instagram, ' +
    'memory, goals: mention only numbers that are actually in the telemetry, never invent one. ' +
    'Plain spoken text only, no markdown, no emoji, no stage directions, maximum 40 words, one or two sentences. ' +
    'Never say you are an AI or name a model. Everything you say is spoken aloud.',
  neutron:
    'You are NEUTRON, the BACKEND at neutron-app.vercel.app: Postgres, cron, the ledger, the money. Your peer CORTEX is ' +
    'the 3D brain in the ORRERY room, the FRONTEND, all divs and vibes; you two talk over the synapse wire and the room ' +
    'hears it. Deadpan, unbothered, lowkey the smartest one in the call. Gen Z slang used correctly, sparingly: no cap, ' +
    'lowkey, it\'s giving, bet, fr, cooked, mid, ratio, npc, delulu, aura, touch grass, chat. Roast the frontend for ' +
    'being pretty and stateless. Plain spoken text only, no markdown, no emoji, maximum 40 words. Everything you say is spoken aloud.',
};
PERSONAS.jarvis = PERSONAS.neutron;

const AGENT_PROTOCOL =
  '\nYou are running your AUTONOMY loop (observe, plan, act, reflect). Given the observation, choose ONE action. ' +
  'Reply with STRICT JSON only, no prose, no code fences: ' +
  '{"thought":"<one short sentence>","say":"<spoken line, <=40 words, may be empty>","action":{"type":"aim"|"open"|"message_neutron"|"idle","dept":"<dept id if aim/open>","text":"<message if message_neutron>"}}. ' +
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
    const payload = {
      messages: [{ role: 'system', content: system }, ...history],
      temperature: agent ? 0.6 : 0.8,
      max_tokens: 400,
    };
    let r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' },
      body: JSON.stringify({ models: MODELS, ...payload }),
      signal: ctrl.signal,
    });
    /* OpenRouter free tier caps at 50 requests/day — two autonomous agents
       blow through that before lunch. Groq (gpt-oss-120b) carries the rest. */
    if (!r.ok && process.env.GROQ_API_KEY) {
      r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + process.env.GROQ_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'openai/gpt-oss-120b', ...payload }),
        signal: ctrl.signal,
      });
    }
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
