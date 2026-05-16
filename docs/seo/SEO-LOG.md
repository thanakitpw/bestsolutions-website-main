# SEO-LOG — งานที่ทำไปแล้ว (handoff)

อัปเดต: 2026-05-16 · branch หลัก `main` (push แล้วทุก commit)

## สรุปสถานะ Sprint
| Sprint | สถานะ |
|---|---|
| S0 docs/seo + skills | ✅ |
| S1 Phase A technical | ✅ deployed |
| S2 on-page keyword | ✅ deployed |
| S3 content | ⏸️ แผนเสร็จ ผู้ใช้สั่งหยุดก่อนเขียน |
| S4 off-page/GEO | ⬜ ยังไม่เริ่ม |

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
- baseline organic = **0** (property สร้างใหม่ ไม่ backfill, history เก่าหายถาวร) → เริ่มนับศูนย์
- CWV baseline (desktop): Perf 98–100, SEO 100, A11y 95–96, CLS 0. mobile blog LCP 2.7s (เฝ้าดู)

## Live findings
- 🔴→✅ `NEXT_PUBLIC_SITE_URL` เคยชี้ vercel preview → แก้เป็น `https://www.bestsolutionscorp.com` (Production) แล้ว; canonical/sitemap/og/robots ถูกต้อง verified
- ⚠️ non-www → www = **307** ควรเปลี่ยนเป็น 308/301 ถาวร (Vercel Domains) — ยังไม่ทำ
- ⚠️ en hreflang ชี้ /en (routing มีแค่ th) — **ผู้ใช้สั่งคงไว้** = known accepted risk
- sitemap live = 16 URLs (6 service + blog + portfolio), โดเมนถูก

## ค้างรอผู้ใช้
- [ ] submit `sitemap.xml` ใน GSC UI (โดเมนตรงแล้ว ทำได้)
- [ ] non-www redirect → permanent 308
- [ ] S3: ตัดสิน รูป (default/HTML-shot/AI) + author (Admin/Thanakit/ทีม) + A vs B ingest → แล้วเริ่มเขียน
- [ ] (เลื่อนตามเฟส) DataForSEO key (keyword volume), GA4 (หลัง tag+traffic), AI-citation (S4)

## วิธี resume
- ดู `00-strategy.md` (แผนรวม) → sprint ถัดไป S3 (รอ decision) หรือ S4
- keyword/seo_title อ้างอิง `01-keyword-map.md` (LOCKED qualitative)
- content-project ใหม่: ทำตาม `06-content-pipeline-architecture.md` (data contract `articles` + gate)
- baseline เทียบผล: `02-baseline.md` (= 0, pull รายเดือนด้วย `scripts/gsc.mjs`)
