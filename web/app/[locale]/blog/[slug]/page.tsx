import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import { getArticleBySlug, getArticles, getArticleSlugs } from "@/utils/supabase/queries";
import { buildAlternates, buildOg } from "@/utils/metadata";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { MediaImage } from "@/components/media-image";
import { formatThaiDate, pickLocale } from "@/utils/format";
import { extractHeadings } from "@/utils/toc";
import { categorySlug } from "@/utils/category";
import { normalizeArticleHeadings } from "@/utils/markdown";
import { PostToc } from "@/components/post-toc";
import { TrackView } from "@/components/track-view";
import "@/styles/pages/sample-post.css";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const revalidate = 300;

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return routing.locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  const title = pickLocale(locale, article.title_th, article.title_en ?? article.title_th);
  const description = (article.seo_description ?? pickLocale(locale, article.excerpt_th, article.excerpt_en ?? article.excerpt_th ?? "")) ?? "";
  const fullTitle = article.seo_title ?? `${title} · Best Solutions`;
  const ogImage = article.og_image ?? article.cover_image;
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
      ...(ogImage ? { image: ogImage } : {}),
      article: {
        ...(article.published_at ? { publishedTime: article.published_at } : {}),
        ...(article.updated_at ? { modifiedTime: article.updated_at } : {}),
        ...(article.author_name ? { authors: [article.author_name] } : {}),
      },
    }),
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
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
  const body = normalizeArticleHeadings(
    pickLocale(locale, article.body_md_th, article.body_md_en ?? article.body_md_th) ?? "",
  );
  const headings = extractHeadings(body);
  // Topical relatedness, not "the 3 newest" — shared tags first, then category.
  // Related links are the main internal-link signal between blog clusters.
  const tags = new Set((article.tags ?? []).map((t) => t.toLowerCase()));
  const related = allArticles
    .filter((a) => a.slug !== slug)
    .map((a) => {
      const shared = (a.tags ?? []).filter((t) => tags.has(t.toLowerCase())).length;
      return { a, score: shared * 2 + (a.category === article.category ? 1 : 0) };
    })
    .sort(
      (x, y) =>
        y.score - x.score ||
        new Date(y.a.published_at ?? 0).getTime() - new Date(x.a.published_at ?? 0).getTime(),
    )
    .slice(0, 3)
    .map((r) => r.a);

  const RELATED_GRADIENTS = [
    "linear-gradient(135deg, var(--color-orange-300), var(--color-peach))",
    "linear-gradient(135deg, var(--color-blue-300), var(--color-blue-500))",
    "linear-gradient(135deg, var(--color-orange-500), var(--color-orange-700))",
  ];

  return (
    <main id="main">
      <TrackView event="blog_read" slug={slug} />
      <ArticleJsonLd article={article} locale={locale} />
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: locale === "en" ? "Home" : "หน้าแรก", path: "" },
          { name: locale === "en" ? "Blog" : "บทความ", path: "/blog" },
          ...(article.category
            ? [{ name: article.category, path: `/blog/category/${categorySlug(article.category)}` }]
            : []),
          { name: title, path: `/blog/${slug}` },
        ]}
      />

      {/* ============================================================ HEADER */}
      <header className="post-header">
        <div className="container">
          <div className="post-header-inner">
            <Link href="/blog" className="breadcrumb"><span aria-hidden="true">←</span><span>บทความทั้งหมด</span></Link>
            <Link href={`/blog/category/${categorySlug(article.category)}`} className="post-cat">
              {article.category}
            </Link>
            <h1 className="post-title">{title}</h1>
            <div className="post-meta">
              <Image className="post-author-avatar" src="/logo.webp" alt="" width={40} height={40} aria-hidden="true" />
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
          <MediaImage
            className="post-cover"
            src={article.cover_image}
            alt={`ภาพประกอบบทความ ${title}`}
            sizes="(min-width: 1280px) 1280px, 100vw"
            priority
          />

          <div className="post-layout">

            <PostToc headings={headings} />

            {/* BODY */}
            <article className="post-body">
              <ReactMarkdown rehypePlugins={[rehypeSanitize, rehypeSlug]}>
                {body}
              </ReactMarkdown>

              <div className="author-card">
                <Image className="author-card-avatar" src="/logo.webp" alt={`โลโก้ ${article.author_name}`} width={72} height={72} />
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
                  <MediaImage
                    className="card-media"
                    src={a.cover_image}
                    alt={`ภาพประกอบบทความ ${pickLocale(locale, a.title_th, a.title_en ?? a.title_th)}`}
                    gradient={RELATED_GRADIENTS[i]}
                    sizes="(min-width: 1280px) 400px, (min-width: 768px) 33vw, 100vw"
                  />
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
