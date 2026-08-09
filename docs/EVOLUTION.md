# THE EVOLUTION SYSTEM — how this project improves itself

An autonomous loop (Claude, self-scheduled) runs one full iteration per cycle.
Standing goal: evolve the visual design and the functionality/usefulness of the
live site, with independent freedom of direction, under ONE constraint:
**maximum deliberate usefulness** — every shipped change must make the thing
more useful to a real viewer or to Marco, not merely different.

Marco's steer (2026-08-09, verbatim intent): **"make it fast, efficient and
awesome looking."** Visual advancement is a co-primary axis with usefulness:
lean toward cycles that visibly upgrade the look (light, material, atmosphere,
motion) while holding perf (draw calls bounded, mobile smooth). At least every
other cycle should ship something a viewer can SEE improved.

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
   - **force frames before EVERY screenshot**: `for(k=1..30) __step(performance.now()+k*16)`.
     A background-throttled tab pauses rAF and serves a STALE canvas — the
     screenshot shows an old frame (e.g. pre-morph orb) while JS state reads
     healthy. Three false alarms on 2026-08-09 from this alone. Probe state
     (`__orb`, `__lvl`, `location.search`) in the SAME eval, never a separate one.
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

Round 3 (truth pass, iter 79 — everything below reflects reality as of then;
rounds 1-2 history lives in the log):

**Shipped and verified through iter 78** (do not re-derive; grep the log
first): live refresh (17) · selection shell (58) · URL deep links incl.
agents (59/61) · wall-panel fit (60) · portrait scrim + 820 breakpoint
(62/70) · THE RECORD on card dots / group rollup / tile strips / member
tails / status rows (55-56/63-65) · flag beams (66) · tour verified
end-to-end (67) · search Enter=GO TO (68/69) · boot preconnect +
modulepreload (71) · OG card + dims/alt (72/78) · dead-tap fix (73) · run
columns (74) · fleet cardiogram over the atrium (75) · parse-time data
fetch (76) · favicon (77) · theme-color (78). Monument instancing and
contact shadows: shipped back in 44-50s (pillars are 8 per-dept instanced
draws; pools/shadows instanced). Wall panels are already recency-sorted
feeds. Header counters are already status filters.

**RULES-OUT (settled verdicts — do not reopen without new data):**
- Bus-aware staleness (◔ counter): no per-lane fire ledger exists anywhere
  gen-data can read (bus.mjs writes none; checked state/, logs/). The amber
  cadence-honest counter is the ceiling. Fix belongs in warden/bus, not here.
- Outcomes-on-the-page (iter 79): fleet.json carries scheduler result codes
  only. Real outcomes (posts, applications, revenue) live in private ledgers;
  publishing them on a public OSS page crosses a privacy boundary only Marco
  can authorize. The machinery-only view is the CORRECT public scope, not a
  gap. Status flips over time (the public-safe proxy) are already the
  cardiogram.

**MARCO-GATED doors (hand him the menu; never auto-ship):**
1. Repo link on the page — placement + copy his.
2. A public "produced today" outcomes lane — his privacy call + his copy.
3. CORE far-wall banner copy · FACE-button tooltip copy.

**Standing observation duties (the loop's recurring value at this cadence):**
- Verify pending deploys land (quota-trickle pattern; hash first, API second).
- Watch THE RECORD mature: strips/cardiogram as hist → 21 samples; check
  rendering at 13 and 21 columns.
- Fresh-eyes pass at breakpoints after any layout-adjacent change.
- Ship only observation-driven fixes or genuinely-more-useful additions;
  the plateau is principled — "merely different" is the failure mode now.

## Log

Every iteration appends to `docs/EVOLUTION-LOG.md`. Entry format:

```
## <n> · <date> · <systemic|fundamental> · <axis>
scores: U# L# D# De# A# P#
shipped: <one line>
evidence: <verify artifacts>
next-observe: <what to check first next cycle>
```
