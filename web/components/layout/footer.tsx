import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function Footer() {
  const t = await getTranslations();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">

          <div className="footer-col">
            <Link href="/" className="footer-brand">{t("Common.brand")}</Link>
            <p className="footer-tagline">{t("Footer.tagline")}</p>

            <div className="footer-social" role="list">
              <a href="https://line.me/" aria-label="LINE Official Account" role="listitem" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19 4H5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h2v3l4-3h8a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zM7 13H5v-3h1v2h1v1zm3 0H8.5v-3H10v3zm5-1.5L13 13h-1V10h1v1.5L14.5 10H15v3zm3.5 0H17V11h-1v-1h1v-1h1.5v3z" />
                </svg>
              </a>
              <a href="https://facebook.com/" aria-label="Facebook Page" role="listitem" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M22 12a10 10 0 1 0-11.55 9.88v-7H8v-2.88h2.45v-2.2c0-2.42 1.44-3.76 3.65-3.76 1.06 0 2.16.18 2.16.18v2.38h-1.22c-1.2 0-1.58.75-1.58 1.51v1.81h2.69l-.43 2.88h-2.26v7A10 10 0 0 0 22 12z" />
                </svg>
              </a>
              <a href="tel:0953857029" aria-label="โทรศัพท์ 095-385-7029" role="listitem">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>{t("Footer.servicesHeading")}</h4>
            <ul>
              <li><Link href="/services/web-design">รับทำเว็บไซต์</Link></li>
              <li><Link href="/services">ยิงแอด Meta &amp; Google</Link></li>
              <li><Link href="/services">SEO</Link></li>
              <li><Link href="/services">AI Automation</Link></li>
              <li><Link href="/services">Production</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>{t("Footer.companyHeading")}</h4>
            <ul>
              <li><Link href="/about">{t("Nav.about")}</Link></li>
              <li><Link href="/portfolio">{t("Nav.portfolio")}</Link></li>
              <li><Link href="/blog">{t("Nav.blog")}</Link></li>
              <li><Link href="/contact">ร่วมงานกับเรา</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>{t("Footer.contactHeading")}</h4>
            <ul>
              <li><a href="tel:0953857029">{t("Footer.phone")}</a></li>
              <li><a href="mailto:info@bestsolutionscorp.com">{t("Footer.email")}</a></li>
              <li><a href="https://line.me/" target="_blank" rel="noopener">{t("Footer.lineLabel")}</a></li>
              <li><a href="https://facebook.com/" target="_blank" rel="noopener">{t("Footer.fbLabel")}</a></li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <span>{t("Footer.copyright")}</span>
          <ul className="footer-bottom-links">
            <li><a href="#">{t("Footer.privacy")}</a></li>
            <li><a href="#">{t("Footer.terms")}</a></li>
            <li><a href="#">{t("Footer.sitemap")}</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
