import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import "@/styles/pages/blog.css";

export const metadata: Metadata = {
  title: "บล็อก · Best Solutions — บทความ AI, Digital Marketing, SEO ภาษาไทย",
  description:
    "บทความและไอเดียจากทีม Best Solutions — เขียนเฉพาะที่ลงมือทำจริง ครอบคลุม AI Automation, Digital Marketing, SEO ภาษาไทย, Web Design และเคส SME",
};

export default async function BlogPage({
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
            <span className="eyebrow-pill"><span className="star">✦</span><span>Blog · Insights from the team</span></span>
            <h1 id="hero-title">บทความและไอเดียจากทีม</h1>
            <p className="lead">เราเขียนเฉพาะที่ลงมือทำจริง — ไม่ก๊อปจาก ChatGPT ทุกบทความผ่านการ verify โดยทีมที่ดูแลเคสในระบบจริง</p>
          </div>
        </div>
      </section>


      {/* ============================================================ LIST */}
      <section className="section section-tight" id="posts" aria-labelledby="posts-title">
        <div className="container">
          <h2 id="posts-title" style={{ position: "absolute", clip: "rect(0 0 0 0)", width: "1px", height: "1px", overflow: "hidden" }}>บทความทั้งหมด</h2>

          <div className="filter-bar" role="tablist" aria-label="กรองตามหมวดหมู่">
            <button className="filter-chip is-active" type="button" role="tab" aria-selected={true}>ทั้งหมด</button>
            <button className="filter-chip" type="button" role="tab" aria-selected={false}>AI</button>
            <button className="filter-chip" type="button" role="tab" aria-selected={false}>Digital Marketing</button>
            <button className="filter-chip" type="button" role="tab" aria-selected={false}>SEO</button>
            <button className="filter-chip" type="button" role="tab" aria-selected={false}>Web Design</button>
            <button className="filter-chip" type="button" role="tab" aria-selected={false}>Case Studies</button>
          </div>

          {/* Featured */}
          <Link href="/blog/sample-post" className="featured-card" aria-labelledby="featured-title">
            <div className="featured-media" role="img" aria-label="ภาพประกอบบทความ AI ตอบลูกค้า"></div>
            <div className="featured-body">
              <span className="featured-cat">Featured · AI</span>
              <h3 className="featured-title" id="featured-title">5 วิธีใช้ AI ลดเวลาตอบลูกค้าใน SME ไทย — ทำได้จริงใน 2 สัปดาห์</h3>
              <p className="featured-excerpt">รวม use case ที่เราใช้กับลูกค้าจริง ทั้ง chatbot Facebook + LINE OA + อีเมล ปรับแล้วเห็นผลตั้งแต่สัปดาห์แรก พร้อมตัวอย่างต้นทุนที่ใช้จริง</p>
              <div className="featured-meta">
                <span><strong>ทีม Best Solutions</strong></span>
                <span>·</span>
                <span>5 พ.ค. 2026</span>
                <span>·</span>
                <span>อ่าน 8 นาที</span>
              </div>
            </div>
          </Link>

          {/* Grid */}
          <div className="grid-blog">

            <Link href="/blog/sample-post" className="card card-blog">
              <div className="card-media" role="img" aria-label="ภาพประกอบบทความยิงแอด" style={{ background: "linear-gradient(135deg, var(--color-blue-300), var(--color-blue-500))" }}></div>
              <div className="card-body">
                <span className="card-category is-blue">Digital Marketing</span>
                <h3 className="card-title">ยิงแอด Meta ปี 2026 ต้องรู้อะไรบ้าง</h3>
                <p className="card-excerpt">อัปเดตอัลกอริทึมล่าสุด พร้อมโครงสร้างแคมเปญที่ใช้ได้จริง</p>
                <span className="card-meta"><span>3 พ.ค. 2026</span><span className="card-meta-dot"></span><span>ธนกิจ ใจทอง</span></span>
              </div>
            </Link>

            <Link href="/blog/sample-post" className="card card-blog">
              <div className="card-media" role="img" aria-label="ภาพประกอบบทความ SEO" style={{ background: "linear-gradient(135deg, var(--color-orange-500), var(--color-orange-700))" }}></div>
              <div className="card-body">
                <span className="card-category">SEO</span>
                <h3 className="card-title">ทำ SEO ภาษาไทยให้ติดหน้าแรกใน 90 วัน</h3>
                <p className="card-excerpt">checklist ที่ใช้กับลูกค้าจริง 30+ เคส — เน้นโครงสร้างก่อนเขียน</p>
                <span className="card-meta"><span>1 พ.ค. 2026</span><span className="card-meta-dot"></span><span>SEO Team</span></span>
              </div>
            </Link>

            <Link href="/blog/sample-post" className="card card-blog">
              <div className="card-media" role="img" aria-label="ภาพประกอบบทความ Web Design" style={{ background: "linear-gradient(135deg, var(--color-text), var(--color-orange-700))" }}></div>
              <div className="card-body">
                <span className="card-category">Web Design</span>
                <h3 className="card-title">7 ข้อผิดพลาดที่เจอบ่อยในเว็บ SME ไทย</h3>
                <p className="card-excerpt">ปัญหาที่ทำให้ลูกค้าหลุด และวิธีแก้ที่ใช้เวลาไม่ถึงสัปดาห์</p>
                <span className="card-meta"><span>28 เม.ย. 2026</span><span className="card-meta-dot"></span><span>ทีม Design</span></span>
              </div>
            </Link>

            <Link href="/blog/sample-post" className="card card-blog">
              <div className="card-media" role="img" aria-label="ภาพประกอบบทความ AI" style={{ background: "linear-gradient(135deg, var(--color-orange-300), var(--color-peach))" }}></div>
              <div className="card-body">
                <span className="card-category">AI</span>
                <h3 className="card-title">n8n vs Zapier vs Make — เลือกตัวไหนสำหรับ SME ไทย</h3>
                <p className="card-excerpt">เปรียบเทียบ 3 เครื่องมือ automation ที่ใช้กันบ่อย พร้อมราคาจริง</p>
                <span className="card-meta"><span>22 เม.ย. 2026</span><span className="card-meta-dot"></span><span>ทีม AI</span></span>
              </div>
            </Link>

            <Link href="/blog/sample-post" className="card card-blog">
              <div className="card-media" role="img" aria-label="ภาพประกอบบทความ SEO" style={{ background: "linear-gradient(135deg, var(--color-blue-500), var(--color-blue-700))" }}></div>
              <div className="card-body">
                <span className="card-category is-blue">SEO</span>
                <h3 className="card-title">สลัก URL ภาษาไทย ทำได้ไหม + กระทบ SEO หรือเปล่า</h3>
                <p className="card-excerpt">คำถามยอดฮิตของลูกค้า — มีคำตอบจาก case จริง 12 เคส</p>
                <span className="card-meta"><span>18 เม.ย. 2026</span><span className="card-meta-dot"></span><span>SEO Team</span></span>
              </div>
            </Link>

            <Link href="/blog/sample-post" className="card card-blog">
              <div className="card-media" role="img" aria-label="ภาพประกอบบทความเคสลูกค้า" style={{ background: "linear-gradient(135deg, var(--color-peach), var(--color-orange-500))" }}></div>
              <div className="card-body">
                <span className="card-category">Case Studies</span>
                <h3 className="card-title">วิเคราะห์เคส SportLab — ทำไมยอดขายขึ้น 220%</h3>
                <p className="card-excerpt">เจาะรายละเอียด funnel + page speed + retention ที่ทำให้เปลี่ยนตัวเลข</p>
                <span className="card-meta"><span>15 เม.ย. 2026</span><span className="card-meta-dot"></span><span>ธนกิจ ใจทอง</span></span>
              </div>
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
            <h2 id="cta-title">อยากให้เราช่วยปรับใช้กับธุรกิจคุณ?</h2>
            <p className="lead">เนื้อหาในบล็อกเป็นแค่ส่วนหนึ่งของสิ่งที่เราทำให้ลูกค้า — ทักมาเล่าโจทย์ดู เราจะช่วยปรับให้เหมาะกับเคสคุณ</p>
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
