import { Link } from "react-router-dom";
import { ContactIntentLink } from "../components/ContactIntentLink";
import { AiAgentShowcase } from "../components/home/AiAgentShowcase";
import { ServicesIaWeb } from "../components/home/ServicesIaWeb";
import { Seo } from "../components/Seo";
import {
  applySiteTokens,
  packages,
  seoHomeDescription,
  siteConfig,
} from "../config/site";

function founderInitials(): string {
  return siteConfig.founderName
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function packageBentoClass(id: string): string {
  if (id === "pro") return "sl-card sl-card--bento-featured";
  if (id === "essentiel") return "sl-card sl-card--bento-side-top";
  return "sl-card sl-card--bento-side-bottom";
}

export function Home() {
  return (
    <>
      <Seo title="Accueil" description={seoHomeDescription()} />

      <section className="sl-hero" aria-labelledby="hero-title">
        <span className="sl-hero-deco sl-hero-deco--a" aria-hidden />
        <span className="sl-hero-deco sl-hero-deco--b" aria-hidden />
        <div className="sl-hero-grid">
          <div className="sl-hero-copy">
            <div className="sl-hero-pills" aria-label="Profil">
              <span>{siteConfig.founderCity}</span>
              {siteConfig.heroPillsAfterCity.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
            <h1 id="hero-title">
              Un site <em>vivant</em> et pro — sans la complexité inutile
            </h1>
            <p className="sl-hero-byline">
              Moi c’est <strong>{siteConfig.founderFirstName}</strong>, {siteConfig.founderAge} ans, basé à{" "}
              <strong>{siteConfig.founderCity}</strong>. {siteConfig.founderCredentials}
            </p>
            <p className="sl-hero-lead">
              {siteConfig.founderIntro} Vous gardez le contrôle sur le fond ; je m’occupe du cadre
              technique, des délais — et des idées IA seulement quand ça vous fait gagner du temps.
            </p>
            <div className="sl-hero-actions">
              <ContactIntentLink to="/contact" className="sl-btn sl-btn--primary">
                Discuter avec {siteConfig.founderFirstName}
              </ContactIntentLink>
              <Link to="/a-propos" className="sl-btn sl-btn--ghost">
                Mon parcours
              </Link>
            </div>
            <div className="sl-trust sl-trust--hero" aria-label="Activité">
              <span>{siteConfig.founderCity} &amp; distance</span>
              {siteConfig.trustSectors.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>

          <aside className="sl-founder-card" aria-label="Présentation">
            <div className="sl-founder-card-head">
              <div className="sl-founder-avatar" aria-hidden>
                {founderInitials()}
              </div>
              <div>
                <h2>Salut, je suis {siteConfig.founderFirstName}</h2>
                <p className="sl-founder-meta">
                  {siteConfig.founderAge} ans · {siteConfig.founderCity}
                </p>
              </div>
            </div>
            <div className="sl-founder-chips">
              <span className="sl-chip">Ingénieur</span>
              <span className="sl-chip sl-chip--warm">Développeur</span>
              <span className="sl-chip">Data scientist</span>
            </div>
            <p className="sl-founder-voice">
              J’aime les projets où on peut <strong>expliquer simplement</strong> ce qu’on fait —
              côté client comme côté code. Si votre site doit aussi accueillir un chatbot ou un
              petit agent, on le fait proprement, avec des règles claires.
            </p>
            <ContactIntentLink to="/contact" className="sl-founder-more">
              Écrire à {siteConfig.founderFirstName} →
            </ContactIntentLink>
          </aside>
        </div>
      </section>

      <div className="sl-home-stats" aria-label="En bref">
        <div className="sl-home-stats-inner">
          <div className="sl-home-stat">
            <strong>Un interlocuteur</strong>
            <span>Du cadrage à la mise en ligne, sans file d’attente ni « compte manager » fantôme.</span>
          </div>
          <div className="sl-home-stat">
            <strong>
              {siteConfig.founderCity} &amp; distance
            </strong>
            <span>Point régulier comme vous préférez : visio, message, ou café si vous êtes dans les cimes.</span>
          </div>
          <div className="sl-home-stat">
            <strong>Sites tenables</strong>
            <span>Vitesse, structure SEO de base, et un socle propre pour faire évoluer le site plus tard.</span>
          </div>
        </div>
      </div>

      <ServicesIaWeb />

      <section className="sl-section sl-home-bento">
        <div className="sl-container">
          <p className="sl-kicker">Comme une petite agence, sans la lourdeur</p>
          <h2 className="sl-home-bento-title">Pourquoi travailler avec un solo technique ?</h2>
          <div className="sl-bento-grid">
            <article className="sl-bento-cell sl-bento-cell--wide">
              <h3>Moins de couches, plus de clarté</h3>
              <p>
                Pas d’équipe offshore ni de jargon pour cacher le vide : on décide ensemble des priorités,
                je code et documente, vous validez. Idéal si vous préférez savoir{" "}
                <strong>qui fait quoi</strong> et à quelle vitesse ça avance.
              </p>
            </article>
            <article className="sl-bento-cell">
              <h3>Livraisons visibles</h3>
              <p>
                Prévisualisation régulière, explications en français clair — pas besoin d’être dev pour
                comprendre ce qui change.
              </p>
            </article>
            <article className="sl-bento-cell sl-bento-cell--accent">
              <h3>IA seulement si ça paie</h3>
              <p>
                Culture data : on mesure si un chatbot ou une automation vaut le coup avant de l’ajouter,
                pour éviter les gadgets.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="sl-section sl-section-offer">
        <div className="sl-container">
          <div className="sl-section-offer-head">
            <h2 className="sl-section-title">Ce que je vous propose</h2>
            <p className="sl-section-lead">
              Trois niveaux pour s’y retrouver — on ajuste après un vrai échange. Les prix sont des
              repères ; le devis final dépend de votre contenu et de vos délais.
            </p>
          </div>
          <div className="sl-packages-bento">
            {packages.map((p) => (
              <article key={p.id} className={packageBentoClass(p.id)} id={p.id}>
                <h3 className="sl-card-title">{p.name}</h3>
                <p className="sl-card-price">{p.priceLabel}</p>
                <p className="sl-card-tagline">{p.tagline}</p>
                <ul className="sl-list-check">
                  {p.bullets.slice(0, 3).map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <Link to="/forfaits" className="sl-btn sl-btn--ghost" style={{ marginTop: "1rem", width: "100%" }}>
                  Détails &amp; comparatif
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sl-section" style={{ paddingTop: 0 }}>
        <div className="sl-container">
          <div className="sl-band-ia">
            <h2>IA utile — grâce au bagage data</h2>
            <p>
              La formation en data scientist m’a appris à poser les bonnes questions : qu’est-ce
              qu’on mesure, qu’est-ce qu’on automatise, et où garde-t-on l’humain ? Un chatbot ou un
              assistant sur votre site, c’est utile quand ça décharge les mêmes questions toute la
              journée — pas quand ça embrouille vos clients.
            </p>
            <div className="sl-band-ia-actions">
              <Link to="/services" className="sl-btn sl-btn--primary">
                Voir les services
              </Link>
              <ContactIntentLink to="/contact" className="sl-btn sl-btn--outline-light">
                Parler d’un cas concret
              </ContactIntentLink>
            </div>
          </div>
        </div>
      </section>

      <AiAgentShowcase />

      <section className="sl-section">
        <div className="sl-container">
          <h2 className="sl-section-title">La parole aux clients (bientôt)</h2>
          <p className="sl-section-lead">
            Je préfère afficher de vrais retours plutôt que du texte de remplissage — les
            témoignages détaillés arrivent au fil des projets. En attendant, vous travaillerez
            directement avec moi, en restant synchro sur WhatsApp ou mail selon ce qui vous va.
          </p>
          <blockquote className="sl-quote">
            <p>{applySiteTokens(siteConfig.placeholderTestimonialQuote)}</p>
            <footer>{siteConfig.placeholderTestimonialFooter}</footer>
          </blockquote>
        </div>
      </section>

      <section className="sl-cta-band">
        <h2>Un café virtuel ou un call de 15 min ?</h2>
        <p>
          Dites-moi où vous en êtes : même un demi-projet mérite une réponse claire — je réponds
          depuis {siteConfig.founderCity}, pour la région ou le remote.
        </p>
        <div className="sl-hero-actions">
          <ContactIntentLink to="/contact" className="sl-btn sl-btn--primary">
            Écrire à {siteConfig.founderFirstName}
          </ContactIntentLink>
          <Link to="/methode" className="sl-btn sl-btn--outline-light">
            Comment je travaille
          </Link>
        </div>
      </section>
    </>
  );
}
