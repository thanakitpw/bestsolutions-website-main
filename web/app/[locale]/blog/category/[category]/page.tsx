import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getArticles } from "@/utils/supabase/queries";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { MediaImage } from "@/components/media-image";
import { buildPageMetadata } from "@/utils/metadata";
import { categoryFromSlug, categorySlug } from "@/utils/category";
import { formatThaiDate, pickLocale } from "@/utils/format";
import { routing } from "@/i18n/routing";
import "@/styles/pages/blog.css";

export const revalidate = 300;

type Props = { params: Promise<{ locale: string; category: string }> };

async function categories(): Promise<string[]> {
  const articles = await getArticles();
  const seen: string[] = [];
  for (const a of articles) {
    if (a.category && !seen.includes(a.category)) seen.push(a.category);
  }
  return seen;
}

export async function generateStaticParams() {
  const list = await categories();
  return routing.locales.flatMap((locale) =>
    list.map((c) => ({ locale, category: categorySlug(c) })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, category } = await params;
  const name = categoryFromSlug(category, await categories());
  if (!name) return {};
  return buildPageMetadata({
    locale,
    path: `/blog/category/${categorySlug(name)}`,
    title: `บทความ ${name} สำหรับเจ้าของธุรกิจ`,
    description: `รวมบทความหมวด ${name} จากทีม Best Solutions — อธิบายจากงานจริง พร้อมขั้นตอนที่เจ้าของธุรกิจไทยนำไปใช้ต่อได้เอง`,
  });
}

export default async function BlogCategoryPage({ params }: Props) {
  const { locale, category } = await params;
  setRequestLocale(locale);

  const all = await categories();
  const name = categoryFromSlug(category, all);
  if (!name) notFound();

  const articles = await getArticles({ category: name });

  return (
    <main id="main">
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: locale === "en" ? "Home" : "หน้าแรก", path: "" },
          { name: locale === "en" ? "Blog" : "บทความ", path: "/blog" },
          { name, path: `/blog/category/${categorySlug(name)}` },
        ]}
      />

      <section className="page-hero" aria-labelledby="hero-title">
        <div className="page-hero-blob" aria-hidden="true"></div>
        <div className="container">
          <div className="page-hero-inner">
            <span className="eyebrow-pill"><span className="star">✦</span><span>{name}</span></span>
            <h1 id="hero-title">บทความหมวด {name}</h1>
            <p className="lead">
              รวมบทความ {name} ทั้งหมด {articles.length} เรื่องจากทีม Best Solutions
              เขียนจากงานที่ลงมือทำจริงกับธุรกิจไทย
            </p>
          </div>
        </div>
      </section>

      <section className="section section-tight" aria-labelledby="cat-posts-title">
        <div className="container">
          <h2 id="cat-posts-title" className="sr-only">บทความในหมวด {name}</h2>

          <div className="filter-bar">
            <Link href="/blog" className="filter-chip">ทั้งหมด</Link>
            {all.map((c) => (
              <Link
                key={c}
                href={`/blog/category/${categorySlug(c)}`}
                className={`filter-chip${c === name ? " is-active" : ""}`}
                {...(c === name ? { "aria-current": "page" as const } : {})}
              >
                {c}
              </Link>
            ))}
          </div>

          <Reveal className="grid-blog">
            {articles.map((a) => {
              const title = pickLocale(locale, a.title_th, a.title_en ?? a.title_th);
              return (
                <Link key={a.slug} href={`/blog/${a.slug}`} className="card card-blog">
                  <MediaImage
                    className="card-media"
                    src={a.cover_image}
                    alt={`ภาพประกอบบทความ ${title}`}
                    sizes="(min-width: 1280px) 400px, (min-width: 768px) 33vw, 100vw"
                  />
                  <div className="card-body">
                    <span className="card-category">{a.category}</span>
                    <h3 className="card-title">{title}</h3>
                    <p className="card-excerpt">
                      {pickLocale(locale, a.excerpt_th, a.excerpt_en ?? a.excerpt_th ?? "")}
                    </p>
                    <span className="card-meta">
                      <span>{formatThaiDate(a.published_at)}</span>
                      <span className="card-meta-dot"></span>
                      <span>{a.author_name}</span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </Reveal>
        </div>
      </section>

      <div className="section section-dark-pre" aria-hidden="true"></div>
      <section className="section section-dark" aria-labelledby="cta-title">
        <div className="container">
          <Reveal className="section-header section-header-center">
            <span className="eyebrow">● พร้อมเริ่ม</span>
            <h2 id="cta-title">อยากให้ทีมช่วยวาง {name} ให้ธุรกิจคุณไหม?</h2>
            <p className="lead">
              เล่าโจทย์ให้เราฟังก่อน แล้วเราจะช่วยดูว่าควรเริ่มจากตรงไหนให้เหมาะกับสถานการณ์จริงของคุณ
            </p>
          </Reveal>
          <Reveal
            style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)", justifyContent: "center", marginTop: "var(--space-10)" }}
            delay={0.1}
          >
            <Link href="/contact" className="btn btn-orange btn-lg btn-arrow"><span className="btn-label">นัดคุยกับทีม</span></Link>
            <Link href="/services" className="btn btn-on-dark btn-lg"><span className="btn-label">ดูบริการ</span></Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
