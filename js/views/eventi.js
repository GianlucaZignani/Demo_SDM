/* Schermate Vivere la città (lista + dettaglio) */
/* ============ EVENTI ============ */
function events(A){A.innerHTML=`${SEARCH('Cerca un evento in città...','listE')}<div id="lst" style="display:flex;flex-direction:column;gap:20px"></div>`;listE('')}
function listE(q){
  q=q.toLowerCase();const l=EVENTI.filter(e=>(e.t+e.a+e.d+e.s).toLowerCase().includes(q));
  $('#lst').innerHTML=l.length?l.map(e=>`<div class="card" onclick="go('eventD',${e.id})" style="cursor:pointer;text-align:center"><h2 class="pr" style="font-weight:700;font-size:19px;margin:0 0 6px">${e.t}</h2><p style="font-size:13px;margin:0 0 12px">${e.s}</p><p style="font-size:13px;margin:6px 0;display:flex;gap:10px;align-items:center;text-align:left"><i class="fa-regular fa-calendar-days" style="font-size:18px;width:22px;text-align:center"></i>${e.d}</p><p style="font-size:13px;margin:6px 0 0;display:flex;gap:10px;align-items:center;text-align:left"><i class="fa-solid fa-location-dot" style="font-size:18px;width:22px;text-align:center"></i>${e.a}</p></div>`).join(''):NOTH;
}
function eventD(A){
  A.classList.add('dt');
  const e=EVENTI.find(x=>x.id===arg),others=EVENTI.filter(x=>x.id!==e.id);
  const act=(ic,val,bl,bic,href)=>`<div class="crow" style="padding:8px 0;gap:10px"><span class="ic" style="background:#5856D6"><i class="fa-solid ${ic}"></i></span><span style="flex:1;min-width:0;word-break:break-word"><b style="font-size:14px">${val}</b></span><a class="obtn" style="flex:none;width:104px;box-sizing:border-box;padding:9px 0;font-size:13px" href="${href}"><i class="fa-solid ${bic}"></i>${bl}</a></div>`;
  const hero=`<div class="card dhero"><div class="hb2"><span class="tg" style="background:#34C759">Evento</span><h1>${e.t}</h1><p style="font-size:14px;margin:0">${e.s}</p><div class="meta"><span class="mt"><i class="fa-regular fa-calendar-days"></i>${e.d}</span><span class="mt"><i class="fa-solid fa-location-dot"></i>${e.a}</span></div></div></div>`;
  const secs=[
    {ic:'fa-calendar-days',bg:'#34C759',t:'Data e orari',html:e.dd.map((x,i)=>`<p style="margin:0 0 6px;${i?'':'font-weight:700'}">${x}</p>`).join('')},
    {ic:'fa-location-dot',bg:'#0A84FF',t:'Luogo',html:`<div style="margin-bottom:10px">${mapBox('mm',e.p)}</div><b>${e.a}</b>`},
    {ic:'fa-circle-info',bg:'#FF9500',t:"Cos'è",html:`<p style="margin:0">${e.w}</p>`},
    {ic:'fa-tag',bg:'#AF52DE',t:'Costo',html:`<p style="margin:0;font-weight:700">${e.cost}</p>`},
    {ic:'fa-address-book',bg:'#5856D6',t:'Contatti',html:`${act('fa-envelope',e.em,'Scrivi','fa-paper-plane','mailto:'+e.em)}${act('fa-phone',e.tel,'Chiama','fa-phone','tel:'+e.tel.replace(/\s/g,''))}`}];
  if(others.length)secs.push({ic:'fa-calendar-plus',bg:'#FF3B30',t:'Altri eventi',html:`<div style="margin:0 -8px">${others.map(o=>`<div class="crow"><button type="button" class="mi" onclick="go('eventD',${o.id})"><span class="ic" style="background:#34C759"><i class="fa-solid fa-calendar-days"></i></span><span style="flex:1;min-width:0"><b style="font-size:14px">${o.t}</b><span class="mut" style="display:block;font-size:12px">${o.d}</span></span><i class="fa-solid fa-chevron-right mut"></i></button></div>`).join('')}</div>`});
  A.innerHTML=detailPage({hero,secs});
  miniMap('mm',e.p);
}
