# ORRERY

[![License: MIT](https://img.shields.io/badge/License-MIT-black.svg)](LICENSE)
![dependencies: 0](https://img.shields.io/badge/dependencies-0-brightgreen.svg)
![one HTML file](https://img.shields.io/badge/build-one_HTML_file-black.svg)


**A live AI ecosystem, standing on a base you can fly through.** Every light is a
real scheduled agent. Every status is a real last-run result. Zones are
departments, the monuments are checkpoints, and the swarms orbiting them are the
agents doing the work.

An [orrery](https://en.wikipedia.org/wiki/Orrery) is a working mechanical model of
the solar system. This is one for an agent fleet — in 3D.

![orrery — the world](docs/hero.png)

![a checkpoint and its swarm](docs/card.png)

## Why this exists

Agent-company "mind maps" are everywhere on Instagram — and almost all of them are
diagrams of nothing: no live status, no real fleet behind the picture. This one
renders **my actual fleet** — 144 scheduled lanes that run a one-person company
from a Windows laptop in NYC — and it's open so you can render yours.

- **One HTML file.** Three.js from a CDN via import map — no build step, no bundler.
- **Data-driven.** Point `data/fleet.json` at your own fleet; every count on
  screen is computed from the data — nothing is hardcoded.
- **Honest by design.** Data age is displayed in the header. Flagged lanes are
  red. Dormant lanes lie dim on the ground instead of orbiting. A map that only
  shows green is a brochure.

## The world

- **The base** — a gridded disc the whole ecosystem stands on.
- **The brain** — a particle heart floating over the center; every checkpoint
  feeds it a beam, and pulses travel the beams.
- **Zones** — departments, arranged in a ring on the base, each with a glow
  district and a serif nameplate.
- **Checkpoints** — glowing monuments. Click one and the camera flies in; its
  card lists the real agents stationed there.
- **Swarms** — agents orbit their checkpoint while they work. Running agents
  orbit fast and occasionally dart to the pillar to deliver. Dormant agents lie
  on the ground.

## Run it

```
npx serve         # or python -m http.server, or any static host
```

Tap to enter. Drag to orbit, scroll to zoom. Click a zone, a monument, or an
agent orb for its card. `/` to search, arrows + Enter for keyboard, Esc goes up
a level. `R` runs the cinematic tour (chrome hides — made for screen-recording).

With no `data/fleet.json` present it renders a small sample fleet, so the clone
works before you've wired anything.

## Bring your own fleet

`data/fleet.json`:

```jsonc
{
  "meta": {
    "title": "ORRERY",
    "subtitle": "a live AI ecosystem",
    "operator": "you",
    "exported": "2026-08-08T01:46:50Z"   // shown as data age — keep it honest
  },
  "departments": [
    { "id": "revenue", "label": "REVENUE", "hue": 28, "tagline": "money in" }
  ],
  "groups": [
    { "id": "storefronts", "dept": "revenue", "label": "storefronts",
      "blurb": "the shops and funnels that face the world" }
  ],
  "nodes": [
    {
      "id": "unique-id",
      "label": "Fleet Warden",
      "dept": "revenue",
      "group": "storefronts",
      "status": "ok",            // ok | running | flag | dormant
      "detail": "last run result, verbatim",
      "cadence": "every 15 min", // optional
      "replaces": "an SRE on-call — audits and heals 144 lanes", // optional
      "mass": 3                  // 1-3 · flagships orbit wider and larger
    }
  ]
}
```

`gen-data.mjs` is the exporter I use — it reads my fleet supervisor's health
report and regenerates the JSON. Adapt it to whatever your scheduler emits
(cron, systemd timers, GitHub Actions, k8s CronJobs).

## Design notes

Planetarium, not dashboard. A spaced serif for zone names, a sans for
instruments, one accent color that always means "alive". Status is never encoded
by color alone — flagged agents differ in motion and shape, dormant agents in
position. `prefers-reduced-motion` gets a still world that renders on
interaction only.

## Limits (stated rather than hidden)

- Static JSON — refresh cadence is whatever your exporter's is. No websocket.
- The 3D world is announced to screen readers via a live region and the cards
  are real DOM, but the scene itself is not a substitute for a table view.
- Positions are deterministic from data order, not force-directed.
- Three.js comes from jsdelivr's CDN — offline use needs a local copy.

MIT.
