/* Router, menu, header, mini-mappe */
/* ============ NAVIGAZIONE ============ */
let view='home',arg=null,stack=[],map=null,mms=[];
function go(v,a,noPush){const dir=DETAIL.includes(v)?'fwd':'fade';if(!noPush)stack.push([view,arg]);view=v;arg=a??null;closeAll();transition(dir,()=>{render();window.scrollTo(0,0)})}
function back(){const p=stack.pop();if(p){view=p[0];arg=p[1];closeAll();transition('back',()=>{render();window.scrollTo(0,0)})}else go('home',null,true)}
function toast(m){const d=document.createElement('div');d.className='toast';d.textContent=m;document.body.appendChild(d);setTimeout(()=>d.remove(),2400)}
function closeAll(){$('#menu').classList.remove('on');$('#sheet').classList.remove('on')}
const unread=()=>NOTIF.filter(n=>!S.read.includes(n.id)).length;
function badge(){const u=unread(),b=$('#badge');b.textContent=u;b.style.display=u?'grid':'none'}
const applyTheme=()=>document.documentElement.classList.toggle('dark',S.dark);
const BACK=(r='')=>`<div style="display:flex;justify-content:space-between;font-size:14px;margin-bottom:12px"><button onclick="back()" style="background:none;border:0;color:var(--tx);cursor:pointer;padding:0;font-size:14px"><i class="fa-solid fa-chevron-left" style="font-size:12px"></i> ${t('Indietro')}</button><span class="mut">${r}</span></div>`;
const SEARCH=(ph,fn)=>`<div style="display:flex;margin-bottom:16px"><div class="sr srw"><input id="sq" placeholder="${t(ph)}" oninput="${fn}(this.value)"><i class="fa-solid fa-magnifying-glass mut"></i></div></div>`;
const NOTH=`<p class="mut" style="text-align:center;padding:30px">Nessun risultato. Prova con altre parole chiave.</p>`;
/* Indicazioni: Apple Mappe su iPhone/iPad, Google Maps altrove */
const IS_APPLE=/iPhone|iPad|iPod/.test(navigator.userAgent)||(/Macintosh/.test(navigator.userAgent)&&navigator.maxTouchPoints>1);
const dir=p=>IS_APPLE?`https://maps.apple.com/?daddr=${p[0]},${p[1]}&dirflg=d`:`https://www.google.com/maps/dir/?api=1&destination=${p[0]},${p[1]}`;
function miniMap(id,p){
  mms=mms.filter(m=>{if(!m.getContainer().isConnected||m.getContainer().id===id){m.remove();return false}return true});
  const el=document.getElementById(id);if(!el)return null;
  const m=L.map(el,{zoomControl:false,attributionControl:false}).setView(p,17);
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}').addTo(m);
  m._mk=L.marker(p).addTo(m);mms.push(m);setTimeout(()=>m.invalidateSize(),350);return m;
}
const mapBox=(id,p)=>`<div style="position:relative"><div id="${id}" class="mm"></div><a class="ind" style="position:absolute;right:10px;bottom:10px;z-index:500" target="_blank" rel="noopener" href="${dir(p)}">${t('Indicazioni')}</a></div>`;

/* Menu */
function renderMenu(){
  const it=[['Vivere la città','events','fa-map'],['Servizi','services','fa-table-cells-large'],['Pagamenti online','pay','fa-credit-card'],['Amministrazione','admin','fa-building-columns'],['Contatti','contacts','fa-phone'],['Segnalazioni','report','fa-triangle-exclamation']];
  $('#menu').innerHTML=it.map(x=>`<button class="mi" onclick="go('${x[1]}')"><i class="fa-solid ${x[2]}"></i>${t(x[0])}</button>`).join('');
}
const errCard=m=>`<div class="card" style="margin:20px;text-align:center"><b>Si è verificato un errore</b><p class="mut" style="font-size:13px;margin:8px 0 0">${esc(m)}<br>Controlla che tutti i file siano stati caricati e ricarica la pagina.</p></div>`;
function render(){try{_render()}catch(err){console.error(err);const A=$('#app');A.className='main';A.innerHTML=errCard(err.message)}}
function _render(){
  badge();renderMenu();
  mms.forEach(m=>m.remove());mms=[];
  if(map&&view!=='home'){map.remove();map=null}
  const A=$('#app');A.className=view==='home'?'':'main'+(['notif','events','services','admin','orgs'].includes(view)?' wide':'');A.innerHTML='';
  const fn=window[view];
  try{if(typeof fn!=='function')throw new Error('Schermata "'+view+'" non disponibile: il suo file non è stato caricato o è danneggiato.');fn(A)}
  catch(err){console.error(err);A.innerHTML=errCard(err.message)}
  enhance();
  if(document.documentElement.dataset.nav==='fade'&&$('#lst')){A.classList.add('stagger');setTimeout(()=>A.classList.remove('stagger'),900)}
}

function enhance(){document.querySelectorAll('#lst>*').forEach((c,i)=>c.style.setProperty('--i',Math.min(i,8)));document.querySelectorAll('.card[onclick]').forEach(c=>{c.setAttribute('role','button');c.tabIndex=0});initToc()}

/* Transizioni tra schermate stile iOS: push (fwd), pop (back), dissolvenza (fade).
   Usa la View Transitions API; dove non esiste ripiega su una semplice animazione CSS. */
const DETAIL=['notifD','eventD','serviceD','orgs','sindaco','profile'];
const REDUCED=()=>!!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);
function transition(dir,fn){
  document.documentElement.dataset.nav=dir;
  if(document.startViewTransition&&!REDUCED()){document.startViewTransition(fn);return}
  fn();
  if(!REDUCED())$('#app').classList.add('in-'+(view==='home'?'fade-o':dir));
}

/* ===== Pagine di dettaglio: scheda iniziale, indice delle sezioni e sezioni a schede ===== */
function detailPage(o){
  const toc=o.secs.map((s,i)=>`<button type="button" class="tc${i?'':' on'}" data-t="ds${i}"><span>${s.t}</span></button>`).join('');
  return `${BACK(o.right||'')}${o.hero}
  <div class="dgrid"><aside class="tocw"><div class="toch">IN QUESTA PAGINA</div><nav class="toc" aria-label="Indice">${toc}</nav></aside>
  <div class="dsecs">${o.secs.map((s,i)=>`<section class="card dsec" id="ds${i}"><div class="dst"><h2>${s.t}</h2></div><div class="dsb">${s.html}</div></section>`).join('')}</div></div>`;
}
let tocLock=0,tocBusy=false;
function tocSet(c){
  document.querySelectorAll('.tc').forEach(x=>x.classList.toggle('on',x===c));
  const nav=c.parentNode;if(nav.scrollWidth>nav.clientWidth&&nav.scrollTo)nav.scrollTo({left:c.offsetLeft-20,behavior:'smooth'});
}
function initToc(){
  document.querySelectorAll('.tc').forEach(c=>{c.onclick=()=>{
    const el=document.getElementById(c.dataset.t);if(!el)return;
    tocLock=Date.now()+800;tocSet(c);el.scrollIntoView({behavior:REDUCED()?'auto':'smooth',block:'start'});
  }});
}
/* l'indice evidenzia la sezione che si sta leggendo */
window.addEventListener('scroll',()=>{
  if(tocBusy||Date.now()<tocLock)return;tocBusy=true;
  requestAnimationFrame(()=>{
    tocBusy=false;const secs=document.querySelectorAll('.dsec');if(!secs.length)return;
    const lim=innerWidth<960?170:120;let cur=0;
    secs.forEach((s,i)=>{if(s.getBoundingClientRect().top<=lim)cur=i});
    if(innerHeight+scrollY>=document.documentElement.scrollHeight-4)cur=secs.length-1;
    const c=document.querySelectorAll('.tc')[cur];if(c&&!c.classList.contains('on'))tocSet(c);
  });
},{passive:true});
