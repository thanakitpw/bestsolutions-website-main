import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

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
      <div className="navbar-wrap">
        <nav className="navbar" aria-label="หลัก">
          <Link href="/" className="navbar-brand">
            <Image
              src="/logo.webp"
              alt=""
              width={28}
              height={36}
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
      </div>

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
        <Link href="/contact" className="btn btn-primary btn-arrow navbar-drawer-cta">
          <span className="btn-label">{t("Common.consultFree")}</span>
        </Link>
      </aside>
    </>
  );
}
