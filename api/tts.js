/* CORTEX voice proxy — Microsoft Edge "Read Aloud" neural voices.
   Keyless and free upstream; this function exists so the browser never
   touches the websocket protocol (DRM token, headers) and so Vercel's
   edge cache makes every repeated line a zero-cost hit. */
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';

const VOICES = new Set([
  'en-US-AndrewMultilingualNeural',
  'en-US-BrianMultilingualNeural',
  'en-US-ChristopherNeural',
  'en-US-GuyNeural',
  'en-GB-RyanNeural',
  'en-GB-ThomasNeural',
]);

export default async function handler(req, res) {
  const t = String(req.query.t || '').slice(0, 420);
  if (!t.trim()) { res.status(400).json({ error: 'no text' }); return; }
  const voice = VOICES.has(req.query.v) ? req.query.v : 'en-US-AndrewMultilingualNeural';
  try {
    const tts = new MsEdgeTTS();
    await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3);
    const out = await tts.toStream(t);
    const stream = out.audioStream || out;
    const chunks = [];
    for await (const c of stream) chunks.push(c);
    const buf = Buffer.concat(chunks);
    if (buf.length < 500) throw new Error('empty audio: ' + buf.length + ' bytes');
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'public, max-age=31536000, s-maxage=31536000, immutable');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send(buf);
  } catch (e) {
    res.status(502).json({ error: String((e && e.message) || e) });
  }
}
