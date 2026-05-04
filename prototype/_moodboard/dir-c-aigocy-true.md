# Direction C — "Aigocy-true"

> รู้สึกแบบ "เอเจนซี่อบอุ่นที่ทำงานเก่ง — เปิดบ้านต้อนรับ พรีเมียมแต่ไม่เกร็ง คุยง่าย แต่งานละเอียด"

## Aesthetic stance

**Warm-cream agency, soft-modern.** Founder pointed at Aigocy directly — Direction A was too publication-quiet, Direction B was too stiff (hard borders, harsh press shadows, pure white). This direction copies Aigocy's DNA exactly: a warm cream page that feels like *paper on a desk in soft afternoon light*, white floating cards with no borders (only soft drop shadows), an organic peach-to-orange gradient blob bleeding off the hero's right edge with heavy 60–80px blur, rounded-full pills everywhere, and **one** dark rhythm-break section near the bottom to give the page its punctuation.

Orange is the warm dominant (gradient blob, primary fill, inline heading badge). Blue is the cool secondary — outline CTA, link hover, one card variant accent, and the dark section's punctuation color. Nothing snaps; everything drifts.

**DFII score:** Impact 5 + Fit 5 + Feasibility 5 + Performance 5 − Consistency Risk 1 = **+19 → execute fully**

**Differentiation anchor:** the **inline icon-badge inside the H1** (small orange rounded-full pill embedded mid-sentence in the Thai display headline) plus the gradient-blob-bleeds-off-the-canvas hero. No agency in Thailand currently does either move at this scale — it's instantly identifiable as Best Solutions on first scroll.

---

## Palette

| Role | Hex | Contrast on `#F5F3EE` | Notes |
|---|---|---|---|
| Background (page) | `#F5F3EE` | — | Warm cream — never pure white |
| Surface (card) | `#FFFFFF` | — | White floats *above* cream, never matches it |
| Surface alt | `#EDEAE2` | — | One-step deeper cream for stat band |
| Text primary | `#0A0A0A` | 17.4:1 ✅ AAA | Near-black, neutral |
| Text muted | `#6B6B6B` | 5.2:1 ✅ AA body | Warm-neutral mid grey |
| **Orange 50** | `#FFF1E8` | — | Pill backgrounds, hover wash |
| **Orange 100** | `#FFD9BE` | — | Hover surface |
| **Orange 500** | `#FF5A1F` | 4.1:1 ⚠️ AA Large only | Use white text on it (4.6:1 ✅) |
| **Orange 700** | `#D9410E` | 5.4:1 ✅ AA | Body link, on-cream accent text |
| **Orange-peach** | `#FFB347` | — | Gradient blob mid-stop only — never as text/UI fill |
| **Blue 50** | `#EEF2FF` | — | Card variant accent wash |
| **Blue 500** | `#1E40AF` | 8.2:1 ✅ AAA | Outline CTA stroke + link |
| **Blue 700** | `#1E3A8A` | 10.4:1 ✅ AAA | Outline CTA hover, dark-section punctuation |
| **Dark section bg** | `#161616` | — | Cream→Dark rhythm break — white text 13.6:1 ✅ |
| Hairline | `rgba(0,0,0,0.06)` | — | Never a 1px solid black anywhere |

**Pairing logic:** Aigocy's actual page is 90% warm + 10% cool. We're matching that ratio. Orange `#FF5A1F` is sharp enough to hold up against the cream without going neon; the peach `#FFB347` only ever appears blurred-out inside the gradient blob. Blue is reserved — when it appears, it's *meaningful* (the outline CTA, a link, the one stat that matters).

**Contrast policy:** orange-500 fills always wear white labels (white-on-orange = 4.6:1, passes AA). Orange-500 text on cream is reserved for the Display headline accent only (and only at ≥40px, which passes AA Large). Body-weight orange text uses orange-700.

---

## Type system

**Display + body:** LINE Seed Sans Thai (Phase-2 actual). Preview uses **IBM Plex Sans Thai 700** as proxy for LINE Seed Heavy 800 — this matches Direction A and B for fair comparison. The vibe transition will be invisible to the founder.

| Token | Mobile | Desktop | Weight | Line-height | Tracking |
|---|---|---|---|---|---|
| Display XL (hero H1) | 48px | 104px | 800 | 1.04 | -0.022em |
| Display L (section) | 32px | 60px | 800 | 1.06 | -0.018em |
| H2 | 26px | 40px | 700 | 1.18 | -0.01em |
| H3 (card title) | 19px | 22px | 700 | 1.30 | 0 |
| Body L (lead/sub) | 17px | 19px | 400 | 1.65 | 0 |
| Body | 16px | 17px | 400 | 1.7 | 0 |
| Eyebrow pill | 13px | 14px | 600 | 1.0 | 0.04em |
| Stat number | 36px | 56px | 800 | 1.0 | -0.02em (tabular) |
| Caption | 13px | 14px | 500 | 1.5 | 0 |

**Thai-specific tuning:** Display line-height is slightly looser than B (1.04 vs 0.98) because Aigocy's actual hero feels airy, not crammed. Body stays at 1.65–1.7 — Thai tone marks need the breathing room. Eyebrow tracking is gentler (0.04em) than B's 0.16em — pills are *soft* labels here, not "tech labels."

**Inline icon-badge in heading:** the H1 contains a small inline `<span class="badge-inline">` rendered as a rounded-full orange pill ~64px tall holding 2 small icons, baseline-aligned to the cap-height of the surrounding Thai characters. This is the signature move.

**Numerals:** Stat band uses `font-variant-numeric: tabular-nums`. Body stays proportional.

---

## Hero composition

The hero feels like *afternoon sun hitting cream paper*. Top-center sits a small rounded-full eyebrow pill ("✦ AI-Driven Agency Bangkok"). Below it, a massive Thai display headline lands in two relaxed lines — and embedded inline mid-headline is a small orange rounded-full pill holding two tiny tool-icons (the inline icon-badge — Aigocy's signature). Below the headline a single muted lead paragraph runs about 60ch wide. Two CTAs sit center-aligned underneath: a near-black filled rounded-full primary ("เริ่มทำเว็บ →") and a thin blue outline rounded-full secondary ("ดูผลงาน").

Behind everything, anchored to the right side and bleeding **off** the right edge of the canvas, a large organic radial gradient blob (orange-500 → peach → transparent) sits with 60–80px Gaussian blur, drifting on a 15-second loop with a tiny 6px translation and 1° rotation. Three small white rounded-square service-pills (~72px) float around the headline at irregular angles — each holds a single colored icon (Web / Ads / AI). They have soft drop shadows, no borders, and each rotates ~−8° / +6° / −4° to feel placed-by-hand, not aligned-by-grid.

Generous 96–120px breathing room above and below. Bottom edge has a tiny "Scroll for more ↓" pill in muted text. Nothing else.

## Card system

White surface (`#FFFFFF`) on cream, **never bordered**. Border-radius `28px` (close to Tailwind's `rounded-3xl`). Padding `32px` desktop / `24px` mobile.

**Default shadow:**
```
box-shadow:
  0 24px 60px -24px rgba(0, 0, 0, 0.08),
  0 8px 24px -8px rgba(0, 0, 0, 0.06);
```

**Hover shadow + lift:**
```
transform: translateY(-2px);
box-shadow:
  0 32px 80px -24px rgba(0, 0, 0, 0.12),
  0 12px 28px -8px rgba(0, 0, 0, 0.08);
transition: all 220ms cubic-bezier(0.4, 0, 0.2, 1);
```

Each card has an `icon-badge` top-left — a 56px rounded-2xl tinted square (orange-50, blue-50, or cream-alt) holding the service icon. Icon strokes are 1.75px, never thinner. One card per grid uses the blue-50 wash variant — that's the cool punctuation. Never give a card a 1px solid border. Never use a press-down shadow on hover.

## Section rhythm

Cream → cream → cream-alt (stat band) → cream → **dark `#161616` rhythm break** → cream → footer. The single dark section is the *only* tonal punctuation in the page; it's where the closing CTA lives. Top edge of the dark section curves into the cream above with `border-radius: 80px 80px 0 0 / 32px 32px 0 0` so it reads like a poured ramp, not a hard cut.

Inside the dark section: white text, orange-500 underline accents on key phrases, a single orange-filled rounded-full CTA. Nothing else. It's a breath-and-then-close moment.

## Motion personality

Slow drift, smooth ease, **never** snappy. The gradient blob loops a 15s drift (≤8px translate, ≤2° rotate). Service-pill icons in the hero have a staggered fade-in on page load (90ms each, settling at their hand-placed angles). Cards lift 2px on hover with a shadow grow over 220ms. CTAs scale 1.02 on hover with shadow grow — **no flat-to-elevated press** (that was Direction B's mistake; it reads stiff). Scroll-reveal is opacity + 24px translate-up, 320ms ease-out. `prefers-reduced-motion` kills the blob drift and all transforms, keeps opacity fades.

## Why this works for Best Solutions

The founder said "มันดูแข็งไปนิดนึง" — translation: *don't be a startup pitching at me, be a partner inviting me in.* Direction C is built on that exact mood. Cream + soft shadow + rounded-full + organic gradient = a brand that feels human and confident at the same time. The inline icon-badge in the heading is the small flex that signals "we know our craft" without saying it.

It also works structurally:
- **Light theme only** (locked) — cream is more flexible than pure white for this and ages better
- **Blue + Orange family** (locked) — preserved exactly, just rebalanced 90/10 warm/cool to match Aigocy
- **Thai-first display weight** — the soft cream backdrop makes LINE Seed Heavy 800 feel premium, not aggressive
- **One dark section** — gives a strong closing CTA without making the whole page feel "tech bro"
- **Service grid is cards-on-cream**, not bento-on-white — friendlier, scales to 7 services without feeling boxy

This is the version we ship. The other two were exploration; this one is the answer.
