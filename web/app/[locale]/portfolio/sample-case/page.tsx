import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import "@/styles/pages/sample-case.css";

export const metadata: Metadata = {
  title: "บริษัท ก.ก่อสร้างไทย · Case Study · Best Solutions",
  description:
    "รื้อเว็บเก่าของบริษัท ก.ก่อสร้างไทย ทำใหม่ทั้งหมดให้โหลดเร็วขึ้น 4 เท่า ลีดเข้าเพิ่ม 3.5× ใน 6 เดือนแรก — เคสจริงจาก Best Solutions",
};

export default async function SampleCasePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="main">

      {/* ============================================================ HERO */}
      <section className="case-hero">
        <div className="container">
          <Link href="/portfolio" className="breadcrumb">
            <span aria-hidden="true">←</span><span>ผลงานทั้งหมด</span>
          </Link>
          <div className="case-hero-meta">
            <span className="case-meta-pill">Web Design</span>
            <span className="case-meta-pill is-blue">SEO</span>
            <span className="case-meta-pill is-neutral">2026</span>
            <span className="case-meta-pill is-neutral">5 สัปดาห์</span>
          </div>
          <h1>บริษัท ก.ก่อสร้างไทย — รื้อเว็บเก่า โหลดเร็วขึ้น 4 เท่า ลีดเพิ่ม 3.5×</h1>
          <p className="lead">เคสรีไซต์ของบริษัทรับเหมาก่อสร้างขนาดกลางในกรุงเทพฯ ที่เคยพึ่งพา Yellow Pages และ word-of-mouth — รื้อเว็บใหม่ทั้งหมดเป็น Next.js + SEO-first ผลลัพธ์เกินคาดใน 6 เดือนแรก</p>
        </div>
      </section>


      <section className="section section-tight">
        <div className="container">
          <div className="case-cover" role="img" aria-label="หน้า home ใหม่ของบริษัท ก.ก่อสร้างไทย"></div>

          {/* Results band */}
          <div className="results-band" style={{ marginBottom: "var(--space-16)" }}>
            <div className="section-header-center" style={{ marginBottom: "var(--space-10)" }}>
              <span className="eyebrow-chip">● ผลลัพธ์</span>
              <h2 style={{ marginTop: "var(--space-4)", fontSize: "var(--text-3xl)" }}>ตัวเลขจากระบบ Analytics จริง</h2>
            </div>
            <div className="results-grid">
              <div>
                <div className="result-num is-orange tabular">4×</div>
                <div className="result-label">โหลดเร็วขึ้น (LCP 3.8s → 0.9s)</div>
              </div>
              <div>
                <div className="result-num tabular">3.5×</div>
                <div className="result-label">ลีดเข้าระบบเพิ่มขึ้น</div>
              </div>
              <div>
                <div className="result-num is-blue tabular">+480%</div>
                <div className="result-label">Organic traffic ภายใน 6 เดือน</div>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="case-body">
            <h2>โจทย์ที่เจ้าของธุรกิจเล่าให้ฟัง</h2>
            <p>"เว็บที่ใช้อยู่เปิดมา 6 ปีแล้ว — ทำกับเอเจนซีท้องถิ่นที่ปิดตัวไป โหลดช้า ทำใน WordPress ที่ปลั๊กอินพังบ่อย ลูกค้าบอกหาเบอร์โทรไม่เจอ ปุ่มเล็ก กดบนมือถือไม่ได้"</p>
            <p>คุณวิชัย กรรมการผู้จัดการ มาหาเราเพราะอยากได้เว็บที่ "เร็ว สะอาด และไม่ต้องเรียกซ่อมทุกครั้ง" — เน้นที่ <strong>ลีดธุรกิจ B2B</strong> มากกว่ายอด traffic ทั่วไป</p>

            <h2>วิธีที่เราเข้าใจ + วางแผน</h2>
            <p>สัปดาห์แรกเราคุยกับทีม sales 3 คนของบริษัท ดูว่าลูกค้าที่ปิดดีลได้ส่วนใหญ่ search keyword อะไร พบว่า <strong>"รับเหมาก่อสร้าง [ย่าน]"</strong> และ <strong>"ราคารับเหมาบ้าน [จังหวัด]"</strong> เป็น keyword ที่ convert สูงสุด — แต่เว็บเก่ายังไม่ได้ optimize ตามเลย</p>
            <ul>
              <li>วาง sitemap ใหม่: หน้า service per ภูมิภาคที่บริษัทรับงาน</li>
              <li>Migrate content เก่า + เขียนใหม่ให้ตรง keyword</li>
              <li>เพิ่ม structured data (LocalBusiness, Service)</li>
              <li>ตั้ง LINE OA + Lead form กับ Pipedrive CRM</li>
            </ul>

            <h2>เทคโนโลยีที่ใช้</h2>
            <ul className="chip-list">
              <li>Next.js 15</li>
              <li>TypeScript</li>
              <li>Tailwind CSS v4</li>
              <li>Supabase</li>
              <li>Vercel</li>
              <li>GA4 + GTM</li>
              <li>Pipedrive CRM</li>
              <li>LINE OA API</li>
            </ul>

            <h2>ผลที่ได้ใน 6 เดือนแรก</h2>
            <p>หลัง launch สิ้นเดือนพฤศจิกายน 2025 ทีมเราตั้ง weekly report ให้ลูกค้าผ่าน Looker Studio — ติดตาม Core Web Vitals + Organic traffic + Lead count รายสัปดาห์</p>
            <p>ภายใน 90 วันแรก keyword หลัก 3 ตัวขึ้นหน้าแรก Google ทั้งหมด ภายใน 180 วัน organic traffic ขึ้นจาก ~800/เดือน เป็น 4,600/เดือน Lead ผ่านฟอร์มเฉลี่ย 24/เดือน (เดิม 6-7/เดือน)</p>
          </div>

          {/* Gallery */}
          <div style={{ marginTop: "var(--space-16)" }}>
            <h2 style={{ textAlign: "center", fontSize: "var(--text-3xl)", fontWeight: "var(--weight-bold)", margin: "0 0 var(--space-8)" }}>หน้าเว็บที่ส่งมอบ</h2>
            <div className="gallery-grid">
              <div className="gallery-img" role="img" aria-label="หน้า services" style={{ background: "linear-gradient(135deg, var(--color-orange-300), var(--color-peach))" }}></div>
              <div className="gallery-img" role="img" aria-label="หน้า portfolio" style={{ background: "linear-gradient(135deg, var(--color-blue-300), var(--color-blue-500))" }}></div>
              <div className="gallery-img" role="img" aria-label="หน้า contact" style={{ background: "linear-gradient(135deg, var(--color-text), var(--color-orange-700))" }}></div>
              <div className="gallery-img" role="img" aria-label="หน้า blog" style={{ background: "linear-gradient(135deg, var(--color-orange-500), var(--color-orange-700))" }}></div>
            </div>
          </div>
        </div>
      </section>


      {/* ============================================================ TESTIMONIAL */}
      <section className="section section-tight">
        <div className="container">
          <article className="testi-card">
            <span className="testi-stars" aria-label="คะแนน 5 จาก 5 ดาว">★★★★★</span>
            <blockquote className="testi-quote">"เว็บใหม่โหลดเร็วกว่าเก่ามาก ลูกค้าที่กดเข้ามาแล้วไม่หลุด ลีดเข้าเพิ่มขึ้น 3 เท่าตั้งแต่เปิดใช้สัปดาห์แรก ทีมงาน Best Solutions ให้คำปรึกษาตรงไปตรงมา ไม่ขายของเกินจริง"</blockquote>
            <div className="testi-foot">
              <div className="testi-avatar" aria-hidden="true" style={{ background: "linear-gradient(135deg, var(--color-blue-300), var(--color-blue-500))" }}></div>
              <div>
                <div className="testi-name">คุณวิชัย ทองดี</div>
                <div className="testi-role">กรรมการผู้จัดการ · บริษัท ก.ก่อสร้างไทย</div>
              </div>
            </div>
          </article>
        </div>
      </section>


      {/* ============================================================ RELATED */}
      <section className="section section-tight">
        <div className="container">
          <div className="section-header-center">
            <span className="eyebrow-chip is-blue">● เคสที่คล้ายกัน</span>
            <h2 style={{ marginTop: "var(--space-4)" }}>ผลงานอื่นที่อาจสนใจ</h2>
          </div>
          <div className="grid-3">
            <Link href="/portfolio/sample-case" className="card card-portfolio">
              <div className="card-media" role="img" aria-label="หน้าร้าน e-commerce SportLab" style={{ background: "linear-gradient(135deg, var(--color-blue-500), var(--color-blue-700))" }}></div>
              <div className="card-body"><span className="card-meta"><span>E-Commerce</span><span className="card-meta-dot"></span><span>2026</span></span><h3 className="card-title">SportLab อุปกรณ์กีฬา</h3><p className="card-desc">เว็บ + ระบบสต็อก ยอดขายขึ้น 220%</p></div>
            </Link>
            <Link href="/portfolio/sample-case" className="card card-portfolio">
              <div className="card-media" role="img" aria-label="โรงแรม Ocean Bay" style={{ background: "linear-gradient(135deg, var(--color-blue-700), var(--color-text))" }}></div>
              <div className="card-body"><span className="card-meta"><span>Web Design</span><span className="card-meta-dot"></span><span>2025</span></span><h3 className="card-title">โรงแรม Ocean Bay</h3><p className="card-desc">เว็บจองห้องพัก การจอง +180%</p></div>
            </Link>
            <Link href="/portfolio/sample-case" className="card card-portfolio">
              <div className="card-media" role="img" aria-label="สำนักบัญชี ทรัพย์สิน" style={{ background: "linear-gradient(135deg, var(--color-blue-300), var(--color-blue-500))" }}></div>
              <div className="card-body"><span className="card-meta"><span>SEO</span><span className="card-meta-dot"></span><span>2025</span></span><h3 className="card-title">สำนักบัญชี ทรัพย์สิน</h3><p className="card-desc">SEO ภาษาไทย ทราฟฟิก +480%</p></div>
            </Link>
          </div>
        </div>
      </section>


      {/* ============================================================ DARK CTA */}
      <div className="section section-dark-pre" aria-hidden="true"></div>
      <section className="section section-dark" aria-labelledby="cta-title">
        <div className="container">
          <div className="section-header section-header-center">
            <span className="eyebrow">● พร้อมเริ่ม</span>
            <h2 id="cta-title">อยากให้เคสของคุณ เป็นเคสต่อไปที่เราภูมิใจ</h2>
            <p className="lead">นัดคุยฟรี 30 นาที — เล่าโจทย์ให้ฟัง เราจะเสนอแนวทางที่ปรับใช้กับธุรกิจคุณได้</p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)", justifyContent: "center", marginTop: "var(--space-10)" }}>
            <Link href="/contact" className="btn btn-orange btn-lg btn-arrow"><span className="btn-label">นัดคุยกับทีม</span></Link>
            <Link href="/portfolio" className="btn btn-on-dark btn-lg"><span className="btn-label">ผลงานทั้งหมด</span></Link>
          </div>
        </div>
      </section>

    </main>
  );
}
