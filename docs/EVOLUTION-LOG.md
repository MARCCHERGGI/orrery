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

## 19 · 2026-08-09 · research · (no site change)
scores: unchanged (U9 L8 D9 De9 A10 P8)
shipped: docs only - no deploy. (a) Pipeline finding: the 11:00Z hourly refresh
DID fire and deploy ("7:00:15 deployed" in refresh.log); the page's "data 38 min
old" is honest warden-audit age, not staleness - apparent age = warden lag
(<=15 min) + hourly refresh cadence, worst case ~75 min. Not a bug. (b) The
armed prod tab (export 10:48Z recorded in window.__exportAt0) must sit untouched
until the 08:00 local deploy for the end-to-end self-rebuild proof, which makes
ALL browser verification impossible this cycle - so no site change was shipped
rather than shipping one unverified. (c) Wrote docs/INSTANCING-PLAN.md: the
de-risked two-cycle route (rings+caps first 87->31 calls, pillars behind an
instanceId remap second), the instanceColor breathe fallback, and the 29/29
click verify bar.
evidence: refresh.log tail read; export stamp cross-checked against warden
cadence; plan file committed.
next-observe: NEXT CYCLE (straddles 08:00): check window.__exportAt0 vs the
armed tab's current fleet.meta.exported + header age - if the tab rebuilt
itself, the whole loop (schtask -> deploy -> self-refresh) is closed. Then
portrait tap measure or instancing cycle A.

## 20 · 2026-08-09 · systemic · USEFUL/TRUTH (cadence)
scores: U9->10 L8 D9 De9 A10 P8
shipped: real cadence for every lane. The curated CADENCE dict covered 10/145;
every other card showed no schedule. gen-data now derives cadence from the
scheduler's own columns (Schedule Type / Start Time / Repeat: Every):
"0 Hour(s), 15 Minute(s)" -> "every 15 min", Daily+start -> "daily 22:45",
"At system start up" -> "at boot". Curated wording wins where present.
Coverage 10 -> 139/145. This also gives the stale-ok tension its context: a
card can now read "every 5 min" next to "ran 8 d ago" (Screen Activity) -
the contradiction is visible without any invented status logic (backlog #6
half-solved by honest data adjacency).
evidence: node-only verify (armed prod tab untouched): coverage counted
139/145; spot-checks match known truth exactly (FleetWarden every 15 min,
SocialWatch every 6 h, NycScout daily 22:45, OrreryRefresh every 1 h, ACP
dashboard at boot); live fleet.json probed redirects-off: exported 11:31:45Z
+ 139 cadences. index.html unchanged this cycle - no page verify needed.
next-observe: the armed tab (export-at-arm 10:48Z, 233s tick) should have
self-rebuilt to 11:31Z ~4 min after this deploy - check the header age on
wake. That closes schtask->deploy->self-refresh end to end.
CLOSED (same cycle, +5 min): the untouched armed tab reads "data 10 min old" -
export-at-arm 10:48Z, live export 11:31Z, no human touch between. Page
self-rebuild PROVEN. With refresh.log's autonomous "7:00:15 deployed", the
whole loop is verified: schtask -> gen-data -> deploy -> open tabs refresh
themselves. The site is now fully self-updating end to end.

## 21 · 2026-08-09 · systemic · PERF
scores: U9 L8 D8 De8 A9 P9
shipped: instancing cycle A per docs/INSTANCING-PLAN.md — 29 monument ring+cap trios (58 meshes) collapsed to 2 InstancedMesh with setColorAt per-zone hues; Y-bob kept via per-frame matrix compose; ring z-spin dropped (torus is rotationally symmetric — the spin was invisible, discovered while planning).
evidence: node --check clean · __perf at same __hold frame: 375 → 319 calls (−56 = 58 meshes − 2 instanced draws) · v31-inst.png read — rings/caps present on every monument, correct hues, room visually identical · combined check {hubClickOpensCheckpoint: true, errs: 0} — pillar raycast untouched, 11s sweep + full rec tour zero __errs · live SHA256 == local (65F9ADCB…).
next-observe: instancing cycle B (pillars behind instanceId remap, verify bar = 29/29 scripted clicks + visible breathe) — or portrait tap-target measurement if cycle B risk budget feels tight for one 5-min cycle. Calls now 319; cycle B est. ~292.

## 22 · 2026-08-09 · systemic · USEFUL/TRUTH
scores: U9 L8 D8 De8 A9 P9
shipped: backlog #6 stale-ok surfacing — cadSecs() parses the lane's own cadence ("every N min/h", daily, weekly; boot/logon/idle = no expectation), isStale() flags age > cadence·φ² with a φ³-hour floor (absorbs hourly-export + warden lag), and the card's "ran X ago" span tints amber (#e2b878) when stale. Zero invented words — the amber age reads directly against the cadence chip above it.
evidence: node --check clean · in-page probe: Screen Activity ("every 5 min", ran 8 d ago) → tint rgb(226,184,120); Fleet Warden ("every 15 min", ran 28 min ago) → no tint · v32-stale-card.png read — amber "ran 8 d ago" beside "every 5 min" chip, unambiguous · sweep 120 frames + full tour enter/exit {reel:false, errs:0} · live SHA256 == local (7498A004…).
next-observe: instancing cycle B (pillars, 29/29 click bar per INSTANCING-PLAN.md) is the remaining planned item; also consider whether stale tint should reach the floor ledger / member rows once card-level proves useful.

## 23 · 2026-08-09 · systemic · USEFUL/TRUTH
scores: U9 L8 D8 De8 A9 P9
shipped: stale amber extended from the card to both list surfaces — group-card member rows and status-view rows append the lane's age in amber (#e2b878) inside the .st span when isStale(). Same φ² rule, zero new words; a scan of "106 ok" now shows which ok lanes are actually ancient.
evidence: node --check clean · status view probe: 106 rows, 66 amber (honest — jobhunt/board lanes are deliberately disabled and 4-21 d old) · v33-status-view.png read — amber "8 d ago · OK" vs clean "OK", at-boot lanes correctly untinted · group card probe via real pillar click at GROWTH: "job engine" 7/7 members amber with true ages · sweep + tour {reel:false, errs:0} · live SHA256 == local (64E3CC86…).
finding: 66/106 "ok" lanes exceed their own cadence by φ² — the fleet's ok column is mostly dormant-in-practice. That is now visible instead of buried.
next-observe: instancing cycle B (pillars, 29/29 click bar) remains the planned perf item; a fundamental cycle is due soon (last research was iter 19). Consider whether the header "106 ok" counter itself should hint how many of those are stale.

## 24 · 2026-08-09 · fundamental · USEFUL/TRUTH
scores: U9 L8 D8 De8 A9 P9
shipped: freshness elevated to a first-class state. Research: Grafana and Datadog both treat "no data / silent" as a distinct alert state from OK and error, because silence is not health (grafana.com nodata-and-error-states; docs.datadoghq.com troubleshooting-no-data). Applied in the room's own language: hud() computes nodes.filter(isStale) and renders an amber "◔ N" cbtn in the header; openStatus('stale') filters the system view to quiet lanes across ALL statuses. Glyph + number — no invented on-screen words (title attr only, per the ⌕ precedent).
evidence: node --check clean · header renders "◔ 90" (90/145 quiet — status-orthogonal: 66 ok + terminated/refused/failed ones) · click probe {open:true, name:"◔ 90", lede:"90 of 145 lanes", rows:90, amberCount:90, closed:true, errs:0} · v34-stale-view.png read — amber ages beside real last results (OK, TERMINATED, REQUEST_REFUSED, GENERIC_FAILURE), status dots intact · sweep + tour {reel:false, errs:0} · live SHA256 == local (CEC5B284…).
finding: 90 of 145 lanes are quiet-in-practice. The room now says so at the top line instead of only under clicks.
next-observe: whether ◔ deserves a legend row (Marco's copy call — legend words are his); instancing cycle B still parked; portrait tap-target measurement still unmeasured.

## 25 · 2026-08-09 · systemic · LEGIBLE/mobile
scores: U9 L9 D8 De8 A9 P9
shipped: portrait observation found the whole counts line (145 units … ◔ 90) was display:none under 700px — phones (the reel audience) saw none of the live truth. Header now flex-wraps; counts become a third-row scrollable one-liner (11px, scrollbar hidden, cbtns padded 6px for touch); crumbs pushed to 62px. Iter-24's ◔ counter included.
evidence: v35-portrait.png read (before: no counts) vs v35-portrait-fixed.png read (after: full line fits 390px, ◔ 90 amber at end) · portrait tap probe on ◔: {open:true, name:"◔ 90", rows:90, amberCount:90, closed:true, errs:0} · viewport restored 1366×768 (verified via innerWidth after an emulate 0×0 misstep clamped to 500×39) · desktop sweep + tour {reel:false, errs:0} · live SHA256 == local (69155F63…).
next-observe: tile tap-target size on portrait remains unmeasured (the original backlog #3 question). Instancing cycle B still parked. Also check crumbs/buttons row spacing on a real phone when Marco next has one on the page.

## 26 · 2026-08-09 · systemic (measurement) · USEFUL/mobile
scores: U9 L9 D8 De8 A9 P9
shipped: no code — the backlog-#3 measurement, run properly. Portrait 390×844 tile-tap probe on live prod. First two probe rounds returned wrong tiles (row-1 taps opening row-3 cards) which looked like a UV-mapping bug; code read showed draw and tileAt share the same tileGrid math, so the third round froze the renderer with __hold(1) and tapped from the exact screenshot frame.
evidence: frozen-frame taps: (80,225)→Affiliate Tick ✓ · (146,288)→Hundred Today ✓ · (213,345)→Stage Batch ✓ · gap (113,225)→Aurum Cycle (adjacent, as designed) · far receding-edge column (346,225)→null (angled-wall foreshortening; ⌕ covers it) · zero __errs · verdict RULES-OUT: hit mapping correct, earlier misses were the probe racing idle camera drift, not a product bug. Projected cell pitch ≈60px ≥ 44px HIG floor.
note: methodology lesson written into practice — any coordinate-based probe against this site must run under __hold; the never-freeze drift otherwise poisons the measurement (twice today).
next-observe: portrait #dept-name wraps with an orphan letter ("R E V E N U E / E") at 390px — small LEGIBLE fix candidate. Instancing cycle B still parked.

## 27 · 2026-08-09 · systemic · LEGIBLE/mobile
scores: U9 L9 D8 De8 A9 P9
shipped: portrait zone name fixed — was wrapping with an orphan letter ("R E V E N U E / E"). Mobile rule: nowrap, 14px (existing scale step — first attempt at 16px tripped the design audit's 9-sizes FAIL, corrected), .12em spacing, max-width 100vw−132px. Two build lessons burned in: (1) the ≤700px header media block sits ABOVE #deptnav's base rules, so an equal-specificity rule there silently loses the cascade — the rule now lives in its own media query below the base; (2) 17px + .2em ellipsized 4 of 8 zone names — the name is the truth, so shrink beats truncate.
evidence: computed font-size 14px confirmed post cache-bust · all 8 zones measured {h:21, oneLine:true, overflow:false} (before: h:33 wrap-risk, 4 zones ellipsized) · v37-deptname.png read — "F I N A N C E / odds watched, never fired" clean at 390px · sweep + tour {reel:false, errs:0} · live SHA256 == local (2F66C57D…).
next-observe: mobile pass feels complete (header truth row, search, tap targets ruled out, zone name). Remaining parked: instancing cycle B. Consider a fresh full-room desktop read next cycle for anything the mobile focus missed.

## 28 · 2026-08-09 · systemic · ALIVE/TRUTH
scores: U9 L9 D8 De8 A9 P9
shipped: the header data-age now holds the site to its own amber standard — setAge() tints "data N old" #e2b878 when export age exceeds the hourly refresh cadence by φ² (~2.6 h). If gen-data/the schtask ever dies, the top-right corner says so instead of quietly counting up. window.__age(iso) test hook added alongside __hold/__step.
evidence: node --check clean · branch test {old: rgb(226,184,120) at "data 4 h old", fresh: clean at "data 20 min old", errs: 0} · observed the 09:00Z-hour refresh land during the cycle (data 1 h → 14 min, counts 6→5 running, 17→18 flagged — pipeline alive end-to-end) · sweep + tour {reel:false, errs:0} · live SHA256 == local (4D8773F3…).
next-observe: freshness language is now complete (cards → lists → header counter → the site itself). Parked: instancing cycle B. Fresh candidates: ALERTS wall panel could carry ages; DEPTH grounding under the orb.

## 29 · 2026-08-09 · systemic · DENSITY/TRUTH
scores: U9 L9 D8 De9 A9 P9
shipped: all four wall terminals (LIVE NOW / SYSTEM LOG / ALERTS / ACTIVITY) gain a right-aligned compact age column per row (ageShort: Nm/Nh/Nd from n.last), amber #e2b878 when isStale(n), dim grey otherwise; detail column trimmed 24→19 chars to make room. ALERTS now answers "broken for how long" — 18d vs 3h flags are different priorities and the wall says so.
evidence: node --check clean · v39-panels.png + 10x crop v39-alerts-zoom.png read — every row shows label · detail · right-aligned age, amber on stale rows, clean column separation at 622px within the 640px canvas · sweep + tour {reel:false, errs:0} · live SHA256 == local (136B3E12…).
next-observe: freshness/truth arc genuinely complete now across every surface. Next candidates: DEPTH orb grounding, instancing cycle B (parked), or a fresh fundamental question (~due next cycle: what does a first-time IG visitor still not GET in 10 s?).

## 30 · 2026-08-09 · fundamental · USEFUL/first-visit
scores: U10 L9 D8 De9 A9 P9
shipped: kiosk attract mode. The fundamental question was "what does a first-time IG visitor not get in 10 s?" — answer: they never press ● TOUR, so the room never shows itself. Research (kioskindustry.org UX checklist, kioskmarketplace idle-timeout): attract loop starts on idle, first touch ends it instantly, loop stays short. Applied: after 13 s (F(-1)) of no input at level 0, startReel() fires once per session; any pointerdown exits (pre-existing reel behavior); guards for reduced-motion, hidden tab, open card, filters, and boot completion. enter() resets the idle clock so 13 s counts from the entering tap.
evidence: node --check clean · 30 s timeline after fresh load + intro click: reel false→true at s12-13→false at s22 (full tour, auto-exit, no refire) · first probe run also confirmed no-refire over a further 15 s and instant exit on tap · sweep + tour {reel:false, errs:0} · live SHA256 == local (D912A9D2…).
next-observe: watch whether attract feels right at real cadence (it fires during quiet demo views — by design). Parked: instancing cycle B, DEPTH orb grounding.

## 31 · 2026-08-09 · systemic · DEPTH + TRUTH bugfix
scores: U10 L9 D9 De9 A9 P9
shipped: (a) CORE contact-shadow pool — radial-gradient decal (FIB(4)·2 plane, canvas gradient rgba(4,6,16) .5→0) at the column base; a 300-high mass now sits in a faint wide pool instead of floating. (b) Sentinel-age purge, found DURING verification: the close-up read of the ALERTS panel showed "Scope Weekly · NEVER_RAN · 9749d" — schtasks reports never-ran as an epoch-era date and every age surface treated it as data. One normalization at boot (delete n.last when age > 1e11 ms ≈ 3.2 y) fixed card, panels, ledger and isStale at once.
evidence: node --check clean · close-up v41-pool.png read (also live-proved panel age columns: 18d/51d/74d amber) · Scope Weekly card now reads "NEVER_RAN" with no invented age · header ◔ 90 → ◔ 88 (sentinel lanes no longer counted) · sweep + tour {reel:false, errs:0} · live SHA256 == local (C87DF229…).
finding: the verification bar keeps paying — three of the last six cycles found a real defect only because a screenshot got READ at close range.
next-observe: gen-data could drop the sentinel at source too (display now guards regardless). Parked: instancing cycle B.

## 32 · 2026-08-09 · systemic · VISUAL (Marco steer encoded)
scores: U10 L9 D9 De9 A9 P9
shipped: Marco's live steer — "make it fast, efficient and awesome looking" — written into EVOLUTION.md as a co-primary visual axis (at least every other cycle ships a visible look upgrade). This cycle's visible upgrade: every zone's luminous wall now bleeds its hue onto the floor — 8 additive gradient strips (F(6)×F(3), shared alpha texture, per-zone tint, opacity .38) at wall bases, oriented by slot normal. The floor stops being flat navy at the edges; the room's light behaves like light.
evidence: node --check clean · v42-bleed.png (close) + v42-bleed-home.png (home) read — hue pools at GROWTH/MARKETING/DATA/WORLD-CUP bases, gradient falls room-ward, strongest near walls · __perf 330 calls (+8, as budgeted; was 322) · sweep + tour {reel:false, errs:0} · live SHA256 == local (94EAC4E9…).
next-observe: next visual candidates ranked — (1) monument ring/cap specular pop (cheap material upgrade), (2) orb chroma pulse tied to running count, (3) starfield density/parallax layer. Hold perf ≤ ~350 calls. Instancing cycle B still parked as the perf reserve.

## 33 · 2026-08-09 · systemic · VISUAL/DEPTH (sky)
scores: U10 L9 D9 De9 A9 P9
shipped: the atrium void — the top band of every frame — was near-black. Added a near star layer (F(4)=144 points, bigger/sparser/lower than the 520 far stars, for parallax contrast) and three nebula sprites (F(7)/F(7)/F(8) scale, shared radial texture tinted violet/teal/lavender, additive, opacity .42, fog off). The ceiling now reads as deep space instead of empty black.
evidence: node --check clean · v43-sky.png read — violet nebula glow top-centre, layered star density, wall-bleed strips from 32 visible at zone bases · __perf 335 calls (+5, budget ≤350 holds) · sweep + tour {reel:false, errs:0} · live SHA256 == local (9711C5ED…).
next-observe: visual ranked next — monument ring/cap specular (needs a lit-material test against the hue system first), orb chroma pulse refinement. Perf reserve: instancing cycle B (−28) if calls approach 350.

## 34 · 2026-08-09 · systemic · VISUAL (materials) — PENDING-DEPLOY
scores: U10 L9 D9 De9 A9 P9
shipped: COMMITTED, NOT YET LIVE — vercel free-tier daily deploy cap (100/day, "api-deployments-free-per-day") tripped after 28 loop ships today + the fleet's other deploy lanes. Live host still serves iter 33 (9711C5ED). The change: monument ring+cap InstancedMesh go MeshStandardMaterial (metalness .8/.65, roughness .3/.25, faint white emissive so dark sides never go black); rings gain specular arcs and shaded undersides, caps read as lit spheres. Same 2 instanced draws — 335 calls.
evidence: node --check clean · v44-ring-zoom.png read (6x crop: dimensional shading, hues intact vs v31-inst.png flat donuts) · sweep + tour {reel:false, errs:0} · local hash 063A2988; live intentionally NOT claimed.
DEPLOY RULE (until quota resets ~24 h): keep building + committing each cycle; attempt ONE deploy per cycle and treat quota-refusal as normal — log PENDING-DEPLOY, never claim live. First successful deploy carries all batched work; verify hash then.
next-observe: confirm when a deploy lands and clear the pending queue in the log. Note the hourly ClaudeOrreryRefresh data deploys are also blocked — header data-age will amber past 2.6 h BY DESIGN, which is the system telling the truth about itself.

## 35 · 2026-08-09 · systemic · VISUAL+DEPTH (grounding) — PENDING-DEPLOY
scores: U10 L9 D9 De9 A9 P9
shipped: COMMITTED, NOT LIVE (quota, per rule) — monument light pools: every one of the 29 monuments now stands in its own soft floor glow, hue-tinted per zone, one InstancedMesh of F(2)-radius radial-gradient planes (additive, depthWrite off). Kills the last "floating pillar" read; backlog #5 (DEPTH grounding) is substantially addressed at +1 draw call (336, budget ≤~350).
evidence: node --check clean · v45-pools-home.png read (all 29 pools visible, hue-matched, not blown out) · v45-pools-zoom.png read (2x crop: teal FORTUNE / purple JOB-ENGINE pools ground their pillars) · sweep + tour {reel:false, errs:0} · __perf 336 calls · deploy attempt refused api-deployments-free-per-day; live still 9711C5ED (iter 33). Pending queue: 34 (lit ring materials) + 35 (light pools).
next-observe: attempt deploy first — if it lands, hash-verify and confirm BOTH pending iters visible live. Visual ranked next: orb chroma pulse refinement; then consider pool subtle breathe tied to running state (data-backed, cheap).

## 36 · 2026-08-09 · systemic · ALIVE+VISUAL (pool breathe) — PENDING-DEPLOY
scores: U10 L9 D9 De9 A9 P9
shipped: COMMITTED, NOT LIVE (quota, per rule) — a monument's light pool now BREATHES only while its checkpoint has a live running member: per-instance color sine (amplitude (φ−1)·.6, period ~4.8 s, phase from the ring's own φ spin) on the pools InstancedMesh. The floor itself shows where work is happening right now — data-backed, zero added draws (336). Also added window.__pool(i) debug hook (matches __orb/__age precedent).
evidence: node --check clean · numeric verify: running pool hex e0d6a8→c6be95 across a 2.2 s __step while idle pool held efd2b4 constant; 3 of 29 pools live · sweep + tour {reel:false, errs:0} · __perf 336 calls · deploy refused api-deployments-free-per-day. Pending queue: 34 (lit rings) + 35 (light pools) + 36 (pool breathe).
next-observe: deploy attempt FIRST (quota reset ~10:00 tomorrow or sooner). Visual ranked next: orb chroma pulse refinement. Watch that three PENDING iters landing at once all verify in one screenshot pass.

## 37 · 2026-08-09 · FUNDAMENTAL · ALIVE (data pipeline) — PENDING-DEPLOY
scores: U10 L9 D9 De9 A10 P9
shipped: COMMITTED, NOT LIVE (quota, per rule) — the data pipeline paradigm changed. Research: refresh.cmd already pushed fleet.json to GitHub main hourly, but the page only read its baked-in copy, so data freshness was chained to Vercel deploys (the exact resource that's quota-capped) AND the hourly refresh itself burned ~24 deploys/day — a root cause of tripping the 100/day cap. Change: (1) page pulls fleet.json raw-first (raw.githubusercontent.com, CORS *, ~5 min CDN cache) with relative-path fallback for forks/offline, both at boot and on the 233 s tick; (2) refresh.cmd drops its vercel deploy step entirely — a git push IS the data publish now. Once ONE code deploy lands, data stays fresh forever without another deploy, and the fleet stops spending quota on data ticks.
evidence: node --check clean · performance resource log shows boot fetched https://raw.githubusercontent.com/.../fleet.json status 200 (63 ms), fallback unused · real data booted (counts populated), errs 0 · sweep + tour {reel:false, errs:0} · raw URL probed via curl: exported 2026-08-09T13:48:28Z matches the hourly push. Pending queue: 34+35+36+37.
next-observe: deploy attempt FIRST. When it lands: hash-verify, then confirm live page fetches raw (network entry) and the header age tracks GitHub pushes with no further deploys. Check refresh.log next hour shows "pushed" (not "deployed").

## 38 · 2026-08-09 · systemic · SHIP (queue landed) — ALL LIVE
scores: U10 L9 D9 De9 A10 P9
shipped: the entire pending queue (34 lit rings · 35 light pools · 36 pool breathe · 37 raw-GitHub data) is LIVE — hash live C0D8DB29 == local C0D8DB29, redirects off. The deploy landed via Vercel's GIT INTEGRATION on the iter-37 push once the rolling 24 h quota freed; my CLI attempts were refused the whole time. DEPLOY RULE AMENDED: a git push to main IS the deploy attempt (Vercel auto-builds it) — the CLI call is redundant; the hash check remains the only verdict that counts. No new code change this cycle: landing + full live verification of four batched iterations is the cycle's work.
evidence: live screenshot read (pools + lit rings visible on prod) · live eval: fleet.json fetched from raw.githubusercontent.com, 3 pools breathing (f9eebc→d9d0a3 across 2.7 s step), errs 0, 336 calls · sweep + tour on LIVE {reel:false, errs:0} · data age 46 min ambers until the next hourly refresh push — which now publishes WITHOUT spending any deploy.
next-observe: refresh.log at the next hour boundary must say "pushed" (not "deployed") and the live header age must drop after it — that closes the loop on iter 37. Visual ranked next: orb chroma pulse refinement.

## 39 · 2026-08-09 · systemic · VISUAL+ALIVE (orb health chroma) — LIVE
scores: U10 L9 D9 De9 A10 P9
shipped: the CORE orb is now a health beacon — it warms with the fleet's flagged fraction. uFlag = clamp((flagged/units − .05)·2.2): 0 below 5% flags, 0.163 at today's 18/145. Shader: luma-remapped ember mix (vec3(1,.36,.10)·lum·2.2, strength ember·.75) with a slow pulse (sin nt·2.6), applied after all color adds, before ACES. Two dead ends documented: a multiplicative tint can NOT turn a blue-dominant additive-looking stack orange (channel product stays small — reads gray), and a lifted-black luma floor washes the void instead of warming highlights. Debug hooks: __orbFlag(v) setter + flag in __orb. Deployed by the git push (integration), CLI never called.
evidence: node --check clean · numeric: orb body avg RGB flag0 (4,7,24) → flag1 peak (72,67,75), r/b ratio 0.17→0.96 · v54-orb-peak2-zoom.png read: warm ivory-peach lattice at crisis vs cool blue-white normal · sweep + tour {reel:false, errs:0} · live hash 80A6E4EF == local, redirects off. VERIFY LESSON: __step with absolute timestamps LOWER than the page's real clock freezes jdt-driven uniforms and can throw the camera — always step with performance.now()+k·Δ.
next-observe: refresh.log next hour boundary should say "pushed" and header age should drop — closes iter 37. Then: consider surfacing the ember mapping in the ⓘ/status UI (Marco authors any copy), or next visual item.

## 40 · 2026-08-09 · systemic · VISUAL+DEPTH (atrium trim) — PENDING-DEPLOY · iter-37 pipeline CLOSED-VERIFIED
scores: U10 L9 D10 De9 A10 P9
shipped: (a) COMMITTED, NOT LIVE — atrium cove trim: 4 teal box strips (existing strip idiom, 0x8be2b9 at .45) trace the roof opening (|x|<400, −600<z<400) at ROOM.h−1.4, so the rim reads as cut architecture instead of dead black; 338 calls (+2 visible from home view, 2 culled). (b) VERIFIED IN PROD: the new refresh.cmd fired at 11:00:12, logged "pushed" (no deploy), and the LIVE page's header dropped from "data 1 h old" to "data 16 min old" with counts updating 5→6 running, 18→17 flagged — while still serving iter-39 code. Data now flows to production with zero deploy spend. Iter 37 closed.
evidence: node --check clean · v55-atrium.png read (teal opening frame against the starfield, perspective lines converge correctly) · sweep + tour {reel:false, errs:0} · 338 calls · refresh.log "[11:00:12] pushed" · live preview re-read after data push: age 16 min, counts changed · live hash 80A6E4EF (iter 39) vs local 200032EC — code deploy pending, quota presumably re-tripped.
next-observe: hash check FIRST (iter-40 trim may have landed). Then next visual ranked: the far-wall CORE banner area behind the orb, or floor-center emptiness. Perf reserve unchanged (instancing cycle B, −28).

## 41 · 2026-08-09 · systemic · EXPERIMENT (floor 24h dial) — RULES-OUT, reverted
scores: U10 L9 D10 De9 A10 P9 (unchanged — nothing shipped)
shipped: NOTHING — built and reverted a center-floor 24-hour dial (every lane with a <24 h timestamp plotted at its last-run hour angle, dept-hued, recency-sized; ring at F(4), 1 InstancedMesh, 339 calls, errs 0). Two placements tried and screenshot-read: z=−420 (perspective crushes it to an invisible sliver) and z=−60 r=144 (visible but reads as "another faint circle" among zone discs, overlaps the floor-ledger text, and its MEANING is unknowable without a label). The label is the blocker: on-screen copy is Marco's to author, and an unlabeled data-viz that viewers can't decode is decorative fluff by the DENSITY rule, however real its data. RULES-OUT until Marco supplies a label (e.g. a two-word floor caption) — then the dial is one small commit away; the build is in this entry's diff history (commit-free, in reflog via this log).
evidence: v56-dial.png + v57-dial2.png read (both placements) · git checkout reverted, working tree clean · live still 80A6E4EF (iter 39), iter-40 trim still pending deploy.
next-observe: hash check FIRST (iter 40 atrium trim). Ranked next (visual, no-copy-needed): far-wall CORE banner area behind the orb; monument pillar instancing reserve if calls near 350. Offer Marco the dial label as a fill-sheet line when he next surfaces.
