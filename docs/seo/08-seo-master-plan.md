# 08 — SEO Master Plan (ต้นจนจบ)

เขียน 2026-08-30 · เว็บ https://www.bestsolutionscorp.com · Best Solutions Corp (Digital Marketing Agency, กรุงเทพฯ)

เอกสารนี้คือแผนหลัก อ่านตัวนี้ตัวเดียวก็เดินงานต่อได้ เอกสารอื่นใน `docs/seo/` เป็นรายละเอียดแยกเรื่อง

| ต้องการอะไร | ไปที่ |
|---|---|
| แผนรวม + ลำดับงาน | **ไฟล์นี้** |
| ผลตรวจล่าสุด + สิ่งที่แก้ไปแล้ว | `07-audit-2026-08-29.md` |
| keyword map (ยังไม่ validate) | `01-keyword-map.md` |
| ปฏิทินคอนเทนต์ | `05-content-calendar.md` |
| สถาปัตยกรรม content pipeline | `06-content-pipeline-architecture.md` |
| log ว่าใครทำอะไรไปแล้ว | `SEO-LOG.md` |

> **กติกาของเอกสารนี้:** ทุกตัวเลขในนี้มาจากการวัดจริง ไม่ใช่ประมาณการ ถ้าอันไหนยังไม่รู้จะเขียนว่า "ยังไม่รู้" ไม่เดาแทน

---

# 1. จุดยืน ณ วันนี้

## 1.1 สิ่งที่แข็งแล้ว ✅

ผ่านการวัดจริงเมื่อ 29–30 ส.ค. 2569 (PageSpeed Insights API + curl production + Supabase REST)

| ด้าน | สถานะ |
|---|---|
| **Core Web Vitals (mobile)** | LCP 2.3s · CLS 0–0.041 · **ผ่านเกณฑ์ทั้งคู่** |
| Lighthouse SEO | **100** ทั้งหน้าแรกและหน้าบทความ |
| Lighthouse Accessibility | **100** (จาก 95–96) |
| Lighthouse Best Practices | **100** |
| การ cache | ISR ทำงานทุก route · `x-vercel-cache: HIT` · TTFB 0.15–0.27s |
| Metadata | title ≤60 · desc ≤160 · 1×H1 · canonical · hreflang — ครบ 13 หน้า |
| Structured data | Organization · LocalBusiness · WebSite+SearchAction · Service · Article · CreativeWork · FAQPage · BreadcrumbList · ItemList |
| Sitemap | 40 URL (มี image 23) · lastmod จากวันที่คอนเทนต์จริง |
| Legacy redirect | 33 URL เก่าจาก WordPress → 301 ครบ |
| AEO พื้นฐาน | `llms.txt` + `rss.xml` |

## 1.2 คอนเทนต์ที่มี

| ประเภท | จำนวน | คุณภาพ |
|---|---|---|
| หน้าบริการ | 5 published (+1 draft `production`) | seo_title/desc ครบ · มี FAQ · มี pricing |
| บทความ | 16 published | 4.4k–10.7k ตัวอักษร · FAQ 15/16 · reference 2–3 ลิงก์/บท |
| ผลงาน (case) | 7 published (+1 draft) | ⚠️ body สั้นมาก 281–674 ตัวอักษร |
| Landing page | 1 (`/services/automation/lead-capture`) | มี Offer schema |
| หน้ากฎหมาย | 2 (privacy, terms) | ใหม่ |
| Blog category hub | 4 (web-design, seo, ai, automation) | ใหม่ |

## 1.3 ช่องว่างที่รู้แล้ว ❌

เรียงตามผลกระทบ

| # | ช่องว่าง | หลักฐาน |
|---|---|---|
| G1 | **keyword map ไม่เคย validate กับข้อมูลจริง** | `01-keyword-map.md` เขียนเองว่า "volume TBD" ตั้งแต่ พ.ค. |
| G2 | **H1 หน้าบริการไม่ใช่คำค้นเป้าหมาย** | H1 = `name_th` ("ออกแบบเว็บไซต์") แต่ title = "รับทำเว็บไซต์…" — ไม่ตรงกัน 4/5 หน้า |
| G3 | **Cannibalization ไม่มีใครจัดการ** | `automation` 5 หน้า · `ai` 5 · `seo` 4 · `รับทำเว็บไซต์` 3 (รวม Home ที่ H1 ชนกับ `/services/web-design`) |
| G4 | **Anchor text ลอย** | `ดูบริการ`×4 · `นัดคุยกับทีม`×4 · `ผลงาน`×2 · `ทั้งหมด` |
| G5 | **ไม่มี author entity จริง** | 16/16 บทความ `author_name="Best Solutions"` → render `Person` ชื่อองค์กร (ผิด) · ไม่มีหน้า author · ไม่มีประวัติผู้เขียน |
| G6 | **Backlink ≈ 0 และไม่ได้เก็บของฟรีที่มีอยู่** | เว็บลูกค้า 7 เว็บไม่มี credit link กลับ (เช็ค `thaifutureinc.com` = ไม่พบ) |
| G7 | **H2 หน้าแรกเป็น label เปล่า** | "บริการของเรา" "ปัญหาที่เจอบ่อย" "ขั้นตอนการทำงาน" "เหมาะกับใคร" — 9 H2 มีคำค้น 1 |
| G8 | **case page เนื้อหาบาง** | 281–674 ตัวอักษร · `year` ว่าง 6/7 · `live_url` มี 1/7 |
| G9 | **ยังไม่รู้ว่ามี Google Business Profile ไหม** | ยังไม่ได้ตรวจ — เป็นธุรกิจ local กรุงเทพฯ ถ้าไม่มีคือเสียโอกาสใหญ่ |
| G10 | **ไม่มีระบบติดตามคู่แข่ง** | ไม่เคยทำ |

## 1.4 Baseline ที่ใช้เทียบ

| ตัวชี้วัด | ค่า ณ 30 ส.ค. 2569 |
|---|---|
| Organic clicks / impressions | **0** — GSC property สร้างใหม่ ไม่ backfill ประวัติเก่าหายถาวร |
| หน้าที่ index | ยังไม่รู้ (GSC token หมดอายุ) |
| Backlink (referring domains) | ยังไม่รู้ — ยังไม่มีเครื่องมือวัด |
| GA4 | เพิ่งย้ายไป `G-611ZJPLYR4` ยังไม่มีข้อมูลสะสม |
| Mobile Perf (Lighthouse) | 84 (หน้าแรก) / 87 (บทความ) |

> **ต้องเข้าใจตรงกัน:** เราเริ่มจากศูนย์จริง ๆ ไม่ใช่เพราะเว็บแย่ แต่เพราะ property วัดผลถูกสร้างใหม่ ตัวเลข 3 เดือนแรกจะดูน่าตกใจเพราะไม่มีอะไรให้เทียบ

---

# 2. เป้าหมาย

## 2.1 เป้าหมายธุรกิจ

ให้ **organic search กลายเป็นช่องทาง lead ที่ต้นทุนต่อรายถูกที่สุด** แทนที่จะพึ่งโฆษณาอย่างเดียว

## 2.2 KPI ที่ใช้วัด — ตั้งเป้าตามเฟส

| ช่วง | KPI หลัก | เป้า |
|---|---|---|
| **เดือน 1–2** (ก.ย.–ต.ค.) | หน้าที่ Google index | ≥ 90% ของ 40 URL ใน sitemap |
| | GSC มีข้อมูล query | มี query ติด top 100 ≥ 50 คำ |
| **เดือน 3–4** (พ.ย.–ธ.ค.) | Impression / เดือน | ตั้งเป้าหลังเห็นข้อมูลเดือน 1–2 |
| | คำที่ติดหน้า 2 (11–20) | ≥ 15 คำ |
| **เดือน 5–6** (ม.ค.–ก.พ. 70) | คำ commercial ติดหน้า 1 | ≥ 5 คำ (`รับทำเว็บไซต์`, `รับทำ SEO` ฯลฯ) |
| | Organic lead / เดือน | ตั้งเป้าหลังมี conversion data 2 เดือน |

> **ทำไมไม่ตั้งตัวเลข impression/lead ตั้งแต่วันนี้** — ตั้งเป้าจากศูนย์โดยไม่มีข้อมูลคือการเดา พอมีข้อมูลเดือน 1–2 แล้วค่อยตั้งเป้าที่เถียงได้ ตัวเลขที่ตั้งลอย ๆ วันนี้จะกลายเป็นตัวเลขที่ทุกคนแกล้งลืมในเดือนที่ 3

## 2.3 ตัวชี้วัดที่ "ไม่" ใช้

- ❌ **Lighthouse Performance ≥95** — TBT ที่เหลือมาจาก GA4 + Meta Pixel ล้วน จะดันถึง 95 ต้องถอดเครื่องมือวัดผล ไม่คุ้ม · Google ใช้ LCP/CLS/INP ซึ่งผ่านแล้ว
- ❌ **Domain Authority / Domain Rating** — เป็นตัวเลขของ Moz/Ahrefs ไม่ใช่ของ Google
- ❌ **จำนวนบทความ** — ปริมาณไม่ใช่เป้า คำที่ติดอันดับต่างหาก

---

# 3. กติกาที่ใช้ตัดสินใจ

เขียนไว้กันเถียงกันเองทีหลัง

1. **วัดก่อนแก้** — ห้ามแก้ keyword/H1/คอนเทนต์โดยไม่มีข้อมูลรองรับ ยกเว้นกรณีที่ผิดชัดเจน (เช่น H1 ซ้ำ, schema 404)
2. **ไม่ยัดคำค้นจนเสียเสียงแบรนด์** — design direction ถูก lock ไว้ H1 ต้องอ่านแล้วเป็นภาษาคน ไม่ใช่ป้ายคำค้น
3. **1 หน้า = 1 คำค้นหลัก** — ถ้าสองหน้าชนกัน ต้องเลือกว่าใครได้ แล้วอีกหน้าลิงก์ไปหา ไม่ใช่ปล่อยชนกัน
4. **ไม่สร้างหน้าที่ไม่มีคนค้น** — โดยเฉพาะ local landing page แบบ "รับทำเว็บไซต์ + ชื่อเขต" ที่เป็น doorway page
5. **เนื้อหาต้องมาจากงานจริง** — เราเป็นเอเจนซี ความน่าเชื่อถือมาจากเคสจริง ไม่ใช่บทความ AI ที่ใครก็เขียนได้
6. **ห้ามแตะ measurement เพื่อไล่คะแนน** — ดูข้อ 2.3
7. **ทุก sprint ต้องปิดด้วยการวัด** — ไม่ใช่ปิดด้วย "ทำเสร็จแล้ว"

---

# 4. Phase 0 — ปลดบล็อก (สัปดาห์ที่ 1 · 1–7 ก.ย.)

**ทำไมต้องมาก่อน:** ทุก phase หลังจากนี้ต้องใช้ข้อมูล ถ้า Phase 0 ไม่จบ งานที่เหลือทั้งหมดจะกลายเป็นการเดา

| # | งาน | ใครทำ | ทำยังไง | เสร็จเมื่อ |
|---|---|---|---|---|
| 0.1 | **ต่อ GSC token** | เจ้าของ | `node scripts/gsc-oauth.mjs` | `node scripts/gsc.mjs sites` คืน property ได้ |
| 0.2 | **Submit sitemap** | เจ้าของ | GSC → Sitemaps → `sitemap.xml` | GSC ขึ้น "Success" + อ่านได้ 40 URL |
| 0.3 | **non-www → 308** | เจ้าของ | Vercel → Settings → Domains | `curl -I https://bestsolutionscorp.com/` = 308 |
| 0.4 | **ยืนยัน GA4 รับข้อมูล** | เจ้าของ | เปิดเว็บจาก**เน็ตมือถือ** (ไม่ใช่ WiFi ที่ตั้ง internal filter ไว้) → GA4 Realtime | เห็น active user + event `blog_read`/`cta_click` |
| 0.5 | **mark key event** | เจ้าของ | GA4 → Admin → Key events → `lead_submit` | ทำได้หลัง event วิ่งเข้ามาแล้ว |
| 0.6 | **ย้าย Google Ads tag** | เจ้าของ | ย้าย `AW-16662575113` จาก `GTM-WCGGB9KN` → `GTM-TCGHJW5W` | Tag Assistant เห็น AW ยิงบนเว็บจริง |
| 0.7 | **ตรวจ Google Business Profile** | เจ้าของ | ค้น "Best Solutions Corp" ใน Google Maps · เช็คว่ามี profile ไหม / ยืนยันแล้วหรือยัง / ใครถือ | รู้คำตอบชัด → ถ้าไม่มี เข้า Phase 5 |
| 0.8 | **ตั้ง URL Inspection ให้หน้าสำคัญ** | เจ้าของ/ผม | GSC → URL Inspection → Request indexing ให้ 8 หน้าใหม่ (privacy, terms, 4 category hub, 2 หน้าที่แก้ H1) | ส่ง request ครบ |

**Definition of Done (Phase 0):** ดึง GSC data ได้ · GA4 มีข้อมูลเข้า · redirect ถาวร · sitemap submit แล้ว · รู้สถานะ GBP

---

# 5. Phase 1 — ตั้งฐานข้อมูล (สัปดาห์ 2–3 · 8–21 ก.ย.)

**เป้า:** เปลี่ยน keyword map จาก "เดาเชิงคุณภาพ" เป็น "ตัดสินจากข้อมูล"

### 5.1 ดึงข้อมูลจริง

- GSC Search Analytics ย้อนหลังเท่าที่มี — dimension `query`, `page`, `query+page`
- แยกออกเป็น 4 ถัง:
  - **ถัง A — ของขวัญ:** position 11–20, impression สูง → ดันนิดเดียวขึ้นหน้า 1 **(ทำก่อนเสมอ)**
  - **ถัง B — CTR ต่ำ:** position 1–10 แต่ CTR ต่ำกว่าค่าเฉลี่ยตำแหน่งนั้น → แก้แค่ title/desc
  - **ถัง C — ชนกันเอง:** query เดียวมีหลาย page ขึ้น → เข้า 6.3
  - **ถัง D — ไม่มีใครค้น:** หน้าที่ impression ≈ 0 หลัง index ครบ 8 สัปดาห์ → พิจารณา merge/ตัด
- Core Web Vitals report ใน GSC (ข้อมูล field จริง ไม่ใช่ lab) — ยืนยันว่า LCP ที่แก้ไปมีผลกับผู้ใช้จริง

### 5.2 Keyword research รอบจริง

- ตั้งต้นจาก 5 บริการ + 16 บทความที่มี
- หา volume/difficulty — เลือกทางใดทางหนึ่ง:
  - **ฟรี:** GSC + Google Keyword Planner (ต้องมีบัญชี Ads ที่ยิงอยู่) + Google autocomplete/People Also Ask
  - **เสียเงิน:** DataForSEO (ถูกสุด จ่ายตามใช้) — ค้างรอตัดสินใจมาตั้งแต่ พ.ค.
- ⚠️ **คำไทยมี volume ต่ำกว่าคำอังกฤษมาก** อย่าตัดคำทิ้งเพราะ volume น้อย ให้ดู intent ประกอบ — `รับทำเว็บไซต์ บริษัท` volume 200 ที่ปิดการขายได้ ดีกว่า `การตลาดออนไลน์` volume 5,000 ที่ไม่มีใครซื้อ

### 5.3 วิเคราะห์คู่แข่ง

เลือกคู่แข่งจริง 5 ราย = เอเจนซีไทยที่ติดหน้า 1 ในคำที่เราอยากได้ (ไม่ใช่เอเจนซีที่เรารู้จัก)

ดูต่อราย: หน้าไหนติด · โครงสร้างหน้า · ความยาว · schema ที่ใช้ · จำนวนบทความ · ใครลิงก์หาเขา

### 5.4 ส่งมอบ

- `01-keyword-map.md` **v2** — มี volume/difficulty/intent/หน้าเป้าหมาย + ระบุชัดว่าใครเป็น pillar ใครเป็น cluster
- `09-competitor-analysis.md` (ใหม่)
- `02-baseline.md` อัปเดตด้วยตัวเลขจริง

**DoD:** ทุกหน้าใน sitemap มีคำค้นหลัก 1 คำที่ระบุได้ และไม่มีคำค้นไหนถูก assign ให้ 2 หน้า

---

# 6. Phase 2 — On-page (สัปดาห์ 3–5 · 15 ก.ย.–5 ต.ค.)

> เริ่มบางส่วนคู่ขนานกับ Phase 1 ได้ — งาน 6.1/6.2/6.4 ถูกต้องแน่นอนไม่ว่าข้อมูลจะออกมายังไง

### 6.1 แก้ H1 หน้าบริการ (G2) — ผลกระทบสูงสุด

ปัญหา: H1 ดึงจาก `services.name_th` ซึ่งเป็นชื่อเชิงแบรนด์ ไม่ใช่คำค้น

| หน้า | H1 ตอนนี้ | ควรเป็น (รอ Phase 1 ยืนยัน) |
|---|---|---|
| web-design | ออกแบบเว็บไซต์ | รับทำเว็บไซต์ธุรกิจ กรุงเทพฯ |
| seo | SEO สำหรับเว็บไซต์ธุรกิจ | รับทำ SEO ให้เว็บธุรกิจติดอันดับ Google |
| paid-ads | ดูแลแคมเปญโฆษณา Meta & Google | รับยิงแอด Facebook และ Google |
| social-media | ดูแลโซเชียลมีเดีย | รับดูแลเพจ Facebook และโซเชียลมีเดีย |
| automation | ระบบ Automation & AI | วางระบบ Automation & AI ให้ธุรกิจ |

**ทางเลือกเชิงเทคนิค — ต้องตัดสินก่อนลงมือ:**
- **A (แนะนำ)** เพิ่ม column `h1_th` ใน `services` → คุม H1 แยกจาก `seo_title` ได้ · H1 เขียนให้คนอ่าน / title เขียนให้ SERP · ต้อง migration 1 ครั้ง
- **B** ใช้ `seo_title` เป็น H1 → ไม่แก้ schema แต่ H1 จะอ่านแข็งกว่าเดิม

### 6.2 แก้ anchor text (G4)

`ดูบริการ` → `ดูบริการรับทำเว็บไซต์และการตลาดออนไลน์`
`ผลงาน` → `ผลงานเว็บไซต์ที่เราออกแบบ`
`ทั้งหมด` → `บทความทั้งหมด`

เกณฑ์: อ่านแล้วรู้ว่าไปไหนโดยไม่ต้องดู URL · มีคำค้นของ**หน้าปลายทาง** · ไม่ซ้ำคำเป๊ะทุกจุด (over-optimization)

### 6.3 แก้ cannibalization (G3)

ประกาศ pillar ↔ cluster ให้ชัดผ่าน internal link

```
/services/web-design  (pillar: รับทำเว็บไซต์)
   ├── blog/wordpress-website-price
   ├── blog/fast-wordpress-website-seo
   ├── blog/wordpress-vs-webflow-vs-wix
   ├── blog/build-website-step-by-step
   └── blog/landing-page-explained

/services/seo  (pillar: รับทำ SEO)
   ├── blog/what-is-seo-for-sme
   └── blog/local-seo-explained

/services/automation  (pillar: Automation & AI)
   ├── blog/what-is-marketing-automation
   ├── blog/marketing-automation-tools
   ├── blog/marketing-automation-price
   ├── blog/email-marketing-automation
   ├── blog/marketing-funnel-template
   ├── blog/crm-explained
   ├── blog/ai-chatbot-line-oa
   ├── blog/ai-marketing-tools
   └── blog/what-is-ai-marketing
```

กติกา: cluster → pillar ทุกบท (ลิงก์ขึ้น) · pillar → cluster ที่เกี่ยวที่สุด 3–5 บท · cluster ↔ cluster เฉพาะที่เกี่ยวจริง

⚠️ **`/services/automation` แบก cluster 9 บทคนเดียว** — Phase 1 ต้องตอบว่าควรแตกเป็น pillar ย่อย (Automation vs AI vs CRM) หรือไม่

**Home ต้องเลือกข้าง:** H1 ตอนนี้ = "รับทำเว็บไซต์ธุรกิจ…" ชนกับ `/services/web-design` เต็ม ๆ ต้องตัดสินว่า Home ไปทาง brand/agency (`digital marketing agency กรุงเทพ`) แล้วปล่อยคำ `รับทำเว็บไซต์` ให้หน้าบริการ — หรือกลับกัน **เลือกได้อย่างเดียว**

### 6.4 H2 หน้าแรก (G7)

"บริการของเรา" → "บริการดิจิทัลครบวงจรสำหรับธุรกิจไทย"
"ปัญหาที่เจอบ่อย" → "ปัญหาที่เจ้าของธุรกิจเจอบ่อยก่อนเริ่มทำการตลาดออนไลน์"
"ขั้นตอนการทำงาน" → "ขั้นตอนการทำงานตั้งแต่รับโจทย์จนส่งมอบ"

ยังต้องอ่านเป็นภาษาคน (กติกาข้อ 2)

### 6.5 เติมเนื้อ case page (G8)

7 เคส × ขยายจาก ~400 → 800–1,200 ตัวอักษร โครง: โจทย์ → สิ่งที่ทำ → ผลลัพธ์ → บริการที่ใช้
พร้อมเติม `year` (ว่าง 6/7) และ `live_url` (มี 1/7) — `year` ใช้ใน `dateCreated` ของ schema

### 6.6 ตรวจ alt text รอบคำค้น

alt มีครบทุกรูปแล้ว แต่ยังไม่เคยตรวจว่าอธิบายภาพจริงและมีคำค้นที่เกี่ยวไหม — ห้ามยัดคำค้นในภาพที่ไม่เกี่ยว

**DoD:** ไม่มีคำค้นไหนถูกเล็งโดย 2 หน้า · ทุก anchor บอกปลายทางได้ · H1 ทุกหน้าตรงกับคำค้นเป้าหมาย · GSC ถัง C ว่าง

---

# 7. Phase 3 — E-E-A-T & Entity (สัปดาห์ 4–6 · 22 ก.ย.–12 ต.ค.)

Google ให้น้ำหนักกับ "ใครพูด" ไม่ใช่แค่ "พูดอะไร" — โดยเฉพาะหมวด YMYL-ish อย่างการเงิน/ธุรกิจ

### 7.1 สร้าง author entity จริง (G5) — ผิดอยู่ตอนนี้

ตอนนี้: 16/16 บทความ `author_name = "Best Solutions"` → schema `Person` ชื่อองค์กร = **ผิดชนิด entity**

ต้องทำ:
- ตัดสินว่าใครเป็นผู้เขียน — Thanakit Chaithong (founder) หรือแยกตามคนในทีม
- เพิ่ม column ในตาราง author หรือ `articles.author_*` (bio, รูป, ตำแหน่ง, ลิงก์โซเชียล)
- สร้างหน้า `/th/author/[slug]` — ประวัติ ประสบการณ์ บทความที่เขียน
- `Person` schema ที่ถูกต้อง: `name`, `jobTitle`, `worksFor` → `@id` ของ Organization, `sameAs` → LinkedIn/Facebook, `url` → หน้า author
- ผูก `Article.author` → `@id` ของ Person

### 7.2 เสริมสัญญาณความน่าเชื่อถือ

- หน้า About: ปีที่ก่อตั้ง จำนวนโปรเจกต์ ทีม ใบรับรอง (Google Partner / Meta Partner ถ้ามี)
- ที่อยู่จริง + เบอร์ + เวลาทำการ ต้องตรงกันทุกที่ (NAP consistency)
- ⚠️ **ห้าม mark up testimonial เป็น `Review`/`AggregateRating` บน LocalBusiness** — self-serving review ผิด policy ของ Google โดนโทษได้ · ให้ใช้ Review จากแหล่งภายนอก (GBP) แทน

### 7.3 เก็บ backlink ที่ควรได้อยู่แล้ว (G6)

**นี่คือ backlink คุณภาพสูงที่สุดที่หาได้ฟรี และตอนนี้ได้ 0**

- เว็บลูกค้า 7 เว็บ (+เว็บที่ยังไม่ได้ลงผลงาน) → ขอใส่ credit "ออกแบบและพัฒนาโดย [Best Solutions](https://www.bestsolutionscorp.com)" ที่ footer
- ต้องคุยกับลูกค้าก่อน ไม่ใช่แอบใส่
- ใส่เป็น dofollow ปกติ · **ห้ามใช้ anchor เดียวกันเป๊ะทุกเว็บ** (footprint) → สลับระหว่าง "Best Solutions", "รับทำเว็บไซต์โดย Best Solutions", "ออกแบบเว็บไซต์โดย Best Solutions"
- ใส่เป็นเงื่อนไขมาตรฐานในโปรเจกต์ใหม่ตั้งแต่ต้น

**DoD:** author entity ถูกต้องตาม schema · หน้า author live · credit link ได้อย่างน้อย 4/7 เว็บ

---

# 8. Phase 4 — Local SEO (สัปดาห์ 5–8 · 6 ต.ค.–2 พ.ย.)

**ทำไมสำคัญ:** เราเป็น "digital marketing agency **กรุงเทพ**" — คำค้นแบบ "เอเจนซี + พื้นที่" มี local pack ขึ้นก่อน organic เสมอ ถ้าไม่มี GBP คือหายไปจากผลค้นหาส่วนที่เห็นชัดที่สุด

### 8.1 Google Business Profile

ขึ้นกับผลข้อ 0.7:
- **ไม่มี** → สร้าง + ยืนยันตัวตน (Google ส่งไปรษณียบัตร/วิดีโอ ใช้เวลา 1–2 สัปดาห์)
- **มีแต่ไม่ได้ยืนยัน** → claim
- **มีแล้ว** → ตรวจ NAP, หมวดหมู่, เวลาทำการ, รูป

ตั้งค่าให้ครบ: หมวดหลัก `Internet Marketing Service` + หมวดรอง (Website Designer, Advertising Agency) · บริการ 5 รายการตรงกับหน้าเว็บ · รูป ≥10 · Q&A ที่เตรียมคำตอบเอง · ลิงก์ไปหน้าบริการที่ตรง ไม่ใช่หน้าแรกอย่างเดียว

### 8.2 Review — ตัวชี้ขาดของ local pack

- ขอรีวิวจากลูกค้า 7 รายที่ทำเสร็จแล้ว (ทำเป็นขั้นตอนหลังส่งมอบทุกโปรเจกต์)
- ตอบทุกรีวิวภายใน 48 ชม.
- ⚠️ ห้ามซื้อ/แลกรีวิว — โดนลบ profile ได้

### 8.3 NAP + directory ไทย

ชื่อ/ที่อยู่/เบอร์ต้องเป๊ะเหมือนกันทุกที่: เว็บ · GBP · Facebook Page · LINE OA · Apple Maps · directory ธุรกิจไทย

### 8.4 หน้า local — ทำอย่างระวัง

ถ้าจะทำหน้าแบบ "รับทำเว็บไซต์ + พื้นที่" ต้อง**มีเนื้อหาต่างกันจริง** (เคสในพื้นที่นั้น ลูกค้าจริง) ไม่ใช่หน้าเดิมเปลี่ยนชื่อเขต → นั่นคือ doorway page ผิด policy (กติกาข้อ 4)

**DoD:** GBP ยืนยันแล้ว ข้อมูลครบ · รีวิว ≥5 · NAP ตรงกันทุกช่องทาง

---

# 9. Phase 5 — Content engine (เดือน 2–6 · ต.ค. 69–ก.พ. 70)

### 9.1 หลักการ

- เขียนจาก**งานจริง** ไม่ใช่จากที่ AI สรุปมา (กติกาข้อ 5) — เราแข่งกับเอเจนซีที่ผลิตคอนเทนต์ AI เป็นร้อยชิ้น ทางชนะคือของจริงที่เขาไม่มี
- ทุกบทต้องตอบได้ว่า "ใครค้นคำนี้ แล้วเขาต้องการอะไร" ถ้าตอบไม่ได้ = ยังไม่พร้อมเขียน
- ทุกบทต้องอยู่ใน cluster ที่ระบุได้ (`pillar_primary`) ไม่มีบทความลอย

### 9.2 ช่องว่างคอนเทนต์ที่เห็นแล้ว

จาก cluster map ในข้อ 6.3:

| Pillar | บทความที่มี | ขาด |
|---|---|---|
| web-design | 5 | ราคาทำเว็บ (เจาะลึก) · checklist ก่อนจ้าง · ย้ายเว็บเก่าไม่ให้เสียอันดับ |
| **seo** | **2** | ⚠️ บางที่สุด — SEO กี่เดือนเห็นผล · ราคา SEO · SEO vs Google Ads · เลือกบริษัท SEO ยังไง |
| **paid-ads** | **0** | ⚠️ ไม่มีเลย — งบเริ่มเท่าไหร่ · ROAS เท่าไหร่ถึงดี · Meta vs Google Ads |
| **social-media** | **0** | ⚠️ ไม่มีเลย — คอนเทนต์เพจร้านค้า · ดูแลเพจเองหรือจ้าง |
| automation | 9 | พอแล้ว — ไปเติมที่อื่นก่อน |

**บริการ 2 ใน 5 ไม่มีบทความรองรับเลย** = pillar ไม่มี cluster ป้อน

### 9.3 Cadence

- **เดือน 2–3:** 4 บท/เดือน — เติม paid-ads กับ social-media ก่อน (ช่องว่างใหญ่สุด)
- **เดือน 4–6:** 4–6 บท/เดือน — ตามถัง A/D จาก GSC
- **ทุกเดือน:** refresh บทเก่า 1–2 บท (อัปเดตข้อมูล เพิ่ม internal link ไปคอนเทนต์ใหม่)

> ปรับจาก `05-content-calendar.md` ที่เดิมวางไว้ 1–2 บท/**วัน** — cadence นั้นสูงเกินกว่าจะรักษาคุณภาพตามกติกาข้อ 5 ได้ และของที่มีอยู่ 16 บทยังไม่ได้ optimize เลย ปริมาณไม่ใช่ปัญหาของเราตอนนี้

### 9.4 Quality gate ก่อน publish

ตอบคำค้นได้ใน 100 คำแรก · มี H2 ตามคำถามที่คนค้นจริง · internal link ≥3 (ขึ้น pillar 1 + cluster 2) · external reference ≥2 เช็คแล้วว่า 200 · FAQ ถ้าเหมาะ · รูป + alt ไทย · `pillar_primary`/`funnel_stage`/`cta_type` ครบ · seo_title ≤60 · seo_desc ≤160 · ไม่ทับคำค้นบทเก่า

---

# 10. Phase 6 — Off-page & GEO (เดือน 3–6)

### 10.1 Link building — เรียงตามความคุ้ม

1. **Client credit** (Phase 3.3) — ฟรี เกี่ยวข้องสูง ทำได้เลย
2. **Directory ไทยที่มีคนใช้จริง** — ไม่ใช่ directory spam
3. **Case study ร่วมกับลูกค้า** — ลูกค้าโพสต์ถึงโปรเจกต์ พร้อมลิงก์
4. **Guest post / สัมภาษณ์** ในสื่อธุรกิจ SME ไทย
5. **เครื่องมือ/เทมเพลตฟรี** — เช่น checklist จ้างทำเว็บ, เครื่องคำนวณงบแอด (linkable asset)

❌ ห้าม: ซื้อลิงก์ · PBN · link exchange เป็นระบบ · directory spam

### 10.2 GEO / AEO — ให้ AI อ้างอิงเรา

พื้นฐานมีแล้ว (`llms.txt`, schema ครบ, FAQ) เหลือ:
- ตรวจทุกเดือนว่า ChatGPT / Perplexity / Google AI Overview ตอบคำถามในสายเราว่าอย่างไร และอ้างใคร
- เขียนคอนเทนต์แบบ "ตอบตรงใน 2–3 ประโยคแรก" — AI ดึงไปอ้างง่ายกว่า
- ตรวจว่า AI crawler เข้าได้ (GPTBot, PerplexityBot, ClaudeBot ไม่โดน block ใน robots.txt) — **ตอนนี้ไม่ได้ block อยู่แล้ว ✅**

---

# 11. การวัดผลและรายงาน

| ความถี่ | ดูอะไร | ใช้เวลา |
|---|---|---|
| **ทุกสัปดาห์** | GSC: query ใหม่ที่เข้ามา · หน้าที่ตกอันดับ · error ใน Coverage | 15 นาที |
| **ทุกเดือน** | clicks/impressions/position เทียบเดือนก่อน · ถัง A (11–20) มีอะไรใหม่ · GA4: organic → lead · CWV field data · บทความที่ต้อง refresh | 1 ชม. |
| **ทุกไตรมาส** | เทียบคู่แข่ง · ทบทวน keyword map · ประเมินว่า cluster ไหนได้ผล/ไม่ได้ผล · ปรับแผน | ครึ่งวัน |

**เครื่องมือที่มีแล้ว:** `scripts/gsc.mjs` (ดึง GSC) · `scripts/psi.mjs` (ดึง PageSpeed) · GA4 · Supabase
**ยังไม่มี:** keyword volume (DataForSEO — รอตัดสินใจ) · backlink monitoring · rank tracking รายวัน

---

# 12. Risk register

| ความเสี่ยง | ผลถ้าเกิด | กันยังไง |
|---|---|---|
| GSC token หมดอายุอีก (OAuth testing app หมดใน 7 วัน) | วัดผลไม่ได้ เห็นปัญหาช้า | ย้าย OAuth app เป็น Production หรือใช้ service account ที่ add เป็น user ใน property |
| แก้ H1/title แล้วอันดับตก | เสียทราฟฟิกที่มี | แก้ทีละกลุ่ม เว้น 2 สัปดาห์ดูผล ไม่แก้ทั้งเว็บพร้อมกัน · จดวันที่แก้ไว้เทียบ |
| เขียนคอนเทนต์เร็วเกินจนคุณภาพตก | Google มองว่าเป็น mass-produced content | ยึด cadence 4–6 บท/เดือน + quality gate ข้อ 9.4 |
| ใส่ client credit link แบบ anchor เดียวกันทุกเว็บ | ดูเป็น link scheme | สลับ anchor + ทยอยใส่ ไม่ใส่ 7 เว็บวันเดียวกัน |
| Supabase เปลี่ยน schema แล้วโค้ดพัง | เว็บล่ม | ดู `CLAUDE.md` — dump ตารางก่อนรื้อ schema |
| พึ่ง SEO อย่างเดียวระหว่างรอผล 6 เดือน | lead ขาดช่วง | ยิงแอดคู่ขนานระหว่างรอ (ต้องแก้ Google Ads tag ข้อ 0.6 ก่อน) |
| ทำ local landing page แบบ doorway | โดนลงโทษ | กติกาข้อ 4 + 8.4 |

---

# 13. Timeline สรุป

```
ก.ย. 69   │ สัปดาห์ 1  ██ Phase 0 ปลดบล็อก
          │ สัปดาห์ 2-3 ████ Phase 1 ตั้งฐานข้อมูล
          │ สัปดาห์ 3-5 ██████ Phase 2 On-page
          │ สัปดาห์ 4-6 ████ Phase 3 E-E-A-T
ต.ค. 69   │ สัปดาห์ 5-8 ██████ Phase 4 Local SEO
          │ ───────── Phase 5 Content engine ─────────────────►
พ.ย. 69   │           ─── Phase 6 Off-page & GEO ─────────────►
ธ.ค. 69   │ ◆ ตรวจไตรมาส 1 — ตั้งเป้าตัวเลขจริงจากข้อมูล 3 เดือน
ม.ค.-ก.พ. │ ◆ คาดว่าเริ่มเห็นคำ commercial ติดหน้า 1
70        │ ◆ ตรวจไตรมาส 2 — ประเมินว่าคุ้มลงทุนต่อไหม
```

**ความคาดหวังที่ควรตั้งไว้:** SEO ไทยในสายเอเจนซีที่มีคู่แข่งเยอะ เริ่มจาก property ศูนย์ — **เดือน 1–3 แทบไม่เห็นอะไร** เดือน 4–6 เริ่มเห็นคำ long-tail ติด คำ commercial หลัก (`รับทำเว็บไซต์`) อาจใช้ 9–12 เดือน ใครบอกว่า 3 เดือนติดหน้า 1 คำแข่งสูง คนนั้นกำลังขายของ

---

# 14. สิ่งที่ต้องตัดสินใจ (ค้างอยู่)

| # | เรื่อง | ทางเลือก | ใครตัดสิน |
|---|---|---|---|
| D1 | ซื้อ DataForSEO ไหม | ซื้อ (~$50 เริ่มต้น ได้ volume จริง) / ไม่ซื้อ (ใช้ GSC + Keyword Planner) | เจ้าของ |
| D2 | H1 หน้าบริการ — เพิ่ม `h1_th` หรือใช้ `seo_title` | A / B (ข้อ 6.1) | เจ้าของ |
| D3 | Home เล็งคำไหน | `digital marketing agency กรุงเทพ` หรือ `รับทำเว็บไซต์` — **เลือกได้อย่างเดียว** | เจ้าของ + ข้อมูล Phase 1 |
| D4 | ผู้เขียนบทความคือใคร | Thanakit / แยกตามทีม / persona | เจ้าของ |
| D5 | `/services/automation` แตกเป็น pillar ย่อยไหม | แตก / ไม่แตก | รอข้อมูล Phase 1 |
| D6 | บริการ `production` (draft) จะกลับมาไหม | กลับ / ตัดถาวร | เจ้าของ |
| D7 | ติดตั้ง skill เสริมไหม | `site-architecture` + `ai-seo` จาก skills.sh / ใช้ `bsc-seo-*` ที่มี | เจ้าของ |

---

# 15. ขั้นตอนถัดไปทันที

1. **เจ้าของ:** รัน `node scripts/gsc-oauth.mjs` ← ปลดบล็อกทุกอย่าง
2. **เจ้าของ:** ทำ Phase 0 ข้อ 0.2–0.7
3. **เจ้าของ:** ตอบ D2, D3, D4 (ไม่ต้องรอข้อมูลก็ตอบได้)
4. **ผม:** พอ GSC ต่อได้ → ดึงข้อมูล → ทำ Phase 1 → ส่ง keyword map v2
5. **ผม:** เริ่ม Phase 2 ข้อ 6.2 (anchor text) และ 6.3 (cluster linking) คู่ขนานได้เลย — ไม่ต้องรอข้อมูล
