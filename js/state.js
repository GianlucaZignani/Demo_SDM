/* Stato applicazione (localStorage), traduzioni IT/EN, utilità */
/* ============ STATO ============ */
const DEF={auth:false,user:null,userSource:'',dark:false,lang:'it',alerts:true,events:true,read:[],reports:[]};
let S;try{S=Object.assign({},DEF,JSON.parse(localStorage.getItem('sdm')||'{}'))}catch(e){S={...DEF}}
const save=()=>{try{localStorage.setItem('sdm',JSON.stringify(S))}catch(e){}};
const EN={'Vivere la città':'City life','Servizi':'Services','Pagamenti online':'Online payments','Amministrazione':'Administration','Contatti':'Contacts','Segnalazioni':'Reports','Indietro':'Back','Cerca i luoghi vicini a te...':'Search places near you...','Cerca una notifica...':'Search a notification...','Cerca un evento in città...':'Search an event...','Cerca un servizio...':'Search a service...','Cerca in amministrazione...':'Search administration...','Non letta':'Unread','Indicazioni':'Directions','Esci dall\'Account':'Log out','Accedi ai servizi':'Sign in','Filtro':'Filter','Chiama':'Call','Sito web':'Website','Chiudi':'Close','Notifiche':'Notifications'};
const t=k=>S.lang==='en'&&EN[k]||k;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
