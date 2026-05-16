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

## Baseline number (ใช้เทียบ KPI §8)

| Metric | Baseline (2026-05-16) | Source |
|---|---|---|
| Organic clicks /mo | 0 (no data) | GSC |
| Organic impressions /mo | 0 (no data) | GSC |
| Keywords in top 10 | 0 | GSC |
| Indexed pages (เว็บใหม่) | TBD — หลัง deploy + submit sitemap | GSC Coverage |
| Lighthouse/CWV | TBD — รันหลัง deploy (qa-tester, PSI) | PSI |
| GA4 organic sessions | TBD — รอ GA4 setup + tag | GA4 |

## ต้องทำต่อ
- [ ] หลัง deploy เว็บใหม่ (โดเมนจริง) → submit `sitemap.xml` ใน GSC, เริ่มสะสม data
- [ ] ตั้ง pull รายเดือน → `docs/seo/07-kpi-monthly/YYYY-MM.md` (script พร้อมแล้ว)
- [ ] GA4 + PSI key (ดู `00-strategy.md` §10) — ยังไม่ตั้ง
- [ ] 🔴 `NEXT_PUBLIC_SITE_URL` ต้องเป็นโดเมนจริงตอน deploy (ดู `03-technical-audit.md`)
