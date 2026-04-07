import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App.tsx";
import { siteConfig } from "./config/site";

/** Titre utile avant hydratation (les pages affinent via <Seo />). */
document.title = `${siteConfig.siteName} | ${siteConfig.siteTagline}`;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
);
