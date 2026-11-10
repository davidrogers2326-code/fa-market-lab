/* 1.3 Market size · v2 on the D2 template.
   Bottom-up calculation kept from the old part1.js sec13 (audit/03-part1.md). Market constants carry their sources
   (households: NBS 2022 housing tables; growth: NBS census counts via City Population, re-opened 10 Nov 2026; health accounts:
   MoH NHA 2021/22). The need, afford and first-target shares are labelled estimates. The box price, Year-1 revenue,
   members and the share of the market the plan needs are read from MODEL, follow the funding switch and are wrapped in
   AB.numHTML (C6.4). Only the selected option is shown (B5). Visual: nested circles, not to scale (K1.7), with the
   calculation table beside it. The 400-houses grid (K1.24) is replaced by this one diagram. */
(function(){
'use strict';
const A=()=>window.AB,T=(e,s)=>A().T(e,s),E=s=>A().E(s),L=(e,s)=>E(T(e,s));
const lang=()=>window.AFYA_LANG==='sw'?'sw':'en';
const nf=n=>Math.round(n).toLocaleString('en-US');
const tsh=n=>'TSh '+nf(n);
const big=n=>{const sw=lang()==='sw';if(Math.abs(n)>=1e12)return 'TSh '+(n/1e12).toFixed(2)+(sw?' trilioni':'T');if(Math.abs(n)>=1e9)return 'TSh '+(n/1e9).toFixed(n>=1e11?0:1).replace(/\.0$/,'')+(sw?' bilioni':'B');return 'TSh '+Math.round(n/1e6)+(sw?' milioni':'M')};
const CHK='10 Nov 2026';

/* ---------- market constants (cited) ---------- */
const MK={hh:1537293,pop:5383728,natpop:61741120,pop12:4364541,che:6718540e6,oop:.27};
MK.g=Math.pow(MK.pop/MK.pop12,1/10)-1;            /* 2.1% a year, 2012–2022 census counts */
const DEF={g:.021,need:.5,aff:.3,win:.01};          /* need, afford, win: estimates */

const SRC=[
 {k:'housing',t:['NBS: 2022 Population and Housing Census, Housing Condition, Household Amenities and Assets (Tables 2.2 and 2.5): 1,537,293 private households in Dar es Salaam, 3.5 people each','NBS: Sensa ya Watu na Makazi 2022, Hali ya Makazi, Huduma na Mali za Kaya (Jedwali 2.2 na 2.5): kaya binafsi 1,537,293 Dar es Salaam, watu 3.5 kila moja'],u:'https://www.nbs.go.tz/uploads/statistics/documents/en-1764003000-Housing Condition, Household Amenities and Assets.pdf',chk:''},
 {k:'citypop',t:['City Population, NBS census counts: Dar es Salaam region 4,364,541 (2012) and 5,383,728 (2022); Tanzania 61,741,120 (2022)','City Population, sensa za NBS: mkoa wa Dar es Salaam 4,364,541 (2012) na 5,383,728 (2022); Tanzania 61,741,120 (2022)'],u:'https://www.citypopulation.de/en/tanzania/admin/07',chk:CHK},
 {k:'census',t:['NBS, June 2024: 2022 Population and Housing Census, Key Findings (15.4% aged 0–4, 5.7% aged 60 and over; 14.8% of Dar es Salaam residents insured against 7.0% nationally)','NBS, Juni 2024: Sensa ya Watu na Makazi 2022, Matokeo Muhimu (15.4% wenye miaka 0–4, 5.7% wenye miaka 60 na zaidi; 14.8% ya wakazi wa Dar es Salaam wana bima dhidi ya 7.0% kitaifa)'],u:'https://sensa.nbs.go.tz/publication/08. Key_Findings_Basic_Demographic_and_Socio-economic_ Eng_ 12.06.2024 Final.pdf',chk:''},
 {k:'steps_ht',t:['Mayige et al., Tanzania Journal of Health Research 27(2), 2026: hypertension among adults aged 18–69, 2023 National STEPS survey','Mayige na wenzake, Tanzania Journal of Health Research 27(2), 2026: shinikizo la juu la damu kwa watu wazima wa miaka 18–69, utafiti wa kitaifa wa STEPS 2023'],u:'https://nhrdr.nimr.or.tz/records/209',chk:CHK},
 {k:'nha',t:['Ministry of Health, Tanzania: National Health Accounts 2020/21 and 2021/22 (current health spending TSh 6.72 trillion; 27% out of pocket)','Wizara ya Afya, Tanzania: Akaunti za Kitaifa za Afya 2020/21 na 2021/22 (matumizi ya sasa ya afya TSh trilioni 6.72; 27% kutoka mfukoni)'],u:'https://p4h.world/app/uploads/2024/09/NATIONAL-MINISTRY-OF-HEALTH-FINAL-2021.22.x23411.pdf',chk:''},
 {k:'model',t:['Afya Basics financial model v1.2, base case (planning estimates; follows the funding option selected)','Modeli ya fedha ya Afya Basics v1.2, hali ya msingi (makadirio ya mipango; inafuata chaguo la mtaji lililochaguliwa)'],u:'',chk:''}];
const ix=k=>SRC.findIndex(x=>x.k===k)+1;
const cA=k=>`<a href="#s13Src" class="ab-cite" aria-label="${L('Source','Chanzo')} ${ix(k)}">${ix(k)}</a>`;
const cite=(...ks)=>`<sup>${ks.map(cA).join(', ')}</sup>`;
function srcFooter(){return `<div id="s13Src"><details class="ab-sources"><summary>${L('Sources for this section','Vyanzo vya sehemu hii')} (${SRC.length})</summary><ol>${SRC.map(x=>`<li><span lang="en">${x.u?`<a href="${E(x.u)}" target="_blank" rel="noopener">${L(x.t[0],x.t[1])}</a>`:L(x.t[0],x.t[1])}</span>${x.u?` <span class="ab-chk">· ${x.chk?L('checked','imekaguliwa')+' '+E(x.chk):L('not re-checked','haijakaguliwa tena')}</span>`:''}</li>`).join('')}</ol></details></div>`}
const est=()=>`<span class="ab-est">${L('estimate','makadirio')}</span>`;

/* ---------- the calculation ---------- */
function calc(o){const box=window.MODEL.inputs.members.avg_box;o=Object.assign({},DEF,{spend:box},o||{});
 const hh27=MK.hh*Math.pow(1+o.g,5),nh=hh27*o.need,yr=o.spend*12,tam=nh*yr,sh=nh*o.aff,sam=sh*yr,somh=sh*o.win,som=somh*yr;
 return Object.assign(o,{hh27,nh,yr,tam,sh,sam,somh,som})}
function plan(k){const M=window.MODEL,r=M.get(k||'base'),I=M.inputs,c=calc();
 const y1=r.y1.revenue,eq=y1/c.yr;return {y1,eq,pct:eq/c.sh*100,mem:r.months[11].members,orders:I.online?I.online.orders_day_m12:null,seed:I.seed.amount,lean:A().isLean()}}
const optName=P=>P.lean?T('start-small option (TSh 150M)','chaguo la kuanza kidogo (TSh 150M)'):T('flagship option (TSh 340M)','chaguo la duka kuu (TSh 340M)');
const SCN={base:['Base','Msingi'],best:['Best','Bora'],down:['Downside','Mbaya']};

/* nested circles, not to scale */
function ringsSVG(c,P){
 const cx=210,R=[190,128,70],cy=[210,272,330],lab=[
  [T('Total market','Soko lote'),big(c.tam),T(`${nf(c.nh)} homes`,`kaya ${nf(c.nh)}`)],
  [T('Reachable market','Soko linalofikika'),big(c.sam),T(`${nf(c.sh)} homes`,`kaya ${nf(c.sh)}`)],
  [T('First target','Lengo la kwanza'),big(c.som),T(`${nf(c.somh)} homes`,`kaya ${nf(c.somh)}`)]];
 const circ=R.map((r,i)=>`<circle cx="${cx}" cy="${cy[i]}" r="${r}" fill="${i===2?'var(--green)':i===1?'var(--green-deep)':'var(--surface)'}" stroke="${i?'var(--green-edge)':'var(--line)'}" stroke-width="1.5"/>`).join('');
 const ly=[60,170,300],tx=440;
 const labels=lab.map((l,i)=>{const ay=cy[i]-R[i]+18;return `<line x1="${cx+20}" y1="${ay}" x2="${tx-10}" y2="${ly[i]-6}" stroke="var(--mute)" stroke-width="1"/><circle cx="${cx+20}" cy="${ay}" r="3" fill="var(--mute)"/>
  <text x="${tx}" y="${ly[i]-14}" font-size="19" fill="var(--ink)">${E(l[0])}</text><text x="${tx}" y="${ly[i]+10}" font-size="24" font-weight="600" fill="var(--gold)">${E(l[1])}</text><text x="${tx}" y="${ly[i]+32}" font-size="17" fill="var(--mute)">${E(l[2])}</text>`}).join('');
 const planL=`<circle cx="${cx}" cy="${cy[2]+18}" r="9" fill="var(--gold)"/><line x1="${cx+9}" y1="${cy[2]+18}" x2="${tx-10}" y2="400" stroke="var(--gold)" stroke-width="1"/>
  <text x="${tx}" y="398" font-size="19" fill="var(--ink)">${L('Year-1 plan','Mpango wa Mwaka 1')}</text><text x="${tx}" y="424" font-size="24" font-weight="600" fill="var(--gold)">${E(big(P.y1))}</text><text x="${tx}" y="448" font-size="17" fill="var(--mute)">${L(`≈ ${nf(P.eq)} homes’ yearly spend`,`≈ matumizi ya mwaka ya kaya ${nf(P.eq)}`)}</text>`;
 return `<svg class="s13-rings" viewBox="0 0 740 470" role="img" aria-labelledby="s13rt"><title id="s13rt">${L('Nested circles, not to scale: the total market contains the reachable market, which contains the first target; a small gold dot inside marks the Year-1 plan','Duara ndani ya duara, si kwa uwiano halisi: soko lote lina soko linalofikika, ambalo lina lengo la kwanza; nukta ndogo ya dhahabu ndani yake ni mpango wa Mwaka 1')}</title>${circ}${planL}${labels}
  <text x="20" y="462" font-size="16" fill="var(--mute)">${L('Not to scale','Si kwa uwiano halisi')}</text></svg>`}

const CSS=`
.s13 figure.ab-visual{margin-left:0;margin-right:0}
.s13 figcaption{margin-top:var(--s2);color:var(--mute);font-size:var(--fs-cap);max-width:var(--measure)}
.s13 .s13-vis{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:var(--s4);align-items:start}
.s13 .s13-rings{display:block;width:100%;height:auto}
.s13 h3{font-size:var(--fs-sub);font-weight:600;margin-top:var(--s4)}
.s13 .ab-block>h2+*{margin-top:var(--s2)}
.s13 .ab-block>*+p,.s13 .ab-block>*+.ab-tw{margin-top:var(--s2)}
.s13 .ab-block p{max-width:var(--measure)}
.s13 tr.s13-res td{font-weight:600;border-top:1px solid var(--line)}
.s13 td small{display:block;color:var(--mute);font-size:var(--fs-cap)}
.s13 .s13-lay{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--s3);margin-top:var(--s3)}
.s13 .s13-lay div{border-top:1px solid var(--line);padding-top:var(--s2)}
.s13 .s13-lay b{display:block;font-weight:600;margin-bottom:6px}
.s13 .s13-lay small{display:block;color:var(--mute);font-size:var(--fs-cap);margin-top:8px}
.s13 .s13-calc{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:var(--s4);margin-top:var(--s3)}
.s13 .s13-calc label{display:block;margin-top:var(--s2)}
.s13 .s13-calc label span{display:flex;justify-content:space-between;gap:var(--s2)}
.s13 .s13-calc output{color:var(--gold);font-variant-numeric:tabular-nums;white-space:nowrap}
.s13 .s13-calc input[type=range]{width:100%;accent-color:var(--green-edge);margin-top:6px}
.s13 .s13-calc small{display:block;color:var(--mute);font-size:var(--fs-cap)}
.s13 .s13-out{display:grid;gap:var(--s2);align-content:start}
.s13 .s13-out div{border-top:1px solid var(--line);padding-top:var(--s2)}
.s13 .s13-out b{display:block;color:var(--gold);font-size:var(--fs-sub);font-weight:600;font-variant-numeric:tabular-nums}
.s13 .s13-out span{color:var(--mute);font-size:var(--fs-cap)}
.s13 .s13-meter{height:6px;background:var(--line);margin-top:8px}.s13 .s13-meter i{display:block;height:6px;background:var(--gold);width:0}
.s13 .s13-scn{display:flex;flex-wrap:wrap;gap:var(--s1);margin-top:var(--s1)}
.s13 .s13-scn button{background:none;border:1px solid var(--line);border-radius:999px;color:var(--mute);padding:7px 14px;font-size:var(--fs-cap);cursor:pointer;min-height:34px}
.s13 .s13-scn button[aria-pressed="true"]{background:var(--green-deep);color:var(--ink);border-color:var(--green-deep)}
@media (max-width:900px){.s13 .s13-vis,.s13 .s13-calc,.s13 .s13-lay{grid-template-columns:1fr;gap:var(--s3)}}`;

function render(s,p,pv,nx){
 const c=calc(),P=plan('base'),N=A().numHTML,box=c.spend;
 const natOOP=MK.che*MK.oop,share=MK.pop/MK.natpop,darOOP=natOOP*share;
 const row=(a,b,v,cls)=>`<tr${cls?` class="${cls}"`:''}><td>${a}${b?`<small>${b}</small>`:''}</td><td class="ab-n">${v}</td></tr>`;
 const table=`<div class="ab-tw"><table class="ab-t"><thead><tr><th>${L('Step','Hatua')}</th><th>${L('Result','Matokeo')}</th></tr></thead><tbody>
  ${row(L('Households in Dar es Salaam, 2022','Kaya Dar es Salaam, 2022')+cite('housing'),L('Counted in the 2022 census','Zilizohesabiwa katika sensa ya 2022'),nf(MK.hh))}
  ${row(L('Grown to 2027','Zikikuzwa hadi 2027')+cite('citypop'),L('× 1.021⁵: the city’s own growth, 2012–2022','× 1.021⁵: ukuaji wa jiji lenyewe, 2012–2022'),nf(c.hh27))}
  ${row(L('With a repeating health need','Zenye hitaji la afya linalojirudia')+' '+est(),L('× 50%','× 50%'),nf(c.nh))}
  ${row(L('Yearly spend per home if fully served','Matumizi ya mwaka kwa kaya ikihudumiwa kikamilifu')+cite('model'),L(`model average box ${tsh(box)} a month × 12`,`wastani wa boksi wa modeli ${tsh(box)} kwa mwezi × 12`),N('s13yr',c.yr,'tsh'))}
  ${row(L('Total market','Soko lote'),'',N('s13tam',c.tam,'tshM'),'s13-res')}
  ${row(L('Able and willing to pay for a planned service','Wenye uwezo na nia ya kulipia huduma iliyopangwa')+' '+est(),L(`× 30% = ${nf(c.sh)} homes`,`× 30% = kaya ${nf(c.sh)}`),N('s13sam',c.sam,'tshM'),'s13-res')}
  ${row(L('First-target share','Sehemu ya lengo la kwanza')+' '+est(),L(`× 1% = ${nf(c.somh)} homes`,`× 1% = kaya ${nf(c.somh)}`),N('s13som',c.som,'tshM'),'s13-res')}
  ${row(L('Year-1 revenue, base case','Mapato ya Mwaka 1, hali ya msingi')+cite('model'),optName(P),N('s13y1',P.y1,'tshM'))}
  ${row(L('Expressed in homes: Year-1 revenue ÷ one home’s yearly spend','Kwa kaya: mapato ya Mwaka 1 ÷ matumizi ya mwaka ya kaya moja'),'',N('s13eq',P.eq,'int'))}
  ${row(L('Share of reachable homes the plan needs','Sehemu ya kaya zinazofikika ambayo mpango unahitaji'),'',N('s13pct',P.pct,'pct'),'s13-res')}
 </tbody></table></div>`;
 const figs=[
  {v:nf(MK.hh),l:T('Private households in Dar es Salaam, 2022','Kaya binafsi Dar es Salaam, 2022'),s:L('2022 census, housing tables','Sensa ya 2022, majedwali ya makazi')},
  {v:`${N('s13fsam',c.sam,'tshM')} ${est()}`,l:T('Reachable market a year: homes able and willing to pay for a planned service','Soko linalofikika kwa mwaka: kaya zenye uwezo na nia ya kulipia huduma iliyopangwa'),s:L('Calculation in this section','Hesabu katika sehemu hii')},
  {v:`${N('s13fy1',P.y1,'tshM')} ${est()}`,l:T('Year-1 revenue, base case, '+optName(P),'Mapato ya Mwaka 1, hali ya msingi, '+optName(P)),s:L('Financial model v1.2','Modeli ya fedha v1.2')},
  {v:`${N('s13fpct',P.pct,'pct')} ${est()}`,l:T('Share of reachable homes the Year-1 plan needs','Sehemu ya kaya zinazofikika ambayo mpango wa Mwaka 1 unahitaji'),s:L('Year-1 revenue ÷ reachable market','Mapato ya Mwaka 1 ÷ soko linalofikika')}];
 return `<article class="ab-sec s13" aria-labelledby="h-s1-3"><style>${CSS}</style><div class="ab-wrap">
 <div class="ab-sec-no">${E(s.no)}</div><h1 id="h-s1-3">${E(s.title)}</h1>
 <p class="ab-summary">${L('One city is a large market, and the first year needs well under one per cent of it. The market is counted from the households in Dar es Salaam’s 2022 census, not borrowed from a headline. Each step is shown with its source, and every assumption is labelled as an estimate and can be changed in the calculator. A top-down check from the national health accounts lands in the same order of magnitude.','Jiji moja ni soko kubwa, na mwaka wa kwanza unahitaji chini sana ya asilimia moja yake. Soko limehesabiwa kuanzia kaya za sensa ya 2022 ya Dar es Salaam, si kuchukuliwa kutoka kichwa cha habari. Kila hatua inaonyeshwa pamoja na chanzo chake, na kila makisio yamewekwa alama ya makadirio na yanaweza kubadilishwa kwenye kikokotoo. Ukaguzi wa juu-chini kutoka akaunti za kitaifa za afya unafika ukubwa uleule.')}</p>

 <figure class="ab-visual"><div class="s13-vis">${ringsSVG(c,P)}${table}</div>
  <figcaption>${L(`Three layers of the Dar es Salaam market and the Year-1 plan, ${optName(P)}. Circles are not to scale: drawn to scale, the plan would be too small to see. Households from the 2022 census; growth from the census counts; shares marked “estimate” are planning assumptions; box price and revenue from the financial model.`,`Matabaka matatu ya soko la Dar es Salaam na mpango wa Mwaka 1, ${optName(P)}. Duara si kwa uwiano halisi: kwa uwiano halisi, mpango ungekuwa mdogo mno kuonekana. Kaya kutoka sensa ya 2022; ukuaji kutoka hesabu za sensa; sehemu zenye alama “makadirio” ni makisio ya mipango; bei ya boksi na mapato kutoka modeli ya fedha.`)}</figcaption>
 </figure>

 <div class="ab-body">
 <section class="ab-block"><h2>${L('Counting the market from the household up','Kuhesabu soko kuanzia kaya')}</h2>
  <p>${L('“The health market is worth billions” says little to an investor about how many families will buy a box from one store. This calculation starts from counted households instead. The household is the real buyer: one account orders for a baby, a working adult and a grandparent in one order.','“Soko la afya lina thamani ya mabilioni” halimwambii mwekezaji mengi kuhusu familia ngapi zitanunua boksi kutoka duka moja. Hesabu hii inaanzia kaya zilizohesabiwa badala yake. Kaya ndiyo mnunuzi halisi: akaunti moja inaagiza kwa ajili ya mtoto, mtu mzima anayefanya kazi na bibi katika oda moja.')}</p>
  <p>${T(`The 2022 census counted ${nf(MK.hh)} private households in Dar es Salaam, with 3.5 people each${cite('housing')}. Market sizing is then three questions, each narrower than the last. How many of those homes have a health need that repeats every month? How many of those can afford, and would choose, a planned and delivered service? And how many can one store, its app and its riders reach first? Each answer is a number of households, multiplied by what a household spends in a year.`,`Sensa ya 2022 ilihesabu kaya binafsi ${nf(MK.hh)} jijini Dar es Salaam, zenye watu 3.5 kila moja${cite('housing')}. Ukubwa wa soko basi ni maswali matatu, kila moja jembamba kuliko lililotangulia. Ni kaya ngapi kati ya hizo zenye hitaji la afya linalojirudia kila mwezi? Ni ngapi kati ya hizo zinaweza kumudu, na zingechagua, huduma iliyopangwa na kuletwa nyumbani? Na ni ngapi ambazo duka moja, programu yake na wasafirishaji wake wanaweza kuzifikia kwanza? Kila jibu ni idadi ya kaya, ikizidishwa kwa kiasi ambacho kaya hutumia kwa mwaka.`)}</p>
  <div class="s13-lay">
   <div><b>${L('Total market','Soko lote')}</b>${L('Every Dar es Salaam home with a repeating health need, fully served: a baby in nappies, or a father who checks his blood sugar every morning. A ceiling, not a forecast.','Kila kaya ya Dar es Salaam yenye hitaji la afya linalojirudia, ikihudumiwa kikamilifu: mtoto anayevaa nepi, au baba anayepima sukari kila asubuhi. Ni dari, si utabiri.')}<small>${N('s13ltam',c.tam,'tshM')} ${est()}</small></div>
   <div><b>${L('Reachable market','Soko linalofikika')}</b>${L('The homes that can afford and want a planned, quality service: a salaried household that pays by mobile money and values a box at the door over a cheaper stall across town.','Kaya zenye uwezo na nia ya huduma iliyopangwa na bora: kaya yenye mishahara inayolipa kwa pesa ya simu na inayothamini boksi mlangoni kuliko kibanda cha bei nafuu upande mwingine wa mji.')}<small>${N('s13lsam',c.sam,'tshM')} ${est()}</small></div>
   <div><b>${L('First target','Lengo la kwanza')}</b>${L('Homes inside the store’s catchment and same-day delivery routes that come in for a free check, buy once, then join a box. One store cannot serve the whole city, and the plan does not assume it will.','Kaya zilizo ndani ya eneo la duka na njia za usafirishaji wa siku hiyohiyo zinazokuja kwa kipimo cha bure, zinanunua mara moja, kisha zinajiunga na boksi. Duka moja haliwezi kuhudumia jiji zima, na mpango haudhanii hivyo.')}<small>${N('s13lsom',c.som,'tshM')} ${est()}</small></div>
  </div>
 </section>

 <section class="ab-block"><h2>${L('Why each assumption is cautious','Kwa nini kila makisio ni ya tahadhari')}</h2>
  <p>${T(`Households are grown to 2027 at 2.1% a year, the city’s own average growth between the last two censuses (${nf(MK.pop12)} people in 2012, ${nf(MK.pop)} in 2022)${cite('citypop')}. Half of those homes are assumed to have a repeating health need. That is deliberately low: 15.4% of Tanzanians are under five and 5.7% are over sixty${cite('census')}, 23.1% of adults aged 18–69 have raised blood pressure${cite('steps_ht')}, and a Dar es Salaam home has 3.5 people, so most homes contain at least one of these needs.`,`Kaya zinakuzwa hadi 2027 kwa asilimia 2.1 kwa mwaka, wastani wa ukuaji wa jiji lenyewe kati ya sensa mbili za mwisho (watu ${nf(MK.pop12)} mwaka 2012, ${nf(MK.pop)} mwaka 2022)${cite('citypop')}. Nusu ya kaya hizo zinakisiwa kuwa na hitaji la afya linalojirudia. Hiyo ni ndogo kwa makusudi: asilimia 15.4 ya Watanzania wako chini ya miaka mitano na asilimia 5.7 wana zaidi ya miaka sitini${cite('census')}, asilimia 23.1 ya watu wazima wa miaka 18–69 wana shinikizo la juu la damu${cite('steps_ht')}, na kaya ya Dar es Salaam ina watu 3.5, hivyo kaya nyingi zina angalau hitaji moja kati ya haya.`)}</p>
  <p>${L('Only 30% of need homes are treated as able and willing to pay for a planned service, and only 1% of those as winnable first by one store. The spend per home is the model’s average box price, which includes packing and delivery. It leaves out walk-in purchases, top-ups and partner services, so it understates what a member household spends.','Ni asilimia 30 tu ya kaya zenye hitaji zinazohesabiwa kuwa na uwezo na nia ya kulipia huduma iliyopangwa, na asilimia 1 tu ya hizo kuwa zinaweza kupatikana kwanza na duka moja. Matumizi kwa kaya ni bei ya wastani ya boksi ya modeli, inayojumuisha upakiaji na usafirishaji. Inaacha manunuzi ya dukani, manunuzi ya ziada na huduma za washirika, hivyo inapunguza kile kaya ya mwanachama hutumia.')}</p>
  <p>${L('The last lines of the table convert the plan into households. In reality the revenue will come from more homes, each buying less than a full box every month, and from walk-in customers.','Mistari ya mwisho ya jedwali inageuza mpango kuwa kaya. Kiuhalisia mapato yatatoka kwa kaya nyingi zaidi, kila moja ikinunua chini ya boksi kamili kila mwezi, na kwa wateja wanaoingia dukani.')}</p>
 </section>

 <section class="ab-block"><h2>${L('A second method lands in the same range','Njia ya pili inafika eneo lilelile')}</h2>
  <p>${T(`A top-down check uses the national health accounts. Tanzania spent TSh 6.72 trillion on health in 2021/22, and households paid 27% of it out of pocket${cite('nha')}. Allocated to Dar es Salaam by its share of the population${cite('citypop')}, that is about ${big(darOOP)} a year.`,`Ukaguzi wa juu-chini unatumia akaunti za kitaifa za afya. Tanzania ilitumia TSh trilioni 6.72 kwa afya mwaka 2021/22, na kaya zililipa asilimia 27 kutoka mifukoni mwao${cite('nha')}. Ikigawanywa kwa Dar es Salaam kwa sehemu yake ya idadi ya watu${cite('citypop')}, hiyo ni takriban ${big(darOOP)} kwa mwaka.`)}</p>
  <div class="ab-tw"><table class="ab-t"><thead><tr><th>${L('Top-down check','Ukaguzi wa juu-chini')}</th><th>${L('Result','Matokeo')}</th></tr></thead><tbody>
   ${row(L('Current health spending, Tanzania, 2021/22','Matumizi ya sasa ya afya, Tanzania, 2021/22')+cite('nha'),'',big(MK.che))}
   ${row(L('Paid out of pocket by households (27%)','Yaliyolipwa na kaya kutoka mfukoni (27%)')+cite('nha'),'',big(natOOP))}
   ${row(L(`Dar es Salaam’s share of the population (${(share*100).toFixed(1)}%)`,`Sehemu ya Dar es Salaam ya idadi ya watu (${(share*100).toFixed(1)}%)`)+cite('citypop'),L(`${nf(MK.pop)} ÷ ${nf(MK.natpop)}`,`${nf(MK.pop)} ÷ ${nf(MK.natpop)}`),big(darOOP),'s13-res')}
   ${row(L('Bottom-up reachable market, for comparison','Soko linalofikika la chini-juu, kwa ulinganisho'),'',N('s13xsam',c.sam,'tshM'),'s13-res')}
  </tbody></table></div>
  <p>${T(`The top-down figure counts only medical spending, fees and medicines, and leaves out nappies, wipes, personal-care and sanitary products, which are a large part of an Afya Box. It also gives the city only its population share, although Dar es Salaam households earn and insure more: 14.8% are insured against 7.0% nationally${cite('census')}. Both methods land in the same order of magnitude: tens to low hundreds of billions of shillings a year.`,`Takwimu ya juu-chini inahesabu matumizi ya kitabibu pekee, ada na dawa, na inaacha nepi, vitambaa, bidhaa za usafi binafsi na za hedhi, ambazo ni sehemu kubwa ya Afya Box. Pia inalipa jiji sehemu yake ya idadi ya watu tu, ingawa kaya za Dar es Salaam zina kipato na bima zaidi: asilimia 14.8 wana bima dhidi ya asilimia 7.0 kitaifa${cite('census')}. Njia zote mbili zinafika ukubwa uleule: makumi hadi mamia machache ya mabilioni ya shilingi kwa mwaka.`)}</p>
 </section>

 <section class="ab-block" id="s13Calc"><h2>${L('Try it: the market calculator','Jaribu: kikokotoo cha soko')}</h2>
  <p>${L('Change any assumption. The results and the share of the market the plan needs update together. The plan figure is the Year-1 revenue of the funding option selected at the top of the page, in the scenario chosen here.','Badilisha makisio yoyote. Matokeo na sehemu ya soko ambayo mpango unahitaji vinabadilika pamoja. Takwimu ya mpango ni mapato ya Mwaka 1 ya chaguo la mtaji lililochaguliwa juu ya ukurasa, katika hali iliyochaguliwa hapa.')}</p>
  <div class="s13-calc">
   <div>
    <label><span>${L('Yearly growth in households to 2027','Ukuaji wa kaya kwa mwaka hadi 2027')}<output id="s13oG"></output></span><input id="s13G" type="range" min="0" max="5" step="0.1" value="2.1"><small>${L('2.1% is the city’s own average growth, 2012–2022.','Asilimia 2.1 ni wastani wa ukuaji wa jiji lenyewe, 2012–2022.')}</small></label>
    <label><span>${L('Homes with a repeating health need','Kaya zenye hitaji la afya linalojirudia')}<output id="s13oN"></output></span><input id="s13N" type="range" min="20" max="80" step="1" value="50"><small>${L('Estimate. 50% is cautious.','Makadirio. Asilimia 50 ni ya tahadhari.')}</small></label>
    <label><span>${L('Monthly spend per home','Matumizi ya kila mwezi kwa kaya')}<output id="s13oS"></output></span><input id="s13S" type="range" min="20000" max="150000" step="500" value="${box}"><small>${T(`Default: the model’s average box, ${tsh(box)} a month, packing and delivery included.`,`Chaguo-msingi: wastani wa boksi wa modeli, ${tsh(box)} kwa mwezi, pamoja na upakiaji na usafirishaji.`)}</small></label>
    <label><span>${L('Homes able and willing to pay for a planned service','Kaya zenye uwezo na nia ya kulipia huduma iliyopangwa')}<output id="s13oA"></output></span><input id="s13A" type="range" min="10" max="60" step="1" value="30"><small>${L('Estimate, to be checked by catchment research before opening.','Makadirio, yatakaguliwa kwa utafiti wa eneo la duka kabla ya kufungua.')}</small></label>
    <label><span>${L('Share of reachable homes won first','Sehemu ya kaya zinazofikika zinazopatikana kwanza')}<output id="s13oW"></output></span><input id="s13W" type="range" min="0.25" max="5" step="0.25" value="1"><small>${L('Estimate: one store, its app, WhatsApp and same-day riders, over the first years.','Makadirio: duka moja, programu yake, WhatsApp na wasafirishaji wa siku hiyohiyo, katika miaka ya kwanza.')}</small></label>
   </div>
   <div class="s13-out" aria-live="polite">
    <div><b id="s13rT"></b><span>${L('Total market a year','Soko lote kwa mwaka')}</span></div>
    <div><b id="s13rS"></b><span id="s13rSh"></span></div>
    <div><b id="s13rF"></b><span id="s13rFh"></span></div>
    <div><span>${L('What the plan needs, Year 1','Kile mpango unachohitaji, Mwaka 1')}</span>
     <div class="s13-scn" role="group" aria-label="${L('Scenario','Hali')}" id="s13Scn">${Object.keys(SCN).map(k=>`<button type="button" data-k="${k}" aria-pressed="${k==='base'}">${L(SCN[k][0],SCN[k][1])}</button>`).join('')}</div>
     <b id="s13rP" style="margin-top:var(--s1)"></b><span id="s13rPt"></span><div class="s13-meter" aria-hidden="true"><i id="s13rM"></i></div></div>
   </div>
  </div>
  <p class="ab-mute" style="font-size:var(--fs-cap)">${L('Results are yearly spending at today’s prices. The bar shows the plan as a share of your first-target homes; a full bar means the plan needs all of them.','Matokeo ni matumizi ya mwaka kwa bei za leo. Mstari unaonyesha mpango kama sehemu ya kaya zako za lengo la kwanza; mstari uliojaa unamaanisha mpango unahitaji zote.')}</p>
 </section>
 </div>

 <section class="ab-block"><h2>${L('Key figures','Takwimu muhimu')}</h2>${A().figsHTML(figs)}</section>

 <section class="ab-block"><h2>${L('What the plan needs from this market','Kile mpango unachohitaji kutoka soko hili')}</h2>
  <p>${L(`Base case, ${optName(P)}. These figures follow the funding switch at the top of the page.`,`Hali ya msingi, ${optName(P)}. Takwimu hizi zinafuata kibadilishi cha mtaji juu ya ukurasa.`)}</p>
  <div class="ab-tw"><table class="ab-t"><thead><tr><th>${L('Year 1','Mwaka 1')}</th><th>${L('Value','Thamani')}</th></tr></thead><tbody>
   ${row(L('Revenue, net of VAT','Mapato, bila VAT')+' '+est(),'',N('s13ty1',P.y1,'tsh'))}
   ${row(L('Afya Box members by month 12','Wanachama wa Afya Box ifikapo mwezi 12')+' '+est(),'',N('s13tmem',P.mem,'int'))}
   ${P.orders!=null?row(L('Online orders a day by month 12','Oda za mtandaoni kwa siku ifikapo mwezi 12')+' '+est(),'',N('s13tord',P.orders,'int')):''}
   ${row(L('Homes-equivalent: revenue ÷ one home’s yearly box spend','Sawa na kaya: mapato ÷ matumizi ya mwaka ya boksi ya kaya moja'),'',N('s13teq',P.eq,'int'))}
   ${row(L('Share of reachable homes','Sehemu ya kaya zinazofikika'),'',N('s13tpct',P.pct,'pct'),'s13-res')}
  </tbody></table></div>
  <p>${L('The investment case does not rest on winning a large share of anything. Even if every estimate proved twice as optimistic as it is, the first-year plan would still need less than one per cent of the reachable market. The real constraint is execution in one catchment, which is why the plan opens one store, proves it, and only then expands.','Hoja ya uwekezaji haitegemei kupata sehemu kubwa ya chochote. Hata kama kila makadirio yangethibitika kuwa na matumaini mara mbili zaidi ya ilivyo, mpango wa mwaka wa kwanza bado ungehitaji chini ya asilimia moja ya soko linalofikika. Kikwazo halisi ni utekelezaji katika eneo moja, ndiyo maana mpango unafungua duka moja, unalithibitisha, na kisha tu unapanuka.')}</p>
 </section>

 <section class="ab-block"><h2>${L('Where to go next','Uende wapi sasa')}</h2>${A().doorsHTML(['s1-4','s3-4','s5-4','s6-1'])}</section>

 ${A().openHTML([
  L('The need (50%), afford (30%) and first-target (1%) shares are estimates, not survey results. Before opening, a survey of the chosen site’s catchment will measure them, and the model will be updated.','Sehemu za hitaji (50%), uwezo (30%) na lengo la kwanza (1%) ni makadirio, si matokeo ya utafiti. Kabla ya kufungua, utafiti wa eneo la duka lililochaguliwa utazipima, na modeli itasasishwa.'),
  L('Not every need household would spend a full box price, which is why the total market is a ceiling, not a forecast.','Si kila kaya yenye hitaji ingetumia bei kamili ya boksi, ndiyo maana soko lote ni dari, si utabiri.'),
  L('The household count (2022 housing tables), the census key findings and the national health accounts have not been re-opened at source for this edition; the census counts for Dar es Salaam were re-checked on 10 November 2026.','Idadi ya kaya (majedwali ya makazi ya 2022), matokeo muhimu ya sensa na akaunti za kitaifa za afya hazijafunguliwa tena kwenye chanzo kwa toleo hili; hesabu za sensa za Dar es Salaam zilikaguliwa tena tarehe 10 Novemba 2026.')])}

 ${srcFooter()}
 ${A().pagerHTML(pv,nx)}
 </div></article>`}

function init(){const g=id=>document.getElementById(id);if(!g('s13G'))return;
 const sw=lang()==='sw';let scn='base';
 const up=()=>{const o={g:+g('s13G').value/100,need:+g('s13N').value/100,spend:+g('s13S').value,aff:+g('s13A').value/100,win:+g('s13W').value/100};
  g('s13oG').textContent=(o.g*100).toFixed(1)+'%';g('s13oN').textContent=Math.round(o.need*100)+'%';g('s13oS').textContent=tsh(o.spend);g('s13oA').textContent=Math.round(o.aff*100)+'%';g('s13oW').textContent=(o.win*100).toFixed(2).replace(/0$/,'')+'%';
  const c=calc(o),y1=window.MODEL.get(scn).y1.revenue,eq=y1/c.yr,pct=eq/c.sh*100;
  g('s13rT').textContent=big(c.tam);g('s13rS').textContent=big(c.sam);g('s13rF').textContent=big(c.som);
  g('s13rSh').textContent=sw?`Soko linalofikika · kaya ${nf(c.sh)}`:`Reachable market · ${nf(c.sh)} homes`;
  g('s13rFh').textContent=sw?`Lengo la kwanza · kaya ${nf(c.somh)}`:`First target · ${nf(c.somh)} homes`;
  g('s13rP').textContent=(pct<0.01?'<0.01':pct.toFixed(2))+(sw?'% ya kaya zinazofikika':'% of reachable homes');
  g('s13rPt').textContent=sw?`Mapato ya Mwaka 1 ya ${big(y1)} ni sawa na matumizi ya mwaka ya takriban kaya ${nf(eq)}${pct<=o.win*100?', ndani ya lengo lako la kwanza.':', juu ya lengo lako la kwanza.'}`:`Year-1 revenue of ${big(y1)} equals the yearly spend of about ${nf(eq)} homes${pct<=o.win*100?', inside your first-target share.':', above your first-target share.'}`;
  g('s13rM').style.width=Math.min(100,pct/(o.win*100)*100)+'%'};
 ['s13G','s13N','s13S','s13A','s13W'].forEach(id=>g(id).addEventListener('input',up));
 document.querySelectorAll('#s13Scn button').forEach(b=>b.addEventListener('click',()=>{scn=b.dataset.k;document.querySelectorAll('#s13Scn button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));up()}));
 up()}

window.SECTIONS['s1-3']={render,init,v2:true};
})();
