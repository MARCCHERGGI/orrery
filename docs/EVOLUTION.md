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

Round 1 (iters 1-16, all shipped): fresh-data automation · clickable tiles ·
checkpoint readouts · mobile gyro/portrait · search + find button · reel
variants + clean footage · draw calls 478→352 · per-lane timestamps · floor
ledger · cell-scaled labels · __hold harness.

Round 2 (seeded iter 17 from accumulated next-observes):

1. **Live refresh** (ALIVE): page re-pulls fleet.json on a 233 s tick, rebuilds
   on newer export when idle at level 0; header age counts instead of freezing.
   (Shipped iter 17.)
2. **MARCO DECISION — repo link**: the site is OSS and the repo is the IG
   comment magnet, but nothing on the page points to it. Needs Marco-authored
   placement/copy; do not auto-ship. Hand him the option.
3. ~~Portrait tile tap targets~~ CLOSED iter 26, RULES-OUT: frozen-frame probe
   at 390×844 hit 4/5 tile centers exactly (Affiliate Tick / Hundred Today /
   Stage Batch; gap tap leaned to the adjacent cell as designed). Hit mapping is
   correct; earlier "wrong tile" readings were the probe racing idle camera
   drift. Only the far receding-edge column is tight — inherent to an angled
   wall; ⌕ search covers precision access. No fix needed.
4. **Monument trio instancing** (PERF): 29× pillar/ring/cap → 3 InstancedMesh,
   ~379→~300 est. Deferred twice for interaction risk — needs a careful plan
   (per-instance emissive via instanceColor, raycast instanceId remap).
5. **DEPTH pass**: contact shadows / grounding under monuments and orb; the
   portal illusion's weakest remaining link.
6. **Stale-ok surfacing** (TRUTH): lanes warden calls ok but scheduler shows
   weeks-stale (e.g. Screen Activity, 8 d). Age can't recolor status (at-startup
   daemons), but the card could carry a quiet "stale?" marker when cadence
   implies a shorter gap. Needs cadence-aware logic, not a blanket threshold.

## Log

Every iteration appends to `docs/EVOLUTION-LOG.md`. Entry format:

```
## <n> · <date> · <systemic|fundamental> · <axis>
scores: U# L# D# De# A# P#
shipped: <one line>
evidence: <verify artifacts>
next-observe: <what to check first next cycle>
```
