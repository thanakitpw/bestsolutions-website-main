# Direction A — "Editorial Studio"

> รู้สึกแบบ "เอเจนซี่ที่เก่งเรื่อง strategy เปิดออฟฟิศชั้นบนของตึกแถว — สงบ มั่นใจ พรีเมียม ไม่ต้องตะโกน"

## Aesthetic stance

**Editorial / Studio.** Cool-leaning, blue-dominant. Cream off-white background acts as paper. Asymmetric editorial grid (think Stripe Press or Linear blog). One organic gradient mesh accent does the heavy lifting — orange shows up as punctuation, not as the lead. Confident whitespace, large display weight, small precise body. Reads like a thoughtful publication that happens to sell services.

**DFII score:** Impact 4 + Fit 5 + Feasibility 5 + Performance 5 − Consistency Risk 1 = **+18 → execute fully**

**Differentiation anchor:** Hero uses a *number-led editorial layout* — a giant index number ("01 — บริการที่วัดผลได้") next to oversized Thai display type, with the gradient blob anchored behind a single floating service-pill. No headline+button+photo template anywhere on the page.

---

## Palette

| Role | Hex | Notes |
|---|---|---|
| Background (page) | `#F7F4EE` | Warm cream off-white — the "paper" |
| Surface (cards) | `#FFFFFF` | Pure white pops against cream |
| Surface alt | `#EFEAE0` | Slightly deeper cream for section banding |
| Text primary | `#0B1220` | Near-black, slight blue cast (16.8:1 on cream) |
| Text muted | `#5C6473` | (5.4:1 on cream — passes WCAG AA body) |
| **Blue 50** | `#EEF2FF` | wash backgrounds, badge fills |
| **Blue 100** | `#DCE4FF` | hover surface, subtle pills |
| **Blue 500** | `#2541E0` | secondary CTA outline + brand mid |
| **Blue 700** | `#1A2E9C` | primary text-on-blue, link hover |
| **Blue 900** | `#0E1A5C` | dark accent block (the "rhythm" cards) |
| **Orange 50** | `#FFF3EA` | gradient stop start |
| **Orange 100** | `#FFE0C7` | hover state on orange ghost |
| **Orange 500** | `#F26B1E` | primary CTA fill — slightly burnt vs. neon orange |
| **Orange 700** | `#C24D0A` | active/press state, on-cream contrast 4.6:1 |
| **Orange 900** | `#7A2D00` | rare — text accent in editorial pull-quote |
| Success | `#1F8F5F` | (4.7:1 on cream) |
| Error | `#C2342E` | (5.1:1 on cream) |
| Border subtle | `#E2DCCC` | 1px hairline on cream |

**Pairing logic:** Burnt orange (`#F26B1E`, not safety-cone `#F97316`) sits more peacefully next to deep editorial blue. The cream base lets both colors stay saturated without screaming.

---

## Type system

**Display + body:** LINE Seed Sans Thai (preview uses IBM Plex Sans Thai 700 as proxy for LINE Seed Heavy 800).

| Token | Mobile | Desktop | Weight | Line-height | Tracking |
|---|---|---|---|---|---|
| Display XL (hero) | 44px | 88px | 800 | 1.02 | -0.02em |
| Display L (section) | 32px | 60px | 800 | 1.05 | -0.015em |
| H2 | 26px | 40px | 700 | 1.15 | -0.01em |
| H3 | 20px | 24px | 700 | 1.25 | 0 |
| Body L (lead) | 17px | 19px | 400 | 1.65 | 0 |
| Body | 16px | 17px | 400 | 1.7 | 0 |
| Eyebrow / index | 13px | 14px | 700 | 1.0 | 0.12em (uppercase) |
| Caption | 13px | 14px | 500 | 1.5 | 0 |

**Thai-specific tuning:** Line-heights are tighter than typical Thai recommendations (1.02 on display) because LINE Seed Heavy 800 has a tall x-height. Body stays at 1.65–1.7 — Thai needs the breathing room for tone marks. Tracking goes negative on display only.

**Numerals:** Tabular figures on stat blocks, proportional on body — `font-variant-numeric: tabular-nums` selectively.

---

## Hero composition

The hero is a 12-column editorial grid, not a centered stage. Top-left a small uppercase eyebrow ("BEST SOLUTIONS / 01 — DIGITAL STUDIO"). The display headline starts at column 2, breaks across two lines with intentional ragging — Thai display copy reads like a publication's masthead. To the right, a single floating pill-card sits at column 9–11 holding three service icons in soft orange wash, casting a long blurred orange-to-blue radial gradient blob behind itself that bleeds slightly off the right edge. Below the headline: a single deck (lead paragraph) at column 2–6, then two CTAs sitting on a horizontal rule — primary orange-filled "ปรึกษาฟรี" and a text-link "ดูผลงาน →". Bottom-left corner shows a small "Scroll ↓" indicator and a tiny client-logo strip in 40% opacity. Generous 120px breathing room top and bottom on desktop. The whole thing feels like the inside cover of a design annual.

## Motion personality

Slow, considered, almost cinematic. Hero gradient blob drifts on a 14-second loop (subtle, ≤4px translate). Display headline does a single staggered fade-up on load (60ms per word, 320ms total). Cards have a 1.01 scale + soft shadow grow on hover (220ms ease-out). Scroll-reveal is 24px translate-up with opacity, never sliding from the side. No bouncing, no spinning, no parallax. `prefers-reduced-motion` kills everything except opacity fades.

## 3 reference vibes

1. **Stripe Press (https://press.stripe.com)** — for the cream paper feel, the editorial confidence, large numerals as design elements
2. **Linear changelog** — for the disciplined type rhythm and the way one accent color punches through cool neutrals
3. **Aigocy hero** — for the floating gradient-blob accent + pill nav language, just executed cooler and more print-influenced

## Best for

A founder who wants to signal **maturity, strategy, longevity**. Reads as "we don't chase trends, we ship work that holds up." Lands well with B2B clients evaluating multiple agencies — the calm differentiates from competitors who all look like the same neon AI-startup template. Slight risk: may read "too quiet" for clients shopping on energy alone. Best paired with strong case-study copy that does the persuading.
