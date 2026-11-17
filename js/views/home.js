/* Schermata Home: mappa, filtro, scheda luogo */
/* ============ HOME ============ */
let F='Tutto',Q='',markers=[],me=null;
function home(A){
  A.innerHTML=`<div class="mapwrap"><div id="map" style="position:absolute;inset:0"></div>
  <div class="mpanel"><div style="display:flex;gap:10px;align-items:center">
  <button onclick="$('#fp').classList.toggle('hidden')" style="background:none;border:0;color:var(--tx);display:flex;flex-direction:column;align-items:center;font-size:11px;cursor:pointer"><i class="fa-solid fa-filter" style="font-size:22px"></i>${t('Filtro')}</button>
  <div class="sr"><input id="q" value="${esc(Q)}" placeholder="${t('Cerca i luoghi vicini a te...')}" oninput="Q=this.value;mark()"><i class="fa-solid fa-magnifying-glass mut"></i></div></div>
  <div id="fp" class="hidden" style="position:absolute;left:14px;top:84px;width:210px;background:var(--card);border-radius:18px;box-shadow:0 8px 24px rgba(0,0,0,.35);max-height:55vh;overflow:auto"></div></div>
  <button onclick="locate()" aria-label="La mia posizione" style="position:absolute;right:14px;bottom:24px;z-index:900;width:46px;height:46px;border-radius:50%;border:0;background:var(--card);color:var(--pr2);font-size:20px;box-shadow:0 2px 8px rgba(0,0,0,.4);cursor:pointer"><i class="fa-solid fa-location-arrow"></i></button></div>`;
  map=L.map('map',{zoomControl:false}).setView([45.4115,9.2715],15);
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',{attribution:'Esri'}).addTo(map);
  map.on('click',()=>{$('#sheet').classList.remove('on');$('#fp').classList.add('hidden')});
  me=L.circleMarker([45.4112,9.2680],{radius:9,color:'#fff',weight:3,fillColor:'#0A84FF',fillOpacity:1}).addTo(map);
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
function mark(){
  markers.forEach(m=>m.remove());markers=[];
  const q=Q.toLowerCase();
  const list=POIS.filter(p=>(F==='Tutto'||p.c===F)&&(p.n+p.c+p.a).toLowerCase().includes(q));
  list.forEach(p=>{
    const ic=L.divIcon({className:'',html:`<div style="position:relative"><div class="dot" style="background:${CATS[p.c]}"></div><span class="lb">${p.n}</span></div>`,iconSize:[16,16],iconAnchor:[8,8]});
    markers.push(L.marker(p.p,{icon:ic}).addTo(map).on('click',e=>{L.DomEvent.stopPropagation(e);openSheet(POIS.indexOf(p))}));
  });
  if(list.length&&(q||F!=='Tutto'))map.fitBounds(L.latLngBounds(list.map(p=>p.p)).pad(.5),{maxZoom:16});
}
function openSheet(i){
  const p=POIS[i];
  $('#sheet').innerHTML=`<div style="display:flex;gap:12px;align-items:center;margin-bottom:14px">${im(IMG.luoghi+p.f,'width:72px;height:72px;border-radius:12px;object-fit:cover;flex:none','fa-location-dot')}<h2 class="pr" style="flex:1;text-align:center;font-weight:700;font-size:19px;margin:0">${p.n}</h2>
  <button onclick="$('#sheet').classList.remove('on')" style="background:none;border:0;color:var(--tx);cursor:pointer;font-size:11px;display:flex;flex-direction:column;align-items:center"><i class="fa-regular fa-circle-xmark" style="font-size:22px"></i>${t('Chiudi')}</button></div>
  <div style="display:flex;gap:12px;margin-bottom:14px">${p.t?`<a class="obtn" href="tel:${p.t}"><i class="fa-solid fa-phone"></i>${t('Chiama')}</a>`:''}${p.w?`<a class="obtn" target="_blank" rel="noopener" href="${p.w}"><i class="fa-solid fa-globe"></i>${t('Sito web')}</a>`:''}</div>
  <b style="font-size:14px">Orari:</b><table style="width:100%;font-size:14px;margin:6px 0 10px;border-bottom:1px solid var(--bd)">${p.h.map(r=>`<tr><td style="padding:3px 0;font-weight:500">${r[0]}</td><td style="${r[2]?'color:#FF3B30;font-weight:600':''}">${r[1]}</td></tr>`).join('')}</table>
  <b style="font-size:14px">Indirizzo:</b><div style="margin:8px 0">${mapBox('smm',p.p)}</div><div style="font-size:14px">${p.a}</div>`;
  $('#sheet').classList.add('on');panToPin(p.p);miniMap('smm',p.p);
}

/* Centra il pin: su schermi grandi lo sposta a sinistra, per non farlo coprire dal pannello laterale di destra */
function panToPin(ll){
  const z=map.getZoom();let c=ll;
  if(innerWidth>=768)c=map.unproject(map.project(ll,z).add([218,0]),z);
  map.setView(c,z,{animate:true});
}
