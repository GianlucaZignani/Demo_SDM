/* Schermate Notifiche (lista + dettaglio) */
/* ============ NOTIFICHE ============ */
function notif(A){A.innerHTML=`${SEARCH('Cerca una notifica...','listN')}<div id="lst" style="display:flex;flex-direction:column;gap:22px"></div>`;listN('')}
function listN(q){
  q=q.toLowerCase();const l=NOTIF.filter(n=>(n.t+n.e).toLowerCase().includes(q));
  $('#lst').innerHTML=l.length?l.map(n=>`<div class="card" onclick="readN(${n.id})" style="cursor:pointer">${S.read.includes(n.id)?'':`<span class="chip">${t('Non letta')}</span>`}<h2 class="pr" style="font-weight:700;font-size:18px;text-align:center;margin:0 0 10px">${n.t}</h2><div style="display:flex;gap:12px;align-items:center">${im(IMG.notifiche+n.f,'width:100px;height:80px;object-fit:cover;border-radius:4px;flex:none',n.i)}<p style="font-size:13px;margin:0;text-align:center;line-height:1.4">${n.e}</p></div></div>`).join(''):NOTH;
}
function readN(id){if(!S.read.includes(id)){S.read.push(id);save()}go('notifD',id)}
function notifD(A){
  A.classList.add('dt');
  const n=NOTIF.find(x=>x.id===arg),others=NOTIF.filter(x=>x.id!==n.id);
  const hero=`<div class="card dhero"><div class="hb2"><span class="tg" style="background:#FF9500">Notizia</span><h1>${n.t}</h1></div></div>`;
  A.innerHTML=detailPage({hero,secs:[
    {ic:'fa-file-lines',bg:'#FF9500',t:'Dettagli',html:`<p class="mut" style="margin:0 0 10px;font-size:13px">${n.d}</p>`+n.b.map(x=>`<p style="margin:0 0 10px">${x}</p>`).join('')},
    {ic:'fa-location-dot',bg:'#0A84FF',t:'Luogo',html:`<div style="margin-bottom:10px">${mapBox('mm',n.p)}</div><b>${n.pl}</b>`},
    {ic:'fa-newspaper',bg:'#5856D6',t:'Altre notizie',html:`<div style="margin:0 -8px">${others.map(o=>`<div class="crow"><button type="button" class="mi" onclick="readN(${o.id})"><span class="ic" style="background:#FF9500"><i class="fa-solid ${o.i}"></i></span><span style="flex:1;min-width:0"><b style="font-size:14px">${o.t}</b><span class="mut" style="display:block;font-size:12px">${o.d}</span></span><i class="fa-solid fa-chevron-right mut"></i></button></div>`).join('')}</div>`}]});
  miniMap('mm',n.p);badge();
}
