/* 1.5 Why now · v2 on the D2 template (brief G 1.5, K1.25).
   One inline-SVG timeline of seven trend strands, each strand with its sources (no glow, no motion).
   Figures: research/chapter1-reference.html (approved Chapter 1) and the legacy part1.js sources;
   mobile money and recurring payments: research/R5-payments.md; online pharmacy (AfyaDepot, a market signal and
   price benchmark, not a model, B6): research/R3-pricing.md; rate: research/fx.md. */
(function(){
'use strict';
const A=()=>window.AB,T=(e,s)=>A().T(e,s),E=s=>A().E(s),L=(e,s)=>E(T(e,s));
const lang=()=>window.AFYA_LANG==='sw'?'sw':'en';

/* ---------- sources (numbered as cited) ---------- */
const SRC=()=>[
 {t:T('International Diabetes Federation, Diabetes Atlas: United Republic of Tanzania country data (2011, 2024)','Shirikisho la Kimataifa la Kisukari (IDF), Diabetes Atlas: takwimu za Jamhuri ya Muungano wa Tanzania (2011, 2024)'),u:'https://diabetesatlas.org/data-by-location/country/united-republic-of-tanzania/'},
 {t:T('Mayige et al., Tanzania Journal of Health Research 27(2), 2026: hypertension among adults aged 18–69, 2023 National STEPS survey','Mayige na wenzake, Tanzania Journal of Health Research 27(2), 2026: shinikizo la juu la damu kwa watu wazima wa miaka 18–69, utafiti wa kitaifa wa STEPS 2023'),u:'https://nhrdr.nimr.or.tz/records/209',chk:'9 Nov 2026'},
 {t:T('City Population (NBS census data): Dar es Salaam region, 2002, 2012 and 2022 census counts','City Population (takwimu za sensa za NBS): mkoa wa Dar es Salaam, idadi za sensa za 2002, 2012 na 2022'),u:'https://www.citypopulation.de/en/tanzania/admin/07'},
 {t:T('World Bank, World Development Indicators (UN World Urbanization Prospects): Tanzania urban population share','Benki ya Dunia, Viashiria vya Maendeleo ya Dunia (UN World Urbanization Prospects): sehemu ya wakazi wa mijini Tanzania'),u:'https://statisticsoftheworld.com/country/tanzania/urban-population'},
 {t:T('The Guardian (Tanzania), 10 February 2026: TCRA, mobile accounts double in past five years','The Guardian (Tanzania), 10 Februari 2026: TCRA, akaunti za simu zaongezeka mara mbili katika miaka mitano'),u:'https://ippmedia.com/the-guardian/news/local-news/read/tcra-mobile-accounts-double-in-past-five-years-2026-02-10-094738'},
 {t:T('TanzaniaInvest, 2023: TCRA telecom statistics, quarter ending September 2023','TanzaniaInvest, 2023: takwimu za mawasiliano za TCRA, robo inayoishia Septemba 2023'),u:'https://tanzaniainvest.com/?p=23816'},
 {t:T('TanzaniaInvest, 2025: TCRA telecom statistics, quarter ending March 2025','TanzaniaInvest, 2025: takwimu za mawasiliano za TCRA, robo inayoishia Machi 2025'),u:'https://tanzaniainvest.com/telecoms/tcra-telecom-stats-q1-2025'},
 {t:T('TanzaniaInvest, 14 June 2026: TCRA telecom statistics, quarter ending March 2026 (80.98M mobile-money accounts, 58.9M internet subscriptions, 42.5% smartphones, 6.31bn mobile payments in 2025)','TanzaniaInvest, 14 Juni 2026: takwimu za mawasiliano za TCRA, robo inayoishia Machi 2026 (akaunti milioni 80.98 za pesa kwa simu, usajili milioni 58.9 wa intaneti, simu janja asilimia 42.5, malipo bilioni 6.31 kwa simu mwaka 2025)'),u:'https://tanzaniainvest.com/telecoms/tcra-telecom-stats-q1-2026'},
 {t:T('Daba Finance, 10 November 2023: internet subscriptions in Tanzania rise by almost 45% in five years (TCRA data)','Daba Finance, 10 Novemba 2023: usajili wa intaneti Tanzania waongezeka kwa karibu 45% katika miaka mitano (takwimu za TCRA)'),u:'https://dabafinance.com/en/news/internet-subscriptions-in-tanzania-surge'},
 {t:T('The Citizen, 14 February 2024: Tanzanians in the diaspora remit Sh1.3 trillion in 2022 (Bank of Tanzania)','The Citizen, 14 Februari 2024: Watanzania walioko diaspora watuma Sh trilioni 1.3 mwaka 2022 (Benki Kuu ya Tanzania)'),u:'https://thecitizen.co.tz/tanzania/business/tanzanians-in-the-diaspora-remit-sh1-3-trillion-in-2022-bot-4524388'},
 {t:T('The Citizen, 27 May 2026: diaspora remittances hit Sh3.3 trillion (2024/25 financial year)','The Citizen, 27 Mei 2026: fedha za diaspora zafikia Sh trilioni 3.3 (mwaka wa fedha 2024/25)'),u:'https://www.thecitizen.co.tz/tanzania/diaspora/diaspora-remittances-hit-sh3-3-trillion-as-tanzania-deepens-global-engagement-5473984'},
 {t:T('The Citizen, 8 June 2026: cross-border mobile money inflows rise 33 percent to Sh698 billion (Bank of Tanzania)','The Citizen, 8 Juni 2026: fedha za simu zinazoingia kutoka nje zaongezeka kwa asilimia 33 hadi Sh bilioni 698 (Benki Kuu ya Tanzania)'),u:'https://thecitizen.co.tz/tanzania/business/cross-border-mobile-money-inflows-rise-33-percent-to-sh698-billion-5488722'},
 {t:T('Global Pharma Health Fund, 2022: counterfeit and substandard medicines in Tanzania (TMDA special market inspection, 2019/20)','Global Pharma Health Fund, 2022: dawa bandia na zisizo na viwango Tanzania (ukaguzi maalum wa soko wa TMDA, 2019/20)'),u:'https://gphf.org/minilab/hintergrund_counterfeits_tanzania.htm'},
 {t:T('AllAfrica / Daily News, 11 June 2026: TMDA strengthens drug safety oversight in the fight against counterfeit medicines','AllAfrica / Daily News, 11 Juni 2026: TMDA yaimarisha usimamizi wa usalama wa dawa katika mapambano dhidi ya dawa bandia'),u:'https://allafrica.com/stories/202606110516.html'},
 {t:T('The Guardian (Tanzania), 10 September 2026: TMDA seizes unregistered medicines worth 360m/- in JNIA crackdown','The Guardian (Tanzania), 10 Septemba 2026: TMDA yakamata dawa zisizosajiliwa zenye thamani ya milioni 360 katika msako wa JNIA'),u:'https://ippmedia.co.tz/the-guardian/news/local-news/read/tmda-seizes-unregistered-medicines-worth-360m-jnia-crackdown-2026-09-10-144750'},
 {t:T('Bank of Tanzania, National Payment Systems Annual Report 2025 (merchants more than doubled to 2.79 million; standing orders for subscriptions listed as a future enhancement, p. 30)','Benki Kuu ya Tanzania, Ripoti ya Mwaka ya Mifumo ya Malipo ya Taifa 2025 (wafanyabiashara waliongezeka zaidi ya mara mbili hadi milioni 2.79; maagizo ya kudumu kwa usajili yametajwa kama maboresho ya baadaye, uk. 30)'),u:'https://www.bot.go.tz/Publications/Regular/Annual%20Report/en/2026060211494565.pdf',chk:'9 Nov 2026'},
 {t:T('Bank of Tanzania, National Payment System Annual Report 2024, section 2.1.7: direct debit within TACH still being introduced','Benki Kuu ya Tanzania, Ripoti ya Mwaka ya Mfumo wa Malipo wa Taifa 2024, kifungu 2.1.7: makato ya moja kwa moja ndani ya TACH bado yanaanzishwa'),u:'https://www.bot.go.tz/Publications/Regular/Annual%20Report/sw/2025032515311662.pdf',chk:'9 Nov 2026'},
 {t:T('Vodacom Tanzania PLC, Annual Integrated Report 2025 (more than 470,000 LIPA kwa Simu merchants; payments above TZS 1 trillion a month)','Vodacom Tanzania PLC, Ripoti Jumuishi ya Mwaka 2025 (wafanyabiashara zaidi ya 470,000 wa LIPA kwa Simu; malipo zaidi ya TZS trilioni 1 kwa mwezi)'),u:'https://www.vodacom.co.tz/assets/uploads/Vodacom_Tanzania_PLC_Annual_Integrated_Report_2025_f75bdd1d49.pdf',chk:'9 Nov 2026'},
 {t:T('AfyaDepot online pharmacy and health shop: sitemap listing 1,239 product pages (last modified 9 Nov 2026)','AfyaDepot, famasia na duka la afya mtandaoni: ramani ya tovuti yenye kurasa 1,239 za bidhaa (ilisasishwa 9 Nov 2026)'),u:'https://afyadepot.co.tz/sitemap.xml',chk:'9 Nov 2026'},
 {t:T('AfyaDepot home page banner: “Free delivery on 150K+ Pharmacy orders in Dar”','Bango la ukurasa wa mwanzo wa AfyaDepot: “Free delivery on 150K+ Pharmacy orders in Dar”'),u:'https://afyadepot.co.tz/',chk:'9 Nov 2026'},
 {t:T('AfyaDepot product page: Softcare Premium Soft Diapers, TSh 17,000 for 42 (size M) and TSh 26,000 for 80 (size S)','Ukurasa wa bidhaa wa AfyaDepot: Softcare Premium Soft Diapers, TSh 17,000 kwa 42 (saizi M) na TSh 26,000 kwa 80 (saizi S)'),u:'https://afyadepot.co.tz/product/softcare-premium-soft-diapers-for-3-6-kg-s-no-1',chk:'9 Nov 2026'},
 {t:T('The Citizen, 26 January 2026: universal health insurance rolls out nationwide (Universal Health Insurance Act, 2023)','The Citizen, 26 Januari 2026: bima ya afya kwa wote yaanza kutekelezwa nchi nzima (Sheria ya Bima ya Afya kwa Wote, 2023)'),u:'https://thecitizen.co.tz/tanzania/news/national/universal-health-insurance-rolls-out-nationwide-today-5338644'},
 {t:T('Bank of Tanzania, exchange rates: US$1 = TSh 2,642.50 (mean rate, trading date 10 Nov 2026)','Benki Kuu ya Tanzania, viwango vya kubadilisha fedha: US$1 = TSh 2,642.50 (kiwango cha wastani, tarehe ya biashara 10 Nov 2026)'),u:'https://www.bot.go.tz/ExchangeRate/excRates',chk:'9 Nov 2026'}];
const cite=(...n)=>`<sup>${n.map(k=>`<a href="#abSrc" class="ab-cite" aria-label="${L('Source','Chanzo')} ${k}">${k}</a>`).join(',')}</sup>`;
const srcs=n=>n.map(k=>`<a href="#abSrc" class="ab-cite" aria-label="${L('Source','Chanzo')} ${k}">${k}</a>`).join(', ');

/* ---------- the seven strands: points [x (year), label en, label sw, event?] ---------- */
const ST=[
 {n:['Rising chronic disease','Magonjwa sugu yanaongezeka'],u:['Adults with diabetes, IDF model','Watu wazima wenye kisukari, modeli ya IDF'],
  p:[[2011,'472,900','472,900'],[2024,'2.93M','milioni 2.93']],src:[1,2],
  a:['472,900 adults with diabetes (2011)','Watu wazima 472,900 wenye kisukari (2011)'],b:['2.93 million (2024); 23.1% of adults with raised blood pressure (2023)','Milioni 2.93 (2024); asilimia 23.1 ya watu wazima wana shinikizo la juu la damu (2023)'],
  w:['Steady monthly demand for monitors, strips and condition-care boxes','Mahitaji ya kila mwezi yasiyokatika kwa vipima, vipande vya kupimia na maboksi ya huduma ya magonjwa']},
 {n:['A growing city','Jiji linalokua'],u:['Dar es Salaam region, census','Mkoa wa Dar es Salaam, sensa'],
  p:[[2012,'4.36M','milioni 4.36'],[2022,'5.38M','milioni 5.38']],src:[3,4],
  a:['2.49 million people (2002); 4.36 million (2012)','Watu milioni 2.49 (2002); milioni 4.36 (2012)'],b:['5.38 million (2022), +116% in twenty years','Milioni 5.38 (2022), +116% katika miaka ishirini'],
  w:['Dense neighbourhoods make one store and short delivery routes viable','Mitaa yenye msongamano inafanya duka moja na njia fupi za usafirishaji ziwezekane']},
 {n:['Mobile money everywhere','Pesa kwa simu kila mahali'],u:['Mobile-money accounts','Akaunti za pesa kwa simu'],
  p:[[2021,'35.3M','milioni 35.3'],[2023.7,'51.4M','milioni 51.4'],[2025.2,'66.5M','milioni 66.5'],[2026.2,'80.98M','milioni 80.98']],src:[5,6,7,8,16],
  a:['35.3 million accounts (2021)','Akaunti milioni 35.3 (2021)'],b:['80.98 million (March 2026); 2.79 million merchants accept payment (2025)','Milioni 80.98 (Machi 2026); wafanyabiashara milioni 2.79 wanapokea malipo (2025)'],
  w:['Pay at the counter by phone; a monthly payment request approved with a PIN','Kulipa kaunta kwa simu; ombi la malipo la kila mwezi linaloidhinishwa kwa PIN']},
 {n:['Phones and internet','Simu na intaneti'],u:['Internet subscriptions','Usajili wa intaneti'],
  p:[[2018,'23.81M','milioni 23.81'],[2023.7,'34.47M','milioni 34.47'],[2025.2,'49.3M','milioni 49.3'],[2026.2,'58.9M','milioni 58.9']],src:[9,6,8],
  a:['23.81 million subscriptions (2018); 30.7% smartphones (September 2023)','Usajili milioni 23.81 (2018); simu janja asilimia 30.7 (Septemba 2023)'],b:['58.9 million (March 2026); 42.5% smartphones','Milioni 58.9 (Machi 2026); simu janja asilimia 42.5'],
  w:['Reorders, swaps and reminders in the app or on WhatsApp','Kuagiza tena, kubadilisha na vikumbusho kwenye programu au WhatsApp']},
 {n:['Money from the diaspora','Fedha kutoka diaspora'],u:['Remittances a year','Fedha zinazotumwa kwa mwaka'],
  p:[[2021,'TSh 837B','TSh bilioni 837'],[2022,'TSh 1.3T','TSh trilioni 1.3'],[2025,'TSh 3.31T','TSh trilioni 3.31']],src:[10,11,12],
  a:['TSh 837 billion (2021)','TSh bilioni 837 (2021)'],b:['TSh 3.31 trillion (2024/25); cross-border mobile money +33% to TSh 698 billion','TSh trilioni 3.31 (2024/25); fedha za simu kutoka nje +33% hadi TSh bilioni 698'],
  w:['A parent’s box paid from abroad, confirmed with a photo at the door','Boksi la mzazi linalolipwa kutoka nje ya nchi, likithibitishwa kwa picha mlangoni']},
 {n:['Regulatory push on quality','Msukumo wa udhibiti wa ubora'],u:['TMDA action on unregistered products','Hatua za TMDA dhidi ya bidhaa zisizosajiliwa'],
  p:[[2020,'2019/20 inspection','Ukaguzi 2019/20',1],[2026.45,'','',1],[2026.7,'TSh 360M seized','TSh milioni 360 zakamatwa',1]],src:[13,14,15],
  a:['Special market inspection removes counterfeit products (2019/20)','Ukaguzi maalum wa soko waondoa bidhaa bandia (2019/20)'],b:['Stronger action pledged (June 2026); TSh 360 million of unregistered medicines seized at Dar airport (September 2026)','Ahadi ya hatua kali zaidi (Juni 2026); dawa zisizosajiliwa za TSh milioni 360 zakamatwa uwanja wa ndege wa Dar (Septemba 2026)'],
  w:['“Registered products only, medicines from a licensed pharmacy” becomes a reason to switch','“Bidhaa zilizosajiliwa pekee, dawa kutoka famasia yenye leseni” inakuwa sababu ya kubadilika']},
 {n:['Health shopping moves to the phone','Ununuzi wa afya unahamia kwenye simu'],u:['Mobile payments a year; online pharmacy','Malipo kwa simu kwa mwaka; famasia ya mtandaoni'],
  p:[[2024,'3.74bn','bilioni 3.74'],[2025,'6.31bn','bilioni 6.31'],[2026.86,'AfyaDepot online','AfyaDepot mtandaoni',1]],src:[8,19,20],
  a:['3.74 billion mobile payments (2024)','Malipo bilioni 3.74 kwa simu (2024)'],b:['6.31 billion (2025); an online pharmacy lists 1,239 products with delivery in Dar (November 2026)','Bilioni 6.31 (2025); famasia ya mtandaoni ina bidhaa 1,239 na usafirishaji Dar (Novemba 2026)'],
  w:['Families already buy health products online; the box adds the plan and the free check','Familia tayari zinanunua bidhaa za afya mtandaoni; boksi linaongeza mpango na kipimo cha bure']}];

/* ---------- timeline SVG (desktop and phone layouts) ---------- */
function tlSVG(mob){const l=lang(),Y0=2010,Y1=2027.6;
 const G=mob?{W:360,x0:14,x1:346,top:44,pitch:70,fs:11,nfs:14}:{W:1000,x0:300,x1:984,top:56,pitch:64,fs:12,nfs:15};
 const X=v=>G.x0+(v-Y0)/(Y1-Y0)*(G.x1-G.x0);
 const rowY=i=>G.top+i*G.pitch+(mob?34:0), H=G.top+ST.length*G.pitch+(mob?44:24), axY=H-(mob?28:30);
 const band=`<rect x="${X(2026)}" y="${G.top-30}" width="${X(Y1)-X(2026)}" height="${axY-(G.top-30)}" fill="var(--green-deep)"/>
  <text x="${X(Y1)}" y="${G.top-36}" text-anchor="end" font-size="${G.fs}" fill="var(--gold)">${E(T('Planned opening, 2026–27','Ufunguzi uliopangwa, 2026–27'))}</text>`;
 const ticks=(mob?[2010,2014,2018,2022,2026]:[2010,2012,2014,2016,2018,2020,2022,2024,2026]).map(y=>`<line x1="${X(y)}" y1="${axY}" x2="${X(y)}" y2="${axY+5}" stroke="var(--line)"/><text x="${X(y)}" y="${axY+20}" text-anchor="middle" font-size="${G.fs}" fill="var(--mute)">${y}</text>`).join('');
 const rows=ST.map((s,i)=>{const y=rowY(i),pts=s.p,data=pts.filter(q=>!q[3]),ev=pts.filter(q=>q[3]);
  const name=mob?`<text x="${G.x0}" y="${y-30}" font-size="${G.nfs}" font-weight="600" fill="var(--ink)">${E(T(...s.n))}</text>`
   :`<text x="0" y="${y-4}" font-size="${G.nfs}" font-weight="600" fill="var(--ink)">${E(T(...s.n))}</text><text x="0" y="${y+14}" font-size="${G.fs}" fill="var(--mute)">${E(T(...s.u))}</text>`;
  const first=pts[0][0],last=pts[pts.length-1][0];
  const line=`<line x1="${G.x0}" y1="${y}" x2="${G.x1}" y2="${y}" stroke="var(--line)"/><line x1="${X(first)}" y1="${y}" x2="${X(last)}" y2="${y}" stroke="var(--green)" stroke-width="2"/>`;
  const dot=(q,k,arr)=>{const isLast=k===arr.length-1;return `<circle cx="${X(q[0])}" cy="${y}" r="${mob?4:5}" fill="${isLast?'var(--gold)':'var(--green-edge)'}"/>`};
  const dia=q=>{const x=X(q[0]),r=mob?5:6;return `<path d="M${x} ${y-r}L${x+r} ${y}L${x} ${y+r}L${x-r} ${y}Z" fill="var(--bg)" stroke="var(--gold)" stroke-width="1.5"/>`};
  let lab='';const lbl=q=>q[l==='sw'?2:1];
  const txt=(x,yy,t,anc,col)=>`<text x="${x}" y="${yy}" text-anchor="${anc}" font-size="${G.fs}" fill="${col}">${E(t)}</text>`;
  const anc=x=>x>G.x1-50?'end':(x<G.x0+30?'start':'middle'), ax=x=>x>G.x1-50?x+6:x;
  if(data.length){const a=data[0],b=data[data.length-1],gap=X(b[0])-X(a[0]),lim=mob?95:110;
   if(data.length>1&&gap>=lim){lab+=txt(X(a[0]),y-11,lbl(a),anc(X(a[0])),'var(--mute)')+txt(ax(X(b[0])),y-11,lbl(b),anc(X(b[0])),'var(--gold)')}
   else if(data.length>1){lab+=txt(ax(X(b[0])),y-11,lbl(a)+' → '+lbl(b),'end','var(--gold)')}
   else lab+=txt(X(a[0]),y-11,lbl(a),anc(X(a[0])),'var(--gold)')}
  const evL=ev.filter(q=>lbl(q));evL.forEach((q,k)=>{const below=data.length>0||k%2===1;const x=X(q[0]);lab+=txt(ax(x)+(x>G.x1-50&&!below?0:0),below?y+20:y-11,lbl(q),anc(x),'var(--ink)')});
  return `<g>${name}${line}${data.map(dot).join('')}${ev.map(dia).join('')}${lab}</g>`}).join('');
 const title=T('Seven trend strands, 2010 to 2027: chronic disease, city growth, mobile money, internet, diaspora money, regulation and online health shopping all reach their latest published values between 2022 and 2026, ahead of the planned 2026–27 opening','Mienendo saba, 2010 hadi 2027: magonjwa sugu, ukuaji wa jiji, pesa kwa simu, intaneti, fedha za diaspora, udhibiti na ununuzi wa afya mtandaoni vyote vinafikia thamani zao za karibuni zilizochapishwa kati ya 2022 na 2026, kabla ya ufunguzi uliopangwa wa 2026–27');
 const id=mob?'s15tv':'s15th';
 return `<svg class="s15-tl ${mob?'s15-v':'s15-h'}" viewBox="0 0 ${G.W} ${H}" role="img" aria-labelledby="${id}"><title id="${id}">${E(title)}</title>${band}<line x1="${G.x0}" y1="${axY}" x2="${G.x1}" y2="${axY}" stroke="var(--line)"/>${ticks}${rows}</svg>`}

const CSS=`
.s15 figure.ab-visual{margin-left:0;margin-right:0}
.s15 .s15-tl{display:block;width:100%;height:auto}
.s15 .s15-v{display:none;max-width:480px}
@media (max-width:720px){.s15 .s15-h{display:none}.s15 .s15-v{display:block}}
.s15 figcaption,.s15 .s15-cap{margin-top:var(--s2);color:var(--mute);font-size:var(--fs-cap);max-width:var(--measure)}
.s15 .s15-key{display:flex;flex-wrap:wrap;gap:var(--s3);margin-top:var(--s2);color:var(--mute);font-size:var(--fs-cap)}
.s15 .s15-key span{display:inline-flex;align-items:center;gap:8px}
.s15 .ab-block>h2+*{margin-top:var(--s2)}
.s15 .ab-block>*+p,.s15 .ab-block>*+.ab-tw,.s15 .ab-block>*+ol{margin-top:var(--s2)}
.s15 table.ab-t td:first-child{min-width:160px}
.s15 table.ab-t td{min-width:150px}
.s15 table.ab-t td.s15-src{min-width:90px;white-space:nowrap}
.s15 ol.s15-ol{margin:var(--s2) 0 0;padding-left:22px;max-width:var(--measure)}.s15 ol.s15-ol li+li{margin-top:8px}
`;

function render(s,p,pv,nx){
 const key=`<div class="s15-key" aria-hidden="true"><span><svg width="12" height="12" viewBox="0 0 12 12"><circle cx="6" cy="6" r="5" fill="var(--green-edge)"/></svg>${L('Published figure','Takwimu iliyochapishwa')}</span><span><svg width="12" height="12" viewBox="0 0 12 12"><circle cx="6" cy="6" r="5" fill="var(--gold)"/></svg>${L('Latest figure','Takwimu ya karibuni')}</span><span><svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 1L13 7L7 13L1 7Z" fill="none" stroke="var(--gold)" stroke-width="1.5"/></svg>${L('Event','Tukio')}</span></div>`;
 const rows=ST.map((x,i)=>`<tr><td><b>${i+1}. ${L(...x.n)}</b></td><td>${L(...x.a)}</td><td>${L(...x.b)}</td><td>${L(...x.w)}</td><td class="s15-src">${srcs(x.src)}</td></tr>`).join('');
 return `<article class="ab-sec s15" aria-labelledby="h-s1-5"><style>${CSS}</style><div class="ab-wrap">
 <div class="ab-sec-no">${E(s.no)}</div><h1 id="h-s1-5">${E(s.title)}</h1>
 <p class="ab-summary">${L('A delivered monthly health membership needs four things at once: a large repeating need, customers who pay by phone, customers who order by phone, and a city dense enough to deliver to cheaply. Five years ago Tanzania had the first and the last. Today it has all four: 80.98 million mobile-money accounts, 58.9 million internet subscriptions, TSh 3.3 trillion a year sent home from abroad, and families already buying health products online. Seven trends meet just before the first store opens.','Uanachama wa afya wa kila mwezi unaoletwa nyumbani unahitaji mambo manne kwa wakati mmoja: hitaji kubwa linalojirudia, wateja wanaolipa kwa simu, wateja wanaoagiza kwa simu, na jiji lenye msongamano wa kutosha kufikisha bidhaa kwa gharama nafuu. Miaka mitano iliyopita Tanzania ilikuwa na la kwanza na la mwisho. Leo ina yote manne: akaunti milioni 80.98 za pesa kwa simu, usajili milioni 58.9 wa intaneti, TSh trilioni 3.3 kwa mwaka zinazotumwa nyumbani kutoka nje ya nchi, na familia ambazo tayari zinanunua bidhaa za afya mtandaoni. Mienendo saba inakutana muda mfupi kabla duka la kwanza halijafunguliwa.')}</p>

 <figure class="ab-visual">
  ${tlSVG(false)}${tlSVG(true)}
  ${key}
  <figcaption>${L('Each dot is a published figure, placed in the year it describes; the line runs from the earliest to the latest figure used here. The diabetes series is a model estimate (IDF); the others are official counts or reported events. Sources for every strand are in the table below.','Kila nukta ni takwimu iliyochapishwa, imewekwa katika mwaka inaoueleza; mstari unaanzia takwimu ya kwanza hadi ya karibuni iliyotumika hapa. Mfululizo wa kisukari ni makadirio ya modeli (IDF); mingine ni hesabu rasmi au matukio yaliyoripotiwa. Vyanzo vya kila mwenendo viko kwenye jedwali hapa chini.')}</figcaption>
 </figure>

 <div class="ab-body">
  <section class="ab-block">
   <h2>${L('Timing decides whether the model works','Muda ndio unaoamua kama modeli inafanya kazi')}</h2>
   <p>${T(`A monthly health box delivered to the door needs customers who pay by phone, order by phone and trust delivery. In 2018 Tanzania had 23.8 million internet subscriptions${cite(9)}; as late as 2021 it had 35.3 million mobile-money accounts${cite(5)}. By March 2026 there were 80.98 million mobile-money accounts and 58.9 million internet subscriptions, with smartphone penetration at 42.5%${cite(8)}. There are more mobile-money accounts than people, because many adults hold more than one.`,`Boksi la afya la kila mwezi linaloletwa mlangoni linahitaji wateja wanaolipa kwa simu, wanaoagiza kwa simu na wanaoamini usafirishaji. Mwaka 2018 Tanzania ilikuwa na usajili milioni 23.8 wa intaneti${cite(9)}; hadi mwaka 2021 ilikuwa na akaunti milioni 35.3 za pesa kwa simu${cite(5)}. Kufikia Machi 2026 kulikuwa na akaunti milioni 80.98 za pesa kwa simu na usajili milioni 58.9 wa intaneti, na simu janja zilifikia asilimia 42.5${cite(8)}. Akaunti za pesa kwa simu ni nyingi kuliko watu, kwa sababu watu wazima wengi wana zaidi ya moja.`)}</p>
   <p>${T(`The need keeps growing. The IDF model estimates that adults with diabetes rose from 472,900 in 2011 to 2.93 million in 2024${cite(1)}, and almost one adult in four has raised blood pressure (2023)${cite(2)}. The Dar es Salaam region grew from about 2.49 million people in 2002 to 5.38 million in 2022, an increase of 116%${cite(3)}. Density favours a model that brings the purchase to the household rather than the household to the purchase.`,`Hitaji linaendelea kukua. Modeli ya IDF inakadiria kuwa watu wazima wenye kisukari waliongezeka kutoka 472,900 mwaka 2011 hadi milioni 2.93 mwaka 2024${cite(1)}, na karibu mtu mzima mmoja kati ya wanne ana shinikizo la juu la damu (2023)${cite(2)}. Mkoa wa Dar es Salaam ulikua kutoka takriban watu milioni 2.49 mwaka 2002 hadi milioni 5.38 mwaka 2022, ongezeko la asilimia 116${cite(3)}. Msongamano unapendelea modeli inayopeleka bidhaa kwa kaya badala ya kaya kwenda kutafuta bidhaa.`)}</p>
  </section>

  <section class="ab-block">
   <h2>${L('Seven trends, and what each one unlocks','Mienendo saba, na kila mmoja unawezesha nini')}</h2>
   <div class="ab-tw"><table class="ab-t"><thead><tr><th>${L('Trend','Mwenendo')}</th><th>${L('Earliest figure used','Takwimu ya kwanza iliyotumika')}</th><th>${L('Latest figure','Takwimu ya karibuni')}</th><th>${L('What it unlocks for Afya Basics','Unaiwezesha nini Afya Basics')}</th><th>${L('Sources','Vyanzo')}</th></tr></thead><tbody>${rows}</tbody></table></div>
  </section>

  <section class="ab-block">
   <h2>${L('Mobile money: what works today, and what does not yet','Pesa kwa simu: kinachofanya kazi leo, na kisichofanya bado')}</h2>
   <p>${T(`Paying a shop by phone is already normal. Registered merchants more than doubled to 2.79 million in 2025, driven by the national TANQR pay number${cite(16)}. Vodacom alone reports more than 470,000 merchants accepting LIPA kwa Simu, with payments averaging more than TSh 1 trillion a month${cite(18)}. At the Afya counter, a member approves a payment request on her own phone and the receipt follows by SMS.`,`Kulipa duka kwa simu tayari ni jambo la kawaida. Wafanyabiashara waliosajiliwa waliongezeka zaidi ya mara mbili hadi milioni 2.79 mwaka 2025, wakichochewa na namba ya taifa ya malipo ya TANQR${cite(16)}. Vodacom peke yake inaripoti wafanyabiashara zaidi ya 470,000 wanaopokea LIPA kwa Simu, na malipo ya wastani ya zaidi ya TSh trilioni 1 kwa mwezi${cite(18)}. Kwenye kaunta ya Afya, mwanachama anaidhinisha ombi la malipo kwenye simu yake mwenyewe na risiti inafuata kwa SMS.`)}</p>
   <p>${T(`Fully automatic monthly collection is not yet a normal service in Tanzania. The Bank of Tanzania still lists standing orders for subscriptions as a future enhancement${cite(16)}, and its direct-debit service has been in development since 2022${cite(17)}. Afya Basics therefore plans on what works on every network today: on renewal day the member receives a payment request and approves it with a PIN, after reminders three days and one day before, with one more try two days later. The strongest defence against members leaving is the 6-month (Gold) or 12-month (Platinum) plan paid up front, which replaces six or twelve monthly approvals with one. Afya will move to an automatic mandate where an operator offers one.`,`Makusanyo ya kiotomatiki kabisa ya kila mwezi bado si huduma ya kawaida Tanzania. Benki Kuu ya Tanzania bado inataja maagizo ya kudumu kwa usajili kama maboresho ya baadaye${cite(16)}, na huduma yake ya makato ya moja kwa moja imekuwa ikiandaliwa tangu 2022${cite(17)}. Kwa hiyo Afya Basics inapanga kutumia kinachofanya kazi kwenye kila mtandao leo: siku ya kuhuisha mwanachama anapokea ombi la malipo na kuliidhinisha kwa PIN, baada ya vikumbusho siku tatu na siku moja kabla, na jaribio moja zaidi siku mbili baadaye. Kinga imara zaidi dhidi ya wanachama kuondoka ni mpango wa miezi 6 (Gold) au miezi 12 (Platinum) unaolipwa mapema, unaobadilisha idhini sita au kumi na mbili za kila mwezi kuwa moja. Afya itahamia kwenye makato ya kiotomatiki pale mtoa huduma atakapoyatoa.`)}</p>
  </section>

  <section class="ab-block">
   <h2>${L('Families already buy health products online','Familia tayari zinanunua bidhaa za afya mtandaoni')}</h2>
   <p>${T(`AfyaDepot, an online pharmacy and health shop in Dar es Salaam, lists 1,239 product pages on its site${cite(19)} and offers free delivery on pharmacy orders above TSh 150,000 in Dar${cite(20)}. Its prices are public: 42 Softcare medium nappies cost TSh 17,000 and 80 small cost TSh 26,000${cite(21)}. It is the clearest market signal that households in the city already choose health products on a screen and accept delivery.`,`AfyaDepot, famasia na duka la afya la mtandaoni jijini Dar es Salaam, ina kurasa 1,239 za bidhaa kwenye tovuti yake${cite(19)} na inatoa usafirishaji wa bure kwa oda za famasia zinazozidi TSh 150,000 ndani ya Dar${cite(20)}. Bei zake ziko wazi: nepi 42 za Softcare saizi ya kati zinagharimu TSh 17,000 na 80 za saizi ndogo TSh 26,000${cite(21)}. Hii ndiyo ishara iliyo wazi zaidi ya soko kwamba kaya za jiji tayari zinachagua bidhaa za afya kwenye skrini na kukubali kuletewa.`)}</p>
   <p>${L('An online shop answers one order at a time. It does not plan the household’s month, take a blood-pressure reading or carry the household and baby-care goods that make up much of a box. Afya Basics uses AfyaDepot’s published prices as a benchmark for its own shelf prices (section 5.3), not as a model to copy.','Duka la mtandaoni linajibu oda moja kwa wakati. Halipangi mwezi wa kaya, halipimi shinikizo la damu, wala halina bidhaa za nyumbani na za kumtunza mtoto ambazo ni sehemu kubwa ya boksi. Afya Basics inatumia bei zilizochapishwa za AfyaDepot kama kipimo cha kulinganisha bei zake za rafu (sehemu 5.3), si kama modeli ya kunakili.')}</p>
  </section>

  <section class="ab-block">
   <h2>${L('Money from abroad, looking for proof','Fedha kutoka nje ya nchi, zinazotafuta uthibitisho')}</h2>
   <p>${T(`Tanzanians abroad sent home TSh 3.3 trillion in 2024/25${cite(11)}, about US$1.25 billion at US$1 = TSh 2,642.50 (Bank of Tanzania, 10 Nov 2026)${cite(23)}. Cross-border mobile-money inflows rose 33% to TSh 698 billion${cite(12)}. Much of this money is meant for the care of parents and relatives, yet the sender cannot see whether it became care. A box ordered and paid for from abroad, delivered to a parent’s door and confirmed with a photograph, turns a cash transfer into a visible result.`,`Watanzania walioko nje ya nchi walituma nyumbani TSh trilioni 3.3 mwaka 2024/25${cite(11)}, takriban dola za Marekani bilioni 1.25 kwa US$1 = TSh 2,642.50 (Benki Kuu ya Tanzania, 10 Nov 2026)${cite(23)}. Fedha za simu zinazoingia kutoka nje ziliongezeka kwa asilimia 33 hadi TSh bilioni 698${cite(12)}. Sehemu kubwa ya fedha hizi inakusudiwa kuwahudumia wazazi na ndugu, lakini mtumaji hawezi kuona kama zimegeuka kuwa huduma. Boksi linaloagizwa na kulipiwa kutoka nje, likifikishwa mlangoni kwa mzazi na kuthibitishwa kwa picha, linageuza uhamisho wa fedha kuwa matokeo yanayoonekana.`)}</p>
   <p>${L('A sensitivity, not a forecast: TSh 3.3 trillion a year is about TSh 275 billion a month, so every 0.1% of that flow redirected into care boxes would be about TSh 275 million a month. The plan does not depend on diaspora sales; the figure shows that even a very small share would matter to a single store.','Ni kipimo cha unyeti, si utabiri: TSh trilioni 3.3 kwa mwaka ni takriban TSh bilioni 275 kwa mwezi, hivyo kila asilimia 0.1 ya mtiririko huo ikielekezwa kwenye maboksi ya huduma ingekuwa takriban TSh milioni 275 kwa mwezi. Mpango hautegemei mauzo kwa diaspora; takwimu hii inaonyesha kwamba hata sehemu ndogo sana ingekuwa na maana kwa duka moja.')}</p>
  </section>

  <section class="ab-block">
   <h2>${L('The regulator is raising the bar','Mdhibiti anapandisha kiwango')}</h2>
   <p>${T(`In 2019/20 a special TMDA market inspection removed counterfeit products${cite(13)}. In June 2026 TMDA committed to stronger action against counterfeit medicines${cite(14)}, and in September 2026 it seized unregistered medicines worth TSh 360 million at Dar es Salaam’s international airport${cite(15)}. Universal health insurance began its nationwide roll-out in January 2026${cite(22)}.`,`Mwaka 2019/20 ukaguzi maalum wa soko wa TMDA uliondoa bidhaa bandia${cite(13)}. Mwezi Juni 2026 TMDA iliahidi hatua kali zaidi dhidi ya dawa bandia${cite(14)}, na mwezi Septemba 2026 ilikamata dawa zisizosajiliwa zenye thamani ya TSh milioni 360 katika uwanja wa ndege wa kimataifa wa Dar es Salaam${cite(15)}. Bima ya afya kwa wote ilianza kutekelezwa nchi nzima mwezi Januari 2026${cite(22)}.`)}</p>
   <p>${L('For Afya Basics this turns compliance into a selling point. Every product on its shelf is registered, and it sells no medicines: they come only from the licensed partner pharmacy, under its own permit and pharmacist. Families who have read about seizures have a clear reason to prefer that.','Kwa Afya Basics hili linageuza kufuata sheria kuwa sababu ya kuuza. Kila bidhaa kwenye rafu yake imesajiliwa, na haiuzi dawa: zinatoka kwa famasia mshirika yenye leseni pekee, kwa kibali chake na mfamasia wake. Familia zilizosoma kuhusu ukamataji wa dawa zina sababu iliyo wazi ya kupendelea hilo.')}</p>
  </section>

  <section class="ab-block">
   <h2>${L('Why the window will not stay open','Kwa nini dirisha halitabaki wazi')}</h2>
   <p>${L('These trends are public, so every competitor can read them. What cannot be copied quickly is a monthly habit. A household that has saved its list, its sizes and its delivery day with one store, and has received its box on time for a year, has little reason to rebuild that with another. The first trusted brand to organise health essentials around the household is likely to keep the households it wins, which is why timing matters more than scale at this stage.','Mienendo hii ni ya wazi, hivyo kila mshindani anaweza kuisoma. Kisichoweza kunakiliwa haraka ni mazoea ya kila mwezi. Kaya iliyohifadhi orodha yake, saizi zake na siku yake ya kuletewa kwa duka moja, na imepokea boksi lake kwa wakati kwa mwaka mzima, haina sababu kubwa ya kuanza upya na duka lingine. Chapa ya kwanza inayoaminika kupanga mahitaji ya afya kuzunguka kaya ina uwezekano wa kubaki na kaya inazozipata, ndiyo maana muda ni muhimu kuliko ukubwa katika hatua hii.')}</p>
   <p>${L('The investment is well timed rather than early. The behaviours the model depends on, paying by phone, ordering by message and accepting delivery, are already established at national scale; the plan does not need to create them.','Uwekezaji huu uko kwa wakati sahihi, si mapema mno. Tabia ambazo modeli inazitegemea, kulipa kwa simu, kuagiza kwa ujumbe na kukubali kuletewa nyumbani, tayari zimeimarika kitaifa; mpango hauhitaji kuziunda.')}</p>
  </section>
 </div>

 <section class="ab-block"><h2>${L('Key figures','Takwimu muhimu')}</h2>
  ${A().figsHTML([
   {v:T('80.98M','milioni 80.98'),l:T('Mobile-money accounts, March 2026','Akaunti za pesa kwa simu, Machi 2026'),s:L('TCRA via TanzaniaInvest','TCRA kupitia TanzaniaInvest')},
   {v:T('58.9M · 42.5%','milioni 58.9 · 42.5%'),l:T('Internet subscriptions and smartphone penetration, March 2026','Usajili wa intaneti na kiwango cha simu janja, Machi 2026'),s:L('TCRA via TanzaniaInvest','TCRA kupitia TanzaniaInvest')},
   {v:T('TSh 3.3T','TSh trilioni 3.3'),l:T('Sent home by the diaspora, 2024/25','Zilizotumwa nyumbani na diaspora, 2024/25'),s:L('Government to Parliament, via The Citizen','Serikali kwa Bunge, kupitia The Citizen')},
   {v:T('2.79M','milioni 2.79'),l:T('Merchants accepting digital payment, 2025','Wafanyabiashara wanaopokea malipo ya kidijitali, 2025'),s:L('Bank of Tanzania, payment systems report 2025','Benki Kuu ya Tanzania, ripoti ya mifumo ya malipo 2025')}])}
 </section>

 ${A().openHTML([
  L('Whether Vodacom’s M-Pesa direct-debit mandate is available to a retail merchant, and at what fee, is being confirmed with Vodacom. The merchant fees of the other wallets and a written aggregator rate card are also still to come.','Kama makato ya moja kwa moja ya M-Pesa ya Vodacom yanapatikana kwa mfanyabiashara wa rejareja, na kwa ada gani, kunathibitishwa na Vodacom. Ada za wafanyabiashara za pochi nyingine za simu na orodha ya bei iliyoandikwa ya mjumuishaji wa malipo bado zinasubiriwa.'),
  L('AfyaDepot’s delivery terms: the site banner gives free delivery above TSh 150,000; an earlier figure of TSh 250,000 and a same-day promise could not be confirmed, because the delivery policy page no longer opens.','Masharti ya usafirishaji ya AfyaDepot: bango la tovuti linatoa usafirishaji wa bure kwa oda zinazozidi TSh 150,000; takwimu ya awali ya TSh 250,000 na ahadi ya siku hiyohiyo hazikuweza kuthibitishwa, kwa sababu ukurasa wa sera ya usafirishaji haufunguki tena.'),
  L('Willingness to pay for convenience in the store’s catchment is a hypothesis. The pre-opening interviews and the first months of one-off kits and free checks test it.','Utayari wa kulipia urahisi katika eneo la duka ni dhana. Mahojiano kabla ya kufungua na miezi ya kwanza ya vifurushi vya mara moja na vipimo vya bure vitaipima.'),
  L('The remittance figures come from press reports of official data, and the diaspora is an extra channel, not the base of the plan. How universal health insurance will treat home health essentials is not yet known.','Takwimu za fedha za diaspora zinatoka kwenye ripoti za vyombo vya habari kuhusu takwimu rasmi, na diaspora ni njia ya ziada, si msingi wa mpango. Jinsi bima ya afya kwa wote itakavyoshughulikia mahitaji ya afya ya nyumbani bado haijulikani.')])}

 <div id="abSrc">${A().sourcesHTML(SRC())}</div>
 ${A().pagerHTML(pv,nx)}
 </div></article>`}

window.SECTIONS['s1-5']={render,init(){},v2:true};
})();
