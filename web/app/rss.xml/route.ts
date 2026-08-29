import { getArticles } from "@/utils/supabase/queries";

export const revalidate = 3600;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.bestsolutionscorp.com";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const articles = await getArticles();

  const items = articles
    .map((a) => {
      const url = `${SITE_URL}/th/blog/${a.slug}`;
      const pubDate = a.published_at
        ? new Date(a.published_at).toUTCString()
        : new Date(a.created_at).toUTCString();
      return `    <item>
      <title>${escapeXml(a.title_th)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      ${a.category ? `<category>${escapeXml(a.category)}</category>` : ""}
      <description>${escapeXml(a.excerpt_th ?? "")}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>บทความ · Best Solutions</title>
    <link>${SITE_URL}/th/blog</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>บทความเรื่องเว็บไซต์ SEO โฆษณาออนไลน์ คอนเทนต์ และ Automation สำหรับเจ้าของธุรกิจไทย จากทีม Best Solutions</description>
    <language>th</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
