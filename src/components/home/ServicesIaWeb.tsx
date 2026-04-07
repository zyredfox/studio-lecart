import { Link } from "react-router-dom";
import { siteConfig } from "../../config/site";

function IconVitrine() {
  return (
    <svg className="sl-service-offer-icon-svg" viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M6 10h20v12H6V10z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M10 6h12v4H10V6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 22h8M14 14h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="24" cy="8" r="2" fill="currentColor" opacity="0.35" />
    </svg>
  );
}

function IconAgents() {
  return (
    <svg className="sl-service-offer-icon-svg" viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect x="5" y="14" width="10" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 14v-3a3 3 0 016 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M19 18h8M19 22h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="23" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M21 26h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

function IconData() {
  return (
    <svg className="sl-service-offer-icon-svg" viewBox="0 0 32 32" fill="none" aria-hidden>
      <ellipse cx="16" cy="7" rx="9" ry="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 7v5c0 1.66 4 3 9 3s9-1.34 9-3V7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 14v5c0 1.66 4 3 9 3s9-1.34 9-3v-5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 21v5c0 1.66 4 3 9 3s9-1.34 9-3v-5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

const offers = [
  {
    id: "vitrine",
    title: "Sites vitrines haute performance",
    description:
      "Pages légères, Core Web Vitals au vert et structure HTML sémantique : votre site charge vite, se positionne mieux et rassure Google comme vos visiteurs.",
    icon: IconVitrine,
    to: "/services",
    featured: false,
  },
  {
    id: "agents",
    title: "Automatisation & agents IA",
    description:
      "GPT et modèles open source intégrés à votre stack : réponses clients, qualification de demandes, synthèse de tickets — avec garde-fous et traçabilité.",
    icon: IconAgents,
    to: "/services",
    featured: true,
  },
  {
    id: "data",
    title: "Architecture de données",
    description:
      "Schémas propres, pipelines clairs et interopérabilité : vos CRM, formulaires et outils métiers parlent la même langue, sans silos opaques.",
    icon: IconData,
    to: "/contact",
    featured: false,
  },
] as const;

export function ServicesIaWeb() {
  return (
    <section className="sl-section sl-services-ia" aria-labelledby="services-ia-title">
      <div className="sl-container">
        <p className="sl-kicker sl-kicker--center">{siteConfig.servicesIaSectionKicker}</p>
        <h2 id="services-ia-title" className="sl-section-title">
          Services IA &amp; web
        </h2>
        <p className="sl-section-lead">
          Du site public à l’agent interne : trois leviers pour moderniser votre présence et vos processus,
          sans pile techno inutile.
        </p>
        <div className="sl-services-ia-grid">
          {offers.map((offer) => {
            const Icon = offer.icon;
            return (
              <article
                key={offer.id}
                className={`sl-service-offer-card${offer.featured ? " sl-service-offer-card--featured" : ""}`}
              >
                <div className="sl-service-offer-icon" aria-hidden>
                  <Icon />
                </div>
                <h3 className="sl-service-offer-title">{offer.title}</h3>
                <p className="sl-service-offer-desc">{offer.description}</p>
                <Link to={offer.to} className="sl-service-offer-link">
                  En savoir plus
                  <span aria-hidden> →</span>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
