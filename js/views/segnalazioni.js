/* Schermata Segnalazioni (modulo a 4 step) */
/* ============ SEGNALAZIONI ============ */
let R={cat:'',addr:'',gps:false,pos:null,sub:'',desc:'',files:[],name:'',email:'',tel:''};
function report(A){
  if(S.auth&&!R.name){R.name='Mario Rossi';R.email='mario.rossi@example.it'}
  A.innerHTML=`<h1 class="t" style="color:var(--tx)">${t('Segnalazioni')}</h1>
  <div class="fh" style="margin-top:0"><i class="fa-solid fa-location-dot"></i>1. COSA STAI SEGNALANDO?</div>
  <select id="rc" class="inp" onchange="R.cat=this.value"><option value="">Scegli la categoria del disservizio</option>${CAT_REP.map(c=>`<option ${R.cat===c?'selected':''}>${c}</option>`).join('')}</select>
  <div class="fh"><i class="fa-solid fa-map-location-dot"></i>2. DOVE SI TROVA IL PROBLEMA?</div>
  <div id="mm" class="mm" style="border-radius:4px"></div><input id="ra" class="inp" style="margin-top:6px" placeholder="Via e numero civico" value="${esc(R.addr)}" oninput="R.addr=this.value">
  <label style="display:flex;gap:8px;align-items:center;margin-top:6px;font-size:13px"><input type="checkbox" id="rg" ${R.gps?'checked':''} onchange="useGps(this.checked)"> Usa la mia posizione GPS attuale</label>
  <div class="fh"><i class="fa-solid fa-camera"></i>3. DETTAGLI DELLA SEGNALAZIONE</div>
  <input id="rs" class="inp" placeholder="Soggetto (es. Buca profonda)" value="${esc(R.sub)}" oninput="R.sub=this.value"><textarea id="rd" class="inp" rows="3" style="margin-top:6px" placeholder="Descrizione dettagliata del problema" oninput="R.desc=this.value">${esc(R.desc)}</textarea>
  <p style="font-size:13px;margin:8px 0 4px">Aggiungi foto (Opzionale)</p><input type="file" id="rf" accept="image/jpeg,image/png" multiple hidden onchange="addF(this.files)">
  <button class="btn" style="padding:7px 14px;font-size:13px;border-radius:6px" onclick="$('#rf').click()">+ AGGIUNGI FOTO</button><div class="mut" style="font-size:12px;margin-top:4px">Max 3 file (.JPEG, PNG)</div><div id="fl" style="font-size:13px"></div>
  <div class="fh"><i class="fa-solid fa-pen"></i>4. I TUOI RECAPITI</div>${S.auth?'<p class="mut" style="font-size:12px;margin:0 0 6px"><i class="fa-solid fa-lock"></i> Dati precompilati dal tuo account</p>':''}
  <input id="rn" class="inp" placeholder="Nome e Cognome" value="${esc(R.name)}" oninput="R.name=this.value"><input id="re" type="email" class="inp" style="margin-top:6px" placeholder="Email" value="${esc(R.email)}" oninput="R.email=this.value"><input id="rt" type="tel" class="inp" style="margin-top:6px" placeholder="Telefono (facoltativo)" value="${esc(R.tel)}" oninput="R.tel=this.value">
  <div style="text-align:center;margin-top:18px"><button class="btn" style="border-radius:8px;font-weight:700" onclick="sendR()">INVIA SEGNALAZIONE UFFICIALE</button></div>
  ${S.reports.length?`<h2 class="font-bold" style="margin:24px 0 10px">Le tue segnalazioni</h2>`+S.reports.slice().reverse().map(r=>`<div class="card" style="padding:10px 14px;margin-bottom:10px;border-radius:14px"><b>${r.code}</b> <span class="mut" style="font-size:12px">${r.date}</span><div style="font-size:13px">${esc(r.cat)}: ${esc(r.sub)}</div></div>`).join(''):''}`;
  const m=miniMap('mm',R.pos||[45.4108,9.2736]);
  m.on('click',e=>{R.pos=[e.latlng.lat,e.latlng.lng];R.gps=false;$('#rg').checked=false;m._mk.setLatLng(e.latlng)});
  window._rm=m;fl();
}
function useGps(on){
  R.gps=on;if(!on)return;
  if(!navigator.geolocation){toast('Geolocalizzazione non disponibile');$('#rg').checked=false;R.gps=false;return}
  navigator.geolocation.getCurrentPosition(p=>{R.pos=[p.coords.latitude,p.coords.longitude];_rm.setView(R.pos,17);_rm._mk.setLatLng(R.pos)},()=>{toast('Impossibile ottenere la posizione. Controlla i permessi.');$('#rg').checked=false;R.gps=false});
}
function addF(fs){for(const f of fs){if(R.files.length>=3){toast('Puoi caricare al massimo 3 foto');break}R.files.push(f.name)}fl()}
function fl(){$('#fl').innerHTML=R.files.map((n,i)=>`<div style="display:flex;justify-content:space-between;padding:3px 0"><span><i class="fa-regular fa-image pr"></i> ${esc(n)}</span><button style="background:none;border:0;color:#FF3B30;cursor:pointer" onclick="R.files.splice(${i},1);fl()" aria-label="Rimuovi"><i class="fa-solid fa-xmark"></i></button></div>`).join('')}
function sendR(){
  document.querySelectorAll('.err').forEach(e=>e.classList.remove('err'));
  const bad=[];
  if(!R.cat)bad.push('rc');if(!R.addr.trim()&&!R.gps&&!R.pos)bad.push('ra');if(!R.sub.trim())bad.push('rs');if(!R.desc.trim())bad.push('rd');if(!R.name.trim())bad.push('rn');if(!/^\S+@\S+\.\S+$/.test(R.email))bad.push('re');
  if(bad.length){bad.forEach(i=>$('#'+i).classList.add('err'));$('#'+bad[0]).scrollIntoView({behavior:'smooth',block:'center'});toast('Compila i campi evidenziati');return}
  const code='#SDM-2026-'+String(Math.floor(1000+Math.random()*9000));
  S.reports.push({code,cat:R.cat,sub:R.sub,desc:R.desc,addr:R.addr,pos:R.pos,files:R.files,name:R.name,email:R.email,tel:R.tel,date:new Date().toLocaleDateString('it-IT')});save();
  R={cat:'',addr:'',gps:false,pos:null,sub:'',desc:'',files:[],name:'',email:'',tel:''};
  mms.forEach(m=>m.remove());mms=[];
  $('#app').innerHTML=`<div class="card" style="padding:28px;text-align:center;margin-top:20px"><div style="width:72px;height:72px;border-radius:50%;background:#34C759;color:#fff;display:grid;place-items:center;font-size:32px;margin:0 auto 14px"><i class="fa-solid fa-check"></i></div><h1 class="t">Segnalazione inviata</h1><p class="mut" style="line-height:1.5">Il Comune ha preso in carico la tua pratica. Conserva il codice per seguirne lo stato.</p><div style="font-size:26px;font-weight:800;margin:14px 0" class="pr">${code}</div><button class="btn" onclick="render()">Torna alle segnalazioni</button></div>`;
  window.scrollTo(0,0);toast('Segnalazione inviata con successo');
}
