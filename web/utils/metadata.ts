import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.bestsolutionscorp.com";
const SITE_NAME = "Best Solutions";

export function buildAlternates(locale: string, path: string): Metadata["alternates"] {
  const canonical = `/${locale}${path}`;
  return {
    canonical,
    languages: {
      th: `/th${path}`,
      en: `/en${path}`,
    },
  };
}

export function buildOg(opts: {
  locale: string;
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
}): Metadata["openGraph"] {
  const { locale, title, description, path, type = "website", image } = opts;
  const url = `${SITE_URL}/${locale}${path}`;
  return {
    type,
    locale: locale === "th" ? "th_TH" : "en_US",
    siteName: SITE_NAME,
    url,
    title,
    description,
    ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: title }] } : {}),
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
    },
  };
}
