import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import { getArticleBySlug, getArticles, getArticleSlugs } from "@/utils/supabase/queries";
import { buildAlternates, buildOg } from "@/utils/metadata";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { formatThaiDate, pickLocale } from "@/utils/format";
import "@/styles/pages/sample-post.css";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.flatMap((slug) => [
    { locale: "th", slug },
    { locale: "en", slug },
  ]);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  const title = pickLocale(locale, article.title_th, article.title_en ?? article.title_th);
  const description = (article.seo_description ?? pickLocale(locale, article.excerpt_th, article.excerpt_en ?? article.excerpt_th ?? "")) ?? "";
  const fullTitle = article.seo_title ?? `${title} · Best Solutions`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: buildAlternates(locale, `/blog/${slug}`),
    openGraph: buildOg({
      locale,
      title: fullTitle,
      description,
      path: `/blog/${slug}`,
      type: "article",
      ...(article.cover_image ? { image: article.cover_image } : {}),
    }),
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const [article, allArticles] = await Promise.all([
    getArticleBySlug(slug),
    getArticles(),
  ]);

  if (!article) notFound();

  const title = pickLocale(locale, article.title_th, article.title_en ?? article.title_th);
  const body = pickLocale(locale, article.body_md_th, article.body_md_en ?? article.body_md_th);
  const related = allArticles.filter((a) => a.slug !== slug).slice(0, 3);

  const RELATED_GRADIENTS = [
    "linear-gradient(135deg, var(--color-orange-300), var(--color-peach))",
    "linear-gradient(135deg, var(--color-blue-300), var(--color-blue-500))",
    "linear-gradient(135deg, var(--color-orange-500), var(--color-orange-700))",
  ];

  return (
    <main id="main">
      <ArticleJsonLd article={article} locale={locale} />
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: locale === "en" ? "Home" : "หน้าแรก", path: "" },
          { name: locale === "en" ? "Blog" : "บทความ", path: "/blog" },
          { name: title, path: `/blog/${slug}` },
        ]}
      />

      {/* ============================================================ HEADER */}
      <header className="post-header">
        <div className="container">
          <div className="post-header-inner">
            <Link href="/blog" className="breadcrumb"><span aria-hidden="true">←</span><span>บทความทั้งหมด</span></Link>
            <span className="post-cat">{article.category}</span>
            <h1 className="post-title">{title}</h1>
            <div className="post-meta">
              <div className="post-author-avatar" aria-hidden="true"></div>
              <span><strong>{article.author_name}</strong></span>
              <span>·</span>
              <span>{formatThaiDate(article.published_at)}</span>
              <span>·</span>
              <span>อ่าน {article.reading_time} นาที</span>
            </div>
          </div>
        </div>
      </header>


      <section className="section section-tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <div
            className="post-cover"
            role="img"
            aria-label={`ภาพประกอบบทความ${title}`}
            style={article.cover_image ? { backgroundImage: `url(${article.cover_image})`, backgroundSize: "cover" } : undefined}
          ></div>

          <div className="post-layout">

            {/* TOC placeholder — populated by client-side JS in future */}
            <nav className="post-toc" aria-label="สารบัญบทความ">
              <h4>สารบัญ</h4>
            </nav>

            {/* BODY */}
            <article className="post-body">
              <ReactMarkdown rehypePlugins={[rehypeSanitize]}>
                {body ?? ""}
              </ReactMarkdown>

              <div className="author-card">
                <div className="author-card-avatar" aria-hidden="true"></div>
                <div>
                  <div className="author-card-name">{article.author_name}</div>
                  <div className="author-card-role">Best Solutions Team</div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>


      {/* ============================================================ RELATED */}
      {related.length > 0 && (
        <section className="section section-tight">
          <div className="container">
            <Reveal className="section-header-center">
              <span className="eyebrow-chip is-blue">● บทความที่เกี่ยวข้อง</span>
              <h2 style={{ marginTop: "var(--space-4)" }}>บทความอื่นที่อาจสนใจ</h2>
            </Reveal>
            <Reveal className="grid-3" delay={0.1}>
              {related.map((a, i) => (
                <Link key={a.slug} href={`/blog/${a.slug}`} className="card card-blog">
                  <div
                    className="card-media"
                    role="img"
                    aria-label={`ภาพประกอบ${a.title_th}`}
                    style={a.cover_image ? { backgroundImage: `url(${a.cover_image})`, backgroundSize: "cover" } : { background: RELATED_GRADIENTS[i] }}
                  ></div>
                  <div className="card-body">
                    <span className="card-category">{a.category}</span>
                    <h3 className="card-title">{pickLocale(locale, a.title_th, a.title_en ?? a.title_th)}</h3>
                    <p className="card-excerpt">{pickLocale(locale, a.excerpt_th, a.excerpt_en ?? a.excerpt_th ?? "")}</p>
                    <span className="card-meta"><span>{formatThaiDate(a.published_at)}</span></span>
                  </div>
                </Link>
              ))}
            </Reveal>
          </div>
        </section>
      )}


      {/* ============================================================ DARK CTA */}
      <div className="section section-dark-pre" aria-hidden="true"></div>
      <section className="section section-dark" aria-labelledby="cta-title">
        <div className="container">
          <Reveal className="section-header section-header-center">
            <span className="eyebrow">● ปรับใช้กับธุรกิจคุณ</span>
            <h2 id="cta-title">อยากให้เราช่วย setup ให้ธุรกิจคุณ?</h2>
            <p className="lead">นัดคุยฟรี 30 นาที — เราจะดู use case ที่เหมาะกับคุณและประมาณราคาให้ก่อนเซ็น</p>
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
