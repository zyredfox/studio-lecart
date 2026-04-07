import { useEffect, useId, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { ContactIntentLink } from "./ContactIntentLink";
import { N8nChatWidget } from "./home/N8nChatWidget";
import { siteConfig } from "../config/site";

const navClass = ({ isActive }: { isActive: boolean }) =>
  `sl-nav-link${isActive ? " sl-nav-link--active" : ""}`;

const navItems = [
  { to: "/", end: true, label: "Accueil" },
  { to: "/services", label: "Services" },
  { to: "/forfaits", label: "Forfaits" },
  { to: "/realisations", label: "Réalisations" },
  { to: "/methode", label: "Méthode" },
  { to: "/a-propos", label: "À propos" },
  { to: "/contact", label: "Contact" },
] as const;

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const menuId = useId();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="sl-layout">
      <Helmet>
        <meta name="theme-color" content={siteConfig.themeColor} />
      </Helmet>
      {siteConfig.n8nChatWebhookUrl?.trim() ? <N8nChatWidget /> : null}
      <header className="sl-header">
        <div className="sl-header-inner">
          <Link to="/" className="sl-brand" onClick={closeMenu}>
            <span className="sl-brand-name">{siteConfig.siteName}</span>
            <span className="sl-brand-tag">
              {siteConfig.founderFirstName} · {siteConfig.founderCity} · Sites sur mesure
            </span>
          </Link>

          <button
            type="button"
            className={`sl-menu-toggle${menuOpen ? " sl-menu-toggle--open" : ""}`}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="sl-sr-only">{menuOpen ? "Fermer le menu" : "Ouvrir le menu"}</span>
            <span className="sl-menu-bars" aria-hidden>
              <span />
              <span />
              <span />
            </span>
          </button>

          <nav className="sl-nav sl-nav--desktop" aria-label="Navigation principale">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={"end" in item ? item.end : false} className={navClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <ContactIntentLink
            to="/contact"
            className="sl-btn sl-btn--primary sl-btn--header-cta sl-header-cta sl-header-cta--desktop"
          >
            Parler à {siteConfig.founderFirstName}
          </ContactIntentLink>
        </div>
      </header>

      <div
        className={`sl-drawer-backdrop${menuOpen ? " sl-drawer-backdrop--open" : ""}`}
        aria-hidden={!menuOpen}
        onClick={closeMenu}
      />

      <div
        id={menuId}
        className={`sl-drawer${menuOpen ? " sl-drawer--open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen ? true : undefined}
      >
        <div className="sl-drawer-top">
          <span className="sl-drawer-title">Menu</span>
          <button type="button" className="sl-drawer-close" onClick={closeMenu} aria-label="Fermer le menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="sl-drawer-nav" aria-label="Pages du site">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={"end" in item ? item.end : false}
              className={navClass}
              onClick={closeMenu}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="sl-drawer-footer">
          <ContactIntentLink
            to="/contact"
            className="sl-btn sl-btn--primary sl-btn--header-cta sl-drawer-cta"
            onClick={closeMenu}
          >
            Parler à {siteConfig.founderFirstName}
          </ContactIntentLink>
        </div>
      </div>

      <main className="sl-main">
        <div className="sl-main-noise" aria-hidden />
        <Outlet />
      </main>

      <footer className="sl-footer">
        <div className="sl-footer-inner">
          <div className="sl-footer-grid">
            <div>
              <strong className="sl-footer-brand">{siteConfig.siteName}</strong>
              <p className="sl-footer-lead">
                {siteConfig.founderCity} — {siteConfig.founderFirstName}, {siteConfig.founderAge}{" "}
                ans · Ingénieur &amp; dev · Sites vitrine, IA &amp; automatisation.
              </p>
            </div>
            <div>
              <p className="sl-footer-title">Liens</p>
              <ul className="sl-footer-links">
                <li>
                  <Link to="/services">Services</Link>
                </li>
                <li>
                  <Link to="/forfaits">Forfaits</Link>
                </li>
                <li>
                  <ContactIntentLink to="/contact">Contact</ContactIntentLink>
                </li>
                <li>
                  <Link to="/mentions-legales">Mentions légales</Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="sl-footer-title">Contact</p>
              <p>
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </p>
              <p>
                <a href={`tel:${siteConfig.phone}`}>{siteConfig.phoneDisplay}</a>
              </p>
            </div>
          </div>
          <p className="sl-footer-copy">
            © {new Date().getFullYear()} {siteConfig.siteName}. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}
