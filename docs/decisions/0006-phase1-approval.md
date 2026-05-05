# ADR 0006 — Phase 1 Approval (Gate G2)

**Date:** 2026-05-05
**Status:** ✅ Approved
**Decider:** Founder (Thanakit Chaithong)

## Decision

**Phase 1 prototype ผ่านการอนุมัติเรียบร้อย** — ดำเนินงานเข้าสู่ Phase 2 (Next.js production build)

Founder approval: "approve เลย ไปต่อ"

## What was approved

**9 หน้า prototype (Direction C "Aigocy-true"):**
1. Home — `prototype/index.html`
2. About — `prototype/about.html`
3. Services index — `prototype/services.html`
4. Services detail (web-design) — `prototype/services/web-design.html`
5. Portfolio index — `prototype/portfolio.html`
6. Portfolio case detail — `prototype/portfolio/sample-case.html`
7. Blog index — `prototype/blog.html`
8. Blog post detail — `prototype/blog/sample-post.html`
9. Contact — `prototype/contact.html`

**Foundation:**
- Design tokens v1 (`prototype/styles/tokens.css`)
- Typography: LINE Seed Sans Thai self-hosted, h1/h2 weight 700
- Component library 7 + motion module (8 CSS files in `prototype/styles/components/`)
- Mobile-first responsive verified at iPhone 13 viewport
- Cross-browser smoke ผ่าน (Chromium / WebKit / Firefox)

**Documentation:**
- 38 screenshots ใน `docs/phase1-review/`
- Phase 1 review README with deviations + next steps

## Calibration decisions ที่ทำระหว่างทาง

1. Hero **center-aligned** (เดิม left) — ตาม preview-c
2. H1/H2 weight = **700** (เดิมแผน 800) — สากลกว่า
3. **Inline heading-badges ออก** (orange/blue/light) — keep hero plain text
4. Pricing **ไม่แสดงเลข** ใช้ "ปรึกษาฟรี" + ช่วงราคาใน FAQ
5. Service icons = inline SVG (ไม่ใช่ icon font)

## Carry-overs to Phase 2 (T2.x)

ทุกอย่างใน `prototype/` ใช้เป็น reference สำหรับ Next.js build:
- `tokens.css` → `web/app/globals.css` Tailwind v4 `@theme` block (T2.4)
- HTML structure → React Server Components (T4.x)
- Component CSS → Tailwind utilities + shadcn/ui (T2.8 + T4.x)
- Vanilla JS motion → Framer Motion + use client components (T6.4)
- Thai content → next-intl `messages/th.json` (T2.6)
- Portfolio/services/blog rows → Supabase tables + RSC fetch (T3.x + T4.x)

## Excluded from v1 (per founder)

- ❌ T7.3 Article editor — ใช้ Supabase Studio ก่อน
- ❌ T7.4 Portfolio editor — ใช้ Supabase Studio ก่อน
- ❌ T7.5 Service editor — ใช้ Supabase Studio ก่อน
- ✅ T7.6 Lead inbox — ทำใน v1 (เก็บ leads + อ่านได้ใน admin)

## Next

Proceed to **T2.1**: `create-next-app` ใน `web/` (Next.js 15 + TS strict + Tailwind v4 + App Router + ESLint + pnpm)
