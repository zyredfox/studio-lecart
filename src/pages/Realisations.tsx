import { Seo } from "../components/Seo";
import { caseStudies, siteConfig } from "../config/site";

export function Realisations() {
  return (
    <>
      <Seo
        title="Réalisations"
        description={`Exemples de projets vitrine par ${siteConfig.siteName} : artisans, associations, indépendants.`}
      />

      <header className="sl-page-head">
        <div className="sl-page-head-inner">
          <h1 className="sl-page-title">Réalisations</h1>
          <p className="sl-page-lead">
            Chaque projet part d’un objectif métier précis. Remplacez les exemples ci-dessous par
            vos vrais cas (lien vers le site, captures) dès qu’ils sont disponibles.
          </p>
        </div>
      </header>

      <div className="sl-container" style={{ paddingBottom: "4rem" }}>
        <div className="sl-grid-2">
          {caseStudies.map((c) => (
            <article key={c.title} className="sl-case">
              <h3>{c.title}</h3>
              <p className="sl-case-sector">{c.sector}</p>
              <dl>
                <dt>Objectif</dt>
                <dd>{c.objective}</dd>
                <dt>Livrés</dt>
                <dd>{c.delivered}</dd>
              </dl>
              {c.resultUrl ? (
                <p style={{ marginTop: "1rem" }}>
                  <a href={c.resultUrl} target="_blank" rel="noopener noreferrer">
                    Voir le site
                  </a>
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
