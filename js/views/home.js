/* Schermata Home: mappa, filtro, scheda luogo */
/* ============ HOME ============ */
let F='Tutto',Q='',markers=[],me=null,cl=null,selM=null;
const CAT_ICON={'Istruzione':'fa-graduation-cap','Sanità e assistenza':'fa-kit-medical','Servizi':'fa-building-columns','Sicurezza':'fa-shield-halved','Verde e svago':'fa-tree','Servizi urbani':'fa-city','Ristoranti':'fa-utensils','Hotel':'fa-bed'};
function home(A){
  A.innerHTML=`<div class="mapwrap"><div id="map" style="position:absolute;inset:0"></div>
  <div class="mpanel"><div style="display:flex;gap:10px;align-items:center">
  <button onclick="$('#fp').classList.toggle('hidden')" style="background:none;border:0;color:var(--tx);display:flex;flex-direction:column;align-items:center;font-size:11px;cursor:pointer"><i class="fa-solid fa-filter" style="font-size:22px"></i>${t('Filtro')}</button>
  <div class="sr"><input id="q" value="${esc(Q)}" placeholder="${t('Cerca i luoghi vicini a te...')}" oninput="Q=this.value;mark()"><i class="fa-solid fa-magnifying-glass mut"></i></div></div>
  <div id="fp" class="hidden" style="position:absolute;left:14px;top:84px;width:210px;background:var(--card);border-radius:18px;box-shadow:0 8px 24px rgba(0,0,0,.35);max-height:55vh;overflow:auto"></div></div>
  <button onclick="locate()" aria-label="La mia posizione" style="position:absolute;right:14px;bottom:24px;z-index:900;width:46px;height:46px;border-radius:50%;border:0;background:var(--card);color:var(--pr2);font-size:20px;box-shadow:0 2px 8px rgba(0,0,0,.4);cursor:pointer"><i class="fa-solid fa-location-arrow"></i></button></div>`;
  map=L.map('map',{zoomControl:false,attributionControl:false,minZoom:11,maxZoom:19}).setView([45.4115,9.2715],14);
  L.control.zoom({position:'bottomright'}).addTo(map);
  L.control.attribution({position:'bottomleft',prefix:false}).addTo(map);
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',{maxZoom:19,attribution:'Immagini © Esri'}).addTo(map);
  map.on('click',()=>{closeSheet();$('#fp').classList.add('hidden')});
  map.on('zoomend moveend',()=>setTimeout(updateLabels,70));
  cl=L.markerClusterGroup?L.markerClusterGroup({maxClusterRadius:46,showCoverageOnHover:false,spiderfyOnMaxZoom:true,disableClusteringAtZoom:17,
    iconCreateFunction:c=>L.divIcon({html:`<div class="cl"><span>${c.getChildCount()}</span></div>`,className:'',iconSize:[42,42]})}):L.layerGroup();
  cl.addTo(map);
  if(cl.on)cl.on('animationend',()=>setTimeout(updateLabels,50));
  me=L.marker([45.4112,9.2680],{icon:L.divIcon({className:'',html:'<div class="me"><i></i></div>',iconSize:[22,22]}),zIndexOffset:-500,interactive:false}).addTo(map);
  filt();mark();
}
function locate(){
  if(!navigator.geolocation){toast('Geolocalizzazione non disponibile');return}
  navigator.geolocation.getCurrentPosition(p=>{const c=[p.coords.latitude,p.coords.longitude];me.setLatLng(c);map.setView(c,16)},()=>toast('Posizione non disponibile. Controlla i permessi.'));
}
function filt(){
  const all=['Tutto',...Object.keys(CATS)];
  $('#fp').innerHTML=all.map(c=>`<button class="mi" style="font-weight:${F===c?700:400}" onclick="F='${c}';filt();mark();$('#fp').classList.add('hidden')"><span style="width:14px;height:14px;border-radius:50%;background:${CATS[c]||'#C7C7CC'};border:2px solid #333;flex:none"></span><span style="flex:1;text-align:center">${c}</span></button>`).join('');
}
function pinIcon(p){
  return L.divIcon({className:'',iconSize:[34,42],iconAnchor:[17,42],
    html:`<div class="pin2" style="--c:${CATS[p.c]}"><div class="pb"><i class="fa-solid ${CAT_ICON[p.c]||'fa-location-dot'}"></i></div><span class="pl">${esc(p.n)}</span></div>`});
}
function mark(){
  cl.clearLayers();markers=[];
  const q=Q.toLowerCase();
  const list=POIS.filter(p=>(F==='Tutto'||p.c===F)&&(p.n+p.c+p.a).toLowerCase().includes(q));
  list.forEach(p=>{
    const m=L.marker(p.p,{icon:pinIcon(p),title:p.n});
    m._poi=p;m._name=p.n;
    m.on('click',e=>{L.DomEvent.stopPropagation(e);openSheet(POIS.indexOf(p))});
    markers.push(m);cl.addLayer(m);
  });
  if(selM&&!markers.includes(selM))selM=null;
  if(list.length&&(q||F!=='Tutto'))map.fitBounds(L.latLngBounds(list.map(p=>p.p)).pad(.5),{maxZoom:16});
  setTimeout(updateLabels,90);
}
/* Mostra il nome solo dove c'è spazio: nessuna sovrapposizione tra scritte e pin */
function updateLabels(){
  if(!map)return;
  const z=map.getZoom(),vis=markers.filter(m=>m._icon&&m._icon.isConnected&&m._icon.querySelector('.pl'));
  const rects=[];
  vis.forEach(m=>{
    const p=map.latLngToContainerPoint(m.getLatLng());m._pt=p;
    m._icon.querySelector('.pin2').classList.toggle('sel',m===selM);
    m._icon.querySelector('.pl').classList.remove('show');
    rects.push([p.x-17,p.y-42,p.x+17,p.y]);
  });
  const cand=(z>=15?vis:vis.filter(m=>m===selM)).sort((a,b)=>(b===selM)-(a===selM));
  cand.forEach(m=>{
    const p=m._pt,w=Math.min(m._name.length*6.4+8,148),r=[p.x+21,p.y-36,p.x+21+w,p.y-20];
    if(m!==selM&&rects.some(q=>r[0]<q[2]&&r[2]>q[0]&&r[1]<q[3]&&r[3]>q[1]))return;
    rects.push(r);m._icon.querySelector('.pl').classList.add('show');
  });
}
function selectPin(p){
  if(selM)selM.setZIndexOffset(0);
  selM=markers.find(m=>m._poi===p)||null;
  if(selM)selM.setZIndexOffset(1000);
  updateLabels();
}
function closeSheet(){$('#sheet').classList.remove('on');selM=null;updateLabels()}
function openSheet(i){
  const p=POIS[i];
  $('#sheet').innerHTML=`<div style="display:flex;gap:12px;align-items:center;margin-bottom:14px">${im(IMG.luoghi+p.f,'width:72px;height:72px;border-radius:12px;object-fit:cover;flex:none','fa-location-dot')}<h2 class="pr" style="flex:1;text-align:center;font-weight:700;font-size:19px;margin:0">${p.n}</h2>
  <button onclick="closeSheet()" style="background:none;border:0;color:var(--tx);cursor:pointer;font-size:11px;display:flex;flex-direction:column;align-items:center"><i class="fa-regular fa-circle-xmark" style="font-size:22px"></i>${t('Chiudi')}</button></div>
  <div style="display:flex;gap:12px;margin-bottom:14px">${p.t?`<a class="obtn" href="tel:${p.t}"><i class="fa-solid fa-phone"></i>${t('Chiama')}</a>`:''}${p.w?`<a class="obtn" target="_blank" rel="noopener" href="${p.w}"><i class="fa-solid fa-globe"></i>${t('Sito web')}</a>`:''}</div>
  <b style="font-size:14px">Orari:</b><table style="width:100%;font-size:14px;margin:6px 0 10px;border-bottom:1px solid var(--bd)">${p.h.map(r=>`<tr><td style="padding:3px 0;font-weight:500">${r[0]}</td><td style="${r[2]?'color:#FF3B30;font-weight:600':''}">${r[1]}</td></tr>`).join('')}</table>
  <b style="font-size:14px">Indirizzo:</b><div style="margin:8px 0">${mapBox('smm',p.p)}</div><div style="font-size:14px">${p.a}</div>`;
  $('#sheet').classList.add('on');selectPin(p);panToPin(p.p);miniMap('smm',p.p);
}

/* Centra il pin: su schermi grandi lo sposta a sinistra, per non farlo coprire dal pannello laterale di destra */
function panToPin(ll){
  const z=map.getZoom();let c=ll;
  if(innerWidth>=768)c=map.unproject(map.project(ll,z).add([218,0]),z);
  map.setView(c,z,{animate:true});
}
