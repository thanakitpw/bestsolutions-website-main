import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
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

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const stats = await getSiteSetting<StatsSetting>("stats");

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
            <h1 id="hero-title">ทีมดิจิทัลที่เริ่มจากเข้าใจธุรกิจ ก่อนลงมือวางระบบ</h1>
            <p className="lead">
              ตลอดหลายปีที่ทำงานกับธุรกิจไทย เราเห็นปัญหาคล้ายกันซ้ำ ๆ
              ทั้งเว็บไซต์ที่ดูไม่น่าเชื่อถือ โฆษณาที่วัดผลยาก และระบบหลังบ้านที่ทำให้ทีมเสียเวลากับงานซ้ำ
              เราจึงตั้งใจทำงานให้ชัดเจน เป็นขั้นตอน และต่อยอดได้จริง
            </p>
          </div>
        </div>
      </section>


      {/* ============================================================ ORIGIN STORY */}
      <section className="section section-tight" id="origin" aria-labelledby="origin-title">
        <div className="container">
          <Reveal className="founder-grid">

            <div className="founder-photo">
              <Image
                src="/about-start-workspace.webp"
                alt="ภาพโต๊ะทำงานและการวางแผนดิจิทัลของทีม Best Solutions"
                fill
                className="founder-photo-img"
                sizes="(max-width: 959px) 100vw, 40vw"
              />
            </div>

            <div className="founder-body">
              <span className="eyebrow-chip">● จุดเริ่มต้น</span>
              <h2 id="origin-title" style={{ marginTop: "var(--space-4)", marginBottom: "var(--space-6)" }}>
                ทำไมเราถึงเริ่มต้น Best Solutions
              </h2>

              <p>
                ตลอดเวลาที่ทำงานในวงการ Digital Marketing เราพบปัญหาที่เจ้าของธุรกิจเจอบ่อยมาก คือ
                <strong>ความไม่ชัดเจน</strong> ทั้งเรื่องงบประมาณ ผลลัพธ์ ขั้นตอนทำงาน
                และระบบที่ใช้งานต่อได้ยากหลังส่งมอบ
              </p>

              <div className="founder-quote">
                “เราอยากให้การทำดิจิทัลของธุรกิจไทยชัดเจนขึ้น วัดผลได้ขึ้น และไม่ซับซ้อนเกินจำเป็น”
              </div>

              <p>
                ทุกโปรเจกต์จึงเริ่มจากการ <strong>ฟัง</strong> ก่อน ทำความเข้าใจว่าธุรกิจกำลังเจอโจทย์อะไร
                เป้าหมายคืออะไร และข้อจำกัดอยู่ตรงไหน จากนั้นค่อยวางแผนเป็นรอบงานสั้น ๆ
                เพื่อให้เห็นความคืบหน้า ปรับทิศได้ และติดตามผลได้ต่อเนื่อง
              </p>

              <p>
                วันนี้ Best Solutions มีทีมในกรุงเทพฯ ที่ดูแลงานเว็บไซต์ โฆษณา SEO โซเชียล
                และ Automation ให้เชื่อมกันเป็นระบบเดียว ช่วยลดภาระการประสานงานหลายทีม และทำให้ภาพรวมของธุรกิจชัดขึ้น
              </p>
            </div>

          </Reveal>
        </div>
      </section>


      {/* ============================================================ VALUES */}
      <section className="section" id="values" aria-labelledby="values-title">
        <div className="container">
          <Reveal className="section-header-center">
            <span className="eyebrow-chip">● ค่านิยมของทีม</span>
            <h2 id="values-title" style={{ margin: "var(--space-4) 0 var(--space-4)" }}>หลักการทำงานที่เราใช้ในทุกโปรเจกต์</h2>
            <p className="lead">เราให้ความสำคัญกับความชัดเจน การสื่อสารตรง และการทำงานที่ลูกค้าติดตามต่อได้ ตั้งแต่วันแรกที่คุยกันจนถึงวันที่ส่งมอบงาน</p>
          </Reveal>

          <Reveal className="grid-values" delay={0.1}>

            <article className="value-card">
              <span className="value-num">01</span>
              <h3 className="value-title">โปร่งใสและวัดผลได้</h3>
              <p className="value-desc">วางเป้าหมายและรายงานผลให้เข้าใจง่าย ลดตัวเลขที่ดูดีแต่ไม่ช่วยตัดสินใจ และแจ้งขอบเขตงานให้ชัดตั้งแต่ต้น</p>
            </article>

            <article className="value-card">
              <span className="value-num">02</span>
              <h3 className="value-title">ทำงานเป็นรอบ ปรับได้เร็ว</h3>
              <p className="value-desc">แบ่งงานเป็น Sprint สั้น ๆ เพื่อให้เห็นความคืบหน้าเป็นช่วง และปรับแผนได้เมื่อข้อมูลหรือสถานการณ์เปลี่ยน</p>
            </article>

            <article className="value-card">
              <span className="value-num">03</span>
              <h3 className="value-title">ใช้ AI ในจุดที่ช่วยงานได้จริง</h3>
              <p className="value-desc">ใช้ AI และ Automation เพื่อช่วยลดงานซ้ำ เพิ่มความเร็วในการทำงาน และทำให้ทีมลูกค้ามีเวลามากขึ้นกับงานที่สำคัญกว่า</p>
            </article>

            <article className="value-card">
              <span className="value-num">04</span>
              <h3 className="value-title">ทีมไทยที่เข้าใจบริบทธุรกิจไทย</h3>
              <p className="value-desc">ทีมอยู่ในไทย สื่อสารตรง เข้าใจภาษา ตลาด และพฤติกรรมลูกค้าไทย ทำให้คุยงานและปรับทิศทางได้ง่ายขึ้น</p>
            </article>

          </Reveal>
        </div>
      </section>


      {/* ============================================================ PROCESS */}
      <section className="section section-tight" id="process" aria-labelledby="process-title">
        <div className="container">
          <Reveal className="section-header-center">
            <span className="eyebrow-chip">● กระบวนการทำงาน</span>
            <h2 id="process-title" style={{ margin: "var(--space-4) 0 var(--space-4)" }}>เริ่มจากเข้าใจโจทย์ แล้วค่อยวางระบบให้เหมาะกับธุรกิจ</h2>
            <p className="lead">กระบวนการทำงานของเราออกแบบให้ลูกค้าเห็นภาพตั้งแต่ต้น รู้ว่าต้องเตรียมอะไร จะได้อะไร และวัดผลอย่างไรในแต่ละช่วง</p>
          </Reveal>

          <Reveal className="process-list" delay={0.1}>

            <article className="process-step">
              <div className="process-num" aria-hidden="true">01</div>
              <div className="process-body">
                <h3>ฟังและเข้าใจโจทย์</h3>
                <p>นัดคุยเพื่อฟังเป้าหมาย ปัญหา และข้อจำกัดของธุรกิจ ก่อนเสนอแนวทางที่เหมาะสมโดยไม่กดดัน</p>
              </div>
            </article>

            <article className="process-step">
              <div className="process-num" aria-hidden="true">02</div>
              <div className="process-body">
                <h3>วางแผนและกำหนดรอบงาน</h3>
                <p>แปลงโจทย์เป็นแผนงาน ขอบเขต และตัวชี้วัดที่ชัดเจน เพื่อให้รู้ว่าแต่ละรอบควรเดินไปทางไหน</p>
              </div>
            </article>

            <article className="process-step">
              <div className="process-num" aria-hidden="true">03</div>
              <div className="process-body">
                <h3>ลงมือทำและสื่อสารต่อเนื่อง</h3>
                <p>ทีมเริ่มลงมือ พร้อมอัปเดตความคืบหน้าเป็นระยะ เพื่อให้ลูกค้าเห็นงานจริงและปรับรายละเอียดได้ทันเวลา</p>
              </div>
            </article>

            <article className="process-step">
              <div className="process-num" aria-hidden="true">04</div>
              <div className="process-body">
                <h3>วัดผล ส่งมอบ และต่อยอด</h3>
                <p>สรุปผลเทียบกับเป้าหมาย ส่งมอบงานให้ใช้งานต่อได้ และแนะนำแนวทางดูแลหรือพัฒนาต่อเมื่อธุรกิจพร้อม</p>
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
              <span className="eyebrow-chip">● ตัวเลขจากการทำงานจริง</span>
              <h2 id="stats-title" style={{ marginTop: "var(--space-4)" }}>ประสบการณ์ที่ต่อยอดเป็นระบบให้ลูกค้า</h2>
            </div>

            <div className="grid-3" style={{ gap: "var(--space-6)" }}>
              <div className="card card-stat">
                <span className="card-eyebrow is-orange" aria-hidden="true">★</span>
                <p className="card-stat-num tabular"><span className="accent">{stats?.projects ?? "100+"}</span></p>
                <p className="card-stat-label">โปรเจกต์ที่ส่งมอบให้ลูกค้า</p>
              </div>

              <div className="card card-stat">
                <span className="card-eyebrow is-blue" aria-hidden="true">◆</span>
                <p className="card-stat-num tabular">{stats?.years ?? "8"}<span className="unit">ปี</span></p>
                <p className="card-stat-label">ประสบการณ์ด้านดิจิทัล</p>
              </div>

              <div className="card card-stat">
                <span className="card-eyebrow is-orange" aria-hidden="true">↗</span>
                <p className="card-stat-num tabular"><span className="accent">{stats?.roas ?? "5.2×"}</span></p>
                <p className="card-stat-label">ROAS เฉลี่ยจากแคมเปญลูกค้า</p>
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
            <h2 id="cta-title">เล่าโจทย์ให้เราฟังก่อน แล้วค่อยดูว่าควรเริ่มจากตรงไหน</h2>
            <p className="lead">นัดคุยฟรีเพื่อให้เราช่วยดูภาพรวมของธุรกิจ แนะนำทิศทางที่เหมาะสม และตอบคำถามก่อนตัดสินใจเริ่มงาน</p>
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
