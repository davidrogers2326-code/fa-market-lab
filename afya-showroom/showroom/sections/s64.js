/* 6.4 Ownership and exit · v2 on the D2 template.
   Ownership is read from MODEL.inputs.ownership (founders' floor, seed investor share, option pool) and the seed from
   MODEL.inputs.seed, so the post-money figure follows the funding switch (AB.numHTML); only the selected option is shown (B5).
   D-6: Fahmy Abbas Cothema and Cecilia are shown together as founders with one combined holding and one 25% floor;
   no split and no relationship. D-11: the 30% investor share is shown as "to be confirmed".
   The dilution simulator works on the model's ownership inputs. The sale calculator reads EBITDA from MODEL.get(case).years.
   The founders'-pay tool runs MODEL.get('base') itself with a temporary running-cost line for the founders' pay,
   restored straight after (one engine; the old sim() copy of the formulas is not carried over). */
(function(){
'use strict';
const A=()=>window.AB,T=(e,s)=>A().T(e,s),E=s=>A().E(s),N=(k,v,f)=>A().numHTML(k,v,f);
const sw=()=>window.AFYA_LANG==='sw';
const tsh=n=>'TSh '+Math.round(n).toLocaleString('en-US');
const tshM=n=>{if(Math.abs(n)>=1e9){const b=n/1e9,y=(b<0?'−':'')+String(parseFloat(Math.abs(b).toFixed(2)));return sw()?'TSh '+y+' bilioni':'TSh '+y+'B'}const v=n/1e6,a=Math.abs(v),x=(v<0?'−':'')+String(parseFloat(a.toFixed(a>=100?0:1)));return sw()?'TSh '+x+' milioni':'TSh '+x+'M'};
const sg=n=>(n<0?'−':'')+tshM(Math.abs(n));
const pc=(n,d)=>String(parseFloat((n*100).toFixed(d==null?0:d)))+'%';
const est=()=>`<span class="ab-est">${E(T('estimate','makadirio'))}</span>`;
const sum=a=>a.reduce((t,x)=>t+x,0);
const CHK='10 Nov 2026';
const SCN={base:['Base case','Hali ya msingi'],best:['Best case','Hali bora'],down:['Downside case','Hali mbaya']};
const COL={f:'--green',s:'--gold',p:'--green-edge',n:'--mute'};

/* ---------- dilution on the model's ownership inputs ----------
   Each later round sells share d of the company: every holder is diluted by (1−d). If the founders would fall below the
   floor, they are topped back up to it and the other holders give up the difference in proportion to their stakes. */
function dilute(O,rounds,d){let h={f:O.founders_after_seed,s:O.seed_investor_share,p:O.option_pool,n:0};let fu=h.f,fired=false;
 const steps=[Object.assign({},h)],unp=[fu];
 for(let k=0;k<rounds;k++){const nh={f:h.f*(1-d),s:h.s*(1-d),p:h.p*(1-d),n:h.n*(1-d)+d};fu*=(1-d);
  if(nh.f<O.founders_floor){const def=O.founders_floor-nh.f,oth=nh.s+nh.p+nh.n,k2=(oth-def)/oth;nh.f=O.founders_floor;nh.s*=k2;nh.p*=k2;nh.n*=k2;fired=true}
  h=nh;steps.push(Object.assign({},h));unp.push(fu)}
 return {steps,unp,fired}}

/* ---------- founders' pay: the model itself, with a temporary running-cost line ---------- */
function runPay(v){const I=window.MODEL.inputs,ox=I.opex_month,had=Object.prototype.hasOwnProperty.call(ox,'founders_pay');
 try{if(v>0)ox.founders_pay=v;return window.MODEL.get('base')}finally{if(!had)delete ox.founders_pay}}
function payResult(v,mode){const base=window.MODEL.get('base'),paid=runPay(v),be0=base.breakeven_month||13;let cum=0;
 const months=base.months.map((q,i)=>{const src=(mode==='m1'||q.m>=be0)?paid.months[i]:q;cum+=src.profit;return Object.assign({},src,{cum_profit:cum})});
 const y1=sum(months.map(q=>q.profit)),be=months.find(q=>q.profit>0);
 const r={key:'base',months};let low=null;try{low=window.AB_S6.cashPath(window.MODEL.inputs,r).low}catch(e){}
 return {base,y1,be:be?be.m:null,deep:Math.min(0,...months.map(q=>q.cum_profit)),deep0:Math.min(0,...base.months.map(q=>q.cum_profit)),low,be0:base.breakeven_month}}

/* ---------- charts (K2): hairline axes, green and gold series, muted labels ---------- */
function donutSVG(O){const segs=[[O.founders_after_seed,COL.f,T('Founders','Waanzilishi')],[O.seed_investor_share,COL.s,T('Seed investor','Mwekezaji wa awali')],[O.option_pool,COL.p,T('Option pool','Akiba ya hisa kwa wafanyakazi')]];
 const R=92,r0=62,cx=110,cy=110;let a=-Math.PI/2,h='';const P=(rr,t)=>[cx+rr*Math.cos(t),cy+rr*Math.sin(t)];
 segs.forEach(s=>{const da=s[0]*Math.PI*2,a2=a+da,L=da>Math.PI?1:0,[x1,y1]=P(R,a+.012),[x2,y2]=P(R,a2-.012),[x3,y3]=P(r0,a2-.012),[x4,y4]=P(r0,a+.012);
  h+=`<path d="M${x1.toFixed(2)},${y1.toFixed(2)} A${R},${R} 0 ${L} 1 ${x2.toFixed(2)},${y2.toFixed(2)} L${x3.toFixed(2)},${y3.toFixed(2)} A${r0},${r0} 0 ${L} 0 ${x4.toFixed(2)},${y4.toFixed(2)}Z" style="fill:var(${s[1]})"><title>${E(s[2])} ${pc(s[0])}</title></path>`;a=a2});
 const fa=-Math.PI/2+O.founders_floor*Math.PI*2,[fx1,fy1]=P(r0-6,fa),[fx2,fy2]=P(R+8,fa);
 h+=`<line x1="${fx1.toFixed(2)}" y1="${fy1.toFixed(2)}" x2="${fx2.toFixed(2)}" y2="${fy2.toFixed(2)}" style="stroke:var(--ink)" stroke-width="1.5" stroke-dasharray="3 2"/>`;
 h+=`<text x="110" y="108" text-anchor="middle" font-size="22" font-weight="600" style="fill:var(--gold)">${pc(O.founders_after_seed)}</text><text x="110" y="128" text-anchor="middle" font-size="11" style="fill:var(--mute)">${E(T('founders','waanzilishi'))}</text>`;
 return `<svg viewBox="0 0 220 220" width="220" height="220" role="img" aria-label="${E(T(`Ownership after the seed round: founders ${pc(O.founders_after_seed)}, seed investor ${pc(O.seed_investor_share)}, option pool ${pc(O.option_pool)}; the dashed tick marks the founders' ${pc(O.founders_floor)} floor`,`Umiliki baada ya awamu ya mtaji wa awali: waanzilishi ${pc(O.founders_after_seed)}, mwekezaji wa awali ${pc(O.seed_investor_share)}, akiba ya hisa kwa wafanyakazi ${pc(O.option_pool)}; alama ya mistari inaonyesha kiwango cha chini cha waanzilishi cha ${pc(O.founders_floor)}`))}">${h}</svg>`}

function dilSVG(W,res,O){const ph=W<520,H=ph?220:250,pl=ph?36:44,pr=10,pt=16,pb=28,st=res.steps,n=st.length,cw=(W-pl-pr)/n,bw=Math.min(56,cw*.6);
 const y=v=>pt+(H-pt-pb)*(1-v),x=i=>pl+cw*(i+.5);let g='';
 [0,.25,.5,.75,1].forEach(v=>{g+=`<line x1="${pl}" x2="${W-pr}" y1="${y(v).toFixed(1)}" y2="${y(v).toFixed(1)}" style="stroke:var(--line)" stroke-width="1"/><text x="${pl-6}" y="${(y(v)+4).toFixed(1)}" text-anchor="end" font-size="11" style="fill:var(--mute)">${Math.round(v*100)}%</text>`});
 st.forEach((s,i)=>{let acc=0;[['f',s.f],['s',s.s],['p',s.p],['n',s.n]].forEach(([k,v])=>{if(v<=0)return;g+=`<rect x="${(x(i)-bw/2).toFixed(1)}" y="${y(acc+v).toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(0,y(acc)-y(acc+v)).toFixed(1)}" style="fill:var(${COL[k]});stroke:var(--bg)" stroke-width="1"/>`;acc+=v});
  g+=`<text x="${x(i).toFixed(1)}" y="${H-8}" text-anchor="middle" font-size="11" style="fill:var(--mute)">${E(i?T('Round ','Awamu ')+String.fromCharCode(64+i):T('Seed','Awali'))}</text>`});
 g+=`<line x1="${pl}" x2="${W-pr}" y1="${y(O.founders_floor).toFixed(1)}" y2="${y(O.founders_floor).toFixed(1)}" style="stroke:var(--gold)" stroke-width="1" stroke-dasharray="5 4"/>`;
 g+=`<path d="${res.unp.map((v,i)=>(i?'L':'M')+x(i).toFixed(1)+','+y(v).toFixed(1)).join(' ')}" fill="none" style="stroke:var(--ink)" stroke-width="1" stroke-dasharray="2 3"/>`;
 return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${E(T('Ownership after each later round, stacked to 100%','Umiliki baada ya kila awamu ya baadaye, umepangwa hadi 100%'))}" style="display:block">${g}</svg>`}

const CSS=`<style>
.s64-body .ab-block>p{margin-top:var(--s2)}
.s64-vis{display:grid;grid-template-columns:auto minmax(0,1fr);gap:var(--s4);align-items:center;border:1px solid var(--line);background:var(--surface);padding:var(--s3)}
.s64-vis .ab-tw{margin-top:0}
.s64-cap,.s64-note{font-size:var(--fs-cap);margin-top:8px;max-width:var(--measure)}
.s64-sw{display:inline-block;width:10px;height:10px;margin-right:8px;vertical-align:-1px}
.s64-tot td{font-weight:600;border-top:1px solid var(--mute)}
.s64-ul{margin:var(--s2) 0 0;padding-left:20px;max-width:var(--measure)}.s64-ul li{margin:8px 0}
.s64-tool{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.2fr);gap:var(--s3);margin-top:var(--s3);border:1px solid var(--line);background:var(--surface);padding:var(--s3)}
.s64-in label{display:block;margin-top:var(--s2);font-size:calc(var(--fs-body) - 2px)}
.s64-in label:first-child{margin-top:0}
.s64-in input[type=range]{width:100%;margin-top:6px;accent-color:var(--green-edge)}
.s64-in .ab-seg{margin-top:6px}
.s64-chk{display:flex!important;gap:8px;align-items:flex-start}.s64-chk input{margin-top:4px;accent-color:var(--green-edge)}
.s64-out{display:grid;gap:var(--s2);align-content:start}
.s64-o small{display:block;color:var(--mute);font-size:var(--fs-cap)}
.s64-o b{display:block;color:var(--gold);font-size:var(--fs-sub);font-weight:600;font-variant-numeric:tabular-nums}
.s64-o2{display:grid;grid-template-columns:1fr 1fr;gap:var(--s2)}
.s64-rows{list-style:none;margin:0;padding:0;border-top:1px solid var(--line)}
.s64-rows li{display:flex;justify-content:space-between;gap:var(--s2);padding:8px 0;border-bottom:1px solid var(--line);font-size:calc(var(--fs-body) - 2px)}
.s64-rows li b{color:var(--gold);font-weight:400;font-variant-numeric:tabular-nums;white-space:nowrap}
.s64-chart{margin-top:var(--s2);min-height:220px}
.s64-leg{display:flex;flex-wrap:wrap;gap:6px 18px;font-size:var(--fs-cap);color:var(--mute);margin-top:8px}
.s64-leg i{display:inline-block;width:10px;height:10px;margin-right:6px;vertical-align:-1px}
.s64-leg i.l{height:0;border-top:1px dashed var(--gold);width:16px;vertical-align:3px}.s64-leg i.u{height:0;border-top:1px dotted var(--ink);width:16px;vertical-align:3px}
.s64-prot{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;background:var(--line);border:1px solid var(--line);margin-top:var(--s3)}
.s64-prot article{background:var(--surface);padding:var(--s3)}
.s64-prot h3{margin:0 0 var(--s1);font-size:var(--fs-body);font-weight:600}
.s64-prot small{color:var(--mute);font-size:var(--fs-cap)}
.s64-prot ul{margin:var(--s1) 0 0;padding-left:18px;font-size:calc(var(--fs-body) - 2px)}.s64-prot li{margin:6px 0}
@media (max-width:860px){.ab-sec table.ab-t td:first-child{min-width:180px}.s64-vis{grid-template-columns:minmax(0,1fr);gap:var(--s3);padding:var(--s2)}.s64-vis svg{width:180px;height:180px}
 .s64-tool{grid-template-columns:minmax(0,1fr);padding:var(--s2)}.s64-prot{grid-template-columns:minmax(0,1fr)}}
</style>`;

function render(s,p,pv,nx){const M=window.MODEL,I=M.inputs,O=I.ownership,sd=I.seed,lean=A().isLean(),G=I.growth;
 const post=sd.amount/O.seed_investor_share,pre=post-sd.amount,base=M.get('base'),y12=base.years[base.years.length-1];
 const optName=lean?T('start-small','kuanza kidogo'):T('flagship','duka kuu');
 const tbc=`<span class="ab-est">${E(T('to be confirmed','inasubiri kuthibitishwa'))}</span>`;
 const founders=T('Founders: Fahmy Abbas Cothema and Cecilia','Waanzilishi: Fahmy Abbas Cothema na Cecilia');
 return `<article class="ab-sec" aria-labelledby="h-s6-4">${CSS}<div class="ab-wrap">
 <div class="ab-sec-no">${E(s.no)}</div><h1 id="h-s6-4">${E(s.title)}</h1>
 <p class="ab-summary">${E(T('Who owns Afya Basics after the seed round, what the seed investor’s money buys, and how each holder is paid if the company is sold. The founders hold one combined stake with a floor of 25% through every later round. The simulator shows what later rounds do to every holding and what the floor costs the other holders. The sale calculator turns a sale price, or a multiple of the model’s profit, into each holder’s payout. All terms are proposals until a Tanzanian lawyer has reviewed them.','Nani anamiliki Afya Basics baada ya awamu ya mtaji wa awali, fedha za mwekezaji wa awali zinanunua nini, na kila mmiliki analipwa vipi kampuni ikiuzwa. Waanzilishi wanashikilia hisa moja ya pamoja yenye kiwango cha chini cha 25% katika kila awamu ya baadaye. Kiigaji kinaonyesha awamu za baadaye zinavyoathiri kila umiliki na gharama ya kiwango hicho kwa wamiliki wengine. Kikokotoo cha mauzo kinageuza bei ya kuuza, au kizidishio cha faida ya modeli, kuwa malipo ya kila mmiliki. Masharti yote ni mapendekezo hadi wakili wa Tanzania ayapitie.'))}</p>

 <figure class="ab-visual s64-vis">
  ${donutSVG(O)}
  <div><div class="ab-tw"><table class="ab-t"><thead><tr><th>${E(T('Holder','Mmiliki'))}</th><th>${E(T('Share','Hisa'))}</th><th>${E(T('Value at the seed price','Thamani kwa bei ya awamu ya awali'))}</th></tr></thead><tbody>
   <tr><td><i class="s64-sw" style="background:var(${COL.f})"></i>${E(founders)}<br><span class="ab-mute">${E(T(`One combined holding, floor ${pc(O.founders_floor)}`,`Umiliki mmoja wa pamoja, kiwango cha chini ${pc(O.founders_floor)}`))}</span></td><td class="ab-n">${pc(O.founders_after_seed)}</td><td class="ab-n">${N('c-f',post*O.founders_after_seed,'tshM')}</td></tr>
   <tr><td><i class="s64-sw" style="background:var(${COL.s})"></i>${E(T('Seed investor','Mwekezaji wa awali'))} ${tbc}<br><span class="ab-mute">${T(`For ${N('c-seed',sd.amount,'tshM')}, ${optName} option`,`Kwa ${N('c-seed',sd.amount,'tshM')}, chaguo la ${optName}`)}</span></td><td class="ab-n">${pc(O.seed_investor_share)}</td><td class="ab-n">${N('c-s',sd.amount,'tshM')}</td></tr>
   <tr><td><i class="s64-sw" style="background:var(${COL.p})"></i>${E(T('Option pool for key staff','Akiba ya hisa kwa wafanyakazi muhimu'))}</td><td class="ab-n">${pc(O.option_pool)}</td><td class="ab-n">${N('c-p',post*O.option_pool,'tshM')}</td></tr>
   <tr class="s64-tot"><td>${E(T('Total: value of the company after the round (post-money)','Jumla: thamani ya kampuni baada ya awamu (baada ya uwekezaji)'))}</td><td class="ab-n">100%</td><td class="ab-n">${N('c-post',post,'tshM')}</td></tr>
  </tbody></table></div>
  <p class="ab-mute s64-cap">${T(`Ownership inputs and seed from the financial model v1.2, ${optName} option. Post-money = ${N('c-seed2',sd.amount,'tshM')} ÷ ${pc(O.seed_investor_share)}: a planning figure derived from the proposed terms, not a valuation. The dashed tick marks the founders’ floor.`,`Pembejeo za umiliki na mtaji wa awali kutoka modeli ya fedha v1.2, chaguo la ${optName}. Thamani baada ya uwekezaji = ${N('c-seed2',sd.amount,'tshM')} ÷ ${pc(O.seed_investor_share)}: takwimu ya mipango inayotokana na masharti yaliyopendekezwa, si tathmini ya thamani. Alama ya mistari inaonyesha kiwango cha chini cha waanzilishi.`)}</p></div>
 </figure>

 <div class="ab-body s64-body">
 <section class="ab-block"><h2>${E(T('Two questions every seed deal answers','Maswali mawili ambayo kila mkataba wa mtaji wa awali unajibu'))}</h2>
  <p>${E(T('A seed deal is fair when two things are clear: what the money buys today, and what happens to that stake later. Founders worry that each new round will reduce them to minor shareholders in the company they built. Investors need to know how, and at what value, they can turn their stake into cash. This section answers both with the same numbers.','Mkataba wa mtaji wa awali ni wa haki pale mambo mawili yanapokuwa wazi: fedha zinanunua nini leo, na nini kinatokea kwa hisa hizo baadaye. Waanzilishi wana wasiwasi kwamba kila awamu mpya itawafanya kuwa wanahisa wadogo katika kampuni waliyoijenga. Wawekezaji wanahitaji kujua jinsi gani, na kwa thamani gani, wanaweza kugeuza hisa zao kuwa fedha. Sehemu hii inajibu yote mawili kwa namba zilezile.'))}</p>
  <ul class="s64-ul">
   <li>${T('<b>Today.</b> After the seed round the company has three holders: the founders, the seed investor and an option pool for key staff.','<b>Leo.</b> Baada ya awamu ya mtaji wa awali kampuni ina wamiliki watatu: waanzilishi, mwekezaji wa awali na akiba ya hisa kwa wafanyakazi muhimu.')}</li>
   <li>${T('<b>Later rounds dilute everyone.</b> When new shares are issued, every existing holder’s percentage falls, even while the value of the company rises.','<b>Awamu za baadaye zinapunguza asilimia ya kila mmoja.</b> Hisa mpya zikitolewa, asilimia ya kila mmiliki aliyepo inashuka, hata thamani ya kampuni ikipanda.')}</li>
   <li>${T(`<b>The founders’ floor.</b> The founders keep at least ${pc(O.founders_floor)} together. If dilution would take them lower, the other holders give up the difference. That is a real cost to investors, and the simulator below shows it.`,`<b>Kiwango cha chini cha waanzilishi.</b> Waanzilishi wanabaki na angalau ${pc(O.founders_floor)} kwa pamoja. Kupungua kukiwapeleka chini zaidi, wamiliki wengine wanatoa tofauti hiyo. Hiyo ni gharama halisi kwa wawekezaji, na kiigaji hapa chini kinaionyesha.`)}</li>
   <li>${T('<b>The exit.</b> On a sale, the proceeds are shared by ownership. The calculator turns a sale price, or a multiple of the model’s profit before interest, tax and depreciation (EBITDA), into each holder’s payout.','<b>Kuuza.</b> Kampuni ikiuzwa, mapato yanagawanywa kwa umiliki. Kikokotoo kinageuza bei ya kuuza, au kizidishio cha faida ya modeli kabla ya riba, kodi na uchakavu (EBITDA), kuwa malipo ya kila mmiliki.')}</li>
  </ul>
 </section>

 <section class="ab-block"><h2>${E(T('The cap table after the seed round','Jedwali la umiliki baada ya awamu ya mtaji wa awali'))}</h2>
  <p>${T(`For ${N('t-seed',sd.amount,'tshM')} in the ${optName} option, the seed investor would hold ${pc(O.seed_investor_share)}. That share implies a value of ${N('t-post',post,'tshM')} for the whole company after the round, and ${N('t-pre',pre,'tshM')} before it (pre-money). The founders, Fahmy Abbas Cothema and Cecilia, hold ${pc(O.founders_after_seed)} together as one founders’ holding, and ${pc(O.option_pool)} is set aside for key staff. The investor share of ${pc(O.seed_investor_share)} is still to be confirmed: it may stay the same in both funding options or be set for each option.`,`Kwa ${N('t-seed',sd.amount,'tshM')} katika chaguo la ${optName}, mwekezaji wa awali angeshikilia ${pc(O.seed_investor_share)}. Hisa hiyo inamaanisha thamani ya ${N('t-post',post,'tshM')} kwa kampuni nzima baada ya awamu, na ${N('t-pre',pre,'tshM')} kabla yake (kabla ya uwekezaji). Waanzilishi, Fahmy Abbas Cothema na Cecilia, wanashikilia ${pc(O.founders_after_seed)} kwa pamoja kama umiliki mmoja wa waanzilishi, na ${pc(O.option_pool)} imetengwa kwa wafanyakazi muhimu. Hisa ya mwekezaji ya ${pc(O.seed_investor_share)} bado inasubiri kuthibitishwa: inaweza kubaki ileile katika machaguo yote mawili ya mtaji au kuwekwa kwa kila chaguo.`)}</p>
  <p>${E(T('These values are arithmetic on the proposed terms. Nobody has valued the company; a later investor will set its own price from trading results.','Thamani hizi ni hesabu juu ya masharti yaliyopendekezwa. Hakuna aliyetathmini thamani ya kampuni; mwekezaji wa baadaye ataweka bei yake kutokana na matokeo ya biashara.'))}</p>
 </section>

 <section class="ab-block"><h2>${E(T('The option pool: equity for the people who run the stores','Akiba ya hisa: umiliki kwa watu wanaoendesha maduka'))}</h2>
  <p>${T(`Growing from one store to ${G.stores_by_year[G.stores_by_year.length-1]} depends on keeping strong store leads. The option pool, ${pc(O.option_pool)} of the company and about ${N('o-pool',post*O.option_pool,'tshM')} at the seed price, gives them a stake on top of their salary.`,`Kukua kutoka duka moja hadi ${G.stores_by_year[G.stores_by_year.length-1]} kunategemea kuwabakiza viongozi bora wa maduka. Akiba ya hisa, ${pc(O.option_pool)} ya kampuni na takriban ${N('o-pool',post*O.option_pool,'tshM')} kwa bei ya awamu ya awali, inawapa umiliki juu ya mshahara wao.`)}</p>
  <ul class="s64-ul">
   <li>${T('<b>Who.</b> The first store lead (preferably a physiotherapy graduate), then the leads who open new cities and the staff who build the packing hub and the store system.','<b>Nani.</b> Kiongozi wa kwanza wa duka (ikiwezekana mhitimu wa fiziotherapia), kisha viongozi wanaofungua miji mipya na wafanyakazi wanaojenga kituo cha kufungasha na mfumo wa duka.')}</li>
   <li>${T('<b>How.</b> Options vest over time and on milestones, for example a store reaching its gate numbers, under rules the board approves and a lawyer drafts.','<b>Jinsi.</b> Haki za hisa zinapatikana kwa muda na kwa kufikia malengo, kwa mfano duka kufikia namba za kigezo chake, chini ya kanuni zinazoidhinishwa na bodi na kuandikwa na wakili.')}</li>
   <li>${T('<b>Why investors gain.</b> A store lead with equity has a direct interest in protecting the brand in every branch, the main risk of a growing chain (section 5.4).','<b>Kwa nini wawekezaji wananufaika.</b> Kiongozi wa duka mwenye umiliki ana maslahi ya moja kwa moja kulinda chapa katika kila tawi, hatari kuu ya mnyororo unaokua (sehemu ya 5.4).')}</li>
  </ul>
 </section>

 <section class="ab-block"><h2>${E(T('Dilution and the founders’ floor','Kupungua kwa umiliki na kiwango cha chini cha waanzilishi'))}</h2>
  <p>${E(T(`Set the number of rounds after the seed and the share of the company sold in each. The founders’ holding never falls below ${pc(O.founders_floor)}; the dotted line shows where it would be without the floor.`,`Weka idadi ya awamu baada ya mtaji wa awali na sehemu ya kampuni inayouzwa katika kila moja. Umiliki wa waanzilishi haushuki chini ya ${pc(O.founders_floor)}; mstari wa vitone unaonyesha ungekuwa wapi bila kiwango hicho.`))} ${est()}</p>
  <div class="s64-tool">
   <div class="s64-in">
    <label>${E(T('Funding rounds after the seed','Awamu za mtaji baada ya mtaji wa awali'))} <b class="ab-gold" id="s64-dro"></b><input type="range" id="s64-dr" min="0" max="4" step="1" value="3" aria-label="${E(T('Funding rounds after the seed','Awamu za mtaji baada ya mtaji wa awali'))}"></label>
    <label>${E(T('Share of the company sold in each round','Sehemu ya kampuni inayouzwa katika kila awamu'))} <b class="ab-gold" id="s64-ddo"></b><input type="range" id="s64-dd" min="0.05" max="0.4" step="0.01" value="0.2" aria-label="${E(T('Share of the company sold in each round','Sehemu ya kampuni inayouzwa katika kila awamu'))}"></label>
    <ul class="s64-rows" id="s64-dsplit" style="margin-top:var(--s3)"></ul>
    <p class="s64-note" id="s64-dnote"></p>
   </div>
   <div><div class="s64-chart" id="s64-dc"></div>
    <div class="s64-leg"><span><i style="background:var(${COL.f})"></i>${E(T('Founders','Waanzilishi'))}</span><span><i style="background:var(${COL.s})"></i>${E(T('Seed investor','Mwekezaji wa awali'))}</span><span><i style="background:var(${COL.p})"></i>${E(T('Option pool','Akiba ya hisa'))}</span><span><i style="background:var(${COL.n})"></i>${E(T('Later investors','Wawekezaji wa baadaye'))}</span><span><i class="l"></i>${E(T(`Founders’ floor ${pc(O.founders_floor)}`,`Kiwango cha chini cha waanzilishi ${pc(O.founders_floor)}`))}</span><span><i class="u"></i>${E(T('Founders without the floor','Waanzilishi bila kiwango cha chini'))}</span></div>
    <p class="ab-mute s64-cap">${E(T('Ownership after each round, from the model’s ownership inputs. Later rounds are hypothetical.','Umiliki baada ya kila awamu, kutoka pembejeo za umiliki za modeli. Awamu za baadaye ni za kudhaniwa.'))}</p></div>
  </div>
  <p>${T(`Later rounds may well be needed: the twelve-year plan opens ${G.stores_by_year[G.stores_by_year.length-1]-1} more stores at about ${tshM(G.new_store_capex)} each, and section 6.1 shows profit before interest, tax and depreciation against that spend year by year.`,`Awamu za baadaye huenda zikahitajika: mpango wa miaka kumi na miwili unafungua maduka ${G.stores_by_year[G.stores_by_year.length-1]-1} zaidi kwa takriban ${tshM(G.new_store_capex)} kila moja, na sehemu ya 6.1 inaonyesha faida kabla ya riba, kodi na uchakavu dhidi ya matumizi hayo mwaka kwa mwaka.`)}</p>
 </section>

 <section class="ab-block"><h2>${E(T('What a buyer pays for','Mnunuzi analipia nini'))}</h2>
  <p>${T(`Shelves, screens and stock are easy to copy. A base of households that receive an Afya Box every month and renew is not. In the base plan the company counts about ${N('b-mem',y12.members,'int')} member households across ${y12.stores} stores by year 12, each with a saved basket and, with consent, a record of Afya Check readings.`,`Rafu, skrini na bidhaa ni rahisi kunakili. Kundi la kaya zinazopokea Afya Box kila mwezi na kuhuisha uanachama si rahisi. Katika mpango wa msingi kampuni inahesabu takriban kaya ${N('b-mem',y12.members,'int')} za wanachama katika maduka ${y12.stores} ifikapo mwaka 12, kila moja ikiwa na kapu lililohifadhiwa na, kwa ridhaa, kumbukumbu ya vipimo vya Afya Check.`)}</p>
  <p>${T(`That recurring revenue is what a later investor or a buyer would value, and it is why the founders’ ${pc(O.founders_floor)} floor matters: the people who built those relationships keep a meaningful stake. <b>No buyer has been identified.</b> The calculator shows ranges, not forecasts.`,`Mapato hayo ya kujirudia ndiyo ambayo mwekezaji wa baadaye au mnunuzi angethamini, na ndiyo sababu kiwango cha chini cha ${pc(O.founders_floor)} cha waanzilishi ni muhimu: watu waliojenga mahusiano hayo wanabaki na umiliki wenye maana. <b>Hakuna mnunuzi aliyetambuliwa.</b> Kikokotoo kinaonyesha viwango, si utabiri.`)}</p>
 </section>

 <section class="ab-block"><h2>${E(T('The sale calculator','Kikokotoo cha mauzo'))}</h2>
  <p>${E(T('Value the company as a multiple of the model’s EBITDA in a chosen year and case, or enter a sale price. Proceeds are shared by ownership, before tax, with no debt and no preference terms.','Thamini kampuni kama kizidishio cha EBITDA ya modeli katika mwaka na hali uliyochagua, au weka bei ya kuuza. Mapato yanagawanywa kwa umiliki, kabla ya kodi, bila deni na bila masharti ya upendeleo.'))} ${est()}</p>
  <div class="s64-tool">
   <div class="s64-in">
    <label>${E(T('Value the company by','Thamini kampuni kwa'))}<br><span class="ab-seg" role="group" aria-label="${E(T('Value the company by','Thamini kampuni kwa'))}"><button type="button" data-s64m="mult" aria-pressed="true">${E(T('EBITDA × multiple','EBITDA × kizidishio'))}</button><button type="button" data-s64m="val" aria-pressed="false">${E(T('Sale price','Bei ya kuuza'))}</button></span></label>
    <div id="s64-emult">
     <label>${E(T('Case','Hali'))}<br><span class="ab-seg" role="group" aria-label="${E(T('Case','Hali'))}">${['base','best','down'].map(k=>`<button type="button" data-s64sc="${k}" aria-pressed="${k==='base'}">${E(T(...SCN[k]))}</button>`).join('')}</span></label>
     <label>${E(T('EV / EBITDA multiple','Kizidishio cha EV / EBITDA'))} <b class="ab-gold" id="s64-exo"></b><input type="range" id="s64-ex" min="2" max="15" step="0.5" value="6" aria-label="${E(T('EV / EBITDA multiple','Kizidishio cha EV / EBITDA'))}"></label></div>
    <div id="s64-eval" hidden><label>${E(T('Sale price (equity value)','Bei ya kuuza (thamani ya hisa)'))} <b class="ab-gold" id="s64-evo"></b><input type="range" id="s64-ev" min="0.5" max="80" step="0.5" value="10" aria-label="${E(T('Sale price (equity value)','Bei ya kuuza (thamani ya hisa)'))}"></label></div>
    <label>${E(T('Year of sale','Mwaka wa kuuza'))} <b class="ab-gold" id="s64-eyo"></b><input type="range" id="s64-ey" min="1" max="12" step="1" value="7" aria-label="${E(T('Year of sale','Mwaka wa kuuza'))}"></label>
    <label class="s64-chk"><input type="checkbox" id="s64-eu" checked><span>${E(T('Apply the later rounds from the dilution simulator','Tumia awamu za baadaye kutoka kiigaji cha kupungua kwa umiliki'))}</span></label>
   </div>
   <div class="s64-out">
    <div class="s64-o"><small>${E(T('Company value at sale','Thamani ya kampuni wakati wa kuuza'))}</small><b id="s64-eo1">–</b><span class="ab-mute s64-cap" id="s64-eo1s"></span></div>
    <ul class="s64-rows" id="s64-epay"></ul>
    <div class="s64-o2"><div class="s64-o"><small>${E(T('Seed investor: money back, as a multiple','Mwekezaji wa awali: fedha zinazorudi, kama kizidishio'))}</small><b id="s64-eo2">–</b></div><div class="s64-o"><small>${E(T('Seed investor: yearly return (IRR)','Mwekezaji wa awali: mapato ya kila mwaka (IRR)'))}</small><b id="s64-eo3">–</b></div></div>
    <p class="s64-note" id="s64-eot"></p>
   </div>
  </div>
  <p class="ab-mute s64-cap">${E(T('IRR = multiple^(1 ÷ years) − 1, with the whole seed treated as paid in at year 0 and repaid in the year of sale. EBITDA by year from the financial model v1.2; from year 2 the plan is the same in both funding options.','IRR = kizidishio^(1 ÷ miaka) − 1, mtaji wote wa awali ukichukuliwa kuwa umelipwa mwaka 0 na kurudishwa mwaka wa kuuza. EBITDA kwa mwaka kutoka modeli ya fedha v1.2; kuanzia mwaka 2 mpango ni uleule katika machaguo yote mawili ya mtaji.'))}</p>
 </section>

 <section class="ab-block"><h2>${E(T('Founders’ pay: a proposal','Malipo ya waanzilishi: pendekezo'))}</h2>
  <p>${T('The founders propose to take <b>no salary, or only a small living allowance, until the store reaches break-even</b>, and to set any later pay with the board. Founders’ pay is not in the model’s running costs. The tool adds it as a running-cost line and runs the financial model again, so the effect on year 1 is the model’s own result.','Waanzilishi wanapendekeza kutochukua <b>mshahara, au posho ndogo tu ya kujikimu, hadi duka lifikie faida</b>, na kuweka malipo yoyote ya baadaye pamoja na bodi. Malipo ya waanzilishi hayamo katika gharama za uendeshaji za modeli. Kifaa hiki kinayaongeza kama mstari wa gharama za uendeshaji na kuendesha modeli ya fedha upya, hivyo athari kwa mwaka 1 ni matokeo ya modeli yenyewe.')} ${est()}</p>
  <div class="s64-tool">
   <div class="s64-in">
    <label>${E(T('Founders’ pay per month, both founders together','Malipo ya waanzilishi kwa mwezi, waanzilishi wote wawili kwa pamoja'))} <b class="ab-gold" id="s64-fpo"></b><input type="range" id="s64-fp" min="0" max="6000000" step="100000" value="1000000" aria-label="${E(T('Founders’ pay per month','Malipo ya waanzilishi kwa mwezi'))}"></label>
    <label>${E(T('Pay starts','Malipo yanaanza'))}<br><span class="ab-seg" role="group" aria-label="${E(T('Pay starts','Malipo yanaanza'))}"><button type="button" data-s64fs="be" aria-pressed="true">${E(T('After break-even','Baada ya kufikia faida'))}</button><button type="button" data-s64fs="m1" aria-pressed="false">${E(T('From month 1','Kuanzia mwezi 1'))}</button></span></label>
    <p class="s64-note ab-mute">${E(T(`Base case, ${lean?'start-small':'flagship'} option. The founders’ main reward is their equity, not salaries that draw down early cash.`,`Hali ya msingi, chaguo la ${lean?'kuanza kidogo':'duka kuu'}. Zawadi kuu ya waanzilishi ni umiliki wao, si mishahara inayopunguza fedha za mwanzo.`))}</p>
   </div>
   <div class="s64-out">
    <div class="s64-o2"><div class="s64-o"><small>${E(T('Year 1 result after founders’ pay','Matokeo ya mwaka 1 baada ya malipo ya waanzilishi'))}</small><b id="s64-fr1">–</b></div><div class="s64-o"><small>${E(T('First month with a profit','Mwezi wa kwanza wenye faida'))}</small><b id="s64-fr2">–</b></div></div>
    <div class="s64-o2"><div class="s64-o"><small>${E(T('Deepest cumulative loss','Kina cha juu cha hasara ya jumla'))}</small><b id="s64-fr3">–</b></div><div class="s64-o"><small>${E(T('Lowest cash in the bank in year 1','Kiwango cha chini kabisa cha fedha benki mwaka 1'))}</small><b id="s64-fr4">–</b></div></div>
    <p class="s64-note" id="s64-frt"></p>
   </div>
  </div>
 </section>

 <section class="ab-block"><h2>${E(T('Protections: the floor, the board and information','Kinga: kiwango cha chini, bodi na taarifa'))}</h2>
  <div class="s64-prot">
   <article><small>${E(T('For the founders','Kwa waanzilishi'))}</small><h3>${E(T(`A ${pc(O.founders_floor)} floor through every round`,`Kiwango cha chini cha ${pc(O.founders_floor)} katika kila awamu`))}</h3><ul>
    <li>${E(T(`The founders keep at least ${pc(O.founders_floor)} of the company together, through every later round.`,`Waanzilishi wanabaki na angalau ${pc(O.founders_floor)} ya kampuni kwa pamoja, katika kila awamu ya baadaye.`))}</li>
    <li>${E(T('The mechanism, for example a special class of shares or a top-up right, is for the lawyer to design under the Companies Act, 2002.','Utaratibu, kwa mfano daraja maalum la hisa au haki ya kuongezewa hisa, ni kazi ya wakili kuubuni chini ya Sheria ya Makampuni, 2002.'))}</li>
    <li>${E(T('Changing the rights of a class of shares needs the protections that Act gives to the holders of that class (section 73).','Kubadilisha haki za daraja la hisa kunahitaji kinga ambazo Sheria hiyo inawapa wamiliki wa daraja hilo (kifungu cha 73).'))}</li></ul></article>
   <article><small>${E(T('For investors','Kwa wawekezaji'))}</small><h3>${E(T('A seat at the table','Kiti mezani'))}</h3><ul>
    <li>${E(T('A board of four votes: two founder directors, one investor director and an independent chair (section 7.2).','Bodi ya kura nne: wakurugenzi wawili waanzilishi, mkurugenzi mmoja wa mwekezaji na mwenyekiti huru (sehemu ya 7.2).'))}</li>
    <li>${E(T('Matters that need investor consent: new shares, selling the company, large borrowing, changing the business, deals with related parties.','Mambo yanayohitaji ridhaa ya mwekezaji: hisa mpya, kuuza kampuni, mikopo mikubwa, kubadilisha biashara, mikataba na watu wenye uhusiano.'))}</li>
    <li>${E(T('Pre-emption: the right to buy into later rounds to limit dilution (proposal).','Haki ya kipaumbele: haki ya kununua katika awamu za baadaye ili kupunguza kushuka kwa umiliki (pendekezo).'))}</li>
    <li>${E(T('Equal terms at exit: an offer to buy the founders’ shares is made to all holders on the same terms (proposal).','Masharti sawa wakati wa kuuza: ofa ya kununua hisa za waanzilishi inatolewa kwa wamiliki wote kwa masharti yaleyale (pendekezo).'))}</li></ul></article>
   <article><small>${E(T('For everyone','Kwa kila mmoja'))}</small><h3>${E(T('Information rights','Haki za kupata taarifa'))}</h3><ul>
    <li>${E(T('The monthly investor pack and the daily 21:00 report (section 7.2).','Kifurushi cha kila mwezi cha mwekezaji na ripoti ya kila siku ya saa 21:00 (sehemu ya 7.2).'))}</li>
    <li>${E(T('The evidence for each tranche milestone (section 6.3).','Ushahidi wa kila lengo la awamu ya fedha (sehemu ya 6.3).'))}</li>
    <li>${E(T('Audited accounts and annual returns every year.','Hesabu zilizokaguliwa na ritani za mwaka kila mwaka.'))}</li>
    <li>${E(T('The articles of association can be changed only by special resolution (section 13 of the Act).','Katiba ya kampuni (articles of association) inaweza kubadilishwa tu kwa azimio maalum (kifungu cha 13 cha Sheria).'))}</li></ul></article>
  </div>
  <p class="ab-notice">${T('<b>A lawyer reviews all of this first.</b> Nothing in this section is a legal agreement or an offer of shares. The percentages, the founders’ floor, the board seats, the consent rights and the exit terms are proposals that a qualified Tanzanian lawyer will draft into the shareholders’ agreement and the articles of association before any money is invested.','<b>Wakili anapitia yote haya kwanza.</b> Hakuna chochote katika sehemu hii ambacho ni mkataba wa kisheria au ofa ya hisa. Asilimia, kiwango cha chini cha waanzilishi, viti vya bodi, haki za ridhaa na masharti ya kuuza ni mapendekezo ambayo wakili wa Tanzania mwenye sifa ataandika katika mkataba wa wanahisa na katiba ya kampuni kabla fedha yoyote haijawekezwa.')}</p>
 </section>

 <section class="ab-block"><h2>${E(T('Risks and the planned answer','Hatari na jibu lililopangwa'))}</h2>
  <ul class="s64-ul">
   <li>${T('<b>A floor for the founders may put off later investors.</b> It is disclosed now and its cost is shown in the simulator. With moderate rounds it is never reached; it binds only after heavy dilution. The lawyer will design a mechanism that later investors can understand and price.','<b>Kiwango cha chini cha waanzilishi kinaweza kuwakatisha tamaa wawekezaji wa baadaye.</b> Kinawekwa wazi sasa na gharama yake inaonyeshwa katika kiigaji. Kwa awamu za wastani hakifikiwi kamwe; kinatumika tu baada ya kupungua kwa kiasi kikubwa. Wakili atabuni utaratibu ambao wawekezaji wa baadaye wanaweza kuuelewa na kuupangia bei.')}</li>
   <li>${T('<b>The sale value depends on future profit.</b> The calculator uses the model’s EBITDA, a planning estimate, and can be switched to the downside case. The multiple is an input, not a forecast.','<b>Thamani ya kuuza inategemea faida ya baadaye.</b> Kikokotoo kinatumia EBITDA ya modeli, makadirio ya mipango, na kinaweza kubadilishwa kwenda hali mbaya. Kizidishio ni pembejeo, si utabiri.')}</li>
   <li>${T(`<b>Taxes reduce what holders receive.</b> Payouts here are before tax. Tanzanian corporate income tax is ${pc(I.tax.corporate)} and dividends carry 10% withholding tax; sale proceeds need professional tax advice.`,`<b>Kodi zinapunguza kile wamiliki wanachopokea.</b> Malipo hapa ni kabla ya kodi. Kodi ya mapato ya kampuni Tanzania ni ${pc(I.tax.corporate)} na gawio linakatwa kodi ya zuio ya 10%; mapato ya kuuza yanahitaji ushauri wa kitaalamu wa kodi.`)}</li>
  </ul>
 </section>
 </div>

 <section class="ab-block"><h2>${E(T('Key figures','Takwimu muhimu'))}</h2>
  ${A().figsHTML([
   {v:`${N('f-post',post,'tshM')} ${est()}`,l:T('Value of the company after the seed round, implied by the proposed terms','Thamani ya kampuni baada ya awamu ya mtaji wa awali, inayotokana na masharti yaliyopendekezwa'),s:T(`${N('f-seed',sd.amount,'tshM')} ÷ ${pc(O.seed_investor_share)}, financial model v1.2`,`${N('f-seed',sd.amount,'tshM')} ÷ ${pc(O.seed_investor_share)}, modeli ya fedha v1.2`)},
   {v:pc(O.founders_after_seed),l:T('Founders’ combined holding after the seed round','Umiliki wa pamoja wa waanzilishi baada ya awamu ya mtaji wa awali'),s:E(T(`Floor ${pc(O.founders_floor)} through every round · financial model v1.2`,`Kiwango cha chini ${pc(O.founders_floor)} katika kila awamu · modeli ya fedha v1.2`))},
   {v:`${pc(O.seed_investor_share)} ${tbc}`,l:T('Seed investor share','Hisa ya mwekezaji wa awali'),s:E(T('Financial model v1.2; same in both options or set per option, still open','Modeli ya fedha v1.2; ileile katika machaguo yote au kwa kila chaguo, bado iko wazi'))},
   {v:pc(O.option_pool),l:T('Option pool for key staff','Akiba ya hisa kwa wafanyakazi muhimu'),s:E(T('Financial model v1.2','Modeli ya fedha v1.2'))}])}
 </section>

 <section class="ab-block"><h2>${E(T('What this costs','Hii inagharimu nini'))}</h2>
  <div class="ab-tw"><table class="ab-t"><thead><tr><th>${E(T('Item','Kipengele'))}</th><th>${E(T('Amount','Kiasi'))}</th><th>${E(T('Basis','Msingi'))}</th></tr></thead><tbody>
   <tr><td>${E(T('Seed round paid in by the investor','Mtaji wa awali unaolipwa na mwekezaji'))}</td><td class="ab-n">${N('w-seed',sd.amount,'tsh')}</td><td class="ab-mute">${E(T(`${lean?'Start-small':'Flagship'} option, three tranches (section 6.3)`,`Chaguo la ${lean?'kuanza kidogo':'duka kuu'}, awamu tatu za fedha (sehemu ya 6.3)`))}</td></tr>
   <tr><td>${E(T('Share of the company it buys','Sehemu ya kampuni unayonunua'))} ${tbc}</td><td class="ab-n">${pc(O.seed_investor_share)}</td><td class="ab-mute">${E(T('Proposed terms','Masharti yaliyopendekezwa'))}</td></tr>
   <tr><td>${E(T('Value of the company before the round (pre-money)','Thamani ya kampuni kabla ya awamu (kabla ya uwekezaji)'))} ${est()}</td><td class="ab-n">${N('w-pre',pre,'tsh')}</td><td class="ab-mute">${E(T('Post-money less the seed','Thamani baada ya uwekezaji ukiondoa mtaji wa awali'))}</td></tr>
   <tr class="s64-tot"><td>${E(T('Value of the company after the round (post-money)','Thamani ya kampuni baada ya awamu (baada ya uwekezaji)'))} ${est()}</td><td class="ab-n">${N('w-post',post,'tsh')}</td><td class="ab-mute">${E(T('Seed ÷ investor share','Mtaji wa awali ÷ hisa ya mwekezaji'))}</td></tr>
   <tr><td>${E(T('Founders’ combined holding at the seed price','Umiliki wa pamoja wa waanzilishi kwa bei ya awamu ya awali'))}</td><td class="ab-n">${N('w-f',post*O.founders_after_seed,'tsh')}</td><td class="ab-mute">${pc(O.founders_after_seed)} × ${E(T('post-money','thamani baada ya uwekezaji'))}</td></tr>
   <tr><td>${E(T('Option pool at the seed price','Akiba ya hisa kwa bei ya awamu ya awali'))}</td><td class="ab-n">${N('w-p',post*O.option_pool,'tsh')}</td><td class="ab-mute">${pc(O.option_pool)} × ${E(T('post-money','thamani baada ya uwekezaji'))}</td></tr>
  </tbody></table></div>
  <p class="ab-mute s64-cap">${E(T(`Financial model v1.2, ${lean?'start-small':'flagship'} option. Derived from the proposed terms; not a valuation.`,`Modeli ya fedha v1.2, chaguo la ${lean?'kuanza kidogo':'duka kuu'}. Inatokana na masharti yaliyopendekezwa; si tathmini ya thamani.`))}</p>
 </section>

 ${A().openHTML([
  T(`The seed investor share: the model uses ${pc(O.seed_investor_share)}, which implies ${N('o-post',post,'tshM')} after the round in this option; whether the share is the same in both funding options or set for each option is still to be confirmed.`,`Hisa ya mwekezaji wa awali: modeli inatumia ${pc(O.seed_investor_share)}, inayomaanisha ${N('o-post',post,'tshM')} baada ya awamu katika chaguo hili; kama hisa ni ileile katika machaguo yote mawili ya mtaji au inawekwa kwa kila chaguo bado inasubiri kuthibitishwa.`),
  E(T('The legal mechanism for the founders’ floor, the consent list, pre-emption and exit terms: to be drafted and reviewed by a Tanzanian lawyer.','Utaratibu wa kisheria wa kiwango cha chini cha waanzilishi, orodha ya ridhaa, haki ya kipaumbele na masharti ya kuuza: utaandikwa na kupitiwa na wakili wa Tanzania.')),
  E(T('The option-pool rules: who qualifies, the vesting period and the milestones, to be set by the board.','Kanuni za akiba ya hisa: nani anastahili, kipindi cha kupata haki na malengo, zitawekwa na bodi.')),
  E(T('The tax on a sale of shares and on payouts to each holder: to be confirmed with a tax adviser.','Kodi juu ya kuuza hisa na malipo kwa kila mmiliki: itathibitishwa na mshauri wa kodi.')),
  E(T('No buyer or later investor has been approached; the multiples are inputs, not market evidence.','Hakuna mnunuzi wala mwekezaji wa baadaye aliyefikiwa; vizidishio ni pembejeo, si ushahidi wa soko.'))])}

 ${A().sourcesHTML([
  {t:T('Afya Basics financial model v1.2: ownership, seed, EBITDA by year, members, running costs (planning estimates)','Modeli ya fedha ya Afya Basics v1.2: umiliki, mtaji wa awali, EBITDA kwa mwaka, wanachama, gharama za uendeshaji (makadirio ya mipango)'),u:'',chk:CHK},
  {t:T('United Republic of Tanzania: Companies Act, 2002 (Cap. 212), TanzLII consolidated text (sections 13 and 73) · not re-checked','Jamhuri ya Muungano wa Tanzania: Sheria ya Makampuni, 2002 (Sura ya 212), maandishi ya TanzLII (vifungu 13 na 73) · haijakaguliwa upya'),u:'https://tanzlii.org/en/akn/tz/act/2002/12/eng@2016-07-01'},
  {t:T('Tanzania Revenue Authority: Taxes and Duties at a Glance 2025/26 (corporate income tax 30%, dividend withholding tax 10%)','Mamlaka ya Mapato Tanzania: Kodi na Ushuru kwa Ufupi 2025/26 (kodi ya mapato ya kampuni 30%, kodi ya zuio ya gawio 10%)'),u:'https://www.tra.go.tz/images/uploads/pages/TAXES_AND_DUTIES_AT_A_GLANCE_2025_2026.pdf',chk:CHK}])}
 ${A().pagerHTML(pv,nx)}
 </div></article>`}

function init(){const M=window.MODEL,I=M.inputs,O=I.ownership,sd=I.seed,$=id=>document.getElementById(id);if(!$('s64-dr'))return;
 let lastDil=null,mode='mult',sc='base',fs='be',onRz=null;
 const drawDil=()=>{const el=$('s64-dc');if(!el||!lastDil)return;const W=Math.floor(el.clientWidth);if(W>=120)el.innerHTML=dilSVG(W,lastDil,O)};
 const dil=()=>{const n=+$('s64-dr').value,d=+$('s64-dd').value;$('s64-dro').textContent=n+' '+(n===1?T('round','awamu'):T('rounds','awamu'));$('s64-ddo').textContent=pc(d);
  const res=dilute(O,n,d);lastDil=res;drawDil();const L=res.steps[res.steps.length-1],u=res.unp[res.unp.length-1];
  const row=(c,l,v,x)=>`<li><span><i class="s64-sw" style="background:var(${c})"></i>${E(l)}${x?` <span class="ab-mute">${E(x)}</span>`:''}</span><b>${pc(v,1)}</b></li>`;
  $('s64-dsplit').innerHTML=row(COL.f,T('Founders','Waanzilishi'),L.f,res.fired?T(`${pc(u,1)} without the floor`,`${pc(u,1)} bila kiwango cha chini`):'')+row(COL.s,T('Seed investor','Mwekezaji wa awali'),L.s,T(`${pc(L.s/O.seed_investor_share)} of its starting share`,`${pc(L.s/O.seed_investor_share)} ya hisa yake ya mwanzo`))+row(COL.p,T('Option pool','Akiba ya hisa'),L.p)+(L.n>0?row(COL.n,T('Later investors','Wawekezaji wa baadaye'),L.n):'');
  $('s64-dnote').innerHTML=res.fired?T(`<b>The floor is working.</b> Without it the founders would hold ${pc(u,1)}. The floor keeps them at ${pc(O.founders_floor)}; the extra ${pc(O.founders_floor-u,1)} comes from the other holders in proportion to their stakes. That is the cost of the protection.`,`<b>Kiwango cha chini kinafanya kazi.</b> Bila hicho waanzilishi wangeshikilia ${pc(u,1)}. Kiwango kinawabakiza kwenye ${pc(O.founders_floor)}; ${pc(O.founders_floor-u,1)} ya ziada inatoka kwa wamiliki wengine kulingana na hisa zao. Hiyo ndiyo gharama ya kinga hii.`):T(`<b>Floor not reached.</b> The founders end at ${pc(L.f,1)}, above the ${pc(O.founders_floor)} floor, so in this case the protection costs the other holders nothing. Try more rounds or a larger share per round.`,`<b>Kiwango cha chini hakijafikiwa.</b> Waanzilishi wanamaliza kwenye ${pc(L.f,1)}, juu ya kiwango cha ${pc(O.founders_floor)}, hivyo katika hali hii kinga haiwagharimu wamiliki wengine chochote. Jaribu awamu zaidi au sehemu kubwa zaidi kwa kila awamu.`);
  exit()};
 const exit=()=>{const useR=$('s64-eu').checked&&lastDil,cap=useR?lastDil.steps[lastDil.steps.length-1]:{f:O.founders_after_seed,s:O.seed_investor_share,p:O.option_pool,n:0};
  const yr=+$('s64-ey').value;$('s64-eyo').textContent=T('Year ','Mwaka ')+yr;let val,sub;
  if(mode==='mult'){const mx=+$('s64-ex').value,r=M.get(sc),y=r.years[yr-1];$('s64-exo').textContent=mx.toFixed(1)+'×';val=Math.max(0,y.ebitda*mx);
   sub=T(`${mx.toFixed(1)} × year-${yr} EBITDA of ${sg(y.ebitda)} (${SCN[sc][0].toLowerCase()}, ${y.stores} stores)${y.ebitda<=0?'. EBITDA is not positive in that year, so this method gives no value.':''}`,`${mx.toFixed(1)} × EBITDA ya mwaka ${yr} ya ${sg(y.ebitda)} (${SCN[sc][1].toLowerCase()}, maduka ${y.stores})${y.ebitda<=0?'. EBITDA si chanya katika mwaka huo, hivyo njia hii haitoi thamani.':''}`)}
  else{val=+$('s64-ev').value*1e9;$('s64-evo').textContent=tshM(val);sub=T('The sale price you entered','Bei ya kuuza uliyoweka')}
  $('s64-eo1').textContent=tshM(val);$('s64-eo1s').textContent=sub;
  const rows=[[COL.f,T('Founders, together','Waanzilishi, kwa pamoja'),cap.f],[COL.s,T('Seed investor','Mwekezaji wa awali'),cap.s],[COL.p,T('Option pool','Akiba ya hisa'),cap.p]];if(cap.n>0)rows.push([COL.n,T('Later investors','Wawekezaji wa baadaye'),cap.n]);
  $('s64-epay').innerHTML=rows.map(q=>`<li><span><i class="s64-sw" style="background:var(${q[0]})"></i>${E(q[1])} · ${pc(q[2],1)}</span><b>${E(tshM(val*q[2]))}</b></li>`).join('');
  const mult=val*cap.s/sd.amount,irr=mult>0?Math.pow(mult,1/yr)-1:null;$('s64-eo2').textContent=mult.toFixed(1)+'×';$('s64-eo3').textContent=irr==null?'—':pc(irr,1);
  $('s64-eot').textContent=T(`The seed investor’s ${tshM(sd.amount)} becomes ${tshM(val*cap.s)} after ${yr} year${yr>1?'s':''}${useR?', after the later rounds set in the simulator.':', with no later dilution (optimistic if new stores need new rounds).'}`,`${tshM(sd.amount)} za mwekezaji wa awali zinakuwa ${tshM(val*cap.s)} baada ya miaka ${yr}${useR?', baada ya awamu za baadaye zilizowekwa katika kiigaji.':', bila kupungua kwa umiliki baadaye (ni matumaini makubwa kama maduka mapya yanahitaji awamu mpya).'}`)};
 const pay=()=>{const v=+$('s64-fp').value;$('s64-fpo').textContent=v?tsh(v):T('None','Hakuna');const r=payResult(v,fs);
  $('s64-fr1').textContent=sg(r.y1);$('s64-fr2').textContent=r.be?T('Month ','Mwezi ')+r.be:T('Not in year 1','Si ndani ya mwaka 1');$('s64-fr3').textContent=sg(r.deep);$('s64-fr4').textContent=r.low?sg(r.low.v):'—';
  const cost=r.base.y1.profit-r.y1;
  $('s64-frt').textContent=fs==='m1'&&v>0?T(`Cost to the company in year 1: ${tshM(cost)}. Paying from month 1 deepens the early losses by ${tshM(r.deep0-r.deep)} and needs more of the seed; this is why the proposal waits for break-even.`,`Gharama kwa kampuni mwaka 1: ${tshM(cost)}. Kulipa kuanzia mwezi 1 kunaongeza hasara za mwanzo kwa ${tshM(r.deep0-r.deep)} na kunahitaji sehemu kubwa zaidi ya mtaji wa awali; ndiyo sababu pendekezo linasubiri kufikia faida.`):r.be0?T(`Cost to the company in year 1: ${tshM(cost)}. Paying only from break-even (month ${r.be0}) leaves the early cash need unchanged.`,`Gharama kwa kampuni mwaka 1: ${tshM(cost)}. Kulipa kuanzia kufikia faida tu (mwezi ${r.be0}) kunaacha mahitaji ya fedha ya mwanzo bila kubadilika.`):T('The base case does not reach break-even in year 1, so pay that waits for break-even does not start in year 1.','Hali ya msingi haifikii faida mwaka 1, hivyo malipo yanayosubiri kufikia faida hayaanzi mwaka 1.')};
 $('s64-dr').oninput=dil;$('s64-dd').oninput=dil;
 ['s64-ex','s64-ev','s64-ey'].forEach(k=>$(k).oninput=exit);$('s64-eu').onchange=exit;$('s64-fp').oninput=pay;
 const seg=(attr,set)=>document.querySelectorAll('['+attr+']').forEach(b=>b.onclick=()=>{set(b.getAttribute(attr));document.querySelectorAll('['+attr+']').forEach(q=>q.setAttribute('aria-pressed',String(q===b)))});
 seg('data-s64m',v=>{mode=v;$('s64-emult').hidden=mode!=='mult';$('s64-eval').hidden=mode==='mult';exit()});
 seg('data-s64sc',v=>{sc=v;exit()});seg('data-s64fs',v=>{fs=v;pay()});
 dil();pay();
 let t;onRz=()=>{clearTimeout(t);t=setTimeout(drawDil,120)};addEventListener('resize',onRz);
 addEventListener('afya:leave',()=>{removeEventListener('resize',onRz)},{once:true})}

window.SECTIONS['s6-4']={render,init,v2:true};
})();
