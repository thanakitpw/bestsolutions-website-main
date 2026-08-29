import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { buildPageMetadata } from "@/utils/metadata";
import "@/styles/pages/sample-post.css";

export const revalidate = 86400;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Privacy" });
  return buildPageMetadata({
    locale,
    path: "/privacy",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="main">
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: locale === "en" ? "Home" : "หน้าแรก", path: "" },
          { name: "นโยบายความเป็นส่วนตัว", path: "/privacy" },
        ]}
      />

      <section className="page-hero" aria-labelledby="hero-title">
        <div className="page-hero-blob" aria-hidden="true"></div>
        <div className="container">
          <div className="page-hero-inner">
            <span className="eyebrow-pill"><span className="star">✦</span><span>Privacy Policy</span></span>
            <h1 id="hero-title">นโยบายความเป็นส่วนตัว</h1>
            <p className="lead">
              Best Solutions Corp เก็บและใช้ข้อมูลส่วนบุคคลเท่าที่จำเป็นต่อการให้บริการ
              และดูแลตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)
            </p>
          </div>
        </div>
      </section>

      <section className="section section-tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <article className="post-body" style={{ margin: "0 auto" }}>
            <p><em>อัปเดตล่าสุด 29 สิงหาคม 2569</em></p>

            <h2>1. ข้อมูลที่เราเก็บ</h2>
            <p>เราเก็บข้อมูลสองกลุ่ม</p>
            <ul>
              <li>
                <strong>ข้อมูลที่คุณกรอกเอง</strong> — ชื่อ อีเมล เบอร์โทร บริการที่สนใจ งบประมาณ
                และรายละเอียดโจทย์ ที่ส่งผ่านแบบฟอร์มติดต่อ เราเก็บไว้เพื่อติดต่อกลับและเสนอแนวทางเท่านั้น
              </li>
              <li>
                <strong>ข้อมูลการใช้งานเว็บไซต์</strong> — หน้าที่เข้าชม ระยะเวลา อุปกรณ์ เบราว์เซอร์
                และแหล่งที่มาของการเข้าชม เก็บผ่านคุกกี้ในรูปแบบสถิติรวม ไม่ระบุตัวตนรายบุคคล
              </li>
            </ul>

            <h2>2. เครื่องมือของบุคคลที่สามที่เราใช้</h2>
            <ul>
              <li><strong>Google Analytics 4 และ Google Tag Manager</strong> — วัดพฤติกรรมการใช้งานเว็บไซต์เชิงสถิติ</li>
              <li><strong>Meta Pixel</strong> — วัดผลโฆษณาบน Facebook และ Instagram</li>
              <li><strong>Supabase</strong> — ฐานข้อมูลที่เก็บข้อมูลจากแบบฟอร์มติดต่อ</li>
              <li><strong>Vercel</strong> — ผู้ให้บริการโฮสติ้งเว็บไซต์</li>
            </ul>
            <p>
              คุณสามารถปิดคุกกี้ได้จากการตั้งค่าเบราว์เซอร์ หรือติดตั้ง
              {" "}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
                Google Analytics Opt-out Browser Add-on
              </a>
              {" "}
              การปิดคุกกี้ไม่กระทบการใช้งานเว็บไซต์ส่วนอื่น
            </p>

            <h2>3. เราใช้ข้อมูลทำอะไร</h2>
            <ul>
              <li>ติดต่อกลับเพื่อตอบคำถามและเสนอแนวทางการทำงาน</li>
              <li>ปรับปรุงเนื้อหาและประสบการณ์การใช้งานเว็บไซต์</li>
              <li>วัดผลแคมเปญการตลาดของเราเอง</li>
            </ul>
            <p>เราไม่ขาย ไม่ให้เช่า และไม่แลกเปลี่ยนข้อมูลส่วนบุคคลของคุณกับบุคคลที่สามเพื่อการตลาด</p>

            <h2>4. ระยะเวลาเก็บข้อมูล</h2>
            <p>
              ข้อมูลจากแบบฟอร์มติดต่อเก็บไว้ไม่เกิน 2 ปีนับจากการติดต่อครั้งล่าสุด
              ยกเว้นกรณีที่กลายเป็นลูกค้าและต้องเก็บตามข้อกำหนดทางบัญชีและภาษี
              ข้อมูลสถิติการใช้งานเว็บไซต์เก็บตามค่ามาตรฐานของ Google Analytics
            </p>

            <h2>5. สิทธิของเจ้าของข้อมูล</h2>
            <p>ตาม PDPA คุณมีสิทธิขอเข้าถึง ขอสำเนา ขอแก้ไข ขอลบ ขอให้ระงับการใช้ คัดค้านการประมวลผล และถอนความยินยอมได้ทุกเมื่อ</p>

            <h2>6. ติดต่อเรา</h2>
            <p>
              เรื่องข้อมูลส่วนบุคคล ติดต่อ{" "}
              <a href="mailto:info@bestsolutionscorp.com">info@bestsolutionscorp.com</a>{" "}
              หรือโทร <a href="tel:0953854906">095-385-4906</a>{" "}
              เราตอบกลับภายใน 30 วันนับจากได้รับคำขอ
            </p>
            <p>
              บริษัท Best Solutions Corp · กรุงเทพมหานคร ประเทศไทย ·{" "}
              <Link href="/contact">แบบฟอร์มติดต่อ</Link>
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
