import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale, getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { lineSeedSansThai } from "@/lib/fonts";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LenisProvider } from "@/components/lenis-provider";
import "../globals.css";

export const viewport: Viewport = {
  themeColor: "#F5F3EE",
  width: "device-width",
  initialScale: 1,
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Home" });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.bestsolutionscorp.com";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t("metaTitle"),
      template: "%s · Best Solutions",
    },
    description: t("metaDescription"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        th: "/th",
        en: "/en",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "th" ? "th_TH" : "en_US",
      siteName: "Best Solutions",
      url: `/${locale}`,
      title: t("metaTitle"),
      description: t("metaDescription"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("metaTitle"),
      description: t("metaDescription"),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "Common" });

  return (
    <html lang={locale} className={lineSeedSansThai.variable}>
      <body>
        <a href="#main" className="skip-link">{t("skipToMain")}</a>

        <NextIntlClientProvider messages={messages} locale={locale}>
          <LenisProvider>
            <Navbar />
            {children}
            <Footer />
          </LenisProvider>
        </NextIntlClientProvider>

        <Script src="/scripts/motion.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
