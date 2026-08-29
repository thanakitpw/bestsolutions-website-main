import {
  getArticles,
  getPortfolioItems,
  getServices,
} from "@/utils/supabase/queries";
import { pickLocale } from "@/utils/format";

export const revalidate = 3600;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.bestsolutionscorp.com";

/**
 * llms.txt — a plain-text map of the site for LLM crawlers and AI answer
 * engines, which increasingly cite from it instead of parsing rendered HTML.
 * Same content set as sitemap.xml, but with one-line summaries so a model can
 * pick the right page without fetching all of them.
 */
export async function GET() {
  const [services, articles, portfolio] = await Promise.all([
    getServices(),
    getArticles(),
    getPortfolioItems(),
  ]);

  const line = (title: string, path: string, summary?: string | null) =>
    `- [${title}](${SITE_URL}${path})${summary ? `: ${summary.replace(/\s+/g, " ").trim()}` : ""}`;

  const body = `# Best Solutions Corp

> เอเจนซีดิจิทัลมาร์เก็ตติ้งในกรุงเทพฯ ดูแลธุรกิจไทยครบวงจร — รับทำเว็บไซต์ รับทำ SEO รับทำ Google Ads และโฆษณา Facebook รับดูแลเพจโซเชียลมีเดีย และวางระบบ Automation & AI

ติดต่อ: 095-385-4906 · info@bestsolutionscorp.com · LINE @bestsolutions
พื้นที่ให้บริการ: ทั่วประเทศไทย (สำนักงานกรุงเทพมหานคร)
ภาษาเนื้อหา: ไทย

## หน้าหลัก

${line("หน้าแรก", "/th", "ภาพรวมบริการ ผลงาน และวิธีการทำงานของ Best Solutions")}
${line("เกี่ยวกับเรา", "/th/about", "ที่มาของทีม หลักการทำงาน และประสบการณ์")}
${line("บริการทั้งหมด", "/th/services", "บริการดิจิทัลครบวงจรสำหรับธุรกิจไทย")}
${line("ผลงาน", "/th/portfolio", "เคสเว็บไซต์และงานการตลาดที่ทำให้ลูกค้าจริง")}
${line("บทความ", "/th/blog", "คู่มือและบทความเรื่องเว็บไซต์ SEO โฆษณา และ Automation")}
${line("ติดต่อ", "/th/contact", "ฟอร์มติดต่อ เบอร์โทร LINE และเวลาทำการ")}

## บริการ

${services.map((s) => line(pickLocale("th", s.name_th, s.name_en ?? s.name_th), `/th/services/${s.slug}`, s.summary_th)).join("\n")}

## ผลงาน

${portfolio.map((p) => line(p.title, `/th/portfolio/${p.slug}`, p.summary_th)).join("\n")}

## บทความ

${articles.map((a) => line(a.title_th, `/th/blog/${a.slug}`, a.excerpt_th)).join("\n")}

## นโยบาย

${line("นโยบายความเป็นส่วนตัว", "/th/privacy")}
${line("ข้อตกลงการใช้งาน", "/th/terms")}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
