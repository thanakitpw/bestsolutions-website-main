import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getServiceBySlug } from "@/utils/supabase/queries";
import { ServiceJsonLd, BreadcrumbJsonLd, FaqJsonLd } from "@/components/json-ld";
import { ServiceIcon } from "@/components/service-icon";
import { TrackView } from "@/components/track-view";
import { Reveal } from "@/components/reveal";
import { ProcessCarousel, type ProcessStep } from "@/components/process-carousel";
import { ServicesFAQ, type FAQItem } from "@/components/services-faq";
import { MediaImage } from "@/components/media-image";
import { pickLocale } from "@/utils/format";
import { buildPageMetadata } from "@/utils/metadata";
import "@/styles/pages/service-single.css";
import "@/styles/pages/services.css";

export const revalidate = 3600;

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  // Title goes through the root layout template ("%s · Best Solutions"),
  // so the brand must NOT be repeated here.
  const title = service.seo_title ?? pickLocale(locale, service.name_th, service.name_en ?? service.name_th);
  const description = service.seo_description ?? pickLocale(locale, service.summary_th, service.summary_en ?? service.summary_th);
  return buildPageMetadata({
    locale,
    path: `/services/${slug}`,
    title,
    description,
  });
}

const ICON_SVG = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z" /></svg>
);

const PROCESS_STEPS_BY_SLUG: Record<string, ProcessStep[]> = {
  seo: [
    { num: "01", total: "04", duration: "1-2 WEEKS", title: "Audit และวางแผน keyword", description: "ตรวจโครงสร้างเว็บไซต์ วิเคราะห์ keyword ภาษาไทย และจัดลำดับหัวข้อที่ควรทำก่อน", icon: ICON_SVG },
    { num: "02", total: "04", duration: "ONGOING", title: "ปรับ On-page และ Technical SEO", description: "แก้ meta, internal link, Schema, ความเร็ว และประเด็น technical ที่กระทบการค้นหา", icon: ICON_SVG },
    { num: "03", total: "04", duration: "MONTHLY", title: "ทำคอนเทนต์และเพิ่มความน่าเชื่อถือ", description: "วางและเขียนคอนเทนต์ตามเจตนาค้นหา พร้อมดูแลสัญญาณความน่าเชื่อถือที่เหมาะกับธุรกิจ", icon: ICON_SVG },
    { num: "04", total: "04", duration: "MONTHLY", title: "รายงานผลและปรับแผน", description: "สรุป ranking, traffic และ conversion เพื่อปรับแผน SEO ในรอบถัดไป", icon: ICON_SVG },
  ],
  "paid-ads": [
    { num: "01", total: "04", duration: "1 WEEK", title: "วาง funnel และกลุ่มเป้าหมาย", description: "ทำความเข้าใจเป้าหมายธุรกิจ วาง funnel กลุ่มเป้าหมาย และระบบ tracking ก่อนเริ่มแคมเปญ", icon: ICON_SVG },
    { num: "02", total: "04", duration: "1 WEEK", title: "เตรียมครีเอทีฟและเริ่มแคมเปญ", description: "เตรียมชุดข้อความและภาพสำหรับทดสอบ แล้วเริ่มเก็บข้อมูลจากแคมเปญจริง", icon: ICON_SVG },
    { num: "03", total: "04", duration: "WEEKLY", title: "ปรับแคมเปญจากข้อมูลจริง", description: "ทดสอบ audience, creative และงบประมาณเป็นรอบ เพื่อดูว่าอะไรทำงานได้ดีและควรปรับตรงไหน", icon: ICON_SVG },
    { num: "04", total: "04", duration: "MONTHLY", title: "สรุปผลและวางแผนขยาย", description: "สรุป ROAS, CPA, lead และ insight สำคัญ เพื่อขยายสิ่งที่ทำงานดีและลดส่วนที่ไม่คุ้ม", icon: ICON_SVG },
  ],
  "social-media": [
    { num: "01", total: "04", duration: "1 WEEK", title: "วาง content pillar และ tone of voice", description: "กำหนดแกนคอนเทนต์ น้ำเสียงของแบรนด์ และตารางโพสต์ให้สอดคล้องกับเป้าหมายธุรกิจ", icon: ICON_SVG },
    { num: "02", total: "04", duration: "MONTHLY", title: "ผลิตคอนเทนต์รายเดือน", description: "วางแผน ออกแบบ เขียน caption และจัดเตรียมคอนเทนต์ให้แบรนด์สื่อสารต่อเนื่อง", icon: ICON_SVG },
    { num: "03", total: "04", duration: "DAILY", title: "ดูแลการสื่อสารกับลูกค้า", description: "ช่วยดูแล inbox, comment และข้อความสำคัญในเวลาทำการ เพื่อไม่ให้โอกาสจากลูกค้าหลุดไป", icon: ICON_SVG },
    { num: "04", total: "04", duration: "MONTHLY", title: "รายงานผลและปรับคอนเทนต์", description: "สรุป reach, engagement, lead และ insight รายเดือน เพื่อปรับรูปแบบคอนเทนต์ให้เหมาะขึ้น", icon: ICON_SVG },
  ],
  automation: [
    { num: "01", total: "04", duration: "1 WEEK", title: "สำรวจ workflow ปัจจุบัน", description: "ทำความเข้าใจขั้นตอนทำงานเดิม หาจุดที่ซ้ำ ใช้เวลามาก หรือมีโอกาสผิดพลาด", icon: ICON_SVG },
    { num: "02", total: "04", duration: "2-3 WEEKS", title: "สร้างและเชื่อมระบบ", description: "ออกแบบ workflow และเชื่อมเครื่องมือที่ทีมใช้อยู่ เช่น CRM, LINE, Email หรือระบบหลังบ้าน", icon: ICON_SVG },
    { num: "03", total: "04", duration: "1 WEEK", title: "ทดสอบและเริ่มใช้งาน", description: "ทดสอบกรณีสำคัญก่อนใช้งานจริง พร้อมอธิบายวิธีใช้งานให้ทีมเข้าใจ", icon: ICON_SVG },
    { num: "04", total: "04", duration: "MONTHLY", title: "ติดตามและปรับต่อเนื่อง", description: "ตรวจการทำงานของระบบ แก้ปัญหาที่พบ และเพิ่ม workflow ใหม่เมื่อธุรกิจพร้อม", icon: ICON_SVG },
  ],
};

const FAQS_BY_SLUG: Record<string, FAQItem[]> = {
  seo: [
    { q: "SEO ใช้เวลานานแค่ไหนถึงเริ่มเห็นผล?", a: "โดยทั่วไป SEO ต้องใช้เวลา 2-3 เดือนขึ้นไปจึงเริ่มเห็นสัญญาณ แต่ขึ้นกับการแข่งขัน คุณภาพเว็บไซต์ และความต่อเนื่องของคอนเทนต์" },
    { q: "การันตีอันดับ 1 ได้ไหม?", a: "เราไม่การันตีอันดับ 1 เพราะผลการค้นหาขึ้นกับหลายปัจจัย แต่เราวาง process ให้ชัด ตั้งแต่ keyword, technical, content และรายงานผลต่อเนื่อง" },
    { q: "ทำ SEO เองได้ไหม?", a: "ทำได้ หากมีเวลาเรียนรู้และดูแลต่อเนื่อง แต่ถ้าทีมมีเวลาจำกัด การมีทีมช่วยวางระบบจะทำให้งานเดินเป็นขั้นตอนมากขึ้น" },
    { q: "ใช้เครื่องมืออะไรในการทำ SEO?", a: "ใช้เครื่องมือตามความเหมาะสม เช่น Google Search Console, GA4, Screaming Frog และเครื่องมือ keyword research เพื่อช่วยวิเคราะห์และติดตามผล" },
    { q: "ผลลัพธ์ SEO อยู่ได้นานไหม?", a: "ผลลัพธ์ SEO มักต่อยอดได้ระยะยาวกว่าสื่อโฆษณา แต่ยังต้องดูแลคอนเทนต์ โครงสร้างเว็บ และคู่แข่งอย่างต่อเนื่อง" },
  ],
  "paid-ads": [
    { q: "ควรเริ่มด้วยงบโฆษณาเท่าไหร่?", a: "ขึ้นกับเป้าหมายและตลาดของธุรกิจ เราจะช่วยประเมินงบเริ่มต้นที่พอให้เก็บข้อมูลและปรับแคมเปญได้อย่างมีเหตุผล" },
    { q: "ค่าบริการคิดอย่างไร?", a: "คิดตามขอบเขตการดูแล จำนวนช่องทาง และความซับซ้อนของแคมเปญ โดยแยกค่าบริการออกจากงบโฆษณาให้ชัดเจน" },
    { q: "ROAS เท่าไหร่ถึงเรียกว่าดี?", a: "ขึ้นกับ margin, ราคาสินค้า และเป้าหมายของแคมเปญ เราจะตั้งตัวชี้วัดร่วมกันก่อนเริ่ม เพื่อให้รู้ว่าควรดูตัวเลขไหนเป็นหลัก" },
    { q: "ต้องปรับแคมเปญบ่อยแค่ไหน?", a: "เราปรับเป็นรอบตามข้อมูลที่ได้ ไม่เปลี่ยนเพื่อให้ดูยุ่ง แต่ปรับเมื่อเห็นสัญญาณว่าควรเปลี่ยน audience, creative หรืองบประมาณ" },
    { q: "ดูแลเฉพาะ Meta และ Google หรือไม่?", a: "Meta และ Google เป็นช่องทางหลัก แต่สามารถประเมิน TikTok, LINE Ads หรือ YouTube ได้ตามพฤติกรรมลูกค้าและเป้าหมายของธุรกิจ" },
  ],
  "social-media": [
    { q: "ดูแลกี่แพลตฟอร์ม?", a: "ขึ้นกับช่องทางที่ลูกค้าใช้อยู่และกลุ่มเป้าหมายของธุรกิจ โดยทั่วไปเริ่มจากช่องทางหลักก่อน แล้วค่อยขยายเมื่อระบบเริ่มนิ่ง" },
    { q: "ต้องถ่ายเองหรือส่งไฟล์ดิบให้ทีม?", a: "ทำได้ทั้งสองแบบ ลูกค้าส่งไฟล์ดิบมาให้ทีมเรียบเรียงได้ หรือให้เราช่วยวางแผนและผลิตคอนเทนต์ตามขอบเขตที่ตกลงกัน" },
    { q: "ตอบ inbox ได้ตลอด 24 ชั่วโมงไหม?", a: "การดูแลโดยทีมจะอยู่ในเวลาทำการ หากต้องการตอบคำถามเบื้องต้นนอกเวลา สามารถวางระบบ chatbot หรือ Automation เสริมได้" },
    { q: "ค่าบริการรวมงบโฆษณาหรือไม่?", a: "โดยทั่วไปค่าบริการดูแลคอนเทนต์และงบโฆษณาแยกกัน เพื่อให้เห็นต้นทุนแต่ละส่วนชัดเจน" },
    { q: "ถ้าคอนเทนต์ผลลัพธ์ไม่ดีจะปรับอย่างไร?", a: "เราจะดูข้อมูลรายเดือนว่า content แบบไหนทำงานหรือไม่ทำงาน แล้วปรับหัวข้อ format และจังหวะการสื่อสารในรอบถัดไป" },
  ],
  automation: [
    { q: "ธุรกิจขนาดเล็กเริ่มใช้ Automation ได้ไหม?", a: "ได้ หากมีขั้นตอนซ้ำที่กินเวลาทีม เช่น รับ lead, ตอบคำถามเบื้องต้น, ส่งอีเมล หรือย้ายข้อมูลระหว่างระบบ" },
    { q: "ใช้เครื่องมืออะไรในการทำ Automation?", a: "เลือกเครื่องมือตาม workflow และงบประมาณ เช่น n8n, Zapier หรือ Make รวมถึงระบบที่ลูกค้าใช้อยู่เดิม" },
    { q: "เชื่อมกับระบบเดิมได้ไหม?", a: "ส่วนใหญ่ทำได้หากระบบมี API, webhook หรือ connector ให้ใช้งาน หากระบบเก่ามาก อาจต้องประเมินแนวทางเฉพาะก่อนเริ่ม" },
    { q: "Chatbot จำเป็นต้องใช้ AI ไหม?", a: "ไม่จำเป็นเสมอไป บางเคสใช้ rule-based ก็เพียงพอ ส่วนเคสที่คำถามหลากหลายค่อยพิจารณา AI ให้เหมาะกับความเสี่ยงและการดูแล" },
    { q: "หลังสร้างระบบแล้วดูแลต่ออย่างไร?", a: "สามารถดูแลต่อเป็นรายเดือนเพื่อตรวจระบบ แก้ปัญหา และปรับ workflow เมื่อขั้นตอนทำงานของธุรกิจเปลี่ยนไป" },
  ],
};

type SubSystem = {
  slug: string;
  name: string;
  tagline: string;
  bullets: string[];
  icon: ReactNode;
};

const LEAD_CAPTURE_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M3 7l9 6 9-6" /><rect x="3" y="5" width="18" height="14" rx="2" /></svg>
);

const SUB_SYSTEMS_BY_SLUG: Record<string, SubSystem[]> = {
  automation: [
    {
      slug: "lead-capture",
      name: "Lead Capture Automation",
      tagline: "ระบบเก็บ Lead อัตโนมัติ แจ้งเตือนทีมขายผ่าน LINE ทันที",
      bullets: [
        "ฟอร์ม → Google Sheets → LINE เด้งทันที",
        "ลด Lead หลุด ตามลูกค้าเร็วขึ้น",
        "เริ่มต้น 12,000 บาท",
      ],
      icon: LEAD_CAPTURE_ICON,
    },
  ],
};

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const serviceName = pickLocale(locale, service.name_th, service.name_en ?? service.name_th);
  const serviceSummary = pickLocale(locale, service.summary_th, service.summary_en ?? service.summary_th);
  const features = (locale === "en" && service.features_en?.length ? service.features_en : service.features_th) ?? [];

  const processSteps = PROCESS_STEPS_BY_SLUG[slug];
  const faqs = FAQS_BY_SLUG[slug];
  const subSystems = SUB_SYSTEMS_BY_SLUG[slug];

  return (
    <main id="main" className="service-single">
      <TrackView event="service_view" slug={slug} />
      <ServiceJsonLd service={service} locale={locale} />
      {faqs && <FaqJsonLd items={faqs} />}
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: locale === "en" ? "Home" : "หน้าแรก", path: "" },
          { name: locale === "en" ? "Services" : "บริการ", path: "/services" },
          { name: serviceName, path: `/services/${slug}` },
        ]}
      />

      {/* ============================================================ HERO */}
      <section className="ss-hero" aria-labelledby="hero-title">
        <div className="ss-hero-blob" aria-hidden="true"></div>
        <div className="container">
          <Link href="/services" className="breadcrumb">
            <span aria-hidden="true">←</span>
            <span>บริการทั้งหมด</span>
          </Link>

          <div className="ss-hero-inner">
            <span className="eyebrow-pill">
              <span className="star">✦</span>
              <span>{service.name_en ?? serviceName} · Service</span>
            </span>
            <h1 id="hero-title" className="ss-hero-title">
              {serviceName}
            </h1>
            <p className="ss-hero-lead">{serviceSummary}</p>
            <div className="ss-hero-ctas">
              <Link href="/contact" className="btn btn-primary btn-lg btn-arrow">
                <span className="btn-label">ขอคำปรึกษา</span>
              </Link>
              <Link href="#portfolio" className="btn btn-secondary btn-lg">
                <span className="btn-label">ดูผลงาน</span>
              </Link>
            </div>
          </div>

          {slug === "automation" ? (
            <div className="ss-hero-visual ss-hero-visual-generated">
              <MediaImage
                className="ss-hero-image"
                src="/services/automation-hero-mockup-hd.webp"
                alt="ตัวอย่างหน้าจอระบบ Automation & AI สำหรับเชื่อม workflow, chatbot, CRM และ email"
                priority
                sizes="(min-width: 1280px) 1100px, 100vw"
              />
            </div>
          ) : (
            <div className="ss-hero-icon-placeholder" aria-hidden="true">
              <ServiceIcon name={service.icon} />
            </div>
          )}
        </div>
      </section>

      {/* ============================================================ WHAT WE DELIVER */}
      <section className="section section-tight ss-what" aria-labelledby="what-title">
        <div className="container ss-what-grid">
          <Reveal className="ss-what-text">
            <span className="eyebrow-chip">● สิ่งที่เราช่วยวางระบบ</span>
            <h2 id="what-title">{serviceName} ที่วางแผนและติดตามผลได้ชัดเจน</h2>
            <p>{serviceSummary}</p>
            <p>
              เราทำงานเป็นรอบสั้น ๆ สื่อสารความคืบหน้าอย่างต่อเนื่อง และปรับแผนจากข้อมูลจริง
              เพื่อให้ลูกค้าเห็นว่างานกำลังเดินไปทางไหน
            </p>
          </Reveal>

          <Reveal className="ss-deliverables" delay={0.1}>
            <span className="eyebrow-chip is-blue">● สิ่งที่ได้รับ</span>
            <h3>สิ่งที่คุณได้รับ</h3>
            <ul className="ss-deliverable-list">
              {features.map((f) => (
                <li key={f}>{f}</li>
              ))}
              <li>อัปเดตความคืบหน้าเป็นรอบงาน</li>
              <li>คนดูแลหลักสำหรับประสานงาน</li>
              <li>ช่องทางสื่อสารกับทีมในเวลาทำการ</li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ SUB-SYSTEMS */}
      {subSystems && (
        <section className="section section-tight ss-subsystems" id="systems" aria-labelledby="systems-title">
          <div className="container">
            <Reveal className="section-header-center">
              <span className="eyebrow-chip">● ระบบที่พร้อมใช้งาน</span>
              <h2 id="systems-title" style={{ margin: "var(--space-4) 0 var(--space-4)" }}>
                ระบบ Automation ย่อยที่แยกใช้งานได้ทันที
              </h2>
              <p className="lead">เลือกเฉพาะระบบที่ธุรกิจคุณต้องการ เริ่มจากระบบเดียวก่อนแล้วค่อยต่อยอด</p>
            </Reveal>

            <Reveal className="ss-subsystem-grid" delay={0.1}>
              {subSystems.map((sys) => (
                <Link
                  key={sys.slug}
                  href={`/services/automation/${sys.slug}`}
                  className="card card-service ss-subsystem-card"
                  aria-label={`ดูรายละเอียดระบบ ${sys.name}`}
                >
                  <div className="card-icon is-orange" aria-hidden="true">{sys.icon}</div>
                  <span className="ss-subsystem-badge">ระบบ</span>
                  <h3 className="card-title">{sys.name}</h3>
                  <p className="card-desc">{sys.tagline}</p>
                  <ul className="service-features">
                    {sys.bullets.map((b) => (
                      <li key={b} className="service-feature">{b}</li>
                    ))}
                  </ul>
                  <span className="card-link">ดูรายละเอียด</span>
                </Link>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      {/* ============================================================ PROCESS */}
      {processSteps && (
        <section className="section section-tight ss-process" id="process" aria-labelledby="process-title">
          <div className="container">
            <ProcessCarousel
              eyebrow="Process"
              title={<>กระบวนการทำงาน</>}
              description="แบ่งงานเป็นขั้นตอนชัดเจน เพื่อให้รู้ว่าแต่ละช่วงต้องเตรียมอะไร จะได้อะไร และวัดผลอย่างไร"
              steps={processSteps}
            />
          </div>
        </section>
      )}

      {/* ============================================================ FAQ */}
      {faqs && (
        <section className="section section-tight ss-faq" id="faq" aria-labelledby="faq-title">
          <div className="container">
            <Reveal className="section-header-center">
              <span className="eyebrow-chip">● FAQ</span>
              <h2 id="faq-title" style={{ margin: "var(--space-4) 0 var(--space-4)" }}>คำถามที่พบบ่อย</h2>
            </Reveal>

            <Reveal delay={0.1} className="services-faq-wrap">
              <ServicesFAQ items={faqs} />
            </Reveal>
          </div>
        </section>
      )}

      {/* ============================================================ FOOTER CTA */}
      <section className="section ss-cta" aria-labelledby="cta-title">
        <div className="container">
          <Reveal className="ss-cta-card">
            <div className="ss-cta-blob" aria-hidden="true"></div>
            <div className="ss-cta-text">
              <span className="eyebrow">● เริ่มต้นวันนี้</span>
              <h2 id="cta-title">อยากเริ่มต้นกับ {serviceName} มาคุยกันก่อนได้</h2>
              <p>นัดคุยฟรีเพื่อเล่าโจทย์ เป้าหมาย และข้อจำกัดของธุรกิจ แล้วเราจะช่วยแนะนำแนวทางและขอบเขตงานที่เหมาะสม</p>
              <div className="ss-cta-actions">
                <Link href="/contact" className="btn btn-orange btn-lg btn-arrow">
                  <span className="btn-label">ขอคำปรึกษา</span>
                </Link>
                <Link href="/portfolio" className="btn btn-on-light btn-lg">
                  <span className="btn-label">ดูผลงานก่อน</span>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
