/* 3.8 Digital store and app · v2 on the D2 template.
   Primary visual: Build your box (C6.3) over all 18 boxes in window.AFYA_DATA, priced with the D4 rule (window.AFYA_D4),
   the same way as the package pages in 3.5: medicines and optional items are left out of the shelf value and the saving,
   the taste-of-luxury item is its own line, partner services are charged in the month they are delivered.
   Renewal journey from research R5 (push request with PIN, reminders D-3/D-1/D0/D+2, list lock 12 days before month end,
   5-day grace then pause). Online-channel and member numbers come from MODEL and follow the funding switch (AB.numHTML). */
(function(){
'use strict';
const A=()=>window.AB,T=(e,s)=>A().T(e,s),E=s=>A().E(s),N=(k,v,f)=>A().numHTML(k,v,f),D4=()=>window.AFYA_D4;
const DATA=()=>window.AFYA_DATA||{boxes:{},services:[]};
const sw=()=>window.AFYA_LANG==='sw';
const L=o=>o==null?'':typeof o==='string'?o:(sw()?(o.sw||o.en):(o.en||o.sw))||'';
const tsh=n=>n==null?'—':'TSh '+Math.round(n).toLocaleString('en-US');
const est=()=>`<span class="ab-est">${E(T('estimate','makadirio'))}</span>`;

/* the line-up, in the order of 3.5 (brief B16) */
const ORDER=[['life',['mama-mjamzito','mama-na-mtoto','afya-shule','binti','kijana','afya-glow','afya-men','bibi-na-babu']],
 ['need',['sukari','presha','figo','kupona','huduma-ya-kwanza','nyumbani','afya-siku','afya-kazini','afya-biashara','afya-hoteli']]];
const PLANS=[['m1','1 month','Mwezi 1'],['m6','6 months · Gold','Miezi 6 · Gold'],['m12','12 months · Platinum','Miezi 12 · Platinum']];
const TIERS=[['regular','Regular','Kawaida'],['premium','Premium','Bora'],['luxury','Luxury','Anasa']];

const st={box:'mama-na-mtoto',stage:null,plan:'m6',tier:'regular',pick:{}};

/* ---------- D4 pricing, same rule as 3.5 ---------- */
function brandOf(it){const i=st.pick[st.box+'|'+st.stage+'|'+it.key],bs=it.brands||[];if(i!=null&&bs[i])return bs[i];return bs.find(b=>b.default)||bs[0]||null}
function inPrice(it){return it.kind!=='medicine'&&!it.optional}
function lines(stage){return (stage.items||[]).filter(inPrice).map(it=>{const b=brandOf(it);return {it,b,cost:D4().lineCost(b,it.units)}})}
function luxFor(b,stage,tier){if(tier==='regular')return null;const L2=(b.luxury||[]).filter(x=>x.tier===tier);return L2.find(x=>x.stage===stage.key)||L2[0]||null}
function price(b,stage,plan,tier){const ls=lines(stage),shelf=D4().shelfValue(ls),r=D4().price(shelf,plan,[]),lux=luxFor(b,stage,tier),lp=lux&&lux.price_tsh||0;
 return Object.assign(r,{lux,lp,total:r.total+lp,missing:ls.filter(l=>l.cost==null).length})}
function perLabel(b,stage){const dm=stage&&stage.delivery_mode&&typeof stage.delivery_mode==='object';
 if(dm)return T('per box','kwa boksi');
 const d=(stage&&stage.delivery)||b.delivery;
 return d==='per-trimester'?T('per trimester box','kwa boksi la miezi mitatu'):d==='every-2-months'?T('per two-month box','kwa boksi la miezi miwili'):d==='every-3-months'?T('per three-month box','kwa boksi la miezi mitatu'):T('per month','kwa mwezi')}
function cur(){const b=DATA().boxes[st.box];if(!b)return {};if(!st.stage||!b.stages.some(s=>s.key===st.stage))st.stage=b.stages[0].key;return {b,stage:b.stages.find(s=>s.key===st.stage)}}

/* ---------- Build your box ---------- */
function boxSelect(){return `<label class="s38-f"><span>${E(T('Box','Boksi'))}</span><select id="s38box">${ORDER.map(([g,list])=>`<optgroup label="${E(g==='life'?T('By life stage','Kwa hatua ya maisha'):T('By condition or need','Kwa hali au hitaji'))}">${list.filter(k=>DATA().boxes[k]).map(k=>`<option value="${k}"${k===st.box?' selected':''}>${E(L(DATA().boxes[k].name))}</option>`).join('')}</optgroup>`).join('')}</select></label>`}
function stageSelect(b){return `<label class="s38-f"><span>${E(T('Stage','Hatua'))}</span><select id="s38stage">${b.stages.map(s=>`<option value="${E(s.key)}"${s.key===st.stage?' selected':''}>${E(L(s.label))}</option>`).join('')}</select></label>`}
const seg=(name,list,on,aria)=>`<div class="ab-seg" role="group" aria-label="${E(aria)}">${list.map(x=>`<button type="button" data-${name}="${x[0]}" aria-pressed="${x[0]===on}">${E(T(x[1],x[2]))}</button>`).join('')}</div>`;
function itemRows(stage){return lines(stage).map(({it,b})=>{const bs=it.brands||[],ci=bs.indexOf(b);
 return `<label class="ab-bb"><span>${E(L(it.name))}<small>${E(L(it.qty))}</small></span><select lang="en" data-item="${E(it.key)}" aria-label="${E(T('Brand for','Chapa ya')+' '+L(it.name))}">${bs.map((x,i)=>`<option value="${i}"${i===ci?' selected':''}>${E(x.brand)} · ${E(x.pack||'')} · ${tsh(x.price_tsh)}${x.afya_choice?' · Afya Choice':''}</option>`).join('')}</select></label>`}).join('')}
function outRows(stage){const meds=(stage.items||[]).filter(i=>i.kind==='medicine'),opt=(stage.items||[]).filter(i=>i.kind!=='medicine'&&i.optional);
 if(!meds.length&&!opt.length)return '';
 return `<div class="s38-out">${meds.length?`<p><b>${E(T('From the licensed partner pharmacy, outside the box price:','Kutoka famasia mshirika yenye leseni, nje ya bei ya boksi:'))}</b> ${meds.map(i=>E(L(i.name))).join('; ')}</p>`:''}${opt.length?`<p><b>${E(T('Optional, added only if the member asks, outside the box price:','Hiari, vinaongezwa tu mwanachama akiomba, nje ya bei ya boksi:'))}</b> ${opt.map(i=>E(L(i.name))).join('; ')}</p>`:''}</div>`}
function plansSVG(b,stage){const sh=price(b,stage,'m1',st.tier).shelf;if(!sh)return '';
 const rows=[[T('Shelf value','Thamani ya rafu'),sh,1]].concat(PLANS.map(p=>[T(p[1],p[2]),price(b,stage,p[0],'regular').core,0,p[0]===st.plan]));
 const W=320,lw=118,bw=W-lw-8,rh=26;
 return `<svg class="s38-bars" viewBox="0 0 ${W} ${rows.length*rh+18}" role="img" aria-label="${E(T('Shelf value of the goods against the member price on each plan','Thamani ya bidhaa rafuni ukilinganisha na bei ya mwanachama kwa kila mpango'))}">
 ${rows.map((r,i)=>{const w=Math.max(2,bw*r[1]/sh),y=i*rh+4;return `<text x="0" y="${y+14}" font-size="11" style="fill:var(--mute)">${E(r[0])}</text><rect x="${lw}" y="${y+3}" width="${w.toFixed(1)}" height="14" style="fill:${r[2]?'none':r[3]?'var(--green-edge)':'var(--green)'};stroke:${r[2]?'var(--mute)':'none'}" stroke-width="1"/><text x="${(lw+w-4).toFixed(1)}" y="${y+14}" font-size="10" text-anchor="end" style="fill:${r[2]?'var(--mute)':'var(--ink)'}">${E(Math.round(r[1]).toLocaleString('en-US'))}</text>`}).join('')}
 <line x1="${lw}" y1="0" x2="${lw}" y2="${rows.length*rh+8}" style="stroke:var(--line)" stroke-width="1"/></svg>
 <p class="ab-mute s38-cap">${E(T('Goods only, default brands, TSh. The saving is taken off the shelf value; packing and delivery are inside the member price.','Bidhaa pekee, chapa za kawaida, TSh. Punguzo linatolewa kwenye thamani ya rafu; ufungashaji na usafirishaji viko ndani ya bei ya mwanachama.'))}</p>`}
function sumHTML(){const {b,stage}=cur();if(!b)return '';const r=price(b,stage,st.plan,st.tier),r1=price(b,stage,'m1',st.tier),r12=price(b,stage,'m12',st.tier);
 return `<dl><div><dt>${E(T('Shelf value of the goods','Thamani ya bidhaa rafuni'))}</dt><dd>${tsh(r.shelf)}</dd></div>
 <div><dt>${E(T('Member price, packing and delivery included','Bei ya mwanachama, ufungashaji na usafirishaji ukiwemo'))}</dt><dd class="ab-gold">${tsh(r.core)}</dd></div>
 ${r.lux?`<div><dt>${E(L(r.lux.name))}</dt><dd>${tsh(r.lp)}</dd></div>`:''}
 <div class="ab-tot"><dt>${E(T('Total','Jumla'))} · ${E(perLabel(b,stage))}</dt><dd class="ab-gold">${tsh(r.total)}</dd></div>
 <div><dt>${E(T('Saving against the shelf','Akiba ukilinganisha na rafu'))}</dt><dd>${tsh(r.saving)}</dd></div></dl>
 ${r.missing?`<p class="ab-mute">${E(T(`${r.missing} item(s) have no sourced price yet and are left out.`,`Vitu ${r.missing} bado havina bei yenye chanzo na vimeachwa nje.`))}</p>`:''}
 <p class="ab-mute">${E(T(`On 12 months instead of 1 month this box costs ${tsh(r1.total-r12.total)} less each time it is delivered.`,`Kwa miezi 12 badala ya mwezi 1 boksi hili linagharimu ${tsh(r1.total-r12.total)} pungufu kila linapofikishwa.`))}</p>
 <p class="ab-mute">${E(T('Partner services are added in the month they are delivered, at the partner’s price plus 25% (section 5.2).','Huduma za washirika zinaongezwa katika mwezi zinapotolewa, kwa bei ya mshirika pamoja na 25% (sehemu ya 5.2).'))}</p>
 ${plansSVG(b,stage)}`}
function builderHTML(){const {b,stage}=cur();if(!b)return `<p class="ab-notice">${E(T('Box data is loading.','Taarifa za maboksi zinapakiwa.'))}</p>`;
 return `<div class="s38-ctl">${boxSelect()}${stageSelect(b)}</div>
 <div class="ab-bb-ctl">${seg('plan',PLANS,st.plan,T('Plan','Mpango'))}${seg('tier',TIERS,st.tier,T('Tier','Ngazi'))}</div>
 <div class="ab-bb-grid"><div class="ab-bb-list">${itemRows(stage)}${outRows(stage)}</div><aside class="ab-bb-sum" id="s38sum" aria-live="polite">${sumHTML()}</aside></div>`}

/* ---------- renewal (R5 §5, monthly member; D0 = payment day) ---------- */
const RENEW=[
 ['Days 1–18','Siku 1–18','Customisation window','Kipindi cha kubadilisha boksi','Swap between the 4–5 brands of each item, add or remove extras, in the app, on WhatsApp or in store.','Kubadilisha kati ya chapa 4–5 za kila kitu, kuongeza au kuondoa vitu vya ziada, kwenye programu, WhatsApp au dukani.'],
 ['Day 15','Siku ya 15','“Change your box by the 18th”','“Badilisha boksi lako kabla ya tarehe 18”','A WhatsApp message with a link to next month’s box; an SMS for members without WhatsApp.','Ujumbe wa WhatsApp wenye kiungo cha boksi la mwezi ujao; SMS kwa wanachama wasio na WhatsApp.'],
 ['Day 17 · D-3','Siku ya 17 · D-3','Renewal notice','Taarifa ya kuhuisha uanachama','The amount and the payment day, and “reply PAUSE to skip a month”. SMS and WhatsApp, and email where the member has one.','Kiasi na siku ya malipo, na “jibu PUMZIKA kuruka mwezi mmoja”. SMS na WhatsApp, na barua pepe pale mwanachama anapokuwa nayo.'],
 ['Day 18','Siku ya 18','The box list locks','Orodha ya boksi inafungwa','Twelve days before month end. Packing is planned from the locked list.','Siku kumi na mbili kabla ya mwisho wa mwezi. Ufungashaji unapangwa kutoka orodha iliyofungwa.'],
 ['Day 19 · D-1','Siku ya 19 · D-1','“Tomorrow you will get a payment prompt”','“Kesho utapokea ombi la malipo”','The exact amount is shown, so the prompt is expected.','Kiasi kamili kinaonyeshwa, ili ombi lisimshtue.'],
 ['Day 20 · D0','Siku ya 20 · D0','Payment request with PIN','Ombi la malipo kwa PIN','A push request reaches the member’s mobile-money wallet and the member approves it with their PIN. If it times out, one more try about 4 hours later.','Ombi la malipo linafika kwenye pochi ya pesa ya simu ya mwanachama naye analiidhinisha kwa PIN yake. Likipitwa na muda, jaribio moja zaidi baada ya takriban saa 4.'],
 ['Day 21','Siku ya 21','Paid boxes are packed','Maboksi yaliyolipiwa yanafungashwa','If not yet paid: “pay by Lipa Namba, or reply PAY for a new prompt”, with a card link for relatives paying from abroad.','Kama bado halijalipwa: “lipa kwa Lipa Namba, au jibu LIPA upate ombi jipya”, pamoja na kiungo cha kadi kwa ndugu wanaolipa kutoka nje.'],
 ['Day 22 · D+2','Siku ya 22 · D+2','Second request and an adviser’s call','Ombi la pili na simu ya mshauri','A second push request, and a store adviser phones the member.','Ombi la pili la malipo, na mshauri wa duka anampigia mwanachama simu.'],
 ['Day 25','Siku ya 25','End of grace: pause, not cancel','Mwisho wa muda wa nyongeza: kusimamisha, si kufuta','Still unpaid after 5 days: the box is not sent and the membership is paused. Price and points are kept for 60 days; paying reactivates it, with no penalty.','Bado halijalipwa baada ya siku 5: boksi halitumwi na uanachama unasimamishwa. Bei na pointi zinahifadhiwa kwa siku 60; kulipa kunaurudisha, bila adhabu.'],
 ['Day 1 of the next month','Siku ya 1 ya mwezi unaofuata','Delivery','Kufikisha','Paid boxes reach the door.','Maboksi yaliyolipiwa yanafika mlangoni.']];
function renewHTML(){return `<ol class="ab-timeline s38-tl">${RENEW.map(r=>`<li><b>${E(T(r[0],r[1]))} · ${E(T(r[2],r[3]))}</b><span>${E(T(r[4],r[5]))}</span></li>`).join('')}</ol>`}

const FAIL=[
 ['The prompt timed out','Ombi lilipitwa na muda','One silent retry about 4 hours later','Jaribio moja la kimya baada ya takriban saa 4'],
 ['Not enough balance in the wallet','Salio halitoshi kwenye pochi','A second request on day 22 (D+2) and an adviser’s call','Ombi la pili siku ya 22 (D+2) na simu ya mshauri'],
 ['Wrong PIN, or the member did not respond','PIN si sahihi, au mwanachama hakujibu','“Reply PAY for a new prompt”, or pay the Lipa Namba number directly','“Jibu LIPA upate ombi jipya”, au lipa moja kwa moja kwa namba ya Lipa Namba'],
 ['A relative abroad pays the box','Ndugu aliye nje analipia boksi','A card payment link in every message','Kiungo cha malipo kwa kadi katika kila ujumbe'],
 ['Still unpaid on day 25','Bado halijalipwa siku ya 25','The box waits; the membership is paused, never cancelled; no late fee','Boksi linasubiri; uanachama unasimamishwa, haufutwi kamwe; hakuna faini ya kuchelewa']];

/* ---------- MODEL ---------- */
function numbers(){const M=window.MODEL,I=M.inputs,b=M.get('base'),m=b.months[11],O=I.online;
 return {O,m,churn:I.members.monthly_churn,payRate:I.tax&&I.tax.payment_fees,payY1:b.months.reduce((t,x)=>t+(x.payment_fees||0),0),
  left:b.months.reduce((t,x)=>t+(x.left||0),0),joins:b.months.reduce((t,x)=>t+(x.joins||0),0),members:m.members,online:m.online,share:m.online/m.revenue}}

const CSS=`<style>
.s38 .ab-block>p,.s38 .ab-block>h3{margin-top:var(--s2)}
.s38-ctl{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:var(--s2)}
.s38-f span{display:block;color:var(--mute);font-size:var(--fs-cap);margin-bottom:4px}
.s38-f select{width:100%;background:var(--surface);color:var(--ink);border:1px solid var(--line);padding:10px;font:inherit;font-size:calc(var(--fs-body) - 2px)}
.s38-out{margin-top:var(--s2);font-size:var(--fs-cap);color:var(--mute)}.s38-out p{margin-top:8px}.s38-out b{color:var(--ink);font-weight:400}
.s38-bars{display:block;width:100%;height:auto;margin-top:var(--s2)}.s38-cap{font-size:11px}
.s38-doors{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1px;background:var(--line);border:1px solid var(--line);margin-top:var(--s2)}
.s38-doors div{background:var(--surface);padding:var(--s2)}.s38-doors b{display:block;font-weight:600}.s38-doors span{display:block;margin-top:6px;color:var(--mute);font-size:var(--fs-cap)}
.s38-tl li b{color:var(--ink)}
@media (max-width:860px){.s38-ctl{grid-template-columns:1fr}.s38-doors{grid-template-columns:1fr 1fr}}
</style>`;

const DOORS=[['App','Programu','For members who buy every month: the box, swaps, reminders, the Afya Check history.','Kwa wanachama wanaonunua kila mwezi: boksi, kubadilisha chapa, vikumbusho, historia ya Afya Check.'],
 ['Website','Tovuti','Browse the range, build a box, pay by mobile money or card, including from abroad.','Kuvinjari bidhaa, kujenga boksi, kulipa kwa pesa ya simu au kadi, hata ukiwa nje ya nchi.'],
 ['WhatsApp','WhatsApp','Ask an adviser, order by message, receive reminders and the delivery confirmation.','Kumuuliza mshauri, kuagiza kwa ujumbe, kupokea vikumbusho na uthibitisho wa kufikishwa.'],
 ['SMS','SMS','Works on any phone: reminders, “PAUSE” and “PAY” replies, simple reorders.','Inafanya kazi kwenye simu yoyote: vikumbusho, majibu ya “PUMZIKA” na “LIPA”, kuagiza tena kwa urahisi.']];

const SRC=[
 {t:'Bank of Tanzania, National Payment Systems Annual Report 2025, p. 30 (standing orders for recurring payments listed as a future enhancement)',u:'https://www.bot.go.tz/Publications/Regular/Annual%20Report/en/2026060211494565.pdf',chk:'9 Nov 2026'},
 {t:'Bank of Tanzania, National Payment System Annual Report 2024, §2.1.7 (direct debit within TACH still being introduced)',u:'https://www.bot.go.tz/Publications/Regular/Annual%20Report/sw/2025032515311662.pdf',chk:'9 Nov 2026'},
 {t:'Bank of Tanzania, Customer Experience Guideline for Merchant Payments, May 2023 (one merchant number or QR, “Lipa Namba”)',u:'https://www.bot.go.tz/Publications/Acts,%20Regulations,%20Circulars,%20Guidelines/Guidelines/sw/2023062016582894.pdf',chk:'9 Nov 2026'},
 {t:'Vodacom Tanzania PLC, Annual Integrated Report 2025 (more than 470,000 merchants accept LIPA kwa Simu via M-Pesa)',u:'https://www.vodacom.co.tz/assets/uploads/Vodacom_Tanzania_PLC_Annual_Integrated_Report_2025_f75bdd1d49.pdf',chk:'9 Nov 2026'},
 {t:'python-pesa 0.7, third-party Vodacom Tanzania Open API client (direct-debit mandate endpoints)',u:'https://pypi.org/project/python-pesa/0.7',chk:'9 Nov 2026'},
 {t:'Pesapal API 3.0, recurring payments for Visa and Mastercard (search result; page not opened)',u:'https://developer.pesapal.com/how-to-integrate/e-commerce/api-30-json/recurringpayments',chk:'9 Nov 2026'},
 {t:'ClickPesa engineering blog: USSD push for mobile-money payments (search result; page not opened)',u:'https://medium.com/clickpesa-engineering-blog/get-to-know-ussd-push-for-mobile-money-payments-741da153e5ad',chk:'9 Nov 2026'},
 {t:'Box contents, brand choices and shelf prices: the 18 Afya Box files; each price links to its shop page in section 3.5',u:''},
 {t:'Afya Basics financial model v1.2, base case (online channel, members, payment fees; planning estimates)',u:''}];

function render(s,p,pv,nx){const n=numbers(),O=n.O;
 return `${CSS}<article class="ab-sec s38"><div class="ab-wrap">
 <div class="ab-sec-no">${E(s.no)}</div><h1>${E(s.title)}</h1>
 <p class="ab-summary">${E(T('The digital store is the same store reached from a phone: one range, one price and one stock count through the app, the website, WhatsApp and SMS. Its centre is the Afya Box. Below, any of the 18 boxes can be built item by item, brand by brand, with the price worked out by the same rule as the package pages in 3.5. Then the renewal journey: how a month is paid without standing orders, what happens when a payment fails, and how prepaid plans keep members.','Duka la kidijitali ni duka lilelile linalofikiwa kwa simu: bidhaa zilezile, bei ileile na hesabu ileile ya stoku kupitia programu, tovuti, WhatsApp na SMS. Kiini chake ni Afya Box. Hapa chini, boksi lolote kati ya 18 linaweza kujengwa kitu kwa kitu, chapa kwa chapa, na bei inakokotolewa kwa kanuni ileile ya kurasa za maboksi. Kisha safari ya kuhuisha uanachama: jinsi mwezi unavyolipwa bila maagizo ya kudumu ya benki, kinachotokea malipo yakishindwa, na jinsi mipango ya kulipia mapema inavyowabakiza wanachama.'))}</p>

 <figure class="ab-visual" id="s38bb" aria-label="${E(T('Build your box','Jenga boksi lako'))}">
  <h2>${E(T('Build your box','Jenga boksi lako'))}</h2>
  <p class="ab-mute">${E(T('Choose a box and a stage, then a brand for each item. The price follows one rule: shelf value less 3%, 6% or 9% by plan, to the nearest TSh 500 and never above the shelf value, with packing and delivery included.','Chagua boksi na hatua, kisha chapa kwa kila kitu. Bei inafuata kanuni moja: thamani ya rafu ukiondoa 3%, 6% au 9% kulingana na mpango, kwa TSh 500 iliyo karibu na kamwe isizidi thamani ya rafu, ufungashaji na usafirishaji ukiwemo.'))}</p>
  <div id="s38bbIn">${builderHTML()}</div>
  <figcaption class="ab-mute s38-cap">${E(T('Shelf prices: Tanzanian shops, or Kenyan shops converted at the Bank of Tanzania rate of 10 Nov 2026; each price is linked in section 3.5. Medicines are never in the box price.','Bei za rafu: maduka ya Tanzania, au maduka ya Kenya zilizobadilishwa kwa kiwango cha Benki Kuu ya Tanzania cha 10 Nov 2026; kila bei imeunganishwa na chanzo chake katika sehemu ya 3.5. Dawa hazimo kamwe kwenye bei ya boksi.'))}</figcaption>
 </figure>

 <div class="ab-body">
  <section class="ab-block"><h2>${E(T('One store, four doors, one account','Duka moja, milango minne, akaunti moja'))}</h2>
   <p>${E(T('The digital store is not a second business. It carries one physical store across Dar es Salaam and to relatives abroad without a second rent. Phones in Tanzania range from the newest smartphone to a basic keypad handset, so the store opens through four doors, and all four lead to the same account, the same basket and the same prices. An order started on WhatsApp can be finished in the app; a reminder by SMS can be answered from any phone.','Duka la kidijitali si biashara ya pili. Linapeleka duka moja halisi kote Dar es Salaam na kwa ndugu walioko nje bila kodi ya pili. Simu nchini Tanzania zinaanzia simu janja mpya kabisa hadi simu ya kawaida ya vitufe, hivyo duka linafunguka kupitia milango minne, na yote inaelekea akaunti ileile, kikapu kilekile na bei zilezile. Oda iliyoanzishwa kwenye WhatsApp inaweza kumaliziwa kwenye programu; kikumbusho cha SMS kinaweza kujibiwa kutoka simu yoyote.'))}</p>
   <div class="s38-doors">${DOORS.map(d=>`<div><b>${E(T(d[0],d[1]))}</b><span>${E(T(d[2],d[3]))}</span></div>`).join('')}</div>
   <p>${E(T('Medicines follow their own route. When a member orders a medicine in any of the four doors, the order goes to the licensed partner pharmacy, which checks any prescription, dispenses and seals the bag. The sealed bag travels with the box; Afya Basics never sells or dispenses medicines itself.','Dawa zinafuata njia yake. Mwanachama akiagiza dawa kupitia mlango wowote kati ya minne, oda inakwenda kwa famasia mshirika yenye leseni, ambayo inakagua cheti cha daktari pale kinapohitajika, inatoa dawa na kufunga mfuko. Mfuko uliofungwa unasafiri pamoja na boksi; Afya Basics yenyewe haiuzi wala haitoi dawa kamwe.'))}</p>
  </section>

  <section class="ab-block"><h2>${E(T('Why building the box matters','Kwa nini kujenga boksi ni muhimu'))}</h2>
   <p>${E(T('Every item in a box comes with up to five brands in the same price range, so the cheaper choice is still a registered, safe one. The member can change any of them until the list locks, 12 days before month end. Because the price is worked out from the brands actually chosen, the member sees at once what a change costs, and Afya packs exactly what was paid for.','Kila kitu kwenye boksi kina hadi chapa tano za bei inayolingana, hivyo chaguo la bei nafuu bado ni bidhaa iliyosajiliwa na salama. Mwanachama anaweza kubadilisha chapa yoyote hadi orodha itakapofungwa, siku 12 kabla ya mwisho wa mwezi. Kwa kuwa bei inakokotolewa kutoka chapa zilizochaguliwa kweli, mwanachama anaona papo hapo badiliko linagharimu kiasi gani, na Afya inafungasha hasa kile kilicholipiwa.'))}</p>
   <p>${E(T('Three things stay outside the box price. Medicines are sold by the partner pharmacy at its own price. The “taste of luxury” item of the Premium and Luxury tiers is priced on its own line and is not discounted. Partner services, such as a midwife’s home visit, are charged only in the month they are delivered. Tiers are about what is in the box; Gold and Platinum are plan lengths, and the two are chosen separately above.','Mambo matatu yanabaki nje ya bei ya boksi. Dawa zinauzwa na famasia mshirika kwa bei yake. Kitu cha “ladha ya anasa” cha ngazi za Bora na Anasa kinawekwa bei kwenye mstari wake na hakipunguzwi. Huduma za washirika, kama ziara ya mkunga nyumbani, zinatozwa tu katika mwezi zinapotolewa. Ngazi zinahusu kilichomo kwenye boksi; Gold na Platinum ni urefu wa mpango, na vyote viwili vinachaguliwa kando hapo juu.'))}</p>
  </section>

  <section class="ab-block"><h2>${E(T('Renewal: how a month is paid','Kuhuisha: jinsi mwezi unavyolipwa'))}</h2>
   <p>${E(T('Fully automatic monthly debits are not yet a normal service in Tanzania. The Bank of Tanzania still lists standing orders for recurring payments and subscriptions as a future improvement, and has been building a direct-debit system since 2022. M-Pesa’s developer interface appears to include a direct-debit mandate, but whether a retailer can use it is not yet confirmed. What works today on every network is the push request: on payment day the member’s phone shows a request for the exact amount, and the member approves it with their PIN.','Makato ya kila mwezi yanayojiendesha yenyewe bado si huduma ya kawaida Tanzania. Benki Kuu ya Tanzania bado inataja maagizo ya kudumu ya malipo ya kujirudia na usajili kama uboreshaji wa baadaye, na imekuwa ikijenga mfumo wa makato ya moja kwa moja tangu 2022. Mfumo wa wasanidi wa M-Pesa unaonekana kuwa na kibali cha makato ya moja kwa moja, lakini kama muuzaji wa rejareja anaweza kukitumia bado haijathibitishwa. Kinachofanya kazi leo kwenye mitandao yote ni ombi la malipo: siku ya malipo simu ya mwanachama inaonyesha ombi la kiasi kamili, naye analiidhinisha kwa PIN yake.'))}</p>
   <p>${E(T('So the month is built around that request. The member is reminded to customise the box, the list locks, two reminders announce the payment, the request arrives, and there are two more chances before the box waits. One payment provider connection reaches all the wallets (M-Pesa, Mixx by Yas, Airtel Money, HaloPesa); the merchant number, Lipa Namba, is the fallback the member can pay at any time. Where an operator confirms a mandate, the same calendar runs with an automatic debit in place of the request.','Kwa hiyo mwezi umejengwa kuzunguka ombi hilo. Mwanachama anakumbushwa kubadilisha boksi, orodha inafungwa, vikumbusho viwili vinatangaza malipo, ombi linafika, na kuna nafasi mbili zaidi kabla boksi halijasubirishwa. Muunganisho mmoja na mtoa huduma wa malipo unafikia pochi zote (M-Pesa, Mixx by Yas, Airtel Money, HaloPesa); namba ya mfanyabiashara, Lipa Namba, ni njia mbadala ambayo mwanachama anaweza kulipa wakati wowote. Pale mtandao utakapothibitisha kibali cha makato, kalenda ileile inaendelea kwa makato ya moja kwa moja badala ya ombi.'))}</p>
   <h3>${E(T('A member’s month, day by day','Mwezi wa mwanachama, siku kwa siku'))}</h3>
   ${renewHTML()}
  </section>

  <section class="ab-block"><h2>${E(T('When a payment fails','Malipo yakishindwa'))}</h2>
   <p>${E(T('Afya never packs an unpaid box, and never cancels a member for a missed payment. The reason returned by the payment provider decides the next message, and every message offers the Lipa Namba number. The box waits up to 5 days after payment day; then the membership is paused, with price and points kept for 60 days. There is no late fee.','Afya haifungashi kamwe boksi ambalo halijalipiwa, na haimfuti kamwe mwanachama kwa sababu ya malipo yaliyokosekana. Sababu inayorudishwa na mtoa huduma wa malipo ndiyo inaamua ujumbe unaofuata, na kila ujumbe unatoa namba ya Lipa Namba. Boksi linasubiri hadi siku 5 baada ya siku ya malipo; kisha uanachama unasimamishwa, bei na pointi zikihifadhiwa kwa siku 60. Hakuna faini ya kuchelewa.'))}</p>
   <div class="ab-tw"><table class="ab-t"><thead><tr><th>${E(T('What happened','Kilichotokea'))}</th><th>${E(T('What Afya does next','Afya inafanya nini baadaye'))}</th></tr></thead><tbody>${FAIL.map(f=>`<tr><td>${E(T(f[0],f[1]))}</td><td>${E(T(f[2],f[3]))}</td></tr>`).join('')}</tbody></table></div>
  </section>

  <section class="ab-block"><h2>${E(T('Switching plans, pausing and leaving','Kubadilisha mpango, kusimamisha na kuondoka'))}</h2>
   <p>${E(T('A monthly member is offered the 6-month Gold or 12-month Platinum plan in month 2 and again in month 5. One payment then covers 6 or 12 boxes, replacing 5 or 11 monthly payment requests, each of which could fail. A prepaid plan is renewed with the same reminder sequence, 30 days before it ends. Brands, extras and the tier can be changed every month before the lock, on any plan.','Mwanachama wa kila mwezi anapewa mpango wa miezi 6 (Gold) au miezi 12 (Platinum) katika mwezi wa 2 na tena mwezi wa 5. Malipo moja kisha yanalipia maboksi 6 au 12, badala ya maombi 5 au 11 ya malipo ya kila mwezi, ambayo kila moja lingeweza kushindwa. Mpango wa kulipia mapema unahuishwa kwa mfululizo uleule wa vikumbusho, siku 30 kabla haujaisha. Chapa, vitu vya ziada na ngazi vinaweza kubadilishwa kila mwezi kabla ya kufungwa, kwa mpango wowote.'))}</p>
   <p>${E(T('A monthly member can pause one month at a time, by reply or in the app, before the lock; a Platinum member can pause up to two months. A pause is never a cancellation. A member can cancel at any time, effective from the next month if done before the lock; there is no lock-in on the monthly plan.','Mwanachama wa kila mwezi anaweza kusimamisha mwezi mmoja kwa wakati, kwa kujibu ujumbe au kwenye programu, kabla ya kufungwa; mwanachama wa Platinum anaweza kusimamisha hadi miezi miwili. Kusimamisha si kufuta kamwe. Mwanachama anaweza kufuta wakati wowote, kuanzia mwezi unaofuata kama amefanya hivyo kabla ya kufungwa; hakuna kifungo kwenye mpango wa kila mwezi.'))}</p>
  </section>

  <section class="ab-block"><h2>${E(T('Churn defences, in numbers','Kinga dhidi ya wanachama kuondoka, kwa namba'))}</h2>
   <p>${T(`The financial model assumes that ${Math.round(n.churn*100)}% of members leave each month, a planning figure until the pre-sale gives real data. On that assumption the store ends year 1 with about ${N('s38mem',n.members,'int')} members ${est()} after ${N('s38join',n.joins,'int')} joins and ${N('s38left',n.left,'int')} departures ${est()}. Each prepaid plan removes most of the monthly moments at which a member can drop out, and the saving grows with the plan: 3% on 1 month, 6% on Gold, 9% on Platinum, as the calculator above shows for any box.`,`Modeli ya fedha inakadiria kwamba ${Math.round(n.churn*100)}% ya wanachama wanaondoka kila mwezi, namba ya mpango hadi mauzo ya awali yatakapotoa takwimu halisi. Kwa makadirio hayo duka linamaliza mwaka wa 1 likiwa na takriban wanachama ${N('s38mem',n.members,'int')} ${est()} baada ya wanaojiunga ${N('s38join',n.joins,'int')} na wanaoondoka ${N('s38left',n.left,'int')} ${est()}. Kila mpango wa kulipia mapema unaondoa nyakati nyingi za kila mwezi ambapo mwanachama anaweza kuacha, na akiba inaongezeka kwa mpango: 3% kwa mwezi 1, 6% kwa Gold, 9% kwa Platinum, kama kikokotoo hapo juu kinavyoonyesha kwa boksi lolote.`)}</p>
   <p>${E(T('The other defences are built into the month itself: the box changes with the stage of life, so there is no reason to leave at a milestone; a pause replaces a cancellation; and an adviser calls before any box is held back.','Kinga nyingine zimejengwa ndani ya mwezi wenyewe: boksi linabadilika kulingana na hatua ya maisha, hivyo hakuna sababu ya kuondoka mtoto anapokua au hali inapobadilika; kusimamisha kunachukua nafasi ya kufuta; na mshauri anapiga simu kabla boksi lolote halijasubirishwa.'))}</p>
  </section>

  <section class="ab-block"><h2>${E(T('Paying from abroad','Kulipa ukiwa nje ya nchi'))}</h2>
   <p>${E(T('Relatives abroad pay by Visa or Mastercard through the website. One Tanzanian payment provider documents recurring card billing, which suits a monthly box paid from the UK or the US; a prepaid Gold or Platinum plan paid once by card avoids the recurring step altogether. The payer receives the delivery confirmation; the household receives the box.','Ndugu walioko nje wanalipa kwa Visa au Mastercard kupitia tovuti. Mtoa huduma mmoja wa malipo wa Tanzania ameeleza malipo ya kadi ya kujirudia, yanayofaa boksi la kila mwezi linalolipiwa kutoka Uingereza au Marekani; mpango wa Gold au Platinum unaolipiwa mara moja kwa kadi unaepuka hatua ya kujirudia kabisa. Mlipaji anapokea uthibitisho wa kufikishwa; kaya inapokea boksi.'))}</p>
  </section>
 </div>

 <section class="ab-block"><h2>${E(T('Key figures','Takwimu muhimu'))}</h2>
  ${A().figsHTML([
   {v:'3% · 6% · 9%',l:T('Member saving below shelf on 1, 6 and 12 months, packing and delivery included','Akiba ya mwanachama chini ya bei ya rafu kwa miezi 1, 6 na 12, ufungashaji na usafirishaji ukiwemo'),s:E(T('Afya pricing rule','Kanuni ya bei ya Afya'))},
   {v:T('Day 18','Siku ya 18'),l:T('The box list locks, 12 days before month end','Orodha ya boksi inafungwa, siku 12 kabla ya mwisho wa mwezi'),s:E(T('Renewal design','Muundo wa kuhuisha uanachama'))},
   {v:T('5 days','Siku 5'),l:T('A failed payment waits up to 5 days, then the membership pauses, never cancels','Malipo yaliyoshindwa yanasubiri hadi siku 5, kisha uanachama unasimama, haufutwi'),s:E(T('Renewal design','Muundo wa kuhuisha uanachama'))},
   {v:`${N('s38onl',n.online,'tsh')} ${est()}`,l:T('Online sales in month 12','Mauzo ya mtandaoni mwezi wa 12'),s:E(T('Financial model v1.2, base case','Modeli ya fedha v1.2, hali ya msingi'))}])}
 </section>

 <section class="ab-block"><h2>${E(T('What this costs and earns','Gharama na mapato yake'))}</h2>
  <div class="ab-tw"><table class="ab-t"><thead><tr><th>${E(T('Line','Mstari'))}</th><th>${E(T('Value','Thamani'))}</th></tr></thead><tbody>
   <tr><td>${E(T('Online orders a day by month 12','Oda za mtandaoni kwa siku ifikapo mwezi 12'))}</td><td class="ab-n">${N('s38od',O.orders_day_m12,'int')} ${est()}</td></tr>
   <tr><td>${E(T('Average online basket','Kikapu cha wastani cha mtandaoni'))}</td><td class="ab-n">${tsh(O.basket)} ${est()}</td></tr>
   <tr><td>${E(T('Delivery fee on a single online order, paid by the customer','Ada ya kufikisha oda moja ya mtandaoni, inayolipwa na mteja'))}</td><td class="ab-n">${tsh(O.delivery_fee)} ${est()}</td></tr>
   <tr><td>${E(T('Rider cost per online order','Gharama ya msafirishaji kwa oda moja ya mtandaoni'))}</td><td class="ab-n">${N('s38rc',O.rider_cost_per_order,'tsh')} ${est()}</td></tr>
   <tr><td>${E(T('Online sales in month 12','Mauzo ya mtandaoni mwezi wa 12'))}</td><td class="ab-n">${N('s38onl2',n.online,'tsh')} ${est()}</td></tr>
   <tr><td>${E(T('Share of the store’s month-12 revenue','Sehemu ya mapato ya duka mwezi wa 12'))}</td><td class="ab-n">${N('s38sh',n.share*100,'pct')} ${est()}</td></tr>
   <tr><td>${E(T(`Payment processing in year 1, at ${(n.payRate*100).toFixed(1)}% of collections`,`Gharama za kupokea malipo mwaka wa 1, kwa ${(n.payRate*100).toFixed(1)}% ya makusanyo`))}</td><td class="ab-n">${N('s38pay',n.payY1,'tsh')} ${est()}</td></tr>
  </tbody></table></div>
  <p class="ab-mute" style="margin-top:12px;font-size:var(--fs-cap)">${E(T('Box deliveries carry no separate fee: packing and delivery are inside the box price. The delivery fee applies to single online orders outside the box.','Maboksi hayana ada tofauti ya kufikisha: ufungashaji na usafirishaji viko ndani ya bei ya boksi. Ada ya kufikisha inahusu oda moja moja za mtandaoni nje ya boksi.'))}</p>
 </section>

 ${A().openHTML([
  E(T('Whether a retailer can use M-Pesa’s direct-debit mandate, and on what terms, is to be confirmed with Vodacom; until then the plan runs on the PIN-approved push request.','Kama muuzaji wa rejareja anaweza kutumia kibali cha makato ya moja kwa moja cha M-Pesa, na kwa masharti gani, kinasubiri kuthibitishwa na Vodacom; hadi hapo mpango unaendeshwa kwa ombi la malipo linaloidhinishwa kwa PIN.')),
  E(T('Payment-provider fees are not yet confirmed in writing. The model carries 1.2% of collections; at the published rates found but not yet verified, costs could reach about 2.7%. A signed rate card and settlement times are being requested from the payment providers.','Ada za watoa huduma wa malipo bado hazijathibitishwa kwa maandishi. Modeli inabeba 1.2% ya makusanyo; kwa viwango vilivyochapishwa vilivyopatikana lakini bado havijathibitishwa, gharama zinaweza kufikia takriban 2.7%. Orodha ya viwango iliyosainiwa na muda wa kupokea fedha vinaombwa kutoka kwa watoa huduma wa malipo.')),
  E(T('The reminder calendar, the 5-day grace, the 60-day hold of price and points and the pause rules are Afya’s design; the refund terms for unused prepaid months and a consumer-protection review of the messages are still to be written.','Kalenda ya vikumbusho, muda wa nyongeza wa siku 5, kuhifadhi bei na pointi kwa siku 60 na kanuni za kusimamisha ni muundo wa Afya; masharti ya kurejesha fedha kwa miezi ya kulipia mapema ambayo haijatumika na ukaguzi wa ujumbe kwa mujibu wa sheria za kumlinda mlaji bado vinaandaliwa.')),
  E(T('The 8% monthly departure rate is a planning assumption; no retention rate is claimed until the pre-sale produces data.','Kiwango cha 8% cha wanaoondoka kila mwezi ni makadirio ya mpango; hakuna kiwango cha kubaki kinachodaiwa hadi mauzo ya awali yatoe takwimu.')),
  E(T('The app and website screens are in design. This section shows the logic they run on: the box, the price and the renewal calendar.','Skrini za programu na tovuti ziko katika usanifu. Sehemu hii inaonyesha mantiki zinayoiendesha: boksi, bei na kalenda ya kuhuisha uanachama.'))])}

 ${A().sourcesHTML(SRC)}
 ${A().pagerHTML(pv,nx)}
 </div></article>`}

function redraw(full){const el=document.getElementById(full?'s38bbIn':'s38sum');if(!el)return;el.innerHTML=full?builderHTML():sumHTML()}
function init(){const root=document.getElementById('s38bb');if(!root)return;
 root.addEventListener('click',e=>{const t=e.target.closest('[data-plan],[data-tier]');if(!t)return;
  if(t.dataset.plan)st.plan=t.dataset.plan;else st.tier=t.dataset.tier;
  root.querySelectorAll('[data-plan]').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.plan===st.plan)));
  root.querySelectorAll('[data-tier]').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.tier===st.tier)));redraw(false)});
 root.addEventListener('change',e=>{const s=e.target;
  if(s.id==='s38box'){st.box=s.value;st.stage=null;redraw(true)}
  else if(s.id==='s38stage'){st.stage=s.value;redraw(true)}
  else if(s.dataset&&s.dataset.item){st.pick[st.box+'|'+st.stage+'|'+s.dataset.item]=+s.value;redraw(false)}})}

window.SECTIONS['s3-8']={render,init,v2:true};
})();
