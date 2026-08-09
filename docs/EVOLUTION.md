# THE EVOLUTION SYSTEM — how this project improves itself

An autonomous loop (Claude, self-scheduled) runs one full iteration per cycle.
Standing goal: evolve the visual design and the functionality/usefulness of the
live site, with independent freedom of direction, under ONE constraint:
**maximum deliberate usefulness** — every shipped change must make the thing
more useful to a real viewer or to Marco, not merely different.

## The loop (one iteration, every cycle)

1. **OBSERVE** — open the live site, take screenshots (overview + one zone +
   tour), read the last log entry. Note what reads badly, what data is stale,
   what a first-time viewer cannot do or learn.
2. **DIAGNOSE** — score 0–10 on the six axes below. The lowest axis points at
   this cycle's work.
3. **PICK** — one item, usefulness-ranked:
   - **Systemic** (default): an improvement inside the current design language.
   - **Fundamental** (every ~4th cycle, or when two systemic cycles in a row
     score flat): question a paradigm — layout, metaphor, data pipeline,
     interaction model. Requires RESEARCH first.
4. **RESEARCH** (fundamental picks, or when uncertain) — winner-recon: find who
   does this best (reference frames, live products), extract the pattern, then
   build. Never invent when a winner can be cloned and exceeded.
5. **BUILD** — implement. Respect the φ system (docs: index.html "THE SYSTEM"
   block): every new dimension from 21·φⁿ / golden angle / Kepler.
6. **VERIFY** — the bar, non-negotiable:
   - synthetic frames clean (`window.__step` loop, zero `__errs`)
   - screenshots READ (not just taken) — overview + the changed surface
   - tour steps clean through exit
   - after deploy: live SHA256 == local SHA256, redirects off
7. **SHIP** — deploy-lock acquire → `vercel deploy --prod --yes` → hash check →
   release → `git push origin HEAD:main`.
8. **LOG** — append one entry to `docs/EVOLUTION-LOG.md`: axis scores, what
   shipped, before/after evidence, what the NEXT observation should check.
9. **RESCHEDULE** — the loop re-arms itself (~30 min cadence while active).

## The six axes (score every cycle)

| Axis | Question |
|---|---|
| USEFUL | Can a viewer learn something true about the fleet in 10 s? Can Marco act on it? |
| LEGIBLE | Is every on-screen element readable at its intended distance? |
| DEPTH | Does the portal illusion hold (parallax, near layer, contact shadow, never-freeze)? |
| DENSITY | Many small REAL details (data-backed), zero decorative fluff? |
| ALIVE | Does it visibly run on live data — and is the data actually fresh? |
| PERF | Smooth on a mid laptop + mobile? Draw calls bounded? |

## Hard rules (learned, do not relearn)

- Real data only. A tile/panel/counter that isn't backed by fleet.json is fluff.
- Marco authors on-screen COPY. New surfaces ship with minimal/no invented prose.
- The φ system governs dimensions. "Chaos" complaints mean a governing rule is
  missing, not that opacity needs tuning.
- "Like the reference" = diff STRUCTURE against reference frames (density,
  luminosity, what surfaces carry), not polish.
- Verify with synthetic timestamps; clamp any time-integrating uniform (dt ≥ 0).
- Deploy only through deploy-lock; always hash-check the live host redirects-off.
- One change per cycle. Ship small, observe, then next.

## Backlog (usefulness-ranked; re-rank every cycle)

1. **Fresh data forever** (fundamental, ALIVE axis): the deployed site shows
   "data N h old". Automate: scheduled task runs `gen-data.mjs` + prod deploy
   every few hours, so the public map stays live without anyone touching it.
2. **Tiles are dead** (USEFUL): wall tiles aren't clickable — hovering/clicking
   a tile should open that agent's card (same card as the swarm orbs).
3. **Checkpoint last-result readouts** (USEFUL/DENSITY): zone level shows each
   monument's real last run result on approach.
4. **Mobile/touch pass** (PERF/USEFUL): pinch-dolly, tap targets, portal on
   portrait aspect.
5. **Search palette** (USEFUL): `/` opens fuzzy search over 145 lanes, Enter
   flies to the agent.
6. **Reel-mode variants** (Marco's IG lane): 2–3 alternate 10 s camera paths.
7. **Draw-call audit** (PERF): merge static line geometry, cap canvases.

## Log

Every iteration appends to `docs/EVOLUTION-LOG.md`. Entry format:

```
## <n> · <date> · <systemic|fundamental> · <axis>
scores: U# L# D# De# A# P#
shipped: <one line>
evidence: <verify artifacts>
next-observe: <what to check first next cycle>
```
