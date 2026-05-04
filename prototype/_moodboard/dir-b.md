# Direction B — "Energetic Tech"

> รู้สึกแบบ "ทีม AI-native ที่ลงมือทำเร็ว ส่งงานทันใจ — สดใหม่ มีพลัง โชว์ของได้ทันที"

## Aesthetic stance

**Modern startup / Bento tech.** Warm-leaning, orange-dominant. Pure white background, structured bento grid, solid color blocks (less gradient, more painted shapes). High-contrast type, generous geometric whitespace, blue used as a sharp counterpunch — not a wash. Reads like Vercel-meets-Cluely-meets-Linear, but in Thai. Optimistic, confident, slightly cheeky. The page has visual "snap" — every section change is felt.

**DFII score:** Impact 5 + Fit 4 + Feasibility 5 + Performance 5 − Consistency Risk 2 = **+17 → execute fully**

**Differentiation anchor:** Hero uses a *bento split-stage* — left half is a giant orange painted block that holds the Thai headline reversed-out in white, right half is a 4-cell bento of live service tiles (Web Design / Ads / SEO / AI Automation) each with its own micro-illustration. The boundary between block and bento is a single hard vertical line. Stops the eye instantly because nothing else on the Thai-agency web looks like this.

---

## Palette

| Role | Hex | Notes |
|---|---|---|
| Background (page) | `#FFFFFF` | Pure white — the "canvas" |
| Surface alt | `#FAFAF7` | Faint warm-off section banding |
| Surface tint | `#FFF6EE` | Orange-50 wash for soft cards |
| Text primary | `#101014` | Near-black, neutral cast (18.2:1 on white) |
| Text muted | `#535760` | (7.0:1 on white — clean AA) |
| **Blue 50** | `#E8EEFF` | rare — only for blue tile cards |
| **Blue 100** | `#C9D5FF` | hover on blue tiles |
| **Blue 500** | `#1D4ED8` | secondary CTA fill, hyperlinks |
| **Blue 700** | `#1A3FB0` | dark accent on bento dark-card |
| **Blue 900** | `#0B1F66` | reversed text inside dark-blue tile |
| **Orange 50** | `#FFF1E3` | tile background |
| **Orange 100** | `#FFD9B3` | hover surface |
| **Orange 500** | `#FF6A1A` | hero block fill — punchier, more saturated than Dir A |
| **Orange 700** | `#D94E00` | hover/press, body accent |
| **Orange 900** | `#7A2400` | reversed type accent on orange block |
| Success | `#0E9F5F` | |
| Error | `#E0382E` | |
| Border solid | `#101014` | 1.5px hard borders on bento tiles (signature) |
| Border subtle | `#EAEAE5` | hairline between sections only |

**Pairing logic:** Saturated `#FF6A1A` orange against `#1D4ED8` true blue on pure white — this is the loudest of the locked palette family, intentionally. The 1.5px hard black border on tiles is the secret weapon — it gives the bento an "objects on a table" tactility you don't get from shadow-only cards.

---

## Type system

**Display + body:** LINE Seed Sans Thai (preview uses IBM Plex Sans Thai 700 as proxy for LINE Seed Heavy 800).

| Token | Mobile | Desktop | Weight | Line-height | Tracking |
|---|---|---|---|---|---|
| Display XL (hero) | 48px | 96px | 800 | 0.98 | -0.025em |
| Display L (section) | 34px | 64px | 800 | 1.04 | -0.02em |
| H2 | 28px | 44px | 700 | 1.12 | -0.01em |
| H3 | 20px | 26px | 700 | 1.22 | 0 |
| Body L (lead) | 18px | 20px | 500 | 1.55 | 0 |
| Body | 16px | 17px | 400 | 1.65 | 0 |
| Eyebrow | 12px | 13px | 700 | 1.0 | 0.16em (uppercase) |
| Caption / tile label | 13px | 14px | 600 | 1.4 | 0.02em |

**Thai-specific tuning:** Tighter display line-height (0.98 on hero) because the orange block crops type aggressively on purpose. Body weight bumps to 500 on lead paragraphs — Thai 400 reads thin against high-saturation backgrounds. Eyebrow tracking is intentionally wider (0.16em) than Direction A — it's the "tech label" feel.

**Numerals:** Tabular everywhere by default — this direction shows numbers a lot (stats, year, pricing-but-no-prices), and tabular gives the data-driven feel.

---

## Hero composition

The hero is a hard-split 50/50 stage. Left half: a saturated orange `#FF6A1A` filled rectangle (full bleed left, top, bottom — radius only on the right corners) with the Thai display headline set massive and reversed-out in white, intentionally cropped tight on the right edge so a single character sits half-cut off (creates the "stop the eye" tension). Inside the orange block, a small white pill in the top-left says "AI-Native Agency / 2026" and a single CTA "ปรึกษาฟรี →" sits at the bottom-left in a white-filled black-bordered button. Right half: 2×2 bento of service tiles on white — each tile has a 1.5px black border, rounded 20px, holding an icon-badge + a service name + a one-line outcome ("ยอดขายเพิ่ม 3.2× / 90 วัน"). The bottom-right tile breaks the grid and is a dark `#0B1F66` blue card holding a single quote-stat. Below the entire stage on white, a thin marquee of client placeholder marks scrolls slowly. Everything snaps to a hard grid — there's almost no gradient anywhere on the page except a single subtle organic blob behind the bento as a whisper of soft, so it doesn't read as pure flat-design.

## Motion personality

Snappy, confident, deliberate. Hero's bento tiles enter with a 50ms-staggered scale-from-0.96 on load. Hover on a tile = 1.5px black border thickens to 2.5px + tile lifts 4px (180ms ease-out). The orange hero block has zero motion on its own — it's the still anchor. CTA button has a "flat-to-elevated" press: shadow appears on hover, disappears on active (mimics tactile press). Scroll-reveal is opacity + 16px translate, faster (180ms) than Dir A. One signature motion: the "ปรึกษาฟรี" button arrow ↓ slides 4px on hover. `prefers-reduced-motion` honored.

## 3 reference vibes

1. **Vercel home (https://vercel.com)** — for the bento confidence + how blue and a warm accent coexist on pure white
2. **Cluely / modern AI-startup landing pages** — for the painted-block hero stage that reads "we ship things"
3. **Aigocy hero gradient pill-cards** — kept the "floating cards near the headline" idea but made them structural, not decorative

## Best for

A founder who wants to signal **AI-native energy, speed, results-now**. Reads as "we built this stack ourselves, we'll ship yours fast, here are the numbers." Lands harder with SME owners shopping on confidence + immediate-result claims. Slight risk: orange-dominant can age faster (orange is trendy in 2025–2026 but volatile); the architecture (bento grid + hard borders) is what carries the longevity, not the saturation. Best paired with strong stat/proof points throughout the page.
