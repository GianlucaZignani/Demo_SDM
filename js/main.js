/* Avvio app ed eventi globali */
/* ============ EVENTI GLOBALI ============ */
$('#logo').onclick=()=>{stack=[];go('home',null,true)};
$('#bAcc').onclick=()=>go('account');
$('#bNot').onclick=()=>go('notif');
$('#bMenu').onclick=e=>{e.stopPropagation();$('#sheet').classList.remove('on');$('#menu').classList.toggle('on')};
document.addEventListener('click',e=>{if(!e.target.closest('#menu'))$('#menu').classList.remove('on')});
new MutationObserver(enhance).observe($('#app'),{childList:true,subtree:true});
document.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('.card[role=button]')){e.preventDefault();e.target.click()}});
/* Effetto bottone su touch: classe .pressed + breve attesa prima di aprire la schermata */
document.addEventListener('touchstart',()=>{},{passive:true});
const PRESS='.card[onclick],.pill,.mi,button.btn';
let pressEl=null;
const PRESSV=PRESS+',a.ind,a.btn,a.obtn,button.tile';
document.addEventListener('pointerdown',e=>{const el=e.target.closest(PRESSV);if(el){el.classList.add('pressed');pressEl=el}},{passive:true});
['pointerup','pointercancel'].forEach(ev=>document.addEventListener(ev,()=>{if(pressEl){const el=pressEl;pressEl=null;setTimeout(()=>el.classList.remove('pressed'),170)}},{passive:true}));
document.addEventListener('click',e=>{
  const el=e.target.closest(PRESS);
  if(!el||el._go||e.target.closest('a,input,select,textarea,label'))return;
  e.stopPropagation();e.preventDefault();
  if(el._p)return;el._p=true;el.classList.add('pressed');
  setTimeout(()=>{el._p=false;el._go=true;el.click();el._go=false;el.classList.remove('pressed')},150);
},true);
window.addEventListener('resize',()=>{if(map)map.invalidateSize();mms.forEach(m=>m.invalidateSize())});
(()=>{
  const F={home:'views/home.js',notif:'views/notifiche.js',notifD:'views/notifiche.js',events:'views/eventi.js',eventD:'views/eventi.js',services:'views/servizi.js',serviceD:'views/servizi.js',admin:'views/amministrazione.js',orgs:'views/amministrazione.js',sindaco:'views/amministrazione.js',contacts:'views/contatti.js',pay:'views/pagamenti.js',report:'views/segnalazioni.js',login:'views/account.js',profile:'views/account.js',account:'views/account.js'};
  const bad=[...new Set(Object.keys(F).filter(k=>typeof window[k]!=='function').map(k=>F[k]))];
  if(typeof POIS==='undefined')bad.push('data.js');
  if(bad.length){const d=document.createElement('div');d.style.cssText='position:fixed;left:12px;right:12px;bottom:12px;z-index:5000;background:#FF3B30;color:#fff;border-radius:14px;padding:12px 14px;font-size:13px;line-height:1.4;box-shadow:0 6px 20px rgba(0,0,0,.4)';d.innerHTML='<b>File non caricati o danneggiati:</b> '+bad.map(b=>'js/'+b).join(', ')+'<br>Sostituiscili con quelli dello zip e ricarica la pagina.';document.body.appendChild(d)}
})();
applyTheme();render();
