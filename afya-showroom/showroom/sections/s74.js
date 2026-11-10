/* 7.4 Social impact · v2 on the D2 template.
   Evidence figures carry their source and the year of the data; the four WHO sources were re-opened on 10 Nov 2026,
   the others are marked "not re-checked". The Afya Check has 7 measurements (D-13), read from MODEL.inputs.check.
   Jobs, members and checks come from MODEL and follow the funding switch (B5): store 1 is the store of the selected option;
   from year 2 the other stores follow the flagship store plan (MODEL.get().inputs), as in the twelve-year plan of 5.4.
   The jobs chart is K2 inline SVG drawn at the container width. Targets are planning targets, labelled as such. */
(function(){
'use strict';
const A=()=>window.AB,T=(e,s)=>A().T(e,s),E=s=>A().E(s),N=(k,v,f)=>A().numHTML(k,v,f),L=x=>T(x[0],x[1]);
const tsh=n=>'TSh '+Math.round(n).toLocaleString('en-US');
const nf=n=>Math.round(n).toLocaleString('en-US');
const est=()=>`<span class="ab-est">${E(T('estimate','makadirio'))}</span>`;
const tgt=()=>`<span class="ab-est">${E(T('target','lengo'))}</span>`;
const sum=a=>a.reduce((t,x)=>t+x,0);
const CHK='10 Nov 2026',NRC=[' · not re-checked',' · haijakaguliwa upya'];
const SCN={base:['Base case','Hali ya msingi'],best:['Best case','Hali bora'],down:['Downside case','Hali mbaya']};
/* evidence values, each from its source below */
const HT={prev:25.7,aware:17.6,treat:8.3,ctrl:2.2,yr:2012},DM={n:'2.9 million',pct:9.8,undx:60.2},ADH=50,SF='1 in 10',CARE={w:4.6,m:1.2};

const SRC={
 whotz:['WHO: United Republic of Tanzania hypertension fact sheet (2012 STEPS survey data: 25.7% of adults aged 25–64 with raised blood pressure; 17.6% of them aware, 8.3% treated, 2.2% controlled)','WHO: taarifa ya shinikizo la damu ya Jamhuri ya Muungano wa Tanzania (data ya utafiti wa STEPS wa 2012: 25.7% ya watu wazima wa miaka 25–64 wana shinikizo la juu; 17.6% yao wanajua, 8.3% wanatibiwa, 2.2% wamedhibitiwa)','https://cdn.who.int/media/docs/default-source/country-profiles/hypertension/tza_en.pdf',CHK],
 whoht:['WHO fact sheet, 25 September 2025: Hypertension (the only way to detect it is to measure blood pressure)','Taarifa ya WHO, 25 Septemba 2025: Shinikizo la damu (njia pekee ya kuligundua ni kupima shinikizo la damu)','https://www.who.int/news-room/fact-sheets/detail/hypertension',CHK],
 adh:['WHO news release, 1 July 2003: adherence to long-term treatment averages only 50% in developed countries','Taarifa ya habari ya WHO, 1 Julai 2003: ufuasi wa matibabu ya muda mrefu ni wastani wa 50% tu katika nchi zilizoendelea','https://www.who.int/news/item/01-07-2003-failure-to-take-prescribed-medicine-for-chronic-diseases-is-a-massive-world-wide-problem',CHK],
 whosf:['WHO news release, 28 November 2017: 1 in 10 medical products in low- and middle-income countries is substandard or falsified','Taarifa ya habari ya WHO, 28 Novemba 2017: bidhaa 1 kati ya 10 za matibabu katika nchi za kipato cha chini na cha kati ni duni au bandia','https://www.who.int/news/item/28-11-2017-1-in-10-medical-products-in-developing-countries-is-substandard-or-falsified',CHK],
 idf:['IDF Diabetes Atlas: United Republic of Tanzania country data (2024 estimates)','Atlasi ya Kisukari ya IDF: data ya nchi ya Jamhuri ya Muungano wa Tanzania (makadirio ya 2024)','https://diabetesatlas.org/data-by-location/country/united-republic-of-tanzania/'],
 nbsg:['National Bureau of Statistics, January 2023: Gender dimensions of Tanzania’s labour market (2020/21 Integrated Labour Force Survey)','Ofisi ya Taifa ya Takwimu, Januari 2023: Vipimo vya kijinsia vya soko la ajira Tanzania (Utafiti Jumuishi wa Nguvu Kazi 2020/21)','https://www.nbs.go.tz/uploads/statistics/documents/en-1741873478-GENDER%20DIMENSIONS%20of%20TANZANIA%E2%80%99S%20LABOUR%20MARKET.pdf'],
 rem:['The Citizen, 27 May 2026: diaspora remittances hit TSh 3.3 trillion (2024/25 financial year)','The Citizen, 27 Mei 2026: fedha zinazotumwa na Watanzania walio nje zafikia TSh trilioni 3.3 (mwaka wa fedha 2024/25)','https://www.thecitizen.co.tz/tanzania/diaspora/diaspora-remittances-hit-sh3-3-trillion-as-tanzania-deepens-global-engagement-5473984'],
 sdg3:['United Nations: Sustainable Development Goal 3, targets','Umoja wa Mataifa: Lengo la Maendeleo Endelevu 3, shabaha','https://sdgs.un.org/goals/goal3'],
 sdg5:['United Nations: Sustainable Development Goal 5, targets','Umoja wa Mataifa: Lengo la Maendeleo Endelevu 5, shabaha','https://sdgs.un.org/goals/goal5'],
 sdg8:['United Nations: Sustainable Development Goal 8, targets','Umoja wa Mataifa: Lengo la Maendeleo Endelevu 8, shabaha','https://sdgs.un.org/goals/goal8'],
 nssf:['Lenvica (HR adviser), May 2022: National Social Security Fund (NSSF) in Tanzania','Lenvica (mshauri wa rasilimali watu), Mei 2022: Mfuko wa Taifa wa Hifadhi ya Jamii (NSSF) Tanzania','https://lenvica.com/national-social-security-fund-nssf-in-tanzania/']};
const KEYS=Object.keys(SRC),cn=k=>`<sup class="ab-mute">[${KEYS.indexOf(k)+1}]</sup>`;
const READ={'Height':['height','urefu'],'Weight':['weight','uzito'],'Body mass index (BMI)':['body mass index (BMI)','kiwango cha uzito kwa urefu (BMI)'],'Body composition':['body composition','muundo wa mwili'],'Blood pressure and pulse':['blood pressure and pulse','shinikizo la damu na mapigo ya moyo'],'Blood oxygen (SpO2)':['blood oxygen (SpO2)','oksijeni kwenye damu (SpO2)'],'Body temperature':['body temperature','joto la mwili']};
const STAFF=[[/store lead/i,['Store lead and senior health adviser','Kiongozi wa duka na mshauri mkuu wa afya']],[/health advisers?/i,['Health advisers','Washauri wa afya']],[/picker/i,['Picker and packer','Mchaguaji na mfungashaji']],[/rider/i,['Riders (electric motorbikes)','Wasafirishaji (pikipiki za umeme)']]];
const staffLab=n=>{for(const [re,l] of STAFF)if(re.test(n))return L(l);return n};

/* ---------- impact by year, from the model ----------
   Year 1: the selected store's months. Checks follow the model's Afya Check line (checks a day by month 12, ramping from 30%).
   Years 2–12: store-equivalents from the growth plan's ramp (as in the model); store 1 keeps the selected option's plan,
   the other stores use the flagship store plan. */
function impact(key){const M=window.MODEL,I=M.inputs,r=M.get(key),F=(r&&r.inputs)||I,G=I.growth,d=(I.scenarios[key]||{demand:1}).demand;
 const sSel=sum(I.staff.map(x=>x[1])),sFl=sum(F.staff.map(x=>x[1])),cSel=I.check.checks_day_m12,cFl=F.check.checks_day_m12;
 const sb=k=>k>=0?G.stores_by_year[k]:0;
 return r.years.map((y,i)=>{let checks,boxes;
  if(i===0){checks=sum(r.months.map((q,j)=>cSel*d*(0.3+0.7*j/11)*30));boxes=sum(r.months.map(q=>q.members))}
  else{const y1n=sb(i)-sb(i-1),y2n=sb(i-1)-sb(i-2),mat=sb(i-2),eq=mat+y2n*G.ramp[1]+y1n*G.ramp[0],w1=i===1?G.ramp[1]:1;
   checks=(w1*cSel+(eq-w1)*cFl)*d*365;boxes=(r.years[i-1].members+y.members)/2*12}
  return {year:y.year,stores:y.stores,jobs:sSel+(y.stores-1)*sFl,checks,members:y.members,boxes}})}

function jobsSVG(W,Y){const ph=W<520,H=ph?220:260,pl=ph?34:44,pr=8,pt=22,pb=28,n=Y.length,cw=(W-pl-pr)/n,bw=Math.min(34,cw*.62);
 const mx0=Math.max(...Y.map(y=>y.jobs)),st=mx0>200?100:mx0>80?50:20,mx=Math.ceil(mx0/st)*st,y=v=>pt+(H-pt-pb)*(1-v/mx),x=i=>pl+cw*(i+.5);let g='';
 for(let v=0;v<=mx;v+=st)g+=`<line x1="${pl}" x2="${W-pr}" y1="${y(v).toFixed(1)}" y2="${y(v).toFixed(1)}" style="stroke:var(${v?'--line':'--mute'})" stroke-width="1"/><text x="${pl-6}" y="${(y(v)+4).toFixed(1)}" text-anchor="end" font-size="11" style="fill:var(--mute)">${v}</text>`;
 Y.forEach((q,i)=>{g+=`<rect x="${(x(i)-bw/2).toFixed(1)}" y="${y(q.jobs).toFixed(1)}" width="${bw.toFixed(1)}" height="${(y(0)-y(q.jobs)).toFixed(1)}" style="fill:var(--green)"><title>${E(T(`Year ${q.year}: ${q.jobs} jobs, ${q.stores} stores`,`Mwaka ${q.year}: ajira ${q.jobs}, maduka ${q.stores}`))}</title></rect>`;
  if(!ph||i%2===0||i===n-1)g+=`<text x="${x(i).toFixed(1)}" y="${(y(q.jobs)-6).toFixed(1)}" text-anchor="middle" font-size="11" style="fill:var(--gold)">${q.jobs}</text>`;
  g+=`<text x="${x(i).toFixed(1)}" y="${H-8}" text-anchor="middle" font-size="11" style="fill:var(--mute)">${E(T('Y','M'))}${q.year}</text>`});
 return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${E(T(`Direct store jobs by year, from ${Y[0].jobs} in year 1 to ${Y[n-1].jobs} in year 12`,`Ajira za moja kwa moja za maduka kwa mwaka, kutoka ${Y[0].jobs} mwaka 1 hadi ${Y[n-1].jobs} mwaka 12`))}" style="display:block">${g}</svg>`}

const CSS=`<style>
.s74-body .ab-block>p{margin-top:var(--s2)}
.s74-vis{border:1px solid var(--line);background:var(--surface);padding:var(--s3)}
.s74-vt{margin:0;font-size:var(--fs-body);font-weight:600}
.s74-chart{margin-top:var(--s2);min-height:220px}
.s74-cap{font-size:var(--fs-cap);margin-top:8px;max-width:var(--measure)}
.s74-ul{margin:var(--s2) 0 0;padding-left:20px;max-width:var(--measure)}.s74-ul li{margin:8px 0}
.s74-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;background:var(--line);border:1px solid var(--line);margin-top:var(--s3)}
.s74-grid>div{background:var(--surface);padding:var(--s2) var(--s3)}
.s74-ev b{display:block;color:var(--gold);font-size:var(--fs-sub);font-weight:600;font-variant-numeric:tabular-nums}
.s74-ev p{margin:6px 0 0;font-size:calc(var(--fs-body) - 2px)}.s74-ev small{display:block;margin-top:6px;color:var(--mute);font-size:var(--fs-cap)}
.s74-pw h3,.s74-sdg h3{margin:0 0 6px;font-size:var(--fs-body);font-weight:600}
.s74-pw small{color:var(--mute);font-size:var(--fs-cap)}
.s74-pw p,.s74-sdg p{margin:6px 0 0;font-size:calc(var(--fs-body) - 2px)}
.s74-toc{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1px;background:var(--line);border:1px solid var(--line);margin-top:var(--s3)}
.s74-toc>div{background:var(--surface);padding:var(--s2)}
.s74-toc h3{margin:0 0 var(--s1);font-size:var(--fs-cap);font-weight:400;color:var(--mute)}
.s74-toc p{margin:0 0 8px;font-size:calc(var(--fs-body) - 2px)}
.s74-toc>div.o{background:var(--green-deep)}.s74-toc>div.o h3{color:var(--ink)}
.s74-case{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:var(--s3);margin-top:var(--s3);align-items:start}
.s74-case img{width:100%;height:auto;display:block;border:1px solid var(--line)}
.s74-case ol{margin:var(--s1) 0 0;padding-left:20px}.s74-case li{margin:8px 0}
.s74-tool{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:var(--s3);margin-top:var(--s3);border:1px solid var(--line);background:var(--surface);padding:var(--s3)}
.s74-tool label{display:block;font-size:calc(var(--fs-body) - 2px);margin-top:var(--s2)}
.s74-tool input[type=range]{width:100%;margin-top:6px;accent-color:var(--green-edge)}
.s74-out{display:grid;gap:var(--s2);align-content:start}
.s74-o small{display:block;color:var(--mute);font-size:var(--fs-cap)}
.s74-o b{display:block;color:var(--gold);font-size:var(--fs-sub);font-weight:600;font-variant-numeric:tabular-nums}
.s74-o span{display:block;color:var(--mute);font-size:var(--fs-cap)}
.s74-sdg b.n{display:inline-block;color:var(--gold);font-size:var(--fs-title);font-weight:600;line-height:1;margin-right:8px;vertical-align:-4px}
.s74-sdg q{display:block;color:var(--mute);font-size:var(--fs-cap);margin-top:8px;quotes:none}
@media (max-width:860px){.ab-sec table.ab-t td:first-child{min-width:180px}.s74-grid,.s74-case,.s74-tool{grid-template-columns:minmax(0,1fr)}.s74-toc{grid-template-columns:minmax(0,1fr)}.s74-vis,.s74-tool{padding:var(--s2)}}
</style>`;

function render(s,p,pv,nx){const M=window.MODEL,I=M.inputs,lean=A().isLean(),ck=I.check,Y=impact('base'),staff=sum(I.staff.map(x=>x[1]));
 const reads=(ck.free_readings||[]).map(x=>L(READ[x]||[x,x])),nR=reads.length;
 const F=(M.get('base').inputs)||I,sFl=sum(F.staff.map(x=>x[1]));
 const optName=lean?T('start-small','kuanza kidogo'):T('flagship','duka kuu');
 const pay=I.staff.map(x=>({l:staffLab(x[0]),n:x[1],w:x[2],t:x[1]*x[2]})),payT=sum(pay.map(x=>x.t));
 const undx=HT.prev*(1-HT.aware/100);
 const dash=[
  [['Free Afya Checks done','Afya Check za bure zilizofanyika'],['Logged by the kiosk, with consent','Zinarekodiwa na kibanda, kwa ridhaa'],N('d-c1',Y[0].checks,'int'),N('d-c3',Y[2].checks,'int'),'3.4',1],
  [['Readings referred to a clinic','Vipimo vilivyopewa rufaa kwenda kliniki'],['Referral flag in the system when a reading is above the adviser protocol','Alama ya rufaa kwenye mfumo kipimo kikiwa juu ya itifaki ya mshauri'],'~'+N('d-r1',Y[0].checks*.15,'int'),'~'+N('d-r3',Y[2].checks*.15,'int'),'3.4',1],
  [['Referred people who confirm a clinic visit','Waliopewa rufaa wanaothibitisha kwenda kliniki'],['Follow-up SMS after 14 days (opt-in)','SMS ya ufuatiliaji baada ya siku 14 (kwa hiari)'],'≥ 50%','≥ 60%','3.4'],
  [['Condition-care members with no missed month','Wanachama wa huduma ya magonjwa bila mwezi uliokosa'],['Delivery records: the box arrived before the last one ran out','Kumbukumbu za usafirishaji: boksi lilifika kabla la mwisho kuisha'],'≥ 90%','≥ 95%','3.8'],
  [['Products registered and verified','Bidhaa zilizosajiliwa na kuthibitishwa'],['The catalogue blocks a product with no registration record; quarterly audit','Orodha inazuia bidhaa isiyo na kumbukumbu ya usajili; ukaguzi wa kila robo mwaka'],'100%','100%','3.8'],
  [['Direct store jobs','Ajira za moja kwa moja za maduka'],['Payroll records','Kumbukumbu za mishahara'],N('d-j1',Y[0].jobs,'int'),N('d-j3',Y[2].jobs,'int'),'8.5',1],
  [['Staff on formal contracts with NSSF','Wafanyakazi wenye mikataba rasmi na NSSF'],['Payroll and NSSF registration','Mishahara na usajili wa NSSF'],'100%','100%','8.5'],
  [['Women in the workforce and in leadership','Wanawake katika nguvu kazi na uongozi'],['Payroll: store lead and adviser roles','Mishahara: nafasi za kiongozi wa duka na washauri'],'≥ 50%','≥ 50%','5.5'],
  [['Carer hours saved a year','Saa za walezi zilizookolewa kwa mwaka'],['Member survey twice a year: trips and hours before and after joining','Utafiti wa wanachama mara mbili kwa mwaka: safari na saa kabla na baada ya kujiunga'],T('see the calculator','tazama kikokotoo'),T('see the calculator','tazama kikokotoo'),'5.4'],
  [['Boxes paid from abroad','Maboksi yanayolipiwa kutoka nje ya nchi'],['Payment origin recorded on each box','Chanzo cha malipo kinarekodiwa kwa kila boksi'],T('tracked','inafuatiliwa'),T('tracked','inafuatiliwa'),'3.8']];
 return `<article class="ab-sec" aria-labelledby="h-s7-4">${CSS}<div class="ab-wrap">
 <div class="ab-sec-no">${E(s.no)}</div><h1 id="h-s7-4">${E(s.title)}</h1>
 <p class="ab-summary">${E(T('Afya Basics creates impact through its normal operations, and each kind of impact is counted or measured. Free checks find raised readings early and refer people to a clinic. Planned boxes keep supplies for daily treatment from running out. A registered-only range keeps falsified goods off the shelf. Home delivery gives carers, most of them women, time back. And every store creates formal jobs. This section gives the evidence behind each pathway, the targets, how each is measured, and what the company does not claim.','Afya Basics inaleta matokeo chanya kupitia shughuli zake za kawaida, na kila aina ya matokeo inahesabiwa au kupimwa. Vipimo vya bure vinagundua mapema vipimo vilivyo juu na kuwapa watu rufaa kwenda kliniki. Maboksi yaliyopangwa yanazuia vifaa vya matibabu ya kila siku kuisha. Bidhaa zilizosajiliwa tu zinazuia bidhaa bandia kufika rafuni. Usafirishaji hadi nyumbani unawarudishia walezi muda, wengi wao wakiwa wanawake. Na kila duka linaleta ajira rasmi. Sehemu hii inatoa ushahidi wa kila njia, malengo, jinsi kila moja inavyopimwa, na kile ambacho kampuni haidai.'))}</p>

 <figure class="ab-visual s74-vis">
  <p class="s74-vt">${E(T('Direct store jobs by year','Ajira za moja kwa moja za maduka kwa mwaka'))}</p>
  <div class="s74-chart" id="s74-jc"></div>
  <figcaption class="ab-mute s74-cap">${E(T(`Store staff × stores open, base case, financial model v1.2. Store 1 is the ${lean?'start-small':'flagship'} store (${staff} people); every later store follows the flagship staff plan (${sFl} people). Packing hub, head office and supplier jobs are not counted.`,`Wafanyakazi wa duka × maduka yaliyo wazi, hali ya msingi, modeli ya fedha v1.2. Duka la 1 ni duka la ${lean?'kuanza kidogo':'kuu'} (watu ${staff}); kila duka linalofuata linafuata mpango wa wafanyakazi wa duka kuu (watu ${sFl}). Ajira za kituo cha kufungasha, ofisi kuu na wasambazaji hazihesabiwi.`))}</figcaption>
 </figure>

 <div class="ab-body s74-body">
 <section class="ab-block"><h2>${E(T('The evidence','Ushahidi'))}</h2>
  <ul class="s74-ul">
   <li>${T(`<b>Most high blood pressure is hidden.</b> In Tanzania about 1 in 4 adults aged 25–64 had raised blood pressure, but only ${HT.aware}% of them knew it and ${HT.ctrl}% had it under control (WHO, ${HT.yr} survey, the latest national data) ${cn('whotz')}. WHO says the only way to detect it is to measure it ${cn('whoht')}.`,`<b>Shinikizo la damu la juu mara nyingi limejificha.</b> Tanzania takriban mtu mzima 1 kati ya 4 wa miaka 25–64 alikuwa na shinikizo la juu, lakini ${HT.aware}% tu yao walijua na ${HT.ctrl}% walikuwa wamelidhibiti (WHO, utafiti wa ${HT.yr}, data ya kitaifa ya karibuni zaidi) ${cn('whotz')}. WHO inasema njia pekee ya kuligundua ni kulipima ${cn('whoht')}.`)}</li>
   <li>${T(`<b>Diabetes is common and mostly undiagnosed.</b> About ${DM.n} Tanzanian adults lived with diabetes in 2024 (${DM.pct}%), and ${DM.undx}% of them did not know ${cn('idf')}.`,`<b>Kisukari ni cha kawaida na mara nyingi hakijagunduliwa.</b> Takriban watu wazima milioni 2.9 wa Tanzania waliishi na kisukari mwaka 2024 (${DM.pct}%), na ${DM.undx}% yao hawakujua ${cn('idf')}.`)}</li>
   <li>${T(`<b>Treatment fails when supplies run out.</b> WHO found that adherence to long-term treatment averages only ${ADH}% even in developed countries, and is lower in developing ones ${cn('adh')}. A household that runs out of strips on a Sunday night misses doses.`,`<b>Matibabu yanashindwa vifaa vikiisha.</b> WHO iligundua kwamba ufuasi wa matibabu ya muda mrefu ni wastani wa ${ADH}% tu hata katika nchi zilizoendelea, na ni mdogo zaidi katika nchi zinazoendelea ${cn('adh')}. Kaya inayoishiwa vijiti vya kupima Jumapili usiku inakosa dozi.`)}</li>
   <li>${T(`<b>Care falls on women.</b> Tanzanian women spend about ${CARE.w} hours a day on unpaid domestic and care work, against ${CARE.m} hours for men ${cn('nbsg')}. Every extra trip to buy a parent’s supplies comes out of that time.`,`<b>Malezi yanawaangukia wanawake.</b> Wanawake wa Tanzania wanatumia takriban saa ${CARE.w} kwa siku kwa kazi za nyumbani na malezi zisizolipwa, ukilinganisha na saa ${CARE.m} kwa wanaume ${cn('nbsg')}. Kila safari ya ziada kununua vifaa vya mzazi inatoka katika muda huo.`)}</li>
  </ul>
  <div class="s74-grid">
   <div class="s74-ev"><b>${HT.aware}%</b><p>${E(T('of Tanzanian adults with raised blood pressure knew they had it','ya watu wazima wa Tanzania wenye shinikizo la juu walijua wanalo'))} ${cn('whotz')}</p><small>${E(T(`WHO, ${HT.yr} survey data · checked ${CHK}`,`WHO, data ya utafiti wa ${HT.yr} · imekaguliwa ${CHK}`))}</small></div>
   <div class="s74-ev"><b>${DM.undx}%</b><p>${E(T('of adults with diabetes in Tanzania were undiagnosed','ya watu wazima wenye kisukari Tanzania hawakuwa wamegunduliwa'))} ${cn('idf')}</p><small>${E(T('IDF, 2024 estimates · not re-checked','IDF, makadirio ya 2024 · haijakaguliwa upya'))}</small></div>
   <div class="s74-ev"><b>~${ADH}%</b><p>${E(T('average adherence to long-term treatment, even in developed countries','wastani wa ufuasi wa matibabu ya muda mrefu, hata katika nchi zilizoendelea'))} ${cn('adh')}</p><small>${E(T(`WHO, 2003 · checked ${CHK}`,`WHO, 2003 · imekaguliwa ${CHK}`))}</small></div>
   <div class="s74-ev"><b>${E(T(SF,'1 kati ya 10'))}</b><p>${E(T('medical products in low- and middle-income countries is substandard or falsified','ya bidhaa za matibabu katika nchi za kipato cha chini na cha kati ni duni au bandia'))} ${cn('whosf')}</p><small>${E(T(`WHO, 2017 · checked ${CHK}`,`WHO, 2017 · imekaguliwa ${CHK}`))}</small></div>
   <div class="s74-ev"><b>${CARE.w} ${E(T('h a day','saa kwa siku'))}</b><p>${E(T(`unpaid care and domestic work by women, against ${CARE.m} h by men`,`kazi za malezi na nyumbani zisizolipwa kwa wanawake, ukilinganisha na saa ${CARE.m} kwa wanaume`))} ${cn('nbsg')}</p><small>${E(T('NBS, 2020/21 survey · not re-checked','NBS, utafiti wa 2020/21 · haijakaguliwa upya'))}</small></div>
   <div class="s74-ev"><b>${E(T('TSh 3.3 trillion','TSh trilioni 3.3'))}</b><p>${E(T('sent home by Tanzanians abroad in 2024/25','zilizotumwa nyumbani na Watanzania walio nje mwaka 2024/25'))} ${cn('rem')}</p><small>${E(T('The Citizen, May 2026 · not re-checked','The Citizen, Mei 2026 · haijakaguliwa upya'))}</small></div>
  </div>
 </section>

 <section class="ab-block"><h2>${E(T('Five impact pathways','Njia tano za matokeo chanya'))}</h2>
  <div class="s74-grid">
   <div class="s74-pw"><small>${E(T('Pathway 1','Njia ya 1'))}</small><h3>${E(T('Earlier detection','Kugundua mapema'))}</h3><p>${E(T(`A free quick check at the door in about ${ck.quick_seconds} seconds, and a full Afya Check of ${nR} measurements in about 2–3 minutes: ${reads.join(', ')}. Raised readings are explained and referred to a clinic, with no sales offer at that point.`,`Kipimo cha haraka cha bure mlangoni kwa takriban sekunde ${ck.quick_seconds}, na Afya Check kamili ya vipimo ${nR} kwa takriban dakika 2–3: ${reads.join(', ')}. Vipimo vilivyo juu vinaelezwa na kupewa rufaa kwenda kliniki, bila ofa ya kuuza wakati huo.`))}</p></div>
   <div class="s74-pw"><small>${E(T('Pathway 2','Njia ya 2'))}</small><h3>${E(T('Continuous supply','Upatikanaji usiokatika'))}</h3><p>${E(T('Condition-care boxes arrive before supplies end, with reminders and one-tap reorders, so doses are not missed for lack of strips or needles. How often to test, and any medicine, is decided by the member’s clinic; medicines come only through the licensed partner pharmacy.','Maboksi ya huduma ya magonjwa yanafika kabla vifaa havijaisha, pamoja na vikumbusho na kuagiza tena kwa mguso mmoja, hivyo dozi hazikosekani kwa kukosa vijiti au sindano. Mara ngapi kupima, na dawa yoyote, vinaamuliwa na kliniki ya mwanachama; dawa zinapatikana tu kupitia famasia mshirika yenye leseni.'))}</p></div>
   <div class="s74-pw"><small>${E(T('Pathway 3','Njia ya 3'))}</small><h3>${E(T('Fewer falsified products','Bidhaa bandia chache')) }</h3><p>${E(T(`Only registered, quality-checked brands from audited suppliers, with batch records. With ${I.brands_per_item} brands per item in the same price range, the cheapest option is still a safe one.`,`Chapa zilizosajiliwa na kukaguliwa ubora tu kutoka kwa wasambazaji waliokaguliwa, zikiwa na kumbukumbu za kundi. Kwa chapa ${I.brands_per_item} kwa kila bidhaa katika kiwango kimoja cha bei, chaguo la bei nafuu zaidi bado ni salama.`))}</p></div>
   <div class="s74-pw"><small>${E(T('Pathway 4','Njia ya 4'))}</small><h3>${E(T('Carers’ time back','Kuwarudishia walezi muda'))}</h3><p>${E(T('Same-day delivery and monthly boxes replace trips across town. That time belongs mostly to women carers: a granddaughter caring for her grandmother, a mother with a toddler and a newborn.','Usafirishaji wa siku hiyohiyo na maboksi ya kila mwezi vinachukua nafasi ya safari za kuvuka mji. Muda huo ni hasa wa walezi wanawake: mjukuu anayemtunza bibi yake, mama mwenye mtoto mdogo na mchanga.'))}</p></div>
   <div class="s74-pw"><small>${E(T('Pathway 5','Njia ya 5'))}</small><h3>${E(T('Care paid from abroad','Huduma inayolipiwa kutoka nje'))}</h3><p>${E(T('A son or daughter abroad pays for a parent’s box directly and receives a delivery photo. The money sent home becomes care the sender can check.','Mwana au binti aliye nje analipia boksi la mzazi moja kwa moja na anapokea picha ya usafirishaji. Fedha zinazotumwa nyumbani zinakuwa huduma ambayo mtumaji anaweza kuthibitisha.'))}</p></div>
   <div class="s74-pw"><small>${E(T('What we do not claim','Kile ambacho hatudai'))}</small><h3>${E(T('Measured outputs only','Matokeo yanayopimwa tu'))}</h3><p>${E(T('Afya Basics does not diagnose or treat, and cannot attribute lives saved. It counts what it controls: checks, referrals, on-time boxes, registered products and jobs. With consent, it surveys members on what changed for them.','Afya Basics haitambui wala haitibu magonjwa, na haiwezi kudai maisha yaliyookolewa. Inahesabu inachokidhibiti: vipimo, rufaa, maboksi yaliyofika kwa wakati, bidhaa zilizosajiliwa na ajira. Kwa ridhaa, inawauliza wanachama nini kimebadilika kwao.'))}</p></div>
  </div>
 </section>

 <section class="ab-block"><h2>${E(T('From shelf to outcome: the theory of change','Kutoka rafu hadi matokeo: nadharia ya mabadiliko'))}</h2>
  <p>${E(T('Each link in the chain can be tested. Outputs are counted by the system; outcomes are measured through follow-up and surveys, with consent.','Kila kiungo katika mnyororo kinaweza kujaribiwa. Matokeo ya moja kwa moja yanahesabiwa na mfumo; matokeo ya mwisho yanapimwa kupitia ufuatiliaji na tafiti, kwa ridhaa.'))}</p>
  <div class="s74-toc">
   <div><h3>${E(T('Inputs','Rasilimali'))}</h3><p>${E(T(`The Afya Check kiosk (${nR} measurements) and trained advisers`,`Kibanda cha Afya Check (vipimo ${nR}) na washauri waliofunzwa`))}</p><p>${E(T(`A registered range of about ${I.product_families} product families`,`Bidhaa zilizosajiliwa za takriban familia ${I.product_families}`))}</p><p>${E(T('Box membership and delivery riders','Uanachama wa boksi na wasafirishaji'))}</p></div>
   <div><h3>${E(T('Activities','Shughuli'))}</h3><p>${E(T('Free checks with a referral protocol','Vipimo vya bure vyenye itifaki ya rufaa'))}</p><p>${E(T('Supplier audits and batch tracking','Ukaguzi wa wasambazaji na ufuatiliaji wa makundi'))}</p><p>${E(T('Monthly boxes with Afya Choice swaps','Maboksi ya kila mwezi yenye kubadilisha kwa Afya Choice'))}</p></div>
   <div><h3>${E(T('Outputs, counted','Matokeo ya moja kwa moja, yanayohesabiwa'))}</h3><p>${E(T('Checks done and readings referred','Vipimo vilivyofanyika na vipimo vilivyopewa rufaa'))}</p><p>${E(T('Boxes delivered on time','Maboksi yaliyofika kwa wakati'))}</p><p>${E(T('Share of products verified','Sehemu ya bidhaa zilizothibitishwa'))}</p></div>
   <div class="o"><h3>${E(T('Outcomes, measured','Matokeo ya mwisho, yanayopimwa'))}</h3><p>${T('<b>Earlier care:</b> referred people who see a clinic','<b>Huduma ya mapema:</b> waliopewa rufaa wanaoenda kliniki')}</p><p>${T('<b>Adherence:</b> no missed months on condition boxes','<b>Ufuasi:</b> hakuna mwezi uliokosa kwa maboksi ya magonjwa')}</p><p>${T('<b>Time:</b> carer hours saved','<b>Muda:</b> saa za walezi zilizookolewa')}</p></div>
  </div>
 </section>

 <section class="ab-block"><h2>${E(T('One referral, step by step','Rufaa moja, hatua kwa hatua'))}</h2>
  <div class="s74-case">
   <img src="img/e1/kiosk.webp" width="2400" height="1350" loading="lazy" alt="${E(T('The Afya Check kiosk inside the store','Kibanda cha Afya Check ndani ya duka'))}">
   <div><span class="ab-mute" style="font-size:var(--fs-cap)">${E(T('Illustrative: a father, 52, on his way home','Mfano: baba, miaka 52, akirudi nyumbani'))}</span><ol>
    <li>${T(`<b>About ${ck.quick_seconds} seconds.</b> He takes the free quick check. His blood pressure reads high, and the screen suggests he speak to an adviser.`,`<b>Takriban sekunde ${ck.quick_seconds}.</b> Anafanya kipimo cha haraka cha bure. Shinikizo lake la damu linasoma juu, na skrini inapendekeza azungumze na mshauri.`)}</li>
    <li>${T('<b>Explained, not sold.</b> The adviser explains the reading in Kiswahili and recommends seeing a clinic within days. No product is offered at this point.','<b>Anaelezwa, hauziwi.</b> Mshauri anaeleza kipimo kwa Kiswahili na kupendekeza aende kliniki ndani ya siku chache. Hakuna bidhaa inayotolewa wakati huu.')}</li>
    <li>${T('<b>Referred.</b> With his consent, he receives the reading by SMS with a list of nearby clinics, and the system sets a follow-up.','<b>Anapewa rufaa.</b> Kwa ridhaa yake, anapokea kipimo kwa SMS pamoja na orodha ya kliniki zilizo karibu, na mfumo unaweka ufuatiliaji.')}</li>
    <li>${T('<b>Followed up.</b> After 14 days an SMS asks whether he saw a clinic. If his clinic advises a home monitor, he can choose from 4–5 registered brands, or join the Presha Care box; how often he measures is set by his clinic.','<b>Anafuatiliwa.</b> Baada ya siku 14 SMS inauliza kama alienda kliniki. Kliniki yake ikimshauri kuwa na kipimo cha nyumbani, anaweza kuchagua kati ya chapa 4–5 zilizosajiliwa, au kujiunga na boksi la Presha Care; mara ngapi apime inawekwa na kliniki yake.')}</li></ol></div>
  </div>
 </section>

 <section class="ab-block"><h2>${E(T('The impact calculator','Kikokotoo cha matokeo chanya'))}</h2>
  <p>${E(T('Choose a year and a case. Checks, members and jobs come from the financial model for the selected option; the behaviour assumptions can be changed.','Chagua mwaka na hali. Vipimo, wanachama na ajira vinatoka modeli ya fedha kwa chaguo lililochaguliwa; dhana za tabia zinaweza kubadilishwa.'))} ${est()}</p>
  <div class="s74-tool">
   <div>
    <span class="ab-seg" role="group" aria-label="${E(T('Case','Hali'))}">${['base','best','down'].map(k=>`<button type="button" data-s74sc="${k}" aria-pressed="${k==='base'}">${E(L(SCN[k]))}</button>`).join('')}</span>
    <label>${E(T('Plan year','Mwaka wa mpango'))} <b class="ab-gold" id="s74-yo"></b><input type="range" id="s74-y" min="1" max="12" value="3" aria-label="${E(T('Plan year','Mwaka wa mpango'))}"></label>
    <label>${E(T('Share of people checked whose reading needs a clinic','Sehemu ya waliopimwa ambao kipimo chao kinahitaji kliniki'))} <b class="ab-gold" id="s74-ro"></b><input type="range" id="s74-r" min="5" max="30" value="15" aria-label="${E(T('Referral share','Sehemu ya rufaa'))}"></label>
    <label>${E(T('Shopping trips saved per member household a month','Safari za manunuzi zilizookolewa kwa kaya ya mwanachama kwa mwezi'))} <b class="ab-gold" id="s74-to"></b><input type="range" id="s74-t" min="0" max="6" step="0.5" value="2" aria-label="${E(T('Trips saved a month','Safari zilizookolewa kwa mwezi'))}"></label>
    <label>${E(T('Hours per trip','Saa kwa kila safari'))} <b class="ab-gold" id="s74-ho"></b><input type="range" id="s74-h" min="0.5" max="4" step="0.5" value="1.5" aria-label="${E(T('Hours per trip','Saa kwa kila safari'))}"></label>
    <label>${E(T('Share of boxes paid from abroad','Sehemu ya maboksi yanayolipiwa kutoka nje'))} <b class="ab-gold" id="s74-do"></b><input type="range" id="s74-d" min="0" max="30" value="10" aria-label="${E(T('Share paid from abroad','Sehemu inayolipiwa kutoka nje'))}"></label>
   </div>
   <div class="s74-out">
    <div class="s74-o"><small>${E(T('Free Afya Checks in the year','Afya Check za bure katika mwaka'))}</small><b id="s74-o1">–</b></div>
    <div class="s74-o"><small>${E(T('Readings referred to a clinic','Vipimo vilivyopewa rufaa kwenda kliniki'))}</small><b id="s74-o2">–</b></div>
    <div class="s74-o"><small>${E(T('Carer hours saved','Saa za walezi zilizookolewa'))}</small><b id="s74-o3">–</b><span id="s74-o3n"></span></div>
    <div class="s74-o"><small>${E(T('Direct store jobs','Ajira za moja kwa moja za maduka'))}</small><b id="s74-o4">–</b></div>
    <div class="s74-o"><small>${E(T('Boxes paid from abroad','Maboksi yanayolipiwa kutoka nje'))}</small><b id="s74-o5">–</b></div>
   </div>
  </div>
  <p class="ab-mute s74-cap">${E(T(`If the people checked matched the national survey, about ${Math.round(undx)}% would have raised blood pressure they do not know about (${HT.prev}% × ${(100-HT.aware).toFixed(1)}%). Afya’s visitors are not a random sample, so the default referral share is a more cautious 15%. Women’s share of hours saved assumes care is shared like national unpaid care work.`,`Kama waliopimwa wangefanana na utafiti wa kitaifa, takriban ${Math.round(undx)}% wangekuwa na shinikizo la juu wasilolijua (${HT.prev}% × ${(100-HT.aware).toFixed(1)}%). Wageni wa Afya si sampuli ya nasibu, hivyo sehemu ya rufaa ya kawaida ni 15%, kwa tahadhari zaidi. Sehemu ya wanawake ya saa zilizookolewa inadhani malezi yanagawanywa kama kazi za malezi zisizolipwa za kitaifa.`))}</p>
 </section>

 <section class="ab-block"><h2>${E(T('The impact dashboard: targets and how each is measured','Dashibodi ya matokeo: malengo na jinsi kila moja linavyopimwa'))}</h2>
  <div class="ab-tw"><table class="ab-t"><thead><tr><th>${E(T('Measure','Kipimo'))}</th><th>${E(T('Year 1','Mwaka 1'))}</th><th>${E(T('Year 3','Mwaka 3'))}</th><th>${E(T('How it is measured','Jinsi kinavyopimwa'))}</th><th>${E(T('SDG target','Shabaha ya SDG'))}</th></tr></thead><tbody>
   ${dash.map(r=>`<tr><td><b>${E(L(r[0]))}</b></td><td class="ab-n">${r[2]}</td><td class="ab-n">${r[3]}</td><td class="ab-mute">${E(L(r[1]))}</td><td>${r[4]}</td></tr>`).join('')}
  </tbody></table></div>
  <p class="ab-mute s74-cap">${E(T('Checks, referrals and jobs come from the financial model v1.2, base case, selected option; referrals assume 15% of checks. Rates marked ≥ are planning targets.','Vipimo, rufaa na ajira vinatoka modeli ya fedha v1.2, hali ya msingi, chaguo lililochaguliwa; rufaa zinadhani 15% ya vipimo. Viwango vyenye ≥ ni malengo ya mipango.'))} ${tgt()}</p>
 </section>

 <section class="ab-block"><h2>${E(T('UN Sustainable Development Goals 3, 5 and 8','Malengo ya Maendeleo Endelevu ya UN 3, 5 na 8'))}</h2>
  <div class="s74-grid">
   <div class="s74-sdg"><h3><b class="n">3</b>${E(T('Good health and well-being','Afya bora na ustawi'))}</h3><q>${E(T('Target 3.4: by 2030, reduce by one third premature mortality from non-communicable diseases through prevention and treatment','Shabaha 3.4: ifikapo 2030, kupunguza kwa theluthi moja vifo vya mapema kutokana na magonjwa yasiyoambukiza kupitia kinga na matibabu'))} ${cn('sdg3')}</q><p>${E(T('Free checks and referrals, and planned condition-care boxes that support daily treatment. Target 3.8, access to safe and quality products, is served by a registered-only range.','Vipimo vya bure na rufaa, na maboksi ya magonjwa yaliyopangwa yanayosaidia matibabu ya kila siku. Shabaha 3.8, upatikanaji wa bidhaa salama na bora, inatimizwa kwa bidhaa zilizosajiliwa tu.'))}</p></div>
   <div class="s74-sdg"><h3><b class="n">5</b>${E(T('Gender equality','Usawa wa kijinsia'))}</h3><q>${E(T('Target 5.4: recognise and value unpaid care and domestic work','Shabaha 5.4: kutambua na kuthamini kazi za malezi na za nyumbani zisizolipwa'))} ${cn('sdg5')}</q><p>${E(T('Home delivery and planned boxes cut the shopping trips that fall mostly on women carers. For target 5.5, the aim is that at least half of advisers and store leads are women.','Usafirishaji hadi nyumbani na maboksi yaliyopangwa vinapunguza safari za manunuzi zinazowaangukia zaidi walezi wanawake. Kwa shabaha 5.5, lengo ni kwamba angalau nusu ya washauri na viongozi wa maduka wawe wanawake.'))}</p></div>
   <div class="s74-sdg"><h3><b class="n">8</b>${E(T('Decent work and economic growth','Kazi zenye staha na ukuaji wa uchumi'))}</h3><q>${E(T('Target 8.5: full and productive employment and decent work for all women and men','Shabaha 8.5: ajira kamili na yenye tija na kazi zenye staha kwa wanawake na wanaume wote'))} ${cn('sdg8')}</q><p>${E(T('Formal jobs with contracts and social security, a career path from adviser to store lead, and riders on electric motorbikes.','Ajira rasmi zenye mikataba na hifadhi ya jamii, njia ya kupanda kazini kutoka mshauri hadi kiongozi wa duka, na wasafirishaji kwenye pikipiki za umeme.'))}</p></div>
  </div>
 </section>

 <section class="ab-block"><h2>${E(T('Risks and the planned answer','Hatari na jibu lililopangwa'))}</h2>
  <ul class="s74-ul">
   <li>${T('<b>Impact claims run ahead of the proof.</b> Only counted outputs and measured outcomes are reported, each with its method; no claim is made of diagnoses or lives saved.','<b>Madai ya matokeo yanazidi ushahidi.</b> Ni matokeo yanayohesabiwa na yanayopimwa tu yanayoripotiwa, kila moja na njia yake; hakuna dai la kugundua magonjwa au maisha yaliyookolewa.')}</li>
   <li>${T('<b>Free checks worry people or lead to over-referral.</b> A calm, scripted explanation, referral thresholds agreed with a clinical adviser, and advice rather than alarm.','<b>Vipimo vya bure vinawatia watu wasiwasi au kusababisha rufaa nyingi mno.</b> Maelezo ya utulivu yaliyoandaliwa, viwango vya rufaa vilivyokubaliwa na mshauri wa kitabibu, na ushauri badala ya hofu.')}</li>
   <li>${T('<b>Using health readings for marketing would break trust.</b> Readings are used only with consent and are never sold or shared; the access rules in section 7.2 apply.','<b>Kutumia vipimo vya afya kwa matangazo kungevunja uaminifu.</b> Vipimo vinatumika tu kwa ridhaa na haviuzwi wala kushirikishwa; kanuni za ruhusa za sehemu ya 7.2 zinatumika.')}</li>
   <li>${T('<b>Carer time saved is overstated.</b> The calculator is an estimate; the real figure comes from a member survey twice a year, reported in the investor pack.','<b>Muda wa walezi uliookolewa unazidishwa.</b> Kikokotoo ni makadirio; takwimu halisi inatoka utafiti wa wanachama mara mbili kwa mwaka, unaoripotiwa katika kifurushi cha mwekezaji.')}</li>
  </ul>
 </section>
 </div>

 <section class="ab-block"><h2>${E(T('Key figures','Takwimu muhimu'))}</h2>
  ${A().figsHTML([
   {v:N('f-j1',Y[0].jobs,'int'),l:T(`Direct jobs in store 1, ${lean?'start-small':'flagship'} option`,`Ajira za moja kwa moja katika duka la 1, chaguo la ${lean?'kuanza kidogo':'duka kuu'}`),s:E(T('Financial model v1.2, staff plan','Modeli ya fedha v1.2, mpango wa wafanyakazi'))},
   {v:`${N('f-j12',Y[11].jobs,'int')} ${est()}`,l:T(`Direct store jobs by year 12, across ${Y[11].stores} stores`,`Ajira za moja kwa moja za maduka ifikapo mwaka 12, katika maduka ${Y[11].stores}`),s:E(T('Financial model v1.2, base case','Modeli ya fedha v1.2, hali ya msingi'))},
   {v:`${N('f-c1',Y[0].checks,'int')} ${est()}`,l:T(`Free Afya Checks in year 1, ${nR} measurements each`,`Afya Check za bure mwaka 1, vipimo ${nR} kila moja`),s:E(T('Financial model v1.2, base case','Modeli ya fedha v1.2, hali ya msingi'))},
   {v:`${HT.aware}%`,l:T('Tanzanian adults with raised blood pressure who knew it','Watu wazima wa Tanzania wenye shinikizo la juu waliojua'),s:E(T(`WHO, ${HT.yr} survey data, checked ${CHK}`,`WHO, data ya utafiti wa ${HT.yr}, imekaguliwa ${CHK}`))}])}
 </section>

 <section class="ab-block"><h2>${E(T('What the jobs pay: store 1 payroll','Ajira zinalipa nini: mishahara ya duka la 1'))}</h2>
  <div class="ab-tw"><table class="ab-t"><thead><tr><th>${E(T('Role','Nafasi'))}</th><th>${E(T('People','Watu'))}</th><th>${E(T('Monthly wage each','Mshahara wa mwezi kwa kila mmoja'))}</th><th>${E(T('Monthly total','Jumla kwa mwezi'))}</th></tr></thead><tbody>
   ${pay.map((x,i)=>`<tr><td>${E(x.l)}</td><td class="ab-n">${x.n}</td><td class="ab-n">${N('p-w'+i,x.w,'tsh')}</td><td class="ab-n">${N('p-t'+i,x.t,'tsh')}</td></tr>`).join('')}
   <tr><td><b>${E(T('Total wages','Jumla ya mishahara'))}</b> ${est()}</td><td class="ab-n">${staff}</td><td></td><td class="ab-n">${N('p-tot',payT,'tsh')}</td></tr>
  </tbody></table></div>
  <p class="ab-mute s74-cap">${E(T(`Financial model v1.2, ${lean?'start-small':'flagship'} option, planning estimates. On top of wages the company pays employer contributions of ${Math.round(I.staff_oncost*1000)/10}% (NSSF 10% and WCF 0.5%) and relief cover for annual leave; all of it sits in the store’s running costs (section 6.1).`,`Modeli ya fedha v1.2, chaguo la ${lean?'kuanza kidogo':'duka kuu'}, makadirio ya mipango. Juu ya mishahara kampuni inalipa michango ya mwajiri ya ${Math.round(I.staff_oncost*1000)/10}% (NSSF 10% na WCF 0.5%) na wa kushikilia nafasi wakati wa likizo ya mwaka; yote yamo katika gharama za uendeshaji za duka (sehemu ya 6.1).`))} ${cn('nssf')}</p>
 </section>

 ${A().openHTML([
  E(T('The national blood-pressure figures are from the 2012 survey and the adherence figure from 2003, the latest WHO data found; newer national data would replace them.','Takwimu za kitaifa za shinikizo la damu ni za utafiti wa 2012 na takwimu ya ufuasi ni ya 2003, data ya karibuni zaidi ya WHO iliyopatikana; data mpya za kitaifa zitachukua nafasi yake.')),
  E(T('The IDF, NBS and remittance figures and the SDG target texts are to be re-checked against their sources.','Takwimu za IDF, NBS na fedha zinazotumwa kutoka nje pamoja na maandishi ya shabaha za SDG zinasubiri kukaguliwa upya dhidi ya vyanzo vyake.')),
  E(T('The referral share (15% of checks) and the year-1 and year-3 targets are planning assumptions until the first months of trading.','Sehemu ya rufaa (15% ya vipimo) na malengo ya mwaka 1 na mwaka 3 ni dhana za mipango hadi miezi ya kwanza ya biashara.')),
  E(T('The referral thresholds and script are to be agreed with a clinical adviser before opening.','Viwango vya rufaa na maelezo yake vitakubaliwa na mshauri wa kitabibu kabla ya kufungua.')),
  E(T('Staffing of later stores follows the flagship plan; it will be set store by store.','Wafanyakazi wa maduka ya baadaye wanafuata mpango wa duka kuu; utawekwa duka kwa duka.'))])}

 ${A().sourcesHTML(KEYS.map(k=>{const x=SRC[k];return x[3]?{t:T(x[0],x[1]),u:x[2],chk:x[3]}:{t:T(x[0],x[1])+L(NRC),u:x[2]}}))}
 ${A().pagerHTML(pv,nx)}
 </div></article>`}

function init(){const $=id=>document.getElementById(id);if(!$('s74-jc'))return;const I=window.MODEL.inputs;
 const Yb=impact('base'),draw=()=>{const el=$('s74-jc');const W=Math.floor(el.clientWidth);if(W>=120)el.innerHTML=jobsSVG(W,Yb)};draw();
 let sc='base';
 const up=()=>{const Y=impact(sc),y=+$('s74-y').value,r=+$('s74-r').value/100,t=+$('s74-t').value,h=+$('s74-h').value,d=+$('s74-d').value/100,Q=Y[y-1];
  $('s74-yo').textContent=T('Year ','Mwaka ')+y;$('s74-ro').textContent=Math.round(r*100)+'%';$('s74-to').textContent=t;$('s74-ho').textContent=h+T(' h',' saa');$('s74-do').textContent=Math.round(d*100)+'%';
  const hrs=Q.boxes*t*h,ws=CARE.w/(CARE.w+CARE.m);
  $('s74-o1').textContent=nf(Q.checks);$('s74-o2').textContent=nf(Q.checks*r);$('s74-o3').textContent=nf(hrs)+T(' h',' saa');
  $('s74-o3n').textContent=T(`about ${nf(hrs*ws)} h of it women’s time (${Math.round(ws*100)}%, from ${CARE.w} h against ${CARE.m} h a day)`,`takriban saa ${nf(hrs*ws)} kati yake ni muda wa wanawake (${Math.round(ws*100)}%, kutokana na saa ${CARE.w} dhidi ya saa ${CARE.m} kwa siku)`);
  $('s74-o4').textContent=T(`${Q.jobs} · ${Q.stores} store${Q.stores>1?'s':''}`,`${Q.jobs} · maduka ${Q.stores}`);$('s74-o5').textContent=nf(Q.boxes*d)};
 document.querySelectorAll('[data-s74sc]').forEach(b=>b.onclick=()=>{sc=b.dataset.s74sc;document.querySelectorAll('[data-s74sc]').forEach(q=>q.setAttribute('aria-pressed',String(q===b)));up()});
 ['s74-y','s74-r','s74-t','s74-h','s74-d'].forEach(k=>$(k).oninput=up);up();
 let tm,onRz=()=>{clearTimeout(tm);tm=setTimeout(draw,120)};addEventListener('resize',onRz);addEventListener('afya:leave',()=>removeEventListener('resize',onRz),{once:true})}

window.SECTIONS['s7-4']={render,init,v2:true};
})();
