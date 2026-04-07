import { Link } from "react-router-dom";
import { useState } from "react";
import type { FormEvent } from "react";
import { Seo } from "../components/Seo";
import { siteConfig } from "../config/site";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contact site — ${name || "Sans nom"}`);
    const body = encodeURIComponent(
      `Bonjour,\n\n${message}\n\n---\n${email ? `Réponse souhaitée à : ${email}` : ""}`,
    );
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <Seo
        title="Contact"
        description={`Contactez ${siteConfig.siteName} pour un devis ou un échange sur votre projet vitrine ou IA.`}
      />

      <header className="sl-page-head">
        <div className="sl-page-head-inner">
          <h1 className="sl-page-title">Contact</h1>
          <p className="sl-page-lead">
            Décrivez votre projet en quelques lignes —{" "}
            <strong>{siteConfig.founderFirstName}</strong> ({siteConfig.founderCity}) vous répond sous
            quelques jours ouvrés.
          </p>
        </div>
      </header>

      <div className="sl-container" style={{ paddingBottom: "4rem" }}>
        <div className="sl-form">
          <p style={{ textAlign: "center", marginBottom: "1.5rem", color: "var(--sl-ink-muted)" }}>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            {" · "}
            <a href={`tel:${siteConfig.phone}`}>{siteConfig.phoneDisplay}</a>
          </p>
          {siteConfig.calendarUrl ? (
            <p style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <a href={siteConfig.calendarUrl} className="sl-btn sl-btn--ghost" target="_blank" rel="noopener noreferrer">
                Réserver un créneau
              </a>
            </p>
          ) : null}

          <form onSubmit={submit}>
            <div className="sl-field">
              <label htmlFor="name">Nom</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="sl-field">
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="sl-field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Votre activité, ce que vous cherchez, vos délais…"
              />
            </div>
            <button type="submit" className="sl-btn sl-btn--primary" style={{ width: "100%" }}>
              Envoyer par e-mail
            </button>
          </form>
          <p style={{ fontSize: "0.8125rem", color: "var(--sl-ink-muted)", marginTop: "1rem", textAlign: "center" }}>
            En envoyant, votre boîte mail s’ouvre avec le message prérempli — aucune donnée
            n’est stockée sur ce site.
          </p>
        </div>

        <p style={{ textAlign: "center", marginTop: "2rem" }}>
          <Link to="/forfaits">Voir les forfaits</Link>
        </p>
      </div>
    </>
  );
}
