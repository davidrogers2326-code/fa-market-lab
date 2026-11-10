/* 3.3 The Afya Check Station · v2 on the D2 template.
   Kiosk facts: research/R2-kiosk.md (approved 10 Nov 2026, decision D-13: basic tier, 7 measurements, bought through a
   TMDA-registered local dealer). TMDA class and fee: research/R1-compliance.md. Rate: research/fx.md (US$1 = TSh 2,642.50, BoT 10 Nov 2026).
   Funnel, capacity and running cost read from MODEL (follows the funding switch). The demo uses plainly labelled example values. */
(function(){
'use strict';
const A=()=>window.AB,T=(e,s)=>A().T(e,s),E=s=>A().E(s),L=(e,s)=>E(T(e,s));
const lang=()=>window.AFYA_LANG==='sw'?'sw':'en';
const nf=n=>Math.round(n).toLocaleString('en-US');
const tsh=n=>'TSh '+nf(n);
const tshM=n=>'TSh '+(n/1e6).toFixed(1).replace(/\.0$/,'')+(lang()==='sw'?' milioni':'M');
const rM=(a,b)=>'TSh '+a+'–'+b+(lang()==='sw'?' milioni':'M');
const est=()=>`<span class="ab-est">${L('estimate','makadirio')}</span>`;
const exm=()=>`<span class="ab-est">${L('example','mfano')}</span>`;
const FX='2,642.50',FXD=()=>T('BoT, 10 Nov 2026','BoT, 10 Nov 2026');
const usd=u=>`US$${u} × ${FX} (${FXD()})`;

/* ---------- sources (opened and checked as dated) ---------- */
const SRC=()=>[
 {t:T('Mayige et al., Tanzania Journal of Health Research 27(2), 2026: hypertension among adults aged 18–69, 2023 National STEPS survey','Mayige na wenzake, Tanzania Journal of Health Research 27(2), 2026: shinikizo la juu la damu kwa watu wazima wa miaka 18–69, utafiti wa kitaifa wa STEPS 2023'),u:'https://nhrdr.nimr.or.tz/records/209',chk:'9 Nov 2026'},
 {t:T('WHO, United Republic of Tanzania hypertension country profile (2012 STEPS survey, adults aged 25–64)','WHO, wasifu wa nchi kuhusu shinikizo la juu la damu, Jamhuri ya Muungano wa Tanzania (utafiti wa STEPS 2012, watu wazima wa miaka 25–64)'),u:'https://cdn.who.int/media/docs/default-source/country-profiles/hypertension/tza_en.pdf',chk:'9 Nov 2026'},
 {t:T('Zhengzhou Dingheng DHM-900C health station, Made-in-China.com listing (US$1,600 for 1–49 sets)','Kituo cha afya Zhengzhou Dingheng DHM-900C, tangazo la Made-in-China.com (US$1,600 kwa seti 1–49)'),u:'https://www.made-in-china.com/video-channel/dingheng_OGcpeLguXNrV_Dhm-900c-Physical-Training-Health-Station-with-and-Secure-Data-Transfer-for-Paperless-Records.html',chk:'9 Nov 2026'},
 {t:T('Henan Lejia (Leka) HW-900G health check kiosk, Made-in-China.com listing (US$1,155–1,255)','Kibanda cha kupima afya Henan Lejia (Leka) HW-900G, tangazo la Made-in-China.com (US$1,155–1,255)'),u:'https://www.made-in-china.com/video-channel/lekascale_BOQtqHLynZRA_Hw-900g-Multi-Functions-Self-Health-Check-up-Physical-Examination-Kiosk.html',chk:'9 Nov 2026'},
 {t:T('Zhengzhou Dingheng DHM-T90 clinic kiosk, Made-in-China.com listing (US$2,700 for 1–49 sets)','Kibanda cha kliniki Zhengzhou Dingheng DHM-T90, tangazo la Made-in-China.com (US$2,700 kwa seti 1–49)'),u:'https://www.made-in-china.com/video-channel/dingheng_OTgYNrnlYhRe_Smart-Drugstore-Clinic-Kiosk-for-Health-Assessments-and-Services.html',chk:'9 Nov 2026'},
 {t:T('Zhengzhou Shanghe health checkup kiosk, Made-in-China.com listing (US$4,490–4,990, higher-finish benchmark)','Kibanda cha kupima afya Zhengzhou Shanghe, tangazo la Made-in-China.com (US$4,490–4,990, kipimo cha ulinganisho cha hadhi ya juu)'),u:'https://www.made-in-china.com/video-channel/zzshdz_vQupGNqKLBhZ_China-Factory-Price-Health-Checkup-Machine-Touch-Screen-Monitor-Vending-Hospital-Self-Service-Kiosk-Body-Fat-Analysis.html',chk:'9 Nov 2026'},
 {t:T('TRA, EAC Common External Tariff 2022, updated June 2025: HS 9018.19.00 at 0% duty (p. 519)','TRA, Ushuru wa Pamoja wa Forodha wa EAC 2022, toleo la Juni 2025: HS 9018.19.00 ushuru 0% (uk. 519)'),u:'https://www.tra.go.tz/images/uploads/pages/CET_2022_VERSION_Updated_June_2025.pdf',chk:'9 Nov 2026'},
 {t:T('TRA, Value Added Tax: standard rate 18%','TRA, Kodi ya Ongezeko la Thamani: kiwango cha kawaida 18%'),u:'https://www.tra.go.tz/page/value-added-tax-vat',chk:'9 Nov 2026'},
 {t:T('TRA, Finance Act 2024, s.75: Railway Development Levy raised to 2%','TRA, Sheria ya Fedha 2024, kif. 75: Tozo ya Maendeleo ya Reli imepandishwa hadi 2%'),u:'https://www.tra.go.tz/images/uploads/acts/Finance_Act_2024_%281%29.pdf',chk:'9 Nov 2026'},
 {t:T('TBS, HS codes regulated under the PVoC scheme, March 2025 (no 9018 or 8423 codes)','TBS, misimbo ya HS inayodhibitiwa chini ya mpango wa PVoC, Machi 2025 (hakuna misimbo 9018 wala 8423)'),u:'https://www.tbs.go.tz/uploads/text-editor/files/PVoC%20HS%20Codes%2029%20March%202025_1785233045.pdf',chk:'9 Nov 2026'},
 {t:T('TMDA, Fees and Charges (Amendment) Regulations 2024: medical device registration, Class B, US$2,500; retention US$200 a year','TMDA, Kanuni za Ada na Tozo (Marekebisho) 2024: usajili wa kifaa tiba Daraja B, US$2,500; ada ya kuendeleza usajili US$200 kwa mwaka'),u:'https://www.tmda.go.tz/uploads/1718887575-FEES%20AND%20CHARGES%20AMENDMENT%20JUNE%202024%20FINAL.pdf',chk:'9 Nov 2026'},
 {t:T('TMDA, Compendium of guidelines for marketing authorisation of medical devices, June 2024: Rule 10(i)(c), vital-sign readings in routine checkups are Class B','TMDA, Mkusanyiko wa miongozo ya idhini ya kuuza vifaa tiba, Juni 2024: Kanuni 10(i)(c), vipimo vya dalili muhimu za mwili katika uchunguzi wa kawaida ni Daraja B'),u:'https://www.tmda.go.tz/uploads/publications/en1755088789-Compendium%20of%20Guidelines%20for%20Marketing%20Authorization%20of%20Medical%20Devices,%20Diagnostics%20and%20Laboratory%20Equipment,%20June%202024.pdf',chk:'9 Nov 2026'},
 {t:T('TMDA, Guidelines for importation and exportation of medical devices, Rev 02, May 2024','TMDA, Miongozo ya kuingiza na kusafirisha nje vifaa tiba, toleo la 02, Mei 2024'),u:'https://www.tmda.go.tz/uploads/publications/en1755006678-en1728063896-GUIDELINES%20FOR%20IMPORTATION%20AND%20EXPORTATION%20OF%20MEDICAL%20DEVICES%20-%2017.05%20(1).pdf',chk:'9 Nov 2026'},
 {t:T('Bank of Tanzania, exchange rates: US$1 = TSh 2,642.50 (mean rate, trading date 10 Nov 2026)','Benki Kuu ya Tanzania, viwango vya kubadilisha fedha: US$1 = TSh 2,642.50 (kiwango cha wastani, tarehe ya biashara 10 Nov 2026)'),u:'https://www.bot.go.tz/ExchangeRate/excRates',chk:'9 Nov 2026'},
 {t:T('WHO fact sheet, 25 September 2025: Hypertension (140/90 mmHg, confirmed on two different days)','Taarifa ya WHO, 25 Septemba 2025: Shinikizo la juu la damu (140/90 mmHg, likithibitishwa siku mbili tofauti)'),u:'https://www.who.int/news-room/fact-sheets/detail/hypertension'},
 {t:T('Mayo Clinic: Hypertensive crisis, what are the symptoms? (180/120 mmHg)','Mayo Clinic: Dharura ya shinikizo la damu, dalili zake ni zipi? (180/120 mmHg)'),u:'https://www.mayoclinic.org/diseases-conditions/high-blood-pressure/expert-answers/hypertensive-crisis/faq-20058491'},
 {t:T('Gloucestershire Hospitals NHS Foundation Trust: pulse oximeter guide, when to seek help by oxygen level','Gloucestershire Hospitals NHS Foundation Trust: mwongozo wa kipima oksijeni, wakati wa kutafuta msaada kulingana na kiwango cha oksijeni'),u:'https://www.gloshospitals.nhs.uk/media/documents/Pulse_Oximeter_ED_how_to_guide_FINAL_VERSION.pdf'},
 {t:T('Afriwise, 18 September 2025: consent under the Tanzania personal data protection laws (health data is sensitive data)','Afriwise, 18 Septemba 2025: ridhaa chini ya sheria za ulinzi wa taarifa binafsi Tanzania (taarifa za afya ni taarifa nyeti)'),u:'https://www.afriwise.com/blog/what-does-consent-look-like-under-the-tanzania-personal-data-protection-laws'},
 {t:T('Afya Basics financial model v1.2, base case (planning estimates)','Modeli ya fedha ya Afya Basics v1.2, hali ya msingi (makadirio ya mipango)'),u:''}];
const cite=n=>`<sup><a href="#abSrc" class="ab-cite" aria-label="${L('Source','Chanzo')} ${n}">${n}</a></sup>`;

/* ---------- the 7 measurements (R2 section 4 and 6) ---------- */
const MEAS=[
 ['Height','Urefu','Ultrasonic sensor at the top of the column','Kihisi cha mawimbi sauti juu ya nguzo','Needed for BMI.','Kinahitajika kupata BMI.'],
 ['Weight','Uzito','Load cells in the platform, 0.1 kg steps','Vihisi uzito ndani ya jukwaa, hatua za kilo 0.1','The simplest number to follow from month to month, saved only with consent.','Namba rahisi zaidi kufuatilia mwezi hadi mwezi, inahifadhiwa kwa ridhaa tu.'],
 ['Body mass index (BMI)','Uwiano wa uzito na urefu (BMI)','Calculated: weight in kg ÷ (height in m)²','Hukokotolewa: uzito kwa kilo ÷ (urefu kwa mita)²','A first screen for underweight and overweight.','Uchunguzi wa awali wa uzito pungufu na uzito uliozidi.'],
 ['Body composition: body fat %, muscle mass, body water %','Muundo wa mwili: asilimia ya mafuta mwilini, uzito wa misuli, asilimia ya maji mwilini','Eight electrodes in the grips and foot plates pass a tiny, painless current (bioimpedance); the values are estimates','Elektrodi nane kwenye vishikio na sahani za miguu zinapitisha mkondo mdogo usio na maumivu; thamani hizi ni makadirio','Shows what weight alone hides. Skipped by anyone with a pacemaker or other implanted device, and by pregnant women.','Inaonyesha kile ambacho uzito peke yake unaficha. Hakifanywi kwa mtu mwenye kifaa cha kusaidia moyo au kifaa kingine kilichopandikizwa mwilini, wala kwa wanawake wajawazito.'],
 ['Blood pressure (with pulse)','Shinikizo la damu (pamoja na mapigo ya moyo)','Automatic upper-arm cuff, seated, using a clinically validated module','Mkanda wa kiotomatiki wa mkono wa juu, ukiwa umeketi, kwa moduli iliyothibitishwa kitabibu','The main reason the station exists: most people with high blood pressure feel nothing.','Sababu kuu ya kituo hiki kuwepo: watu wengi wenye shinikizo la juu la damu hawahisi chochote.'],
 ['Blood oxygen (SpO2)','Kiwango cha oksijeni kwenye damu (SpO2)','Fingertip sensor, read while the cuff measures','Kihisi cha ncha ya kidole, kinasoma wakati mkanda unapima','A low value can point to a lung or heart problem that needs a clinician.','Kiwango cha chini kinaweza kuashiria tatizo la mapafu au moyo linalohitaji mtaalamu wa afya.'],
 ['Body temperature','Joto la mwili','Non-contact infrared thermometer','Kipima joto cha mionzi isiyoonekana bila kugusa','A fever changes the advice, and is a reason to repeat a high blood pressure on another day.','Homa inabadilisha ushauri, na ni sababu ya kurudia kupima shinikizo la juu siku nyingine.']];

/* ---------- the flow (order from R2 section 4; only the two totals are given, both estimates) ---------- */
const STEPS=[
 {en:['Start','and consent'],sw:['Anza','na ridhaa'],m:''},
 {en:['Stand on','the platform'],sw:['Simama','jukwaani'],m:'1 · 2 · 3'},
 {en:['Hold the','grips'],sw:['Shika','vishikio'],m:'4'},
 {en:['Temperature,','no contact'],sw:['Joto,','bila kugusa'],m:'7'},
 {en:['Sit: cuff','and finger'],sw:['Keti: mkanda','na kidole'],m:'5 · 6'},
 {en:['Result','printed or QR'],sw:['Matokeo','karatasi au QR'],m:''},
 {en:['Adviser','explains'],sw:['Mshauri','anaeleza'],m:''}];

function flowSVG(v){const S=STEPS,l=lang(),q=T('Quick check ≈ 50 s','Kipimo cha haraka ≈ sek. 50'),f=T('Full check ≈ 2–3 min','Kipimo kamili ≈ dak. 2–3'),ms=T('Measurements','Vipimo');
 if(!v){const W=1000,x=i=>70+i*142,cy=150;
  const nodes=S.map((s,i)=>`<g><circle cx="${x(i)}" cy="${cy}" r="22" fill="${i===6?'none':'var(--green)'}" stroke="${i===6?'var(--green-edge)':'var(--green)'}" stroke-width="1.5"/><text x="${x(i)}" y="${cy+6}" text-anchor="middle" font-size="16" font-weight="600" fill="var(--ink)">${i+1}</text>
   ${s[l].map((t,k)=>`<text x="${x(i)}" y="${cy+50+k*20}" text-anchor="middle" font-size="15" fill="var(--ink)">${E(t)}</text>`).join('')}
   ${s.m?`<text x="${x(i)}" y="${cy+100}" text-anchor="middle" font-size="13" fill="var(--gold)">${E(s.m)}</text>`:''}</g>`).join('');
  const line=`<line x1="${x(0)}" y1="${cy}" x2="${x(5)}" y2="${cy}" stroke="var(--line)" stroke-width="2"/><line x1="${x(5)}" y1="${cy}" x2="${x(6)}" y2="${cy}" stroke="var(--line)" stroke-width="2" stroke-dasharray="5 5"/>`;
  const br=(a,b,y,t)=>`<path d="M${x(a)-22} ${y+12}V${y}H${x(b)+22}V${y+12}" fill="none" stroke="var(--mute)" stroke-width="1"/><text x="${(x(a)+x(b))/2}" y="${y-8}" text-anchor="middle" font-size="15" fill="var(--gold)">${E(t)}</text>`;
  return `<svg class="s33-flow s33-h" viewBox="0 0 ${W} 280" role="img" aria-labelledby="s33ft"><title id="s33ft">${L('The Afya Check flow in seven steps: quick check about 50 seconds, full check about 2 to 3 minutes, then an adviser explains','Mtiririko wa Afya Check kwa hatua saba: kipimo cha haraka takriban sekunde 50, kipimo kamili takriban dakika 2 hadi 3, kisha mshauri anaeleza')}</title>
   ${br(0,3,88,q)}${br(0,5,34,f)}${line}${nodes}<text x="0" y="${cy+100}" font-size="13" fill="var(--mute)">${E(ms)}</text></svg>`}
 const H=640,y=i=>40+i*84,cx=34;
 const nodes=S.map((s,i)=>`<g><circle cx="${cx}" cy="${y(i)}" r="18" fill="${i===6?'none':'var(--green)'}" stroke="${i===6?'var(--green-edge)':'var(--green)'}" stroke-width="1.5"/><text x="${cx}" y="${y(i)+5}" text-anchor="middle" font-size="15" font-weight="600" fill="var(--ink)">${i+1}</text>
  <text x="66" y="${y(i)-2}" font-size="16" fill="var(--ink)">${E(s[l][0])}</text><text x="66" y="${y(i)+18}" font-size="16" fill="var(--ink)">${E(s[l][1])}</text>
  ${s.m?`<text x="214" y="${y(i)+6}" font-size="14" fill="var(--gold)">${E(s.m)}</text>`:''}</g>`).join('');
 const line=`<line x1="${cx}" y1="${y(0)}" x2="${cx}" y2="${y(5)}" stroke="var(--line)" stroke-width="2"/><line x1="${cx}" y1="${y(5)}" x2="${cx}" y2="${y(6)}" stroke="var(--line)" stroke-width="2" stroke-dasharray="5 5"/>`;
 const br=(a,b,xx,t)=>`<path d="M${xx-10} ${y(a)-18}H${xx}V${y(b)+18}H${xx-10}" fill="none" stroke="var(--mute)" stroke-width="1"/><text transform="translate(${xx+16} ${(y(a)+y(b))/2}) rotate(90)" text-anchor="middle" font-size="14" fill="var(--gold)">${E(t)}</text>`;
 return `<svg class="s33-flow s33-v" viewBox="0 0 340 ${H}" role="img" aria-labelledby="s33fv"><title id="s33fv">${L('The Afya Check flow in seven steps: quick check about 50 seconds, full check about 2 to 3 minutes, then an adviser explains','Mtiririko wa Afya Check kwa hatua saba: kipimo cha haraka takriban sekunde 50, kipimo kamili takriban dakika 2 hadi 3, kisha mshauri anaeleza')}</title>
  ${line}${nodes}${br(0,3,262,q)}${br(0,5,306,f)}<text x="214" y="14" font-size="12" fill="var(--mute)">${E(ms)}</text></svg>`}

/* ---------- demo: example values only ---------- */
const DEMO_STEPS=[ /* [en, sw, start s, end s, readings revealed at end (index into MEAS)] — example timing */
 ['Start: choose a language, read what is measured and who sees it, tick to agree','Anza: chagua lugha, soma kinachopimwa na nani ataona, weka alama kukubali',0,10,[]],
 ['Stand on the platform: height and weight, then BMI','Simama jukwaani: urefu na uzito, kisha BMI',10,25,[0,1,2]],
 ['Hold the grips: body composition','Shika vishikio: muundo wa mwili',25,42,[3]],
 ['Temperature, without contact','Joto, bila kugusa',42,50,[6]],
 ['Sit down: the cuff measures blood pressure and pulse, the fingertip sensor reads oxygen','Keti: mkanda unapima shinikizo la damu na mapigo, kihisi cha kidole kinasoma oksijeni',50,125,[4,5]],
 ['Result printed, or sent by QR code','Matokeo yanachapishwa, au kutumwa kwa msimbo wa QR',125,150,[]]];
/* status: 0 usual range · 1 worth a conversation · 2 see a clinic this week */
const PROF=()=>({
 a:{en:'Example A',sw:'Mfano A',v:['164.0 cm','63.5 kg','23.6',T('fat 29% · muscle 43.0 kg · water 51%','mafuta 29% · misuli kilo 43.0 · maji 51%'),'118/76 mmHg · '+T('pulse','mapigo')+' 72','98%','36.6 °C'],s:[0,0,0,0,0,0,0],
  x:[['Recorded for BMI.','Imerekodiwa kwa ajili ya BMI.'],['Saved only if the customer agreed, so changes can be followed.','Inahifadhiwa tu kama mteja amekubali, ili mabadiliko yafuatiliwe.'],['In the usual adult range (18.5–24.9).','Iko katika kiwango cha kawaida kwa mtu mzima (18.5–24.9).'],['Shown as estimates from one reading. A starting point for a talk about activity and diet, not a diagnosis.','Zinaonyeshwa kama makadirio kutoka kipimo kimoja. Ni mwanzo wa mazungumzo kuhusu mazoezi na lishe, si utambuzi.'],['Below 120/80: in the ideal range. A reminder for the next free check.','Chini ya 120/80: iko katika kiwango bora. Kikumbusho cha kipimo kijacho cha bure.'],['95% or more: the blood is carrying oxygen well.','95% au zaidi: damu inabeba oksijeni vizuri.'],['No fever.','Hakuna homa.']],
  sum:['All seven readings are in the usual range. The adviser explains them, suggests the next free check and suggests no purchase.','Vipimo vyote saba viko katika kiwango cha kawaida. Mshauri anavieleza, anapendekeza kipimo kijacho cha bure na hapendekezi ununuzi wowote.']},
 b:{en:'Example B',sw:'Mfano B',v:['172.0 cm','86.0 kg','29.1',T('fat 30% · muscle 57.0 kg · water 50%','mafuta 30% · misuli kilo 57.0 · maji 50%'),'148/94 mmHg · '+T('pulse','mapigo')+' 80','97%','36.8 °C'],s:[0,0,1,1,2,0,0],
  x:[['Recorded for BMI.','Imerekodiwa kwa ajili ya BMI.'],['Saved only if the customer agreed, so changes can be followed.','Inahifadhiwa tu kama mteja amekubali, ili mabadiliko yafuatiliwe.'],['Above the usual adult range (25 or more). Worth a conversation, not a referral.','Juu ya kiwango cha kawaida kwa mtu mzima (25 au zaidi). Inafaa mazungumzo, si rufaa.'],['Shown as estimates from one reading. Together with the BMI, a reason to talk about activity and diet.','Zinaonyeshwa kama makadirio kutoka kipimo kimoja. Pamoja na BMI, ni sababu ya kuzungumza kuhusu mazoezi na lishe.'],['At or above 140/90. The adviser repeats it after rest. One reading is not a diagnosis: if it stays high, the customer is referred to a clinic this week to confirm it on another day.','Iko 140/90 au zaidi. Mshauri anarudia kupima baada ya kupumzika. Kipimo kimoja si utambuzi: kikibaki juu, mteja anapewa rufaa kwenda kliniki wiki hii ili kithibitishwe siku nyingine.'],['95% or more: the blood is carrying oxygen well.','95% au zaidi: damu inabeba oksijeni vizuri.'],['No fever.','Hakuna homa.']],
  sum:['One reading needs a doctor. The adviser explains why, gives a referral slip for a clinic this week and sets a reminder for a recheck. Nothing is sold first.','Kipimo kimoja kinahitaji daktari. Mshauri anaeleza sababu, anatoa barua ya rufaa ya kwenda kliniki wiki hii na anaweka kikumbusho cha kupima tena. Hakuna kinachouzwa kwanza.']}});
const STAT=[['Usual range','Kiwango cha kawaida'],['Worth a conversation','Inafaa mazungumzo'],['See a clinic this week','Nenda kliniki wiki hii']];

/* ---------- model readings ---------- */
function M(){const I=window.MODEL.inputs,ck=I.check,st=I.store,lean=A().isLean(),o=I.opex_month;
 const tech=(I.seed.use||[]).find(u=>/^Technology/.test(u[0]));
 const hrs=(()=>{const m=/(\d\d):(\d\d)\D+(\d\d):(\d\d)/.exec(st.hours||'');return m?(+m[3]+ +m[4]/60)-(+m[1]+ +m[2]/60):12})();
 return {I,ck,st,lean,run:o.check_station,tech:tech?tech[1]:null,hrs}}
function funnel(k){const {I,ck,st}=M(),d=(I.scenarios[k]||I.scenarios.base).demand;
 const vis=st.visitors_day_m12*d*30,chk=ck.checks_day_m12*d*30,buy=chk*ck.check_to_purchase,join=chk*I.members.check_join_rate*(1-st.conversion);
 return {vis,chk,buy,join,gp:buy*st.basket*st.retail_gm}}
function funnelSVG(k){const F=funnel(k),{ck,lean}=M(),rows=[
  [T('Visitors','Wageni'),F.vis,'var(--mute)',''],
  [lean?T('Take a free check at the check corner','Wanapima bure kwenye kona ya vipimo'):T('Take a free Afya Check','Wanachukua Afya Check ya bure'),F.chk,'var(--green)',T(`${Math.round(F.chk/F.vis*100)}% of visitors`,`${Math.round(F.chk/F.vis*100)}% ya wageni`)],
  [T('Buy something after the check','Wananunua kitu baada ya kipimo'),F.buy,'var(--gold)',T(`${Math.round(ck.check_to_purchase*100)}% of checks`,`${Math.round(ck.check_to_purchase*100)}% ya vipimo`)],
  [T('Join an Afya Box','Wanajiunga na Afya Box'),F.join,'var(--green-edge)',T('of those who did not buy at once','kati ya wasionunua papo hapo')]];
 const W=760,bx=300,bw=380,mx=F.vis,rh=58;
 return `<svg viewBox="0 0 ${W} ${rows.length*rh+16}" role="img" aria-label="${L('Funnel from visitors to checks to purchases and new members, one month at month 12','Mtiririko kutoka wageni hadi vipimo hadi manunuzi na wanachama wapya, mwezi mmoja katika mwezi 12')}">
  <line x1="${bx}" y1="4" x2="${bx}" y2="${rows.length*rh+8}" stroke="var(--line)" stroke-width="1"/>
  ${rows.map((r,i)=>{const y=10+i*rh,w=Math.max(3,r[1]/mx*bw);return `<text x="0" y="${y+18}" font-size="15" fill="var(--ink)">${E(r[0])}</text>${r[3]?`<text x="0" y="${y+38}" font-size="13" fill="var(--mute)">${E(r[3])}</text>`:''}
   <rect x="${bx}" y="${y+4}" width="${w.toFixed(1)}" height="30" fill="${r[2]}"/><text x="${bx+w+10}" y="${y+25}" font-size="16" font-weight="600" fill="var(--gold)">${nf(r[1])}</text>`}).join('')}</svg>`}

const CSS=`
.s33 .s33-flow{display:block;width:100%;height:auto}
.s33 .s33-v{display:none;max-width:420px}
@media (max-width:720px){.s33 .s33-h{display:none}.s33 .s33-v{display:block}}
.s33 figure.ab-visual{margin-left:0;margin-right:0}
.s33 figcaption{margin-top:var(--s2);color:var(--mute);font-size:var(--fs-cap);max-width:var(--measure)}
.s33 h3{font-size:var(--fs-sub);font-weight:600;margin-top:var(--s4)}
.s33 .s33-demo{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.15fr);gap:var(--s3);margin-top:var(--s3)}
.s33 .s33-scr{border:1px solid var(--line);background:var(--surface);padding:var(--s3);min-height:300px;display:flex;flex-direction:column;gap:var(--s2)}
.s33 .s33-clock{font-size:var(--fs-title);font-weight:600;color:var(--gold);font-variant-numeric:tabular-nums;line-height:1.1}
.s33 .s33-bar{height:4px;background:var(--line)}.s33 .s33-bar i{display:block;height:4px;width:0;background:var(--green-edge)}
.s33 .s33-ctl{display:flex;flex-wrap:wrap;gap:var(--s1);align-items:center;margin-top:var(--s3)}
.s33 .s33-rl{list-style:none;margin:0;padding:0;border-top:1px solid var(--line)}
.s33 .s33-rl li{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:4px var(--s2);padding:10px 0;border-bottom:1px solid var(--line)}
.s33 .s33-rl li b{font-weight:400}.s33 .s33-rl li em{font-style:normal;color:var(--gold);font-variant-numeric:tabular-nums;text-align:right}
.s33 .s33-rl li small{grid-column:1/-1;color:var(--mute);font-size:var(--fs-cap)}
.s33 .s33-rl li.s33-wait em{color:var(--mute)}
.s33 .s33-rl li .s33-st{display:inline-block;margin-left:8px;font-size:var(--fs-cap);color:var(--mute);border:1px solid var(--line);padding:0 6px;border-radius:999px}
.s33 .s33-rl li .s33-st.s1{border-color:var(--gold);color:var(--gold)}.s33 .s33-rl li .s33-st.s2{border-color:var(--gold);color:var(--ink);background:var(--green-deep)}
.s33 .s33-sum{border-left:2px solid var(--green-edge);padding-left:var(--s2)}
.s33 .s33-fun svg{display:block;width:100%;max-width:820px;height:auto;margin-top:var(--s3)}
.s33 ul.s33-ul{margin:var(--s2) 0 0;padding-left:20px;max-width:var(--measure)}.s33 ul.s33-ul li+li{margin-top:6px}
.s33 td.s33-sub{color:var(--mute)}
.s33 .ab-block>h2+*{margin-top:var(--s2)}
.s33 .ab-block>*+p,.s33 .ab-block>*+.ab-tw,.s33 .ab-block>*+ul{margin-top:var(--s2)}
.s33 .ab-block p{max-width:var(--measure)}
.s33 tr.s33-tot td{font-weight:600}
@media (max-width:860px){.s33 .s33-demo{grid-template-columns:1fr}}`;

function measTable(){return `<div class="ab-tw"><table class="ab-t"><thead><tr><th>#</th><th>${L('Measurement','Kipimo')}</th><th>${L('How the kiosk measures it','Kibanda kinapima vipi')}</th><th>${L('Why it matters','Kwa nini ni muhimu')}</th></tr></thead><tbody>
 ${MEAS.map((m,i)=>`<tr><td class="ab-n">${i+1}</td><td><b>${L(m[0],m[1])}</b></td><td>${L(m[2],m[3])}</td><td>${L(m[4],m[5])}</td></tr>`).join('')}</tbody></table></div>`}

function rulesTable(){const R=[
 ['Usual range','Kiwango cha kawaida','Blood pressure below 120/80, oxygen 95% or more, no fever.','Shinikizo la damu chini ya 120/80, oksijeni 95% au zaidi, hakuna homa.','Explain, save the readings if the customer agreed, remind for the next free check.','Eleza, hifadhi vipimo kama mteja amekubali, kumbusha kipimo kijacho cha bure.',''],
 ['Worth a conversation','Inafaa mazungumzo','Blood pressure 120–139 / 80–89, or BMI 25 or more.','Shinikizo la damu 120–139 / 80–89, au BMI 25 au zaidi.','Practical advice on activity and diet, and a recheck in a few weeks.','Ushauri wa vitendo kuhusu mazoezi na lishe, na kupima tena baada ya wiki chache.',''],
 ['See a clinic this week','Nenda kliniki wiki hii','Blood pressure 140/90 or higher after a repeat reading; fever of 38 °C or more.','Shinikizo la damu 140/90 au zaidi baada ya kurudia kupima; homa ya nyuzi 38 °C au zaidi.','A referral slip to a clinic. A diagnosis of high blood pressure needs readings on two different days.','Barua ya rufaa kwenda kliniki. Utambuzi wa shinikizo la juu la damu unahitaji vipimo vya siku mbili tofauti.',cite(15)],
 ['Medical help today','Msaada wa kitabibu leo','Blood pressure 180/120 or higher after rest; oxygen 93–94% (same day) or 92% and below (urgent); or any reading with chest pain, breathlessness, weakness or confusion.','Shinikizo la damu 180/120 au zaidi baada ya kupumzika; oksijeni 93–94% (siku hiyohiyo) au 92% na chini (dharura); au kipimo chochote pamoja na maumivu ya kifua, kukosa pumzi, udhaifu au kuchanganyikiwa.','The adviser stays with the customer and helps arrange care. Nothing is sold.','Mshauri anabaki na mteja na kumsaidia kupata huduma. Hakuna kinachouzwa.',cite(16)+cite(17)]];
 return `<div class="ab-tw"><table class="ab-t"><thead><tr><th>${L('Result','Matokeo')}</th><th>${L('Readings','Vipimo')}</th><th>${L('What the adviser does','Mshauri anafanya nini')}</th></tr></thead><tbody>
 ${R.map(r=>`<tr><td><b>${L(r[0],r[1])}</b></td><td>${L(r[2],r[3])}${r[6]}</td><td>${L(r[4],r[5])}</td></tr>`).join('')}</tbody></table></div>`}

function costTable(){const {run,tech,lean}=M();
 const R=[
  ['Listing price, budget basic class (Dingheng DHM-900C), factory','Bei ya tangazo, daraja la msingi la bei nafuu (Dingheng DHM-900C), kiwandani',usd('1,600','TSh 4,228,000'),'TSh 4,228,000',0],
  ['Sea freight China–Dar es Salaam, shared container, with origin charges','Usafiri wa meli China–Dar es Salaam, kontena la pamoja, pamoja na gharama za kuanzia',usd('400–700','TSh 1,057,000–1,849,750'),'TSh 1,057,000–1,849,750',1],
  ['Insurance, 0.5% of price and freight','Bima, 0.5% ya bei na usafiri',usd('10–12','TSh 26,425–31,710'),'TSh 26,425–31,710',1],
  ['Import duty, 0% (HS 9018.19.00)','Ushuru wa forodha, 0% (HS 9018.19.00)','—','TSh 0',0],
  ['Railway Development Levy, 2% of CIF','Tozo ya Maendeleo ya Reli, 2% ya CIF',T('2% × CIF of US$2,010–2,312','2% × CIF ya US$2,010–2,312'),'TSh 106,229–122,189',0],
  ['Import VAT, 18%','VAT ya uingizaji, 18%',T('18% of CIF, duty and levy','18% ya CIF, ushuru na tozo'),'TSh 975,178–1,121,697',0],
  ['Pre-shipment inspection (PVoC)','Ukaguzi kabla ya kusafirisha (PVoC)',T('Not on the TBS list','Haipo kwenye orodha ya TBS'),'TSh 0',0],
  ['Clearing agent, port and delivery-order charges','Wakala wa forodha, gharama za bandari na hati ya kuchukua mzigo',usd('400–800','TSh 1,057,000–2,114,000'),'TSh 1,057,000–2,114,000',1],
  ['Delivery and set-up in Dar es Salaam','Usafirishaji na ufungaji Dar es Salaam','—','TSh 150,000–300,000',1]];
 const row=r=>`<tr><td>${L(r[0],r[1])}${r[4]?' '+est():''}</td><td class="s33-sub">${E(r[2])}</td><td class="ab-n">${E(r[3])}</td></tr>`;
 const tot=(en,sw,v,e)=>`<tr class="s33-tot"><td>${L(en,sw)}${e?' '+est():''}</td><td></td><td class="ab-n">${E(v)}</td></tr>`;
 return `<div class="ab-tw"><table class="ab-t"><thead><tr><th>${L('One kiosk, landed in Dar es Salaam','Kibanda kimoja, kikifika Dar es Salaam')}</th><th>${L('Original, rate and date','Fedha asili, kiwango na tarehe')}</th><th>${L('TSh','TSh')}</th></tr></thead><tbody>
  ${R.map(row).join('')}
  ${tot('Landed, VAT paid','Gharama ya kufika, VAT imelipwa',rM('7.60','9.77'),1)}
  ${tot('Landed, if the VAT can be reclaimed','Gharama ya kufika, kama VAT inaweza kurejeshwa',rM('6.62','8.65'),1)}
  <tr><td>${L('Spare kit bought with the kiosk: one cuff, one printer module, ten paper rolls','Vipuri vinavyonunuliwa pamoja na kibanda: mkanda mmoja, moduli moja ya printa, roli kumi za karatasi')} ${est()}</td><td class="s33-sub">${E(usd('150–300','TSh 396,375–792,750'))}</td><td class="ab-n">TSh 396,375–792,750</td></tr>
  <tr><td>${L('TMDA registration of the kiosk model, Class B medical device; paid by the registration holder, normally the local dealer, and by Afya only if it imports the kiosk itself','Usajili wa TMDA wa aina ya kibanda, kifaa tiba Daraja B; unalipwa na mwenye usajili, kwa kawaida muuzaji wa ndani, na Afya tu kama itaingiza kibanda yenyewe')}</td><td class="s33-sub">${E(usd('2,500','TSh 6,606,250'))}; ${L('then US$200 a year (TSh 528,500)','kisha US$200 kwa mwaka (TSh 528,500)')}</td><td class="ab-n">TSh 6,606,250</td></tr>
  <tr class="s33-tot"><td>${L('Budget carried for one kiosk until written quotes arrive','Bajeti inayobebwa kwa kibanda kimoja hadi nukuu za maandishi zifike')} ${est()}</td><td></td><td class="ab-n">${tshM(10e6)}</td></tr>
 </tbody></table></div>
 <div class="ab-tw"><table class="ab-t"><thead><tr><th>${L('Running the station','Kuendesha kituo')}</th><th>${L('Basis','Msingi')}</th><th>${L('TSh','TSh')}</th></tr></thead><tbody>
  <tr><td>${L('Maintenance, year one: one repair with an air-freighted part, spare cuffs, thermal paper, calibration checks, hygiene supplies and data','Matengenezo, mwaka wa kwanza: tengenezo moja na kipuri kinacholetwa kwa ndege, mikanda ya akiba, karatasi ya printa, ukaguzi wa usahihi, vifaa vya usafi na data')} ${est()}</td><td class="s33-sub">${L('One failure a year assumed; no figure yet from a supplier','Hitilafu moja kwa mwaka inakadiriwa; bado hakuna takwimu kutoka kwa msambazaji')}</td><td class="ab-n">${L('TSh 1.9–4.8M a year','TSh 1.9–4.8 milioni kwa mwaka')}</td></tr>
  <tr><td>${lean?L('Check corner running cost in the financial model','Gharama ya kuendesha kona ya vipimo katika modeli ya fedha'):L('Station running cost in the financial model','Gharama ya kuendesha kituo katika modeli ya fedha')} ${est()}</td><td class="s33-sub">${L('A month, times 12','Kwa mwezi, mara 12')}: ${tsh(run)} × 12</td><td class="ab-n">${tsh(run*12)}</td></tr>
  ${tech!=null?`<tr><td>${lean?L('Seed line: technology, POS, app and manual check corner','Mstari wa mtaji wa awali: teknolojia, POS, programu na kona ya vipimo ya mkono'):L('Seed line: technology, Afya Check kiosk and screens','Mstari wa mtaji wa awali: teknolojia, kibanda cha Afya Check na skrini')}</td><td class="s33-sub">${L('Use of funds, section 6.3','Matumizi ya fedha, sehemu ya 6.3')}</td><td class="ab-n">${tsh(tech)}</td></tr>`:''}
 </tbody></table></div>
 <p class="ab-mute" style="margin-top:12px;font-size:var(--fs-cap)">${L(`All supplier prices are public listing prices, not quotes. Converted at US$1 = TSh ${FX}, Bank of Tanzania mean rate for 10 Nov 2026. Freight, insurance, clearing and delivery are estimates.`,`Bei zote za wasambazaji ni bei za matangazo ya wazi, si nukuu. Zimebadilishwa kwa US$1 = TSh ${FX}, kiwango cha wastani cha Benki Kuu ya Tanzania cha 10 Nov 2026. Usafiri, bima, forodha na usafirishaji ni makadirio.`)}</p>`}

function render(s,p,pv,nx){const {ck,st,lean,run,tech,hrs}=M(),F=funnel('base');
 const perH=20,capDay=Math.round(perH*hrs),need=ck.checks_day_m12,util=need/capDay,peak=Math.round(need/hrs*1.7);
 const leanNote=lean?`<p class="ab-notice">${L('In the start-small option the store opens with a manual check corner: an adviser takes the readings with separate devices, using the same order, rules and consent described here. The kiosk is bought from the store’s own cash once monthly profit is steady.','Katika chaguo la kuanza kidogo duka linafunguliwa na kona ya vipimo ya mkono: mshauri anachukua vipimo kwa vifaa tofauti, akifuata mpangilio, kanuni na ridhaa zilezile zilizoelezwa hapa. Kibanda kinanunuliwa kwa fedha za duka lenyewe faida ya kila mwezi ikishakuwa thabiti.')}</p>`:'';
 const figs=[
  {v:L('7, free','7, bure'),l:T('Wellness measurements in every check; no purchase needed','Vipimo vya afya katika kila kipimo; hakuna sharti la kununua'),s:L('Basic-tier kiosk specification','Maelezo ya kibanda cha daraja la msingi')},
  {v:`${L('≈ 50 s · 2–3 min','≈ sek. 50 · dak. 2–3')} ${est()}`,l:T('Quick check · full check','Kipimo cha haraka · kipimo kamili'),s:L('To be timed on the delivered unit','Muda utapimwa kwenye kibanda kitakachofika')},
  {v:`${rM('7.6','9.8')} ${est()}`,l:T('One budget-class kiosk landed in Dar es Salaam, VAT paid','Kibanda kimoja cha daraja la bei nafuu kikifika Dar es Salaam, VAT imelipwa'),s:L('Listing US$1,600 × 2,642.50 (BoT, 10 Nov 2026), plus freight, levy, VAT and clearing','Tangazo US$1,600 × 2,642.50 (BoT, 10 Nov 2026), pamoja na usafiri, tozo, VAT na forodha')},
  {v:`${nf(need)} ${est()}`,l:lean?T('Free checks a day at the check corner by month 12','Vipimo vya bure kwa siku kwenye kona ya vipimo ifikapo mwezi 12'):T('Free checks a day by month 12','Vipimo vya bure kwa siku ifikapo mwezi 12'),s:L('Financial model v1.2, base case','Modeli ya fedha v1.2, hali ya msingi')}];
 return `<article class="ab-sec s33" aria-labelledby="h-s3-3"><style>${CSS}</style><div class="ab-wrap">
 <div class="ab-sec-no">${E(s.no)}</div><h1 id="h-s3-3">${E(s.title)}</h1>
 <p class="ab-summary">${L('By the entrance of every Afya Basics store stands a free wellness screening station. One self-service kiosk takes seven measurements: height, weight, BMI, body composition, blood pressure with pulse, blood oxygen and temperature. A quick check takes about 50 seconds and the full check about 2–3 minutes (both estimates). A trained adviser explains the results and refers the customer to a clinic when a reading needs a doctor. It is screening, not diagnosis. This section covers why it matters, the flow, the rules, the machine, the cost and what it brings in.','Mlangoni mwa kila duka la Afya Basics kuna kituo cha bure cha uchunguzi wa afya. Kibanda kimoja cha kujihudumia kinachukua vipimo saba: urefu, uzito, BMI, muundo wa mwili, shinikizo la damu pamoja na mapigo ya moyo, oksijeni kwenye damu na joto la mwili. Kipimo cha haraka kinachukua takriban sekunde 50 na kipimo kamili takriban dakika 2–3 (yote ni makadirio). Mshauri aliyefunzwa anaeleza matokeo na kumpa mteja rufaa ya kliniki pale kipimo kinapohitaji daktari. Huu ni uchunguzi, si utambuzi wa ugonjwa. Sehemu hii inaeleza umuhimu wake, mtiririko, kanuni, mashine, gharama na kile kinacholeta.')}</p>

 <figure class="ab-visual">${flowSVG(false)}${flowSVG(true)}
  <figcaption>${L('The order of a check on a basic-tier kiosk. Gold numbers are the measurements taken at each step (see the list below). Both times are estimates, to be timed on the delivered unit.','Mpangilio wa kipimo kwenye kibanda cha daraja la msingi. Namba za dhahabu ni vipimo vinavyochukuliwa katika kila hatua (tazama orodha hapa chini). Muda wote ni makadirio, utapimwa kwenye kibanda kitakachofika.')}</figcaption></figure>
 ${leanNote}

 <div class="ab-body">
 <section class="ab-block"><h2>${L('Why a free check by the door','Kwa nini kipimo cha bure mlangoni')}</h2>
  <p>${T(`High blood pressure rarely hurts until it causes a stroke, a heart attack or kidney failure. In the 2023 national survey, 23.1% of Tanzanian adults aged 18–69 had raised blood pressure${cite(1)}. In 2012, the last national survey to measure the full picture, only 17.6% of adults with high blood pressure knew they had it, and 2.2% had it under control${cite(2)}.`,`Shinikizo la juu la damu mara chache huuma kabla halijasababisha kiharusi, shambulio la moyo au figo kushindwa kufanya kazi. Katika utafiti wa kitaifa wa 2023, asilimia 23.1 ya watu wazima wa Tanzania wenye miaka 18–69 walikuwa na shinikizo la juu la damu${cite(1)}. Mwaka 2012, utafiti wa mwisho wa kitaifa uliopima hali nzima, ni asilimia 17.6 tu ya watu wazima wenye shinikizo la juu waliojua kuwa nalo, na asilimia 2.2 walikuwa wamelidhibiti${cite(2)}.`)}</p>
  <p>${L('Put simply: of every hundred adults with high blood pressure, about eighteen knew it and about two had it under control. The rest had no symptoms and no reason to book a clinic visit. Many of them will, however, step through an open door for a free check on the way to buy something else. The station is designed around that behaviour.','Kwa maneno rahisi: kati ya kila watu wazima mia wenye shinikizo la juu la damu, takriban kumi na nane walijua na takriban wawili walikuwa wamelidhibiti. Wengine hawakuwa na dalili wala sababu ya kupanga kwenda kliniki. Hata hivyo, wengi wao wataingia kwenye mlango ulio wazi kwa kipimo cha bure wakiwa njiani kununua kitu kingine. Kituo kimeundwa kuzunguka tabia hiyo.')}</p>
  <p>${L('For the business the check is the store’s front door. It brings in people who would not otherwise enter a health shop, gives the adviser a reason to talk, and, with consent, starts a record of readings over time. That record is what makes the condition-care boxes useful. The check is always free, and no purchase is needed.','Kwa biashara, kipimo ndio mlango wa mbele wa duka. Kinawaleta watu ambao vinginevyo wasingeingia duka la afya, kinampa mshauri sababu ya kuzungumza, na, kwa ridhaa, kinaanzisha kumbukumbu ya vipimo kwa muda. Kumbukumbu hiyo ndiyo inayofanya maboksi ya huduma ya magonjwa kuwa na manufaa. Kipimo ni bure siku zote, na hakuna sharti la kununua.')}</p>
 </section>

 <section class="ab-block"><h2>${L('Seven measurements, and what is left out','Vipimo saba, na kile kisichojumuishwa')}</h2>
  <p>${L('The kiosk is a basic-tier wellness station. Pulse comes with the blood-pressure reading and is not a separate test. Body composition shows three values calculated from one reading, and they are shown as estimates.','Kibanda ni kituo cha afya cha daraja la msingi. Mapigo ya moyo yanapatikana pamoja na kipimo cha shinikizo la damu na si kipimo tofauti. Muundo wa mwili unaonyesha thamani tatu zinazokokotolewa kutoka kipimo kimoja, na zinaonyeshwa kama makadirio.')}</p>
  ${measTable()}
  <p style="margin-top:var(--s3)">${L('There are no blood-prick tests, no urine test, no vision test and no ECG, and none are planned as later additions. Blood tests need consumables, trained staff and a different level of medical-device control. Keeping the station to non-invasive readings keeps it free, fast and safe to run beside a shop floor.','Hakuna vipimo vya kuchoma kidole, kipimo cha mkojo, kipimo cha macho wala ECG, na hakuna vinavyopangwa kuongezwa baadaye. Vipimo vya damu vinahitaji vifaa vya matumizi, wafanyakazi waliofunzwa na kiwango kingine cha udhibiti wa vifaa tiba. Kubaki na vipimo visivyoingia mwilini kunafanya kituo kiwe cha bure, cha haraka na salama kuendeshwa kando ya sakafu ya duka.')}</p>
 </section>

 <section class="ab-block"><h2>${L('A check, step by step','Kipimo, hatua kwa hatua')}</h2>
  <ol class="ab-timeline">
   <li><b>${L('Start and consent','Anza na ridhaa')}</b><span>${L('The customer taps Start, chooses Kiswahili or English and reads on one screen what will be measured and who will see it. One required tick; optional ticks to receive the result by text message and to save it to an Afya account. The adviser greets and helps, but never ticks for the customer.','Mteja anabonyeza Anza, anachagua Kiswahili au Kiingereza na kusoma kwenye skrini moja kitakachopimwa na nani ataona. Alama moja ya lazima; alama za hiari za kupokea matokeo kwa ujumbe mfupi na kuyahifadhi kwenye akaunti ya Afya. Mshauri anasalimia na kusaidia, lakini kamwe hamwekei mteja alama.')}</span></li>
   <li><b>${L('Stand on the platform and hold the grips','Simama jukwaani na ushike vishikio')}</b><span>${L('Height, weight and BMI, then body composition through the grips and foot plates. Before this step the screen asks about pacemakers, implanted devices and pregnancy; anyone who answers yes skips body composition.','Urefu, uzito na BMI, kisha muundo wa mwili kupitia vishikio na sahani za miguu. Kabla ya hatua hii skrini inauliza kuhusu kifaa cha kusaidia moyo, vifaa vilivyopandikizwa na ujauzito; anayejibu ndiyo anaruka kipimo cha muundo wa mwili.')}</span></li>
   <li><b>${L('Temperature, without contact. The quick check ends here, at about 50 seconds','Joto, bila kugusa. Kipimo cha haraka kinaishia hapa, takriban sekunde 50')} ${est()}</b><span>${L('A customer in a hurry leaves with five readings and an invitation to come back for the full check.','Mteja mwenye haraka anaondoka na vipimo vitano na mwaliko wa kurudi kwa kipimo kamili.')}</span></li>
   <li><b>${L('Sit down: blood pressure and oxygen together','Keti: shinikizo la damu na oksijeni pamoja')}</b><span>${L('Feet flat, back supported, bare upper arm in the cuff at heart level. An automatic cuff reading usually takes up to about a minute; the fingertip sensor reads oxygen at the same time.','Miguu sakafuni, mgongo umeegemezwa, mkono wa juu bila nguo ndani ya mkanda kwenye usawa wa moyo. Kipimo cha mkanda wa kiotomatiki kwa kawaida huchukua hadi takriban dakika moja; kihisi cha kidole kinasoma oksijeni wakati huohuo.')}</span></li>
   <li><b>${L('The result. The full check ends here, at about 2–3 minutes','Matokeo. Kipimo kamili kinaishia hapa, takriban dakika 2–3')} ${est()}</b><span>${L('A thermal printout and a QR code; a text message if the customer asked for one.','Karatasi iliyochapishwa na msimbo wa QR; ujumbe mfupi kama mteja aliuomba.')}</span></li>
   <li><b>${L('An adviser explains','Mshauri anaeleza')}</b><span>${L('Every result is explained by a person, in plain words. A reading that needs a doctor leads to a clinic referral, never to a sale. The adviser then wipes the cuff, grips, plates, finger sensor and screen before the next customer.','Kila tokeo linaelezwa na mtu, kwa maneno rahisi. Kipimo kinachohitaji daktari kinaleta rufaa ya kliniki, kamwe si mauzo. Kisha mshauri anafuta mkanda, vishikio, sahani, kihisi cha kidole na skrini kabla ya mteja anayefuata.')}</span></li>
  </ol>
 </section>

 <section class="ab-block"><h2>${L('Try the flow','Jaribu mtiririko')}</h2>
  <p>${L('Run a check with one of two example customers. The stopwatch shows the check time, running ten times faster than real time. All readings and step times are examples, not real people or measured times.','Endesha kipimo kwa mmoja wa wateja wawili wa mfano. Saa ya kupimia inaonyesha muda wa kipimo, ikienda mara kumi kwa kasi zaidi ya muda halisi. Vipimo vyote na muda wa hatua ni mifano, si watu halisi wala muda uliopimwa.')} ${exm()}</p>
  <div class="s33-ctl">
   <div class="ab-seg" role="group" aria-label="${L('Example customer','Mteja wa mfano')}" id="s33Prof">${Object.keys(PROF()).map((k,i)=>`<button type="button" data-p="${k}" aria-pressed="${i===0}">${L(PROF()[k].en,PROF()[k].sw)}</button>`).join('')}</div>
   <div class="ab-seg" role="group" aria-label="${L('Type of check','Aina ya kipimo')}" id="s33Mode"><button type="button" data-m="quick" aria-pressed="false">${L('Quick check','Kipimo cha haraka')}</button><button type="button" data-m="full" aria-pressed="true">${L('Full check','Kipimo kamili')}</button></div>
   <button type="button" class="ab-btn ab-pri" id="s33Go">${L('Start the check','Anza kipimo')}</button>
   <button type="button" class="ab-btn" id="s33Rst">${L('Reset','Anza upya')}</button>
  </div>
  <div class="s33-demo">
   <div class="s33-scr" aria-live="polite">
    <div class="ab-mute" style="font-size:var(--fs-cap)">${L('Kiosk screen','Skrini ya kibanda')} · ${L('example','mfano')}</div>
    <div class="s33-clock" id="s33Clk">0:00</div>
    <div class="s33-bar"><i id="s33Bar"></i></div>
    <div id="s33Step"></div>
   </div>
   <div><ol class="s33-rl" id="s33Rl"></ol><div id="s33Sum" style="margin-top:var(--s2)"></div></div>
  </div>
 </section>

 <section class="ab-block"><h2>${L('Results explained by a trained adviser','Matokeo yanaelezwa na mshauri aliyefunzwa')}</h2>
  <p>${L('The kiosk measures; a person explains. Advisers do not diagnose or prescribe. They follow four written rules, which a licensed Tanzanian clinician will review and sign before opening. Every screen, printout and message says that the check is screening, not diagnosis, and that one high reading must be confirmed on another day.','Kibanda kinapima; mtu anaeleza. Washauri hawatambui magonjwa wala kuandika dawa. Wanafuata kanuni nne zilizoandikwa, ambazo daktari mwenye leseni wa Tanzania atazipitia na kuzisaini kabla ya kufungua. Kila skrini, karatasi na ujumbe unasema kwamba kipimo ni uchunguzi, si utambuzi, na kwamba kipimo kimoja cha juu lazima kithibitishwe siku nyingine.')}</p>
  ${rulesTable()}
  <p style="margin-top:var(--s3)">${L('Only after the explanation may the adviser mention a product, and only if it fits; a home blood-pressure monitor, for example, only when a clinic recommends home monitoring. Medicines are sold only by the licensed partner pharmacy. Most people leave with advice and a reminder for the next free check, not a bag.','Baada tu ya maelezo ndipo mshauri anaweza kutaja bidhaa, na kama inafaa tu; kwa mfano kipima shinikizo cha nyumbani, pale tu kliniki inapopendekeza kupima nyumbani. Dawa zinauzwa na famasia mshirika yenye leseni pekee. Watu wengi wanaondoka na ushauri na kikumbusho cha kipimo kijacho cha bure, si mfuko wa bidhaa.')}</p>
 </section>

 <section class="ab-block"><h2>${L('Consent and privacy','Ridhaa na faragha')}</h2>
  <p>${T(`Under Tanzania’s personal data protection law, data about health is sensitive data. Processing it needs the person’s prior consent, and withdrawing consent must be simple, at any time and free of charge${cite(18)}. The Afya Check is built around that rule.`,`Chini ya sheria ya Tanzania ya ulinzi wa taarifa binafsi, taarifa za afya ni taarifa nyeti. Kuzichakata kunahitaji ridhaa ya awali ya mhusika, na kuondoa ridhaa lazima kuwe rahisi, wakati wowote na bila malipo${cite(18)}. Afya Check imejengwa kuzunguka kanuni hiyo.`)}</p>
  <ul class="s33-ul">
   <li>${L('Before: one clear screen in Kiswahili or English on what is measured, why, and who sees it. One required tick; separate optional ticks for a text message and for saving to an account. A parent or guardian consents for a child.','Kabla: skrini moja iliyo wazi kwa Kiswahili au Kiingereza kuhusu kinachopimwa, kwa nini, na nani ataona. Alama moja ya lazima; alama tofauti za hiari kwa ujumbe mfupi na kuhifadhi kwenye akaunti. Mzazi au mlezi anatoa ridhaa kwa niaba ya mtoto.')}</li>
   <li>${L('During: no camera and no ID. A phone number only if the customer wants the result by text message.','Wakati wa kipimo: hakuna kamera wala kitambulisho. Namba ya simu tu kama mteja anataka matokeo kwa ujumbe mfupi.')}</li>
   <li>${L('After: saved readings are encrypted and visible only to the customer and their adviser. Sharing with a relative needs a separate consent. Deletion on request, with one message.','Baadaye: vipimo vilivyohifadhiwa vinasimbwa kwa usalama na vinaonekana kwa mteja na mshauri wake tu. Kushirikisha ndugu kunahitaji ridhaa tofauti. Vinafutwa kwa ombi, kwa ujumbe mmoja.')}</li>
  </ul>
 </section>

 <section class="ab-block"><h2>${L('The machine, and how it is bought','Mashine, na jinsi inavyonunuliwa')}</h2>
  <p>${T(`Several factories list basic-tier kiosks that match the seven measurements, from about US$1,155 to US$2,700 a unit, with higher-finish units at US$4,490–4,990${cite(3)}${cite(4)}${cite(5)}${cite(6)}. The recommendation is one budget-class standing unit with an ultrasonic height sensor, a 0.1 kg scale, eight-electrode body composition, a clinically validated upper-arm cuff, a fingertip oxygen sensor and a non-contact thermometer, a 15–22 inch touchscreen with Kiswahili and English text, a thermal printer and a QR code. It stands on about 0.3–0.5 m² of floor.`,`Viwanda kadhaa vinatangaza vibanda vya daraja la msingi vinavyolingana na vipimo saba, kuanzia takriban US$1,155 hadi US$2,700 kwa kimoja, na vibanda vya hadhi ya juu kwa US$4,490–4,990${cite(3)}${cite(4)}${cite(5)}${cite(6)}. Pendekezo ni kibanda kimoja cha kusimama cha daraja la bei nafuu chenye kihisi cha urefu cha mawimbi sauti, mizani ya hatua za kilo 0.1, kipimo cha muundo wa mwili cha elektrodi nane, mkanda wa mkono wa juu uliothibitishwa kitabibu, kihisi cha oksijeni cha kidole na kipima joto bila kugusa, skrini ya mguso ya inchi 15–22 yenye maandishi ya Kiswahili na Kiingereza, printa ya joto na msimbo wa QR. Kinachukua takriban m² 0.3–0.5 za sakafu.`)}</p>
  <h3>${L('A medical device under TMDA','Kifaa tiba chini ya TMDA')}</h3>
  <p>${T(`Because it measures blood pressure, temperature and oxygen in routine checkups, the kiosk is a Class B medical device for the Tanzania Medicines and Medical Devices Authority. Calling it a wellness station does not change the class${cite(12)}. A retail store is not on TMDA’s list of permitted device importers${cite(13)}, so the kiosk will be bought through a TMDA-registered local dealer who holds the registration. Registering the model costs the holder US$2,500 (TSh 6,606,250 at 2,642.50, BoT 10 Nov 2026) plus US$200 a year${cite(11)}.`,`Kwa sababu kinapima shinikizo la damu, joto na oksijeni katika uchunguzi wa kawaida, kibanda ni kifaa tiba cha Daraja B kwa Mamlaka ya Dawa na Vifaa Tiba Tanzania (TMDA). Kukiita kituo cha afya hakubadilishi daraja lake${cite(12)}. Duka la rejareja halimo kwenye orodha ya TMDA ya wanaoruhusiwa kuingiza vifaa tiba${cite(13)}, hivyo kibanda kitanunuliwa kupitia muuzaji wa ndani aliyesajiliwa na TMDA ambaye ndiye mwenye usajili. Kusajili aina hiyo kunamgharimu mwenye usajili US$2,500 (TSh 6,606,250 kwa 2,642.50, BoT 10 Nov 2026) pamoja na US$200 kwa mwaka${cite(11)}.`)}</p>
  <h3>${L('Conditions before an order is placed','Masharti kabla ya kuagiza')}</h3>
  <ul class="s33-ul">
   <li>${L('Three written quotes, each with the exact module list, the CE certificate for the blood-pressure and oxygen functions, the factory’s ISO 13485 certificate and the blood-pressure clinical-validation report.','Nukuu tatu za maandishi, kila moja ikiwa na orodha kamili ya moduli, cheti cha CE kwa kazi za shinikizo la damu na oksijeni, cheti cha ISO 13485 cha kiwanda na ripoti ya uthibitisho wa kitabibu wa kipimo cha shinikizo la damu.')}</li>
   <li>${L('A warranty of at least 12 months in writing, a spare-parts price list with lead times, and remote-support terms.','Dhamana ya angalau miezi 12 kwa maandishi, orodha ya bei za vipuri pamoja na muda wa kufika, na masharti ya msaada wa mbali.')}</li>
   <li>${L('Kiswahili and English screen text loaded by the supplier, and the user manual with the body-composition warnings.','Maandishi ya skrini ya Kiswahili na Kiingereza yaliyowekwa na msambazaji, na mwongozo wa mtumiaji wenye tahadhari za kipimo cha muundo wa mwili.')}</li>
  </ul>
  <h3>${L('Keeping the readings trustworthy','Kuhakikisha vipimo vinaaminika')}</h3>
  <p>${L('The scale is zeroed every day and checked monthly with known test weights; the height sensor is checked monthly against a fixed reference rod; the oxygen and temperature sensors are compared monthly with a separate approved device; the blood-pressure module is checked once a year against a calibrated reference gauge and after any repair, and the cuff is replaced when worn. A high blood-pressure reading is always repeated after rest.','Mizani inawekwa sifuri kila siku na kukaguliwa kila mwezi kwa uzito wa majaribio unaojulikana; kihisi cha urefu kinakaguliwa kila mwezi dhidi ya fimbo ya kipimo isiyobadilika; vihisi vya oksijeni na joto vinalinganishwa kila mwezi na kifaa kingine kilichoidhinishwa; moduli ya shinikizo la damu inakaguliwa mara moja kwa mwaka dhidi ya kipimo cha marejeo kilichosawazishwa na baada ya kila tengenezo, na mkanda unabadilishwa ukichakaa. Kipimo cha juu cha shinikizo la damu hurudiwa kila mara baada ya kupumzika.')}</p>
 </section>

 <section class="ab-block"><h2>${L('Capacity: can one kiosk cope?','Uwezo: je, kibanda kimoja kinatosha?')}</h2>
  ${lean?`<p>${L(`In the start-small option the model expects ${nf(need)} free checks a day by month 12 at the manual check corner, over a ${Math.round(hrs)}-hour day. The kiosk is added once the store pays for it, and the figures below then apply.`,`Katika chaguo la kuanza kidogo modeli inatarajia vipimo vya bure ${nf(need)} kwa siku ifikapo mwezi 12 kwenye kona ya vipimo ya mkono, kwa siku ya saa ${Math.round(hrs)}. Kibanda kinaongezwa duka likiweza kukilipia, na takwimu zilizo hapa chini zitatumika wakati huo.`)}</p>`:''}
  <p>${L(`With a full check of about 3 minutes a person, cleaning included, one kiosk serves about ${perH} people an hour, or about ${nf(capDay)} over a ${Math.round(hrs)}-hour day (estimate). By month 12 the model expects ${nf(need)} checks a day, about ${Math.round(util*100)}% of that capacity. If the busiest hour carries about 1.7 times the average (an assumption), that is about ${peak} people against a capacity of ${perH}. One kiosk is enough for year one, with time for a second reading or a longer conversation. When use passes about 70%, a second kiosk is worth considering.`,`Kwa kipimo kamili cha takriban dakika 3 kwa mtu, usafi ukiwemo, kibanda kimoja kinahudumia takriban watu ${perH} kwa saa, au takriban ${nf(capDay)} kwa siku ya saa ${Math.round(hrs)} (makadirio). Ifikapo mwezi 12 modeli inatarajia vipimo ${nf(need)} kwa siku, takriban asilimia ${Math.round(util*100)} ya uwezo huo. Kama saa yenye watu wengi zaidi ina takriban mara 1.7 ya wastani (dhana), hao ni takriban watu ${peak} dhidi ya uwezo wa ${perH}. Kibanda kimoja kinatosha kwa mwaka wa kwanza, na muda unabaki kwa kipimo cha pili au mazungumzo marefu. Matumizi yakizidi takriban asilimia 70, kibanda cha pili kinafaa kufikiriwa.`)}</p>
  <p>${L('One health adviser per shift is responsible for the station while also serving the floor. The kiosk stands just inside the entrance, next to the waiting area with its screens, so it is the first thing a passer-by sees.','Mshauri mmoja wa afya kwa kila zamu anawajibika kwa kituo huku akihudumia sakafu ya duka pia. Kibanda kinasimama ndani kidogo ya mlango, kando ya eneo la kusubiri lenye skrini, hivyo ndicho kitu cha kwanza mpita njia anachoona.')}</p>
 </section>

 <section class="ab-block"><h2>${L('From visitors to checks to purchases','Kutoka wageni hadi vipimo hadi manunuzi')}</h2>
  <p>${L('The chart follows one month at month 12 of the selected funding option. Choose a scenario to see how demand changes it.','Chati inafuata mwezi mmoja katika mwezi 12 wa chaguo la fedha lililochaguliwa. Chagua hali ili kuona jinsi mahitaji yanavyoibadilisha.')}</p>
  <div class="ab-seg" role="group" aria-label="${L('Scenario','Hali')}" id="s33Sc" style="margin-top:var(--s2)">${window.MODEL.scenarios.map((k,i)=>`<button type="button" data-s="${k}" aria-pressed="${i===0}">${k==='base'?L('Base','Msingi'):k==='best'?L('Best','Bora'):L('Downside','Mbaya')}</button>`).join('')}</div>
  <div class="s33-fun" id="s33Fun">${funnelSVG('base')}</div>
  <p class="ab-mute" style="font-size:var(--fs-cap);margin-top:var(--s1)">${L('Source: financial model v1.2, month 12 per month: visitors a day, checks a day, the share of checks that lead to a purchase and the share of check users who did not buy and join a box. Planning estimates.','Chanzo: modeli ya fedha v1.2, mwezi 12 kwa mwezi: wageni kwa siku, vipimo kwa siku, sehemu ya vipimo vinavyoleta ununuzi na sehemu ya waliopima wasionunua wanaojiunga na boksi. Makadirio ya mipango.')}</p>
  <h3>${L('Worked example, base case','Mfano wa hesabu, hali ya msingi')}</h3>
  <p id="s33Wk">${L(`${nf(F.chk)} checks a month × ${Math.round(ck.check_to_purchase*100)}% who then buy = about ${nf(F.buy)} purchases. At the average basket of ${tsh(st.basket)} and a retail margin of ${Math.round(st.retail_gm*100)}%, that is about ${tshM(F.gp)} of gross profit a month, against a station running cost of ${tsh(run)} a month in the model (estimate).`,`Vipimo ${nf(F.chk)} kwa mwezi × ${Math.round(ck.check_to_purchase*100)}% wanaonunua baadaye = takriban manunuzi ${nf(F.buy)}. Kwa kikapu cha wastani cha ${tsh(st.basket)} na faida ya rejareja ya ${Math.round(st.retail_gm*100)}%, hiyo ni takriban ${tshM(F.gp)} ya faida ghafi kwa mwezi, dhidi ya gharama ya kuendesha kituo ya ${tsh(run)} kwa mwezi katika modeli (makadirio).`)}</p>
  <p>${L('This is an upper estimate. Some of these visitors would have bought anyway, so the financial model does not add check-driven purchases as extra revenue: they sit inside ordinary walk-in sales. What the model does credit to the check is new box members. About '+nf(F.join)+' check users a month who did not buy at once join an Afya Box (base case), and members are where the value of the business lies.','Haya ni makadirio ya juu. Baadhi ya wageni hawa wangenunua hata hivyo, kwa hiyo modeli ya fedha haiongezi manunuzi yanayotokana na vipimo kama mapato ya ziada: yamo ndani ya mauzo ya kawaida ya wateja wanaoingia dukani. Kile ambacho modeli inakihesabu kwa kipimo ni wanachama wapya wa boksi. Takriban watu '+nf(F.join)+' kwa mwezi waliopima bila kununua papo hapo wanajiunga na Afya Box (hali ya msingi), na wanachama ndipo thamani ya biashara ilipo.')}</p>
 </section>
 </div>

 <section class="ab-block"><h2>${L('Key figures','Takwimu muhimu')}</h2>${A().figsHTML(figs)}</section>

 <section class="ab-block"><h2>${L('What this costs','Gharama yake')}</h2>
  ${lean?`<p class="ab-mute" style="max-width:var(--measure)">${L('Start-small option: the kiosk is not bought from the seed round. The landed cost below applies when it is bought from the store’s own cash.','Chaguo la kuanza kidogo: kibanda hakinunuliwi kwa mtaji wa awali. Gharama ya kufika iliyo hapa chini inatumika kitakaponunuliwa kwa fedha za duka lenyewe.')}</p>`
   :(tech!=null?`<p class="ab-mute" style="max-width:var(--measure)">${L(`The kiosk is paid from the seed line for technology, the kiosk and screens (${tsh(tech)}). At the carried budget of TSh 10M (estimate), it takes about ${Math.round(10e6/tech*100)}% of that line.`,`Kibanda kinalipwa kutoka mstari wa mtaji wa awali wa teknolojia, kibanda na skrini (${tsh(tech)}). Kwa bajeti inayobebwa ya TSh milioni 10 (makadirio), kinachukua takriban asilimia ${Math.round(10e6/tech*100)} ya mstari huo.`)}</p>`:'')}
  ${costTable()}
 </section>

 ${A().openHTML([
  L('Written quotes from three suppliers. Every kiosk price on this page is a public listing price; no supplier has been asked for a quote yet.','Nukuu za maandishi kutoka kwa wasambazaji watatu. Kila bei ya kibanda katika ukurasa huu ni bei ya tangazo la wazi; bado hakuna msambazaji aliyeombwa nukuu.'),
  L('Certificates: CE for the blood-pressure and oxygen functions, ISO 13485 for the factory and the blood-pressure validation report have not been seen. The full module lists of two shortlisted units, including oxygen and temperature, are still to be confirmed.','Vyeti: CE kwa kazi za shinikizo la damu na oksijeni, ISO 13485 kwa kiwanda na ripoti ya uthibitisho wa kipimo cha shinikizo la damu bado havijaonekana. Orodha kamili za moduli za vibanda viwili vilivyochaguliwa, pamoja na oksijeni na joto, bado zinasubiri kuthibitishwa.'),
  L('TMDA’s confirmation in writing of the kiosk’s class, and the dealer’s registration of the chosen model.','Uthibitisho wa maandishi wa TMDA kuhusu daraja la kibanda, na usajili wa muuzaji wa aina iliyochaguliwa.'),
  L('Freight and clearing quotes, and the customs classification (0% duty as a medical instrument, or 10% under another heading). Whether the VAT can be reclaimed.','Nukuu za usafiri na forodha, na uainishaji wa forodha (ushuru 0% kama kifaa tiba, au 10% chini ya kifungu kingine). Kama VAT inaweza kurejeshwa.'),
  L('The 50-second and 2–3 minute times, which will be measured on the delivered unit; Kiswahili screen text and text-message results from the supplier.','Muda wa sekunde 50 na dakika 2–3, utakaopimwa kwenye kibanda kitakachofika; maandishi ya skrini ya Kiswahili na matokeo kwa ujumbe mfupi kutoka kwa msambazaji.'),
  L('The referral rules, to be signed by a licensed Tanzanian clinician; the consent wording and registration with the Personal Data Protection Commission, to be confirmed with a Tanzanian lawyer.','Kanuni za rufaa, zitakazosainiwa na daktari mwenye leseni wa Tanzania; maneno ya ridhaa na usajili kwa Tume ya Ulinzi wa Taarifa Binafsi, yatakayothibitishwa na mwanasheria wa Tanzania.'),
  L('No supplier or Tanzanian distributor offering to lease a kiosk has been found; three Dar es Salaam distributors will be asked for a 12-month lease quote.','Hakuna kiwanda wala msambazaji wa Tanzania aliyepatikana anayekodisha kibanda; wasambazaji watatu wa Dar es Salaam wataombwa nukuu ya kukodisha kwa miezi 12.')])}

 <div id="abSrc">${A().sourcesHTML(SRC())}</div>
 ${A().pagerHTML(pv,nx)}
 </div></article>`}

/* ---------- interactions ---------- */
let raf=null,st={p:'a',m:'full',sc:'base'};
function stop(){if(raf){cancelAnimationFrame(raf);raf=null}}
const fmtT=s=>Math.floor(s/60)+':'+String(Math.floor(s%60)).padStart(2,'0');
function steps(){return st.m==='quick'?DEMO_STEPS.slice(0,4):DEMO_STEPS}
function idx(){return st.m==='quick'?[0,1,2,3,6]:[0,1,2,3,4,5,6]}
function paintList(shown){const P=PROF()[st.p],rl=document.getElementById('s33Rl');if(!rl)return;
 rl.innerHTML=MEAS.map((m,i)=>{const on=shown.has(i),inQ=idx().includes(i);
  return `<li class="${on?'':'s33-wait'}"><b>${L(m[0],m[1])}${on?`<span class="s33-st s${P.s[i]}">${L(STAT[P.s[i]][0],STAT[P.s[i]][1])}</span>`:''}</b><em>${on?E(P.v[i]):inQ?'…':L('not in the quick check','haipo kwenye kipimo cha haraka')}</em>${on?`<small>${L(P.x[i][0],P.x[i][1])}</small>`:''}</li>`}).join('')}
function reset(){stop();const c=document.getElementById('s33Clk');if(!c)return;c.textContent='0:00';document.getElementById('s33Bar').style.width='0';
 document.getElementById('s33Step').innerHTML=`<p>${L('Press “Start the check”. The readings fill in as each step finishes, with what the adviser would say.','Bonyeza “Anza kipimo”. Vipimo vinajaa kila hatua inapokamilika, pamoja na kile ambacho mshauri angesema.')}</p><p class="ab-mute" style="font-size:var(--fs-cap)">${L('Screening, not diagnosis · free · no purchase needed','Uchunguzi, si utambuzi · bure · hakuna sharti la kununua')}</p>`;
 document.getElementById('s33Sum').innerHTML='';paintList(new Set())}
function finish(){const P=PROF()[st.p],quick=st.m==='quick';
 document.getElementById('s33Step').innerHTML=`<p><b>${quick?L('Quick check complete','Kipimo cha haraka kimekamilika'):L('Full check complete','Kipimo kamili kimekamilika')}</b></p><p>${L('Result printed and shown as a QR code. An adviser now explains each reading.','Matokeo yamechapishwa na kuonyeshwa kama msimbo wa QR. Sasa mshauri anaeleza kila kipimo.')}</p>`;
 const sum=quick?L('Five readings taken. Blood pressure and oxygen are measured only in the full check, so the adviser invites the customer to sit for them now or on the next visit.','Vipimo vitano vimechukuliwa. Shinikizo la damu na oksijeni vinapimwa kwenye kipimo kamili tu, hivyo mshauri anamkaribisha mteja aketi kwa vipimo hivyo sasa au atakaporudi.'):L(P.sum[0],P.sum[1]);
 document.getElementById('s33Sum').innerHTML=`<p class="s33-sum"><b>${L('The adviser','Mshauri')}:</b> ${sum}</p>`}
function run(){stop();reset();const S=steps(),end=S[S.length-1][3],shown=new Set(),clk=document.getElementById('s33Clk'),bar=document.getElementById('s33Bar'),sp=document.getElementById('s33Step');
 const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,SPEED=10,t0=performance.now();let cur=-1;
 const tick=now=>{if(!document.getElementById('s33Clk')){stop();return}
  const t=reduce?end:Math.min(end,(now-t0)/1000*SPEED);clk.textContent=fmtT(t);bar.style.width=(t/end*100).toFixed(1)+'%';
  const i=S.findIndex(s=>t<s[3]);const k=i<0?S.length-1:i;
  if(k!==cur){cur=k;sp.innerHTML=`<p class="ab-mute" style="font-size:var(--fs-cap)">${L('Step','Hatua')} ${k+1} ${L('of','kati ya')} ${S.length}</p><p>${L(S[k][0],S[k][1])}</p>`}
  let ch=false;S.forEach(s=>{if(t>=s[3])s[4].forEach(r=>{if(!shown.has(r)){shown.add(r);ch=true}})});if(ch)paintList(shown);
  if(t>=end){raf=null;finish();return}raf=requestAnimationFrame(tick)};
 raf=requestAnimationFrame(tick)}
function seg(id,key,fn){const g=document.getElementById(id);if(!g)return;g.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{g.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));fn(b.dataset[key])}))}
function init(){if(!document.getElementById('s33Clk'))return;st={p:'a',m:'full',sc:'base'};reset();
 seg('s33Prof','p',v=>{st.p=v;reset()});seg('s33Mode','m',v=>{st.m=v;reset()});
 seg('s33Sc','s',v=>{st.sc=v;document.getElementById('s33Fun').innerHTML=funnelSVG(v)});
 document.getElementById('s33Go').addEventListener('click',run);document.getElementById('s33Rst').addEventListener('click',reset);
 addEventListener('afya:leave',stop,{once:true})}

window.SECTIONS['s3-3']={render,init,v2:true};
})();
