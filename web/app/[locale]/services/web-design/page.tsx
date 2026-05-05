import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getServiceBySlug, getPortfolioItems } from "@/utils/supabase/queries";
import { pickLocale } from "@/utils/format";
import { buildPageMetadata } from "@/utils/metadata";
import "@/styles/pages/web-design.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "WebDesign" });
  return buildPageMetadata({
    locale,
    path: "/services/web-design",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

const RELATED_GRADIENTS = [
  "linear-gradient(135deg, var(--color-orange-500), var(--color-peach))",
  "linear-gradient(135deg, var(--color-blue-500), var(--color-blue-700))",
  "linear-gradient(135deg, var(--color-text), var(--color-orange-700))",
];

export default async function WebDesignPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [service, allPortfolio] = await Promise.all([
    getServiceBySlug("web-design"),
    getPortfolioItems(),
  ]);

  const relatedPortfolio = allPortfolio
    .filter((p) => p.services?.includes("web-design"))
    .slice(0, 3);

  return (
    <main id="main">

      {/* ============================================================ HERO */}
      <section className="page-hero" aria-labelledby="hero-title">
        <div className="page-hero-blob" aria-hidden="true"></div>
        <div className="container">
          <div className="page-hero-inner">
            <Link href="/services" className="breadcrumb">
              <span aria-hidden="true">←</span>
              <span>บริการทั้งหมด</span>
            </Link>
            <span className="eyebrow-pill">
              <span className="star">✦</span>
              <span>Web Design · Service</span>
            </span>
            <h1 id="hero-title">
              {service ? pickLocale(locale, service.name_th, service.name_en ?? service.name_th) : "ออกแบบเว็บไซต์ที่ขายของได้จริง — ไม่ใช่แค่สวย"}
            </h1>
            <p className="lead">
              {service ? pickLocale(locale, service.summary_th, service.summary_en ?? service.summary_th) : "เว็บที่โหลดเร็ว SEO-ready ออกแบบจากแบรนด์คุณ พร้อม Lighthouse score ≥ 95 ทุกเว็บที่ส่งมอบ"}
            </p>
            <div className="hero-ctas">
              <Link href="/contact" className="btn btn-primary btn-lg btn-arrow">
                <span className="btn-label">ขอใบเสนอราคา</span>
              </Link>
              <Link href="/portfolio" className="btn btn-secondary btn-lg">
                <span className="btn-label">ดูผลงานเว็บ</span>
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* ============================================================ FEATURES */}
      <section className="section section-tight" id="features" aria-labelledby="features-title">
        <div className="container">
          <div className="section-header-center">
            <span className="eyebrow-chip">● สิ่งที่คุณได้</span>
            <h2 id="features-title" style={{ margin: "var(--space-4) 0 var(--space-4)" }}>ครบทุกอย่างที่เว็บธุรกิจควรมี</h2>
            <p className="lead">ไม่ใช่แค่หน้าเว็บสวย ๆ — แต่เป็นเครื่องมือทำเงินที่วัดผลได้ทุก click</p>
          </div>

          <div className="features-grid">
            <article className="feature-card">
              <div className="feature-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.5 5.5L20 10l-5.5 2.5L12 18l-2.5-5.5L4 10l5.5-2.5L12 2z" /></svg>
              </div>
              <h3 className="feature-title">UX/UI ออกแบบจากแบรนด์</h3>
              <p className="feature-desc">ไม่ใช่ template สำเร็จ — ออกแบบใหม่ทั้งหมดให้ตรงตัวตนแบรนด์และพฤติกรรมลูกค้าของคุณ</p>
            </article>

            <article className="feature-card">
              <div className="feature-icon is-blue" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              </div>
              <h3 className="feature-title">โหลดเร็ว LCP &lt; 2.5s</h3>
              <p className="feature-desc">Next.js + edge CDN + image optimization — Core Web Vitals ผ่านเขียวทุกตัว ไม่ทำให้ลูกค้าหลุด</p>
            </article>

            <article className="feature-card">
              <div className="feature-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.5-4.5" /></svg>
              </div>
              <h3 className="feature-title">SEO-ready ตั้งแต่วันแรก</h3>
              <p className="feature-desc">Meta tags / Schema.org / sitemap / hreflang ครบ พร้อม content ภาษาไทยที่ตรง keyword</p>
            </article>

            <article className="feature-card">
              <div className="feature-icon is-blue" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 8h18" /></svg>
              </div>
              <h3 className="feature-title">แก้ content เองได้</h3>
              <p className="feature-desc">เปิด Supabase Studio แก้ blog / portfolio / service ได้ทันที — ไม่ต้องโทรเรียกเรา</p>
            </article>

            <article className="feature-card">
              <div className="feature-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
              </div>
              <h3 className="feature-title">Lead form + LINE link</h3>
              <p className="feature-desc">ฟอร์มขอใบเสนอ + LINE OA + GA4 + Pixel — track ครบทุก conversion ตั้งแต่ launch</p>
            </article>

            <article className="feature-card">
              <div className="feature-icon is-blue" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
              </div>
              <h3 className="feature-title">รับประกัน 60 วัน</h3>
              <p className="feature-desc">บั๊กที่เกิดจากการพัฒนา เราซ่อมฟรี 60 วันแรกหลังส่งมอบ ไม่มีคำถาม</p>
            </article>
          </div>
        </div>
      </section>


      {/* ============================================================ PROBLEM / SOLUTION */}
      <section className="section" id="ps" aria-labelledby="ps-title">
        <div className="container">
          <div className="section-header-center">
            <span className="eyebrow-chip">● ทำไมต้องรื้อเว็บใหม่</span>
            <h2 id="ps-title" style={{ margin: "var(--space-4) 0 var(--space-4)" }}>เว็บแบบเก่า vs เว็บที่เราทำ</h2>
          </div>

          <div className="ps-grid">
            <article className="ps-card is-problem">
              <span className="ps-card-label">ปัญหาที่เจอบ่อย</span>
              <h3>เว็บแบบเก่าที่ทำให้คุณเสียลูกค้า</h3>
              <ul>
                <li>โหลดช้า รอ 5-10 วินาที ลูกค้าหลุดไปแล้ว</li>
                <li>ออกแบบเหมือน template — ไม่มีตัวตนแบรนด์</li>
                <li>SEO ไม่ผ่าน ไม่ขึ้นอันดับใน Google</li>
                <li>แก้ content ต้องจ่ายดีเวลอปเปอร์ทุกครั้ง</li>
                <li>ไม่ track conversion ไม่รู้ว่าใครเข้ามาจากไหน</li>
                <li>มือถือใช้ไม่ได้ ปุ่มเล็ก scroll หลุด</li>
              </ul>
            </article>

            <article className="ps-card is-solution">
              <span className="ps-card-label">วิธีที่เราทำให้</span>
              <h3>เว็บใหม่ที่ทำงานแทนคุณ</h3>
              <ul>
                <li>โหลดเร็ว LCP &lt; 2.5s ทั้งบนมือถือและเดสก์ท็อป</li>
                <li>ออกแบบใหม่จากแบรนด์ — ไม่มีเว็บอื่นเหมือน</li>
                <li>SEO-ready Lighthouse ≥ 95 ทุกเว็บที่ส่งมอบ</li>
                <li>แก้ content ผ่าน Supabase Studio ฟรีตลอด</li>
                <li>GA4 + Meta Pixel + LINE tracking ครบจาก launch</li>
                <li>Mobile-first จริง — ออกแบบจาก 360px ก่อน</li>
              </ul>
            </article>
          </div>
        </div>
      </section>


      {/* ============================================================ PROCESS */}
      <section className="section section-tight" id="process" aria-labelledby="process-title">
        <div className="container">
          <div className="section-header-center">
            <span className="eyebrow-chip">● ขั้นตอนทำงาน</span>
            <h2 id="process-title" style={{ margin: "var(--space-4) 0 var(--space-4)" }}>5 สัปดาห์ จากคุยครั้งแรกถึงเปิดใช้</h2>
            <p className="lead">เว็บไซต์ขนาดกลาง (5-8 หน้า) ใช้เวลาประมาณ 5-6 สัปดาห์ — ทำเป็น Sprint รายสัปดาห์</p>
          </div>

          <div className="process-list">
            <article className="process-step">
              <div className="process-num" aria-hidden="true">01</div>
              <div className="process-body">
                <h3>สัปดาห์ 1 · Discovery + Sitemap</h3>
                <p>นัดคุย ฟังโจทย์ ดู brand asset ที่มี วาง sitemap + content outline ให้คุณ approve</p>
              </div>
            </article>
            <article className="process-step">
              <div className="process-num" aria-hidden="true">02</div>
              <div className="process-body">
                <h3>สัปดาห์ 2 · Design (Wireframe → UI)</h3>
                <p>ทำ wireframe ใน Figma → review → ทำเป็น UI สมบูรณ์ + design tokens</p>
              </div>
            </article>
            <article className="process-step">
              <div className="process-num" aria-hidden="true">03</div>
              <div className="process-body">
                <h3>สัปดาห์ 3-4 · Development</h3>
                <p>เขียนโค้ด Next.js + Supabase + i18n — ส่ง preview link ให้คลิกดูได้รายวัน</p>
              </div>
            </article>
            <article className="process-step">
              <div className="process-num" aria-hidden="true">04</div>
              <div className="process-body">
                <h3>สัปดาห์ 5 · QA + SEO + Launch</h3>
                <p>ทดสอบ Lighthouse + accessibility + cross-browser ตั้ง redirect old URLs → DNS cutover</p>
              </div>
            </article>
            <article className="process-step">
              <div className="process-num" aria-hidden="true">05</div>
              <div className="process-body">
                <h3>หลัง launch · 60 วันรับประกัน</h3>
                <p>ดูแล bug + monitor Core Web Vitals + GSC coverage 60 วันแรก ฟรี</p>
              </div>
            </article>
          </div>
        </div>
      </section>


      {/* ============================================================ RELATED PORTFOLIO */}
      <section className="section section-tight" id="related" aria-labelledby="related-title">
        <div className="container">
          <div className="section-header-center" style={{ textAlign: "left", maxWidth: "none", display: "flex", justifyContent: "space-between", alignItems: "end", flexWrap: "wrap", gap: "var(--space-6)" }}>
            <div style={{ maxWidth: 720 }}>
              <span className="eyebrow-chip is-blue">● ผลงานเว็บล่าสุด</span>
              <h2 id="related-title" style={{ margin: "var(--space-4) 0 0" }}>เว็บที่เราเพิ่งส่งมอบ</h2>
            </div>
            <Link href="/portfolio" className="btn btn-ghost btn-arrow">
              <span className="btn-label">ผลงานทั้งหมด</span>
            </Link>
          </div>

          <div className="grid-3">
            {(relatedPortfolio.length > 0 ? relatedPortfolio : allPortfolio.slice(0, 3)).map((p, i) => (
              <Link key={p.slug} href={`/portfolio/${p.slug}`} className="card card-portfolio">
                <div
                  className="card-media"
                  role="img"
                  aria-label={`ภาพผลงาน${p.title}`}
                  style={p.cover_image ? { backgroundImage: `url(${p.cover_image})`, backgroundSize: "cover" } : { background: RELATED_GRADIENTS[i % RELATED_GRADIENTS.length] }}
                ></div>
                <div className="card-body">
                  <span className="card-meta">
                    <span>{p.category}</span>
                    {p.year && <><span className="card-meta-dot"></span><span>{p.year}</span></>}
                  </span>
                  <h3 className="card-title">{p.title}</h3>
                  <p className="card-desc">{pickLocale(locale, p.summary_th, p.summary_en ?? p.summary_th)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* ============================================================ FAQ */}
      <section className="section section-tight" id="faq" aria-labelledby="faq-title">
        <div className="container">
          <div className="section-header-center">
            <span className="eyebrow-chip">● คำถามที่พบบ่อย</span>
            <h2 id="faq-title" style={{ margin: "var(--space-4) 0 var(--space-4)" }}>FAQ — เรื่องที่ลูกค้าถามบ่อย</h2>
          </div>

          <div className="faq-list">
            <details className="faq-item">
              <summary>ราคาทำเว็บประมาณเท่าไหร่?</summary>
              <p>ขึ้นกับขนาดและฟีเจอร์ — เว็บ landing 1 หน้าเริ่มที่หลักหมื่น เว็บบริษัท 5-8 หน้าหลักแสน ส่วน e-commerce/web app หลักแสนปลาย ๆ ขึ้นไป ปรึกษาฟรี 30 นาที เราจะให้ตัวเลขเฉพาะเคสคุณ</p>
            </details>
            <details className="faq-item">
              <summary>ใช้เวลาทำกี่สัปดาห์?</summary>
              <p>เว็บขนาดกลาง 5-6 สัปดาห์ ตั้งแต่คุยครั้งแรกถึงเปิดใช้ — ทำเป็น Sprint รายสัปดาห์ มี preview ให้ดูได้รายวันใน 2 สัปดาห์หลัง</p>
            </details>
            <details className="faq-item">
              <summary>เว็บเก่าผมจะ migrate ยังไง?</summary>
              <p>เรารับ migrate ให้ครบ — รวมตั้ง 301 redirect จาก URL เก่าไปใหม่ทุกหน้า เพื่อรักษา SEO ranking ของเว็บเดิม ส่วน content ขึ้นกับเคส ส่วนใหญ่ copy-paste ผ่าน Supabase Studio ในไม่กี่ชั่วโมง</p>
            </details>
            <details className="faq-item">
              <summary>หลังจบงานต้องดูแลต่อไหม?</summary>
              <p>มีรับประกัน 60 วันฟรีหลังส่งมอบ — bug ที่เกิดจากการพัฒนาเราซ่อมให้ ส่วนถ้าอยากให้ดูแล/อัพเดต/SEO ต่อเนื่อง มีแพ็กเกจรายเดือนให้เลือก ไม่บังคับ</p>
            </details>
            <details className="faq-item">
              <summary>เว็บที่ทำให้ใช้เทคโนโลยีอะไร?</summary>
              <p>Next.js 15 + TypeScript + Tailwind v4 + Supabase + Vercel — เป็น stack ที่ใช้กันใน startup ระดับโลก เร็ว ปลอดภัย scale ได้ และคุณ migrate ไปทำงานกับทีม dev อื่นได้ถ้าต้องการ ไม่ผูกขาด</p>
            </details>
          </div>
        </div>
      </section>


      {/* ============================================================ DARK CTA */}
      <div className="section section-dark-pre" aria-hidden="true"></div>

      <section className="section section-dark" aria-labelledby="cta-title">
        <div className="container">
          <div className="section-header section-header-center">
            <span className="eyebrow">● พร้อมเริ่มแล้ว?</span>
            <h2 id="cta-title">รื้อเว็บเก่า ทำเว็บใหม่ที่ขายของได้</h2>
            <p className="lead">นัดคุยฟรี 30 นาที — เราจะดูเว็บปัจจุบันให้ + เสนอแผน Sprint + ราคาก่อนเซ็น</p>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)", justifyContent: "center", marginTop: "var(--space-10)" }}>
            <Link href="/contact" className="btn btn-orange btn-lg btn-arrow">
              <span className="btn-label">ขอใบเสนอราคา</span>
            </Link>
            <Link href="/portfolio" className="btn btn-on-dark btn-lg">
              <span className="btn-label">ดูผลงานเว็บก่อน</span>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
