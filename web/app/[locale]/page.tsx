import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  getArticles,
  getFeaturedTestimonials,
  getPortfolioItems,
  getServices,
  getSiteSetting,
} from "@/utils/supabase/queries";
import { ServiceIcon } from "@/components/service-icon";
import {
  OrganizationJsonLd,
  LocalBusinessJsonLd,
  type ContactInfo,
} from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { formatThaiDate, pickLocale } from "@/utils/format";
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

const SERVICE_TONES = ["is-orange", "is-blue", "is-cream", "is-orange"] as const;

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

const BLOG_CATEGORY_TONE: Record<string, string> = {
  "Digital Marketing": "is-blue",
};

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
      getPortfolioItems({ featured: true, limit: 3 }),
      getFeaturedTestimonials(3),
      getArticles({ limit: 3 }),
      getSiteSetting<HeroSetting>("hero"),
      getSiteSetting<StatsSetting>("stats"),
      getSiteSetting<ContactInfo>("contact"),
    ]);

  const homeServices = services.slice(0, 4);

  const heroTitle = hero
    ? pickLocale(locale, hero.title_th, hero.title_en ?? hero.title_th)
    : "ทำการตลาดออนไลน์ที่วัดผลได้จริง";
  const heroEyebrow = hero
    ? pickLocale(locale, hero.eyebrow_th, hero.eyebrow_en ?? hero.eyebrow_th)
    : "AI-Driven Agency · กรุงเทพฯ";

  const heroProjects = stats?.projects ?? "100+";
  const heroRoas = stats?.roas ?? "5.2×";
  const heroSeoDays = stats?.seo_days ?? "90";
  const heroYears = stats?.years ?? "8";

  const contactInfo: ContactInfo = contact ?? {};

  return (
    <main id="main">
      <OrganizationJsonLd contact={contactInfo} locale={locale} />
      <LocalBusinessJsonLd contact={contactInfo} locale={locale} />

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
              <span>{heroEyebrow}</span>
            </span>
            <h1 id="hero-title">{heroTitle}</h1>
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
              <div className="hero-trust-label">ตลอด {heroYears} ปี ในวงการ</div>
              <div className="hero-trust-stats">
                <div className="hero-trust-stat">
                  <div className="num tabular text-orange">{heroProjects}</div>
                  <div className="lbl">โปรเจคส่งมอบ</div>
                </div>
                <div className="hero-trust-stat">
                  <div className="num tabular">{heroRoas}</div>
                  <div className="lbl">ROAS เฉลี่ย</div>
                </div>
                <div className="hero-trust-stat">
                  <div className="num tabular text-orange">
                    {heroSeoDays}<small style={{ fontSize: ".55em", color: "var(--color-text-muted)", fontWeight: "var(--weight-regular)", marginLeft: 4 }}>วัน</small>
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
          <Reveal className="section-header-row">
            <div className="section-header">
              <span className="eyebrow-chip">● บริการของเรา</span>
              <h2 id="services-title">ครบทุกบริการที่ธุรกิจต้องการ</h2>
              <p className="lead">ไม่ต้องไล่หาเอเจนซีหลายเจ้า — ทีมเดียวดูแลตั้งแต่ออกแบบ ยิงแอด ไปจนถึงระบบหลังบ้าน</p>
            </div>
            <Link href="/services" className="btn btn-ghost btn-arrow">
              <span className="btn-label">ดูบริการทั้งหมด</span>
            </Link>
          </Reveal>

          <Reveal className="grid-services" delay={0.1}>
            {homeServices.map((s, i) => (
              <Link
                key={s.id}
                href={serviceHref(s.slug)}
                className="card card-service"
              >
                <div className={`card-icon ${SERVICE_TONES[i % SERVICE_TONES.length]}`} aria-hidden="true">
                  <ServiceIcon name={s.icon} />
                </div>
                <h3 className="card-title">
                  {pickLocale(locale, s.name_th, s.name_en ?? s.name_th)}
                </h3>
                <p className="card-desc">
                  {pickLocale(locale, s.summary_th, s.summary_en ?? s.summary_th)}
                </p>
                <span className="card-link">ดูรายละเอียด</span>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>


      {/* ============================================================ FEATURED PORTFOLIO */}
      <section className="section section-tight" id="featured" aria-labelledby="featured-title">
        <div className="container">
          <Reveal className="section-header-row">
            <div className="section-header">
              <span className="eyebrow-chip is-blue">● ผลงานล่าสุด</span>
              <h2 id="featured-title">โปรเจคที่ส่งมอบล่าสุด</h2>
              <p className="lead">ทุกโปรเจคที่นี่ได้รับความยินยอมจากลูกค้าให้แสดงต่อสาธารณะแล้ว</p>
            </div>
            <Link href="/portfolio" className="btn btn-ghost btn-arrow">
              <span className="btn-label">ดูผลงานทั้งหมด</span>
            </Link>
          </Reveal>

          <Reveal className="grid-3" delay={0.1}>
            {featuredPortfolio.map((p, i) => {
              const summary = pickLocale(locale, p.summary_th, p.summary_en ?? p.summary_th);
              return (
                <Link key={p.id} href={`/portfolio/${p.slug}`} className="card card-portfolio">
                  <div
                    className="card-media"
                    role="img"
                    aria-label={p.title}
                    style={{
                      background: p.cover_image
                        ? `center/cover no-repeat url("${p.cover_image}")`
                        : PORTFOLIO_GRADIENTS[i % PORTFOLIO_GRADIENTS.length],
                    }}
                  ></div>
                  <div className="card-body">
                    <span className="card-meta">
                      <span>{p.category}</span>
                      <span className="card-meta-dot"></span>
                      <span>{p.year ?? ""}</span>
                    </span>
                    <h3 className="card-title">{p.title}</h3>
                    <p className="card-desc">{summary}</p>
                  </div>
                </Link>
              );
            })}
          </Reveal>
        </div>
      </section>


      {/* ============================================================ STATS BAND */}
      <section className="section section-tight" aria-labelledby="stats-title">
        <div className="container">
          <Reveal className="stats-band">
            <div className="section-header" style={{ textAlign: "center", marginBottom: "var(--space-12)" }}>
              <span className="eyebrow-chip">● ตัวเลขที่เราภูมิใจ</span>
              <h2 id="stats-title">{heroYears} ปี ของการลงมือทำจริง</h2>
            </div>

            <div className="grid-3" style={{ gap: "var(--space-6)" }}>
              <div className="card card-stat">
                <span className="card-eyebrow is-orange" aria-hidden="true">★</span>
                <p className="card-stat-num tabular"><span className="accent">{heroProjects}</span></p>
                <p className="card-stat-label">โปรเจคที่ส่งมอบสำเร็จ</p>
              </div>

              <div className="card card-stat">
                <span className="card-eyebrow is-blue" aria-hidden="true">◆</span>
                <p className="card-stat-num tabular">{heroYears}<span className="unit">ปี</span></p>
                <p className="card-stat-label">ประสบการณ์ในวงการดิจิทัล</p>
              </div>

              <div className="card card-stat">
                <span className="card-eyebrow is-orange" aria-hidden="true">↗</span>
                <p className="card-stat-num tabular"><span className="accent">{heroRoas}</span></p>
                <p className="card-stat-label">ROAS เฉลี่ยของลูกค้า</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>


      {/* ============================================================ TESTIMONIALS */}
      <section className="section" id="testimonials" aria-labelledby="testi-title">
        <div className="container">
          <Reveal className="section-header" style={{ marginBottom: "var(--space-12)", maxWidth: 720 }}>
            <span className="eyebrow-chip">● เสียงจากลูกค้า</span>
            <h2 id="testi-title">ทำไมลูกค้าถึงกลับมาใช้บริการต่อ</h2>
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


      {/* ============================================================ BLOG TEASER */}
      <section className="section section-tight" id="blog" aria-labelledby="blog-title">
        <div className="container">
          <Reveal className="section-header-row">
            <div className="section-header">
              <span className="eyebrow-chip is-blue">● บทความล่าสุด</span>
              <h2 id="blog-title">เทคนิคและไอเดียจากทีม</h2>
              <p className="lead">เราเขียนเฉพาะที่ลงมือทำจริง ไม่ก๊อปจาก ChatGPT</p>
            </div>
            <Link href="/blog" className="btn btn-ghost btn-arrow">
              <span className="btn-label">บทความทั้งหมด</span>
            </Link>
          </Reveal>

          <Reveal className="grid-3" delay={0.1}>
            {articles.map((a, i) => {
              const title = pickLocale(locale, a.title_th, a.title_en ?? a.title_th);
              const excerpt = pickLocale(locale, a.excerpt_th, a.excerpt_en ?? a.excerpt_th);
              const tone = BLOG_CATEGORY_TONE[a.category] ?? "";
              return (
                <Link key={a.id} href={`/blog/${a.slug}`} className="card card-blog">
                  <div
                    className="card-media"
                    role="img"
                    aria-label={`ภาพประกอบบทความ ${a.category}`}
                    style={{
                      background: a.cover_image
                        ? `center/cover no-repeat url("${a.cover_image}")`
                        : BLOG_GRADIENTS[i % BLOG_GRADIENTS.length],
                    }}
                  ></div>
                  <div className="card-body">
                    <span className={`card-category ${tone}`}>{a.category}</span>
                    <h3 className="card-title">{title}</h3>
                    {excerpt ? <p className="card-excerpt">{excerpt}</p> : null}
                    <span className="card-meta">
                      <span>{formatThaiDate(a.published_at)}</span>
                      {a.author_name ? (
                        <>
                          <span className="card-meta-dot"></span>
                          <span>{a.author_name}</span>
                        </>
                      ) : null}
                    </span>
                  </div>
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
            <h2 id="cta-title">พร้อมเริ่มต้นกับเราหรือยัง?</h2>
            <p className="lead">นัดคุยฟรี 30 นาที — ไม่มีพิธีรีตอง ไม่ขายตรง แค่ฟังว่าธุรกิจคุณกำลังเจอโจทย์อะไร แล้วเสนอทางออกให้</p>
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
          </Reveal>
        </div>
      </section>
    </main>
  );
}
