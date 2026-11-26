/* Schermata Pagamenti online (PagoPA): scheda iniziale, passaggi, portali, cosa serve, aiuto */
function pay(A){
  A.classList.add('cw');
  const step=(n,ti,sub)=>`<div class="crow" style="padding:12px;gap:12px"><span class="sn">${n}</span><span style="flex:1;min-width:0"><b style="font-size:14px">${ti}</b><span class="mut" style="display:block;font-size:12px">${sub}</span></span></div>`;
  const portal=(bg,ic,ti,sub,href)=>`<div class="crow"><a class="mi" href="${href}" target="_blank" rel="noopener"><span class="ic" style="background:${bg}"><i class="fa-solid ${ic}"></i></span><span style="flex:1;min-width:0"><b style="font-size:14px">${ti}</b><span class="mut" style="display:block;font-size:12px">${sub}</span></span><i class="fa-solid fa-arrow-up-right-from-square pr"></i></a></div>`;
  const help=(bg,ic,ti,sub,go_)=>`<div class="crow"><button type="button" class="mi" onclick="${go_}"><span class="ic" style="background:${bg}"><i class="fa-solid ${ic}"></i></span><span style="flex:1"><b style="font-size:14px">${ti}</b><span class="mut" style="display:block;font-size:12px">${sub}</span></span><i class="fa-solid fa-chevron-right mut"></i></button></div>`;
  const li=x=>`<div class="li"><i class="fa-solid fa-circle-check" style="color:#34C759"></i><span>${x}</span></div>`;
  A.innerHTML=`<div class="card dhero"><div class="hb2"><h1 style="margin:0 0 10px">Pagamenti online e PagoPA</h1>
    <p style="font-size:14px;line-height:1.55;margin:0 0 10px">Per la quasi totalità dei pagamenti verso il nostro comune è prevista la modalità con avviso di pagamento PagoPA.</p>
    <p style="font-size:14px;line-height:1.55;margin:0">Per pagare uno dei servizi per il quale hai ricevuto un avviso di pagamento (in formato cartaceo o un file pdf) puoi utilizzare uno dei portali messi a disposizione.</p></div></div>
  <div class="cgrid">
    <div class="cs"><h2 class="sech">COME PAGARE</h2><section class="card" style="padding:4px 4px">
      ${step(1,'Prendi il tuo avviso di pagamento','In formato cartaceo o file PDF')}
      ${step(2,'Scegli uno dei portali','Comunale o della Regione Lombardia')}
      ${step(3,"Inserisci i dati dell'avviso",'Codice avviso e codice fiscale dell\'ente, poi paga online')}</section></div>
    <div class="cs"><h2 class="sech">SCEGLI IL PORTALE</h2><section class="card" style="padding:4px 4px">
      ${portal('#0A84FF','fa-building-columns','Portale dei pagamenti comunali','Pagamenti verso il Comune','https://www.pagopa.gov.it')}
      ${portal('#34C759','fa-landmark-flag','Portale dei pagamenti di Regione Lombardia','Pagamenti verso la Regione','https://www.regione.lombardia.it')}</section></div>
    <div class="cs"><h2 class="sech">COSA TI SERVE</h2><section class="card" style="padding:8px 16px">
      ${li('Avviso di pagamento PagoPA, cartaceo o PDF')}${li("Codice avviso e codice fiscale dell'ente, riportati sull'avviso")}${li('Carta o conto per pagare online')}</section></div>
    <div class="cs"><h2 class="sech">HAI BISOGNO DI AIUTO?</h2><section class="card" style="padding:4px 4px">
      ${help('#5856D6','fa-phone','Contatta il Comune','Telefono, PEC e orari al pubblico',"go('contacts')")}
      ${help('#FF9500','fa-table-cells-large','Servizi comunali','Pratiche e moduli',"go('services')")}</section></div>
  </div>`;
}
