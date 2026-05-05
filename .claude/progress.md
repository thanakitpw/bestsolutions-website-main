# Progress — Best Solutions Website Redesign

**Last updated:** 2026-05-05 20:51 GMT+7
**Current branch:** `thanakitpw/feat/seo-generate-metadata-all-routes` (commit `e235dc0`)
**Live Supabase project:** `dhftyjnzqkyocfhtmjet` (bestsolutions-website, ap-northeast-2)
**Recent commits this session:** 6a67e44 → 6bab4d8 → cc47527 → 5e80ed4 → e235dc0

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

### Task C — SEO Phase 5

#### T5.1 — generateMetadata per route ✅ DONE (commit 5d3fbc2)
- ✅ `web/utils/metadata.ts` — utility: `buildPageMetadata`, `buildAlternates`, `buildOg`
- ✅ 6 static pages: about, services, services/web-design, blog, portfolio, contact — async `generateMetadata` (locale-aware ผ่าน next-intl)
- ✅ 2 dynamic routes (blog/[slug], portfolio/[slug]) — canonical, hreflang th/en, OG image (`cover_image`)
- ✅ `th.json` + `en.json` — meta namespaces ต่อหน้า

#### T5.2 — JSON-LD structured data ✅ DONE (commit 5d48671)
- ✅ `web/components/json-ld.tsx` — 7 schema components
  - `OrganizationJsonLd` (sameAs FB/LINE, contactPoint E.164 phone)
  - `LocalBusinessJsonLd` (`ProfessionalService` + address Bangkok TH + hours)
  - `ServiceJsonLd` + `ServiceListJsonLd` (ItemList ของ services)
  - `ArticleJsonLd` (Article + author Person + mainEntityOfPage)
  - `PortfolioJsonLd` (CreativeWork + sourceOrganization client)
  - `BreadcrumbJsonLd` (locale-aware items helper)
- ✅ Wired ทุก 9 routes — curl-verified emit `application/ld+json` ครบ

#### T5.3 — sitemap.xml ✅ DONE (commit 666b985)
- ✅ `web/app/sitemap.ts` — 38 URLs (7 static × 2 locales + 3 articles × 2 + 9 portfolio × 2)
- ✅ hreflang alternates (th, en, x-default) per entry
- ✅ `lastModified` ดึงจาก `updated_at` สำหรับ dynamic content
- ✅ `getArticleSitemapEntries` + `getPortfolioSitemapEntries` ใช้ `staticDb()` (build-time safe)

#### T5.4 — robots.txt ✅ DONE (commit 666b985)
- ✅ `web/app/robots.ts` — allow `/`, disallow `/admin/` + `/api/`, sitemap + host declared

#### T5.5 — OG image generation ✅ DONE (commit 2ba4aeb)
- ✅ `web/app/[locale]/opengraph-image.tsx` — branded card 1200×630
- ✅ Direction C visual: warm cream `#F5F3EE` + orange radial blob + LINE Seed Bold/ExtraBold
- ✅ Locale-aware copy ผ่าน `getTranslations(Home)`
- ✅ LINE Seed woff2 → TTF (woff2_decompress, brew install woff2) เพราะ satori 16.2.4 reject wOF2
- ✅ TTFs ใน `public/fonts/og/` (~75KB ต่อไฟล์ × 3 weights)
- ✅ Auto-injects og:image + width/height/type/alt meta tags

### Smooth Scroll + Scroll Reveals ✅ DONE (commits 3847b98, 1ddd4c9)
- ✅ `web/components/lenis-provider.tsx` — Lenis ReactLenis wrapper, lerp 0.1 duration 1.2s
  - Disabled อัตโนมัติเมื่อ `prefers-reduced-motion: reduce`
  - `syncTouch: false` ป้องกัน mobile gesture แตก
- ✅ `web/components/reveal.tsx` — `Reveal` + `RevealStagger` + `RevealItem`
  - Motion `useInView` + `useReducedMotion` guard
  - cubic-bezier(0.16,1,0.3,1) ease-out, 0.6s duration, viewport amount 0.2
  - once-only เพื่อ performance (ไม่ retrigger ตอน scroll กลับ)
- ✅ Wired เข้า `[locale]/layout.tsx` (LenisProvider wraps Navbar + children + Footer)
- ✅ Reveals applied ทุก 9 routes — ~55 wrappers รวม
  - Pattern: section header (Reveal) → grid/content (Reveal delay 0.1s) → cascade เบาๆ
  - Filter bars + form input ไม่ wrap (preserve native a11y attributes)

#### T5.6 — Image audit ✅ DONE (commit 6a67e44)
- ✅ `web/components/media-image.tsx` — wrapper รองรับ 2 mode:
  - `src` มี → `<Image fill sizes priority style={{objectFit:cover}}>` (next/image optimizer → AVIF/WebP)
  - `src` null → `<div role="img" aria-label={alt}>` พร้อม gradient fallback
- ✅ `next.config.ts` — `images.remotePatterns`:
  - Supabase Storage host (จาก `NEXT_PUBLIC_SUPABASE_URL`) + wildcard `*.supabase.co`
  - `formats: ["image/avif", "image/webp"]`
- ✅ Refactor 11 inline divs ใน 6 routes:
  - home (featured portfolio[0] + blog teaser)
  - portfolio index (first 3 priority)
  - portfolio/[slug] (case-cover hero priority + related)
  - blog index (featured priority + grid)
  - blog/[slug] (post-cover hero priority + related)
  - services/web-design (related portfolio)
- ✅ Priority above-fold: case-cover, post-cover, blog featured, home portfolio[0], portfolio index[0..2]
- ✅ Sizes attr ตาม container 1280px + 3-col grid: `(min-width: 1280px) 400px, (min-width: 768px) 33vw, 100vw`
- ✅ Thai alt text จาก title จริงใน DB (`ภาพผลงาน {title}`, `ภาพประกอบบทความ {title}`)
- 🚫 ไม่แปลง: founder-photo + map-placeholder (ไม่มี src จริง), testi-avatar 60×60 (decorative + aria-hidden)
- ✅ Build clean, dev verified — DB ทุกแถว `cover_image: null` → render gradient ทั้งหมด (ตามแผน); upload จริงตอนหลังจะ optimize อัตโนมัติ

### Task B — Contact form server action ✅ DONE (commit eb94343)
- ✅ `actions.ts` — Zod v4 validate → honeypot check → IP-hash rate limit (3/hr) → admin client insert
- ✅ `contact-form.tsx` — `"use client"` RHF + zodResolver, inline field errors, loading state, success thank-you card
- ✅ `contact/page.tsx` — server component fetches contact settings, passes `lineHandle` prop to `ContactForm`

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

### Task C.1 commits (T5.1 generateMetadata — commit 5d3fbc2)
| File | การเปลี่ยนแปลง |
|---|---|
| `web/utils/metadata.ts` | NEW — `buildPageMetadata`, `buildAlternates`, `buildOg` helpers |
| `web/messages/{th,en}.json` | เพิ่ม About/Services/WebDesign/Blog/Portfolio/Contact meta namespaces |
| `web/app/[locale]/{about,services,services/web-design,contact,blog,portfolio}/page.tsx` | static metadata → async `generateMetadata` |
| `web/app/[locale]/blog/[slug]/page.tsx` | canonical, hreflang, OG type=article + cover_image |
| `web/app/[locale]/portfolio/[slug]/page.tsx` | canonical, hreflang, OG + cover_image |

### Task C.2 commits (T5.2 JSON-LD — commit 5d48671)
| File | การเปลี่ยนแปลง |
|---|---|
| `web/components/json-ld.tsx` | NEW — 7 schema components (Org, LocalBusiness, Service, ServiceList, Article, Portfolio CreativeWork, Breadcrumb) |
| `web/app/[locale]/page.tsx` | + Org + LocalBusiness + ContactInfo fetch |
| `web/app/[locale]/services/page.tsx` | + ServiceList + Breadcrumb |
| `web/app/[locale]/services/web-design/page.tsx` | + Service + Breadcrumb |
| `web/app/[locale]/blog/[slug]/page.tsx` | + Article + Breadcrumb |
| `web/app/[locale]/portfolio/[slug]/page.tsx` | + CreativeWork + Breadcrumb |
| `web/app/[locale]/{about,blog,portfolio,contact}/page.tsx` | + Breadcrumb |

### Task C.3+C.4 commits (T5.3 sitemap + T5.4 robots — commit 666b985)
| File | การเปลี่ยนแปลง |
|---|---|
| `web/app/sitemap.ts` | NEW — 38 URLs + hreflang th/en/x-default + lastModified |
| `web/app/robots.ts` | NEW — Allow / + Disallow /admin/ /api/ + sitemap ref |
| `web/utils/supabase/queries.ts` | + `getArticleSitemapEntries` + `getPortfolioSitemapEntries` |

### Task C.5 commits (T5.5 OG image — commit 2ba4aeb)
| File | การเปลี่ยนแปลง |
|---|---|
| `web/app/[locale]/opengraph-image.tsx` | NEW — branded 1200×630 PNG via `next/og` ImageResponse |
| `web/public/fonts/og/LINESeedSansTH-{Regular,Bold,ExtraBold}.ttf` | NEW — woff2_decompress conversion |

### Task C.6 commits (T5.6 Image audit — commit 6a67e44)
| File | การเปลี่ยนแปลง |
|---|---|
| `web/components/media-image.tsx` | NEW — `<MediaImage>` wrapper (next/image fill + gradient fallback + Thai alt) |
| `web/next.config.ts` | + `images.remotePatterns` (Supabase Storage + AVIF/WebP) |
| `web/app/[locale]/page.tsx` | featured portfolio + blog teaser → MediaImage |
| `web/app/[locale]/portfolio/page.tsx` | grid → MediaImage (priority i<3) |
| `web/app/[locale]/portfolio/[slug]/page.tsx` | case-cover hero + related → MediaImage |
| `web/app/[locale]/blog/page.tsx` | featured + grid → MediaImage |
| `web/app/[locale]/blog/[slug]/page.tsx` | post-cover hero + related → MediaImage |
| `web/app/[locale]/services/web-design/page.tsx` | related portfolio → MediaImage |

### Smooth Scroll commits (3847b98 home reveals; 1ddd4c9 8 more pages)
| File | การเปลี่ยนแปลง |
|---|---|
| `web/components/lenis-provider.tsx` | NEW — Lenis client provider + reduced-motion guard |
| `web/components/reveal.tsx` | NEW — Reveal + RevealStagger + RevealItem (Motion 12) |
| `web/app/[locale]/layout.tsx` | wrap children with `<LenisProvider>` |
| `web/app/globals.css` | `@import "lenis/dist/lenis.css"` |
| `web/app/[locale]/page.tsx` (home) | 12 reveals: services/portfolio/stats/testi/blog/dark CTA |
| `web/app/[locale]/about/page.tsx` | 8 reveals: founder/values/process/stats/dark CTA |
| `web/app/[locale]/services/page.tsx` | 5 reveals |
| `web/app/[locale]/services/web-design/page.tsx` | 12 reveals: features/ps/process/related/faq/dark CTA |
| `web/app/[locale]/portfolio/page.tsx` | 4 reveals |
| `web/app/[locale]/portfolio/[slug]/page.tsx` | 4 reveals: results/related/dark CTA |
| `web/app/[locale]/blog/page.tsx` | 4 reveals: featured/grid/dark CTA |
| `web/app/[locale]/blog/[slug]/page.tsx` | 4 reveals: related/dark CTA |
| `web/app/[locale]/contact/page.tsx` | 2 reveals: faq |

### Task C.7 commits (T5.7 heading hierarchy — commit 6bab4d8)
| File | การเปลี่ยนแปลง |
|---|---|
| `web/app/[locale]/blog/[slug]/page.tsx` | `<h4>สารบัญ</h4>` → `<h2>` (H1→H4 ผิด) |
| `web/app/[locale]/contact/page.tsx` | `<h4>เวลาทำการ/ที่ตั้ง</h4>` → `<h3>` (ข้าม H3) |

### Task C.8 commits (T5.8 internal linking — commit cc47527)
| File | การเปลี่ยนแปลง |
|---|---|
| `web/app/[locale]/about/page.tsx` | CTA เพิ่ม `/services` button |
| `web/app/[locale]/services/page.tsx` | CTA เพิ่ม `/blog` button |
| `web/app/[locale]/portfolio/[slug]/page.tsx` | CTA เพิ่ม `/services` button |

### Task D commits (Phase 6 performance — commits 5e80ed4, e235dc0)
| File | การเปลี่ยนแปลง |
|---|---|
| `web/app/[locale]/page.tsx` | + `export const revalidate = 60` |
| `web/app/[locale]/blog/page.tsx` | + `revalidate = 60` |
| `web/app/[locale]/portfolio/page.tsx` | + `revalidate = 60` |
| `web/app/[locale]/services/page.tsx` | + `revalidate = 60` |
| `web/app/[locale]/blog/[slug]/page.tsx` | + `revalidate = 300` |
| `web/app/[locale]/portfolio/[slug]/page.tsx` | + `revalidate = 300` |
| `web/app/[locale]/about/page.tsx` | + `revalidate = 3600` |
| `web/app/[locale]/services/web-design/page.tsx` | + `revalidate = 3600` |
| `web/app/[locale]/contact/page.tsx` | + `revalidate = 3600` |
| `web/next.config.ts` | + `@next/bundle-analyzer` (ANALYZE=true flag) |
| `web/vercel.json` | NEW — immutable cache headers: /fonts/* + /_next/static/* |

### Packages เพิ่ม (สะสม)
- `react-markdown` + `rehype-sanitize` — render `body_md_th` ใน blog/portfolio detail
- `react-hook-form` + `@hookform/resolvers` — contact form validation
- `lenis@1.3.x` — smooth/inertia scroll (~3KB gz)
- `motion@12.38` — Framer Motion successor for scroll reveals (~11KB gz)
- `@next/bundle-analyzer` (devDep) — bundle visualization (ANALYZE=true env flag)

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
- **JSON-LD via dangerouslySetInnerHTML:** escape `</script>` payload ด้วย `<` → `<` ก่อน inject; ทุก schema reference Org @id เพื่อ clean graph
- **Phone normalization:** Org/LocalBusiness contact phone แปลง `095-385-7029` → E.164 `+66953857029` อัตโนมัติใน json-ld helper
- **sitemap hreflang:** ทุก URL ใส่ `alternates.languages` ครบ th + en + x-default (default = th)
- **OG font conversion:** satori ใน `next/og` 16.2.4 reject wOF2 → ต้องแปลงเป็น TTF (`brew install woff2 && woff2_decompress`); เก็บ `.ttf` ใน `public/fonts/og/` แยกจาก `.woff2` runtime fonts
- **Smooth scroll = Lenis (free MIT) ไม่ใช่ GSAP ScrollSmoother:** lerp 0.1, duration 1.2s, syncTouch off; เลือก Lenis เพราะ free + 3KB + ใช้กับ Framer/Vercel/Linear
- **Motion (rebranded Framer):** v12.38 import จาก `motion/react`; ใช้ใน Reveal components (`useInView`, `useReducedMotion`, `motion[as]` dynamic component)
- **Reveal pattern:** wrap `section-header` แล้วเอา `Reveal` ครอบ grid container ด้วย `delay={0.1}` cascade เบาๆ; **ไม่ใส่ stagger ต่อ card** เพราะจะต้องเพิ่ม wrapper div ที่ทำลาย CSS grid layout — ทำเป็น single fade-up ทั้ง grid พอ
- **prefers-reduced-motion:** ทุก motion (Lenis + Reveal) เคารพ media query — disable smoothing + animation ถ้า user ตั้งใน OS
- **Reveal once-only:** `viewport.once = true` ไม่ retrigger ตอน scroll กลับขึ้น เพื่อ perf + UX (รำคาญถ้า fade ซ้ำ)
- **Model strategy (Opus vs Sonnet):** งาน execution ซ้ำ (replace pattern, write tests, deploy config) → Sonnet 4.6 พอ ถูก ~5×; Opus 4.7 เก็บไว้ตอน architecture decision / debug แปลก / brainstorm tradeoff / stuck
- **MediaImage two-mode pattern:** real `<Image fill>` เมื่อ `src` มี / `<div role="img">` gradient fallback เมื่อ null — ป้องกัน LCP regression ตอน DB ยังไม่มีรูป + ไม่ต้องแก้ component pages ตอน founder upload จริง
- **next/image: fill + sizes ไม่ใช่ width/height fixed:** เพราะ card-media มี CSS-driven aspect ratio (1:1, 4:3) — `fill` ปล่อยให้ wrapper div คุม dimensions, sizes attr ระบุ responsive breakpoints ตาม container 1280px max
- **Image priority strategy:** priority เฉพาะ above-fold ที่เป็น LCP candidate — case-cover/post-cover hero (detail pages), blog featured card, home portfolio[0], portfolio index[0..2]; ที่เหลือ lazy load โดย default
- **Supabase Storage remotePatterns:** อนุญาต host จาก env (project-specific) + wildcard `*.supabase.co` (preview branches); pathname จำกัด `/storage/v1/object/public/**` เพื่อไม่ accidentally proxy private buckets
- **ISR revalidate tiers:** indices (home/services/blog/portfolio) = 60s; details ([slug]) = 300s; static (about/web-design/contact) = 3600s
- **Bundle size baseline:** App Router + next-intl + motion stack → ~207KB gz First Load JS บน home; 120KB gz target ไม่ realistic ต้อง revise เป็น ~200KB; contact +69KB เพราะ RHF+Zod client bundle (expected)
- **Heading hierarchy audit result:** 7/9 routes สะอาดแล้ว — แก้ blog/[slug] h4→h2 (TOC label) + contact h4→h3 (เวลาทำการ/ที่ตั้ง); ทุกหน้ามี 1×H1 และ H2→H3 nesting ถูก
- **Internal linking triangle:** service ↔ portfolio ↔ blog ครบ — about/services/portfolio/[slug] CTA ทุกจุดมี link ออกไปทั้ง 3 ทิศทาง; blog/[slug] มี /services ใน CTA อยู่แล้ว

---

## 🚧 TODO ที่ยังเหลือ

### C — SEO Phase 5 ✅ COMPLETE (8/8 done)
- ✅ T5.1 `generateMetadata` per route (title ≤60, desc ≤160, canonical, OG, hreflang th/en)
- ✅ T5.2 JSON-LD (Organization, LocalBusiness, Service+List, Article, CreativeWork, Breadcrumb)
- ✅ T5.3 `web/app/sitemap.ts` (38 URLs, hreflang th/en/x-default, lastModified)
- ✅ T5.4 `web/app/robots.ts` (allow / + Disallow /admin/, /api/, sitemap ref)
- ✅ T5.5 OG image generation (`app/[locale]/opengraph-image.tsx`, LINE Seed TTF, 1200×630)
- ✅ T5.6 Image audit (`MediaImage` wrapper + next/image + Supabase remotePatterns + Thai alt + priority above-fold)
- ✅ T5.7 Heading hierarchy audit (commit 6bab4d8) — fixed blog/[slug] h4→h2 (TOC), contact h4→h3 (เวลาทำการ/ที่ตั้ง); all 9 routes 1×H1, correct H2→H3
- ✅ T5.8 Internal linking pass (commit cc47527) — about+CTA→/services, services→/blog, portfolio/[slug]→/services; triangle service↔portfolio↔blog ครบ

### D — Performance Phase 6 ← **IN PROGRESS** (4/5 done)
- T6.1 LCP audit home + services + blog (throttled 4G) — defer to staging (T9.2)
- ✅ T6.2 ISR strategy (commit 5e80ed4) — indices revalidate=60, details=300, static=3600; ครบ 9 routes
- ✅ T6.3 Bundle analyzer (commit e235dc0) — `@next/bundle-analyzer` wired (ANALYZE=true); home 207KB gz; revised target ~200KB (120KB unrealistic for App Router+next-intl+motion)
- ✅ T6.4 Framer Motion scope check — motion ใช้เฉพาะ `reveal.tsx` (`"use client"`); ไม่มี server bundle leak
- ✅ T6.5 Caching headers (commit e235dc0) — `vercel.json` → /fonts/* + /_next/static/* immutable 1 year

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

1. **Task E — Admin** T7.2 Supabase Auth magic-link (founder allowlist) + T7.6 lead inbox `/admin/leads`
2. **Task F — Playwright** critical path e2e ก่อน staging deploy (T8.1–T8.7)
3. **Task G — Vercel** deploy + DNS cutover (T9.1–T9.8)
4. **T6.1 LCP audit** — ทำพร้อม Lighthouse CI หลัง staging deploy (T9.2)

**Open questions:**
- Services detail dynamic `[slug]` route ตอนไหน? (recommend: หลัง launch เมื่อมีเนื้อหาจริงใน DB)
- Lead notification: Resend email alert ตอน lead เข้าใหม่ — Task E หรือ B extension?
- Smooth scroll ระวัง: ลูกค้ามือถือบางคน iOS Safari momentum ปกติอาจฟีลแย่กว่า Lenis ไหม? — test ก่อน launch

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
