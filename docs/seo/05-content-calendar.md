# 05 — Content Calendar + Plan (S3 Phase C)

สถานะ: **PLAN — รออนุมัติ cadence ก่อนเริ่มเขียน** (2026-05-16)

## วัตถุประสงค์
สร้าง blog cluster ที่ดักคนค้นหา → ดึงเข้า service/contact (SEO-first). บทความเขียนเต็มลง blog ก่อน แล้ว **ย่อเป็นโพสต์ FB เพจ** (repurpose, ไม่เขียนซ้ำ).

## โมเดล
- Pillar = service page (มีแล้ว 6). Cluster = บทความ blog 3–5 ชิ้น/service ตอบคำถามก่อนซื้อ → link กลับ pillar + /contact
- 1 บทความ blog → repurpose 1–3 โพสต์ FB (สรุป/มุมเดียว/อินโฟ) ลิงก์กลับบทความ

## ⚠️ Cadence — คำแนะนำ (ผู้ใช้ขอ 3–4/วัน)

3–4/วัน เสี่ยง Scaled Content Abuse + คุมคุณภาพไม่ไหวบนเว็บ authority 0. แผนเร่ง-แต่-ปลอดภัย:

| ช่วง | บทความ/วัน | /สัปดาห์ | เงื่อนไขผ่านไปขั้นถัดไป |
|---|---|---|---|
| **Ramp (สัปดาห์ 1–2)** | 1–2 | 7–10 | บทความผ่าน quality gate 100%, GSC เริ่ม index, ไม่มี manual action |
| **Scale (สัปดาห์ 3–6)** | 2–3 | ~15 | index ต่อเนื่อง, ไม่มีสัญญาณ thin/duplicate, มี backlog พร้อม |
| **Sustain (เดือน 2+)** | 3–4 *เฉพาะถ้าคุณภาพคงที่* | ~20 | คุณภาพไม่ตก + เริ่มมี impression/ranking |

หลักการ: **gate ที่คุณภาพ ไม่ใช่ปริมาณ** — ถ้า batch ไหนคุณภาพตก หยุด scale. ทุกบทความต้องผ่าน checklist ก่อน publish (ไม่ auto-publish รัว)

## Pillar ratio (ต่อ ~10 บทความ)
- 6 = Cluster ตอบ intent ก่อนซื้อ (transactional-support) — ดึง lead
- 3 = ให้ความรู้กว้าง (informational) — ดึง traffic + AI citation
- 1 = Trust/case/behind-the-scenes — E-E-A-T + repurpose เพจดี

## Topic backlog (priority — web-design + paid-ads ก่อนตามแผน)

### web-design cluster
1. รับทำเว็บไซต์ธุรกิจ ราคาเท่าไหร่ 2026 (transactional) ★
2. จ้างทำเว็บ vs ทำเอง (Wix/WordPress) แบบไหนคุ้ม
3. Checklist 10 ข้อก่อนจ้างบริษัททำเว็บ
4. เว็บไซต์ที่ติด SEO ต้องมีอะไรบ้าง
5. เว็บโหลดช้าเสียลูกค้าอย่างไร + แก้ยังไง

### paid-ads cluster
1. งบยิงแอด Facebook เริ่มเท่าไหร่ถึงพอ ★
2. ROAS เท่าไหร่ถึงเรียกว่าคุ้ม (พร้อมวิธีคิด)
3. ยิงแอดเองทำไมไม่ออกผล — 7 จุดพลาด
4. Facebook Ads vs Google Ads ธุรกิจไหนควรใช้อะไร
5. ยิงแอดแล้วได้แต่คนทักไม่ซื้อ แก้ยังไง

(ขยาย seo / social-media / automation / production cluster รอบถัดไป — เก็บใน backlog เดียวกัน)

## Workflow ต่อบทความ
1. **Brief** (seo-strategist mindset): primary KW, intent, outline H2, internal-link targets, meta (seo_title ≤43 / seo_description ≤160)
2. **Draft** ไทย-first 1,200–1,800 คำ — E-E-A-T, ตอบ intent, ไม่ AI-ish (skill `avoid-ai-writing` / `copywriting`)
3. **On-page**: 1×H1, hierarchy, KW ใน title/H1/ย่อหน้าแรก/slug, anchor เชิงคำค้น, link → pillar + /contact
4. **Schema**: ArticleJsonLd (auto) + FaqJsonLd ถ้ามี Q&A
5. **รูป**: ⛔ ยังไม่ตัดสินวิธี → ใช้ brand default OG ชั่วคราว (ไม่บล็อก)
6. **Insert** Supabase `articles` (status='published', slug ไทย URL-encoded, author_name, published_at)
7. **Verify**: sitemap auto, Rich Results, title≤60, build ผ่าน
8. **Repurpose FB**: ย่อ 1–3 โพสต์ (hook + ค่าสั้น + CTA ลิงก์บทความ) — เก็บใน `docs/seo/fb-posts/`

## Quality gate (ผ่านทุกข้อก่อน publish)
- [ ] ตอบ search intent ตรง ภายใน 1 หน้าจอแรก
- [ ] ข้อมูลจริง/มีประสบการณ์ ไม่ใช่ generic AI
- [ ] ไม่ซ้ำกับบทความอื่น (ไม่ keyword cannibalization)
- [ ] 1×H1, heading ถูก, internal link ≥2 (pillar + 1)
- [ ] title ≤60, meta desc ≤160, slug สื่อความ
- [ ] อ่านลื่นภาษาไทย ไม่มีรูป AI-pattern (skill avoid-ai-writing)

## ค้างตัดสิน
1. **Cadence** — ยืนยันเริ่มที่ Ramp 1–2/วัน (แนะนำ) หรือยืน 3–4/วันตั้งแต่แรก (เสี่ยง)
2. **รูป cover/OG** — AI API / HTML→screenshot / default ชั่วคราว
3. **Author** — "Admin" (อ่อน E-E-A-T) vs Thanakit/ทีม (แนะนำ) — ตั้ง author bio + Person schema ด้วยได้
4. **บทความแรก** — เริ่ม batch web-design 1–2 ชิ้นเป็น sample ให้รีวิวก่อน scale

## Tracking
- สถานะแต่ละบทความ: เพิ่มตารางท้ายไฟล์นี้ (topic | slug | status | published | FB done)
- รอบ GSC รายเดือน → ดูบทความไหน impression ขึ้น → ขยาย cluster ตามตัวที่เวิร์ก
