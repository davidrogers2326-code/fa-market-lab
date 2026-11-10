/* 2.1 The Afya Basics concept · v2 on the D2 template (brief G 2.1, K1.26).
   One static inline-SVG concept picture: the store + the Afya Box membership + digital (app and WhatsApp),
   around one account, one price and one stock; the licensed partner pharmacy and clinics outside Afya (B4).
   Then the promise and a short explanation. The "We are / We are not" positioning moves to 2.2;
   the stores-by-year and revenue-by-channel charts (K1.29) move to 5.4. No numbers that differ by funding option. */
(function(){
'use strict';
const A=()=>window.AB,T=(e,s)=>A().T(e,s),E=s=>A().E(s),L=(e,s)=>E(T(e,s));

const SRC=()=>[
 {t:T('Tanzania Medicines and Medical Devices Act, consolidated text (ss. 5, 22, 56, 73): TMDA functions, registration of products, import permits','Sheria ya Dawa na Vifaa Tiba Tanzania, maandishi yaliyounganishwa (vif. 5, 22, 56, 73): majukumu ya TMDA, usajili wa bidhaa, vibali vya kuingiza'),u:'https://www.tanzanialaws.com/?p=1215'},
 {t:T('Afya Basics member pricing rule and plan terms, as applied to every box in section 3.5 (3% / 6% / 9% below shelf, packing and delivery included)','Kanuni ya bei ya mwanachama na masharti ya mipango ya Afya Basics, kama inavyotumika kwa kila boksi katika sehemu 3.5 (3% / 6% / 9% chini ya bei ya rafu, ufungashaji na usafirishaji ukiwemo)'),u:''},
 {t:T('Afya Check station specification, section 3.3 (basic tier, seven measurements)','Maelezo ya kituo cha Afya Check, sehemu 3.3 (ngazi ya msingi, vipimo saba)'),u:''}];
const cite=n=>`<sup><a href="#abSrc" class="ab-cite" aria-label="${L('Source','Chanzo')} ${n}">${n}</a></sup>`;

/* icons, 24-unit line drawings */
const P={
 store:'<path d="M3 9l1.5-5h15L21 9"/><path d="M4 9v11h16V9"/><path d="M3 9h18"/><path d="M10 20v-6h4v6"/>',
 box:'<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M4 7.5L12 12l8-4.5M12 12v9"/>',
 phone:'<rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M10 18.5h4"/><path d="M9 8h6M9 11h4"/>',
 core:'<circle cx="12" cy="12" r="9"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
 partner:'<path d="M4 20V8l8-4 8 4v12"/><path d="M9 20v-6h6v6"/><path d="M12 7.5v4M10 9.5h4"/>'};
const ic=(k,x,y,s,col)=>`<g transform="translate(${x-12*s} ${y-12*s}) scale(${s})" fill="none" stroke="${col}" stroke-width="${1.5/s*1.2}" stroke-linecap="round" stroke-linejoin="round">${P[k]}</g>`;

const NODES=[
 {k:'store',t:['The store','Duka'],s:['Free Afya Check, advice, 4–5 brands per item','Afya Check ya bure, ushauri, chapa 4–5 kwa kila bidhaa']},
 {k:'box',t:['Afya Box membership','Uanachama wa Afya Box'],s:['A monthly box that arrives before anything runs out','Boksi la kila mwezi linalofika kabla kitu hakijaisha']},
 {k:'phone',t:['App and WhatsApp','Programu na WhatsApp'],s:['Reorder, swap, track, pay from abroad','Agiza tena, badilisha, fuatilia, lipa kutoka nje']}];
const ARCS=[['Joins the box at the counter','Anajiunga na boksi kaunta'],['Swaps brands in the app','Anabadilisha chapa kwenye programu'],['Orders online, collects in store','Anaagiza mtandaoni, anachukua dukani']];

const CORE=[[['One account','Akaunti moja'],['Purchases, plan, address','Manunuzi, mpango, anwani']],[['One price','Bei moja'],['Same in store, app and WhatsApp','Ileile dukani, programu na WhatsApp']],[['One stock count','Hesabu moja ya bidhaa'],['Shelf, packing and online','Rafu, ufungashaji na mtandaoni']]];
const wrap=(t,max)=>{const w=t.split(' '),out=[];let cur='';w.forEach(x=>{if(cur&&(cur+' '+x).length>max){out.push(cur);cur=x}else cur=cur?cur+' '+x:x});if(cur)out.push(cur);return out};
const tx=(x,y,t,o)=>`<text x="${x}" y="${y}"${o.a?` text-anchor="${o.a}"`:''} font-size="${o.fs}"${o.w?` font-weight="${o.w}"`:''} fill="${o.c||'var(--ink)'}">${E(t)}</text>`;
function conceptSVG(mob){
 const id=mob?'s21cv':'s21ch',gold='var(--gold)';let g='';
 const node=(x,y,r,k)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="var(--green)" stroke="var(--green-edge)" stroke-width="1.5"/>${ic(k,x,y,r/30,'var(--ink)')}`;
 const label=(x,y,n,tw,sw,ts,fs)=>{const tl=wrap(T(...n.t),tw),sl=wrap(T(...n.s),sw);let s='';tl.forEach((t,k)=>s+=tx(x,y+k*(ts+4),t,{fs:ts,w:600}));sl.forEach((t,k)=>s+=tx(x,y+tl.length*(ts+4)+4+k*(fs+5),t,{fs,c:'var(--mute)'}));return s};
 const dash=mob?'4 4':'5 5';
 if(!mob){const W=1000,H=590,cx=[100,420,740],ny=180,r=52,cy0=350,cy1=450;
  /* customer moves */
  g+=`<path d="M${cx[0]+30} ${ny-r-6}Q260 40 ${cx[1]-30} ${ny-r-6}" fill="none" stroke="${gold}" stroke-width="1.2" stroke-dasharray="${dash}"/>`;
  g+=`<path d="M${cx[1]+30} ${ny-r-6}Q580 40 ${cx[2]-30} ${ny-r-6}" fill="none" stroke="${gold}" stroke-width="1.2" stroke-dasharray="${dash}"/>`;
  g+=`<path d="M${cx[2]+8} ${ny-r-10}Q420 -60 ${cx[0]-8} ${ny-r-10}" fill="none" stroke="${gold}" stroke-width="1.2" stroke-dasharray="${dash}"/>`;
  g+=tx(260,138,T(...ARCS[0]),{a:"middle",fs:13,c:gold})+tx(580,138,T(...ARCS[1]),{a:'middle',fs:13,c:gold})+tx(420,26,T(...ARCS[2]),{a:'middle',fs:13,c:gold});
  /* nodes, their links to the system, labels to the right */
  NODES.forEach((n,i)=>{g+=`<line x1="${cx[i]}" y1="${ny+r}" x2="${cx[i]}" y2="${cy0}" stroke="var(--green-edge)" stroke-width="1.5"/>`+node(cx[i],ny,r,n.k)+label(cx[i]+r+18,ny-14,n,16,24,18,13)});
  /* the one system */
  g+=`<rect x="40" y="${cy0}" width="920" height="${cy1-cy0}" fill="var(--surface)" stroke="${gold}" stroke-width="1.5"/>`;
  CORE.forEach((c,i)=>{g+=tx(cx[i]-40,cy0+42,T(...c[0]),{fs:17,w:600})+tx(cx[i]-40,cy0+66,T(...c[1]),{fs:13,c:'var(--mute)'})});
  /* partners, outside Afya */
  const px=680,py=500,pw=280,ph=74;
  g+=`<line x1="${px+pw/2}" y1="${cy1}" x2="${px+pw/2}" y2="${py}" stroke="var(--mute)" stroke-dasharray="3 4"/><rect x="${px}" y="${py}" width="${pw}" height="${ph}" fill="none" stroke="var(--mute)" stroke-dasharray="3 4"/>`;
  g+=tx(px+16,py+28,T('Licensed partner pharmacy and clinics','Famasia mshirika yenye leseni na kliniki'),{fs:14,w:600})+tx(px+16,py+52,T('Medicines and services, sold by the partners','Dawa na huduma, zinauzwa na washirika'),{fs:12,c:'var(--mute)'});
  g+=tx(40,py+28,T('Every door reads and writes the same account, price list and stock count.','Kila mlango unasoma na kuandika akaunti ileile, orodha ya bei na hesabu ya bidhaa.'),{fs:13,c:'var(--mute)'});
  return `<svg class="s21-cx s21-h" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="${id}"><title id="${id}">${TITLE()}</title>${g}</svg>`}
 const W=360,ys=[60,215,370],x=46,r=32,c0=470;
 /* moves: dashed links between the doors, and back from the app to the store */
 g+=`<line x1="${x}" y1="${ys[0]+r+4}" x2="${x}" y2="${ys[1]-r-4}" stroke="${gold}" stroke-width="1.2" stroke-dasharray="${dash}"/><line x1="${x}" y1="${ys[1]+r+4}" x2="${x}" y2="${ys[2]-r-4}" stroke="${gold}" stroke-width="1.2" stroke-dasharray="${dash}"/>`;
 g+=`<path d="M${x-r-2} ${ys[2]}C -4 ${ys[2]-60}, -4 ${ys[0]+60}, ${x-r-2} ${ys[0]}" fill="none" stroke="${gold}" stroke-width="1.2" stroke-dasharray="${dash}"/>`;
 [[ys[0]+r+44,0],[ys[1]+r+44,1]].forEach(([y,k])=>{wrap(T(...ARCS[k]),30).forEach((t,j)=>g+=tx(x+r+20,y+j*16,t,{fs:12,c:gold}))});
 wrap(T(...ARCS[2])+' ('+T('back to the store','kurudi dukani')+')',36).forEach((t,j)=>g+=tx(x+r+20,ys[2]+r+44+j*16,t,{fs:12,c:gold}));
 NODES.forEach((n,i)=>{g+=node(x,ys[i],r,n.k)+label(x+r+20,ys[i]-10,n,22,30,15,12)});
 g+=`<line x1="${x}" y1="${ys[2]+r}" x2="${x}" y2="${c0}" stroke="var(--green-edge)" stroke-width="1.5"/>`;
 g+=`<rect x="8" y="${c0}" width="344" height="190" fill="var(--surface)" stroke="${gold}" stroke-width="1.5"/>`;
 CORE.forEach((c,i)=>{g+=tx(28,c0+36+i*54,T(...c[0]),{fs:15,w:600})+tx(28,c0+56+i*54,T(...c[1]),{fs:12,c:'var(--mute)'})});
 const py=c0+230;g+=`<line x1="180" y1="${c0+190}" x2="180" y2="${py}" stroke="var(--mute)" stroke-dasharray="3 4"/><rect x="8" y="${py}" width="344" height="66" fill="none" stroke="var(--mute)" stroke-dasharray="3 4"/>`;
 g+=tx(24,py+26,T('Licensed partner pharmacy and clinics','Famasia mshirika yenye leseni na kliniki'),{fs:13,w:600})+tx(24,py+48,T('Medicines and services, sold by the partners','Dawa na huduma, zinauzwa na washirika'),{fs:12,c:'var(--mute)'});
 return `<svg class="s21-cx s21-v" viewBox="0 0 ${W} ${py+76}" role="img" aria-labelledby="${id}"><title id="${id}">${TITLE()}</title>${g}</svg>`}
const TITLE=()=>L('The Afya Basics concept: the store, the Afya Box membership, and the app and WhatsApp, joined by one account, one price and one stock count. Customers move between them: they join the box at the counter, swap brands in the app, and order online to collect in store. Medicines and services come from the licensed partner pharmacy and partner clinics.','Dhana ya Afya Basics: duka, uanachama wa Afya Box, na programu na WhatsApp, vikiunganishwa na akaunti moja, bei moja na hesabu moja ya bidhaa. Wateja wanahama kati yake: wanajiunga na boksi kaunta, wanabadilisha chapa kwenye programu, na wanaagiza mtandaoni kuchukua dukani. Dawa na huduma zinatoka kwa famasia mshirika yenye leseni na kliniki washirika.');

const PROM=[
 [['Right product, first time','Bidhaa sahihi, mara ya kwanza'],['A range organised by need, a free Afya Check and advice on which item fits, with 4–5 brands in the same price range for each item.','Bidhaa zilizopangwa kwa hitaji, Afya Check ya bure na ushauri kuhusu kipi kinafaa, na chapa 4–5 za bei inayolingana kwa kila bidhaa.']],
 [['Fast','Haraka'],['Find and pay in under 3 minutes in the store and reorder in under 30 seconds in the app or on WhatsApp. These are targets, measured from opening day.','Kupata na kulipa chini ya dakika 3 dukani na kuagiza tena chini ya sekunde 30 kwenye programu au WhatsApp. Haya ni malengo, yatakayopimwa tangu siku ya kufungua.']],
 [['Trusted','Inaaminika'],['Registered products only, one price in every channel, and no medicines on Afya’s shelf: they come only from the licensed partner pharmacy.','Bidhaa zilizosajiliwa pekee, bei moja katika kila njia, na hakuna dawa kwenye rafu ya Afya: zinatoka kwa famasia mshirika yenye leseni pekee.']],
 [['Planned','Imepangwa'],['The box arrives before supplies run out. Choices stay open until 12 days before the end of the month, with a reminder by phone or email.','Boksi linafika kabla bidhaa hazijaisha. Chaguo zinabaki wazi hadi siku 12 kabla ya mwisho wa mwezi, pamoja na kikumbusho kwa simu au barua pepe.']]];

const PARTS=[
 [['The store','Duka'],['Takes a free Afya Check, seven measurements, the quick check in about 50 seconds; finds the right Care Zone; compares 4–5 brands side by side; pays by phone.','Anapata Afya Check ya bure, vipimo saba, kipimo cha haraka kwa takriban sekunde 50; anapata Eneo la Huduma sahihi; analinganisha chapa 4–5 kando kwa kando; analipa kwa simu.'],['Trust and first contact. Most box members are expected to join here, from store customers and Afya Check users.','Imani na mawasiliano ya kwanza. Wanachama wengi wa boksi wanatarajiwa kujiunga hapa, kutoka kwa wateja wa duka na watumiaji wa Afya Check.']],
 [['Afya Box membership','Uanachama wa Afya Box'],['Nothing, unless they choose to. The box renews on its date; until 12 days before month end the member can keep it or swap brands. The goods cost 3%, 6% or 9% less than the shelf on a 1-, 6- or 12-month plan, with packing and delivery included.','Hakuna kitu, isipokuwa akitaka. Boksi linahuishwa tarehe yake; hadi siku 12 kabla ya mwisho wa mwezi mwanachama anaweza kulibakiza au kubadilisha chapa. Bidhaa zinagharimu 3%, 6% au 9% chini ya bei ya rafu kwa mpango wa mwezi 1, miezi 6 au miezi 12, ufungashaji na usafirishaji ukiwemo.'],['Recurring revenue, and a packing list known weeks ahead, so stock is bought against confirmed demand.','Mapato yanayojirudia, na orodha ya ufungashaji inayojulikana wiki kadhaa kabla, hivyo bidhaa zinanunuliwa kulingana na mahitaji yaliyothibitishwa.']],
 [['App and WhatsApp','Programu na WhatsApp'],['Repeats an order, swaps brands, tracks the delivery and receives the receipt by SMS or WhatsApp. Relatives abroad pay for a parent’s box by card.','Anarudia oda, anabadilisha chapa, anafuatilia usafirishaji na anapokea risiti kwa SMS au WhatsApp. Ndugu walioko nje ya nchi wanalipia boksi la mzazi kwa kadi.'],['Reach beyond the store’s catchment, and a direct line to every member for reminders and aftercare.','Kufikia wateja nje ya eneo la duka, na mawasiliano ya moja kwa moja na kila mwanachama kwa vikumbusho na huduma baada ya mauzo.']]];

const CSS=`
.s21 figure.ab-visual{margin-left:0;margin-right:0}
.s21 .s21-cx{display:block;width:100%;height:auto;max-width:1000px}
.s21 .s21-v{display:none;max-width:420px}
@media (max-width:720px){.s21 .s21-h{display:none}.s21 .s21-v{display:block}}
.s21 figcaption{margin-top:var(--s2);color:var(--mute);font-size:var(--fs-cap);max-width:var(--measure)}
.s21 .s21-motto{font-size:var(--fs-title);font-weight:600;color:var(--ink);line-height:1.2;margin-top:var(--s2)}
.s21 .s21-prom{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:0;margin-top:var(--s3);border-top:1px solid var(--line)}
.s21 .s21-prom article{padding:var(--s3) var(--s3) var(--s3) 0;border-bottom:1px solid var(--line)}
.s21 .s21-prom article+article{padding-left:var(--s3);border-left:1px solid var(--line)}
.s21 .s21-prom .n{color:var(--gold);font-weight:600;font-variant-numeric:tabular-nums}
.s21 .s21-prom h3{margin-top:var(--s1)!important}
.s21 .s21-prom p{margin-top:var(--s1);color:var(--ink);font-size:calc(var(--fs-body) - 1px)}
.s21 .ab-block>h2+*{margin-top:var(--s2)}
.s21 .ab-block>*+p,.s21 .ab-block>*+.ab-tw{margin-top:var(--s2)}
.s21 table.ab-t td{min-width:200px}
.s21 table.ab-t td:first-child{min-width:140px}
@media (max-width:860px){.s21 .s21-prom{grid-template-columns:1fr 1fr}.s21 .s21-prom article:nth-child(3){padding-left:0;border-left:0}}
@media (max-width:520px){.s21 .s21-prom{grid-template-columns:1fr}.s21 .s21-prom article+article{padding-left:0;border-left:0}}
`;

function render(s,p,pv,nx){
 return `<article class="ab-sec s21" aria-labelledby="h-s2-1"><style>${CSS}</style><div class="ab-wrap">
 <div class="ab-sec-no">${E(s.no)}</div><h1 id="h-s2-1">${E(s.title)}</h1>
 <p class="ab-summary">${L('Health retail in Dar es Salaam splits three things a household needs: advice sits at the pharmacy counter, convenience sits with online sellers, and planning sits nowhere. Afya Basics joins them in one relationship. A store organised by need, a monthly Afya Box membership, and an app and WhatsApp line are three doors into the same account, with one price and one stock count. Medicines and clinical services stay with licensed partners.','Biashara ya afya Dar es Salaam inatenganisha mambo matatu ambayo kaya inahitaji: ushauri uko kwenye kaunta ya famasia, urahisi uko kwa wauzaji wa mtandaoni, na mipango haiko popote. Afya Basics inayaunganisha katika uhusiano mmoja. Duka lililopangwa kwa hitaji, uanachama wa kila mwezi wa Afya Box, na programu na laini ya WhatsApp ni milango mitatu ya akaunti ileile, yenye bei moja na hesabu moja ya bidhaa. Dawa na huduma za kitabibu zinabaki kwa washirika wenye leseni.')}</p>

 <figure class="ab-visual">
  ${conceptSVG(false)}${conceptSVG(true)}
  <figcaption>${L('The concept in one picture. The three channels share one system; the gold dashed lines are the moves customers make between them. The partner pharmacy and partner clinics sit outside Afya and sell under their own licences.','Dhana katika picha moja. Njia tatu zinatumia mfumo mmoja; mistari ya dhahabu ya vistari ni hatua ambazo wateja wanachukua kati yake. Famasia mshirika na kliniki washirika ziko nje ya Afya na zinauza kwa leseni zao wenyewe.')}</figcaption>
 </figure>

 <div class="ab-body">
  <section class="ab-block">
   <h2>${L('The promise','Ahadi')}</h2>
   <p class="s21-motto">${L('Your health, at your home.','Afya yako, nyumbani kwako.')}</p>
   <p>${L('The promise is turned into four commitments a customer can check and an investor can measure.','Ahadi hii imegeuzwa kuwa ahadi nne ambazo mteja anaweza kuhakiki na mwekezaji anaweza kupima.')}</p>
   <div class="s21-prom">${PROM.map((x,i)=>`<article><span class="n">0${i+1}</span><h3>${L(...x[0])}</h3><p>${L(...x[1])}</p></article>`).join('')}</div>
  </section>

  <section class="ab-block">
   <h2>${L('Three doors, one account','Milango mitatu, akaunti moja')}</h2>
   <p>${L('Each existing format is good at one thing. A drug shop is close and quick but keeps no record. A pharmacy gives advice but is organised around the single prescription and sends no reminder before the test strips run out. An online seller delivers but cannot take a blood-pressure reading or explain which monitor fits. No one plans the household’s month, so the family notices only when something has run out, often at night.','Kila mfumo uliopo ni mzuri kwa jambo moja. Duka la dawa liko karibu na ni la haraka lakini halina kumbukumbu. Famasia inatoa ushauri lakini imepangwa kuzunguka agizo moja la daktari na haitumi kikumbusho kabla vipande vya kupimia havijaisha. Muuzaji wa mtandaoni analeta nyumbani lakini hawezi kupima shinikizo la damu wala kueleza kipima kipi kinafaa. Hakuna anayepanga mwezi wa kaya, hivyo familia inagundua tu kitu kikishaisha, mara nyingi usiku.')}</p>
   <p>${T(`Afya Basics puts the three together. The same customer often uses all three in one month: a free check in the store, a box at home, an urgent top-up by message. Because everything sits on one account, she does not notice the switch. The table shows what each door does for the customer and for the business; the free check and the box prices are specified in sections 3.3 and 3.5${cite(3)}${cite(2)}.`,`Afya Basics inaviweka vitatu pamoja. Mteja yuleyule mara nyingi anatumia vyote vitatu ndani ya mwezi mmoja: kipimo cha bure dukani, boksi nyumbani, na manunuzi ya dharura kwa ujumbe. Kwa sababu kila kitu kiko kwenye akaunti moja, haoni mabadiliko. Jedwali linaonyesha kila mlango unafanya nini kwa mteja na kwa biashara; kipimo cha bure na bei za maboksi zimeelezwa katika sehemu 3.3 na 3.5${cite(3)}${cite(2)}.`)}</p>
   <div class="ab-tw"><table class="ab-t"><thead><tr><th>${L('Door','Mlango')}</th><th>${L('What the customer does','Mteja anafanya nini')}</th><th>${L('What it gives the business','Inaipa biashara nini')}</th></tr></thead><tbody>${PARTS.map(r=>`<tr><td><b>${L(...r[0])}</b></td><td>${L(...r[1])}</td><td>${L(...r[2])}</td></tr>`).join('')}</tbody></table></div>
  </section>

  <section class="ab-block">
   <h2>${L('One system underneath','Mfumo mmoja chini yake')}</h2>
   <p>${L('One account: a customer has the same account whether she walks in, opens the app or receives a box. It holds her purchases, card, points, box plan and address, keyed to her phone number, and her Afya Check readings only if she agrees.','Akaunti moja: mteja ana akaunti ileile iwe anaingia dukani, anafungua programu au anapokea boksi. Inahifadhi manunuzi yake, kadi, pointi, mpango wa boksi na anwani, kwa namba yake ya simu, na vipimo vyake vya Afya Check pale tu anapokubali.')}</p>
   <p>${L('One price: each item has the same price in the store, in the app and on WhatsApp, with no haggling and no hidden mark-ups. One stock count: the shelf, the packing table and online orders draw on the same live stock, first to expire first out, so the app cannot sell what the shelf does not hold.','Bei moja: kila bidhaa ina bei ileile dukani, kwenye programu na WhatsApp, bila kujadiliana bei wala nyongeza zilizofichwa. Hesabu moja ya bidhaa: rafu, meza ya ufungashaji na oda za mtandaoni zinatumia hesabu ileile ya bidhaa iliyopo, inayoisha muda kwanza ndiyo inatoka kwanza, hivyo programu haiwezi kuuza kisichokuwepo rafuni.')}</p>
   <p>${T(`Only registered products enter the range. The law prohibits selling regulated products that are not registered${cite(1)}, so “registered only” is both company policy and the legal minimum. Medicines are never Afya stock: the licensed partner pharmacy sells and dispenses them under its own permit and pharmacist, and a sealed pharmacy bag can travel with the member’s box. Partner clinics deliver the services booked through Afya (section 5.2).`,`Bidhaa zilizosajiliwa pekee ndizo zinaingia kwenye orodha. Sheria inakataza kuuza bidhaa zinazodhibitiwa ambazo hazijasajiliwa${cite(1)}, hivyo “zilizosajiliwa pekee” ni sera ya kampuni na pia kiwango cha chini cha kisheria. Dawa kamwe si bidhaa za Afya: famasia mshirika yenye leseni inaziuza na kuzitoa kwa kibali chake na mfamasia wake, na mfuko uliofungwa wa famasia unaweza kusafiri pamoja na boksi la mwanachama. Kliniki washirika zinatoa huduma zinazopangwa kupitia Afya (sehemu 5.2).`)}</p>
   <p>${L('One system is also what lets a small team run three channels. They are not three operations: one stock count and one account let the same people serve all three, and the box and online channels build gradually through the first year. What Afya Basics is, and what it deliberately is not, is set out with the brand in section 2.2.','Mfumo mmoja ndio pia unaowezesha timu ndogo kuendesha njia tatu. Si shughuli tatu tofauti: hesabu moja ya bidhaa na akaunti moja zinawawezesha watu walewale kuhudumia zote tatu, na njia za boksi na mtandaoni zinajengeka taratibu katika mwaka wa kwanza. Afya Basics ni nini, na kwa makusudi si nini, kumeelezwa pamoja na chapa katika sehemu 2.2.')}</p>
  </section>
 </div>

 <section class="ab-block"><h2>${L('Key figures','Takwimu muhimu')}</h2>
  ${A().figsHTML([
   {v:'7',l:T('Measurements in the free Afya Check','Vipimo katika Afya Check ya bure'),s:L('Section 3.3','Sehemu 3.3')},
   {v:'3% · 6% · 9%',l:T('Member saving below shelf on 1-, 6- and 12-month plans, packing and delivery included','Punguzo la mwanachama chini ya bei ya rafu kwa mipango ya mwezi 1, miezi 6 na miezi 12, ufungashaji na usafirishaji ukiwemo'),s:L('Section 3.5','Sehemu 3.5')},
   {v:'4–5',l:T('Brands to choose from for each box item, in the same price range','Chapa za kuchagua kwa kila bidhaa ya boksi, za bei inayolingana'),s:L('Section 3.5','Sehemu 3.5')},
   {v:T('12 days','Siku 12'),l:T('Before month end, when next month’s box choices lock','Kabla ya mwisho wa mwezi, chaguo za boksi la mwezi ujao zinapofungwa'),s:L('Section 3.4','Sehemu 3.4')}])}
 </section>

 ${A().openHTML([
  L('The speed targets (under 3 minutes to find and pay, under 30 seconds to reorder) are design targets. They are measured from opening day and reported monthly.','Malengo ya kasi (chini ya dakika 3 kupata na kulipa, chini ya sekunde 30 kuagiza tena) ni malengo ya muundo. Yatapimwa tangu siku ya kufungua na kuripotiwa kila mwezi.'),
  L('How many members will use all three doors, rather than one, is not yet measured. It is tracked from the first month, together with how many box members first came through the free check.','Ni wanachama wangapi watatumia milango yote mitatu, badala ya mmoja, bado haijapimwa. Inafuatiliwa tangu mwezi wa kwanza, pamoja na idadi ya wanachama wa boksi waliokuja kwanza kupitia kipimo cha bure.')])}

 <div id="abSrc">${A().sourcesHTML(SRC())}</div>
 ${A().pagerHTML(pv,nx)}
 </div></article>`}

window.SECTIONS['s2-1']={render,init(){},v2:true};
})();
