/* 0.1 Home: the 60-second story · v2 on the D2 template with the C6.1 Box Opens hero.
   Every number is read from MODEL (follows the funding switch) and labelled as an estimate,
   or cites a published source. Item labels on the box are names only: the researched list,
   brands and prices arrive with R6/R3 in section 3.5 (brief D3). */
(function(){
'use strict';
const A=()=>window.AB, T=(e,s)=>A().T(e,s), E=s=>A().E(s);

const SRC=[
 {t:'Mayige et al., Tanzania Journal of Health Research 27(2), 2026: hypertension among adults aged 18–69, 2023 National STEPS survey (doi 10.4314/thrb.v27i2.8)',u:'https://nhrdr.nimr.or.tz/records/209',chk:'9 Nov 2026'},
 {t:'WHO, United Republic of Tanzania hypertension country profile (2012 STEPS survey, adults aged 25–64)',u:'https://cdn.who.int/media/docs/default-source/country-profiles/hypertension/tza_en.pdf',chk:'9 Nov 2026'},
 {t:'Afya Basics financial model v1.2, base case (planning estimates)',u:''}];
const cite=n=>`<sup><a href="#abSrc" class="ab-cite" aria-label="${E(T('Source','Chanzo'))} ${n}">${n}</a></sup>`;

/* items visible in the approved render: [item point x,y] → [label x,y], in % of the image; names only */
const TAGS=[[[31,17],[31,4],'Nappies','Nepi'],[[60,12],[60,2],'Baby wipes','Vitambaa vya mtoto'],[[80,20],[80,9],'Sanitary pads','Pedi'],
 [[45,47],[45,58],'Body lotion','Losheni'],[[57,48],[57,71],'Vitamins, via the partner pharmacy','Vitamini, kupitia famasia mshirika'],[[69,47],[69,58],'Developmental toy','Kichezeo cha makuzi']];
const tsh=n=>'TSh '+Math.round(n).toLocaleString('en-US');
const tshM=n=>n>=1e9?'TSh '+(n/1e9).toFixed(1).replace(/\.0$/,'')+(lang()==='sw'?' bilioni':'B'):'TSh '+Math.round(n/1e6)+(lang()==='sw'?' milioni':'M');
const lang=()=>window.AFYA_LANG==='sw'?'sw':'en';

function numbers(){const M=window.MODEL,r=M.get('base'),I=M.inputs,lean=A().isLean();
 const est=`<span class="ab-est">${E(T('estimate','makadirio'))}</span>`, src=T('Financial model v1.2, base case','Modeli ya fedha v1.2, hali ya msingi');
 const y12=r.years[r.years.length-1],stores=(I.growth&&I.growth.stores_by_year||[]).slice(-1)[0];
 return {lean,seed:I.seed,own:I.ownership,figs:[
  {v:`${tshM(r.y1.revenue)} ${est}`,l:T('Revenue in year 1','Mapato mwaka wa 1'),s:E(src)},
  {v:`${T('Month','Mwezi')} ${r.breakeven_month} ${est}`,l:T('Month the store first makes a monthly profit','Mwezi duka linapoanza kupata faida ya mwezi'),s:E(src)},
  {v:`${Math.round(r.months[11].members).toLocaleString('en-US')} ${est}`,l:T('Afya Box members by month 12','Wanachama wa Afya Box ifikapo mwezi 12'),s:E(src)},
  {v:`${stores} · ${tshM(y12.revenue)} ${est}`,l:T('Stores and yearly revenue by year 12','Maduka na mapato ya mwaka ifikapo mwaka 12'),s:E(src)}]}}

function render(s,p,pv,nx){const N=numbers(),seed=N.seed;
 const tagsHTML=TAGS.map((t,i)=>`<i class="ab-ln" data-i="${i}" style="left:${t[1][0]}%;top:${Math.min(t[0][1],t[1][1])}%;height:${Math.abs(t[1][1]-t[0][1])}%"></i><div class="ab-tag" data-i="${i}" style="left:${t[1][0]}%;top:${t[1][1]}%">${E(T(t[2],t[3]))}</div><b class="ab-dot" data-i="${i}" style="left:${t[0][0]}%;top:${t[0][1]}%">${i+1}</b>`).join('');
 const legend=`<ol class="ab-legend" aria-hidden="true">${TAGS.map(t=>`<li>${E(T(t[2],t[3]))}</li>`).join('')}</ol>`;
 const tr=seed.tranches.map((f,i)=>`<tr><td>${E(T('Tranche','Awamu'))} ${i+1}</td><td class="ab-n">${Math.round(f*100)}%</td><td class="ab-n">${tsh(seed.amount*f)}</td></tr>`).join('');
 return `<article class="ab-sec" aria-labelledby="h-s0-1"><div class="ab-wrap">

 <section class="ab-boxopens" id="abBox" aria-label="${E(T('The Afya Box opens','Afya Box inafunguka'))}">
  <div class="ab-stage">
   <div class="ab-head">
    <div class="ab-sec-no">${E(s.no)}</div>
    <h1 id="h-s0-1">${E(T('Health essentials, without the hunt.','Bidhaa za afya, bila kuhangaika.'))}</h1>
    <p>${E(T('A health-essentials store in Dar es Salaam, and a monthly box that reaches the home before anything runs out. Your health, at your home.','Duka la bidhaa za afya jijini Dar es Salaam, na boksi la kila mwezi linalofika nyumbani kabla kitu hakijaisha. Afya yako, nyumbani kwako.'))}</p>
   </div>
   <div class="ab-world"><div class="ab-frame" id="abFrame">
    <img class="ab-render" src="assets/boxes/mama-na-mtoto-closed.webp" width="1376" height="768" alt="${E(T('The Afya Box for Mama na Mtoto: a green box with the lid lifted, gold lettering on the side','Afya Box ya Mama na Mtoto: boksi la kijani lenye mfuniko ulioinuliwa, maandishi ya dhahabu ubavuni'))}">
    <img class="ab-render ab-open" id="abOpen" src="assets/boxes/mama-na-mtoto-open.webp" width="1376" height="768" alt="${E(T('The same box open, with six unbranded items rising out of it','Boksi hilohilo likiwa wazi, vitu sita visivyo na chapa vikiinuka kutoka ndani'))}">
    <div class="ab-tags" id="abTags" aria-hidden="true">${tagsHTML}</div>
   </div>${legend}</div>
   <div class="ab-hint" aria-hidden="true"><span>${E(T('Closed','Limefungwa'))}</span><div class="ab-track"><i id="abProg"></i></div><span>${E(T('Open','Liko wazi'))}</span></div>
  </div>
 </section>
 <p class="ab-notice">${E(T('The items shown are an example of one Mama na Mtoto month. The full item list for every stage, with brand choices and sourced shelf prices, is in section 3.5.','Vitu vinavyoonyeshwa ni mfano wa mwezi mmoja wa Mama na Mtoto. Orodha kamili ya vitu kwa kila hatua, pamoja na chaguo za chapa na bei za rafu zenye vyanzo, iko katika sehemu ya 3.5.'))}</p>

 <section class="ab-block">
  <h2>${E(T('Care has moved home. Shopping for it has not.','Huduma ya afya imehamia nyumbani. Ununuzi wake bado haujahamia.'))}</h2>
  <div class="ab-body" style="margin-top:16px">
   <p>${T(`Almost one Tanzanian adult in four has raised blood pressure (2023)${cite(1)}. Of every hundred adults with hypertension, about two had it under control in the last national survey to measure control (2012)${cite(2)}. The condition is managed at home, every day, with tablets, monitors and refills. The shops that supply families were built for one-off purchases: they keep no record, do not deliver and run out.`,`Karibu mtu mzima mmoja kati ya wanne nchini Tanzania ana shinikizo la juu la damu (2023)${cite(1)}. Kati ya kila watu wazima mia wenye shinikizo la juu la damu, takriban wawili walikuwa wamelidhibiti katika utafiti wa mwisho wa kitaifa uliopima udhibiti (2012)${cite(2)}. Hali hii inasimamiwa nyumbani kila siku, kwa vidonge, vipimo na kujaza tena. Maduka yanayohudumia familia yalijengwa kwa manunuzi ya mara moja: hayaweki kumbukumbu, hayaleti nyumbani na bidhaa huisha.`)}</p>
   <p>${E(T('Afya Basics brings the products, a free health check and partner care services into one store and one monthly membership. Medicines are sold only by a licensed partner pharmacy.','Afya Basics inaleta bidhaa, kipimo cha afya cha bure na huduma za washirika katika duka moja na uanachama mmoja wa kila mwezi. Dawa zinauzwa na famasia mshirika yenye leseni pekee.'))}</p>
  </div>
 </section>

 <section class="ab-block">
  <h2>${E(T('Five numbers','Namba tano'))}</h2>
  ${A().figsHTML(N.figs.concat([{v:`${tshM(seed.amount)}`,l:T('The seed investment asked for','Uwekezaji wa awali unaoombwa'),s:E(N.lean?T('Start-small option','Chaguo la kuanza kidogo'):T('Flagship option','Chaguo la duka kuu'))}]))}
 </section>

 <section class="ab-block">
  <h2>${E(T('The ask','Ombi'))}</h2>
  <div class="ab-ask">
   <div class="ab-amt">${tshM(seed.amount)}<small>${E(N.lean?T('Seed round · start-small store, about 100 m²','Mtaji wa awali · duka dogo, takriban m² 100'):T('Seed round · flagship store, 180 m²','Mtaji wa awali · duka kuu, m² 180'))}</small></div>
   <div>
    <p>${E(T(`Released in three tranches. Founders keep at least ${Math.round(N.own.founders_floor*100)}% of the company for life, protected in the shareholder agreement.`,`Unatolewa kwa awamu tatu. Waanzilishi wanabaki na angalau ${Math.round(N.own.founders_floor*100)}% ya kampuni maisha yote, kwa ulinzi katika mkataba wa wanahisa.`))}</p>
    <div class="ab-tw"><table class="ab-t"><thead><tr><th>${E(T('Tranche','Awamu'))}</th><th>${E(T('Share','Sehemu'))}</th><th>${E(T('Amount','Kiasi'))}</th></tr></thead><tbody>${tr}</tbody></table></div>
    <p class="ab-mute" style="margin-top:12px;font-size:var(--fs-cap)">${E(T('The milestone that releases each tranche is set against the founding-member pre-sale; see section 6.3.','Lengo linalotoa kila awamu linawekwa kulingana na mauzo ya awali kwa wanachama waanzilishi; tazama sehemu ya 6.3.'))}</p>
   </div>
  </div>
 </section>

 <section class="ab-block">
  <h2>${E(T('Where to go next','Uende wapi sasa'))}</h2>
  ${A().doorsHTML(['s0-2','s1-1','s3-5','s6-3'])}
 </section>

 ${A().openHTML([
  E(T('The five numbers come from the financial model and will change when the price research (box prices, partner services) and the pre-sale plan are complete.','Namba tano zinatoka kwenye modeli ya fedha na zitabadilika utafiti wa bei (bei za boksi, huduma za washirika) na mpango wa mauzo ya awali utakapokamilika.'))])}

 <div id="abSrc">${A().sourcesHTML(SRC.map(x=>({t:x.t,u:x.u,chk:x.chk})))}</div>
 ${A().pagerHTML(pv,nx)}
 </div></article>`}

/* C6.1: scroll moves the box from closed to open; items rise one by one. Static end state for reduced motion. */
let onScroll=null;
function init(){const box=document.getElementById('abBox');if(!box)return;
 const frame=document.getElementById('abFrame'),open=document.getElementById('abOpen'),prog=document.getElementById('abProg'),tags=[...document.querySelectorAll('#abTags .ab-tag')],lns=[...document.querySelectorAll('#abTags .ab-ln')],dots=[...document.querySelectorAll('#abTags .ab-dot')],lis=[...document.querySelectorAll('#abBox .ab-legend li')];
 const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const update=()=>{const r=box.getBoundingClientRect(),total=Math.max(1,box.offsetHeight-innerHeight);
  const p=reduce?1:Math.min(1,Math.max(0,-r.top/total));
  prog.style.width=(p*100)+'%';
  frame.style.transform=reduce?'none':`scale(${(0.92+0.08*Math.min(1,p/0.35)).toFixed(3)})`;
  open.style.opacity=Math.min(1,Math.max(0,(p-0.3)/0.25)).toFixed(3);
  tags.forEach((t,i)=>{const q=Math.min(1,Math.max(0,(p-(0.5+i*0.05))/0.1));t.style.opacity=q.toFixed(3);t.style.transform=`translate(-50%,${((1-q)*10).toFixed(1)}px)`;[lns[i],dots[i],lis[i]].forEach(x=>{if(x)x.style.opacity=q.toFixed(3)})})};
 if(onScroll){removeEventListener('scroll',onScroll);removeEventListener('resize',onScroll)}
 onScroll=update;addEventListener('scroll',update,{passive:true});addEventListener('resize',update);
 addEventListener('afya:leave',()=>{removeEventListener('scroll',update);removeEventListener('resize',update)},{once:true});
 update()}

window.SECTIONS['s0-1']={render,init,v2:true};
})();
