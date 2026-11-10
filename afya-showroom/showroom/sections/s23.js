/* 2.3 How it all works · v2 on the D2 template.
   K1.28: the one scroll-animated inline-SVG diagram allowed. Goods move forward from the supplier to the customer's home,
   data is recorded once at every step, money flows back. A 0–1 progress value from the sticky stage drives it;
   under prefers-reduced-motion the diagram shows its static end state.
   Regulation follows research/R1-compliance.md (TBS for cosmetics and food since July 2019; TMDA for medical devices and
   medicines; PVoC fee table; rate US$1 = TSh 2,642.50, BoT 10 Nov 2026). Medicines: partner pharmacy only (B4).
   Costs, riders and opening hours are read from MODEL and follow the funding switch (B5). The afya-chain film is left out:
   its video files are not on file here and its narration predates the TBS/TMDA correction (see "Not yet verified"). */
(function(){
'use strict';
const A=()=>window.AB,T=(e,s)=>A().T(e,s),E=s=>A().E(s),L=(e,s)=>E(T(e,s));
const nf=n=>Math.round(n).toLocaleString('en-US');
const est=()=>`<span class="ab-est">${L('estimate','makadirio')}</span>`;
const exm=()=>`<span class="ab-est">${L('example','mfano')}</span>`;
const prule=()=>`<span class="ab-est">${L('planning rule','kanuni ya mipango')}</span>`;
const CHK='9 Nov 2026';

/* ---------- sources (numbered in this order) ---------- */
const SRC=()=>[
 {t:T('Daily News, 10 September 2026: TMDA moves to destroy TSh 300 million of unregistered medical products seized in Dar es Salaam','Daily News, 10 Septemba 2026: TMDA kuteketeza bidhaa za tiba zisizosajiliwa zenye thamani ya TSh milioni 300 zilizokamatwa Dar es Salaam'),u:'https://dailynews.co.tz/?p=160552',chk:CHK},
 {t:T('WHO news release, 28 November 2017: 1 in 10 medical products in developing countries is substandard or falsified','Taarifa ya WHO kwa vyombo vya habari, 28 Novemba 2017: bidhaa 1 kati ya 10 za kitiba katika nchi zinazoendelea ni duni au za kughushi'),u:'https://www.who.int/news/item/28-11-2017-1-in-10-medical-products-in-developing-countries-is-substandard-or-falsified',chk:'10 Nov 2026'},
 {t:T('Finance Act No. 8 of 2019 (in force 1 July 2019): cosmetics and food move to TBS; TMDA keeps medicines and medical devices','Sheria ya Fedha Na. 8 ya 2019 (ilianza 1 Julai 2019): vipodozi na chakula vinahamia TBS; TMDA inabaki na dawa na vifaa tiba'),u:'https://www.tmda.go.tz/uploads/1678774965-8.%20THE%20FINANCE%20ACT,%202019%20,%20Act%20NO.%208-.pdf',chk:CHK},
 {t:T('TBS, Guideline for the PVoC Programme 2025: Routes A, B and C; fee 0.5% of FOB (Route A), US$250 minimum, US$5,000 maximum per shipment','TBS, Mwongozo wa Mpango wa PVoC 2025: Njia A, B na C; ada 0.5% ya FOB (Njia A), kiwango cha chini US$250, cha juu US$5,000 kwa kila mzigo'),u:'https://www.tbs.go.tz/uploads/text-editor/files/GUIDELINE%20FOR%20PVOC%20PROGRAMME%20-%202025_1786358618.pdf',chk:CHK},
 {t:T('TMDA, Fees and Charges (Amendment) Regulations 2024: import fee for medical devices and diagnostics, 2% of FOB (item 98)','TMDA, Kanuni za Ada na Tozo (Marekebisho) 2024: ada ya kuingiza vifaa tiba na vipimo, 2% ya FOB (kipengele 98)'),u:'https://www.tmda.go.tz/uploads/1718887575-FEES%20AND%20CHARGES%20AMENDMENT%20JUNE%202024%20FINAL.pdf',chk:CHK},
 {t:T('TMDA, Guidelines for importation and exportation of medical devices, Rev 02, May 2024: import permits and shelf life on arrival','TMDA, Miongozo ya kuingiza na kusafirisha nje vifaa tiba, toleo la 02, Mei 2024: vibali vya kuingiza na muda wa matumizi wakati wa kufika'),u:'https://www.tmda.go.tz/uploads/publications/en1755006678-en1728063896-GUIDELINES%20FOR%20IMPORTATION%20AND%20EXPORTATION%20OF%20MEDICAL%20DEVICES%20-%2017.05%20(1).pdf',chk:CHK},
 {t:T('TBS, amendment regulations GN 127 of 21 February 2025: shelf life left on import (50% non-food, 75% food)','TBS, kanuni za marekebisho GN 127 ya 21 Februari 2025: muda wa matumizi uliobaki wakati wa kuingiza (50% zisizo chakula, 75% chakula)'),u:'https://www.tbs.go.tz/uploads/documents/sw-1786362319-Batch%20Amendment%20Regulation.pdf',chk:CHK},
 {t:T('TMDA, Registration and licensing of premises: retail medicine premises are registered and licensed by the Pharmacy Council','TMDA, Usajili na leseni za majengo: majengo ya rejareja ya dawa yanasajiliwa na kupewa leseni na Baraza la Famasia'),u:'https://www.tmda.go.tz/pages/registration-and-licensing-of-premises',chk:CHK},
 {t:T('Tanzania Revenue Authority, EFD/VFD suppliers: fiscal receipts required from businesses with turnover of TSh 11 million or more','Mamlaka ya Mapato Tanzania, wasambazaji wa EFD/VFD: risiti za kodi zinatakiwa kwa biashara zenye mauzo ya TSh milioni 11 au zaidi'),u:'https://tra.go.tz/page/efd-vfd-suppliers',chk:CHK},
 {t:T('Bank of Tanzania, exchange rates: US$1 = TSh 2,642.50 (mean rate, trading date 10 Nov 2026)','Benki Kuu ya Tanzania, viwango vya kubadilisha fedha: US$1 = TSh 2,642.50 (kiwango cha wastani, tarehe ya biashara 10 Nov 2026)'),u:'https://www.bot.go.tz/ExchangeRate/excRates',chk:'10 Nov 2026'},
 {t:T('Afya Basics financial model v1.2, base case (planning estimates)','Modeli ya fedha ya Afya Basics v1.2, hali ya msingi (makadirio ya mipango)'),u:''}];
const cite=n=>`<sup><a href="#abSrc" class="ab-cite" aria-label="${L('Source','Chanzo')} ${n}">${n}</a></sup>`;

/* ---------- model readings ---------- */
function M(){const I=window.MODEL.inputs,B=window.MODEL.get('base'),lean=A().isLean();
 const hm=/(\d\d):(\d\d)\D+(\d\d):(\d\d)/.exec(I.store.hours||'')||[0,'09','00','21','00'];
 const riders=(I.staff||[]).find(s=>/rider/i.test(s[0]));
 const fees=I.cards.filter(c=>c.fee_year>0).map(c=>c.fee_year);
 return {I,B,lean,open:+hm[1]*60+ +hm[2],close:+hm[3]*60+ +hm[4],hours:`${hm[1]}:${hm[2]}–${hm[3]}:${hm[4]}`,riders:riders?riders[1]:0,feeMin:Math.min(...fees),feeMax:Math.max(...fees)}}

/* ---------- the seven stages ---------- */
const STAGES=()=>{const {I,lean,riders}=M();return [
 {n:['Supplier','Msambazaji'],s:['Registered makers','Watengenezaji waliosajiliwa'],
  g:['Products come from established manufacturers and their licensed distributors, chosen for quality first and price second. Every line is registered in Tanzania before it is listed.','Bidhaa zinatoka kwa watengenezaji wanaojulikana na wasambazaji wao wenye leseni, ubora kwanza, bei baadaye. Kila bidhaa imesajiliwa Tanzania kabla ya kuorodheshwa.'],
  m:['Afya pays the supplier on agreed terms, from the money customers have already paid.','Afya inamlipa msambazaji kwa masharti yaliyokubaliwa, kutoka pesa ambazo wateja tayari wamelipa.'],
  d:['The system drafts a purchase order when stock reaches its reorder point; a supplier scorecard tracks quality, price and on-time delivery.','Mfumo unaandaa oda ya ununuzi stoo inapofikia kiwango cha kuagiza upya; kadi ya alama ya msambazaji inafuatilia ubora, bei na kuleta kwa wakati.'],
  who:['The buyer: a founder in year one','Mnunuzi: mwanzilishi katika mwaka wa kwanza'],time:['Purchase order approved within 24 hours of the reorder alert','Oda ya ununuzi inaidhinishwa ndani ya saa 24 tangu tahadhari ya kuagiza upya']},
 {n:['Port and clearance','Bandari na forodha'],s:['Checked before it ships','Inakaguliwa kabla ya kusafirishwa'],
  g:['Goods under compulsory Tanzanian standards (cosmetics, nappies, pads, food) need a TBS pre-shipment certificate (PVoC) before they leave the factory. Medical devices need a TMDA import permit. A licensed clearing agent presents the papers at the port of Dar es Salaam. Local distributors deliver on fixed days instead.','Bidhaa zilizo chini ya viwango vya lazima vya Tanzania (vipodozi, nepi, pedi, chakula) zinahitaji cheti cha TBS cha ukaguzi kabla ya kusafirishwa (PVoC) kabla ya kuondoka kiwandani. Vifaa tiba vinahitaji kibali cha TMDA cha kuingiza. Wakala wa forodha mwenye leseni anawasilisha nyaraka bandarini Dar es Salaam. Wasambazaji wa ndani wanaleta siku maalum badala yake.'],
  m:['Freight, duties, the PVoC fee, the TMDA import fee and the agent’s charge form the landed cost, which the shelf price recovers.','Usafiri, ushuru, ada ya PVoC, ada ya TMDA ya kuingiza na malipo ya wakala vinaunda gharama ya kufikisha, ambayo bei ya rafu inairudisha.'],
  d:['Invoice, packing list, bill of lading, certificate and permit are stored against the batch.','Ankara, orodha ya mzigo, hati ya usafirishaji, cheti na kibali vinahifadhiwa pamoja na batch husika.'],
  who:['A licensed clearing agent; the compliance lead holds the licences','Wakala wa forodha mwenye leseni; msimamizi wa uzingatiaji sheria anashikilia leseni'],time:['Set by TBS, TMDA and customs; a stock buffer covers slow clearances','Unapangwa na TBS, TMDA na forodha; akiba ya stoo inafidia ucheleweshaji wa forodha']},
 {n:['Goods-in','Kupokea mzigo'],s:['Scanned once','Inaskaniwa mara moja'],
  g:['Every carton is scanned: product, batch number and expiry date. Damaged or short deliveries, and stock with too little shelf life left, are refused at the door.','Kila katoni inaskaniwa: bidhaa, namba ya batch na tarehe ya mwisho wa matumizi. Mzigo ulioharibika au pungufu, na stoo yenye muda mfupi mno wa matumizi uliobaki, unakataliwa mlangoni.'],
  m:['The supplier invoice is matched against what actually arrived before it is paid.','Ankara ya msambazaji inalinganishwa na kilichofika kweli kabla ya kulipwa.'],
  d:['Batch and expiry are captured once and never typed again.','Batch na tarehe ya mwisho vinarekodiwa mara moja tu na haviandikwi tena.'],
  who:['Store lead and picker','Msimamizi wa duka na mchukuaji wa bidhaa'],time:['On the shelf the same day it arrives','Rafuni siku hiyohiyo kinapofika']},
 {n:['Stock, first expiry first out','Stoo, kinachoisha kwanza kinatoka kwanza'],s:['One live count','Hesabu moja hai'],
  g:['The handheld always picks the unit that expires first, and flags anything near its date weeks ahead, so nothing old hides at the back.','Mashine ya mkononi inachagua kila mara kinachoisha muda kwanza, na kuonya kuhusu kinachokaribia tarehe yake wiki kadhaa kabla, hivyo hakuna cha zamani kinachojificha nyuma.'],
  m:['A small allowance for shrink and expiry sits inside the retail margin; this rule keeps it small.','Kiasi kidogo cha upotevu na bidhaa zilizoisha muda kiko ndani ya faida ya rejareja; kanuni hii inakiweka kidogo.'],
  d:['Shelf, packing area, app and WhatsApp share one stock count, so online never oversells.','Rafu, eneo la upakiaji, programu na WhatsApp vinatumia hesabu moja ya stoo, hivyo mtandaoni hakuuzwi zaidi ya kilichopo.'],
  who:['Store lead','Msimamizi wa duka'],time:['Expiry alerts weeks ahead, on the dashboard','Tahadhari za muda wa matumizi wiki kadhaa kabla, kwenye dashibodi']},
 {n:['Store and packing','Duka na upakiaji'],s:['Sold, collected or boxed','Kinauzwa, kinachukuliwa au kinawekwa kwenye boksi'],
  g:['The same stock serves the shelf and the packing area. Online orders appear on the picker’s handheld at once. Member boxes are packed on a fixed day from a locked list, photographed and sealed. Medicines are sold only at the licensed partner pharmacy’s own counter.','Stoo ileile inahudumia rafu na eneo la upakiaji. Oda za mtandaoni zinaonekana mara moja kwenye mashine ya mkononi ya mchukuaji. Maboksi ya wanachama yanapakiwa siku maalum kutoka orodha iliyofungwa, yanapigwa picha na kufungwa. Dawa zinauzwa kwenye kaunta ya famasia mshirika yenye leseni pekee.'],
  m:['The customer pays by mobile money, card or cash; members pay their monthly plan. A fiscal receipt goes out by text message or WhatsApp.','Mteja analipa kwa pesa ya simu, kadi au taslimu; wanachama wanalipa mpango wao wa kila mwezi. Risiti ya kodi inatumwa kwa ujumbe mfupi au WhatsApp.'],
  d:['One scan updates stock, sales, member points and the batch record together.','Skani moja inasasisha stoo, mauzo, pointi za mwanachama na kumbukumbu ya batch kwa pamoja.'],
  who:['Health advisers on the floor; a picker-packer for orders and boxes','Washauri wa afya dukani; mchukuaji-mpakiaji kwa oda na maboksi'],time:['Click and collect ready within 2 hours; boxes on the fixed packing day','Oda ya kuchukua dukani tayari ndani ya saa 2; maboksi siku maalum ya upakiaji']},
 {n:['Delivery with proof','Usafirishaji wenye uthibitisho'],s:['Riders by zone','Wasafirishaji kwa kanda'],
  g:lean?['Partner riders, paid per delivery, are assigned by zone; the customer follows the rider live. The box is handed over closed and sealed.','Wasafirishaji washirika, wanaolipwa kwa kila usafirishaji, wanapangwa kwa kanda; mteja anamfuatilia msafirishaji moja kwa moja. Boksi linakabidhiwa likiwa limefungwa.']:[`${riders} salaried riders on electric motorbikes are assigned by zone; the customer follows the rider live. The box is handed over closed and sealed.`,`Wasafirishaji ${riders} wa mshahara kwenye pikipiki za umeme wanapangwa kwa kanda; mteja anamfuatilia msafirishaji moja kwa moja. Boksi linakabidhiwa likiwa limefungwa.`],
  m:['Online orders pay a delivery fee; for boxes, delivery is inside the box price.','Oda za mtandaoni zinalipa ada ya usafirishaji; kwa maboksi, usafirishaji uko ndani ya bei ya boksi.'],
  d:['A photo or a one-time code closes the order and tells the payer, even one abroad, that it has arrived.','Picha au namba ya mara moja inafunga oda na kumjulisha aliyelipa, hata akiwa nje ya nchi, kwamba imefika.'],
  who:lean?['Partner riders, assigned by the system','Wasafirishaji washirika, wanaopangwa na mfumo']:['Salaried riders, assigned by the system','Wasafirishaji wa mshahara, wanaopangwa na mfumo'],time:['Same day in Dar es Salaam for orders paid before 15:00','Siku hiyohiyo Dar es Salaam kwa oda zilizolipwa kabla ya saa tisa alasiri']},
 {n:['The customer’s home','Nyumbani kwa mteja'],s:['And the next month','Na mwezi unaofuata'],
  g:['The box is opened at home and kept on a shelf. Aftercare follows: a reminder for the next check, help with a device, a warranty claim, a complaint answered the same day.','Boksi linafunguliwa nyumbani na kuwekwa rafuni. Huduma baada ya mauzo inafuata: ukumbusho wa kipimo kijacho, msaada wa kifaa, dai la dhamana, lalamiko linalojibiwa siku hiyohiyo.'],
  m:['Card fees and margin pay for aftercare; the next month’s payment request is already scheduled.','Ada za kadi na faida zinalipia huduma baada ya mauzo; ombi la malipo la mwezi ujao tayari limepangwa.'],
  d:['Because every unit is linked to its batch, a supplier recall reaches the right families in minutes.','Kwa kuwa kila kipande kimeunganishwa na batch yake, urejeshaji kutoka kwa msambazaji unawafikia familia sahihi ndani ya dakika.'],
  who:['Health advisers and the member adviser','Washauri wa afya na mshauri wa wanachama'],time:['WhatsApp answer within 5 minutes in opening hours','Jibu la WhatsApp ndani ya dakika 5 wakati wa saa za kazi']}]};

/* ---------- the diagram ---------- */
const LANE=()=>({g:T('Goods','Bidhaa'),d:T('Data','Taarifa'),m:T('Money','Pesa'),sys:T('One Afya system: stock, sales, members, deliveries, money','Mfumo mmoja wa Afya: stoo, mauzo, wanachama, usafirishaji, pesa'),sysS:T('One Afya system','Mfumo mmoja wa Afya')});
const MLAB=[[6,'Customer pays','Mteja analipa'],[5,'Riders','Wasafirishaji'],[4,'Staff and rent','Wafanyakazi na kodi'],[1,'Freight and fees','Usafiri na ada'],[0,'Supplier paid','Msambazaji analipwa']];
const short=(n,max)=>{const w=n.split(' ');const out=[''];w.forEach(x=>{const c=out[out.length-1];if((c+' '+x).trim().length>max&&c)out.push(x);else out[out.length-1]=(c+' '+x).trim()});return out.slice(0,2)};
function svgH(){const S=STAGES(),Ln=LANE(),x=i=>160+i*128,yg=120,yb=200,ym=300;
 const nodes=S.map((s,i)=>{const t=short(T(s.n[0],s.n[1]),16);return `<g class="s23-n" data-i="${i}">
  <line class="s23-tick" x1="${x(i)}" y1="${yg+20}" x2="${x(i)}" y2="${yb}" stroke="var(--mute)" stroke-width="1.5" stroke-dasharray="4 4"/>
  <circle cx="${x(i)}" cy="${yg}" r="20" fill="var(--bg)" stroke="var(--green-edge)" stroke-width="2"/><circle class="s23-fill" cx="${x(i)}" cy="${yg}" r="20" fill="var(--green)"/>
  <text x="${x(i)}" y="${yg+6}" text-anchor="middle" font-size="16" font-weight="600" fill="var(--ink)">${i+1}</text>
  ${t.map((l,k)=>`<text x="${x(i)}" y="${48+k*20}" text-anchor="middle" font-size="15" fill="var(--ink)">${E(l)}</text>`).join('')}</g>`}).join('');
 const ml=MLAB.map(m=>`<text class="s23-ml" x="${x(m[0])}" y="${ym+28}" text-anchor="middle" font-size="13" fill="var(--mute)">${L(m[1],m[2])}</text>`).join('');
 return `<svg class="s23-svg s23-h" viewBox="0 0 1000 350" role="img" aria-labelledby="s23th"><title id="s23th">${L('The chain in seven steps, from the supplier to the customer’s home. Goods move forward, every step is recorded once in one Afya system, and money flows back from the customer to the supplier.','Mnyororo kwa hatua saba, kutoka kwa msambazaji hadi nyumbani kwa mteja. Bidhaa zinasonga mbele, kila hatua inarekodiwa mara moja katika mfumo mmoja wa Afya, na pesa zinarudi kutoka kwa mteja hadi kwa msambazaji.')}</title>
  <text x="0" y="${yg+5}" font-size="14" fill="var(--green-edge)">${E(Ln.g)} →</text>
  <text x="0" y="${yb+20}" font-size="14" fill="var(--mute)">${E(Ln.d)}</text>
  <text x="0" y="${ym+5}" font-size="14" fill="var(--gold)">← ${E(Ln.m)}</text>
  <line x1="${x(0)}" y1="${yg}" x2="${x(6)}" y2="${yg}" stroke="var(--line)" stroke-width="3"/>
  <path class="s23-goods" d="M${x(0)} ${yg}H${x(6)}" pathLength="1" fill="none" stroke="var(--green-edge)" stroke-width="3"/>
  <rect x="${x(0)-30}" y="${yb}" width="${x(6)-x(0)+60}" height="34" fill="var(--surface)" stroke="var(--line)"/>
  <text x="${(x(0)+x(6))/2}" y="${yb+22}" text-anchor="middle" font-size="14" fill="var(--ink)">${E(Ln.sys)}</text>
  <line x1="${x(6)}" y1="${ym}" x2="${x(0)}" y2="${ym}" stroke="var(--line)" stroke-width="3"/>
  <path class="s23-money" d="M${x(6)} ${ym}H${x(0)+10}" pathLength="1" fill="none" stroke="var(--gold)" stroke-width="3"/>
  <path class="s23-mhead" d="M${x(0)+12} ${ym-7}L${x(0)} ${ym}L${x(0)+12} ${ym+7}" fill="none" stroke="var(--gold)" stroke-width="3"/>
  ${ml}${nodes}</svg>`}
function svgV(){const S=STAGES(),Ln=LANE(),y=i=>56+i*72,cx=28,mx=262,bx=296;
 const nodes=S.map((s,i)=>{const t=short(T(s.n[0],s.n[1]),20);return `<g class="s23-n" data-i="${i}">
  <line class="s23-tick" x1="${cx+18}" y1="${y(i)}" x2="${bx}" y2="${y(i)}" stroke="var(--mute)" stroke-width="1.2" stroke-dasharray="3 4" opacity=".7"/>
  <rect x="${cx+22}" y="${y(i)-20}" width="${mx-cx-34}" height="${t.length>1?44:26}" fill="var(--bg)"/>
  <circle cx="${cx}" cy="${y(i)}" r="16" fill="var(--bg)" stroke="var(--green-edge)" stroke-width="2"/><circle class="s23-fill" cx="${cx}" cy="${y(i)}" r="16" fill="var(--green)"/>
  <text x="${cx}" y="${y(i)+5}" text-anchor="middle" font-size="14" font-weight="600" fill="var(--ink)">${i+1}</text>
  ${t.map((l,k)=>`<text x="${cx+28}" y="${y(i)+5+k*18}" font-size="15" fill="var(--ink)">${E(l)}</text>`).join('')}</g>`}).join('');
 return `<svg class="s23-svg s23-v" viewBox="0 0 330 580" role="img" aria-labelledby="s23tv"><title id="s23tv">${L('The chain in seven steps, from the supplier to the customer’s home. Goods move forward, every step is recorded once in one Afya system, and money flows back from the customer to the supplier.','Mnyororo kwa hatua saba, kutoka kwa msambazaji hadi nyumbani kwa mteja. Bidhaa zinasonga mbele, kila hatua inarekodiwa mara moja katika mfumo mmoja wa Afya, na pesa zinarudi kutoka kwa mteja hadi kwa msambazaji.')}</title>
  <text x="${cx}" y="18" text-anchor="middle" font-size="13" fill="var(--green-edge)">${E(Ln.g)} ↓</text>
  <text x="${mx}" y="572" text-anchor="middle" font-size="13" fill="var(--gold)">${E(Ln.m)} ↑</text>
  <line x1="${cx}" y1="${y(0)}" x2="${cx}" y2="${y(6)}" stroke="var(--line)" stroke-width="3"/>
  <path class="s23-goods" d="M${cx} ${y(0)}V${y(6)}" pathLength="1" fill="none" stroke="var(--green-edge)" stroke-width="3"/>
  <line x1="${mx}" y1="${y(6)}" x2="${mx}" y2="${y(0)}" stroke="var(--line)" stroke-width="3"/>
  <path class="s23-money" d="M${mx} ${y(6)}V${y(0)+10}" pathLength="1" fill="none" stroke="var(--gold)" stroke-width="3"/>
  <path class="s23-mhead" d="M${mx-7} ${y(0)+12}L${mx} ${y(0)}L${mx+7} ${y(0)+12}" fill="none" stroke="var(--gold)" stroke-width="3"/>
  <rect x="${bx}" y="${y(0)-24}" width="28" height="${y(6)-y(0)+48}" fill="var(--surface)" stroke="var(--line)"/>
  <text transform="translate(${bx+19} ${(y(0)+y(6))/2}) rotate(-90)" text-anchor="middle" font-size="13" fill="var(--ink)">${E(Ln.sysS)}</text>
  ${nodes}</svg>`}

/* captions for the sticky stage: seven steps, then the money flowing back */
function capsHTML(){const S=STAGES();
 const one=(i,s)=>`<div class="s23-cap" data-k="${i}"><p class="s23-k">${L('Step','Hatua')} ${i+1} ${L('of','kati ya')} 7 · ${L(s.n[0],s.n[1])}</p>
  <dl><div><dt class="g">${L('Goods','Bidhaa')}</dt><dd>${L(s.g[0],s.g[1])}</dd></div><div><dt>${L('Data','Taarifa')}</dt><dd>${L(s.d[0],s.d[1])}</dd></div></dl></div>`;
 return S.map((s,i)=>one(i,s)).join('')+`<div class="s23-cap" data-k="7"><p class="s23-k">${L('And back: the money','Na kurudi: pesa')}</p>
  <dl><div><dt class="m">${L('Money','Pesa')}</dt><dd>${L('The customer pays first: at the till, online or on the monthly plan. That money pays the riders, the staff and the rent, the freight and fees, and finally the supplier. Every cost along the chain is recovered in a price the customer pays.','Mteja analipa kwanza: kaunta, mtandaoni au kwa mpango wa kila mwezi. Pesa hizo zinawalipa wasafirishaji, wafanyakazi na kodi ya pango, usafiri na ada, na mwishowe msambazaji. Kila gharama katika mnyororo inarudishwa kwenye bei anayolipa mteja.')}</dd></div></dl></div>`}

/* ---------- order simulator (planning rules; hours from MODEL) ---------- */
const ORD=[['walk','Walk-in','Kuingia dukani'],['cc','Click and collect','Agiza uchukue'],['sd','Same-day delivery','Usafirishaji wa siku hiyohiyo'],['box','Afya Box member','Mwanachama wa Afya Box'],['gift','Gift from abroad','Zawadi kutoka nje ya nchi']];
const hm=m=>{m=Math.round(m);return String(Math.floor(m/60)).padStart(2,'0')+':'+String(m%60).padStart(2,'0')};
const CUT=15*60;
function sim(k,t){const {open,close,hours}=M(),R=[],x=(a,e,s)=>R.push([a,L(e[0],e[1]),L(s[0],s[1])]);let v,w=false;
 if(k==='walk'){if(t<open||t>=close)return {R:[[hm(t),L('Store closed.','Duka limefungwa.'),L(`Opening hours are ${hours}, 7 days. Order in the app or on WhatsApp instead.`,`Saa za kufungua ni ${hours}, siku 7. Agiza kwenye programu au WhatsApp badala yake.`)]],v:T('Outside opening hours','Nje ya saa za kazi'),w:true};
  x(hm(t),['Arrive.','Fika.'],['A free check at the door in about 50 seconds if wanted; the Care Zones are visible from the entrance.','Kipimo cha bure mlangoni kwa takriban sekunde 50 ukipenda; Kanda za Huduma zinaonekana kutoka mlangoni.']);
  x(hm(t+1),['Found.','Imepatikana.'],['The right zone and shelf in under a minute.','Kanda na rafu sahihi chini ya dakika moja.']);
  x(hm(t+2),['Chosen.','Imechaguliwa.'],['Four to five brands side by side, one price range, a “best for” card.','Chapa nne hadi tano kando kwa kando, kiwango kimoja cha bei, kadi ya “inafaa kwa”.']);
  x(hm(t+2.5),['Paid.','Imelipwa.'],['Scan-and-go, self-checkout or the adviser’s handheld; receipt by text message.','Skani-na-uende, kujilipia mwenyewe au mashine ya mkononi ya mshauri; risiti kwa ujumbe mfupi.']);
  v=T('About 2½ minutes door to door, against a target of under 3 minutes','Takriban dakika 2½ kutoka mlangoni hadi kutoka, dhidi ya lengo la chini ya dakika 3')}
 else if(k==='cc'){x(hm(t),['Ordered','Imeagizwa'],['in the app or on WhatsApp, paid by mobile money.','kwenye programu au WhatsApp, imelipwa kwa pesa ya simu.']);
  if(t>=close-120||t<open-120){x(T('Next day','Kesho'),['Ready by 11:00 tomorrow:','Tayari kabla ya saa tano asubuhi kesho:'],['today’s collection window has closed.','muda wa kuchukua wa leo umekwisha.']);v=T('Ordered too late for today; ready by 11:00 tomorrow','Imeagizwa kuchelewa kwa leo; tayari kabla ya saa tano asubuhi kesho');w=true}
  else{const s=Math.max(t,open);x(hm(s+1),['Picker alerted','Mchukuaji amejulishwa'],['on the handheld; the batch that expires first is picked.','kwenye mashine ya mkononi; batch inayoisha kwanza inachukuliwa.']);x(hm(s+120),['Ready to collect','Tayari kuchukuliwa'],['at the counter; a collection code by text message.','kaunta; namba ya kuchukulia kwa ujumbe mfupi.']);v=T('Ready within 2 hours: target met','Tayari ndani ya saa 2: lengo limefikiwa')}}
 else if(k==='sd'){x(hm(t),['Ordered','Imeagizwa'],['and paid by mobile money.','na kulipwa kwa pesa ya simu.']);
  if(t<CUT&&t>=6*60){const s=Math.max(t,open);x(hm(s+20),['Picked and sealed','Imechukuliwa na kufungwa'],['in the packing area; a photo of the sealed bag.','eneo la upakiaji; picha ya mfuko uliofungwa.']);x(hm(s+45),['Rider assigned','Msafirishaji amepangwa'],['by zone; a live tracking link is sent.','kwa kanda; kiungo cha kufuatilia moja kwa moja kinatumwa.']);x(hm(Math.min(s+180,close)),['Delivered','Imefikishwa'],['with a photo or code at the door.','kwa picha au namba mlangoni.']);v=T('Paid before 15:00: delivered today','Imelipwa kabla ya saa tisa alasiri: inafika leo')}
  else{x(T('Tomorrow','Kesho'),['First round from 10:00.','Mzunguko wa kwanza kuanzia saa nne asubuhi.'],['Orders paid after 15:00 go out next morning; the customer is told at checkout.','Oda zilizolipwa baada ya saa tisa alasiri zinatoka asubuhi inayofuata; mteja anaambiwa wakati wa kulipa.']);v=T('After the 15:00 cut-off: next-day delivery','Baada ya muda wa mwisho wa saa tisa alasiri: inafika kesho');w=true}}
 else if(k==='box'){x(T('Day −12','Siku −12'),['Reminder','Ukumbusho'],['by text message, WhatsApp, email or phone: keep the box or swap brands.','kwa ujumbe mfupi, WhatsApp, barua pepe au simu: baki na boksi au badilisha chapa.']);
  x(T('Day −12 to 0','Siku −12 hadi 0'),['Choice window.','Muda wa kuchagua.'],['Swaps are free and at the same price; after the window the list locks.','Kubadilisha ni bure na kwa bei ileile; baada ya muda huo orodha inafungwa.']);
  x(T('Packing day','Siku ya upakiaji'),['Packed from the locked list,','Linapakiwa kutoka orodha iliyofungwa,'],['photographed and sealed; the stock was reserved in advance.','linapigwa picha na kufungwa; stoo ilitengwa mapema.']);
  x(T('Box day','Siku ya boksi'),['Delivered','Linafikishwa'],['on the member’s fixed day; the monthly payment is requested on the plan.','siku maalum ya mwanachama; malipo ya mwezi yanaombwa kwa mujibu wa mpango.']);
  x(T('Day +1','Siku +1'),['Aftercare:','Huduma baada ya mauzo:'],['points and the next check date appear in the app.','pointi na tarehe ya kipimo kijacho zinaonekana kwenye programu.']);v=T('No action needed from the member; the time of day does not matter','Mwanachama hahitaji kufanya chochote; saa ya siku haijalishi')}
 else{x(hm(t),['Chosen and paid','Imechaguliwa na kulipwa'],['abroad by international card, with a message.','nje ya nchi kwa kadi ya kimataifa, pamoja na ujumbe.']);x(hm(t+2),['Confirmed','Imethibitishwa'],['within 2 minutes; the family at home is told by text message.','ndani ya dakika 2; familia nyumbani inajulishwa kwa ujumbe mfupi.']);
  if(t<CUT&&t>=6*60){x(hm(Math.min(Math.max(t,open)+180,close)),['Delivered today','Imefika leo'],['in Dar es Salaam; a photo is sent to the sender.','Dar es Salaam; picha inatumwa kwa aliyetuma.']);v=T('Paid in under 2 minutes, delivered today','Imelipwa chini ya dakika 2, imefika leo')}
  else{x(T('Tomorrow','Kesho'),['Delivered next day','Inafika kesho'],['in the first round; a photo is sent to the sender.','katika mzunguko wa kwanza; picha inatumwa kwa aliyetuma.']);v=T('Paid in under 2 minutes, delivered tomorrow','Imelipwa chini ya dakika 2, inafika kesho');w=true}}
 return {R,v,w}}

/* ---------- costs and payers (MODEL) ---------- */
function costTable(){const {I,B,lean,feeMin,feeMax}=M(),gm=Math.round(I.store.retail_gm*100)+'%';
 const rows=[
  [['Supplier','Msambazaji'],['Product cost','Gharama ya bidhaa'],['The one shelf price','Bei moja ya rafu'],`${gm} ${L('retail gross margin','faida ghafi ya rejareja')}`],
  [['Port and clearance','Bandari na forodha'],['Freight, duties, PVoC and TMDA fees, clearing','Usafiri, ushuru, ada za PVoC na TMDA, forodha'],['Landed cost inside the shelf price','Gharama ya kufikisha ndani ya bei ya rafu'],L('Inside the same margin; agent quote pending','Ndani ya faida ileile; nukuu ya wakala inasubiriwa')],
  [['Goods-in and stock','Kupokea mzigo na stoo'],['Shrink and expiry','Upotevu na bidhaa zilizoisha muda'],['Retail margin, kept small by first-expiry-first-out','Faida ya rejareja, inawekwa ndogo kwa kanuni ya kinachoisha kwanza'],`${L('Allowance within','Kiasi ndani ya')} ${gm}`],
  [['Store and packing','Duka na upakiaji'],['Box, packing and delivery','Boksi, upakiaji na usafirishaji'],['Charged at cost in the box price','Inatozwa kwa gharama halisi ndani ya bei ya boksi'],`${A().numHTML('s23-pd',I.members.packing_delivery_in_price,'tsh')} ${L('per box','kwa kila boksi')}`],
  [['Store and packing','Duka na upakiaji'],['Staff, rent, systems, utilities','Wafanyakazi, kodi ya pango, mifumo, huduma'],['Shelf and box prices','Bei za rafu na za boksi'],`${A().numHTML('s23-opex',B.opex_month,'tshM')} ${L('a month','kwa mwezi')}`],
  [['Delivery with proof','Usafirishaji wenye uthibitisho'],lean?['Partner rider, paid per order','Msafirishaji mshirika, analipwa kwa kila oda']:['Salaried rider cost per order','Gharama ya msafirishaji wa mshahara kwa kila oda'],['Delivery fee online; box price for members','Ada ya usafirishaji mtandaoni; bei ya boksi kwa wanachama'],`${L('Fee','Ada')} ${A().numHTML('s23-fee',I.online.delivery_fee,'tsh')} · ${L('cost','gharama')} ${A().numHTML('s23-rider',I.online.rider_cost_per_order,'tsh')}`],
  [['The customer’s home','Nyumbani kwa mteja'],['Adviser time, warranty handling','Muda wa mshauri, kushughulikia dhamana'],['Margin and membership card fees','Faida na ada za kadi za uanachama'],`${L('Cards','Kadi')} TSh ${nf(feeMin)}–${nf(feeMax)} ${L('a year','kwa mwaka')}`]];
 return `<div class="ab-tw"><table class="ab-t"><thead><tr><th>${L('Stage','Hatua')}</th><th>${L('Cost it creates','Gharama inayozalisha')}</th><th>${L('Recovered by','Inarudishwa na')}</th><th>${L('Model value','Thamani ya modeli')}</th></tr></thead><tbody>
  ${rows.map(r=>`<tr><td>${L(r[0][0],r[0][1])}</td><td>${L(r[1][0],r[1][1])}</td><td>${L(r[2][0],r[2][1])}</td><td class="ab-n">${r[3]}</td></tr>`).join('')}</tbody></table></div>`}
function figs(){const {I,B}=M(),mem=B.months[11].members,ord=I.online.orders_day_m12*30,src=L('Financial model v1.2, base case, month 12','Modeli ya fedha v1.2, hali ya msingi, mwezi 12');
 return A().figsHTML([
  {v:`${A().numHTML('s23-mem',mem,'int')} ${est()}`,l:T('Afya Boxes packed and delivered each month by month 12','Afya Box zinazopakiwa na kufikishwa kila mwezi ifikapo mwezi 12'),s:src},
  {v:`${A().numHTML('s23-pdm',mem*I.members.packing_delivery_in_price,'tshM')} ${est()}`,l:T('Packing and delivery paid inside box prices, each month','Upakiaji na usafirishaji unaolipwa ndani ya bei za boksi, kila mwezi'),s:src},
  {v:`${A().numHTML('s23-ord',ord,'int')} ${est()}`,l:T('Online orders each month by month 12','Oda za mtandaoni kila mwezi ifikapo mwezi 12'),s:src},
  {v:`${A().numHTML('s23-net',ord*(I.online.delivery_fee-I.online.rider_cost_per_order),'tsh')} ${est()}`,l:T('Delivery fees left after rider cost, each month','Ada za usafirishaji zinazobaki baada ya gharama ya msafirishaji, kila mwezi'),s:src}])}

const CSS=`
.s23 figure{margin:0}
.s23 .ab-block p,.s23 .ab-body p{max-width:var(--measure)}
.s23 .ab-block>h2+*{margin-top:var(--s2)}
.s23 .ab-block>*+p,.s23 .ab-block>*+.ab-tw,.s23 .ab-block>*+ul,.s23 .ab-block>*+ol,.s23 .ab-block>*+div{margin-top:var(--s2)}
.s23 h3{font-size:var(--fs-sub);font-weight:600}
.s23 .s23-cap-s,.s23 figcaption{color:var(--mute);font-size:var(--fs-cap);max-width:var(--measure)}
.s23 .s23-scroll{position:relative;height:280vh}
.s23 .s23-scroll>figcaption{position:absolute;bottom:0;left:0}
.s23 .s23-stage{position:sticky;top:calc(var(--bar-h) + env(safe-area-inset-top,0px));height:calc(100vh - var(--bar-h));height:calc(100dvh - var(--bar-h));display:flex;flex-direction:column;justify-content:center;gap:var(--s2);padding:var(--s2) 0}
.s23 .s23-svg{display:block;width:100%;height:auto}
.s23 .s23-v{display:none;max-width:420px;max-height:52vh;max-height:52dvh;margin:0 auto}
.s23 .s23-goods,.s23 .s23-money{stroke-dasharray:1 1}
.s23 .s23-n{opacity:.3}.s23 .s23-n.on{opacity:1}
.s23 .s23-fill{opacity:0}.s23 .s23-n.cur .s23-fill{opacity:1}
.s23 .s23-ml,.s23 .s23-mhead{opacity:0}
.s23 .s23-caps{position:relative;min-height:150px;border-top:1px solid var(--line);padding-top:var(--s2)}
.s23 .s23-cap{display:none}.s23 .s23-cap.on{display:block}
.s23 .s23-k{color:var(--gold);font-weight:600;margin:0}
.s23 .s23-cap dl{margin:8px 0 0;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:var(--s3)}
.s23 .s23-cap dt{font-size:var(--fs-cap);color:var(--mute)}.s23 .s23-cap dt.g{color:var(--green-edge)}.s23 .s23-cap dt.m{color:var(--gold)}
.s23 .s23-cap dd{margin:4px 0 0;font-size:calc(var(--fs-body) - 1px);max-width:var(--measure)}
.s23 .s23-cap[data-k="7"] dl{grid-template-columns:1fr}
.s23 .s23-track{height:3px;background:var(--line)}.s23 .s23-track i{display:block;height:3px;width:0;background:var(--gold)}
.s23.s23-static .s23-scroll{height:auto}
.s23.s23-static .s23-stage{position:static;height:auto}
.s23.s23-static .s23-caps,.s23.s23-static .s23-track{display:none}
.s23 .s23-pil{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--s2)}
.s23 .s23-pil div{border-top:2px solid var(--green-edge);padding-top:var(--s1)}
.s23 .s23-pil b{display:block;font-weight:600}.s23 .s23-pil p{margin:6px 0 0;font-size:calc(var(--fs-body) - 1px)}
.s23 .s23-st dl{display:grid;grid-template-columns:auto minmax(0,1fr);gap:4px var(--s2);margin:8px 0 0;font-size:calc(var(--fs-body) - 2px)}
.s23 .s23-st dt{color:var(--mute)}.s23 .s23-st dd{margin:0}
.s23 .s23-st span{display:block}
.s23 ul.s23-ul{margin:0;padding-left:20px}.s23 ul.s23-ul li+li{margin-top:8px}
.s23 .s23-sim{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.3fr);gap:var(--s3);margin-top:var(--s2)}
.s23 .s23-in,.s23 .s23-out{border:1px solid var(--line);background:var(--surface);padding:var(--s3)}
.s23 .s23-in .ab-seg{flex-wrap:wrap}
.s23 .s23-in label{display:block;margin-top:var(--s3)}
.s23 .s23-in output{color:var(--gold);font-weight:600;font-variant-numeric:tabular-nums;margin-left:8px}
.s23 .s23-in input[type=range]{width:100%;margin-top:8px;accent-color:var(--green-edge)}
.s23 .s23-tl{list-style:none;margin:0;padding:0}
.s23 .s23-tl li{display:grid;grid-template-columns:96px minmax(0,1fr);gap:var(--s2);padding:10px 0;border-bottom:1px solid var(--line)}
.s23 .s23-tl time{color:var(--gold);font-variant-numeric:tabular-nums}
.s23 .s23-tl b{font-weight:600}
.s23 .s23-ver{margin-top:var(--s2);border-left:2px solid var(--green-edge);padding-left:var(--s2)}
.s23 .s23-ver.w{border-left-color:var(--gold)}
.s23 .s23-once{list-style:none;margin:var(--s2) 0 0;padding:0;border-top:1px solid var(--line)}
.s23 .s23-once li{display:grid;grid-template-columns:96px minmax(0,1fr);gap:var(--s2);padding:10px 0;border-bottom:1px solid var(--line)}
.s23 .s23-once span{color:var(--gold);font-variant-numeric:tabular-nums}
@media (max-width:860px){.s23 .s23-sim,.s23 .s23-pil{grid-template-columns:1fr}}
@media (max-width:720px){
 .s23 .s23-h{display:none}.s23 .s23-v{display:block}
 .s23 .s23-cap dl{grid-template-columns:1fr;gap:6px}
 .s23 .s23-cap dd{font-size:var(--fs-cap)}
 .s23 .s23-cap dl>div:nth-child(2){display:none}
 .s23 .s23-k{font-size:15px}
 .s23 .s23-caps{min-height:120px}
 .s23 .s23-tl li,.s23 .s23-once li{grid-template-columns:72px minmax(0,1fr)}
}
@media (prefers-reduced-motion:reduce){.s23 .s23-scroll{height:auto}.s23 .s23-stage{position:static;height:auto}.s23 .s23-caps,.s23 .s23-track{display:none}}`;

function render(s,p,pv,nx){const {I,lean,hours}=M(),S=STAGES();
 const FX=2642.5,lo=Math.round(250*FX),hi=Math.round(5000*FX);
 return `<article class="ab-sec s23" aria-labelledby="h-s2-3"><style>${CSS}</style><div class="ab-wrap">
 <div class="ab-sec-no">${E(s.no)}</div><h1 id="h-s2-3">${E(s.title)}</h1>
 <p class="ab-summary">${L('Every product follows the same chain: bought from a registered maker, checked before it ships, cleared at the port, scanned once at goods-in, picked first-expiry-first-out, sold or packed in the store, delivered with proof and followed up at home. Goods move forward, money flows back, and every step is recorded once in one system. This section shows the chain, the rules that keep it legal, what each step costs and who pays for it.','Kila bidhaa inafuata mnyororo uleule: inanunuliwa kwa mtengenezaji aliyesajiliwa, inakaguliwa kabla ya kusafirishwa, inapitishwa forodha bandarini, inaskaniwa mara moja inapopokelewa, inachukuliwa kwa kanuni ya kinachoisha kwanza kinatoka kwanza, inauzwa au kupakiwa dukani, inafikishwa kwa uthibitisho na kufuatiliwa nyumbani. Bidhaa zinasonga mbele, pesa zinarudi nyuma, na kila hatua inarekodiwa mara moja katika mfumo mmoja. Sehemu hii inaonyesha mnyororo, kanuni zinazoufanya uwe halali, gharama ya kila hatua na nani anailipa.')}</p>

 <figure class="ab-visual s23-scroll" id="s23Box" aria-label="${L('The chain, step by step','Mnyororo, hatua kwa hatua')}">
  <div class="s23-stage">
   ${svgH()}${svgV()}
   <div class="s23-track" aria-hidden="true"><i id="s23Prog"></i></div>
   <div class="s23-caps" id="s23Caps" aria-live="polite">${capsHTML()}</div>
  </div>
  <figcaption>${L('Scroll to move along the chain. Goods move forward, data is recorded once at every step, money flows back from the customer.','Sogeza ukurasa kufuata mnyororo. Bidhaa zinasonga mbele, taarifa zinarekodiwa mara moja kila hatua, pesa zinarudi kutoka kwa mteja.')}</figcaption>
 </figure>

 <div class="ab-body">
 <section class="ab-block"><h2>${L('Where health supply chains fail','Mahali minyororo ya bidhaa za afya inaposhindwa')}</h2>
  <ul class="s23-ul">
   <li>${T(`<b>Unchecked products reach the shelf.</b> In September 2026 TMDA seized products worth about TSh 300 million in Dar es Salaam, including medicines imported without registration${cite(1)}. Worldwide, about one medical product in ten in developing countries is substandard or falsified${cite(2)}.`,`<b>Bidhaa zisizokaguliwa zinafika rafuni.</b> Septemba 2026 TMDA ilikamata bidhaa zenye thamani ya takriban TSh milioni 300 jijini Dar es Salaam, zikiwemo dawa zilizoingizwa bila usajili${cite(1)}. Duniani, takriban bidhaa moja kati ya kumi za kitiba katika nchi zinazoendelea ni duni au za kughushi${cite(2)}.`)}</li>
   <li>${T('<b>Expired stock goes unnoticed.</b> Without batch and expiry tracking, a shop sells the newest carton first and finds the old one when it is too late.','<b>Stoo iliyoisha muda haionekani.</b> Bila kufuatilia batch na tarehe ya mwisho, duka linauza katoni mpya kwanza na kuigundua ya zamani wakati umeshachelewa.')}</li>
   <li>${T('<b>Shelves run empty.</b> Reorders made from memory arrive after the last unit is sold, and the customer goes elsewhere.','<b>Rafu zinakuwa tupu.</b> Maagizo ya kurudia yanayofanywa kwa kumbukumbu ya kichwani yanafika baada ya kipande cha mwisho kuuzwa, na mteja anaenda kwingine.')}</li>
   <li>${T('<b>Recalls cannot be traced.</b> When a supplier recalls a batch, most shops cannot say who bought it.','<b>Urejeshaji haufuatiliki.</b> Msambazaji anaporejesha batch, maduka mengi hayawezi kusema nani aliinunua.')}</li>
  </ul>
  <h3>${L('Three operating rules','Kanuni tatu za uendeshaji')}</h3>
  <div class="s23-pil">
   <div><b>${L('Registered in, traced out','Imesajiliwa kuingia, inafuatiliwa kutoka')}</b><p>${L('Nothing enters stock without its registration, batch and expiry captured. From then on every unit can be traced to the customer who bought it.','Hakuna kinachoingia stoo bila usajili, batch na tarehe ya mwisho kurekodiwa. Kuanzia hapo kila kipande kinaweza kufuatiliwa hadi kwa mteja aliyekinunua.')}</p></div>
   <div><b>${L('The system issues the reminders','Mfumo unatoa vikumbusho')}</b><p>${L('Reorder points, expiry dates, box renewals and licence renewals all raise alerts, so a small team does not rely on memory.','Viwango vya kuagiza upya, tarehe za mwisho, kuhuisha maboksi na kuhuisha leseni vyote vinatoa tahadhari, hivyo timu ndogo haitegemei kumbukumbu.')}</p></div>
   <div><b>${L('Every cost has a payer','Kila gharama ina mlipaji')}</b><p>${L('Each step’s cost is recovered in a price the customer pays: the shelf price, the box price or the delivery fee.','Gharama ya kila hatua inarudishwa kwenye bei anayolipa mteja: bei ya rafu, bei ya boksi au ada ya usafirishaji.')}</p></div>
  </div>
 </section>

 <section class="ab-block"><h2>${L('The seven steps in full','Hatua saba kwa ukamilifu')}</h2>
  <ol class="ab-timeline s23-st">${S.map((x,i)=>`<li><b>${i+1}. ${L(x.n[0],x.n[1])}</b><span>${L(x.g[0],x.g[1])}</span>
   <dl><dt>${L('Money','Pesa')}</dt><dd>${L(x.m[0],x.m[1])}</dd><dt>${L('Data','Taarifa')}</dt><dd>${L(x.d[0],x.d[1])}</dd><dt>${L('Who','Nani')}</dt><dd>${L(x.who[0],x.who[1])}</dd><dt>${L('Time target','Lengo la muda')}</dt><dd>${L(x.time[0],x.time[1])}</dd></dl></li>`).join('')}</ol>
 </section>

 <section class="ab-block"><h2>${L('Which regulator, for which product','Mdhibiti yupi, kwa bidhaa ipi')}</h2>
  <p>${T(`Since 1 July 2019 cosmetics and food are regulated by the Tanzania Bureau of Standards (TBS); the Tanzania Medicines and Medical Devices Authority (TMDA) regulates medicines and medical devices${cite(3)}. Afya handles the first three groups below. Medicines are a fourth group that Afya never buys, imports or sells: they are sold only by the licensed partner pharmacy, whose premises are licensed by the Pharmacy Council${cite(8)}.`,`Tangu 1 Julai 2019 vipodozi na chakula vinadhibitiwa na Shirika la Viwango Tanzania (TBS); Mamlaka ya Dawa na Vifaa Tiba Tanzania (TMDA) inadhibiti dawa na vifaa tiba${cite(3)}. Afya inashughulikia makundi matatu ya kwanza hapa chini. Dawa ni kundi la nne ambalo Afya kamwe hainunui, haiingizi wala haiuzi: zinauzwa na famasia mshirika yenye leseni pekee, ambayo majengo yake yamepewa leseni na Baraza la Famasia${cite(8)}.`)}</p>
  <div class="ab-tw"><table class="ab-t"><thead><tr><th>${L('Products','Bidhaa')}</th><th>${L('Regulator','Mdhibiti')}</th><th>${L('What it means at the port','Inamaanisha nini bandarini')}</th></tr></thead><tbody>
   <tr><td>${L('Cosmetics, skin and baby care; food and nutrition','Vipodozi, utunzaji wa ngozi na wa mtoto; chakula na lishe')}</td><td>TBS</td><td>${T(`A pre-shipment certificate of conformity (PVoC) before the goods leave the factory: 0.5% of the factory price, at least US$250 and at most US$5,000 a shipment${cite(4)}, or TSh ${nf(lo)}–${nf(hi)} at US$1 = TSh 2,642.50 (BoT, 10 Nov 2026)${cite(10)}. Food must arrive with at least 75% of its shelf life left, other goods 50%${cite(7)}.`,`Cheti cha ulinganifu kabla ya kusafirishwa (PVoC) kabla bidhaa hazijaondoka kiwandani: 0.5% ya bei ya kiwandani, angalau US$250 na isiyozidi US$5,000 kwa kila mzigo${cite(4)}, au TSh ${nf(lo)}–${nf(hi)} kwa US$1 = TSh 2,642.50 (BoT, 10 Nov 2026)${cite(10)}. Chakula lazima kifike kikiwa na angalau 75% ya muda wake wa matumizi, bidhaa nyingine 50%${cite(7)}.`)}</td></tr>
   <tr><td>${L('Nappies, sanitary pads, incontinence pads','Nepi, pedi za hedhi, pedi za kushindwa kujizuia')}</td><td>${L('TBS, and possibly TMDA','TBS, na huenda TMDA')}</td><td>${L('Compulsory TBS standards, so a PVoC certificate either way; TMDA lists them as products that may be medical devices.','Viwango vya lazima vya TBS, hivyo cheti cha PVoC kwa vyovyote vile; TMDA inaviorodhesha kama bidhaa zinazoweza kuwa vifaa tiba.')}</td></tr>
   <tr><td>${L('Medical devices: monitors, thermometers, self-tests, dressings, supports','Vifaa tiba: vipimo, vipima joto, vipimo vya kujipima, bendeji, vifaa vya kusaidia')}</td><td>TMDA</td><td>${T(`A TMDA import permit presented with the shipping papers${cite(6)}, and an import fee of 2% of the factory price${cite(5)}. Each model must be registered or notified with TMDA.`,`Kibali cha TMDA cha kuingiza kinachowasilishwa pamoja na nyaraka za usafirishaji${cite(6)}, na ada ya kuingiza ya 2% ya bei ya kiwandani${cite(5)}. Kila aina lazima isajiliwe au itaarifiwe TMDA.`)}</td></tr>
   <tr><td>${L('Medicines','Dawa')}</td><td>${L('TMDA and the Pharmacy Council','TMDA na Baraza la Famasia')}</td><td>${L('Not Afya’s chain. The partner pharmacy buys, stores and sells its own medicines under its own licence.','Si mnyororo wa Afya. Famasia mshirika inanunua, inahifadhi na kuuza dawa zake yenyewe chini ya leseni yake.')}</td></tr>
  </tbody></table></div>
  <p>${L('At launch most lines are bought already registered from local distributors, which keeps the first months simple; Afya registers products in its own name in a later phase. Section 4.5 sets out every licence, registration and fee.','Wakati wa uzinduzi bidhaa nyingi zinanunuliwa zikiwa tayari zimesajiliwa kutoka kwa wasambazaji wa ndani, jambo linalorahisisha miezi ya kwanza; Afya inasajili bidhaa kwa jina lake katika awamu inayofuata. Sehemu ya 4.5 inaeleza kila leseni, usajili na ada.')}</p>
 </section>

 <section class="ab-block"><h2>${L('Record once: one sale, six updates','Rekodi mara moja: mauzo moja, masasisho sita')}</h2>
  <p>${L('A father buys a box of glucose test strips in the morning. One scan at the till triggers each of these updates.','Baba ananunua boksi la vipande vya kupimia sukari asubuhi. Skani moja kaunta inasababisha kila moja ya masasisho haya.')} ${exm()}</p>
  <ul class="s23-once">
   <li><span>10:42:01</span><div>${T('<b>Stock down by one</b> on the shelf count and in the app, so online never oversells.','<b>Stoo inapungua kwa kimoja</b> kwenye hesabu ya rafu na kwenye programu, hivyo mtandaoni hakuuzwi zaidi ya kilichopo.')}</div></li>
   <li><span>10:42:01</span><div>${T('<b>Reorder check:</b> stock has fallen below its reorder point, so a purchase order is drafted for approval.','<b>Ukaguzi wa kuagiza upya:</b> stoo imeshuka chini ya kiwango cha kuagiza upya, hivyo oda ya ununuzi inaandaliwa kwa idhini.')}</div></li>
   <li><span>10:42:01</span><div>${T('<b>Member points</b> added to his account, found by his phone number.','<b>Pointi za mwanachama</b> zinaongezwa kwenye akaunti yake, inayopatikana kwa namba yake ya simu.')}</div></li>
   <li><span>10:42:02</span><div>${T(`<b>Fiscal receipt</b> issued and sent by text message${cite(9)}.`,`<b>Risiti ya kodi</b> inatolewa na kutumwa kwa ujumbe mfupi${cite(9)}.`)}</div></li>
   <li><span>10:42:02</span><div>${T('<b>Batch linked</b> to his purchase, ready for any recall.','<b>Batch inaunganishwa</b> na ununuzi wake, tayari kwa urejeshaji wowote.')}</div></li>
   <li><span>${L('After closing','Baada ya kufunga')}</span><div>${T('<b>Daily report:</b> the sale appears in the founders’ end-of-day summary on WhatsApp.','<b>Ripoti ya siku:</b> mauzo yanaonekana kwenye muhtasari wa mwisho wa siku wa waanzilishi kwenye WhatsApp.')}</div></li>
  </ul>
 </section>

 <section class="ab-block"><h2>${L('Follow one order','Fuatilia oda moja')}</h2>
  <p>${L(`Choose an order type and a time of order. The timeline shows each step and whether the service target is met. Store hours are ${hours}; paid orders before 15:00 are delivered the same day, and click and collect is ready within 2 hours.`,`Chagua aina ya oda na saa ya kuagiza. Mstari wa muda unaonyesha kila hatua na kama lengo la huduma limefikiwa. Saa za duka ni ${hours}; oda zilizolipwa kabla ya saa tisa alasiri zinafikishwa siku hiyohiyo, na oda ya kuchukua dukani inakuwa tayari ndani ya saa 2.`)} ${prule()}</p>
  <div class="s23-sim">
   <div class="s23-in">
    <div class="ab-seg" role="group" aria-label="${L('Order type','Aina ya oda')}" id="s23Ord">${ORD.map((o,i)=>`<button type="button" data-k="${o[0]}" aria-pressed="${i===2}">${L(o[1],o[2])}</button>`).join('')}</div>
    <label for="s23Time">${L('Time of order','Saa ya kuagiza')}<output id="s23Out">11:20</output></label>
    <input type="range" id="s23Time" min="420" max="1320" step="5" value="680">
   </div>
   <div class="s23-out" aria-live="polite"><ol class="s23-tl" id="s23Tl"></ol><p class="s23-ver" id="s23Ver"></p></div>
  </div>
 </section>
 </div>

 <section class="ab-block"><h2>${L('Key figures','Takwimu kuu')}</h2>${figs()}</section>

 <section class="ab-block"><h2>${L('What this costs, and who pays','Gharama yake, na nani analipa')}</h2>
  <p>${L('The cost each step creates and the part of the price that recovers it from the customer. Values come from the financial model and follow the funding option selected at the top of the page.','Gharama ambayo kila hatua inazalisha na sehemu ya bei inayoirudisha kutoka kwa mteja. Thamani zinatoka kwenye modeli ya fedha na zinafuata chaguo la ufadhili lililochaguliwa juu ya ukurasa.')} ${est()}</p>
  ${costTable()}
 </section>

 <section class="ab-block"><h2>${L('Risks and our answer','Hatari na jibu letu')}</h2>
  <div class="ab-tw"><table class="ab-t"><thead><tr><th>${L('Risk','Hatari')}</th><th>${L('Our answer','Jibu letu')}</th></tr></thead><tbody>
   <tr><td>${L('A shipment is held at the port or a certificate is late.','Mzigo unazuiliwa bandarini au cheti kinachelewa.')}</td><td>${L('Reorder points include a lead-time buffer, the range avoids single-source items, and the clearing agent prepares the certificate and permit before the goods land.','Viwango vya kuagiza upya vina akiba ya muda wa kusubiri, bidhaa hazitegemei chanzo kimoja, na wakala wa forodha anaandaa cheti na kibali kabla mzigo haujafika.')}</td></tr>
   <tr><td>${L('A new brand is not yet registered.','Chapa mpya bado haijasajiliwa.')}</td><td>${L(`It does not enter the range until it is. With ${I.brands_per_item} registered brands for each item, the shelf is not left empty.`,`Haiingii kwenye bidhaa zetu hadi isajiliwe. Kwa chapa ${I.brands_per_item} zilizosajiliwa kwa kila bidhaa, rafu haibaki tupu.`)}</td></tr>
   <tr><td>${L('Expired or near-expiry stock.','Stoo iliyoisha au inayokaribia kuisha muda.')}</td><td>${L('Expiry is captured at goods-in, first-expiry-first-out picking is enforced by the handheld, and near-expiry alerts reach the store lead weeks ahead.','Tarehe ya mwisho inarekodiwa wakati wa kupokea, uchukuaji wa kinachoisha kwanza unasimamiwa na mashine ya mkononi, na tahadhari zinamfikia msimamizi wa duka wiki kadhaa kabla.')}</td></tr>
   <tr><td>${L('The internet fails or a rider is unavailable.','Mtandao unakatika au msafirishaji hapatikani.')}</td><td>${L('The till keeps selling offline and catches up later. Deliveries are reassigned to another rider, and the customer is told before a promise is missed.','Kaunta inaendelea kuuza bila mtandao na kusawazisha baadaye. Usafirishaji unapangiwa msafirishaji mwingine, na mteja anaambiwa kabla ahadi haijavunjwa.')}</td></tr>
  </tbody></table></div>
 </section>

 ${A().openHTML([
  L('A written quote from a licensed clearing agent for a 20-foot container, and freight quotes, are still to come; until then the landed cost is a planning estimate (section 4.2).','Nukuu ya maandishi kutoka kwa wakala wa forodha mwenye leseni kwa kontena la futi 20, na nukuu za usafiri, bado zinasubiriwa; hadi hapo gharama ya kufikisha ni makadirio ya mipango (sehemu ya 4.2).'),
  L('TMDA’s written view on whether nappies and pads are treated as medical devices.','Maoni ya maandishi ya TMDA kuhusu kama nepi na pedi zinachukuliwa kama vifaa tiba.'),
  L('Whether monthly member payments can be collected automatically by mobile-money mandate is being confirmed with the operators; until then members receive a payment request with reminders.','Kama malipo ya kila mwezi ya wanachama yanaweza kukusanywa moja kwa moja kwa idhini ya pesa ya simu kunathibitishwa na kampuni za simu; hadi hapo wanachama wanapokea ombi la malipo pamoja na vikumbusho.'),
  L('The service targets (same-day cut-off, 2-hour collection, reply times, walk-in time) are planning rules, to be tested in the pre-opening trial.','Malengo ya huduma (muda wa mwisho wa siku hiyohiyo, kuchukua ndani ya saa 2, muda wa kujibu, muda wa kununua dukani) ni kanuni za mipango, zitakazojaribiwa kabla ya ufunguzi.'),
  L('A film of the chain in ten steps exists, but it is not shown here: its narration describes registration before the TBS and TMDA split was confirmed, and every frame still has to be checked against the no-faces rule. It will be re-cut and shown once both are done.','Filamu ya mnyororo kwa hatua kumi ipo, lakini haionyeshwi hapa: masimulizi yake yanaeleza usajili kabla mgawanyo wa TBS na TMDA haujathibitishwa, na kila picha yake bado inapaswa kukaguliwa dhidi ya kanuni ya kutoonyesha nyuso. Itahaririwa upya na kuonyeshwa mambo yote mawili yakikamilika.')])}

 <div id="abSrc">${A().sourcesHTML(SRC())}</div>
 ${A().pagerHTML(pv,nx)}
 </div></article>`}

/* ---------- interactions ---------- */
let onScroll=null;
function wireFlow(){const box=document.getElementById('s23Box');if(!box)return;
 const art=box.closest('.s23'),reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const goods=[...box.querySelectorAll('.s23-goods')],money=[...box.querySelectorAll('.s23-money')],heads=[...box.querySelectorAll('.s23-mhead,.s23-ml')];
 const nodes=[...box.querySelectorAll('.s23-n')],caps=[...box.querySelectorAll('.s23-cap')],prog=document.getElementById('s23Prog');
 const paint=p=>{const g=Math.min(1,p/0.78),m=Math.min(1,Math.max(0,(p-0.8)/0.18)),reach=g*6;
  goods.forEach(el=>el.style.strokeDashoffset=(1-g).toFixed(4));money.forEach(el=>el.style.strokeDashoffset=(1-m).toFixed(4));
  heads.forEach(el=>el.style.opacity=m>=0.98?'1':el.classList.contains('s23-ml')?Math.min(1,m*1.4).toFixed(2):'0');
  const cur=p>=0.8?7:Math.min(6,Math.round(reach));
  nodes.forEach(n=>{const i=+n.dataset.i;n.classList.toggle('on',i<=reach+0.02||p>=0.8);n.classList.toggle('cur',p<0.8&&i===cur)});
  caps.forEach(c=>c.classList.toggle('on',+c.dataset.k===cur));if(prog)prog.style.width=(p*100).toFixed(1)+'%'};
 if(reduce){art.classList.add('s23-static');paint(1);return}
 const update=()=>{const r=box.getBoundingClientRect(),total=Math.max(1,box.offsetHeight-innerHeight);paint(Math.min(1,Math.max(0,-r.top/total)))};
 if(onScroll){removeEventListener('scroll',onScroll);removeEventListener('resize',onScroll)}
 onScroll=update;addEventListener('scroll',update,{passive:true});addEventListener('resize',update);
 addEventListener('afya:leave',()=>{removeEventListener('scroll',update);removeEventListener('resize',update);onScroll=null},{once:true});
 update()}
function wireSim(){const g=document.getElementById('s23Ord'),tr=document.getElementById('s23Time');if(!g||!tr)return;let k='sd';
 const run=()=>{const t=+tr.value;document.getElementById('s23Out').textContent=hm(t);const r=sim(k,t);
  document.getElementById('s23Tl').innerHTML=r.R.map(x=>`<li><time>${E(x[0])}</time><div><b>${x[1]}</b> ${x[2]}</div></li>`).join('');
  const v=document.getElementById('s23Ver');v.textContent=r.v;v.classList.toggle('w',r.w)};
 g.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{g.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));k=b.dataset.k;tr.disabled=k==='box';run()}));
 tr.addEventListener('input',run);run()}
function init(){wireFlow();wireSim()}

window.SECTIONS['s2-3']={render,init,v2:true};
})();
