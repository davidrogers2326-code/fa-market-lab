/* 7.1 Setup, licences, research & travel · v2 on the D2 template.
   The fifteen licence steps, fees and sources come from research/R1-compliance.md section 6 (pages opened 9 Nov 2026).
   USD fees are converted at the BoT mean rate in research/fx.md (TSh 2,642.50, trading date 10 Nov 2026).
   Trip rates, the location weights and the set-up work lines are the earlier planning estimates, labelled "estimate".
   The Phase 0 gap is read from MODEL seed.phase0_gap. Step status, trips and site scores are per-viewer conveniences
   in localStorage (wrapped in try/catch); the page renders the same without them. */
(function(){
'use strict';
const A=()=>window.AB,T=(e,s)=>A().T(e,s),E=s=>A().E(s),L=x=>T(x[0],x[1]);
const sw=()=>window.AFYA_LANG==='sw';
const tsh=n=>'TSh '+Math.round(n).toLocaleString('en-US');
const tshM=n=>{const v=n/1e6,x=String(parseFloat(v.toFixed(Math.abs(v)>=100?0:Math.abs(v)>=10?1:2)));return sw()?'TSh '+x+' milioni':'TSh '+x+'M'};
const est=()=>`<span class="ab-est">${E(T('estimate','makadirio'))}</span>`;
const FX='TSh 2,642.50';
const fxNote=()=>T(`at ${FX} per US$ (Bank of Tanzania mean rate, 10 Nov 2026)`,`kwa ${FX} kwa US$1 (kiwango cha wastani cha Benki Kuu ya Tanzania, 10 Nov 2026)`);
const CHK='9 Nov 2026';

/* ---------- sources (R1 section 10; all opened 9 Nov 2026) ---------- */
const SRC={
 brela_fees:['BRELA: company fees (Tozo za kampuni)','BRELA: tozo za kampuni','https://www.brela.go.tz/pages/tozo-za-kampuni'],
 brela_bos:['BRELA public notice, 8 Apr 2026: use of the upgraded BRELA Online Services (BOS)','Taarifa kwa umma ya BRELA, 8 Apr 2026: matumizi ya mfumo ulioboreshwa wa BRELA Online Services (BOS)','https://www.brela.go.tz/uploads/documents/sw-1775729096-TAARIFA%20KWA%20UMMA%20-%20MATUMIZI%20YA%20MFUMO%20ULIOBORESHWA%20%20WA%20UTOAJI%20HUDUMA.pdf'],
 brela_bo:['BRELA public notice, 6 Jan 2026: beneficial-owner information','Taarifa kwa umma ya BRELA, 6 Jan 2026: taarifa za wamiliki manufaa','https://www.brela.go.tz/uploads/documents/sw-1767859137-TAARIFA%20KWA%20UMMA%20BO%20-%20BRELA%202.pdf'],
 brela_a:['BRELA public notice, 29 Jul 2026: Class A business licences issued on BOS','Taarifa kwa umma ya BRELA, 29 Jul 2026: leseni za biashara za Kundi A zinatolewa kupitia BOS','https://www.brela.go.tz/uploads/documents/sw-1785309217-TAARIFA%20KWA%20UMMA-BRELA.pdf'],
 gn626:['Business Licensing Regulations, GN 626 of 2023 (published by BRELA)','Kanuni za Utoaji wa Leseni za Biashara, Tangazo la Serikali Na. 626 la 2023 (zimechapishwa na BRELA)','https://www.brela.go.tz/uploads/documents/sw-1713267776-Kanuni%20za%20Utoaji%20wa%20Leseni%20za%20Biashara%20za%20Mwaka%202023.pdf'],
 fa2014:['Business licence fee schedule, Finance Act 2014 (published by BRELA)','Jedwali la ada za leseni za biashara, Sheria ya Fedha 2014 (imechapishwa na BRELA)','https://www.brela.go.tz/uploads/documents/sw-1667378781-Finance%20Act%202014%20(1).pdf'],
 brela_ar:['BRELA public notice, 6 Aug 2026: annual returns','Taarifa kwa umma ya BRELA, 6 Aug 2026: taarifa za mwaka','https://www.brela.go.tz/uploads/documents/sw-1786089983-TAARIFA%20KWA%20UMMA-ANNUAL%20RETURNS.pdf'],
 tra_stamp:['TRA: stamp duty','TRA: ushuru wa stempu','https://www.tra.go.tz/page/stamp-duty%20'],
 tra_tin:['TRA: starting a business, income for individuals and paying taxes (TIN)','TRA: kuanzisha biashara, mapato ya watu binafsi na kulipa kodi (TIN)','https://www.tra.go.tz/page/starting-business-income-for-individuals-and-paying-taxes%20'],
 tra_vat:['TRA: value added tax (VAT)','TRA: kodi ya ongezeko la thamani (VAT)','https://www.tra.go.tz/page/value-added-tax-vat%20'],
 tra_imp:['TRA: import procedures','TRA: taratibu za uingizaji bidhaa','https://www.tra.go.tz/page/import-procedures%20'],
 cpf:['TRA: Customs Processing Fee Regulations 2026, GN 158D (1% of FOB from 1 Jul 2026)','TRA: Kanuni za Ada ya Uchakataji wa Forodha 2026, Tangazo la Serikali Na. 158D (1% ya FOB kuanzia 1 Jul 2026)','https://www.tra.go.tz/images/uploads/acts/GN_158D-THE_TANZANIA_REVENUE_AUTHORITY_%28CUSTOMS_PROCESSING_FEE%29_REGULATIONS%2C_2026-TGPA.pdf'],
 fa2026:['Finance Act 2026 (excise on cosmetics 15% from 1 Jul 2026)','Sheria ya Fedha 2026 (ushuru wa bidhaa kwenye vipodozi 15% kuanzia 1 Jul 2026)','https://www.tra.go.tz/images/uploads/acts/THE_FINANCE_ACT%2C_2026.pdf'],
 tbs_reg:['TBS: products and premises registration','TBS: usajili wa bidhaa na majengo','https://www.tbs.go.tz/pages/products-and-premises-registration'],
 tbs_fees:['TBS: Standards (Fees and Charges) Regulations 2021, GN 496L','TBS: Kanuni za Viwango (Ada na Tozo) 2021, Tangazo la Serikali Na. 496L','https://www.tbs.go.tz/uploads/documents/en-1786361569-The%20Standards%20(Fees%20and%20Charges)%20Regulations,%202021.pdf'],
 gn681:['TBS: Standards (Imports Registration and Batch Certification) Regulations 2021, GN 681','TBS: Kanuni za Viwango (Usajili wa Uingizaji na Uthibitishaji wa Shehena) 2021, Tangazo la Serikali Na. 681','https://www.tbs.go.tz/uploads/documents/sw-1786362149-The%20Standards%20(%20Imports%20Registration%20And%20Batch%20Certification)%20Regulations,%202021.pdf'],
 gn127:['TBS: amendment regulations, GN 127 of 2025 (remaining shelf life on import)','TBS: kanuni za marekebisho, Tangazo la Serikali Na. 127 la 2025 (muda wa matumizi uliobaki wakati wa kuingiza)','https://www.tbs.go.tz/uploads/documents/sw-1786362319-Batch%20Amendment%20Regulation.pdf'],
 tbs_cos:['TBS: guideline for registration of cosmetics (Nov 2022)','TBS: mwongozo wa usajili wa vipodozi (Nov 2022)','https://www.tbs.go.tz/uploads/documents/sw-1786606993-GUIDELINE%20FOR%20A%20CLIENT%20WHO%20WISH%20TO%20APPLY%20FOR%20REGISTRATION%20OF%20COSMETICS.pdf'],
 pvoc:['TBS: guideline for the PVoC programme, 2025 (fees, routes, validity)','TBS: mwongozo wa programu ya PVoC, 2025 (ada, njia, muda wa uhalali)','https://www.tbs.go.tz/uploads/text-editor/files/GUIDELINE%20FOR%20PVOC%20PROGRAMME%20-%202025_1786358618.pdf'],
 pvoc_psp:['TBS: contracted PVoC service providers and their zones','TBS: watoa huduma wa PVoC walioingia mkataba na kanda zao','https://www.tbs.go.tz/uploads/text-editor/files/LIST%20OF%20CONTRACTED%20PSPs%20FOR%20GENERAL%20GOODS%20AND%20THEIR%20RESPECTIVE%20ZONES%20(1)_1786359965.pdf'],
 pvoc_pen:['TBS: penalty for un-inspected goods under the PVoC programme, 2025','TBS: adhabu kwa bidhaa zisizokaguliwa chini ya programu ya PVoC, 2025','https://www.tbs.go.tz/uploads/text-editor/files/PENALTY%20FOR%20UN-INSPECTED%20GENERAL%20GOODS%20REGULATED%20UNDER%20PVOC%20PROGRAMME-2025_1786359408.pdf'],
 fa2019:['Finance Act No. 8 of 2019 (cosmetics and food move from TMDA to TBS, 1 Jul 2019)','Sheria ya Fedha Na. 8 ya 2019 (vipodozi na chakula vinahamia TBS kutoka TMDA, 1 Jul 2019)','https://www.tmda.go.tz/uploads/1678774965-8.%20THE%20FINANCE%20ACT,%202019%20,%20Act%20NO.%208-.pdf'],
 tmda_fees:['TMDA: Fees and Charges (Amendment) Regulations 2024','TMDA: Kanuni za Ada na Tozo (Marekebisho) 2024','https://www.tmda.go.tz/uploads/1718887575-FEES%20AND%20CHARGES%20AMENDMENT%20JUNE%202024%20FINAL.pdf'],
 tmda_prem:['TMDA: registration and licensing of premises (medical devices)','TMDA: usajili na leseni za majengo (vifaa tiba)','https://www.tmda.go.tz/pages/registration-and-licensing-of-premises-1'],
 tmda_med:['TMDA: registration and licensing of premises (medicines: Pharmacy Council)','TMDA: usajili na leseni za majengo (dawa: Baraza la Famasia)','https://www.tmda.go.tz/pages/registration-and-licensing-of-premises'],
 tmda_imp:['TMDA: guidelines for importation and exportation of medical devices, Rev 02, May 2024','TMDA: miongozo ya uingizaji na usafirishaji nje wa vifaa tiba, toleo la 02, Mei 2024','https://www.tmda.go.tz/uploads/publications/en1755006678-en1728063896-GUIDELINES%20FOR%20IMPORTATION%20AND%20EXPORTATION%20OF%20MEDICAL%20DEVICES%20-%2017.05%20(1).pdf'],
 tmda_comp:['TMDA: compendium of guidelines for marketing authorisation of medical devices, June 2024 (device classes)','TMDA: mkusanyiko wa miongozo ya idhini ya soko ya vifaa tiba, Juni 2024 (madaraja ya vifaa)','https://www.tmda.go.tz/uploads/publications/en1755088789-Compendium%20of%20Guidelines%20for%20Marketing%20Authorization%20of%20Medical%20Devices,%20Diagnostics%20and%20Laboratory%20Equipment,%20June%202024.pdf'],
 bot_fx:['Bank of Tanzania: exchange rates (mean rate for 10 Nov 2026)','Benki Kuu ya Tanzania: viwango vya kubadilisha fedha (kiwango cha wastani cha 10 Nov 2026)','https://www.bot.go.tz/ExchangeRate/excRates'],
 model:['Afya Basics financial model v1.2 (planning estimates)','Modeli ya fedha ya Afya Basics v1.2 (makadirio ya mipango)','']};
const SRCKEYS=Object.keys(SRC);
const srcNo=k=>SRCKEYS.indexOf(k)+1;
const SHORT={brela_fees:'BRELA',brela_bos:'BRELA',brela_bo:'BRELA',brela_a:'BRELA',gn626:'GN 626/2023',fa2014:'BRELA',brela_ar:'BRELA',tra_stamp:'TRA',tra_tin:'TRA',tra_vat:'TRA',tra_imp:'TRA',cpf:'GN 158D/2026',fa2026:'FA 2026',tbs_reg:'TBS',tbs_fees:'TBS',gn681:'GN 681/2021',gn127:'GN 127/2025',tbs_cos:'TBS',pvoc:'TBS PVoC',pvoc_psp:'TBS PVoC',pvoc_pen:'TBS PVoC',fa2019:'FA 2019',tmda_fees:'TMDA',tmda_prem:'TMDA',tmda_med:'TMDA',tmda_imp:'TMDA',tmda_comp:'TMDA',bot_fx:'BoT',model:''};
const srcLinks=keys=>keys.map(k=>{const s=SRC[k];return s[2]?`<a href="${E(s[2])}" target="_blank" rel="noopener" title="${E(L(s))}">${E(SHORT[k]||'')} [${srcNo(k)}]</a>`:''}).filter(Boolean).join(', ')+`<br><span class="ab-mute">${E(T('checked','imekaguliwa'))} ${CHK}</span>`;

/* ---------- the fifteen steps (R1 section 6, in order) ---------- */
function steps(){const I=window.MODEL.inputs,lean=A().isLean(),rent=I.opex_month.rent,area=I.store.area_m2,y1=window.MODEL.get('base').y1.revenue;
 return [
 {t:['Clear the name and incorporate a private company (share capital up to TSh 1,000,000)','Kuhakiki jina na kusajili kampuni binafsi (mtaji wa hisa hadi TSh 1,000,000)'],
  a:['BRELA; TRA for the stamp duty','BRELA; TRA kwa ushuru wa stempu'],
  f:['TSh 95,000 registration + 50,000 name fee + 22,000 per document lodged (about 66,000 for three) + 10,000 stamp duty on the memorandum = about TSh 221,000','TSh 95,000 usajili + 50,000 ada ya jina + 22,000 kwa kila hati inayowasilishwa (takriban 66,000 kwa hati tatu) + 10,000 ushuru wa stempu kwenye katiba ya kampuni = takriban TSh 221,000'],
  w:null,
  d:['Company registration still runs on BRELA’s Online Registration System (ORS); the upgraded BRELA Online Services (BOS) took over business names and licences on 8 April 2026. Share capital of exactly TSh 1,000,000 stays in the lowest fee band; one shilling more moves the registration fee to TSh 175,000. Three lodged documents is an assumption. The certificate of incorporation and the memorandum and articles go into the data room.','Usajili wa kampuni bado unafanyika kwenye Mfumo wa Usajili Mtandaoni wa BRELA (ORS); mfumo ulioboreshwa wa BRELA Online Services (BOS) ulichukua majina ya biashara na leseni tarehe 8 Aprili 2026. Mtaji wa hisa wa TSh 1,000,000 kamili unabaki kwenye kundi la ada la chini kabisa; shilingi moja zaidi inapandisha ada ya usajili hadi TSh 175,000. Hati tatu zinazowasilishwa ni dhana. Hati ya usajili na katiba ya kampuni zinawekwa kwenye chumba cha nyaraka.'],
  s:['brela_fees','tra_stamp','brela_bos']},
 {t:['File beneficial-owner information at bo.brela.go.tz, at incorporation and whenever the owners change','Kuwasilisha taarifa za wamiliki manufaa kwenye bo.brela.go.tz, wakati wa usajili na kila wamiliki wanapobadilika'],
  a:['BRELA','BRELA'],f:['No fee found','Hakuna ada iliyopatikana'],
  w:['Until it is filed, the company may not carry out any transaction with the Registrar','Hadi zitakapowasilishwa, kampuni hairuhusiwi kufanya muamala wowote na Msajili'],
  d:['The blocked transactions include annual returns, changes of particulars, searches, charges and certified copies. The legal basis is section 469 of the Companies Act (Cap. 212) and the Beneficial Ownership Regulations of 2023 (GN 714 of 22 September 2023).','Miamala inayozuiwa ni pamoja na taarifa za mwaka, mabadiliko ya taarifa, upekuzi, rehani na nakala zilizothibitishwa. Msingi wa kisheria ni kifungu cha 469 cha Sheria ya Kampuni (Sura 212) na Kanuni za Umiliki Manufaa za 2023 (Tangazo la Serikali Na. 714 la tarehe 22 Septemba 2023).'],
  s:['brela_bo']},
 {t:['Sign the shop lease, have it stamped, and get the introduction letter from the local government office (mtaa)','Kusaini mkataba wa pango la duka, kuupiga stempu, na kupata barua ya utambulisho kutoka ofisi ya serikali ya mtaa'],
  a:['TRA for the stamp duty; local government','TRA kwa ushuru wa stempu; serikali ya mtaa'],f:['1% of the annual rent','1% ya kodi ya pango ya mwaka'],w:null,
  d:[`The rent itself is a model estimate: ${tsh(rent)} a month for about ${area} m² in the ${lean?'start-small':'flagship'} option. The lease must allow the fit-out works and the roof-edge sign. The six-month lease advance is paid from the seed, not from Phase 0.`,`Kodi yenyewe ni makadirio ya modeli: ${tsh(rent)} kwa mwezi kwa takriban m² ${area} katika chaguo la ${lean?'kuanza kidogo':'duka kuu'}. Mkataba lazima uruhusu kazi za ukarabati na bango la juu ya paa. Malipo ya awali ya pango ya miezi sita yanalipwa kutoka mtaji wa awali, si kutoka Awamu 0.`],
  s:['tra_stamp','model']},
 {t:['Apply for the company TIN, then the tax clearance','Kuomba TIN ya kampuni, kisha hati ya uthibitisho wa kodi'],
  a:['TRA','TRA'],f:['No fee stated','Hakuna ada iliyotajwa'],
  w:['Within 15 days of starting business','Ndani ya siku 15 tangu kuanza biashara'],
  d:['TRA asks for a letter from the local government authority and the lease or title deed. The tax clearance that follows is needed to obtain the business licence.','TRA inaomba barua kutoka mamlaka ya serikali ya mtaa na mkataba wa pango au hati ya umiliki. Hati ya uthibitisho wa kodi inayofuata inahitajika ili kupata leseni ya biashara.'],
  s:['tra_tin']},
 {t:['Business licence Class A: importation','Leseni ya biashara Kundi A: uingizaji bidhaa'],
  a:['BRELA (BOS)','BRELA (BOS)'],f:['TSh 400,000 a year','TSh 400,000 kwa mwaka'],w:null,
  d:['Importing goods is a Class A activity issued by BRELA (GN 626 of 2023, group A, item 32). Since 29 July 2026 Class A licences are issued on BOS. The fee is from the 2014 schedule that BRELA still publishes; no later amendment was found.','Kuingiza bidhaa kutoka nje ni shughuli ya Kundi A inayotolewa na BRELA (Tangazo la Serikali Na. 626 la 2023, kipengele 32). Tangu tarehe 29 Julai 2026 leseni hizi zinatolewa kupitia BOS. Ada inatoka kwenye jedwali la 2014 ambalo BRELA bado inalichapisha; hakuna marekebisho ya baadaye yaliyopatikana.'],
  s:['gn626','fa2014','brela_a']},
 {t:['Business licence Class B: retail shop','Leseni ya biashara Kundi B: duka la rejareja'],
  a:['Dar es Salaam municipal or city council','Halmashauri ya manispaa au jiji la Dar es Salaam'],f:['TSh 70,000 a year','TSh 70,000 kwa mwaka'],w:null,
  d:['The council decides the class. A “supermarket” in a city pays TSh 500,000 and a departmental store TSh 400,000, so the class is agreed with the council before the application.','Halmashauri ndiyo inayoamua kundi. “Supermarket” jijini inalipa TSh 500,000 na duka la idara TSh 400,000, kwa hiyo kundi linakubaliwa na halmashauri kabla ya kuomba.'],
  s:['fa2014']},
 {t:['TBS premise registration: retail cosmetics shop, plus a small food outlet for the nutrition shelf','Usajili wa majengo TBS: duka la rejareja la vipodozi, pamoja na sehemu ndogo ya chakula kwa rafu ya lishe'],
  a:['TBS (online application system)','TBS (mfumo wa maombi mtandaoni)'],f:['TSh 150,000 + 100,000 a year','TSh 150,000 + 100,000 kwa mwaka'],w:null,
  d:['Cosmetics and food moved from TMDA to TBS on 1 July 2019; TMDA keeps medicines and medical devices. Under GN 681 of 2021 no one may import cosmetics unless registered by TBS, and an importer must have registered its cosmetics premises. The application needs the TIN, the business licence, a building sketch and a location map.','Vipodozi na chakula vilihamia TBS kutoka TMDA tarehe 1 Julai 2019; TMDA inabaki na dawa na vifaa tiba. Chini ya Tangazo la Serikali Na. 681 la 2021 hakuna mtu anayeruhusiwa kuingiza vipodozi bila kusajiliwa na TBS, na mwagizaji lazima awe amesajili majengo yake ya vipodozi. Maombi yanahitaji TIN, leseni ya biashara, mchoro wa jengo na ramani ya mahali.'],
  s:['tbs_reg','tbs_fees','fa2019','gn681']},
 {t:['TMDA premises registration: retail medical device outlet','Usajili wa majengo TMDA: duka la rejareja la vifaa tiba'],
  a:['TMDA Eastern Zone (Trader Portal)','TMDA Kanda ya Mashariki (Trader Portal)'],f:['TSh 100,000 a year','TSh 100,000 kwa mwaka'],
  w:['The permit expires on 30 June every year','Kibali kinaisha tarehe 30 Juni kila mwaka'],
  d:['TMDA asks for the BRELA certificate, the TIN, the contract and council registration of the person in charge, a premises layout and the memorandum and articles. The person in charge must be qualified and registered with a professional council. The older figure of TSh 60,000 is out of date.','TMDA inaomba hati ya BRELA, TIN, mkataba na usajili wa baraza wa msimamizi, mchoro wa jengo na katiba ya kampuni. Msimamizi lazima awe na sifa na awe amesajiliwa na baraza la kitaaluma. Kiasi cha zamani cha TSh 60,000 hakitumiki tena.'],
  s:['tmda_fees','tmda_prem']},
 {t:['Sign the partner-pharmacy agreement and check its Pharmacy Council premises licence','Kusaini mkataba na famasia mshirika na kuhakiki leseni yake ya majengo ya Baraza la Famasia'],
  a:['Pharmacy Council (the partner’s licence)','Baraza la Famasia (leseni ya mshirika)'],f:['No Afya fee','Hakuna ada kwa Afya'],w:null,
  d:['Afya sells no medicines. Retail premises for medicines are registered and licensed by the Pharmacy Council, so the partner pharmacy sells and dispenses under its own licence and pharmacist, on its own receipt. A copy of the partner’s licence is filed every year.','Afya haiuzi dawa. Majengo ya rejareja ya dawa yanasajiliwa na kupewa leseni na Baraza la Famasia, kwa hiyo famasia mshirika inauza na kutoa dawa chini ya leseni yake na mfamasia wake, kwa risiti yake. Nakala ya leseni ya mshirika inahifadhiwa kila mwaka.'],
  s:['tmda_med']},
 {t:['Decide, for each product, whether to buy it locally already registered or to import it; register the self-imported cosmetics and foods with TBS','Kuamua, kwa kila bidhaa, kama inanunuliwa hapa nchini ikiwa tayari imesajiliwa au inaingizwa kutoka nje; kusajili TBS vipodozi na vyakula vinavyoingizwa na Afya yenyewe'],
  a:['TBS (online application system)','TBS (mfumo wa maombi mtandaoni)'],
  f:['TSh 440,000 per cosmetic (a colour or scent variant 220,000); food 500,000–1,000,000 per product','TSh 440,000 kwa kila kipodozi (aina nyingine ya rangi au harufu 220,000); chakula 500,000–1,000,000 kwa kila bidhaa'],
  w:['Valid 5 years; an application lapses if queries go unanswered for 4 months','Inadumu miaka 5; maombi yanafutika maswali yasipojibiwa kwa miezi 4'],
  d:['Decided: Afya opens with products already registered by local distributors, which keeps compliance fees to about TSh 2.3 million. Its own TBS product registrations (about TSh 11.1 million for 20 products) move to launch Phase 2. Food supplements cost TSh 800,000 per product.','Imeamuliwa: Afya inafungua na bidhaa ambazo tayari zimesajiliwa na wasambazaji wa ndani, jambo linaloweka ada za udhibiti karibu TSh milioni 2.3. Usajili wa bidhaa wa Afya yenyewe kwa TBS (takriban TSh milioni 11.1 kwa bidhaa 20) unahamia Awamu ya 2 ya uzinduzi. Virutubisho vya chakula ni TSh 800,000 kwa kila bidhaa.'],
  s:['tbs_fees','tbs_cos']},
 {t:['Check every device on TMDA’s register (blood-pressure monitors, thermometers, glucose meters, the kiosk); if Afya holds the registration, register or notify it','Kuhakiki kila kifaa kwenye rejista ya TMDA (vipimo vya shinikizo la damu, vipimajoto, vipimo vya sukari, kioski); kama Afya ndiye mmiliki wa usajili, kusajili au kutoa taarifa'],
  a:['TMDA','TMDA'],
  f:[`The registration holder pays US$50–2,500 per model (TSh 132,125–6,606,250 ${fxNote()})`,`Mmiliki wa usajili analipa US$50–2,500 kwa kila modeli (TSh 132,125–6,606,250 ${fxNote()})`],
  w:['Registration valid 5 years, notification 3 years','Usajili unadumu miaka 5, taarifa miaka 3'],
  d:[`Blood-pressure monitors, thermometers and pulse oximeters for routine checks are Class B; self-test glucose meters are Class C. A retail outlet is not on TMDA’s list of who may import devices, so at launch devices are bought from TMDA-registered wholesalers. ${lean?'In the start-small option the Afya Check kiosk is added later from the store’s own cash; when it comes, it is bought through a TMDA-registered local dealer that holds its registration (Class B).':'The Afya Check kiosk is bought through a TMDA-registered local dealer that holds its registration (Class B); registering it ourselves would cost US$2,500 (TSh 6,606,250 '+fxNote()+').'}`,
     `Vipimo vya shinikizo la damu, vipimajoto na vipimo vya oksijeni kwa ukaguzi wa kawaida ni Daraja B; vipimo vya sukari vya kujipima ni Daraja C. Duka la rejareja halimo kwenye orodha ya TMDA ya wanaoruhusiwa kuingiza vifaa, kwa hiyo wakati wa uzinduzi vifaa vinanunuliwa kutoka kwa wauzaji wa jumla waliosajiliwa na TMDA. ${lean?'Katika chaguo la kuanza kidogo kioski cha Afya Check kinaongezwa baadaye kwa fedha za duka lenyewe; kitakapokuja, kitanunuliwa kupitia muuzaji wa ndani aliyesajiliwa na TMDA anayemiliki usajili wake (Daraja B).':'Kioski cha Afya Check kinanunuliwa kupitia muuzaji wa ndani aliyesajiliwa na TMDA anayemiliki usajili wake (Daraja B); kukisajili sisi wenyewe kungegharimu US$2,500 (TSh 6,606,250 '+fxNote()+').'}`],
  s:['tmda_comp','tmda_fees','tmda_imp','bot_fx']},
 {t:['Appoint a licensed clearing and forwarding agent and get a written quote','Kumteua wakala wa forodha na usafirishaji mwenye leseni na kupata nukuu ya maandishi'],
  a:['TRA-licensed clearing agent','Wakala wa forodha mwenye leseni ya TRA'],
  f:['TSh 600,000 per container until a written quote arrives','TSh 600,000 kwa kila kontena hadi nukuu ya maandishi itakapopatikana'],fe:1,
  w:['Documents lodged at least 7 days before arrival','Nyaraka zinawasilishwa angalau siku 7 kabla ya mzigo kufika'],
  d:['The quote is asked for one 20 ft container of mixed cosmetics and personal-care goods from a Chinese port into Dar es Salaam, itemising the agency fee, port handling and wharfage, storage, the shipping line’s charges, the TBS and TMDA steps, the truck to the shop, and the duties the agent expects for our ten main product families.','Nukuu inaombwa kwa kontena moja la futi 20 lenye vipodozi na bidhaa za usafi binafsi mchanganyiko kutoka bandari ya China hadi Dar es Salaam, ikionyesha ada ya wakala, ushughulikiaji bandarini na ada ya gati, uhifadhi, tozo za kampuni ya meli, hatua za TBS na TMDA, lori hadi dukani, na ushuru ambao wakala anatarajia kwa familia zetu kumi kuu za bidhaa.'],
  s:['tra_imp']},
 {t:['Before each shipment from China or India: the PVoC certificate of conformity from a TBS-appointed contractor','Kabla ya kila shehena kutoka China au India: cheti cha ulinganifu cha PVoC kutoka kwa mkandarasi aliyeteuliwa na TBS'],
  a:['PVoC contractor for TBS','Mkandarasi wa PVoC wa TBS'],
  f:[`0.5% of the factory (FOB) value, at least US$250 = TSh 660,625 and at most US$5,000 = TSh 13,212,500 ${fxNote()}`,`0.5% ya thamani ya kiwandani (FOB), angalau US$250 = TSh 660,625 na isiyozidi US$5,000 = TSh 13,212,500 ${fxNote()}`],
  w:['The certificate is valid for three months','Cheti kinadumu miezi mitatu'],
  d:['For China the contractors are CCIC, Intertek, SGS, TÜV Rheinland and WSCT; for India SGS, TÜV Rheinland and Intertek. Bureau Veritas is not a contractor. Registering frequently shipped products under Route B lowers the fee to 0.45%, renewable each year. The TBS product registration certificates go with each request.','Kwa China wakandarasi ni CCIC, Intertek, SGS, TÜV Rheinland na WSCT; kwa India ni SGS, TÜV Rheinland na Intertek. Bureau Veritas si mkandarasi. Kusajili bidhaa zinazosafirishwa mara kwa mara chini ya Njia B kunashusha ada hadi 0.45%, ikihuishwa kila mwaka. Vyeti vya usajili wa bidhaa vya TBS vinaambatanishwa na kila ombi.'],
  s:['pvoc','pvoc_psp','bot_fx']},
 {t:['Clear the goods: TBS checks the certificate; pay duty, excise, VAT, the railway levy and the customs processing fee','Kutoa mzigo: TBS inahakiki cheti; kulipa ushuru wa forodha, ushuru wa bidhaa, VAT, tozo ya reli na ada ya uchakataji wa forodha'],
  a:['TBS and TRA','TBS na TRA'],
  f:['Per shipment. Without a certificate: a penalty of 15% of the invoice value + TSh 100,000 inspection + 150,000 physical verification + 30,000 service + TSh 6 per kg','Kwa kila shehena. Bila cheti: adhabu ya 15% ya thamani ya ankara + TSh 100,000 ukaguzi + 150,000 uhakiki wa bidhaa + 30,000 huduma + TSh 6 kwa kilo'],
  w:null,
  d:['Excise on skin, hair, perfume and deodorant products is 15% (10% before 1 July 2026), VAT 18%, the railway levy 2% of the customs value and the customs processing fee 1% of FOB (0.6% before 1 July 2026). At least 50% of the shelf life must remain on arrival for non-food goods and 75% for food.','Ushuru wa bidhaa kwenye bidhaa za ngozi, nywele, manukato na viondoa harufu ni 15% (10% kabla ya 1 Julai 2026), VAT 18%, tozo ya reli 2% ya thamani ya forodha na ada ya uchakataji wa forodha 1% ya FOB (0.6% kabla ya 1 Julai 2026). Bidhaa zisizo chakula lazima ziwe na angalau 50% ya muda wa matumizi uliobaki zinapofika, na chakula 75%.'],
  s:['pvoc_pen','gn127','cpf','fa2026']},
 {t:['Opening day and after: register for VAT when due, file the annual return, renew TMDA by 30 June and TBS premises each year','Siku ya ufunguzi na baadaye: kujisajili VAT inapohitajika, kuwasilisha taarifa ya mwaka, kuhuisha TMDA kabla ya 30 Juni na majengo ya TBS kila mwaka'],
  a:['TRA, BRELA, TMDA, TBS','TRA, BRELA, TMDA, TBS'],f:['Annual return TSh 22,000','Taarifa ya mwaka TSh 22,000'],
  w:['VAT returns by the 20th of each month','Ritani za VAT kabla ya tarehe 20 kila mwezi'],
  d:[`VAT registration is compulsory at TSh 200 million of taxable sales in twelve months or TSh 100 million in six months, and voluntary before that as an intending trader. The model’s year-1 revenue is ${tshM(y1)} (estimate), so Afya plans to register before opening. The BRELA annual return is filed on each incorporation anniversary.`,`Usajili wa VAT ni lazima mauzo yanayotozwa kodi yanapofika TSh milioni 200 ndani ya miezi kumi na miwili au TSh milioni 100 ndani ya miezi sita, na ni wa hiari kabla ya hapo kama mfanyabiashara anayekusudia. Mapato ya mwaka wa 1 kwenye modeli ni ${tshM(y1)} (makadirio), kwa hiyo Afya inapanga kujisajili kabla ya kufungua. Taarifa ya mwaka ya BRELA inawasilishwa kila maadhimisho ya usajili.`],
  s:['tra_vat','brela_ar','model']}]}

/* requirements kept from the earlier plan; not yet checked against the regulators' own pages */
const UNVER=[['Fire safety certificate (Fire and Rescue Force, after an inspection)','Cheti cha usalama dhidi ya moto (Jeshi la Zimamoto na Uokoaji, baada ya ukaguzi)'],
 ['OSHA workplace registration before operations start, then a yearly compliance licence','Usajili wa mahali pa kazi OSHA kabla ya kuanza kazi, kisha leseni ya utekelezaji ya kila mwaka'],
 ['NSSF and WCF employer registration once the first employee is hired','Usajili wa mwajiri NSSF na WCF mara mfanyakazi wa kwanza anapoajiriwa'],
 ['Registration with the Personal Data Protection Commission (PDPC) as a collector of members’ health readings','Usajili na Tume ya Ulinzi wa Taarifa Binafsi (PDPC) kama mkusanyaji wa vipimo vya afya vya wanachama'],
 ['Municipal building and signage permits for the fit-out','Vibali vya manispaa vya ujenzi na mabango kwa ukarabati']];

/* ---------- compliance budget (R1 section 7) ---------- */
const BUDGET=[[['Fixed official fees: company, two business licences, TBS and TMDA premises','Ada rasmi za kudumu: kampuni, leseni mbili za biashara, majengo ya TBS na TMDA'],1041000,0],
 [['First 20 ft container: PVoC certificate at the US$250 minimum','Kontena la kwanza la futi 20: cheti cha PVoC kwa kiwango cha chini cha US$250'],660625,0],
 [['First container: clearing agent, until a written quote','Kontena la kwanza: wakala wa forodha, hadi nukuu ya maandishi'],600000,1]];
const SCEN=[[['At launch: all regulated products bought already registered from local distributors (decided)','Wakati wa uzinduzi: bidhaa zote zinazodhibitiwa zinanunuliwa zikiwa tayari zimesajiliwa kutoka kwa wasambazaji wa ndani (imeamuliwa)'],2301625],
 [['Launch Phase 2: Afya registers 10 cosmetic products of its own','Awamu ya 2 ya uzinduzi: Afya inasajili bidhaa 10 zake za vipodozi'],6701625],
 [['Launch Phase 2: Afya registers 20 cosmetic products of its own','Awamu ya 2 ya uzinduzi: Afya inasajili bidhaa 20 zake za vipodozi'],11101625]];

/* ---------- earlier planning estimates kept (set-up work and trips) ---------- */
const WORK=[[['Company lawyer: incorporation and filings','Wakili wa kampuni: usajili na uwasilishaji wa nyaraka'],1200000],
 [['Shareholders’ agreement, the founders’ 25% floor and the ownership opinion','Mkataba wa wanahisa, kiwango cha chini cha 25% cha waanzilishi na maoni ya kisheria kuhusu umiliki'],3000000],
 [['Accountant: TIN, VAT plan and receipt system','Mhasibu: TIN, mpango wa VAT na mfumo wa risiti'],300000],
 [['Bank account and bookkeeping set-up','Akaunti ya benki na kuanzisha uhasibu'],200000],
 [['Regulatory consultant: product-to-regulator map','Mshauri wa udhibiti: ramani ya bidhaa na mdhibiti wake'],1500000],
 [['Location shortlist and lease negotiation','Orodha fupi ya maeneo na majadiliano ya pango'],1500000],
 [['Fit-out, building and signage permit filings','Uwasilishaji wa vibali vya ukarabati, ujenzi na mabango'],1500000],
 [['TMDA premises file and inspection preparation','Faili la majengo la TMDA na maandalizi ya ukaguzi'],1500000],
 [['Partner-pharmacy agreement (legal fee)','Mkataba wa famasia mshirika (ada ya wakili)'],500000],
 [['TBS registration work','Kazi za usajili wa TBS'],1000000],
 [['Business licence filings','Uwasilishaji wa leseni za biashara'],500000],
 [['Fire safety and OSHA','Usalama dhidi ya moto na OSHA'],800000],
 [['Employer registrations: NSSF and WCF','Usajili wa mwajiri: NSSF na WCF'],300000],
 [['Data-protection registration','Usajili wa ulinzi wa taarifa binafsi'],800000],
 [['Payments and insurance set-up','Kuanzisha malipo na bima'],1000000]];
const TRIPS=[
 {k:'dar',t:['Dar es Salaam ground research','Utafiti wa uwanjani Dar es Salaam'],sub:['Trip 1, six to five months before opening','Safari ya 1, miezi sita hadi mitano kabla ya kufungua'],days:21,dmin:10,dmax:35,ppl:2,pmax:3,
  g:[['A price survey of the top 150 product families in about 30 outlets: pharmacies, supermarkets, market stalls and online sellers','Utafiti wa bei za familia 150 za bidhaa zinazoongoza katika maduka takriban 30: famasia, maduka makubwa, vibanda vya sokoni na wauzaji wa mtandaoni'],
   ['Check each shortlisted device on TMDA’s register, and ask local distributors which cosmetics they already hold TBS registrations for','Kuhakiki kila kifaa kilichochaguliwa kwenye rejista ya TMDA, na kuwauliza wasambazaji wa ndani ni vipodozi vipi tayari wana usajili wake wa TBS'],
   ['Visit and score 6–10 candidate sites, and meet landlords','Kutembelea na kupima maeneo 6–10 yanayowezekana, na kukutana na wenye majengo'],
   ['40 interviews with mothers, carers, people living with diabetes and diaspora families','Mahojiano 40 na akina mama, walezi, watu wanaoishi na kisukari na familia za diaspora'],
   ['Collect the clearing agent’s written quote, phone TBS about a separate importer fee, and deliver the written questions to TMDA','Kupata nukuu ya maandishi ya wakala wa forodha, kupiga simu TBS kuhusu ada tofauti ya mwagizaji, na kuwasilisha maswali ya maandishi TMDA'],
   ['Meet a regulatory consultant, a lawyer, an accountant and fit-out contractors for quotes','Kukutana na mshauri wa udhibiti, wakili, mhasibu na wakandarasi wa ukarabati kwa ajili ya nukuu']],
  r:{flight:2600000,stay:100000,local:50000,assist:50000,samples:1200000}},
 {k:'ind',t:['Supplier visits in India','Kutembelea wasambazaji nchini India'],sub:['Trip 2, five to four months before opening','Safari ya 2, miezi mitano hadi minne kabla ya kufungua'],days:6,dmin:3,dmax:14,ppl:2,pmax:3,
  g:[['Domestic travel only, as the founders are based in India','Safari za ndani tu, kwa kuwa waanzilishi wanaishi India'],
   ['Visit 6–8 shortlisted makers of devices, first-aid, hygiene and mother-and-baby lines','Kutembelea watengenezaji 6–8 waliochaguliwa wa vifaa, huduma ya kwanza, usafi na bidhaa za mama na mtoto'],
   ['Collect quality certificates and registration files, and send samples for testing','Kukusanya vyeti vya ubora na faili za usajili, na kutuma sampuli kupimwa'],
   ['Agree the first order: minimum quantity, price, payment terms and lead time','Kukubaliana oda ya kwanza: kiasi cha chini, bei, masharti ya malipo na muda wa kusubiri']],
  r:{flight:350000,stay:70000,local:30000,assist:0,samples:1000000}},
 {k:'chn',t:['Sourcing trip to China','Safari ya kutafuta bidhaa China'],sub:['Trip 3, around the spring trade fair in Guangzhou','Safari ya 3, karibu na maonyesho ya biashara ya majira ya kuchipua Guangzhou'],days:7,dmin:4,dmax:14,ppl:1,pmax:2,
  g:[['The third phase of the Canton Fair covers medical devices, health and personal-care products; the session dates are confirmed before booking','Awamu ya tatu ya Maonyesho ya Canton inahusu vifaa tiba, bidhaa za afya na usafi binafsi; tarehe za maonyesho zinathibitishwa kabla ya kukata tiketi'],
   ['Visit and audit 3–4 factories in person before any order','Kutembelea na kukagua viwanda 3–4 ana kwa ana kabla ya oda yoyote'],
   ['Agree the PVoC route with a TBS-appointed contractor (CCIC, Intertek, SGS, TÜV Rheinland or WSCT)','Kukubaliana njia ya PVoC na mkandarasi aliyeteuliwa na TBS (CCIC, Intertek, SGS, TÜV Rheinland au WSCT)'],
   ['Collect samples for supplier comparison','Kukusanya sampuli kwa ajili ya kulinganisha wasambazaji']],
  r:{flight:1800000,stay:150000,local:60000,assist:0,samples:1200000,visa:300000}}];
const tripCost=(t,days,ppl)=>{const r=t.r;return ppl*(r.flight+(r.visa||0))+days*ppl*r.stay*(t.k==='dar'?0.5:1)+days*r.local+days*r.assist+r.samples};
const CRIT=[[['Footfall and visibility','Wapita njia na kuonekana'],['People walking or driving past every hour; the store must be seen','Watu wanaopita kwa miguu au kwa gari kila saa; duka lazima lionekane'],20],
 [['Target households nearby','Kaya lengwa zilizo karibu'],['Families with children, older parents and steady incomes within 3 km','Familia zenye watoto, wazazi wazee na kipato cha uhakika ndani ya km 3'],15],
 [['Rent fits the model','Kodi inaendana na modeli'],['Rent at or under the model’s monthly budget for the selected store','Kodi sawa au chini ya bajeti ya mwezi ya modeli kwa duka lililochaguliwa'],15],
 [['Clinics and hospitals nearby','Kliniki na hospitali zilizo karibu'],['Referrals both ways and health-minded footfall','Rufaa pande zote mbili na wapita njia wanaojali afya'],10],
 [['Delivery reach','Ufikiaji wa usafirishaji'],['Share of Dar es Salaam reachable for same-day delivery before 15:00','Sehemu ya Dar es Salaam inayofikika kwa usafirishaji wa siku hiyohiyo kabla ya saa 9:00 alasiri'],10],
 [['Access and parking','Njia ya kufika na maegesho'],['Parking, bus and rapid-transit stops, a safe entrance for older people','Maegesho, vituo vya daladala na mabasi yaendayo haraka, mlango salama kwa wazee'],10],
 [['Store-build feasibility','Uwezekano wa kujenga duka'],['Frontage, landlord consent, the roof-edge sign, power for the screens','Upande wa mbele, ridhaa ya mwenye jengo, bango la juu ya paa, umeme kwa skrini'],10],
 [['Power, water, security','Umeme, maji, ulinzi'],['Backup power, reliable water, night security','Umeme wa akiba, maji ya uhakika, ulinzi wa usiku'],5],
 [['Regulatory fit','Ulinganifu na sheria'],['Zoning, and a licensed partner pharmacy within reach of the store','Mpango wa matumizi ya ardhi, na famasia mshirika yenye leseni karibu na duka'],5]];
const EXAMPLE=[[5,4,2,4,4,3,4,3,4],[3,4,4,3,3,4,3,4,4],[4,3,5,2,3,2,1,3,4]];

/* ---------- per-viewer storage (a convenience only) ---------- */
const KEY='afya.v2.s71.status',KT='afya.v2.s71.trips',KL='afya.v2.s71.sites';
const load=k=>{try{const x=localStorage.getItem(k);return x?JSON.parse(x):null}catch(e){return null}};
const save=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
const STL=[['To do','Bado'],['In progress','Inaendelea'],['Done','Imekamilika']];

const CSS=`<style>
.ab71 .ab-block>h2+*{margin-top:16px}
.ab71 .ab-block p+p,.ab71 .ab-block p+div,.ab71 .ab-block ul+p,.ab71 .ab-block div+p{margin-top:16px}
.ab71 .ab-block h3{margin-top:32px}
.ab71 .ab-block h3+*{margin-top:12px}
.ab71 .ab-block>ul,.ab71 .ab-block>h3+ul{padding-left:20px}
.ab71 .ab-block li+li{margin-top:8px}
.ab71-steps{min-width:1040px}
.ab71-steps td:nth-child(2){min-width:280px}.ab71-steps td:nth-child(4){min-width:240px}
.ab71-steps details{margin-top:8px}.ab71-steps summary{cursor:pointer;color:var(--mute);font-size:var(--fs-cap)}
.ab71-steps details p{margin:8px 0 0;color:var(--ink);font-size:calc(var(--fs-body) - 2px)}
.ab71-st{min-width:44px;min-height:44px;padding:0 10px;border:1px solid var(--line);border-radius:999px;background:none;color:var(--ink);cursor:pointer;font-variant-numeric:tabular-nums}
.ab71-st[data-s="1"]{border-color:var(--gold);color:var(--gold)}
.ab71-st[data-s="2"]{background:var(--green);border-color:var(--green);color:var(--ink)}
.ab71-st:focus-visible,.ab71-dots button:focus-visible{outline:2px solid var(--green-edge);outline-offset:2px}
.ab71-sl{display:block;margin-top:6px;color:var(--mute);font-size:var(--fs-cap);white-space:nowrap}
.ab71-prog{display:flex;flex-wrap:wrap;gap:16px;align-items:center;margin-top:16px;color:var(--mute);font-size:var(--fs-cap)}
.ab71-prog b{color:var(--gold);font-weight:400;font-size:var(--fs-sub)}
.ab71-grid{display:grid;gap:16px;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));margin-top:24px}
.ab71-card{border:1px solid var(--line);background:var(--surface);padding:16px 20px}
.ab71-card[data-off="1"]{opacity:.55}
.ab71-card h3{margin:0}.ab71-card ul{margin:12px 0;padding-left:18px;font-size:calc(var(--fs-body) - 2px)}
.ab71-card label{display:grid;grid-template-columns:90px 1fr 44px;gap:8px;align-items:center;margin-top:8px;font-size:var(--fs-cap);color:var(--mute)}
.ab71-card input[type=range]{width:100%;accent-color:var(--green)}
.ab71-card output{color:var(--ink);text-align:right}
.ab71-tot{display:flex;justify-content:space-between;margin-top:12px;padding-top:12px;border-top:1px solid var(--line)}
.ab71-tot b{color:var(--gold);font-weight:400}
.ab71-crit{display:grid;gap:12px;margin-top:16px}
.ab71-cr{display:grid;grid-template-columns:1fr auto;gap:8px 16px;align-items:center;padding:12px 0;border-bottom:1px solid var(--line)}
.ab71-cr small{display:block;color:var(--mute);font-size:var(--fs-cap)}
.ab71-dots{display:flex;gap:6px}
.ab71-dots button{width:36px;height:36px;border-radius:50%;border:1px solid var(--line);background:none;color:var(--mute);cursor:pointer}
.ab71-dots button[data-on="1"]{background:var(--green);border-color:var(--green);color:var(--ink)}
.ab71-dots button[data-lo="1"]{border-color:var(--gold);color:var(--gold)}
.ab71-bars{display:grid;gap:12px;margin-top:16px}
.ab71-bar{display:grid;grid-template-columns:minmax(120px,240px) 1fr auto;gap:12px;align-items:center;font-size:calc(var(--fs-body) - 2px)}
.ab71-bar svg{width:100%;height:14px;display:block}
.ab71-bar b{color:var(--gold);font-weight:400;font-variant-numeric:tabular-nums;white-space:nowrap}
#ab71ItemBar{display:block}
@media (max-width:720px){.ab71-bar{grid-template-columns:1fr auto}.ab71-bar>svg,#ab71ItemBar{grid-column:1 / -1;grid-row:2}.ab71-cr{grid-template-columns:1fr}}
</style>`;

function stepsTable(S){
 return `<div class="ab-tw"><table class="ab-t ab71-steps"><caption class="ab-vh">${E(T('The fifteen licence steps in order, with authority, fee, stated time, source and your status','Hatua kumi na tano za leseni kwa mpangilio, pamoja na mamlaka, ada, muda uliotajwa, chanzo na hali yako'))}</caption>
 <thead><tr><th>${E(T('Step and status','Hatua na hali'))}</th><th>${E(T('What to do','Cha kufanya'))}</th><th>${E(T('Authority','Mamlaka'))}</th><th>${E(T('Fee','Ada'))}</th><th>${E(T('Time stated','Muda uliotajwa'))}</th><th>${E(T('Source','Chanzo'))}</th></tr></thead>
 <tbody>${S.map((x,i)=>`<tr><td><button type="button" class="ab71-st" data-i="${i}" data-s="0" aria-label="${E(T(`Step ${i+1} status: to do. Change status`,`Hali ya hatua ${i+1}: bado. Badilisha hali`))}">${i+1}</button><span class="ab71-sl" data-sl="${i}">${E(L(STL[0]))}</span></td>
  <td><b>${E(L(x.t))}</b><details><summary>${E(T('What this involves','Hii inahusu nini'))}</summary><p>${E(L(x.d))}</p></details></td>
  <td>${E(L(x.a))}</td><td><span class="ab-gold">${E(L(x.f))}</span>${x.fe?' '+est():''}</td><td>${x.w?E(L(x.w)):'<span class="ab-mute">—</span>'}</td><td>${srcLinks(x.s)}</td></tr>`).join('')}</tbody></table></div>
 <div class="ab71-prog" aria-live="polite"><span><b id="ab71Done">0</b> ${E(T('of 15 steps done','kati ya hatua 15 zimekamilika'))}</span><span><b id="ab71Prog">0</b> ${E(T('in progress','zinaendelea'))}</span><button type="button" class="ab-btn" id="ab71Reset">${E(T('Reset the status','Weka upya hali'))}</button></div>
 <p class="ab-mute" style="margin-top:8px;font-size:var(--fs-cap)">${E(T('Tap a step number to move it from to do, to in progress, to done. The status is kept in this browser only, for your own tracking.','Gusa namba ya hatua kuisogeza kutoka bado, hadi inaendelea, hadi imekamilika. Hali inahifadhiwa kwenye kivinjari hiki pekee, kwa ufuatiliaji wako mwenyewe.'))}</p>`}

function tripsHTML(){return `<div class="ab71-grid">${TRIPS.map(t=>`<article class="ab71-card" data-k="${t.k}"><p class="ab-mute" style="margin:0;font-size:var(--fs-cap)">${E(L(t.sub))}</p><h3>${E(L(t.t))}</h3>
 <ul>${t.g.map(x=>`<li>${E(L(x))}</li>`).join('')}</ul>
 <button type="button" class="ab-btn" role="switch" aria-checked="true" data-sw="${t.k}">${E(T('Included','Imejumuishwa'))}</button>
 <label><span>${E(T('Days','Siku'))}</span><input type="range" min="${t.dmin}" max="${t.dmax}" value="${t.days}" data-d="${t.k}" aria-label="${E(T('Days','Siku'))}: ${E(L(t.t))}"><output data-od="${t.k}">${t.days}</output></label>
 <label><span>${E(T('Travellers','Wasafiri'))}</span><input type="range" min="1" max="${t.pmax}" value="${t.ppl}" data-p="${t.k}" aria-label="${E(T('Travellers','Wasafiri'))}: ${E(L(t.t))}"><output data-op="${t.k}">${t.ppl}</output></label>
 <div class="ab71-tot"><span>${E(T('Trip budget','Bajeti ya safari'))} ${est()}</span><b data-tt="${t.k}">${tshM(tripCost(t,t.days,t.ppl))}</b></div></article>`).join('')}</div>
 <div class="ab71-tot" style="max-width:520px"><span>${E(T('Research and travel, all trips included','Utafiti na safari, safari zote zikijumuishwa'))} ${est()}</span><b id="ab71Trav">–</b></div>
 <p class="ab-mute" style="font-size:var(--fs-cap)">${E(T(`Rates (estimates): return flights Delhi–Dar es Salaam ${tsh(TRIPS[0].r.flight)} and Delhi–Guangzhou ${tsh(TRIPS[2].r.flight)} per person; the Dar es Salaam stay is a shared flat for two; samples and a local research assistant are included.`,`Viwango (makadirio): tiketi za kwenda na kurudi Delhi–Dar es Salaam ${tsh(TRIPS[0].r.flight)} na Delhi–Guangzhou ${tsh(TRIPS[2].r.flight)} kwa kila mtu; malazi ya Dar es Salaam ni nyumba ya pamoja kwa watu wawili; sampuli na msaidizi wa utafiti wa ndani vimejumuishwa.`))}</p>`}

function locHTML(){const I=window.MODEL.inputs;
 return `<div class="ab-seg" role="group" aria-label="${E(T('Candidate site','Eneo linalowezekana'))}" id="ab71Sites">${['A','B','C'].map((x,i)=>`<button type="button" data-site="${i}" aria-pressed="${i===0}">${E(T('Site','Eneo'))} ${x}</button>`).join('')}</div>
 <div class="ab71-crit">${CRIT.map((k,i)=>`<div class="ab71-cr"><div><b>${E(L(k[0]))}</b> <span class="ab-mute">(${k[2]}%)</span><small>${E(L(k[1]))}${i===2?E(T(` (model: ${tsh(I.opex_month.rent)} a month, about ${tsh(I.opex_month.rent/I.store.area_m2)} per m², estimate)`,` (modeli: ${tsh(I.opex_month.rent)} kwa mwezi, takriban ${tsh(I.opex_month.rent/I.store.area_m2)} kwa m², makadirio)`)):''}</small></div>
  <div class="ab71-dots" role="group" aria-label="${E(L(k[0]))}" data-c="${i}">${[1,2,3,4,5].map(v=>`<button type="button" data-v="${v}" aria-pressed="false" aria-label="${E(L(k[0]))}: ${v} ${E(T('of 5','kati ya 5'))}">${v}</button>`).join('')}</div></div>`).join('')}</div>
 <div class="ab71-bars" id="ab71Scores" aria-live="polite"></div><p id="ab71Verdict" style="margin-top:16px"></p>
 <p class="ab-mute" style="font-size:var(--fs-cap)">${E(T('Example scores only. Real scores come from site visits during the Dar es Salaam trip, with photos and footfall counts at three times of day. The weights are the founders’ planning judgement.','Alama za mfano tu. Alama halisi zitatokana na kutembelea maeneo wakati wa safari ya Dar es Salaam, pamoja na picha na hesabu za wapita njia mara tatu kwa siku. Uzito wa vigezo ni maamuzi ya mipango ya waanzilishi.'))}</p>`}

const bar=(frac,fill)=>`<svg viewBox="0 0 100 14" preserveAspectRatio="none" aria-hidden="true"><rect x="0" y="0" width="100" height="14" style="fill:var(--line)"/><rect x="0" y="0" width="${Math.max(0,Math.min(100,frac*100)).toFixed(2)}" height="14" style="fill:${fill}"/></svg>`;

function render(s,p,pv,nx){const M=window.MODEL,I=M.inputs,lean=A().isLean(),g=I.seed.phase0_gap,seed=I.seed.amount,gap=g.research_setup_costs-g.phase0_budget,S=steps();
 const work=WORK.reduce((a,x)=>a+x[1],0),trav0=TRIPS.reduce((a,t)=>a+tripCost(t,t.days,t.ppl),0);
 const t2=I.seed.milestones[1]||'';
 return `${CSS}<article class="ab-sec ab71"><div class="ab-wrap">
 <div class="ab-sec-no">${E(s.no)}</div><h1>${E(s.title)}</h1>
 <p class="ab-summary">${E(T('Before opening, Afya Basics needs a company, a tax number, two business licences and premises registrations with the standards and medical-device regulators, and every import needs a certificate before it ships. This section lists the fifteen steps in order, each with its authority, its official fee and its source; the research trips that replace estimates with verified prices and sites; how the location is chosen; and the Phase 0 funding gap that is still open.','Kabla ya kufungua, Afya Basics inahitaji kampuni, namba ya mlipakodi, leseni mbili za biashara na usajili wa majengo kwa wadhibiti wa viwango na wa vifaa tiba, na kila shehena inahitaji cheti kabla ya kusafirishwa. Sehemu hii inaorodhesha hatua kumi na tano kwa mpangilio, kila moja na mamlaka yake, ada yake rasmi na chanzo chake; safari za utafiti zinazobadilisha makadirio kuwa bei na maeneo yaliyothibitishwa; jinsi eneo linavyochaguliwa; na pengo la fedha la Awamu 0 ambalo bado liko wazi.'))}</p>
 <figure class="ab-visual">${stepsTable(S)}<figcaption class="ab-mute" style="margin-top:12px;font-size:var(--fs-cap)">${E(T('Fees from the regulators’ own fee pages and regulations, opened 9 Nov 2026. US$ fees converted at TSh 2,642.50 per US$ (Bank of Tanzania mean rate, 10 Nov 2026). Source numbers refer to the list at the foot of this section.','Ada zinatoka kwenye kurasa na kanuni za ada za wadhibiti wenyewe, zilizofunguliwa 9 Nov 2026. Ada za US$ zimebadilishwa kwa TSh 2,642.50 kwa US$1 (kiwango cha wastani cha Benki Kuu ya Tanzania, 10 Nov 2026). Namba za vyanzo zinarejelea orodha iliyo chini ya sehemu hii.'))}</figcaption></figure>

 <div class="ab-body">
 <section class="ab-block"><h2>${E(T('Why the order matters','Kwa nini mpangilio ni muhimu'))}</h2>
  <p>${E(T('A health store is not an ordinary shop. Selling a blood-pressure monitor, a baby lotion or a packet of porridge flour puts Afya under the standards and medical-device regulators as well as the usual company and tax rules. Four kinds of permission are needed before opening: a company (BRELA), a tax number (TRA), two business licences (one from BRELA because Afya imports, one from the city council for the shop), and product-safety registrations (TBS for cosmetics and food, TMDA for the shop’s medical devices).','Duka la afya si duka la kawaida. Kuuza kipimo cha shinikizo la damu, losheni ya mtoto au pakiti ya unga wa uji kunaiweka Afya chini ya wadhibiti wa viwango na wa vifaa tiba, pamoja na sheria za kawaida za kampuni na kodi. Aina nne za ruhusa zinahitajika kabla ya kufungua: kampuni (BRELA), namba ya mlipakodi (TRA), leseni mbili za biashara (moja kutoka BRELA kwa sababu Afya inaingiza bidhaa, moja kutoka halmashauri ya jiji kwa ajili ya duka), na usajili wa usalama wa bidhaa (TBS kwa vipodozi na chakula, TMDA kwa vifaa tiba vya duka).'))}</p>
  <p>${E(T('The steps depend on each other. The TIN needs the lease and a letter from the local government office; the business licence needs the tax clearance; the TBS and TMDA premises registrations need the TIN and the business licence; and an import cannot be cleared without the certificate issued before it ships. One late step holds up the rest, and a store that is ready but not licensed pays rent while it waits. That is why the second tranche of the seed is released only when the licences are in hand.','Hatua zinategemeana. TIN inahitaji mkataba wa pango na barua kutoka ofisi ya serikali ya mtaa; leseni ya biashara inahitaji hati ya uthibitisho wa kodi; usajili wa majengo wa TBS na TMDA unahitaji TIN na leseni ya biashara; na shehena haiwezi kutolewa bila cheti kilichotolewa kabla ya kusafirishwa. Hatua moja ikichelewa inachelewesha zilizobaki, na duka lililo tayari lakini lisilo na leseni linalipa kodi ya pango likisubiri. Ndiyo maana awamu ya pili ya mtaji wa awali inatolewa tu leseni zikiwa mkononi.'))}</p>
  <p class="ab-notice">${E(T(`Milestone in the model: ${t2.replace(/^Tranche 2 \(35%\):\s*/,'')}.`,'Lengo kwenye modeli: ukarabati umekamilika, leseni za TMDA na za biashara ziko mkononi, bidhaa zimeagizwa.'))}</p>
 </section>

 <section class="ab-block"><h2>${E(T('Who regulates what','Nani anadhibiti nini'))}</h2>
  <p>${E(T('What Afya sells decides who licenses it, so every product family is assigned to its regulator before the lease is signed.','Kile Afya inachouza ndicho kinachoamua nani anaipa leseni, kwa hiyo kila familia ya bidhaa inapangiwa mdhibiti wake kabla ya kusaini mkataba wa pango.'))}</p>
  <div class="ab-tw"><table class="ab-t"><thead><tr><th>${E(T('What','Nini'))}</th><th>${E(T('Regulator','Mdhibiti'))}</th><th>${E(T('What it requires','Kinachohitajika'))}</th></tr></thead><tbody>
   <tr><td>${E(T('Every business','Kila biashara'))}</td><td>BRELA, TRA, ${E(T('council','halmashauri'))}</td><td>${E(T('Company and beneficial-owner filing, TIN within 15 days, VAT when due, and the Class A and Class B business licences (steps 1–6, 15).','Kampuni na uwasilishaji wa wamiliki manufaa, TIN ndani ya siku 15, VAT inapohitajika, na leseni za biashara za Kundi A na Kundi B (hatua 1–6, 15).'))}</td></tr>
   <tr><td>${E(T('Cosmetics and food: lotions, soaps, nappy creams, supplements, porridge flours','Vipodozi na chakula: losheni, sabuni, krimu za nepi, virutubisho, unga wa uji'))}</td><td>TBS</td><td>${E(T('Since 1 July 2019. Premises registration; product registration for anything Afya imports itself; a PVoC certificate for every shipment (steps 7, 10, 13, 14).','Tangu 1 Julai 2019. Usajili wa majengo; usajili wa bidhaa kwa chochote ambacho Afya inaingiza yenyewe; cheti cha PVoC kwa kila shehena (hatua 7, 10, 13, 14).'))}</td></tr>
   <tr><td>${E(T('Medical devices: blood-pressure monitors, thermometers, glucose meters, supports and the Afya Check kiosk','Vifaa tiba: vipimo vya shinikizo la damu, vipimajoto, vipimo vya sukari, vifaa vya kushikilia viungo na kioski cha Afya Check'))}</td><td>TMDA</td><td>${E(T('A registered retail device outlet with a qualified person in charge, renewed by 30 June; every model registered or notified by its holder. Nappies, sanitary pads and adult incontinence pads are on TMDA’s list of products that may be devices, and they also have compulsory TBS standards (steps 8, 11).','Duka la rejareja la vifaa lililosajiliwa lenye msimamizi mwenye sifa, linalohuishwa kabla ya 30 Juni; kila modeli imesajiliwa au imetolewa taarifa na mmiliki wake. Nepi, pedi na nepi za watu wazima ziko kwenye orodha ya TMDA ya bidhaa zinazoweza kuwa vifaa tiba, na pia zina viwango vya lazima vya TBS (hatua 8, 11).'))}</td></tr>
   <tr><td>${E(T('Medicines, even over the counter','Dawa, hata zisizohitaji agizo la daktari'))}</td><td>${E(T('Pharmacy Council','Baraza la Famasia'))}</td><td>${E(T('Afya sells none. A licensed partner pharmacy sells and dispenses them under its own licence and pharmacist (step 9).','Afya haiuzi dawa yoyote. Famasia mshirika yenye leseni inaziuza na kuzitoa chini ya leseni yake na mfamasia wake (hatua 9).'))}</td></tr>
  </tbody></table></div>
 </section>

 <section class="ab-block"><h2>${E(T('What changed in the licence plan','Nini kimebadilika kwenye mpango wa leseni'))}</h2>
  <p>${E(T('The checklist now follows the regulators’ own fee pages. Four things differ from the earlier plan. First, TBS product registration costs TSh 440,000 for every cosmetic Afya imports itself, which is why Afya opens with products already registered by local distributors. Second, every shipment from China or India needs a PVoC certificate before it ships; without it, the penalty is 15% of the invoice value plus inspection fees. Third, the TMDA retail device permit is TSh 100,000 a year, not TSh 60,000. Fourth, the Afya Check kiosk is a Class B medical device: TMDA has no “wellness” exemption, so it is bought from a local dealer that holds its registration.','Orodha sasa inafuata kurasa za ada za wadhibiti wenyewe. Mambo manne yanatofautiana na mpango wa awali. Kwanza, usajili wa bidhaa TBS unagharimu TSh 440,000 kwa kila kipodozi ambacho Afya inaingiza yenyewe, ndiyo maana Afya inafungua na bidhaa ambazo tayari zimesajiliwa na wasambazaji wa ndani. Pili, kila shehena kutoka China au India inahitaji cheti cha PVoC kabla ya kusafirishwa; bila cheti, adhabu ni 15% ya thamani ya ankara pamoja na ada za ukaguzi. Tatu, kibali cha TMDA cha duka la rejareja la vifaa ni TSh 100,000 kwa mwaka, si TSh 60,000. Nne, kioski cha Afya Check ni kifaa tiba cha Daraja B: TMDA haina msamaha wa “ustawi”, kwa hiyo kinanunuliwa kutoka kwa muuzaji wa ndani anayemiliki usajili wake.'))}</p>
  <h3>${E(T('Also required, not yet checked against the regulators’ pages','Pia vinahitajika, bado havijahakikiwa kwenye kurasa za wadhibiti'))}</h3>
  <ul>${UNVER.map(x=>`<li>${E(L(x))}</li>`).join('')}</ul>
  <p class="ab-mute">${E(T('These come from the earlier plan. Their fees and timing are confirmed with each authority before they are shown as figures.','Haya yanatoka kwenye mpango wa awali. Ada na muda wake vitathibitishwa na kila mamlaka kabla ya kuonyeshwa kama takwimu.'))}</p>
 </section>

 <section class="ab-block"><h2>${E(T('The research and travel plan','Mpango wa utafiti na safari'))}</h2>
  <p>${E(T('Three trips replace planning estimates with verified prices, suppliers and sites. Each has defined outputs that go into the data room, and no supplier is paid before its samples are tested and its factory is visited or audited. Switch a trip off, or change its days and travellers, to see the effect on the budget.','Safari tatu zinabadilisha makadirio ya mipango kuwa bei, wasambazaji na maeneo yaliyothibitishwa. Kila moja ina matokeo yaliyoainishwa yanayowekwa kwenye chumba cha nyaraka, na hakuna msambazaji anayelipwa kabla sampuli zake hazijapimwa na kiwanda chake kutembelewa au kukaguliwa. Zima safari, au badilisha siku na wasafiri wake, kuona athari kwenye bajeti.'))}</p>
  <p>${E(T('The Dar es Salaam trip matters most, because it tests the model’s two largest assumptions: what families pay today and what a street-front store costs to rent. Every receipt and shelf photo goes into the data room. If the survey shows that nappies or test strips sell for less than the model assumes, the basket and margin inputs are revised before the investor signs. The same trip shortlists six to ten sites and scores them with the tool below.','Safari ya Dar es Salaam ndiyo muhimu zaidi, kwa sababu inapima dhana mbili kubwa za modeli: familia zinalipa kiasi gani leo na duka la barabarani linagharimu kiasi gani kukodi. Kila risiti na picha ya rafu inawekwa kwenye chumba cha nyaraka. Utafiti ukionyesha kwamba nepi au vipande vya kupimia vinauzwa kwa bei ya chini kuliko modeli inavyodhani, vigezo vya kikapu na faida vinarekebishwa kabla mwekezaji hajasaini. Safari hiyohiyo inachagua maeneo sita hadi kumi na kuyapima kwa zana iliyo hapa chini.'))}</p>
  ${tripsHTML()}
 </section>

 <section class="ab-block"><h2>${E(T('Choosing the location','Kuchagua eneo'))}</h2>
  <p>${E(T(`The location is not yet chosen; this tool sets out how it will be chosen. The store has three jobs: to be seen, since the frontage is its main advertisement; to be easy to reach, with parking, bus stops and a safe entrance for older people; and to be a workable base for same-day delivery before the 15:00 cut-off. Rent must fit the model: ${tsh(I.opex_month.rent)} a month for the ${lean?'start-small store of about '+I.store.area_m2+' m²':'flagship of about '+I.store.area_m2+' m²'} (estimate). Score up to three candidate sites from 1 (poor) to 5 (excellent); a 1 on any criterion is treated as a deal-breaker, whatever the total.`,`Eneo bado halijachaguliwa; zana hii inaonyesha jinsi litakavyochaguliwa. Duka lina kazi tatu: kuonekana, kwa kuwa upande wa mbele ndio tangazo lake kuu; kufikika kwa urahisi, likiwa na maegesho, vituo vya mabasi na mlango salama kwa wazee; na kuwa kituo kinachofaa kwa usafirishaji wa siku hiyohiyo kabla ya saa 9:00 alasiri. Kodi lazima iendane na modeli: ${tsh(I.opex_month.rent)} kwa mwezi kwa ${lean?'duka dogo la takriban m² '+I.store.area_m2:'duka kuu la takriban m² '+I.store.area_m2} (makadirio). Pima hadi maeneo matatu kutoka 1 (dhaifu) hadi 5 (bora kabisa); alama 1 kwenye kigezo chochote inachukuliwa kama kikwazo kikuu, bila kujali jumla.`))}</p>
  ${locHTML()}
 </section>

 <section class="ab-block"><h2>${E(T('The open Phase 0 gap','Pengo la Awamu 0 lililo wazi'))}</h2>
  <p>${E(T(`One funding item is unresolved. The model puts research, travel and set-up work at ${tshM(g.research_setup_costs)} against a Phase 0 budget of ${tshM(g.phase0_budget)}, both estimates. The seed of ${tshM(seed)} does not cover this work: it funds the store build, the lease advance, stock, the launch, the losses to break-even and a reserve. The gap of ${tshM(gap)} is ${(gap/seed*100).toFixed(1)}% of the seed in the ${lean?'start-small':'flagship'} option.`,`Kipengele kimoja cha fedha bado hakijatatuliwa. Modeli inaweka utafiti, safari na kazi za maandalizi kwa ${tshM(g.research_setup_costs)} dhidi ya bajeti ya Awamu 0 ya ${tshM(g.phase0_budget)}, vyote ni makadirio. Mtaji wa awali wa ${tshM(seed)} haugharimii kazi hii: unagharimia ujenzi wa duka, malipo ya awali ya pango, bidhaa, uzinduzi, hasara hadi kufikia faida na akiba. Pengo la ${tshM(gap)} ni ${(gap/seed*100).toFixed(1)}% ya mtaji wa awali katika chaguo la ${lean?'kuanza kidogo':'duka kuu'}.`))}</p>
  <div class="ab71-bars" id="ab71Gap">
   <div class="ab71-bar"><span>${E(T('Phase 0 budget (model, estimate)','Bajeti ya Awamu 0 (modeli, makadirio)'))}</span>${bar(g.phase0_budget/g.research_setup_costs,'var(--green)')}<b>${tshM(g.phase0_budget)}</b></div>
   <div class="ab71-bar"><span>${E(T('Needed (model, estimate)','Kinachohitajika (modeli, makadirio)'))}</span>${bar(1,'var(--gold)')}<b>${tshM(g.research_setup_costs)}</b></div>
   <div class="ab71-bar"><span>${E(T('Itemised on this page: set-up work plus the trips above (estimates)','Kilichoorodheshwa kwenye ukurasa huu: kazi za maandalizi pamoja na safari zilizo juu (makadirio)'))}</span><span id="ab71ItemBar">${bar((work+trav0)/g.research_setup_costs,'var(--gold)')}</span><b id="ab71Item">${tshM(work+trav0)}</b></div>
  </div>
  <p style="margin-top:16px">${E(T('How the gap is funded is an open item. It is settled together with the founding-member pre-sale plan, which also sets the milestones that release the seed tranches; the options under review are the pre-sale, a founders’ bridge or the first tranche. Until then, every Phase 0 payment is recorded with a receipt in the data room, whoever pays it.','Jinsi pengo litakavyogharimiwa ni suala lililo wazi. Litatatuliwa pamoja na mpango wa mauzo ya awali kwa wanachama waanzilishi, ambao pia unaweka malengo yanayotoa awamu za mtaji wa awali; machaguo yanayoangaliwa ni mauzo ya awali, mkopo wa muda kutoka kwa waanzilishi au awamu ya kwanza. Hadi hapo, kila malipo ya Awamu 0 yanarekodiwa na risiti kwenye chumba cha nyaraka, bila kujali nani analipa.'))}</p>
  <h3>${E(T('Set-up work in the estimate','Kazi za maandalizi kwenye makadirio'))}</h3>
  <p class="ab-mute">${E(T('Planning estimates from the earlier set-up plan, covering advisers’ time and filings. They overlap with the official fees above and are replaced by written quotes.','Makadirio ya mipango kutoka mpango wa awali wa maandalizi, yanayohusu muda wa washauri na uwasilishaji wa nyaraka. Yanaingiliana na ada rasmi zilizo juu na yatabadilishwa na nukuu za maandishi.'))}</p>
  <div class="ab-tw"><table class="ab-t"><thead><tr><th>${E(T('Work','Kazi'))}</th><th style="text-align:right">${E(T('Estimate','Makadirio'))}</th></tr></thead><tbody>${WORK.map(x=>`<tr><td>${E(L(x[0]))}</td><td class="ab-n">${tsh(x[1])}</td></tr>`).join('')}<tr><td><b>${E(T('Total set-up work','Jumla ya kazi za maandalizi'))}</b></td><td class="ab-n">${tsh(work)}</td></tr></tbody></table></div>
 </section>

 <section class="ab-block"><h2>${E(T('If a step slips','Hatua ikichelewa'))}</h2>
  <ul>
   <li>${E(T('A premises registration is slower than planned and the store pays rent while empty: filing starts as soon as the TIN and licence allow, rent-free fit-out months are negotiated into the lease, and the stock tranche is released only when the licences are in hand.','Usajili wa majengo unachelewa kuliko ilivyopangwa na duka linalipa kodi likiwa tupu: uwasilishaji unaanza mara TIN na leseni zinaporuhusu, miezi ya ukarabati bila kodi inajadiliwa ndani ya mkataba wa pango, na awamu ya bidhaa inatolewa tu leseni zikiwa mkononi.'))}</li>
   <li>${E(T('A shortlisted product turns out not to be registered: every device is checked on TMDA’s register and every cosmetic with its distributor before ordering, with four or five brands per item, so losing one brand never empties a shelf.','Bidhaa iliyochaguliwa inagundulika haijasajiliwa: kila kifaa kinahakikiwa kwenye rejista ya TMDA na kila kipodozi kwa msambazaji wake kabla ya kuagiza, kukiwa na chapa nne au tano kwa kila kitu, kwa hiyo kupoteza chapa moja hakuachi rafu tupu.'))}</li>
   <li>${E(T('A shipment arrives without its certificate: no order ships until the PVoC certificate is issued, because the penalty is 15% of the invoice value.','Shehena inafika bila cheti chake: hakuna oda inayosafirishwa kabla cheti cha PVoC hakijatolewa, kwa sababu adhabu ni 15% ya thamani ya ankara.'))}</li>
   <li>${E(T('The chosen site’s rent is above the model budget: rent is 15% of the site score and a deal-breaker at 1, so that site is rejected.','Kodi ya eneo lililochaguliwa iko juu ya bajeti ya modeli: kodi ni 15% ya alama za eneo na kikwazo kikuu ikipata 1, kwa hiyo eneo hilo linakataliwa.'))}</li>
  </ul>
 </section>
 </div>

 <section class="ab-block"><h2>${E(T('Key figures','Takwimu muhimu'))}</h2>
  ${A().figsHTML([
   {v:tsh(1041000),l:T('Fixed official fees to open: company, two licences, three premises registrations','Ada rasmi za kudumu za kufungua: kampuni, leseni mbili, usajili wa majengo matatu'),s:E(T('BRELA, TRA, TBS, TMDA fee pages, checked 9 Nov 2026','Kurasa za ada za BRELA, TRA, TBS, TMDA, zimekaguliwa 9 Nov 2026'))},
   {v:tsh(440000),l:T('TBS registration for each cosmetic Afya imports itself, valid 5 years','Usajili wa TBS kwa kila kipodozi ambacho Afya inaingiza yenyewe, unadumu miaka 5'),s:E(T('TBS fee regulations 2021, checked 9 Nov 2026','Kanuni za ada za TBS 2021, zimekaguliwa 9 Nov 2026'))},
   {v:tsh(660625),l:T('Minimum PVoC certificate per shipment (US$250 at TSh 2,642.50, BoT, 10 Nov 2026)','Kiwango cha chini cha cheti cha PVoC kwa kila shehena (US$250 kwa TSh 2,642.50, BoT, 10 Nov 2026)'),s:E(T('TBS PVoC guideline 2025, checked 9 Nov 2026','Mwongozo wa PVoC wa TBS 2025, umekaguliwa 9 Nov 2026'))},
   {v:`${tshM(gap)} ${est()}`,l:T('Phase 0 gap still to be funded','Pengo la Awamu 0 ambalo bado halijagharimiwa'),s:E(T('Financial model v1.2','Modeli ya fedha v1.2'))}])}
 </section>

 <section class="ab-block"><h2>${E(T('What this costs','Gharama yake'))}</h2>
  <p>${E(T(`The compliance budget is the same in both funding options. The ${lean?'start-small':'flagship'} seed of ${tshM(seed)} is shown for comparison.`,`Bajeti ya udhibiti ni ileile katika machaguo yote mawili ya mtaji. Mtaji wa awali wa ${lean?'kuanza kidogo':'duka kuu'} wa ${tshM(seed)} unaonyeshwa kwa ulinganisho.`))}</p>
  <div class="ab-tw"><table class="ab-t"><thead><tr><th>${E(T('Line','Kipengele'))}</th><th style="text-align:right">TSh</th></tr></thead><tbody>
   ${BUDGET.map(x=>`<tr><td>${E(L(x[0]))}${x[2]?' '+est():''}</td><td class="ab-n">${tsh(x[1])}</td></tr>`).join('')}
   ${SCEN.map(x=>`<tr><td>${E(L(x[0]))}</td><td class="ab-n">${tsh(x[1])}</td></tr>`).join('')}
   <tr><td>${E(T('Research and travel, three trips','Utafiti na safari, safari tatu'))} ${est()}</td><td class="ab-n" id="ab71TravT">${tsh(trav0)}</td></tr>
   <tr><td>${E(T('Phase 0 gap: model need minus Phase 0 budget','Pengo la Awamu 0: mahitaji ya modeli ukiondoa bajeti ya Awamu 0'))} ${est()}</td><td class="ab-n">${tsh(gap)}</td></tr>
   <tr><td>${E(T('The gap as a share of the seed','Pengo kama sehemu ya mtaji wa awali'))}</td><td class="ab-n">${(gap/seed*100).toFixed(1)}%</td></tr>
  </tbody></table></div>
  <p class="ab-mute" style="margin-top:12px;font-size:var(--fs-cap)">${E(T('The launch line is the sum of the fixed fees, one minimum PVoC certificate and the clearing-agent estimate. Lease stamp duty (1% of the annual rent) is added when the lease is signed.','Mstari wa uzinduzi ni jumla ya ada za kudumu, cheti kimoja cha PVoC cha kiwango cha chini na makadirio ya wakala wa forodha. Ushuru wa stempu wa pango (1% ya kodi ya mwaka) unaongezwa mkataba ukisainiwa.'))}</p>
 </section>

 ${A().openHTML([
  E(T('The clearing agent’s written quote for a 20 ft container from China; until then TSh 600,000 per container is an estimate.','Nukuu ya maandishi ya wakala wa forodha kwa kontena la futi 20 kutoka China; hadi hapo TSh 600,000 kwa kontena ni makadirio.')),
  E(T('Whether TBS charges an importer registration fee separate from the product and premises fees, and whether Afya may sell cosmetics already registered by another importer without registering them again.','Kama TBS inatoza ada ya usajili wa mwagizaji tofauti na ada za bidhaa na majengo, na kama Afya inaweza kuuza vipodozi vilivyosajiliwa tayari na mwagizaji mwingine bila kuvisajili upya.')),
  E(T('TMDA’s written view on the kiosk’s class, on nappies and pads sold without medical claims, and on the qualification required of the person in charge of a retail device outlet.','Maoni ya maandishi ya TMDA kuhusu daraja la kioski, kuhusu nepi na pedi zinazouzwa bila madai ya kitabibu, na kuhusu sifa zinazohitajika kwa msimamizi wa duka la rejareja la vifaa.')),
  E(T('Which business-licence class the council applies to the shop (retail shop TSh 70,000, departmental store TSh 400,000 or supermarket TSh 500,000).','Kundi gani la leseni ya biashara halmashauri italitumia kwa duka (duka la rejareja TSh 70,000, duka la idara TSh 400,000 au supermarket TSh 500,000).')),
  E(T('The start date of BRELA’s beneficial-owner enforcement, and the business-licence fee schedule, which dates from 2014 with no later amendment found.','Tarehe ya kuanza kutekelezwa kwa sharti la wamiliki manufaa la BRELA, na jedwali la ada za leseni za biashara, ambalo ni la 2014 bila marekebisho ya baadaye yaliyopatikana.')),
  E(T('Fire, OSHA, NSSF, WCF and data-protection fees and timings.','Ada na muda wa usalama dhidi ya moto, OSHA, NSSF, WCF na ulinzi wa taarifa binafsi.')),
  E(T('Trip rates, the set-up work lines and the Phase 0 total are estimates; how the Phase 0 gap is funded is settled with the pre-sale plan.','Viwango vya safari, kazi za maandalizi na jumla ya Awamu 0 ni makadirio; jinsi pengo la Awamu 0 litakavyogharimiwa kutatuliwa pamoja na mpango wa mauzo ya awali.'))])}

 ${A().sourcesHTML(SRCKEYS.map(k=>({t:L(SRC[k]),u:SRC[k][2],chk:SRC[k][2]?CHK:''})))}
 ${A().pagerHTML(pv,nx)}
 </div></article>`}

function init(){const root=document.querySelector('.ab71-steps');if(!root)return;const g=window.MODEL.inputs.seed.phase0_gap;
 /* step status */
 let st=load(KEY);if(!Array.isArray(st)||st.length!==15)st=Array(15).fill(0);
 const paintSt=()=>{document.querySelectorAll('.ab71-st').forEach(b=>{const i=+b.dataset.i,v=st[i]||0;b.dataset.s=String(v);b.textContent=v===2?'✓':String(i+1);
   b.setAttribute('aria-label',T(`Step ${i+1} status: ${STL[v][0].toLowerCase()}. Change status`,`Hali ya hatua ${i+1}: ${STL[v][1].toLowerCase()}. Badilisha hali`));
   const sl=document.querySelector(`[data-sl="${i}"]`);if(sl)sl.textContent=L(STL[v])});
  const d=document.getElementById('ab71Done'),p=document.getElementById('ab71Prog');if(d)d.textContent=st.filter(x=>x===2).length;if(p)p.textContent=st.filter(x=>x===1).length};
 document.querySelectorAll('.ab71-st').forEach(b=>b.addEventListener('click',()=>{const i=+b.dataset.i;st[i]=((st[i]||0)+1)%3;save(KEY,st);paintSt()}));
 const rs=document.getElementById('ab71Reset');if(rs)rs.addEventListener('click',()=>{st=Array(15).fill(0);save(KEY,st);paintSt()});
 paintSt();
 /* trips */
 const saved=load(KT)||{},trip={};TRIPS.forEach(t=>{const o=saved[t.k]||{};trip[t.k]={on:o.on!==false,days:Math.min(t.dmax,Math.max(t.dmin,+o.days||t.days)),ppl:Math.min(t.pmax,Math.max(1,+o.ppl||t.ppl))}});
 const work=WORK.reduce((a,x)=>a+x[1],0);
 const paintTr=()=>{let tot=0;TRIPS.forEach(t=>{const o=trip[t.k],c=document.querySelector(`.ab71-card[data-k="${t.k}"]`);if(!c)return;const cost=tripCost(t,o.days,o.ppl);if(o.on)tot+=cost;
   c.dataset.off=o.on?'0':'1';const sw=c.querySelector('[data-sw]');sw.setAttribute('aria-checked',String(o.on));sw.textContent=o.on?T('Included','Imejumuishwa'):T('Left out','Imeachwa');
   c.querySelector('[data-d]').value=o.days;c.querySelector('[data-p]').value=o.ppl;c.querySelector('[data-od]').textContent=o.days;c.querySelector('[data-op]').textContent=o.ppl;
   c.querySelector('[data-tt]').textContent=o.on?tshM(cost):T('left out','imeachwa')});
  const tv=document.getElementById('ab71Trav');if(tv)tv.textContent=tshM(tot);const tt=document.getElementById('ab71TravT');if(tt)tt.textContent=tsh(tot);
  const it=document.getElementById('ab71Item'),ib=document.getElementById('ab71ItemBar');if(it)it.textContent=tshM(work+tot);if(ib)ib.innerHTML=bar((work+tot)/g.research_setup_costs,'var(--gold)')};
 document.querySelectorAll('.ab71-card [data-sw]').forEach(b=>b.addEventListener('click',()=>{trip[b.dataset.sw].on=!trip[b.dataset.sw].on;save(KT,trip);paintTr()}));
 document.querySelectorAll('.ab71-card input[data-d]').forEach(r=>r.addEventListener('input',()=>{trip[r.dataset.d].days=+r.value;save(KT,trip);paintTr()}));
 document.querySelectorAll('.ab71-card input[data-p]').forEach(r=>r.addEventListener('input',()=>{trip[r.dataset.p].ppl=+r.value;save(KT,trip);paintTr()}));
 paintTr();
 /* location scoring */
 let sc=load(KL);if(!Array.isArray(sc)||sc.length!==3||sc.some(r=>!Array.isArray(r)||r.length!==CRIT.length))sc=EXAMPLE.map(r=>r.slice());let site=0;
 const tot=k=>CRIT.reduce((a,c,i)=>a+sc[k][i]/5*c[2],0);
 const paintLoc=()=>{document.querySelectorAll('.ab71-dots').forEach(d=>{const ci=+d.dataset.c,v0=sc[site][ci];d.querySelectorAll('button').forEach(b=>{const v=+b.dataset.v;b.dataset.on=(v<=v0&&v0>1)?'1':'0';b.dataset.lo=(v0===1&&v===1)?'1':'0';b.setAttribute('aria-pressed',String(v===v0))})});
  document.querySelectorAll('#ab71Sites [data-site]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.site===site)));
  const ts=[0,1,2].map(tot),best=ts.indexOf(Math.max(...ts)),ab='ABC';
  const box=document.getElementById('ab71Scores');if(box)box.innerHTML=ts.map((t,k)=>`<div class="ab71-bar"><span>${E(T('Site','Eneo'))} ${ab[k]}</span>${bar(t/100,k===best?'var(--gold)':'var(--green)')}<b>${t.toFixed(0)}/100</b></div>`).join('');
  const flags=[0,1,2].map(k=>CRIT.filter((_,i)=>sc[k][i]===1).map(c=>L(c[0])));
  const v=document.getElementById('ab71Verdict');if(v)v.innerHTML=E(T(`Site ${ab[best]} leads with ${ts[best].toFixed(0)} of 100.`,`Eneo ${ab[best]} linaongoza kwa alama ${ts[best].toFixed(0)} kati ya 100.`))+[0,1,2].map(k=>flags[k].length?'<br>'+E(T(`Site ${ab[k]}: deal-breaker check on ${flags[k].join(', ')}.`,`Eneo ${ab[k]}: kikwazo kikuu cha kuangalia kwenye ${flags[k].join(', ')}.`)):'').join('')+'<br>'+E(flags[best].length?T('The leader has a deal-breaker, so it is resolved before any negotiation.','Linaloongoza lina kikwazo kikuu, kwa hiyo kinatatuliwa kabla ya majadiliano yoyote.'):T('Next: a footfall count, a landlord meeting and a lawyer’s review of the draft lease.','Kinachofuata: hesabu ya wapita njia, kikao na mwenye jengo na wakili kupitia rasimu ya mkataba wa pango.'))};
 document.querySelectorAll('#ab71Sites [data-site]').forEach(b=>b.addEventListener('click',()=>{site=+b.dataset.site;paintLoc()}));
 document.querySelectorAll('.ab71-dots button').forEach(b=>b.addEventListener('click',()=>{const ci=+b.parentNode.dataset.c;sc[site][ci]=+b.dataset.v;save(KL,sc);paintLoc()}));
 paintLoc()}

window.SECTIONS['s7-1']={render,init,v2:true};
})();
