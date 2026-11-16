/* Schermata Contatti */
function contacts(A){
  const r=(l,v,h)=>`<div class="sec"><b>${l}</b><div>${h?`<a href="${h}" target="_blank" rel="noopener">${v}</a>`:v}</div></div>`;
  const so=(i,v,h)=>`<a href="${h}" target="_blank" rel="noopener" style="display:flex;gap:26px;align-items:center;padding:12px 40px;font-size:14px"><i class="${i}" style="font-size:26px;width:28px;text-align:center"></i>${v}</a>`;
  A.innerHTML=`<h1 class="t" style="color:var(--tx)">${t('Contatti')}</h1>${r('Sede comunale','Via Cesare Battisti, 2','https://maps.google.com/?q=Via+Cesare+Battisti+2+San+Donato+Milanese')}${r('Telefono','<i class="fa-solid fa-phone"></i> 02527721','tel:02527721')}${r('PEC','<i class="fa-regular fa-envelope"></i> protocollo@cert.comune.sandonatomilanese.mi.it','mailto:protocollo@cert.comune.sandonatomilanese.mi.it')}
  <div class="sec"><b>Seguici sui Social</b></div>${so('fa-brands fa-instagram','@comunesdm','https://www.instagram.com/comunesdm')}${so('fa-brands fa-facebook-f','Comune di San Donato Milanese','https://www.facebook.com/')}${so('fa-brands fa-youtube','@comunesdm','https://www.youtube.com/@comunesdm')}`;
}
