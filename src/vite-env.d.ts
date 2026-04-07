/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** `false` / `0` / `off` / `no` → masque le widget (même si `n8nChatWebhookUrl` est renseigné). */
  readonly VITE_N8N_CHAT_ENABLED?: string;
  /** Surcharge du webhook ; prioritaire sur `siteConfig.n8nChatWebhookUrl`. */
  readonly VITE_N8N_CHAT_WEBHOOK_URL?: string;
}
