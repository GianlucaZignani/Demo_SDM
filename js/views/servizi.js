/* Schermate Servizi (lista + dettaglio) */
/* ============ SERVIZI ============ */
function services(A){A.innerHTML=`${SEARCH('Cerca un servizio...','listS')}<div id="lst" style="display:flex;flex-direction:column;gap:18px"></div>`;listS('')}
function listS(q){
  q=q.toLowerCase();const l=SERV.filter(s=>(s.t+s.s).toLowerCase().includes(q));
  $('#lst').innerHTML=l.length?l.map(s=>`<div class="card" onclick="go('serviceD',${s.id})" style="cursor:pointer;text-align:center"><h2 class="pr" style="font-weight:700;font-size:18px;margin:0 0 8px">${s.t}</h2><p style="font-size:13px;margin:0;line-height:1.4">${s.s}</p></div>`).join(''):NOTH;
}
function serviceD(A){
  A.classList.add('dt');
  const s=SERV.find(x=>x.id===arg);
  const hero=`<div class="card dhero" style="padding:22px 16px;text-align:center"><span class="ic" style="width:56px;height:56px;border-radius:18px;margin:0 auto 12px;background:linear-gradient(135deg,#1F6FB5,#0A84FF);font-size:24px"><i class="fa-solid fa-file-lines"></i></span><h1 style="margin:0 0 8px">${s.t}</h1><p style="font-size:14px;line-height:1.5;margin:0 0 16px">${s.s}</p><button type="button" class="btn" onclick="toast('Reindirizzamento al portale dei servizi online...')">Accedi al servizio</button></div>`;
  A.innerHTML=detailPage({hero,secs:[
    {ic:'fa-users',bg:'#0A84FF',t:'A chi è rivolto',html:s.to},
    {ic:'fa-align-left',bg:'#34C759',t:'Descrizione',html:s.d},
    {ic:'fa-link',bg:'#5856D6',t:'Link utili',html:`<div style="margin:0 -8px">${s.l.map(x=>`<div class="crow"><a class="mi" href="https://www.comune.sandonatomilanese.mi.it" target="_blank" rel="noopener"><span style="flex:1;min-width:0"><b style="font-size:14px">${x}</b></span><i class="fa-solid fa-arrow-up-right-from-square pr"></i></a></div>`).join('')}</div>`},
    {ic:'fa-list-check',bg:'#FF9500',t:'Cosa fare',html:s.f}]});
}
