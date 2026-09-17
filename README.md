# BF Menuiseries — Saint-Raphaël

Site vitrine **one-page en parallax** pour **BF MENUISERIES** (SARL), menuisier à Saint-Raphaël (Var).

> 61 avenue Ronsard — Les Mas du Haut Peyron A3, 83700 Saint-Raphaël · 06 61 31 36 88
> SARL au RCS de Fréjus · SIREN 529 370 736 · SIRET 529 370 736 00017
> APE 4332A — travaux de menuiserie bois et PVC · créée en 2011 · certifiée Qualibat RGE
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
assets/img/logo-bf.svg        logo officiel vectorisé (fond clair)
assets/img/logo-bf-light.svg  variante claire (en-tête et pied de page foncés)
assets/img/favicon.svg        monogramme BF pour l'onglet du navigateur
assets/img/og.png             image d'aperçu 1200x540 pour les partages
assets/img/projet-*.svg       visuels de démonstration, à échanger contre vos photos
.github/workflows/    déploiement automatique sur GitHub Pages
```

## À personnaliser avant mise en ligne

| Quoi | Où |
|---|---|
| **Vérifier le téléphone** 06 61 31 36 88 (issu des annuaires, non confirmé) | `index.html` — 3 occurrences `tel:+33661313688` |
| E-mail de contact | `index.html` — `#contact` + JSON-LD (`contact@bf-menuiserie.fr` par défaut) |
| Horaires réels | `#contact` + `openingHours` du JSON-LD |
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

## Logo

Le logo a été **revectorisé en SVG** d'après votre fichier : il reste net à toutes les tailles
(2 Ko au lieu d'un PNG), et les couleurs de la charte en découlent —
brun `#6b4230` (le B) et gris aluminium `#b9bdc4` (le F), définis dans `:root`.
Si vous disposez du fichier vectoriel d'origine (AI, EPS ou SVG), remplacez simplement
`logo-bf.svg` et régénérez la variante claire en changeant les `#111` en `#f6f1e9`.

## Ce qui est réel, ce qui ne l'est pas

Les mentions légales, l'adresse, l'année de création et la certification RGE proviennent des sources
publiques (Annuaire des entreprises, Pappers). **Le téléphone et l'e-mail sont des valeurs à compléter.**
La galerie utilise des visuels de démonstration, et le bloc « Nos engagements » remplace des témoignages :
publier de faux avis clients est interdit (pratique commerciale trompeuse, art. L121-2 du Code de la
consommation) et se repère vite. Dès que vous aurez des avis Google, recopiez-les tels quels.

## Accessibilité & performance

- Navigation clavier, lien d'évitement, `aria-expanded` sur le menu.
- `prefers-reduced-motion` : parallax et animations désactivés.
- Parallax en `requestAnimationFrame` + `translate3d`, couches hors écran ignorées.
- Zéro JS bloquant (`defer`), zéro cookie, zéro tracker.

## Brancher les avis Google

La section « Avis » fonctionne sans rien brancher : elle affiche nos engagements.
Dès qu'une source d'avis répond, elle se remplace toute seule par les vrais avis
(note globale, étoiles, trois derniers commentaires, lien vers la fiche).
Si la source tombe en panne, le contenu statique reste affiché — le site ne casse jamais.

Tout se règle dans `index.html`, bloc `window.BF_AVIS` en bas de page :

```js
window.BF_AVIS = {
  endpoint: '',   // l'URL qui renvoie le JSON des avis
  placeId : '',   // identifiant Google de la fiche
  max     : 3,
  noteMini: 4     // les avis en dessous ne s'affichent pas
};
```

**D'abord : récupérer le Place ID.** Sur https://developers.google.com/maps/documentation/places/web-service/place-id,
cherchez « BF Menuiseries Saint-Raphaël ». Collez-le dans `placeId` **et** à la place de
`VOTRE_PLACE_ID` dans le lien « Laissez-nous un avis » (section Avis) — ce lien ouvre
directement le formulaire d'avis Google, c'est le moyen le plus efficace d'en collecter.

Ensuite, trois façons de remplir `endpoint`, de la plus simple à la plus propre :

### Option 1 — widget clé en main (5 minutes, gratuit)

Trustindex, Elfsight ou Widget Reviews proposent une offre gratuite : vous collez un
`<script>` et les avis s'affichent. Aucun code à écrire, mais le rendu suit leur design,
pas le vôtre, et la version gratuite affiche souvent leur marque.
Dans ce cas, laissez `endpoint` vide et remplacez le contenu de `<div id="avis-google">`
par leur script.

### Option 2 — proxy Cloudflare Worker (recommandé, gratuit)

L'API Google Places renvoie les avis en JSON, mais **la clé API ne doit jamais être
dans la page** : elle serait visible de tous. Un Worker Cloudflare (100 000 requêtes/jour
gratuites) la garde côté serveur et met le résultat en cache :

```js
export default {
  async fetch(request, env) {
    const cache = caches.default;
    const hit = await cache.match(request);
    if (hit) return hit;

    const url = `https://maps.googleapis.com/maps/api/place/details/json`
      + `?place_id=${env.PLACE_ID}&fields=rating,user_ratings_total,url,reviews`
      + `&reviews_sort=newest&language=fr&key=${env.GOOGLE_KEY}`;

    const data = (await (await fetch(url)).json()).result || {};
    const res = new Response(JSON.stringify(data), {
      headers: {
        'content-type': 'application/json',
        'access-control-allow-origin': 'https://www.bf-menuiserie.fr',
        'cache-control': 'public, max-age=21600'      // 6 h de cache
      }
    });
    await cache.put(request, res.clone());
    return res;
  }
};
```

`GOOGLE_KEY` et `PLACE_ID` se règlent dans les variables d'environnement du Worker.
Créez la clé sur https://console.cloud.google.com (API « Places API »), restreignez-la
à cette API. Puis mettez l'URL du Worker dans `endpoint`.

⚠️ L'API Places ne renvoie que **5 avis maximum**, choisis par Google. C'est une limite
de Google, pas du site.

### Option 3 — fichier JSON mis à jour à la main

Sans compte ni API : créez `assets/avis.json` au format décrit en tête de
`js/avis-google.js`, recopiez-y vos avis, et mettez `endpoint: 'assets/avis.json'`.
Gratuit et instantané, mais à actualiser vous-même.

### Un mot sur le référencement

Ne faites **pas** ajouter de balisage `AggregateRating` pour des avis Google :
Google interdit de remonter dans ses résultats des avis collectés sur ses propres
plateformes. Les étoiles dans les résultats de recherche viennent de votre fiche
Google Business Profile, pas du site.
