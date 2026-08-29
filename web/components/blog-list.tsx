"use client";

import { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/reveal";
import { MediaImage } from "@/components/media-image";
import { formatThaiDate, pickLocale } from "@/utils/format";
import type { Article } from "@/utils/supabase/types";

const CATEGORY_TONE: Record<string, string> = {
  "Digital Marketing": "is-blue",
  SEO: "is-blue",
};

const CARD_GRADIENTS = [
  "linear-gradient(135deg, var(--color-blue-300), var(--color-blue-500))",
  "linear-gradient(135deg, var(--color-orange-500), var(--color-orange-700))",
  "linear-gradient(135deg, var(--color-text), var(--color-orange-700))",
  "linear-gradient(135deg, var(--color-orange-300), var(--color-peach))",
  "linear-gradient(135deg, var(--color-blue-500), var(--color-blue-700))",
  "linear-gradient(135deg, var(--color-peach), var(--color-orange-500))",
];

const ALL = "__all__";

export function BlogList({
  articles,
  locale,
}: {
  articles: Article[];
  locale: string;
}) {
  const [active, setActive] = useState<string>(ALL);

  // `?q=` is the target the WebSite SearchAction JSON-LD advertises. Reading it
  // client-side keeps /blog statically rendered (searchParams in the RSC would
  // force it dynamic) while making the declared search endpoint real.
  const searchParams = useSearchParams();
  const [typed, setTyped] = useState<string | null>(null);
  const query = typed ?? searchParams.get("q") ?? "";

  const syncUrl = useCallback((next: string) => {
    const url = new URL(window.location.href);
    if (next.trim()) url.searchParams.set("q", next.trim());
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", url.toString());
  }, []);

  // Categories that actually exist in published articles, by first appearance.
  const categories = useMemo(() => {
    const seen: string[] = [];
    for (const a of articles) {
      if (a.category && !seen.includes(a.category)) seen.push(a.category);
    }
    return seen;
  }, [articles]);

  const filtered = useMemo(() => {
    const byCategory =
      active === ALL ? articles : articles.filter((a) => a.category === active);
    const q = query.trim().toLowerCase();
    if (!q) return byCategory;
    return byCategory.filter((a) =>
      [a.title_th, a.title_en, a.excerpt_th, a.excerpt_en, a.category, ...(a.tags ?? [])]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [articles, active, query]);

  const [featured, ...rest] = filtered;

  return (
    <>
      <form
        className="blog-search"
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          syncUrl(query);
        }}
      >
        <label className="sr-only" htmlFor="blog-search-input">
          ค้นหาบทความ
        </label>
        <input
          id="blog-search-input"
          className="blog-search-input"
          type="search"
          name="q"
          value={query}
          placeholder="ค้นหาบทความ เช่น SEO, Google Ads, ทำเว็บไซต์"
          onChange={(e) => {
            setTyped(e.target.value);
            syncUrl(e.target.value);
          }}
        />
      </form>

      <div className="filter-bar" role="tablist" aria-label="กรองตามหมวดหมู่">
        <button
          className={`filter-chip${active === ALL ? " is-active" : ""}`}
          type="button"
          role="tab"
          aria-selected={active === ALL}
          onClick={() => setActive(ALL)}
        >
          ทั้งหมด
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-chip${active === cat ? " is-active" : ""}`}
            type="button"
            role="tab"
            aria-selected={active === cat}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {featured && (
        <Reveal key={featured.slug}>
          <Link href={`/blog/${featured.slug}`} className="featured-card" aria-labelledby="featured-title">
            <MediaImage
              className="featured-media"
              src={featured.cover_image}
              alt={`ภาพประกอบบทความ ${pickLocale(locale, featured.title_th, featured.title_en ?? featured.title_th)}`}
              sizes="(min-width: 1280px) 800px, 100vw"
              priority
            />
            <div className="featured-body">
              <span className="featured-cat">แนะนำ · {featured.category}</span>
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
        </Reveal>
      )}

      <Reveal className="grid-blog" delay={0.1}>
        {rest.map((a, i) => {
          const title = pickLocale(locale, a.title_th, a.title_en ?? a.title_th);
          const excerpt = pickLocale(locale, a.excerpt_th, a.excerpt_en ?? a.excerpt_th ?? "");
          const tone = CATEGORY_TONE[a.category] ?? "";
          const bg = CARD_GRADIENTS[i % CARD_GRADIENTS.length];
          return (
            <Link key={a.slug} href={`/blog/${a.slug}`} className="card card-blog">
              <MediaImage
                className="card-media"
                src={a.cover_image}
                alt={`ภาพประกอบบทความ ${title}`}
                gradient={bg}
                sizes="(min-width: 1280px) 400px, (min-width: 768px) 33vw, 100vw"
              />
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
      </Reveal>

      {filtered.length === 0 && (
        <p className="filter-empty" role="status">
          {query.trim() ? `ไม่พบบทความที่ตรงกับ "${query.trim()}"` : "ยังไม่มีบทความในหมวดนี้"}
        </p>
      )}
    </>
  );
}
