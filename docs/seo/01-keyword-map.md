# 01 — Keyword Map

สถานะ: **LOCKED (qualitative)** — 2026-05-16. Intent + priority เชิงคุณภาพจาก slug จริงใน DB.
Volume/difficulty ยัง TBD (รอ DataForSEO หรือ GSC data หลัง index — validate รอบหน้าแล้วเปลี่ยนเป็น LOCKED+volume).

Services จริงใน DB = **6** (ไม่มี ai-email ตามที่ CLAUDE.md เคยระบุ 7 — อัปเดตตามจริง).

## Static / list pages (ปรับใน `web/messages/th.json` แล้ว — deployed ✅)

| Page | URL | Primary KW | Secondary | Intent |
|---|---|---|---|---|
| Home | `/th` | digital marketing agency กรุงเทพ | บริษัทรับทำเว็บไซต์, การตลาดออนไลน์ครบวงจร | brand/commercial |
| About | `/th/about` | ดิจิทัลเอเจนซี ธุรกิจไทย | ทีมการตลาดออนไลน์ | brand/trust |
| Services | `/th/services` | บริการรับทำเว็บไซต์ SEO โฆษณา | digital marketing ครบวงจร | commercial |
| Blog | `/th/blog` | บทความ SEO การตลาดออนไลน์ | (cluster — S3) | informational |
| Portfolio | `/th/portfolio` | ผลงานเว็บไซต์ SEO | case study การตลาด | commercial proof |
| Contact | `/th/contact` | ติดต่อ ปรึกษาการตลาดออนไลน์ฟรี | นัดคุยฟรี | transactional/lead |

## Service detail (slug จริง) — recommended seo_title / seo_description

> ใส่ลง DB คอลัมน์ `services.seo_title` / `services.seo_description` (CMS field, แก้ทีหลังได้)
> title ≤ ~43 (template ` · Best Solutions` +17 → ≤60) · desc ≤160 · primary KW ขึ้นต้น

| slug | Primary KW | seo_title (แนะนำ) | seo_description (แนะนำ) |
|---|---|---|---|
| `web-design` | รับทำเว็บไซต์ | รับทำเว็บไซต์ กรุงเทพฯ ออกแบบเว็บธุรกิจ | รับทำเว็บไซต์สำหรับธุรกิจไทย ดูน่าเชื่อถือ โหลดเร็ว รองรับมือถือ วางโครงสร้าง SEO พร้อมต่อยอดการตลาดออนไลน์ ปรึกษาฟรี |
| `seo` | รับทำ SEO | รับทำ SEO ติดอันดับ Google สายขาว | รับทำ SEO สายขาวสำหรับธุรกิจไทย วาง keyword on-page technical และคอนเทนต์ ติดอันดับ Google อย่างยั่งยืน รายงานผลทุกเดือน |
| `paid-ads` | รับยิงแอด | รับยิงแอด Facebook & Google โฆษณาออนไลน์ | รับยิงแอด Facebook และ Google สำหรับธุรกิจไทย วาง funnel กลุ่มเป้าหมาย ทดสอบครีเอทีฟ คุม ROAS/CPA ปรับจากข้อมูลจริงทุกสัปดาห์ |
| `social-media` | รับดูแลเพจ | รับดูแลเพจ Facebook & โซเชียลมีเดีย | รับดูแลเพจ Facebook และโซเชียลมีเดียสำหรับธุรกิจไทย วาง content pillar ผลิตคอนเทนต์รายเดือน ดูแล inbox และรายงานผล |
| `automation` | ระบบ automation ธุรกิจ | วางระบบ Automation & AI ให้ธุรกิจ | วางระบบ Automation และ AI ลดงานซ้ำให้ธุรกิจไทย เชื่อม CRM/LINE/Email ตอบลูกค้าอัตโนมัติ ออกแบบ workflow ตามงานจริง |
| `production` | รับถ่ายวิดีโอ | รับถ่ายวิดีโอ & ผลิตคอนเทนต์ธุรกิจ | รับถ่ายวิดีโอและผลิตคอนเทนต์สำหรับธุรกิจไทย วาง concept ถ่ายทำ ตัดต่อ ส่งมอบไฟล์พร้อมลงทุกแพลตฟอร์ม |

สถานะ: ยัง **ไม่ใส่ DB** (seo_title/seo_description = NULL ทุก row) → รอผู้ใช้อนุมัติ apply ผ่าน Supabase. ปัจจุบัน fallback = `name_th` (ไม่ซ้ำแบรนด์แล้ว แต่ยังไม่ KW-front).
