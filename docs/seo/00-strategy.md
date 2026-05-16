# แผน SEO ฉบับเต็ม — Best Solutions Website Redesign

## Context

เว็บ redesign (Next.js 15 / `web/`) มี SEO foundation แข็งแล้ว (~80-90%): `buildPageMetadata` helper, JSON-LD 7 ชนิด, dynamic sitemap, robots, self-hosted Thai font, next/image. โจทย์โปรเจค = **SEO + visual ชนะเว็บปัจจุบัน** สำหรับ Digital Marketing Agency กรุงเทพฯ ที่ต้องติดอันดับคำค้นไทยเชิงธุรกิจ ("รับทำเว็บไซต์", "รับยิงแอด", "รับทำ SEO"). แผนนี้ครอบคลุม **technical + keyword + content + off-page/local (GEO)** ระดับ execute พร้อม competitor analysis, timeline, และ KPI.

ผู้ใช้เลือก: Full program + off-page/GEO · ติดตั้ง marketingskills เพิ่ม · ภาษาอังกฤษไว้ก่อน อย่าแตะ routing · ลงรายละเอียดระดับ execute.

> Next.js เวอร์ชันนี้มี breaking changes — อ่าน `web/node_modules/next/dist/docs/` ที่เกี่ยวข้องก่อนเขียน metadata/sitemap/manifest code ทุกครั้ง (`web/AGENTS.md`).

---

## 1. Competitor analysis (จาก data ที่ดึงจริง)

| คู่แข่ง | จุดแข็ง SEO | ช่องว่างที่เราแซงได้ |
|---|---|---|
| **primal.co.th** | Authority สูง, case study เชิงตัวเลข ("100 keywords page 1", "14K reservations"), FAQ section, English-strong | เนื้อหาอังกฤษเป็นหลัก — **ช่องคำค้นไทย transactional ("รับทำ…") ยังเปิด**; เว็บหนัก (43KB+) → เราชนะ CWV/visual ได้ |
| **predictive.co.th** | Blog ไทยแน่น (GA4, analytics), ISO badge (E-E-A-T), บริการ analytics เด่น | โฟกัส analytics/consulting ไม่ใช่ SME web/ads — เราจับ SME ตรงกว่า, intent transactional ชัดกว่า |
| **bestsolutions ปัจจุบัน (เว็บเก่า)** | URL ไทย keyword-rich อยู่แล้ว (`/services/web-design`, `/services/seo`, `/services/paid-ads`...) | metadata/JSON-LD บาง, ไม่มี blog cluster, visual เก่า — redesign คือโอกาส retain URL + ยกระดับ |

**Takeaways เข้าแผน:** (a) case study ต้องมีตัวเลขผล (ดึง PortfolioJsonLd + `results` field), (b) FAQ section + FAQPage schema เลียนแบบ primal, (c) E-E-A-T proof (author, ปีประสบการณ์, รีวิว), (d) ชิงคำค้น **ไทย transactional** ที่คู่แข่ง enterprise ทิ้งช่องไว้, (e) คง URL slug เดิมเพื่อไม่เสีย equity (ทำ redirect map ถ้าเปลี่ยน).

---

## 2. Keyword map (execute — ต่อหน้า/ต่อ service)

> Volume/difficulty ต้อง validate ด้วย Google Keyword Planner + GSC + Ahrefs/Ubersuggest ก่อน lock — ตารางนี้คือ intent grouping + priority เชิงคุณภาพ

| Page / Service | URL (คง slug เดิม) | Primary KW | Secondary KW | Intent |
|---|---|---|---|---|
| Home | `/th` | digital marketing agency กรุงเทพ | เอเจนซี่การตลาดออนไลน์, บริษัทการตลาดดิจิทัล | brand/commercial |
| รับทำเว็บไซต์ | `/th/services/web-design` | รับทำเว็บไซต์ | บริษัทรับทำเว็บไซต์ กรุงเทพ, ออกแบบเว็บไซต์, รับทำเว็บไซต์ราคา | transactional (สูงสุด) |
| ยิงแอดโฆษณา | `/th/services/paid-ads` | รับยิงแอด | รับยิงแอด Facebook, ยิงแอด Google, รับทำโฆษณาออนไลน์ | transactional |
| ดูแลเพจ/โซเชียล | `/th/services/social-media` | รับดูแลเพจ | รับดูแลเพจ Facebook, รับดูแลโซเชียลมีเดีย, admin เพจ | transactional |
| SEO | `/th/services/seo` | รับทำ SEO | รับทำ SEO สายขาว, บริษัทรับทำ SEO, SEO ติดอันดับ Google, ราคา SEO | transactional |
| AI Automation | `/th/services/automation` | ระบบ automation ธุรกิจ | AI automation, ทำระบบอัตโนมัติการตลาด, รับทำ n8n/Make | commercial/educate |
| AI ตอบอีเมล | `/th/services/ai-email` | AI ตอบอีเมลอัตโนมัติ | ระบบตอบอีเมลอัตโนมัติ, AI customer support | commercial/educate |
| Production | `/th/services/production` | รับถ่ายวิดีโอ | ผลิตคอนเทนต์วิดีโอ, video production กรุงเทพ | transactional |
| About | `/th/about` | เกี่ยวกับ Best Solutions | ทีมการตลาดดิจิทัล | brand/trust |
| Portfolio | `/th/portfolio` | ผลงานรับทำเว็บไซต์ | ผลงาน SEO, case study การตลาด | commercial proof |
| Blog | `/th/blog` | (cluster — ดู §5) | — | informational |
| Contact | `/th/contact` | ติดต่อ Best Solutions | ปรึกษาการตลาดออนไลน์ฟรี | transactional/lead |

Rule on-page: primary KW ใน `<title>` (≤60), H1, ย่อหน้าแรก, URL, image alt; secondary กระจายใน H2/body ธรรมชาติ ไม่ stuff. Source of truth = `web/messages/th.json` (metaTitle/metaDescription ทุก namespace).

---

## 3. ติดตั้ง community skills (Step 0)

```
npx skills add https://github.com/coreyhaines31/marketingskills --skill seo-audit
npx skills add https://github.com/coreyhaines31/marketingskills --skill schema-markup
npx skills add https://github.com/coreyhaines31/marketingskills --skill ai-seo
```

ใช้ควบคู่ skill list ของ seo-strategist agent (seo-fundamentals, seo-keyword-strategist, seo-schema, geo-fundamentals, web-performance-optimization). ตรวจลงใน `.claude/skills/` + update `skills-lock.json`.

---

## 4. Phase A — Technical SEO (execute, แก้ในโปรเจค)

| # | ไฟล์ | งานระดับ execute |
|---|---|---|
| A1 | `web/utils/metadata.ts` | `buildOg()`: param `image` fallback → `${SITE_URL}/og-default.webp`. `buildPageMetadata()`: เพิ่ม `twitter.images:[image]`. เพิ่ม optional `publishedTime`/`modifiedTime`/`authors` ส่งทะลุไป `openGraph` เมื่อ `type==="article"` |
| A2 | `web/public/og-default.webp` | สร้าง OG 1200×630 brand (designer) |
| A3 | `web/app/manifest.ts` | สร้างใหม่: name "Best Solutions", short_name, theme `#F5F3EE`, bg `#F5F3EE`, icons จาก `favicon.png`, start_url `/th` |
| A4 | `web/components/json-ld.tsx` | + `FaqJsonLd(items)` (FAQPage), + `WebSiteJsonLd` (มี `potentialAction` SearchAction → `/th/blog?q=`), reuse `OrganizationJsonLd`/`LocalBusinessJsonLd` |
| A5 | `web/app/[locale]/page.tsx` | mount `WebSiteJsonLd` + ยืนยัน `OrganizationJsonLd` (มี import แล้ว) + `BreadcrumbJsonLd` |
| A6 | `web/app/[locale]/contact/page.tsx` | mount `LocalBusinessJsonLd` (NAP กรุงเทพฯ + geo + openingHours) |
| A7 | `web/app/[locale]/services/page.tsx` + service detail | mount `FaqJsonLd` ผูกกับ `ServicesFAQ` content |
| A8 | `web/app/[locale]/blog/[slug]/page.tsx` | ส่ง `publishedTime`/`modifiedTime`/`authors` เข้า `buildPageMetadata` (DB มี `published_at`/`updated_at`/author) |
| A9 | `web/utils/metadata.ts` + blog/portfolio/service detail | ใช้ `og_image` ก่อน, fallback `cover_image`, fallback `og-default` |
| A10 | `web/app/sitemap.ts` | static services hardcode แค่ `web-design` → ดึง slug จริงจาก `getServices()` ครบ 7 |
| A11 | `web/components/media-image.tsx` | `alt` เป็น required prop; ตรวจทุกจุดเรียกใส่ alt ไทยสื่อความหมาย |
| A12 | (audit) | รัน skill `seo-audit` บน build → ปิด findings P0/P1 |

### ⚠️ Flagged risk — en hreflang (ผู้ใช้สั่ง "อย่าแตะ")

`utils/metadata.ts:11-12` และ `layout.tsx:42-45,49` ใส่ hreflang/og `en → /en` แต่ `routing.ts` มีแค่ `th` → `/en` = notFound. Google เห็น hreflang ชี้หน้าเสีย ลบล้างผล canonical. **ไม่แก้ตามคำสั่ง** แต่บันทึกเป็น known SEO risk; ทางเลือกขั้นต่ำ (ลบ 3 บรรทัด `en:` ไม่ยุ่ง routing) ขอผู้ใช้ยืนยันก่อนเริ่ม Phase A — ถ้ายืนยัน "ไว้ก่อน" จะ proceed โดยคง risk ไว้.

---

## 5. Phase B/C — Keyword on-page + Content (execute)

**B (on-page):** seo-strategist รัน `seo-keyword-strategist` → validate volume → lock §2 → อัปเดต `messages/th.json` ทุก metaTitle/metaDescription (≤60/≤160, primary KW หน้า). ตรวจ 1×H1/หน้า, heading hierarchy (`seo-structure-architect`). สร้าง internal-link matrix: service ↔ portfolio (case เกี่ยวข้องผ่าน `category`) ↔ blog, anchor ไทยเชิงคำค้น.

**C (content cluster — pillar/cluster ต่อ service):**
- Pillar = หน้า service เอง. Cluster = บทความ blog support 2-4 ชิ้น/service.
- ตัวอย่าง cluster "รับทำเว็บไซต์": "เว็บไซต์ธุรกิจราคาเท่าไหร่ 2026", "เว็บ WordPress vs custom", "checklist ก่อนจ้างทำเว็บ", "เว็บไซต์ที่ติด SEO ต้องมีอะไร" → internal link กลับ `/services/web-design` + `/contact`.
- `seo-content-planner` ออก editorial calendar เรียงตาม keyword opportunity × business priority (เว็บ > ยิงแอด > SEO > โซเชียล > AI/production).
- brief → `content-writer` (ไทย-first, E-E-A-T, author จริง). ทุกบทความผ่าน SEO checklist ใน `CLAUDE.md` + `ArticleJsonLd` (มีแล้ว) + FAQ block→`FaqJsonLd` เมื่อเหมาะ.

---

## 6. Phase D — Off-page / Local SEO / AI search (GEO)

1. **Local (`geo-fundamentals`):** Google Business Profile (หมวด "Marketing agency", NAP ต้องตรง `LocalBusinessJsonLd` เป๊ะ, รูป, เก็บรีวิว), NAP consistency footer/contact, citations directory ไทย (Wongnai-biz, ไทยแลนด์เยลโลเพจ, etc.).
2. **AI search (`ai-seo`):** content แบบ extractable — คำตอบสั้นบนสุด, Q&A blocks, สถิติอ้างอิง, author/expertise; ตรวจ `robots.ts` ไม่ block AI bots; baseline citation audit 10-20 query (เช่น "เอเจนซี่รับทำเว็บ กรุงเทพ แนะนำ").
3. **Authority:** outreach backlink (ลูกค้า/พาร์ทเนอร์/PR/guest post สาย marketing), portfolio + testimonial เป็น proof, ขอ brand mention.
4. **Indexing/monitoring:** Google Search Console + Bing Webmaster, submit `sitemap.xml`, ตรวจ Coverage/Enhancements/hreflang report.

---

## 7. Timeline / sequencing (sprint + dependency)

| Sprint | งาน | Depends on | Exit |
|---|---|---|---|
| **S0 (วันแรก)** | Step 0 install skills; baseline: GSC connect, current ranking/traffic snapshot, run `seo-audit` | — | baseline doc + audit findings list |
| **S1** | Phase A1–A12 technical fixes | S0 audit; ผู้ใช้ยืนยัน hreflang risk | `pnpm lint/typecheck/build` ผ่าน, Rich Results valid, Lighthouse ≥95 |
| **S2** | Phase B keyword validate + lock + on-page (`th.json`, headings, internal links) | S1 (เพราะแก้ metadata helper); keyword tool data | keyword map locked, on-page checklist ผ่านทุกหน้า |
| **S3** | Phase C editorial calendar + ชุดบทความ pillar/cluster ชุดแรก (2 service แรก: เว็บ, ยิงแอด) | S2 (keyword) | บทความ publish + schema valid |
| **S4** | Phase D off-page/local/GEO + monitoring setup | S1 (LocalBusiness JSON-LD), S3 (content เป็น proof) | GBP live, citations submitted, AI baseline audit |
| **ต่อเนื่อง** | content cluster ที่เหลือ + รายงาน KPI รายเดือน | S3 | review loop |

Critical path: S0 → S1 → S2 → S3. D ขนานกับ C ได้หลัง S1.

---

## 8. KPI / measurement

| ระดับ | Metric | เครื่องมือ | Target (6 เดือน) |
|---|---|---|---|
| Baseline | ranking/traffic/index snapshot ก่อนเริ่ม | GSC, GA4 | บันทึก S0 (อ้างอิงเทียบ) |
| Technical | Lighthouse Perf/SEO/A11y | Lighthouse/PSI | ≥95 ทุกหน้า ก่อน deploy (DoD) |
| Technical | CWV: LCP / INP / CLS | PSI, GSC CWV report | <2.5s / <200ms / <0.1 |
| Technical | Rich result valid / index coverage | Rich Results Test, GSC | 0 error; หน้าเป้าหมาย index 100% |
| Ranking | คำ primary §2 ติด page 1 | GSC, rank tracker | ≥6/8 service KW อยู่ top 10 |
| Traffic | organic sessions ไทย | GA4 | +60–100% จาก baseline |
| Conversion | lead form / LINE / โทร | GA4 events + `leads` table | organic lead +50% |
| Local | GBP views/actions, รีวิว | GBP Insights | profile complete + รีวิวเพิ่มต่อเนื่อง |
| AI/GEO | citation rate บน 10–20 query | DIY monthly audit / Otterly | baseline → ปรากฏใน ≥30% query |

Review: รายเดือน (ranking/traffic/CWV), รายไตรมาส (strategy + content backlog).

---

## 9. Critical files

`web/utils/metadata.ts` · `web/components/json-ld.tsx` · `web/app/[locale]/{layout,page}.tsx` · `web/app/[locale]/{contact,services,services/[slug],blog/[slug]}/page.tsx` · `web/app/sitemap.ts` · `web/app/manifest.ts` (ใหม่) · `web/components/media-image.tsx` · `web/messages/th.json` · `web/public/og-default.webp` (ใหม่) · `.claude/skills/` + `skills-lock.json`

Reuse เสมอ ไม่เขียนซ้ำ: `buildPageMetadata`/`buildAlternates`/`buildOg`, `getServices`/`getArticleSitemapEntries`/`getPortfolioSitemapEntries` (`utils/supabase/queries.ts`), JSON-LD components ที่มี.

---

## 9a. SEO docs folder (รวมไฟล์เอกสารไม่ให้กระจาย)

ทุก artifact เอกสาร SEO เก็บใน **`docs/seo/`** (เข้ากับ convention `docs/` เดิม — ADR/redirect map อยู่แล้ว). สร้างตอน S0:

```
docs/seo/
  00-strategy.md        # คัดจากแผนนี้: scope, competitor, timeline, KPI
  01-keyword-map.md     # §2 keyword map (locked หลัง validate)
  02-baseline.md        # S0 snapshot: ranking/traffic/index ก่อนเริ่ม
  03-technical-audit.md # output seo-audit + สถานะ A1–A12
  04-onpage-checklist.md# ผล on-page ต่อหน้า (title/desc/H1/links)
  05-content-calendar.md# editorial calendar + สถานะบทความ pillar/cluster
  06-offpage-local.md   # GBP, citations, backlink, AI-citation log
  07-kpi-monthly/       # รายงาน KPI รายเดือน (YYYY-MM.md)
```

แผน strategy หลัก (ไฟล์นี้) คัดลอกเป็น `docs/seo/00-strategy.md` ตอนเริ่ม execute เพื่อให้อยู่ใน repo ติด git. ไฟล์ข้อมูล (baseline/audit/kpi) generate ระหว่างทำ. ทุก phase อัปเดตไฟล์ที่เกี่ยวข้องในโฟลเดอร์นี้แทนสร้างไฟล์ลอย.

## 9b. Repetitive workflow → custom plugin (deferred)

ผู้ใช้ตั้งใจสร้าง plugin/skill ภายในเองในอนาคตสำหรับงานซ้ำ ๆ — **scope แรกคือ blog article pipeline เท่านั้น** (portfolio/programmatic/plugin packaging เอาไว้ก่อน). ตอนนี้ยัง **ไม่สร้าง plugin** — Phase C ใช้ workflow agent ที่มีอยู่: `seo-strategist` (brief) → `content-writer` (ร่างไทย E-E-A-T + internal link) → insert Supabase `articles` ผ่าน Studio. ออกแบบ brief/checklist ให้ "เป็นขั้นตอนซ้ำได้" เพื่อยกเป็น skill ภายหลังโดยไม่ต้องรื้อ.

วิธีสร้าง **cover/OG image** ในขั้น content = **ยังไม่ตัดสิน** (AI image API vs HTML/SVG template→Playwright screenshot) — เป็น open decision ก่อนเริ่ม S3; จนกว่าจะตัดสิน บทความใช้ `og-default.webp` (A2) ไปก่อน ไม่ block content.

## 10. APIs / external tools ที่ต้องใช้ (research จุดที่ Claude เดาไม่ได้)

ข้อมูลพวกนี้ Claude **ดึงเองไม่ได้** ต้องมี API key/บัญชี — ระบุไว้ให้ผู้ใช้จัดหา/ให้ key:

| ต้องการ | ใช้ตรงไหน | ตัวเลือก API/tool | หมายเหตุ |
|---|---|---|---|
| Keyword volume + difficulty + SERP | §2 lock keyword map (S2) | **DataForSEO** (Keywords Data + SERP API, รองรับ locale `th`, location Thailand) / Google Keyword Planner / Ahrefs / Ubersuggest | DataForSEO เหมาะสุดถ้าจะ automate ผ่าน MCP/script — ต้อง `DATAFORSEO_LOGIN`/`DATAFORSEO_PASSWORD` |
| Rank tracking ต่อเนื่อง | §8 KPI ranking | DataForSEO SERP / SE Ranking / AccuRanker | ตั้ง track คำ primary §2 รายสัปดาห์ |
| Backlink / authority audit | §6 authority, competitor | DataForSEO Backlinks / Ahrefs / Moz | วิเคราะห์ gap เทียบ primal/predictive |
| Search Console data (จริง) | S0 baseline, §8 monitoring | **Google Search Console API** (OAuth) | clicks/impressions/position/coverage — ต้อง verify property + OAuth |
| Analytics (traffic/conversion) | §8 KPI | **GA4 Data API** (service account JSON) | organic sessions, lead events |
| Local SEO data | §6 local, GBP | **Google Business Profile API** + GBP Insights | NAP, รีวิว, views/actions |
| AI citation tracking | §6 GEO, §8 | Otterly.ai / Peec / ZipTie API หรือ DIY (เรียก ChatGPT/Perplexity/Gemini API วน query แล้ว log) | DIY ใช้ provider API keys ที่มีอยู่ |
| Rich result / CWV ตรวจอัตโนมัติ | §10 verify, S1 | PageSpeed Insights API (key ฟรี) | ใส่ใน qa-tester pipeline |

**แนะนำ:** ถ้าจะให้ research อัตโนมัติคุ้มสุด → จัดหา **DataForSEO** (ครอบ keyword+SERP+backlink ใน API เดียว, มี MCP server) + **GSC API** + **GA4 API**. ถ้ายังไม่มี key: Claude จะทำ §2 เป็น intent-grouping เชิงคุณภาพไปก่อน แล้ว flag ค่าที่ต้อง validate — ผู้ใช้ยืนยันทีหลังเมื่อมี data. โปรดแจ้งว่ามี key/บัญชีตัวไหนพร้อม จะ integrate ตอน S0/S2.

## 11. Verification

1. `cd web && pnpm lint && pnpm typecheck && pnpm build` ผ่าน (DoD #1).
2. เปิด `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` — ถูกต้อง, 7 service slug ครบ.
3. Google Rich Results Test + Schema.org Validator บนหน้า **rendered** (home, service detail, blog post, contact) — Organization/WebSite/Service/FAQ/Article/LocalBusiness/Breadcrumb ผ่าน 0 error (schema-markup skill: validate rendered ไม่ใช่ static HTML).
4. ตรวจ `<head>` ทุกหน้า: 1×H1, title ≤60 / desc ≤160, canonical ถูก, OG/Twitter image 1200×630 โหลดได้.
5. qa-tester: Lighthouse Perf/SEO/A11y ≥95 (mobile+desktop), CWV ผ่าน threshold §8.
6. หลัง deploy: submit sitemap GSC, ตรวจ Coverage/hreflang ไม่มี error, baseline AI-citation audit + ranking snapshot.
