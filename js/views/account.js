/* Schermate Autoidentificazione e Account */
/* ============ LOGIN / ACCOUNT ============ */
function login(A){
  A.innerHTML=`<h1 style="text-align:center;font-size:24px;font-weight:700;margin:20px 0 14px">${t('Accedi ai servizi')}</h1><p style="text-align:center;font-weight:500;font-size:14px;line-height:1.5;margin:0 0 28px">Seleziona "Entra con Gel" se sei in possesso di credenziali SPID/CIE/CNS. Seleziona "Entra con utente locale" se sei in possesso di credenziali dell'Ente.</p>
  <div style="display:flex;flex-direction:column;gap:30px;align-items:center"><button class="btn" style="width:230px" onclick="doLogin()"><span style="width:22px;height:22px;border-radius:50%;background:#fff;color:var(--pr2);display:grid;place-items:center;font-size:11px"><i class="fa-solid fa-user"></i></span>Entra con Gel</button><button class="btn" style="width:230px" onclick="doLogin()">Entra con utente locale</button></div>`;
}
function doLogin(){S.auth=true;save();toast('Accesso effettuato');transition('fade',render)}
function account(A){
  if(!S.auth)return login(A);
  const tg=(ic,col,l,d,k)=>`<label style="display:flex;gap:12px;align-items:center;padding:12px 4px"><i class="${ic}" style="color:${col};width:24px;text-align:center"></i><span style="flex:1;font-size:13px;font-weight:500">${l}${d?`<span class="mut" style="display:block;font-size:11px;font-weight:400">${d}</span>`:''}</span><input type="checkbox" class="sw" ${S[k]?'checked':''} onchange="S['${k}']=this.checked;save();${k==='dark'?'applyTheme()':''}"></label>`;
  const hd=x=>`<h2 class="mut" style="font-size:12px;margin:18px 4px 8px;font-weight:600;letter-spacing:.04em">${x}</h2>`;
  A.innerHTML=`<div class="card" style="display:flex;gap:16px;align-items:center">${avatarBtn()}<div><b>Mario Rossi</b><div class="mut" style="font-size:12px">Data di nascita: 12/05/1985</div><div class="mut" style="font-size:12px">Residenza: San Donato Milanese (MI)</div></div></div>
  ${hd('PREFERENZE APP')}<div class="card" style="padding:6px 16px"><div style="display:flex;gap:12px;align-items:center;padding:8px 4px;border-bottom:1px solid var(--bd)"><i class="fa-solid fa-globe" style="color:var(--pr2);width:24px;text-align:center"></i><span style="flex:1;font-size:13px;font-weight:500">Lingua / Language</span><select class="inp" style="width:auto;border-radius:8px" onchange="S.lang=this.value;save();render()"><option value="it" ${S.lang==='it'?'selected':''}>Italiano</option><option value="en" ${S.lang==='en'?'selected':''}>English</option></select></div>${tg('fa-solid fa-moon','#5856D6','Tema Scuro / Dark Mode','','dark')}</div>
  ${hd('NOTIFICHE E AVVISI')}<div class="card" style="padding:6px 16px">${tg('fa-solid fa-triangle-exclamation','#FF9500','Avvisi di pubblica utilità','Allerte meteo, scioperi e viabilità','alerts')}<div style="border-top:1px solid var(--bd)"></div>${tg('fa-solid fa-calendar-days','#34C759','Eventi e Manifestazioni','Street food, sagre e mercati','events')}</div>
  <button class="btn" style="width:100%;margin-top:20px;border-radius:14px;background:#FFE5E3;color:#D70015;box-shadow:none;border:1px solid #FFB3AE" onclick="S.auth=false;save();toast('Disconnesso');go('home',null,true)"><i class="fa-solid fa-right-from-bracket"></i> ${t("Esci dall'Account")}</button>`;
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
