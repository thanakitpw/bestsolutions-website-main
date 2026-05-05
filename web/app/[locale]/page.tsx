import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import "@/styles/pages/home.css";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="main">
      {/* ============================================================ HERO */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-blob" aria-hidden="true"></div>

        <div className="container">
          <div className="hero-pills" aria-hidden="true">
            <span className="hero-pill hero-pill-1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 8h18" />
              </svg>
              เว็บไซต์
            </span>
            <span className="hero-pill hero-pill-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.5-4.5" />
              </svg>
              SEO
            </span>
            <span className="hero-pill hero-pill-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l2.5 5.5L20 10l-5.5 2.5L12 18l-2.5-5.5L4 10l5.5-2.5L12 2z" />
              </svg>
              AI Automation
            </span>
          </div>

          <div className="hero-inner">
            <span className="eyebrow-pill">
              <span className="star">✦</span>
              <span>AI-Driven Agency · กรุงเทพฯ</span>
            </span>
            <h1 id="hero-title">ทำการตลาดออนไลน์ที่วัดผลได้จริง</h1>
            <p className="lead">
              เราดูแลตั้งแต่ออกแบบเว็บ ยิงแอด ทำ SEO ดูแลโซเชียล ไปจนถึง AI Automation —
              ครบทุกบริการในทีมเดียวที่ทำงานแบบ Sprint วัดผลทุกบาทที่ลงทุน
            </p>

            <div className="hero-actions">
              <Link href="/contact" className="btn btn-primary btn-lg btn-arrow">
                <span className="btn-label">นัดคุยฟรี 30 นาที</span>
              </Link>
              <Link href="/portfolio" className="btn btn-secondary btn-lg">
                <span className="btn-label">ดูผลงานทั้งหมด</span>
              </Link>
            </div>

            <div className="hero-trust">
              <div className="hero-trust-label">ตลอด 8 ปี ในวงการ</div>
              <div className="hero-trust-stats">
                <div className="hero-trust-stat">
                  <div className="num tabular text-orange">100+</div>
                  <div className="lbl">โปรเจคส่งมอบ</div>
                </div>
                <div className="hero-trust-stat">
                  <div className="num tabular">5.2×</div>
                  <div className="lbl">ROAS เฉลี่ย</div>
                </div>
                <div className="hero-trust-stat">
                  <div className="num tabular text-orange">
                    90<small style={{ fontSize: ".55em", color: "var(--color-text-muted)", fontWeight: "var(--weight-regular)", marginLeft: 4 }}>วัน</small>
                  </div>
                  <div className="lbl">SEO เริ่มเห็นผล</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ============================================================ SERVICES */}
      <section className="section" id="services" aria-labelledby="services-title">
        <div className="container">
          <div className="section-header-row">
            <div className="section-header">
              <span className="eyebrow-chip">● บริการของเรา</span>
              <h2 id="services-title">ครบทุกบริการที่ธุรกิจต้องการ</h2>
              <p className="lead">ไม่ต้องไล่หาเอเจนซีหลายเจ้า — ทีมเดียวดูแลตั้งแต่ออกแบบ ยิงแอด ไปจนถึงระบบหลังบ้าน</p>
            </div>
            <Link href="/services" className="btn btn-ghost btn-arrow">
              <span className="btn-label">ดูบริการทั้งหมด</span>
            </Link>
          </div>

          <div className="grid-services">

            <Link href="/services/web-design" className="card card-service">
              <div className="card-icon is-orange" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 8h18M8 12h6" />
                </svg>
              </div>
              <h3 className="card-title">รับทำเว็บไซต์</h3>
              <p className="card-desc">เว็บโหลดเร็ว ขายของได้ ผ่าน SEO ตั้งแต่วันแรก — ไม่ใช่แค่สวย</p>
              <span className="card-link">ดูรายละเอียด</span>
            </Link>

            <Link href="/services" className="card card-service">
              <div className="card-icon is-blue" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 11l18-7v16L3 13z" /><path d="M11 19c0 1.5-1 3-3 3s-3-1.5-3-3" />
                </svg>
              </div>
              <h3 className="card-title">ยิงแอด Meta &amp; Google</h3>
              <p className="card-desc">ปรับแคมเปญรายสัปดาห์ วัดผลทุกบาท ROAS ขึ้นจริง</p>
              <span className="card-link">เช็กแพ็กเกจ</span>
            </Link>

            <Link href="/services" className="card card-service">
              <div className="card-icon is-cream" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.5-4.5" />
                </svg>
              </div>
              <h3 className="card-title">SEO ติดอันดับ Google</h3>
              <p className="card-desc">เนื้อหา Authority + Technical ที่ขึ้นแล้วอยู่ยาว</p>
              <span className="card-link">วางแผน SEO</span>
            </Link>

            <Link href="/services" className="card card-service">
              <div className="card-icon is-orange" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l2.5 5.5L20 10l-5.5 2.5L12 18l-2.5-5.5L4 10l5.5-2.5L12 2z" />
                </svg>
              </div>
              <h3 className="card-title">AI Automation</h3>
              <p className="card-desc">ระบบตอบลูกค้า ปิดการขาย จัดการหลังบ้านอัตโนมัติ</p>
              <span className="card-link">ดู Flow ตัวอย่าง</span>
            </Link>

          </div>
        </div>
      </section>


      {/* ============================================================ FEATURED PORTFOLIO */}
      <section className="section section-tight" id="featured" aria-labelledby="featured-title">
        <div className="container">
          <div className="section-header-row">
            <div className="section-header">
              <span className="eyebrow-chip is-blue">● ผลงานล่าสุด</span>
              <h2 id="featured-title">โปรเจคที่ส่งมอบล่าสุด</h2>
              <p className="lead">ทุกโปรเจคที่นี่ได้รับความยินยอมจากลูกค้าให้แสดงต่อสาธารณะแล้ว</p>
            </div>
            <Link href="/portfolio" className="btn btn-ghost btn-arrow">
              <span className="btn-label">ดูผลงานทั้งหมด</span>
            </Link>
          </div>

          <div className="grid-3">

            <Link href="/portfolio/sample-case" className="card card-portfolio">
              <div
                className="card-media"
                role="img"
                aria-label="หน้าเว็บใหม่ของบริษัท ก.ก่อสร้างไทย"
                style={{ background: "linear-gradient(135deg, var(--color-orange-500), var(--color-peach))" }}
              ></div>
              <div className="card-body">
                <span className="card-meta"><span>Web Design</span><span className="card-meta-dot"></span><span>2026</span></span>
                <h3 className="card-title">บริษัท ก.ก่อสร้างไทย</h3>
                <p className="card-desc">รื้อเว็บเก่า ทำใหม่ทั้งหมด — โหลดเร็วขึ้น 4 เท่า ลีดเข้าเพิ่ม 3.5×</p>
              </div>
            </Link>

            <Link href="/portfolio" className="card card-portfolio">
              <div
                className="card-media"
                role="img"
                aria-label="หน้าร้าน e-commerce SportLab"
                style={{ background: "linear-gradient(135deg, var(--color-blue-500), var(--color-blue-700))" }}
              ></div>
              <div className="card-body">
                <span className="card-meta"><span>E-Commerce</span><span className="card-meta-dot"></span><span>2026</span></span>
                <h3 className="card-title">SportLab อุปกรณ์กีฬา</h3>
                <p className="card-desc">เว็บ e-commerce พร้อมระบบสต็อก — ยอดขายขึ้น 220% ใน 6 เดือน</p>
              </div>
            </Link>

            <Link href="/portfolio" className="card card-portfolio">
              <div
                className="card-media"
                role="img"
                aria-label="ภาพรีแบรนด์คาเฟ่บ้านสวน"
                style={{ background: "linear-gradient(135deg, var(--color-text), var(--color-orange-700))" }}
              ></div>
              <div className="card-body">
                <span className="card-meta"><span>Branding</span><span className="card-meta-dot"></span><span>2025</span></span>
                <h3 className="card-title">คาเฟ่ บ้านสวน</h3>
                <p className="card-desc">รีแบรนด์ทั้งร้าน + เว็บ + โซเชียล — ขึ้นเทรนด์ในย่านภายใน 3 เดือน</p>
              </div>
            </Link>

          </div>
        </div>
      </section>


      {/* ============================================================ STATS BAND */}
      <section className="section section-tight" aria-labelledby="stats-title">
        <div className="container">
          <div className="stats-band">
            <div className="section-header" style={{ textAlign: "center", marginBottom: "var(--space-12)" }}>
              <span className="eyebrow-chip">● ตัวเลขที่เราภูมิใจ</span>
              <h2 id="stats-title">8 ปี ของการลงมือทำจริง</h2>
            </div>

            <div className="grid-3" style={{ gap: "var(--space-6)" }}>
              <div className="card card-stat">
                <span className="card-eyebrow is-orange" aria-hidden="true">★</span>
                <p className="card-stat-num tabular"><span className="accent">100+</span></p>
                <p className="card-stat-label">โปรเจคที่ส่งมอบสำเร็จ</p>
              </div>

              <div className="card card-stat">
                <span className="card-eyebrow is-blue" aria-hidden="true">◆</span>
                <p className="card-stat-num tabular">8<span className="unit">ปี</span></p>
                <p className="card-stat-label">ประสบการณ์ในวงการดิจิทัล</p>
              </div>

              <div className="card card-stat">
                <span className="card-eyebrow is-orange" aria-hidden="true">↗</span>
                <p className="card-stat-num tabular"><span className="accent">5.2×</span></p>
                <p className="card-stat-label">ROAS เฉลี่ยของลูกค้า</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ============================================================ TESTIMONIALS */}
      <section className="section" id="testimonials" aria-labelledby="testi-title">
        <div className="container">
          <div className="section-header" style={{ marginBottom: "var(--space-12)", maxWidth: 720 }}>
            <span className="eyebrow-chip">● เสียงจากลูกค้า</span>
            <h2 id="testi-title">ทำไมลูกค้าถึงกลับมาใช้บริการต่อ</h2>
          </div>

          <div className="grid-3">

            <article className="testi-card">
              <span className="testi-stars" aria-label="คะแนน 5 จาก 5 ดาว">★★★★★</span>
              <blockquote className="testi-quote">
                &ldquo;ทีมเข้าใจธุรกิจเร็วมาก คุยรอบเดียวเข้าใจว่าเราขายอะไร แอดที่ออกมาเลยตรงกลุ่ม ROAS ขึ้นจาก 1.8 เป็น 4.2 ในเดือนเดียว&rdquo;
              </blockquote>
              <div className="testi-foot">
                <div
                  className="testi-avatar"
                  aria-hidden="true"
                  style={{ background: "linear-gradient(135deg, var(--color-orange-300), var(--color-peach))" }}
                ></div>
                <div>
                  <div className="testi-name">คุณนภา รุ่งเรือง</div>
                  <div className="testi-role">เจ้าของร้าน · SportLab</div>
                </div>
              </div>
            </article>

            <article className="testi-card">
              <span className="testi-stars" aria-label="คะแนน 5 จาก 5 ดาว">★★★★★</span>
              <blockquote className="testi-quote">
                &ldquo;เว็บใหม่โหลดเร็วกว่าเก่ามาก ลูกค้ากดเข้ามาแล้วไม่หลุด ลีดเข้าเพิ่มขึ้น 3 เท่าตั้งแต่เปิดใช้สัปดาห์แรก&rdquo;
              </blockquote>
              <div className="testi-foot">
                <div
                  className="testi-avatar"
                  aria-hidden="true"
                  style={{ background: "linear-gradient(135deg, var(--color-blue-300), var(--color-blue-500))" }}
                ></div>
                <div>
                  <div className="testi-name">คุณวิชัย ทองดี</div>
                  <div className="testi-role">กรรมการผู้จัดการ · ก.ก่อสร้างไทย</div>
                </div>
              </div>
            </article>

            <article className="testi-card">
              <span className="testi-stars" aria-label="คะแนน 5 จาก 5 ดาว">★★★★★</span>
              <blockquote className="testi-quote">
                &ldquo;ระบบ AI ตอบลูกค้าที่ทีมทำให้ ลดงานแอดมินไปวันละเกือบ 3 ชั่วโมง — ใช้เวลาที่เหลือคิดเรื่องผลิตภัณฑ์ใหม่ได้แทน&rdquo;
              </blockquote>
              <div className="testi-foot">
                <div
                  className="testi-avatar"
                  aria-hidden="true"
                  style={{ background: "linear-gradient(135deg, var(--color-orange-500), var(--color-orange-700))" }}
                ></div>
                <div>
                  <div className="testi-name">คุณพิมพ์ใจ เจริญสุข</div>
                  <div className="testi-role">เจ้าของร้าน · คาเฟ่ บ้านสวน</div>
                </div>
              </div>
            </article>

          </div>
        </div>
      </section>


      {/* ============================================================ BLOG TEASER */}
      <section className="section section-tight" id="blog" aria-labelledby="blog-title">
        <div className="container">
          <div className="section-header-row">
            <div className="section-header">
              <span className="eyebrow-chip is-blue">● บทความล่าสุด</span>
              <h2 id="blog-title">เทคนิคและไอเดียจากทีม</h2>
              <p className="lead">เราเขียนเฉพาะที่ลงมือทำจริง ไม่ก๊อปจาก ChatGPT</p>
            </div>
            <Link href="/blog" className="btn btn-ghost btn-arrow">
              <span className="btn-label">บทความทั้งหมด</span>
            </Link>
          </div>

          <div className="grid-3">

            <Link href="/blog/sample-post" className="card card-blog">
              <div
                className="card-media"
                role="img"
                aria-label="ภาพประกอบบทความ AI"
                style={{ background: "linear-gradient(135deg, var(--color-orange-300), var(--color-peach))" }}
              ></div>
              <div className="card-body">
                <span className="card-category">AI</span>
                <h3 className="card-title">5 วิธีใช้ AI ลดเวลาตอบลูกค้าใน SME ไทย</h3>
                <p className="card-excerpt">รวม use case ที่เราใช้กับลูกค้าจริง ปรับแล้วเห็นผลใน 2 สัปดาห์</p>
                <span className="card-meta"><span>5 พ.ค. 2026</span><span className="card-meta-dot"></span><span>ทีม Best Solutions</span></span>
              </div>
            </Link>

            <Link href="/blog" className="card card-blog">
              <div
                className="card-media"
                role="img"
                aria-label="ภาพประกอบบทความยิงแอด"
                style={{ background: "linear-gradient(135deg, var(--color-blue-300), var(--color-blue-500))" }}
              ></div>
              <div className="card-body">
                <span className="card-category is-blue">Digital Marketing</span>
                <h3 className="card-title">ยิงแอด Meta ปี 2026 ต้องรู้อะไรบ้าง</h3>
                <p className="card-excerpt">อัปเดตอัลกอริทึมล่าสุด พร้อมโครงสร้างแคมเปญที่ใช้ได้จริง</p>
                <span className="card-meta"><span>3 พ.ค. 2026</span><span className="card-meta-dot"></span><span>ธนกิจ ใจทอง</span></span>
              </div>
            </Link>

            <Link href="/blog" className="card card-blog">
              <div
                className="card-media"
                role="img"
                aria-label="ภาพประกอบบทความ SEO"
                style={{ background: "linear-gradient(135deg, var(--color-orange-500), var(--color-orange-700))" }}
              ></div>
              <div className="card-body">
                <span className="card-category">SEO</span>
                <h3 className="card-title">ทำ SEO ภาษาไทยให้ติดหน้าแรกใน 90 วัน</h3>
                <p className="card-excerpt">checklist ที่ใช้กับลูกค้าจริง 30+ เคส — เน้นโครงสร้างก่อนเขียน</p>
                <span className="card-meta"><span>1 พ.ค. 2026</span><span className="card-meta-dot"></span><span>SEO Team</span></span>
              </div>
            </Link>

          </div>
        </div>
      </section>


      {/* ============================================================ CTA BAND (DARK) */}
      <div className="section section-dark-pre" aria-hidden="true"></div>

      <section className="section section-dark" aria-labelledby="cta-title">
        <div className="container">
          <div className="section-header section-header-center">
            <span className="eyebrow">● เริ่มต้นวันนี้</span>
            <h2 id="cta-title">พร้อมเริ่มต้นกับเราหรือยัง?</h2>
            <p className="lead">นัดคุยฟรี 30 นาที — ไม่มีพิธีรีตอง ไม่ขายตรง แค่ฟังว่าธุรกิจคุณกำลังเจอโจทย์อะไร แล้วเสนอทางออกให้</p>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)", justifyContent: "center", marginTop: "var(--space-10)" }}>
            <Link href="/contact" className="btn btn-orange btn-lg btn-arrow">
              <span className="btn-label">นัดคุยกับทีม</span>
            </Link>
            <Link href="/portfolio" className="btn btn-on-dark btn-lg">
              <span className="btn-label">ดูผลงานก่อน</span>
            </Link>
          </div>

          <div className="grid-3" style={{ marginTop: "var(--space-16)" }}>
            <article className="card card-dark">
              <div
                className="card-icon is-dark"
                style={{ background: "rgba(255,255,255,0.06)", color: "var(--color-orange-500)" }}
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3 className="card-title">นัดคุยฟรี ไม่มีค่าใช้จ่าย</h3>
              <p className="card-desc">ฟังโจทย์ก่อนเสนอแนวทาง — ไม่กดดัน ไม่ผูกมัด</p>
            </article>

            <article className="card card-dark">
              <div
                className="card-icon is-dark"
                style={{ background: "rgba(255,255,255,0.06)", color: "var(--color-orange-500)" }}
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3 className="card-title">ตอบกลับใน 1 วันทำการ</h3>
              <p className="card-desc">เคสด่วนทักไลน์ได้ ทีมพร้อมรับ จันทร์-ศุกร์ 9:00-18:00</p>
            </article>

            <article className="card card-dark">
              <div
                className="card-icon is-dark"
                style={{ background: "rgba(255,255,255,0.06)", color: "var(--color-orange-500)" }}
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l2.5 5.5L20 10l-5.5 2.5L12 18l-2.5-5.5L4 10l5.5-2.5L12 2z" />
                </svg>
              </div>
              <h3 className="card-title">ทีมในไทย คุยกันรู้เรื่อง</h3>
              <p className="card-desc">ไม่ใช่ outsource ต่างประเทศ — เข้าใจตลาดและพฤติกรรมคนไทย</p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
