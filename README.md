# BF Menuiserie — Saint-Raphaël

Site vitrine **one-page en parallax** pour BF Menuiserie (menuisier à Saint-Raphaël, Var).
HTML / CSS / JavaScript pur : aucun framework, aucune étape de build, aucune dépendance payante.

## Aperçu local

```bash
python3 -m http.server 8000
# puis http://localhost:8000
```

## Structure

```
index.html            page unique (hero, savoir-faire, réalisations, méthode, avis, contact)
css/style.css         design system (couleurs, typo, composants, responsive)
js/main.js            parallax, apparitions au scroll, compteurs, menu mobile
assets/img/*.svg      visuels de remplacement, à échanger contre vos photos
.github/workflows/    déploiement automatique sur GitHub Pages
```

## À personnaliser avant mise en ligne

| Quoi | Où |
|---|---|
| Téléphone, e-mail, adresse, SIRET | `index.html` — section `#contact`, footer, bloc JSON-LD |
| Formulaire de contact | `index.html` — `action="https://formspree.io/f/VOTRE_ID"` (Formspree, 50 messages/mois gratuits) |
| Photos des chantiers | remplacer `assets/img/projet-1..4.svg` par vos `.jpg`, puis ajuster les 4 règles `.shot__img--N` dans `css/style.css` |
| Fond du hero | `.hero__layer--wood` / `--hill` dans `css/style.css` |
| Couleurs | variables `:root` en haut de `css/style.css` |
| Nom de domaine | `<link rel="canonical">` + fichier `CNAME` (voir ci-dessous) |

Pour les photos : exportez en **WebP ou JPEG < 300 Ko**, largeur 1600 px max (Squoosh.app, gratuit).

## Mise en ligne gratuite

**Option A — GitHub Pages** (déjà configuré) : Settings → Pages → Source = *GitHub Actions*.
Chaque push sur la branche par défaut publie le site. Domaine perso : ajoutez un fichier
`CNAME` contenant `www.bf-menuiserie.fr` et un enregistrement DNS CNAME vers `<user>.github.io`.

**Option B — Netlify ou Cloudflare Pages** : connectez le dépôt, pas de commande de build,
dossier à publier = la racine. HTTPS et domaine personnalisé inclus.

## Outils gratuits utilisés / recommandés

- **Polices** : Google Fonts (Fraunces + Inter) — licence libre, usage commercial autorisé.
- **Formulaire** : Formspree (gratuit) ou Web3Forms.
- **Compression d'images** : Squoosh.
- **Analytics sans cookie** : Umami Cloud (offre gratuite) ou GoatCounter.
- **Référencement local** : créez une fiche **Google Business Profile** « BF Menuiserie, Saint-Raphaël » —
  c'est le levier n°1 pour un artisan, devant le site lui-même.

## Accessibilité & performance

- Navigation clavier, lien d'évitement, `aria-expanded` sur le menu.
- `prefers-reduced-motion` : parallax et animations désactivés.
- Parallax en `requestAnimationFrame` + `translate3d`, couches hors écran ignorées.
- Zéro JS bloquant (`defer`), zéro cookie, zéro tracker.
