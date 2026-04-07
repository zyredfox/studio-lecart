import { Link } from "react-router-dom";
import { ContactIntentLink } from "../components/ContactIntentLink";
import { Seo } from "../components/Seo";
import { seoAProposDescription, siteConfig } from "../config/site";

export function APropos() {
  return (
    <>
      <Seo
        title="À propos"
        description={seoAProposDescription()}
      />

      <header className="sl-page-head">
        <div className="sl-page-head-inner">
          <h1 className="sl-page-title">
            {siteConfig.founderFirstName}, {siteConfig.founderAge} ans · {siteConfig.founderCity}
          </h1>
          <p className="sl-page-lead">
            Ingénieur, développeur, avec une formation de data scientist — je crée des sites qui
            tiennent la route techniquement et qui restent humains à lire.
          </p>
        </div>
      </header>

      <div className="sl-container sl-prose" style={{ paddingBottom: "4rem", maxWidth: "42rem" }}>
        <p>
          Je m’appelle <strong>{siteConfig.founderName}</strong>. Après un diplôme d’ingénieur, j’ai
          approfondi le développement web et une formation orientée <strong>data science</strong> :
          autrement dit, je sais à la fois livrer un site propre et réfléchir à des automatisation
          ou des assistants quand ils ont un vrai ROI pour vous — pas parce que « il faut de
          l’IA ».
        </p>
        <p>
          Aujourd’hui, je base mon activité à <strong>{siteConfig.founderCity}</strong> (région &amp;
          alentours ou 100 % à distance selon les projets). J’aime
          bosser avec des indépendants, des artisans, des assos et des petites structures qui ont
          besoin d’une présence web claire sans devenir techniciens du jour au lendemain.
        </p>
        <p>
          <strong>{siteConfig.siteName}</strong>, c’est le nom sous lequel je regroupe tout ça :
          vitrine sur mesure, bases SEO, et quand vous êtes prêts — chatbots, petits agents ou
          branchements sur vos outils. Le fil conducteur : du concret, des délais qu’on tient, et un
          langage qu’on comprend entre nous.
        </p>
        <p style={{ fontSize: "0.95rem", color: "var(--sl-ink-muted)" }}>
          {siteConfig.founderIntro}
        </p>
        <p style={{ marginTop: "2rem" }}>
          <ContactIntentLink to="/contact" className="sl-btn sl-btn--primary">
            Prendre contact avec {siteConfig.founderFirstName}
          </ContactIntentLink>{" "}
          <Link to="/realisations" className="sl-btn sl-btn--ghost">
            Voir des exemples de travail
          </Link>
        </p>
      </div>
    </>
  );
}
