/* Traduzione italiano → inglese di tutta l'app.
   Le schermate vengono costruite in italiano; con la lingua inglese ogni testo viene sostituito con la sua traduzione
   (testi dell'interfaccia, contenuti di notifiche, eventi e servizi, orari). Tornando all'italiano si ripristinano gli originali. */
const D={
/* menu e intestazione */
'Notifiche':'Notifications','Menù':'Menu','Vivere la città':'City life','Servizi':'Services','Pagamenti online':'Online payments','Amministrazione':'Administration','Contatti':'Contacts','Segnalazioni':'Reports','Indietro':'Back',
/* mappa e scheda luogo */
'Filtro':'Filter','Filtra per categoria':'Filter by category','Nessun luogo trovato':'No places found','Tutto':'All','Istruzione':'Education','Sanità e assistenza':'Health and care','Sicurezza':'Safety','Verde e svago':'Green spaces and leisure','Servizi urbani':'Urban services','Ristoranti':'Restaurants','Hotel':'Hotels',
'Cerca i luoghi vicini a te...':'Search places near you...','La mia posizione':'My location','Chiama':'Call','Sito web':'Website','Orari:':'Hours:','Indirizzo:':'Address:','Indicazioni':'Directions','Eventi e notizie':'Events and news','Notizia':'News','Evento':'Event',
'Nessun evento o notizia per questo luogo al momento.':'No events or news for this place at the moment.','Apri le foto del luogo':'Open the photos of this place','Chiudi':'Close','Nessuna foto disponibile':'No photo available','Foto precedente':'Previous photo','Foto successiva':'Next photo',
'Orari':'Hours','Consulta il sito del locale':'See the venue website',
/* notifiche, eventi, servizi */
'IN QUESTA PAGINA':'ON THIS PAGE','Indice':'Index','Dettagli':'Details','Altre notizie':'Other news','Altri eventi':'Other events','Biografia':'Biography','Incarico':'Office','Telefono':'Phone','COME PAGARE':'HOW TO PAY','SCEGLI IL PORTALE':'CHOOSE A PORTAL','COSA TI SERVE':'WHAT YOU NEED','HAI BISOGNO DI AIUTO?':'NEED HELP?','Prendi il tuo avviso di pagamento':'Get your payment notice','In formato cartaceo o file PDF':'Paper or PDF file','Scegli uno dei portali':'Choose one of the portals','Comunale o della Regione Lombardia':'Municipal or Lombardy Region',"Inserisci i dati dell'avviso":'Enter the notice details',"Codice avviso e codice fiscale dell'ente, poi paga online":'Notice code and the entity\'s tax code, then pay online','Pagamenti verso il Comune':'Payments to the Municipality','Pagamenti verso la Regione':'Payments to the Region','Avviso di pagamento PagoPA, cartaceo o PDF':'PagoPA payment notice, paper or PDF',"Codice avviso e codice fiscale dell'ente, riportati sull'avviso":'Notice code and the entity\'s tax code, shown on the notice','Carta o conto per pagare online':'Card or account to pay online','Contatta il Comune':'Contact the Municipality','Telefono, PEC e orari al pubblico':'Phone, PEC and opening hours','Servizi comunali':'Municipal services','Pratiche e moduli':'Forms and procedures','Cerca una notifica...':'Search a notification...','Non letta':'Unread','Luogo:':'Place:','Nessun risultato. Prova con altre parole chiave.':'No results. Try other keywords.',
'Cerca un evento in città...':'Search an event...','Data e orari':'Dates and times','Luogo':'Place',"Cos'è":'What it is','Costo':'Cost','Ingresso gratuito':'Free admission',
'Cerca un servizio...':'Search a service...','Accedi al servizio':'Go to the service','A chi è rivolto':'Who it is for','Descrizione':'Description','Link utili':'Useful links','Cosa fare':'What to do',
'Ministero degli Affari Esteri':'Ministry of Foreign Affairs','Servizi Consolari Fast It':'Fast It Consular Services','Portale SUE':'SUE Portal','Regione Lombardia':'Lombardy Region','Amministrazione trasparente':'Transparent administration',
/* amministrazione */
'Cerca in amministrazione...':'Search administration...','Cerca organi di governo...':'Search governing bodies...',
'Organi di governo':'Governing bodies','Aree amministrative':'Administrative areas','Uffici':'Offices','Politici':'Politicians','Personale amministrativo':'Administrative staff','Documenti e dati':'Documents and data',
'Sindaco':'Mayor','Giunta Comunale':'Municipal Executive','Presidente del Consiglio Comunale':'President of the City Council','Consiglio comunale':'City Council','Commissioni':'Committees','Comitato di Quartiere Poasco-Sorigherio':'Poasco-Sorigherio Neighborhood Committee',
'Nato a Belluno nel 1959, è cresciuto a San Donato prendendo parte fin da giovane alla vita della comunità e delle associazioni sandonatesi. Sposato, padre di tre figli, nonno, è imprenditore nel settore della distribuzione degli idrocarburi.':'Born in Belluno in 1959, he grew up in San Donato, taking part from a young age in the life of the community and of local associations. Married, father of three and grandfather, he is an entrepreneur in the hydrocarbons distribution sector.',
'Data di inizio incarico':'Start of term','Tipo di incarico':'Type of office','Politico':'Political','Assessore di':'Councillor for','Polizia locale':'Local police','Polizia locale - Unità comando':'Local police - Command unit','Polizia locale - Unità operativa':'Local police - Operations unit','Ufficio comunicazioni':'Communications office','Responsabile di':'Responsible for','Protezione civile':'Civil protection',
'Sezione consultabile sul portale istituzionale':'Section available on the official website','Scheda in aggiornamento':'Profile being updated',
/* contatti */
'Telefono (centralino)':'Phone (switchboard)','PEC':'PEC (certified email)','Sito istituzionale':'Official website','Scrivi':'Write','Apri':'Open','ORARI AL PUBBLICO':'OPENING HOURS','NUMERI UTILI':'USEFUL NUMBERS','SEGUICI SUI SOCIAL':'FOLLOW US','Sede comunale':'Town hall','Comando di Polizia Locale':'Local Police Command','Carabinieri - Comando Compagnia e Stazione':'Carabinieri - Company and Station Command','Protezione Civile San Donato Milanese':'San Donato Milanese Civil Protection','Municipio - Comune di San Donato Milanese':'Town Hall - Municipality of San Donato Milanese','Emergenze':'Emergencies','Numero unico europeo 112':'European emergency number 112','oggi':'today',
/* pagamenti */
'Pagamenti online e PagoPA':'Online payments and PagoPA','Per la quasi totalità dei pagamenti verso il nostro comune è prevista la modalità con avviso di pagamento PagoPA.':'For almost all payments to our municipality, the PagoPA payment notice method is used.',
'Per pagare uno dei servizi per il quale hai ricevuto un avviso di pagamento (in formato cartaceo o un file pdf) puoi utilizzare uno dei portali messi a disposizione.':'To pay for a service for which you received a payment notice (paper or PDF), you can use one of the portals provided.',
'Portale dei pagamenti comunali':'Municipal payments portal','Portale dei pagamenti di Regione Lombardia':'Lombardy Region payments portal',
/* segnalazioni */
'Segnala un problema alla città: bastano pochi minuti.':'Report a problem in the city: it only takes a few minutes.','Cosa stai segnalando?':'What are you reporting?','Manto stradale e buche':'Road surface and potholes','Segnaletica danneggiata':'Damaged road signs','Illuminazione pubblica':'Street lighting','Rifiuti e pulizia urbana':'Waste and street cleaning','Verde pubblico':'Public green areas','Altro':'Other',
'Specifica cosa vuoi segnalare':'Specify what you want to report','Es. fontana rotta, panchina danneggiata…':'E.g. broken fountain, damaged bench…',
'Dove si trova il problema?':'Where is the problem?','Tocca la mappa per spostare il segnaposto':'Tap the map to move the marker','Via e numero civico':'Street and number','Usa la mia posizione attuale':'Use my current location',
'Dettagli della segnalazione':'Report details','Soggetto (es. Buca profonda)':'Subject (e.g. Deep pothole)','Descrizione dettagliata del problema':'Detailed description of the problem','Foto':'Photos','(facoltativo · max 3 · JPEG, PNG)':'(optional · max 3 · JPEG, PNG)','Aggiungi foto':'Add photo','Rimuovi foto':'Remove photo',
'I tuoi recapiti':'Your contact details','Compilati dal tuo account':'Filled in from your account','Hai un account? Accedi per precompilare i dati.':'Have an account? Sign in to pre-fill your details.','Accedi':'Sign in','Nome e Cognome':'Full name','Telefono (facoltativo)':'Phone (optional)',
'INVIA SEGNALAZIONE UFFICIALE':'SUBMIT OFFICIAL REPORT','LE TUE SEGNALAZIONI':'YOUR REPORTS','Presa in carico':'Received','Segnalazione inviata':'Report sent','Il Comune ha preso in carico la tua pratica.':'The Municipality has taken charge of your request.','Conserva il codice per seguirne lo stato.':'Keep the code to follow its status.','Nuova segnalazione':'New report','Le mie segnalazioni':'My reports',
/* login e account */
'Accedi ai servizi':'Sign in to services','Seleziona "Entra con Gel" se sei in possesso di credenziali SPID/CIE/CNS. Seleziona "Entra con utente locale" se sei in possesso di credenziali dell\'Ente.':'Select "Sign in with Gel" if you have SPID/CIE/CNS credentials. Select "Sign in with local user" if you have credentials issued by the Municipality.',
'Entra con Gel':'Sign in with Gel','Entra con utente locale':'Sign in with local user','Accesso sicuro con identità digitale':'Secure access with digital identity',
'Notifiche non lette':'Unread notifications','PREFERENZE APP':'APP PREFERENCES','Lingua':'Language','Tema Scuro':'Dark mode','NOTIFICHE E AVVISI':'NOTIFICATIONS AND ALERTS','Avvisi di pubblica utilità':'Public utility alerts','Allerte meteo, scioperi e viabilità':'Weather alerts, strikes and traffic','Eventi e Manifestazioni':'Events and festivals','Street food, sagre e mercati':'Street food, fairs and markets',"Esci dall'Account":'Log out',
'Cambia foto profilo':'Change profile photo','Foto profilo':'Profile photo','Scegli dalla libreria':'Choose from library','Scatta una foto':'Take a photo',"OPPURE SCEGLI UN'EMOJI":'OR CHOOSE AN EMOJI','Rimuovi foto o emoji':'Remove photo or emoji','Annulla':'Cancel',
/* messaggi */
'Geolocalizzazione non disponibile':'Geolocation not available','Posizione non disponibile. Controlla i permessi.':'Location not available. Check permissions.','Impossibile ottenere la posizione. Controlla i permessi.':'Unable to get your location. Check permissions.',
'Reindirizzamento al portale dei servizi online...':'Redirecting to the online services portal...','Accesso effettuato':'Signed in','Disconnesso':'Signed out','Compila i campi evidenziati':'Fill in the highlighted fields','Segnalazione inviata con successo':'Report sent successfully',
'Formato non supportato: usa JPEG o PNG':'Unsupported format: use JPEG or PNG','Puoi caricare al massimo 3 foto':'You can upload up to 3 photos','Seleziona un file immagine':'Select an image file','Impossibile leggere la foto':'Unable to read the photo','Formato immagine non supportato':'Unsupported image format',
'Foto profilo aggiornata':'Profile photo updated','Emoji impostata':'Emoji set','Foto profilo rimossa':'Profile photo removed'
};
/* contenuti: i testi originali si leggono dai dati, così le chiavi coincidono sempre */
const X=(keys,vals)=>keys.forEach((k,i)=>{if(k&&vals[i]!==undefined)D[String(k).trim().replace(/\s+/g,' ')]=vals[i]});
const FR=h=>h.split(/<br>|<a[^>]*>|<\/a>/).map(x=>x.trim()).filter(Boolean);
try{
  const n=NOTIF,e=EVENTI,s=SERV;
  X([n[0].t,n[0].e,...n[0].b,n[0].pl],['Street Food: the street food season kicks off','This weekend Hop Hop Street Food offers the chance to taste culinary specialties.','The first of five events of 2026 dedicated to "street food" takes place in Santa Barbara square. From March to September, the square will host five food events, each with different specialties.','It starts from March 20 to 22 with Hop Hop Street Food, a journey through national and international flavors. From May 15 to 17 it will be the turn of Sicilian cuisine, while from June 12 to 14 the stars will be carbonara and Roman tradition dishes.','At the end of summer, on August 4 and 5, it is the Beer Festival, and the series ends from September 18 to 20 with Valtellina specialties.','Santa Barbara Square']);
  X([n[1].t,n[1].e,...n[1].b,n[1].pl],['Public transport: strike planned for Friday, November 20','A 24-hour general national strike has been called, which will also affect Autoguidovie employees.','A 24-hour local public transport strike is planned. Service will be guaranteed in the time slots 6:00-9:00 and 17:00-20:00.',"Check the updated timetables on the operator's website before travelling.",'Town Hall bus stop']);
  X([n[2].t,n[2].e,...n[2].b,n[2].pl],['Paullese: night closures of the San Donato junction','Until November 30 some traffic changes are planned on the former SS 415 provincial road for work on electrical systems.','For maintenance work on the electrical systems, the San Donato junction will be closed at night (10 pm-5 am).','Alternative routes are signposted on site.','San Donato junction, Strada Paullese']);
  X([n[3].t,n[3].e,...n[3].b,n[3].pl],['Temporary closure of the Tax Office','The desk at the Punto Comune will not be active to allow staff training.','The Tax Office desk at the Punto Comune will be closed to the public to allow staff training.','Payments remain available online in the Online payments section.','Punto Comune, Town Hall']);
  X([e[0].s,e[0].d,e[0].dd[1],e[0].dd[2],e[0].dd[3],e[0].w],['Antiques and vintage market','from September 13 to December 13, 2026','every month on the 2nd Sunday until December 13, 2026, with some exceptions:','Additional date: Sunday, August 30, 2026','The event will not take place on Sunday, August 9, 2026','Antiques, vintage and brocante market for collectors and enthusiasts. At the market you can buy antique objects, vintage clothes and collectible pieces. Run by Pulci e non solo.']);
  X([e[1].t,e[1].s,e[1].d,e[1].dd[1],e[1].a,e[1].w],['The CAM at the Town Hall',"Amsa's Mobile Environmental Center stops in Town Hall square",'from January 12 to December 20, 2026','every third Tuesday of the month, 9:00 am to 1:00 pm','Town Hall square',"Amsa's Mobile Environmental Center is a travelling recycling center where you can drop off bulky waste, WEEE, batteries and other materials not collected at home."]);
  X([s[0].t,s[0].s,...FR(s[0].to),...FR(s[0].d),...FR(s[0].f)],['A.I.R.E. - Registry of Italians residing abroad',"A.I.R.E. is the registry of the Italian population residing abroad. Anyone moving abroad for more than a year must register with A.I.R.E. in their municipality of residence in Italy.",'Italian citizens residing abroad who meet the following requirements:','• have moved their residence abroad for a period of more than twelve months','• are not seasonal workers','• are not permanent state employees in service abroad',"A.I.R.E. is the registry of the Italian population residing abroad. Anyone moving abroad for more than a year must register with A.I.R.E. At the link",'https://www.esteri.it','of the Ministry of Foreign Affairs and International Cooperation you can find detailed and useful information for Italian citizens who intend to live abroad.','The applicant must request registration with A.I.R.E. through the Fast It Consular Services portal.','You can notify the move abroad to the A.I.R.E. Office a few days before departure with a specific request to be sent to the Municipality.']);
  X([s[1].t,s[1].s,s[1].to,s[1].d,s[1].f],['Landscape compatibility assessment','The landscape compatibility assessment is a step leading to the granting or denial of a retroactive landscape authorization.','Owners of properties in areas subject to landscape protection.','Checks the landscape compatibility of works carried out without authorization, according to current regulations.','Submit the application through the SUE portal attaching the project and photographic documentation.']);
  X([s[2].t,s[2].s,s[2].to,s[2].d,s[2].f],['General civic access','Used to access acts and/or documents held by the Municipality in addition to those subject to mandatory publication.','Anyone, without the need to give a reason.','Allows anyone to request documents, data and information in addition to those already published (Legislative Decree 33/2013).',"Send the request by certified email (PEC) or through the online form to the Municipality's registry."]);
  X([s[3].t,s[3].s,s[3].to,s[3].d,s[3].f],['Simple civic access','Simple civic access is intended only for acts and information subject to publication obligations, under the principle that anyone has the right to request them where their publication has been omitted.','Anyone who notices omissions in the Transparent administration section.','Allows you to request the publication of documents and data for which there is a publication obligation and that have been omitted.','Write to the Transparency Officer indicating the missing data.']);
}catch(err){console.error('i18n: dati non disponibili',err)}
/* date e orari: traduzione per parole */
const MONTHS={gennaio:'January',febbraio:'February',marzo:'March',aprile:'April',maggio:'May',giugno:'June',luglio:'July',agosto:'August',settembre:'September',ottobre:'October',novembre:'November',dicembre:'December'};
const SOFT=[['Sempre aperto','Always open'],['Tutti i giorni','Every day'],['24 ore su 24','24 hours a day'],['Pronto Soccorso','Emergency room'],['Pronto Intervento','Emergency response'],['Ambulatori','Outpatient clinics'],['Orario Messe','Mass times'],['Reperibilità','On call'],['Lun - Ven','Mon - Fri'],['Lunedì','Monday'],['Martedì','Tuesday'],['Mercoledì','Wednesday'],['Giovedì','Thursday'],['Venerdì','Friday'],['Sabato','Saturday'],['Domenica','Sunday'],['Chiuso','Closed']];
function trText(s){
  const k=s.trim().replace(/\s+/g,' ');
  if(Object.prototype.hasOwnProperty.call(D,k))return D[k];
  let o=k,ch=false;
  const m0=k.match(/^Mostra (\d+) (luogo|luoghi)$/);if(m0)return 'Show '+m0[1]+(m0[1]==='1'?' place':' places');
  const m1=k.match(/^Foto di (.+)$/);if(m1)return 'Photos of '+m1[1];
  const m2=k.match(/^Foto (\d+) di (\d+)$/);if(m2)return 'Photo '+m2[1]+' of '+m2[2];
  o=o.replace(/^(\d{1,2}) (gennaio|febbraio|marzo|aprile|maggio|giugno|luglio|agosto|settembre|ottobre|novembre|dicembre) (\d{4})$/,(m,d,mo,y)=>{ch=true;return MONTHS[mo]+' '+d+', '+y});
  SOFT.forEach(p=>{if(o.includes(p[0])){o=o.split(p[0]).join(p[1]);ch=true}});
  return ch?o:undefined;
}
const tr=s=>(S.lang==='en'&&trText(s))||s;
/* applicazione al DOM, con possibilità di tornare all'italiano */
const ATTRS=['placeholder','aria-label','title','alt'];
function trNode(n){
  const raw=n.nodeValue;if(!raw||!raw.trim())return;
  const r=trText(raw);if(r===undefined)return;
  if(n.__it===undefined)n.__it=raw;
  n.nodeValue=raw.match(/^\s*/)[0]+r+raw.match(/\s*$/)[0];
}
function eachText(root,fn){
  const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>/^(SCRIPT|STYLE|TEXTAREA)$/.test(n.parentNode.nodeName)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});
  const a=[];while(w.nextNode())a.push(w.currentNode);a.forEach(fn);
}
function translateTree(root){
  if(root.nodeType===3){trNode(root);return}
  eachText(root,trNode);
  const els=root.querySelectorAll?[root,...root.querySelectorAll('[placeholder],[aria-label],[title],[alt]')]:[];
  els.forEach(el=>ATTRS.forEach(a=>{
    const v=el.getAttribute(a);if(!v)return;const r=trText(v);if(r===undefined)return;
    el.__oa=el.__oa||{};if(el.__oa[a]===undefined)el.__oa[a]=v;el.setAttribute(a,r);
  }));
}
function restoreTree(root){
  eachText(root,n=>{if(n.__it!==undefined){n.nodeValue=n.__it;delete n.__it}});
  root.querySelectorAll('*').forEach(el=>{if(el.__oa){for(const a in el.__oa)el.setAttribute(a,el.__oa[a]);delete el.__oa}});
}
new MutationObserver(ms=>{
  if(S.lang!=='en')return;
  ms.forEach(m=>m.addedNodes.forEach(n=>{if(n.nodeType===3||n.nodeType===1)translateTree(n)}));
}).observe(document.body,{childList:true,subtree:true});
function applyDocLang(){
  document.documentElement.lang=S.lang;
  document.title=S.lang==='en'?'San Donato Milanese Municipality':'Comune di San Donato Milanese';
}
function setLang(v){
  S.lang=v;save();applyDocLang();
  if(v==='it')restoreTree(document.body);
  render();
  if(v==='en')translateTree(document.body);
}
applyDocLang();
if(S.lang==='en')translateTree(document.body);
