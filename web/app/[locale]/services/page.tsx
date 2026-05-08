import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getServices } from "@/utils/supabase/queries";
import { ServiceIcon } from "@/components/service-icon";
import { ServiceListJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { pickLocale } from "@/utils/format";
import { buildPageMetadata } from "@/utils/metadata";
import "@/styles/pages/services.css";

export const revalidate = 60;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Services" });
  return buildPageMetadata({
    locale,
    path: "/services",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

const SERVICE_TONES = ["is-orange", "is-blue", "is-cream", "is-orange", "is-blue", "is-cream", "is-orange"] as const;
const SERVICES_WITH_DETAIL = new Set(["web-design"]);

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const services = await getServices();

  return (
    <main id="main">
      <ServiceListJsonLd services={services} locale={locale} />
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: locale === "en" ? "Home" : "หน้าแรก", path: "" },
          { name: locale === "en" ? "Services" : "บริการ", path: "/services" },
        ]}
      />

      {/* ============================================================ HERO */}
      <section className="page-hero" aria-labelledby="hero-title">
        <div className="page-hero-blob" aria-hidden="true"></div>
        <div className="container">
          <div className="page-hero-inner">
            <span className="eyebrow-pill">
              <span className="star">✦</span>
              <span>บริการครบวงจร · 6 services</span>
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
          <h2
            id="services-title"
            style={{
              fontSize: "var(--text-3xl)",
              margin: "0 0 var(--space-10)",
            }}
          >
            บริการของเรา
          </h2>

          <Reveal className="grid-services-7">
            {services.map((s, i) => {
              const href = SERVICES_WITH_DETAIL.has(s.slug) ? `/services/${s.slug}` : "/services";
              const tone = SERVICE_TONES[i % SERVICE_TONES.length];
              const features = locale === "en" && s.features_en?.length ? s.features_en : s.features_th;
              return (
                <Link key={s.slug} href={href} className="card card-service">
                  <div className={`card-icon ${tone}`} aria-hidden="true">
                    <ServiceIcon name={s.icon} />
                  </div>
                  <h3 className="card-title">{pickLocale(locale, s.name_th, s.name_en ?? s.name_th)}</h3>
                  <p className="card-desc">{pickLocale(locale, s.summary_th, s.summary_en ?? s.summary_th)}</p>
                  <ul className="service-features">
                    {features?.map((f) => (
                      <li key={f} className="service-feature">{f}</li>
                    ))}
                  </ul>
                  <span className="card-link">ดูรายละเอียด</span>
                </Link>
              );
            })}
          </Reveal>
        </div>
      </section>


      {/* ============================================================ PROCESS */}
      <section className="section" id="process" aria-labelledby="process-title">
        <div className="container">
          <Reveal className="section-header-center">
            <span className="eyebrow-chip">● กระบวนการทำงาน</span>
            <h2 id="process-title" style={{ margin: "var(--space-4) 0 var(--space-4)" }}>วิธีที่เราทำงานกับลูกค้า</h2>
            <p className="lead">ทุกบริการเริ่มจาก 4 ขั้นตอนเหมือนกัน — ฟังก่อน ค่อยเสนอ</p>
          </Reveal>

          <Reveal className="process-list" delay={0.1}>
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
          </Reveal>
        </div>
      </section>


      {/* ============================================================ CTA DARK */}
      <div className="section section-dark-pre" aria-hidden="true"></div>

      <section className="section section-dark" aria-labelledby="cta-title">
        <div className="container">
          <Reveal className="section-header section-header-center">
            <span className="eyebrow">● เริ่มต้นวันนี้</span>
            <h2 id="cta-title">ไม่แน่ใจว่าจะใช้บริการไหน? เราช่วยเลือกให้</h2>
            <p className="lead">เล่าโจทย์ให้ฟัง 15 นาที เราจะแนะนำบริการที่เหมาะกับธุรกิจของคุณ — ฟรี ไม่ผูกมัด</p>
          </Reveal>

          <Reveal style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)", justifyContent: "center", marginTop: "var(--space-10)" }} delay={0.1}>
            <Link href="/contact" className="btn btn-orange btn-lg btn-arrow">
              <span className="btn-label">นัดคุยกับทีม</span>
            </Link>
            <Link href="/portfolio" className="btn btn-on-dark btn-lg">
              <span className="btn-label">ดูผลงานก่อน</span>
            </Link>
            <Link href="/blog" className="btn btn-on-dark btn-lg">
              <span className="btn-label">อ่านบทความจากทีม</span>
            </Link>
          </Reveal>
        </div>
      </section>

    </main>
  );
}
