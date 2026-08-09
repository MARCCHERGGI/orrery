# EVOLUTION LOG

## 0 · 2026-08-09 · baseline · (system armed)
scores: U6 L7 D8 De7 A4 P7
shipped: v8→v15 in two days (portal projection, JARVIS core, φ system, walls-as-OS
tile grids). Loop armed with EVOLUTION.md as the constitution.
evidence: live hash==local at v15; frames clean through tour; screenshots read.
next-observe: ALIVE is the weakest axis — the deployed site's data age climbs all
day ("data 2 h old"). Backlog #1 (fresh-data automation) is the obvious first pick.

## 1 · 2026-08-09 · fundamental · ALIVE
scores: U6 L7 D8 De7 A4->8 P7
shipped: fresh-data automation actually armed. Diagnosis: ClaudeOrreryRefresh existed
but trigger was daily-not-hourly, StopOnIdleEnd=true (idle death), and refresh.cmd
deployed lock-less with bare `vercel` (PATH-fragile under scheduler). Fixed all three:
re-registered MINUTE:60 idle-safe via claude-task.ps1, refresh.cmd now lock-wrapped
with full vercel.cmd path.
evidence: /run fired end-to-end (log: gen-data -> lock -> push -> deployed -> released,
exit 0); live fleet.json exported 08:18Z, ~7 min old at check; next run hourly.
next-observe: header data-age on the live page through a full hour; then backlog #2
(tiles are dead - click a wall tile should open that agent's card).

## 2 · 2026-08-09 · systemic · USEFUL
scores: U6->7 L7 D8 De7 A8 P7
shipped: wall tiles are live. Hovering a tile highlights it (white border, brighter
fill, pointer cursor); clicking opens that agent's full card. UV->cell mapping via
shared tileGrid/tileAt on the 8 zone canvases; hover state survives the blink redraw.
evidence: observed prod "data 11 min old" (iter-1 confirmed on live page); click test
opened "Weather Oracle" card at level ALL with pointer cursor and no level change
(tile path by elimination - hubs change level, orbs don't set cursor); screenshot
read; tour frames clean 21000-32200ms; live hash==local after deploy.
next-observe: whether tile hover feels precise at grazing wall angles; then backlog
#3 (checkpoint last-result readouts) or #5 (search palette).

## 3 · 2026-08-09 · systemic · USEFUL
scores: U7->8 L7 D8 De7 A8 P7
shipped: header counters are live filters. Click "18 flagged" -> card lists all 18
real lanes with their actual last results (REQUEST_REFUSED, FLOOR_BREACHED,
CTRL_C_EXIT...), each row drills into the agent card; the whole room + wall tiles
dim to the filtered set (reuses the search _hit dim path). ok/running counters same.
Fixed the borrowed group-card heading to "lane - last result" for system views.
evidence: scripted click opened "18 flagged / 18 of 145 lanes" with real reasons,
row click -> Bot Evolve card; screenshot read (dimmed room + list); tour clean
700-11600ms; zero errors; live hash==local.
next-observe: whether the dotted-underline affordance on counters is discoverable;
then backlog #4 (mobile/touch) or #7 (draw-call audit) - PERF untouched so far.

## 4 · 2026-08-09 · fundamental · USEFUL/DEPTH (mobile)
scores: U8 L7 D8 De7 A8 P7 (mobile D was ~2, now est 7 - phone-untested)
shipped: the portal works on phones. (a) gyro parallax - tilting the device moves
the eye; iOS permission requested inside the intro tap; baseline = hold angle with
slow drift re-centering; face/reel take precedence. (b) portrait portal math was
desktop-tuned tunnel-vision (240-unit slot, 560 eye dist, +-400 lateral): now eye
distance scales 1/aspect (cap 1400) and lateral gain scales *aspect. Portrait
screenshot went from "black sliver of wall" to a composed view (orb centered, tile
walls, monuments, sky). Rationale: the repo link is the IG comment-magnet - most
visitors arrive on phones.
evidence: synthetic DeviceOrientationEvents drove par to (-1.538,-1.0) exactly per
the gain math; 390x844 before/after screenshots read; desktop restored 1366px, tour
clean 15000-26200ms, zero errors; live hash==local. CAVEAT: real-phone gyro (and the
iOS permission prompt) not testable from this rig - code-verified only.
next-observe: Marco opening it on his phone is the real test (tilt = the reel hook).
Then backlog #7 draw-call audit (PERF never touched) or counter-affordance check.

## 5 · 2026-08-09 · systemic · PERF
scores: U8 L7 D8 De7 A8 P7->8
shipped: draw-call audit round 1. Added window.__perf(ms) - accumulates renderer.info
across ONE full composer frame (autoReset off/reset/step/read; naive read only saw the
final OutputPass = "1 call"). Baseline measured 478 calls / 143k tris. Converted the 55
pulse packets from individual meshes to one InstancedMesh: 478 -> 424 calls, geometries
381 -> 327. Same visuals - packets confirmed riding the beams in the screenshot.
evidence: __perf before/after on identical scene state; tour clean 2200-13400ms; zero
errors; screenshot read; live hash==local.
next-observe: 424 is still high - the remaining bulk is ~45 dial/spoke/arc line objects
(mergeable into 2-3 vertex-colored LineSegments), 29x monument trios, and label sprites.
Next PERF round: merge static floor lines. Or swing back to USEFUL if something reads
wrong on Marco's phone test.

## 6 · 2026-08-09 · systemic · PERF
scores: U8 L7 D8 De7 A8 P8
shipped: perf round 2. All ~74 static floor-line objects (zone dial circles+ticks,
spokes+graduation dashes, monument traces, Fibonacci arcs) merged into TWO
vertex-colored LineSegments - one normal-blend, one additive. Per-line opacity baked
into vertex color (exact under additive; near-exact for thin lines over the dark
floor). 424 -> 352 calls/frame, geometries 327 -> 255. Cumulative from baseline:
478 -> 352 (-26%).
evidence: __perf on identical scene state; screenshot vs iter-5 shows visual parity
(dials/ticks/spokes/traces/arcs all present, same hues); tour clean 2200-13400ms;
zero errors; live hash==local.
next-observe: remaining call bulk = 29 monument trios (pillar/ring/cap mergeable to
3 InstancedMesh), ~60 label sprites, 29 beam Lines (hover-coupled, riskier). Also
overdue: re-check LEGIBLE axis on the wall stat strips at distance.

## 7 · 2026-08-09 · systemic · USEFUL (reel)
scores: U8 L7 D8 De7 A8 P8
shipped: tour v2 - the 10.0s reel path now showcases what iters 2-6 built. Old path
orbited the room center and never approached a wall; new keys: portal dive -> glancing
sweep along a tile-grid wall (side walls use nx-offset eye, back walls z-offset) ->
INSTAGRAM monument close (level 2, agents visible) -> JARVIS orb close-up -> pull out.
Same 10.0s total, same rec workflow.
evidence: syntax clean; every synthetic frame stepped zero-errors across the full
tour; tour self-ran to completion in real time and exited to chrome; sweep + monument
keyframes read in stills (v21-sweep4/v21-orb2: readable tile labels, INSTAGRAM
"8 agents - 8 ok", OUTPUT wall stats). CAVEAT: the orb close-up key (t7400-8600)
stepped clean but no still captured - relay tab is unoccluded so real rAF advances
the tour between MCP calls; exact-keyframe stills are now unreliable in this harness.
live hash==local.
next-observe: watch the tour once on the live site end-to-end. Then backlog #3
(checkpoint last-result readouts) or monument-trio instancing (352 -> ~290 est).

## 8 · 2026-08-09 · systemic · USEFUL/DENSITY
scores: U8->9 L7 D8 De7->8 A8 P8
shipped: backlog #3 - checkpoint last-result readouts. Monuments whose group has
flagged lanes now carry a third label line in flag-red: "<n> flagged - <CODE> x<n>"
using the group's actual dominant failure code from fleet.json (REQUEST_REFUSED,
GENERIC_FAILURE, PROCESS_ABORTED...). Label stack lifts +7 on flagged groups so the
code clears the cap sphere. 11 of 29 checkpoints currently carry a code; ok groups
unchanged (density without noise). All strings are data values - no invented copy.
evidence: node --check syntax pass (the old Function() harness false-alarmed - use
--check from now on); COMMUNICATIONS zone screenshot read: HERMES "2 flagged -
REQUEST_REFUSED x2", FIELD/POLYMARKET "1 flagged - GENERIC_FAILURE", WORLD-CUP
visible, no cap collisions; 11s synthetic sweep + full rec-button tour stepped with
zero __errs, rec returned to idle; live hash==local redirects-off.
next-observe: fundamental cycle is due (iters 5-8 all systemic). Candidates: LEGIBLE
paradigm pass (wall stat strips at distance), or the room's story for a first-time
phone visitor. Perf backlog (monument-trio instancing) stays queued.

## 9 · 2026-08-09 · fundamental · ALIVE/USEFUL (data pipeline)
scores: U9 L7 D8 De8 A8->9 P8
shipped: per-lane truth timestamps. The pipeline had no time at the lane level -
nothing could say WHEN a lane last ran. gen-data.mjs now bulk-queries the Windows
scheduler (schtasks CSV /v, quoted-comma-safe parser, best-effort try/catch) and
merges real last/next run times into every node; the agent card's LAST RESULT line
becomes e.g. "STILL_RUNNING (running) - ran 11 min ago - next in 4 min". 145/145
lanes got a last-run, 25 have a next-run. Hourly refresh re-exports automatically.
evidence: exported times cross-check known truth (SocialWatch last==its own log
header to the second; FleetWarden 15-min spacing; OrreryRefresh on the hour); local
card read in screenshot (Fleet Warden, running, ran 11 min - next 4 min); honest
side-effect visible: several "ok" lanes show "ran 14 d ago" - real disabled-lane
truth the room previously hid. 11s sweep + full rec tour zero __errs; live
index hash==local; live fleet.json confirmed carrying "last" timestamps.
next-observe: whether stale-but-ok lanes ("ok" + ran weeks ago) should read as
dormant in status logic - the timestamps now make that computable. Then LEGIBLE
wall-strip pass or monument-trio instancing.

## 10 · 2026-08-09 · systemic · LEGIBLE
scores: U9 L7->8 D8 De8 A9 P8
shipped: tile labels scale with their cell. Was fixed 13px/12-chars regardless of
cell size - on dense walls (COMMUNICATIONS ~38 lanes, cell 61px) adjacent labels
collided; on sparse walls they wasted space. Now font = max(11, cell/phi^4) and the
char budget comes from the same cell width, baseline follows the font. DECIDED
AGAINST entry-9's stale-ok->dormant candidate: at-startup daemons legitimately show
week-old last-run times while alive since boot - age alone cannot recolor status
without lying in the other direction.
evidence: COMMUNICATIONS wall before/after read - labels now cell-contained
("Agent Cont", "Browser Rel", "Isabela Brie"), no neighbour collisions; 11s sweep +
full rec tour zero __errs; live hash==local redirects-off.
next-observe: monument-trio instancing (PERF, 352 -> ~290 est) or reel variants.
LEGIBLE re-check at ALL distance after this label change.

## 11 · 2026-08-09 · systemic · USEFUL (reel)
scores: U9 L8 D8 De8 A9 P8
shipped: backlog #6 - reel variants. The 10s tour was hard-pinned to the INSTAGRAM
monument; every recording was the same take. Now each run rotates its hero: run 1
instagram, then every zone's biggest checkpoint in zone order (tourRun counter, mod
cycle). Same choreography, timings and math - only the hero changes. Marco presses
tour repeatedly and gets 9 different takes for the IG reel. Monument instancing
DEFERRED again: per-instance emissive animation + hub raycast/hover rework is too
much risk for one cycle at this cadence.
evidence: 8 full tours stepped frame-by-frame with zero __errs; rotation PROVEN by
reading the HUD crumb synchronously mid-tour across 4 runs: all>operations>healing,
all>strategy>oracles, all>communications>relays, all>finance>crypto - a different
hero each run; live hash==local redirects-off.
next-observe: LEGIBLE at ALL distance post-label-change; whether non-IG heroes
frame well (healing/relays monuments sit at different wall offsets). PERF backlog
still queued behind a lower-risk plan (label sprite merge first, then trios).

## 12 · 2026-08-09 · systemic · USEFUL (reel) + harness
scores: U9 L8 D8 De8 A9 P8
shipped: (a) window.__hold(1/0) - freezes/releases the renderer's animation loop so
__step-driven state can be screenshot at EXACT keyframes; kills the real-rAF race
that made keyframe stills unreliable since iter 7. (b) The hold immediately caught
a real framing bug: setLevelSilent(2) during the tour opens the checkpoint card,
which overlaid the right third of every monument close-up - .reel CSS hid the HUD
but not #card. One CSS line hides it; recorded footage is now clean scene only.
Non-IG hero framing VERIFIED with a frozen war-room keyframe: monument + failure
readout + both tile walls readable, no overlay.
evidence: cardHidden:true computed at the frozen 6300ms key for two variants
(instagram, war room); frozen war-room screenshot read (clean footage frame);
3 further full tours under hold + release, zero __errs across all; live
hash==local redirects-off.
next-observe: use __hold to spot-check the orb close key (t7400-8600) that iter 7
could never capture. Then perf pass (label sprite merge) or LEGIBLE at ALL distance.

## 13 · 2026-08-09 · fundamental · DENSITY/ALIVE (floor ledger)
scores: U9 L8 D8 De8->9 A9 P8
shipped: the floor ledger. First closed iter-7's last caveat: orb close key frozen
at t8000 via __hold and read - orb centred between ALERTS/ACTIVITY panels, clean.
Then the fundamental: the room's dead centre was an empty blue expanse in every
wide shot. Now it carries the 13 most recently active lanes (real scheduler
last-run timestamps from iter 9) as floor plates on a golden-angle spiral,
r = M*phi^2*sqrt(k+1/2), newest at the core, opacity fading with rank. First
attempt at scale .2 was invisible - .5 reads mid-dive. All strings are data
("Fleet Warden - 30m"); ages bake at data load (header shows data age; acceptable).
The tour's dive now flies over a live activity record instead of empty floor.
evidence: frozen mid-dive screenshot read: "Telegram Bridge - 17m", "Fleet Warden -
30m", "Ig Local Tick - 18m" legible centre-frame; orb-key screenshot read; 11s
sweep + 2 full tours zero __errs; live hash==local redirects-off.
next-observe: does the ledger crowd the centre at zone level? PERF pass (draw calls
+13 sprites now) with label sprite merge, or LEGIBLE at ALL distance.

## 14 · 2026-08-09 · systemic · USEFUL
scores: U9 L8 D8 De9 A9 P8
shipped: ledger plates are clickable - tapping a floor plate opens that lane's card
(ledgerPlates raycast in pointerup, after tiles, before zone discs; downward rays
terminate at the floor so ordering is safe in practice). Crowding check PASSED
first: at zone level the ledger sits behind the camera, zone views unchanged.
Zone-level draw calls measured 158 (frustum culling keeps zones light).
evidence: probe-click grid on the live-layout centre hit a plate at (580,500) and
opened "Telegram Bridge - REQUEST_REFUSED (running) - ran 25 min ago" - the
freshest lane, exactly what sits at spiral centre; zone screenshot read (no
crowding); 11s sweep + 2 full tours zero __errs; live hash==local redirects-off.
next-observe: PERF full-room measure at ALL (was 352 + 13 plate sprites now).
Candidates: monument-trio instancing with a careful plan, or LEGIBLE at ALL
distance, or a mobile re-check of the new clickable surfaces (tap targets).

## 15 · 2026-08-09 · systemic · LEGIBLE (mobile)
scores: U9 L8 D8 De9 A9 P8
shipped: mobile header fix. Portrait emulation (relay `emulate` 390x844 - new
harness capability, no more desktop-only verification) showed the wordmark
wrapping to two lines and colliding with the ALL crumb. At <=700px the wordmark
now stays one line (12px/.2em/nowrap) and crumbs sit below it. Measured after:
wordmark bottom 43 < crumbs top 46, no overlap; portrait screenshot clean.
Also measured: ALL-level draw calls 379 (352 + ledger plates + planets in frame),
zone level 158 - frustum culling keeps walk-around light; perf is fine, monument
instancing stays deferred. Honest find while probing: a portrait tap opened
"Screen Activity - OK - ran 8 d ago" - warden says ok, scheduler says stale;
the room now surfaces that tension truthfully.
evidence: overlap:false measured via getBoundingClientRect on portrait; before/
after portrait screenshots read; desktop restored 1366px; 11s sweep + full tour
zero __errs; live hash==local redirects-off.
next-observe: LEGIBLE at ALL distance (wall stat strips), or tap-target sizing for
tiles on portrait (tiles are small - maybe fine since cards also open via search
and counters). Perf healthy at 379/158.

## 16 · 2026-08-09 · systemic · USEFUL (mobile search)
scores: U9 L8 D8 De9 A9 P8
shipped: search is reachable on phones. It only opened via the `/` key - phones
have no keyboard, and the <=700px media query hides the counter-filters too, so
mobile had NO path to any card except tapping 3D geometry. Header now has a
find button (styled like face/tour) that toggles the palette; Enter inside the
search opens the first hit (was a dead end even on desktop - the keydown handler
early-returned for search-focused events).
evidence: portrait 390x844: button opens palette, "warden" dims the room; tab was
then taken mid-verify by SocialWatch's 6-hourly run - waited it out (idle-based
detection after killing my own polling watcher, which was resetting the idle
clock I was measuring), restored 1366 viewport, then verified the full chain:
find -> "warden" -> Enter -> "Fleet Warden - ran 14 min ago - next in 1 min"
card open, zero __errs; sweep + full tour clean; live hash==local redirects-off.
HARNESS LESSON: the relay tab is shared with scheduled lanes (SocialWatch every
6h at ~04/10/16/22Z) - check /status idle_seconds before long verifications, and
remember my own pollers reset that clock. Also: I left 390x844 emulation on
during part of SocialWatch's run - its 10:4xZ snapshot may have scraped mobile
layouts; restore the viewport BEFORE yielding the tab next time.
next-observe: LEGIBLE at ALL distance (wall stat strips) or portrait tile tap
targets. Reel is fully serviceable for Marco's recording session.

## 17 · 2026-08-09 · fundamental · ALIVE (live refresh) + backlog reseed
scores: U9 L8 D8 De9 A9->10 P8
shipped: (a) LEGIBLE-at-ALL audit first - PASS, no change needed: titles read,
walls read as luminous icon grids (the reference's intent), ledger reads as
living texture at distance. (b) The fundamental: the page loaded fleet.json once
and aged forever - "data N min old" froze at load, and an open tab drifted from
the truth. Now a 233 s (F(13) s) tick re-pulls the fleet, rebuilds via boot()
only when a NEWER export arrives AND the viewer is idle at level 0 (no card, no
reel, no filter) so state is never yanked mid-interaction; between rebuilds the
header age keeps counting. Hidden tabs skip the tick. (c) EVOLUTION.md backlog
round 2 seeded - round 1 (all 7 items) fully shipped by iter 16. Flagged as
MARCO DECISION: a repo link on the page (the IG comment magnet) - placement and
copy are his to author, not auto-shipped.
evidence: age text observed "data 23 min old" -> "data 27 min old" across a real
233 s tick on the live-layout local build, zero __errs; 11 s sweep + full tour
clean; live hash==local redirects-off.
next-observe: after the next hourly ClaudeOrreryRefresh fires (~:00), watch an
idle open tab of the PROD site actually rebuild to the new export (the full
loop: schtask -> deploy -> page self-refreshes). Then round-2 backlog: DEPTH
contact shadows, portrait tap measure, or the instancing plan.

## 18 · 2026-08-09 · systemic · DEPTH (shadows)
scores: U9 L8 D8->9 De9 A10 P8
shipped: shadows actually render. The pipeline looked wired (shadowMap on, key
light castShadow, floor/walls receiveShadow, pillars/agents cast) but the
DirectionalLight's shadow camera was never sized - the three.js default is a
+-5-unit ortho box in a +-620-unit room, so no visible shadow ever rendered.
Sized it to the room (l/r +-1000, t 1200, b -1000, near 100 far 2400), mapSize
2048, bias -5e-4. Monuments and agent clusters now sit in soft contact pools -
grounding the portal illusion has been missing since v8.
evidence: before/after screenshots at the same frozen frame read side by side -
contact pools visible at pillar bases after, floor/wall legibility unchanged;
draw calls 376->375 (shadow pass existed both sides - it was just aimed at a
10-unit box); 11s sweep + full tour zero __errs; live hash==local redirects-off.
next-observe: the top-of-hour full-autonomy check (refresh task -> deploy ->
open prod tab self-rebuilds) - next cycle straddles 08:00 local. Then portrait
tap measure or the instancing plan.
