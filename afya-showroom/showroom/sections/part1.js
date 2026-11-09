/* part1: sections 1.1 The problem · 1.2 The evidence · 1.3 Market size · 1.4 Our customers · 1.5 Why now
   All facts cited (opened pages); all business numbers from MODEL; estimates labelled. */
(function(){
'use strict';
/* ---- photo kit (editorial real-photo layouts) · prefix p1k ---- */
const p1kCSS=`
.p1k-band{position:relative;margin:24px 0 0;border-radius:26px;overflow:hidden;border:1px solid var(--edge2);min-height:460px;display:flex;align-items:flex-end;isolation:isolate;box-shadow:0 50px 110px -60px rgba(95,191,143,.45)}
.p1k-band>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:-2;transform:scale(1.01)}
.p1k-band::before{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(90deg,rgba(2,6,8,.94) 0%,rgba(2,6,8,.72) 36%,rgba(2,6,8,.12) 70%,rgba(2,6,8,0)),linear-gradient(0deg,rgba(2,6,8,.8),rgba(2,6,8,0) 45%)}
.p1k-band.r{justify-content:flex-end}
.p1k-band.r::before{background:linear-gradient(270deg,rgba(2,6,8,.94) 0%,rgba(2,6,8,.72) 36%,rgba(2,6,8,.12) 70%,rgba(2,6,8,0)),linear-gradient(0deg,rgba(2,6,8,.8),rgba(2,6,8,0) 45%)}
.p1k-band .tx{position:relative;padding:48px 52px;max-width:600px}
.p1k-k{display:inline-block;font:500 .64rem/1.4 var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--gold)}
.p1k-band h3,.p1k-split h3{font:800 clamp(1.5rem,2.9vw,2.4rem)/1.08 var(--f-display);letter-spacing:-.02em;margin:12px 0 0;color:var(--ink)}
.p1k-band h3 em,.p1k-split h3 em{font-style:normal;background:linear-gradient(90deg,var(--neon),var(--gold2));-webkit-background-clip:text;background-clip:text;color:transparent}
.p1k-band p,.p1k-split p{color:var(--ink2);margin:14px 0 0;font-size:1rem;line-height:1.65}
.p1k-band p b,.p1k-split p b,.p1k-split li b{color:var(--ink)}
.p1k-stats{display:flex;flex-wrap:wrap;gap:12px 28px;margin-top:22px;padding-top:18px;border-top:1px solid rgba(242,201,107,.22)}
.p1k-stats div{min-width:0}
.p1k-stats b{display:block;font:500 1.5rem var(--f-hud);color:var(--gold2)}
.p1k-stats span{display:block;font-size:.78rem;line-height:1.45;color:var(--ink2);max-width:20ch}
.p1k-cap{position:absolute;right:16px;top:16px;z-index:3;font:500 .56rem var(--f-hud);letter-spacing:.18em;text-transform:uppercase;color:rgba(239,250,245,.82);background:rgba(2,6,8,.6);padding:5px 10px;border-radius:99px;border:1px solid rgba(255,255,255,.14);backdrop-filter:blur(6px)}
.p1k-split{display:grid;grid-template-columns:minmax(0,1.12fr) minmax(0,1fr);border-radius:26px;overflow:hidden;border:1px solid var(--edge);background:linear-gradient(160deg,var(--panel2),rgba(2,6,8,.85));margin-top:22px}
.p1k-split.rev>figure{order:2}
.p1k-split>figure{position:relative;margin:0;min-height:420px;overflow:hidden}
.p1k-split>figure img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.p1k-split>figure::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(2,6,8,.55),transparent 40%)}
.p1k-split>figure figcaption{position:absolute;left:20px;right:20px;bottom:16px;z-index:2;font-size:.84rem;line-height:1.45;color:var(--ink)}
.p1k-split .tx{padding:44px 46px;display:flex;flex-direction:column;justify-content:center;min-width:0}
.p1k-split ul{margin:16px 0 0;padding:0;list-style:none;display:grid;gap:10px}
.p1k-split li{position:relative;padding-left:22px;font-size:.93rem;line-height:1.55;color:var(--ink2)}
.p1k-split li::before{content:"";position:absolute;left:0;top:.62em;width:10px;height:1px;background:var(--gold)}
.p1k-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:16px;margin-top:22px}
.p1k-card{border-radius:22px;overflow:hidden;border:1px solid var(--edge);background:linear-gradient(175deg,var(--panel2),rgba(2,6,8,.8));min-width:0;display:flex;flex-direction:column;margin:0}
.p1k-card>.ph{position:relative;aspect-ratio:4/3;overflow:hidden}
.p1k-card>.ph img{display:block;width:100%;height:100%;object-fit:cover;transition:transform 1.2s cubic-bezier(.2,.8,.2,1)}
.p1k-card:hover>.ph img{transform:scale(1.05)}
.p1k-card>.ph::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(2,6,8,.5),transparent 45%)}
.p1k-card .tx{padding:18px 20px 22px;min-width:0}
.p1k-card h4{font:700 1.05rem/1.28 var(--f-display);margin:8px 0 0;color:var(--ink)}
.p1k-card p{font-size:.9rem;line-height:1.6;color:var(--ink2);margin:8px 0 0}
.p1k-card p b{color:var(--ink)}
.p1k-card .n{display:block;margin-top:12px;padding-top:12px;border-top:1px solid var(--edge);font:500 .66rem/1.5 var(--f-hud);letter-spacing:.1em;text-transform:uppercase;color:var(--gold2)}
.p1k-mos{display:grid;grid-template-columns:minmax(0,1.55fr) minmax(0,1fr);grid-template-rows:repeat(2,minmax(0,1fr));gap:14px;margin-top:22px;height:560px}
.p1k-mos>figure{position:relative;margin:0;border-radius:22px;overflow:hidden;border:1px solid var(--edge);min-height:0}
.p1k-mos>figure:first-child{grid-row:1/3}
.p1k-mos img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.p1k-mos figcaption{position:absolute;left:0;right:0;bottom:0;padding:56px 20px 16px;background:linear-gradient(0deg,rgba(2,6,8,.92),transparent);font-size:.88rem;line-height:1.5;color:var(--ink2)}
.p1k-mos figcaption b{display:block;color:var(--ink);font:700 1rem/1.3 var(--f-display);margin-bottom:3px}
@media (max-width:980px){.p1k-split{grid-template-columns:1fr}.p1k-split.rev>figure{order:0}.p1k-split>figure{min-height:0;aspect-ratio:16/10}.p1k-split .tx{padding:28px 26px 30px}.p1k-mos{height:auto;grid-template-columns:1fr 1fr;grid-template-rows:auto}.p1k-mos>figure{aspect-ratio:4/3}.p1k-mos>figure:first-child{grid-row:auto;grid-column:1/3;aspect-ratio:16/10}}
@media (max-width:640px){.p1k-band{display:block;min-height:0!important;border-radius:20px;background:#04100c}.p1k-band>img{position:relative;display:block;height:auto;aspect-ratio:4/3;transform:none}.p1k-band::before,.p1k-band.r::before{display:none}.p1k-band .tx{max-width:none;margin-top:-80px;padding:84px 20px 24px;background:linear-gradient(180deg,rgba(4,16,12,0),#04100c 78px)}.p1k-split{border-radius:20px}.p1k-split .tx{padding:24px 20px 26px}.p1k-mos{grid-template-columns:1fr}.p1k-mos>figure,.p1k-mos>figure:first-child{grid-column:auto;aspect-ratio:auto;background:linear-gradient(175deg,var(--panel2),rgba(2,6,8,.8))}.p1k-mos img{position:relative;display:block;aspect-ratio:4/3;height:auto}.p1k-mos figcaption{position:relative;padding:14px 18px 18px;background:none}.p1k-cards{grid-template-columns:1fr}.p1k-stats b{font-size:1.25rem}}
`;
const p1kon=()=>{if(typeof addCSS==='function')addCSS('p1k',p1kCSS)};
const p1kimg=(f,alt,pos)=>`<img src="img/${f}.webp" alt="${alt}" loading="lazy" decoding="async" width="1680" height="944"${pos?` style="object-position:${pos}"`:''}>`;
const p1kcap='<span class="p1k-cap">Concept image</span>';
/* band(file, alt, kicker, title, text, {pos, r, h, stats:[[b,span]]}) */
const p1kband=(f,alt,k,h,p,o={})=>{p1kon();return `<figure class="p1k-band${o.r?' r':''}"${o.h?` style="min-height:${o.h}"`:''}>${p1kimg(f,alt,o.pos)}${p1kcap}<figcaption class="tx">${k?`<span class="p1k-k">${k}</span>`:''}<h3>${h}</h3>${p?`<p>${p}</p>`:''}${o.stats?`<div class="p1k-stats">${o.stats.map(s=>`<div><b>${s[0]}</b><span>${s[1]}</span></div>`).join('')}</div>`:''}${o.extra||''}</figcaption></figure>`};
/* split(file, alt, innerHTML, {rev, pos, cap}) */
const p1ksplit=(f,alt,html,o={})=>{p1kon();return `<div class="p1k-split${o.rev?' rev':''}"><figure>${p1kimg(f,alt,o.pos)}${p1kcap}${o.cap?`<figcaption>${o.cap}</figcaption>`:''}</figure><div class="tx">${html}</div></div>`};
/* cards([[file, alt, kicker, title, text, note, pos]]) */
const p1kcards=(arr,o={})=>{p1kon();return `<div class="p1k-cards"${o.min?` style="grid-template-columns:repeat(auto-fit,minmax(${o.min},1fr))"`:''}>${arr.map(a=>`<article class="p1k-card"><div class="ph">${p1kimg(a[0],a[1],a[6])}${p1kcap}</div><div class="tx">${a[2]?`<span class="p1k-k">${a[2]}</span>`:''}<h4>${a[3]}</h4>${a[4]?`<p>${a[4]}</p>`:''}${a[5]?`<span class="n">${a[5]}</span>`:''}</div></article>`).join('')}</div>`};
/* mosaic([[file, alt, title, text, pos]]) first is large */
const p1kmos=arr=>{p1kon();return `<div class="p1k-mos">${arr.map(a=>`<figure>${p1kimg(a[0],a[1],a[4])}${p1kcap}<figcaption><b>${a[2]}</b>${a[3]||''}</figcaption></figure>`).join('')}</div>`};
/* ---- end photo kit ---- */

/* ---------------- sources (every page below was opened and read) ---------------- */
const S1={
 steps_ht:['Mayige et al., Tanzania Journal of Health Research 27(2), 2026: Hypertension burden among adults 18–69 in Tanzania, results from the 2023 National STEPS survey','https://nhrdr.nimr.or.tz/records/209'],
 steps_dm:['Mayige et al., Tanzania Journal of Health Research 27(2), 2026: Type 2 diabetes care cascade among adults 18–69, 2023 National STEPS survey','https://nhrdr.nimr.or.tz/records/210'],
 steps_cl:['Hassan et al., Tanzania Journal of Health Research 27(2), 2026: Clustering of NCD risk factors among adults 18–69, 2023 STEPS survey','https://nhrdr.nimr.or.tz/records/211'],
 who_ht:['WHO, United Republic of Tanzania hypertension profile (2012 STEPS survey, adults 25–64)','https://cdn.who.int/media/docs/default-source/country-profiles/hypertension/tza_en.pdf'],
 idf:['International Diabetes Federation, Diabetes Atlas: United Republic of Tanzania country data (2011, 2024, 2050 projection)','https://diabetesatlas.org/data-by-location/country/united-republic-of-tanzania/'],
 jkci:['Daily News, 11 July 2026: Four in 10 screened at DITF found with undiagnosed hypertension (JKCI “Know Your Numbers”)','https://dailynews.co.tz/?p=150795'],
 dhs:['MoH, NBS, OCGS and ICF, January 2023: Tanzania Demographic and Health Survey and Malaria Indicator Survey 2022, Key Indicators Report','https://dhsprogram.com/pubs/pdf/PR144/PPR144.pdf'],
 census:['NBS, June 2024: 2022 Population and Housing Census, Key Findings, Basic Demographic and Socio-economic Profile','https://sensa.nbs.go.tz/publication/08. Key_Findings_Basic_Demographic_and_Socio-economic_ Eng_ 12.06.2024 Final.pdf'],
 housing:['NBS: 2022 Population and Housing Census, Housing Condition, Household Amenities and Assets (Tables 2.2 and 2.5)','https://www.nbs.go.tz/uploads/statistics/documents/en-1764003000-Housing Condition, Household Amenities and Assets.pdf'],
 citypop:['City Population (NBS census data): Dar es Salaam region, 2002, 2012 and 2022 census counts','https://www.citypopulation.de/en/tanzania/admin/07'],
 urban:['World Bank, World Development Indicators (UN World Urbanization Prospects), via Statistics of the World: Tanzania urban population %','https://statisticsoftheworld.com/country/tanzania/urban-population'],
 dar2050:['The Citizen, 13 October 2023: Dar population boom set to hit over 16 million','https://thecitizen.co.tz/tanzania/news/national/dar-population-boom-set-to-hit-over-16-million-4400494'],
 tcra26:['TanzaniaInvest, 14 June 2026: TCRA telecom statistics, quarter ending March 2026','https://tanzaniainvest.com/telecoms/tcra-telecom-stats-q1-2026'],
 tcra25:['TanzaniaInvest, 2025: TCRA telecom statistics, quarter ending March 2025','https://tanzaniainvest.com/telecoms/tcra-telecom-stats-q1-2025'],
 tcra23:['TanzaniaInvest, 2023: TCRA telecom statistics, quarter ending September 2023','https://tanzaniainvest.com/?p=23816'],
 mm5:['The Guardian (Tanzania), 10 February 2026: TCRA, mobile accounts double in past five years','https://ippmedia.com/the-guardian/news/local-news/read/tcra-mobile-accounts-double-in-past-five-years-2026-02-10-094738'],
 inet18:['Daba Finance, 10 November 2023: Internet subscriptions in Tanzania rise by almost 45% in five years (TCRA data)','https://dabafinance.com/en/news/internet-subscriptions-in-tanzania-surge'],
 rem25:['The Citizen, 27 May 2026: Diaspora remittances hit Sh3.3 trillion (2024/25 financial year)','https://www.thecitizen.co.tz/tanzania/diaspora/diaspora-remittances-hit-sh3-3-trillion-as-tanzania-deepens-global-engagement-5473984'],
 rem22:['The Citizen, 14 February 2024: Tanzanians in the diaspora remit Sh1.3 trillion in 2022 (Bank of Tanzania)','https://thecitizen.co.tz/tanzania/business/tanzanians-in-the-diaspora-remit-sh1-3-trillion-in-2022-bot-4524388'],
 xb:['The Citizen, 8 June 2026: Cross-border mobile money inflows rise 33 percent to Sh698 billion (Bank of Tanzania)','https://thecitizen.co.tz/tanzania/business/cross-border-mobile-money-inflows-rise-33-percent-to-sh698-billion-5488722'],
 remtgt:['The Citizen, 7 November 2024: Tanzania targets $1.5 billion in diaspora remittances by 2028','https://www.thecitizen.co.tz/tanzania/news/national/tanzania-targets-1-5-billion-in-diaspora-remittances-by-2028-4815834'],
 who_sf:['WHO news release, 28 November 2017: 1 in 10 medical products in developing countries is substandard or falsified','https://www.who.int/news/item/28-11-2017-1-in-10-medical-products-in-developing-countries-is-substandard-or-falsified'],
 gphf:['Global Pharma Health Fund, 2022: Counterfeit and substandard medicines in Tanzania (background, TMDA findings)','https://gphf.org/minilab/hintergrund_counterfeits_tanzania.htm'],
 jnia:['The Guardian (Tanzania), 10 September 2026: TMDA seizes unregistered medicines worth 360m/- in JNIA crackdown','https://ippmedia.co.tz/the-guardian/news/local-news/read/tmda-seizes-unregistered-medicines-worth-360m-jnia-crackdown-2026-09-10-144750'],
 tmdaparl:['AllAfrica / Daily News, 11 June 2026: TMDA strengthens drug safety oversight in fight against counterfeit medicines','https://allafrica.com/stories/202606110516.html'],
 nha:['Ministry of Health, Tanzania: National Health Accounts for financial years 2020/21 and 2021/22','https://p4h.world/app/uploads/2024/09/NATIONAL-MINISTRY-OF-HEALTH-FINAL-2021.22.x23411.pdf'],
 uhi:['The Citizen, 26 January 2026: Universal health insurance rolls out nationwide today (Universal Health Insurance Act, 2023)','https://thecitizen.co.tz/tanzania/news/national/universal-health-insurance-rolls-out-nationwide-today-5338644']
};
const SH={steps_ht:'2023 STEPS survey (NIMR/MoH)',steps_dm:'2023 STEPS survey (NIMR/MoH)',steps_cl:'2023 STEPS survey (NIMR/MoH)',who_ht:'WHO country profile',idf:'IDF Diabetes Atlas',jkci:'Daily News',dhs:'TDHS-MIS 2022',census:'NBS 2022 census',housing:'NBS 2022 census',citypop:'NBS census via City Population',urban:'World Bank WDI',dar2050:'The Citizen',tcra26:'TCRA via TanzaniaInvest',tcra25:'TCRA via TanzaniaInvest',tcra23:'TCRA via TanzaniaInvest',mm5:'TCRA via The Guardian',inet18:'TCRA via Daba Finance',rem25:'Govt to Parliament, The Citizen',rem22:'Bank of Tanzania, The Citizen',xb:'Bank of Tanzania, The Citizen',remtgt:'The Citizen',who_sf:'WHO',gphf:'GPHF (TMDA findings)',jnia:'TMDA, The Guardian',tmdaparl:'AllAfrica / Daily News',nha:'MoH National Health Accounts',uhi:'The Citizen'};
/* per-section numbering: c(key) -> [n] link, list -> sources array */
function srcSet(keys){const ix={};keys.forEach((k,i)=>ix[k]=i+1);
 return {c:k=>cref(S1[k][1],ix[k],S1[k][0]), list:keys.map(k=>S1[k])}}

/* ---------------- shared helpers ---------------- */
const M=()=>MODEL;
const tz=n=>'TSh '+Math.round(n).toLocaleString('en-US');
const big=n=>Math.abs(n)>=1e12?'TSh '+(n/1e12).toFixed(2).replace(/\.?0+$/,'')+'T':Math.abs(n)>=1e9?'TSh '+(n/1e9).toFixed(n>=1e11?0:1).replace(/\.0$/,'')+'B':MODEL.fmt.auto(n);
const nf=n=>Math.round(n).toLocaleString('en-US');
const CONF={h:['High','Official national survey, census or regulator data'],m:['Medium','Official but older, modelled, global or press-reported'],i:['Indicative','News report, screening event or one-off case']};
const confTag=k=>`<span class="p1-conf ${k}" title="${esc(CONF[k][1])}"><i></i>${CONF[k][0]}</span>`;
let LEAVE=[];
function onLeave(fn){LEAVE.push(fn)}
addEventListener('afya:leave',()=>{LEAVE.forEach(f=>{try{f()}catch(e){}});LEAVE=[]});
function onResize(fn){let t;const h=()=>{clearTimeout(t);t=setTimeout(fn,120)};addEventListener('resize',h);onLeave(()=>removeEventListener('resize',h))}

/* generic responsive line chart, drawn at the container's real width so text stays crisp */
function lineChart(el,o){if(!el)return;const W=Math.max(300,el.clientWidth),small=W<560,H=o.h||(small?250:320);
 const pl=small?40:52,pr=small?14:28,pt=22,pb=34,iw=W-pl-pr,ih=H-pt-pb;
 const X=x=>pl+(x-o.x0)/(o.x1-o.x0)*iw,Y=y=>pt+ih-(y-o.y0)/(o.y1-o.y0)*ih;
 let g='';
 if(o.band){g+=`<rect x="${X(o.band[0])}" y="${pt}" width="${X(o.band[1])-X(o.band[0])}" height="${ih}" fill="url(#p1band)"/><text x="${(X(o.band[0])+X(o.band[1]))/2}" y="${pt-7}" text-anchor="middle" class="p1-svgk g">${o.bandLabel||''}</text>`}
 (o.yt||[]).forEach(v=>{g+=`<line x1="${pl}" x2="${W-pr}" y1="${Y(v)}" y2="${Y(v)}" class="p1-grid"/><text x="${pl-8}" y="${Y(v)+4}" text-anchor="end" class="p1-svgt">${o.yf?o.yf(v):v}</text>`});
 (o.xt||[]).filter((v,i)=>!small||i%(o.xskip||2)===0||i===o.xt.length-1).forEach(v=>{g+=`<text x="${X(v)}" y="${H-10}" text-anchor="middle" class="p1-svgt">${o.xf?o.xf(v):v}</text>`});
 o.series.forEach((s,si)=>{if(s.hide)return;const pts=s.pts.filter(p=>p[1]!=null);if(!pts.length)return;
  const solid=pts.filter(p=>!p[2]),proj=pts.filter((p,i)=>p[2]||(pts[i+1]&&pts[i+1][2]));
  const d=a=>a.map((p,i)=>(i?'L':'M')+X(p[0]).toFixed(1)+' '+Y(Math.min(o.y1,p[1])).toFixed(1)).join(' ');
  if(o.area&&si===0&&solid.length>1)g+=`<path d="${d(solid)} L${X(solid[solid.length-1][0])} ${Y(o.y0)} L${X(solid[0][0])} ${Y(o.y0)}Z" fill="${s.c}" opacity=".07"/>`;
  if(solid.length>1)g+=`<path d="${d(solid)}" fill="none" stroke="${s.c}" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round" style="filter:drop-shadow(0 0 6px ${s.c}88)"/>`;
  if(proj.length>1)g+=`<path d="${d(proj)}" fill="none" stroke="${s.c}" stroke-width="1.8" stroke-dasharray="5 5" opacity=".75"/>`;
  pts.forEach(p=>{if(p[1]>o.y1)return;g+=`<circle cx="${X(p[0])}" cy="${Y(p[1])}" r="${p[2]?3.5:4.5}" fill="${p[2]?'#020608':s.c}" stroke="${s.c}" stroke-width="2"><title>${esc(s.name+': '+(p[3]||p[1]))}</title></circle>`});
  if(s.label!==false&&!small){const L=solid[solid.length-1]||pts[pts.length-1];g+=`<text x="${X(L[0])-8}" y="${Y(Math.min(o.y1,L[1]))-10}" text-anchor="end" class="p1-svgl" fill="${s.c}">${esc(s.lbl||'')}</text>`}});
 if(o.cursor!=null){const cx=X(o.cursor);g+=`<line x1="${cx}" x2="${cx}" y1="${pt}" y2="${pt+ih}" stroke="#ffe7a8" stroke-width="1.2" stroke-dasharray="3 4"/><text x="${cx}" y="${pt+14}" text-anchor="${cx>W-60?'end':'start'}" dx="${cx>W-60?-6:6}" class="p1-svgk g">${Math.floor(o.cursor)}</text>`}
 (o.events||[]).forEach(e=>{const ex=X(e[0]);g+=`<g class="p1-ev"><line x1="${ex}" x2="${ex}" y1="${pt+ih-14}" y2="${pt+ih}" stroke="#c9b8ff" stroke-width="1.5"/><path d="M${ex} ${pt+ih-22} l6 6 -6 6 -6 -6z" fill="#c9b8ff"><title>${esc(e[1])}</title></path></g>`});
 el.innerHTML=`<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(o.aria||'Chart')}"><defs><linearGradient id="p1band" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#f2c96b" stop-opacity=".22"/><stop offset="1" stop-color="#f2c96b" stop-opacity=".02"/></linearGradient></defs><line x1="${pl}" x2="${W-pr}" y1="${pt+ih}" y2="${pt+ih}" stroke="rgba(242,201,107,.35)"/>${g}</svg>`}

/* ---------------- CSS ---------------- */
const CSS=`
.p1 .s11lead{max-width:76ch}
.p1-h3{font:700 clamp(1.1rem,1.8vw,1.35rem)/1.25 var(--f-display);margin:0 0 10px;letter-spacing:-.01em}
.p1-sub{color:var(--ink2);font-size:.95rem;margin:0 0 18px;max-width:72ch}
.p1-conf{display:inline-flex;align-items:center;gap:6px;padding:3px 9px;border-radius:999px;font:500 .6rem var(--f-hud);letter-spacing:.14em;text-transform:uppercase;border:1px solid;white-space:nowrap}
.p1-conf i{width:6px;height:6px;border-radius:50%;background:currentColor;box-shadow:0 0 8px currentColor}
.p1-conf.h{color:#5fbf8f;border-color:rgba(95,191,143,.4)}.p1-conf.m{color:#f2c96b;border-color:rgba(242,201,107,.4)}.p1-conf.i{color:#c9b8ff;border-color:rgba(201,184,255,.4)}
.p1-svgt{font:500 11px var(--f-hud);fill:#6a8a7d}.p1-svgk{font:500 10.5px var(--f-hud);letter-spacing:.12em;fill:#a9c4b8}.p1-svgk.g{fill:#ffe7a8}.p1-svgl{font:600 12px var(--f-body)}
.p1-grid{stroke:rgba(95,191,143,.08)}
.p1-panel{padding:24px;border-radius:22px;border:1px solid var(--edge);background:linear-gradient(170deg,var(--panel2),rgba(2,6,8,.7));min-width:0}
.p1-panel.g{border-color:var(--edge2);background:linear-gradient(150deg,rgba(242,201,107,.10),rgba(2,6,8,.6))}
.p1-flt{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 14px}
.p1-flt button{display:inline-flex;align-items:center;gap:8px;padding:9px 14px;border-radius:999px;border:1px solid var(--edge);background:rgba(2,10,8,.5);color:var(--ink2);font:600 .82rem var(--f-body);cursor:pointer;transition:all .2s}
.p1-flt button i{width:8px;height:8px;border-radius:50%;background:var(--c,var(--neon))}
.p1-flt button em{font:500 .62rem var(--f-hud);font-style:normal;color:var(--ink3)}
.p1-flt button:hover{color:var(--ink);border-color:var(--edge2)}
.p1-flt button.on{color:#1a1204;background:linear-gradient(135deg,var(--gold2),var(--gold));border-color:transparent}
.p1-flt button.on i{background:#1a1204}.p1-flt button.on em{color:#3a2a08}
.p1-flt.cf{margin-top:-4px}.p1-flt.cf span{font:500 .62rem var(--f-hud);letter-spacing:.18em;text-transform:uppercase;color:var(--ink3);align-self:center;margin-right:4px}
.p1-count{font:500 .66rem var(--f-hud);letter-spacing:.16em;text-transform:uppercase;color:var(--ink3);margin:0 0 14px}
.p1-count b{color:var(--gold2);font-weight:500}
.p1-wall{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.p1-card{position:relative;display:flex;flex-direction:column;padding:20px 20px 16px;border-radius:20px;border:1px solid var(--edge);background:linear-gradient(170deg,var(--panel2),rgba(2,6,8,.75));min-width:0;overflow:hidden;animation:rise .45s cubic-bezier(.2,.8,.2,1) both}
.p1-card::before{content:"";position:absolute;inset:0 0 auto;height:2px;background:linear-gradient(90deg,transparent,var(--c),transparent)}
.p1-card .th{display:flex;justify-content:space-between;align-items:center;gap:8px;font:500 .6rem var(--f-hud);letter-spacing:.16em;text-transform:uppercase;color:var(--c)}
.p1-card .fig{display:block;margin-top:14px;font:500 clamp(1.5rem,2.2vw,2.05rem)/1.05 var(--f-hud);color:var(--ink);text-shadow:0 0 18px color-mix(in srgb,var(--c) 35%,transparent)}
.p1-card .lab{margin:8px 0 0;font-size:.9rem;line-height:1.5;color:var(--ink2)}
.p1-card .mean{margin:14px 0 0;padding:12px 14px;border-radius:14px;background:rgba(95,191,143,.06);border:1px solid rgba(95,191,143,.18);font-size:.86rem;line-height:1.5;color:var(--ink);flex:1}
.p1-card .mean small{display:block;font:500 .56rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--neon);margin-bottom:4px}
.p1-card .ft{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-top:12px;font:500 .64rem var(--f-hud);color:var(--ink3);letter-spacing:.04em}
.p1-card .ft span{min-width:0}
.p1-waf{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:22px;align-items:center}
.p1-dots{display:grid;grid-template-columns:repeat(10,minmax(0,1fr));gap:8px;max-width:420px;width:100%;margin:0 auto;padding:22px;border-radius:24px;border:1px solid var(--edge);background:radial-gradient(circle at 50% 30%,rgba(95,191,143,.08),transparent 70%),rgba(2,6,8,.5)}
.p1-dots i{aspect-ratio:1;border-radius:50%;border:1px solid rgba(169,196,184,.28);background:rgba(169,196,184,.08);transition:background .35s,border-color .35s,box-shadow .35s,transform .35s}
.p1-dots i.on{background:var(--wc);border-color:var(--wc);box-shadow:0 0 10px color-mix(in srgb,var(--wc) 60%,transparent);transform:scale(1.06)}
.p1-dots i.hol{background:transparent;border:2px solid var(--wc);box-shadow:0 0 10px color-mix(in srgb,var(--wc) 50%,transparent)}
.p1-wtx b.big{display:block;font:500 clamp(2.6rem,5vw,4rem)/1 var(--f-hud);color:var(--wc,var(--gold2));text-shadow:0 0 30px color-mix(in srgb,var(--wc,#f2c96b) 40%,transparent)}
.p1-wtx p{color:var(--ink2);margin:12px 0 0}
.p1-wtx .p1-flt{margin-top:18px}
.p1-chain{display:grid;gap:10px}
.p1-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:0;border-radius:18px;border:1px solid var(--edge);background:var(--panel);overflow:hidden}
.p1-row>div{position:relative;padding:16px 18px 16px 18px;min-width:0;font-size:.87rem;line-height:1.5;color:var(--ink2)}
.p1-row>div+div{border-left:1px solid var(--edge)}
.p1-row>div:not(:last-child)::after{content:"";position:absolute;right:-7px;top:50%;width:12px;height:12px;margin-top:-6px;transform:rotate(45deg);border-top:1px solid var(--edge2);border-right:1px solid var(--edge2);background:#061612;z-index:2}
.p1-row small{display:block;font:500 .56rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-bottom:5px}
.p1-row b{color:var(--ink);font-family:var(--f-display);font-size:.92rem}
.p1-rowh{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));padding:0 18px;font:500 .6rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--ink3)}
.p1-cmp{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:18px}
.p1-cmp .p1-panel b{display:block;font:500 clamp(1.8rem,3vw,2.6rem)/1 var(--f-hud);color:var(--gold2)}
.p1-cmp .p1-panel b.n{color:var(--neon)}
.p1-cmp .p1-panel p{margin:10px 0 0;color:var(--ink2);font-size:.9rem}
.p1-cmp .p1-panel small{display:block;font:500 .6rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--ink3);margin-bottom:10px}
.p1-ctabs{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px}
.p1-ctabs button{padding:8px 13px;border-radius:12px;border:1px solid var(--edge);background:rgba(2,10,8,.5);color:var(--ink2);font:600 .8rem var(--f-body);cursor:pointer}
.p1-ctabs button.on{border-color:var(--edge2);background:rgba(242,201,107,.12);color:var(--gold2)}
.p1-chart{width:100%;min-height:250px}
.p1-chart svg{display:block;max-width:100%;height:auto}
.p1-leg{display:flex;flex-wrap:wrap;gap:8px 18px;margin-top:10px;font-size:.82rem;color:var(--ink2)}
.p1-leg span{display:inline-flex;align-items:center;gap:8px}
.p1-leg i{width:14px;height:3px;border-radius:3px;background:var(--c)}
.p1-cnote{margin:12px 0 0;font-size:.85rem;color:var(--ink2);max-width:80ch}
.p1-bars{display:grid;gap:14px}
.p1-bar{display:grid;grid-template-columns:minmax(0,200px) minmax(0,1fr) 64px;gap:14px;align-items:center;font-size:.88rem;color:var(--ink2)}
.p1-bar .tr{height:14px;border-radius:8px;background:rgba(95,191,143,.08);overflow:hidden}
.p1-bar .tr i{display:block;height:100%;border-radius:8px;background:linear-gradient(90deg,var(--c),color-mix(in srgb,var(--c) 60%,#fff));box-shadow:0 0 14px color-mix(in srgb,var(--c) 50%,transparent);width:0;transition:width 1s cubic-bezier(.2,.8,.2,1)}
.p1-bar b{font:500 .95rem var(--f-hud);color:var(--ink);text-align:right}
/* 1.3 */
.p1-mkt{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:22px;align-items:center}
.p1-ringbox{position:relative;width:100%;max-width:520px;margin:0 auto}
.p1-ringbox svg{display:block;width:100%;height:auto}
.p1-rl{font:500 13px var(--f-hud);letter-spacing:.14em}.p1-rv{font:600 19px var(--f-hud)}.p1-rs{font:500 11px var(--f-body)}
.p1-steps{list-style:none;margin:0;padding:0;display:grid;gap:8px;counter-reset:ps}
.p1-steps li{position:relative;display:grid;grid-template-columns:34px minmax(0,1fr) auto;gap:12px;align-items:center;padding:14px 16px;border-radius:16px;border:1px solid var(--edge);background:var(--panel);counter-increment:ps}
.p1-steps li::before{content:counter(ps);width:30px;height:30px;border-radius:50%;display:grid;place-items:center;border:1px solid var(--edge2);font:600 .76rem var(--f-hud);color:var(--gold2)}
.p1-steps li b{display:block;font:700 .92rem var(--f-display);color:var(--ink)}
.p1-steps li p{margin:3px 0 0;font-size:.82rem;line-height:1.45;color:var(--ink2)}
.p1-steps li em{font:500 .9rem var(--f-hud);font-style:normal;color:var(--gold2);text-align:right;white-space:nowrap}
.p1-steps li.res{border-color:var(--c);background:linear-gradient(90deg,color-mix(in srgb,var(--c) 14%,transparent),rgba(2,6,8,.4))}
.p1-steps li.res::before{content:"=";background:var(--c);color:#021510;border-color:transparent}
.p1-steps li.res em{color:var(--c);font-size:1.05rem}
.p1-form{margin-top:14px;padding:16px 18px;border-radius:16px;border:1px dashed var(--edge2);background:rgba(2,6,8,.5);font:500 .82rem/1.8 var(--f-hud);color:var(--ink2);overflow-wrap:anywhere}
.p1-form b{color:var(--gold2);font-weight:500}.p1-form i{font-style:normal;color:var(--neon)}
.p1-cc{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);gap:16px}
.p1-calc .cin label{grid-template-columns:minmax(0,1fr) 120px}
.p1-calc .cin small{grid-column:1/-1;margin-top:-2px;font-size:.76rem;color:var(--ink3);line-height:1.4}
.p1-scn{display:inline-flex;gap:4px;padding:4px;border-radius:12px;border:1px solid var(--edge);background:rgba(2,6,8,.5)}
.p1-scn button{padding:7px 12px;border-radius:9px;border:0;background:none;color:var(--ink2);font:600 .78rem var(--f-body);cursor:pointer}
.p1-scn button.on{background:linear-gradient(135deg,var(--gold2),var(--gold));color:#1a1204}
.p1-out3{display:grid;gap:10px}
.p1-out3 div{padding:14px 16px;border-radius:14px;border:1px solid color-mix(in srgb,var(--c) 40%,transparent);background:color-mix(in srgb,var(--c) 7%,transparent)}
.p1-out3 small{display:block;font:500 .58rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--c)}
.p1-out3 b{display:block;margin-top:4px;font:500 clamp(1.3rem,2.2vw,1.8rem) var(--f-hud);color:var(--ink)}
.p1-out3 span{display:block;font-size:.8rem;color:var(--ink2);margin-top:2px}
.p1-plan{margin-top:12px;padding:16px;border-radius:16px;border:1px solid var(--edge2);background:linear-gradient(150deg,rgba(242,201,107,.14),rgba(2,6,8,.6))}
.p1-plan>b{display:block;margin-top:8px;font:500 1.5rem var(--f-hud);color:var(--gold2)}.p1-plan p b{color:var(--ink)}
.p1-plan p{margin:6px 0 0;font-size:.86rem;color:var(--ink2)}
.p1-meter{height:10px;border-radius:6px;background:rgba(242,201,107,.12);margin-top:10px;overflow:hidden}
.p1-meter i{display:block;height:100%;background:linear-gradient(90deg,var(--neon),var(--gold));border-radius:6px;transition:width .5s;min-width:3px}
.p1-xc{display:grid;gap:14px}
.p1-xc .p1-bar{grid-template-columns:minmax(0,260px) minmax(0,1fr) 110px}
/* 1.4 */
.p1-psel{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-bottom:16px}
.p1-psel button{display:flex;align-items:center;gap:10px;text-align:left;padding:12px;border-radius:16px;border:1px solid var(--edge);background:rgba(2,10,8,.5);color:var(--ink2);cursor:pointer;transition:all .2s;min-width:0}
.p1-psel button span.av{flex:0 0 38px;width:38px;height:38px;display:grid;margin:0;font:700 .74rem var(--f-display);line-height:1}
.p1-psel button b{display:block;font:700 .82rem/1.2 var(--f-display);color:var(--ink)}
.p1-psel button span{display:block;font-size:.72rem;line-height:1.3;margin-top:2px}
.p1-psel button:hover{border-color:var(--edge2)}
.p1-psel button.on{border-color:var(--pc);background:linear-gradient(150deg,color-mix(in srgb,var(--pc) 22%,transparent),rgba(2,6,8,.6));box-shadow:0 18px 40px -24px var(--pc)}
.av{display:grid;place-items:center;border-radius:50%;font:700 .78rem var(--f-display);color:#021510;background:radial-gradient(circle at 30% 25%,#fff8,transparent 50%),var(--pc);box-shadow:0 0 0 3px rgba(2,6,8,.8),0 0 0 4px color-mix(in srgb,var(--pc) 60%,transparent)}
.p1-pc{display:grid;grid-template-columns:minmax(0,.95fr) minmax(0,1.3fr);border-radius:28px;overflow:hidden;border:1px solid color-mix(in srgb,var(--pc) 45%,transparent);background:linear-gradient(165deg,rgba(10,34,27,.7),rgba(2,6,8,.9));box-shadow:0 40px 90px -50px var(--pc);animation:rise .45s cubic-bezier(.2,.8,.2,1)}
.p1-pcl{position:relative;padding:28px;background:radial-gradient(420px 300px at 20% 0%,color-mix(in srgb,var(--pc) 26%,transparent),transparent 70%),linear-gradient(170deg,#f7faf8,#e8f2ec);color:#0b2219;min-width:0}
.p1-pcl .av{width:72px;height:72px;font-size:1.3rem}
.p1-pcl .kk{margin-top:18px;font:500 .62rem var(--f-hud);letter-spacing:.22em;text-transform:uppercase;color:#0f7a52}
.p1-pcl h3{margin-top:6px;font:800 clamp(1.4rem,2.4vw,1.9rem)/1.1 var(--f-display);letter-spacing:-.02em;color:#0b2219}
.p1-pcl .sw{margin-top:6px;font-style:italic;color:#36574a;font-size:.95rem}
.p1-pcl .p1-sit{margin:16px 0 0;font-size:.92rem;line-height:1.6;color:#21382e}
.p1-mcard{margin-top:20px;padding:16px 18px;border-radius:18px;background:linear-gradient(135deg,#0f7a52,#0a5a3c);color:#fff;box-shadow:0 20px 40px -20px rgba(15,122,82,.8);position:relative;overflow:hidden}
.p1-mcard::after{content:"";position:absolute;right:-20px;top:-30px;width:120px;height:120px;border-radius:50%;border:1px solid rgba(242,201,107,.4)}
.p1-mcard small{display:block;font:500 .56rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;opacity:.8}
.p1-mcard b{display:block;margin-top:4px;font:700 1.05rem var(--f-display)}
.p1-mcard span{display:block;margin-top:2px;font-size:.8rem;opacity:.9}
.p1-mcard strong{display:block;margin-top:12px;font:500 1.5rem var(--f-hud);color:#ffe7a8}
.p1-mcard em{font-style:normal;font-size:.72rem;opacity:.85}
.p1-pcr{padding:26px 28px;display:grid;gap:16px;align-content:start;min-width:0}
.p1-pcr dl{margin:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px 22px}
.p1-pcr dt{font:500 .58rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--pc)}
.p1-pcr dd{margin:4px 0 0;font-size:.88rem;line-height:1.55;color:var(--ink2)}
.p1-pcr dd b{color:var(--ink)}
.p1-pcr .full{grid-column:1/-1}
.p1-tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}
.p1-tags span{font:500 .66rem var(--f-hud);padding:4px 9px;border-radius:999px;border:1px solid var(--edge);color:var(--ink2)}
.p1-jr{display:flex;gap:6px;margin-top:6px}
.p1-jr span{flex:1;min-width:0;padding:8px 6px;border-radius:10px;border:1px solid var(--edge);text-align:center;font:600 .74rem var(--f-hud);color:var(--ink3)}
.p1-jr span small{display:block;font:500 .56rem var(--f-body);letter-spacing:0;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.p1-jr span.on{border-color:var(--pc);color:#021510;background:var(--pc)}
.p1-swi{padding:14px 16px;border-radius:14px;border:1px solid var(--edge2);background:rgba(242,201,107,.07);font-size:.9rem;color:var(--ink)}
.p1-swi small{display:block;font:500 .58rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-bottom:4px}
.p1-map{position:relative}
.p1-map svg{display:block;width:100%;height:auto}
.p1-tbl{width:100%;border-collapse:separate;border-spacing:0 6px;font-size:.88rem}
.p1-tbl th{font:500 .58rem var(--f-hud);letter-spacing:.18em;text-transform:uppercase;color:var(--ink3);text-align:left;padding:0 14px 4px}
.p1-tbl td{padding:13px 14px;background:var(--panel);color:var(--ink2);border-top:1px solid var(--edge);border-bottom:1px solid var(--edge)}
.p1-tbl td:first-child{border-left:1px solid var(--edge);border-radius:14px 0 0 14px;color:var(--ink);font-weight:600}
.p1-tbl td:last-child{border-right:1px solid var(--edge);border-radius:0 14px 14px 0;font-family:var(--f-hud);color:var(--gold2);white-space:nowrap;text-align:right}
.p1-tbl td.r{font-family:var(--f-hud);text-align:right;white-space:nowrap}
.p1-tbl tr.tot td{background:linear-gradient(90deg,rgba(242,201,107,.12),rgba(2,6,8,.4));border-color:var(--edge2)}
.p1-b2b{display:grid;grid-template-columns:auto minmax(0,1fr);gap:18px;align-items:center;margin-top:16px;padding:20px 22px;border-radius:20px;border:1px solid rgba(217,181,110,.3);background:linear-gradient(120deg,rgba(217,181,110,.08),rgba(2,6,8,.5))}
.p1-b2b .ic{width:52px;height:52px;border-radius:14px;display:grid;place-items:center;border:1px solid rgba(217,181,110,.4);color:#d9b56e}
.p1-b2b .ic svg{width:26px;height:26px}
.p1-b2b b{font:700 1rem var(--f-display)}.p1-b2b p{margin:4px 0 0;font-size:.88rem;color:var(--ink2)}
/* 1.5 */
.p1-tw{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:18px;align-items:start}
.p1-tgl{display:grid;gap:6px}
.p1-tgl button{display:grid;grid-template-columns:12px minmax(0,1fr);gap:10px;align-items:start;text-align:left;padding:10px 12px;border-radius:12px;border:1px solid var(--edge);background:rgba(2,10,8,.5);color:var(--ink2);font:600 .8rem/1.35 var(--f-body);cursor:pointer;transition:opacity .2s,border-color .2s}
.p1-tgl button i{width:12px;height:12px;border-radius:4px;background:var(--c);margin-top:2px;box-shadow:0 0 10px var(--c)}
.p1-tgl button small{display:block;font:500 .64rem var(--f-hud);color:var(--ink3);margin-top:2px;letter-spacing:.02em}
.p1-tgl button.off{opacity:.38}.p1-tgl button.off i{box-shadow:none}
.p1-yr{margin-top:18px}
.p1-yr label{display:flex;justify-content:space-between;align-items:baseline;font:500 .64rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--ink3)}
.p1-yr label b{font:500 1.6rem var(--f-hud);color:var(--gold2);letter-spacing:0}
.p1-yr input{width:100%;accent-color:var(--gold);margin-top:8px}
.p1-known{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-top:14px}
.p1-known div{padding:14px;border-radius:14px;border:1px solid var(--edge);background:var(--panel);min-width:0;transition:opacity .3s}
.p1-known div.na{opacity:.4}
.p1-known small{display:block;font:500 .56rem var(--f-hud);letter-spacing:.16em;text-transform:uppercase;color:var(--c)}
.p1-known b{display:block;margin-top:6px;font:500 1.15rem var(--f-hud);color:var(--ink)}
.p1-known span{display:block;font-size:.74rem;color:var(--ink3);margin-top:2px}
.p1-conv{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);gap:20px;align-items:center}
.p1-conv svg{display:block;width:100%;height:auto}
.p1-strand{transition:opacity .3s,stroke-width .3s}
.p1-conv.hl .p1-strand{opacity:.18}.p1-conv.hl .p1-strand.on{opacity:1;stroke-width:3.4}
.p1-clist{list-style:none;margin:0;padding:0;display:grid;gap:6px}
.p1-clist li{display:grid;grid-template-columns:30px minmax(0,1fr);gap:12px;padding:11px 14px;border-radius:14px;border:1px solid var(--edge);background:var(--panel);cursor:pointer;transition:border-color .2s,background .2s}
.p1-clist li span{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;font:600 .74rem var(--f-hud);color:var(--c);border:1px solid var(--c)}
.p1-clist li b{font:700 .88rem var(--f-display);color:var(--ink)}
.p1-clist li p{margin:2px 0 0;font-size:.8rem;line-height:1.45;color:var(--ink2)}
.p1-clist li.on{border-color:var(--c);background:linear-gradient(90deg,color-mix(in srgb,var(--c) 14%,transparent),rgba(2,6,8,.4))}
.p1-clist li.on span{background:var(--c);color:#021510}
.p1-trends{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.p1-tr{display:grid;grid-template-columns:44px minmax(0,1fr);gap:16px;padding:20px;border-radius:20px;border:1px solid var(--edge);background:linear-gradient(170deg,var(--panel2),rgba(2,6,8,.7));min-width:0;position:relative;overflow:hidden}
.p1-tr::before{content:"";position:absolute;inset:0 auto 0 0;width:3px;background:var(--c);box-shadow:0 0 14px var(--c)}
.p1-tr .n{font:900 1.5rem/1 var(--f-display);color:transparent;-webkit-text-stroke:1px var(--c)}
.p1-tr b{display:block;font:700 1rem var(--f-display)}
.p1-tr .d{display:block;margin-top:6px;font:500 .95rem var(--f-hud);color:var(--c)}
.p1-tr p{margin:6px 0 0;font-size:.87rem;line-height:1.55;color:var(--ink2)}
.p1-tr p.u{color:var(--ink)}.p1-tr p.u small{font:500 .56rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--neon);margin-right:6px}
@media (max-width:1150px){.p1-wall{grid-template-columns:repeat(2,minmax(0,1fr))}.p1-tw{grid-template-columns:1fr}.p1-tgl{grid-template-columns:repeat(2,minmax(0,1fr))}.p1-mkt,.p1-cc,.p1-conv{grid-template-columns:1fr}.p1-known{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:820px){.p1-wall,.p1-cmp,.p1-trends{grid-template-columns:1fr}.p1-waf{grid-template-columns:1fr}.p1-row{grid-template-columns:1fr}.p1-row>div+div{border-left:0;border-top:1px solid var(--edge)}.p1-row>div:not(:last-child)::after{right:auto;left:24px;top:auto;bottom:-7px;transform:rotate(135deg)}.p1-rowh{display:none}
 .p1-bar,.p1-xc .p1-bar{grid-template-columns:minmax(0,1fr) 90px}.p1-bar .tr{grid-column:1/-1;grid-row:2}
 .p1-psel{grid-template-columns:repeat(2,minmax(0,1fr))}.p1-pc{grid-template-columns:1fr}.p1-pcr dl{grid-template-columns:1fr}.p1-pcl,.p1-pcr{padding:22px}
 .p1-tbl thead{display:none}.p1-tbl,.p1-tbl tbody,.p1-tbl tr,.p1-tbl td{display:block;width:100%}.p1-tbl tr{margin-bottom:10px;border-radius:14px;border:1px solid var(--edge);background:var(--panel);overflow:hidden}.p1-tbl td,.p1-tbl td:first-child,.p1-tbl td:last-child{border:0;border-radius:0;background:none;text-align:left;padding:8px 14px}.p1-tbl td.r{text-align:left}.p1-tbl td[data-l]::before{content:attr(data-l)" · ";font:500 .58rem var(--f-hud);letter-spacing:.14em;text-transform:uppercase;color:var(--ink3)}
 .p1-steps li{grid-template-columns:30px minmax(0,1fr)}.p1-steps li em{grid-column:2;text-align:left}
 .p1-tgl{grid-template-columns:1fr}.p1-b2b{grid-template-columns:1fr}.p1-jr span small{display:none}
 .p1-panel{padding:18px}}
`;

/* =====================================================================
   1.2 THE EVIDENCE
   ===================================================================== */
const TH=[
 ['chronic','Chronic disease','#ff9b87'],['mother','Mother & child','#ffb3d1'],['city','Dar & households','#f2c96b'],
 ['money','Mobile money','#5fbf8f'],['net','Internet & phones','#d9b56e'],['dias','Diaspora','#c9b8ff'],
 ['quality','Medicine quality','#ff7b9c'],['spend','Health spending','#ffb36b']];
const thC=k=>(TH.find(t=>t[0]===k)||[])[2];
const thN=k=>(TH.find(t=>t[0]===k)||[])[1];
/* [theme, figure, label, meaning for Afya, source key, year, confidence] */
const EVW=[
 ['chronic','23.1%','of adults aged 18–69 in Tanzania have raised blood pressure (including people already on treatment).','The largest repeat need in the data. It anchors the Heart & Diabetes Care Zone, the Presha Care and Sukari Care boxes and the free Afya Check at the door.','steps_ht','2023 survey · pub. 2026','h'],
 ['chronic','46.4%','of adults aged 46–69 have raised blood pressure, against 12.6% of those aged 18–30.','Close to half of the parents of today’s working generation. Carers, seniors and diaspora customers buy on their behalf.','steps_ht','2023 survey · pub. 2026','h'],
 ['chronic','72.4%','of the people with diabetes found in the national survey had never been diagnosed.','Most of this demand is not yet visible. A free check identifies it; advisers refer to a clinic, then supply the monitoring products.','steps_dm','2023 survey · pub. 2026','h'],
 ['chronic','2.9M','adults aged 20–79 estimated to live with diabetes in 2024 (from 472,900 in 2011), projected 7.6M by 2050.','A fast-growing need for meters, strips, lancets and foot care. We plan on the lower survey figure and treat this model as the upside.','idf','2024 estimate','m'],
 ['chronic','2.2%','of people with high blood pressure had it under control in the 2012 survey; only 17.6% knew they had it.','The gap between “has it” and “manages it” is where a home-monitoring routine and reminders help. Older data, kept for the trend.','who_ht','2012 survey','m'],
 ['chronic','18.9%','of urban adults carry three or more NCD risk factors at once, against 12.6% of rural adults.','Risk concentrates in cities such as Dar es Salaam, where Store #1 and same-day delivery will operate.','steps_cl','2023 survey · pub. 2026','h'],
 ['chronic','>40%','of 1,100+ people screened at the cardiac institute’s stand at the 2026 Dar trade fair had undiagnosed hypertension.','A self-selected group, so not a prevalence rate. It shows that Dar residents will queue for a free check, which the Afya Check model assumes.','jkci','July 2026','i'],
 ['mother','4.8 → 3.6','children per woman nationally (4.8), and 3.6 in urban Mainland Tanzania.','Births remain frequent in cities. Each birth starts about two years of nappies, wipes and baby care, the basis of the Mama na Mtoto box.','dhs','2022 survey','h'],
 ['mother','85.0%','of births are attended by skilled health personnel.','Mothers already trust the clinic system. Afya Basics is the home-supplies partner after the clinic visit, never a replacement for it.','dhs','2022 survey','h'],
 ['mother','30.0%','of children under five are stunted (33.3% of boys, 26.6% of girls).','Child nutrition needs guidance, not just products. Advisers point families to clinics; the range stocks registered child-health essentials (example categories).','dhs','2022 survey','h'],
 ['mother','15.4%','of Tanzanians are aged 0–4: 9,484,171 young children counted in the census.','A large and renewing base of under-fives whose families buy baby and child-care items every month.','census','2022 census','h'],
 ['city','5,383,728','people live in Dar es Salaam region, up from 2,487,288 in 2002: more than double in twenty years.','One city is large enough to prove the full model (store, packing hub and delivery routes) before expansion.','citypop','2022 census','h'],
 ['city','1,537,293','private households in Dar es Salaam, with an average of 3.5 people each.','The real unit of the business: a household buys the box. This number is the starting point of the market size in section 1.3.','housing','2022 census','h'],
 ['city','22% → 37%','of Tanzanians live in towns and cities (2000 to 2025).','Urban life means less time, more cash income and more distance from family help: all reasons to buy health essentials in a planned way.','urban','2025 estimate','m'],
 ['city','5.7%','of the population is aged 60 or over: 3,491,983 people.','Ageing parents, often with hypertension or limited mobility, cared for by working children. Served by the Afya Senior card and the Bibi na Babu box.','census','2022 census','h'],
 ['city','16.7M','people: the capacity Dar es Salaam is being planned to host by 2050.','A planning target reported by the press, not a forecast. It signals a city that keeps growing outward, which favours delivery over travel.','dar2050','Oct 2023','i'],
 ['money','80.98M','mobile money accounts in Tanzania in March 2026, up 5.9% in one quarter.','Paying by phone is standard practice. A mobile-money-first till enables payment in under 30 seconds and automatic box renewal.','tcra26','Mar 2026','h'],
 ['money','+116%','growth in mobile money accounts, from 35.3M in 2021 to 76.5M in December 2025.','The payment rail more than doubled in five years. A business built on mobile payments now reaches almost every adult customer.','mm5','Dec 2025','h'],
 ['money','6.31bn','mobile money transactions in 2025, up from 3.74bn in 2024.','People already use their phones for everyday purchases, so a monthly box payment is a familiar habit, not a new one.','tcra26','2025 full year','h'],
 ['net','58.9M','internet subscriptions in March 2026: 84.2% penetration, from 23.8M in 2018.','App and WhatsApp ordering (repeat order under 30 seconds) can reach most households, not a niche.','tcra26','Mar 2026','h'],
 ['net','42.5%','smartphone penetration in March 2026 (29.8M devices), up from 30.7% in September 2023.','The app is for the growing smartphone half; WhatsApp and SMS cover everyone else, so no customer is left out.','tcra26','Mar 2026','h'],
 ['net','94.0%','of Dar es Salaam residents aged 15+ own a mobile phone (82.5% nationally).','Reminders by phone, SMS or WhatsApp reach nearly every adult in our first city.','census','2022 census','h'],
 ['dias','TSh 3.31T','sent home by Tanzanians abroad in the 2024/25 financial year (Sh3.313 trillion).','Money for family care already flows every month. A parent’s Afya Box turns part of it into visible, delivered care.','rem25','FY 2024/25','m'],
 ['dias','TSh 837B → 1.3T','diaspora remittances in 2021 and 2022, per the Bank of Tanzania: +60.5% in one year.','A fast-rising flow, with the government actively courting it: a growing pool for Journey E, the diaspora gift.','rem22','2021–2022','m'],
 ['dias','TSh 698B','of cross-border mobile money inflows in 2025, up 33.45%, in 5.73M transactions.','Families abroad increasingly send straight to a phone wallet, the same rail Afya Basics takes payments on.','xb','2025','m'],
 ['quality','1 in 10','medical products in low- and middle-income countries is substandard or falsified (WHO estimate).','A global estimate, not Tanzania-specific. It explains family concern, and why “registered products only” is a reason to choose Afya Basics.','who_sf','2017','m'],
 ['quality','>90%','of drugs analysed in a government post-marketing study passed laboratory quality tests.','For balance: most registered medicine passes testing. The risk sits in unregistered and informal channels, which Afya Basics does not buy from.','gphf','2022 report','m'],
 ['quality','TSh 360M','of unregistered medicines and equipment seized at Dar airport in September 2026, including diabetes and hypertension drugs.','Counterfeits target the chronic-care products in the core range. Buying only from licensed importers is a tangible customer benefit.','jnia','Sep 2026','i'],
 ['quality','2019/20','a special TMDA market inspection removed counterfeit and substandard products, including common skin creams.','Everyday items, not only prescription drugs, can be fake. Our quality checks cover the whole range, from creams to devices.','gphf','2022 report','i'],
 ['spend','27%','of all current health spending in Tanzania is paid out of pocket by households.','Families already pay for health from their own income. The plan assumes they will pay for convenience and trust at a transparent price.','nha','2021/22','h'],
 ['spend','TSh 114,752','total health spending per person per year (about USD 50) from all sources.','A household of 3.5 represents roughly TSh 400,000 a year of health spending, before nappies and personal care, which sit outside these accounts.','nha','2022','h'],
 ['spend','14.8%','of Dar es Salaam residents have NHIF or CHF insurance, twice the national 7.0%.','Dar has more formal-sector households, the first target customers. Insurance rarely covers home supplies, so these remain out of pocket.','census','2022 census','h'],
 ['spend','26 Jan 2026','Universal Health Insurance began its nationwide rollout under the 2023 Act.','More insured families means more diagnoses and more people on long-term treatment who need home supplies. Insurers are also a future partner channel.','uhi','Jan 2026','h']];

const KEYS12=['steps_ht','steps_dm','steps_cl','who_ht','idf','jkci','dhs','census','housing','citypop','urban','dar2050','tcra26','tcra25','tcra23','mm5','inet18','rem25','rem22','xb','who_sf','gphf','jnia','nha','uhi'];

const WAF={
 bp:['#ff9b87',23,0,'23 in 100','adults aged 18–69 have raised blood pressure. On a Dar street of 100 adults, that is 23 people who benefit from a monitor, regular checks and reminders.','steps_ht'],
 old:['#f2c96b',46,0,'46 in 100','adults aged 46–69 have raised blood pressure: nearly one in two of the parents’ generation.','steps_ht'],
 dm:['#d9b56e',3,2,'3 in 100','adults have diabetes, and about 2 of those 3 (72.4%) did not know it until the survey tested them. Hollow dots are the undiagnosed.','steps_dm'],
 risk:['#c9b8ff',19,0,'19 in 100','urban adults carry three or more NCD risk factors at once, against 13 in 100 in rural areas.','steps_cl']};

function sec12(s,p,pv,nx){const R=srcSet(KEYS12),c=R.c;window.__p1c12=c;
 const counts={};EVW.forEach(e=>counts[e[0]]=(counts[e[0]]||0)+1);
 const chain=[
  ['23.1% of adults have raised blood pressure','A large, repeating need that most people manage at home','Heart & Diabetes Care Zone, condition-care box, free Afya Check','Checks per day, check-to-purchase rate, members on condition-care boxes'],
  ['72.4% of diabetes cases undiagnosed','Customers do not yet know they need us','Free check at the door, adviser explains, refers to a clinic','Referrals made, repeat checks, readings saved with consent'],
  ['1,537,293 households in Dar, 3.5 people each','The household is the buyer, not the individual','Afya Box sized per household, one account for the family','Boxes per household, average box value, churn'],
  ['80.98M mobile money accounts','Paying by phone is already normal','Mobile-money-first till, push payment, zero-click renewal','Payment time under 30 s, share of renewals with no action'],
  ['TSh 3.31T sent home by the diaspora','Care money already flows from abroad, without visibility','Journey E: pay for a parent’s box in under 2 minutes, photo proof','Diaspora-paid members, gift cards sold, time to pay']];
 return secShell({s,p,pv,nx,cls:'p1',
  img:'img/today3.webp',imgAlt:'Concept image: a crowded queue at a pharmacy counter in Dar es Salaam',
  h1:'The need is measured,',em:'not assumed.',
  lede:'Thirty-three facts from Tanzania’s national surveys, census, regulators and central bank, each linked to its source and to the business decision it supports. Blood-pressure figures come from the 2023 national STEPS survey, published in 2026, which replaces the 2012 baseline.',
  mods:[
   ['The problem it solves · unsourced figures',`
    <div class="plain"><span class="modno" style="margin:0 0 12px">In plain words</span><ol>
     <li><b>A figure without a source is an opinion.</b> Every number in this section links to the page it came from, with its year.</li>
     <li><b>Outdated data misleads.</b> Many summaries still quote the 2012 national blood-pressure survey. The 2023 STEPS survey, published in 2026, is now the baseline in every section.</li>
     <li><b>Evidence differs in strength.</b> A census outweighs a press report of a screening day. Each fact carries a confidence label so the reader can weigh it.</li>
     <li><b>Each figure is tied to a decision.</b> Every card states in one sentence what the number means for the store, the Afya Box or the app.</li></ol></div>
    <div class="p1-cmp">
     <div class="p1-panel"><small>Then · 2012 national survey · adults 25–64</small><b>25.7%</b><p>had high blood pressure; just 2.2% of them had it under control. ${c('who_ht')}</p></div>
     <div class="p1-panel g"><small>Now · 2023 national survey · adults 18–69</small><b class="n">23.1%</b><p>have raised blood pressure, rising to 46.4% among adults aged 46–69. ${c('steps_ht')}</p></div></div>
    <p class="note">The two surveys cover different age groups, so the small fall is not a like-for-like trend. Both put the rate at about one adult in four.</p>
    ${p1ksplit('today3','Concept image: a crowded pharmacy counter in Dar es Salaam with a long queue',`<span class="p1k-k">Why the evidence matters</span><h3>The statistics, <em>at a pharmacy counter.</em></h3>
     <p>One adult in four has raised blood pressure ${c('steps_ht')}. In Dar es Salaam that is the man in this queue waiting twenty minutes to ask which monitor to buy, and the mother behind him who only needs nappies.</p>
     <ul><li><b>Scale.</b> 1,537,293 private households in Dar es Salaam ${c('housing')} each buy health essentials every month.</li><li><b>Hidden need.</b> 72.4% of people found with diabetes in the 2023 national survey had never been diagnosed ${c('steps_dm')}. A free check identifies them before a crisis does.</li><li><b>Trust.</b> In September 2026 unregistered medicines worth about TSh 360 million were seized at Dar airport ${c('jnia')}, which makes “registered products only” a concrete reason to switch.</li></ul>`,{pos:'50% 40%',cap:'The problem in one picture: advice, payment and stock-outs all at one crowded counter.'})}`],
   ['Our answer · three rules for every number',`
    <div class="pillars">
     <div class="pill"><span class="k">RULE 1</span><b>Cited from the page we opened</b><p>Every figure links to its source and year. A number that could not be verified is either excluded or labelled “planning estimate”.</p></div>
     <div class="pill"><span class="k">RULE 2</span><b>Labelled by confidence</b><p>${confTag('h')} national surveys, census, regulators. ${confTag('m')} older, modelled, global or press-reported official figures. ${confTag('i')} one-off reports.</p></div>
     <div class="pill"><span class="k">RULE 3</span><b>Plan on the lower number</b><p>Where two sources disagree, the business case uses the lower one. Example: diabetes is 2.9% of adults in the national survey, 9.8% in the IDF model. We plan on 2.9%.</p></div></div>`],
   ['How it works · from a number to a decision',`
    <p class="s11lead">Evidence is useful only when it leads to an operating decision and a measurable result. Five examples, read left to right.</p>
    <div class="p1-rowh"><span>The evidence</span><span>What it tells us</span><span>What Afya Basics does</span><span>How we measure it</span></div>
    <div class="p1-chain">${chain.map(r=>`<div class="p1-row"><div><small>Evidence</small><b>${r[0]}</b></div><div><small>Meaning</small>${r[1]}</div><div><small>Action</small>${r[2]}</div><div><small>Measured by</small>${r[3]}</div></div>`).join('')}</div>
    <h3 class="p1-h3">Four figures and the operations they shape</h3>
    ${p1kcards([
     ['check','Concept image: a woman taking a blood-pressure reading at the Afya Check kiosk with an adviser','23.1% raised blood pressure','The free Afya Check by the door','Quick check at the door (blood pressure, pulse, oxygen): <b>'+M().inputs.check.quick_seconds+' seconds</b>. Full check: <b>'+M().inputs.check.free_readings.length+' measurements</b> in about <b>'+M().inputs.check.minutes+' minutes</b>. Advisers explain results and refer to a clinic when needed. Flagship plan by month 12: <b>'+M().inputs.check.checks_day_m12+' checks a day</b> (planning estimate).','Evidence: 2023 STEPS survey','50% 35%'],
     ['prod-heart','Concept image: diabetes and blood-pressure supplies flat lay','72.4% diabetes undiagnosed','Condition-care boxes','Sukari Care and Presha Care deliver meter-matched strips, lancets and a validated monitor each month. Readings are saved with consent, so a patient can show his doctor three months of results.','Evidence: 2023 STEPS survey'],
     ['today2','Concept image: a mother walking between shops on a busy Dar es Salaam street','1,537,293 Dar households','A box sized for the household','The household, not the individual, is the buyer. One account covers the family, so a mother orders for her baby, her husband and her own mother in one order.','Evidence: 2022 census','50% 35%'],
     ['boxdoor','Concept image: an Afya rider handing a closed green box to a mother with her baby at her door','TSh 3.31T from the diaspora','A parent’s box paid from abroad','A son in Muscat pays in under two minutes and receives photo confirmation at the door. Remittance spending becomes verifiable care.','Evidence: Bank of Tanzania via The Citizen','50% 40%']],{min:'250px'})}`],
   ['The experience · one hundred adults on a Dar street',`
    <p class="s11lead">Each dot is one adult aged 18–69. Select a measure to see how many of one hundred adults it affects. ${tagi('From the 2023 national survey')}</p>
    <div class="p1-waf" id="p1waf"><div class="p1-dots" id="p1dots" aria-hidden="true">${'<i></i>'.repeat(100)}</div>
     <div class="p1-wtx"><b class="big" id="p1wbig">23 in 100</b><p id="p1wtxt"></p>
      <div class="p1-flt" role="group" aria-label="Choose a measure">
       <button type="button" class="on" data-w="bp" style="--c:#ff9b87"><i></i>Raised blood pressure</button>
       <button type="button" data-w="old" style="--c:#f2c96b"><i></i>Ages 46–69</button>
       <button type="button" data-w="dm" style="--c:#d9b56e"><i></i>Diabetes</button>
       <button type="button" data-w="risk" style="--c:#c9b8ff"><i></i>3+ risk factors, urban</button></div></div></div>`],
   ['Try it · filter the evidence',`
    <p class="s11lead">Filter by theme or by strength of evidence. Each card shows the figure, its implication for Afya Basics, the source and year, and a confidence label. Select the [number] to open the source.</p>
    <div class="p1-flt" id="p1th" role="group" aria-label="Filter by theme"><button type="button" data-t="all">All themes <em>${EVW.length}</em></button>${TH.map(t=>`<button type="button" data-t="${t[0]}" class="${t[0]==='chronic'?'on':''}" style="--c:${t[2]}"><i></i>${t[1]} <em>${counts[t[0]]}</em></button>`).join('')}</div>
    <div class="p1-flt cf" id="p1cf" role="group" aria-label="Filter by confidence"><span>Confidence</span><button type="button" class="on" data-c="all">Any</button><button type="button" data-c="h" style="--c:#5fbf8f"><i></i>High</button><button type="button" data-c="m" style="--c:#f2c96b"><i></i>Medium</button><button type="button" data-c="i" style="--c:#c9b8ff"><i></i>Indicative</button></div>
    <p class="p1-count" id="p1cnt"></p>
    <div class="p1-wall" id="p1wall"></div>`,'p1room'],
   ['The numbers · trends in the evidence',`
    ${p1kband('rider','Concept image: an Afya delivery rider on an electric motorbike on a Dar es Salaam street','The rails are already built','Payment, phones and delivery <em>reach almost everyone.</em>','Mobile money accounts and internet subscriptions have more than doubled since 2018. This infrastructure lets a box renew automatically, an order arrive the same day and a relative abroad pay in under two minutes. '+c('tcra26'),{pos:'60% 45%',stats:[['80.98M','mobile money accounts, March 2026'],['58.9M','internet subscriptions, March 2026'],['42.5%','smartphone penetration, March 2026']]})}
    <div class="p1-panel" style="margin-top:18px">
     <div class="p1-ctabs" id="p1ct"><button type="button" class="on" data-k="digi">Digital rails, 2018–2026</button><button type="button" data-k="age">Blood pressure by group, 2023</button><button type="button" data-k="dm">Diabetes: survey vs model</button></div>
     <div id="p1cv"></div></div>`],
   ['Risks and our answer',`
    <div class="risks">
     <div class="risk"><span class="q">National figures may not match Dar es Salaam.</span><span class="ar">→</span><span class="a">City data is used wherever it exists (households, phones, insurance). Before launch, field research in the store’s catchment confirms the household mix.</span></div>
     <div class="risk"><span class="q">Sources disagree, for example on diabetes.</span><span class="ar">→</span><span class="a">Both are shown and the plan uses the lower one. The business case does not depend on the higher estimate.</span></div>
     <div class="risk"><span class="q">Some figures come from news reports.</span><span class="ar">→</span><span class="a">They are labelled Indicative and are never used in the market-size calculation. Only High and Medium evidence feeds section 1.3.</span></div>
     <div class="risk"><span class="q">Data ages quickly: phone and payment numbers change every quarter.</span><span class="ar">→</span><span class="a">The room is refreshed each quarter from the regulator’s statistics, and every card shows its year.</span></div></div>`]],
  takeaway:'The need is <b>large, measured and growing</b>: one adult in four with raised blood pressure, 1.5 million Dar households, and payment and phone rails that now reach almost everyone.',
  doors:['s1-3','s1-4','s1-5','s3-3'],
  sources:R.list})}

function init12(){const c=window.__p1c12;const wall=document.getElementById('p1wall');if(!wall)return;let th='chronic',cf='all';
 const draw=()=>{const L=EVW.filter(e=>(th==='all'||e[0]===th)&&(cf==='all'||e[6]===cf));
  wall.innerHTML=L.map((e,i)=>`<article class="p1-card" style="--c:${thC(e[0])};animation-delay:${Math.min(i,8)*40}ms"><div class="th"><span>${thN(e[0])}</span>${confTag(e[6])}</div><b class="fig">${e[1]}</b><p class="lab">${e[2]}</p><div class="mean"><small>What it means for Afya Basics</small>${e[3]}</div><div class="ft"><span>${esc(SH[e[4]])} · ${e[5]}</span>${c(e[4])}</div></article>`).join('')||'<p class="s11lead">No cards match this filter.</p>';
  document.getElementById('p1cnt').innerHTML=`Showing <b>${L.length}</b> of ${EVW.length} facts`};
 document.querySelectorAll('#p1th button').forEach(b=>b.onclick=()=>{th=b.dataset.t;document.querySelectorAll('#p1th button').forEach(x=>x.classList.toggle('on',x===b));draw()});
 document.querySelectorAll('#p1cf button').forEach(b=>b.onclick=()=>{cf=b.dataset.c;document.querySelectorAll('#p1cf button').forEach(x=>x.classList.toggle('on',x===b));draw()});
 draw();
 /* waffle */
 const dots=[...document.querySelectorAll('#p1dots i')];
 const wset=k=>{const w=WAF[k];const box=document.getElementById('p1waf');box.style.setProperty('--wc',w[0]);
  dots.forEach((d,i)=>{d.className=i<w[1]?(i<w[2]?'hol':'on'):''});
  document.getElementById('p1wbig').textContent=w[3];document.getElementById('p1wtxt').innerHTML=w[4]+' '+c(w[5]);
  document.querySelectorAll('#p1waf .p1-flt button').forEach(b=>b.classList.toggle('on',b.dataset.w===k))};
 document.querySelectorAll('#p1waf .p1-flt button').forEach(b=>b.onclick=()=>wset(b.dataset.w));wset('bp');
 /* charts */
 let ck='digi';const cv=document.getElementById('p1cv');
 const chart=()=>{if(!document.getElementById('p1cv'))return;
  if(ck==='digi'){cv.innerHTML=`<div class="p1-chart" id="p1lc"></div><div class="p1-leg"><span style="--c:#5fbf8f"><i></i>Mobile money accounts · 80.98M</span><span style="--c:#d9b56e"><i></i>Internet subscriptions · 58.9M</span><span style="--c:#f2c96b"><i></i>Smartphone penetration · 42.5%</span></div><p class="p1-cnote">Every dot is a published TCRA figure: 2018 ${c('inet18')}, 2021 ${c('mm5')}, September 2023 ${c('tcra23')}, March 2025 ${c('tcra25')}, December 2025 and March 2026 ${c('tcra26')}. Lines join published points only; nothing is interpolated. Mobile money accounts more than doubled between 2021 and March 2026.</p>`;
   lineChart(document.getElementById('p1lc'),{aria:'Line chart of mobile money accounts, internet subscriptions and smartphone penetration in Tanzania, 2018 to 2026',x0:2017.8,x1:2026.6,y0:0,y1:90,yt:[0,20,40,60,80],xt:[2018,2019,2020,2021,2022,2023,2024,2025,2026],area:true,
    series:[{name:'Mobile money accounts',c:'#5fbf8f',label:false,pts:[[2021,35.3,0,'35.3M (2021)'],[2023.7,51.4,0,'51.4M (Sep 2023)'],[2025.2,66.5,0,'66.5M (Mar 2025)'],[2025.95,76.47,0,'76.47M (Dec 2025)'],[2026.2,80.98,0,'80.98M (Mar 2026)']]},
     {name:'Internet subscriptions',c:'#d9b56e',label:false,pts:[[2018,23.81,0,'23.81M (2018)'],[2023.7,34.47,0,'34.47M (Sep 2023)'],[2025.2,49.3,0,'49.3M (Mar 2025)'],[2025.95,58.1,0,'58.1M (Dec 2025)'],[2026.2,58.9,0,'58.9M (Mar 2026)']]},
     {name:'Smartphone penetration %',c:'#f2c96b',label:false,pts:[[2023.7,30.7,0,'30.7% (Sep 2023)'],[2025.2,35.29,0,'35.29% (Mar 2025)'],[2025.95,41.82,0,'41.82% (Dec 2025)'],[2026.2,42.5,0,'42.5% (Mar 2026)']]}]})}
  else if(ck==='age'){const B=[['Adults 18–30',12.6,'#d9b56e'],['All adults 18–69',23.1,'#ff9b87'],['Adults 46–69',46.4,'#f2c96b'],['Normal weight',19.2,'#5fbf8f'],['Overweight or obese',36.4,'#ff7b9c']];
   cv.innerHTML=`<div class="p1-bars">${B.map(b=>`<div class="p1-bar" style="--c:${b[2]}"><span>${b[0]}</span><span class="tr"><i data-w="${b[1]/50*100}"></i></span><b>${b[1]}%</b></div>`).join('')}</div><p class="p1-cnote">Share of adults with raised blood pressure (or on treatment), 2023 national STEPS survey ${c('steps_ht')}. Bar scale: 0–50%. Risk rises steeply with age and weight, so the Heart & Diabetes Care Zone and the Afya Senior card serve overlapping households.</p>`;
   requestAnimationFrame(()=>cv.querySelectorAll('.tr i').forEach(i=>i.style.width=i.dataset.w+'%'))}
  else{cv.innerHTML=`<div class="p1-cmp" style="margin-top:0"><div class="p1-panel"><small>National STEPS survey · measured · 2023</small><b class="n">2.9%</b><p>of adults aged 18–69 have diabetes, rising to 6.5% at ages 46–69. 72.4% of cases were undiagnosed. ${c('steps_dm')}</p></div><div class="p1-panel g"><small>IDF Diabetes Atlas · modelled · 2024</small><b>9.8%</b><p>age-standardised prevalence, 2.9 million adults aged 20–79, 60.2% undiagnosed; 7.6 million projected for 2050. ${c('idf')}</p></div></div><p class="p1-cnote">The gap has a clear cause: the survey measured blood sugar in a national sample, while the atlas is a statistical model with a different age band and method. Both agree that <b>most people with diabetes are undiagnosed</b>. Afya Basics plans on the lower, measured figure.</p>`}};
 document.querySelectorAll('#p1ct button').forEach(b=>b.onclick=()=>{ck=b.dataset.k;document.querySelectorAll('#p1ct button').forEach(x=>x.classList.toggle('on',x===b));chart()});
 chart();onResize(()=>{if(ck==='digi')chart()})}

/* =====================================================================
   1.3 MARKET SIZE
   ===================================================================== */
const MK={hh:1537293,pop:5383728,natpop:61741120,che:6718540e6,oop:.27,growth:.021};
const CSS13C=`
html:not(.p0-swon) .p1-sw{display:none!important}html.p0-swon .p1-en{display:none!important}
.p1-city{position:relative;border-radius:22px;overflow:hidden;border:1px solid rgba(255,255,255,.1);min-height:300px}
.p1c-bg{position:absolute;inset:0}.p1c-bg img{width:100%;height:100%;object-fit:cover;opacity:.28;filter:saturate(.8)}
.p1c-bg::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(2,8,6,.6),rgba(2,8,6,.92))}
.p1c-in{position:relative;padding:20px}
.p1c-hd{display:flex;justify-content:space-between;align-items:baseline;gap:10px;flex-wrap:wrap;margin-bottom:12px}.p1c-hd b{font:700 1.05rem var(--f-display,inherit)}.p1c-hd span{font:600 .7rem var(--f-hud,monospace);letter-spacing:.12em;color:rgba(244,251,247,.65)}
.p1c-grid{display:grid;grid-template-columns:repeat(25,minmax(0,1fr));gap:4px}
.p1c-grid i{display:block;aspect-ratio:1}.p1c-grid svg{width:100%;height:100%;display:block}
.p1c-grid path{fill:rgba(255,255,255,.13);transition:fill .5s var(--d)}
.p1c-grid i.n path{fill:#f2c96b}.p1c-grid i.s path{fill:#5fbf8f}.p1c-grid i.f path{fill:#d9b56e}
.p1c-grid i.f{filter:drop-shadow(0 0 6px #d9b56e);animation:p1cf 1.6s ease-in-out infinite}@keyframes p1cf{50%{transform:scale(1.35)}}
.p1c-leg{display:grid;grid-template-columns:1fr;gap:8px;margin-top:16px;font-size:.84rem}
.p1c-leg span{display:flex;align-items:center;gap:8px;color:rgba(244,251,247,.8)}.p1c-leg b{margin-left:auto;font:500 .8rem var(--f-hud,monospace);color:#fff}
.p1c-leg i{width:12px;height:12px;border-radius:3px;flex:none}.p1c-leg .a i{background:rgba(255,255,255,.25)}.p1c-leg .n i{background:#f2c96b}.p1c-leg .s i{background:#5fbf8f}.p1c-leg .f i{background:#d9b56e}
@media(max-width:700px){.p1c-grid{grid-template-columns:repeat(20,minmax(0,1fr))}.p1c-leg{grid-template-columns:1fr}}
`;
function sec13(s,p,pv,nx){addCSS('p13c',CSS13C);const R=srcSet(['housing','citypop','census','steps_ht','nha','idf','tcra26']),c=R.c;window.__p1c13=c;
 const I=M().inputs,box=I.members.avg_box,base=M().get('base');
 const natOOP=MK.che*MK.oop,darShare=MK.pop/MK.natpop,darOOP=natOOP*darShare;
 return secShell({s,p,pv,nx,cls:'p1',
  img:'img/j-aerial.webp',imgAlt:'Concept image: aerial view of Dar es Salaam at golden hour, the harbour and the Msasani peninsula',
  h1:'One city is a large market.',em:'Year 1 needs well under 1% of it.',
  lede:'The market is sized bottom-up, from the households counted in Dar es Salaam’s 2022 census, not top-down from regional estimates. Each step is shown, each input is cited or labelled as a planning estimate, and every assumption can be changed in the calculator.',
  mods:[
   ['The problem it solves · inflated market sizes',`
    <div class="plain"><span class="modno" style="margin:0 0 12px">In plain words</span><ol>
     <li><b>Large headline figures say little.</b> “The health market is worth billions” does not tell an investor how many families will buy a box from one store.</li>
     <li><b>The base is counted households.</b> The 2022 census counted ${nf(MK.hh)} private households in Dar es Salaam ${c('housing')}. Every layer below is a share of those homes.</li>
     <li><b>Each layer answers one question.</b> How many homes have a repeating health need? How many of those can pay for a planned, quality service? How many can one store, its app and its riders win first?</li>
     <li><b>The test is the share the plan requires.</b> A plan that needed most of the reachable market would not be credible. The master model’s Year-1 revenue equals well under 1% of it.</li></ol></div>`],
   ['Our answer · three layers of the market',`
    <p class="s11lead">Market sizing is three questions asked in order, each narrower than the last. Each layer is a group of Dar es Salaam households; the calculation below puts a number on each.</p>
    ${p1kcards([
     ['today2','Concept image: a mother walking between shops on a busy Dar es Salaam street','Total · TAM','Every Dar home with a repeating health need, fully served','Example: a home with a baby in nappies, or a father who checks his blood sugar every morning. If every such home bought its monthly essentials at Afya Box prices, this is its yearly spend. It is a ceiling, not a forecast.','Starts from 1,537,293 counted households','50% 35%'],
     ['boxdoor','Concept image: an Afya rider handing a closed green box to a mother with her baby at her door','Reachable · SAM','The homes that can afford and want a planned, quality service','Example: a salaried couple in Sinza or Mbezi who pay by mobile money and value a box at the door over a cheaper stall across town. Prices, box plans and same-day delivery are designed for this group.','About 30% of need homes · planning estimate','50% 40%'],
     ['exterior','Concept image: the Afya Basics street-front flagship at dusk','First target · SOM','The share one flagship, its app and its riders can win first','Example: homes inside the store’s catchment and same-day delivery routes that come in for a free Afya Check, buy once, then join a box. One store cannot serve the whole city, and the plan does not assume it will.','About 1% of reachable homes · planning estimate','50% 45%']])}`],
   ['How it works · the calculation, step by step',`
    <div class="p1-mkt">
     <div class="p1-ringbox" id="p1rings" aria-label="Dar es Salaam households as 400 houses: total, reachable and first-target market"></div>
     <ol class="p1-steps" id="p1steps"></ol></div>
    <div class="p1-form" id="p1form"></div>
    <p class="note">Inputs with a [number] are cited · values marked planning estimate are founder assumptions that can be changed in the calculator below</p>`],
   ['The experience · a top-down cross-check',`
    <p class="s11lead">A second method reaches the same range. National health accounts show how much Tanzanian households pay for health out of pocket. Allocated to Dar es Salaam by population, it can be compared with the bottom-up result.</p>
    <div class="p1-xc p1-panel" id="p1xc">
     <div class="p1-bar" style="--c:#ffb36b"><span>All health spending, Tanzania, 2021/22 ${c('nha')}</span><span class="tr"><i data-w="100"></i></span><b>${big(MK.che)}</b></div>
     <div class="p1-bar" style="--c:#ff9b87"><span>Paid out of pocket by households (27%) ${c('nha')}</span><span class="tr"><i data-w="${MK.oop*100}"></i></span><b>${big(natOOP)}</b></div>
     <div class="p1-bar" style="--c:#f2c96b"><span>Dar es Salaam’s population share (${(darShare*100).toFixed(1)}%) ${c('census')}</span><span class="tr"><i data-w="${natOOP*darShare/MK.che*100}"></i></span><b>${big(darOOP)}</b></div>
     <div class="p1-bar" style="--c:#5fbf8f"><span>Our bottom-up reachable market (SAM, default settings)</span><span class="tr"><i id="p1xsam" data-w="0"></i></span><b id="p1xsamv">–</b></div></div>
    <p class="p1-cnote">The top-down figure counts only medical spending (fees and medicines). It leaves out nappies, wipes, sanitary and personal-care products, which are a large part of an Afya Box, and it gives Dar only its population share, although city households earn and insure more (14.8% insured in Dar vs 7.0% nationally ${c('census')}). Even so, the two methods land in the <b>same order of magnitude</b>: tens to low hundreds of billions of shillings a year. ${PE}</p>
    ${p1kband('rider','Concept image: an Afya rider on an electric motorbike on a Dar es Salaam street','What the first target looks like on the ground','A small catchment, <em>served in depth.</em>','Year 1 does not depend on the whole city. It depends on the streets one store and its riders can serve the same day. The plan’s first-year members sit well inside the first-target homes in the calculator above. '+PE,{r:1,pos:'35% 45%',stats:[[nf(M().get('base').months[11].members),'Afya Box members by month 12, flagship plan (model)'],[M().inputs.online.orders_day_m12+' a day','online orders by month 12'],['15:00','order cut-off for same-day delivery in Dar']]})}`],
   ['Try it · the market calculator',`
    <div class="calc p1-calc">
     <div class="cin">
      <p class="s11lead" style="margin:0 0 4px">Change any assumption. The houses, the steps above and the results update together.</p>
      <label><span>Yearly growth in households to 2027 ${PE}</span><input type="range" id="m_g" min="0" max="5" step="0.1" value="2.1"><output id="o_g"></output><small>2.1% is Dar’s average yearly population growth 2012–2022, calculated from the census counts ${c('citypop')}.</small></label>
      <label><span>Homes with a repeating health need ${PE}</span><input type="range" id="m_need" min="20" max="80" step="1" value="50"><output id="o_need"></output><small>Context: 23.1% of adults have raised blood pressure ${c('steps_ht')}, 15.4% of people are under five and 5.7% are over 60 ${c('census')}, and a Dar home has 3.5 people. 50% is cautious.</small></label>
      <label><span>Monthly spend per home on essentials</span><input type="range" id="m_spend" min="20000" max="150000" step="5000" value="${box}"><output id="o_spend"></output><small>Default: the model’s average Afya Box price, <b>${tz(box)}</b> a month, including the box and delivery at cost.</small></label>
      <label><span>Homes able and willing to pay for a planned service ${PE}</span><input type="range" id="m_aff" min="10" max="60" step="1" value="30"><output id="o_aff"></output><small>Middle- and higher-income, salaried or business households. To be checked by catchment research before launch.</small></label>
      <label><span>Share of reachable homes won first ${PE}</span><input type="range" id="m_win" min="0.25" max="5" step="0.25" value="1"><output id="o_win"></output><small>One store, its app, WhatsApp and same-day riders, over the first years.</small></label>
     </div>
     <div class="cout">
      <div class="p1-out3">
       <div style="--c:#f2c96b"><small>Total · TAM</small><b id="r_tam">–</b><span id="r_tamh"></span></div>
       <div style="--c:#5fbf8f"><small>Reachable · SAM</small><b id="r_sam">–</b><span id="r_samh"></span></div>
       <div style="--c:#d9b56e"><small>First target · SOM</small><b id="r_som">–</b><span id="r_somh"></span></div></div>
      <div class="p1-plan"><div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap"><small style="font:500 .58rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--gold)">What the plan needs · Year 1</small><div class="p1-scn" id="m_scn">${M().scenarios.map(k=>`<button type="button" data-k="${k}" class="${k==='base'?'on':''}">${M().inputs.scenarios[k].label}</button>`).join('')}</div></div>
       <b id="r_need">–</b><p id="r_needp"></p><div class="p1-meter"><i id="r_meter"></i></div></div>
     </div></div>
    <p class="note">Planning estimates · results are yearly spending at today’s prices · the plan figure is the master model’s Year-1 revenue (flagship, net of VAT) in the chosen scenario</p>`,'p1calc'],
   ['The numbers · from the master model',`
    <div class="nums">
     <div class="num"><b>${nf(MK.hh)}</b><span>Dar households counted in 2022 ${c('housing')}</span></div>
     <div class="num"><b>${nf(box)}</b><span>TSh · average Afya Box per month (model, planning estimate)</span></div>
     <div class="num"><b>${big(MODEL.cur.get('base').y1.revenue)}</b><span>Year-1 revenue, ${MODEL.isLean()?'start-small':'flagship'} base case, net of VAT (model)</span></div>
     <div class="num"><b>${nf(base.y1.revenue/(box*12))}</b><span>homes-equivalent: Year-1 revenue ÷ one home’s yearly box spend</span></div>
     <div class="num g"><b>${nf(base.years[11].members)}</b><span>members by year 12 across ${I.growth.stores_by_year[11]} stores (model). Year-12 revenue: <b>${big(base.years[11].revenue)}</b></span></div></div>
    <p class="note">Year-1 revenue includes walk-in and online sales as well as boxes. “Homes-equivalent” expresses it in households for comparison with the market layers.</p>`],
   ['Risks and our answer',`
    <div class="risks">
     <div class="risk"><span class="q">The “need” and “afford” shares are assumptions, not survey results.</span><span class="ar">→</span><span class="a">They are labelled, adjustable and set cautiously. Before launch, a catchment survey around the chosen site measures them directly and the model is updated.</span></div>
     <div class="risk"><span class="q">Not every need household would spend a full box price.</span><span class="ar">→</span><span class="a">That is why TAM is a ceiling, not a forecast. The plan is tested against SAM and needs only a fraction of one per cent of it in Year 1.</span></div>
     <div class="risk"><span class="q">Household numbers are from 2022.</span><span class="ar">→</span><span class="a">The calculator grows them to 2027 at the city’s own historic rate; set growth to zero to see the 2022 base.</span></div>
     <div class="risk"><span class="q">Competitors serve the same homes.</span><span class="ar">→</span><span class="a">Most families split purchases across many outlets today. The plan needs a small share of their monthly basket, won through convenience, trust and the box. See section 5.3.</span></div></div>`]],
  takeaway:'The reachable market in Dar es Salaam alone is worth <b>hundreds of billions of shillings a year</b>, and Year 1 of the plan needs <b>well under one per cent</b> of it.',
  doors:['s1-4','s3-4','s5-4','s6-1'],
  sources:R.list})}

function rings(el,v){if(!el)return;const N=400,per=v.hh27/N,cN=Math.round(v.nh/per),cS=Math.round(v.sh/per),cF=Math.max(1,Math.round(v.somh/per)),cP=Math.max(1,Math.round((v.eq||0)/per));
 if(!el.dataset.built){el.dataset.built=1;el.classList.add('p1-city');el.innerHTML=`<div class="p1c-bg"><img src="img/j-aerial.webp" alt="" loading="lazy" onerror="this.src='img/c-port.webp'"></div><div class="p1c-in"><div class="p1c-hd"><b>${L1('Dar es Salaam, as 400 houses','Dar es Salaam, kama nyumba 400')}</b><span id="p1c-per"></span></div><div class="p1c-grid" id="p1c-grid">${Array.from({length:N},(_,i)=>`<i style="--d:${(i%25)*14+Math.floor(i/25)*30}ms"><svg viewBox="0 0 12 12"><path d="M1 6 L6 1.6 L11 6 V11 H1 Z"/></svg></i>`).join('')}</div>
  <div class="p1c-leg"><span class="a"><i></i>${L1('All households, 2027','Kaya zote, 2027')} <b id="p1c-a"></b></span><span class="n"><i></i>${L1('Repeating health need · TAM','Mahitaji ya kila mwezi · TAM')} <b id="p1c-n"></b></span><span class="s"><i></i>${L1('Able and willing to pay · SAM','Wanaoweza na kutaka kulipa · SAM')} <b id="p1c-s"></b></span><span class="f"><i></i>${L1('First target · SOM','Lengo la kwanza · SOM')} <b id="p1c-f"></b></span></div></div>`}
 const cells=[...el.querySelectorAll('#p1c-grid i')];cells.forEach((c,i)=>{c.className=i<cF?'f':i<cS?'s':i<cN?'n':'a'});
 el.querySelector('#p1c-per').textContent=(document.documentElement.classList.contains('p0-swon')?'nyumba 1 ≈ kaya ':'1 house ≈ ')+nf(per)+(document.documentElement.classList.contains('p0-swon')?'':' homes');
 el.querySelector('#p1c-a').textContent=nf(v.hh27);el.querySelector('#p1c-n').textContent=nf(v.nh)+' · '+big(v.tam);el.querySelector('#p1c-s').textContent=nf(v.sh)+' · '+big(v.sam);el.querySelector('#p1c-f').textContent=nf(v.somh)+' · '+big(v.som)}

function init13(){const g=id=>document.getElementById(id);if(!g('m_g'))return;const c=window.__p1c13;let scn='base';
 const up=()=>{const gr=+g('m_g').value/100,need=+g('m_need').value/100,sp=+g('m_spend').value,aff=+g('m_aff').value/100,win=+g('m_win').value/100;
  g('o_g').textContent=(gr*100).toFixed(1)+'%';g('o_need').textContent=Math.round(need*100)+'%';g('o_spend').textContent=tz(sp);g('o_aff').textContent=Math.round(aff*100)+'%';g('o_win').textContent=(win*100).toFixed(2).replace(/0$/,'')+'%';
  const hh27=MK.hh*Math.pow(1+gr,5),nh=hh27*need,yr=sp*12,tam=nh*yr,sh=nh*aff,sam=sh*yr,somh=sh*win,som=somh*yr;
  const SW=document.documentElement.classList.contains('p0-swon'),HM=SW?' kaya':' homes';
  g('r_tam').textContent=big(tam);g('r_tamh').textContent=nf(nh)+HM+' × '+tz(yr)+(SW?' kwa mwaka':' a year');
  g('r_sam').textContent=big(sam);g('r_samh').textContent=nf(sh)+HM;
  g('r_som').textContent=big(som);g('r_somh').textContent=nf(somh)+HM;
  const md=M().get(scn),y1=md.y1.revenue,eq=y1/yr,pct=eq/sh*100;
  g('r_need').textContent=(pct<0.01?'<0.01':pct.toFixed(2))+(SW?'% ya SAM':'% of SAM');
  g('r_needp').innerHTML=SW?`Mapato ya Mwaka 1 katika hali ya ${({Base:'msingi',Best:'bora',Downside:'mbaya'})[md.label]||md.label} ya ${big(y1)} ni sawa na matumizi ya mwaka ya takriban <b>kaya ${nf(eq)}</b>, dhidi ya kaya ${nf(sh)} zinazofikika${pct<=win*100?', ndani ya sehemu yako ya lengo la kwanza':', juu ya sehemu yako ya lengo la kwanza: iongeze au punguza mpango'}.`:`${md.label} case Year-1 revenue of ${big(y1)} equals the yearly spend of about <b>${nf(eq)} homes</b>, against ${nf(sh)} reachable homes${pct<=win*100?', inside your first-target share':', above your first-target share: raise it or lower the plan'}.`;
  g('r_meter').style.width=Math.min(100,pct/(win*100)*100)+'%';
  rings(g('p1rings'),{tam,sam,som,hh27,nh,sh,somh,eq});
  const st=[
   ['Households in Dar es Salaam, 2022','Counted in the 2022 census '+c('housing'),nf(MK.hh)],
   ['Grown to 2027','× (1 + '+(gr*100).toFixed(1)+'%)⁵ '+PE,nf(hh27)],
   ['With a repeating health need','× '+Math.round(need*100)+'% '+PE,nf(nh)],
   ['Yearly spend if fully served','× '+tz(sp)+(SW?' × miezi 12 (bei ya box ya modeli)':' × 12 months (model box price)'),tz(yr)],
   ['Total market · TAM','',big(tam),'#f2c96b'],
   ['Able and willing to pay','× '+Math.round(aff*100)+'% of need homes '+PE,nf(sh)],
   ['Reachable market · SAM','',big(sam),'#5fbf8f'],
   ['First-target share','× '+(win*100).toFixed(2).replace(/0$/,'')+'% '+PE,nf(somh)],
   ['First-target market · SOM','',big(som),'#d9b56e']];
  g('p1steps').innerHTML=st.map(x=>x[3]?`<li class="res" style="--c:${x[3]}"><div><b>${x[0]}</b></div><em>${x[2]}</em></li>`:`<li><div><b>${x[0]}</b><p>${x[1]}</p></div><em>${x[2]}</em></li>`).join('');
  g('p1form').innerHTML=`<b>TAM</b> = households × (1+g)<sup>5</sup> × need share × monthly spend × 12 = ${nf(MK.hh)} × ${(1+gr).toFixed(3)}<sup>5</sup> × ${need.toFixed(2)} × ${nf(sp)} × 12 = <i>${big(tam)}</i><br><b>SAM</b> = TAM × afford share = ${big(tam)} × ${aff.toFixed(2)} = <i>${big(sam)}</i><br><b>SOM</b> = SAM × first-target share = ${big(sam)} × ${win.toFixed(4)} = <i>${big(som)}</i>`;
  const xs=g('p1xsam');if(xs){const che=MK.che;xs.dataset.w=Math.min(100,sam/che*100);xs.style.width=xs.dataset.w+'%';g('p1xsamv').textContent=big(sam)}};
 ['m_g','m_need','m_spend','m_aff','m_win'].forEach(k=>g(k).oninput=up);
 document.querySelectorAll('#m_scn button').forEach(b=>b.onclick=()=>{scn=b.dataset.k;document.querySelectorAll('#m_scn button').forEach(x=>x.classList.toggle('on',x===b));up()});
 up();requestAnimationFrame(()=>document.querySelectorAll('#p1xc .tr i').forEach(i=>i.style.width=i.dataset.w+'%'))}

/* =====================================================================
   1.4 OUR CUSTOMERS
   ===================================================================== */
const JN=[['A','Walk-in'],['B','Advice'],['C','Online'],['D','Box member'],['E','Diaspora']];
/* box multiplier vs model average box, visits = walk-in/online top-ups per month (planning estimates) */
const PER=[
 {k:'mm',ini:'MM',c:'#ffb3d1',name:'Mama na mtoto',sw:'“Nappies always seem to finish on a Sunday.”',who:'A new mother and her baby',
  sit:'Neema, 27 (illustrative), lives in Sinza with her husband and their nine-month-old son. She works mornings at a salon; her husband is at work all day. Today she buys nappies, wipes and lotion in three places, and every size change means another hunt.',
  needs:'The right nappy size every month, wipes, baby lotion and soap, a thermometer, oral rehydration salts for emergencies, and her own iron and folic acid while breastfeeding.',
  prod:['Nappies (size swaps)','Baby wipes','Baby lotion & soap','Digital thermometer','ORS sachets','Iron & folic acid'],
  box:'Mama na Mtoto box',card:'family',mult:1.0,visits:0.5,j:['D','C'],
  sw2:'From the first month, nappies arrive before they run out, and the size changes with one Afya Choice swap up to 12 days before month end.'},
 {k:'mj',ini:'MJ',c:'#f2c96b',name:'Mama mjamzito',sw:'“I want to check my pressure without losing half a day.”',who:'An expectant mother',
  sit:'Rehema, 31 (illustrative), is five months pregnant with her second child and lives in Kigamboni. Her clinic visits are long, her feet swell in the afternoon, and the list of things to buy for the baby grows every week.',
  needs:'Prenatal vitamins as advised by her clinic, maternity pads, stretch-mark cream, comfortable support items, a quick blood-pressure reading between clinic visits, and later a ready new-baby kit.',
  prod:['Prenatal vitamins (as advised)','Maternity pads','Skin-care cream','Support items','New-baby kit (one-off)'],
  box:'Mama Mjamzito box, then Mama na Mtoto',card:'family',mult:0.8,visits:0.5,j:['B','D'],
  sw2:'A free Afya Check whenever she passes, with a clear “see your clinic today” if a reading is high, and delivery home in the last weeks.'},
 {k:'bd',ini:'BK',c:'#ff9b87',name:'Baba na kisukari',sw:'“My strips must fit my meter, every time.”',who:'A father living with diabetes and high blood pressure',
  sit:'Hassan, 54 (illustrative), runs a hardware shop in Mbezi. He was diagnosed with type 2 diabetes three years ago and now also has high blood pressure. He often runs out of strips, and some pharmacies stock only strips that do not fit his meter.',
  needs:'Test strips matched to his meter, lancets, a reliable blood-pressure monitor, foot-care products, sugar-free options, and a monthly check with his readings saved over time.',
  prod:['Glucose strips (meter-matched)','Lancets','BP monitor & cuff','Foot-care cream','Sharps container'],
  box:'Sukari Care box',card:'care',mult:1.1,visits:1,j:['B','D'],
  sw2:'His meter is saved to his account, so the right strips always come. A monthly full check and a reading history he can show his doctor.'},
 {k:'cr',ini:'CA',c:'#c9b8ff',name:'Carer of an elderly parent',sw:'“I can’t leave work early every week to buy Mama’s things.”',who:'A daughter caring for her mother',
  sit:'Halima, 36 (illustrative), is an accountant in the city centre. Her mother, 78, lives in Temeke with high blood pressure and limited mobility after a fall. Halima buys adult diapers, creams and batteries for the monitor, and arranges everything by phone.',
  needs:'Adult diapers and wipes, barrier cream for the skin, monitor batteries, a walking frame or wheelchair to rent, and delivery straight to her mother’s door with a carer login.',
  prod:['Adult diapers','Wipes & barrier cream','Monitor batteries','Walking frame (rental)','Bed pads'],
  box:'Bibi na Babu box',card:'senior',mult:1.2,visits:0.5,j:['C','D'],
  sw2:'A carer account: she manages her mother’s box from her desk, gets the reminders, and the equipment rental is delivered and collected.'},
 {k:'rc',ini:'RJ',c:'#d9b56e',name:'Recovering from injury',sw:'“I need dressings today, not next week.”',who:'A man recovering after surgery',
  sit:'Peter, 41 (illustrative), had knee surgery after a motorbike accident and lives in Upanga. For six to eight weeks he needs dressings, cold packs and crutches, and he cannot walk between shops.',
  needs:'Sterile dressings and tape, cold and hot packs, crutches or a knee brace (rent or buy), pain-relief options available without prescription, and someone who can explain how to use them.',
  prod:['Sterile dressings','Cold/hot packs','Crutches (rental)','Knee brace','Pain-relief (OTC)'],
  box:'Kupona box for 6–8 weeks of recovery',card:'green',mult:0.9,visits:1,j:['B','C'],
  sw2:'Same-day delivery of a ready recovery kit, and advice from the store lead, a physiotherapy graduate, on using the aids safely.'},
 {k:'ds',ini:'DS',c:'#5fbf8f',name:'Mwana ughaibuni',sw:'“I send money home. I want to see it become care.”',who:'A son working abroad',
  sit:'Abdul, 33 (illustrative), works in Muscat. His mother in Dar es Salaam has high blood pressure and lives alone since his father passed. He sends money monthly but cannot be sure it becomes her tablets, monitor batteries and daily essentials.',
  needs:'A monthly box for his mother paid by international card in under two minutes, a photo confirmation when it arrives, reminders, and her Afya Check readings shared with her permission.',
  prod:['Parent’s care box','BP monitor','Personal-care essentials','Gift card (occasions)'],
  box:'Presha Care or Bibi na Babu box, paid from abroad',card:'senior',mult:1.0,visits:0,j:['E','D'],
  sw2:'Photo confirmation at the door, the same renewal reminders as his mother, and her readings shared with her consent.'}];
const PPH={mm:[['h-mm','At home in Sinza with her nine-month-old: nappies, wipes and lotion every month','50% 40%'],['boxdoor','With Afya: the box handed over at her door','50% 40%'],'prod-baby'],
 mj:[['h-mj','A free blood-pressure reading between antenatal visits, explained by an adviser','50% 40%'],['prod-care','Personal and maternity care, chosen with an adviser','50% 50%'],'prod-care'],
 bd:[['h-bd','Every morning: a glucose reading at the kitchen table before work','50% 40%'],['team','Advisers who explain his readings in plain words','50% 30%'],'prod-heart'],
 cr:[['h-cr','A daughter who works full time, and a mother who needs care every day','50% 40%'],['rider','Delivered to Mama’s door in Temeke, booked from the office','50% 45%'],'prod-senior'],
 rc:[['h-rc','Six weeks after knee surgery: dressings, cold packs and crutches at home','50% 45%'],['hub','A recovery kit packed and on its way the same day','50% 40%'],'prod-firstaid'],
 ds:[['h-ds','In Muscat, the photo arrives: his mother’s box, delivered at her door','50% 40%'],['rider','Photo proof at the door, sent to his phone','50% 45%'],'prod-heart']};
const pthumb=(x,w,h)=>`<span class="p1-th" style="width:${w}px;height:${h}px;background-image:url(img/${PPH[x.k][0][0]}.webp);background-position:${PPH[x.k][0][2]}" aria-hidden="true"></span>`;
const cardBy=k=>M().inputs.cards.find(x=>x.key===k);
function spend(pp,plan){const I=M().inputs,f=I.members.plans['m'+plan],bx=I.members.avg_box*pp.mult*f,cd=cardBy(pp.card).fee_year/12,tp=I.store.basket*pp.visits;return {bx,cd,tp,tot:bx+cd+tp}}

function sec14(s,p,pv,nx){const R=srcSet(['steps_ht','steps_dm','dhs','census','housing','rem25','tcra26']),c=R.c;window.__p1c14=c;
 const I=M().inputs;
 return secShell({s,p,pv,nx,cls:'p1',
  img:'img/h-mm.webp',imgAlt:'Concept image: a young mother changing her baby’s nappy at home in Dar es Salaam',
  h1:'Six core households,',em:'each with a monthly need.',
  lede:'Six household types common across Dar es Salaam account for most early demand. For each: the need, the products, the matching Afya Box and membership card, an estimated monthly spend from the master model, and the trigger that makes the household switch. Names are illustrative; the situations are drawn from national data.',
  mods:[
   ['The problem it solves · needs follow life situations',`
    <div class="plain"><span class="modno" style="margin:0 0 12px">In plain words</span><ol>
     <li><b>Health needs follow life situations.</b> A new baby, a pregnancy, diabetes, an ageing parent, an injury, a relative abroad. Each brings its own product list and its own concerns.</li>
     <li><b>These households are common.</b> 23.1% of adults have raised blood pressure ${c('steps_ht')}, 15.4% of Tanzanians are under five and 5.7% are over 60 ${c('census')}, and urban women have 3.6 children on average ${c('dhs')}.</li>
     <li><b>Today they buy one item at a time.</b> No retailer organises the shelf, the reminder or the delivery around their situation.</li>
     <li><b>The business is designed around six households.</b> Every Care Zone, box and card maps to at least one of them. A feature that serves none of them is not built.</li></ol></div>`],
   ['Our answer · a zone, box, card and journey for each',`
    <table class="p1-tbl"><thead><tr><th>Household</th><th>Care Zone</th><th>Afya Box</th><th>Card</th><th>Main journeys</th></tr></thead><tbody>
    ${PER.map(x=>`<tr><td><span class="p1-tn">${pthumb(x,54,38)}<span>${x.name}</span></span></td><td data-l="Zone">${({mm:'Mother & Baby',mj:'Mother & Baby',bd:'Heart & Diabetes',cr:'Seniors',rc:'Mobility & Recovery',ds:'Heart & Diabetes · Seniors'})[x.k]}</td><td data-l="Box">${x.box}</td><td data-l="Card">${cardBy(x.card).name}</td><td data-l="Journeys" class="r">${x.j.join(' · ')}</td></tr>`).join('')}
    </tbody></table>
    <p class="note">Journeys: A walk-in · B advice with Afya Check · C online & WhatsApp · D Afya Box member · E diaspora gift (see section 3.2)</p>
    <h3 class="p1-h3">What these homes buy, every month</h3>
    <p class="s11lead">Each household fills a specific monthly basket. The concept flat lays below show the registered products behind each Care Zone, with the 1-month price of the matching Afya Box from section 3.5: products at shelf price less the member saving (3% monthly, 6% on 6 months, 9% on 12 months), plus the box at landed cost and delivery at <b>${tz(3500)}</b>. ${tagi('Example contents · final box contents set with the founders')}</p>
    ${p1kcards([
     ['prod-baby','Concept image: baby essentials flat lay with nappies, wipes, lotion and a thermometer','Mother &amp; Baby · Mama na mtoto','Nappies that change size with the baby','Nappies, wipes, lotion and soap, a digital thermometer and ORS sachets. The size moves up with one Afya Choice swap, so the household never buys a pack that no longer fits.','Mama na Mtoto · <b>'+tz(I.services.packs.find(x=>x[0]==='mama')[2])+'</b> a month'],
     ['prod-care','Concept image: women’s and family personal care products flat lay','Personal Care · Mama mjamzito','Care for the mother, not only the baby','Maternity pads, gentle skin care and hygiene essentials, chosen with an adviser. Prenatal vitamins only as her clinic advises.','Mama Mjamzito · <b>'+tz(I.services.packs.find(x=>x[0]==='preg')[2])+'</b> a month'],
     ['prod-heart','Concept image: diabetes and blood-pressure supplies flat lay with a glucose meter and BP monitor','Heart &amp; Diabetes · Baba na kisukari','Strips that always fit his meter','Meter-matched test strips, lancets, a validated upper-arm monitor, foot-care cream and a sharps container. His meter is saved to his account.','Sukari Care · <b>'+tz(I.services.packs.find(x=>x[0]==='sugar')[2])+'</b> a month'],
     ['prod-senior','Concept image: elderly care and recovery supplies flat lay with adult diapers and walking aids','Seniors · Carer of an elderly parent','Elder care, managed from the office','Adult diapers, wipes, barrier cream, bed pads and monitor batteries, with a walking frame to rent. Managed from a carer account.','Bibi na Babu · <b>'+tz(I.services.packs.find(x=>x[0]==='senior')[2])+'</b> a month'],
     ['prod-firstaid','Concept image: first-aid kit contents flat lay with dressings, gloves and tape','Mobility &amp; Recovery · First Aid','Recovery supplies the same day','Sterile dressings, tape, cold packs and gloves for six to eight weeks of recovery, and first-aid restocking for offices and schools.','Kupona · <b>'+tz(I.services.packs.find(x=>x[0]==='rec')[2])+'</b> a month'],
     ['prod-kids','Concept image: school child and teen essentials flat lay with a water bottle, sunscreen and a small first-aid pouch','Family · school term','The school-term top-up','A small first-aid pouch, sunscreen, hygiene items and a thermometer for school-age children, offered to Afya Family households.','Afya Shule · <b>'+tz(I.services.packs.find(x=>x[0]==='shule')[2])+'</b> a month']],{min:'300px'})}`],
   ['How it works · where each household sits',`
    <p class="s11lead">Two factors determine how a household buys: how often it needs supplies, and how urgent a stock-out is. Circle size shows estimated monthly spend. Select a circle to open that household below. ${tagi('Illustrative positions')}</p>
    <div class="p1-panel p1-map" id="p1map"></div>`],
   ['The experience · meet the six households',`
    <div class="p1-psel" id="p1psel" role="tablist" aria-label="Choose a household">${PER.map((x,i)=>`<button type="button" role="tab" data-i="${i}" style="--pc:${x.c}" class="${i?'':'on'}" aria-selected="${!i}">${pthumb(x,64,48)}<span><b>${x.name}</b><span>${x.who}</span></span></button>`).join('')}</div>
    <div id="p1pc"></div>
    <p class="note">Illustrative personas · names and ages invented · example products, final box contents set with the founders</p>`,'p1persona'],
   ['Try it · build a monthly spend',`
    <div class="calc">
     <div class="cin">
      <p class="s11lead" style="margin:0 0 6px">Select a household and a plan. The estimate uses the master model’s revenue logic: the model’s average box scaled for the household × plan discount, plus the card fee spread over twelve months, plus store or online top-ups.</p>
      <label><span>Household</span><select id="p1_who" style="grid-column:1/-1;padding:10px 12px;border-radius:12px;border:1px solid var(--edge);background:#061612;color:var(--ink);font:600 .9rem var(--f-body)">${PER.map((x,i)=>`<option value="${i}">${x.name}</option>`).join('')}</select></label>
      <label><span>Plan length</span><div class="p1-scn" id="p1_plan" style="grid-column:1/-1;justify-self:start"><button type="button" data-p="1" class="on">1 month</button><button type="button" data-p="6">6 months</button><button type="button" data-p="12">12 months</button></div></label>
      <label><span>Top-up visits or online orders a month</span><input type="range" id="p1_vis" min="0" max="4" step="0.5" value="0.5"><output id="p1_viso"></output></label>
     </div>
     <div class="cout">
      <div><small>Estimated monthly spend</small><b id="p1_tot">–</b><p id="p1_br"></p></div>
      <div><small>Value of one year</small><b id="p1_yr">–</b></div>
      <div><small>Box price on this plan</small><b id="p1_bx" style="font-size:1.4rem">–</b><p>The box and delivery are charged at cost and are inside the price. Model average per box: <b>${tz(I.members.packing_delivery_in_price)}</b>.</p></div>
     </div></div>
    <p class="note">Planning estimate · spend is scaled from the model’s average box, the figure used for revenue: <b>${tz(I.members.avg_box)}</b> · 1-month prices of the named boxes (section 3.5) range from <b>${tz(Math.min(...I.services.packs.map(x=>x[2])))}</b> to <b>${tz(Math.max(...I.services.packs.map(x=>x[2])))}</b></p>`],
   ['The numbers · estimated spend per household',`<div id="p1tbl"></div>
    <div class="p1-b2b"><span class="p1-th p1-b2bph" style="background-image:url(img/prod-firstaid.webp)" role="img" aria-label="Concept image: first-aid kit contents"></span><div><b>Business customers: offices, schools and hotels</b><p>A channel rather than a persona. Afya Kazini, the business membership with no card fee, supplies monthly safety, hygiene and first-aid kits, staff health-check days and corporate gift boxes. In the master model, business sales add <b>${MODEL.fmt.pct(I.growth.b2b_share)}</b> to store revenue from year 2. Details in section 5.2.</p></div></div>`],
   ['Beyond the six · the full package range',`
    <p class="s11lead">The six households carry most early revenue, but they are not the only customers. Teenagers, adults buying for themselves, every home, and businesses responsible for staff and guests each have a monthly need. The range covers them with 22 packages: 17 Afya Boxes and 5 Afya Kazini business kits. Prices and the card linked to each package are in sections 2.1 and 3.4.</p>
    <div style="margin-top:12px">${AFYA_PKG.html(null,'compact')}</div>`],
   ['Risks and our answer',`
    <div class="risks">
     <div class="risk"><span class="q">Personas are illustrative, not interviewed customers.</span><span class="ar">→</span><span class="a">They are built from national data on who has these needs. Before launch, 60–100 short interviews in the store’s catchment test each persona’s needs and willingness to pay.</span></div>
     <div class="risk"><span class="q">Monthly spends are estimates.</span><span class="ar">→</span><span class="a">Every figure is computed from the master model and changes with it. Real box prices are set in section 3.5 from supplier quotations.</span></div>
     <div class="risk"><span class="q">Some households may only buy one-off kits.</span><span class="ar">→</span><span class="a">One-off kits are profitable without membership, and each kit is a natural first step towards a box.</span></div>
     <div class="risk"><span class="q">Diaspora families may not trust a new brand from far away.</span><span class="ar">→</span><span class="a">Photo confirmation at the door, a named adviser on WhatsApp, and the option to start with a single gift box before committing to a plan.</span></div></div>`]],
  takeaway:'Six common households, each with a <b>repeating monthly need</b> and a clear reason to switch. Each maps to a box, a card and a journey the business is designed to deliver.',
  doors:['s3-4','s3-5','s3-2','s5-2'],
  sources:R.list})}

function pcard(i,plan){const x=PER[i],cd=cardBy(x.card),sp=spend(x,plan||1);
 return `<article class="p1-pc" style="--pc:${x.c}">
  <div class="p1-pcl"><figure class="p1-pph"><img src="img/${PPH[x.k][0][0]}.webp" alt="Concept image: ${esc(PPH[x.k][0][1])}" style="object-position:${PPH[x.k][0][2]}" width="1680" height="944"><span class="p1k-cap">Concept image</span><figcaption>${PPH[x.k][0][1]}</figcaption></figure><div class="kk">Persona 0${i+1} · ${esc(x.who)}</div><h3>${x.name}</h3><p class="sw">${x.sw}</p><p class="p1-sit">${x.sit}</p>
   <div class="p1-mcard"><small>Card that fits</small><b>${cd.name}</b><span>${cd.fee_year?MODEL.fmt.tsh(cd.fee_year)+' a year':'Free sign-up'} · ${esc(cd.who)}</span><strong>${tz(sp.tot)}</strong><em>estimated monthly spend · monthly plan · planning estimate</em></div></div>
  <div class="p1-pcr"><figure class="p1-pph2"><img src="img/${PPH[x.k][1][0]}.webp" alt="Concept image: ${esc(PPH[x.k][1][1])}" style="object-position:${PPH[x.k][1][2]}" width="1680" height="944"><span class="p1k-cap">Concept image</span><figcaption>${PPH[x.k][1][1]}</figcaption></figure><dl>
   <div class="full"><dt>Needs</dt><dd>${x.needs}</dd></div>
   <div class="full"><dt>Example products</dt><dd><div class="p1-tags">${x.prod.map(t=>`<span>${t}</span>`).join('')}</div></dd></div>
   <div><dt>Afya Box</dt><dd><b>${x.box}</b></dd></div>
   <div><dt>Card perks</dt><dd>${cd.perks.join(' · ')}</dd></div>
   <div class="full"><dt>Journey</dt><dd><div class="p1-jr">${JN.map(j=>`<span class="${x.j.includes(j[0])?'on':''}">${j[0]}<small>${j[1]}</small></span>`).join('')}</div></dd></div></dl>
   <div class="p1-swi"><small>What makes them switch</small>${x.sw2}</div></div></article>`}

function pmap(el,onPick){if(!el)return;const W=Math.max(300,el.clientWidth-(el.clientWidth<500?0:0)),sm=W<560,H=sm?300:360,pl=sm?26:40,pb=sm?30:36,pt=16,pr=16;
 const pos={mm:[.9,.7],mj:[.52,.58],bd:[.7,.86],cr:[.86,.38],rc:[.2,.8],ds:[.58,.28]};
 const sps=PER.map(x=>spend(x,1).tot),mx=Math.max(...sps);
 const X=v=>pl+v*(W-pl-pr),Y=v=>pt+(1-v)*(H-pt-pb);
 let g=`<line x1="${pl}" y1="${H-pb}" x2="${W-pr}" y2="${H-pb}" stroke="rgba(242,201,107,.4)"/><line x1="${pl}" y1="${pt}" x2="${pl}" y2="${H-pb}" stroke="rgba(242,201,107,.4)"/>
  <line x1="${X(.5)}" y1="${pt}" x2="${X(.5)}" y2="${H-pb}" class="p1-grid" stroke-dasharray="4 6"/><line x1="${pl}" y1="${Y(.5)}" x2="${W-pr}" y2="${Y(.5)}" class="p1-grid" stroke-dasharray="4 6"/>
  <text x="${W-pr}" y="${H-10}" text-anchor="end" class="p1-svgk">HOW OFTEN THEY BUY →</text><text transform="translate(${pl-10} ${pt}) rotate(-90)" text-anchor="end" class="p1-svgk">← URGENCY WHEN IT RUNS OUT</text>
  ${sm?'':`<text x="${X(.98)}" y="${Y(.02)-8}" text-anchor="end" class="p1-svgk g">MONTHLY BOX CORE</text><text x="${X(.03)}" y="${Y(.02)-8}" class="p1-svgk">KITS & SAME-DAY</text>`}`;
 PER.forEach((x,i)=>{const r=(sm?14:18)+(sm?14:22)*sps[i]/mx,cx=X(pos[x.k][0]),cy=Y(pos[x.k][1]);
  g+=`<g class="p1-pt" data-i="${i}" style="cursor:pointer" tabindex="0" role="button" aria-label="${esc(x.name)}"><defs><clipPath id="p1cp${i}"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath></defs><image href="img/h-${x.k}.webp" x="${cx-r*1.78}" y="${cy-r}" width="${r*3.56}" height="${r*2}" preserveAspectRatio="xMidYMid slice" clip-path="url(#p1cp${i})"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${x.c}" stroke-width="3"/><text x="${cx}" y="${cy+r+(sm?13:16)}" text-anchor="middle" class="p1-svgl" fill="${x.c}" style="${sm?'font-size:9px':''}">${esc(sm?({mm:'Mama na mtoto',mj:'Mjamzito',bd:'Baba',cr:'Carer',rc:'Recovery',ds:'Ughaibuni'})[x.k]:x.name)}</text><g transform="translate(${cx+r*.62} ${cy-r*.75})"><rect x="-17" y="-9" width="34" height="18" rx="9" fill="#020608" stroke="${x.c}"/><text y="4" text-anchor="middle" style="font:500 ${sm?8:9.5}px var(--f-hud);fill:${x.c}">${Math.round(sps[i]/1000)}k</text></g></g>`});
 el.innerHTML=`<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Map of six households by buying frequency and urgency">${g}</svg>`;
 el.querySelectorAll('.p1-pt').forEach(n=>{n.onclick=()=>onPick(+n.dataset.i);n.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();onPick(+n.dataset.i)}}})}

function init14(){const g=id=>document.getElementById(id);if(!g('p1pc'))return;let cur=0,plan=1;
 const tabs=[...document.querySelectorAll('#p1psel button')];
 const show=(i,scroll)=>{cur=i;tabs.forEach((t,k)=>{t.classList.toggle('on',k===i);t.setAttribute('aria-selected',k===i)});g('p1pc').innerHTML=pcard(i,1);if(scroll)g('p1persona').scrollIntoView({behavior:'smooth',block:'start'})};
 tabs.forEach((t,i)=>t.onclick=()=>show(i));show(0);
 const map=()=>pmap(g('p1map'),i=>show(i,true));map();onResize(map);
 const calc=()=>{const x=PER[+g('p1_who').value],v=+g('p1_vis').value,xx=Object.assign({},x,{visits:v}),sp=spend(xx,plan);
  g('p1_viso').textContent=v+' / month';g('p1_tot').textContent=tz(sp.tot);g('p1_yr').textContent=tz(sp.tot*12);g('p1_bx').textContent=tz(sp.bx);
  g('p1_br').innerHTML=`Box ${tz(sp.bx)} + ${cardBy(x.card).name} card ${tz(sp.cd)} + top-ups ${tz(sp.tp)} (${v} × ${tz(M().inputs.store.basket)} average basket)`};
 g('p1_who').onchange=()=>{g('p1_vis').value=PER[+g('p1_who').value].visits;calc()};g('p1_vis').oninput=calc;
 document.querySelectorAll('#p1_plan button').forEach(b=>b.onclick=()=>{plan=+b.dataset.p;document.querySelectorAll('#p1_plan button').forEach(x=>x.classList.toggle('on',x===b));calc()});calc();
 const rows=PER.map(x=>{const a=spend(x,1),b=spend(x,12);return {x,a,b}});const tot=rows.reduce((s,r)=>s+r.a.tot,0)/rows.length;
 g('p1tbl').innerHTML=`<table class="p1-tbl"><thead><tr><th>Household</th><th>Box · monthly plan</th><th>Box · 12-month plan</th><th>Card per month</th><th>Top-ups</th><th>Total / month</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${r.x.name}</td><td data-l="Box, monthly plan" class="r">${tz(r.a.bx)}</td><td data-l="Box, 12-month plan" class="r">${tz(r.b.bx)}</td><td data-l="Card" class="r">${tz(r.a.cd)}</td><td data-l="Top-ups" class="r">${tz(r.a.tp)}</td><td data-l="Total">${tz(r.a.tot)}</td></tr>`).join('')}<tr class="tot"><td colspan="5">Average of six households, monthly plan</td><td data-l="Average">${tz(tot)}</td></tr></tbody></table><p class="note">Planning estimates from the master model · monthly plan unless stated · 12-month plan price factor <b>${M().inputs.members.plans.m12}</b> · 6-month <b>${M().inputs.members.plans.m6}</b></p>`}

/* =====================================================================
   1.5 WHY NOW
   ===================================================================== */
/* series: [name, colour, short label, unit, points [x, value, projected?, text], source key] */
const TS=[
 ['Chronic disease','#ff9b87','Adults with diabetes','M',[[2011,0.473,0,'472,900 (2011)'],[2024,2.928,0,'2.93M (2024)'],[2030,4.004,1,'Projection towards 7.6M in 2050']],'idf'],
 ['Urban growth','#f2c96b','Dar es Salaam population','M',[[2012,4.365,0,'4.36M (2012 census)'],[2022,5.384,0,'5.38M (2022 census)']],'citypop'],
 ['Mobile money','#5fbf8f','Mobile money accounts','M',[[2021,35.3,0,'35.3M (2021)'],[2023.7,51.4,0,'51.4M (Sep 2023)'],[2025.2,66.5,0,'66.5M (Mar 2025)'],[2026.2,80.98,0,'80.98M (Mar 2026)']],'tcra26'],
 ['Internet','#d9b56e','Internet subscriptions','M',[[2018,23.81,0,'23.81M (2018)'],[2023.7,34.47,0,'34.47M (Sep 2023)'],[2025.2,49.3,0,'49.3M (Mar 2025)'],[2026.2,58.9,0,'58.9M (Mar 2026)']],'tcra26'],
 ['Smartphones','#b5dfc6','Smartphone penetration','%',[[2023.7,30.7,0,'30.7% (Sep 2023)'],[2025.2,35.29,0,'35.29% (Mar 2025)'],[2026.2,42.5,0,'42.5% (Mar 2026)']],'tcra26'],
 ['Diaspora money','#c9b8ff','Remittances, TSh trillion','T',[[2021,0.837,0,'TSh 837B (2021)'],[2022,1.3,0,'TSh 1.3T (2022)'],[2025,3.313,0,'TSh 3.31T (FY 2024/25)']],'rem25']];
const EVT=[[2020,'2019/20 · TMDA special market inspection removes counterfeit products'],[2023.85,'Nov 2023 · Universal Health Insurance Act passed'],[2026.07,'Jan 2026 · Universal health insurance rollout begins'],[2026.45,'Jun 2026 · Parliament and TMDA commit to stronger action on counterfeit medicines'],[2026.7,'Sep 2026 · TSh 360M of unregistered medicines seized at Dar airport']];

const CSS15W=`
.p15w{display:flex;flex-direction:column;gap:10px;margin-top:16px}
.p15w .r{display:grid;grid-template-columns:minmax(150px,1.1fr) 2.2fr 64px minmax(160px,1.3fr);gap:14px;align-items:center;padding:12px 14px;border-radius:14px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08)}
.p15w .l b{display:block;font-size:.92rem}.p15w .l small{opacity:.6}
.p15w .bars{display:flex;flex-direction:column;gap:5px}
.p15w .bars>div{height:22px;border-radius:7px;position:relative;display:flex;align-items:center}
.p15w .b0{width:var(--w);background:rgba(255,255,255,.16)}.p15w .b1{width:100%;background:linear-gradient(90deg,#0f7a52,#5fbf8f);transform-origin:left;animation:p15g 1.4s cubic-bezier(.2,.7,.2,1) var(--d) both}
@keyframes p15g{from{transform:scaleX(.05)}to{transform:scaleX(1)}}
.p15w .bars span{position:absolute;left:8px;font:600 .72rem var(--f-hud,monospace);white-space:nowrap;color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.6)}
.p15w .x{font:500 1.15rem var(--f-hud,monospace);color:#5fbf8f;text-align:right}
.p15w .u{font-size:.84rem;line-height:1.45;color:rgba(244,251,247,.78)}
@media(max-width:820px){.p15w .r{grid-template-columns:1fr 60px}.p15w .bars,.p15w .u{grid-column:1/-1}}
`;
function sec15(s,p,pv,nx){addCSS('p15w',CSS15W);const R=srcSet(['steps_ht','idf','citypop','urban','tcra26','tcra25','tcra23','inet18','mm5','rem22','rem25','xb','remtgt','gphf','tmdaparl','jnia','uhi','nha']),c=R.c;window.__p1c15=c;
 const I=M().inputs;
 const growth=(a,b)=>Math.floor((b/a-1)*100);
 const TR=[
  ['Rising chronic disease','2.9M adults with diabetes',`From 472,900 in 2011 to 2.9 million in 2024 (IDF model) ${c('idf')}; 23.1% of adults have raised blood pressure ${c('steps_ht')}.`,'Steady, monthly demand for monitors, strips and condition-care boxes.','#ff9b87'],
  ['Urban growth','5.38M in Dar es Salaam',`Up from 4.36M in 2012 ${c('citypop')}; 36.9% of Tanzanians now urban, from 22.2% in 2000 ${c('urban')}.`,'Dense neighbourhoods make one store and same-day delivery routes viable.','#f2c96b'],
  ['Mobile money everywhere','80.98M accounts',`+${growth(35.3,76.47)}% between 2021 and December 2025 ${c('mm5')}; 80.98M by March 2026 ${c('tcra26')}.`,'Payment in under 30 seconds and zero-click box renewal.','#5fbf8f'],
  ['Phones and internet','58.9M internet subs · 42.5% smartphones',`From 23.81M internet subscriptions in 2018 ${c('inet18')} and 30.7% smartphones in 2023 ${c('tcra23')}.`,'Repeat orders in under 30 seconds through the app or WhatsApp.','#d9b56e'],
  ['Diaspora money','TSh 3.31T a year',`From TSh 837B in 2021 ${c('rem22')} to TSh 3.313T in 2024/25 ${c('rem25')}; cross-border mobile money +33% in 2025 ${c('xb')}.`,'Journey E: a parent’s box paid from abroad in under 2 minutes.','#c9b8ff'],
  ['Regulatory push on quality','Seizures and new commitments',`TSh 360M of unregistered medicines seized at Dar airport in September 2026 ${c('jnia')}; TMDA pledged stronger action in June 2026 ${c('tmdaparl')}.`,'“Registered products only” becomes a selling point customers understand.','#ff7b9c'],
  ['Demand for convenience','6.31bn mobile payments in 2025',`Up from 3.74bn in 2024 ${c('tcra26')}: everyday life is moving onto the phone. Willingness to pay for delivery is a founder hypothesis to test.`,'Delivery and packing included in the box price, paid by the customer.','#ffb36b']];
 window.__p1tr=TR;
 const y1=TS.map(t=>t[4].filter(p=>!p[2])),first=y1.map(a=>a[0][1]),last=y1.map(a=>a[a.length-1][1]);
 return secShell({s,p,pv,nx,cls:'p1',
  img:'img/j-aerial.webp',imgAlt:'Concept image: aerial view of Dar es Salaam at golden hour, the city where seven trends meet',
  h1:'Seven trends converge',em:'in 2026–27.',
  lede:'In 2021 Tanzania had 35 million mobile money accounts; by March 2026 it had 81 million. Diaspora remittances rose from TSh 837 billion in 2021 to TSh 3.3 trillion in 2024/25. Chronic disease is rising, Dar es Salaam is growing, and the regulator is tightening control of unregistered medicine. For the first time the need, the payment rail, the phones and the money from abroad are in place together. That is the case for opening Store #1 in 2026–27.',
  mods:[
   ['The problem it solves · timing',`
    <div class="plain"><span class="modno" style="margin:0 0 12px">In plain words</span><ol>
     <li><b>Timing determines viability.</b> A delivered monthly health box needs customers who pay by phone, order by phone and trust delivery. In 2018 Tanzania had 23.8 million internet subscriptions ${c('inet18')}; mobile money accounts were 35.3 million as late as 2021 ${c('mm5')}.</li>
     <li><b>Those rails are now built.</b> Mobile money accounts more than doubled in five years ${c('mm5')}, and internet subscriptions are at 84.2% penetration ${c('tcra26')}.</li>
     <li><b>The need continues to grow.</b> Adults with diabetes have increased about sixfold since 2011 in the IDF model ${c('idf')}, and Dar es Salaam adds people every year ${c('citypop')}.</li>
     <li><b>Delay has a cost.</b> These trends are visible to every competitor. The first trusted brand to organise health essentials around the household, and to earn the monthly habit, is likely to keep it.</li></ol></div>`],
   ['Our answer · seven trends, and what each one unlocks',`
    <div class="p1-trends">${TR.map((t,i)=>`<article class="p1-tr" style="--c:${t[4]}"><span class="n">0${i+1}</span><div><b>${t[0]}</b><span class="d">${t[1]}</span><p>${t[2]}</p><p class="u"><small>Unlocks</small>${t[3]}</p></div></article>`).join('')}</div>`],
   ['Then and now · the window has opened',`
    <p class="s11lead">Each row compares the earliest published figure used here with the latest. The longer the green bar relative to the grey, the larger the shift. The right-hand column states why it matters for Afya Basics.</p>
    <div class="p15w">${[['Mobile money accounts','35.3M','2021','80.98M','Mar 2026',35.3,80.98,'mm5','Pay for a box in seconds; renew with zero clicks'],['Internet subscriptions','23.81M','2018','58.9M','Mar 2026',23.81,58.9,'tcra26','Reorder on the app or WhatsApp in under 30 seconds'],['Diaspora money sent home','TSh 837B','2021','TSh 3.31T','2024/25',837,3313,'rem25','A parent’s box paid from abroad, with photo proof'],['Adults with diabetes (IDF model)','472,900','2011','2.9M','2024',472.9,2900,'idf','Monthly, repeat demand for strips, meters and checks'],['People in Dar es Salaam','4.36M','2012','5.38M','2022',4.36,5.38,'citypop','Dense routes make same-day delivery affordable'],['Mobile payments a year','3.74bn','2024','6.31bn','2025',3.74,6.31,'tcra26','Everyday life is already on the phone']].map((r,i)=>`<div class="r" style="--d:${i*120}ms"><div class="l"><b>${r[0]}</b><small>${c(r[7])}</small></div><div class="bars"><div class="b0" style="--w:${Math.max(4,r[5]/r[6]*100)}%"><span>${r[1]} · ${r[2]}</span></div><div class="b1"><span>${r[3]} · ${r[4]}</span></div></div><div class="x">×${(r[6]/r[5]).toFixed(1)}</div><div class="u">${r[8]}</div></div>`).join('')}</div>
    <p class="note">Multiples are calculated from the cited figures. The diabetes series is a model estimate (IDF); all others are official counts.</p>`],
   ['How it works · the trend lines, side by side',`
    <p class="s11lead">The series use different units, so each line is indexed to its <b>latest published value = 100</b>. Each dot is a published figure; dashed lines are projections. Every series reaches its latest value between 2022 and 2026, ahead of the 2026–27 opening window shown in gold. Violet diamonds mark regulatory events. Select a series to show or hide it.</p>
    <div class="p1-tw"><div class="p1-panel"><div class="p1-chart" id="p1tl"></div></div>
     <div class="p1-tgl" id="p1tgl">${TS.map((t,i)=>`<button type="button" data-i="${i}" style="--c:${t[1]}"><i></i><span>${t[0]}<small>${t[2]}: ${first[i]}${t[3]==='%'?'%':t[3]} → ${last[i]}${t[3]==='%'?'%':t[3]}</small></span></button>`).join('')}</div></div>
    <p class="p1-cnote">Sources: diabetes ${c('idf')}; Dar population ${c('citypop')}; mobile money ${c('mm5')} ${c('tcra23')} ${c('tcra25')} ${c('tcra26')}; internet ${c('inet18')} ${c('tcra26')}; remittances ${c('rem22')} ${c('rem25')}; events ${c('gphf')} ${c('uhi')} ${c('tmdaparl')} ${c('jnia')}.</p>`],
   ['The experience · the trends in daily life',`
    <p class="s11lead">The trend lines above are national statistics. Below, each is shown as it appears in daily life in Dar es Salaam, with the part of Afya Basics it enables. None is a forecast; every figure is already published.</p>
    ${p1kcards(TR.slice(0,6).map((t,i)=>[['h-bd','j-aerial','c-pay','j-balcony','h-ds','c-inspect'][i],'Concept image for the trend: '+t[0],'0'+(i+1)+' · '+t[0],t[1],[
     'Hassan, 54 (illustrative), checks his blood sugar every morning in Mbezi. Every strip he uses is a repeat purchase, and a free check at the door is how people like him are identified before a crisis.',
     'Dar es Salaam grew by about a million people between the 2012 and 2022 censuses. In dense areas such as Sinza and Kariakoo, two riders can reach many homes in one afternoon.',
     'At the counter the customer approves a mobile-money request on her own phone, and the TRA receipt arrives by SMS before she reaches the door. There is no separate queue to pay.',
     'A mother reorders nappies on WhatsApp at 22:00 and the packing hub prepares it next morning. Tablets on the packing table show the day’s boxes, routes and the 15:00 cut-off.',
     'A son in Muscat pays for his mother’s box by card in under two minutes; the rider sends a photo from her doorstep in Temeke as confirmation.',
     'Families have read about seizures of unregistered medicines. A shelf where every regulated product shows its registration number is a clear reason to switch.'][i],'Unlocks: '+t[3],['50% 35%','50% 35%','50% 30%','50% 40%','50% 40%','50% 50%'][i]]),{min:'300px'})}
    ${p1kband('j-rider','Concept image: an Afya rider on a motorbike delivering in Dar es Salaam','07 · '+TR[6][0],'The seven trends <em>converge on one household.</em>',TR[6][2]+' A family managing a chronic condition in a dense city, paying by phone, with a son abroad and a reason to prefer registered products, is the household a same-day Afya Box is designed to serve.',{pos:'60% 45%',stats:[['6.31bn','mobile payments in 2025, up from 3.74bn in 2024'],['15:00','same-day delivery cut-off in Dar'],['2026–27','Store #1 opens as the trends meet']]})}`],
   ['Try it · the data by year',`
    <p class="s11lead">Move the year slider. The cursor moves on the trend chart above, and the tiles show the latest figure published by that year. In 2018 few of these series had a published figure; by 2026 all of them do.</p>
    <div class="p1-panel"><div class="p1-yr"><label for="p1y">Year <b id="p1yo">2026</b></label><input type="range" id="p1y" min="2011" max="2027" step="1" value="2026"></div>
     <div class="p1-known" id="p1kn"></div>
     <p class="p1-cnote" id="p1kv"></p></div>`],
   ['The numbers · growth rates from the published data',`
    <div class="nums">
     <div class="num"><b><em>+</em>${growth(35.3,76.47)}%</b><span>mobile money accounts, 2021 → Dec 2025 ${c('mm5')}</span></div>
     <div class="num"><b><em>+</em>${growth(23.81,58.9)}%</b><span>internet subscriptions, 2018 → Mar 2026 ${c('inet18')} ${c('tcra26')}</span></div>
     <div class="num"><b><em>×</em>${(3.313/0.837).toFixed(1)}</b><span>diaspora remittances, 2021 → FY 2024/25 ${c('rem22')} ${c('rem25')}</span></div>
     <div class="num"><b><em>×</em>${(2.928/0.473).toFixed(1)}</b><span>adults with diabetes, 2011 → 2024 (model) ${c('idf')}</span></div>
     <div class="num g"><b>${I.growth.stores_by_year[0]} → ${I.growth.stores_by_year[11]}</b><span>stores, year 1 → year 12 (master model). Year-12 revenue: <b>${big(M().get('base').years[11].revenue)}</b></span></div></div>
    <p class="note">Growth rates are calculated from the cited figures; the store count and revenue are planning estimates from the master model</p>`],
   ['Risks and our answer · the honest bad case',`
    <div class="risks">
     <div class="risk"><span class="q">Trends can slow or reverse, for example if mobile money fees or taxes rise.</span><span class="ar">→</span><span class="a">Payments remain multi-channel: mobile money first, with card and cash always accepted. The box price includes delivery at cost, so margins do not depend on low payment fees.</span></div>
     <div class="risk"><span class="q">Others can see the same trends.</span><span class="ar">→</span><span class="a">Timing is an advantage only with execution. The seed is released in three tranches (40/35/25%) tied to milestones, so speed does not mean unchecked spending. The defensible position is the monthly habit and trust (section 5.3).</span></div>
     <div class="risk"><span class="q">Universal health insurance could change how families pay.</span><span class="ar">→</span><span class="a">Insurance mainly covers clinic care; home essentials remain out of pocket. Insurers are also a future partner channel (section 5.2).</span></div>
     <div class="risk"><span class="q">Demand for paid convenience is not yet proven in our catchment.</span><span class="ar">→</span><span class="a">It is labelled a hypothesis. One-off kits and the free Afya Check test it from opening, and tranche 3 of the seed (25%) is released only after the store has been open 3 months with 100 Afya Box members and a monthly loss below TSh 16M.</span></div>
     <div class="risk"><span class="q">Remittance figures come from press reports of official data.</span><span class="ar">→</span><span class="a">They are marked Medium confidence, and the diaspora journey is an extra channel, not the base of the plan.</span></div></div>`]],
  takeaway:'The need, the payment rail, the phones and the diaspora money are <b>all in place in 2026–27</b>. Opening now positions Afya Basics to <b>earn the monthly habit first</b>.',
  doors:['s1-2','s2-1','s5-4','s6-3'],
  sources:R.list})}

function init15(){const g=id=>document.getElementById(id);if(!g('p1tl'))return;const c=window.__p1c15,TR=window.__p1tr;const off=new Set();let yr=2026;
 const idx=TS.map(t=>{const sol=t[4].filter(p=>!p[2]),L=sol[sol.length-1][1];return t[4].map(p=>[p[0],+(p[1]/L*100).toFixed(1),p[2],p[3]])});
 const draw=()=>lineChart(g('p1tl'),{aria:'Indexed trend lines for six trends, 2011 to 2027, latest value equals 100',x0:2010.6,x1:2027.6,y0:0,y1:140,yt:[0,25,50,75,100,125],xt:[2011,2013,2015,2017,2019,2021,2023,2025,2027],xskip:2,band:[2026,2027.6],bandLabel:'2026–27',cursor:yr+0.5,events:EVT,
  series:TS.map((t,i)=>({name:t[0],c:t[1],lbl:t[0],label:false,hide:off.has(i),pts:idx[i]}))});
 draw();onResize(()=>{draw();conv()});
 document.querySelectorAll('#p1tgl button').forEach(b=>b.onclick=()=>{const i=+b.dataset.i;off.has(i)?off.delete(i):off.add(i);b.classList.toggle('off',off.has(i));draw()});
 /* convergence strands */
 const conv=()=>{const el=g('p1cs');if(!el)return;const W=Math.max(300,el.clientWidth),H=Math.round(W*.62),nx=W*.82,ny=H/2;let s='';
  TR.forEach((t,i)=>{const y0=H*.08+i*(H*.84/(TR.length-1)),x0=8;
   s+=`<path class="p1-strand" data-i="${i}" d="M${x0} ${y0} C ${W*.35} ${y0}, ${W*.5} ${ny+(y0-ny)*.15}, ${nx} ${ny}" fill="none" stroke="${t[4]}" stroke-width="2.2" stroke-linecap="round" style="filter:drop-shadow(0 0 6px ${t[4]})"/><circle cx="${x0+4}" cy="${y0}" r="5" fill="${t[4]}"/><text x="${x0+16}" y="${y0-9}" class="p1-svgk" fill="${t[4]}" style="fill:${t[4]}">${String(i+1).padStart(2,'0')}${W>520?' · '+esc(t[0].toUpperCase()):''}</text>`});
  s+=`<circle cx="${nx}" cy="${ny}" r="${W*.07}" fill="url(#p1cg)"/><circle cx="${nx}" cy="${ny}" r="${W*.035}" fill="#f2c96b" style="filter:drop-shadow(0 0 18px #f2c96b)"/><circle cx="${nx}" cy="${ny}" r="${W*.055}" fill="none" stroke="#ffe7a8" stroke-width="1" stroke-dasharray="3 5"><animateTransform attributeName="transform" type="rotate" from="0 ${nx} ${ny}" to="360 ${nx} ${ny}" dur="24s" repeatCount="indefinite"/></circle>
   <text x="${nx}" y="${ny+W*.07+18}" text-anchor="middle" class="p1-svgk g">2026–27</text><text x="${nx}" y="${ny+W*.07+34}" text-anchor="middle" class="p1-svgt" style="fill:#a9c4b8">STORE #1 OPENS</text>`;
  el.innerHTML=`<svg viewBox="0 0 ${W} ${H+40}" width="${W}" height="${H+40}" role="img" aria-label="Seven trend strands converging on the 2026–27 opening of Store #1"><defs><radialGradient id="p1cg"><stop offset="0" stop-color="#f2c96b" stop-opacity=".45"/><stop offset="1" stop-color="#f2c96b" stop-opacity="0"/></radialGradient></defs>${s}</svg>`;
  hl(curHL)};
 let curHL=-1;const hl=i=>{curHL=i;const box=g('p1conv');if(!box)return;box.classList.toggle('hl',i>=0);box.querySelectorAll('.p1-strand').forEach(p=>p.classList.toggle('on',+p.dataset.i===i));box.querySelectorAll('.p1-clist li').forEach(l=>l.classList.toggle('on',+l.dataset.i===i))};
 conv();document.querySelectorAll('#p1cl li').forEach(l=>{const i=+l.dataset.i;l.onclick=()=>hl(curHL===i?-1:i);l.onmouseenter=()=>hl(i);l.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();hl(curHL===i?-1:i)}}});
 if(g('p1cl'))g('p1cl').onmouseleave=()=>hl(-1);
 /* time travel */
 const known=()=>{g('p1yo').textContent=yr;draw();
  g('p1kn').innerHTML=TS.map(t=>{const k=t[4].filter(p=>!p[2]&&Math.floor(p[0])<=yr).pop();return `<div class="${k?'':'na'}" style="--c:${t[1]}"><small>${t[2]}</small><b>${k?(t[3]==='T'?'TSh '+k[1]+'T':t[3]==='%'?k[1]+'%':k[1]+'M'):'not yet published'}</b><span>${k?esc((k[3].match(/\(([^)]+)\)/)||[0,k[3]])[1]):'no figure by '+yr}</span></div>`}).join('')+`<div style="--c:#c9b8ff"><small>Regulatory events so far</small><b>${EVT.filter(e=>Math.floor(e[0])<=yr).length} of ${EVT.length}</b><span>${esc((EVT.filter(e=>Math.floor(e[0])<=yr).pop()||[0,'none yet'])[1])}</span></div>`;
  const n=TS.filter(t=>t[4].some(p=>!p[2]&&Math.floor(p[0])<=yr)).length;
  g('p1kv').innerHTML=yr<2021?`In ${yr}, only ${n} of 6 trend series had a published figure in this data set. Internet subscriptions were ${yr>=2018?'23.8M (2018), against 58.9M today':'not yet in this data set'}, and the first mobile money figure here is from 2021. A delivered monthly box would have reached far fewer homes.`:yr<2025?`By ${yr}, the rails were growing fast but not yet mainstream: smartphone penetration was about 30% in 2023 ${c('tcra23')}.`:`By ${yr}, every trend is in place together: the need, the city, the payment rail, the phones and the diaspora money. This is the window the Afya Basics plan targets.`};
 g('p1y').oninput=()=>{yr=+g('p1y').value;known()};known()}

/* ---------------- register ---------------- */
const css=()=>{addCSS('part1',CSS);addCSS('part1ph',`
.p1-th{display:inline-block;flex:none;border-radius:10px;background-size:cover;background-position:center;border:1px solid rgba(255,255,255,.14);box-shadow:0 6px 16px -8px rgba(0,0,0,.8)}
.p1-tn{display:inline-flex;align-items:center;gap:12px}
.p1-psel button{padding:8px 12px 8px 8px}
.p1-psel button.on .p1-th{border-color:var(--pc);box-shadow:0 0 0 2px var(--pc)}
.p1-pph{position:relative;margin:-28px -28px 0;aspect-ratio:16/10;overflow:hidden}
.p1-pph img,.p1-pph2 img{display:block;width:100%;height:100%;object-fit:cover}
.p1-pph::after,.p1-pph2::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(2,6,8,.78),rgba(2,6,8,0) 50%)}
.p1-pph figcaption,.p1-pph2 figcaption{position:absolute;z-index:2;left:18px;right:18px;bottom:12px;font-size:.82rem;line-height:1.4;color:#effaf5}
.p1-pph2{position:relative;margin:0 0 18px;aspect-ratio:16/7;border-radius:18px;overflow:hidden;border:1px solid var(--edge)}
.p1-b2bph{width:120px;height:84px;border-radius:14px}
.p1-h3{font:700 clamp(1.15rem,2vw,1.5rem)/1.2 var(--f-display);margin:44px 0 10px;letter-spacing:-.01em}
@media (max-width:820px){.p1-pph{margin:-22px -22px 0}.p1-psel button .p1-th{width:52px!important;height:40px!important}.p1-b2bph{width:100%;height:150px}}
`)};
window.SECTIONS['s1-2']={render(s,p,pv,nx){css();return sec12(s,p,pv,nx)},init:init12};
window.SECTIONS['s1-3']={render(s,p,pv,nx){css();return sec13(s,p,pv,nx)},init:init13};
window.SECTIONS['s1-4']={render(s,p,pv,nx){css();return sec14(s,p,pv,nx)},init:init14};
window.SECTIONS['s1-5']={render(s,p,pv,nx){css();return sec15(s,p,pv,nx)},init:init15};
/* ================= 1.1 The problem (bilingual, rebuilt Nov 2026) ================= */
S1.hbs=['NBS, Household Budget Survey 2017/18, Tanzania Mainland: Key Indicators Report','https://www.nbs.go.tz/nbs/takwimu/hbs/2017_18_HBS_Key_Indicators_Report_Englll.pdf'];
S1.tira=['The Citizen, 9 July 2025: Health insurance coverage rises to 37 percent (TIRA)','https://www.thecitizen.co.tz/tanzania/business/health-insurance-coverage-hits-37pc-as-sector-eyes-3pc-gdp-contribution-5110448'];
S1.addo=['BMC Health Services Research (2022), citing the Pharmacy Council of Tanzania: about 11,356 accredited drug dispensing outlets and 1,334 pharmacies (2018)','https://bmchealthservres.biomedcentral.com/counter/pdf/10.1186/s12913-022-08980-6.pdf'];
const L1=(en,sw)=>`<x-en class="p1-en">${en}</x-en><x-sw class="p1-sw" lang="sw">${sw}</x-sw>`;
const LANG1=()=>{try{return localStorage.getItem('afyaLang')==='sw'?'sw':'en'}catch(e){return 'en'}};
function setLang1(k){try{localStorage.setItem('afyaLang',k)}catch(e){}try{document.documentElement.classList.toggle('p0-swon',k==='sw');document.documentElement.lang=k}catch(e){}
 document.querySelectorAll('.p11-lang button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.lang===k))}
const CSS11=`
x-en.p1-en{display:inline}x-sw.p1-sw{display:none}html.p0-swon x-en.p1-en{display:none!important}html.p0-swon x-sw.p1-sw{display:inline!important}
.p11-lang{display:inline-flex;margin-top:22px;border:1px solid var(--edge2);border-radius:999px;padding:4px;background:rgba(2,6,8,.55);backdrop-filter:blur(8px)}
.p11-lang button{all:unset;cursor:pointer;padding:8px 16px;border-radius:999px;font:600 .74rem var(--f-hud);letter-spacing:.12em;text-transform:uppercase;color:var(--ink2)}
.p11-lang button[aria-pressed=true]{background:linear-gradient(90deg,var(--neon),#9df7d0);color:#03140d}
.p11-one{font:800 clamp(1.5rem,3.1vw,2.5rem)/1.18 var(--f-display);letter-spacing:-.02em;color:var(--ink);max-width:28ch;margin:0}
.p11-one b{background:linear-gradient(90deg,#ff9b87,var(--gold2));-webkit-background-clip:text;background-clip:text;color:transparent}
.p11-rail{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px;margin-top:26px}
.p11-rail a{display:block;text-decoration:none;padding:16px 16px 18px;border-radius:18px;border:1px solid var(--edge);background:linear-gradient(170deg,var(--panel2),rgba(2,6,8,.7));transition:transform .4s cubic-bezier(.2,.8,.2,1),border-color .3s}
.p11-rail a:hover{transform:translateY(-4px);border-color:rgba(255,155,135,.55)}
.p11-rail small{display:block;font:500 .6rem var(--f-hud);letter-spacing:.18em;text-transform:uppercase;color:#ff9b87}
.p11-rail b{display:block;font:700 1.05rem/1.25 var(--f-display);color:var(--ink);margin-top:8px}
.p11-rail span{display:block;font-size:.82rem;line-height:1.45;color:var(--ink2);margin-top:6px}
.p11-pain{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);gap:0;margin-top:26px;border-radius:28px;overflow:hidden;border:1px solid var(--edge2);background:linear-gradient(160deg,var(--panel2),rgba(2,6,8,.9));box-shadow:0 50px 110px -70px rgba(255,155,135,.5);scroll-margin-top:90px}
.p11-pain.rev>figure{order:2}
.p11-pain>figure{position:relative;margin:0;min-height:560px;overflow:hidden}
.p11-pain>figure img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transform:scale(1.08);transition:transform 2.4s cubic-bezier(.2,.8,.2,1)}
.p11-pain.in>figure img{transform:scale(1)}
.p11-pain>figure::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(2,6,8,.85),rgba(2,6,8,0) 55%)}
.p11-num{position:absolute;left:28px;bottom:22px;z-index:2;font:800 clamp(4rem,9vw,7.5rem)/.8 var(--f-display);letter-spacing:-.04em;color:transparent;-webkit-text-stroke:1.5px rgba(255,155,135,.85)}
.p11-fact{position:absolute;right:20px;bottom:22px;left:auto;z-index:2;max-width:250px;padding:16px 18px;border-radius:18px;background:rgba(2,6,8,.72);border:1px solid rgba(242,201,107,.35);backdrop-filter:blur(10px)}
.p11-fact b{display:block;font:500 1.9rem/1 var(--f-hud);color:var(--gold2)}
.p11-fact span{display:block;font-size:.8rem;line-height:1.45;color:var(--ink2);margin-top:8px}
.p11-fact .p1-conf{margin-top:10px}
.p11-cap{position:absolute;right:16px;top:16px;z-index:3;font:500 .56rem var(--f-hud);letter-spacing:.18em;text-transform:uppercase;color:rgba(239,250,245,.85);background:rgba(2,6,8,.6);padding:5px 10px;border-radius:99px;border:1px solid rgba(255,255,255,.14)}
.p11-tx{padding:46px 48px 44px;min-width:0;display:flex;flex-direction:column;justify-content:center}
.p11-k{font:500 .64rem/1.4 var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:#ff9b87}
.p11-tx h3{font:800 clamp(1.45rem,2.6vw,2.15rem)/1.1 var(--f-display);letter-spacing:-.02em;margin:12px 0 0;color:var(--ink)}
.p11-tx>p{color:var(--ink2);font-size:1rem;line-height:1.7;margin:14px 0 0}
.p11-tx>p b{color:var(--ink)}
.p11-cost{margin-top:20px;display:grid;gap:10px}
.p11-cost div{display:grid;grid-template-columns:110px minmax(0,1fr);gap:14px;padding:12px 0;border-top:1px solid var(--edge)}
.p11-cost small{font:500 .6rem/1.5 var(--f-hud);letter-spacing:.16em;text-transform:uppercase;color:var(--ink3);padding-top:3px}
.p11-cost p{margin:0;font-size:.92rem;line-height:1.6;color:var(--ink2)}
.p11-cost p b{color:var(--ink)}
.p11-fix{margin-top:20px;padding:16px 18px;border-radius:16px;border:1px solid rgba(95,191,143,.35);background:linear-gradient(120deg,rgba(95,191,143,.10),rgba(2,6,8,.3));font-size:.93rem;line-height:1.6;color:var(--ink2)}
.p11-fix b{color:var(--neon)}
.p11-who{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;margin-top:24px}
.p11-who article{border-radius:22px;overflow:hidden;border:1px solid var(--edge);background:linear-gradient(175deg,var(--panel2),rgba(2,6,8,.85));display:flex;flex-direction:column;min-width:0}
.p11-who .ph{position:relative;aspect-ratio:4/3;overflow:hidden}
.p11-who .ph img{width:100%;height:100%;object-fit:cover;display:block;transition:transform 1.2s cubic-bezier(.2,.8,.2,1)}
.p11-who article:hover .ph img{transform:scale(1.06)}
.p11-who .ph b{position:absolute;left:16px;bottom:12px;z-index:2;font:500 1.6rem var(--f-hud);color:var(--gold2);text-shadow:0 2px 14px rgba(0,0,0,.8)}
.p11-who .ph::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(2,6,8,.75),transparent 55%)}
.p11-who .tx{padding:16px 18px 20px}
.p11-who h4{margin:0;font:700 1rem/1.3 var(--f-display);color:var(--ink)}
.p11-who p{margin:8px 0 0;font-size:.86rem;line-height:1.6;color:var(--ink2)}
.p11-calc{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.05fr);gap:22px;margin-top:24px}
.p11-in,.p11-out{border-radius:24px;border:1px solid var(--edge2);background:linear-gradient(160deg,var(--panel2),rgba(2,6,8,.85));padding:26px 26px 24px;min-width:0}
.p11-pre{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:18px}
.p11-pre button{all:unset;cursor:pointer;padding:9px 14px;border-radius:999px;border:1px solid var(--edge2);font-size:.82rem;color:var(--ink2)}
.p11-pre button[aria-pressed=true]{border-color:var(--neon);color:var(--ink);background:rgba(95,191,143,.12)}
.p11-sl{display:grid;gap:4px;margin-top:14px}
.p11-sl label{display:flex;justify-content:space-between;gap:10px;font-size:.86rem;color:var(--ink2)}
.p11-sl output{font:500 .9rem var(--f-hud);color:var(--gold2)}
.p11-sl input{width:100%;accent-color:#5fbf8f}
.p11-sl small{font-size:.74rem;color:var(--ink3);line-height:1.4}
.p11-big{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.p11-big div{padding:14px 14px 16px;border-radius:16px;background:rgba(2,6,8,.5);border:1px solid var(--edge)}
.p11-big b{display:block;font:500 clamp(1rem,1.55vw,1.35rem) var(--f-hud);color:#ff9b87;white-space:nowrap}
.p11-big span{display:block;font-size:.76rem;line-height:1.4;color:var(--ink2);margin-top:6px}
.p11-bars{margin-top:20px;display:grid;gap:14px}
.p11-bar small{display:flex;justify-content:space-between;font-size:.8rem;color:var(--ink2);margin-bottom:6px}
.p11-bar small b{font:500 .85rem var(--f-hud);color:var(--ink)}
.p11-bar i{display:block;height:14px;border-radius:99px;background:rgba(255,255,255,.06);overflow:hidden}
.p11-bar i u{display:block;height:100%;border-radius:99px;transition:width .8s cubic-bezier(.2,.8,.2,1)}
.p11-bar.a u{background:linear-gradient(90deg,#ff9b87,#f2c96b)}.p11-bar.b u{background:linear-gradient(90deg,#5fbf8f,#d9b56e)}
.p11-days{display:grid;grid-template-columns:repeat(31,1fr);gap:3px;margin-top:20px}
.p11-days i{aspect-ratio:1;border-radius:3px;background:rgba(255,255,255,.07);transition:background .4s}
.p11-days i.on{background:#ff9b87;box-shadow:0 0 8px rgba(255,155,135,.6)}
.p11-note{font-size:.8rem;line-height:1.55;color:var(--ink3);margin-top:14px}
.p11-ev{width:100%;border-collapse:collapse;margin-top:20px;font-size:.88rem}
.p11-ev th{text-align:left;font:500 .6rem var(--f-hud);letter-spacing:.16em;text-transform:uppercase;color:var(--ink3);padding:10px 12px;border-bottom:1px solid var(--edge2)}
.p11-ev td{padding:14px 12px;border-bottom:1px solid var(--edge);vertical-align:top;color:var(--ink2);line-height:1.55}
.p11-ev td:first-child{color:#ff9b87;font:600 .82rem var(--f-display);white-space:nowrap}
.p11-ev td b{color:var(--ink)}
.p11-risk{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:22px}
.p11-risk div{padding:20px 20px 22px;border-radius:20px;border:1px solid var(--edge);background:linear-gradient(170deg,var(--panel2),rgba(2,6,8,.8))}
.p11-risk h4{margin:0;font:700 .98rem/1.35 var(--f-display);color:var(--ink)}
.p11-risk p{margin:8px 0 0;font-size:.86rem;line-height:1.6;color:var(--ink2)}
.p11-risk p b{color:var(--neon)}
@media (max-width:980px){.p11-rail{grid-template-columns:repeat(2,minmax(0,1fr))}.p11-pain{grid-template-columns:1fr}.p11-pain.rev>figure{order:0}.p11-pain>figure{min-height:0;padding-bottom:4px}.p11-pain>figure img{position:relative;display:block;height:auto;aspect-ratio:16/11}.p11-pain>figure::after{display:none}.p11-fact{position:relative;right:auto;bottom:auto;left:auto;max-width:none;margin:14px 18px 0}.p11-num{display:none}.p11-tx{padding:30px 26px 32px}.p11-who{grid-template-columns:repeat(2,minmax(0,1fr))}.p11-calc{grid-template-columns:1fr}.p11-risk{grid-template-columns:1fr}}
@media (max-width:560px){.p11-rail{grid-template-columns:1fr}.p11-who{grid-template-columns:1fr}.p11-big{grid-template-columns:1fr}.p11-cost div{grid-template-columns:1fr;gap:4px}.p11-ev thead{display:none}.p11-ev tr{display:block;padding:10px 0;border-bottom:1px solid var(--edge)}.p11-ev td{display:block;border:0;padding:4px 0}.p11-days{grid-template-columns:repeat(16,1fr)}}
`;
const IMG11=(f,alt,pos)=>`<img src="img/${f}.webp" alt="${alt}" loading="lazy" decoding="async" width="1680" height="944"${pos?` style="object-position:${pos}"`:''}>`;
const PAIN=[
 {id:'p11-scattered',k:['Pain 1 · Scattered','Tatizo 1 · Kutawanyika'],img:'real-mother-back',pos:'40% 45%',alt:'Concept image: a mother with her baby on her back at a small pharmacy counter',
  h:['One need, five shops.','Hitaji moja, maduka matano.'],
  p:['A household’s health needs do not live on one shelf. A mother with a baby needs nappies, wipes, baby lotion, iron tablets and a thermometer. A man with high blood pressure needs his tablets, test strips for his monitor and a low-salt diet. In Dar es Salaam these sit in different places: medicines at a pharmacy or drug shop, nappies at a supermarket, devices at a medical-supplies shop, home-care items somewhere else again. Most outlets are small drug shops that stock a narrow range, so the first stop is often out of the size or brand you need.',
     'Mahitaji ya afya ya familia hayako kwenye rafu moja. Mama mwenye mtoto anahitaji nepi, wipes, losheni ya mtoto, vidonge vya madini ya chuma na kipimajoto. Baba mwenye shinikizo la damu anahitaji vidonge vyake, vipande vya kipimo na lishe yenye chumvi kidogo. Jijini Dar es Salaam vitu hivi viko sehemu tofauti: dawa kwenye famasi au duka la dawa, nepi kwenye supamaketi, vifaa kwenye duka la vifaa tiba, na vitu vya nyumbani mahali pengine. Maduka mengi ni madogo yenye bidhaa chache, hivyo duka la kwanza mara nyingi halina saizi au chapa unayohitaji.'],
  fact:['11,356 vs 1,334','11,356 dhidi ya 1,334'],factL:['accredited drug shops (ADDOs) versus registered pharmacies in Tanzania: most outlets are small shops with a narrow range','maduka ya dawa yaliyothibitishwa (ADDO) dhidi ya famasi zilizosajiliwa Tanzania: maduka mengi ni madogo yenye bidhaa chache'],src:'addo',conf:'m',
  cost:[[['Time','Muda'],['Several stops for one month of supplies, each with its own wait.','Vituo kadhaa kwa mahitaji ya mwezi mmoja, kila kimoja na kusubiri kwake.']],[['Money','Pesa'],['Bajaji or daladala fares between shops, and small-shop prices that are higher than a planned bulk buy.','Nauli za bajaji au daladala kati ya maduka, na bei za maduka madogo zilizo juu kuliko ununuzi uliopangwa.']],[['Health','Afya'],['When the right item is missing, people buy a substitute they were not advised to use, or go without.','Bidhaa sahihi ikikosekana, watu hununua mbadala ambao hawakushauriwa, au hukosa kabisa.']]],
  fix:['<b>Afya answer:</b> one store organised by need, not by brand: six Care Zones, about 520 product families, 4–5 registered brands per item, the same list in the app and on WhatsApp.','<b>Jibu la Afya:</b> duka moja lililopangwa kwa mahitaji, si kwa chapa: Kanda sita za Huduma, takriban familia 520 za bidhaa, chapa 4–5 zilizosajiliwa kwa kila bidhaa, orodha ileile kwenye programu na WhatsApp.']},
 {id:'p11-slow',k:['Pain 2 · Slow','Tatizo 2 · Polepole'],img:'real-p-crowd',pos:'50% 40%',alt:'Concept image: customers crowding around one small pharmacy counter, seen from behind',
  h:['A two-minute question costs an afternoon.','Swali la dakika mbili linagharimu mchana mzima.'],
  p:['In most shops one counter does everything: advice, finding the item, taking payment and giving change. So a parent who only wants to ask “which thermometer is accurate?” waits behind everyone paying. Add Dar es Salaam traffic and the heat, and one errand becomes half a day. The city keeps growing, from 4.36 million people in 2012 to 5.38 million in 2022, while the way people buy health items has not changed.',
     'Katika maduka mengi kaunta moja hufanya kila kitu: ushauri, kutafuta bidhaa, kupokea malipo na kurudisha chenji. Hivyo mzazi anayetaka kuuliza tu “kipimajoto kipi ni sahihi?” husubiri nyuma ya kila anayelipa. Ongeza msongamano wa magari wa Dar es Salaam na joto, na shughuli moja inakuwa nusu siku. Jiji linaendelea kukua, kutoka watu milioni 4.36 mwaka 2012 hadi milioni 5.38 mwaka 2022, lakini namna watu wanavyonunua bidhaa za afya haijabadilika.'],
  fact:['+23%','+23%'],factL:['growth of Dar es Salaam in ten years (4.36M to 5.38M people, 2012–2022 censuses): more people, the same small counters','ongezeko la watu Dar es Salaam ndani ya miaka kumi (milioni 4.36 hadi 5.38, sensa 2012–2022): watu wengi zaidi, kaunta zilezile ndogo'],src:'citypop',conf:'h',
  cost:[[['Time','Muda'],['Hours lost every month. Try your own numbers in the calculator below.','Masaa yanayopotea kila mwezi. Jaribu namba zako kwenye kikokotoo hapa chini.']],[['Money','Pesa'],['Fares, and for many people unpaid time away from a stall, a salon or a job.','Nauli, na kwa wengi muda usiolipwa nje ya kibanda, saluni au kazi.']],[['Health','Afya'],['When buying is slow, people buy less often, skip refills or stop treatment early.','Ununuzi ukiwa wa polepole, watu hununua mara chache, huacha kujaza dawa au huacha matibabu mapema.']]],
  fix:['<b>Afya answer:</b> advice and payment are separated. Scan the shelf code, pay by mobile money in under 30 seconds, and an adviser is free to answer questions. Or skip the trip: order in the app or on WhatsApp.','<b>Jibu la Afya:</b> ushauri na malipo vinatenganishwa. Scan kodi ya rafu, lipa kwa pesa ya simu chini ya sekunde 30, na mshauri yuko huru kujibu maswali. Au usisafiri kabisa: agiza kwenye programu au WhatsApp.']},
 {id:'p11-untrusted',k:['Pain 3 · Untrusted','Tatizo 3 · Kutoaminika'],img:'p1-untrusted',pos:'50% 50%',alt:'Concept image: a hand holding an unlabelled blister strip of tablets up to the light on a cluttered shop counter',
  h:['Is it genuine? Nobody can tell.','Je, ni halisi? Hakuna anayeweza kujua.'],
  p:['A customer cannot test a tablet. Loose strips without a box, products with no Kiswahili label and devices with no warranty are common in informal outlets. The World Health Organization estimates that about 1 in 10 medical products in low- and middle-income countries fails quality standards or is falsified. In Tanzania, the regulator TMDA keeps finding unregistered products: in September 2026 it seized TSh 360 million of unregistered medicines at Dar es Salaam airport, including medicines for diabetes and high blood pressure.',
     'Mteja hawezi kupima kidonge. Vipande vya vidonge bila boksi, bidhaa zisizo na maelezo ya Kiswahili na vifaa visivyo na dhamana ni vya kawaida kwenye maduka yasiyo rasmi. Shirika la Afya Duniani linakadiria kwamba takriban bidhaa 1 kati ya 10 za tiba katika nchi za kipato cha chini na kati hazikidhi viwango au ni bandia. Tanzania, mamlaka ya TMDA inaendelea kukamata bidhaa zisizosajiliwa: Septemba 2026 ilikamata dawa zisizosajiliwa za TSh milioni 360 kwenye uwanja wa ndege wa Dar es Salaam, zikiwemo dawa za kisukari na shinikizo la damu.'],
  fact:['1 in 10','1 kati ya 10'],factL:['medical products in low- and middle-income countries is substandard or falsified (WHO estimate, about 48,000 samples, 88 countries)','bidhaa za tiba katika nchi za kipato cha chini na kati hazikidhi viwango au ni bandia (makadirio ya WHO, sampuli 48,000, nchi 88)'],src:'who_sf',conf:'m',
  cost:[[['Health','Afya'],['A fake or weak blood-pressure or diabetes tablet fails silently. The first sign may be a stroke or a hospital admission.','Kidonge bandia au dhaifu cha shinikizo la damu au kisukari hushindwa kimya kimya. Dalili ya kwanza inaweza kuwa kiharusi au kulazwa hospitali.']],[['Money','Pesa'],['Money spent on a product that does not work, then spent again on the right one, plus the cost of the complication.','Pesa zinazotumika kwa bidhaa isiyofanya kazi, kisha kutumika tena kwa sahihi, pamoja na gharama ya madhara.']],[['Trust','Imani'],['People stop trusting treatment itself: “the medicine did not work”, when it was the product.','Watu huacha kuamini matibabu yenyewe: “dawa haikufanya kazi”, kumbe ilikuwa bidhaa.']]],
  fix:['<b>Afya answer:</b> TMDA-registered products only, bought from licensed suppliers, with batch and expiry tracked in one system. Every receipt is saved, every device has a warranty, and a recall reaches the customer by SMS.','<b>Jibu la Afya:</b> bidhaa zilizosajiliwa na TMDA pekee, kutoka kwa wasambazaji wenye leseni, na namba ya toleo na tarehe ya kuisha zikifuatiliwa kwenye mfumo mmoja. Kila risiti inahifadhiwa, kila kifaa kina dhamana, na bidhaa ikirudishwa mteja anaarifiwa kwa SMS.']},
 {id:'p11-unplanned',k:['Pain 4 · Unplanned','Tatizo 4 · Bila mpango'],img:'real-stress',pos:'50% 45%',alt:'Concept image: a worried mother at her kitchen table at night, head in her hands, with empty medicine boxes and an empty nappy pack',
  h:['Nobody notices until it runs out.','Hakuna anayegundua hadi kinapokwisha.'],
  p:['Health needs repeat every month, but almost nobody plans them. Nappies, blood-pressure tablets and test strips run out on a Sunday night. Long-term conditions are also hidden: in the 2023 national survey, 23.1% of adults aged 18–69 had raised blood pressure, and 72.4% of the people found with diabetes had never been diagnosed. When a need is not known, it is not planned; when it is not planned, it is bought in a rush, at any price, from whatever shop is open.',
     'Mahitaji ya afya hujirudia kila mwezi, lakini karibu hakuna anayeyapanga. Nepi, vidonge vya shinikizo la damu na vipande vya kipimo huisha Jumapili usiku. Magonjwa ya muda mrefu pia yamejificha: katika utafiti wa kitaifa wa 2023, asilimia 23.1 ya watu wazima wenye miaka 18–69 walikuwa na shinikizo la damu la juu, na asilimia 72.4 ya waliogundulika na kisukari hawakuwahi kugunduliwa kabla. Hitaji lisilojulikana halipangwi; lisilopangwa hununuliwa kwa haraka, kwa bei yoyote, kwenye duka lolote lililo wazi.'],
  fact:['72.4%','72.4%'],factL:['of diabetes cases found in the 2023 national STEPS survey had never been diagnosed (adults 18–69)','ya visa vya kisukari vilivyogunduliwa katika utafiti wa kitaifa wa STEPS 2023 havikuwahi kugunduliwa (watu wazima 18–69)'],src:'steps_dm',conf:'h',
  cost:[[['Health','Afya'],['Missed doses and late diagnosis turn a cheap, controllable condition into an expensive emergency.','Dozi zinazokosekana na kugundulika kwa kuchelewa hugeuza hali nafuu inayodhibitika kuwa dharura ya gharama kubwa.']],[['Money','Pesa'],['Emergency buying at the nearest shop, at its price, with no time to compare.','Ununuzi wa dharura kwenye duka lililo karibu, kwa bei yake, bila muda wa kulinganisha.']],[['Stress','Msongo','Msongo'],['The mental load of remembering every family member’s needs falls mostly on women.','Mzigo wa kukumbuka mahitaji ya kila mwanafamilia huangukia zaidi wanawake.']]],
  fix:['<b>Afya answer:</b> a free 50-second Afya Check at the door finds hidden needs early, and the monthly Afya Box plans the rest: delivered on a fixed day, with a reminder 12 days before month end to keep or swap brands.','<b>Jibu la Afya:</b> Afya Check ya bure ya sekunde 50 hugundua mahitaji yaliyojificha mapema, na Afya Box ya kila mwezi hupanga mengine: inafika siku maalum, na ukumbusho siku 12 kabla ya mwisho wa mwezi wa kubaki au kubadilisha chapa.']},
 {id:'p11-far',k:['Pain 5 · Far from family','Tatizo 5 · Mbali na familia'],img:'p1-far',pos:'78% 45%',alt:'Concept image: an elderly woman alone at home by the window with a basic phone and an almost empty pill organiser',
  h:['The money arrives. The care may not.','Pesa inafika. Huduma huenda isifike.'],
  p:['Tanzanians living abroad, and children working in another city, send money home to look after their parents. In the 2024/25 financial year, diaspora remittances reached TSh 3.31 trillion. But money is not medicine. The sender cannot see whether the tablets were bought, whether they were genuine, or whether the blood-pressure monitor was ever used. An older parent, often living alone, has to make the trips, carry the bags and remember the doses.',
     'Watanzania wanaoishi nje ya nchi, na watoto wanaofanya kazi mji mwingine, hutuma pesa nyumbani kuwatunza wazazi wao. Katika mwaka wa fedha 2024/25, pesa zilizotumwa na diaspora zilifikia TSh trilioni 3.31. Lakini pesa si dawa. Mtumaji hawezi kuona kama vidonge vilinunuliwa, kama vilikuwa halisi, au kama kipimo cha shinikizo kiliwahi kutumika. Mzazi mzee, mara nyingi akiishi peke yake, inambidi asafiri, abebe mizigo na akumbuke dozi.'],
  fact:['TSh 3.31T','TSh trilioni 3.31'],factL:['sent home by Tanzanians abroad in 2024/25. About 3.49 million Tanzanians are aged 60 or over.','zilizotumwa nyumbani na Watanzania walio nje mwaka 2024/25. Takriban Watanzania milioni 3.49 wana miaka 60 au zaidi.'],src:'rem25',conf:'m',
  cost:[[['Care','Huduma'],['Money meant for medicine is spent on other urgent needs, or on the wrong product.','Pesa iliyokusudiwa dawa hutumika kwa mahitaji mengine ya haraka, au kwa bidhaa isiyo sahihi.']],[['Worry','Wasiwasi'],['Families abroad call and ask, but cannot check. Older parents say “I am fine” to avoid being a burden.','Familia za nje hupiga simu na kuuliza, lakini hawawezi kuhakiki. Wazazi wazee husema “niko salama” ili wasiwe mzigo.']],[['Health','Afya'],['Chronic conditions in older adults go unmonitored until a crisis.','Magonjwa sugu ya wazee hayafuatiliwi hadi dharura.']]],
  fix:['<b>Afya answer:</b> a son or daughter abroad chooses the box, pays by international card, and gets a photo at Bibi’s door. Pill reminders and a monthly report go to the family, with the parent’s consent.','<b>Jibu la Afya:</b> mtoto aliye nje huchagua box, hulipa kwa kadi ya kimataifa, na hupata picha mlangoni kwa Bibi. Ukumbusho wa dawa na ripoti ya kila mwezi huenda kwa familia, kwa ridhaa ya mzazi.']}
];
const WHO11=[
 ['real-p-mama-load','Concept image: a mother walking with her baby on her back, seen from behind','9.48M',['Mothers with young children','Mama wenye watoto wadogo'],['9.48 million children under five (15.4% of all Tanzanians) and about 2.2 million births a year. Nappies, wipes, baby care, fever and growth checks: every single month.','Watoto milioni 9.48 chini ya miaka mitano (asilimia 15.4 ya Watanzania wote) na takriban vizazi milioni 2.2 kwa mwaka. Nepi, wipes, huduma ya mtoto, homa na ukuaji: kila mwezi.'],'census','50% 35%'],
 ['real-health-check','Concept image: a health worker checking an older woman’s blood pressure','23.1%',['People living with a long-term condition','Watu wenye magonjwa ya muda mrefu'],['23.1% of adults aged 18–69 have raised blood pressure; diabetes is mostly undiagnosed. Tablets, strips, monitors and checks, for life.','Asilimia 23.1 ya watu wazima wa miaka 18–69 wana shinikizo la damu la juu; kisukari mara nyingi hakijagunduliwa. Vidonge, vipande vya kipimo, vipimo na ufuatiliaji, maisha yote.'],'steps_ht','50% 40%'],
 ['real-elder-care','Concept image: a daughter helping her elderly father fill a pill organiser','3.49M',['Families caring for older relatives','Familia zinazowatunza wazee'],['3.49 million Tanzanians are 60 or older (5.7%). Mobility aids, adult care, medicines and a carer who is also working.','Watanzania milioni 3.49 wana miaka 60 au zaidi (asilimia 5.7). Vifaa vya kutembea, huduma za watu wazima, dawa na mlezi ambaye pia anafanya kazi.'],'census','50% 40%'],
 ['real-man-phone','Concept image: a man abroad at a city window, choosing a box on his phone','TSh 3.31T',['Family abroad paying for care','Familia nje inayolipia huduma'],['TSh 3.31 trillion sent home in 2024/25, and about half a million Tanzanians working abroad. They pay, but cannot see the care.','TSh trilioni 3.31 zilitumwa nyumbani 2024/25, na takriban Watanzania nusu milioni wanafanya kazi nje. Wanalipa, lakini hawaoni huduma.'],'rem25','60% 45%']];
const PRE11={mama:[['Mother & baby','Mama na mtoto'],5,2000,2.5],cond:[['Long-term condition','Ugonjwa wa muda mrefu'],3,2500,2],elder:[['Caring for a parent','Kumtunza mzazi'],4,4000,3],custom:[['My own numbers','Namba zangu'],null]};
/* ---- 1.1 v2: cinematic month story + problem map ---- */
const CSS11B=`
.p11-story{position:relative;margin-top:26px;border-radius:30px;overflow:clip;border:1px solid var(--edge2);background:#020608}
.p11-stage{position:sticky;top:0;height:100vh;height:100svh;overflow:hidden;z-index:0}
.p11-stage .bgi{position:absolute;inset:0;opacity:0;transition:opacity 1.1s ease,transform 7s ease;transform:scale(1.08)}
.p11-stage .bgi.on{opacity:1;transform:scale(1)}
.p11-stage .bgi img{width:100%;height:100%;object-fit:cover}
.p11-stage::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(2,6,8,.92) 0%,rgba(2,6,8,.55) 42%,rgba(2,6,8,.05) 75%),linear-gradient(0deg,rgba(2,6,8,.75),rgba(2,6,8,0) 40%);pointer-events:none}
.p11-meter{position:absolute;right:22px;top:22px;z-index:3;width:min(300px,42%);padding:16px 18px;border-radius:20px;background:rgba(2,6,8,.72);border:1px solid rgba(255,155,135,.35);backdrop-filter:blur(12px)}
.p11-meter h5{margin:0 0 10px;font:500 .6rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:#ff9b87}
.p11-meter dl{display:grid;grid-template-columns:1fr auto;gap:7px 12px;margin:0}
.p11-meter dt{font-size:.8rem;color:var(--ink2)}
.p11-meter dd{margin:0;font:500 .95rem var(--f-hud);color:var(--ink);text-align:right;transition:color .4s}
.p11-meter dd.bump{color:#ff9b87}
.p11-prog{position:absolute;left:0;right:0;bottom:0;height:4px;z-index:3;background:rgba(255,255,255,.06)}
.p11-prog i{display:block;height:100%;width:0;background:linear-gradient(90deg,#ff9b87,var(--gold2));transition:width .5s}
.p11-cap2{position:absolute;left:22px;top:22px;z-index:3;font:500 .56rem var(--f-hud);letter-spacing:.18em;text-transform:uppercase;color:rgba(239,250,245,.85);background:rgba(2,6,8,.6);padding:5px 10px;border-radius:99px;border:1px solid rgba(255,255,255,.14)}
.p11-steps{position:relative;z-index:2;margin-top:-100vh;margin-top:-100svh}
.p11-step{min-height:100vh;min-height:100svh;display:flex;align-items:center;padding:0 0 0 clamp(20px,5vw,64px)}
.p11-step:first-child{padding-top:10vh}
.p11-card{max-width:520px;padding:30px 32px 30px;border-radius:24px;background:rgba(2,6,8,.78);border:1px solid var(--edge2);backdrop-filter:blur(14px);box-shadow:0 40px 90px -40px rgba(0,0,0,.9);opacity:0;transform:translateY(30px);transition:opacity .7s,transform .7s cubic-bezier(.2,.8,.2,1)}
.p11-step.on .p11-card{opacity:1;transform:none}
.p11-when{display:flex;align-items:center;gap:10px;font:500 .64rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--gold2)}
.p11-when i{width:28px;height:1px;background:var(--gold2)}
.p11-card h3{margin:14px 0 0;font:800 clamp(1.4rem,2.6vw,2.1rem)/1.12 var(--f-display);letter-spacing:-.02em;color:var(--ink)}
.p11-card p{margin:14px 0 0;font-size:1.02rem;line-height:1.75;color:var(--ink2)}
.p11-card p b{color:var(--ink)}
.p11-card .why{margin-top:16px;padding:12px 14px;border-left:3px solid #ff9b87;background:rgba(255,155,135,.07);border-radius:0 12px 12px 0;font-size:.9rem;line-height:1.6;color:var(--ink2)}
.p11-card .why b{color:#ff9b87}
.p11-final{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:18px}
.p11-final div{padding:12px;border-radius:14px;background:rgba(255,155,135,.08);border:1px solid rgba(255,155,135,.3)}
.p11-final b{display:block;font:500 1.25rem var(--f-hud);color:#ff9b87}
.p11-final span{display:block;font-size:.74rem;color:var(--ink2);margin-top:4px;line-height:1.35}
.p11-go{display:inline-flex;align-items:center;gap:10px;margin-top:18px;padding:12px 18px;border-radius:999px;background:linear-gradient(90deg,var(--neon),#9df7d0);color:#03140d;font:700 .85rem var(--f-display);text-decoration:none}
.p11-mapwrap>*{min-width:0}.p11-mapwrap{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);gap:20px;margin-top:24px;align-items:start}
.p11-map{position:relative;border-radius:28px;overflow:hidden;border:1px solid var(--edge2);background:radial-gradient(120% 90% at 30% 30%,#0b2a22,#03100c 60%,#020608)}
.p11-map svg{display:block;width:100%;height:auto}
.p11-map .dist{fill:rgba(95,191,143,.06);stroke:rgba(95,191,143,.45);stroke-width:1.4;transition:fill .4s}
.p11-map .dist.hl{fill:rgba(95,191,143,.18)}
.p11-map .sea{fill:url(#p11sea)}
.p11-map .road{fill:none;stroke:rgba(242,201,107,.28);stroke-width:2;stroke-dasharray:2 7;stroke-linecap:round;animation:p11dash 18s linear infinite}
@keyframes p11dash{to{stroke-dashoffset:-200}}
.p11-map .dl{font:600 13px var(--f-display);fill:rgba(239,250,245,.75);letter-spacing:.06em}
.p11-map .rl{font:500 9px var(--f-hud);fill:rgba(242,201,107,.55);letter-spacing:.14em}
.p11-map .dp{font:500 10px var(--f-hud);fill:rgba(242,201,107,.85);letter-spacing:.08em}
.p11-pin{cursor:pointer;outline:none}
.p11-pin .ring{fill:none;stroke:#ff9b87;stroke-width:2;transform-box:fill-box;transform-origin:center;animation:p11pulse 2.2s ease-out infinite}
@keyframes p11pulse{0%{transform:scale(.6);opacity:1}100%{transform:scale(2.4);opacity:0}}
.p11-pin .dot{fill:#ff9b87;stroke:#020608;stroke-width:3;transition:r .3s}
.p11-pin text{font:800 13px var(--f-display);fill:#03140d;pointer-events:none}
.p11-pin.on .dot,.p11-pin:hover .dot,.p11-pin:focus .dot{fill:var(--gold2)}
.p11-pin.on .ring{stroke:var(--gold2)}
.p11-plane{fill:none;stroke:rgba(201,184,255,.7);stroke-width:2;stroke-dasharray:6 8;animation:p11dash 9s linear infinite}
.p11-legend{position:absolute;left:16px;bottom:14px;font:500 .58rem var(--f-hud);letter-spacing:.16em;text-transform:uppercase;color:var(--ink3)}
.p11-tabs{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}
.p11-tabs button{all:unset;cursor:pointer;padding:9px 14px;border-radius:999px;border:1px solid var(--edge2);font-size:.82rem;color:var(--ink2);display:inline-flex;gap:8px;align-items:center}
.p11-tabs button b{display:inline-grid;place-items:center;width:20px;height:20px;border-radius:50%;background:#ff9b87;color:#03140d;font:800 .7rem var(--f-display)}
.p11-tabs button[aria-pressed=true]{border-color:var(--gold2);color:var(--ink);background:rgba(242,201,107,.1)}
.p11-detail{border-radius:28px;overflow:hidden;border:1px solid var(--edge2);background:linear-gradient(170deg,var(--panel2),rgba(2,6,8,.92));animation:p11in .6s cubic-bezier(.2,.8,.2,1)}
@keyframes p11in{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
.p11-detail .ph{position:relative;aspect-ratio:16/8;overflow:hidden}
.p11-detail .ph img{width:100%;height:100%;object-fit:cover;display:block}
.p11-detail .ph::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(2,6,8,.95),rgba(2,6,8,0) 60%)}
.p11-detail .ph .t{position:absolute;left:24px;right:24px;bottom:16px;z-index:2}
.p11-detail .ph .t small{font:500 .62rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:#ff9b87}
.p11-detail .ph .t h3{margin:6px 0 0;font:800 clamp(1.3rem,2.2vw,1.8rem)/1.12 var(--f-display);color:var(--ink)}
.p11-detail .bd{padding:20px 24px 26px}
.p11-detail .bd>p{margin:0;font-size:.97rem;line-height:1.75;color:var(--ink2)}
.p11-vs{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:18px}
.p11-vs>div{border-radius:16px;padding:14px 16px;border:1px solid var(--edge)}
.p11-vs>div:first-child{background:rgba(255,155,135,.07);border-color:rgba(255,155,135,.3)}
.p11-vs>div:last-child{background:rgba(95,191,143,.07);border-color:rgba(95,191,143,.3)}
.p11-vs h5{margin:0 0 8px;font:500 .6rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase}
.p11-vs>div:first-child h5{color:#ff9b87}.p11-vs>div:last-child h5{color:var(--neon)}
.p11-vs ul{margin:0;padding:0;list-style:none;display:grid;gap:8px}
.p11-vs li{font-size:.86rem;line-height:1.55;color:var(--ink2);padding-left:14px;position:relative}
.p11-vs li::before{content:"";position:absolute;left:0;top:.6em;width:6px;height:6px;border-radius:50%;background:currentColor;opacity:.6}
.p11-dfact{display:flex;gap:16px;align-items:flex-start;margin-top:16px;padding:14px 16px;border-radius:16px;background:rgba(2,6,8,.6);border:1px solid rgba(242,201,107,.3)}
.p11-dfact b{font:500 1.5rem/1 var(--f-hud);color:var(--gold2);white-space:nowrap}
.p11-dfact span{font-size:.82rem;line-height:1.5;color:var(--ink2)}
.p11-dfact .p1-conf{margin-top:8px}
.p11-why2{margin-top:14px;font-size:.9rem;line-height:1.65;color:var(--ink2)}
.p11-why2 b{color:var(--gold2)}
@media (max-width:980px){.p11-mapwrap{grid-template-columns:1fr}.p11-stage::after{background:linear-gradient(0deg,rgba(2,6,8,.95) 0%,rgba(2,6,8,.5) 55%,rgba(2,6,8,.15))}.p11-step{align-items:flex-end;padding:0 14px 8vh}.p11-card{max-width:none;padding:22px 20px}.p11-card p{font-size:.95rem}.p11-meter{left:14px;right:14px;top:14px;width:auto;padding:10px 14px}.p11-meter dl{grid-template-columns:repeat(3,auto 1fr);gap:4px 8px;font-size:.72rem}.p11-meter dt{font-size:.68rem}.p11-meter dd{font-size:.8rem}.p11-meter h5{margin-bottom:6px}.p11-cap2{display:none}}
@media (max-width:560px){.p11-vs{grid-template-columns:1fr}.p11-final{grid-template-columns:1fr 1fr 1fr}.p11-final b{font-size:1rem}.p11-meter dl{grid-template-columns:1fr auto 1fr auto}}
.p11-mimg,.p11-mm{display:none}
@media (max-width:760px){.p11-story{border:0;background:none;overflow:visible}.p11-stage{display:none}.p11-steps{margin-top:0}.p11-step{min-height:0;padding:0;margin-top:16px;display:block}.p11-step:first-child{padding-top:0}.p11-card{opacity:1;transform:none;padding:0 0 20px;overflow:hidden;background:linear-gradient(170deg,var(--panel2),rgba(2,6,8,.9))}.p11-card>*:not(.p11-mimg){margin-left:18px;margin-right:18px}.p11-mimg{display:block;margin:0 0 16px}.p11-mimg img{display:block;width:100%;height:auto;aspect-ratio:16/10;object-fit:cover}.p11-mm{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px}.p11-mm span{font-size:.7rem;color:var(--ink2);padding:4px 9px;border-radius:99px;border:1px solid rgba(255,155,135,.35);background:rgba(255,155,135,.07)}.p11-mm b{font-family:var(--f-hud);color:#ff9b87;font-weight:500}.p11-final,.p11-go{margin-left:18px}}
.p11-card .afy{margin-top:12px;padding:12px 14px;border-left:3px solid var(--neon);background:rgba(95,191,143,.07);border-radius:0 12px 12px 0;font-size:.9rem;line-height:1.6;color:var(--ink2)}
.p11-card .afy b{color:var(--neon)}
.p11-days2{position:absolute;right:22px;top:250px;z-index:4;display:flex;flex-direction:column;gap:4px;padding:6px;border-radius:18px;background:rgba(2,6,8,.7);border:1px solid var(--edge2);backdrop-filter:blur(10px)}
.p11-days2 button{all:unset;cursor:pointer;display:flex;align-items:center;gap:6px;padding:6px 10px;border-radius:999px;font-size:.7rem;color:var(--ink3);transition:background .3s,color .3s}
.p11-days2 button b{font:600 .66rem var(--f-hud);color:var(--gold2)}
.p11-days2 button.on{background:rgba(255,155,135,.18);color:var(--ink)}
.p11-vsx{margin-top:22px;border-radius:26px;border:1px solid var(--edge2);background:linear-gradient(170deg,var(--panel2),rgba(2,6,8,.9));padding:22px 24px 20px}
.p11-vshead,.p11-vsr{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr) minmax(0,1fr);gap:18px;align-items:center}
.p11-vshead div{font:500 .64rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase}
.p11-vshead .a{color:#ff9b87}.p11-vshead .b{color:var(--neon)}
.p11-vsr{padding:16px 0;border-top:1px solid var(--edge)}
.p11-vsr .l b{display:block;font:700 .98rem var(--f-display);color:var(--ink)}
.p11-vsr .l span{display:block;font-size:.84rem;line-height:1.55;color:var(--ink2);margin-top:4px}
.p11-vsr .a,.p11-vsr .b{position:relative;height:34px;border-radius:10px;background:rgba(255,255,255,.04);overflow:hidden}
.p11-vsr i{position:absolute;left:0;top:0;bottom:0;width:0;border-radius:10px;transition:width 1.4s cubic-bezier(.2,.8,.2,1)}
.p11-vsx.in .p11-vsr i{width:var(--w)}
.p11-vsr .a i{background:linear-gradient(90deg,rgba(255,155,135,.55),#ff9b87)}.p11-vsr .b i{background:linear-gradient(90deg,rgba(95,191,143,.55),var(--neon))}
.p11-vsr em{position:absolute;right:10px;top:50%;transform:translateY(-50%);font:500 .9rem var(--f-hud);font-style:normal;color:var(--ink)}
.p11-detail .igw{position:absolute;right:16px;top:44px;z-index:2;width:min(46%,280px);padding:8px 10px;border-radius:14px;background:rgba(2,6,8,.7);border:1px solid var(--edge2);backdrop-filter:blur(8px)}
.ig{display:block;width:100%;height:auto}
.ig text{font:500 9px var(--f-hud);fill:var(--ink3);letter-spacing:.08em}
.ig .shops rect{fill:rgba(255,155,135,.18);stroke:#ff9b87;stroke-width:1.2}.ig .shops path{fill:none;stroke:#ff9b87;stroke-width:1.2}
.ig .route{fill:none;stroke:var(--gold2);stroke-width:2;stroke-dasharray:4 6;animation:p11dash 6s linear infinite}
.ig .q{fill:#ff9b87;opacity:.4;animation:p11q 2.4s ease-in-out infinite}
@keyframes p11q{50%{opacity:1;transform:translateX(4px)}}
.ig .ctr{fill:rgba(242,201,107,.2);stroke:var(--gold2)}.ig .clk{fill:none;stroke:var(--ink3);stroke-width:1.5}
.ig .hand{stroke:var(--gold2);stroke-width:2;stroke-linecap:round;transform-origin:0 0;animation:p11spin 3s linear infinite}
@keyframes p11spin{to{transform:rotate(360deg)}}
.ig .strip{fill:rgba(255,255,255,.06);stroke:var(--ink3)}.ig .pill{fill:rgba(239,250,245,.55)}
.ig .scan{fill:rgba(217,181,110,.6);animation:p11scan 2.6s ease-in-out infinite alternate}
@keyframes p11scan{to{transform:translateX(154px)}}
.ig .qm{font:800 18px var(--f-display);fill:#ff9b87}
.ig .day{fill:rgba(95,191,143,.25);animation:p11day 4s ease infinite}
.ig .day.out{fill:#ff9b87}
@keyframes p11day{0%,10%{opacity:.25}30%,100%{opacity:1}}
.ig .arc{fill:none;stroke:rgba(201,184,255,.8);stroke-width:2;stroke-dasharray:5 7;animation:p11dash 7s linear infinite}
.ig .em{font-size:16px;fill:#c9b8ff}.ig .hs{fill:rgba(255,155,135,.15);stroke:#ff9b87;stroke-width:1.2}
.ig .coin{fill:var(--gold2);offset-path:path("M30 90 C90 0 210 0 262 72");animation:p11coin 3.2s ease-in infinite}
@keyframes p11coin{from{offset-distance:0%}to{offset-distance:100%}}
.p11-ex{display:grid;gap:0;margin:16px 0 0;border-top:1px solid var(--edge)}
.p11-ex div{display:grid;grid-template-columns:150px minmax(0,1fr);gap:14px;padding:12px 0;border-bottom:1px solid var(--edge)}
.p11-ex dt{font:500 .6rem/1.5 var(--f-hud);letter-spacing:.16em;text-transform:uppercase;color:var(--gold2);padding-top:3px}
.p11-ex dd{margin:0;font-size:.88rem;line-height:1.6;color:var(--ink2)}
@media (max-width:980px){.p11-days2{display:none}}
@media (max-width:760px){.p11-vshead{display:none}.p11-vsr{grid-template-columns:1fr 1fr;gap:8px}.p11-vsr .l{grid-column:1/-1}.p11-vsr .a::before,.p11-vsr .b::before{position:absolute;left:10px;top:50%;transform:translateY(-50%);z-index:2;font:500 .58rem var(--f-hud);letter-spacing:.14em;text-transform:uppercase}.p11-vsr .a::before{content:"TODAY";color:#ffd9d0}.p11-vsr .b::before{content:"AFYA";color:#d8fff0}.p11-ex div{grid-template-columns:1fr;gap:4px}.p11-detail .igw{display:none}}
@media (prefers-reduced-motion:reduce){.ig *{animation:none!important}.p11-stage .bgi,.p11-card{transition:none}.p11-pin .ring,.p11-map .road,.p11-plane{animation:none}}
`;
/* the month, step by step. m = running meter after this step: [shops visited, hours lost, fares TSh, items not found, unverified products, days without BP tablets] */
const STORY=[
 {img:'real-stress',pos:'50% 45%',when:['Day 1 · Sunday, 21:30','Siku 1 · Jumapili, saa 3:30 usiku'],h:['The pack is empty, and nothing is open.','Pakiti imekwisha, na hakuna kilicho wazi.'],
  p:['It is a common situation in Dar es Salaam homes. The last nappy is used. In the kitchen drawer there are only two of the father’s blood-pressure tablets left, and the test strips for his monitor ran out last week. Nobody wrote it down, because nobody has the time to plan these things; they are simply noticed when they are gone. It is late, the nearby shops are shut, and tomorrow is a working day.',
     'Ni hali ya kawaida katika nyumba za Dar es Salaam. Nepi ya mwisho imetumika. Kwenye droo ya jikoni zimebaki vidonge viwili tu vya shinikizo la damu vya baba, na vipande vya kipimo chake viliisha wiki iliyopita. Hakuna aliyeandika, kwa sababu hakuna mwenye muda wa kupanga mambo haya; hugundulika tu yanapokwisha. Ni usiku, maduka ya karibu yamefungwa, na kesho ni siku ya kazi.'],
  why:['<b>Why it matters:</b> health needs repeat every month, but almost no household plans them. Every unplanned need becomes a rushed, expensive purchase.','<b>Kwa nini ni muhimu:</b> mahitaji ya afya hujirudia kila mwezi, lakini karibu hakuna familia inayoyapanga. Kila hitaji lisilopangwa linakuwa ununuzi wa haraka na wa gharama.'],m:[0,0,0,0,0,0]},
 {img:'p1-hero',pos:'40% 50%',when:['Day 2 · Monday, 08:15','Siku 2 · Jumatatu, saa 2:15 asubuhi'],h:['The search begins, with the baby on her back.','Msako unaanza, mtoto mgongoni.'],
  p:['The mother ties the baby on her back and takes a bajaji to the main road, because the small shop on their street only sells soap and sugar. She has a list in her head: nappies size 4, baby wipes, iron tablets from the clinic, the father’s tablets, and the strips. She is supposed to open her stall at nine. Every hour she spends looking for health items is an hour without sales.',
     'Mama anamfunga mtoto mgongoni na kupanda bajaji hadi barabara kuu, kwa sababu duka dogo la mtaani linauza sabuni na sukari tu. Ana orodha kichwani: nepi saizi 4, wipes, vidonge vya madini ya chuma kutoka kliniki, vidonge vya baba, na vipande vya kipimo. Anatakiwa kufungua kibanda chake saa tatu. Kila saa anayotumia kutafuta bidhaa za afya ni saa bila mauzo.'],
  why:['<b>Why it matters:</b> the cost is not only the fare. For the many people who work for themselves, time away is income lost.','<b>Kwa nini ni muhimu:</b> gharama si nauli tu. Kwa wengi wanaojiajiri, muda unaopotea ni kipato kinachopotea.'],m:[0,0.5,1000,0,0,0]},
 {img:'real-mother-back',pos:'40% 45%',when:['Day 2 · 08:50 · First shop','Siku 2 · saa 2:50 · Duka la kwanza'],h:['First shop: the wrong size, and no strips.','Duka la kwanza: saizi isiyo sahihi, na hakuna vipande vya kipimo.'],
  p:['The first drug shop is small and friendly, but it stocks what sells fastest. It has nappies in size 2 and size 5, not size 4. It has paracetamol and cough syrup, but not the father’s brand of blood-pressure tablet and no test strips at all. The shopkeeper suggests another brand of tablet. She does not know if it is the same medicine, and nobody can explain the difference, so she buys only the wipes and moves on.',
     'Duka la kwanza la dawa ni dogo na lenye ukarimu, lakini linauza vinavyouzika haraka. Lina nepi saizi 2 na 5, si saizi 4. Lina paracetamol na dawa ya kikohozi, lakini si chapa ya vidonge vya shinikizo la baba wala vipande vya kipimo. Muuzaji anapendekeza chapa nyingine ya vidonge. Hajui kama ni dawa ileile, na hakuna anayeweza kueleza tofauti, hivyo ananunua wipes tu na kuendelea.'],
  why:['<b>Why it matters:</b> Tanzania has about 11,356 accredited drug shops but only 1,334 pharmacies. Most outlets are small, with a narrow range, so one need often means several stops.','<b>Kwa nini ni muhimu:</b> Tanzania ina takriban maduka ya dawa yaliyothibitishwa 11,356 lakini famasi 1,334 tu. Maduka mengi ni madogo yenye bidhaa chache, hivyo hitaji moja mara nyingi lina maana ya vituo kadhaa.'],m:[1,1,1000,2,0,0]},
 {img:'real-p-crowd',pos:'50% 40%',when:['Day 2 · 10:10 · Second shop','Siku 2 · saa 4:10 · Duka la pili'],h:['Second shop: one counter, twenty people.','Duka la pili: kaunta moja, watu ishirini.'],
  p:['The bigger pharmacy near the market has more stock, but one counter does everything: the pharmacist gives advice, finds the item, takes the money and counts the change. She waits forty-five minutes just to ask about the strips. The tablets are there and she buys them. The strips for his monitor model are out of stock, “maybe next week”. The baby is crying and hot.',
     'Famasi kubwa karibu na soko ina bidhaa nyingi zaidi, lakini kaunta moja inafanya kila kitu: mfamasia anatoa ushauri, anatafuta bidhaa, anapokea pesa na kuhesabu chenji. Anasubiri dakika arobaini na tano ili kuuliza tu kuhusu vipande vya kipimo. Vidonge vipo na anavinunua. Vipande vya modeli ya kipimo chake vimekwisha, “labda wiki ijayo”. Mtoto analia na ana joto.'],
  why:['<b>Why it matters:</b> when advice and payment share one queue, a two-minute question costs most of a morning. Dar es Salaam grew by 23% in ten years; the counters did not.','<b>Kwa nini ni muhimu:</b> ushauri na malipo yakishiriki foleni moja, swali la dakika mbili linagharimu asubuhi nzima. Dar es Salaam ilikua asilimia 23 ndani ya miaka kumi; kaunta hazikukua.'],m:[2,2.4,2000,1,0,0]},
 {img:'p1-untrusted',pos:'50% 50%',when:['Day 2 · 11:30 · Third shop','Siku 2 · saa 5:30 · Duka la tatu'],h:['Third shop: iron tablets in a strip with no box.','Duka la tatu: vidonge vya madini ya chuma kwenye kipande bila boksi.'],
  p:['In a stall by the bus stop she finally finds iron tablets, and nappies in size 4. The tablets are cut from a larger strip, with no box, no leaflet and no expiry date she can read. They are cheaper than at the pharmacy. She hesitates, then buys them, because the clinic told her to start this week and she cannot spend another morning searching. She has no way of knowing whether they are genuine.',
     'Kwenye kibanda karibu na kituo cha basi hatimaye anapata vidonge vya madini ya chuma, na nepi saizi 4. Vidonge vimekatwa kutoka kipande kikubwa, bila boksi, bila karatasi ya maelezo na bila tarehe ya kuisha inayosomeka. Ni nafuu kuliko famasi. Anasita, kisha ananunua, kwa sababu kliniki ilimwambia aanze wiki hii na hawezi kutumia asubuhi nyingine kutafuta. Hana njia ya kujua kama ni halisi.'],
  why:['<b>Why it matters:</b> WHO estimates about 1 in 10 medical products in low- and middle-income countries is substandard or falsified. In September 2026 TMDA seized TSh 360 million of unregistered medicines at Dar airport.','<b>Kwa nini ni muhimu:</b> WHO inakadiria takriban bidhaa 1 kati ya 10 za tiba katika nchi za kipato cha chini na kati hazikidhi viwango au ni bandia. Septemba 2026 TMDA ilikamata dawa zisizosajiliwa za TSh milioni 360 uwanja wa ndege wa Dar.'],m:[3,3.2,2000,1,1,0]},
 {img:'today2',pos:'50% 45%',when:['Day 2 · 13:20 · Home','Siku 2 · saa 7:20 mchana · Nyumbani'],h:['Home five hours later, and the strips are still missing.','Nyumbani masaa matano baadaye, na vipande vya kipimo bado havipo.'],
  p:['She gets home after one o’clock with three plastic bags and an exhausted baby. The stall did not open this morning. The father has his tablets, but without strips he cannot check whether they are working, so he simply stops measuring. Nobody will remind them before the tablets run out again in a month, and the whole search will start from the beginning.',
     'Anafika nyumbani baada ya saa saba akiwa na mifuko mitatu ya plastiki na mtoto aliyechoka. Kibanda hakikufunguliwa asubuhi hii. Baba ana vidonge vyake, lakini bila vipande vya kipimo hawezi kuhakiki kama vinafanya kazi, hivyo anaacha kupima. Hakuna atakayewakumbusha kabla vidonge havijaisha tena baada ya mwezi, na msako wote utaanza upya.'],
  why:['<b>Why it matters:</b> in the 2023 national survey 23.1% of adults had raised blood pressure, and 72.4% of people found with diabetes had never been diagnosed. Conditions that are not measured are not controlled.','<b>Kwa nini ni muhimu:</b> katika utafiti wa kitaifa wa 2023 asilimia 23.1 ya watu wazima walikuwa na shinikizo la damu la juu, na asilimia 72.4 ya waliogundulika na kisukari hawakuwahi kugunduliwa. Magonjwa yasiyopimwa hayadhibitiwi.'],m:[3,5,3000,1,1,0]},
 {img:'p1-far',pos:'78% 45%',when:['Day 17 · Across town','Siku 17 · Upande mwingine wa mji'],h:['Bibi lives alone. The money arrived; the tablets did not.','Bibi anaishi peke yake. Pesa ilifika; vidonge havikufika.'],
  p:['The grandmother lives on the other side of the city. Her son works in the Gulf and sends money every month for her blood-pressure and diabetes medicines. She is seventy-two, the trip to the pharmacy is two bajaji rides and a long wait, and some months she uses the money for the electricity bill instead. Her pill organiser has been empty for three days. When her son calls, she tells him she is fine.',
     'Bibi anaishi upande mwingine wa jiji. Mwanawe anafanya kazi Uarabuni na hutuma pesa kila mwezi kwa dawa zake za shinikizo la damu na kisukari. Ana miaka sabini na mbili, safari ya famasi ni bajaji mbili na kusubiri kwa muda mrefu, na baadhi ya miezi hutumia pesa hiyo kulipa umeme. Kisanduku chake cha vidonge kimekuwa tupu kwa siku tatu. Mwanawe akipiga simu, anamwambia yuko salama.'],
  why:['<b>Why it matters:</b> Tanzanians abroad sent home TSh 3.31 trillion in 2024/25, and 3.49 million Tanzanians are aged 60 or over. The money flows, but nobody can see whether it becomes care.','<b>Kwa nini ni muhimu:</b> Watanzania walio nje walituma nyumbani TSh trilioni 3.31 mwaka 2024/25, na Watanzania milioni 3.49 wana miaka 60 au zaidi. Pesa inatiririka, lakini hakuna anayeweza kuona kama inakuwa huduma.'],m:[3,5,3000,1,1,3]},
 {img:'today3',pos:'50% 40%',when:['Day 30 · The month in total','Siku 30 · Jumla ya mwezi'],h:['One month, one household: this is the hidden bill.','Mwezi mmoja, familia moja: hii ndiyo bili iliyojificha.'],
  p:['Add the second big search of the month, for nappies and the strips, and the picture is complete. Nothing dramatic happened. Nobody was rushed to hospital, this time. But one household lost more than a working day, paid fares that bought no health, bought one product it cannot trust, and left a grandmother without her medicine for three days. Multiply it by the 1.5 million households of Dar es Salaam. That is the problem Afya Basics exists to solve.',
     'Ongeza msako wa pili mkubwa wa mwezi, wa nepi na vipande vya kipimo, na picha inakamilika. Hakuna jambo kubwa lililotokea. Hakuna aliyekimbizwa hospitali, safari hii. Lakini familia moja ilipoteza zaidi ya siku moja ya kazi, ililipa nauli zisizonunua afya, ilinunua bidhaa moja isiyoaminika, na ilimwacha bibi bila dawa kwa siku tatu. Zidisha kwa familia milioni 1.5 za Dar es Salaam. Hilo ndilo tatizo ambalo Afya Basics ipo kulitatua.'],
  why:null,m:[6,10,6000,2,1,3],final:true}];
const AF11=[['<b>With Afya Basics:</b> this night does not happen. The Afya Box arrives on a fixed day each month, and 12 days before month end an SMS asks whether to keep the same items or swap brands, so nothing runs out on a Sunday night.', '<b>Ukiwa na Afya Basics:</b> usiku huu haufiki. Afya Box inafika siku maalum kila mwezi, na siku 12 kabla ya mwisho wa mwezi SMS inauliza kama ubaki na bidhaa zilezile au ubadilishe chapa, hivyo hakuna kinachoisha Jumapili usiku.'], ['<b>With Afya Basics:</b> there is no search. From her stall she sends one WhatsApp message or taps “Order again” in the app, approves the mobile-money push in under 30 seconds, and a rider brings it the same day.', '<b>Ukiwa na Afya Basics:</b> hakuna msako. Akiwa kibandani anatuma ujumbe mmoja wa WhatsApp au anagusa “Agiza tena” kwenye programu, anathibitisha malipo ya simu chini ya sekunde 30, na msafirishaji analeta siku hiyohiyo.'], ['<b>With Afya Basics:</b> everything on her list sits under one roof, in six Care Zones. Every nappy size is stocked, and the father’s tablet and his strips sit side by side with 4–5 registered brands, each with a clear price.', '<b>Ukiwa na Afya Basics:</b> kila kitu kwenye orodha yake kiko chini ya paa moja, katika Kanda sita za Huduma. Kila saizi ya nepi ipo, na vidonge vya baba na vipande vyake viko pamoja na chapa 4–5 zilizosajiliwa, kila moja na bei wazi.'], ['<b>With Afya Basics:</b> advice and payment are separated. She scans the shelf code and pays by phone in under 30 seconds, while an adviser who never touches the till answers her question about the strips.', '<b>Ukiwa na Afya Basics:</b> ushauri na malipo vinatenganishwa. Anascan kodi ya rafu na kulipa kwa simu chini ya sekunde 30, huku mshauri asiyeshika malipo akijibu swali lake kuhusu vipande vya kipimo.'], ['<b>With Afya Basics:</b> only TMDA-registered products, bought from licensed suppliers, in their box with a leaflet. Batch and expiry are recorded on her receipt, so if a product is ever recalled she is told by SMS.', '<b>Ukiwa na Afya Basics:</b> bidhaa zilizosajiliwa na TMDA pekee, kutoka kwa wasambazaji wenye leseni, ndani ya boksi lake na karatasi ya maelezo. Namba ya toleo na tarehe ya kuisha zinaandikwa kwenye risiti yake, hivyo bidhaa ikirudishwa anaarifiwa kwa SMS.'], ['<b>With Afya Basics:</b> the father takes a free 50-second Afya Check at the door; his reading is saved, his strips are in the box every month, and he gets a reminder before the tablets run low.', '<b>Ukiwa na Afya Basics:</b> baba anafanya Afya Check ya bure ya sekunde 50 mlangoni; kipimo chake kinahifadhiwa, vipande vyake viko kwenye box kila mwezi, na anapata ukumbusho kabla vidonge havijapungua.'], ['<b>With Afya Basics:</b> her son chooses the Bibi na Babu box from abroad and pays by international card. It is delivered to her door with a photo for him, her pill reminders come by SMS, and the family gets a short monthly report, with her consent.', '<b>Ukiwa na Afya Basics:</b> mwanawe anachagua box ya Bibi na Babu akiwa nje na kulipa kwa kadi ya kimataifa. Inafikishwa mlangoni kwake na picha kwa ajili yake, ukumbusho wa dawa unakuja kwa SMS, na familia inapata ripoti fupi ya kila mwezi, kwa ridhaa yake.'], null];
const MLAB=[['Shops visited','Maduka yaliyotembelewa'],['Hours lost','Masaa yaliyopotea'],['Fares paid','Nauli zilizolipwa'],['Items still missing','Bidhaa ambazo bado hazijapatikana'],['Unverified products','Bidhaa zisizothibitishwa'],['Days without BP tablets','Siku bila vidonge vya shinikizo']];
/* problem map: districts are stylised, not to scale */
const DIST=[['Kinondoni','982,328','M300 40 L560 12 L585 92 L648 138 L632 178 L592 172 L600 240 L470 255 L380 200 Z',470,135],['Ubungo','1,086,912','M60 110 L300 40 L380 200 L340 330 L120 345 L50 230 Z',205,215],['Ilala','1,649,912','M340 330 L380 200 L470 255 L600 240 L606 300 L560 336 L520 420 L380 436 Z',455,330],['Temeke','1,346,674','M120 345 L340 330 L380 436 L520 420 L546 362 L556 470 L500 570 L300 610 L140 520 Z',300,470],['Kigamboni','317,902','M592 346 L640 332 L730 420 L760 520 L700 610 L560 600 L556 470 L574 420 Z',665,505]];
const PINS=[{x:540,y:300,d:'Ilala',k:0},{x:230,y:270,d:'Ubungo',k:1},{x:380,y:500,d:'Temeke',k:2},{x:520,y:190,d:'Kinondoni',k:3},{x:680,y:550,d:'Kigamboni',k:4}];
const MAPX=[
 {why:['For investors, this is the core of the store: <b>one stop replaces five</b>. Every extra item a family finds in one place raises the basket and brings them back next month.','Kwa wawekezaji, hiki ndicho kiini cha duka: <b>kituo kimoja kinachukua nafasi ya vitano</b>. Kila bidhaa ya ziada familia inayopata mahali pamoja huongeza kikapu na kuwarudisha mwezi ujao.'],
  today:[['Medicines, baby care, devices and home care sold in different shops','Several trips and fares for one month of supplies','Substitutes bought without advice when the right item is missing'],['Dawa, huduma za mtoto, vifaa na bidhaa za nyumbani zinauzwa maduka tofauti','Safari na nauli kadhaa kwa mahitaji ya mwezi mmoja','Mbadala hununuliwa bila ushauri bidhaa sahihi ikikosekana']],
  afya:[['Six Care Zones in one store, about 520 product families','4–5 registered brands side by side for every item','The same list and price in the app and on WhatsApp'],['Kanda sita za Huduma katika duka moja, takriban familia 520 za bidhaa','Chapa 4–5 zilizosajiliwa pembeni kwa pembeni kwa kila bidhaa','Orodha na bei ileile kwenye programu na WhatsApp']]},
 {why:['Speed is what turns a one-off visit into a monthly habit. <b>Fast checkout and home delivery</b> are what let one store serve thousands of households.','Kasi ndiyo inayogeuza ziara ya mara moja kuwa tabia ya kila mwezi. <b>Malipo ya haraka na kufikisha nyumbani</b> ndivyo vinavyowezesha duka moja kuhudumia maelfu ya familia.'],
  today:[['One counter for advice, finding items and payment','A short question costs a long wait in the queue','Traffic and heat turn one errand into half a day'],['Kaunta moja kwa ushauri, kutafuta bidhaa na malipo','Swali fupi linagharimu kusubiri kwa muda mrefu foleni','Msongamano na joto hugeuza shughuli moja kuwa nusu siku']],
  afya:[['Scan the shelf code and pay by mobile money in under 30 seconds','Advisers are free to advise because they do not handle the till','Order on the app or WhatsApp; same-day delivery across Dar'],['Scan kodi ya rafu na lipa kwa pesa ya simu chini ya sekunde 30','Washauri wako huru kushauri kwa sababu hawashiki malipo','Agiza kwenye programu au WhatsApp; kufikishwa siku hiyohiyo kote Dar']]},
 {why:['Trust is the moat. A brand that families know sells <b>only registered products</b>, with records and recalls, is very hard for a small shop to copy.','Imani ndiyo ngome. Chapa ambayo familia zinajua inauza <b>bidhaa zilizosajiliwa pekee</b>, ikiwa na kumbukumbu na urejeshaji, ni ngumu sana kwa duka dogo kuiga.'],
  today:[['Loose tablets with no box, leaflet or readable expiry','No way for a customer to check what is genuine','No receipt or record if something goes wrong'],['Vidonge bila boksi, karatasi ya maelezo au tarehe inayosomeka','Mteja hana njia ya kuhakiki kilicho halisi','Hakuna risiti wala kumbukumbu kitu kikiharibika']],
  afya:[['TMDA-registered products only, from licensed suppliers','Batch and expiry tracked in one system','Every receipt saved; recalls reach customers by SMS'],['Bidhaa zilizosajiliwa na TMDA pekee, kutoka kwa wasambazaji wenye leseni','Namba ya toleo na tarehe ya kuisha zinafuatiliwa kwenye mfumo mmoja','Kila risiti inahifadhiwa; urejeshaji unawafikia wateja kwa SMS']]},
 {why:['Planning is the business model. <b>A monthly Afya Box turns an unplanned emergency into predictable, recurring revenue</b>, which is what makes the store bankable.','Kupanga ndiyo mtindo wa biashara. <b>Afya Box ya kila mwezi hugeuza dharura isiyopangwa kuwa mapato yanayotabirika na yanayojirudia</b>, ndiyo yanayofanya duka liaminike na benki.'],
  today:[['Needs are noticed only when they run out','Hidden conditions stay undiagnosed until a crisis','Emergency buying at any price, from any open shop'],['Mahitaji hugunduliwa tu yanapokwisha','Magonjwa yaliyojificha hayagunduliwi hadi dharura','Ununuzi wa dharura kwa bei yoyote, duka lolote lililo wazi']],
  afya:[['A free 50-second Afya Check at the door finds hidden needs','The Afya Box arrives on a fixed day every month','A reminder 12 days before month end to keep or swap brands'],['Afya Check ya bure ya sekunde 50 mlangoni hugundua mahitaji yaliyojificha','Afya Box inafika siku maalum kila mwezi','Ukumbusho siku 12 kabla ya mwisho wa mwezi wa kubaki au kubadilisha chapa']]},
 {why:['The diaspora is a paying customer who is <b>not in Tanzania</b>. Letting them buy care, not just send cash, opens a market no local shop can serve.','Diaspora ni mteja anayelipa ambaye <b>hayupo Tanzania</b>. Kuwawezesha kununua huduma, si kutuma pesa tu, kunafungua soko ambalo hakuna duka la ndani linaweza kulihudumia.'],
  today:[['Money is sent, but nobody can see what it buys','Older parents travel alone to buy and carry medicines','Missed doses are discovered only after a crisis'],['Pesa inatumwa, lakini hakuna anayeona inanunua nini','Wazazi wazee husafiri peke yao kununua na kubeba dawa','Dozi zinazokosekana hugundulika tu baada ya dharura']],
  afya:[['The family abroad chooses and pays for the box by card','Delivery to the door with a photo confirmation','Pill reminders and a monthly report to the family, with consent'],['Familia iliyo nje huchagua na kulipia box kwa kadi','Kufikishwa mlangoni na picha ya uthibitisho','Ukumbusho wa dawa na ripoti ya kila mwezi kwa familia, kwa ridhaa']]}];
function storyHTML(c){const mv=m=>[m[0],m[1]+' h',tz(m[2]),m[3],m[4],m[5]];
 return `<div class="p11-story" id="p11story"><div class="p11-stage">${STORY.map((s,i)=>`<div class="bgi${i?'':' on'}" data-i="${i}">${IMG11(s.img,'Concept image: '+s.h[0],s.pos).replace('loading="lazy"',i<3?'loading="eager"':'loading="lazy"')}</div>`).join('')}
  <span class="p11-cap2">${L1('Concept images · an illustrative household','Picha za dhana · familia ya mfano')}</span>
  <div class="p11-meter" aria-live="polite"><h5>${L1('This month so far','Mwezi huu hadi sasa')}</h5><dl>${MLAB.map((l,k)=>`<dt>${L1(l[0],l[1])}</dt><dd id="p11m${k}">${mv(STORY[0].m)[k]}</dd>`).join('')}</dl></div>
  <div class="p11-prog"><i id="p11prog"></i></div><nav class="p11-days2" aria-label="Jump to a moment">${STORY.map((x,i)=>`<button type="button" data-go="${i}" class="${i?'':'on'}"><b>${String(i+1).padStart(2,'0')}</b><span>${L1(x.when[0].split(' · ')[0],x.when[1].split(' · ')[0])}</span></button>`).join('')}</nav></div>
  <div class="p11-steps">${STORY.map((s,i)=>`<section class="p11-step${i?'':' on'}" data-i="${i}"><div class="p11-card"><div class="p11-mimg">${IMG11(s.img,'',s.pos).replace('loading="lazy"',i<2?'loading="eager"':'loading="lazy"')}</div><div class="p11-mm">${MLAB.slice(0,3).map((l,k)=>`<span>${L1(l[0],l[1])} <b>${mv(s.m)[k]}</b></span>`).join('')}</div><div class="p11-when"><i></i>${L1(s.when[0],s.when[1])}</div><h3>${L1(s.h[0],s.h[1])}</h3><p>${L1(s.p[0],s.p[1])}</p>${s.why?`<div class="why">${L1(s.why[0],s.why[1])}</div>`:''}${AF11[i]?`<div class="afy">${L1(AF11[i][0],AF11[i][1])}</div>`:''}${s.final?`<div class="p11-final"><div><b>${s.m[1]} h</b><span>${L1('lost: more than one working day','zimepotea: zaidi ya siku moja ya kazi')}</span></div><div><b>${tz(s.m[2])}</b><span>${L1('in fares that bought no health','za nauli zisizonunua afya')}</span></div><div><b>${s.m[5]}</b><span>${L1('days a grandmother went without her tablets','siku bibi alikaa bila vidonge vyake')}</span></div></div><a class="p11-go" href="#p11vs" data-jump="p11vs">${L1('Now replay the same month with Afya Basics →','Sasa rudia mwezi huohuo ukiwa na Afya Basics →')}</a>`:''}</div></section>`).join('')}</div></div>`}
function vsHTML(){const T=STORY[STORY.length-1].m,fee=M().inputs.online.delivery_fee;
 const rows=[[['Shops visited','Maduka yaliyotembelewa'],T[0],0,['One optional visit for a free Afya Check; everything else comes in the box.','Ziara moja ya hiari kwa Afya Check ya bure; mengine yote yanakuja kwenye box.']],
  [['Hours lost','Masaa yaliyopotea'],T[1],0.17,['About 10 minutes a month to check the reminder and keep or swap brands.','Takriban dakika 10 kwa mwezi kuangalia ukumbusho na kubaki au kubadilisha chapa.']],
  [['Fares paid (TSh)','Nauli zilizolipwa (TSh)'],T[2],0,[`Packing and delivery are inside the box price; an extra online order costs ${tz(fee)}.`,`Kupakia na kufikisha viko ndani ya bei ya box; oda ya ziada mtandaoni ni ${tz(fee)}.`]],
  [['Items still missing','Bidhaa ambazo bado hazijapatikana'],T[3],0,['Six Care Zones and stock planned from members’ boxes, so the list is complete.','Kanda sita za Huduma na bidhaa zinazopangwa kutokana na box za wanachama, hivyo orodha inakamilika.']],
  [['Unverified products','Bidhaa zisizothibitishwa'],T[4],0,['Only TMDA-registered products, with batch and expiry on the receipt.','Bidhaa zilizosajiliwa na TMDA pekee, na namba ya toleo na tarehe ya kuisha kwenye risiti.']],
  [['Days without BP tablets','Siku bila vidonge vya shinikizo'],T[5],0,['Bibi’s box is paid from abroad and delivered before the month ends, with pill reminders.','Box ya Bibi inalipiwa kutoka nje na kufikishwa kabla mwezi haujaisha, na ukumbusho wa dawa.']]];
 return `<div class="p11-vsx" id="p11vs"><div class="p11-vshead"><div></div><div class="a">${L1('Today','Leo')}</div><div class="b">${L1('With Afya Basics','Ukiwa na Afya Basics')}</div></div>
 ${rows.map((r,i)=>{const mx=Math.max(r[1],r[2],0.0001);const fm=v=>i===2?nf(v):i===1?(v<1?Math.round(v*60)+' min':v+' h'):v;return `<div class="p11-vsr"><div class="l"><b>${L1(r[0][0],r[0][1])}</b><span>${L1(r[3][0],r[3][1])}</span></div><div class="a"><i style="--w:${r[1]/mx*100}%"></i><em>${fm(r[1])}</em></div><div class="b"><i style="--w:${Math.max(3,r[2]/mx*100)}%"></i><em>${fm(r[2])}</em></div></div>`}).join('')}
 <p class="p11-note">${L1('Same household, same month, same needs. The Afya Basics column is what the service is designed to deliver; it is a plan, measured from opening day by the indicators in the map below. The Afya Box itself has a price; section 6.2 compares that price, item by item, with buying the same things separately.','Familia ileile, mwezi uleule, mahitaji yaleyale. Safu ya Afya Basics ni kile huduma imeundwa kutoa; ni mpango, utakaopimwa tangu siku ya kufungua kwa viashiria vilivyo kwenye ramani hapa chini. Afya Box yenyewe ina bei; sehemu 6.2 inalinganisha bei hiyo, bidhaa kwa bidhaa, na kununua vitu hivyo kimoja kimoja.')}</p></div>`}
function mapHTML(c){return `<div class="p11-mapwrap" id="p11map"><div><div class="p11-map"><svg viewBox="0 0 820 640" role="img" aria-label="Stylised map of Dar es Salaam districts with the five pains marked">
  <defs><linearGradient id="p11sea" x1="0" x2="1"><stop offset="0" stop-color="#0b3a44" stop-opacity=".35"/><stop offset="1" stop-color="#062a33" stop-opacity=".9"/></linearGradient></defs>
  <path class="sea" d="M560 12 L820 0 L820 640 L700 610 L760 520 L730 420 L640 332 L592 346 L560 336 L606 300 L600 240 L592 172 L632 178 L648 138 L585 92 Z"/><path class="sea" d="M560 336 L592 346 L574 420 L556 470 L546 362 Z"/><text x="600" y="128" class="dp" opacity=".75">MSASANI</text><text x="566" y="404" class="dp" opacity=".75" transform="rotate(-70 566 404)">HARBOUR</text>
  <text x="770" y="250" class="dp" text-anchor="end" opacity=".7">INDIAN OCEAN</text>
  ${DIST.map(d=>`<path class="dist" data-d="${d[0]}" d="${d[2]}"/><text class="dl" x="${d[3]}" y="${d[4]}" text-anchor="middle">${d[0]}</text><text class="dp" x="${d[3]}" y="${d[4]+16}" text-anchor="middle">${d[1]}</text>`).join('')}
  <path class="road" d="M55 235 C180 245 300 262 420 285 S540 305 560 318"/><text class="rl" x="150" y="232">MOROGORO RD</text><path class="road" d="M390 30 C420 120 470 210 545 300"/><text class="rl" x="398" y="70" transform="rotate(62 398 70)">BAGAMOYO RD</text><path class="road" d="M548 322 C480 350 400 380 320 400"/><text class="rl" x="360" y="378" transform="rotate(-17 360 378)">NYERERE RD</text><path class="road" d="M545 340 C500 420 470 500 430 600"/><text class="rl" x="470" y="520" transform="rotate(-68 470 520)">KILWA RD</text><circle cx="555" cy="322" r="5" fill="#f2c96b"/><text class="dp" x="562" y="316">CITY CENTRE</text><path d="M300 400 l12 -6 l-3 6 l3 6 z" fill="#f2c96b" opacity=".8"/><text class="dp" x="282" y="420">AIRPORT</text><path class="road" style="stroke:rgba(217,181,110,.5)" d="M566 350 L612 350"/><text class="dp" x="600" y="368" opacity=".8">FERRY</text>
  <path class="p11-plane" d="M810 30 C760 200 720 380 650 520"/><text x="805" y="24" class="dp" text-anchor="end" fill="#c9b8ff">FROM ABROAD ✈</text>
  ${PINS.map(p=>`<g class="p11-pin${p.k?'':' on'}" data-k="${p.k}" tabindex="0" role="button" aria-label="Pain ${p.k+1}: ${esc(PAIN[p.k].k[0])}"><circle class="ring" cx="${p.x}" cy="${p.y}" r="14"/><circle class="dot" cx="${p.x}" cy="${p.y}" r="15"/><text x="${p.x}" y="${p.y+4.5}" text-anchor="middle">${p.k+1}</text></g>`).join('')}
 </svg><span class="p11-legend">${L1('Stylised map · not to scale · district populations, 2022 census','Ramani ya mfano · si kwa vipimo · idadi ya watu wilayani, sensa 2022')} ${c('citypop')}</span></div>
 <div class="p11-tabs" role="group" aria-label="Choose a pain">${PAIN.map((x,i)=>`<button type="button" data-k="${i}" aria-pressed="${i===0}"><b>${i+1}</b>${L1(x.k[0].split(' · ')[1],x.k[1].split(' · ')[1])}</button>`).join('')}</div></div>
 <div id="p11det"></div></div>`}
const EX11=[{'ig': 'scatter', 'who': ['Mothers buying for babies and people with a long-term condition, because their list crosses four categories: medicine, baby care, devices and home care.', 'Mama wanaonunulia watoto na watu wenye magonjwa ya muda mrefu, kwa sababu orodha yao inavuka makundi manne: dawa, huduma ya mtoto, vifaa na bidhaa za nyumbani.'], 'size': ['About 11,356 drug shops but only 1,334 pharmacies nationally: the typical outlet is small and narrow.', 'Takriban maduka ya dawa 11,356 lakini famasi 1,334 tu nchini: duka la kawaida ni dogo lenye bidhaa chache.'], 'kpi': ['Average items per basket, and the share of baskets that mix three or more categories.', 'Wastani wa bidhaa kwa kikapu, na sehemu ya vikapu vinavyochanganya makundi matatu au zaidi.']}, {'ig': 'slow', 'who': ['People who work for themselves, at a stall, salon or garage, and parents carrying small children through traffic.', 'Watu wanaojiajiri, kibandani, saluni au gereji, na wazazi wanaobeba watoto wadogo kwenye msongamano.'], 'size': ['5.38 million people in Dar es Salaam, growing about 2.1% a year, with the same small counters.', 'Watu milioni 5.38 jijini Dar es Salaam, wakiongezeka takriban asilimia 2.1 kwa mwaka, na kaunta zilezile ndogo.'], 'kpi': ['Checkout under 30 seconds, a full visit under 3 minutes, and the share of orders placed online or on WhatsApp.', 'Malipo chini ya sekunde 30, ziara kamili chini ya dakika 3, na sehemu ya oda zinazowekwa mtandaoni au WhatsApp.']}, {'ig': 'trust', 'who': ['Anyone on medicine for life, such as blood pressure, diabetes or epilepsy, where a weak or fake product fails silently.', 'Yeyote anayetumia dawa maisha yote, kama shinikizo la damu, kisukari au kifafa, ambapo bidhaa dhaifu au bandia hushindwa kimya kimya.'], 'size': ['WHO estimates about 1 in 10 medical products in low- and middle-income countries is substandard or falsified.', 'WHO inakadiria takriban bidhaa 1 kati ya 10 za tiba katika nchi za kipato cha chini na kati hazikidhi viwango au ni bandia.'], 'kpi': ['100% TMDA-registered products, every recall traced within 24 hours, and complaints per 1,000 orders.', 'Asilimia 100 ya bidhaa zilizosajiliwa na TMDA, kila urejeshaji ukifuatiliwa ndani ya saa 24, na malalamiko kwa kila oda 1,000.']}, {'ig': 'plan', 'who': ['People with blood pressure or diabetes, many of whom do not know it yet, and parents of children under five.', 'Watu wenye shinikizo la damu au kisukari, wengi wao bado hawajui, na wazazi wa watoto chini ya miaka mitano.'], 'size': ['23.1% of adults have raised blood pressure, and 72.4% of people with diabetes found in the 2023 survey were undiagnosed.', 'Asilimia 23.1 ya watu wazima wana shinikizo la damu la juu, na asilimia 72.4 ya wenye kisukari waliogundulika katika utafiti wa 2023 hawakuwa wamegundulika.'], 'kpi': null}, {'ig': 'far', 'who': ['Older people living alone, and their children working abroad or in another city who pay for their care.', 'Wazee wanaoishi peke yao, na watoto wao wanaofanya kazi nje au mji mwingine wanaolipia huduma yao.'], 'size': ['TSh 3.31 trillion sent home by Tanzanians abroad in 2024/25; 3.49 million Tanzanians are aged 60 or over.', 'TSh trilioni 3.31 zilitumwa nyumbani na Watanzania walio nje 2024/25; Watanzania milioni 3.49 wana miaka 60 au zaidi.'], 'kpi': ['Boxes paid from abroad, photo confirmations delivered, and on-time delivery rate.', 'Box zinazolipiwa kutoka nje, picha za uthibitisho zilizotumwa, na kiwango cha kufikisha kwa wakati.']}];
const IG11={
 scatter:`<svg viewBox="0 0 300 120" class="ig"><g class="shops">${[30,90,150,210,270].map((x,i)=>`<g transform="translate(${x-14} ${i%2?62:30})"><rect width="28" height="22" rx="3"/><path d="M-3 0 L14 -10 L31 0"/></g>`).join('')}</g><path class="route" d="M30 52 L90 84 L150 52 L210 84 L270 52"/><text x="150" y="114" text-anchor="middle">5 shops · 1 month of needs</text></svg>`,
 slow:`<svg viewBox="0 0 300 120" class="ig">${Array.from({length:9},(_,i)=>`<circle class="q" cx="${40+i*24}" cy="62" r="8" style="animation-delay:${i*.25}s"/>`).join('')}<rect x="250" y="40" width="30" height="44" rx="4" class="ctr"/><g transform="translate(150 22)"><circle r="14" class="clk"/><line class="hand" x1="0" y1="0" x2="0" y2="-10"/></g><text x="150" y="112" text-anchor="middle">one counter · advice + payment</text></svg>`,
 trust:`<svg viewBox="0 0 300 120" class="ig"><rect x="70" y="28" width="160" height="56" rx="10" class="strip"/>${[95,135,175,215].map(x=>`<circle cx="${x-10}" cy="56" r="11" class="pill"/>`).join('')}<rect x="70" y="26" width="6" height="60" class="scan"/><text x="150" y="20" text-anchor="middle" class="qm">?</text><text x="150" y="112" text-anchor="middle">no box · no leaflet · no expiry</text></svg>`,
 plan:`<svg viewBox="0 0 300 120" class="ig">${Array.from({length:30},(_,i)=>`<rect x="${30+(i%10)*24}" y="${16+Math.floor(i/10)*26}" width="20" height="20" rx="4" class="day${i>=26?' out':''}" style="animation-delay:${i*.06}s"/>`).join('')}<text x="150" y="112" text-anchor="middle">runs out with no warning · day 27</text></svg>`,
 far:`<svg viewBox="0 0 300 120" class="ig"><path class="arc" d="M30 90 C90 0 210 0 262 72"/><text x="22" y="104" class="em">✈</text><g transform="translate(250 66)"><rect width="28" height="24" rx="3" class="hs"/><path d="M-4 0 L14 -12 L32 0" class="hs"/></g><circle class="coin" cx="30" cy="90" r="6"/><text x="150" y="112" text-anchor="middle">money arrives · care unseen</text></svg>`};
function detHTML(k,c){const x=PAIN[k],y=MAPX[k];
 return `<article class="p11-detail"><div class="ph">${IMG11(x.img,x.alt,x.pos)}<span class="p11-cap">${L1('Concept image','Picha ya dhana')}</span><div class="igw">${IG11[EX11[k].ig]}</div><div class="t"><small>${L1(x.k[0],x.k[1])} · ${PINS[k].d}</small><h3>${L1(x.h[0],x.h[1])}</h3></div></div>
 <div class="bd"><p>${L1(x.p[0],x.p[1])}</p>
  <div class="p11-vs"><div><h5>${L1('Today','Leo')}</h5><ul>${y.today[0].map((t,i)=>`<li>${L1(t,y.today[1][i])}</li>`).join('')}</ul></div><div><h5>${L1('With Afya Basics','Ukiwa na Afya Basics')}</h5><ul>${y.afya[0].map((t,i)=>`<li>${L1(t,y.afya[1][i])}</li>`).join('')}</ul></div></div>
  <div class="p11-dfact"><b>${L1(x.fact[0],x.fact[1])}</b><div><span>${L1(x.factL[0],x.factL[1])} ${c(x.src)}</span><br>${confTag(x.conf)}</div></div>
  <dl class="p11-ex"><div><dt>${L1('Who it hits hardest','Linawaumiza zaidi')}</dt><dd>${L1(EX11[k].who[0],EX11[k].who[1])}</dd></div><div><dt>${L1('How big it is','Ukubwa wake')}</dt><dd>${L1(EX11[k].size[0],EX11[k].size[1])}</dd></div><div><dt>${L1('How we will prove we fixed it','Tutathibitishaje tumelitatua')}</dt><dd>${EX11[k].kpi?L1(EX11[k].kpi[0],EX11[k].kpi[1]):L1(`Free checks per day (${nf(M().inputs.check.checks_day_m12)} a day by month 12), ${Math.round(M().inputs.check.check_to_purchase*100)}% of checks leading to a purchase, and monthly box churn below ${Math.round(M().inputs.members.monthly_churn*100)}% (master model).`,`Vipimo vya bure kwa siku (${nf(M().inputs.check.checks_day_m12)} kwa siku ifikapo mwezi 12), asilimia ${Math.round(M().inputs.check.check_to_purchase*100)} ya vipimo vikileta ununuzi, na wanaoacha box kwa mwezi chini ya asilimia ${Math.round(M().inputs.members.monthly_churn*100)} (modeli kuu).`)}</dd></div></dl>
  <p class="p11-why2">${L1(y.why[0],y.why[1])}</p></div></article>`}
function initStory11(){const st=document.getElementById('p11story');if(!st)return;const steps=[...st.querySelectorAll('.p11-step')],bgs=[...st.querySelectorAll('.bgi')],prog=document.getElementById('p11prog');let cur=-1;
 const mv=m=>[m[0],m[1]+' h',tz(m[2]),m[3],m[4],m[5]];
 const show=i=>{if(i===cur)return;const prev=cur<0?STORY[0].m:STORY[cur].m;cur=i;bgs.forEach(b=>b.classList.toggle('on',+b.dataset.i===i));steps.forEach(s=>s.classList.toggle('on',+s.dataset.i===i));st.querySelectorAll('.p11-days2 button').forEach(b=>b.classList.toggle('on',+b.dataset.go===i));
  const v=mv(STORY[i].m);v.forEach((t,k)=>{const d=document.getElementById('p11m'+k);if(!d)return;if(d.textContent!==String(t)){d.textContent=t;if(STORY[i].m[k]>prev[k]){d.classList.add('bump');setTimeout(()=>d.classList.remove('bump'),900)}}});
  if(prog)prog.style.width=((i+1)/STORY.length*100)+'%'};
 if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)show(+e.target.dataset.i)})},{rootMargin:'-45% 0px -45% 0px'});steps.forEach(s=>io.observe(s));onLeave(()=>io.disconnect())}else show(0);
 st.querySelectorAll('.p11-days2 button').forEach(b=>b.onclick=()=>{const t=steps[+b.dataset.go];if(t)t.scrollIntoView({behavior:'smooth',block:'center'})});st.querySelectorAll('[data-jump]').forEach(a=>a.onclick=e=>{e.preventDefault();const t=document.getElementById(a.dataset.jump);if(t)t.scrollIntoView({behavior:'smooth',block:'start'})})}
function initVs11(){const v=document.getElementById('p11vs');if(!v)return;if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){v.classList.add('in');io.disconnect()}}),{threshold:.3});io.observe(v);onLeave(()=>io.disconnect())}else v.classList.add('in')}
function initMap11(){const det=document.getElementById('p11det');if(!det)return;const c=window.__p1c11;
 const pick=k=>{det.innerHTML=detHTML(k,c);document.querySelectorAll('.p11-pin').forEach(p=>p.classList.toggle('on',+p.dataset.k===k));document.querySelectorAll('.p11-tabs button').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.k===k));
  document.querySelectorAll('.p11-map .dist').forEach(d=>d.classList.toggle('hl',d.dataset.d===PINS[k].d))};
 document.querySelectorAll('.p11-pin').forEach(p=>{p.onclick=()=>pick(+p.dataset.k);p.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pick(+p.dataset.k)}}});
 document.querySelectorAll('.p11-tabs button').forEach(b=>b.onclick=()=>pick(+b.dataset.k));pick(0)}
const J11=[
 {t:'06:30',img:'asubuhi',pl:['Mbezi Beach · home','Mbezi Beach · nyumbani'],h:['The list at the door','Orodha mlangoni'],p:['Juma, an accountant in the city centre, ties his tie in a hurry. Neema, holding seven-month-old Amani, gives him the list: size-four nappies, baby wipes, the baby’s fever medicine and her own iron tablets. Four things, all needed this week.','Juma, mhasibu katikati ya jiji, anafunga tai kwa haraka. Neema, akiwa amembeba Amani wa miezi saba, anampa orodha: nepi saizi ya nne, wipes, dawa ya homa ya mtoto na vidonge vyake vya madini ya chuma. Vitu vinne, vyote vinahitajika wiki hii.'],k:{need:4}},
 {t:'07:30',img:'foleni',pl:['Bagamoyo Road','Barabara ya Bagamoyo'],h:['The list goes into a phone','Orodha inaingia kwenye simu'],p:['The traffic does not move. He types the list into his phone. Then his manager calls: the first meeting has moved to 08:00. The list is the last thing on his mind.','Foleni haisogei. Anaandika orodha kwenye simu. Kisha meneja anapiga simu: mkutano wa kwanza umesogezwa saa mbili. Orodha inakuwa jambo la mwisho akilini.'],k:{}},
 {t:'08:00',img:'ofisi',pl:['Posta · the office','Posta · ofisini'],h:['A day that never stops','Siku isiyosimama'],p:['Meetings, reports, emails. The pharmacies near the office close before he does; none of them knows what his family uses or when it runs out.','Mikutano, ripoti, barua pepe. Maduka ya dawa karibu na ofisi yanafunga kabla yeye hajamaliza; hakuna linalojua familia yake inatumia nini au lini kinaisha.'],k:{}},
 {t:'17:02',img:'simu',pl:['A message from home','Ujumbe kutoka nyumbani'],h:['“Amani is a little warm”','“Amani ana joto kidogo”'],p:['Neema writes that the baby has a slight fever. The fever medicine on the list is now urgent, and the clock has started.','Neema anaandika kwamba mtoto ana homa kidogo. Dawa ya homa kwenye orodha sasa ni ya dharura, na saa imeanza kuhesabu.'],k:{}},
 {t:'19:00',img:'mvua',pl:['Rain on the main road','Mvua barabarani'],h:['An hour for a few kilometres','Saa nzima kwa kilomita chache'],p:['He leaves at seven. It rains, the road locks, and an hour passes for a few kilometres. Every shop he could have used is closing behind the traffic.','Anatoka saa moja. Mvua inanyesha, barabara inasimama, na saa nzima inapita kwa kilomita chache. Kila duka ambalo angeweza kutumia linafunga nyuma ya foleni.'],k:{hrs:1}},
 {t:'21:00',img:'duka1',pl:['Shop one','Duka la kwanza'],h:['Closed','Limefungwa'],p:['The nearest pharmacy has pulled its shutter down. No opening hours on the door, no number to call, no way to order for tomorrow.','Duka la dawa la karibu limeshusha mlango wake. Hakuna saa za kufungua mlangoni, hakuna namba ya kupiga, hakuna njia ya kuagiza kwa kesho.'],k:{shops:1,hrs:2}},
 {t:'21:25',img:'duka2',pl:['Shop two','Duka la pili'],h:['Wrong size, no wipes','Saizi si sahihi, hakuna wipes'],p:['A small shop has nappies, but only size three. He buys them anyway, and the iron tablets. The wipes are sold out.','Duka dogo lina nepi, lakini saizi ya tatu tu. Anazinunua hivyo hivyo, pamoja na vidonge vya madini ya chuma. Wipes zimekwisha.'],k:{shops:2,found:2}},
 {t:'21:50',img:'duka3',pl:['Shop three','Duka la tatu'],h:['No box, no date','Bila boksi, bila tarehe'],p:['The third offers fever syrup in a loose bottle with no box and no expiry date. He hesitates and walks away: he has no way to know if it is genuine.','La tatu linampa dawa ya homa kwenye chupa bila boksi wala tarehe ya mwisho. Anasita na kuondoka: hana njia ya kujua kama ni halisi.'],k:{shops:3,unv:1}},
 {t:'22:40',img:'mlango',pl:['Home','Nyumbani'],h:['Two of four, one the wrong size','Viwili kati ya vinne, kimoja saizi isiyo sahihi'],p:['He gets home with one thin bag. No wipes, no fever medicine, and nappies that will not fit for long. Three hours and forty minutes after leaving the office.','Anafika nyumbani na mfuko mmoja mwembamba. Hakuna wipes, hakuna dawa ya homa, na nepi zisizomtosha kwa muda mrefu. Saa tatu na dakika arobaini tangu atoke ofisini.'],k:{hrs:3.67}},
 {t:'23:30',img:'usiku',pl:['The night search','Msako wa usiku'],h:['Searching for anything open','Kutafuta duka lolote lililo wazi'],p:['Amani cries with fever. Neema soothes him. Juma sits in the dark searching his phone for a shop still open. Nothing nearby answers.','Amani analia kwa homa. Neema anambembeleza. Juma anakaa gizani akitafuta kwenye simu duka lililo wazi. Hakuna la karibu linalojibu.'],k:{}}];
const J11T=[[['Home at','Kufika nyumbani'],['22:40','22:40'],['19:00','19:00']],[['Items on the list','Vitu vya orodha'],['2 of 4, one the wrong size','2 kati ya 4, kimoja saizi isiyo sahihi'],['All, on a fixed day','Vyote, kwa tarehe maalum']],[['Shops tried','Maduka aliyojaribu'],['3','3'],['0','0']],[['Fever medicine','Dawa ya homa'],['None that night','Hakuna usiku huo'],['Registered, same day on WhatsApp','Iliyosajiliwa, siku hiyohiyo kwa WhatsApp']],[['His own blood pressure','Shinikizo lake la damu'],['Never checked','Hajawahi kupima'],['Free Afya Check: 142/92, see a doctor','Afya Check ya bure: 142/92, mwone daktari']]];
function j11HTML(){const P=x=>L1(x[0],x[1]);return `<div class="p11j" id="p11j">
 <div class="p11j-st"><div class="p11j-img">${J11.map((s,i)=>`<img src="img/j-${s.img}.webp" alt="" loading="${i<2?'eager':'lazy'}" class="${i?'':'on'}" data-i="${i}">`).join('')}<span class="p11-cap">${L1('Concept image · fictional family','Picha ya dhana · familia ya kubuni')}</span><div class="p11j-clock"><b id="j11t">06:30</b><span id="j11p"></span></div></div>
 <div class="p11j-tx"><span class="p11-k" id="j11k"></span><h3 id="j11h"></h3><p id="j11d"></p>
  <div class="p11j-tally"><div><small>${L1('Items found','Vitu alivyopata')}</small><b id="j11f">0 / 4</b></div><div><small>${L1('Shops tried','Maduka')}</small><b id="j11s">0</b></div><div><small>${L1('Hours after work','Masaa baada ya kazi')}</small><b id="j11h2">0:00</b></div><div><small>${L1('Unverified medicine offered','Dawa isiyothibitishwa')}</small><b id="j11u">0</b></div></div>
  <div class="p11j-ctl"><button type="button" id="j11pv" aria-label="Previous">←</button><button type="button" id="j11pl" aria-label="Play">▶</button><button type="button" id="j11nx" aria-label="Next">→</button><span id="j11c"></span></div></div></div>
 <div class="p11j-rail" role="tablist" aria-label="${'Juma’s day'}">${J11.map((s,i)=>`<button type="button" role="tab" data-i="${i}" class="${i?'':'on'}"><b>${s.t}</b><span>${P(s.h)}</span></button>`).join('')}</div>
 <div class="p11j-cmp"><div class="hd"><span></span><span class="a">${L1('That evening, today','Jioni hiyo, leo')}</span><span class="b">${L1('The same evening, with Afya Basics','Jioni hiyohiyo, na Afya Basics')}</span></div>${J11T.map(r=>`<div class="rw"><span>${P(r[0])}</span><span class="a">${P(r[1])}</span><span class="b">${P(r[2])}</span></div>`).join('')}</div>
 <div class="plain" style="margin-top:22px"><span class="modno" style="margin:0 0 12px">${L1('What Juma’s evening tells us','Jioni ya Juma inatufundisha nini')}</span><ol>
  <li>${L1('<b>The busy middle-class father has money but no time.</b> Juma can afford every item on the list. What he cannot buy is an open shop at 21:00 that has the right size and products he can trust.','<b>Baba wa kipato cha kati ana pesa lakini hana muda.</b> Juma anaweza kumudu kila kitu kwenye orodha. Asichoweza kununua ni duka lililo wazi saa tatu usiku lenye saizi sahihi na bidhaa za kuaminika.')}</li>
  <li>${L1('<b>The real cost is the evening, not the price.</b> Three shops, three hours and forty minutes, two of four items, a sick baby without medicine. Families like his pay this month after month.','<b>Gharama halisi ni jioni, si bei.</b> Maduka matatu, saa tatu na dakika arobaini, vitu viwili kati ya vinne, mtoto mgonjwa bila dawa. Familia kama yake inalipa hivi mwezi baada ya mwezi.')}</li>
  <li>${L1('<b>He is also a hidden patient.</b> Stress, long days and no time for checks: the free Afya Check at the door is how the store finds the raised blood pressure he never measured.','<b>Yeye pia ni mgonjwa aliyejificha.</b> Msongo, siku ndefu na kukosa muda wa kupima: Afya Check ya bure mlangoni ndiyo inagundua shinikizo la damu ambalo hakuwahi kupima.')}</li>
  <li>${L1('<b>What fixes it is planning, not another shop.</b> A monthly box that arrives on a fixed day, a reminder to change sizes, and same-day WhatsApp orders for emergencies remove every step of this evening.','<b>Kinachotatua ni mpango, si duka jingine.</b> Box ya kila mwezi inayofika tarehe maalum, ukumbusho wa kubadilisha saizi, na oda za WhatsApp za siku hiyohiyo kwa dharura zinaondoa kila hatua ya jioni hii.')}</li></ol></div>
 <p class="p11-note">${L1('Illustrative household with fictional people, built from typical Dar es Salaam conditions; not a real customer. The 142/92 reading is an example. Watch the full story in Kiswahili in the video library (0.1).','Familia ya mfano yenye watu wa kubuni, kutokana na hali za kawaida za Dar es Salaam; si mteja halisi. Kipimo 142/92 ni mfano. Tazama hadithi kamili kwa Kiswahili kwenye maktaba ya video (0.1).')}</p></div>`}
function initJ11(){const R=document.getElementById('p11j');if(!R)return;const g=id=>document.getElementById(id);let cur=0,tm=null;const imgs=[...R.querySelectorAll('.p11j-img img')],tabs=[...R.querySelectorAll('.p11j-rail button')];
 const sw=()=>document.documentElement.classList.contains('p0-swon')?1:0;
 const fmt=h=>Math.floor(h)+':'+String(Math.round((h%1)*60)).padStart(2,'0');
 const show=i=>{cur=(i+J11.length)%J11.length;const s=J11[cur],l=sw();imgs.forEach((im,k)=>im.classList.toggle('on',k===cur));tabs.forEach((b,k)=>{b.classList.toggle('on',k===cur);b.classList.toggle('done',k<cur)});
  g('j11t').textContent=s.t;g('j11p').textContent=s.pl[l];g('j11k').textContent=(l?'Hatua ':'Step ')+(cur+1)+' / '+J11.length;g('j11h').textContent=s.h[l];g('j11d').textContent=s.p[l];
  let f=0,sh=0,hr=0,u=0;J11.slice(0,cur+1).forEach(x=>{if(x.k.found!=null)f=x.k.found;if(x.k.shops!=null)sh=x.k.shops;if(x.k.hrs!=null)hr=x.k.hrs;if(x.k.unv)u=x.k.unv});
  g('j11f').textContent=f+' / 4';g('j11s').textContent=sh;g('j11h2').textContent=fmt(hr);g('j11u').textContent=u;g('j11c').textContent=s.t;
  const tx=R.querySelector('.p11j-tx');tx.classList.remove('sw');void tx.offsetWidth;tx.classList.add('sw');
  const rail=R.querySelector('.p11j-rail');const b=tabs[cur];if(rail.scrollWidth>rail.clientWidth)rail.scrollTo({left:b.offsetLeft-rail.clientWidth/2+b.clientWidth/2,behavior:'smooth'})};
 const stop=()=>{clearInterval(tm);tm=null;g('j11pl').textContent='▶';g('j11pl').setAttribute('aria-label','Play')};
 g('j11pv').onclick=()=>{stop();show(cur-1)};g('j11nx').onclick=()=>{stop();show(cur+1)};
 g('j11pl').onclick=()=>{if(tm){stop();return}g('j11pl').textContent='❚❚';g('j11pl').setAttribute('aria-label','Pause');tm=setInterval(()=>{if(cur>=J11.length-1){stop();return}show(cur+1)},6500)};
 tabs.forEach(b=>b.onclick=()=>{stop();show(+b.dataset.i)});
 const mo=new MutationObserver(()=>show(cur));mo.observe(document.documentElement,{attributes:true,attributeFilter:['class']});
 if(typeof onLeave==='function')onLeave(()=>{stop();mo.disconnect()});show(0)}
const CSS11J=`
.p11j-st{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);gap:0;border-radius:22px;overflow:hidden;border:1px solid rgba(255,255,255,.1);background:#08110d;margin-top:20px}
.p11j-img{position:relative;aspect-ratio:16/9;overflow:hidden;background:#000}
.p11j-img img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transform:scale(1.06);transition:opacity .9s ease,transform 7s ease}
.p11j-img img.on{opacity:1;transform:scale(1)}
.p11j-clock{position:absolute;left:18px;top:16px;display:flex;align-items:baseline;gap:12px;padding:8px 14px;border-radius:14px;background:rgba(2,8,6,.7);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.14)}
.p11j-clock b{font:500 1.9rem var(--f-hud,monospace);letter-spacing:-.02em}.p11j-clock span{font:600 .66rem var(--f-hud,monospace);letter-spacing:.18em;text-transform:uppercase;color:rgba(244,251,247,.7)}
.p11j-tx{padding:24px 24px 18px;display:flex;flex-direction:column;gap:10px}
.p11j-tx h3{margin:0;font:700 1.45rem/1.15 var(--f-display,inherit);letter-spacing:-.02em}.p11j-tx p{margin:0;line-height:1.65;color:rgba(244,251,247,.85)}
.p11j-tx.sw h3,.p11j-tx.sw p{animation:p11jin .5s ease both}@keyframes p11jin{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.p11j-tally{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:6px}
.p11j-tally div{padding:10px 12px;border-radius:12px;background:rgba(255,155,135,.07);border:1px solid rgba(255,155,135,.22)}
.p11j-tally small{display:block;font:600 .62rem var(--f-hud,monospace);letter-spacing:.14em;text-transform:uppercase;color:rgba(244,251,247,.6)}.p11j-tally b{font:500 1.25rem var(--f-hud,monospace);color:#ff9b87}
.p11j-ctl{display:flex;align-items:center;gap:8px;margin-top:auto;padding-top:6px}
.p11j-ctl button{width:40px;height:40px;border-radius:50%;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.05);color:#fff;cursor:pointer}
.p11j-ctl span{font:600 .8rem var(--f-hud,monospace);opacity:.65;margin-left:6px}
.p11j-rail{display:flex;gap:6px;overflow-x:auto;padding:12px 2px 6px;scrollbar-width:thin}
.p11j-rail button{flex:1 0 118px;text-align:left;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.03);color:inherit;cursor:pointer;position:relative}
.p11j-rail button::before{content:"";position:absolute;left:12px;right:12px;top:0;height:3px;border-radius:3px;background:rgba(255,255,255,.12)}
.p11j-rail button.done::before{background:rgba(255,155,135,.6)}.p11j-rail button.on::before{background:#ff9b87}
.p11j-rail button.on{border-color:rgba(255,155,135,.6);background:rgba(255,155,135,.08)}
.p11j-rail b{display:block;font:500 .9rem var(--f-hud,monospace)}.p11j-rail span{display:block;font:500 .74rem/1.3 inherit;color:rgba(244,251,247,.7);margin-top:3px}
.p11j-cmp{margin-top:18px;border-radius:18px;overflow:hidden;border:1px solid rgba(255,255,255,.1)}
.p11j-cmp .hd,.p11j-cmp .rw{display:grid;grid-template-columns:1.1fr 1fr 1.3fr;gap:12px;padding:12px 16px;align-items:center}
.p11j-cmp .hd{background:rgba(255,255,255,.04);font:600 .66rem var(--f-hud,monospace);letter-spacing:.14em;text-transform:uppercase}
.p11j-cmp .rw{border-top:1px solid rgba(255,255,255,.07);font-size:.92rem}.p11j-cmp .a{color:#ff9b87}.p11j-cmp .b{color:#5fbf8f;font-weight:600}
@media(max-width:900px){.p11j-st{grid-template-columns:1fr}.p11j-cmp .hd,.p11j-cmp .rw{grid-template-columns:1fr 1fr 1fr;font-size:.82rem}}
`;

function sec11(s,p,pv,nx){const R=srcSet(['addo','citypop','who_sf','jnia','steps_ht','steps_dm','idf','jkci','census','rem25','remtgt','hbs','tira','nha','tcra26']),c=R.c;window.__p1c11=c;addCSS('p11',CSS11);addCSS('p11b',CSS11B);addCSS('p11j',CSS11J);
 const lg=LANG1();try{document.documentElement.classList.toggle('p0-swon',lg==='sw')}catch(e){}
 const I=M().inputs,dfee=I.online.delivery_fee;
 const pain=(x,i)=>`<article class="p11-pain${i%2?' rev':''}" id="${x.id}"><figure>${IMG11(x.img,x.alt,x.pos)}<span class="p11-cap">${L1('Concept image','Picha ya dhana')}</span><span class="p11-num">0${i+1}</span>
   <div class="p11-fact"><b>${L1(x.fact[0],x.fact[1])}</b><span>${L1(x.factL[0],x.factL[1])} ${c(x.src)}</span>${confTag(x.conf)}</div></figure>
   <div class="p11-tx"><span class="p11-k">${L1(x.k[0],x.k[1])}</span><h3>${L1(x.h[0],x.h[1])}</h3><p>${L1(x.p[0],x.p[1])}${i===2?' '+c('jnia'):i===3?' '+c('steps_ht')+' '+c('steps_dm'):''}</p>
   <div class="p11-cost">${x.cost.map(r=>`<div><small>${L1(r[0][0],r[0][1])}</small><p>${L1(r[1][0],r[1][1])}</p></div>`).join('')}</div>
   <div class="p11-fix">${L1(x.fix[0],x.fix[1])}</div></div></article>`;
 return secShell({s,p,pv,nx,cls:'p1 p11',
  img:'img/p1-hero.webp',imgAlt:'Concept image: a mother with her baby on her back walking past a row of small pharmacies in Dar es Salaam at golden hour',
  h1:L1('Care moved home.','Huduma imehamia nyumbani.'),em:L1('Shopping for it did not.','Ununuzi wake haujahamia.'),
  lede:L1('Pregnancy, babies, blood pressure, diabetes and ageing parents are now managed at home, month after month. This section sets out the five problems families face in buying what that care requires: how each occurs, what it costs a household, the evidence behind it, and how Afya Basics addresses it.',
   'Ujauzito, watoto wachanga, shinikizo la damu, kisukari na wazazi wazee sasa vinasimamiwa nyumbani, mwezi baada ya mwezi. Sehemu hii inaeleza matatizo matano ambayo familia hukutana nayo katika kununua mahitaji ya huduma hiyo: jinsi kila tatizo linavyotokea, linavyoigharimu familia, ushahidi wake, na jinsi Afya Basics inavyolitatua.'),
  heroExtra:`<div class="p11-lang" role="group" aria-label="Language / Lugha"><button type="button" data-lang="en" aria-pressed="${lg==='en'}">English</button><button type="button" data-lang="sw" aria-pressed="${lg==='sw'}">Kiswahili</button></div>`,
  mods:[
   ['The problem in one line',`<p class="p11-one">${L1('Care moved home, but shopping for it is still <b>scattered, slow, untrusted and unplanned</b>, and family abroad cannot be sure their money becomes care.','Huduma imehamia nyumbani, lakini ununuzi wake bado <b>umetawanyika, ni wa polepole, hauaminiki na haupangwi</b>, na familia iliyo nje haiwezi kuwa na uhakika kwamba pesa zao zinakuwa huduma.')}</p>
    <nav class="p11-rail" aria-label="The five pains">${PAIN.map((x,i)=>`<a href="#${x.id}" data-jump="${x.id}"><small>0${i+1}</small><b>${L1(x.k[0].split(' · ')[1],x.k[1].split(' · ')[1])}</b><span>${L1(x.h[0],x.h[1])}</span></a>`).join('')}</nav>
    <div class="plain" style="margin-top:26px"><span class="modno" style="margin:0 0 12px">${L1('In plain words','Kwa maneno rahisi')}</span><ol>
     <li>${L1('<b>Health care has moved into the home.</b> A generation ago most care happened at a clinic. Today a family manages blood pressure, diabetes, a new baby or an ageing parent at home, with products bought every month.','<b>Huduma ya afya imehamia nyumbani.</b> Kizazi kilichopita huduma nyingi zilitolewa kliniki. Leo familia inasimamia shinikizo la damu, kisukari, mtoto mchanga au mzazi mzee nyumbani, kwa bidhaa zinazonunuliwa kila mwezi.')}</li>
     <li>${L1('<b>The shops did not move with it.</b> Buying is still built for a one-off visit when someone is sick: one item, one counter, cash, no record and no reminder.','<b>Maduka hayakuhamia nayo.</b> Ununuzi bado umejengwa kwa ziara ya mara moja mtu akiumwa: bidhaa moja, kaunta moja, pesa taslimu, bila kumbukumbu wala ukumbusho.')}</li>
     <li>${L1('<b>The gap is paid by families.</b> In hours lost, fares, products that may not work, emergencies that could have been prevented, and worry, mostly carried by women and older people.','<b>Pengo hili linalipwa na familia.</b> Kwa masaa yanayopotea, nauli, bidhaa ambazo huenda zisifanye kazi, dharura zinazoweza kuzuiwa, na wasiwasi, unaobebwa zaidi na wanawake na wazee.')}</li>
     <li>${L1('<b>That gap is the business.</b> A business that removes these five pains, at a fair price, earns the family’s monthly spending and loyalty. That is what Afya Basics is built to do.','<b>Pengo hilo ndilo biashara.</b> Biashara inayoondoa matatizo haya matano, kwa bei ya haki, inapata matumizi ya kila mwezi ya familia na uaminifu wao. Hilo ndilo Afya Basics imejengwa kufanya.')}</li></ol></div>`],
   ['One household, one month',`<p class="s11lead">${L1('This is one ordinary month in one Dar es Salaam household: a working mother with a baby, a father with high blood pressure, and a grandmother living alone across town. The family is illustrative, but every situation is common and every number beside the story is measured. The counter in the corner adds up what the month costs in shops, hours, fares and risk.','Huu ni mwezi mmoja wa kawaida katika familia moja ya Dar es Salaam: mama anayefanya kazi mwenye mtoto, baba mwenye shinikizo la damu, na bibi anayeishi peke yake upande mwingine wa mji. Familia ni ya mfano, lakini kila hali ni ya kawaida na kila namba kando ya hadithi imepimwa. Kihesabu kilicho pembeni kinajumlisha gharama ya mwezi huu kwa maduka, masaa, nauli na hatari.')}</p>${storyHTML(c)}`,'p11month'],
   ['The same month, with Afya Basics',`<p class="s11lead">${L1('Now replay that exact month with Afya Basics in the family’s life. Each row takes one line of the hidden bill and shows what changes, and why.','Sasa rudia mwezi huohuo ukiwa na Afya Basics katika maisha ya familia. Kila mstari unachukua sehemu moja ya bili iliyojificha na kuonyesha kinachobadilika, na kwa nini.')}</p>${vsHTML()}`,'p11vsmod'],
   ['A second household · one evening',`<p class="s11lead">${L1('The first story followed a mother through a month. This one follows a father through a single evening. Juma is a middle-income father in Mbezi Beach who can afford all four items his wife and baby need; the obstacle is time, not money. Press play, or select a time along the day.','Hadithi ya kwanza ilimfuata mama kwa mwezi mzima. Hii inamfuata baba kwa jioni moja. Juma ni baba wa kipato cha kati, Mbezi Beach, anayeweza kumudu vitu vyote vinne ambavyo mke wake na mtoto wanahitaji; kikwazo ni muda, si pesa. Bonyeza cheza, au chagua saa kwenye mstari wa siku.')}</p>${j11HTML()}`],
   ['The problem map · five pains across the city',`<p class="s11lead">${L1('The same five pains occur across the city. Select a number on the map, or a tab below it, to open each one in full: how it happens, what it looks like today compared with Afya Basics, the measured fact behind it with its source and strength, and why it matters to an investor.','Matatizo haya matano hutokea kila mahali jijini. Chagua namba kwenye ramani, au kichupo chini yake, kufungua kila tatizo kikamilifu: jinsi linavyotokea, linavyoonekana leo ukilinganisha na Afya Basics, takwimu iliyopimwa nyuma yake pamoja na chanzo na nguvu yake, na kwa nini ni muhimu kwa mwekezaji.')}</p>${mapHTML(c)}`,'p11mapmod'],
   ['Who is most affected',`<p class="s11lead">${L1('Four groups carry most of the burden. They are large, they buy every month, and the Afya Boxes are designed around them. Section 1.4 turns them into detailed customer profiles.','Makundi manne yanabeba mzigo mkubwa zaidi. Ni makubwa, hununua kila mwezi, na Afya Box zimeundwa kwa ajili yao. Sehemu 1.4 inayageuza kuwa wasifu wa kina wa wateja.')}</p>
    <div class="p11-who">${WHO11.map(w=>`<article><div class="ph">${IMG11(w[0],w[1],w[7])}<span class="p11-cap">${L1('Concept image','Picha ya dhana')}</span><b>${w[2]}</b></div><div class="tx"><h4>${L1(w[3][0],w[3][1])}</h4><p>${L1(w[4][0],w[4][1])} ${c(w[5])}</p></div></article>`).join('')}</div>`],
   ['Try it · the monthly cost today',`<p class="s11lead">${L1('Enter your own household. The calculator counts the trips, fares and hours that today’s way of buying takes every month, then compares it with Afya Basics. The value of an hour is your own estimate of what that time is worth to you, from a stall, a salon, a job or caring for children.','Weka taarifa za familia yako. Kikokotoo kinahesabu safari, nauli na masaa ambayo njia ya leo ya kununua inachukua kila mwezi, kisha kinalinganisha na Afya Basics. Thamani ya saa moja ni makadirio yako mwenyewe ya thamani ya muda huo kwako, kutoka kibanda, saluni, kazi au kulea watoto.')}</p>
    <div class="p11-calc"><div class="p11-in">
     <div class="p11-pre" role="group" aria-label="Household type">${Object.entries(PRE11).map(([k,v],i)=>`<button type="button" data-pre="${k}" aria-pressed="${i===0}">${L1(v[0][0],v[0][1])}</button>`).join('')}</div>
     <div class="p11-sl"><label for="c11_t">${L1('Shopping trips for health items per month','Safari za kununua bidhaa za afya kwa mwezi')}<output id="o11_t"></output></label><input id="c11_t" type="range" min="1" max="12" step="1" value="5"><small>${L1('Count every trip: pharmacy, supermarket, medical-supplies shop.','Hesabu kila safari: famasi, supamaketi, duka la vifaa tiba.')}</small></div>
     <div class="p11-sl"><label for="c11_f">${L1('Fare per trip, there and back','Nauli kwa safari, kwenda na kurudi')}<output id="o11_f"></output></label><input id="c11_f" type="range" min="0" max="10000" step="500" value="2000"><small>${L1('Daladala, bajaji or boda. TSh 0 if you walk.','Daladala, bajaji au boda. TSh 0 ukitembea.')}</small></div>
     <div class="p11-sl"><label for="c11_h">${L1('Hours per trip, including waiting','Masaa kwa safari, pamoja na kusubiri')}<output id="o11_h"></output></label><input id="c11_h" type="range" min="0.5" max="5" step="0.5" value="2.5"></div>
     <div class="p11-sl"><label for="c11_v">${L1('Value of one hour of your time','Thamani ya saa moja ya muda wako')}<output id="o11_v"></output></label><input id="c11_v" type="range" min="0" max="10000" step="500" value="2000"><small>${L1('Your estimate. Set it to 0 to count fares only.','Makadirio yako. Weka 0 kuhesabu nauli pekee.')}</small></div>
    </div><div class="p11-out" aria-live="polite">
     <div class="p11-big"><div><b id="r11_m"></b><span>${L1('lost every month today (fares + time)','zinapotea kila mwezi leo (nauli + muda)')}</span></div><div><b id="r11_h"></b><span>${L1('hours a year spent on health shopping','masaa kwa mwaka kwenye ununuzi wa afya')}</span></div><div><b id="r11_d"></b><span>${L1('full 8-hour working days a year','siku kamili za kazi za saa 8 kwa mwaka')}</span></div></div>
     <div class="p11-bars"><div class="p11-bar a"><small>${L1('Today, per month','Leo, kwa mwezi')}<b id="b11_a"></b></small><i><u id="u11_a"></u></i></div>
      <div class="p11-bar b"><small>${L1('With an Afya Box, per month','Ukiwa na Afya Box, kwa mwezi')}<b id="b11_b"></b></small><i><u id="u11_b"></u></i></div></div>
     <div class="p11-days" id="d11" aria-hidden="true"></div>
     <p class="p11-note">${L1(`Each square is one day of a month; the red squares are the working days lost in a year. With an Afya Box, packing and delivery are already inside the box price, so there is no trip at all; an extra online order costs a ${tz(dfee)} delivery fee (master model ${esc(I.meta?I.meta.version||'':'')}). Time with Afya is counted as 10 minutes a month to check or swap the box. This calculator shows lost time and fares only; it does not include product prices, which section 6.2 compares.`,`Kila mraba ni siku moja ya mwezi; miraba myekundu ni siku za kazi zinazopotea kwa mwaka. Ukiwa na Afya Box, kupakia na kufikisha tayari viko ndani ya bei ya box, hivyo hakuna safari kabisa; oda ya ziada mtandaoni ina ada ya kufikisha ya ${tz(dfee)}. Muda ukiwa na Afya umehesabiwa kuwa dakika 10 kwa mwezi kuhakiki au kubadilisha box. Kikokotoo hiki kinaonyesha muda na nauli pekee; hakijumuishi bei za bidhaa, ambazo sehemu 6.2 inalinganisha.`)}</p>
    </div></div>`,'p11calc'],
   ['The evidence behind the five pains',`<p class="s11lead">${L1('Every fact used above, in one table, with its source, year and how strong it is. Section 1.2 opens the full evidence room with charts.','Kila takwimu iliyotumika hapo juu, kwenye jedwali moja, pamoja na chanzo, mwaka na nguvu yake. Sehemu 1.2 inafungua chumba kamili cha ushahidi chenye chati.')}</p>
    <table class="p11-ev"><thead><tr><th>${L1('Pain','Tatizo')}</th><th>${L1('Fact','Takwimu')}</th><th>${L1('Source and year','Chanzo na mwaka')}</th><th>${L1('Strength','Nguvu')}</th></tr></thead><tbody>
     <tr><td>${L1('Scattered','Kutawanyika')}</td><td>${L1('<b>~11,356 accredited drug shops vs 1,334 pharmacies</b>: most outlets are small with a narrow range.','<b>Maduka ya dawa ~11,356 dhidi ya famasi 1,334</b>: maduka mengi ni madogo yenye bidhaa chache.')}</td><td>Pharmacy Council, 2018 ${c('addo')}</td><td>${confTag('m')}</td></tr>
     <tr><td>${L1('Slow','Polepole')}</td><td>${L1('<b>Dar es Salaam grew 23% in ten years</b>, to 5,383,728 people.','<b>Dar es Salaam ilikua asilimia 23 ndani ya miaka kumi</b>, hadi watu 5,383,728.')}</td><td>${L1('NBS censuses 2012 and 2022','Sensa za NBS 2012 na 2022')} ${c('citypop')}</td><td>${confTag('h')}</td></tr>
     <tr><td>${L1('Untrusted','Kutoaminika')}</td><td>${L1('<b>About 1 in 10 medical products</b> in low- and middle-income countries is substandard or falsified.','<b>Takriban bidhaa 1 kati ya 10 za tiba</b> katika nchi za kipato cha chini na kati hazikidhi viwango au ni bandia.')}</td><td>WHO, 2017 ${c('who_sf')}</td><td>${confTag('m')}</td></tr>
     <tr><td>${L1('Untrusted','Kutoaminika')}</td><td>${L1('<b>TSh 360 million</b> of unregistered medicines seized at Dar airport, including diabetes and blood-pressure medicines.','<b>TSh milioni 360</b> za dawa zisizosajiliwa zilikamatwa uwanja wa ndege wa Dar, zikiwemo dawa za kisukari na shinikizo la damu.')}</td><td>TMDA, ${L1('September 2026','Septemba 2026')} ${c('jnia')}</td><td>${confTag('i')}</td></tr>
     <tr><td>${L1('Unplanned','Bila mpango')}</td><td>${L1('<b>23.1% of adults 18–69</b> have raised blood pressure; <b>72.4%</b> of diabetes cases undiagnosed.','<b>Asilimia 23.1 ya watu wazima 18–69</b> wana shinikizo la damu la juu; <b>asilimia 72.4</b> ya visa vya kisukari havijagunduliwa.')}</td><td>${L1('National STEPS survey 2023 (published 2026)','Utafiti wa kitaifa wa STEPS 2023 (ulichapishwa 2026)')} ${c('steps_ht')} ${c('steps_dm')}</td><td>${confTag('h')}</td></tr>
     <tr><td>${L1('Unplanned','Bila mpango')}</td><td>${L1('<b>Over 4 in 10</b> of 1,100+ people screened at the 2026 Dar trade fair had undiagnosed high blood pressure.','<b>Zaidi ya 4 kati ya 10</b> ya watu 1,100+ waliopimwa kwenye maonyesho ya biashara Dar 2026 walikuwa na shinikizo la damu lisilogundulika.')}</td><td>JKCI, ${L1('July 2026','Julai 2026')} ${c('jkci')}</td><td>${confTag('i')}</td></tr>
     <tr><td>${L1('Far from family','Mbali na familia')}</td><td>${L1('<b>TSh 3.31 trillion</b> sent home by the diaspora in 2024/25; about 500,000 Tanzanians work abroad.','<b>TSh trilioni 3.31</b> zilitumwa nyumbani na diaspora 2024/25; takriban Watanzania 500,000 wanafanya kazi nje.')}</td><td>${L1('Government to Parliament, 2026; labour migration conference, 2024','Serikali Bungeni, 2026; mkutano wa uhamiaji wa kazi, 2024')} ${c('rem25')} ${c('remtgt')}</td><td>${confTag('m')}</td></tr>
     <tr><td>${L1('Who pays','Nani analipa')}</td><td>${L1('<b>About 27%</b> of health spending is paid by households from their own pocket (TSh 1.82 trillion); <b>37%</b> of people have health insurance.','<b>Takriban asilimia 27</b> ya matumizi ya afya hulipwa na familia kutoka mfukoni (TSh trilioni 1.82); <b>asilimia 37</b> ya watu wana bima ya afya.')}</td><td>${L1('National Health Accounts 2021/22; TIRA 2025','Akaunti za Taifa za Afya 2021/22; TIRA 2025')} ${c('nha')} ${c('tira')}</td><td>${confTag('h')}</td></tr>
     <tr><td>${L1('Ability to pay','Uwezo wa kulipa')}</td><td>${L1('<b>TSh 720,946</b> average monthly spending per Dar household; only 8.0% below the basic-needs poverty line.','<b>TSh 720,946</b> wastani wa matumizi kwa mwezi kwa familia ya Dar; asilimia 8.0 tu chini ya mstari wa umaskini wa mahitaji ya msingi.')}</td><td>${L1('Household Budget Survey 2017/18','Utafiti wa Bajeti ya Kaya 2017/18')} ${c('hbs')}</td><td>${confTag('m')}</td></tr>
    </tbody></table>`],
   ['Risks and our answer',`<div class="p11-risk">
     <div><h4>${L1('“People are used to it. Is it really a pain?”','“Watu wamezoea. Je, kweli ni tatizo?”')}</h4><p>${L1('Habit is not satisfaction. <b>Our answer:</b> we test it before the store opens with 200 household interviews and a pop-up Afya Check day (section 7.1), and we track repeat visits, not opinions.','Mazoea si kuridhika. <b>Jibu letu:</b> tunalipima kabla duka halijafunguliwa kwa mahojiano na familia 200 na siku ya Afya Check ya muda (sehemu 7.1), na tunafuatilia ziara za kurudi, si maoni.')}</p></div>
     <div><h4>${L1('“Some of the data is old or global.”','“Baadhi ya takwimu ni za zamani au za kimataifa.”')}</h4><p>${L1('The pharmacy count is from 2018 and the fake-medicine rate is a WHO estimate for many countries. <b>Our answer:</b> every fact carries its year and a strength label, and newer national figures replace them as soon as they are published.','Idadi ya famasi ni ya 2018 na kiwango cha dawa bandia ni makadirio ya WHO kwa nchi nyingi. <b>Jibu letu:</b> kila takwimu ina mwaka wake na alama ya nguvu, na takwimu mpya za kitaifa zinazibadilisha zikichapishwa.')}</p></div>
     <div><h4>${L1('“Pharmacies and supermarkets could fix this themselves.”','“Famasi na supamaketi zingeweza kulitatua wenyewe.”')}</h4><p>${L1('They can fix one pain each, not all five together. <b>Our answer:</b> the advantage is the combination of one store, a monthly membership, partner care and one system, which section 5.3 maps against every competitor.','Wanaweza kutatua tatizo moja kila mmoja, si yote matano pamoja. <b>Jibu letu:</b> faida ni mchanganyiko wa duka moja, uanachama wa kila mwezi, huduma za washirika na mfumo mmoja, ambao sehemu 5.3 inalinganisha na kila mshindani.')}</p></div></div>`]],
  takeaway:L1('The need is large, repeats every month and is already being paid for, badly, by families in time, fares, risk and worry. Afya Basics does not have to create demand; it has to remove five measurable pains better than today’s options. The next sections show the evidence in full (1.2), how big the market is (1.3), who the customers are (1.4) and why now is the moment (1.5).','Hitaji ni kubwa, hujirudia kila mwezi na tayari linalipiwa, vibaya, na familia kwa muda, nauli, hatari na wasiwasi. Afya Basics haihitaji kuunda mahitaji; inahitaji kuondoa matatizo matano yanayopimika vizuri kuliko njia za leo. Sehemu zinazofuata zinaonyesha ushahidi kamili (1.2), ukubwa wa soko (1.3), wateja ni akina nani (1.4) na kwa nini sasa ndio wakati (1.5).'),
  doors:['s1-2','s1-3','s1-4','s3-1'],
  sources:R.list})}
function init11(){const g=id=>document.getElementById(id);try{initStory11()}catch(e){console.error(e)}try{initJ11()}catch(e){console.error(e)}try{initMap11()}catch(e){console.error(e)}try{initVs11()}catch(e){console.error(e)}if(!g('c11_t'))return;
 document.querySelectorAll('.p11-lang button').forEach(b=>b.onclick=()=>setLang1(b.dataset.lang));
 document.querySelectorAll('.p11-rail a').forEach(a=>a.onclick=e=>{e.preventDefault();const k=PAIN.findIndex(x=>x.id===a.dataset.jump);const t=g('p11map');if(t)t.scrollIntoView({behavior:'smooth',block:'start'});const tb=document.querySelector('.p11-tabs button[data-k="'+k+'"]');if(tb)tb.click()});
 const io=('IntersectionObserver' in window)?new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.25}):null;
 document.querySelectorAll('.p11-pain').forEach(el=>io?io.observe(el):el.classList.add('in'));
 const days=g('d11');days.innerHTML=Array.from({length:31},()=>'<i></i>').join('');const cells=[...days.children];
 const fee=M().inputs.online.delivery_fee;
 const up=()=>{const t=+g('c11_t').value,f=+g('c11_f').value,h=+g('c11_h').value,v=+g('c11_v').value;
  g('o11_t').textContent=t;g('o11_f').textContent=tz(f);g('o11_h').textContent=h+' h';g('o11_v').textContent=tz(v);
  const today=t*(f+h*v),afya=(10/60)*v,hrs=t*h*12,dd=hrs/8;
  g('r11_m').textContent=tz(today);g('r11_h').textContent=nf(hrs)+' h';g('r11_d').textContent=dd.toFixed(1);
  g('b11_a').textContent=tz(today);g('b11_b').textContent=tz(afya);
  const mx=Math.max(today,afya,1);g('u11_a').style.width=(today/mx*100)+'%';g('u11_b').style.width=Math.max(1.5,afya/mx*100)+'%';
  const on=Math.min(31,Math.round(dd));cells.forEach((x,i)=>x.classList.toggle('on',i<on))};
 const pre=k=>{const v=PRE11[k];document.querySelectorAll('.p11-pre button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.pre===k));if(v[1]!=null){g('c11_t').value=v[1];g('c11_f').value=v[2];g('c11_h').value=v[3]}up()};
 document.querySelectorAll('.p11-pre button').forEach(b=>b.onclick=()=>pre(b.dataset.pre));
 ['c11_t','c11_f','c11_h','c11_v'].forEach(id=>g(id).oninput=()=>{document.querySelectorAll('.p11-pre button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.pre==='custom'));up()});
 up()}
window.SECTIONS['s1-1']={render(s,p,pv,nx){css();return sec11(s,p,pv,nx)},init:init11};

})();
