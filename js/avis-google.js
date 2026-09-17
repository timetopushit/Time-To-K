/* =========================================================
   Avis Google — branchement en une ligne de configuration
   ---------------------------------------------------------
   Tant que window.BF_AVIS.endpoint est vide, la section garde
   son contenu statique (« Nos engagements ») : rien ne casse.
   Dès qu'un endpoint renvoie du JSON, les vrais avis s'affichent.

   Format JSON attendu (celui de l'API Google Places, champ par champ) :
   {
     "rating": 4.8,
     "user_ratings_total": 27,
     "url": "https://maps.google.com/?cid=...",
     "reviews": [
       { "author_name": "Claire M.", "rating": 5, "relative_time_description": "il y a 2 mois",
         "text": "…", "profile_photo_url": "https://…" }
     ]
   }
   ========================================================= */
(() => {
  const cfg = window.BF_AVIS || {};
  const zone = document.getElementById('avis-google');
  if (!zone || !cfg.endpoint) return;           // pas configuré → on garde le statique

  const etoiles = (n) => {
    const pleines = Math.round(n);
    return `<span class="etoiles" aria-label="${n} sur 5">${'★'.repeat(pleines)}<span class="etoiles--off">${'★'.repeat(5 - pleines)}</span></span>`;
  };
  const echappe = (t) => String(t ?? '').replace(/[<>&"]/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]));

  fetch(cfg.endpoint, { headers: { Accept: 'application/json' } })
    .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
    .then(d => {
      const avis = (d.reviews || []).filter(a => a.text && a.rating >= (cfg.noteMini ?? 4));
      if (!avis.length) return;                  // rien d'exploitable → on garde le statique

      const tete = d.rating ? `
        <div class="avis-note reveal">
          ${etoiles(d.rating)}
          <b>${d.rating.toFixed(1)}</b>
          <span>sur ${d.user_ratings_total} avis Google</span>
        </div>` : '';

      const cartes = avis.slice(0, cfg.max ?? 3).map(a => `
        <blockquote class="reveal">
          ${etoiles(a.rating)}
          <p>${echappe(a.text)}</p>
          <cite>${echappe(a.author_name)}${a.relative_time_description ? ' · ' + echappe(a.relative_time_description) : ''}</cite>
        </blockquote>`).join('');

      const lien = d.url ? `<p class="avis-lien reveal"><a href="${echappe(d.url)}" target="_blank" rel="noopener">Voir tous les avis sur Google →</a></p>` : '';

      zone.innerHTML = tete + `<div class="quotes">${cartes}</div>` + lien;
      zone.querySelectorAll('.reveal').forEach(el => el.classList.add('is-in'));
      document.getElementById('avis-titre').textContent = 'Ce que disent nos clients';
      document.getElementById('avis-eyebrow').textContent = 'Avis Google';
    })
    .catch(err => console.warn('[avis Google] indisponible, contenu statique conservé :', err.message));
})();
