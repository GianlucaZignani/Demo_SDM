/* Schermate Vivere la città (lista + dettaglio) */
/* ============ EVENTI ============ */
function events(A){A.innerHTML=`${SEARCH('Cerca un evento in città...','listE')}<div id="lst" style="display:flex;flex-direction:column;gap:20px"></div>`;listE('')}
function listE(q){
  q=q.toLowerCase();const l=EVENTI.filter(e=>(e.t+e.a+e.d+e.s).toLowerCase().includes(q));
  $('#lst').innerHTML=l.length?l.map(e=>`<div class="card" onclick="go('eventD',${e.id})" style="cursor:pointer;text-align:center"><h2 class="pr" style="font-weight:700;font-size:19px;margin:0 0 6px">${e.t}</h2><p style="font-size:13px;margin:0 0 12px">${e.s}</p><p style="font-size:13px;margin:6px 0;display:flex;gap:10px;align-items:center;text-align:left"><i class="fa-regular fa-calendar-days" style="font-size:18px;width:22px;text-align:center"></i>${e.d}</p><p style="font-size:13px;margin:6px 0 0;display:flex;gap:10px;align-items:center;text-align:left"><i class="fa-solid fa-location-dot" style="font-size:18px;width:22px;text-align:center"></i>${e.a}</p></div>`).join(''):NOTH;
}
function eventD(A){
  const e=EVENTI.find(x=>x.id===arg);
  A.innerHTML=`${BACK()}<h1 class="t" style="margin-bottom:4px">${e.t}</h1><p style="text-align:center;font-size:13px;margin:0 0 12px">${e.s}</p>
  <div class="sec"><b>Data e orari</b><div>${e.dd.join('<br>')}</div></div>
  <div class="sec"><b>Luogo</b><div style="margin:8px 0">${mapBox('mm',e.p)}</div><span style="font-size:13px">${e.a}</span></div>
  <div class="sec"><b>Cos'è</b><div>${e.w}</div></div><div class="sec"><b>Costo</b><div>${e.cost}</div></div>
  <div class="sec"><b>Contatti</b><div style="text-align:left"><p style="margin:2px 0"><i class="fa-regular fa-envelope" style="width:24px"></i>${e.em}</p><p style="margin:2px 0"><i class="fa-solid fa-phone" style="width:24px"></i>${e.tel}</p></div></div>`;
  miniMap('mm',e.p);
}
