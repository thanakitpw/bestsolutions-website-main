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
  const t = await getTranslations({ locale, namespace: "Terms" });
  return buildPageMetadata({
    locale,
    path: "/terms",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="main">
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: locale === "en" ? "Home" : "หน้าแรก", path: "" },
          { name: "ข้อตกลงการใช้งาน", path: "/terms" },
        ]}
      />

      <section className="page-hero" aria-labelledby="hero-title">
        <div className="page-hero-blob" aria-hidden="true"></div>
        <div className="container">
          <div className="page-hero-inner">
            <span className="eyebrow-pill"><span className="star">✦</span><span>Terms of Use</span></span>
            <h1 id="hero-title">ข้อตกลงการใช้งานเว็บไซต์</h1>
            <p className="lead">
              เงื่อนไขการใช้งาน bestsolutionscorp.com และขอบเขตความรับผิดชอบของเนื้อหาบนเว็บไซต์นี้
            </p>
          </div>
        </div>
      </section>

      <section className="section section-tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <article className="post-body" style={{ margin: "0 auto" }}>
            <p><em>อัปเดตล่าสุด 29 สิงหาคม 2569</em></p>

            <h2>1. การยอมรับเงื่อนไข</h2>
            <p>
              การเข้าใช้งานเว็บไซต์ bestsolutionscorp.com ถือว่าคุณยอมรับข้อตกลงนี้
              หากไม่ยอมรับ กรุณาหยุดใช้งานเว็บไซต์
            </p>

            <h2>2. ทรัพย์สินทางปัญญา</h2>
            <p>
              เนื้อหา บทความ ภาพ กราฟิก โลโก้ และการออกแบบบนเว็บไซต์นี้เป็นของ Best Solutions Corp
              คุณนำไปอ้างอิงได้โดยระบุแหล่งที่มาและลิงก์กลับ แต่ห้ามคัดลอกทั้งหมดไปเผยแพร่ซ้ำ
              หรือใช้ในเชิงพาณิชย์โดยไม่ได้รับอนุญาตเป็นลายลักษณ์อักษร
            </p>
            <p>
              ชื่อและโลโก้ของลูกค้าที่ปรากฏในหน้า{" "}
              <Link href="/portfolio">ผลงาน</Link>{" "}
              เป็นทรัพย์สินของเจ้าของแบรนด์นั้น ๆ แสดงไว้เพื่ออ้างอิงผลงานที่เราเคยทำร่วมกันเท่านั้น
            </p>

            <h2>3. ความถูกต้องของเนื้อหา</h2>
            <p>
              บทความและคู่มือบนเว็บไซต์เขียนจากประสบการณ์การทำงานจริงและข้อมูล ณ วันที่เผยแพร่
              เป็นข้อมูลทั่วไปเพื่อการศึกษา ไม่ใช่คำแนะนำเฉพาะเจาะจงสำหรับธุรกิจของคุณ
              แพลตฟอร์มโฆษณาและอัลกอริทึมของ Search Engine เปลี่ยนแปลงตลอดเวลา
              ควรตรวจสอบข้อมูลล่าสุดก่อนนำไปตัดสินใจ
            </p>

            <h2>4. ผลลัพธ์ของบริการ</h2>
            <p>
              ตัวเลขและผลลัพธ์ในหน้า{" "}
              <Link href="/portfolio">ผลงาน</Link>{" "}
              เป็นผลจริงของแต่ละโปรเจกต์ภายใต้เงื่อนไขเฉพาะของธุรกิจนั้น
              ไม่ใช่การรับประกันผลลัพธ์สำหรับโปรเจกต์อื่น
              ขอบเขตงาน ระยะเวลา และเงื่อนไขการรับประกันของแต่ละโปรเจกต์
              ระบุในสัญญาและใบเสนอราคาที่ตกลงกันเป็นรายกรณี
            </p>

            <h2>5. ลิงก์ไปเว็บไซต์ภายนอก</h2>
            <p>
              เว็บไซต์นี้มีลิงก์ไปยังเว็บไซต์ของบุคคลที่สาม เราไม่รับผิดชอบต่อเนื้อหา
              ความถูกต้อง หรือนโยบายความเป็นส่วนตัวของเว็บไซต์เหล่านั้น
            </p>

            <h2>6. ข้อมูลส่วนบุคคล</h2>
            <p>
              การเก็บและใช้ข้อมูลส่วนบุคคลเป็นไปตาม{" "}
              <Link href="/privacy">นโยบายความเป็นส่วนตัว</Link>
            </p>

            <h2>7. การเปลี่ยนแปลงข้อตกลง</h2>
            <p>
              เราอาจปรับปรุงข้อตกลงนี้เป็นครั้งคราว ฉบับที่มีผลคือฉบับที่แสดงบนหน้านี้
              พร้อมวันที่อัปเดตล่าสุดด้านบน
            </p>

            <h2>8. ติดต่อ</h2>
            <p>
              คำถามเกี่ยวกับข้อตกลงนี้ ติดต่อ{" "}
              <a href="mailto:info@bestsolutionscorp.com">info@bestsolutionscorp.com</a>{" "}
              หรือโทร <a href="tel:0953854906">095-385-4906</a>
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
