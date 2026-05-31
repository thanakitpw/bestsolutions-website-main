import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getServiceBySlug, getPortfolioItems } from "@/utils/supabase/queries";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { MediaImage } from "@/components/media-image";
import { ProcessCarousel, type ProcessStep } from "@/components/process-carousel";
import { TrackView } from "@/components/track-view";
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
    description: "ฟังโจทย์ ดูแบรนด์ ข้อมูลเดิม และเป้าหมายของเว็บไซต์ ก่อนสรุป sitemap, content outline และขอบเขตงาน",
    icon: SVG.search,
  },
  {
    num: "02",
    total: "05",
    duration: "1-2 WEEKS",
    title: "Design (Wireframe → UI)",
    description: "วาง wireframe ให้เห็นโครงหน้า ก่อนพัฒนาเป็น UI ที่สอดคล้องกับแบรนด์และประสบการณ์ผู้ใช้",
    icon: SVG.bolt,
  },
  {
    num: "03",
    total: "05",
    duration: "2 WEEKS",
    title: "Development",
    description: "พัฒนาเว็บไซต์และระบบที่เกี่ยวข้อง พร้อมส่ง preview ให้ตรวจงานและปรับรายละเอียดก่อน launch",
    icon: SVG.code,
  },
  {
    num: "04",
    total: "05",
    duration: "3-5 DAYS",
    title: "QA + SEO + Launch",
    description: "ตรวจ responsive, performance, SEO technical, form, tracking และขั้นตอน launch ให้พร้อมใช้งาน",
    icon: SVG.rocket,
  },
  {
    num: "05",
    total: "05",
    duration: "60 DAYS",
    title: "Warranty",
    description: "หลัง launch ดูแลปัญหาที่เกี่ยวกับการพัฒนา และช่วยตรวจจุดสำคัญในช่วงเริ่มใช้งาน",
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

  const heroVisual = "/website-mockup.png";
  const deliverableVisual = "/services/web-design-deliverables.webp";

  const serviceName = service
    ? pickLocale(locale, service.name_th, service.name_en ?? service.name_th)
    : "รับทำเว็บไซต์";
  const serviceSummary = service
    ? pickLocale(locale, service.summary_th, service.summary_en ?? service.summary_th)
    : "เว็บที่โหลดเร็ว SEO-ready ออกแบบจากแบรนด์คุณ พร้อม Lighthouse score ≥ 95 ทุกเว็บที่ส่งมอบ";

  return (
    <main id="main" className="service-single">
      <TrackView event="service_view" slug="web-design" />
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
                <span className="btn-label">ขอคำปรึกษา</span>
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
            <h2 id="features-title" style={{ margin: "var(--space-4) 0 var(--space-4)" }}>เว็บธุรกิจที่ดูดี ใช้งานง่าย และพร้อมต่อยอดการตลาด</h2>
            <p className="lead">เราออกแบบเว็บไซต์ให้เป็นมากกว่าหน้าตาที่สวย แต่เป็นช่องทางหลักที่ช่วยสร้างความน่าเชื่อถือ รับ lead และเชื่อมต่อกับการทำ SEO หรือโฆษณาได้ง่ายขึ้น</p>
          </Reveal>

          <Reveal className="features-grid" delay={0.1}>
            <article className="feature-card">
              <div className="feature-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.5 5.5L20 10l-5.5 2.5L12 18l-2.5-5.5L4 10l5.5-2.5L12 2z" /></svg>
              </div>
              <h3 className="feature-title">UX/UI ที่ออกแบบจากแบรนด์</h3>
              <p className="feature-desc">วางโครงหน้าและประสบการณ์ใช้งานให้เข้ากับตัวตนของแบรนด์ เป้าหมายธุรกิจ และพฤติกรรมลูกค้าจริง</p>
            </article>

            <article className="feature-card">
              <div className="feature-icon is-blue" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              </div>
              <h3 className="feature-title">โหลดเร็วและรองรับมือถือ</h3>
              <p className="feature-desc">พัฒนาเว็บด้วยโครงสร้างที่คำนึงถึงความเร็ว การแสดงผลบนมือถือ และประสบการณ์ใช้งานที่ไม่ทำให้ลูกค้าหลุดระหว่างทาง</p>
            </article>

            <article className="feature-card">
              <div className="feature-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.5-4.5" /></svg>
              </div>
              <h3 className="feature-title">SEO-ready ตั้งแต่วันแรก</h3>
              <p className="feature-desc">วางโครงสร้าง meta, sitemap, Schema และหน้าเนื้อหาให้เหมาะกับการค้นหา เพื่อให้ต่อยอด SEO ได้ง่ายขึ้น</p>
            </article>

            <article className="feature-card">
              <div className="feature-icon is-blue" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 8h18" /></svg>
              </div>
              <h3 className="feature-title">แก้เนื้อหาเองได้</h3>
              <p className="feature-desc">จัดระบบหลังบ้านให้ทีมแก้เนื้อหาหลักได้เอง ลดการรอ developer สำหรับการแก้ไขทั่วไป</p>
            </article>

            <article className="feature-card">
              <div className="feature-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
              </div>
              <h3 className="feature-title">ฟอร์มและช่องทางติดต่อพร้อมใช้งาน</h3>
              <p className="feature-desc">เชื่อมฟอร์มติดต่อ LINE และ analytics ที่จำเป็น เพื่อให้ทีมติดตาม lead และพฤติกรรมผู้เข้าชมได้ชัดขึ้น</p>
            </article>

            <article className="feature-card">
              <div className="feature-icon is-blue" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
              </div>
              <h3 className="feature-title">ดูแลหลังส่งมอบ 60 วัน</h3>
              <p className="feature-desc">หลังส่งมอบ เรายังช่วยดูแลปัญหาที่เกี่ยวกับการพัฒนาในช่วงรับประกัน เพื่อให้เว็บเริ่มใช้งานได้อย่างมั่นใจ</p>
            </article>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ PROBLEM / SOLUTION */}
      <section className="section" id="ps" aria-labelledby="ps-title">
        <div className="container">
          <Reveal className="section-header-center">
            <span className="eyebrow-chip">● ทำไมต้องปรับเว็บไซต์</span>
            <h2 id="ps-title" style={{ margin: "var(--space-4) 0 var(--space-4)" }}>เว็บที่แค่มีอยู่ กับเว็บที่ช่วยให้ธุรกิจเดินต่อได้</h2>
          </Reveal>

          <Reveal className="ps-grid" delay={0.1}>
            <article className="ps-card is-problem">
              <span className="ps-card-label">ปัญหาที่เจอบ่อย</span>
              <h3>เว็บเดิมที่ทำให้ลูกค้าตัดสินใจยาก</h3>
              <ul>
                <li>โหลดช้า ทำให้ลูกค้าหลุดก่อนเห็นข้อมูลสำคัญ</li>
                <li>หน้าตาคล้าย template จนแบรนด์ดูไม่แตกต่าง</li>
                <li>โครงสร้าง SEO ไม่พร้อม ทำให้ต่อยอดการค้นหาได้ยาก</li>
                <li>แก้เนื้อหาพื้นฐานเองไม่ได้ ต้องรอทีมเทคนิคทุกครั้ง</li>
                <li>ไม่มี tracking ที่ชัดเจน จึงไม่รู้ว่าคนติดต่อมาจากช่องทางไหน</li>
                <li>ประสบการณ์บนมือถือไม่ดี ปุ่มเล็ก อ่านยาก หรือใช้งานติดขัด</li>
              </ul>
            </article>

            <article className="ps-card is-solution">
              <span className="ps-card-label">วิธีที่เราช่วยวางระบบ</span>
              <h3>เว็บไซต์ใหม่ที่ช่วยให้ลูกค้าตัดสินใจง่ายขึ้น</h3>
              <ul>
                <li>วางโครงสร้างเว็บให้โหลดเร็วและใช้งานดีทั้งมือถือและเดสก์ท็อป</li>
                <li>ออกแบบจากแบรนด์และโจทย์ธุรกิจ ไม่ยึด template สำเร็จรูปเป็นหลัก</li>
                <li>วางโครงสร้าง SEO-ready เพื่อให้ต่อยอดคอนเทนต์และการค้นหาได้ง่าย</li>
                <li>จัดระบบหลังบ้านให้ทีมแก้เนื้อหาหลักเองได้หลังส่งมอบ</li>
                <li>เชื่อม analytics และช่องทางติดต่อที่จำเป็นตั้งแต่เริ่มใช้งาน</li>
                <li>ออกแบบโดยคำนึงถึงมือถือเป็นหลัก เพราะลูกค้าส่วนใหญ่ตัดสินใจจากหน้าจอเล็ก</li>
              </ul>
            </article>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ WHAT WE DO */}
      <section className="section section-tight ss-what" aria-labelledby="what-title">
        <div className="container ss-what-grid">
          <Reveal className="ss-what-text">
            <span className="eyebrow-chip">● สิ่งที่เราทำให้</span>
            <h2 id="what-title">เราทำเว็บไซต์ที่ดูดี โหลดเร็ว และพร้อมต่อยอด SEO</h2>
            <p>
              เราออกแบบและพัฒนาเว็บไซต์จากโจทย์ของแบรนด์ วางโครงสร้างหน้า เนื้อหา ความเร็ว และ SEO technical ที่จำเป็น
              เพื่อให้เว็บพร้อมใช้งานจริงและต่อยอดการตลาดได้หลัง launch
            </p>
            <p>
              งานของเราเริ่มจากการฟังเป้าหมายธุรกิจ กลุ่มลูกค้า และปัญหาของเว็บเดิมก่อน แล้วค่อยออกแบบเส้นทางผู้ใช้
              เพื่อให้เว็บไซต์ช่วยสร้างความน่าเชื่อถือและพาลูกค้าไปสู่การติดต่อได้ง่ายขึ้น
            </p>
          </Reveal>

          <Reveal className="ss-deliverables" delay={0.1}>
            <span className="eyebrow-chip is-blue">● สิ่งที่ได้รับ</span>
            <h3>สิ่งที่คุณได้รับเมื่อจบงาน</h3>
            <ul className="ss-deliverable-list">
              <li>เว็บไซต์พร้อมใช้งานบน production</li>
              <li>โครงสร้าง SEO technical เช่น sitemap, robots, metadata และ Schema ที่จำเป็น</li>
              <li>Design direction หรือไฟล์ออกแบบตามขอบเขตงาน</li>
              <li>ระบบจัดการเนื้อหาสำหรับแก้ข้อมูลสำคัญเอง</li>
              <li>การเชื่อมต่อ analytics และ tracking ที่จำเป็น</li>
              <li>เอกสารส่งมอบและช่วงดูแลหลัง launch</li>
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
              <h2 id="included-title">ครบตั้งแต่วางโครงสร้าง ออกแบบ พัฒนา และส่งมอบ</h2>
              <p className="ss-included-desc">รวมงานหลักที่เว็บไซต์ธุรกิจควรมี ตั้งแต่ UX/UI, development, SEO technical, tracking และเอกสารส่งมอบ โดยแจ้งขอบเขตงานให้ชัดก่อนเริ่ม</p>
            </div>

            <ul className="ss-included-list">
              <li><span className="ss-tick" aria-hidden="true">✓</span><span>UX/UI ออกแบบจากแบรนด์และกลุ่มลูกค้า</span></li>
              <li><span className="ss-tick" aria-hidden="true">✓</span><span>Frontend ที่พัฒนาให้โหลดเร็วและดูแลต่อได้</span></li>
              <li><span className="ss-tick" aria-hidden="true">✓</span><span>Backend หรือ CMS ตามขอบเขตที่เหมาะกับงาน</span></li>
              <li><span className="ss-tick" aria-hidden="true">✓</span><span>SEO on-page, technical และ Schema ที่จำเป็น</span></li>
              <li><span className="ss-tick" aria-hidden="true">✓</span><span>รองรับหลายภาษาเมื่อโปรเจกต์ต้องการ</span></li>
              <li><span className="ss-tick" aria-hidden="true">✓</span><span>ปรับ performance ตามมาตรฐานที่เหมาะกับเว็บจริง</span></li>
              <li><span className="ss-tick" aria-hidden="true">✓</span><span>เชื่อม analytics, tracking และฟอร์มติดต่อ</span></li>
              <li><span className="ss-tick" aria-hidden="true">✓</span><span>ช่วงดูแลหลังส่งมอบและเอกสารสำหรับใช้งานต่อ</span></li>
            </ul>

            <div className="ss-included-actions">
              <Link href="/contact" className="btn btn-primary btn-lg btn-arrow">
                <span className="btn-label">ขอคำปรึกษา</span>
              </Link>
            </div>
          </Reveal>

          {deliverableVisual && (
            <Reveal className="ss-included-visual" delay={0.1}>
              <MediaImage
                className="ss-included-image"
                src={deliverableVisual}
                alt="ภาพประกอบการส่งมอบเว็บไซต์พร้อม SEO tracking และ responsive design"
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
              <span className="eyebrow-chip is-blue">● ผลงานเว็บไซต์</span>
              <h2 id="portfolio-title">ตัวอย่างเว็บไซต์ที่ออกแบบจากโจทย์จริง</h2>
              <p className="lead">ดูตัวอย่างงานเว็บไซต์และโปรเจกต์ดิจิทัลที่เราออกแบบให้เหมาะกับเป้าหมายของแต่ละธุรกิจ</p>
            </div>
            <Link href="/portfolio" className="btn btn-ghost btn-arrow">
              <span className="btn-label">ดูผลงานทั้งหมด</span>
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
            title={<>จากโจทย์ธุรกิจ<br />สู่เว็บไซต์ที่พร้อมใช้งาน</>}
            description="เราแบ่งงานเป็นขั้นตอนชัดเจน ตั้งแต่สำรวจโจทย์ วางโครงหน้า ออกแบบ พัฒนา ทดสอบ และส่งมอบ เพื่อให้คุณเห็นความคืบหน้าและให้ feedback ได้ระหว่างทาง"
            steps={WEB_DESIGN_STEPS}
          />
        </div>
      </section>

      {/* ============================================================ FAQ */}
      <section className="section section-tight ss-faq" id="faq" aria-labelledby="faq-title">
        <div className="container">
          <Reveal className="section-header-center">
            <span className="eyebrow-chip">● FAQ</span>
            <h2 id="faq-title" style={{ margin: "var(--space-4) 0 var(--space-4)" }}>คำถามที่พบบ่อย</h2>
          </Reveal>

          <Reveal className="ss-faq-list" delay={0.1}>
            <details className="ss-faq-item">
              <summary>ราคาทำเว็บไซต์ประมาณเท่าไหร่?</summary>
              <p>ราคาขึ้นกับจำนวนหน้า ฟีเจอร์ ระบบหลังบ้าน และความซับซ้อนของงาน เล่าโจทย์คร่าว ๆ มาได้ แล้วเราจะช่วยประเมินช่วงงบประมาณที่เหมาะกับเคสของคุณ</p>
            </details>
            <details className="ss-faq-item">
              <summary>ใช้เวลาทำกี่สัปดาห์?</summary>
              <p>ระยะเวลาขึ้นกับขอบเขตงาน โดยทั่วไปเว็บไซต์ธุรกิจจะใช้เวลาหลายสัปดาห์ ตั้งแต่สำรวจโจทย์ ออกแบบ พัฒนา ทดสอบ และส่งมอบ</p>
            </details>
            <details className="ss-faq-item">
              <summary>ถ้ามีเว็บเก่าอยู่แล้ว จะย้ายอย่างไร?</summary>
              <p>เราจะตรวจโครงสร้างเว็บเดิม หน้าเดิม และ URL สำคัญก่อน เพื่อวางแผน migrate และ redirect ให้เหมาะสม ลดผลกระทบต่อ SEO เท่าที่ทำได้</p>
            </details>
            <details className="ss-faq-item">
              <summary>หลังจบงานต้องดูแลต่อไหม?</summary>
              <p>หลังส่งมอบมีช่วงดูแลปัญหาที่เกี่ยวกับการพัฒนา ส่วนการอัปเดตเนื้อหา SEO หรือดูแลต่อเนื่องสามารถเลือกทำเพิ่มได้ตามความจำเป็น</p>
            </details>
            <details className="ss-faq-item">
              <summary>ใช้เทคโนโลยีอะไร?</summary>
              <p>เราเลือกเทคโนโลยีตามโจทย์ของเว็บไซต์ โดยเน้นความเร็ว ความเสถียร การดูแลต่อ และการส่งมอบที่ทีมอื่นสามารถรับช่วงได้หากจำเป็น</p>
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
              <span className="eyebrow">● เริ่มต้นวันนี้</span>
              <h2 id="cta-title">อยากปรับเว็บไซต์ให้ดูน่าเชื่อถือและใช้งานได้จริงมากขึ้นไหม?</h2>
              <p>เล่าโจทย์ของเว็บไซต์ปัจจุบันให้เราฟังได้ เราจะช่วยดูว่าควรเริ่มจากโครงสร้าง เนื้อหา ดีไซน์ SEO หรือ tracking ก่อน</p>
              <div className="ss-cta-actions">
                <Link href="/contact" className="btn btn-orange btn-lg btn-arrow">
                  <span className="btn-label">ขอคำปรึกษา</span>
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
