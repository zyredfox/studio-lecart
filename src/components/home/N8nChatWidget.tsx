import { useEffect, useState } from "react";
import type { App } from "vue";
import { applySiteTokens, getN8nChatWebhookUrl, isN8nChatEnabled, siteConfig } from "../../config/site";
import { N8N_CHAT_LOAD_EVENT, subscribeN8nChatScrollTrigger } from "../../lib/n8nChatGate";

function isChatPanelVisible(): boolean {
  const el = document.querySelector<HTMLElement>("#n8n-chat .chat-window");
  if (!el) return false;
  return el.getClientRects().length > 0 && getComputedStyle(el).display !== "none";
}

/** Un clic sur le toggle n8n ouvre le panneau (état initial : fermé). Après un clic « Assistant IA », on le déclenche une fois le widget monté. */
function scheduleOpenN8nChatPanel(isCancelled: () => boolean) {
  let frames = 0;
  const maxFrames = 45;

  const tick = () => {
    if (isCancelled()) return;
    const btn = document.querySelector<HTMLElement>("#n8n-chat .chat-window-toggle");
    if (btn) {
      btn.click();
      queueMicrotask(() => {
        if (isCancelled()) return;
        document.querySelector<HTMLElement>("#n8n-chat textarea")?.focus();
      });
      return;
    }
    frames += 1;
    if (frames < maxFrames) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

type BootState = { expandPanelOnReady: boolean };

/** Charge createChat + CSS seulement après intention utilisateur (scroll ou action). */
function N8nChatBoot({ expandPanelOnReady }: BootState) {
  useEffect(() => {
    const webhookUrl = getN8nChatWebhookUrl();
    if (!webhookUrl) return;

    const mq = window.matchMedia("(max-width: 1023px)");
    let savedScrollY = 0;
    let cancelled = false;
    let app: App<Element> | null = null;
    let observer: MutationObserver | null = null;
    let onMqChange: (() => void) | null = null;

    const unlockBody = () => {
      document.body.classList.remove("sl-n8n-chat-open-mobile");
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.left = "";
    };

    const syncBodyScrollLock = () => {
      if (!mq.matches) {
        if (document.body.classList.contains("sl-n8n-chat-open-mobile")) {
          window.scrollTo(0, savedScrollY);
        }
        unlockBody();
        return;
      }

      if (isChatPanelVisible()) {
        if (!document.body.classList.contains("sl-n8n-chat-open-mobile")) {
          savedScrollY = window.scrollY;
          document.body.style.top = `-${savedScrollY}px`;
          document.body.classList.add("sl-n8n-chat-open-mobile");
          document.body.style.overflow = "hidden";
          document.body.style.position = "fixed";
          document.body.style.width = "100%";
          document.body.style.left = "0";
        }
      } else if (document.body.classList.contains("sl-n8n-chat-open-mobile")) {
        unlockBody();
        window.scrollTo(0, savedScrollY);
      }
    };

    void (async () => {
      await import("@n8n/chat/style.css");
      const { createChat } = await import("@n8n/chat");
      if (cancelled) return;

      app = createChat({
        webhookUrl,
        mode: "window",
        showWelcomeScreen: false,
        initialMessages: [applySiteTokens(siteConfig.n8nChatInitialGreeting)],
        i18n: {
          en: {
            title: siteConfig.siteName,
            subtitle: "",
            footer: "",
            getStarted: "Nouvelle conversation",
            inputPlaceholder: "Votre message…",
            closeButtonTooltip: "Fermer le chat",
          },
        },
      });

      if (cancelled) {
        app.unmount();
        app = null;
        document.getElementById("n8n-chat")?.remove();
        return;
      }

      onMqChange = () => syncBodyScrollLock();
      const root = document.getElementById("n8n-chat");
      if (root) {
        observer = new MutationObserver(() => {
          queueMicrotask(syncBodyScrollLock);
        });
        observer.observe(root, {
          subtree: true,
          attributes: true,
          attributeFilter: ["style", "class"],
        });
      }

      if (typeof mq.addEventListener === "function") {
        mq.addEventListener("change", onMqChange);
      } else {
        mq.addListener(onMqChange);
      }

      requestAnimationFrame(syncBodyScrollLock);

      if (expandPanelOnReady) {
        scheduleOpenN8nChatPanel(() => cancelled);
      }
    })();

    return () => {
      cancelled = true;
      observer?.disconnect();
      if (onMqChange) {
        if (typeof mq.removeEventListener === "function") {
          mq.removeEventListener("change", onMqChange);
        } else {
          mq.removeListener(onMqChange);
        }
      }
      unlockBody();
      window.scrollTo(0, savedScrollY);
      app?.unmount();
      document.getElementById("n8n-chat")?.remove();
    };
  }, [expandPanelOnReady]);

  return null;
}

/**
 * N’importe pas @n8n/chat tant que l’utilisateur n’a pas scrollé (~320px), cliqué « Assistant IA »,
 * ou pris un lien contact (`ContactIntentLink` déclenche l’événement global).
 */
export function N8nChatWidget() {
  const [boot, setBoot] = useState<BootState | null>(null);

  useEffect(() => {
    if (!isN8nChatEnabled()) return;
    const webhookUrl = getN8nChatWebhookUrl();
    if (!webhookUrl) return;

    const arm = () =>
      setBoot((prev) => {
        if (prev) return prev;
        return { expandPanelOnReady: false };
      });
    window.addEventListener(N8N_CHAT_LOAD_EVENT, arm);
    const removeScroll = subscribeN8nChatScrollTrigger(arm);

    return () => {
      window.removeEventListener(N8N_CHAT_LOAD_EVENT, arm);
      removeScroll();
    };
  }, []);

  if (!isN8nChatEnabled()) return null;

  if (!boot) {
    return (
      <button
        type="button"
        className="sl-n8n-chat-launch"
        onClick={() => setBoot({ expandPanelOnReady: true })}
        aria-label="Ouvrir l’assistant conversationnel (chargement du module si besoin)."
      >
        Assistant IA
      </button>
    );
  }

  return <N8nChatBoot expandPanelOnReady={boot.expandPanelOnReady} />;
}
