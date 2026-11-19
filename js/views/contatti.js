/* Schermata Contatti: recapiti, mappa, orari con stato "aperto ora", numeri utili, social e scorciatoie */
const SDM_P=[45.41065,9.27345];
const SDM_H={1:[[8.5,13]],2:[[8.5,13]],3:[[8.5,13]],4:[[8.5,13],[14,16.5]],5:[[8.5,13]],6:[[8.5,11.5]],0:[]};
const DAYN=['Domenica','Lunedì','Martedì','Mercoledì','Giovedì','Venerdì','Sabato'];
const hfmt=h=>Math.floor(h)+':'+String(Math.round((h-Math.floor(h))*60)).padStart(2,'0');
const isOpenNow=()=>{const n=new Date(),h=n.getHours()+n.getMinutes()/60;return (SDM_H[n.getDay()]||[]).some(r=>h>=r[0]&&h<r[1])};
function cpy(txt){
  const ok=()=>toast('Copiato negli appunti');
  if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(txt).then(ok,()=>toast('Copia non riuscita'));return}
  const a=document.createElement('textarea');a.value=txt;document.body.appendChild(a);a.select();
  try{document.execCommand('copy');ok()}catch(e){toast('Copia non riuscita')}a.remove();
}
function contacts(A){
  A.classList.add('cw');
  const open=isOpenNow(),today=new Date().getDay();
  const row=(bg,ic,label,val,href,copy)=>`<div class="crow"><a class="mi" ${href?`href="${href}" ${/^http/.test(href)?'target="_blank" rel="noopener"':''}`:''}><span class="ic" style="background:${bg}"><i class="fa-solid ${ic}"></i></span><span style="flex:1;min-width:0"><span class="mut" style="display:block;font-size:12px">${label}</span><b style="font-size:14px;word-break:break-word">${val}</b></span></a>${copy?`<button type="button" class="cpy" onclick="cpy('${copy}')" aria-label="Copia ${label}"><i class="fa-regular fa-copy"></i></button>`:''}</div>`;
  const qa=(ic,l,href,ext)=>`<a class="obtn" style="flex-direction:column;gap:6px;padding:12px 6px;border-radius:18px" href="${href}" ${ext?'target="_blank" rel="noopener"':''}><i class="${ic} pr" style="font-size:20px"></i><span style="font-size:13px">${l}</span></a>`;
  const hours=[1,2,3,4,5,6,0].map(d=>{
    const r=SDM_H[d],txt=r.length?r.map(x=>hfmt(x[0])+' - '+hfmt(x[1])).join(' / '):'Chiuso',t=d===today;
    return `<div class="hr${t?' today':''}"><span>${DAYN[d]}${t?' <em>oggi</em>':''}</span><span style="${r.length?'':'color:#FF3B30;font-weight:600'}">${txt}</span></div>`}).join('');
  const util=POIS.filter(p=>(p.c==='Sicurezza'||/Biblioteca/.test(p.n))&&p.t).map(p=>`<div class="crow"><a class="mi" href="tel:${p.t}"><span class="ic" style="background:${CATS[p.c]}"><i class="fa-solid ${CAT_ICON[p.c]||'fa-phone'}"></i></span><span style="flex:1;min-width:0"><b style="font-size:14px">${esc(p.n)}</b><span class="mut" style="display:block;font-size:12px">${p.t.replace(/^\+39/,'')}</span></span><i class="fa-solid fa-phone pr"></i></a></div>`).join('');
  const soc=(ic,col,l,sub,href)=>`<a class="obtn" style="flex-direction:column;gap:4px;padding:14px 6px;border-radius:18px;text-align:center" href="${href}" target="_blank" rel="noopener"><i class="${ic}" style="font-size:24px;color:${col}"></i><span style="font-size:13px">${l}</span><span class="mut" style="font-size:11px;font-weight:400">${sub}</span></a>`;
  A.innerHTML=`<h1 class="t" style="margin-bottom:4px">${t('Contatti')}</h1>
  <p class="mut" style="text-align:center;font-size:14px;margin:0 0 18px">Come raggiungere e contattare il Comune.</p>
  <div class="cgrid"><div class="ccol">
    <section class="card" style="text-align:center;padding:22px 16px">
      <div class="ic" style="width:64px;height:64px;border-radius:20px;margin:0 auto 12px;background:linear-gradient(135deg,#1F6FB5,#0A84FF);font-size:28px"><i class="fa-solid fa-building-columns"></i></div>
      <b style="font-size:18px">Comune di San Donato Milanese</b>
      <div class="mut" style="font-size:13px;margin:4px 0 10px">Via Cesare Battisti, 2 · 20097 San Donato Milanese (MI)</div>
      <span class="stt${open?'':' no'}">${open?'Aperto ora':'Chiuso ora'}</span>
      <div style="display:flex;gap:10px;margin-top:16px">${qa('fa-solid fa-phone','Chiama','tel:02527721')}${qa('fa-regular fa-envelope','Scrivi','mailto:protocollo@cert.comune.sandonatomilanese.mi.it')}${qa('fa-solid fa-diamond-turn-right',t('Indicazioni'),dir(SDM_P),1)}</div></section>
    <section class="card" style="padding:12px"><div style="position:relative"><div id="mm" class="mm"></div><a class="ind" style="position:absolute;right:10px;bottom:10px;z-index:500" target="_blank" rel="noopener" href="${dir(SDM_P)}">${t('Indicazioni')}</a></div></section>
    <div><h2 class="sech">RECAPITI</h2><section class="card" style="padding:4px 4px">
      ${row('#0A84FF','fa-location-dot','Sede comunale','Via Cesare Battisti, 2','https://maps.google.com/?q=Via+Cesare+Battisti+2+San+Donato+Milanese','Via Cesare Battisti, 2, San Donato Milanese')}
      ${row('#34C759','fa-phone','Telefono (centralino)','02527721','tel:02527721','02527721')}
      ${row('#5856D6','fa-envelope-circle-check','PEC','protocollo@cert.comune.sandonatomilanese.mi.it','mailto:protocollo@cert.comune.sandonatomilanese.mi.it','protocollo@cert.comune.sandonatomilanese.mi.it')}
      ${row('#FF9500','fa-globe','Sito istituzionale','comune.sandonatomilanese.mi.it','https://www.comune.sandonatomilanese.mi.it','https://www.comune.sandonatomilanese.mi.it')}</section></div>
  </div><div class="ccol">
    <div><h2 class="sech">ORARI AL PUBBLICO</h2><section class="card" style="padding:8px 16px">${hours}</section></div>
    <div><h2 class="sech">NUMERI UTILI</h2><section class="card" style="padding:4px 4px">
      <div class="crow"><a class="mi" href="tel:112"><span class="ic" style="background:#FF3B30"><i class="fa-solid fa-truck-medical"></i></span><span style="flex:1"><b style="font-size:14px">Emergenze</b><span class="mut" style="display:block;font-size:12px">Numero unico europeo 112</span></span><i class="fa-solid fa-phone pr"></i></a></div>${util}</section></div>
    <div><h2 class="sech">SEGUICI SUI SOCIAL</h2><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px">
      ${soc('fa-brands fa-instagram','#E1306C','Instagram','@comunesdm','https://www.instagram.com/comunesdm')}
      ${soc('fa-brands fa-facebook-f','#1877F2','Facebook','Comune di San Donato Milanese','https://www.facebook.com/search/top?q=Comune%20di%20San%20Donato%20Milanese')}
      ${soc('fa-brands fa-youtube','#FF0000','YouTube','@comunesdm','https://www.youtube.com/@comunesdm')}</div></div>
    <div><h2 class="sech">HAI BISOGNO DI AIUTO?</h2><section class="card" style="padding:4px 4px">
      <div class="crow"><button type="button" class="mi" onclick="go('report')"><span class="ic" style="background:#FF9500"><i class="fa-solid fa-triangle-exclamation"></i></span><span style="flex:1"><b style="font-size:14px">Segnala un problema</b><span class="mut" style="display:block;font-size:12px">Buche, illuminazione, rifiuti e altro</span></span><i class="fa-solid fa-chevron-right mut"></i></button></div>
      <div class="crow"><button type="button" class="mi" onclick="go('pay')"><span class="ic" style="background:#0A84FF"><i class="fa-solid fa-credit-card"></i></span><span style="flex:1"><b style="font-size:14px">Pagamenti online</b><span class="mut" style="display:block;font-size:12px">Tributi e servizi con pagoPA</span></span><i class="fa-solid fa-chevron-right mut"></i></button></div></section></div>
  </div></div>`;
  miniMap('mm',SDM_P);
}
