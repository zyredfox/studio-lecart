# Studio Lecart — Site vitrine

Site vitrine pour **Studio Lecart** : présentation des services web, forfaits, méthode, réalisations et contact. Contenu éditable centralisé, SEO par page (React Helmet), et widget de chat branché sur **n8n** (`@n8n/chat`).

## Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite 6](https://vitejs.dev/)
- [React Router](https://reactrouter.com/) (SPA)
- [react-helmet-async](https://github.com/staylor/react-helmet-async) (balises `<title>` et métas)
- [@n8n/chat](https://www.npmjs.com/package/@n8n/chat) (optionnel, si URL de webhook renseignée)

## Prérequis

- [Node.js](https://nodejs.org/) (LTS recommandé, ≥ 18) 
test

## Démarrage local

```bash
npm install
npm run dev
```

L’app tourne par défaut sur le port **5175** (voir `vite.config.ts`).

## Scripts

| Commande        | Rôle                                      |
|-----------------|-------------------------------------------|
| `npm run dev`   | Serveur de développement avec rechargement |
| `npm run build` | Vérification TypeScript + build production  |
| `npm run preview` | Prévisualiser le dossier `dist`         |
| `npm run lint`  | ESLint                                    |

## Personnalisation du contenu

Les textes, coordonnées, offres, URL canonique et paramètres du chat sont dans **`src/config/site.ts`**.

Points utiles :

- **`siteConfig.url`** : URL publique du site (SEO / canonique) — à mettre à jour avec ton domaine Netlify ou custom.
- **`n8nChatWebhookUrl`** : URL du webhook Chat Trigger n8n. Vide = le widget n’apparaît pas. Dans n8n, ajoute les origines autorisées (CORS) : `http://localhost:5175` en dev et l’URL de production.

## Déploiement (Netlify)

Le dépôt peut être relié à Netlify avec par exemple :

- **Branche** : `main`
- **Commande de build** : `npm run build`
- **Répertoire de publication** : `dist`

Pour une SPA avec React Router, configure une redirection « toutes les routes → `index.html` » (statut 200), par exemple un fichier `public/_redirects` :

```text
/*    /index.html   200
```

Chaque push sur la branche de production redéclenche un déploiement si le dépôt est connecté à Netlify.

## Structure (aperçu)

- `src/pages/` — pages (accueil, services, forfaits, etc.)
- `src/components/` — layout, SEO, blocs réutilisables, widget n8n
- `src/config/site.ts` — contenu et réglages du site
- `src/styles/site.css` — styles globaux

## Licence

Projet **privé** — droits réservés.
