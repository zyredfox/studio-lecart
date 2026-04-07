/** Déclenche le chargement du widget @n8n/chat (scroll, bouton, ou CTA « contact »). */
export const N8N_CHAT_LOAD_EVENT = "studio-lecart:load-n8n-chat";

const SCROLL_TRIGGER_PX = 320;

export function requestN8nChatLoad(): void {
  window.dispatchEvent(new Event(N8N_CHAT_LOAD_EVENT));
}

/** Déclenche `onLoad` une fois le seuil de scroll atteint, ou si déjà scrollé. */
export function subscribeN8nChatScrollTrigger(onLoad: () => void): () => void {
  const tryLoad = () => {
    if (window.scrollY >= SCROLL_TRIGGER_PX) {
      onLoad();
      window.removeEventListener("scroll", tryLoad);
    }
  };
  window.addEventListener("scroll", tryLoad, { passive: true });
  tryLoad();
  return () => window.removeEventListener("scroll", tryLoad);
}
