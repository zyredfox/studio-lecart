import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App.tsx";
import { siteConfig } from "./config/site";

/** Cohérent avec index.html et la page d’accueil (<Seo title="Accueil" />). */
document.title = `Accueil | ${siteConfig.siteName}`;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
);
