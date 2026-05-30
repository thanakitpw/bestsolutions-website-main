import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import {
  getArticleSitemapEntries,
  getPortfolioSitemapEntries,
  getServiceSitemapEntries,
} from "@/utils/supabase/queries";

// Regenerate hourly. Without this Next prerenders the sitemap once at build
// (no cookies()/headers() in this route → static), so content published or
// scheduled-live after deploy never reaches Google until the next deploy.
export const revalidate = 3600;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.bestsolutionscorp.com";

const STATIC_PATHS: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "", changeFrequency: "weekly", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/portfolio", changeFrequency: "weekly", priority: 0.8 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
];

function localizedAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = `${SITE_URL}/${locale}${path}`;
  }
  languages["x-default"] = `${SITE_URL}/${routing.defaultLocale}${path}`;
  return languages;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, portfolio, services] = await Promise.all([
    getArticleSitemapEntries(),
    getPortfolioSitemapEntries(),
    getServiceSitemapEntries(),
  ]);

  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.flatMap(
    ({ path, changeFrequency, priority }) =>
      routing.locales.map((locale) => ({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: now,
        changeFrequency,
        priority,
        alternates: { languages: localizedAlternates(path) },
      })),
  );

  const articleEntries: MetadataRoute.Sitemap = articles.flatMap((a) =>
    routing.locales.map((locale) => ({
      url: `${SITE_URL}/${locale}/blog/${a.slug}`,
      lastModified: new Date(a.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: { languages: localizedAlternates(`/blog/${a.slug}`) },
    })),
  );

  const serviceEntries: MetadataRoute.Sitemap = services.flatMap((s) =>
    routing.locales.map((locale) => ({
      url: `${SITE_URL}/${locale}/services/${s.slug}`,
      lastModified: new Date(s.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: { languages: localizedAlternates(`/services/${s.slug}`) },
    })),
  );

  const portfolioEntries: MetadataRoute.Sitemap = portfolio.flatMap((p) =>
    routing.locales.map((locale) => ({
      url: `${SITE_URL}/${locale}/portfolio/${p.slug}`,
      lastModified: new Date(p.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: { languages: localizedAlternates(`/portfolio/${p.slug}`) },
    })),
  );

  return [...staticEntries, ...serviceEntries, ...articleEntries, ...portfolioEntries];
}
