/* 3.7 Premium, gifts and rentals · v2 on the D2 template.
   Kept from the old section: the seven ideas for people who pay for someone else's care, the gift builder,
   Michango ya Afya (pooled gifts, now with the mobile-money steps), and rent or buy.
   Corrected: gift prices come from the D4 rule over window.AFYA_DATA (same as 3.5); tiers are Regular / Premium / Luxury;
   Kenyan prices show KES, the BoT rate 20.33 and its date (10 Nov 2026); USD shows the BoT rate 2,642.50;
   rental fees, deposit, delivery and cleaning are Afya's proposals, labelled estimate. The parked Msingi box, the
   unsourced gift-box surcharge and the hand-typed worked examples are not carried over. Nothing here is option-dependent. */
(function(){
'use strict';
const A=()=>window.AB,T=(e,s)=>A().T(e,s),E=s=>A().E(s),D4=()=>window.AFYA_D4;
const DATA=()=>window.AFYA_DATA||{boxes:{}};
const sw=()=>window.AFYA_LANG==='sw';
const L=o=>o==null?'':typeof o==='string'?o:(sw()?(o.sw||o.en):(o.en||o.sw))||'';
const tsh=n=>n==null?'—':'TSh '+Math.round(n).toLocaleString('en-US');
const nf=n=>Math.round(n).toLocaleString('en-US');
const est=()=>`<span class="ab-est">${E(T('estimate','makadirio'))}</span>`;
const KES=20.33,USD=2642.50;const fxd=()=>T('BoT mean rate, 10 Nov 2026','kiwango cha wastani cha BoT, 10 Nov 2026');

/* sources */
const RS={
 rem:{t:'The Citizen, 27 May 2026: diaspora remittances hit TSh 3.3 trillion in 2024/25',u:'https://www.thecitizen.co.tz/tanzania/diaspora/diaspora-remittances-hit-sh3-3-trillion-as-tanzania-deepens-global-engagement-5473984'},
 bot:{t:'Daily News, 28 Mar 2025: BoT payment systems report, formal inflows TSh 1.89 trillion in 2024, up 34.6%',u:'https://dailynews.co.tz/?p=90423'},
 uncdf:{t:'UNCDF, Jan 2025: Tanzania cross-border remittance policy diagnostic',u:'https://www.uncdf.org/article/8852/tanzania-crossborder-remittance-policy-diagnostic'},
 mixx:{t:'Mixx by Yas: Mchango product page (send-offs, kitchen parties, medical support)',u:'https://mixx.co.tz/consumers/mchango/'},
 mixxl:{t:'The Citizen, 4 Feb 2026: Mixx launches Mchango to simplify community contributions',u:'https://www.thecitizen.co.tz/tanzania/news/national/mixx-launches-mchango-to-simplify-community-contributions-5349400'},
 mch:{t:'M-Changa: fees (4.25% platform fee)',u:'https://mchanga.africa/fees'},
 onek:{t:'TechCabal, 1 Apr 2025: OneKitty crowdfunding through WhatsApp chatbots, 2.5% fee',u:'https://techcabal.com/2025/04/01/onekitty-crowdfunding-whatsapp-chatbots/'},
 eaw:{t:'The EastAfrican: Funding other people’s weddings (TSh 50,000 minimum contribution)',u:'https://www.theeastafrican.co.ke/tea/magazine/funding-other-people-s-weddings-1316108'},
 js:{t:'Jack and Suri, Risk sharing and transactions costs: evidence from Kenya’s mobile money revolution, American Economic Review 2014',u:'https://dspace.mit.edu/bitstream/1721.1/88137/1/Suri_Risk%20sharing.pdf'},
 std:{t:'The Standard, Eve Woman: What to get a new mum when visiting',u:'https://www.standardmedia.co.ke/evewoman/living/article/2001453633/what-to-get-a-new-mum-when-visiting'},
 nat:{t:'Nation (Kenya): Diaper prices rise, parents get creative (8–10 nappies a day)',u:'https://nation.africa/kenya/life-and-style/diaper-prices-rise-parents-get-creative-5076460'},
 bank:{t:'Bankrate gift card survey, Aug 2024: 43% hold unused cards, average USD 244',u:'https://www.bankrate.com/credit-cards/news/gift-cards-survey/'},
 fd:{t:'First Data UK Prepaid Consumer Insights Study: 74% spend above the card’s value',u:'https://www.paymentsjournal.com/first-datas-prepaid-consumer-insights-study/'},
 rec:{t:'Recurly holiday subscription trends report, Sep 2023: gifted subscriptions last 485 days on average',u:'https://recurly.com/blog/holiday-subscription-trends-consumer-report/'},
 bd:{t:'Business Daily Africa, Dec 2022: Christmas of thin shopping, without gift hampers',u:'https://www.businessdailyafrica.com/bd/economy/christmas-of-thin-shopping-without-gift-hampers--4064408'},
 wel:{t:'Citizen Digital, Jul 2026: workplace stress reaches 87% (Niche Human Capital report)',u:'https://citizen.digital/article/kenyan-firms-face-rising-workplace-wellbeing-crisis-as-stress-levels-hit-87-report-n387423'},
 conec:{t:'Conec Care, Nairobi: medical equipment rental price list',u:'https://coneccare.africa/rental/'},
 atk:{t:'Accessible Travel Kenya: mobility equipment rental prices',u:'https://accessibletravel.co.ke/mobility-equipment-rentals-extra-support-without-the-extra-hassle/'},
 mj:{t:'Medjet Hospital Supplies, Nairobi: wheelchairs, frames, rollators, commodes, shower chairs, beds',u:'https://mjhospitalsupplies.co.ke/'},
 medi:{t:'Medistus: wheelchair and oxygen concentrator prices',u:'https://medistusltd.com/wheelchair-prices-in-kenya/'},
 medo:{t:'Medocal: compressor nebuliser prices',u:'https://medocal.co.ke/product/portable-compressor-nebulizer-machine/'},
 pk:{t:'Peekaboo Kenya: Lansinoh double electric breast pump',u:'https://www.peekaboo.ke/products/lansinoh-2-in-1-double-electric-breast-pump'},
 mst:{t:'Medstock: anti-decubitus air mattress with pump',u:'https://medstock.co.ke/product/ripple-matress/'},
 who:{t:'WHO: Medical devices, regulation and safe use',u:'https://www.who.int/health-topics/medical-devices'},
 fx:{t:'Bank of Tanzania, exchange rates, trading date 10 Nov 2026 (USD 2,642.50; KES 20.33, mean rates)',u:'https://www.bot.go.tz/ExchangeRate/excRates'}};

/* rental fleet: buy-new prices on Kenyan retailer pages (KES, seen 2 Nov 2026), converted at 20.33; w = typical weeks of use (estimate) */
const RENT=[
 {k:'wc',n:['Standard folding wheelchair','Kiti cha magurudumu cha kukunjwa'],kes:12000,s:'mj',u:'https://mjhospitalsupplies.co.ke/product/foldable-standard-wheelchair/',mk:1000,mku:'day',mks:'atk',w:6},
 {k:'wf',n:['Folding walking frame','Fremu ya kutembelea ya kukunjwa'],kes:4500,s:'mj',u:'https://mjhospitalsupplies.co.ke/product/foldable-walking-frame-for-adult/',w:6},
 {k:'ro',n:['Four-wheel rollator','Rollata ya magurudumu manne'],kes:11000,s:'mj',u:'https://mjhospitalsupplies.co.ke/product/rollator-walker-foldable-4-wheel/',w:8},
 {k:'cr',n:['Elbow crutches','Magongo ya kiwiko'],kes:2000,s:'mj',u:'https://mjhospitalsupplies.co.ke/product/elbow-crutches/',w:6},
 {k:'bed',n:['Manual hospital bed with mattress','Kitanda cha hospitali chenye godoro'],kes:35000,s:'mj',u:'https://mjhospitalsupplies.co.ke/product/patient-bed-with-mattress/',mk:15000,mku:'month',mks:'conec',w:8},
 {k:'ox',n:['5-litre oxygen concentrator, on a doctor’s prescription','Mashine ya oksijeni ya lita 5, kwa cheti cha daktari'],kes:65000,s:'medi',u:'https://medistusltd.com/product/oxygen-concentrator',mk:2000,mku:'day',mks:'conec',w:4},
 {k:'cm',n:['Commode chair with backrest','Kiti cha choo chenye egemeo'],kes:13000,s:'mj',u:'https://mjhospitalsupplies.co.ke/product/commode-seat-with-backrest/',mk:1500,mku:'day',mks:'atk',w:6},
 {k:'sc',n:['Height-adjustable shower chair','Kiti cha kuogea kinachorekebishwa'],kes:8000,s:'mj',u:'https://mjhospitalsupplies.co.ke/product/height-adjustable-shower-chair/',mk:1000,mku:'day',mks:'atk',w:6},
 {k:'am',n:['Alternating-pressure air mattress','Godoro la hewa la kubadilisha mgandamizo'],kes:5500,s:'mst',u:'https://medstock.co.ke/product/ripple-matress/',w:8},
 {k:'neb',n:['Compressor nebuliser','Mashine ya nebuliza'],kes:4300,s:'medo',u:'https://medocal.co.ke/product/portable-compressor-nebulizer-machine/',w:2},
 {k:'bp',n:['Double electric breast pump','Pampu ya umeme ya kukamua maziwa ya mama'],kes:41200,s:'pk',u:'https://www.peekaboo.ke/products/lansinoh-2-in-1-double-electric-breast-pump',w:12}];
/* Afya's proposed rental terms (estimates, not quotes) */
const R_FEE=.075,R_DEP=.30,R_DEL=15000,R_CLEAN=5000,R_COST=.72,R_LIFE=3,R_UTIL=26;
const buyT=r=>Math.round(r.kes*KES);
const feeT=r=>Math.round(buyT(r)*R_FEE/500)*500||500;

/* gift occasions → box */
const OCC=[
 {k:'baby',box:'mama-na-mtoto',n:['A new baby','Mtoto mpya'],to:['Mama Neema','Mama Neema'],msg:['Congratulations on the baby. Care for you both, every month, from all of us.','Hongera kwa mtoto. Huduma kwenu wawili, kila mwezi, kutoka kwetu sote.']},
 {k:'preg',box:'mama-mjamzito',n:['An expecting mother','Mama mjamzito'],to:['Dada Rehema','Dada Rehema'],msg:['Nine months of care, trimester by trimester. We are with you.','Miezi tisa ya huduma, hatua kwa hatua. Tuko pamoja nawe.']},
 {k:'parent',box:'bibi-na-babu',n:['A parent at home','Mzazi nyumbani'],to:['Mama, Sinza','Mama, Sinza'],msg:['Mama, this is so you never run short of anything. I call every Sunday.','Mama, hii ni ili usikose kitu chochote. Nitapiga simu kila Jumapili.']},
 {k:'bp',box:'presha',n:['Blood pressure care','Huduma ya presha'],to:['Baba, Mbezi','Baba, Mbezi'],msg:['Your monitor and your readings, looked after every three months. Take care, Baba.','Kipimo chako na vipimo vyako, vinashughulikiwa kila miezi mitatu. Jitunze, Baba.']},
 {k:'sugar',box:'sukari',n:['Diabetes care','Huduma ya kisukari'],to:['Mjomba Saidi','Mjomba Saidi'],msg:['Strips, lancets and foot care, so nothing is ever missing.','Vipande vya kupimia, sindano za kuchoma kidole na huduma ya miguu, ili kisikosekane chochote.']},
 {k:'rec',box:'kupona',n:['Get well soon','Upone haraka'],to:['Bi Halima','Bi Halima'],msg:['From everyone at the office: rest, heal, and come back strong.','Kutoka kwa wote ofisini: pumzika, upone, na urudi ukiwa imara.']}];
const PLANS=[['m1','1 month','Mwezi 1'],['m6','6 months · Gold','Miezi 6 · Gold'],['m12','12 months · Platinum','Miezi 12 · Platinum']];
const TIERS=[['regular','Regular','Kawaida'],['premium','Premium','Bora'],['luxury','Luxury','Anasa']];
const st={occ:'baby',plan:'m12',tier:'regular',n:12,rent:'wc'};

function firstBox(slug,plan,tier){const b=DATA().boxes[slug];if(!b||!b.stages||!b.stages.length)return null;const stage=b.stages[0];
 const ls=(stage.items||[]).filter(i=>i.kind!=='medicine'&&!i.optional).map(it=>{const br=(it.brands||[]).find(x=>x.default)||(it.brands||[])[0];return {cost:D4().lineCost(br,it.units)}});
 const r=D4().price(D4().shelfValue(ls),plan,[]);const lux=tier==='regular'?null:(b.luxury||[]).find(x=>x.tier===tier);const lp=lux&&lux.price_tsh||0;
 return Object.assign(r,{b,stage,lux,lp,total:r.total+lp})}
function cadence(b,stage){const d=(stage&&stage.delivery)||b.delivery;
 return d==='per-trimester'?T('one box each trimester','boksi moja kila miezi mitatu'):d==='every-2-months'?T('a box every two months','boksi kila miezi miwili'):d==='every-3-months'?T('a box every three months','boksi kila miezi mitatu'):T('a box every month','boksi kila mwezi')}

/* ---------- primary visual: rent or buy over 26 weeks ---------- */
function rentSVG(r){const W=640,H=260,l=56,rt=16,tp=16,bt=36,weeks=26,buy=buyT(r),fee=feeT(r),cost=w=>R_DEL+R_CLEAN+fee*w;
 const max=Math.max(buy,cost(weeks))*1.08,x=w=>l+(W-l-rt)*w/weeks,y=v=>tp+(H-tp-bt)*(1-v/max);
 const pts=[];for(let w=1;w<=weeks;w++)pts.push(`${x(w).toFixed(1)},${y(cost(w)).toFixed(1)}`);
 let cross=null;for(let w=1;w<=weeks;w++)if(cost(w)>=buy){cross=w;break}
 const ticks=[0,.25,.5,.75,1].map(f=>Math.round(max*f/10000)*10000);
 return `<svg viewBox="0 0 ${W} ${H}" class="s37-ch" role="img" aria-label="${E(T('What a family pays to rent the item each week, against buying it new','Familia inalipa kiasi gani kukodisha kifaa kila wiki, ukilinganisha na kukinunua kipya'))}">
 ${ticks.map(t=>`<line x1="${l}" x2="${W-rt}" y1="${y(t).toFixed(1)}" y2="${y(t).toFixed(1)}" style="stroke:var(--line)" stroke-width="1"/><text x="${l-6}" y="${(y(t)+4).toFixed(1)}" text-anchor="end" font-size="10" style="fill:var(--mute)">${t>=1e6?(t/1e6).toFixed(1)+'M':Math.round(t/1000)+'k'}</text>`).join('')}
 ${[1,4,8,12,16,20,26].map(w=>`<text x="${x(w).toFixed(1)}" y="${H-bt+16}" text-anchor="middle" font-size="10" style="fill:var(--mute)">${w}</text>`).join('')}
 <text x="${(l+(W-l-rt)/2).toFixed(0)}" y="${H-4}" text-anchor="middle" font-size="10" style="fill:var(--mute)">${E(T('weeks of use','wiki za matumizi'))}</text>
 <line x1="${l}" x2="${W-rt}" y1="${y(buy).toFixed(1)}" y2="${y(buy).toFixed(1)}" style="stroke:var(--gold)" stroke-width="2" stroke-dasharray="6 4"/>
 <polyline points="${pts.join(' ')}" fill="none" style="stroke:var(--green-edge)" stroke-width="2.5"/>
 ${cross?`<line x1="${x(cross).toFixed(1)}" x2="${x(cross).toFixed(1)}" y1="${tp}" y2="${H-bt}" style="stroke:var(--mute)" stroke-width="1" stroke-dasharray="2 3"/><text x="${(x(cross)+4).toFixed(1)}" y="${tp+10}" font-size="10" style="fill:var(--mute)">${E(T(`buying is cheaper from week ${cross}`,`kununua ni nafuu kuanzia wiki ${cross}`))}</text>`:''}
 </svg>
 <div class="s37-leg"><span><i class="s37-k1"></i>${E(T('Renting: delivery, fitting, collection and cleaning, plus the weekly fee','Kukodisha: kufikisha, kufunga, kuchukua na kusafisha, pamoja na ada ya wiki'))}</span><span><i class="s37-k2"></i>${E(T('Buying new','Kununua kipya'))}</span></div>`}
function rentBox(){const r=RENT.find(x=>x.k===st.rent)||RENT[0],buy=buyT(r),fee=feeT(r),w=r.w;
 return `<label class="s37-f"><span>${E(T('Item','Kifaa'))}</span><select id="s37rent">${RENT.map(x=>`<option value="${x.k}"${x.k===r.k?' selected':''}>${E(T(x.n[0],x.n[1]))}</option>`).join('')}</select></label>
 ${rentSVG(r)}
 <p class="ab-mute s37-cap">${E(T(`Buy-new price: KES ${nf(r.kes)} × ${KES} = ${tsh(buy)} (${fxd()}). Weekly fee ${tsh(fee)} (7.5% of buy-new), refundable deposit ${tsh(buy*R_DEP)}, delivery and collection ${tsh(R_DEL)} and cleaning ${tsh(R_CLEAN)} are Afya’s proposed terms, estimates. Typical use for this item: about ${w} weeks.`,`Bei ya kununua kipya: KES ${nf(r.kes)} × ${KES} = ${tsh(buy)} (${fxd()}). Ada ya wiki ${tsh(fee)} (7.5% ya bei ya kipya), amana inayorudishwa ${tsh(buy*R_DEP)}, kufikisha na kuchukua ${tsh(R_DEL)} na kusafisha ${tsh(R_CLEAN)} ni masharti yanayopendekezwa na Afya, makadirio. Matumizi ya kawaida ya kifaa hiki: takriban wiki ${w}.`))}</p>`}

/* ---------- gift builder ---------- */
const seg=(name,list,on,aria)=>`<div class="ab-seg" role="group" aria-label="${E(aria)}">${list.map(x=>`<button type="button" data-${name}="${x[0]}" aria-pressed="${x[0]===on}">${E(T(x[1],x[2]))}</button>`).join('')}</div>`;
function poolTable(r){return ` <div class="ab-tw"><table class="ab-t"><tbody>
  <tr><td>${E(T('Each person pays, rounded up to TSh 500','Kila mtu analipa, kwa kuzungushwa juu hadi TSh 500'))}</td><td class="ab-n">${tsh(Math.ceil(r.total/st.n/500)*500)}</td></tr>
  <tr><td>${E(T('Collected','Kilichokusanywa'))}</td><td class="ab-n">${tsh(Math.ceil(r.total/st.n/500)*500*st.n)}</td></tr>
  <tr><td>${E(T('Platform fee charged by Afya','Ada ya jukwaa inayotozwa na Afya'))}</td><td class="ab-n">TSh 0</td></tr>
  <tr><td>${E(T('The same pool on a fundraising platform charging 2.5%','Mchango huohuo kwenye jukwaa la kuchangisha linalotoza 2.5%'))}</td><td class="ab-n">${tsh(r.total*0.025)}</td></tr>
  <tr><td>${E(T('… or charging 4.25%','… au linalotoza 4.25%'))}</td><td class="ab-n">${tsh(r.total*0.0425)}</td></tr>
 </tbody></table></div>`}
function giftHTML(){const o=OCC.find(x=>x.k===st.occ),r=firstBox(o.box,st.plan,st.tier);if(!r)return '';
 return `<div class="ab-seg s37-occ" role="group" aria-label="${E(T('Occasion','Tukio'))}">${OCC.map(x=>`<button type="button" data-occ="${x.k}" aria-pressed="${x.k===st.occ}">${E(T(x.n[0],x.n[1]))}</button>`).join('')}</div>
 <div class="ab-bb-ctl">${seg('plan',PLANS,st.plan,T('Plan','Mpango'))}${seg('tier',TIERS,st.tier,T('Tier','Ngazi'))}</div>
 <div class="s37-gift">
  <div class="s37-card"><small>${E(T('Afya Box gift','Zawadi ya Afya Box'))}</small><b>${E(L(r.b.name))}</b><span>${E(T('To','Kwa'))}: ${E(T(o.to[0],o.to[1]))}</span><p>“${E(T(o.msg[0],o.msg[1]))}”</p><span class="ab-mute">${E(T(PLANS.find(p=>p[0]===st.plan)[1],PLANS.find(p=>p[0]===st.plan)[2]))} · ${E(cadence(r.b,r.stage))}</span></div>
  <dl class="s37-dl">
   <div><dt>${E(T('First box','Boksi la kwanza'))}: ${E(L(r.stage.label))}</dt><dd></dd></div>
   <div><dt>${E(T('Shelf value of the goods','Thamani ya bidhaa rafuni'))}</dt><dd>${tsh(r.shelf)}</dd></div>
   <div><dt>${E(T('Member price, packing and delivery included','Bei ya mwanachama, ufungashaji na usafirishaji ukiwemo'))}</dt><dd class="ab-gold">${tsh(r.core)}</dd></div>
   ${r.lux?`<div><dt>${E(L(r.lux.name))}</dt><dd>${tsh(r.lp)}</dd></div>`:''}
   <div class="ab-tot"><dt>${E(T('Price of the first box','Bei ya boksi la kwanza'))}</dt><dd class="ab-gold">${tsh(r.total)}</dd></div>
  </dl>
 </div>
 <h3>${E(T('Michango ya Afya: share the first box','Michango ya Afya: changieni boksi la kwanza'))}</h3>
 <label class="s37-f s37-rng"><span>${E(T('People contributing','Watu wanaochangia'))}: <b id="s37n">${st.n}</b></span><input type="range" id="s37pool" min="2" max="40" value="${st.n}" aria-label="${E(T('People contributing','Watu wanaochangia'))}"></label>
 <div id="s37poolT">${poolTable(r)}</div>
 <p class="ab-mute s37-cap">${E(T('Priced with the default brands, by the same rule as the package pages in 3.5. Later boxes of a 6- or 12-month gift follow the prices of their own stage in 3.5. The rounding surplus is held as credit on the recipient’s account.','Bei imewekwa kwa chapa za kawaida, kwa kanuni ileile ya kurasa za maboksi katika 3.5. Maboksi yanayofuata ya zawadi ya miezi 6 au 12 yanafuata bei za hatua zao katika 3.5. Ziada inayotokana na kuzungusha inahifadhiwa kama salio kwenye akaunti ya mpokeaji.'))}</p>`}

/* ---------- the seven ideas ---------- */
const IDEAS=()=>[
 {n:['1 · The Year of Care gift','1 · Zawadi ya Mwaka wa Huduma'],src:['std','nat','rec'],
  t:['Visitors to a new mother rarely come empty-handed, and the most common gift is a pack of nappies. A newborn uses 8 to 10 nappies a day, so a pack of 60 lasts about a week. The idea: sell the Afya Box membership as a gift. A sealed green card box holds the membership card for 1, 6 or 12 months, the first box and the year’s care calendar; the recipient activates it with one call and the boxes then arrive on their own. Every gift brings a household with a reason to come back month after month; in US and UK data, gifted subscriptions last 485 days on average.','Wageni wa mama aliyejifungua mara chache huja mikono mitupu, na zawadi ya kawaida zaidi ni pakiti ya nepi. Mtoto mchanga hutumia nepi 8 hadi 10 kwa siku, hivyo pakiti ya 60 hudumu takriban wiki moja. Wazo: kuuza uanachama wa Afya Box kama zawadi. Sanduku la kadi la kijani lililofungwa lina kadi ya uanachama ya mwezi 1, miezi 6 au 12, boksi la kwanza na kalenda ya huduma ya mwaka; mpokeaji anauanzisha kwa simu moja na maboksi yanaanza kufika yenyewe. Kila zawadi inaleta kaya yenye sababu ya kurudi mwezi baada ya mwezi; kwa takwimu za Marekani na Uingereza, usajili uliotolewa kama zawadi hudumu wastani wa siku 485.']},
 {n:['2 · Michango ya Afya','2 · Michango ya Afya'],src:['mixx','mixxl','eaw','js'],
  t:['Tanzanians already pool money for weddings, send-offs and kitchen parties, now through WhatsApp groups and mobile money; Mixx by Yas launched a Mchango service in February 2026 that lists medical support among its uses, and wedding contributions typically start around TSh 50,000. The idea: a pooled gift page for one mother, one parent or one patient. Mobile money makes risk-sharing networks larger and more active (Jack and Suri, 2014); Michango ya Afya turns that habit towards health, and every contributor sees the Afya name, the page and the box.','Watanzania tayari huchangishana fedha kwa harusi, send-off na kitchen party, sasa kupitia vikundi vya WhatsApp na pesa ya simu; Mixx by Yas ilizindua huduma ya Mchango Februari 2026 inayotaja msaada wa matibabu kama moja ya matumizi yake, na michango ya harusi kwa kawaida huanzia takriban TSh 50,000. Wazo: ukurasa wa zawadi ya pamoja kwa mama mmoja, mzazi mmoja au mgonjwa mmoja. Pesa ya simu hufanya mitandao ya kusaidiana kuwa mikubwa na hai zaidi (Jack na Suri, 2014); Michango ya Afya inaelekeza tabia hiyo kwenye afya, na kila mchangiaji anaona jina la Afya, ukurasa na boksi.']},
 {n:['3 · Care from afar','3 · Huduma ukiwa mbali'],src:['rem','bot','uncdf'],
  t:['Diaspora remittances reached TSh 3.313 trillion in 2024/25, and formal inflows grew 34.6% in 2024. A relative abroad can send money but cannot see whether it pays for a parent’s care. The idea: a monthly care plan for a parent, paid from abroad by card. It includes the condition box, a monthly Afya Check at the store, an adviser’s call, a short report and the delivery confirmation to the payer every month. Brothers and sisters can join the plan and share the cost. The payer never visits the store; the parent becomes a regular one.','Fedha zilizotumwa nyumbani na Watanzania walio nje zilifikia TSh trilioni 3.313 mwaka 2024/25, na zilizopitia njia rasmi zilikua kwa 34.6% mwaka 2024. Ndugu aliye nje anaweza kutuma fedha lakini hawezi kuona kama zinalipia huduma ya mzazi. Wazo: mpango wa huduma wa kila mwezi kwa mzazi, unaolipwa kutoka nje kwa kadi. Unajumuisha boksi la hali yake, Afya Check ya kila mwezi dukani, simu ya mshauri, ripoti fupi na uthibitisho wa kufikishwa kwa mlipaji kila mwezi. Kaka na dada wanaweza kujiunga na mpango na kugawana gharama. Mlipaji hafiki dukani; mzazi anakuwa mteja wa kudumu.']},
 {n:['4 · Back home, well','4 · Nyumbani, salama'],src:['atk','conec'],
  t:[`After an operation or a fall, a family needs equipment for weeks, not years. In Nairobi a wheelchair rents for KES 1,000 a day (${tsh(1000*KES)} at ${KES}) and a hospital bed for KES 15,000 a month (${tsh(15000*KES)}); no published rental price list was found for Dar es Salaam. The idea: a get-well bundle of the Kupona recovery box plus the equipment the discharge letter calls for, delivered, fitted, collected and cleaned, at a weekly fee of 7.5% of the buy-new price with a 30% refundable deposit (proposed terms). One wheelchair serves many families over its life instead of standing in a corner after six weeks.`,`Baada ya upasuaji au kuanguka, familia inahitaji vifaa kwa wiki, si miaka. Nairobi kiti cha magurudumu hukodishwa KES 1,000 kwa siku (${tsh(1000*KES)} kwa ${KES}) na kitanda cha hospitali KES 15,000 kwa mwezi (${tsh(15000*KES)}); hakuna orodha ya bei za kukodisha iliyochapishwa iliyopatikana kwa Dar es Salaam. Wazo: kifurushi cha kupona chenye boksi la Kupona pamoja na vifaa vinavyotajwa kwenye barua ya kuruhusiwa hospitali, vikifikishwa, kufungwa, kuchukuliwa na kusafishwa, kwa ada ya wiki ya 7.5% ya bei ya kununua kipya na amana ya 30% inayorudishwa (masharti yanayopendekezwa). Kiti kimoja cha magurudumu huhudumia familia nyingi katika maisha yake badala ya kusimama pembeni baada ya wiki sita.`]},
 {n:['5 · Corporate care','5 · Huduma kwa makampuni'],src:['bd','wel'],
  t:['Year-end hampers are a corporate habit in East Africa that shrinks in hard years. In Kenya, 87% of employees report workplace stress and 82.5% say employers should do more for their wellbeing. The idea: useful gifts instead of hampers. Staff wellness boxes, a new-baby gift for every staff birth, client gifts in the Luxury tier, and office first-aid kits refilled every quarter, on one invoice with delivery to every address. One company signs once and orders every quarter.','Vikapu vya zawadi vya mwisho wa mwaka ni desturi ya makampuni Afrika Mashariki inayopungua katika miaka migumu. Nchini Kenya, 87% ya wafanyakazi wanaripoti msongo kazini na 82.5% wanasema waajiri wanapaswa kufanya zaidi kwa ustawi wao. Wazo: zawadi zenye manufaa badala ya vikapu. Maboksi ya afya ya wafanyakazi, zawadi ya mtoto mchanga kwa kila mfanyakazi anayepata mtoto, zawadi za wateja katika ngazi ya Anasa, na visanduku vya huduma ya kwanza ofisini vinavyojazwa kila robo mwaka, kwa ankara moja na kufikisha kwenye kila anwani. Kampuni moja inasaini mara moja na kuagiza kila robo mwaka.']},
 {n:['6 · Gift cards that are used','6 · Kadi za zawadi zinazotumika'],src:['bank','fd'],
  t:[`In the US, 43% of adults hold an unused gift card, worth USD 244 on average (${tsh(244*USD)} at ${USD.toLocaleString('en-US',{minimumFractionDigits:2})}, ${fxd()}); in the UK, 74% of people spend more than the card’s value when they use one. The idea: Afya gift cards held as a balance in the recipient’s account, never expiring, with an SMS reminder until they are spent. Unspent balances are never counted as profit. A proposed smallest card of TSh 25,000 is an estimate, to be set with the opening price list.`,`Marekani, 43% ya watu wazima wana kadi ya zawadi ambayo haijatumika, yenye thamani ya wastani wa USD 244 (${tsh(244*USD)} kwa ${USD.toLocaleString('en-US',{minimumFractionDigits:2})}, ${fxd()}); Uingereza, 74% ya watu hutumia zaidi ya thamani ya kadi wanapoitumia. Wazo: kadi za zawadi za Afya zinazohifadhiwa kama salio kwenye akaunti ya mpokeaji, haziishi muda, na kikumbusho kwa SMS hadi zitumike. Salio lisilotumika halihesabiwi kamwe kama faida. Kadi ndogo kabisa inayopendekezwa ya TSh 25,000 ni makadirio, itakayowekwa pamoja na orodha ya bei ya ufunguzi.`]},
 {n:['7 · Pass it on','7 · Pitisha mbele'],src:[],
  t:['Not every family can afford a box. The idea: 2% of the value of every gift membership goes into a Pass it on fund that pays for boxes for families referred by community health workers. Every giver sees the running count of boxes funded on the gift page. A gift that also helps a neighbour is easier to choose and easier to share, and the business grows the way the community already works.','Si kila familia inaweza kumudu boksi. Wazo: 2% ya thamani ya kila uanachama wa zawadi inaingia kwenye mfuko wa Pitisha mbele unaolipia maboksi kwa familia zinazopendekezwa na wahudumu wa afya wa jamii. Kila mtoaji anaona idadi ya maboksi yaliyolipiwa ikiongezeka kwenye ukurasa wa zawadi. Zawadi inayomsaidia pia jirani ni rahisi kuichagua na kuishiriki, na biashara inakua kwa namna jamii inavyofanya kazi tayari.']}];
const cite=k=>RS[k]?`<a href="${E(RS[k].u)}" target="_blank" rel="noopener">${E(RS[k].t.split(':')[0])}</a>`:'';

const STEPS=[
 ['The organiser chooses the box, the plan and the message in the app or on WhatsApp.','Mratibu anachagua boksi, mpango na ujumbe kwenye programu au WhatsApp.'],
 ['Afya sends one link with the amount per person, to share in the family or office WhatsApp group.','Afya inatuma kiungo kimoja chenye kiasi kwa kila mtu, cha kushirikisha kwenye kikundi cha WhatsApp cha familia au ofisi.'],
 ['Each contributor taps the link and a payment request arrives on their own phone; they approve it with their PIN. Anyone can also pay the Lipa Namba number with the gift’s reference.','Kila mchangiaji anabonyeza kiungo na ombi la malipo linafika kwenye simu yake; analiidhinisha kwa PIN yake. Mtu yeyote anaweza pia kulipa kwa namba ya Lipa Namba akitumia kumbukumbu ya zawadi.'],
 ['Relatives abroad pay their share by card on the same page.','Ndugu walioko nje wanalipa sehemu yao kwa kadi kwenye ukurasa huohuo.'],
 ['The page shows who has paid and how much is left; the organiser gets an SMS for each payment.','Ukurasa unaonyesha nani amelipa na kiasi kilichobaki; mratibu anapata SMS kwa kila malipo.'],
 ['When the pool is full the gift is released: the card is delivered with the first box, and the recipient activates it with one call.','Mchango ukijaa zawadi inatolewa: kadi inafikishwa pamoja na boksi la kwanza, na mpokeaji anauanzisha uanachama kwa simu moja.']];

const CSS=`<style>
.s37 .ab-block>p,.s37 .ab-block>h3{margin-top:var(--s2)}
.s37-f span{display:block;color:var(--mute);font-size:var(--fs-cap);margin-bottom:4px}
.s37-f select{width:100%;max-width:520px;background:var(--surface);color:var(--ink);border:1px solid var(--line);padding:10px;font:inherit;font-size:calc(var(--fs-body) - 2px)}
.s37-rng input{width:100%;max-width:520px;accent-color:var(--green-edge)}
.s37-ch{display:block;width:100%;height:auto;margin-top:var(--s2)}
@media (max-width:720px){.s37-ch text{font-size:20px}}
.s37-leg{display:flex;flex-wrap:wrap;gap:var(--s2);font-size:var(--fs-cap);color:var(--mute);margin-top:8px}
.s37-leg i{display:inline-block;width:18px;height:0;vertical-align:middle;margin-right:6px;border-top:2px solid var(--green-edge)}
.s37-leg .s37-k2{border-top:2px dashed var(--gold)}
.s37-cap{font-size:var(--fs-cap);margin-top:12px}
.s37-occ{flex-wrap:wrap;border-radius:12px;margin-top:var(--s2)}
.s37-sm{font-size:var(--fs-cap)}
.s37 .ab-t td:first-child{min-width:160px}
.s37-gift{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:var(--s3);margin-top:var(--s3);align-items:start}
.s37-card{border:1px solid var(--green);background:var(--surface);padding:var(--s3)}
.s37-card small{display:block;color:var(--mute);font-size:var(--fs-cap)}.s37-card b{display:block;font-size:var(--fs-sub);font-weight:600;margin-top:6px}
.s37-card span{display:block;margin-top:8px;font-size:var(--fs-cap)}.s37-card p{margin-top:var(--s2);font-style:italic}
.s37-dl{margin:0}.s37-dl>div{display:flex;justify-content:space-between;gap:var(--s2);padding:8px 0;border-bottom:1px solid var(--line)}
.s37-dl dt{color:var(--mute);font-size:var(--fs-cap)}.s37-dl dd{margin:0;white-space:nowrap;font-variant-numeric:tabular-nums}.s37-dl .ab-tot dd{font-size:var(--fs-sub);font-weight:600}
.s37-idea{border-top:1px solid var(--line);padding-top:var(--s2);margin-top:var(--s3)}
.s37-idea h3{font-size:var(--fs-sub);font-weight:600}.s37-idea p{margin-top:8px}.s37-idea small{display:block;margin-top:8px;color:var(--mute);font-size:var(--fs-cap)}
.s37-idea small a{color:var(--mute)}
@media (max-width:860px){.s37-gift{grid-template-columns:1fr}}
</style>`;

function rentTable(){return `<div class="ab-tw"><table class="ab-t"><thead><tr><th>${E(T('Item','Kifaa'))}</th><th>${E(T('Buy new (Kenyan shelf, converted)','Kununua kipya (bei ya rafu Kenya, imebadilishwa)'))}</th><th>${E(T('Market rent, Nairobi','Kodi ya soko, Nairobi'))}</th><th>${E(T('Afya weekly fee','Ada ya wiki ya Afya'))} ${est()}</th><th>${E(T('Family pays for typical use','Familia inalipa kwa matumizi ya kawaida'))} ${est()}</th></tr></thead><tbody>
 ${RENT.map(r=>{const buy=buyT(r),fee=feeT(r),fam=R_DEL+R_CLEAN+fee*r.w;
  const mk=r.mk?`${r.mku==='day'?T(`KES ${nf(r.mk)} a day`,`KES ${nf(r.mk)} kwa siku`):T(`KES ${nf(r.mk)} a month`,`KES ${nf(r.mk)} kwa mwezi`)} <br>= ${tsh(r.mk*KES)}<br><span class="ab-mute s37-sm">${cite(r.mks)}</span>`:`<span class="ab-mute">${E(T('No published rate found','Hakuna kiwango kilichochapishwa kilichopatikana'))}</span>`;
  return `<tr><td><b>${E(T(r.n[0],r.n[1]))}</b><br><span class="ab-mute s37-sm"><a href="${E(r.u)}" target="_blank" rel="noopener">${E(RS[r.s].t.split(':')[0])}</a></span></td><td class="ab-n">${tsh(buy)}<br><span class="ab-mute s37-sm">KES ${nf(r.kes)} × ${KES}</span></td><td class="ab-n">${mk}</td><td class="ab-n">${tsh(fee)}</td><td class="ab-n">${tsh(fam)}<br><span class="ab-mute">${E(T(`about ${r.w} weeks`,`takriban wiki ${r.w}`))}</span></td></tr>`}).join('')}
 </tbody></table></div>`}
function fleetTable(){const r=RENT.find(x=>x.k===st.rent)||RENT[0],buy=buyT(r),fee=feeT(r),rev=fee*R_UTIL,dep=buy*R_COST/R_LIFE,rentals=Math.max(1,Math.round(R_UTIL/r.w)),clean=rentals*R_CLEAN;
 return `<div class="ab-tw"><table class="ab-t"><thead><tr><th>${E(T(`One unit for a year · ${T(r.n[0],r.n[1])}`,`Kifaa kimoja kwa mwaka · ${T(r.n[0],r.n[1])}`))}</th><th>TSh</th></tr></thead><tbody>
  <tr><td>${E(T(`Rental income at ${R_UTIL} weeks rented a year (half the year)`,`Mapato ya kukodisha kwa wiki ${R_UTIL} za kukodishwa kwa mwaka (nusu ya mwaka)`))}</td><td class="ab-n">${tsh(rev)} ${est()}</td></tr>
  <tr><td>${E(T(`Cost of the unit at ${Math.round(R_COST*100)}% of the shelf price, spread over ${R_LIFE} years`,`Gharama ya kifaa kwa ${Math.round(R_COST*100)}% ya bei ya rafu, ikigawanywa kwa miaka ${R_LIFE}`))}</td><td class="ab-n">${tsh(dep)} ${est()}</td></tr>
  <tr><td>${E(T(`Cleaning, ${rentals} rental(s) a year, recovered in the cleaning charge`,`Kusafisha, ukodishaji ${rentals} kwa mwaka, kunarudishwa kupitia ada ya kusafisha`))}</td><td class="ab-n">${tsh(clean)} ${est()}</td></tr>
  <tr><td><b>${E(T('Contribution of one unit a year, before staff time and storage','Mchango wa kifaa kimoja kwa mwaka, kabla ya muda wa wafanyakazi na hifadhi'))}</b></td><td class="ab-n"><b>${tsh(rev-dep)}</b> ${est()}</td></tr>
 </tbody></table></div>`}

const SRCLIST=()=>['rem','bot','uncdf','mixx','mixxl','mch','onek','eaw','js','std','nat','rec','bank','fd','bd','wel','atk','conec','mj','medi','medo','pk','mst','who','fx'].map(k=>({t:RS[k].t,u:RS[k].u,chk:k==='fx'?'9 Nov 2026':''})).concat([{t:'Box contents and shelf prices: the Afya Box files; each price links to its shop page in section 3.5',u:''}]);

function render(s,p,pv,nx){
 return `${CSS}<article class="ab-sec s37"><div class="ab-wrap">
 <div class="ab-sec-no">${E(s.no)}</div><h1>${E(s.title)}</h1>
 <p class="ab-summary">${E(T('Much health spending in Tanzania is made by someone other than the patient: a relative abroad paying for a parent, friends buying a gift for a new mother, colleagues helping a patient home, an employer looking after staff. This section shows seven ideas built for those payers: gift memberships, pooled gifts paid by mobile money, care paid from abroad, equipment rental, corporate care, gift cards and a fund that passes boxes on. They use the store’s stock, staff and riders, so they add sales without adding rent.','Matumizi mengi ya afya Tanzania yanafanywa na mtu mwingine badala ya mgonjwa: ndugu aliye nje anayemlipia mzazi, marafiki wanaomnunulia mama mpya zawadi, wafanyakazi wenzake wanaomsaidia mgonjwa kurudi nyumbani, mwajiri anayewatunza wafanyakazi. Sehemu hii inaonyesha mawazo saba yaliyojengwa kwa walipaji hao: uanachama kama zawadi, zawadi za pamoja zinazolipwa kwa pesa ya simu, huduma inayolipiwa kutoka nje, kukodisha vifaa, huduma kwa makampuni, kadi za zawadi na mfuko unaopitisha maboksi kwa wengine. Yanatumia bidhaa, wafanyakazi na wasafirishaji wa duka, hivyo yanaongeza mauzo bila kuongeza kodi ya pango.'))}</p>

 <figure class="ab-visual" id="s37rentFig">
  <h2>${E(T('Rent or buy: what a family pays','Kukodisha au kununua: familia inalipa kiasi gani'))}</h2>
  <div id="s37rentIn">${rentBox()}</div>
  <figcaption class="ab-mute s37-cap">${E(T('Buy-new prices from Kenyan medical-supply shops (no Dar es Salaam price list was found), converted at the Bank of Tanzania mean rate of 10 Nov 2026. Rental terms are Afya’s proposals.','Bei za kununua kipya kutoka maduka ya vifaa tiba ya Kenya (hakuna orodha ya bei ya Dar es Salaam iliyopatikana), zimebadilishwa kwa kiwango cha wastani cha Benki Kuu ya Tanzania cha 10 Nov 2026. Masharti ya kukodisha ni mapendekezo ya Afya.'))}</figcaption>
 </figure>

 <div class="ab-body">
  <section class="ab-block"><h2>${E(T('The people who pay for someone else’s care','Watu wanaolipia huduma ya mtu mwingine'))}</h2>
   <p>${E(T('The store is designed for the person who walks in. Many health purchases, though, are paid for by someone who does not: the son in London who covers his mother’s blood-pressure supplies, the office that collects for a colleague’s new baby, the family who needs a wheelchair for six weeks after a hip operation. These payers want three things the ordinary shop cannot give them: proof that the money became care, a gift that keeps arriving after the first week, and equipment for a short time without buying it.','Duka limeundwa kwa ajili ya mtu anayeingia mlangoni. Hata hivyo, manunuzi mengi ya afya yanalipiwa na mtu ambaye haingii: mwana aliyeko London anayelipia mahitaji ya presha ya mama yake, ofisi inayochangisha kwa ajili ya mtoto mchanga wa mfanyakazi mwenzao, familia inayohitaji kiti cha magurudumu kwa wiki sita baada ya upasuaji wa nyonga. Walipaji hawa wanataka mambo matatu ambayo duka la kawaida haliwezi kuwapa: uthibitisho kwamba fedha zimegeuka huduma, zawadi inayoendelea kufika baada ya wiki ya kwanza, na vifaa kwa muda mfupi bila kuvinunua.'))}</p>
   <p>${E(T('Each idea below starts from an observed habit, with its source, and turns it into a product the store can run with the same stock and the same riders. None of them is in the base-case financial model: they are upside, to be tested after opening.','Kila wazo hapa chini linaanzia kwenye tabia iliyoonekana, pamoja na chanzo chake, na kuigeuza kuwa huduma ambayo duka linaweza kuiendesha kwa bidhaa zilezile na wasafirishaji walewale. Hakuna hata moja lililomo katika modeli ya fedha ya hali ya msingi: ni fursa za ziada, zitakazojaribiwa baada ya kufungua.'))}</p>
  </section>

  <section class="ab-block"><h2>${E(T('Seven ideas','Mawazo saba'))}</h2>
   ${IDEAS().map(i=>`<div class="s37-idea"><h3>${E(T(i.n[0],i.n[1]))}</h3><p>${E(T(i.t[0],i.t[1]))}</p>${i.src.length?`<small>${E(T('Sources','Vyanzo'))}: <span lang="en">${i.src.map(cite).join(' · ')}</span></small>`:''}</div>`).join('')}
  </section>

  <section class="ab-block" id="s37gift"><h2>${E(T('Build a gift','Andaa zawadi'))}</h2>
   <p>${E(T('Choose the occasion, the plan and the tier. The gift is an ordinary Afya Box membership: the price is worked out the same way as for any member, with the 3%, 6% or 9% saving of the plan and packing and delivery included. Then share the first box among friends, as a Michango ya Afya pool.','Chagua tukio, mpango na ngazi. Zawadi ni uanachama wa kawaida wa Afya Box: bei inakokotolewa kwa njia ileile kama kwa mwanachama yeyote, kwa akiba ya 3%, 6% au 9% ya mpango, ufungashaji na usafirishaji ukiwemo. Kisha mgawane boksi la kwanza na marafiki, kama mchango wa Michango ya Afya.'))}</p>
   <div id="s37giftIn">${giftHTML()}</div>
  </section>

  <section class="ab-block"><h2>${E(T('Michango ya Afya, step by step','Michango ya Afya, hatua kwa hatua'))}</h2>
   <p>${E(T('The pool runs on the same mobile-money push request as a member’s monthly payment, so it needs no new payment system. Afya charges no platform fee; fundraising platforms in the region charge 2.5% (OneKitty) to 4.25% (M-Changa) of what is raised.','Mchango unaendeshwa kwa ombi lilelile la malipo kwa pesa ya simu kama malipo ya kila mwezi ya mwanachama, hivyo hauhitaji mfumo mpya wa malipo. Afya haitozi ada ya jukwaa; majukwaa ya kuchangisha fedha katika kanda hii yanatoza 2.5% (OneKitty) hadi 4.25% (M-Changa) ya kinachokusanywa.'))}</p>
   <ol class="ab-timeline">${STEPS.map((x,i)=>`<li><b>${E(T('Step','Hatua'))} ${i+1}</b><span>${E(T(x[0],x[1]))}</span></li>`).join('')}</ol>
  </section>

  <section class="ab-block"><h2>${E(T('Rentals: why they earn and what they need','Kukodisha: kwa nini kuna faida na kunahitaji nini'))}</h2>
   <p>${E(T('A walking frame or a wheelchair is bought once and rented many times. Cleaning and the trip to the home are charged to the family, so the weekly fee mostly pays back the unit. Rental is small in sales, but it reaches a household at the moment its need is greatest, usually just after discharge, and it pairs with the Kupona recovery box. Devices are rented only where safe use can be shown on delivery; the oxygen concentrator is rented only against a doctor’s prescription, in line with WHO guidance on the safe use of medical devices.','Fremu ya kutembelea au kiti cha magurudumu kinanunuliwa mara moja na kukodishwa mara nyingi. Kusafisha na safari ya kwenda nyumbani vinatozwa kwa familia, hivyo ada ya wiki kwa kiasi kikubwa inarudisha gharama ya kifaa. Kukodisha ni kidogo katika mauzo, lakini kunaifikia kaya wakati hitaji lake ni kubwa zaidi, kwa kawaida mara tu baada ya kuruhusiwa hospitali, na kunaenda pamoja na boksi la Kupona. Vifaa vinakodishwa tu pale matumizi salama yanapoweza kuonyeshwa wakati wa kufikisha; mashine ya oksijeni inakodishwa tu kwa cheti cha daktari, kwa kufuata mwongozo wa WHO kuhusu matumizi salama ya vifaa tiba.'))}</p>
   ${rentTable()}
   <h3>${E(T('What one unit earns in a year, for the item chosen above','Kifaa kimoja kinaingiza kiasi gani kwa mwaka, kwa kifaa kilichochaguliwa hapo juu'))}</h3>
   <div id="s37fleet">${fleetTable()}</div>
  </section>
 </div>

 <section class="ab-block"><h2>${E(T('Key figures','Takwimu muhimu'))}</h2>
  ${A().figsHTML([
   {v:T('TSh 3.313 trillion','TSh trilioni 3.313'),l:T('Sent home by Tanzanians abroad, 2024/25','Zilizotumwa nyumbani na Watanzania walio nje, 2024/25'),s:cite('rem')},
   {v:'+34.6%',l:T('Growth of formal remittance inflows in 2024','Ukuaji wa fedha zilizotumwa kupitia njia rasmi mwaka 2024'),s:cite('bot')},
   {v:T('485 days','Siku 485'),l:T('Average life of a gifted subscription, US and UK data','Muda wa wastani wa usajili uliotolewa kama zawadi, takwimu za Marekani na Uingereza'),s:cite('rec')},
   {v:tsh(1000*KES),l:T('A day’s wheelchair rent in Nairobi (KES 1,000 at 20.33)','Kodi ya siku moja ya kiti cha magurudumu Nairobi (KES 1,000 kwa 20.33)'),s:cite('atk')}])}
 </section>

 <section class="ab-block"><h2>${E(T('What this costs','Gharama yake'))}</h2>
  <p>${E(T('Gifts, pooled gifts and care paid from abroad are ordinary memberships, priced by the same rule and carried by the same staff and riders; they add no fixed cost. Rentals need a small fleet bought up front. At the buy-new prices above, a first fleet of two units of each of the eleven items would cost:','Zawadi, zawadi za pamoja na huduma inayolipiwa kutoka nje ni uanachama wa kawaida, unaowekwa bei kwa kanuni ileile na kubebwa na wafanyakazi na wasafirishaji walewale; haziongezi gharama isiyobadilika. Kukodisha kunahitaji vifaa vichache vinavyonunuliwa mapema. Kwa bei za kununua kipya zilizo hapo juu, vifaa vya kwanza viwili kwa kila kimoja kati ya vifaa kumi na moja vingegharimu:'))}</p>
  <div class="ab-tw"><table class="ab-t"><tbody>
   <tr><td>${E(T('22 units at the Kenyan shelf price, converted','Vifaa 22 kwa bei ya rafu Kenya, imebadilishwa'))}</td><td class="ab-n">${tsh(RENT.reduce((t,r)=>t+2*buyT(r),0))}</td></tr>
   <tr><td>${E(T(`The same at ${Math.round(R_COST*100)}% of shelf, if bought at a trade price`,`Vilevile kwa ${Math.round(R_COST*100)}% ya bei ya rafu, vikinunuliwa kwa bei ya jumla`))}</td><td class="ab-n">${tsh(RENT.reduce((t,r)=>t+2*buyT(r)*R_COST,0))} ${est()}</td></tr>
  </tbody></table></div>
  <p class="ab-mute" style="margin-top:12px;font-size:var(--fs-cap)">${E(T('The fleet is not yet a line in the use of funds (6.3); it would be bought from trading cash once rental demand is shown.','Vifaa hivi bado si mstari katika matumizi ya fedha (6.3); vingenunuliwa kutoka fedha za biashara mara mahitaji ya kukodisha yatakapoonekana.'))}</p>
 </section>

 ${A().openHTML([
  E(T('No published rental price list was found for Dar es Salaam; buy-new and market-rent prices are Kenyan and must be replaced by Tanzanian supplier quotes.','Hakuna orodha ya bei za kukodisha iliyochapishwa iliyopatikana kwa Dar es Salaam; bei za kununua kipya na za kodi ya soko ni za Kenya na lazima zibadilishwe na bei za wasambazaji wa Tanzania.')),
  E(T('The rental terms (7.5% a week, 30% deposit, TSh 15,000 delivery and collection, TSh 5,000 cleaning, 72% trade price, 3-year life, 26 weeks rented a year) are Afya’s proposals, not quotes.','Masharti ya kukodisha (7.5% kwa wiki, amana ya 30%, TSh 15,000 kufikisha na kuchukua, TSh 5,000 kusafisha, bei ya jumla ya 72%, maisha ya miaka 3, wiki 26 za kukodishwa kwa mwaka) ni mapendekezo ya Afya, si bei zilizotolewa na wasambazaji.')),
  E(T('Most of the habits behind the ideas are measured in Kenya, the US or the UK; how Tanzanian families will take to gift memberships and pooled gifts is to be tested after opening. No gift volume is assumed in the financial model.','Tabia nyingi zinazoyaunga mkono mawazo haya zimepimwa Kenya, Marekani au Uingereza; jinsi familia za Tanzania zitakavyopokea uanachama kama zawadi na zawadi za pamoja itajaribiwa baada ya kufungua. Hakuna kiasi cha zawadi kinachokadiriwa katika modeli ya fedha.')),
  E(T('What happens to a pool that is not filled (top-up, smaller gift or refund), the gift-card terms and the Pass it on fund rules are still to be written and reviewed against consumer-protection rules.','Kinachotokea kwa mchango usiojaa (kuongeza, zawadi ndogo au kurejesha fedha), masharti ya kadi za zawadi na kanuni za mfuko wa Pitisha mbele bado vinaandaliwa na kukaguliwa dhidi ya sheria za kumlinda mlaji.')),
  E(T('The gift films are being re-made with gloved hands and places only, with no faces, and will be added here when ready.','Filamu za zawadi zinatengenezwa upya kwa mikono yenye glavu na mahali tu, bila nyuso, na zitaongezwa hapa zikiwa tayari.'))])}

 ${A().sourcesHTML(SRCLIST())}
 ${A().pagerHTML(pv,nx)}
 </div></article>`}

function init(){const g=document.getElementById('s37gift'),f=document.getElementById('s37rentFig');
 if(g){g.addEventListener('click',e=>{const t=e.target.closest('[data-occ],[data-plan],[data-tier]');if(!t)return;
   if(t.dataset.occ)st.occ=t.dataset.occ;else if(t.dataset.plan)st.plan=t.dataset.plan;else st.tier=t.dataset.tier;
   document.getElementById('s37giftIn').innerHTML=giftHTML()});
  g.addEventListener('input',e=>{if(e.target.id!=='s37pool')return;st.n=+e.target.value;const o=OCC.find(x=>x.k===st.occ),r=firstBox(o.box,st.plan,st.tier);
   document.getElementById('s37n').textContent=st.n;const pt=document.getElementById('s37poolT');if(pt&&r)pt.innerHTML=poolTable(r)})}
 if(f)f.addEventListener('change',e=>{if(e.target.id!=='s37rent')return;st.rent=e.target.value;
  document.getElementById('s37rentIn').innerHTML=rentBox();const fl=document.getElementById('s37fleet');if(fl)fl.innerHTML=fleetTable();const s=document.getElementById('s37rent');if(s)s.focus()})}

window.SECTIONS['s3-7']={render,init,v2:true};
})();
