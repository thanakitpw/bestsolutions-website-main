import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getServices, getPortfolioItems } from "@/utils/supabase/queries";
import { ServiceIcon } from "@/components/service-icon";
import { ServiceListJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { ServicesFAQ } from "@/components/services-faq";
import { FeaturedCases } from "@/components/featured-cases";
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

const SERVICE_TONES = ["is-orange", "is-blue", "is-cream", "is-orange", "is-blue", "is-cream"] as const;

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [services, featuredCases] = await Promise.all([
    getServices(),
    getPortfolioItems({ featured: true, limit: 3 }),
  ]);

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
              <span>บริการดิจิทัล · {services.length} services</span>
            </span>
            <h1 id="hero-title">วางระบบดิจิทัลให้แต่ละช่องทางทำงานไปทางเดียวกัน</h1>
            <p className="lead">
              ตั้งแต่เว็บไซต์ SEO โฆษณา โซเชียล Automation ไปจนถึง Production
              เราช่วยจัดแต่ละส่วนให้เชื่อมกันเป็นระบบ เพื่อให้ทีมทำงานง่ายขึ้นและเห็นผลได้ชัดเจนขึ้น
            </p>

            <div className="page-hero-actions">
              <Link href="/contact" className="btn btn-primary btn-lg btn-arrow">
                <span className="btn-label">นัดปรึกษาฟรี</span>
              </Link>
              <Link href="/portfolio" className="btn btn-secondary btn-lg">
                <span className="btn-label">ดูผลงานทั้งหมด</span>
              </Link>
            </div>
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

          <Reveal className="grid-services-6">
            {services.map((s, i) => {
              const tone = SERVICE_TONES[i % SERVICE_TONES.length];
              const features = locale === "en" && s.features_en?.length ? s.features_en : s.features_th;
              return (
                <Link key={s.slug} href={`/services/${s.slug}`} className="card card-service">
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
            <h2 id="process-title" style={{ margin: "var(--space-4) 0 var(--space-4)" }}>เริ่มจากเข้าใจโจทย์ แล้วค่อยวางระบบให้เหมาะกับธุรกิจ</h2>
            <p className="lead">ทุกบริการเริ่มจากการทำความเข้าใจธุรกิจ ก่อนแปลงเป็นแผนงานที่ชัดเจน เพื่อให้รู้ว่าต้องเตรียมอะไร จะได้อะไร และวัดผลอย่างไร</p>
          </Reveal>

          <Reveal className="process-list" delay={0.1}>
            <article className="process-step">
              <div className="process-num" aria-hidden="true">01</div>
              <div className="process-body">
                <h3>ฟังและเข้าใจโจทย์</h3>
                <p>นัดคุยเพื่อเข้าใจธุรกิจ กลุ่มลูกค้า ข้อจำกัด และเป้าหมาย ก่อนเสนอแนวทางที่เหมาะสม</p>
              </div>
            </article>

            <article className="process-step">
              <div className="process-num" aria-hidden="true">02</div>
              <div className="process-body">
                <h3>วางแผนและกำหนดรอบงาน</h3>
                <p>จัดลำดับความสำคัญ กำหนดขอบเขตงาน และตัวชี้วัด เพื่อให้เห็นภาพว่าแต่ละช่วงควรเดินไปทางไหน</p>
              </div>
            </article>

            <article className="process-step">
              <div className="process-num" aria-hidden="true">03</div>
              <div className="process-body">
                <h3>ลงมือทำและสื่อสารต่อเนื่อง</h3>
                <p>ทำงานเป็นรอบสั้น ๆ พร้อมอัปเดตความคืบหน้าให้เห็นงานจริง และปรับรายละเอียดได้ตามข้อมูลระหว่างทาง</p>
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


      {/* ============================================================ FEATURED CASES */}
      {featuredCases.length > 0 && (
        <section className="section section-tight" id="cases" aria-labelledby="cases-title">
          <div className="container">
            <Reveal className="section-header-row">
              <div className="section-header">
                <span className="eyebrow-chip is-blue">● ผลงานล่าสุด</span>
                <h2 id="cases-title">ตัวอย่างงานที่ออกแบบจากโจทย์จริง</h2>
                <p className="lead">ดูแนวทางการทำงานผ่านโปรเจกต์จริง ทั้งเว็บไซต์ แคมเปญ และระบบดิจิทัลที่ออกแบบให้เข้ากับเป้าหมายของแต่ละธุรกิจ</p>
              </div>
              <Link href="/portfolio" className="btn btn-ghost btn-arrow">
                <span className="btn-label">ดูผลงานทั้งหมด</span>
              </Link>
            </Reveal>

            <Reveal delay={0.1}>
              <FeaturedCases items={featuredCases} locale={locale} />
            </Reveal>
          </div>
        </section>
      )}


      {/* ============================================================ FAQ */}
      <section className="section section-tight" id="faq" aria-labelledby="faq-title">
        <div className="container">
          <Reveal className="section-header-center">
            <span className="eyebrow-chip">● คำถามที่พบบ่อย</span>
            <h2 id="faq-title" style={{ margin: "var(--space-4) 0 var(--space-4)" }}>เรื่องที่ลูกค้ามักถามก่อนเริ่มงาน</h2>
            <p className="lead">ถ้ายังไม่แน่ใจว่าควรเริ่มจากบริการไหน ทักมาคุยกันก่อนได้</p>
          </Reveal>

          <Reveal delay={0.1} className="services-faq-wrap">
            <ServicesFAQ />
          </Reveal>
        </div>
      </section>


      {/* ============================================================ CTA DARK */}
      <div className="section section-dark-pre" aria-hidden="true"></div>

      <section className="section section-dark" aria-labelledby="cta-title">
        <div className="container">
          <Reveal className="section-header section-header-center">
            <span className="eyebrow">● เริ่มต้นวันนี้</span>
            <h2 id="cta-title">ไม่แน่ใจว่าควรเริ่มจากบริการไหน มาคุยกันก่อนได้</h2>
            <p className="lead">เล่าโจทย์ เป้าหมาย และข้อจำกัดของธุรกิจให้เราฟัง แล้วเราจะช่วยแนะนำว่าควรเริ่มจากเว็บไซต์ SEO โฆษณา หรือ Automation</p>
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
