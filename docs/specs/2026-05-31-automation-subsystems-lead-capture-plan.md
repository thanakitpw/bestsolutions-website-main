# Automation Sub-system Cards + Lead Capture Landing — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** เพิ่มการ์ดระบบย่อยบนหน้า `/services/automation` และสร้างหน้า Lead Capture landing ตัวจริงที่ `/services/automation/lead-capture`

**Architecture:** การ์ดอยู่ใน `[slug]/page.tsx` เดิม gate ด้วย `slug === "automation"` (const map ตาม pattern เดิม) — landing เป็นไฟล์ static segment ของตัวเอง (override `[slug]`) reuse class `ss-*` จาก `service-single.css` + CSS เฉพาะใน `lead-capture.css` ใหม่ เนื้อหา hardcode, conversion = LINE deep link

**Tech Stack:** Next.js 16 (App Router, Turbopack) · TS strict · CSS tokens (`globals.css`) · next-intl · next/image (`MediaImage`) · JSON-LD helpers

> **หมายเหตุการปรับ TDD:** repo นี้ไม่มี unit test สำหรับ page (DoD = `pnpm lint` + build + browser + Lighthouse) — step "test" ในแผนนี้จึงเป็น typecheck/lint/build + ตรวจ dev server จริง ตาม DoD ของโปรเจค ไม่ใช่ unit test ปลอม

## Deviations from spec (ตัดสินใจตอนเขียนแผน — แจ้งเจ้าของ)

1. **ไม่ทำ sticky CTA bar** → ใช้ FAB เดิม (`FloatingContact` mount ใน `app/[locale]/layout.tsx`, มี LINE/โทร site-wide) เลี่ยงชนกัน
2. **รูป Hero landing** ชั่วคราว reuse `/services/automation-hero-mockup.webp` (มีอยู่แล้ว) จนกว่าจะได้ screenshot จริง
3. **Demo screenshot** ใช้ `MediaImage src={null}` → กล่อง gradient placeholder อัตโนมัติ จนเจ้าของส่งรูป
4. **ปุ่ม "เปิดหน้า Demo"** ชั่วคราวชี้ `DEMO_URL = LINE` (TODO สลับเมื่อได้ลิงก์ demo)
5. **TrackView** reuse `event="service_view"` + `slug="lead-capture"` (ไม่แตะ gtm typing)

## File structure

| ไฟล์ | สถานะ | รับผิดชอบ |
|---|---|---|
| `web/app/[locale]/services/[slug]/page.tsx` | modify | const map `SUB_SYSTEMS_BY_SLUG` + section การ์ด (gated) |
| `web/styles/pages/service-single.css` | modify | `.ss-subsystem-grid` / `.ss-subsystem-badge` |
| `web/components/json-ld.tsx` | modify | export `LandingServiceJsonLd` |
| `web/app/[locale]/services/automation/lead-capture/page.tsx` | create | หน้า landing 12 section |
| `web/styles/pages/lead-capture.css` | create | `lc-*` styles เฉพาะ landing |

---

## Task 1: การ์ดระบบย่อยบน `/services/automation`

**Files:**
- Modify: `web/app/[locale]/services/[slug]/page.tsx`
- Modify: `web/styles/pages/service-single.css`

- [ ] **Step 1: เพิ่ม import `ReactNode`**

แก้บรรทัด import แรกของ `[slug]/page.tsx` — เพิ่มบรรทัดนี้ใต้ `import type { Metadata } from "next";`:

```tsx
import type { ReactNode } from "react";
```

- [ ] **Step 2: เพิ่ม type + ไอคอน + const map** (วางต่อจาก `const FAQS_BY_SLUG = { … };` ก่อน `export default async function ServiceDetailPage`)

```tsx
type SubSystem = {
  slug: string;
  name: string;
  tagline: string;
  bullets: string[];
  icon: ReactNode;
};

const LEAD_CAPTURE_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M3 7l9 6 9-6" /><rect x="3" y="5" width="18" height="14" rx="2" /></svg>
);

const SUB_SYSTEMS_BY_SLUG: Record<string, SubSystem[]> = {
  automation: [
    {
      slug: "lead-capture",
      name: "Lead Capture Automation",
      tagline: "ระบบเก็บ Lead อัตโนมัติ แจ้งเตือนทีมขายผ่าน LINE ทันที",
      bullets: [
        "ฟอร์ม → Google Sheets → LINE เด้งทันที",
        "ลด Lead หลุด ตามลูกค้าเร็วขึ้น",
        "เริ่มต้น 12,000 บาท",
      ],
      icon: LEAD_CAPTURE_ICON,
    },
  ],
};
```

- [ ] **Step 3: ดึง subSystems ใน component** (ใต้ `const faqs = FAQS_BY_SLUG[slug];`)

```tsx
  const subSystems = SUB_SYSTEMS_BY_SLUG[slug];
```

- [ ] **Step 4: แทรก section การ์ด** — วาง **หลัง** `</section>` ของ WHAT WE DELIVER (บรรทัด ~213) และ **ก่อน** comment `{/* ===== PROCESS */}`

```tsx
      {/* ============================================================ SUB-SYSTEMS */}
      {subSystems && (
        <section className="section section-tight ss-subsystems" id="systems" aria-labelledby="systems-title">
          <div className="container">
            <Reveal className="section-header-center">
              <span className="eyebrow-chip">● ระบบที่พร้อมใช้งาน</span>
              <h2 id="systems-title" style={{ margin: "var(--space-4) 0 var(--space-4)" }}>
                ระบบ Automation ย่อยที่แยกใช้งานได้ทันที
              </h2>
              <p className="lead">เลือกเฉพาะระบบที่ธุรกิจคุณต้องการ เริ่มจากระบบเดียวก่อนแล้วค่อยต่อยอด</p>
            </Reveal>

            <Reveal className="ss-subsystem-grid" delay={0.1}>
              {subSystems.map((sys) => (
                <Link
                  key={sys.slug}
                  href={`/services/automation/${sys.slug}`}
                  className="card card-service ss-subsystem-card"
                  aria-label={`ดูรายละเอียดระบบ ${sys.name}`}
                >
                  <div className="card-icon is-orange" aria-hidden="true">{sys.icon}</div>
                  <span className="ss-subsystem-badge">ระบบ</span>
                  <h3 className="card-title">{sys.name}</h3>
                  <p className="card-desc">{sys.tagline}</p>
                  <ul className="service-features">
                    {sys.bullets.map((b) => (
                      <li key={b} className="service-feature">{b}</li>
                    ))}
                  </ul>
                  <span className="card-link">ดูรายละเอียด</span>
                </Link>
              ))}
            </Reveal>
          </div>
        </section>
      )}
```

- [ ] **Step 5: เพิ่ม CSS** — ต่อท้าย `web/styles/pages/service-single.css`

```css
/* ===== Sub-system cards (automation hub) ===== */
.ss-subsystem-grid {
  display: grid;
  gap: var(--space-6);
  grid-template-columns: repeat(auto-fit, minmax(280px, 360px));
  justify-content: center;
}
.ss-subsystem-card { position: relative; }
.ss-subsystem-badge {
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--color-orange-700);
  background: var(--color-orange-50);
  padding: 4px 10px;
  border-radius: var(--radius-full);
}
```

- [ ] **Step 6: Verify** — dev server รันอยู่แล้ว (`bzb8j84ke`, :3000)

```bash
curl -s -o /dev/null -w "automation=%{http_code}\n" http://localhost:3000/th/services/automation
curl -s -o /dev/null -w "seo=%{http_code}\n" http://localhost:3000/th/services/seo
```
Expected: ทั้งคู่ `200`. เปิด browser `http://localhost:3000/th/services/automation` → เห็นการ์ด "Lead Capture Automation" มี badge "ระบบ" หลัง What-We-Deliver ; เปิด `/th/services/seo` → **ไม่มี** การ์ด

- [ ] **Step 7: Commit**

```bash
git add web/app/\[locale\]/services/\[slug\]/page.tsx web/styles/pages/service-single.css
git commit -m "feat(automation): add sub-system cards section (Lead Capture)"
```

---

## Task 2: JSON-LD helper สำหรับ landing

**Files:**
- Modify: `web/components/json-ld.tsx`

- [ ] **Step 1: เพิ่ม export `LandingServiceJsonLd`** — วางต่อจากฟังก์ชัน `ServiceJsonLd` (ราว ๆ บรรทัด 170) ใช้ `SITE_URL`, `ORG_ID`, `JsonLd`, `Json` ที่มีอยู่แล้วในไฟล์

```tsx
export function LandingServiceJsonLd({
  name,
  description,
  path,
  locale,
  priceFrom,
}: {
  name: string;
  description: string;
  path: string;
  locale: string;
  priceFrom?: number;
}) {
  const url = `${SITE_URL}/${locale}${path}`;
  const data: Json = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name,
    description,
    serviceType: name,
    url,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Thailand" },
    ...(priceFrom
      ? { offers: { "@type": "Offer", price: priceFrom, priceCurrency: "THB", url } }
      : {}),
  };
  return <JsonLd data={data} />;
}
```

- [ ] **Step 2: Verify typecheck**

```bash
cd web && pnpm exec tsc --noEmit
```
Expected: ไม่มี error (ถ้า `pnpm typecheck` ไม่มี script ใช้คำสั่งนี้แทน)

- [ ] **Step 3: Commit**

```bash
git add web/components/json-ld.tsx
git commit -m "feat(seo): add LandingServiceJsonLd helper for sub-system landings"
```

---

## Task 3: สร้างหน้า Lead Capture landing

**Files:**
- Create: `web/app/[locale]/services/automation/lead-capture/page.tsx`

- [ ] **Step 1: สร้างไฟล์** ด้วยเนื้อหาทั้งหมดนี้ (ครบ 12 section)

```tsx
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { BreadcrumbJsonLd, FaqJsonLd, LandingServiceJsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { MediaImage } from "@/components/media-image";
import { ServicesFAQ, type FAQItem } from "@/components/services-faq";
import { TrackView } from "@/components/track-view";
import { buildPageMetadata } from "@/utils/metadata";
import "@/styles/pages/service-single.css";
import "@/styles/pages/lead-capture.css";

export const revalidate = 3600;

type Props = { params: Promise<{ locale: string }> };

const PATH = "/services/automation/lead-capture";
const LINE_URL = "https://lin.ee/xB314y9";
const PHONE_TEL = "0953854906";
// TODO(owner): สลับเป็นลิงก์หน้า Demo จริงเมื่อพร้อม (ตอนนี้ชั่วคราวชี้ LINE)
const DEMO_URL = LINE_URL;
const PRICE_FROM = 12000;

const META_TITLE = "ระบบเก็บ Lead อัตโนมัติ แจ้งเตือนผ่าน LINE";
const META_DESC =
  "ระบบเก็บ Lead อัตโนมัติสำหรับธุรกิจ — ลูกค้ากรอกฟอร์ม ข้อมูลเข้า Google Sheets แล้ว LINE เด้งหาทีมขายทันที ลด Lead หลุด เริ่มต้น 12,000 บาท";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, path: PATH, title: META_TITLE, description: META_DESC });
}

const PAIN_POINTS = [
  "ลูกค้าทักมา/กรอกฟอร์ม แต่กว่าทีมจะเห็นก็ช้าไปแล้ว",
  "ต้องคอยก๊อปข้อมูลลง Excel เองทุกครั้ง",
  "ลืมตามลูกค้า ทำให้ Lead เย็นและหลุดไปหาคู่แข่ง",
  "ไม่รู้ว่า Lead แต่ละคนอยู่สถานะไหน ใครตามแล้วบ้าง",
];

const FLOW_STEPS = [
  { n: "01", title: "รับ Lead", desc: "ลูกค้ากรอกฟอร์มจากเว็บ แลนดิ้ง หรือโฆษณา" },
  { n: "02", title: "บันทึกข้อมูล", desc: "ข้อมูลเข้า Google Sheets อัตโนมัติ ไม่ต้องคีย์มือ" },
  { n: "03", title: "ให้คะแนน", desc: "จัดลำดับ Lead ตามเกณฑ์ รู้ว่าใครควรตามก่อน" },
  { n: "04", title: "แจ้งเตือน", desc: "LINE เด้งหาทีมขายทันทีที่มี Lead ใหม่" },
  { n: "05", title: "ติดตามสถานะ", desc: "อัปเดตสถานะ Lead ใหม่/ติดต่อแล้ว/ปิดการขาย ในที่เดียว" },
];

const BENEFITS = [
  { title: "ลด Lead หลุด", desc: "ไม่มี Lead ตกหล่นเพราะลืมหรือตอบช้า" },
  { title: "ตามลูกค้าเร็วขึ้น", desc: "ทีมขายรู้ทันทีที่มี Lead ใหม่ผ่าน LINE" },
  { title: "ลดงาน copy ข้อมูล", desc: "ไม่ต้องคีย์ข้อมูลซ้ำเข้า Excel เอง" },
  { title: "ดูรายงานได้", desc: "เห็นจำนวน Lead และสถานะได้ทุกเมื่อ" },
];

const AUDIENCE = [
  "คลินิก / ความงาม",
  "โรงเรียน / คอร์สเรียน",
  "ร้านค้าออนไลน์",
  "ธุรกิจบริการ",
  "B2B / งานโครงการ",
];

const WHAT_YOU_GET = [
  "ฟอร์มรับ Lead ปรับตามธุรกิจ",
  "เชื่อมต่อ Google Sheets อัตโนมัติ",
  "LINE Alert แจ้งทีมขายทันที",
  "ระบบติดตามสถานะ Lead",
  "สอนใช้งานทีม (Training)",
  "ดูแลหลังติดตั้ง (Support)",
];

const PACKAGE_INCLUDES = [
  "ฟอร์มรับ Lead ปรับตามธุรกิจ",
  "เชื่อม Google Sheets อัตโนมัติ",
  "LINE Alert แจ้งทีมขาย",
  "ระบบติดตามสถานะ Lead",
  "สอนใช้งาน + ดูแลหลังติดตั้ง",
];

const PROCESS_STEPS = [
  { n: "01", title: "คุย Flow รับ Lead", desc: "เข้าใจช่องทางและขั้นตอนรับ Lead ปัจจุบันของธุรกิจคุณ" },
  { n: "02", title: "ออกแบบระบบ", desc: "วาง flow ฟอร์ม → Sheets → LINE และเกณฑ์ให้คะแนน Lead" },
  { n: "03", title: "ติดตั้งและเชื่อมระบบ", desc: "ตั้งค่าฟอร์ม เชื่อม Google Sheets และ LINE แจ้งเตือน" },
  { n: "04", title: "สอนใช้งานทีม", desc: "อบรมทีมขายให้ใช้ระบบเป็น พร้อมดูแลหลังติดตั้ง" },
];

const LEAD_CAPTURE_FAQS: FAQItem[] = [
  { q: "ใช้กับฟอร์มเดิมหรือเว็บเดิมได้ไหม?", a: "ได้ ถ้าฟอร์ม/เว็บมี webhook หรือเชื่อม API ได้ เราจะต่อระบบเข้ากับช่องทางที่คุณใช้อยู่ หากเป็นฟอร์มสำเร็จรูปบางตัวอาจต้องประเมินก่อน" },
  { q: "ต้องใช้ LINE OA ไหม?", a: "แนะนำให้ใช้ LINE Official Account เพื่อรับแจ้งเตือนแบบมืออาชีพ แต่ช่วงเริ่มต้นสามารถแจ้งเข้ากลุ่ม LINE ได้ตามความเหมาะสม" },
  { q: "ราคาเริ่มต้นเท่าไหร่?", a: "แพ็กเกจ Lead Capture Starter เริ่มต้นที่ 12,000–15,000 บาท ขึ้นกับจำนวนช่องทางและความซับซ้อนของ flow" },
  { q: "ติดตั้งนานไหม?", a: "ส่วนใหญ่ใช้เวลาไม่กี่วันถึงประมาณ 1–2 สัปดาห์ ขึ้นกับการเชื่อมระบบเดิมและการปรับ flow" },
  { q: "ดูแลต่อหลังติดตั้งไหม?", a: "มีช่วงสอนใช้งานและดูแลหลังติดตั้ง หากต้องการดูแลต่อเนื่องหรือเพิ่ม flow ใหม่ ทำเป็นรายเดือนได้" },
];

export default async function LeadCapturePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="main" className="service-single lc-page">
      <TrackView event="service_view" slug="lead-capture" />
      <LandingServiceJsonLd name="Lead Capture Automation" description={META_DESC} path={PATH} locale={locale} priceFrom={PRICE_FROM} />
      <FaqJsonLd items={LEAD_CAPTURE_FAQS} />
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: locale === "en" ? "Home" : "หน้าแรก", path: "" },
          { name: locale === "en" ? "Services" : "บริการ", path: "/services" },
          { name: "AI Automation", path: "/services/automation" },
          { name: "Lead Capture Automation", path: PATH },
        ]}
      />

      {/* ===== 1. HERO ===== */}
      <section className="ss-hero" aria-labelledby="hero-title">
        <div className="ss-hero-blob" aria-hidden="true"></div>
        <div className="container">
          <Link href="/services/automation" className="breadcrumb">
            <span aria-hidden="true">←</span>
            <span>AI Automation</span>
          </Link>
          <div className="ss-hero-inner">
            <span className="eyebrow-pill">
              <span className="star">✦</span>
              <span>Lead Capture · Automation</span>
            </span>
            <h1 id="hero-title" className="ss-hero-title">ระบบเก็บ Lead อัตโนมัติ พร้อมแจ้งเตือนทีมขายผ่าน LINE</h1>
            <p className="ss-hero-lead">ลูกค้ากรอกฟอร์ม → ข้อมูลเข้า Google Sheets → LINE เด้งหาทีมขายทันที ไม่พลาดทุก Lead</p>
            <div className="ss-hero-ctas">
              <a href={LINE_URL} target="_blank" rel="noopener" className="btn btn-primary btn-lg btn-arrow">
                <span className="btn-label">ขอปรึกษาฟรี</span>
              </a>
              <a href="#demo" className="btn btn-secondary btn-lg">
                <span className="btn-label">ดู Demo</span>
              </a>
            </div>
          </div>
          <div className="ss-hero-visual ss-hero-visual-generated">
            <MediaImage
              className="ss-hero-image"
              src="/services/automation-hero-mockup.webp"
              alt="ตัวอย่างหน้าจอระบบเก็บ Lead อัตโนมัติ ฟอร์มเชื่อม Google Sheets และ LINE แจ้งเตือน"
              priority
              sizes="(min-width: 1280px) 1100px, 100vw"
            />
          </div>
        </div>
      </section>

      {/* ===== 2. PAIN POINT ===== */}
      <section className="section section-tight lc-pain-sec" aria-labelledby="pain-title">
        <div className="container">
          <Reveal className="section-header-center">
            <span className="eyebrow-chip">● ปัญหาที่เจอบ่อย</span>
            <h2 id="pain-title" style={{ margin: "var(--space-4) 0 var(--space-4)" }}>ธุรกิจคุณกำลังเสีย Lead เพราะระบบยัง Manual อยู่หรือเปล่า?</h2>
          </Reveal>
          <Reveal className="lc-pain-list" delay={0.1}>
            {PAIN_POINTS.map((p) => (
              <article key={p} className="lc-pain-item">
                <span className="lc-pain-x" aria-hidden="true">✕</span>
                <p>{p}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ===== 3. SOLUTION FLOW ===== */}
      <section className="section section-tight lc-flow-sec" aria-labelledby="flow-title">
        <div className="container">
          <Reveal className="section-header-center">
            <span className="eyebrow-chip is-blue">● วิธีที่เราวางระบบ</span>
            <h2 id="flow-title" style={{ margin: "var(--space-4) 0 var(--space-4)" }}>ระบบเดียว จบตั้งแต่รับ Lead จนติดตามผล</h2>
          </Reveal>
          <Reveal className="lc-flow" delay={0.1}>
            {FLOW_STEPS.map((s) => (
              <article key={s.n} className="lc-flow-step">
                <div className="lc-flow-num" aria-hidden="true">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ===== 4. DEMO PREVIEW ===== */}
      <section className="section section-tight lc-demo-sec" id="demo" aria-labelledby="demo-title">
        <div className="container">
          <Reveal className="section-header-center">
            <span className="eyebrow-chip">● Demo</span>
            <h2 id="demo-title" style={{ margin: "var(--space-4) 0 var(--space-4)" }}>ดูตัวอย่างระบบจริง</h2>
            <p className="lead">ดูว่าเมื่อมี Lead เข้ามา ข้อมูลวิ่งเข้า Google Sheets และ LINE แจ้งเตือนหน้าตาเป็นยังไง</p>
          </Reveal>
          <Reveal className="lc-demo" delay={0.1}>
            <MediaImage
              className="lc-demo-media"
              src={null}
              alt="ตัวอย่างหน้าจอระบบเก็บ Lead — ฟอร์ม Google Sheets และ LINE แจ้งเตือน"
              gradient="linear-gradient(135deg, var(--color-blue-500), var(--color-blue-700))"
              sizes="(min-width: 1024px) 900px, 100vw"
            />
            <div className="lc-demo-actions">
              <a href={DEMO_URL} target="_blank" rel="noopener" className="btn btn-primary btn-lg btn-arrow">
                <span className="btn-label">เปิดหน้า Demo</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== 5. BENEFITS ===== */}
      <section className="section section-tight lc-benefits-sec" aria-labelledby="benefits-title">
        <div className="container">
          <Reveal className="section-header-center">
            <span className="eyebrow-chip">● ผลลัพธ์</span>
            <h2 id="benefits-title" style={{ margin: "var(--space-4) 0 var(--space-4)" }}>สิ่งที่ธุรกิจคุณจะได้</h2>
          </Reveal>
          <Reveal className="lc-benefits" delay={0.1}>
            {BENEFITS.map((b) => (
              <article key={b.title} className="lc-benefit">
                <span className="lc-benefit-check" aria-hidden="true">✓</span>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ===== 6. WHO FOR ===== */}
      <section className="section section-tight lc-audience-sec" aria-labelledby="audience-title">
        <div className="container">
          <Reveal className="section-header-center">
            <span className="eyebrow-chip is-blue">● เหมาะกับใคร</span>
            <h2 id="audience-title" style={{ margin: "var(--space-4) 0 var(--space-4)" }}>เหมาะกับธุรกิจแบบไหน</h2>
          </Reveal>
          <Reveal className="lc-audience" delay={0.1}>
            {AUDIENCE.map((a) => (
              <span key={a} className="lc-chip">{a}</span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ===== 7. WHAT YOU GET ===== */}
      <section className="section section-tight lc-get-sec" aria-labelledby="get-title">
        <div className="container">
          <Reveal className="section-header-center">
            <span className="eyebrow-chip">● สิ่งที่จะได้รับ</span>
            <h2 id="get-title" style={{ margin: "var(--space-4) 0 var(--space-4)" }}>สิ่งที่คุณจะได้รับ</h2>
          </Reveal>
          <Reveal className="lc-get" delay={0.1}>
            {WHAT_YOU_GET.map((w) => (
              <div key={w} className="lc-get-item">
                <span className="lc-get-tick" aria-hidden="true">✓</span>
                <span>{w}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ===== 8. PACKAGE ===== */}
      <section className="section section-tight lc-package-sec" aria-labelledby="package-title">
        <div className="container">
          <Reveal className="lc-package">
            <div className="lc-package-head">
              <span className="eyebrow-chip">● แพ็กเกจเริ่มต้น</span>
              <h2 id="package-title">Lead Capture Starter</h2>
              <p className="lc-package-price">เริ่มต้น <strong>12,000–15,000</strong> บาท</p>
              <p className="lc-package-note">ราคาขึ้นกับจำนวนช่องทางและความซับซ้อนของ flow</p>
            </div>
            <ul className="lc-package-list">
              {PACKAGE_INCLUDES.map((it) => (
                <li key={it}><span className="ss-tick" aria-hidden="true">✓</span><span>{it}</span></li>
              ))}
            </ul>
            <a href={LINE_URL} target="_blank" rel="noopener" className="btn btn-primary btn-lg btn-arrow">
              <span className="btn-label">ทัก LINE ขอใบเสนอราคา</span>
            </a>
          </Reveal>
        </div>
      </section>

      {/* ===== 9. PROCESS ===== */}
      <section className="section section-tight lc-process-sec" aria-labelledby="lcprocess-title">
        <div className="container">
          <Reveal className="section-header-center">
            <span className="eyebrow-chip is-blue">● ขั้นตอนการทำงาน</span>
            <h2 id="lcprocess-title" style={{ margin: "var(--space-4) 0 var(--space-4)" }}>เริ่มใช้งานได้ใน 4 ขั้นตอน</h2>
          </Reveal>
          <Reveal className="lc-steps" delay={0.1}>
            {PROCESS_STEPS.map((s) => (
              <article key={s.n} className="lc-step">
                <div className="lc-step-num" aria-hidden="true">{s.n}</div>
                <div className="lc-step-body">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ===== 10. TRUST ===== */}
      <section className="section section-tight lc-trust-sec" aria-labelledby="trust-title">
        <div className="container">
          <Reveal className="lc-trust">
            <span className="eyebrow-chip">● ทำไมต้อง Best Solutions</span>
            <h2 id="trust-title">ทีมที่เข้าใจทั้งเว็บไซต์ การตลาด และ Automation</h2>
            <p>เราไม่ได้วางแค่ระบบหลังบ้าน แต่เข้าใจว่า Lead มาจากโฆษณาและเว็บอย่างไร จึงออกแบบระบบเก็บ Lead ให้เชื่อมกับการตลาดจริงของธุรกิจคุณ ดูแลครบตั้งแต่หน้าบ้านถึงหลังบ้าน</p>
            <div className="lc-trust-actions">
              <Link href="/services/automation" className="btn btn-ghost btn-arrow"><span className="btn-label">ดูบริการ Automation ทั้งหมด</span></Link>
              <Link href="/portfolio" className="btn btn-ghost btn-arrow"><span className="btn-label">ดูผลงาน</span></Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== 11. FAQ ===== */}
      <section className="section section-tight ss-faq" id="faq" aria-labelledby="faq-title">
        <div className="container">
          <Reveal className="section-header-center">
            <span className="eyebrow-chip">● FAQ</span>
            <h2 id="faq-title" style={{ margin: "var(--space-4) 0 var(--space-4)" }}>คำถามที่พบบ่อย</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <ServicesFAQ items={LEAD_CAPTURE_FAQS} />
          </Reveal>
        </div>
      </section>

      {/* ===== 12. FINAL CTA ===== */}
      <section className="section ss-cta" aria-labelledby="cta-title">
        <div className="container">
          <Reveal className="ss-cta-card">
            <div className="ss-cta-blob" aria-hidden="true"></div>
            <div className="ss-cta-text">
              <span className="eyebrow">● ฟรี 30 นาที</span>
              <h2 id="cta-title">เริ่มจากตรวจ Flow รับ Lead ของคุณฟรี 30 นาที</h2>
              <p>เล่าให้เราฟังว่าตอนนี้รับ Lead ยังไง แล้วเราจะช่วยดูว่าจุดไหนทำให้ Lead หลุด และระบบ Lead Capture จะช่วยอุดตรงไหนได้บ้าง</p>
              <div className="ss-cta-actions">
                <a href={LINE_URL} target="_blank" rel="noopener" className="btn btn-orange btn-lg btn-arrow"><span className="btn-label">ทัก LINE ขอปรึกษาฟรี</span></a>
                <a href={`tel:${PHONE_TEL}`} className="btn btn-on-light btn-lg"><span className="btn-label">โทร 095-385-4906</span></a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Verify** — รอ Task 4 (CSS) ก่อนถึงจะสวย แต่เช็ค render ได้เลย

```bash
curl -s -o /dev/null -w "lp=%{http_code}\n" http://localhost:3000/th/services/automation/lead-capture
curl -s -o /dev/null -w "automation=%{http_code}\n" http://localhost:3000/th/services/automation
```
Expected: ทั้งคู่ `200` (ยืนยันว่าหน้า landing ขึ้น และ `/services/automation` ยังเข้า `[slug]` ไม่ถูก shadow)

- [ ] **Step 3: Commit**

```bash
git add web/app/\[locale\]/services/automation/lead-capture/page.tsx
git commit -m "feat(automation): add Lead Capture landing page (12 sections, LINE CTA)"
```

---

## Task 4: CSS ของ landing

**Files:**
- Create: `web/styles/pages/lead-capture.css`

- [ ] **Step 1: สร้างไฟล์**

```css
/* Lead Capture landing — page-specific styles
   (reuses ss-hero / ss-cta / ss-faq-list / ss-tick from service-single.css) */

/* ===== PAIN ===== */
.lc-pain-list {
  display: grid;
  gap: var(--space-4);
  grid-template-columns: 1fr;
}
@media (min-width: 768px) { .lc-pain-list { grid-template-columns: 1fr 1fr; } }
.lc-pain-item {
  display: flex;
  gap: var(--space-3);
  align-items: flex-start;
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
}
.lc-pain-x {
  flex: none;
  width: 28px;
  height: 28px;
  border-radius: var(--radius-full);
  display: grid;
  place-items: center;
  font-weight: 700;
  background: var(--color-orange-50);
  color: var(--color-orange-500);
}
.lc-pain-item p { margin: 0; color: var(--color-text); line-height: 1.6; }

/* ===== SOLUTION FLOW ===== */
.lc-flow {
  display: grid;
  gap: var(--space-4);
  grid-template-columns: 1fr;
}
@media (min-width: 640px) { .lc-flow { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .lc-flow { grid-template-columns: repeat(5, 1fr); } }
.lc-flow-step {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
  text-align: center;
}
.lc-flow-num {
  width: 44px;
  height: 44px;
  margin: 0 auto var(--space-3);
  border-radius: var(--radius-full);
  display: grid;
  place-items: center;
  font-weight: 800;
  color: #fff;
  background: linear-gradient(135deg, var(--color-orange-500), var(--color-peach));
}
.lc-flow-step h3 { margin: 0 0 var(--space-2); font-size: 1.05rem; }
.lc-flow-step p { margin: 0; color: var(--color-text-muted); font-size: 0.92rem; line-height: 1.55; }

/* ===== DEMO ===== */
.lc-demo { display: grid; gap: var(--space-6); justify-items: center; }
.lc-demo-media {
  width: 100%;
  max-width: 900px;
  aspect-ratio: 16 / 9;
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-card);
}
.lc-demo-actions { display: flex; justify-content: center; }

/* ===== BENEFITS ===== */
.lc-benefits {
  display: grid;
  gap: var(--space-4);
  grid-template-columns: 1fr;
}
@media (min-width: 640px) { .lc-benefits { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .lc-benefits { grid-template-columns: repeat(4, 1fr); } }
.lc-benefit {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
}
.lc-benefit-check {
  display: inline-grid;
  place-items: center;
  width: 36px;
  height: 36px;
  margin-bottom: var(--space-3);
  border-radius: var(--radius-full);
  background: var(--color-blue-50);
  color: var(--color-blue-700);
  font-weight: 800;
}
.lc-benefit h3 { margin: 0 0 var(--space-2); font-size: 1.05rem; }
.lc-benefit p { margin: 0; color: var(--color-text-muted); font-size: 0.92rem; line-height: 1.55; }

/* ===== AUDIENCE ===== */
.lc-audience { display: flex; flex-wrap: wrap; gap: var(--space-3); justify-content: center; }
.lc-chip {
  background: var(--color-surface);
  border-radius: var(--radius-full);
  padding: var(--space-3) var(--space-6);
  box-shadow: var(--shadow-sm);
  font-weight: 700;
  color: var(--color-text);
}

/* ===== WHAT YOU GET ===== */
.lc-get {
  display: grid;
  gap: var(--space-3);
  grid-template-columns: 1fr;
  max-width: 720px;
  margin: 0 auto;
}
@media (min-width: 640px) { .lc-get { grid-template-columns: 1fr 1fr; } }
.lc-get-item {
  display: flex;
  gap: var(--space-3);
  align-items: center;
  background: var(--color-surface);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  box-shadow: var(--shadow-sm);
}
.lc-get-tick {
  flex: none;
  width: 26px;
  height: 26px;
  border-radius: var(--radius-full);
  display: grid;
  place-items: center;
  font-weight: 800;
  background: var(--color-orange-500);
  color: #fff;
  font-size: 0.8rem;
}

/* ===== PACKAGE ===== */
.lc-package {
  max-width: 640px;
  margin: 0 auto;
  text-align: center;
  background: var(--color-surface);
  border-radius: var(--radius-2xl);
  padding: clamp(28px, 4vw, 48px);
  box-shadow: var(--shadow-card);
  display: grid;
  gap: var(--space-6);
}
.lc-package-head { display: grid; gap: var(--space-2); justify-items: center; }
.lc-package-head h2 { margin: 0; }
.lc-package-price { margin: 0; font-size: 1.5rem; color: var(--color-text); }
.lc-package-price strong { color: var(--color-orange-500); }
.lc-package-note { margin: 0; color: var(--color-text-muted); font-size: 0.92rem; }
.lc-package-list { list-style: none; margin: 0; padding: 0; display: grid; gap: var(--space-3); text-align: left; }
.lc-package-list li { display: flex; gap: var(--space-3); align-items: center; }

/* ===== PROCESS ===== */
.lc-steps { display: grid; gap: var(--space-4); grid-template-columns: 1fr; }
@media (min-width: 768px) { .lc-steps { grid-template-columns: repeat(2, 1fr); } }
.lc-step {
  display: flex;
  gap: var(--space-4);
  align-items: flex-start;
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
}
.lc-step-num { flex: none; font-weight: 800; font-size: 1.4rem; color: var(--color-orange-500); }
.lc-step-body h3 { margin: 0 0 var(--space-2); font-size: 1.05rem; }
.lc-step-body p { margin: 0; color: var(--color-text-muted); font-size: 0.92rem; line-height: 1.55; }

/* ===== TRUST ===== */
.lc-trust { max-width: 760px; margin: 0 auto; text-align: center; display: grid; gap: var(--space-4); justify-items: center; }
.lc-trust p { margin: 0; color: var(--color-text-muted); line-height: 1.7; }
.lc-trust-actions { display: flex; flex-wrap: wrap; gap: var(--space-3); justify-content: center; }
```

- [ ] **Step 2: Verify (visual)** — เปิด browser `http://localhost:3000/th/services/automation/lead-capture`
  - ครบ 12 section, hero มีรูป mockup, Demo เป็นกล่อง gradient (placeholder), การ์ด/chips จัดเรียงสวย
  - ปุ่มหลักทุกปุ่ม (hero/package/final) คลิกแล้วไป `https://lin.ee/xB314y9`
  - มี H1 เดียว (hero), heading ไล่ระดับ
  - มือถือ (DevTools responsive 390px): การ์ด/flow/benefits stack เป็น 1 คอลัมน์, FAB เดิมยังอยู่มุมขวาล่าง

- [ ] **Step 3: Commit**

```bash
git add web/styles/pages/lead-capture.css
git commit -m "feat(automation): add lead-capture landing styles"
```

---

## Task 5: Verification gate (DoD)

**Files:** ไม่มีไฟล์ใหม่ — ตรวจคุณภาพก่อนถือว่าเสร็จ

- [ ] **Step 1: Lint + typecheck + build**

```bash
cd web && pnpm lint && pnpm exec tsc --noEmit && pnpm build
```
Expected: ผ่านทั้งหมด ไม่มี error/warning ใหม่

- [ ] **Step 2: Routing check (สำคัญ — กัน shadow)**

```bash
for p in services/automation services/automation/lead-capture services/seo services/web-design; do
  curl -s -o /dev/null -w "$p=%{http_code}\n" "http://localhost:3000/th/$p"
done
```
Expected: ทุกอัน`200` — โดยเฉพาะ `services/automation` ต้องยังเป็นหน้า service (มีการ์ด) ไม่ใช่ 404/หน้าผิด

- [ ] **Step 3: SEO/JSON-LD check** — ดู view-source ของ `/th/services/automation/lead-capture`
  - มี `<script type="application/ld+json">` 3 ตัว: Service(offers), FAQPage, BreadcrumbList
  - `<title>` ลงท้าย `· Best Solutions` รวม ≤ 60, `<meta name="description">` ≤ 160
  - `<link rel="canonical">` = `/th/services/automation/lead-capture`

- [ ] **Step 4: Lighthouse + screenshots** (qa-tester) — Perf/SEO/A11y ≥ 95, เก็บ screenshot desktop + mobile ของ `/services/automation` (การ์ด) และ `/services/automation/lead-capture`

- [ ] **Step 5: ส่งเจ้าของยืนยัน** — screenshot + ลิสต์ TODO ที่รอ asset (Demo link/screenshot, OG image, hero image จริง)

---

## Self-review (เทียบ spec)

- [x] **Cards section** หลัง What-We-Deliver, gated, const map → Task 1
- [x] **Landing 12 section** ครบตามลำดับเจ้าของ → Task 3
- [x] **LINE-first CTA** ทุกปุ่มหลัก → Task 3 (LINE_URL)
- [x] **Demo external + placeholder** → DEMO_URL + MediaImage src=null
- [x] **index ปกติ + JSON-LD (Service/Breadcrumb/FAQ)** → Task 2 + Task 3
- [x] **ราคาโชว์บนหน้า** → section 8
- [x] **เบอร์ 095-385-4906** → PHONE_TEL
- [x] **Routing ไม่ shadow** → Task 5 Step 2
- [x] **Type consistency** — `LandingServiceJsonLd` props (Task 2) ตรงกับการเรียกใน Task 3 ; `FAQItem`/`FaqEntry` = `{q,a}` ใช้ได้ทั้ง `ServicesFAQ` + `FaqJsonLd`
- ⚠️ **Sticky CTA** ใน spec → เปลี่ยนเป็นใช้ FAB เดิม (ดู Deviations) — ต้องแจ้งเจ้าของ
