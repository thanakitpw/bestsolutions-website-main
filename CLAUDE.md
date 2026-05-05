# CLAUDE.md — Best Solutions Website Redesign

## บริบท

Re-design เว็บ **Best Solutions Corp** (https://www.bestsolutionscorp.com) — Digital Marketing Agency กรุงเทพฯ
- Founder: Thanakit Chaithong | 095-385-7029 / info@bestsolutionscorp.com / LINE @bestsolutions / FB @bestsolutionsagency
- เป้าหมาย: **SEO + visual quality** (ดีกว่าเว็บปัจจุบันแบบหยุดสายตา)

## Workflow แบบ 2 เฟส (HARD)

> ห้ามข้ามเฟส 1 ไป Next.js — เจ้าของอยากเห็นภาพก่อน

- **เฟส 1 — Static Prototype** (`/prototype/`) — HTML + CSS + Vanilla JS, ไม่มี build step
- **เฟส 2 — Next.js Production** (`/web/`) — เริ่มหลัง G2 approval (T1.22) เท่านั้น

## Tech Stack (เฟส 2)

| ส่วน | เลือกใช้ |
|---|---|
| Framework | Next.js 15 (App Router) + TS strict |
| Styling | Tailwind v4 + shadcn/ui (Radix) |
| CMS / DB | Supabase (Postgres + Storage + Auth) — `@supabase/ssr` client |
| i18n | next-intl segment-based (`/th/*` default, `/en/*` ready) |
| Forms | React Hook Form + Zod |
| Animations | Framer Motion (เท่าที่จำเป็น) |
| Analytics | GA4 + GTM + FB Pixel (ดู ADR 0003) |
| Hosting | Vercel |

## โครงสร้าง

```
prototype/  # เฟส 1 — HTML/CSS/JS
web/        # เฟส 2 — Next.js (สร้างหลัง T1.22)
supabase/   # migrations + seed
docs/       # ADRs, redirect map, open questions
.claude/    # agents + settings
```

## Design Direction (locked)

ดู `docs/decisions/0005-design-direction.md` — Direction C "Aigocy-true" (warm cream `#F5F3EE`, soft shadows, rounded-3xl, floating pill nav, organic gradient blob, ONE dark section, no hard borders).

- **Typography:** LINE Seed Sans Thai (self-hosted woff2 weights 400/700/800/900) — fallback IBM Plex Sans Thai
- **Colors:** Orange `#FF5A1F` warm dominant + Blue `#1E40AF` secondary + warm neutrals
- **Light theme only** (non-goal: dark mode)
- Tokens: `prototype/styles/tokens.css` — single source of truth, lift to `web/app/globals.css` `@theme` ใน T2.4

## Supabase

- **Project ใหม่:** `dhftyjnzqkyocfhtmjet.supabase.co` (greenfield — โปรเจคเก่าตัดทิ้ง)
- ดู `docs/decisions/0001-supabase-strategy.md` + `web/.env.local` (ไม่ commit)
- Tables (T3.1): `articles`, `portfolio_items`, `services`, `testimonials`, `leads`, `site_settings` — column-per-locale (`title_th`/`title_en`)
- RLS: anon SELECT where `status='published'`; auth full CRUD
- Storage buckets: `images/blog-covers`, `images/portfolio`, `images/services`, `images/og`
- Admin = Supabase Studio ก่อน launch; ทำ admin UI หลัง launch (เฉพาะ T7.6 lead inbox ใน v1)
- API key naming: `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

## SEO Checklist (ทุก page)

- [ ] `<title>` ≤ 60, `<meta description>` ≤ 160, canonical, hreflang th/en
- [ ] OG + Twitter Card + custom OG image (1200×630)
- [ ] JSON-LD: Organization (home), LocalBusiness, Service, Article (blog), BreadcrumbList
- [ ] 1× H1 ต่อหน้า, heading hierarchy ถูก, alt text ไทยทุก image
- [ ] Internal links ครอบคลุม (service ↔ portfolio ↔ blog)
- [ ] Slug ไทยใช้ได้ (URL-encoded)
- [ ] Core Web Vitals: LCP < 2.5s, INP < 200ms, CLS < 0.1
- [ ] Lighthouse Perf + SEO + A11y ≥ 95 ก่อน deploy
- ใช้ `next/image` ทุก image, `next/font` ทุก font, lazy load below-fold

## Coding Conventions

- TS `strict: true`, ไม่มี `any` ที่ไม่มีคอมเมนต์
- Component: PascalCase, file: kebab-case
- Server components by default, `"use client"` เฉพาะที่จำเป็น
- Data fetch ใน server component → ส่งเป็น props
- ห้าม fetch จาก client (ยกเว้น interaction)
- ห้ามใส่ comment ที่อธิบายว่า code ทำอะไร — ใส่เฉพาะ "why" ที่ไม่ obvious
- ห้าม hardcode ภาษาไทยใน component → ดึงผ่าน `useTranslations()`

## บริการ & หน้า

7 services: รับทำเว็บไซต์, ยิงแอดโฆษณา, ดูแลเพจ, SEO, AI Automation, AI ตอบอีเมล, Production
6 หน้า: Home, About, Services (+detail), Portfolio (+case), Blog (+post), Contact
Portfolio categories: Web Design, E-Commerce, Online Marketing, SEO, Branding, Video & Content

## Out of scope (non-goals)

- ❌ Dark mode (light theme only)
- ❌ E-commerce / payment
- ❌ Public auth / member account
- ❌ Real-time chat (ใช้ LINE link)
- ❌ Automated content migration script
- ❌ CMS abstraction layer
- ❌ Design system แยก package
- ❌ Admin UI ก่อน launch (ใช้ Supabase Studio)

## การทำงานกับ Claude

- Feature ใหญ่ → propose plan สั้น ๆ ก่อน
- ห้ามสร้างไฟล์/folder ที่ยังไม่ตกลง — ถามก่อน
- ห้าม destructive commands (rm -rf, supabase db reset, force push) โดยไม่ confirm
- UI work → screenshot/preview ก่อนถือว่าเสร็จ
- Response สั้น กระชับ ไทย/อังกฤษผสมตามบริบท
- ใช้ Supabase MCP เมื่อ available — อย่าเดา schema

## Definition of Done

1. `pnpm lint && pnpm typecheck && pnpm build` ผ่าน
2. Test ใน browser จริง (desktop + mobile)
3. SEO checklist ผ่าน
4. Lighthouse ≥ 95 (Perf + SEO + A11y)
5. Screenshot ส่งเจ้าของยืนยัน

## Agents (`.claude/agents/`)

Agent Teams เปิดแล้ว (`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`). Skills lists per role อยู่ใน agent files.

| Role | When to spawn |
|---|---|
| `designer` | Phase 1 prototype, moodboards, hero design, type/color systems |
| `seo-strategist` | Keyword briefs, on-page audit, structured data, sitemap |
| `content-writer` | Service copy, blog articles, OG/meta, hero text |
| `frontend-engineer` | Phase 2 Next.js, Supabase wiring, i18n |
| `qa-tester` | Playwright e2e, Lighthouse, a11y, visual regression |

Lead (main session) handles: planning, founder communication, integration. Subagents ไม่ spawn nested teams.
