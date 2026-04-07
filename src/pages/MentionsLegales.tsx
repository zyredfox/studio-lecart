import { Seo } from "../components/Seo";
import { siteConfig } from "../config/site";

export function MentionsLegales() {
  return (
    <>
      <Seo
        title="Mentions légales"
        description={`Mentions légales du site ${siteConfig.siteName}.`}
      />

      <header className="sl-page-head">
        <div className="sl-page-head-inner">
          <h1 className="sl-page-title">Mentions légales</h1>
        </div>
      </header>

      <div className="sl-legal">
        <h2>Éditeur du site</h2>
        <p>
          {siteConfig.siteName}.<br />
          Responsable : {siteConfig.founderName}.
          <br />
          {siteConfig.addressLine}
          <br />
          SIRET : {siteConfig.siret}
          <br />
          E-mail : <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </p>

        <h2>Hébergement</h2>
        <p>
          À compléter selon votre hébergeur (nom, adresse, site web).
        </p>

        <h2>Propriété intellectuelle</h2>
        <p>
          Les contenus présents sur ce site (textes, visuels, structure) sont la propriété de{" "}
          {siteConfig.siteName} sauf mention contraire. Toute reproduction non autorisée est interdite.
        </p>

        <h2>Données personnelles</h2>
        <p>
          Le formulaire de contact ouvre votre messagerie : aucune donnée n’est enregistrée sur ce
          site par défaut. Pour toute question :{" "}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
        </p>

        <h2>Crédits</h2>
        <p>
          Conception &amp; développement : {siteConfig.siteName}.
          <br />
          © {new Date().getFullYear()} — Tous droits réservés.
        </p>
      </div>
    </>
  );
}
