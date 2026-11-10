/* 6.1 Financials · v2 on the D2 template with the C6.4 funding-switch hero.
   Every figure is read from MODEL at render time (MODEL.get / MODEL.inputs follow the funding switch, B5).
   Numbers that differ between the two funding options are wrapped in AB.numHTML so they count to their
   new value after a switch. The sensitivity tool re-runs MODEL itself: it changes MODEL.inputs for one call
   to MODEL.get('base') and restores them straight after (K4: one engine, no copy of the formulas).
   Shared helpers for 6.2 and 6.3 are exposed as window.AB_S6. */
(function(){
'use strict';
const A=()=>window.AB,T=(e,s)=>A().T(e,s),E=s=>A().E(s),N=(k,v,f)=>A().numHTML(k,v,f);
const sw=()=>window.AFYA_LANG==='sw';
const tsh=n=>'TSh '+Math.round(n).toLocaleString('en-US');
const tshM=(n,d)=>{if(Math.abs(n)>=1e9){const b=n/1e9,y=(b<0?'−':'')+String(parseFloat(Math.abs(b).toFixed(2)));return sw()?'TSh '+y+' bilioni':'TSh '+y+'B'}const v=n/1e6,a=Math.abs(v),x=(v<0?'−':'')+String(parseFloat(a.toFixed(d!=null?d:a>=100?0:1)));return sw()?'TSh '+x+' milioni':'TSh '+x+'M'};
const pc=(n,d)=>String(parseFloat((n*100).toFixed(d==null?1:d)))+'%';
const est=()=>`<span class="ab-est">${E(T('estimate','makadirio'))}</span>`;
const sum=a=>a.reduce((t,x)=>t+x,0);
const CHK='10 Nov 2026';

/* ---------- seed lines: matched by name, never by position (fixes the 150M line mapping) ---------- */
const USEK=[['lease',/^lease advance/i],['loss',/operating losses/i],['reserve',/reserve/i],['fit',/fit-out/i],['stock',/opening stock/i],['tech',/^technology/i],['bikes',/motorbike/i],['mkt',/launch marketing/i],['team',/pre-opening/i]];
const useKey=lbl=>{for(const [k,re] of USEK)if(re.test(lbl))return k;return null};
const useAmt=(I,k)=>sum(I.seed.use.filter(u=>useKey(u[0])===k).map(u=>u[1]));
function useLabel(u){const s=u[0],k=useKey(s),n=(re=>{const m=re.exec(s);return m?m[1]:null});
 const fam=n(/(\d+)\s+product families/i),m2=n(/\((\d+)\s*m²\)/),mo=n(/(\d+)\s+months/i);
 const L={fit:m2?[`Store fit-out and signage (${m2} m²)`,`Ujenzi wa ndani wa duka na alama (m² ${m2})`]:['Store fit-out and signage','Ujenzi wa ndani wa duka na alama'],
  lease:mo?[`Lease advance: first ${mo} months of rent paid up front`,`Kodi ya mapema: kodi ya miezi ${mo} ya kwanza inalipwa kabla`]:['Lease advance: rent paid up front','Kodi ya mapema: kodi inalipwa kabla'],
  stock:fam?[`Opening stock (about ${fam} product families)`,`Bidhaa za kuanzia (takriban familia ${fam} za bidhaa)`]:['Opening stock','Bidhaa za kuanzia'],
  tech:/kiosk/i.test(s)?['Technology: Afya Check kiosk, screens and the store system','Teknolojia: kibanda cha Afya Check, skrini na mfumo wa duka']:['Technology: till, app and a manual check corner','Teknolojia: mashine ya mauzo, programu na kona ya kupima ya kawaida'],
  bikes:['Two electric delivery motorbikes','Pikipiki mbili za umeme za usafirishaji'],
  mkt:['Launch marketing','Matangazo ya uzinduzi'],
  team:['Pre-opening team: hiring and training','Timu kabla ya kufungua: kuajiri na mafunzo'],
  loss:['Operating losses and lease advances until break-even','Hasara za uendeshaji na kodi za mapema hadi kufikia faida'],
  reserve:mo?[`Working-capital reserve: ${mo} months of running costs excluding rent`,`Akiba ya mtaji wa kazi: gharama za uendeshaji za miezi ${mo} bila kodi ya pango`]:['Working-capital reserve','Akiba ya mtaji wa kazi']};
 return {k,en:(L[k]||[s,s])[0],sw:(L[k]||[s,s])[1],t:T(...(L[k]||[s,s]))}}

/* tranche-3 milestone as written in the model: "store open N months, M Afya Box members and monthly loss below TSh XM" */
function t3Rule(I){const m=(I.seed.milestones||[])[2]||'';const r=/open\s+(\d+)\s+months?.*?(\d+)\s+Afya Box members.*?loss below TSh\s*([\d.]+)\s*M/i.exec(m);return r?{open:+r[1],members:+r[2],loss:+r[3]*1e6}:null}
function t3Month(I,r){const x=t3Rule(I);if(!x)return null;const q=r.months.find(q=>q.m>=x.open&&q.members>=x.members&&-q.profit<x.loss);return q?q.m:null}

/* cash: the model computes profit, not cash. Month 0: tranches 1 and 2 less the one-off build and the first lease advance.
   Each month: + profit + rent (rent sits in running costs but is prepaid) − the next lease advance when it falls due.
   Tranche 3 arrives the month after its milestone is met. The full-seed line takes the whole seed on day one. */
function cashPath(I,r){const sd=I.seed,Tr=sd.tranches.map(t=>t*sd.amount),c=((I.scenarios||{})[r.key]||{cost:1}).cost,rent=I.opex_month.rent*c,LA=I.lease_advance_months||6;
 const build=sum(sd.use.filter(u=>!['lease','loss','reserve'].includes(useKey(u[0]))).map(u=>u[1])),lease=useAmt(I,'lease');
 const t3=t3Month(I,r);const staged=[Tr[0]+Tr[1]-build-lease],full=[sd.amount-build-lease];
 r.months.forEach(q=>{const adv=q.m>1&&(q.m-1)%LA===0?LA*rent:0,f=q.profit+rent-adv;full.push(full[full.length-1]+f);staged.push(staged[staged.length-1]+f+(t3!=null&&q.m===t3+1?Tr[2]:0))});
 const lo=a=>{let v=Infinity,i=0;a.forEach((x,k)=>{if(x<v){v=x;i=k}});return {v,i}};
 return {build,lease,Tr,t3,staged,full,low:lo(staged),lowFull:lo(full),rent,LA,deep:Math.min(0,...r.months.map(q=>q.cum_profit))}}

/* ---------- inline SVG charts (K2): hairline axes, green and gold series, muted labels; drawn at the container width ---------- */
const nice=v=>{if(v<=0)return 1;const p=Math.pow(10,Math.floor(Math.log10(v))),n=v/p;return (n<=1?1:n<=2?2:n<=2.5?2.5:n<=5?5:10)*p};
const axM=v=>{const a=Math.abs(v)/1e6;return (v<0?'−':'')+String(parseFloat(a.toFixed(a>=10||a===0?0:1)))};
function chartSVG(W,o){const ph=W<520,H=o.h||(ph?220:260),pl=ph?40:52,pr=10,pt=24,pb=28,n=o.labels.length,cw=(W-pl-pr)/n;
 let vs=[];(o.bars||[]).forEach(v=>vs.push(v));(o.stack||[]).forEach((_,i)=>{});if(o.stack)o.labels.forEach((_,i)=>vs.push(sum(o.stack.map(s=>s.vals[i]))));(o.lines||[]).forEach(s=>vs.push(...s.vals));
 let mx=Math.max(0,...vs),mn=Math.min(0,...vs);const st=nice((mx-mn)/4||1);mx=Math.ceil(mx/st-1e-9)*st;mn=Math.floor(mn/st+1e-9)*st;if(mx===mn)mx=mn+st;
 const y=v=>pt+(H-pt-pb)*(mx-v)/(mx-mn),x=i=>pl+cw*(i+.5),bw=Math.min(28,cw*.62);
 let g='';for(let v=mn;v<=mx+st*1e-6;v+=st){const z=Math.abs(v)<st*1e-6;g+=`<line x1="${pl}" x2="${W-pr}" y1="${y(v).toFixed(1)}" y2="${y(v).toFixed(1)}" style="stroke:var(${z?'--mute':'--line'})" stroke-width="1"/><text x="${pl-6}" y="${(y(v)+4).toFixed(1)}" text-anchor="end" font-size="11" style="fill:var(--mute)">${o.ax?o.ax(v):axM(v)}</text>`}
 const step=ph&&n>8?2:1;o.labels.forEach((l,i)=>{if(i%step===0||i===n-1)g+=`<text x="${x(i).toFixed(1)}" y="${H-8}" text-anchor="middle" font-size="11" style="fill:var(--mute)">${E(l)}</text>`});
 if(o.stack)o.labels.forEach((_,i)=>{let acc=0;o.stack.forEach(s=>{const v=s.vals[i];g+=`<rect x="${(x(i)-bw/2).toFixed(1)}" y="${y(acc+v).toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(0,y(acc)-y(acc+v)).toFixed(1)}" style="fill:var(${s.c})"/>`;acc+=v})});
 if(o.bars)o.bars.forEach((v,i)=>{const t=Math.min(y(v),y(0)),h=Math.max(.8,Math.abs(y(v)-y(0)));g+=`<rect x="${(x(i)-bw/2).toFixed(1)}" y="${t.toFixed(1)}" width="${bw.toFixed(1)}" height="${h.toFixed(1)}" style="fill:var(${o.barC?o.barC(v,i):'--green'})"/>`});
 (o.lines||[]).forEach(s=>{g+=`<path d="${s.vals.map((v,i)=>(i?'L':'M')+x(i).toFixed(1)+','+y(v).toFixed(1)).join(' ')}" fill="none" style="stroke:var(${s.c})" stroke-width="2" ${s.dash?'stroke-dasharray="5 4"':''}/>`;if(s.dots)s.vals.forEach((v,i)=>{g+=`<circle cx="${x(i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="2.6" style="fill:var(${s.c})"/>`})});
 (o.marks||[]).forEach(mk=>{const xx=x(mk.i);g+=`<line x1="${xx.toFixed(1)}" x2="${xx.toFixed(1)}" y1="${pt-6}" y2="${H-pb}" style="stroke:var(--gold)" stroke-width="1" stroke-dasharray="3 3"/><text x="${Math.min(W-pr,Math.max(pl,xx)).toFixed(1)}" y="${pt-10}" text-anchor="${xx>W*.7?'end':xx<W*.3?'start':'middle'}" font-size="11" style="fill:var(--gold)">${E(mk.t)}</text>`});
 return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${E(o.aria)}" style="display:block">${g}</svg>`}
const charts=[];
function drawCharts(){charts.forEach(c=>{const el=document.getElementById(c.id);if(!el)return;const W=Math.floor(el.clientWidth);if(W<120)return;el.innerHTML=chartSVG(W,c.o())})}

window.AB_S6={useKey,useAmt,useLabel,t3Rule,t3Month,cashPath,chartSVG,tshM,tsh,pc,sum};

/* ---------- labels ---------- */
const OPEX=[['rent','Rent','Kodi ya pango'],['staff','Store staff, with employer contributions','Wafanyakazi wa duka, pamoja na michango ya mwajiri'],['utilities_internet','Power, water and internet','Umeme, maji na intaneti'],['systems_software','Systems and software','Mifumo na programu'],['marketing','Marketing','Matangazo'],['check_station','Afya Check station upkeep','Matunzo ya kituo cha Afya Check'],['insurance_licences','Insurance and licences','Bima na leseni'],['packaging_misc','Packaging and other','Vifungashio na mengineyo']];
const SCN={base:['Base case','Hali ya msingi'],best:['Best case','Hali bora'],down:['Downside case','Hali mbaya']};
const MO=n=>T('M','M')+n;
let SC='base';

/* ---------- sensitivity levers: each one is a field of MODEL.inputs ---------- */
const LEV=[
 {k:'vis',p:['store','visitors_day_m12'],lo:.5,hi:1.5,step:5,f:v=>Math.round(v)+T(' a day',' kwa siku'),l:['Walk-in visitors a day by month 12','Wageni wa dukani kwa siku ifikapo mwezi 12']},
 {k:'basket',p:['store','basket'],lo:.6,hi:1.4,step:500,f:v=>tsh(v),l:['Average walk-in basket','Wastani wa manunuzi ya mteja wa dukani']},
 {k:'join',p:['members','join_rate'],lo:.5,hi:2,step:.0025,f:v=>pc(v,2),l:['Paying store customers who join a box each month','Wateja wa dukani wanaojiunga na boksi kila mwezi']},
 {k:'churn',p:['members','monthly_churn'],lo:.5,hi:2,step:.005,f:v=>pc(v,1),l:['Members who leave each month','Wanachama wanaoondoka kila mwezi']},
 {k:'gm',p:['members','box_products_gm'],lo:.5,hi:2,step:.002,f:v=>pc(v,1),l:['Margin on box goods','Faida ghafi ya bidhaa za boksi']},
 {k:'fees',p:['tax','payment_fees'],lo:0,hi:3.5,step:.001,f:v=>pc(v,1),l:['Payment processing, share of revenue','Gharama za kupokea malipo, sehemu ya mapato']},
 {k:'rent',p:['opex_month','rent'],lo:.5,hi:1.5,step:100000,f:v=>tsh(v),l:['Monthly rent','Kodi ya pango kwa mwezi']}];
const R5_FEE=0.027; /* payment-cost estimate, high case, 9 Nov 2026 (75% mobile money, 10% card, 15% cash) */
const sens={};
function runWith(vals){const I=window.MODEL.inputs,saved=[];
 try{LEV.forEach(l=>{const o=I[l.p[0]];saved.push([o,l.p[1],o[l.p[1]]]);if(vals&&vals[l.k]!=null)o[l.p[1]]=vals[l.k]});return window.MODEL.get('base')}
 finally{saved.forEach(([o,k,v])=>{o[k]=v})}}

/* ---------- pieces ---------- */
function heroHTML(){const M=window.MODEL,I=M.inputs,r=M.get('base'),lean=A().isLean(),cs=cashPath(I,r),y1=r.y1;
 const be=r.breakeven_month,loss=y1.profit<0;
 const fig=(v,l,s)=>`<div class="s61-hn"><span class="s61-hv">${v}</span><span class="s61-hl">${E(l)}</span>${s?`<span class="s61-hs">${s}</span>`:''}</div>`;
 return `<figure class="ab-visual s61-hero" aria-label="${E(T('Five numbers for the selected funding option','Namba tano za chaguo la mtaji lililochaguliwa'))}">
  <div class="s61-hhead"><div><span class="ab-mute">${E(T('Showing the funding option','Inaonyesha chaguo la mtaji'))}</span>
   <b class="s61-opt">${E(lean?T('Start small','Anza kidogo'):T('Flagship','Duka kuu'))} · ${N('h-seed',I.seed.amount,'tshM')}</b></div>
   <div class="ab-seg" role="group" aria-label="${E(T('Funding option','Chaguo la mtaji'))}"><button type="button" data-fund="flag" aria-pressed="${!lean}">${E(T('Flagship','Duka kuu'))} 340M</button><button type="button" data-fund="lean" aria-pressed="${lean}">${E(T('Start small','Anza kidogo'))} 150M</button></div></div>
  <div class="s61-hgrid">
   ${fig(N('h-rev',y1.revenue,'tshM'),T('Revenue in year 1, net of VAT','Mapato mwaka wa 1, bila VAT'),est())}
   ${fig((loss?'−':'')+N('h-pro',Math.abs(y1.profit),'tshM'),loss?T('Result in year 1: a loss, store level','Matokeo mwaka wa 1: hasara, ngazi ya duka'):T('Profit in year 1, store level','Faida mwaka wa 1, ngazi ya duka'),est())}
   ${fig(be?`${E(T('Month','Mwezi'))} ${N('h-be',be,'int')}`:E(T('After year 1','Baada ya mwaka 1')),T('First month with a profit (break-even)','Mwezi wa kwanza wenye faida (kufikia faida)'),est())}
   ${fig(N('h-mem',r.months[11].members,'int'),T('Afya Box members by month 12','Wanachama wa Afya Box ifikapo mwezi 12'),est())}
   ${fig(N('h-cash',cs.low.v,'tshM'),T('Lowest cash in the bank in year 1','Kiwango cha chini kabisa cha fedha benki mwaka wa 1'),`${E(T('month','mwezi'))} ${N('h-cashm',cs.low.i,'int')} · ${est()}`)}
  </div>
  <figcaption class="ab-mute">${E(T('Base case of the financial model v1.2 for the option above. Switch the option here or in the top bar; the page reloads and every figure moves to its new value.','Hali ya msingi ya modeli ya fedha v1.2 kwa chaguo lililo juu. Badilisha chaguo hapa au kwenye upau wa juu; ukurasa unapakia upya na kila takwimu inahamia thamani yake mpya.'))}</figcaption>
 </figure>`}

function engineHTML(I,r){const s=I.store,mb=I.members,o=I.online,tx=I.tax,ox=sum(Object.values(I.opex_month)),sv=r.services;
 const row=(a,b,c)=>`<tr><td><b>${E(T(a[0],a[1]))}</b></td><td>${T(b[0],b[1])}</td><td class="ab-mute">${E(T(c[0],c[1]))}</td></tr>`;
 return `<div class="ab-tw"><table class="ab-t"><thead><tr><th>${E(T('Step','Hatua'))}</th><th>${E(T('Formula, with the inputs of this option','Kanuni, pamoja na pembejeo za chaguo hili'))}</th><th>${E(T('Basis','Msingi'))}</th></tr></thead><tbody>
 ${row(['1 · Visitors','1 · Wageni'],[`${N('e-v0',s.visitors_day_start,'int')} → ${N('e-v12',s.visitors_day_m12,'int')} a day, rising in a straight line to month 12`,`${N('e-v0',s.visitors_day_start,'int')} → ${N('e-v12',s.visitors_day_m12,'int')} kwa siku, wakiongezeka kwa mstari ulionyooka hadi mwezi 12`],['Planning estimate','Makadirio ya mipango'])}
 ${row(['2 · Walk-in revenue','2 · Mapato ya dukani'],[`visitors × ${N('e-conv',s.conversion*100,'pct')} who buy × ${N('e-bas',s.basket,'tsh')} basket × 30 days, net of VAT`,`wageni × ${N('e-conv',s.conversion*100,'pct')} wanaonunua × manunuzi ya ${N('e-bas',s.basket,'tsh')} × siku 30, bila VAT`],[`VAT ${pc(tx.vat,0)} on ${pc(tx.taxable_share,0)} of sales`,`VAT ${pc(tx.vat,0)} kwa ${pc(tx.taxable_share,0)} ya mauzo`])}
 ${row(['3 · Afya Box members','3 · Wanachama wa Afya Box'],[`each month ${N('e-join',mb.join_rate*100,'pct')} of paying customers and ${N('e-cjoin',mb.check_join_rate*100,'pct')} of Afya Check users who did not buy join; ${N('e-churn',mb.monthly_churn*100,'pct')} of members leave`,`kila mwezi ${N('e-join',mb.join_rate*100,'pct')} ya wateja wanaolipa na ${N('e-cjoin',mb.check_join_rate*100,'pct')} ya waliopima Afya Check bila kununua wanajiunga; ${N('e-churn',mb.monthly_churn*100,'pct')} ya wanachama wanaondoka`],['Planning estimate; the pre-sale gives the first real rate','Makadirio ya mipango; mauzo ya awali yatatoa kiwango halisi cha kwanza'])}
 ${row(['4 · Box revenue','4 · Mapato ya maboksi'],[`members × ${N('e-box',mb.avg_box,'tsh')} average box, of which ${N('e-pd',mb.packing_delivery_in_price,'tsh')} is packing and delivery at cost`,`wanachama × wastani wa boksi ${N('e-box',mb.avg_box,'tsh')}, ambapo ${N('e-pd',mb.packing_delivery_in_price,'tsh')} ni ufungashaji na usafirishaji kwa gharama yake`],['Price rule D4; see 6.2','Kanuni ya bei D4; tazama 6.2'])}
 ${row(['5 · Online, services, business kits','5 · Mtandaoni, huduma, vifurushi vya biashara'],[`up to ${N('e-ord',o.orders_day_m12,'int')} online orders a day at ${N('e-obas',o.basket,'tsh')} plus a ${N('e-ofee',o.delivery_fee,'tsh')} delivery fee; partner care packs at ${N('e-svc',sv.avg_fee,'tsh')} a member a month on average; Afya Kazini accounts`,`hadi oda ${N('e-ord',o.orders_day_m12,'int')} za mtandaoni kwa siku za ${N('e-obas',o.basket,'tsh')} pamoja na ada ya usafirishaji ya ${N('e-ofee',o.delivery_fee,'tsh')}; vifurushi vya huduma za washirika kwa wastani wa ${N('e-svc',sv.avg_fee,'tsh')} kwa mwanachama kwa mwezi; akaunti za Afya Kazini`],['Planning estimate','Makadirio ya mipango'])}
 ${row(['6 · Gross profit','6 · Faida ghafi'],[`retail margin ${N('e-rgm',s.retail_gm*100,'pct')}; box-goods margin ${N('e-bgm',mb.box_products_gm*100,'pct')}; packing and delivery at cost; payment processing ${N('e-fee',tx.payment_fees*100,'pct')} of revenue`,`faida ya rejareja ${N('e-rgm',s.retail_gm*100,'pct')}; faida ya bidhaa za boksi ${N('e-bgm',mb.box_products_gm*100,'pct')}; ufungashaji na usafirishaji kwa gharama yake; gharama za malipo ${N('e-fee',tx.payment_fees*100,'pct')} ya mapato`],['Box margin from the approved price rule','Faida ya boksi kutoka kanuni ya bei iliyoidhinishwa'])}
 ${row(['7 · Profit','7 · Faida'],[`gross profit − ${N('e-ox',ox,'tsh')} running costs a month`,`faida ghafi − gharama za uendeshaji ${N('e-ox',ox,'tsh')} kwa mwezi`],['Eight cost lines, below','Mistari minane ya gharama, hapa chini'])}
 </tbody></table></div>`}

function scSeg(){return `<div class="ab-seg" role="group" aria-label="${E(T('Case','Hali'))}">${['base','best','down'].map(k=>`<button type="button" data-s61sc="${k}" aria-pressed="${k===SC}">${E(T(...SCN[k]))}</button>`).join('')}</div>`}
function scDesc(I){const s=I.scenarios[SC];if(SC==='base')return T('Model inputs as set.','Pembejeo za modeli kama zilivyowekwa.');
 const d=Math.round((s.demand-1)*100),c=Math.round((s.cost-1)*100),sg=v=>(v>0?'+':'')+v+'%';
 return T(`Demand ${sg(d)} and running costs ${sg(c)} against the base case.`,`Mahitaji ${sg(d)} na gharama za uendeshaji ${sg(c)} ukilinganisha na hali ya msingi.`)}

function yearHTML(I){const r=window.MODEL.get(SC),m=r.months,k=(a,i)=>`m-${SC}-${a}-${i}`;
 const row=(lab,f,cls)=>`<tr${cls?` class="${cls}"`:''}><td>${E(T(lab[0],lab[1]))}</td>${m.map((q,i)=>`<td class="ab-n">${N(k(lab[2],i),Math.round(f(q)/1e3),'int')}</td>`).join('')}<td class="ab-n">${N(k(lab[2],'y'),Math.round(sum(m.map(f))/1e3),'int')}</td></tr>`;
 const cs=cashPath(I,r),be=r.breakeven_month;
 charts.length=0;
 charts.push({id:'s61cPro',o:()=>({labels:m.map(q=>MO(q.m)),bars:m.map(q=>q.profit),barC:v=>v<0?'--green':'--gold',lines:[{vals:m.map(q=>q.cum_profit),c:'--mute',dash:1}],marks:be?[{i:be-1,t:T(`Month ${be}: first profit`,`Mwezi ${be}: faida ya kwanza`)}]:[],aria:T('Monthly profit and cumulative profit in year 1, TSh million','Faida ya kila mwezi na faida ya jumla mwaka wa 1, TSh milioni')})});
 charts.push({id:'s61cRev',o:()=>({labels:m.map(q=>MO(q.m)),stack:[{vals:m.map(q=>q.walkin),c:'--green'},{vals:m.map(q=>q.boxes),c:'--gold'},{vals:m.map(q=>q.online),c:'--green-edge'},{vals:m.map(q=>q.services+q.commission+q.kazini),c:'--mute'}],aria:T('Monthly revenue by channel in year 1, TSh million','Mapato ya kila mwezi kwa njia mwaka wa 1, TSh milioni')})});
 charts.push({id:'s61cCash',o:()=>({labels:['0'].concat(m.map(q=>MO(q.m))),lines:[{vals:cs.staged,c:'--gold',dots:1},{vals:cs.full,c:'--green-edge',dash:1}],marks:[{i:cs.low.i,t:T(`Lowest: ${tshM(cs.low.v)}`,`Chini kabisa: ${tshM(cs.low.v)}`)}],aria:T('Cash in the bank, months 0 to 12, TSh million','Fedha benki, miezi 0 hadi 12, TSh milioni')})});
 const leg=(c,t)=>`<span><i style="background:var(${c})"></i>${E(t)}</span>`;
 const t3=cs.t3;
 return `<p class="ab-mute">${E(scDesc(I))}</p>
 <h3>${E(T('Monthly profit and the break-even month','Faida ya kila mwezi na mwezi wa kufikia faida'))}</h3>
 <div class="s61-chart" id="s61cPro"></div>
 <div class="s61-leg">${leg('--green',T('Loss month','Mwezi wa hasara'))}${leg('--gold',T('Profit month','Mwezi wa faida'))}${leg('--mute',T('Cumulative profit (dashed)','Faida ya jumla (mstari wa vistari)'))}</div>
 <p class="ab-mute s61-cap">${E(T('Store-level profit by month, TSh million. Source: financial model v1.2, planning estimates.','Faida ya ngazi ya duka kwa mwezi, TSh milioni. Chanzo: modeli ya fedha v1.2, makadirio ya mipango.'))}</p>
 <h3>${E(T('Where the revenue comes from','Mapato yanatoka wapi'))}</h3>
 <div class="s61-chart" id="s61cRev"></div>
 <div class="s61-leg">${leg('--green',T('Walk-in','Dukani'))}${leg('--gold',T('Afya Boxes','Afya Box'))}${leg('--green-edge',T('Online','Mtandaoni'))}${leg('--mute',T('Care packs, commission, Afya Kazini','Vifurushi vya huduma, kamisheni, Afya Kazini'))}</div>
 <p class="ab-mute s61-cap">${E(T('Revenue net of VAT by month, TSh million. Source: financial model v1.2.','Mapato bila VAT kwa mwezi, TSh milioni. Chanzo: modeli ya fedha v1.2.'))}</p>
 <h3>${E(T('Profit and loss, month by month (TSh thousands)','Faida na hasara, mwezi kwa mwezi (TSh elfu)'))}</h3>
 <div class="ab-tw"><table class="ab-t s61-pl"><thead><tr><th></th>${m.map(q=>`<th>${MO(q.m)}</th>`).join('')}<th>${E(T('Year 1','Mwaka 1'))}</th></tr></thead><tbody>
  ${row(['Revenue, net of VAT','Mapato, bila VAT','rev'],q=>q.revenue)}
  ${row(['Gross profit','Faida ghafi','gp'],q=>q.gross_profit)}
  ${row(['Running costs','Gharama za uendeshaji','ox'],q=>-q.opex)}
  ${row(['Profit','Faida','pro'],q=>q.profit,'s61-tot')}
 </tbody></table></div>
 <p class="ab-mute s61-cap">${E(T('Members at month 12 in this case:','Wanachama mwezi 12 katika hali hii:'))} ${N(`m-${SC}-mem`,m[11].members,'int')}. ${E(T('Running costs are shown as negative numbers.','Gharama za uendeshaji zinaonyeshwa kama namba hasi.'))}</p>

 <h2>${E(T('Cash: what the bank account does in year 1','Fedha taslimu: akaunti ya benki inavyokwenda mwaka wa 1'))}</h2>
 <p>${T(`The model computes profit, not cash, so cash is derived here from four model inputs. Before opening, tranches 1 and 2 arrive and the one-off build (${N(`c-${SC}-b`,cs.build,'tshM')}) and the first lease advance (${N(`c-${SC}-l`,cs.lease,'tshM')}) are paid. Each month cash then moves by the month’s result. Rent sits in running costs but is paid ${cs.LA} months ahead, so the next advance (${N(`c-${SC}-a`,cs.LA*cs.rent,'tshM')}) leaves the bank in month ${cs.LA+1}. ${t3?`Tranche 3 is released the month after its milestone is met: in this case the milestone is met in month ${N(`c-${SC}-t3`,t3,'int')}.`:'In this case the tranche-3 milestone is not met in year 1, so tranche 3 does not arrive.'}`,
  `Modeli inakokotoa faida, si fedha taslimu, kwa hiyo fedha taslimu zinapatikana hapa kutoka pembejeo nne za modeli. Kabla ya kufungua, awamu ya 1 na ya 2 zinafika na ujenzi wa mara moja (${N(`c-${SC}-b`,cs.build,'tshM')}) na kodi ya mapema ya kwanza (${N(`c-${SC}-l`,cs.lease,'tshM')}) vinalipwa. Kisha kila mwezi fedha zinabadilika kwa matokeo ya mwezi huo. Kodi ya pango iko ndani ya gharama za uendeshaji lakini inalipwa miezi ${cs.LA} mapema, hivyo kodi ya mapema inayofuata (${N(`c-${SC}-a`,cs.LA*cs.rent,'tshM')}) inatoka benki mwezi ${cs.LA+1}. ${t3?`Awamu ya 3 inatolewa mwezi unaofuata baada ya lengo lake kufikiwa: katika hali hii lengo linafikiwa mwezi ${N(`c-${SC}-t3`,t3,'int')}.`:'Katika hali hii lengo la awamu ya 3 halifikiwi mwaka wa 1, hivyo awamu ya 3 haifiki.'}`)}</p>
 <div class="s61-chart" id="s61cCash"></div>
 <div class="s61-leg">${leg('--gold',T('Cash with tranches released at their milestones','Fedha awamu zikitolewa kwenye malengo yake'))}${leg('--green-edge',T('Cash if the full seed arrived on day one (dashed)','Fedha kama mtaji wote ungefika siku ya kwanza (vistari)'))}</div>
 <p class="ab-mute s61-cap">${E(T('Month-end cash, TSh million. Derived from the financial model v1.2: seed tranches, use of funds, monthly profit and the lease-advance rule. Planning estimate.','Fedha mwishoni mwa mwezi, TSh milioni. Zimetokana na modeli ya fedha v1.2: awamu za mtaji, matumizi ya fedha, faida ya kila mwezi na kanuni ya kodi ya mapema. Makadirio ya mipango.'))}</p>
 <p>${T(`Finding: the lowest point is ${N(`c-${SC}-lo`,cs.low.v,'tshM')} in month ${N(`c-${SC}-lom`,cs.low.i,'int')}${cs.low.v<0?', below zero: in this case the plan needs tranche 3 earlier or more cash':', above zero, so the store does not run out of cash in this case'}. The third lease advance falls due in month ${2*cs.LA+1}, outside this chart, and is paid from the store’s own cash.`,`Matokeo: kiwango cha chini kabisa ni ${N(`c-${SC}-lo`,cs.low.v,'tshM')} mwezi ${N(`c-${SC}-lom`,cs.low.i,'int')}${cs.low.v<0?', chini ya sifuri: katika hali hii mpango unahitaji awamu ya 3 mapema zaidi au fedha zaidi':', juu ya sifuri, hivyo duka haliishiwi fedha katika hali hii'}. Kodi ya mapema ya tatu inadaiwa mwezi ${2*cs.LA+1}, nje ya chati hii, na inalipwa kwa fedha za duka lenyewe.`)}</p>`}

function yearsHTML(I){const r=window.MODEL.get(SC),Y=r.years,team=sum(I.staff.map(x=>x[1])),k=(a,i)=>`y-${SC}-${a}-${i}`;
 const c=(a,i,v)=>`<td class="ab-n">${N(k(a,i),Math.round(v/1e6),'int')}</td>`;
 return `<div class="ab-tw"><table class="ab-t"><thead><tr><th>${E(T('Year','Mwaka'))}</th><th>${E(T('Stores','Maduka'))}</th><th>${E(T('Revenue','Mapato'))}</th><th>${E(T('Gross profit','Faida ghafi'))}</th><th>${E(T('EBITDA','EBITDA'))}</th><th>${E(T('New-store build','Ujenzi wa maduka mapya'))}</th><th>${E(T('EBITDA less build','EBITDA ukitoa ujenzi'))}</th><th>${E(T('Direct store jobs','Ajira za moja kwa moja madukani'))}</th></tr></thead><tbody>
 ${Y.map((y,i)=>`<tr><td>${y.year}</td><td class="ab-n">${N(k('st',i),y.stores,'int')}</td>${c('rev',i,y.revenue)}${c('gp',i,y.gross_profit)}${c('eb',i,y.ebitda)}${c('cx',i,-y.capex)}${c('fc',i,y.ebitda-y.capex)}<td class="ab-n">${N(k('job',i),y.stores*team,'int')}</td></tr>`).join('')}
 </tbody></table></div>
 <p class="ab-mute s61-cap">${E(T(`TSh million. Year 1 is the monthly model of the first store. From year 2: mature store revenue of ${tshM(I.growth.mature_store_revenue)} a year after a ramp of ${I.growth.ramp.map(x=>pc(x,0)).join(' / ')}, store gross margin ${pc(I.growth.store_gm,0)}, head office ${tshM(I.growth.ho_fixed_year)} a year plus ${pc(I.growth.ho_share,0)} of revenue, each new store ${tshM(I.growth.new_store_capex)} to build. Before corporate tax. Direct store jobs = stores × ${team} people per store in this option; head office not included.`,`TSh milioni. Mwaka 1 ni modeli ya kila mwezi ya duka la kwanza. Kuanzia mwaka 2: mapato ya duka lililokomaa ${tshM(I.growth.mature_store_revenue)} kwa mwaka baada ya ukuaji wa ${I.growth.ramp.map(x=>pc(x,0)).join(' / ')}, faida ghafi ya duka ${pc(I.growth.store_gm,0)}, ofisi kuu ${tshM(I.growth.ho_fixed_year)} kwa mwaka pamoja na ${pc(I.growth.ho_share,0)} ya mapato, kila duka jipya ${tshM(I.growth.new_store_capex)} kujenga. Kabla ya kodi ya mapato ya kampuni. Ajira za moja kwa moja = maduka × watu ${team} kwa kila duka katika chaguo hili; ofisi kuu haijajumuishwa.`))}</p>`}

function casesHTML(I){const R={base:window.MODEL.get('base'),best:window.MODEL.get('best'),down:window.MODEL.get('down')},ks=['base','best','down'];
 const row=(lab,key,f,fmt)=>`<tr><td>${E(T(lab[0],lab[1]))}</td>${ks.map(k=>{const v=f(R[k],k);return `<td class="ab-n">${v==null?E(T('After year 1','Baada ya mwaka 1')):N(`k-${key}-${k}`,v,fmt)}</td>`}).join('')}</tr>`;
 return `<div class="ab-tw"><table class="ab-t"><thead><tr><th></th>${ks.map(k=>`<th>${E(T(...SCN[k]))}</th>`).join('')}</tr></thead><tbody>
 ${row(['Demand and running costs against base','Mahitaji na gharama dhidi ya msingi'],'d',(r,k)=>Math.round((I.scenarios[k].demand-1)*100),'pct')}
 ${row(['Year-1 revenue','Mapato mwaka 1'],'rev',r=>r.y1.revenue,'tshM')}
 ${row(['Year-1 result','Matokeo mwaka 1'],'pro',r=>r.y1.profit,'tshM')}
 ${row(['First month with a profit','Mwezi wa kwanza wenye faida'],'be',r=>r.breakeven_month,'int')}
 ${row(['Members by month 12','Wanachama ifikapo mwezi 12'],'mem',r=>r.months[11].members,'int')}
 ${row(['Deepest cumulative loss','Kina cha juu cha hasara ya jumla'],'deep',r=>Math.min(0,...r.months.map(q=>q.cum_profit)),'tshM')}
 ${row(['Lowest cash in year 1','Fedha za chini kabisa mwaka 1'],'cash',r=>cashPath(I,r).low.v,'tshM')}
 ${row(['Year-12 revenue','Mapato mwaka 12'],'r12',r=>r.years[r.years.length-1].revenue,'tshM')}
 ${row(['Year-12 EBITDA','EBITDA mwaka 12'],'e12',r=>r.years[r.years.length-1].ebitda,'tshM')}
 </tbody></table></div>
 <p class="ab-mute s61-cap">${E(T(`The first row shows the change in demand; running costs change by ${Math.round((I.scenarios.best.cost-1)*100)}% in the best case and +${Math.round((I.scenarios.down.cost-1)*100)}% in the downside case. Negative values are losses. Source: financial model v1.2.`,`Mstari wa kwanza unaonyesha mabadiliko ya mahitaji; gharama za uendeshaji zinabadilika kwa ${Math.round((I.scenarios.best.cost-1)*100)}% katika hali bora na +${Math.round((I.scenarios.down.cost-1)*100)}% katika hali mbaya. Thamani hasi ni hasara. Chanzo: modeli ya fedha v1.2.`))}</p>`}

function sensHTML(I){const r=window.MODEL.get('base');
 const lv=LEV.map(l=>{const v=I[l.p[0]][l.p[1]];const lo=l.k==='fees'?0:v*l.lo,hi=l.k==='fees'?Math.max(R5_FEE*1.4,v*l.hi):v*l.hi;sens[l.k]=v;
  return `<label class="s61-lev"><span>${E(T(...l.l))} <b class="ab-gold" id="s61o-${l.k}">${E(l.f(v))}</b></span><input type="range" data-s61lev="${l.k}" min="${lo}" max="${hi}" step="${l.step}" value="${v}" aria-label="${E(T(...l.l))}"></label>`}).join('');
 const out=(id,l)=>`<div><small>${E(T(l[0],l[1]))}</small><b class="ab-gold" id="s61x-${id}">–</b><span class="ab-mute" id="s61d-${id}"></span></div>`;
 return `<p>${T('Each slider changes one input of the financial model, and the tool runs the model again with your value: the same code that produces every other figure on this page. With all sliders at their starting positions the results equal the base case above exactly.','Kila kitelezi kinabadilisha pembejeo moja ya modeli ya fedha, na zana inaendesha modeli tena kwa thamani yako: msimbo uleule unaotoa kila takwimu nyingine kwenye ukurasa huu. Vitelezi vyote vikiwa mahali pa kuanzia, matokeo yanalingana kabisa na hali ya msingi iliyo juu.')}</p>
 <div class="s61-sens"><div class="s61-sin">${lv}
  <div class="s61-btns"><button type="button" class="ab-btn" data-s61b="reset">${E(T('Reset to the model','Rudisha kwenye modeli'))}</button><button type="button" class="ab-btn" data-s61b="stress">${E(T('Stress test: 20% fewer visitors and joins','Jaribio la shinikizo: wageni na wanaojiunga 20% pungufu'))}</button><button type="button" class="ab-btn" data-s61b="fees">${E(T(`Payment cost at the ${pc(R5_FEE,1)} estimate`,`Gharama ya malipo kwa makadirio ya ${pc(R5_FEE,1)}`))}</button></div></div>
  <div class="s61-sout" aria-live="polite">
   ${out('rev',['Year-1 revenue','Mapato mwaka 1'])}${out('pro',['Year-1 result','Matokeo mwaka 1'])}${out('be',['First month with a profit','Mwezi wa kwanza wenye faida'])}${out('mem',['Members by month 12','Wanachama ifikapo mwezi 12'])}${out('deep',['Deepest cumulative loss','Kina cha juu cha hasara ya jumla'])}${out('cash',['Lowest cash in year 1','Fedha za chini kabisa mwaka 1'])}
   <p class="ab-mute" id="s61x-txt"></p>
  </div></div>`}
function sensUpdate(){const I=window.MODEL.inputs,base=window.MODEL.get('base'),r=runWith(sens),cb=cashPath(I,base),cr=cashPath(I,r);
 const deep=x=>Math.min(0,...x.months.map(q=>q.cum_profit));
 const put=(id,v,d,f)=>{const el=document.getElementById('s61x-'+id),dl=document.getElementById('s61d-'+id);if(el)el.textContent=v;if(dl)dl.textContent=d};
 const dM=(a,b)=>{const x=(a-b)/1e6;return Math.abs(x)<0.05?T('same as the model','sawa na modeli'):(x>0?'+':'−')+String(parseFloat(Math.abs(x).toFixed(1)))+(sw()?' milioni':'M')+' '+T('vs the model','dhidi ya modeli')};
 put('rev',tshM(r.y1.revenue),dM(r.y1.revenue,base.y1.revenue));
 put('pro',tshM(r.y1.profit),dM(r.y1.profit,base.y1.profit));
 put('be',r.breakeven_month?T('Month ','Mwezi ')+r.breakeven_month:T('After year 1','Baada ya mwaka 1'),r.breakeven_month===base.breakeven_month?T('same as the model','sawa na modeli'):T(`model: month ${base.breakeven_month||'–'}`,`modeli: mwezi ${base.breakeven_month||'–'}`));
 put('mem',Math.round(r.months[11].members).toLocaleString('en-US'),T(`model: ${Math.round(base.months[11].members).toLocaleString('en-US')}`,`modeli: ${Math.round(base.months[11].members).toLocaleString('en-US')}`));
 put('deep',tshM(deep(r)),dM(deep(r),deep(base)));
 put('cash',tshM(cr.low.v),dM(cr.low.v,cb.low.v));
 const prov=useAmt(I,'loss')+useAmt(I,'reserve'),need=-deep(r);
 const tx=document.getElementById('s61x-txt');if(tx)tx.textContent=need<=prov?T(`The deepest loss stays inside the seed’s provision for losses plus the working-capital reserve (${tshM(prov)}).`,`Kina cha hasara kinabaki ndani ya akiba ya mtaji kwa hasara pamoja na akiba ya mtaji wa kazi (${tshM(prov)}).`):T(`The deepest loss is ${tshM(need-prov)} more than the seed’s provision for losses plus the working-capital reserve (${tshM(prov)}).`,`Kina cha hasara kinazidi akiba ya mtaji kwa hasara pamoja na akiba ya mtaji wa kazi (${tshM(prov)}) kwa ${tshM(need-prov)}.`)}

const CSS=`<style>
.s61-hero{border:1px solid var(--line);background:var(--surface);padding:var(--s3)}
.s61-hhead{display:flex;flex-wrap:wrap;gap:var(--s2);justify-content:space-between;align-items:center}
.s61-hhead .ab-mute{display:block;font-size:var(--fs-cap)}
.s61-opt{display:block;margin-top:4px;font-weight:600;font-size:var(--fs-sub)}
.s61-opt [data-num]{color:var(--gold)}
.s61-hgrid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));margin-top:var(--s3);border-top:1px solid var(--line)}
.s61-hn{padding:var(--s3) var(--s2) var(--s2) 0;border-right:1px solid var(--line);padding-left:var(--s2)}
.s61-hn:first-child{padding-left:0}.s61-hn:last-child{border-right:0}
.s61-hv{display:block;color:var(--gold);font-size:calc(var(--fs-title) - 4px);white-space:nowrap;font-weight:600;line-height:1.15;font-variant-numeric:tabular-nums}
.s61-hl{display:block;margin-top:8px;font-size:calc(var(--fs-body) - 2px)}
.s61-hs{display:block;margin-top:6px;color:var(--mute);font-size:var(--fs-cap)}
.s61-hero figcaption{margin-top:var(--s2);font-size:var(--fs-cap);max-width:var(--measure)}
.s61-chart{margin-top:var(--s2);min-height:220px}
.s61-leg{display:flex;flex-wrap:wrap;gap:6px 18px;margin-top:8px;font-size:var(--fs-cap);color:var(--mute)}
.s61-leg i{display:inline-block;width:10px;height:10px;margin-right:6px;vertical-align:-1px}
.s61-cap{font-size:var(--fs-cap);margin-top:8px;max-width:var(--measure)}
.s61-pl td,.s61-pl th{padding:10px 10px!important}
.s61-tot td{font-weight:600}
.s61-sens{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);gap:var(--s4);margin-top:var(--s3)}
.s61-lev{display:block;margin-bottom:var(--s2)}
.s61-lev span{display:flex;justify-content:space-between;gap:12px;font-size:calc(var(--fs-body) - 2px)}
.s61-lev input{width:100%;margin-top:6px;accent-color:var(--green-edge)}
.s61-btns{display:flex;flex-wrap:wrap;gap:8px;margin-top:var(--s2)}
.s61-sout{border:1px solid var(--line);background:var(--surface);padding:var(--s3);align-self:start}
.s61-sout>div{padding:10px 0;border-bottom:1px solid var(--line)}
.s61-sout small{display:block;color:var(--mute);font-size:var(--fs-cap)}
.s61-sout b{display:block;font-size:var(--fs-sub);font-weight:600;font-variant-numeric:tabular-nums}
.s61-sout span{display:block;font-size:var(--fs-cap)}
.s61-sout p{margin-top:var(--s2);font-size:var(--fs-cap)}
.s61-body .ab-block>p,.s61-body .ab-block>h3+p{margin-top:var(--s2)}
.s61-ctl{margin-top:var(--s3)}
.s61-pl td:first-child{white-space:nowrap}
.s61-ul{margin:var(--s2) 0 0;padding-left:20px;max-width:var(--measure)}
.s61-ul li{margin:8px 0}
@media (max-width:860px){.s61-hgrid{grid-template-columns:1fr 1fr}.s61-hn{border-right:0;border-bottom:1px solid var(--line);padding-left:0!important}.s61-hn:nth-child(odd){padding-right:var(--s2)}.s61-sens{grid-template-columns:1fr}}
</style>`;

function render(s,p,pv,nx){const M=window.MODEL,I=M.inputs,r=M.get('base'),lean=A().isLean(),y1=r.y1,ox=I.opex_month,oxT=sum(Object.values(ox)),D4=window.AFYA_D4,COST=(window.AFYAMB_DATA||{}).COST||{};
 const cs=cashPath(I,r),deep=cs.deep,team=sum(I.staff.map(x=>x[1])),Y=r.years,y12=Y[Y.length-1],sv=D4?D4.SAVING:{m1:0,m6:0,m12:0};
 const shares=[COST.brand,COST.pharm,COST.own].filter(x=>x!=null).map(x=>pc(x,0)).join(' / ');
 const loss=useAmt(I,'loss'),res=useAmt(I,'reserve');
 return `<article class="ab-sec" aria-labelledby="h-s6-1">${CSS}<div class="ab-wrap">
 <div class="ab-sec-no">${E(s.no)}</div><h1 id="h-s6-1">${E(s.title)}</h1>
 <p class="ab-summary">${E(T('This section shows the first store’s money, month by month, for the funding option selected. One financial model produces every figure: revenue, profit, cash and twelve years of growth. Switch between the base, best and downside cases and the charts and tables recalculate. Box margins follow the approved price rule, and the sensitivity tool runs the same model again with your inputs. Every figure is a planning estimate until supplier quotes and the pre-sale replace the assumptions.','Sehemu hii inaonyesha fedha za duka la kwanza, mwezi kwa mwezi, kwa chaguo la mtaji lililochaguliwa. Modeli moja ya fedha inatoa kila takwimu: mapato, faida, fedha taslimu na miaka kumi na miwili ya ukuaji. Badilisha kati ya hali ya msingi, hali bora na hali mbaya, na chati na majedwali yanakokotolewa upya. Faida za maboksi zinafuata kanuni ya bei iliyoidhinishwa, na zana ya unyeti inaendesha modeli ileile tena kwa pembejeo zako. Kila takwimu ni makadirio ya mipango hadi bei za wasambazaji na mauzo ya awali zitakapochukua nafasi ya makisio.'))}</p>
 ${heroHTML()}
 <div class="ab-body s61-body">
 <section class="ab-block"><h2>${E(T('One store, modelled month by month','Duka moja, limepangwa mwezi kwa mwezi'))}</h2>
  <p>${T(`Every projection starts with one store. In this option it is ${lean?'a start-small store':'the street-front flagship'} of ${N('u-area',I.store.area_m2,'int')} m², open ${E(I.store.hours)}, with a team of ${N('u-team',team,'int')} people ${lean?'on one long shift':'on two shifts'}. Year 1 is modelled month by month from activity inside that store: visitors, the share who buy, members who join the Afya Box from store customers and from the free Afya Check, online orders, partner care packs and Afya Kazini business accounts. From year 2 the model works in whole years and store counts, and every later store scales the first one’s results.`,`Kila makadirio yanaanza na duka moja. Katika chaguo hili ni ${lean?'duka dogo la kuanzia':'duka kuu la mbele ya barabara'} la m² ${N('u-area',I.store.area_m2,'int')}, linalofunguliwa ${E(I.store.hours)}, likiwa na timu ya watu ${N('u-team',team,'int')} ${lean?'kwa zamu moja ndefu':'kwa zamu mbili'}. Mwaka 1 umepangwa mwezi kwa mwezi kutokana na shughuli ndani ya duka hilo: wageni, sehemu wanaonunua, wanachama wanaojiunga na Afya Box kutoka kwa wateja wa dukani na kutoka kipimo cha bure cha Afya Check, oda za mtandaoni, vifurushi vya huduma za washirika na akaunti za biashara za Afya Kazini. Kuanzia mwaka 2 modeli inafanya kazi kwa miaka mizima na idadi ya maduka, na kila duka linalofuata linakuza matokeo ya lile la kwanza.`)}</p>
  ${engineHTML(I,r)}
  <p class="ab-mute s61-cap">${E(T('The engine of the financial model v1.2, with this option’s inputs. Planning estimates.','Injini ya modeli ya fedha v1.2, pamoja na pembejeo za chaguo hili. Makadirio ya mipango.'))}</p>
 </section>

 <section class="ab-block"><h2>${E(T('Box margins follow the approved price rule','Faida za maboksi zinafuata kanuni ya bei iliyoidhinishwa'))}</h2>
  <p>${T(`Members pay ${pc(sv.m1,0)}, ${pc(sv.m6,0)} or ${pc(sv.m12,0)} less than the shelf price of what is inside the box on a 1-, 6- or 12-month plan, and packing and doorstep delivery are included in that price, not added. This is the approved price rule (section 3.5), and the model’s box margin is set to match it: ${N('d-gm',I.members.box_products_gm*100,'pct')} on box goods. Goods are costed at ${shares} of the shelf price for branded goods from Tanzanian distributors, registered health products from licensed wholesalers, and simple goods imported directly. These landed costs are planning figures until supplier quotes arrive; section 6.2 shows one box worked through to the shilling.`,`Wanachama wanalipa ${pc(sv.m1,0)}, ${pc(sv.m6,0)} au ${pc(sv.m12,0)} chini ya bei ya rafu ya vilivyomo ndani ya boksi kwa mpango wa mwezi 1, miezi 6 au miezi 12, na ufungashaji na usafirishaji hadi mlangoni vimo ndani ya bei hiyo, haviongezwi. Hii ndiyo kanuni ya bei iliyoidhinishwa (sehemu ya 3.5), na faida ya boksi katika modeli imewekwa kulingana nayo: ${N('d-gm',I.members.box_products_gm*100,'pct')} kwa bidhaa za boksi. Bidhaa zinakadiriwa kwa gharama ya ${shares} ya bei ya rafu kwa bidhaa zenye chapa kutoka kwa wasambazaji wa Tanzania, bidhaa za afya zilizosajiliwa kutoka kwa wauzaji wa jumla wenye leseni, na bidhaa rahisi zinazoagizwa moja kwa moja. Gharama hizi za kufikisha ni takwimu za mipango hadi bei za wasambazaji zitakapofika; sehemu ya 6.2 inaonyesha boksi moja likikokotolewa hadi shilingi.`)}</p>
  <p>${T(`Under this rule the early losses are deeper than under the earlier box margin, because each box keeps less after goods, packing and delivery. The seed amount is unchanged; section 6.3 shows how the working-capital reserve absorbs the difference.`,`Chini ya kanuni hii hasara za mwanzo ni kubwa kuliko chini ya faida ya boksi ya awali, kwa sababu kila boksi linabaki na kidogo baada ya bidhaa, ufungashaji na usafirishaji. Kiasi cha mtaji wa awali hakijabadilika; sehemu ya 6.3 inaonyesha jinsi akiba ya mtaji wa kazi inavyobeba tofauti hiyo.`)}</p>
 </section>

 <section class="ab-block"><h2>${E(T('Year 1, month by month','Mwaka 1, mwezi kwa mwezi'))}</h2>
  <p>${T('In its first year the store is building a membership base, so it starts with losses that shrink every month. Running costs stay almost flat while visitors, members and online orders grow, so once the fixed costs are covered each extra member adds almost all of their box margin to profit. The case switch below controls the charts and tables in this part of the page and in the cash section.','Katika mwaka wake wa kwanza duka linajenga idadi ya wanachama, hivyo linaanza na hasara zinazopungua kila mwezi. Gharama za uendeshaji zinabaki karibu sawa huku wageni, wanachama na oda za mtandaoni zikiongezeka, hivyo gharama zisizobadilika zikishalipwa kila mwanachama wa ziada anaongeza karibu faida yote ya boksi lake kwenye faida. Kibadilishi cha hali hapa chini kinaongoza chati na majedwali katika sehemu hii ya ukurasa na katika sehemu ya fedha taslimu.')}</p>
  <div class="s61-ctl">${scSeg()}</div>
  <div id="s61sc">${yearHTML(I)}</div>
 </section>

 <section class="ab-block"><h2>${E(T('Twelve years','Miaka kumi na miwili'))}</h2>
  <p>${T(`From year 2 the plan opens stores against gates set on the first store’s results (section 5.4), growing to ${N('t-st',y12.stores,'int')} stores by year 12. The table follows the selected case. Store one’s build is booked at the standard new-store cost in year 1, so year 1 shows the seed spend in a simplified form. From year 2 onward the plan is the same in both funding options; only the first store differs.`,`Kuanzia mwaka 2 mpango unafungua maduka kulingana na vigezo vilivyowekwa kwa matokeo ya duka la kwanza (sehemu ya 5.4), hadi kufikia maduka ${N('t-st',y12.stores,'int')} ifikapo mwaka 12. Jedwali linafuata hali iliyochaguliwa. Ujenzi wa duka la kwanza umewekwa kwa gharama ya kawaida ya duka jipya mwaka 1, hivyo mwaka 1 unaonyesha matumizi ya mtaji wa awali kwa njia iliyorahisishwa. Kuanzia mwaka 2 mpango ni uleule katika machaguo yote mawili ya mtaji; duka la kwanza pekee ndilo linatofautiana.`)}</p>
  <div id="s61yr">${yearsHTML(I)}</div>
 </section>

 <section class="ab-block" id="s61try"><h2>${E(T('Test the drivers','Pima vichocheo'))}</h2>
  ${sensHTML(I)}
  <p class="ab-mute s61-cap">${E(T(`Base case of the selected option. The payment-cost button applies the high-case estimate of ${pc(R5_FEE,1)} of revenue (75% mobile money, 10% card, 15% cash; operator rates not yet confirmed in writing).`,`Hali ya msingi ya chaguo lililochaguliwa. Kitufe cha gharama ya malipo kinatumia makadirio ya juu ya ${pc(R5_FEE,1)} ya mapato (75% pesa za simu, 10% kadi, 15% fedha taslimu; viwango vya waendeshaji bado havijathibitishwa kwa maandishi).`))}</p>
 </section>

 <section class="ab-block"><h2>${E(T('Three cases compared','Hali tatu zikilinganishwa'))}</h2>
  <p>${E(T('The plan should be judged on the downside case, not the best case. In the downside the store does not reach a monthly profit in year 1, which is why tranche 3 waits for evidence and why the seed carries a working-capital reserve.','Mpango unapaswa kupimwa kwa hali mbaya, si kwa hali bora. Katika hali mbaya duka halifikii faida ya mwezi katika mwaka 1, ndiyo maana awamu ya 3 inasubiri ushahidi na mtaji wa awali una akiba ya mtaji wa kazi.'))}</p>
  ${casesHTML(I)}
 </section>

 <section class="ab-block"><h2>${E(T('Risks and the planned answer','Hatari na jibu lililopangwa'))}</h2>
  <ul class="s61-ul">
   <li>${T(`<b>Members join more slowly than planned.</b> Membership is the line that decides the year: the sensitivity tool shows how the break-even month moves with the join rate and churn. Tranche 3 is released only once the store has the member count written into the milestone.`,`<b>Wanachama wanajiunga polepole kuliko ilivyopangwa.</b> Uanachama ndio mstari unaoamua mwaka: zana ya unyeti inaonyesha jinsi mwezi wa kufikia faida unavyosogea kulingana na kiwango cha kujiunga na cha kuondoka. Awamu ya 3 inatolewa pale tu duka linapokuwa na idadi ya wanachama iliyoandikwa kwenye lengo.`)}</li>
   <li>${T(`<b>Box margins are thinner than planned.</b> The price rule keeps the member price below shelf by construction, so the margin depends on landed costs. Supplier quotes replace the planning shares before stock is ordered; a box that does not cover its packing and delivery is delivered less often or collected in store.`,`<b>Faida za maboksi ni ndogo kuliko ilivyopangwa.</b> Kanuni ya bei inahakikisha bei ya mwanachama iko chini ya rafu, hivyo faida inategemea gharama za kufikisha. Bei za wasambazaji zitachukua nafasi ya makadirio kabla bidhaa hazijaagizwa; boksi lisilolipia ufungashaji na usafirishaji wake linapelekwa mara chache zaidi au linachukuliwa dukani.`)}</li>
   <li>${T(`<b>Cash runs short before break-even.</b> The seed carries ${N('r-loss',loss,'tshM')} for operating losses and lease advances and a ${N('r-res',res,'tshM')} working-capital reserve. The cash section above derives the bank balance month by month.`,`<b>Fedha zinapungua kabla ya kufikia faida.</b> Mtaji wa awali una ${N('r-loss',loss,'tshM')} kwa hasara za uendeshaji na kodi za mapema na akiba ya mtaji wa kazi ya ${N('r-res',res,'tshM')}. Sehemu ya fedha taslimu hapo juu inakokotoa salio la benki mwezi kwa mwezi.`)}</li>
   <li>${T(`<b>Growth needs more capital.</b> Each new store costs ${tshM(I.growth.new_store_capex)} to build. The twelve-year table shows EBITDA less build cost, which marks the year the chain begins to fund its own openings; section 6.4 shows what later rounds mean for ownership.`,`<b>Ukuaji unahitaji mtaji zaidi.</b> Kila duka jipya linagharimu ${tshM(I.growth.new_store_capex)} kujenga. Jedwali la miaka kumi na miwili linaonyesha EBITDA ukitoa gharama ya ujenzi, inayoonyesha mwaka ambao mtandao unaanza kugharamia ufunguzi wake wenyewe; sehemu ya 6.4 inaonyesha maana ya awamu za baadaye kwa umiliki.`)}</li>
  </ul>
 </section>
 </div>

 <section class="ab-block"><h2>${E(T('Key figures','Takwimu muhimu'))}</h2>
  ${A().figsHTML([
   {v:`${N('f-ox',oxT,'tshM')} ${est()}`,l:T('Running costs a month, eight lines','Gharama za uendeshaji kwa mwezi, mistari minane'),s:E(T('Financial model v1.2','Modeli ya fedha v1.2'))},
   {v:`${N('f-gm',y1.gross_profit/y1.revenue*100,'pct')} ${est()}`,l:T('Gross margin in year 1, all channels','Faida ghafi mwaka 1, njia zote'),s:E(T('Financial model v1.2','Modeli ya fedha v1.2'))},
   {v:`−${N('f-deep',-deep,'tshM')} ${est()}`,l:T('Deepest cumulative loss before break-even','Kina cha juu cha hasara ya jumla kabla ya kufikia faida'),s:E(T('Financial model v1.2, base case','Modeli ya fedha v1.2, hali ya msingi'))},
   {v:`${N('f-st',y12.stores,'int')} · ${N('f-r12',y12.revenue,'tshM')} ${est()}`,l:T('Stores and yearly revenue by year 12','Maduka na mapato ya mwaka ifikapo mwaka 12'),s:E(T('Financial model v1.2, base case','Modeli ya fedha v1.2, hali ya msingi'))}])}
 </section>

 <section class="ab-block"><h2>${E(T('What this costs','Hii inagharimu nini'))}</h2>
  <p>${E(T('The store’s running costs, which customer prices must recover once the store trades at break-even (section 6.2), and the two seed lines that carry the store until then.','Gharama za uendeshaji za duka, ambazo bei za wateja zinapaswa kuzirudisha duka likishafikia faida (sehemu ya 6.2), na mistari miwili ya mtaji wa awali inayolibeba duka hadi wakati huo.'))}</p>
  <div class="ab-tw"><table class="ab-t"><thead><tr><th>${E(T('Running cost','Gharama ya uendeshaji'))}</th><th>${E(T('A month','Kwa mwezi'))}</th><th>${E(T('Share','Sehemu'))}</th></tr></thead><tbody>
   ${OPEX.filter(o=>ox[o[0]]!=null).map(o=>`<tr><td>${E(T(o[1],o[2]))}</td><td class="ab-n">${N('w-'+o[0],ox[o[0]],'tsh')}</td><td class="ab-n">${N('w-p-'+o[0],ox[o[0]]/oxT*100,'pct')}</td></tr>`).join('')}
   <tr class="s61-tot"><td>${E(T('Total running costs a month','Jumla ya gharama za uendeshaji kwa mwezi'))}</td><td class="ab-n">${N('w-tot',oxT,'tsh')}</td><td class="ab-n">100%</td></tr>
   <tr><td>${E(T('Seed: operating losses and lease advances until break-even','Mtaji wa awali: hasara za uendeshaji na kodi za mapema hadi kufikia faida'))}</td><td class="ab-n">${N('w-loss',loss,'tsh')}</td><td></td></tr>
   <tr><td>${E(T('Seed: working-capital reserve','Mtaji wa awali: akiba ya mtaji wa kazi'))}</td><td class="ab-n">${N('w-res',res,'tsh')}</td><td></td></tr>
  </tbody></table></div>
  <p class="ab-mute s61-cap">${E(T('Planning estimates, financial model v1.2. Staff costs include employer NSSF and WCF contributions, annual-leave cover and the night-hours allowance. Founders’ pay is not in running costs (section 6.4).','Makadirio ya mipango, modeli ya fedha v1.2. Gharama za wafanyakazi zinajumuisha michango ya mwajiri ya NSSF na WCF, malipo ya kuziba likizo ya mwaka na posho ya saa za usiku. Malipo ya waanzilishi hayamo katika gharama za uendeshaji (sehemu ya 6.4).'))}</p>
 </section>

 ${A().openHTML([
  E(T(`Landed costs: the ${shares} shares of shelf price are planning figures. The box margin of the model depends on them and is replaced by supplier quotes before stock is ordered.`,`Gharama za kufikisha: sehemu za ${shares} za bei ya rafu ni takwimu za mipango. Faida ya boksi ya modeli inazitegemea na itachukuliwa nafasi na bei za wasambazaji kabla bidhaa hazijaagizwa.`)),
  E(T(`Payment processing: the model carries ${pc(I.tax.payment_fees,1)} of revenue; the payment-cost estimate is about ${pc(R5_FEE,1)} until the operators confirm their merchant rates in writing. The sensitivity tool shows the effect.`,`Gharama za kupokea malipo: modeli inatumia ${pc(I.tax.payment_fees,1)} ya mapato; makadirio ya gharama za malipo ni takriban ${pc(R5_FEE,1)} hadi waendeshaji watakapothibitisha viwango vyao vya wafanyabiashara kwa maandishi. Zana ya unyeti inaonyesha athari yake.`)),
  E(T('Visitors, the share who buy, join rates and churn are planning estimates. The founding-member pre-sale gives the first measured join rate.','Wageni, sehemu wanaonunua, viwango vya kujiunga na vya kuondoka ni makadirio ya mipango. Mauzo ya awali kwa wanachama waanzilishi yatatoa kiwango cha kwanza cha kujiunga kilichopimwa.')),
  E(lean?T('Rent: the secondary-street rent for the start-small store is an estimate until a lease is quoted.','Kodi ya pango: kodi ya barabara ya pili kwa duka dogo ni makadirio hadi bei ya mkataba wa pango itakapotolewa.'):T('Rent: the flagship rent follows a prime-street benchmark until a lease is quoted.','Kodi ya pango: kodi ya duka kuu inafuata kipimo cha barabara kuu hadi bei ya mkataba wa pango itakapotolewa.')),
  E(T('The 1% Afya Points and the card perks with a running cost (same-day delivery, the equipment rental discount, the personal adviser) are inside each box’s price check, but are not yet separate lines in the financial model.','Pointi za Afya za 1% na manufaa ya kadi yenye gharama ya uendeshaji (usafirishaji wa siku hiyohiyo, punguzo la kukodisha vifaa, mshauri binafsi) yamo ndani ya ukaguzi wa bei wa kila boksi, lakini bado si mistari tofauti katika modeli ya fedha.'))])}

 ${A().sourcesHTML([
  {t:T('Afya Basics financial model v1.2 (planning estimates; box-goods margin set to the approved price rule on 10 Nov 2026)','Modeli ya fedha ya Afya Basics v1.2 (makadirio ya mipango; faida ya bidhaa za boksi imewekwa kulingana na kanuni ya bei iliyoidhinishwa tarehe 10 Nov 2026)'),u:'',chk:CHK},
  {t:T('Afya Basics price-rule analysis: Mama na Mtoto stages priced under the 3/6/9% rule, planning landed costs (estimate)','Uchambuzi wa kanuni ya bei wa Afya Basics: hatua za Mama na Mtoto zikipangiwa bei kwa kanuni ya 3/6/9%, gharama za kufikisha za mipango (makadirio)'),u:'',chk:CHK},
  {t:T('Afya Basics payment-cost estimate: mobile-money push, card and cash mix (estimate)','Makadirio ya gharama za malipo ya Afya Basics: mchanganyiko wa malipo ya simu, kadi na fedha taslimu (makadirio)'),u:'',chk:'9 Nov 2026'},
  {t:T('TRA, Taxes and Duties at a Glance 2025/26: VAT 18%, corporate tax 30%','TRA, Kodi na Ushuru kwa Ufupi 2025/26: VAT 18%, kodi ya mapato ya kampuni 30%'),u:'https://www.tra.go.tz/images/uploads/pages/TAXES_AND_DUTIES_AT_A_GLANCE_2025_2026.pdf',chk:'9 Nov 2026'}])}
 ${A().pagerHTML(pv,nx)}
 </div></article>`}

let bound=false,onRz=null;
function init(){const root=document.getElementById('s61sc');if(!root)return;drawCharts();sensUpdate();
 if(onRz)removeEventListener('resize',onRz);let t;onRz=()=>{clearTimeout(t);t=setTimeout(drawCharts,120)};addEventListener('resize',onRz);
 addEventListener('afya:leave',()=>{if(onRz){removeEventListener('resize',onRz);onRz=null}},{once:true});
 if(bound)return;bound=true;
 document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-s61sc],[data-s61b]');if(!t||!document.getElementById('s61sc'))return;const I=window.MODEL.inputs;
  if(t.dataset.s61sc){SC=t.dataset.s61sc;document.querySelectorAll('[data-s61sc]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.s61sc===SC)));
   document.getElementById('s61sc').innerHTML=yearHTML(I);document.getElementById('s61yr').innerHTML=yearsHTML(I);drawCharts();return}
  const b=t.dataset.s61b;LEV.forEach(l=>{const v0=I[l.p[0]][l.p[1]];sens[l.k]=b==='stress'&&(l.k==='vis'||l.k==='join')?v0*0.8:b==='fees'&&l.k==='fees'?R5_FEE:b==='fees'?sens[l.k]:v0;
   const inp=document.querySelector(`[data-s61lev="${l.k}"]`);if(inp)inp.value=sens[l.k];const o=document.getElementById('s61o-'+l.k);if(o)o.textContent=l.f(sens[l.k])});sensUpdate()});
 document.addEventListener('input',e=>{const t=e.target.closest&&e.target.closest('[data-s61lev]');if(!t)return;const l=LEV.find(x=>x.k===t.dataset.s61lev);sens[l.k]=+t.value;const o=document.getElementById('s61o-'+l.k);if(o)o.textContent=l.f(+t.value);sensUpdate()})}

window.SECTIONS['s6-1']={render,init,v2:true};
})();
