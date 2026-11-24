/* Schermate Amministrazione (3 livelli) */
/* ============ AMMINISTRAZIONE ============ */
function admin(A){A.innerHTML=`${SEARCH('Cerca in amministrazione...','listA')}<div id="lst" style="display:flex;flex-direction:column;gap:20px;padding:0 6px"></div>`;listA('')}
function listA(q){
  q=q.toLowerCase();const l=ADM.filter(a=>a.toLowerCase().includes(q));
  $('#lst').innerHTML=l.length?l.map(a=>`<button class="pill" onclick="${a==='Organi di governo'?"go('orgs')":"toast('Sezione consultabile sul portale istituzionale')"}">${a}</button>`).join(''):NOTH;
}
function orgs(A){A.innerHTML=`${BACK()}${SEARCH('Cerca organi di governo...','listO')}<div id="lst" style="display:flex;flex-direction:column;gap:20px;padding:0 6px"></div>`;listO('')}
function listO(q){
  q=q.toLowerCase();const l=ORG.filter(a=>a.toLowerCase().includes(q));
  $('#lst').innerHTML=l.length?l.map(o=>`<button class="pill" onclick="${o==='Sindaco'?"go('sindaco')":"toast('Scheda in aggiornamento')"}">${o}</button>`).join(''):NOTH;
}
EN['Cerca organi di governo...']='Search governing bodies...';
function sindaco(A){
  A.classList.add('dt');
  const li=x=>`<div class="li"><i class="fa-solid fa-circle-check" style="color:#34C759"></i><span>${x}</span></div>`;
  const hero=`<div class="card dhero" style="padding:16px;display:flex;gap:16px;align-items:center">${im(IMG.sindaco,'width:96px;height:124px;object-fit:cover;border-radius:14px;flex:none','fa-user-tie')}<div style="min-width:0"><span class="tg" style="background:#0A84FF">Sindaco</span><h1 style="margin:6px 0 0">Francesco Squeri</h1><div class="meta"><span class="mt"><i class="fa-regular fa-calendar-days"></i>28 giugno 2022</span></div></div></div>`;
  A.innerHTML=detailPage({hero,secs:[
    {ic:'fa-user',bg:'#0A84FF',t:'Biografia',html:`<p style="margin:0">Nato a Belluno nel 1959, è cresciuto a San Donato prendendo parte fin da giovane alla vita della comunità e delle associazioni sandonatesi. Sposato, padre di tre figli, nonno, è imprenditore nel settore della distribuzione degli idrocarburi.</p>`},
    {ic:'fa-briefcase',bg:'#34C759',t:'Incarico',html:`<div class="hr"><span class="mut">Data di inizio incarico</span><b>28 giugno 2022</b></div><div class="hr"><span class="mut">Tipo di incarico</span><b>Politico</b></div>`},
    {ic:'fa-sitemap',bg:'#5856D6',t:'Assessore di',html:['Polizia locale','Polizia locale - Unità comando','Polizia locale - Unità operativa','Ufficio comunicazioni'].map(li).join('')},
    {ic:'fa-clipboard-check',bg:'#FF9500',t:'Responsabile di',html:li('Protezione civile')}]});
}
