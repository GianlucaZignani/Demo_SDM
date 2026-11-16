/* Avvio app ed eventi globali */
/* ============ EVENTI GLOBALI ============ */
$('#logo').onclick=()=>{stack=[];go('home',null,true)};
$('#bAcc').onclick=()=>go('account');
$('#bNot').onclick=()=>go('notif');
$('#bMenu').onclick=e=>{e.stopPropagation();$('#sheet').classList.remove('on');$('#menu').classList.toggle('on')};
document.addEventListener('click',e=>{if(!e.target.closest('#menu'))$('#menu').classList.remove('on')});
applyTheme();render();
