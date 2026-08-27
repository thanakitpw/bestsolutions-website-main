import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const PHONE_TEL = "0953854906";
const EMAIL = "info@bestsolutionscorp.com";
const LINE_URL = "https://lin.ee/xB314y9";
const FB_URL = "https://www.facebook.com/bestsolutionsagency";

export async function Navbar() {
  const t = await getTranslations();

  const services = [
    { slug: "web-design", label: t("Nav.webDesign") },
    { slug: "seo", label: t("Nav.seo") },
    { slug: "paid-ads", label: t("Nav.paidAds") },
    { slug: "social-media", label: t("Nav.socialMedia") },
    { slug: "automation", label: t("Nav.automation") },
  ];

  return (
    <>
      <header className="site-header">
        <div className="topbar">
          <ul className="topbar-info">
            <li className="topbar-item">
              <a href={`tel:${PHONE_TEL}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>{t("Footer.phone")}</span>
              </a>
            </li>
            <li className="topbar-item topbar-item-email">
              <a href={`mailto:${EMAIL}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-10 6L2 7" />
                </svg>
                <span>{t("Footer.email")}</span>
              </a>
            </li>
          </ul>

          <div className="topbar-aside">
            <span className="topbar-hours">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              <span>{t("Topbar.hours")}</span>
            </span>

            <div className="topbar-social">
              <a href={FB_URL} aria-label="Facebook Page" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M22 12a10 10 0 1 0-11.55 9.88v-7H8v-2.88h2.45v-2.2c0-2.42 1.44-3.76 3.65-3.76 1.06 0 2.16.18 2.16.18v2.38h-1.22c-1.2 0-1.58.75-1.58 1.51v1.81h2.69l-.43 2.88h-2.26v7A10 10 0 0 0 22 12z" />
                </svg>
              </a>
              <a href={LINE_URL} aria-label="LINE Official Account" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19 4H5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h2v3l4-3h8a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zM7 13H5v-3h1v2h1v1zm3 0H8.5v-3H10v3zm5-1.5L13 13h-1V10h1v1.5L14.5 10H15v3zm3.5 0H17V11h-1v-1h1v-1h1.5v3z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <nav className="navbar" aria-label="หลัก">
          <Link href="/" className="site-header-brand">
            <Image
              src="/logo.webp"
              alt=""
              width={34}
              height={44}
              className="navbar-brand-mark"
              priority
            />
            <span>{t("Common.brand")}</span>
          </Link>

          <ul className="navbar-nav">
            <li><Link href="/">{t("Nav.home")}</Link></li>
            <li className="navbar-nav-dropdown">
              <Link href="/services" className="navbar-nav-services-link">
                {t("Nav.services")}
                <svg
                  className="navbar-nav-chevron"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </Link>
              <ul className="navbar-dropdown" role="menu">
                {services.map(({ slug, label }) => (
                  <li key={slug} role="none">
                    <Link href={`/services/${slug}`} role="menuitem">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li><Link href="/portfolio">{t("Nav.portfolio")}</Link></li>
            <li><Link href="/blog">{t("Nav.blog")}</Link></li>
            <li><Link href="/about">{t("Nav.about")}</Link></li>
          </ul>

          <Link href="/contact" className="btn btn-primary btn-sm btn-arrow navbar-cta">
            <span className="btn-label">{t("Common.consultFree")}</span>
          </Link>

          <button
            className="navbar-mobile-toggle"
            type="button"
            aria-label={t("Common.openMenu")}
            aria-controls="primary-drawer"
            aria-expanded="false"
          >
            <span></span><span></span><span></span>
          </button>
        </nav>
      </header>

      <div className="navbar-scrim" data-open="false" aria-hidden="true"></div>

      <aside
        className="navbar-drawer"
        id="primary-drawer"
        data-open="false"
        aria-label={t("Common.openMenu")}
      >
        <button className="navbar-drawer-close" type="button" aria-label={t("Common.closeMenu")}>
          ×
        </button>
        <ul className="navbar-drawer-nav">
          <li><Link href="/">{t("Nav.home")}</Link></li>
          <li className="navbar-drawer-services-item">
            <details className="navbar-drawer-details">
              <summary className="navbar-drawer-summary">
                {t("Nav.services")}
                <svg
                  className="navbar-drawer-chevron"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <ul className="navbar-drawer-subnav">
                {services.map(({ slug, label }) => (
                  <li key={slug}>
                    <Link href={`/services/${slug}`}>{label}</Link>
                  </li>
                ))}
              </ul>
            </details>
          </li>
          <li><Link href="/portfolio">{t("Nav.portfolio")}</Link></li>
          <li><Link href="/blog">{t("Nav.blog")}</Link></li>
          <li><Link href="/about">{t("Nav.about")}</Link></li>
          <li><Link href="/contact">{t("Nav.contact")}</Link></li>
        </ul>

        <ul className="navbar-drawer-contact">
          <li><a href={`tel:${PHONE_TEL}`}>{t("Footer.phone")}</a></li>
          <li><a href={`mailto:${EMAIL}`}>{t("Footer.email")}</a></li>
        </ul>

        <Link href="/contact" className="btn btn-primary btn-arrow navbar-drawer-cta">
          <span className="btn-label">{t("Common.consultFree")}</span>
        </Link>
      </aside>
    </>
  );
}
