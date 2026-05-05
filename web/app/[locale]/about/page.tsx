import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getSiteSetting } from "@/utils/supabase/queries";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { buildPageMetadata } from "@/utils/metadata";
import "@/styles/pages/about.css";

export const revalidate = 3600;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });
  return buildPageMetadata({
    locale,
    path: "/about",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

type StatsSetting = {
  projects: string;
  years: string;
  roas: string;
  seo_days: string;
};

type FounderSetting = {
  name: string;
  role: string;
  bio_th?: string;
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [stats, founder] = await Promise.all([
    getSiteSetting<StatsSetting>("stats"),
    getSiteSetting<FounderSetting>("founder"),
  ]);

  return (
    <main id="main">
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: locale === "en" ? "Home" : "หน้าแรก", path: "" },
          { name: locale === "en" ? "About" : "เกี่ยวกับเรา", path: "/about" },
        ]}
      />

      {/* ============================================================ PAGE HERO */}
      <section className="page-hero" aria-labelledby="hero-title">
        <div className="page-hero-blob" aria-hidden="true"></div>
        <div className="container">
          <div className="page-hero-inner">
            <span className="eyebrow-pill">
              <span className="star">✦</span>
              <span>About · Best Solutions Bangkok</span>
            </span>
            <h1 id="hero-title">ทีมที่ลงมือทำจริง — ไม่ใช่แค่พรีเซนต์สวย</h1>
            <p className="lead">
              8 ปีในวงการดิจิทัล เราเห็น pain เดิม ๆ ของ SME ไทย —
              งบบานปลาย วัดผลไม่ได้ ติดเทคโนโลยีล้าหลัง
              แล้วตั้งใจลบล้างมันด้วยทีมที่โปร่งใส วัดผลได้ และทำงานแบบ Sprint
            </p>
          </div>
        </div>
      </section>


      {/* ============================================================ FOUNDER STORY */}
      <section className="section section-tight" id="founder" aria-labelledby="founder-title">
        <div className="container">
          <Reveal className="founder-grid">

            <div className="founder-photo" role="img" aria-label="ภาพ Founder Best Solutions"></div>

            <div className="founder-body">
              <span className="eyebrow-chip">● จุดเริ่มต้น</span>
              <h2 id="founder-title" style={{ marginTop: "var(--space-4)", marginBottom: "var(--space-6)" }}>
                ทำไมเริ่มต้น Best Solutions
              </h2>

              <p>
                ตลอด 10 ปีในวงการ Digital Marketing ผมเห็นปัญหาซ้ำเดิมที่ลูกค้าต้องเจอ — คือความ
                <strong>"ไม่ชัดเจน"</strong> ไม่ว่าจะเป็นการวัดผลไม่ได้ งบประมาณบานปลาย
                หรือการถูกผูกมัดด้วยเทคโนโลยีที่ล้าหลัง
              </p>

              <div className="founder-quote">
                "ผมก่อตั้ง Best Solutions ขึ้นมาด้วยความตั้งใจเดียว — คือลบล้าง pain points เหล่านั้น"
              </div>

              <p>
                ทุกโปรเจคที่นี่เริ่มจากการ <strong>ฟัง</strong> ก่อน เข้าใจว่าธุรกิจคุณกำลังเจอโจทย์อะไร
                ไม่ใช่ขายแพ็กเกจสำเร็จรูป — แล้วค่อยวางแผนเป็น Sprint สั้น ๆ
                ทำงานเห็นผลทุกสัปดาห์ ปรับได้รวดเร็ว วัดผลได้ทุกบาทที่ลงทุน
              </p>

              <p>
                วันนี้เรามีทีมในกรุงเทพฯ ที่ดูแลทั้งงานออกแบบเว็บ ยิงแอด ทำ SEO ระบบ AI Automation
                จนถึง Production — ครบในที่เดียว ไม่ต้องไล่หาเอเจนซีหลายเจ้าให้ปวดหัว
              </p>

              <div className="founder-sig">
                <div className="founder-sig-name">{founder?.name ?? "ธนกิจ ใจทอง"} (Thanakit Chaithong)</div>
                <div className="founder-sig-role">{founder?.role ?? "Founder & Lead Strategist"}</div>
              </div>
            </div>

          </Reveal>
        </div>
      </section>


      {/* ============================================================ VALUES */}
      <section className="section" id="values" aria-labelledby="values-title">
        <div className="container">
          <Reveal className="section-header-center">
            <span className="eyebrow-chip">● ค่านิยมของทีม</span>
            <h2 id="values-title" style={{ margin: "var(--space-4) 0 var(--space-4)" }}>เราทำงานยังไง</h2>
            <p className="lead">หลัก 4 ข้อที่เราใช้ตัดสินใจในทุกโปรเจค ตั้งแต่ pitch ครั้งแรกจนถึงส่งมอบ</p>
          </Reveal>

          <Reveal className="grid-values" delay={0.1}>

            <article className="value-card">
              <span className="value-num">01</span>
              <h3 className="value-title">โปร่งใส วัดผลได้</h3>
              <p className="value-desc">ทุกบาทที่ลงทุนต้องวัดผลได้ — รายงานชัดเจน ไม่มีค่าใช้จ่ายซ่อน ไม่มี vanity metrics</p>
            </article>

            <article className="value-card">
              <span className="value-num">02</span>
              <h3 className="value-title">Sprint-based ปรับเร็ว</h3>
              <p className="value-desc">วางแผนเป็น Sprint สั้น ๆ ทำเห็นผลทุกสัปดาห์ ปรับได้ทันทีถ้าตลาดเปลี่ยน</p>
            </article>

            <article className="value-card">
              <span className="value-num">03</span>
              <h3 className="value-title">AI-Native ใช้จริง</h3>
              <p className="value-desc">เราใช้ AI ในทุกขั้นตอน — ไม่ใช่แค่คำขายของ แต่เป็นเครื่องมือที่ช่วยลูกค้าประหยัดเวลาจริง</p>
            </article>

            <article className="value-card">
              <span className="value-num">04</span>
              <h3 className="value-title">ไทยจริง คุยกันรู้เรื่อง</h3>
              <p className="value-desc">ทีมในกรุงเทพฯ ไม่ใช่ outsource ต่างประเทศ — เข้าใจตลาด ภาษา และพฤติกรรมคนไทย</p>
            </article>

          </Reveal>
        </div>
      </section>


      {/* ============================================================ PROCESS */}
      <section className="section section-tight" id="process" aria-labelledby="process-title">
        <div className="container">
          <Reveal className="section-header-center">
            <span className="eyebrow-chip">● กระบวนการทำงาน</span>
            <h2 id="process-title" style={{ margin: "var(--space-4) 0 var(--space-4)" }}>4 ขั้นตอน — เริ่มจากเข้าใจคุณ</h2>
            <p className="lead">ไม่มีพิธีรีตอง ไม่บังคับใช้บริการ — เริ่มจากนัดคุยฟรี 30 นาทีก่อน</p>
          </Reveal>

          <Reveal className="process-list" delay={0.1}>

            <article className="process-step">
              <div className="process-num" aria-hidden="true">01</div>
              <div className="process-body">
                <h3>ฟัง · เข้าใจโจทย์</h3>
                <p>นัดคุยฟรี 30 นาที ฟังว่าธุรกิจคุณกำลังเจอโจทย์อะไร — ไม่ขายตรง ไม่กดดัน ไม่ผูกมัด</p>
              </div>
            </article>

            <article className="process-step">
              <div className="process-num" aria-hidden="true">02</div>
              <div className="process-body">
                <h3>วางแผน · ออกแบบ Sprint</h3>
                <p>เสนอแผนงานเป็น Sprint สั้น ๆ พร้อม KPI ชัดเจน รู้ก่อนว่าแต่ละสัปดาห์จะได้อะไร วัดผลยังไง</p>
              </div>
            </article>

            <article className="process-step">
              <div className="process-num" aria-hidden="true">03</div>
              <div className="process-body">
                <h3>ลงมือทำ · รายงานทุกสัปดาห์</h3>
                <p>ทีมเริ่มลงมือ — รายงานความคืบหน้าทุกสัปดาห์ ปรับได้ทันทีถ้าตลาดเปลี่ยนหรือต้องการ pivot</p>
              </div>
            </article>

            <article className="process-step">
              <div className="process-num" aria-hidden="true">04</div>
              <div className="process-body">
                <h3>วัดผล · ส่งมอบ + ดูแลต่อ</h3>
                <p>สรุปผลลัพธ์เทียบ KPI ที่วางไว้ — ส่งมอบงาน พร้อมแผนดูแลต่อเนื่องที่ปรับตามเป้าหมายธุรกิจ</p>
              </div>
            </article>

          </Reveal>
        </div>
      </section>


      {/* ============================================================ STATS BAND */}
      <section className="section section-tight" aria-labelledby="stats-title">
        <div className="container">
          <Reveal className="stats-band">
            <div className="section-header-center" style={{ marginBottom: "var(--space-12)" }}>
              <span className="eyebrow-chip">● ตัวเลขที่เราภูมิใจ</span>
              <h2 id="stats-title" style={{ marginTop: "var(--space-4)" }}>8 ปี ของการลงมือทำจริง</h2>
            </div>

            <div className="grid-3" style={{ gap: "var(--space-6)" }}>
              <div className="card card-stat">
                <span className="card-eyebrow is-orange" aria-hidden="true">★</span>
                <p className="card-stat-num tabular"><span className="accent">{stats?.projects ?? "100+"}</span></p>
                <p className="card-stat-label">โปรเจคที่ส่งมอบสำเร็จ</p>
              </div>

              <div className="card card-stat">
                <span className="card-eyebrow is-blue" aria-hidden="true">◆</span>
                <p className="card-stat-num tabular">{stats?.years ?? "8"}<span className="unit">ปี</span></p>
                <p className="card-stat-label">ประสบการณ์ในวงการดิจิทัล</p>
              </div>

              <div className="card card-stat">
                <span className="card-eyebrow is-orange" aria-hidden="true">↗</span>
                <p className="card-stat-num tabular"><span className="accent">{stats?.roas ?? "5.2×"}</span></p>
                <p className="card-stat-label">ROAS เฉลี่ยของลูกค้า</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>


      {/* ============================================================ CTA BAND (DARK) */}
      <div className="section section-dark-pre" aria-hidden="true"></div>

      <section className="section section-dark" aria-labelledby="cta-title">
        <div className="container">
          <Reveal className="section-header section-header-center">
            <span className="eyebrow">● เริ่มต้นวันนี้</span>
            <h2 id="cta-title">มาคุยกันก่อน — ไม่ผูกมัด</h2>
            <p className="lead">นัดคุยฟรี 30 นาที ฟังโจทย์ก่อน เสนอแนวทาง ไม่กดดันให้เซ็นทันที</p>
          </Reveal>

          <Reveal style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)", justifyContent: "center", marginTop: "var(--space-10)" }} delay={0.1}>
            <Link href="/contact" className="btn btn-orange btn-lg btn-arrow">
              <span className="btn-label">นัดคุยกับทีม</span>
            </Link>
            <Link href="/services" className="btn btn-on-dark btn-lg">
              <span className="btn-label">ดูบริการทั้งหมด</span>
            </Link>
            <Link href="/portfolio" className="btn btn-on-dark btn-lg">
              <span className="btn-label">ดูผลงานก่อน</span>
            </Link>
          </Reveal>
        </div>
      </section>

    </main>
  );
}
