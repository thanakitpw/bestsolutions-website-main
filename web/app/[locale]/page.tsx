import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  getArticles,
  getFeaturedTestimonials,
  getPortfolioItems,
  getServices,
  getSiteSetting,
} from "@/utils/supabase/queries";
import { ServicesAccordion } from "@/components/services-accordion";
import {
  OrganizationJsonLd,
  LocalBusinessJsonLd,
  WebSiteJsonLd,
  type ContactInfo,
} from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { HeroScrollLink } from "@/components/hero-scroll-link";
import { MediaImage } from "@/components/media-image";
import { BRANDS } from "@/components/client-logos";
import { pickLocale } from "@/utils/format";
import "@/styles/pages/home.css";

type HeroSetting = {
  title_th: string;
  title_en?: string;
  eyebrow_th: string;
  eyebrow_en?: string;
};

type StatsSetting = {
  projects: string;
  years: string;
  roas: string;
  seo_days: string;
};

const PORTFOLIO_GRADIENTS = [
  "linear-gradient(135deg, var(--color-orange-500), var(--color-peach))",
  "linear-gradient(135deg, var(--color-blue-500), var(--color-blue-700))",
  "linear-gradient(135deg, var(--color-text), var(--color-orange-700))",
];

const BLOG_GRADIENTS = [
  "linear-gradient(135deg, var(--color-orange-300), var(--color-peach))",
  "linear-gradient(135deg, var(--color-blue-300), var(--color-blue-500))",
  "linear-gradient(135deg, var(--color-orange-500), var(--color-orange-700))",
];

const TESTI_GRADIENTS = [
  "linear-gradient(135deg, var(--color-orange-300), var(--color-peach))",
  "linear-gradient(135deg, var(--color-blue-300), var(--color-blue-500))",
  "linear-gradient(135deg, var(--color-orange-500), var(--color-orange-700))",
];

const SERVICES_WITH_DETAIL = new Set(["web-design"]);

/** Collage of client sites — set to the file path once the artwork lands. */
const BRANDS_VISUAL: string | null = "/client-website-showcase.webp";

const HERO_BENEFITS = ["ใช้งานง่าย", "วัดผลได้", "ต่อยอดได้จริง"];

const PHONE_TEL = "0953854906";

/** Hero artwork — cut-out on a transparent background, so it carries no card frame. */
const HERO_VISUAL: string | null = "/hero-website-ads-seo-showcase.webp";

const HERO_COPY = {
  eyebrow: "Digital Marketing Agency",
  previousEyebrow: "Digital Marketing Agency · Bangkok",
  oldEyebrow: "AI-Driven Agency · กรุงเทพฯ",
  oldEyebrowAlt: "AI-Driven Agency",
  title: "รับทำเว็บไซต์ธุรกิจ พร้อมระบบการตลาดที่วัดผลได้จริง",
  previousTitle: "วางระบบดิจิทัล ให้ธุรกิจเติบโตอย่างมั่นคง",
  olderTitle: "วางระบบการตลาดออนไลน์ ให้ธุรกิจเติบโตอย่างเป็นขั้นตอน",
  legacyTitle: "ทำการตลาดออนไลน์ที่วัดผลได้จริง",
};

export const revalidate = 60;

function serviceHref(slug: string) {
  return SERVICES_WITH_DETAIL.has(slug) ? `/services/${slug}` : "/services";
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [services, featuredPortfolio, testimonials, articles, hero, stats, contact] =
    await Promise.all([
      getServices(),
      getPortfolioItems({ featured: true, limit: 6 }),
      getFeaturedTestimonials(3),
      getArticles({ limit: 6 }),
      getSiteSetting<HeroSetting>("hero"),
      getSiteSetting<StatsSetting>("stats"),
      getSiteSetting<ContactInfo>("contact"),
    ]);

  const homeServices = services.slice(0, 5);

  const heroTitleFromSetting = hero
    ? pickLocale(locale, hero.title_th, hero.title_en ?? hero.title_th)
    : null;
  const heroEyebrowFromSetting = hero
    ? pickLocale(locale, hero.eyebrow_th, hero.eyebrow_en ?? hero.eyebrow_th)
    : null;

  const heroTitle =
    heroTitleFromSetting &&
    ![HERO_COPY.previousTitle, HERO_COPY.olderTitle, HERO_COPY.legacyTitle].includes(heroTitleFromSetting)
      ? heroTitleFromSetting
      : HERO_COPY.title;
  const heroEyebrow =
    heroEyebrowFromSetting &&
    ![HERO_COPY.previousEyebrow, HERO_COPY.oldEyebrow, HERO_COPY.oldEyebrowAlt].includes(heroEyebrowFromSetting)
      ? heroEyebrowFromSetting
      : HERO_COPY.eyebrow;

  const heroProjects = stats?.projects ?? "100+";
  const heroRoas = stats?.roas ?? "5.2×";
  const heroYears = stats?.years ?? "8";

  const contactInfo: ContactInfo = contact ?? {};

  return (
    <main id="main">
      <OrganizationJsonLd contact={contactInfo} locale={locale} />
      <LocalBusinessJsonLd contact={contactInfo} locale={locale} />
      <WebSiteJsonLd locale={locale} />

      {/* ============================================================ HERO */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-blob" aria-hidden="true"></div>

        <div className="container">
          <div className="hero-inner">
            <span className="eyebrow-pill">
              <span className="star">✦</span>
              <span>{heroEyebrow}</span>
            </span>
            <h1 id="hero-title">
              {heroTitle === HERO_COPY.title ? (
                <>
                  รับทำเว็บไซต์ธุรกิจ พร้อมระบบการตลาดที่
                  <span className="hero-title-accent">วัดผลได้จริง</span>
                </>
              ) : (
                heroTitle
              )}
            </h1>

            <p className="hero-sub">
              กำลังมองหาเว็บไซต์ใหม่ที่ตอบโจทย์ธุรกิจ หรืออยากให้เว็บไซต์เดิมทำงานได้ดีกว่านี้?
            </p>
            <p className="hero-sub">
              <strong>Best Solutions</strong> ดูแลให้ตั้งแต่ออกแบบเว็บไซต์ ทำ SEO
              ไปจนถึงแคมเปญโฆษณาและระบบ Automation
            </p>
            <ul className="hero-benefits">
              {HERO_BENEFITS.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>

            <div className="hero-actions">
              <Link href="/contact" className="btn btn-primary btn-lg btn-arrow">
                <span className="btn-label">นัดปรึกษาฟรี</span>
              </Link>
              <a
                href={`tel:${PHONE_TEL}`}
                className="btn btn-secondary btn-lg"
                aria-label="โทรหาเรา 095-385-4906"
                data-cta-location="hero"
              >
                <span className="btn-label">โทรหาเรา</span>
              </a>
            </div>

          </div>

          <div className="hero-visual">
            {HERO_VISUAL ? (
              <MediaImage
                className="hero-visual-media"
                src={HERO_VISUAL}
                alt="เว็บไซต์ธุรกิจที่ Best Solutions ออกแบบ แสดงบนโน้ตบุ๊ก แท็บเล็ต และมือถือ พร้อมแดชบอร์ด Google Ads และผลลัพธ์ SEO"
                sizes="(min-width: 1280px) 1040px, 100vw"
                priority
              />
            ) : (
              <div className="hero-visual-placeholder" role="img" aria-label="พื้นที่สำหรับภาพหน้าปกเว็บไซต์">
                <span>ภาพหน้าปก Hero</span>
                <small>2080 × 1170 px · 16:9</small>
              </div>
            )}
          </div>

          <div className="hero-inner">
            <div className="hero-proof">
              <p className="hero-proof-label">ลูกค้าที่ไว้วางใจให้เราดูแล</p>
              <div className="hero-proof-logos">
                {BRANDS.slice(0, 6).map((b) => (
                  <Image
                    key={b.name}
                    src={b.logo}
                    alt={`โลโก้ ${b.name}`}
                    width={b.width}
                    height={b.height}
                    loading="lazy"
                  />
                ))}
              </div>
            </div>

          </div>
          <HeroScrollLink targetId="services" ariaLabel="เลื่อนลงด้านล่าง">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14" />
              <path d="M19 12l-7 7-7-7" />
            </svg>
          </HeroScrollLink>
        </div>
      </section>


      {/* ============================================================ SERVICES */}
      <section className="section" id="services" aria-labelledby="services-title">
        <div className="container">
          <div className="services-split">
            <Reveal className="services-split-left">
              <h2 id="services-title">บริการของเรา</h2>
              <p className="lead" style={{textWrap: "pretty"}}>
                ตั้งแต่เว็บไซต์ SEO แคมเปญโฆษณา โซเชียล ไปจนถึง Automation เราช่วยจัดแต่ละส่วนให้เชื่อมกันเป็นระบบเดียว เพื่อให้ทีมของคุณทำงานง่ายขึ้นและเห็นผลได้ชัดเจนขึ้น
              </p>
              <Link href="/services" className="btn btn-primary btn-arrow services-split-cta">
                <span className="btn-label">ดูบริการทั้งหมด</span>
              </Link>
            </Reveal>

            <Reveal delay={0.1}>
              <ServicesAccordion
                items={homeServices.map((s) => ({
                  id: s.id,
                  href: serviceHref(s.slug),
                  title: pickLocale(locale, s.name_th, s.name_en ?? s.name_th),
                  summary: pickLocale(locale, s.summary_th, s.summary_en ?? s.summary_th),
                  features:
                    (locale === "en"
                      ? s.features_en ?? s.features_th
                      : s.features_th) ?? [],
                }))}
              />
            </Reveal>
          </div>
        </div>
      </section>


      {/* ============================================================ PROBLEM */}
      <section className="section section-tight problem-section" id="problem" aria-labelledby="problem-title">
        <div className="container">
          <Reveal className="section-header section-header-center">
            <h2 id="problem-title">ปัญหาที่เจอบ่อย</h2>
            <p className="lead">หลายธุรกิจมีเว็บไซต์ โฆษณา SEO และเครื่องมือครบแล้ว แต่แต่ละส่วนยังไม่เชื่อมกัน ทำให้ทีมทำงานซ้ำ เสียโอกาส และมองภาพผลลัพธ์ได้ไม่ชัด</p>
          </Reveal>

          <Reveal className="grid-3 problem-grid" delay={0.1}>
            <article className="card problem-card">
              <span className="problem-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 9h18" /><path d="M9 21h6" /><path d="M12 18v3" />
                </svg>
              </span>
              <h3>เว็บไซต์มีคนเข้า แต่ไม่เกิด lead</h3>
              <p>มีคนเข้าชม แต่หน้าเว็บยังไม่พาคนไปสู่การติดต่ออย่างชัดเจน ทั้งโครงสร้างข้อความ ปุ่ม CTA และเส้นทางการตัดสินใจ</p>
            </article>

            <article className="card problem-card">
              <span className="problem-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3v18h18" /><rect x="7" y="12" width="3" height="6" /><rect x="13" y="8" width="3" height="10" /><path d="M18 5l-3 3" />
                </svg>
              </span>
              <h3>ใช้งบโฆษณาแล้ววัดผลไม่ชัด</h3>
              <p>แคมเปญทำงานอยู่ แต่มองไม่ออกว่างบส่วนไหนคุ้ม ส่วนไหนควรลด เพราะ tracking และรายงานยังไม่ช่วยให้ตัดสินใจง่ายพอ</p>
            </article>

            <article className="card problem-card">
              <span className="problem-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="6" cy="6" r="3" /><circle cx="18" cy="18" r="3" /><path d="M9 6h4a3 3 0 0 1 3 3v2" strokeDasharray="3 3" /><path d="M15 18h-4a3 3 0 0 1-3-3v-2" strokeDasharray="3 3" />
                </svg>
              </span>
              <h3>SEO, โซเชียล และ Automation ยังไม่ไปทางเดียวกัน</h3>
              <p>คอนเทนต์ ข้อมูลลูกค้า และ workflow กระจายอยู่คนละที่ ทำให้ทีมต้องตามงานเอง และเสียเวลากับขั้นตอนที่ควรทำให้อัตโนมัติได้</p>
            </article>
          </Reveal>
        </div>
      </section>


      {/* ============================================================ FEATURED PORTFOLIO */}
      <section className="section section-tight" id="featured" aria-labelledby="featured-title">
        <div className="container">
          <Reveal className="section-header-row">
            <div className="section-header">
              <h2 id="featured-title">ตัวอย่างผลงานรับทำเว็บไซต์</h2>
              <p className="lead">ดูแนวทางการทำงานผ่านโปรเจกต์จริง ทั้งเว็บไซต์ แคมเปญ และระบบดิจิทัลที่ออกแบบให้เข้ากับเป้าหมายของแต่ละธุรกิจ</p>
            </div>
            <Link href="/portfolio" className="btn btn-ghost btn-arrow">
              <span className="btn-label">ดูผลงานทั้งหมด</span>
            </Link>
          </Reveal>

          <Reveal className="grid-3" delay={0.1}>
            {featuredPortfolio.map((p, i) => {
              return (
                <Link key={p.id} href={`/portfolio/${p.slug}`} className="card card-portfolio">
                  <MediaImage
                    className="card-media"
                    src={p.cover_image}
                    alt={`ภาพผลงาน ${p.title}`}
                    gradient={PORTFOLIO_GRADIENTS[i % PORTFOLIO_GRADIENTS.length]}
                    sizes="(min-width: 1280px) 400px, (min-width: 768px) 33vw, 100vw"
                    priority={i === 0}
                  />
                  <div className="card-body">
                    <span className="card-meta">
                      <span>{p.category}</span>
                      {p.year ? (
                        <>
                          <span className="card-meta-dot"></span>
                          <span>{p.year}</span>
                        </>
                      ) : null}
                    </span>
                    <h3 className="card-title">{p.title}</h3>
                  </div>
                </Link>
              );
            })}
          </Reveal>
        </div>
      </section>


      {/* ============================================================ PROCESS */}
      <section className="section" id="process" aria-labelledby="process-title">
        <div className="container">
          <Reveal className="section-header section-header-center">
            <h2 id="process-title">ขั้นตอนการทำงาน</h2>
            <p className="lead" style={{textWrap: "pretty"}}>ทุกโปรเจกต์เริ่มจากการทำความเข้าใจธุรกิจ ก่อนแปลงเป็นแผนงานที่ชัดเจน เพื่อให้รู้ตั้งแต่ต้นว่าต้องเตรียมอะไร จะได้อะไร และควรวัดผลอย่างไร</p>
          </Reveal>

          <Reveal className="process-flow" delay={0.1}>
            <article className="process-card">
              <span className="process-step-num" aria-hidden="true">01</span>
              <h3>คุยโจทย์และเป้าหมาย</h3>
              <p>นัดคุยเพื่อเข้าใจธุรกิจ กลุ่มลูกค้า ข้อจำกัด และเป้าหมายที่อยากไปให้ถึง ก่อนสรุปแนวทางที่เหมาะสม</p>
            </article>

            <article className="process-card">
              <span className="process-step-num" aria-hidden="true">02</span>
              <h3>วางแผนงานและขอบเขต</h3>
              <p>จัดลำดับความสำคัญ กำหนดขอบเขตงาน และตัวชี้วัดให้ชัด เพื่อให้เห็นภาพว่าแต่ละช่วงควรเดินไปทางไหน</p>
            </article>

            <article className="process-card">
              <span className="process-step-num" aria-hidden="true">03</span>
              <h3>ลงมือทำเป็นรอบงาน</h3>
              <p>ทำงานเป็นรอบสั้น ๆ พร้อมอัปเดตความคืบหน้าให้เห็นงานจริง ปรับรายละเอียดได้ตามข้อมูลและ feedback ระหว่างทาง</p>
            </article>

            <article className="process-card">
              <span className="process-step-num" aria-hidden="true">04</span>
              <h3>สรุปผลและปรับต่อเนื่อง</h3>
              <p>ทบทวนผลเทียบกับเป้าหมาย สรุปสิ่งที่ได้เรียนรู้ และวางแผนรอบถัดไปให้ระบบทำงานดีขึ้นต่อเนื่อง</p>
            </article>
          </Reveal>
        </div>
      </section>


      {/* ============================================================ CLIENT BRANDS */}
      <section className="section brands-section" id="brands" aria-labelledby="brands-title">
        <div className="container">
          <div className="brands-split">
            <Reveal className="brands-visual">
              {BRANDS_VISUAL ? (
                <MediaImage
                  className="brands-visual-media"
                  src={BRANDS_VISUAL}
                  alt="ภาพจำลองเว็บไซต์ธุรกิจที่ Best Solutions ออกแบบ แสดงบนคอมพิวเตอร์ แล็ปท็อป แท็บเล็ต และมือถือ"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              ) : (
                <div className="brands-visual-placeholder" role="img" aria-label="พื้นที่สำหรับภาพตัวอย่างผลงาน">
                  <span>ภาพตัวอย่างผลงาน</span>
                  <small>1600 × 1200 px</small>
                </div>
              )}
            </Reveal>

            <Reveal className="brands-content" delay={0.1}>
              <h2 id="brands-title">ลูกค้าที่ใช้บริการกับเรา</h2>
              <p className="lead">
                ตลอดการทำงานที่ผ่านมา เราได้รับความไว้วางใจจากธุรกิจหลากหลายประเภท
                ตั้งแต่บริษัทมหาชนและกลุ่มธุรกิจการเงิน โรงแรม คลินิกความงามและทันตกรรม
                ผู้ผลิตและจัดจำหน่ายวัสดุก่อสร้าง ไปจนถึงธุรกิจ SME ที่กำลังเริ่มวางระบบออนไลน์อย่างจริงจัง
              </p>
              <p className="lead">
                แต่ละธุรกิจมีโจทย์ไม่เหมือนกัน บางรายต้องการเว็บไซต์ที่ดูน่าเชื่อถือและพาลูกค้าไปถึงการติดต่อ
                บางรายอยากให้งบโฆษณาทำงานได้คุ้มกว่าเดิม บางรายต้องการระบบหลังบ้านที่ช่วยลดงานซ้ำของทีม
                เราจึงเริ่มจากการทำความเข้าใจเป้าหมายและข้อจำกัดก่อนเสมอ แล้วค่อยเลือกเครื่องมือให้เหมาะกับบริบทและงบประมาณจริง
              </p>

              <div
                className="brand-marquee"
                role="group"
                aria-label="โลโก้ลูกค้าที่ใช้บริการกับ Best Solutions"
              >
                <div className="brand-track">
                  {[...BRANDS, ...BRANDS].map((b, i) => {
                    const clone = i >= BRANDS.length;
                    return (
                      <div className="brand-tile" key={`${b.name}-${i}`} aria-hidden={clone || undefined}>
                        {b.logo.endsWith(".svg") ? (
                          // eslint-disable-next-line @next/next/no-img-element -- next/image rejects SVG without dangerouslyAllowSVG
                          <img
                            src={b.logo}
                            alt={clone ? "" : `โลโก้ ${b.name}`}
                            width={b.width}
                            height={b.height}
                            className="brand-logo"
                            loading="lazy"
                          />
                        ) : (
                          <Image
                            src={b.logo}
                            alt={clone ? "" : `โลโก้ ${b.name}`}
                            width={b.width}
                            height={b.height}
                            className="brand-logo"
                            loading="lazy"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>


      {/* ============================================================ STATS BAND */}
      <section className="section section-tight" aria-labelledby="stats-title">
        <div className="container">
          <Reveal className="stats-band">
            <div className="section-header" style={{ marginBottom: "var(--space-12)" }}>
              <h2 id="stats-title">ผลลัพธ์จากการทำงาน</h2>
            </div>

            <div className="grid-3" style={{ gap: "var(--space-6)" }}>
              <div className="card card-stat">
                <span className="card-eyebrow is-orange" aria-hidden="true">★</span>
                <p className="card-stat-num tabular"><span className="accent">{heroProjects}</span></p>
                <p className="card-stat-label">โปรเจกต์ที่ส่งมอบให้ลูกค้า</p>
              </div>

              <div className="card card-stat">
                <span className="card-eyebrow is-blue" aria-hidden="true">◆</span>
                <p className="card-stat-num tabular">{heroYears}<span className="unit">ปี</span></p>
                <p className="card-stat-label">ประสบการณ์ด้านดิจิทัล</p>
              </div>

              <div className="card card-stat">
                <span className="card-eyebrow is-orange" aria-hidden="true">↗</span>
                <p className="card-stat-num tabular"><span className="accent">{heroRoas}</span></p>
                <p className="card-stat-label">ROAS เฉลี่ยจากแคมเปญลูกค้า</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>


      {/* ============================================================ TESTIMONIALS — ปิดชั่วคราวตามคำขอเจ้าของ (เปลี่ยน false เป็น true เพื่อเปิดกลับ) */}
      {false && (
      <section className="section" id="testimonials" aria-labelledby="testi-title">
        <div className="container">
          <Reveal className="section-header" style={{ marginBottom: "var(--space-12)", maxWidth: 720 }}>
            <h2 id="testi-title">เสียงจากลูกค้า</h2>
          </Reveal>

          <Reveal className="grid-3" delay={0.1}>
            {testimonials.map((t, i) => {
              const quote = pickLocale(locale, t.quote_th, t.quote_en ?? t.quote_th);
              const role = [t.client_role, t.client_company].filter(Boolean).join(" · ");
              const rating = t.rating ?? 5;
              return (
                <article key={t.id} className="testi-card">
                  <span className="testi-stars" aria-label={`คะแนน ${rating} จาก 5 ดาว`}>
                    {"★".repeat(rating)}
                  </span>
                  <blockquote className="testi-quote">&ldquo;{quote}&rdquo;</blockquote>
                  <div className="testi-foot">
                    <div
                      className="testi-avatar"
                      aria-hidden="true"
                      style={{
                        background: t.client_avatar
                          ? `center/cover no-repeat url("${t.client_avatar}")`
                          : TESTI_GRADIENTS[i % TESTI_GRADIENTS.length],
                      }}
                    ></div>
                    <div>
                      <div className="testi-name">{t.client_name}</div>
                      <div className="testi-role">{role}</div>
                    </div>
                  </div>
                </article>
              );
            })}
          </Reveal>
        </div>
      </section>
      )}


      {/* ============================================================ WHO WE'RE FOR */}
      <section className="section section-tight" id="audience" aria-labelledby="audience-title">
        <div className="container">
          <div className="audience-split">
            <Reveal className="audience-intro">
              <h2 id="audience-title">เหมาะกับใคร</h2>
              <p className="lead">ไม่ว่าธุรกิจจะเพิ่งเริ่ม หรือมีเว็บไซต์ เพจ และแคมเปญอยู่แล้ว หากอยากให้ทุกส่วนเดินไปทางเดียวกัน เราช่วยวางระบบให้ชัดขึ้นได้</p>
            </Reveal>

            <Reveal className="audience-list" delay={0.1}>
              <div className="audience-item">
                <span className="audience-check" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </span>
                <span>ธุรกิจที่อยากปรับเว็บไซต์ให้ดูน่าเชื่อถือ ใช้งานง่าย และพร้อมรับ lead มากขึ้น</span>
              </div>
              <div className="audience-item">
                <span className="audience-check" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </span>
                <span>ทีมที่อยากให้ lead จาก SEO หรือโฆษณาเข้ามาต่อเนื่อง และติดตามผลได้ชัดเจน</span>
              </div>
              <div className="audience-item">
                <span className="audience-check" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </span>
                <span>เจ้าของธุรกิจที่ไม่อยากประสานงานหลาย vendor แต่ต้องการให้ภาพรวมยังไปในทิศทางเดียวกัน</span>
              </div>
              <div className="audience-item">
                <span className="audience-check" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </span>
                <span>ทีมที่มีงานซ้ำในงานขาย แอดมิน หรือหลังบ้าน และอยากเริ่มใช้ Automation อย่างเหมาะสม</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>


      {/* ============================================================ BLOG TEASER */}
      <section className="section section-tight" id="blog" aria-labelledby="blog-title">
        <div className="container">
          <Reveal className="blog-teaser-head">
            <h2 id="blog-title">บทความล่าสุด</h2>
            <Link href="/blog" className="link-arrow">
              <span>ดูทั้งหมด</span>
              <span className="link-arrow-dot" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h13M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>
          </Reveal>

          <Reveal className="blog-teaser-grid" delay={0.1}>
            {articles.map((a, i) => {
              const title = pickLocale(locale, a.title_th, a.title_en ?? a.title_th);
              const excerpt = pickLocale(locale, a.excerpt_th, a.excerpt_en ?? a.excerpt_th);
              return (
                <Link key={a.id} href={`/blog/${a.slug}`} className="blog-teaser-card">
                  <MediaImage
                    className="blog-teaser-media"
                    src={a.cover_image}
                    alt={`ภาพประกอบบทความ ${title}`}
                    gradient={BLOG_GRADIENTS[i % BLOG_GRADIENTS.length]}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <h3 className="blog-teaser-title">{title}</h3>
                  {excerpt ? <p className="blog-teaser-excerpt">{excerpt}</p> : null}
                  <span className="link-arrow blog-teaser-more">
                    <span>อ่านเพิ่มเติม</span>
                    <span className="link-arrow-dot" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h13M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </span>
                </Link>
              );
            })}
          </Reveal>
        </div>
      </section>


      {/* ============================================================ CTA BAND (DARK) */}
      <div className="section section-dark-pre" aria-hidden="true"></div>

      <section className="section section-dark" aria-labelledby="cta-title">
        <div className="container">
          <Reveal className="section-header section-header-center">
            <span className="eyebrow">● เริ่มต้นวันนี้</span>
            <h2 id="cta-title">อยากให้ระบบดิจิทัลของธุรกิจเดินชัดขึ้น มาคุยกันก่อนได้</h2>
            <p className="lead">เราจะเริ่มจากฟังโจทย์ เป้าหมาย และข้อจำกัดของธุรกิจคุณก่อน แล้วช่วยแนะนำทิศทางที่เหมาะสม โดยไม่กดดันและไม่ผูกมัด</p>
          </Reveal>

          <Reveal style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)", justifyContent: "center", marginTop: "var(--space-10)" }} delay={0.05}>
            <Link href="/contact" className="btn btn-orange btn-lg btn-arrow">
              <span className="btn-label">นัดคุยกับทีม</span>
            </Link>
            <Link href="/portfolio" className="btn btn-on-dark btn-lg">
              <span className="btn-label">ดูผลงานก่อน</span>
            </Link>
          </Reveal>

          <Reveal className="grid-3" style={{ marginTop: "var(--space-16)" }} delay={0.1}>
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
              <p className="card-desc">เสนอแนวทางที่เหมาะกับธุรกิจของคุณ</p>
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
              <p className="card-desc">เคสด่วนทัก LINE ได้ ทีมพร้อมรับเรื่องวันจันทร์-ศุกร์ 9:00-18:00</p>
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
              <h3 className="card-title">ทีมงานคุณภาพ</h3>
              <p className="card-desc">สื่อสารตรง เข้าใจบริบทของธุรกิจ และพฤติกรรมลูกค้าในตลาด</p>
            </article>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
