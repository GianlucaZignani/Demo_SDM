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
  A.innerHTML=`${BACK()}<div style="display:flex;gap:14px;margin-bottom:12px">${im(IMG.sindaco,'width:105px;height:135px;object-fit:cover;border-radius:12px;flex:none','fa-user-tie')}<div style="flex:1;text-align:center"><h1 class="t" style="margin-bottom:2px">Francesco Squeri</h1><div style="font-size:13px;margin-bottom:8px">Sindaco</div><p style="font-size:13px;line-height:1.45;margin:0;text-align:left">Nato a Belluno nel 1959, è cresciuto a San Donato prendendo parte fin da giovane alla vita della comunità e delle associazioni sandonatesi. Sposato, padre di tre figli, nonno, è imprenditore nel settore della distribuzione degli idrocarburi.</p></div></div>
  <div class="sec"><b>Data di inizio incarico</b><div>28 giugno 2022</div></div><div class="sec"><b>Tipo di incarico</b><div>Politico</div></div>
  <div class="sec"><b>Assessore di</b><div>Polizia locale<br>Polizia locale - Unità comando<br>Polizia locale - Unità operativa<br>Ufficio comunicazioni</div></div><div class="sec"><b>Responsabile di</b><div>Protezione civile</div></div>`;
}
