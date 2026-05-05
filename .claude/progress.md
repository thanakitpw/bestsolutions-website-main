# Progress — Best Solutions Website Redesign

**Last updated:** 2026-05-05 17:25 GMT+7
**Current branch:** `thanakitpw/feat/seo-generate-metadata-all-routes`
**Live Supabase project:** `dhftyjnzqkyocfhtmjet` (bestsolutions-website, ap-northeast-2)

---

## ✅ ที่เสร็จไปแล้ว

### Phase 0–1 (prototype + decisions)
- T0.1–T0.9 — Pre-flight (CLAUDE.md, ignores, redirect map, ADRs, stack pinning)
- T1.1–T1.22 — เฟส 1 prototype 9 หน้า, Direction C "Aigocy-true" approved (ADR `0006-phase1-approval.md`), G2 ผ่าน
- 38 screenshots ใน `docs/phase1-review/` + cross-browser smoke (chrome/safari/firefox)

### Phase 2 — Next.js bootstrap
- T2.1–T2.9 — Next.js 16.2.4 + React 19 + Tailwind v4 + TS strict + next-intl + LINE Seed font
- 9 routes ported จาก HTML prototype 1:1
- Container width = `1280px`, middleware chain: `proxy.ts` = Supabase session refresh → next-intl routing

### Phase 3 — Supabase (applied via MCP)
- ✅ Migrations 0001–0003: 6 tables + RLS + 4 storage buckets
- ✅ Seed: services=7, portfolio=9, testimonials=3, articles=3, settings=4
- ✅ Generated types + @supabase/ssr clients (client/server/admin/middleware/queries)

### Task A — Wire Supabase data into ALL pages ✅ DONE (commit 852e6d1)
- ✅ **Home** — hero, stats, services strip, portfolio, testimonials, blog teaser
- ✅ **About** — stats band (projects/years/roas) + founder sig ← `site_settings`
- ✅ **Services index** — 7-card dynamic grid ← `getServices()` + `pickLocale` + `ServiceIcon`
- ✅ **Contact** — phone/LINE/email/facebook/hours ← `getSiteSetting("contact")`
- ✅ **Blog index** — featured + grid ← `getArticles()` + `formatThaiDate`
- ✅ **Blog `[slug]`** — dynamic route replacing `sample-post/`, `generateStaticParams`, markdown body via `react-markdown` + `rehype-sanitize`
- ✅ **Portfolio index** — 9-card grid + stats band ← `getPortfolioItems()` + stats setting
- ✅ **Portfolio `[slug]`** — dynamic route replacing `sample-case/`, results band, `body_md`, tech_stack
- ✅ **Services/web-design** — hero name/summary + related portfolio ← `getServiceBySlug()`

### Task C — SEO Phase 5 (in progress)

#### T5.2 — JSON-LD structured data ✅ DONE
- ✅ `web/components/json-ld.tsx` — `JsonLd` base + 7 schema components
  - `OrganizationJsonLd` (with `sameAs` Facebook/LINE, `contactPoint` w/ E.164 phone)
  - `LocalBusinessJsonLd` (`ProfessionalService` + address Bangkok TH + opening hours)
  - `ServiceJsonLd` (single Service ref'd to Org `@id`)
  - `ServiceListJsonLd` (ItemList of all services)
  - `ArticleJsonLd` (headline, image, datePublished, author Person, mainEntityOfPage)
  - `PortfolioJsonLd` (CreativeWork + sourceOrganization client + dateCreated)
  - `BreadcrumbJsonLd` (helper accepts items + locale)
- ✅ Wired on home (Org + LocalBusiness)
- ✅ Wired on services index (ServiceList + Breadcrumb), web-design detail (Service + Breadcrumb)
- ✅ Wired on blog/[slug] (Article + Breadcrumb), blog index (Breadcrumb)
- ✅ Wired on portfolio/[slug] (CreativeWork + Breadcrumb), portfolio index (Breadcrumb)
- ✅ Wired on about + contact (Breadcrumb)
- ✅ Build clean, dev curl-verified all 9 routes emit valid `application/ld+json`

#### T5.1 — generateMetadata per route ✅ DONE (commit 5d3fbc2)
- ✅ `web/utils/metadata.ts` — utility ใหม่: `buildPageMetadata`, `buildAlternates`, `buildOg`
- ✅ 6 static pages — แทน `export const metadata` เก่าด้วย async `generateMetadata` (locale-aware ผ่าน next-intl)
  - about, services, services/web-design, blog, portfolio, contact
- ✅ 2 dynamic routes — เพิ่ม canonical, hreflang th/en, OG image (ใช้ `cover_image` จาก DB)
  - blog/[slug], portfolio/[slug]
- ✅ th.json + en.json — เพิ่ม meta keys: About, Services, WebDesign, Blog, Portfolio, Contact namespaces
- ✅ Build clean (11 files, 233 insertions)

### Task B — Contact form server action ✅ DONE (commit eb94343)
- ✅ `actions.ts` — Zod v4 validate → honeypot check → IP-hash rate limit (3/hr) → admin client insert
- ✅ `contact-form.tsx` — `"use client"` RHF + zodResolver, inline field errors, loading state, success thank-you card
- ✅ `contact/page.tsx` — server component fetches contact settings, passes `lineHandle` prop to `ContactForm`
- ✅ Build clean, HTTP 200 confirmed on `/th/contact`

---

## 📁 Files ที่แก้ในเซสชันนี้

### Task A commits
| File | การเปลี่ยนแปลง |
|---|---|
| `web/app/[locale]/about/page.tsx` | เพิ่ม `getSiteSetting` + wire stats/founder |
| `web/app/[locale]/services/page.tsx` | 7-card hardcoded → dynamic map จาก `getServices()` |
| `web/app/[locale]/contact/page.tsx` | wire contact channels จาก `site_settings` |
| `web/app/[locale]/blog/page.tsx` | featured + grid จาก `getArticles()` |
| `web/app/[locale]/blog/[slug]/page.tsx` | NEW — dynamic route แทน `sample-post/` |
| `web/app/[locale]/blog/sample-post/` | DELETED |
| `web/app/[locale]/portfolio/page.tsx` | 9-card grid + stats จาก DB |
| `web/app/[locale]/portfolio/[slug]/page.tsx` | NEW — dynamic route แทน `sample-case/` |
| `web/app/[locale]/portfolio/sample-case/` | DELETED |
| `web/app/[locale]/services/web-design/page.tsx` | hero + related portfolio จาก DB |
| `web/utils/supabase/queries.ts` | เพิ่ม `staticDb()`, `getArticleSlugs()`, `getPortfolioSlugs()` |

### Task B commits
| File | การเปลี่ยนแปลง |
|---|---|
| `web/app/[locale]/contact/actions.ts` | NEW — server action (Zod + honeypot + rate limit + insert) |
| `web/components/contact-form.tsx` | NEW — client component (RHF + zodResolver + success state) |
| `web/app/[locale]/contact/page.tsx` | แทน `<form>` hardcoded ด้วย `<ContactForm>` |

### Task C.1 commits (T5.1)
| File | การเปลี่ยนแปลง |
|---|---|
| `web/utils/metadata.ts` | NEW — `buildPageMetadata`, `buildAlternates`, `buildOg` helpers |
| `web/messages/th.json` | เพิ่ม About/Services/WebDesign/Blog/Portfolio/Contact meta namespaces |
| `web/messages/en.json` | เพิ่ม About/Services/WebDesign/Blog/Portfolio/Contact meta namespaces |
| `web/app/[locale]/about/page.tsx` | ลบ static metadata → async `generateMetadata` |
| `web/app/[locale]/services/page.tsx` | ลบ static metadata → async `generateMetadata` |
| `web/app/[locale]/services/web-design/page.tsx` | ลบ static metadata → async `generateMetadata` |
| `web/app/[locale]/contact/page.tsx` | ลบ static metadata → async `generateMetadata` |
| `web/app/[locale]/blog/page.tsx` | ลบ static metadata → async `generateMetadata` |
| `web/app/[locale]/portfolio/page.tsx` | ลบ static metadata → async `generateMetadata` |
| `web/app/[locale]/blog/[slug]/page.tsx` | เพิ่ม canonical, hreflang, OG (type=article, cover_image) |
| `web/app/[locale]/portfolio/[slug]/page.tsx` | เพิ่ม canonical, hreflang, OG (cover_image) |

### Packages เพิ่ม
- `react-markdown` + `rehype-sanitize` — render `body_md_th` ใน blog/portfolio detail
- `react-hook-form` + `@hookform/resolvers` — contact form validation

---

## 🎯 Decisions สำคัญ (locked)

*(decisions เดิมทั้งหมด ยังคงใช้อยู่)*

- **Visual direction:** Direction C "Aigocy-true" (`#F5F3EE`, soft shadows, rounded-3xl, ONE dark section)
- **Typography:** LINE Seed Sans Thai (self-hosted woff2 400/700/800/900)
- **Colors:** Orange `#FF5A1F` + Blue `#1E40AF` + warm neutrals
- **i18n:** column-per-locale + `pickLocale(locale, th, en)` helper (falls back to `_th`)
- **Date format:** CE year (`5 พ.ค. 2026`), not BE
- **Data fetching:** RSC server component → `queries.ts` helpers → `Promise.all`; no client fetch for reads
- **Image fallbacks:** gradient palette by index when `cover_image` is null
- **`generateStaticParams`:** ใช้ `staticDb()` (browser client, cookie-free) แทน `db()` — แก้ build error ที่ cookies() ไม่ available ตอน build time
- **Contact form architecture:** server component fetches settings → passes as props to client form component
- **Rate limiting:** IP-hash (SHA-256 + salt, 20 chars) stored in leads table, max 3/hr per IP, ไม่เก็บ raw IP
- **Zod → DB coercion:** `undefined` → `null` explicit ก่อน insert เพราะ `exactOptionalPropertyTypes: true`
- **Service detail routes:** only `web-design` static page; อื่น ๆ ยัง link ไป `/services` index (deferred)
- **Admin:** Supabase Studio ก่อน launch; lead inbox (`/admin/leads`) เป็น v1 เดียว
- **Metadata architecture:** layout sets `metadataBase` + `title.template` ("%s · Best Solutions") + home defaults; static pages use `getTranslations` → `buildPageMetadata`; dynamic routes use `{ absolute: fullTitle }` เพื่อป้องกัน template ซ้ำซ้อน
- **exactOptionalPropertyTypes:** optional spread ผ่าน `...(val !== undefined ? { key: val } : {})` — ห้ามส่ง `undefined` ตรงๆ
- **i18n meta copy:** meta titles/descriptions อยู่ใน `messages/[locale].json` แยก namespace ต่อหน้า ไม่ hardcode ใน component

---

## 🚧 TODO ที่ยังเหลือ

### C — SEO Phase 5 ← **IN PROGRESS**
- ✅ T5.1 `generateMetadata` per route (title ≤60, desc ≤160, canonical, OG, hreflang th/en)
- ✅ T5.2 JSON-LD components (Organization, LocalBusiness, Service, Article, CreativeWork, Breadcrumb)
- **← NEXT** T5.3 `web/app/sitemap.ts` (pulls article + portfolio slugs from Supabase)
- T5.4 `web/app/robots.ts`
- T5.5 OG image generation (`opengraph-image.tsx` with LINE Seed font)
- T5.6 Image audit — `next/image`, alt text ภาษาไทย, `priority` on above-fold
- T5.7 Heading hierarchy audit (1× H1 per page, correct h2/h3 nesting)
- T5.8 Internal linking pass (service ↔ portfolio ↔ blog)

### D — Performance Phase 6
- T6.1 LCP audit home + services + blog (throttled 4G)
- T6.2 ISR strategy (`revalidate=60` indices, `=300` details)
- T6.3 Bundle analyzer (<120KB gz client bundle on home)
- T6.4 Framer Motion scope check
- T6.5 Caching headers

### E — Phase 7 (admin minimum)
- T7.2 Supabase Auth magic-link (founder allowlist)
- T7.6 Lead inbox `/admin/leads` (mark read, CSV export, optional Resend notification)
- ❌ T7.3–T7.5 (article/portfolio/service editors) — deferred post-launch

### F — Phase 8 testing
- T8.1 Playwright setup
- T8.2 Critical-path e2e (home → service → contact submit, blog list → post, portfolio filter, mobile menu, 404, form validation)
- T8.3 SEO smoke tests
- T8.4 Lighthouse CI (≥95 Perf/SEO/A11y)
- T8.5 axe a11y
- T8.6 Visual regression
- T8.7 Redirect verification (`redirect-map.csv` → 301)

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

## ➡️ Next steps (recommend)

1. **Task C — SEO (ต่อ)** ✅ T5.1 done — ทำต่อที่:
   - **T5.2** JSON-LD: `OrganizationJsonLd` + `LocalBusinessJsonLd` บน home, `ServiceJsonLd` บน service pages, `ArticleJsonLd` บน blog/[slug], `BreadcrumbJsonLd` ทุกหน้า
   - T5.3 sitemap.ts (Supabase slugs)
   - T5.4 robots.ts
   - T5.5 OG image generation
   - JSON-LD: Organization + LocalBusiness บน home, Service บน service pages, Article บน blog
2. **Task D — ISR** เพิ่ม `revalidate` ใน page route config หลัง SEO เสร็จ
3. **Task F — Playwright** setup + critical path e2e ก่อน staging deploy
4. **Task G — Vercel** deploy + DNS cutover

**Open questions:**
- Services detail: ยังเป็น static `web-design` เดียว — ควรทำ dynamic `[slug]` route ตอนไหน? (recommend: หลัง launch เมื่อมีเนื้อหาจริงใน DB)
- OG image: ใช้ `@vercel/og` (edge runtime) หรือ `satori` โดยตรง?
- Lead notification: เพิ่ม Resend email alert ตอน lead ใหม่เข้า — ทำใน Task E หรือ Task B extension?

---

## ⚙️ Environment notes
- Node 20 LTS, pnpm 10.33.3 (corepack)
- Next.js 16.2.4 — `middleware.ts` deprecated → ใช้ `proxy.ts`
- Zod v4 (`^4.4.3`) — API เหมือน v3 เกือบทั้งหมด แต่ต้องระวัง error map syntax ต่างกัน
- `web/.env.local` — SUPABASE_URL / PUBLISHABLE_KEY / SERVICE_ROLE_KEY / IP_HASH_SALT (ไม่ commit)
- MCP Supabase: `https://mcp.supabase.com/mcp`, OAuth 2.1, project_id `dhftyjnzqkyocfhtmjet`

## 🔗 Quick verify commands
```bash
# Local dev
cd web && pnpm dev   # localhost:3000 → /th

# Typecheck
cd web && pnpm exec tsc --noEmit

# Build
cd web && pnpm build

# DB state
# (via MCP) execute_sql: select count(*) from leads;
```
