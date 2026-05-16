# 02 — Baseline Snapshot (S0)

บันทึกสถานะ **ก่อนเริ่ม execute** เพื่อใช้เทียบ KPI (§8 strategy)

วันที่ snapshot: _(กรอกเมื่อมี data)_

## ⚠️ Blocked — ต้องมี API/บัญชี

| ข้อมูล | เครื่องมือ | สถานะ |
|---|---|---|
| Organic clicks/impressions/position | Google Search Console API (OAuth) | ⛔ รอ key/verify property |
| Organic sessions / conversion | GA4 Data API (service account) | ⛔ รอ key |
| Index coverage | GSC | ⛔ รอ |
| Keyword ranking ปัจจุบัน | DataForSEO / rank tracker | ⛔ รอ key |
| AI citation baseline (10–20 query) | DIY (provider API) / Otterly | ⛔ รอ |

## ทำได้เลย (ไม่ต้อง key)

- [ ] Lighthouse/PSI snapshot หน้า production ปัจจุบัน (Perf/SEO/A11y + CWV)
- [ ] นับหน้าใน sitemap.xml ปัจจุบัน
- [ ] บันทึก URL/slug structure เดิม (สำหรับ redirect map)

> โปรดแจ้งว่ามี GSC/GA4/DataForSEO key หรือบัญชีไหนพร้อม → จะ integrate และเติม baseline
