/* 3.2 Customer journey & fast checkout · v2 on the D2 template.
   Five journeys with their time budgets and targets (kept from the earlier section, the advice journey corrected to the
   7-measurement basic kiosk of R2 / D-13). Demo prices come from the box data (window.AFYA_DATA, 3.5 shelf prices with
   sources) or from MODEL, labelled estimate. Box prices: window.AFYA_D4 through window.AB_S35.priceStage when the box file
   exists, otherwise MODEL.inputs.services.packs (estimate). Renewal calendar: research/R5-payments.md §5 (12-day lock, B20).
   Payment fee: R5 §6, about 2.7% of collections (estimate, AzamPay rates unverified). Foreign prices: research/fx.md
   (BoT mean rates, 10 Nov 2026). No people imagery: every visual is inline SVG or a token-styled screen. */
(function(){
'use strict';
const A=()=>window.AB,T=(e,s)=>A().T(e,s),E=s=>A().E(s),L=(e,s)=>E(T(e,s));
const lang=()=>window.AFYA_LANG==='sw'?'sw':'en';
const nf=n=>Math.round(n).toLocaleString('en-US');
const tsh=n=>'TSh '+nf(n);
const tshM=n=>'TSh '+(n/1e6).toFixed(1).replace(/\.0$/,'')+(lang()==='sw'?' milioni':'M');
const est=()=>`<span class="ab-est">${L('estimate','makadirio')}</span>`;
const exm=()=>`<span class="ab-est">${L('example','mfano')}</span>`;
const N=(k,v,f)=>A().numHTML(k,v,f);
const USD=2642.50,AED=719.48,FXD=()=>T('BoT mean rate, 10 Nov 2026','kiwango cha wastani cha BoT, 10 Nov 2026');
const fx=(cur,amt,rate)=>`${cur} ${amt.toLocaleString('en-US')} × ${rate.toLocaleString('en-US',{minimumFractionDigits:2})} (${FXD()})`;
const FEE=0.027; /* R5 §6: payment processing ≈ 2.7% of collections, estimate */

/* ---------- sources (numbered in this order) ---------- */
const SRC=[
 ['tcra','Daily News via AllAfrica, 10 February 2026: mobile money accounts double in five years (TCRA report for December 2025)','Daily News kupitia AllAfrica, 10 Februari 2026: akaunti za pesa kwa simu zaongezeka mara mbili katika miaka mitano (ripoti ya TCRA ya Desemba 2025)','https://allafrica.com/stories/202602100375.html',''],
 ['tra','Tanzania Revenue Authority: approved EFD and VFD suppliers and fiscal receipt rules','Mamlaka ya Mapato Tanzania: wasambazaji walioidhinishwa wa EFD na VFD na kanuni za risiti za kodi','https://tra.go.tz/page/efd-vfd-suppliers',''],
 ['bot25','Bank of Tanzania, National Payment Systems Annual Report 2025, p. 30: standing orders for recurring payments listed as a future improvement','Benki Kuu ya Tanzania, Ripoti ya Mwaka ya Mifumo ya Malipo ya Taifa 2025, uk. 30: maagizo ya kudumu ya malipo yanayojirudia yameorodheshwa kama maboresho ya baadaye','https://www.bot.go.tz/Publications/Regular/Annual%20Report/en/2026060211494565.pdf','9 Nov 2026'],
 ['lipa','Bank of Tanzania, Customer Experience Guideline for Merchant Payments, May 2023: one merchant number and QR (Lipa Namba, TANQR) for all wallets','Benki Kuu ya Tanzania, Mwongozo wa Uzoefu wa Wateja kwa Malipo kwa Wafanyabiashara, Mei 2023: namba moja ya mfanyabiashara na QR (Lipa Namba, TANQR) kwa pochi zote','https://www.bot.go.tz/Publications/Acts,%20Regulations,%20Circulars,%20Guidelines/Guidelines/sw/2023062016582894.pdf','9 Nov 2026'],
 ['azam','AzamPay pricing page, cited for mobile-money and card fees (could not be opened; the rates are unverified)','Ukurasa wa bei wa AzamPay, unaotajwa kwa ada za pesa kwa simu na kadi (haukuweza kufunguliwa; viwango havijathibitishwa)','https://azampay.com/pricing','9 Nov 2026'],
 ['d3','NeoTech UAE, product page: SUNMI D3 PRO desktop till (15.6-inch screen with optional 10.1-inch customer display), listed AED 4,428','NeoTech UAE, ukurasa wa bidhaa: mashine ya mauzo SUNMI D3 PRO (skrini ya inchi 15.6 na skrini ya mteja ya inchi 10.1 ya hiari), bei AED 4,428','https://neotech.ae/products/sunmi-d3-pro-advanced-desktop-pos-terminal',''],
 ['k2','NeoTech UAE, product page: SUNMI K2 MINI self-service kiosk, listed AED 12,205–14,646','NeoTech UAE, ukurasa wa bidhaa: kibanda cha kujihudumia SUNMI K2 MINI, bei AED 12,205–14,646','https://neotech.ae/products/sunmi-k2-mini-self-service-kiosk',''],
 ['v3','NeoTech UAE, product page: SUNMI V3 handheld till with 58 mm printer, listed AED 2,698.80','NeoTech UAE, ukurasa wa bidhaa: mashine ya mauzo ya mkononi SUNMI V3 yenye printa ya mm 58, bei AED 2,698.80','https://neotech.ae/products/sunmi-v3-android-pos-terminal-uae',''],
 ['esl','KORONA POS: how much do electronic shelf labels cost? (US$5–12 a label; gateway US$300–400; software about US$500)','KORONA POS: lebo za rafu za kielektroniki zinagharimu kiasi gani? (US$5–12 kwa lebo; lango US$300–400; programu takriban US$500)','https://koronapos.com/blog/how-much-do-electronic-shelf-labels-cost/',''],
 ['eas','Store gate security alarm installation cost guide (dual-pedestal system US$3,000–7,000 with basic installation)','Mwongozo wa gharama za kufunga lango la ulinzi dukani (mfumo wa nguzo mbili US$3,000–7,000 pamoja na ufungaji wa kawaida)','https://wiki.dronebotworkshop.com/wiki/store-gate-security-alarm-installation-cost.html',''],
 ['lock','StoreMoreStore: smart parcel lockers (outdoor 17-door unit listed at US$16,187.50)','StoreMoreStore: makabati janja ya vifurushi (kabati la nje la milango 17, bei US$16,187.50)','https://www.storemorestore.com/Parcel-Package-Delivery-Lockers-Any-Time-Access-s/1410.htm',''],
 ['bot','Bank of Tanzania, exchange rates: US$1 = TSh 2,642.50 and AED 1 = TSh 719.48 (mean rates, trading date 10 Nov 2026)','Benki Kuu ya Tanzania, viwango vya kubadilisha fedha: US$1 = TSh 2,642.50 na AED 1 = TSh 719.48 (viwango vya wastani, tarehe ya biashara 10 Nov 2026)','https://www.bot.go.tz/ExchangeRate/excRates','9 Nov 2026'],
 ['box','Afya Basics box data (section 3.5): shelf prices with their sources (AfyaDepot, Shoppers Supermarket and other listings; Kenyan prices converted at the BoT rate)','Taarifa za maboksi ya Afya Basics (sehemu ya 3.5): bei za rafu pamoja na vyanzo vyake (AfyaDepot, Shoppers Supermarket na matangazo mengine; bei za Kenya zimebadilishwa kwa kiwango cha BoT)','','10 Nov 2026'],
 ['model','Afya Basics financial model v1.2, base case: conversion, basket, checks, online orders, delivery fee and rider cost, care-pack prices (planning estimates)','Modeli ya fedha ya Afya Basics v1.2, hali ya msingi: kiwango cha ununuzi, kikapu, vipimo, oda za mtandaoni, ada ya usafirishaji na gharama ya msafirishaji, bei za vifurushi vya huduma (makadirio ya mipango)','','']];
const SI=Object.fromEntries(SRC.map((s,i)=>[s[0],i+1]));
const cite=(...ids)=>`<sup>${ids.map(id=>`<a href="#abSrc" class="ab-cite" aria-label="${L('Source','Chanzo')} ${SI[id]}">${SI[id]}</a>`).join(', ')}</sup>`;

/* ---------- box data: real shelf prices for the demos ---------- */
const DATA=()=>window.AFYA_DATA||{boxes:{},services:[]};
const STATUS={KE:['Kenyan listing, converted','bei ya Kenya, imebadilishwa'],EST:['estimate','makadirio']};
function shelfItem(slug,stage,key,short){const b=DATA().boxes[slug];if(!b)return null;const st=(b.stages||[]).find(s=>s.key===stage);if(!st)return null;
 const it=(st.items||[]).find(i=>i.key===key);if(!it||it.kind==='medicine')return null;const br=(it.brands||[]).find(x=>x.default)||(it.brands||[])[0];
 if(!br||br.price_tsh==null)return null;return {en:short[0],sw:short[1],brand:br.brand,price:br.price_tsh,src:br.src&&br.src.name,status:br.status,zone:short[2],zsw:short[3]}}
const SHELF_SPEC=[['mama-na-mtoto','b','diap',['Nappies, medium ×48','Nepi, saizi ya kati ×48','Mother and baby','Mama na mtoto']],
 ['mama-na-mtoto','a','wip',['Baby wipes ×120','Vitambaa maji vya mtoto ×120','Mother and baby','Mama na mtoto']],
 ['mama-na-mtoto','a','therm',['Digital thermometer','Kipimajoto cha kidijitali','First aid and home','Huduma ya kwanza na nyumbani']],
 ['mama-na-mtoto','a','rep',['Mosquito repellent, roll-on','Dawa ya kufukuza mbu, ya kupaka','First aid and home','Huduma ya kwanza na nyumbani']],
 ['mama-na-mtoto','a','laun',['Laundry powder 1 kg','Sabuni ya unga kilo 1','Home','Nyumbani']],
 ['mama-na-mtoto','c1','tpaste',['Children’s fluoride toothpaste','Dawa ya meno ya watoto yenye floraidi','Personal care','Utunzaji binafsi']]];
const shelf=()=>SHELF_SPEC.map(s=>shelfItem(...s)).filter(Boolean);

/* D4 price of one box: priceStage on the box file (1-month plan, regular tier) plus its partner service fee */
function d4Box(slugs,stageKey){const D4=window.AFYA_D4,S=window.AB_S35;if(!D4||!S)return null;
 for(const slug of slugs){const b=DATA().boxes[slug];if(!b||!b.stages||!b.stages.length)continue;
  const stage=b.stages.find(s=>s.key===stageKey)||b.stages[0];const keep={box:S.st.box,pick:S.st.pick};let r;
  try{S.st.box=slug;S.st.pick={};r=S.priceStage(b,stage,'m1','regular')}catch(e){r=null}finally{S.st.box=keep.box;S.st.pick=keep.pick}
  if(!r||r.missing)continue;const svc=(b.services||[]).map(k=>(DATA().services||[]).find(s=>s.key===k)).filter(Boolean).map(s=>s.partner_price_in_box_tsh).filter(p=>p);
  return {price:r.core+D4.serviceFee(svc),from:'data',stage}}
 return null}
function modelBox(k){const I=window.MODEL.inputs,p=((I.services&&I.services.packs)||[]).find(x=>x[0]===k);return p?{price:p[2],from:'model'}:null}
const BOXES=()=>[
 [['Afya Box · Mama na Mtoto, months 3–6, monthly','Afya Box · Mama na Mtoto, miezi 3–6, kila mwezi'],d4Box(['mama-na-mtoto'],'b')||modelBox('mama')],
 [['Afya Box · Presha Care, monthly','Afya Box · Presha Care, kila mwezi'],d4Box(['presha','presha-care','afya-presha'])||modelBox('presha')],
 [['Afya Box · Sukari Care, monthly','Afya Box · Sukari Care, kila mwezi'],d4Box(['sukari','sukari-care','afya-sukari'])||modelBox('sugar')]].filter(b=>b[1]);

/* ---------- the five journeys: [label, seconds, text] per step; targets from the earlier section ---------- */
function JOUR(){const I=window.MODEL.inputs,o=I.online,lean=A().isLean(),pct=x=>Math.round(x*100)+'%';
 return [
 {k:'walk',n:['Walk-in shopper','Mteja wa kuingia dukani'],tag:['under 3 min','chini ya dak. 3'],target:180,
  who:['Baba Juma stops on his way home in Sinza for glucose test strips. He knows what he needs.','Baba Juma anapita akirudi nyumbani Sinza kununua vijiti vya kupima sukari. Anajua anachohitaji.'],
  why:[`Repeat buyers carry store revenue. If buying strips takes three minutes rather than thirty, he comes back, and the walk-in line of the model holds: ${pct(I.store.conversion)} of visitors buying, with an average basket of ${tsh(I.store.basket)}.`,`Wanunuzi wa kurudia ndio wanaobeba mapato ya duka. Kununua vijiti kukichukua dakika tatu badala ya thelathini, atarudi, na mstari wa wateja wa dukani kwenye modeli unasimama: ${pct(I.store.conversion)} ya wageni wananunua, kwa wastani wa kikapu cha ${tsh(I.store.basket)}.`],
  steps:[['Arrive','Kufika',10,'A clean front, the Afya sign and a door screen offering a free health check. The Care Zone signs are visible from the door.','Mbele safi, alama ya Afya na skrini ya mlangoni inayotangaza kipimo cha afya cha bure. Alama za Kanda za Huduma zinaonekana ukiwa mlangoni.'],
   ['Find','Kutafuta',60,'He follows the Heart and Diabetes zone sign, or asks the find-it screen, which shows the zone and the shelf number.','Anafuata alama ya kanda ya Moyo na Kisukari, au anauliza skrini ya kutafutia, inayoonyesha kanda na namba ya rafu.'],
   ['Choose','Kuchagua',60,'One printed price, a short “best for” card and four to five registered brands side by side. An adviser only if he wants one.','Bei moja iliyochapishwa, kadi fupi ya “inafaa kwa” na chapa nne hadi tano zilizosajiliwa kando kwa kando. Mshauri akimhitaji tu.'],
   ['Pay','Kulipa',30,'Scan-and-go in the app, a self-checkout point or an adviser’s handheld till. Mobile money, card or cash.','Changanua-uende kwenye programu, sehemu ya kujilipia au mashine ya mkononi ya mshauri. Pesa kwa simu, kadi au taslimu.'],
   ['Leave with a plan','Kuondoka na mpango',10,'The fiscal receipt by SMS or WhatsApp, and a one-tap offer to save the strips as a monthly reminder or an Afya Box.','Risiti ya kodi kwa SMS au WhatsApp, na ofa ya mguso mmoja ya kuhifadhi vijiti kama ukumbusho wa kila mwezi au Afya Box.']]},
 {k:'adv',n:['Customer who needs advice','Mteja anayehitaji ushauri'],tag:['under 12 min','chini ya dak. 12'],target:720,
  who:['Mama Rehema, 52, has headaches and wants to know her blood pressure before she buys a monitor.','Mama Rehema, miaka 52, ana maumivu ya kichwa na anataka kujua shinikizo lake la damu kabla ya kununua kipimo.'],
  why:[`The slowest journey, by design. Time spent explaining a reading builds the trust that turns a first visit into a membership. The model assumes ${pct(I.check.check_to_purchase)} of checks lead to a purchase; the rest leave with advice and come back.`,`Safari ya polepole zaidi, kwa makusudi. Muda unaotumika kueleza kipimo unajenga imani inayogeuza ziara ya kwanza kuwa uanachama. Modeli inakadiria kuwa ${pct(I.check.check_to_purchase)} ya vipimo vinaishia kwenye ununuzi; wengine wanaondoka na ushauri na kurudi baadaye.`],
  steps:[['Afya Check','Afya Check',150,'The free full check: seven measurements in about two to three minutes. Results on screen and by SMS, with her consent.','Kipimo kamili cha bure: vipimo saba kwa takriban dakika mbili hadi tatu. Matokeo kwenye skrini na kwa SMS, kwa ridhaa yake.'],
   ['Adviser explains','Mshauri anaeleza',180,'A health adviser explains each reading in plain words. If a reading needs a doctor, she is referred to a clinic first.','Mshauri wa afya anaeleza kila kipimo kwa maneno rahisi. Kipimo kikihitaji daktari, anaelekezwa kliniki kwanza.'],
   ['Right product','Bidhaa sahihi',150,'The adviser shows the right monitor in her price range, with its warranty and how to use it.','Mshauri anaonyesha kipimo sahihi katika kiwango chake cha bei, pamoja na dhamana yake na jinsi ya kukitumia.'],
   ['Pay','Kulipa',30,'Paid on the adviser’s handheld till by a mobile-money request, right where she is sitting.','Analipa kwenye mashine ya mkononi ya mshauri kwa ombi la pesa kwa simu, pale pale alipoketi.'],
   ['Follow-up','Ufuatiliaji',30,'A reminder for her next check, and an offer of the Afya Care card if she wants regular checks.','Ukumbusho wa kipimo chake kijacho, na ofa ya kadi ya Afya Care akitaka vipimo vya mara kwa mara.']]},
 {k:'onl',n:['Online and WhatsApp order','Oda ya mtandaoni na WhatsApp'],tag:['under 30 s','chini ya sek. 30'],target:30,
  who:['Neema, a nurse on night shifts in Mbezi, reorders nappies and wipes from her phone during a break.','Neema, muuguzi wa zamu za usiku Mbezi, anaagiza tena nepi na vitambaa maji kwa simu yake wakati wa mapumziko.'],
  why:[`The model expects about ${o.orders_day_m12} online and WhatsApp orders a day by month 12. Each pays a ${tsh(o.delivery_fee)} delivery fee against a rider cost of about ${tsh(o.rider_cost_per_order)} per order${lean?' (partner riders paid per order in the option selected)':''}, so fast delivery does not cost the business money.`,`Modeli inatarajia takriban oda ${o.orders_day_m12} za mtandaoni na WhatsApp kwa siku ifikapo mwezi wa 12. Kila moja inalipa ada ya usafirishaji ya ${tsh(o.delivery_fee)} dhidi ya gharama ya msafirishaji ya takriban ${tsh(o.rider_cost_per_order)} kwa oda${lean?' (wasafirishaji washirika wanaolipwa kwa kila oda katika chaguo lililochaguliwa)':''}, kwa hiyo usafirishaji wa haraka haugharimu biashara pesa.`],
  steps:[['Open','Kufungua',5,'She opens the Afya app or messages the Afya WhatsApp number.','Anafungua programu ya Afya au anatuma ujumbe kwa namba ya WhatsApp ya Afya.'],
   ['Order again','Agiza tena',5,'“Order again” shows her last basket. One tap to confirm.','“Agiza tena” inaonyesha kikapu chake cha mwisho. Mguso mmoja kuthibitisha.'],
   ['Pay','Kulipa',15,'A mobile-money request appears on her phone. She enters her PIN to approve.','Ombi la pesa kwa simu linatokea kwenye simu yake. Anaweka PIN yake kuidhinisha.'],
   ['Delivery or collect','Kuletewa au kuchukua',5,'Same-day delivery in Dar es Salaam if ordered before 15:00, or click and collect within two hours.','Kuletewa siku hiyo hiyo Dar es Salaam ikiagizwa kabla ya saa 9 alasiri, au kuagiza na kuchukua dukani ndani ya saa mbili.']]},
 {k:'box',n:['Afya Box member','Mwanachama wa Afya Box'],tag:['0 clicks','mibofyo 0'],target:0,
  who:['The Mushi family has the Mama na Mtoto box on a 12-month plan. Nothing is needed each month unless they want a change.','Familia ya Mushi ina boksi la Mama na Mtoto kwa mpango wa miezi 12. Hakuna kinachohitajika kila mwezi isipokuwa wakitaka kubadilisha kitu.'],
  why:[`Automatic renewal is the most valuable design decision in the business: a member who does nothing stays a member. At an average box of ${tsh(I.members.avg_box)} in the model, every month a family does not cancel is revenue the store does not have to win again.`,`Kuhuisha kiotomatiki ndio uamuzi wa muundo wenye thamani kubwa zaidi katika biashara: mwanachama asiyefanya chochote anabaki mwanachama. Kwa wastani wa boksi wa ${tsh(I.members.avg_box)} kwenye modeli, kila mwezi ambao familia haisitishi ni mapato ambayo duka halihitaji kuyatafuta upya.`],
  steps:[['Customise, if they wish','Kubadilisha, wakipenda',0,'From the 1st to the 18th they can swap between four or five brands or add an item, in the app, on WhatsApp or in the store.','Kuanzia tarehe 1 hadi 18 wanaweza kubadilisha kati ya chapa nne au tano au kuongeza bidhaa, kwenye programu, WhatsApp au dukani.'],
   ['The list locks','Orodha inafungwa',0,'On the 18th, twelve days before month end, the box list locks. A notice on the 17th gives the amount and payment day.','Tarehe 18, siku kumi na mbili kabla ya mwisho wa mwezi, orodha ya boksi inafungwa. Taarifa ya tarehe 17 inataja kiasi na siku ya malipo.'],
   ['Payment request','Ombi la malipo',0,'On the 20th a payment request arrives on the phone and is approved with the PIN. Prepaid 6 and 12-month plans skip this step.','Tarehe 20 ombi la malipo linafika kwenye simu na kuidhinishwa kwa PIN. Mipango ya miezi 6 na 12 iliyolipiwa kabla inaruka hatua hii.'],
   ['Packed and delivered','Inafungwa na kuletwa',0,'Paid boxes are packed from the locked list, photographed and sealed, and delivered on the 1st. Packing and delivery are already inside the price.','Maboksi yaliyolipiwa yanafungwa kutoka orodha iliyofungwa, yanapigwa picha na kufungwa, na yanaletwa tarehe 1. Ufungashaji na usafirishaji tayari vimo ndani ya bei.'],
   ['Points and next check','Pointi na kipimo kijacho',0,'Afya Points (1% of the box price), the saving and the date of the next free check appear in the app.','Pointi za Afya (1% ya bei ya boksi), akiba na tarehe ya kipimo kijacho cha bure vinaonekana kwenye programu.']]},
 {k:'gift',n:['Gift from abroad','Zawadi kutoka nje'],tag:['under 2 min','chini ya dak. 2'],target:120,
  who:['Hamisi, working in Muscat, sends his mother in Temeke the Bibi na Babu box for the month.','Hamisi, anayefanya kazi Muscat, anamtumia mama yake wa Temeke boksi la Bibi na Babu kwa mwezi huu.'],
  why:['Tanzanians abroad already send money home. Afya turns part of it into care that can be checked: the delivery photo is what brings the sender back the next month.','Watanzania walio nje tayari wanatuma pesa nyumbani. Afya inageuza sehemu yake kuwa huduma inayoweza kuthibitishwa: picha ya kufikishwa ndiyo inayomrudisha mtumaji mwezi unaofuata.'],
  steps:[['Choose','Kuchagua',40,'He picks an Afya Box or a gift card for his mother, in the app or on the website.','Anachagua Afya Box au kadi ya zawadi kwa mama yake, kwenye programu au tovuti.'],
   ['Pay','Kulipa',45,'He pays by international card. The price already includes packing and delivery.','Analipa kwa kadi ya kimataifa. Bei tayari inajumuisha ufungashaji na usafirishaji.'],
   ['Message','Ujumbe',25,'He adds his mother’s phone number and a short message.','Anaongeza namba ya simu ya mama yake na ujumbe mfupi.'],
   ['Confirm','Kuthibitisha',5,'Confirmation by email; when the box arrives, he receives a photo of the delivery.','Uthibitisho kwa barua pepe; boksi likifika, anapokea picha ya kufikishwa.']]}]}
const fmtS=s=>s>=60?(lang()==='sw'?`dak. ${Math.floor(s/60)}${s%60?' sek. '+s%60:''}`:`${Math.floor(s/60)} min${s%60?' '+s%60+' s':''}`):(lang()==='sw'?`sek. ${s}`:`${s} s`);
const SEGC=['--green','--green-edge','--gold','--mute','--green-deep'];

/* ---------- styles: tokens only, no shadows, no gradients ---------- */
const CSS=`
.s32 .ab-block>*+*{margin-top:var(--s2)}
.s32 .ab-block>h2+*{margin-top:var(--s3)}
.s32-cap{margin-top:12px;color:var(--mute);font-size:var(--fs-cap);max-width:var(--measure)}
.s32 svg text{font-family:var(--font)}
.s32-chart{display:block;width:100%;height:auto;max-width:980px}
.s32-chart.s32-v{display:none}
@media (max-width:640px){.s32-chart.s32-h{display:none}.s32-chart.s32-v{display:block}}
.s32-jseg{display:flex;flex-wrap:wrap;gap:6px;border:0!important;overflow:visible!important}
.s32-jseg button{border:1px solid var(--line);border-radius:999px}
.s32-jbox{border:1px solid var(--line);background:var(--surface);padding:var(--s3);margin-top:var(--s2)}
.s32-jhead{display:grid;grid-template-columns:1fr auto;gap:var(--s3);align-items:start}
.s32-jhead h3{margin:0!important}
.s32-jt{text-align:right}.s32-jt b{display:block;color:var(--gold);font-size:var(--fs-sub);font-weight:600;font-variant-numeric:tabular-nums}.s32-jt small{color:var(--mute);font-size:var(--fs-cap)}
.s32-bar{position:relative;display:flex;height:30px;margin-top:var(--s3);border:1px solid var(--line);background:var(--bg)}
.s32-bar span{display:flex;align-items:center;justify-content:center;font-size:var(--fs-cap);color:var(--bg);overflow:hidden;white-space:nowrap;border-right:1px solid var(--bg)}
.s32-bar .s32-tg{position:absolute;right:-1px;top:-8px;bottom:-8px;border-right:2px solid var(--gold)}
.s32-steps{list-style:none;padding:0;margin:var(--s3) 0 0;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px}
.s32-steps li{border-top:3px solid var(--sc,var(--green));padding-top:10px}
.s32-steps em{display:block;font-style:normal;color:var(--gold);font-size:var(--fs-cap);font-variant-numeric:tabular-nums}
.s32-steps b{display:block;margin-top:2px}.s32-steps p{margin:4px 0 0;color:var(--mute);font-size:calc(var(--fs-body) - 2px)}
.s32-why{margin-top:var(--s3);border-left:2px solid var(--gold);padding-left:var(--s2);max-width:var(--measure)}
.s32-demo{border:1px solid var(--line);background:var(--surface);padding:var(--s3);margin-top:var(--s3)}
.s32-demo h3{margin-top:0!important}
.s32-sg{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,300px) minmax(0,1fr);gap:var(--s3);align-items:start;margin-top:var(--s2)}
.s32-shelf{display:grid;gap:8px}
.s32-prod{display:grid;grid-template-columns:1fr auto;gap:2px 10px;text-align:left;border:1px solid var(--line);background:var(--bg);color:var(--ink);padding:10px 12px;font:inherit;cursor:pointer}
.s32-prod:hover{border-color:var(--green-edge)}.s32-prod:disabled{opacity:.5;cursor:default}
.s32-prod small{color:var(--mute);font-size:var(--fs-cap)}.s32-prod em{font-style:normal;color:var(--gold);font-variant-numeric:tabular-nums;grid-row:1 / span 2;grid-column:2;align-self:center}
.s32-phone{border:1px solid var(--line);background:var(--bg);padding:10px;min-height:440px;position:relative}
.s32-scr{border:1px solid var(--line);background:var(--surface);min-height:418px;display:flex;flex-direction:column;position:relative;overflow:hidden}
.s32-ah{padding:12px;border-bottom:1px solid var(--line)}.s32-ah small,.s32-ah span{display:block;color:var(--mute);font-size:var(--fs-cap)}.s32-ah b{display:block;margin:2px 0}
.s32-cam{margin:10px 12px;border:1px dashed var(--line);padding:12px;text-align:center;color:var(--mute);font-size:var(--fs-cap)}
.s32-cam.s32-hit{border-color:var(--green-edge);color:var(--ink)}
.s32-items{flex:1;overflow:auto;padding:0 12px;font-size:calc(var(--fs-body) - 2px);max-height:170px}
.s32-it{display:flex;justify-content:space-between;gap:8px;padding:6px 0;border-bottom:1px solid var(--line)}.s32-it b{color:var(--gold);font-weight:400;font-variant-numeric:tabular-nums;white-space:nowrap}
.s32-tot{padding:12px;border-top:1px solid var(--line)}.s32-tot div{display:flex;justify-content:space-between;font-size:var(--fs-cap);color:var(--mute)}.s32-tot div b{color:var(--gold);font-size:var(--fs-sub);font-weight:600}
.s32-tot .ab-btn{width:100%;margin-top:10px}
.s32-ov{position:absolute;inset:0;background:var(--surface);padding:16px;display:none;flex-direction:column;gap:10px}
.s32-ov.on{display:flex;overflow:auto}.s32-ov h4{margin:0}.s32-ov p{margin:0;color:var(--mute);font-size:calc(var(--fs-body) - 2px)}
.s32-pin{display:flex;gap:10px;margin:6px 0}.s32-pin i{width:14px;height:14px;border:1px solid var(--mute);border-radius:50%}.s32-pin i.f{background:var(--green-edge);border-color:var(--green-edge)}
.s32-done{padding:12px;font-size:calc(var(--fs-body) - 2px)}
.s32-msg{border:1px solid var(--line);background:var(--bg);padding:10px;margin-top:8px}
.s32-msg small{display:block;color:var(--mute);font-size:var(--fs-cap);margin-top:4px}
.s32-watch .s32-sw{border:1px solid var(--line);background:var(--bg);padding:12px;margin-bottom:10px}
.s32-sw small{color:var(--mute);font-size:var(--fs-cap)}.s32-sw b{display:block;color:var(--gold);font-size:var(--fs-sub);font-weight:600;font-variant-numeric:tabular-nums}
.s32-sw .s32-track{height:6px;border:1px solid var(--line);margin-top:6px}.s32-sw .s32-track i{display:block;height:100%;width:0;background:var(--green-edge)}
.s32-sw .s32-ver{margin-top:6px;font-size:var(--fs-cap);color:var(--mute)}.s32-sw .s32-ver.ok{color:var(--ink)}
.s32-log{list-style:none;padding:0;margin:0;font-size:var(--fs-cap)}.s32-log li{padding:6px 0;border-top:1px solid var(--line);color:var(--mute)}.s32-log li em{font-style:normal;color:var(--gold);margin-right:8px;font-variant-numeric:tabular-nums}
.s32-ctl{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}
.s32-pos{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);gap:var(--s3);margin-top:var(--s2)}
.s32-lab{color:var(--mute);font-size:var(--fs-cap);margin:0 0 8px}
.s32-till{border:1px solid var(--line);background:var(--bg);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,200px)}
.s32-tabs{padding:10px 10px 0}.s32-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;padding:10px}
.s32-grid button{border:1px solid var(--line);background:var(--surface);color:var(--ink);padding:10px;text-align:left;font:inherit;font-size:calc(var(--fs-body) - 2px);cursor:pointer}
.s32-grid button:hover{border-color:var(--green-edge)}.s32-grid button span{display:block;color:var(--gold);font-variant-numeric:tabular-nums;margin-top:4px}
.s32-bk{border-left:1px solid var(--line);padding:10px;display:flex;flex-direction:column;font-size:calc(var(--fs-body) - 2px)}
.s32-bk .s32-ln{display:flex;justify-content:space-between;gap:6px;padding:5px 0;border-bottom:1px solid var(--line)}
.s32-bk .s32-tt{display:flex;justify-content:space-between;font-weight:600;margin-top:auto;padding-top:8px}.s32-bk .s32-tt span:last-child{color:var(--gold)}
.s32-bk .ab-btn{margin-top:8px;width:100%}
.s32-cd{border:1px solid var(--line);background:var(--green-deep);padding:16px;min-height:280px;font-size:calc(var(--fs-body) - 2px)}
.s32-cd h4{margin:0 0 8px}.s32-cd .s32-ln{display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid var(--line)}
.s32-cd .s32-opts{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:10px}
.s32-cd input[type=tel]{width:100%;margin-top:6px;padding:8px 10px;border:1px solid var(--green-edge);background:var(--bg);color:var(--ink);font:inherit}
.s32-cd label{display:block;margin-top:8px}.s32-cd .ab-btn{margin-top:10px;width:100%}
.s32-qr{width:84px;height:84px;margin-top:10px;border:6px solid var(--ink);background:var(--ink);display:grid;grid-template-columns:repeat(7,1fr)}
.s32-qr i{background:var(--bg)}.s32-qr i.k{background:var(--ink)}
.s32-warn{color:var(--gold)}
.s32 .ab-btn:disabled,.s32 button:disabled{opacity:.45;cursor:default}
.s32-seq{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:10px;list-style:none;padding:0;margin:var(--s3) 0 0}
.s32-seq li{border:1px solid var(--line);background:var(--surface);padding:12px}.s32-seq em{display:block;font-style:normal;color:var(--gold);font-size:var(--fs-cap);font-variant-numeric:tabular-nums}
.s32-seq small{display:block;color:var(--mute);font-size:var(--fs-cap)}.s32-seq b{display:block;margin-top:4px}.s32-seq p{margin:4px 0 0;color:var(--mute);font-size:var(--fs-cap)}
.s32-cal{display:grid;grid-template-columns:repeat(9,minmax(0,1fr));gap:8px;list-style:none;padding:0;margin:var(--s3) 0 0}
.s32-cal li{border:1px solid var(--line);background:var(--surface);padding:10px;font-size:var(--fs-cap)}
.s32-cal li b{display:block;color:var(--gold);font-size:var(--fs-body);font-weight:600}.s32-cal li.s32-lock{border-color:var(--gold)}
.s32-tbl td small{display:block;color:var(--mute);font-size:var(--fs-cap);margin-top:4px}
.s32-tbl td:first-child{min-width:190px}
th.s32-r{text-align:right!important}
@media (max-width:980px){.s32-sg{grid-template-columns:1fr 1fr}.s32-watch{grid-column:1 / -1}.s32-seq{grid-template-columns:repeat(3,minmax(0,1fr))}.s32-cal{grid-template-columns:repeat(3,minmax(0,1fr))}}
@media (max-width:720px){.s32-sg,.s32-pos{grid-template-columns:1fr}.s32-till{grid-template-columns:1fr}.s32-bk{border-left:0;border-top:1px solid var(--line)}
 .s32-steps{grid-template-columns:1fr}.s32-seq{grid-template-columns:1fr 1fr}.s32-jhead{grid-template-columns:1fr}.s32-jt{text-align:left}}`;

/* ---------- primary visual: designed time budget against the target, per journey ---------- */
function chartSVG(v){const J=JOUR().filter(j=>j.target>0),l=lang();
 const title=L('Designed time budget against the target for four timed journeys; the Afya Box member journey needs no clicks at all','Muda uliopangwa dhidi ya lengo kwa safari nne zinazopimwa muda; safari ya mwanachama wa Afya Box haihitaji mbofyo wowote');
 if(!v){const W=980,x0=270,w=W-x0-190,rowH=58,H=40+J.length*rowH+60;
  const rows=J.map((j,i)=>{const y=40+i*rowH,used=j.steps.reduce((t,s)=>t+s[2],0),sc=w/j.target;let x=x0;
   const segs=j.steps.map((s,k)=>{const r=`<rect x="${x.toFixed(1)}" y="${y}" width="${(s[2]*sc).toFixed(1)}" height="22" style="fill:var(${SEGC[k%5]})"><title>${E(T(s[0],s[1]))}: ${E(fmtS(s[2]))}</title></rect>`;x+=s[2]*sc;return r}).join('');
   return `<text x="0" y="${y+16}" font-size="15" style="fill:var(--ink)">${E(T(...j.n))}</text>${segs}
    <line x1="${x0+w}" y1="${y-6}" x2="${x0+w}" y2="${y+28}" style="stroke:var(--gold)" stroke-width="2"/>
    <text x="${x0+w+10}" y="${y+16}" font-size="14" style="fill:var(--gold)">${E(fmtS(used))}</text>
    <text x="${x0+w+10}" y="${y+33}" font-size="12" style="fill:var(--mute)">${E(T('target','lengo'))} ${E(T(...j.tag))}</text>`}).join('');
  return `<svg class="s32-chart s32-h" viewBox="0 0 ${W} ${H}" role="img" aria-label="${title}">
   <text x="${x0}" y="20" font-size="13" style="fill:var(--mute)">${E(T('Each bar is scaled to its own target (gold line); segments are the steps of the journey','Kila mstari umepimwa kwa lengo lake (mstari wa dhahabu); vipande ni hatua za safari'))}</text>
   ${rows}<line x1="0" y1="${H-44}" x2="${W}" y2="${H-44}" style="stroke:var(--line)"/>
   <text x="0" y="${H-18}" font-size="15" style="fill:var(--ink)">${E(T('Afya Box member','Mwanachama wa Afya Box'))}</text>
   <text x="${x0}" y="${H-18}" font-size="15" style="fill:var(--gold)">${E(T('0 clicks a month: renewal, packing and delivery run on their own','Mibofyo 0 kwa mwezi: kuhuisha, kufunga na kuleta vinajiendesha'))}</text></svg>`}
 const W=340,rowH=92,H=30+J.length*rowH+70,x0=0,w=270;
 const rows=J.map((j,i)=>{const y=30+i*rowH,used=j.steps.reduce((t,s)=>t+s[2],0),sc=w/j.target;let x=x0;
  const segs=j.steps.map((s,k)=>{const r=`<rect x="${x.toFixed(1)}" y="${y+12}" width="${(s[2]*sc).toFixed(1)}" height="20" style="fill:var(${SEGC[k%5]})"/>`;x+=s[2]*sc;return r}).join('');
  return `<text x="0" y="${y}" font-size="15" style="fill:var(--ink)">${E(T(...j.n))}</text>${segs}<line x1="${w}" y1="${y+6}" x2="${w}" y2="${y+38}" style="stroke:var(--gold)" stroke-width="2"/>
   <text x="0" y="${y+54}" font-size="14" style="fill:var(--gold)">${E(fmtS(used))}</text><text x="${w}" y="${y+54}" font-size="13" text-anchor="end" style="fill:var(--mute)">${E(T('target','lengo'))} ${E(T(...j.tag))}</text>`}).join('');
 return `<svg class="s32-chart s32-v" viewBox="0 0 ${W} ${H}" role="img" aria-label="${title}">${rows}
  <text x="0" y="${H-40}" font-size="15" style="fill:var(--ink)">${E(T('Afya Box member','Mwanachama wa Afya Box'))}</text><text x="0" y="${H-18}" font-size="14" style="fill:var(--gold)">${E(T('0 clicks a month','Mibofyo 0 kwa mwezi'))}</text></svg>`}

function journeyBox(i){const j=JOUR()[i],used=j.steps.reduce((t,s)=>t+s[2],0);
 const bar=j.target===0?`<div class="s32-bar"><span style="width:100%;background:var(--green-deep);color:var(--ink)">${L('Customer effort each month: 0 clicks. Everything below is done by the system.','Juhudi za mteja kila mwezi: mibofyo 0. Kila kitu hapa chini kinafanywa na mfumo.')}</span></div>`
  :`<div class="s32-bar" role="img" aria-label="${L(`Time budget ${fmtS(used)} against a target of ${T(...j.tag)}`,`Muda uliopangwa ${fmtS(used)} dhidi ya lengo la ${T(...j.tag)}`)}">${j.steps.map((s,k)=>`<span style="width:${(s[2]/j.target*100).toFixed(2)}%;background:var(${SEGC[k%5]})">${s[2]/j.target>.12?E(fmtS(s[2])):''}</span>`).join('')}<i class="s32-tg" aria-hidden="true"></i></div>`;
 return `<div class="s32-jhead"><div><h3>${E(T(...j.n))}</h3><p class="ab-mute" style="margin-top:6px">${E(T(...j.who))} ${exm()}</p></div>
  <div class="s32-jt"><b>${j.target===0?'0':E(fmtS(used))}</b><small>${j.target===0?L('clicks needed','mibofyo inayohitajika'):L(`designed budget · target ${T(...j.tag)}`,`muda uliopangwa · lengo ${T(...j.tag)}`)}</small></div></div>
  ${bar}<ol class="s32-steps">${j.steps.map((s,k)=>`<li style="--sc:var(${SEGC[k%5]})"><em>${String(k+1).padStart(2,'0')} · ${j.target===0?L('automatic','kiotomatiki'):E(fmtS(s[2]))}</em><b>${E(T(s[0],s[1]))}</b><p>${E(T(s[3],s[4]))}</p></li>`).join('')}</ol>
  <p class="s32-why"><b>${L('Why it matters to the business','Kwa nini ni muhimu kwa biashara')}.</b> ${E(T(...j.why))}</p>`}

/* ---------- scan-and-go demo ---------- */
function scanDemo(){const P=shelf();if(!P.length)return `<p class="ab-notice">${L('The shelf prices for this demo are not available.','Bei za rafu za jaribio hili hazipatikani.')}</p>`;
 return `<div class="s32-demo" id="s32sg"><h3>${L('Try it: scan-and-go','Jaribu: changanua-uende')}</h3>
  <p class="ab-mute">${L('Tap products on the shelf to scan them into the phone basket, then press Pay and approve the mobile-money request with a PIN. The stopwatch times the payment from the moment Pay is pressed. “Play the demo” runs it for you. Simulated payment; prices are shelf prices from the box data in section 3.5.','Gusa bidhaa rafuni kuzichanganua kwenye kikapu cha simu, kisha bonyeza Lipa na uidhinishe ombi la pesa kwa simu kwa PIN. Saa inapima malipo tangu Lipa inapobonyezwa. “Endesha jaribio” inakufanyia. Malipo ni ya kuigiza; bei ni bei za rafu kutoka taarifa za maboksi katika sehemu ya 3.5.')} ${cite('box')}</p>
  <div class="s32-sg">
   <div class="s32-shelf" role="group" aria-label="${L('The shelf: tap to scan','Rafu: gusa kuchanganua')}">${P.map((x,i)=>`<button type="button" class="s32-prod" data-s32p="${i}"><span><b>${E(T(x.en,x.sw))}</b></span><em>${tsh(x.price)}</em><small>${E(x.brand)} · ${E(T(x.zone,x.zsw))}${x.status&&STATUS[x.status]?' · '+E(T(...STATUS[x.status])):''}</small></button>`).join('')}</div>
   <div class="s32-phone"><div class="s32-scr">
    <div class="s32-ah"><small>${L('Afya Basics · scan and go','Afya Basics · changanua uende')}</small><b>${L('Welcome, Juma','Karibu, Juma')}</b><span>${L('Store #1 · Dar es Salaam','Duka #1 · Dar es Salaam')}</span></div>
    <div class="s32-cam" id="s32cam" aria-live="polite">${L('Point at a barcode','Elekeza kwenye msimbopau')}</div>
    <div class="s32-items" id="s32items"></div>
    <div class="s32-tot"><div><span id="s32cnt">0</span><b id="s32sum">TSh 0</b></div><div><span>${L('Afya Points this visit (1%)','Pointi za Afya ziara hii (1%)')}</span><span id="s32pts">0</span></div><button type="button" class="ab-btn ab-pri" id="s32pay" disabled>${L('Pay','Lipa')}</button></div>
    <div class="s32-ov" id="s32m"><h4>${L('How would you like to pay?','Ungependa kulipa vipi?')}</h4><p>${L('Mobile money: a request to this phone','Pesa kwa simu: ombi kwa simu hii')}</p><button type="button" class="ab-btn ab-pri" id="s32mgo">${L('Pay','Lipa')} <span id="s32msum"></span></button><button type="button" class="ab-btn" id="s32mx">${L('Back to basket','Rudi kwenye kikapu')}</button></div>
    <div class="s32-ov" id="s32push"><h4>${L('Mobile-money request','Ombi la pesa kwa simu')}</h4><p id="s32ptxt"></p><div class="s32-pin" id="s32pin"><i></i><i></i><i></i><i></i></div><button type="button" class="ab-btn ab-pri" id="s32appr">${L('Enter PIN and approve','Weka PIN na uidhinishe')}</button><p>${L('Simulated: no real payment','Kuigiza: hakuna malipo halisi')}</p></div>
    <div class="s32-ov" id="s32done"></div>
   </div></div>
   <div class="s32-watch">
    <div class="s32-sw"><small>${L('Time to pay, from tapping Pay','Muda wa kulipa, tangu kubonyeza Lipa')}</small><b id="s32sw">0.0 s</b><div class="s32-track"><i id="s32swb"></i></div><div class="s32-ver" id="s32ver">${L('Target: under 30 seconds','Lengo: chini ya sekunde 30')}</div></div>
    <div class="s32-sw"><small>${L('Whole visit, from the first scan','Ziara nzima, tangu kuchanganua kwa kwanza')}</small><b id="s32vis">0:00</b><div class="s32-ver">${L('Target: find and pay in under 3 minutes','Lengo: tafuta na ulipe chini ya dakika 3')}</div></div>
    <ul class="s32-log" id="s32log" aria-live="polite"></ul>
    <div class="s32-ctl"><button type="button" class="ab-btn ab-pri" id="s32auto">${L('Play the demo','Endesha jaribio')}</button><button type="button" class="ab-btn" id="s32rst">${L('Reset','Anza upya')}</button></div>
   </div></div></div>`}

/* ---------- two-way counter demo ---------- */
function CPRO(){const I=window.MODEL.inputs,S=I.services||{},rate=S.addon_rate||0.9,r500=n=>Math.round(n/500)*500;
 const P=shelf().map(x=>({t:'p',en:x.en,sw:x.sw,v:x.price,src:'box'}));
 const svc=[{t:'s',en:'Free Afya Check, seven measurements',sw:'Afya Check ya bure, vipimo saba',v:0,src:'model'},
  {t:'s',en:'Home delivery today',sw:'Kuletewa nyumbani leo',v:I.online.delivery_fee,src:'model'},
  {t:'s',en:'Dietitian consultation, booked with a partner',sw:'Ushauri wa mtaalamu wa lishe, unaopangwa na mshirika',v:r500(30000*rate),src:'model',est:1}];
 const bx=BOXES().map(b=>({t:'b',en:b[0][0],sw:b[0][1],v:b[1].price,src:b[1].from,est:b[1].from==='model'?1:0}));
 return P.concat(svc,bx)}
function counterDemo(){return `<div class="s32-demo" id="s32pos"><h3>${L('Try it: the two-way counter','Jaribu: kaunta ya skrini mbili')}</h3>
 <p class="ab-mute">${L('You are the adviser. Add products, services or an Afya Box on the adviser screen; the customer screen on the right shows every line as it is added. Offer a free membership, press Charge, then complete the payment as the customer. Simulated payment.','Wewe ni mshauri. Ongeza bidhaa, huduma au Afya Box kwenye skrini ya mshauri; skrini ya mteja upande wa kulia inaonyesha kila mstari unapoongezwa. Toa uanachama wa bure, bonyeza Toza, kisha kamilisha malipo kama mteja. Malipo ni ya kuigiza.')}</p>
 <div class="s32-pos">
  <div><p class="s32-lab">${L('Adviser screen, 15.6-inch touch','Skrini ya mshauri, inchi 15.6 ya kugusa')}</p><div class="s32-till"><div>
   <div class="s32-tabs"><div class="ab-seg" role="group" aria-label="${L('Menu','Menyu')}" id="s32tabs"><button type="button" data-t="p" aria-pressed="true">${L('Products','Bidhaa')}</button><button type="button" data-t="s" aria-pressed="false">${L('Services','Huduma')}</button><button type="button" data-t="b" aria-pressed="false">${L('Afya Box','Afya Box')}</button></div></div>
   <div class="s32-grid" id="s32grid"></div></div>
   <div class="s32-bk"><b>${L('Order','Oda')} A-1042</b><small class="ab-mute" id="s32who"></small><div id="s32lines"></div>
    <div class="s32-tt"><span>${L('Total','Jumla')}</span><span id="s32tot">TSh 0</span></div><small class="ab-mute" id="s32vat"></small>
    <button type="button" class="ab-btn ab-pri" id="s32chg" disabled>${L('Charge','Toza')}</button><button type="button" class="ab-btn" id="s32clr">${L('Clear','Futa')}</button></div></div></div>
  <div><p class="s32-lab">${L('Customer screen, 10.1-inch, facing the customer','Skrini ya mteja, inchi 10.1, inayomwangalia mteja')}</p><div class="s32-cd" id="s32cd" aria-live="polite"></div>
   <p class="s32-cap">${L('The PIN is never typed on the shop’s screens: mobile money is approved on the customer’s own phone.','PIN haiandikwi kamwe kwenye skrini za duka: pesa kwa simu inaidhinishwa kwenye simu ya mteja mwenyewe.')}</p></div></div>
 <p class="s32-cap" id="s32note"></p></div>`}

/* ---------- renewal calendar (R5 §5.1, 30-day month) ---------- */
const CAL=[['1–18','Customise: swap brands, add items','Kubadilisha: badilisha chapa, ongeza bidhaa'],['15','“Change your box by the 18th”','“Badilisha boksi lako kabla ya tarehe 18”'],['17','Renewal notice with the amount (D-3)','Taarifa ya kuhuisha pamoja na kiasi (D-3)'],['18','Box list locks, 12 days before month end','Orodha ya boksi inafungwa, siku 12 kabla ya mwisho wa mwezi',1],['19','“Payment request tomorrow” (D-1)','“Ombi la malipo kesho” (D-1)'],['20','Payment request; PIN on the phone (D0)','Ombi la malipo; PIN kwenye simu (D0)'],['22','Second request and an adviser call (D+2)','Ombi la pili na simu ya mshauri (D+2)'],['25','Grace ends: unpaid boxes paused, never cancelled','Muda wa nyongeza unaisha: maboksi yasiyolipwa yanasimamishwa, hayafutwi'],['1','Paid boxes delivered','Maboksi yaliyolipiwa yanaletwa']];

/* ---------- machines (list prices, original currency, BoT rate) ---------- */
const MACH=[
 ['d3','Counter till with a two-way screen','Mashine ya kaunta yenye skrini mbili','SUNMI D3 PRO: 15.6-inch adviser screen, 10.1-inch customer display, 80 mm printer','SUNMI D3 PRO: skrini ya mshauri ya inchi 15.6, skrini ya mteja ya inchi 10.1, printa ya mm 80',['AED',4428],null],
 ['k2','Self-checkout station, benchmark','Sehemu ya kujilipia, kipimo cha ulinganisho','SUNMI K2 MINI kiosk. The plan is a till-class terminal with a scanner on a steel stand, about TSh 4.0M','Kibanda cha SUNMI K2 MINI. Mpango ni mashine ya kiwango cha kaunta yenye skana juu ya kisimamo cha chuma, takriban TSh milioni 4.0',['AED',12205,14646],4.0e6],
 ['v3','Adviser handheld till','Mashine ya mkononi ya mshauri','SUNMI V3: 6.75-inch screen, 58 mm printer, 4G and Wi-Fi','SUNMI V3: skrini ya inchi 6.75, printa ya mm 58, 4G na Wi-Fi',['AED',2698.8],null],
 [null,'Door-check podium','Kisimamo cha ukaguzi mlangoni','QR scanner and a small status screen','Skana ya QR na skrini ndogo ya hali',null,0.6e6],
 [null,'Cameras, alarm and battery backup','Kamera, kengele na betri ya akiba','CCTV over the tills, door and stockroom; UPS for the tills and lights','CCTV juu ya mashine za malipo, mlango na stoo; UPS kwa mashine na taa',null,1.5e6],
 ['esl','Electronic shelf labels, phase 2','Lebo za rafu za kielektroniki, awamu ya 2','Starter set of about 150 labels with gateway and software','Seti ya kuanzia ya lebo takriban 150 pamoja na lango na programu',['US$',150*8+350+500],null,'US$5–12 a label, gateway US$300–400, software about US$500; mid-points used','US$5–12 kwa lebo, lango US$300–400, programu takriban US$500; viwango vya kati vimetumika'],
 ['lock','Smart parcel locker, phase 2','Kabati janja la vifurushi, awamu ya 2','Outdoor unit on the front, opened by a one-time code','Kabati la nje mbele ya duka, linafunguliwa kwa namba ya mara moja',['US$',16187.5],null],
 ['eas','Anti-theft gate, only if needed','Lango la kuzuia wizi, likihitajika tu','Dual-pedestal gate and tags, installed','Lango la nguzo mbili na lebo, likiwa limefungwa',['US$',3000,7000],null]];
function machRows(){return MACH.map(m=>{let v,orig='';
 if(m[5]){const r=m[5][0]==='AED'?AED:USD,c=m[5][0];if(m[5].length===3){v=`${tshM(m[5][1]*r)}–${tshM(m[5][2]*r)}`;orig=`${c} ${m[5][1].toLocaleString('en-US')}–${m[5][2].toLocaleString('en-US')} × ${r.toLocaleString('en-US',{minimumFractionDigits:2})} (${FXD()})`}else{v=tshM(m[5][1]*r);orig=fx(c,m[5][1],r)}}
 const plan=m[6]?`${tshM(m[6])} ${est()}`:'';
 return `<tr><td><b>${L(m[1],m[2])}</b><small>${L(m[3],m[4])}</small></td><td class="ab-n">${v?E(v):''}${orig?`<small>${E(orig)}${m[8]?'. '+L(m[8],m[9]):''}</small>`:''}${plan?(v?'<small>'+L('planned build','ujenzi uliopangwa')+': </small>':'')+plan:''}</td><td>${m[0]?cite(m[0],'bot'):''}</td></tr>`}).join('')}

/* ---------- render ---------- */
function render(s,p,pv,nx){const M=window.MODEL,I=M.inputs,b=M.get('base'),m12=b.months[11],lean=A().isLean(),o=I.online;
 const fee=m12.revenue*FEE,feeModel=m12.payment_fees;
 const J=JOUR();
 return `<article class="ab-sec s32" aria-labelledby="h-s32"><div class="ab-wrap"><style>${CSS}</style>
 <div class="ab-sec-no">${E(s.no)}</div><h1 id="h-s32">${E(s.title)}</h1>
 <p class="ab-summary">${L('Checkout is where most shops lose customers to queues. Afya Basics is designed so that paying takes seconds in every channel: by phone at home, at a counter with a two-way screen, at self-checkout, on an adviser’s handheld or with scan-and-go. The PIN never leaves the customer’s own phone, every sale issues a fiscal receipt to that phone, and every receipt is checked once at the door. Five journeys have written time targets, and the system will measure them every day.','Kaunta ya malipo ndiko maduka mengi yanakopoteza wateja kwa sababu ya foleni. Afya Basics imeundwa ili kulipa kuchukue sekunde chache katika kila njia: kwa simu ukiwa nyumbani, kwenye kaunta yenye skrini mbili, sehemu ya kujilipia, kwenye mashine ya mkononi ya mshauri au kwa changanua-uende. PIN haitoki kamwe kwenye simu ya mteja mwenyewe, kila mauzo yanatoa risiti ya kodi kwenye simu hiyo, na kila risiti inakaguliwa mara moja mlangoni. Safari tano zina malengo ya muda yaliyoandikwa, na mfumo utayapima kila siku.')}</p>

 <figure class="ab-visual">
  <h2 style="margin-top:0!important">${L('Five journeys, each with a time target','Safari tano, kila moja na lengo la muda')}</h2>
  ${chartSVG(0)}${chartSVG(1)}
  <figcaption class="s32-cap">${L('Designed step-by-step time budgets against the written targets. The budgets are design figures, to be measured by the system from opening day. The advice journey uses the seven-measurement Afya Check of section 3.3.','Muda uliopangwa hatua kwa hatua dhidi ya malengo yaliyoandikwa. Muda huu ni wa muundo, na utapimwa na mfumo kuanzia siku ya kufungua. Safari ya ushauri inatumia Afya Check ya vipimo saba ya sehemu ya 3.3.')}</figcaption>
 </figure>

 <div class="ab-body">
  <section class="ab-block"><h2>${L('The cost of a slow checkout','Gharama ya kaunta ya polepole')}</h2>
   <p>${L('Mama Neema lives in Mbezi and carries her six-month-old on her back. She needs medium nappies, wipes and a thermometer. At the first shop she queues for fifteen minutes and is told the size is out of stock. She walks to a second shop for the nappies and buys the thermometer wherever she can, with no way of knowing whether it is accurate.','Mama Neema anaishi Mbezi na amembeba mtoto wake wa miezi sita mgongoni. Anahitaji nepi za saizi ya kati, vitambaa maji na kipimajoto. Katika duka la kwanza anapanga foleni kwa dakika kumi na tano na kuambiwa saizi hiyo imekwisha. Anatembea hadi duka la pili kununua nepi na kununua kipimajoto popote anapoweza, bila njia ya kujua kama kinapima sawasawa.')} ${exm()}</p>
   <p>${L('The receipt shows a few thousand shillings. The real cost includes a bajaji fare, a lost afternoon and no assurance about the thermometer. For the shop the cost is greater: a customer who will try a competitor next time. Two more costs are hidden. A handwritten tag, a carbon-copy receipt and a search for change leave the customer unsure whether the price was fair. And when the queue is long, customers leave; that lost sale never appears in the shop’s books, which makes it the most expensive cost and the least managed.','Risiti inaonyesha shilingi elfu chache. Gharama halisi inajumuisha nauli ya bajaji, mchana uliopotea na kutokuwa na uhakika kuhusu kipimajoto. Kwa duka gharama ni kubwa zaidi: mteja atakayejaribu mshindani wakati ujao. Gharama nyingine mbili zimefichika. Lebo ya bei ya kuandika kwa mkono, risiti ya kunakili kwa kaboni na kutafuta chenji vinamwacha mteja bila uhakika kama bei ilikuwa ya haki. Na foleni ikiwa ndefu, wateja wanaondoka; mauzo hayo yaliyopotea hayaonekani kamwe kwenye vitabu vya duka, jambo linalofanya kuwa gharama kubwa zaidi na isiyosimamiwa kabisa.')}</p>
   <h3>${L('Why the problem can now be solved','Kwa nini tatizo hili sasa linaweza kutatuliwa')}</h3>
   <p>${T(`<b>Customers already pay by phone.</b> Tanzania had 76,466,691 mobile money accounts in December 2025, more than double 2021${cite('tcra')}. A checkout built around the customer’s own phone fits how people already live. <b>Receipts can be digital and legal.</b> TRA accepts fiscal receipts from approved electronic systems, including cloud-based virtual fiscal devices${cite('tra')}, so the receipt can go straight to the customer’s phone. <b>The hardware is affordable.</b> A professional two-screen till lists at about ${tshM(4428*AED)} and a handheld at about ${tshM(2698.8*AED)}${cite('d3','v3','bot')}; the full list is further down.`,`<b>Wateja tayari wanalipa kwa simu.</b> Tanzania ilikuwa na akaunti 76,466,691 za pesa kwa simu Desemba 2025, zaidi ya mara mbili ya mwaka 2021${cite('tcra')}. Kaunta ya malipo iliyojengwa kuzunguka simu ya mteja mwenyewe inaendana na jinsi watu wanavyoishi tayari. <b>Risiti zinaweza kuwa za kidijitali na halali.</b> TRA inakubali risiti za kodi kutoka mifumo ya kielektroniki iliyoidhinishwa, ikiwemo vifaa vya kodi vya mtandaoni (VFD)${cite('tra')}, kwa hiyo risiti inaweza kwenda moja kwa moja kwenye simu ya mteja. <b>Vifaa vinanunulika.</b> Mashine ya kitaalamu ya skrini mbili inauzwa takriban ${tshM(4428*AED)} na ya mkononi takriban ${tshM(2698.8*AED)}${cite('d3','v3','bot')}; orodha kamili iko hapa chini.`)}</p>
  </section>

  <section class="ab-block"><h2>${L('Five ways to pay, none of them a queue','Njia tano za kulipa, hakuna hata moja yenye foleni')}</h2>
   <p>${L('Customers have different needs. A regular wants no contact at all; a walk-in in a hurry may not have the app; someone who has just had a reading explained is already seated with an adviser. Each method removes the queue for a different person, and all five use the same system, the same price and the same fiscal receipt.','Wateja wana mahitaji tofauti. Mteja wa kawaida hataki kuongea na mtu; mteja wa haraka huenda hana programu; aliyeelezwa kipimo chake tayari ameketi na mshauri. Kila njia inaondoa foleni kwa mtu tofauti, na zote tano zinatumia mfumo mmoja, bei moja na risiti ileile ya kodi.')}</p>
   <div class="ab-tw"><table class="ab-t s32-tbl"><thead><tr><th>${L('Way to pay','Njia ya kulipa')}</th><th>${L('How it works','Jinsi inavyofanya kazi')}</th><th>${L('Target','Lengo')}</th></tr></thead><tbody>
    <tr><td><b>${L('Online and WhatsApp','Mtandaoni na WhatsApp')}</b></td><td>${L('“Order again” loads the last basket. M-Pesa, Mixx by Yas, Airtel Money, HaloPesa or card, approved with the PIN on the customer’s own phone. Same-day delivery before 15:00, or collection at the counter.','“Agiza tena” inaleta kikapu cha mwisho. M-Pesa, Mixx by Yas, Airtel Money, HaloPesa au kadi, inaidhinishwa kwa PIN kwenye simu ya mteja mwenyewe. Kuletewa siku hiyo hiyo kabla ya saa 9 alasiri, au kuchukua kaunta.')}</td><td>${L('About 30 seconds to order','Takriban sekunde 30 kuagiza')}</td></tr>
    <tr><td><b>${L('The counter','Kaunta')}</b></td><td>${L('The adviser builds the basket on a 15.6-inch screen; the customer watches every line on a 10.1-inch screen facing them, chooses how to pay and can join membership on the same screen.','Mshauri anajenga kikapu kwenye skrini ya inchi 15.6; mteja anaona kila mstari kwenye skrini ya inchi 10.1 inayomwangalia, anachagua jinsi ya kulipa na anaweza kujiunga na uanachama kwenye skrini hiyo hiyo.')}</td><td>${L('About 20 seconds to pay once the total shows','Takriban sekunde 20 kulipa jumla ikishaonekana')}</td></tr>
    <tr><td><b>${L('Self-checkout','Kujilipia')}</b></td><td>${L('Scan, pay by mobile money or card, receive the receipt and a door QR by SMS. Built for the customer who knows what they want.','Changanua, lipa kwa pesa kwa simu au kadi, pokea risiti na QR ya mlangoni kwa SMS. Imeundwa kwa mteja anayejua anachotaka.')}</td><td>${L('Under 30 seconds','Chini ya sekunde 30')}</td></tr>
    <tr><td><b>${L('Handheld till','Mashine ya mkononi')}</b></td><td>${L('After advice, the adviser takes payment in the lounge or at the Afya Check and prints or texts the receipt. Nobody stands up to queue.','Baada ya ushauri, mshauri anapokea malipo sebuleni au kwenye Afya Check na kuchapisha au kutuma risiti kwa ujumbe. Hakuna anayesimama kupanga foleni.')}</td><td>${L('Advice first, payment last','Ushauri kwanza, malipo mwisho')}</td></tr>
    <tr><td><b>${L('Scan-and-go','Changanua-uende')}</b></td><td>${L('Regular customers scan barcodes with the Afya app as they shop and pay before they reach the door. Try it below.','Wateja wa kawaida wanachanganua misimbopau kwa programu ya Afya wanaponunua na kulipa kabla ya kufika mlangoni. Jaribu hapa chini.')}</td><td>${L('No queue','Hakuna foleni')}</td></tr>
   </tbody></table></div>
   <p>${L('A smart locker on the front of the store, opened with a one-time code valid for 48 hours, would let night-shift nurses and late workers collect at any hour. A branded 17-door unit lists far above the seed budget, so it is a phase 2 item; until then, collection is at the counter during opening hours.','Kabati janja mbele ya duka, linalofunguliwa kwa namba ya mara moja inayodumu saa 48, lingewawezesha wauguzi wa zamu za usiku na wanaochelewa kazini kuchukua mizigo wakati wowote. Kabati lenye chapa la milango 17 linauzwa kwa bei iliyo juu sana ya bajeti ya mtaji wa awali, kwa hiyo ni la awamu ya 2; hadi hapo, mizigo inachukuliwa kaunta wakati duka liko wazi.')} ${cite('lock')}</p>
  </section>

  <section class="ab-block"><h2>${L('How it works: the five journeys','Inavyofanya kazi: safari tano')}</h2>
   <p>${L('Select a journey. The bar shows how its time budget is spent, step by step, against the target (the gold line).','Chagua safari. Mstari unaonyesha jinsi muda wake unavyotumika, hatua kwa hatua, dhidi ya lengo (mstari wa dhahabu).')}</p>
   <div class="ab-seg s32-jseg" role="group" aria-label="${L('Choose a journey','Chagua safari')}">${J.map((j,i)=>`<button type="button" data-s32j="${i}" aria-pressed="${i===0}">${E(T(...j.n))}</button>`).join('')}</div>
   <div class="s32-jbox" id="s32jbox" aria-live="polite">${journeyBox(0)}</div>
  </section>

  <section class="ab-block"><h2>${L('Paying at the counter, step by step','Kulipa kaunta, hatua kwa hatua')}</h2>
   <p>${L('Mama Amani, 29, arrives with her baby asleep in a carrier and brings nappies, wipes and a thermometer to the counter. The whole visit, including a new membership, takes about 90 seconds; paying takes about 20 seconds once the total is shown. No PIN is typed on shop equipment, and the one fiscal receipt arrives on her phone.','Mama Amani, miaka 29, anafika na mtoto wake amelala kwenye mbeleko na kuleta nepi, vitambaa maji na kipimajoto kaunta. Ziara nzima, pamoja na uanachama mpya, inachukua takriban sekunde 90; kulipa kunachukua takriban sekunde 20 jumla ikishaonyeshwa. Hakuna PIN inayoandikwa kwenye vifaa vya duka, na risiti moja ya kodi inafika kwenye simu yake.')} ${exm()}</p>
   <ol class="ab-timeline">
    <li><b>0:00–0:15</b><span>${L('The adviser scans each item (or taps the product photo if a label is damaged). The system reads the one price set centrally, the same as the shelf label and the app, checks stock and adds VAT.','Mshauri anachanganua kila bidhaa (au anagusa picha ya bidhaa lebo ikiwa imeharibika). Mfumo unasoma bei moja iliyowekwa kati, sawa na lebo ya rafu na programu, unakagua stoku na kuongeza VAT.')}</span></li>
    <li><b>0:05–0:20</b><span>${L('Mama Amani reads every line on the screen facing her. Non-members are offered one thing: free Afya Green membership, with points on every purchase and a free Afya Check.','Mama Amani anasoma kila mstari kwenye skrini inayomwangalia. Wasio wanachama wanapewa kitu kimoja: uanachama wa bure wa Afya Green, wenye pointi kwa kila ununuzi na Afya Check ya bure.')}</span></li>
    <li><b>0:20–0:40</b><span>${L('She types her own number on her own screen, enters the four-digit code sent by SMS and ticks consent after reading it. The adviser never types her number or sees the code. Consent is recorded with time and counter, as Tanzania’s Personal Data Protection Act requires.','Anaandika namba yake mwenyewe kwenye skrini yake, anaweka namba ya tarakimu nne iliyotumwa kwa SMS na kuweka alama ya ridhaa baada ya kuisoma. Mshauri haandiki namba yake wala haoni namba ya siri. Ridhaa inarekodiwa pamoja na muda na kaunta, kama Sheria ya Ulinzi wa Taarifa Binafsi ya Tanzania inavyotaka.')}</span></li>
    <li><b>0:40–0:50</b><span>${L('She taps mobile money, card or cash; the adviser presses Charge. The system fixes the amount and sends a payment request through the licensed aggregator to the phone she chose.','Anagusa pesa kwa simu, kadi au taslimu; mshauri anabonyeza Toza. Mfumo unaweka kiasi na kutuma ombi la malipo kupitia mkusanyaji wa malipo mwenye leseni kwenda kwenye simu aliyochagua.')}</span></li>
    <li><b>0:50–1:10</b><span>${L('Her mobile-money provider’s own prompt appears on her phone and she enters her PIN. If nothing happens in 60 seconds, the screen offers to resend, or to pay by card or cash; nothing is charged twice.','Ujumbe wa mtoa huduma wake wa pesa kwa simu unatokea kwenye simu yake na anaweka PIN yake. Kisipotokea kitu ndani ya sekunde 60, skrini inatoa kutuma tena, au kulipa kwa kadi au taslimu; hakuna kinachotozwa mara mbili.')}</span></li>
    <li><b>1:10–1:30</b><span>${L('Paid. Two SMS messages arrive: the fiscal receipt with a QR code, and her welcome with her points and the date of her next free check. Stock, her history and the founders’ 21:00 report update at the same moment.','Imelipwa. Ujumbe wa SMS miwili unafika: risiti ya kodi yenye QR, na ukaribisho wake pamoja na pointi zake na tarehe ya kipimo chake kijacho cha bure. Stoku, historia yake na ripoti ya waanzilishi ya saa 3 usiku vinasasishwa wakati huo huo.')}</span></li></ol>
   ${counterDemo()}
  </section>

  <section class="ab-block"><h2>${L('Scan-and-go and the door check','Changanua-uende na ukaguzi wa mlangoni')}</h2>
   <p>${L('Scan-and-go and self-checkout serve customers who know what they want. Every customer, however they paid, then passes the door check: the receipt’s one-time QR is scanned at a small podium and turns green in about five seconds. The same code can never pass twice. If a code has already been used, the customer is asked politely to step to the counter, where the bag is checked privately, never at the door, and the event is saved with the camera clip for the 21:00 report. The check applies to everyone, so nobody is singled out.','Changanua-uende na kujilipia vinawahudumia wateja wanaojua wanachotaka. Kila mteja, kwa njia yoyote aliyolipa, kisha anapita ukaguzi wa mlangoni: QR ya mara moja ya risiti inachanganuliwa kwenye kisimamo kidogo na kugeuka kijani ndani ya takriban sekunde tano. Namba ileile haiwezi kupita mara mbili. Namba ikiwa imeshatumika, mteja anaombwa kwa adabu kwenda kaunta, ambako mfuko unakaguliwa faraghani, kamwe si mlangoni, na tukio linahifadhiwa pamoja na kipande cha kamera kwa ripoti ya saa 3 usiku. Ukaguzi unamhusu kila mtu, kwa hiyo hakuna anayebaguliwa.')}</p>
   ${scanDemo()}
   <h3>${L('Behind the 30-second payment','Nyuma ya malipo ya sekunde 30')}</h3>
   <p>${L('Between the tap and the receipt, five systems exchange messages in about ten to fifteen seconds; the customer sees only two screens. The timings are design figures, to be measured in the first weeks of trading.','Kati ya kugusa na risiti, mifumo mitano inabadilishana ujumbe ndani ya takriban sekunde kumi hadi kumi na tano; mteja anaona skrini mbili tu. Muda huu ni wa muundo, utapimwa katika wiki za kwanza za biashara.')}</p>
   <ol class="s32-seq">${[['0 s','Customer','Mteja','Taps Pay','Anagusa Lipa','The total is fixed and sent to the Afya system.','Jumla inawekwa na kutumwa kwenye mfumo wa Afya.'],['~1 s','Afya to the provider','Afya kwa mtoa huduma','Payment request','Ombi la malipo','The aggregator sends a prompt to the customer’s phone.','Mkusanyaji anatuma ujumbe kwenye simu ya mteja.'],['~8 s','Customer','Mteja','Enters the PIN','Anaweka PIN','The customer’s only action, on their own phone.','Kitendo pekee cha mteja, kwenye simu yake mwenyewe.'],['~10 s','Provider to Afya','Mtoa huduma kwa Afya','Payment confirmed','Malipo yamethibitishwa','The sale is recorded once.','Mauzo yanarekodiwa mara moja.'],['~11 s','Afya to TRA','Afya kwa TRA','Fiscal receipt','Risiti ya kodi','The virtual fiscal device issues the receipt with its code.','Kifaa cha kodi cha mtandaoni kinatoa risiti pamoja na namba yake.'],['~12 s','Customer','Mteja','SMS or WhatsApp','SMS au WhatsApp','Receipt, points and a “save as monthly” offer.','Risiti, pointi na ofa ya “hifadhi kama ya kila mwezi”.']].map(x=>`<li><em>${x[0]}</em><small>${L(x[1],x[2])}</small><b>${L(x[3],x[4])}</b><p>${L(x[5],x[6])}</p></li>`).join('')}</ol>
  </section>

  <section class="ab-block"><h2>${L('The monthly box: renewal without a queue','Boksi la kila mwezi: kuhuisha bila foleni')}</h2>
   <p>${T(`Tanzania has no general standing-order service for mobile money yet; the Bank of Tanzania lists it as a future improvement${cite('bot25')}. What works on every network today is the payment request: on payment day the member’s phone shows a prompt and the member approves it with the PIN. The calendar puts payment after the box list locks and before packing, so Afya never packs an unpaid box. If a request fails, every message offers the store’s Lipa Namba as a fallback${cite('lipa')}.`,`Tanzania bado haina huduma ya jumla ya maagizo ya kudumu kwa pesa kwa simu; Benki Kuu ya Tanzania inaiorodhesha kama maboresho ya baadaye${cite('bot25')}. Kinachofanya kazi kwenye kila mtandao leo ni ombi la malipo: siku ya malipo simu ya mwanachama inaonyesha ujumbe na mwanachama anaidhinisha kwa PIN. Kalenda inaweka malipo baada ya orodha ya boksi kufungwa na kabla ya kufunga boksi, kwa hiyo Afya haifungi kamwe boksi lisilolipiwa. Ombi likishindwa, kila ujumbe unatoa Lipa Namba ya duka kama njia mbadala${cite('lipa')}.`)}</p>
   <ol class="s32-cal">${CAL.map(c=>`<li${c[3]?' class="s32-lock"':''}><b>${E(T('Day','Siku'))} ${c[0]}</b>${L(c[1],c[2])}</li>`).join('')}</ol>
   <p class="s32-cap">${L('A 30-day month. Members on prepaid 6 and 12-month plans pay once, so the monthly request falls away. Section 3.4 sets out the plans and the pause rules.','Mwezi wa siku 30. Wanachama wa mipango ya miezi 6 na 12 iliyolipiwa kabla wanalipa mara moja, kwa hiyo ombi la kila mwezi linaondoka. Sehemu ya 3.4 inaeleza mipango na kanuni za kusimamisha.')}</p>
  </section>

  <section class="ab-block"><h2>${L('Safe and secure: six layers','Salama na yenye ulinzi: tabaka sita')}</h2>
   <div class="ab-tw"><table class="ab-t s32-tbl"><tbody>
    ${[['PIN','PIN','Approved on the customer’s own phone','Inaidhinishwa kwenye simu ya mteja mwenyewe','Mobile money is a request sent to the customer’s phone. Staff never see, ask for or type a PIN, and every screen says so.','Pesa kwa simu ni ombi linalotumwa kwenye simu ya mteja. Wafanyakazi hawaoni, hawaombi wala hawaandiki PIN, na kila skrini inasema hivyo.'],
     ['Card data','Taarifa za kadi','Never stored by Afya','Haihifadhiwi kamwe na Afya','Cards are processed by a licensed payment provider on its own certified reader. Afya keeps only a reference number.','Kadi zinashughulikiwa na mtoa huduma wa malipo mwenye leseni kwenye kisomaji chake kilichothibitishwa. Afya inatunza namba ya kumbukumbu tu.'],
     ['Receipt','Risiti','A fiscal receipt for every sale','Risiti ya kodi kwa kila mauzo','Each sale is issued through an approved virtual fiscal device and sent by SMS, so the tax record and the customer’s copy always match.','Kila mauzo yanatolewa kupitia kifaa cha kodi cha mtandaoni kilichoidhinishwa na kutumwa kwa SMS, kwa hiyo kumbukumbu ya kodi na nakala ya mteja zinalingana daima.'],
     ['Door','Mlango','One-time QR check','Ukaguzi wa QR wa mara moja','Receipts are confirmed once at the exit; a reused or unknown code shows red. Scan-and-go stays fast and honest.','Risiti zinathibitishwa mara moja mlangoni; namba iliyotumika au isiyojulikana inaonyesha rangi nyekundu. Changanua-uende inabaki ya haraka na ya uaminifu.'],
     ['Cash and cameras','Taslimu na kamera','Little cash, all on camera','Taslimu kidogo, yote mbele ya kamera','CCTV covers the tills, the door and the stockroom. Cash is kept to a minimum, counted by two people and banked daily.','CCTV inafunika mashine za malipo, mlango na stoo. Taslimu inawekwa kwa kiwango cha chini, inahesabiwa na watu wawili na kupelekwa benki kila siku.'],
     ['Refunds and data','Marejesho na taarifa','Back to the source, with consent','Kurudi kulikotoka, kwa ridhaa','Refunds go back only to the wallet or card that paid. Membership data is used only with the customer’s recorded consent.','Marejesho yanarudi tu kwenye pochi au kadi iliyolipa. Taarifa za uanachama zinatumika tu kwa ridhaa ya mteja iliyorekodiwa.']].map((x,i)=>`<tr><td><b>${i+1} · ${L(x[0],x[1])}</b><small>${L(x[2],x[3])}</small></td><td>${L(x[4],x[5])}</td></tr>`).join('')}
   </tbody></table></div>
  </section>

  <section class="ab-block"><h2>${L('The machines and their list prices','Mashine na bei zake za orodha')}</h2>
   <p>${L('Each item is priced from a published list price, before shipping, duty and installation, and converted at the Bank of Tanzania mean rate of 10 November 2026: US$1 = TSh 2,642.50 and AED 1 = TSh 719.48. Final quotations will come from Tanzanian distributors. Which devices open on day one, and how they fit the technology line of the seed, is set out in section 4.1.','Kila kifaa kimepewa bei kutoka bei ya orodha iliyochapishwa, kabla ya usafirishaji, ushuru na ufungaji, na kubadilishwa kwa kiwango cha wastani cha Benki Kuu ya Tanzania cha 10 Novemba 2026: US$1 = TSh 2,642.50 na AED 1 = TSh 719.48. Nukuu za mwisho zitatoka kwa wasambazaji wa Tanzania. Vifaa vipi vinaanza siku ya kwanza, na jinsi vinavyoingia kwenye mstari wa teknolojia wa mtaji wa awali, kumeelezwa katika sehemu ya 4.1.')} ${cite('bot')}</p>
   <div class="ab-tw"><table class="ab-t s32-tbl"><thead><tr><th>${L('Machine','Mashine')}</th><th class="s32-r">${L('Price in TSh','Bei kwa TSh')}</th><th>${L('Source','Chanzo')}</th></tr></thead><tbody>${machRows()}</tbody></table></div>
  </section>

  <section class="ab-block"><h2>${L('Risks and our answer','Hatari na jibu letu')}</h2>
   <div class="ab-tw"><table class="ab-t"><thead><tr><th>${L('Risk','Hatari')}</th><th>${L('Our answer','Jibu letu')}</th></tr></thead><tbody>
    ${[['The mobile-money network is down at the moment of payment.','Mtandao wa pesa kwa simu haufanyi kazi wakati wa kulipa.','The customer switches to card or cash; the till keeps selling offline and sends the fiscal receipt as soon as the line returns. More than one payment route is connected, so one outage never stops all payments.','Mteja anahamia kadi au taslimu; mashine inaendelea kuuza bila mtandao na kutuma risiti ya kodi mara mtandao unaporudi. Zaidi ya njia moja ya malipo imeunganishwa, kwa hiyo hitilafu moja haisimamishi malipo yote.'],
     ['Scan-and-go and self-checkout make it easier to leave without paying.','Changanua-uende na kujilipia vinarahisisha kuondoka bila kulipa.','Every receipt is confirmed once at the door; monitors and other high-value items are shown as demonstration units with stock behind the counter; CCTV covers the tills and the exit. If losses stay above target after six months, an anti-theft gate is added.','Kila risiti inathibitishwa mara moja mlangoni; vipimo na bidhaa nyingine za thamani kubwa vinaonyeshwa kama sampuli na stoku iko nyuma ya kaunta; CCTV inafunika mashine na mlango wa kutokea. Hasara zikibaki juu ya lengo baada ya miezi sita, lango la kuzuia wizi linaongezwa.'],
     ['Equipment costs more once shipped to Dar es Salaam.','Vifaa vinagharimu zaidi vikifika Dar es Salaam.','List prices exclude freight and duty. Two local distributor quotes are required before ordering, and the second self-checkout, shelf labels and the gate wait for phase 2.','Bei za orodha hazijumuishi usafirishaji na ushuru. Nukuu mbili za wasambazaji wa ndani zinahitajika kabla ya kuagiza, na sehemu ya pili ya kujilipia, lebo za rafu na lango vinasubiri awamu ya 2.'],
     ['A customer feels embarrassed by the door check.','Mteja anaona aibu kwa ukaguzi wa mlangoni.','The check applies to everyone and takes about five seconds. A red result is resolved privately at the counter, never at the door.','Ukaguzi unamhusu kila mtu na unachukua takriban sekunde tano. Matokeo mekundu yanashughulikiwa faraghani kaunta, kamwe si mlangoni.'],
     ['Some customers will not want an app.','Baadhi ya wateja hawatataka programu.','No app is required: self-checkout and the adviser’s handheld give the same speed with no download, and WhatsApp ordering works on any smartphone.','Programu haihitajiki: kujilipia na mashine ya mkononi ya mshauri vinatoa kasi ileile bila kupakua kitu, na kuagiza kwa WhatsApp kunafanya kazi kwenye simu janja yoyote.'],
     ['The speed targets have not yet been measured.','Malengo ya kasi bado hayajapimwa.','Every step is time-stamped by the system. The 21:00 daily report shows actual checkout times, so the slowest step is fixed first.','Kila hatua inawekewa muda na mfumo. Ripoti ya kila siku ya saa 3 usiku inaonyesha muda halisi wa malipo, kwa hiyo hatua ya polepole zaidi inarekebishwa kwanza.']].map(r=>`<tr><td>${L(r[0],r[1])}</td><td>${L(r[2],r[3])}</td></tr>`).join('')}
   </tbody></table></div>
  </section>
 </div>

 <section class="ab-block"><h2>${L('Key figures','Takwimu muhimu')}</h2>${A().figsHTML([
  {v:L('under 30 s','chini ya sek. 30'),l:T('Target to pay in store, and to reorder from the phone','Lengo la kulipa dukani, na kuagiza tena kwa simu'),s:L('Design target, measured daily from opening','Lengo la muundo, linapimwa kila siku tangu kufungua')},
  {v:L('under 3 min','chini ya dak. 3'),l:T('Target to find and pay for a known product','Lengo la kutafuta na kulipia bidhaa inayojulikana'),s:L('Walk-in journey: designed budget 2 min 50 s','Safari ya mteja wa dukani: muda uliopangwa dak. 2 sek. 50')},
  {v:'76,466,691',l:T('Mobile money accounts in Tanzania, December 2025','Akaunti za pesa kwa simu Tanzania, Desemba 2025'),s:L('TCRA, via Daily News','TCRA, kupitia Daily News')},
  {v:`≈ ${N('s32fee',fee,'tsh')} ${est()}`,l:T('Payment processing in month 12, at about 2.7% of collections','Gharama za malipo mwezi wa 12, kwa takriban 2.7% ya makusanyo'),s:L('Payment research; aggregator rates not yet confirmed in writing','Utafiti wa malipo; viwango vya mkusanyaji bado havijathibitishwa kwa maandishi')}])}</section>

 <section class="ab-block"><h2>${L('What this costs','Hii inagharimu kiasi gani')}</h2>
  <p class="ab-mute">${lean?L('Start-small option · TSh 150M','Chaguo la kuanza kidogo · TSh milioni 150'):L('Flagship option · TSh 340M','Chaguo la duka kuu · TSh milioni 340')}</p>
  <div class="ab-tw"><table class="ab-t"><thead><tr><th>${L('Line','Mstari')}</th><th class="s32-r">TSh</th><th>${L('Basis','Msingi')}</th></tr></thead><tbody>
   <tr><td>${L('Payment processing, month 12','Gharama za malipo, mwezi wa 12')}</td><td class="ab-n">${N('s32fee2',fee,'tsh')} ${est()}</td><td>${L(`About TSh 2,700 per TSh 100,000 collected (75% mobile money, 10% card, 15% cash, assumed), applied to month-12 revenue of ${tshM(m12.revenue)} in the model`,`Takriban TSh 2,700 kwa kila TSh 100,000 zinazokusanywa (75% pesa kwa simu, 10% kadi, 15% taslimu, makadirio), kwa mapato ya mwezi wa 12 ya ${tshM(m12.revenue)} kwenye modeli`)} ${cite('azam','model')}</td></tr>
   <tr><td>${L('Payment fees carried in the financial model today, month 12','Ada za malipo zilizo kwenye modeli ya fedha leo, mwezi wa 12')}</td><td class="ab-n">${N('s32fee3',feeModel,'tsh')} ${est()}</td><td>${L(`${(I.tax.payment_fees*100).toFixed(1)}% of revenue; the 2.7% line above is the prudent budget until written rate cards arrive`,`${(I.tax.payment_fees*100).toFixed(1)}% ya mapato; mstari wa 2.7% hapo juu ndio bajeti ya tahadhari hadi viwango vya maandishi vipatikane`)} ${cite('model')}</td></tr>
   <tr><td>${L('Delivery fee against rider cost, per online order','Ada ya usafirishaji dhidi ya gharama ya msafirishaji, kwa kila oda ya mtandaoni')}</td><td class="ab-n">${N('s32dm',o.delivery_fee-o.rider_cost_per_order,'tsh')} ${est()}</td><td>${L(`${tsh(o.delivery_fee)} paid by the customer, ${tsh(o.rider_cost_per_order)} cost per order${lean?' (partner riders paid per order)':' (salaried riders: charging and maintenance)'}`,`${tsh(o.delivery_fee)} zinalipwa na mteja, gharama ya ${tsh(o.rider_cost_per_order)} kwa oda${lean?' (wasafirishaji washirika wanaolipwa kwa oda)':' (wasafirishaji wa mshahara: kuchaji na matengenezo)'}`)} ${cite('model')}</td></tr>
   <tr><td>${L('Checkout and security machines','Mashine za malipo na ulinzi')}</td><td class="ab-n">${L('see the list above','tazama orodha hapo juu')}</td><td>${L('One-off; the day-one set and its fit against the seed are in section 4.1','Mara moja; seti ya siku ya kwanza na jinsi inavyoingia kwenye mtaji wa awali viko katika sehemu ya 4.1')}</td></tr>
  </tbody></table></div>
  <p class="s32-cap">${L('Payment and delivery lines follow the funding option selected.','Mistari ya malipo na usafirishaji inafuata chaguo la ufadhili lililochaguliwa.')}</p>
 </section>

 ${A().openHTML([
  L('Written rate cards from the payment aggregator and one alternative (mobile money, domestic and international cards, settlement time). The AzamPay rates cited earlier could not be checked, so the 2.7% used here is an estimate.','Viwango vya maandishi kutoka kwa mkusanyaji wa malipo na mbadala mmoja (pesa kwa simu, kadi za ndani na za kimataifa, muda wa kupokea fedha). Viwango vya AzamPay vilivyotajwa awali havikuweza kukaguliwa, kwa hiyo 2.7% iliyotumika hapa ni makadirio.'),
  L('Whether Vodacom offers a recurring payment mandate to a retail merchant, which would let renewals run without a monthly PIN.','Kama Vodacom inatoa idhini ya malipo yanayojirudia kwa mfanyabiashara wa rejareja, ambayo ingewezesha kuhuisha bila PIN kila mwezi.'),
  L('Every time budget on this page is a design figure. The system will record actual times from the first trading day.','Kila muda uliopangwa kwenye ukurasa huu ni takwimu ya muundo. Mfumo utarekodi muda halisi tangu siku ya kwanza ya biashara.'),
  L('Local quotes for the till, handheld, self-checkout build and door podium, including freight and duty; the podium, cameras and self-checkout build are estimates.','Nukuu za ndani za mashine ya kaunta, ya mkononi, ujenzi wa sehemu ya kujilipia na kisimamo cha mlangoni, pamoja na usafirishaji na ushuru; kisimamo, kamera na ujenzi wa sehemu ya kujilipia ni makadirio.'),
  L('Box prices in the counter demo come from the box files where these exist; a box without a finished item list uses its planning price in the financial model and is marked as an estimate.','Bei za maboksi kwenye jaribio la kaunta zinatoka kwenye taarifa za maboksi pale zilipo; boksi ambalo orodha yake ya vitu haijakamilika linatumia bei ya mipango kwenye modeli ya fedha na limewekwa alama ya makadirio.')])}

 <div id="abSrc">${A().sourcesHTML(SRC.map(x=>({t:T(x[1],x[2]),u:x[3],chk:x[4]})))}</div>
 ${A().pagerHTML(pv,nx)}
 </div></article>`}

/* ---------- interactions ---------- */
let timers=[],ivs=[];
const later=(f,ms)=>{const t=setTimeout(f,ms);timers.push(t);return t};
const every=(f,ms)=>{const t=setInterval(f,ms);ivs.push(t);return t};
const clearAll=()=>{timers.forEach(clearTimeout);ivs.forEach(clearInterval);timers=[];ivs=[]};
const $=id=>document.getElementById(id);

function initJourneys(){const bs=[...document.querySelectorAll('[data-s32j]')];bs.forEach(b=>b.addEventListener('click',()=>{bs.forEach(x=>x.setAttribute('aria-pressed',String(x===b)));$('s32jbox').innerHTML=journeyBox(+b.dataset.s32j)}))}

function initScan(){if(!$('s32sg'))return;const P=shelf();let basket=[],tPay=0,tVisit=0,swT=null,visT=null,busy=false,auto=false;
 const items=$('s32items'),pay=$('s32pay'),log=$('s32log'),cam=$('s32cam'),prods=[...document.querySelectorAll('[data-s32p]')];
 const total=()=>basket.reduce((a,i)=>a+P[i].price,0);
 const stamp=()=>tVisit?(performance.now()-tVisit)/1000:0;
 const mmss=s=>Math.floor(s/60)+':'+String(Math.floor(s%60)).padStart(2,'0');
 const addLog=t=>{log.insertAdjacentHTML('afterbegin',`<li><em>${mmss(stamp())}</em>${E(t)}</li>`);while(log.children.length>6)log.lastElementChild.remove()};
 const ov=id=>['s32m','s32push','s32done'].forEach(k=>$(k).classList.toggle('on',k===id));
 const paint=()=>{const t=total();$('s32sum').textContent=tsh(t);$('s32cnt').textContent=T(`${basket.length} ${basket.length===1?'item':'items'}`,`bidhaa ${basket.length}`);$('s32pts').textContent=nf(Math.floor(t*0.01));
  pay.disabled=!basket.length;pay.textContent=basket.length?T('Pay ','Lipa ')+tsh(t):T('Pay','Lipa');
  items.innerHTML=basket.length?basket.map(i=>`<div class="s32-it"><span>${E(T(P[i].en,P[i].sw))}</span><b>${tsh(P[i].price)}</b></div>`).join(''):`<p class="ab-mute" style="font-size:var(--fs-cap)">${L('Your basket is empty. Scan a product on the shelf.','Kikapu chako ni tupu. Changanua bidhaa rafuni.')}</p>`;items.scrollTop=items.scrollHeight};
 const scan=i=>{if(busy&&!auto)return;if(!tVisit){tVisit=performance.now();visT=every(()=>{if($('s32vis'))$('s32vis').textContent=mmss(stamp())},250)}
  basket.push(i);cam.classList.add('s32-hit');cam.textContent=T('Scanned: ','Imechanganuliwa: ')+T(P[i].en,P[i].sw);later(()=>{cam.classList.remove('s32-hit');cam.textContent=T('Point at a barcode','Elekeza kwenye msimbopau')},700);addLog(T('Scanned ','Imechanganuliwa ')+T(P[i].en,P[i].sw));paint()};
 prods.forEach(b=>b.addEventListener('click',()=>{if(!busy)scan(+b.dataset.s32p)}));
 const sw=(s)=>{$('s32sw').textContent=(lang()==='sw'?'sek. ':'')+s.toFixed(1)+(lang()==='sw'?'':' s');$('s32swb').style.width=Math.min(100,s/30*100)+'%'};
 pay.addEventListener('click',()=>{if(!basket.length)return;busy=true;prods.forEach(b=>b.disabled=true);tPay=performance.now();swT=every(()=>{if($('s32sw'))sw((performance.now()-tPay)/1000)},100);addLog(T('Tapped Pay','Amegusa Lipa'));$('s32msum').textContent=tsh(total());ov('s32m')});
 $('s32mx').addEventListener('click',()=>{ov(null);busy=false;prods.forEach(b=>b.disabled=false);clearInterval(swT);sw(0)});
 $('s32mgo').addEventListener('click',()=>{addLog(T('Mobile-money request sent','Ombi la pesa kwa simu limetumwa'));$('s32ptxt').textContent=T(`Pay ${tsh(total())} to AFYA BASICS, Store #1. Enter your PIN to approve.`,`Lipa ${tsh(total())} kwa AFYA BASICS, Duka #1. Weka PIN yako kuidhinisha.`);ov(null);later(()=>{ov('s32push');addLog(T('Request received on the phone','Ombi limepokelewa kwenye simu'))},900)});
 $('s32appr').addEventListener('click',()=>{const dots=[...document.querySelectorAll('#s32pin i')],a=$('s32appr');a.disabled=true;dots.forEach((d,k)=>later(()=>d.classList.add('f'),k*180));
  later(()=>{addLog(T('PIN approved','PIN imeidhinishwa'));a.disabled=false;dots.forEach(d=>d.classList.remove('f'));ov(null);
   later(()=>{const s=(performance.now()-tPay)/1000;clearInterval(swT);clearInterval(visT);sw(s);const v=$('s32ver');v.className='s32-ver'+(s<30?' ok':'');
    v.textContent=s<30?T(`Paid in ${s.toFixed(1)} s, under the 30-second target`,`Imelipwa ndani ya sek. ${s.toFixed(1)}, chini ya lengo la sekunde 30`):T(`${s.toFixed(1)} s, over the 30-second target`,`sek. ${s.toFixed(1)}, juu ya lengo la sekunde 30`);
    addLog(T('Fiscal receipt sent by SMS','Risiti ya kodi imetumwa kwa SMS'));const t=total();
    $('s32done').innerHTML=`<h4>${L('Paid','Imelipwa')} ${tsh(t)}</h4><p>${L(`Mobile money · ${basket.length} items · ${s.toFixed(1)} s`,`Pesa kwa simu · bidhaa ${basket.length} · sek. ${s.toFixed(1)}`)}</p>
     <div class="s32-msg">AFYA BASICS · ${L('Store #1, Dar es Salaam','Duka #1, Dar es Salaam')}<br>${L('Receipt','Risiti')} AFY1-000123 · ${L('Total','Jumla')} ${tsh(t)} · ${L('VAT included','VAT imejumuishwa')}<br>${L('Afya Points','Pointi za Afya')} +${nf(Math.floor(t*0.01))}<small>${L('SMS · just now · example receipt','SMS · sasa hivi · risiti ya mfano')}</small></div>
     <div class="s32-msg">${L('Save this basket as a monthly reminder or an Afya Box? Reply 1 for yes.','Hifadhi kikapu hiki kama ukumbusho wa kila mwezi au Afya Box? Jibu 1 kukubali.')}<small>WhatsApp · ${L('just now','sasa hivi')}</small></div>`;
    ov('s32done');addLog(T('Press Reset for a new basket','Bonyeza Anza upya kwa kikapu kipya'));busy=false},1100)},900)});
 const reset=()=>{clearAll();basket=[];tPay=0;tVisit=0;busy=false;auto=false;ov(null);$('s32done').innerHTML='';prods.forEach(b=>b.disabled=false);sw(0);$('s32vis').textContent='0:00';
  const v=$('s32ver');v.className='s32-ver';v.textContent=T('Target: under 30 seconds','Lengo: chini ya sekunde 30');log.innerHTML='';$('s32appr').disabled=false;paint()};
 $('s32rst').addEventListener('click',reset);
 $('s32auto').addEventListener('click',()=>{reset();auto=true;const seq=[0,1,2].filter(i=>i<P.length);seq.forEach((i,k)=>later(()=>scan(i),600+k*1100));const t0=600+seq.length*1100;
  later(()=>pay.click(),t0+500);later(()=>$('s32mgo').click(),t0+2200);later(()=>$('s32appr').click(),t0+5200)});
 paint()}

function initCounter(){if(!$('s32pos'))return;const C=CPRO();let tab='p',bk=[],member=null,stage='basket';
 const g=$('s32grid'),cd=$('s32cd');const tot=()=>bk.reduce((a,i)=>a+C[i].v,0);
 const est1=C.some(x=>x.est);$('s32note').innerHTML=E(T('Product prices are shelf prices from the box data (section 3.5). Service and box prices come from the financial model or the D4 box price','Bei za bidhaa ni bei za rafu kutoka taarifa za maboksi (sehemu ya 3.5). Bei za huduma na maboksi zinatoka kwenye modeli ya fedha au bei ya boksi ya D4'))+(est1?'; '+E(T('lines marked “estimate” are planning prices.','mistari yenye alama ya “makadirio” ni bei za mipango.')):'.');
 const grid=()=>{g.innerHTML=C.map((x,i)=>x.t===tab?`<button type="button" data-s32i="${i}">${E(T(x.en,x.sw))}<span>${x.v?tsh(x.v):L('free','bure')}${x.est?' '+est():''}</span></button>`:'').join('');
  g.querySelectorAll('[data-s32i]').forEach(b=>b.addEventListener('click',()=>{if(stage!=='basket')return;bk.push(+b.dataset.s32i);paint()}))};
 const lines=()=>bk.map(i=>`<div class="s32-ln"><span>${E(T(C[i].en,C[i].sw))}</span><b>${C[i].v?tsh(C[i].v):L('free','bure')}</b></div>`).join('');
 const pts=t=>nf(Math.floor(t*0.01));
 const cust=()=>{const t=tot();
  if(stage==='basket')cd.innerHTML=`<h4>${L('Welcome to Afya Basics','Karibu Afya Basics')}</h4>${bk.length?lines():`<p class="ab-mute">${L('Your items appear here as the adviser adds them.','Bidhaa zako zinaonekana hapa mshauri anapoziongeza.')}</p>`}<div class="s32-ln" style="border:0;margin-top:6px"><span>${L('Total, VAT included','Jumla, VAT imejumuishwa')}</span><b>${tsh(t)}</b></div>${member?`<p>${L(`Afya Green member · +${pts(t)} points on this basket`,`Mwanachama wa Afya Green · pointi +${pts(t)} kwa kikapu hiki`)}</p>`:`<button type="button" class="ab-btn" id="s32join">${L('Join Afya Green, free','Jiunge na Afya Green, bure')}</button>`}`;
  if(stage==='join')cd.innerHTML=`<h4>${L('Join Afya Green, free','Jiunge na Afya Green, bure')}</h4><label>${L('Phone number (example)','Namba ya simu (mfano)')}<input id="s32ph" type="tel" inputmode="tel" value="+255 000 000 000"></label><label style="display:flex;gap:8px;align-items:flex-start"><input type="checkbox" id="s32cons" style="margin-top:4px"> <span>${L('I agree that Afya Basics keeps my purchases and readings to give me points and reminders. I can withdraw at any time.','Ninakubali Afya Basics itunze manunuzi na vipimo vyangu ili kunipa pointi na vikumbusho. Ninaweza kujiondoa wakati wowote.')}</span></label><p id="s32cw" class="s32-warn" hidden>${L('Please read and tick the consent box first.','Tafadhali soma na uweke alama kwenye kisanduku cha ridhaa kwanza.')}</p><button type="button" class="ab-btn ab-pri" id="s32otp">${L('Send the code and join','Tuma namba na ujiunge')}</button>`;
  if(stage==='pay')cd.innerHTML=`<h4>${tsh(t)}</h4><p class="ab-mute">${L('Choose how to pay','Chagua jinsi ya kulipa')}</p><div class="s32-opts"><button type="button" class="ab-btn" data-s32m="mm">${L('Mobile money','Pesa kwa simu')}</button><button type="button" class="ab-btn" data-s32m="card">${L('Card','Kadi')}</button><button type="button" class="ab-btn" data-s32m="cash">${L('Cash','Taslimu')}</button></div>`;
  if(stage==='wait')cd.innerHTML=`<h4>${L('Check your phone','Angalia simu yako')}</h4><p>${L(`A request for ${tsh(t)} to AFYA BASICS has been sent. Approve it with your PIN on your own phone. Afya staff never ask for your PIN.`,`Ombi la ${tsh(t)} kwa AFYA BASICS limetumwa. Liidhinishe kwa PIN yako kwenye simu yako mwenyewe. Wafanyakazi wa Afya hawaombi kamwe PIN yako.`)}</p><button type="button" class="ab-btn ab-pri" id="s32ap">${L('Enter the PIN on my phone (simulated)','Weka PIN kwenye simu yangu (kuigiza)')}</button>`;
  if(stage==='card')cd.innerHTML=`<h4>${L('Tap your card','Gusisha kadi yako')}</h4><p>${L('Hold the card or phone near the provider’s reader. Card details go to the payment provider, never to Afya.','Shikilia kadi au simu karibu na kisomaji cha mtoa huduma. Taarifa za kadi zinaenda kwa mtoa huduma wa malipo, kamwe si kwa Afya.')}</p>`;
  if(stage==='paid'){const q=[1,1,1,0,1,1,1,1,0,1,0,1,0,1,1,1,1,0,1,1,1,0,0,1,0,1,0,0,1,1,1,0,1,1,1,1,0,0,1,0,0,1,1,1,1,0,1,1,1];
   cd.innerHTML=`<h4>${L('Paid','Imelipwa')} ${tsh(t)}</h4><p>${L(`Fiscal receipt sent by SMS${member?` · ${pts(t)} points added`:''}. Show this QR at the door.`,`Risiti ya kodi imetumwa kwa SMS${member?` · pointi ${pts(t)} zimeongezwa`:''}. Onyesha QR hii mlangoni.`)}</p><div class="s32-qr" aria-hidden="true">${q.map(k=>`<i class="${k?'k':''}"></i>`).join('')}</div><button type="button" class="ab-btn" id="s32new">${L('Next customer','Mteja anayefuata')}</button>`}
  const j=$('s32join');if(j)j.addEventListener('click',()=>{stage='join';paint()});
  const o=$('s32otp');if(o)o.addEventListener('click',()=>{if(!$('s32cons').checked){$('s32cw').hidden=false;return}member=$('s32ph').value;stage='basket';paint()});
  cd.querySelectorAll('[data-s32m]').forEach(b=>b.addEventListener('click',()=>{const m=b.dataset.s32m;if(m==='mm'){stage='wait';paint()}else if(m==='card'){stage='card';paint();later(()=>{stage='paid';paint()},1800)}else{stage='paid';paint()}}));
  const a=$('s32ap');if(a)a.addEventListener('click',()=>{a.disabled=true;a.textContent=T('Approved','Imeidhinishwa');later(()=>{stage='paid';paint()},700)});
  const n=$('s32new');if(n)n.addEventListener('click',()=>{bk=[];member=null;stage='basket';paint()})};
 const paint=()=>{if(!$('s32lines'))return;const t=tot();$('s32lines').innerHTML=lines()||`<p class="ab-mute">${L('Tap items to add them.','Gusa bidhaa kuziongeza.')}</p>`;$('s32tot').textContent=tsh(t);$('s32vat').textContent=T('VAT included ','VAT imejumuishwa ')+tsh(t*18/118);
  $('s32who').textContent=member?T('Member · Afya Green','Mwanachama · Afya Green'):T('Customer · walk-in','Mteja · wa kuingia dukani');const c=$('s32chg');c.disabled=!bk.length||stage!=='basket';
  c.textContent=stage==='paid'?T('Paid · receipt sent','Imelipwa · risiti imetumwa'):stage==='basket'?T('Charge ','Toza ')+tsh(t):T('Waiting for the customer','Inasubiri mteja');cust()};
 document.querySelectorAll('#s32tabs [data-t]').forEach(b=>b.addEventListener('click',()=>{tab=b.dataset.t;document.querySelectorAll('#s32tabs [data-t]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));grid()}));
 $('s32chg').addEventListener('click',()=>{if(!bk.length)return;stage='pay';paint()});$('s32clr').addEventListener('click',()=>{bk=[];stage='basket';paint()});
 grid();paint()}

function init(){if(!document.getElementById('s32jbox'))return;initJourneys();initScan();initCounter();
 addEventListener('afya:leave',clearAll,{once:true})}

window.SECTIONS['s3-2']={render,init,v2:true};
})();
