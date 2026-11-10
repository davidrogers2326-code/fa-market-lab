/* 4.3 Packing and delivery · v2 on the D2 template.
   Every box price is read from the D4 engine (window.AFYA_D4) through the 3.5 price function (window.AB_S35.priceStage)
   for boxes marked final in window.AFYA_DATA; other boxes say "price published when the box is final".
   Delivery figures follow the funding switch (MODEL.inputs: riders in staff, online fee and rider cost per order,
   members at month 12, the motorbike line in the seed). Packaging landed cost is rebuilt from listing prices at the
   BoT rate of 10 Nov 2026 and the 2026 customs processing fee (R1); it rounds up to the D4 packing lines S/M/L.
   Package films: all 17 earlier films and the shop-display film were checked frame by frame on 10 Nov 2026. Every one
   shows the old banded box and an on-screen price built the pre-D4 way (shelf −3% plus box plus delivery), several show
   medicine packs, and none shows gloved-hand packing. All are withdrawn; each package shows a "film in production" card. */
(function(){
'use strict';
const A=()=>window.AB,T=(e,s)=>A().T(e,s),E=s=>A().E(s),N=(k,v,f)=>A().numHTML(k,v,f);
const DATA=()=>window.AFYA_DATA||{boxes:{}};
const D4=()=>window.AFYA_D4||{PACKING:{S:3500,M:5000,L:6500},DELIVERY:3500,SAVING:{m1:.03,m6:.06,m12:.09}};
const tsh=n=>n==null?'—':'TSh '+Math.round(n).toLocaleString('en-US');
const usd=(n,d)=>'US$'+Number(n).toLocaleString('en-US',{minimumFractionDigits:d==null?2:d,maximumFractionDigits:d==null?2:d});
const n1=(n,d)=>Number(n).toLocaleString('en-US',{minimumFractionDigits:d,maximumFractionDigits:d});
const est=()=>`<span class="ab-est">${E(T('estimate','makadirio'))}</span>`;
const sum=a=>a.reduce((t,x)=>t+x,0);

/* ---------- research constants (sources in SRC below) ---------- */
const FX=2642.50;                       /* BoT mean rate US$, trading date 10 Nov 2026 (research/fx.md) */
const DUTY=.25,RDL=.02,CPF=.01,INS=.005;/* duty: planning rate until the clearing agent confirms the line; RDL 2% of CIF; CPF 1% of FOB from 1 Jul 2026 (R1) */
const FRT=111,PACKF=1.3;                /* LCL Shenzhen–Dar US$ per m³; packing factor for flat cartons */
const BX={S:{L:26,W:18,H:10,kg:1.5,box:.55,ins:.12},M:{L:34,W:25,H:12,kg:3,box:.75,ins:.18},L:{L:40,W:30,H:16,kg:5,box:1.0,ins:.25}};
const BOARD={cal:1.5,ect:32,gsm:450};   /* E-flute: caliper mm, ECT lb/in, grammage g/m² (estimate) */
const ENV={store:.5,rh:.68,stack:.5};   /* iPack factors: storage, humidity, stacking */
const EXTRA={card:.06,tissue:.02,seal:.05};
const LOCAL=350;                        /* member label with box code and QR, printed in Dar es Salaam (estimate) */
const BAGS=[['Kraft bag S','Mfuko wa karatasi S','18×8×22 cm',.12,.01],['Kraft bag M','Mfuko wa karatasi M','26×12×32 cm',.18,.015],['Kraft bag L','Mfuko wa karatasi L','32×14×42 cm',.25,.02],['Afya gift bag','Mfuko wa zawadi wa Afya','26×12×32 cm',.45,.03],['Afya cotton tote','Mfuko wa pamba wa Afya','38×42 cm',.50,.03]];
const BAG_WASTE=.15,VAT=.18;
const WORKDAYS=26;                      /* delivery days a month (planning assumption) */

function eng(k){const b=BX[k],bl=b.L+4*b.H+2,bw=2*b.W+4*b.H+2,area=bl*bw/1e4,vol=bl*bw*(BOARD.cal/10)/1e6,frU=vol*PACKF*FRT;
 const per=2*(b.L+b.W)/2.54,cal=BOARD.cal/25.4,bct=5.87*BOARD.ect*Math.sqrt(cal*per),bctKg=bct*.4536,mult=1/(ENV.store*ENV.rh*ENV.stack),above=Math.floor(bctKg/(b.kg*mult));
 const fob=b.box+b.ins+EXTRA.card+EXTRA.tissue+EXTRA.seal,cif=(fob+frU)*(1+INS),duty=cif*DUTY,lev=cif*RDL+fob*CPF,landUS=cif+duty+lev,landTS=landUS*FX,total=landTS+LOCAL;
 return {k,b,bl,bw,area,kg:area*BOARD.gsm,vol,frU,per,bct,bctKg,mult,maxH:above+1,fob,cif,duty,lev,landUS,landTS,total,up:Math.ceil(total/500)*500,line:D4().PACKING[k]}}
function bag(x){const fob=x[3],cif=(fob+x[4])*(1+INS),land=(cif*(1+DUTY+RDL)+fob*CPF)*FX,net=land*(1+BAG_WASTE),gross=Math.ceil(net*(1+VAT)/100)*100;return {en:x[0],sw:x[1],d:x[2],fob,land,net,gross}}

/* ---------- the line-up (B16, names per D-3; same order as 3.5) ---------- */
const LINEUP=[['mama-mjamzito','Mama Mjamzito','Pregnancy, one box each trimester','Ujauzito, boksi moja kila miezi mitatu'],
 ['mama-na-mtoto','Mama na Mtoto','Mother and baby, from birth to 3 years','Mama na mtoto, tangu kuzaliwa hadi miaka 3'],
 ['afya-shule','Afya Shule','Children aged 4 to 12','Watoto wa miaka 4 hadi 12'],['binti','Binti','Teenage girls','Wasichana wa umri wa balehe'],
 ['kijana','Kijana','Teenage boys','Wavulana wa umri wa balehe'],['afya-glow','Afya Glow','Women aged 20 to 59','Wanawake wa miaka 20 hadi 59'],
 ['afya-men','Afya Men','Men aged 20 to 59','Wanaume wa miaka 20 hadi 59'],['bibi-na-babu','Bibi na Babu','Older adults, 60 and over','Wazee, miaka 60 na zaidi'],
 ['sukari','Sukari','Living with diabetes','Wanaoishi na kisukari'],['presha','Presha','Living with high blood pressure','Wanaoishi na shinikizo la juu la damu'],
 ['figo','Figo','Kidney care and dialysis','Huduma ya figo na usafishaji damu'],['kupona','Kupona','Recovery after surgery or injury','Kupona baada ya upasuaji au jeraha'],
 ['huduma-ya-kwanza','Huduma ya Kwanza','First aid at home','Huduma ya kwanza nyumbani'],['nyumbani','Nyumbani','Home health essentials','Mahitaji ya afya ya nyumbani'],
 ['afya-siku','Afya Siku','Period care','Huduma ya hedhi'],['afya-kazini','Afya Kazini','Offices','Ofisi'],
 ['afya-biashara','Afya Biashara','Small businesses','Biashara ndogo'],['afya-hoteli','Afya Hoteli','Hotels and guest houses','Hoteli na nyumba za wageni']];
const PER={'monthly':['a month','kwa mwezi'],'every-2-months':['per two-month box','kwa boksi la miezi miwili'],'every-3-months':['per three-month box','kwa boksi la miezi mitatu'],'per-trimester':['per trimester box','kwa boksi la miezi mitatu ya ujauzito']};
const RHYTHM={'monthly':['Every month','Kila mwezi'],'every-2-months':['Every two months, two months of goods','Kila miezi miwili, bidhaa za miezi miwili'],'every-3-months':['Every three months, three months of goods','Kila miezi mitatu, bidhaa za miezi mitatu'],'per-trimester':['Once each trimester','Mara moja kila miezi mitatu ya ujauzito']};

/* D4 member price on the 1-month plan, regular tier, default brands: lowest stage of the box (same function as 3.5) */
function fromPrice(key){const b=DATA().boxes[key];if(!b||!b.final||!b.stages||!b.stages.length)return null;
 const S=window.AB_S35;let v=[];
 try{if(S&&S.priceStage)v=b.stages.map(s=>S.priceStage(b,s,'m1','regular')).filter(r=>r&&!r.missing).map(r=>r.total)}catch(e){v=[]}
 if(!v.length)return null;return {min:Math.min(...v),max:Math.max(...v),n:v.length,per:PER[b.delivery]||PER.monthly}}

/* ---------- delivery economics for the selected option (MODEL) ---------- */
function del(){const M=window.MODEL,I=M.inputs,r=M.get('base'),lean=A().isLean();
 const riders=(I.staff||[]).filter(x=>/rider/i.test(x[0])),nR=sum(riders.map(x=>x[1])),pay=riders.length?riders[0][2]:0;
 const riderMonth=sum(riders.map(x=>x[1]*x[2]))*(1+(I.staff_leave_cover||0))*(1+(I.staff_oncost||0));
 const mem=Math.round(r.months[11].members),boxDay=mem/WORKDAYS,onl=I.online.orders_day_m12,drops=boxDay+onl;
 const perDrop=(nR?riderMonth/WORKDAYS/drops:0)+I.online.rider_cost_per_order;
 const bikes=sum((I.seed.use||[]).filter(u=>/motorbike/i.test(u[0])).map(u=>u[1]));
 return {lean,I,nR,pay,riderMonth,mem,boxDay,onl,drops,perDrop,bikes,fee:I.online.delivery_fee,perOrder:I.online.rider_cost_per_order,pack:I.opex_month.packaging_misc}}

/* ---------- sources ---------- */
const NR=' (cited in the earlier showroom, not re-opened)';
const SRC=[
 {t:'Brief D4 pricing rule, approved 10 Nov 2026: packing at landed cost of the box size (S 3,500 · M 5,000 · L 6,500) and delivery 3,500 included in the member price',u:'',chk:'10 Nov 2026'},
 {t:'Afya Basics financial model v1.2: riders, online orders, delivery fee, rider cost per order, packaging running cost, motorbike line in the seed (planning estimates)',u:'',chk:'10 Nov 2026'},
 {t:'Bank of Tanzania, exchange rates: US$1 = TSh 2,642.50 (mean rate, trading date 10 Nov 2026)',u:'https://www.bot.go.tz/ExchangeRate/excRates',chk:'10 Nov 2026'},
 {t:'TRA, Customs Processing Fee Regulations 2026 (GN 158D): 1% of FOB on dry cargo from 1 Jul 2026',u:'https://www.tra.go.tz/images/uploads/acts/GN_158D-THE_TANZANIA_REVENUE_AUTHORITY_%28CUSTOMS_PROCESSING_FEE%29_REGULATIONS%2C_2026-TGPA.pdf',chk:'9 Nov 2026'},
 {t:'TRA, Finance Act 2024, s.75: Railway Development Levy raised from 1.5% to 2%',u:'https://www.tra.go.tz/images/uploads/acts/Finance_Act_2024_%281%29.pdf',chk:'9 Nov 2026'},
 {t:'TRA, Taxes and Duties at a Glance 2025/2026: import VAT 18%',u:'https://www.tra.go.tz/images/uploads/pages/TAXES_AND_DUTIES_AT_A_GLANCE_2025_2026.pdf',chk:'9 Nov 2026'},
 {t:'Tanzania GN 291 of 2022, Environmental Management (Prohibition of Plastic Carrier Bags) Regulations: plastic carrier bags banned; paper, woven and plastic-free bags allowed; medical packaging exempt'+NR,u:'https://tanzlii.org/en/akn/tz/act/gn/2022/291/eng@2022-05-06'},
 {t:'Made-in-China: custom printed corrugated mailer boxes, US$0.10–0.80 a piece at MOQ 300–3,000'+NR,u:'https://www.made-in-china.com/products-search/hot-china-products/Custom_Corrugated_Box_Price.html'},
 {t:'Global Sources: custom printed kraft mailer boxes, US$0.23–0.95 a piece, MOQ 500'+NR,u:'https://www.globalsources.com/category/corrugated-boxes-for-sale-price_27481/?pageNum=12'},
 {t:'Made-in-China: kraft paper bags with handles, custom print, US$0.08–0.88; ribbon-handle gift bags US$0.09–0.49'+NR,u:'https://www.made-in-china.com/products-search/hot-china-products/Paper_Packaging_Bag_Price.html'},
 {t:'Global Sources: printed cotton canvas tote bags, US$0.40–0.50 FOB at 1,000 pieces'+NR,u:'https://www.globalsources.com/knowledge/custom-print-canvas-tote-bag/'},
 {t:'Global Sources: custom gift and tissue paper, US$0.01–0.03 a sheet at 1,000'+NR,u:'https://www.globalsources.com/category/gift-wrapping-paper-for-sale-price_11243/'},
 {t:'Global Sources: printed cards, from US$0.04–0.07 at 1,000'+NR,u:'https://www.globalsources.com/category/business-cards-for-sale-price_26641/'},
 {t:'LabelValue: 1.5-inch custom round stickers, 5,000 for US$230.70 (US$0.046 each)'+NR,u:'https://www.labelvalue.com/1-and-half-inch-custom-round-stickers.html'},
 {t:'Racklify: E-flute board, about 1.2–1.7 mm thick, smooth print surface'+NR,u:'https://racklify.com/encyclopedia/what-is-an-e-flute-box-definition-construction-and-uses/'},
 {t:'Northwest Paper Box: ECT grades (32 ECT is the general-purpose grade)'+NR,u:'https://www.nwpaperbox.com/blog/corrugated-box-specs-non-engineers-can-understand'},
 {t:'AICC: calculating theoretical box compression (McKee formula)'+NR,u:'https://now.aiccbox.org/calculating-theoretical-box-compression/'},
 {t:'iPack: determining the compression requirement (storage, humidity and stacking factors)'+NR,u:'https://www.ipack.com/blog/determining-compression-requirement'},
 {t:'5688.cn: LCL Shenzhen to Dar es Salaam, about US$111 per cubic metre'+NR,u:'https://www.5688.cn/en/lcl/tzdar.html'},
 {t:'Spiro: launch in Tanzania, May 2025, battery-swap network'+NR,u:'https://www.spironet.com/news/spiro-launches-in-tanzania-driving-forward-sustainable-urban-mobility'},
 {t:'Daily News: electric motorcycles in Dar es Salaam, 100–120 km a charge'+NR,u:'https://dailynews.co.tz/tanzania-riders-see-fortune-in-electric-motorcycles/'}];

/* ---------- CSS (tokens only; no shadows, gradients or entrance animation) ---------- */
const CSS=`<style>
.s43-flow{border:1px solid var(--line);background:var(--surface);padding:var(--s2)}
.s43-flow svg{display:block;width:100%;height:auto}
.s43-flow .s43-ph{display:none}
.s43-cap{font-size:var(--fs-cap);margin-top:8px;max-width:var(--measure)}
.s43-ul{margin:var(--s2) 0 0;padding-left:20px;max-width:var(--measure)}.s43-ul li{margin:8px 0}
.s43-ul b{font-weight:600}
.s43-two{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:var(--s3);align-items:start;margin-top:var(--s3)}
.s43-two figure{margin:0}
.s43-two img{display:block;width:100%;height:auto;border:1px solid var(--line)}
.s43-films{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:1px;margin-top:var(--s3);background:var(--line);border:1px solid var(--line)}
.s43-film{background:var(--bg);padding:var(--s2);display:flex;flex-direction:column;gap:8px}
.s43-frame{aspect-ratio:16/9;border:1px dashed var(--line);background:var(--surface);display:grid;place-items:center;text-align:center;padding:8px;color:var(--mute);font-size:var(--fs-cap)}
.s43-frame svg{display:block;margin:0 auto 6px;width:28px;height:20px}
.s43-film b{font-weight:600}
.s43-film span{color:var(--mute);font-size:var(--fs-cap)}
.s43-film .s43-p{color:var(--ink);font-size:var(--fs-cap)}
.s43-chart{margin-top:var(--s3);border:1px solid var(--line);background:var(--surface);padding:var(--s2)}
.s43-chart svg{display:block}
.s43-t td.ab-n,.s43-t th.ab-n{text-align:right;white-space:nowrap}
@media (max-width:860px){.s43-two{grid-template-columns:minmax(0,1fr)}}
@media (max-width:640px){.s43-flow .s43-dt{display:none}.s43-flow .s43-ph{display:block}.s43-films{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}}
</style>`;

/* ---------- primary visual: the six steps from shelf to doorstep (inline SVG, two layouts) ---------- */
const STEPS=[['Pick','Kuchukua','by the member’s locked list','kwa orodha iliyofungwa ya mwanachama'],['Pack','Kufungasha','gloved hands, fixed layout','kwa glavu, mpangilio maalum'],['Check and seal','Kukagua na kufunga','photographed, then closed','inapigwa picha, kisha inafungwa'],['Wave','Awamu','grouped by area and route','inapangwa kwa eneo na njia'],['Ride','Kusafirisha','electric motorbike, tracked','pikipiki ya umeme, inafuatiliwa'],['Prove','Kuthibitisha','a 4-digit code at the door','namba ya tarakimu 4 mlangoni']];
function flowSVG(cols){const rows=Math.ceil(STEPS.length/cols),cw=cols===6?180:160,ch=96,gx=cols===6?8:12,gy=26,W=cols*cw+(cols-1)*gx,H=rows*ch+(rows-1)*gy;let g='';
 STEPS.forEach((s,i)=>{const c=i%cols,r=Math.floor(i/cols),x=c*(cw+gx),y=r*(ch+gy);
  g+=`<rect x="${x+.5}" y="${y+.5}" width="${cw-1}" height="${ch-1}" style="fill:var(--bg);stroke:var(--line)"/>`+
   `<text x="${x+14}" y="${y+30}" font-size="20" font-weight="600" style="fill:var(--gold)">${i+1}</text>`+
   `<text x="${x+14}" y="${y+56}" font-size="15" font-weight="600" style="fill:var(--ink)">${E(T(s[0],s[1]))}</text>`+
   wrap(T(s[2],s[3]),cw===180?24:21).map((ln,j)=>`<text x="${x+14}" y="${y+76+j*14}" font-size="11.5" style="fill:var(--mute)">${E(ln)}</text>`).join('');
  if(i<STEPS.length-1){if(c<cols-1)g+=`<path d="M${x+cw+1} ${y+ch/2}h${gx-2}" style="stroke:var(--green-edge)" stroke-width="1.5"/>`;else g+=`<path d="M${x+cw/2} ${y+ch+2}v${gy-4}" style="stroke:var(--green-edge)" stroke-width="1.5"/>`}});
 return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${E(T('Six steps from the shelf to the doorstep: pick, pack, check and seal, wave, ride, prove','Hatua sita kutoka rafuni hadi mlangoni: kuchukua, kufungasha, kukagua na kufunga, awamu, kusafirisha, kuthibitisha'))}">${g}</svg>`}
function wrap(t,n){const w=String(t).split(' '),out=[];let l='';w.forEach(x=>{if((l+' '+x).trim().length>n&&l){out.push(l);l=x}else l=(l+' '+x).trim()});if(l)out.push(l);return out.slice(0,2)}

/* ---------- chart: what the customer pays for a delivery against what it costs (drawn at container width) ---------- */
function barsSVG(W,o){const ph=W<520,lw=ph?Math.min(150,W*.45):250,pr=ph?56:80,rh=ph?40:34,pt=8,H=pt+o.rows.length*rh+22,mx=Math.max(...o.rows.map(r=>r.v))*1.08,x=v=>lw+(W-lw-pr)*v/mx;let g='';
 o.rows.forEach((r,i)=>{const y=pt+i*rh,bh=ph?14:16;
  wrap(r.l,ph?22:40).forEach((ln,j)=>{g+=`<text x="0" y="${y+12+j*13}" font-size="${ph?11:12}" style="fill:var(--mute)">${E(ln)}</text>`});
  g+=`<rect x="${lw}" y="${y+2}" width="${Math.max(1,x(r.v)-lw).toFixed(1)}" height="${bh}" style="fill:var(${r.c})"/><text x="${(x(r.v)+6).toFixed(1)}" y="${y+14}" font-size="12" style="fill:var(--gold)">${E(tsh(r.v))}</text>`});
 g+=`<line x1="${lw}" x2="${lw}" y1="${pt-4}" y2="${H-18}" style="stroke:var(--line)" stroke-width="1"/>`;
 return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${E(o.aria)}">${g}</svg>`}
let chartRows=null;
function drawChart(){const el=document.getElementById('s43Bars');if(!el||!chartRows)return;const W=Math.floor(el.clientWidth);if(W<120)return;el.innerHTML=barsSVG(W,chartRows)}

/* ---------- render ---------- */
function render(s,p,pv,nx){const P=D4().PACKING,DL=D4().DELIVERY,Es=['S','M','L'].map(eng),Bg=BAGS.map(bag),d=del(),lean=d.lean;
 const sizeOf=k=>{const b=DATA().boxes[k];return b&&b.box_size||null};
 const bySize=z=>LINEUP.filter(x=>sizeOf(x[0])===z).map(x=>x[1]);
 const byRhythm=r=>LINEUP.filter(x=>{const b=DATA().boxes[x[0]];return b&&b.delivery===r}).map(x=>x[1]);
 chartRows={aria:T('Delivery: what the customer pays against the cost of one delivery at month 12','Usafirishaji: anacholipa mteja dhidi ya gharama ya safari moja mwezi 12'),
  rows:[{l:T('Delivery line inside every box price','Kiasi cha usafirishaji ndani ya bei ya kila boksi'),v:DL,c:'--green'},{l:T('Delivery fee on an online order','Ada ya usafirishaji ya oda ya mtandaoni'),v:d.fee,c:'--green'},{l:T('Cost of one delivery at month 12, this option','Gharama ya safari moja mwezi 12, chaguo hili'),v:d.perDrop,c:'--gold'}]};
 const films=LINEUP.map(x=>{const pr=fromPrice(x[0]);const price=pr?T(`From ${tsh(pr.min)} ${pr.per[0]} on the 1-month plan, packing and delivery included`,`Kuanzia ${tsh(pr.min)} ${pr.per[1]} kwa mpango wa mwezi 1, ufungashaji na usafirishaji ukiwemo`):T('Price published when the box is final','Bei itachapishwa boksi likikamilika');
  return `<div class="s43-film"><div class="s43-frame" role="img" aria-label="${E(T(`${x[1]} packing film: in production`,`Filamu ya ufungashaji ya ${x[1]}: inatayarishwa`))}"><div><svg viewBox="0 0 28 20" aria-hidden="true"><rect x=".5" y=".5" width="27" height="19" rx="2" fill="none" style="stroke:var(--mute)"/><path d="M11 6.5v7l6-3.5z" fill="none" style="stroke:var(--mute)"/></svg>${E(T('Film in production','Filamu inatayarishwa'))}</div></div><b>${E(x[1])}</b><span>${E(T(x[2],x[3]))}</span><span class="s43-p">${E(price)}</span></div>`}).join('');
 const bagRows=Bg.map(b=>`<tr><td>${E(T(b.en,b.sw))}</td><td>${E(b.d)}</td><td class="ab-n">${usd(b.fob)}</td><td class="ab-n">${tsh(b.land)}</td><td class="ab-n ab-gold">${tsh(b.gross)} ${est()}</td></tr>`).join('');
 const row=(l,f,cls)=>`<tr${cls?` class="${cls}"`:''}><td>${l}</td>${Es.map(e=>`<td class="ab-n">${f(e)}</td>`).join('')}</tr>`;
 const m=Es[1];

 return `${CSS}<article class="ab-sec" aria-labelledby="h-s4-3"><div class="ab-wrap">
 <div class="ab-sec-no">${E(s.no)}</div><h1 id="h-s4-3">${E(s.title)}</h1>
 <p class="ab-summary">${E(T('Every Afya Box is picked from the member’s locked list, packed by gloved hands, checked, sealed and delivered in planned waves by electric motorbike. The customer pays for all of it inside the box price: the D4 rule includes the landed cost of the box size (S, M or L) and a TSh 3,500 delivery line, so packing and delivery are never a hidden subsidy. This section shows how the box is built and costed, how deliveries are run and paid for in the funding option selected, and the films still to be made.','Kila Afya Box linachukuliwa kutoka orodha iliyofungwa ya mwanachama, linafungashwa kwa mikono yenye glavu, linakaguliwa, linafungwa na kufikishwa kwa awamu zilizopangwa kwa pikipiki ya umeme. Mteja analipia vyote ndani ya bei ya boksi: kanuni ya D4 inajumuisha gharama halisi ya ukubwa wa boksi (S, M au L) na TSh 3,500 za usafirishaji, kwa hiyo ufungashaji na usafirishaji si ruzuku iliyofichwa. Sehemu hii inaonyesha jinsi boksi linavyotengenezwa na kuwekewa gharama, jinsi usafirishaji unavyoendeshwa na kulipiwa katika chaguo la mtaji lililochaguliwa, na filamu ambazo bado zinatayarishwa.'))}</p>

 <figure class="ab-visual s43-flow"><div class="s43-dt">${flowSVG(6)}</div><div class="s43-ph">${flowSVG(2)}</div>
  <figcaption class="ab-mute s43-cap">${E(T('From shelf to doorstep: the same six steps for every Afya Box. Steps and timings from the store’s operating plan.','Kutoka rafuni hadi mlangoni: hatua sita zilezile kwa kila Afya Box. Hatua na muda kutoka mpango wa uendeshaji wa duka.'))}</figcaption></figure>

 <div class="ab-body">
 <section class="ab-block"><h2>${E(T('From shelf to doorstep in six steps','Kutoka rafuni hadi mlangoni kwa hatua sita'))}</h2>
  <p>${E(T('Packing and delivery are one system. The same rules apply to a member’s Afya Box, a bag filled at the till and an online order going out on a motorbike. Each step leaves a record in the store system, so every box can be traced from the shelf it was picked from to the door where it was handed over.','Ufungashaji na usafirishaji ni mfumo mmoja. Kanuni zilezile zinatumika kwa Afya Box ya mwanachama, mfuko unaojazwa dukani na oda ya mtandaoni inayotoka kwa pikipiki. Kila hatua inaacha kumbukumbu katika mfumo wa duka, kwa hiyo kila boksi linaweza kufuatiliwa kutoka rafu lilipochukuliwa hadi mlango lilipokabidhiwa.'))}</p>
  <ul class="s43-ul">
   <li>${T('<b>Pick.</b> The system prints each box’s pick list in shelf order. Every item is scanned against the list, so a wrong brand or a missing item is caught before packing. Batches that expire first are picked first.','<b>Kuchukua.</b> Mfumo unachapisha orodha ya kila boksi kwa mpangilio wa rafu. Kila kitu kinachanganuliwa dhidi ya orodha, kwa hiyo chapa isiyo sahihi au kitu kilichokosekana kinagunduliwa kabla ya kufungasha. Bidhaa zinazoisha muda mapema zaidi zinachukuliwa kwanza.')}</li>
   <li>${T('<b>Pack.</b> The packer wears gloves. Each package has a fixed layout inside the box, so every item has its place and the box is packed the same way every time. Daily items sit at the front, monthly stock at the back.','<b>Kufungasha.</b> Mfungashaji anavaa glavu. Kila kifurushi kina mpangilio maalum ndani ya boksi, kwa hiyo kila kitu kina mahali pake na boksi linafungashwa kwa njia ileile kila mara. Vitu vya kila siku vinakaa mbele, akiba ya mwezi nyuma.')}</li>
   <li>${T('<b>Check and seal.</b> The open box is photographed against the list, then closed with tissue and a seal. The photograph is kept with the order, so a member’s question about a missing item can be answered the same day.','<b>Kukagua na kufunga.</b> Boksi likiwa wazi linapigwa picha dhidi ya orodha, kisha linafungwa kwa karatasi laini na muhuri. Picha inahifadhiwa pamoja na oda, kwa hiyo swali la mwanachama kuhusu kitu kilichokosekana linajibiwa siku hiyohiyo.')}</li>
   <li>${T('<b>Wave.</b> At 10:00, 13:00 and 16:30 the open orders are grouped by area and given to the riders in route order. Online orders placed before 15:00 go out the same day.','<b>Awamu.</b> Saa 4:00 asubuhi, 7:00 mchana na 10:30 jioni oda zilizo wazi zinapangwa kwa eneo na kukabidhiwa wasafirishaji kwa mpangilio wa njia. Oda za mtandaoni zilizowekwa kabla ya saa 9:00 alasiri zinatoka siku hiyohiyo.')}</li>
   <li>${T('<b>Ride.</b> Riders follow the route in the rider app; the member receives an SMS link to follow the rider. Riders see only the area, a masked phone number and the delivery code, never a health reading or what is inside the box.','<b>Kusafirisha.</b> Wasafirishaji wanafuata njia kwenye programu ya msafirishaji; mwanachama anapokea kiungo cha SMS cha kumfuatilia msafirishaji. Wasafirishaji wanaona eneo tu, namba ya simu iliyofichwa na namba ya kukabidhi, kamwe si kipimo cha afya wala kilichomo ndani ya boksi.')}</li>
   <li>${T('<b>Prove.</b> A 4-digit code, or a photograph at the door, proves the hand-over. If the member is not home, the rider calls twice and waits five minutes; the box then returns to the store and is booked on the next wave.','<b>Kuthibitisha.</b> Namba ya tarakimu 4, au picha mlangoni, inathibitisha makabidhiano. Mwanachama akiwa hayupo nyumbani, msafirishaji anapiga simu mara mbili na kusubiri dakika tano; kisha boksi linarudi dukani na kupangwa kwenye awamu inayofuata.')}</li>
  </ul>
  <p>${E(T('Medicines are never packed by Afya. A member’s prescribed medicine is sold and packed by the licensed partner pharmacy, in its own sealed bag with its label. Where the law allows, the sealed bag travels with the box and is handed over with the same code (section 4.5); otherwise the member collects it from the pharmacy.','Dawa hazifungashwi kamwe na Afya. Dawa aliyoandikiwa mwanachama inauzwa na kufungashwa na famasia mshirika yenye leseni, katika mfuko wake uliofungwa wenye lebo yake. Pale sheria inaporuhusu, mfuko huo uliofungwa unasafiri pamoja na boksi na kukabidhiwa kwa namba ileile (sehemu 4.5); vinginevyo mwanachama anauchukua kutoka famasia.'))}</p>
 </section>

 <section class="ab-block"><h2>${E(T('One box design, three sizes','Muundo mmoja wa boksi, ukubwa tatu'))}</h2>
  <p>${E(T('Every Afya Box keeps the same deep green design: the Afya Basics wordmark and emblem in gold on the lid, the package name in gold on the side, and the motto “Afya yako, nyumbani kwako” on the front. Only the gold side label and a small package-colour sticker change from one package to the next. Designing a different box for every package would multiply print runs, minimum orders and stock; instead one design comes in three sizes.','Kila Afya Box lina muundo uleule wa kijani kizito: jina la Afya Basics na nembo kwa dhahabu kwenye mfuniko, jina la kifurushi kwa dhahabu ubavuni, na kauli mbiu “Afya yako, nyumbani kwako” mbele. Ni lebo ya dhahabu ya ubavuni na kibandiko kidogo cha rangi ya kifurushi tu vinavyobadilika kati ya kifurushi kimoja na kingine. Kutengeneza boksi tofauti kwa kila kifurushi kungeongeza uchapishaji, oda za chini na stoku; badala yake muundo mmoja unakuja kwa ukubwa tatu.'))}</p>
  <div class="s43-two">
   <figure><img src="assets/boxes/mama-na-mtoto-closed.webp" width="1376" height="768" loading="lazy" alt="${E(T('The Afya Box for Mama na Mtoto: a deep green box with the lid lifted, gold lettering on the side','Afya Box ya Mama na Mtoto: boksi la kijani kizito lenye mfuniko ulioinuliwa, maandishi ya dhahabu ubavuni'))}"><figcaption class="ab-mute s43-cap">${E(T('The locked box design. The same box carries every package; only the side label and sticker change.','Muundo wa boksi uliothibitishwa. Boksi hilohilo linabeba kila kifurushi; ni lebo ya ubavuni na kibandiko tu vinavyobadilika.'))}</figcaption></figure>
   <div class="ab-tw" style="margin-top:0"><table class="ab-t s43-t"><thead><tr><th>${E(T('Size','Ukubwa'))}</th><th>${E(T('Inside, cm','Ndani, sm'))}</th><th>${E(T('Packages that use it','Vifurushi vinavyoutumia'))}</th><th class="ab-n">${E(T('Packing line in the price','Kiasi cha ufungashaji ndani ya bei'))}</th></tr></thead><tbody>
    ${['S','M','L'].map(z=>`<tr><td><b>${z}</b></td><td>${BX[z].L} × ${BX[z].W} × ${BX[z].H}</td><td>${E(bySize(z).join(', ')||'—')}</td><td class="ab-n ab-gold">${tsh(P[z])}</td></tr>`).join('')}
   </tbody></table></div>
  </div>
  <p style="margin-top:var(--s3)">${E(T('How a size is chosen: the packer measures the packed contents of each package once, and the smallest box that holds them with about 1 cm to spare on each side is used, because empty space lets items move and wastes freight. Medium and large offices receive more than one L carton.','Ukubwa unachaguliwa hivi: mfungashaji anapima vitu vilivyofungashwa vya kila kifurushi mara moja, na boksi dogo kabisa linalovitosha kwa nafasi ya takriban sm 1 kila upande linatumika, kwa sababu nafasi tupu inaruhusu vitu kusogea na inapoteza gharama ya usafiri. Ofisi za kati na kubwa zinapokea zaidi ya katoni moja ya L.'))}</p>
 </section>

 <section class="ab-block"><h2>${E(T('The QR guide, and the box kept on a shelf','Mwongozo wa QR, na boksi linalotunzwa rafuni'))}</h2>
  <p>${E(T('Inside the lid of every box is a QR code. Scanned with any phone camera, it opens that box’s own page in Kiswahili or English. The code holds only a short box number, never a name or a health reading; the member’s own schedule and refill date appear only after a one-time SMS code. One code per box also lets the store trace exactly which batch went into which box.','Ndani ya mfuniko wa kila boksi kuna msimbo wa QR. Ukichanganuliwa kwa kamera ya simu yoyote, unafungua ukurasa wa boksi hilo kwa Kiswahili au Kiingereza. Msimbo una namba fupi ya boksi tu, kamwe si jina wala kipimo cha afya; ratiba ya mwanachama na tarehe ya kujaza tena vinaonekana tu baada ya namba ya SMS ya mara moja. Msimbo mmoja kwa kila boksi pia unaruhusu duka kujua hasa ni kundi gani la bidhaa liliingia kwenye boksi gani.'))}</p>
  <ul class="s43-ul">
   <li>${T('<b>What is inside:</b> every item, what it is for and its pack size.','<b>Kilichomo:</b> kila kitu, kinatumika kwa nini na ukubwa wa pakiti yake.')}</li>
   <li>${T('<b>How to use it:</b> a short guide for each item, for example a thermometer or a blood-pressure monitor.','<b>Jinsi ya kukitumia:</b> mwongozo mfupi kwa kila kitu, kwa mfano kipimajoto au kipimo cha shinikizo la damu.')}</li>
   <li>${T('<b>My month:</b> reminders by SMS or WhatsApp, and the days to take a check in store.','<b>Mwezi wangu:</b> vikumbusho kwa SMS au WhatsApp, na siku za kupima dukani.')}</li>
   <li>${T('<b>Refill and change:</b> the next delivery date, with one tap to change a brand or skip, until choices lock 12 days before month end.','<b>Kujaza na kubadilisha:</b> tarehe ya boksi linalofuata, kwa kubonyeza mara moja kubadilisha chapa au kuruka, hadi chaguo zifungwe siku 12 kabla ya mwisho wa mwezi.')}</li>
   <li>${T('<b>Questions about medicines</b> go to the licensed partner pharmacy, whose pharmacist answers them. Afya staff do not give medicine advice.','<b>Maswali kuhusu dawa</b> yanaelekezwa kwa famasia mshirika yenye leseni, ambayo mfamasia wake anayajibu. Wafanyakazi wa Afya hawatoi ushauri wa dawa.')}</li>
   <li>${T('<b>Keep the box:</b> three pictures show how to stand the empty box on its end and use it as a shelf, with the QR code still in view. A member can instead hand last month’s box back to the rider; a returned box that passes inspection is used again.','<b>Tunza boksi:</b> picha tatu zinaonyesha jinsi ya kusimamisha boksi tupu na kulitumia kama rafu, msimbo wa QR ukiendelea kuonekana. Badala yake mwanachama anaweza kumrudishia msafirishaji boksi la mwezi uliopita; boksi lililorudishwa likipita ukaguzi linatumika tena.')}</li>
  </ul>
  <p>${E(T('Most delivery boxes are thrown away within minutes. This one is meant to be kept: every time the family reaches for a plaster or a toothbrush, it sees the Afya Basics name and the date of the next refill.','Maboksi mengi ya usafirishaji yanatupwa ndani ya dakika chache. Hili limekusudiwa kutunzwa: kila mara familia inapochukua plasta au mswaki, inaona jina la Afya Basics na tarehe ya kujaza tena.'))}</p>
 </section>

 <section class="ab-block"><h2>${E(T('What the box costs, and who pays','Boksi linagharimu kiasi gani, na nani analipa'))}</h2>
  <p>${E(T(`The packing line in each box price equals the landed cost of the box size it uses, rounded up to the next TSh 500. The build-up below uses supplier listing prices for a printed box with an insert, guide card, tissue and seal, sea freight for flat-packed boxes, and the duties and levies at the port, converted at US$1 = TSh ${n1(FX,2)} (Bank of Tanzania mean rate, 10 Nov 2026). The box itself is the largest part; freight is small because the boxes travel flat.`,`Kiasi cha ufungashaji katika bei ya kila boksi ni sawa na gharama halisi ya ukubwa wa boksi linalotumika, ikizungushwa juu hadi TSh 500 inayofuata. Hesabu hapa chini inatumia bei za matangazo ya wasambazaji kwa boksi lililochapishwa lenye kishikio, kadi ya mwongozo, karatasi laini na muhuri, usafiri wa baharini kwa maboksi bapa, na ushuru na tozo za bandarini, kwa kiwango cha US$1 = TSh ${n1(FX,2)} (kiwango cha wastani cha Benki Kuu ya Tanzania, 10 Nov 2026). Boksi lenyewe ndilo sehemu kubwa; usafiri ni mdogo kwa sababu maboksi yanasafiri yakiwa bapa.`))}</p>
  <div class="ab-tw"><table class="ab-t s43-t"><thead><tr><th>${E(T('Line (US$ unless shown)','Kipengele (US$ isipokuwa imeonyeshwa)'))}</th><th class="ab-n">S</th><th class="ab-n">M</th><th class="ab-n">L</th></tr></thead><tbody>
   ${row(T('Printed box, FOB (listings US$0.10–0.95)','Boksi lililochapishwa, FOB (matangazo US$0.10–0.95)'),e=>usd(e.b.box))}
   ${row(`${E(T('Insert, FOB','Kishikio, FOB'))} ${est()}`,e=>usd(e.b.ins))}
   ${row(E(T('Guide card, tissue and seal, FOB','Kadi ya mwongozo, karatasi laini na muhuri, FOB')),()=>usd(EXTRA.card+EXTRA.tissue+EXTRA.seal))}
   ${row(E(T('Sea freight, flat-packed (US$111 per m³)','Usafiri wa baharini, bapa (US$111 kwa m³)')),e=>usd(e.frU,3))}
   ${row(E(T('Insurance 0.5%','Bima 0.5%')),e=>usd(e.cif-e.fob-e.frU,3))}
   ${row(`${E(T('Import duty 25% of CIF','Ushuru wa forodha 25% ya CIF'))} ${est()}`,e=>usd(e.duty,3))}
   ${row(E(T('Railway levy 2% of CIF and processing fee 1% of FOB','Tozo ya reli 2% ya CIF na ada ya forodha 1% ya FOB')),e=>usd(e.lev,3))}
   ${row(`<b>${E(T('Landed in Dar es Salaam','Imefika Dar es Salaam'))}</b>`,e=>`<b>${tsh(e.landTS)}</b>`)}
   ${row(`${E(T('Member label with box code and QR, printed in Dar es Salaam','Lebo ya mwanachama yenye namba ya boksi na QR, inachapishwa Dar es Salaam'))} ${est()}`,()=>tsh(LOCAL))}
   ${row(`<b>${E(T('Packaging cost per box','Gharama ya ufungashaji kwa boksi'))}</b>`,e=>`<b>${tsh(e.total)}</b>`)}
   ${row(`<b>${E(T('Packing line in the box price (D4)','Kiasi cha ufungashaji ndani ya bei ya boksi (D4)'))}</b>`,e=>`<b class="ab-gold">${tsh(e.line)}</b>`)}
  </tbody></table></div>
  <p class="ab-mute s43-cap">${E(T('Listing prices, not quotes; every line is an estimate until a manufacturer quotes the final box. Each package pays for its own box size: no package carries the cost of another.','Bei za matangazo, si nukuu; kila mstari ni makadirio hadi mtengenezaji atoe nukuu ya boksi la mwisho. Kila kifurushi kinalipia ukubwa wa boksi lake: hakuna kifurushi kinachobeba gharama ya kingine.'))}</p>
  <h3>${E(T('Worked example: the M box','Mfano wa hesabu: boksi M'))}</h3>
  <p>${E(T(`Factory goods (box, insert, card, tissue, seal) ${usd(m.fob)}; with freight and insurance ${usd(m.cif)}; with duty and levies ${usd(m.landUS)}; at TSh ${n1(FX,2)} per dollar ${tsh(m.landTS)}; with the member label ${tsh(m.total)}. Rounded up to the next TSh 500, that is ${tsh(m.up)}, the M packing line inside every M box price.`,`Bidhaa za kiwandani (boksi, kishikio, kadi, karatasi laini, muhuri) ${usd(m.fob)}; pamoja na usafiri na bima ${usd(m.cif)}; pamoja na ushuru na tozo ${usd(m.landUS)}; kwa TSh ${n1(FX,2)} kwa dola ${tsh(m.landTS)}; pamoja na lebo ya mwanachama ${tsh(m.total)}. Ikizungushwa juu hadi TSh 500 inayofuata, ni ${tsh(m.up)}, kiasi cha ufungashaji cha M ndani ya bei ya kila boksi M.`))}</p>
 </section>

 <section class="ab-block"><h2>${E(T('Strong enough for a humid store room','Imara kwa chumba cha stoo chenye unyevu'))}</h2>
  <p>${E(T('Dar es Salaam is humid, and packed boxes wait in the store before they go out. The specification is a printed corrugated board of about 1.5 mm (E-flute), which takes sharp print and carries a 1–5 kg package. The McKee formula predicts how much weight a box carries before it buckles; a safety multiplier then cuts that for humidity, storage time and stacking. The result sets how high each size may be stacked.','Dar es Salaam ina unyevu, na maboksi yaliyofungashwa yanasubiri dukani kabla ya kutoka. Kipimo ni ubao wa karatasi ngumu uliochapishwa wa takriban mm 1.5 (E-flute), unaochapika vizuri na kubeba kifurushi cha kg 1–5. Fomula ya McKee inakadiria uzito ambao boksi linabeba kabla halijabonyea; kisha kizidishi cha usalama kinapunguza hilo kwa unyevu, muda wa kuhifadhi na upangaji. Matokeo yanaweka urefu ambao kila ukubwa unaweza kupangwa.'))}</p>
  <div class="ab-tw"><table class="ab-t s43-t"><thead><tr><th>${E(T('Step','Hatua'))}</th><th>${E(T('Formula','Fomula'))}</th><th class="ab-n">S</th><th class="ab-n">M</th><th class="ab-n">L</th></tr></thead><tbody>
   <tr><td>${E(T('Flat sheet','Karatasi bapa'))}</td><td>${E(T('(L + 4H + 2) × (2W + 4H + 2) cm','(L + 4H + 2) × (2W + 4H + 2) sm'))}</td>${Es.map(e=>`<td class="ab-n">${e.bl} × ${e.bw}</td>`).join('')}</tr>
   <tr><td>${E(T('Board area','Eneo la ubao'))}</td><td>${E(T('length × width','urefu × upana'))}</td>${Es.map(e=>`<td class="ab-n">${n1(e.area,2)} m²</td>`).join('')}</tr>
   <tr><td>${E(T('Crush strength','Nguvu ya kubana'))}</td><td>5.87 × ECT 32 × √(${E(T('caliper','unene'))} × ${E(T('perimeter','mzingo'))})</td>${Es.map(e=>`<td class="ab-n">${Math.round(e.bctKg)} kg</td>`).join('')}</tr>
   <tr><td>${E(T('Safety multiplier','Kizidishi cha usalama'))}</td><td>${E(T('1 ÷ (0.5 storage × 0.68 humidity × 0.5 stacking)','1 ÷ (0.5 hifadhi × 0.68 unyevu × 0.5 upangaji)'))}</td>${Es.map(e=>`<td class="ab-n">${n1(e.mult,2)}×</td>`).join('')}</tr>
   <tr><td>${E(T('Typical filled weight','Uzito wa kawaida likijaa'))} ${est()}</td><td>—</td>${Es.map(e=>`<td class="ab-n">${n1(e.b.kg,1)} kg</td>`).join('')}</tr>
   <tr><td>${E(T('Calculated safe stack','Urefu salama uliohesabiwa'))}</td><td>${E(T('strength ÷ (weight × multiplier) + 1','nguvu ÷ (uzito × kizidishi) + 1'))}</td>${Es.map(e=>`<td class="ab-n">${e.maxH} ${E(T('boxes','maboksi'))}</td>`).join('')}</tr>
   <tr><td><b>${E(T('Store rule','Kanuni ya duka'))}</b></td><td>${E(T('set below the calculated limit','iko chini ya kikomo kilichohesabiwa'))}</td><td class="ab-n"><b>10</b></td><td class="ab-n"><b>6</b></td><td class="ab-n"><b>4</b></td></tr>
  </tbody></table></div>
  <p class="ab-mute s43-cap">${E(T('Planning sizes and board grade; the manufacturer’s cutter drawing and a compression test on the final box replace them.','Vipimo na daraja la ubao ni vya mipango; mchoro wa kukata wa mtengenezaji na kipimo cha kubana cha boksi la mwisho vitavichukua nafasi.'))}</p>
  <div class="s43-two">
   <figure><img src="img/e3/dieline-photo.webp" width="2400" height="1350" loading="lazy" alt="${E(T('A flat, die-cut green box blank lying on a cutting mat, before folding','Karatasi ya boksi la kijani iliyokatwa ikiwa bapa juu ya mkeka wa kukatia, kabla ya kukunjwa'))}"><figcaption class="ab-mute s43-cap">${E(T('The flat blank as it comes off the cutter: base, walls, lid and flaps, folded without glue.','Karatasi bapa kama inavyotoka kwenye mashine ya kukata: sakafu, kuta, mfuniko na mabawa, inakunjwa bila gundi.'))}</figcaption></figure>
   <figure><img src="img/e3/sizes.webp" width="2400" height="1350" loading="lazy" alt="${E(T('Three green boxes side by side in sizes S, M and L, with their measurements','Maboksi matatu ya kijani kando kwa kando kwa ukubwa S, M na L, pamoja na vipimo vyake'))}"><figcaption class="ab-mute s43-cap">${E(T('S, M and L to scale. One print design, three cutters.','S, M na L kwa uwiano halisi. Muundo mmoja wa kuchapisha, mashine tatu za kukata.'))}</figcaption></figure>
  </div>
 </section>

 <section class="ab-block"><h2>${E(T('Package films: in production','Filamu za vifurushi: zinatayarishwa'))}</h2>
  <p>${E(T('Each package will have a short film in Kiswahili and English, with captions in both languages: gloved hands packing the box, and the empty box kept on a shelf through its QR guide. The earlier films no longer match the approved box design or the approved price rule, so they have been withdrawn. New films are being made on the locked design. Until then, each package shows its member price from the D4 engine where the box is final.','Kila kifurushi kitakuwa na filamu fupi kwa Kiswahili na Kiingereza, yenye maandishi kwa lugha zote mbili: mikono yenye glavu ikifungasha boksi, na boksi tupu likitunzwa rafuni kupitia mwongozo wake wa QR. Filamu za awali haziendani tena na muundo wa boksi ulioidhinishwa wala kanuni ya bei iliyoidhinishwa, kwa hiyo zimeondolewa. Filamu mpya zinatengenezwa kwa muundo uliothibitishwa. Hadi hapo, kila kifurushi kinaonyesha bei yake ya mwanachama kutoka kwa injini ya D4 pale boksi limekamilika.'))}</p>
  <div class="s43-films">${films}</div>
  <p class="ab-mute s43-cap">${E(T('Prices: the lowest stage of each box on the 1-month plan, Regular tier, with the default brands; the full table for each stage and plan is in section 3.5. No film plays automatically.','Bei: hatua ya chini kabisa ya kila boksi kwa mpango wa mwezi 1, ngazi ya Kawaida, kwa chapa za kawaida; jedwali kamili la kila hatua na mpango liko katika sehemu ya 3.5. Hakuna filamu inayojicheza yenyewe.'))}</p>
 </section>

 <section class="ab-block"><h2>${E(T('How often each box is delivered','Kila boksi linafikishwa mara ngapi'))}</h2>
  <p>${E(T('A delivery costs the same whatever is inside, so a small box delivered every month would spend too much of its price on the ride. Boxes whose goods last are therefore delivered less often, carrying more months of goods each time; the member pays the same per month.','Safari moja inagharimu sawa bila kujali kilichomo, kwa hiyo boksi dogo linalofikishwa kila mwezi lingetumia sehemu kubwa mno ya bei yake kwenye safari. Kwa hiyo maboksi ambayo bidhaa zake zinadumu yanafikishwa mara chache zaidi, yakibeba bidhaa za miezi zaidi kila mara; mwanachama analipa kiasi kilekile kwa mwezi.'))}</p>
  <div class="ab-tw"><table class="ab-t"><thead><tr><th>${E(T('Delivery rhythm','Mzunguko wa kufikisha'))}</th><th>${E(T('Boxes','Maboksi'))}</th></tr></thead><tbody>
   ${Object.keys(RHYTHM).map(k=>{const l=byRhythm(k);return l.length?`<tr><td>${E(T(...RHYTHM[k]))}</td><td>${E(l.join(', '))}</td></tr>`:''}).join('')}
  </tbody></table></div>
  <p style="margin-top:var(--s2)">${E(T('Afya Siku rides inside the household’s other Afya box, timed before the next period, or is collected in store: delivered on its own it would cost more to deliver than it earns. Small offices on the 12-month plan receive two months of goods in one box every two months.','Afya Siku inasafiri ndani ya Afya Box nyingine ya kaya, ikipangwa kabla ya hedhi inayofuata, au inachukuliwa dukani: ikifikishwa peke yake ingegharimu zaidi kuifikisha kuliko inavyoingiza. Ofisi ndogo kwenye mpango wa miezi 12 zinapokea boksi lenye bidhaa za miezi miwili kila miezi miwili.'))}</p>
 </section>

 <section class="ab-block"><h2>${E(T('Who delivers, and what a delivery costs','Nani anafikisha, na safari moja inagharimu kiasi gani'))}</h2>
  ${lean?`<p>${T(`In the start-small option, deliveries are made by partner riders paid per order, about ${N('d-po',d.perOrder,'tsh')} a delivery. Afya owns no motorbikes at first; its own electric riders are added later from the store’s own cash, once monthly profit is steady. The cost of each delivery is therefore fixed from the first order.`,`Katika chaguo la kuanza kidogo, usafirishaji unafanywa na wasafirishaji washirika wanaolipwa kwa kila oda, takriban ${N('d-po',d.perOrder,'tsh')} kwa safari. Mwanzoni Afya haina pikipiki zake; wasafirishaji wake wa umeme wanaongezwa baadaye kwa fedha za duka lenyewe, faida ya kila mwezi ikishakuwa thabiti. Kwa hiyo gharama ya kila safari ni ya kudumu tangu oda ya kwanza.`)}</p>`
  :`<p>${T(`In the flagship option, ${N('d-nr',d.nR,'int')} salaried riders deliver on two electric motorbikes bought from the seed (${N('d-bk',d.bikes,'tsh')}). Each rider is paid ${N('d-pay',d.pay,'tsh')} a month before leave cover and employer on-costs, and each delivery adds about ${N('d-po',d.perOrder,'tsh')} for charging, tyres and maintenance ${est()}. Electric motorbikes run on a battery-swap network that launched in Tanzania in 2025 and covers about 100–120 km a charge, which is more than one rider’s day of three waves.`,`Katika chaguo la duka kuu, wasafirishaji ${N('d-nr',d.nR,'int')} wa mshahara wanafikisha kwa pikipiki mbili za umeme zilizonunuliwa kwa mtaji wa awali (${N('d-bk',d.bikes,'tsh')}). Kila msafirishaji analipwa ${N('d-pay',d.pay,'tsh')} kwa mwezi kabla ya likizo na michango ya mwajiri, na kila safari inaongeza takriban ${N('d-po',d.perOrder,'tsh')} kwa kuchaji, matairi na matengenezo ${est()}. Pikipiki za umeme zinatumia mtandao wa kubadilisha betri ulioanza Tanzania mwaka 2025 na unaofika takriban km 100–120 kwa chaji moja, zaidi ya siku moja ya msafirishaji yenye awamu tatu.`)}</p>`}
  <p>${T(`At month 12 the base case has ${N('d-mem',d.mem,'int')} members. Counting one box per member a month over ${WORKDAYS} delivery days, that is about ${N('d-bd',d.boxDay,'int')} boxes a day, plus ${N('d-on',d.onl,'int')} online orders: about ${N('d-dr',d.drops,'int')} deliveries a day ${est()}. Each delivery then costs about ${N('d-pd',d.perDrop,'tsh')}, against the ${tsh(D4().DELIVERY)} inside every box price and the ${N('d-fee',d.fee,'tsh')} fee on an online order. ${lean?'The per-order rate keeps the cost of a delivery the same in every month.':'Early months have fewer deliveries, so each one costs more; the cost per delivery falls as the routes fill.'}`,`Mwezi 12 hali ya msingi ina wanachama ${N('d-mem',d.mem,'int')}. Ukihesabu boksi moja kwa kila mwanachama kwa mwezi katika siku ${WORKDAYS} za kufikisha, ni takriban maboksi ${N('d-bd',d.boxDay,'int')} kwa siku, pamoja na oda ${N('d-on',d.onl,'int')} za mtandaoni: takriban safari ${N('d-dr',d.drops,'int')} kwa siku ${est()}. Kila safari basi inagharimu takriban ${N('d-pd',d.perDrop,'tsh')}, dhidi ya ${tsh(D4().DELIVERY)} zilizo ndani ya bei ya kila boksi na ada ya ${N('d-fee',d.fee,'tsh')} kwa oda ya mtandaoni. ${lean?'Kiwango cha kila oda kinaweka gharama ya safari moja sawa kila mwezi.':'Miezi ya mwanzo ina safari chache, kwa hiyo kila moja inagharimu zaidi; gharama kwa kila safari inashuka kadiri njia zinavyojaa.'}`)}</p>
  <div class="s43-chart"><div id="s43Bars"></div></div>
  <p class="ab-mute s43-cap">${E(T('Delivery line: brief D4. Online fee and rider costs: financial model v1.2, option selected, month 12 of the base case. Planning estimates.','Kiasi cha usafirishaji: D4. Ada ya mtandaoni na gharama za wasafirishaji: modeli ya fedha v1.2, chaguo lililochaguliwa, mwezi 12 wa hali ya msingi. Makadirio ya mipango.'))}</p>
 </section>

 <section class="ab-block"><h2>${E(T('Bags at the till: paper only, and never free','Mifuko dukani: karatasi pekee, na kamwe si bure'))}</h2>
  <p>${E(T('Tanzania bans plastic carrier bags; paper, woven and plastic-free bags are allowed, and medical packaging is exempt. Every bag Afya uses is paper or cotton, and every bag is a priced line on the receipt. The price is the landed cost plus 15% for breakage and print waste, plus 18% VAT, rounded up to the next TSh 100. The till asks “Bag?” on every sale; a customer who brings their own bag pays nothing.','Tanzania imepiga marufuku mifuko ya plastiki ya kubebea; mifuko ya karatasi, iliyofumwa na isiyo na plastiki inaruhusiwa, na vifungashio vya tiba vimesamehewa. Kila mfuko unaotumiwa na Afya ni wa karatasi au pamba, na kila mfuko ni mstari wenye bei kwenye risiti. Bei ni gharama halisi pamoja na 15% kwa uharibifu na upotevu wa uchapishaji, pamoja na VAT ya 18%, ikizungushwa juu hadi TSh 100 inayofuata. Mashine ya mauzo inauliza “Mfuko?” kila mauzo; mteja anayeleta mfuko wake halipi chochote.'))}</p>
  <div class="ab-tw"><table class="ab-t s43-t"><thead><tr><th>${E(T('Bag','Mfuko'))}</th><th>${E(T('Size','Ukubwa'))}</th><th class="ab-n">${E(T('FOB','FOB'))}</th><th class="ab-n">${E(T('Landed cost','Gharama halisi'))}</th><th class="ab-n">${E(T('Price with VAT','Bei pamoja na VAT'))}</th></tr></thead><tbody>${bagRows}</tbody></table></div>
  <p class="ab-mute s43-cap">${E(T(`Listing prices, converted at US$1 = TSh ${n1(FX,2)} (BoT, 10 Nov 2026), duty planned at 25% until confirmed.`,`Bei za matangazo, kwa kiwango cha US$1 = TSh ${n1(FX,2)} (BoT, 10 Nov 2026), ushuru umepangwa kwa 25% hadi uthibitishwe.`))}</p>
 </section>

 <section class="ab-block"><h2>${E(T('Risks and the planned answer','Hatari na jibu lililopangwa'))}</h2>
  <ul class="s43-ul">
   <li>${T('<b>Boxes crushed in humid storage.</b> Stack limits are set below the calculated crush strength, and boxes are stored off the floor.','<b>Maboksi yanabonyea kwenye unyevu.</b> Kikomo cha kupanga kiko chini ya nguvu ya kubana iliyohesabiwa, na maboksi yanahifadhiwa juu ya sakafu.')}</li>
   <li>${T('<b>The box supplier is late, or the print is off-colour.</b> Three months of boxes are held in stock, and the colour is approved on a printed proof before the main run.','<b>Msambazaji wa maboksi anachelewa, au rangi ya uchapishaji si sahihi.</b> Maboksi ya miezi mitatu yanahifadhiwa, na rangi inaidhinishwa kwenye sampuli iliyochapishwa kabla ya uzalishaji mkuu.')}</li>
   <li>${T('<b>A rider is absent or a motorbike is down.</b> A partner courier is on standby, and swap stations replace a battery in minutes.','<b>Msafirishaji hayupo au pikipiki imeharibika.</b> Msafirishaji mshirika yuko tayari wakati wote, na vituo vya kubadilisha betri vinabadilisha betri kwa dakika chache.')}</li>
   <li>${T('<b>The member is not home.</b> Two calls and five minutes, then the box returns and is booked on the next wave.','<b>Mwanachama hayupo nyumbani.</b> Simu mbili na dakika tano, kisha boksi linarudi na kupangwa kwenye awamu inayofuata.')}</li>
   <li>${T('<b>Same-day promises are missed in traffic or rain.</b> Orders close at 15:00, routes are planned by area, and the member is told before the delivery slot if the box will be late.','<b>Ahadi za siku hiyohiyo zinashindwa kwa sababu ya msongamano au mvua.</b> Oda zinafungwa saa 9:00 alasiri, njia zinapangwa kwa eneo, na mwanachama anaarifiwa kabla ya muda wa kufikisha ikiwa boksi litachelewa.')}</li>
   <li>${T('<b>Plastic-bag inspection.</b> No plastic carrier bag is used anywhere in the store or on the motorbikes.','<b>Ukaguzi wa mifuko ya plastiki.</b> Hakuna mfuko wa plastiki wa kubebea unaotumika popote dukani wala kwenye pikipiki.')}</li>
  </ul>
 </section>
 </div>

 <section class="ab-block"><h2>${E(T('Key figures','Takwimu muhimu'))}</h2>
  ${A().figsHTML([
   {v:`${tsh(P.S)} · ${tsh(P.M)} · ${tsh(P.L)}`,l:T('Packing line inside the box price, sizes S, M and L','Kiasi cha ufungashaji ndani ya bei ya boksi, ukubwa S, M na L'),s:E(T('Brief D4; landed-cost build-up above','D4; hesabu ya gharama halisi hapo juu'))},
   {v:tsh(D4().DELIVERY),l:T('Delivery line inside every box price','Kiasi cha usafirishaji ndani ya bei ya kila boksi'),s:E(T('Brief D4','D4'))},
   {v:`${N('f-pd',d.perDrop,'tsh')} ${est()}`,l:T('Cost of one delivery at month 12, option selected','Gharama ya safari moja mwezi 12, chaguo lililochaguliwa'),s:E(T('Financial model v1.2, base case','Modeli ya fedha v1.2, hali ya msingi'))},
   {v:T('0 free bags','Mifuko 0 ya bure'),l:T('Every bag is a priced line on the receipt','Kila mfuko ni mstari wenye bei kwenye risiti'),s:E(T('GN 291 of 2022 (plastic carrier bag ban)','Tangazo la Serikali Na. 291 la 2022 (marufuku ya mifuko ya plastiki)'))}])}
 </section>

 <section class="ab-block"><h2>${E(T('What this costs','Hii inagharimu nini'))}</h2>
  <div class="ab-tw"><table class="ab-t s43-t"><thead><tr><th>${E(T('Line','Kipengele'))}</th><th class="ab-n">${E(T('Amount','Kiasi'))}</th><th>${E(T('Paid by','Inalipwa na'))}</th></tr></thead><tbody>
   ${lean?`<tr><td>${E(T('Partner riders, per delivery','Wasafirishaji washirika, kwa kila safari'))}</td><td class="ab-n">${N('w-po',d.perOrder,'tsh')}</td><td>${E(T('The delivery line in the box price, or the online fee','Kiasi cha usafirishaji ndani ya bei ya boksi, au ada ya mtandaoni'))}</td></tr>`
   :`<tr><td>${E(T('Two electric delivery motorbikes, one-off','Pikipiki mbili za umeme za usafirishaji, mara moja'))}</td><td class="ab-n">${N('w-bk',d.bikes,'tsh')}</td><td>${E(T('The seed (use of funds, section 6.3)','Mtaji wa awali (matumizi ya fedha, sehemu 6.3)'))}</td></tr>
   <tr><td>${E(T('Riders, a month, with leave cover and employer on-costs','Wasafirishaji, kwa mwezi, pamoja na likizo na michango ya mwajiri'))}</td><td class="ab-n">${N('w-rm',d.riderMonth,'tsh')}</td><td>${E(T('Running costs, recovered through the delivery line and the online fee','Gharama za uendeshaji, zinarudishwa kupitia kiasi cha usafirishaji na ada ya mtandaoni'))}</td></tr>
   <tr><td>${E(T('Charging, tyres and maintenance, per delivery','Kuchaji, matairi na matengenezo, kwa kila safari'))} ${est()}</td><td class="ab-n">${N('w-po',d.perOrder,'tsh')}</td><td>${E(T('As above','Kama hapo juu'))}</td></tr>`}
   <tr><td>${E(T('Packaging and sundries, a month','Vifungashio na mengineyo, kwa mwezi'))}</td><td class="ab-n">${N('w-pk',d.pack,'tsh')}</td><td>${E(T('Running costs','Gharama za uendeshaji'))}</td></tr>
   <tr><td>${E(T('Box packaging, per box (S · M · L)','Ufungashaji wa boksi, kwa boksi (S · M · L)'))}</td><td class="ab-n">${tsh(P.S)} · ${tsh(P.M)} · ${tsh(P.L)}</td><td>${E(T('The member, inside the box price','Mwanachama, ndani ya bei ya boksi'))}</td></tr>
   <tr><td>${E(T('Delivery, per box','Usafirishaji, kwa boksi'))}</td><td class="ab-n">${tsh(D4().DELIVERY)}</td><td>${E(T('The member, inside the box price','Mwanachama, ndani ya bei ya boksi'))}</td></tr>
   <tr><td>${E(T('Delivery fee, per online order','Ada ya usafirishaji, kwa oda ya mtandaoni'))}</td><td class="ab-n">${N('w-fee',d.fee,'tsh')}</td><td>${E(T('The online customer','Mteja wa mtandaoni'))}</td></tr>
   <tr><td>${E(T('Paper bags','Mifuko ya karatasi'))}</td><td class="ab-n">${tsh(Bg[0].gross)}–${tsh(Bg[Bg.length-1].gross)} ${est()}</td><td>${E(T('The customer, at the till','Mteja, dukani'))}</td></tr>
  </tbody></table></div>
  <p class="ab-mute s43-cap">${E(T(`Financial model v1.2, ${lean?'start-small':'flagship'} option; brief D4. Planning estimates until supplier and rider quotes.`,`Modeli ya fedha v1.2, chaguo la ${lean?'kuanza kidogo':'duka kuu'}; D4. Makadirio ya mipango hadi nukuu za wasambazaji na wasafirishaji.`))}</p>
 </section>

 ${A().openHTML([
  E(T('New packing films for every package, on the locked box design, with gloved hands only, narration and captions in both languages. The earlier package films and the shop-display film are withdrawn: they show an earlier box with a coloured band and prices built before the approved price rule.','Filamu mpya za ufungashaji kwa kila kifurushi, kwa muundo wa boksi uliothibitishwa, mikono yenye glavu pekee, simulizi na maandishi kwa lugha zote mbili. Filamu za awali za vifurushi na filamu ya maonyesho dukani zimeondolewa: zinaonyesha boksi la awali lenye utepe wa rangi na bei zilizojengwa kabla ya kanuni ya bei iliyoidhinishwa.')),
  E(T('A manufacturer’s quote for the final box in S, M and L. The packing lines are built from listing prices for a printed corrugated box; a quote for the approved finish (deep green, gold foil, lid) may move them, and a compression test confirms the stack rule.','Nukuu ya mtengenezaji kwa boksi la mwisho la S, M na L. Viwango vya ufungashaji vimejengwa kutoka bei za matangazo za boksi la karatasi ngumu lililochapishwa; nukuu ya umaliziaji ulioidhinishwa (kijani kizito, dhahabu, mfuniko) inaweza kuvibadilisha, na kipimo cha kubana kitathibitisha kanuni ya upangaji.')),
  E(T('The customs tariff line and duty for printed boxes and paper bags, planned at 25% until the clearing agent confirms it.','Mstari wa ushuru wa forodha na ushuru wa maboksi yaliyochapishwa na mifuko ya karatasi, uliopangwa kwa 25% hadi wakala wa forodha athibitishe.')),
  E(T('Rider costs in Dar es Salaam: partner courier rates per delivery, electric motorbike prices and battery-swap fees, replacing the model’s planning figures.','Gharama za wasafirishaji Dar es Salaam: viwango vya wasafirishaji washirika kwa kila safari, bei za pikipiki za umeme na ada za kubadilisha betri, kuchukua nafasi ya makadirio ya modeli.')),
  E(T('Whether Afya riders may carry the partner pharmacy’s sealed bag, to be confirmed by a regulatory lawyer and the Pharmacy Council (section 4.5).','Kama wasafirishaji wa Afya wanaruhusiwa kubeba mfuko uliofungwa wa famasia mshirika, utathibitishwa na wakili wa masuala ya udhibiti na Baraza la Famasia (sehemu 4.5).')),
  E(T('The credit a member receives for returning a box, and the share of boxes that come back in usable condition.','Punguzo analopata mwanachama kwa kurudisha boksi, na sehemu ya maboksi yanayorudi yakiwa bado yanafaa.'))])}

 ${A().sourcesHTML(SRC)}
 ${A().pagerHTML(pv,nx)}
 </div></article>`}

let onR=null;
function init(){drawChart();if(onR)removeEventListener('resize',onR);onR=()=>drawChart();addEventListener('resize',onR);
 addEventListener('afya:leave',()=>{if(onR){removeEventListener('resize',onR);onR=null}},{once:true})}

window.SECTIONS['s4-3']={render,init,v2:true};
})();
