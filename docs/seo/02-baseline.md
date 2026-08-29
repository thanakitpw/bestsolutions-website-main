# 02 — Baseline Snapshot (S0/S2)

วันที่ snapshot: **2026-05-16**

## GSC — เชื่อมแล้ว ✅
- Auth: OAuth (Desktop client, user-owned) — `scripts/gsc.mjs` + `~/.config/bsc/gsc-token.json` (gitignored)
- Property: `sc-domain:bestsolutionscorp.com` — permission `siteOwner`
- ดึง Search Analytics: `node scripts/gsc.mjs query sc-domain:bestsolutionscorp.com <start> <end> <dims>`

## ⚠️ Baseline organic = ไม่มี data
ทุกช่วงที่ query (1 เดือน / 3 เดือน / 6 เดือน / 12 เดือน ย้อนหลัง) → **0 clicks, 0 impressions, 0 rows**.

สาเหตุ: ผู้ใช้ลบ GSC property เก่าแล้วสร้างใหม่ (2026-05-16) → GSC **ไม่ backfill** history; data สะสมจากวันสร้าง property ไปข้างหน้า (lag ~2–3 วัน). History เก่า **หายถาวร** (irreversible — เป็นบทเรียน ไม่ใช่ task).

นัยยะ: เว็บเก่า organic presence ต่ำมาก/แทบไม่มี → **upside สูง, แทบไม่มี downside risk**. ใช้ "0" เป็น baseline จริงได้.

## CWV / Lighthouse baseline (PSI, live, 2026-05-16)
Script: `node scripts/psi.mjs <url>` (key `~/.config/bsc/psi-key.txt`, gitignored)

| Page | Strategy | Perf | SEO | A11y | BP | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| /th | desktop | 98 | 100 | 96 | 100 | 0.6s | 0 | 60ms |
| /th | mobile | — | — | — | — | — | — | — (PSI transient, re-run ที่ QA) |
| /th/services/seo | desktop | 100 | 100 | 95 | 100 | 0.6s | 0 | 60ms |
| /th/services/seo | mobile | ~* | 100 | 95 | 100 | * | 0 | * (partial) |
| /th/blog | desktop | 98 | 100 | 95 | 100 | 0.6s | 0 | 0ms |
| /th/blog | mobile | 95 | 100 | 95 | 100 | 2.7s | 0.029 | 20ms |

สรุป: desktop เยี่ยม (Perf 98–100, SEO 100). mobile blog Perf 95 / LCP 2.7s (ใกล้ขอบ 2.5s — เฝ้าดู). mobile บางหน้า PSI error ชั่วคราว → **re-run ครบที่ QA gate** ก่อน ship (DoD ≥95). ผ่าน threshold §8 (LCP<2.5 ยกเว้น blog mobile 2.7 ต้องจับตา, CLS<0.1 ✅).

## Baseline number (ใช้เทียบ KPI §8)

| Metric | Baseline (2026-05-16) | Source |
|---|---|---|
| Organic clicks /mo | 0 (no data) | GSC |
| Organic impressions /mo | 0 (no data) | GSC |
| Keywords in top 10 | 0 | GSC |
| Indexed pages (เว็บใหม่) | TBD — หลัง deploy + submit sitemap | GSC Coverage |
| Lighthouse/CWV | TBD — รันหลัง deploy (qa-tester, PSI) | PSI |
| GA4 organic sessions | TBD — รอ GA4 setup + tag | GA4 |

## Deploy verified (2026-05-16)
- เว็บ redesign + S1 ขึ้น production `https://www.bestsolutionscorp.com` ✅
- NEXT_PUBLIC_SITE_URL แก้เป็นโดเมนจริงแล้ว → canonical/sitemap/og/robots ถูกต้อง
- sitemap 16 URLs (6 service slug ครบ), non-www→www 307 (ควรเปลี่ยนเป็น 308 ถาวร)

## ต้องทำต่อ
- [ ] submit `sitemap.xml` ใน GSC UI (โดเมนตรงแล้ว — ทำได้)
- [ ] non-www redirect: 307 → ตั้งเป็น permanent (308/301) ใน Vercel Domains
- [ ] ตั้ง pull รายเดือน → `docs/seo/07-kpi-monthly/YYYY-MM.md` (script พร้อมแล้ว)
- [ ] GA4 + PSI key (ดู `00-strategy.md` §10) — ยังไม่ตั้ง
- [ ] 🔴 `NEXT_PUBLIC_SITE_URL` ต้องเป็นโดเมนจริงตอน deploy (ดู `03-technical-audit.md`)

---

# Baseline จริง — ดึงจาก GSC API 2026-08-30

ต่อ GSC ได้แล้วผ่าน service account `gsc-reader@bestsolutions-seo.iam.gserviceaccount.com` (`siteFullUser`, ไม่มีวันหมดอายุ ต่างจาก OAuth ที่หมดทุก 7 วัน)

ช่วงข้อมูล: **2026-05-15 → 2026-08-26** (104 วัน) · property `sc-domain:bestsolutionscorp.com`

## ตัวเลขรวม

| | |
|---|---|
| Impressions | **2,868** |
| Clicks | **14** |
| CTR | **0.49%** |
| คำค้นที่มี impression | 155 |
| หน้าที่มี impression | 26 (จาก 40 ใน sitemap) |

> ⚠️ แก้ความเข้าใจเดิม — `SEO-LOG.md` เคยบันทึกว่า baseline = 0 **ไม่จริง** มีข้อมูลตั้งแต่ 15 พ.ค.

| เดือน | Impressions | Clicks |
|---|---|---|
| พ.ค. 69 (ครึ่งหลัง) | 847 | 4 |
| มิ.ย. 69 | **1,209** | 4 |
| ก.ค. 69 | **273** ⚠️ ตก 77% | 5 |
| ส.ค. 69 | 539 | 1 |

---

## 🔴 F1 — 53% ของ impression ทั้งหมดไปตกที่ URL เก่าที่ตายแล้ว

```
https://bestsolutionscorp.com/our-services/google-ads/   1,508 imp · 0 clicks · pos 59.7
/th/services/paid-ads  (หน้าที่ควรได้ demand นี้)             1 imp · 0 clicks · pos 52.0
```

redirect ทำงาน แต่เป็น **chain 4 ขั้น และขั้นแรกเป็น 307 (ชั่วคราว)**:

```
bestsolutionscorp.com/our-services/google-ads/
  → 307  www.bestsolutionscorp.com/our-services/google-ads/   ← ชั่วคราว
  → 308  /our-services/google-ads
  → 308  /th/services/paid-ads
  → 200
```

**307 = บอก Google ว่า "อย่าย้ายค่าไป ของเดิมอาจกลับมา"** → signal ค้างอยู่ที่ URL เก่าตลอด 3 เดือน หน้าใหม่เลยได้ 1 impression

→ **แก้ 307 เป็น 308 ใน Vercel = งานที่คุ้มที่สุดที่ทำได้ตอนนี้** (Phase 0 ข้อ 0.3 — เดิมจัดไว้เป็นงานรอง ต้องเลื่อนขึ้นเป็นอันดับ 1)

## 🔴 F2 — keyword map เดาผิดคำ

demand จริงกระจุกที่ Google Ads **~1,186 impressions (41% ของทั้งหมด)**:

| คำค้น | imp | pos |
|---|---|---|
| google ads services | 183 | 53.5 |
| รับทำ google ads | 181 | 61.9 |
| รับทำโฆษณา google | 141 | 63.8 |
| รับ ทำ google ads | 92 | 53.5 |
| รับทำโฆษณา google ads | 80 | 62.0 |
| รับทําโฆษณา google ads | 78 | 64.6 |
| รับ ทํา โฆษณา google ads | 77 | 69.7 |
| รับ ทำ โฆษณา google ads | 72 | 63.0 |
| รับทำ google shopping ads | 58 | 42.3 |
| รับ ทำ โฆษณา google shopping | 54 | 50.4 |
| google ads services bangkok / thailand | 100 | 70+ |
| บริการ google ads | 36 | 26.8 |

**`01-keyword-map.md` เลือก "รับยิงแอด" เป็น primary KW ของ `paid-ads` — คำนี้ไม่ปรากฏใน 155 คำค้นเลยสักครั้ง**

คนไทยพิมพ์ **"รับทำ google ads"** และ **"รับทำโฆษณา google"** (พร้อมรูปแบบวรรค/สระผิดอีกหลายแบบ) → ต้องแก้ keyword map + title + H1 ของหน้า `paid-ads`

และบริการนี้คือบริการที่ **ไม่มีบทความรองรับเลยสักบท** (ดู `08` §9.2)

## 🔴 F3 — cannibalization ที่เจอ = www ปะทะ non-www

คำที่ชนกันเอง 9 คำ เกือบทั้งหมดเป็นคำแบรนด์ และคู่ที่ชนคือ `/th` กับ `https://bestsolutionscorp.com/`

```
'best solution'      /th  imp=84 pos=5.5   ·  bestsolutionscorp.com/  imp=24 pos=12.4
'the best solution'  bestsolutionscorp.com/ pos=2.0  ·  /th  pos=20.0
'bestsolution'       /th  pos=3.8          ·  bestsolutionscorp.com/  pos=4.3
```

Google มองว่าเป็น 2 หน้าคนละหน้า **เพราะ redirect เป็น 307** → แก้ F1 แล้วข้อนี้หายไปด้วย

## 🟡 F4 — มี subdomain 2 ตัวที่ index อยู่ ไม่มีใครดูแล

| subdomain | title | สถานะ |
|---|---|---|
| `showcase.bestsolutionscorp.com` | Luxury Automotive Showcase | index ได้ (ไม่มี noindex) · 12 imp · pos 2.4 |
| `ecommerce.bestsolutionscorp.com` | LUXE STORE - ร้านค้าออนไลน์พรีเมียม | index ได้ · 10 imp · 1 click · pos 11.0 |

เป็นเว็บ demo · property เป็นแบบ `sc-domain:` จึงนับรวมมาในรายงานทั้งหมด
คำค้น `luxe store` ติด **pos 2.0** — ร้านค้าปลอมติดอันดับใต้แบรนด์เรา

**ต้องตัดสินใจ:** ใส่ `noindex` / ย้ายไปโดเมนอื่น / หรือเก็บไว้เป็น demo จริงที่ลิงก์จากหน้าผลงาน

## 🟡 F5 — 14 จาก 40 หน้ายังไม่มี impression เลย

หน้าที่ยังไม่ถูกเห็น ได้แก่ บทความส่วนใหญ่ · category hub · privacy/terms (เพิ่ง deploy 29 ส.ค.)
→ ปกติสำหรับหน้าใหม่ · ต้องดูซ้ำอีก 4 สัปดาห์

## 🟢 F6 — ของที่ทำงานอยู่แล้ว

| คำค้น | หน้า | pos | หมายเหตุ |
|---|---|---|---|
| `รับดูแล ig` | social-media | **7.4** | 39 imp · **0 click** → ถัง B แก้ title/desc |
| `seo สำหรับ ธุรกิจ sme` | what-is-seo-for-sme | **10.1** | 52 imp · ดันนิดเดียวขึ้นหน้า 1 |
| `รับดูแลเพจ` | social-media | 27.9 | 92 imp · ถัง A |
| `marketing automation คือ` | what-is-marketing-automation | 21.0 | 43 imp · ถัง A |
| `best solution` | /th | 7.0 | 5 clicks — click ส่วนใหญ่มาจากคำแบรนด์ |

`/th/services/social-media` ได้ **366 impressions** สูงสุดในหน้าที่ยังใช้งานอยู่ → บริการนี้มี demand จริงและก็ **ไม่มีบทความรองรับเลย** เช่นกัน

---

## ลำดับงานที่ข้อมูลนี้บอก (แทนที่ลำดับเดิมใน `08` Phase 0)

| ใหม่ | เดิม | งาน | เหตุผล |
|---|---|---|---|
| **1** | 0.3 | **307 → 308** | ปลดล็อก 1,508 impressions ที่ค้างอยู่ที่ URL เก่า + แก้ cannibalization แบรนด์ |
| **2** | ใหม่ | **แก้ keyword map ของ `paid-ads`** เป็น `รับทำ google ads` | demand 41% ของเว็บอยู่ที่นี่ แต่เราเล็งผิดคำ |
| **3** | ใหม่ | ตัดสินใจเรื่อง subdomain | index อยู่โดยไม่มีใครคุม |
| 4 | 0.2 | submit sitemap | |
| 5 | 0.4–0.6 | GA4 + Google Ads tag | |
| 6 | 0.7 | ตรวจ GBP | |
