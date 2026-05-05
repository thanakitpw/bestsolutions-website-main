import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import "@/styles/pages/services.css";

export const metadata: Metadata = {
  title: "บริการของเรา · Best Solutions — รับทำเว็บ ยิงแอด SEO AI Automation",
  description:
    "7 บริการครบวงจรของ Best Solutions — รับทำเว็บไซต์ ยิงแอด Meta &amp; Google ทำ SEO ดูแลโซเชียล AI Automation AI ตอบอีเมล และ Production ทุกอย่างในทีมเดียว",
};

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="main">

      {/* ============================================================ HERO */}
      <section className="page-hero" aria-labelledby="hero-title">
        <div className="page-hero-blob" aria-hidden="true"></div>
        <div className="container">
          <div className="page-hero-inner">
            <span className="eyebrow-pill">
              <span className="star">✦</span>
              <span>บริการครบวงจร · 7 services</span>
            </span>
            <h1 id="hero-title">ทุกอย่างที่ธุรกิจคุณต้องการ ในทีมเดียว</h1>
            <p className="lead">
              ออกแบบเว็บ ยิงแอด ทำ SEO ดูแลโซเชียล จนถึง AI Automation —
              ทุกบริการคุยรอบเดียว ทำงานแบบ Sprint วัดผลได้ทุกบาท
            </p>
          </div>
        </div>
      </section>


      {/* ============================================================ SERVICES GRID */}
      <section className="section section-tight" id="services" aria-labelledby="services-title">
        <div className="container">
          <h2 id="services-title" className="visually-hidden">บริการทั้งหมดของเรา</h2>

          <div className="grid-services-7">

            <Link href="/services/web-design" className="card card-service">
              <div className="card-icon is-orange" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 8h18M8 12h6" /></svg>
              </div>
              <h3 className="card-title">รับทำเว็บไซต์</h3>
              <p className="card-desc">เว็บโหลดเร็ว ขายของได้ ผ่าน SEO ตั้งแต่วันแรก ไม่ใช่แค่สวย</p>
              <ul className="service-features">
                <li className="service-feature">ออกแบบ UX/UI ตามแบรนด์</li>
                <li className="service-feature">SEO-ready โครงสร้างถูกต้อง</li>
                <li className="service-feature">เปิดแอดมินแก้ content เองได้</li>
              </ul>
              <span className="card-link">ดูรายละเอียด</span>
            </Link>

            <Link href="/services" className="card card-service">
              <div className="card-icon is-blue" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l18-7v16L3 13z" /><path d="M11 19c0 1.5-1 3-3 3s-3-1.5-3-3" /></svg>
              </div>
              <h3 className="card-title">ยิงแอด Meta &amp; Google</h3>
              <p className="card-desc">ปรับแคมเปญรายสัปดาห์ วัดผลทุกบาท ROAS ขึ้นจริง</p>
              <ul className="service-features">
                <li className="service-feature">วาง funnel + audience</li>
                <li className="service-feature">A/B test ครีเอทีฟ</li>
                <li className="service-feature">รายงานรายสัปดาห์</li>
              </ul>
              <span className="card-link">เช็กแพ็กเกจ</span>
            </Link>

            <Link href="/services" className="card card-service">
              <div className="card-icon is-cream" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.5-4.5" /></svg>
              </div>
              <h3 className="card-title">SEO ติดอันดับ Google</h3>
              <p className="card-desc">เนื้อหา Authority + Technical ที่ขึ้นแล้วอยู่ยาว</p>
              <ul className="service-features">
                <li className="service-feature">Keyword research ภาษาไทย</li>
                <li className="service-feature">Technical audit + fix</li>
                <li className="service-feature">Content writer ทีมไทย</li>
              </ul>
              <span className="card-link">วางแผน SEO</span>
            </Link>

            <Link href="/services" className="card card-service">
              <div className="card-icon is-orange" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
              </div>
              <h3 className="card-title">ดูแลเพจโซเชียล</h3>
              <p className="card-desc">คอนเทนต์ + ตอบแอดมิน + รายงานรายเดือน ครบจบในที่เดียว</p>
              <ul className="service-features">
                <li className="service-feature">Content plan รายเดือน</li>
                <li className="service-feature">Admin ตอบ inbox</li>
                <li className="service-feature">Monthly performance report</li>
              </ul>
              <span className="card-link">ดูแพ็กเกจ</span>
            </Link>

            <Link href="/services" className="card card-service">
              <div className="card-icon is-blue" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.5 5.5L20 10l-5.5 2.5L12 18l-2.5-5.5L4 10l5.5-2.5L12 2z" /></svg>
              </div>
              <h3 className="card-title">AI Automation</h3>
              <p className="card-desc">ระบบตอบลูกค้า ปิดการขาย จัดการหลังบ้านอัตโนมัติ</p>
              <ul className="service-features">
                <li className="service-feature">Chat bot ตอบลูกค้า 24/7</li>
                <li className="service-feature">เชื่อม CRM อัตโนมัติ</li>
                <li className="service-feature">Workflow n8n / Zapier</li>
              </ul>
              <span className="card-link">ดู Flow ตัวอย่าง</span>
            </Link>

            <Link href="/services" className="card card-service">
              <div className="card-icon is-cream" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
              </div>
              <h3 className="card-title">AI ตอบอีเมล</h3>
              <p className="card-desc">ระบบจัด priority + ร่างคำตอบให้พร้อมส่ง ลดงานวันละ 2 ชั่วโมง</p>
              <ul className="service-features">
                <li className="service-feature">จัดหมวดอีเมลอัตโนมัติ</li>
                <li className="service-feature">ร่างคำตอบ AI</li>
                <li className="service-feature">ปลอดภัย ไม่ส่งข้อมูลเข้า public LLM</li>
              </ul>
              <span className="card-link">ลองดูตัวอย่าง</span>
            </Link>

            <Link href="/services" className="card card-service">
              <div className="card-icon is-orange" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg>
              </div>
              <h3 className="card-title">Production · Video</h3>
              <p className="card-desc">ถ่าย ตัด ลง — โฆษณา / รีวิวสินค้า / คอนเทนต์โซเชียล</p>
              <ul className="service-features">
                <li className="service-feature">วาง concept + scripting</li>
                <li className="service-feature">ทีมถ่ายในกรุงเทพฯ</li>
                <li className="service-feature">ตัด + ลง พร้อม caption</li>
              </ul>
              <span className="card-link">ดูตัวอย่างงาน</span>
            </Link>

          </div>
        </div>
      </section>


      {/* ============================================================ PROCESS */}
      <section className="section" id="process" aria-labelledby="process-title">
        <div className="container">
          <div className="section-header-center">
            <span className="eyebrow-chip">● กระบวนการทำงาน</span>
            <h2 id="process-title" style={{ margin: "var(--space-4) 0 var(--space-4)" }}>วิธีที่เราทำงานกับลูกค้า</h2>
            <p className="lead">ทุกบริการเริ่มจาก 4 ขั้นตอนเหมือนกัน — ฟังก่อน ค่อยเสนอ</p>
          </div>

          <div className="process-list">
            <article className="process-step">
              <div className="process-num" aria-hidden="true">01</div>
              <div className="process-body">
                <h3>ฟัง · เข้าใจโจทย์</h3>
                <p>นัดคุยฟรี 30 นาที ฟังว่าธุรกิจคุณกำลังเจอโจทย์อะไร — ไม่ขายตรง ไม่ผูกมัด</p>
              </div>
            </article>

            <article className="process-step">
              <div className="process-num" aria-hidden="true">02</div>
              <div className="process-body">
                <h3>วางแผน · ออกแบบ Sprint</h3>
                <p>เสนอแผนงานเป็น Sprint สั้น ๆ พร้อม KPI ชัดเจน รู้ก่อนว่าแต่ละสัปดาห์จะได้อะไร</p>
              </div>
            </article>

            <article className="process-step">
              <div className="process-num" aria-hidden="true">03</div>
              <div className="process-body">
                <h3>ลงมือทำ · รายงานทุกสัปดาห์</h3>
                <p>ทีมเริ่มลงมือ — รายงานความคืบหน้าทุกสัปดาห์ ปรับได้ทันทีถ้าตลาดเปลี่ยน</p>
              </div>
            </article>

            <article className="process-step">
              <div className="process-num" aria-hidden="true">04</div>
              <div className="process-body">
                <h3>วัดผล · ส่งมอบ + ดูแลต่อ</h3>
                <p>สรุปผลลัพธ์เทียบ KPI ที่วางไว้ ส่งมอบงานพร้อมแผนดูแลต่อเนื่อง</p>
              </div>
            </article>
          </div>
        </div>
      </section>


      {/* ============================================================ CTA DARK */}
      <div className="section section-dark-pre" aria-hidden="true"></div>

      <section className="section section-dark" aria-labelledby="cta-title">
        <div className="container">
          <div className="section-header section-header-center">
            <span className="eyebrow">● เริ่มต้นวันนี้</span>
            <h2 id="cta-title">ไม่แน่ใจว่าจะใช้บริการไหน? เราช่วยเลือกให้</h2>
            <p className="lead">เล่าโจทย์ให้ฟัง 15 นาที เราจะแนะนำบริการที่เหมาะกับธุรกิจของคุณ — ฟรี ไม่ผูกมัด</p>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)", justifyContent: "center", marginTop: "var(--space-10)" }}>
            <Link href="/contact" className="btn btn-orange btn-lg btn-arrow">
              <span className="btn-label">นัดคุยกับทีม</span>
            </Link>
            <Link href="/portfolio" className="btn btn-on-dark btn-lg">
              <span className="btn-label">ดูผลงานก่อน</span>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
