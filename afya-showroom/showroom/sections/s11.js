/* 1.1 The problem · v2 on the D2 template.
   Text and figures from research/chapter1-reference.html (founder-approved Chapter 1) and the old part1.js sec11,
   corrected per audit/03-part1.md: medicines only through the licensed partner pharmacy (B4), no invented "measured"
   values (Juma's evening and the calculator are labelled illustrative), no faces (D-1/B12), one language per string (B7/B8).
   District populations: NBS 2022 census via City Population (re-opened 10 Nov 2026). The map is stylised, not to scale. */
(function(){
'use strict';
const A=()=>window.AB,T=(e,s)=>A().T(e,s),E=s=>A().E(s),L=(e,s)=>E(T(e,s));
const nf=n=>Math.round(n).toLocaleString('en-US');
const tsh=n=>'TSh '+nf(n);
const CHK='10 Nov 2026';

/* ---------- sources (numbered in this order); chk = date re-opened, '' = not re-checked ---------- */
const SRC=[
 {k:'addo',t:['BMC Health Services Research (2022), citing the Pharmacy Council of Tanzania: about 11,356 accredited drug dispensing outlets and 1,334 pharmacies (2018)','BMC Health Services Research (2022), ikinukuu Baraza la Famasi Tanzania: takriban maduka 11,356 ya dawa yaliyothibitishwa (ADDO) na famasi 1,334 (2018)'],u:'https://bmchealthservres.biomedcentral.com/counter/pdf/10.1186/s12913-022-08980-6.pdf',chk:''},
 {k:'citypop',t:['City Population, NBS census counts for Dar es Salaam region and districts, 2002–2022, with 2022 age groups','City Population, sensa za NBS kwa mkoa wa Dar es Salaam na wilaya zake, 2002–2022, pamoja na makundi ya umri ya 2022'],u:'https://www.citypopulation.de/en/tanzania/admin/07',chk:CHK},
 {k:'who_sf',t:['WHO news release, 28 November 2017: 1 in 10 medical products in developing countries is substandard or falsified (10.5% estimate, 88 countries, 48,000 samples)','Taarifa ya WHO, 28 Novemba 2017: bidhaa 1 kati ya 10 za tiba katika nchi zinazoendelea ni duni au bandia (makadirio ya 10.5%, nchi 88, sampuli 48,000)'],u:'https://www.who.int/news/item/28-11-2017-1-in-10-medical-products-in-developing-countries-is-substandard-or-falsified',chk:CHK},
 {k:'jnia',t:['The Guardian (Tanzania), 10 September 2026: TMDA seizes unregistered medicines worth 360m/- in JNIA crackdown','The Guardian (Tanzania), 10 Septemba 2026: TMDA yakamata dawa zisizosajiliwa za thamani ya milioni 360 katika msako wa JNIA'],u:'https://ippmedia.co.tz/the-guardian/news/local-news/read/tmda-seizes-unregistered-medicines-worth-360m-jnia-crackdown-2026-09-10-144750',chk:''},
 {k:'steps_ht',t:['Mayige et al., Tanzania Journal of Health Research 27(2), 2026: hypertension among adults aged 18–69, 2023 National STEPS survey','Mayige na wenzake, Tanzania Journal of Health Research 27(2), 2026: shinikizo la juu la damu kwa watu wazima wa miaka 18–69, utafiti wa kitaifa wa STEPS 2023'],u:'https://nhrdr.nimr.or.tz/records/209',chk:CHK},
 {k:'steps_dm',t:['Mayige et al., Tanzania Journal of Health Research 27(2), 2026: type 2 diabetes care cascade among adults aged 18–69, 2023 National STEPS survey','Mayige na wenzake, Tanzania Journal of Health Research 27(2), 2026: mfululizo wa huduma ya kisukari aina ya 2 kwa watu wazima wa miaka 18–69, utafiti wa kitaifa wa STEPS 2023'],u:'https://nhrdr.nimr.or.tz/records/210',chk:CHK},
 {k:'census',t:['NBS, June 2024: 2022 Population and Housing Census, Key Findings (age structure: 15.4% aged 0–4, 5.7% aged 60 and over)','NBS, Juni 2024: Sensa ya Watu na Makazi 2022, Matokeo Muhimu (muundo wa umri: 15.4% wenye miaka 0–4, 5.7% wenye miaka 60 na zaidi)'],u:'https://sensa.nbs.go.tz/publication/08. Key_Findings_Basic_Demographic_and_Socio-economic_ Eng_ 12.06.2024 Final.pdf',chk:''},
 {k:'rem25',t:['The Citizen, 27 May 2026: Diaspora remittances hit Sh3.3 trillion (Sh3.313 trillion in the 2024/25 financial year)','The Citizen, 27 Mei 2026: Fedha zinazotumwa na diaspora zafikia Sh trilioni 3.3 (Sh trilioni 3.313 mwaka wa fedha 2024/25)'],u:'https://www.thecitizen.co.tz/tanzania/diaspora/diaspora-remittances-hit-sh3-3-trillion-as-tanzania-deepens-global-engagement-5473984',chk:CHK},
 {k:'who_ht',t:['WHO, United Republic of Tanzania hypertension country profile (2012 STEPS survey, adults aged 25–64): aware 17.6%, treated 8.3%, controlled 2.2%','WHO, wasifu wa nchi kuhusu shinikizo la juu la damu, Tanzania (utafiti wa STEPS 2012, watu wazima wa miaka 25–64): wanaojua 17.6%, wanaotibiwa 8.3%, waliodhibiti 2.2%'],u:'https://cdn.who.int/media/docs/default-source/country-profiles/hypertension/tza_en.pdf',chk:CHK}];
const ix=k=>SRC.findIndex(x=>x.k===k)+1;
const cA=k=>`<a href="#s11Src" class="ab-cite" aria-label="${L('Source','Chanzo')} ${ix(k)}">${ix(k)}</a>`;
const cite=(...ks)=>`<sup>${ks.map(cA).join(', ')}</sup>`;
function srcFooter(){return `<div id="s11Src"><details class="ab-sources"><summary>${L('Sources for this section','Vyanzo vya sehemu hii')} (${SRC.length})</summary><ol>${SRC.map(x=>`<li><span lang="en"><a href="${E(x.u)}" target="_blank" rel="noopener">${L(x.t[0],x.t[1])}</a></span> <span class="ab-chk">· ${x.chk?L('checked','imekaguliwa')+' '+E(x.chk):L('not re-checked','haijakaguliwa tena')}</span></li>`).join('')}</ol></details></div>`}

const CONF={h:['High','Juu','Official national survey, census or regulator data','Utafiti rasmi wa kitaifa, sensa au takwimu za mamlaka'],m:['Medium','Wastani','Official but older, modelled, global or press-reported','Rasmi lakini ya zamani, ya kimodeli, ya kimataifa au iliyoripotiwa na vyombo vya habari'],i:['Indicative','Kiashiria','News report, screening event or one-off case','Habari, tukio la upimaji au tukio la mara moja']};
const conf=k=>`<span class="s11-conf s11-c${k}" title="${L(CONF[k][2],CONF[k][3])}">${L('Confidence','Uhakika')}: ${L(CONF[k][0],CONF[k][1])}</span>`;
const ill=()=>`<span class="ab-est">${L('illustrative','mfano')}</span>`;
const est=()=>`<span class="ab-est">${L('estimate','makadirio')}</span>`;

/* ---------- the five pains ---------- */
const PAIN=[
 {n:['Scattered','Kutawanyika'],h:['One need, five shops.','Hitaji moja, maduka matano.'],
  p:['A household’s health needs do not sit on one shelf. A mother with a baby needs nappies, wipes, baby lotion and a thermometer. A man with high blood pressure needs a monitor that works, batteries for it, a cuff that fits and, often, test strips for the diabetes that comes with it. In Dar es Salaam these sit in different places: baby care at a supermarket, devices at a medical-supplies shop, medicines at a pharmacy or drug shop, home-care items somewhere else again. Most outlets are small drug shops with a narrow range, so the first stop is often out of the size or brand that is needed.',
     'Mahitaji ya afya ya familia hayako kwenye rafu moja. Mama mwenye mtoto anahitaji nepi, vitambaa vya mtoto, losheni ya mtoto na kipimajoto. Baba mwenye shinikizo la juu la damu anahitaji kipimo kinachofanya kazi, betri zake, mkanda unaomtosha na, mara nyingi, vipande vya kupima sukari kwa kisukari kinachoambatana nalo. Jijini Dar es Salaam vitu hivi viko sehemu tofauti: bidhaa za mtoto kwenye supamaketi, vifaa kwenye duka la vifaa tiba, dawa kwenye famasi au duka la dawa, na bidhaa za nyumbani mahali pengine. Maduka mengi ni madogo yenye bidhaa chache, hivyo duka la kwanza mara nyingi halina saizi au chapa inayohitajika.'],
  fact:['11,356 : 1,334','11,356 : 1,334'],factL:['accredited drug dispensing outlets (ADDOs) against registered pharmacies in Tanzania, 2018: most outlets are small shops with a narrow range','maduka ya dawa yaliyothibitishwa (ADDO) dhidi ya famasi zilizosajiliwa Tanzania, 2018: maduka mengi ni madogo yenye bidhaa chache'],src:'addo',conf:'m',
  cost:[[['Time','Muda'],['Several stops for one month of supplies, each with its own wait.','Vituo kadhaa kwa mahitaji ya mwezi mmoja, kila kimoja na kusubiri kwake.']],[['Money','Pesa'],['Bajaji or daladala fares between shops, and small-shop prices above a planned purchase.','Nauli za bajaji au daladala kati ya maduka, na bei za maduka madogo zilizo juu ya ununuzi uliopangwa.']],[['Health','Afya'],['When the right item is missing, people buy a substitute nobody advised, or go without.','Bidhaa sahihi ikikosekana, watu hununua mbadala ambao hakuna aliyeushauri, au hukosa kabisa.']]],
  today:[['Baby care, devices, home care and medicines sold in different shops','Bidhaa za mtoto, vifaa, bidhaa za nyumbani na dawa zinauzwa maduka tofauti'],['Several trips and fares for one month of supplies','Safari na nauli kadhaa kwa mahitaji ya mwezi mmoja'],['Substitutes bought without advice when the right item is missing','Mbadala hununuliwa bila ushauri bidhaa sahihi ikikosekana']],
  afya:[['One store organised by need, not by brand: baby care, devices and home care under one roof','Duka moja lililopangwa kwa mahitaji, si kwa chapa: bidhaa za mtoto, vifaa na bidhaa za nyumbani chini ya paa moja'],['A choice of four or five brands in the same price range for each item','Chaguo la chapa nne au tano za bei moja kwa kila bidhaa'],['Medicines from the licensed partner pharmacy at its own counter in the store; Afya Basics itself sells none','Dawa kutoka famasia mshirika yenye leseni kwenye kaunta yake ndani ya duka; Afya Basics yenyewe haiuzi dawa']],
  why:['This is the core of the store: one stop replaces five. Every extra item a family finds in one place raises the basket and brings them back next month.','Kwa mwekezaji hiki ndicho kiini cha duka: kituo kimoja kinachukua nafasi ya vitano. Kila bidhaa ya ziada familia inayopata mahali pamoja huongeza kikapu na kuwarudisha mwezi ujao.']},
 {n:['Slow','Polepole'],h:['A two-minute question costs an afternoon.','Swali la dakika mbili linagharimu mchana mzima.'],
  p:['In most shops one counter does everything: advice, finding the item, taking payment and giving change. A parent who only wants to ask which thermometer is accurate waits behind everyone who is paying. Add Dar es Salaam traffic and the heat, and one errand becomes half a day. The city keeps growing, from 4.36 million people in 2012 to 5.38 million in 2022, while the way people buy health items has not changed.',
     'Katika maduka mengi kaunta moja hufanya kila kitu: ushauri, kutafuta bidhaa, kupokea malipo na kurudisha chenji. Mzazi anayetaka kuuliza tu kipimajoto kipi ni sahihi husubiri nyuma ya kila anayelipa. Ongeza msongamano wa magari wa Dar es Salaam na joto, na shughuli moja inakuwa nusu siku. Jiji linaendelea kukua, kutoka watu milioni 4.36 mwaka 2012 hadi milioni 5.38 mwaka 2022, lakini namna watu wanavyonunua bidhaa za afya haijabadilika.'],
  fact:['+23%','+23%'],factL:['growth of Dar es Salaam region in ten years, from 4,364,541 to 5,383,728 people (2012 and 2022 censuses): more people, the same small counters','ongezeko la watu wa mkoa wa Dar es Salaam ndani ya miaka kumi, kutoka 4,364,541 hadi 5,383,728 (sensa za 2012 na 2022): watu wengi zaidi, kaunta zilezile ndogo'],src:'citypop',conf:'h',
  cost:[[['Time','Muda'],['Hours lost every month. Try your own numbers in the calculator further down.','Masaa yanayopotea kila mwezi. Jaribu namba zako kwenye kikokotoo kilicho chini zaidi.']],[['Money','Pesa'],['Fares and, for many people, unpaid time away from a stall, a salon or a job.','Nauli na, kwa wengi, muda usiolipwa nje ya kibanda, saluni au kazi.']],[['Health','Afya'],['When buying is slow, people buy less often, skip refills or stop early.','Ununuzi ukiwa wa polepole, watu hununua mara chache, huacha kujaza tena au huacha mapema.']]],
  today:[['One counter for advice, finding items and payment','Kaunta moja kwa ushauri, kutafuta bidhaa na malipo'],['A short question costs a long wait in the queue','Swali fupi linagharimu kusubiri kwa muda mrefu foleni'],['Traffic and heat turn one errand into half a day','Msongamano na joto hugeuza shughuli moja kuwa nusu siku']],
  afya:[['Advice and payment are separated: advisers answer questions and do not work the till','Ushauri na malipo vinatenganishwa: washauri hujibu maswali na hawashiki malipo'],['Mobile-money checkout, designed to take under 30 seconds','Malipo kwa pesa ya simu, yaliyoundwa kuchukua chini ya sekunde 30'],['Or no trip at all: order in the app or on WhatsApp for same-day delivery in Dar es Salaam','Au bila safari kabisa: agiza kwenye programu au WhatsApp ufikishiwe siku hiyohiyo jijini Dar es Salaam']],
  why:['Speed is what turns a one-off visit into a monthly habit. Fast checkout and home delivery are what let one store serve thousands of households.','Kasi ndiyo inayogeuza ziara ya mara moja kuwa tabia ya kila mwezi. Malipo ya haraka na kufikisha nyumbani ndivyo vinavyowezesha duka moja kuhudumia maelfu ya familia.']},
 {n:['Untrusted','Kutoaminika'],h:['Is it genuine? Nobody can tell.','Je, ni halisi? Hakuna anayeweza kujua.'],
  p:['A customer cannot test what they buy. Loose strips without a box, products with no readable expiry date and devices with no warranty are common in informal outlets. The World Health Organization estimates that about 1 in 10 medical products in low- and middle-income countries is substandard or falsified. In Tanzania the regulator, TMDA, keeps finding unregistered products: in September 2026 it seized unregistered medicines worth TSh 360 million at Dar es Salaam’s airport, among them treatments for diabetes and high blood pressure.',
     'Mteja hawezi kupima anachonunua. Vipande vya vidonge bila boksi, bidhaa zisizo na tarehe ya mwisho inayosomeka na vifaa visivyo na dhamana ni vya kawaida kwenye maduka yasiyo rasmi. Shirika la Afya Duniani linakadiria kwamba takriban bidhaa 1 kati ya 10 za tiba katika nchi za kipato cha chini na cha kati ni duni au bandia. Nchini Tanzania mamlaka ya udhibiti, TMDA, inaendelea kukamata bidhaa zisizosajiliwa: Septemba 2026 ilikamata dawa zisizosajiliwa za thamani ya TSh milioni 360 kwenye uwanja wa ndege wa Dar es Salaam, zikiwemo dawa za kisukari na shinikizo la juu la damu.'],
  fact:['1 in 10','1 kati ya 10'],factL:['medical products in low- and middle-income countries is substandard or falsified (WHO estimate: 10.5%, from 48,000 samples in 88 countries)','ya bidhaa za tiba katika nchi za kipato cha chini na cha kati ni duni au bandia (makadirio ya WHO: 10.5%, kutoka sampuli 48,000 katika nchi 88)'],src:'who_sf',conf:'m',
  cost:[[['Health','Afya'],['A weak or false product fails silently. A wrong strip reading leads to a wrong dose; the first sign may be a hospital admission.','Bidhaa dhaifu au bandia hushindwa kimya kimya. Kipimo kisicho sahihi cha kipande husababisha dozi isiyo sahihi; dalili ya kwanza inaweza kuwa kulazwa hospitali.']],[['Money','Pesa'],['Money spent on a product that does not work, then spent again on the right one.','Pesa zinazotumika kwa bidhaa isiyofanya kazi, kisha kutumika tena kwa iliyo sahihi.']],[['Trust','Imani'],['People stop trusting treatment itself, when the fault was the product.','Watu huacha kuamini matibabu yenyewe, kumbe kosa lilikuwa bidhaa.']]],
  today:[['Loose strips with no box, leaflet or readable expiry date','Vipande bila boksi, karatasi ya maelezo wala tarehe inayosomeka'],['No way for a customer to check what is genuine','Mteja hana njia ya kuhakiki kilicho halisi'],['No receipt or record if something goes wrong','Hakuna risiti wala kumbukumbu kitu kikiharibika']],
  afya:[['Registered products only, bought from licensed distributors','Bidhaa zilizosajiliwa pekee, kutoka kwa wasambazaji wenye leseni'],['The batch and expiry of every unit recorded at the till; expired or recalled batches are blocked','Namba ya toleo na tarehe ya mwisho ya kila bidhaa zinarekodiwa kwenye kaunta ya malipo; matoleo yaliyoisha muda au kurejeshwa yanazuiwa'],['Medicines dispensed only by the licensed partner pharmacy, under its own licence','Dawa zinatolewa na famasia mshirika yenye leseni pekee, chini ya leseni yake']],
  why:['Trust is the moat. A store that families know sells only registered products, with records and recalls, is hard for a small shop to copy.','Imani ndiyo ngome. Duka ambalo familia zinajua linauza bidhaa zilizosajiliwa pekee, likiwa na kumbukumbu na urejeshaji, ni gumu kwa duka dogo kuiga.']},
 {n:['Unplanned','Bila mpango'],h:['Nobody notices until it runs out.','Hakuna anayegundua hadi kinapokwisha.'],
  p:['Health needs repeat every month, but almost nobody plans them. Nappies, test strips and the batteries for a monitor run out on a Sunday night. Long-term conditions are also hidden: in the 2023 national survey 23.1% of adults aged 18–69 had raised blood pressure, and 72.4% of the people found with diabetes had never been diagnosed. A need that is not known is not planned, and a need that is not planned is bought in a rush, at any price, from whatever shop is open.',
     'Mahitaji ya afya hujirudia kila mwezi, lakini karibu hakuna anayeyapanga. Nepi, vipande vya kupima na betri za kipimo huisha Jumapili usiku. Magonjwa ya muda mrefu pia yamejificha: katika utafiti wa kitaifa wa 2023, asilimia 23.1 ya watu wazima wenye miaka 18–69 walikuwa na shinikizo la juu la damu, na asilimia 72.4 ya waliogundulika na kisukari hawakuwahi kugunduliwa kabla. Hitaji lisilojulikana halipangwi, na hitaji lisilopangwa hununuliwa kwa haraka, kwa bei yoyote, kwenye duka lolote lililo wazi.'],
  fact:['72.4%','72.4%'],factL:['of the people with diabetes found in the 2023 national STEPS survey had never been diagnosed (adults aged 18–69)','ya watu wenye kisukari waliogundulika katika utafiti wa kitaifa wa STEPS 2023 hawakuwahi kugunduliwa (watu wazima wa miaka 18–69)'],src:'steps_dm',conf:'h',
  cost:[[['Health','Afya'],['Late diagnosis and broken routines turn a cheap, controllable condition into an expensive emergency.','Kugundulika kwa kuchelewa na utaratibu unaokatika hugeuza hali nafuu inayodhibitika kuwa dharura ya gharama kubwa.']],[['Money','Pesa'],['Emergency buying at the nearest shop, at its price, with no time to compare.','Ununuzi wa dharura kwenye duka lililo karibu, kwa bei yake, bila muda wa kulinganisha.']],[['Stress','Msongo'],['The work of remembering every family member’s needs falls mostly on women.','Kazi ya kukumbuka mahitaji ya kila mwanafamilia huangukia zaidi wanawake.']]],
  today:[['Needs are noticed only when they run out','Mahitaji hugunduliwa tu yanapokwisha'],['Hidden conditions stay undiagnosed until a crisis','Magonjwa yaliyojificha hayagunduliwi hadi dharura'],['Emergency buying at any price, from any open shop','Ununuzi wa dharura kwa bei yoyote, duka lolote lililo wazi']],
  afya:[['A free Afya Check at the door finds hidden needs early; a quick check takes about 50 seconds (estimate)','Afya Check ya bure mlangoni hugundua mahitaji yaliyojificha mapema; kipimo cha haraka huchukua takriban sekunde 50 (makadirio)'],['The Afya Box arrives on a fixed day every month, before anything runs out','Afya Box inafika siku maalum kila mwezi, kabla kitu hakijaisha'],['Next month’s box can be changed up to 12 days before month end, with a reminder by phone','Boksi la mwezi ujao linaweza kubadilishwa hadi siku 12 kabla ya mwisho wa mwezi, kwa ukumbusho wa simu']],
  why:['Planning is the business model. A monthly Afya Box turns an unplanned emergency into predictable, recurring revenue.','Kupanga ndiyo mtindo wa biashara. Afya Box ya kila mwezi hugeuza dharura isiyopangwa kuwa mapato yanayotabirika na yanayojirudia.']},
 {n:['Far from family','Mbali na familia'],h:['The money arrives. The care may not.','Pesa inafika. Huduma huenda isifike.'],
  p:['Tanzanians living abroad, and children working in another city, send money home to look after their parents. In the 2024/25 financial year diaspora remittances reached TSh 3.31 trillion. But money is not care. The sender cannot see whether the supplies were bought, whether they were genuine, or whether the blood-pressure monitor was ever used. An older parent, often living alone, has to make the trips, carry the bags and remember the routine.',
     'Watanzania wanaoishi nje ya nchi, na watoto wanaofanya kazi mji mwingine, hutuma pesa nyumbani kuwatunza wazazi wao. Katika mwaka wa fedha 2024/25, fedha zilizotumwa na diaspora zilifikia TSh trilioni 3.31. Lakini pesa si huduma. Mtumaji hawezi kuona kama mahitaji yalinunuliwa, kama yalikuwa halisi, au kama kipimo cha shinikizo kiliwahi kutumika. Mzazi mzee, mara nyingi akiishi peke yake, inambidi asafiri, abebe mizigo na akumbuke utaratibu wake.'],
  fact:['TSh 3.31T','TSh trilioni 3.31'],factL:['sent home by Tanzanians abroad in the 2024/25 financial year (Sh3.313 trillion, as reported to Parliament)','zilizotumwa nyumbani na Watanzania walio nje katika mwaka wa fedha 2024/25 (Sh trilioni 3.313, kama ilivyoelezwa Bungeni)'],src:'rem25',conf:'m',
  cost:[[['Care','Huduma'],['Money meant for care is spent on other urgent needs, or on the wrong product.','Pesa iliyokusudiwa huduma hutumika kwa mahitaji mengine ya haraka, au kwa bidhaa isiyo sahihi.']],[['Worry','Wasiwasi'],['Families abroad call and ask, but cannot check. Older parents say they are fine, to avoid being a burden.','Familia za nje hupiga simu na kuuliza, lakini hawawezi kuhakiki. Wazazi wazee husema wako salama, ili wasiwe mzigo.']],[['Health','Afya'],['Long-term conditions in older adults go unmonitored until a crisis.','Magonjwa ya muda mrefu ya wazee hayafuatiliwi hadi dharura.']]],
  today:[['Money is sent, but nobody can see what it buys','Pesa inatumwa, lakini hakuna anayeona inanunua nini'],['Older parents travel alone to buy and carry supplies','Wazazi wazee husafiri peke yao kununua na kubeba mahitaji'],['A broken routine is discovered only after a crisis','Utaratibu uliokatika hugundulika tu baada ya dharura']],
  afya:[['A son or daughter abroad chooses the box and pays by card','Mwana aliye nje huchagua boksi na kulipa kwa kadi'],['Delivery to the parent’s door with a photo confirmation','Kufikishwa mlangoni kwa mzazi pamoja na picha ya uthibitisho'],['Reminders and a short monthly report to the family, with the parent’s consent; any medicine the parent’s clinic prescribes comes from the licensed partner pharmacy','Ukumbusho na ripoti fupi ya kila mwezi kwa familia, kwa ridhaa ya mzazi; dawa yoyote inayoagizwa na kliniki ya mzazi inatoka famasia mshirika yenye leseni']],
  why:['The diaspora is a paying customer who is not in Tanzania. Letting them buy care, not only send cash, opens a market no local shop can serve.','Diaspora ni mteja anayelipa ambaye hayupo Tanzania. Kuwawezesha kununua huduma, si kutuma pesa tu, kunafungua soko ambalo hakuna duka la ndani linaweza kulihudumia.']}];

/* ---------- stylised district map (not to scale); populations: 2022 census via City Population ---------- */
const DIST=[['Kinondoni','982,328','M300 40 L560 12 L585 92 L648 138 L632 178 L592 172 L600 240 L470 255 L380 200 Z',470,110],['Ubungo','1,086,912','M60 110 L300 40 L380 200 L340 330 L120 345 L50 230 Z',190,190],['Ilala','1,649,912','M340 330 L380 200 L470 255 L600 240 L606 300 L560 336 L520 420 L380 436 Z',440,390],['Temeke','1,346,674','M120 345 L340 330 L380 436 L520 420 L546 362 L556 470 L500 570 L300 610 L140 520 Z',300,540],['Kigamboni','317,902','M592 346 L640 332 L730 420 L760 520 L700 610 L560 600 L556 470 L574 420 Z',665,450]];
const PINS=[{x:510,y:300,d:2},{x:230,y:260,d:1},{x:390,y:480,d:3},{x:520,y:180,d:0},{x:680,y:540,d:4}];
function mapSVG(){
 const d=DIST.map((x,i)=>`<path class="s11-d" data-d="${i}" d="${x[2]}"/>`).join('');
 const lb=DIST.map(x=>`<text x="${x[3]}" y="${x[4]}" text-anchor="middle" font-size="22" fill="var(--ink)">${E(x[0])}</text><text x="${x[3]}" y="${x[4]+24}" text-anchor="middle" font-size="18" fill="var(--mute)">${x[1]}</text>`).join('');
 const pins=PINS.map((p,i)=>`<g class="s11-pin" data-k="${i}" tabindex="0" role="button" aria-label="${L('Pain','Tatizo')} ${i+1}: ${L(PAIN[i].n[0],PAIN[i].n[1])}"><circle cx="${p.x}" cy="${p.y}" r="24"/><text x="${p.x}" y="${p.y+7}" text-anchor="middle" font-size="20" font-weight="600" fill="var(--ink)">${i+1}</text></g>`).join('');
 return `<svg class="s11-map" viewBox="0 0 820 640" role="group" aria-labelledby="s11mt"><title id="s11mt">${L('Stylised map of the five Dar es Salaam districts with their 2022 populations, and five numbered pins for the five pains','Ramani ya mfano ya wilaya tano za Dar es Salaam pamoja na idadi ya watu wa 2022, na alama tano zenye namba kwa matatizo matano')}</title>
  <text x="790" y="300" text-anchor="end" font-size="18" fill="var(--mute)">${L('Indian Ocean','Bahari ya Hindi')}</text>${d}${lb}${pins}</svg>`}
function panelHTML(k){const x=PAIN[k];
 return `<p class="s11-k">${L('Pain','Tatizo')} ${k+1} ${L('of 5','kati ya 5')}: ${L(x.n[0],x.n[1])}</p>
  <h3>${L(x.h[0],x.h[1])}</h3>
  <p class="s11-fv">${L(x.fact[0],x.fact[1])}</p>
  <p class="s11-fl">${L(x.factL[0],x.factL[1])}${cite(x.src)}</p>
  ${conf(x.conf)}
  <ul class="s11-ul">${x.afya.slice(0,2).map(a=>`<li>${L(a[0],a[1])}</li>`).join('')}</ul>
  <p><a class="ab-btn" href="#s11-p${k+1}" data-jump="s11-p${k+1}">${L('Read pain','Soma tatizo')} ${k+1} ${L('in full','kikamilifu')} ↓</a></p>`}

function painBlock(x,i){
 return `<section class="ab-block" id="s11-p${i+1}"><h2>${i+1}. ${L(x.h[0],x.h[1])}</h2>
  <p class="s11-k">${L('Pain','Tatizo')} ${i+1}: ${L(x.n[0],x.n[1])}</p>
  <p>${L(x.p[0],x.p[1])}${i===2?cite('jnia'):''}${i===3?cite('steps_ht'):''}</p>
  <div class="s11-fact"><b>${L(x.fact[0],x.fact[1])}</b><span>${L(x.factL[0],x.factL[1])}${cite(x.src)}</span>${conf(x.conf)}</div>
  <h3>${L('What it costs the household','Gharama yake kwa familia')}</h3>
  <div class="ab-tw"><table class="ab-t"><tbody>${x.cost.map(c=>`<tr><td><b>${L(c[0][0],c[0][1])}</b></td><td>${L(c[1][0],c[1][1])}</td></tr>`).join('')}</tbody></table></div>
  <div class="s11-cmp"><div><h3>${L('Today','Leo')}</h3><ul class="s11-ul">${x.today.map(a=>`<li>${L(a[0],a[1])}</li>`).join('')}</ul></div>
   <div><h3>${L('With Afya Basics','Ukiwa na Afya Basics')}</h3><ul class="s11-ul">${x.afya.map(a=>`<li>${L(a[0],a[1])}</li>`).join('')}</ul></div></div>
  <p class="s11-why"><b>${L('Why it matters to an investor.','Kwa nini ni muhimu kwa mwekezaji.')}</b> ${L(x.why[0],x.why[1])}</p></section>`}

/* ---------- Juma's evening (approved Chapter 1; illustrative family, typical times) ---------- */
const JUMA=[
 ['06:30','The list at the door','Orodha mlangoni','Before Juma leaves for work, Neema gives him four things to bring home: nappies in size four, baby wipes, iron tablets and a fever medicine to keep in the house.','Kabla Juma hajaondoka kwenda kazini, Neema anampa vitu vinne vya kuleta nyumbani: nepi saizi ya nne, vitambaa vya mtoto, vidonge vya madini ya chuma na dawa ya homa ya kuweka nyumbani.'],
 ['07:30','The list goes into his phone','Orodha inaingia kwenye simu','Stuck in traffic on Bagamoyo Road, he types the list into his phone. The working day takes over.','Akiwa amekwama kwenye foleni barabara ya Bagamoyo, anaandika orodha kwenye simu yake. Siku ya kazi inachukua nafasi.'],
 ['17:02','“The baby is a little warm”','“Mtoto ana joto kidogo”','Neema calls. The fever medicine, one item among four in the morning, is now urgent.','Neema anapiga simu. Dawa ya homa, iliyokuwa kitu kimoja kati ya vinne asubuhi, sasa ni ya dharura.'],
 ['17:45','He leaves work','Anaondoka kazini','The pharmacies near the office keep no record of what his family uses, and none of them delivers.','Maduka ya dawa karibu na ofisi hayana kumbukumbu ya kile familia yake inatumia, na hakuna hata moja linaloleta nyumbani.'],
 ['19:00','Rain on the main road','Mvua barabarani','An hour passes for a few kilometres. In all he spends more than two hours in traffic before the first shop.','Saa nzima inapita kwa kilomita chache. Kwa jumla anatumia zaidi ya saa mbili kwenye foleni kabla ya duka la kwanza.'],
 ['20:05','Shop one: sold out','Duka la kwanza: zimekwisha','The first shop has sold out of nappies.','Duka la kwanza limeishiwa nepi.'],
 ['21:25','Shop two: the wrong size, no wipes','Duka la pili: saizi isiyo sahihi, hakuna vitambaa','The second has nappies, but not in size four, and no wipes. He buys the size three and the iron tablets.','La pili lina nepi, lakini si saizi ya nne, na halina vitambaa vya mtoto. Ananunua saizi ya tatu na vidonge vya madini ya chuma.'],
 ['22:05','Shop three: no box, no date','Duka la tatu: bila boksi, bila tarehe','The third has the fever medicine only as a loose bottle, with no box and no visible expiry date. He cannot tell whether it is genuine, and leaves it.','La tatu lina dawa ya homa katika chupa iliyo wazi tu, bila boksi wala tarehe ya mwisho inayoonekana. Hawezi kujua kama ni halisi, na anaiacha.'],
 ['22:40','Home with two of four items','Nyumbani na vitu viwili kati ya vinne','One of them is the wrong size. There are no wipes and no fever medicine in the house.','Kimoja kati yake ni saizi isiyo sahihi. Nyumbani hakuna vitambaa vya mtoto wala dawa ya homa.']];
const JT=[
 [['Three shops tried after a working day','Maduka matatu yamejaribiwa baada ya siku ya kazi'],['The list is saved once, with sizes and brands','Orodha inahifadhiwa mara moja, pamoja na saizi na chapa']],
 [['Two of four items found, one in the wrong size','Vitu viwili kati ya vinne vimepatikana, kimoja saizi isiyo sahihi'],['Nappies and wipes arrive in the box on a fixed day each month, before they run out','Nepi na vitambaa vinafika ndani ya boksi siku maalum kila mwezi, kabla havijaisha']],
 [['A loose bottle with no box and no date','Chupa iliyo wazi bila boksi wala tarehe'],['Registered products only, each traceable to its batch; the iron tablets and the fever medicine come from the licensed partner pharmacy','Bidhaa zilizosajiliwa pekee, kila moja ikifuatilika hadi toleo lake; vidonge vya madini ya chuma na dawa ya homa vinatoka famasia mshirika yenye leseni']],
 [['No record, so the same search starts again next month','Hakuna kumbukumbu, hivyo msako uleule unaanza tena mwezi ujao'],['Urgent goods by same-day delivery, with an order designed to take about thirty seconds','Bidhaa za haraka zinafikishwa siku hiyohiyo, kwa oda iliyoundwa kuchukua takriban sekunde thelathini']]];

/* ---------- who is most affected ---------- */
const WHO=[
 ['15.4%',['Mothers with young children','Mama wenye watoto wadogo'],['of Tanzanians are aged 0–4: 9,484,171 young children counted in 2022. Nappies, wipes, baby care, a thermometer and growth checks, every month.','ya Watanzania wana miaka 0–4: watoto wadogo 9,484,171 walihesabiwa mwaka 2022. Nepi, vitambaa, bidhaa za mtoto, kipimajoto na ufuatiliaji wa ukuaji, kila mwezi.'],'census'],
 ['23.1%',['People living with a long-term condition','Watu wenye magonjwa ya muda mrefu'],['of adults aged 18–69 have raised blood pressure, and most diabetes is undiagnosed. Monitors, strips, cuffs and regular checks, for life; medicines through the partner pharmacy.','ya watu wazima wa miaka 18–69 wana shinikizo la juu la damu, na kisukari kingi hakijagunduliwa. Vipimo, vipande, mikanda na ufuatiliaji wa mara kwa mara, maisha yote; dawa kupitia famasia mshirika.'],'steps_ht'],
 ['5.7%',['Families caring for older relatives','Familia zinazowatunza wazee'],['of Tanzanians are aged 60 or over: 3,491,983 people. Mobility aids, adult-care products and a carer who is also working.','ya Watanzania wana miaka 60 au zaidi: watu 3,491,983. Vifaa vya kutembea, bidhaa za huduma kwa watu wazima na mlezi ambaye pia anafanya kazi.'],'census'],
 ['TSh 3.31T',['Family abroad paying for care','Familia ya nje inayolipia huduma'],['sent home in 2024/25. They pay, but cannot see the care.','zilitumwa nyumbani mwaka 2024/25. Wanalipa, lakini hawaoni huduma.'],'rem25']];

/* ---------- calculator presets: example values only ---------- */
const PRE={mama:[['Mother and baby','Mama na mtoto'],5,2000,2.5,2000],cond:[['Long-term condition','Ugonjwa wa muda mrefu'],3,2500,2,2000],elder:[['Caring for a parent','Kumtunza mzazi'],4,4000,3,2000]};

const CSS=`
.s11 figure.ab-visual{margin-left:0;margin-right:0}
.s11 figcaption{margin-top:var(--s2);color:var(--mute);font-size:var(--fs-cap);max-width:var(--measure)}
.s11 .s11-mapw{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);gap:var(--s4);align-items:start}
.s11 .s11-map{display:block;width:100%;height:auto}
.s11 .s11-d{fill:var(--surface);stroke:var(--line);stroke-width:2}
.s11 .s11-d.on{fill:var(--green-deep)}
.s11 .s11-pin{cursor:pointer;outline:none}
.s11 .s11-pin circle{fill:var(--green);stroke:var(--bg);stroke-width:3}
.s11 .s11-pin.on circle{stroke:var(--gold)}
.s11 .s11-pin:focus-visible circle{stroke:var(--green-edge);stroke-width:5}
.s11 .s11-tabs{display:flex;flex-wrap:wrap;gap:var(--s1);margin-bottom:var(--s3)}
.s11 .s11-tabs button{background:none;border:1px solid var(--line);border-radius:999px;color:var(--mute);padding:7px 14px;font-size:var(--fs-cap);cursor:pointer;min-height:34px}
.s11 .s11-tabs button[aria-pressed="true"]{background:var(--green-deep);color:var(--ink);border-color:var(--green-deep)}
.s11 .s11-panel{border-left:2px solid var(--green-edge);padding-left:var(--s3)}
.s11 .s11-panel h3{font-size:var(--fs-sub);font-weight:600;margin:var(--s1) 0 var(--s2)}
.s11 .s11-k{color:var(--mute);font-size:var(--fs-cap);margin:0}
.s11 .s11-fv{color:var(--gold);font-size:var(--fs-sub);font-weight:600;margin:0}
.s11 .s11-fl{margin:4px 0 var(--s1)}
.s11 .s11-conf{display:inline-block;font-size:var(--fs-cap);color:var(--mute);border:1px solid var(--line);border-radius:999px;padding:1px 10px}
.s11 .s11-conf.s11-ch{border-color:var(--green-edge);color:var(--ink)}
.s11 .s11-conf.s11-cm{border-color:var(--mute)}
.s11 ul.s11-ul{margin:var(--s2) 0 0;padding-left:20px;max-width:var(--measure)}.s11 ul.s11-ul li+li{margin-top:6px}
.s11 .s11-fact{display:grid;grid-template-columns:auto minmax(0,1fr);gap:4px var(--s3);align-items:baseline;margin:var(--s3) 0;padding:var(--s2) 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.s11 .s11-fact b{color:var(--gold);font-size:var(--fs-sub);font-weight:600;white-space:nowrap}
.s11 .s11-fact .s11-conf{grid-column:2;justify-self:start}
.s11 .s11-cmp{display:grid;grid-template-columns:1fr 1fr;gap:var(--s4);margin-top:var(--s2)}
.s11 h3{font-size:var(--fs-sub);font-weight:600;margin-top:var(--s4)}
.s11 .s11-cmp h3{margin-top:var(--s3)}
.s11 .s11-why{border-left:2px solid var(--gold);padding-left:var(--s2);margin-top:var(--s3)}
.s11 .ab-block>h2+*{margin-top:var(--s2)}
.s11 .ab-block>*+p,.s11 .ab-block>*+.ab-tw,.s11 .ab-block>*+ol{margin-top:var(--s2)}
.s11 .ab-block p{max-width:var(--measure)}
.s11 .ab-timeline b{color:var(--ink)}.s11 .ab-timeline b em{font-style:normal;color:var(--gold);margin-right:10px;font-variant-numeric:tabular-nums}
.s11 .s11-calc{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:var(--s4);margin-top:var(--s3)}
.s11 .s11-calc label{display:block;margin-top:var(--s2)}
.s11 .s11-calc label span{display:flex;justify-content:space-between;gap:var(--s2)}
.s11 .s11-calc output{color:var(--gold);font-variant-numeric:tabular-nums;white-space:nowrap}
.s11 .s11-calc input[type=range]{width:100%;accent-color:var(--green-edge);margin-top:6px}
.s11 .s11-calc small{display:block;color:var(--mute);font-size:var(--fs-cap)}
.s11 .s11-out{display:grid;gap:var(--s2);align-content:start}
.s11 .s11-out div{border-top:1px solid var(--line);padding-top:var(--s2)}
.s11 .s11-out b{display:block;color:var(--gold);font-size:var(--fs-sub);font-weight:600;font-variant-numeric:tabular-nums}
.s11 .s11-out span{color:var(--mute);font-size:var(--fs-cap)}
.s11 .s11-pre{display:flex;flex-wrap:wrap;gap:var(--s1);margin-top:var(--s3)}
.s11 .s11-pre button{background:none;border:1px solid var(--line);border-radius:999px;color:var(--mute);padding:7px 14px;font-size:var(--fs-cap);cursor:pointer;min-height:34px}
.s11 .s11-pre button[aria-pressed="true"]{background:var(--green-deep);color:var(--ink);border-color:var(--green-deep)}
@media (max-width:860px){.s11 .s11-mapw,.s11 .s11-calc,.s11 .s11-cmp{grid-template-columns:1fr;gap:var(--s3)}}`;

function render(s,p,pv,nx){
 const figs=[
  {v:'11,356 : 1,334',l:T('Drug dispensing outlets against registered pharmacies, Tanzania, 2018','Maduka ya dawa dhidi ya famasi zilizosajiliwa, Tanzania, 2018'),s:L('Pharmacy Council, via BMC Health Services Research (2022)','Baraza la Famasi, kupitia BMC Health Services Research (2022)')},
  {v:'23.1%',l:T('Adults aged 18–69 with raised blood pressure, 2023','Watu wazima wa miaka 18–69 wenye shinikizo la juu la damu, 2023'),s:L('2023 National STEPS survey','Utafiti wa kitaifa wa STEPS 2023')},
  {v:L('1 in 10','1 kati ya 10'),l:T('Medical products in low- and middle-income countries that are substandard or falsified','Bidhaa za tiba katika nchi za kipato cha chini na cha kati ambazo ni duni au bandia'),s:L('WHO estimate, 2017','Makadirio ya WHO, 2017')},
  {v:`${L('4 h 55 min','saa 4 dak. 55')} ${ill()}`,l:T('One evening spent looking for four everyday items','Jioni moja ya kutafuta vitu vinne vya kawaida'),s:L('Typical times, not measured','Muda wa kawaida, haujapimwa')}];
 return `<article class="ab-sec s11" aria-labelledby="h-s1-1"><style>${CSS}</style><div class="ab-wrap">
 <div class="ab-sec-no">${E(s.no)}</div><h1 id="h-s1-1">${E(s.title)}</h1>
 <p class="ab-summary">${L('Pregnancy, babies, blood pressure, diabetes and ageing parents are now managed at home, month after month. The shops that supply families were built for one-off purchases. This section sets out five problems families meet in buying what home care needs: scattered, slow, untrusted, unplanned and far from family. For each it shows how it happens, what it costs a household, the evidence behind it, and how Afya Basics answers it.','Ujauzito, watoto wachanga, shinikizo la damu, kisukari na wazazi wazee sasa vinasimamiwa nyumbani, mwezi baada ya mwezi. Maduka yanayohudumia familia yalijengwa kwa manunuzi ya mara moja. Sehemu hii inaeleza matatizo matano ambayo familia hukutana nayo katika kununua mahitaji ya huduma ya nyumbani: kutawanyika, polepole, kutoaminika, bila mpango na mbali na familia. Kwa kila moja inaonyesha jinsi linavyotokea, linavyoigharimu familia, ushahidi wake, na jinsi Afya Basics inavyolijibu.')}</p>

 <figure class="ab-visual">
  <div class="s11-tabs" role="group" aria-label="${L('Choose a pain','Chagua tatizo')}" id="s11Tabs">${PAIN.map((x,i)=>`<button type="button" data-k="${i}" aria-pressed="${i===0}">${i+1}. ${L(x.n[0],x.n[1])}</button>`).join('')}</div>
  <div class="s11-mapw">${mapSVG()}<div class="s11-panel" id="s11Panel" aria-live="polite">${panelHTML(0)}</div></div>
  <figcaption>${L('The five pains across Dar es Salaam. Choose a pain above or a number on the map. Stylised map, not to scale; figures under each district are 2022 census populations. The pains occur across the whole city; each pin is placed for illustration, not as a measured location.','Matatizo matano kote Dar es Salaam. Chagua tatizo hapo juu au namba kwenye ramani. Ramani ya mfano, si kwa vipimo halisi; namba chini ya kila wilaya ni idadi ya watu ya sensa ya 2022. Matatizo haya hutokea kote jijini; kila alama imewekwa kwa mfano, si kama mahali palipopimwa.')}${cite('citypop')}</figcaption>
 </figure>

 <div class="ab-body">
 <section class="ab-block"><h2>${L('Care has moved home. Shopping for it has not.','Huduma ya afya imehamia nyumbani. Ununuzi wake bado haujahamia.')}</h2>
  <p>${L('A generation ago most care happened at a clinic. Today a family manages blood pressure, diabetes, a new baby or an ageing parent at home, with products bought every month. A doctor diagnoses a condition once; the household manages it on every other day of the year.','Kizazi kilichopita huduma nyingi zilitolewa kliniki. Leo familia inasimamia shinikizo la damu, kisukari, mtoto mchanga au mzazi mzee nyumbani, kwa bidhaa zinazonunuliwa kila mwezi. Daktari hugundua ugonjwa mara moja; familia huusimamia kila siku nyingine ya mwaka.')}</p>
  <p>${L('The shops did not move with it. Buying is still built for a one-off visit when someone is sick: one item, one counter, no record and no reminder. The gap is paid by families, in hours lost, fares, products that may not work, emergencies that could have been prevented, and worry carried mostly by women and older people.','Maduka hayakuhamia nayo. Ununuzi bado umejengwa kwa ziara ya mara moja mtu anapougua: bidhaa moja, kaunta moja, bila kumbukumbu wala ukumbusho. Pengo hili linalipwa na familia, kwa masaa yanayopotea, nauli, bidhaa ambazo huenda zisifanye kazi, dharura ambazo zingeweza kuzuiwa, na wasiwasi unaobebwa zaidi na wanawake na wazee.')}</p>
  <p>${L('That gap is the business. A store that removes these five pains at a fair price earns the family’s monthly spending and its loyalty. Each pain is set out in full below.','Pengo hilo ndilo biashara. Duka linaloondoa matatizo haya matano kwa bei ya haki linapata matumizi ya kila mwezi ya familia na uaminifu wake. Kila tatizo limeelezwa kikamilifu hapa chini.')}</p>
 </section>

 ${PAIN.map(painBlock).join('')}

 <section class="ab-block" id="s11Juma"><h2>${L('One household, one evening','Familia moja, jioni moja')}</h2>
  <p>${L('Statistics describe the market; one household shows how the problem works. Juma is an accountant in central Dar es Salaam. At home, Neema is caring for the family’s seven-month-old baby. Nothing on her list is rare or expensive. The family is illustrative, but every step of their evening is common in the city.','Takwimu zinaeleza soko; familia moja inaonyesha jinsi tatizo linavyofanya kazi. Juma ni mhasibu katikati ya jiji la Dar es Salaam. Nyumbani, Neema anamtunza mtoto wa familia wa miezi saba. Hakuna kitu adimu wala ghali kwenye orodha yake. Familia hii ni ya mfano, lakini kila hatua ya jioni yao ni ya kawaida jijini.')}</p>
  <ol class="ab-timeline" aria-label="${L('Juma’s day, hour by hour','Siku ya Juma, saa kwa saa')}">${JUMA.map(j=>`<li><b><em>${j[0]}</em>${L(j[1],j[2])}</b><span>${L(j[3],j[4])}</span></li>`).join('')}</ol>
  <p class="ab-notice">${L('Illustrative: the family is fictional and the times are typical, not measured. Afya Basics will measure search time in customer interviews before opening.','Mfano: familia ni ya kubuni na muda ni wa kawaida, haujapimwa. Afya Basics itapima muda wa kutafuta katika mahojiano na wateja kabla ya kufungua.')}</p>
  <h3>${L('Why the evening repeats','Kwa nini jioni hii hujirudia')}</h3>
  <p>${L('Nothing about this evening is remembered. Next month the same list will be written again and the same search will begin, because no shop knows that this family needs size four now and size five in three months. Of the 4 hours 55 minutes, 3 hours 45 minutes were spent travelling and 1 hour 10 minutes in shops.','Hakuna kinachokumbukwa kuhusu jioni hii. Mwezi ujao orodha ileile itaandikwa tena na msako uleule utaanza, kwa sababu hakuna duka linalojua kuwa familia hii inahitaji saizi ya nne sasa na saizi ya tano baada ya miezi mitatu. Kati ya saa 4 na dakika 55, saa 3 na dakika 45 zilitumika safarini na saa 1 na dakika 10 madukani.')}</p>
  <div class="ab-tw"><table class="ab-t"><thead><tr><th>${L('Worked example: the yearly cost in time','Mfano wa hesabu: gharama ya muda kwa mwaka')}</th><th>${L('Result','Matokeo')}</th></tr></thead><tbody>
   <tr><td>${L('One evening, leaving work to arriving home','Jioni moja, kutoka kazini hadi kufika nyumbani')}</td><td class="ab-n">${L('4 h 55 min','saa 4 dak. 55')}</td></tr>
   <tr><td>${L('× 12, if an evening like this happens once a month','× 12, kama jioni kama hii hutokea mara moja kwa mwezi')}</td><td class="ab-n">${L('about 59 h','takriban saa 59')}</td></tr>
   <tr><td>${L('÷ an 8-hour working day','÷ siku ya kazi ya saa 8')}</td><td class="ab-n">${L('more than 7 working days','zaidi ya siku 7 za kazi')}</td></tr></tbody></table></div>
  <h3>${L('The same evening, with Afya Basics','Jioni hiyohiyo, ukiwa na Afya Basics')}</h3>
  <div class="ab-tw"><table class="ab-t"><thead><tr><th>${L('Today','Leo')}</th><th>${L('With Afya Basics','Ukiwa na Afya Basics')}</th></tr></thead><tbody>${JT.map(r=>`<tr><td>${L(r[0][0],r[0][1])}</td><td>${L(r[1][0],r[1][1])}</td></tr>`).join('')}</tbody></table></div>
  <p>${L('The household’s problem is not price; it is time, uncertainty and memory. A service that removes all three is worth paying for, and because the need returns every month, the relationship it creates is recurring by nature.','Tatizo la familia si bei; ni muda, wasiwasi na kumbukumbu. Huduma inayoondoa yote matatu inastahili kulipiwa, na kwa sababu hitaji hurudi kila mwezi, uhusiano unaojengwa ni wa kudumu kwa asili yake.')}</p>
 </section>

 <section class="ab-block"><h2>${L('Who is most affected','Nani anaathirika zaidi')}</h2>
  <p>${L('Four groups carry most of the burden. They are large, they buy every month, and the Afya Boxes are designed around them. Section 1.4 turns them into detailed customer profiles.','Makundi manne yanabeba mzigo mkubwa zaidi. Ni makubwa, hununua kila mwezi, na Afya Box zimeundwa kwa ajili yao. Sehemu ya 1.4 inayageuza kuwa wasifu wa kina wa wateja.')}</p>
  <div class="ab-tw"><table class="ab-t"><thead><tr><th>${L('Group','Kundi')}</th><th>${L('Figure','Takwimu')}</th><th>${L('What it means every month','Maana yake kila mwezi')}</th></tr></thead><tbody>
   ${WHO.map(w=>`<tr><td><b>${L(w[1][0],w[1][1])}</b></td><td class="ab-n">${w[0]==='TSh 3.31T'?L('TSh 3.31T','TSh trilioni 3.31'):E(w[0])}</td><td>${L(w[2][0],w[2][1])}${cite(w[3])}</td></tr>`).join('')}</tbody></table></div>
 </section>

 <section class="ab-block"><h2>${L('Try it: the monthly cost today','Jaribu: gharama ya kila mwezi leo')}</h2>
  <p>${L('Enter your own household. The calculator counts the trips, fares and hours that today’s way of buying takes, and what they add up to in a year. The value of an hour is your own estimate of what that time is worth: from a stall, a salon, a job or caring for children. The starting values are examples, not measurements.','Weka taarifa za familia yako. Kikokotoo kinahesabu safari, nauli na masaa ambayo njia ya leo ya kununua inachukua, na jumla yake kwa mwaka. Thamani ya saa moja ni makadirio yako mwenyewe ya thamani ya muda huo: kutoka kibanda, saluni, kazi au kulea watoto. Namba za kuanzia ni mifano, si vipimo.')}</p>
  <div class="s11-pre" role="group" aria-label="${L('Example household','Familia ya mfano')}" id="s11Pre">${Object.keys(PRE).map((k,i)=>`<button type="button" data-p="${k}" aria-pressed="${i===0}">${L(PRE[k][0][0],PRE[k][0][1])}</button>`).join('')}</div>
  <div class="s11-calc">
   <div>
    <label><span>${L('Shopping trips for health items a month','Safari za kununua bidhaa za afya kwa mwezi')}<output id="s11oT"></output></span><input id="s11T" type="range" min="1" max="12" step="1" value="5"><small>${L('Every trip counts: pharmacy, supermarket, medical-supplies shop.','Kila safari inahesabika: famasi, supamaketi, duka la vifaa tiba.')}</small></label>
    <label><span>${L('Fare per trip, there and back','Nauli kwa safari, kwenda na kurudi')}<output id="s11oF"></output></span><input id="s11F" type="range" min="0" max="10000" step="500" value="2000"><small>${L('Daladala, bajaji or boda. TSh 0 for walking.','Daladala, bajaji au boda. TSh 0 kwa kutembea.')}</small></label>
    <label><span>${L('Hours per trip, including waiting','Masaa kwa safari, pamoja na kusubiri')}<output id="s11oH"></output></span><input id="s11H" type="range" min="0.5" max="5" step="0.5" value="2.5"></label>
    <label><span>${L('Value of one hour of your time','Thamani ya saa moja ya muda wako')}<output id="s11oV"></output></span><input id="s11V" type="range" min="0" max="10000" step="500" value="2000"><small>${L('Your own estimate. Set it to 0 to count fares only.','Makadirio yako mwenyewe. Weka 0 kuhesabu nauli pekee.')}</small></label>
   </div>
   <div class="s11-out" aria-live="polite">
    <div><b id="s11rM"></b><span>${L('a month today, in fares and time','kwa mwezi leo, kwa nauli na muda')}</span></div>
    <div><b id="s11rH"></b><span>${L('hours a year spent shopping for health items','masaa kwa mwaka ya kununua bidhaa za afya')}</span></div>
    <div><b id="s11rD"></b><span>${L('full 8-hour working days a year','siku kamili za kazi za saa 8 kwa mwaka')}</span></div>
    <p class="ab-mute" style="font-size:var(--fs-cap);margin:0">${L('With an Afya Box there is no trip: packing and delivery are inside the box price (section 3.5). This calculator counts time and fares only; product prices are compared in section 6.2.','Ukiwa na Afya Box hakuna safari: kupakia na kufikisha viko ndani ya bei ya boksi (sehemu ya 3.5). Kikokotoo hiki kinahesabu muda na nauli pekee; bei za bidhaa zinalinganishwa katika sehemu ya 6.2.')}</p>
   </div>
  </div>
 </section>

 <section class="ab-block"><h2>${L('The evidence behind the five pains','Ushahidi nyuma ya matatizo matano')}</h2>
  <p>${L('Every fact used above, with its source, year and strength. Section 1.2 opens the full evidence room.','Kila takwimu iliyotumika hapo juu, pamoja na chanzo, mwaka na nguvu yake. Sehemu ya 1.2 inafungua chumba kamili cha ushahidi.')}</p>
  <div class="ab-tw"><table class="ab-t"><thead><tr><th>${L('Pain','Tatizo')}</th><th>${L('Fact','Takwimu')}</th><th>${L('Source and year','Chanzo na mwaka')}</th><th>${L('Confidence','Uhakika')}</th></tr></thead><tbody>
   <tr><td>${L('Scattered','Kutawanyika')}</td><td>${L('About 11,356 accredited drug shops against 1,334 pharmacies: most outlets are small with a narrow range','Takriban maduka ya dawa 11,356 dhidi ya famasi 1,334: maduka mengi ni madogo yenye bidhaa chache')}</td><td>${L('Pharmacy Council, 2018','Baraza la Famasi, 2018')}${cite('addo')}</td><td>${L(CONF.m[0],CONF.m[1])}</td></tr>
   <tr><td>${L('Slow','Polepole')}</td><td>${L('Dar es Salaam region grew 23% in ten years, to 5,383,728 people','Mkoa wa Dar es Salaam ulikua kwa asilimia 23 ndani ya miaka kumi, hadi watu 5,383,728')}</td><td>${L('NBS censuses, 2012 and 2022','Sensa za NBS, 2012 na 2022')}${cite('citypop')}</td><td>${L(CONF.h[0],CONF.h[1])}</td></tr>
   <tr><td>${L('Untrusted','Kutoaminika')}</td><td>${L('About 1 in 10 medical products in low- and middle-income countries is substandard or falsified','Takriban bidhaa 1 kati ya 10 za tiba katika nchi za kipato cha chini na cha kati ni duni au bandia')}</td><td>${L('WHO, 2017','WHO, 2017')}${cite('who_sf')}</td><td>${L(CONF.m[0],CONF.m[1])}</td></tr>
   <tr><td>${L('Untrusted','Kutoaminika')}</td><td>${L('TSh 360 million of unregistered medicines seized at Dar es Salaam airport, including diabetes and blood-pressure treatments','Dawa zisizosajiliwa za TSh milioni 360 zilikamatwa uwanja wa ndege wa Dar es Salaam, zikiwemo dawa za kisukari na shinikizo la damu')}</td><td>${L('TMDA, via press report, September 2026','TMDA, kupitia habari, Septemba 2026')}${cite('jnia')}</td><td>${L(CONF.i[0],CONF.i[1])}</td></tr>
   <tr><td>${L('Unplanned','Bila mpango')}</td><td>${L('23.1% of adults aged 18–69 have raised blood pressure; 72.4% of diabetes cases found were undiagnosed','Asilimia 23.1 ya watu wazima wa miaka 18–69 wana shinikizo la juu la damu; asilimia 72.4 ya visa vya kisukari vilivyopatikana havikuwa vimegunduliwa')}</td><td>${L('National STEPS survey 2023, published 2026','Utafiti wa kitaifa wa STEPS 2023, uliochapishwa 2026')}${cite('steps_ht','steps_dm')}</td><td>${L(CONF.h[0],CONF.h[1])}</td></tr>
   <tr><td>${L('Unplanned','Bila mpango')}</td><td>${L('Of every 100 adults with high blood pressure, 17.6 knew it and 2.2 had it under control','Kati ya kila watu wazima 100 wenye shinikizo la juu la damu, 17.6 walijua na 2.2 walikuwa wamelidhibiti')}</td><td>${L('WHO country profile, 2012 survey','Wasifu wa nchi wa WHO, utafiti wa 2012')}${cite('who_ht')}</td><td>${L(CONF.m[0],CONF.m[1])}</td></tr>
   <tr><td>${L('Far from family','Mbali na familia')}</td><td>${L('TSh 3.31 trillion sent home by Tanzanians abroad in 2024/25','TSh trilioni 3.31 zilitumwa nyumbani na Watanzania walio nje mwaka 2024/25')}</td><td>${L('Government to Parliament, via press report, 2026','Serikali Bungeni, kupitia habari, 2026')}${cite('rem25')}</td><td>${L(CONF.m[0],CONF.m[1])}</td></tr>
  </tbody></table></div>
  <p class="ab-mute" style="font-size:var(--fs-cap)">${L('High: official national survey, census or regulator data. Medium: official but older, modelled, global or press-reported. Indicative: a news report or one-off case.','Juu: utafiti rasmi wa kitaifa, sensa au takwimu za mamlaka. Wastani: rasmi lakini ya zamani, ya kimodeli, ya kimataifa au iliyoripotiwa na vyombo vya habari. Kiashiria: habari au tukio la mara moja.')}</p>
 </section>
 </div>

 <section class="ab-block"><h2>${L('Key figures','Takwimu muhimu')}</h2>${A().figsHTML(figs)}</section>

 <section class="ab-block"><h2>${L('Where to go next','Uende wapi sasa')}</h2>${A().doorsHTML(['s1-2','s1-3','s1-4','s3-3'])}</section>

 ${A().openHTML([
  L('No survey yet measures how much time and money Dar es Salaam households spend searching for health products. Juma’s evening and the calculator’s starting values are illustrative; Afya Basics will measure search time in customer interviews before opening.','Bado hakuna utafiti unaopima muda na pesa ambazo familia za Dar es Salaam hutumia kutafuta bidhaa za afya. Jioni ya Juma na namba za kuanzia za kikokotoo ni mifano; Afya Basics itapima muda wa kutafuta katika mahojiano na wateja kabla ya kufungua.'),
  L('The outlet counts are from 2018. The number of drug shops has grown since; a newer count would strengthen, not weaken, the point about fragmentation.','Idadi ya maduka ni ya 2018. Maduka ya dawa yameongezeka tangu hapo; hesabu mpya ingeimarisha, si kudhoofisha, hoja kuhusu kutawanyika.'),
  L('The WHO estimate covers low- and middle-income countries as a group, not Tanzania alone. The blood-pressure control figure is from 2012, the latest survey to measure it.','Makadirio ya WHO yanahusu nchi za kipato cha chini na cha kati kwa pamoja, si Tanzania peke yake. Takwimu ya udhibiti wa shinikizo ni ya 2012, utafiti wa mwisho kuipima.'),
  L('The outlet count, the airport seizure report and the census age shares have not been re-opened at source for this edition; they are marked in the source list.','Idadi ya maduka, taarifa ya ukamataji uwanja wa ndege na sehemu za umri za sensa hazijafunguliwa tena kwenye chanzo kwa toleo hili; zimewekwa alama kwenye orodha ya vyanzo.')])}

 ${srcFooter()}
 ${A().pagerHTML(pv,nx)}
 </div></article>`}

function init(){const root=document.querySelector('.s11');if(!root)return;
 const panel=document.getElementById('s11Panel'),tabs=[...document.querySelectorAll('#s11Tabs button')],pins=[...root.querySelectorAll('.s11-pin')],ds=[...root.querySelectorAll('.s11-d')];
 const pick=k=>{tabs.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===k)));pins.forEach((g,i)=>g.classList.toggle('on',i===k));ds.forEach((d,i)=>d.classList.toggle('on',i===PINS[k].d));panel.innerHTML=panelHTML(k)};
 tabs.forEach((b,i)=>b.addEventListener('click',()=>pick(i)));
 pins.forEach((g,i)=>{g.addEventListener('click',()=>pick(i));g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pick(i)}})});
 root.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('[data-jump]');if(!a)return;const t=document.getElementById(a.dataset.jump);if(t){e.preventDefault();t.scrollIntoView({block:'start'})}});
 pick(0);
 /* calculator */
 const g=id=>document.getElementById(id),hrs=h=>(h%1?h.toFixed(1):String(h))+(window.AFYA_LANG==='sw'?' saa':' h');
 const up=()=>{const t=+g('s11T').value,f=+g('s11F').value,h=+g('s11H').value,v=+g('s11V').value;
  g('s11oT').textContent=t;g('s11oF').textContent=tsh(f);g('s11oH').textContent=hrs(h);g('s11oV').textContent=tsh(v);
  const m=t*(f+h*v),yh=t*h*12;g('s11rM').textContent=tsh(m);g('s11rH').textContent=nf(yh);g('s11rD').textContent=(yh/8).toFixed(1)};
 ['s11T','s11F','s11H','s11V'].forEach(id=>g(id).addEventListener('input',()=>{document.querySelectorAll('#s11Pre button').forEach(b=>b.setAttribute('aria-pressed','false'));up()}));
 document.querySelectorAll('#s11Pre button').forEach(b=>b.addEventListener('click',()=>{const v=PRE[b.dataset.p];g('s11T').value=v[1];g('s11F').value=v[2];g('s11H').value=v[3];g('s11V').value=v[4];
  document.querySelectorAll('#s11Pre button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));up()}));
 up()}

window.SECTIONS['s1-1']={render,init,v2:true};
})();
