import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import { getPortfolioItemBySlug, getPortfolioItems, getPortfolioSlugs } from "@/utils/supabase/queries";
import { buildAlternates, buildOg } from "@/utils/metadata";
import { PortfolioJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { MediaImage } from "@/components/media-image";
import { CaseFrame } from "@/components/case-frame";
import { TrackView } from "@/components/track-view";
import { pickLocale } from "@/utils/format";
import type { PortfolioResult } from "@/utils/supabase/types";
import "@/styles/pages/sample-case.css";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const revalidate = 300;

export async function generateStaticParams() {
  const slugs = await getPortfolioSlugs();
  return routing.locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
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

const PHONE_TEL = "0953854906";

export default async function PortfolioDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const [item, allItems] = await Promise.all([
    getPortfolioItemBySlug(slug),
    getPortfolioItems(),
  ]);

  if (!item) notFound();

  const en = locale === "en";
  const summary = pickLocale(locale, item.summary_th, item.summary_en ?? item.summary_th);
  const body = pickLocale(locale, item.body_md_th, item.body_md_en ?? item.body_md_th);
  const related = allItems.filter((p) => p.slug !== slug).slice(0, 3);
  const results = item.results ?? [];
  const services = item.services ?? [];
  const techStack = item.tech_stack ?? [];
  const screenshot = item.gallery?.[0] ?? null;

  const facts = [
    item.client ? { label: en ? "Client" : "ลูกค้า", value: item.client } : null,
    item.category ? { label: en ? "Category" : "หมวดหมู่", value: item.category } : null,
    item.year ? { label: en ? "Year" : "ปี", value: String(item.year) } : null,
    item.duration ? { label: en ? "Duration" : "ระยะเวลา", value: item.duration } : null,
  ].filter((f) => f !== null);

  return (
    <main id="main">
      <TrackView event="portfolio_view" slug={slug} />
      <PortfolioJsonLd item={item} locale={locale} />
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: en ? "Home" : "หน้าแรก", path: "" },
          { name: en ? "Portfolio" : "ผลงาน", path: "/portfolio" },
          { name: item.title, path: `/portfolio/${slug}` },
        ]}
      />

      {/* ============================================================ HERO */}
      <section className="case-hero" aria-labelledby="case-title">
        <div className="case-hero-blob" aria-hidden="true"></div>
        <div className="container">
          <Link href="/portfolio" className="breadcrumb">
            <span aria-hidden="true">←</span>
            <span>{en ? "All work" : "ผลงานทั้งหมด"}</span>
          </Link>

          <div className="case-hero-split">
            <div className="case-hero-copy">
              <div className="case-hero-meta">
                {item.category ? <span className="case-meta-pill">{item.category}</span> : null}
                {item.year ? <span className="case-meta-pill is-neutral">{item.year}</span> : null}
              </div>

              <h1 id="case-title">{item.title}</h1>
              <p className="lead">{summary}</p>

            </div>

            <div className="case-hero-visual">
              {item.cover_image ? (
                <Image
                  src={item.cover_image}
                  alt={`ภาพเว็บไซต์ ${item.title}`}
                  width={1050}
                  height={580}
                  sizes="(min-width: 1024px) 620px, 100vw"
                  priority
                />
              ) : (
                <div className="case-placeholder" role="img" aria-label="พื้นที่สำหรับภาพเว็บไซต์">
                  <span>ภาพเว็บไซต์บนอุปกรณ์</span>
                  <small>1050 × 580 px</small>
                </div>
              )}
            </div>
          </div>

          {facts.length > 0 || techStack.length > 0 ? (
            <dl className="case-facts-strip">
              {facts.map((f) => (
                <div key={f.label} className="case-fact">
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
              {techStack.length > 0 ? (
                <div className="case-fact">
                  <dt>{en ? "Tech stack" : "เทคโนโลยี"}</dt>
                  <dd className="case-fact-tags">
                    {techStack.map((t) => (
                      <span key={t} className="case-fact-tag">{t}</span>
                    ))}
                  </dd>
                </div>
              ) : null}
            </dl>
          ) : null}
        </div>
      </section>


      {/* ============================================================ RESULTS */}
      {results.length > 0 ? (
        <section className="section section-tight" aria-labelledby="results-title">
          <div className="container">
            <Reveal className="case-results-band">
              <h2 id="results-title" className="case-results-title">
                {en ? "Results" : "ผลลัพธ์ที่วัดได้"}
              </h2>
              <ul className="case-results-grid">
                {results.map((r: PortfolioResult, i) => (
                  <li key={i} className={i === 0 ? "is-orange" : i === 2 ? "is-blue" : ""}>
                    <span className="result-num tabular">{r.value}</span>
                    <span className="result-label">{r.label}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      ) : null}


      {/* ============================================================ STORY */}
      {body ? (
        <section className="section section-tight" aria-labelledby="story-title">
          <div className="container">
            <Reveal className="case-story">
              <h2 id="story-title">{en ? "Behind the project" : "เบื้องหลังโปรเจกต์"}</h2>
              <div className="case-body">
                <ReactMarkdown rehypePlugins={[rehypeSanitize]}>{body}</ReactMarkdown>
              </div>
            </Reveal>
          </div>
        </section>
      ) : null}


      {/* ============================================================ SCREENS */}
      <section className="section section-tight" aria-labelledby="screens-title">
        <div className="container">
          <Reveal className="section-header-center">
            <h2 id="screens-title" style={{ margin: 0 }}>
              {en ? "The site itself" : "หน้าตาเว็บจริง"}
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            {screenshot ? (
              <CaseFrame
                src={screenshot}
                alt={`ภาพหน้าจอเว็บไซต์ ${item.title}`}
                {...(item.live_url ? { url: item.live_url } : {})}
              />
            ) : (
              <div className="case-screens-placeholder" role="img" aria-label="พื้นที่สำหรับภาพหน้าจอเว็บไซต์">
                <span>ภาพหน้าจอเว็บไซต์เต็มหน้า</span>
                <small>1440 × 900 px ขึ้นไป</small>
              </div>
            )}
          </Reveal>
        </div>
      </section>


      {/* ============================================================ SERVICES USED */}
      {services.length > 0 ? (
        <section className="section section-tight" aria-labelledby="used-title">
          <div className="container">
            <Reveal className="case-services">
              <div>
                <h2 id="used-title">{en ? "Services used" : "บริการที่ใช้ในโปรเจกต์นี้"}</h2>
                <ul className="case-services-chips">
                  {services.map((s) => (
                    <li key={s}>
                      <Link href="/services" className="case-service-chip">{s}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <Link href="/services" className="btn btn-secondary btn-arrow">
                <span className="btn-label">{en ? "All services" : "ดูบริการทั้งหมด"}</span>
              </Link>
            </Reveal>
          </div>
        </section>
      ) : null}


      {/* ============================================================ RELATED */}
      {related.length > 0 && (
        <section className="section section-tight">
          <div className="container">
            <Reveal className="section-header-center">
              <h2 style={{ margin: 0 }}>{en ? "More work" : "ผลงานอื่นที่อาจสนใจ"}</h2>
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
          <Reveal className="case-cta-actions" delay={0.1}>
            <Link href="/contact" className="btn btn-orange btn-lg btn-arrow">
              <span className="btn-label">นัดคุยกับทีม</span>
            </Link>
            <a
              href={`tel:${PHONE_TEL}`}
              className="btn btn-on-dark btn-lg"
              aria-label="โทรหาเรา 095-385-4906"
              data-cta-location="portfolio-case"
            >
              <span className="btn-label">โทร 095-385-4906</span>
            </a>
          </Reveal>
        </div>
      </section>

    </main>
  );
}
