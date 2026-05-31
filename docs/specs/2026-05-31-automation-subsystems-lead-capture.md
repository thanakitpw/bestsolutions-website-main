# Spec — Automation sub-system cards + Lead Capture landing

วันที่: 2026-05-31 · สถานะ: draft (รอเจ้าของรีวิว)

## บริบท & เป้าหมาย

หน้า `/services/automation` กำลังจะกลายเป็น "ฮับ" ของระบบ Automation ย่อยหลายตัว
ที่จะแยกออกไปเป็น **landing page เอาไว้ยิงแอด** ทีละตัว งานรอบนี้ส่งมอบ 2 ชิ้น:

- **A. การ์ดระบบย่อย** บนหน้า `/services/automation` — directory ของระบบ แต่ละการ์ดลิงก์ไป landing
- **B. หน้า Lead Capture landing** ตัวจริง (ไม่ใช่ stub) ที่ `/services/automation/lead-capture` — ระบบแรก

> งานรอบนี้ทำ A + B ให้เสร็จพร้อมกัน เพื่อไม่ให้การ์ดลิงก์ไปหน้า 404 และไม่มีหน้าเปล่า

## การตัดสินใจที่ล็อกแล้ว

| เรื่อง | สรุป |
|---|---|
| ตำแหน่งการ์ดบน automation | section ใหม่ **หลัง "What We Deliver" ก่อน "Process"** |
| โครงไฟล์การ์ด | อยู่ใน `[slug]/page.tsx` เดิม **gate ด้วย `slug === "automation"`** (ไม่แตะหน้าบริการอื่น) |
| Data model การ์ด | **const map** `SUB_SYSTEMS_BY_SLUG` ตาม pattern เดิม (`PROCESS_STEPS_BY_SLUG`, `FAQS_BY_SLUG`) — ไม่แตะ schema |
| โครงไฟล์ landing | **ไฟล์เฉพาะของตัวเอง** ที่ `services/automation/lead-capture/page.tsx` (แบบ `web-design`) |
| เนื้อหา landing | **hardcode ในไฟล์** (bespoke page) |
| Primary CTA | **ทัก LINE** `https://lin.ee/xB314y9` (deep link) — ทุกปุ่มหลัก/final CTA |
| ปุ่ม "ดู Demo" / Demo Preview | **ลิงก์ภายนอก** — เจ้าของส่งลิงก์/รูปมาทีหลัง → ใช้ const `DEMO_URL` + screenshot placeholder |
| SEO landing | **index ปกติ** (คอนเทนต์แน่นพอทำ SEO) — ไม่ noindex |
| Mobile | **ใช้ FAB เดิม** (`FloatingContact` site-wide มี LINE/โทรอยู่แล้ว) + CTA LINE เด่นในหน้า — ไม่ทำ sticky bar แยกเพื่อเลี่ยงชน FAB |
| ราคา | **โชว์บนหน้า** — Lead Capture Starter เริ่ม 12,000–15,000 บาท |

## Artifact A — การ์ดระบบย่อยบน `/services/automation`

ไฟล์: `web/app/[locale]/services/[slug]/page.tsx`

- เพิ่ม const map คีย์ด้วย slug:
  ```ts
  type SubSystem = {
    slug: string;        // → /services/automation/<slug>
    name: string;        // "Lead Capture Automation"
    tagline: string;     // คำโปรย 1 บรรทัด
    bullets: string[];   // 3 จุดเด่น
    icon: ReactNode;     // reuse ServiceIcon หรือ inline svg
  };
  const SUB_SYSTEMS_BY_SLUG: Record<string, SubSystem[]> = { automation: [ … ] };
  ```
- render section ใหม่ **เฉพาะเมื่อ `SUB_SYSTEMS_BY_SLUG[slug]` มีค่า** (ตอนนี้คือ automation เท่านั้น)
- การ์ด: reuse visual `.card.card-service` + ป้าย badge **"ระบบ"** เพื่อแยกจากการ์ดบริการหลัก
- grid 2-up (responsive → 1 คอลัมน์บนมือถือ) รองรับ 1..N การ์ด
- การ์ดเป็น `<article>` ห่อด้วย `<Link>` ไป `/services/automation/<slug>` + `aria-label` ไทย
- CSS เพิ่มเล็กน้อยใน `web/styles/pages/service-single.css` (grid + badge)

**การ์ดแรก (Lead Capture Automation):**
- slug: `lead-capture`
- name: `Lead Capture Automation`
- tagline: `ระบบเก็บ Lead อัตโนมัติ แจ้งเตือนทีมขายผ่าน LINE ทันที`
- bullets: `ฟอร์ม → Google Sheets → LINE เด้งทันที` · `ลด Lead หลุด ตามลูกค้าเร็วขึ้น` · `เริ่มต้น 12,000 บาท`

## Artifact B — หน้า Lead Capture landing

route: `/services/automation/lead-capture`
ไฟล์ใหม่: `web/app/[locale]/services/automation/lead-capture/page.tsx`
CSS ใหม่: `web/styles/pages/lead-capture.css` (+ reuse tokens จาก `service-single.css`)

> ⚠️ Routing check (Next 16): การสร้างโฟลเดอร์ `automation/lead-capture/` โดย **ไม่มี** `automation/page.tsx`
> ต้องไม่ทำให้ `/services/automation` หลุดจาก `[slug]/page.tsx` — verify ตอน build ว่า `/services/automation` ยังเข้าการ์ด/หน้าเดิม

### โครง 12 section (ลำดับ + ชื่อทางการ — ล็อกโดยเจ้าของ)

1. **Hero** — H1 "ระบบเก็บ Lead อัตโนมัติ พร้อมแจ้งเตือนทีมขายผ่าน LINE" · sub "ลูกค้ากรอกฟอร์ม → ข้อมูลเข้า Sheets → LINE เด้งทันที" · CTA `[ทัก LINE ขอปรึกษาฟรี]`(LINE) `[ดู Demo]`(เลื่อนไป #demo) · visual = screenshot/mockup
2. **Pain Point** — "ธุรกิจคุณกำลังเสีย Lead เพราะระบบยัง Manual อยู่หรือเปล่า?" + รายการ pain (ตอบช้า/ก๊อปมือ/ลืมตาม/ไม่รู้สถานะ)
3. **Solution Flow** — flow 5 สเต็ป: รับ Lead → บันทึกข้อมูล → ให้คะแนน → แจ้งเตือน → ติดตามสถานะ
4. **Demo Preview** (`id="demo"`) — "ดูตัวอย่างระบบจริง" + screenshot placeholder + `[เปิดหน้า Demo]` → `DEMO_URL` (`target="_blank" rel="noopener"`)
5. **Benefits** — 4 ข้อ: ลด Lead หลุด · ตามลูกค้าเร็วขึ้น · ลดงาน copy · ดูรายงานได้
6. **เหมาะกับธุรกิจแบบไหน** — chips: คลินิก · โรงเรียน/คอร์ส · ร้านค้าออนไลน์ · ธุรกิจบริการ · B2B
7. **สิ่งที่จะได้รับ** — Form · Google Sheets · LINE Alert · Lead Status · Training · Support
8. **Package / ราคาเริ่มต้น** — Lead Capture Starter เริ่ม 12,000–15,000 บาท + รายการที่รวม + CTA LINE
9. **ขั้นตอนการทำงาน** — 4 ขั้น: คุย Flow → ออกแบบ → ติดตั้ง → สอนใช้งาน — ใช้ **numbered list** (pattern `.process-step` จาก `services/page.tsx`) ให้ landing เบาและต่างจาก carousel บนหน้า service
10. **Trust / ทำไมต้อง Best Solutions** — เข้าใจทั้งเว็บไซต์ + การตลาด + Automation ครบในที่เดียว
11. **FAQ** — reuse `ServicesFAQ` + ชุด FAQ เฉพาะ Lead Capture (ร่าง 5 ข้อ)
12. **Final CTA** — "เริ่มตรวจ Flow รับ Lead ฟรี 30 นาที" + `[ทัก LINE / ขอปรึกษาฟรี]`(LINE)

> เนื้อหาข้างบนเป็น **ร่าง** — ขัดเกลาคำ/keyword ผ่าน content-writer + seo-strategist ตอน build

### Reuse (ตาม convention เดิม)

`Reveal` · `MediaImage` · `ServicesFAQ`+`FAQItem` ·
`ServiceJsonLd`/`BreadcrumbJsonLd`/`FaqJsonLd` · `buildPageMetadata` · `pickLocale` ·
`Link` (`@/i18n/navigation`) · `setRequestLocale` · `TrackView`

### SEO / A11y

- `generateMetadata` ผ่าน `buildPageMetadata` (title ≤60, desc ≤160, canonical, hreflang)
- JSON-LD: `Service` + `BreadcrumbList` (Home › บริการ › AI Automation › Lead Capture) + `FAQPage`
- 1× H1, heading hierarchy ถูก, alt ไทยทุกภาพ, การ์ด/section เป็น semantic elements
- `TrackView` event (เช่น `lead_capture_view`)
- Core Web Vitals: hero image `priority`, ที่เหลือ lazy

## ของที่เจ้าของส่งให้ทีหลัง (ใส่ placeholder ไว้ก่อน)

1. **ลิงก์ Demo** → ตั้ง `DEMO_URL` (ตอนนี้ placeholder; สลับที่เดียว)
2. **Screenshot ระบบ Demo** → `web/public/services/lead-capture-demo.webp` (placeholder)
3. **รูป OG 1200×630** → ถ้ายังไม่มี fallback เป็น OG default ของเว็บ
4. ~~ยืนยันเบอร์โทร~~ → **ใช้ `095-385-4906` (`tel:0953854906`)** ✅ ยืนยันโดยเจ้าของ (CLAUDE.md ที่เขียน 7029 ถือว่าตกรุ่น)

## Out of scope (รอบนี้ไม่ทำ)

- ❌ หน้า Demo จริง (ระบบ form→sheet→LINE ทำงานได้) — เจ้าของทำเองแล้วส่งลิงก์
- ❌ การ์ดระบบย่อยตัวที่ 2+ (โครงรองรับ เพิ่มทีหลังแก้ array บรรทัดเดียว)
- ❌ เลื่อน automation ไปเป็นไฟล์เฉพาะ (ยังอยู่ใน `[slug]` แบบ gate)
- ❌ ฟอร์มรับ lead บน landing (primary CTA = LINE)
- ❌ แปล EN (เนื้อหาไทยก่อน ตาม locale ปัจจุบัน)

## Definition of Done

1. `pnpm lint && pnpm typecheck && pnpm build` ผ่าน
2. `/services/automation` แสดงการ์ด Lead Capture, หน้าบริการอื่นไม่มีการ์ด
3. `/services/automation/lead-capture` แสดงครบ 12 section, ทุก CTA หลักลิงก์ LINE ถูก
4. Routing: `/services/automation` ยังเข้า `[slug]` ปกติ (ไม่ถูก shadow)
5. SEO checklist ผ่าน + Lighthouse ≥ 95 (Perf/SEO/A11y)
6. Screenshot desktop + mobile ส่งเจ้าของยืนยัน
