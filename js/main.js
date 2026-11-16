/* Avvio app ed eventi globali */
/* ============ EVENTI GLOBALI ============ */
$('#logo').onclick=()=>{stack=[];go('home',null,true)};
$('#bAcc').onclick=()=>go('account');
$('#bNot').onclick=()=>go('notif');
$('#bMenu').onclick=e=>{e.stopPropagation();$('#sheet').classList.remove('on');$('#menu').classList.toggle('on')};
document.addEventListener('click',e=>{if(!e.target.closest('#menu'))$('#menu').classList.remove('on')});
new MutationObserver(enhance).observe($('#app'),{childList:true,subtree:true});
document.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('.card[role=button]')){e.preventDefault();e.target.click()}});
applyTheme();render();
