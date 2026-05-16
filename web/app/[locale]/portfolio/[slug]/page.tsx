import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import { getPortfolioItemBySlug, getPortfolioItems, getPortfolioSlugs } from "@/utils/supabase/queries";
import { buildAlternates, buildOg } from "@/utils/metadata";
import { PortfolioJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { MediaImage } from "@/components/media-image";
import { CaseFrame } from "@/components/case-frame";
import { pickLocale } from "@/utils/format";
import type { PortfolioResult } from "@/utils/supabase/types";
import "@/styles/pages/sample-case.css";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const revalidate = 300;

export async function generateStaticParams() {
  const slugs = await getPortfolioSlugs();
  return slugs.flatMap((slug) => [
    { locale: "th", slug },
    { locale: "en", slug },
  ]);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = await getPortfolioItemBySlug(slug);
  if (!item) return {};
  const description = item.seo_description ?? pickLocale(locale, item.summary_th, item.summary_en ?? item.summary_th);
  const fullTitle = item.seo_title ?? `${item.title} · Case Study · Best Solutions`;
  const ogImage = item.og_image ?? item.cover_image;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: buildAlternates(locale, `/portfolio/${slug}`),
    openGraph: buildOg({
      locale,
      title: fullTitle,
      description,
      path: `/portfolio/${slug}`,
      ...(ogImage ? { image: ogImage } : {}),
    }),
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

const RELATED_GRADIENTS = [
  "linear-gradient(135deg, var(--color-blue-500), var(--color-blue-700))",
  "linear-gradient(135deg, var(--color-blue-700), var(--color-text))",
  "linear-gradient(135deg, var(--color-blue-300), var(--color-blue-500))",
];

export default async function PortfolioDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const [item, allItems] = await Promise.all([
    getPortfolioItemBySlug(slug),
    getPortfolioItems(),
  ]);

  if (!item) notFound();

  const summary = pickLocale(locale, item.summary_th, item.summary_en ?? item.summary_th);
  const body = pickLocale(locale, item.body_md_th, item.body_md_en ?? item.body_md_th);
  const related = allItems.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <main id="main">
      <PortfolioJsonLd item={item} locale={locale} />
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: locale === "en" ? "Home" : "หน้าแรก", path: "" },
          { name: locale === "en" ? "Portfolio" : "ผลงาน", path: "/portfolio" },
          { name: item.title, path: `/portfolio/${slug}` },
        ]}
      />

      {/* ============================================================ HERO */}
      <section className="case-hero">
        <div className="case-hero-blob" aria-hidden="true"></div>
        <div className="container">
          <Link href="/portfolio" className="breadcrumb">
            <span aria-hidden="true">←</span><span>ผลงานทั้งหมด</span>
          </Link>
          <div className="case-hero-meta">
            {item.services?.map((s) => (
              <span key={s} className="case-meta-pill is-blue">{s}</span>
            ))}
          </div>
          <h1>{item.title}</h1>
          <p className="lead">{summary}</p>

          <div className="case-hero-grid">
            <div className="case-hero-main">
              {body ? (
                <div className="case-body case-body-hero">
                  <ReactMarkdown rehypePlugins={[rehypeSanitize]}>{body}</ReactMarkdown>
                </div>
              ) : null}

              {item.live_url && (
                <div className="case-hero-actions">
                  <a
                    href={item.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-arrow"
                  >
                    <span className="btn-label">{locale === "en" ? "Visit live site" : "เข้าชมเว็บจริง"}</span>
                  </a>
                </div>
              )}
            </div>

            {(item.results ?? []).length > 0 && (
              <aside className="case-hero-results" aria-label="ผลลัพธ์ของโปรเจค">
                <h3 className="case-hero-results-heading">ผลลัพธ์</h3>
                <ul className="case-results-list">
                  {(item.results ?? []).map((r: PortfolioResult, i) => {
                    const tone = i === 0 ? "is-orange" : i === 2 ? "is-blue" : "";
                    return (
                      <li key={i} className={tone}>
                        <div className="result-label">{r.label}</div>
                        <div className={`result-num tabular ${tone}`}>{r.value}</div>
                      </li>
                    );
                  })}
                </ul>
              </aside>
            )}
          </div>
        </div>
      </section>


      <section className="section section-tight">
        <div className="container">
          {item.cover_image ? (
            <CaseFrame
              src={item.cover_image}
              alt={`ภาพผลงาน ${item.title}`}
              {...(item.live_url ? { url: item.live_url } : {})}
            />
          ) : (
            <MediaImage
              className="case-cover"
              src={item.cover_image}
              alt={`ภาพผลงาน ${item.title}`}
              sizes="(min-width: 1280px) 1280px, 100vw"
              priority
            />
          )}
        </div>
      </section>


      {/* ============================================================ RELATED */}
      {related.length > 0 && (
        <section className="section section-tight">
          <div className="container">
            <Reveal className="section-header-center">
              <span className="eyebrow-chip is-blue">● เคสที่คล้ายกัน</span>
              <h2 style={{ marginTop: "var(--space-4)" }}>ผลงานอื่นที่อาจสนใจ</h2>
            </Reveal>
            <Reveal className="grid-3" delay={0.1}>
              {related.map((p, i) => (
                <Link key={p.slug} href={`/portfolio/${p.slug}`} className="card card-portfolio">
                  <MediaImage
                    className="card-media"
                    src={p.cover_image}
                    alt={`ภาพผลงาน ${p.title}`}
                    gradient={RELATED_GRADIENTS[i]}
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
      )}


      {/* ============================================================ DARK CTA */}
      <div className="section section-dark-pre" aria-hidden="true"></div>
      <section className="section section-dark" aria-labelledby="cta-title">
        <div className="container">
          <Reveal className="section-header section-header-center">
            <span className="eyebrow">● พร้อมเริ่ม</span>
            <h2 id="cta-title">อยากให้เคสของคุณ เป็นเคสต่อไปที่เราภูมิใจ</h2>
            <p className="lead">นัดคุยฟรี 30 นาที — เล่าโจทย์ให้ฟัง เราจะเสนอแนวทางที่ปรับใช้กับธุรกิจคุณได้</p>
          </Reveal>
          <Reveal style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)", justifyContent: "center", marginTop: "var(--space-10)" }} delay={0.1}>
            <Link href="/contact" className="btn btn-orange btn-lg btn-arrow"><span className="btn-label">นัดคุยกับทีม</span></Link>
            <Link href="/services" className="btn btn-on-dark btn-lg"><span className="btn-label">ดูบริการทั้งหมด</span></Link>
            <Link href="/portfolio" className="btn btn-on-dark btn-lg"><span className="btn-label">ผลงานทั้งหมด</span></Link>
          </Reveal>
        </div>
      </section>

    </main>
  );
}
