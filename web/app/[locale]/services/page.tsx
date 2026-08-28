import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getServices, getPortfolioItems, getSiteSetting } from "@/utils/supabase/queries";
import { ServiceIcon } from "@/components/service-icon";
import { ServiceListJsonLd, BreadcrumbJsonLd, FaqJsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { ServicesFAQ, DEFAULT_FAQS } from "@/components/services-faq";
import { ClientLogoStrip } from "@/components/client-logos";
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

type StatsSetting = {
  projects: string;
  years: string;
  roas: string;
  seo_days: string;
};

const PHONE_TEL = "0953854906";

/** The service that gets the wide card at the top of the grid. */
const FEATURED_SLUG = "web-design";

/** Artwork slot — set to a file path under /public once the image lands. */
const WHY_IMAGE: string | null = "/services-seo-ranking.webp";

const SERVICE_TONES = ["is-orange", "is-blue", "is-cream", "is-orange", "is-blue", "is-cream"] as const;

const WHY_POINTS = [
  {
    title: "ทีมเดียวดูแลครบวงจร",
    desc: "ไม่ต้องคุยหลายเจ้า เว็บไซต์ SEO โฆษณา และ Automation อยู่ในแผนเดียวกัน ข้อมูลจึงส่งต่อกันได้",
  },
  {
    title: "เริ่มจากโจทย์ธุรกิจ ไม่ใช่เริ่มจากเครื่องมือ",
    desc: "คุยให้ชัดก่อนว่าธุรกิจต้องการอะไร แล้วค่อยเลือกว่าจะใช้ช่องทางไหนและลงทุนแค่ไหน",
  },
  {
    title: "รายงานที่อ่านแล้วตัดสินใจได้",
    desc: "สรุปเป็นภาษาที่เจ้าของธุรกิจเข้าใจ ว่าเงินที่ลงไปกลับมาเป็นอะไร และรอบหน้าควรปรับตรงไหน",
  },
  {
    title: "ส่งมอบให้ทีมคุณทำต่อเองได้",
    desc: "ทุกงานมีคู่มือและสิทธิ์เข้าถึงครบ ไม่ผูกขาดไว้กับเรา ถ้าวันหนึ่งอยากดูแลเองก็ทำได้ทันที",
  },
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "ฟังและเข้าใจโจทย์",
    desc: "นัดคุยเพื่อเข้าใจธุรกิจ กลุ่มลูกค้า ข้อจำกัด และเป้าหมาย ก่อนเสนอแนวทางที่เหมาะสม",
  },
  {
    num: "02",
    title: "วางแผนและกำหนดรอบงาน",
    desc: "จัดลำดับความสำคัญ กำหนดขอบเขตงาน และตัวชี้วัด เพื่อให้เห็นภาพว่าแต่ละช่วงควรเดินไปทางไหน",
  },
  {
    num: "03",
    title: "ลงมือทำและสื่อสารต่อเนื่อง",
    desc: "ทำงานเป็นรอบสั้น ๆ พร้อมอัปเดตความคืบหน้าให้เห็นงานจริง และปรับรายละเอียดได้ตามข้อมูลระหว่างทาง",
  },
  {
    num: "04",
    title: "วัดผล ส่งมอบ และต่อยอด",
    desc: "สรุปผลเทียบกับเป้าหมาย ส่งมอบงานให้ใช้งานต่อได้ และแนะนำแนวทางดูแลหรือพัฒนาต่อเมื่อธุรกิจพร้อม",
  },
];

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [services, featuredCases, stats] = await Promise.all([
    getServices(),
    getPortfolioItems({ featured: true, limit: 3 }),
    getSiteSetting<StatsSetting>("stats"),
  ]);

  const featured = services.find((s) => s.slug === FEATURED_SLUG) ?? services[0];
  const rest = services.filter((s) => s.slug !== featured?.slug);

  const featuredFeatures =
    featured && locale === "en" && featured.features_en?.length
      ? featured.features_en
      : featured?.features_th;

  const heroStats = [
    { value: stats?.projects ?? "100+", label: "โปรเจกต์ที่ส่งมอบ" },
    { value: stats?.years ?? "8", label: "ปีที่ดูแลธุรกิจไทย" },
    { value: stats?.roas ?? "5.2×", label: "ROAS เฉลี่ยของแคมเปญ" },
  ];

  return (
    <main id="main">
      <ServiceListJsonLd services={services} locale={locale} />
      <FaqJsonLd items={DEFAULT_FAQS} />
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: locale === "en" ? "Home" : "หน้าแรก", path: "" },
          { name: locale === "en" ? "Services" : "บริการ", path: "/services" },
        ]}
      />

      {/* ============================================================ HERO */}
      <section className="page-hero svc-hero" aria-labelledby="hero-title">
        <div className="page-hero-blob" aria-hidden="true"></div>
        <div className="container">
          <div className="page-hero-inner">
            <span className="eyebrow-pill">
              <span className="star">✦</span>
              <span>บริการของเรา</span>
            </span>
            <h1 id="hero-title">
              บริการการตลาดออนไลน์ครบวงจร <span className="svc-hero-accent">ที่วัดผลได้จริง</span>
            </h1>
            <p className="lead">
              รับทำเว็บไซต์ SEO ยิงแอด Meta &amp; Google ดูแลโซเชียล และวางระบบ Automation
              เลือกเริ่มเฉพาะส่วนที่ธุรกิจต้องการก่อนได้ แล้วค่อยต่อยอดให้ทำงานเป็นระบบเดียวกัน
            </p>

            <div className="page-hero-actions">
              <Link href="/contact" className="btn btn-primary btn-lg btn-arrow">
                <span className="btn-label">นัดปรึกษาฟรี</span>
              </Link>
              <a
                href={`tel:${PHONE_TEL}`}
                className="btn btn-secondary btn-lg"
                aria-label="โทรหาเรา 095-385-4906"
                data-cta-location="services-hero"
              >
                <span className="btn-label">โทรหาเรา</span>
              </a>
            </div>

            <dl className="svc-hero-stats">
              {heroStats.map((s) => (
                <div key={s.label} className="svc-hero-stat">
                  <dt className="svc-hero-stat-value">{s.value}</dt>
                  <dd className="svc-hero-stat-label">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>


      {/* ============================================================ CLIENT PROOF */}
      <section className="svc-proof" aria-label="ลูกค้าที่ไว้วางใจให้เราดูแล">
        <div className="container">
          <p className="svc-proof-label">แบรนด์ที่ไว้วางใจให้เราดูแล</p>
          <ClientLogoStrip className="svc-proof-logos" limit={8} />
        </div>
      </section>


      {/* ============================================================ SERVICES GRID */}
      <section className="section section-tight" id="services" aria-labelledby="services-title">
        <div className="container">
          <Reveal className="section-header-center">
            <span className="eyebrow-chip">● บริการทั้งหมด</span>
            <h2 id="services-title" style={{ margin: "var(--space-4) 0 var(--space-4)" }}>
              เลือกได้ทีละส่วน หรือให้เราดูแลทั้งระบบ
            </h2>
            <p className="lead">
              แต่ละบริการทำงานแยกกันได้ และเชื่อมกันได้เมื่อธุรกิจพร้อมขยาย
            </p>
          </Reveal>

          <Reveal className="svc-grid" delay={0.1}>
            {featured ? (
              <Link href={`/services/${featured.slug}`} className="card svc-card svc-card-featured">
                <div className="svc-card-lead">
                  <span className="svc-card-badge">บริการหลัก</span>
                  <div className="card-icon is-orange" aria-hidden="true">
                    <ServiceIcon name={featured.icon} />
                  </div>
                  <h3 className="card-title">
                    {pickLocale(locale, featured.name_th, featured.name_en ?? featured.name_th)}
                  </h3>
                  <p className="card-desc">
                    {pickLocale(locale, featured.summary_th, featured.summary_en ?? featured.summary_th)}
                  </p>
                  <span className="card-link">ดูรายละเอียด</span>
                </div>

                <ul className="service-features svc-card-features">
                  {featuredFeatures?.map((f) => (
                    <li key={f} className="service-feature">{f}</li>
                  ))}
                </ul>
              </Link>
            ) : null}

            {rest.map((s, i) => {
              const tone = SERVICE_TONES[(i + 1) % SERVICE_TONES.length];
              const features = locale === "en" && s.features_en?.length ? s.features_en : s.features_th;
              return (
                <Link key={s.slug} href={`/services/${s.slug}`} className="card svc-card">
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


      {/* ============================================================ WHY US */}
      <section className="section svc-why" id="why" aria-labelledby="why-title">
        <div className="container">
          <div className="svc-why-grid">
            <Reveal className="svc-why-media">
              {WHY_IMAGE ? (
                <Image
                  className="svc-why-media-img"
                  src={WHY_IMAGE}
                  alt="เว็บไซต์ธุรกิจติดอันดับ 1 บนหน้าผลค้นหา Google บนมือถือ"
                  width={1254}
                  height={1254}
                  sizes="(min-width: 1024px) 520px, 100vw"
                />
              ) : (
                <div className="svc-placeholder" role="img" aria-label="พื้นที่สำหรับภาพทีมทำงาน">
                  <span>ภาพทีมทำงาน / ห้องประชุมลูกค้า</span>
                  <small>1200 × 900 px · 4:3</small>
                </div>
              )}
            </Reveal>

            <Reveal className="svc-why-text" delay={0.1}>
              <span className="eyebrow-chip is-blue">● ทำไมต้องเรา</span>
              <h2 id="why-title">ไม่ได้ขายชั่วโมงทำงาน แต่ขายผลลัพธ์ที่ธุรกิจใช้ต่อได้</h2>
              <p className="lead">
                เราทำงานกับ SME ไทยมาแล้วหลายแบบ ตั้งแต่เริ่มจากศูนย์ ไปจนถึงเข้าไปแก้ระบบที่วางไว้แล้วแต่ยังไม่เวิร์ก
              </p>

              <ul className="svc-why-list">
                {WHY_POINTS.map((p) => (
                  <li key={p.title} className="svc-why-item">
                    <span className="svc-why-check" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                    <div>
                      <h3>{p.title}</h3>
                      <p>{p.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>


      {/* ============================================================ PROCESS */}
      <section className="section section-tight" id="process" aria-labelledby="process-title">
        <div className="container">
          <Reveal className="section-header-center">
            <span className="eyebrow-chip">● กระบวนการทำงาน</span>
            <h2 id="process-title" style={{ margin: "var(--space-4) 0 var(--space-4)" }}>
              เริ่มจากเข้าใจโจทย์ แล้วค่อยวางระบบให้เหมาะกับธุรกิจ
            </h2>
            <p className="lead">
              ทุกบริการเริ่มจากการทำความเข้าใจธุรกิจ ก่อนแปลงเป็นแผนงานที่ชัดเจน
              เพื่อให้รู้ว่าต้องเตรียมอะไร จะได้อะไร และวัดผลอย่างไร
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ol className="svc-steps">
              {PROCESS_STEPS.map((step) => (
                <li key={step.num} className="svc-step">
                  <span className="svc-step-num" aria-hidden="true">{step.num}</span>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>


      {/* ============================================================ CASES */}
      {featuredCases.length ? (
        <section className="section section-tight" id="cases" aria-labelledby="cases-title">
          <div className="container">
            <Reveal className="section-header-row">
              <div className="section-header">
                <span className="eyebrow-chip">● ผลงานจริง</span>
                <h2 id="cases-title" style={{ margin: "var(--space-4) 0 var(--space-3)" }}>
                  ตัวอย่างงานที่ผ่านมา
                </h2>
                <p className="lead">ดูว่าแต่ละบริการออกมาเป็นงานจริงหน้าตาแบบไหน</p>
              </div>
              <Link href="/portfolio" className="btn btn-secondary btn-arrow">
                <span className="btn-label">ดูผลงานทั้งหมด</span>
              </Link>
            </Reveal>

            <Reveal delay={0.1}>
              <FeaturedCases items={featuredCases} />
            </Reveal>
          </div>
        </section>
      ) : null}


      {/* ============================================================ FAQ */}
      <section className="section section-tight" id="faq" aria-labelledby="faq-title">
        <div className="container">
          <Reveal className="section-header-center">
            <span className="eyebrow-chip">● คำถามที่พบบ่อย</span>
            <h2 id="faq-title" style={{ margin: "var(--space-4) 0 var(--space-4)" }}>
              เรื่องที่ลูกค้ามักถามก่อนเริ่มงาน
            </h2>
            <p className="lead">
              ถ้ายังไม่แน่ใจว่าควรเริ่มจากบริการไหน ทักมาคุยกันก่อนได้ หรือ{" "}
              <Link href="/blog" className="svc-inline-link">อ่านบทความจากทีม</Link> เพื่อดูวิธีคิดเบื้องหลังงานของเรา
            </p>
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
            <p className="lead">
              เล่าโจทย์ เป้าหมาย และข้อจำกัดของธุรกิจให้เราฟัง
              แล้วเราจะช่วยแนะนำว่าควรเริ่มจากเว็บไซต์ SEO โฆษณา หรือ Automation
            </p>
          </Reveal>

          <Reveal className="svc-cta-actions" delay={0.1}>
            <Link href="/contact" className="btn btn-orange btn-lg btn-arrow">
              <span className="btn-label">นัดคุยกับทีม</span>
            </Link>
            <a
              href={`tel:${PHONE_TEL}`}
              className="btn btn-on-dark btn-lg"
              aria-label="โทรหาเรา 095-385-4906"
              data-cta-location="services-cta"
            >
              <span className="btn-label">โทร 095-385-4906</span>
            </a>
          </Reveal>
        </div>
      </section>

    </main>
  );
}
