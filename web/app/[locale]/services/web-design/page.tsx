import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getServiceBySlug, getPortfolioItems } from "@/utils/supabase/queries";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { MediaImage } from "@/components/media-image";
import { ProcessCarousel, type ProcessStep } from "@/components/process-carousel";
import { pickLocale } from "@/utils/format";
import { buildPageMetadata } from "@/utils/metadata";
import "@/styles/pages/web-design.css";
import "@/styles/pages/service-single.css";

export const revalidate = 3600;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "WebDesign" });
  return buildPageMetadata({
    locale,
    path: "/services/web-design",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

const SVG = {
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.5-4.5" /></svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
  ),
  rocket: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
  ),
} as const;

const WEB_DESIGN_STEPS: ProcessStep[] = [
  {
    num: "01",
    total: "05",
    duration: "3-7 DAYS",
    title: "Discover & Scope",
    description: "ฟังโจทย์ ดู brand asset + data จริง วาง sitemap + content outline + KPI ให้คุณ approve",
    icon: SVG.search,
  },
  {
    num: "02",
    total: "05",
    duration: "1-2 WEEKS",
    title: "Design (Wireframe → UI)",
    description: "Wireframe ใน Figma → review → UI สมบูรณ์ + design tokens พร้อมส่งต่อ",
    icon: SVG.bolt,
  },
  {
    num: "03",
    total: "05",
    duration: "2 WEEKS",
    title: "Development",
    description: "Next.js + Supabase + i18n — ส่ง preview link ให้คลิกดูได้รายวัน",
    icon: SVG.code,
  },
  {
    num: "04",
    total: "05",
    duration: "3-5 DAYS",
    title: "QA + SEO + Launch",
    description: "Lighthouse + accessibility + redirect URL เก่า → DNS cutover ปิดงาน",
    icon: SVG.rocket,
  },
  {
    num: "05",
    total: "05",
    duration: "60 DAYS",
    title: "Warranty",
    description: "หลัง launch ดูแล bug + monitor Core Web Vitals + GSC ฟรี 60 วัน",
    icon: SVG.shield,
  },
];

const PORTFOLIO_GRADIENTS = [
  "linear-gradient(135deg, var(--color-orange-500), var(--color-peach))",
  "linear-gradient(135deg, var(--color-blue-500), var(--color-blue-700))",
  "linear-gradient(135deg, var(--color-text), var(--color-orange-700))",
];

export default async function WebDesignPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [service, allPortfolio] = await Promise.all([
    getServiceBySlug("web-design"),
    getPortfolioItems(),
  ]);

  const relatedPortfolio = allPortfolio
    .filter((p) => p.services?.includes("web-design"))
    .slice(0, 3);
  const portfolioToShow = relatedPortfolio.length > 0 ? relatedPortfolio : allPortfolio.slice(0, 3);

  const heroVisual = relatedPortfolio[0]?.cover_image ?? allPortfolio[0]?.cover_image ?? null;
  const deliverableVisual = relatedPortfolio[1]?.cover_image ?? allPortfolio[1]?.cover_image ?? null;

  const serviceName = service
    ? pickLocale(locale, service.name_th, service.name_en ?? service.name_th)
    : "รับทำเว็บไซต์";
  const serviceSummary = service
    ? pickLocale(locale, service.summary_th, service.summary_en ?? service.summary_th)
    : "เว็บที่โหลดเร็ว SEO-ready ออกแบบจากแบรนด์คุณ พร้อม Lighthouse score ≥ 95 ทุกเว็บที่ส่งมอบ";

  return (
    <main id="main" className="service-single">
      {service ? <ServiceJsonLd service={service} locale={locale} /> : null}
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: locale === "en" ? "Home" : "หน้าแรก", path: "" },
          { name: locale === "en" ? "Services" : "บริการ", path: "/services" },
          { name: serviceName, path: "/services/web-design" },
        ]}
      />

      {/* ============================================================ HERO */}
      <section className="ss-hero" aria-labelledby="hero-title">
        <div className="ss-hero-blob" aria-hidden="true"></div>
        <div className="container">
          <Link href="/services" className="breadcrumb">
            <span aria-hidden="true">←</span>
            <span>บริการทั้งหมด</span>
          </Link>

          <div className="ss-hero-inner">
            <span className="eyebrow-pill">
              <span className="star">✦</span>
              <span>Web Design · Service</span>
            </span>
            <h1 id="hero-title" className="ss-hero-title">
              {serviceName}
            </h1>
            <p className="ss-hero-lead">{serviceSummary}</p>
            <div className="ss-hero-ctas">
              <Link href="/contact" className="btn btn-primary btn-lg btn-arrow">
                <span className="btn-label">ขอใบเสนอราคา</span>
              </Link>
              <Link href="#portfolio" className="btn btn-secondary btn-lg">
                <span className="btn-label">ดูผลงานเว็บ</span>
              </Link>
            </div>
          </div>

          {heroVisual && (
            <div className="ss-hero-visual">
              <MediaImage
                className="ss-hero-image"
                src={heroVisual}
                alt={`ตัวอย่างเว็บไซต์ ${serviceName}`}
                priority
                sizes="(min-width: 1280px) 1100px, 100vw"
              />
            </div>
          )}
        </div>
      </section>

      {/* ============================================================ FEATURES */}
      <section className="section section-tight" id="features" aria-labelledby="features-title">
        <div className="container">
          <Reveal className="section-header-center">
            <span className="eyebrow-chip">● สิ่งที่คุณได้</span>
            <h2 id="features-title" style={{ margin: "var(--space-4) 0 var(--space-4)" }}>ครบทุกอย่างที่เว็บธุรกิจควรมี</h2>
            <p className="lead">ไม่ใช่แค่หน้าเว็บสวย ๆ — แต่เป็นเครื่องมือทำเงินที่วัดผลได้ทุก click</p>
          </Reveal>

          <Reveal className="features-grid" delay={0.1}>
            <article className="feature-card">
              <div className="feature-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.5 5.5L20 10l-5.5 2.5L12 18l-2.5-5.5L4 10l5.5-2.5L12 2z" /></svg>
              </div>
              <h3 className="feature-title">UX/UI ออกแบบจากแบรนด์</h3>
              <p className="feature-desc">ไม่ใช่ template สำเร็จ — ออกแบบใหม่ทั้งหมดให้ตรงตัวตนแบรนด์และพฤติกรรมลูกค้าของคุณ</p>
            </article>

            <article className="feature-card">
              <div className="feature-icon is-blue" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              </div>
              <h3 className="feature-title">โหลดเร็ว LCP &lt; 2.5s</h3>
              <p className="feature-desc">Next.js + edge CDN + image optimization — Core Web Vitals ผ่านเขียวทุกตัว ไม่ทำให้ลูกค้าหลุด</p>
            </article>

            <article className="feature-card">
              <div className="feature-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.5-4.5" /></svg>
              </div>
              <h3 className="feature-title">SEO-ready ตั้งแต่วันแรก</h3>
              <p className="feature-desc">Meta tags / Schema.org / sitemap / hreflang ครบ พร้อม content ภาษาไทยที่ตรง keyword</p>
            </article>

            <article className="feature-card">
              <div className="feature-icon is-blue" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 8h18" /></svg>
              </div>
              <h3 className="feature-title">แก้ content เองได้</h3>
              <p className="feature-desc">เปิด Supabase Studio แก้ blog / portfolio / service ได้ทันที — ไม่ต้องโทรเรียกเรา</p>
            </article>

            <article className="feature-card">
              <div className="feature-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
              </div>
              <h3 className="feature-title">Lead form + LINE link</h3>
              <p className="feature-desc">ฟอร์มขอใบเสนอ + LINE OA + GA4 + Pixel — track ครบทุก conversion ตั้งแต่ launch</p>
            </article>

            <article className="feature-card">
              <div className="feature-icon is-blue" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
              </div>
              <h3 className="feature-title">รับประกัน 60 วัน</h3>
              <p className="feature-desc">บั๊กที่เกิดจากการพัฒนา เราซ่อมฟรี 60 วันแรกหลังส่งมอบ ไม่มีคำถาม</p>
            </article>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ PROBLEM / SOLUTION */}
      <section className="section" id="ps" aria-labelledby="ps-title">
        <div className="container">
          <Reveal className="section-header-center">
            <span className="eyebrow-chip">● ทำไมต้องรื้อเว็บใหม่</span>
            <h2 id="ps-title" style={{ margin: "var(--space-4) 0 var(--space-4)" }}>เว็บแบบเก่า vs เว็บที่เราทำ</h2>
          </Reveal>

          <Reveal className="ps-grid" delay={0.1}>
            <article className="ps-card is-problem">
              <span className="ps-card-label">ปัญหาที่เจอบ่อย</span>
              <h3>เว็บแบบเก่าที่ทำให้คุณเสียลูกค้า</h3>
              <ul>
                <li>โหลดช้า รอ 5-10 วินาที ลูกค้าหลุดไปแล้ว</li>
                <li>ออกแบบเหมือน template — ไม่มีตัวตนแบรนด์</li>
                <li>SEO ไม่ผ่าน ไม่ขึ้นอันดับใน Google</li>
                <li>แก้ content ต้องจ่ายดีเวลอปเปอร์ทุกครั้ง</li>
                <li>ไม่ track conversion ไม่รู้ว่าใครเข้ามาจากไหน</li>
                <li>มือถือใช้ไม่ได้ ปุ่มเล็ก scroll หลุด</li>
              </ul>
            </article>

            <article className="ps-card is-solution">
              <span className="ps-card-label">วิธีที่เราทำให้</span>
              <h3>เว็บใหม่ที่ทำงานแทนคุณ</h3>
              <ul>
                <li>โหลดเร็ว LCP &lt; 2.5s ทั้งบนมือถือและเดสก์ท็อป</li>
                <li>ออกแบบใหม่จากแบรนด์ — ไม่มีเว็บอื่นเหมือน</li>
                <li>SEO-ready Lighthouse ≥ 95 ทุกเว็บที่ส่งมอบ</li>
                <li>แก้ content ผ่าน Supabase Studio ฟรีตลอด</li>
                <li>GA4 + Meta Pixel + LINE tracking ครบจาก launch</li>
                <li>Mobile-first จริง — ออกแบบจาก 360px ก่อน</li>
              </ul>
            </article>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ WHAT WE DO */}
      <section className="section section-tight ss-what" aria-labelledby="what-title">
        <div className="container ss-what-grid">
          <Reveal className="ss-what-text">
            <span className="eyebrow-chip">● What we do</span>
            <h2 id="what-title">เราทำเว็บที่โหลดเร็ว ออกแบบสวย ติดอันดับ Google</h2>
            <p>
              ทุกเว็บที่ส่งมอบผ่าน Lighthouse ≥ 95 ทั้งสามด้าน — Performance, SEO, Accessibility — ออกแบบใหม่จากแบรนด์
              ไม่ใช่ template สำเร็จ พร้อม Schema.org / Meta tags / Open Graph ครบตั้งแต่ launch
            </p>
            <p>
              เริ่มที่การฟังโจทย์ก่อน ไม่ใช่เริ่มที่ design — เราคุยกับเจ้าของแบรนด์ ดู GA / GSC / data จริง แล้วค่อยออกแบบ
              เพื่อให้เว็บเก็บ lead ได้จริง ไม่ใช่แค่สวย
            </p>
          </Reveal>

          <Reveal className="ss-deliverables" delay={0.1}>
            <span className="eyebrow-chip is-blue">● Key deliverables</span>
            <h3>สิ่งที่คุณได้รับเมื่อจบงาน</h3>
            <ul className="ss-deliverable-list">
              <li>เว็บไซต์ Next.js 15 production-ready บน Vercel</li>
              <li>โครงสร้าง SEO ครบ — sitemap / robots / hreflang / Schema</li>
              <li>Design system + Figma file โอนให้</li>
              <li>Supabase Studio สำหรับแก้ content เอง</li>
              <li>GA4 + Meta Pixel + LINE tracking</li>
              <li>เอกสารส่งมอบ + 60 วันรับประกัน</li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ INCLUDED + CTA */}
      <section className="section section-tight ss-included" aria-labelledby="included-title">
        <div className="container ss-included-grid">
          <Reveal className="ss-included-card">
            <div className="ss-included-head">
              <span className="eyebrow-chip">● บริการที่รวมอยู่</span>
              <h2 id="included-title">ทุกอย่างจบในแพ็กเกจเดียว</h2>
              <p className="ss-included-desc">ไม่มีค่า hidden ไม่ต้องจ้างเพิ่ม — รวมงานออกแบบ พัฒนา SEO และส่งมอบ</p>
            </div>

            <ul className="ss-included-list">
              <li><span className="ss-tick" aria-hidden="true">✓</span><span>UX/UI ออกแบบจากแบรนด์ (Figma)</span></li>
              <li><span className="ss-tick" aria-hidden="true">✓</span><span>Frontend Next.js + Tailwind</span></li>
              <li><span className="ss-tick" aria-hidden="true">✓</span><span>Backend Supabase (Postgres + Storage)</span></li>
              <li><span className="ss-tick" aria-hidden="true">✓</span><span>SEO on-page + technical + Schema</span></li>
              <li><span className="ss-tick" aria-hidden="true">✓</span><span>i18n ไทย/อังกฤษ พร้อมใช้</span></li>
              <li><span className="ss-tick" aria-hidden="true">✓</span><span>Performance: Lighthouse ≥ 95</span></li>
              <li><span className="ss-tick" aria-hidden="true">✓</span><span>Analytics + tracking + form integration</span></li>
              <li><span className="ss-tick" aria-hidden="true">✓</span><span>60 วันรับประกัน + เอกสารส่งมอบ</span></li>
            </ul>

            <div className="ss-included-actions">
              <Link href="/contact" className="btn btn-primary btn-lg btn-arrow">
                <span className="btn-label">ขอใบเสนอราคา</span>
              </Link>
            </div>
          </Reveal>

          {deliverableVisual && (
            <Reveal className="ss-included-visual" delay={0.1}>
              <MediaImage
                className="ss-included-image"
                src={deliverableVisual}
                alt="ตัวอย่างผลงานเว็บไซต์"
                sizes="(min-width: 1024px) 480px, 100vw"
              />
            </Reveal>
          )}
        </div>
      </section>

      {/* ============================================================ PORTFOLIO */}
      <section className="section section-tight ss-portfolio" id="portfolio" aria-labelledby="portfolio-title">
        <div className="container">
          <Reveal className="ss-portfolio-head">
            <div>
              <span className="eyebrow-chip is-blue">● ผลงานลูกค้าของเรา</span>
              <h2 id="portfolio-title">เว็บที่เราเพิ่งส่งมอบ</h2>
              <p className="lead">ทุกเคสคือลูกค้าจริง ดูได้ทั้ง KPI และเว็บที่กำลังเปิดใช้งาน</p>
            </div>
            <Link href="/portfolio" className="btn btn-ghost btn-arrow">
              <span className="btn-label">ผลงานทั้งหมด</span>
            </Link>
          </Reveal>

          <Reveal className="grid-3" delay={0.1}>
            {portfolioToShow.map((p, i) => (
              <Link key={p.slug} href={`/portfolio/${p.slug}`} className="card card-portfolio">
                <MediaImage
                  className="card-media"
                  src={p.cover_image}
                  alt={`ภาพผลงาน ${p.title}`}
                  gradient={PORTFOLIO_GRADIENTS[i % PORTFOLIO_GRADIENTS.length]}
                  sizes="(min-width: 1280px) 400px, (min-width: 768px) 33vw, 100vw"
                />
                <div className="card-body">
                  <span className="card-meta">
                    <span>{p.category}</span>
                    {p.year && <><span className="card-meta-dot"></span><span>{p.year}</span></>}
                  </span>
                  <h3 className="card-title">{p.title}</h3>
                  <p className="card-desc">{pickLocale(locale, p.summary_th, p.summary_en ?? p.summary_th)}</p>
                </div>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ============================================================ PROCESS */}
      <section className="section section-tight ss-process" id="process" aria-labelledby="process-title">
        <div className="container">
          <ProcessCarousel
            eyebrow="Process"
            title={<>From Idea<br />to Production</>}
            description="ทำเป็น Sprint รายสัปดาห์ — รู้ก่อนว่าแต่ละสัปดาห์จะได้ deliverable อะไร พร้อม preview link ให้คลิกดูได้ทุกวัน"
            steps={WEB_DESIGN_STEPS}
          />
        </div>
      </section>

      {/* ============================================================ FAQ */}
      <section className="section section-tight ss-faq" id="faq" aria-labelledby="faq-title">
        <div className="container">
          <Reveal className="section-header-center">
            <span className="eyebrow-chip">● FAQ</span>
            <h2 id="faq-title" style={{ margin: "var(--space-4) 0 var(--space-4)" }}>Frequently Asked Questions</h2>
          </Reveal>

          <Reveal className="ss-faq-list" delay={0.1}>
            <details className="ss-faq-item">
              <summary>ราคาทำเว็บประมาณเท่าไหร่?</summary>
              <p>ขึ้นกับขนาดและฟีเจอร์ — landing 1 หน้าเริ่มหลักหมื่น เว็บบริษัท 5-8 หน้าหลักแสน ส่วน e-commerce/web app หลักแสนปลาย ๆ ขึ้นไป ปรึกษาฟรี 30 นาที เราจะให้ตัวเลขเฉพาะเคสคุณ</p>
            </details>
            <details className="ss-faq-item">
              <summary>ใช้เวลาทำกี่สัปดาห์?</summary>
              <p>เว็บขนาดกลาง 5-6 สัปดาห์ — ทำเป็น Sprint รายสัปดาห์ มี preview ให้ดูได้รายวันใน 2 สัปดาห์หลัง</p>
            </details>
            <details className="ss-faq-item">
              <summary>เว็บเก่าผมจะ migrate ยังไง?</summary>
              <p>เรารับ migrate ครบ — รวมตั้ง 301 redirect จาก URL เก่าไปใหม่ทุกหน้าเพื่อรักษา SEO ranking ของเว็บเดิม</p>
            </details>
            <details className="ss-faq-item">
              <summary>หลังจบงานต้องดูแลต่อไหม?</summary>
              <p>มีรับประกัน 60 วันฟรี — bug ที่เกิดจากการพัฒนาเราซ่อมให้ ส่วนดูแล/อัพเดต/SEO ต่อเนื่องมีแพ็กเกจรายเดือนให้เลือก ไม่บังคับ</p>
            </details>
            <details className="ss-faq-item">
              <summary>ใช้เทคโนโลยีอะไร?</summary>
              <p>Next.js 15 + TypeScript + Tailwind v4 + Supabase + Vercel — stack ที่ใช้กันใน startup ระดับโลก คุณ migrate ไปทำงานกับทีม dev อื่นได้ ไม่ผูกขาด</p>
            </details>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ FOOTER CTA */}
      <section className="section ss-cta" aria-labelledby="cta-title">
        <div className="container">
          <Reveal className="ss-cta-card">
            <div className="ss-cta-blob" aria-hidden="true"></div>
            <div className="ss-cta-text">
              <span className="eyebrow">● พร้อมเริ่มแล้ว?</span>
              <h2 id="cta-title">มาสร้างเว็บที่ทำงานแทนคุณ</h2>
              <p>นัดคุยฟรี 30 นาที — เราจะดูเว็บปัจจุบันให้ + เสนอแผน Sprint + ราคาก่อนเซ็น</p>
              <div className="ss-cta-actions">
                <Link href="/contact" className="btn btn-orange btn-lg btn-arrow">
                  <span className="btn-label">ขอใบเสนอราคา</span>
                </Link>
                <Link href="/portfolio" className="btn btn-on-light btn-lg">
                  <span className="btn-label">ดูผลงานก่อน</span>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </main>
  );
}
