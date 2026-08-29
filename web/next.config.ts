import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import createBundleAnalyzer from "@next/bundle-analyzer";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const supabaseHost = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "")
  .replace(/^https?:\/\//, "")
  .replace(/\/.*$/, "");

// Legacy WordPress URLs that Google had indexed before the Next.js relaunch.
// Without these the next-intl proxy prepends `/th` to every old path, producing
// /th/our-services/... → 404 (GSC "Not found (404)" on 33 pages, May 2026).
// Content was rewritten 1:1 where possible, otherwise mapped to the closest
// existing service/blog hub — never the homepage (avoids soft-404 signals).
const legacyRedirects = [
  // Core pages + old service tree
  { source: "/about-us", destination: "/th/about" },
  { source: "/our-services", destination: "/th/services" },
  { source: "/our-services/website-development", destination: "/th/services/web-design" },
  { source: "/our-services/facebook-ads", destination: "/th/services/paid-ads" },
  { source: "/our-services/google-ads", destination: "/th/services/paid-ads" },
  { source: "/our-services/seo", destination: "/th/services/seo" },
  { source: "/our-services/facebook-page-instagram", destination: "/th/services/social-media" },
  { source: "/blog/2", destination: "/th/blog" },

  // Old blog posts with a real topical equivalent on the new site.
  // Thai slugs must be percent-encoded — Next matches `source` against the
  // encoded request path, not the decoded form.
  // /blog/website/wordpress-คืออะไร-ทำไมหลายบริษั
  { source: "/blog/website/wordpress-%E0%B8%84%E0%B8%B7%E0%B8%AD%E0%B8%AD%E0%B8%B0%E0%B9%84%E0%B8%A3-%E0%B8%97%E0%B8%B3%E0%B9%84%E0%B8%A1%E0%B8%AB%E0%B8%A5%E0%B8%B2%E0%B8%A2%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1", destination: "/th/blog/fast-wordpress-website-seo" },
  // /blog/website/วิธีเลือกโดเมนเนม-หรือช
  { source: "/blog/website/%E0%B8%A7%E0%B8%B4%E0%B8%98%E0%B8%B5%E0%B9%80%E0%B8%A5%E0%B8%B7%E0%B8%AD%E0%B8%81%E0%B9%82%E0%B8%94%E0%B9%80%E0%B8%A1%E0%B8%99%E0%B9%80%E0%B8%99%E0%B8%A1-%E0%B8%AB%E0%B8%A3%E0%B8%B7%E0%B8%AD%E0%B8%8A", destination: "/th/blog/fast-wordpress-website-seo" },
  { source: "/blog/seo/robotstxt-is-an-important-for-seo", destination: "/th/blog/what-is-seo-for-sme" },

  // Old "blog/service/*" entries were really service pages → closest service.
  // The production/video service was retired (Aug 2026); its former targets now
  // point at social-media for content work, else the services hub.
  { source: "/blog/service/online-advertising", destination: "/th/services/paid-ads" },
  { source: "/blog/service/kol-influencer", destination: "/th/services/social-media" },
  { source: "/blog/service/social-media-admin", destination: "/th/services/social-media" },
  { source: "/blog/service/motion-graphic", destination: "/th/services/social-media" },
  { source: "/blog/service/graphic-design", destination: "/th/services/social-media" },
  { source: "/blog/service/online-content", destination: "/th/services/social-media" },
  { source: "/blog/service/live-session", destination: "/th/services" },
  { source: "/blog/service/event-capture", destination: "/th/services" },

  // Retired service page — was live on the Next.js site, so keep it out of 404s.
  { source: "/th/services/production", destination: "/th/services" },
  { source: "/services/production", destination: "/th/services" },

  // Old marketing posts → closest service when topical, else blog hub
  { source: "/blog/marketing/get-to-know-quality-score", destination: "/th/services/paid-ads" },
  { source: "/blog/marketing/instagram-marketing-tool", destination: "/th/services/social-media" },
  { source: "/blog/marketing/google-trends", destination: "/th/blog" },
  { source: "/blog/marketing/10-key-for-email-marketing", destination: "/th/blog" },
].map((r) => ({ ...r, permanent: true }));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      ...legacyRedirects,
      // `/` → `/th` permanently. next-intl's proxy already does this, but as a
      // 307, so Google keeps the two as separate URLs. `redirects` runs at step
      // 2 of the routing chain, before Proxy at step 3, so this wins.
      // Safe to make permanent: localePrefix is "always" and localeDetection is
      // false, so `/` can never resolve to anything but the default locale.
      { source: "/", destination: "/th", permanent: true },
      // EN locale isn't published yet — keep crawled /en* out of 404s.
      { source: "/en", destination: "/th", permanent: false },
      { source: "/en/:path*", destination: "/th/:path*", permanent: false },
    ];
  },
  images: {
    remotePatterns: [
      ...(supabaseHost
        ? [
            {
              protocol: "https" as const,
              hostname: supabaseHost,
              pathname: "/storage/v1/object/public/**",
            },
          ]
        : []),
      {
        protocol: "https" as const,
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(withNextIntl(nextConfig));
