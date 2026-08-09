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
