/* 6.2 The customer-funded model · v2 on the D2 template.
   Worked example: one Mama na Mtoto box (months 3–6, repeat month, default brands) priced by window.AFYA_D4 through
   window.AB_S35.priceStage, so every figure equals the 3.5 package page and the D4 rule to the shilling.
   Landed-cost shares (brand / pharm / own) are the planning shares in window.AFYAMB_DATA.COST, labelled estimate.
   Store-level figures come from MODEL and follow the funding switch (AB.numHTML). Helpers from window.AB_S6 (s61.js). */
(function(){
'use strict';
const A=()=>window.AB,T=(e,s)=>A().T(e,s),E=s=>A().E(s),N=(k,v,f)=>A().numHTML(k,v,f),S6=()=>window.AB_S6;
const sw=()=>window.AFYA_LANG==='sw';
const tsh=n=>'TSh '+Math.round(n).toLocaleString('en-US');
const L=o=>o?(sw()?o.sw||o.en:o.en):'';
const sv=()=>{const D=window.AFYA_D4;return D?Math.round(D.SAVING.m1*100)+'–'+Math.round(D.SAVING.m12*100)+'%':''};
const est=()=>`<span class="ab-est">${E(T('estimate','makadirio'))}</span>`;
const sum=a=>a.reduce((t,x)=>t+x,0);
const BOX='mama-na-mtoto',STAGE='b',POINTS=0.01; /* Afya Points: 1% of every box price on every plan (section 3.4) */
const PLANS=[['m1','1 month','Mwezi 1'],['m6','6 months · Gold','Miezi 6 · Gold'],['m12','12 months · Platinum','Miezi 12 · Platinum']];
const CLS={brand:['Branded goods from Tanzanian distributors','Bidhaa zenye chapa kutoka kwa wasambazaji wa Tanzania'],pharm:['Registered health products from licensed wholesalers','Bidhaa za afya zilizosajiliwa kutoka kwa wauzaji wa jumla wenye leseni'],own:['Simple goods imported directly','Bidhaa rahisi zinazoagizwa moja kwa moja']};
let PLAN='m12';

/* ---------- the D4 decomposition of one box ---------- */
function classOf(br){const B=(window.AFYAMB_DATA||{}).B||{},u=br&&br.src&&br.src.u;if(u)for(const k in B)if(B[k][5]===u)return B[k][6];return 'brand'}
function decomp(plan){const D4=window.AFYA_D4,S=window.AB_S35,b=(window.AFYA_DATA||{boxes:{}}).boxes[BOX];if(!D4||!S||!b)return null;
 const stage=b.stages.find(s=>s.key===STAGE)||b.stages[0];
 const keep={box:S.st.box,pick:S.st.pick};let r;try{S.st.box=BOX;S.st.pick={};r=S.priceStage(b,stage,plan,'regular')}finally{S.st.box=keep.box;S.st.pick=keep.pick}
 const COST=(window.AFYAMB_DATA||{}).COST||{brand:.78,pharm:.72,own:.5};
 const lines=(stage.items||[]).filter(it=>it.kind!=='medicine').map(it=>{const br=(it.brands||[]).find(x=>x.default)||(it.brands||[])[0];const c=D4.lineCost(br,it.units);const k=classOf(br);return {it,br,shelf:c,cls:k,landed:c==null?0:c*(COST[k]||COST.brand)}});
 const meds=(stage.items||[]).filter(it=>it.kind==='medicine').length;
 const byCls={};lines.forEach(l=>{byCls[l.cls]=byCls[l.cls]||{shelf:0,landed:0,n:0};byCls[l.cls].shelf+=l.shelf||0;byCls[l.cls].landed+=l.landed;byCls[l.cls].n++});
 const size=stage.box_size||b.box_size||'M',pack=D4.PACKING[size],deliv=D4.DELIVERY;
 const shelfR=Math.round(r.shelf),saving=shelfR-r.core,goods=Math.round(sum(lines.map(l=>l.landed))),pts=Math.round(r.core*POINTS),margin=r.core-goods-pack-deliv-pts;
 return {b,stage,r,lines,byCls,COST,size,pack,deliv,shelfR,saving,goods,pts,margin,meds,core:r.core}}

function svcRows(){const D4=window.AFYA_D4,b=(window.AFYA_DATA||{boxes:{}}).boxes[BOX],S=(window.AFYA_DATA||{}).services||[];if(!b)return [];
 return (b.services||[]).map(k=>S.find(s=>s.key===k)).filter(Boolean).map(s=>{const P=s.partner_price_in_box_tsh;return {s,P,member:P?D4.serviceFee([P]):0,afya:P?D4.serviceFee([P])-P:0}})}

/* ---------- pieces ---------- */
function planSeg(){return `<div class="ab-seg" role="group" aria-label="${E(T('Plan','Mpango'))}">${PLANS.map(p=>`<button type="button" data-s62plan="${p[0]}" aria-pressed="${p[0]===PLAN}">${E(T(p[1],p[2]))}</button>`).join('')}</div>`}
function exampleHTML(){const d=decomp(PLAN);if(!d)return `<p class="ab-notice">${E(T('The box data is not available.','Taarifa za boksi hazipatikani.'))}</p>`;
 const D4=window.AFYA_D4,sv=D4.SAVING[PLAN],W=100,sc=v=>(v/d.shelfR*W);
 const seg=(x,w,c,lab)=>`<rect x="${x.toFixed(3)}" y="0" width="${Math.max(0,w).toFixed(3)}" height="10" style="fill:var(${c})"><title>${E(lab)}</title></rect>`;
 let x=0;const parts=[[d.goods,'--green',T('Goods at landed cost','Bidhaa kwa gharama ya kufikisha')],[d.pack,'--green-deep',T('Packing','Ufungashaji')],[d.deliv,'--green-edge',T('Delivery','Usafirishaji')],[d.pts,'--mute',T('Afya Points','Pointi za Afya')],[d.margin,'--gold',T('Afya margin','Faida ya Afya')]];
 const bar2=parts.map(p=>{const s=seg(x,sc(p[0]),p[1],p[2]);x+=sc(p[0]);return s}).join('')+`<rect x="${x.toFixed(3)}" y="0.5" width="${sc(d.saving).toFixed(3)}" height="9" style="fill:none;stroke:var(--mute)" stroke-width="0.3" stroke-dasharray="1 1"><title>${E(T('Member saving','Akiba ya mwanachama'))}</title></rect>`;
 const leg=parts.map(p=>`<span><i style="background:var(${p[1]})"></i>${E(p[2])}</span>`).join('')+`<span><i style="border:1px dashed var(--mute)"></i>${E(T('Member saving','Akiba ya mwanachama'))}</span>`;
 const row=(l,v,cls,note)=>`<tr${cls?` class="${cls}"`:''}><td>${l}${note?`<br><span class="ab-mute s62-sm">${note}</span>`:''}</td><td class="ab-n">${v}</td></tr>`;
 const clsRows=['brand','pharm','own'].filter(k=>d.byCls[k]).map(k=>row(`&nbsp;&nbsp;${E(T(...CLS[k]))} ${est()}`,tsh(d.byCls[k].landed),'',E(T(`${d.byCls[k].n} lines, shelf value ${tsh(d.byCls[k].shelf)} × ${Math.round(d.COST[k]*100)}%`,`mistari ${d.byCls[k].n}, thamani ya rafu ${tsh(d.byCls[k].shelf)} × ${Math.round(d.COST[k]*100)}%`)))).join('');
 return `<div class="s62-ctl">${planSeg()}</div>
 <p class="s62-stage"><b>Mama na Mtoto · ${E(L(d.stage.label))}</b> <span class="ab-mute">· ${E(T(`box size ${d.size}, default brands, ${d.lines.length} items`,`saizi ya boksi ${d.size}, chapa za kawaida, vitu ${d.lines.length}`))}</span></p>
 <svg class="s62-bar" viewBox="0 0 100 10" preserveAspectRatio="none" width="100%" height="34" role="img" aria-label="${E(T(`Shelf value ${tsh(d.shelfR)}: member price ${tsh(d.core)} and member saving ${tsh(d.saving)}; inside the price, goods ${tsh(d.goods)}, packing ${tsh(d.pack)}, delivery ${tsh(d.deliv)}, points ${tsh(d.pts)}, margin ${tsh(d.margin)}`,`Thamani ya rafu ${tsh(d.shelfR)}: bei ya mwanachama ${tsh(d.core)} na akiba ya mwanachama ${tsh(d.saving)}; ndani ya bei, bidhaa ${tsh(d.goods)}, ufungashaji ${tsh(d.pack)}, usafirishaji ${tsh(d.deliv)}, pointi ${tsh(d.pts)}, faida ${tsh(d.margin)}`))}">${bar2}</svg>
 <div class="s62-leg">${leg}</div>
 <div class="ab-tw"><table class="ab-t s62-dec"><tbody>
  ${row(`<b>${E(T('Shelf value of the goods in the box','Thamani ya rafu ya bidhaa ndani ya boksi'))}</b>`,tsh(d.shelfR),'',E(T('Afya’s shelf prices, each with its source on the 3.5 package page','Bei za rafu za Afya, kila moja na chanzo chake kwenye ukurasa wa boksi wa 3.5')))}
  ${row(E(T(`− Member saving (${Math.round(sv*100)}% on this plan, to the nearest 500, never above shelf)`,`− Akiba ya mwanachama (${Math.round(sv*100)}% kwa mpango huu, hadi 500 iliyo karibu, kamwe si juu ya rafu)`)),'−'+tsh(d.saving))}
  ${row(`<b>${E(T('Member price, packing and delivery included','Bei ya mwanachama, ufungashaji na usafirishaji vimo'))}</b>`,tsh(d.core),'s62-tot')}
  <tr><td colspan="2" class="ab-mute s62-sub">${E(T('What is inside that price','Kilichomo ndani ya bei hiyo'))}</td></tr>
  ${row(E(T('Goods at landed cost','Bidhaa kwa gharama ya kufikisha'))+' '+est(),tsh(d.goods))}
  ${clsRows}
  ${row(E(T(`Packing: the green box at landed cost, size ${d.size}`,`Ufungashaji: boksi la kijani kwa gharama ya kufikisha, saizi ${d.size}`)),tsh(d.pack))}
  ${row(E(T('Delivery to the door','Usafirishaji hadi mlangoni')),tsh(d.deliv))}
  ${row(E(T('Afya Points returned to the member (1% of the price)','Pointi za Afya zinazorudishwa kwa mwanachama (1% ya bei)')),tsh(d.pts))}
  ${row(`<b>${E(T('Afya margin on this box','Faida ya Afya kwa boksi hili'))}</b> ${est()}`,`${tsh(d.margin)} · ${(d.margin/d.core*100).toFixed(1)}%`,'s62-tot')}
 </tbody></table></div>
 <p class="ab-mute s62-cap">${E(T(`Prices from the D4 rule, identical to section 3.5. Check: member price − goods − packing − delivery − points = ${tsh(d.margin)} ${d.margin>=0?'≥ 0, so this box can be delivered every month on this plan':'< 0, so this box is delivered less often or collected in store'}. ${d.meds?'Medicines in this stage are sold by the licensed partner pharmacy and are not in the price.':'No medicines in this stage; medicines are always sold by the licensed partner pharmacy, outside the box price.'} The price includes VAT on taxable goods; the financial model deducts it.`,`Bei kutoka kanuni ya D4, sawa kabisa na sehemu ya 3.5. Ukaguzi: bei ya mwanachama − bidhaa − ufungashaji − usafirishaji − pointi = ${tsh(d.margin)} ${d.margin>=0?'≥ 0, hivyo boksi hili linaweza kupelekwa kila mwezi kwa mpango huu':'< 0, hivyo boksi hili linapelekwa mara chache zaidi au linachukuliwa dukani'}. ${d.meds?'Dawa katika hatua hii zinauzwa na famasia mshirika yenye leseni na hazimo kwenye bei.':'Hakuna dawa katika hatua hii; dawa daima zinauzwa na famasia mshirika yenye leseni, nje ya bei ya boksi.'} Bei inajumuisha VAT kwa bidhaa zinazotozwa; modeli ya fedha inaitoa.`))}</p>`}

function servicesHTML(){const R=svcRows(),D4=window.AFYA_D4,d=decomp(PLAN),I=window.MODEL.inputs.services;
 const pick=R.find(x=>x.s.key==='baby-massage')||R.find(x=>x.P);
 const ex=pick&&d?D4.price(d.r.shelf,PLAN,[pick.P]):null;
 return `<div class="ab-tw"><table class="ab-t"><thead><tr><th>${E(T('Partner service in this box','Huduma ya mshirika katika boksi hili'))}</th><th>${E(T('Walk-in price','Bei ya kawaida'))}</th><th>${E(T('Partner price to Afya','Bei ya mshirika kwa Afya'))}</th><th>${E(T('Member pays in the box (× 1.25)','Mwanachama analipa ndani ya boksi (× 1.25)'))}</th><th>${E(T('Afya keeps','Afya inabaki na'))}</th></tr></thead><tbody>
 ${R.map(x=>`<tr><td><b>${E(L(x.s.name))}</b></td><td class="ab-n">${x.s.walkin_tsh?tsh(x.s.walkin_tsh)+' '+est():'—'}</td><td class="ab-n">${x.P?tsh(x.P):'—'}</td><td class="ab-n">${x.P?tsh(x.member):E(T('Free, in store','Bure, dukani'))}</td><td class="ab-n">${x.P?tsh(x.afya):'—'}</td></tr>`).join('')}
 </tbody></table></div>
 <p class="ab-mute s62-cap">${E(T(`Partner price = the negotiated member rate, about ${Math.round(I.member_rate*100)}% of the walk-in price in return for prepaid, guaranteed bookings; member price = partner price × ${1+I.markup}, to the nearest 500 (D4). Partner prices are planning figures until partners quote.`,`Bei ya mshirika = kiwango cha wanachama kilichokubaliwa, takriban ${Math.round(I.member_rate*100)}% ya bei ya kawaida kwa malipo ya mapema na nafasi zilizohakikishwa; bei ya mwanachama = bei ya mshirika × ${1+I.markup}, hadi 500 iliyo karibu (D4). Bei za washirika ni takwimu za mipango hadi washirika watakapotoa bei.`))}</p>
 ${ex?`<p>${T(`In a month when one ${E(L(pick.s.name)).toLowerCase()} is delivered, the member pays the box price ${tsh(ex.core)} plus the service fee ${tsh(ex.service)}: ${tsh(ex.total)} for that month. The partner receives its full price of ${tsh(pick.P)}; the member still pays less than the walk-in price of ${tsh(pick.s.walkin_tsh)}; Afya earns ${tsh(pick.afya)} for booking, reminders and follow-up. All three parties gain, which is the test the service price has to pass.`,`Katika mwezi ambao ${E(L(pick.s.name)).toLowerCase()} kimoja kinatolewa, mwanachama analipa bei ya boksi ${tsh(ex.core)} pamoja na ada ya huduma ${tsh(ex.service)}: ${tsh(ex.total)} kwa mwezi huo. Mshirika anapokea bei yake yote ya ${tsh(pick.P)}; mwanachama bado analipa chini ya bei ya kawaida ya ${tsh(pick.s.walkin_tsh)}; Afya inapata ${tsh(pick.afya)} kwa kupanga, kukumbusha na kufuatilia. Pande zote tatu zinanufaika, na hicho ndicho kipimo ambacho bei ya huduma inapaswa kupita.`)}</p>`:''}`}

const COVER=[['rent',['Rent','Kodi ya pango'],['The gross margin on every basket, box and online order: all three are served from the same floor.','Faida ghafi ya kila manunuzi, boksi na oda ya mtandaoni: zote tatu zinahudumiwa kutoka sakafu ileile.']],
 ['staff',['Store staff','Wafanyakazi wa duka'],['Basket and box margin pay the advisers; the delivery fee and the delivery element of every box pay for the riders’ work.','Faida ya manunuzi na ya boksi inawalipa washauri; ada ya usafirishaji na sehemu ya usafirishaji ya kila boksi zinalipia kazi ya wasafirishaji.']],
 ['utilities_internet',['Power, water and internet','Umeme, maji na intaneti'],['Mainly the basket margin, with a share from boxes.','Hasa faida ya manunuzi, pamoja na sehemu kutoka maboksi.']],
 ['systems_software',['Systems and software','Mifumo na programu'],['One connected system runs the till, members and boxes, so baskets and boxes pay for it together.','Mfumo mmoja uliounganishwa unaendesha mauzo, wanachama na maboksi, hivyo manunuzi na maboksi vinaulipia pamoja.']],
 ['marketing',['Marketing','Matangazo'],['Marketing brings visitors in, and their baskets repay it.','Matangazo yanaleta wageni, na manunuzi yao yanayalipa.']],
 ['check_station',['Afya Check station','Kituo cha Afya Check'],['The check is free and carries no obligation. It is paid for by the margin on purchases that follow a check and by the Afya Care card.','Kipimo ni bure na hakina sharti la kununua. Kinalipiwa na faida ya manunuzi yanayofuata kipimo na kadi ya Afya Care.']],
 ['insurance_licences',['Insurance and licences','Bima na leseni'],['A fixed cost of trading legally, carried by the margin on baskets and boxes.','Gharama ya kudumu ya kufanya biashara kihalali, inayobebwa na faida ya manunuzi na maboksi.']],
 ['packaging_misc',['Packaging and other','Vifungashio na mengineyo'],['Box packing sits inside the box price; bags and sundries inside the basket margin and the delivery fee.','Ufungashaji wa boksi uko ndani ya bei ya boksi; mifuko na vitu vidogo ndani ya faida ya manunuzi na ada ya usafirishaji.']]];

function coverHTML(I){const ox=I.opex_month,tot=sum(Object.values(ox));
 return `<div class="ab-tw"><table class="ab-t"><thead><tr><th>${E(T('Running cost','Gharama ya uendeshaji'))}</th><th>${E(T('A month','Kwa mwezi'))}</th><th>${E(T('Recovered inside','Inarudishwa ndani ya'))}</th></tr></thead><tbody>
 ${COVER.filter(c=>ox[c[0]]!=null).map(c=>`<tr><td><b>${E(T(...c[1]))}</b></td><td class="ab-n">${N('cv-'+c[0],ox[c[0]],'tsh')}</td><td>${E(T(...c[2]))}</td></tr>`).join('')}
 <tr><td><b>${E(T('Total','Jumla'))}</b></td><td class="ab-n">${N('cv-tot',tot,'tsh')}</td><td class="ab-mute">${E(T('Financial model v1.2, planning estimates','Modeli ya fedha v1.2, makadirio ya mipango'))}</td></tr>
 </tbody></table></div>`}

function deliveryHTML(I,r){const o=I.online,mb=I.members,m12=r.months[11],ord=o.orders_day_m12*30,pdCost=mb.packing_delivery_in_price*(1-(mb.pd_margin||0));
 const surplus=ord*(o.delivery_fee-o.rider_cost_per_order)+m12.members*(mb.packing_delivery_in_price-pdCost);
 const row=(l,v,neg,cls)=>`<tr${cls?` class="${cls}"`:''}><td>${l}</td><td class="ab-n">${neg?'−':''}${v}</td></tr>`;
 return `<div class="ab-tw"><table class="ab-t s62-dec"><tbody>
 ${row(T(`${N('dv-ord',ord,'int')} online orders × ${N('dv-fee',o.delivery_fee,'tsh')} delivery fee`,`oda ${N('dv-ord',ord,'int')} za mtandaoni × ada ya usafirishaji ${N('dv-fee',o.delivery_fee,'tsh')}`),N('dv-a',ord*o.delivery_fee,'tsh'))}
 ${row(T(`Charging, tyres and upkeep at ${N('dv-rc',o.rider_cost_per_order,'tsh')} an order`,`Kuchaji, matairi na matunzo kwa ${N('dv-rc',o.rider_cost_per_order,'tsh')} kwa oda`),N('dv-b',ord*o.rider_cost_per_order,'tsh'),1)}
 ${row(T(`${N('dv-mem',m12.members,'int')} boxes × ${N('dv-pd',mb.packing_delivery_in_price,'tsh')} packing and delivery in the price`,`maboksi ${N('dv-mem',m12.members,'int')} × ufungashaji na usafirishaji ${N('dv-pd',mb.packing_delivery_in_price,'tsh')} ndani ya bei`),N('dv-c',m12.members*mb.packing_delivery_in_price,'tsh'))}
 ${row(T('Packing and delivery paid out, at cost','Ufungashaji na usafirishaji uliolipwa, kwa gharama yake'),N('dv-d',m12.members*pdCost,'tsh'),1)}
 ${row(`<b>${E(T('Delivery surplus in month 12','Ziada ya usafirishaji mwezi 12'))}</b>`,N('dv-s',surplus,'tsh'),0,'s62-tot')}
 </tbody></table></div>
 <p class="ab-mute s62-cap">${E(T('Base case, month 12, financial model v1.2. Rider salaries sit in staff costs; the per-order figure covers charging and upkeep. Packing and delivery inside the box price is charged at cost, so it earns nothing and cannot turn into a subsidy.','Hali ya msingi, mwezi 12, modeli ya fedha v1.2. Mishahara ya wasafirishaji iko katika gharama za wafanyakazi; kiasi cha kila oda kinahusu kuchaji na matunzo. Ufungashaji na usafirishaji ndani ya bei ya boksi unatozwa kwa gharama yake, hivyo haupati faida na hauwezi kugeuka kuwa ruzuku.'))}</p>`}

const CSS=`<style>
.s62-body .ab-block>p,.s62-body .ab-block>h3+p{margin-top:var(--s2)}
.s62-ctl{margin-top:var(--s2)}
.s62-stage{margin-top:var(--s3)}
.s62-bar{display:block;margin-top:var(--s2);border:1px solid var(--line)}
.s62-leg{display:flex;flex-wrap:wrap;gap:6px 18px;margin-top:8px;font-size:var(--fs-cap);color:var(--mute)}
.s62-leg i{display:inline-block;width:10px;height:10px;margin-right:6px;vertical-align:-1px}
.s62-dec td:first-child{max-width:60ch}
.s62-tot td{font-weight:600;border-top:1px solid var(--mute)}
.s62-sub{padding-top:18px!important}
.s62-sm{font-size:var(--fs-cap)}
.s62-cap{font-size:var(--fs-cap);margin-top:8px;max-width:var(--measure)}
.s62-chart{margin-top:var(--s2);min-height:200px}
.s62-ul{margin:var(--s2) 0 0;padding-left:20px;max-width:var(--measure)}.s62-ul li{margin:8px 0}
</style>`;

function render(s,p,pv,nx){const M=window.MODEL,I=M.inputs,r=M.get('base'),lean=A().isLean(),U=S6();
 const ms=r.months,cov=ms.map(q=>q.gross_profit/q.opex),full=ms.find(q=>q.gross_profit>=q.opex),cs=U.cashPath(I,r);
 const d12=decomp('m12')||{},CO=(window.AFYAMB_DATA||{}).COST||{},shr=k=>CO[k]!=null?Math.round(CO[k]*100)+'%':'—';const o=I.online,mb=I.members,royal=(I.cards||[]).find(c=>c.key==='royal'),paid=(I.cards||[]).filter(c=>c.fee_year>0);
 return `<article class="ab-sec" aria-labelledby="h-s6-2">${CSS}<div class="ab-wrap">
 <div class="ab-sec-no">${E(s.no)}</div><h1 id="h-s6-2">${E(s.title)}</h1>
 <p class="ab-summary">${E(T('Afya Basics runs on one financial rule: every recurring cost is recovered inside a price the customer chooses to pay. Delivery and packing sit inside the box price and the delivery fee, advice inside the product margin, partner care inside a service fee, premium service inside the Royal card. Investor capital pays for the one-off build and the losses until break-even, not for running a mature store. One Mama na Mtoto box shows the rule, shilling by shilling.','Afya Basics inaendeshwa kwa kanuni moja ya kifedha: kila gharama inayojirudia inarudishwa ndani ya bei ambayo mteja anachagua kulipa. Usafirishaji na ufungashaji viko ndani ya bei ya boksi na ada ya usafirishaji, ushauri ndani ya faida ya bidhaa, huduma za washirika ndani ya ada ya huduma, huduma ya hadhi ya juu ndani ya kadi ya Royal. Mtaji wa mwekezaji unalipia ujenzi wa mara moja na hasara hadi kufikia faida, si uendeshaji wa duka lililokomaa. Boksi moja la Mama na Mtoto linaonyesha kanuni hii, shilingi kwa shilingi.'))}</p>
 <figure class="ab-visual"><h2 class="s62-h">${E(T('One box, shilling by shilling','Boksi moja, shilingi kwa shilingi'))}</h2>
  <div id="s62ex">${exampleHTML()}</div></figure>
 <div class="ab-body s62-body">
 <section class="ab-block"><h2>${E(T('The rule: no running cost is a subsidy','Kanuni: hakuna gharama ya uendeshaji inayokuwa ruzuku'))}</h2>
  <p>${E(T('Many new retail and delivery businesses grow on subsidy: free delivery, deep discounts and free services paid for by investors. Each new customer then adds to the loss, and the business survives only by raising more money. When the money stops, the subsidies stop and the customers leave. Afya Basics is built the other way round. Every cost that repeats is placed inside a price the customer sees and chooses: a product price, a box price, a delivery fee, a service fee or a card fee.','Biashara nyingi mpya za rejareja na usafirishaji zinakua kwa ruzuku: usafirishaji wa bure, punguzo kubwa na huduma za bure zinazolipiwa na wawekezaji. Kisha kila mteja mpya anaongeza hasara, na biashara inaishi tu kwa kutafuta fedha zaidi. Fedha zikikoma, ruzuku zinakoma na wateja wanaondoka. Afya Basics imejengwa kinyume chake. Kila gharama inayojirudia imewekwa ndani ya bei ambayo mteja anaiona na kuichagua: bei ya bidhaa, bei ya boksi, ada ya usafirishaji, ada ya huduma au ada ya kadi.'))}</p>
  <h3>${E(T('Delivery is always priced','Usafirishaji daima una bei'))}</h3>
  <p>${T(`Online orders carry a ${N('r-fee',o.delivery_fee,'tsh')} delivery fee against about ${N('r-rc',o.rider_cost_per_order,'tsh')} an order in running cost. Every box price contains packing and delivery at cost: the green box at its landed cost for its size and the ride to the door. A member never sees a separate delivery charge, because it is already in the price.`,`Oda za mtandaoni zina ada ya usafirishaji ya ${N('r-fee',o.delivery_fee,'tsh')} dhidi ya takriban ${N('r-rc',o.rider_cost_per_order,'tsh')} kwa oda katika gharama ya uendeshaji. Kila bei ya boksi ina ufungashaji na usafirishaji kwa gharama yake: boksi la kijani kwa gharama yake ya kufikisha kulingana na saizi na safari hadi mlangoni. Mwanachama haoni kamwe malipo tofauti ya usafirishaji, kwa sababu tayari yamo kwenye bei.`)}</p>
  <h3>${E(T('Advice is inside the product price','Ushauri uko ndani ya bei ya bidhaa'))}</h3>
  <p>${T(`Health advisers and the free Afya Check are paid for by the ${N('r-rgm',I.store.retail_gm*100,'pct')} retail margin: one price for everyone, no consultation fee and no obligation to buy. The model assumes ${N('r-cp',I.check.check_to_purchase*100,'pct')} of checks lead to a purchase; the margin on those purchases covers the station’s ${N('r-cs',I.opex_month.check_station,'tsh')} monthly upkeep.`,`Washauri wa afya na kipimo cha bure cha Afya Check vinalipiwa na faida ya rejareja ya ${N('r-rgm',I.store.retail_gm*100,'pct')}: bei moja kwa wote, hakuna ada ya ushauri na hakuna sharti la kununua. Modeli inakadiria kuwa ${N('r-cp',I.check.check_to_purchase*100,'pct')} ya vipimo vinaishia kwenye ununuzi; faida ya manunuzi hayo inalipia matunzo ya kituo ya ${N('r-cs',I.opex_month.check_station,'tsh')} kwa mwezi.`)}</p>
  <h3>${E(T('Extras carry their own cost','Ziada zinabeba gharama zake'))}</h3>
  <p>${T(`Premium service is paid for by the Afya Royal fee${royal?` (${tsh(royal.fee_year)} a year)`:''}, equipment upkeep by rental fees, and member features by card fees${paid.length?` from ${tsh(Math.min(...paid.map(c=>c.fee_year)))} a year`:''}. Card and rental fees are not counted in the financial model; they are upside to the figures in 6.1.`,`Huduma ya hadhi ya juu inalipiwa na ada ya Afya Royal${royal?` (${tsh(royal.fee_year)} kwa mwaka)`:''}, matunzo ya vifaa na ada za kukodisha, na huduma za wanachama na ada za kadi${paid.length?` kuanzia ${tsh(Math.min(...paid.map(c=>c.fee_year)))} kwa mwaka`:''}. Ada za kadi na za kukodisha hazijahesabiwa katika modeli ya fedha; ni nyongeza juu ya takwimu za 6.1.`)}</p>
 </section>

 <section class="ab-block"><h2>${E(T('How the box price is built','Jinsi bei ya boksi inavyojengwa'))}</h2>
  <p>${T(`The worked example above is the Mama na Mtoto box for a baby in the early months: the repeat month, with the default brand for every item. Its shelf value is the sum of Afya’s own shelf prices for what is inside. The member pays ${Math.round(window.AFYA_D4.SAVING.m1*100)}%, ${Math.round(window.AFYA_D4.SAVING.m6*100)}% or ${Math.round(window.AFYA_D4.SAVING.m12*100)}% less on a 1-, 6- or 12-month plan, rounded to the nearest 500 and never above the shelf value. Inside that one price Afya pays for the goods, the box, the ride and the points, and keeps what is left. The saving is measured against the final price, so the claim “below Afya’s shelf price” is true of what the member actually pays.`,`Mfano wa hesabu ulio juu ni boksi la Mama na Mtoto kwa mtoto katika miezi ya mwanzo: mwezi unaojirudia, kwa chapa ya kawaida kwa kila kitu. Thamani yake ya rafu ni jumla ya bei za rafu za Afya yenyewe kwa vilivyomo. Mwanachama analipa ${Math.round(window.AFYA_D4.SAVING.m1*100)}%, ${Math.round(window.AFYA_D4.SAVING.m6*100)}% au ${Math.round(window.AFYA_D4.SAVING.m12*100)}% chini kwa mpango wa mwezi 1, miezi 6 au miezi 12, ikizungushwa hadi 500 iliyo karibu na kamwe si juu ya thamani ya rafu. Ndani ya bei hiyo moja Afya inalipia bidhaa, boksi, safari na pointi, na inabaki na kilichosalia. Akiba inapimwa dhidi ya bei ya mwisho, hivyo dai la “chini ya bei ya rafu ya Afya” ni kweli kwa kile mwanachama analipa.`)}</p>
  <p>${E(T('The check at the end is the safety rule of the whole box range: if the member price does not cover goods, packing, delivery and points, the box is delivered less often or collected in store. That is why pregnancy boxes are delivered once a trimester. The goods are costed at planning shares of the shelf price, so the margin shown is an estimate until supplier quotes replace them.','Ukaguzi wa mwisho ni kanuni ya usalama ya maboksi yote: kama bei ya mwanachama hailipii bidhaa, ufungashaji, usafirishaji na pointi, boksi linapelekwa mara chache zaidi au linachukuliwa dukani. Ndiyo sababu maboksi ya ujauzito yanapelekwa mara moja kila miezi mitatu. Bidhaa zinakadiriwa kwa sehemu za mipango za bei ya rafu, hivyo faida inayoonyeshwa ni makadirio hadi bei za wasambazaji zitakapochukua nafasi yake.'))}</p>
 </section>

 <section class="ab-block"><h2>${E(T('Partner services: partner price × 1.25','Huduma za washirika: bei ya mshirika × 1.25'))}</h2>
  <p>${E(T('Care services inside a box are delivered by licensed partners and charged in the month they happen, on top of the box price. Afya books the session, reminds the family and follows up; the partner is paid its negotiated rate in full; the member pays a quarter more than that rate, which is still less than walking in. Extra services booked once are add-ons, and the partner pays Afya a commission on them.','Huduma za afya ndani ya boksi zinatolewa na washirika wenye leseni na zinatozwa katika mwezi zinapotolewa, juu ya bei ya boksi. Afya inapanga kikao, inaikumbusha familia na kufuatilia; mshirika analipwa kiwango chake kilichokubaliwa chote; mwanachama analipa robo zaidi ya kiwango hicho, ambacho bado ni chini ya kwenda moja kwa moja. Huduma za ziada zinazoagizwa mara moja ni nyongeza, na mshirika anailipa Afya kamisheni juu yake.'))}</p>
  <div id="s62svc">${servicesHTML()}</div>
 </section>

 <section class="ab-block"><h2>${E(T('Every running cost has a price that recovers it','Kila gharama ya uendeshaji ina bei inayoirudisha'))}</h2>
  <p>${E(T(`The store’s eight running-cost lines for this option, and the price element that recovers each one.`,`Mistari minane ya gharama za uendeshaji wa duka kwa chaguo hili, na sehemu ya bei inayorudisha kila mmoja.`))}</p>
  ${coverHTML(I)}
  <h3>${E(T('Delivery is fully paid for','Usafirishaji unalipiwa wote'))}</h3>
  ${deliveryHTML(I,r)}
 </section>

 <section class="ab-block"><h2>${E(T('Investor capital builds; customers run the store','Mtaji wa mwekezaji unajenga; wateja wanaendesha duka'))}</h2>
  <p>${T(`Until break-even, gross profit does not cover running costs. The chart shows coverage month by month: gross profit as a share of running costs. In the base case coverage starts at ${N('cov-1',cov[0]*100,'pct')} in month 1 and reaches ${N('cov-12',cov[11]*100,'pct')} in month 12${full?`; month ${N('cov-m',full.m,'int')} is the first month customers’ prices pay for every running cost`:''}. The early shortfall, ${N('cov-deep',-cs.deep,'tshM')} at its deepest, is carried by the seed’s line for operating losses and its working-capital reserve (section 6.3). From break-even the rule holds in full.`,`Hadi kufikia faida, faida ghafi hailipii gharama za uendeshaji. Chati inaonyesha ulipaji mwezi kwa mwezi: faida ghafi kama sehemu ya gharama za uendeshaji. Katika hali ya msingi ulipaji unaanza kwa ${N('cov-1',cov[0]*100,'pct')} mwezi 1 na kufikia ${N('cov-12',cov[11]*100,'pct')} mwezi 12${full?`; mwezi ${N('cov-m',full.m,'int')} ni mwezi wa kwanza ambao bei za wateja zinalipia kila gharama ya uendeshaji`:''}. Upungufu wa mwanzo, ${N('cov-deep',-cs.deep,'tshM')} kwa kina chake cha juu, unabebwa na mstari wa mtaji wa awali wa hasara za uendeshaji na akiba yake ya mtaji wa kazi (sehemu ya 6.3). Kuanzia kufikia faida kanuni inatumika kikamilifu.`)}</p>
  <div class="s62-chart" id="s62cCov"></div>
  <p class="ab-mute s62-cap">${E(T('Gross profit ÷ running costs by month, base case, %. Gold bars: every running cost covered. Dashed line: 100%. Source: financial model v1.2.','Faida ghafi ÷ gharama za uendeshaji kwa mwezi, hali ya msingi, %. Nguzo za dhahabu: kila gharama ya uendeshaji imelipwa. Mstari wa vistari: 100%. Chanzo: modeli ya fedha v1.2.'))}</p>
 </section>

 <section class="ab-block"><h2>${E(T('Risks and the planned answer','Hatari na jibu lililopangwa'))}</h2>
  <ul class="s62-ul">
   <li>${T(`<b>A saving of ${sv()} may look small next to informal sellers.</b> Afya competes on trust and time: registered products, four or five brands per item including an affordable one, one price in every channel, and delivery included. The saving is real against Afya’s own shelf; a wider market comparison is still being collected.`,`<b>Akiba ya ${sv()} inaweza kuonekana ndogo ukilinganisha na wauzaji wasio rasmi.</b> Afya inashindana kwa uaminifu na muda: bidhaa zilizosajiliwa, chapa nne au tano kwa kila kitu ikiwemo ya bei nafuu, bei moja katika kila njia, na usafirishaji umejumuishwa. Akiba ni halisi dhidi ya rafu ya Afya yenyewe; ulinganisho mpana wa soko bado unakusanywa.`)}</li>
   <li>${T('<b>Landed costs come in higher than planned.</b> The box price is tied to the shelf, so a higher landed cost lowers Afya’s margin, not the member’s saving. The check rule stops any box from being delivered at a loss; supplier quotes are taken before stock is ordered.','<b>Gharama za kufikisha zinakuwa juu kuliko ilivyopangwa.</b> Bei ya boksi imefungamanishwa na rafu, hivyo gharama ya juu ya kufikisha inapunguza faida ya Afya, si akiba ya mwanachama. Kanuni ya ukaguzi inazuia boksi lolote kupelekwa kwa hasara; bei za wasambazaji zinachukuliwa kabla bidhaa hazijaagizwa.')}</li>
   <li>${T('<b>Costs rise: fuel, rent, imports.</b> Each cost sits inside a named price element, so the price to review is known when a cost moves. Shelf values are rebuilt every quarter and members see the new price before renewal.','<b>Gharama zinapanda: mafuta, kodi ya pango, uagizaji.</b> Kila gharama iko ndani ya sehemu ya bei inayojulikana, hivyo bei ya kupitiwa upya inajulikana gharama inapobadilika. Thamani za rafu zinajengwa upya kila robo mwaka na wanachama wanaona bei mpya kabla ya kuhuisha.')}</li>
  </ul>
 </section>
 </div>

 <section class="ab-block"><h2>${E(T('Key figures','Takwimu muhimu'))}</h2>
  ${A().figsHTML([
   {v:d12.core?tsh(d12.core):'—',l:T('Member price of the example box on the 12-month plan, packing and delivery included','Bei ya mwanachama ya boksi la mfano kwa mpango wa miezi 12, ufungashaji na usafirishaji vimo'),s:E(T('D4 rule, Afya shelf prices (section 3.5)','Kanuni ya D4, bei za rafu za Afya (sehemu ya 3.5)'))},
   {v:d12.core?`${tsh(d12.margin)} ${est()}`:'—',l:T('Afya margin on that box after goods, packing, delivery and points','Faida ya Afya kwa boksi hilo baada ya bidhaa, ufungashaji, usafirishaji na pointi'),s:E(T('Planning landed costs','Gharama za kufikisha za mipango'))},
   {v:`${N('kf-cov',cov[11]*100,'pct')} ${est()}`,l:T('Running costs covered by gross profit in month 12','Gharama za uendeshaji zinazolipwa na faida ghafi mwezi 12'),s:E(T('Financial model v1.2, base case','Modeli ya fedha v1.2, hali ya msingi'))},
   {v:`${N('kf-rc',o.delivery_fee-o.rider_cost_per_order,'tsh')} ${est()}`,l:T('Margin on every online delivery fee, after the running cost of the ride','Faida kwa kila ada ya usafirishaji wa mtandaoni, baada ya gharama ya safari'),s:E(T('Financial model v1.2','Modeli ya fedha v1.2'))}])}
 </section>

 <section class="ab-block"><h2>${E(T('What this costs','Hii inagharimu nini'))}</h2>
  <p>${E(T('Investor capital is spent once, on the build and the climb to break-even; customer revenue pays for running the store every month.','Mtaji wa mwekezaji unatumika mara moja, kwa ujenzi na safari ya kufikia faida; mapato ya wateja yanalipia uendeshaji wa duka kila mwezi.'))}</p>
  <div class="ab-tw"><table class="ab-t"><thead><tr><th>${E(T('Investor capital, one-off','Mtaji wa mwekezaji, mara moja'))}</th><th>${E(T('Amount','Kiasi'))}</th></tr></thead><tbody>
   ${I.seed.use.map(u=>{const l=U.useLabel(u);return `<tr><td>${E(l.t)}</td><td class="ab-n">${N('c-'+(l.k||u[0]),u[1],'tsh')}</td></tr>`}).join('')}
   <tr class="s62-tot"><td>${E(lean?T('Seed round · start small','Mtaji wa awali · anza kidogo'):T('Seed round · flagship','Mtaji wa awali · duka kuu'))}</td><td class="ab-n">${N('c-seed',I.seed.amount,'tsh')}</td></tr>
   <tr class="s62-tot"><td>${E(T('Customer revenue pays: running costs a month','Mapato ya wateja yanalipia: gharama za uendeshaji kwa mwezi'))}</td><td class="ab-n">${N('c-ox',sum(Object.values(I.opex_month)),'tsh')}</td></tr>
  </tbody></table></div>
  <p class="ab-mute s62-cap">${E(T('Financial model v1.2, planning estimates. The line-by-line use of funds is in section 6.3.','Modeli ya fedha v1.2, makadirio ya mipango. Matumizi ya fedha mstari kwa mstari yako katika sehemu ya 6.3.'))}</p>
 </section>

 ${A().openHTML([
  E(T(`Landed costs are planning shares of shelf price (${shr('brand')} branded, ${shr('pharm')} registered health products, ${shr('own')} direct imports) until supplier quotes and the Kariakoo wholesale calls replace them; the margin on the example box moves with them.`,`Gharama za kufikisha ni sehemu za mipango za bei ya rafu (${shr('brand')} bidhaa zenye chapa, ${shr('pharm')} bidhaa za afya zilizosajiliwa, ${shr('own')} uagizaji wa moja kwa moja) hadi bei za wasambazaji na simu kwa wauzaji wa jumla wa Kariakoo zitakapochukua nafasi yake; faida ya boksi la mfano inabadilika pamoja nazo.`)),
  E(T('Partner service prices are planning figures until partners quote; the × 1.25 rule is approved.','Bei za huduma za washirika ni takwimu za mipango hadi washirika watakapotoa bei; kanuni ya × 1.25 imeidhinishwa.')),
  E(T('“Below shelf price” is proven against Afya’s own shelf and, for nappies and wipes, against a large Tanzanian online pharmacy; the rest of the box still needs a second supermarket benchmark before it is stated as a market claim.','“Chini ya bei ya rafu” imethibitishwa dhidi ya rafu ya Afya yenyewe na, kwa nepi na vitambaa vya mtoto, dhidi ya famasia kubwa ya mtandaoni ya Tanzania; sehemu iliyobaki ya boksi bado inahitaji kipimo cha pili cha supamaketi kabla haijatajwa kama dai la soko.')),
  E(T('The treated mosquito net in the birth, month-13 and month-25 boxes is an estimate until a distributor quotes.','Chandarua chenye dawa katika maboksi ya kuzaliwa, mwezi 13 na mwezi 25 ni makadirio hadi msambazaji atakapotoa bei.'))])}

 ${A().sourcesHTML([
  {t:T('Afya Basics price rule D4 (approved 10 Nov 2026): 3/6/9% below shelf, packing and delivery included; services at partner price × 1.25','Kanuni ya bei ya Afya Basics D4 (imeidhinishwa 10 Nov 2026): 3/6/9% chini ya rafu, ufungashaji na usafirishaji vimo; huduma kwa bei ya mshirika × 1.25'),u:'',chk:'10 Nov 2026'},
  {t:T('Mama na Mtoto item list, brands and shelf prices, with a source for every price (section 3.5)','Orodha ya vitu, chapa na bei za rafu za Mama na Mtoto, na chanzo cha kila bei (sehemu ya 3.5)'),u:'',chk:'10 Nov 2026'},
  {t:T('AfyaDepot, Softcare and Sleepy nappy listings and the free-delivery threshold (TSh 150,000 in Dar es Salaam)','AfyaDepot, matangazo ya nepi za Softcare na Sleepy na kiwango cha usafirishaji wa bure (TSh 150,000 Dar es Salaam)'),u:'https://afyadepot.co.tz/',chk:'9 Nov 2026'},
  {t:T('Afya Basics partner-service pricing: planning partner rates, member price × 1.25, add-on commission (estimate)','Bei za huduma za washirika za Afya Basics: viwango vya mipango vya washirika, bei ya mwanachama × 1.25, kamisheni ya nyongeza (makadirio)'),u:'',chk:'10 Nov 2026'},
  {t:T('Afya Basics financial model v1.2 (planning estimates)','Modeli ya fedha ya Afya Basics v1.2 (makadirio ya mipango)'),u:'',chk:'10 Nov 2026'}])}
 ${A().pagerHTML(pv,nx)}
 </div></article>`}

let onRz=null,bound=false;
function drawCov(){const el=document.getElementById('s62cCov');if(!el)return;const W=Math.floor(el.clientWidth);if(W<120)return;const r=window.MODEL.get('base'),m=r.months;
 el.innerHTML=S6().chartSVG(W,{labels:m.map(q=>'M'+q.m),bars:m.map(q=>q.gross_profit/q.opex*100),barC:v=>v>=100?'--gold':'--green',lines:[{vals:m.map(()=>100),c:'--mute',dash:1}],ax:v=>Math.round(v)+'%',aria:T('Running-cost coverage by month, base case','Ulipaji wa gharama za uendeshaji kwa mwezi, hali ya msingi')})}
function init(){if(!document.getElementById('s62ex'))return;drawCov();
 if(onRz)removeEventListener('resize',onRz);let t;onRz=()=>{clearTimeout(t);t=setTimeout(drawCov,120)};addEventListener('resize',onRz);
 addEventListener('afya:leave',()=>{if(onRz){removeEventListener('resize',onRz);onRz=null}},{once:true});
 if(bound)return;bound=true;
 document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-s62plan]');if(!b||!document.getElementById('s62ex'))return;PLAN=b.dataset.s62plan;
  document.getElementById('s62ex').innerHTML=exampleHTML();document.getElementById('s62svc').innerHTML=servicesHTML()})}

window.SECTIONS['s6-2']={render,init,v2:true};
})();
