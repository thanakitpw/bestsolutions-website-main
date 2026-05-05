import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import "@/styles/pages/portfolio.css";

export const metadata: Metadata = {
  title: "ผลงานของเรา · Best Solutions — Web Design, E-Commerce, SEO, Branding",
  description:
    "100+ โปรเจคที่ Best Solutions ส่งมอบให้ลูกค้า — รวมเว็บไซต์ ระบบ e-commerce แคมเปญ ads, SEO และ Production จากธุรกิจหลากหลายประเภทในไทย",
};

export default async function PortfolioPage({
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
            <span className="eyebrow-pill"><span className="star">✦</span><span>Portfolio · 100+ projects</span></span>
            <h1 id="hero-title">ผลงานที่เราภูมิใจ ส่งมอบจริง วัดผลได้จริง</h1>
            <p className="lead">โปรเจคทุกอันที่นี่ได้รับความยินยอมจากลูกค้าให้แสดงต่อสาธารณะ — ตัวเลขผลลัพธ์มาจากข้อมูลจริงในระบบ Analytics</p>
          </div>
        </div>
      </section>


      {/* ============================================================ FILTER + GRID */}
      <section className="section section-tight" id="works" aria-labelledby="works-title">
        <div className="container">
          <h2 id="works-title" style={{ position: "absolute", clip: "rect(0 0 0 0)", width: "1px", height: "1px", overflow: "hidden" }}>ผลงานทั้งหมด</h2>

          <div className="filter-bar" role="tablist" aria-label="กรองตามหมวดหมู่">
            <button className="filter-chip is-active" type="button" role="tab" aria-selected={true}>ทั้งหมด</button>
            <button className="filter-chip" type="button" role="tab" aria-selected={false}>Web Design</button>
            <button className="filter-chip" type="button" role="tab" aria-selected={false}>E-Commerce</button>
            <button className="filter-chip" type="button" role="tab" aria-selected={false}>Online Marketing</button>
            <button className="filter-chip" type="button" role="tab" aria-selected={false}>SEO</button>
            <button className="filter-chip" type="button" role="tab" aria-selected={false}>Branding</button>
            <button className="filter-chip" type="button" role="tab" aria-selected={false}>Video &amp; Content</button>
          </div>

          <div className="grid-portfolio">

            <Link href="/portfolio/sample-case" className="card card-portfolio">
              <div className="card-media" role="img" aria-label="หน้าเว็บใหม่ของบริษัท ก.ก่อสร้างไทย" style={{ background: "linear-gradient(135deg, var(--color-orange-500), var(--color-peach))" }}></div>
              <div className="card-body">
                <span className="card-meta"><span>Web Design</span><span className="card-meta-dot"></span><span>2026</span></span>
                <h3 className="card-title">บริษัท ก.ก่อสร้างไทย</h3>
                <p className="card-desc">รื้อเว็บเก่า โหลดเร็วขึ้น 4 เท่า ลีดเข้าเพิ่ม 3.5×</p>
              </div>
            </Link>

            <Link href="/portfolio/sample-case" className="card card-portfolio">
              <div className="card-media" role="img" aria-label="หน้าร้าน e-commerce SportLab" style={{ background: "linear-gradient(135deg, var(--color-blue-500), var(--color-blue-700))" }}></div>
              <div className="card-body">
                <span className="card-meta"><span>E-Commerce</span><span className="card-meta-dot"></span><span>2026</span></span>
                <h3 className="card-title">SportLab อุปกรณ์กีฬา</h3>
                <p className="card-desc">เว็บ + ระบบสต็อก ยอดขายขึ้น 220% ใน 6 เดือน</p>
              </div>
            </Link>

            <Link href="/portfolio/sample-case" className="card card-portfolio">
              <div className="card-media" role="img" aria-label="ภาพรีแบรนด์คาเฟ่บ้านสวน" style={{ background: "linear-gradient(135deg, var(--color-text), var(--color-orange-700))" }}></div>
              <div className="card-body">
                <span className="card-meta"><span>Branding</span><span className="card-meta-dot"></span><span>2025</span></span>
                <h3 className="card-title">คาเฟ่ บ้านสวน</h3>
                <p className="card-desc">รีแบรนด์ทั้งร้าน + เว็บ + โซเชียล ขึ้นเทรนด์ 3 เดือน</p>
              </div>
            </Link>

            <Link href="/portfolio/sample-case" className="card card-portfolio">
              <div className="card-media" role="img" aria-label="แคมเปญ ads คลินิกความงาม" style={{ background: "linear-gradient(135deg, var(--color-orange-300), var(--color-orange-500))" }}></div>
              <div className="card-body">
                <span className="card-meta"><span>Online Marketing</span><span className="card-meta-dot"></span><span>2025</span></span>
                <h3 className="card-title">คลินิกความงาม Aura</h3>
                <p className="card-desc">ยิงแอด Meta + Google ROAS เฉลี่ย 6.8× ใน 4 เดือน</p>
              </div>
            </Link>

            <Link href="/portfolio/sample-case" className="card card-portfolio">
              <div className="card-media" role="img" aria-label="แคมเปญ SEO บริษัทบัญชี" style={{ background: "linear-gradient(135deg, var(--color-blue-300), var(--color-blue-500))" }}></div>
              <div className="card-body">
                <span className="card-meta"><span>SEO</span><span className="card-meta-dot"></span><span>2025</span></span>
                <h3 className="card-title">สำนักบัญชี ทรัพย์สิน</h3>
                <p className="card-desc">SEO ภาษาไทย ติดหน้าแรกใน 90 วัน ทราฟฟิก +480%</p>
              </div>
            </Link>

            <Link href="/portfolio/sample-case" className="card card-portfolio">
              <div className="card-media" role="img" aria-label="วิดีโอแคมเปญร้านอาหาร" style={{ background: "linear-gradient(135deg, #5C1A02, var(--color-orange-700))" }}></div>
              <div className="card-body">
                <span className="card-meta"><span>Video &amp; Content</span><span className="card-meta-dot"></span><span>2025</span></span>
                <h3 className="card-title">ร้านอาหาร The Lobby</h3>
                <p className="card-desc">ผลิตวิดีโอ 12 ชิ้น สำหรับ TikTok + IG Reels ยอด view 2.3M</p>
              </div>
            </Link>

            <Link href="/portfolio/sample-case" className="card card-portfolio">
              <div className="card-media" role="img" aria-label="เว็บนอนโรงแรมทะเล" style={{ background: "linear-gradient(135deg, var(--color-blue-700), var(--color-text))" }}></div>
              <div className="card-body">
                <span className="card-meta"><span>Web Design</span><span className="card-meta-dot"></span><span>2025</span></span>
                <h3 className="card-title">โรงแรม Ocean Bay</h3>
                <p className="card-desc">เว็บจองห้องพัก พร้อมระบบ payment การจองเพิ่ม 180%</p>
              </div>
            </Link>

            <Link href="/portfolio/sample-case" className="card card-portfolio">
              <div className="card-media" role="img" aria-label="แคมเปญ branding ร้านขนม" style={{ background: "linear-gradient(135deg, var(--color-peach), var(--color-orange-300))" }}></div>
              <div className="card-body">
                <span className="card-meta"><span>Branding</span><span className="card-meta-dot"></span><span>2024</span></span>
                <h3 className="card-title">ร้านขนม PomPom</h3>
                <p className="card-desc">รีแบรนด์ + แพ็คเกจจิ้ง ยอดขาย IG ขึ้น 4 เท่า</p>
              </div>
            </Link>

            <Link href="/portfolio/sample-case" className="card card-portfolio">
              <div className="card-media" role="img" aria-label="ระบบ AI Automation บริษัทประกัน" style={{ background: "linear-gradient(135deg, var(--color-orange-500), var(--color-blue-500))" }}></div>
              <div className="card-body">
                <span className="card-meta"><span>Online Marketing</span><span className="card-meta-dot"></span><span>2024</span></span>
                <h3 className="card-title">บริษัทประกัน LifeShield</h3>
                <p className="card-desc">AI ตอบลูกค้า + funnel — ปิดดีล 3.2× เร็วขึ้น</p>
              </div>
            </Link>

          </div>
        </div>
      </section>


      {/* ============================================================ STATS */}
      <section className="section section-tight" aria-labelledby="stats-title">
        <div className="container">
          <div className="stats-band">
            <div className="section-header-center" style={{ marginBottom: "var(--space-12)" }}>
              <span className="eyebrow-chip">● ภาพรวม</span>
              <h2 id="stats-title" style={{ marginTop: "var(--space-4)" }}>8 ปี ของการลงมือทำจริง</h2>
            </div>
            <div className="grid-3" style={{ gap: "var(--space-6)" }}>
              <div className="card card-stat"><span className="card-eyebrow is-orange" aria-hidden="true">★</span><p className="card-stat-num tabular"><span className="accent">100+</span></p><p className="card-stat-label">โปรเจคที่ส่งมอบสำเร็จ</p></div>
              <div className="card card-stat"><span className="card-eyebrow is-blue" aria-hidden="true">◆</span><p className="card-stat-num tabular">8<span className="unit">ปี</span></p><p className="card-stat-label">ประสบการณ์ในวงการดิจิทัล</p></div>
              <div className="card card-stat"><span className="card-eyebrow is-orange" aria-hidden="true">↗</span><p className="card-stat-num tabular"><span className="accent">5.2×</span></p><p className="card-stat-label">ROAS เฉลี่ยของลูกค้า</p></div>
            </div>
          </div>
        </div>
      </section>


      {/* ============================================================ DARK CTA */}
      <div className="section section-dark-pre" aria-hidden="true"></div>
      <section className="section section-dark" aria-labelledby="cta-title">
        <div className="container">
          <div className="section-header section-header-center">
            <span className="eyebrow">● พร้อมเริ่ม</span>
            <h2 id="cta-title">อยากให้ธุรกิจคุณเป็นเคสต่อไป?</h2>
            <p className="lead">นัดคุยฟรี 30 นาที — เล่าโจทย์ให้ฟัง เราจะแนะนำแนวทางที่เคยใช้ได้ผลกับธุรกิจคล้าย ๆ คุณ</p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)", justifyContent: "center", marginTop: "var(--space-10)" }}>
            <Link href="/contact" className="btn btn-orange btn-lg btn-arrow"><span className="btn-label">นัดคุยกับทีม</span></Link>
            <Link href="/services" className="btn btn-on-dark btn-lg"><span className="btn-label">ดูบริการ</span></Link>
          </div>
        </div>
      </section>

    </main>
  );
}
