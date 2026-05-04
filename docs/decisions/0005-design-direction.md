# ADR 0005 — Design Direction Selected

**Date:** 2026-05-05
**Status:** Accepted (Gate G1 passed)
**Deciders:** Founder

## Decision

**Direction C — "Aigocy-true"** is the locked visual direction.

Source: `prototype/_moodboard/dir-c-aigocy-true.md` + `prototype/_moodboard/preview-c.html` (founder reviewed both screenshots and the file in IDE; approved with "สวยเอาประมาณนี้แหล่ะ").

## What Direction C means

- **BG main:** warm cream `#F5F3EE` (Aigocy-faithful — not pure white)
- **Surface:** `#FFFFFF` (cards)
- **Text:** `#0A0A0A` near-black; muted `#6B6B6B`
- **Orange (warm dominant accent):** `#FF5A1F` 500 / `#D9410E` 700, gradient end peach `#FFB347`
- **Blue (cool secondary accent):** `#1E40AF` 500 / `#1E3A8A` 700
- **Dark section:** `#161616` for one rhythm break + curved top transition
- **Hairline:** `rgba(0,0,0,0.06)` — never hard `1px solid #000`
- Cards: rounded-3xl (24-32px) + soft shadow (`0 20px 60px -20px rgba(0,0,0,0.08)`), **no border**
- Buttons: rounded-full filled, smooth hover-lift, no harsh "press" shadow
- Hero: heavy display heading + inline icon-badge + 3 floating service pills + organic gradient blob (radial-gradient + 70px blur + 15s drift)
- Floating pill navbar with backdrop-blur
- Section rhythm: light cream throughout + ONE dark section near footer for emphasis
- Motion: slow drift, smooth ease (no snappy press)

## Rejected directions (archived in repo for reference)

- **Direction A — "Editorial Studio"** (`prototype/_moodboard/dir-a.md`, `preview.html` left col)
  - Cool-leaning, asymmetric editorial grid. Too "publication" feel — not agency-y enough.
- **Direction B — "Energetic Tech"** (`prototype/_moodboard/dir-b.md`, `preview.html` right col)
  - Too stiff: hard 1.5px borders, harsh "press" shadows, bento boxiness, pure white bg. Founder feedback: "ดูแข็งไปนิดนึง"

These files remain in `prototype/_moodboard/` for reference but are NOT carried into the implementation.

## Acknowledged deviations from spec

(All flagged by designer agent during build; not blockers.)

1. **Primary CTA = near-black filled** (not orange) — preserves Aigocy hero pattern; orange owns inline heading badge + dark-section CTA + 2 card variants. Net warm dominance preserved.
2. **Heading weight = 700** in preview (IBM Plex max on Google CDN). **Will swap to LINE Seed Heavy 800** in Phase 2 (T1.4 / T2.5).
3. **Inline icon-badge uses placeholder letters** (W/A) instead of real SVG icons — mitigates baseline-alignment issues in flowing Thai. SVG swap in Phase 2.
4. **Stats band: only 2 of 3 numbers get orange accent** — applying to all 3 over-shouts; mixed pattern reads more confident.

## Phase 2 carry-overs

- Token names from `preview-c.css` get migrated to Tailwind v4 `@theme` block in `web/app/globals.css` (T2.4).
- Soft-shadow + rounded-3xl + gradient-blob primitives become utility classes in Tailwind config.
- Dark section curve transition tested on Safari iOS (border-radius nested ratios behave differently — verify in T1.20 cross-browser smoke).

## Next

Proceed to T1.3 (design tokens v1) using this palette as the locked source of truth.
