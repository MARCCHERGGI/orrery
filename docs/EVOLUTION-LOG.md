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

## 42 · 2026-08-09 · systemic · TRUTH+USEFUL (panel recency) — PENDING-DEPLOY · iter-40 confirmed LIVE
scores: U10 L9 D10 De9 A10 P9
shipped: (a) iter-40 atrium trim confirmed LIVE (live hash == HEAD blob 200032EC; local-file hash differs only by checkout CRLF — HASH RULE AMENDED: compare live against `git show HEAD:index.html`, not the working file). (b) Tour keyframe audit for the IG reel: 2.5 s sweep, 6 s zone close-up, 9.5 s wide — all read well with the visual arc; PASS, no keyframe fix. Found in the 6 s frame: the ALERTS wall panel led with 74-day corpses (Hermes Brief REQUEST_REFUSED 74d) above today's failures. (c) COMMITTED, NOT LIVE — wall panels now rank recency-first (byStatus sorts by n.last desc; SYSTEM LOG joins the same path). Months-dead lanes stay listed but sink: the wall tells today's truth before history. + __panel(title) debug hook.
evidence: node --check clean · numeric: __panel('ALERTS') top-5 leads 2026-08-05/08-01 (was May corpses), __panel('SYSTEM LOG') leads today 15:00Z · sweep + tour {reel:false, errs:0} · deploy poll 3 min timeout; live still 200032EC (iter 40), pending: 42. NOTE: reel restarts are flaky on the first attempt after an exit (click sometimes no-ops) — retry once; also tourKeys() varies its featured zone between runs.
next-observe: hash check vs HEAD blob FIRST. Visual ranked next: far-wall CORE banner area; perf reserve: pillar instancing (−28) if calls near 350 (now 338).

## 43 · 2026-08-09 · systemic · LEGIBLE+TRUTH (portrait age) — PENDING-DEPLOY · iter-42 confirmed LIVE
scores: U10 L10 D10 De9 A10 P9
shipped: (a) iter-42 panel recency confirmed LIVE (blob 626AD8AC == live). (b) Portrait audit at 390×844 on LIVE: header wrap, pools, atrium trim, orb, dept nav all read correctly — the visual arc holds on phones; also observed attract mode fire correctly on idle portrait (HUD hidden by the reel class as designed — first read looked like a missing-HUD bug, it wasn't). (c) COMMITTED, NOT LIVE — the one real gap: `header .age { display:none }` on ≤700px (an iter-25 space save that predates the freshness arc) hid the site's own honesty signal from phone viewers, who are the IG majority. Now shown compact at 11px (on-scale; design-audit hook rejected 10px as a 9th size — kept the scale).
evidence: node --check clean · eval: #age rect [60,56,76,17] visible at 390×844 · v62-header-zoom.png read (title / crumb+age+buttons / counts rows, no crowding) · sweep+tour {reel:false, errs:0} at restored 1366×768 · bounded poll: live still 626AD8AC, pending: 43.
next-observe: blob-hash first. Visual next: CORE far-wall banner area; fundamental due soon (last: 37) — candidate paradigms: level-1 zone view composition, or the intro/first-tap experience.

## 44 · 2026-08-09 · FUNDAMENTAL · PERF (pillar instancing cycle B) — LIVE (carries 43)
scores: U10 L10 D10 De9 A10 P10
shipped: the monument pillars went instanced — 338 → 295 draw calls (−43; the whole monument system is now 8 pillar draws + 2 ring/cap draws + 1 pool draw, was 87+). Serves the /goal's "fast, efficient" directly. The road there matters: the planned single-InstancedMesh + instanceColor route FAILED — three r161 ignores instanceColor on MeshStandardMaterial in this scene (proven: pure-red setColorAt rendered white; MeshBasic pools show instanceColor fine). Landed on the plan's fallback, upgraded: 8 per-dept InstancedMesh, each with the ORIGINAL per-dept emissive material (pixel-identical hues, zero shader patches); per-monument RUN signal already lives in the pool breathe (iter 36), so per-pillar material animation was deleted, not ported; hover regained per-pillar precision via a single additive ghost shell that visits the hovered pillar. Raycast remap: userData.idx[instanceId] → monRings row. New verify hooks __mon(i)/__lvl().
evidence: node --check clean · __perf 295 calls, errs 0 · scripted click grid 29/29: 28 direct level-2 opens with the RIGHT group + monument 0 center occluded by a legitimate clickable agent light ("war room") that resolves to the same group — occlusion, not mapping · hover: cursor=pointer + ghost glow read in v68-ghost-zoom.png · hues verified against v55 (teal/purple/orange/blue identical) · sweep + tour {reel:false, errs:0} · live hash 0A19F5F2 == HEAD blob, redirects off — iters 43+44 both live.
next-observe: with ~55 calls of headroom under the 350 budget, visual investment is affordable again — ranked: CORE far-wall banner area, further atmosphere. Also confirm the pool breathe still reads as the run signal on live (it is the sole per-monument run indicator now — check __pool on a running index).

## 45 · 2026-08-09 · systemic · DEPTH+ALIVE (CORE column packets) — PENDING-DEPLOY
scores: U10 L10 D9 De9 A10 P10
shipped: the CORE light column now carries traffic — M=21 purple packets (0xbfa7ff, additive Points, one draw) rise inside the column from the floor bus (y=6) into the brain (wrap at 298), φ-staggered start heights via golden-angle spiral, per-index speeds .55+(i%9)·.07. The column was the last static major structure; it now reads as the spine feeding the orb — data visibly flows floor→brain. Also confirmed on LIVE first: 4 running pools breathe (hex b6f2d7→baf7db across a stepped interval, iter-36 signal intact post-instancing). New hook __col() → packet heights.
evidence: node --check clean · numeric motion: __col heights [17.6,35.9,54.2,59.3,77.6] → [34,58.7,83.3,75.8,100.4] over 30 stepped frames, per-index speed spread visible · v70-col-b-zoom.png read: purple column renders into the brain · __perf 298 calls (+3 vs 295: trim strips now in frustum + 1 Points), errs 0 · sweep + tour {reel:false, errs:0} · pushed 03E00E2B; bounded poll 10×12s — live still 0A19F5F2, pending: 45.
next-observe: hash check vs HEAD blob FIRST (03E00E2B or later). Then: CORE far-wall banner area remains the top visual candidate; fundamental due (last: 44 counted as the ~4th-cycle fundamental) — candidate paradigms: level-1 zone view composition, intro/first-tap experience.

## 46 · 2026-08-09 · systemic · DEPTH (contact shadows, backlog #5) — PENDING-DEPLOY · iter-45 confirmed LIVE
scores: U10 L10 D10 De9 A10 P10
shipped: (a) iter-45 CORE column packets confirmed LIVE first (blob 03E00E2B == live; purple stream visible in overview read). (b) Contact shadows under all 29 monuments — a dark radial blob (F(0) radius, opacity .6, normal blending) at each pillar base, one InstancedMesh draw, renderOrder shadow(1)→pool(2) so the additive pool glows OVER the darkening at near-equal depth. Pillar bases now sit IN the floor instead of floating on the pool glow — backlog #5's monument half done; the orb needed nothing (the column grounds it since 45).
evidence: node --check clean · before/after crops v72-crop-before/after.png READ: dark base footprint visible on teal + purple clusters · __perf 299 calls (+1), errs 0 · sweep + tour {reel:false, errs:0} · pushed 12C7882D; bounded poll 10×12s — live still 03E00E2B, pending: 46.
next-observe: hash check vs HEAD blob FIRST (12C7882D or later). Fundamental due next cycle (~4 since 44) — candidates: level-1 zone view composition, intro/first-tap experience; research first. Backlog remaining: #6 stale-ok cadence marker (needs gen-data cadence field).

## 47 · 2026-08-09 · FUNDAMENTAL (intro paradigm review) · LEGIBLE — LIVE (carries 46)
scores: U10 L10 D10 De9 A10 P10
shipped: researched the intro/first-tap paradigm against the winner pattern (scene visible behind title → auto-enter → continuous motion). Verdict: the structure already matches — auto-enter at 3.4s, portal-rig idle sway gives pre-enter motion, camera untouched. The one real defect was legibility: intro copy sat directly on the bright scene (sub + hint washed out, proven in v73-intro-early.png). Shipped the missing layer: a dark pool (62%×46% ellipse, .68) + edge vignette behind the copy, pure CSS on #intro, fades out with .gone. Marco's copy untouched. Verify lesson learned: catching the 1.4–3.4s intro window via blind sleeps is flaky — reconstruct the resting state instead (remove .gone + cloneNode to detach the pending remove(), then screenshot).
evidence: node --check clean · DOM probe: computed backgroundImage carries both gradients · v73-scrim.png (reconstructed resting intro) READ: title crisp, sub fully legible on the pool, room visible through it — vs prod v73-intro-early.png washout · sweep + tour {reel:false, errs:0} · live hash 5D54E8B0 == HEAD blob redirects-off — iters 46+47 both LIVE.
next-observe: confirm shadows + scrim on live with a fresh-eye pass. Ranked: repeat-visit fast-entry (localStorage seen → shorter armIntro delay) as a small usefulness item; CORE far-wall banner area still open for visual; backlog #6 stale-ok cadence marker (needs gen-data cadence field).

## 48 · 2026-08-09 · systemic · USEFUL (repeat-visit fast entry) — PENDING-DEPLOY · 46+47 confirmed LIVE on fresh-eye pass
scores: U10 L10 D10 De9 A10 P10
shipped: (a) fresh-eye live pass first: contact shadows ground the monuments, column packets read, scene coherent at 5D54E8B0. (b) Returning viewers get the room in 1.3s (F(-1)·100 ms): enter() sets localStorage orrery-seen, armIntro reads it and shortens the auto-enter 3400→1300 ms. First-timers keep the full identity beat; Marco and repeat IG viewers stop paying 3.4s per load. try/catch guards private-mode storage.
evidence: node --check clean · probe pair at the same ~2.4s mark: first visit {entered:false, seen:null} → flag "1" after enter → return visit {entered:true} · sweep + tour {reel:false, errs:0} · pushed 9239997E; bounded poll 10×12s — live still 5D54E8B0, pending: 48.
next-observe: hash check FIRST (9239997E or later). Ranked: backlog #6 stale-ok cadence marker (research gen-data.mjs/warden for a cadence field — the one remaining TRUTH gap); CORE far-wall banner stays parked until Marco authors copy.

## 49 · 2026-08-09 · systemic · TRUTH (backlog #6 research) — RULES-OUT, no page ship · iter-48 confirmed LIVE
scores: U10 L10 D10 De9 A10 P10
shipped: docs only — backlog #6 (stale-ok surfacing) closed after research. Finding 1: it is ALREADY implemented — isStale() ambers the card's "ran X ago" at age > cadence·φ² (φ³-h floor), with "next in…" beside it; the backlog entry was itself stale. Finding 2: anything louder would be anti-truth — 90/118 covered lanes trip a 2.5×-cadence check, but the ~206 h cluster (incl. CrowResident, provably alive at 10-min cadence) is the Aug-1 :7799 bus-migration artifact; schtasks `last` is not ground truth post-migration. The scheduler-computed `next`-overdue check (the one honest new signal) covers 25 lanes and trips 0 today — not worth surface area. Page untouched; truer fix is warden/gen-data side someday.
evidence: node probe on data/fleet.json: 25 lanes with next, 0 overdue at export; 90/118 "stale" incl. known-alive lanes (list in transcript) · live hash 9239997E == HEAD blob — iter 48 LIVE · page code untouched this cycle by design.
next-observe: ranked for 50: further atmosphere/visual polish within ~50-call headroom (steer: every other cycle visibly better — 49 shipped nothing visible, so 50 MUST); CORE far-wall banner stays parked for Marco copy. Fundamental cadence: next due ~51.

## 50 · 2026-08-09 · systemic · DEPTH+visual (the air) — PENDING-DEPLOY
scores: U10 L10 D10 De9 A10 P10
shipped: F(4)=144 dust motes drift through the room volume — one additive Points draw (0xaebcf2, size 2.1, opacity .38), golden-angle scattered through hw·.88 × h·.78 × full depth, slow rise with per-mote speed spread + lateral waft, wrap at h·.9. The parallax of near-vs-far motes against camera sway is the classic volume cue the portal lacked; reduced-motion users get static motes. Rebuild-safe (dust reset in buildWorld).
evidence: node --check clean · v75-dust-zoom.png READ: motes visible floating in front of wall panels, distinct from the sky-band starfield, atmosphere-subtle · __perf 301 calls (+2 within culling variance of the 299 baseline), errs 0 · sweep + tour {reel:false, errs:0} · drift code is the corePulse pattern (numerically verified iter 45); presence verified by crop, per-mote motion not independently probed — stated honestly · pushed E5FDDBB5; bounded poll 10×12s — live still 9239997E, pending: 50.
next-observe: hash FIRST (E5FDDBB5 or later); confirm motes on live overview + check they don't smear in the reel. Fundamental due ~51 — strongest candidate: level-1 zone view composition (research the framing when a dept is focused). CORE banner parked for Marco copy.

## 51 · 2026-08-09 · FUNDAMENTAL (level-1 composition) · DEPTH+LEGIBLE — LIVE (carries 50)
scores: U10 L10 D10 De9 A10 P10
shipped: focus dimming — the level-1 research verdict: the oblique camera RULES-IN (preserves the portal; head-on would flatten), but the focused dept didn't own the stage because neighbor walls/monuments kept full brightness while only agents dimmed. Now every zone carries a dimming inventory (zone.traverse at build, junRings excluded — their opacity is pulse-driven) + per-dept pillar material; a frame-tick tween recedes unfocused zones to f=.42 at level ≥1 and restores at level 0, costing nothing once settled. Verified: REVENUE focus → MARKETING/DATA walls+tiles recede, REVENUE pops; roundtrip back → all zones restored full.
evidence: node --check clean · level-1 screenshot READ (dim reads clearly) · restore screenshot READ (uniform brightness) · sweep + tour {reel:false, errs:0} · false-alarm resolved with evidence: a "dim scene / missing orb" read was page-lifecycle (orb morphs in as nt starts; morph .008→1 probed) plus a stale-page probe (nav race on the shared tab — ALWAYS verify location.search in the same eval as the probe) · live hash BA855E61 == HEAD blob — iters 50+51 both LIVE.
next-observe: fresh-eye on live: dust motes + focus dimming in one pass; check the reel (tour visits zones at level 0 — dimming should never engage mid-reel since reel forces level 0). Ranked next: CORE banner parked (Marco copy); atmosphere follow-ons (ceiling light shaft) if headroom holds.

## 52 · 2026-08-09 · systemic · VERIFY-PROTOCOL (stale-canvas fix) — docs ship · 50+51 confirmed LIVE
scores: U10 L10 D10 De9 A10 P10
shipped: (a) full fresh-eye pass on live at BA855E61 with the new forced-frame protocol: orb, column packets, contact shadows, dust motes, focus-dim walls — every ship from 45-51 reads correctly on prod. (b) The cycle's real find: the relay tab background-throttles rAF, so screenshots serve a STALE canvas (old frame with pre-morph orb) while JS state probes healthy — this manufactured three false alarms today (iter 51's "missing orb" chase, twice more during intro work). Codified in EVOLUTION.md VERIFY: force 30 __step frames before every screenshot; probe state in the same eval as the screenshot decision.
evidence: probe {orb.morph:1, nt:3.15 after 14s wall} = throttled clock; same page after 30 forced frames renders the full scene (v77-live.png READ, orb bright) · live hash BA855E61 == HEAD blob · no page-code change this cycle.
next-observe: forced-frame screenshots from now on, always. Ranked: ceiling light shaft (atmosphere follow-on, ~1-2 draws); CORE banner parked for Marco copy. Fundamental due ~55.

## 53 · 2026-08-09 · systemic · visual (moonbeam) — RULES-OUT, reverted
scores: U10 L10 D10 De9 A10 P10
shipped: nothing — the ceiling moonbeam experiment failed twice and was reverted (stuck-detector: same approach, same failure). Attempt 1: open cone F(2)→F(3) from the atrium to the center floor — read as a solid gray tube colliding with the CORE column/orb story. Attempt 2: off-center at −F(5), opacity .07, full-length fade — still read as a ghost funnel silhhouetted against the near-black ceiling band, ending visibly mid-air. Verdict: the additive-cone volumetric fake needs a bright-fog scene; against this room's dark sky it reads as GEOMETRY, not light. The atmosphere budget is better spent elsewhere; the dust motes (50) already carry the air.
evidence: two forced-frame screenshots read (v78-beam.png both states) · git checkout — working tree clean, HEAD untouched at BA855E61 which remains live · errs 0 both attempts.
next-observe: visual candidates left that fit the scene's grammar: wall-strip uplights (light ON surfaces, not light IN air — the failure mode was air-light), running-lane count pulse on the header ◔. Fundamental due ~55: candidates — search/find UX, card content depth. CORE banner parked for Marco copy.

## 54 · 2026-08-09 · systemic · visual (uplights) — PENDING-DEPLOY
scores: U10 L10 D10 De9 A10 P10
shipped: uplights — each zone wall base now has floor light washing UP the wall (bleedTex flipped via rotation.z+=π, F(6)×2·F(2) band, dept hue, additive .26, DoubleSide). Light ON surfaces per the iter-53 lesson; added inside the zone group so focus dimming carries it automatically at level 1. The wall-floor junction reads lit; the room reads lit from within.
evidence: node --check clean · forced-frame screenshot READ: hue glow visible at wall bases on all visible zones, orb/scene healthy · __perf 316 calls (+13: 8 uplight draws + variance), errs 0 · sweep + tour {reel:false, errs:0} · protocol note: forced frames advance the idle clock past F(-1)s and FIRE ATTRACT — exit reel (canvas pointerdown) before reading screenshots; observed and handled this cycle · pushed 4122DF8F; bounded poll 10×12s — live still BA855E61, pending: 54.
next-observe: hash FIRST (4122DF8F or later); confirm uplights on live + dimming still correct at level 1 (uplights joined the dim inventory). Fundamental due ~55: candidates — search/find UX, card content depth. CORE banner parked for Marco copy.

## 55 · 2026-08-09 · FUNDAMENTAL (data memory) · ALIVE+DENSITY — LIVE (carries 54)
scores: U10 L10 D10 De10 A10 P10
shipped: THE RECORD — the site stops being a snapshot. gen-data.mjs now keeps a rolling per-lane status history (compact string, o/r/f/d, one sample per FRESH warden export — deduped on the export stamp so a stale file can't pad the record — last F(4)=21 kept ≈ a day at hourly cadence). The agent card renders it as a dot timeline (room status colors, 8px dots, no new font sizes) under LAST RESULT. Zero deploy cost to grow: refresh.cmd's hourly data push feeds it; the pipeline PROVED itself mid-cycle — the 14:00 refresh ran gen-data on top of my seed commit and correctly appended a second sample with the fresh 18:02Z export.
evidence: node --check clean · gen-data dual-path test: 145/145 seeded, second run same-export → no pad · card probe: {cardOpen, histShown:true, dots:1, colors:[var(--accent)]} on Fleet Warden via search+Enter · v80-record.png READ: THE RECORD section in card grammar · sweep + tour {reel:false, errs:0} · live hash C7DEBE69 == HEAD blob — iters 54 (uplights) + 55 both LIVE.
next-observe: in ~2h the record rows should show 2-3 dots — confirm accumulation on live. Uplights on live: confirm at level 1 with dimming. Ranked: CORE banner parked (Marco copy); group-card record rollup (aggregate dots per checkpoint) as a natural follow-on.

## 56 · 2026-08-09 · systemic · DENSITY (checkpoint record rollup) — LIVE
scores: U10 L10 D10 De10 A10 P10
shipped: (a) LIVE VERIFY of 51+54 together at level 1: REVENUE wall owns the frame with readable tiles, MARKETING/DATA visibly receded, uplights glow at the focused wall base — the zone view is a different product than a week ago. (b) Checkpoint cards get THE RECORD too — per aligned sample, the worst member status wins the dot (any flag → danger, else any running → accent, else all-dormant → faint, else ok). HISTC hoisted to module scope, shared by both cards. Verified on treasury: 1 danger dot, matching its flagged member.
evidence: node --check clean · scripted monument-2 click → {cardOpen, name:"treasury", ghShown:true, dots:1, colors:[var(--danger)]} · sweep + tour {reel:false, errs:0} · live hash 150D2ECF == HEAD blob — LIVE · protocol note: on the throttled tab, tweens (camera fly, focus dim) only advance under stepped frames — step ~120 to settle before reading a post-navigation screenshot.
next-observe: record rows should show 2-3 dots by ~16:00 local — confirm accumulation. Ranked: CORE banner parked (Marco copy). Consider: dormant-lane honesty (16 dormant lanes render as lit tiles; is that over-claiming?) as a research question. Fundamental due ~59.

## 57 · 2026-08-09 · systemic · TRUTH (research ×2 + a log correction) — no page ship
scores: U10 L10 D10 De10 A10 P10
shipped: docs only, three findings. (1) CORRECTION to entry 55's evidence: the claim "the 14:00 refresh appended a second sample on top of my seed" was FALSE — git log shows the refresh commit (7b66fa8, exported 18:02, no hist) predates my seed commit (b35d045); my local gen-data read the SAME 18:02 export → not-fresh path → 1 sample. All 145 lanes hold exactly 1 sample now; the FIRST real append lands with the 19:00Z refresh and must be verified next cycle, not assumed. (2) Dormant-honesty RULES-OUT: 113 of ~145 schtasks are DISABLED — including provably-alive lanes — because the Aug-1 bus migration disabled schtasks and moved execution to :7799; "Scheduled Task State" is as dead a signal as schtasks last-run. The warden verdict remains the only ground truth; the current render is already honest. (3) Portrait verify at 390×844 on live: record card renders as a clean bottom sheet, all sections legible, dots present; nothing to fix.
evidence: git log -- data/fleet.json ordering + hist length distribution {1:145} at HEAD and HEAD~1 · PowerShell schtasks query: 113 Disabled incl. EntropyScan/bus-migrated cluster · portrait probe {cardOpen, dots:1, cardRect 374×523} + v82-mobile.png READ · live hash 150D2ECF == HEAD blob, unchanged this cycle.
next-observe: FIRST: verify the 19:00Z refresh appended (raw hist length distribution should show {2:...}) — the record feature's core loop is UNPROVEN until then. Fundamental due ~59. CORE banner parked for Marco copy.

## 58 · 2026-08-09 · systemic · LEGIBLE/DEPTH
scores: U10 L9 D10 De10 A10 P10
shipped: level-2 selection shell — the hover ghost + bright group beam now HOLD on the focused checkpoint while the pointer is elsewhere (setHover falls back to selMonIdx; setLevel re-aims). Before: FORTUNE and JOB ENGINE sat at equal weight with the card open — nothing in the room said which was selected. Zero new draws; per-monument dimming RULES-OUT (pillar hue is per-dept shared material, r161 ignores instanceColor on MeshStandard — documented in code).
evidence: local 8613 — click mon 6 → level 2, pointer parked at 60,60, screenshot shows shell+glow on JOB ENGINE only, errs 0; crumb back to ALL → shell gone, level-0 screenshot clean; node --check OK; pushed 58AFB6A3, LIVE MATCH after 2 polls; prod sweep {reel:false, errs:0}.
hist-append: STILL UNPROVEN — git log confirms no scheduled refresh has committed since the b35d045 seed (18:02Z); pre-compaction "may have failed" worry resolved as premature. Next refresh 19:00Z.
next-observe: FIRST check raw fleet.json hist distribution — expect {2:145} once a post-seed refresh lands; if a refresh committed and hist is still {1:...}, debug gen-data's fresh-path in the scheduled context. Fundamental due next cycle (~59), research first.

## 59 · 2026-08-09 · fundamental · USEFUL
scores: U10 L9 D10 De10 A10 P10
shipped: deep links — the view is now an address. #dept flies to the zone, #dept/group to the checkpoint (boot + hashchange + replaceState on every setLevel; ?v cache-bust preserved; boot captures the hash before setLevel(0) can wipe it). Winner pattern: Maps @lat,lng / Figma node-id — spatial products treat view state as a URL. Marco can now drop a link straight to any checkpoint.
evidence: local 8613 — boot with #hunt/job-engine → level 2 + card open + hash intact; location.hash="#revenue" → level 1 revenue; crumb ALL → hash cleared, search preserved; monument click → #content/instagram written; errs 0 all probes; node --check OK. Bus-truth fundamental re-examined and RULES-OUT again: 7799 answers nothing, fleet-health.md has no per-lane timestamps — no ground truth to render.
THE RECORD APPEND PROVEN: refresh commit dd7a2fd (post-seed) → origin/main hist {2:145}, exported 18:48:34Z. Core loop closed.
ship status: PENDING-DEPLOY — pushed 53FCEACE, live still 58AFB6A3 after ~5 min of polling (quota trickle); this log push rides the next build.
next-observe: FIRST confirm live hash == 53FCEACE-successor blob (deep links live); spot-check a deep link on prod. The record now has 2 samples — group rollup dots should show 2. Systemic next; visual steer says ship something visible (candidates: wall-panel text truncation "STILL_RUNNING (runn" cleanup, CORE column polish).

## 60 · 2026-08-09 · systemic · LEGIBLE
scores: U10 L10 D10 De10 A10 P10
shipped: wall-panel text quality — mid-word hard slice replaced with ellipsis fit (label 26, detail 19) and the redundant "(running)" suffix stripped from detail (the ► glyph + row colour already carry it). "STILL_RUNNING (runn" → "STILL_RUNNING". All four panels.
evidence: node --check OK; local 8613 deep-linked #hunt/job-engine (deep links now serve the verify harness) — LIVE NOW panel reads clean STILL_RUNNING, no fragment; record 2 dots + selection shell both confirmed on the same screenshot; errs 0.
ship status: PENDING-DEPLOY — pushed 97AFA8F7, live still 53FCEACE after 18 polls; log push follows.
next-observe: FIRST confirm live == the new blob (panel fix + this log). Then OBSERVE fresh — L axis clean now; consider CORE column area or portrait pass. Fundamental due ~63.

## 61 · 2026-08-09 · systemic · USEFUL
scores: U10 L10 D10 De10 A10 P10
shipped: agent deep links — #a/<nodeId> boots straight to the lane's card at its checkpoint; writeHash() now unifies all URL state (agent > group > dept > clear), open()/close() participate, try/catch guards replaceState rate limits. Completes iter 59's fundamental down to the atomic shareable unit.
evidence: local 8613 — boot #a/ClaudeBoardScan → level 2 job-engine + Board Scan card + hash intact; close → #hunt at level 1; hashchange #a/ClaudeAffiliateTick → card swaps; errs 0. Prod after deploy: same boot probe clean. node --check OK.
deploy note: iter-60's PENDING-DEPLOY root-caused via Vercel API — no deployment records were minted for those pushes (deployment-creation quota window), not a build failure; the 61 push landed A3D351EE carrying 60+61, LIVE MATCH after 2 polls. Rule confirmed: batched pushes resolve stalled windows; check list_deployments before suspecting the build.
next-observe: hist should be {3:145} after the 20:00Z refresh (or {2}+{3} mix mid-cache). Visual steer: next visible ship candidates — CORE column polish, portrait spot-check of card hash flows. Fundamental due ~63.

## 62 · 2026-08-09 · systemic · LEGIBLE
scores: U10 L10 D10 De10 A10 P10
shipped: portrait HUD repair — (1) top scrim (header::before, 144px gradient) seats wordmark/controls/counts on the bright close-framed wall; (2) crumbs drop to 128px clearing the three wrapped header rows; (3) found + killed a LATENT DEAD RULE: the old portrait "#crumbs { top: 62px }" lived in a media block ABOVE the base rule — equal specificity, later source wins, so it never applied. New override placed after the base rule with a comment.
evidence: local 8613 portrait 390×844 — before: crumbs y46 colliding with age/FACE/TOUR row; after: crumbsTop probe 128, screenshot shows four clean rows on the scrim; landscape restored 1366×768 probe: crumbsTop 46, scrim absent, errs 0 both. node --check OK. Agent deep link re-verified in portrait during OBSERVE (card clean).
ship status: PENDING-DEPLOY — pushed 63824473, live still A3D351EE (quota window, same as iter 60; rule: check list_deployments before suspecting build).
next-observe: FIRST live==63824473 (or successor). hist expect {3:145} after 20:00Z refresh. Fundamental due ~63 — research first; candidate paradigms: time-in-the-room, search→checkpoint nav, tour+deep-link composition.

## 63 · 2026-08-09 · fundamental · DENSITY/ALIVE
scores: U10 L10 D10 De10 A10 P10
shipped: the record moved INTO the room — every wall tile now carries a 21-slot status strip on its bottom edge (uptime-bar grammar per GitHub/Vercel status: fixed slots, color-only, newest right; ok=quiet grey, flag=salmon pops, skipped when cells go sub-pixel). History was card-only; now the walls show it everywhere, zero new draw calls (same tile canvas).
evidence: node --check OK; local 8613 — #hunt then #hunt/job-engine (deep links as verify harness), strips ambiguous at 1366 so re-verified honestly at 1920×1080: paired grey segments visible bottom-right on every tile; errs 0; viewport restored 1366×768. hist append CONFIRMED AGAIN: 19:48Z export → {3:145}.
deploy cadence: quota window trickles roughly one build per ~10 min — iter-62 (63824473) went LIVE while 63 was building; 35D636BA now pending. Batched-push protocol handles it.
next-observe: FIRST live==35D636BA (strips live). Watch a flag lane's strip show salmon (17 flagged exist — find one's tile at level 2 and read the strip). Systemic next; visual steer satisfied by strips when they land.

## 64 · 2026-08-09 · systemic · DENSITY/USEFUL
scores: U10 L10 D10 De10 A10 P10
shipped: member record strips — each agent row in the group card carries the last-8 tail of its record (.hist-mini, 4px cells, newest right). The record now reads at every altitude: tiles (63) → group rollup (56) → member rows (64) → full agent card (55).
evidence: local ?v=95 same-eval probe {host:127.0.0.1:8613, strips:7, cells:21, errs:0} + screenshot read (··· after each name). Prod after deploy: #content/newsroom — flagged lane ClaudeConvoDaily renders 3×var(--danger) cells, ok lanes var(--ink); same-eval host verified. LIVE MATCH ACA52B1F after 2 polls (carried 63+64; quota window flowing again).
incident: mid-verify the shared relay tab was navigated to prod by an outside actor (sibling/task) — a stale-DOM probe read strips:0 and a screenshot caught the attract reel. Root-caused via location.search in a follow-up probe. RULE REINFORCED: capture location/host in the SAME eval as every probe AND every screenshot-adjacent step; a probe without provenance is not evidence.
next-observe: all record surfaces live. Fundamental due ~67. Candidates: tour refresh to showcase current visual state (research reel timing first), search→group nav, CORE banner still parked for Marco copy.

## 65 · 2026-08-09 · systemic · USEFUL
scores: U10 L10 D10 De10 A10 P10
shipped: record strips in status views — the "18 flagged" system view (and all counter views) now shows each lane's last-8 tail; strip markup extracted to a shared histMini helper used by both group and status row builders. Chronic failures ('fff') vs fresh ones read instantly on the operator's most actionable list.
evidence: local ?v=96 same-eval provenance probe {host:127.0.0.1:8613, rows:18, strips:18, firstStrip:3×var(--danger), errs:0}; screenshot read — every flagged row carries a salmon tail. node --check OK.
ship status: PENDING-DEPLOY — pushed DB6D60F8, live still ACA52B1F (quota trickle; batched-push protocol).
next-observe: FIRST live==DB6D60F8. hist {4:145} after 21:00Z refresh. Fundamental ~67: tour refresh research (reel must showcase strips/shell/uplights). CORE banner parked for Marco copy.

## 66 · 2026-08-09 · systemic · ALIVE/USEFUL
scores: U10 L10 D10 De10 A10 P10
shipped: flagged checkpoints tint their beam to CORE salmon (0xe08a7c, opacity ×φ) — at level 0 the 18 flags are now geographically visible without opening anything. setHover made base-aware (per-beam op field) so hover restore keeps the tint. Perf unchanged (color/opacity only, 317 calls).
evidence: node --check OK; local ?v=97 same-eval provenance {host:127.0.0.1:8613, lvl:0, errs:0}; screenshot read — salmon arc cluster left (marketing/newsroom flags) + right (strategy WC flags) clearly distinct from dept-hued beams. LIVE MATCH 56208A20 after 2 polls — carried iter 65 too (status-view strips now live).
next-observe: 65+66 both live — spot-check flagged view strips + salmon beams on prod. hist {4:145} after 21:00Z. Iter 67 = FUNDAMENTAL: tour refresh research first (reel must showcase strips/shell/uplights/salmon beams; keep exactly 10s; rotate heroes).

## 67 · 2026-08-09 · fundamental · (verification) 
scores: U10 L10 D10 De10 A10 P10
shipped: nothing — and that is the finding. RULES-OUT the "tour needs a refresh" hypothesis: research showed the reel showcases every post-52 feature BY CONSTRUCTION (hero step calls setLevelSilent(2) → iter-58 selection shell parks on the hero; salmon flag-beams ride the dive/pull-back; tile strips ride the wall sweep), and a full synthetic end-to-end run on prod proved it composes with all 15 ships since it was last exercised: phase trace L0→L1(sweep)→L2(hunt/job-engine)→L0(core)→L0(pull-back)→clean exit, reel off, hash cleared, errs 0.
evidence: v102 one-eval 660-frame run, host captured in-eval; trace at 2400/4480/6720/8000/9600ms all correct; done={reel:false,lvl:0,hash:"",errs:0}. Lesson: a flagship artifact untested across N ships is a liability — the verify bar's "tour clean" line is now re-anchored with a cheap repeatable one-eval harness (v102-tour.json).
also: screenshot-after-eval on a background tab CANNOT pin a tour phase (real rAF re-renders with real elapsed time between eval and screenshot; tour.start is module-scoped so the phase can't be frozen) — phase-state traces are the right evidence for animated sequences, screenshots only for static states.
next-observe: hist {4:145} after 21:00Z refresh. Systemic next (68). Candidates: search Enter→checkpoint when query names a group; ledger floor observe; CORE banner still parked for Marco copy.

## 68 · 2026-08-09 · systemic · USEFUL
scores: U10 L10 D10 De10 A10 P10
shipped: search Enter navigates — a query exactly naming a checkpoint (id or label) flies to level 2, a zone label flies to level 1, anything else opens the first matching lane as before. "job engine" ⏎ → the checkpoint; "finance" ⏎ → the zone; "board scan" ⏎ → the agent card.
evidence: local ?v=98 in-eval provenance; three-route probe r1/r2/r3 all correct with hashes #hunt/job-engine, #markets, #a/ClaudeBoardScan; errs 0. node --check OK. LIVE MATCH C1106082 after 2 polls.
next-observe: hist still {3:145} (19:48Z export) — 21:00Z refresh lands mid-next-cycle, expect {4:145}. Fundamental due ~71. Candidates: ledger floor observe (long-unseen), CORE banner parked for Marco copy, portrait re-pass at higher device widths.

## 69 · 2026-08-09 · systemic · USEFUL
scores: U10 L10 D10 De10 A10 P10
shipped: Enter = GO TO everywhere — a search Enter on an agent now flies to its checkpoint before opening the card (was: card opened while the camera stayed put). Completes 68's navigation semantic; arrow-key browsing still browses in place by design. Ledger floor observed and judged: honest within its data (13 freshest real timestamps, self-limited to <24h) — no change needed.
evidence: local ?v=99 in-eval provenance {host:127.0.0.1:8613}; "board scan" ⏎ → level 2 hunt/job-engine + Board Scan card + #a/ClaudeBoardScan; errs 0. node --check OK. hist confirmed {4:145} at 20:48Z export.
ship status: PENDING-DEPLOY — pushed 9AAF28A0, live still C1106082 (quota trickle).
next-observe: FIRST live==9AAF28A0. Fundamental due ~71 — research candidates: what a first-time visitor DOESN'T get (fresh-eyes pass), portrait tablet widths (768>700 breakpoint gap), repo-link surface still a MARCO DECISION.

## 70 · 2026-08-09 · systemic · LEGIBLE
scores: U10 L10 D10 De10 A10 P10
shipped: header breakpoint 700→820px — portrait tablets (768) now get the wrapped header rows + scrim + crumbs drop. At 768 the desktop header was wrapping the wordmark into the crumb and stacking "data N min old" one word per line.
evidence: emulated 768×1024 before/after screenshots read (before: wordmark wrap + vertical age; after: three clean rows on scrim, crumbsTop 128, wordmark single-line); landscape 1366 regression probe crumbsTop 46, errs 0 both. node --check OK. LIVE MATCH FDAF9AF4 after 2 polls — carried iter 69 (Enter=GO TO now live).
next-observe: iter 71 = FUNDAMENTAL, research first: fresh-eyes pass — what does a first-time visitor not get? (Candidates from cold look: no visible hint that tiles/monuments are clickable, keyboard map undiscoverable, repo link still MARCO DECISION.) hist {5:145} after 22:00Z.

## 71 · 2026-08-09 · fundamental · PERF (+ fresh-eyes verdict)
scores: U10 L10 D10 De10 A10 P10
shipped: boot critical path — preconnect cdn.jsdelivr.net + raw.githubusercontent.com (both were cold-start origins) and modulepreload three.module.js (the largest asset previously discovered only after importmap resolution). Local probe: three.module.js requestStart 55ms from nav, boot clean.
fresh-eyes research verdict: the entry-teaching hypothesis RULES-OUT — Marco's intro copy ("tap anywhere · every light is a real agent") covers clickability, the 13s attract reel tours the room, hover ghosts + ⌕ cover the rest. Real gaps are BOTH Marco-copy items, parked: (1) FACE button requests camera permission with zero context — needs a tooltip line; (2) repo link surface — still MARCO DECISION.
evidence: local ?v=101 in-eval provenance; pre[] shows all 5 hints; errs 0. node --check OK.
ship status: PENDING-DEPLOY — pushed F5DCFEA3, live still FDAF9AF4.
next-observe: FIRST live==F5DCFEA3. hist {5:145} after 22:00Z. Systemic next (72).

## 72 · 2026-08-09 · systemic · USEFUL
scores: U10 L10 D10 De10 A10 P10
shipped: OG/social card — og:title/og:description/og:image/og:type/og:url + twitter:card in head (strings reused verbatim from existing title/meta description — no new copy), backed by og.png: a 1200×630 live-room capture (emulated relay viewport, orb morph=1, level 0, errs 0) committed into the repo. Marco shares this link on IG/X/LinkedIn; it now unfurls as the room, not a bare text card.
evidence: og.png read before ship (full room, all zones lit); node --check SYNTAX-OK; push 6f83ca7 live in ONE poll (24E732D5 == blob — batched build also carried iter 71's F5DCFEA3 preconnect work, quota-trickle pattern confirmed again); curl -sI live og.png → 200, Content-Length 395458 exact byte match; relay restored 1366×768, prod sweep {reel:false,errs:0}.
next-observe: hist growth ({5:145} expected after 22:00Z refresh). Iter 73 systemic; fundamental due ~75. Candidate: DEPTH pass (contact shadows under monuments/orb — backlog #5) or monument trio instancing (#4, needs plan).

## 73 · 2026-08-09 · systemic · USEFUL
scores: U10 L10 D10 De10 A10 P10
shipped: dead-tap fix for the IG-share funnel — inline pre-module script on #intro adds .waking on any tap that lands before the three.js chain loads (seconds on slow mobile); the hint line breathes (.618s alternate pulse, ink-dim) as acknowledgment; boot() calls enter() if .waking is set, so the early tap becomes the entry instead of feeling dead. Backlog audit first: #4 (trio instancing) and #5 (contact shadows) were BOTH already shipped (lines 1297/1443/1538) and header counters are already live filters — backlog entries retired, saved a duplicate build.
evidence: node --check SYNTAX-OK (inline script sits outside the awk-extracted module, harmless); local 8613 fresh-viewer probe in one eval: click → {waking:true, anim:"wake", gone:true, errs:0} — inline handler + CSS animation + module enter all fire; slow path follows by construction (inline registers at HTML parse, before the module tag). Push ef1f285 PENDING-DEPLOY — Vercel API confirms newest record is still 6f83ca7 (iter 72, READY), no record for ef1f285 = closed quota window, next mint carries it. Prod sweep {reel:false,errs:0}.
next-observe: FIRST — live==A169DA00 (carries iter 73 + log 72). hist growth after 22:00Z refresh. Iter 74 systemic, fundamental due ~75.

## 74 · 2026-08-09 · systemic · ALIVE
scores: U10 L10 D10 De10 A10 P10
shipped: run columns — checkpoints with a live run emit a thin rising column of light off the cap (F(0)=21 motes per runner, golden-angle spread radius 2-6.4, span F(2)=34 above baseY, speed .12-.22/frame, capCol vertex colors, additive, ONE Points draw). The "executing now" signal is now visible from the doorway; before, pool-breathe was the only level-0 cue and it doesn't read in a full-frame screenshot. Mirrors the corePulse/dust animation idiom; rebuilt inside buildWorld so live refresh carries it; __runcol() probe hook added.
evidence: node --check SYNTAX-OK; local 8613 one-eval probe: {n:84 (4 running checkpoints × 21), y 90.6→97.8 over 60 frames, wraps in [71,126], errs:0, calls:318}; screenshot read — violet streams visible above JOB ENGINE pillars at level 0. Considered ◔ 88 bus-aware staleness first: no per-lane fire ledger exists anywhere gen-data can read (checked bus.mjs, state/, logs/) — stays the honest ceiling per entry-49 ruling, not one-cycle tractable. Push c9cc684 PENDING-DEPLOY (22:00Z data-refresh commit a32e964 consumed the window — its build IS the live A169DA00). Prod sweep next cycle verifies 1317F987 first thing.
next-observe: FIRST — live==1317F987. Then hist {5:145} on a card (22:00Z refresh landed in a32e964). Iter 75 = FUNDAMENTAL (research first).

## 75 · 2026-08-09 · fundamental · DEPTH/ALIVE
scores: U10 L10 D10 De10 A10 P10
shipped: the fleet cardiogram — THE RECORD spatialized at room scale. Research: ops dashboards (Datadog host maps, status-page uptime bars) anchor on aggregate status-over-time; the room had time only on micro-surfaces (card dots, tile strips). Each hourly hist sample now stacks all 145 lanes into one column (dormant/ok/running/failure, trouble on top) and the 21-slot band floats over the atrium opening at (0, ROOM.h+F(1), -F(6)), plane F(7)×F(6), additive, ONE draw. Newest hour at the right; unfilled slots stay sky over a hairline 21-slot baseline, so today's 5 columns read as an instrument filling up — full aurora in ~16h of refreshes. Rebuilt in buildWorld so live refresh carries it. First build had the band invisible: 5/21 columns sat inside the .88 edge-fade — mask tightened to .04/.96 + baseline added, re-verified.
evidence: node --check SYNTAX-OK ×2; local 8613 probe {sky:{HL:5,y:554,z:-377}, errs:0, calls:319-321}; screenshot READ — striped band visible in the atrium at pre-enter dolly; recency-feed idea checked first and found ALREADY SHIPPED (panels sort recency-first, line ~1759) — did not rebuild. Push 2c9f3b0 PENDING-DEPLOY (iter-74 build 1317F987 holds live; quota window). Prior cycle's iter-74 columns confirmed live on prod this cycle (violet streams over JOB ENGINE in read screenshot).
next-observe: FIRST — live==7C42F113. Then the cardiogram on prod with fresh hist ({6+}:145 after next refresh) — check the band gains a column. Iter 76-78 systemic.

## 76 · 2026-08-09 · systemic · PERF
scores: U10 L10 D10 De10 A10 P10
shipped: parse-time data fetch — the inline pre-module script now kicks the fleet.json request (raw.githubusercontent, same primary as DATA_SRC) at HTML parse, so data downloads in parallel with the three.js module chain instead of queuing behind it; pullFleet consumes window.__fleetP exactly once (set to null after), so the 233s live-refresh path still re-pulls live and the fallback loop is untouched. One RTT (~100-300ms broadband, more on mobile) off every boot.
evidence: node --check SYNTAX-OK; local 8613 one-eval probe {fleetP:"consumed", booted:true (histsky present), units:"145 units", errs:0}. Iter-75 cardiogram verified on PROD this cycle after tab reload: __histsky {HL:5,y:554,z:-377}, striped band read in atrium screenshot, errs 0, calls 320. Gotcha logged: the relay tab keeps running the OLD build after a deploy lands — reload before probing new-feature hooks (sky:null false alarm). Push 24921b4 PENDING-DEPLOY (7C42F113 build ~15min old held the window).
next-observe: FIRST — live==0ABCA727. Then hist column count (6th sample after 23:00Z refresh) — cardiogram should widen. Iter 77-78 systemic, fundamental ~79.

## 77 · 2026-08-09 · systemic · USEFUL
scores: U10 L10 D10 De10 A10 P10
shipped: favicon — the page had NONE (live /favicon.ico 404'd; tabs showed the generic globe). Inline SVG data URI in head: CORE-orb wireframe glyph (circle + equator + meridian, accent #8be2b9) on a rounded void tile (#080a18). Pure glyph from the existing identity, zero copy, zero extra requests, kills the 404.
evidence: SVG rendered in relay tab and READ — clean orb glyph at 256px; node --check SYNTAX-OK; push cd84656 live in 2 polls (57F655BC == blob) — batched build ALSO carried iter 76 (parse-time fetch): prod probe after reload {fleetP:"consumed", fav:true, sky:{HL:5}, errs:0}; standing sweep {reel:false,errs:0}. Iters 76 and 77 both CONFIRMED LIVE.
next-observe: hist 6th column after 23:00Z refresh — cardiogram widens. Iter 78 systemic, fundamental ~79. Relay-tab gotcha stands: reload before probing new hooks.

## 78 · 2026-08-09 · systemic · USEFUL
scores: U10 L10 D10 De10 A10 P10
shipped: unfurl + mobile chrome bundle — og:image:width/height (1200/630, LinkedIn/Slack skip the image probe), og:image:alt (existing description verbatim), theme-color #080a18 (Android/mobile browser chrome tints to the void instead of default white — the last off-brand piece of the phone frame).
evidence: portrait 390×844 OBSERVED first (screenshot read): header wraps clean, orb hero-centered, cardiogram patch visible top-right (cut at edge — self-resolves as hist fills leftward), run-column sparkles on the green monument, errs 0, calls 322 — nothing broken, so the cycle went to the metadata gap. node --check SYNTAX-OK; push 164906b PENDING-DEPLOY (57F655BC ~10min old held the window); viewport restored 1366×768.
next-observe: FIRST — live==62ACA9B2. Then 6th hist column (23:00Z refresh). Iter 79 = FUNDAMENTAL: the real question is the plateau — four straight flat-10 cycles and thinning idea yield; research whether the next paradigm is content (what the room shows), audience (who it serves), or cadence (whether 5-min cycles still earn their cost). Rank honestly.

## 79 · 2026-08-09 · fundamental · (verdict + system truth pass)
scores: U10 L10 D10 De10 A10 P10
shipped: the plateau verdict + EVOLUTION.md Round-3 truth pass. Research: can the room show OUTCOMES, not just machinery? fleet.json detail = scheduler result codes only (checked all 145); real outcomes live in private ledgers (outcome-ledger, apply-log, state/*) — publishing them on a public OSS page is a privacy boundary only Marco can cross. RULES-OUT content expansion at loop authority; the machinery view is the correct public scope and the cardiogram is already the public-safe outcome proxy (status flips over time). Backlog rewritten: shipped-through-78 index (stops the re-derivation waste — three cycles this session partially burned rediscovering shipped features), settled RULES-OUT verdicts, the three Marco-gated doors, and the loop's standing observation duties. Plateau is PRINCIPLED: content=privacy-gated, audience=Marco-gated, cadence=Marco's directive.
evidence: gen-data.mjs reads warden fleet-health.md only (grep); details "OK/TERMINATED/..." 145/145; hist {6:145} exported 22:47Z — 6th cardiogram column ALREADY live to browsers via raw.githubusercontent regardless of the pending Vercel mint. Push 164906b (iter 78) still PENDING-DEPLOY at cycle start; carried by next mint with this log.
next-observe: FIRST — live==62ACA9B2 or successor. Then cardiogram at 6 columns on prod (reload tab). Iters 80+ systemic per the standing duties; fundamental ~83.

## 80 · 2026-08-09 · systemic · (observation cycle — no ship needed)
scores: U10 L10 D10 De10 A10 P10
shipped: nothing — and that is the correct output under the Round-3 rules. Full entered-view observation found zero defects: cardiogram at 6 columns reading correctly in the atrium, run columns live on monuments, salmon flag beams visible from the doorway, fresh 22:47Z data flowing (header shifted to 5 running · 18 flagged — the fleet moved and the page moved with it), errs 0. Unfurl chain verified END-TO-END live: all 8 og: tags serving + og.png 200 at exact bytes. Iter-79 docs push confirmed live earlier in cycle.
evidence: entered screenshot READ (full room, all surfaces); prod probe {entered:true, sky:{HL:6}, errs:0}; curl live og tags ×8 + og.png 200/395458.
next-observe: cardiogram at 7+ columns (next hourly refresh). Strips check at 13 columns lands ~05:00Z. Fundamental ~83. Ship bar stays: observation-driven fixes or genuinely-more-useful only.

## 81 · 2026-08-09 · systemic · LEGIBLE
scores: U10 L10 D10 De10 A10 P10
shipped: header scrim promoted from the ≤820px block to base scope (89px desktop, 144px override kept for wrapped phone header). Found by walking THE RECORD surfaces at level 2: with the camera close to a lit wall, tile labels and the panel age column bled straight through the wordmark/counters/crumbs — the iter-62 scrim only existed on phones. One CSS rule moved.
evidence: level-2 card walk on PROD first (search Enter → job-engine): card open, group rollup 6 dots, 7/7 member rows with 6-dot tails, honest amber ages (5d-22d), errs 0 — THE RECORD maturing correctly at 6 samples. Before/after screenshots READ: wordmark+crumbs now seat on the scrim, wall bleed dimmed. node --check SYNTAX-OK; push 2e17593 live in 2 polls (9620D38C).
next-observe: cardiogram 7th column after next refresh; strips at 13 columns ~05:00Z. Fundamental ~83.

## 82 · 2026-08-09 · systemic · (observation cycle — no ship needed)
scores: U10 L10 D10 De10 A10 P10
shipped: nothing — clean walk. Flagged status view exercised on PROD: 18/18 rows, all with 6-dot salmon strips, honest ages (9d-74d), real failure codes (REQUEST_REFUSED / GENERIC_FAILURE / FLOOR_BREACHED / CTRL_C_EXIT); rows with no last-run show code only (never-ran sentinel correctly stripped). Iter-81 header scrim visible in the same shot doing its job. errs 0; standing sweep clean.
evidence: screenshot READ (system view over the room); probe {card:true, rows:18, minis:18, errs:0}.
next-observe: 7th cardiogram column (00:00Z refresh imminent). Iter 83 = FUNDAMENTAL — candidate question: none urgent; if research yields nothing genuinely more useful, the honest fundamental is a no-op verdict. Strips at 13 columns ~05:00Z.

## 83 · 2026-08-09 · fundamental · (verdict — mobile funnel RULES-OUT)
scores: U10 L10 D10 De10 A10 P10
shipped: verdict only. Research question: does the first-time MOBILE tap-through flow (the actual IG-viewer path) work end-to-end on prod? Walked at 390×844: intro tap → enter → tap first visible monument (the-pocket, screen 52,563; 5 monuments tappable on first screen) → level 2 + checkpoint card open + deep link #senses/the-pocket written → errs 0. RULES-OUT mobile-interaction rework. The funnel chain is now verified end-to-end across cycles: OG unfurl (72/78/80) → fast boot (71/76) → dead-tap ack (73) → tap-through + deep link (83, this). Gotcha: __mon(j) throws past monRings.length — probe loops need try/catch; left as-is (verify-only hook).
evidence: prod probe {visN:5, tapped:{g:"the-pocket"}, lvl:{level:2,groupId:"the-pocket"}, card:true, hash:"#senses/the-pocket", errs:0}; viewport restored 1366×768; sweep clean.
next-observe: 7th cardiogram column (00:00Z refresh due now — check next cycle). Strips at 13 columns ~05:00Z. Iters 84+ systemic observation duties; fundamental ~87.

## 84 · 2026-08-09 · systemic · (observation — clean)
scores: U10 L10 D10 De10 A10 P10
shipped: nothing. Prod healthy: level-0 room, cardiogram 6 cols, run columns, errs 0, calls 319, age "1 h old" un-ambered (correct — threshold φ²h). 00:00Z-window refresh (exporter fires ~:47) not yet committed at check time; 7th column expected next cycle.
evidence: probe + screenshot read.
next-observe: 7th cardiogram column; if the :47 refresh did NOT land by next cycle, investigate the exporter lane before anything else.

## 85 · 2026-08-09 · systemic · (observation — false alarm corrected)
scores: U10 L10 D10 De10 A10 P10
shipped: nothing. Iter-84's worry ("refresh didn't land, investigate exporter") was MY timestamp confusion, corrected here: ClaudeOrreryRefresh fires ON THE HOUR (schtask Ready, last 19:00:01 local result 0x0), and ced4774 committed at 19:00:13 — that IS the 6-column refresh. The fleet.json `exported` stamp (22:47Z) is the warden data's provenance stamp, not the refresh commit time; the two differ by up to an hour by design. Pipeline fully healthy; 7th column lands at 20:00 local.
evidence: schtasks query (Ready/0x0/next 20:00); git log --grep "fleet refresh" shows unbroken hourly commits 15:00→19:00 local.
next-observe: 7th column in ced4774's successor (~20:00:13 local). Provenance-vs-commit-time distinction now on record — do not re-derive.

## 86 · 2026-08-09 · systemic · (observation — record pipeline verified at 7)
scores: U10 L10 D10 De10 A10 P10
shipped: nothing. 20:00 refresh landed on schedule (fe6f6ba 20:00:05), hist {7:145}, and the LIVE page shows it: fresh-load probe sky {HL:7}, errs 0, calls 320. THE RECORD now carries real variation (flag stratum 17,18,18,17,17,18,17 across columns) — the cardiogram is no longer uniform strata but a moving trace. Full pipeline warden→gen-data→git→raw CDN→page verified end-to-end within 90 s of the commit.
evidence: git log + node hist analysis + live probe after reload.
next-observe: strips at 13 columns ~05:00Z (13th sample). Fundamental ~87 — candidate: none pending; honest no-op acceptable. Sweep next cycle.

## 87 · 2026-08-09 · fundamental · (verdict — tour revision deferred with date)
scores: U10 L10 D10 De10 A10 P10
shipped: verdict only. Research: is the 10s tour still the reel's best footage given surfaces added after its choreography (flag beams 66, run columns 74, cardiogram 75)? Read tourKeys: the wide dive/pull-back beats DO film the flag beams; the hero-monument beat (5600-7400) frames run columns when the hero has a live member; only the cardiogram is never in frame (CORE-close camera y=315 vs band y=554 — above the lens). At 7/21 columns the band is a partial patch: adding a look-up beat TODAY films half-empty footage. DEFER with a date: when hist reaches 21 columns (~2026-08-10 14:00Z / 10:00 local), test lifting the 8600ms pull-back tgt toward [0,320,-350] so the full band crosses the upper frame, and re-verify with the one-eval phase-trace harness (iter-67 pattern). Do not touch tourKeys before then.
evidence: tourKeys read (2467-2498); standing sweep {reel:false,errs:0} — tour still exits clean every cycle via the sweep.
next-observe: hist column count each cycle; at 21, the tour test is UNBLOCKED and becomes the top pick. Strips check at 13 columns ~05:00Z. Iters 88+ systemic.

## 88 · 2026-08-09 · fundamental · DEPTH (Marco-directed: the reference's underneath)
scores: U10 L10 D10 De10 A10 P8
shipped: mirror floor. Marco: "the most important part is the underneath part... you're not doing it right." Re-read xref.mp4 frames — the reference's signature is a true planar reflection: walls, orb, monuments visibly continue BENEATH the ground line. Replaced the opaque grid floor with three.js Reflector (clipBias .003, tex ≤1024 dpr-scaled, color 0xb8bde0, y=-.2) under a .38-opacity grid plane so the reflection reads through it.
evidence: local verify round 2 screenshot READ (panels/monuments/orb/arcs mirrored); live 0222d52 hash MATCH; live screenshot READ post-reload — mirror confirmed on prod; sweep {reel:false,errs:0}. Perf: 605 calls / 242k tris — the reflection pass ~doubles draws; the old ≤350 budget is superseded by this Marco-directed feature (P8, accepted).
next-observe: portrait perf with the mirror (reflection tex is dpr-capped but untested on 390x844); og.png now shows the pre-mirror room — recapture is Marco's call. Tour test still gated on 21 hist columns (~08-10 14:00Z).

## 89 · 2026-08-09 · systemic · DEPTH+ALIVE (Marco: "not there yet. keep upgrading")
scores: U10 L9 D10 De10 A10 P8
shipped: luminosity pass vs the X reference — bloom .38/.45/.82 → .75/.55/.72, exposure 1.02→1.12, orb plane 250→377 (FIB proper) with saturated chroma (frost/speck/spec constants shifted cyan + sat 1.42 gain 1.12 pre-ACES), CORE rings additive, portal edge .28→.55, CORE glow light 1.7/700→2.6/900.
evidence: local screenshots READ (orb now saturated cyan-plasma dominating the frame like the reference; wall text still legible); perf {calls:604, tris:238054} errs 0; live BF211229 hash MATCH; prod screenshot READ (mirror carries tile reflections, monument glows hot); sweep {reel:false,errs:0} on prod.
next-observe: L9 — white agent-swarm dots bloom into hot blobs at close range; watch legibility at level 2. Floor still lacks the reference's big color washes → iter 90.

## 90 · 2026-08-09 · systemic · DEPTH+DENSITY (reference floor language)
scores: U10 L9 D10 De10 A10 P8
shipped: floor soak. Wall bleed washes deepened F(3)->F(5) (89->233) at opacity .5 so each zone's color floods the floor; new F(6) radial cyan wash under the CORE so the room's center carries orb light instead of void. With the iter-88 mirror underneath, the floor now reads as the reference's: color-soaked glass.
evidence: local screenshot READ (amber/green/purple washes across the mirror, text legible); perf {calls:606, tris:237048} errs 0; live 622A05DD hash MATCH; prod wide screenshot READ (orb + sun + washes + reflections all present); sweep {reel:false,errs:0}.
next-observe: og.png is now two looks behind (pre-mirror, pre-luminosity) — recapture is Marco's call. Portrait perf with mirror+bloom still untested. White swarm-dot bloom at close range (L9 from 89) unchanged — acceptable so far.

## 91 · 2026-08-09 · fundamental · LEGIBLE (Marco: "too chaotic. remove the solar. change top+bottom. full license")
scores: U10 L10 D10 De9 A10 P9
shipped: the void pass. Re-read the reference: its power is BLACK VOID + few huge emitters, not more light. (1) Solar system deleted — sun, 7 planets, orbits, belt, nebulae; stars kept, dimmed; THE RECORD is now the lone ceiling feature. (2) Air-beam web (29 arcs, 18 red) hidden at level 0 — beams exist only for the focused dept or hovered monument (b._hot + per-frame visibility; packets still fly). (3) Floor gains the reference's receding dot matrix — F(1)-spaced φ-grid, 1 draw, doubled by the mirror.
evidence: local wide screenshot READ (black top, clean neon room, orb centered, soaked mirror + dot rows, no arc web); perf {calls:417, tris:229926} — declutter bought back 189 calls; live 61C59BDF hash MATCH; prod close-in screenshot READ (columns, tiles, alerts all legible over the mirror); sweep {reel:false,errs:0} local + tour levels exercised.
next-observe: visually confirm focused-dept beams appear at level 1/2 (sweep passed, not eye-verified). Relay tab was contested by a sibling mid-OAuth — verification now uses new_page/close_page; keep that pattern. og.png three looks stale — Marco's call.

## 92 · 2026-08-09 · fundamental · (the misread, corrected)
scores: U9 L9 D9 De9 A10 P9
shipped: THE OS PASS. Root cause of Marco's "not even close": I read the reference as a lighting/atmosphere target. It is not. The video is a REAL DESKTOP UNFOLDED INTO A ROOM — Windows icon grids as walls, a terminal as a wall, the rainbow-swirl wallpaper wrapping the room, taskbar at the base, neon cyan seams on the cube edges, floor carrying the desktop. Structural, not atmospheric. Shipped the first three OS organs: (1) back-wall WALLPAPER — canvas rainbow aurora edge to edge, panels float over it as windows; (2) cube seams recolored hot cyan .85; (3) TASKBAR at the back-wall base — running lanes as open apps (glyph squares + cyan running-dots, pure data).
evidence: local wide screenshot READ (swirl + seams + reflections present); perf {calls:528, tris:234818} errs 0; live 78013526 MATCH; sweep {reel:false,errs:0}.
next-observe: taskbar legibility at tour distance (too small to read in wide shot — verify close). Remaining OS organs, usefulness-ranked: terminal wall (green mono fleet log), walls as uniform dense icon grids, window chrome (title bars) on panels. Ask Marco which organ next or keep shipping in order.

## 94 · 2026-08-09 · fundamental · (the 3D-OS conversion — Marco picked option 1)
scores: U9 L10 D10 De9 A10 P10
shipped: OS_MODE flag empties the room's middle — monuments, agent swarms, air/floor beams, pulses, floor dials, floor instrument arcs, floor ledger, CORE column/pool/pad all GATED (not deleted; OS_MODE=false restores v7). Surfaces now carry everything: dept icon-grid walls, wall-scale side terminals (LIVE NOW / SYSTEM LOG grown to F(6)), back-wall wallpaper + orb + taskbar, mirror floor with dot rows, cyan seams. hubs/monRings data kept so search, deep links and tour coordinates still resolve.
evidence: local wide screenshot READ at 23:28 (empty middle, icon walls, terminals, wallpaper reflection in mirror — reads like the reference); sweep {reel:false,errs:0}; perf {calls:267, tris:8414} — tris down 96%; msPerFrame 5.25 in harness. Push 3c10f28; live-hash poll running in background.
next-observe: verify live hash MATCH; level-1/2 focus flights now land on wall zones (hub positions kept) — eye-verify; taskbar legibility close-up; portrait pass. Rollback: OS_MODE=false.

## 95 · 2026-08-09 · fundamental · (the visual effect, finally identified)
scores: U9 L10 D10 De9 A10 P10
shipped: Marco: "you're still far behind being able to identify the visual effect." He was right. The effect is the ANAMORPHIC WINDOW: the screen is a glass front on a fixed box, and the VIEWER'S EYE moves — the room itself never flies. Our rig had the machinery (off-axis portal + FACE head-tracking) but the reel/tour DISABLED it (PORTAL.mix=0, pk=0) and flew a drone through the room instead — every first impression and every recorded frame shipped without the illusion. Fix: in OS mode the reel is an eye-orbit — tourKeys become {px,py,dist} eye-path keys, tourStep drives par + PORTAL.dist, portal projection stays ON during reel/tour (goal=1, pk=1, mix=1), exitReel resets lean via fitPortal.
evidence: mid-reel screenshot READ at eye far-left — right wall swings wide, box skews behind the glass, matches xf_03/xf_05 grammar; sweep {reel:false,errs:0}; msPerFrame 1.03 post-sweep idle. Pushed DAB8E65A; live poll backgrounded. Iter 94 confirmed LIVE (09010E8B MATCH after 540s).
next-observe: prod hash MATCH → watch the reel live end-to-end once; FACE button now delivers the same grammar interactively (head owns the eye) — worth surfacing to Marco for the phone-orbit recreation of the reference video.
