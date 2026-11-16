/* Schermate Servizi (lista + dettaglio) */
/* ============ SERVIZI ============ */
function services(A){A.innerHTML=`${SEARCH('Cerca un servizio...','listS')}<div id="lst" style="display:flex;flex-direction:column;gap:18px"></div>`;listS('')}
function listS(q){
  q=q.toLowerCase();const l=SERV.filter(s=>(s.t+s.s).toLowerCase().includes(q));
  $('#lst').innerHTML=l.length?l.map(s=>`<div class="card" onclick="go('serviceD',${s.id})" style="cursor:pointer;text-align:center"><h2 class="pr" style="font-weight:700;font-size:18px;margin:0 0 8px">${s.t}</h2><p style="font-size:13px;margin:0;line-height:1.4">${s.s}</p></div>`).join(''):NOTH;
}
function serviceD(A){
  const s=SERV.find(x=>x.id===arg);
  A.innerHTML=`${BACK()}<h1 class="t">${s.t}</h1><p style="text-align:center;font-size:14px;line-height:1.5;margin:0 0 14px">${s.s}</p>
  <div style="text-align:center;margin-bottom:14px"><button class="btn" onclick="toast('Reindirizzamento al portale dei servizi online...')">Accedi al servizio</button></div>
  <div class="sec"><b>A chi è rivolto</b><div style="text-align:left">${s.to}</div></div><div class="sec"><b>Descrizione</b><div style="text-align:left">${s.d}</div></div>
  <div class="sec"><b>Link utili</b><div>${s.l.map(x=>`<a class="pr" style="display:block;text-decoration:underline" href="https://www.comune.sandonatomilanese.mi.it" target="_blank" rel="noopener">${x}</a>`).join('')}</div></div><div class="sec"><b>Cosa fare</b><div style="text-align:left">${s.f}</div></div>`;
}
