# 03 — Technical Audit + Phase A status

## Audit findings (skill `seo-audit`)
_(เติมหลังรัน seo-audit ที่ S1)_

## Phase A tracker

| # | งาน | ไฟล์ | สถานะ |
|---|---|---|---|
| A1 | buildOg article fields + twitter.images passthrough | `web/utils/metadata.ts` | ✅ |
| A2 | OG default image — มีอยู่แล้ว (dynamic ImageResponse, Thai font, localized) | `web/app/[locale]/opengraph-image.tsx` | ✅ (pre-existing) |
| A3 | Web App Manifest + icon/apple-icon (จาก favicon.png 2000²) | `web/app/manifest.ts`, `app/icon.png`, `app/apple-icon.png` | ✅ |
| A4 | FaqJsonLd + WebSiteJsonLd (SearchAction) | `web/components/json-ld.tsx` | ✅ |
| A5 | mount WebSiteJsonLd หน้า Home (Org/LocalBusiness มีอยู่แล้ว) | `web/app/[locale]/page.tsx` | ✅ |
| A6 | mount LocalBusiness + FaqJsonLd หน้า Contact | `web/app/[locale]/contact/page.tsx` | ✅ |
| A7 | FaqJsonLd: services list (DEFAULT_FAQS) + service detail (FAQS_BY_SLUG) | `services/page.tsx`, `services/[slug]/page.tsx`, `components/services-faq.tsx` | ✅ |
| A8 | article publishedTime/modifiedTime/authors ใน OG | `blog/[slug]/page.tsx` | ✅ |
| A9 | og_image → cover_image fallback (blog+portfolio) + twitter images | blog/portfolio detail | ✅ |
| A10 | sitemap ดึง service slug จริงจาก DB (getServiceSitemapEntries) | `web/app/sitemap.ts`, `utils/supabase/queries.ts` | ✅ |
| A11 | media-image `alt` required อยู่แล้ว (type `alt: string`) | `web/components/media-image.tsx` | ✅ (already) |
| A12 | รัน skill seo-audit → ปิด findings P0/P1 | — | ⏳ next |

### Side fix (pre-existing, นอก SEO scope แต่ block lint gate)
`web/components/lenis-provider.tsx` — error `react-hooks/set-state-in-effect` (มีอยู่ก่อนแล้ว, ไม่ใช่จาก SEO). แก้เป็น `useSyncExternalStore` เพื่อให้ `pnpm lint` ผ่าน (DoD #1).

### A9b — OG gap fixed (พบตอน verify)
`opengraph-image.tsx` ครอบแค่ `/[locale]` root — nested routes (services/blog/portfolio/about/contact) **ไม่ได้ og:image เลย**. แก้: `buildOg`/`buildPageMetadata` fallback `image ?? ${SITE_URL}/${locale}/opengraph-image` (brand default) + twitter.images เสมอ. Verify แล้วทุก nested page มี og:image + twitter:image. ✅

### 🔴 Config finding — NEXT_PUBLIC_SITE_URL (ต้องแจ้ง/แก้ก่อน production)
`web/.env.local` `NEXT_PUBLIC_SITE_URL="https://bestsolutions-website-main.vercel.app"` → canonical, OG url, JSON-LD @id, sitemap **ชี้ vercel preview domain** ไม่ใช่ `https://www.bestsolutionscorp.com`. ถ้า deploy production ด้วยค่านี้ = canonical ผิด domain (SEO เสียหนัก). **ไม่ใช่ code bug** — ต้องตั้ง env production = โดเมนจริงตอน deploy. ค้างรอผู้ใช้ยืนยันโดเมน final.

### Verify S1
`tsc --noEmit` ✅ 0 error · `pnpm lint` ✅ 0 error (เหลือ 3 warning เดิม) · `pnpm build` ✅ — routes: `/manifest.webmanifest`, `/icon.png`, `/apple-icon.png`, `/sitemap.xml`, `/-/opengraph-image` ครบ

## Decision log — en hreflang
ผู้ใช้ยืนยัน **คง en hreflang ไว้** (อย่าแตะ) — ยอมรับเป็น known risk, ไม่แก้ใน S1.

## ⚠️ Known risk — en hreflang (ผู้ใช้สั่ง "อย่าแตะ")

`web/utils/metadata.ts:11-12`, `web/app/[locale]/layout.tsx:42-45,49` ออก hreflang/og `en → /en` แต่ `routing.ts` locales=`["th"]` → `/en` = notFound. Google เห็น hreflang ชี้หน้าเสีย = ลบล้างผล canonical.
ทางเลือกขั้นต่ำ: ลบ key `en:` 2 จุดใน `buildAlternates` + 2 จุดใน layout (ไม่ยุ่ง routing).
**ต้องถามผู้ใช้ยืนยันก่อนเริ่ม S1.**
