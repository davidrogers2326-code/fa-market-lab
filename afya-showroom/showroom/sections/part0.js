window.AFYA_CANVA_DECK_URL=window.AFYA_CANVA_DECK_URL||'https://canva.link/jqb4gd2snqa5bpx';
/* part0: Front door — s0-1 Home: the 60-second story · s0-2 The ten-minute presentation
   Everything is wrapped in one IIFE so nothing clashes with the main script's globals.
   CSS is injected on first render (addCSS lives in the main script, which loads after this file). */
(function(){
/* ---- photo kit (editorial real-photo layouts) · prefix p0k ---- */
const p0kCSS=`
.p0k-band{position:relative;margin:24px 0 0;border-radius:26px;overflow:hidden;border:1px solid var(--edge2);min-height:460px;display:flex;align-items:flex-end;isolation:isolate;box-shadow:0 50px 110px -60px rgba(95,191,143,.45)}
.p0k-band>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:-2;transform:scale(1.01)}
.p0k-band::before{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(90deg,rgba(2,6,8,.94) 0%,rgba(2,6,8,.72) 36%,rgba(2,6,8,.12) 70%,rgba(2,6,8,0)),linear-gradient(0deg,rgba(2,6,8,.8),rgba(2,6,8,0) 45%)}
.p0k-band.r{justify-content:flex-end}
.p0k-band.r::before{background:linear-gradient(270deg,rgba(2,6,8,.94) 0%,rgba(2,6,8,.72) 36%,rgba(2,6,8,.12) 70%,rgba(2,6,8,0)),linear-gradient(0deg,rgba(2,6,8,.8),rgba(2,6,8,0) 45%)}
.p0k-band .tx{position:relative;padding:48px 52px;max-width:600px}
.p0k-k{display:inline-block;font:500 .64rem/1.4 var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--gold)}
.p0k-band h3,.p0k-split h3{font:800 clamp(1.5rem,2.9vw,2.4rem)/1.08 var(--f-display);letter-spacing:-.02em;margin:12px 0 0;color:var(--ink)}
.p0k-band h3 em,.p0k-split h3 em{font-style:normal;background:linear-gradient(90deg,var(--neon),var(--gold2));-webkit-background-clip:text;background-clip:text;color:transparent}
.p0k-band p,.p0k-split p{color:var(--ink2);margin:14px 0 0;font-size:1rem;line-height:1.65}
.p0k-band p b,.p0k-split p b,.p0k-split li b{color:var(--ink)}
.p0k-stats{display:flex;flex-wrap:wrap;gap:12px 28px;margin-top:22px;padding-top:18px;border-top:1px solid rgba(242,201,107,.22)}
.p0k-stats div{min-width:0}
.p0k-stats b{display:block;font:500 1.5rem var(--f-hud);color:var(--gold2)}
.p0k-stats span{display:block;font-size:.78rem;line-height:1.45;color:var(--ink2);max-width:20ch}
.p0k-cap{position:absolute;right:16px;top:16px;z-index:3;font:500 .56rem var(--f-hud);letter-spacing:.18em;text-transform:uppercase;color:rgba(239,250,245,.82);background:rgba(2,6,8,.6);padding:5px 10px;border-radius:99px;border:1px solid rgba(255,255,255,.14);backdrop-filter:blur(6px)}
.p0k-split{display:grid;grid-template-columns:minmax(0,1.12fr) minmax(0,1fr);border-radius:26px;overflow:hidden;border:1px solid var(--edge);background:linear-gradient(160deg,var(--panel2),rgba(2,6,8,.85));margin-top:22px}
.p0k-split.rev>figure{order:2}
.p0k-split>figure{position:relative;margin:0;min-height:420px;overflow:hidden}
.p0k-split>figure img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.p0k-split>figure::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(2,6,8,.55),transparent 40%)}
.p0k-split>figure figcaption{position:absolute;left:20px;right:20px;bottom:16px;z-index:2;font-size:.84rem;line-height:1.45;color:var(--ink)}
.p0k-split .tx{padding:44px 46px;display:flex;flex-direction:column;justify-content:center;min-width:0}
.p0k-split ul{margin:16px 0 0;padding:0;list-style:none;display:grid;gap:10px}
.p0k-split li{position:relative;padding-left:22px;font-size:.93rem;line-height:1.55;color:var(--ink2)}
.p0k-split li::before{content:"";position:absolute;left:0;top:.62em;width:10px;height:1px;background:var(--gold)}
.p0k-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:16px;margin-top:22px}
.p0k-card{border-radius:22px;overflow:hidden;border:1px solid var(--edge);background:linear-gradient(175deg,var(--panel2),rgba(2,6,8,.8));min-width:0;display:flex;flex-direction:column;margin:0}
.p0k-card>.ph{position:relative;aspect-ratio:4/3;overflow:hidden}
.p0k-card>.ph img{display:block;width:100%;height:100%;object-fit:cover;transition:transform 1.2s cubic-bezier(.2,.8,.2,1)}
.p0k-card:hover>.ph img{transform:scale(1.05)}
.p0k-card>.ph::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(2,6,8,.5),transparent 45%)}
.p0k-card .tx{padding:18px 20px 22px;min-width:0}
.p0k-card h4{font:700 1.05rem/1.28 var(--f-display);margin:8px 0 0;color:var(--ink)}
.p0k-card p{font-size:.9rem;line-height:1.6;color:var(--ink2);margin:8px 0 0}
.p0k-card p b{color:var(--ink)}
.p0k-card .n{display:block;margin-top:12px;padding-top:12px;border-top:1px solid var(--edge);font:500 .66rem/1.5 var(--f-hud);letter-spacing:.1em;text-transform:uppercase;color:var(--gold2)}
.p0k-mos{display:grid;grid-template-columns:minmax(0,1.55fr) minmax(0,1fr);grid-template-rows:repeat(2,minmax(0,1fr));gap:14px;margin-top:22px;height:560px}
.p0k-mos>figure{position:relative;margin:0;border-radius:22px;overflow:hidden;border:1px solid var(--edge);min-height:0}
.p0k-mos>figure:first-child{grid-row:1/3}
.p0k-mos img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.p0k-mos figcaption{position:absolute;left:0;right:0;bottom:0;padding:56px 20px 16px;background:linear-gradient(0deg,rgba(2,6,8,.92),transparent);font-size:.88rem;line-height:1.5;color:var(--ink2)}
.p0k-mos figcaption b{display:block;color:var(--ink);font:700 1rem/1.3 var(--f-display);margin-bottom:3px}
@media (max-width:980px){.p0k-split{grid-template-columns:1fr}.p0k-split.rev>figure{order:0}.p0k-split>figure{min-height:0;aspect-ratio:16/10}.p0k-split .tx{padding:28px 26px 30px}.p0k-mos{height:auto;grid-template-columns:1fr 1fr;grid-template-rows:auto}.p0k-mos>figure{aspect-ratio:4/3}.p0k-mos>figure:first-child{grid-row:auto;grid-column:1/3;aspect-ratio:16/10}}
@media (max-width:640px){.p0k-band{display:block;min-height:0!important;border-radius:20px;background:#04100c}.p0k-band>img{position:relative;display:block;height:auto;aspect-ratio:4/3;transform:none}.p0k-band::before,.p0k-band.r::before{display:none}.p0k-band .tx{max-width:none;margin-top:-80px;padding:84px 20px 24px;background:linear-gradient(180deg,rgba(4,16,12,0),#04100c 78px)}.p0k-split{border-radius:20px}.p0k-split .tx{padding:24px 20px 26px}.p0k-mos{grid-template-columns:1fr}.p0k-mos>figure,.p0k-mos>figure:first-child{grid-column:auto;aspect-ratio:auto;background:linear-gradient(175deg,var(--panel2),rgba(2,6,8,.8))}.p0k-mos img{position:relative;display:block;aspect-ratio:4/3;height:auto}.p0k-mos figcaption{position:relative;padding:14px 18px 18px;background:none}.p0k-cards{grid-template-columns:1fr}.p0k-stats b{font-size:1.25rem}}
`;
const p0kon=()=>{if(typeof addCSS==='function')addCSS('p0k',p0kCSS)};
const p0kimg=(f,alt,pos)=>`<img src="img/${f}.webp" alt="${alt}" loading="lazy" decoding="async" width="1680" height="944"${pos?` style="object-position:${pos}"`:''}${FB[f]?` data-fb="img/${FB[f]}.webp" onerror="p0fb(this)"`:''}>`;
const p0kcap='<span class="p0k-cap">Concept image</span>';
const PNOTE=()=>`<p class="p0-pnote" style="margin:14px 0 0;padding:10px 14px;border-left:3px solid var(--gold2,#f2c96b);background:rgba(242,201,107,.06);border-radius:8px;font-size:.82rem;line-height:1.5;color:var(--ink2,#cfe)">${L('Photos are for illustration; people shown are not Afya Basics customers or staff. Images of people are concept images made for this showroom: no real person’s photograph is used, and people appear only from behind or as hands. Store scenes are artist impressions of the planned store. Our own consented photos replace them once the first store opens.','Picha ni za kuonyesha tu; watu wanaoonekana si wateja wala wafanyakazi wa Afya Basics. Picha za watu ni picha za dhana zilizotengenezwa kwa ajili ya onyesho hili: hakuna picha ya mtu halisi inayotumika, na watu wanaonekana kwa nyuma au mikono tu. Matukio ya duka ni michoro ya duka linalopangwa. Picha zetu wenyewe zenye ridhaa zitazibadilisha duka la kwanza likifunguliwa.')}</p>`;
const P0REAL=new Set(['real-lab']);
const p0kcf=f=>P0REAL.has(String(f))?'<span class="p0k-cap">Photo · Pexels</span>':p0kcap;
/* band(file, alt, kicker, title, text, {pos, r, h, stats:[[b,span]]}) */
const p0kband=(f,alt,k,h,p,o={})=>{p0kon();return `<figure class="p0k-band${o.r?' r':''}"${o.h?` style="min-height:${o.h}"`:''}>${p0kimg(f,alt,o.pos)}${p0kcf(f)}<figcaption class="tx">${k?`<span class="p0k-k">${k}</span>`:''}<h3>${h}</h3>${p?`<p>${p}</p>`:''}${o.stats?`<div class="p0k-stats">${o.stats.map(s=>`<div><b>${s[0]}</b><span>${s[1]}</span></div>`).join('')}</div>`:''}${o.extra||''}</figcaption></figure>`};
/* split(file, alt, innerHTML, {rev, pos, cap}) */
const p0ksplit=(f,alt,html,o={})=>{p0kon();return `<div class="p0k-split${o.rev?' rev':''}"><figure>${p0kimg(f,alt,o.pos)}${p0kcf(f)}${o.cap?`<figcaption>${o.cap}</figcaption>`:''}</figure><div class="tx">${html}</div></div>`};
/* cards([[file, alt, kicker, title, text, note, pos]]) */
const p0kcards=(arr,o={})=>{p0kon();return `<div class="p0k-cards"${o.min?` style="grid-template-columns:repeat(auto-fit,minmax(${o.min},1fr))"`:''}>${arr.map(a=>`<article class="p0k-card"><div class="ph">${p0kimg(a[0],a[1],a[6])}${p0kcf(a[0])}</div><div class="tx">${a[2]?`<span class="p0k-k">${a[2]}</span>`:''}<h4>${a[3]}</h4>${a[4]?`<p>${a[4]}</p>`:''}${a[5]?`<span class="n">${a[5]}</span>`:''}</div></article>`).join('')}</div>`};
/* mosaic([[file, alt, title, text, pos]]) first is large */
const p0kmos=arr=>{p0kon();return `<div class="p0k-mos">${arr.map(a=>`<figure>${p0kimg(a[0],a[1],a[4])}${p0kcf(a[0])}<figcaption><b>${a[2]}</b>${a[3]||''}</figcaption></figure>`).join('')}</div>`};
/* ---- end photo kit ---- */
const M=window.MODEL, F=M.fmt;let IN=M.inputs;
const SC=[['base','Base'],['best','Best'],['down','Downside']];
const pad=n=>String(n).padStart(2,'0');
const mmss=s=>{s=Math.max(0,Math.round(s));return Math.floor(s/60)+':'+pad(s%60)};
const P=x=>Math.round(x*100)+'%';
const cap1=t=>t.charAt(0).toUpperCase()+t.slice(1);
const num=n=>Math.round(n).toLocaleString('en-US');
/* images still being produced fall back to an existing image underneath */
const bgi=(a,b)=>{b=b||FB[a];return `background-image:url(img/${a}.webp)${b?`,url(img/${b}.webp)`:''}`};
const imgFb=(a,b,alt,cls)=>`<img${cls?` class="${cls}"`:''} src="img/${a}.webp" alt="${alt}" loading="lazy" width="1680" height="944" onerror="this.onerror=null;this.src='img/${b}.webp'">`;

/* ---------- cited market facts (same sources as section 1.1) ---------- */
const SRC=[
 ['WHO, United Republic of Tanzania hypertension profile (2012 STEPS survey data)','https://cdn.who.int/media/docs/default-source/country-profiles/hypertension/tza_en.pdf'],
 ['WHO news release, 28 November 2017: 1 in 10 medical products in developing countries is substandard or falsified','https://www.who.int/news/item/28-11-2017-1-in-10-medical-products-in-developing-countries-is-substandard-or-falsified'],
 ['National Bureau of Statistics, 2022 Population and Housing Census, Dar es Salaam region (via City Population)','https://www.citypopulation.de/en/tanzania/admin/07__dar_es_salaam'],
 ['The Citizen, 27 May 2026: Diaspora remittances hit Sh3.3 trillion (2024/25 financial year)','https://www.thecitizen.co.tz/tanzania/diaspora/diaspora-remittances-hit-sh3-3-trillion-as-tanzania-deepens-global-engagement-5473984'],
 ['Mayige et al., Tanzania Journal of Health Research 27(2), 2026: hypertension among adults 18–69, 2023 National STEPS survey','https://nhrdr.nimr.or.tz/records/209']];
const c=n=>cref(SRC[n-1][1],n,SRC[n-1][0]);
const DAR=5383728;

/* ---------- derived numbers (all from MODEL; labelled planning estimates on the page) ---------- */
function D(key){const r=(M.cur||M).get(key),sc=IN.scenarios[key];
 const y=r.years,y12=y[y.length-1];
 const firstB=y.find(x=>x.revenue>=1e9),firstTenB=y.find(x=>x.revenue>=1e10);
 const buyersDay=IN.store.visitors_day_m12*sc.demand*IN.store.conversion;
 const mem12=r.months[11].members;let cum=0,lossTo=0;const payback=(r.months.find(m=>{cum+=m.profit;if(m.profit<0)lossTo+=m.profit;return cum>=0})||{}).m||null;
 return {r,key,label:sc.label,y1rev:r.y1.revenue,y1profit:r.y1.profit,be:r.breakeven_month,opex:r.opex_month,
  mem12,mrr12:r.months[11].boxes,rev12m:r.months[11].revenue,y12,firstB,firstTenB,
  capex12:y.reduce((a,x)=>a+x.capex,0),buyersDay,
  cityShare:buyersDay/DAR,residentsPerMember:DAR/mem12,
  posRevYears:y.filter(x=>x.ebitda>0).length,payback,earlyLoss:-lossTo};}
let SEED=IN.seed, OWN=IN.ownership;
let STAFFN=IN.staff.reduce((a,s)=>a+s[1],0), PAYROLL=IN.staff.reduce((a,s)=>a+s[1]*s[2],0);
let POSTMONEY=SEED.amount/OWN.seed_investor_share;
const ISL=()=>!!(M.isLean&&M.isLean());
/* the start-small option (TSh 150M) from the same master model */
const LEANI=M.leanInputs?M.leanInputs():null, LEAN=M.lean?M.lean('base'):null;
const LSEED=LEANI?LEANI.seed.amount:150e6, LAREA=LEANI?LEANI.store.area_m2:100, LSTAFF=LEANI?LEANI.staff.reduce((a,s)=>a+s[1],0):5, LBE=LEAN&&LEAN.breakeven_month?LEAN.breakeven_month:8;
let CHECKBUY=IN.check.checks_day_m12*IN.check.check_to_purchase;
const PLANP=k=>IN.members.avg_box*IN.members.plans[k];

/* ---------- inline SVG charts ---------- */
function revBars(d,o={}){const y=d.r.years,W=o.w||600,H=o.h||260,pl=o.pl||(o.w?64:8),pr=8,pt=26,pb=34,max=Math.max(...['base','best','down'].map(k=>(M.cur||M).get(k).years[11].revenue))*1.04;
 const bw=(W-pl-pr)/y.length;let s='';
 for(let g=1;g<=3;g++){const v=g*25e9,yy=H-pb-(v/max)*(H-pt-pb);if(v<max)s+=`<line x1="${pl}" x2="${W-pr}" y1="${yy}" y2="${yy}" class="p0-grid"/><text x="${o.w?pl-8:W-pr}" y="${o.w?yy+4:yy-5}" text-anchor="end" class="p0-ax">${F.b(v)}</text>`}
 y.forEach((x,i)=>{const h=Math.max(2,(x.revenue/max)*(H-pt-pb)),X=pl+i*bw+bw*.16,w=bw*.68,Y=H-pb-h;const hi=i===0||i===4||i===y.length-1;
  s+=`<rect x="${X}" y="${Y}" width="${w}" height="${h}" rx="3" class="p0-bar${i===y.length-1?' g':''}"><title>Year ${x.year}: ${F.auto(x.revenue)} · ${x.stores} store${x.stores>1?'s':''}</title></rect>`;
  if(hi)s+=`<text x="${i===y.length-1?X+w:i===0?X:X+w/2}" y="${Y-7}" text-anchor="${i===y.length-1?'end':i===0?'start':'middle'}" class="p0-val${i===y.length-1?' g':''}">${F.auto(x.revenue)}</text>`;
  s+=`<text x="${X+w/2}" y="${H-pb+15}" text-anchor="middle" class="p0-ax">Y${x.year}</text><text x="${X+w/2}" y="${H-pb+28}" text-anchor="middle" class="p0-ax s">${x.stores}</text>`});
 s+=`<text x="${pl}" y="${H-4}" class="p0-ax s">stores →</text>`;
 return `<svg class="p0-chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Revenue by year, ${d.label} case: from ${F.auto(y[0].revenue)} in year 1 to ${F.auto(y[11].revenue)} in year 12 with ${y[11].stores} stores">${s}</svg>`}
function profitBars(d){const m=d.r.months,W=600,H=270,pl=46,pr=10,pt=24,pb=30;
 const all=['base','best','down'].flatMap(k=>M.get(k).months.map(x=>x.profit));const mx=Math.max(...all),mn=Math.min(...all);
 const sy=v=>pt+(mx-v)/(mx-mn)*(H-pt-pb),z=sy(0),bw=(W-pl-pr)/12;let s='';
 [mx,0,mn].forEach(v=>{const yy=sy(v);s+=`<line x1="${pl}" x2="${W-pr}" y1="${yy}" y2="${yy}" class="p0-grid${v===0?' z':''}"/><text x="${pl-6}" y="${yy+4}" text-anchor="end" class="p0-ax">${v===0?'0':F.m(v)}</text>`});
 let path='';m.forEach((x,i)=>{const X=pl+i*bw+bw*.18,w=bw*.64,yy=sy(x.profit),top=Math.min(yy,z),h=Math.max(1.5,Math.abs(yy-z));
  s+=`<rect x="${X}" y="${top}" width="${w}" height="${h}" rx="2.5" class="p0-pb ${x.profit>=0?'up':'dn'}"><title>Month ${x.m}: ${F.m(x.profit)}</title></rect><text x="${X+w/2}" y="${H-10}" text-anchor="middle" class="p0-ax">M${x.m}</text>`;
  path+=(i?'L':'M')+(X+w/2).toFixed(1)+' '+yy.toFixed(1)});
 s+=`<path d="${path}" class="p0-pl"/>`;
 if(d.be){const i=d.be-1,X=pl+i*bw+bw/2;s+=`<line x1="${X}" x2="${X}" y1="${pt-10}" y2="${H-pb}" class="p0-bel"/><text x="${X+6}" y="${pt-2}" class="p0-val g">Break-even · month ${d.be}</text>`}
 return `<svg class="p0-chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Year-1 monthly operating profit, ${d.label} case, from ${F.m(m[0].profit)} in month 1 to ${F.m(m[11].profit)} in month 12">${s}</svg>`}
function donut(){const parts=[['Founders',OWN.founders_after_seed,'#5fbf8f'],['Seed investors',OWN.seed_investor_share,'#f2c96b'],['Option pool',OWN.option_pool,'#d9b56e']];
 const R=70,C=2*Math.PI*R;let off=0,s='';
 parts.forEach(p=>{const L=p[1]*C;s+=`<circle r="${R}" cx="100" cy="100" fill="none" stroke="${p[2]}" stroke-width="26" stroke-dasharray="${L-2} ${C-L+2}" stroke-dashoffset="${-off}" transform="rotate(-90 100 100)"/>`;off+=L});
 const a=OWN.founders_floor*2*Math.PI-Math.PI/2;
 s+=`<line x1="${100+84*Math.cos(a)}" y1="${100+84*Math.sin(a)}" x2="${100+99*Math.cos(a)}" y2="${100+99*Math.sin(a)}" stroke="#fff" stroke-width="2" stroke-dasharray="3 3"/>`;
 s+=`<text x="100" y="96" text-anchor="middle" class="p0-dn1">${P(OWN.founders_after_seed)}</text><text x="100" y="116" text-anchor="middle" class="p0-dn2">founders</text>`;
 return `<svg class="p0-donut" viewBox="0 0 200 200" role="img" aria-label="Illustrative ownership after the seed round">${s}</svg>`}

/* ---------- CSS ---------- */
const CSS=`
.p0-times{display:flex;flex-wrap:wrap;gap:8px;margin-top:22px}
.p0-times a{display:inline-flex;align-items:baseline;gap:8px;padding:8px 14px;border-radius:999px;border:1px solid var(--edge);background:rgba(2,10,8,.55);backdrop-filter:blur(6px);color:var(--ink2);font-size:.82rem;text-decoration:none;transition:border-color .2s}
.p0-times a:hover{border-color:var(--edge2)}
.p0-times b{font:500 .8rem var(--f-hud);color:var(--gold2)}
.p0-sc{display:inline-flex;gap:4px;padding:4px;border-radius:999px;border:1px solid var(--edge2);background:rgba(2,10,8,.6)}
.p0-sc button{padding:7px 14px;border-radius:999px;border:0;background:none;color:var(--ink2);font:600 .8rem var(--f-body);cursor:pointer;transition:all .2s}
.p0-sc button:hover{color:var(--ink)}
.p0-sc button.on{background:linear-gradient(135deg,var(--gold2),var(--gold));color:#1a1204}
.p0-facts{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));margin-top:30px;border-top:1px solid var(--edge2);border-bottom:1px solid var(--edge)}
.p0-facts div{padding:22px 18px 20px;min-width:0}
.p0-facts div+div{border-left:1px solid var(--edge)}
.p0-facts b{display:block;font:500 clamp(1.5rem,2.3vw,2.2rem)/1 var(--f-hud);color:var(--c);text-shadow:0 0 20px color-mix(in srgb,var(--c) 35%,transparent)}
.p0-facts p{margin:10px 0 0;font-size:.86rem;line-height:1.5;color:var(--ink2)}
.p0-pains{display:flex;flex-wrap:wrap;gap:8px;margin-top:22px}
.p0-pains span{display:inline-flex;align-items:center;gap:8px;padding:7px 13px;border-radius:999px;border:1px solid color-mix(in srgb,var(--c) 40%,transparent);font:600 .82rem var(--f-body);color:var(--ink)}
.p0-pains i{width:8px;height:8px;border-radius:50%;background:var(--c);box-shadow:0 0 8px var(--c)}
.p0-tri{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
.p0-tc{display:flex;flex-direction:column;border-radius:24px;overflow:hidden;border:1px solid var(--edge);background:linear-gradient(175deg,var(--panel2),rgba(2,6,8,.75));min-width:0}
.p0-tv{position:relative;aspect-ratio:16/10;overflow:hidden;background:radial-gradient(circle at 50% 40%,rgba(95,191,143,.16),transparent 60%),linear-gradient(160deg,#07241a,#030b08);display:grid;place-items:center}
.p0-tv .ph{position:absolute;inset:0;background-size:cover;background-position:center}
.p0-tv .boxart{position:relative}
.p0-tv .phone{transform:rotate(-6deg) translateY(38px)}
.p0-tv .w3tag{z-index:2}
.p0-tb{padding:20px 22px 22px}
.p0-tb small{font:500 .6rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--neon)}
.p0-tb h3{margin-top:6px;font:700 1.15rem/1.25 var(--f-display)}
.p0-tb p{margin:8px 0 0;font-size:.9rem;line-height:1.55;color:var(--ink2)}
.p0-tb ul{margin:12px 0 0;padding:0;list-style:none;display:grid;gap:6px}
.p0-tb li{position:relative;padding-left:18px;font-size:.86rem;color:var(--ink)}
.p0-tb li::before{content:"";position:absolute;left:0;top:.6em;width:8px;height:1px;background:var(--gold)}
.p0-path{position:relative;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px}
.p0-st0{position:relative;border-radius:20px;border:1px solid var(--edge);background:linear-gradient(175deg,var(--panel2),rgba(2,6,8,.8));min-width:0;overflow:hidden;display:flex;flex-direction:column}
.p0-st0 .ph{position:relative;aspect-ratio:4/3.4;overflow:hidden}
.p0-st0 .ph img{display:block;width:100%;height:100%;object-fit:cover;transition:transform 1.2s cubic-bezier(.2,.8,.2,1)}
.p0-st0:hover .ph img{transform:scale(1.05)}
.p0-st0 .ph::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(2,6,8,.85),rgba(2,6,8,0) 55%)}
.p0-st0 .no{position:absolute;left:14px;bottom:10px;z-index:2;font:500 .62rem var(--f-hud);letter-spacing:.2em;color:var(--gold2)}
.p0-st0 .bd{padding:16px 18px 20px;display:flex;flex-direction:column;flex:1}
.p0-st0 .t{font:500 1.45rem var(--f-hud);color:var(--neon);text-shadow:0 0 14px rgba(95,191,143,.45)}
.p0-st0 b{display:block;margin-top:4px;font:700 1rem var(--f-display)}
.p0-st0 p{margin:6px 0 0;font-size:.86rem;line-height:1.55;color:var(--ink2);flex:1}
.p0-st0 em{display:block;margin-top:12px;padding-top:10px;border-top:1px solid var(--edge);font:500 .62rem/1.5 var(--f-hud);letter-spacing:.12em;text-transform:uppercase;font-style:normal;color:var(--gold2)}
.p0-exp{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(0,1fr);gap:20px;align-items:start}
.p0-exp .shot{margin:0}
.p0-hs{position:absolute;z-index:3;width:30px;height:30px;margin:-15px 0 0 -15px;border-radius:50%;border:2px solid var(--gold2);background:rgba(2,8,6,.75);color:var(--gold2);font:700 .74rem var(--f-hud);display:grid;place-items:center;cursor:pointer;transition:all .2s}
.p0-hs:hover,.p0-hs.on{background:var(--gold);color:#1a1204;transform:scale(1.15);box-shadow:0 0 0 8px rgba(242,201,107,.2),0 0 22px var(--gold)}
.p0-hl{list-style:none;margin:0;padding:0;display:grid;gap:8px}
.p0-hl li{display:grid;grid-template-columns:30px minmax(0,1fr);gap:12px;padding:12px 14px;border-radius:14px;border:1px solid var(--edge);background:var(--panel);cursor:pointer;transition:all .2s}
.p0-hl li span{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;border:1px solid var(--edge2);font:700 .74rem var(--f-hud);color:var(--gold2)}
.p0-hl li b{font:700 .9rem var(--f-display)}
.p0-hl li p{margin:2px 0 0;font-size:.82rem;line-height:1.45;color:var(--ink2)}
.p0-hl li.on{border-color:var(--edge2);background:linear-gradient(90deg,rgba(242,201,107,.12),rgba(2,6,8,.4))}
.p0-hl li.on span{background:var(--gold);color:#1a1204}
/* cinematic player */
.p0-pl{position:relative;border-radius:28px;overflow:hidden;border:1px solid var(--edge2);aspect-ratio:16/8.2;min-height:420px;isolation:isolate;background:#020608;box-shadow:0 50px 100px -50px rgba(95,191,143,.5)}
.p0-pl:focus-visible{outline:2px solid var(--neon);outline-offset:4px}
.p0-scn{position:absolute;inset:0;z-index:-3;background-size:cover;background-position:center;opacity:0;transform:scale(1.02);transition:opacity 1.2s ease}
.p0-scn.on{opacity:1}
.p0-pl.run .p0-scn.on{animation:p0kb 11s linear forwards}
@keyframes p0kb{from{transform:scale(1.02) translate(0,0)}to{transform:scale(1.14) translate(var(--kx,-2%),var(--ky,-1%))}}
.p0-pl::before{content:"";position:absolute;inset:0;z-index:-2;background:linear-gradient(90deg,rgba(2,6,8,.92) 0%,rgba(2,6,8,.55) 45%,rgba(2,6,8,.1) 80%),linear-gradient(0deg,rgba(2,6,8,.9) 0%,transparent 45%)}
.p0-pl::after{content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;background:repeating-linear-gradient(0deg,rgba(255,255,255,.018) 0 1px,transparent 1px 3px);mix-blend-mode:overlay}
.p0-lb{position:absolute;left:0;right:0;height:5%;background:#000;z-index:1;pointer-events:none}
.p0-lb.t{top:0}.p0-lb.b{bottom:0}
.p0-segs{position:absolute;z-index:3;top:calc(5% + 14px);left:26px;right:26px;display:flex;gap:6px}
.p0-segs button{flex:1;height:20px;padding:0;border:0;background:none;cursor:pointer;position:relative}
.p0-segs button::before{content:"";position:absolute;left:0;right:0;top:8px;height:3px;border-radius:3px;background:rgba(255,255,255,.2)}
.p0-segs button i{position:absolute;left:0;top:8px;height:3px;border-radius:3px;width:0;background:linear-gradient(90deg,var(--neon),var(--gold));box-shadow:0 0 10px var(--neon)}
.p0-tc0{position:absolute;z-index:3;top:calc(5% + 40px);left:26px;font:500 .62rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--ink2)}
.p0-tc0 b{color:var(--gold2);font-weight:500}
.p0-cap{position:absolute;z-index:2;left:42px;bottom:calc(5% + 86px);max-width:min(620px,60%)}
.p0-cap .k{display:inline-flex;align-items:center;gap:10px;font:500 .66rem var(--f-hud);letter-spacing:.24em;text-transform:uppercase;color:var(--gold)}
.p0-cap .k::before{content:"";width:28px;height:1px;background:var(--gold)}
.p0-cap h3{margin-top:12px;color:#fff;text-shadow:0 4px 30px rgba(0,0,0,.6);font:900 clamp(1.9rem,4.3vw,3.7rem)/.98 var(--f-display);letter-spacing:-.035em}
.p0-cap h3 em{font-style:normal;background:linear-gradient(92deg,var(--neon2),var(--neon) 40%,var(--gold2));-webkit-background-clip:text;background-clip:text;color:transparent}
.p0-cap p{margin:14px 0 0;color:var(--ink2);font-size:1.02rem;max-width:52ch}
.p0-cap.swap .k,.p0-cap.swap h3,.p0-cap.swap p{animation:p0up .8s cubic-bezier(.2,.8,.2,1) both}
.p0-cap.swap h3{animation-delay:.12s}.p0-cap.swap p{animation-delay:.28s}
@keyframes p0up{from{opacity:0;transform:translateY(18px);filter:blur(6px)}}
.p0-stat{position:absolute;z-index:2;right:34px;bottom:calc(5% + 86px);width:min(280px,30%);padding:18px 20px;border-radius:18px;border:1px solid var(--edge2);background:rgba(2,10,8,.62);backdrop-filter:blur(10px)}
.p0-stat b{display:block;font:500 clamp(1.6rem,3vw,2.6rem)/1 var(--f-hud);color:var(--gold2);text-shadow:0 0 20px rgba(242,201,107,.4)}
.p0-stat span{display:block;margin-top:8px;font-size:.82rem;line-height:1.45;color:var(--ink2)}
.p0-stat.swap{animation:p0up .8s cubic-bezier(.2,.8,.2,1) .45s both}
.p0-ctl{position:absolute;z-index:3;left:34px;right:34px;bottom:calc(5% + 20px);display:flex;align-items:center;gap:10px}
.p0-ctl button{width:44px;height:44px;flex:0 0 44px;border-radius:50%;border:1px solid var(--edge2);background:rgba(2,10,8,.6);color:var(--gold2);cursor:pointer;display:grid;place-items:center;transition:background .2s}
.p0-ctl button:hover{background:rgba(242,201,107,.16)}
.p0-ctl button.main{width:52px;height:52px;flex-basis:52px;background:linear-gradient(135deg,var(--gold2),var(--gold));color:#1a1204;border:0;box-shadow:0 0 30px -6px var(--gold)}
.p0-ctl svg{width:18px;height:18px}
.p0-ctl .clk{white-space:nowrap;font:500 .78rem var(--f-hud);color:var(--ink2);letter-spacing:.1em;margin-left:6px}
.p0-ctl .tag{margin-left:auto;font:500 .58rem var(--f-hud);letter-spacing:.18em;text-transform:uppercase;color:var(--ink3)}
.p0-ch{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:8px;margin-top:12px}
.p0-ch button{position:relative;text-align:left;padding:0;border-radius:14px;overflow:hidden;border:1px solid var(--edge);background:var(--panel);color:var(--ink2);cursor:pointer;transition:border-color .2s,transform .2s;min-width:0}
.p0-ch button:hover{border-color:var(--edge2);transform:translateY(-2px)}
.p0-ch .im{display:block;aspect-ratio:16/8;background-size:cover;background-position:center;filter:saturate(.8) brightness(.75)}
.p0-ch .tx{display:block;padding:9px 11px 11px;font-size:.78rem;line-height:1.3}
.p0-ch .tx small{display:block;font:500 .58rem var(--f-hud);letter-spacing:.16em;color:var(--gold)}
.p0-ch button.on{border-color:var(--gold)}
.p0-ch button.on .im{filter:none}
.p0-ch button.on .tx{color:var(--ink)}
/* numbers */
.p0-nh{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;margin-bottom:18px}
.p0-nh p{margin:0;color:var(--ink2);max-width:62ch}
.p0-kpi{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px}
.p0-k{position:relative;padding:22px 18px 18px;border-radius:18px;border:1px solid var(--edge);background:var(--panel);min-width:0;overflow:hidden}
.p0-k small{display:block;font:500 .58rem var(--f-hud);letter-spacing:.18em;text-transform:uppercase;color:var(--neon)}
.p0-k b{display:block;margin-top:10px;font:500 clamp(1.35rem,2.2vw,1.9rem)/1.05 var(--f-hud);color:var(--ink);white-space:nowrap}
.p0-k span{display:block;margin-top:8px;font-size:.82rem;line-height:1.45;color:var(--ink2)}
.p0-k.g{border-color:var(--edge2);background:linear-gradient(160deg,rgba(242,201,107,.13),rgba(2,6,8,.6))}
.p0-k.g b{color:var(--gold2)}.p0-k.g small{color:var(--gold)}
.p0-k.flash b{animation:p0fl .6s ease}
@keyframes p0fl{from{color:var(--neon2);text-shadow:0 0 20px var(--neon)}}
.p0-chartbox{margin-top:14px;padding:20px 22px 14px;border-radius:20px;border:1px solid var(--edge);background:linear-gradient(170deg,var(--panel2),rgba(2,6,8,.7))}
.p0-chartbox h4{margin:0 0 6px;font:700 .95rem var(--f-display)}
.p0-chart{display:block;width:100%;height:auto;overflow:visible}
.p0-grid{stroke:rgba(169,196,184,.14);stroke-width:1}
.p0-grid.z{stroke:rgba(242,201,107,.5)}
.p0-ax{fill:#7f9c90;font:500 11px var(--f-hud)}
.p0-ax.s{fill:#58776b;font-size:9.5px}
.p0-val{fill:#effaf5;font:600 12px var(--f-hud)}
.p0-val.g{fill:#ffe7a8}
.p0-bar{fill:url(#p0bar);fill:#1fae7a}
.p0-bar.g{fill:#f2c96b}
.p0-pb.up{fill:#5fbf8f}.p0-pb.dn{fill:#ff8f7a}
.p0-pl{fill:none;stroke:#ffe7a8;stroke-width:1.6;stroke-dasharray:4 4;opacity:.7}
.p0-bel{stroke:#f2c96b;stroke-width:1.2;stroke-dasharray:3 4}
/* the ask */
.p0-ask{position:relative;border-radius:30px;padding:46px 44px;overflow:hidden;border:1px solid var(--edge2);background:radial-gradient(700px 400px at 90% 0%,rgba(242,201,107,.2),transparent 60%),radial-gradient(600px 400px at 0% 100%,rgba(95,191,143,.14),transparent 60%),linear-gradient(160deg,#071b14,#020806)}
.p0-ask::before{content:"";position:absolute;inset:0;z-index:0;background:linear-gradient(90deg,rgba(6,14,10,.97) 0%,rgba(6,14,10,.9) 45%,rgba(6,14,10,.55) 100%),url(img/exterior.webp) 70% 45%/cover;pointer-events:none}
.p0-ask>*{position:relative;z-index:1}
@media (max-width:820px){.p0-ask::before{background:linear-gradient(0deg,rgba(6,14,10,.97) 55%,rgba(6,14,10,.7)),url(img/exterior.webp) 60% 0%/cover}}
.p0-ask h3{font:900 clamp(1.9rem,4vw,3.4rem)/.98 var(--f-display);letter-spacing:-.035em;max-width:16ch}
.p0-ask h3 em{font-style:normal;color:var(--gold)}
.p0-ask>p{margin:14px 0 0;color:var(--ink2);max-width:64ch}
.p0-tr{display:grid;gap:0;margin-top:30px;border-radius:16px;overflow:hidden;border:1px solid var(--edge2)}
.p0-trbar{display:flex;height:56px}
.p0-trbar div{display:flex;align-items:center;justify-content:space-between;padding:0 16px;font:600 .82rem var(--f-hud);color:#1a1204}
.p0-trbar div:nth-child(1){background:linear-gradient(135deg,#ffe7a8,#f2c96b)}
.p0-trbar div:nth-child(2){background:linear-gradient(135deg,#f2c96b,#d9a94a)}
.p0-trbar div:nth-child(3){background:linear-gradient(135deg,#d9a94a,#b8862e)}
.p0-trm{display:grid;grid-template-columns:var(--cols);background:rgba(2,6,8,.6)}
.p0-trm div{padding:14px 16px;font-size:.84rem;line-height:1.5;color:var(--ink2);min-width:0}
.p0-trm div+div{border-left:1px solid var(--edge)}
.p0-trm b{display:block;font:500 .62rem var(--f-hud);letter-spacing:.16em;text-transform:uppercase;color:var(--gold2);margin-bottom:4px}
.p0-askg{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:14px}
.p0-askg div{padding:18px 20px;border-radius:16px;border:1px solid var(--edge);background:rgba(2,6,8,.55);min-width:0}
.p0-askg b{display:block;font:500 1.6rem var(--f-hud);color:var(--gold2)}
.p0-askg span{font-size:.85rem;color:var(--ink2)}
/* doors */
.p0-ways{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
.p0-way{position:relative;display:block;padding:26px 24px 24px;border-radius:22px;border:1px solid var(--edge);background:linear-gradient(170deg,var(--panel2),rgba(2,6,8,.7));color:var(--ink);text-decoration:none;transition:all .25s;min-width:0}
.p0-way:hover{border-color:var(--edge2);transform:translateY(-3px);box-shadow:0 30px 60px -30px rgba(242,201,107,.5)}
.p0-way .tm{font:500 2rem/1 var(--f-hud);color:var(--neon)}
.p0-way.here{border-color:rgba(95,191,143,.45)}
.p0-way.here::after{content:"You are here";position:absolute;right:18px;top:18px;font:500 .56rem var(--f-hud);letter-spacing:.18em;text-transform:uppercase;color:var(--neon);padding:4px 8px;border-radius:999px;border:1px solid rgba(95,191,143,.4)}
.p0-way h3{margin-top:14px;font:700 1.1rem var(--f-display)}
.p0-way p{margin:8px 0 0;font-size:.88rem;line-height:1.55;color:var(--ink2)}
.p0-way .go{display:inline-flex;align-items:center;gap:8px;margin-top:14px;font:600 .84rem var(--f-body);color:var(--gold2)}
.p0-way .go svg{width:16px;height:16px}
.p0-parts{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-top:14px}
.p0-parts a{display:block;padding:14px 16px;border-radius:14px;border:1px solid var(--edge);background:var(--panel);text-decoration:none;color:var(--ink);transition:border-color .2s;min-width:0}
.p0-parts a:hover{border-color:var(--pc)}
.p0-parts small{display:block;font:500 .58rem var(--f-hud);letter-spacing:.18em;text-transform:uppercase;color:var(--pc)}
.p0-parts b{display:block;margin-top:4px;font:700 .9rem var(--f-display)}
.p0-parts span{display:block;margin-top:3px;font-size:.78rem;line-height:1.4;color:var(--ink2)}

/* ================= the ten-minute presentation ================= */
.p0-qmap{display:grid;grid-template-columns:repeat(9,minmax(0,1fr));gap:8px}
.p0-qm{display:flex;flex-direction:column;padding:16px 14px;border-radius:16px;border:1px solid var(--edge);background:var(--panel);min-width:0;border-top:2px solid var(--qc)}
.p0-qm small{font:500 .6rem var(--f-hud);letter-spacing:.16em;color:var(--qc)}
.p0-qm b{display:block;margin-top:6px;font:700 .84rem/1.3 var(--f-display);flex:1}
.p0-qm span{display:flex;flex-wrap:wrap;gap:4px;margin-top:12px}
.p0-qm button{padding:3px 7px;border-radius:7px;border:1px solid var(--edge2);background:rgba(242,201,107,.06);color:var(--gold2);font:500 .66rem var(--f-hud);cursor:pointer}
.p0-qm button:hover{background:var(--gold);color:#1a1204}
.p0-keys{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}
.p0-key{padding:18px;border-radius:16px;border:1px solid var(--edge);background:var(--panel);min-width:0}
.p0-key kbd{display:inline-block;min-width:28px;padding:4px 8px;margin-right:4px;border-radius:7px;border:1px solid var(--edge2);border-bottom-width:3px;background:rgba(242,201,107,.06);font:500 .74rem var(--f-hud);color:var(--gold2);text-align:center}
.p0-key b{display:block;margin-top:12px;font:700 .92rem var(--f-display)}
.p0-key p{margin:4px 0 0;font-size:.84rem;line-height:1.5;color:var(--ink2)}
.p0-tl{position:relative;overflow-x:auto;padding:18px 20px 16px;border-radius:20px;border:1px solid var(--edge);background:linear-gradient(170deg,var(--panel2),rgba(2,6,8,.7))}
.p0-tl svg{display:block;width:100%;height:auto;overflow:visible}
.p0-tl .seg{cursor:pointer;transition:opacity .2s}
.p0-tl .seg:hover{opacity:.8}
.p0-tl .seg.on rect{stroke:#fff;stroke-width:2}
.p0-tll{display:flex;flex-wrap:wrap;gap:6px 14px;margin-top:12px}
.p0-tll span{display:inline-flex;align-items:center;gap:7px;font-size:.76rem;color:var(--ink2)}
.p0-tll i{width:10px;height:10px;border-radius:3px;background:var(--qc)}
.p0-deck{position:relative;border-radius:26px;border:1px solid var(--edge2);background:#010403;padding:14px;box-shadow:0 60px 120px -60px rgba(95,191,143,.55)}
.p0-top{display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding:2px 4px 12px}
.p0-top .ttl{font:500 .62rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--ink3);margin-right:auto}
.p0-top .ttl b{color:var(--gold2);font-weight:500}
.p0-stage{position:relative;aspect-ratio:16/9;border-radius:16px;overflow:hidden;container-type:inline-size;container-name:p0deck;background:#020a07}
.p0-prog{position:absolute;z-index:6;left:0;top:0;height:3px;background:linear-gradient(90deg,var(--neon),var(--gold));box-shadow:0 0 10px var(--neon);transition:width .5s ease}
.p0-slide{position:absolute;inset:0;display:none;grid-template-rows:auto minmax(0,1fr) auto;padding:3.2em 4em 2.4em;font-size:clamp(8px,1.3cqw,23px);line-height:1.5;color:var(--ink);isolation:isolate;
 background:radial-gradient(60em 34em at 88% 0%,rgba(95,191,143,.12),transparent 60%),radial-gradient(50em 30em at 0% 100%,rgba(242,201,107,.08),transparent 60%),linear-gradient(160deg,#061712,#020806)}
.p0-slide.on{display:grid;animation:p0sin .55s cubic-bezier(.2,.8,.2,1)}
.p0-slide.on.back{animation-name:p0sinb}
@keyframes p0sin{from{opacity:0;transform:translateX(2.5%)}}
@keyframes p0sinb{from{opacity:0;transform:translateX(-2.5%)}}
.p0-slide::after{content:"";position:absolute;inset:1.4em;border:1px solid rgba(242,201,107,.14);border-radius:1em;pointer-events:none;z-index:-1}
.p0-sbg{position:absolute;inset:0;z-index:-2;background-size:cover;background-position:center}
.p0-sbg::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(2,6,8,.95) 0%,rgba(2,6,8,.7) 45%,rgba(2,6,8,.15) 85%),linear-gradient(0deg,rgba(2,6,8,.9),transparent 50%)}
.p0-sbg.dim{filter:saturate(.85)}
.p0-sbg.dim::after{background:linear-gradient(90deg,rgba(2,8,6,.92) 0%,rgba(2,8,6,.78) 45%,rgba(2,8,6,.5) 100%),linear-gradient(0deg,rgba(2,8,6,.75),rgba(2,8,6,0) 40%)}
.p0-per .pi,.p0-why .pi{display:block;margin:-1em -1.3em .7em;aspect-ratio:16/4.4;background-size:cover;background-position:center;border-radius:1em 1em 0 0;border-bottom:1px solid rgba(242,201,107,.25)}
.p0-why .pi{margin:-1.4em -1.3em .2em;aspect-ratio:16/9}
.p0-per div,.p0-why div{overflow:hidden;backdrop-filter:blur(4px)}
.p0-sh{display:flex;justify-content:space-between;align-items:center;gap:1em}
.p0-q{display:inline-flex;align-items:center;gap:.7em;font:500 .78em var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--qc)}
.p0-q i{width:.6em;height:.6em;border-radius:50%;background:var(--qc);box-shadow:0 0 .8em var(--qc)}
.p0-sn{font:500 .78em var(--f-hud);letter-spacing:.2em;color:var(--ink3)}
.p0-sb{min-height:0;display:flex;flex-direction:column;justify-content:center;padding-block:1.2em .6em}
.p0-sf{display:flex;justify-content:space-between;gap:1em;font:500 .62em var(--f-hud);letter-spacing:.16em;text-transform:uppercase;color:var(--ink3)}
.p0-sf b{color:var(--gold2);font-weight:500}
.p0-T{font:900 3em/1 var(--f-display);letter-spacing:-.035em;max-width:17ch;margin:0}
.p0-T em{font-style:normal;background:linear-gradient(92deg,var(--neon2),var(--neon) 40%,var(--gold2));-webkit-background-clip:text;background-clip:text;color:transparent}
.p0-T.sm{font-size:2.5em}
.p0-L{margin:.9em 0 0;font-size:1.12em;color:var(--ink2);max-width:46ch}
.p0-2c{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:3em;align-items:center}
.p0-2c.w{grid-template-columns:minmax(0,1.25fr) minmax(0,1fr)}
.p0-2c.n{grid-template-columns:minmax(0,1fr) minmax(0,1.25fr)}
.p0-ph{position:relative;border-radius:1.2em;overflow:hidden;border:1px solid rgba(242,201,107,.35);aspect-ratio:16/10;box-shadow:0 2em 4em -2em rgba(0,0,0,.8)}
.p0-ph img{width:100%;height:100%;object-fit:cover;display:block}
.p0-ph figcaption,.p0-ctag{position:absolute;left:.9em;bottom:.8em;padding:.35em .8em;border-radius:99em;background:rgba(2,8,6,.8);border:1px solid rgba(242,201,107,.35);font:500 .6em var(--f-hud);letter-spacing:.16em;text-transform:uppercase;color:var(--gold2)}
.p0-ctag{left:auto;right:4.6em;top:4.4em;bottom:auto}
.p0-xcap{position:absolute;left:.9em;bottom:.8em;padding:.35em .8em;border-radius:99em;background:rgba(2,8,6,.8);border:1px solid rgba(242,201,107,.35);font:500 .6em var(--f-hud);letter-spacing:.16em;text-transform:uppercase;color:var(--gold2)}
.p0-pn{display:grid;gap:.55em;margin-top:1.4em}
.p0-pn div{display:grid;grid-template-columns:.7em 8em minmax(0,1fr);align-items:baseline;gap:.8em;font-size:.95em;color:var(--ink2)}
.p0-pn i{width:.7em;height:.7em;border-radius:50%;background:var(--c);box-shadow:0 0 .7em var(--c)}
.p0-pn b{font:700 1em var(--f-display);color:var(--ink)}
.p0-tiles{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1.1em;margin-top:2em}
.p0-tile{padding:1.5em 1.3em;border-radius:1.1em;border:1px solid rgba(95,191,143,.18);background:rgba(10,34,27,.55);min-width:0;position:relative;overflow:hidden}
.p0-tile::before{content:"";position:absolute;inset:0 0 auto;height:.15em;background:linear-gradient(90deg,transparent,var(--c,var(--neon)),transparent)}
.p0-tile b{display:block;font:500 2.6em/1 var(--f-hud);color:var(--c,var(--neon));white-space:nowrap}
.p0-tile p{margin:.8em 0 0;font-size:.92em;line-height:1.45;color:var(--ink2)}
.p0-tile .cite{font-size:.8em}
.p0-rings{position:relative;aspect-ratio:1;max-height:100%;width:min(100%,26em);margin:auto}
.p0-rings svg{width:100%;height:100%;display:block}
.p0-big{display:grid;gap:1.1em}
.p0-big div{padding:1.1em 1.3em;border-radius:1em;border:1px solid rgba(95,191,143,.18);background:rgba(10,34,27,.5)}
.p0-big b{display:block;font:500 1.9em/1 var(--f-hud);color:var(--gold2)}
.p0-big span{display:block;margin-top:.45em;font-size:.92em;color:var(--ink2);line-height:1.45}
.p0-per{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.8em;margin-top:1em}
.p0-per div{padding:1em 1.3em;border-radius:1em;border:1px solid rgba(95,191,143,.16);background:rgba(10,34,27,.5);min-width:0}
.p0-per small{display:block;font:500 .66em var(--f-hud);letter-spacing:.16em;text-transform:uppercase;color:var(--gold)}
.p0-per b{display:block;margin-top:.3em;font:700 1.05em var(--f-display)}
.p0-per p{margin:.3em 0 0;font-size:.82em;line-height:1.4;color:var(--ink2)}
.p0-why{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1.1em;margin-top:2em}
.p0-why div{padding:1.4em 1.3em;border-radius:1.1em;border:1px solid rgba(95,191,143,.16);background:rgba(10,34,27,.5);min-width:0}
.p0-why svg{width:2.4em;height:2.4em;color:var(--neon2)}
.p0-why b{display:block;margin-top:.8em;font:700 1.08em/1.25 var(--f-display)}
.p0-why em{display:block;margin-top:.6em;font:500 1.5em var(--f-hud);font-style:normal;color:var(--gold2)}
.p0-why p{margin:.5em 0 0;font-size:.88em;line-height:1.45;color:var(--ink2)}
.p0-chips{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1em;margin-top:2.2em;max-width:62em}
.p0-chips div{padding:1.1em 1.3em;border-radius:1em;border:1px solid rgba(242,201,107,.32);background:rgba(2,10,8,.65);backdrop-filter:blur(8px)}
.p0-chips small{font:500 .64em var(--f-hud);letter-spacing:.18em;text-transform:uppercase;color:var(--neon)}
.p0-chips b{display:block;margin-top:.3em;font:700 1.08em var(--f-display)}
.p0-chips p{margin:.35em 0 0;font-size:.86em;line-height:1.45;color:var(--ink2)}
.p0-flow{position:relative;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:1em;margin-top:2.4em;padding-top:4.2em}
.p0-flow svg{position:absolute;left:0;top:0;width:100%;height:4.2em;overflow:visible}
.p0-flow svg path{fill:none;stroke:#5fbf8f;stroke-width:2;filter:drop-shadow(0 0 4px rgba(95,191,143,.7))}
.p0-flow>div{position:relative;padding:1.2em 1.1em;border-radius:1em;border:1px solid rgba(95,191,143,.18);background:rgba(10,34,27,.55);min-width:0}
.p0-flow>div::before{content:"";position:absolute;left:1.3em;top:-2.4em;width:.9em;height:.9em;border-radius:50%;background:#020806;border:2px solid var(--gold);box-shadow:0 0 .8em var(--gold)}
.p0-flow .t{font:500 1.6em var(--f-hud);color:var(--neon)}
.p0-flow b{display:block;margin-top:.2em;font:700 1em var(--f-display)}
.p0-flow p{margin:.35em 0 0;font-size:.84em;line-height:1.45;color:var(--ink2)}
.p0-spd{display:flex;flex-wrap:wrap;gap:.7em;margin-top:1.6em}
.p0-spd span{padding:.45em .9em;border-radius:99em;border:1px solid rgba(242,201,107,.3);font-size:.86em;color:var(--ink2)}
.p0-spd b{font:500 1em var(--f-hud);color:var(--gold2)}
.p0-xp{position:relative;border-radius:1.2em;overflow:hidden;border:1px solid rgba(242,201,107,.35);aspect-ratio:16/9}
.p0-xp img{width:100%;height:100%;object-fit:cover;display:block}
.p0-xp i{position:absolute;width:2em;height:2em;margin:-1em 0 0 -1em;border-radius:50%;background:var(--gold);color:#1a1204;font:700 .9em/2em var(--f-hud);font-style:normal;text-align:center;box-shadow:0 0 0 .5em rgba(242,201,107,.25),0 0 1.2em var(--gold)}
.p0-xl{list-style:none;margin:0;padding:0;display:grid;gap:.75em;counter-reset:x}
.p0-xl li{display:grid;grid-template-columns:2em minmax(0,1fr);gap:.8em;font-size:.92em;line-height:1.45;color:var(--ink2);counter-increment:x}
.p0-xl li::before{content:counter(x);width:2em;height:2em;border-radius:50%;display:grid;place-items:center;border:1px solid rgba(242,201,107,.5);font:700 .85em var(--f-hud);color:var(--gold2)}
.p0-xl b{display:block;color:var(--ink);font-family:var(--f-display)}
.p0-ck{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:1em;margin-top:1.4em}
.p0-ck>div{padding:1.2em 1.3em;border-radius:1em;border:1px solid rgba(95,191,143,.18);background:rgba(10,34,27,.5)}
.p0-ck b{font:500 2em/1 var(--f-hud);color:var(--neon)}
.p0-ck small{display:block;margin-top:.3em;font:500 .66em var(--f-hud);letter-spacing:.16em;text-transform:uppercase;color:var(--gold)}
.p0-ck ul{margin:.6em 0 0;padding:0;list-style:none;display:flex;flex-wrap:wrap;gap:.35em}
.p0-ck li{padding:.2em .6em;border-radius:99em;border:1px solid rgba(95,191,143,.2);font-size:.74em;color:var(--ink2)}
.p0-funnel{display:flex;align-items:center;gap:.8em;margin-top:1.1em;font-size:.9em;color:var(--ink2);flex-wrap:wrap}
.p0-funnel b{font:500 1.5em var(--f-hud);color:var(--gold2)}
.p0-funnel i{font-style:normal;color:var(--gold)}
.p0-cards{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:.8em}
.p0-card{position:relative;aspect-ratio:1.586;border-radius:.8em;padding:.8em .9em;display:flex;flex-direction:column;justify-content:space-between;color:#fff;overflow:hidden;box-shadow:0 1em 2em -1em rgba(0,0,0,.9),inset 0 0 0 1px rgba(255,255,255,.14)}
.p0-card::after{content:"";position:absolute;inset:0;background:linear-gradient(115deg,transparent 40%,rgba(255,255,255,.18) 50%,transparent 60%)}
.p0-card small{font:500 .52em var(--f-hud);letter-spacing:.16em;text-transform:uppercase;opacity:.85}
.p0-card b{font:700 .82em/1.1 var(--f-display)}
.p0-card span{font:500 .62em var(--f-hud)}
.p0-mrow{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1em;margin-top:1.4em}
.p0-mrow div{padding:1em 1.2em;border-radius:1em;border:1px solid rgba(95,191,143,.18);background:rgba(10,34,27,.5);min-width:0}
.p0-mrow b{display:block;font:500 1.45em/1.1 var(--f-hud);color:var(--gold2)}
.p0-mrow span{display:block;margin-top:.35em;font-size:.84em;line-height:1.4;color:var(--ink2)}
.p0-ring svg{width:100%;max-height:100%;display:block}
.p0-team{display:grid;gap:.5em;margin-top:1.2em}
.p0-team div{display:flex;justify-content:space-between;gap:1em;padding:.6em .9em;border-radius:.7em;border:1px solid rgba(95,191,143,.14);background:rgba(10,34,27,.45);font-size:.86em;color:var(--ink2)}
.p0-team b{font:500 1em var(--f-hud);color:var(--ink);white-space:nowrap}
.p0-mx{width:100%;border-collapse:separate;border-spacing:0 .35em;margin-top:1.4em;font-size:.9em}
.p0-mx th{font:500 .72em var(--f-hud);letter-spacing:.12em;text-transform:uppercase;color:var(--ink3);text-align:center;padding:0 .4em .2em;font-weight:500}
.p0-mx th:first-child{text-align:left}
.p0-mx td{padding:.55em .5em;background:rgba(10,34,27,.45);text-align:center;color:var(--ink2)}
.p0-mx td:first-child{text-align:left;border-radius:.6em 0 0 .6em;color:var(--ink);font-weight:600;padding-left:1em}
.p0-mx td:last-child{border-radius:0 .6em .6em 0}
.p0-mx tr.us td{background:linear-gradient(90deg,rgba(95,191,143,.22),rgba(95,191,143,.08));color:var(--ink)}
.p0-mx tr.us td:first-child{color:var(--neon2)}
.p0-dot{display:inline-block;width:.85em;height:.85em;border-radius:50%;border:1.5px solid var(--neon)}
.p0-dot.f{background:var(--neon);box-shadow:0 0 .6em var(--neon)}
.p0-dot.h{background:linear-gradient(90deg,var(--neon) 50%,transparent 50%)}
.p0-dot.o{border-color:rgba(169,196,184,.35)}
.p0-fk{display:grid;gap:.9em}
.p0-fk div{padding:1em 1.2em;border-radius:1em;border:1px solid rgba(95,191,143,.18);background:rgba(10,34,27,.5)}
.p0-fk b{display:block;font:500 1.6em/1 var(--f-hud);color:var(--ink)}
.p0-fk b.neg{color:#ff9f8b}.p0-fk b.g{color:var(--gold2)}
.p0-fk span{display:block;margin-top:.35em;font-size:.84em;color:var(--ink2)}
.p0-cbox{padding:1.2em 1.3em .8em;border-radius:1.1em;border:1px solid rgba(95,191,143,.16);background:rgba(2,8,6,.55)}
.p0-cbox h4{margin:0 0 .4em;font:700 .95em var(--f-display)}
.p0-cbox .p0-ax{font-size:11px}
.p0-uf{display:grid;gap:.75em}
.p0-uf div{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:.3em 1em;font-size:.88em;color:var(--ink2)}
.p0-uf b{font:500 1em var(--f-hud);color:var(--gold2)}
.p0-uf i{grid-column:1/-1;height:.55em;border-radius:99em;background:rgba(169,196,184,.12);overflow:hidden}
.p0-uf em{display:block;height:100%;border-radius:99em;background:linear-gradient(90deg,var(--neon),var(--gold))}
.p0-trs{display:grid;gap:.7em}
.p0-trs div{display:grid;grid-template-columns:4.2em minmax(0,1fr);gap:1em;align-items:center;padding:.9em 1.1em;border-radius:1em;border:1px solid rgba(242,201,107,.3);background:rgba(242,201,107,.06)}
.p0-trs b{font:500 1.5em/1 var(--f-hud);color:var(--gold2)}
.p0-trs span{font-size:.84em;line-height:1.4;color:var(--ink2)}
.p0-trs strong{display:block;color:var(--ink);font:600 .95em var(--f-hud)}
.p0-own{display:grid;grid-template-columns:auto minmax(0,1fr);gap:2em;align-items:center}
.p0-donut{width:15em;height:15em;display:block}
.p0-dn1{fill:#effaf5;font:500 30px var(--f-hud)}
.p0-dn2{fill:#a9c4b8;font:500 10px var(--f-hud);letter-spacing:.06em}
.p0-lg{display:grid;gap:.5em}
.p0-lg div{display:flex;align-items:center;gap:.7em;font-size:.92em;color:var(--ink2)}
.p0-lg i{width:.8em;height:.8em;border-radius:.2em}
.p0-lg b{font:500 1em var(--f-hud);color:var(--ink);margin-left:auto}
.p0-close{margin-top:1.6em;padding-top:1.2em;border-top:1px solid rgba(242,201,107,.25);font:300 1.6em/1.25 var(--f-display);color:var(--gold2)}
/* deck controls */
.p0-bar0{display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding:12px 4px 2px}
.p0-ib{display:inline-flex;align-items:center;justify-content:center;gap:8px;height:42px;min-width:42px;padding:0 13px;border-radius:12px;border:1px solid var(--edge);background:rgba(10,34,27,.55);color:var(--ink);font:600 .8rem var(--f-body);cursor:pointer;transition:all .2s}
.p0-ib:hover{border-color:var(--edge2);color:var(--gold2)}
.p0-ib.on{border-color:var(--gold);color:var(--gold2);background:rgba(242,201,107,.1)}
.p0-ib svg{width:17px;height:17px;flex:none}
.p0-ib.pri{background:linear-gradient(135deg,var(--gold2),var(--gold));color:#1a1204;border-color:transparent}
.p0-cnt{font:500 .86rem var(--f-hud);color:var(--ink2);min-width:72px;text-align:center}
.p0-cnt b{color:var(--ink);font-weight:500}
.p0-sp{flex:1}
.p0-tmr{display:flex;align-items:center;gap:10px;padding:5px 6px 5px 14px;border-radius:14px;border:1px solid var(--edge2);background:rgba(242,201,107,.05)}
.p0-tmr .big{font:500 1.25rem var(--f-hud);color:var(--gold2);min-width:58px;letter-spacing:.04em}
.p0-tmr .big.over{color:#ff9f8b}
.p0-tmr small{display:block;font:500 .56rem var(--f-hud);letter-spacing:.16em;text-transform:uppercase;color:var(--ink3)}
.p0-strip{display:flex;gap:2px;margin:12px 4px 0;height:10px}
.p0-strip button{position:relative;height:100%;padding:0;border:0;border-radius:3px;background:rgba(169,196,184,.14);cursor:pointer;overflow:hidden}
.p0-strip button i{position:absolute;left:0;top:0;bottom:0;width:0;background:var(--qc);opacity:.9}
.p0-strip button.on{outline:1px solid var(--gold2);outline-offset:1px}
.p0-low{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:14px;margin-top:12px}
.p0-notes{padding:20px 22px;border-radius:18px;border:1px solid var(--edge);background:var(--panel);min-width:0}
.p0-notes h4{margin:0;display:flex;justify-content:space-between;gap:10px;font:500 .62rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--gold)}
.p0-notes h4 span{color:var(--ink3)}
.p0-notes .nt{margin-top:10px;color:var(--ink);font-size:.98rem;line-height:1.7;max-height:300px;overflow:auto;padding-right:8px}
.p0-notes .nt p{margin:0 0 .8em}
.p0-notes .nt b{color:var(--gold2)}
.p0-notes.hide .nt{display:none}
.p0-pace{padding:20px 22px;border-radius:18px;border:1px solid var(--edge2);background:linear-gradient(150deg,rgba(242,201,107,.1),rgba(2,6,8,.6));display:grid;gap:14px;align-content:start}
.p0-pace small{display:block;font:500 .58rem var(--f-hud);letter-spacing:.18em;text-transform:uppercase;color:var(--ink3)}
.p0-pace b{display:block;margin-top:3px;font:500 1.3rem var(--f-hud);color:var(--ink)}
.p0-pace .bud{height:8px;border-radius:99px;background:rgba(169,196,184,.14);overflow:hidden;margin-top:8px}
.p0-pace .bud i{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--neon),var(--gold));transition:width .25s linear}
.p0-pace .bud.over i{background:#ff8f7a}
.p0-pace .st{font:600 .9rem var(--f-body)}
.p0-pace .st.ok{color:var(--neon)}.p0-pace .st.bh{color:#ff9f8b}.p0-pace .st.ah{color:var(--gold2)}
.p0-ov{position:absolute;inset:0;z-index:8;display:none;overflow:auto;padding:16px;background:rgba(1,6,4,.96);backdrop-filter:blur(8px)}
.p0-ov.on{display:block}
.p0-ovg{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}
.p0-ovg button{position:relative;text-align:left;padding:0;border-radius:12px;overflow:hidden;border:1px solid var(--edge);background:var(--panel);color:var(--ink);cursor:pointer;transition:all .2s;min-width:0}
.p0-ovg button:hover{border-color:var(--edge2);transform:translateY(-2px)}
.p0-ovg button.on{border-color:var(--gold);box-shadow:0 0 0 1px var(--gold)}
.p0-ovg .im{display:block;aspect-ratio:16/7;background-size:cover;background-position:center;filter:brightness(.6) saturate(.85)}
.p0-ovg .im.nob{background:radial-gradient(circle at 70% 20%,rgba(95,191,143,.22),transparent 60%),linear-gradient(160deg,#08251b,#030b08)}
.p0-ovg .tx{display:block;padding:9px 11px 11px}
.p0-ovg small{display:flex;justify-content:space-between;font:500 .56rem var(--f-hud);letter-spacing:.14em;text-transform:uppercase;color:var(--qc)}
.p0-ovg b{display:block;margin-top:4px;font:700 .8rem/1.25 var(--f-display)}
.p0-deck:fullscreen{display:flex;flex-direction:column;justify-content:center;border-radius:0;border:0;padding:12px 16px;background:#000;overflow:auto}
.p0-deck:fullscreen .p0-stage{width:min(100%,calc((100vh - 120px) * 16 / 9));margin:0 auto;flex:none}
.p0-deck:fullscreen .p0-low,.p0-deck:fullscreen .p0-top{display:none}
.p0-deck:fullscreen .p0-bar0,.p0-deck:fullscreen .p0-strip{width:min(100%,calc((100vh - 120px) * 16 / 9));margin-inline:auto}
.p0-deck:fullscreen.notes .p0-low{display:grid;width:min(100%,calc((100vh - 120px) * 16 / 9));margin-inline:auto}
.p0-canva{display:flex;gap:14px;align-items:flex-start;margin-top:14px;padding:16px 18px;border-radius:16px;border:1px dashed var(--edge2);background:rgba(242,201,107,.04);font-size:.88rem;color:var(--ink2)}
.p0-canva svg{width:22px;height:22px;flex:none;color:var(--gold)}
.p0-canva b{color:var(--ink)}
.p0-tbl{width:100%;border-collapse:collapse;font-size:.9rem}
.p0-tbl th,.p0-tbl td{padding:12px 14px;border-bottom:1px solid var(--edge);text-align:right}
.p0-tbl th{font:500 .6rem var(--f-hud);letter-spacing:.18em;text-transform:uppercase;color:var(--ink3)}
.p0-tbl td{font:500 .9rem var(--f-hud);color:var(--ink)}
.p0-tbl th:first-child,.p0-tbl td:first-child{text-align:left;font:500 .9rem var(--f-body);color:var(--ink2)}
.p0-tbl td.b{color:var(--gold2)}
.p0-tblw{overflow-x:auto;border-radius:18px;border:1px solid var(--edge);background:var(--panel);padding:6px 10px}

@media (max-width:1150px){
 .p0-facts{grid-template-columns:repeat(3,minmax(0,1fr))}.p0-facts div:nth-child(4){border-left:0}
 .p0-tri,.p0-ways{grid-template-columns:1fr}.p0-tc{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.2fr)}.p0-tv{aspect-ratio:auto;min-height:240px}
 .p0-path{grid-template-columns:repeat(3,minmax(0,1fr))}
 .p0-exp{grid-template-columns:1fr}
 .p0-kpi{grid-template-columns:repeat(3,minmax(0,1fr))}
 .p0-ch{grid-template-columns:repeat(3,minmax(0,1fr))}
 .p0-parts{grid-template-columns:repeat(2,minmax(0,1fr))}
 .p0-qmap{grid-template-columns:repeat(3,minmax(0,1fr))}
 .p0-keys{grid-template-columns:repeat(2,minmax(0,1fr))}
 .p0-low{grid-template-columns:1fr}
}
@media (max-width:820px){
 .p0-facts{grid-template-columns:1fr 1fr}.p0-facts div{border-left:0!important;border-top:1px solid var(--edge)}.p0-facts div:first-child{grid-column:1/-1;border-top:0}
 .p0-tc{display:flex}.p0-tv{aspect-ratio:16/10;min-height:0}
 .p0-path{grid-template-columns:1fr}.p0-st0{flex-direction:row}.p0-st0 .ph{width:38%;flex:none;aspect-ratio:auto;min-height:170px}
 .p0-kpi{grid-template-columns:1fr 1fr}.p0-kpi .p0-k:last-child{grid-column:1/-1}
 .p0-pl{aspect-ratio:auto;min-height:600px}
 .p0-cap{left:20px;right:20px;max-width:none;bottom:auto;top:calc(5% + 70px)}
 .p0-cap p{font-size:.94rem}
 .p0-stat{left:20px;right:20px;width:auto;bottom:calc(5% + 84px)}
 .p0-ctl{left:20px;right:20px}.p0-ctl .tag{display:none}
 .p0-segs{left:20px;right:20px}.p0-tc0{left:20px}
 .p0-ch{grid-template-columns:repeat(2,minmax(0,1fr))}
 .p0-ask{padding:30px 20px}.p0-trbar div{padding:0 8px;font-size:.7rem}.p0-trbar div span{display:none}
 .p0-trm{grid-template-columns:1fr!important}.p0-trm div+div{border-left:0;border-top:1px solid var(--edge)}
 .p0-askg,.p0-parts{grid-template-columns:1fr}
 .p0-qmap,.p0-keys{grid-template-columns:1fr 1fr}
 .p0-deck{padding:8px;border-radius:18px}
 .p0-stage{aspect-ratio:auto;min-height:520px}
 .p0-slide{position:relative;inset:auto;min-height:520px;font-size:12.5px;padding:2.2em 1.6em 1.8em}
 .p0-slide::after{inset:.7em}
 .p0-T{font-size:2.05em}.p0-T.sm{font-size:1.9em}
 .p0-2c,.p0-2c.w,.p0-2c.n,.p0-own{grid-template-columns:1fr;gap:1.4em}
 .p0-tiles,.p0-why,.p0-per{grid-template-columns:1fr 1fr}
 .p0-chips,.p0-mrow{grid-template-columns:1fr}
 .p0-flow{grid-template-columns:1fr;padding-top:0}.p0-flow svg{display:none}.p0-flow>div::before{display:none}
 .p0-cards{grid-template-columns:repeat(3,minmax(0,1fr))}
 .p0-ck{grid-template-columns:1fr}
 .p0-hide-s{display:none!important}
 .p0-donut{margin:auto}
 .p0-sbg::after{background:linear-gradient(0deg,rgba(2,6,8,.97) 35%,rgba(2,6,8,.55))}
 .p0-ctag{right:2em;bottom:1.6em}
 .p0-ovg{grid-template-columns:1fr 1fr}
 .p0-bar0 .lbl{display:none}
 .p0-tmr{width:100%;justify-content:space-between}
 .p0-mx{font-size:.78em}
 .p0-cbox .p0-ax{font-size:17px}.p0-cbox .p0-ax.s{font-size:14px}.p0-cbox .p0-val{font-size:17px}
 .p0-chartbox .p0-ax{font-size:15px}.p0-chartbox .p0-ax.s{font-size:13px}.p0-chartbox .p0-val{font-size:19px}
 .p0-tl svg{min-width:720px}
}
`;

/* ---------- small svg icons ---------- */
const SV=(p,w)=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w||1.7}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
const I={play:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>',pause:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>',
 prev:SV('<path d="M15 6l-6 6 6 6"/>',2),next:SV('<path d="M9 6l6 6-6 6"/>',2),restart:SV('<path d="M4 12a8 8 0 1 0 2.3-5.7M4 4v4h4"/>'),
 grid:SV('<rect x="4" y="4" width="6" height="6" rx="1.5"/><rect x="14" y="4" width="6" height="6" rx="1.5"/><rect x="4" y="14" width="6" height="6" rx="1.5"/><rect x="14" y="14" width="6" height="6" rx="1.5"/>'),
 notes:SV('<path d="M6 4h9l3 3v13H6z"/><path d="M9 10h6M9 14h6M9 18h3"/>'),full:SV('<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>'),
 timer:SV('<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2M9 2h6"/>'),reset:SV('<path d="M4 12a8 8 0 1 0 2.3-5.7M4 4v4h4"/>'),
 canva:SV('<path d="M4 5h16v11H4z"/><path d="M9 20h6M12 16v4"/><path d="M8 12l2.5-3 2 2 3.5-4"/>'),
 heart:'<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/><path d="M5 12h3l1.5-3 3 6 1.5-3h5"/>',
 phone:'<rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M10 18h4"/><path d="M9 9h6M9 12h4"/>',
 city:'<path d="M3 21h18M5 21V9l5-3v15M10 21V4l9 4v13"/><path d="M13 10h3M13 13h3M13 16h3"/>',
 globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/>'};

/* ============================================================
   v2 SHARED · language switch, image fallbacks, visited tracking, extra icons
   ============================================================ */
const LS={get(k,d){try{const v=localStorage.getItem(k);return v===null?d:v}catch(e){return d}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
let LANG=LS.get('afyaLang','en')==='sw'?'sw':'en';
try{document.documentElement.classList.toggle('p0-swon',LANG==='sw')}catch(e){}
const L=(en,sw)=>`<x-en class="p0-en">${en}</x-en><x-sw class="p0-sw" lang="sw">${sw}</x-sw>`;
/* new photos arriving: fall back to an existing photo until the file exists */
const FB={scan:'interior',pay:'team',dad:'check',diaspora:'boxdoor',bibi:'boxdoor',advice:'team'};
window.p0fb=function(el){try{const l=(el.getAttribute('data-fb')||'').split('|').filter(Boolean);if(!l.length){el.onerror=null;return}el.setAttribute('data-fb',l.slice(1).join('|'));el.src=l[0]}catch(e){}};
/* visited sections, for the reading-path ticks (router hash) */
const VKEY='afyaVisited';
const visited=()=>{try{return new Set(JSON.parse(localStorage.getItem(VKEY)||'[]'))}catch(e){return new Set()}};
const addVisit=k=>{const v=visited();if(v.has(k))return;v.add(k);LS.set(VKEY,JSON.stringify([...v]))};
const markVisit=()=>{const id=(location.hash||'').slice(1);if(/^s\d-\d$/.test(id))addVisit(id)};
try{window.addEventListener('hashchange',markVisit);markVisit()}catch(e){}
Object.assign(I,{
 search:SV('<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>'),
 print:SV('<path d="M7 8V3h10v5"/><rect x="3" y="8" width="18" height="9" rx="2"/><path d="M7 14h10v7H7z"/>'),
 copy:SV('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>'),
 tick:SV('<path d="M5 12.5l4.2 4.2L19 7"/>',2.2),
 pres:SV('<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/><path d="M14 8h4M14 11h4"/><rect x="6" y="7" width="5" height="5" rx="1"/>'),
 help:SV('<circle cx="12" cy="12" r="9"/><path d="M9.5 9.3a2.6 2.6 0 0 1 5 .9c0 1.8-2.5 2.2-2.5 3.8M12 17.2v.3"/>'),
 rehearse:SV('<path d="M4 12a8 8 0 1 0 8-8"/><path d="M12 8v4l3 2"/><path d="M4 4v4h4"/>'),
 close:SV('<path d="M6 6l12 12M18 6L6 18"/>',2),
 film:SV('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M10 9.5v5l4.5-2.5z"/>'),
 down:SV('<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>')});

/* module titles in Kiswahili (secShell escapes titles, so they are swapped in after render) */
const MT={
 'Watch it work · the video library':'Tazama inavyofanya kazi · maktaba ya video',
 'Find your way · reading paths and search':'Pata njia yako · njia za kusoma na utafutaji',
 'The problem in one line':'Tatizo kwa mstari mmoja',
 'The one-page investor summary':'Muhtasari wa ukurasa mmoja kwa mwekezaji',
 'Our answer · one store, one membership, one app':'Jibu letu · duka moja, uanachama mmoja, programu moja',
 'How it works · from a reading to the doorstep':'Jinsi inavyofanya kazi · kutoka kipimo hadi mlangoni',
 'The experience · six moments, photographed':'Uzoefu · matukio sita kwa picha',
 'Try it · the 60-second story':'Jaribu · hadithi ya sekunde 60',
 'The numbers · five that matter, with the working shown':'Namba · tano muhimu, pamoja na hesabu zake',
 'The ask · what we need, what you get':'Ombi letu · tunachohitaji, unachopata',
 'Ask the showroom · 26 investor questions':'Uliza showroom · maswali 26 ya wawekezaji',
 'Risks and our answer':'Hatari na jibu letu',
 'Where to go next · all eight parts':'Uende wapi sasa · sehemu zote nane',
 'Investor takeaway':'Hoja kuu kwa mwekezaji','Sources':'Vyanzo',
 'The problem it solves':'Tatizo linalotatuliwa',
 'Our answer · nine questions, sixteen slides':'Jibu letu · maswali tisa, slaidi kumi na sita',
 'How it works · the presenter’s controls':'Jinsi inavyofanya kazi · vidhibiti vya mwasilishaji',
 'The experience · the ten minutes, drawn':'Uzoefu · dakika kumi, kwa mchoro',
 'Try it · the presentation':'Jaribu · wasilisho',
 'Rehearse it · presenter mode and timed run-through':'Fanya mazoezi · hali ya mwasilishaji na mazoezi yenye muda',
 'The numbers · what the deck quotes, in all three cases':'Namba · zinazotajwa kwenye wasilisho, katika hali zote tatu'};
const swNote=`<span class="p0v-swnote">Rasimu ya Kiswahili · itakaguliwa na mzungumzaji asilia</span>`;
const langHTML=()=>`<div class="p0v-lang" role="group" aria-label="Language / Lugha"><button type="button" data-lang="en" aria-pressed="${LANG==='en'}">English</button><button type="button" data-lang="sw" aria-pressed="${LANG==='sw'}">Kiswahili</button></div>`;
const PH={q:['Try: diaspora, break-even, TMDA, nappies, tranche','Jaribu: diaspora, faida, TMDA, nepi, awamu'],f:['Filter the questions…','Chuja maswali…']};
function applyLang(){try{document.documentElement.classList.toggle('p0-swon',LANG==='sw')}catch(e){}
 document.querySelectorAll('.p0v-lang button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.lang===LANG));
 document.querySelectorAll('.p0v2 .mod01:not(.v3mod)>.modno').forEach(m=>{if(!m.dataset.en)m.dataset.en=m.textContent;const t=m.dataset.en,ix=t.indexOf(' · '),no=ix>0&&/^\d+$/.test(t.slice(0,ix))?t.slice(0,ix+3):'',ti=no?t.slice(ix+3):t;m.textContent=LANG==='sw'&&MT[ti]?no+MT[ti]:t});
 const q=document.getElementById('p0q');if(q)q.placeholder=PH.q[LANG==='sw'?1:0];const f=document.getElementById('p0fq');if(f)f.placeholder=PH.f[LANG==='sw'?1:0];
 try{document.documentElement.lang=LANG==='sw'?'sw':'en'}catch(e){}}
function setLang(k){LANG=k==='sw'?'sw':'en';LS.set('afyaLang',LANG);applyLang()}
function wireLang(){document.querySelectorAll('.p0v-lang button').forEach(b=>b.onclick=()=>setLang(b.dataset.lang));
 if(!document.getElementById('p0langfx')){const fx=document.createElement('div');fx.id='p0langfx';fx.innerHTML=langHTML()+swNote;document.body.appendChild(fx);fx.querySelectorAll('button').forEach(b=>b.onclick=()=>setLang(b.dataset.lang));let io=null;try{const hero=document.querySelector('.p0v2 .s01hero');io=new IntersectionObserver(es=>es.forEach(e=>fx.classList.toggle('on',!e.isIntersecting)),{threshold:0});if(hero)io.observe(hero)}catch(e){fx.classList.add('on')}cleanups.push(()=>{fx.remove();if(io)io.disconnect()})}
 applyLang()}

/* ---------- v2 CSS ---------- */
const CSS2=`
.p0-en{display:contents!important}.p0-sw{display:none!important}
html.p0-swon .p0-en{display:none!important}html.p0-swon .p0-sw{display:contents!important}
.p0v-lang{display:inline-flex;gap:3px;padding:3px;border-radius:999px;border:1px solid var(--edge2);background:rgba(2,10,8,.66);backdrop-filter:blur(8px)}
.p0v-lang button{padding:7px 13px;border:0;border-radius:999px;background:none;color:var(--ink2);font:600 .76rem var(--f-body);cursor:pointer;letter-spacing:.01em}
.p0v-lang button[aria-pressed="true"]{background:linear-gradient(135deg,var(--neon2),var(--neon));color:#03130d}
.p0v-swnote{display:none;font:500 .6rem/1.4 var(--f-hud);letter-spacing:.14em;text-transform:uppercase;color:var(--gold2)}
html.p0-swon .p0v-swnote{display:inline-block!important;padding:6px 10px;border-radius:999px;border:1px dashed rgba(242,201,107,.45);background:rgba(2,10,8,.6)}
#p0langfx{position:fixed;z-index:70;bottom:18px;right:18px;display:flex;flex-direction:column-reverse;align-items:flex-end;gap:6px;opacity:0;transform:translateY(10px);pointer-events:none;transition:opacity .3s,transform .3s}
#p0langfx.on{opacity:1;transform:none;pointer-events:auto}
#p0langfx .p0v-lang{box-shadow:0 20px 40px -10px rgba(0,0,0,.8)}
#p0langfx{display:none!important}
.p0v2 .s01hero .s01in{padding-bottom:46px}
.p0v-htop{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin-top:22px}
.p0v-hn{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));margin-top:30px;border-radius:20px;overflow:hidden;border:1px solid rgba(242,201,107,.28);background:rgba(2,10,8,.58);backdrop-filter:blur(12px);max-width:1040px}
.p0v-hn div{padding:16px 18px;min-width:0}
.p0v-hn div+div{border-left:1px solid var(--edge)}
.p0v-hn b{display:block;font:500 clamp(1.05rem,1.7vw,1.5rem)/1.05 var(--f-hud);color:var(--ink);white-space:nowrap}
.p0v-hn div:last-child b{color:var(--gold2)}
.p0v-hn span{display:block;margin-top:6px;font-size:.74rem;line-height:1.35;color:var(--ink2)}
.p0v-hn small{display:block;font:500 .52rem var(--f-hud);letter-spacing:.18em;text-transform:uppercase;color:var(--neon);margin-bottom:6px}
/* video library */
.p0v-lib{display:grid;grid-template-columns:minmax(0,1.75fr) minmax(0,1fr);gap:16px;margin-top:22px}
.p0v-main{min-width:0;border-radius:26px;border:1px solid var(--edge2);background:linear-gradient(170deg,var(--panel2),rgba(2,6,8,.85));overflow:hidden;box-shadow:0 60px 120px -60px rgba(95,191,143,.5)}
.p0v-box{position:relative;aspect-ratio:16/9;background:#000;outline:none}
.p0v-box:focus-visible{box-shadow:inset 0 0 0 2px var(--neon)}
.p0v-box video{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;background:#000;display:block}
.p0v-box .p0k-cap{top:14px;right:14px}
.p0v-big{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:flex;align-items:center;gap:14px;padding:10px 24px 10px 10px;border-radius:999px;border:1px solid rgba(255,231,168,.5);background:rgba(2,10,8,.66);backdrop-filter:blur(10px);color:var(--ink);cursor:pointer;font:600 .95rem var(--f-body);transition:transform .25s,background .25s;z-index:3}
.p0v-big span{width:54px;height:54px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(135deg,var(--gold2),var(--gold));color:#1a1204;box-shadow:0 0 34px -4px var(--gold)}
.p0v-big svg{width:22px;height:22px;margin-left:3px}
.p0v-big:hover{transform:translate(-50%,-50%) scale(1.04);background:rgba(2,10,8,.8)}
.p0v-big[hidden]{display:none}
.p0v-prod{position:absolute;inset:0;z-index:4;display:grid;grid-template-columns:minmax(0,1fr);align-items:end;background:#020806}
.p0v-prod[hidden]{display:none}
.p0v-prod>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:saturate(.75) brightness(.55)}
.p0v-prod::before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(2,6,8,.95),rgba(2,6,8,.55) 55%,rgba(2,6,8,.2)),linear-gradient(0deg,rgba(2,6,8,.9),transparent 50%)}
.p0v-prod .in{position:relative;padding:28px 32px;max-width:640px}
.p0v-prod .badge{display:inline-flex;align-items:center;gap:8px;padding:6px 12px;border-radius:999px;border:1px solid rgba(242,201,107,.5);font:500 .6rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--gold2);background:rgba(2,10,8,.6)}
.p0v-prod .badge i{width:7px;height:7px;border-radius:50%;background:var(--gold);box-shadow:0 0 10px var(--gold);animation:p0blink 1.6s ease-in-out infinite}
@keyframes p0blink{50%{opacity:.25}}
.p0v-prod h4{margin:12px 0 0;font:800 clamp(1.2rem,2.3vw,1.9rem)/1.1 var(--f-display);color:#fff}
.p0v-prod p{margin:8px 0 0;font-size:.9rem;line-height:1.55;color:var(--ink2)}
.p0v-prod ol{margin:12px 0 0;padding:0;list-style:none;display:grid;gap:5px}
.p0v-prod li{display:grid;grid-template-columns:44px minmax(0,1fr);gap:8px;font-size:.84rem;line-height:1.4;color:var(--ink)}
.p0v-prod li b{font:500 .74rem var(--f-hud);color:var(--neon)}
.p0v-chbar{display:flex;gap:3px;height:28px;padding:10px 16px 0;cursor:pointer}
.p0v-chbar:empty{display:none}
.p0v-chbar button{position:relative;flex:1;height:6px;padding:0;border:0;border-radius:3px;background:rgba(169,196,184,.18);cursor:pointer;overflow:hidden}
.p0v-chbar button i{position:absolute;inset:0 auto 0 0;width:0;background:linear-gradient(90deg,var(--neon),var(--gold));border-radius:3px}
.p0v-chbar button:hover{background:rgba(169,196,184,.32)}
.p0v-meta{padding:16px 22px 22px;display:grid;gap:14px}
.p0v-now h3{margin:6px 0 0;font:800 clamp(1.2rem,2vw,1.6rem)/1.15 var(--f-display);letter-spacing:-.02em}
.p0v-now p{margin:8px 0 0;color:var(--ink2);font-size:.95rem;line-height:1.6;max-width:70ch}
.p0v-ch{display:flex;flex-wrap:wrap;gap:6px}
.p0v-ch:empty{display:none}
.p0v-ch button{display:inline-flex;align-items:baseline;gap:8px;padding:7px 12px;border-radius:12px;border:1px solid var(--edge);background:rgba(10,34,27,.5);color:var(--ink2);font:500 .8rem var(--f-body);cursor:pointer;transition:all .2s}
.p0v-ch button b{font:500 .74rem var(--f-hud);color:var(--gold2)}
.p0v-ch button:hover{border-color:var(--edge2);color:var(--ink)}
.p0v-ch button.on{border-color:var(--gold);color:var(--ink);background:rgba(242,201,107,.12)}
.p0v-opts{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;padding-top:12px;border-top:1px solid var(--edge)}
.p0v-tg{display:inline-flex;align-items:center;gap:10px;font:600 .82rem var(--f-body);color:var(--ink);cursor:pointer;user-select:none}
.p0v-tg input{position:absolute;opacity:0;width:1px;height:1px}
.p0v-tg i{position:relative;width:38px;height:22px;border-radius:99px;background:rgba(169,196,184,.22);transition:background .2s}
.p0v-tg i::after{content:"";position:absolute;left:3px;top:3px;width:16px;height:16px;border-radius:50%;background:#fff;transition:transform .2s}
.p0v-tg input:checked+i{background:var(--neon)}
.p0v-tg input:checked+i::after{transform:translateX(16px)}
.p0v-tg input:focus-visible+i{outline:2px solid var(--gold);outline-offset:2px}
.p0v-keys{font:500 .62rem var(--f-hud);letter-spacing:.14em;text-transform:uppercase;color:var(--ink3)}
.p0v-list{list-style:none;margin:0;padding:0;display:grid;gap:10px;align-content:start;min-width:0}
.p0v-it{display:grid;grid-template-columns:132px minmax(0,1fr);gap:14px;width:100%;padding:8px;border-radius:18px;border:1px solid var(--edge);background:linear-gradient(170deg,var(--panel2),rgba(2,6,8,.7));color:var(--ink);text-align:left;cursor:pointer;transition:all .2s;font:inherit}
.p0v-it:hover{border-color:var(--edge2);transform:translateX(-2px)}
.p0v-it.on{border-color:var(--gold);background:linear-gradient(120deg,rgba(242,201,107,.14),rgba(2,6,8,.6));box-shadow:0 20px 40px -26px rgba(242,201,107,.6)}
.p0v-it .ph{position:relative;aspect-ratio:16/10;border-radius:12px;overflow:hidden;background:#06140f}
.p0v-it .ph img{width:100%;height:100%;object-fit:cover;display:block}
.p0v-it .du{position:absolute;right:6px;bottom:6px;padding:2px 7px;border-radius:6px;background:rgba(0,0,0,.72);font:500 .66rem var(--f-hud);color:#fff}
.p0v-it .st{position:absolute;left:6px;top:6px;padding:2px 7px;border-radius:6px;font:500 .52rem var(--f-hud);letter-spacing:.12em;text-transform:uppercase}
.p0v-it .st:empty{display:none}
.p0v-it .st.prod{background:rgba(242,201,107,.9);color:#1a1204}
.p0v-it .st.live{background:rgba(95,191,143,.9);color:#03130d}
.p0v-it .st.now{background:#fff;color:#03130d}
.p0v-it .tx{min-width:0;padding:2px 4px 2px 0}
.p0v-it small{display:block;font:500 .56rem var(--f-hud);letter-spacing:.16em;text-transform:uppercase;color:var(--gold)}
.p0v-it b{display:block;margin-top:4px;font:700 .9rem/1.25 var(--f-display)}
.p0v-it em{display:block;margin-top:5px;font-style:normal;font-size:.76rem;line-height:1.45;color:var(--ink2);display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
/* reading path + search */
.p0v-way{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);gap:16px;margin-top:22px;align-items:start}
.p0v-path,.p0v-find{border-radius:24px;border:1px solid var(--edge);background:linear-gradient(170deg,var(--panel2),rgba(2,6,8,.78));padding:24px;min-width:0}
.p0v-ptabs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
.p0v-ptabs button{display:block;text-align:left;padding:14px 16px;border-radius:16px;border:1px solid var(--edge);background:rgba(2,10,8,.5);color:var(--ink);cursor:pointer;transition:all .2s;min-width:0;font:inherit}
.p0v-ptabs button b{display:block;font:500 1.5rem/1 var(--f-hud);color:var(--neon)}
.p0v-ptabs button span{display:block;margin-top:6px;font-size:.78rem;line-height:1.35;color:var(--ink2)}
.p0v-ptabs button[aria-pressed="true"]{border-color:var(--gold);background:linear-gradient(150deg,rgba(242,201,107,.16),rgba(2,6,8,.6))}
.p0v-ptabs button[aria-pressed="true"] b{color:var(--gold2)}
.p0v-pd{margin:18px 0 0;color:var(--ink2);font-size:.95rem;line-height:1.6}
.p0v-prog{display:flex;align-items:center;gap:14px;margin-top:16px}
.p0v-prog .bar{flex:1;height:8px;border-radius:99px;background:rgba(169,196,184,.14);overflow:hidden}
.p0v-prog .bar i{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--neon),var(--gold));transition:width .5s}
.p0v-prog b{font:500 .8rem var(--f-hud);color:var(--ink);white-space:nowrap}
.p0v-prog button{border:0;background:none;color:var(--ink3);font:500 .62rem var(--f-hud);letter-spacing:.14em;text-transform:uppercase;cursor:pointer}
.p0v-prog button:hover{color:var(--gold2)}
.p0v-steps{list-style:none;margin:14px 0 0;padding:0;display:grid;gap:6px;max-height:520px;overflow:auto;padding-right:4px}
.p0v-steps .grp{margin:10px 0 2px;font:500 .58rem var(--f-hud);letter-spacing:.18em;text-transform:uppercase;color:var(--pc,var(--gold))}
.p0v-steps a{display:grid;grid-template-columns:28px minmax(0,1fr) auto;gap:12px;align-items:center;padding:10px 12px;border-radius:14px;border:1px solid var(--edge);background:rgba(2,10,8,.45);color:var(--ink);text-decoration:none;transition:border-color .2s}
.p0v-steps a:hover{border-color:var(--edge2)}
.p0v-steps .ck{width:26px;height:26px;border-radius:50%;display:grid;place-items:center;border:1.5px solid var(--edge2);font:500 .66rem var(--f-hud);color:var(--ink3)}
.p0v-steps .ck svg{width:14px;height:14px;display:none}
.p0v-steps a.done .ck{background:var(--neon);border-color:var(--neon);color:#03130d}
.p0v-steps a.done .ck svg{display:block}.p0v-steps a.done .ck span{display:none}
.p0v-steps .t b{display:block;font:700 .88rem/1.3 var(--f-display)}
.p0v-steps .t small{display:block;margin-top:2px;font-size:.76rem;line-height:1.4;color:var(--ink2)}
.p0v-steps .tm{font:500 .72rem var(--f-hud);color:var(--gold2);white-space:nowrap}
.p0v-alt{margin-top:12px;font-size:.84rem;color:var(--ink2)}
.p0v-alt a{color:var(--gold2)}
.p0v-qbox{display:flex;align-items:center;gap:10px;margin-top:12px;padding:6px 8px 6px 14px;border-radius:16px;border:1px solid var(--edge2);background:rgba(2,10,8,.7);transition:box-shadow .2s}
.p0v-qbox:focus-within{box-shadow:0 0 0 3px rgba(95,191,143,.25);border-color:var(--neon)}
.p0v-qbox svg{width:19px;height:19px;color:var(--gold2);flex:none}
.p0v-qbox input{flex:1;min-width:0;height:40px;border:0;background:none;color:var(--ink);font:500 1rem var(--f-body);outline:none}
.p0v-qbox kbd{padding:3px 8px;border-radius:7px;border:1px solid var(--edge2);font:500 .7rem var(--f-hud);color:var(--ink3)}
.p0v-qchips{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}
.p0v-qchips button{padding:5px 11px;border-radius:999px;border:1px solid var(--edge);background:none;color:var(--ink2);font:500 .76rem var(--f-body);cursor:pointer}
.p0v-qchips button:hover{border-color:var(--gold);color:var(--gold2)}
.p0v-qst{margin-top:12px;font:500 .62rem/1.5 var(--f-hud);letter-spacing:.12em;text-transform:uppercase;color:var(--ink3)}
.p0v-res{list-style:none;margin:10px 0 0;padding:0;display:grid;gap:6px;max-height:470px;overflow:auto}
.p0v-res a{display:block;padding:12px 14px;border-radius:14px;border:1px solid var(--edge);background:rgba(2,10,8,.5);color:var(--ink);text-decoration:none;transition:border-color .2s}
.p0v-res a:hover,.p0v-res a.on{border-color:var(--gold)}
.p0v-res small{display:flex;justify-content:space-between;gap:8px;font:500 .58rem var(--f-hud);letter-spacing:.14em;text-transform:uppercase;color:var(--pc,var(--gold))}
.p0v-res b{display:block;margin-top:3px;font:700 .92rem/1.3 var(--f-display)}
.p0v-res p{margin:4px 0 0;font-size:.8rem;line-height:1.5;color:var(--ink2)}
.p0v-res mark{background:rgba(242,201,107,.28);color:var(--ink);border-radius:3px;padding:0 2px}
/* investor summary · a paper sheet inside the dark showroom */
.p0v-sumw{display:grid;grid-template-columns:minmax(0,1fr) 260px;gap:18px;margin-top:22px;align-items:start}
.p0v-sumw>*{min-width:0}
.p0v-sum{position:relative;border-radius:10px;background:#fbfaf5;color:#10241b;padding:44px 48px 34px;box-shadow:0 40px 90px -40px rgba(0,0,0,.9),0 0 0 1px rgba(242,201,107,.35);font-family:var(--f-body)}
.p0v-sum::before{content:"";position:absolute;left:48px;right:48px;top:0;height:5px;background:linear-gradient(90deg,#0f7a52,#17a06b 60%,#c9a24a)}
.p0v-sum .hd{display:flex;justify-content:space-between;align-items:flex-start;gap:20px;padding-bottom:16px;border-bottom:1px solid #d9d4c3}
.p0v-sum .logo{display:flex;align-items:center;gap:12px}
.p0v-sum .logo i{width:40px;height:40px;border-radius:10px;background:#0f7a52;position:relative;flex:none}
.p0v-sum .logo i::before,.p0v-sum .logo i::after{content:"";position:absolute;background:#fff;border-radius:2px;left:50%;top:50%;transform:translate(-50%,-50%)}
.p0v-sum .logo i::before{width:22px;height:7px}.p0v-sum .logo i::after{width:7px;height:22px}
.p0v-sum .logo b{display:block;font:800 1.05rem var(--f-display);color:#0f3d2b}
.p0v-sum .logo span{display:block;font:500 .6rem var(--f-hud);letter-spacing:.16em;text-transform:uppercase;color:#6b7a70}
.p0v-sum .meta{text-align:right;font:500 .6rem/1.6 var(--f-hud);letter-spacing:.12em;text-transform:uppercase;color:#6b7a70}
.p0v-sum h3{margin:22px 0 0;font:900 clamp(1.6rem,3vw,2.4rem)/1.02 var(--f-display);letter-spacing:-.03em;color:#0b2a1e}
.p0v-sum h3 em{font-style:normal;color:#0f7a52}
.p0v-sum .lead{margin:10px 0 0;font-size:1rem;line-height:1.6;color:#33463c;max-width:70ch}
.p0v-sum .g2{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:22px 30px;margin-top:22px}
.p0v-sum h4{margin:0 0 8px;font:600 .62rem var(--f-hud);letter-spacing:.18em;text-transform:uppercase;color:#a07d2c}
.p0v-sum p,.p0v-sum li{font-size:.86rem;line-height:1.55;color:#2c3e35}
.p0v-sum p{margin:0}
.p0v-sum ul{margin:0;padding:0 0 0 16px;display:grid;gap:4px}
.p0v-sum b{color:#0b2a1e}
.p0v-sum .cite{color:#0f7a52}
.p0v-sum .kp{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));margin-top:22px;border:1px solid #d9d4c3;border-radius:8px;overflow:hidden}
.p0v-sum .kp div{padding:12px 14px;min-width:0}
.p0v-sum .kp div+div{border-left:1px solid #d9d4c3}
.p0v-sum .kp b{display:block;font:600 1.15rem/1.1 var(--f-hud);color:#0f7a52;white-space:nowrap}
.p0v-sum .kp div:last-child{background:#f4ecd6}.p0v-sum .kp div:last-child b{color:#8a6420}
.p0v-sum .kp span{display:block;margin-top:4px;font-size:.72rem;line-height:1.35;color:#55665c}
.p0v-sum table{width:100%;border-collapse:collapse;font-size:.8rem}
.p0v-sum td,.p0v-sum th{white-space:nowrap;padding:5px 6px;border-bottom:1px solid #e6e1d2;text-align:right;color:#2c3e35}
.p0v-sum th{font:600 .56rem var(--f-hud);letter-spacing:.14em;text-transform:uppercase;color:#6b7a70}
.p0v-sum td:first-child,.p0v-sum th:first-child{text-align:left}
.p0v-sum .tr{display:flex;height:30px;border-radius:6px;overflow:hidden;margin-bottom:8px}
.p0v-sum .tr div{display:flex;align-items:center;padding:0 10px;font:600 .7rem var(--f-hud);color:#fff;white-space:nowrap;overflow:hidden}
.p0v-sum .uf{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:2px 10px;font-size:.78rem;color:#2c3e35}
.p0v-sum .uf i{grid-column:1/-1;height:5px;border-radius:9px;background:#ebe6d6;overflow:hidden;margin-bottom:4px}
.p0v-sum .uf em{display:block;height:100%;background:#17a06b}
.p0v-sum .ft{display:flex;justify-content:space-between;gap:20px;margin-top:22px;padding-top:12px;border-top:1px solid #d9d4c3;font:500 .58rem/1.6 var(--f-hud);letter-spacing:.1em;text-transform:uppercase;color:#6b7a70}
.p0v-sumside{display:grid;gap:10px;position:sticky;top:20px}
.p0v-sumside .p0-ib{justify-content:flex-start;width:100%;height:48px}
.p0v-sumside p{margin:4px 0 0;font-size:.82rem;line-height:1.55;color:var(--ink2)}
.p0v-sumside .ok{font:500 .62rem var(--f-hud);letter-spacing:.14em;text-transform:uppercase;color:var(--neon);min-height:1em}
#p0print{display:none}
@media print{
 body.p0-hasprint>*:not(#p0print){display:none!important}
 body.p0-hasprint{background:#fff!important}
 body.p0-hasprint::before{display:none!important}
 #p0print{display:block!important;background:#fff}
 #p0print .p0v-sum{box-shadow:none;border-radius:0;padding:10mm 4mm 0;background:#fff}
 #p0print .p0v-sum::before{left:4mm;right:4mm}
 #p0print a{color:#0f7a52;text-decoration:none}
 @page{size:A4;margin:10mm}
}
/* moments editorial */
.p0v-duo{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:16px;margin-top:16px}
.p0v-mo{position:relative;margin:0;border-radius:24px;overflow:hidden;border:1px solid var(--edge);background:linear-gradient(175deg,var(--panel2),rgba(2,6,8,.85));min-width:0;display:flex;flex-direction:column}
.p0v-mo .ph{position:relative;aspect-ratio:16/10;overflow:hidden}
.p0v-mo .ph img{width:100%;height:100%;object-fit:cover;display:block;transition:transform 1.4s cubic-bezier(.2,.8,.2,1)}
.p0v-mo:hover .ph img{transform:scale(1.04)}
.p0v-mo .ph::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(2,6,8,.7),transparent 45%)}
.p0v-mo .tm{position:absolute;left:18px;bottom:14px;z-index:2;font:500 .64rem var(--f-hud);letter-spacing:.18em;text-transform:uppercase;color:var(--gold2)}
.p0v-mo .tx{padding:20px 24px 24px;flex:1;display:flex;flex-direction:column}
.p0v-mo h4{margin:0;font:800 1.2rem/1.2 var(--f-display);letter-spacing:-.01em}
.p0v-mo p{margin:8px 0 0;font-size:.92rem;line-height:1.62;color:var(--ink2);flex:1}
.p0v-mo p b{color:var(--ink)}
.p0v-mo .sp{display:flex;flex-wrap:wrap;gap:8px 18px;margin-top:14px;padding-top:12px;border-top:1px solid var(--edge)}
.p0v-mo .sp span{font-size:.76rem;color:var(--ink2)}
.p0v-mo .sp b{font:500 .95rem var(--f-hud);color:var(--neon);margin-right:6px}
.p0v-link{position:relative}
.p0v-link::after{content:"";position:absolute;left:calc(50% - 40px);top:38%;width:80px;height:2px;background:linear-gradient(90deg,var(--neon),var(--gold));box-shadow:0 0 12px var(--neon);z-index:4}
.p0v-hops{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:0;margin-top:14px;border-radius:18px;overflow:hidden;border:1px solid var(--edge2)}
.p0v-hops div{padding:14px 16px;background:rgba(2,10,8,.55);min-width:0}
.p0v-hops div+div{border-left:1px solid var(--edge)}
.p0v-hops b{display:block;font:500 1.1rem var(--f-hud);color:var(--gold2)}
.p0v-hops span{display:block;margin-top:4px;font-size:.8rem;line-height:1.4;color:var(--ink2)}
/* numbers working */
.p0v-split{margin-top:14px;padding:20px 22px;border-radius:20px;border:1px solid var(--edge);background:linear-gradient(170deg,var(--panel2),rgba(2,6,8,.7))}
.p0v-split h4{margin:0 0 12px;font:700 .95rem var(--f-display)}
.p0v-sbar{display:flex;height:46px;border-radius:12px;overflow:hidden}
.p0v-sbar div{display:flex;align-items:center;padding:0 14px;min-width:0;font:600 .78rem var(--f-hud);color:#03130d;white-space:nowrap;overflow:hidden;transition:flex .6s}
.p0v-slg{display:flex;flex-wrap:wrap;gap:8px 22px;margin-top:12px}
.p0v-slg span{display:inline-flex;align-items:center;gap:8px;font-size:.84rem;color:var(--ink2)}
.p0v-slg i{width:10px;height:10px;border-radius:3px}
.p0v-slg b{font:500 .9rem var(--f-hud);color:var(--ink)}
.p0-k .p0wk{display:none;font-family:var(--f-body);text-transform:none;letter-spacing:0;margin-top:12px;padding-top:10px;border-top:1px dashed var(--edge2);font-size:.78rem;line-height:1.5;color:var(--ink2)}
.p0-k .p0wk a{color:var(--gold2)}
.p0v-showwk .p0-k .p0wk{display:block}
.p0v-wkb{margin-left:auto}
/* FAQ */
.p0v-faq{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.7fr);gap:18px;margin-top:22px;align-items:start}
.p0v-fside{position:sticky;top:20px;border-radius:24px;overflow:hidden;border:1px solid var(--edge);background:linear-gradient(175deg,var(--panel2),rgba(2,6,8,.85))}
.p0v-fside .ph{position:relative;aspect-ratio:4/3.3;overflow:hidden}
.p0v-fside .ph img{width:100%;height:100%;object-fit:cover;display:block}
.p0v-fside .tx{padding:20px 22px 24px}
.p0v-fside h4{margin:0;font:800 1.15rem/1.25 var(--f-display)}
.p0v-fside p{margin:8px 0 0;font-size:.88rem;line-height:1.6;color:var(--ink2)}
.p0v-fhead{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.p0v-fcats{display:flex;flex-wrap:wrap;gap:6px;flex:1 1 100%}
.p0v-fcats button{padding:7px 13px;border-radius:999px;border:1px solid var(--edge);background:rgba(2,10,8,.5);color:var(--ink2);font:600 .78rem var(--f-body);cursor:pointer}
.p0v-fcats button[aria-pressed="true"]{border-color:var(--gold);color:#1a1204;background:linear-gradient(135deg,var(--gold2),var(--gold))}
.p0v-fsrch{flex:1;display:flex;align-items:center;gap:8px;padding:0 12px;border-radius:14px;border:1px solid var(--edge2);background:rgba(2,10,8,.6);min-width:0}
.p0v-fsrch svg{width:16px;height:16px;color:var(--gold2);flex:none}
.p0v-fsrch input{flex:1;min-width:0;height:42px;border:0;background:none;color:var(--ink);font:500 .92rem var(--f-body);outline:none}
.p0v-flist{display:grid;gap:8px;margin-top:12px}
.p0v-fi{border-radius:18px;border:1px solid var(--edge);background:linear-gradient(170deg,var(--panel2),rgba(2,6,8,.7));overflow:hidden;transition:border-color .2s}
.p0v-fi.open{border-color:var(--edge2)}
.p0v-fi[hidden]{display:none}
.p0v-fi .q{display:grid;grid-template-columns:34px minmax(0,1fr) 26px;gap:12px;align-items:center;width:100%;padding:15px 18px;border:0;background:none;color:var(--ink);text-align:left;cursor:pointer;font:700 .98rem/1.35 var(--f-display)}
.p0v-fi .q .n{font:500 .7rem var(--f-hud);color:var(--gold2)}
.p0v-fi .q i{width:26px;height:26px;border-radius:50%;border:1px solid var(--edge2);position:relative;transition:transform .3s,background .2s}
.p0v-fi .q i::before,.p0v-fi .q i::after{content:"";position:absolute;left:50%;top:50%;width:10px;height:1.5px;background:var(--gold2);transform:translate(-50%,-50%)}
.p0v-fi .q i::after{transform:translate(-50%,-50%) rotate(90deg)}
.p0v-fi.open .q i{transform:rotate(45deg);background:rgba(242,201,107,.12)}
.p0v-fi .a{padding:0 18px 18px 64px;font-size:.94rem;line-height:1.7;color:var(--ink2)}
.p0v-fi .a[hidden]{display:none}
.p0v-fi .a b{color:var(--ink)}
.p0v-fi .a p{margin:0 0 .7em}
.p0v-fi .lk{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}
.p0v-fi .lk a{display:inline-flex;align-items:center;gap:6px;padding:5px 11px;border-radius:999px;border:1px solid var(--edge2);color:var(--gold2);font:600 .76rem var(--f-body);text-decoration:none}
.p0v-fi .lk a:hover{background:rgba(242,201,107,.12)}
.p0v-fi .lk svg{width:13px;height:13px}
.p0v-fcount{margin:10px 0 0;font:500 .62rem var(--f-hud);letter-spacing:.14em;text-transform:uppercase;color:var(--ink3)}
/* ---- 0.2 additions ---- */
.p0-sf .p0-proof{display:inline-flex;gap:.5em;align-items:center;text-transform:none;letter-spacing:.02em;font:500 1.15em var(--f-body);color:var(--ink2)}
.p0-sf .p0-proof a{color:var(--gold2);text-decoration:none;border-bottom:1px solid rgba(242,201,107,.4)}
.p0-help{position:absolute;inset:0;z-index:20;display:none;place-items:center;padding:20px;background:rgba(1,6,4,.9);backdrop-filter:blur(8px);border-radius:26px}
.p0-help.on{display:grid}
.p0-help .in{width:min(760px,100%);max-height:100%;overflow:auto;border-radius:20px;border:1px solid var(--edge2);background:linear-gradient(160deg,#0a1f18,#030b08);padding:26px 28px}
.p0-help h4{margin:0 0 14px;display:flex;justify-content:space-between;align-items:center;font:800 1.2rem var(--f-display)}
.p0-help dl{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px 22px;margin:0}
.p0-help dl div{display:flex;align-items:center;gap:12px;padding:8px 0;border-bottom:1px solid var(--edge)}
.p0-help dt{min-width:88px}
.p0-help dd{margin:0;font-size:.88rem;color:var(--ink2)}
.p0-help kbd,.p0-pr kbd{display:inline-block;min-width:26px;padding:3px 7px;margin-right:3px;border-radius:7px;border:1px solid var(--edge2);border-bottom-width:3px;background:rgba(242,201,107,.06);font:500 .72rem var(--f-hud);color:var(--gold2);text-align:center}
.p0-rh{display:none;align-items:center;gap:10px;flex-wrap:wrap;margin:10px 4px 0;padding:10px 14px;border-radius:14px;border:1px solid rgba(95,191,143,.4);background:rgba(95,191,143,.07)}
.p0-rh.on{display:flex}
.p0-rh b{font:500 .62rem var(--f-hud);letter-spacing:.18em;text-transform:uppercase;color:var(--neon)}
.p0-rh .cd{font:500 1.1rem var(--f-hud);color:var(--ink);min-width:60px}
.p0-rh .rb{flex:1;min-width:120px;height:6px;border-radius:9px;background:rgba(169,196,184,.15);overflow:hidden}
.p0-rh .rb i{display:block;height:100%;width:0;background:var(--neon)}
.p0-rh .spd{display:inline-flex;gap:3px}
.p0-rh .spd button{padding:5px 10px;border-radius:9px;border:1px solid var(--edge);background:none;color:var(--ink2);font:500 .72rem var(--f-hud);cursor:pointer}
.p0-rh .spd button.on{border-color:var(--neon);color:var(--neon)}
.p0-rh .msg{font-size:.84rem;color:var(--ink2)}
.p0-pr{position:fixed;inset:0;z-index:150;display:none;grid-template-rows:auto minmax(0,1fr);gap:14px;padding:16px 20px 20px;background:#010403;color:var(--ink)}
.p0-pr.on{display:grid}
.p0-prh{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.p0-prh .ttl{font:500 .62rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--ink3);margin-right:auto}
.p0-prh .ttl b{color:var(--gold2);font-weight:500}
.p0-prh .clk{font:500 2rem/1 var(--f-hud);color:var(--gold2);letter-spacing:.03em}
.p0-prh .clk.over{color:#ff9f8b}
.p0-prh .pc{font:600 .86rem var(--f-body);min-width:120px}
.p0-prb{display:grid;grid-template-columns:minmax(0,1.9fr) minmax(0,1fr);gap:16px;min-height:0}
.p0-prl{display:grid;grid-template-rows:auto auto;gap:10px;align-content:start;min-height:0}
.p0-prr{display:grid;grid-template-rows:auto minmax(0,1fr) auto;gap:12px;min-height:0}
.p0-vw{position:relative;width:100%;aspect-ratio:16/9;border-radius:14px;overflow:hidden;border:1px solid var(--edge2);background:#020a07}
.p0-vw .p0-vv{position:absolute;left:0;top:0;width:1280px;height:720px;transform-origin:0 0;container-type:inline-size;container-name:p0deck}
.p0-vw .p0-vv .p0-slide{position:absolute;inset:0;font-size:16.6px;min-height:0;padding:3.2em 4em 2.4em}
.p0-vw .p0-vv .p0-slide.on{animation:none}
.p0-vw .p0-vv .p0-2c,.p0-vw .p0-vv .p0-2c.w,.p0-vw .p0-vv .p0-2c.n{grid-template-columns:minmax(0,1.15fr) minmax(0,1fr)}
.p0-prlab{font:500 .6rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--ink3);display:flex;justify-content:space-between}
.p0-prlab b{color:var(--gold2);font-weight:500}
.p0-prn{min-height:0;overflow:auto;padding:16px 18px;border-radius:14px;border:1px solid var(--edge);background:var(--panel);font-size:1.02rem;line-height:1.7}
.p0-prn p{margin:0 0 .8em}.p0-prn b{color:var(--gold2)}
.p0-prbud{height:8px;border-radius:9px;background:rgba(169,196,184,.14);overflow:hidden}
.p0-prbud i{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--neon),var(--gold))}
.p0-prbud.over i{background:#ff8f7a}
.p0-cv{display:grid;grid-template-columns:220px minmax(0,1fr);gap:0;margin-top:14px;border-radius:20px;overflow:hidden;border:1px solid var(--edge2);background:linear-gradient(150deg,rgba(242,201,107,.1),rgba(2,6,8,.7))}
.p0-cv .ph{position:relative;min-height:160px}
.p0-cv .ph img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.p0-cv .ph span{position:absolute;left:12px;bottom:12px;padding:4px 9px;border-radius:7px;background:rgba(2,8,6,.8);font:500 .56rem var(--f-hud);letter-spacing:.16em;text-transform:uppercase;color:var(--gold2)}
.p0-cv .tx{padding:22px 24px}
.p0-cv h4{margin:0;font:800 1.15rem var(--f-display)}
.p0-cv p{margin:8px 0 0;font-size:.9rem;line-height:1.6;color:var(--ink2)}
.p0-cv .row{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin-top:14px}
.p0-cv .pend{display:inline-flex;align-items:center;gap:8px;padding:10px 14px;border-radius:12px;border:1px dashed var(--edge2);font:600 .82rem var(--f-body);color:var(--gold2)}
.p0-cv .pend i{width:7px;height:7px;border-radius:50%;background:var(--gold);animation:p0blink 1.6s infinite}
.p0-cv small{font:500 .6rem var(--f-hud);letter-spacing:.14em;text-transform:uppercase;color:var(--ink3)}
.p0-rgrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
.p0-rgrid>div{padding:22px;border-radius:20px;border:1px solid var(--edge);background:linear-gradient(170deg,var(--panel2),rgba(2,6,8,.7));min-width:0}
.p0-rgrid small{font:500 .58rem var(--f-hud);letter-spacing:.18em;text-transform:uppercase;color:var(--neon)}
.p0-rgrid h4{margin:8px 0 0;font:800 1.08rem/1.25 var(--f-display)}
.p0-rgrid p{margin:8px 0 0;font-size:.9rem;line-height:1.6;color:var(--ink2)}
.p0-rgrid ul{margin:10px 0 0;padding:0 0 0 16px;font-size:.86rem;line-height:1.6;color:var(--ink2)}
@media (max-width:1150px){
 .p0v-lib,.p0v-way,.p0v-faq,.p0v-sumw{grid-template-columns:1fr}
 .p0v-list{grid-template-columns:repeat(2,minmax(0,1fr))}
 .p0v-fside{position:relative;top:0;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.3fr)}.p0v-fside .ph{aspect-ratio:auto;min-height:200px}
 .p0v-sumside{position:relative;top:0;grid-template-columns:repeat(2,minmax(0,1fr))}.p0v-sumside p{grid-column:1/-1}
 .p0-prb{grid-template-columns:1fr;overflow:auto}.p0-prr{grid-template-rows:auto auto auto}.p0-prn{max-height:40vh}
 .p0-rgrid{grid-template-columns:1fr}
}
@media (max-width:820px){
 .p0v-hn{grid-template-columns:1fr 1fr;margin-top:22px}.p0v-hn div{border-left:0!important;border-top:1px solid var(--edge)}.p0v-hn div:nth-child(-n+2){border-top:0}.p0v-hn div:last-child{grid-column:1/-1}
 .p0v-list{grid-template-columns:1fr}.p0v-it{grid-template-columns:112px minmax(0,1fr)}
 .p0v-big{top:42%}
 .p0v-big{padding:8px 18px 8px 8px;font-size:.84rem}.p0v-big span{width:44px;height:44px}
 .p0v-prod .in{padding:18px}.p0v-prod p,.p0v-prod ol{display:none}.p0v-prod h4{font-size:1.1rem}
 .p0v-meta{padding:14px 16px 18px}
 .p0v-path,.p0v-find{padding:18px}
 .p0v-ptabs{grid-template-columns:1fr}.p0v-ptabs button{display:flex;align-items:baseline;gap:12px}.p0v-ptabs button span{margin:0}
 .p0v-sum{padding:30px 20px 22px}.p0v-sum::before{left:20px;right:20px}
 .p0v-sum .hd{flex-direction:column}.p0v-sum .meta{text-align:left}
 .p0v-sum .g2{grid-template-columns:minmax(0,1fr)}.p0v-sum td,.p0v-sum th{white-space:normal;padding:5px 3px}.p0v-sum table{font-size:.74rem}.p0v-sum .kp{grid-template-columns:1fr 1fr}.p0v-sum .kp div{border-left:0!important;border-top:1px solid #d9d4c3}.p0v-sum .kp div:nth-child(-n+2){border-top:0}.p0v-sum .kp div:last-child{grid-column:1/-1}
 .p0v-sumside{grid-template-columns:1fr}
 .p0v-duo{grid-template-columns:1fr}.p0v-link::after{display:none}
 .p0v-hops{grid-template-columns:1fr 1fr}.p0v-hops div{border-left:0!important;border-top:1px solid var(--edge)}.p0v-hops div:nth-child(-n+2){border-top:0}
 .p0v-fside{grid-template-columns:1fr}.p0v-fside .ph{aspect-ratio:16/10;min-height:0}
 .p0v-fi .q{grid-template-columns:26px minmax(0,1fr) 24px;gap:10px;padding:14px;font-size:.92rem}.p0v-fi .a{padding:0 14px 16px}
 .p0v-sbar div{font-size:.66rem;padding:0 8px}
 .p0-help dl{grid-template-columns:1fr}
 .p0-cv{grid-template-columns:1fr}.p0-cv .ph{min-height:0;aspect-ratio:16/8}
 .p0-pr{padding:10px 12px;overflow:auto}.p0-prh .clk{font-size:1.4rem}
}
`;

/* ============================================================
   s0-1  HOME: THE 60-SECOND STORY (v2)
   ============================================================ */
let hSc='base';
const SCENES=d=>[
 {bg:bgi('real-pharmacy'),kx:'-3%',ky:'-1%',k:['Today','Leo'],h:['Care moved <em>home.</em>','Huduma imehamia <em>nyumbani.</em>'],p:['Babies, pregnancy, blood pressure, diabetes and ageing parents are now looked after at home, and every one of them needs supplies every month.','Watoto, ujauzito, shinikizo la damu, kisukari na wazazi wazee sasa wanahudumiwa nyumbani, na kila mmoja anahitaji bidhaa kila mwezi.'],sb:'23.1%',ss:[`of Tanzanian adults aged 18–69 have raised blood pressure (2023 national survey) ${c(5)}`,`ya watu wazima Tanzania wenye miaka 18–69 wana shinikizo la damu (utafiti wa kitaifa 2023) ${c(5)}`]},
 {bg:bgi('real-queue'),kx:'2%',ky:'-2%',k:['The problem','Tatizo'],h:['Buying supplies <em>is still fragmented.</em>','Ununuzi wa mahitaji <em>bado umetawanyika.</em>'],p:['A family visits several shops for one baby’s monthly needs, queues at a counter to ask a simple question, cannot tell registered products from falsified ones, and runs out of supplies when the shops are closed.','Familia inatembelea maduka kadhaa kwa mahitaji ya mwezi ya mtoto mmoja, inapanga foleni kaunta ili kuuliza swali dogo, haiwezi kutofautisha bidhaa zilizosajiliwa na bandia, na mahitaji yanaisha maduka yakiwa yamefungwa.'],sb:'1 in 10',ss:[`medical products in developing countries is substandard or falsified ${c(2)}`,`ya bidhaa za tiba katika nchi zinazoendelea ni duni au bandia ${c(2)}`]},
 {bg:bgi('interior'),kx:'-2%',ky:'1%',k:['Our answer','Jibu letu'],h:['One store, <em>organised by need.</em>','Duka moja, <em>limepangwa kwa mahitaji.</em>'],p:['A secure street-front store in Dar es Salaam, open to the street so passers-by can see inside, laid out in six Care Zones. It stocks registered products only, at one price that is the same in store, in the app and on WhatsApp.','Duka salama la mbele ya barabara jijini Dar es Salaam, lililo wazi kwa barabara ili mpita njia aone ndani, lililopangwa katika Kanda sita za Huduma. Linauza bidhaa zilizosajiliwa pekee, kwa bei moja iliyo sawa dukani, kwenye programu na kwenye WhatsApp.'],sb:'~'+IN.product_families,ss:[`product families, ${IN.brands_per_item} registered brands each, in ${IN.care_zones.length} Care Zones`,`familia za bidhaa, chapa ${IN.brands_per_item} zilizosajiliwa kila moja, katika Kanda ${IN.care_zones.length} za Huduma`]},
 {bg:bgi('scan','check'),kx:'3%',ky:'-1%',k:['The visit','Ziara'],h:['Check, choose, <em>pay in 30 seconds.</em>','Pima, chagua, <em>lipa kwa sekunde 30.</em>'],p:[`A quick check at the door measures blood pressure, pulse and oxygen in about ${IN.check.quick_seconds} seconds; the full Afya Check takes about ${IN.check.minutes} minutes. An adviser helps if asked. The customer then scans products with a phone and pays by mobile money in under 30 seconds.`,`Kipimo cha haraka mlangoni kinapima shinikizo la damu, mapigo ya moyo na oksijeni kwa takriban sekunde ${IN.check.quick_seconds}; Afya Check kamili inachukua takriban dakika ${IN.check.minutes}. Mshauri husaidia akiombwa. Kisha mteja anaskani bidhaa kwa simu na kulipa kwa pesa ya simu chini ya sekunde 30.`],sb:''+IN.check.free_readings.length,ss:['measurements in the full Afya Check, free of charge and with no obligation to buy','vipimo katika Afya Check kamili, bila malipo na bila sharti la kununua']},
 {bg:bgi('dad','boxdoor'),kx:'-2%',ky:'-2%',k:['The engine','Injini'],h:['A monthly box <em>that renews itself.</em>','Box ya kila mwezi <em>inayojirudia yenyewe.</em>'],p:['The Afya Box renews automatically each month. Members can change brands up to 12 days before month end. The box and delivery are charged at cost inside the price, so the margin comes from the products.','Afya Box hujirudia yenyewe kila mwezi. Wanachama wanaweza kubadilisha chapa hadi siku 12 kabla ya mwisho wa mwezi. Box na usafirishaji vinatozwa kwa gharama halisi ndani ya bei, hivyo faida inatoka kwenye bidhaa.'],sb:num(d.mem12),ss:[`Afya Box members by month 12 · ${d.label} case · planning estimate`,`wanachama wa Afya Box kufikia mwezi wa 12 · makadirio ya mipango`]},
 {bg:bgi('exterior-side'),kx:'2%',ky:'1%',k:['The ask','Ombi'],h:[`${F.m(SEED.amount)} <em>${ISL()?'to open the first store.':'to open the flagship.'}</em>`,`${F.m(SEED.amount)} <em>${ISL()?'kufungua duka la kwanza.':'kufungua duka kuu.'}</em>`],p:[`${ISL()?`The start-small option: ${F.m(SEED.amount)} for a ${IN.store.area_m2} m² store on a good secondary street.`:`The flagship option: ${F.m(SEED.amount)} for a ${IN.store.area_m2} m² store on a prime street.`} The amount is released in three tranches (${SEED.tranches.map(t=>t*100).join(' · ')}), each only when its milestone is met.`,`${ISL()?`Chaguo la kuanza kidogo: ${F.m(SEED.amount)} kwa duka la m² ${IN.store.area_m2} katika barabara nzuri ya pili.`:`Chaguo la duka kuu: ${F.m(SEED.amount)} kwa duka la m² ${IN.store.area_m2} katika barabara kuu.`} Kiasi hiki kinatolewa kwa awamu tatu (${SEED.tranches.map(t=>t*100).join(' · ')}), kila awamu pale tu hatua yake inapofikiwa.`],sb:P(OWN.founders_floor),ss:['of the company kept by the founders for life, protected in the company documents (legal review needed)','ya kampuni yanabaki kwa waanzilishi maisha yote, yakilindwa kwenye nyaraka za kampuni (ukaguzi wa kisheria unahitajika)']}];

/* derived planning numbers for the front door (base case unless stated) */
function Y1split(d){const m=d.r.months;return {walk:m.reduce((a,x)=>a+x.walkin,0),box:m.reduce((a,x)=>a+x.boxes,0),online:m.reduce((a,x)=>a+x.online,0)}}
let MB=IN.members,GPM=(MB.avg_box-MB.packing_delivery_in_price)*((window.MODEL&&MODEL.NETF)||1)*MB.box_products_gm+MB.packing_delivery_in_price*(MB.pd_margin||0),LIFE=1/MB.monthly_churn,LTV=GPM*LIFE;
function REFRESH(){IN=(M.cur?M.cur.inputs:M.inputs);SEED=IN.seed;OWN=IN.ownership;STAFFN=IN.staff.reduce((a,s)=>a+s[1],0);PAYROLL=IN.staff.reduce((a,s)=>a+s[1]*s[2],0);POSTMONEY=SEED.amount/OWN.seed_investor_share;CHECKBUY=IN.check.checks_day_m12*IN.check.check_to_purchase;MB=IN.members;GPM=(MB.avg_box-MB.packing_delivery_in_price)*((window.MODEL&&MODEL.NETF)||1)*MB.box_products_gm+MB.packing_delivery_in_price*(MB.pd_margin||0);LIFE=1/MB.monthly_churn;LTV=GPM*LIFE;try{FAQc=null}catch(e){}}

function kpis01(d){const sp=Y1split(d),bm=d.r.months[d.be?d.be-1:11];return [
 [L('Year-1 revenue','Mapato mwaka 1'),F.auto(d.y1rev),L(`Store sales, Afya Boxes and online orders in the first 12 months · ${d.label}`,`Mauzo ya dukani, Afya Box na oda za mtandaoni miezi 12 ya kwanza · ${d.label}`),'',
  L(`= walk-in ${F.auto(sp.walk)} (visitors a day rising ${IN.store.visitors_day_start}→${IN.store.visitors_day_m12} × ${P(IN.store.conversion)} buy × ${F.tsh(IN.store.basket)} basket × 30 days) + Afya Box ${F.auto(sp.box)} + online ${F.auto(sp.online)}.`,`= wateja wa dukani ${F.auto(sp.walk)} + Afya Box ${F.auto(sp.box)} + mtandaoni ${F.auto(sp.online)}.`),'s6-1'],
 [L('Break-even','Kufikia faida'),d.be?L('Month '+d.be,'Mwezi '+d.be):L('After Y1','Baada ya mwaka 1'),d.be?L('The first month when gross profit covers all running costs','Mwezi wa kwanza faida ghafi inapolipa gharama zote za uendeshaji'):L('Monthly profit not reached inside year 1 in this case','Faida ya mwezi haifikiwi ndani ya mwaka 1 katika hali hii'),'',
  L(`In month ${bm.m}, gross profit ${F.m(bm.gross_profit)} against running costs of ${F.m(d.opex)} a month (rent, team, systems, marketing, check station, insurance, packaging).`,`Mwezi ${bm.m}, faida ghafi ${F.m(bm.gross_profit)} dhidi ya gharama za uendeshaji ${F.m(d.opex)} kwa mwezi.`),'s6-1'],
 [L('Members, month 12','Wanachama, mwezi 12'),num(d.mem12),L(`Afya Box households, worth ${F.auto(d.mrr12)} a month in box sales`,`Kaya za Afya Box, zenye thamani ya ${F.auto(d.mrr12)} kwa mwezi`),'',
  L(`Each month ${P(MB.join_rate)} of paying store customers and ${P(MB.check_join_rate)} of Afya Check users who did not buy join a box; ${F.pct(MB.monthly_churn)} of members leave. Box sales = members × ${F.tsh(MB.avg_box)} average box.`,`Kila mwezi ${P(MB.join_rate)} ya wateja wanaolipa dukani na ${P(MB.check_join_rate)} ya waliopima Afya Check bila kununua hujiunga na box; ${F.pct(MB.monthly_churn)} ya wanachama huondoka. Mauzo ya box = wanachama × ${F.tsh(MB.avg_box)} wastani wa box.`),'s3-4'],
 [L('Year 12','Mwaka 12'),F.auto(d.y12.revenue),L(`Revenue across ${d.y12.stores} stores in Tanzania and East Africa`,`Mapato katika maduka ${d.y12.stores} Tanzania na Afrika Mashariki`),'',
  L(`Mature stores × ${F.b(IN.growth.mature_store_revenue)} a year each, new stores ramping ${P(IN.growth.ramp[0])} → ${P(IN.growth.ramp[1])} → 100%, plus ${P(IN.growth.b2b_share)} business sales.`,`Maduka yaliyokomaa × ${F.b(IN.growth.mature_store_revenue)} kwa mwaka kila moja, maduka mapya yakikua ${P(IN.growth.ramp[0])} → ${P(IN.growth.ramp[1])} → 100%, pamoja na ${P(IN.growth.b2b_share)} mauzo kwa taasisi.`),'s5-4'],
 [L('Seed ask','Mtaji unaoombwa'),F.m(SEED.amount),(ISL()?L('Start-small option, in three tranches','Chaguo la kuanza kidogo, kwa awamu tatu'):L('Flagship option, in three tranches','Chaguo la duka kuu, kwa awamu tatu')),'g',
  L(`= ${SEED.use.map(u=>F.m(u[1])).join(' + ')} (fit-out, stock, technology, motorbikes, launch, reserve).`,`= ${SEED.use.map(u=>F.m(u[1])).join(' + ')} (ukarabati, bidhaa, teknolojia, pikipiki, uzinduzi, akiba).`),'s6-3']]}

/* ---------- video library ---------- */
const VIDS=[
 {f:'afya-brand-film',src:'/_blob/91f2b0e5a956f8cf609a3757ce022297',srcSw:'/_blob/1c06c642237e32526d5c2ff31824f904',po:'media/p-afya-brand-film.jpg',fb:['img/exterior.webp'],dur:273,k:['The brand film','Filamu ya chapa'],
  t:['Afya Basics: the whole case, from one store to a regional chain','Afya Basics: hoja nzima, kutoka duka moja hadi mtandao wa maduka wa kikanda'],
  s:['4½ minutes: the problem, the store, the Afya Box, the numbers and the plan.','Dakika 4½: tatizo, duka, Afya Box, namba na mpango.'],
  l:['The launch film. It opens on the quiet monthly moment in Dar es Salaam homes when a pack runs out, follows the search across pharmacies, then introduces Afya Basics: the street-front store with the free Afya Check, six Care Zones and scan-and-go payment; the monthly Afya Box; Afya Huduma services; one-tap reorder and same-day delivery; the diaspora box; Afya Kazini for businesses; and the one system behind it all. It closes on the master-model numbers (about TSh 800M in year one net of VAT for the flagship, monthly profit from month 10, 47 stores and about TSh 80B a year by year 12) and, clearly labelled as ambition rather than forecast, the path to a billion-dollar East African health brand. Subtitles in English and Kiswahili (CC button).','Filamu ya uzinduzi. Inaanza na wakati wa kimya wa kila mwezi kwenye nyumba za Dar es Salaam pakiti inapoisha, inafuata msako kwenye maduka ya dawa, kisha inatambulisha Afya Basics: duka la barabarani lenye Afya Check ya bure, Kanda sita za Huduma na kulipa kwa scan-and-go; Afya Box ya kila mwezi; huduma za Afya Huduma; kuagiza tena kwa mguso mmoja na usafirishaji siku hiyohiyo; box ya diaspora; Afya Kazini kwa biashara; na mfumo mmoja nyuma ya yote. Inamalizia na namba za modeli kuu (takriban TSh milioni 800 mwaka wa kwanza bila VAT kwa duka kuu, faida ya kila mwezi kuanzia mwezi wa 10, maduka 47 na TSh bilioni 80 kwa mwaka ifikapo mwaka wa 12) na, ikiwekwa wazi kuwa ni ndoto si utabiri, njia ya kuwa chapa ya afya ya Afrika Mashariki ya dola bilioni. Maandishi kwa Kiingereza na Kiswahili (kitufe cha CC).'],
  ch:[[0,'The problem','Tatizo'],[48,'Introducing Afya Basics','Tunakuletea Afya Basics'],[53,'The store','Duka'],[108,'The Afya Box','Afya Box'],[131,'Afya Huduma','Afya Huduma'],[151,'App & delivery','Programu na usafirishaji'],[165,'Family abroad','Familia iliyo nje'],[176,'Afya Kazini','Afya Kazini'],[185,'One system','Mfumo mmoja'],[201,'The numbers','Namba'],[219,'The road','Njia'],[236,'The vision','Ndoto'],[250,'The ask','Ombi']],
  tr:[['en','English','media/afya-brand-film.en.txt'],['sw','Kiswahili','media/afya-brand-film.sw.txt']]},
 {f:'afya-filamu-juma-1',src:'/_blob/d6d0c0dc11867c451bc3bea2ca6e02ee',srcSw:'/_blob/ae78a27ffb1e68de2bd371d84de3c268',av1En:'/_blob/5ff7bd778a787bda57d57dc7301604a4',av1Sw:'/_blob/fb367b254ab742c1255a4a213e876797',po:'media/p-afya-filamu-juma-1.jpg',fb:['img/j-mlango.webp'],dur:155,k:['Family film · part 1','Filamu ya familia · sehemu 1'],
  t:['Mwezi wa Juma, part 1: one father’s evening','Mwezi wa Juma, sehemu 1: jioni ya baba mmoja'],
  s:['The problem, told through one father’s day.','Tatizo, kupitia siku ya baba mmoja.'],
  l:['Part 1 sets out the problem through one household. Juma, a middle-class father in Mbezi Beach, leaves home with four items to buy for his baby and his wife. After traffic, a long working day, rain and three shops, he gets home at 22:40 with two of them, one in the wrong size, and no medicine for a baby with a fever. The film ends on why this happens every month and the gap it leaves. Narration and subtitles in English and Kiswahili.','Sehemu ya 1 inaeleza tatizo kupitia kaya moja. Juma, baba wa kipato cha kati Mbezi Beach, anaondoka nyumbani na vitu vinne vya kununua kwa ajili ya mtoto na mke wake. Baada ya foleni, siku ndefu kazini, mvua na maduka matatu, anafika nyumbani saa nne na dakika arobaini usiku akiwa na viwili tu, kimoja cha saizi isiyo sahihi, na bila dawa kwa mtoto mwenye homa. Filamu inamalizia kwa nini hali hii hujirudia kila mwezi na pengo linalobaki. Msimulizi na manukuu kwa Kiingereza na Kiswahili.'],
  ch:[[0,'The morning','Asubuhi'],[68,'The night hunt','Msako wa usiku'],[97,'Home, two of four','Nyumbani, viwili kati ya vinne'],[120,'Why it happens','Kwa nini'],[131,'The gap','Pengo']],
  tr:[['en','English','media/afya-filamu-juma-1.en.txt'],['sw','Kiswahili','media/afya-filamu-juma-1.sw.txt']]},
 {f:'afya-filamu-juma-2',src:'/_blob/7457c33f434387b2b566fd33a041d06c',srcSw:'/_blob/e92ab80dc5dcbd47338e44e8f69e136c',po:'media/p-afya-filamu-juma-2.jpg',fb:['img/k-store-family.webp'],dur:260,k:['Family film · part 2','Filamu ya familia · sehemu 2'],
  t:['Mwezi wa Juma, part 2: the same month with Afya Basics','Mwezi wa Juma, sehemu 2: mwezi uleule na Afya Basics'],
  s:['4 minutes · the solution, the business and the plan.','Dakika 4 · suluhisho, biashara na mpango.'],
  l:['Part 2 shows the same family’s month with Afya Basics: a free Afya Check that finds Juma’s raised blood pressure, a Mama na Mtoto box set up once, a reminder to move up a nappy size, delivery while he is at work, same-day medicine ordered on WhatsApp and a baby massage at home from a partner. It closes with how the business works, the master-model numbers, the long-term plan and the ask. Narration and subtitles in English and Kiswahili.','Sehemu ya 2 inaonyesha mwezi wa familia hiyohiyo pamoja na Afya Basics: Afya Check ya bure inayogundua shinikizo la damu la Juma, box ya Mama na Mtoto inayowekwa mara moja, ukumbusho wa kupandisha saizi ya nepi, kuletewa bidhaa akiwa kazini, dawa inayoagizwa kwa WhatsApp na kufika siku hiyohiyo, na masaji ya mtoto nyumbani kutoka kwa mshirika. Inamalizia na jinsi biashara inavyofanya kazi, namba za modeli kuu, mpango wa muda mrefu na ombi. Msimulizi na manukuu kwa Kiingereza na Kiswahili.'],
  ch:[[0,'Afya Basics','Afya Basics'],[8,'The store','Duka'],[31,'Afya Check','Afya Check'],[53,'The Afya Box','Afya Box'],[88,'Delivery & WhatsApp','Kuletewa na WhatsApp'],[118,'Afya Huduma','Afya Huduma'],[131,'Family time','Muda wa familia'],[147,'The business','Biashara'],[175,'The numbers','Namba'],[211,'The vision','Ndoto'],[229,'The ask','Ombi']],
  tr:[['en','English','media/afya-filamu-juma-2.en.txt'],['sw','Kiswahili','media/afya-filamu-juma-2.sw.txt']]},
 {f:'afya-chain',src:'/_blob/5ae50546d50f352fa3ab8593261f02ce',srcSw:'/_blob/435de6691a5e95c1c6a46fbaedfedbcc',av1En:'/_blob/e1620a1d7bf4b3cd06f7f78a4c9617ef',av1Sw:'/_blob/7c939b5e417b58557a602a2d95d89050',po:'media/p-afya-chain.jpg',fb:['img/c-port.webp'],dur:230,k:['How it works','Jinsi inavyofanya kazi'],
  t:['From factory to front door: the whole supply chain','Kutoka kiwandani hadi mlangoni: mnyororo mzima'],
  s:['3 minutes · ten steps, one Mother & Baby Box.','Dakika 3 · hatua kumi, Box moja ya Mama na Mtoto.'],
  l:['Follows one Mother & Baby Box through the ten steps of the chain: known manufacturers, TMDA registration, planning from member demand, port clearance, goods-in scanning of batch and expiry, first-expiry-first-out stock, the store till, calm packing with photo proof, zoned same-day delivery with a code at the door, and aftercare. It ends with how goods, money and data move through one system. Section 2.3 explains each step in detail.','Inafuata Box moja ya Mama na Mtoto kupitia hatua kumi: watengenezaji wanaojulikana, usajili wa TMDA, mipango kutokana na mahitaji ya wanachama, forodha bandarini, kuskani batch na tarehe, stoo ya FEFO, kaunta ya duka, upakiaji wenye picha, usafirishaji wa siku hiyohiyo kwa kanda na namba mlangoni, na huduma baada ya mauzo. Sehemu 2.3 inaeleza kila hatua kwa kina.'],
  ch:[[0,'Ten steps','Hatua kumi'],[20,'Supplier','Msambazaji'],[32,'Registration','Usajili'],[49,'Planning','Mipango'],[70,'Import','Uingizaji'],[92,'Goods-in','Kupokea'],[110,'FEFO stock','Stoo'],[132,'Store','Duka'],[152,'Packing','Upakiaji'],[166,'Delivery','Usafirishaji'],[185,'Aftercare','Baada ya mauzo'],[195,'One system','Mfumo mmoja']],
  tr:[['en','English','media/afya-chain.en.txt'],['sw','Kiswahili','media/afya-chain.sw.txt']]},
 {f:'afya-how-it-works',src:'/_blob/7fab375add778c03d766eea383ec785d',srcSw:'/_blob/bf1b83b895f51e379ec60db45882b020',po:'media/video-poster.jpg',fb:['img/exterior.webp'],dur:69,k:['The full story','Hadithi kamili'],
  t:['How Afya Basics works, start to finish','Jinsi Afya Basics inavyofanya kazi, mwanzo hadi mwisho'],
  s:['The whole model in one family’s month.','Mfumo mzima kupitia mwezi wa familia moja.'],
  l:['The whole model in one family’s month: today’s hunt across pharmacies, the free Afya Check, scan-and-go payment, joining the Afya Box, one-tap reorder, same-day delivery, and what it changes for the family. Use the chapters to jump to the part you want to discuss.','Mfumo mzima kupitia mwezi wa familia moja: msako wa leo kwenye maduka ya dawa, Afya Check ya bure, kulipa kwa scan-and-go, kujiunga na Afya Box, kuagiza tena kwa mguso mmoja, usafirishaji siku hiyo hiyo, na mabadiliko kwa familia. Tumia sura kuruka hadi sehemu unayotaka kujadili.'],
  ch:[[0,'Today','Leo'],[11,'Afya Check','Afya Check'],[21,'Scan & go','Scan na uende'],[30,'Afya Box','Afya Box'],[43,'Order & delivery','Agiza na usafirishaji'],[54,'Benefits','Faida']]},
 {f:'v-store-visit',src:'/_blob/51181e45552ce6872897709cbc139b0b',srcSw:'/_blob/f8e65aa5c6fd38dfe5d6716f092ca3a4',dur:35,fb:['img/scan.webp','img/interior.webp'],k:['Journey A · in store','Safari A · dukani'],
  t:['A walk-in visit in under three minutes','Ziara dukani chini ya dakika tatu'],
  s:['Afya Check, Care Zones, scan & go, pay.','Afya Check, Kanda za Huduma, scan na uende, lipa.'],
  l:['A father walks in for a blood-pressure monitor. He takes the free Afya Check by the door, walks to the Heart & Diabetes Care Zone, compares registered brands at one printed price with an adviser, scans with his phone and approves the mobile-money push in under 30 seconds. The TRA receipt arrives by SMS.','Baba anaingia kununua kipimo cha shinikizo la damu. Anafanya Afya Check ya bure ya sekunde 50 karibu na mlango, anaenda Kanda ya Moyo na Kisukari, analinganisha chapa zilizosajiliwa kwa bei moja pamoja na mshauri, ana-scan kwa simu na kuthibitisha malipo ya pesa ya simu chini ya sekunde 30. Risiti ya TRA inakuja kwa SMS.'],
  ch:[[0,'Walk in','Ingia'],[5,'Afya Check and Care Zone','Afya Check na Kanda ya Huduma'],[13,'Compare with an adviser','Linganisha na mshauri'],[21,'Scan, pay, receipt','Scan, lipa, risiti']],},
 {f:'v-online-order',src:'/_blob/69232254b7cb9701261d2731215cbd31',srcSw:'/_blob/54bff57dfb5157d367fec3981fcfaa46',dur:32,fb:['img/pay.webp','img/hub.webp'],k:['Journey C · online','Safari C · mtandaoni'],
  t:['Order again in under 30 seconds','Agiza tena chini ya sekunde 30'],
  s:['Reorder in the app, mobile money, rider, doorstep.','Agiza tena kwenye programu, pesa ya simu, msafirishaji, mlangoni.'],
  l:['A mother reorders nappies and wipes in the app. “Order again” shows last month’s basket; one tap, she approves the mobile-money push on her phone, the picker packs it at the store, and a rider brings it the same day, with a code to confirm at the door.','Mama anaagiza tena nepi na wipes kwenye programu. “Agiza tena” inaonyesha kikapu cha mwezi uliopita; mguso mmoja, anathibitisha malipo kwenye simu, mfungashaji anapakia dukani, na msafirishaji analeta siku hiyo hiyo, kwa namba ya kuthibitisha mlangoni.'],
  ch:[[0,'Order again','Agiza tena'],[10,'Pay by mobile money','Lipa kwa pesa ya simu'],[16,'Picked and packed','Inachukuliwa na kupakiwa'],[22,'Same-day delivery','Usafirishaji siku hiyo']],},
 {f:'v-afya-box',src:'/_blob/46f57a319030f6011ca18cb1db467c16',srcSw:'/_blob/e29f15ad13264aa87d43e8276ac8d7ec',dur:40,fb:['img/dad.webp','img/boxdoor.webp'],k:['Journey D · membership','Safari D · uanachama'],
  t:['The monthly Afya Box, zero clicks','Afya Box ya kila mwezi, bila kubofya'],
  s:['Join, swap brands 12 days before month end, delivery.','Jiunge, badilisha chapa siku 12 kabla ya mwisho wa mwezi, usafirishaji.'],
  l:['How a family joins on a 1, 6 or 12-month plan, receives a reminder 12 days before month end to keep the box or swap brands (Afya Choice), and gets it on a fixed day with packing and delivery already inside the price. A father living with diabetes never again finds his test strips finished on a Sunday night.','Jinsi familia inavyojiunga kwa mpango wa mwezi 1, 6 au 12, inapokea ukumbusho siku 12 kabla ya mwisho wa mwezi kubaki na box au kubadilisha chapa (Afya Choice), na kuipokea siku maalum, ufungaji na usafirishaji vikiwa ndani ya bei. Baba mwenye kisukari hatakuta tena vipande vyake vya kupima vimeisha Jumapili usiku.'],
  ch:[[0,'Join','Jiunge'],[7,'Keep or swap','Baki au badilisha'],[17,'Packed and delivered','Inapakiwa na kuletwa'],[25,'The home shelf','Rafu ya nyumbani']],},
 {f:'v-diaspora',src:'/_blob/daccb626bebedb01caeca2a29ef65d08',srcSw:'/_blob/83450192fad9fdb862a66fbe880e2ace',dur:34,fb:['img/diaspora.webp','img/bibi.webp','img/boxdoor.webp'],k:['Journey E · diaspora','Safari E · diaspora'],
  t:['From a son abroad to his mother’s door','Kutoka kwa mwana ughaibuni hadi mlangoni kwa mama yake'],
  s:['He pays for her box abroad; it reaches Bibi.','Analipia box yake akiwa nje; inamfikia Bibi.'],
  l:['A young Tanzanian working abroad pays for his mother’s Senior box by international card in under two minutes and adds a message. The next day the rider hands the closed green box to Bibi in Dar es Salaam, and a photo confirmation reaches his phone. Money sent home becomes visible care.','Kijana Mtanzania anayefanya kazi nje analipia box ya Senior ya mama yake kwa kadi ya kimataifa chini ya dakika mbili na kuongeza ujumbe. Kesho yake msafirishaji anamkabidhi Bibi box ya kijani iliyofungwa jijini Dar es Salaam, na picha ya uthibitisho inafika kwenye simu yake. Pesa iliyotumwa nyumbani inakuwa huduma inayoonekana.'],
  ch:[[0,'Choose Mama’s box','Chagua box ya Mama'],[7,'Pay by card','Lipa kwa kadi'],[14,'Delivered in Dar','Imefika Dar'],[22,'Photo confirmation','Picha ya uthibitisho']],},
 {f:'v-huduma',src:'/_blob/1b1f5f40229b9ab12f2eb838d2b1e97e',srcSw:'/_blob/4bdda704385dfe9711b3580aee6dc551',dur:45,fb:['img/real-mother-baby.webp'],k:['Afya Huduma · services','Afya Huduma · huduma'],
  t:['More than products: care in every box','Zaidi ya bidhaa: huduma katika kila box'],
  s:['Free checks, a partner service, add-ons, two income streams.','Vipimo vya bure, huduma ya mshirika, huduma za ziada, mito miwili ya mapato.'],
  l:['How every Afya Box carries services as well as products, in the same four layers for all 17 boxes: a free check in store every month, one partner service priced into the box (a baby massage every month in Mama na Mtoto), digital care, and add-ons at member prices that pay Afya a 10% commission. Ends with what the two income streams add in the master model.','Jinsi kila Afya Box inavyobeba huduma pamoja na bidhaa, kwa safu nne zilezile katika box zote 17: kipimo cha bure dukani kila mwezi, huduma moja ya mshirika ndani ya bei (masaji ya mtoto kila mwezi kwa Mama na Mtoto), huduma ya kidijitali, na huduma za ziada kwa bei ya wanachama ambazo humlipa Afya kamisheni ya 10%. Inamalizia na mito miwili ya mapato kwenye modeli kuu.'],
  ch:[[0,'Care in every box','Huduma katika kila box'],[7,'Free check','Kipimo cha bure'],[12,'Partner service','Huduma ya mshirika'],[21,'Digital care','Huduma ya kidijitali'],[27,'Add-ons and commission','Huduma za ziada na kamisheni']],},
 {f:'v-investor-60',src:'/_blob/2a391131521a5332efd40aefc693cc64',srcSw:'/_blob/1455c76fa0ad8799ce1d5fc08afb8e17',dur:62,fb:['img/exterior.webp'],k:['For investors','Kwa wawekezaji'],
  t:['The 60-second investor pitch','Wasilisho la sekunde 60 kwa wawekezaji'],
  s:['Problem, answer, numbers, the ask.','Tatizo, jibu, namba, ombi.'],
  l:['The problem, the answer and the money in one minute: year-1 revenue, the break-even month, members by month 12, the road to dozens of stores and the seed ask released in three tranches. Every figure in the film is a planning estimate from the master model.','Tatizo, jibu na fedha kwa dakika moja: mapato ya mwaka 1, mwezi wa kufikia faida, wanachama kufikia mwezi 12, njia ya maduka mengi na mtaji wa mbegu unaotolewa kwa awamu tatu. Kila namba kwenye filamu ni makadirio ya mipango kutoka modeli kuu.'],
  ch:[[0,'The problem','Tatizo'],[10,'The answer','Jibu'],[17,'Year one','Mwaka wa kwanza'],[31,'The road','Njia'],[38,'The ask','Ombi']],}];
VIDS.forEach(v=>{if(!v.ch&&v.b)v.ch=v.b.map(x=>{const t=x[0].split(':');return[+t[0]*60+ +t[1],x[1],x[2]]});if(!v.src)v.src=`media/${v.f}.mp4`;if(!v.po)v.po=`media/p-${v.f}.jpg`});
const vposter=(v,alt)=>`<img src="${v.po}" data-fb="${v.fb.join('|')}" onerror="p0fb(this)" alt="${esc(alt||'Concept image: poster for '+v.t[0])}" loading="lazy" decoding="async" width="1280" height="720">`;
function vlibHTML(){return `<p class="s11lead">${L('Eleven films, listed in the suggested viewing order. The 4½-minute brand film covers the whole case, from the first store to the twelve-year plan. The two-part family film tells the same case through one father’s month, and the 3-minute supply-chain film follows one box from the factory to the front door. Narrated films carry English and Kiswahili subtitles (CC button). The seven short films use background music and captions in both languages, so they can be shown in a meeting room or watched on a phone with the sound off. Each short film answers one investor question; the Afya Huduma film explains the services and partner layer.','Filamu kumi na moja, zimepangwa kwa mpangilio unaopendekezwa wa kutazama. Filamu ya chapa ya dakika 4½ inaeleza hoja nzima, kutoka duka la kwanza hadi mpango wa miaka kumi na mbili. Filamu ya familia yenye sehemu mbili inaeleza hoja hiyohiyo kupitia mwezi wa baba mmoja, na filamu ya mnyororo wa usambazaji ya dakika 3 inafuata box moja kutoka kiwandani hadi mlangoni. Filamu zenye msimulizi zina manukuu ya Kiingereza na Kiswahili (kitufe cha CC). Filamu saba fupi zina muziki wa nyuma na maandishi ya lugha zote mbili, hivyo zinaweza kuonyeshwa kwenye chumba cha mkutano au kutazamwa kwenye simu bila sauti. Kila filamu fupi inajibu swali moja la mwekezaji; filamu ya Afya Huduma inaeleza huduma na washirika.')}</p>
<div class="p0v-lib" id="p0vlib">
 <div class="p0v-main">
  <div class="p0v-box" id="p0vbox" tabindex="0" aria-label="Video player. Space plays or pauses, arrow keys seek five seconds, N and P change film, F full screen.">
   <video id="p0vid" playsinline preload="metadata" controls></video>
   <div class="p0v-prod" id="p0vprod" hidden></div>
   <button type="button" class="p0v-big" id="p0vbig">${'<span>'+I.play+'</span>'}<b id="p0vbigt">${L('Play','Cheza')}</b></button>
   <span class="p0k-cap">${L('Concept film','Filamu ya dhana')}</span>
  </div>
  <div class="p0v-chbar" id="p0vchbar"></div>
  <div class="p0v-meta">
   <div class="p0v-now" aria-live="polite"><span class="p0k-k" id="p0vk"></span><h3 id="p0vt"></h3><p id="p0vl"></p></div>
   <div class="p0v-ch" id="p0vch"></div>
   <div class="p0v-opts"><label class="p0v-tg"><input type="checkbox" id="p0vauto"><i></i>${L('Autoplay next film','Cheza filamu inayofuata')}</label><span class="p0v-keys">Space · ← → · N / P · F</span></div>
  </div>
 </div>
 <ol class="p0v-list" id="p0vlist">${VIDS.map((v,i)=>`<li><button type="button" class="p0v-it${i?'':' on'}" data-v="${i}"><span class="ph">${vposter(v)}<span class="du" id="p0vd${i}">${mmss(v.dur)}</span><span class="st" id="p0vs${i}"></span></span><span class="tx"><small>${pad(i+1)} · ${L(v.k[0],v.k[1])}</small><b>${L(v.t[0],v.t[1])}</b><em>${L('What you learn: '+v.s[0],'Utakachojifunza: '+v.s[1])}</em></span></button></li>`).join('')}</ol>
</div>
<p class="note">${L('Concept images and AI video of the planned store, with app mock-ups · 16:9, narration in English and Kiswahili with soft music · figures from master model '+esc(IN.meta.version)+', planning estimates','Picha za dhana na video za duka linalopangwa, pamoja na mifano ya programu · 16:9, sauti ya msimulizi kwa Kiswahili na Kiingereza pamoja na muziki laini · namba kutoka modeli kuu '+esc(IN.meta.version)+', makadirio')}</p>${PNOTE()}`}

/* ---------- reading paths ---------- */
const EST={'1':12,'2':10,'3':12,'4':12,'5':12,'6':15,'7':12,'0':10};
const PATHS={
 p60:{t:['60 seconds','Sekunde 60'],who:['The busy investor','Mwekezaji mwenye shughuli nyingi'],
  d:['One headline, one picture, five numbers and the ask: enough to decide whether to give us ten more minutes. Watch the pitch or read the three blocks below; about a minute either way.','Kichwa kimoja, picha moja, namba tano na ombi letu: inatosha kuamua kama utatupa dakika kumi zaidi. Tazama wasilisho au soma sehemu tatu hapa chini; takriban dakika moja kwa njia yoyote.'],
  steps:[{k:'p0:pitch',go:'p0film',v:10,t:['Watch the 60-second investor pitch','Tazama wasilisho la sekunde 60'],n:['Film 11 in the video library','Filamu ya 11 kwenye maktaba'],m:'60 s'},
   {k:'p0:nums',go:'p0nums',t:['The five numbers, with the working shown','Namba tano, pamoja na hesabu'],n:['Live from the master model','Moja kwa moja kutoka modeli kuu'],m:'20 s'},
   {k:'p0:ask',go:'p0ask',t:['The ask and the three tranches','Ombi na awamu tatu'],get n(){return [F.m(SEED.amount)+' · '+SEED.tranches.map(t=>t*100).join(' · '),F.m(SEED.amount)+' · '+SEED.tranches.map(t=>t*100).join(' · ')]},m:'20 s'},
   {k:'p0:sum',go:'p0sumx',t:['Print or save the one-page summary','Chapisha au hifadhi muhtasari wa ukurasa mmoja'],n:['For your files or your partners','Kwa kumbukumbu zako au washirika wako'],m:'20 s'}]},
 p10:{t:['10 minutes','Dakika 10'],who:['The interested investor','Mwekezaji mwenye shauku'],
  d:['Six sections, skimmed in order, take you from the pain to the money. Each opens with a picture or a demo, so a skim still shows the business working.','Sehemu sita, zikisomwa kwa haraka kwa mpangilio, zinakupeleka kutoka kwenye tatizo hadi fedha. Kila moja inaanza na picha au jaribio, hivyo hata usomaji wa haraka unaonyesha biashara ikifanya kazi.'],
  steps:[['s1-1',2,'Five pains, as real situations','Matatizo matano, kama hali halisi'],['s1-3',1.5,'Why one city is enough to start','Kwa nini jiji moja linatosha kuanza'],['s3-2',2,'The five journeys and scan-and-go','Safari tano na scan-and-go'],['s3-5',1.5,'The box that renews itself','Box inayojirudia yenyewe'],['s6-1',1.5,'Profit, cash and break-even','Faida, fedha taslimu na kufikia faida'],['s6-3',1.5,'What each shilling buys','Kila shilingi inanunua nini']].map(x=>({k:x[0],sec:x[0],m:x[1]+' min',t:null,n:[x[2],x[3]]}))},
 pdd:{t:['Full due diligence','Uchunguzi kamili'],who:['The serious investor','Mwekezaji makini'],
  d:['Every section in full: the calculators, the model, the risks and every source. Ticks appear as you visit each section, so you can stop and come back; progress is remembered in this browser only.','Kila sehemu kwa ukamilifu: vikokotoo, modeli, hatari na kila chanzo. Alama zinaonekana unapotembelea kila sehemu, hivyo unaweza kusimama na kurudi; maendeleo yanakumbukwa kwenye kivinjari hiki pekee.'],steps:null}};
let PATH=LS.get('afyaPath','p60');if(!PATHS[PATH])PATH='p60';
const WORDS={};/* filled by the search index: real reading time per section */
function pathSteps(k){const P0=PATHS[k];if(P0.steps)return P0.steps;return ALL.filter(x=>x.id!=='s0-1').map(x=>({k:x.id,sec:x.id,m:(WORDS[x.id]?Math.max(4,Math.round(WORDS[x.id]/200)+3):EST[x.part.n])+' min',t:null,n:[x.plan,x.plan],grp:x.part}))}
function pathList(k){const v=visited();let h='',lastG=null;
 pathSteps(k).forEach((st,i)=>{const sec=st.sec?ALL.find(x=>x.id===st.sec):null;
  if(st.grp&&st.grp!==lastG){lastG=st.grp;h+=`<li class="grp" style="--pc:${st.grp.c}">Part ${st.grp.n} · ${esc(st.grp.name)}</li>`}
  const done=v.has(st.k),title=sec?`${sec.no} ${esc(sec.title)}`:L(st.t[0],st.t[1]);
  h+=`<li><a href="#${sec?sec.id:'s0-1'}" ${sec?'':`data-scroll="${st.go}"`} data-k="${st.k}"${st.v!==undefined?` data-v="${st.v}"`:''} class="${done?'done':''}"><span class="ck"><span>${i+1}</span>${I.tick}</span><span class="t"><b>${title}</b><small>${L(esc(st.n[0]),esc(st.n[1]))}</small></span><span class="tm">${st.m}</span></a></li>`});
 return h}
function pathHTML(){return `<div class="p0v-path" id="p0path"><span class="p0k-k">${L('Your reading path','Njia yako ya kusoma')}</span>
 <div class="p0v-ptabs" role="group" aria-label="Reading path" style="margin-top:12px">${Object.entries(PATHS).map(([k,x])=>`<button type="button" data-p="${k}" aria-pressed="${k===PATH}"><b>${L(x.t[0],x.t[1])}</b><span>${L(x.who[0],x.who[1])}</span></button>`).join('')}</div>
 <p class="p0v-pd" id="p0pd"></p>
 <div class="p0v-prog"><div class="bar"><i id="p0pbar"></i></div><b id="p0pn"></b><button type="button" id="p0preset">${L('Reset','Anza upya')}</button></div>
 <ol class="p0v-steps" id="p0steps"></ol>
 <p class="p0v-alt" id="p0palt"></p></div>`}

/* ---------- search across every section ---------- */
function searchHTML(){return `<div class="p0v-find" id="p0find"><label for="p0q" class="p0k-k">${L('Find anything','Tafuta chochote')}</label>
 <div class="p0v-qbox">${I.search}<input id="p0q" type="search" autocomplete="off" spellcheck="false" placeholder="${PH.q[LANG==='sw'?1:0]}" aria-describedby="p0qst" aria-controls="p0res"><kbd>/</kbd></div>
 <div class="p0v-qchips">${['break-even','Afya Check','diaspora','TMDA','tranche','rider','churn','nappies'].map(q=>`<button type="button" data-q="${q}">${q}</button>`).join('')}</div>
 <div class="p0v-qst" id="p0qst" aria-live="polite">${L(`Searches all ${ALL.length} sections and the 26 questions below`,`Inatafuta sehemu zote ${ALL.length} na maswali 26 hapa chini`)}</div>
 <ol class="p0v-res" id="p0res"></ol></div>`}
let IDX=null,IDXbusy=false;
function buildIndex(done){if(IDX){done&&done();return}if(IDXbusy)return;IDXbusy=true;
 const base=ALL.map(x=>({id:x.id,no:x.no,title:x.title,plan:x.plan,part:x.part,heads:'',text:''}));let i=0;
 const step=()=>{const t0=performance.now();
  while(i<base.length&&performance.now()-t0<40){const e=base[i++],S=window.SECTIONS&&window.SECTIONS[e.id];
   if(S&&S.render&&e.id!=='s0-1'){try{const k=ALL.findIndex(x=>x.id===e.id);const html=S.render(ALL[k],ALL[k].part,ALL[k-1],ALL[k+1]);
     const tp=document.createElement('template');tp.innerHTML=String(html||'');const c=tp.content;
     c.querySelectorAll('script,style,svg').forEach(n=>n.remove());
     e.heads=[...c.querySelectorAll('.modno,h1,h2,h3,h4')].map(n=>n.textContent.trim()).join(' · ');
     e.text=(c.textContent||'').replace(/\s+/g,' ').trim();WORDS[e.id]=e.text.split(' ').length}catch(err){}}}
  if(i<base.length)setTimeout(step,0);else{IDX=base;IDXbusy=false;done&&done()}};
 step()}
function runSearch(q){const res=document.getElementById('p0res'),st=document.getElementById('p0qst');if(!res)return;
 q=(q||'').trim().toLowerCase();if(q.length<2){res.innerHTML='';st.innerHTML=L(`Searches all ${ALL.length} sections and the 26 questions below`,`Inatafuta sehemu zote ${ALL.length} na maswali 26 hapa chini`);return}
 const toks=q.split(/\s+/).filter(Boolean),src=IDX||ALL.map(x=>({id:x.id,no:x.no,title:x.title,plan:x.plan,part:x.part,heads:'',text:''}));
 const cnt=(s,t)=>{let n=0,p=0;s=s.toLowerCase();while((p=s.indexOf(t,p))>=0&&n<50){n++;p+=t.length}return n};
 const hits=[];
 src.forEach(e=>{let sc=0,ok=true;toks.forEach(t=>{const a=cnt(e.title,t)*12+cnt(e.plan,t)*6+cnt(e.heads,t)*4+cnt(e.text,t);if(!a)ok=false;sc+=a});if(ok&&sc)hits.push({e,sc,type:'s'})});
 FAQf().forEach((f,j)=>{const s=(f[1]+' '+f[2]).replace(/<[^>]+>/g,' ');let sc=0,ok=true;toks.forEach(t=>{const a=cnt(f[1],t)*8+cnt(s,t);if(!a)ok=false;sc+=a});if(ok&&sc)hits.push({e:{faq:j,title:f[1].replace(/<[^>]+>/g,''),text:s},sc:sc*.9,type:'f'})});
 hits.sort((a,b)=>b.sc-a.sc);const top=hits.slice(0,10);
 const hl=s=>{let h=esc(s);toks.forEach(t=>{if(t.length<2)return;h=h.replace(new RegExp('('+t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+')','gi'),'<mark>$1</mark>')});return h};
 const snip=s=>{if(!s)return '';const lo=s.toLowerCase();let p=lo.indexOf(toks[0]);if(p<0)return '';const a=Math.max(0,p-70);return (a?'…':'')+s.slice(a,a+190)+'…'};
 res.innerHTML=top.map((h,i)=>h.type==='s'?`<li><a href="#${h.e.id}" style="--pc:${h.e.part.c}" class="${i?'':'on'}"><small><span>${h.e.no} · Part ${h.e.part.n} · ${esc(h.e.part.name)}</span><span>${L('Section','Sehemu')}</span></small><b>${hl(h.e.title)}</b><p>${hl(snip(h.e.text)||h.e.plan)}</p></a></li>`
  :`<li><a href="#s0-1" data-faq="${h.e.faq}" class="${i?'':'on'}"><small><span>${L('Ask the showroom','Uliza showroom')} · Q${pad(h.e.faq+1)}</span><span>FAQ</span></small><b>${hl(h.e.title)}</b><p>${hl(snip(h.e.text))}</p></a></li>`).join('');
 st.innerHTML=top.length?L(`${hits.length} result${hits.length>1?'s':''}${IDX?' · full text':' · titles only, full text loading'}`,`Matokeo ${hits.length}${IDX?' · maandishi yote':' · vichwa pekee, maandishi yanapakia'}`):L('Nothing found. Try a simpler word, such as “box”, “check” or “rent”.','Hakuna kilichopatikana. Jaribu neno rahisi, kama “box”, “check” au “rent”.');
 res.querySelectorAll('[data-faq]').forEach(a=>a.onclick=e=>{e.preventDefault();openFaq(+a.dataset.faq)})}

/* ---------- Ask the showroom · investor questions ---------- */
const FCAT=[['all','All questions','Maswali yote'],['biz','The business','Biashara'],['cust','Customers','Wateja'],['ops','Operations','Uendeshaji'],['money','Money','Fedha'],['own','The deal','Makubaliano'],['risk','Risks','Hatari']];
let FAQc=null;const FAQf=()=>FAQc||(FAQc=(()=>{const b=D('base'),bs=D('best'),dn=D('down'),sp=Y1split(b),opex=b.opex,STF=STAFFN;return [
 ['biz','What exactly is Afya Basics?',`<p>A health-essentials brand for Tanzanian homes, built from three parts that share <b>one account, one price list and one stock system</b>: a secure street-front flagship store in Dar es Salaam organised in six Care Zones, a monthly <b>Afya Box</b> membership, and an app with WhatsApp ordering.</p><p>It is not a traditional pharmacy. It sells the registered everyday products a household uses to look after health at home: nappies and baby care, blood-pressure monitors and glucose strips, adult diapers, dressings, first aid and personal care. About <b>${IN.product_families} product families</b>, each with ${IN.brands_per_item} trusted brands at one printed price.</p>`,['s2-1','s3-6'],'Afya Basics ni nini hasa?',`<p>Chapa ya bidhaa za afya kwa nyumba za Tanzania, yenye sehemu tatu zinazotumia <b>akaunti moja, orodha moja ya bei na mfumo mmoja wa stoo</b>: duka kuu salama la mbele ya barabara jijini Dar es Salaam lenye Kanda sita za Huduma, uanachama wa <b>Afya Box</b> wa kila mwezi, na programu pamoja na kuagiza kwa WhatsApp.</p><p>Si duka la dawa la kawaida. Inauza bidhaa zilizosajiliwa ambazo familia hutumia kila siku kutunza afya nyumbani: nepi na huduma za mtoto, vipimo vya shinikizo la damu na vipande vya sukari, nepi za watu wazima, bandeji, huduma ya kwanza na usafi binafsi. Takriban <b>familia ${IN.product_families} za bidhaa</b>, kila moja ikiwa na chapa ${IN.brands_per_item} kwa bei moja.</p>`],
 ['biz','Why will families switch from the pharmacy they already use?',`<p>Because the five pains are removed <b>together</b>, not one at a time: one trip instead of three, a free check and advice before any sale, registered products only with one printed price, a box that arrives before strips or nappies run out, and a way for family abroad to pay and see the delivery.</p><p><b>Example (illustrative):</b> a young mother in Kinondoni today visits two pharmacies and a supermarket for size-3 nappies, wipes and iron tablets, with the baby on her back. With Afya Basics her Mama na mtoto box arrives on the 1st, and when the baby grows she swaps to size 4 from her phone, up to 12 days before month end.</p>`,['s1-1','s5-3'],'Kwa nini familia zitahama kutoka duka la dawa wanalotumia sasa?',`<p>Kwa sababu tunaondoa matatizo yote matano <b>kwa pamoja</b>: safari moja badala ya tatu, kipimo cha bure na ushauri kabla ya kununua, bidhaa zilizosajiliwa pekee kwa bei moja, box inayofika kabla vipande au nepi hazijaisha, na njia kwa familia iliyo nje kulipa na kuona bidhaa zimefika.</p><p><b>Mfano:</b> mama kijana wa Kinondoni leo anatembelea maduka mawili ya dawa na supamaketi kwa nepi namba 3, wipes na vidonge vya madini ya chuma, mtoto mgongoni. Akiwa na Afya Basics, box yake ya Mama na mtoto inafika tarehe 1, na mtoto akikua anabadilisha kwenda namba 4 kwa simu yake.</p>`],
 ['biz','Why start in Dar es Salaam?',`<p>Dar es Salaam region had <b>5,383,728 people</b> at the 2022 census ${c(3)}. It is dense enough for same-day delivery on electric motorbikes and large enough that Store #1 needs only a tiny share: about <b>${Math.round(b.buyersDay)} paying shoppers a day</b> by month 12 and <b>${num(b.mem12)} box members</b>, roughly one resident in ${num(Math.round(b.residentsPerMember/100)*100)} (planning estimates).</p><p>The full market sizing, total, reachable and first target, is calculated step by step in section 1.3.</p>`,['s1-3','s1-4'],'Kwa nini kuanzia Dar es Salaam?',`<p>Mkoa wa Dar es Salaam ulikuwa na <b>watu 5,383,728</b> kwenye sensa ya 2022 ${c(3)}. Una msongamano wa kutosha kwa usafirishaji wa siku hiyo hiyo kwa pikipiki za umeme, na ni mkubwa kiasi kwamba Duka #1 linahitaji sehemu ndogo tu: takriban <b>wanunuzi ${Math.round(b.buyersDay)} kwa siku</b> kufikia mwezi 12 na <b>wanachama ${num(b.mem12)}</b> (makadirio ya mipango).</p>`],
 ['cust','Who are the first customers?',`<p>Urban households in Dar es Salaam managing a <b>recurring</b> health need: new and expecting mothers, carers of elderly parents, people living with hypertension or diabetes, people recovering from surgery or injury, offices and schools that need first-aid supplies, and families abroad paying for relatives at home.</p><p>What they share is that they buy every month whether or not anyone plans it. Our planning estimate for an average Afya Box is <b>${F.tsh(MB.avg_box)} a month</b>, with packing and delivery already inside that price. Section 1.4 has six full personas with their spend and journeys.</p>`,['s1-4','s3-5'],'Wateja wa kwanza ni akina nani?',`<p>Kaya za mjini Dar es Salaam zenye hitaji la afya <b>linalojirudia</b>: mama wapya na wajawazito, walezi wa wazazi wazee, watu wenye shinikizo la damu au kisukari, wanaopona baada ya upasuaji au jeraha, ofisi na shule zinazohitaji vifaa vya huduma ya kwanza, na familia zilizo nje zinazolipia ndugu nyumbani.</p><p>Wote wananunua kila mwezi. Makadirio ya wastani wa Afya Box ni <b>${F.tsh(MB.avg_box)} kwa mwezi</b>, ufungaji na usafirishaji vikiwa ndani.</p>`],
 ['cust','Is the free Afya Check a medical service?',`<p>No. It gives readings, not a diagnosis. It works at two levels: a <b>quick check at the door</b> (blood pressure, pulse and oxygen in about ${IN.check.quick_seconds} seconds) and the <b>full Afya Check</b>, ${IN.check.free_readings.length} measurements in about ${IN.check.minutes} minutes, from blood pressure and oxygen to weight and body fat. Both are free; optional finger-prick tests such as blood glucose and cholesterol are done by a trained adviser for a small fee. Advisers explain readings in plain words and <b>refer to a clinic when a reading needs a doctor</b>. Nobody is ever pressured to buy.</p><p>It exists because most of the need is hidden: only <b>17.6%</b> of Tanzanians with high blood pressure know they have it ${c(1)}. Planning estimate: about ${IN.check.checks_day_m12} checks a day by month 12, of which ${P(IN.check.check_to_purchase)} lead to a purchase, about <b>${Math.round(CHECKBUY)} sales a day</b> started by a free service. Device and data-consent rules are reviewed in section 4.5.</p>`,['s3-3','s4-5'],'Je, Afya Check ya bure ni huduma ya kitabibu?',`<p>Hapana. Inatoa vipimo, si utambuzi wa ugonjwa. Ina ngazi mbili: <b>kipimo cha haraka mlangoni</b> (shinikizo la damu, mapigo ya moyo na oksijeni kwa takriban sekunde ${IN.check.quick_seconds}) na <b>Afya Check kamili</b>, vipimo ${IN.check.free_readings.length} kwa takriban dakika ${IN.check.minutes}, kuanzia shinikizo la damu na oksijeni hadi uzito na mafuta mwilini. Vyote ni bure; vipimo vya hiari vya kuchoma kidole kama sukari na kolesteroli hufanywa na mshauri aliyefunzwa kwa ada ndogo. Washauri wanaeleza kwa lugha rahisi na <b>kumpeleka mtu kliniki pale kipimo kinapohitaji daktari</b>. Hakuna anayelazimishwa kununua.</p><p>Ni muhimu kwa sababu ni <b>17.6%</b> tu ya Watanzania wenye shinikizo la damu wanaojua hali yao ${c(1)}.</p>`],
 ['cust','How does the Afya Box work, step by step?',`<p><b>1.</b> Choose a box: mother &amp; baby, personal hygiene, women’s beauty, pregnancy, elderly care, or condition care such as diabetes or dialysis support. <b>2.</b> Choose a 1, 6 or 12-month plan; longer plans cost less per month. <b>3.</b> It renews automatically on the member’s date; nothing needs to be reordered. <b>4.</b> Twelve days before month end a reminder arrives by phone, SMS, email or WhatsApp: keep the box or swap brands at the same price (Afya Choice). <b>5.</b> It is packed from the locked choices and delivered on a fixed day.</p><p>Planning estimates on the average box: <b>${F.tsh(PLANP('m1'))}</b> a month on the monthly plan, ${F.tsh(PLANP('m6'))} on six months and ${F.tsh(PLANP('m12'))} on twelve, with packing and delivery (${F.tsh(MB.packing_delivery_in_price)}) already inside.</p><p><b>How a box price is built:</b> the products at shelf price, less the member saving (3% on the monthly plan, 6% on a 6-month plan, 9% on a 12-month plan), plus the box itself at landed cost (S TSh 3,500 · M 5,000 · L 6,500) and delivery at TSh 3,500, both charged at cost. Examples on the 1-month plan: Presha Care TSh 43,000, Sukari Care TSh 54,500, Bibi na Babu TSh 82,500 (Essential edition, first stage). Non-members can buy one-off kits.</p>`,['s3-5','s3-4'],'Afya Box inafanyaje kazi, hatua kwa hatua?',`<p><b>1.</b> Chagua box: mama na mtoto, usafi binafsi, urembo wa wanawake, ujauzito, huduma ya wazee, au huduma ya hali kama kisukari au msaada wa dialysis. <b>2.</b> Chagua mpango wa mwezi 1, 6 au 12. <b>3.</b> Inajirudia yenyewe kwenye tarehe ya mwanachama; hakuna haja ya kuagiza upya. <b>4.</b> Siku 12 kabla ya mwisho wa mwezi unapata ukumbusho: baki na box au badilisha chapa kwa bei ileile (Afya Choice). <b>5.</b> Inapakiwa na kuletwa siku maalum.</p><p>Makadirio: <b>${F.tsh(PLANP('m1'))}</b> kwa mwezi, ${F.tsh(PLANP('m6'))} kwa mpango wa miezi sita na ${F.tsh(PLANP('m12'))} kwa miezi kumi na mbili, ufungaji na usafirishaji (${F.tsh(MB.packing_delivery_in_price)}) vikiwa ndani.</p><p><b>Bei ya box inavyojengwa:</b> bidhaa kwa bei ya rafu, ukiondoa punguzo la mwanachama (3% kwa mpango wa mwezi, 6% kwa miezi 6, 9% kwa miezi 12), pamoja na box lenyewe kwa gharama halisi (S TSh 3,500 · M 5,000 · L 6,500) na usafirishaji TSh 3,500, vyote kwa gharama halisi. Mifano kwa mpango wa mwezi 1: Presha Care TSh 43,000, Sukari Care TSh 54,500, Bibi na Babu TSh 82,500 (Essential edition, first stage). Wasio wanachama wanaweza kununua vifurushi vya mara moja.</p>`],
 ['cust','How do Tanzanians abroad use it?',`<p>Tanzanians abroad sent home <b>TSh 3.3 trillion</b> in 2024/25 ${c(4)}, and part of it already pays for parents’ medicines and care, often without the sender knowing what was bought. With Afya Basics a son working abroad chooses a box or gift card, <b>pays by international card in under two minutes</b>, adds a message, and receives a <b>photo confirmation</b> when the rider hands the box to his mother.</p><p>For the family it means the right products arrive every month; for him it means money sent home becomes visible care.</p>`,['s3-8','s5-2'],'Watanzania walio nje wanaitumiaje?',`<p>Watanzania walio nje walituma nyumbani <b>TSh trilioni 3.3</b> mwaka 2024/25 ${c(4)}, na sehemu yake tayari inalipia dawa na huduma za wazazi. Kwa Afya Basics, mwana anayefanya kazi nje anachagua box, <b>analipa kwa kadi ya kimataifa chini ya dakika mbili</b>, anaongeza ujumbe, na anapokea <b>picha ya uthibitisho</b> box inapomfikia mama yake.</p>`],
 ['ops','How can a small team run a whole store?',`<p>Because one connected system does the routine work. <b>Every action is recorded once</b>: a sale updates stock, money, member points and the dashboard at the same moment; when an item reaches its reorder point a purchase order is drafted for approval; the till keeps selling when the internet drops.</p><p>In the model the store runs with <b>${STF} people</b> at full strength: ${IN.staff.map(s=>`${s[1]} × ${s[0].replace(/\s*\(.*\)/,'').toLowerCase()}`).join(', ')}, about <b>${F.m(PAYROLL)} a month</b> in salaries. Every night at <b>21:00</b> the founders receive the daily report on WhatsApp: sales, checks, new members, stock risks and issues.</p>`,['s4-1','s4-4'],'Timu ndogo inawezaje kuendesha duka zima?',`<p>Kwa sababu mfumo mmoja uliounganishwa unafanya kazi za kila siku. <b>Kila tendo linarekodiwa mara moja</b>: mauzo yanasasisha stoo, fedha, pointi za mwanachama na dashibodi papo hapo; bidhaa ikifika kiwango cha kuagiza, oda ya ununuzi inaandaliwa.</p><p>Kwenye modeli duka linaendeshwa na <b>watu ${STF}</b>, mishahara takriban <b>${F.m(PAYROLL)} kwa mwezi</b>. Kila usiku saa <b>3:00 (21:00)</b> waanzilishi wanapokea ripoti ya siku kwa WhatsApp.</p>`],
 ['ops','How fast is it, really?',`<p>Speed is a promise we measure, with a target for every moment: <b>find a product in under 1 minute</b> (Care Zones, shelf numbers, find-it screen); <b>pay in under 30 seconds</b> (scan-and-go, self-checkout, mobile-money push); <b>find and pay in store in under 3 minutes</b>; <b>repeat online order in under 30 seconds</b>; <b>click and collect ready in under 2 hours</b>; <b>same-day delivery</b> in Dar for orders before 15:00; <b>WhatsApp answer in under 5 minutes</b> in opening hours; <b>diaspora gift in under 2 minutes</b>; the monthly box needs <b>zero clicks</b>.</p>`,['s3-2','s4-3'],'Je, ni kwa kasi kiasi gani hasa?',`<p>Kasi ni ahadi tunayoipima: <b>kupata bidhaa chini ya dakika 1</b>; <b>kulipa chini ya sekunde 30</b>; <b>kupata na kulipa dukani chini ya dakika 3</b>; <b>kuagiza tena mtandaoni chini ya sekunde 30</b>; <b>click and collect chini ya saa 2</b>; <b>usafirishaji siku hiyo hiyo</b> Dar kwa oda kabla ya saa 9:00 mchana (15:00); <b>jibu la WhatsApp chini ya dakika 5</b>; <b>zawadi ya diaspora chini ya dakika 2</b>; box ya mwezi <b>bila kubofya</b>.</p>`],
 ['ops','Where do products come from, and how do you know they are genuine?',`<p>Goods come mostly from <b>China and India</b>, imported legally, with <b>TMDA registration where required</b>. Every product has a barcode and batch, shelves are run first-expiry-first-out, and only registered, quality-checked items reach the shelf.</p><p>Trust matters because WHO estimates that <b>1 in 10</b> medical products in low- and middle-income countries is substandard or falsified ${c(2)}. For a family, “registered only, one printed price, written warranty” is a reason to switch, not a slogan. Sourcing and landed cost are in section 4.2; recalls and complaints in 4.5.</p>`,['s4-2','s4-5'],'Bidhaa zinatoka wapi, na mnajuaje ni halisi?',`<p>Bidhaa zinatoka hasa <b>China na India</b>, zikiingizwa kihalali, zikiwa na <b>usajili wa TMDA pale unapohitajika</b>. Kila bidhaa ina barcode na namba ya batch, na ni bidhaa zilizosajiliwa na kukaguliwa pekee zinazofika rafuni.</p><p>WHO inakadiria kwamba <b>1 kati ya 10</b> ya bidhaa za tiba katika nchi za kipato cha chini na kati ni duni au bandia ${c(2)}.</p>`],
 ['ops','How does delivery work, and who pays for it?',`<p>Orders placed before 15:00 reach homes in Dar es Salaam the <b>same day</b>: ${ISL()?'by partner riders paid per delivery.':'by the store’s two electric motorbikes.'} Riders are assigned automatically by zone, with live tracking and <b>photo or code proof</b> at the door. Click and collect is ready in under two hours.</p><p>The customer pays, inside prices they choose: for online orders the planning estimate is a <b>${F.tsh(IN.online.delivery_fee)} delivery fee</b> against a rider cost of ${F.tsh(IN.online.rider_cost_per_order)} per order; for the Afya Box, packing and delivery (${F.tsh(MB.packing_delivery_in_price)}) are already inside the box price.</p>`,['s4-3','s6-2'],'Usafirishaji unafanyaje kazi, na nani analipa?',`<p>Oda zilizowekwa kabla ya saa 9:00 mchana (15:00) zinafika nyumbani Dar es Salaam <b>siku hiyo hiyo</b>: ${ISL()?'kwa wasafirishaji washirika wanaolipwa kwa kila safari.':'kwa pikipiki mbili za umeme za duka.'} Msafirishaji anapangwa kwa eneo, na <b>picha au namba ya uthibitisho</b> mlangoni.</p><p>Mteja analipa ndani ya bei anayochagua: oda za mtandaoni zina <b>ada ya ${F.tsh(IN.online.delivery_fee)}</b> dhidi ya gharama ya ${F.tsh(IN.online.rider_cost_per_order)}; kwa Afya Box, ufungaji na usafirishaji (${F.tsh(MB.packing_delivery_in_price)}) vimo ndani ya bei.</p>`],
 ['money','How does the business make money?',`<p>Three revenue lines from the same customers. <b>Walk-in sales</b>: about ${IN.store.visitors_day_m12} visitors a day by month 12, half of whom buy, with a ${F.tsh(IN.store.basket)} basket at a ${P(IN.store.retail_gm)} gross margin. <b>Afya Box</b>: an average ${F.tsh(MB.avg_box)} box with a ${P(MB.box_products_gm)} margin on products. <b>Online orders</b>: a ${F.tsh(IN.online.basket)} basket plus the delivery fee.</p><p>Base-case year 1 (planning estimate): walk-in <b>${F.auto(sp.walk)}</b>, boxes <b>${F.auto(sp.box)}</b>, online <b>${F.auto(sp.online)}</b>, total <b>${F.auto(b.y1rev)}</b>. As members build up, the box becomes the largest and most predictable line.</p>`,['s6-1','s6-2'],'Biashara inapataje pesa?',`<p>Njia tatu za mapato kutoka kwa wateja walewale. <b>Mauzo ya dukani</b>: takriban wageni ${IN.store.visitors_day_m12} kwa siku kufikia mwezi 12, nusu wakinunua, kikapu cha ${F.tsh(IN.store.basket)}. <b>Afya Box</b>: wastani wa ${F.tsh(MB.avg_box)}. <b>Oda za mtandaoni</b>: kikapu cha ${F.tsh(IN.online.basket)} pamoja na ada ya usafirishaji.</p><p>Mwaka 1 (makadirio): dukani <b>${F.auto(sp.walk)}</b>, box <b>${F.auto(sp.box)}</b>, mtandaoni <b>${F.auto(sp.online)}</b>, jumla <b>${F.auto(b.y1rev)}</b>.</p>`],
 ['money','When does the first store break even?',`<p>In the base case the store turns profitable month by month from <b>month ${b.be||'—'}</b>: that is the first month when gross profit covers all running costs of about <b>${F.m(opex)} a month</b> (rent ${F.m(IN.opex_month.rent)}, team ${F.m(IN.opex_month.staff)}, marketing ${F.m(IN.opex_month.marketing)}, utilities and internet, systems, check station, insurance and licences, packaging).</p><p>Best case: <b>${bs.be?'month '+bs.be:'after year 1'}</b>. Downside: <b>${dn.be?'month '+dn.be:'not inside year 1'}</b>. The downside is shown deliberately; the tranches and the working-capital reserve are sized for it. All planning estimates.</p>`,['s6-1','s5-4'],'Duka la kwanza linafikia faida lini?',`<p>Katika hali ya kawaida duka linaanza kupata faida kila mwezi kuanzia <b>mwezi ${b.be||'—'}</b>: mwezi wa kwanza faida ghafi inapolipa gharama zote za uendeshaji za takriban <b>${F.m(opex)} kwa mwezi</b>.</p><p>Hali bora: <b>${bs.be?'mwezi '+bs.be:'baada ya mwaka 1'}</b>. Hali mbaya: <b>${dn.be?'mwezi '+dn.be:'si ndani ya mwaka 1'}</b>. Hali mbaya inaonyeshwa kwa makusudi; awamu na akiba ya mtaji wa kazi zimepangwa kwa ajili yake.</p>`],
 ['money','What is one member worth?',`<p>A planning estimate, computed from the model inputs: each average box earns about <b>${F.tsh(GPM)} of gross profit a month</b> (${P(MB.box_products_gm)} on the products; the box and delivery inside the price are charged at cost and earn nothing). With ${F.pct(MB.monthly_churn)} of members leaving each month, the average member stays about <b>${Math.round(LIFE)} months</b>, so one member is worth roughly <b>${F.tsh(Math.round(LTV/1000)*1000)}</b> of gross profit over their membership, before the extra walk-in purchases members also make.</p><p>Membership is therefore the main source of predictable profit; walk-in sales fund the store while members build up.</p>`,['s3-4','s6-2'],'Mwanachama mmoja ana thamani gani?',`<p>Makadirio kutoka modeli: kila box ya wastani inaleta takriban <b>${F.tsh(GPM)} ya faida ghafi kwa mwezi</b> (${P(MB.box_products_gm)} kwenye bidhaa; box na usafirishaji vinatozwa kwa gharama halisi bila faida). Kwa ${F.pct(MB.monthly_churn)} ya wanachama kuondoka kila mwezi, mwanachama wa wastani anakaa takriban <b>miezi ${Math.round(LIFE)}</b>, hivyo ana thamani ya takriban <b>${F.tsh(Math.round(LTV/1000)*1000)}</b> ya faida ghafi katika uanachama wake.</p>`],
 ['money','What does “customer-funded” mean?',`<p>Every running cost is recovered inside a price the customer chooses to pay. Packing and delivery sit inside the box price; the online delivery fee covers the rider; the free check is paid for by the margin on the purchases it starts; nothing depends on discounts or subsidies to buy growth.</p><p>For an investor it means growth is driven by customers choosing to pay, not by burning capital on promotions. Section 6.2 lists every cost line and the price element that recovers it.</p>`,['s6-2','s6-1'],'“Inafadhiliwa na mteja” inamaanisha nini?',`<p>Kila gharama ya uendeshaji inarudishwa ndani ya bei ambayo mteja anachagua kulipa. Ufungaji na usafirishaji vimo ndani ya bei ya box; ada ya usafirishaji mtandaoni inalipa msafirishaji; kipimo cha bure kinalipwa na faida ya manunuzi kinayoyaanzisha; hakuna kinachotegemea punguzo au ruzuku.</p>`],
 ['money','How big can it get?',`<p>The plan opens stores one gated step at a time: <b>${IN.growth.stores_by_year.slice(0,5).join(', ')}</b> stores in the first five years and <b>${b.y12.stores} by year 12</b>, from Dar es Salaam to Arusha, Dodoma, Mwanza and Zanzibar, then Nairobi and Kampala pilots. Revenue passes <b>TSh 1 billion in year ${b.firstB?b.firstB.year:'—'}</b>${b.firstTenB?` and TSh 10 billion in year ${b.firstTenB.year}`:''}, reaching <b>${F.auto(b.y12.revenue)}</b> in year 12 (base case, planning estimate).</p><p>A new store opens only when the last one meets its numbers. Section 5.4 shows the gates and all three scenarios.</p>`,['s5-4','s6-1'],'Inaweza kukua kiasi gani?',`<p>Mpango unafungua maduka hatua kwa hatua: maduka <b>${IN.growth.stores_by_year.slice(0,5).join(', ')}</b> katika miaka mitano ya kwanza na <b>${b.y12.stores} kufikia mwaka 12</b>. Mapato yanavuka <b>TSh bilioni 1 mwaka ${b.firstB?b.firstB.year:'—'}</b>, na kufikia <b>${F.auto(b.y12.revenue)}</b> mwaka 12 (makadirio). Duka jipya linafunguliwa tu pale la mwisho linapofikia malengo.</p>`],
 ['own','How much are you raising, and what is it for?',`<p>${ISL()?`<b>Start small, ${F.m(SEED.amount)}</b>: a ${IN.store.area_m2} m² store on a good secondary street, ${STAFFN} staff on one long shift, partner riders paid per delivery and a manual check corner.`:`<b>Flagship, ${F.m(SEED.amount)}</b>: ${IN.store.area_m2} m² on a prime street front, ${STAFFN} staff on two shifts, the Afya Check kiosk and two electric riders.`}</p><p>The budget is ${esc(SEED.status.charAt(0).toLowerCase()+SEED.status.slice(1))}. It buys things you can visit: ${SEED.use.map(u=>`<b>${F.m(u[1])}</b> ${esc(u[0].toLowerCase())}`).join('; ')}.</p><p>One open question is shown openly: research, transport and setup costs before launch are about <b>${F.m(SEED.phase0_gap.research_setup_costs)}</b> against a Phase 0 budget of ${F.tsh(SEED.phase0_gap.phase0_budget)}. Either the round grows or the founders pre-fund it; it is settled before any money is taken.</p>`,['s6-3','s7-1'],'Mnatafuta kiasi gani, na ni kwa ajili ya nini?',`<p>${ISL()?`<b>Kuanza kidogo, ${F.m(SEED.amount)}</b>: duka la m² ${IN.store.area_m2} kwenye barabara nzuri ya pili, wafanyakazi ${STAFFN} kwa zamu moja ndefu, wasafirishaji washirika wanaolipwa kwa kila safari na kona ya vipimo vya mkono.`:`<b>Duka kuu, ${F.m(SEED.amount)}</b>: m² ${IN.store.area_m2} mbele ya barabara kuu, wafanyakazi ${STAFFN} kwa zamu mbili, kiosk cha Afya Check na pikipiki mbili za umeme.`}</p><p>Bajeti inanunua vitu unavyoweza kuvitembelea: ukarabati wa duka, bidhaa za kuanzia, teknolojia na kiosk cha Afya Check, pikipiki mbili za umeme, uzinduzi na akiba ya mtaji wa kazi.</p><p>Swali moja liko wazi: gharama za utafiti na maandalizi kabla ya uzinduzi ni takriban <b>${F.m(SEED.phase0_gap.research_setup_costs)}</b> dhidi ya bajeti ya ${F.tsh(SEED.phase0_gap.phase0_budget)}.</p>`],
 ['own','How is my money protected?',`<p>It is released in <b>three tranches</b>, each only when the milestone before it is met: ${SEED.milestones.map((m,i)=>`<b>${F.m(SEED.amount*SEED.tranches[i])}</b> ${esc(m.replace(/^Tranche (\d) \((\d+%)\):\s*/,'(tranche $1, $2): '))}`).join('; ')}.</p><p>On top of that: monthly management accounts and a board (section 7.2), the 21:00 daily report, a working-capital reserve in the use of funds, and store openings gated on the previous store’s numbers.</p>`,['s6-3','s7-2'],'Pesa yangu inalindwaje?',`<p>Inatolewa kwa <b>awamu tatu</b>, kila moja pale tu hatua iliyotangulia inapofikiwa: awamu ya 1 wakati wa kusaini (pango, kampuni na leseni), awamu ya 2 ukarabati ukikamilika na leseni za TMDA na biashara zikiwa mkononi, awamu ya 3 duka likiwa wazi miezi 3, likiwa na wanachama 100 wa Afya Box na hasara ya mwezi chini ya TSh milioni 16.</p><p>Pia: hesabu za kila mwezi na bodi, ripoti ya kila siku ya saa 21:00, na akiba ya mtaji wa kazi.</p>`],
 ['own','What would I own?',`<p>An <b>illustrative</b> split, for discussion and subject to legal review: ${F.m(SEED.amount)} for <b>${P(OWN.seed_investor_share)}</b> implies a post-money value of about <b>${F.m(POSTMONEY)}</b>. After the round the founders hold about ${P(OWN.founders_after_seed)}, with an option pool of ${P(OWN.option_pool)} for key staff.</p><p>Whatever happens in later rounds, the founders keep <b>${P(OWN.founders_floor)} of the company for life</b>, protected in the company documents; that keeps the builders committed for the long road. Section 6.4 has the cap table and a sale calculator.</p>`,['s6-4','s6-3'],'Ningemiliki nini?',`<p>Mgawanyo wa <b>mfano</b>, kwa majadiliano na unahitaji ukaguzi wa kisheria: ${F.m(SEED.amount)} kwa <b>${P(OWN.seed_investor_share)}</b> inamaanisha thamani ya baada ya uwekezaji ya takriban <b>${F.m(POSTMONEY)}</b>. Waanzilishi wanabaki na takriban ${P(OWN.founders_after_seed)}, na ${P(OWN.option_pool)} kwa wafanyakazi muhimu.</p><p>Waanzilishi wanabaki na <b>${P(OWN.founders_floor)} ya kampuni maisha yote</b>, yakilindwa kisheria.</p>`],
 ['own','How could investors eventually get a return?',`<p>Section 6.4 sets out the possible routes, none of which is promised: dividends once the stores are profitable, selling shares to new investors in later funding rounds as the chain grows, or a sale of the company to a larger regional group. The sale calculator there shows what a stake could be worth at different values, all as illustrations.</p><p>What we commit to is the discipline that makes any of these possible: one model, honest reporting, gated growth.</p>`,['s6-4','s7-2'],'Wawekezaji wangepataje faida hatimaye?',`<p>Sehemu ya 6.4 inaeleza njia zinazowezekana, bila ahadi yoyote: gawio pale maduka yanapopata faida, kuuza hisa kwa wawekezaji wapya katika awamu zijazo, au kuuzwa kwa kampuni kwa kundi kubwa la kikanda.</p>`],
 ['biz','Who runs it, and what do the founders keep?',`<p>The founders are <b>Fahmy Abbas Cothema</b> and <b>Cecilia</b>. They keep <b>${P(OWN.founders_floor)} of the company for life</b>, protected legally (legal review needed); the split between them is still open and does not affect investors.</p><p>The store itself is run by a store lead, preferably a physiotherapy graduate, with health advisers, a picker and riders. The one system and the 21:00 report let the founders manage from anywhere, and the board structure is set out in section 7.2.</p>`,['s7-2','s6-4'],'Nani anaiendesha, na waanzilishi wanabaki na nini?',`<p>Waanzilishi ni <b>Fahmy Abbas Cothema</b> na <b>Cecilia</b>. Wanabaki na <b>${P(OWN.founders_floor)} ya kampuni maisha yote</b>, yakilindwa kisheria (ukaguzi wa kisheria unahitajika).</p><p>Duka linaendeshwa na kiongozi wa duka, ikiwezekana mhitimu wa fiziotherapia, pamoja na washauri wa afya, mfungashaji na wasafirishaji.</p>`],
 ['risk','What is the biggest risk?',`<p>That families join the Afya Box more slowly than planned. Our answer has four parts: walk-in sales and one-off kits earn without membership; the downside case (demand ×${IN.scenarios.down.demand}) is shown openly; <b>tranche 3 waits for 100 members and a monthly loss below TSh 16M</b>, so capital follows proof; and every visit offers to save the basket as a monthly reminder, the cheapest way to turn a shopper into a member.</p>`,['s7-3','s3-4'],'Hatari kubwa zaidi ni ipi?',`<p>Kwamba familia zitajiunga na Afya Box polepole kuliko ilivyopangwa. Jibu letu: mauzo ya dukani na vifurushi vya mara moja vinaleta mapato bila uanachama; hali mbaya inaonyeshwa wazi; <b>awamu ya 3 inasubiri wanachama 100 na hasara ya mwezi chini ya TSh milioni 16</b>; na kila ziara inatoa nafasi ya kuhifadhi kikapu kama ukumbusho wa kila mwezi.</p>`],
 ['risk','Are these numbers real?',`<p>They are <b>planning estimates</b>, and labelled so everywhere. All come from one master model (${esc(IN.meta.version)}) with three scenarios, so the same number appears on every page. Rent, salaries, prices, duties and fees are being checked against Tanzanian quotations, and market facts are cited with their year. Where data is old, we say so: the national blood-pressure survey is from 2012.</p>`,['s6-1','s7-5'],'Je, namba hizi ni halisi?',`<p>Ni <b>makadirio ya mipango</b>, na yameandikwa hivyo kila mahali. Yote yanatoka modeli kuu moja (${esc(IN.meta.version)}) yenye hali tatu. Pango, mishahara, bei, ushuru na ada vinakaguliwa dhidi ya bei halisi za Tanzania, na takwimu za soko zina vyanzo na mwaka wake.</p>`],
 ['risk','What about licences and regulation?',`<p>Before opening: company registration with BRELA, tax registration and electronic receipts with TRA, TMDA registration for products that require it, Pharmacy Council requirements where they apply to the range, and local business licences. <b>Tranche 2 is released only when the TMDA and business licences are in hand</b>. The 15-step setup checklist is in section 7.1; quality, recalls and complaints in 4.5. Legal review is part of the plan.</p>`,['s7-1','s4-5'],'Vipi kuhusu leseni na sheria?',`<p>Kabla ya kufungua: usajili wa kampuni BRELA, usajili wa kodi na risiti za kielektroniki TRA, usajili wa TMDA kwa bidhaa zinazohitaji, masharti ya Baraza la Famasia pale yanapohusika, na leseni za biashara. <b>Awamu ya 2 inatolewa tu leseni za TMDA na biashara zikiwa mkononi</b>.</p>`],
 ['risk','What if a bigger player copies the idea?',`<p>Each part alone can be copied: a nicer shelf, a delivery bike, a box. The <b>combination</b> is harder: health advice and fast shopping in one visit, membership as the core, one price in every channel, and the member data and monthly habits that build up over time. A free check brings people in, a good visit makes them buy, the box keeps them, and happy families refer others, including relatives abroad. Section 5.3 maps competitor types and why customers switch.</p>`,['s5-3','s2-1'],'Itakuwaje mshindani mkubwa akiiga wazo hili?',`<p>Kila sehemu peke yake inaweza kuigwa. <b>Mchanganyiko</b> ni mgumu zaidi: ushauri wa afya na ununuzi wa haraka katika ziara moja, uanachama kama kiini, bei moja kila mahali, na takwimu za wanachama na mazoea ya kila mwezi yanayojengeka kwa muda.</p>`],
 ['risk','What happens if mobile money, power or the internet goes down?',`<p>Payments are <b>mobile money first, but not only</b>: card and cash are always accepted, and we do not depend on a single operator. The till keeps selling offline and syncs when the connection returns. Box packing works from locked lists prepared in advance, so a short outage delays nothing. These rules are part of the one-system design in section 4.1.</p>`,['s4-1','s7-3'],'Itakuwaje pesa ya simu, umeme au mtandao ukikatika?',`<p>Malipo ni <b>pesa ya simu kwanza, lakini si pekee</b>: kadi na pesa taslimu zinapokelewa daima, na hatutegemei mtoa huduma mmoja. Mashine ya mauzo inaendelea kufanya kazi bila mtandao na kusawazisha mtandao ukirudi.</p>`]]})());
function faqHTML(){return `<div class="p0v-faq"><aside class="p0v-fside"><div class="ph">${p0kimg('advice','Concept image: an Afya health adviser showing two blood-pressure monitor boxes to a pregnant woman','50% 35%')}${p0kcap}</div><div class="tx"><span class="p0k-k">${L('The adviser’s rule','Kanuni ya mshauri')}</span><h4>${L('Explain, never push. The same goes for investors.','Eleza, usilazimishe. Vivyo hivyo kwa wawekezaji.')}</h4><p>${L('These are the questions investors ask most, answered in full with numbers from the master model and links to the section that proves each answer. A question that is not here goes into the investor Q&amp;A in section 7.5.','Haya ni maswali ambayo wawekezaji huuliza zaidi, yakijibiwa kikamilifu kwa namba kutoka modeli kuu na viungo vya sehemu inayothibitisha kila jibu. Swali lisilokuwepo linaingia kwenye Maswali na Majibu ya sehemu 7.5.')}</p></div></aside>
 <div><div class="p0v-fhead"><div class="p0v-fcats" role="group" aria-label="Question category">${FCAT.map((x,i)=>`<button type="button" data-c="${x[0]}" aria-pressed="${i===0}">${L(x[1],x[2])}</button>`).join('')}</div>
  <div class="p0v-fsrch">${I.search}<input id="p0fq" type="search" autocomplete="off" placeholder="${PH.f[LANG==='sw'?1:0]}" aria-label="Filter the questions"></div><button type="button" class="p0-ib" id="p0fall">${L('Expand all','Fungua yote')}</button></div>
 <div class="p0v-flist" id="p0flist">${FAQf().map((f,i)=>`<article class="p0v-fi" id="p0f${i}" data-c="${f[0]}"><button type="button" class="q" aria-expanded="false" aria-controls="p0fa${i}"><span class="n">${pad(i+1)}</span><span>${L(f[1],f[4])}</span><i></i></button><div class="a" id="p0fa${i}" hidden>${L(f[2],f[5])}<div class="lk">${f[3].map(id=>{const t=ALL.find(x=>x.id===id);return t?`<a href="#${id}">${t.no} ${esc(t.title)} ${AR}</a>`:''}).join('')}</div></div></article>`).join('')}</div>
 <p class="p0v-fcount" id="p0fcount"></p></div></div>`}
function openFaq(j){const el=document.getElementById('p0f'+j);if(!el)return;document.querySelectorAll('#p0flist .p0v-fi').forEach(x=>x.hidden=false);togFaq(el,true);el.scrollIntoView({behavior:'smooth',block:'center'})}
function togFaq(el,on){const b=el.querySelector('.q'),a=el.querySelector('.a');on=on===undefined?a.hidden:on;a.hidden=!on;el.classList.toggle('open',on);b.setAttribute('aria-expanded',on)}

/* ---------- one-page investor summary (screen + print) ---------- */
function sumHTML(){const b=D('base'),bs=D('best'),dn=D('down'),uMax=Math.max(...SEED.use.map(u=>u[1])),TC=['#17a06b','#0f7a52','#0b5a3d'];
 return `<div class="p0v-sum" id="p0sum">
 <div class="hd"><div class="logo"><i></i><div><b>Afya Basics</b><span>Simple Solution Ltd · Dar es Salaam</span></div></div><div class="meta">${L('Investor summary','Muhtasari kwa mwekezaji')} · ${L('one page','ukurasa mmoja')}<br>${L('Master model','Modeli kuu')} ${esc(IN.meta.version)} · ${L('planning estimates','makadirio ya mipango')}<br>${L('Seed round','Awamu ya mbegu')} · ${esc(SEED.status)}</div></div>
 <h3>${L('Health essentials, <em>without the hunt.</em>','Bidhaa za afya, <em>bila kuhangaika.</em>')}</h3>
 <p class="lead">${L('Everything a Tanzanian family needs to stay healthy at home, curated, honestly priced, bought in minutes and delivered before it runs out. <b>Afya yako, nyumbani kwako.</b>','Kila kitu familia ya Kitanzania inachohitaji kubaki na afya nyumbani, kimechaguliwa vizuri, kwa bei ya haki, kinanunuliwa kwa dakika na kuletwa kabla hakijaisha. <b>Afya yako, nyumbani kwako.</b>')}</p>
 <div class="kp">${[[F.auto(b.y1rev),L('Year-1 revenue','Mapato mwaka 1')],[b.be?L('Month '+b.be,'Mwezi '+b.be):'—',L('Break-even, month by month','Kufikia faida kila mwezi')],[num(b.mem12),L('Afya Box members, month 12','Wanachama wa Afya Box, mwezi 12')],[F.auto(b.y12.revenue),L(`Year 12 · ${b.y12.stores} stores`,`Mwaka 12 · maduka ${b.y12.stores}`)],[F.m(SEED.amount),(ISL()?L('Seed ask · start small','Mtaji unaoombwa · kuanza kidogo'):L('Seed ask · flagship','Mtaji unaoombwa · duka kuu'))]].map(k=>`<div><b>${k[0]}</b><span>${k[1]}</span></div>`).join('')}</div>
 <div class="g2">
  <div><h4>${L('The problem','Tatizo')}</h4><p>${L(`Care has moved home, but shopping for it is scattered, slow, untrusted and unplanned. <b>23.1%</b> of Tanzanian adults aged 18–69 have raised blood pressure ${c(5)}, and in the last survey that measured it only <b>17.6%</b> of them knew it ${c(1)}; <b>1 in 10</b> medical products in developing countries is substandard or falsified ${c(2)}; the diaspora sent home <b>TSh 3.3T</b> in 2024/25 ${c(4)}.`,`Huduma imehamia nyumbani, lakini ununuzi wake umetawanyika, ni wa polepole, hauaminiki na haupangwi. <b>23.1%</b> ya watu wazima wana shinikizo la damu ${c(5)}, na ni <b>17.6%</b> tu waliojua ${c(1)}; <b>1 kati ya 10</b> ya bidhaa za tiba ni duni au bandia ${c(2)}; diaspora walituma <b>TSh trilioni 3.3</b> mwaka 2024/25 ${c(4)}.`)}</p></div>
  <div><h4>${L('Our answer','Jibu letu')}</h4><ul><li>${L(`<b>The store:</b> a secure street-front flagship, six Care Zones, ~${IN.product_families} product families, a free ${IN.check.free_readings.length}-measurement Afya Check, find and pay in under 3 minutes.`,`<b>Duka:</b> duka salama la mbele ya barabara, Kanda sita za Huduma, familia ~${IN.product_families} za bidhaa, Afya Check ya bure ya vipimo ${IN.check.free_readings.length}.`)}</li><li>${L(`<b>The Afya Box:</b> monthly membership (average ${F.tsh(MB.avg_box)}), automatic renewal, brand changes allowed, delivery charged at cost inside the price.`,`<b>Afya Box:</b> uanachama wa kila mwezi (wastani ${F.tsh(MB.avg_box)}), hujirudia yenyewe, chapa zinaweza kubadilishwa, usafirishaji kwa gharama halisi ndani ya bei.`)}</li><li>${L('<b>App and WhatsApp:</b> reorder in 30 seconds, same-day delivery in Dar es Salaam, diaspora payment in 2 minutes.','<b>Programu na WhatsApp:</b> agiza tena kwa sekunde 30, usafirishaji siku hiyohiyo Dar es Salaam, malipo ya diaspora kwa dakika 2.')}</li></ul></div>
  <div><h4>${L('The numbers in three cases','Namba katika hali tatu')}</h4><table><thead><tr><th></th><th>${L('Base','Kawaida')}</th><th>${L('Best','Bora')}</th><th>${L('Downside','Mbaya')}</th></tr></thead><tbody>${[[L('Year-1 revenue','Mapato mwaka 1'),x=>F.auto(x.y1rev)],[L('Break-even month','Mwezi wa faida'),x=>x.be||'—'],[L('Members, month 12','Wanachama, mwezi 12'),x=>num(x.mem12)],[L('Year-12 revenue','Mapato mwaka 12'),x=>F.auto(x.y12.revenue)]].map(r=>`<tr><td>${r[0]}</td>${[b,bs,dn].map(x=>`<td>${r[1](x)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
  <div><h4>${L('The ask','Ombi')} · ${F.m(SEED.amount)}</h4><div class="tr">${SEED.tranches.map((t,i)=>`<div style="flex:${t};background:${TC[i]}">T${i+1} · ${t*100}% · ${F.m(SEED.amount*t).replace('TSh ','')}</div>`).join('')}</div><div class="uf">${SEED.use.map(u=>`<span>${esc(u[0])}</span><b>${F.m(u[1])}</b><i><em style="width:${(u[1]/uMax*100).toFixed(0)}%"></em></i>`).join('')}</div></div>
  <div><h4>${L('What the investor gets','Mwekezaji anapata nini')}</h4><p>${L(`Illustrative: ${P(OWN.seed_investor_share)} for ${F.m(SEED.amount)}, a post-money value of about ${F.m(POSTMONEY)}; tranches released at milestones (${SEED.tranches.map(t=>t*100).join(' · ')}); monthly reporting and a board. Founders keep at least <b>${P(OWN.founders_floor)} for life</b>. Legal review needed.`,`Mfano: ${P(OWN.seed_investor_share)} kwa ${F.m(SEED.amount)}, thamani ya baada ya uwekezaji takriban ${F.m(POSTMONEY)}; awamu kwa hatua (${SEED.tranches.map(t=>t*100).join(' · ')}); ripoti za kila mwezi na bodi. Waanzilishi wanabaki na angalau <b>${P(OWN.founders_floor)} maisha yote</b>.`)}</p></div>
  <div><h4>${L('Risks we show openly','Hatari tunazoonyesha wazi')}</h4><ul><li>${L('Membership may grow more slowly: walk-in sales continue regardless, and tranche 3 waits for 100 members.','Uanachama unaweza kukua polepole: mauzo ya dukani yanaendelea, na awamu ya 3 inasubiri wanachama 100.')}</li><li>${L('All figures are planning estimates, now being checked against Tanzanian quotations.','Namba zote ni makadirio ya mipango, zinazokaguliwa sasa dhidi ya bei halisi za Tanzania.')}</li><li>${L(`Phase 0 costs (≈${F.m(SEED.phase0_gap.research_setup_costs)}) may change the final amount.`,`Gharama za awamu 0 (≈${F.m(SEED.phase0_gap.research_setup_costs)}) zinaweza kubadilisha kiasi.`)}</li></ul></div>
 </div>
 <div class="ft"><span>${L('Concept-stage business · all business figures are planning estimates from the master model · facts cited [1]–[4]','Biashara katika hatua ya dhana · namba zote ni makadirio ya mipango · vyanzo [1]–[4]')}</span><span>${L('Next step: the data room and the model, section 7.5','Hatua inayofuata: chumba cha takwimu, sehemu 7.5')}</span></div>
</div>`}

/* ---------- moments: real photos with concrete stories ---------- */
function momentsHTML(){return `
 ${p0kband('advice','Concept image: an Afya health adviser showing two blood-pressure monitor boxes to a pregnant woman at the counter',L('09:40 · Heart &amp; Diabetes zone','Saa 3:40 asubuhi · Kanda ya Moyo na Kisukari'),L('Two monitors, <em>one honest answer.</em>','Vipimo viwili, <em>jibu moja la kweli.</em>'),L(`An expectant mother was told by her clinic to check her blood pressure at home. The adviser places two registered upper-arm monitors side by side, explains which cuff fits her arm and which one stores readings for the clinic, and says the price out loud: the same printed price as in the app. If she chooses neither, that is fine; the free Afya Check by the door is hers every visit.`,`Mama mjamzito ameambiwa na kliniki apime shinikizo la damu nyumbani. Mshauri anaweka vipimo viwili vilivyosajiliwa pembeni kwa pembeni, anaeleza kipi kinamfaa mkono wake na kipi kinahifadhi vipimo kwa ajili ya kliniki, na anataja bei wazi: bei ileile iliyochapishwa kwenye programu. Asipochagua chochote, ni sawa; Afya Check ya bure ni yake kila ziara.`),{pos:'50% 35%',stats:[['4–5',L('registered brands per item, side by side','chapa zilizosajiliwa kwa kila bidhaa')],['1',L('printed price in store, app and WhatsApp','bei moja dukani, programu na WhatsApp')],[L('Free','Bure'),L('Afya Check on every visit, no purchase required','Afya Check kila ziara, bila sharti la kununua')]]})}
 <div class="p0v-duo">
  <figure class="p0v-mo"><div class="ph">${p0kimg('scan','Concept image: a man scanning a product barcode with his phone at a lit shelf','50% 40%')}${p0kcap}<span class="tm">${L('Scan &amp; go · 0:00–0:20','Scan na uende · 0:00–0:20')}</span></div><div class="tx"><h4>${L('He scans at the shelf instead of queueing.','Anaskani rafuni badala ya kupanga foleni.')}</h4><p>${L('A father picks up glucose strips that match the meter saved in his account. He scans the barcode with the Afya app; the price, the “best for” line and the expiry date appear on his screen. He does not need to queue at the counter.','Baba anachukua vipande vya kupima sukari vinavyolingana na kipimo kilichohifadhiwa kwenye akaunti yake. Ana-scan barcode kwa programu ya Afya; bei, maelezo ya “inafaa kwa” na tarehe ya kuisha vinaonekana kwenye simu. Hahitaji kupanga foleni kaunta.')}</p><div class="sp"><span><b>&lt;1 min</b>${L('to find it','kuipata')}</span><span><b>${IN.brands_per_item}</b>${L('brands, one price','chapa, bei moja')}</span></div></div></figure>
  <figure class="p0v-mo"><div class="ph">${p0kimg('real-phone-pay','Concept image: a man paying by phone at a shop','50% 40%')}${p0kcf('real-')}<span class="tm">${L('Pay · under 30 seconds','Lipa · chini ya sekunde 30')}</span></div><div class="tx"><h4>${L('She approves payment on her phone at the counter.','Anathibitisha malipo kwenye simu yake kaunta.')}</h4><p>${L('At the counter the adviser’s handheld sends a mobile-money push. She enters her PIN, the TRA receipt arrives by SMS, and the adviser offers one more thing: save this basket as a monthly reminder or an Afya Box, so next month needs no trip at all.','Kwenye kaunta, kifaa cha mshauri kinatuma ombi la malipo ya pesa ya simu. Anaweka PIN, risiti ya TRA inakuja kwa SMS, na mshauri anatoa pendekezo moja: hifadhi kikapu hiki kama ukumbusho wa kila mwezi au Afya Box, ili mwezi ujao usihitaji safari kabisa.')}</p><div class="sp"><span><b>&lt;30 s</b>${L('to pay','kulipa')}</span><span><b>SMS</b>${L('TRA receipt','risiti ya TRA')}</span></div></div></figure>
 </div>
 ${p0ksplit('dad','Concept image: a father checking his blood sugar at home with his daughter, a closed green Afya Box on the table',`<span class="p0k-k">${L('Home · the 1st of the month','Nyumbani · tarehe 1 ya mwezi')}</span><h3>${L('The strips arrived <em>before they ran out.</em>','Vipande vimefika <em>kabla havijaisha.</em>')}</h3><p>${L('A father living with diabetes checks his sugar before breakfast, his daughter reading the number aloud. The closed green Afya Box on the table came yesterday: strips that fit his meter, lancets and pen needles, packed from the choices locked 12 days before month end. Nobody had to remember to order.','Baba mwenye kisukari anapima sukari kabla ya kifungua kinywa, binti yake akisoma namba kwa sauti. Box ya kijani ya Afya iliyofungwa mezani ilifika jana: vipande vinavyolingana na kipimo chake, sindano ndogo na za kalamu, vilivyopakiwa kutoka chaguo zilizofungwa siku 12 kabla ya mwisho wa mwezi. Hakuna aliyehitaji kukumbuka kuagiza.')}</p><ul><li>${L('<b>Zero clicks</b> each month: the box renews on his date and payment plan.','<b>Bila kubofya</b> kila mwezi: box inajirudia kwa tarehe na mpango wake.')}</li><li>${L('<b>Afya Choice:</b> he can swap to another registered brand at the same price until 12 days before month end.','<b>Afya Choice:</b> anaweza kubadilisha chapa nyingine iliyosajiliwa kwa bei ileile hadi siku 12 kabla ya mwisho wa mwezi.')}</li><li>${L(`<b>Afya Care card</b> (${F.tsh(IN.cards[2].fee_year)} a year): a monthly full check and his reading history.`,`<b>Kadi ya Afya Care</b> (${F.tsh(IN.cards[2].fee_year)} kwa mwaka): kipimo kamili kila mwezi na historia ya vipimo.`)}</li></ul><p class="note" style="margin-top:12px">${L('Illustrative household · box contents are examples, final contents set with the founders','Kaya ya mfano · vilivyomo ni mifano, vitaamuliwa na waanzilishi')}</p>`,{pos:'50% 40%'})}
 <div class="p0v-duo p0v-link" style="margin-top:22px">
  <figure class="p0v-mo"><div class="ph">${p0kimg('diaspora','Concept image: a young Tanzanian man abroad paying for a box on his phone','50% 35%')}${p0kcap}<span class="tm">${L('Abroad · 20:10 his time','Ughaibuni · saa 20:10 kwake')}</span></div><div class="tx"><h4>${L('A son abroad pays for his mother’s monthly box.','Mwana aliye nje analipia box ya mwezi ya mama yake.')}</h4><p>${L('He chooses the Senior box for his mother, pays by international card and types a message: “Mama, nakupenda.” Before, he sent money and hoped it became medicine. Now he knows exactly what will arrive and when.','Anachagua box ya Senior kwa mama yake, analipa kwa kadi ya kimataifa na kuandika ujumbe: “Mama, nakupenda.” Zamani alituma pesa na kutumaini zitakuwa dawa. Sasa anajua hasa kitakachofika na lini.')}</p><div class="sp"><span><b>&lt;2 min</b>${L('to send','kutuma')}</span><span><b>${F.tsh(MB.avg_box)}</b>${L('average box','wastani wa box')}</span></div></div></figure>
  <figure class="p0v-mo"><div class="ph">${p0kimg('real-elder-care','Concept image: a daughter caring for her elderly father at home','50% 40%')}${p0kcf('real-')}<span class="tm">${L('Dar es Salaam · next day','Dar es Salaam · siku inayofuata')}</span></div><div class="tx"><h4>${L('Bibi receives it at home; he receives the photo.','Bibi anaipokea nyumbani; yeye anapokea picha.')}</h4><p>${L('The rider hands the closed green box to her granddaughter at the door and confirms with a code. A photo reaches the son’s phone within minutes. Bibi did not travel, queue or ask anyone for money.','Msafirishaji anamkabidhi mjukuu box ya kijani iliyofungwa mlangoni na kuthibitisha kwa namba. Picha inafika kwenye simu ya mwana ndani ya dakika chache. Bibi hakusafiri, hakupanga foleni wala kuomba pesa.')}</p><div class="sp"><span><b>${L('Same day','Siku hiyo')}</b>${L('if ordered before 15:00','oda kabla ya 15:00')}</span><span><b>${L('Photo','Picha')}</b>${L('proof to the sender','uthibitisho kwa mtumaji')}</span></div></div></figure>
 </div>
 <div class="p0v-hops">${[['TSh 3.3T',L(`sent home by the diaspora in 2024/25 ${c(4)}`,`zilizotumwa nyumbani na diaspora 2024/25 ${c(4)}`)],['&lt;2 min',L('to choose, pay and add a message','kuchagua, kulipa na kuongeza ujumbe')],[L('Same day','Siku hiyo'),L('delivery in Dar, code proof at the door','usafirishaji Dar, namba ya uthibitisho')],[L('Photo','Picha'),L('confirmation back to the sender abroad','uthibitisho kwa mtumaji aliye nje')]].map(x=>`<div><b>${x[0]}</b><span>${x[1]}</span></div>`).join('')}</div>`}

/* ---------- Afya Huduma: the partner-care layer of every Afya Box (0.1 and 0.2) ---------- */
const HCSS=`
.ph-lead{max-width:78ch}
.ph-layers{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin:22px 0 26px}
.ph-ly{position:relative;padding:20px 18px 18px;border-radius:18px;border:1px solid var(--edge);background:linear-gradient(170deg,var(--panel2),rgba(2,6,8,.7));min-width:0}
.ph-ly::before{content:"";position:absolute;inset:0 0 auto;height:2px;border-radius:18px 18px 0 0;background:var(--lc)}
.ph-ly i{display:inline-grid;place-items:center;width:30px;height:30px;border-radius:50%;background:var(--lc);color:#04140f;font:700 .8rem var(--f-hud);font-style:normal}
.ph-ly b{display:block;margin-top:12px;font:700 1rem var(--f-display)}
.ph-ly small{display:block;margin-top:4px;font:500 .6rem var(--f-hud);letter-spacing:.16em;text-transform:uppercase;color:var(--lc)}
.ph-ly p{margin:8px 0 0;font-size:.86rem;line-height:1.5;color:var(--ink2)}
.ph-pick{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 6px}
.ph-pick button{padding:9px 14px;border-radius:999px;border:1px solid var(--edge);background:rgba(2,10,8,.55);color:var(--ink2);font:600 .82rem var(--f-body);cursor:pointer;transition:all .2s}
.ph-pick button:hover{border-color:var(--edge2);color:var(--ink)}
.ph-pick button.on{background:linear-gradient(135deg,var(--gold2),var(--gold));color:#1a1204;border-color:transparent}
.ph-groups{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:14px 18px;padding:18px;border-radius:18px;border:1px solid var(--edge);background:rgba(2,10,8,.45)}.ph-g{min-width:0}.ph-grp{font:500 .6rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin:0 0 8px}
.ph-box{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);gap:16px;margin-top:18px}
.ph-cards{display:grid;gap:10px}
.ph-c{display:grid;grid-template-columns:30px minmax(0,1fr);gap:14px;padding:16px 18px;border-radius:16px;border:1px solid var(--edge);background:var(--panel)}
.ph-c i{display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:var(--lc);color:#04140f;font:700 .78rem var(--f-hud);font-style:normal}
.ph-c small{display:block;font:500 .6rem var(--f-hud);letter-spacing:.16em;text-transform:uppercase;color:var(--lc)}
.ph-c b{display:block;margin-top:3px;font:700 .98rem var(--f-display)}
.ph-c p{margin:5px 0 0;font-size:.86rem;line-height:1.5;color:var(--ink2)}
.ph-c ul{margin:6px 0 0;padding:0;list-style:none;display:grid;gap:4px}
.ph-c li{display:flex;justify-content:space-between;gap:10px;font-size:.86rem;color:var(--ink2)}
.ph-c li span:last-child{font:500 .8rem var(--f-hud);color:var(--gold2);white-space:nowrap}
.ph-money{padding:22px;border-radius:20px;border:1px solid var(--edge2);background:linear-gradient(150deg,rgba(242,201,107,.10),rgba(2,6,8,.6))}
.ph-money h4{margin:0 0 4px;font:700 1rem var(--f-display)}
.ph-money .sub{margin:0 0 14px;font-size:.82rem;color:var(--ink3)}
.hm-row{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:4px 14px;padding:9px 0;border-bottom:1px solid rgba(95,191,143,.1);font-size:.9rem;color:var(--ink2)}
.hm-row b{font:500 .92rem var(--f-hud);color:var(--ink);text-align:right;white-space:nowrap}
.hm-row em{grid-column:1/-1;font-style:normal;font:500 .7rem var(--f-hud);letter-spacing:.04em;color:var(--ink3)}
.hm-row.tot b{color:var(--gold2);font-size:1.05rem}
.hm-row.keep b{color:var(--neon)}
.ph-flow{margin:26px 0 8px;padding:18px;border-radius:20px;border:1px solid var(--edge);background:rgba(2,10,8,.5)}
.ph-flow svg{display:block;width:100%;height:auto}
.ph-tot{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px;margin-top:14px}
.ph-tot div{padding:18px 16px;border-radius:16px;border:1px solid var(--edge);background:var(--panel);min-width:0}
.ph-tot b{display:block;font:500 clamp(1.1rem,1.8vw,1.5rem) var(--f-hud);color:var(--neon)}
.ph-tot span{display:block;margin-top:6px;font-size:.82rem;line-height:1.4;color:var(--ink2)}
.ph-tot div.g{border-color:var(--edge2)}.ph-tot div.g b{color:var(--gold2)}
.ph-why{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:18px}
.ph-why>div{padding:20px 22px;border-radius:18px;border:1px solid var(--edge);background:var(--panel)}
.ph-why h4{margin:0 0 10px;font:700 .98rem var(--f-display)}
.ph-why ul{margin:0;padding-left:18px;display:grid;gap:6px;color:var(--ink2);font-size:.88rem;line-height:1.5}
.ph-tbl{width:100%;border-collapse:collapse;margin-top:14px;font-size:.84rem}
.ph-tbl th{font:500 .6rem var(--f-hud);letter-spacing:.14em;text-transform:uppercase;color:var(--ink3);text-align:left;padding:8px 10px;border-bottom:1px solid var(--edge)}
.ph-tbl td{padding:9px 10px;border-bottom:1px solid rgba(95,191,143,.08);color:var(--ink2)}
.ph-tbl td.n{font-family:var(--f-hud);text-align:right;color:var(--ink);white-space:nowrap}
.ph-tbl th.n{text-align:right}
.ph-tbl tr.on td{background:rgba(242,201,107,.08)}
.ph-tblw{overflow-x:auto;border-radius:14px}
.ph-more{margin-top:12px}
.ph-more summary{cursor:pointer;font:600 .9rem var(--f-body);color:var(--gold2)}
@media (max-width:1150px){.ph-layers{grid-template-columns:repeat(2,minmax(0,1fr))}.ph-box{grid-template-columns:1fr}.ph-tot{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:820px){.ph-layers,.ph-why,.ph-tot{grid-template-columns:1fr}}
`;
const HGRP=[['mb','Mother & baby','Mama na mtoto',['preg','mama']],['kids','Children & teens','Watoto na vijana',['shule','binti','kijana']],['adult','Women & men','Wanawake na wanaume',['glow','siku','man']],['cond','Living with a condition','Kuishi na ugonjwa',['sugar','presha','kidney']],['care','Older adults & recovery','Wazee na kupona',['senior','rec']],['home','Home & first aid','Nyumbani na huduma ya kwanza',['home','aid']],['biz','Businesses · Afya Kazini','Biashara · Afya Kazini',['office','hotel']]];
const HLC=['#5fbf8f','#f2c96b','#d9b56e','#c9b8ff'];
const tz=n=>F.tsh(n);
function hudumaBoxHTML(r){const S=IN.services;
 return `<div class="ph-cards">
  <div class="ph-c" style="--lc:${HLC[0]}"><i>1</i><div><small>${L('In store · free, by Afya staff','Dukani · bure, na wafanyakazi wa Afya')}</small><b>${esc(r.instore)}</b><p>${L('Done at the Afya Check by the door. The cost is our staff time, already inside the store’s running costs.','Hufanyika kwenye Afya Check mlangoni. Gharama ni muda wa wafanyakazi, tayari ndani ya gharama za duka.')}</p></div></div>
  <div class="ph-c" style="--lc:${HLC[1]}"><i>2</i><div><small>${L('Partner care pack · included, priced into the box','Kifurushi cha huduma ya mshirika · kimejumuishwa kwenye bei')}</small><b>${esc(r.service)} · ${r.visits===12?L('every month','kila mwezi'):r.visits===24?L('twice a month','mara mbili kwa mwezi'):`${r.visits} ${L('times a year','mara kwa mwaka')}`}</b><p>${L(`Delivered by a ${esc(r.partner.toLowerCase())}. Walk-in price ${tz(r.walk)}; members get it for ${tz(r.rate)} (70%), prepaid by Afya.`,`Hutolewa na mshirika (${esc(r.partner)}). Bei ya kawaida ${tz(r.walk)}; wanachama hupata kwa ${tz(r.rate)} (70%), Afya hulipia mapema.`)}</p></div></div>
  <div class="ph-c" style="--lc:${HLC[2]}"><i>3</i><div><small>${L('Digital care · free','Huduma ya kidijitali · bure')}</small><b>${esc(r.digital)}</b><p>${L('Runs on the one Afya system: WhatsApp, SMS and the app.','Inaendeshwa na mfumo mmoja wa Afya: WhatsApp, SMS na programu.')}</p></div></div>
  <div class="ph-c" style="--lc:${HLC[3]}"><i>4</i><div><small>${L('Partner add-ons · member pays the partner, partner pays Afya 10%','Huduma za ziada · mwanachama hulipa mshirika, mshirika hulipa Afya 10%')}</small><b>${L('Booked in the app at member prices','Huagizwa kwenye programu kwa bei ya wanachama')}</b>
   <ul>${r.adds.map(a=>`<li><span>${esc(a[0])}</span><span>${tz(a[2])} <s style="color:var(--ink3)">${tz(a[1])}</s></span></li>`).join('')}</ul></div></div>
 </div>
 <div class="ph-money"><h4>${L(`${esc(r.box)} · the money, per member per month`,`${esc(r.box)} · fedha, kwa mwanachama kwa mwezi`)}</h4><p class="sub">${L('Planning estimates · 1-month plan, default options · every line shows its working','Makadirio · mpango wa mwezi 1 · kila mstari unaonyesha hesabu yake')}</p>
  <div class="hm-row"><span>${L('Box of products (section 3.5 price)','Box ya bidhaa (bei ya sehemu 3.5)')}</span><b>${tz(r.box_price)}</b></div>
  <div class="hm-row"><span>${L('Partner care-pack fee','Ada ya kifurushi cha huduma')}</span><b>+ ${tz(r.fee)}</b><em>${tz(r.rate)} × ${r.visits} ÷ 12 = ${tz(Math.round(r.cost))} × 1.25 = ${tz(Math.round(r.cost*1.25))} → ${L('rounded up to','imezungushwa juu hadi')} ${tz(r.fee)}</em></div>
  <div class="hm-row tot"><span>${L('Member pays each month','Mwanachama hulipa kila mwezi')}</span><b>${tz(r.with_pack)}</b></div>
  <div class="hm-row"><span>${L('Afya pays the partner','Afya humlipa mshirika')}</span><b>− ${tz(Math.round(r.cost))}</b><em>${tz(r.rate)} × ${r.visits} ${L('visits','ziara')} ÷ 12 ${L('months','miezi')}</em></div>
  <div class="hm-row keep"><span>${L('Afya keeps from the care pack','Afya hubaki na')}</span><b>${tz(Math.round(r.margin))}</b><em>${(r.margin_pct*100).toFixed(1)}% ${L('of the fee','ya ada')}</em></div>
  <div class="hm-row keep"><span>${L('Expected add-on commission','Kamisheni inayotarajiwa')}</span><b>${tz(Math.round(r.comm))}</b><em>${S.addon_uptake*100}% ${L('book one add-on','huagiza moja')} × ${tz(r.addAvg)} ${L('average member price','wastani wa bei')} × ${S.commission*100}%</em></div>
  <div class="hm-row tot"><span>${L('Extra gross profit per member per month','Faida ya ziada kwa mwanachama kwa mwezi')}</span><b>${tz(Math.round(r.margin+r.comm))}</b></div>
 </div>`}
function hudumaHTML(id,compact){addCSS('p0h',HCSS);const SV=M.services(),d=D('base'),m12=d.r.months[11],y1=d.r.y1,S=IN.services;
 const first=SV.rows.find(r=>r.k==='mama');
 return `${compact?'':`<p class="s11lead ph-lead">${L('Every Afya Box is two things in one: the <b>products</b> a household uses every month, and <b>Afya Huduma</b>, the care services that come with them. The services follow one fixed structure in all 17 boxes, so every member knows what to expect and every service has a price, a provider and a cost that is recovered. Members pay for the services inside their box; partner businesses deliver them; Afya earns from both sides.','Kila Afya Box ni vitu viwili: <b>bidhaa</b> ambazo kaya hutumia kila mwezi, na <b>Afya Huduma</b>, huduma zinazokuja nazo. Huduma zinafuata muundo mmoja katika box zote 17, ili kila mwanachama ajue anachotarajia na kila huduma iwe na bei, mtoa huduma na gharama inayorudishwa.')}</p>`}
 <div class="ph-layers">
  <div class="ph-ly" style="--lc:${HLC[0]}"><i>1</i><b>${L('Afya Check in store','Afya Check dukani')}</b><small>${L('Free · our staff','Bure · wafanyakazi wetu')}</small><p>${L('A monthly check fitted to the box: baby weight and growth for Mama na Mtoto, BP for Presha Care, height and eyes for school children.','Kipimo cha kila mwezi kinacholingana na box: uzito wa mtoto, presha, urefu na macho kwa watoto wa shule.')}</p></div>
  <div class="ph-ly" style="--lc:${HLC[1]}"><i>2</i><b>${L('Partner care pack','Kifurushi cha mshirika')}</b><small>${L('Included · priced into the box','Kimejumuishwa · ndani ya bei')}</small><p>${L('One professional service from a partner business, on a fixed schedule: a baby massage every month, an HbA1c test every 3 months, a dental check twice a year.','Huduma moja ya kitaalamu kutoka kwa mshirika, kwa ratiba: masaji ya mtoto kila mwezi, kipimo cha HbA1c kila miezi 3, meno mara mbili kwa mwaka.')}</p></div>
  <div class="ph-ly" style="--lc:${HLC[2]}"><i>3</i><b>${L('Digital care','Huduma ya kidijitali')}</b><small>${L('Free · the one system','Bure · mfumo mmoja')}</small><p>${L('Reminders, a nurse or adviser on WhatsApp, reports to family abroad. It costs almost nothing per member, so it is free.','Ukumbusho, muuguzi au mshauri kwenye WhatsApp, ripoti kwa familia nje. Gharama ni ndogo sana, kwa hivyo ni bure.')}</p></div>
  <div class="ph-ly" style="--lc:${HLC[3]}"><i>4</i><b>${L('Partner add-ons','Huduma za ziada')}</b><small>${L('Optional · partner pays Afya 10%','Hiari · mshirika hulipa Afya 10%')}</small><p>${L('Extra services added to the package monthly (about 87% of the normal price) or booked once (90%), in the Afya app or at the store. For one-off bookings the member pays the partner; the partner pays Afya a 10% booking commission.','Huduma za ziada kwa bei ya wanachama, huagizwa kwenye programu. Mwanachama hulipa mshirika; mshirika hulipa Afya kamisheni ya 10%.')}</p></div>
 </div>
 <div id="${id}">
  <div class="ph-groups">${HGRP.map(g=>`<div class="ph-g"><div class="ph-grp">${L(g[1],g[2])}</div><div class="ph-pick" role="group" aria-label="${esc(g[1])}">${g[3].map(k=>{const r=SV.rows.find(x=>x.k===k);return `<button type="button" data-k="${k}" class="${k==='mama'?'on':''}" aria-pressed="${k==='mama'}">${esc(r.box)}</button>`}).join('')}</div></div>`).join('')}</div>
  <div class="ph-box" data-out>${hudumaBoxHTML(first)}</div>
 </div>
 ${fairHTML(id+'fr')}${moneyFlowHTML(id+'mf')}
 <p class="s11lead" style="margin-top:20px">${L(`The two streams for the whole business, read live from master model ${esc(IN.meta.version)}, base case. Averages are weighted by the planned member mix across the 17 boxes.`,`Mito miwili kwa biashara nzima, kutoka modeli kuu ${esc(IN.meta.version)}, hali ya msingi. Wastani umepimwa kwa mchanganyiko wa wanachama katika box 17.`)}</p>
 <div class="ph-tot">
  <div><b>${tz(Math.round(SV.avg_fee))}</b><span>${L('average care-pack fee per member per month','wastani wa ada kwa mwanachama kwa mwezi')}</span></div>
  <div><b>${tz(Math.round(SV.avg_margin)+Math.round(SV.avg_comm))}</b><span>${L(`extra gross profit per member per month (${tz(Math.round(SV.avg_margin))} margin + ${tz(Math.round(SV.avg_comm))} commission)`,`faida ya ziada kwa mwanachama kwa mwezi`)}</span></div>
  <div><b>${F.auto(m12.services+m12.commission)}</b><span>${L(`service income in month 12 with ${num(m12.members)} members (${F.auto(m12.services)} fees + ${F.auto(m12.commission)} commission)`,`mapato ya huduma mwezi wa 12 na wanachama ${num(m12.members)}`)}</span></div>
  <div><b>${F.auto(m12.service_cost)}</b><span>${L('paid to partner businesses in month 12: money Afya brings to local providers','hulipwa kwa washirika mwezi wa 12')}</span></div>
  <div class="g"><b>${F.auto(y1.services+y1.commission)}</b><span>${L(`service income in year 1, of total year-1 revenue ${F.auto(y1.revenue)}; adds ${F.auto(y1.services-y1.service_cost+y1.commission)} gross profit`,`mapato ya huduma mwaka 1, kati ya ${F.auto(y1.revenue)}`)}</span></div>
 </div>
 <details class="ph-more"><summary>${L('See all 17 boxes side by side, with the working','Ona box zote 17, na hesabu')}</summary>
  <div class="ph-tblw"><table class="ph-tbl"><thead><tr><th>${L('Box','Box')}</th><th>${L('Included partner service','Huduma ya mshirika')}</th><th class="n">${L('Visits / yr','Ziara / mwaka')}</th><th class="n">${L('Member rate','Bei ya mwanachama')}</th><th class="n">${L('Partner cost / mo','Gharama / mwezi')}</th><th class="n">${L('Pack fee / mo','Ada / mwezi')}</th><th class="n">${L('Afya keeps','Afya hubaki')}</th><th class="n">${L('Box + pack','Box + ada')}</th><th class="n">${L('Member mix','Mchanganyiko')}</th></tr></thead>
  <tbody>${HGRP.map(g=>`<tr><td colspan="9" style="font:500 .62rem var(--f-hud);letter-spacing:.16em;text-transform:uppercase;color:var(--gold);padding-top:14px">${L(g[1],g[2])}</td></tr>`+g[3].map(k=>SV.rows.find(x=>x.k===k)).map(r=>`<tr data-k="${r.k}"><td>${esc(r.box)}</td><td>${esc(r.service)}</td><td class="n">${r.visits}</td><td class="n">${tz(r.rate)}</td><td class="n">${tz(Math.round(r.cost))}</td><td class="n">${tz(r.fee)}</td><td class="n">${tz(Math.round(r.margin))}</td><td class="n">${tz(r.with_pack)}</td><td class="n">${Math.round(r.mix*100)}%</td></tr>`).join('')).join('')}
  <tr><td colspan="4"><b>${L('Weighted average','Wastani uliopimwa')}</b></td><td class="n"><b>${tz(Math.round(SV.avg_cost))}</b></td><td class="n"><b>${tz(Math.round(SV.avg_fee))}</b></td><td class="n"><b>${tz(Math.round(SV.avg_margin))}</b></td><td></td><td class="n"><b>100%</b></td></tr></tbody></table></div>
  <p class="note">${L(`Member rate = ${S.member_rate*100}% of the partner’s walk-in price, rounded to TSh 500 · partner cost per month = member rate × visits ÷ 12 · pack fee = partner cost × ${1+S.markup}, rounded up to the next TSh 500 · box prices from the section 3.5 engine (1-month plan, default options) · member mix is a planning estimate`,`Bei ya mwanachama = ${S.member_rate*100}% ya bei ya kawaida · gharama kwa mwezi = bei × ziara ÷ 12 · ada = gharama × ${1+S.markup}, imezungushwa juu · mchanganyiko ni makadirio`)}</p></details>
 ${compact?'':`<div class="ph-why">
  <div><h4>${L('Why partner businesses join','Kwa nini washirika wanajiunga')}</h4><ul>
   <li>${L('Prepaid, guaranteed bookings every month: Afya pays for the included services in advance.','Malipo ya mapema na wateja wa uhakika kila mwezi.')}</li>
   <li>${L('New customers without marketing costs: every member is introduced to them by name.','Wateja wapya bila gharama za matangazo.')}</li>
   <li>${L('Add-on bookings come through the Afya app, with reminders that cut no-shows.','Maagizo ya ziada kupitia programu, na ukumbusho unaopunguza wasiofika.')}</li>
   <li>${L('In return: 30% below walk-in for members, and 10% commission on add-ons.','Kwa malipo: 30% chini ya bei kwa wanachama, na 10% ya kamisheni.')}</li></ul></div>
  <div><h4>${L('The rules that keep it trusted','Kanuni zinazolinda imani')}</h4><ul>
   <li>${L('Only licensed providers: clinics and labs registered with the relevant Tanzanian authorities, checked before signing.','Watoa huduma wenye leseni tu, wanaokaguliwa kabla ya mkataba.')}</li>
   <li>${L('Afya never diagnoses. A worrying reading is referred to the member’s own clinic, whether or not it is a partner.','Afya haitambui magonjwa. Kipimo cha hatari hupelekwa kliniki ya mwanachama.')}</li>
   <li>${L('The commission is a disclosed booking fee on add-ons only; it never changes a referral.','Kamisheni ni ada ya kuagiza iliyo wazi; haibadilishi rufaa.')}</li>
   <li>${L('No partner agreement exists yet. Every price here is a planning estimate to be replaced by written quotations during on-the-ground research.','Hakuna mkataba bado. Kila bei ni makadirio hadi tupate nukuu rasmi.')}</li></ul></div>
 </div>`}`}
function hudumaInit(id){const w=document.getElementById(id);if(!w)return;const SV=M.services(),out=w.querySelector('[data-out]');
 mfInit(id+'mf',SV.rows.find(r=>r.k==='mama'));fairInit(id+'fr',SV.rows.find(r=>r.k==='mama'));
 w.querySelectorAll('.ph-pick button').forEach(b=>b.onclick=()=>{w.querySelectorAll('.ph-pick button').forEach(x=>{const on=x===b;x.classList.toggle('on',on);x.setAttribute('aria-pressed',on)});
  out.innerHTML=hudumaBoxHTML(SV.rows.find(r=>r.k===b.dataset.k));if(MF[id+'mf'])MF[id+'mf'].set(SV.rows.find(r=>r.k===b.dataset.k));fairInit(id+'fr',SV.rows.find(r=>r.k===b.dataset.k));document.querySelectorAll('.ph-tbl tr[data-k]').forEach(t=>t.classList.toggle('on',t.dataset.k===b.dataset.k))});}

/* ---------- Afya Kazini: the business membership (0.1 and 0.2) ---------- */
const KCSS=`
.kz-sizes{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin:18px 0 22px}
.kz-size{padding:20px;border-radius:18px;border:1px solid var(--edge);background:linear-gradient(170deg,var(--panel2),rgba(2,6,8,.7));min-width:0}
.kz-size small{display:block;font:500 .6rem var(--f-hud);letter-spacing:.18em;text-transform:uppercase;color:var(--gold)}
.kz-size b{display:block;margin-top:8px;font:700 1.08rem var(--f-display)}
.kz-size .pr{display:block;margin-top:10px;font:500 1.05rem var(--f-hud);color:var(--neon)}
.kz-size p{margin:8px 0 0;font-size:.86rem;line-height:1.5;color:var(--ink2)}
.kz-four{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-bottom:22px}
.kz-tool{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);gap:16px;margin-top:14px}
.kz-list{padding:20px 22px;border-radius:18px;border:1px solid var(--edge);background:var(--panel)}
.kz-list h4{margin:0 0 4px;font:700 1rem var(--f-display)}
.kz-list .sub{margin:0 0 12px;font-size:.82rem;color:var(--ink3)}
.kz-it{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:2px 14px;padding:8px 0;border-bottom:1px solid rgba(95,191,143,.08);font-size:.88rem;color:var(--ink2)}
.kz-it b{font:500 .82rem var(--f-hud);color:var(--ink);text-align:right;white-space:nowrap}
.kz-it em{grid-column:1/-1;font-style:normal;font-size:.76rem;color:var(--ink3)}
.kz-it.x span::before{content:"+ ";color:var(--gold)}
.kz-why{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px;margin-top:18px}
.kz-why div{padding:18px;border-radius:16px;border:1px solid var(--edge);background:var(--panel);min-width:0}
.kz-why b{display:block;font:700 .92rem var(--f-display)}
.kz-why p{margin:6px 0 0;font-size:.84rem;line-height:1.5;color:var(--ink2)}
@media (max-width:1150px){.kz-four{grid-template-columns:repeat(2,minmax(0,1fr))}.kz-tool{grid-template-columns:1fr}.kz-why{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:820px){.kz-sizes,.kz-four,.kz-why{grid-template-columns:1fr}}
`;
/* Afya Kazini (medium office) and Afya Hoteli prices: read live from the shared box price (shell/boxprice.js); no price is kept here */
const KZBP=(slug,plan,stage)=>{const r=window.AB_BOXPRICE&&window.AB_BOXPRICE(slug,{plan,stage});return r?r.from:0};
const KZOFF={get m1(){return KZBP('afya-kazini','m1','m')},get m6(){return KZBP('afya-kazini','m6','m')},get m12(){return KZBP('afya-kazini','m12','m')},get hotel(){return KZBP('afya-hoteli','m12')}};
function kzKitHTML(r){const K=IN.kazini,lines=K.core.map(x=>[x[0],x[1],x[2],x[3],0]).concat(r.extra.map(x=>[x[0],x[1],x[2],'',1]));
 const q=v=>v===0.34?L('1 every 3 months','1 kila miezi 3'):v===0.5?L('1 every 2 months','1 kila miezi 2'):'× '+v;
 return `<div class="kz-list"><h4>${esc(r.name)} · ${L(esc(r.en),esc(r.en))}</h4><p class="sub">${L('Delivered every month · items marked + are the sector kit','Inaletwa kila mwezi · vyenye + ni vya sekta')}</p>
  ${lines.map(x=>`<div class="kz-it${x[4]?' x':''}"><span>${esc(x[0])} · ${q(x[2])}</span><b>${tz(Math.round(x[1]*x[2]))}</b>${x[3]?`<em>${esc(x[3])}</em>`:''}</div>`).join('')}
  ${K.safety.concat(r.svc?[r.svc]:[]).map(x=>`<div class="kz-it"><span>${L('Partner service','Huduma ya mshirika')}: ${esc(x[0])} · ${x[2]} ${L('a year','kwa mwaka')}</span><b>${L('included','imejumuishwa')}</b></div>`).join('')}</div>
 <div class="ph-money"><h4>${L(`${esc(r.name)} · the money, per business per month`,`${esc(r.name)} · fedha, kwa biashara kwa mwezi`)}</h4><p class="sub">${L('Planning estimates · same pricing rules as the Afya Boxes · every line shows its working','Makadirio · kanuni zilezile za bei za Afya Box')}</p>
  <div class="hm-row"><span>${L('Supplies at shelf price','Bidhaa kwa bei ya rafu')}</span><b>${tz(Math.round(r.val))}</b></div>
  <div class="hm-row"><span>${L('Supplies after the 3% member saving','Bidhaa baada ya punguzo la 3%')}</span><b>${tz(Math.round(r.goods))}</b><em>${tz(Math.round(r.val))} × ${(1-IN.kazini.discount).toFixed(2)}</em></div>
  <div class="hm-row"><span>${L('Safety-service fee','Ada ya huduma za usalama')}</span><b>+ ${tz(r.fee)}</b><em>${L('partner cost','gharama ya mshirika')} ${tz(Math.round(r.svcCost))} × 1.25 → ${L('rounded up to','juu hadi')} ${tz(r.fee)}</em></div>
  <div class="hm-row"><span>${L('Packing and delivery','Ufungaji na usafirishaji')}</span><b>+ ${tz(r.pd)}</b><em>${L('box at landed cost + delivery, charged at cost','box kwa gharama halisi + usafirishaji, kwa gharama halisi')}</em></div>
  <div class="hm-row tot"><span>${L('The business pays each month','Biashara hulipa kila mwezi')}</span><b>${tz(r.price)}</b><em>${L('rounded to TSh 500','imezungushwa hadi TSh 500')}</em></div>
  <div class="hm-row"><span>${L('Buying it all alone','Kununua yenyewe')}</span><b>${tz(Math.round(r.shop))}</b><em>${L(`small-shop prices +18%, 4 trips × TSh 2,000, walk-in service prices (the section 3.5 comparison)`,`bei za maduka madogo +18%, safari 4 × TSh 2,000, bei za kawaida za huduma`)}</em></div>
  <div class="hm-row keep"><span>${L('The business saves','Biashara inaokoa')}</span><b>${tz(Math.round(r.shop-r.price))}</b><em>${Math.round((r.shop-r.price)/r.shop*100)}% ${L('a month, plus a box that is never empty','kwa mwezi')}</em></div>
  <div class="hm-row keep"><span>${L('Afya gross profit per account','Faida ya Afya kwa akaunti')}</span><b>${tz(Math.round(r.gp))}</b><em>${tz(Math.round(r.goods))} × 30% + ${tz(Math.round(r.fee-r.svcCost))} ${L('service margin','faida ya huduma')}</em></div>
 </div>`}
function kaziniHTML(id,compact){addCSS('p0h',HCSS);addCSS('p0k2',KCSS);const KZ=M.kazini(),d=D('base'),m12=d.r.months[11],y1=d.r.y1,K=IN.kazini;
 const lo=Math.min(...KZ.rows.map(r=>r.price)),hi=Math.max(...KZ.rows.map(r=>r.price));const first=KZ.rows[0];
 return `${compact?'':`<p class="s11lead ph-lead">${L('<b>Afya Kazini</b> (“health at work”) is the Afya membership for businesses. Every business, from a kiosk to a factory, needs the same things every month: a first-aid box that is actually full, soap and hand wash for staff, cleaning supplies, people trained in first aid, and staff who stay healthy. Tanzanian law asks for most of this, and most businesses buy it once and forget it. Afya Kazini delivers it every month, keeps the business ready for an inspection, and turns every employee into a possible Afya family.','<b>Afya Kazini</b> (“afya kazini”) ni uanachama wa Afya kwa biashara. Kila biashara, kutoka kibanda hadi kiwanda, inahitaji vitu vilevile kila mwezi: sanduku la huduma ya kwanza lililojaa, sabuni kwa wafanyakazi, vifaa vya usafi, watu waliofunzwa huduma ya kwanza, na wafanyakazi wenye afya. Afya Kazini inaleta hivi kila mwezi na kugeuza kila mfanyakazi kuwa familia ya Afya.')}</p>`}
 <div class="kz-sizes">
  <div class="kz-size"><small>${L('1–9 staff','Wafanyakazi 1–9')}</small><b>Kazini Ndogo</b><span class="pr">${tz(lo)} – ${tz(hi)} / ${L('month','mwezi')}</span><p>${L('Shops, kiosks, restaurants, salons, workshops and small offices. One core kit plus a kit for the sector.','Maduka, vibanda, migahawa, saluni, karakana na ofisi ndogo.')}</p></div>
  <div class="kz-size"><small>${L('10–50 staff','Wafanyakazi 10–50')}</small><b>Kazini Kati · Afya Ofisi</b><span class="pr">${tz(KZOFF.m1)} / ${L('25 staff a month','wafanyakazi 25 kwa mwezi')}</span><p>${L('The legal band of the OSH Rules 2015: one first-aid box and two trained first aiders. Includes a monthly staff BP and BMI screening day and two first-aid training seats a year. Afya Hoteli (per 20 rooms) sits here too.','Kundi la kisheria la Kanuni za OSH 2015: sanduku moja na watoa huduma ya kwanza wawili. Pamoja na siku ya kupima wafanyakazi kila mwezi.')}</p></div>
  <div class="kz-size"><small>${L('51+ staff','Wafanyakazi 51+')}</small><b>Kazini Kubwa</b><span class="pr">${tz(KZOFF.m12)} – ${tz(KZOFF.m6)} / ${L('25 staff','wafanyakazi 25')}</span><p>${L('Factories, schools, banks, NGOs. One Afya Ofisi unit per 25 staff on a 6 or 12-month plan, on-site check days, one monthly invoice with 30 days to pay.','Viwanda, shule, benki, NGO. Kitengo kimoja kwa wafanyakazi 25, siku za kupima mahali pa kazi, ankara moja ya kila mwezi.')}</p></div>
 </div>
 ${compact?'':kvHTML(id+'kv')}
 ${compact?'':`<div class="kz-four">
  <div class="ph-ly" style="--lc:${HLC[0]}"><i>1</i><b>${L('Supplies the law asks for','Vifaa vinavyotakiwa na sheria')}</b><small>${L('Delivered monthly','Kila mwezi')}</small><p>${L('First-aid refills, soap for employees (OSH Rules 2015, rule 7(3)(d)), cleaning for the staff toilet, and a kit for the sector.','Kujaza sanduku, sabuni kwa wafanyakazi, usafi wa choo, na vifaa vya sekta.')}</p></div>
  <div class="ph-ly" style="--lc:${HLC[1]}"><i>2</i><b>${L('Safety services','Huduma za usalama')}</b><small>${L('Partners · priced in','Washirika · ndani ya bei')}</small><p>${L('An accredited first-aid training seat and a fire-extinguisher service every year; pest control for food businesses.','Mafunzo ya huduma ya kwanza na huduma ya kizima moto kila mwaka; kudhibiti wadudu kwa migahawa.')}</p></div>
  <div class="ph-ly" style="--lc:${HLC[2]}"><i>3</i><b>${L('Staff health','Afya ya wafanyakazi')}</b><small>${L('Free · the staff channel','Bure · njia ya wafanyakazi')}</small><p>${L('Every employee gets an Afya Staff Card: free Afya Checks, member prices, and family boxes paid by mobile money, payroll deduction, or the employer as a staff benefit.','Kila mfanyakazi anapata kadi ya Afya: vipimo vya bure, bei za wanachama, na box za familia.')}</p></div>
  <div class="ph-ly" style="--lc:${HLC[3]}"><i>4</i><b>${L('The Afya Kazini seal','Alama ya Afya Kazini')}</b><small>${L('Earned monthly','Hupatikana kila mwezi')}</small><p>${L('A window sticker and a digital record: kit checked at every delivery, first aiders trained, extinguisher serviced. It is Afya’s own standard, not a government certificate.','Kibandiko na rekodi ya kidijitali. Ni kiwango cha Afya, si cheti cha serikali.')}</p></div>
 </div>`}
 <div id="${id}"><div class="ph-groups" style="grid-template-columns:1fr"><div class="ph-g"><div class="ph-grp">${L('Kazini Ndogo · choose a sector','Kazini Ndogo · chagua sekta')}</div><div class="ph-pick" role="group" aria-label="Sector">${KZ.rows.map((r,i)=>`<button type="button" data-k="${r.k}" class="${i?'':'on'}" aria-pressed="${!i}">${esc(r.en)}</button>`).join('')}</div></div></div>
  <div class="kz-tool" data-out>${kzKitHTML(first)}</div></div>
 <p class="s11lead" style="margin-top:20px">${L(`What Afya Kazini adds in master model ${esc(IN.meta.version)}, base case. Only Kazini Ndogo is new here; Afya Ofisi and Afya Hoteli were already in the box plan.`,`Kinachoongezwa na Afya Kazini kwenye modeli kuu ${esc(IN.meta.version)}. Kazini Ndogo pekee ndiyo mpya.`)}</p>
 <div class="ph-tot">
  <div><b>${num(K.accounts_m12)}</b><span>${L('small-business accounts by month 12, about 3 new a month','akaunti za biashara ndogo mwezi wa 12')}</span></div>
  <div><b>${tz(Math.round(KZ.avg_price))}</b><span>${L('average price per account a month, weighted by the sector mix','wastani wa bei kwa akaunti kwa mwezi')}</span></div>
  <div><b>${tz(Math.round(KZ.avg_gp))}</b><span>${L('Afya gross profit per account a month','faida ya Afya kwa akaunti kwa mwezi')}</span></div>
  <div><b>${F.auto(m12.kazini)}</b><span>${L(`revenue in month 12 (${num(K.accounts_m12)} × ${tz(Math.round(KZ.avg_price))})`,`mapato mwezi wa 12`)}</span></div>
  <div class="g"><b>${F.auto(y1.kazini)}</b><span>${L(`revenue in year 1, adding ${F.auto(y1.kazini_gp)} gross profit; year-1 revenue is now ${F.auto(y1.revenue)}`,`mapato mwaka 1; mapato yote ya mwaka 1 sasa ni ${F.auto(y1.revenue)}`)}</span></div>
 </div>
 ${compact?'':`<div class="kz-why">
  <div><b>${L('One subscription, ready for inspection','Usajili mmoja, tayari kwa ukaguzi')}</b><p>${L('Supplies, first aiders and fire safety in one monthly payment, with a record the owner can show an inspector.','Vifaa, watoa huduma ya kwanza na usalama wa moto kwa malipo moja.')}</p></div>
  <div><b>${L('A seal customers can see','Alama wateja wanaiona')}</b><p>${L('Salons, restaurants and shops show the Afya Kazini sticker. It tells customers the place is clean and prepared, and it puts the Afya name in every street.','Saluni, migahawa na maduka huonyesha kibandiko; jina la Afya linaonekana kila mtaa.')}</p></div>
  <div><b>${L('Every business brings its staff','Kila biashara inaleta wafanyakazi')}</b><p>${L(`About ${num(K.accounts_m12*K.staff_avg)} staff are reached through small businesses alone by month 12. Their family boxes count inside the member plan (about ${num(d.mem12)} members by month 12), not on top of it; Kazini lowers the cost of winning those members.`,`Takriban wafanyakazi ${num(K.accounts_m12*K.staff_avg)} wanafikiwa kupitia biashara ndogo pekee kufikia mwezi 12. Box zao za familia zinahesabiwa ndani ya mpango wa wanachama (takriban ${num(d.mem12)} kufikia mwezi 12), si juu yake; Kazini inapunguza gharama ya kuwapata wanachama hao.`)}</p></div>
  <div><b>${L('Paid like a business pays','Hulipwa kama biashara')}</b><p>${L('Mobile money for small businesses, one invoice with 30 days to pay for large ones, the same price every month.','Pesa ya simu kwa biashara ndogo, ankara moja kwa kubwa.')}</p></div>
  <div><b>${L('Customer-funded, like everything else','Inalipwa na mteja')}</b><p>${L('Partner services carry the same 25% markup and delivery is inside the price, so every account earns from its first month.','Huduma za washirika zina ongezeko la 25% na usafirishaji uko ndani ya bei.')}</p></div>
 </div>`}
 <p class="note">${L('Legal basis: Occupational Safety and Health (First Aid and Welfare Facilities) Rules, 2015 (GN 147): rule 4(2)(e) one first-aid box and two trained first aiders for 10–50 employees; rule 4(4) kept clean and ready for use; rule 7(3)(d) soap for employees; rule 12 safe drinking water and cups. Afya Kazini prices are planning estimates; item prices come from the section 3.5 catalogue.','Msingi wa kisheria: Kanuni za OSH (Huduma ya Kwanza na Ustawi) 2015 (GN 147). Bei ni makadirio.')} <a class="cite" href="https://tanzlii.org/en/akn/tz/act/gn/2015/147/eng@2015-04-03" target="_blank" rel="noopener">[OSH Rules 2015]</a></p>`}
function kaziniInit(id){const w=document.getElementById(id);if(!w)return;kvInit(id+'kv');const KZ=M.kazini(),out=w.querySelector('[data-out]');
 w.querySelectorAll('.ph-pick button').forEach(b=>b.onclick=()=>{w.querySelectorAll('.ph-pick button').forEach(x=>{const on=x===b;x.classList.toggle('on',on);x.setAttribute('aria-pressed',on)});out.innerHTML=kzKitHTML(KZ.rows.find(r=>r.k===b.dataset.k))});}

/* ---------- Where every shilling goes: cinematic money explainer (two streams) ---------- */
const FCSS=`
.mx{margin:26px 0 8px;border-radius:26px;border:1px solid var(--edge2);background:linear-gradient(170deg,#071a13,#020806);overflow:hidden}
.mx-head{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:14px;padding:22px 24px 16px}
.mx-head small{display:block;font:500 .62rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--gold)}
.mx-head h4{margin:6px 0 0;font:700 clamp(1.15rem,2.2vw,1.5rem)/1.15 var(--f-display);letter-spacing:-.01em}
.mx-tabs{display:flex;gap:6px;flex-wrap:wrap}
.mx-tabs button{display:flex;flex-direction:column;align-items:flex-start;gap:2px;padding:10px 16px;border-radius:14px;border:1px solid var(--edge);background:rgba(2,10,8,.6);color:var(--ink2);cursor:pointer;text-align:left}
.mx-tabs button b{font:700 .86rem var(--f-body)}
.mx-tabs button span{font:500 .62rem var(--f-hud);letter-spacing:.12em;text-transform:uppercase;opacity:.8}
.mx-tabs button[aria-selected="true"]{background:linear-gradient(135deg,var(--gold2),var(--gold));color:#1a1204;border-color:transparent}
.mx-body{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);gap:0;border-top:1px solid var(--edge)}
.mx-scene{position:relative;min-height:440px;overflow:hidden;background:#04100c}
.mx-img{position:absolute;inset:0;background:#04100c center/cover no-repeat;opacity:0;transform:scale(1.04);transition:opacity 1.1s ease,transform 7s ease-out}
.mx-img.on{opacity:1;transform:scale(1.12)}
.mx-scene::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(2,8,6,.88) 0%,rgba(2,8,6,.15) 45%,rgba(2,8,6,.05)),linear-gradient(90deg,rgba(2,8,6,.35),transparent 40%);pointer-events:none}
.mx-who{position:absolute;z-index:3;left:22px;top:20px;display:flex;align-items:center;gap:8px;padding:7px 13px;border-radius:999px;background:rgba(2,8,6,.78);border:1px solid var(--edge2);font:600 .8rem var(--f-body);color:var(--gold2);backdrop-filter:blur(6px)}
.mx-who i{width:8px;height:8px;border-radius:50%;background:var(--gold);box-shadow:0 0 10px var(--gold);animation:blink 1.6s steps(2) infinite}
.mx-say{position:absolute;z-index:3;left:24px;right:220px;bottom:22px}
.mx-say .n{font:500 .66rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--neon)}
.mx-say h5{margin:8px 0 0;font:700 clamp(1.15rem,2vw,1.55rem)/1.15 var(--f-display);color:#fff;text-wrap:balance}
.mx-phone{position:absolute;z-index:4;right:22px;bottom:22px;width:186px;border-radius:26px;padding:8px;background:linear-gradient(160deg,#2a332f,#0b0f0d);box-shadow:0 30px 60px -18px rgba(0,0,0,.95),inset 0 0 0 1px rgba(255,255,255,.1);transform:translateY(0) rotate(-2deg);transition:transform .6s cubic-bezier(.2,.8,.2,1)}
.mx-phone.pop{animation:phpop .7s cubic-bezier(.2,.8,.2,1)}
@keyframes phpop{0%{transform:translateY(30px) rotate(-2deg);opacity:0}100%{transform:translateY(0) rotate(-2deg);opacity:1}}
.mx-scr{border-radius:20px;background:#f4f8f6;padding:14px 12px 12px;color:#0b2219;min-height:230px;display:flex;flex-direction:column;gap:7px}
.mx-scr .app{display:flex;align-items:center;gap:7px;font:800 .78rem var(--f-display);color:#0f7a52}
.mx-scr .app svg{width:18px;height:18px}
.mx-scr .t{font:700 .82rem var(--f-body);line-height:1.25}
.mx-scr .r{display:flex;justify-content:space-between;gap:6px;padding:7px 8px;border-radius:9px;background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.07);font:600 .66rem var(--f-body)}
.mx-scr .r b{color:#0f7a52;text-align:right}
.mx-scr .r s{color:#9aa9a2;font-weight:500}
.mx-scr .ok{margin-top:auto;padding:9px;border-radius:10px;background:#0f7a52;color:#fff;text-align:center;font:700 .72rem var(--f-body)}
.mx-scr .ok.g{background:#f2c96b;color:#1a1204}
.mx-side{display:flex;flex-direction:column;gap:18px;padding:24px;min-width:0;border-left:1px solid var(--edge)}
.mx-side p{margin:0;font-size:.98rem;line-height:1.6;color:var(--ink2)}
.mx-side p b{color:var(--gold2);font-family:var(--f-hud);font-weight:500}
.mx-side .swap{animation:rise .55s cubic-bezier(.2,.8,.2,1)}
.mx-bar{display:grid;gap:8px}
.mx-bar .tt{display:flex;justify-content:space-between;align-items:baseline;font:500 .62rem var(--f-hud);letter-spacing:.16em;text-transform:uppercase;color:var(--ink3)}
.mx-bar .tt b{font:500 1.05rem var(--f-hud);letter-spacing:0;color:var(--ink)}
.mx-track{display:flex;height:46px;border-radius:12px;overflow:hidden;background:rgba(255,255,255,.06);gap:3px}
.mx-seg{position:relative;flex:0 0 0%;min-width:0;display:flex;align-items:center;justify-content:center;font:600 .78rem var(--f-hud);white-space:nowrap;overflow:hidden;transition:flex-basis 1.1s cubic-bezier(.2,.8,.2,1),opacity .5s,filter .5s}
.mx-seg.p{background:linear-gradient(135deg,#1e8f62,#0f7a52);color:#e9fff5}
.mx-seg.c{background:linear-gradient(135deg,var(--gold2),var(--gold));color:#1a1204}
.mx-seg.q{background:linear-gradient(135deg,#7fe3ff,#3cb8db);color:#03202b}
.mx-seg.k{background:linear-gradient(135deg,var(--neon2),var(--neon));color:#02160f}
.mx-seg.s{background:repeating-linear-gradient(135deg,rgba(255,255,255,.12) 0 6px,transparent 6px 12px);color:var(--ink2)}
.mx-seg.dim{opacity:.35;filter:saturate(.4)}
.mx-seg.glow{box-shadow:inset 0 0 0 2px #fff,0 0 22px rgba(242,201,107,.6)}
.mx-leg{display:grid;gap:6px}
.mx-leg div{display:grid;grid-template-columns:12px minmax(0,1fr) auto;gap:10px;align-items:center;font-size:.86rem;color:var(--ink2)}
.mx-leg i{width:12px;height:12px;border-radius:3px}
.mx-leg b{font:500 .86rem var(--f-hud);color:var(--ink);white-space:nowrap}
.mx-leg div.dim{opacity:.4}
.mx-people{display:flex;gap:8px;align-items:flex-end}
.mx-people span{flex:1;display:grid;place-items:center;gap:4px;padding:10px 4px;border-radius:12px;border:1px solid var(--edge);font:500 .66rem var(--f-hud);color:var(--ink3);transition:all .6s}
.mx-people span svg{width:28px;height:28px;color:var(--ink3)}
.mx-people span.on{border-color:var(--gold);background:rgba(242,201,107,.12);color:var(--gold2)}
.mx-people span.on svg{color:var(--gold)}
.mx-foot{display:flex;flex-wrap:wrap;align-items:center;gap:14px;padding:16px 24px;border-top:1px solid var(--edge)}
.mx-foot .pp{width:44px;height:44px;border-radius:50%;border:1px solid var(--edge2);background:rgba(242,201,107,.1);color:var(--gold2);cursor:pointer;display:grid;place-items:center}
.mx-foot .pp svg{width:16px;height:16px}
.mx-steps{display:flex;gap:6px;flex:1;min-width:200px}
.mx-steps button{flex:1;padding:0;border:0;background:none;cursor:pointer;text-align:left;color:var(--ink3);font:600 .74rem var(--f-body)}
.mx-steps button i{display:block;height:4px;margin-bottom:7px;border-radius:4px;background:rgba(255,255,255,.14);overflow:hidden}
.mx-steps button i em{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--gold),var(--neon))}
.mx-steps button.done i em{width:100%}
.mx-steps button.on{color:var(--ink)}
.mx-tot{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));border-top:1px solid var(--edge)}
.mx-tot div{padding:16px 24px;border-left:1px solid var(--edge);min-width:0}
.mx-tot div:first-child{border-left:0}
.mx-tot b{display:block;font:500 1.25rem var(--f-hud);color:var(--neon)}
.mx-tot span{display:block;margin-top:4px;font-size:.8rem;line-height:1.4;color:var(--ink2)}
.mx-tot div.g b{color:var(--gold2)}
@media (max-width:1000px){.mx-body{grid-template-columns:1fr}.mx-side{border-left:0;border-top:1px solid var(--edge)}.mx-scene{min-height:380px}}
@media (max-width:600px){.mx-scene{min-height:420px}.mx-say{right:24px;bottom:auto;top:64px}.mx-phone{width:160px;right:16px;bottom:16px}.mx-tot{grid-template-columns:1fr}.mx-tot div{border-left:0;border-top:1px solid var(--edge)}.mx-steps button{font-size:0}}
@media (prefers-reduced-motion:reduce){.mx-img,.mx-seg,.mx-phone{transition:none!important;animation:none!important}}
`;
const MX_MEMBER={mama:'real-mother-baby',preg:'real-mother-back',senior:'real-elder-portrait',rec:'real-recovery',sugar:'real-health-check',presha:'real-bp-nurse',kidney:'real-health-check',man:'real-man-phone',home:'real-family',office:'real-woman-phone',hotel:'real-woman-phone',glow:'real-woman-phone',siku:'real-woman-phone'};
const MX_PART={mama:'real-baby-massage',preg:'real-nurse-newborn',shule:'real-dental',binti:'real-partner-clinic',sugar:'real-lab',presha:'real-lab',kidney:'real-lab',senior:'real-elder-physio',rec:'real-elder-physio'};
const mxImg=(m,k)=>`img/${(m?MX_MEMBER:MX_PART)[k]||(m?'real-mother-baby':'real-partner-clinic')}.webp`;
const MX_LOGO='<svg viewBox="0 0 48 48" aria-hidden="true"><rect width="48" height="48" rx="12" fill="#0f7a52"/><path d="M 11.12 22.32 L 24 11.68 L 36.88 22.32" fill="none" stroke="#fff" stroke-width="3.1" stroke-linecap="round" stroke-linejoin="round"/><path d="M 24 36.32 C 17.28 31.84 14.48 28.48 14.48 24.84 C 14.48 22.04 16.72 20.08 19.24 20.08 C 21.2 20.08 22.88 21.2 24 22.88 C 25.12 21.2 26.8 20.08 28.76 20.08 C 31.28 20.08 33.52 22.04 33.52 24.84 C 33.52 28.48 30.72 31.84 24 36.32 Z" fill="#fff"/><path d="M 15.6 27.92 L 20.08 27.92 L 21.76 25.12 L 24 31.28 L 25.96 26.8 L 32.4 26.8" fill="none" stroke="#f2c96b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const MX_P='<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="7" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8z"/></svg>';
function moneyFlowHTML(id){addCSS('p0mx',FCSS);
 return `<div class="mx" id="${id}">
 <div class="mx-head"><div><small>${L('Where every shilling goes','Kila shilingi inakwenda wapi')}</small><h4 data-ttl></h4></div>
  <div class="mx-tabs" role="tablist"><button type="button" role="tab" data-s="1" aria-selected="true"><span>${L('Stream 1','Mto 1')}</span><b>${L('The care pack','Kifurushi cha huduma')}</b></button><button type="button" role="tab" data-s="2" aria-selected="false"><span>${L('Stream 2','Mto 2')}</span><b>${L('Add-on commission','Kamisheni ya ziada')}</b></button></div></div>
 <div class="mx-body">
  <div class="mx-scene"><div class="mx-img" data-i0></div><div class="mx-img" data-i1></div>
   <div class="mx-who"><i></i><span data-who></span></div>
   <div class="mx-say"><div class="n" data-n></div><h5 data-h></h5></div>
   <div class="mx-phone" data-ph><div class="mx-scr" data-scr></div></div></div>
  <div class="mx-side"><p data-p></p><div class="mx-bar"><div class="tt"><span data-bt></span><b data-bv></b></div><div class="mx-track" data-track></div></div><div class="mx-leg" data-leg></div><div data-extra></div></div>
 </div>
 <div class="mx-foot"><button type="button" class="pp" data-pp aria-label="Pause"></button><div class="mx-steps" data-steps></div></div>
 <div class="mx-tot" data-sum></div></div>`}
function mxSteps(r,s){const t=n=>tz(Math.round(n)),C=IN.services.commission,U=IN.services.addon_uptake,a=r.adds[0],sched=r.visits===12?L('every month','kila mwezi'):`${r.visits} ${L('times a year','mara kwa mwaka')}`;
 const mi=mxImg(1,r.k),pi=mxImg(0,r.k),ph=(title,rows,ok,gold)=>({title,rows,ok,gold});
 if(s==1)return {ttl:L(`${esc(r.box)}: the member pays once, three parties are served`,`${esc(r.box)}: mwanachama analipa mara moja`),steps:[
  {lab:L('Member pays','Mwanachama analipa'),img:mi,who:L('The member','Mwanachama'),h:L('One monthly payment covers products and care','Malipo moja kwa bidhaa na huduma'),
   p:L(`The ${esc(r.box)} member pays <b>${t(r.with_pack)}</b> once a month by mobile money. Most of it buys the products in the box; the rest, <b>${t(r.fee)}</b>, is the care pack.`,`Mwanachama analipa <b>${t(r.with_pack)}</b> kwa mwezi; <b>${t(r.fee)}</b> ni kifurushi cha huduma.`),
   phone:ph(L('Payment sent','Malipo yametumwa'),[[L('To','Kwa'),'Afya Basics'],[L('Box of products','Box ya bidhaa'),t(r.box_price)],[L('Care pack','Huduma'),t(r.fee)]],`${L('Paid','Imelipwa')} ${t(r.with_pack)} ✓`),
   bt:L('The member’s payment','Malipo ya mwanachama'),total:r.with_pack,segs:[['p',r.box_price,L('Products','Bidhaa')],['c',r.fee,L('Care pack','Huduma')]],glow:1},
  {lab:L('Afya pays partner','Afya inalipa'),img:pi,who:esc(r.partner),h:L(`Afya books the ${esc(r.service.toLowerCase())} and prepays the partner`,`Afya inaagiza na kulipa mshirika`),
   p:L(`The partner usually charges <b>${t(r.walk)}</b>. Because Afya brings members and pays in advance, the member rate is <b>${t(r.rate)}</b>, 70% of the walk-in price. Spread over the year that is <b>${t(r.cost)}</b> a month.`,`Bei ya kawaida <b>${t(r.walk)}</b>; ya wanachama <b>${t(r.rate)}</b>. Kwa mwezi ni <b>${t(r.cost)}</b>.`),
   phone:ph(L('Booking confirmed','Imethibitishwa'),[[esc(r.service),sched],[L('Partner price','Bei ya kawaida'),`<s>${t(r.walk)}</s>`],[L('Member rate','Bei ya mwanachama'),t(r.rate)]],L('Prepaid by Afya','Imelipwa na Afya')),
   bt:L('The care-pack fee','Ada ya huduma'),total:r.fee,segs:[['q',r.cost,L('Paid to the partner','Kwa mshirika')],['c',r.fee-r.cost,L('Kept by Afya','Afya inabaki')]],glow:0},
  {lab:L('Care delivered','Huduma imetolewa'),img:pi,who:esc(r.partner),h:L('The member receives the care, with nothing to arrange','Mwanachama anapata huduma bila usumbufu'),
   p:L(`The member gets the <b>${esc(r.service.toLowerCase())}</b> ${sched}. Afya sends the reminder the day before; nobody pays at the door, and the member rates the visit afterwards.`,`Mwanachama anapata <b>${esc(r.service.toLowerCase())}</b> ${sched}.`),
   phone:ph(L('Visit complete','Ziara imekamilika'),[[esc(r.service),'✓'],[L('Paid at the door','Kulipa mlangoni'),'TSh 0'],[L('Your rating','Tathmini'),'★★★★★']],L('See next visit','Ziara ijayo')),
   bt:L('The care-pack fee','Ada ya huduma'),total:r.fee,segs:[['q',r.cost,L('Paid to the partner','Kwa mshirika')],['c',r.fee-r.cost,L('Kept by Afya','Afya inabaki')]],glow:0},
  {lab:L('Afya keeps','Afya inabaki'),img:'img/exterior.webp',who:'Afya Basics',h:L(`Afya keeps ${t(r.margin)} a month from each member`,`Afya inabaki na ${t(r.margin)} kwa mwezi`),
   p:L(`<b>${t(r.fee)}</b> in, <b>${t(r.cost)}</b> out: Afya keeps <b>${t(r.margin)}</b> per member per month for organising, prepaying and checking quality. This is stream 1. The products earn their own margin separately.`,`<b>${t(r.fee)}</b> inaingia, <b>${t(r.cost)}</b> inatoka: Afya inabaki na <b>${t(r.margin)}</b>.`),
   phone:ph(L('Afya · this member','Afya · mwanachama huyu'),[[L('Care pack in','Imeingia'),t(r.fee)],[L('Paid to partner','Imelipwa'),'− '+t(r.cost)],[L('Afya keeps','Afya inabaki'),t(r.margin)]],L('Stream 1 ✓','Mto 1 ✓'),1),
   bt:L('The care-pack fee','Ada ya huduma'),total:r.fee,segs:[['q',r.cost,L('Paid to the partner','Kwa mshirika')],['c',r.fee-r.cost,L('Kept by Afya','Afya inabaki')]],glow:1,dimFirst:1}]};
 return {ttl:L('Extra services: the member saves, the partner gains, Afya earns 10%','Huduma za ziada: mwanachama anaokoa, Afya inapata 10%'),steps:[
  {lab:L('Member books','Mwanachama anaagiza'),img:mi,who:L('The member','Mwanachama'),h:L(`The member books a ${esc(a[0].toLowerCase())} in the app`,`Mwanachama anaagiza ${esc(a[0].toLowerCase())}`),
   p:L(`Outside the care pack, the member wants a <b>${esc(a[0].toLowerCase())}</b>. The usual price is <b>${t(a[1])}</b>; in the Afya app the member pays <b>${t(a[2])}</b> and saves <b>${t(a[1]-a[2])}</b>.`,`Bei ya kawaida <b>${t(a[1])}</b>; kwenye programu <b>${t(a[2])}</b>.`),
   phone:ph(L('Book a service','Agiza huduma'),[[esc(a[0]),''],[L('Usual price','Bei ya kawaida'),`<s>${t(a[1])}</s>`],[L('Member price','Bei ya mwanachama'),t(a[2])]],L('Book and pay partner','Agiza na ulipe')),
   bt:L('The usual price','Bei ya kawaida'),total:a[1],segs:[['q',a[2],L('Member pays','Mwanachama analipa')],['s',a[1]-a[2],L('Member saves','Mwanachama anaokoa')]],glow:0},
  {lab:L('Partner paid','Mshirika amelipwa'),img:pi,who:L('The partner','Mshirika'),h:L('The partner gets a new paying customer','Mshirika anapata mteja mpya'),
   p:L(`The member pays the partner <b>${t(a[2])}</b> directly. The partner did not spend anything on advertising to win this customer, and Afya’s reminder makes sure the member turns up.`,`Mwanachama analipa mshirika <b>${t(a[2])}</b> moja kwa moja.`),
   phone:ph(L('Payment sent','Malipo yametumwa'),[[L('To','Kwa'),L('the partner','mshirika')],[esc(a[0]),t(a[2])],[L('Reminder','Ukumbusho'),L('day before','siku kabla')]],`${L('Paid','Imelipwa')} ✓`),
   bt:L('What the member paid','Alicholipa mwanachama'),total:a[2],segs:[['q',a[2],L('Received by the partner','Amepokea mshirika')]],glow:0},
  {lab:L('10% to Afya','10% kwa Afya'),img:'img/exterior.webp',who:'Afya Basics',h:L(`The partner pays Afya ${t(a[2]*C)}: a 10% booking commission`,`Mshirika analipa Afya ${t(a[2]*C)}`),
   p:L(`${t(a[2])} × 10% = <b>${t(a[2]*C)}</b>. The partner keeps <b>${t(a[2]*(1-C))}</b>. The commission is disclosed to members and never changes a medical referral.`,`${t(a[2])} × 10% = <b>${t(a[2]*C)}</b>; mshirika anabaki na <b>${t(a[2]*(1-C))}</b>.`),
   phone:ph(L('Afya · commission','Afya · kamisheni'),[[L('Booking','Agizo'),t(a[2])],[L('Commission 10%','Kamisheni 10%'),t(a[2]*C)],[L('Partner keeps','Mshirika anabaki'),t(a[2]*(1-C))]],L('Invoice sent','Ankara imetumwa'),1),
   bt:L('What the member paid','Alicholipa mwanachama'),total:a[2],segs:[['q',a[2]*(1-C),L('Partner keeps','Mshirika anabaki')],['k',a[2]*C,L('Afya commission','Kamisheni ya Afya')]],glow:1},
  {lab:L('On average','Kwa wastani'),img:'img/exterior.webp',who:'Afya Basics',h:L(`On average, ${t(r.comm)} per member per month`,`Kwa wastani ${t(r.comm)} kwa mwanachama`),
   p:L(`Not every member books an extra service every month. The plan assumes <b>1 in 5</b> do, at an average member price of <b>${t(r.addAvg)}</b>: ${t(r.addAvg)} × 10% ÷ 5 = <b>${t(r.comm)}</b> per member per month. This is stream 2.`,`Mpango unakadiria <b>1 kati ya 5</b>: ${t(r.addAvg)} × 10% ÷ 5 = <b>${t(r.comm)}</b>.`),
   phone:ph(L('Afya · stream 2','Afya · mto 2'),[[L('Members who book','Wanaoagiza'),'1 in 5'],[L('Average booking','Wastani'),t(r.addAvg)],[L('Per member / month','Kwa mwanachama'),t(r.comm)]],L('Stream 2 ✓','Mto 2 ✓'),1),
   people:1,bt:L('Five members in a month','Wanachama watano kwa mwezi'),total:r.addAvg*C,segs:[['k',r.comm,L('Average per member','Wastani kwa mwanachama')],['s',r.addAvg*C-r.comm,L('Spread over the other four','Imegawanywa kwa wanne')]],glow:1}]}}
const MF={};
function mfInit(id,r){const w=document.getElementById(id);if(!w)return;if(MF[id])MF[id].stop();
 const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;const st={s:1,i:0,play:!reduce,T:null,r,flip:0,started:0};MF[id]=st;
 const q=s=>w.querySelector(s),PLAY='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',PAUSE='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>',DUR=6000;
 const data=()=>mxSteps(st.r,st.s);
 const bar=x=>{const tr=q('[data-track]');if(tr.children.length!==x.segs.length){tr.innerHTML=x.segs.map(s=>`<div class="mx-seg ${s[0]}"></div>`).join('')}
  [...tr.children].forEach((e,k)=>{const s=x.segs[k];e.className='mx-seg '+s[0]+(x.dimFirst&&k===0?' dim':'')+(x.glow&&k===x.segs.length-1&&!(x.people)?' glow':'');e.textContent='';requestAnimationFrame(()=>{e.style.flexBasis=(s[1]/x.total*100)+'%';const pct=s[1]/x.total;e.textContent=pct>.12?tz(Math.round(s[1])):''})});
  q('[data-bt]').innerHTML=x.bt;q('[data-bv]').textContent=tz(Math.round(x.total));
  q('[data-leg]').innerHTML=x.segs.map((s,k)=>`<div class="${x.dimFirst&&k===0?'dim':''}"><i class="mx-seg ${s[0]}" style="flex:none"></i><span>${s[2]}</span><b>${tz(Math.round(s[1]))}</b></div>`).join('');
  q('[data-extra]').innerHTML=x.people?`<div class="mx-people">${[0,1,2,3,4].map(k=>`<span class="${k===0?'on':''}">${MX_P}${k===0?L('books','anaagiza'):L('no booking','hakuna')}</span>`).join('')}</div>`:''};
 const show=(i)=>{const D=data(),x=D.steps[i];st.i=i;q('[data-ttl]').innerHTML=D.ttl;
  const a=q(st.flip?'[data-i1]':'[data-i0]'),b=q(st.flip?'[data-i0]':'[data-i1]');if(!a.style.backgroundImage.includes(x.img)){b.style.backgroundImage=`url(${x.img})`;b.classList.remove('on');void b.offsetWidth;b.classList.add('on');a.classList.remove('on');st.flip^=1}
  q('[data-who]').innerHTML=x.who;q('[data-n]').innerHTML=`${L('Step','Hatua')} ${i+1} / ${D.steps.length}`;q('[data-h]').innerHTML=x.h;
  const pp=q('[data-p]');pp.innerHTML=x.p;pp.classList.remove('swap');void pp.offsetWidth;pp.classList.add('swap');
  const P=x.phone,ph=q('[data-ph]');q('[data-scr]').innerHTML=`<div class="app">${MX_LOGO}Afya</div><div class="t">${P.title}</div>${P.rows.map(r=>`<div class="r"><span>${r[0]}</span><b>${r[1]}</b></div>`).join('')}<div class="ok${P.gold?' g':''}">${P.ok}</div>`;ph.classList.remove('pop');void ph.offsetWidth;ph.classList.add('pop');
  bar(x);
  q('[data-steps]').querySelectorAll('button').forEach((b,k)=>{b.className=k<i?'done':k===i?'on':'';const em=b.querySelector('em');em.style.transition='none';em.style.width=k<i?'100%':'0';if(k===i&&st.play){void em.offsetWidth;em.style.transition=`width ${DUR}ms linear`;em.style.width='100%'}})};
 const build=()=>{const D=data();q('[data-steps]').innerHTML=D.steps.map(x=>`<button type="button"><i><em></em></i>${x.lab}</button>`).join('');q('[data-steps]').querySelectorAll('button').forEach((b,k)=>b.onclick=()=>{show(k);if(st.play)queue()})};
 const queue=()=>{clearTimeout(st.T);st.T=setTimeout(()=>{const n=data().steps.length;if(st.i<n-1){show(st.i+1);queue()}else{st.s=st.s==1?2:1;tabs();build();show(0);queue()}},DUR)};
 const tabs=()=>w.querySelectorAll('.mx-tabs button').forEach(b=>b.setAttribute('aria-selected',+b.dataset.s===st.s));
 w.querySelectorAll('.mx-tabs button').forEach(b=>b.onclick=()=>{st.s=+b.dataset.s;tabs();build();show(0);if(st.play)queue()});
 const pb=q('[data-pp]');pb.innerHTML=st.play?PAUSE:PLAY;pb.onclick=()=>{st.play=!st.play;pb.innerHTML=st.play?PAUSE:PLAY;pb.setAttribute('aria-label',st.play?'Pause':'Play');show(st.i);if(st.play)queue();else clearTimeout(st.T)};
 const sum=()=>{const r=st.r;q('[data-sum]').innerHTML=`<div><b>${tz(Math.round(r.margin))}</b><span>${L(`stream 1 · care-pack margin per member a month (${esc(r.box)})`,`mto 1 · faida ya kifurushi`)}</span></div><div><b>${tz(Math.round(r.comm))}</b><span>${L('stream 2 · average add-on commission per member a month','mto 2 · wastani wa kamisheni')}</span></div><div class="g"><b>${tz(Math.round(r.margin)+Math.round(r.comm))}</b><span>${L('together, per member a month, on top of the product margin','pamoja, kwa mwanachama kwa mwezi')}</span></div>`};
 st.stop=()=>clearTimeout(st.T);st.set=r2=>{st.r=r2;sum();build();show(0);if(st.play&&st.started)queue()};
 addEventListener('hashchange',()=>st.stop(),{once:true});
 sum();build();show(0);
 const io=new IntersectionObserver(es=>{if(es[0].isIntersecting&&!st.started){st.started=1;show(0);if(st.play)queue()}},{threshold:.3});io.observe(w)}

function mxPlainHTML(){const SV=M.services(),r=SV.rows.find(x=>x.k==='mama'),a=r.adds[0],t=n=>tz(Math.round(n));
 return `<div class="mxp">
 <div class="mxp-c"><small>${L('Stream 1 in one sentence · example: Mama na Mtoto','Mto 1 kwa sentensi moja · mfano: Mama na Mtoto')}</small><h5>${L('Afya buys care wholesale and includes it in the box','Afya inanunua huduma kwa jumla na kuiweka kwenye box')}</h5>
  <p>${L(`The member pays Afya a small extra each month for one service. Afya buys that service from a partner at a lower, prepaid price and keeps the difference. It works the way a shop buys bread from a bakery at one price and sells it at another.`,`Mwanachama analipa Afya kidogo zaidi kwa huduma moja. Afya inainunua kwa mshirika kwa bei ndogo na kubaki na tofauti, kama duka linavyonunua mkate kwa mwokaji.`)}</p>
  <div class="mxp-eq"><span>${L('Member pays','Mwanachama analipa')}<b>${t(r.fee)}</b></span><em>−</em><span>${L('Partner is paid','Mshirika analipwa')}<b>${t(r.cost)}</b></span><em>=</em><span class="g">${L('Afya keeps','Afya inabaki')}<b>${t(r.margin)}</b></span></div></div>
 <div class="mxp-c"><small>${L('Stream 2 in one sentence · example: postnatal physiotherapy','Mto 2 kwa sentensi moja · mfano: fiziotherapia baada ya kujifungua')}</small><h5>${L('Afya sends customers; partners pay a 10% finder’s fee','Afya inaleta wateja; washirika wanalipa 10%')}</h5>
  <p>${L(`When a member books an extra service through the Afya app, the member pays the partner directly and the partner pays Afya 10%, like an agent’s fee for bringing a customer. Afya holds no stock and pays nothing out.`,`Mwanachama akiagiza huduma ya ziada kupitia programu, analipa mshirika moja kwa moja na mshirika analipa Afya 10%, kama ada ya wakala.`)}</p>
  <div class="mxp-eq"><span>${L('Booking','Agizo')}<b>${t(a[2])}</b></span><em>×</em><span>10%<b>${L('commission','kamisheni')}</b></span><em>=</em><span class="g">${L('Afya earns','Afya inapata')}<b>${t(a[2]*IN.services.commission)}</b></span></div></div>
 <div class="mxp-c w"><small>${L('Why all three agree to it','Kwa nini wote watatu wanakubali')}</small>
  <div class="mxp-3"><div><b>${L('The family','Familia')}</b><span>${L(`gets the care without searching or paying at the door, and saves ${t(a[1]-a[2])} on every add-on`,`inapata huduma bila kutafuta, na kuokoa ${t(a[1]-a[2])} kwa kila huduma ya ziada`)}</span></div><div><b>${L('The partner','Mshirika')}</b><span>${L('gets prepaid, guaranteed bookings and new customers without advertising','anapata malipo ya mapema na wateja wapya bila matangazo')}</span></div><div><b>Afya Basics</b><span>${L('earns two new incomes and gives members one more reason to stay every month','inapata mapato mawili mapya na sababu ya wanachama kubaki')}</span></div></div></div>
 </div>`}
const MXPCSS=`.mxp{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:26px 0 0}.mxp-c{padding:20px 22px;border-radius:20px;border:1px solid var(--edge);background:var(--panel);min-width:0}.mxp-c.w{grid-column:1/-1}.mxp-c small{font:500 .6rem var(--f-hud);letter-spacing:.18em;text-transform:uppercase;color:var(--gold)}.mxp-c h5{margin:8px 0 0;font:700 1.08rem/1.25 var(--f-display)}.mxp-c p{margin:8px 0 0;font-size:.92rem;line-height:1.6;color:var(--ink2)}.mxp-eq{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:14px}.mxp-eq span{display:flex;flex-direction:column;padding:10px 14px;border-radius:12px;background:rgba(2,10,8,.6);border:1px solid var(--edge);font-size:.74rem;color:var(--ink3)}.mxp-eq span b{font:500 1.05rem var(--f-hud);color:var(--ink);margin-top:2px}.mxp-eq span.g{border-color:var(--gold)}.mxp-eq span.g b{color:var(--gold2)}.mxp-eq em{font:500 1.2rem var(--f-hud);font-style:normal;color:var(--ink3)}.mxp-3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:10px}.mxp-3 div{padding:14px 16px;border-radius:14px;background:rgba(2,10,8,.5);border:1px solid var(--edge)}.mxp-3 b{display:block;font:700 .95rem var(--f-display)}.mxp-3 span{display:block;margin-top:4px;font-size:.86rem;line-height:1.5;color:var(--ink2)}@media (max-width:820px){.mxp,.mxp-3{grid-template-columns:1fr}}`;

/* ---------- Fair deal + build-your-care chooser + partner onboarding (0.1 brief; section 5.2 goes deep) ---------- */
const frUp=n=>Math.ceil(n/500)*500,frR=n=>Math.round(n/500)*500;
const FRCSS=`
.fr{margin-top:26px;display:grid;gap:14px}
.fr-card{padding:22px 24px;border-radius:20px;border:1px solid var(--edge);background:var(--panel);min-width:0}
.fr-card>small{font:500 .6rem var(--f-hud);letter-spacing:.18em;text-transform:uppercase;color:var(--gold)}
.fr-card h5{margin:8px 0 0;font:700 1.12rem/1.25 var(--f-display)}
.fr-card>p{margin:8px 0 0;max-width:78ch;font-size:.94rem;line-height:1.6;color:var(--ink2)}
.fr-tw{overflow-x:auto;margin-top:14px;border-radius:14px;border:1px solid var(--edge)}
.fr-t{width:100%;border-collapse:collapse;font-size:.86rem;min-width:760px}
.fr-t th{padding:10px 12px;text-align:left;font:500 .58rem var(--f-hud);letter-spacing:.14em;text-transform:uppercase;color:var(--ink3);background:rgba(2,10,8,.6);border-bottom:1px solid var(--edge)}
.fr-t td{padding:12px;border-bottom:1px solid rgba(95,191,143,.08);color:var(--ink2);vertical-align:top}
.fr-t td.n{font-family:var(--f-hud);color:var(--ink);white-space:nowrap}
.fr-t td.m{color:#7fe3ff}.fr-t td.pt{color:var(--neon)}.fr-t td.af{color:var(--gold2)}
.fr-t tr:last-child td{border-bottom:0}
.fr-t td b{color:var(--ink)}
.fr-rule{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:14px}
.fr-rule div{padding:14px 16px;border-radius:14px;background:rgba(2,10,8,.55);border:1px solid var(--edge)}
.fr-rule b{display:block;font:700 .92rem var(--f-display)}
.fr-rule span{display:block;margin-top:4px;font-size:.84rem;line-height:1.5;color:var(--ink2)}
.fr-rule div:nth-child(1){border-top:3px solid #7fe3ff}.fr-rule div:nth-child(2){border-top:3px solid var(--neon)}.fr-rule div:nth-child(3){border-top:3px solid var(--gold)}
.fr-build{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:16px;margin-top:14px}
.fr-ch{display:flex;gap:6px;flex-wrap:wrap;margin-top:12px}
.fr-ch button{padding:8px 13px;border-radius:999px;border:1px solid var(--edge);background:rgba(2,10,8,.6);color:var(--ink2);font:600 .8rem var(--f-body);cursor:pointer}
.fr-ch button[aria-pressed="true"]{background:var(--neon);color:#02160f;border-color:transparent}
.fr-svc{display:grid;gap:8px}
.fr-s{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px 12px;align-items:center;padding:14px 16px;border-radius:14px;border:1px solid var(--edge);background:rgba(2,10,8,.5)}
.fr-s b{font:700 .92rem var(--f-body);color:var(--ink)}
.fr-s small{display:block;margin-top:2px;font-size:.78rem;color:var(--ink3)}
.fr-opt{display:flex;border-radius:10px;overflow:hidden;border:1px solid var(--edge)}
.fr-opt button{padding:7px 10px;border:0;background:transparent;color:var(--ink2);font:600 .74rem var(--f-body);cursor:pointer;white-space:nowrap}
.fr-opt button+button{border-left:1px solid var(--edge)}
.fr-opt button[aria-pressed="true"]{background:var(--gold);color:#1a1204}
.fr-s .px{grid-column:1/-1;display:flex;flex-wrap:wrap;gap:6px 14px;font:500 .74rem var(--f-hud);color:var(--ink3)}
.fr-s .px em{font-style:normal;color:var(--gold2)}
.fr-s.inc{border-color:rgba(242,201,107,.5);background:rgba(242,201,107,.06)}
.fr-res{padding:20px;border-radius:18px;border:1px solid var(--edge2);background:linear-gradient(150deg,rgba(242,201,107,.10),rgba(2,6,8,.6))}
.fr-res h6{margin:0 0 10px;font:500 .62rem var(--f-hud);letter-spacing:.16em;text-transform:uppercase;color:var(--ink3)}
.fr-res .big{font:500 1.6rem var(--f-hud);color:var(--gold2)}
.fr-res .sub{margin-top:2px;font-size:.82rem;color:var(--ink3)}
.fr-res .fr-three{display:grid;gap:8px;margin-top:16px}
.fr-res .fr-three div{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:2px 10px;padding:10px 12px;border-radius:12px;background:rgba(2,10,8,.6)}
.fr-res .fr-three span{font-size:.86rem;color:var(--ink2)}
.fr-res .fr-three b{font:500 .95rem var(--f-hud);text-align:right}
.fr-res .fr-three em{grid-column:1/-1;font-style:normal;font-size:.74rem;color:var(--ink3)}
.fr-res .m b{color:#7fe3ff}.fr-res .p b{color:var(--neon)}.fr-res .a b{color:var(--gold2)}
.fr-res .how{margin-top:14px;padding:12px 14px;border-radius:12px;border:1px dashed var(--edge);font-size:.84rem;line-height:1.5;color:var(--ink2)}
.fr-steps{list-style:none;margin:14px 0 0;padding:0;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px;counter-reset:fs}
.fr-steps li{position:relative;padding:16px;border-radius:14px;border:1px solid var(--edge);background:rgba(2,10,8,.5);counter-increment:fs;min-width:0}
.fr-steps li::before{content:counter(fs);display:grid;place-items:center;width:28px;height:28px;border-radius:50%;background:var(--gold);color:#1a1204;font:700 .78rem var(--f-hud);margin-bottom:10px}
.fr-steps b{display:block;font:700 .9rem var(--f-display)}
.fr-steps span{display:block;margin-top:6px;font-size:.82rem;line-height:1.5;color:var(--ink2)}
.fr-steps span em{font-style:normal;font-family:var(--f-hud);color:var(--gold2)}
@media (max-width:700px){.fr-s{grid-template-columns:1fr}.fr-opt{justify-self:start}}
.fr-card .fr-deep{margin-top:12px;font:500 .74rem var(--f-hud);color:var(--ink3)}
@media (max-width:1150px){.fr-build{grid-template-columns:1fr}.fr-steps{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:820px){.fr-rule,.fr-steps{grid-template-columns:1fr}}
`;
const PKR=w=>frUp(w*IN.services.member_rate*(1+IN.services.markup));/* one visit a month added to the package: partner 70%, member pays 70% × 1.25, rounded up to TSh 500 */
const ONE=w=>frR(w*IN.services.addon_rate);/* booked once: member pays 90% of walk-in */
function fairTable(r){const t=n=>tz(Math.round(n)),C=IN.services.commission,w=r.walk,a=r.adds[0];
 const inc=[r.fee,r.cost,r.margin],walkMo=w*r.visits/12;
 const pk=PKR(a[1]),pkP=frR(a[1]*IN.services.member_rate),one=ONE(a[1]);
 return `<div class="fr-tw"><table class="fr-t"><thead><tr><th>${L('Way to buy','Njia ya kununua')}</th><th>${L('Example','Mfano')}</th><th>${L('Normal price','Bei ya kawaida')}</th><th>${L('Member pays','Mwanachama analipa')}</th><th>${L('Partner receives','Mshirika anapokea')}</th><th>${L('Afya earns','Afya inapata')}</th><th>${L('Why each side gains','Kwa nini kila upande unafaidika')}</th></tr></thead><tbody>
 <tr><td><b>${L('1 · Included in the monthly package','1 · Ndani ya kifurushi cha mwezi')}</b></td><td>${esc(r.service)}, ${r.visits===12?L('monthly','kila mwezi'):`${r.visits} ${L('a year','kwa mwaka')}`}</td><td class="n">${t(walkMo)}/${L('mo','mw')}</td><td class="n m">${t(inc[0])}<br><small>${L('saves','anaokoa')} ${t(walkMo-inc[0])}</small></td><td class="n pt">${t(inc[1])}<br><small>70%</small></td><td class="n af">${t(inc[2])}</td><td>${L('Member: cheaper and never forgets. Partner: prepaid, guaranteed visits every month. Afya: a margin for organising and paying in advance.','Mwanachama: nafuu na hasahau. Mshirika: malipo ya mapema. Afya: faida ya kupanga.')}</td></tr>
 <tr><td><b>${L('2 · Added to the package, every month','2 · Kuongezwa kwenye kifurushi, kila mwezi')}</b></td><td>${esc(a[0])}, ${L('monthly','kila mwezi')}</td><td class="n">${t(a[1])}</td><td class="n m">${t(pk)}<br><small>${L('saves','anaokoa')} ${t(a[1]-pk)}</small></td><td class="n pt">${t(pkP)}<br><small>70%</small></td><td class="n af">${t(pk-pkP)}</td><td>${L('The same deal as the included service: the member chooses it, it is prepaid inside the package, so the partner gives the same 30% wholesale price.','Sawa na huduma iliyojumuishwa: imelipwa mapema, kwa hivyo mshirika anatoa bei ya jumla.')}</td></tr>
 <tr><td><b>${L('3 · Booked once, in the app or in store','3 · Kuagiza mara moja, kwenye programu au dukani')}</b></td><td>${esc(a[0])}, ${L('one visit','ziara moja')}</td><td class="n">${t(a[1])}</td><td class="n m">${t(one)}<br><small>${L('saves','anaokoa')} ${t(a[1]-one)}</small></td><td class="n pt">${t(one*(1-C))}<br><small>${Math.round((1-C)*IN.services.addon_rate*100)}%</small></td><td class="n af">${t(one*C)}<br><small>10%</small></td><td>${L('No commitment, so a smaller saving: 10%. The partner keeps 81% of its normal price and gets a customer it did not pay to find. Afya earns a 10% booking commission.','Bila ahadi, punguzo dogo: 10%. Mshirika anabaki na 81% na mteja mpya. Afya inapata kamisheni ya 10%.')}</td></tr>
 </tbody></table></div>`}
function fairHTML(id){addCSS('p0fr',FRCSS);const SV=M.services(),d=D('base'),m12=d.r.months[11],r=SV.rows.find(x=>x.k==='mama');
 const mamaN=Math.round(m12.members*r.mix),studio=mamaN*r.cost;
 return `<div class="fr" id="${id}">
 <div class="fr-card"><small>${L('The fair deal · three ways to buy any service','Makubaliano ya haki · njia tatu')}</small><h5>${L('Every service can be included, added to the package, or booked once. Each way is priced so the family, the partner and Afya all gain.','Kila huduma inaweza kujumuishwa, kuongezwa, au kuagizwa mara moja. Kila njia ina bei inayofaidisha wote watatu.')}</h5>
  <p>${L('The rule is simple: <b>the more certain the booking, the bigger the discount</b>. A partner gives its best price when Afya pays in advance for visits it can count on; for a single booking with no commitment, the discount is smaller and the partner pays Afya only when a customer actually arrives.','Kanuni ni rahisi: <b>uhakika zaidi, punguzo kubwa zaidi</b>. Mshirika anatoa bei bora Afya inapolipa mapema.')}</p>
  <div data-fairt>${fairTable(r)}</div>
  <div class="fr-rule"><div><b>${L('The family','Familia')}</b><span>${L('Always pays less than walking in: about 12% less in the package, 10% less for a one-off booking, with no searching, no queue and no payment at the door.','Daima analipa chini: takriban 12% kwenye kifurushi, 10% kwa mara moja.')}</span></div><div><b>${L('The partner','Mshirika')}</b><span>${L('Gives 30% off only for prepaid, guaranteed visits, and keeps 81% on one-off bookings. In return it gets full appointment books with no marketing cost and no unpaid bills.','Anatoa 30% kwa ziara za uhakika tu, na anabaki na 81% kwa za mara moja.')}</span></div><div><b>Afya Basics</b><span>${L('Earns about 20% of each package fee for organising, prepaying and checking quality, and 10% on one-off bookings, without holding stock or hiring therapists.','Inapata takriban 20% ya ada ya kifurushi na 10% kwa za mara moja.')}</span></div></div>
 </div>
 <div class="fr-card"><small>${L('Build your care · try it','Jenga huduma yako · jaribu')}</small><h5 data-bh></h5>
  <p>${L('Choose how to take each service. The same choices are made in the Afya app or at the store counter with an adviser; the price is the same both ways.','Chagua jinsi ya kupata kila huduma, kwenye programu au dukani; bei ni ileile.')}</p>
  <div class="fr-ch" role="group" aria-label="Where"><button type="button" data-ch="app" aria-pressed="true">${L('In the Afya app','Kwenye programu')}</button><button type="button" data-ch="store" aria-pressed="false">${L('At the store counter','Dukani')}</button></div>
  <div class="fr-build"><div class="fr-svc" data-svc></div><div class="fr-res" data-res></div></div></div>
 <div class="fr-card"><small>${L('How we bring partners on board','Jinsi tunavyowaleta washirika')}</small><h5>${L('Five steps, starting three months before the store opens','Hatua tano, miezi mitatu kabla ya kufungua')}</h5>
  <ol class="fr-steps">
   <li><b>${L('Shortlist','Orodha')}</b><span>${L('For each service, list 3 licensed providers near the flagship: baby-wellness studios, labs, dental clinics, physiotherapists, pest-control firms. Check licences first.','Kwa kila huduma, watoa huduma 3 wenye leseni karibu na duka.')}</span></li>
   <li><b>${L('Show them their numbers','Waonyeshe namba zao')}</b><span>${L(`Go with real volumes from the plan. Example: by month 12 about <em>${num(mamaN)}</em> Mama na Mtoto members means <em>${num(mamaN)}</em> baby massages a month, about <em>${F.auto(studio)}</em> a month paid in advance to the studio.`,`Mfano: wanachama <em>${num(mamaN)}</em> wa Mama na Mtoto = masaji <em>${num(mamaN)}</em> kwa mwezi, takriban <em>${F.auto(studio)}</em>.`)}</span></li>
   <li><b>${L('Agree the terms','Kubaliana masharti')}</b><span>${L('Written agreement: 70% of the normal price for package visits, 10% commission on one-off bookings, Afya pays within 7 days, partner sets its capacity, 30 days’ notice to leave.','Mkataba: 70% kwa ziara za kifurushi, 10% kwa za mara moja, malipo ndani ya siku 7.')}</span></li>
   <li><b>${L('Pilot for 3 months','Majaribio miezi 3')}</b><span>${L('Start with one partner per service. Members rate every visit; a partner below 4 stars for two months is replaced.','Anza na mshirika mmoja kwa kila huduma; tathmini kila ziara.')}</span></li>
   <li><b>${L('Grow together','Kua pamoja')}</b><span>${L('Partners are listed in the app and store with an Afya Partner sign. Every quarter, rates are reviewed against real volumes, so the deal stays fair as both sides grow.','Washirika wanaonekana kwenye programu na dukani; bei hupitiwa kila robo mwaka.')}</span></li>
  </ol>
  <p class="fr-deep">${L('This is the short version for the front door. Section 3.5 sets the services box by box; section 5.2 gives the full partner programme: contracts, quality checks, payment terms and negotiation.','Haya ni maelezo mafupi. Sehemu 3.5 na 5.2 zitaeleza kwa kina.')}</p></div>
 </div>`}
const FR={};
function fairInit(id,r){const w=document.getElementById(id);if(!w)return;const st=FR[id]||(FR[id]={ch:'app'});st.r=r;st.sel=st.sel&&st.k===r.k?st.sel:{};st.k=r.k;
 const q=s=>w.querySelector(s),t=n=>tz(Math.round(n)),C=IN.services.commission;
 q('[data-fairt]').innerHTML=fairTable(r);
 q('[data-bh]').innerHTML=L(`${esc(r.box)}: choose your services`,`${esc(r.box)}: chagua huduma zako`);
 const svc=[{k:'inc',n:r.service,walk:r.walk,visits:r.visits,inc:1}].concat(r.adds.map((a,i)=>({k:'a'+i,n:a[0],walk:a[1]})));
 const paint=()=>{q('[data-svc]').innerHTML=svc.map(s=>{if(s.inc)return `<div class="fr-s inc"><div><b>${esc(s.n)}</b><small>${L('Included in the package','Imejumuishwa')} · ${s.visits===12?L('monthly','kila mwezi'):`${s.visits} ${L('a year','kwa mwaka')}`}</small></div><span class="fr-opt"><button type="button" aria-pressed="true" disabled>${L('Included','Imejumuishwa')}</button></span><div class="px">${L('Normal','Kawaida')} ${t(s.walk)} · ${L('in package','kifurushini')} <em>${t(r.fee)}/${L('mo','mw')}</em></div></div>`;
   const v=st.sel[s.k]||'none';return `<div class="fr-s"><div><b>${esc(s.n)}</b><small>${L('Optional','Hiari')}</small></div><span class="fr-opt" data-k="${s.k}">${[['none',L('No','Hapana')],['month',L('Add monthly','Ongeza kila mwezi')],['once',L('Book once','Mara moja')]].map(o=>`<button type="button" data-v="${o[0]}" aria-pressed="${v===o[0]}">${o[1]}</button>`).join('')}</span><div class="px">${L('Normal','Kawaida')} ${t(s.walk)} · ${L('monthly in package','kila mwezi')} <em>${t(PKR(s.walk))}</em> · ${L('once','mara moja')} <em>${t(ONE(s.walk))}</em></div></div>`}).join('');
  q('[data-svc]').querySelectorAll('.fr-opt[data-k] button').forEach(b=>b.onclick=()=>{st.sel[b.parentElement.dataset.k]=b.dataset.v;paint()});
  let pkg=r.box_price+r.fee,once=0,walk=r.walk*r.visits/12,partner=r.cost,afya=r.margin;
  svc.filter(s=>!s.inc).forEach(s=>{const v=st.sel[s.k];if(v==='month'){const p=PKR(s.walk),pp=frR(s.walk*IN.services.member_rate);pkg+=p;walk+=s.walk;partner+=pp;afya+=p-pp}if(v==='once'){const p=ONE(s.walk);once+=p;walk+=s.walk;partner+=p*(1-C);afya+=p*C}});
  const paid=pkg-r.box_price+once;
  q('[data-res]').innerHTML=`<h6>${L('Your monthly package','Kifurushi chako cha mwezi')}</h6><div class="big">${t(pkg)}</div><div class="sub">${L(`products ${t(r.box_price)} + services ${t(pkg-r.box_price)}`,`bidhaa ${t(r.box_price)} + huduma ${t(pkg-r.box_price)}`)}${once?` · ${L('plus one-off bookings','pamoja na za mara moja')} ${t(once)}`:''}</div>
   <div class="fr-three"><div class="m"><span>${L('The family saves on services','Familia inaokoa')}</span><b>${t(walk-paid)}</b><em>${L(`pays ${t(paid)} instead of ${t(walk)} at normal prices`,`inalipa ${t(paid)} badala ya ${t(walk)}`)}</em></div>
   <div class="p"><span>${L('Partners receive','Washirika wanapokea')}</span><b>${t(partner)}</b><em>${L('prepaid for package visits, paid within 7 days','imelipwa mapema')}</em></div>
   <div class="a"><span>${L('Afya earns on services','Afya inapata')}</span><b>${t(afya)}</b><em>${L('package margin plus 10% on one-off bookings','faida ya kifurushi na 10%')}</em></div></div>
   <div class="how">${st.ch==='app'?L('In the app: tap the service, choose “Add monthly” or “Book once”, pick a time from the partner’s calendar, approve the mobile-money push. A reminder arrives the day before.','Kwenye programu: gusa huduma, chagua, chagua muda, thibitisha malipo. Ukumbusho siku moja kabla.'):L('At the store: the adviser at the counter opens the same booking screen on the handheld, books the time with you, and you pay by mobile money or card. You leave with an SMS confirmation.','Dukani: mshauri anaagiza kwa kifaa chake, unalipa kwa pesa ya simu, unapata SMS.')}</div>`};
 w.querySelectorAll('[data-ch]').forEach(b=>b.onclick=()=>{st.ch=b.dataset.ch;w.querySelectorAll('[data-ch]').forEach(x=>x.setAttribute('aria-pressed',x===b));paint()});
 paint()}

/* ---------- Afya Kazini: every trade, what goes wrong without it, what we keep ready ---------- */
const KVCSS=`.kg{margin:0 0 22px}
.kg-hd{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-end;gap:10px;margin-bottom:12px}
.kg-hd small{font:500 .6rem var(--f-hud);letter-spacing:.18em;text-transform:uppercase;color:var(--gold)}
.kg-hd h5{margin:6px 0 0;font:700 1.12rem var(--f-display)}
.kg-hd p{margin:0;font-size:.84rem;color:var(--ink3);max-width:46ch}
.kg-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
.kg-c{display:flex;flex-direction:column;border-radius:20px;overflow:hidden;border:1px solid var(--edge);background:var(--panel);min-width:0;cursor:pointer;text-align:left;padding:0;color:inherit;font:inherit;transition:border-color .3s,transform .3s,box-shadow .3s}
.kg-c:hover,.kg-c.on{border-color:var(--gold);transform:translateY(-3px);box-shadow:0 24px 50px -28px rgba(242,201,107,.6)}
.kg-ph{position:relative;aspect-ratio:16/10;overflow:hidden;background:#04100c}
.kg-ph img{width:100%;height:100%;object-fit:cover;display:block;transition:transform 1.2s cubic-bezier(.2,.8,.2,1)}
.kg-c:hover .kg-ph img{transform:scale(1.06)}
.kg-ph::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(2,8,6,.85),rgba(2,8,6,0) 55%)}
.kg-tag{position:absolute;z-index:2;left:14px;bottom:12px;right:14px;display:flex;justify-content:space-between;align-items:flex-end;gap:8px}
.kg-tag b{font:700 1.02rem var(--f-display);color:#fff}
.kg-tag small{display:block;font:500 .74rem var(--f-body);color:rgba(255,255,255,.8)}
.kg-tag span{padding:5px 10px;border-radius:999px;background:var(--gold);color:#1a1204;font:600 .74rem var(--f-hud);white-space:nowrap}
.kg-b{display:grid;gap:10px;padding:16px}
.kg-b div{display:grid;grid-template-columns:22px minmax(0,1fr);gap:10px;font-size:.86rem;line-height:1.5;color:var(--ink2)}
.kg-b i{display:grid;place-items:center;width:22px;height:22px;border-radius:50%;font:700 .72rem var(--f-hud);font-style:normal}
.kg-b .no i{background:rgba(255,123,107,.18);color:#ffb3a3}.kg-b .yes i{background:rgba(95,191,143,.16);color:var(--neon)}
.kg-b em{font-style:normal;display:block;font:600 .66rem var(--f-hud);letter-spacing:.12em;text-transform:uppercase;margin-bottom:2px}
.kg-b .no em{color:#ffb3a3}.kg-b .yes em{color:var(--neon)}
.kg-cpr{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.2fr);margin-top:14px;border-radius:20px;overflow:hidden;border:1px solid var(--edge2);background:linear-gradient(150deg,rgba(242,201,107,.10),rgba(2,6,8,.6))}
.kg-cpr img{width:100%;height:100%;min-height:220px;object-fit:cover;display:block}
.kg-cpr div{padding:22px 24px}
.kg-cpr small{font:500 .6rem var(--f-hud);letter-spacing:.18em;text-transform:uppercase;color:var(--gold)}
.kg-cpr h5{margin:8px 0 0;font:700 1.15rem/1.25 var(--f-display)}
.kg-cpr p{margin:8px 0 0;font-size:.9rem;line-height:1.6;color:var(--ink2)}
.kg-note{margin-top:10px;font:500 .7rem var(--f-hud);color:var(--ink3)}
@media (max-width:1150px){.kg-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:700px){.kg-grid,.kg-cpr{grid-template-columns:1fr}}`;
const KV=[['duka','kz-duka',L('Shops and kiosks','Maduka na vibanda'),L('Cuts from boxes and tins, a first-aid box nobody refilled, no soap for staff, a dusty counter customers notice.','Majeraha ya masanduku, sanduku tupu, hakuna sabuni, kaunta yenye vumbi.'),L('First-aid box refilled every quarter, hand wash, sanitiser for the counter, disinfectant and cleaning supplies on a fixed day.','Sanduku linajazwa kila robo mwaka, sabuni, vitakasa mikono na vifaa vya usafi.')],
 ['chakula','kz-chakula',L('Restaurants and food stalls','Migahawa na vibanda vya chakula'),L('Bare hands on food, burns from hot oil with nothing to treat them, flies and pests. One sick customer can close the business.','Mikono mitupu kwenye chakula, kuungua bila dawa, nzi na wadudu.'),L('Gloves, kitchen wipes, burn gel and hand wash every month, plus pest control twice a year by a partner company.','Glavu, vitambaa, dawa ya kuungua na sabuni kila mwezi, na kudhibiti wadudu mara mbili kwa mwaka.')],
 ['saluni','kz-saluni',L('Salons and barbershops','Saluni na vinyozi'),L('Clippers and combs used on client after client without cleaning, small nicks with no plaster, skin infections passed on.','Mashine na vitana bila kusafishwa, vijeraha bila plasta, maambukizi ya ngozi.'),L('Gloves, disinfecting wipes and blade oil every month, a full first-aid box, and the Afya Kazini sticker clients can see.','Glavu, vitambaa vya kuua vijidudu na mafuta ya mashine kila mwezi, na kibandiko cha Afya Kazini.')],
 ['karakana','kz-karakana',L('Workshops and building sites','Karakana na maeneo ya ujenzi'),L('Metal splinters in the eye, burns from welding, loud machines with no ear protection, and no trained first aider on site.','Vipande vya chuma machoni, kuungua, kelele bila kinga ya masikio.'),L('Eye-wash, gloves, burn gel and ear plugs every month, a refilled first-aid box and a trained first aider.','Kuosha macho, glavu, dawa ya kuungua na kinga za masikio kila mwezi.')],
 ['ofisi','kz-ofisi',L('Offices and teams of 10 or more','Ofisi na timu za watu 10+'),L('The law asks for a first-aid box and two trained first aiders for 10–50 staff; most offices have neither, and nobody checks staff blood pressure.','Sheria inataka sanduku na watoa huduma wawili kwa wafanyakazi 10–50.'),L('Afya Ofisi: the box kept full, two first-aid seats a year, and a monthly staff BP and BMI screening day at the workplace.','Afya Ofisi: sanduku limejaa, mafunzo kwa wawili, na siku ya kupima wafanyakazi kila mwezi.')]];
function kvHTML(id){addCSS('p0kv',KVCSS);const KZ=M.kazini();
 return `<div class="kg" id="${id}"><div class="kg-hd"><div><small>${L('Afya Kazini at work','Afya Kazini kazini')}</small><h5>${L('Every trade has its own risks. Kazini keeps each one ready.','Kila kazi ina hatari zake. Kazini inaiandaa kila moja.')}</h5></div><p>${L('Tap a trade to see its monthly kit and price below.','Gusa kazi kuona vifaa na bei hapa chini.')}</p></div>
 <div class="kg-grid">${KV.map((k,i)=>{const r=KZ.rows.find(x=>x.k===k[0]);const pr=k[0]==='ofisi'?tz(KZOFF.m1)+' / 25':tz(r.price);return `<button type="button" class="kg-c${i?'':' on'}" data-k="${k[0]}"><div class="kg-ph"><img src="img/${k[1]}.webp" alt="" loading="lazy"><div class="kg-tag"><div><b>${k[2]}</b><small>${L('Photo · Pexels','Picha · Pexels')}</small></div><span>${pr}/${L('mo','mw')}</span></div></div>
  <div class="kg-b"><div class="no"><i>!</i><span><em>${L('Without Kazini','Bila Kazini')}</em>${k[3]}</span></div><div class="yes"><i>✓</i><span><em>${L('With Kazini','Na Kazini')}</em>${k[4]}</span></div></div></button>`}).join('')}</div>
 <div class="kg-cpr"><img src="img/kz-cpr.webp" alt="Photo: hands practising CPR on a training manikin (Pexels)" loading="lazy"><div><small>${L('Included for every business','Kwa kila biashara')}</small><h5>${L('Someone at work who knows what to do','Mtu kazini anayejua la kufanya')}</h5><p>${L('Every Afya Kazini business gets an accredited first-aid training seat each year from a partner trainer, and offices of 10–50 staff get two, as the OSH Rules 2015 require. Combined with a box that is refilled before it runs out, the first minutes after an accident are handled properly.','Kila biashara inapata nafasi ya mafunzo ya huduma ya kwanza kila mwaka, na ofisi za wafanyakazi 10–50 zinapata mbili, kama Kanuni za OSH 2015 zinavyotaka.')}</p></div></div>
 <p class="kg-note">${L('Real photos of workplaces from Pexels, chosen to show each trade; not Afya customers’ premises.','Picha halisi za maeneo ya kazi kutoka Pexels.')}</p></div>`}
function kvInit(id){const w=document.getElementById(id);if(!w)return;w.querySelectorAll('.kg-c').forEach(c=>c.onclick=()=>{w.querySelectorAll('.kg-c').forEach(x=>x.classList.toggle('on',x===c));
 const k=c.dataset.k,host=w.closest('.mod01')||document;const b=host.querySelector(`.ph-pick button[data-k="${k}"]`);if(b){b.click();b.scrollIntoView({behavior:'smooth',block:'center'})}else{const o=host.querySelector('[data-off]');if(o)o.scrollIntoView({behavior:'smooth',block:'center'})}})}

function render01(s,p,pv,nx){REFRESH();addCSS('part0',CSS);addCSS('p0v',CSS2);p0kon();const d=D(hSc),sc=SCENES(d),b=D('base');
 const HS=[[55,62,['Signature counter','Kaunta kuu'],['A curved oak-and-white counter where health advisers give advice, open memberships and take mobile-money payments in one place.','Kaunta ya mbao na rangi nyeupe ambapo washauri wa afya wanatoa ushauri, wanasajili wanachama na kupokea malipo ya pesa ya simu mahali pamoja.']],[64,30,['Package and ad screens','Skrini za vifurushi na matangazo'],['Digital screens show the Afya Box packages with prices and the free Afya Check, so customers can read the offer without waiting for staff.','Skrini za kidijitali zinaonyesha vifurushi vya Afya Box pamoja na bei na Afya Check ya bure, ili wateja wasome huduma bila kusubiri wafanyakazi.']],[23,40,['Private consultation room','Chumba cha ushauri binafsi'],['A frosted-glass room for private advice, partner services and follow-ups, like a small clinic inside the shop.','Chumba cha kioo kisichoonyesha ndani kwa ushauri binafsi, huduma za washirika na ufuatiliaji, kama kliniki ndogo ndani ya duka.']],[33,20,['Curated display niches','Rafu maalum zenye mwanga'],['Registered products only, 4–5 brands per need, in lit oak niches with digital price labels that match the app.','Bidhaa zilizosajiliwa pekee, chapa 4–5 kwa kila hitaji, kwenye rafu za mbao zenye mwanga na lebo za bei za kidijitali zinazolingana na programu.']],[87,62,['Free Afya Check kiosk','Kiosk cha Afya Check cha bure'],['A quick check of blood pressure, pulse and oxygen takes about 50 seconds. The full check gives fifteen free measurements in about four minutes, including weight and body fat.','Kipimo cha haraka cha shinikizo la damu, mapigo ya moyo na oksijeni kinachukua takriban sekunde 50. Kipimo kamili kinatoa vipimo kumi na tano vya bure kwa takriban dakika nne, ikiwemo uzito na mafuta mwilini.']],[16,72,['Afya Box table','Meza ya Afya Box'],['The monthly boxes on show, so customers see exactly what each package holds before they join.','Box za kila mwezi zinaonyeshwa, ili wateja waone kilichomo kwenye kila kifurushi kabla ya kujiunga.']]];
 const mods=[
 ['Watch it work · the video library',vlibHTML(),'p0film'],
 ['Find your way · reading paths and search',`<p class="s11lead">${L('Three reading paths, by time available: one minute, ten minutes, or full due diligence. Ticks record progress as you go. The search covers all 36 sections, every heading and every answer.','Njia tatu za kusoma, kulingana na muda ulionao: dakika moja, dakika kumi, au uchunguzi kamili. Alama zinarekodi maendeleo unavyoendelea. Utafutaji unagusa sehemu zote 36, kila kichwa na kila jibu.')}</p><div class="p0v-way">${pathHTML()}${searchHTML()}</div>`,'p0way'],
 ['The problem in one line',`<p class="oneline">${L('Care moved home, but shopping for it is still <b>scattered, slow, untrusted and unplanned</b>, and family abroad cannot be sure their money becomes care.','Huduma imehamia nyumbani, lakini ununuzi wake bado <b>umetawanyika, ni wa polepole, hauaminiki na haupangwi</b>, na familia iliyo nje haiwezi kuwa na uhakika kwamba pesa zao zinakuwa huduma.')}</p>
  <div class="p0-pains">${SIG.map((x,i)=>`<span style="--c:${x[1]}"><i></i>${L(x[0],['Imetawanyika','Polepole','Haiaminiki','Haipangwi','Mbali na familia'][i]||x[0])}</span>`).join('')}</div>
  <div class="p0-facts">
   <div style="--c:#ff9b87"><b>23.1%</b><p>${L('of adults aged 18–69 in Tanzania have raised blood pressure (2023 national survey)','ya watu wazima wa miaka 18–69 Tanzania wana shinikizo la damu (utafiti wa kitaifa 2023)')} ${c(5)}</p></div>
   <div style="--c:#ffb36b"><b>2.2%</b><p>${L('of people with high blood pressure had it under control, and only 17.6% knew they had it (2012 survey, the latest to measure this)','ya wenye shinikizo la damu walilidhibiti, na ni 17.6% tu waliojua (utafiti wa 2012, wa mwisho kupima hili)')} ${c(1)}</p></div>
   <div style="--c:#ff7b9c"><b>1 in 10</b><p>${L('medical products in low- and middle-income countries is substandard or falsified','ya bidhaa za tiba katika nchi za kipato cha chini na kati ni duni au bandia')} ${c(2)}</p></div>
   <div style="--c:#f2c96b"><b>5.38M</b><p>${L('people in Dar es Salaam region, our first market (5,383,728, 2022 census)','watu katika mkoa wa Dar es Salaam, soko letu la kwanza (sensa ya 2022)')} ${c(3)}</p></div>
   <div style="--c:#c9b8ff"><b>TSh 3.3T</b><p>${L('sent home by Tanzanians abroad in 2024/25 (Sh3.313 trillion)','zilizotumwa nyumbani na Watanzania walio nje 2024/25')} ${c(4)}</p></div>
  </div><p class="note">${L('Blood-pressure figures are from the 2012 national STEPS survey, the latest WHO country profile · full evidence in section 1.2','Takwimu za shinikizo la damu ni za utafiti wa kitaifa wa STEPS 2012 · ushahidi kamili sehemu 1.2')}</p>
  ${p0kmos([['real-p-mama-load','Concept image: a mother with her baby tied on her back, carrying a heavy load on her head',L('Today · “Imekwisha” — it is finished','Leo · “Imekwisha”'),L('A mother carries her baby across town for nappies, wipes and iron tablets. The first pharmacy is out of the size she needs. She cannot tell which brands are registered, and nobody remembers what she bought last month.','Mama anambeba mtoto wake mjini kote kutafuta nepi, wipes na vidonge vya madini ya chuma. Duka la kwanza halina saizi anayohitaji. Hawezi kujua chapa zipi zimesajiliwa, na hakuna anayekumbuka alichonunua mwezi uliopita.'),'50% 40%'],['real-p-crowd','Concept image: a crowd pressing around one busy counter, everyone waiting their turn',L('A queue just to ask a question','Foleni ili tu kuuliza swali'),L('Advice and payment happen at the same counter, so a two-minute question costs twenty minutes.','Ushauri na malipo vinafanyika kaunta moja, hivyo swali la dakika mbili linagharimu dakika ishirini.'),'50% 40%'],['real-p-sold-out','Concept image: half-empty shop shelves with a sold-out notice',L('Three shops for one baby','Maduka matatu kwa mtoto mmoja'),L('Every month starts the hunt again, because nobody plans the household’s supplies.','Kila mwezi msako unaanza upya, kwa sababu hakuna anayepanga mahitaji ya nyumba.'),'50% 55%']])}`],
 ['The one-page investor summary',`<p class="s11lead">${L('The whole case on one A4 page: the problem, the answer, five numbers in three scenarios, the ask, the investor’s terms and the main risks. Print it, save it as PDF or paste it into an email. Every number is computed live from the master model.','Hoja nzima kwenye ukurasa mmoja wa A4: tatizo, jibu, namba tano katika hali tatu, ombi, masharti ya mwekezaji na hatari kuu. Ichapishe, ihifadhi kama PDF au ibandike kwenye barua pepe. Kila namba inahesabiwa moja kwa moja kutoka modeli kuu.')}</p>
  <div class="p0v-sumw">${sumHTML()}<div class="p0v-sumside"><button type="button" class="p0-ib pri" id="p0print1">${I.print}${L('Print / Save as PDF','Chapisha / Hifadhi PDF')}</button><button type="button" class="p0-ib" id="p0copy">${I.copy}${L('Copy as text','Nakili maandishi')}</button><span class="ok" id="p0copyok" aria-live="polite"></span><p>${L('Prints on clean white A4, in the language you have chosen above. In the print dialog choose “Save as PDF” to keep a file. The Canva one-pager follows once the brand kit is set up.','Inachapishwa kwenye A4 nyeupe, kwa lugha uliyochagua. Kwenye dirisha la kuchapisha chagua “Save as PDF” kuhifadhi faili.')}</p></div></div>`,'p0sumx'],
 ['Our answer · one store, one membership, one app',`<p class="s11lead">${L('Afya Basics sells what a household needs to look after its health at home: a selected range, one price in every channel, and a purchase that takes minutes. Three parts share one account, one price list and one stock system.','Afya Basics inauza kile ambacho kaya inahitaji kutunza afya nyumbani: bidhaa zilizochaguliwa, bei moja kila mahali, na ununuzi unaochukua dakika chache. Sehemu tatu zinatumia akaunti moja, orodha moja ya bei na mfumo mmoja wa stoo.')}</p>
  <div class="p0-tri">
   <article class="p0-tc"><div class="p0-tv"><div class="ph" style="${bgi('exterior')}" role="img" aria-label="Concept image of the Afya Basics street-front store: solid walls, barred display windows, open entrance"></div><span class="w3tag">${L('Concept image','Picha ya dhana')}</span></div>
    <div class="p0-tb"><small>${L('The store','Duka')}</small><h3>${L('A secure, open street-front flagship','Duka kuu salama na wazi la mbele ya barabara')}</h3><p>${L('One floor in Dar es Salaam, organised by life situation rather than by brand, with a free check at the door.','Ghorofa moja Dar es Salaam, limepangwa kwa hali ya maisha badala ya chapa, na kipimo cha bure mlangoni.')}</p><ul><li>${L(`Six Care Zones, about ${IN.product_families} product families`,`Kanda sita, familia ${IN.product_families} za bidhaa`)}</li><li>${L(`Registered products only, ${IN.brands_per_item} brands per item`,`Bidhaa zilizosajiliwa pekee, chapa ${IN.brands_per_item}`)}</li><li>${L('Find and pay in under 3 minutes','Pata na ulipe chini ya dakika 3')}</li></ul></div></article>
   <article class="p0-tc"><div class="p0-tv"><div class="ph" style="${bgi('boxdoor')}" role="img" aria-label="Concept image of a closed royal-green Afya Box handed over at a doorstep"></div><span class="w3tag">${L('Concept image','Picha ya dhana')}</span></div>
    <div class="p0-tb"><small>${L('The membership','Uanachama')}</small><h3>${L('The monthly Afya Box','Afya Box ya kila mwezi')}</h3><p>${L(`${AFYA_PKG.count().home} household boxes for every stage of life, from pregnancy and babies to teens, women (Afya Glow, Afya Siku), men (Afya Men), the home, older parents and long-term conditions, plus Afya Kazini kits for businesses and hotels. Plans of 1, 6 or 12 months.`,`Box ${AFYA_PKG.count().home} za familia kwa kila hatua ya maisha, kuanzia ujauzito na watoto hadi vijana, wanawake (Afya Glow, Afya Siku), wanaume (Afya Men), nyumbani, wazazi wazee na magonjwa ya muda mrefu, pamoja na vifurushi vya Afya Kazini kwa biashara na hoteli. Mipango ya mwezi 1, 6 au 12.`)}</p><ul><li>${L('Swap brands up to 12 days before month end','Badilisha chapa hadi siku 12 kabla ya mwisho wa mwezi')}</li><li>${L('Renews automatically each month','Hujirudia yenyewe kila mwezi')}</li><li>${L('Box and delivery charged at cost inside the price','Box na usafirishaji kwa gharama halisi ndani ya bei')}</li></ul></div></article>
   <article class="p0-tc"><div class="p0-tv" style="background:radial-gradient(circle at 50% 30%,rgba(242,201,107,.16),transparent 60%),linear-gradient(160deg,#0a1f18,#030b08)">${PHONE}<span class="w3tag">${L('Mock-up','Mchoro')}</span></div>
    <div class="p0-tb"><small>${L('The digital layer','Sehemu ya kidijitali')}</small><h3>${L('App and WhatsApp','Programu na WhatsApp')}</h3><p>${L('Reorder in under 30 seconds, pay by mobile money, track the box, and let a son or daughter abroad pay for a parent’s care directly.','Agiza tena chini ya sekunde 30, lipa kwa pesa ya simu, fuatilia box, na mwana au binti aliye nje alipie huduma ya mzazi moja kwa moja.')}</p><ul><li>${L('One account, one price, every channel','Akaunti moja, bei moja, kila njia')}</li><li>${L('Same-day delivery in Dar before 15:00','Usafirishaji siku hiyo kabla ya 15:00')}</li><li>${L('Diaspora gift in under 2 minutes','Zawadi ya diaspora chini ya dakika 2')}</li></ul></div></article>
  </div>
  <div class="p0-pkg" style="margin-top:26px"><small style="display:block;font:600 .7rem var(--f-hud,monospace);letter-spacing:.16em;text-transform:uppercase;color:#d8b46a;margin-bottom:6px">${L('The full package family','Familia nzima ya vifurushi')}</small>${AFYA_PKG.html(L,'compact')}<p style="margin:10px 0 0;font-size:.82rem;color:rgba(244,251,247,.6)">${L('Every package, its contents and its price are set out in sections 3.4 and 3.5.','Kila kifurushi, vilivyomo na bei yake vimeelezwa katika sehemu 3.4 na 3.5.')}</p></div>`],
 ['How it works · from a reading to the doorstep',`<p class="s11lead">${L('One visit shows the whole model. Each step has a time target, a responsible person and the tool they use.','Ziara moja inaonyesha mfumo mzima. Kila hatua ina lengo la muda, mtu anayehusika na chombo anachotumia.')}</p>
  <div class="p0-path">${[['real-health-check','Concept image: a health worker checking an older woman’s blood pressure','50% 35%',IN.check.quick_seconds+' s',['Check','Pima'],['Quick check at the entrance: blood pressure, pulse and oxygen in about 50 seconds, on screen and by SMS. The full 15-measurement check takes about 4 minutes. If a reading needs a doctor, the adviser says so and names a clinic.','Kipimo cha haraka mlangoni: shinikizo la damu, mapigo ya moyo na oksijeni kwa takriban sekunde 50, kwenye skrini na kwa SMS. Kipimo kamili cha vipimo 15 kinachukua takriban dakika 4. Kipimo kikihitaji daktari, mshauri anasema hivyo na kutaja kliniki.'],['Customer · check kiosk','Mteja · kiosk']],
   ['advice','Concept image: an adviser comparing two blood-pressure monitors for a pregnant woman','50% 35%','&lt;1 min',['Choose','Chagua'],['Walk to the right Care Zone; a “best for” card and '+IN.brands_per_item+' registered brands at one price. Example: two upper-arm monitors side by side, each labelled for who it suits.','Nenda Kanda sahihi; kadi ya “inafaa kwa” na chapa '+IN.brands_per_item+' zilizosajiliwa kwa bei moja.'],['Health adviser · find-it screen','Mshauri wa afya · skrini']],
   ['real-phone-pay','Concept image: a man paying by phone at a shop','50% 40%','&lt;30 s',['Pay','Lipa'],['Scan-and-go, self-checkout or the adviser’s handheld. Mobile money, card or cash; the TRA receipt arrives by SMS or WhatsApp.','Scan-and-go, kujilipia au kifaa cha mshauri. Pesa ya simu, kadi au taslimu; risiti ya TRA kwa SMS au WhatsApp.'],['Till · mobile-money push','Mashine · ombi la pesa ya simu']],
   ['hub','Concept image: packing hub staff packing closed green Afya boxes','50% 40%','0 clicks',['Join the box','Jiunge na box'],['Save the basket as a monthly Afya Box. It renews itself; a reminder comes 12 days before month end so she can swap a brand or a nappy size.','Hifadhi kikapu kama Afya Box ya kila mwezi. Inajirudia; ukumbusho unakuja siku 12 kabla ya mwisho wa mwezi.'],['Member adviser · Afya platform','Mshauri wa wanachama · jukwaa la Afya']],
   ['real-delivery','Concept image: an Afya rider on an electric motorbike, seen from behind','50% 45%',L('Same day','Siku hiyo'),['Delivered home','Imefika nyumbani'],['Orders before 15:00 reach homes in Dar es Salaam the same day, with photo or code proof at the door. '+(ISL()?'Partner riders deliver, paid per order.':'The store’s two electric motorbikes deliver.'),'Oda kabla ya saa 9:00 mchana (15:00) zinafika nyumbani Dar es Salaam siku hiyohiyo, na uthibitisho wa picha au namba mlangoni. '+(ISL()?'Wasafirishaji washirika wanapeleka, wakilipwa kwa kila oda.':'Pikipiki mbili za umeme za duka zinapeleka.')],['Picker · rider app','Mfungashaji · programu ya msafirishaji']]].map((x,i)=>`<div class="p0-st0"><div class="ph">${p0kimg(x[0],x[1],x[2])}<span class="no">0${i+1}</span></div><div class="bd"><span class="t">${x[3]}</span><b>${L(x[4][0],x[4][1])}</b><p>${L(x[5][0],x[5][1])}</p><em>${L(x[6][0],x[6][1])}</em></div></div>`).join('')}
  </div>`],
 ['Services in every box · Afya Huduma and our partners',hudumaHTML('p0h1'),'p0huduma'],
 ['Afya Kazini · the membership for small and big businesses',kaziniHTML('p0k1'),'p0kazini'],
 ['The experience · six moments, photographed',`<p class="s11lead">${L('Six moments from one month in Dar es Salaam, as the customer experiences them. All images are concept images, all households are illustrative, and every time shown is a service target.','Matukio sita ya mwezi mmoja Dar es Salaam, kama mteja anavyoyapitia. Picha zote ni picha za dhana, kaya zote ni za mfano, na kila muda unaoonyeshwa ni lengo la huduma.')}</p>
  ${momentsHTML()}
  <div class="p0-exp" style="margin-top:22px"><figure class="shot" style="position:relative"><img src="img/interior.webp" width="1680" height="944" loading="lazy" alt="Concept image of the Afya Basics interior: a curved oak-and-white signature counter, digital screens showing Afya Box packages and ads, a private consultation room, lit oak display niches, the Afya Check kiosk and an Afya Box table">${HS.map((h,i)=>`<button type="button" class="p0-hs${i?'':' on'}" data-h="${i}" style="left:${h[0]}%;top:${h[1]}%" aria-label="${esc(h[2][0])}">${i+1}</button>`).join('')}<figcaption>${L('Concept image · inside the flagship · tap the numbers','Picha ya dhana · ndani ya duka kuu · gusa namba')}</figcaption></figure>
   <ol class="p0-hl" id="p0hl">${HS.map((h,i)=>`<li data-h="${i}" class="${i?'':'on'}"><span>${i+1}</span><div><b>${L(h[2][0],h[2][1])}</b><p>${L(h[3][0],h[3][1])}</p></div></li>`).join('')}</ol></div>
  <p class="note">${L('Concept images · the final store design is set with the founders and an architect','Picha za dhana · muundo wa mwisho utaamuliwa na waanzilishi na mbunifu')}</p>`],
 ['Try it · the 60-second story',`<div class="p0-pl" id="p0pl" tabindex="0" aria-roledescription="story player" aria-label="The 60-second story. Space plays or pauses, arrow keys change scene.">
   ${sc.map((x,i)=>`<div class="p0-scn${i?'':' on'}" style="${x.bg};--kx:${x.kx};--ky:${x.ky}" role="img" aria-label="Concept image for scene ${i+1}"></div>`).join('')}
   <div class="p0-lb t"></div><div class="p0-lb b"></div>
   <div class="p0-segs">${sc.map((x,i)=>`<button type="button" data-i="${i}" aria-label="Scene ${i+1}"><i></i></button>`).join('')}</div>
   <div class="p0-tc0" id="p0tc">Scene <b>01</b> / 06 · Photos &amp; concept images</div>
   <div class="p0-cap" id="p0cap" aria-live="polite"></div>
   <div class="p0-stat" id="p0stat"></div>
   <div class="p0-ctl"><button type="button" id="p0prev" aria-label="Previous scene">${I.prev}</button><button type="button" class="main" id="p0pp" aria-label="Play">${I.play}</button><button type="button" id="p0next" aria-label="Next scene">${I.next}</button><button type="button" id="p0rs" aria-label="Restart">${I.restart}</button><span class="clk" id="p0clk">0:00 / 1:00</span><span class="tag">Space · ← →</span></div>
  </div>
  <div class="p0-ch" id="p0ch">${sc.map((x,i)=>`<button type="button" data-i="${i}" class="${i?'':'on'}"><span class="im" style="${x.bg}"></span><span class="tx"><small>0:${pad(i*10)}</small>${L(x.h[0].replace(/<\/?em>/g,''),x.h[1].replace(/<\/?em>/g,''))}</span></button>`).join('')}</div>
  <p class="note">${L('Six scenes of ten seconds · plays itself, or jump to any scene · numbers live from the master model','Matukio sita ya sekunde kumi · inajicheza yenyewe, au ruka tukio lolote · namba kutoka modeli kuu')}</p>`,'p0try'],
 ['The numbers · five that matter, with the working shown',`<div class="p0-nh"><p>${L('The five numbers a busy investor needs, computed live from the master model. Switch the scenario, then open the working: every figure shows how it is calculated and links to the section that proves it.','Namba tano anazohitaji mwekezaji, zikihesabiwa moja kwa moja kutoka modeli kuu. Badilisha hali, kisha fungua hesabu: kila namba inaonyesha inavyohesabiwa na kiungo cha sehemu inayoithibitisha.')} ${PE}</p><div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center"><div class="p0-sc" id="p0sc1" role="group" aria-label="Scenario">${SC.map(x=>`<button type="button" data-k="${x[0]}" class="${x[0]===hSc?'on':''}" aria-pressed="${x[0]===hSc}">${x[1]}</button>`).join('')}</div><button type="button" class="p0-ib" id="p0wk" aria-pressed="false">${L('Show the working','Onyesha hesabu')}</button></div></div>
  <div class="p0-kpi" id="p0kpi"></div>
  <div class="p0v-split"><h4>${L('Where year-1 revenue comes from','Mapato ya mwaka 1 yanatoka wapi')} <span class="tagi">${L('Planning estimate','Makadirio')}</span></h4><div id="p0split"></div></div>
  <div class="p0-chartbox"><h4>${L('Twelve years of revenue, store by store','Miaka kumi na mbili ya mapato, duka kwa duka')} <span class="tagi">${L('Planning estimate','Makadirio')}</span></h4><div id="p0rev"></div></div>
  <p class="note">${L(`Planning estimates from the master model ${esc(IN.meta.version)} · to be verified by on-the-ground research and supplier quotations`,`Makadirio kutoka modeli kuu ${esc(IN.meta.version)} · yatathibitishwa kwa utafiti na bei za wauzaji`)}</p>`,'p0nums'],
 ['The ask · what we need, what you get',`<div class="p0-ask"><span class="hud g">${L('Seed round','Awamu ya mbegu')} · ${esc(SEED.status)}</span>
   <h3>${L(`${F.m(SEED.amount)} ${ISL()?'to open the first store':'to open the flagship'} <em>and launch the Afya Box.</em>`,`${F.m(SEED.amount)} kufungua duka kuu <em>na kuzindua Afya Box.</em>`)}</h3>
   <p>${L(`${ISL()?`<b>Start small, ${F.m(SEED.amount)}</b>: ${IN.store.area_m2} m² on a good secondary street, ${STAFFN} staff on one long shift, partner riders paid per delivery and a manual check corner`:`<b>Flagship, ${F.m(SEED.amount)}</b>: ${IN.store.area_m2} m² on a prime street front, ${STAFFN} staff on two shifts, the Afya Check kiosk and two electric riders`}; first monthly profit in month ${b.be||'—'}. The amount is released in three tranches, each only when the milestone before it is met.`,`${ISL()?`<b>Kuanza kidogo, ${F.m(SEED.amount)}</b>: m² ${IN.store.area_m2} kwenye barabara nzuri ya pili, wafanyakazi ${STAFFN} kwa zamu moja ndefu, wasafirishaji washirika wanaolipwa kwa kila safari na kona ya vipimo vya mkono`:`<b>Duka kuu, ${F.m(SEED.amount)}</b>: m² ${IN.store.area_m2} mbele ya barabara kuu, wafanyakazi ${STAFFN} kwa zamu mbili, kiosk cha Afya Check na pikipiki mbili za umeme`}; faida ya kwanza ya mwezi mwezi ${b.be||'—'}. Kiasi hiki kinatolewa kwa awamu tatu, kila awamu pale tu hatua iliyotangulia inapofikiwa.`)}</p>
   <div class="p0-tr"><div class="p0-trbar">${SEED.tranches.map((t,i)=>`<div style="flex:${t}"><b>T${i+1}</b><span>${F.m(SEED.amount*t)} · ${t*100}%</span></div>`).join('')}</div>
    <div class="p0-trm" style="--cols:${SEED.tranches.map(t=>t+'fr').join(' ')}">${SEED.milestones.map((m,i)=>`<div><b>${L('Tranche','Awamu')} ${i+1} · ${F.m(SEED.amount*SEED.tranches[i])}</b>${L(esc(cap1(m.replace(/^Tranche \d \(\d+%\):\s*/,''))),['Wakati wa kusaini: malipo ya awali ya pango, kampuni na leseni, ukarabati unaanza','Ukarabati umekamilika, leseni za TMDA na biashara mkononi, bidhaa zimeagizwa','Duka liko wazi miezi 3, lina wanachama 100 wa Afya Box na hasara ya mwezi iko chini ya TSh milioni 16'][i])}</div>`).join('')}</div></div>
   <div class="p0-askg"><div><b>${F.m(SEED.amount)}</b><span>${(ISL()?L('start-small option','chaguo la kuanza kidogo'):L('flagship option','chaguo la duka kuu'))}</span></div><div><b>${F.m(POSTMONEY)}</b><span>${L(`illustrative post-money value for ${P(OWN.seed_investor_share)} · legal review needed`,`thamani ya mfano baada ya uwekezaji kwa ${P(OWN.seed_investor_share)}`)}</span></div><div><b>${P(OWN.founders_floor)}</b><span>${L('kept by the founders for life, protected legally','inabaki kwa waanzilishi maisha yote, kisheria')}</span></div></div>
   <div class="cta" style="margin-top:22px"><a class="btn solid" href="#s6-3">${L('Use of funds in full','Matumizi ya fedha kikamilifu')} ${AR}</a><a class="btn line" href="#s6-4">${L('Ownership and exit','Umiliki na kutoka')}</a></div>
  </div>
  <p class="note">${L(`Open question: Phase 0 research and setup costs (about ${F.m(SEED.phase0_gap.research_setup_costs)} against a ${F.tsh(SEED.phase0_gap.phase0_budget)} budget) may change the final amount · use of funds in section 6.3`,`Swali wazi: gharama za awamu 0 (takriban ${F.m(SEED.phase0_gap.research_setup_costs)} dhidi ya bajeti ya ${F.tsh(SEED.phase0_gap.phase0_budget)}) zinaweza kubadilisha kiasi`)}</p>`,'p0ask'],
 ['Ask the showroom · 26 investor questions',faqHTML(),'p0faq'],
 ['Risks and our answer',`<div class="risks">
   ${[['Every business number here is still a planning estimate.','They all come from one master model with three scenarios. Rent, salaries, prices and duties are being checked against Tanzanian quotations before the round closes.','Kila namba ya biashara hapa bado ni makadirio ya mipango.','Zote zinatoka modeli kuu moja yenye hali tatu. Pango, mishahara, bei na ushuru vinakaguliwa dhidi ya bei halisi kabla ya kufunga awamu.'],
     ['Partner businesses may not accept 70% of their walk-in price, or may deliver poor service.','We sign only after written quotations; the pack fee is set from the real rate, so the 25% markup holds. Members rate every visit in the app, and a partner below 4 stars for two months is replaced.','Washirika huenda wasikubali 70% ya bei yao, au wakatoa huduma mbovu.','Tunasaini baada ya nukuu za maandishi; ada hupangwa kutoka bei halisi. Wanachama hutathmini kila ziara, na mshirika chini ya nyota 4 kwa miezi miwili hubadilishwa.'],
     ['The seed amount depends on the store format chosen.',`${ISL()?`The start-small format needs ${F.m(SEED.amount)}.`:`The flagship format needs ${F.m(SEED.amount)}.`} The other format can be selected with the switch in the menu. The Phase 0 research gap is shown openly; either the round grows or the founders pre-fund it, and the decision is made before any money is taken.`,'Kiasi cha mtaji kinategemea aina ya duka itakayochaguliwa.',`${ISL()?`Muundo wa kuanza kidogo unahitaji ${F.m(SEED.amount)}.`:`Muundo wa duka kuu unahitaji ${F.m(SEED.amount)}.`} Muundo mwingine unaweza kuchaguliwa kwa kibadilishi kwenye menyu. Pengo la utafiti la awamu 0 linaonyeshwa wazi; ama awamu inaongezeka ama waanzilishi wanalipia mapema, na uamuzi unafanywa kabla ya kupokea pesa yoyote.`],
     ['A new name has to earn trust in health.','A free Afya Check on every visit, registered products only, a written warranty, and one price in store, in the app and on WhatsApp.','Jina jipya linapaswa kujenga imani katika afya.','Afya Check ya bure kila ziara, bidhaa zilizosajiliwa pekee, dhamana ya maandishi, na bei moja dukani, programu na WhatsApp.'],
     ['Members may join more slowly than planned.','Walk-in sales and one-off kits earn without membership, the downside case is shown above, and tranche 3 waits for 100 members.','Wanachama wanaweza kujiunga polepole kuliko ilivyopangwa.','Mauzo ya dukani na vifurushi vya mara moja vinaleta mapato bila uanachama, hali mbaya inaonyeshwa hapo juu, na awamu ya 3 inasubiri wanachama 100.'],
     ['The films show a store that is not built yet.','Every frame is a concept image or AI video of the planned store, with no faces shown. App screens are mock-ups and all figures are planning estimates.','Filamu zinaonyesha duka ambalo bado halijajengwa.','Kila picha ni picha ya dhana au video ya AI ya duka linalopangwa, bila nyuso za watu. Skrini za programu ni mifano na namba zote ni makadirio.'],
     ['The Kiswahili text is a draft.','It is shown with a clear label and will be checked by a native speaker before any investor sees it; who checks it is an open question for the founders.','Maandishi ya Kiswahili ni rasimu.','Yanaonyeshwa na lebo wazi na yatakaguliwa na mzungumzaji asilia kabla mwekezaji yeyote hajayaona.']].map(r=>`<div class="risk"><span class="q">${L(r[0],r[2])}</span><span class="ar">→</span><span class="a">${L(r[1],r[3])}</span></div>`).join('')}
  </div>`],
 ['Where to go next · all eight parts',`<p class="s11lead">${L('The whole project is one story told in a fixed order, so an investor moves from “I see the problem” to “I want to invest” without getting lost. Each part answers the next question an investor asks.','Mradi mzima ni hadithi moja inayosimuliwa kwa mpangilio maalum, ili mwekezaji asonge kutoka “naona tatizo” hadi “nataka kuwekeza” bila kupotea.')}</p><div class="p0-parts">${PARTS.map(pt=>`<a href="#s${pt.s[pt.n==='0'?1:0][0].replace('.','-')}" style="--pc:${pt.c}"><small>Part ${pt.n} · ${esc(pt.layer)}</small><b>${esc(pt.name)}</b><span>${esc(pt.line)}</span></a>`).join('')}</div>`]];
 return secShell({s,p,pv,nx,cls:'p0v2',img:'img/real-mother-baby.webp',imgAlt:'Concept image: a smiling mother holding her baby daughter outdoors',
  h1:L('Health essentials,','Bidhaa za afya,'),em:L('without the hunt.','bila kuhangaika.'),
  lede:L('A health-essentials store, a monthly Afya Box and same-day delivery for households in Dar es Salaam. Registered products at one price in every channel, payment in seconds, and monthly supplies delivered before they run out.','Duka la bidhaa za afya, Afya Box ya kila mwezi na usafirishaji wa siku hiyohiyo kwa kaya za Dar es Salaam. Bidhaa zilizosajiliwa kwa bei moja kila mahali, malipo kwa sekunde, na mahitaji ya mwezi yanayoletwa kabla hayajaisha.'),
  heroExtra:`<p class="motto" style="margin-top:14px">Afya yako, nyumbani kwako.</p>
   <div class="cta"><button class="btn solid" id="p0watch" type="button">${I.play} ${L('Watch the brand film','Tazama filamu ya chapa')}</button><button class="btn solid" id="p0watchsw" type="button" style="background:#f2c96b;border-color:#f2c96b;color:#1a1204">${I.play} ${L('Watch the family film','Tazama filamu ya familia')}</button><a class="btn line" href="#s0-2">${L('The ten-minute presentation','Wasilisho la dakika kumi')}</a><button class="btn line" id="p0findb" type="button">${I.search} ${L('Find anything','Tafuta chochote')}</button></div>
   <div class="p0v-htop">${langHTML()}${swNote}<div class="p0-times"><a href="#s0-1" data-path="p60"><b>60 s</b>${L('busy investor','mwenye haraka')}</a><a href="#s0-1" data-path="p10"><b>10 min</b>${L('interested','mwenye shauku')}</a><a href="#s0-1" data-path="pdd"><b>${L('Hours','Masaa')}</b>${L('due diligence','uchunguzi kamili')}</a></div></div>
   <div class="p0v-hn">${[[L('Year 1','Mwaka 1'),F.auto(b.y1rev),L('total for months 1–12: store, boxes, services, online and Afya Kazini','jumla ya miezi 1–12: duka, box, huduma, mtandao na Afya Kazini')],[L('Break-even','Faida'),b.be?L('Month '+b.be,'Mwezi '+b.be):'—',(b.payback?L(`first month with an operating profit; the ${F.auto(b.earlyLoss)} lost before it is earned back by month ${b.payback}`,`mwezi wa kwanza wenye faida; hasara ya ${F.auto(b.earlyLoss)} kabla yake inarudishwa kufikia mwezi ${b.payback}`):L('first month with an operating profit','mwezi wa kwanza wenye faida'))],[L('Members','Wanachama'),num(b.mem12),L('Afya Box households at the end of month 12','kaya za Afya Box mwishoni mwa mwezi 12')],[L('Year 12','Mwaka 12'),F.auto(b.y12.revenue),L(`revenue in year 12 alone, across ${b.y12.stores} stores`,`mapato ya mwaka 12 pekee, maduka ${b.y12.stores}`)],[L('The ask','Ombi'),F.m(SEED.amount),(ISL()?L('start small, in three tranches','kuanza kidogo, kwa awamu tatu'):L('flagship, in three tranches','duka kuu, kwa awamu tatu'))]].map(x=>`<div><small>${x[0]}</small><b>${x[1]}</b><span>${x[2]}</span></div>`).join('')}</div>`,
  mods,
  takeaway:L(`A need that comes back every month, served by <b>a store, a membership and an app that work as one</b>, with every running cost recovered inside the price the customer pays, and capital released only as milestones are hit.`,`Hitaji linalorudi kila mwezi, linalohudumiwa na <b>duka, uanachama na programu vinavyofanya kazi kama kitu kimoja</b>, kila gharama ikirudishwa ndani ya bei anayolipa mteja, na mtaji ukitolewa tu hatua zinapofikiwa.`),
  doors:['s0-2','s1-1','s3-4','s6-3'],
  sources:SRC})}

let pRaf=0;
function init01(){REFRESH();
 hudumaInit('p0h1');kaziniInit('p0k1');const g=id=>document.getElementById(id);if(!g('p0pl'))return;
 wireLang();
 const scrollTo=id=>{const el=g(id);if(el)el.scrollIntoView({behavior:'smooth',block:'start'})};
 /* in-page doors (never change the hash: the router would leave the page) */
 document.querySelectorAll('.p0v2 [data-scroll]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const k=a.dataset.k;if(k){addVisit(k);paintPath()}if(a.dataset.v!==undefined)loadV(+a.dataset.v,false);scrollTo(a.dataset.scroll)}));
 document.querySelectorAll('.p0v2 [data-path]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();setPath(a.dataset.path);scrollTo('p0way')}));
 g('p0findb').onclick=()=>{scrollTo('p0way');setTimeout(()=>g('p0q').focus({preventScroll:true}),450)};
 g('p0watch').onclick=()=>{loadV(0,true);scrollTo('p0film')};{const b=g('p0watchsw');if(b)b.onclick=()=>{loadV(1,true);scrollTo('p0film')}}
 /* hotspots */
 const hs=[...document.querySelectorAll('.p0-hs')],hl=[...document.querySelectorAll('#p0hl li')];
 const hon=k=>{hs.forEach((b,i)=>b.classList.toggle('on',i===k));hl.forEach((l,i)=>l.classList.toggle('on',i===k))};
 hs.forEach((b,i)=>b.onclick=()=>hon(i));hl.forEach((l,i)=>l.onclick=()=>hon(i));

 /* ---- video library ---- */
 const vid=g('p0vid'),prod=g('p0vprod'),big=g('p0vbig'),items=[...document.querySelectorAll('.p0v-it')],box=g('p0vbox');
 const avail=VIDS.map(()=>null);let vi=0,auto=LS.get('afyaAutoNext','1')==='1';g('p0vauto').checked=auto;
 g('p0vauto').onchange=e=>{auto=e.target.checked;LS.set('afyaAutoNext',auto?'1':'0')};
 const badge=(i,st)=>{const el=g('p0vs'+i);if(!el)return;el.className='st '+st;el.innerHTML=st==='prod'?L('In production','Inatengenezwa'):st==='now'?L('Playing','Inacheza'):st==='live'?L('Ready','Tayari'):''};
 const paintBadges=()=>items.forEach((it,i)=>{it.classList.toggle('on',i===vi);badge(i,i===vi&&!vid.paused&&avail[i]!==false?'now':avail[i]===false?'prod':avail[i]?'live':'')});
 const showProd=v=>{prod.hidden=false;big.hidden=true;prod.innerHTML=`${vposter(v,'Concept image: storyboard frame for '+v.t[0])}<div class="in"><span class="badge"><i></i>${L('In production','Inatengenezwa')} · ${L('planned','imepangwa')} ${mmss(v.dur)}</span><h4>${L(v.t[0],v.t[1])}</h4><p>${L('This film is being produced now. Here is its storyboard, so you can see what it will show:','Filamu hii inatengenezwa sasa. Huu ni mpangilio wake, ili uone itakachoonyesha:')}</p><ol>${(v.b||[]).map(x=>`<li><b>${x[0]}</b><span>${L(x[1],x[2])}</span></li>`).join('')}</ol></div>`};
 const chap=()=>{const v=VIDS[vi];g('p0vch').innerHTML=v.ch?v.ch.map((c,j)=>`<button type="button" data-t="${c[0]}"><b>${mmss(c[0])}</b>${L(c[1],c[2])}</button>`).join(''):'';
  g('p0vchbar').innerHTML=v.ch?v.ch.map((c,j)=>{const e=j<v.ch.length-1?v.ch[j+1][0]:v.dur;return `<button type="button" data-t="${c[0]}" style="flex:${e-c[0]}" aria-label="Chapter ${j+1}: ${esc(c[1])}" title="${mmss(c[0])} · ${esc(c[1])}"><i></i></button>`}).join(''):'';
  document.querySelectorAll('#p0vch button,#p0vchbar button').forEach(b=>b.onclick=()=>{if(avail[vi]===false)return;vid.currentTime=+b.dataset.t;vid.play().catch(()=>{})})};
 function loadV(i,play){vi=(i+VIDS.length)%VIDS.length;const v=VIDS[vi];
  g('p0vk').innerHTML=`${pad(vi+1)} / ${pad(VIDS.length)} · ${L(v.k[0],v.k[1])}`;g('p0vt').innerHTML=L(v.t[0],v.t[1]);g('p0vl').innerHTML=L(v.l[0],v.l[1]);
  g('p0vbigt').innerHTML=L('Play','Cheza')+' · '+mmss(v.dur);chap();
  if(avail[vi]===false){try{vid.pause();vid.removeAttribute('src');vid.load()}catch(e){}showProd(v);paintBadges();return}
  prod.hidden=true;big.hidden=!!play;vid.poster=v.po;let vs=(LANG==='sw'&&v.srcSw)?v.srcSw:v.src;try{const a1=(LANG==='sw'&&v.av1Sw)?v.av1Sw:(v.srcSw?v.av1En:v.av1);if(a1&&vid.canPlayType('video/mp4; codecs="av01.0.08M.08, mp4a.40.2"')==='probably')vs=a1}catch(e){}vid.src=vs;vid.querySelectorAll('track').forEach(x=>x.remove());if(v.tr){v.tr.forEach(([l,lab,src])=>{const add=u=>{if(VIDS[vi]!==v)return;const k=document.createElement('track');k.kind='subtitles';k.srclang=l;k.label=lab;k.src=u;if(l==='sw'&&LANG==='sw')k.default=true;vid.appendChild(k);try{setTimeout(()=>{for(const tt of vid.textTracks)tt.mode=(!v.srcSw&&((LANG==='sw'&&tt.language==='sw')||(v.subEn&&LANG==='en'&&tt.language==='en')))?'showing':'disabled'},50)}catch(e){}};window.__vtt=window.__vtt||{};if(window.__vtt[src])add(window.__vtt[src]);else fetch(src).then(r=>r.ok?r.text():Promise.reject()).then(t=>{const u=URL.createObjectURL(new Blob([t],{type:'text/vtt'}));window.__vtt[src]=u;add(u)}).catch(()=>{})})}try{vid.load()}catch(e){}
  if(play){const pr=vid.play();if(pr&&pr.catch)pr.catch(()=>{big.hidden=false})}paintBadges()}
 vid.addEventListener('error',()=>{{const cs=vid.getAttribute('src')||'',V=VIDS[vi];const fbk=[[V.av1,V.src],[V.av1En,V.src],[V.av1Sw,V.srcSw||V.src]].find(x=>x[0]&&cs.endsWith(x[0]));if(fbk){vid.src=fbk[1];try{vid.load()}catch(e){}return}if(!cs.endsWith(V.src)&&!(V.srcSw&&cs.endsWith(V.srcSw)))return}avail[vi]=false;showProd(VIDS[vi]);paintBadges()});
 vid.addEventListener('loadedmetadata',()=>{avail[vi]=true;if(isFinite(vid.duration)){const el=g('p0vd'+vi);if(el)el.textContent=mmss(vid.duration)}paintBadges()});
 vid.addEventListener('play',()=>{big.hidden=true;paintBadges()});vid.addEventListener('pause',paintBadges);
 vid.addEventListener('timeupdate',()=>{const v=VIDS[vi];if(!v.ch)return;const t=vid.currentTime;let a=0;v.ch.forEach((c,j)=>{if(t>=c[0])a=j});
  document.querySelectorAll('#p0vch button').forEach((b,j)=>b.classList.toggle('on',j===a));
  document.querySelectorAll('#p0vchbar button').forEach((b,j)=>{const s0=v.ch[j][0],e=j<v.ch.length-1?v.ch[j+1][0]:(vid.duration||v.dur);b.firstChild.style.width=Math.max(0,Math.min(1,(t-s0)/(e-s0)))*100+'%'})});
 const nextAvail=dir=>{for(let k=1;k<=VIDS.length;k++){const j=(vi+dir*k+VIDS.length*2)%VIDS.length;if(avail[j]!==false)return j}return vi};
 vid.addEventListener('ended',()=>{paintBadges();if(auto){const j=nextAvail(1);if(j!==vi)loadV(j,true)}});
 big.onclick=()=>{vid.play().catch(()=>{})};
 items.forEach(it=>it.onclick=()=>{loadV(+it.dataset.v,true);if(innerWidth<1150)box.scrollIntoView({behavior:'smooth',block:'center'})});
 g('p0vlib').addEventListener('keydown',e=>{const t=e.target,tag=t&&t.tagName;if(tag==='INPUT')return;const k=e.key;
  if((k===' '||k==='k')&&tag!=='BUTTON'){e.preventDefault();if(avail[vi]!==false)vid.paused?vid.play().catch(()=>{}):vid.pause()}
  else if((k==='ArrowRight'||k==='ArrowLeft')&&tag!=='VIDEO'){e.preventDefault();if(avail[vi]!==false)vid.currentTime=Math.max(0,vid.currentTime+(k==='ArrowRight'?5:-5))}
  else if(k==='n'||k==='N')loadV(vi+1,true);else if(k==='p'||k==='P')loadV(vi-1,true);
  else if(k==='f'||k==='F'){try{if(document.fullscreenElement)document.exitFullscreen();else{const r=box.requestFullscreen&&box.requestFullscreen();if(r&&r.catch)r.catch(()=>{})}}catch(err){}}});
 /* probe which films exist, so the playlist can say Ready / In production */
 const probes=[];VIDS.forEach((v,i)=>{if(i===0)return;try{const pv0=document.createElement('video');pv0.preload='metadata';pv0.muted=true;
   pv0.addEventListener('loadedmetadata',()=>{avail[i]=true;if(isFinite(pv0.duration)){const el=g('p0vd'+i);if(el)el.textContent=mmss(pv0.duration)}paintBadges();pv0.removeAttribute('src');try{pv0.load()}catch(e){}});
   pv0.addEventListener('error',()=>{avail[i]=false;paintBadges();if(i===vi)showProd(v)});pv0.src=v.src;probes.push(pv0)}catch(e){}});
 cleanups.push(()=>{try{vid.pause()}catch(e){}probes.forEach(p=>{try{p.removeAttribute('src');p.load()}catch(e){}})});
 loadV(0,false);

 /* ---- reading path ---- */
 function paintPath(){const P0=PATHS[PATH],st=pathSteps(PATH),v=visited(),dn=st.filter(x=>v.has(x.k)).length;
  document.querySelectorAll('.p0v-ptabs button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.p===PATH));
  g('p0pd').innerHTML=L(P0.d[0],P0.d[1]);g('p0steps').innerHTML=pathList(PATH);
  g('p0pbar').style.width=(st.length?dn/st.length*100:0)+'%';g('p0pn').innerHTML=L(`${dn} of ${st.length} done`,`${dn} kati ya ${st.length}`);
  const tot=st.reduce((a,x)=>a+parseFloat(x.m)*(/min/.test(x.m)?60:1),0);
  g('p0palt').innerHTML=PATH==='p10'?L('Prefer to be presented to? The same ten minutes as sixteen slides with notes: <a href="#s0-2">0.2 The ten-minute presentation</a>.','Ungependa kuwasilishiwa? Dakika kumi zilezile kama slaidi kumi na sita: <a href="#s0-2">0.2 Wasilisho la dakika kumi</a>.'):PATH==='pdd'?L(`About ${Math.round(tot/3600*10)/10} hours in total${IDX?', estimated from the real length of each section':' (estimate; refined once the search index has read every section)'} · the data room, model and sources are in 7.5.`,`Takriban masaa ${Math.round(tot/3600*10)/10} kwa jumla · chumba cha takwimu, modeli na vyanzo viko 7.5.`):L('Then, if you have ten more minutes, switch to the 10-minute path.','Kisha, ukiwa na dakika kumi zaidi, badili kwenda njia ya dakika 10.');
  g('p0steps').querySelectorAll('[data-scroll]').forEach(a=>a.onclick=e=>{e.preventDefault();addVisit(a.dataset.k);if(a.dataset.v!==undefined)loadV(+a.dataset.v,true);paintPath();scrollTo(a.dataset.scroll)})}
 function setPath(k){if(!PATHS[k])return;PATH=k;LS.set('afyaPath',k);paintPath()}
 document.querySelectorAll('.p0v-ptabs button').forEach(b=>b.onclick=()=>setPath(b.dataset.p));
 g('p0preset').onclick=()=>{const keep=[...visited()].filter(k=>!pathSteps(PATH).some(x=>x.k===k));LS.set(VKEY,JSON.stringify(keep));paintPath()};
 addVisit('s0-1');paintPath();

 /* ---- search ---- */
 const q=g('p0q');let qT=0;
 const doQ=()=>{runSearch(q.value);if(!IDX)buildIndex(()=>{runSearch(q.value);paintPath()})};
 q.addEventListener('input',()=>{clearTimeout(qT);qT=setTimeout(doQ,120)});
 q.addEventListener('focus',()=>buildIndex(()=>{runSearch(q.value);paintPath()}),{once:true});
 q.addEventListener('keydown',e=>{const a=[...g('p0res').querySelectorAll('a')];if(!a.length)return;let i=a.findIndex(x=>x.classList.contains('on'));
  if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();i=(i+(e.key==='ArrowDown'?1:-1)+a.length)%a.length;a.forEach((x,j)=>x.classList.toggle('on',j===i));a[i].scrollIntoView({block:'nearest'})}
  else if(e.key==='Enter'){e.preventDefault();(a[i]||a[0]).click()}});
 document.querySelectorAll('.p0v-qchips button').forEach(b=>b.onclick=()=>{q.value=b.dataset.q;doQ();q.focus({preventScroll:true})});
 const slash=e=>{if(e.key==='/'&&!/INPUT|TEXTAREA/.test((e.target||{}).tagName||'')){e.preventDefault();scrollTo('p0way');setTimeout(()=>q.focus({preventScroll:true}),350)}};
 document.addEventListener('keydown',slash);cleanups.push(()=>document.removeEventListener('keydown',slash));

 /* ---- FAQ ---- */
 let fcat='all';const fis=[...document.querySelectorAll('#p0flist .p0v-fi')];
 const filt=()=>{const t=(g('p0fq').value||'').trim().toLowerCase();let n=0;fis.forEach((el,i)=>{const f=FAQf()[i];const ok=(fcat==='all'||f[0]===fcat)&&(!t||el.textContent.toLowerCase().includes(t));el.hidden=!ok;if(ok)n++});
  g('p0fcount').innerHTML=L(`${n} of ${FAQf().length} questions shown`,`Maswali ${n} kati ya ${FAQf().length}`)};
 fis.forEach(el=>el.querySelector('.q').onclick=()=>togFaq(el));
 document.querySelectorAll('.p0v-fcats button').forEach(b=>b.onclick=()=>{fcat=b.dataset.c;document.querySelectorAll('.p0v-fcats button').forEach(x=>x.setAttribute('aria-pressed',x===b));filt()});
 g('p0fq').addEventListener('input',filt);
 let allOpen=false;g('p0fall').onclick=()=>{allOpen=!allOpen;fis.forEach(el=>{if(!el.hidden)togFaq(el,allOpen)});g('p0fall').innerHTML=allOpen?L('Collapse all','Funga yote'):L('Expand all','Fungua yote')};
 filt();

 /* ---- one-page summary: print + copy ---- */
 document.body.classList.add('p0-hasprint');
 const mkPrint=()=>{let pr=g('p0print');if(!pr){pr=document.createElement('div');pr.id='p0print';document.body.appendChild(pr)}pr.innerHTML=g('p0sum').outerHTML.replace('id="p0sum"','id="p0sumP"')};
 mkPrint();window.addEventListener('beforeprint',mkPrint);
 g('p0print1').onclick=()=>{mkPrint();addVisit('p0:sum');paintPath();try{window.print()}catch(e){}};
 g('p0copy').onclick=()=>{const el=g('p0sum').cloneNode(true);el.querySelectorAll(LANG==='sw'?'.p0-en':'.p0-sw').forEach(n=>n.remove());el.querySelectorAll('.cite').forEach(n=>n.remove());
  const txt=[...el.querySelectorAll('.hd,h3,.lead,.kp div,h4,p,li,tr')].map(n=>n.innerText||n.textContent).map(s=>s.replace(/\s+/g,' ').trim()).filter(Boolean).join('\n');
  const ok=m=>{g('p0copyok').textContent=m};
  try{navigator.clipboard.writeText(txt).then(()=>ok(LANG==='sw'?'Imenakiliwa':'Copied to clipboard'),()=>ok(LANG==='sw'?'Imeshindikana':'Copy not allowed here'))}catch(e){ok('Copy not allowed here')}};
 cleanups.push(()=>{document.body.classList.remove('p0-hasprint');window.removeEventListener('beforeprint',mkPrint);const pr=g('p0print');if(pr)pr.remove()});

 /* ---- numbers ---- */
 const paintN=flash=>{const d=D(hSc),sp=Y1split(d),tot=sp.walk+sp.box+sp.online;
  g('p0kpi').innerHTML=kpis01(d).map(k=>`<div class="p0-k ${k[3]}${flash?' flash':''}"><small>${k[0]}</small><b>${k[1]}</b><span>${k[2]}</span><div class="p0wk">${k[4]} <a href="#${k[5]}">${L('Proof','Uthibitisho')}: ${ALL.find(x=>x.id===k[5]).no} →</a></div></div>`).join('');
  const parts=[[L('Walk-in','Dukani'),sp.walk,'#5fbf8f'],[L('Afya Box','Afya Box'),sp.box,'#f2c96b'],[L('Online','Mtandaoni'),sp.online,'#d9b56e']];
  g('p0split').innerHTML=`<div class="p0v-sbar">${parts.map(x=>`<div style="flex:${x[1]};background:${x[2]}">${P(x[1]/tot)}</div>`).join('')}</div><div class="p0v-slg">${parts.map(x=>`<span><i style="background:${x[2]}"></i>${x[0]} <b>${F.auto(x[1])}</b></span>`).join('')}<span>${L('Total','Jumla')} <b>${F.auto(tot)}</b> · ${d.label}</span></div>`;
  g('p0rev').innerHTML=revBars(d,innerWidth<820?{w:560,h:470,pl:96}:{w:1000,h:300})};
 const scb=[...document.querySelectorAll('#p0sc1 button')];
 scb.forEach(b=>b.onclick=()=>{hSc=b.dataset.k;scb.forEach(x=>{x.classList.toggle('on',x===b);x.setAttribute('aria-pressed',x===b)});paintN(true);sc=SCENES(D(hSc));show(i,true)});
 g('p0wk').onclick=()=>{const on=!g('p0nums').classList.contains('p0v-showwk');g('p0nums').classList.toggle('p0v-showwk',on);g('p0wk').setAttribute('aria-pressed',on);g('p0wk').classList.toggle('on',on);if(on){addVisit('p0:nums');paintPath()}};
 paintN(false);
 /* mark in-page path steps as seen when their module scrolls into view */
 try{const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&e.intersectionRatio>.35){const k={p0nums:'p0:nums',p0ask:'p0:ask'}[e.target.id];if(k&&!visited().has(k)){addVisit(k);paintPath()}}}),{threshold:[.35]});['p0nums','p0ask'].forEach(id=>g(id)&&io.observe(g(id)));cleanups.push(()=>io.disconnect())}catch(e){}

 /* ---- the 60-second scene player ---- */
 const DUR=10000,pl=g('p0pl'),scn=[...pl.querySelectorAll('.p0-scn')],segs=[...pl.querySelectorAll('.p0-segs button')],chs=[...document.querySelectorAll('#p0ch button')],cap=g('p0cap'),st=g('p0stat'),pp=g('p0pp');
 let sc=SCENES(D(hSc)),i=0,el=0,playing=false,last=0;
 function show(k,quiet){i=Math.max(0,Math.min(sc.length-1,k));const x=sc[i];
  scn.forEach((e,j)=>{const on=j===i;if(on&&!quiet){e.classList.remove('on');void e.offsetWidth}e.classList.toggle('on',on)});
  chs.forEach((b,j)=>b.classList.toggle('on',j===i));
  cap.className='p0-cap';st.className='p0-stat';if(!quiet){void cap.offsetWidth;cap.className='p0-cap swap';st.className='p0-stat swap'}
  cap.innerHTML=`<span class="k">${pad(i+1)} · ${L(x.k[0],x.k[1])}</span><h3>${L(x.h[0],x.h[1])}</h3><p>${L(x.p[0],x.p[1])}</p>`;
  st.innerHTML=`<b>${x.sb}</b><span>${L(x.ss[0],x.ss[1])}</span>`;
  g('p0tc').innerHTML=`${L('Scene','Tukio')} <b>${pad(i+1)}</b> / 06 · ${L('Concept images','Picha za dhana')}`;paint()}
 function paint(){segs.forEach((s,k)=>s.firstChild.style.width=(k<i?100:k>i?0:Math.min(100,el/DUR*100))+'%');g('p0clk').textContent=mmss((i*DUR+el)/1000)+' / 1:00'}
 function tick(now){if(!playing)return;el+=now-last;last=now;if(el>=DUR){if(i<sc.length-1){el=0;show(i+1)}else{el=DUR;stop()}}paint();if(playing)pRaf=requestAnimationFrame(tick)}
 function play(){if(i===sc.length-1&&el>=DUR){el=0;show(0)}playing=true;pl.classList.add('run');last=performance.now();cancelAnimationFrame(pRaf);pRaf=requestAnimationFrame(tick);pp.innerHTML=I.pause;pp.setAttribute('aria-label','Pause')}
 function stop(){playing=false;pl.classList.remove('run');cancelAnimationFrame(pRaf);pp.innerHTML=I.play;pp.setAttribute('aria-label','Play')}
 const jump=k=>{el=0;show(k);if(playing){last=performance.now()}};
 pp.onclick=()=>playing?stop():play();
 g('p0prev').onclick=()=>jump(i-1);g('p0next').onclick=()=>jump(i+1);g('p0rs').onclick=()=>{jump(0);if(!playing)play()};
 segs.forEach((b,k)=>b.onclick=()=>jump(k));chs.forEach((b,k)=>b.onclick=()=>jump(k));
 pl.addEventListener('keydown',e=>{if(e.key===' '||e.key==='k'){e.preventDefault();playing?stop():play()}else if(e.key==='ArrowRight'){e.preventDefault();jump(i+1)}else if(e.key==='ArrowLeft'){e.preventDefault();jump(i-1)}});
 cleanups.push(()=>{stop()});
 show(0,true)}


/* ============================================================
   s0-2  THE TEN-MINUTE PRESENTATION
   ============================================================ */
const Q=[
 ['Q1','Is the problem real and big?','#ff9b87'],['Q2','Who exactly has it?','#ffb36b'],['Q3','Why now?','#ff7b9c'],
 ['Q4','What is the solution?','#5fbf8f'],['Q5','How does it work?','#d9b56e'],['Q6','Why will it win?','#b5dfc6'],
 ['Q7','Does it make money?','#f2c96b'],['Q8','How big can it get?','#ffe7a8'],['Q9','What do you want, and what do I get?','#c9b8ff']];
const BUDGET=[35,40,35,40,35,35,40,35,35,40,35,35,45,45,45,25]; // seconds, sums to 600
const SQ=[0,0,0,1,2,3,4,4,4,4,4,5,6,7,8,8];
const STITLE=['The problem','The evidence','The market','Our customers','Why now','The solution','How it works','The experience','The Afya Check','Membership','The engine','Growth and moat','Financials','Road to TSh billions','The ask and use of funds','Ownership and close'];
const SIMG=[['real-queue'],['real-pharmacy'],['real-street-walk'],['real-elder-portrait','boxdoor'],['diaspora','real-delivery'],['exterior'],['scan','hub'],['team'],['interior'],['dad','prod-baby'],['hub'],['interior'],['real-woman-phone','team'],['real-delivery'],['exterior'],['exterior']];
const SPOS=['50% 40%','50% 30%','50% 40%','50% 40%','50% 45%','50% 50%','50% 40%','50% 30%','50% 50%','50% 50%','50% 40%','50% 50%','50% 30%','50% 45%','50% 50%','50% 50%'];
let dSc='base',dI=0;

function slides(d){const r=d.r,y12=d.y12,pc=IN.cards;
 const cardCol={green:'linear-gradient(135deg,#17a06b,#0f7a52)',family:'linear-gradient(135deg,#1c8f7a,#0d5e52)',care:'linear-gradient(135deg,#2a7db8,#17507a)',senior:'linear-gradient(135deg,#6b5aa8,#3f3478)',royal:'linear-gradient(135deg,#123a2a,#05140e)',kazini:'linear-gradient(135deg,#3a4440,#1c2420)'};
 const ring=(()=>{const mods=['Till','Catalogue','Stock','Members','Delivery','Check','People','Money','Reports'];let s='';const cx=200,cy=200,R=150;
  mods.forEach((m,i)=>{const a=i/mods.length*2*Math.PI-Math.PI/2,x=cx+R*Math.cos(a),y=cy+R*Math.sin(a);s+=`<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="rgba(95,191,143,.25)" stroke-width="1"/><circle cx="${x}" cy="${y}" r="34" fill="#071d16" stroke="rgba(95,191,143,.45)"/><text x="${x}" y="${y+4}" text-anchor="middle" fill="#effaf5" style="font:600 12px var(--f-body)">${m}</text>`});
  s=`<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="rgba(242,201,107,.25)" stroke-dasharray="2 6"/>`+s+`<circle cx="${cx}" cy="${cy}" r="62" fill="#0f7a52" stroke="#f2c96b" stroke-width="1.5"/><text x="${cx}" y="${cy-4}" text-anchor="middle" fill="#fff" style="font:800 15px var(--f-display)">Afya</text><text x="${cx}" y="${cy+16}" text-anchor="middle" fill="#ffe7a8" style="font:500 10px var(--f-hud);letter-spacing:.1em">ONE SYSTEM</text>`;
  return `<svg viewBox="0 0 400 400" role="img" aria-label="One connected system with nine modules">${s}</svg>`})();
 const rings=`<svg viewBox="0 0 300 300" role="img" aria-label="Nested circles, not to scale: Dar es Salaam population, daily buyers at Store 1, and Afya Box members"><circle cx="150" cy="150" r="140" fill="rgba(95,191,143,.06)" stroke="rgba(95,191,143,.4)"/><circle cx="150" cy="196" r="86" fill="rgba(242,201,107,.07)" stroke="rgba(242,201,107,.5)"/><circle cx="150" cy="236" r="40" fill="rgba(242,201,107,.22)" stroke="#f2c96b"/>
  <text x="150" y="52" text-anchor="middle" fill="#effaf5" style="font:500 22px var(--f-hud)">5,383,728</text><text x="150" y="70" text-anchor="middle" fill="#a9c4b8" style="font:500 9px var(--f-hud);letter-spacing:.1em">PEOPLE · DAR ES SALAAM 2022</text>
  <text x="150" y="146" text-anchor="middle" fill="#ffe7a8" style="font:500 20px var(--f-hud)">${num(d.mem12)}</text><text x="150" y="162" text-anchor="middle" fill="#a9c4b8" style="font:500 8.5px var(--f-hud);letter-spacing:.1em">AFYA BOX MEMBERS · M12</text>
  <text x="150" y="238" text-anchor="middle" fill="#1a1204" style="font:600 18px var(--f-hud)">${Math.round(d.buyersDay)}</text><text x="150" y="252" text-anchor="middle" fill="#1a1204" style="font:600 7px var(--f-hud)">BUYERS / DAY</text></svg>`;
 const MX=[['Traditional pharmacy','o','o','h','o','o'],['Supermarket','o','o','h','o','h'],['Informal seller','o','o','o','o','o'],['Online marketplace','o','o','h','h','h'],['Afya Basics','f','f','f','f','f']];
 const regs=IN.growth.regions.map(rg=>{const yi=IN.growth.stores_by_year.findIndex(s=>s>=rg[0]);return [yi+1,rg[1]]});
 const ufMax=Math.max(...SEED.use.map(u=>u[1]));
 return [
 /*1*/{h:`<div class="p0-2c w"><div><h2 class="p0-T">Care has moved home. <em>Supply has not followed.</em></h2><p class="p0-L">Tanzanian families now manage babies, pregnancy, blood pressure, diabetes and ageing parents at home. What that care needs is still bought one item, one shop, one queue at a time.</p>
   <div class="p0-pn">${[['Scattered','Three shops for one baby’s needs'],['Slow','A queue just to ask which monitor'],['Untrusted','Registered and fake side by side'],['Unplanned','Strips run out on a Sunday night'],['Far from family','Money sent home, care unseen']].map((x,i)=>`<div style="--c:${SIG[i][1]}"><i></i><b>${x[0]}</b><span>${x[1]}</span></div>`).join('')}</div></div>
   <figure class="p0-ph p0-hide-s">${imgFb('real-stress','real-street-walk','Concept image: a worried woman, hands on her head')}<figcaption>Photo · today</figcaption></figure></div>`,
  n:`<p>Open with a picture everyone in the room recognises. <b>Care has moved into the home</b>: a mother with a newborn, a father checking his sugar, a granddaughter looking after her bibi. Every one of these homes buys health products every month.</p><p>But the shopping has not moved with it. Walk through the five pains slowly, one example each. <b>Scattered</b>: nappies in one pharmacy, wipes in another. <b>Slow</b>: a queue just to ask which blood-pressure monitor to buy. <b>Untrusted</b>: registered and fake products on the same shelf. <b>Unplanned</b>: test strips finish on a Sunday night. <b>Far from family</b>: a son abroad sends money but cannot see whether it became his mother’s care.</p><p>Close the slide with one sentence: “Every one of these pains comes back every month, and that is why this is a business, not a favour.” Then move on; the evidence comes next.</p>`},
 /*2*/{h:`<h2 class="p0-T">The need is large, hidden and <em>not always safe.</em></h2>
   <div class="p0-tiles"><div class="p0-tile" style="--c:#ff9b87"><b>23.1%</b><p>of adults aged 18–69 in Tanzania have raised blood pressure (2023 survey) ${c(5)}</p></div><div class="p0-tile" style="--c:#ffb36b"><b>17.6%</b><p>of people with high blood pressure knew they had it (2012 survey) ${c(1)}</p></div><div class="p0-tile" style="--c:#f2c96b"><b>2.2%</b><p>had it under control in 2012: a huge, unmet need for checks and supplies ${c(1)}</p></div><div class="p0-tile" style="--c:#ff7b9c"><b>1 in 10</b><p>medical products in low- and middle-income countries is substandard or falsified ${c(2)}</p></div></div>
   <p class="p0-L" style="font-size:.95em">Blood-pressure data: WHO country profile, national STEPS survey 2012 (the latest national figure). Newer studies in section 1.2.</p>`,
  n:`<p>This slide answers the first question an investor asks: <b>is the problem real?</b> Read the numbers slowly and give each one its meaning.</p><p><b>Nearly one in four adults</b> aged 18 to 69 has raised blood pressure, according to the 2023 national STEPS survey published in 2026. That is a large group who need monitors, regular readings and advice. Then the striking part: <b>only 17.6% know they have it, and just 2.2% have it under control.</b> Most of the need is hidden. That is exactly why our free Afya Check sits at the door: it finds customers before they know they need us.</p><p>The last tile is about trust. WHO estimates <b>one in ten medical products</b> in low- and middle-income countries is substandard or falsified. For a family that means “registered only” is not a slogan; it is a reason to switch.</p><p>Be honest about the dates: the prevalence figure is from the 2023 survey, while the awareness and control figures are from 2012, the last survey that published them. Our own research in Dar will refresh both before launch. Investors trust founders who show the age of their data.</p>`},
 /*3*/{h:`<div class="p0-2c n"><div class="p0-rings">${rings}</div><div><h2 class="p0-T sm">One city is enough <em>to start.</em></h2><p class="p0-L">Dar es Salaam region had 5,383,728 people at the 2022 census ${c(3)}. Store #1 needs only a tiny share of them.</p>
   <div class="p0-big" style="margin-top:1.4em"><div><b>${(d.cityShare*100).toFixed(4)}%</b><span>of the city buying in store each day by month 12 (about ${Math.round(d.buyersDay)} buyers a day) · planning estimate</span></div><div><b>1 in ${num(Math.round(d.residentsPerMember/100)*100)}</b><span>residents as an Afya Box member by month 12 (${num(d.mem12)} members) · planning estimate</span></div><div><b>TSh 3.313T</b><span>sent home by the diaspora in 2024/25, money that can become a parent’s box ${c(4)}</span></div></div></div></div>`,
  n:`<p>The point of this slide is <b>proportion</b>. Investors worry that a new brand needs a huge share of the market to survive. Show them the opposite.</p><p>Dar es Salaam region alone had <b>5.38 million people</b> at the 2022 census. In the ${d.label.toLowerCase()} case, Store #1 needs about <b>${Math.round(d.buyersDay)} paying shoppers a day</b> by month 12. That is roughly ${(d.cityShare*100).toFixed(4)}% of the city each day. And <b>${num(d.mem12)} Afya Box members</b> by month 12 means about one resident in ${num(Math.round(d.residentsPerMember/100)*100)}. The circles are not to scale; if they were, the inner ones would be invisible.</p><p>Then point to the upside: Tanzanians abroad sent home <b>TSh 3.313 trillion</b> in 2024/25. A part of that already pays for medicine and care for parents. Our diaspora gift turns it into a visible box at the door.</p><p>Say clearly that the full market sizing, total, reachable and first target, is calculated step by step in section 1.3.</p>`},
 /*4*/{h:`<h2 class="p0-T sm">Six kinds of household, <em>one repeating need.</em></h2>
   <div class="p0-per">${[['Mama na mtoto','A new mother','Nappies, wipes, a thermometer and iron tablets, every month.','prod-baby'],['Mama mjamzito','An expectant mother','Pregnancy essentials, blood-pressure checks, a new-baby kit.','advice'],['Baba na kisukari','A father with diabetes','Test strips that fit his meter, lancets, pen needles, readings.','dad'],['Bibi na mjukuu','A grandmother and her carer','Adult diapers, a blood-pressure monitor, rental equipment.','real-elder-portrait'],['Mwana ughaibuni','A son working abroad','Pays for his mother’s box and sees it arrive at her door.','diaspora'],['Ofisi na shule','Offices and schools','First-aid supplies refilled on a fixed date, invoiced monthly.','prod-firstaid']].map(x=>`<div><span class="pi" style="${bgi(x[3])}"></span><small>${x[0]}</small><b>${x[1]}</b><p>${x[2]}</p></div>`).join('')}</div>
   <p class="p0-L" style="font-size:.8em;margin-top:.7em">Illustrative households · average Afya Box ${F.tsh(IN.members.avg_box)} a month · planning estimate · six full personas in section 1.4</p>`,
  n:`<p>Now make the customer human. These are <b>illustrative households</b>, not real people; say so. Pick two and tell their month in a sentence each.</p><p>The <b>mama na mtoto</b>: today she walks to three pharmacies with the baby on her back for nappies, wipes and iron tablets. With Afya Basics her Mama na mtoto box arrives at the start of the month. The <b>father with diabetes</b>: today his strips run out and the first pharmacy only has a brand that does not fit his meter. With us his meter is saved to his account, so the right strips come every month.</p><p>Then the <b>son abroad</b>, the one who surprises investors: he already sends money home. Paying for his mother’s box from his phone means he finally sees the care arrive.</p><p>Close on the number: our planning estimate for the average Afya Box is <b>${F.tsh(IN.members.avg_box)} a month</b>, with packing and delivery already inside the price. Each household is a monthly, repeating customer. Section 1.4 has the six full personas with their spend and journeys.</p>`},
 /*5*/{h:`<h2 class="p0-T sm">Four shifts make <em>this the moment.</em></h2>
   <div class="p0-why"><div><span class="pi" style="${bgi('real-health-check')}"></span><b>Chronic care at home</b><em>23.1%</em><p>of adults have raised blood pressure ${c(5)}, most unaware ${c(1)}. Care is a monthly routine now.</p></div><div><span class="pi" style="${bgi('real-woman-phone')}"></span><b>Mobile money is how people pay</b><em>&lt;30 s</em><p>to pay by a mobile-money push: fast checkout and monthly renewals become normal.</p></div><div><span class="pi" style="${bgi('real-street-walk')}"></span><b>A big city that keeps growing</b><em>5.38M</em><p>people in Dar es Salaam region in 2022 ${c(3)}: dense enough for same-day delivery.</p></div><div><span class="pi" style="${bgi('diaspora')}"></span><b>A diaspora that pays for care</b><em>TSh 3.3T</em><p>sent home in 2024/25 ${c(4)}, ready to become boxes for parents.</p></div></div>`,
  n:`<p>Answer <b>“why now?”</b> with four shifts that are already happening; we are not waiting for any of them.</p><p><b>First, chronic care has moved home.</b> One adult in four has high blood pressure, and most do not know it. Care is now a monthly routine, not a hospital visit. <b>Second, mobile money is simply how Tanzanians pay.</b> That lets us promise payment in under 30 seconds and automatic monthly renewals, the heart of the membership. We do not name or depend on one operator; we accept them all, plus card and cash.</p><p><b>Third, Dar es Salaam is big and dense</b>, 5.38 million people at the 2022 census, so same-day delivery on electric motorbikes becomes economic. <b>Fourth, the diaspora</b> sent TSh 3.313 trillion home in 2024/25. They already pay for family care; we give them a way to see it.</p><p>Transition: “So what did we design for this moment?”</p>`},
 /*6*/{h:`<div><h2 class="p0-T">One store. One membership. <em>One app.</em></h2><p class="p0-L">A brand-led health-essentials retailer with a membership engine: calm, curated, honestly priced, and built for Tanzanian homes.</p>
   <div class="p0-chips"><div><small>The store</small><b>Street-front flagship</b><p>Six Care Zones, ~${IN.product_families} product families, a free check at the door.</p></div><div><small>The membership</small><b>The Afya Box</b><p>Monthly boxes on 1, 6 or 12-month plans, brand swaps, zero clicks.</p></div><div><small>The digital layer</small><b>App and WhatsApp</b><p>Reorder in seconds, mobile money, diaspora gifts, same-day delivery.</p></div></div>
   <p class="p0-close" style="border:0;margin-top:1em;padding:0">Afya yako, nyumbani kwako.</p></div><span class="p0-ctag">Concept image</span>`,
  n:`<p>This is the reveal. Pause on the picture before speaking. It is a <b>concept image</b> of the flagship: a one-floor street-front store in Dar es Salaam with solid walls, barred display windows and wide open doors, so people outside see straight in.</p><p>Then say the positioning in one line: <b>we are a brand-led health-essentials retailer with a membership engine.</b> We are not a traditional pharmacy, not a supermarket aisle of everything, and not a queue at a counter.</p><p>Three parts work as one. <b>The store</b> is organised by life situation in six Care Zones, about ${IN.product_families} product families, registered products only, ${IN.brands_per_item} brands per item at one honest price. <b>The Afya Box</b> is the core: monthly boxes that renew themselves. <b>The app and WhatsApp</b> make reordering take seconds and let family abroad pay.</p><p>End with the motto, in Kiswahili first: <b>Afya yako, nyumbani kwako</b>, your health, at your home.</p>`},
 /*7*/{h:`<h2 class="p0-T sm">From a reading to the doorstep, <em>in minutes.</em></h2>
   <div class="p0-flow"><svg viewBox="0 0 1000 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0 34 H60 l8 -22 l10 40 l8 -18 H260 l8 -22 l10 40 l8 -18 H460 l8 -22 l10 40 l8 -18 H660 l8 -22 l10 40 l8 -18 H860 l8 -22 l10 40 l8 -18 H1000"/></svg>
   ${[[IN.check.quick_seconds+' s','Check','Quick check at the door; full 15-measurement check in about 4 minutes.'],['&lt;1 min','Choose','Right Care Zone, one price, 4–5 brands.'],['&lt;30 s','Pay','Scan-and-go, mobile money, SMS receipt.'],['0 clicks','Renew','The Afya Box renews itself monthly.'],['Same day','Deliver','Ordered before 15:00 in Dar.']].map(x=>`<div><span class="t">${x[0]}</span><b>${x[1]}</b><p>${x[2]}</p></div>`).join('')}</div>
   <div class="p0-spd"><span>Repeat order online <b>&lt;30 s</b></span><span>Click &amp; collect <b>&lt;2 h</b></span><span>WhatsApp answer <b>&lt;5 min</b></span><span>Diaspora gift <b>&lt;2 min</b></span><span>Find &amp; pay in store <b>&lt;3 min</b></span></div>`,
  n:`<p>Show that speed is a <b>promise we measure</b>, not a mood. Walk the line from left to right as one customer.</p><p>She comes in and takes the <b>quick check at the door</b>: blood pressure, pulse and oxygen in about ${IN.check.quick_seconds} seconds; the full ${IN.check.free_readings.length}-measurement check takes about ${IN.check.minutes} minutes. She walks to the right Care Zone and <b>chooses in under a minute</b> from ${IN.brands_per_item} registered brands at one price. She <b>pays in under 30 seconds</b> with a mobile-money push or the self-checkout; the TRA receipt arrives by SMS. Before she leaves, the adviser offers to save her basket as a monthly box, so next month it <b>renews with zero clicks</b> and arrives the <b>same day</b> if ordered before 15:00.</p><p>Point at the speed targets below the line: a repeat online order in under 30 seconds, click and collect in under two hours, a WhatsApp answer in under five minutes, a diaspora gift in under two minutes. Each one is designed into the one connected system, which is the next part of the story.</p>`},
 /*8*/{h:`<div class="p0-2c w"><div class="p0-xp">${imgFb('interior','exterior','Concept image of the Afya Basics interior')}${[[55,62],[64,30],[23,40],[33,20],[87,62],[16,72]].map((p,i)=>`<i style="left:${p[0]}%;top:${p[1]}%">${i+1}</i>`).join('')}<span class="p0-xcap">Concept image</span></div>
   <div><h2 class="p0-T sm">Calm, clean <em>and fast.</em></h2><ol class="p0-xl" style="margin-top:1.2em"><li><div><b>Signature counter</b>Advice, memberships and mobile money in one place.</div></li><li><div><b>Package and ad screens</b>Afya Box prices, free Afya Check and our ads.</div></li><li><div><b>Consultation room</b>Private advice and partner services.</div></li><li><div><b>Curated niches</b>Registered brands, digital prices.</div></li><li><div><b>Afya Check kiosk</b>15 free measurements in about 4 minutes.</div></li><li><div><b>Afya Box table</b>See every package before joining.</div></li></ol></div></div>`,
  n:`<p>Describe <b>the feeling we design for</b>: a customer walks in and thinks “this is calm, clean and modern; I know where to go; the price is fair; someone will help me if I want; I can pay in seconds.” That feeling is the benchmark every detail is judged against.</p><p>Then take them on a short tour using the numbers on the image, which is a <b>concept image</b>, not a finished design. <b>One</b>, the signature counter, where health advisers give advice, open memberships and take mobile money. <b>Two</b>, the screens behind it, which show the Afya Box packages with prices, the free Afya Check and our own ads. <b>Three</b>, the private consultation room, so the shop also works as a small clinic. <b>Four</b>, the lit oak niches: registered brands only, with digital prices, one honest price that is the same in the app. <b>Five</b>, the free Afya Check kiosk. <b>Six</b>, the Afya Box table, where customers see every package before they join.</p><p>Add that the store is run by about ${STAFFN} people at full strength, because the system does the routine work. Section 3.1 has the floor plan and the full walk-through.</p>`},
 /*9*/{h:`<div class="p0-2c"><figure class="p0-ph">${imgFb('real-health-check','interior','Concept image: a health worker checking an older woman’s blood pressure')}<figcaption>Photo · a free health check</figcaption></figure>
   <div><h2 class="p0-T sm">A free check that <em>starts the relationship.</em></h2>
   <div class="p0-ck"><div><b>${IN.check.free_readings.length}</b><small>Free measurements · about ${IN.check.minutes} min</small><ul>${['Blood pressure','Pulse','Blood oxygen (SpO2)','Body fat %'].map(x=>`<li>${esc(x)}</li>`).join('')}<li>+ 11 more</li></ul></div><div><b>${IN.check.paid_tests.length}</b><small>Optional tests · small fee</small><ul class="p0-hide-s">${IN.check.paid_tests.slice(0,4).map(x=>`<li>${esc(x[0])}</li>`).join('')}<li>+ more</li></ul></div></div>
   <div class="p0-funnel"><b>${IN.check.checks_day_m12}</b> checks a day by month 12 <i>→</i> <b>${F.pct(IN.check.check_to_purchase)}</b> buy <i>→</i> <b>${Math.round(CHECKBUY)}</b> purchases a day ${PE}</div></div></div>`,
  n:`<p>The Afya Check is our <b>front door and our trust engine</b>. It is free, always.</p><p>It gives <b>${IN.check.free_readings.length} free measurements in about ${IN.check.minutes} minutes</b>, including weight, BMI, body fat and temperature; a finger-prick glucose test is optional and paid. Results show on screen and arrive by SMS.</p><p>Stress the rule: <b>advisers explain readings in plain words and refer to a clinic when a reading needs a doctor. We never pressure anyone to buy.</b> Remember the earlier slide: only 17.6% of people with high blood pressure know it. The check finds them.</p><p>Then the business logic, as a planning estimate: about <b>${IN.check.checks_day_m12} checks a day by month 12</b>, and if ${F.pct(IN.check.check_to_purchase)} of them lead to a purchase, that is about <b>${Math.round(CHECKBUY)} sales a day</b> started by a free service. Readings saved with consent also show members their progress over months, which keeps them coming back.</p>`},
 /*10*/{h:`<h2 class="p0-T sm">Membership is the core, <em>not an add-on.</em></h2>
   <div class="p0-cards" style="margin-top:1.6em">${pc.map(k=>`<div class="p0-card" style="background:${cardCol[k.key]};${k.key==='royal'?'box-shadow:inset 0 0 0 1px #f2c96b;':''}"><small>Afya Basics</small><b>${esc(k.name)}</b><span>${k.fee_year?F.tsh(k.fee_year)+' / yr':'Free'}</span></div>`).join('')}</div>
   <p class="p0-L" style="font-size:.74em;margin-top:.8em;line-height:1.45;max-width:none"><b>${AFYA_PKG.count().home} household boxes</b> · mother &amp; baby, children &amp; teens, women &amp; men (Afya Glow, Afya Siku, Afya Men), the home, elderly care, long-term conditions · <b>Afya Kazini</b> for businesses and hotels (${AFYA_PKG.count().biz} packages)</p>
   <div class="p0-mrow"><div><b>${F.tsh(PLANP('m1'))}</b><span>monthly plan · ${F.tsh(PLANP('m6'))} on 6 months · ${F.tsh(PLANP('m12'))} on 12 months</span></div><div><b>${num(d.mem12)}</b><span>members by month 12 · ${d.label} case</span></div><div><b>${F.auto(d.mrr12)}</b><span>box sales in month 12 alone, renewing monthly</span></div></div>
   <p class="p0-L" style="font-size:.9em">Every box also carries <b>Afya Huduma</b>: a free monthly check in store, one partner service priced into the box (a baby massage every month in Mama na Mtoto), and partner add-ons that pay Afya 10% · average care-pack fee ${F.tsh(Math.round(M.services().avg_fee))} · ${F.tsh(Math.round(M.services().avg_margin)+Math.round(M.services().avg_comm))} extra gross profit per member a month · ${PE}</p>`,
  n:`<p>This is the slide that turns a shop into a <b>recurring-revenue business</b>. Health needs repeat every month, so the Afya Box turns one-off shoppers into planned, loyal households.</p><p>Explain the six cards from left to right: <b>Afya Green</b> is free for everyone, with points and reminders, and unlocks the personal boxes Afya Glow, Afya Siku, Afya Men and Huduma ya Kwanza; <b>Afya Family</b> for households with children (Mama Mjamzito, Mama na Mtoto, Afya Shule, Afya Binti, Afya Kijana, Afya Home); <b>Afya Care</b> for people living with a condition (Sukari, Presha, Figo, Kupona), with a monthly full check; <b>Afya Senior</b> for older parents and their carers (Bibi na Babu); <b>Afya Royal</b>, premium, with a personal adviser; and <b>Afya Kazini</b>, the business account for shops, restaurants, salons, workshops, offices and hotels.</p><p>Then the box itself, as planning estimates: about <b>${F.tsh(PLANP('m1'))} on the monthly plan</b>, ${F.tsh(PLANP('m6'))} on six months and ${F.tsh(PLANP('m12'))} on twelve. Members can swap brands up to 12 days before month end, and the box renews with zero clicks. <b>Packing and delivery are already inside the price</b>, paid by the customer.</p><p>In the ${d.label.toLowerCase()} case we plan <b>${num(d.mem12)} members by month 12</b>, bringing about <b>${F.auto(d.mrr12)}</b> of box sales in that month alone. If they ask about churn, the model assumes ${F.pct(IN.members.monthly_churn)} of members leave each month.</p><p>Then the second engine: <b>Afya Huduma</b>. Every box carries services as well as products. Take Mama na Mtoto: the baby is weighed and mama’s blood pressure is checked free in the store every month, and a partner baby-wellness studio gives one baby massage a month. The member pays ${F.tsh(M.services().rows.find(r=>r.k==='mama').fee)} a month for it inside the box; Afya pays the studio ${F.tsh(M.services().rows.find(r=>r.k==='mama').rate)} and keeps the difference. Extra services, such as postnatal physiotherapy, are booked in the app at member prices, and the partner pays Afya a 10% commission. Across all boxes that adds about <b>${F.tsh(Math.round(M.services().avg_margin)+Math.round(M.services().avg_comm))} of gross profit per member per month</b>. Say clearly that partner prices are planning estimates until we hold written quotations.</p><p>Businesses join the same way through <b>Afya Kazini</b>: a monthly kit that keeps a shop, salon, restaurant or factory ready under the OSH first-aid rules, with first-aid training and a fire-extinguisher service priced in. Every employee gets an Afya Staff Card, so each business becomes a channel to new family members.</p>`},
 /*11*/{h:`<div class="p0-2c n"><div class="p0-ring p0-hide-s">${ring}</div><div><h2 class="p0-T sm">One system lets <em>a small team run a store.</em></h2><p class="p0-L" style="font-size:1em">Record once: a sale updates stock, money, member points and the dashboard at the same moment.</p>
   <div class="p0-team">${IN.staff.map(s=>`<div><span>${esc(s[0].replace(/\s*\(.*\)/,''))} × ${s[1]}</span><b>${F.m(s[1]*s[2])}/mo</b></div>`).join('')}<div style="border-color:rgba(242,201,107,.4)"><span><b style="font-family:var(--f-body);color:var(--gold2)">21:00</b> daily WhatsApp report to the founders</span><b>${STAFFN} people · ${F.m(PAYROLL)}</b></div></div></div></div>`,
  n:`<p>Investors ask: <b>can it run simply, reliably and at low cost?</b> The answer is one connected system.</p><p>Point at the ring: till and checkout, catalogue and pricing, stock and reorder, members and boxes, orders and delivery, the Check Station, people, money, and reports. <b>Every action is recorded once</b>, and every screen updates from it. A sale updates stock, money, member points and the dashboard at the same moment. When an item reaches its reorder point, a purchase order is drafted for approval. The till keeps selling when the internet drops.</p><p>That is why a store runs with a small team: in the model, <b>${STAFFN} people</b> at full strength, a store lead who is ideally a physiotherapy graduate, four health advisers on two shifts, a picker and packer and two riders, about <b>${F.m(PAYROLL)} a month</b> in salaries.</p><p>And every night at <b>21:00</b> the founders receive the daily report on WhatsApp: sales, checks, new members, stock risks and issues. The founders can manage the store from a phone, wherever they are.</p>`},
 /*12*/{h:`<h2 class="p0-T sm">Why customers switch, <em>and stay.</em></h2>
   <table class="p0-mx"><thead><tr><th></th><th>Organised by need</th><th>Free health check</th><th>Registered only</th><th>Monthly box at home</th><th>One price everywhere</th></tr></thead>
   <tbody>${MX.map(rw=>`<tr class="${rw[0]==='Afya Basics'?'us':''}"><td>${rw[0]}</td>${rw.slice(1).map(v=>`<td><span class="p0-dot ${v}" aria-label="${v==='f'?'yes':v==='h'?'partly':'no'}"></span></td>`).join('')}</tr>`).join('')}</tbody></table>
   <p class="p0-L" style="font-size:.88em"><span class="p0-dot f"></span> yes <span class="p0-dot h" style="margin-left:1em"></span> partly / sometimes <span class="p0-dot o" style="margin-left:1em"></span> not usually · our assessment of typical competitor types, to be verified in section 5.3</p>`,
  n:`<p>Answer <b>“why will it win?”</b> without naming any company. We compare <b>types</b> of competitor, and this is our own assessment, to be verified by field research in section 5.3.</p><p>A <b>traditional pharmacy</b> is trusted for medicines but is not organised by life situation, rarely offers a free check, and does not deliver a planned monthly box. A <b>supermarket</b> has convenience but no advice. <b>Informal sellers</b> are close and cheap but cannot prove what is genuine. <b>Online marketplaces</b> deliver but cannot check, advise or guarantee registration for every seller.</p><p>Our moat is the <b>combination</b>: health advice and fast shopping in one visit, membership as the core, and one price in every channel. Each part is copyable alone; together, with the member data and habits they build, they are hard to copy.</p><p>Then the growth loop: <b>a free check brings people in, a good visit makes them buy, the box keeps them, and happy families refer others</b>, including relatives abroad.</p>`},
 /*13*/{h:`<div class="p0-2c w"><div class="p0-cbox"><h4>Year-1 operating profit by month · ${d.label}</h4>${profitBars(d)}</div>
   <div><h2 class="p0-T sm">${d.be?`Profitable month by month <em>from month ${d.be}.</em>`:`Year 1 is an investment year <em>in this case.</em>`}</h2>
   <div class="p0-fk" style="margin-top:1.2em"><div><b class="g">${F.auto(d.y1rev)}</b><span>Year-1 revenue: store, boxes and online</span></div><div><b class="${d.y1profit<0?'neg':''}">${F.auto(d.y1profit)}</b><span>Year-1 operating profit, before tax and financing</span></div><div><b>${F.m(d.opex)}</b><span>Running costs a month: rent, team, systems, marketing</span></div></div></div></div>
   <p class="p0-L" style="font-size:.85em;margin-top:.6em">${PE} · master model ${esc(IN.meta.version)} · switch Base / Best / Downside to compare</p>`,
  n:`<p>Now <b>does it make money?</b> Keep it simple and honest. Everything here is a <b>planning estimate</b> from the master model, ${d.label.toLowerCase()} case.</p><p>The bars are monthly operating profit in year 1: gross profit from store sales, boxes and online orders, minus all running costs of about <b>${F.m(d.opex)} a month</b>: rent, the team, utilities and internet, systems, marketing, the check station, insurance and packaging. ${d.be?`The store loses money while it ramps up, and <b>turns profitable in month ${d.be}</b>.`:'In this case the store does not reach a profitable month inside year 1.'}</p><p>Year-1 revenue is <b>${F.auto(d.y1rev)}</b> and year-1 operating profit is <b>${F.auto(d.y1profit)}</b>. Mention the customer-funded rule: every running cost is recovered inside a price the customer chooses to pay; delivery and packing sit inside the box price, so growth does not depend on discounts.</p><p>Then switch the scenario live: show the best case and the downside. Founders who show the bad case earn trust. Section 6.1 has the full profit and loss and cash flow.</p>`},
 /*14*/{h:`<div class="p0-2c w"><div class="p0-cbox"><h4>Revenue by year and number of stores · ${d.label}</h4>${revBars(d,{w:600,h:330})}</div>
   <div><h2 class="p0-T sm">From one store <em>to ${y12.stores} stores.</em></h2>
   <div class="p0-fk" style="margin-top:1.2em"><div><b>${d.firstB?'Year '+d.firstB.year:'—'}</b><span>first year above TSh 1 billion in revenue</span></div><div><b class="g">${F.auto(y12.revenue)}</b><span>year-12 revenue with ${y12.stores} stores</span></div><div><b class="${y12.ebitda<0?'neg':''}">${F.auto(y12.ebitda)}</b><span>year-12 operating profit after head office</span></div></div></div></div>
   <p class="p0-L p0-hide-s" style="font-size:.84em;margin-top:.5em">${regs.filter((x,i)=>[0,2,3,4,6,7].includes(i)).map(x=>`<b style="color:var(--gold2);font-family:var(--f-hud);font-weight:500">Y${x[0]}</b> ${esc(x[1])}`).join(' · ')}</p>`,
  n:`<p><b>How big can it get?</b> This is the road from one flagship to an East African chain, all planning estimates, ${d.label.toLowerCase()} case.</p><p>The plan opens stores one step at a time: <b>${IN.growth.stores_by_year.slice(0,5).join(', ')}</b> stores in the first five years and <b>${y12.stores} by year 12</b>. A second Dar store comes with a packing hub, then Arusha and Dodoma, Mwanza and Zanzibar, all major Tanzanian cities, and later Nairobi and Kampala pilots. Each new store ramps up over three years: about ${F.pct(IN.growth.ramp[0])} of a mature store’s sales in year one and ${F.pct(IN.growth.ramp[1])} in year two.</p><p>Revenue passes <b>TSh 1 billion in year ${d.firstB?d.firstB.year:'—'}</b>${d.firstTenB?` and TSh 10 billion in year ${d.firstTenB.year}`:''}, reaching <b>${F.auto(y12.revenue)}</b> in year 12 with an operating profit of <b>${F.auto(y12.ebitda)}</b> after head-office costs. Opening the stores after the first needs about <b>${F.auto(d.capex12)}</b> of capital over twelve years in this plan, funded in later rounds and from profits.</p><p>Group operating profit (EBITDA) turns positive in year ${(d.r.years.find(x=>x.ebitda>0)||{}).year||'—'}.</p><p>Be clear that each step is gated: we only open the next store when the last one meets its numbers. Section 5.4 shows the gates and all three scenarios.</p>`},
 /*15*/{h:`<div class="p0-2c"><div><h2 class="p0-T sm">${F.m(SEED.amount)} to open the flagship <em>and launch the box.</em></h2>
   <div class="p0-uf" style="margin-top:1.3em">${SEED.use.map(u=>`<div><span>${esc(u[0])}</span><b>${F.m(u[1])}</b><i><em style="width:${(u[1]/ufMax*100).toFixed(1)}%"></em></i></div>`).join('')}</div></div>
   <div><div class="p0-trs">${SEED.milestones.map((m,i)=>`<div><b>${SEED.tranches[i]*100}%</b><span><strong>Tranche ${i+1} · ${F.m(SEED.amount*SEED.tranches[i])}</strong>${esc(cap1(m.replace(/^Tranche \d \(\d+%\):\s*/,'')))}</span></div>`).join('')}</div>
   <p class="p0-L" style="font-size:.86em">${ISL()?'Start-small option':'Flagship option'} · Phase 0 costs (≈${F.m(SEED.phase0_gap.research_setup_costs)}) still to be placed</p></div></div>`,
  n:`<p>This is <b>the ask</b>. ${ISL()?`The start-small option asks for <b>${F.m(SEED.amount)}</b>: a ${IN.store.area_m2} m² store, partner riders and a manual check corner.`:`The flagship option asks for <b>${F.m(SEED.amount)}</b>: the ${IN.store.area_m2} m² prime-street store with the Afya Check kiosk.`}</p><p>Walk the use of funds from the largest line down: ${SEED.use.map(u=>`<b>${F.m(u[1])}</b> for ${u[0].toLowerCase()}`).join('; ')}. Every shilling buys something you could visit.</p><p>Then the protection for the investor: the money is <b>released in three tranches</b>. ${SEED.milestones.map((m,i)=>`${F.m(SEED.amount*SEED.tranches[i])} ${m.replace(/^Tranche (\d) \((\d+%)\):\s*/,'(tranche $1, $2) ')}`).join('. ')}. No tranche moves until its milestone is met.</p><p>Be open about the one open question: research, transport and setup costs before launch are about <b>${F.m(SEED.phase0_gap.research_setup_costs)}</b> against a Phase 0 budget of ${F.tsh(SEED.phase0_gap.phase0_budget)}. Either the round grows or the founders pre-fund it; we will confirm before signing. Section 6.3 has the detail.</p>`},
 /*16*/{h:`<div class="p0-2c n"><div class="p0-own">${donut()}<div class="p0-lg"><div><i style="background:#5fbf8f"></i>Founders<b>${P(OWN.founders_after_seed)}</b></div><div><i style="background:#f2c96b"></i>Seed investors<b>${P(OWN.seed_investor_share)}</b></div><div><i style="background:#d9b56e"></i>Option pool<b>${P(OWN.option_pool)}</b></div><div style="margin-top:.4em;font-size:.82em"><i style="background:none;border:1.5px dashed #fff"></i>Founders’ floor for life<b>${P(OWN.founders_floor)}</b></div></div></div>
   <div><h2 class="p0-T sm">Grow with us, <em>store by store.</em></h2><p class="p0-L" style="font-size:1em">Illustrative split after the seed round: ${F.m(SEED.amount)} for ${P(OWN.seed_investor_share)} implies a post-money value of about ${F.m(POSTMONEY)}. Founders keep at least ${P(OWN.founders_floor)} for life, protected legally. Legal review needed.</p>
   <p class="p0-close">Afya yako, nyumbani kwako.<br><span style="font-size:.6em;color:var(--ink2)">Your health, at your home. Thank you.</span></p></div></div>`,
  n:`<p>Finish with <b>what the investor gets</b>, then close with a clear next step.</p><p>The split on the chart is <b>illustrative</b> and needs legal review: after the seed round the founders hold about ${P(OWN.founders_after_seed)}, seed investors ${P(OWN.seed_investor_share)} and an option pool of ${P(OWN.option_pool)} for key staff. ${F.m(SEED.amount)} for ${P(OWN.seed_investor_share)} implies a post-money value of about <b>${F.m(POSTMONEY)}</b>; say it is a starting point for discussion, not a fixed offer.</p><p>Explain the dashed line: whatever happens in later rounds, <b>the founders keep ${P(OWN.founders_floor)} of the company for life</b>, protected in the company documents. That keeps the people who built it committed for the twelve-year plan. The split between the two founders is still open and does not affect investors.</p><p>Close with the motto and a clear next step: “Afya yako, nyumbani kwako. We would like to walk you through the data room and the master model. Which part would you like to see first?” Then stop and listen.</p>`}];}

const QSW=['Je, tatizo ni halisi na kubwa?','Nani hasa analo?','Kwa nini sasa?','Suluhisho ni nini?','Inafanyaje kazi?','Kwa nini itashinda?','Je, inapata pesa?','Inaweza kukua kiasi gani?','Mnataka nini, nami napata nini?'];
const STITLE_SW=['Tatizo','Ushahidi','Soko','Wateja wetu','Kwa nini sasa','Suluhisho','Jinsi inavyofanya kazi','Uzoefu','Afya Check','Uanachama','Injini','Ukuaji na ngome','Fedha','Njia ya mabilioni','Ombi na matumizi ya fedha','Umiliki na hitimisho'];
const PROOF=['s1-1','s1-2','s1-3','s1-4','s1-5','s2-1','s3-2','s3-1','s3-3','s3-4','s4-1','s5-3','s6-1','s5-4','s6-3','s6-4'];
const SLIDE_SW=d=>[
 ['Huduma imehamia nyumbani. <em>Upatikanaji wa mahitaji haujafuata.</em>','Familia za Kitanzania sasa zinahudumia watoto, ujauzito, shinikizo la damu, kisukari na wazazi wazee nyumbani. Mahitaji ya huduma hiyo bado yananunuliwa bidhaa moja, duka moja, foleni moja kwa wakati.'],
 ['Hitaji ni kubwa, limejificha na <em>si salama kila mara.</em>','Takwimu za shinikizo la damu: WHO, utafiti wa kitaifa wa STEPS 2012 (takwimu za karibuni za kitaifa). Tafiti mpya zaidi katika sehemu 1.2.'],
 ['Jiji moja linatosha <em>kuanza.</em>',`Mkoa wa Dar es Salaam ulikuwa na watu 5,383,728 kwenye sensa ya 2022 ${c(3)}. Duka #1 linahitaji sehemu ndogo tu yao.`],
 ['Aina sita za kaya, <em>hitaji moja linalojirudia.</em>',`Kaya za mfano · wastani wa Afya Box ${F.tsh(IN.members.avg_box)} kwa mwezi · makadirio · watu sita kamili katika sehemu 1.4`],
 ['Mabadiliko manne yanafanya <em>huu kuwa wakati sahihi.</em>',null],
 ['Duka moja. Uanachama mmoja. <em>Programu moja.</em>','Muuzaji wa bidhaa za afya anayeongozwa na chapa, mwenye injini ya uanachama: tulivu, bidhaa zilizochaguliwa, bei ya haki, na amejengwa kwa ajili ya nyumba za Kitanzania.'],
 ['Kutoka kipimo hadi mlangoni, <em>kwa dakika.</em>',null],
 ['Tulivu, safi <em>na haraka.</em>',null],
 ['Kipimo cha bure <em>kinachoanzisha uhusiano.</em>',null],
 ['Uanachama ndio kiini, <em>si nyongeza.</em>',`Badilisha chapa hadi siku 12 kabla ya mwisho wa mwezi (Afya Choice) · ukumbusho kwa simu, SMS, barua pepe na WhatsApp · ufungaji na usafirishaji ndani ya bei · kila box ina <b>Afya Huduma</b>: kipimo cha bure dukani kila mwezi, huduma moja ya mshirika ndani ya bei, na huduma za ziada ambazo mshirika hulipa Afya 10% · ${PE}`],
 ['Mfumo mmoja unaruhusu <em>timu ndogo kuendesha duka.</em>','Rekodi mara moja: mauzo yanasasisha stoo, fedha, pointi za mwanachama na dashibodi papo hapo.'],
 ['Kwa nini wateja wanahamia, <em>na kubaki.</em>','<span class="p0-dot f"></span> ndiyo <span class="p0-dot h" style="margin-left:1em"></span> kiasi / mara nyingine <span class="p0-dot o" style="margin-left:1em"></span> si kawaida · tathmini yetu ya aina za washindani, itathibitishwa sehemu 5.3'],
 [d.be?`Faida kila mwezi <em>kuanzia mwezi ${d.be}.</em>`:'Mwaka wa 1 ni mwaka wa uwekezaji <em>katika hali hii.</em>',`${PE} · modeli kuu ${esc(IN.meta.version)} · badilisha Base / Best / Downside kulinganisha`],
 [`Kutoka duka moja <em>hadi maduka ${d.y12.stores}.</em>`,null],
 [`${F.m(SEED.amount)} ${ISL()?'kufungua duka la kwanza':'kufungua duka kuu'} <em>na kuzindua box.</em>`,`${ISL()?'Chaguo la kuanza kidogo':'Chaguo la duka kuu'} · gharama za awamu 0 (≈${F.m(SEED.phase0_gap.research_setup_costs)}) bado kupangwa`],
 ['Kua pamoja nasi, <em>duka kwa duka.</em>',`Mgawanyo wa mfano baada ya awamu ya mbegu: ${F.m(SEED.amount)} kwa ${P(OWN.seed_investor_share)} unamaanisha thamani ya baada ya uwekezaji ya takriban ${F.m(POSTMONEY)}. Waanzilishi wanabaki na angalau ${P(OWN.founders_floor)} maisha yote, kisheria. Ukaguzi wa kisheria unahitajika.`]];
function slideOne(d,S,SW,i,on){const q=Q[SQ[i]],im=SIMG[i],x=S[i],sw=SW[i];
 let h=x.h.replace(/(<h2 class="p0-T[^"]*">)([\s\S]*?)(<\/h2>)/,(m,a,b,c2)=>a+L(b,sw[0])+c2);
 if(sw[1])h=h.replace(/(<p class="p0-L[^"]*"[^>]*>)([\s\S]*?)(<\/p>)/,(m,a,b,c2)=>a+L(b,sw[1])+c2);
 const pr=ALL.find(z=>z.id===PROOF[i]);
 return `<section class="p0-slide${on?' on':''}" data-i="${i}" style="--qc:${q[2]}" aria-roledescription="slide" aria-label="Slide ${i+1} of 16: ${esc(STITLE[i])}" ${on?'':'aria-hidden="true"'}>
   ${im?`<div class="p0-sbg${i===5?'':' dim'}" style="${bgi(im[0],im[1])};background-position:${SPOS[i]}"></div>`:''}
   <header class="p0-sh"><span class="p0-q"><i></i>${q[0]} · ${L(q[1],QSW[SQ[i]])}</span><span class="p0-sn">${pad(i+1)} / 16</span></header>
   <div class="p0-sb">${h}</div>
   <footer class="p0-sf"><span class="p0-proof">${L('Proof','Uthibitisho')} · ${pr?`<a href="#${pr.id}">${pr.no} ${esc(pr.title)} ↗</a>`:''}</span><span>${L(STITLE[i],STITLE_SW[i])} · <b>${d.label}</b> · ${L('planning estimates','makadirio')}</span></footer></section>`}
function deckHTML(d){const S=slides(d),SW=SLIDE_SW(d);return S.map((x,i)=>slideOne(d,S,SW,i,i===dI)).join('')}

function render02(s,p,pv,nx){REFRESH();addCSS('part0',CSS);addCSS('p0v',CSS2);p0kon();const d=D(dSc);
 const tot=BUDGET.reduce((a,b)=>a+b,0);
 let acc=0,tl='';const W=1000;
 BUDGET.forEach((b,i)=>{const x=acc/tot*W,w=b/tot*W;const q=Q[SQ[i]];tl+=`<g class="seg" data-i="${i}" tabindex="0" role="button" aria-label="Slide ${i+1}: ${esc(STITLE[i])}, ${b} seconds"><rect x="${x+1}" y="28" width="${w-2}" height="46" rx="6" fill="${q[2]}" fill-opacity=".85"/><text x="${x+w/2}" y="56" text-anchor="middle" style="font:600 13px var(--f-hud);fill:#04100d">${i+1}</text><text x="${x+w/2}" y="92" text-anchor="middle" class="p0-ax" style="font-size:9.5px">${b}s</text></g>`;acc+=b});
 for(let m=0;m<=10;m++){const x=m/10*W;tl+=`<line x1="${x}" x2="${x}" y1="14" y2="24" stroke="rgba(242,201,107,.6)"/><text x="${x}" y="10" text-anchor="${m===0?'start':m===10?'end':'middle'}" class="p0-ax">${m}:00</text>`}
 tl+=`<line id="p0now" x1="0" x2="0" y1="20" y2="80" stroke="#fff" stroke-width="2"/>`;
 const qslides=Q.map((q,qi)=>SQ.map((v,i)=>v===qi?i:-1).filter(i=>i>=0));
 const CANVA=(typeof window.AFYA_CANVA_DECK_URL==='string'&&/^https?:\/\//.test(window.AFYA_CANVA_DECK_URL))?window.AFYA_CANVA_DECK_URL:'';
 const KEYS=[[['←','→'],'Move between slides','Hamisha slaidi','Arrow keys, Page Up / Page Down, swipe on a phone, or the buttons. Home and End jump to the first and last slide.','Vitufe vya mishale, Page Up / Page Down, telezesha kwenye simu, au vitufe. Home na End zinaruka slaidi ya kwanza na ya mwisho.'],
  [['T'],'Start the ten-minute timer','Anzisha kipima muda','Counts down from 10:00; every slide has its own time budget, and the pace panel says if you are ahead or behind.','Inahesabu kuanzia 10:00; kila slaidi ina muda wake, na paneli inaonyesha kama uko mbele au nyuma.'],
  [['P'],'Presenter mode','Hali ya mwasilishaji','Current slide, next-slide preview, full notes and the clock on one screen. Put the audience view on the projector.','Slaidi ya sasa, slaidi inayofuata, maelezo kamili na saa kwenye skrini moja.'],
  [['R'],'Rehearse with auto-advance','Mazoezi yanayojisogeza','Each slide moves on when its budget runs out, at 1×, 2× or 5× speed, so you learn the rhythm of ten minutes.','Kila slaidi inasonga muda wake ukiisha, kwa kasi ya 1×, 2× au 5×, ili ujifunze mdundo wa dakika kumi.'],
  [['N','G'],'Notes and overview','Maelezo na muhtasari','N shows or hides the speaker notes; G opens a grid of all sixteen slides to jump anywhere when a question comes.','N inaonyesha au kuficha maelezo; G inafungua gridi ya slaidi zote kumi na sita.'],
  [['F','1','2','3'],'Full screen and scenarios','Skrini nzima na hali','F for full screen. 1, 2 and 3 switch Base, Best and Downside: every number on every slide and in the notes updates.','F kwa skrini nzima. 1, 2 na 3 zinabadilisha hali: kila namba kwenye kila slaidi inasasishwa.'],
  [['?'],'All shortcuts','Njia zote za mkato','Opens this list on top of the deck, any time. Esc closes any panel.','Inafungua orodha hii juu ya wasilisho wakati wowote. Esc inafunga paneli yoyote.'],
  [['Esc'],'Close panels','Funga paneli','Closes the overview, the help panel or presenter mode.','Inafunga muhtasari, msaada au hali ya mwasilishaji.']];
 const mods=[
 ['The problem it solves',`<div class="plain"><span class="modno" style="margin:0 0 12px">${L('In plain words','Kwa maneno rahisi')}</span><ol>
   <li>${L('<b>An interested investor gives you about ten minutes.</b> In that time they must understand the problem, believe the numbers and know exactly what you are asking for. If the story wanders, the meeting ends with “send me something”.','<b>Mwekezaji mwenye shauku anakupa takriban dakika kumi.</b> Katika muda huo lazima aelewe tatizo, aamini namba na ajue hasa unachoomba. Hadithi ikizunguka, mkutano unaisha kwa “nitumie kitu”.')}</li>
   <li>${L('<b>A website is too big for a meeting.</b> Thirty-six sections are perfect for checks, but in a room you need one clear line from problem to ask, at a steady pace, with the right number on the screen at the right moment.','<b>Tovuti ni kubwa mno kwa mkutano.</b> Sehemu thelathini na sita ni nzuri kwa uchunguzi, lakini chumbani unahitaji mstari mmoja wazi kutoka tatizo hadi ombi, kwa mwendo thabiti.')}</li>
   <li>${L('<b>Numbers must not disagree.</b> If the deck says one revenue figure and the financials say another, trust is gone. A deck typed by hand drifts away from the model the day an assumption changes.','<b>Namba hazipaswi kutofautiana.</b> Wasilisho likisema mapato fulani na hesabu zikasema mengine, imani inapotea. Wasilisho lililoandikwa kwa mkono linapotoka kwenye modeli siku dhana inapobadilika.')}</li>
   <li>${L('<b>Presenting is a skill you rehearse.</b> Most founders run out of time on slide nine. A timer per slide, a presenter view and a timed run-through let you practise the exact ten minutes before you walk into the room.','<b>Kuwasilisha ni ujuzi unaofanyiwa mazoezi.</b> Waanzilishi wengi wanaishiwa muda kwenye slaidi ya tisa. Kipima muda kwa kila slaidi, mtazamo wa mwasilishaji na mazoezi yenye muda vinakuwezesha kufanya mazoezi ya dakika kumi kamili.')}</li>
   <li>${L('<b>So the presentation lives inside the showroom.</b> Every number on every slide is read live from the master model, every slide carries a proof link to the section behind it, and the presenter has the timer, the notes and the scenarios in front of them.','<b>Kwa hiyo wasilisho linaishi ndani ya showroom.</b> Kila namba inasomwa moja kwa moja kutoka modeli kuu, kila slaidi ina kiungo cha uthibitisho, na mwasilishaji ana kipima muda, maelezo na hali zote mbele yake.')}</li></ol></div>`],
 ['Our answer · nine questions, sixteen slides',`<p class="s11lead">${L('The deck follows the nine questions an investor asks, in the order they ask them. Each column is a question; the buttons jump straight to its slides in the presentation below.','Wasilisho linafuata maswali tisa anayouliza mwekezaji, kwa mpangilio anaouliza. Kila safu ni swali; vitufe vinaruka moja kwa moja hadi slaidi zake.')}</p>
  <div class="p0-qmap">${Q.map((q,qi)=>`<div class="p0-qm" style="--qc:${q[2]}"><small>${q[0]}</small><b>${L(q[1],QSW[qi])}</b><span>${qslides[qi].map(i=>`<button type="button" data-go="${i}" title="${esc(STITLE[i])}">${pad(i+1)}</button>`).join('')}</span></div>`).join('')}</div>
  <p class="s11lead" style="margin-top:34px">${L('Under the nine questions sits one story in three acts, and every slide carries a real concept photograph so the room sees the business, not just reads it.','Chini ya maswali tisa kuna hadithi moja yenye sehemu tatu, na kila slaidi ina picha ya dhana ili chumba kione biashara, si kusoma tu.')}</p>
  ${p0kmos([['real-empty-shelf','Concept image: half-empty shop shelves',L('Act 1 · Today (slides 1–5)','Sehemu 1 · Leo (slaidi 1–5)'),L('The problem told through one mother: three shops, a queue, an empty shelf. Then the evidence, the market, the households and why now.','Tatizo kupitia mama mmoja: maduka matatu, foleni, rafu tupu. Kisha ushahidi, soko, kaya na kwa nini sasa.'),'50% 30%'],['scan','Concept image: a man scanning a product with his phone at a shelf inside the Afya Basics store',L('Act 2 · Afya Basics (slides 6–12)','Sehemu 2 · Afya Basics (slaidi 6–12)'),L('The store, the Afya Check, the Afya Box and the one system, shown as the customer sees them, ending with why families switch and stay.','Duka, Afya Check, Afya Box na mfumo mmoja, kama mteja anavyoviona, ikimalizia kwa nini familia zinahamia na kubaki.'),'55% 45%'],['real-elder-physio','Concept image: a carer helping an older man with arm exercises at home',L('Act 3 · The business (slides 13–16)','Sehemu 3 · Biashara (slaidi 13–16)'),L('Money, growth to '+D('base').y12.stores+' stores, the '+F.m(SEED.amount)+' ask in tranches and what the investor owns.','Fedha, ukuaji hadi maduka '+D('base').y12.stores+', ombi la '+F.m(SEED.amount)+' kwa awamu na anachomiliki mwekezaji.'),'50% 40%']])}`],
 ['How it works · the presenter’s controls',`<p class="s11lead">${L('Built to be presented from a laptop, on a projector or full screen, and rehearsed beforehand. Everything can be done from the keyboard, so the presenter never hunts for a button in front of investors. Press <b>?</b> at any time inside the deck to see this list.','Imejengwa kuwasilishwa kutoka kompyuta, kwenye projekta au skrini nzima, na kufanyiwa mazoezi kabla. Kila kitu kinaweza kufanywa kwa kibodi. Bonyeza <b>?</b> wakati wowote kuona orodha hii.')}</p>
  <div class="p0-keys">${KEYS.map(k=>`<div class="p0-key">${k[0].map(x=>`<kbd>${x}</kbd>`).join('')}<b>${L(k[1],k[2])}</b><p>${L(k[3],k[4])}</p></div>`).join('')}</div>`],
 ['The experience · the ten minutes, drawn',`<p class="s11lead">${L('The meeting as a line: sixteen slides, each with its time budget, coloured by the investor question it answers. The white marker follows the timer while you present; click any block to jump to that slide.','Mkutano kama mstari: slaidi kumi na sita, kila moja na muda wake, kwa rangi ya swali inalojibu. Alama nyeupe inafuata kipima muda; bofya kipande chochote kuruka slaidi hiyo.')}</p>
  <div class="p0-tl"><svg viewBox="-4 0 1008 100" role="img" aria-label="Ten-minute timeline of the sixteen slides">${tl}</svg>
   <div class="p0-tll">${Q.map((q,qi)=>`<span style="--qc:${q[2]}"><i></i>${q[0]} ${L(q[1],QSW[qi])}</span>`).join('')}</div></div>
  <div class="p0-cv"><div class="ph">${p0kimg('exterior','Concept image: the Afya Basics street-front store, cover of the Canva deck','50% 45%')}<span>${L('Canva deck · cover','Wasilisho la Canva · jalada')}</span></div>
   <div class="tx"><h4>${L('Download the Canva deck','Pakua wasilisho la Canva')}</h4><p>${L('The same sixteen slides and speaker notes, designed in Canva in Afya royal green and white, for meetings, email attachments and printing. From Canva it downloads as PowerPoint or PDF. The live deck on this page stays the source of truth for the numbers; the Canva file is dated with the model version it was made from.','Slaidi zilezile kumi na sita na maelezo, zilizobuniwa kwa chapa ya Afya ndani ya Canva, kwa mikutano, viambatisho vya barua pepe na kuchapisha. Kutoka Canva inapakuliwa kama PowerPoint au PDF. Wasilisho hai la ukurasa huu linabaki chanzo cha kweli cha namba.')}</p>
   <div class="row">${CANVA?`<a class="btn solid" href="${esc(CANVA)}" target="_blank" rel="noopener">${I.down} ${L('Open the Canva deck','Fungua wasilisho la Canva')}</a>`:`<span class="pend"><i></i>${L('Canva deck in production','Wasilisho la Canva linatengenezwa')}</span>`}<small>${L('Model','Modeli')} ${esc(IN.meta.version)} · 16 ${L('slides','slaidi')} · 16:9</small></div></div></div>`],
 ['Try it · the presentation',`<div class="p0-deck" id="p0deck" tabindex="-1">
   <div class="p0-top"><span class="ttl">Afya Basics · <b>${L('The ten-minute presentation','Wasilisho la dakika kumi')}</b></span>
    <div class="p0-sc" id="p0sc2" role="group" aria-label="Scenario">${SC.map(x=>`<button type="button" data-k="${x[0]}" class="${x[0]===dSc?'on':''}" aria-pressed="${x[0]===dSc}">${x[1]}</button>`).join('')}</div></div>
   <div class="p0-stage" id="p0stage" aria-live="polite"><div class="p0-prog" id="p0prog"></div><div id="p0slides">${deckHTML(d)}</div>
    <div class="p0-ov" id="p0ov" aria-label="All slides"><div class="p0-ovg">${STITLE.map((t,i)=>{const q=Q[SQ[i]],im=SIMG[i];return `<button type="button" data-go="${i}" style="--qc:${q[2]}"><span class="im${im?'':' nob'}" ${im?`style="${bgi(im[0],im[1])}"`:''}></span><span class="tx"><small><span>${pad(i+1)} · ${q[0]}</span><span>${BUDGET[i]}s</span></small><b>${L(t,STITLE_SW[i])}</b></span></button>`}).join('')}</div></div></div>
   <div class="p0-bar0">
    <button type="button" class="p0-ib" id="p0first" aria-label="First slide">${I.restart}</button>
    <button type="button" class="p0-ib" id="p0dprev" aria-label="Previous slide">${I.prev}</button>
    <span class="p0-cnt" id="p0cnt"><b>01</b> / 16</span>
    <button type="button" class="p0-ib pri" id="p0dnext" aria-label="Next slide">${I.next}</button>
    <span class="p0-sp"></span>
    <button type="button" class="p0-ib on" id="p0nb" aria-pressed="true">${I.notes}<span class="lbl">${L('Notes','Maelezo')}</span></button>
    <button type="button" class="p0-ib" id="p0gb" aria-pressed="false">${I.grid}<span class="lbl">${L('Overview','Muhtasari')}</span></button>
    <button type="button" class="p0-ib" id="p0pb" aria-pressed="false">${I.pres}<span class="lbl">${L('Presenter','Mwasilishaji')}</span></button>
    <button type="button" class="p0-ib" id="p0rb" aria-pressed="false">${I.rehearse}<span class="lbl">${L('Rehearse','Mazoezi')}</span></button>
    <button type="button" class="p0-ib" id="p0fb">${I.full}<span class="lbl">${L('Full screen','Skrini nzima')}</span></button>
    <button type="button" class="p0-ib" id="p0hb" aria-label="Keyboard shortcuts">${I.help}</button>
    <div class="p0-tmr"><div><small>${L('Time left','Muda uliobaki')}</small><span class="big" id="p0left">10:00</span></div><button type="button" class="p0-ib pri" id="p0tb" aria-label="Start timer">${I.play}</button><button type="button" class="p0-ib" id="p0tr" aria-label="Reset timer">${I.reset}</button></div>
   </div>
   <div class="p0-rh" id="p0rh"><b>${L('Rehearsal','Mazoezi')}</b><span class="cd" id="p0rcd">0:35</span><div class="rb"><i id="p0rbar"></i></div><span class="spd" id="p0rspd">${[1,2,5].map(x=>`<button type="button" data-s="${x}" class="${x===1?'on':''}">${x}×</button>`).join('')}</span><span class="msg" id="p0rmsg"></span><button type="button" class="p0-ib" id="p0rstop">${L('Stop','Simamisha')}</button></div>
   <div class="p0-strip" id="p0strip">${BUDGET.map((b,i)=>`<button type="button" data-go="${i}" style="flex:${b};--qc:${Q[SQ[i]][2]}" aria-label="Slide ${i+1}, ${b} seconds"><i></i></button>`).join('')}</div>
   <div class="p0-low">
    <div class="p0-notes" id="p0notes"><h4>${L('Speaker notes','Maelezo ya mzungumzaji')} <span id="p0nh">Slide 01 · ${STITLE[0]}</span></h4><div class="nt" id="p0nt"></div></div>
    <div class="p0-pace"><div><small>${L('This slide','Slaidi hii')}</small><b id="p0sl">0:00 / ${mmss(BUDGET[0])}</b><div class="bud" id="p0bud"><i></i></div></div><div><small>${L('Pace','Mwendo')}</small><span class="st ok" id="p0pace">Timer not started</span></div><div><small>${L('Elapsed','Muda uliopita')}</small><b id="p0el">0:00 / 10:00</b></div></div>
   </div>
   <div class="p0-help" id="p0help" role="dialog" aria-label="Keyboard shortcuts"><div class="in"><h4>${L('Keyboard shortcuts','Njia za mkato za kibodi')}<button type="button" class="p0-ib" id="p0hx" aria-label="Close">${I.close}</button></h4><dl>${KEYS.map(k=>`<div><dt>${k[0].map(x=>`<kbd>${x}</kbd>`).join('')}</dt><dd>${L(k[1],k[2])}</dd></div>`).join('')}</dl></div></div>
  </div>
  <p class="note">${L('Concept images · every number read live from the master model · planning estimates · speaker notes in English and Kiswahili','Picha za dhana · kila namba kutoka modeli kuu · makadirio · maelezo ya mzungumzaji kwa Kiswahili na Kiingereza')}</p>${PNOTE()}`,'p0try2'],
 ['Slide 10, opened up · the services and partner layer',`<p class="s11lead">${L('Slide 10 now carries the services layer. When an investor asks how membership earns more than product margin, open this panel: pick any box and the working is on screen.','Slaidi 10 sasa inabeba safu ya huduma. Mwekezaji akiuliza uanachama unapataje zaidi ya faida ya bidhaa, fungua sehemu hii.')}</p>${hudumaHTML('p0h2',true)}`,'p0huduma2'],
 ['Afya Kazini · the business membership, for the Q&A',`<p class="s11lead">${L('When an investor asks where business customers fit, open this panel. It shows the three sizes, the price working for each small-business sector, and what Kazini adds to year 1.','Mwekezaji akiuliza wateja wa biashara wanaingiaje, fungua sehemu hii.')}</p>${kaziniHTML('p0k2',true)}`,'p0kazini2'],
 ['Rehearse it · presenter mode and timed run-through',`<p class="s11lead">${L('Ten minutes is short. The difference between a good meeting and a lost one is usually pace: too long on the problem, a rush through the money. Two tools turn the deck into a rehearsal room.','Dakika kumi ni chache. Tofauti kati ya mkutano mzuri na uliopotea kwa kawaida ni mwendo: muda mrefu kwenye tatizo, haraka kwenye fedha. Zana mbili zinageuza wasilisho kuwa chumba cha mazoezi.')}</p>
  <div class="p0-rgrid">
   <div><small>${L('Presenter mode · P','Hali ya mwasilishaji · P')}</small><h4>${L('Everything you need, on your screen only','Kila unachohitaji, kwenye skrini yako pekee')}</h4><p>${L('The current slide large, the next slide small so you can lead into it, the full speaker notes, the countdown clock and the time budget for this slide, all on one screen.','Slaidi ya sasa kubwa, inayofuata ndogo ili uiingie vizuri, maelezo kamili, saa ya kuhesabu na muda wa slaidi hii, vyote kwenye skrini moja.')}</p><div class="cta" style="margin-top:14px"><button type="button" class="btn solid" id="p0pb2">${I.pres} ${L('Open presenter mode','Fungua hali ya mwasilishaji')}</button></div></div>
   <div><small>${L('Rehearsal · R','Mazoezi · R')}</small><h4>${L('Let the deck set the rhythm','Acha wasilisho liweke mdundo')}</h4><p>${L('Each slide advances by itself when its budget runs out: 35 to 45 seconds, 10:00 in total. Speak along with it. At 2× or 5× you can preview the flow in two or five minutes.','Kila slaidi inasonga yenyewe muda wake ukiisha: sekunde 35 hadi 45, jumla 10:00. Ongea pamoja nayo. Kwa 2× au 5× unaweza kuona mtiririko kwa dakika mbili au tano.')}</p><div class="cta" style="margin-top:14px"><button type="button" class="btn line" id="p0rb2">${I.rehearse} ${L('Start a rehearsal','Anza mazoezi')}</button></div></div>
   <div><small>${L('Before the meeting','Kabla ya mkutano')}</small><h4>${L('A five-point checklist','Orodha ya mambo matano')}</h4><ul><li>${L('Run one full rehearsal at 1× with the timer.','Fanya mazoezi kamili mara moja kwa 1×.')}</li><li>${L('Switch to Downside once and practise the answer.','Badilisha kwenda hali mbaya mara moja na ufanyie mazoezi jibu.')}</li><li>${L('Open the proof link on slides 2, 13 and 15.','Fungua viungo vya uthibitisho kwenye slaidi 2, 13 na 15.')}</li><li>${L('Print the one-page summary from 0.1 as a handout.','Chapisha muhtasari wa ukurasa mmoja kutoka 0.1.')}</li><li>${L('End on the question: “Which part would you like to see first?”','Malizia kwa swali: “Ungependa kuona sehemu ipi kwanza?”')}</li></ul></div>
  </div>`],
 ['The numbers · what the deck quotes, in all three cases',`<p class="s11lead">${L('The key figures the presenter says out loud, side by side. They change on the slides when the scenario changes.','Namba kuu anazotaja mwasilishaji, pembeni kwa pembeni. Zinabadilika kwenye slaidi hali inapobadilika.')} ${PE}</p>
  <div class="p0-tblw"><table class="p0-tbl"><thead><tr><th>${L('Figure','Kipimo')}</th>${SC.map(x=>`<th>${x[1]}</th>`).join('')}</tr></thead><tbody>${(()=>{const ds=SC.map(x=>D(x[0]));const rows=[[L('Year-1 revenue','Mapato mwaka 1'),x=>F.auto(x.y1rev)],[L('Year-1 operating profit','Faida ya uendeshaji mwaka 1'),x=>F.auto(x.y1profit)],[L('Break-even month','Mwezi wa kufikia faida'),x=>x.be?L('Month '+x.be,'Mwezi '+x.be):L('After Y1','Baada ya mwaka 1')],[L('Running costs a month','Gharama za uendeshaji kwa mwezi'),x=>F.m(x.opex)],[L('Afya Box members, month 12','Wanachama wa Afya Box, mwezi 12'),x=>num(x.mem12)],[L('Box sales in month 12','Mauzo ya box mwezi 12'),x=>F.auto(x.mrr12)],[L('First year above TSh 1B','Mwaka wa kwanza juu ya TSh 1B'),x=>x.firstB?L('Year '+x.firstB.year,'Mwaka '+x.firstB.year):'—'],[L('Year-12 revenue','Mapato mwaka 12'),x=>F.auto(x.y12.revenue)],[L('Year-12 operating profit','Faida ya uendeshaji mwaka 12'),x=>F.auto(x.y12.ebitda)],[L('Stores by year 12','Maduka kufikia mwaka 12'),x=>x.y12.stores],[L('Seed ask (all cases)','Mtaji unaoombwa (hali zote)'),()=>F.m(SEED.amount)]];return rows.map(rw=>`<tr><td>${rw[0]}</td>${ds.map(x=>`<td class="${x.key==='base'?'b':''}">${rw[1](x)}</td>`).join('')}</tr>`).join('')})()}</tbody></table></div>
  <p class="note">Best case: demand ×${IN.scenarios.best.demand}, costs ×${IN.scenarios.best.cost} · Downside: demand ×${IN.scenarios.down.demand}, costs ×${IN.scenarios.down.cost} · source: master model ${esc(IN.meta.version)}</p>`],
 ['Risks and our answer',`<div class="risks">
   ${[['Ten minutes is short; a question can derail the pace.','The overview grid jumps to any slide in one click, and the pace panel shows how much time to win back on the next slides.','Dakika kumi ni chache; swali linaweza kuvuruga mwendo.','Gridi ya muhtasari inaruka slaidi yoyote kwa mbofyo mmoja, na paneli ya mwendo inaonyesha muda wa kurudisha.'],
     ['Live numbers could change between two meetings.',`That is the point: one master model. Each change is versioned (now ${esc(IN.meta.version)}), and the exported Canva deck is dated so investors know which version they saw.`,'Namba hai zinaweza kubadilika kati ya mikutano miwili.','Hiyo ndiyo nia: modeli kuu moja. Kila badiliko lina toleo, na wasilisho la Canva lina tarehe.'],
     ['The downside case shows losses in the early years.','We show it on purpose. Tranches, gated store openings and a working-capital reserve are designed for exactly that case.','Hali mbaya inaonyesha hasara miaka ya mwanzo.','Tunaionyesha kwa makusudi. Awamu, ufunguzi wa maduka kwa hatua na akiba ya mtaji wa kazi vimeundwa kwa hali hiyo hasa.'],
     ['A projector or venue may not allow full screen or presenter view.','The deck works in a normal browser window, on a phone with swipe, and as the Canva PowerPoint/PDF export once it is ready.','Projekta au ukumbi unaweza usiruhusu skrini nzima.','Wasilisho linafanya kazi kwenye dirisha la kawaida, kwenye simu kwa kutelezesha, na kama PowerPoint/PDF ya Canva.']].map(r=>`<div class="risk"><span class="q">${L(r[0],r[2])}</span><span class="ar">→</span><span class="a">${L(r[1],r[3])}</span></div>`).join('')}
  </div>`]];
 return secShell({s,p,pv,nx,cls:'p0v2',img:'img/real-mother-back.webp',imgAlt:'Concept image: a mother with her baby on her back at a pharmacy counter',
  h1:L('The whole case,','Hoja nzima,'),em:L('in ten minutes.','kwa dakika kumi.'),
  lede:L('Sixteen slides that answer the nine investor questions in order, from the problem to the ask. Every number comes live from the master model, with a timer, full speaker notes, presenter mode, a timed rehearsal and three scenarios at the presenter’s fingertips.','Slaidi kumi na sita zinazojibu maswali tisa ya mwekezaji kwa mpangilio, kutoka tatizo hadi ombi. Kila namba inatoka moja kwa moja kwenye modeli kuu, pamoja na kipima muda, maelezo kamili, hali ya mwasilishaji, mazoezi yenye muda na hali tatu.'),
  heroExtra:`<div class="cta"><button class="btn solid" id="p0start" type="button">${I.play} ${L('Start the presentation','Anza wasilisho')}</button><button class="btn line" id="p0pres0" type="button">${I.pres} ${L('Presenter mode','Hali ya mwasilishaji')}</button><a class="btn line" href="#s0-1">${L('Back to the 60-second story','Rudi kwenye hadithi ya sekunde 60')}</a></div><div class="p0v-htop">${langHTML()}${swNote}</div>`,
  mods,
  takeaway:L(`One story, <b>one set of numbers</b>, ten minutes: an investor leaves knowing the problem, the model, the money and <b>exactly what ${F.m(SEED.amount)} buys</b>.`,`Hadithi moja, <b>namba za aina moja</b>, dakika kumi: mwekezaji anaondoka akijua tatizo, mfumo, fedha na <b>hasa ${F.m(SEED.amount)} zinanunua nini</b>.`),
  doors:['s0-1','s6-1','s5-4','s6-3'],sources:SRC})}

let tT=null,keyH=null;
function init02(){REFRESH();hudumaInit('p0h2');kaziniInit('p0k2');const g=id=>document.getElementById(id);if(!g('p0deck'))return;
 wireLang();
 const deck=g('p0deck'),N=16,tot=BUDGET.reduce((a,b)=>a+b,0),cum=BUDGET.map((_,i)=>BUDGET.slice(0,i).reduce((a,b)=>a+b,0));
 let notesData=slides(D(dSc)).map(x=>x.n);
 let running=false,elapsed=0,last=0,slideT=0,reh=false,rspd=1;const per=new Array(N).fill(0);
 const segs=[...document.querySelectorAll('.p0-tl .seg')],strip=[...g('p0strip').children];
 /* presenter overlay lives on <body> so position:fixed is never trapped */
 const pr=document.createElement('div');pr.className='p0-pr';pr.id='p0pr';pr.setAttribute('role','dialog');pr.setAttribute('aria-label','Presenter mode');
 pr.innerHTML=`<div class="p0-prh"><span class="ttl">Afya Basics · <b>${L('Presenter mode','Hali ya mwasilishaji')}</b> · <span id="p0prc">01 / 16</span></span><span class="pc" id="p0prpace"></span><span class="clk" id="p0prclk">10:00</span>
  <button type="button" class="p0-ib" id="p0prp" aria-label="Previous slide">${I.prev}</button><button type="button" class="p0-ib pri" id="p0prn2" aria-label="Next slide">${I.next}</button><button type="button" class="p0-ib" id="p0prt" aria-label="Start or pause timer">${I.timer}</button><button type="button" class="p0-ib" id="p0prr" aria-label="Rehearse">${I.rehearse}</button><div class="p0-sc" id="p0prsc">${SC.map(x=>`<button type="button" data-k="${x[0]}">${x[1]}</button>`).join('')}</div><button type="button" class="p0-ib" id="p0prx" aria-label="Close presenter mode">${I.close}<span class="lbl">Esc</span></button></div>
  <div class="p0-prb"><div class="p0-prl"><div class="p0-prlab"><span>${L('Now','Sasa')} · <b id="p0prnt"></b></span><span id="p0prsl"></span></div><div class="p0-vw" id="p0prcur"><div class="p0-vv"></div></div><div class="p0-prbud" id="p0prbud"><i></i></div></div>
  <div class="p0-prr"><div><div class="p0-prlab" style="margin-bottom:8px"><span>${L('Next','Inayofuata')} · <b id="p0prnx"></b></span></div><div class="p0-vw" id="p0prnext"><div class="p0-vv"></div></div></div><div class="p0-prn" id="p0prn"></div><div class="p0-prlab"><span><kbd>←</kbd><kbd>→</kbd> ${L('slides','slaidi')} · <kbd>T</kbd> ${L('timer','muda')} · <kbd>R</kbd> ${L('rehearse','mazoezi')} · <kbd>Esc</kbd> ${L('close','funga')}</span></div></div></div>`;
 document.body.appendChild(pr);
 let SD=D(dSc),SS=slides(SD),SSW=SLIDE_SW(SD);
 const fit=()=>{pr.querySelectorAll('.p0-vw').forEach(w=>{const v=w.firstElementChild;if(v)v.style.transform=`scale(${w.clientWidth/1280})`})};
 function paintPres(){if(!pr.classList.contains('on'))return;
  pr.querySelector('#p0prcur .p0-vv').innerHTML=slideOne(SD,SS,SSW,dI,true);
  pr.querySelector('#p0prnext .p0-vv').innerHTML=dI<N-1?slideOne(SD,SS,SSW,dI+1,true):`<div style="display:grid;place-items:center;height:100%;font:600 40px var(--f-display);color:var(--gold2)">${L('End · questions','Mwisho · maswali')}</div>`;
  g('p0prc').textContent=`${pad(dI+1)} / 16`;g('p0prnt').innerHTML=L(STITLE[dI],STITLE_SW[dI])+` · ${BUDGET[dI]} s`;g('p0prnx').innerHTML=dI<N-1?L(STITLE[dI+1],STITLE_SW[dI+1]):'—';
  g('p0prn').innerHTML=notesData[dI];g('p0prn').scrollTop=0;pr.querySelectorAll('#p0prsc button').forEach(b=>b.classList.toggle('on',b.dataset.k===dSc));fit();paintT()}
 function pres(on){on=on===undefined?!pr.classList.contains('on'):on;pr.classList.toggle('on',on);g('p0pb').classList.toggle('on',on);g('p0pb').setAttribute('aria-pressed',on);document.documentElement.style.overflow=on?'hidden':'';if(on){paintPres();setTimeout(fit,30)}else if(document.fullscreenElement===pr){try{document.exitFullscreen()}catch(e){}}}
 function go(k,dir){k=Math.max(0,Math.min(N-1,k));const back=dir!==undefined?dir<0:k<dI;if(k!==dI)slideT=0;dI=k;
  g('p0slides').querySelectorAll('.p0-slide').forEach((el,j)=>{const on=j===dI;el.classList.toggle('on',on);el.classList.toggle('back',on&&back);if(on)el.removeAttribute('aria-hidden');else el.setAttribute('aria-hidden','true')});
  g('p0cnt').innerHTML=`<b>${pad(dI+1)}</b> / 16`;g('p0prog').style.width=((dI+1)/N*100)+'%';
  g('p0nh').innerHTML=`Slide ${pad(dI+1)} · ${L(STITLE[dI],STITLE_SW[dI])} · ${BUDGET[dI]} s`;g('p0nt').innerHTML=notesData[dI];g('p0nt').scrollTop=0;
  segs.forEach((s,j)=>s.classList.toggle('on',j===dI));strip.forEach((s,j)=>s.classList.toggle('on',j===dI));
  g('p0ov').querySelectorAll('button').forEach((b,j)=>b.classList.toggle('on',j===dI));
  paintPres();paintT()}
 function paintT(){const left=tot-elapsed/1000;const lt=left>=0?mmss(left):'+'+mmss(-left);const el=g('p0left');el.textContent=lt;el.classList.toggle('over',left<0);
  const ps=per[dI]/1000,b=BUDGET[dI];g('p0sl').textContent=mmss(ps)+' / '+mmss(b);const bud=g('p0bud');bud.firstChild.style.width=Math.min(100,ps/b*100)+'%';bud.classList.toggle('over',ps>b);
  g('p0el').textContent=mmss(elapsed/1000)+' / 10:00';
  strip.forEach((s,j)=>s.firstChild.style.width=Math.min(100,per[j]/1000/BUDGET[j]*100)+'%');
  const pace=elapsed/1000-(cum[dI]+Math.min(ps,b)),pe=g('p0pace');let txt,cls;
  if(!running&&elapsed===0){txt=L('Timer not started','Kipima muda hakijaanza');cls='st ok'}
  else if(pace>5){txt=L('Behind by ','Nyuma kwa ')+mmss(pace);cls='st bh'}else if(pace<-5){txt=L('Ahead by ','Mbele kwa ')+mmss(-pace);cls='st ah'}else{txt=L('On pace','Kwa mwendo sahihi');cls='st ok'}
  pe.innerHTML=txt;pe.className=cls;
  const nx=document.getElementById('p0now');if(nx){const x=Math.min(1,elapsed/1000/tot)*1000;nx.setAttribute('x1',x);nx.setAttribute('x2',x)}
  if(pr.classList.contains('on')){const c=g('p0prclk');c.textContent=lt;c.classList.toggle('over',left<0);const pp=g('p0prpace');pp.innerHTML=txt;pp.className='pc '+cls;g('p0prsl').textContent=mmss(ps)+' / '+mmss(b);const pb=g('p0prbud');pb.firstChild.style.width=Math.min(100,ps/b*100)+'%';pb.classList.toggle('over',ps>b)}
  if(reh){const rl=Math.max(0,b-slideT/1000);g('p0rcd').textContent=mmss(rl);g('p0rbar').style.width=Math.min(100,slideT/1000/b*100)+'%'}}
 function tick(){const now=performance.now(),dt=(now-last)*(reh?rspd:1);last=now;elapsed+=dt;per[dI]+=dt;slideT+=dt;
  if(reh&&slideT>=BUDGET[dI]*1000){if(dI<N-1){go(dI+1,1)}else{const over=per.map((x,j)=>x/1000>BUDGET[j]+1?j+1:0).filter(Boolean);rehearse(false);tStop();g('p0rh').classList.add('on');g('p0rmsg').innerHTML=L(`Rehearsal complete: ${mmss(elapsed/1000)} for 16 slides${over.length?' · over budget on slide '+over.join(', '):''}.`,`Mazoezi yamekamilika: ${mmss(elapsed/1000)} kwa slaidi 16.`)}}
  paintT()}
 function tStart(){running=true;last=performance.now();clearInterval(tT);tT=setInterval(tick,200);g('p0tb').innerHTML=I.pause;g('p0tb').setAttribute('aria-label','Pause timer')}
 function tStop(){running=false;clearInterval(tT);g('p0tb').innerHTML=I.play;g('p0tb').setAttribute('aria-label','Start timer')}
 function tReset(){tStop();elapsed=0;slideT=0;per.fill(0);paintT()}
 function rehearse(on){on=on===undefined?!reh:on;reh=on;g('p0rh').classList.toggle('on',on);g('p0rb').classList.toggle('on',on);g('p0rb').setAttribute('aria-pressed',on);const rb=g('p0prr');if(rb)rb.classList.toggle('on',on);
  if(on){g('p0rmsg').innerHTML=L('Each slide moves on when its budget runs out. Speak along.','Kila slaidi inasonga muda wake ukiisha. Ongea pamoja nayo.');tReset();go(0,-1);tStart()}else{tStop()}}
 function setSc(k){dSc=k;document.querySelectorAll('#p0sc2 button').forEach(x=>{x.classList.toggle('on',x.dataset.k===k);x.setAttribute('aria-pressed',x.dataset.k===k)});
  SD=D(k);SS=slides(SD);SSW=SLIDE_SW(SD);g('p0slides').innerHTML=deckHTML(SD);notesData=SS.map(x=>x.n);go(dI)}
 function grid(on){const o=g('p0ov');on=on===undefined?!o.classList.contains('on'):on;o.classList.toggle('on',on);g('p0gb').classList.toggle('on',on);g('p0gb').setAttribute('aria-pressed',on)}
 function notes(on){const n=g('p0notes');on=on===undefined?n.classList.contains('hide'):on;n.classList.toggle('hide',!on);deck.classList.toggle('notes',on);g('p0nb').classList.toggle('on',on);g('p0nb').setAttribute('aria-pressed',on)}
 function help(on){const h=g('p0help');on=on===undefined?!h.classList.contains('on'):on;h.classList.toggle('on',on);g('p0hb').classList.toggle('on',on)}
 function fs(){const el=pr.classList.contains('on')?pr:deck;if(document.fullscreenElement||document.webkitFullscreenElement){(document.exitFullscreen||document.webkitExitFullscreen).call(document)}else{const rq=el.requestFullscreen||el.webkitRequestFullscreen;if(rq){try{const p2=rq.call(el);if(p2&&p2.catch)p2.catch(()=>{})}catch(e){}}}}
 g('p0dprev').onclick=()=>go(dI-1,-1);g('p0dnext').onclick=()=>go(dI+1,1);g('p0first').onclick=()=>go(0,-1);
 g('p0tb').onclick=()=>running?tStop():tStart();g('p0tr').onclick=()=>{tReset();if(reh)rehearse(false)};
 g('p0nb').onclick=()=>notes();g('p0gb').onclick=()=>grid();g('p0fb').onclick=fs;g('p0hb').onclick=()=>help();g('p0hx').onclick=()=>help(false);
 g('p0pb').onclick=()=>pres();g('p0rb').onclick=()=>rehearse();g('p0rstop').onclick=()=>{rehearse(false);g('p0rh').classList.remove('on')};
 g('p0rspd').querySelectorAll('button').forEach(b=>b.onclick=()=>{rspd=+b.dataset.s;g('p0rspd').querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b))});
 g('p0pb2').onclick=()=>pres(true);g('p0pres0').onclick=()=>pres(true);
 g('p0rb2').onclick=()=>{deck.scrollIntoView({behavior:'smooth',block:'start'});rehearse(true)};
 g('p0prp').onclick=()=>go(dI-1,-1);g('p0prn2').onclick=()=>go(dI+1,1);g('p0prt').onclick=()=>running?tStop():tStart();g('p0prr').onclick=()=>rehearse();g('p0prx').onclick=()=>pres(false);
 pr.querySelectorAll('#p0prsc button').forEach(b=>b.onclick=()=>setSc(b.dataset.k));
 document.querySelectorAll('#p0sc2 button').forEach(b=>b.onclick=()=>setSc(b.dataset.k));
 document.querySelectorAll('.p0v2 [data-go]').forEach(b=>b.addEventListener('click',()=>{const inDeck=deck.contains(b);go(+b.dataset.go);grid(false);if(!inDeck)deck.scrollIntoView({behavior:'smooth',block:'start'})}));
 segs.forEach(s=>{s.addEventListener('click',()=>{go(+s.dataset.i);deck.scrollIntoView({behavior:'smooth',block:'start'})});s.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go(+s.dataset.i)}})});
 g('p0start').onclick=()=>{deck.scrollIntoView({behavior:'smooth',block:'start'});go(0);if(!running)tStart();deck.focus({preventScroll:true})};
 /* swipe on phone (deck and presenter) */
 const swipe=el=>{let sx=null,sy=0;el.addEventListener('touchstart',e=>{sx=e.touches[0].clientX;sy=e.touches[0].clientY},{passive:true});el.addEventListener('touchend',e=>{if(sx===null)return;const dx=e.changedTouches[0].clientX-sx,dy=e.changedTouches[0].clientY-sy;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy))go(dI+(dx<0?1:-1),dx<0?1:-1);sx=null})};
 swipe(g('p0stage'));swipe(g('p0prcur'));
 const rz=()=>fit();window.addEventListener('resize',rz);
 keyH=e=>{const t=e.target;if(t&&(t.tagName==='INPUT'||t.tagName==='TEXTAREA'||t.tagName==='SELECT'||t.isContentEditable))return;if(e.metaKey||e.ctrlKey||e.altKey)return;
  const k=e.key,inFs=!!document.fullscreenElement,focus=deck.contains(document.activeElement)||pr.classList.contains('on');
  if(k==='ArrowRight'||k==='PageDown'){e.preventDefault();go(dI+1,1)}
  else if(k==='ArrowLeft'||k==='PageUp'){e.preventDefault();go(dI-1,-1)}
  else if(k===' '&&(inFs||focus)&&!(document.activeElement&&document.activeElement.tagName==='BUTTON')){e.preventDefault();go(dI+1,1)}
  else if((k==='Home'||k==='End')&&(inFs||focus)){e.preventDefault();go(k==='Home'?0:N-1)}
  else if(k==='t'||k==='T'){running?tStop():tStart()}
  else if(k==='n'||k==='N'){notes()}
  else if(k==='g'||k==='G'){grid()}
  else if(k==='f'||k==='F'){fs()}
  else if(k==='p'||k==='P'){pres()}
  else if(k==='r'||k==='R'){rehearse()}
  else if(k==='?'||k==='h'||k==='H'){help()}
  else if(k==='Escape'){if(g('p0help').classList.contains('on'))help(false);else if(pr.classList.contains('on')&&!document.fullscreenElement)pres(false);else grid(false)}
  else if(k==='1'||k==='2'||k==='3'){setSc(SC[+k-1][0])}};
 document.addEventListener('keydown',keyH);
 cleanups.push(()=>{tStop();reh=false;document.removeEventListener('keydown',keyH);window.removeEventListener('resize',rz);document.documentElement.style.overflow='';pr.remove();if(document.fullscreenElement){try{document.exitFullscreen()}catch(e){}}});
 go(dI)}


/* ---------- cleanup when leaving a section ---------- */
const cleanups=[];
window.addEventListener('afya:leave',()=>{while(cleanups.length){try{cleanups.pop()()}catch(e){}}cancelAnimationFrame(pRaf);clearInterval(tT)});

window.SECTIONS['s0-1']={render:render01,init:init01};
window.SECTIONS['s0-2']={render:render02,init:init02};
})();
