/* Configurazione immagini, logo e helper DOM */
/* ============ IMMAGINI ============
   Copia i file nella cartella /img del repository (stessi nomi qui sotto).
   Se un file manca, l'app mostra un segnaposto al suo posto. */
const IMG={
  logo:'img/logo.png',
  luoghi:'img/luoghi/',      // farmacia-metanopoli.jpg, parco-mattei.jpg, ...
  notifiche:'img/notifiche/',// street-food.jpg, sciopero.jpg, paullese.jpg, tributi.jpg
  eventi:'img/eventi/',      // pulci.jpg, cam.jpg
  sindaco:'img/sindaco.jpg'
};
function im(src,st,icon){return `<img src="${src}" data-i="${icon||'fa-image'}" style="${st}" alt="" onerror="phf(this)">`}
function phf(e){const d=document.createElement('div');d.className='ph';d.style.cssText=e.style.cssText;d.innerHTML='<i class="fa-solid '+e.dataset.i+'"></i>';e.replaceWith(d)}
const LOGO_FB=`<span style="display:flex;align-items:center;gap:8px"><svg width="40" height="46" viewBox="0 0 30 34"><path d="M2 2h26v17c0 7-6 11-13 14C8 30 2 26 2 19z" fill="#1F6FB5"/><path d="M15 7l2.500 5.500H23l-4.500 3.500 1.700 5.500L15 18l-5.200 3.500 1.700-5.500L7 12.500h5.500z" fill="#FFD60A"/></svg><span style="text-align:left;font-size:9px;line-height:1.1;font-weight:700;color:var(--tx)">COMUNE DI<br><b style="font-size:13px">SAN DONATO<br>MILANESE</b></span></span>`;
$('#logo').innerHTML=`<img src="${IMG.logo}" alt="Comune di San Donato Milanese" style="height:56px;width:auto" onerror="this.parentNode.innerHTML=LOGO_FB">`;
function $(s){return document.querySelector(s)}
