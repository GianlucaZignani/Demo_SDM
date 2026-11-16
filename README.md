# App civica - Comune di San Donato Milanese

SPA statica (HTML5 + Tailwind CDN + JavaScript ES6, Leaflet per le mappe). Nessuna build: carica la cartella su GitHub e attiva GitHub Pages.

## Struttura
```
index.html              guscio della pagina (header, menu, contenitori)
css/style.css           tema chiaro/scuro e componenti
js/config.js            percorsi immagini, logo, helper
js/state.js             stato in localStorage, traduzioni, utilità
js/data.js              luoghi, notifiche, eventi, servizi, cariche
js/core.js              router, menu, mini-mappe
js/views/               una schermata per file (home, notifiche, eventi, servizi,
                        amministrazione, contatti, pagamenti, segnalazioni, account)
js/main.js              avvio
img/                    logo.png, sindaco.jpg, luoghi/, notifiche/, eventi/
```
L'ordine di caricamento degli script in `index.html` va mantenuto (config, state, data, core, views, main).
