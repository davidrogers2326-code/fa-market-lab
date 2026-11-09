const PARTS=[
 {n:'0',name:'Front door',layer:'Introduction',c:'#ffe7a8',line:'The 60-second story and the ten-minute presentation.',s:[['0.1','Home: the 60-second story','Headline, hero visual, the problem in one line, five key numbers, the ask, doors into the story.'],['0.2','The ten-minute presentation','16 slides with timer and speaker notes, numbers live from the model; also a Canva deck.']]},
 {n:'1',name:'The opportunity',layer:'Why it exists',c:'#e2c88c',line:'Why this business needs to exist, and why now.',s:[['1.1','The problem','Five pains shown as real situations: scattered, slow, untrusted, unplanned, far from family.'],['1.2','The evidence','Interactive evidence room: disease, households, mobile money, internet, remittances, all cited.'],['1.3','Market size','Total, reachable and first-target market, with the calculation shown.'],['1.4','Our customers','Six personas with their needs, monthly spend and journey.'],['1.5','Why now','The trends that make this the right moment.']]},
 {n:'2',name:'The solution',layer:'Why it exists',c:'#e2c88c',line:'The Afya Basics concept, brand and how it all fits together.',s:[['2.1','The Afya Basics concept','Store, membership and digital in one picture; the promise and positioning.'],['2.2','The brand','Logo, colours, type, photo style, tone of voice, customer charter.'],['2.3','How it all works','End-to-end flow from supplier to the customer’s home, in one animated picture.']]},
 {n:'3',name:'The experience',layer:'Experience',c:'#5fbf8f',line:'What the customer sees, touches and feels.',s:[['3.1','The store','Realistic renders, Care Zones, floor plan, 3D walk-through.'],['3.2','Customer journey & fast checkout','Five journeys with time targets and a clickable scan-and-go demo.'],['3.3','The Afya Check Station','Fifteen measurements, the four-minute flow, how it drives sales.'],['3.4','Membership and cards','Six cards, every package and the card that unlocks it, business accounts, plans and profit per member.'],['3.5','Afya Boxes & Afya Choice','Seventeen boxes, contents, brand swaps, reminders, bespoke boxes.'],['3.6','The product range','2,810 products in 527 families, the investor buying desk, seasons, store and warehouse.'],['3.7','Premium, gifts and rentals','Seven ideas from the sales room, gift films, Michango ya Afya, rent or buy.'],['3.8','Digital store and app','App screens, WhatsApp ordering, online store, demo.']]},
 {n:'4',name:'The engine',layer:'Engine',c:'#d9b56e',line:'How one system lets three people run a store.',s:[['4.1','The tech platform','The one-system model, tools, data, privacy and running costs.'],['4.2','Sourcing and supply','Suppliers in China and India, landed cost, imports, reorder.'],['4.3','Packing and delivery','Packing hub, monthly box flow, riders, proof of delivery.'],['4.4','Team and daily operations','Roles, training, a day in the store, procedures.'],['4.5','Quality and compliance','TMDA, expiry control, complaints, recalls, aftercare, warranty.']]},
 {n:'5',name:'Growth',layer:'Economics',c:'#f2c96b',line:'Winning customers and the road to TSh billions.',s:[['5.1','Winning customers','Growth engine, marketing, first-year calendar, campaigns.'],['5.2','Partnerships and B2B','Clinics, insurers, employers, schools, hotels, diaspora groups.'],['5.3','Competition and our moat','Map of competitors and why customers switch to us.'],['5.4','The road to TSh billions','Twelve-year plan, three scenarios, revenue gates.']]},
 {n:'6',name:'Money',layer:'Economics',c:'#f2c96b',line:'Financials, the customer-funded model, funding and ownership.',s:[['6.1','Financials','Profit and loss, cash flow, break-even, scenarios.'],['6.2','The customer-funded model','Every cost recovered inside a price the customer pays.'],['6.3','Funding and use of funds','The ask, tranches, milestones, what each shilling buys.'],['6.4','Ownership and exit','Cap table, the founders’ 25%, protections, sale calculator.']]},
 {n:'7',name:'Trust',layer:'Foundation',c:'#b5dfc6',line:'Setup, governance, risks, impact and proof.',s:[['7.1','Setup, licences, research & travel','Fifteen-step checklist, research and transport budget.'],['7.2','Governance and reporting','Board, delegation of authority, monthly reporting.'],['7.3','Risks','Risk register with owners and answers.'],['7.4','Social impact','Health outcomes, jobs, women carers, measured.'],['7.5','Proof pack, Q&A and sources','Investor questions answered, documents, all sources.']]}];
const ALL=[];PARTS.forEach(p=>p.s.forEach(s=>ALL.push({id:'s'+s[0].replace('.','-'),no:s[0],title:s[1],plan:s[2],part:p})));
const PARTS_SW=[
 {name:'Mlango wa mbele',layer:'Utangulizi',line:'Hadithi ya sekunde 60 na wasilisho la dakika kumi.',s:[['Nyumbani: hadithi ya sekunde 60','Kichwa, picha kuu, tatizo kwa mstari mmoja, namba tano muhimu, ombi, milango ya hadithi.'],['Wasilisho la dakika kumi','Slaidi 16 zenye saa na maelezo ya mzungumzaji, namba moja kwa moja kutoka modeli; pia deki ya Canva.']]},
 {name:'Fursa',layer:'Kwa nini ipo',line:'Kwa nini biashara hii inahitajika, na kwa nini sasa.',s:[['Tatizo','Maumivu matano kama hali halisi: kutawanyika, kuchelewa, kutoaminika, kutopangwa, kuwa mbali na familia.'],['Ushahidi','Chumba cha ushahidi: magonjwa, kaya, pesa ya simu, intaneti, fedha kutoka nje, vyote na vyanzo.'],['Ukubwa wa soko','Soko lote, linalofikika na la kwanza kulenga, pamoja na hesabu.'],['Wateja wetu','Wateja sita wa mfano na mahitaji yao, matumizi ya mwezi na safari yao.'],['Kwa nini sasa','Mwelekeo unaofanya huu kuwa wakati sahihi.']]},
 {name:'Suluhisho',layer:'Kwa nini ipo',line:'Wazo la Afya Basics, chapa na jinsi vyote vinavyoungana.',s:[['Wazo la Afya Basics','Duka, uanachama na kidijitali katika picha moja; ahadi na nafasi sokoni.'],['Chapa','Nembo, rangi, maandishi, mtindo wa picha, sauti, mkataba wa mteja.'],['Jinsi yote yanavyofanya kazi','Mtiririko kutoka kwa msambazaji hadi nyumbani kwa mteja, katika picha moja hai.']]},
 {name:'Uzoefu',layer:'Uzoefu',line:'Kile mteja anachoona, kugusa na kuhisi.',s:[['Duka','Picha halisi, Kanda za Huduma, ramani ya sakafu, matembezi ya 3D.'],['Safari ya mteja na malipo ya haraka','Safari tano zenye malengo ya muda na onyesho la scan-na-uende.'],['Kituo cha Afya Check','Vipimo kumi na tano, mtiririko wa dakika nne, jinsi kinavyoleta mauzo.'],['Uanachama na kadi','Kadi sita, kila kifurushi na kadi inayokifungua, akaunti za biashara, mipango na faida kwa mwanachama.'],['Afya Box na Afya Choice','Box kumi na saba, yaliyomo, kubadilisha chapa, vikumbusho, box maalum.'],['Bidhaa zetu','Bidhaa 2,810 katika familia 527, dawati la ununuzi la mwekezaji, misimu, duka na ghala.'],['Bidhaa za hadhi, zawadi na kukodisha','Mawazo saba kutoka chumba cha mauzo, filamu za zawadi, Michango ya Afya, kodi au nunua.'],['Duka la kidijitali na programu','Skrini za programu, kuagiza kwa WhatsApp, duka la mtandaoni, onyesho.']]},
 {name:'Injini',layer:'Injini',line:'Jinsi mfumo mmoja unavyowawezesha watu watatu kuendesha duka.',s:[['Jukwaa la teknolojia','Mfumo mmoja, zana, data, faragha na gharama za uendeshaji.'],['Upatikanaji wa bidhaa','Wasambazaji wa China na India, gharama ya kufikisha, uingizaji, kuagiza tena.'],['Ufungaji na usafirishaji','Kituo cha kufungasha, mtiririko wa box ya mwezi, wasafirishaji, uthibitisho wa kufikisha.'],['Timu na shughuli za kila siku','Majukumu, mafunzo, siku moja dukani, taratibu.'],['Ubora na uzingatiaji','TMDA, udhibiti wa tarehe, malalamiko, urejeshaji, huduma baada ya mauzo, dhamana.']]},
 {name:'Ukuaji',layer:'Uchumi',line:'Kupata wateja na njia ya kufikia mabilioni ya shilingi.',s:[['Kupata wateja','Injini ya ukuaji, masoko, kalenda ya mwaka wa kwanza, kampeni.'],['Ushirikiano na B2B','Kliniki, bima, waajiri, shule, hoteli, vikundi vya diaspora.'],['Ushindani na kinga yetu','Ramani ya washindani na kwa nini wateja wanahamia kwetu.'],['Njia ya mabilioni ya shilingi','Mpango wa miaka kumi na mbili, hali tatu, malengo ya mapato.']]},
 {name:'Fedha',layer:'Uchumi',line:'Hesabu za fedha, mfumo unaolipwa na mteja, mtaji na umiliki.',s:[['Hesabu za fedha','Faida na hasara, mtiririko wa fedha, kurudisha gharama, hali mbalimbali.'],['Mfumo unaolipwa na mteja','Kila gharama inarudishwa ndani ya bei anayolipa mteja.'],['Mtaji na matumizi yake','Ombi, awamu, malengo, kila shilingi inanunua nini.'],['Umiliki na kuuza','Jedwali la umiliki, asilimia 25 ya waanzilishi, kinga, kikokotoo cha mauzo.']]},
 {name:'Uaminifu',layer:'Msingi',line:'Kuanzisha, utawala, hatari, athari na ushahidi.',s:[['Kuanzisha, leseni, utafiti na safari','Orodha ya hatua kumi na tano, bajeti ya utafiti na usafiri.'],['Utawala na taarifa','Bodi, mgawanyo wa mamlaka, taarifa za kila mwezi.'],['Hatari','Rejista ya hatari yenye wahusika na majibu.'],['Athari kwa jamii','Matokeo ya afya, ajira, wanawake walezi, vinavyopimwa.'],['Ushahidi, maswali na vyanzo','Maswali ya wawekezaji yamejibiwa, nyaraka, vyanzo vyote.']]}];
const SWON=()=>{try{return localStorage.getItem('afyaLang')==='sw'}catch(e){return false}};const TL=(e,w)=>SWON()?w:e;
const PARTS_EN=PARTS.map(p=>({name:p.name,layer:p.layer,line:p.line,s:p.s.map(x=>[x[1],x[2]])}));
function applyLang(){let sw=false;try{sw=localStorage.getItem('afyaLang')==='sw'}catch(e){}
 PARTS.forEach((p,i)=>{const L=(sw?PARTS_SW:PARTS_EN)[i];p.name=L.name;p.layer=L.layer;p.line=L.line;p.s.forEach((x,k)=>{x[1]=L.s[k][0];x[2]=L.s[k][1]})});
 let k=0;PARTS.forEach(p=>p.s.forEach(x=>{if(ALL[k]){ALL[k].title=x[1];ALL[k].plan=x[2]}k++}))}
applyLang();
const DONE=new Set();
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const AR='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const BLOCKS=[['Headline promise','One sentence a customer or investor remembers.'],['The problem it solves','The pain today, with cited evidence.'],['Our answer','What Afya Basics does about it, in plain words.'],['How it works','A drawn flow or animation of who does what.'],['The experience','Realistic concept visuals of what the customer sees.'],['Try it','An interactive demo or calculator.'],['The numbers','Live from the master model.'],['Risks and our answer','What could go wrong and our plan.'],['Investor takeaway','Why it matters for the investment.']];

const OPEN=new Set();let lastPart=null,OPENINIT=false;
const CHEV='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>';
function rail(cur){const T=document.getElementById('toc');if(!OPENINIT&&typeof PARTS!=='undefined'){PARTS.forEach(p=>OPEN.add(p.n));OPENINIT=true}try{[['openIndex','Overview','Muhtasari'],['replay','Cover','Jalada'],['tocBtn','Contents ','Yaliyomo ']].forEach(([id,e,w])=>{const b=document.getElementById(id);if(!b)return;const t=[...b.childNodes].find(n=>n.nodeType===3&&n.nodeValue.trim());if(t)t.nodeValue=TL(e,w)})}catch(e){}const sec=ALL.find(x=>x.id===cur);
 if(sec&&sec.part!==lastPart){OPEN.add(sec.part.n);lastPart=sec.part}
 let h=`<a class="home${sec?'':' cur'}" href="#home"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M4 11l8-7 8 7v9h-5v-6H9v6H4z"/></svg>${TL('The opening','Mwanzo')}</a>`;let lay=null;
 PARTS.forEach(p=>{if(p.layer!==lay){lay=p.layer;h+=`<div class="lay">${esc(lay)}</div>`}
  const on=sec&&sec.part===p,op=OPEN.has(p.n);
  h+=`<div class="tp${op?' open':''}${on?' on':''}" style="--pc:${p.c}"><button class="tph" type="button" data-p="${p.n}" aria-expanded="${op}"><i class="pd"></i><span class="nm"><b class="pn">${p.n}</b>${esc(p.name)}</span>${CHEV}</button><div class="tps">${p.s.map(x=>{const id='s'+x[0].replace('.','-');return `<a class="ts${id===cur?' cur':''}${DONE.has(id)?' done':''}" href="#${id}"${id===cur?' aria-current="page"':''}><span>${x[0]}</span>${esc(x[1])}</a>`}).join('')}</div></div>`});
 T.innerHTML=h;
 T.querySelectorAll('.tph').forEach(b=>b.onclick=()=>{const n=b.dataset.p;OPEN.has(n)?OPEN.delete(n):OPEN.add(n);rail(cur)});
 const c=T.querySelector('.ts.cur');if(c){const r=c.getBoundingClientRect(),tr=T.getBoundingClientRect();if(r.top<tr.top||r.bottom>tr.bottom)c.scrollIntoView({block:'center'})}
 document.getElementById('railPct').textContent=DONE.size+' / '+ALL.length;document.getElementById('progFill').style.width=(DONE.size/ALL.length*100)+'%';
 document.getElementById('tocCur').textContent=sec?sec.no+' · '+sec.title:'Home';
 document.body.classList.remove('navopen')}
function buildIndex(){const ix=document.getElementById('index');ix.insertAdjacentHTML('beforeend',PARTS.map(p=>`<div class="ipart"><div class="hud" style="color:${p.c}">Part ${p.n} · ${esc(p.layer)}</div><h3>${esc(p.name)}</h3>${p.s.map(s=>`<a href="#s${s[0].replace('.','-')}"><span>${s[0]}</span>${esc(s[1])}</a>`).join('')}</div>`).join(''))}

const sigPath=['M0 30 L40 30 L50 30 L60 10 L70 44 L80 24 L90 30 L200 30','M0 30 Q20 10 40 30 T80 30 T120 30 T160 30 T200 30','M0 30 L30 30 L36 18 L42 40 L48 30 L80 30 L86 14 L92 44 L98 30 L200 30','M0 12 L60 18 L100 26 L140 36 L170 44 L200 46','M0 30 L50 30 M70 30 L110 30 M130 30 L200 30'];
const SIG=[
 ['Scattered','#ff9b87','A new mother needs nappies, wipes and iron tablets. That means three different shops in one hot afternoon.'],
 ['Slow','#ffb36b','A man with high blood pressure queues at a crowded counter just to ask which monitor he should buy.'],
 ['Untrusted','#ff7b9c','A daughter cannot tell whether the cream on a street stall is registered, genuine or past its date.'],
 ['Unplanned','#f2c96b','Glucose test strips run out on a Sunday night, and the next reading waits until the shops open on Monday.'],
 ['Far from family','#c9b8ff','A son working abroad sends money home every month, but cannot see whether it became his mother’s care.']];
const IC={
 zone:'<path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/>',
 shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
 tag:'<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.5"/>',
 pulse:'<path d="M3 12h4l2-5 4 10 2-5h6"/>',
 tap:'<rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M10 18h4"/><path d="M9 9.5c1.6-1.6 4.4-1.6 6 0M10.6 11.6c.8-.8 2-.8 2.8 0"/>',
 loop:'<path d="M20 12a8 8 0 0 1-13.7 5.7M4 12a8 8 0 0 1 13.7-5.7"/><path d="M18 3v4h-4M6 21v-4h4"/>',
 home:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-5h4v5"/>',
 globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/>'};
const icon=k=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[k]}</svg>`;
const WAY=[
 ['Need first','zone',[0],'Store, app and boxes are organised into Care Zones by life situation (mother & baby, diabetes & heart, elderly care), not by brand.','Right product found in under 2 minutes'],
 ['Fewer, better','shield',[2],'Only registered products. For each need, 4–5 trusted brands in the same price range, so every choice is a safe one.','100% registered stock'],
 ['One honest price','tag',[1,2],'The same price in the store, the app and on WhatsApp, shown clearly on every digital shelf label.','Zero price differences between channels'],
 ['Check, then choose','pulse',[2],'A free Afya Check at the entrance (15 measurements) gives a reading first, so advice and products start from facts.','15 measurements, about 4 minutes, free'],
 ['Pay in seconds','tap',[1],'Scan-and-go kiosks and a mobile-money tap at the counter. No queue to ask, no queue to pay.','Under 3 minutes per visit'],
 ['Never run out','loop',[3],'The monthly Afya Box renews itself. Members can swap brands up to 12 days before month end and get reminders by phone or email.','Zero clicks to renew'],
 ['Care reaches home','home',[3,4],'Same-day delivery across Dar es Salaam, or collection from the smart locker outside the store.','Same-day delivery'],
 ['One Afya everywhere','globe',[4,0],'One account across store, app and WhatsApp. Relatives abroad can pay for a parent’s box directly.','One account, every channel']];
const STEPS=[
 ['Afya Check','A free 15-measurement health check at the kiosk by the door. The reading appears on screen.'],
 ['Advice & lounge','A trained team member explains the reading. Screens in the lounge play health tips and offers.'],
 ['Care Zone','Walk straight to the zone for your situation and choose from 4–5 trusted brands with clear digital prices.'],
 ['Pay in seconds','Scan at a kiosk or tap mobile money at the counter. In and out in under three minutes.'],
 ['Join the Afya Box','At the corner counter, under the menu screens, the team sets up your monthly box on a 1, 6 or 12-month plan.'],
 ['Delivered home','Next month the box is delivered the same day it ships, or waits in the smart locker outside the glass.']];
let HOTS=[[88,52],[74,60],[45,44],[30,44],[13,36],[62,38]];
const MONEY=[
 ['Store sales','Everyday health essentials sold at one honest price across about 520 product families.','tag'],
 ['Afya Box memberships','Recurring monthly revenue from 1, 6 and 12-month plans, plus one-off kits for non-members.','loop'],
 ['Delivery & packing','Packing and delivery are included in the box price, so the customer covers them, not the business.','home'],
 ['Premium, gifts & rentals','Afya Royal premium plans, gift cards, corporate gifts and medical-equipment rental.','shield'],
 ['Partners & B2B','Clinics, insurers, employers, schools, hotels and diaspora groups buying for their people.','globe']];
const PHONE=`<div class="phone" aria-hidden="true"><div class="ph-notch"></div><div class="ph-scr">
 <div class="ph-top"><b>Afya</b><span>Hi, Amina</span></div>
 <div class="ph-card g"><small>Your Afya Box</small><b>Arrives Friday</b><span>Mother &amp; baby · monthly</span><i><em style="width:72%"></em></i></div>
 <div class="ph-row"><span>Swap a brand</span><b>12 days left</b></div>
 <div class="ph-row"><span>Reorder test strips</span><b class="btn-s">1 tap</b></div>
 <div class="ph-row"><span>Last Afya Check</span><b>Normal</b></div>
 <div class="ph-pay">Pay with mobile money</div></div></div>`;
const BOXART=`<div class="boxart" aria-hidden="true"><svg viewBox="0 0 220 170"><defs><linearGradient id="bxa" x1="0" x2="1"><stop offset="0" stop-color="#0f7a52"/><stop offset="1" stop-color="#0a5a3c"/></linearGradient><linearGradient id="bxb" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#139463"/><stop offset="1" stop-color="#0f7a52"/></linearGradient></defs>
 <path d="M110 22 196 56 110 90 24 56z" fill="url(#bxb)"/><path d="M24 56 110 90v62L24 118z" fill="#0b6142"/><path d="M196 56 110 90v62l86-34z" fill="url(#bxa)"/>
 <path d="M-5-16h10v11h11v10H5v11H-5V5H-16V-5H-5z" fill="none" stroke="#f2c96b" stroke-width="1.4" transform="matrix(.86 .34 -.86 .34 110 56)"/>
 <path d="M24 56 110 90 196 56" fill="none" stroke="rgba(255,231,168,.35)" stroke-width="1"/></svg><span>Box design · coming in section 3.5</span></div>`;

function home(){return `
<section class="stage" aria-label="Opening">
 <div class="stage-photo" role="img" aria-label="Concept image of the Afya Basics street-front store: solid walls, barred display windows, open entrance, with AFYA BASICS on the roof edge and a video wall visible inside"></div>
 <div class="hud-corner hud-tr">Dar es Salaam · 6.79°S 39.21°E<br>${TL('Seed round','Mtaji wa mbegu')} · <b>${TL('Open','Wazi')}</b><br>${TL('Investor showroom','Onyesho la wawekezaji')} · <b>2026</b></div>
 <div class="wrap stage-in">
  <div class="kicker"><i></i><span class="hud">${TL('Investor showroom · Trusted care, delivered home','Onyesho la wawekezaji · Huduma ya kuaminika, hadi nyumbani')}</span></div>
  <h1 class="title"><span class="l1">Afya</span><span class="l2">Basics</span></h1>
  <p class="motto">Afya yako, nyumbani kwako.</p>
  <p class="lede">${TL('A health-essentials store, a monthly home-delivery membership and an app, built so Tanzanian families get the right product, at one honest price, before they run out.','Duka la mahitaji ya afya, uanachama wa kuletewa nyumbani kila mwezi na programu, vimejengwa ili familia za Kitanzania zipate bidhaa sahihi, kwa bei moja ya haki, kabla hazijaisha.')}</p>
  <div class="cta"><a class="btn solid" href="#film">${TL('Watch how it works','Tazama inavyofanya kazi')} ${AR}</a><a class="btn line" href="#s0-1">${TL('Watch the 60-second story','Tazama hadithi ya sekunde 60')}</a></div>
 </div>
 <div class="hud-corner hud-br">${TL('Scroll','Shuka')}<br><b>↓</b></div>
 <div class="readouts"><div class="wrap">
  <div class="r"><b>15</b><span>${TL('free measurements at the Afya Check','vipimo vya bure kwenye Afya Check')}</span></div>
  <div class="r"><b><em>&lt;</em>3 min</b><span>${TL('to find and pay in store','kupata na kulipa dukani')}</span></div>
  <div class="r"><b>0 <em>${TL('clicks','mibofyo')}</em></b><span>${TL('to renew the monthly Afya Box','kurudia Afya Box ya kila mwezi')}</span></div>
  <div class="r"><b>~520</b><span>${TL('product families · 4–5 brands','familia za bidhaa · chapa 4–5')}</span></div>
  <div class="r"><b>150M · 340M</b><span>${TL('seed options in TSh: start small or flagship','chaguo za mtaji kwa TSh: anza kidogo au duka kuu')}</span></div>
 </div></div>
</section>
<div class="wrap">

 <section class="ex" id="film" aria-labelledby="hmv">
  <div class="ex-head"><div><span class="idx">00 / ${TL('Watch it work','Itazame ikifanya kazi')}</span><h2 id="hmv">${TL('One family. <em>One minute.</em>','Familia moja. <em>Dakika moja.</em>')}</h2></div><p>${TL('Follow one family from today’s pharmacy hunt to the free Afya Check, scan-and-go payment, the monthly Afya Box, one-tap online ordering and same-day delivery.','Fuata familia moja kutoka msako wa leo kwenye maduka ya dawa hadi Afya Check ya bure, malipo ya scan-na-uende, Afya Box ya kila mwezi, kuagiza mtandaoni kwa mguso mmoja na usafirishaji wa siku hiyohiyo.')}</p></div>
  <figure class="filmf"><video controls preload="metadata" playsinline poster="media/video-poster.jpg" aria-label="Afya Basics: how it works, 69-second video"><source src="${SWON()?'/_blob/bf1b83b895f51e379ec60db45882b020':'/_blob/7fab375add778c03d766eea383ec785d'}" type="video/mp4"></video>
   <figcaption><span>${TL('Concept images, AI video and app mock-ups','Picha za dhana, video za AI na mifano ya programu')}</span><span>${TL('69 s · narration and soft music','Sekunde 69 · msimulizi na muziki laini')}</span></figcaption></figure>
  <p style="margin:12px 0 0;font-size:.82rem;line-height:1.5;color:var(--ink3)">Photos are for illustration; people shown are not Afya Basics customers or staff.</p>
  <div class="filmch">${[['0:00','Today: one item per pharmacy'],['0:20','Free Afya Check'],['0:29','Scan and go, pay in seconds'],['0:39','Join the Afya Box'],['0:44','Order again in one tap'],['0:50','Packed, delivered, tracked'],['1:02','How it helps families']].map(c=>`<button type="button" data-t="${c[0]}"><b>${c[0]}</b>${c[1]}</button>`).join('')}</div>
 </section>

 <section class="ex" id="minute" aria-labelledby="hm1">
  <div class="ex-head"><div><span class="idx">01 / Afya Basics in one minute</span><h2 id="hm1">One business. <em>Three ways in.</em></h2></div><p>Customers can walk into the store, subscribe to a monthly box, or order from their phone. All three run on one account, one price list and one stock system.</p></div>
  <div class="three">
   <article class="way3"><div class="w3img"><img src="img/interior.webp" width="1680" height="944" loading="lazy" alt="Concept image of the Afya Basics store interior: signature counter, package and ad screens, consultation room, lit oak niches and Afya Check kiosk"><span class="w3tag">01 · The store</span></div>
    <div class="w3body"><h3>A street-front flagship, organised by need</h3>
     <dl><dt>What it is</dt><dd>A one-floor street-front store in Dar es Salaam with Care Zones by life situation, digital screens and price labels, and a free 15-measurement Afya Check by the door.</dd>
     <dt>Who it’s for</dt><dd>Families managing a condition, new mothers and carers of elderly parents.</dd>
     <dt>How it earns</dt><dd>Product sales at one honest price, across about 520 product families.</dd></dl></div></article>
   <article class="way3"><div class="w3img dark">${BOXART}<span class="w3tag">02 · The Afya Box</span></div>
    <div class="w3body"><h3>The monthly box that arrives before you run out</h3>
     <dl><dt>What it is</dt><dd>A membership box of the essentials a household uses every month, on 1, 6 or 12-month plans, plus one-off kits for non-members.</dd>
     <dt>Who it’s for</dt><dd>Mother &amp; baby, personal hygiene, women’s beauty, and condition care such as diabetes, dialysis and pregnancy.</dd>
     <dt>How it earns</dt><dd>Recurring membership revenue. Packing and delivery are already in the box price.</dd></dl></div></article>
   <article class="way3"><div class="w3img phonebg">${PHONE}<span class="w3tag">03 · App &amp; WhatsApp</span></div>
    <div class="w3body"><h3>Reorder in seconds, from anywhere</h3>
     <dl><dt>What it is</dt><dd>An app and WhatsApp ordering: reorder in under 30 seconds, swap brands up to 12 days before month end, and get reminders by phone or email.</dd>
     <dt>Who it’s for</dt><dd>Busy families, and relatives abroad who want to pay for a parent’s care directly.</dd>
     <dt>How it earns</dt><dd>Repeat orders and same-day delivery, with the delivery cost built into the price.</dd></dl></div></article>
  </div>
 </section>

 <section class="ex" aria-labelledby="hm2">
  <div class="ex-head"><div><span class="idx">02 / The problem</span><h2 id="hm2">Care moved home. <em>Shopping didn’t.</em></h2></div><p>Families now manage blood pressure, diabetes, pregnancy, babies, elderly parents and recovery at home. Buying what that care needs is still hard. Five situations show why.</p></div>
  <div class="sits">${SIG.map((x,i)=>`<article class="sit" style="--c:${x[1]}"><div class="sit-h"><span class="sit-n">0${i+1}</span><b>${x[0]}</b></div><svg viewBox="0 0 200 50" preserveAspectRatio="none" aria-hidden="true"><path d="${sigPath[i]}"/></svg><p>${x[2]}</p></article>`).join('')}</div>
  <p class="note">Illustrative situations · the evidence behind each one is set out in section 1.2</p>
 </section>

 <section class="ex" aria-labelledby="hm3">
  <div class="ex-head"><div><span class="idx">03 / The Afya Way</span><h2 id="hm3">Eight principles. <em>Each one fixes a problem.</em></h2></div><p>The Afya Way is how the business behaves everywhere: in the store, in the box and in the app. Every principle answers one of the five problems and has a number we measure it by.</p></div>
  <div class="wayf" role="group" aria-label="Filter principles by the problem they answer"><span>Show principles that fix:</span><button type="button" class="on" data-f="-1">All</button>${SIG.map((x,i)=>`<button type="button" data-f="${i}" style="--c:${x[1]}"><i></i>${x[0]}</button>`).join('')}</div>
  <div class="wayg" id="wayg">${WAY.map((w,i)=>`<article class="wcard" data-s="${w[2].join(',')}"><div class="wc-top"><span class="wc-ic">${icon(w[1])}</span><span class="wc-n">0${i+1}</span></div><h3>${w[0]}</h3><p>${w[3]}</p><div class="wc-fix">${w[2].map(k=>`<span style="--c:${SIG[k][1]}">Fixes: ${SIG[k][0]}</span>`).join('')}</div><div class="wc-m"><small>Measured by</small>${w[4]}</div></article>`).join('')}</div>
 </section>

 <section class="ex" aria-labelledby="hm4">
  <div class="ex-head"><div><span class="idx">04 / A visit, step by step</span><h2 id="hm4">From the door to <em>the doorstep.</em></h2></div><p>Follow one customer through the store. Each step is a principle you can see. Hover or tap a step to find it in the room.</p></div>
  <div class="visit">
   <figure class="shot vshot"><img src="img/interior.webp" width="1680" height="944" loading="lazy" alt="Concept of the Afya Basics store interior">${HOTS.map((h,i)=>`<button type="button" class="vdot" data-i="${i}" style="left:${h[0]}%;top:${h[1]}%" aria-label="Step ${i+1}: ${STEPS[i][0]}">${i+1}</button>`).join('')}<figcaption>Concept image · flagship interior</figcaption></figure>
   <ol class="vsteps">${STEPS.map((st,i)=>`<li data-i="${i}" tabindex="0"><span>${i+1}</span><div><b>${st[0]}</b><p>${st[1]}</p></div></li>`).join('')}</ol>
  </div>
 </section>

 <section class="ex" aria-labelledby="hm5">
  <div class="ex-head"><div><span class="idx">05 / How it makes money</span><h2 id="hm5">Five revenue streams. <em>One rule.</em></h2></div><p>The rule: every running cost is recovered inside a price the customer chooses to pay. Packing, delivery and service are part of the price, never a loss.</p></div>
  <div class="money">${MONEY.map((m,i)=>`<article class="mcard"><span class="wc-ic">${icon(m[2])}</span><small>Stream 0${i+1}</small><h3>${m[0]}</h3><p>${m[1]}</p></article>`).join('')}
   <article class="mcard rule"><small>The rule</small><h3>Customer-funded</h3><p>Costs are covered by customers, not by investors’ money. Investment builds the store and the system; customers pay for the running.</p><a href="#s6-2">See the customer-funded model ${AR}</a></article></div>
 </section>

 <section class="ex" aria-labelledby="h2x">
  <div class="ex-head"><div><span class="idx">06 / The framework</span><h2 id="h2x">Three layers. <em>One machine.</em></h2></div><p>The experience brings customers in, the engine serves them simply, and the economics turn it into a large, profitable company.</p></div>
  <div class="stackwrap">
   <div class="stack" aria-hidden="true"><div class="plate p1"><span>Experience</span></div><div class="plate p2"><span>Engine</span></div><div class="plate p3"><span>Economics</span></div></div>
   <div class="layers">
    <div class="layer" style="--lc:#5fbf8f"><i>L1</i><div><b>Experience</b><p>A calm store organised by need, a free check, payment in seconds, a membership that arrives before you run out.</p><div class="chips"><span>Store</span><span>Check Station</span><span>Fast checkout</span><span>Membership</span><span>App</span></div></div></div>
    <div class="layer" style="--lc:#d9b56e"><i>L2</i><div><b>Engine</b><p>One connected system runs till, stock, members, delivery and reports, so three people can run a store.</p><div class="chips"><span>One system</span><span>Sourcing</span><span>Packing hub</span><span>Delivery</span><span>Quality</span></div></div></div>
    <div class="layer" style="--lc:#f2c96b"><i>L3</i><div><b>Economics</b><p>Every running cost is recovered inside a price the customer chooses to pay; each new store follows one playbook.</p><div class="chips"><span>Customer-funded</span><span>Financials</span><span>Growth</span><span>Ownership</span></div></div></div>
   </div>
  </div>
 </section>

 <section class="ex" aria-labelledby="h4x">
  <div class="ex-head"><div><span class="idx">07 / The route</span><h2 id="h4x">Eight chapters. <em>36 sections.</em></h2></div><p>The showroom follows the questions an investor asks, in the order they ask them, from the problem to the exit. Every chapter is in the sidebar.</p></div>
  <div class="route">${PARTS.map(p=>`<div class="stop" style="--sc:${p.c}"><span class="num">${p.n}</span><span class="pin"></span><span class="ly">${esc(p.layer)}</span><h3>${esc(p.name)}</h3><ol>${p.s.map(s=>`<li><a href="#s${s[0].replace('.','-')}"><span>${s[0]}</span>${esc(s[1])}</a></li>`).join('')}</ol></div>`).join('')}</div>
 </section>

 <section class="ask" aria-labelledby="h6x">
  <span class="hud g">08 / The ask</span>
  <h2 id="h6x">Open store one. <em>Launch the Afya Box.</em></h2>
  <div class="askg"><div><b>TSh 150M or 340M</b><span>start small, or open the full flagship (section 6.3)</span></div><div><b>40·35·25</b><span>tranches released only as milestones are met</span></div><div><b>25%</b><span>founders’ share, protected for life</span></div></div>
  <div class="cta" style="position:relative"><a class="btn solid" href="#s6-3">Funding and use of funds ${AR}</a><a class="btn line" href="#s6-4">Ownership and exit</a></div>
 </section>
 <footer class="foot"><span>Afya Basics Simple Solution Ltd · Dar es Salaam</span><span>Concept images · figures are planning estimates</span></footer>
</div>`}
function initHome(){const vd=document.querySelector('.filmf video');document.querySelectorAll('.filmch button').forEach(b=>b.onclick=()=>{const [m,s2]=b.dataset.t.split(':');vd.currentTime=+m*60+ +s2;vd.play().catch(()=>{})});const g=document.getElementById('wayg');if(!g)return;
 document.querySelectorAll('.wayf button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.wayf button').forEach(x=>x.classList.toggle('on',x===b));const f=+b.dataset.f;g.querySelectorAll('.wcard').forEach(c=>{const on=f<0||c.dataset.s.split(',').includes(String(f));c.classList.toggle('dim',!on)})});
 const dots=[...document.querySelectorAll('.vdot')],items=[...document.querySelectorAll('.vsteps li')];
 const act=i=>{dots.forEach((d,k)=>d.classList.toggle('on',k===i));items.forEach((d,k)=>d.classList.toggle('on',k===i))};
 dots.forEach((d,i)=>{d.onmouseenter=d.onfocus=d.onclick=()=>act(i)});items.forEach((d,i)=>{d.onmouseenter=d.onfocus=d.onclick=()=>act(i)});act(0);
 const mn=document.querySelector('a[href="#film"]');if(mn)mn.onclick=e=>{e.preventDefault();document.getElementById('film').scrollIntoView({behavior:'smooth'})}}
function section(id){const i=ALL.findIndex(x=>x.id===id),s=ALL[i],p=s.part,pv=ALL[i-1],nx=ALL[i+1];
 if(window.SECTIONS[id]){try{return window.SECTIONS[id].render(s,p,pv,nx)}catch(e){console.error(e)}}
 if(id==='s0-1')return story01(s,p,pv,nx);
 if(id==='s1-1')return sec11(s,p,pv,nx);
 const cells=[['w','Headline promise',`One sentence on what “${esc(s.title)}” promises the customer and the investor.`],['','The problem it solves','The pain today, with cited evidence.'],['','Our answer','What Afya Basics does about it.'],['','How it works','A drawn flow or animation of who does what.'],['e vis','The experience','Realistic Canva concept visuals of the Afya brand in use.'],['','Try it','Interactive demo or calculator.'],['','The numbers','Live from the master model.'],['','Risks and our answer','At least one honest risk.'],['','Investor takeaway','Why it matters for the investment.']];
 return `<section class="shead" data-no="${s.no}"><div class="wrap"><div class="crumb"><a href="#home">Showroom</a><span>/</span><span style="color:${p.c}">Part ${p.n} · ${esc(p.name)}</span><span>/</span><span>${s.no}</span></div>
 <h1>${esc(s.title)}</h1><p>${esc(s.plan)}</p><span class="state"><i></i>${DONE.has(id)?'Signed off':'In production · frame ready'}</span></div></section>
 <div class="wrap"><div class="grid9">${cells.map((c,j)=>`<div class="cell ${c[0]}"><h4><i>${String(j+1).padStart(2,'0')}</i>${c[1]}</h4><p>${c[2]}</p>${j===0?`<div class="plan"><b>Planned content</b>${esc(s.plan)}</div>`:''}</div>`).join('')}</div>
 <nav class="pager" aria-label="Section navigation">${pv?`<a href="#${pv.id}"><small>← ${pv.no}</small><span>${esc(pv.title)}</span></a>`:`<a href="#home"><small>← ${TL('Back','Rudi')}</small><span>${TL('The opening','Mwanzo')}</span></a>`}${nx?`<a class="nx" href="#${nx.id}"><small>${nx.no} →</small><span>${esc(nx.title)}</span></a>`:`<a class="nx" href="#home"><small>${TL('Finish','Maliza')} →</small><span>${TL('The opening','Mwanzo')}</span></a>`}</nav></div>`}


const BEATS=[
 ['bg-ext','Care moved home.','Families now manage blood pressure, diabetes, pregnancy, babies and ageing parents at home, every single month.'],
 ['bg-dark','Shopping didn’t.','Products are scattered across pharmacies, supermarkets and street sellers. Prices are unclear, quality is hard to trust, and supplies run out at night.'],
 ['bg-int','One calm store, organised by need.','A free Afya Check at the door, Care Zones by life situation, and 4–5 registered brands for every product.'],
 ['bg-int','Paid in seconds.','Scan, tap mobile money, done: under 3 minutes in store, under 30 seconds to reorder in the app or on WhatsApp.'],
 ['bg-ext','Never run out.','Members get a monthly Afya Box, swap brands up to 12 days before month end, and receive it at home the same day.'],
 ['bg-dark','The ask: TSh 110M.','Seed capital to open the flagship and launch the Afya Box, released in three tranches only as milestones are met.']];
const PLAY='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',PAUSE='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>';
function story01(s,p,pv,nx){return `
<div class="s01">
<section class="s01hero" aria-labelledby="s01h"><div class="s01img" role="img" aria-label="Concept render: the one-floor Afya Basics flagship at dusk"></div>
 <div class="wrap s01in">
  <div class="crumb"><a href="#home">Showroom</a><span>/</span><span style="color:${p.c}">Part ${p.n} · ${esc(p.name)}</span><span>/</span><span>${s.no}</span></div>
  <div class="modno" style="margin-top:26px">01 · Headline promise</div>
  <h1 class="s01h" id="s01h">Health essentials, <em>without the hunt.</em></h1>
  <p class="s01p">The right product first time, one honest price, paid in seconds, and a monthly Afya Box at the door before the family runs out.</p>
  <p class="motto" style="margin-top:14px">Afya yako, nyumbani kwako.</p>
  <div class="cta"><button class="btn solid" id="play60" type="button">${PLAY} Play the 60-second story</button><a class="btn line" href="#s0-2">Ten-minute presentation</a></div>
  <span class="state"><i></i>Draft · ready for your review</span>
 </div>
</section>
<div class="wrap">
 <section class="mod01" aria-label="The problem in one line"><div class="modno">02 · The problem in one line</div>
  <p class="oneline">Care moved home, but shopping for it is still <b>scattered, slow, untrusted and unplanned</b>, and family abroad can’t be sure their money becomes care.</p></section>

 <section class="mod01" aria-label="Our answer"><div class="modno">03 · Our answer</div>
  <div class="pillars">
   <div class="pill"><span class="k">THE STORE</span><b>One calm flagship</b><p>Care Zones by life situation, a free Afya Check at the door, registered products only, one honest price.</p></div>
   <div class="pill"><span class="k">THE MEMBERSHIP</span><b>The Afya Box</b><p>1, 6 or 12-month plans for mother & baby, hygiene, beauty and condition care, with brand swaps and reminders.</p></div>
   <div class="pill"><span class="k">THE DIGITAL LAYER</span><b>App & WhatsApp</b><p>Reorder in seconds, pay by mobile money, track the box, and let family abroad pay for care directly.</p></div>
  </div></section>

 <section class="mod01" aria-label="How it works"><div class="modno">04 · How it works</div>
  <div class="flow">
   <div class="step"><span class="t">50 s</span><b>Check</b><p>Free Afya Check at the entrance: blood pressure and key readings on screen.</p></div>
   <div class="step"><span class="t">&lt;2 min</span><b>Choose</b><p>Walk to the right Care Zone and pick from 4–5 trusted brands.</p></div>
   <div class="step"><span class="t">&lt;30 s</span><b>Pay</b><p>Scan and tap mobile money at a kiosk or the counter.</p></div>
   <div class="step"><span class="t">0 clicks</span><b>Never run out</b><p>Join the Afya Box; it renews and arrives home every month.</p></div>
  </div></section>

 <section class="mod01" aria-label="The experience"><div class="modno">05 · The experience</div>
  <div class="duo">
   <figure class="shot"><img src="img/exterior.webp" width="1680" height="944" loading="lazy" alt="Concept render of the Afya Basics one-floor flagship at dusk with Afya Box lockers and a delivery rider"><figcaption>Outside · Afya Box lockers and same-day delivery</figcaption></figure>
   <figure class="shot"><img src="img/interior.webp" width="1680" height="944" loading="lazy" alt="Concept render of the Afya Basics interior with signature counter, package screens and Afya Check kiosk"><figcaption>Inside · signature counter, package screens, Afya Check</figcaption></figure>
  </div></section>

 <section class="mod01" aria-label="Try it: the 60-second story" id="try60"><div class="modno">06 · Try it · the 60-second story</div>
  <div class="player" id="player">
   <div class="bg" data-k="bg-ext" style="background-image:url(img/exterior.webp)"></div><div class="bg" data-k="bg-int" style="background-image:url(img/interior.webp)"></div><div class="bg dark" data-k="bg-dark"></div>
   <div class="segs">${BEATS.map((b,i)=>`<button type="button" data-i="${i}" aria-label="Go to beat ${i+1}: ${esc(b[1])}"><i></i></button>`).join('')}</div>
   <div class="beat" id="beat" aria-live="polite"></div>
   <div class="pctl"><button type="button" id="pp" aria-label="Play">${PLAY}</button><span id="clock">00:00 / 01:00</span></div>
  </div></section>

 <section class="mod01" aria-label="Five key numbers"><div class="modno">07 · The numbers</div>
  <div class="nums">
   <div class="num"><b><em>&lt;</em>3 min</b><span>${TL('to find and pay in store','kupata na kulipa dukani')}</span></div>
   <div class="num"><b><em>&lt;</em>30 s</b><span>to repeat an order online</span></div>
   <div class="num"><b>0 <em>clicks</em></b><span>for the monthly Afya Box</span></div>
   <div class="num"><b>~520</b><span>product families, 4–5 brands each</span></div>
   <div class="num g"><b>TSh 110M</b><span>seed ask, in 40·35·25 tranches</span></div>
  </div><p class="note">Planning estimates · confirmed against the master model before sign-off</p></section>

 <section class="mod01" aria-label="Risks and our answer"><div class="modno">08 · Risks and our answer</div>
  <div class="risks">
   <div class="risk"><span class="q">A new name has to earn trust.</span><span class="ar">→</span><span class="a">Free Afya Check on every visit, registered products only, and the same price in store, app and WhatsApp.</span></div>
   <div class="risk"><span class="q">Members may join slower than planned.</span><span class="ar">→</span><span class="a">One-off kits sell without membership, and capital is released only when each milestone is met.</span></div>
   <div class="risk"><span class="q">Imports from China and India can be delayed.</span><span class="ar">→</span><span class="a">Reorder points set ahead of demand, with more than one supplier for each key product.</span></div>
  </div></section>

 <section class="mod01" aria-label="Investor takeaway"><div class="modno">09 · Investor takeaway</div>
  <p class="take">Recurring revenue from members, <b>every running cost recovered inside the price the customer pays</b>, and capital released only as milestones are hit.</p>
  <div class="doors">
   <a href="#s1-1"><small>1.1 →</small><span>The problem</span></a>
   <a href="#s3-1"><small>3.1 →</small><span>The store</span></a>
   <a href="#s3-4"><small>3.4 →</small><span>Membership</span></a>
   <a href="#s6-3"><small>6.3 →</small><span>Funding</span></a>
  </div></section>

 <section class="ask" aria-labelledby="s01ask">
  <span class="hud g">The ask</span>
  <h2 id="s01ask">Open store one. <em>Launch the Afya Box.</em></h2>
  <div class="askg"><div><b>TSh 150M or 340M</b><span>start small, or open the full flagship (section 6.3)</span></div><div><b>40·35·25</b><span>tranches released at milestones</span></div><div><b>25%</b><span>founders’ share, protected for life</span></div></div>
 </section>
 <nav class="pager" aria-label="Section navigation"><a href="#home"><small>← ${TL('Back','Rudi')}</small><span>${TL('The opening','Mwanzo')}</span></a><a class="nx" href="#${nx.id}"><small>${nx.no} →</small><span>${esc(nx.title)}</span></a></nav>
</div></div>`}

const SRC={
 who_ht:['WHO, United Republic of Tanzania hypertension profile (2012 STEPS survey data)','https://cdn.who.int/media/docs/default-source/country-profiles/hypertension/tza_en.pdf'],
 who_sf:['WHO news release, 28 November 2017: 1 in 10 medical products in developing countries is substandard or falsified','https://www.who.int/news/item/28-11-2017-1-in-10-medical-products-in-developinG-countries-is-substandard-or-falsified'],
 nbs:['National Bureau of Statistics, 2022 Population and Housing Census, Dar es Salaam region (via City Population)','https://www.citypopulation.de/en/tanzania/admin/07__dar_es_salaam'],
 rem:['The Citizen, 27 May 2026: Diaspora remittances hit Sh3.3 trillion (2024/25 financial year)','https://www.thecitizen.co.tz/tanzania/diaspora/diaspora-remittances-hit-sh3-3-trillion-as-tanzania-deepens-global-engagement-5473984']};
const cite=(k,n)=>`<a class="cite" href="${SRC[k][1]}" target="_blank" rel="noopener" title="${esc(SRC[k][0])}">[${n}]</a>`;
function sec11(s,p,pv,nx){const EV=[
 ['1 in 4','adults aged 25–64 in Tanzania had high blood pressure in the 2012 survey (25.7%).','who_ht',1,'#ff9b87'],
 ['2 in 100','people with high blood pressure had it under control in 2012 (2.2%). Only 17.6% knew they had it.','who_ht',1,'#ffb36b'],
 ['1 in 10','medical products in low- and middle-income countries is substandard or falsified.','who_sf',2,'#ff7b9c'],
 ['5.38M','people live in Dar es Salaam region, Afya Basics’ first market (5,383,728 in 2022).','nbs',3,'#f2c96b'],
 ['TSh 3.3T','sent home by Tanzanians abroad in the 2024/25 financial year (Sh3.313 trillion).','rem',4,'#c9b8ff']];
 const FIX=[['Scattered','Need first','Care Zones gather everything for one life situation in one place, in the store, in the box and in the app. A mother finds nappies, wipes, iron tablets and a thermometer side by side, not in four different shops.'],
  ['Slow','Pay in seconds','No queue to ask and no queue to pay. Shelves are organised by need, prices are shown on digital labels, and payment is a scan-and-go kiosk or a mobile-money tap: under three minutes from door to door.'],
  ['Untrusted','Fewer, better · Check, then choose','Only registered products, with 4–5 trusted brands per need so even the cheapest option is safe. A free Afya Check gives a reading first, so advice starts from facts, not guesses.'],
  ['Unplanned','Never run out','The monthly Afya Box renews itself. Members can swap brands up to 12 days before month end and get reminders by phone or email, so the next box is planned before anything runs out.'],
  ['Far from family','One Afya everywhere','One account across the store, the app and WhatsApp. A son abroad pays for his mother’s box directly, gets the same reminders, and sees each delivery arrive.']];
 const FAM=[
  ['Mama na mtoto','A mother and her baby','The Mama na mtoto box',[
   ['Nappies run low. The first pharmacy has them, but not in the baby’s size; the wipes come from a second shop.','The Mama na mtoto box arrives at the start of the month: nappies and wipes in the right size.'],
   ['The baby has a fever at night. Finding a thermometer and the right syrup takes two more pharmacies.','A thermometer is already in the box. The team gives advice on WhatsApp and delivers the same day.'],
   ['Mama’s iron and folic acid tablets: a third pharmacy, and no way to be sure the pack is genuine.','Registered brands only. She adds the tablets to next month’s box in the app, in seconds.'],
   ['Baby lotion runs out. Another trip in the heat, with the baby on her back.','A reminder came 12 days before month end. The next box is already on its way.']]],
  ['Baba na kisukari','A father living with diabetes','The diabetes care box',[
   ['His test strips run out. The first pharmacy only has a brand that does not fit his meter.','His meter and strips are saved to his account. The right strips come in his monthly box.'],
   ['Busy with work, he skips his readings for a week. Nobody sees his numbers rising.','A free Afya Check whenever he passes. His readings are saved so he can follow them.'],
   ['To save money he buys lancets from a stall, with no registration mark on the pack.','Registered brands only, with 4–5 options in the same price range, so the cheaper choice is still safe.'],
   ['Pen needles run out on a public holiday, and every pharmacy nearby is closed.','A reminder 12 days before month end, and same-day delivery when something is needed fast.']]],
  ['Bibi na mjukuu','A grandmother cared for by her granddaughter','The elderly care box',[
   ['Adult diapers and wipes: the granddaughter leaves work early to buy them across town.','The elderly care box arrives at Bibi’s door every month.'],
   ['The batteries in Bibi’s blood-pressure monitor die. Nobody checks her for days.','The granddaughter adds batteries in the app at her desk; they arrive the same day.'],
   ['After a fall, Bibi needs a walking frame. No shop nearby rents one, and buying is expensive.','Equipment rental from Afya Basics, delivered and collected when it is no longer needed.'],
   ['The cream for Bibi’s skin sores comes from a stall. Nobody knows whether it is genuine.','Registered products only, with advice from a trained team member.']]],
  ['Mama mjamzito','An expectant mother','The pregnancy box',[
   ['Iron and folic acid from one pharmacy, maternity pads from another, and a long walk between them.','The pregnancy box brings her monthly essentials together in one delivery.'],
   ['Her feet are swollen and she wants to check her blood pressure, but the clinic queue takes half a day.','A free Afya Check. If the reading is high, the team tells her to see her clinic straight away.'],
   ['Things for the new baby are bought piece by piece, over many trips in the last weeks.','A ready new-baby kit, bought once as a one-off, without joining anything.'],
   ['Close to her due date, travelling to shops is hard and tiring.','Everything she needs is delivered home the same day.']]],
  ['Mwana ughaibuni','A son working abroad, caring for his mother','A parent’s box, paid from abroad',[
   ['He sends money home every month, but cannot see whether it became his mother’s care.','He pays for his mother’s Afya Box directly in the app and sees it delivered.'],
   ['His mother calls: her tablets ran out days ago. From far away, there is little he can do.','He gets the renewal reminder too, and reorders for her with one tap.'],
   ['A relative buys a cheaper, unregistered product to make the money stretch.','Only registered products reach her door.'],
   ['He worries about her blood pressure but has no way of knowing how she is.','With her permission, her free Afya Check readings can be shared with him.']]]];
 window.FAM=FAM;
 const IMP=[['1 in 4 adults','A large, repeating need for monitors, strips, checks and advice: the core of the condition-care boxes.'],
  ['2 in 100 controlled','Most people do not know their numbers. A free check at the door finds customers before they know they need us.'],
  ['1 in 10 products','Trust is something families will choose. “Registered only” becomes a reason to switch, not just a rule.'],
  ['5.38M people','One city is enough to build the first store, the packing hub and same-day delivery routes.'],
  ['TSh 3.3T a year','Families abroad already send money home. Paying for a parent’s Afya Box turns that money into visible care.']];
 return `
<div class="s01 s11">
<section class="s01hero" aria-labelledby="s11h"><div class="s01img" style="background-image:url(img/today1.webp)" role="img" aria-label="Concept image: a mother with her baby on her back at a pharmacy counter, told her item is out of stock"></div>
 <div class="wrap s01in">
  <div class="crumb"><a href="#home">Showroom</a><span>/</span><span style="color:${p.c}">Part ${p.n} · ${esc(p.name)}</span><span>/</span><span>${s.no}</span></div>
  <div class="modno" style="margin-top:26px">01 · Headline promise</div>
  <h1 class="s01h" id="s11h">Care moved home. <em>Shopping for it didn’t.</em></h1>
  <p class="s01p">Tanzanian families now manage babies, pregnancy, blood pressure, diabetes and ageing parents at home. Getting what that care needs still means one item from this pharmacy, one from that shop, guesswork about quality, and hours lost every month.</p>
  <span class="state"><i></i>Draft · ready for your review</span>
 </div>
</section>
<div class="wrap">
 <section class="mod01" aria-label="The problem, with evidence"><div class="modno">02 · The problem, with evidence</div>
  <div class="plain"><span class="modno" style="margin:0 0 12px">In plain words</span>
   <ol><li><b>Families buy health products every month.</b> Nappies, test strips, tablets, creams and monitors. Care that used to happen in hospital now happens at home, and it needs supplies every week.</li>
   <li><b>Today they buy them one item at a time.</b> One pharmacy has this, another has that. Each missing item costs another trip, another queue and another hour, often with a baby or an elderly parent in tow.</li>
   <li><b>They cannot be sure what is genuine.</b> Registered, fake and expired products sit side by side, and the cheapest choice is often the riskiest. On top of that, supplies run out at the worst moment: at night, on a Sunday, on a holiday.</li>
   <li><b>That costs time, money and health.</b> Afya Basics puts everything for each life situation in one place, sells only registered products, and brings them home before they run out.</li></ol></div>
  <p class="oneline" style="margin-top:34px">The need is <b>large</b>, it is <b>mostly hidden</b>, and the products families buy are <b>not always safe</b>.</p>
  <div class="ev">${EV.map(e=>`<article class="evc" style="--c:${e[4]}"><b>${e[0]}</b><p>${e[1]} ${cite(e[2],e[3])}</p></article>`).join('')}</div>
  <p class="note">Blood-pressure figures come from the 2012 national STEPS survey, the latest national WHO profile. Section 1.2 adds newer studies.</p></section>

 <section class="mod01" aria-label="Our answer"><div class="modno">03 · Our answer</div>
  <div class="fixes">${FIX.map((f,i)=>`<div class="fx"><span class="fx-p" style="--c:${SIG[i][1]}"><i></i>${f[0]}</span><span class="fx-ar" aria-hidden="true"></span><div class="fx-a"><b>${f[1]}</b><p>${f[2]}</p></div></div>`).join('')}</div></section>

 <section class="mod01" aria-label="How it works"><div class="modno">04 · How it works · one month, five families</div>
  <p class="s11lead">The problem looks different in every home. Choose a family to see the same four weeks lived two ways: today, and with Afya Basics. <span class="tagi">Illustrative</span></p>
  <div class="famtabs" role="tablist" aria-label="Families">${FAM.map((f,i)=>`<button type="button" role="tab" data-f="${i}" class="${i?'':'on'}" aria-selected="${!i}"><b>${f[0]}</b><span>${f[1]}</span></button>`).join('')}</div>
  <div class="month" id="month"></div>
  <p class="note" id="famnote"></p></section>

 <section class="mod01" aria-label="The experience"><div class="modno">05 · The experience · one afternoon, three stops</div>
  <p class="s11lead">This is what “scattered” looks like for mama na mtoto today. Every stop is one item, one queue, one more hour.</p>
  <div class="story3">
   <figure class="st3"><div class="st3i"><img src="img/today1.webp" width="1680" height="944" loading="lazy" alt="Concept image: a mother with her baby at a pharmacy counter, told the item is out of stock"><span>Stop 1</span></div><figcaption><b>Out of stock.</b> The first pharmacy has the wipes, but not the nappies in her baby’s size.</figcaption></figure>
   <figure class="st3"><div class="st3i"><img src="img/today2.webp" width="1680" height="944" loading="lazy" alt="Concept image: the mother walking along a busy street to the next shop with small bags from each pharmacy"><span>Stop 2</span></div><figcaption><b>Back on the road.</b> In the midday heat, baby on her back, bags from each shop, to the next pharmacy.</figcaption></figure>
   <figure class="st3"><div class="st3i"><img src="img/today3.webp" width="1680" height="944" loading="lazy" alt="Concept image: a crowded queue at a second pharmacy counter"><span>Stop 3</span></div><figcaption><b>Another queue.</b> A crowded counter for one more item, with no way to check if it is genuine.</figcaption></figure>
  </div>
  <div class="st3after"><figure class="shot"><img src="img/exterior-side.webp" width="1680" height="944" loading="lazy" alt="Concept image of the Afya Basics street-front store"><figcaption>With Afya Basics</figcaption></figure>
   <div><span class="modno" style="margin:0 0 10px">With Afya Basics</span><h3>One stop, or no stop at all.</h3><p>Everything for mama na mtoto is in one Care Zone, at one honest price, paid in seconds. Or it arrives at home every month in the Afya Box, before anything runs out.</p></div></div>
 </section>

 <section class="mod01" aria-label="Try it: the cost of the hunt" id="calc"><div class="modno">06 · Try it · the cost of the hunt</div>
  <div class="calc">
   <div class="cin">
    <p class="s11lead" style="margin:0 0 6px">How much does shopping for health cost a family each month? Change the example values to your own.</p>
    <label><span>Health-shopping trips a month</span><input type="range" id="c_trips" min="1" max="12" value="4"><output id="o_trips"></output></label>
    <label><span>Transport per trip (TSh)</span><input type="range" id="c_fare" min="0" max="20000" step="500" value="3000"><output id="o_fare"></output></label>
    <label><span>Hours lost per trip</span><input type="range" id="c_hrs" min="0.5" max="5" step="0.5" value="1.5"><output id="o_hrs"></output></label>
    <label><span>Value of one hour (TSh)</span><input type="range" id="c_val" min="0" max="10000" step="250" value="2000"><output id="o_val"></output></label>
   </div>
   <div class="cout">
    <div><small>Cost of the hunt, per month</small><b id="r_month">–</b></div>
    <div><small>Per year</small><b id="r_year">–</b></div>
    <div><small>Hours lost per year</small><b id="r_hours">–</b></div>
    <p>With an Afya Box, delivery is built into the box price and routine trips fall to zero. The box price itself is set in section 3.5.</p>
   </div>
  </div><p class="note">Example values only, not survey data · change them to match a real family</p></section>

 <section class="mod01" aria-label="The numbers"><div class="modno">07 · The numbers · what they mean for Afya Basics</div>
  <div class="imp">${IMP.map(m=>`<div><b>${m[0]}</b><p>${m[1]}</p></div>`).join('')}</div></section>

 <section class="mod01" aria-label="Risks and our answer"><div class="modno">08 · Risks and our answer</div>
  <div class="risks">
   <div class="risk"><span class="q">Is the pain big enough that families will pay to fix it?</span><span class="ar">→</span><span class="a">The needs repeat every month. The free Afya Check shows value before anyone pays, and delivery is already inside the box price.</span></div>
   <div class="risk"><span class="q">Will families change long-held shopping habits?</span><span class="ar">→</span><span class="a">They do not have to. Walk-in shopping works as before; the box and the app are added only when a customer wants them.</span></div>
   <div class="risk"><span class="q">The national blood-pressure data dates from 2012.</span><span class="ar">→</span><span class="a">Section 1.2 adds newer studies, and on-the-ground research in Dar es Salaam will confirm the numbers before launch.</span></div>
  </div></section>

 <section class="mod01" aria-label="Investor takeaway"><div class="modno">09 · Investor takeaway</div>
  <p class="take">The problem is <b>large, repeating and costly</b> for families. A need that comes back every month is a business that earns every month.</p>
  <div class="doors">
   <a href="#s1-2"><small>1.2 →</small><span>The evidence</span></a>
   <a href="#s1-3"><small>1.3 →</small><span>Market size</span></a>
   <a href="#s1-4"><small>1.4 →</small><span>Our customers</span></a>
   <a href="#s3-1"><small>3.1 →</small><span>The store</span></a>
  </div></section>

 <section class="mod01 srcs" aria-label="Sources"><div class="modno">Sources</div>
  <ol>${Object.keys(SRC).map(k=>`<li><a href="${SRC[k][1]}" target="_blank" rel="noopener">${esc(SRC[k][0])}</a></li>`).join('')}</ol></section>
 <nav class="pager" aria-label="Section navigation"><a href="#${pv.id}"><small>← ${pv.no}</small><span>${esc(pv.title)}</span></a><a class="nx" href="#${nx.id}"><small>${nx.no} →</small><span>${esc(nx.title)}</span></a></nav>
</div></div>`}
function initFam(){const m=document.getElementById('month');if(!m)return;const tabs=[...document.querySelectorAll('.famtabs button')];
 const show=i=>{const f=FAM[i];tabs.forEach((t,k)=>{t.classList.toggle('on',k===i);t.setAttribute('aria-selected',k===i)});
  m.innerHTML=`<div class="mh"></div><div class="mh t">Today</div><div class="mh a">With Afya Basics · ${f[2]}</div>`+f[3].map((w,k)=>`<div class="wk">Week ${k+1}</div><div class="mt">${w[0]}</div><div class="ma">${w[1]}</div>`).join('');
  m.classList.remove('swap');void m.offsetWidth;m.classList.add('swap');
  document.getElementById('famnote').textContent=f[0]+' · '+f[1]+' · four or more separate trips today, one box or one visit with Afya Basics'};
 tabs.forEach((t,i)=>t.onclick=()=>show(i));show(0)}
function initCalc(){initFam();const g=id=>document.getElementById(id);if(!g('c_trips'))return;const tz=n=>'TSh '+Math.round(n).toLocaleString('en-US');
 const up=()=>{const t=+g('c_trips').value,f=+g('c_fare').value,h=+g('c_hrs').value,v=+g('c_val').value;
  g('o_trips').textContent=t;g('o_fare').textContent=tz(f);g('o_hrs').textContent=h+' h';g('o_val').textContent=tz(v);
  const m=t*(f+h*v);g('r_month').textContent=tz(m);g('r_year').textContent=tz(m*12);g('r_hours').textContent=Math.round(t*h*12)+' h'};
 ['c_trips','c_fare','c_hrs','c_val'].forEach(k=>g(k).oninput=up);up()}


/* ---------- shared section shell (used by sections/*.js) ---------- */
const tagi=t=>`<span class="tagi">${esc(t)}</span>`;
const PE='<span class="tagi">Planning estimate</span>';
function secShell(o){const {s,p,pv,nx}=o;let v3m=[];try{const f=(window.V3MODS||{})[s.id];if(f)v3m=f(o)||[]}catch(e){console.warn('v3mods',e)}const mods=(o.mods||[]).map((m,i)=>[m,i]).filter(([m])=>!(window.V3DROP&&(window.V3DROP[s.id]||[]).includes(m[0])));
 return `<div class="s01 sx ${o.cls||''}">
<section class="s01hero" aria-labelledby="h-${s.id}">${o.img?`<div class="s01img" style="background-image:url(${o.img})" role="img" aria-label="${esc(o.imgAlt||'')}"></div>`:`<div class="s01img sxgrad"></div>`}
 <div class="wrap s01in">
  <div class="crumb"><a href="#home">Showroom</a><span>/</span><span style="color:${p.c}">Part ${p.n} · ${esc(p.name)}</span><span>/</span><span>${s.no}</span></div>
  <div class="modno" style="margin-top:26px">01 · Headline promise</div>
  <h1 class="s01h" id="h-${s.id}">${o.h1}${o.em?` <em>${o.em}</em>`:''}</h1>
  ${o.lede?`<p class="s01p">${o.lede}</p>`:''}
  ${o.heroExtra||''}
  <span class="state"><i></i>${o.state||'Draft · ready for your review'}</span>
 </div>
</section>
<div class="wrap">
${window.V3&&window.V3.leanNote?window.V3.leanNote(s.id):''}
${v3m.map((m,j)=>`<section class="mod01 v3mod" aria-label="${esc(typeof m[0]==='string'?m[0]:m[0][0])}"><div class="modno">${String(j+2).padStart(2,'0')} · ${typeof m[0]==='string'?esc(m[0]):window.V3.L(m[0][0],m[0][1])}</div>${m[1]}</section>`).join('\n')}
${mods.map(([m,i],k)=>`<section class="mod01" aria-label="${esc(m[0])}" ${m[2]?`id="${m[2]}"`:''}><div class="modno">${String(v3m.length+k+2).padStart(2,'0')} · ${esc(m[0])}</div>${m[1]}</section>`).join('\n')}
${o.takeaway?`<section class="mod01" aria-label="Investor takeaway"><div class="modno">${String(v3m.length+mods.length+2).padStart(2,'0')} · Investor takeaway</div><p class="take">${o.takeaway}</p>${o.doors&&o.doors.length?`<div class="doors">${o.doors.map(d=>{const t=ALL.find(x=>x.id===d);return t?`<a href="#${t.id}"><small>${t.no} →</small><span>${esc(t.title)}</span></a>`:''}).join('')}</div>`:''}</section>`:''}
${o.sources&&o.sources.length?`<section class="mod01 srcs" aria-label="Sources"><div class="modno">Sources</div><ol>${o.sources.map(x=>`<li><a href="${x[1]}" target="_blank" rel="noopener">${esc(x[0])}</a></li>`).join('')}</ol></section>`:''}
 <nav class="pager" aria-label="Section navigation">${pv?`<a href="#${pv.id}"><small>← ${pv.no}</small><span>${esc(pv.title)}</span></a>`:`<a href="#home"><small>← ${TL('Back','Rudi')}</small><span>${TL('The opening','Mwanzo')}</span></a>`}${nx?`<a class="nx" href="#${nx.id}"><small>${nx.no} →</small><span>${esc(nx.title)}</span></a>`:`<a class="nx" href="#home"><small>${TL('Finish','Maliza')} →</small><span>${TL('The opening','Mwanzo')}</span></a>`}</nav>
</div></div>`}

let storyT=null;
function initStory(){clearInterval(storyT);const pl=document.getElementById('player');if(!pl)return;
 const D=10000,bgs=[...pl.querySelectorAll('.bg')],segs=[...pl.querySelectorAll('.segs button')],beat=document.getElementById('beat'),pp=document.getElementById('pp'),clock=document.getElementById('clock');
 let i=0,el=0,playing=false,last=0;
 const fmt=ms=>{const t=Math.min(60,Math.floor(ms/1000));return '00:'+String(t).padStart(2,'0')};
 const show=k=>{i=k;const b=BEATS[i];bgs.forEach(x=>x.classList.toggle('on',x.dataset.k===b[0]));beat.className='beat';void beat.offsetWidth;beat.className='beat swap';beat.innerHTML=`<span class="n">${String(i+1).padStart(2,'0')} / 06</span><h3>${b[1]}</h3><p>${b[2]}</p>`};
 const paint=()=>{segs.forEach((s,k)=>s.firstChild.style.width=(k<i?100:k>i?0:Math.min(100,el/D*100))+'%');clock.textContent=fmt(i*D+el)+' / 01:00'};
 const tick=()=>{const now=performance.now();el+=now-last;last=now;if(el>=D){if(i<BEATS.length-1){el=0;show(i+1)}else{el=D;stop()}}paint()};
 const play=()=>{if(i===BEATS.length-1&&el>=D){el=0;show(0)}playing=true;last=performance.now();storyT=setInterval(tick,100);pp.innerHTML=PAUSE;pp.setAttribute('aria-label','Pause')};
 const stop=()=>{playing=false;clearInterval(storyT);pp.innerHTML=PLAY;pp.setAttribute('aria-label','Play')};
 pp.onclick=()=>playing?stop():play();
 segs.forEach((s,k)=>s.onclick=()=>{el=0;show(k);paint()});
 document.getElementById('play60').onclick=()=>{document.getElementById('try60').scrollIntoView({behavior:'smooth',block:'center'});el=0;show(0);paint();if(!playing)play()};
 addEventListener('hashchange',stop,{once:true});
 show(0);paint()}

function route(){applyLang();const id=(location.hash||'#home').slice(1);const known=ALL.some(x=>x.id===id);const app=document.getElementById('app');
 window.dispatchEvent(new Event('afya:leave'));
 app.innerHTML=known?section(id):home();rail(known?id:null);window.scrollTo(0,0);closeIndex();
 if(!known){window.dispatchEvent(new Event('afya:home'));initHome()}if(window.SECTIONS[id]&&window.SECTIONS[id].init){try{window.SECTIONS[id].init()}catch(e){console.error(e)}}else{if(id==='s0-1')initStory();if(id==='s1-1')initCalc()}}
