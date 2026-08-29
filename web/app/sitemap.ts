import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { categorySlug } from "@/utils/category";
import {
  getArticles,
  getArticleSitemapEntries,
  getPortfolioSitemapEntries,
  getServiceSitemapEntries,
  type SitemapEntry,
} from "@/utils/supabase/queries";

// Regenerate hourly. Without this Next prerenders the sitemap once at build
// (no cookies()/headers() in this route → static), so content published or
// scheduled-live after deploy never reaches Google until the next deploy.
export const revalidate = 3600;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.bestsolutionscorp.com";

type StaticPath = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
  /** Which collection's newest `updated_at` stands in for this page's lastmod. */
  freshness?: "all" | "services" | "portfolio" | "articles";
};

const STATIC_PATHS: StaticPath[] = [
  { path: "", changeFrequency: "weekly", priority: 1.0, freshness: "all" },
  { path: "/services", changeFrequency: "monthly", priority: 0.9, freshness: "services" },
  { path: "/portfolio", changeFrequency: "weekly", priority: 0.8, freshness: "portfolio" },
  { path: "/blog", changeFrequency: "weekly", priority: 0.8, freshness: "articles" },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.2 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.2 },
];

function localizedAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = `${SITE_URL}/${locale}${path}`;
  }
  languages["x-default"] = `${SITE_URL}/${routing.defaultLocale}${path}`;
  return languages;
}

function newest(entries: SitemapEntry[]): Date | undefined {
  const stamps = entries
    .map((e) => new Date(e.updated_at).getTime())
    .filter((n) => Number.isFinite(n));
  return stamps.length > 0 ? new Date(Math.max(...stamps)) : undefined;
}

function collectionEntries(
  entries: SitemapEntry[],
  segment: string,
  priority: number,
): MetadataRoute.Sitemap {
  return entries.flatMap((e) =>
    routing.locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${segment}/${e.slug}`,
      lastModified: new Date(e.updated_at),
      changeFrequency: "monthly" as const,
      priority,
      alternates: { languages: localizedAlternates(`${segment}/${e.slug}`) },
      ...(e.image ? { images: [e.image] } : {}),
    })),
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, portfolio, services, published] = await Promise.all([
    getArticleSitemapEntries(),
    getPortfolioSitemapEntries(),
    getServiceSitemapEntries(),
    getArticles(),
  ]);

  const categoryHubs = [...new Set(published.map((a) => a.category).filter(Boolean))];

  // Real content dates, not `new Date()` — a lastmod that moves on every fetch
  // is a false freshness signal and Google discounts the whole file for it.
  const lastModBy: Record<string, Date | undefined> = {
    all: newest([...articles, ...portfolio, ...services]),
    services: newest(services),
    portfolio: newest(portfolio),
    articles: newest(articles),
  };

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.flatMap(
    ({ path, changeFrequency, priority, freshness }) => {
      const lastModified = freshness ? lastModBy[freshness] : undefined;
      return routing.locales.map((locale) => ({
        url: `${SITE_URL}/${locale}${path}`,
        changeFrequency,
        priority,
        alternates: { languages: localizedAlternates(path) },
        ...(lastModified ? { lastModified } : {}),
      }));
    },
  );

  const categoryEntries: MetadataRoute.Sitemap = categoryHubs.flatMap((c) =>
    routing.locales.map((locale) => ({
      url: `${SITE_URL}/${locale}/blog/category/${categorySlug(c)}`,
      changeFrequency: "weekly" as const,
      priority: 0.5,
      alternates: { languages: localizedAlternates(`/blog/category/${categorySlug(c)}`) },
      ...(lastModBy.articles ? { lastModified: lastModBy.articles } : {}),
    })),
  );

  return [
    ...staticEntries,
    ...categoryEntries,
    ...collectionEntries(services, "/services", 0.8),
    ...collectionEntries(articles, "/blog", 0.6),
    ...collectionEntries(portfolio, "/portfolio", 0.6),
  ];
}
