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
const DEMO_URL = "https://lead-automation.demo.bestsolutionscorp.com";
const PRICE_FROM = 4990;

const META_TITLE = "ระบบเก็บ Lead อัตโนมัติ แจ้งเตือนผ่าน LINE";
const META_DESC =
  "ระบบเก็บ Lead อัตโนมัติสำหรับธุรกิจ เมื่อลูกค้ากรอกฟอร์ม ข้อมูลจะเข้า Google Sheets และแจ้งทีมขายผ่าน LINE ทันที ลดโอกาส Lead หลุด เริ่มต้น 4,990 บาท";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, path: PATH, title: META_TITLE, description: META_DESC });
}

const PAIN_POINTS = [
  "ลูกค้าทักหรือกรอกฟอร์มเข้ามา แต่ทีมขายเห็นช้าเกินไป",
  "ต้องคัดลอกข้อมูลลง Excel หรือ Google Sheets เองทุกครั้ง",
  "ไม่มีระบบเตือนให้ตามต่อ ทำให้ Lead เย็นและหลุดไปหาคู่แข่ง",
  "ไม่เห็นสถานะของแต่ละ Lead ว่าใครตามแล้ว อยู่ขั้นตอนไหน",
];

const FLOW_STEPS = [
  { n: "01", title: "รับ Lead", desc: "ลูกค้ากรอกฟอร์มจากเว็บ แลนดิ้ง หรือโฆษณา" },
  { n: "02", title: "บันทึกข้อมูล", desc: "ข้อมูลเข้า Google Sheets อัตโนมัติ ไม่ต้องคีย์มือ" },
  { n: "03", title: "ให้คะแนน", desc: "จัดลำดับ Lead ตามเกณฑ์ เพื่อรู้ว่าควรตามใครก่อน" },
  { n: "04", title: "แจ้งเตือน", desc: "แจ้งทีมขายผ่าน LINE ทันทีเมื่อมี Lead ใหม่" },
  { n: "05", title: "ติดตามสถานะ", desc: "อัปเดตสถานะใหม่ ติดต่อแล้ว หรือปิดการขายได้ในที่เดียว" },
];

const BENEFITS = [
  { title: "ลด Lead หลุด", desc: "ลดโอกาสข้อมูลตกหล่นจากการลืมตามหรือตอบช้า" },
  { title: "ตามลูกค้าเร็วขึ้น", desc: "ทีมขายรู้ทันทีเมื่อมี Lead ใหม่ผ่าน LINE" },
  { title: "ลดงานคัดลอกข้อมูล", desc: "ไม่ต้องคีย์ข้อมูลซ้ำเข้า Excel หรือ Google Sheets เอง" },
  { title: "ดูภาพรวมได้ง่าย", desc: "เห็นจำนวน Lead และสถานะล่าสุดได้ตลอดเวลา" },
];

const AUDIENCE = [
  "คลินิก / ความงาม",
  "โรงเรียน / คอร์สเรียน",
  "ร้านค้าออนไลน์",
  "ธุรกิจบริการ",
  "B2B / งานโครงการ",
];

const WHAT_YOU_GET = [
  "ฟอร์มรับ Lead ที่ปรับตามธุรกิจ",
  "เชื่อมต่อ Google Sheets อัตโนมัติ",
  "LINE Alert แจ้งทีมขายทันที",
  "ระบบติดตามสถานะ Lead",
  "สอนทีมใช้งานจริง (Training)",
  "ดูแลหลังติดตั้ง (Support)",
];

const PACKAGES = [
  {
    name: "Lead Capture Start",
    price: "4,990",
    note: "เริ่มจากรับ Lead ให้เป็นระบบ เหมาะกับธุรกิจที่ต้องการเก็บข้อมูลลงชีทและแจ้งทีมทันที",
    items: [
      "ฟอร์มรับ Lead 1 จุด",
      "ส่งข้อมูลเข้า Google Sheets อัตโนมัติ",
      "แจ้งเตือนผ่าน LINE ส่วนตัวหรือกลุ่มเดียว",
      "ไม่แยกแจ้งเตือนหลายกลุ่ม",
      "ยังไม่มีระบบคัดกรองหรือให้คะแนน Lead",
    ],
  },
  {
    name: "Lead Capture Growth",
    price: "12,900",
    note: "เหมาะกับธุรกิจที่มีหลายช่องทาง และต้องการเริ่มจัดลำดับ Lead ให้ทีมขายตามงานได้ดีขึ้น",
    featured: true,
    items: [
      "ฟอร์มหรือช่องทางรับ Lead 2–3 จุด",
      "เชื่อม Google Sheets หรือ CRM เบื้องต้น",
      "LINE Alert แยกตามทีม/ประเภทลูกค้า",
      "Lead Scoring เบื้องต้น",
      "Dashboard สรุป Lead และสถานะ",
      "ปรับ flow ติดตามลูกค้า",
      "สอนใช้งานทีมขาย",
    ],
  },
  {
    name: "Lead Capture Pro",
    price: "24,900",
    note: "สำหรับทีมขายที่ต้องการระบบจริงจัง เชื่อมหลายเครื่องมือ และต่อยอด automation ได้มากขึ้น",
    items: [
      "หลายช่องทางรับ Lead",
      "เชื่อม CRM / Google Sheets / LINE OA ตามระบบที่ใช้",
      "Lead Scoring แบบละเอียด",
      "Follow-up automation",
      "Dashboard รายงานเชิงลึก",
      "ระบบแจ้งเตือนตามสถานะหรือ SLA",
      "ปรับแต่ง flow เฉพาะธุรกิจ",
      "ดูแลหลังติดตั้งแบบใกล้ชิดกว่า",
    ],
  },
];

const PROCESS_STEPS = [
  { n: "01", title: "คุย Flow รับ Lead", desc: "ทำความเข้าใจช่องทางและขั้นตอนรับ Lead ที่ธุรกิจใช้อยู่" },
  { n: "02", title: "ออกแบบระบบ", desc: "วาง flow ตั้งแต่ฟอร์ม → Sheets → LINE พร้อมเกณฑ์จัดลำดับ Lead" },
  { n: "03", title: "ติดตั้งและเชื่อมระบบ", desc: "ตั้งค่าฟอร์ม เชื่อม Google Sheets และ LINE แจ้งเตือน" },
  { n: "04", title: "สอนใช้งานทีม", desc: "อบรมทีมขายให้ใช้ระบบได้จริง พร้อมดูแลหลังติดตั้ง" },
];

const TRUST_PILLARS = [
  { title: "เข้าใจเว็บไซต์", desc: "วางฟอร์มและหน้ารับ Lead ให้โหลดเร็ว ใช้งานง่าย และพร้อมวัดผล" },
  { title: "เข้าใจการตลาด", desc: "แยกได้ว่า Lead มาจากแอดหรือช่องทางไหน เพื่อออกแบบระบบให้ต่อยอดได้" },
  { title: "เชี่ยวชาญ Automation", desc: "เชื่อมฟอร์ม Sheets และ LINE ให้ทำงานต่อเนื่อง พร้อมดูแลหลังส่งมอบ" },
];

const LEAD_CAPTURE_FAQS: FAQItem[] = [
  { q: "ใช้กับฟอร์มเดิมหรือเว็บเดิมได้ไหม?", a: "ได้ ถ้าฟอร์ม/เว็บมี webhook หรือเชื่อม API ได้ เราจะต่อระบบเข้ากับช่องทางที่คุณใช้อยู่ หากเป็นฟอร์มสำเร็จรูปบางตัวอาจต้องประเมินก่อน" },
  { q: "ต้องใช้ LINE OA ไหม?", a: "แนะนำให้ใช้ LINE Official Account เพื่อรับแจ้งเตือนแบบเป็นระบบ แต่ช่วงเริ่มต้นอาจแจ้งเข้ากลุ่ม LINE ได้ตามความเหมาะสม" },
  { q: "ราคาเริ่มต้นเท่าไหร่?", a: "แพ็กเกจ Lead Capture Start เริ่มต้นที่ 4,990 บาท สำหรับรับ Lead เข้า Google Sheets และแจ้งเตือนผ่าน LINE หากต้องการแยกทีม คัดกรอง Lead หรือทำ Dashboard แนะนำแพ็กเกจ Growth ขึ้นไป" },
  { q: "ติดตั้งนานไหม?", a: "ส่วนใหญ่ใช้เวลาไม่กี่วันถึงประมาณ 1–2 สัปดาห์ ขึ้นกับการเชื่อมระบบเดิมและการปรับ flow" },
  { q: "ดูแลต่อหลังติดตั้งไหม?", a: "มีช่วงสอนใช้งานและดูแลหลังติดตั้ง หากต้องการดูแลต่อเนื่องหรือเพิ่ม flow ใหม่ เราจัดเป็นแพ็กเกจรายเดือนได้" },
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
            <h1 id="hero-title" className="ss-hero-title">ระบบเก็บ Lead อัตโนมัติ พร้อมแจ้งทีมขายผ่าน LINE</h1>
            <p className="ss-hero-lead">เมื่อลูกค้ากรอกฟอร์ม ข้อมูลจะเข้า Google Sheets และแจ้งทีมขายทันที ช่วยลดโอกาสพลาด Lead สำคัญ</p>
            <div className="ss-hero-ctas">
              <a href={LINE_URL} target="_blank" rel="noopener" className="btn btn-primary btn-lg btn-arrow">
                <span className="btn-label">ขอปรึกษาฟรี</span>
              </a>
              <a href="#demo" className="btn btn-secondary btn-lg">
                <span className="btn-label">ดู Demo</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 2. PAIN POINT ===== */}
      <section className="section section-tight lc-pain-sec" aria-labelledby="pain-title">
        <div className="container">
          <Reveal className="section-header-center">
            <span className="eyebrow-chip">● ปัญหาที่เจอบ่อย</span>
            <h2 id="pain-title" style={{ margin: "var(--space-4) 0 var(--space-4)" }}>ธุรกิจคุณกำลังเสีย Lead เพราะขั้นตอนรับข้อมูลยังทำมืออยู่หรือเปล่า?</h2>
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
            <h2 id="flow-title" style={{ margin: "var(--space-4) 0 var(--space-4)" }}>ระบบเดียว ดูแลตั้งแต่รับ Lead จนถึงการติดตามผล</h2>
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
            <h2 id="demo-title" style={{ margin: "var(--space-4) 0 var(--space-4)" }}>ดูตัวอย่างการทำงานของระบบ</h2>
            <p className="lead">เห็นภาพตั้งแต่ Lead เข้ามา ข้อมูลถูกบันทึกใน Google Sheets และทีมขายได้รับแจ้งเตือนผ่าน LINE</p>
          </Reveal>
          <Reveal className="lc-demo" delay={0.1}>
            <MediaImage
              className="lc-demo-media"
              src="/services/lead-capture-hero.webp"
              alt="ตัวอย่างหน้าจอระบบเก็บ Lead อัตโนมัติ ฟอร์มเชื่อม Google Sheets และ LINE แจ้งเตือน"
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
            <h2 id="benefits-title" style={{ margin: "var(--space-4) 0 var(--space-4)" }}>ผลลัพธ์ที่ทีมขายจะเห็นชัดขึ้น</h2>
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
            <h2 id="audience-title" style={{ margin: "var(--space-4) 0 var(--space-4)" }}>เหมาะกับธุรกิจที่รับลูกค้าจากหลายช่องทาง</h2>
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
            <h2 id="get-title" style={{ margin: "var(--space-4) 0 var(--space-4)" }}>สิ่งที่รวมอยู่ในระบบ</h2>
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
          <Reveal className="section-header-center">
            <span className="eyebrow-chip">● แพ็กเกจ</span>
            <h2 id="package-title" style={{ margin: "var(--space-4) 0 var(--space-4)" }}>เลือกแพ็กเกจตามระดับระบบที่ต้องการ</h2>
            <p className="lead">เริ่มจากรับ Lead เข้า Sheets และ LINE หรือขยับเป็นระบบที่ช่วยแยกทีม คัดกรอง Lead และดูภาพรวมการขายได้ครบขึ้น</p>
          </Reveal>
          <Reveal className="lc-packages" delay={0.1}>
            {PACKAGES.map((pkg) => (
              <article key={pkg.name} className={`lc-package-card${pkg.featured ? " is-featured" : ""}`}>
                <span className={`lc-package-badge${pkg.featured ? "" : " is-placeholder"}`} aria-hidden={!pkg.featured}>
                  {pkg.featured ? "แนะนำ" : "แนะนำ"}
                </span>
                <div className="lc-package-head">
                  <h3>{pkg.name}</h3>
                  <p className="lc-package-price">เริ่มต้น <strong>{pkg.price}</strong> บาท</p>
                  <p className="lc-package-note">{pkg.note}</p>
                </div>
                <ul className="lc-package-list">
                  {pkg.items.map((it) => (
                    <li key={it}><span className="ss-tick" aria-hidden="true">✓</span><span>{it}</span></li>
                  ))}
                </ul>
                <a href={LINE_URL} target="_blank" rel="noopener" className="btn btn-primary btn-lg btn-arrow">
                  <span className="btn-label">ทัก LINE ขอใบเสนอราคา</span>
                </a>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ===== 9. PROCESS ===== */}
      <section className="section section-tight lc-process-sec" aria-labelledby="lcprocess-title">
        <div className="container">
          <Reveal className="section-header-center">
            <span className="eyebrow-chip is-blue">● ขั้นตอนการทำงาน</span>
            <h2 id="lcprocess-title" style={{ margin: "var(--space-4) 0 var(--space-4)" }}>เริ่มวางระบบได้ใน 4 ขั้นตอน</h2>
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
          <Reveal className="section-header-center">
            <span className="eyebrow-chip">● ทำไมต้อง Best Solutions</span>
            <h2 id="trust-title" style={{ margin: "var(--space-4) 0 var(--space-4)" }}>ทีมที่เข้าใจทั้งเว็บไซต์ การตลาด และ Automation</h2>
            <p className="lead">เราไม่ได้วางแค่ระบบหลังบ้าน แต่ดูด้วยว่า Lead มาจากโฆษณา เว็บไซต์ และช่องทางขายอย่างไร เพื่อออกแบบระบบให้เชื่อมกับการทำงานจริงของธุรกิจคุณ</p>
          </Reveal>
          <Reveal className="lc-trust-pillars" delay={0.1}>
            {TRUST_PILLARS.map((p) => (
              <article key={p.title} className="lc-pillar">
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </article>
            ))}
          </Reveal>
          <Reveal className="lc-trust-actions" delay={0.15}>
            <Link href="/services/automation" className="btn btn-ghost btn-arrow"><span className="btn-label">ดูบริการ Automation ทั้งหมด</span></Link>
            <Link href="/portfolio" className="btn btn-ghost btn-arrow"><span className="btn-label">ดูผลงาน</span></Link>
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
              <h2 id="cta-title">เริ่มจากตรวจ Flow รับ Lead ฟรี 30 นาที</h2>
              <p>เล่าให้เราฟังว่าตอนนี้รับ Lead จากช่องทางไหน ทีมขายตามต่ออย่างไร แล้วเราจะช่วยดูว่าจุดไหนทำให้ Lead หลุด และควรวางระบบอุดช่องว่างตรงไหนก่อน</p>
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
