# SEO-LOG — งานที่ทำไปแล้ว (handoff)

อัปเดต: 2026-08-30 · branch หลัก `main` (push แล้วทุก commit)

## สรุปสถานะ Sprint
> 📌 **แผนหลักอยู่ที่ `08-seo-master-plan.md`** — อ่านตัวนั้นก่อนถ้าจะเดินงานต่อ ไฟล์นี้เป็น log ย้อนหลัง

| Sprint | สถานะ |
|---|---|
| S0 docs/seo + skills | ✅ |
| S1 Phase A technical | ✅ deployed |
| S2 on-page keyword | ✅ deployed |
| S3 content | ⏸️ แผนเสร็จ ผู้ใช้สั่งหยุดก่อนเขียน |
| S4 off-page/GEO | ⬜ ยังไม่เริ่ม (แต่ llms.txt + RSS ทำแล้วใน S5) |
| S5 audit รอบละเอียด (ส.ค.) | ✅ P0+P1+P2 ปิดครบ + deploy แล้ว — ดู `07-audit-2026-08-29.md` |
| S6 master plan | ✅ เขียนแผนเต็ม `08-seo-master-plan.md` — รอ Phase 0 ปลดบล็อก |

## S0 — setup
- สร้าง `docs/seo/` (00-strategy, 01-keyword-map, 02-baseline, 03-technical-audit, 04-onpage-checklist, 05-content-calendar, 06-content-pipeline-architecture, ไฟล์นี้)
- ติดตั้ง marketingskills: seo-audit, ai-seo, schema-markup → `.agents/skills/`
- ตัดสิน: ข้าม bsc-seo-* (ไม่มี client-brief.md), เดินแผน manual
- bsc-content-pipeline skills มีในเครื่อง (ยังไม่ใช้ — S3 วางมือ)

## S1 — Phase A technical (commit e5ff2da, merge 04c3dbe)
- `json-ld.tsx`: + WebSiteJsonLd (SearchAction) + FaqJsonLd
- mount: WebSite@home, LocalBusiness+FAQ@contact, FAQ@services list+detail
- `metadata.ts`: buildOg article publishedTime/modifiedTime/authors + **brand default OG fallback** (opengraph-image ครอบแค่ /[locale] root) + twitter.images เสมอ
- blog/portfolio meta: og_image → cover_image fallback
- `sitemap.ts`: service slug ดึงจาก DB จริง (getServiceSitemapEntries), ลบ hardcode web-design
- `app/manifest.ts` + `icon.png`/`apple-icon.png` (จาก favicon.png 2000²)
- side-fix: `lenis-provider.tsx` → useSyncExternalStore (ผ่าน lint gate)
- A11 (media-image alt) required อยู่แล้ว; A2 (opengraph-image) มี pre-existing
- verify: tsc 0 / lint 0 error / build ผ่าน / JSON-LD render ครบ

## S2 — on-page (commit cee2325, 6c7e852)
- `messages/th.json`: metaTitle/desc ทุกหน้า KW-front, ≤60 หลัง template, ตัดแบรนด์ซ้ำ
- `services/[slug]/page.tsx`: title ไม่ผูกแบรนด์เอง (root template เติมครั้งเดียว)
- **DB**: UPDATE `services` 6 rows ใส่ seo_title/seo_description (KW-front: รับทำ SEO/รับยิงแอด/รับดูแลเพจ/รับถ่ายวิดีโอ ฯลฯ) ผ่าน Supabase MCP
- verify (build): ทุกหน้า title≤60, 1×H1, desc≤160, แบรนด์เดียว

## S3 — content (commit 266ab76, 60e3edb) — หยุด
- แผน+calendar เสร็จ (`05-content-calendar.md`): pillar-cluster, cadence Ramp 1–2/วัน (ยืนยัน), backlog web-design+paid-ads, repurpose FB, quality gate
- architecture spec (`06-content-pipeline-architecture.md`): แยก content-project + Supabase ตรง / ingest API+gate
- **ผู้ใช้สั่งหยุด ยังไม่เขียนบทความ**

## S5 — audit รอบละเอียด (2026-08-29)

รายละเอียดเต็มอยู่ใน **`07-audit-2026-08-29.md`** (ทั้ง finding และผลการแก้). สรุปหัวข้อใหญ่:

- 🔴 **เจอว่า ISR ตายทั้งเว็บ** — `queries.ts` เรียก `cookies()` ทุก query → ทุก route เป็น dynamic, `revalidate` ที่ใส่ไว้ 12 หน้าไม่มีผลเลย, live header เป็น `no-store` + TTFB 0.6–1.1s. แก้ด้วย anon client ไม่มี cookie (`utils/supabase/anon.ts`) + proxy เลิก `updateSession` บน public route → build เปลี่ยนเป็น SSG/ISR ทุกหน้า
- 🔴 **H1 ซ้ำ 16/16 บทความ** (`body_md` ขึ้นต้นด้วย `# `) → `utils/markdown.ts`
- 🔴 **GA4 ยิงผิด property** — GTM ยิง `G-R6RHSMLMF9` แต่ property ที่เปิดดูคือ `G-611ZJPLYR4` (เจ้าของเลือกย้ายไป 611)
- P1: `?q=` search จริงบนหน้า blog (SearchAction ไม่เท็จอีก) · FaqJsonLd web-design · portfolio seo meta 8 rows · related posts ตามหัวข้อ · footer dead links → `/privacy` `/terms` `/sitemap.xml` (สร้าง 2 หน้าใหม่) · sitemap lastmod จริง · contrast + heading-order · blog category hub 4 หมวด · `LocalBusiness.image` ที่ 404
- P2: RSS `/rss.xml` · `llms.txt` · image sitemap (16→40 URL) · Article wordCount/articleSection/keywords · Organization logo ImageObject · **external reference 2–3 ลิงก์/บท ครบ 16 บท** (เช็ค 200 ทุก URL) · เติม taxonomy ที่ null/ผิด 7 บท

## Infra / tools (เครื่อง local)
| ของ | path / สถานะ |
|---|---|
| GSC API client | `scripts/gsc.mjs` (OAuth refresh; fallback SA JWT) |
| GSC OAuth flow | `scripts/gsc-oauth.mjs` |
| GSC token | `~/.config/bsc/gsc-token.json` (chmod600, gitignored) |
| GSC SA key (สำรอง) | `~/.config/bsc/gsc-sa.json` |
| GSC OAuth client | `~/.config/bsc/gsc-oauth-client.json` |
| PSI client | `scripts/psi.mjs` ; key `~/.config/bsc/psi-key.txt` |
| GSC property | `sc-domain:bestsolutionscorp.com` (Domain, verified, siteOwner) |
| Supabase project | `dhftyjnzqkyocfhtmjet` (bestsolutions-website) |
- secrets gitignored: `*-sa.json *service-account*.json bestsolutions-seo-*.json gsc-sa.json *psi-key* client_secret*`
- ~~baseline organic = 0~~ **ผิด** — ดึง GSC จริง 30 ส.ค. พบ 2,868 impressions / 14 clicks ตั้งแต่ 15 พ.ค. ดู `02-baseline.md`
- CWV baseline (desktop): Perf 98–100, SEO 100, A11y 95–96, CLS 0. mobile blog LCP 2.7s (เฝ้าดู)

## Live findings
- 🔴→✅ `NEXT_PUBLIC_SITE_URL` เคยชี้ vercel preview → แก้เป็น `https://www.bestsolutionscorp.com` (Production) แล้ว; canonical/sitemap/og/robots ถูกต้อง verified
- ⚠️ non-www → www = **307** ควรเปลี่ยนเป็น 308/301 ถาวร (Vercel Domains) — ยังไม่ทำ
- ⚠️ en hreflang ชี้ /en (routing มีแค่ th) — **ผู้ใช้สั่งคงไว้** = known accepted risk
- sitemap live = 16 URLs (6 service + blog + portfolio), โดเมนถูก

## ค้างรอผู้ใช้ (อัปเดต 2026-08-29)

- [ ] **GTM**: เปลี่ยน Measurement ID ของ GA4 tag → `G-611ZJPLYR4` แล้ว Publish (เจ้าของเลือกย้าย property)
- [ ] **GA4 Admin**: link GA4 ↔ Search Console หลังเปลี่ยน ID เสร็จ
- [ ] **Vercel Domains**: non-www → www เปลี่ยน 307 → 308
- [x] ~~GSC OAuth หมดอายุ~~ ✅ แก้แล้ว 30 ส.ค. — เพิ่ม service account `gsc-reader@bestsolutions-seo.iam.gserviceaccount.com` เป็น siteFullUser แทน (ไม่หมดอายุ) เลิกใช้ OAuth flow
- [ ] Supabase: เติม `portfolio_items.year` (ว่าง 6/7) + `live_url` (มี 1/7)
- [ ] วัด PSI ใหม่หลัง deploy เพื่อยืนยันว่า LCP ลง (baseline ก่อนแก้: home 4.2s / blog 7.5s, Perf 76 / 69)

## ค้างรอผู้ใช้ (ของเดิม พ.ค.)
- [ ] submit `sitemap.xml` ใน GSC UI (โดเมนตรงแล้ว ทำได้)
- [ ] non-www redirect → permanent 308
- [ ] S3: ตัดสิน รูป (default/HTML-shot/AI) + author (Admin/Thanakit/ทีม) + A vs B ingest → แล้วเริ่มเขียน
- [ ] (เลื่อนตามเฟส) DataForSEO key (keyword volume), GA4 (หลัง tag+traffic), AI-citation (S4)

## วิธี resume
- ดู `00-strategy.md` (แผนรวม) → sprint ถัดไป S3 (รอ decision) หรือ S4
- keyword/seo_title อ้างอิง `01-keyword-map.md` (LOCKED qualitative)
- content-project ใหม่: ทำตาม `06-content-pipeline-architecture.md` (data contract `articles` + gate)
- baseline เทียบผล: `02-baseline.md` (= 0, pull รายเดือนด้วย `scripts/gsc.mjs`)
