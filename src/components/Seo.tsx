import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { siteConfig } from "../config/site";

type SeoProps = {
  title: string;
  description: string;
};

export function Seo({ title, description }: SeoProps) {
  const fullTitle = `${title} | ${siteConfig.siteName}`;
  const { pathname } = useLocation();
  const canonicalUrl = `${siteConfig.url}${pathname === "/" ? "" : pathname}`;

  return (
    <Helmet htmlAttributes={{ lang: "fr" }}>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: siteConfig.siteName,
          description: `${siteConfig.founderName}, ingénieur & développeur à ${siteConfig.founderCity} — sites vitrine sur mesure, SEO de base, IA et chatbots utiles pour TPE et indépendants.`,
          url: siteConfig.url,
          founder: {
            "@type": "Person",
            name: siteConfig.founderName,
          },
          address: {
            "@type": "PostalAddress",
            addressLocality: siteConfig.founderCity,
            addressCountry: siteConfig.country,
          },
        })}
      </script>
    </Helmet>
  );
}
