import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import "@/styles/pages/contact.css";

export const metadata: Metadata = {
  title: "ติดต่อเรา · Best Solutions — นัดคุยฟรี 30 นาที ทักไลน์ได้ทันที",
  description:
    "ติดต่อ Best Solutions Corp กรุงเทพฯ — ฟอร์มขอใบเสนอราคา / โทร 095-385-7029 / LINE @bestsolutions / อีเมล info@bestsolutionscorp.com — ตอบกลับใน 1 วันทำการ",
};

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="main">

      {/* ============================================================ HERO */}
      <section className="page-hero" aria-labelledby="hero-title">
        <div className="page-hero-blob" aria-hidden="true"></div>
        <div className="container">
          <div className="page-hero-inner">
            <span className="eyebrow-pill"><span className="star">✦</span><span>Contact · ตอบใน 1 วันทำการ</span></span>
            <h1 id="hero-title">นัดคุยฟรี 30 นาที — ไม่กดดัน ไม่ผูกมัด</h1>
            <p className="lead">เล่าโจทย์ให้ฟัง เราจะแนะนำแนวทางที่เคยใช้ได้ผลกับธุรกิจคล้าย ๆ คุณ — ถ้าไม่ตรงโจทย์เรา เราจะแนะนำเอเจนซีอื่นที่เหมาะให้</p>
          </div>
        </div>
      </section>


      {/* ============================================================ FORM + INFO */}
      <section className="section section-tight" id="form" aria-labelledby="form-title">
        <div className="container">
          <h2 id="form-title" style={{ position: "absolute", clip: "rect(0 0 0 0)", width: "1px", height: "1px", overflow: "hidden" }}>ฟอร์มและช่องทางติดต่อ</h2>

          <div className="contact-grid">

            {/* LEFT: form */}
            <form className="form card" style={{ padding: "var(--space-10)" }}>
              <div style={{ marginBottom: "var(--space-6)" }}>
                <span className="eyebrow-chip">● ฟอร์มขอใบเสนอ</span>
                <h2 style={{ margin: "var(--space-3) 0 var(--space-2)", fontSize: "var(--text-2xl)" }}>เล่าให้ฟังก่อนได้</h2>
                <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }}>เราจะติดต่อกลับภายใน 1 วันทำการ</p>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="form-label form-label-required" htmlFor="lead-name">ชื่อ-นามสกุล</label>
                  <input className="form-input" id="lead-name" type="text" name="name" placeholder="เช่น ธนกิจ ใจทอง" required />
                </div>
                <div className="form-field">
                  <label className="form-label form-label-required" htmlFor="lead-phone">เบอร์โทร</label>
                  <input className="form-input" id="lead-phone" type="tel" name="phone" placeholder="095-385-7029" required />
                </div>
              </div>

              <div className="form-field">
                <label className="form-label form-label-required" htmlFor="lead-email">อีเมล</label>
                <input className="form-input" id="lead-email" type="email" name="email" placeholder="you@example.com" required />
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="lead-service">บริการที่สนใจ</label>
                <select className="form-select" id="lead-service" name="service">
                  <option>ยังไม่แน่ใจ — ขอคำปรึกษา</option>
                  <option>รับทำเว็บไซต์</option>
                  <option>ยิงแอด Meta &amp; Google</option>
                  <option>SEO</option>
                  <option>ดูแลเพจโซเชียล</option>
                  <option>AI Automation</option>
                  <option>AI ตอบอีเมล</option>
                  <option>Production (Video &amp; Content)</option>
                </select>
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="lead-budget">งบประมาณคร่าว ๆ (ไม่บังคับ)</label>
                <select className="form-select" id="lead-budget" name="budget">
                  <option>ยังไม่แน่ใจ</option>
                  <option>ต่ำกว่า 50,000 บาท</option>
                  <option>50,000 - 150,000 บาท</option>
                  <option>150,000 - 500,000 บาท</option>
                  <option>มากกว่า 500,000 บาท</option>
                </select>
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="lead-message">รายละเอียดโจทย์</label>
                <textarea className="form-textarea" id="lead-message" name="message" placeholder="เล่าให้ฟังว่าธุรกิจคุณกำลังเจอโจทย์อะไร — ยิ่งละเอียดเรายิ่งช่วยได้ตรงจุด"></textarea>
                <span className="form-help">ไม่จำเป็นต้องครบ — เริ่มเล่าเท่าที่นึกออก เราถามต่อในการคุยได้</span>
              </div>

              <div className="form-field">
                <label className="form-checkbox-wrap">
                  <input className="form-checkbox" type="checkbox" name="consent" required />
                  <span>ยินยอมให้ Best Solutions เก็บข้อมูลตามนโยบายความเป็นส่วนตัว เพื่อใช้ติดต่อกลับเรื่องโปรเจคเท่านั้น</span>
                </label>
              </div>

              <div className="form-honeypot" aria-hidden="true">
                <label>เว็บไซต์ <input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
              </div>

              <div className="form-actions">
                <button className="btn btn-primary btn-arrow" type="submit"><span className="btn-label">ส่งข้อมูล</span></button>
                <span className="form-help" style={{ marginTop: 0 }}>หรือทักไลน์ <strong>@bestsolutions</strong> ก็ได้</span>
              </div>
            </form>


            {/* RIGHT: info panel */}
            <aside className="contact-info">
              <div>
                <span className="eyebrow-chip is-blue">● ช่องทางติดต่อ</span>
                <h2 style={{ margin: "var(--space-3) 0 var(--space-2)", fontSize: "var(--text-2xl)" }}>หรือทักช่องทางอื่นได้</h2>
                <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }}>เลือกที่สะดวกสุด — ทุกช่องเข้าทีมเดียวกัน</p>
              </div>

              <div className="contact-channels">

                <a href="https://line.me/" target="_blank" rel="noopener" className="contact-channel">
                  <div className="contact-channel-icon is-line" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 4H5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h2v3l4-3h8a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zM7 13H5v-3h1v2h1v1zm3 0H8.5v-3H10v3zm5-1.5L13 13h-1V10h1v1.5L14.5 10H15v3zm3.5 0H17V11h-1v-1h1v-1h1.5v3z" /></svg>
                  </div>
                  <div>
                    <div className="contact-channel-label">LINE Official</div>
                    <div className="contact-channel-value">@bestsolutions</div>
                  </div>
                </a>

                <a href="tel:0953857029" className="contact-channel">
                  <div className="contact-channel-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                  </div>
                  <div>
                    <div className="contact-channel-label">โทรศัพท์</div>
                    <div className="contact-channel-value">095-385-7029</div>
                  </div>
                </a>

                <a href="mailto:info@bestsolutionscorp.com" className="contact-channel">
                  <div className="contact-channel-icon is-blue" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  </div>
                  <div>
                    <div className="contact-channel-label">อีเมล</div>
                    <div className="contact-channel-value">info@bestsolutionscorp.com</div>
                  </div>
                </a>

                <a href="https://facebook.com/" target="_blank" rel="noopener" className="contact-channel">
                  <div className="contact-channel-icon is-blue" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.55 9.88v-7H8v-2.88h2.45v-2.2c0-2.42 1.44-3.76 3.65-3.76 1.06 0 2.16.18 2.16.18v2.38h-1.22c-1.2 0-1.58.75-1.58 1.51v1.81h2.69l-.43 2.88h-2.26v7A10 10 0 0 0 22 12z" /></svg>
                  </div>
                  <div>
                    <div className="contact-channel-label">Facebook Page</div>
                    <div className="contact-channel-value">@bestsolutionsagency</div>
                  </div>
                </a>

              </div>

              <div className="info-card">
                <h4>เวลาทำการ</h4>
                <p>จันทร์-ศุกร์ 9:00 - 18:00<br />เสาร์-อาทิตย์: ทักไลน์ทิ้งไว้ได้ ตอบเช้าวันจันทร์</p>
              </div>

              <div className="info-card">
                <h4>ที่ตั้ง</h4>
                <p>กรุงเทพมหานคร, ประเทศไทย<br />(นัดคุยทาง Google Meet เป็นหลัก — ออฟฟิศนัดล่วงหน้า)</p>
              </div>

              <div className="map-placeholder" role="img" aria-label="แผนที่ที่ตั้ง — แสดงเมื่อมีพิกัดจริง">
                MAP · กรุงเทพฯ
              </div>

            </aside>

          </div>
        </div>
      </section>


      {/* ============================================================ FAQ */}
      <section className="section section-tight" id="faq" aria-labelledby="faq-title">
        <div className="container">
          <div className="section-header-center">
            <span className="eyebrow-chip">● คำถามที่พบบ่อย</span>
            <h2 id="faq-title" style={{ marginTop: "var(--space-4)" }}>เรื่องที่ลูกค้าถามก่อนตัดสินใจ</h2>
          </div>

          <div className="faq-list">
            <details className="faq-item">
              <summary>นัดคุยฟรี 30 นาที จริง ๆ ฟรีไหม? มีเงื่อนไขอะไรไหม?</summary>
              <p>ฟรีจริง ไม่มีเงื่อนไข — เราใช้ 30 นาทีนี้ทำความรู้จักธุรกิจคุณ ฟังโจทย์ และเสนอแนวทาง ไม่ต้องเซ็นอะไร ไม่ต้องจองเวลาขั้นต่ำ ไม่ขายตรงระหว่างคุย ถ้าโจทย์ของคุณเราดูแล้วไม่ตรงกับสิ่งที่เราเก่ง เราแนะนำเอเจนซีอื่นให้</p>
            </details>
            <details className="faq-item">
              <summary>ตอบกลับเร็วแค่ไหน?</summary>
              <p>ทุกฟอร์ม + ไลน์ที่ส่งเข้ามาในเวลาทำการ (จันทร์-ศุกร์ 9:00-18:00) เราตอบกลับภายใน 1 ชั่วโมง สำหรับวันหยุด/นอกเวลา ตอบกลับเช้าวันถัดไป (สูงสุด 1 วันทำการ)</p>
            </details>
            <details className="faq-item">
              <summary>ราคาประมาณเท่าไหร่?</summary>
              <p>ขึ้นกับขนาดและฟีเจอร์ — เว็บ landing เริ่มที่หลักหมื่นปลาย ๆ เว็บบริษัท 5-8 หน้าหลักแสน e-commerce / web app หลักแสนปลาย ๆ ขึ้นไป ส่วนแอด/SEO มีแพ็กเกจรายเดือน เริ่ม 15,000 บาท หรือทักมาเล่าโจทย์ เราจะให้ตัวเลขเฉพาะเคสคุณ</p>
            </details>
            <details className="faq-item">
              <summary>ทำงานกับลูกค้าต่างจังหวัดได้ไหม?</summary>
              <p>ได้ — ลูกค้าเราอยู่ครบทุกภาค ทำงานกับทีมผ่าน Google Meet + Slack + Notion เห็นความคืบหน้าได้ทุกวัน ไม่ต้องเดินทางมากรุงเทพฯ</p>
            </details>
            <details className="faq-item">
              <summary>มีตัวอย่างสัญญาให้ดูก่อนได้ไหม?</summary>
              <p>ได้ครับ ขอตัวอย่าง MSA + SOW ผ่านอีเมลก่อนตัดสินใจได้เลย — สัญญาเรียบง่าย ไม่ผูกขาดยาว ไม่มีค่าปรับซ่อน ทุกข้อชัดเจน</p>
            </details>
          </div>
        </div>
      </section>

    </main>
  );
}
