# Progress — Best Solutions Website Redesign

**Last updated:** 2026-05-05 15:10 GMT+7
**Current branch:** `main` (working tree dirty — Task A home page wired, not yet committed)
**Live Supabase project:** `dhftyjnzqkyocfhtmjet` (bestsolutions-website, ap-northeast-2)

---

## ✅ ที่เสร็จไปแล้ว

### Phase 0–1 (prototype + decisions)
- T0.1–T0.9 — Pre-flight (CLAUDE.md, ignores, redirect map, ADRs, stack pinning)
- T1.1–T1.22 — เฟส 1 prototype 9 หน้า, Direction C "Aigocy-true" approved (ADR `0006-phase1-approval.md`), G2 ผ่าน
- 38 screenshots ใน `docs/phase1-review/` + cross-browser smoke (chrome/safari/firefox)

### Phase 2 — Next.js bootstrap
- T2.1–T2.9 — Next.js 16.2.4 + React 19 + Tailwind v4 + TS strict + next-intl + LINE Seed font
- 9 routes ported จาก HTML prototype 1:1 (home, about, services, services/web-design, portfolio, portfolio/sample-case, blog, blog/sample-post, contact)
- Container width = `1280px` (industry-standard)
- Fonts: LINE Seed Sans Thai (self-hosted woff2 weights 400/700/800/900)
- Middleware chain: `proxy.ts` = Supabase session refresh → next-intl routing

### Phase 3 — Supabase (applied via MCP)
- ✅ MCP server config `.mcp.json` → hosted Supabase (OAuth 2.1)
- ✅ Migration 0001_init — 6 tables (articles, portfolio_items, services, testimonials, leads, site_settings) + 2 enums + updated_at trigger
- ✅ Migration 0002_rls — RLS policies (anon SELECT published, anon INSERT leads, auth full CRUD)
- ✅ Migration 0003_storage — 4 public-read buckets (blog-covers, portfolio, services, og-images)
- ✅ Seed: services=7, portfolio=9, testimonials=3, articles=3, settings=4, leads=0
- ✅ Generated types: `web/utils/supabase/types.ts` (Postgrest 14.5 official format + domain aliases)
- ✅ Typecheck clean (`pnpm exec tsc --noEmit`)
- ✅ @supabase/ssr clients: `client.ts`, `server.ts`, `admin.ts`, `middleware.ts`, `queries.ts`

### Phase 4 / Task A — Wire Supabase data into pages (IN PROGRESS)
- ✅ **Home page (`/[locale]`)** — wired 5 sections to RSC + Supabase:
  - hero title/eyebrow ← `getSiteSetting<HeroSetting>("hero")`
  - hero stats + stats-band ← `getSiteSetting<StatsSetting>("stats")`
  - services strip (first 4 by sort_order) ← `getServices()`
  - featured portfolio (3) ← `getPortfolioItems({featured:true, limit:3})`
  - testimonials (3) ← `getFeaturedTestimonials(3)`
  - blog teaser (3) ← `getArticles({limit:3})`
  - all queries run in parallel via `Promise.all`
  - CTA dark band + lead copy still hardcoded (not in DB)
- ✅ Verified: `tsc --noEmit` clean, `pnpm build` 9 routes prerender, `GET /th` 200 in ~500ms, content from DB renders correctly
- ⏳ 8 routes still hardcoded: about, services, services/web-design, portfolio, portfolio/[slug], blog, blog/[slug], contact

---

## 📁 Files ที่แก้ล่าสุด (uncommitted — Task A home)
- `web/app/[locale]/page.tsx` — replaced 4 hardcoded sections with RSC fetch + map; preserved prototype markup
- `web/components/service-icon.tsx` — NEW. Maps DB icon name (`web|megaphone|search|chat|sparkle|mail|video`) → inline SVG
- `web/utils/format.ts` — NEW. `pickLocale(locale, th, en)` + `formatThaiDate(iso)` (CE year per prototype, e.g. "5 พ.ค. 2026")
- `.claude/progress.md` — this file

## 📁 Files แก้ก่อนหน้า (recent commits)
- `b50ff12` — Supabase migrations + seed via MCP, regen types
- `ba2bf1d` — `.mcp.json`
- `b2cf4b4` — Supabase clients refactor (utils/supabase/* matching @supabase/ssr docs)
- `f608dc6` — Migrations + seed + typed clients (T3.1–T3.7)
- `dfeed02` — 8 prototype pages → Next.js routes (T4.3–T4.7)
- `11e3379` — Container width 1280px

---

## 🎯 Decisions สำคัญ (locked)
- **Visual direction:** Direction C "Aigocy-true" (warm cream `#F5F3EE`, soft shadows, rounded-3xl, no hard borders, ONE dark section, gradient blob)
- **Typography:** LINE Seed Sans Thai (NOT IBM Plex — user reverted)
- **Colors:** Orange `#FF5A1F` warm dominant + Blue `#1E40AF` secondary + warm neutrals
- **Light theme only** (no dark mode in scope)
- **i18n strategy:** column-per-locale (`title_th`/`title_en`) over join table
- **Supabase project:** greenfield (`dhftyjnzqkyocfhtmjet`) — โปรเจคเก่าตัดทิ้ง
- **Admin:** Supabase Studio ก่อน launch (T7.3–T7.5 deferred); only T7.6 lead inbox in v1
- **Heading badges:** removed (no inline ★AI, ★2026 etc.)
- **h1/h2 weight:** 700 (calibrated from preview-c)
- **Workflow rule:** prototype HTML → Next.js port (NOT Figma)
- **Container max-width:** 1280px
- **Data fetching pattern (Task A):** RSC server-component fetch via `web/utils/supabase/queries.ts` helpers; parallel via `Promise.all` at top of page; pass plain props/values to existing prototype markup. No client fetch, no SWR, no hooks for read paths.
- **i18n field selection:** `pickLocale(locale, th, en)` helper — falls back to `_th` when `_en` is null. Single field `_th` is required by schema.
- **Date format:** Thai short month + CE year (`5 พ.ค. 2026`), not BE — matches prototype intent.
- **Service detail routes:** only `web-design` has a static page; other slugs link to `/services` index until dynamic `[slug]` route exists. Tracked via `SERVICES_WITH_DETAIL` set in home page.
- **Home services count:** 4 (sliced from full list by sort_order). Tunable via Supabase Studio `services.sort_order`.
- **Image fallbacks:** when DB `cover_image` / `client_avatar` is null, use prototype gradient palette (orange→peach / blue / dark→orange) keyed by index.

---

## 🚧 TODO ที่ยังเหลือ (เลือกทำทีละ task)

### A — Wire Supabase data into pages (T4.x refactor)
แทน hardcoded content ใน page.tsx ด้วย calls ไป `web/utils/supabase/queries.ts`:
- ✅ **Home** (`/[locale]/page.tsx`) — DONE 2026-05-05
- ⏳ **About** (`/[locale]/about`) — `getFeaturedTestimonials()` + `getSiteSetting("founder" | "stats" | "contact")`
- ⏳ **Services index** (`/[locale]/services`) — `getServices()` (all 7)
- ⏳ **Services detail static** (`/[locale]/services/web-design`) — `getServiceBySlug("web-design")`; eventually convert to dynamic `[slug]` route + `generateStaticParams`
- ⏳ **Portfolio index** (`/[locale]/portfolio`) — `getPortfolioItems()` + category filter UI
- ⏳ **Portfolio detail** (`/[locale]/portfolio/sample-case`) — convert to dynamic `[slug]` + `getPortfolioItemBySlug()` + `generateStaticParams`
- ⏳ **Blog index** (`/[locale]/blog`) — `getArticles()`
- ⏳ **Blog detail** (`/[locale]/blog/sample-post`) — convert to dynamic `[slug]` + `getArticleBySlug()` + `generateStaticParams`
- ⏳ **Contact** (`/[locale]/contact`) — `getSiteSetting("contact")` for phone/line/email

Reusable helpers ready: `web/components/service-icon.tsx`, `web/utils/format.ts` (`pickLocale`, `formatThaiDate`).

### B — Contact form server action (T4.7)
- React Hook Form + Zod schema
- Server action insert `leads` table (RLS allows anon INSERT)
- Honeypot + rate limit
- Success state UI

### C — SEO Phase 5
- T5.1 `generateMetadata` per route (title ≤60, desc ≤160, canonical, OG, hreflang th/en)
- T5.2 JSON-LD components (Organization, LocalBusiness, Service, Article, BreadcrumbList)
- T5.3 `web/app/sitemap.ts` (pulls from Supabase)
- T5.4 `web/app/robots.ts`
- T5.5 OG image generation (`opengraph-image.tsx` with LINE Seed)
- T5.6 Image audit (next/image alt Thai, sizes, priority)
- T5.7 Heading hierarchy audit (1× H1)
- T5.8 Internal linking pass

### D — Performance Phase 6
- T6.1 LCP audit (home + services + blog post) on throttled 4G
- T6.2 ISR strategy (revalidate=60 indices, =300 details)
- T6.3 Bundle analyzer pass (<120KB gz client on home)
- T6.4 Framer Motion scope check
- T6.5 Caching headers

### E — Phase 7 (admin minimum)
- T7.1 ADR — admin v1 vs Studio (RECOMMEND: Studio only pre-launch)
- T7.2 Supabase Auth magic-link (founder allowlist)
- T7.6 Lead inbox (`/admin/leads`, mark read, CSV export, optional Resend notification)
- ❌ T7.3–T7.5 (article/portfolio/service editors) — **deferred per user**

### F — Phase 8 testing
- T8.1 Playwright setup
- T8.2 Critical-path e2e (home → service → contact submit, blog list → post, portfolio filter, mobile menu, 404, form validation)
- T8.3 SEO smoke tests
- T8.4 Lighthouse CI (≥95 Perf/SEO/A11y)
- T8.5 axe a11y
- T8.6 Visual regression
- T8.7 Redirect verification (every row of `redirect-map.csv` → 301)

### G — Phase 9 launch
- T9.1 Vercel project setup
- T9.2 Staging deploy
- T9.3 G3 founder review on staging
- T9.4 DNS plan ADR
- T9.5 Production env vars
- T9.6 Cutover deploy
- T9.7 GSC + Bing submit + sitemap ping
- T9.8 72h monitoring window

---

## ➡️ Next step (recommend)

1. **Commit Task A.1 (home wired)** — `web/app/[locale]/page.tsx` + `web/components/service-icon.tsx` + `web/utils/format.ts` + `.claude/progress.md`. Suggested message: `feat(web): wire home page to Supabase via RSC queries (Task A.1)`.
2. **Continue Task A** in order of complexity (low → high):
   - About (mostly static + 1 query)
   - Services index (single query, simple map)
   - Contact (just site_settings)
   - Blog index → Blog detail (convert sample-post folder to `[slug]` dynamic route, add `generateStaticParams`)
   - Portfolio index → Portfolio detail (same dynamic-route conversion)
   - Services detail (decide: keep static `web-design` page or convert to dynamic `[slug]`)
3. After Task A complete → /clear → start **Task B** (contact form server action with Zod + RHF + honeypot + rate limit).

**Open questions for next session:**
- Convert `services/web-design`, `portfolio/sample-case`, `blog/sample-post` to dynamic `[slug]` routes now, or keep prototype-named routes during Task A and migrate later?
- Should home services strip be limited by sort_order (current behavior, shows social-media as 4th) or by an explicit `home_featured` boolean column?

---

## ⚙️ Environment notes
- Node 20 LTS, pnpm 10.33.3 (corepack)
- Next.js 16.2.4 has breaking changes from training data — read `node_modules/next/dist/docs/` before writing new patterns (warning per `web/AGENTS.md`)
- `middleware.ts` deprecated → use `proxy.ts`
- `web/.env.local` has SUPABASE_URL / PUBLISHABLE_KEY / SERVICE_ROLE_KEY (not committed)
- MCP Supabase server: hosted at `https://mcp.supabase.com/mcp`, OAuth 2.1, project_id `dhftyjnzqkyocfhtmjet`

## 🔗 Quick verify commands
```bash
# DB state
mcp supabase execute_sql project_id=dhftyjnzqkyocfhtmjet
  query="select (select count(*) from services) as s, (select count(*) from portfolio_items) as p"

# Local dev
cd web && pnpm dev   # localhost:3000 → /th

# Typecheck
cd web && pnpm exec tsc --noEmit

# Build
cd web && pnpm build
```
