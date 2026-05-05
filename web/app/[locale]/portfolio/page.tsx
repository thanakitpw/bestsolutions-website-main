import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getPortfolioItems, getSiteSetting } from "@/utils/supabase/queries";
import { pickLocale } from "@/utils/format";
import "@/styles/pages/portfolio.css";

type StatsSetting = { projects: string; years: string; roas: string; seo_days: string };

const CARD_GRADIENTS = [
  "linear-gradient(135deg, var(--color-orange-500), var(--color-peach))",
  "linear-gradient(135deg, var(--color-blue-500), var(--color-blue-700))",
  "linear-gradient(135deg, var(--color-text), var(--color-orange-700))",
  "linear-gradient(135deg, var(--color-orange-300), var(--color-orange-500))",
  "linear-gradient(135deg, var(--color-blue-300), var(--color-blue-500))",
  "linear-gradient(135deg, #5C1A02, var(--color-orange-700))",
  "linear-gradient(135deg, var(--color-blue-700), var(--color-text))",
  "linear-gradient(135deg, var(--color-peach), var(--color-orange-300))",
  "linear-gradient(135deg, var(--color-orange-500), var(--color-blue-500))",
];

export const metadata: Metadata = {
  title: "ผลงานของเรา · Best Solutions — Web Design, E-Commerce, SEO, Branding",
  description:
    "100+ โปรเจคที่ Best Solutions ส่งมอบให้ลูกค้า — รวมเว็บไซต์ ระบบ e-commerce แคมเปญ ads, SEO และ Production จากธุรกิจหลากหลายประเภทในไทย",
};

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

      {/* ============================================================ HERO */}
      <section className="page-hero" aria-labelledby="hero-title">
        <div className="page-hero-blob" aria-hidden="true"></div>
        <div className="container">
          <div className="page-hero-inner">
            <span className="eyebrow-pill"><span className="star">✦</span><span>Portfolio · 100+ projects</span></span>
            <h1 id="hero-title">ผลงานที่เราภูมิใจ ส่งมอบจริง วัดผลได้จริง</h1>
            <p className="lead">โปรเจคทุกอันที่นี่ได้รับความยินยอมจากลูกค้าให้แสดงต่อสาธารณะ — ตัวเลขผลลัพธ์มาจากข้อมูลจริงในระบบ Analytics</p>
          </div>
        </div>
      </section>


      {/* ============================================================ FILTER + GRID */}
      <section className="section section-tight" id="works" aria-labelledby="works-title">
        <div className="container">
          <h2 id="works-title" style={{ position: "absolute", clip: "rect(0 0 0 0)", width: "1px", height: "1px", overflow: "hidden" }}>ผลงานทั้งหมด</h2>

          <div className="filter-bar" role="tablist" aria-label="กรองตามหมวดหมู่">
            <button className="filter-chip is-active" type="button" role="tab" aria-selected={true}>ทั้งหมด</button>
            <button className="filter-chip" type="button" role="tab" aria-selected={false}>Web Design</button>
            <button className="filter-chip" type="button" role="tab" aria-selected={false}>E-Commerce</button>
            <button className="filter-chip" type="button" role="tab" aria-selected={false}>Online Marketing</button>
            <button className="filter-chip" type="button" role="tab" aria-selected={false}>SEO</button>
            <button className="filter-chip" type="button" role="tab" aria-selected={false}>Branding</button>
            <button className="filter-chip" type="button" role="tab" aria-selected={false}>Video &amp; Content</button>
          </div>

          <div className="grid-portfolio">
            {items.map((p, i) => {
              const summary = pickLocale(locale, p.summary_th, p.summary_en ?? p.summary_th);
              const bg = CARD_GRADIENTS[i % CARD_GRADIENTS.length];
              return (
                <Link key={p.slug} href={`/portfolio/${p.slug}`} className="card card-portfolio">
                  <div
                    className="card-media"
                    role="img"
                    aria-label={`ภาพผลงาน${p.title}`}
                    style={p.cover_image ? { backgroundImage: `url(${p.cover_image})`, backgroundSize: "cover" } : { background: bg }}
                  ></div>
                  <div className="card-body">
                    <span className="card-meta">
                      <span>{p.category}</span>
                      {p.year && <><span className="card-meta-dot"></span><span>{p.year}</span></>}
                    </span>
                    <h3 className="card-title">{p.title}</h3>
                    <p className="card-desc">{summary}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>


      {/* ============================================================ STATS */}
      <section className="section section-tight" aria-labelledby="stats-title">
        <div className="container">
          <div className="stats-band">
            <div className="section-header-center" style={{ marginBottom: "var(--space-12)" }}>
              <span className="eyebrow-chip">● ภาพรวม</span>
              <h2 id="stats-title" style={{ marginTop: "var(--space-4)" }}>8 ปี ของการลงมือทำจริง</h2>
            </div>
            <div className="grid-3" style={{ gap: "var(--space-6)" }}>
              <div className="card card-stat"><span className="card-eyebrow is-orange" aria-hidden="true">★</span><p className="card-stat-num tabular"><span className="accent">{stats?.projects ?? "100+"}</span></p><p className="card-stat-label">โปรเจคที่ส่งมอบสำเร็จ</p></div>
              <div className="card card-stat"><span className="card-eyebrow is-blue" aria-hidden="true">◆</span><p className="card-stat-num tabular">{stats?.years ?? "8"}<span className="unit">ปี</span></p><p className="card-stat-label">ประสบการณ์ในวงการดิจิทัล</p></div>
              <div className="card card-stat"><span className="card-eyebrow is-orange" aria-hidden="true">↗</span><p className="card-stat-num tabular"><span className="accent">{stats?.roas ?? "5.2×"}</span></p><p className="card-stat-label">ROAS เฉลี่ยของลูกค้า</p></div>
            </div>
          </div>
        </div>
      </section>


      {/* ============================================================ DARK CTA */}
      <div className="section section-dark-pre" aria-hidden="true"></div>
      <section className="section section-dark" aria-labelledby="cta-title">
        <div className="container">
          <div className="section-header section-header-center">
            <span className="eyebrow">● พร้อมเริ่ม</span>
            <h2 id="cta-title">อยากให้ธุรกิจคุณเป็นเคสต่อไป?</h2>
            <p className="lead">นัดคุยฟรี 30 นาที — เล่าโจทย์ให้ฟัง เราจะแนะนำแนวทางที่เคยใช้ได้ผลกับธุรกิจคล้าย ๆ คุณ</p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)", justifyContent: "center", marginTop: "var(--space-10)" }}>
            <Link href="/contact" className="btn btn-orange btn-lg btn-arrow"><span className="btn-label">นัดคุยกับทีม</span></Link>
            <Link href="/services" className="btn btn-on-dark btn-lg"><span className="btn-label">ดูบริการ</span></Link>
          </div>
        </div>
      </section>

    </main>
  );
}
