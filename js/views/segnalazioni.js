/* Schermata Segnalazioni (modulo a 4 step, nello stile dell'app) */
/* ============ SEGNALAZIONI ============ */
const REPICON={'Manto stradale e buche':'fa-road','Segnaletica danneggiata':'fa-sign-hanging','Illuminazione pubblica':'fa-lightbulb','Rifiuti e pulizia urbana':'fa-trash-can','Verde pubblico':'fa-tree','Altro':'fa-ellipsis'};
const R0=()=>({cat:'',addr:'',gps:false,pos:null,sub:'',desc:'',files:[],pv:[],name:'',email:'',tel:''});
let R=R0();
const stepH=(n,ti,sub)=>`<div style="display:flex;gap:12px;align-items:center;margin-bottom:14px"><span class="sn">${n}</span><div style="min-width:0"><b class="pr" style="font-size:16px">${ti}</b>${sub?`<div class="mut" style="font-size:12px;margin-top:1px">${sub}</div>`:''}</div></div>`;
function report(A){
  if(S.auth&&!R.name){R.name='Mario Rossi';R.email=R.email||'mario.rossi@example.it'}
  A.innerHTML=`<h1 class="t" style="margin-bottom:4px">${t('Segnalazioni')}</h1>
  <p class="mut" style="text-align:center;font-size:14px;margin:0 0 18px">Segnala un problema alla città: bastano pochi minuti.</p>
  <div style="display:flex;flex-direction:column;gap:16px">
  <section class="card">${stepH(1,'Cosa stai segnalando?')}
    <div class="tiles" id="rc">${CAT_REP.map(c=>`<button type="button" class="tile${R.cat===c?' on':''}" data-c="${esc(c)}" onclick="pickCat(this)"><i class="fa-solid ${REPICON[c]||'fa-circle'}"></i><span>${c}</span></button>`).join('')}</div></section>
  <section class="card">${stepH(2,'Dove si trova il problema?','Tocca la mappa per spostare il segnaposto')}
    <div id="mm" class="mm" style="border-radius:16px;margin-bottom:10px"></div>
    <input id="ra" class="fi" placeholder="Via e numero civico" value="${esc(R.addr)}" oninput="R.addr=this.value;this.classList.remove('err')">
    <label class="row" style="padding-bottom:0"><span class="ic" style="background:#0A84FF"><i class="fa-solid fa-location-crosshairs"></i></span><span style="flex:1;font-size:14px;font-weight:500">Usa la mia posizione attuale</span><input type="checkbox" id="rg" class="sw" ${R.gps?'checked':''} onchange="useGps(this.checked)"></label></section>
  <section class="card">${stepH(3,'Dettagli della segnalazione')}
    <input id="rs" class="fi" placeholder="Soggetto (es. Buca profonda)" value="${esc(R.sub)}" oninput="R.sub=this.value;this.classList.remove('err')">
    <textarea id="rd" class="fi" rows="4" style="margin-top:10px" placeholder="Descrizione dettagliata del problema" oninput="R.desc=this.value;this.classList.remove('err')">${esc(R.desc)}</textarea>
    <div style="font-size:13px;font-weight:600;margin:14px 0 8px">Foto <span class="mut" style="font-weight:400">(facoltativo · max 3 · JPEG, PNG)</span></div>
    <div class="ph3" id="fl"></div><input type="file" id="rf" accept="image/jpeg,image/png" multiple hidden onchange="addF(this.files);this.value=''"></section>
  <section class="card">${stepH(4,'I tuoi recapiti',S.auth?'Compilati dal tuo account':'')}
    ${S.auth?'':`<div class="row" style="padding-top:0"><span class="ic" style="background:#5856D6"><i class="fa-solid fa-user-lock"></i></span><span style="flex:1;font-size:13px">Hai un account? Accedi per precompilare i dati.</span><button type="button" class="btn sec" style="padding:8px 16px;font-size:13px" onclick="go('account')">Accedi</button></div>`}
    <input id="rn" class="fi" placeholder="Nome e Cognome" value="${esc(R.name)}" oninput="R.name=this.value;this.classList.remove('err')">
    <input id="re" type="email" class="fi" style="margin-top:10px" placeholder="Email" value="${esc(R.email)}" oninput="R.email=this.value;this.classList.remove('err')">
    <input id="rt" type="tel" class="fi" style="margin-top:10px" placeholder="Telefono (facoltativo)" value="${esc(R.tel)}" oninput="R.tel=this.value"></section>
  <button class="btn" style="width:100%;font-weight:700" onclick="sendR()"><i class="fa-solid fa-paper-plane"></i> INVIA SEGNALAZIONE UFFICIALE</button></div>
  ${S.reports.length?`<h2 class="sech" id="mine">LE TUE SEGNALAZIONI</h2><div style="display:flex;flex-direction:column;gap:10px">`+S.reports.slice().reverse().map(r=>`<div class="card" style="padding:12px 14px;display:flex;gap:12px;align-items:center"><span class="ic" style="background:#0A84FF"><i class="fa-solid ${REPICON[r.cat]||'fa-circle'}"></i></span><div style="flex:1;min-width:0"><b>${r.code}</b> <span class="mut" style="font-size:12px">${r.date}</span><div class="mut" style="font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(r.cat)} · ${esc(r.sub)}</div></div><span class="stt">Presa in carico</span></div>`).join('')+`</div>`:''}`;
  const m=miniMap('mm',R.pos||[45.4108,9.2736]);
  m.on('click',e=>{R.pos=[e.latlng.lat,e.latlng.lng];R.gps=false;$('#rg').checked=false;m._mk.setLatLng(e.latlng);$('#ra').classList.remove('err')});
  window._rm=m;fl();
}
function pickCat(el){
  R.cat=el.dataset.c;
  document.querySelectorAll('#rc .tile').forEach(b=>b.classList.toggle('on',b===el));
  $('#rc').classList.remove('err');
}
function useGps(on){
  R.gps=on;if(!on)return;
  if(!navigator.geolocation){toast('Geolocalizzazione non disponibile');$('#rg').checked=false;R.gps=false;return}
  navigator.geolocation.getCurrentPosition(p=>{R.pos=[p.coords.latitude,p.coords.longitude];_rm.setView(R.pos,17);_rm._mk.setLatLng(R.pos);$('#ra').classList.remove('err')},()=>{toast('Impossibile ottenere la posizione. Controlla i permessi.');$('#rg').checked=false;R.gps=false});
}
function addF(fs){
  for(const f of fs){
    if(R.files.length>=3){toast('Puoi caricare al massimo 3 foto');break}
    if(!/^image\/(jpeg|png)$/.test(f.type)){toast('Formato non supportato: usa JPEG o PNG');continue}
    R.files.push(f.name);R.pv.push(URL.createObjectURL(f));
  }
  fl();
}
function rmF(i){URL.revokeObjectURL(R.pv[i]);R.files.splice(i,1);R.pv.splice(i,1);fl()}
function fl(){
  const el=$('#fl');if(!el)return;
  el.innerHTML=[0,1,2].map(i=>R.pv[i]
    ?`<div class="slot"><img src="${R.pv[i]}" alt="${esc(R.files[i])}"><button type="button" class="x" onclick="rmF(${i})" aria-label="Rimuovi foto"><i class="fa-solid fa-xmark"></i></button></div>`
    :i===R.files.length
      ?`<button type="button" class="slot add" onclick="$('#rf').click()"><i class="fa-solid fa-camera"></i>Aggiungi foto</button>`
      :`<div class="slot emp"></div>`).join('');
}
function sendR(){
  document.querySelectorAll('.err').forEach(e=>e.classList.remove('err'));
  const bad=[];
  if(!R.cat)bad.push('rc');if(!R.addr.trim()&&!R.gps&&!R.pos)bad.push('ra');if(!R.sub.trim())bad.push('rs');if(!R.desc.trim())bad.push('rd');if(!R.name.trim())bad.push('rn');if(!/^\S+@\S+\.\S+$/.test(R.email))bad.push('re');
  if(bad.length){bad.forEach(i=>$('#'+i).classList.add('err'));$('#'+bad[0]).scrollIntoView({behavior:'smooth',block:'center'});toast('Compila i campi evidenziati');return}
  const code='#SDM-2026-'+String(Math.floor(1000+Math.random()*9000));
  S.reports.push({code,cat:R.cat,sub:R.sub,desc:R.desc,addr:R.addr,pos:R.pos,files:R.files,name:R.name,email:R.email,tel:R.tel,date:new Date().toLocaleDateString('it-IT')});save();
  R.pv.forEach(u=>URL.revokeObjectURL(u));R=R0();
  mms.forEach(m=>m.remove());mms=[];
  $('#app').innerHTML=`<div class="card" style="padding:30px 20px;text-align:center;margin-top:10px"><div class="okc"><i class="fa-solid fa-check"></i></div><h1 class="t" style="margin-bottom:6px">Segnalazione inviata</h1><p class="mut" style="line-height:1.5;margin:0;font-size:14px">Il Comune ha preso in carico la tua pratica.<br>Conserva il codice per seguirne lo stato.</p><div class="tk">${code}</div>
  <div style="display:flex;flex-direction:column;gap:10px;align-items:center"><button class="btn" style="width:100%;max-width:300px" onclick="render()">Nuova segnalazione</button><button class="btn sec" style="width:100%;max-width:300px" onclick="render();setTimeout(()=>{const m=$('#mine');m&&m.scrollIntoView({behavior:'smooth'})},80)">Le mie segnalazioni</button></div></div>`;
  window.scrollTo(0,0);toast('Segnalazione inviata con successo');
}
