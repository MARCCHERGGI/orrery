# ORRERY — a live star-map of a real AI company

One static page that renders an AI agent fleet as a night-sky orrery: department
constellations orbiting a particle brain, every star a real scheduled agent with a
real status. Open source; anyone points `data/fleet.json` at their own fleet.

## Why it beats the reels it's copying
- alassafi's skilltree: beautiful but a demo — no live status, no real fleet.
- bennettx's Optimal Engine: real app, but closed and cluttered.
- ORRERY: real lanes with real last-run status and visible data age, MIT-licensed,
  zero dependencies, one HTML file.

## Acceptance criteria (verify all before claiming done)
1. `index.html` renders the full map from `data/fleet.json` on localhost AND file://
   (inline fallback) — screenshot proof.
2. Space intro (starfield → title → fly-in) plays once, skippable by tap,
   fully skipped under `prefers-reduced-motion`.
3. Click/touch any star → detail card with name, constellation, live status,
   last result, cadence, and the "replaces" line. Esc/backdrop closes. Keyboard
   navigable (tab / enter / esc / arrows).
4. Drag pans, wheel/pinch zooms, double-tap resets. Works on phone width (320px).
5. Counts in the HUD are computed from the data file, never hardcoded.
6. design-excellence `audit.mjs` → zero FAILs (or stated exceptions).
7. Public GitHub repo + Vercel production URL both live.

## Data model (`data/fleet.json`)
```json
{
  "meta": { "title": "...", "operator": "...", "exported": "ISO date" },
  "departments": [{ "id": "self", "label": "SELF", "hue": 45, "tagline": "..." }],
  "nodes": [{
    "id": "ClaudeSelfTick", "label": "Self Tick", "dept": "self",
    "status": "ok|running|flag|dormant", "detail": "last result string",
    "cadence": "daily 05:20", "replaces": "what a human would do",
    "mass": 1-3
  }]
}
```

## Not in v1 (stated, not hidden)
- Exporter script that regenerates fleet.json from Windows schtasks/warden
  (data was hand-exported from `state/fleet-health.md` 2026-08-08).
- Live websocket refresh; v1 is static JSON.
- The reel itself — needs Marco's hands + screen for the finger shots.
