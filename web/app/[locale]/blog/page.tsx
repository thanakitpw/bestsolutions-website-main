import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getArticles } from "@/utils/supabase/queries";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { formatThaiDate, pickLocale } from "@/utils/format";
import { buildPageMetadata } from "@/utils/metadata";
import "@/styles/pages/blog.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });
  return buildPageMetadata({
    locale,
    path: "/blog",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

const CATEGORY_TONE: Record<string, string> = {
  "Digital Marketing": "is-blue",
  "SEO": "is-blue",
};

const CARD_GRADIENTS = [
  "linear-gradient(135deg, var(--color-blue-300), var(--color-blue-500))",
  "linear-gradient(135deg, var(--color-orange-500), var(--color-orange-700))",
  "linear-gradient(135deg, var(--color-text), var(--color-orange-700))",
  "linear-gradient(135deg, var(--color-orange-300), var(--color-peach))",
  "linear-gradient(135deg, var(--color-blue-500), var(--color-blue-700))",
  "linear-gradient(135deg, var(--color-peach), var(--color-orange-500))",
];

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const articles = await getArticles();
  const [featured, ...rest] = articles;

  return (
    <main id="main">
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: locale === "en" ? "Home" : "หน้าแรก", path: "" },
          { name: locale === "en" ? "Blog" : "บทความ", path: "/blog" },
        ]}
      />

      {/* ============================================================ HERO */}
      <section className="page-hero" aria-labelledby="hero-title">
        <div className="page-hero-blob" aria-hidden="true"></div>
        <div className="container">
          <div className="page-hero-inner">
            <span className="eyebrow-pill"><span className="star">✦</span><span>Blog · Insights from the team</span></span>
            <h1 id="hero-title">บทความและไอเดียจากทีม</h1>
            <p className="lead">เราเขียนเฉพาะที่ลงมือทำจริง — ไม่ก๊อปจาก ChatGPT ทุกบทความผ่านการ verify โดยทีมที่ดูแลเคสในระบบจริง</p>
          </div>
        </div>
      </section>


      {/* ============================================================ LIST */}
      <section className="section section-tight" id="posts" aria-labelledby="posts-title">
        <div className="container">
          <h2 id="posts-title" style={{ position: "absolute", clip: "rect(0 0 0 0)", width: "1px", height: "1px", overflow: "hidden" }}>บทความทั้งหมด</h2>

          <div className="filter-bar" role="tablist" aria-label="กรองตามหมวดหมู่">
            <button className="filter-chip is-active" type="button" role="tab" aria-selected={true}>ทั้งหมด</button>
            <button className="filter-chip" type="button" role="tab" aria-selected={false}>AI</button>
            <button className="filter-chip" type="button" role="tab" aria-selected={false}>Digital Marketing</button>
            <button className="filter-chip" type="button" role="tab" aria-selected={false}>SEO</button>
            <button className="filter-chip" type="button" role="tab" aria-selected={false}>Web Design</button>
            <button className="filter-chip" type="button" role="tab" aria-selected={false}>Case Studies</button>
          </div>

          {/* Featured */}
          {featured && (
            <Link href={`/blog/${featured.slug}`} className="featured-card" aria-labelledby="featured-title">
              <div
                className="featured-media"
                role="img"
                aria-label={`ภาพประกอบบทความ${pickLocale(locale, featured.title_th, featured.title_en ?? featured.title_th)}`}
                style={featured.cover_image ? { backgroundImage: `url(${featured.cover_image})`, backgroundSize: "cover" } : undefined}
              ></div>
              <div className="featured-body">
                <span className="featured-cat">Featured · {featured.category}</span>
                <h3 className="featured-title" id="featured-title">
                  {pickLocale(locale, featured.title_th, featured.title_en ?? featured.title_th)}
                </h3>
                <p className="featured-excerpt">
                  {pickLocale(locale, featured.excerpt_th, featured.excerpt_en ?? featured.excerpt_th ?? "")}
                </p>
                <div className="featured-meta">
                  <span><strong>{featured.author_name}</strong></span>
                  <span>·</span>
                  <span>{formatThaiDate(featured.published_at)}</span>
                  <span>·</span>
                  <span>อ่าน {featured.reading_time} นาที</span>
                </div>
              </div>
            </Link>
          )}

          {/* Grid */}
          <div className="grid-blog">
            {rest.map((a, i) => {
              const title = pickLocale(locale, a.title_th, a.title_en ?? a.title_th);
              const excerpt = pickLocale(locale, a.excerpt_th, a.excerpt_en ?? a.excerpt_th ?? "");
              const tone = CATEGORY_TONE[a.category] ?? "";
              const bg = CARD_GRADIENTS[i % CARD_GRADIENTS.length];
              return (
                <Link key={a.slug} href={`/blog/${a.slug}`} className="card card-blog">
                  <div
                    className="card-media"
                    role="img"
                    aria-label={`ภาพประกอบบทความ${title}`}
                    style={a.cover_image ? { backgroundImage: `url(${a.cover_image})`, backgroundSize: "cover" } : { background: bg }}
                  ></div>
                  <div className="card-body">
                    <span className={`card-category ${tone}`}>{a.category}</span>
                    <h3 className="card-title">{title}</h3>
                    <p className="card-excerpt">{excerpt}</p>
                    <span className="card-meta">
                      <span>{formatThaiDate(a.published_at)}</span>
                      <span className="card-meta-dot"></span>
                      <span>{a.author_name}</span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>


      {/* ============================================================ DARK CTA */}
      <div className="section section-dark-pre" aria-hidden="true"></div>
      <section className="section section-dark" aria-labelledby="cta-title">
        <div className="container">
          <div className="section-header section-header-center">
            <span className="eyebrow">● พร้อมเริ่ม</span>
            <h2 id="cta-title">อยากให้เราช่วยปรับใช้กับธุรกิจคุณ?</h2>
            <p className="lead">เนื้อหาในบล็อกเป็นแค่ส่วนหนึ่งของสิ่งที่เราทำให้ลูกค้า — ทักมาเล่าโจทย์ดู เราจะช่วยปรับให้เหมาะกับเคสคุณ</p>
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
