/* 5.2 Partners and services · v2 on the D2 template.
   The partner model (brief B19): the licensed partner pharmacy for every medicine; clinics, nurses, laboratories;
   pest-control, fire-safety and first-aid training companies for businesses and hotels (R7, R8).
   Service prices are read from window.AFYA_DATA.services (built from data/services.json): walk-in prices are planning
   estimates except where a source is linked; partner price = 70% of walk-in, member fee = partner price × 1.25 (D4).
   Business and hotel package prices are computed here with the D4 rule over AFYA_DATA (as in 3.5); "what they pay now"
   uses the model's small-shop mark-up and trips (estimates). Model figures follow the funding switch (AB.numHTML).
   No partner is signed. The old 1–5 partner scores are not carried over (they were not data). */
(function(){
'use strict';
const A=()=>window.AB,T=(e,s)=>A().T(e,s),E=s=>A().E(s),N=(k,v,f)=>A().numHTML(k,v,f),D4=()=>window.AFYA_D4;
const DATA=()=>window.AFYA_DATA||{boxes:{},services:[]};
const sw=()=>window.AFYA_LANG==='sw';
const L=o=>o==null?'':typeof o==='string'?o:(sw()?(o.sw||o.en):(o.en||o.sw))||'';
const tsh=n=>n==null?'—':'TSh '+Math.round(n).toLocaleString('en-US');
const pct=n=>Math.round(n*1000)/10+'%';
const est=()=>`<span class="ab-est">${E(T('estimate','makadirio'))}</span>`;
const tshB=n=>sw()?'TSh bilioni '+(n/1e9).toFixed(2):'TSh '+(n/1e9).toFixed(2)+'B';

function svcs(){return DATA().services||[]}
const paid=()=>svcs().filter(s=>s.walkin_tsh>0&&s.status!=='STORE');
const store=()=>svcs().filter(s=>s.status==='STORE');
const noq=()=>svcs().filter(s=>s.status==='NO_QUOTE');

/* D4 package price for one stage, default brands, regular tier */
function stagePrice(stage,plan){const ls=(stage.items||[]).filter(i=>i.kind!=='medicine'&&!i.optional).map(it=>{const b=(it.brands||[]).find(x=>x.default)||(it.brands||[])[0];return {cost:D4().lineCost(b,it.units)}});
 return D4().price(D4().shelfValue(ls),plan,[])}

/* primary visual: where one service shilling goes */
function splitSVG(s){const W=1040,bw=W-90,h=34,g=80,w=s.walkin_tsh,sc=v=>bw*v/w;
 const rows=[
  [T('Walk-in customer pays','Mteja wa kawaida analipa'),[[w,'var(--mute)',T('provider','mtoa huduma')]]],
  [T('Member, inside the box','Mwanachama, ndani ya boksi'),[[s.partner_price_in_box_tsh,'var(--green)',T('provider','mtoa huduma')],[s.afya_in_box_tsh,'var(--gold)','Afya']]],
  [T('Member, booked once as an add-on','Mwanachama, akiagiza mara moja kama nyongeza'),[[s.provider_net_tsh,'var(--green)',T('provider','mtoa huduma')],[s.afya_tsh,'var(--gold)','Afya']]]];
 const H=rows.length*(h+g)+10;
 return `<svg viewBox="0 0 ${W} ${H}" class="s52-ch" role="img" aria-label="${E(T('How the price of one partner service is shared between the provider and Afya','Jinsi bei ya huduma moja ya mshirika inavyogawanywa kati ya mtoa huduma na Afya'))}">
 ${rows.map((r,i)=>{let x=0;const y=i*(h+g)+44,tot=r[1].reduce((t,p)=>t+p[0],0);
  return `<text class="s52-l" x="0" y="${y-16}" font-size="16" style="fill:var(--ink)">${E(r[0])}</text>`+r[1].map(p=>{const ww=sc(p[0]),o=`<rect x="${x.toFixed(1)}" y="${y}" width="${ww.toFixed(1)}" height="${h}" style="fill:${p[1]}"/>${ww>80?`<text class="s52-in" x="${(x+10).toFixed(1)}" y="${y+h/2+6}" font-size="15" style="fill:${p[1]==='var(--gold)'?'var(--bg)':'var(--ink)'}">${E(p[2])} ${Math.round(p[0]).toLocaleString('en-US')}</text>`:''}`;x+=ww;return o}).join('')+`<text class="s52-v" x="${(x+10).toFixed(1)}" y="${y+h/2+6}" font-size="15" style="fill:var(--gold)">${Math.round(tot/w*100)}%</text>`}).join('')}
 </svg>`}

const TYPES=[
 ['Licensed partner pharmacy','Famasia mshirika yenye leseni','Every medicine a member needs, ordered with the box; a steady, planned flow of prescriptions and refills.','Kila dawa anayohitaji mwanachama, ikiagizwa pamoja na boksi; mtiririko thabiti na uliopangwa wa vyeti vya daktari na dawa za kujaza tena.','Members who never miss a refill, and a store that stays a health-goods shop under its own licences.','Wanachama wasiokosa kamwe dawa zao, na duka linalobaki duka la bidhaa za afya chini ya leseni zake.','The pharmacy sells and dispenses at its own price and is paid by the member; the sealed bag travels with the box.','Famasia inauza na kutoa dawa kwa bei yake na inalipwa na mwanachama; mfuko uliofungwa unasafiri pamoja na boksi.'],
 ['Clinics, nurses and laboratories','Kliniki, wauguzi na maabara','Prepaid, booked visits (midwife home visits, skin and postnatal consults, tests) with no marketing cost and no no-shows.','Ziara zilizolipiwa mapema na kupangwa (ziara za mkunga nyumbani, ushauri wa ngozi na baada ya kujifungua, vipimo) bila gharama ya matangazo na bila wateja wasiofika.','Care the store cannot give itself, at a price below walk-in for members.','Huduma ambayo duka haliwezi kuitoa lenyewe, kwa bei iliyo chini ya ya kawaida kwa wanachama.','In the box: partner price (70% of walk-in) × 1.25. As an add-on: the partner pays Afya a 10% booking commission.','Ndani ya boksi: bei ya mshirika (70% ya bei ya kawaida) × 1.25. Kama nyongeza: mshirika anailipa Afya kamisheni ya 10% ya kuagiza.'],
 ['Safety companies: pest control, fire safety, first-aid training','Kampuni za usalama: kudhibiti wadudu, usalama wa moto, mafunzo ya huduma ya kwanza','Booked work for every business and hotel account, on a fixed calendar.','Kazi iliyopangwa kwa kila akaunti ya biashara na hoteli, kwa kalenda maalum.','A complete package for businesses and hotels: supplies and the services that keep them compliant.','Kifurushi kamili kwa biashara na hoteli: bidhaa na huduma zinazozifanya zifuate sheria.','Same rule as clinics; billed in the month the service is done.','Kanuni ileile kama kliniki; inatozwa katika mwezi huduma inapofanyika.'],
 ['Employers and insurers','Waajiri na kampuni za bima','Staff health that is visible and planned; a route to lower claims through home management of conditions.','Afya ya wafanyakazi inayoonekana na iliyopangwa; njia ya kupunguza madai kupitia usimamizi wa magonjwa nyumbani.','Bulk, predictable orders and groups of members.','Oda kubwa zinazotabirika na makundi ya wanachama.','Phase 1: the partner promotes the box and the member pays. Later: employer-paid or co-paid boxes on one monthly invoice.','Awamu ya 1: mshirika anatangaza boksi na mwanachama analipa. Baadaye: maboksi yanayolipiwa na mwajiri au kwa kuchangia, kwa ankara moja ya mwezi.'],
 ['Schools and hotels','Shule na hoteli','First-aid kits always complete, refilled each term or month; guest amenities and urgent deliveries.','Visanduku vya huduma ya kwanza vilivyokamilika kila wakati, vinavyojazwa kila muhula au mwezi; mahitaji ya wageni na kufikisha kwa haraka.','Fixed-rhythm orders and introductions to many families.','Oda za mpangilio maalum na kufahamiana na familia nyingi.','Afya Hoteli and Afya Biashara packages at the published price; school kits by term.','Vifurushi vya Afya Hoteli na Afya Biashara kwa bei iliyochapishwa; visanduku vya shule kwa muhula.'],
 ['Diaspora associations','Vyama vya Watanzania walio nje','A trusted way for members abroad to turn money sent home into care, with delivery confirmation.','Njia ya kuaminika kwa wanachama walio nje kugeuza fedha wanazotuma nyumbani kuwa huduma, pamoja na uthibitisho wa kufikishwa.','Groups of buyers paying by card, at a low cost to reach.','Makundi ya wanunuzi wanaolipa kwa kadi, kwa gharama ndogo ya kuwafikia.','Members pay for boxes directly; the association receives a community benefit, such as free check days, not cash.','Wanachama wanalipia maboksi moja kwa moja; chama kinapata manufaa ya jamii, kama siku za vipimo bure, si fedha.']];

const PIPE=[['Identify','Kutambua','List named targets near the store and learn what each buys today.','Kuorodhesha walengwa kwa majina karibu na duka na kujifunza kila mmoja ananunua nini leo.'],
 ['First meeting','Mkutano wa kwanza','The founders or the store lead present the offer, with a free check day as the first step.','Waanzilishi au kiongozi wa duka wanawasilisha pendekezo, siku ya vipimo bure ikiwa hatua ya kwanza.'],
 ['90-day pilot','Majaribio ya siku 90','A small, measured trial in one department, ward or class, with success measures agreed in writing.','Majaribio madogo yanayopimwa katika idara, wodi au darasa moja, vipimo vya mafanikio vikikubaliwa kwa maandishi.'],
 ['Agreement','Makubaliano','Written terms reviewed by a lawyer: prices, payment days, data consent and no inducements.','Masharti ya maandishi yanayokaguliwa na mwanasheria: bei, siku za malipo, ridhaa ya taarifa na kutokuwepo kwa vishawishi.'],
 ['Scale','Kupanua','Roll out across the organisation, then repeat with the next partner of the same type.','Kusambaza katika taasisi nzima, kisha kurudia kwa mshirika anayefuata wa aina hiyohiyo.']];

const SRC=[
 {t:'AfyaDepot, Home Nursing Care: Senior Home-care Visit, TSh 50,000 a unit (price reference for a nurse home visit)',u:'https://www.afyadepot.co.tz/product/senior-home-care-visit',chk:'10 Nov 2026'},
 {t:'AfyaDepot: Professional Skin Analysis (price reference for a skin consultation)',u:'https://afyadepot.co.tz/product/professional-skin-analysis',chk:'10 Nov 2026'},
 {t:'The Citizen, 27 Apr 2026: How mothers in rural Tanzania pay the price for “free” maternal care (2007 National Health Policy: free services for expectant mothers and children under five)',u:'https://www.thecitizen.co.tz/tanzania/news/national/how-mothers-in-rural-tanzania-pay-the-price-for-free-maternal-care-5437524',chk:'10 Nov 2026'},
 {t:'WTW, 29 Feb 2024: Tanzania, all residents must be covered by health insurance (Universal Health Insurance Act; employers must ensure staff are covered)',u:'https://wtwco.com/en-gh/insights/2024/02/tanzania-all-residents-must-be-covered-by-health-insurance'},
 {t:'TanzaniaInvest, Jan 2026: Tanzania starts the universal health insurance scheme (from 26 January 2026; TSh 150,000 a year for a household of up to six)',u:'https://www.tanzaniainvest.com/?p=32358'},
 {t:'The Citizen, 27 May 2026: diaspora remittances hit TSh 3.3 trillion (2024/25)',u:'https://www.thecitizen.co.tz/tanzania/diaspora/diaspora-remittances-hit-sh3-3-trillion-as-tanzania-deepens-global-engagement-5473984'},
 {t:'National Bureau of Statistics, Hotel Statistics Release, December 2024 (bed occupancy; search result, page not opened)',u:'https://www.nbs.go.tz/uploads/statistics/documents/en-1743078564-HOTEL%20Statistics%20Release_December,%202024.pdf'},
 {t:'Afya Biashara and Afya Hoteli box files: every item price links to its shop page in section 3.5',u:''},
 {t:'Afya Basics financial model v1.2, base case (services, commission, business accounts, business share; planning estimates)',u:''}];

const CSS=`<style>
.s52 .ab-block>p,.s52 .ab-block>h3{margin-top:var(--s2)}
.s52-ch{display:block;width:100%;height:auto;margin-top:var(--s2)}
@media (max-width:720px){.s52-ch .s52-l{font-size:40px}.s52-ch .s52-v{font-size:32px}.s52-ch .s52-in{display:none}}
.s52 .ab-t{font-size:calc(var(--fs-body) - 2px)}
.s52 .ab-t td:first-child{min-width:170px}
.s52-sm{font-size:var(--fs-cap)}
</style>`;

function serviceTable(){return `<div class="ab-tw"><table class="ab-t"><thead><tr><th>${E(T('Service and provider','Huduma na mtoa huduma'))}</th><th>${E(T('Walk-in price','Bei ya kawaida'))} ${est()}</th><th>${E(T('Member pays in the box','Mwanachama analipa ndani ya boksi'))}</th><th>${E(T('Provider receives','Mtoa huduma anapokea'))}</th><th>${E(T('Afya keeps','Afya inabaki na'))}</th><th>${E(T('Booked once: member pays','Ikiagizwa mara moja: mwanachama analipa'))}</th></tr></thead><tbody>
 ${paid().map(s=>`<tr><td><b>${E(L(s.name))}</b><br><span class="ab-mute s52-sm">${E(L(s.who_provides))}</span></td><td class="ab-n">${tsh(s.walkin_tsh)}${s.src&&s.src.u?`<br><a class="s52-sm" href="${E(s.src.u)}" target="_blank" rel="noopener">${E(T('price reference','rejea ya bei'))}</a>`:''}</td><td class="ab-n">${tsh(s.member_in_box_tsh)}</td><td class="ab-n">${tsh(s.partner_price_in_box_tsh)}</td><td class="ab-n">${tsh(s.afya_in_box_tsh)}</td><td class="ab-n">${tsh(s.addon_member_tsh)}</td></tr>`).join('')}
 </tbody></table></div>`}

function bizRows(){const I=window.MODEL.inputs.kazini||{},mk=I.small_shop_markup||0,trip=(I.trip||0)*(I.trips||0),out=[];
 ['afya-biashara','afya-hoteli'].forEach(k=>{const b=DATA().boxes[k];if(!b)return;b.stages.forEach(s=>{const r12=stagePrice(s,'m12'),r6=stagePrice(s,'m6'),r1=stagePrice(s,'m1'),now=r12.shelf*(1+mk)+trip;out.push({b,s,r12,r6,r1,now})})});
 return {out,mk,trip}}
function bizTable(){const {out,mk,trip}=bizRows();
 return `<div class="ab-tw"><table class="ab-t"><thead><tr><th>${E(T('Package and size','Kifurushi na ukubwa'))}</th><th>${E(T('Shelf value of a month’s goods','Thamani ya rafu ya bidhaa za mwezi'))}</th><th>${E(T('What it pays now, buying itself','Inacholipa sasa, ikinunua yenyewe'))} ${est()}</th><th>${E(T('Afya price, 12 months','Bei ya Afya, miezi 12'))}</th><th>${E(T('6 months','Miezi 6'))}</th><th>${E(T('1 month','Mwezi 1'))}</th></tr></thead><tbody>
 ${out.map(x=>`<tr><td><b>${E(L(x.b.name))}</b><br><span class="ab-mute s52-sm">${E(L(x.s.label))}</span></td><td class="ab-n">${tsh(x.r12.shelf)}</td><td class="ab-n">${tsh(x.now)}</td><td class="ab-n">${tsh(x.r12.core)}</td><td class="ab-n">${tsh(x.r6.core)}</td><td class="ab-n">${tsh(x.r1.core)}</td></tr>`).join('')}
 </tbody></table></div>
 <p class="ab-mute s52-sm" style="margin-top:12px">${E(T(`Prices per month, default brands, packing and delivery included. “What it pays now” is the shelf value plus a ${Math.round(mk*100)}% small-shop mark-up and ${tsh(trip)} of shopping trips, planning estimates from the financial model, not observed. Partner services (first-aid training, extinguisher service, pest control) are billed in the month they happen, at the rates in the table above.`,`Bei kwa mwezi, chapa za kawaida, ufungashaji na usafirishaji ukiwemo. “Inacholipa sasa” ni thamani ya rafu pamoja na ongezeko la ${Math.round(mk*100)}% la duka dogo na ${tsh(trip)} za safari za kununua, makadirio ya mpango kutoka modeli ya fedha, si takwimu zilizoonekana. Huduma za washirika (mafunzo ya huduma ya kwanza, huduma ya kizima moto, kudhibiti wadudu) zinatozwa katika mwezi zinapofanyika, kwa viwango vilivyo kwenye jedwali hapo juu.`))}</p>`}

function render(s,p,pv,nx){const M=window.MODEL,I=M.inputs,b=M.get('base'),y1=b.y1,Y=b.years,sh=I.growth.b2b_share,b2b=y=>y.revenue*sh/(1+sh);
 const S=I.services,ref=svcs().find(x=>x.key==='midwife-home-visit')||paid()[0],{out}=bizRows();
 const save=out.map(x=>1-x.r12.core/x.now),smin=Math.min(...save),smax=Math.max(...save);
 return `${CSS}<article class="ab-sec s52"><div class="ab-wrap">
 <div class="ab-sec-no">${E(s.no)}</div><h1>${E(s.title)}</h1>
 <p class="ab-summary">${E(T('Afya Basics does not try to do everything itself. A licensed partner pharmacy sells every medicine; clinics, nurses and laboratories give the care services; pest-control, fire-safety and first-aid training companies serve the business and hotel packages. One rule prices every partner service so that the member pays less than walk-in, the provider is paid in advance for booked work, and Afya earns for booking and follow-up. Institutions (employers, insurers, schools, hotels, diaspora groups) bring many households at once. No partner is signed yet.','Afya Basics haijaribu kufanya kila kitu yenyewe. Famasia mshirika yenye leseni inauza kila dawa; kliniki, wauguzi na maabara wanatoa huduma za matibabu; kampuni za kudhibiti wadudu, usalama wa moto na mafunzo ya huduma ya kwanza zinahudumia vifurushi vya biashara na hoteli. Kanuni moja inaweka bei ya kila huduma ya mshirika ili mwanachama alipe chini ya bei ya kawaida, mtoa huduma alipwe mapema kwa kazi iliyopangwa, na Afya ipate mapato kwa kupanga na kufuatilia. Taasisi (waajiri, kampuni za bima, shule, hoteli, vyama vya walio nje) zinaleta kaya nyingi kwa wakati mmoja. Bado hakuna mshirika aliyesaini.'))}</p>

 <figure class="ab-visual">
  <h2>${E(T('Where the price of one service goes','Bei ya huduma moja inakwenda wapi'))}</h2>
  ${ref?splitSVG(ref):''}
  <figcaption class="ab-mute s52-sm" style="margin-top:12px">${E(T(`Example: ${L(ref.name)}, walk-in ${tsh(ref.walkin_tsh)} (estimate, from a published Dar es Salaam home-nursing price). Partner price ${Math.round(S.member_rate*100)}% of walk-in; member fee = partner price × ${1+S.markup}, to the nearest TSh 500; add-on at ${Math.round(S.addon_rate*100)}% of walk-in with a ${Math.round(S.commission*100)}% booking commission.`,`Mfano: ${L(ref.name)}, bei ya kawaida ${tsh(ref.walkin_tsh)} (makadirio, kutoka bei iliyochapishwa ya uuguzi wa nyumbani Dar es Salaam). Bei ya mshirika ni ${Math.round(S.member_rate*100)}% ya bei ya kawaida; ada ya mwanachama = bei ya mshirika × ${1+S.markup}, kwa TSh 500 iliyo karibu; nyongeza kwa ${Math.round(S.addon_rate*100)}% ya bei ya kawaida na kamisheni ya ${Math.round(S.commission*100)}% ya kuagiza.`))}</figcaption>
 </figure>

 <div class="ab-body">
  <section class="ab-block"><h2>${E(T('Medicines: only through the licensed partner pharmacy','Dawa: kupitia famasia mshirika yenye leseni pekee'))}</h2>
   <p>${E(T('Afya Basics does not sell medicines and has no medicine of its own. Every medicine a box member needs (iron and folic acid in pregnancy, blood-pressure tablets, insulin and the rest) is sold by a licensed partner pharmacy under a written agreement. The member orders it with the box, in the app or in store; the pharmacist checks any prescription, dispenses, seals the bag and charges the member at the pharmacy’s own price. The sealed bag travels with the box, so the household gets one delivery. Medicines are never in the box price and never in the member saving.','Afya Basics haiuzi dawa na haina dawa yake yenyewe. Kila dawa anayohitaji mwanachama wa boksi (madini ya chuma na foliki wakati wa ujauzito, vidonge vya presha, insulini na nyinginezo) inauzwa na famasia mshirika yenye leseni chini ya makubaliano ya maandishi. Mwanachama anaiagiza pamoja na boksi, kwenye programu au dukani; mfamasia anakagua cheti cha daktari pale kinapohitajika, anatoa dawa, anafunga mfuko na kumtoza mwanachama kwa bei ya famasia yenyewe. Mfuko uliofungwa unasafiri pamoja na boksi, hivyo kaya inapata kufikishiwa mara moja. Dawa hazimo kamwe kwenye bei ya boksi wala kwenye akiba ya mwanachama.'))}</p>
   <p>${E(T('This keeps Afya’s own licences simple (a health-goods shop, a cosmetics and food shelf, a device outlet) and leaves the choice of medicine to the clinic and the pharmacist. A pharmacy chain is therefore a natural partner rather than a rival.','Hii inafanya leseni za Afya yenyewe kuwa rahisi (duka la bidhaa za afya, rafu ya vipodozi na chakula, duka la vifaa tiba) na kuacha uchaguzi wa dawa kwa kliniki na mfamasia. Kwa hiyo mtandao wa famasia ni mshirika wa kawaida badala ya mshindani.'))}</p>
  </section>

  <section class="ab-block"><h2>${E(T('One rule for every partner service','Kanuni moja kwa kila huduma ya mshirika'))}</h2>
   <p>${E(T(`Partners give Afya members ${Math.round(S.member_rate*100)}% of their walk-in price in return for prepaid, guaranteed bookings with no marketing cost and no no-shows. Inside the box the member pays that partner price × ${1+S.markup}, rounded to the nearest TSh 500, only in the month the service is delivered: about ${Math.round((1-S.member_rate*(1+S.markup))*1000)/10}% less than walking in. The provider receives ${Math.round(S.member_rate*100)}% of walk-in; Afya keeps the difference for booking, reminders, prepayment and follow-up. A member who books a service once as an add-on pays ${Math.round(S.addon_rate*100)}% of walk-in, and the provider pays Afya a ${Math.round(S.commission*100)}% booking commission.`,`Washirika wanawapa wanachama wa Afya ${Math.round(S.member_rate*100)}% ya bei yao ya kawaida kwa malipo ya mapema na nafasi zilizohakikishwa, bila gharama ya matangazo na bila wateja wasiofika. Ndani ya boksi mwanachama analipa bei hiyo ya mshirika × ${1+S.markup}, kwa TSh 500 iliyo karibu, tu katika mwezi huduma inapotolewa: takriban ${Math.round((1-S.member_rate*(1+S.markup))*1000)/10}% pungufu kuliko kwenda moja kwa moja. Mtoa huduma anapokea ${Math.round(S.member_rate*100)}% ya bei ya kawaida; Afya inabaki na tofauti kwa kupanga, kukumbusha, malipo ya mapema na kufuatilia. Mwanachama anayeagiza huduma mara moja kama nyongeza analipa ${Math.round(S.addon_rate*100)}% ya bei ya kawaida, na mtoa huduma anailipa Afya kamisheni ya ${Math.round(S.commission*100)}% ya kuagiza.`))}</p>
   <p>${E(T('The test is simple: the member must pay less than walking in. That holds as long as the partner price is at most 80% of walk-in; above that, the box would cost more than the walk-in visit. Public services that are free by policy (antenatal and postnatal care, under-five growth checks at government clinics) are never charged: Afya sends reminders only.','Kipimo ni rahisi: mwanachama lazima alipe kidogo kuliko kwenda moja kwa moja. Hilo linabaki kweli ilimradi bei ya mshirika isizidi 80% ya bei ya kawaida; zaidi ya hapo, boksi lingegharimu zaidi ya ziara ya kawaida. Huduma za umma zilizo bure kwa sera (huduma kabla na baada ya kujifungua, ukaguzi wa ukuaji wa watoto chini ya miaka mitano katika kliniki za serikali) hazitozwi kamwe: Afya inatuma vikumbusho tu.'))}</p>
   <h3>${E(T('Partner services and their prices','Huduma za washirika na bei zake'))}</h3>
   ${serviceTable()}
   <p class="ab-mute s52-sm" style="margin-top:12px">${E(T(`Store services at no extra charge, inside the membership: ${store().map(x=>L(x.name)).join('; ')}. Priced once a partner quotes: ${noq().map(x=>L(x.name)).join('; ')}.`,`Huduma za dukani bila malipo ya ziada, ndani ya uanachama: ${store().map(x=>L(x.name)).join('; ')}. Bei itawekwa mshirika akitoa bei: ${noq().map(x=>L(x.name)).join('; ')}.`))}</p>
  </section>

  <section class="ab-block"><h2>${E(T('Businesses and hotels','Biashara na hoteli'))}</h2>
   <p>${E(T('Two packages make the business line. Afya Biashara serves a small business of about four staff in five sizes: shop, food stall, salon, workshop and small office. Afya Hoteli serves a guest house of about 10 rooms and a 3-star hotel of about 40 rooms, with quantities per occupied room-night at an estimated 55% occupancy. Each month brings the hygiene, first-aid and safety supplies the business uses; the partner services that keep it compliant are booked on a fixed calendar. For many small businesses that do not buy the full workplace first-aid set today, the package is a compliance purchase rather than a saving.','Vifurushi viwili vinaunda mstari wa biashara. Afya Biashara inahudumia biashara ndogo yenye wafanyakazi takriban wanne kwa ukubwa tano: duka, mama lishe, saluni, karakana na ofisi ndogo. Afya Hoteli inahudumia nyumba ya wageni yenye vyumba takriban 10 na hoteli ya nyota tatu yenye vyumba takriban 40, kiasi kikipimwa kwa kila usiku wa chumba chenye mgeni kwa makadirio ya vyumba kujaa 55%. Kila mwezi unaleta mahitaji ya usafi, huduma ya kwanza na usalama ambayo biashara inatumia; huduma za washirika zinazoifanya ifuate sheria zinapangwa kwa kalenda maalum. Kwa biashara ndogo nyingi zisizonunua leo seti kamili ya huduma ya kwanza ya mahali pa kazi, kifurushi ni ununuzi wa kufuata sheria badala ya akiba.'))}</p>
   ${bizTable()}
   <p>${E(T(`On these estimates a business on the 12-month plan pays ${Math.round(smin*100)}–${Math.round(smax*100)}% less than buying the same goods itself. Hotels often buy wholesale below shop prices, so the hotel saving is likely overstated and the hotel package will be priced from a trade list before it is offered.`,`Kwa makadirio haya biashara iliyo kwenye mpango wa miezi 12 inalipa ${Math.round(smin*100)}–${Math.round(smax*100)}% pungufu kuliko kununua bidhaa hizohizo yenyewe. Hoteli mara nyingi hununua kwa jumla chini ya bei za maduka, hivyo akiba ya hoteli huenda imekuzwa, na kifurushi cha hoteli kitawekwa bei kutoka orodha ya bei za jumla kabla ya kutolewa.`))}</p>
  </section>

  <section class="ab-block"><h2>${E(T('Institutions that bring many households','Taasisi zinazoleta kaya nyingi'))}</h2>
   <p>${E(T('An employer, an insurer, a school, a hotel or a diaspora association each serves many households at once. Two changes make them more interested now: the Universal Health Insurance Act requires employers to ensure their staff are insured, and the national scheme started on 26 January 2026 at TSh 150,000 a year for a household of up to six. Employers and insurers now have a direct interest in keeping people healthy at lower cost.','Mwajiri, kampuni ya bima, shule, hoteli au chama cha walio nje kila kimoja kinahudumia kaya nyingi kwa wakati mmoja. Mabadiliko mawili yanawafanya wavutiwe zaidi sasa: Sheria ya Bima ya Afya kwa Wote inawataka waajiri kuhakikisha wafanyakazi wao wana bima, na mpango wa kitaifa ulianza tarehe 26 Januari 2026 kwa TSh 150,000 kwa mwaka kwa kaya ya watu hadi sita. Waajiri na kampuni za bima sasa wana maslahi ya moja kwa moja katika kuwaweka watu na afya njema kwa gharama ndogo.'))}</p>
   <div class="ab-tw"><table class="ab-t"><thead><tr><th>${E(T('Partner','Mshirika'))}</th><th>${E(T('What they get','Wanapata nini'))}</th><th>${E(T('What Afya gets','Afya inapata nini'))}</th><th>${E(T('How money flows','Fedha zinavyopita'))}</th></tr></thead><tbody>
    ${TYPES.map(t=>`<tr><td><b>${E(T(t[0],t[1]))}</b><br><span class="ab-mute s52-sm">${E(T('Target, no agreement yet','Lengo, bado hakuna makubaliano'))}</span></td><td>${E(T(t[2],t[3]))}</td><td>${E(T(t[4],t[5]))}</td><td>${E(T(t[6],t[7]))}</td></tr>`).join('')}
   </tbody></table></div>
   <p>${E(T('Two rules protect the business. No single partner may exceed about one fifth of business revenue, so the loss of one client cannot damage the network. And partners pay the same published prices as households: what they gain is reliability, one invoice and delivery on a fixed day, not hidden discounts the customer-funded model could not carry.','Kanuni mbili zinalinda biashara. Hakuna mshirika mmoja anayeruhusiwa kuzidi takriban moja ya tano ya mapato ya biashara, hivyo kumpoteza mteja mmoja hakuwezi kudhuru mtandao. Na washirika wanalipa bei zilezile zilizochapishwa kama kaya: wanachopata ni uhakika, ankara moja na kufikishiwa siku maalum, si punguzo lililofichwa ambalo modeli inayofadhiliwa na wateja isingeweza kubeba.'))}</p>
  </section>

  <section class="ab-block"><h2>${E(T('How a partnership is won','Jinsi ushirikiano unavyopatikana'))}</h2>
   <p>${E(T('Every partnership passes through the same five stages and moves on only when the previous one has worked. All partner types are at stage 1 today.','Kila ushirikiano unapita katika hatua tano zilezile na unasonga mbele tu hatua iliyotangulia ikifaulu. Aina zote za washirika ziko katika hatua ya 1 leo.'))}</p>
   <ol class="ab-timeline">${PIPE.map((x,i)=>`<li><b>${i+1} · ${E(T(x[0],x[1]))}</b><span>${E(T(x[2],x[3]))}</span></li>`).join('')}</ol>
   <p>${E(T('Clean partnerships: no payment to clinics or health workers for sending patients, no influence on prescribing, patient data shared only with written consent, and every agreement reviewed against Pharmacy Council and TMDA rules before signing (section 4.5). In year 1 the founders and the store lead open the doors themselves; a part-time business coordinator is added when institutional orders justify it.','Ushirikiano safi: hakuna malipo kwa kliniki au wahudumu wa afya kwa kuleta wagonjwa, hakuna kuingilia uandikaji wa dawa, taarifa za wagonjwa zinashirikiwa tu kwa ridhaa ya maandishi, na kila makubaliano yanakaguliwa dhidi ya kanuni za Baraza la Famasi na TMDA kabla ya kusainiwa (sehemu ya 4.5). Katika mwaka wa 1 waanzilishi na kiongozi wa duka wanafungua milango wenyewe; mratibu wa biashara wa muda anaongezwa oda za taasisi zitakapohalalisha.'))}</p>
  </section>

  <section class="ab-block"><h2>${E(T('Business sales in the plan','Mauzo ya biashara katika mpango'))}</h2>
   <p>${T(`The plan treats institutions cautiously. In year 1 it counts only the business packages: ${N('s52acc',I.kazini.accounts_m12,'int')} accounts by month 12 ${est()}. From year 2, business-to-business sales are modelled at ${Math.round(sh*100)}% on top of store sales: about ${E(tshB(b2b(Y[1])))} in year 2, ${E(tshB(b2b(Y[4])))} in year 5 and ${E(tshB(b2b(Y[11])))} in year 12 ${est()}. No partner is counted as signed; every agreement won is upside to the plan, not a dependency.`,`Mpango unazishughulikia taasisi kwa tahadhari. Katika mwaka wa 1 unahesabu vifurushi vya biashara pekee: akaunti ${N('s52acc',I.kazini.accounts_m12,'int')} ifikapo mwezi 12 ${est()}. Kuanzia mwaka wa 2, mauzo ya biashara kwa biashara yanakadiriwa kwa ${Math.round(sh*100)}% juu ya mauzo ya duka: takriban ${E(tshB(b2b(Y[1])))} mwaka wa 2, ${E(tshB(b2b(Y[4])))} mwaka wa 5 na ${E(tshB(b2b(Y[11])))} mwaka wa 12 ${est()}. Hakuna mshirika anayehesabiwa kuwa amesaini; kila makubaliano yanayopatikana ni faida ya ziada kwa mpango, si utegemezi.`)}</p>
  </section>
 </div>

 <section class="ab-block"><h2>${E(T('Key figures','Takwimu muhimu'))}</h2>
  ${A().figsHTML([
   {v:'0',l:T('Partners signed today; every partner is a target','Washirika waliosaini leo; kila mshirika ni lengo'),s:E(T('Status, 10 Nov 2026','Hali, 10 Nov 2026'))},
   {v:`${Math.round(S.member_rate*(1+S.markup)*1000)/10}%`,l:T('Of the walk-in price a member pays for a service inside the box','Ya bei ya kawaida ambayo mwanachama analipa kwa huduma ndani ya boksi'),s:E(T('Partner price × 1.25','Bei ya mshirika × 1.25'))},
   {v:`${Math.round(S.member_rate*100)}%`,l:T('Of walk-in the provider receives, paid in advance for booked work','Ya bei ya kawaida anayopokea mtoa huduma, akilipwa mapema kwa kazi iliyopangwa'),s:E(T('Partner terms proposed','Masharti ya mshirika yanayopendekezwa'))},
   {v:`${Math.round(sh*100)}%`,l:T('Business sales on top of store sales, from year 2','Mauzo ya biashara juu ya mauzo ya duka, kuanzia mwaka wa 2'),s:E(T('Financial model v1.2','Modeli ya fedha v1.2'))}])}
 </section>

 <section class="ab-block"><h2>${E(T('What this earns in year 1','Mapato yake mwaka wa 1'))}</h2>
  <div class="ab-tw"><table class="ab-t"><thead><tr><th>${E(T('Line, year 1','Mstari, mwaka wa 1'))}</th><th>TSh</th></tr></thead><tbody>
   <tr><td>${E(T('Partner services charged to members','Huduma za washirika zinazotozwa wanachama'))}</td><td class="ab-n">${N('s52svc',y1.services,'tsh')} ${est()}</td></tr>
   <tr><td>${E(T('Paid to the providers','Zinazolipwa kwa watoa huduma'))}</td><td class="ab-n">${N('s52sc',y1.service_cost,'tsh')} ${est()}</td></tr>
   <tr><td>${E(T('Afya’s margin on services','Faida ya Afya kwenye huduma'))}</td><td class="ab-n">${N('s52sm',y1.services-y1.service_cost,'tsh')} ${est()}</td></tr>
   <tr><td>${E(T('Booking commission on add-on services','Kamisheni ya kuagiza huduma za nyongeza'))}</td><td class="ab-n">${N('s52com',y1.commission,'tsh')} ${est()}</td></tr>
   <tr><td>${E(T('Business package sales (Afya Biashara and Afya Hoteli)','Mauzo ya vifurushi vya biashara (Afya Biashara na Afya Hoteli)'))}</td><td class="ab-n">${N('s52kz',y1.kazini,'tsh')} ${est()}</td></tr>
   <tr><td>${E(T('Gross profit on business packages','Faida ghafi ya vifurushi vya biashara'))}</td><td class="ab-n">${N('s52kzg',y1.kazini_gp,'tsh')} ${est()}</td></tr>
  </tbody></table></div>
 </section>

 ${A().openHTML([
  E(T('No partner is signed yet: not the partner pharmacy, not a clinic, nurse, laboratory or safety company, not an employer, insurer, school, hotel or association.','Bado hakuna mshirika aliyesaini: si famasia mshirika, si kliniki, muuguzi, maabara au kampuni ya usalama, si mwajiri, kampuni ya bima, shule, hoteli wala chama.')),
  E(T('Walk-in prices are planning estimates. Only the nurse home visit and the skin consultation have a published Dar es Salaam price reference; the rest wait for two or three quotes each, and each estimate will be replaced by the median quote.','Bei za kawaida ni makadirio ya mpango. Ni ziara ya muuguzi nyumbani na ushauri wa ngozi pekee zenye rejea ya bei iliyochapishwa Dar es Salaam; nyingine zinasubiri bei mbili au tatu kila moja, na kila makadirio yatabadilishwa na bei ya kati ya zitakazotolewa.')),
  E(T('Whether providers accept 70% of walk-in for prepaid volume is to be confirmed in meetings; if a provider asks for more, the partner price can rise to at most 80% of walk-in before the member stops saving.','Kama watoa huduma watakubali 70% ya bei ya kawaida kwa wingi wa malipo ya mapema inasubiri kuthibitishwa katika mikutano; mtoa huduma akiomba zaidi, bei ya mshirika inaweza kupanda hadi 80% ya bei ya kawaida kabla mwanachama hajaacha kupata akiba.')),
  E(T('Whether VAT applies to Afya’s 25% service margin and to the booking commission is being checked.','Kama VAT inahusu faida ya Afya ya 25% kwenye huduma na kamisheni ya kuagiza inakaguliwa.')),
  E(T('The business “what it pays now” figures, the 55% hotel occupancy and the workplace first-aid list against the OSH Rules are estimates to be checked in the field and against the rules’ text.','Takwimu za biashara za “inacholipa sasa”, makadirio ya hoteli kujaa 55% na orodha ya huduma ya kwanza ya mahali pa kazi dhidi ya Kanuni za OSH ni makadirio yatakayokaguliwa uwanjani na dhidi ya maandishi ya kanuni hizo.'))])}

 ${A().sourcesHTML(SRC)}
 ${A().pagerHTML(pv,nx)}
 </div></article>`}

window.SECTIONS['s5-2']={render,init(){},v2:true};
})();
