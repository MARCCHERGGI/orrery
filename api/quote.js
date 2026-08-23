/* Gold spot for the MARKETS monitor — Yahoo GC=F proxied server-side
   (browser CORS blocks it direct), gold-api.com as spot-only fallback.
   Edge-cached 10 min: the wall does not need tick resolution. */
export default async function handler(req, res) {
  try {
    const r = await fetch('https://query1.finance.yahoo.com/v8/finance/chart/GC=F?range=1mo&interval=1d',
      { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!r.ok) throw new Error('yahoo ' + r.status);
    const j = await r.json();
    const res0 = j.chart.result[0];
    const meta = res0.meta;
    const q = res0.indicators.quote[0];
    const r1 = v => Math.round(v * 10) / 10;
    /* full OHLC + volume so the wall can draw real candlesticks */
    const candles = [], volumes = [];
    (q.close || []).forEach((c, i) => {
      if (c == null || q.open[i] == null || q.high[i] == null || q.low[i] == null) return;
      candles.push({ o: r1(q.open[i]), h: r1(q.high[i]), l: r1(q.low[i]), c: r1(c) });
      volumes.push(q.volume[i] || 0);
    });
    const closes = candles.map(k => k.c);
    const price = meta.regularMarketPrice;
    const prev = closes.length > 1 ? closes[closes.length - 2] : price;
    const out = {
      price: r1(price),
      chg: r1(price - prev),
      chgPct: Math.round((price - prev) / prev * 1000) / 10,
      hi52: meta.fiftyTwoWeekHigh, lo52: meta.fiftyTwoWeekLow,
      closes, candles, volumes, src: 'COMEX GC=F', t: Date.now(),
    };
    res.setHeader('Cache-Control', 'public, max-age=600, s-maxage=600');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(out);
  } catch (e) {
    try {
      const r2 = await fetch('https://api.gold-api.com/price/XAU');
      const j2 = await r2.json();
      res.setHeader('Cache-Control', 'public, max-age=600, s-maxage=600');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(200).json({ price: Math.round(j2.price * 10) / 10, chg: null, chgPct: null, closes: [], src: 'gold-api.com', t: Date.now() });
    } catch (e2) {
      res.status(502).json({ error: String((e && e.message) || e) });
    }
  }
}
