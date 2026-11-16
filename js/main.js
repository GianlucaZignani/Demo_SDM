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
document.addEventListener('pointerdown',e=>{const el=e.target.closest(PRESS);if(el){el.classList.add('pressed');pressEl=el}},{passive:true});
['pointerup','pointercancel'].forEach(ev=>document.addEventListener(ev,()=>{if(pressEl){const el=pressEl;pressEl=null;setTimeout(()=>el.classList.remove('pressed'),170)}},{passive:true}));
document.addEventListener('click',e=>{
  const el=e.target.closest(PRESS);
  if(!el||el._go||e.target.closest('a,input,select,textarea,label'))return;
  e.stopPropagation();e.preventDefault();
  if(el._p)return;el._p=true;el.classList.add('pressed');
  setTimeout(()=>{el._p=false;el._go=true;el.click();el._go=false;el.classList.remove('pressed')},150);
},true);
window.addEventListener('resize',()=>{if(map)map.invalidateSize();mms.forEach(m=>m.invalidateSize())});
applyTheme();render();
