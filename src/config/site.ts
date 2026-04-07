/** Studio Lecart — données éditables (contact, offres, réalisations). */

export type PackageTier = {
  id: string;
  name: string;
  /** ex. « À partir de 1 200 € » ou « Sur devis » */
  priceLabel: string;
  tagline: string;
  bullets: readonly string[];
  ctaLabel: string;
};

export type CaseStudy = {
  title: string;
  sector: string;
  objective: string;
  delivered: string;
  /** Lien vers le site en ligne ou laisser vide */
  resultUrl?: string;
};

export const siteConfig = {
  siteName: "Studio Lecart",
  /** Apparaît dans <title> avant hydratation et complète le nom dans les métas */
  siteTagline: "Sites vitrine sur mesure & IA",
  /** Meta theme-color (barre d’adresse mobile, etc.) */
  themeColor: "#0d9488",
  /** URL canonique une fois déployé */
  url: "https://example.com",
  email: "contact@studio-lecart.fr",
  phone: "+33600000000",
  phoneDisplay: "06 00 00 00 00",
  /** Lien Cal.com / Calendly — laisser vide pour masquer le bouton */
  calendarUrl: "",
  /**
   * Webhook du Chat Trigger n8n pour le widget @n8n/chat (accueil, mode test).
   * Dans n8n : ajouter l’origine du site (ex. http://localhost:5173 et l’URL de prod) dans « Allowed Origins (CORS) ».
   * Si les messages ne partent pas, essayez la même URL sans le suffixe `/chat` (selon le nœud).
   * Laisser vide pour masquer le widget (sauf si `VITE_N8N_CHAT_WEBHOOK_URL` est défini au build).
   * Désactiver sans retirer l’URL : variable `VITE_N8N_CHAT_ENABLED=false` au build (Netlify, `.env`, etc.).
   */
  n8nChatWebhookUrl:"",
  country: "FR",
  founderName: "Julien Lecart",
  /** Nom de famille seul (SEO « À propos », citations…) */
  founderLastName: "Lecart",
  /** Prénom pour les tournures « je » sur le site */
  founderFirstName: "Julien",
  founderAge: 27,
  founderCity: "Grenoble",
  /** Une ligne sous le portrait (accueil) */
  founderCredentials:
    "Diplômé d’ingénieur · Développeur · Formation data scientist",
  /**
   * Court paragraphe de présentation (ton perso, affiché accueil + à propos).
   */
  founderIntro:
    "Je relie le développement web rigoureux et la culture data : des sites nets et maintenables, et des briques IA quand elles servent vraiment votre métier — pas pour la frime.",
  /** Adresse à reporter dans les mentions légales */
  addressLine: "Grenoble — adresse complète à compléter",
  siret: "SIRET à compléter",
  /** Barre de confiance (accueil) */
  trustSectors: ["Artisans", "Associations", "Indépendants", "TPE"] as const,
  /**
   * Pastilles hero après la ville (la ville utilise `founderCity`).
   * Tokens : utiliser `applySiteTokens` si vous ajoutez {siteName}, {founderCity}, etc.
   */
  heroPillsAfterCity: ["Ingénieur", "Dev", "Culture data"] as const,
  /** Kicker de la section « Services IA & web » */
  servicesIaSectionKicker: "Offres Studio",
  /** Témoignage fictif : tokens {founderFirstName}, {founderName}, {siteName}, {founderCity} */
  placeholderTestimonialQuote:
    "« On voulait un site honnête et lisible ; {founderFirstName} a tenu les délais et a su vulgariser sans nous prendre pour des idiots. »",
  placeholderTestimonialFooter: "— Exemple de formulation — à remplacer par un vrai client",
  /** Fenêtre démo « agent » (accueil) */
  showcaseDemoChatTitle: "Assistant {siteName} (démo)",
  /** Widget n8n : message d’accueil (tokens acceptés) */
  n8nChatInitialGreeting:
    "Bonjour — je peux vous orienter sur les services de {siteName}. Une question en tête ?",
} as const;

function envDisablesN8nChat(value: string | undefined): boolean {
  if (value === undefined || value === "") return false;
  const v = value.trim().toLowerCase();
  return v === "0" || v === "false" || v === "off" || v === "no";
}

/** URL webhook pour @n8n/chat : `VITE_N8N_CHAT_WEBHOOK_URL` (build) puis repli sur `siteConfig`. */
export function getN8nChatWebhookUrl(): string {
  const fromEnv = import.meta.env.VITE_N8N_CHAT_WEBHOOK_URL?.trim();
  if (fromEnv) return fromEnv;
  return String(siteConfig.n8nChatWebhookUrl ?? "").trim();
}

/** Widget affiché seulement si une URL webhook existe et que le build n’a pas `VITE_N8N_CHAT_ENABLED=false`. */
export function isN8nChatEnabled(): boolean {
  if (envDisablesN8nChat(import.meta.env.VITE_N8N_CHAT_ENABLED)) return false;
  return getN8nChatWebhookUrl().length > 0;
}

/** Remplace {siteName}, {founderFirstName}, {founderName}, {founderCity}, {founderLastName} dans une chaîne. */
export function applySiteTokens(text: string): string {
  return text
    .replace(/\{siteName\}/g, siteConfig.siteName)
    .replace(/\{founderFirstName\}/g, siteConfig.founderFirstName)
    .replace(/\{founderName\}/g, siteConfig.founderName)
    .replace(/\{founderLastName\}/g, siteConfig.founderLastName)
    .replace(/\{founderCity\}/g, siteConfig.founderCity);
}

/** Meta description page d’accueil */
export function seoHomeDescription(): string {
  return `${siteConfig.siteName} à ${siteConfig.founderCity} : ${siteConfig.founderName}, ingénieur & développeur — sites vitrine sur mesure, SEO de base, IA et chatbots utiles.`;
}

/** Meta description page À propos */
export function seoAProposDescription(): string {
  return `${siteConfig.founderFirstName} ${siteConfig.founderLastName} — ${siteConfig.founderAge} ans, ${siteConfig.founderCity}. Ingénieur, développeur, formation data scientist. ${siteConfig.siteName}, sites vitrine et IA utile.`;
}

/** Piste A : Essentiel / Pro / Sur mesure + IA — prix indicatifs, ajustables. */
export const packages: readonly PackageTier[] = [
  {
    id: "essentiel",
    name: "Essentiel",
    priceLabel: "À partir de 1 200 €",
    tagline: "Vitrine claire, vite en ligne.",
    bullets: [
      "1 à 3 pages (accueil, services, contact)",
      "Design adapté mobile & tablette",
      "Formulaire de contact sécurisé",
      "Mise en ligne & nom de domaine (selon option)",
      "Mini formation pour mettre à jour vos textes",
    ],
    ctaLabel: "En parler",
  },
  {
    id: "pro",
    name: "Pro",
    priceLabel: "À partir de 2 500 €",
    tagline: "Plus de contenu, plus de visibilité.",
    bullets: [
      "Jusqu’à 8 pages ou blog / actualités",
      "SEO de base (titres, structure, vitesse)",
      "Composants sur mesure (sections, galeries…)",
      "Intégration réseaux & outils tiers simples",
      "Accompagnement renforcé à la livraison",
    ],
    ctaLabel: "Demander un devis",
  },
  {
    id: "sur-mesure",
    name: "Sur mesure & IA",
    priceLabel: "Sur devis",
    tagline: "Automatisation, chatbot, intégrations.",
    bullets: [
      "Parcours sur mesure (prise de rendez-vous, qualification…)",
      "Chatbot / FAQ intelligente sur votre site",
      "Agents ou workflows connectés à vos outils (selon faisabilité)",
      "Évolutions e-commerce ou réservations : on cadrera plus tard",
      "Maintenance & évolutions en option mensuelle",
    ],
    ctaLabel: "Décrire mon besoin",
  },
] as const;

export type PackageId = (typeof packages)[number]["id"];

/** Les 3 piliers (accueil) → forfaits recommandés (page Services & renvois). */
export const servicePillarsForfaits = [
  {
    key: "vitrine",
    title: "Sites vitrines haute performance",
    blurb: "Vitesse, Core Web Vitals, structure SEO et clarté pour vos visiteurs.",
    primaryForfaitId: "pro" as const,
    secondaryForfaitIds: ["essentiel"] as const,
  },
  {
    key: "agents",
    title: "Automatisation & agents IA",
    blurb: "LLM, chatbots et workflows reliés à vos outils, avec garde-fous.",
    primaryForfaitId: "sur-mesure" as const,
    secondaryForfaitIds: [] as const,
  },
  {
    key: "data",
    title: "Architecture de données",
    blurb: "CRM, formulaires et systèmes qui communiquent sans silos opaques.",
    primaryForfaitId: "sur-mesure" as const,
    secondaryForfaitIds: [] as const,
  },
] as const;

export function getPackageById(id: PackageId): PackageTier | undefined {
  return packages.find((p) => p.id === id);
}

/** Études de cas — à personnaliser avec vos vrais projets. */
export const caseStudies: readonly CaseStudy[] = [
  {
    title: "Vitrine artisanale locale",
    sector: "Artisanat",
    objective: "Exister sur le web avec coordonnées, zone d’intervention et prise de contact simple.",
    delivered: "Site 3 pages, formulaire, fiche Google Business reliée, temps de chargement optimisé.",
    resultUrl: "",
  },
  {
    title: "Site associatif",
    sector: "Association",
    objective: "Présenter l’équipe, les actions et recueillir les adhésions par formulaire.",
    delivered: "Pages modulables, section actualités, liens vers les réseaux sociaux.",
    resultUrl: "",
  },
  {
    title: "Indépendant B2B",
    sector: "Conseil",
    objective: "Crédibiliser l’offre et filtrer les demandes avant le premier appel.",
    delivered: "Pages services, témoignages, formulaire qualifié + rappel des disponibilités.",
    resultUrl: "",
  },
] as const;
