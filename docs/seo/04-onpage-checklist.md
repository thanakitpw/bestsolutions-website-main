# 04 — On-page checklist + internal linking

## Title / desc / H1 audit (verified บน build, 2026-05-16)

| Page | title len | ≤60 | 1×H1 | desc len ≤160 | brand 1× |
|---|---|---|---|---|---|
| /th | 57 | ✅ | ✅ | 117 ✅ | ✅ |
| /th/about | 60 | ✅ | ✅ | 134 ✅ | ✅ |
| /th/services | 57 | ✅ | ✅ | 147 ✅ | ✅ |
| /th/services/web-design | 60 | ✅ | ✅ | 128 ✅ | ✅ |
| /th/services/seo | 41 | ✅ | ✅ | 95 ✅ | ✅ |
| /th/services/paid-ads | 50 | ✅ | ✅ | 84 ✅ | ✅ |
| /th/services/social-media | 34 | ✅ | ✅ | 80 ✅ | ✅ |
| /th/services/automation | 41 | ✅ | ✅ | 100 ✅ | ✅ |
| /th/services/production | 45 | ✅ | ✅ | 83 ✅ | ✅ |
| /th/blog | 57 | ✅ | ✅ | 137 ✅ | ✅ |
| /th/portfolio | 55 | ✅ | ✅ | 124 ✅ | ✅ |
| /th/contact | 52 | ✅ | ✅ | 141 ✅ | ✅ |

ทุกหน้าผ่าน: title ≤60, 1×H1, desc ≤160, แบรนด์ไม่ซ้ำ. แก้ service-detail double-brand แล้ว (code: title ไม่ผูกแบรนด์, ปล่อย root template เติม).

ค้าง: service-detail seo_title ยังเป็น `name_th` ไม่ใช่ primary KW (รับทำ SEO / รับยิงแอด / รับดูแลเพจ / รับถ่ายวิดีโอ) — ใส่ DB ตาม `01-keyword-map.md` (รอ approve).

## Internal-link matrix (target สำหรับ S2/S3)

Hub = service detail. ทุก service ↔ portfolio (case ที่เกี่ยว) ↔ blog cluster ↔ /contact.

| Service | → Portfolio (category) | → Blog cluster (S3) | → CTA |
|---|---|---|---|
| web-design | Web Design / E-Commerce | "ราคาทำเว็บ", "WordPress vs custom", "checklist จ้างทำเว็บ" | /contact |
| seo | SEO | "SEO กี่เดือนเห็นผล", "SEO สายขาวคืออะไร", "ราคา SEO" | /contact |
| paid-ads | Online Marketing | "งบยิงแอดเริ่มเท่าไหร่", "ROAS ที่ดี", "Meta vs Google Ads" | /contact |
| social-media | Online Marketing / Branding | "คอนเทนต์เพจร้านค้า", "ดูแลเพจเองหรือจ้าง" | /contact |
| automation | (Web/Marketing) | "Automation ลดงานอะไรได้", "n8n/Make เริ่มยังไง" | /contact |
| production | Video & Content | "วิดีโอแบบไหนเหมาะธุรกิจ", "ราคาถ่ายวิดีโอ" | /contact |

สถานะ implement:
- [ ] เพิ่ม internal link service↔related portfolio (filter by `category`) — code/data
- [ ] service↔blog cluster — ทำตอน S3 (มีบทความก่อน)
- [x] ทุกหน้า → /contact CTA (มีอยู่แล้วในทุก page)
- [ ] anchor text เชิงคำค้น (ไม่ใช่ "อ่านเพิ่มเติม" ลอย ๆ)
