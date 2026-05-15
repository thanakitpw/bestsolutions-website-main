import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getPortfolioItems, getSiteSetting } from "@/utils/supabase/queries";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { PortfolioFilter } from "@/components/portfolio-filter";
import { buildPageMetadata } from "@/utils/metadata";
import "@/styles/pages/portfolio.css";

export const revalidate = 60;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Portfolio" });
  return buildPageMetadata({
    locale,
    path: "/portfolio",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

type StatsSetting = { projects: string; years: string; roas: string; seo_days: string };

const CATEGORIES = ["เว็บไซต์องค์กร / บริษัท", "เว็บไซต์ร้านค้าออนไลน์"];

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [items, stats] = await Promise.all([
    getPortfolioItems(),
    getSiteSetting<StatsSetting>("stats"),
  ]);

  return (
    <main id="main">
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: locale === "en" ? "Home" : "หน้าแรก", path: "" },
          { name: locale === "en" ? "Portfolio" : "ผลงาน", path: "/portfolio" },
        ]}
      />

      {/* ============================================================ HERO */}
      <section className="page-hero" aria-labelledby="hero-title">
        <div className="page-hero-blob" aria-hidden="true"></div>
        <div className="container">
          <div className="page-hero-inner">
            <span className="eyebrow-pill"><span className="star">✦</span><span>ผลงาน</span></span>
            <h1 id="hero-title">ตัวอย่างงานที่ออกแบบจากโจทย์จริงของลูกค้า</h1>
            <p className="lead">ดูแนวทางการทำงานผ่านโปรเจกต์จริง ทั้งเว็บไซต์ แคมเปญ คอนเทนต์ และระบบดิจิทัลที่ออกแบบให้เข้ากับเป้าหมายของแต่ละธุรกิจ</p>
          </div>
        </div>
      </section>


      {/* ============================================================ FILTER + GRID */}
      <section className="section section-tight" id="works" aria-labelledby="works-title">
        <div className="container">
          <h2 id="works-title" style={{ position: "absolute", clip: "rect(0 0 0 0)", width: "1px", height: "1px", overflow: "hidden" }}>ผลงานทั้งหมด</h2>

          <PortfolioFilter items={items} locale={locale} categories={CATEGORIES} />
        </div>
      </section>


      {/* ============================================================ STATS */}
      <section className="section section-tight" aria-labelledby="stats-title">
        <div className="container">
          <Reveal className="stats-band">
            <div className="section-header-center" style={{ marginBottom: "var(--space-12)" }}>
              <span className="eyebrow-chip">● ภาพรวม</span>
              <h2 id="stats-title" style={{ marginTop: "var(--space-4)" }}>ประสบการณ์ที่ต่อยอดเป็นระบบให้ลูกค้า</h2>
            </div>
            <div className="grid-3" style={{ gap: "var(--space-6)" }}>
              <div className="card card-stat"><span className="card-eyebrow is-orange" aria-hidden="true">★</span><p className="card-stat-num tabular"><span className="accent">{stats?.projects ?? "100+"}</span></p><p className="card-stat-label">โปรเจกต์ที่ส่งมอบให้ลูกค้า</p></div>
              <div className="card card-stat"><span className="card-eyebrow is-blue" aria-hidden="true">◆</span><p className="card-stat-num tabular">{stats?.years ?? "8"}<span className="unit">ปี</span></p><p className="card-stat-label">ประสบการณ์ด้านดิจิทัล</p></div>
              <div className="card card-stat"><span className="card-eyebrow is-orange" aria-hidden="true">↗</span><p className="card-stat-num tabular"><span className="accent">{stats?.roas ?? "5.2×"}</span></p><p className="card-stat-label">ROAS เฉลี่ยจากแคมเปญลูกค้า</p></div>
            </div>
          </Reveal>
        </div>
      </section>


      {/* ============================================================ DARK CTA */}
      <div className="section section-dark-pre" aria-hidden="true"></div>
      <section className="section section-dark" aria-labelledby="cta-title">
        <div className="container">
          <Reveal className="section-header section-header-center">
            <span className="eyebrow">● พร้อมเริ่ม</span>
            <h2 id="cta-title">อยากให้โปรเจกต์ต่อไปของคุณเดินเป็นระบบกว่านี้ไหม?</h2>
            <p className="lead">เล่าโจทย์ของธุรกิจให้เราฟังได้ เราจะช่วยดูว่าควรเริ่มจากเว็บไซต์ SEO โฆษณา หรือ Automation เพื่อให้เหมาะกับเป้าหมายของคุณ</p>
          </Reveal>
          <Reveal style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)", justifyContent: "center", marginTop: "var(--space-10)" }} delay={0.1}>
            <Link href="/contact" className="btn btn-orange btn-lg btn-arrow"><span className="btn-label">นัดคุยกับทีม</span></Link>
            <Link href="/services" className="btn btn-on-dark btn-lg"><span className="btn-label">ดูบริการ</span></Link>
          </Reveal>
        </div>
      </section>

    </main>
  );
}
