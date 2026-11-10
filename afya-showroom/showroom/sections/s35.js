/* 3.5 Afya Boxes & Afya Choice · v2 on the D3 package template.
   Data: window.AFYA_DATA (built from afya-showroom/data by tools/build-data.js). Prices: window.AFYA_D4 (brief D4).
   A box without final research shows steps 1–3 and the "item list in research" notice only. */
(function(){
'use strict';
const A=()=>window.AB,T=(e,s)=>A().T(e,s),E=s=>A().E(s),L=o=>window.AB_PKG.L(o),P=()=>window.AB_PKG,D4=()=>window.AFYA_D4;
const DATA=()=>window.AFYA_DATA||{boxes:{},services:[]};
const tsh=n=>n==null?'—':'TSh '+Math.round(n).toLocaleString('en-US');

/* the line-up (brief B16, names per D-3) */
const LINEUP=[
 ['life',[['mama-mjamzito','Mama Mjamzito','Pregnancy, one box each trimester','Ujauzito, boksi moja kila miezi mitatu'],
  ['mama-na-mtoto','Mama na Mtoto','Mother and baby, from birth to 3 years','Mama na mtoto, tangu kuzaliwa hadi miaka 3'],
  ['afya-shule','Afya Shule','Children aged 4 to 12','Watoto wa miaka 4 hadi 12'],
  ['binti','Binti','Teenage girls','Wasichana wa umri wa balehe'],
  ['kijana','Kijana','Teenage boys','Wavulana wa umri wa balehe'],
  ['afya-glow','Afya Glow','Women aged 20 to 59','Wanawake wa miaka 20 hadi 59'],
  ['afya-men','Afya Men','Men aged 20 to 59','Wanaume wa miaka 20 hadi 59'],
  ['bibi-na-babu','Bibi na Babu','Older adults, 60 and over','Wazee, miaka 60 na zaidi']]],
 ['need',[['sukari','Sukari','Living with diabetes','Wanaoishi na kisukari'],
  ['presha','Presha','Living with high blood pressure','Wanaoishi na shinikizo la juu la damu'],
  ['figo','Figo','Kidney care and dialysis','Huduma ya figo na usafishaji damu'],
  ['kupona','Kupona','Recovery after surgery or injury','Kupona baada ya upasuaji au jeraha'],
  ['huduma-ya-kwanza','Huduma ya Kwanza','First aid at home','Huduma ya kwanza nyumbani'],
  ['nyumbani','Nyumbani','Home health essentials','Mahitaji ya afya ya nyumbani'],
  ['afya-siku','Afya Siku','Period care','Huduma ya hedhi'],
  ['afya-kazini','Afya Kazini','Offices','Ofisi'],
  ['afya-biashara','Afya Biashara','Small businesses','Biashara ndogo'],
  ['afya-hoteli','Afya Hoteli','Hotels and guest houses','Hoteli na nyumba za wageni']]]];
const RENDERS={'mama-na-mtoto':{closed:'assets/boxes/mama-na-mtoto-closed.webp',open:'assets/boxes/mama-na-mtoto-open.webp',
 altClosed:{en:'The Afya Box for Mama na Mtoto: a green box with the lid lifted, gold lettering on the side',sw:'Afya Box ya Mama na Mtoto: boksi la kijani lenye mfuniko ulioinuliwa, maandishi ya dhahabu ubavuni'},
 altOpen:{en:'The same box open, with six unbranded items rising out of it',sw:'Boksi hilohilo likiwa wazi, vitu sita visivyo na chapa vikiinuka kutoka ndani'},
 tags:[[[31,17],[31,4],'Nappies','Nepi'],[[60,12],[60,2],'Baby wipes','Vitambaa vya mtoto'],[[80,20],[80,9],'Sanitary pads','Pedi'],[[45,47],[45,58],'Body lotion','Losheni'],[[57,48],[57,71],'Vitamins, via the partner pharmacy','Vitamini, kupitia famasia mshirika'],[[69,47],[69,58],'Developmental toy','Kichezeo cha makuzi']]}};
RENDERS['mama-mjamzito']={closed:'assets/boxes/mama-mjamzito-closed.webp',open:'assets/boxes/mama-mjamzito-open.webp',dots:true,
 altClosed:{en:'The Afya Box for Mama Mjamzito: a green box with the lid lifted, gold lettering on the side',sw:'Afya Box ya Mama Mjamzito: boksi la kijani lenye mfuniko ulioinuliwa, maandishi ya dhahabu ubavuni'},
 altOpen:{en:'The same box open, with six unbranded pregnancy items rising out of it',sw:'Boksi hilohilo likiwa wazi, vitu sita vya ujauzito visivyo na chapa vikiinuka kutoka ndani'},
 tags:[[[35,22],[35,22],'Mosquito net','Chandarua'],[[44,40],[44,40],'Ginger tea','Chai ya tangawizi'],[[53,22],[53,22],'Body lotion','Losheni ya mwili'],[[62,22],[62,22],'Body wash','Sabuni ya kuogea'],[[58,46],[58,46],'Panty liners','Pedi nyembamba'],[[71,34],[71,34],'Mosquito repellent','Dawa ya kufukuza mbu']]};
const PLANS=[['m1','1 month','Mwezi 1'],['m6','6 months · Gold','Miezi 6 · Gold'],['m12','12 months · Platinum','Miezi 12 · Platinum']];
const TIERS=[['regular','Regular','Kawaida'],['premium','Premium','Bora'],['luxury','Luxury','Anasa']];
const STATUS={TZ:['Tanzanian shelf price','Bei ya rafu Tanzania'],KE:['Kenyan shelf price, converted','Bei ya rafu Kenya, imebadilishwa'],EST:['Estimate','Makadirio']};

const st={box:'mama-na-mtoto',stage:null,plan:'m6',tier:'regular',pick:{}};
const nameOf=k=>{for(const g of LINEUP)for(const b of g[1])if(b[0]===k)return b;return null};
const order=()=>LINEUP.flatMap(g=>g[1].map(b=>b[0]));

/* ---------- pricing ---------- */
function chosenBrand(it){const k=st.box+'|'+it.key,i=st.pick[k];const bs=it.brands||[];if(i!=null&&bs[i])return bs[i];return bs.find(b=>b.default)||bs[0]||null}
function stageLines(stage){return (stage.items||[]).filter(it=>it.kind!=='medicine'&&!it.optional).map(it=>{const b=chosenBrand(it);return {it,b,cost:D4().lineCost(b,it.units)}})}
function svcList(b){const S=DATA().services||[];return (b.services||[]).map(k=>S.find(s=>s.key===k)).filter(Boolean)}
function luxuryFor(b,tier){return (b.luxury||[]).find(x=>x.tier===tier)||null}
function priceStage(b,stage,plan,tier){const lines=stageLines(stage),shelf=D4().shelfValue(lines),missing=lines.filter(l=>l.cost==null).length;
 const r=D4().price(shelf,plan,[]);const lux=tier!=='regular'?luxuryFor(b,tier):null;
 return Object.assign(r,{missing,lux:lux&&lux.price_tsh||0,total:r.total+(lux&&lux.price_tsh||0)})}

/* ---------- pieces ---------- */
const srcLink=s=>s&&s.u?`<a href="${E(s.u)}" target="_blank" rel="noopener">${E(s.name||T('source','chanzo'))}</a>`:E((s&&s.name)||'');
const statusTag=x=>x?`<span class="ab-est">${E(T(...(STATUS[x]||[x,x])))}</span>`:'';
function lineupHTML(){return LINEUP.map(([g,list])=>`<h3>${E(g==='life'?T('By life stage','Kwa hatua ya maisha'):T('By condition or need','Kwa hali au hitaji'))}</h3>
 <div class="ab-lineup">${list.map(b=>{const d=DATA().boxes[b[0]],on=!!d;return `<button type="button" class="ab-lu" data-box="${b[0]}" aria-pressed="${st.box===b[0]}"${on?'':' disabled'}><b>${E(b[1])}</b><span>${E(T(b[2],b[3]))}</span>${on?'':`<small>${E(T('Item list in research','Orodha ya vitu inafanyiwa utafiti'))}</small>`}</button>`}).join('')}</div>`).join('')}

function itemsHTML(b,stage){const rows=(stage.items||[]).map(it=>{const med=it.kind==='medicine';
 const brands=med?`<span class="ab-mute">${E(T('Sold by the licensed partner pharmacy, not priced in the box','Inauzwa na famasia mshirika yenye leseni, haijawekwa kwenye bei ya boksi'))}</span>`
  :(it.brands||[]).map(br=>`<div class="ab-br">${br.afya_choice?`<span class="ab-choice">${E(T('Afya Choice','Chaguo la Afya'))}</span> `:''}${E(br.brand)} · ${E(br.product||'')} · ${E(br.pack||'')} <span class="ab-gold">${tsh(br.price_tsh)}</span> ${statusTag(br.status)} <span class="ab-mute">${srcLink(br.src)}${br.orig?` · ${E(br.orig.cur)} ${Number(br.orig.amount).toLocaleString('en-US')} × ${br.orig.rate} (${E(br.orig.date)})`:''}</span></div>`).join('');
 return `<tr><td data-th="${E(T('Item','Kitu'))}"><b>${E(L(it.name))}</b>${it.kind==='toy'?` <span class="ab-est">${E(T('toy','kichezeo'))}</span>`:''}</td><td data-th="${E(T('Why it is in the box','Kwa nini kiko kwenye boksi'))}">${E(L(it.why))}</td><td data-th="${E(T('Quantity','Kiasi'))}">${E(L(it.qty))}${it.qty_formula&&(typeof it.qty_formula==='object'||window.AFYA_LANG!=='sw')?`<br><span class="ab-mute">${E(L(it.qty_formula))}</span>`:''}</td><td data-th="${E(T('Brand choices and shelf prices','Chaguo za chapa na bei za rafu'))}">${brands}</td></tr>`}).join('');
 return `<div class="ab-tw"><table class="ab-t ab-items"><thead><tr><th>${E(T('Item','Kitu'))}</th><th>${E(T('Why it is in the box','Kwa nini kiko kwenye boksi'))}</th><th>${E(T('Quantity','Kiasi'))}</th><th>${E(T('Brand choices and shelf prices','Chaguo za chapa na bei za rafu'))}</th></tr></thead><tbody>${rows}</tbody></table></div>`}

function stageTabs(b){return `<div class="ab-seg ab-tabs" role="group" aria-label="${E(T('Stage','Hatua'))}">${b.stages.map(s=>`<button type="button" data-stage="${s.key}" aria-pressed="${s.key===st.stage}">${E(L(s.label))}</button>`).join('')}</div>`}
function planSeg(){return `<div class="ab-seg" role="group" aria-label="${E(T('Plan','Mpango'))}">${PLANS.map(p=>`<button type="button" data-plan="${p[0]}" aria-pressed="${p[0]===st.plan}">${E(T(p[1],p[2]))}</button>`).join('')}</div>`}
function tierSeg(){return `<div class="ab-seg" role="group" aria-label="${E(T('Tier','Ngazi'))}">${TIERS.map(t=>`<button type="button" data-tier="${t[0]}" aria-pressed="${t[0]===st.tier}">${E(T(t[1],t[2]))}</button>`).join('')}</div>`}

function servicesHTML(b){const S=svcList(b);if(!S.length)return `<p class="ab-mute">${E(T('No partner service is included in this box yet.','Bado hakuna huduma ya mshirika ndani ya boksi hili.'))}</p>`;
 return `<div class="ab-tw"><table class="ab-t"><thead><tr><th>${E(T('Service','Huduma'))}</th><th>${E(T('What the member gets','Mwanachama anapata nini'))}</th><th>${E(T('Walk-in price','Bei ya kawaida'))}</th><th>${E(T('Inside the box','Ndani ya boksi'))}</th><th>${E(T('Booked once by a member','Ikiagizwa mara moja na mwanachama'))}</th></tr></thead><tbody>${S.map(s=>`<tr><td><b>${E(L(s.name))}</b>${s.free_public_alternative?`<br><span class="ab-mute">${E(T('Free public option:','Chaguo la bure la umma:'))} ${E(L(s.free_public_alternative))}</span>`:''}</td><td>${E(L(s.what))}</td>${s.status==='STORE'?`<td class="ab-n" colspan="3">${E(T('Free, included in the membership','Bure, imejumuishwa kwenye uanachama'))}</td>`:s.status==='NO_QUOTE'?`<td class="ab-n" colspan="3">${E(T('Price published once a partner quotes','Bei itachapishwa mshirika akitoa bei'))}</td>`:`<td class="ab-n">${tsh(s.walkin_tsh)} ${statusTag(s.status)}<br><span class="ab-mute">${srcLink(s.src)}</span></td><td class="ab-n">${tsh(s.member_in_box_tsh)}</td><td class="ab-n">${tsh(s.addon_member_tsh)}</td>`}</tr>`).join('')}</tbody></table></div>
 <p class="ab-mute" style="margin-top:12px">${E(T('Inside the box, a service is charged at the partner’s price plus 25%, in the month it is delivered. The partner keeps its full price; Afya earns the 25% for booking, reminders and follow-up.','Ndani ya boksi, huduma inatozwa kwa bei ya mshirika pamoja na 25%, katika mwezi inapotolewa. Mshirika anapata bei yake yote; Afya inapata 25% kwa kupanga, kukumbusha na kufuatilia.'))}</p>`}

function tiersHTML(b,stage){const head=`<tr><th>${E(T('Tier','Ngazi'))}</th><th>${E(T('Taste of luxury','Ladha ya anasa'))}</th>${PLANS.map(p=>`<th>${E(T(p[1],p[2]))}</th>`).join('')}</tr>`;
 const rows=TIERS.map(t=>{const lux=t[0]==='regular'?null:luxuryFor(b,t[0]);return `<tr><td><b>${E(T(t[1],t[2]))}</b></td><td>${lux?`${E(L(lux.name))} · <span class="ab-gold">${tsh(lux.price_tsh)}</span> ${statusTag(lux.status)}`:`<span class="ab-mute">${E(T('Core box only','Boksi la msingi pekee'))}</span>`}</td>${PLANS.map(p=>`<td class="ab-n">${tsh(priceStage(b,stage,p[0],t[0]).total)}</td>`).join('')}</tr>`}).join('');
 return `<div class="ab-tw"><table class="ab-t"><thead>${head}</thead><tbody>${rows}</tbody></table></div><p class="ab-mute" style="margin-top:12px">${E(T('Every tier carries the same essential core. Prices are for the selected stage with the default brands; the luxury item is priced on its own line and is not discounted.','Kila ngazi ina msingi uleule muhimu. Bei ni za hatua iliyochaguliwa kwa chapa za kawaida; kitu cha anasa kinawekwa bei kwenye mstari wake na hakipunguzwi.'))}</p>`}

function buildHTML(b,stage){const lines=stageLines(stage);
 const rows=lines.map(({it,b:br})=>{const bs=it.brands||[],cur=bs.indexOf(br);return `<label class="ab-bb"><span>${E(L(it.name))}<small>${E(L(it.qty))}</small></span><select data-item="${E(it.key)}">${bs.map((x,i)=>`<option value="${i}"${i===cur?' selected':''}>${E(x.brand)} · ${E(x.pack||'')} · ${tsh(x.price_tsh)}${x.afya_choice?' · '+E(T('Afya Choice','Chaguo la Afya')):''}</option>`).join('')}</select></label>`}).join('');
 return `<div class="ab-bb-ctl">${planSeg()}${tierSeg()}</div><div class="ab-bb-grid"><div class="ab-bb-list">${rows}</div><aside class="ab-bb-sum" id="abSum" aria-live="polite"></aside></div>`}
function sumHTML(b,stage){const r=priceStage(b,stage,st.plan,st.tier),lux=st.tier!=='regular'?luxuryFor(b,st.tier):null,dm=stage&&stage.delivery_mode&&typeof stage.delivery_mode==='object'?stage.delivery_mode:null,dv=(stage&&typeof stage.delivery==='string')?stage.delivery:b.delivery,per=dm?T('per box','kwa boksi'):dv==='per-trimester'?T('per trimester box','kwa boksi la miezi mitatu'):dv==='every-2-months'?T('per two-month box','kwa boksi la miezi miwili'):dv==='every-3-months'?T('per three-month box','kwa boksi la miezi mitatu'):T('per month','kwa mwezi');
 return `<dl><div><dt>${E(T('Shelf value of the goods','Thamani ya bidhaa rafuni'))}</dt><dd>${tsh(r.shelf)}</dd></div>
 <div><dt>${E(T('Member price for the goods, packing and delivery included','Bei ya mwanachama kwa bidhaa, ufungashaji na usafirishaji ukiwemo'))}</dt><dd class="ab-gold">${tsh(r.core)}</dd></div>
 ${lux?`<div><dt>${E(L(lux.name))}</dt><dd>${tsh(lux.price_tsh)}</dd></div>`:''}
 <div class="ab-tot"><dt>${E(T('Total','Jumla'))} · ${E(per)}</dt><dd class="ab-gold">${tsh(r.total)}</dd></div>
 <div><dt>${E(T('Saving against the shelf','Akiba ukilinganisha na rafu'))}</dt><dd>${tsh(r.saving)}</dd></div></dl>
 ${r.missing?`<p class="ab-mute">${E(T(`${r.missing} item(s) have no sourced price yet and are left out of the total.`,`Vitu ${r.missing} bado havina bei yenye chanzo na havijajumuishwa.`))}</p>`:''}
 ${dm?`<p class="ab-mute">${E(T('Delivery: ','Usafirishaji: '))}${E(L(dm))}</p>`:b.delivery_note?`<p class="ab-mute">${E(L(b.delivery_note))}</p>`:''}
 <p class="ab-mute">${E(T('Partner services are added in the month they are delivered (step 5).','Huduma za washirika zinaongezwa katika mwezi zinapotolewa (hatua ya 5).'))}</p>`}

function packingHTML(b){const f=b.packing&&b.packing.film;const src=f?(window.AFYA_LANG==='sw'?f.sw:f.en):null;
 return `${src?`<video controls preload="none" playsinline style="width:100%;max-width:820px;display:block;background:var(--surface)" src="${E(src)}" aria-label="${E(T('How the box is packed','Jinsi boksi linavyofungashwa'))}"></video>`:''}
 <p style="margin-top:16px">${E(T('Each box is packed from the member’s locked list by a packer wearing gloves, photographed, sealed and delivered on the member’s fixed day. A QR code inside the lid opens a short guide to every item, and shows how to keep the empty box on a shelf for storage.','Kila boksi linafungashwa kutoka orodha iliyofungwa ya mwanachama na mfungashaji aliyevaa glavu, linapigwa picha, linafungwa na kufikishwa siku maalum ya mwanachama. Msimbo wa QR ndani ya mfuniko unafungua mwongozo mfupi wa kila kitu, na unaonyesha jinsi ya kutumia boksi tupu kama hifadhi kwenye rafu.'))}</p>`}

function remindersHTML(b){const tri=b.delivery==='per-trimester';
 const steps=tri?[['6 weeks before the box ships','Wiki 6 kabla boksi halijatumwa','Reminder to review the next trimester box','Kikumbusho cha kupitia boksi la miezi mitatu ijayo'],['12 days before it ships','Siku 12 kabla halijatumwa','Choices lock; brand swaps close','Chaguo zinafungwa; kubadilisha chapa kunafungwa'],['3 days and 1 day before payment','Siku 3 na siku 1 kabla ya malipo','Payment reminders by SMS or WhatsApp','Vikumbusho vya malipo kwa SMS au WhatsApp'],['Payment day','Siku ya malipo','A payment request arrives on the phone; the member approves with their PIN','Ombi la malipo linafika kwenye simu; mwanachama anaidhinisha kwa PIN yake'],['2 days later, if unpaid','Siku 2 baadaye, kama halijalipwa','A second request and a call from an adviser','Ombi la pili na simu kutoka kwa mshauri']]
  :[['Day 15','Siku ya 15','Reminder to customise next month’s box','Kikumbusho cha kubadilisha boksi la mwezi ujao'],['Day 18 (12 days before month end)','Siku ya 18 (siku 12 kabla ya mwisho wa mwezi)','Choices lock; brand swaps close','Chaguo zinafungwa; kubadilisha chapa kunafungwa'],['Days 17 and 19','Siku ya 17 na 19','Payment reminders by SMS or WhatsApp','Vikumbusho vya malipo kwa SMS au WhatsApp'],['Day 20','Siku ya 20','A payment request arrives on the phone; the member approves with their PIN','Ombi la malipo linafika kwenye simu; mwanachama anaidhinisha kwa PIN yake'],['Day 22, if unpaid','Siku ya 22, kama halijalipwa','A second request and a call from an adviser','Ombi la pili na simu kutoka kwa mshauri'],['Day 25, if still unpaid','Siku ya 25, kama bado halijalipwa','The box is held and the membership paused, not cancelled','Boksi linasubirishwa na uanachama unasimamishwa, haufutwi']];
 return `<ol class="ab-timeline">${steps.map(s=>`<li><b>${E(T(s[0],s[1]))}</b><span>${E(T(s[2],s[3]))}</span></li>`).join('')}</ol>
 <p style="margin-top:16px">${E(T('Swaps: for every item the member can choose between the brands on offer (up to five, in the same price range), in the app or in store, until the choices lock. Members on 6- and 12-month plans pay once and skip the monthly payment request.','Kubadilisha: kwa kila kitu mwanachama anaweza kuchagua kati ya chapa zilizopo (hadi tano, za bei inayolingana), kwenye programu au dukani, hadi chaguo zitakapofungwa. Wanachama wa mipango ya miezi 6 na 12 wanalipa mara moja na hawapati ombi la malipo kila mwezi.'))}</p>`}

function nextHTML(){const o=order(),i=o.indexOf(st.box),n=o[(i+1)%o.length],b=nameOf(n);return `<button type="button" class="ab-btn" data-box="${n}"${DATA().boxes[n]?'':' disabled'}>${E(b[1])} →</button>${DATA().boxes[n]?'':` <span class="ab-mute">${E(T('Item list in research','Orodha ya vitu inafanyiwa utafiti'))}</span>`}`}

function sourcesOf(b){const seen=new Map();const add=s=>{if(s&&s.u&&!seen.has(s.u))seen.set(s.u,{t:s.t||s.name||s.u,u:s.u,chk:s.chk})};
 (b.guidance||[]).forEach(add);(b.stages||[]).forEach(s=>(s.items||[]).forEach(it=>(it.brands||[]).forEach(br=>add(br.src))));(b.luxury||[]).forEach(x=>add(x.src));svcList(b).forEach(s=>add(s.src));return [...seen.values()]}


/* R9 · the Lishe nutrition shelf: chosen by the family, never assigned; no formula on the shelf */
function lisheHTML(){const N=(DATA().nutrition||[]);if(!N.length)return '';
 const band=x=>x.age_from_months==null?T('All ages in the family','Umri wote katika familia'):x.age_to_months==null?T(`From ${x.age_from_months} months`,`Kuanzia miezi ${x.age_from_months}`):T(`${x.age_from_months} to ${x.age_to_months} months`,`Miezi ${x.age_from_months} hadi ${x.age_to_months}`);
 const groups=new Map();N.forEach(x=>{const k=band(x);if(!groups.has(k))groups.set(k,[]);groups.get(k).push(x)});
 return `<section class="ab-pkg-step"><div class="ab-k">+</div><h2>${E(T('The Lishe nutrition shelf','Rafu ya Lishe'))}</h2>
 <p>${E(T('Next to the box, families can add foods for the child and the mother. Nothing here is put in a box automatically: the family chooses. Following WHO and UNICEF guidance, a baby under 6 months needs only breast milk, so the shelf offers nothing for that age. Complementary foods start at 6 months, alongside breastfeeding, and cow’s milk as a drink from 12 months.','Kando ya boksi, familia zinaweza kuongeza vyakula kwa mtoto na mama. Hakuna kinachowekwa kwenye boksi bila kuchaguliwa: familia ndiyo inachagua. Kwa mujibu wa mwongozo wa WHO na UNICEF, mtoto chini ya miezi 6 anahitaji maziwa ya mama pekee, kwa hiyo rafu haina chochote kwa umri huo. Vyakula vya nyongeza vinaanza miezi 6, pamoja na kunyonyesha, na maziwa ya ng’ombe kama kinywaji kuanzia miezi 12.'))}</p>
 <p class="ab-notice"><b>${E(T('Breastfeeding is recommended.','Kunyonyesha kunapendekezwa.'))}</b> ${E(T('Following WHO guidance, babies are fed only breast milk for the first six months, and breastfeeding continues alongside other foods up to two years and beyond. In line with WHO’s International Code and Tanzania’s rules on marketing breast-milk substitutes, Afya Basics does not display, list or promote infant formula in any box, shelf or page.','Kwa mujibu wa mwongozo wa WHO, watoto wanalishwa maziwa ya mama pekee katika miezi sita ya kwanza, na kunyonyesha kunaendelea pamoja na vyakula vingine hadi miaka miwili na zaidi. Kwa kufuata Kanuni ya Kimataifa ya WHO na sheria za Tanzania kuhusu matangazo ya vibadala vya maziwa ya mama, Afya Basics haionyeshi, haiorodheshi wala haitangazi maziwa ya kopo ya watoto katika boksi, rafu au ukurasa wowote.'))}</p>
 ${[...groups].map(([g,rows])=>`<h3>${E(g)}</h3><div class="ab-tw"><table class="ab-t"><thead><tr><th>${E(T('Food','Chakula'))}</th><th>${E(T('Why','Kwa nini'))}</th><th>${E(T('Shelf price','Bei ya rafu'))}</th></tr></thead><tbody>${rows.map(x=>`<tr><td><b>${E(L(x.name))}</b><br><span class="ab-mute">${E(x.brand||'')} · ${E(x.pack||'')}</span></td><td>${E(L(x.why))}</td><td class="ab-n">${tsh(x.price_tsh)} ${statusTag(x.status)}<br><span class="ab-mute">${srcLink(x.src)}</span></td></tr>`).join('')}</tbody></table></div>`).join('')}
 </section>`}
function packageHTML(key){const b=DATA().boxes[key],nm=nameOf(key),R=RENDERS[key]||{};
 const head=`<h2 class="ab-pkg-title">${E(nm?nm[1]:key)}</h2><p>${E(nm?T(nm[2],nm[3]):'')}</p>`;
 let h=P().boxOpens({id:'abPkgBox',head,closed:R.closed,open:R.open,altClosed:R.altClosed,altOpen:R.altOpen,tags:R.tags,dots:R.dots});
 if(!b)return h+`<p class="ab-notice">${E(T('Item list in research.','Orodha ya vitu inafanyiwa utafiti.'))}</p>`;
 if(!st.stage||!b.stages.some(s=>s.key===st.stage))st.stage=b.stages[0].key;
 const stage=b.stages.find(s=>s.key===st.stage);
 const step=(n,body)=>`<section class="ab-pkg-step" data-step="${n}"><div class="ab-k">${n}</div><h2>${E(T(P().STEPS[n-1][0],P().STEPS[n-1][1]))}</h2>${body}</section>`;
 h+=step(3,`<div class="ab-body">${L(b.who)}</div>${b.clinic_line?`<p class="ab-notice">${E(L(b.clinic_line))}</p>`:''}`);
 if(!b.final)return h+`<p class="ab-notice">${E(T('Item list in research. The items, brand choices and sourced prices for this box are published here once the research is complete.','Orodha ya vitu inafanyiwa utafiti. Vitu, chaguo za chapa na bei zenye vyanzo za boksi hili zitachapishwa hapa utafiti ukikamilika.'))}</p>`;
 h+=step(4,stageTabs(b)+itemsHTML(b,stage));
 h+=step(5,servicesHTML(b));
 if(key==='mama-na-mtoto')h+=lisheHTML();
 h+=step(6,tiersHTML(b,stage));
 h+=step(7,buildHTML(b,stage));
 h+=step(8,packingHTML(b));
 h+=step(9,remindersHTML(b));
 h+=step(10,nextHTML());
 if(b.open&&b.open.length)h+=A().openHTML(b.open.map(o=>E(L(o))));
 h+=A().sourcesHTML(sourcesOf(b));
 return h}

function render(s,p,pv,nx){
 return `<article class="ab-sec"><div class="ab-wrap">
 <div class="ab-sec-no">${E(s.no)}</div><h1>${E(s.title)}</h1>
 <p class="ab-summary">${E(T('Every Afya Box is a month (or a trimester) of a household’s health essentials, chosen for one stage of life or one condition, delivered before anything runs out. For every item the member picks from up to five brands in the same price range, and pays 3%, 6% or 9% less than the shelf price on a 1-, 6- or 12-month plan, with packing and delivery included. Two boxes are complete: Mama Mjamzito and Mama na Mtoto. They are the model for the rest of the line-up.','Kila Afya Box ni mahitaji ya afya ya kaya kwa mwezi mmoja (au miezi mitatu), yaliyochaguliwa kwa hatua moja ya maisha au hali moja, yanayofika kabla kitu hakijaisha. Kwa kila kitu mwanachama anachagua kati ya chapa hadi tano za bei inayolingana, na analipa 3%, 6% au 9% chini ya bei ya rafu kwa mpango wa mwezi 1, miezi 6 au miezi 12, ufungashaji na usafirishaji ukiwemo. Maboksi mawili yamekamilika: Mama Mjamzito na Mama na Mtoto. Ndiyo mfano kwa maboksi mengine.'))}</p>
 <section class="ab-block"><h2>${E(T('The line-up','Mpangilio wa maboksi'))}</h2>${lineupHTML()}</section>
 <div id="abPkg" class="ab-block">${packageHTML(st.box)}</div>
 ${A().pagerHTML(pv,nx)}
 </div></article>`}

function wire(){const root=document.getElementById('app');if(!root)return;
 const sum=document.getElementById('abSum');const b=DATA().boxes[st.box];
 if(sum&&b){const stage=b.stages.find(s=>s.key===st.stage);sum.innerHTML=sumHTML(b,stage)}
 P().initBoxOpens('abPkgBox')}
function rerender(scrollToPkg){const el=document.getElementById('abPkg');if(!el)return;el.innerHTML=packageHTML(st.box);
 document.querySelectorAll('.ab-lu').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.box===st.box)));wire();
 if(scrollToPkg)el.scrollIntoView({block:'start'})}
let bound=false;
function init(){wire();if(bound)return;bound=true;
 document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-box],[data-stage],[data-plan],[data-tier]');if(!t||!document.getElementById('abPkg'))return;
  if(t.dataset.box){st.box=t.dataset.box;st.stage=null;rerender(true)}
  else if(t.dataset.stage){st.stage=t.dataset.stage;rerender(false)}
  else if(t.dataset.plan){st.plan=t.dataset.plan;rerender(false)}
  else if(t.dataset.tier){st.tier=t.dataset.tier;rerender(false)}});
 document.addEventListener('change',e=>{const s=e.target.closest&&e.target.closest('select[data-item]');if(!s)return;st.pick[st.box+'|'+s.dataset.item]=+s.value;
  const b=DATA().boxes[st.box],stage=b.stages.find(x=>x.key===st.stage),sum=document.getElementById('abSum');if(sum)sum.innerHTML=sumHTML(b,stage)})}

window.SECTIONS['s3-5']={render,init,v2:true};
window.AB_S35={priceStage,st};
})();
