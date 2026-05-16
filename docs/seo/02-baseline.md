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
