import { ContactIntentLink } from "../components/ContactIntentLink";
import { Seo } from "../components/Seo";
import { packages, siteConfig } from "../config/site";

export function Forfaits() {
  return (
    <>
      <Seo
        title="Forfaits"
        description={`Forfaits Essentiel, Pro et Sur mesure & IA chez ${siteConfig.siteName}. Prix indicatifs, devis personnalisé après brief.`}
      />

      <header className="sl-page-head">
        <div className="sl-page-head-inner">
          <h1 className="sl-page-title">Forfaits &amp; tarifs</h1>
          <p className="sl-page-lead">
            Les montants sont <strong>indicatifs</strong> (« à partir de » ou sur devis). Le tarif
            final dépend du volume de pages, des contenus fournis, et des intégrations. Un brief
            permet de figer un devis clair avant de démarrer.
          </p>
        </div>
      </header>

      <div className="sl-container" style={{ paddingBottom: "4rem" }}>
        <div className="sl-grid-3" style={{ marginBottom: "3rem" }}>
          {packages.map((p) => (
            <article key={p.id} className="sl-card" id={p.id}>
              <h2 className="sl-card-title">{p.name}</h2>
              <p className="sl-card-price">{p.priceLabel}</p>
              <p className="sl-card-tagline">{p.tagline}</p>
              <ul className="sl-list-check">
                {p.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <ContactIntentLink
                to="/contact"
                className="sl-btn sl-btn--primary"
                style={{ width: "100%", marginTop: "1rem" }}
              >
                {p.ctaLabel}
              </ContactIntentLink>
            </article>
          ))}
        </div>

        <h2 className="sl-section-title">Comparatif rapide</h2>
        <p className="sl-section-lead">
          Ce qui change d’un palier à l’autre, en résumé.
        </p>

        <div className="sl-table-wrap">
          <table className="sl-table">
            <thead>
              <tr>
                <th>Thème</th>
                <th>Essentiel</th>
                <th>Pro</th>
                <th>Sur mesure &amp; IA</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Nombre de pages</td>
                <td>1 à 3</td>
                <td>Jusqu’à ~8 ou blog</td>
                <td>Selon projet</td>
              </tr>
              <tr>
                <td>SEO de base</td>
                <td>Oui</td>
                <td>Renforcé</td>
                <td>Sur mesure</td>
              </tr>
              <tr>
                <td>Chatbot / IA</td>
                <td>—</td>
                <td>Optionnel</td>
                <td>Cœur de l’offre</td>
              </tr>
              <tr>
                <td>Intégrations</td>
                <td>Simples</td>
                <td>Étendues</td>
                <td>Avancées</td>
              </tr>
              <tr>
                <td>Maintenance</td>
                <td colSpan={3} style={{ textAlign: "center", color: "var(--sl-ink-muted)" }}>
                  Option mensuelle possible : mises à jour, petites évolutions, veille — à définir.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p style={{ textAlign: "center", marginTop: "2rem", color: "var(--sl-ink-muted)" }}>
          <ContactIntentLink to="/contact" className="sl-btn sl-btn--dark">
            Demander un devis personnalisé
          </ContactIntentLink>
        </p>
      </div>
    </>
  );
}
