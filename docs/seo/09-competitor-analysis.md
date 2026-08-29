# 09 — Competitor Analysis

วัดเมื่อ 2026-08-30 · วิธีวัด: ดึง sitemap จริง + parse HTML หน้าเว็บคู่แข่ง (ไม่ใช่ข้อมูลจากเครื่องมือเสียเงิน)

> ⚠️ ยังไม่มีข้อมูล **อันดับจริง** ของคู่แข่ง (ต้องมี GSC/rank data ก่อน) เอกสารนี้วัดสิ่งที่วัดได้ฟรี = โครงสร้างเว็บ ปริมาณคอนเทนต์ schema และกลยุทธ์ที่อ่านออกจากผัง URL

---

## 1. แบ่งคู่แข่งเป็น 2 กลุ่ม — สำคัญมาก

เจอตอนวัด: เอเจนซีในกรุงเทพฯ แยกเป็นสองตลาดที่แทบไม่ทับกัน ดูจากปริมาณอักษรไทยบนหน้าแรก

### Tier A — แข่งกับเราตรง ๆ (ตลาดไทย SME)

| เว็บ | URL ใน sitemap | อักษรไทยหน้าแรก | จุดยืน |
|---|---|---|---|
| **anga.co.th** | **606** | **41,162** | เอเจนซีไทยเต็มตัว SEO+Ads+AI · คู่แข่งใกล้สุด |
| aun-thai.com | 363 | 6,758 | ทุนญี่ปุ่น เจาะตลาดไทย · โครงหน้าบริการแน่นสุด |
| nerdoptimize.com | 296 | 7,714 | SEO เป็นหลัก · เน้น data/research |
| seoplanmedia.com | 4 | 10,522 | เว็บเล็กมาก เน้นราคาถูก |

### Tier B — คนละตลาด (ต่างชาติ/expat ในกรุงเทพฯ)

| เว็บ | URL | อักษรไทยหน้าแรก | หมายเหตุ |
|---|---|---|---|
| primal.co.th | 1,575 | **26** | ใหญ่สุด แต่ทำภาษาอังกฤษ |
| digitalagencybangkok.com | 892 | **32** | อังกฤษล้วน |
| searchstudio.co.th | 306 | **257** | อังกฤษเป็นหลัก |

> **อย่าเอา Tier B มาเป็นเกณฑ์** — เขาขายให้บริษัทต่างชาติในไทย คำค้นคนละชุด (`digital marketing agency bangkok` ไม่ใช่ `รับทำเว็บไซต์`) การไปเทียบ primal ที่มี 1,575 หน้าแล้วท้อ เป็นการเทียบผิดคน

---

## 2. ช่องว่างเชิงปริมาณ

```
bestsolutionscorp.com     40 URL   ← เรา
seoplanmedia.com           4 URL
nerdoptimize.com         296 URL   ×7
aun-thai.com             363 URL   ×9
anga.co.th               606 URL   ×15
```

**ความยาวบทความ** (ของเรา 4,400–10,700 ตัวอักษร):

| บทความคู่แข่ง | ตัวอักษร |
|---|---|
| nerdoptimize — `how-much-does-a-website-cost` | **35,593** |
| anga — `what-is-brand-mention` | **19,163** |
| nerdoptimize — `keyword-research-strategy` | 5,016 |

บทความ "ราคาทำเว็บเท่าไหร่" ของ nerdoptimize ยาว **35k ตัวอักษร** — เป็นคำค้น commercial ที่เราอยากได้ และเรายังไม่มีบทความนี้เลย

---

## 3. กลยุทธ์ที่อ่านออกจากผัง URL — 6 อย่างที่เราไม่มี

### 3.1 แตกหน้าบริการเป็นหน้าย่อยจำนวนมาก ⭐ ช่องว่างใหญ่สุด

เรามีหน้าบริการ **5 หน้า** (1 หน้า/บริการ) คู่แข่งแตกเป็นหลายสิบ

**aun-thai.com — 37 หน้า `/services/`** แตกย่อยใต้บริการหลัก:
```
/services/seo/seo-package/          /services/seo/seo-consultation/
/services/seo/backlink-building/    /services/seo/seo-premium/
/services/seo/seo-content-creation/ /services/seo/seo-web-creation/
/services/google-ads/search-ads/    /services/google-ads/youtube/
/services/google-ads/shopping-ads/  /services/google-ads/app-campaigns/
/services/web-creative/web-design-development/
/services/web-creative/web-package-wordpress/
/services/web-creative/web-based-application/
```
→ SEO อย่างเดียวมี **6 หน้า** เรามี 1

**anga.co.th — ~28 หน้าบริการที่ root** แต่ละหน้า = คำค้น commercial หนึ่งคำ:
```
ตามช่องทาง : /seo/ /google-ads/ /facebook-ads/ /tiktok-ads/ /youtube-ads/
             /native-ads/ /programmatic-ads/ /cpas-marketing/
ย่อยใต้ SEO : /seo-ecommerce/ /seo-technical-audit/ /seo-blog-content/
             /backlink-building/ /increase-website-traffic/
ตาม AI ใหม่ : /aeo/ /geo/ /ai-search/
อื่น ๆ      : /lead-generation/ /content-marketing-service/ /kol-marketing-service/
             /short-video-service/ /website-development/ /pr-news-advertorial-news/
```

### 3.2 หน้าบริการแยกตาม "อุตสาหกรรม" ⭐ โอกาสที่เรามีของอยู่แล้ว

```
anga         : /healthcare-marketing/ /real-estate-marketing/
               /aesthetic-clinic-marketing/ /b2b-marketing/
nerdoptimize : /marketing/aesthetic-clinic-marketing-strategies/
               /seo/aesthetic-clinic-marketing-guide/
```

**คลินิกความงามคือ vertical ที่ทั้งสองเจ้าลงแรงหนัก** — และเรามีเคสจริงอยู่แล้ว 2 เคส (`natchaya-clinic`, `orange-smile-dental`) แต่ไม่มีหน้าที่เล็งคำค้นนี้เลย

### 3.3 Case study ตั้งชื่อตามผลลัพธ์ ไม่ใช่ชื่อลูกค้า

anga มี case study **~28 หน้า** ตั้งชื่อแบบนี้:
```
seo-results-for-teethtalk-clinic       seo-results-for-naruchon-clinic
increase-seo-conversion-for-dental-clinic
increase-organic-leads-by-seo-marketing
increase-quality-lead-and-conversion-by-google-ads
increase-revenue-for-supplementary-food
```
เราตั้งชื่อตามลูกค้า (`aira-factoring`) ซึ่งไม่มีใครค้นหา · ของเขาเล็งคำค้นตรง ๆ ว่าลูกค้าอยากได้อะไร
เรามี 7 เคส เนื้อหา 281–674 ตัวอักษร

### 3.4 หน้าโปรไฟล์ทีมรายคน — E-E-A-T ระดับสเกล

anga มีหน้าทีม **~70 หน้า** (1 หน้า/คน) · nerdoptimize มี `/award/` เก็บรางวัลที่ได้ (APAC Search Awards, Global Search Awards)

เรามี author entity ที่**ผิดชนิด** — บทความ 16 บทใส่ `Person` ชื่อ "Best Solutions" ซึ่งเป็นชื่อองค์กร (ดู G5 ใน master plan)

### 3.5 FAQ เป็นหน้าแยก ไม่ใช่แค่ accordion

anga มี FAQ **~30 หน้า** แยก URL ครอบ 2 กลุ่ม:
- **เชิงเทคนิค:** `faq/google-ads`, `faq/backlink`, `faq/technical-audit`, `faq/tiktok-ads`, `faq/monthly-report`
- **เชิงความไว้ใจ:** `faq/what-happens-to-my-data-after-contract-ends`, `faq/is-nda-legally-binding`, `faq/who-can-access-my-sensitive-information`, `faq/what-is-considered-confidential-information`

กลุ่มหลังน่าสนใจมาก — เป็นความกังวลจริงของคนจ้างเอเจนซีที่ไม่มีใครเขียนถึง เราตอบได้ในฐานะเอเจนซีเล็กที่ดูแลใกล้ชิด

### 3.6 ลงหนักที่ AI Search / GEO

```
anga : /ai/ 20 หน้า + /aeo/ + /geo/ + /ai-search/
       120-days-to-win-ai-search · digital-pr-for-ai-search
       content-refresh-for-ai-seo · how-to-get-ai-citation-on-lemon8
       social-media-content-for-ai-search · ai-search-visibility-success-case
nerdoptimize : /research/how-ai-overview-works-and-pathways-to-aio-visibility/
       /research/ai-crawlers-generative-ai/ /seo/generative-engine-optimization/
       /seo/what-is-ask-engine-optimization/
```

เรามี `llms.txt` แล้วแต่**ยังไม่มีคอนเทนต์เรื่องนี้เลยสักชิ้น** — และนี่เป็นสนามที่ยังใหม่พอจะแทรกได้

---

## 4. โครงสร้าง URL — เขาไม่ใช้ `/blog/`

| เว็บ | โครง |
|---|---|
| anga | `/seo/` 171 · `/marketing/` 159 · `/advertising/` 45 · `/ai/` 20 · `/martech/` 18 · `/google-ads/` 10 · `/agency-life/` 12 |
| nerdoptimize | `/seo/` 133 · `/marketing/` 33 · `/ai/` 22 · `/tools/` 15 · `/cro/` 13 · `/website/` 10 · `/research/` · `/award/` |
| aun-thai | `/blog/seo-blog/` · `/blog/marketing-blog/` · `/services/` 37 · `/case-study/` 7 |
| **เรา** | `/blog/` ทั้งหมด + `/blog/category/*` (เพิ่งทำ) |

คู่แข่งสองเจ้าใช้ **topic silo ที่ root** (`/seo/xxx`) แทน `/blog/xxx` → ส่งสัญญาณ topical authority ชัดกว่า

> ⚠️ **ยังไม่แนะนำให้เราย้าย** — เรามีแค่ 16 บทความ การย้าย URL ต้อง redirect ทั้งหมดและมีความเสี่ยง ค่อยพิจารณาตอนมี 50+ บท และควรตัดสินจากข้อมูล GSC ไม่ใช่เพราะคู่แข่งทำ

---

## 5. Schema ที่คู่แข่งใช้แต่เราไม่มี

| Schema | ใครใช้ | เราควรใช้ไหม |
|---|---|---|
| `OfferCatalog` + `Offer` | anga | ✅ ควร — เรามี `pricing_tiers` ใน DB อยู่แล้ว |
| `AggregateRating` | anga, primal | ⚠️ **ห้าม** — self-serving review บน LocalBusiness ผิด policy Google · ให้ดึงจาก Google Business Profile แทน |
| `Person` (ทีมงานจริง) | anga, nerdoptimize | ✅ ควร — ผูกกับ G5 |
| `FAQPage` แยกหน้า | anga | ✅ ควร |
| `ProfessionalService` | nerdoptimize | ✅ มีแล้ว |

---

## 6. โอกาสได้ backlink — คู่แข่งเป็นคนแจกเอง

anga, nerdoptimize, searchstudio ต่างเขียนบทความ **"15 บริษัทรับทำ SEO ในไทย"** / **"Top 20 SEO Agencies Thailand"**

```
https://nerdoptimize.com/seo/seo-agency-thailand/
https://anga.co.th/seo/best-thai-seo-agencies/
https://searchstudio.co.th/agency/top-seo-agencies-thailand/
```

บทความพวกนี้อัปเดตทุกปีและรับสมัครรายชื่อเข้าไป → **ติดต่อขอให้พิจารณาใส่ชื่อ Best Solutions** เป็น backlink คุณภาพสูงจากเว็บในสายเดียวกัน ต้นทุน = อีเมลฉบับเดียว

(และเป็นรูปแบบคอนเทนต์ที่เราทำเองได้ด้วย)

---

## 7. สรุปสิ่งที่ควรทำ — เรียงตามคุ้ม

| # | ทำอะไร | อ้างอิง | ทำไมคุ้ม |
|---|---|---|---|
| C1 | **แตกหน้าบริการย่อย** จาก 5 → 12–15 หน้า | §3.1 | คำค้น commercial intent สูง เขียนสั้นกว่าบทความ ปิดการขายได้เร็ว |
| C2 | **หน้า vertical คลินิก/ความงาม** | §3.2 | มีเคสจริง 2 เคสรองรับแล้ว · คู่แข่ง 2 เจ้าลงแรงหนัก = มีดีมานด์จริง |
| C3 | **เขียน case study ใหม่ตั้งชื่อตามผลลัพธ์** | §3.3 | 7 เคสที่มีอยู่ยังบางและตั้งชื่อไม่มีคนค้น |
| C4 | **บทความ "ราคา..."** ทุกบริการ | §2 | คู่แข่งเขียน 35k ตัวอักษร = คำนี้มีคนค้นเยอะจริง เรามี 2 บทเรื่องราคา |
| C5 | **FAQ เชิงความไว้ใจเป็นหน้าแยก** | §3.5 | ไม่มีใครไทยเขียน · เอเจนซีเล็กได้เปรียบเรื่องนี้ |
| C6 | **คอนเทนต์ AI Search / GEO** | §3.6 | สนามใหม่ · เรามี llms.txt แล้วแต่ไม่มีคอนเทนต์ |
| C7 | **author/team page** | §3.4 | แก้ schema ที่ผิดอยู่ไปในตัว |
| C8 | **ขอลง listicle ของคู่แข่ง** | §6 | backlink คุณภาพสูง ต้นทุนเกือบศูนย์ |

---

## 8. สิ่งที่ยังไม่รู้ (ต้องมี GSC ก่อน)

- คู่แข่งติดอันดับคำไหนจริง ตำแหน่งเท่าไหร่
- คำไหนที่เราติดอยู่แล้วแต่ยังไม่รู้ตัว
- คู่แข่งมี backlink จากไหน (GSC Links ให้ดูของเราเอง · Bing Webmaster ให้ดูเพิ่มได้ฟรี)
- ปริมาณ traffic จริงของคู่แข่ง (ต้องใช้เครื่องมือเสียเงิน — **ไม่จำเป็น** ข้อมูลโครงสร้างข้างบนพอตัดสินใจแล้ว)

## 9. รอบตรวจถัดไป

ทุกไตรมาส — รัน `python3 /tmp/comp.py <domain>` ซ้ำ ดูว่า sitemap โตขึ้นกี่ URL เขาออกหน้าบริการใหม่อะไร (ควรย้าย script เข้า `scripts/` ถ้าจะใช้ต่อจริง)
