import { Link } from "react-router-dom";
import { ContactIntentLink } from "../components/ContactIntentLink";
import { Seo } from "../components/Seo";
import {
  getPackageById,
  type PackageId,
  servicePillarsForfaits,
  siteConfig,
} from "../config/site";

function ForfaitBridge({
  primaryId,
  secondaryIds,
}: {
  primaryId: PackageId;
  secondaryIds?: readonly PackageId[];
}) {
  const primary = getPackageById(primaryId);
  if (!primary) return null;
  const secondaryPkgs =
    secondaryIds?.map((id) => getPackageById(id)).filter((p): p is NonNullable<typeof p> => Boolean(p)) ??
    [];

  return (
    <p className="sl-service-forfait-bridge">
      <strong>Forfait le plus adapté :</strong>{" "}
      <Link to={`/forfaits#${primary.id}`}>{primary.name}</Link>
      {secondaryPkgs.length > 0 ? (
        <>
          {" "}
          (entrée de gamme possible :{" "}
          {secondaryPkgs.map((p, i) => (
            <span key={p.id}>
              {i > 0 ? ", " : null}
              <Link to={`/forfaits#${p.id}`}>{p.name}</Link>
            </span>
          ))}
          )
        </>
      ) : null}
      {" · "}
      <Link to="/forfaits">Voir le comparatif</Link>
    </p>
  );
}

export function Services() {
  return (
    <>
      <Seo
        title="Services"
        description={`Sites vitrine sur mesure, SEO de base et solutions IA pour ${siteConfig.siteName}. Problème → solution → livrables clairs.`}
      />

      <header className="sl-page-head">
        <div className="sl-page-head-inner">
          <h1 className="sl-page-title">Services</h1>
          <p className="sl-page-lead">
            Chaque bloc ci-dessous suit la même logique : ce qui coince, ce que je propose, ce que
            vous recevez en fin de projet — et le <strong>forfait</strong> qui s’aligne le mieux avec
            les offres détaillées sur la page dédiée.
          </p>
        </div>
      </header>

      <div className="sl-container sl-prose" style={{ paddingBottom: "4rem" }}>
        <p
          style={{
            maxWidth: "40rem",
            margin: "0 auto 2.5rem",
            padding: "1rem 1.25rem",
            background: "var(--sl-warm-soft)",
            borderRadius: "var(--sl-radius)",
            borderLeft: "4px solid var(--sl-warm)",
            color: "var(--sl-ink)",
          }}
        >
          Je suis <strong>{siteConfig.founderName}</strong> — je travaille depuis{" "}
          <strong>{siteConfig.founderCity}</strong> avec un bagage{" "}
          <strong>ingénieur + dev + data</strong>. Les trois leviers ci-dessous reprennent la même
          grille que l’accueil pour que vous retrouviez vos repères.
        </p>

        <section className="sl-services-pillars" aria-labelledby="services-pillars-title">
          <h2 id="services-pillars-title" className="sl-section-title sl-section-title--left">
            Les trois leviers &amp; les forfaits
          </h2>
          <ul className="sl-services-pillars-grid">
            {servicePillarsForfaits.map((pillar) => {
              const primary = getPackageById(pillar.primaryForfaitId);
              return (
                <li key={pillar.key} className="sl-services-pillar-card">
                  <h3 className="sl-services-pillar-card-title">{pillar.title}</h3>
                  <p className="sl-services-pillar-card-desc">{pillar.blurb}</p>
                  {primary ? (
                    <p className="sl-services-pillar-card-forfait">
                      <Link to={`/forfaits#${primary.id}`} className="sl-services-pillar-card-link">
                        Forfait typique : {primary.name}
                      </Link>
                    </p>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </section>

        <section className="sl-service-block">
          <h2 className="sl-section-title sl-section-title--left">Sites vitrines haute performance</h2>
          <p>
            <strong>Le problème :</strong> vous devez être trouvé, expliquer votre activité et
            offrir un contact simple — sans site lent ou illisible sur mobile.
          </p>
          <p>
            <strong>La solution :</strong> pages structurées pour vos visiteurs, design cohérent,
            formulaire ou parcours clair ; on soigne aussi la <strong>performance</strong> (chargement
            rapide) et une <strong>base SEO</strong> saine (titres, structure, pas de promesses
            magiques sur Google).
          </p>
          <p>
            <strong>Livrables :</strong> pages validées avec vous, hébergement / domaine selon
            options, courte prise en main pour vos textes ou images simples si vous le souhaitez.
          </p>
          <ForfaitBridge primaryId="pro" secondaryIds={servicePillarsForfaits[0].secondaryForfaitIds} />
        </section>

        <section className="sl-service-block">
          <h2 className="sl-section-title sl-section-title--left">IA, chatbots &amp; automatisation</h2>
          <p>
            <strong>Le problème :</strong> vous répondez souvent aux mêmes questions ou vous voulez
            orienter les visiteurs sans friction vers le bon formulaire.
          </p>
          <p>
            <strong>La solution :</strong> assistant conversationnel calibré sur vos textes et règles
            (horaires, zones, tarifs indicatifs…). FAQ, qualification de demande ou proposition de
            rendez-vous selon ce qu’on cadrera.
          </p>
          <p>
            <strong>Ce que je ne fais pas :</strong> remplacer tout un service client ni vendre une
            IA sans périmètre mesurable.
          </p>
          <p>
            <strong>Livrables :</strong> scénario validé, intégration au site, brief pour ajuster
            après les premiers retours.
          </p>
          <ForfaitBridge primaryId="sur-mesure" />
        </section>

        <section className="sl-service-block">
          <h2 className="sl-section-title sl-section-title--left">Architecture de données</h2>
          <p>
            <strong>Le problème :</strong> vos outils (CRM, tableurs, formulaires) ne « parlent »
            pas entre eux : doublons, saisie manuelle, vision floue du client ou du dossier.
          </p>
          <p>
            <strong>La solution :</strong> schéma clair des flux, formats d’échange et intégrations
            ciblées pour que les données circulent proprement — sans usine à gaz invisible.
          </p>
          <p>
            <strong>Livrables :</strong> cartographie courte, choix techniques expliqués, premier
            branchement ou POC selon faisabilité — puis feuille de route pour la suite.
          </p>
          <ForfaitBridge primaryId="sur-mesure" />
        </section>

        <section className="sl-service-block">
          <h2 className="sl-section-title sl-section-title--left">Évolutions possibles</h2>
          <p>
            Pas de boutique en ligne pour l’instant ? Pas de souci. Votre vitrine peut évoluer plus
            tard : réservations, paiements, espace membre — on en reparle quand votre activité
            l’exige.
          </p>
          <p style={{ marginTop: "1.5rem" }}>
            <Link to="/forfaits" className="sl-btn sl-btn--primary">
              Voir les forfaits
            </Link>{" "}
            <ContactIntentLink to="/contact" className="sl-btn sl-btn--ghost">
              Parler de mon cas
            </ContactIntentLink>
          </p>
        </section>
      </div>
    </>
  );
}
