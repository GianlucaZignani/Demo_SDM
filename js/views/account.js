/* Schermate Autoidentificazione e Account */
/* ============ LOGIN / ACCOUNT ============ */
function login(A){
  A.innerHTML=`<div class="card" style="padding:30px 22px;text-align:center;margin-top:8px">
  <div class="ic" style="width:68px;height:68px;border-radius:20px;margin:0 auto 16px;background:linear-gradient(135deg,#1F6FB5,#0A84FF);font-size:30px"><i class="fa-solid fa-user-shield"></i></div>
  <h1 class="t" style="margin-bottom:10px">${t('Accedi ai servizi')}</h1>
  <p style="font-size:14px;line-height:1.5;margin:0 0 24px">Seleziona "Entra con Gel" se sei in possesso di credenziali SPID/CIE/CNS. Seleziona "Entra con utente locale" se sei in possesso di credenziali dell'Ente.</p>
  <div style="display:flex;flex-direction:column;gap:12px;align-items:center">
    <button class="btn" style="width:100%;max-width:300px" onclick="doLogin()"><span style="width:22px;height:22px;border-radius:50%;background:#fff;color:var(--pr2);display:grid;place-items:center;font-size:11px"><i class="fa-solid fa-user"></i></span>Entra con Gel</button>
    <button class="btn" style="width:100%;max-width:300px" onclick="doLogin()">Entra con utente locale</button></div>
  <p class="mut" style="font-size:12px;margin:20px 0 0"><i class="fa-solid fa-lock"></i> Accesso sicuro con identità digitale</p></div>`;
}
function doLogin(){S.auth=true;save();toast('Accesso effettuato');transition('fade',render)}
function account(A){
  if(!S.auth)return login(A);
  const tg=(bg,ic,l,d,k)=>`<label class="row"><span class="ic" style="background:${bg}"><i class="fa-solid ${ic}"></i></span><span style="flex:1;font-size:14px;font-weight:500">${l}${d?`<span class="mut" style="display:block;font-size:12px;font-weight:400">${d}</span>`:''}</span><input type="checkbox" class="sw" ${S[k]?'checked':''} onchange="S['${k}']=this.checked;save();${k==='dark'?'applyTheme()':''}"></label>`;
  A.innerHTML=`<h1 class="t">${t('Account')}</h1>
  <div class="card" style="display:flex;gap:16px;align-items:center">${avatarBtn()}<div style="min-width:0"><b style="font-size:19px">Mario Rossi</b>
    <div class="mut" style="font-size:13px;margin-top:4px"><i class="fa-solid fa-cake-candles" style="width:18px"></i>12/05/1985</div>
    <div class="mut" style="font-size:13px;margin-top:2px"><i class="fa-solid fa-location-dot" style="width:18px"></i>San Donato Milanese (MI)</div></div></div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:16px">
    <div class="card stat" onclick="go('report')"><div class="n">${S.reports.length}</div><div class="l">Le mie segnalazioni</div></div>
    <div class="card stat" onclick="go('notif')"><div class="n">${unread()}</div><div class="l">Notifiche non lette</div></div></div>
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
  return 'MR';
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
