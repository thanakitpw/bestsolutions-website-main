import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.bestsolutionscorp.com";
const SITE_NAME = "Best Solutions";

/**
 * Brand default OG image. The dynamic `app/[locale]/opengraph-image.tsx` only
 * covers the locale-root segment — nested routes (services/blog/portfolio/…)
 * inherit nothing, so pages without their own cover fall back to this.
 */
function defaultOgImage(locale: string): string {
  return `${SITE_URL}/${locale}/opengraph-image`;
}

export function buildAlternates(locale: string, path: string): Metadata["alternates"] {
  const canonical = `/${locale}${path}`;
  // Only `th` is published. Declaring `en` here pointed hreflang at /en/* which
  // 307-redirects back to /th (see next.config redirects) — an invalid target
  // Google ignores. Add `en` back here (and in routing.ts) when EN ships.
  return {
    canonical,
    languages: {
      th: `/th${path}`,
      "x-default": `/th${path}`,
    },
  };
}

type ArticleMeta = {
  publishedTime?: string | undefined;
  modifiedTime?: string | undefined;
  authors?: string[] | undefined;
};

export function buildOg(opts: {
  locale: string;
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
  article?: ArticleMeta;
}): Metadata["openGraph"] {
  const { locale, title, description, path, type = "website", image, article } = opts;
  const url = `${SITE_URL}/${locale}${path}`;
  const ogImage = image ?? defaultOgImage(locale);
  return {
    type,
    locale: locale === "th" ? "th_TH" : "en_US",
    siteName: SITE_NAME,
    url,
    title,
    description,
    images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    ...(type === "article" && article
      ? {
          ...(article.publishedTime ? { publishedTime: article.publishedTime } : {}),
          ...(article.modifiedTime ? { modifiedTime: article.modifiedTime } : {}),
          ...(article.authors && article.authors.length > 0
            ? { authors: article.authors }
            : {}),
        }
      : {}),
  };
}

export function buildPageMetadata(opts: {
  locale: string;
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
  image?: string;
}): Metadata {
  const { locale, path, title, description } = opts;
  return {
    title,
    description,
    alternates: buildAlternates(locale, path),
    openGraph: buildOg({
      locale,
      title,
      description,
      path,
      ...(opts.type !== undefined ? { type: opts.type } : {}),
      ...(opts.image !== undefined ? { image: opts.image } : {}),
    }),
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [opts.image ?? defaultOgImage(locale)],
    },
  };
}
