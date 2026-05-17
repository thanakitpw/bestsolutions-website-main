import type { Article, PortfolioItem, Service } from "@/utils/supabase/types";
import { pickLocale } from "@/utils/format";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.bestsolutionscorp.com";
const ORG_ID = `${SITE_URL}/#organization`;
const BUSINESS_ID = `${SITE_URL}/#localbusiness`;

type Json = Record<string, unknown>;

function escape(payload: Json): string {
  return JSON.stringify(payload).replace(/</g, "\\u003c");
}

function JsonLd({ data, id }: { data: Json; id?: string }) {
  return (
    <script
      type="application/ld+json"
      {...(id ? { id } : {})}
      dangerouslySetInnerHTML={{ __html: escape(data) }}
    />
  );
}

export type ContactInfo = {
  phone?: string | undefined;
  email?: string | undefined;
  line?: string | undefined;
  facebook?: string | undefined;
  hours?: string | undefined;
};

function sameAs(contact: ContactInfo | undefined): string[] {
  if (!contact) return [];
  const links: string[] = [];
  if (contact.facebook) {
    links.push("https://www.facebook.com/bestsolutionsagency");
  }
  if (contact.line) {
    links.push("https://lin.ee/xB314y9");
  }
  return links;
}

function telephoneE164(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("0") && digits.length === 10) return `+66${digits.slice(1)}`;
  if (digits.startsWith("66")) return `+${digits}`;
  return raw;
}

export function WebSiteJsonLd({ locale }: { locale: string }) {
  const data: Json = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/${locale}`,
    name: "Best Solutions",
    inLanguage: locale === "en" ? "en" : "th",
    publisher: { "@id": ORG_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/${locale}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
  return <JsonLd data={data} id="website-jsonld" />;
}

export type FaqEntry = { q: string; a: string };

export function FaqJsonLd({ items }: { items: FaqEntry[] }) {
  if (items.length === 0) return null;
  const data: Json = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
  return <JsonLd data={data} />;
}

export function OrganizationJsonLd({ contact, locale }: { contact?: ContactInfo; locale: string }) {
  const data: Json = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Best Solutions",
    alternateName: "Best Solutions Corp",
    url: `${SITE_URL}/${locale}`,
    logo: `${SITE_URL}/logo.webp`,
    description:
      locale === "en"
        ? "Bangkok-based digital marketing agency. Web design, ads, SEO, social, AI automation."
        : "เอเจนซีดิจิทัลมาร์เก็ตติ้งกรุงเทพฯ — ออกแบบเว็บ ทำโฆษณา SEO ดูแลโซเชียล AI Automation",
    sameAs: sameAs(contact),
  };
  const tel = telephoneE164(contact?.phone);
  const contactPoints: Json[] = [];
  if (tel || contact?.email) {
    contactPoints.push({
      "@type": "ContactPoint",
      contactType: "customer service",
      ...(tel ? { telephone: tel } : {}),
      ...(contact?.email ? { email: contact.email } : {}),
      areaServed: "TH",
      availableLanguage: ["th", "en"],
    });
  }
  if (contactPoints.length > 0) data.contactPoint = contactPoints;
  return <JsonLd data={data} id="organization-jsonld" />;
}

export function LocalBusinessJsonLd({ contact, locale }: { contact?: ContactInfo; locale: string }) {
  const tel = telephoneE164(contact?.phone);
  const data: Json = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": BUSINESS_ID,
    name: "Best Solutions",
    url: `${SITE_URL}/${locale}`,
    image: `${SITE_URL}/images/og/default.png`,
    priceRange: "฿฿",
    address: {
      "@type": "PostalAddress",
      addressLocality: locale === "en" ? "Bangkok" : "กรุงเทพมหานคร",
      addressCountry: "TH",
    },
    areaServed: { "@type": "Country", name: "Thailand" },
    sameAs: sameAs(contact),
    ...(tel ? { telephone: tel } : {}),
    ...(contact?.email ? { email: contact.email } : {}),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
  };
  return <JsonLd data={data} id="localbusiness-jsonld" />;
}

export function ServiceJsonLd({ service, locale }: { service: Service; locale: string }) {
  const name = pickLocale(locale, service.name_th, service.name_en ?? service.name_th);
  const description = pickLocale(
    locale,
    service.summary_th,
    service.summary_en ?? service.summary_th,
  );
  const data: Json = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/${locale}/services/${service.slug}#service`,
    name,
    description,
    serviceType: name,
    url: `${SITE_URL}/${locale}/services/${service.slug}`,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Thailand" },
  };
  return <JsonLd data={data} />;
}

export function ServiceListJsonLd({ services, locale }: { services: Service[]; locale: string }) {
  const data: Json = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: locale === "en" ? "Best Solutions Services" : "บริการของ Best Solutions",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: pickLocale(locale, s.name_th, s.name_en ?? s.name_th),
      url: `${SITE_URL}/${locale}/services/${s.slug}`,
    })),
  };
  return <JsonLd data={data} />;
}

export function ArticleJsonLd({ article, locale }: { article: Article; locale: string }) {
  const headline = pickLocale(locale, article.title_th, article.title_en ?? article.title_th);
  const description =
    article.seo_description ??
    pickLocale(locale, article.excerpt_th ?? "", article.excerpt_en ?? article.excerpt_th ?? "");
  const url = `${SITE_URL}/${locale}/blog/${article.slug}`;
  const data: Json = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline,
    description,
    url,
    inLanguage: locale === "en" ? "en" : "th",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    publisher: { "@id": ORG_ID },
    ...(article.cover_image ? { image: [article.cover_image] } : {}),
    ...(article.published_at ? { datePublished: article.published_at } : {}),
    ...(article.updated_at ? { dateModified: article.updated_at } : {}),
    ...(article.author_name
      ? { author: { "@type": "Person", name: article.author_name } }
      : { author: { "@id": ORG_ID } }),
  };
  return <JsonLd data={data} />;
}

export function PortfolioJsonLd({ item, locale }: { item: PortfolioItem; locale: string }) {
  const description = pickLocale(locale, item.summary_th, item.summary_en ?? item.summary_th);
  const url = `${SITE_URL}/${locale}/portfolio/${item.slug}`;
  const data: Json = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${url}#work`,
    name: item.title,
    description,
    url,
    inLanguage: locale === "en" ? "en" : "th",
    creator: { "@id": ORG_ID },
    ...(item.client ? { sourceOrganization: { "@type": "Organization", name: item.client } } : {}),
    ...(item.cover_image ? { image: [item.cover_image] } : {}),
    ...(item.year ? { dateCreated: String(item.year) } : {}),
    ...(item.category ? { genre: item.category } : {}),
  };
  return <JsonLd data={data} />;
}

export type BreadcrumbItem = { name: string; path: string };

export function BreadcrumbJsonLd({
  items,
  locale,
}: {
  items: BreadcrumbItem[];
  locale: string;
}) {
  const data: Json = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}/${locale}${it.path}`,
    })),
  };
  return <JsonLd data={data} />;
}
