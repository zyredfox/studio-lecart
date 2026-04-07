import { Link, type LinkProps } from "react-router-dom";
import { requestN8nChatLoad } from "../lib/n8nChatGate";

/** Lien vers Contact : précharge le widget chat n8n pour les visiteurs qui veulent écrire. */
export function ContactIntentLink({ onClick, ...props }: LinkProps) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        requestN8nChatLoad();
        onClick?.(e);
      }}
    />
  );
}
