import { ContactIntentLink } from "../components/ContactIntentLink";
import { Seo } from "../components/Seo";
import { siteConfig } from "../config/site";

const steps = [
  {
    title: "Brief & objectifs",
    text: "On clarifie votre public, vos offres, et ce que vous attendez du site (contacts, prise de rendez-vous, crédibilité…).",
  },
  {
    title: "Structure & contenus",
    text: "Arborescence des pages, textes et visuels : vous fournissez le fond, je propose la forme et les priorités.",
  },
  {
    title: "Maquette & validation",
    text: "Vous validez l’apparence et les parcours avant développement — pas de mauvaise surprise en fin de ligne.",
  },
  {
    title: "Développement & tests",
    text: "Intégration, formulaires, responsive, performances de base. Vérifications avant mise en ligne.",
  },
  {
    title: "Mise en ligne & passation",
    text: "Nom de domaine, hébergement, formation courte pour les petites modifications. Puis option maintenance si besoin.",
  },
] as const;

export function Methode() {
  return (
    <>
      <Seo
        title="Méthode"
        description={`La méthode de travail de ${siteConfig.siteName} : brief, maquette, développement, mise en ligne et accompagnement.`}
      />

      <header className="sl-page-head">
        <div className="sl-page-head-inner">
          <h1 className="sl-page-title">Méthode</h1>
          <p className="sl-page-lead">
            Un déroulé transparent pour réduire le stress : vous savez où vous en êtes à chaque
            étape.
          </p>
        </div>
      </header>

      <div className="sl-container" style={{ paddingBottom: "4rem", maxWidth: "40rem" }}>
        <ol className="sl-steps">
          {steps.map((s) => (
            <li key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
        <p style={{ textAlign: "center", marginTop: "2rem" }}>
          <ContactIntentLink to="/contact" className="sl-btn sl-btn--primary">
            Lancer un brief
          </ContactIntentLink>
        </p>
      </div>
    </>
  );
}
