import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function Navbar() {
  const t = await getTranslations();

  return (
    <>
      <div className="navbar-wrap">
        <nav className="navbar" aria-label="หลัก">
          <Link href="/" className="navbar-brand">
            {t("Common.brand")}
          </Link>

          <ul className="navbar-nav">
            <li><Link href="/services">{t("Nav.services")}</Link></li>
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
          <li><Link href="/services">{t("Nav.services")}</Link></li>
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
