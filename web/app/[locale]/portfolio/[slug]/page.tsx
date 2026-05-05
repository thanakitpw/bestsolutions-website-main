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
import { pickLocale } from "@/utils/format";
import type { PortfolioResult } from "@/utils/supabase/types";
import "@/styles/pages/sample-case.css";

type Props = { params: Promise<{ locale: string; slug: string }> };

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
  return {
    title: { absolute: fullTitle },
    description,
    alternates: buildAlternates(locale, `/portfolio/${slug}`),
    openGraph: buildOg({
      locale,
      title: fullTitle,
      description,
      path: `/portfolio/${slug}`,
      ...(item.cover_image ? { image: item.cover_image } : {}),
    }),
    twitter: { card: "summary_large_image", title: fullTitle, description },
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
        <div className="container">
          <Link href="/portfolio" className="breadcrumb">
            <span aria-hidden="true">←</span><span>ผลงานทั้งหมด</span>
          </Link>
          <div className="case-hero-meta">
            <span className="case-meta-pill">{item.category}</span>
            {item.services?.map((s) => (
              <span key={s} className="case-meta-pill is-blue">{s}</span>
            ))}
            {item.year && <span className="case-meta-pill is-neutral">{item.year}</span>}
            {item.duration && <span className="case-meta-pill is-neutral">{item.duration}</span>}
          </div>
          <h1>{item.title}</h1>
          <p className="lead">{summary}</p>
        </div>
      </section>


      <section className="section section-tight">
        <div className="container">
          <div
            className="case-cover"
            role="img"
            aria-label={`ภาพผลงาน${item.title}`}
            style={item.cover_image ? { backgroundImage: `url(${item.cover_image})`, backgroundSize: "cover" } : undefined}
          ></div>

          {/* Results band */}
          {(item.results ?? []).length > 0 && (
            <Reveal className="results-band" style={{ marginBottom: "var(--space-16)" }}>
              <div className="section-header-center" style={{ marginBottom: "var(--space-10)" }}>
                <span className="eyebrow-chip">● ผลลัพธ์</span>
                <h2 style={{ marginTop: "var(--space-4)", fontSize: "var(--text-3xl)" }}>ตัวเลขจากระบบ Analytics จริง</h2>
              </div>
              <div className="results-grid">
                {(item.results ?? []).map((r: PortfolioResult, i) => (
                  <div key={i}>
                    <div className={`result-num tabular ${i === 0 ? "is-orange" : i === 2 ? "is-blue" : ""}`}>{r.value}</div>
                    <div className="result-label">{r.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          {/* Body */}
          {body ? (
            <div className="case-body">
              <ReactMarkdown rehypePlugins={[rehypeSanitize]}>{body}</ReactMarkdown>
            </div>
          ) : (
            <div className="case-body">
              <p>{summary}</p>
            </div>
          )}

          {/* Tech stack */}
          {item.tech_stack && item.tech_stack.length > 0 && (
            <div className="case-body">
              <h2>เทคโนโลยีที่ใช้</h2>
              <ul className="chip-list">
                {item.tech_stack.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>
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
                  <div
                    className="card-media"
                    role="img"
                    aria-label={`ภาพผลงาน${p.title}`}
                    style={p.cover_image ? { backgroundImage: `url(${p.cover_image})`, backgroundSize: "cover" } : { background: RELATED_GRADIENTS[i] }}
                  ></div>
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
            <Link href="/portfolio" className="btn btn-on-dark btn-lg"><span className="btn-label">ผลงานทั้งหมด</span></Link>
          </Reveal>
        </div>
      </section>

    </main>
  );
}
