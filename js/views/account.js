/* Schermate Accesso, Account e "I miei dati".
   I dati dell'utente si inseriscono a mano e restano salvati solo su questo dispositivo (localStorage).
   Punto unico di accesso: loginWithProfile(profilo, origine). Quando SPID/CIE saranno attivi, basterà chiamarla con i dati
   restituiti dal servizio, ad esempio loginWithProfile({name,surname,fiscal,birth:'AAAA-MM-GG',city,email,phone},'spid'). */
const initials=()=>{const u=S.user;return u&&(u.name||u.surname)?(((u.name||'')[0]||'')+((u.surname||'')[0]||'')).toUpperCase():'?'};
const fmtDate=iso=>{if(!iso)return '';const p=iso.split('-');return p.length===3?`${p[2]}/${p[1]}/${p[0]}`:iso};
function loginWithProfile(p,source){
  S.user={name:p.name||'',surname:p.surname||'',fiscal:p.fiscal||'',birth:p.birth||'',city:p.city||'',email:p.email||'',phone:p.phone||''};
  S.userSource=source||'manual';S.auth=true;save();
}
/* modulo dei dati (usato da accesso e da "I miei dati") */
function userForm(u){
  u=u||{};
  const f=(id,label,ph,val,type,extra)=>`<label class="fl" for="${id}">${label}</label><input id="${id}" class="fi" type="${type||'text'}" placeholder="${ph}" value="${esc(val||'')}" ${extra||''} oninput="this.classList.remove('err')">`;
  const today=new Date().toISOString().slice(0,10);
  return `<section class="card">
    ${f('un','Nome','Es. Mario',u.name,'text','autocomplete="given-name"')}
    ${f('us','Cognome','Es. Rossi',u.surname,'text','autocomplete="family-name"')}
    ${f('uf','Codice fiscale (facoltativo)','RSSMRA85E12F205X',u.fiscal,'text','maxlength="16" style="text-transform:uppercase"')}
    ${f('ub','Data di nascita','',u.birth,'date','max="'+today+'"')}
    ${f('uc','Comune di residenza','Es. San Donato Milanese',u.city||'','text','autocomplete="address-level2"')}
    ${f('ue','Email','nome@esempio.it',u.email,'email','autocomplete="email"')}
    ${f('ut','Telefono (facoltativo)','Es. 333 1234567',u.phone,'tel','autocomplete="tel"')}</section>`;
}
function userSave(edit){
  const v=id=>$('#'+id).value.trim();
  const d={name:v('un'),surname:v('us'),fiscal:v('uf').toUpperCase(),birth:v('ub'),city:v('uc'),email:v('ue'),phone:v('ut')};
  const bad=[];
  if(d.name.length<2)bad.push('un');
  if(d.surname.length<2)bad.push('us');
  if(d.fiscal&&!/^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/.test(d.fiscal))bad.push('uf');
  if(!d.birth||d.birth>new Date().toISOString().slice(0,10))bad.push('ub');
  if(d.city.length<2)bad.push('uc');
  if(!/^\S+@\S+\.\S+$/.test(d.email))bad.push('ue');
  if(d.phone&&!/^\+?[\d\s]{6,16}$/.test(d.phone))bad.push('ut');
  document.querySelectorAll('.fi.err').forEach(e=>e.classList.remove('err'));
  if(bad.length){bad.forEach(i=>$('#'+i).classList.add('err'));$('#'+bad[0]).scrollIntoView({behavior:'smooth',block:'center'});toast('Compila i campi evidenziati');return}
  loginWithProfile(d,S.userSource||'manual');
  if(edit){toast('Dati salvati');back()}else{toast('Accesso effettuato');transition('fade',render)}
}
function userDelete(){
  if(window.confirm&&!confirm(S.lang==='en'?'Delete your data from this device?':'Eliminare i tuoi dati da questo dispositivo?'))return;
  S.user=null;S.userSource='';S.auth=false;save();toast('Dati eliminati');stack=[];go('home',null,true);
}
/* accesso */
function login(A){
  const soon=(ic,bg,ti,sub)=>`<div class="crow" style="padding:12px;gap:12px;opacity:.62"><span class="ic" style="background:${bg}"><i class="fa-solid ${ic}"></i></span><span style="flex:1;min-width:0"><b style="font-size:14px">${ti}</b><span class="mut" style="display:block;font-size:12px">${sub}</span></span><span class="soon">Presto disponibile</span></div>`;
  A.innerHTML=`<h1 class="t" style="margin-bottom:6px">${t('Accedi ai servizi')}</h1>
  <p class="mut" style="text-align:center;font-size:14px;margin:0 0 6px">Inserisci i tuoi dati per accedere ai servizi del Comune.</p>
  <h2 class="sech">ACCEDI CON IDENTITÀ DIGITALE</h2>
  <section class="card" style="padding:4px 4px">${soon('fa-fingerprint','#0A84FF','SPID','Sistema Pubblico di Identità Digitale')}${soon('fa-id-card','#34C759','CIE',"Carta d'Identità Elettronica")}</section>
  <h2 class="sech">OPPURE INSERISCI I TUOI DATI</h2>
  ${userForm(S.user)}
  <button type="button" class="btn" style="width:100%;margin-top:16px" onclick="userSave(false)">Accedi</button>
  <p class="mut" style="font-size:12px;margin:14px 0 0;text-align:center"><i class="fa-solid fa-lock"></i> I dati restano salvati solo su questo dispositivo.</p>`;
}
/* i miei dati */
function profile(A){
  if(!S.auth)return login(A);
  A.innerHTML=`${BACK()}<h1 class="t" style="margin-bottom:6px">I miei dati</h1>
  <p class="mut" style="text-align:center;font-size:14px;margin:0 0 14px">Aggiorna le informazioni del tuo profilo.</p>
  ${userForm(S.user)}
  <button type="button" class="btn" style="width:100%;margin-top:16px" onclick="userSave(true)">Salva</button>
  <button type="button" class="btn sec" style="width:100%;margin-top:10px;color:#D70015" onclick="userDelete()">Elimina i miei dati</button>
  <p class="mut" style="font-size:12px;margin:14px 0 0;text-align:center"><i class="fa-solid fa-lock"></i> I dati restano salvati solo su questo dispositivo.</p>`;
}
/* account */
function account(A){
  if(!S.auth)return login(A);
  const u=S.user||{};
  const tg=(bg,ic,l,d,k)=>`<label class="row"><span class="ic" style="background:${bg}"><i class="fa-solid ${ic}"></i></span><span style="flex:1;font-size:14px;font-weight:500">${l}${d?`<span class="mut" style="display:block;font-size:12px;font-weight:400">${d}</span>`:''}</span><input type="checkbox" class="sw" ${S[k]?'checked':''} onchange="S['${k}']=this.checked;save();${k==='dark'?'applyTheme()':''}"></label>`;
  const line=(ic,txt)=>txt?`<div class="mut" style="font-size:13px;margin-top:3px;word-break:break-word"><i class="fa-solid ${ic}" style="width:18px"></i>${esc(txt)}</div>`:'';
  A.innerHTML=`<h1 class="t">${t('Account')}</h1>
  <div class="card" style="display:flex;gap:16px;align-items:center">${avatarBtn()}<div style="min-width:0"><b style="font-size:19px">${esc((u.name||'')+' '+(u.surname||''))}</b>
    ${line('fa-cake-candles',fmtDate(u.birth))}${line('fa-location-dot',u.city)}${line('fa-envelope',u.email)}</div></div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:16px">
    <div class="card stat" onclick="go('report')"><div class="n">${S.reports.length}</div><div class="l">Le mie segnalazioni</div></div>
    <div class="card stat" onclick="go('notif')"><div class="n">${unread()}</div><div class="l">Notifiche non lette</div></div></div>
  <section class="card" style="padding:4px 4px;margin-top:14px"><div class="crow"><button type="button" class="mi" onclick="go('profile')"><span class="ic" style="background:#0A84FF"><i class="fa-solid fa-user-pen"></i></span><span style="flex:1"><b style="font-size:14px">I miei dati</b><span class="mut" style="display:block;font-size:12px">Modifica nome, data di nascita e contatti</span></span><i class="fa-solid fa-chevron-right mut"></i></button></div></section>
  <h2 class="sech">PREFERENZE APP</h2>
  <div class="card" style="padding:4px 16px"><div class="row"><span class="ic" style="background:#0A84FF"><i class="fa-solid fa-globe"></i></span><span style="flex:1;font-size:14px;font-weight:500">Lingua</span><select class="fi" style="width:auto;padding:8px 12px" onchange="setLang(this.value)"><option value="it" ${S.lang==='it'?'selected':''}>Italiano</option><option value="en" ${S.lang==='en'?'selected':''}>English</option></select></div>${tg('#5856D6','fa-moon','Tema Scuro','','dark')}</div>
  <h2 class="sech">NOTIFICHE E AVVISI</h2>
  <div class="card" style="padding:4px 16px">${tg('#FF9500','fa-triangle-exclamation','Avvisi di pubblica utilità','Allerte meteo, scioperi e viabilità','alerts')}${tg('#34C759','fa-calendar-days','Eventi e Manifestazioni','Street food, sagre e mercati','events')}</div>
  <button class="btn" style="width:100%;margin-top:24px;background:rgba(255,59,48,.12);color:#D70015;box-shadow:none" onclick="S.auth=false;save();toast('Disconnesso');go('home',null,true)"><i class="fa-solid fa-right-from-bracket"></i> ${t("Esci dall'Account")}</button>`;
}

/* ============ FOTO PROFILO: foto personale o emoji ============ */
const EMOJIS=['😀','😎','🤓','🥳','😇','🤠','🐶','🐱','🦊','🐼','🦁','🐸','⚽','🎨','🎸','📚','🌳','🚲','🏠','☕','🍕','🌻','⭐','❤️'];
function avatarInner(){
  const a=S.avatar;
  if(a&&a.t==='photo')return `<img src="${a.v}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`;
  if(a&&a.t==='emoji')return `<span style="font-size:34px;line-height:1">${a.v}</span>`;
  return initials();
}
function avatarBtn(){
  const a=S.avatar,bg=a&&a.t==='emoji'?'#DCEBFF':a&&a.t==='photo'?'transparent':'#1F4E9C';
  return `<button class="av" onclick="openAvatar()" aria-label="Cambia foto profilo" style="background:${bg}">${avatarInner()}<span class="avc"><i class="fa-solid fa-camera"></i></span></button>`;
}
function openAvatar(){
  closeAvatar(true);
  const a=S.avatar,o=document.createElement('div');o.id='avo';o.className='avo';
  o.onclick=e=>{if(e.target===o)closeAvatar()};
  o.innerHTML=`<div class="avp" role="dialog" aria-label="Foto profilo">
    <div style="width:40px;height:5px;border-radius:3px;background:var(--bd);margin:0 auto 12px"></div>
    <h3 style="text-align:center;font-weight:700;font-size:17px;margin:0 0 10px">Foto profilo</h3>
    <label class="mi"><i class="fa-solid fa-image pr"></i>Scegli dalla libreria<input type="file" accept="image/*" hidden onchange="setPhoto(this.files[0])"></label>
    <label class="mi"><i class="fa-solid fa-camera pr"></i>Scatta una foto<input type="file" accept="image/*" capture="user" hidden onchange="setPhoto(this.files[0])"></label>
    <div style="font-size:12px;font-weight:600;letter-spacing:.04em" class="mut"><div style="margin:14px 4px 8px">OPPURE SCEGLI UN'EMOJI</div></div>
    <div class="emg">${EMOJIS.map(e=>`<button class="em ${a&&a.t==='emoji'&&a.v===e?'sel':''}" onclick="setEmoji('${e}')" aria-label="Emoji ${e}">${e}</button>`).join('')}</div>
    ${a?`<button class="mi" style="color:#D70015;margin-top:10px;border-top:1px solid var(--bd)" onclick="resetAvatar()"><i class="fa-solid fa-trash" style="color:#D70015"></i>Rimuovi foto o emoji</button>`:''}
    <button class="btn" style="width:100%;margin-top:12px;background:var(--gr);color:var(--tx);box-shadow:none" onclick="closeAvatar()">Annulla</button></div>`;
  document.body.appendChild(o);
}
function closeAvatar(now){
  const o=$('#avo');if(!o)return;
  if(now){o.remove();return}
  o.classList.add('out');setTimeout(()=>o.remove(),230);
}
function avatarDone(msg){closeAvatar();save();if(view==='account')render();toast(msg)}
function setEmoji(e){S.avatar={t:'emoji',v:e};avatarDone('Emoji impostata')}
function resetAvatar(){S.avatar=null;avatarDone('Foto profilo rimossa')}
function setPhoto(f){
  if(!f)return;
  if(!/^image\//.test(f.type)){toast('Seleziona un file immagine');return}
  const r=new FileReader();
  r.onerror=()=>toast('Impossibile leggere la foto');
  r.onload=()=>{
    const img=new Image();
    img.onerror=()=>toast('Formato immagine non supportato');
    img.onload=()=>{
      const s=Math.min(img.width,img.height),c=document.createElement('canvas');c.width=c.height=256;
      c.getContext('2d').drawImage(img,(img.width-s)/2,(img.height-s)/2,s,s,0,0,256,256);
      S.avatar={t:'photo',v:c.toDataURL('image/jpeg',.85)};avatarDone('Foto profilo aggiornata');
    };
    img.src=r.result;
  };
  r.readAsDataURL(f);
}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeAvatar()});
