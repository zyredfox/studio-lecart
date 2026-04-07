import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ContactIntentLink } from "../ContactIntentLink";
import { applySiteTokens, siteConfig } from "../../config/site";

type Phase = "idle" | "user" | "typing" | "agent" | "tool" | "done";

const MESSAGES = {
  user: "Bonjour, je souhaite reporter ma livraison au 12 avril.",
  agent:
    "J’ai bien noté la demande. Je vérifie les créneaux et prépare le dossier pour l’équipe logistique.",
} as const;

export function AiAgentShowcase() {
  const [lines, setLines] = useState<{ role: "user" | "agent"; text: string }[]>([]);
  const [phase, setPhase] = useState<Phase>("idle");
  const [flowStep, setFlowStep] = useState(0);
  const timeoutsRef = useRef<number[]>([]);

  const pushTimeout = (id: number) => {
    timeoutsRef.current.push(id);
  };

  useEffect(() => {
    const clear = () => {
      timeoutsRef.current.forEach((t) => window.clearTimeout(t));
      timeoutsRef.current = [];
    };

    const schedule = (fn: () => void, ms: number) => {
      pushTimeout(window.setTimeout(fn, ms));
    };

    const runCycle = () => {
      clear();
      setLines([]);
      setFlowStep(0);
      setPhase("idle");

      schedule(() => setPhase("user"), 400);
      schedule(() => {
        setLines([{ role: "user", text: MESSAGES.user }]);
        setFlowStep(1);
      }, 900);

      schedule(() => {
        setPhase("typing");
        setFlowStep(2);
      }, 2200);

      schedule(() => {
        setPhase("agent");
        setLines((prev) => [...prev, { role: "agent", text: MESSAGES.agent }]);
        setFlowStep(3);
      }, 3400);

      schedule(() => {
        setPhase("tool");
        setFlowStep(4);
      }, 4800);

      schedule(() => {
        setPhase("done");
        setFlowStep(5);
      }, 6200);

      schedule(() => runCycle(), 9200);
    };

    runCycle();
    return clear;
  }, []);

  const flowLabels = ["Message client", "Agent LLM", "Action CRM"];
  const activeNode = flowStep >= 5 ? 2 : flowStep >= 2 ? 1 : flowStep >= 1 ? 0 : -1;

  return (
    <section className="sl-section sl-showcase-section" aria-labelledby="showcase-title">
      <div className="sl-container">
        <p className="sl-kicker sl-kicker--center">Preuve de concept</p>
        <h2 id="showcase-title" className="sl-section-title">
          Un agent IA en action
        </h2>
        <p className="sl-section-lead">
          Démo stylisée : le message arrive, l’agent comprend le contexte, puis une action est préparée dans
          votre outil métier — le tout orchestré proprement côté API.
        </p>

        <div className="sl-showcase-grid">
          <div className="sl-showcase-flow" role="region" aria-labelledby="showcase-flow-heading">
            <p id="showcase-flow-heading" className="sl-sr-only">
              Schéma animé en trois étapes : message client, traitement par un agent, action vers un outil métier.
            </p>
            <div className="sl-showcase-flow-inner" role="list">
              {flowLabels.map((label, i) => (
                <div key={label} className="sl-showcase-flow-track" role="listitem">
                  <div
                    className={`sl-showcase-flow-node${activeNode === i ? " sl-showcase-flow-node--active" : ""}${activeNode !== -1 && i < activeNode ? " sl-showcase-flow-node--past" : ""}`}
                    aria-current={activeNode === i ? "step" : undefined}
                  >
                    <span className="sl-showcase-flow-index" aria-hidden="true">
                      {i + 1}
                    </span>
                    <span className="sl-showcase-flow-label">{label}</span>
                  </div>
                  {i < flowLabels.length - 1 ? (
                    <div
                      className={`sl-showcase-flow-arrow${flowStep > i + 1 ? " sl-showcase-flow-arrow--done" : ""}`}
                      aria-hidden="true"
                    >
                      <span />
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
            <p className="sl-showcase-flow-caption">
              Flux simplifié — vos règles métier décident ce qui est automatisé ou escaladé à un humain.
            </p>
          </div>

          <div
            className="sl-showcase-chat"
            role="region"
            aria-label={`Simulation visuelle d’une conversation client (démo ${siteConfig.siteName})`}
            aria-describedby="showcase-chat-hint"
          >
            <div className="sl-showcase-chat-chrome">
              <span className="sl-showcase-chat-dots" aria-hidden>
                <span />
                <span />
                <span />
              </span>
              <span className="sl-showcase-chat-title">
                {applySiteTokens(siteConfig.showcaseDemoChatTitle)}
              </span>
            </div>
            <div className="sl-showcase-chat-body">
              {lines.length === 0 && phase === "idle" ? (
                <p className="sl-showcase-chat-placeholder">La conversation démarre…</p>
              ) : null}
              {lines.map((line, idx) => (
                <div key={`${line.role}-${idx}`} className={`sl-showcase-bubble sl-showcase-bubble--${line.role}`}>
                  {line.text}
                </div>
              ))}
              {phase === "typing" ? (
                <div className="sl-showcase-bubble sl-showcase-bubble--agent sl-showcase-bubble--typing" aria-live="polite">
                  <span className="sl-typing-dot" />
                  <span className="sl-typing-dot" />
                  <span className="sl-typing-dot" />
                </div>
              ) : null}
              {phase === "tool" || phase === "done" ? (
                <div className="sl-showcase-toast" role="status">
                  <strong>Brouillon CRM</strong>
                  <span>Livraison reportée au 12/04 · notification logistique</span>
                </div>
              ) : null}
            </div>
            <div className="sl-showcase-chat-foot">
              <span id="showcase-chat-hint" className="sl-showcase-chat-hint">
                Animation illustrative — pas une vraie IA ici.
              </span>
            </div>
          </div>
        </div>

        <div className="sl-showcase-cta">
          <ContactIntentLink to="/contact" className="sl-btn sl-btn--primary">
            Parler d’un agent sur votre cas
          </ContactIntentLink>
          <Link to="/services" className="sl-btn sl-btn--ghost">
            Voir le détail des services
          </Link>
        </div>
      </div>
    </section>
  );
}
