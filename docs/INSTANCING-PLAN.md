# Monument-trio instancing plan (backlog round-2 #4)

Goal: 29× (pillar + ring + cap) = 87 draw calls → 3 InstancedMesh = 3 calls.
Est. 376 → ~292 at ALL. Deferred twice for interaction risk — this is the plan
that de-risks it before any BUILD cycle picks it up.

## What each part does today (index.html, buildWorld zone loop)

| Part | Geometry | Material | Per-monument state | Interactions |
|---|---|---|---|---|
| pillar | Cylinder(5,8,H,24), H ∈ {F(2),F(3)} | MeshStandard, emissive hsl(hue) | `pillarAnims`: emissiveIntensity breathes when running | raycast target (`hubMeshes`) → setLevel(2); castShadow |
| ring | Torus(13,1.1,10,48) | MeshBasic hsl(hue), opacity .9 | `userData.spin` (φ-scaled rate), baseY bob | none |
| cap | Sphere(5,16,16) | MeshBasic hsl(hue,.65,.75) | none | none |

## The three hard parts

1. **Two pillar heights.** Cylinder geometry is unit-height only if we bake H
   into the instance matrix scale — Cylinder(5,8,1,24) scaled (1,H,1) distorts
   the taper (top r5 / bottom r8 taper is height-relative, scaling is fine
   actually — taper ratio preserved under uniform Y scale). SAFE.
2. **Per-instance emissive breathe.** InstancedMesh shares ONE material.
   MeshStandard emissiveIntensity can't vary per instance. Route: use
   `instanceColor` (supported by MeshStandardMaterial via defines) to modulate
   COLOR, and move the breathe into instanceColor lerp between base and lit
   hue each frame for running monuments only (29 setColorAt + one
   instanceColor.needsUpdate — cheap). Emissive stays constant; visual delta
   acceptable ONLY if verified side-by-side. If it reads flat, fallback:
   keep pillars as 29 meshes (they're the raycast targets anyway) and instance
   only rings+caps (87→31 calls, still −56).
3. **Raycast + hover.** `hubMeshes` raycast returns instanceId for an
   InstancedMesh. Every hit site must map instanceId → {dept, group}:
   - pointerup hub block (`hubHit[0].object.userData`) → needs
     `hubIndex[instanceId]` lookup table built in the zone loop.
   - pointermove hover (line ~1702) same remap + cursor.
   - `d.hubs[g.id].ring` reference for zone-level ring anim — rings become
     instances; the frame loop's ring spin/bob must become matrix updates
     (29 composeMatrix per frame — fine).

## Verify bar for the BUILD cycle

- __perf before/after at the same frozen frame (expect ≥ −80 calls).
- Click EVERY monument once via scripted grid (29/29 must open level 2 with
  the right group) — not a sample.
- A running monument (Fleet Warden's `healing`) visibly breathes in a 3-frame
  screenshot series under __hold.
- Tour + sweep zero __errs; shadows still cast (castShadow on InstancedMesh).

## Recommendation

Do it in TWO cycles: cycle A rings+caps only (zero interaction surface,
87→31), cycle B pillars behind the instanceId remap once A is proven. Never
both in one 5-minute cycle.
