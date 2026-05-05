# Phase 1 — Founder Review Bundle

**วันที่:** 2026-05-05
**Status:** Awaiting Gate G2 approval (T1.22)

## ขอบเขตงานที่ส่งมอบ

### ✅ Direction & Tokens (T1.1-T1.4)
- **Direction C "Aigocy-true"** locked (ADR 0005) — warm cream `#F5F3EE`, soft shadows, rounded-3xl, gradient blob
- Design tokens v1 → `prototype/styles/tokens.css`
- Typography: LINE Seed Sans Thai self-hosted (woff2 weights 400/700/800/900)
- h1/h2 weight = **700** (preview-c calibrated, สากล)

### ✅ Component library (T1.5-T1.11)
- Navbar (floating pill + mobile drawer)
- Button (primary near-black, secondary blue outline, orange, ghost, on-dark)
- Card (service / portfolio / blog / stat / dark variants — rounded-3xl, soft shadows, no borders)
- Heading-badge (inline pill in headings — currently unused per founder, kept for future)
- Footer (multi-col grid + social + bottom links)
- Form (RHF/Zod-ready states + honeypot)
- Section (`.section`, `.container`, `.section-dark` curved-top transition)
- Motion (scroll-reveal + drawer + filter chips + TOC active state)

### ✅ Pages (T1.12-T1.17) — 9 ไฟล์ HTML
| File | ที่เห็นในหน้า |
|---|---|
| `prototype/index.html` | Hero (centered + 3 floating pills + blob) → 4 services → 3 portfolio → stats → 3 testimonials → 3 blog → dark CTA |
| `prototype/about.html` | Page-hero → Founder story 2-col + quote → 4 values cards → 4-step process → stats → dark CTA |
| `prototype/services.html` | Page-hero → 7 service cards (✓ checklists) → 4-step process → dark CTA |
| `prototype/services/web-design.html` | Hero + breadcrumb → 6 features → Problem/Solution split → 5 sprint steps → 3 related cases → 5 FAQ → dark CTA |
| `prototype/portfolio.html` | Page-hero → 7 filter chips → 9 portfolio cards (3-col) → stats → dark CTA |
| `prototype/portfolio/sample-case.html` | Hero + meta pills → cover → results band (3 metrics) → narrative → tech chips → 4-image gallery → testimonial → 3 related → dark CTA |
| `prototype/blog.html` | Page-hero → 6 filter chips → featured large card → 6 blog cards (3-col) → dark CTA |
| `prototype/blog/sample-post.html` | Header + cover → sticky TOC sidebar → article body (h2/h3/code/blockquote) → author bio → 3 related → dark CTA |
| `prototype/contact.html` | Page-hero → 2-col (form + info channels + map) → 5 FAQ |

### ✅ Motion (T1.18)
- Scroll-reveal บน sections / cards / process steps / testimonials (IntersectionObserver)
- Stagger delay สำหรับ grid children (0-8 items)
- Mobile drawer toggle + scrim + ESC + close on link click
- Filter chip active state (visual only — actual filtering ใน Phase 2)
- TOC active state สำหรับ blog post (sticky sidebar)
- `prefers-reduced-motion` honored — animation ปิดทันทีถ้า user request

### ✅ Mobile pass (T1.19)
- Verified ที่ iPhone 13 viewport (390×844) — 9 หน้า
- ทุกหน้า responsive: nav drawer, type scale, card stacking, no horizontal scroll
- Floating service pills ใน hero stack เป็น inline ที่ ≤768px

### ✅ Cross-browser smoke (T1.20)
- **Chromium** ✓
- **WebKit (Safari)** ✓ — minor: `✦` symbol size ต่างกันนิดเดียว (system font)
- **Firefox** ✓ — minor: text wrapping ของ Thai ต่างกันเล็กน้อยที่ความกว้างเฉพาะ (ปกติของ browser)
- ไฟล์เปรียบเทียบ: `_smoke-webkit-home.png`, `_smoke-firefox-home.png`

## วิธีดู screenshots

ทุกไฟล์ในโฟลเดอร์นี้ — ตั้งชื่อตามลำดับ `01-09-{viewport}-{shot}.png`:
- `*-desktop-hero.png` = หน้าแรกที่เห็น (above the fold) ที่ 1440×900
- `*-desktop-full.png` = ทั้งหน้าตั้งแต่บนถึงล่าง
- `*-mobile-hero.png` = หน้าแรกบน iPhone 13
- `*-mobile-full.png` = ทั้งหน้าบนมือถือ

## วิธีรัน prototype ในเครื่อง

```bash
cd prototype
npx serve .
# เปิด http://localhost:3000
```

## Acknowledged deviations from original spec

(จาก ADR 0005 + การปรับระหว่างทาง)

1. **Hero centered** (เดิม left-aligned) — ตาม preview-c ของเจ้าของ
2. **H1/H2 weight = 700** ไม่ใช่ 800 — เจ้าของบอก "สากลกว่า" (ADR 0005 §2 อัปเดตแล้ว)
3. **Inline heading-badges ออกหมด** — เจ้าของบอกเอาออก keep hero h1 เป็นข้อความล้วน
4. **Pricing ไม่แสดงเลข** — ตาม ADR 0004 ใช้ "ปรึกษาฟรี" + ราคาในรูปแบบช่วง (FAQ)
5. **Service icons ใช้ inline SVG** ไม่ใช่ icon font — bundle เล็กกว่า + customizable

## Next steps (หลัง G2 approval)

- **T1.22**: Founder sign-off → ไฟล์ `docs/decisions/0006-phase1-approval.md` (ใหม่)
- **T2.1-T2.9**: Bootstrap Next.js 15 ใน `web/` — Tailwind v4, next-intl, shadcn/ui
- **T3.x**: Supabase migrations + seed
- **T4.x**: Convert HTML → React server components + Supabase queries
- **T5.x**: SEO (metadata, JSON-LD, sitemap, OG)
- **T8.x**: Playwright + Lighthouse + a11y
- **T9.x**: Vercel deploy + DNS cutover

## หมายเหตุ Phase 2

ทุกอย่างใน prototype นี้จะถูกยกข้ามไป Next.js แบบเดียวกัน:
- Tokens → `web/app/globals.css` `@theme` block (Tailwind v4)
- HTML → React Server Components
- Vanilla JS → Framer Motion / use client component
- Static content → Supabase rows + next-intl messages

**Phase 1 = visual approval gate. ไม่มีอะไรใน prototype ที่จะ "convert" ไป production โดยตรง — ใช้เป็น reference เท่านั้น**
