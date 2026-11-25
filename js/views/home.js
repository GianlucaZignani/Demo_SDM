/* Schermata Home: mappa, filtro, scheda luogo */
/* ============ HOME ============ */
let FS=new Set(),Q='',markers=[],me=null,cl=null,selM=null;
const CAT_ICON={'Istruzione':'fa-graduation-cap','Sanità e assistenza':'fa-kit-medical','Servizi':'fa-building-columns','Sicurezza':'fa-shield-halved','Verde e svago':'fa-tree','Servizi urbani':'fa-city','Ristoranti':'fa-utensils','Hotel':'fa-bed'};
function home(A){
  A.innerHTML=`<div class="mapwrap"><div id="map" style="position:absolute;inset:0"></div>
  <div class="mpanel"><div style="display:flex;gap:10px;align-items:center">
  <button onclick="$('#fp').classList.toggle('hidden')" style="background:none;border:0;color:var(--tx);display:flex;flex-direction:column;align-items:center;font-size:11px;cursor:pointer"><i class="fa-solid fa-filter" style="font-size:22px"></i>${t('Filtro')}</button>
  <div class="sr"><input id="q" value="${esc(Q)}" placeholder="${t('Cerca i luoghi vicini a te...')}" oninput="Q=this.value;mark()"><i class="fa-solid fa-magnifying-glass mut"></i></div></div>
  <div id="fp" class="hidden fpn"></div></div>
  <button onclick="locate()" aria-label="La mia posizione" style="position:absolute;right:14px;bottom:24px;z-index:900;width:46px;height:46px;border-radius:50%;border:0;background:var(--card);color:var(--pr2);font-size:20px;box-shadow:0 2px 8px rgba(0,0,0,.4);cursor:pointer"><i class="fa-solid fa-location-arrow"></i></button></div>`;
  map=L.map('map',{zoomControl:false,attributionControl:false,minZoom:11,maxZoom:19}).setView([45.4115,9.2715],14);
  L.control.zoom({position:'bottomright'}).addTo(map);
  L.control.attribution({position:'bottomleft',prefix:false}).addTo(map);
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',{maxZoom:19,attribution:'Immagini © Esri'}).addTo(map);
  map.on('click',()=>{closeSheet();$('#fp').classList.add('hidden')});
  map.on('zoomend moveend',()=>setTimeout(updateLabels,70));
  cl=L.layerGroup().addTo(map);
  me=L.marker([45.4112,9.2680],{icon:L.divIcon({className:'',html:'<div class="me"><i></i></div>',iconSize:[22,22]}),zIndexOffset:-500,interactive:false}).addTo(map);
  filt();mark();
}
function locate(){
  if(!navigator.geolocation){toast('Geolocalizzazione non disponibile');return}
  navigator.geolocation.getCurrentPosition(p=>{const c=[p.coords.latitude,p.coords.longitude];me.setLatLng(c);map.setView(c,16)},()=>toast('Posizione non disponibile. Controlla i permessi.'));
}
const visList=()=>{const q=Q.toLowerCase();return POIS.filter(p=>(FS.size===0||FS.has(p.c))&&(p.n+p.c+p.a).toLowerCase().includes(q))};
function filt(){
  const chip=(c,ic,on)=>`<button type="button" class="fchip${on?' on':''}" onclick="pickF('${c}')"><i class="fa-solid ${on?'fa-check':ic}"></i><span>${c}</span></button>`;
  $('#fp').innerHTML=`${chip('Tutto','fa-layer-group',FS.size===0)}<div class="fdiv"></div><div class="fcol">${Object.keys(CATS).map(c=>chip(c,CAT_ICON[c],FS.has(c))).join('')}</div>`;
}
/* "Tutto" azzera la selezione; le altre voci si accendono e si spengono e si possono combinare */
function pickF(c){
  if(c==='Tutto')FS.clear();else if(FS.has(c))FS.delete(c);else FS.add(c);
  filt();mark();
}
function pinIcon(p){
  return L.divIcon({className:'',iconSize:[34,42],iconAnchor:[17,42],
    html:`<div class="pin2" style="--c:${CATS[p.c]}"><div class="pb"><i class="fa-solid ${CAT_ICON[p.c]||'fa-location-dot'}"></i></div><span class="pl">${esc(p.n)}</span></div>`});
}
function mark(){
  cl.clearLayers();markers=[];
  const q=Q.toLowerCase();
  const list=visList();
  list.forEach(p=>{
    const m=L.marker(p.p,{icon:pinIcon(p),title:p.n});
    m._poi=p;m._name=p.n;
    m.on('click',e=>{L.DomEvent.stopPropagation(e);openSheet(POIS.indexOf(p))});
    markers.push(m);cl.addLayer(m);
  });
  if(selM&&!markers.includes(selM))selM=null;
  if(list.length&&(q||FS.size))map.fitBounds(L.latLngBounds(list.map(p=>p.p)).pad(.5),{maxZoom:16});
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
  const cand=(z>=13?vis:vis.filter(m=>m===selM)).sort((a,b)=>(b===selM)-(a===selM));
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
  $('#sheet').innerHTML=`<div class="grab"><i></i></div><div class="shead" style="display:flex;gap:12px;align-items:center;margin-bottom:14px"><button class="thumb" onclick="openGallery(${i})" aria-label="Apri le foto del luogo">${im(IMG.luoghi+p.f,'width:72px;height:72px;border-radius:12px;object-fit:cover;display:block','fa-location-dot')}<span class="thb" id="thb" data-i="${i}"><i class="fa-solid fa-expand"></i></span></button><h2 class="pr" style="flex:1;text-align:center;font-weight:700;font-size:19px;margin:0">${p.n}</h2></div>
  <div style="display:flex;gap:12px;margin-bottom:14px">${p.t?`<a class="obtn" href="tel:${p.t}"><i class="fa-solid fa-phone"></i>${t('Chiama')}</a>`:''}${p.w?`<a class="obtn" target="_blank" rel="noopener" href="${p.w}"><i class="fa-solid fa-globe"></i>${t('Sito web')}</a>`:''}</div>
  <b style="font-size:14px">Orari:</b><table style="width:100%;font-size:14px;margin:6px 0 10px;border-bottom:1px solid var(--bd)">${p.h.map(r=>`<tr><td style="padding:3px 0;font-weight:500">${r[0]}</td><td style="${r[2]?'color:#FF3B30;font-weight:600':''}">${r[1]}</td></tr>`).join('')}</table>
  <b style="font-size:14px">Indirizzo:</b><div style="margin:8px 0">${mapBox('smm',p.p)}</div><div style="font-size:14px">${p.a}</div>${related(p)}`;
  $('#sheet').classList.add('on');$('#sheet').scrollTop=0;selectPin(p);panToPin(p.p);miniMap('smm',p.p);
  galleryFor(p).then(l=>{const b=$('#thb');if(b&&b.dataset.i===String(i)&&l.length>1)b.innerHTML='<i class="fa-regular fa-images"></i> '+l.length});
}

/* Centra il pin: su schermi grandi lo sposta a sinistra, per non farlo coprire dal pannello laterale di destra */
function panToPin(ll){
  const z=map.getZoom();let c=ll;
  if(innerWidth>=768)c=map.unproject(map.project(ll,z).add([218,0]),z);
  map.setView(c,z,{animate:true});
}

/* Eventi e notizie legati al luogo (entro 60 m dal pin), in un carosello orizzontale */
const near=(a,b,r=60)=>Math.hypot((a[0]-b[0])*111000,(a[1]-b[1])*78500)<=r;
function related(p){
  const items=[
    ...NOTIF.filter(n=>near(n.p,p.p)).map(n=>({k:'Notizia',c:'#FF9500',t:n.t,d:n.d,img:IMG.notifiche+n.f,ic:n.i,on:`readN(${n.id})`})),
    ...EVENTI.filter(e=>near(e.p,p.p)).map(e=>({k:'Evento',c:'#34C759',t:e.t,d:e.d,img:IMG.eventi+e.f,ic:'fa-calendar-days',on:`go('eventD',${e.id})`}))];
  const body=items.length
    ?`<div class="hs">${items.map(x=>`<div class="card ev" onclick="${x.on}">${im(x.img,'width:100%;height:86px;object-fit:cover;display:block','' + x.ic)}<div style="padding:10px 12px 12px"><span class="tg" style="background:${x.c}">${x.k}</span><div class="evt">${x.t}</div><div class="mut" style="font-size:11.5px;margin-top:4px">${x.d}</div></div></div>`).join('')}</div>`
    :`<p class="mut" style="font-size:13px;margin:0">Nessun evento o notizia per questo luogo al momento.</p>`;
  return `<b style="font-size:14px;display:block;margin:20px 0 10px">Eventi e notizie</b>${body}`;
}

/* ============ FOTO DEL LUOGO A TUTTO SCHERMO ============ */
const GAL={};
/* Cerca da sola le foto: nome.jpg, nome-2.jpg ... nome-6.jpg (oppure l'elenco "g" del luogo in data.js) */
function galleryFor(p){
  if(GAL[p.n])return GAL[p.n];
  const m=p.f.match(/(\.[^.]+)$/),ext=m?m[1]:'.jpg',base=p.f.replace(/\.[^.]+$/,'');
  const cand=p.g&&p.g.length?p.g:[p.f,...[2,3,4,5,6].map(n=>`${base}-${n}${ext}`)];
  const probe=f=>new Promise(r=>{const i=new Image();i.onload=()=>r(IMG.luoghi+f);i.onerror=()=>r(null);i.src=IMG.luoghi+f});
  return GAL[p.n]=Promise.all(cand.map(probe)).then(a=>a.filter(Boolean));
}
/* Si apre subito a tutto schermo; le foto compaiono appena trovate */
function openGallery(i){
  const p=POIS[i];closeGallery(true);
  const o=document.createElement('div');
  o.id='gv';o.className='gv';o.dataset.p=p.n;o.setAttribute('role','dialog');o.setAttribute('aria-label','Foto di '+p.n);
  o.innerHTML=`<button class="gx" onclick="closeGallery()" aria-label="Chiudi"><i class="fa-solid fa-xmark"></i></button>
  <div class="gt">${esc(p.n)}</div>
  <div class="gtr" id="gtr"><div class="gs"><div class="gph"><i class="fa-solid fa-spinner fa-spin"></i></div></div></div><div id="gnav"></div>`;
  document.body.appendChild(o);
  galleryDrag(o);
  const tr=$('#gtr');
  tr.addEventListener('scroll',()=>{const k=Math.round(tr.scrollLeft/tr.clientWidth);document.querySelectorAll('.gdt').forEach((d,j)=>d.classList.toggle('on',j===k))},{passive:true});
  const fill=l=>{const v=$('#gv');if(!v||v.dataset.p!==p.n)return;if(l.length||!v.dataset.done){v.dataset.done=1;fillViewer(p,l)}};
  setTimeout(()=>fill([]),3000);
  galleryFor(p).then(fill);
}
function fillViewer(p,list){
  const sl=list.length?list:[null];
  $('#gtr').innerHTML=sl.map(u=>`<div class="gs">${u?`<img src="${u}" alt="${esc(p.n)}">`:`<div class="gph"><i class="fa-solid fa-image"></i><span>Nessuna foto disponibile</span></div>`}</div>`).join('');
  $('#gnav').innerHTML=sl.length>1?`<button class="gn gp" onclick="gGo(-1)" aria-label="Foto precedente"><i class="fa-solid fa-chevron-left"></i></button><button class="gn gnx" onclick="gGo(1)" aria-label="Foto successiva"><i class="fa-solid fa-chevron-right"></i></button>
  <div class="gd">${sl.map((_,k)=>`<button class="gdt${k?'':' on'}" onclick="gTo(${k})" aria-label="Foto ${k+1} di ${sl.length}"></button>`).join('')}</div>`:'';
}
function gCur(){const t=$('#gtr');return Math.round(t.scrollLeft/t.clientWidth)}
function gTo(k){const t=$('#gtr');if(t)t.scrollTo({left:k*t.clientWidth,behavior:'smooth'})}
function gGo(d){const t=$('#gtr');if(t)gTo(Math.max(0,Math.min(t.children.length-1,gCur()+d)))}
function closeGallery(now){
  const o=$('#gv');if(!o)return;
  if(now){o.remove();return}
  o.classList.add('out');setTimeout(()=>o.remove(),250);
}
document.addEventListener('keydown',e=>{
  if(!$('#gv'))return;
  if(e.key==='Escape')closeGallery();
  if(e.key==='ArrowLeft')gGo(-1);
  if(e.key==='ArrowRight')gGo(1);
});

/* ============ TRASCINA PER CHIUDERE ============ */
/* Scheda del luogo: si trascina verso il basso (dito, o mouse dalla maniglia). Oltre una soglia o con uno scatto veloce scende e si chiude, altrimenti torna su con un rimbalzo. Vale su telefono, tablet e computer. */
function dragClose(el,close,isOpen){
  let sy=0,d=0,on=false,ok=false,t0=0;
  const begin=(e,grab)=>{if(!isOpen())return;sy=e.clientY;d=0;on=false;t0=performance.now();ok=grab||el.scrollTop<=0};
  const move=e=>{
    if(!ok)return;const v=e.clientY-sy;
    if(!on){if(v>8){on=true;el.style.transition='none'}else return}
    d=Math.max(0,v);el.style.transform=`translateY(${d}px)`;
    if(e.cancelable)e.preventDefault();
  };
  const end=()=>{
    if(!on){ok=false;return}
    on=false;ok=false;
    const fast=d>40&&d/Math.max(1,performance.now()-t0)>.6;
    if(d>100||fast){
      el.style.transition='transform .28s cubic-bezier(.32,.72,0,1)';el.style.transform='translateY(115%)';
      setTimeout(()=>{el.style.transition='none';close();el.style.transform='';void el.offsetHeight;el.style.transition=''},290);
    }else{el.style.transition='';el.style.transform=''}
  };
  el.addEventListener('touchstart',e=>begin(e.touches[0],!!e.target.closest('.grab,.shead')),{passive:true});
  el.addEventListener('touchmove',e=>move(e.touches[0]),{passive:false});
  el.addEventListener('touchend',end);el.addEventListener('touchcancel',end);
  el.addEventListener('mousedown',e=>{
    if(!e.target.closest('.grab'))return;
    begin(e,true);
    const up=()=>{end();removeEventListener('mousemove',move);removeEventListener('mouseup',up)};
    addEventListener('mousemove',move);addEventListener('mouseup',up);
  });
}
dragClose($('#sheet'),closeSheet,()=>$('#sheet').classList.contains('on'));
/* Foto a schermo intero: trascina verso il basso per chiudere (dito o mouse) */
function galleryDrag(o){
  let sx=0,sy=0,d=0,mode='',down=false;
  const begin=t=>{sx=t.clientX;sy=t.clientY;d=0;mode='';down=true};
  const move=(t,e)=>{
    if(!down)return;const dx=t.clientX-sx,dy=t.clientY-sy;
    if(!mode&&(Math.abs(dx)>8||Math.abs(dy)>8))mode=Math.abs(dy)>Math.abs(dx)&&dy>0?'v':'h';
    if(mode!=='v')return;
    d=Math.max(0,dy);o.style.transition='none';o.style.transform=`translateY(${d}px)`;o.style.opacity=String(Math.max(.3,1-d/450));
    if(e.cancelable)e.preventDefault();
  };
  const end=()=>{
    down=false;if(mode!=='v')return;mode='';
    if(d>110){o.remove();return}
    o.style.transition='transform .35s cubic-bezier(.32,.72,0,1),opacity .35s';o.style.transform='';o.style.opacity='';
  };
  o.addEventListener('touchstart',e=>begin(e.touches[0]),{passive:true});
  o.addEventListener('touchmove',e=>move(e.touches[0],e),{passive:false});
  o.addEventListener('touchend',end);o.addEventListener('touchcancel',end);
  o.addEventListener('mousedown',e=>{
    if(e.target.closest('button'))return;begin(e);
    const mv=ev=>move(ev,ev),up=()=>{end();removeEventListener('mousemove',mv);removeEventListener('mouseup',up)};
    addEventListener('mousemove',mv);addEventListener('mouseup',up);
  });
}
