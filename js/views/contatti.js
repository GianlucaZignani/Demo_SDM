/* Schermata Contatti: recapiti con pulsanti, mappa con indirizzo, orari "aperto ora", numeri utili, social e scorciatoie */
const SDM_P=[45.41065,9.27345];
const SDM_H={1:[[8.5,13]],2:[[8.5,13]],3:[[8.5,13]],4:[[8.5,13],[14,16.5]],5:[[8.5,13]],6:[[8.5,11.5]],0:[]};
const DAYN=['Domenica','Lunedì','Martedì','Mercoledì','Giovedì','Venerdì','Sabato'];
const hfmt=h=>Math.floor(h)+':'+String(Math.round((h-Math.floor(h))*60)).padStart(2,'0');
const isOpenNow=()=>{const n=new Date(),h=n.getHours()+n.getMinutes()/60;return (SDM_H[n.getDay()]||[]).some(r=>h>=r[0]&&h<r[1])};
function contacts(A){
  A.classList.add('cw');
  const today=new Date().getDay();
  /* riga recapito: dato + un solo pulsante d'azione (+ copia) */
  const row=(bg,ic,label,val,bic,bl,href,ext,copy)=>`<div class="crow" style="padding:12px;gap:10px"><span class="ic" style="background:${bg}"><i class="fa-solid ${ic}"></i></span><span style="flex:1;min-width:0"><span class="mut" style="display:block;font-size:12px">${label}</span><b style="font-size:14px;word-break:break-word">${val}</b></span><a class="obtn" style="flex:none;width:104px;box-sizing:border-box;padding:9px 0;font-size:13px" href="${href}" ${ext?'target="_blank" rel="noopener"':''}><i class="fa-solid ${bic}"></i>${bl}</a></div>`;
  const hours=[1,2,3,4,5,6,0].map(d=>{
    const r=SDM_H[d],txt=r.length?r.map(x=>hfmt(x[0])+' - '+hfmt(x[1])).join(' / '):'Chiuso',t=d===today;
    return `<div class="hr${t?' today':''}"><span>${DAYN[d]}${t?' <em>oggi</em>':''}</span><span style="${r.length?'':'color:#FF3B30;font-weight:600'}">${txt}</span></div>`}).join('');
  const plain=(href,ti,sub)=>`<div class="crow"><a class="mi" href="${href}"><span style="flex:1;min-width:0"><b style="font-size:14px">${ti}</b><span class="mut" style="display:block;font-size:12px">${sub}</span></span><i class="fa-solid fa-phone pr"></i></a></div>`;
  const util=POIS.filter(p=>p.c==='Sicurezza'&&p.t).map(p=>plain('tel:'+p.t,esc(p.n),p.t.replace(/^\+39/,''))).join('');
  const soc=(ic,bg,l,sub,href)=>`<div class="crow"><a class="mi" href="${href}" target="_blank" rel="noopener"><span class="ic" style="background:${bg}"><i class="${ic}"></i></span><span style="flex:1;min-width:0"><b style="font-size:14px">${l}</b><span class="mut" style="display:block;font-size:12px">${sub}</span></span><i class="fa-solid fa-chevron-right mut"></i></a></div>`;
  A.innerHTML=`<h1 class="t" style="margin-bottom:18px">${t('Contatti')}</h1>
  <div class="cgrid">
    <section class="card cc" style="padding:6px 4px">
      ${row('#34C759','fa-phone','Telefono (centralino)','02527721','fa-phone','Chiama','tel:02527721',0,'02527721')}
      ${row('#5856D6','fa-envelope-circle-check','PEC','protocollo@cert.comune.sandonatomilanese.mi.it','fa-paper-plane','Scrivi','mailto:protocollo@cert.comune.sandonatomilanese.mi.it',0,'protocollo@cert.comune.sandonatomilanese.mi.it')}
      ${row('#FF9500','fa-globe','Sito istituzionale','comune.sandonatomilanese.mi.it','fa-arrow-up-right-from-square','Apri','https://www.comune.sandonatomilanese.mi.it',1,'https://www.comune.sandonatomilanese.mi.it')}</section>
    <section class="card mapc" style="padding:12px"><div class="mw"><div id="mm" class="mm"></div><a class="ind" style="position:absolute;right:10px;bottom:10px;z-index:500" target="_blank" rel="noopener" href="${dir(SDM_P)}">${t('Indicazioni')}</a></div>
      <div class="maddr"><i class="fa-solid fa-location-dot pr" style="font-size:20px;width:24px;text-align:center"></i><div><b>Sede comunale</b><div class="mut" style="font-size:13px">Via Cesare Battisti, 2 · 20097 San Donato Milanese (MI)</div></div></div></section>
    <div class="cs"><h2 class="sech">ORARI AL PUBBLICO</h2><section class="card hrs" style="padding:8px 16px">${hours}</section></div>
    <div class="cs"><h2 class="sech">NUMERI UTILI</h2><section class="card" style="padding:4px 4px">${plain('tel:112','Emergenze','Numero unico europeo 112')}${util}</section></div>
    <div class="cs sx"><h2 class="sech">SEGUICI SUI SOCIAL</h2><section class="card" style="padding:4px 4px">
      ${soc('fa-brands fa-instagram','#E1306C','Instagram','@comunesdm','https://www.instagram.com/comunesdm')}
      ${soc('fa-brands fa-facebook-f','#1877F2','Facebook','Comune di San Donato Milanese','https://www.facebook.com/search/top?q=Comune%20di%20San%20Donato%20Milanese')}
      ${soc('fa-brands fa-youtube','#FF0000','YouTube','@comunesdm','https://www.youtube.com/@comunesdm')}</section></div>
  </div>`;
  miniMap('mm',SDM_P);
}
