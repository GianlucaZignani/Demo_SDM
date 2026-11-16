/* Schermate Notifiche (lista + dettaglio) */
/* ============ NOTIFICHE ============ */
function notif(A){A.innerHTML=`${SEARCH('Cerca una notifica...','listN')}<div id="lst" style="display:flex;flex-direction:column;gap:22px"></div>`;listN('')}
function listN(q){
  q=q.toLowerCase();const l=NOTIF.filter(n=>(n.t+n.e).toLowerCase().includes(q));
  $('#lst').innerHTML=l.length?l.map(n=>`<div class="card" onclick="readN(${n.id})" style="cursor:pointer">${S.read.includes(n.id)?'':`<span class="chip">${t('Non letta')}</span>`}<h2 class="pr" style="font-weight:700;font-size:18px;text-align:center;margin:0 0 10px">${n.t}</h2><div style="display:flex;gap:12px;align-items:center">${im(IMG.notifiche+n.f,'width:100px;height:80px;object-fit:cover;border-radius:4px;flex:none',n.i)}<p style="font-size:13px;margin:0;text-align:center;line-height:1.4">${n.e}</p></div></div>`).join(''):NOTH;
}
function readN(id){if(!S.read.includes(id)){S.read.push(id);save()}go('notifD',id)}
function notifD(A){
  const n=NOTIF.find(x=>x.id===arg);
  A.innerHTML=`${BACK(n.d)}<h1 class="t">${n.t}</h1>${n.b.map(x=>`<p style="font-size:14px;line-height:1.5;margin:0;padding:12px 0;border-top:1px solid var(--bd)">${x}</p>`).join('')}
  <div style="border-top:1px solid var(--bd);padding-top:12px"><b style="font-size:14px">Luogo:</b><div style="margin:8px 0">${mapBox('mm',n.p)}</div><span style="font-size:13px">${n.pl}</span></div>`;
  miniMap('mm',n.p);badge();
}
