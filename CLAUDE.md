# CLAUDE.md — Best Solutions Website Redesign

## บริบทโปรเจค

Re-design เว็บบริษัทของเจ้าของโปรเจค: **Best Solutions Corp** (https://www.bestsolutionscorp.com)
- Digital Marketing Agency & Production House (กรุงเทพฯ)
- Founder: Thanakit Chaithong
- ติดต่อ: 095-385-7029 / info@bestsolutionscorp.com / LINE @bestsolutions / FB @bestsolutionsagency
- เว็บปัจจุบันอยู่บน Next.js + Supabase แล้ว — รอบนี้ทำใหม่ทั้งหมดเพื่อปรับ UI/UX, SEO, performance

**เป้าหมาย:** เน้น **SEO** และ **คุณภาพ visual design** เป็นพิเศษ

## Workflow แบบ 2 เฟส

> **สำคัญ:** ห้ามข้ามเฟส 1 ไป Next.js เลย เจ้าของอยากเห็นภาพก่อน

### เฟส 1 — Static Prototype (`/prototype/`)
- HTML + CSS (Tailwind via CDN ได้) + Vanilla JS
- ทุกหน้าเปิดด้วย `python -m http.server` หรือ `npx serve` ได้
- โฟกัส: layout, typography, color, motion, hero composition
- ไม่ต้องมี backend / state management / build step ที่ซับซ้อน
- เก็บ assets ที่ approved แล้วไว้ reuse ในเฟส 2

### เฟส 2 — Next.js Production (`/web/`)
- เริ่มก็ต่อเมื่อเจ้าของอนุมัติ design จาก prototype แล้ว
- แปลง HTML → React components ทีเดียว ไม่ทำคู่ขนาน

## Tech Stack (เฟส 2)

| ส่วน | เลือกใช้ | เหตุผล |
|---|---|---|
| Framework | **Next.js 15 (App Router)** | SSR/ISR ดีต่อ SEO, ใช้ของเดิมต่อยอดได้ |
| Language | **TypeScript (strict)** | type safety, refactor ปลอดภัย |
| Styling | **Tailwind CSS v4** | velocity สูง, design system สอดคล้อง |
| Components | **shadcn/ui + Radix** | accessibility ฟรี, ปรับ style ง่าย |
| CMS / DB | **Supabase** (Postgres + Storage + Auth) | เจ้าของใช้อยู่แล้ว, mcp เชื่อมพร้อม |
| Content | **MDX** สำหรับ blog body, **Supabase rows** สำหรับ portfolio/metadata | balance ระหว่าง dev experience กับ admin editing |
| i18n | **next-intl** | App Router-friendly, segment-based routing |
| Forms | **React Hook Form + Zod** | typesafe validation |
| Animations | **Framer Motion** (เท่าที่จำเป็น) | ห้ามใส่จนเว็บอืด |
| Analytics | **GA4 + Vercel Analytics** | SEO + performance tracking |
| Hosting | **Vercel** | edge network, image optimization |

## โครงสร้างโปรเจค

```
bestsolutions-website-redesign/
├── prototype/              # เฟส 1 — static HTML/CSS/JS
│   ├── index.html
│   ├── about.html
│   ├── services.html
│   ├── portfolio.html
│   ├── blog.html
│   ├── contact.html
│   ├── styles/
│   └── scripts/
├── web/                    # เฟส 2 — Next.js (สร้างหลัง prototype approved)
│   ├── app/
│   │   ├── [locale]/       # i18n: /th/*, /en/* (เริ่ม th เท่านั้น)
│   │   │   ├── (marketing)/
│   │   │   ├── blog/
│   │   │   ├── portfolio/
│   │   │   └── services/
│   │   ├── api/
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/
│   ├── lib/
│   │   ├── supabase/
│   │   └── seo/
│   ├── content/            # MDX blog posts (optional)
│   ├── messages/           # i18n strings (th.json, en.json)
│   └── public/
└── supabase/
    ├── migrations/
    └── seed.sql
```

## i18n — เตรียมโครงสร้าง, ปล่อย TH ก่อน

- **Default locale: `th`** — `en` ทำในอนาคต
- ใช้ `next-intl` segment-based: `/th/about`, `/en/about`
- `messages/th.json` + `messages/en.json` (en ใส่ string ภาษาไทยเป็น fallback หรือ TODO ก่อนได้)
- DB schema เผื่อ multilingual: column `title_th`, `title_en` หรือใช้ `translations` table
- `<html lang>` และ `hreflang` tags ต้องครบ
- **อย่า hardcode ภาษาไทยใน component** — ดึงผ่าน `useTranslations()` ทุก string

## Supabase — Schema (draft)

> **Project: ใหม่** — `dhftyjnzqkyocfhtmjet.supabase.co` (โปรเจคเก่าถูกตัดทิ้ง)
> Auth keys ดู `docs/decisions/0001-supabase-strategy.md` + `web/.env.local` (ไม่ commit)
> Schema นี้เป็นแบบ greenfield — ไม่มี existing schema ให้ตรวจ

ตารางที่ต้องมี (ขั้นต่ำ):

```
articles            (id, slug, title_th, title_en, excerpt_th, excerpt_en,
                     body_md_th, body_md_en, cover_image, category, tags[],
                     author_id, published_at, status, seo_title, seo_description, og_image)

portfolio_items     (id, slug, title, client, category, summary, cover_image,
                     gallery[], live_url, services[], year, featured, sort_order)

services            (id, slug, name_th, name_en, summary, icon, hero_image,
                     features[], pricing_tiers, sort_order)

testimonials        (id, client, role, company, quote, avatar, related_service)

leads               (id, name, email, phone, service, message, source, created_at)
                    -- จาก contact form

site_settings       (key, value)  -- single source for global text/contact info
```

- Storage buckets ใหม่ทั้งหมด: `images/blog-covers`, `images/portfolio`, `images/services`, `images/og` (ทำใน T3.5)
- RLS: public READ บน published content, write ต้อง auth
- ใช้ **Supabase Studio** ในการแก้ content ก่อน — ทำ admin UI ของตัวเองหลัง launch (T7.6 lead inbox เท่านั้นที่ทำใน v1)
- Client setup ใช้ `@supabase/ssr` + `createServerClient` / `createBrowserClient` (pattern ที่เจ้าของส่งมา)
- API key naming: `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (ไม่ใช่ anon key แบบเดิม)

## SEO — Non-negotiable

ทุก page ต้องผ่าน checklist นี้ก่อนถือว่าเสร็จ:

- [ ] `<title>` unique ต่อหน้า (≤ 60 chars), `<meta description>` (≤ 160 chars)
- [ ] Open Graph + Twitter Card + custom OG image (1200×630)
- [ ] JSON-LD structured data: `Organization` (home), `Article` (blog), `BreadcrumbList`, `Service`, `LocalBusiness`
- [ ] Canonical URL
- [ ] `hreflang` ระหว่าง th/en
- [ ] `sitemap.xml` + `robots.txt` generated dynamic
- [ ] Heading hierarchy ถูกต้อง (1× H1 ต่อหน้า)
- [ ] `alt` text ทุก image (ไทย, มี keyword ตามบริบท)
- [ ] Internal links ครอบคลุม (service ↔ portfolio ↔ blog)
- [ ] Slug ภาษาไทยใช้ได้ (URL-encoded) — ของเดิมใช้แบบนั้น เก็บ pattern เดียวกัน
- [ ] **Core Web Vitals**: LCP < 2.5s, INP < 200ms, CLS < 0.1
- [ ] Lighthouse SEO + Performance ≥ 95 ก่อน deploy

ใช้ `next/image` ทุก image, `next/font` ทุก font, lazy load ทุก section ที่อยู่ below the fold

## Visual Design Principles (locked from brainstorming)

เจ้าของอยากให้หน้าตา **ดีเป็นพิเศษ** — เกณฑ์การตัดสิน:

- **Visual reference: Aigocy** (https://wpriverthemes.com/aigocy/) — light bg, bold display, floating pill nav, soft rounded cards, organic gradient accent, สลับ dark card บ้างเป็น rhythm
- **Typography: LINE Seed Sans Thai** เป็นหลัก (Heavy 800 + รุ่นย่อย). Fallback IBM Plex Sans Thai ถ้า Heavy 800 ใช้ไม่เวิร์ค
- **Color palette: Blue + Orange family** (loose interpretation ของ `#1D4ED8` blue + `#F97316` orange) + grayscale + 1-2 surface neutrals — ไม่ใช่ Tailwind default แบบเป๊ะ
- **Light theme only** — ไม่ทำ dark mode (อยู่ในรายการ non-goals แล้ว)
- มี hero section ที่ "หยุดสายตา" — ไม่ใช่แค่ "headline + button + photo"
- Spacing generous — desktop ≥ 96px section padding, mobile ≥ 64px
- Motion มี purpose: scroll-reveal เบาๆ, hover micro-interactions, ห้าม spinning/bouncing แบบ 2010
- Inline icon-badges in heading (ลูกเล่น Aigocy-style)
- Mobile-first จริงๆ ไม่ใช่ desktop ย่อ

ก่อนเขียน HTML ใน prototype designer agent **ต้องเสนอ moodboard 2 ทิศทาง** (Aigocy-flavored) ให้เจ้าของเลือก 1 ก่อน (Gate G1)

## Coding Conventions

- TypeScript `strict: true`, ไม่มี `any` ที่ไม่มีคอมเมนต์อธิบาย
- Component ตั้งชื่อ PascalCase, file kebab-case (`hero-section.tsx`)
- Server components by default, `"use client"` เฉพาะที่จำเป็น
- Data fetching ใน server component → ส่งเป็น props ลงไป
- ห้าม fetch จาก client เว้นแต่เป็น interaction (form submit, search)
- ESLint + Prettier + TypeScript เป็น CI gate
- **ห้ามใส่ comment ที่อธิบายว่า code ทำอะไร** — ใส่เฉพาะ "why" ที่ไม่ obvious

## บริการ & หน้าหลัก (อ้างอิงเว็บปัจจุบัน)

Services (เก็บไว้ก่อน — เจ้าของจะ revise):
1. รับทำเว็บไซต์ (Web Design)
2. ยิงแอดโฆษณา (FB/Google Ads)
3. ดูแลเพจโซเชียล (Social Media Management)
4. รับทำ SEO
5. AI Automation
6. AI ตอบอีเมล
7. Production (Video & Content)

Portfolio categories: Web Design, E-Commerce, Online Marketing, SEO, Branding, Video & Content

Blog categories ปัจจุบัน: AI, Digital Marketing (เพิ่มได้)

หน้า: Home, About, Services (+ service detail), Portfolio (+ case detail), Blog (+ post), Contact

## Out of scope (non-goals)

- ❌ Dark mode — light theme only, ไม่ต้องเตรียม token เผื่อ
- ❌ E-commerce / payment integration
- ❌ Public auth / member account (admin login เฉยๆ ในอนาคต)
- ❌ Real-time chat — ใช้ LINE link
- ❌ **Automated content migration script** — manual copy-paste OK กว่าเขียน script
- ❌ CMS abstraction layer นอกเหนือจาก Supabase + Studio
- ❌ Design system แยก package — token อยู่ใน `web/app/globals.css` ที่เดียว
- ❌ Admin UI ก่อน launch — ใช้ Supabase Studio editing ไปก่อน, ทำ admin หลัง launch

## การทำงานกับ Claude

- **ก่อน implement feature ใหญ่** → propose plan สั้นๆ ให้ดู ไม่ลุยเลย
- **ห้ามสร้างไฟล์/folder ที่ยังไม่ได้ตกลง** — ถามก่อน
- **ห้ามรัน destructive commands** (rm -rf, supabase db reset, force push) โดยไม่ confirm
- **ทุกครั้งที่จะ deploy** → list ว่าจะ deploy อะไร, รัน build local ก่อน
- เจ้าของชอบเห็นภาพ — ถ้าเป็น UI work ให้ screenshot / preview link ก่อนจะถือว่าเสร็จ
- Response สั้น กระชับ ไทย/อังกฤษผสมได้ตามบริบท
- ใช้ Supabase MCP เมื่อ available — อย่าเดา schema

## Definition of Done (ต่อ feature)

1. Code ผ่าน `pnpm lint && pnpm typecheck && pnpm build`
2. ทดสอบใน browser จริง (desktop + mobile viewport)
3. SEO checklist ผ่าน (สำหรับ page ใหม่)
4. Lighthouse score ≥ 95 (Perf + SEO + A11y)
5. Screenshot / preview ส่งให้เจ้าของยืนยัน

## Agent Team

Agent Teams เปิดแล้ว (`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`).
Subagent definitions อยู่ที่ `.claude/agents/` — reuse ได้ทั้งแบบ delegate (Agent tool) และแบบ teammate (agent team).

| Role | File | When to spawn |
|---|---|---|
| **designer** | `.claude/agents/designer.md` | Phase 1 prototype, moodboards, type/color systems, hero design |
| **seo-strategist** | `.claude/agents/seo-strategist.md` | Keyword briefs, on-page audit, structured data, sitemap |
| **content-writer** | `.claude/agents/content-writer.md` | Service copy, blog articles, OG/meta, hero text |
| **frontend-engineer** | `.claude/agents/frontend-engineer.md` | Phase 2 Next.js conversion, Supabase wiring, i18n |
| **qa-tester** | `.claude/agents/qa-tester.md` | Playwright e2e, Lighthouse, a11y audit, visual regression |

### When to use a TEAM vs single subagent

**Team (parallel, communicating):**
- Phase 1 → 2 cutover review: designer + frontend-engineer + seo-strategist parallel audit
- Pre-launch: seo-strategist + qa-tester + frontend-engineer cross-check
- Investigating perf regression with competing hypotheses

**Single subagent (delegate):**
- Write 1 blog post → content-writer alone
- Add 1 service detail page → frontend-engineer alone
- Audit 1 page for SEO → seo-strategist alone

### Spawning examples
- "Spawn a team: designer to draft 3 hero directions, content-writer to draft Thai copy for each, seo-strategist to map keywords. Have them share findings and converge."
- "Use the qa-tester agent to run Lighthouse on /services and report failures."

Lead (main session) handles: planning, founder communication, integration, cleanup. Teammates do not spawn nested teams.

## Skills Stack (ที่ Claude ต้อง invoke)

โปรเจคนี้ใช้ skills ที่ติดตั้งไว้แล้วใน user scope. แต่ละ subagent ระบุ skills ที่ตัวเองต้องเรียก — ดูที่ `.claude/agents/*.md`. สรุปภาพรวม:

**Process / discipline (ทุก role)**
- `using-superpowers` (auto), `brainstorming`, `writing-plans`, `executing-plans`
- `verification-before-completion`, `code-review-excellence`, `simplify`

**Design / UX**
- `frontend-design`, `web-design-guidelines`, `design-orchestration`
- `ui-ux-designer`, `mobile-design`, `tailwind-design-system`
- `magic-ui-generator`, `radix-ui-design-system`, `shadcn`

**SEO (เน้นเป็นพิเศษ)**
- `seo-fundamentals`, `seo-audit`, `seo-keyword-strategist`
- `seo-content-writer`, `seo-content-planner`, `seo-meta-optimizer`
- `seo-technical`, `seo-structure-architect`, `seo-schema`
- `seo-images`, `seo-sitemap`, `seo-page`, `programmatic-seo`
- `geo-fundamentals` (local SEO), `web-performance-optimization`

**Content**
- `copywriting`, `marketing-psychology`, `social-content`
- `avoid-ai-writing`, `professional-proofreader`, `beautiful-prose`

**Frontend / engineering**
- `nextjs-best-practices`, `nextjs-app-router-patterns`, `nextjs-supabase-auth`
- `react-best-practices`, `react-patterns`, `react-component-performance`
- `typescript-pro`, `typescript-advanced-types`
- `tailwind-patterns`, `i18n-localization`
- `supabase`, `supabase-postgres-best-practices`
- `zod-validation-expert`, `native-data-fetching`
- `clean-code`

**QA / testing**
- `playwright-skill`, `playwright-best-practices`
- `e2e-testing`, `e2e-testing-patterns`, `webapp-testing`
- `accessibility-compliance-accessibility-audit`, `wcag-audit-patterns`
- `screen-reader-testing`, `ui-visual-validator`, `screenshots`
- `deployment-validation-config-validate`

**Rule:** ก่อนเริ่มงาน ให้ invoke skills ที่เกี่ยวข้องด้วย Skill tool — แม้จะรู้สึกว่ารู้เนื้อหาอยู่แล้ว skills evolve ตลอดเวลา
