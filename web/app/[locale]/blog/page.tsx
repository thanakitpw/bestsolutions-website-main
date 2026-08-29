import { Suspense } from "react";
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getArticles } from "@/utils/supabase/queries";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { BlogList } from "@/components/blog-list";
import { buildPageMetadata } from "@/utils/metadata";
import "@/styles/pages/blog.css";

export const revalidate = 60;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });
  const meta = buildPageMetadata({
    locale,
    path: "/blog",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
  return {
    ...meta,
    alternates: {
      ...meta.alternates,
      types: { "application/rss+xml": "/rss.xml" },
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const articles = await getArticles();

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
            <h1 id="hero-title">มุมมองและเทคนิคจากงานที่เราลงมือทำ</h1>
            <p className="lead">รวมบทความเรื่องเว็บไซต์ SEO โฆษณา คอนเทนต์ และ Automation จากประสบการณ์ทำงานจริง เพื่อให้เจ้าของธุรกิจนำไปปรับใช้ได้ง่ายขึ้น</p>
          </div>
        </div>
      </section>


      {/* ============================================================ LIST */}
      <section className="section section-tight" id="posts" aria-labelledby="posts-title">
        <div className="container">
          <h2 id="posts-title" style={{ position: "absolute", clip: "rect(0 0 0 0)", width: "1px", height: "1px", overflow: "hidden" }}>บทความทั้งหมด</h2>

          <Suspense fallback={null}>
            <BlogList articles={articles} locale={locale} />
          </Suspense>
        </div>
      </section>


      {/* ============================================================ DARK CTA */}
      <div className="section section-dark-pre" aria-hidden="true"></div>
      <section className="section section-dark" aria-labelledby="cta-title">
        <div className="container">
          <Reveal className="section-header section-header-center">
            <span className="eyebrow">● พร้อมเริ่ม</span>
            <h2 id="cta-title">อยากเอาแนวทางเหล่านี้ไปใช้กับธุรกิจของคุณให้ชัดขึ้นไหม?</h2>
            <p className="lead">เล่าโจทย์ของธุรกิจให้เราฟังได้ เราจะช่วยดูว่าควรเริ่มจากเว็บไซต์ SEO โฆษณา หรือ Automation เพื่อให้เหมาะกับสถานการณ์จริงของคุณ</p>
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
