/* 7.3 Risks · v2 on the D2 template.
   The register is rewritten from research R1 (regulation), R2 (kiosk), R3 (pricing and churn), R5 (payments) and the
   brief's R4 decisions (pre-sale, phased launch; details still to be settled). Likelihood and impact are founder
   estimates (1–5). Model figures follow the funding switch. Heat-map shades are opacity steps of --green-edge and --green only (gold is reserved for numbers, C2). */
(function(){
'use strict';
const A=()=>window.AB,T=(e,s)=>A().T(e,s),E=s=>A().E(s),L=x=>T(x[0],x[1]);
const sw=()=>window.AFYA_LANG==='sw';
const tsh=n=>'TSh '+Math.round(n).toLocaleString('en-US');
const tshM=n=>{const v=n/1e6,x=String(parseFloat(v.toFixed(Math.abs(v)>=100?0:Math.abs(v)>=10?1:2)));return sw()?'TSh '+x+' milioni':'TSh '+x+'M'};
const CHK='9 Nov 2026',FXD='TSh 2,642.50';

const SRC={
 tbs_fees:['TBS: Standards (Fees and Charges) Regulations 2021, GN 496L','TBS: Kanuni za Viwango (Ada na Tozo) 2021, Tangazo la Serikali Na. 496L','https://www.tbs.go.tz/uploads/documents/en-1786361569-The%20Standards%20(Fees%20and%20Charges)%20Regulations,%202021.pdf'],
 tbs_cos:['TBS: guideline for registration of cosmetics (Nov 2022)','TBS: mwongozo wa usajili wa vipodozi (Nov 2022)','https://www.tbs.go.tz/uploads/documents/sw-1786606993-GUIDELINE%20FOR%20A%20CLIENT%20WHO%20WISH%20TO%20APPLY%20FOR%20REGISTRATION%20OF%20COSMETICS.pdf'],
 pvoc:['TBS: guideline for the PVoC programme, 2025','TBS: mwongozo wa programu ya PVoC, 2025','https://www.tbs.go.tz/uploads/text-editor/files/GUIDELINE%20FOR%20PVOC%20PROGRAMME%20-%202025_1786358618.pdf'],
 pvoc_pen:['TBS: penalty for un-inspected goods under the PVoC programme, 2025','TBS: adhabu kwa bidhaa zisizokaguliwa chini ya programu ya PVoC, 2025','https://www.tbs.go.tz/uploads/text-editor/files/PENALTY%20FOR%20UN-INSPECTED%20GENERAL%20GOODS%20REGULATED%20UNDER%20PVOC%20PROGRAMME-2025_1786359408.pdf'],
 gn127:['TBS: amendment regulations, GN 127 of 2025 (remaining shelf life on import)','TBS: kanuni za marekebisho, Tangazo la Serikali Na. 127 la 2025 (muda wa matumizi uliobaki wakati wa kuingiza)','https://www.tbs.go.tz/uploads/documents/sw-1786362319-Batch%20Amendment%20Regulation.pdf'],
 tmda_fees:['TMDA: Fees and Charges (Amendment) Regulations 2024','TMDA: Kanuni za Ada na Tozo (Marekebisho) 2024','https://www.tmda.go.tz/uploads/1718887575-FEES%20AND%20CHARGES%20AMENDMENT%20JUNE%202024%20FINAL.pdf'],
 tmda_comp:['TMDA: compendium of guidelines for marketing authorisation of medical devices, June 2024 (device classes)','TMDA: mkusanyiko wa miongozo ya idhini ya soko ya vifaa tiba, Juni 2024 (madaraja ya vifaa)','https://www.tmda.go.tz/uploads/publications/en1755088789-Compendium%20of%20Guidelines%20for%20Marketing%20Authorization%20of%20Medical%20Devices,%20Diagnostics%20and%20Laboratory%20Equipment,%20June%202024.pdf'],
 tmda_prem:['TMDA: registration and licensing of premises (medical devices)','TMDA: usajili na leseni za majengo (vifaa tiba)','https://www.tmda.go.tz/pages/registration-and-licensing-of-premises-1'],
 tmda_med:['TMDA: registration and licensing of premises (medicines: Pharmacy Council)','TMDA: usajili na leseni za majengo (dawa: Baraza la Famasia)','https://www.tmda.go.tz/pages/registration-and-licensing-of-premises'],
 tmda_imp:['TMDA: guidelines for importation and exportation of medical devices, Rev 02, May 2024','TMDA: miongozo ya uingizaji na usafirishaji nje wa vifaa tiba, toleo la 02, Mei 2024','https://www.tmda.go.tz/uploads/publications/en1755006678-en1728063896-GUIDELINES%20FOR%20IMPORTATION%20AND%20EXPORTATION%20OF%20MEDICAL%20DEVICES%20-%2017.05%20(1).pdf'],
 cpf:['TRA: Customs Processing Fee Regulations 2026, GN 158D','TRA: Kanuni za Ada ya Uchakataji wa Forodha 2026, Tangazo la Serikali Na. 158D','https://www.tra.go.tz/images/uploads/acts/GN_158D-THE_TANZANIA_REVENUE_AUTHORITY_%28CUSTOMS_PROCESSING_FEE%29_REGULATIONS%2C_2026-TGPA.pdf'],
 fa2026:['Finance Act 2026 (excise rates from 1 Jul 2026)','Sheria ya Fedha 2026 (viwango vya ushuru wa bidhaa kuanzia 1 Jul 2026)','https://www.tra.go.tz/images/uploads/acts/THE_FINANCE_ACT%2C_2026.pdf'],
 glance:['TRA: Taxes and Duties at a Glance 2025/26 (VAT, import duty bands)','TRA: Kodi na Ushuru kwa Ufupi 2025/26 (VAT, viwango vya ushuru wa forodha)','https://www.tra.go.tz/images/uploads/pages/TAXES_AND_DUTIES_AT_A_GLANCE_2025_2026.pdf'],
 bot_nps:['Bank of Tanzania: National Payment Systems Annual Report 2025 (standing orders listed as a future enhancement)','Benki Kuu ya Tanzania: Ripoti ya Mwaka ya Mifumo ya Malipo ya Taifa 2025 (maagizo ya kudumu yametajwa kama uboreshaji wa baadaye)','https://www.bot.go.tz/Publications/Regular/Annual%20Report/en/2026060211494565.pdf'],
 bot_lipa:['Bank of Tanzania: customer experience guideline for merchant payments, May 2023 (Lipa Namba)','Benki Kuu ya Tanzania: mwongozo wa uzoefu wa mteja kwa malipo ya wafanyabiashara, Mei 2023 (Lipa Namba)','https://www.bot.go.tz/Publications/Acts,%20Regulations,%20Circulars,%20Guidelines/Guidelines/sw/2023062016582894.pdf'],
 afyadepot:['AfyaDepot home page: free delivery on pharmacy orders above TSh 150,000 in Dar es Salaam','Ukurasa mkuu wa AfyaDepot: usafirishaji wa bure kwa oda za famasia zaidi ya TSh 150,000 Dar es Salaam','https://afyadepot.co.tz/'],
 leka:['Made-in-China listing: Leka HW-900G health check kiosk (1-year warranty as listed)','Tangazo la Made-in-China: kioski cha kupima afya Leka HW-900G (dhamana ya mwaka 1 kama ilivyoorodheshwa)','https://www.made-in-china.com/video-channel/lekascale_BOQtqHLynZRA_Hw-900g-Multi-Functions-Self-Health-Check-up-Physical-Examination-Kiosk.html'],
 bot_fx:['Bank of Tanzania: exchange rates (mean rate for 10 Nov 2026)','Benki Kuu ya Tanzania: viwango vya kubadilisha fedha (kiwango cha wastani cha 10 Nov 2026)','https://www.bot.go.tz/ExchangeRate/excRates'],
 model:['Afya Basics financial model v1.2 (planning estimates)','Modeli ya fedha ya Afya Basics v1.2 (makadirio ya mipango)','']};
const SRCKEYS=Object.keys(SRC);
const SHORT={bot_nps:['BoT payments report 2025','Ripoti ya malipo ya BoT 2025'],bot_lipa:['BoT Lipa Namba guideline','Mwongozo wa Lipa Namba wa BoT'],bot_fx:['BoT exchange rate','Kiwango cha fedha cha BoT'],cpf:['TRA GN 158D','TRA GN 158D'],glance:['TRA tax summary','Muhtasari wa kodi wa TRA']};

const CAT={dem:['Demand','Mahitaji ya soko'],reg:['Regulation','Udhibiti'],pay:['Payments','Malipo'],sup:['Supply and import','Ugavi na uagizaji'],fx:['Exchange rate and taxes','Kiwango cha fedha na kodi'],
 ops:['Operations','Uendeshaji'],tec:['Technology and data','Teknolojia na taarifa'],ppl:['People','Watu'],fin:['Finance','Fedha'],rep:['Reputation','Sifa'],com:['Competition','Ushindani']};
const OWN={com:['Commercial founder','Mwanzilishi wa biashara'],ops:['Operations founder','Mwanzilishi wa uendeshaji'],lead:['Store lead','Msimamizi wa duka'],buy:['Buyer (a founder)','Mnunuzi (mmoja wa waanzilishi)'],
 fnd:['Founders','Waanzilishi'],brd:['Board','Bodi'],law:['Board and lawyer','Bodi na wakili'],inv:['Founders and investor','Waanzilishi na mwekezaji'],acc:['Accountant','Mhasibu']};

/* [cat, L, I, owner, risk, early warning, our answer, sources, door] */
function risks(){const M=window.MODEL,I=M.inputs,lean=A().isLean(),b=M.get('base'),d=M.get('down'),g=I.seed.phase0_gap;
 const use=re=>(I.seed.use.find(x=>re.test(x[0]))||[0,0])[1];
 const loss=use(/operating losses/i),res=use(/reserve/i),mkt=use(/marketing/i);
 const churn=Math.round(I.members.monthly_churn*100),m3=Math.round(b.months[2].members);
 const fxd=((I.meta.fx_source||'').match(/\d{1,2} [A-Z][a-z]{2} \d{4}/)||[''])[0];
 const dl=d.y1.profit,cover=loss+res;
 const kioskEn='The budget assumes one failure a year: about TSh 1.9–4.8 million a year for one repair, spare cuffs, paper, calibration, cleaning and data (estimate; TSh 2–5 million is carried in running costs). A spare kit bought with the kiosk (one cuff, one printer module, ten paper rolls: US$150–300 = TSh 396,375–792,750 at TSh 2,642.50 per US$, Bank of Tanzania, 10 Nov 2026) covers the most common failures on the day. The listings offer a 12-month warranty; the written quotes must state the warranty, the spare-parts price list and lead times, because repairs depend on parts from China. The blood-pressure module is checked against a calibrated reference once a year and after every repair.';
 const kioskSw='Bajeti inadhani hitilafu moja kwa mwaka: takriban TSh milioni 1.9–4.8 kwa mwaka kwa matengenezo moja, mikanda ya akiba, karatasi, urekebishaji, usafi na data (makadirio; TSh milioni 2–5 zimewekwa kwenye gharama za uendeshaji). Seti ya akiba inayonunuliwa pamoja na kioski (mkanda mmoja, kipande kimoja cha printa, karatasi mizunguko kumi: US$150–300 = TSh 396,375–792,750 kwa TSh 2,642.50 kwa US$1, Benki Kuu ya Tanzania, 10 Nov 2026) inashughulikia hitilafu za kawaida siku hiyohiyo. Matangazo yanatoa dhamana ya miezi 12; nukuu za maandishi lazima zieleze dhamana, orodha ya bei za vipuri na muda wa kusubiri, kwa sababu matengenezo yanategemea vipuri kutoka China. Kipimo cha shinikizo la damu kinahakikiwa dhidi ya kifaa rejea kilichorekebishwa mara moja kwa mwaka na baada ya kila matengenezo.';
 return [
 ['dem',4,4,'com',['Members leave after the first months (churn)','Wanachama wanaondoka baada ya miezi ya kwanza'],
  ['Monthly members not renewing at month 2 or 5; a low share of members on 6- or 12-month plans','Wanachama wa mwezi mmoja wasiohuisha mwezi wa 2 au wa 5; sehemu ndogo ya wanachama kwenye mipango ya miezi 6 au 12'],
  [`The 6-month (Gold) and 12-month (Platinum) plans are paid up front: one payment replaces 6 or 12 monthly approvals, and monthly members are invited to upgrade at months 2 and 5. Members pay 3%, 6% or 9% less than the shelf price of what is inside, with packing and doorstep delivery included, while a large online pharmacy delivers free in Dar es Salaam only above TSh 150,000. The box changes with the child’s stage, a member can pause instead of cancelling, and from launch Phase 2 members can swap between 4–5 brands until 12 days before month end. The model assumes ${churn}% of members leave each month (estimate); no retention rate is claimed until the pre-sale produces data.`,
   `Mipango ya miezi 6 (Gold) na miezi 12 (Platinum) inalipwa mapema: malipo moja yanachukua nafasi ya idhini 6 au 12 za kila mwezi, na wanachama wa mwezi mmoja wanakaribishwa kupanda mpango mwezi wa 2 na wa 5. Wanachama wanalipa 3%, 6% au 9% chini ya bei ya rafu ya vilivyomo, ufungashaji na usafirishaji hadi mlangoni ukiwemo, wakati famasia kubwa ya mtandaoni inasafirisha bure Dar es Salaam kwa oda zaidi ya TSh 150,000 pekee. Boksi linabadilika kulingana na hatua ya mtoto, mwanachama anaweza kusimamisha badala ya kufuta, na kuanzia Awamu ya 2 ya uzinduzi wanachama wanaweza kubadilisha kati ya chapa 4–5 hadi siku 12 kabla ya mwisho wa mwezi. Modeli inadhani ${churn}% ya wanachama wanaondoka kila mwezi (makadirio); hakuna kiwango cha kubaki kinachodaiwa hadi mauzo ya awali yatoe takwimu.`],
  ['afyadepot','model'],'s3-4'],
 ['dem',3,5,'com',['The store is built and stocked before demand is proven','Duka linajengwa na kujazwa bidhaa kabla mahitaji hayajathibitishwa'],
  ['Pre-sale sign-ups below target halfway through the 60 days','Usajili wa mauzo ya awali chini ya lengo katikati ya siku 60'],
  ['Demand is proven during the build with a 60-day founding-member pre-sale: the first 300 members get a lifetime discount for a refundable deposit, promoted at clinics, maternity wards and offices in Dar es Salaam. There is no online-only pilot. The deposit (TSh 10,000 proposed), the refund rule, the discount and the member cap are still to be settled and checked against consumer-protection rules. Investor money is then released against pre-sale milestones; in the model, the third tranche already needs 100 Afya Box members.',
   'Mahitaji yanathibitishwa wakati wa ujenzi kwa mauzo ya awali ya siku 60 kwa wanachama waanzilishi: wanachama 300 wa kwanza wanapata punguzo la maisha kwa amana inayorejeshwa, yakitangazwa kwenye kliniki, wodi za wazazi na ofisi Dar es Salaam. Hakuna majaribio ya mtandaoni pekee. Amana (TSh 10,000 inapendekezwa), kanuni ya kurejesha, punguzo na idadi ya juu ya wanachama bado vinapangwa na vitahakikiwa dhidi ya sheria za kumlinda mlaji. Fedha za mwekezaji zinatolewa kulingana na malengo ya mauzo ya awali; kwenye modeli, awamu ya tatu tayari inahitaji wanachama 100 wa Afya Box.'],
  ['model'],'s6-3'],
 ['dem',3,4,'ops',['Too many boxes, tiers and products at launch stretch the team and the stock','Maboksi, ngazi na bidhaa nyingi mno wakati wa uzinduzi zinaelemea timu na bidhaa'],
  ['Packing errors, stock-outs across many lines, boxes shipped late in the first months','Makosa ya ufungashaji, upungufu wa bidhaa katika aina nyingi, maboksi kuchelewa katika miezi ya kwanza'],
  ['A phased launch. Phase 1 (opening to month 6): three packages (Mama na Mtoto, Afya Men and Afya Glow), one tier each plus add-ons, fixed contents, and partner services for Mama na Mtoto only. Phase 2 (months 6–12): tiers, brand swaps, Afya Siku and Afya Kazini. Phase 3 (year 2): business and hotel kits, the nutrition shelf and a second store. The shop manager is hired two months before opening. Afya also opens with products already registered locally and moves its own TBS registrations to Phase 2. The phase details are settled with the pre-sale plan.',
   'Uzinduzi wa awamu. Awamu ya 1 (ufunguzi hadi mwezi 6): vifurushi vitatu (Mama na Mtoto, Afya Men na Afya Glow), ngazi moja kila kimoja pamoja na nyongeza, vilivyomo visivyobadilika, na huduma za washirika kwa Mama na Mtoto pekee. Awamu ya 2 (miezi 6–12): ngazi, kubadilisha chapa, Afya Siku na Afya Kazini. Awamu ya 3 (mwaka wa 2): vifurushi vya biashara na hoteli, rafu ya lishe na duka la pili. Meneja wa duka anaajiriwa miezi miwili kabla ya kufungua. Afya pia inafungua na bidhaa zilizosajiliwa tayari hapa nchini na inahamishia usajili wake wa TBS Awamu ya 2. Maelezo ya awamu yatapangwa pamoja na mpango wa mauzo ya awali.'],
  [],'s5-4'],
 ['dem',3,4,'com',['Members and walk-in visitors grow more slowly than planned','Wanachama na wateja wanaoingia dukani wanaongezeka polepole kuliko ilivyopangwa'],
  [`Fewer than ${m3} members by month 3 (the model path), or daily visitors below the model ramp (${I.store.visitors_day_start} rising to ${I.store.visitors_day_m12} a day) for four weeks in a row`,`Wanachama chini ya ${m3} kufikia mwezi 3 (njia ya modeli), au wateja wa kila siku chini ya mwelekeo wa modeli (${I.store.visitors_day_start} hadi ${I.store.visitors_day_m12} kwa siku) kwa wiki nne mfululizo`],
  [`Every free health check ends with a box offer, without sales pressure. Launch marketing (${tshM(mkt)}, estimate), clinic referral partners and a WhatsApp catalogue, with spend moved to the channels that bring visitors in. ${d.breakeven_month?`The downside case (demand 25% lower) still reaches a monthly profit in month ${d.breakeven_month}.`:'In the downside case (demand 25% lower) the store does not reach a monthly profit in year 1, so the finance triggers below apply.'}`,
   `Kila kipimo cha afya cha bure kinamalizika kwa kupendekeza boksi, bila shinikizo la mauzo. Matangazo ya uzinduzi (${tshM(mkt)}, makadirio), kliniki washirika wa rufaa na katalogi ya WhatsApp, matumizi yakihamishiwa njia zinazoleta wateja. ${d.breakeven_month?`Hali mbaya (mahitaji chini kwa 25%) bado inafikia faida ya mwezi katika mwezi wa ${d.breakeven_month}.`:'Katika hali mbaya (mahitaji chini kwa 25%) duka halifikii faida ya mwezi katika mwaka wa 1, kwa hiyo vichocheo vya fedha vilivyo hapa chini vinatumika.'}`],
  ['model'],'s5-1'],
 ['reg',3,3,'ops',['TBS product registration makes self-imported cosmetics and foods costly and slow','Usajili wa bidhaa TBS unafanya vipodozi na vyakula vinavyoingizwa na Afya yenyewe kuwa ghali na vya kuchelewa'],
  ['A product needed for a box is not registered by any local distributor','Bidhaa inayohitajika kwenye boksi haijasajiliwa na msambazaji yeyote wa ndani'],
  ['TBS charges TSh 440,000 for each cosmetic Afya imports itself (TSh 220,000 for a colour or scent variant) and TSh 800,000 for a food supplement, each valid 5 years. Decided: Afya opens with products already registered by local distributors (compliance fees about TSh 2.3 million) and moves its own registrations (about TSh 11.1 million for 20 products) to launch Phase 2. Premises registration is TSh 150,000 a year for the cosmetics shop and TSh 100,000 for the food shelf.',
   'TBS inatoza TSh 440,000 kwa kila kipodozi ambacho Afya inaingiza yenyewe (TSh 220,000 kwa aina nyingine ya rangi au harufu) na TSh 800,000 kwa kirutubisho cha chakula, kila kimoja kikidumu miaka 5. Imeamuliwa: Afya inafungua na bidhaa zilizosajiliwa tayari na wasambazaji wa ndani (ada za udhibiti takriban TSh milioni 2.3) na inahamishia usajili wake (takriban TSh milioni 11.1 kwa bidhaa 20) Awamu ya 2 ya uzinduzi. Usajili wa majengo ni TSh 150,000 kwa mwaka kwa duka la vipodozi na TSh 100,000 kwa rafu ya chakula.'],
  ['tbs_fees','tbs_cos'],'s4-5'],
 ['reg',3,4,'buy',['A shipment arrives without its PVoC certificate of conformity','Shehena inafika bila cheti chake cha ulinganifu cha PVoC'],
  ['A supplier ships before the contractor issues the certificate, or the certificate is older than three months','Msambazaji anasafirisha kabla mkandarasi hajatoa cheti, au cheti kina zaidi ya miezi mitatu'],
  [`No order ships until a TBS-appointed contractor has issued the certificate (for China: CCIC, Intertek, SGS, TÜV Rheinland or WSCT). It costs 0.5% of the factory value, at least US$250 = TSh 660,625 (${FXD} per US$, Bank of Tanzania, 10 Nov 2026), and is valid for three months. Products shipped often are registered under Route B (0.45%). Without a certificate the penalty is 15% of the invoice value, plus TSh 100,000 for inspection, 150,000 for physical verification and 30,000 in service fees, and goods that fail are returned or destroyed at the importer’s cost.`,
   `Hakuna oda inayosafirishwa kabla mkandarasi aliyeteuliwa na TBS hajatoa cheti (kwa China: CCIC, Intertek, SGS, TÜV Rheinland au WSCT). Kinagharimu 0.5% ya thamani ya kiwandani, angalau US$250 = TSh 660,625 (${FXD} kwa US$1, Benki Kuu ya Tanzania, 10 Nov 2026), na kinadumu miezi mitatu. Bidhaa zinazosafirishwa mara kwa mara zinasajiliwa chini ya Njia B (0.45%). Bila cheti adhabu ni 15% ya thamani ya ankara, pamoja na TSh 100,000 za ukaguzi, 150,000 za uhakiki wa bidhaa na 30,000 za huduma, na bidhaa zinazoshindwa zinarudishwa au kuharibiwa kwa gharama ya mwagizaji.`],
  ['pvoc','pvoc_pen','bot_fx'],'s4-2'],
 ['reg',3,4,'ops',['A device on the shelf, or the Afya Check kiosk, is not registered in the right TMDA class','Kifaa kilicho rafuni, au kioski cha Afya Check, hakijasajiliwa katika daraja sahihi la TMDA'],
  ['A supplier cannot show a TMDA registration or notification number for the exact model','Msambazaji hawezi kuonyesha namba ya usajili au taarifa ya TMDA kwa modeli husika'],
  [`Blood-pressure monitors, thermometers and pulse oximeters for routine checks are Class B and self-test glucose meters Class C. TMDA gives no “wellness” exemption, so the kiosk is a Class B device. Decided: it is bought through a TMDA-registered local dealer that holds its registration (registering it ourselves would cost US$2,500 = TSh 6,606,250, plus US$200 = TSh 528,500 a year, at ${FXD} per US$, Bank of Tanzania, 10 Nov 2026). Every device is checked on TMDA’s register before ordering, the shop holds a retail device outlet permit (TSh 100,000 a year, renewed by 30 June), and TMDA is asked in writing about the kiosk and about nappies and pads, which are on its list of products that may be devices.`,
   `Vipimo vya shinikizo la damu, vipimajoto na vipimo vya oksijeni kwa ukaguzi wa kawaida ni Daraja B na vipimo vya sukari vya kujipima ni Daraja C. TMDA haitoi msamaha wa “ustawi”, kwa hiyo kioski ni kifaa cha Daraja B. Imeamuliwa: kinanunuliwa kupitia muuzaji wa ndani aliyesajiliwa na TMDA anayemiliki usajili wake (kukisajili sisi wenyewe kungegharimu US$2,500 = TSh 6,606,250, pamoja na US$200 = TSh 528,500 kwa mwaka, kwa ${FXD} kwa US$1, Benki Kuu ya Tanzania, 10 Nov 2026). Kila kifaa kinahakikiwa kwenye rejista ya TMDA kabla ya kuagiza, duka lina kibali cha duka la rejareja la vifaa (TSh 100,000 kwa mwaka, kinahuishwa kabla ya 30 Juni), na TMDA inaulizwa kwa maandishi kuhusu kioski na kuhusu nepi na pedi, ambazo ziko kwenye orodha yake ya bidhaa zinazoweza kuwa vifaa tiba.`],
  ['tmda_comp','tmda_fees','bot_fx'],'s3-3'],
 ['reg',3,5,'ops',['A premises registration or a business licence is delayed and the store pays rent while empty','Usajili wa majengo au leseni ya biashara unachelewa na duka linalipa kodi likiwa tupu'],
  ['No inspection date six weeks after filing; repeated requests for documents','Hakuna tarehe ya ukaguzi wiki sita baada ya kuwasilisha; maombi ya mara kwa mara ya nyaraka'],
  ['Filing starts as soon as the TIN and business licence allow, with the documents each regulator lists. Rent-free fit-out months are negotiated into the lease. The stock tranche is released only when the TMDA and business licences are in hand, so investor money is not tied up in idle goods.',
   'Uwasilishaji unaanza mara TIN na leseni ya biashara zinaporuhusu, pamoja na nyaraka ambazo kila mdhibiti anaziorodhesha. Miezi ya ukarabati bila kodi inajadiliwa ndani ya mkataba wa pango. Awamu ya bidhaa inatolewa tu leseni za TMDA na za biashara zikiwa mkononi, kwa hiyo fedha za mwekezaji hazikwami kwenye bidhaa zisizouzwa.'],
  ['tmda_prem','model'],'s7-1'],
 ['reg',2,5,'ops',['A medicine is sold or handled by Afya instead of the partner pharmacy','Dawa inauzwa au kushughulikiwa na Afya badala ya famasia mshirika'],
  ['Any medicine appears in the Afya catalogue or on an Afya receipt','Dawa yoyote inaonekana kwenye katalogi ya Afya au kwenye risiti ya Afya'],
  ['Afya’s catalogue has no medicine lines. Retail premises for medicines are licensed by the Pharmacy Council, so medicines are sold only by the licensed partner pharmacy, under its own pharmacist and on its own receipt. The partner’s licence is checked every year, and the agreement is suspended the day it lapses.',
   'Katalogi ya Afya haina dawa. Majengo ya rejareja ya dawa yanapewa leseni na Baraza la Famasia, kwa hiyo dawa zinauzwa na famasia mshirika yenye leseni pekee, chini ya mfamasia wake na kwa risiti yake. Leseni ya mshirika inahakikiwa kila mwaka, na mkataba unasimamishwa siku leseni inapoisha.'],
  ['tmda_med'],'s4-5'],
 ['reg',2,4,'law',['The ownership structure is questioned under the 2025 order that reserves some trade for citizens','Muundo wa umiliki unahojiwa chini ya amri ya 2025 inayohifadhi biashara fulani kwa raia'],
  ['A foreign investor’s share is questioned by the licensing office','Hisa ya mwekezaji wa kigeni inahojiwa na ofisi ya leseni'],
  ['A written legal opinion before closing confirms how the Business Licensing (Prohibition of Business Activities for Non-Citizens) Order, 2025 applies to a specialised health-essentials store with a foreign investor. The company is Tanzanian-founded and led.',
   'Maoni ya kisheria ya maandishi kabla ya kukamilisha uwekezaji yanathibitisha jinsi Amri ya Leseni za Biashara (Marufuku ya Shughuli za Biashara kwa Wasio Raia) ya 2025 inavyohusu duka maalum la bidhaa za afya lenye mwekezaji wa kigeni. Kampuni imeanzishwa na inaongozwa na Watanzania.'],
  [],'s6-4'],
 ['pay',4,4,'ops',['Monthly payments fail, because Tanzania has no general standing-order service for mobile money','Malipo ya kila mwezi yanashindwa, kwa sababu Tanzania haina huduma ya jumla ya maagizo ya kudumu kwa pesa ya simu'],
  ['More than one request in ten unpaid by day 22; many “timeout” or “insufficient balance” replies','Zaidi ya ombi moja kati ya kumi halijalipwa kufikia siku ya 22; majibu mengi ya “muda umekwisha” au “salio halitoshi”'],
  ['The Bank of Tanzania’s 2025 payments report lists standing orders for subscriptions as a future improvement, not a service that exists. Afya therefore collects with a push request: on day 20 the member’s phone shows the amount and the member approves it with their PIN, through one aggregator that reaches every wallet. Reminders go out on days 17 and 19; a second request and an adviser’s call follow on day 22. The box waits up to 5 days; after that the membership is paused, not cancelled, with its price and points kept for 60 days. The member can always pay to the store’s Lipa Namba or, for relatives abroad, by card. Prepaid 6- and 12-month plans remove 5 or 11 monthly failure points.',
   'Ripoti ya malipo ya 2025 ya Benki Kuu ya Tanzania inataja maagizo ya kudumu kwa usajili wa huduma kama uboreshaji wa baadaye, si huduma iliyopo. Kwa hiyo Afya inakusanya kwa ombi la malipo linalotumwa kwenye simu: siku ya 20 simu ya mwanachama inaonyesha kiasi na mwanachama anaidhinisha kwa PIN yake, kupitia kampuni moja ya kuunganisha malipo inayofikia kila pochi ya simu. Vikumbusho vinatumwa siku ya 17 na 19; ombi la pili na simu kutoka kwa mshauri vinafuata siku ya 22. Boksi linasubiri hadi siku 5; baada ya hapo uanachama unasimamishwa, haufutwi, bei na pointi zake zikihifadhiwa kwa siku 60. Mwanachama anaweza kulipa wakati wowote kwa Lipa Namba ya duka au, kwa ndugu walio nje ya nchi, kwa kadi. Mipango ya miezi 6 na 12 inayolipwa mapema inaondoa nafasi 5 au 11 za malipo kushindwa kila mwezi.'],
  ['bot_nps','bot_lipa'],'s3-4'],
 ['pay',3,2,'acc',['Payment processing costs more than budgeted','Gharama za kuchakata malipo zinazidi bajeti'],
  ['The aggregator’s signed rate card is above the budgeted rate','Viwango vilivyosainiwa vya kampuni ya kuunganisha malipo viko juu ya kiwango cha bajeti'],
  ['Until a signed rate card arrives, the budget carries about TSh 2,700 for every TSh 100,000 collected (2.7%, estimate). One aggregator connection reaches all wallets, and a prepaid plan needs one transaction instead of six or twelve. A direct M-Pesa mandate is used wherever Vodacom confirms one is available to merchants.',
   'Hadi viwango vilivyosainiwa vitakapopatikana, bajeti inaweka takriban TSh 2,700 kwa kila TSh 100,000 zinazokusanywa (2.7%, makadirio). Muunganisho mmoja wa kampuni ya kuunganisha malipo unafikia pochi zote, na mpango unaolipwa mapema unahitaji muamala mmoja badala ya sita au kumi na mbili. Idhini ya moja kwa moja ya M-Pesa itatumika pale Vodacom itakapothibitisha kuwa inapatikana kwa wafanyabiashara.'],
  [],'s4-1'],
 ['ops',3,3,'lead',['The Afya Check kiosk breaks down (assumed once a year)','Kioski cha Afya Check kinaharibika (inadhaniwa mara moja kwa mwaka)'],
  ['Error codes or failed readings in the daily report; a reading outside the reference checks','Namba za hitilafu au vipimo vilivyoshindwa kwenye ripoti ya kila siku; kipimo nje ya ukaguzi wa rejea'],
  lean?['In the start-small option the kiosk is added later from the store’s own cash; until then, advisers run the check corner. When the kiosk comes, this budget applies. '+kioskEn,'Katika chaguo la kuanza kidogo kioski kinaongezwa baadaye kwa fedha za duka lenyewe; hadi hapo, washauri wanaendesha kona ya vipimo. Kioski kitakapokuja, bajeti hii itatumika. '+kioskSw]:[kioskEn,kioskSw],
  ['leka','bot_fx'],'s3-3'],
 ['rep',2,5,'lead',['An Afya Check reading is misread, or an adviser oversteps into diagnosis','Kipimo cha Afya Check kinasomwa vibaya, au mshauri anavuka mipaka hadi kutoa utambuzi'],
  ['Complaints; customers saying “the store told me I am fine”','Malalamiko; wateja wakisema “duka liliniambia niko salama”'],
  ['Scripts say a check is not a diagnosis, high readings are always referred to a clinic, devices are calibrated on a log, and professional liability cover is in place.','Maelekezo yanasema kipimo si utambuzi wa ugonjwa, vipimo vya juu vinapelekwa kliniki kila mara, vifaa vinarekebishwa na kuandikwa kwenye daftari, na bima ya dhima ya kitaaluma ipo.'],
  [],'s3-3'],
 ['sup',4,3,'buy',['A shipment from China or India is late or held at clearance','Shehena kutoka China au India inachelewa au inazuiliwa forodhani'],
  ['The supplier misses its ship date; a certificate or permit is not issued a week after applying','Msambazaji anakosa tarehe ya kusafirisha; cheti au kibali hakijatolewa wiki moja baada ya kuomba'],
  ['Six weeks of safety stock on the top 100 items, a second supplier for each, and a local wholesaler as back-up for urgent lines. Shelf life is checked before goods leave the factory: at least 50% must remain on arrival for non-food goods and 75% for food, and 60% or 80% for devices. Box demand is known in advance because members’ choices lock 12 days before month end.',
   'Akiba ya bidhaa ya wiki sita kwa bidhaa 100 zinazoongoza, msambazaji wa pili kwa kila moja, na muuzaji wa jumla wa ndani kama msaada kwa bidhaa za haraka. Muda wa matumizi unahakikiwa kabla bidhaa hazijatoka kiwandani: angalau 50% lazima ubaki zinapofika kwa bidhaa zisizo chakula na 75% kwa chakula, na 60% au 80% kwa vifaa tiba. Mahitaji ya maboksi yanajulikana mapema kwa sababu chaguo za wanachama zinafungwa siku 12 kabla ya mwisho wa mwezi.'],
  ['gn127','tmda_imp'],'s4-2'],
 ['sup',2,5,'buy',['A substandard or falsified product enters the supply chain','Bidhaa duni au bandia inaingia kwenye mnyororo wa ugavi'],
  ['Packaging differences, unusually low prices, complaints about one batch','Tofauti za vifungashio, bei za chini isivyo kawaida, malalamiko kuhusu shehena moja'],
  ['Only registered products from audited suppliers: TBS-registered cosmetics and foods, TMDA-registered devices. Batch records are kept in the system, with a recall procedure agreed with each supplier.','Bidhaa zilizosajiliwa pekee kutoka kwa wasambazaji waliokaguliwa: vipodozi na vyakula vilivyosajiliwa TBS, vifaa vilivyosajiliwa TMDA. Kumbukumbu za kila shehena zinahifadhiwa kwenye mfumo, pamoja na utaratibu wa kurudisha bidhaa uliokubaliwa na kila msambazaji.'],
  [],'s4-5'],
 ['fx',4,3,'ops',['The shilling weakens against the dollar, yuan or rupee, and landed costs rise','Shilingi inadhoofika dhidi ya dola, yuan au rupia, na gharama za bidhaa zinapofika zinapanda'],
  [`The rate moves 5% or more from ${FXD} per US$ (Bank of Tanzania mean rate, 10 Nov 2026)`,`Kiwango kinabadilika kwa 5% au zaidi kutoka ${FXD} kwa US$1 (kiwango cha wastani cha Benki Kuu ya Tanzania, 10 Nov 2026)`],
  [`Prices are reviewed every quarter together with the exchange rates, and members see the new price before renewal. Four or five brands per item let customers trade down at the same price point. The downside case already includes costs 5% higher. The model’s planning rate is TSh ${Number(I.meta.fx_usd).toLocaleString('en-US')} per US$${fxd?' ('+fxd+')':''}.`,
   `Bei zinapitiwa kila robo mwaka pamoja na viwango vya kubadilisha fedha, na wanachama wanaona bei mpya kabla ya kuhuisha. Chapa nne au tano kwa kila kitu zinawawezesha wateja kushuka chapa kwa kiwango kilekile cha bei. Hali mbaya tayari inajumuisha gharama za juu kwa 5%. Kiwango cha mipango kwenye modeli ni TSh ${Number(I.meta.fx_usd).toLocaleString('en-US')} kwa US$1${fxd?' ('+fxd+')':''}.`],
  ['bot_fx','model'],'s6-2'],
 ['fx',3,3,'buy',['Import taxes rise again','Kodi za uingizaji zinapanda tena'],
  ['The Finance Act each June changes duty, excise or port fees on our product families','Sheria ya Fedha ya kila Juni inabadilisha ushuru wa forodha, ushuru wa bidhaa au ada za bandari kwa familia zetu za bidhaa'],
  ['From 1 July 2026 the customs processing fee rose from 0.6% to 1% of the factory value and excise on skin, hair, perfume and deodorant products from 10% to 15%; import duty on these goods is 35% and VAT 18%. Landed costs are recalculated each July, shelf prices follow at the next quarterly review, and opening with locally registered products lowers direct import exposure at launch.',
   'Kuanzia 1 Julai 2026 ada ya uchakataji wa forodha ilipanda kutoka 0.6% hadi 1% ya thamani ya kiwandani na ushuru wa bidhaa kwenye bidhaa za ngozi, nywele, manukato na viondoa harufu kutoka 10% hadi 15%; ushuru wa forodha kwa bidhaa hizi ni 35% na VAT 18%. Gharama za bidhaa zinapofika zinakokotolewa upya kila Julai, bei za rafu zinafuata katika mapitio ya robo mwaka yanayofuata, na kufungua na bidhaa zilizosajiliwa hapa nchini kunapunguza utegemezi wa uingizaji wa moja kwa moja wakati wa uzinduzi.'],
  ['cpf','fa2026','glance'],'s4-2'],
 ['ops',3,3,'lead',['Top items run out, or stock expires on the shelf','Bidhaa zinazoongoza zinaisha, au bidhaa zinapitwa na muda rafuni'],
  ['Stock-outs above 2% on the top 100 items; more than 1% of stock within 90 days of expiry','Upungufu zaidi ya 2% kwa bidhaa 100 zinazoongoza; zaidi ya 1% ya bidhaa ndani ya siku 90 kabla ya kuisha muda'],
  ['Live stock by shelf, automatic reorder points, first-expiry-first-out picking and expiry alerts 90 days ahead. Box demand is known in advance because members lock their choices 12 days before month end.','Hesabu ya bidhaa ya moja kwa moja kwa kila rafu, viwango vya kuagiza tena vinavyojiendesha, kuchukua inayoisha muda kwanza, na tahadhari za kuisha muda siku 90 kabla. Mahitaji ya maboksi yanajulikana mapema kwa sababu wanachama wanafunga chaguo zao siku 12 kabla ya mwisho wa mwezi.'],
  [],'s4-3'],
 ['ops',3,3,'lead',['Same-day deliveries are missed (traffic, rain, a rider absent)','Usafirishaji wa siku hiyohiyo unakosa muda (msongamano, mvua, msafirishaji hayupo)'],
  ['On-time deliveries below 90% for a week','Usafirishaji kwa wakati chini ya 90% kwa wiki moja'],
  ['Delivery zones by rider, an order cut-off at 15:00, a partner courier on standby, and live tracking so customers are told before they have to ask. In the rainy months box deliveries move earlier in the day and collection in store is offered as the fallback.','Kanda za usafirishaji kwa kila msafirishaji, mwisho wa kupokea oda saa 9:00 alasiri, kampuni mshirika ya usafirishaji ikiwa tayari, na ufuatiliaji wa moja kwa moja ili wateja wajulishwe kabla hawajauliza. Katika miezi ya mvua usafirishaji wa maboksi unahamishiwa mapema mchana na kuchukua dukani kunatolewa kama mbadala.'],
  [],'s4-3'],
 ['tec',2,5,'ops',['Members’ data or health readings are leaked or misused','Taarifa za wanachama au vipimo vya afya vinavuja au kutumiwa vibaya'],
  ['Unusual log-ins, bulk exports, staff opening records they are not serving','Kuingia kusiko kwa kawaida, kupakua taarifa nyingi kwa mara moja, wafanyakazi kufungua kumbukumbu za watu wasiowahudumia'],
  ['Registration with the Personal Data Protection Commission, role-based access (section 7.2), every view of a reading logged, two-factor sign-in, encrypted backups and a breach-response plan. Health readings are collected only with written consent.','Usajili na Tume ya Ulinzi wa Taarifa Binafsi, ruhusa kulingana na wadhifa (sehemu 7.2), kila mara kipimo kinapoangaliwa kinarekodiwa, kuingia kwa hatua mbili, nakala za akiba zilizosimbwa na mpango wa kukabiliana na uvujaji. Vipimo vya afya vinakusanywa kwa ridhaa ya maandishi pekee.'],
  [],'s4-1'],
 ['tec',3,3,'lead',['The system or the internet goes down during trading','Mfumo au intaneti inakatika wakati wa biashara'],
  ['Payment or sync failures in the daily report','Malipo au usawazishaji unaoshindwa kwenye ripoti ya kila siku'],
  ['The till keeps selling offline and syncs later, with a backup 4G router and cash and Lipa Namba as fallbacks. Proven ready-made tools are used for the till and payments.','Mashine ya mauzo inaendelea kuuza bila mtandao na kusawazisha baadaye, ikiwa na kipanga njia cha 4G cha akiba na fedha taslimu na Lipa Namba kama mbadala. Zana zilizothibitishwa zilizo tayari zinatumika kwa mauzo na malipo.'],
  [],'s4-1'],
 ['ppl',3,3,'fnd',['The store lead or a key adviser leaves, or a physiotherapy graduate is hard to hire','Msimamizi wa duka au mshauri muhimu anaondoka, au mhitimu wa fiziotherapia ni vigumu kumwajiri'],
  ['Overtime rising, sick days, a recruitment advert open longer than six weeks','Muda wa ziada unaongezeka, siku za ugonjwa, tangazo la ajira wazi kwa zaidi ya wiki sita'],
  ['Written procedures and training in the system so a new person learns fast, fair pay with a bonus tied to store results, and a second adviser trained to step up.','Taratibu za maandishi na mafunzo ndani ya mfumo ili mtu mpya ajifunze haraka, malipo ya haki pamoja na bonasi inayofungamana na matokeo ya duka, na mshauri wa pili aliyefunzwa kuchukua nafasi.'],
  [],'s4-4'],
 ['ppl',3,4,'brd',['The founders run the business partly from India: key-person and distance risk','Waanzilishi wanaendesha biashara kwa sehemu kutoka India: hatari ya mtu muhimu na umbali'],
  ['Approvals waiting more than 24 hours; founders absent from the monthly review','Idhini zinasubiri zaidi ya saa 24; waanzilishi hawapo kwenye mapitio ya mwezi'],
  ['Delegation of authority, the daily report, a deputy with signing power in Dar es Salaam, quarterly founder visits, and key-person insurance to be considered.','Ugawaji wa mamlaka, ripoti ya kila siku, naibu mwenye mamlaka ya kusaini Dar es Salaam, ziara za waanzilishi kila robo mwaka, na bima ya mtu muhimu kuzingatiwa.'],
  [],'s7-2'],
 ['fin',4,4,'inv',['The Phase 0 gap is not funded','Pengo la Awamu 0 halijagharimiwa'],
  ['Phase 0 spending without an agreed funding source','Matumizi ya Awamu 0 bila chanzo cha fedha kilichokubaliwa'],
  [`The model puts research, travel and set-up work at ${tshM(g.research_setup_costs)} against a Phase 0 budget of ${tshM(g.phase0_budget)} (estimates), a gap of ${tshM(g.research_setup_costs-g.phase0_budget)}. How it is funded is an open item, settled with the founding-member pre-sale plan; the options under review are the pre-sale, a founders’ bridge or the first tranche. Every Phase 0 payment is recorded with a receipt in the data room.`,
   `Modeli inaweka utafiti, safari na kazi za maandalizi kwa ${tshM(g.research_setup_costs)} dhidi ya bajeti ya Awamu 0 ya ${tshM(g.phase0_budget)} (makadirio), pengo la ${tshM(g.research_setup_costs-g.phase0_budget)}. Jinsi litakavyogharimiwa ni suala lililo wazi, litakalotatuliwa pamoja na mpango wa mauzo ya awali kwa wanachama waanzilishi; machaguo yanayoangaliwa ni mauzo ya awali, mkopo wa muda kutoka kwa waanzilishi au awamu ya kwanza. Kila malipo ya Awamu 0 yanarekodiwa na risiti kwenye chumba cha nyaraka.`],
  ['model'],'s7-1'],
 ['fin',3,4,'brd',['A downside year uses up the loss budget and the reserve','Mwaka mbaya unamaliza bajeti ya hasara na akiba'],
  ['Two months below the downside revenue path','Miezi miwili chini ya njia ya mapato ya hali mbaya'],
  [`The downside year-1 result is ${dl<0?'a loss of':'a profit of'} ${tshM(Math.abs(dl))} against ${tshM(loss)} set aside for early losses and a ${tshM(res)} reserve (estimates). Triggers in the monthly pack: cut marketing, delay hiring, and agree a founder or investor bridge in advance.`,
   `Matokeo ya mwaka wa 1 katika hali mbaya ni ${dl<0?'hasara ya':'faida ya'} ${tshM(Math.abs(dl))} dhidi ya ${tshM(loss)} zilizotengwa kwa hasara za mwanzo na akiba ya ${tshM(res)} (makadirio). Vichocheo kwenye ripoti ya mwezi: kupunguza matangazo, kuchelewesha ajira, na kukubaliana mapema mkopo wa muda kutoka kwa waanzilishi au mwekezaji.`],
  ['model'],'s6-1'],
 ['fin',2,3,'acc',['Cash or mobile-money takings go missing','Mapato ya fedha taslimu au pesa ya simu yanapotea'],
  ['A cash-up mismatch above TSh 20,000; refunds without receipts','Tofauti ya hesabu ya fedha zaidi ya TSh 20,000; marejesho bila risiti'],
  ['Two-person cash-up, mobile money first (fewer notes), daily reconciliation against the system, and every refund approved and logged.','Hesabu ya fedha na watu wawili, pesa ya simu kwanza (noti chache), kulinganisha kila siku na mfumo, na kila rejesho kuidhinishwa na kurekodiwa.'],
  [],'s7-2'],
 ['rep',2,4,'ops',['A device fails at home and a customer is harmed or upset','Kifaa kinaharibika nyumbani na mteja anaumia au kukasirika'],
  ['Warranty returns above 2% for any model','Marejesho ya dhamana zaidi ya 2% kwa modeli yoyote'],
  ['Registered brands only, a written warranty, a 7-day swap, an aftercare line on WhatsApp, and a recall procedure agreed with the supplier.','Chapa zilizosajiliwa pekee, dhamana ya maandishi, kubadilishiwa ndani ya siku 7, laini ya huduma baada ya mauzo kwenye WhatsApp, na utaratibu wa kurudisha bidhaa uliokubaliwa na msambazaji.'],
  [],'s4-5'],
 ['com',4,3,'com',['Pharmacies or supermarkets copy the curated zones or undercut prices','Famasia au maduka makubwa yanaiga kanda zilizopangwa au yanashusha bei'],
  ['A competitor launches a similar health-essentials area or a monthly box','Mshindani anazindua eneo kama hili la bidhaa za afya au boksi la kila mwezi'],
  ['The defence is the combination: membership, a free health check, delivery on a fixed day and one honest price. Members stay through prepaid plans and saved baskets, and every cost is recovered in the price, so Afya does not need to win a price war.','Kinga ni mchanganyiko: uanachama, kipimo cha afya cha bure, usafirishaji siku maalum na bei moja ya uaminifu. Wanachama wanabaki kupitia mipango inayolipwa mapema na vikapu vilivyohifadhiwa, na kila gharama inarudishwa kupitia bei, kwa hiyo Afya haihitaji kushinda vita vya bei.'],
  [],'s5-3'],
 ['com',3,2,'com',['Online sellers deliver some items more cheaply','Wauzaji wa mtandaoni wanaleta baadhi ya bidhaa kwa bei nafuu zaidi'],
  ['Members asking for price matches on specific items','Wanachama wanaomba bei zilinganishwe kwa bidhaa fulani'],
  ['Afya competes on trust (registered products only), advice and a planned box, not on the price of every single item. On nappies and wipes, the lines a large online pharmacy also sells, the member price is at or below its shelf price; delivery is included at every box size, while that pharmacy delivers free in Dar es Salaam only above TSh 150,000. One price on every channel.',
   'Afya inashindana kwa uaminifu (bidhaa zilizosajiliwa pekee), ushauri na boksi lililopangwa, si kwa bei ya kila kitu kimoja. Kwa nepi na vitambaa vya mtoto, bidhaa ambazo famasia kubwa ya mtandaoni pia inauza, bei ya mwanachama ni sawa au chini ya bei yake ya rafu; usafirishaji umejumuishwa kwa kila ukubwa wa boksi, wakati famasia hiyo inasafirisha bure Dar es Salaam kwa oda zaidi ya TSh 150,000 pekee. Bei moja kwenye kila njia ya mauzo.'],
  ['afyadepot'],'s5-3']]}

/* bands: shades built only from the tokens (opacity steps of gold and green) */
const BANDS=[[15,'var(--green-edge)',0.95,['Act now (15–25)','Chukua hatua sasa (15–25)']],[10,'var(--green-edge)',0.6,['Active plan (10–14)','Mpango hai (10–14)']],[6,'var(--green)',0.75,['Watch (6–9)','Fuatilia (6–9)']],[3,'var(--green)',0.4,['Monitor (3–5)','Angalia (3–5)']],[1,'var(--green)',0.18,['Accept (1–2)','Kubali (1–2)']]];
const band=sc=>BANDS.find(b=>sc>=b[0]);
const chip=(l,i)=>{const b=band(l*i);return `<span class="ab73-sc" style="background:color-mix(in srgb, ${b[1]} ${Math.round(b[2]*100)}%, transparent);color:${b[2]>=0.5&&b[1]==='var(--green-edge)'?'var(--bg)':'var(--ink)'}">${l*i}</span>`};

const CSS=`<style>
.ab73 .ab-block>h2+*{margin-top:16px}
.ab73 .ab-block p+p,.ab73 .ab-block p+div,.ab73 .ab-block ul+p,.ab73 .ab-block div+p{margin-top:16px}
.ab73 .ab-block h3{margin-top:32px}
.ab73 .ab-block h3+*{margin-top:12px}
.ab73 .ab-block>ul,.ab73 .ab-block>h3+ul{padding-left:20px}
.ab73 .ab-block li+li{margin-top:8px}
.ab73-heat{display:grid;grid-template-columns:minmax(0,420px) 1fr;gap:32px;align-items:start}
.ab73-heat svg{width:100%;height:auto;display:block}
.ab73-cell{cursor:pointer}.ab73-cell:focus{outline:none}.ab73-cell:focus-visible rect{stroke:var(--green-edge);stroke-width:3}
.ab73-cell[aria-pressed="true"] rect{stroke:var(--ink);stroke-width:2}
.ab73-leg{list-style:none;margin:16px 0 0;padding:0;display:grid;gap:8px;font-size:var(--fs-cap);color:var(--mute)}
.ab73-leg i{display:inline-block;width:14px;height:14px;vertical-align:-2px;margin-right:8px;border:1px solid var(--line)}
.ab73-sc{display:inline-block;min-width:34px;padding:4px 8px;border-radius:999px;text-align:center;font-variant-numeric:tabular-nums}
.ab73-tools{display:flex;flex-wrap:wrap;gap:12px;align-items:center;margin-top:16px}
.ab73-tools input,.ab73-tools select{background:var(--surface);color:var(--ink);border:1px solid var(--line);border-radius:999px;padding:10px 16px;font:inherit;font-size:calc(var(--fs-body) - 2px);min-height:44px}
.ab73-tools input{flex:1 1 260px;min-width:0}
.ab73-cats{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
.ab73-cats button{border:1px solid var(--line);border-radius:999px;background:none;padding:8px 14px;cursor:pointer;font-size:var(--fs-cap);color:var(--mute);min-height:36px}
.ab73-cats button[aria-pressed="true"]{background:var(--green);border-color:var(--green);color:var(--ink)}
.ab73-reg{min-width:980px}.ab73-reg td:nth-child(2){min-width:200px}.ab73-reg td:nth-child(7){min-width:150px}.ab73-reg td:nth-child(8){min-width:340px}.ab73-reg td,.ab73-reg th{padding:12px 10px}
.ab73-reg th button{background:none;border:0;padding:0;color:var(--mute);cursor:pointer;font-size:inherit}
.ab73-reg th button[aria-sort]{color:var(--ink)}
.ab73-reg small{display:block;color:var(--mute);font-size:var(--fs-cap)}
.ab73-reg td a{font-size:var(--fs-cap)}
.ab73-top{list-style:none;padding:0;margin:16px 0 0;display:grid;gap:12px}
.ab73-top li{display:grid;grid-template-columns:auto 1fr;gap:12px;align-items:start;padding:12px 0;border-bottom:1px solid var(--line)}
@media (max-width:820px){.ab73-heat{grid-template-columns:1fr}}
</style>`;

function heatSVG(R){const counts={};R.forEach(r=>{const k=r[1]+'-'+r[2];counts[k]=(counts[k]||0)+1});
 const cs=60,ox=56,oy=8;let h='';
 [5,4,3,2,1].forEach((l,ri)=>[1,2,3,4,5].forEach((i,ci)=>{const n=counts[l+'-'+i]||0,b=band(l*i),x=ox+ci*cs,y=oy+ri*cs;
  const lab=T(`Likelihood ${l}, impact ${i}: ${n} ${n===1?'risk':'risks'}. Filter the register`,`Uwezekano ${l}, athari ${i}: hatari ${n}. Chuja rejista`);
  h+=`<g class="ab73-cell" data-l="${l}" data-i="${i}" ${n?`tabindex="0" role="button" aria-pressed="false" aria-label="${E(lab)}"`:'aria-hidden="true"'}><rect x="${x}" y="${y}" width="${cs-6}" height="${cs-6}" rx="6" style="fill:${n?b[1]:'var(--surface)'};fill-opacity:${n?b[2]:1};stroke:var(--line);stroke-width:1"/>${n?`<text x="${x+(cs-6)/2}" y="${y+(cs-6)/2+6}" text-anchor="middle" font-size="17" style="fill:${b[2]>=0.5&&b[1]==='var(--green-edge)'?'var(--bg)':'var(--ink)'}">${n}</text>`:''}</g>`}));
 [5,4,3,2,1].forEach((l,ri)=>{h+=`<text x="${ox-12}" y="${oy+ri*cs+33}" text-anchor="end" font-size="12" style="fill:var(--mute)">${l}</text>`});
 [1,2,3,4,5].forEach((i,ci)=>{h+=`<text x="${ox+ci*cs+27}" y="${oy+5*cs+16}" text-anchor="middle" font-size="12" style="fill:var(--mute)">${i}</text>`});
 h+=`<text x="${ox+2.5*cs-3}" y="${oy+5*cs+38}" text-anchor="middle" font-size="12" style="fill:var(--mute)">${E(T('Impact →','Athari →'))}</text>`;
 h+=`<text x="14" y="${oy+2.5*cs}" text-anchor="middle" font-size="12" style="fill:var(--mute)" transform="rotate(-90 14 ${oy+2.5*cs})">${E(T('Likelihood →','Uwezekano →'))}</text>`;
 return `<svg viewBox="0 0 370 360" role="group" aria-label="${E(T('Risk heat map: likelihood by impact. Select a cell to filter the register below.','Ramani ya joto ya hatari: uwezekano kwa athari. Chagua kisanduku kuchuja rejista iliyo hapa chini.'))}"><line x1="${ox-4}" y1="${oy+5*cs}" x2="${ox+5*cs}" y2="${oy+5*cs}" style="stroke:var(--line)"/><line x1="${ox-4}" y1="${oy}" x2="${ox-4}" y2="${oy+5*cs}" style="stroke:var(--line)"/>${h}</svg>`}

let ST={cat:'',cell:null,q:'',sk:'s',dir:-1};
function render(s,p,pv,nx){const M=window.MODEL,I=M.inputs,lean=A().isLean(),b=M.get('base'),d=M.get('down'),bt=M.get('best');ST={cat:'',cell:null,q:'',sk:'s',dir:-1};
 const R=risks(),n=R.length,red=R.filter(r=>r[1]*r[2]>=15).length,orange=R.filter(r=>{const x=r[1]*r[2];return x>=10&&x<15}).length,owners=new Set(R.map(r=>r[3])).size;
 const top=R.map((r,i)=>[r,i]).sort((a,c)=>c[0][1]*c[0][2]-a[0][1]*a[0][2]||c[0][2]-a[0][2]).slice(0,6);
 const use=re=>(I.seed.use.find(x=>re.test(x[0]))||[0,0])[1],loss=use(/operating losses/i),res=use(/reserve/i);
 const sc=[[T('Best','Bora'),bt],[T('Base','Msingi'),b],[T('Downside','Mbaya'),d]];
 const mo=m=>m?T(`month ${m}`,`mwezi ${m}`):T('not in year 1','si ndani ya mwaka 1');
 const signed=v=>(v<0?'−':'')+tshM(Math.abs(v));
 const cats=Object.keys(CAT).filter(k=>R.some(r=>r[0]===k));
 return `${CSS}<article class="ab-sec ab73"><div class="ab-wrap">
 <div class="ab-sec-no">${E(s.no)}</div><h1>${E(s.title)}</h1>
 <p class="ab-summary">${E(T(`The register lists ${n} risks in ${cats.length} areas, each scored for likelihood and impact, with a named owner, an early-warning sign and an answer drawn from the research. The six that matter most for a new membership store are here: members leaving, building before demand is proven, launching with too much, regulation, collecting monthly payments without standing orders, and the health-check kiosk failing. Select a cell on the map, search or sort the register.`,`Rejista inaorodhesha hatari ${n} katika maeneo ${cats.length}, kila moja ikipimwa kwa uwezekano na athari, ikiwa na mmiliki aliyetajwa, ishara ya tahadhari ya mapema na jibu linalotokana na utafiti. Sita muhimu zaidi kwa duka jipya la uanachama zimo: wanachama kuondoka, kujenga kabla mahitaji hayajathibitishwa, kuzindua na vitu vingi mno, udhibiti, kukusanya malipo ya kila mwezi bila maagizo ya kudumu, na kioski cha vipimo vya afya kuharibika. Chagua kisanduku kwenye ramani, tafuta au panga rejista.`))}</p>
 <figure class="ab-visual"><div class="ab73-heat"><div>${heatSVG(R)}</div><div>
  <p>${E(T('Each risk is scored 1–5 for likelihood and 1–5 for impact; the product (1–25) sets its shade and priority. The scores are the founders’ judgement before launch and are re-scored each quarter by the board with actual figures.','Kila hatari inapimwa 1–5 kwa uwezekano na 1–5 kwa athari; zao lake (1–25) linaamua rangi na kipaumbele chake. Alama ni maamuzi ya waanzilishi kabla ya uzinduzi na zitapimwa upya kila robo mwaka na bodi kwa takwimu halisi.'))}</p>
  <ul class="ab73-leg">${BANDS.map(x=>`<li><i style="background:color-mix(in srgb, ${x[1]} ${Math.round(x[2]*100)}%, transparent)"></i>${E(L(x[3]))}</li>`).join('')}</ul></div></div>
  <figcaption class="ab-mute" style="margin-top:12px;font-size:var(--fs-cap)">${E(T('Founder estimates of likelihood and impact, November 2026. The number in a cell is the count of risks with that score.','Makadirio ya waanzilishi ya uwezekano na athari, Novemba 2026. Namba kwenye kisanduku ni idadi ya hatari zenye alama hiyo.'))}</figcaption></figure>

 <div class="ab-body">
 <section class="ab-block" id="ab73Reg"><h2>${E(T('The full register','Rejista kamili'))}</h2>
  <div class="ab73-tools"><label class="ab-vh" for="ab73Q">${E(T('Search the risk register','Tafuta kwenye rejista ya hatari'))}</label><input id="ab73Q" type="search" placeholder="${E(T('Search risks, owners or answers (for example TBS, payment, kiosk)','Tafuta hatari, wamiliki au majibu (kwa mfano TBS, malipo, kioski)'))}">
   <label class="ab-vh" for="ab73Sort">${E(T('Sort the register','Panga rejista'))}</label><select id="ab73Sort"><option value="s">${E(T('Sort: highest score','Panga: alama ya juu kwanza'))}</option><option value="l">${E(T('Sort: likelihood','Panga: uwezekano'))}</option><option value="i">${E(T('Sort: impact','Panga: athari'))}</option><option value="o">${E(T('Sort: owner','Panga: mmiliki'))}</option><option value="n">${E(T('Sort: register number','Panga: namba ya rejista'))}</option></select>
   <button type="button" class="ab-btn" id="ab73Clear">${E(T('Clear filters','Ondoa vichujio'))}</button></div>
  <div class="ab73-cats" role="group" aria-label="${E(T('Filter by area','Chuja kwa eneo'))}"><button type="button" data-cat="" aria-pressed="true">${E(T('All areas','Maeneo yote'))}</button>${cats.map(k=>`<button type="button" data-cat="${k}" aria-pressed="false">${E(L(CAT[k]))} (${R.filter(r=>r[0]===k).length})</button>`).join('')}</div>
  <p class="ab-mute" id="ab73Count" aria-live="polite" style="margin-top:12px;font-size:var(--fs-cap)"></p>
  <div class="ab-tw"><table class="ab-t ab73-reg"><thead><tr>
   <th><button type="button" data-sk="n">#</button></th><th><button type="button" data-sk="r">${E(T('Risk','Hatari'))}</button></th><th><button type="button" data-sk="l" aria-label="${E(T('Likelihood','Uwezekano'))}">${E(T('L','U'))}</button></th><th><button type="button" data-sk="i" aria-label="${E(T('Impact','Athari'))}">${E(T('I','A'))}</button></th><th><button type="button" data-sk="s">${E(T('Score','Alama'))}</button></th><th><button type="button" data-sk="o">${E(T('Owner','Mmiliki'))}</button></th><th>${E(T('Early warning','Tahadhari ya mapema'))}</th><th>${E(T('Our answer','Jibu letu'))}</th></tr></thead>
   <tbody id="ab73Body"></tbody></table></div>
 </section>

 <section class="ab-block"><h2>${E(T('The six risks the research answers','Hatari sita ambazo utafiti unazijibu'))}</h2>
  <p>${E(T('Members leaving is the risk the whole model rests on. The answer is the number, not adjectives: members pay 3%, 6% or 9% less than the shelf price with delivery included, prepaid plans replace monthly approvals, and a member can pause instead of leaving. No retention rate is claimed until the pre-sale produces one.','Wanachama kuondoka ndiyo hatari ambayo modeli nzima imesimamia. Jibu ni namba, si maneno matamu: wanachama wanalipa 3%, 6% au 9% chini ya bei ya rafu usafirishaji ukiwemo, mipango inayolipwa mapema inachukua nafasi ya idhini za kila mwezi, na mwanachama anaweza kusimamisha badala ya kuondoka. Hakuna kiwango cha kubaki kinachodaiwa hadi mauzo ya awali yatoe kimoja.'))}</p>
  <p>${E(T('Building before demand is proven is answered by a 60-day founding-member pre-sale during the build, with investor money released against its milestones; launching with too much is answered by a phased launch with three packages first. The deposit, refund rule and phase details are still to be settled.','Kujenga kabla mahitaji hayajathibitishwa kunajibiwa na mauzo ya awali ya siku 60 kwa wanachama waanzilishi wakati wa ujenzi, fedha za mwekezaji zikitolewa kulingana na malengo yake; kuzindua na vitu vingi mno kunajibiwa na uzinduzi wa awamu wenye vifurushi vitatu kwanza. Amana, kanuni ya kurejesha na maelezo ya awamu bado vinapangwa.'))}</p>
  <p>${E(T('Regulation is now priced from the regulators’ own pages: TBS product fees, the PVoC certificate for every shipment and the TMDA class of each device. Payment collection is designed around what exists in Tanzania today, a PIN-approved push request with reminders and a pause instead of a cancellation. The kiosk carries a maintenance budget that assumes one failure a year.','Udhibiti sasa umepangiwa bei kutoka kurasa za wadhibiti wenyewe: ada za bidhaa za TBS, cheti cha PVoC kwa kila shehena na daraja la TMDA la kila kifaa. Ukusanyaji wa malipo umeundwa kulingana na kilichopo Tanzania leo, ombi la malipo linaloidhinishwa kwa PIN pamoja na vikumbusho na kusimamisha badala ya kufuta. Kioski kina bajeti ya matengenezo inayodhani hitilafu moja kwa mwaka.'))}</p>
 </section>

 <section class="ab-block"><h2>${E(T('From warning sign to board action','Kutoka ishara ya tahadhari hadi hatua ya bodi'))}</h2>
  <ol class="ab-timeline">
   <li><b>${E(T('Spot','Gundua'))}</b><span>${E(T('Each early-warning sign is built into the system as an alert; visitors below plan for four weeks, for example, shows in the daily report.','Kila ishara ya tahadhari ya mapema imewekwa kwenye mfumo kama tahadhari; kwa mfano, wateja chini ya mpango kwa wiki nne kunaonekana kwenye ripoti ya kila siku.'))}</span></li>
   <li><b>${E(T('Own','Miliki'))}</b><span>${E(T('The named owner gets the alert and has 48 hours to confirm the cause and start the planned answer.','Mmiliki aliyetajwa anapokea tahadhari na ana saa 48 kuthibitisha chanzo na kuanza jibu lililopangwa.'))}</span></li>
   <li><b>${E(T('Act','Tenda'))}</b><span>${E(T('The answer in the register is carried out, and any spending follows the delegation-of-authority limits (section 7.2).','Jibu lililo kwenye rejista linatekelezwa, na matumizi yoyote yanafuata mipaka ya ugawaji wa mamlaka (sehemu 7.2).'))}</span></li>
   <li><b>${E(T('Report','Ripoti'))}</b><span>${E(T('Every risk scored 10 or more appears in the monthly investor pack, and the board re-scores the whole register each quarter.','Kila hatari yenye alama 10 au zaidi inaonekana kwenye ripoti ya mwezi ya mwekezaji, na bodi inapima upya rejista nzima kila robo mwaka.'))}</span></li>
  </ol>
  <h3>${E(T('A worked example: a late shipment','Mfano halisi: shehena iliyochelewa'))}</h3>
  <p>${E(T('A supplier in Guangzhou tells the buyer that a shipment of blood-pressure cuffs and personal-care lines will miss its ship date. In the register this is a supply risk with a named owner, the buyer, and a written answer: six weeks of safety stock on the top 100 items, a second supplier for each, and a local wholesaler as back-up. Within 48 hours the buyer confirms the gap and places a bridging order locally with registered brands, at a higher cost. The certificate for the late shipment is checked again, because it is valid for three months only. Members’ boxes still ship on their day; the extra cost and the cause appear in the monthly pack.','Msambazaji aliyeko Guangzhou anamjulisha mnunuzi kwamba shehena ya mikanda ya kupima shinikizo la damu na bidhaa za usafi binafsi itakosa tarehe yake ya kusafirishwa. Kwenye rejista hii ni hatari ya ugavi yenye mmiliki aliyetajwa, mnunuzi, na jibu la maandishi: akiba ya bidhaa ya wiki sita kwa bidhaa 100 zinazoongoza, msambazaji wa pili kwa kila moja, na muuzaji wa jumla wa ndani kama msaada. Ndani ya saa 48 mnunuzi anathibitisha upungufu na kuweka oda ya muda hapa nchini kwa chapa zilizosajiliwa, kwa gharama ya juu zaidi. Cheti cha shehena iliyochelewa kinahakikiwa tena, kwa sababu kinadumu miezi mitatu pekee. Maboksi ya wanachama bado yanasafirishwa siku yao; gharama ya ziada na chanzo vinaonekana kwenye ripoti ya mwezi.'))}</p>
  <h3>${E(T('Highest-scored risks','Hatari zenye alama za juu zaidi'))}</h3>
  <ol class="ab73-top">${top.map(([r])=>`<li>${chip(r[1],r[2])}<div><b>${E(L(r[4]))}</b><br><span class="ab-mute">${E(L(OWN[r[3]]))}</span></div></li>`).join('')}</ol>
 </section>

 <section class="ab-block"><h2>${E(T('When risks combine','Hatari zinapoungana'))}</h2>
  <p>${E(T(`Risks tend to arrive together. A slow licence, weak demand and a weaker shilling combined look like the model’s downside case (demand 25% lower, costs 5% higher). The table compares year 1 in the three cases for the ${lean?'start-small':'flagship'} option (estimates).`,`Hatari huwa zinakuja pamoja. Leseni inayochelewa, mahitaji dhaifu na shilingi dhaifu kwa pamoja zinafanana na hali mbaya ya modeli (mahitaji chini kwa 25%, gharama juu kwa 5%). Jedwali linalinganisha mwaka wa 1 katika hali tatu kwa chaguo la ${lean?'kuanza kidogo':'duka kuu'} (makadirio).`))}</p>
  <div class="ab-tw"><table class="ab-t"><thead><tr><th>${E(T('Year 1','Mwaka wa 1'))}</th>${sc.map(x=>`<th style="text-align:right">${E(x[0])}</th>`).join('')}</tr></thead><tbody>
   <tr><td>${E(T('Revenue','Mapato'))}</td>${sc.map(x=>`<td class="ab-n">${tshM(x[1].y1.revenue)}</td>`).join('')}</tr>
   <tr><td>${E(T('Gross profit','Faida ghafi'))}</td>${sc.map(x=>`<td class="ab-n">${signed(x[1].y1.gross_profit)}</td>`).join('')}</tr>
   <tr><td>${E(T('Store profit or loss','Faida au hasara ya duka'))}</td>${sc.map(x=>`<td class="ab-n">${signed(x[1].y1.profit)}</td>`).join('')}</tr>
   <tr><td>${E(T('First month with a profit','Mwezi wa kwanza wenye faida'))}</td>${sc.map(x=>`<td class="ab-n">${E(mo(x[1].breakeven_month))}</td>`).join('')}</tr>
  </tbody></table></div>
 </section>
 </div>

 <section class="ab-block"><h2>${E(T('Key figures','Takwimu muhimu'))}</h2>
  ${A().figsHTML([
   {v:String(n),l:T(`risks registered in ${cats.length} areas, with ${owners} owner roles`,`hatari zilizosajiliwa katika maeneo ${cats.length}, zenye wamiliki ${owners}`),s:E(T('Founder estimates, November 2026','Makadirio ya waanzilishi, Novemba 2026'))},
   {v:String(red),l:T(`risks scored 15 or more (act now); ${orange} more scored 10–14 (active plan)`,`hatari zenye alama 15 au zaidi (chukua hatua sasa); nyingine ${orange} zina alama 10–14 (mpango hai)`),s:E(T('Likelihood × impact','Uwezekano × athari'))},
   {v:`${Math.round(I.members.monthly_churn*100)}% <span class="ab-est">${E(T('estimate','makadirio'))}</span>`,l:T('members assumed to leave each month','wanachama wanaodhaniwa kuondoka kila mwezi'),s:E(T('Financial model v1.2','Modeli ya fedha v1.2'))},
   {v:`${signed(d.y1.profit)} <span class="ab-est">${E(T('estimate','makadirio'))}</span>`,l:T('downside year-1 store result','matokeo ya duka mwaka wa 1 katika hali mbaya'),s:E(T('Financial model v1.2, downside case','Modeli ya fedha v1.2, hali mbaya'))}])}
 </section>

 <section class="ab-block"><h2>${E(T('What this costs','Gharama yake'))}</h2>
  <p>${E(T(`What the seed sets aside against a bad first year, in the ${lean?'start-small':'flagship'} option (estimates).`,`Kile ambacho mtaji wa awali unatenga dhidi ya mwaka wa kwanza mbaya, katika chaguo la ${lean?'kuanza kidogo':'duka kuu'} (makadirio).`))}</p>
  <div class="ab-tw"><table class="ab-t"><thead><tr><th>${E(T('Line','Kipengele'))}</th><th style="text-align:right">TSh</th></tr></thead><tbody>
   <tr><td>${E(T('Set aside for operating losses until break-even','Kilichotengwa kwa hasara za uendeshaji hadi kufikia faida'))}</td><td class="ab-n">${tsh(loss)}</td></tr>
   <tr><td>${E(T('Working-capital reserve','Akiba ya mtaji wa kazi'))}</td><td class="ab-n">${tsh(res)}</td></tr>
   <tr><td>${E(T('Downside year-1 store result','Matokeo ya duka mwaka wa 1 katika hali mbaya'))}</td><td class="ab-n">${(d.y1.profit<0?'−':'')+tsh(Math.abs(d.y1.profit))}</td></tr>
   <tr><td><b>${E(d.y1.profit+loss+res>=0?T('Left after a downside year','Kinachobaki baada ya mwaka mbaya'):T('Shortfall after a downside year','Upungufu baada ya mwaka mbaya'))}</b></td><td class="ab-n">${tsh(Math.abs(d.y1.profit+loss+res))}</td></tr>
   <tr><td>${E(T('Kiosk maintenance a year, one failure assumed','Matengenezo ya kioski kwa mwaka, hitilafu moja ikidhaniwa'))}${lean?' '+E(T('(once the kiosk is added)','(kioski kikishaongezwa)')):''} <span class="ab-est">${E(T('estimate','makadirio'))}</span></td><td class="ab-n">1,900,000–4,800,000</td></tr>
   <tr><td>${E(T('Payment processing per TSh 100,000 collected','Uchakataji wa malipo kwa kila TSh 100,000 zinazokusanywa'))} <span class="ab-est">${E(T('estimate','makadirio'))}</span></td><td class="ab-n">2,700</td></tr>
  </tbody></table></div>
  <p class="ab-mute" style="margin-top:12px;font-size:var(--fs-cap)">${E(T('The loss line and the reserve come from the seed allocation in the model. The year-1 result is at store level, before head office and tax. A shortfall is why the cost triggers and a pre-agreed bridge sit in the register.','Mstari wa hasara na akiba vinatoka kwenye mgawanyo wa mtaji wa awali kwenye modeli. Matokeo ya mwaka wa 1 ni ya kiwango cha duka, kabla ya ofisi kuu na kodi. Upungufu ndio sababu vichocheo vya kupunguza gharama na mkopo wa muda uliokubaliwa mapema vimo kwenye rejista.'))}</p>
 </section>

 ${A().openHTML([
  E(T('The likelihood and impact scores are founder estimates before launch; the board re-scores them each quarter with actual figures.','Alama za uwezekano na athari ni makadirio ya waanzilishi kabla ya uzinduzi; bodi itazipima upya kila robo mwaka kwa takwimu halisi.')),
  E(T('The pre-sale terms (deposit, refund rule, lifetime discount, member cap) and the phase details are still to be settled and checked against consumer-protection rules.','Masharti ya mauzo ya awali (amana, kanuni ya kurejesha, punguzo la maisha, idadi ya juu ya wanachama) na maelezo ya awamu bado yanapangwa na yatahakikiwa dhidi ya sheria za kumlinda mlaji.')),
  E(T('Churn by plan and the renewal rate have not been measured; the model’s monthly churn is an assumption.','Kiwango cha wanachama kuondoka kwa kila mpango na kiwango cha kuhuisha bado havijapimwa; kiwango cha kila mwezi kwenye modeli ni dhana.')),
  E(T('Payment fees are not yet in a signed rate card, and whether Vodacom offers an M-Pesa mandate to merchants is still to be confirmed.','Ada za malipo bado hazijawekwa kwenye viwango vilivyosainiwa, na kama Vodacom inatoa idhini ya M-Pesa kwa wafanyabiashara bado kuthibitishwa.')),
  E(T('Kiosk prices and warranty terms are listing figures until three written quotes arrive; the maintenance budget is an estimate.','Bei na masharti ya dhamana ya kioski ni takwimu za matangazo hadi nukuu tatu za maandishi zitakapopatikana; bajeti ya matengenezo ni makadirio.')),
  E(T('TMDA’s written view on the kiosk class and on nappies and pads, and a legal opinion on the 2025 order for non-citizens, are still to come.','Maoni ya maandishi ya TMDA kuhusu daraja la kioski na kuhusu nepi na pedi, na maoni ya kisheria kuhusu amri ya 2025 kwa wasio raia, bado yanasubiriwa.')),
  E(T('The member price is compared with a large online pharmacy on nappies and wipes only; a second benchmark (Shoppers Supermarket) is still to be collected.','Bei ya mwanachama imelinganishwa na famasia kubwa ya mtandaoni kwa nepi na vitambaa vya mtoto pekee; kigezo cha pili cha ulinganisho (Shoppers Supermarket) bado kukusanywa.'))])}

 ${A().sourcesHTML(SRCKEYS.map(k=>({t:L(SRC[k]),u:SRC[k][2],chk:SRC[k][2]?CHK:''})))}
 ${A().pagerHTML(pv,nx)}
 </div></article>`}

function draw(){const body=document.getElementById('ab73Body');if(!body)return;const R=risks();
 let rows=R.map((r,i)=>({r,n:i+1}));
 const txt=r=>[L(CAT[r[0]]),L(r[4]),L(OWN[r[3]]),L(r[5]),L(r[6])].join(' ').toLowerCase();
 rows=rows.filter(x=>(!ST.cat||x.r[0]===ST.cat)&&(!ST.cell||(x.r[1]===ST.cell[0]&&x.r[2]===ST.cell[1]))&&(!ST.q||txt(x.r).indexOf(ST.q)>=0));
 const key={n:x=>x.n,r:x=>L(x.r[4]),l:x=>x.r[1]*10+x.r[2],i:x=>x.r[2]*10+x.r[1],s:x=>x.r[1]*x.r[2]*10+x.r[2],o:x=>L(OWN[x.r[3]])}[ST.sk];
 rows.sort((a,b)=>{const p=key(a),q=key(b);return ((p>q?1:p<q?-1:0)*ST.dir)||(a.n-b.n)});
 const door=id=>{const t=(typeof ALL!=='undefined'?ALL:[]).find(z=>z.id===id);return t?`<a href="#${t.id}">${E(t.no)} ${E(t.title)} →</a>`:''};
 const srcs=k=>k.length?`<small>${E(T('Source','Chanzo'))}: ${k.map(x=>SRC[x][2]?`<a href="${E(SRC[x][2])}" target="_blank" rel="noopener">${E(SHORT[x]?L(SHORT[x]):L(SRC[x]).split(':')[0])}</a>`:E(T('financial model','modeli ya fedha'))).join(', ')}${k.some(x=>SRC[x][2])?' · '+E(T('checked','imekaguliwa'))+' '+CHK:''}</small>`:'';
 body.innerHTML=rows.map(x=>`<tr><td>${x.n}</td><td><small>${E(L(CAT[x.r[0]]))}</small><b>${E(L(x.r[4]))}</b><br>${door(x.r[8])}</td><td>${x.r[1]}</td><td>${x.r[2]}</td><td>${chip(x.r[1],x.r[2])}</td><td>${E(L(OWN[x.r[3]]))}</td><td>${E(L(x.r[5]))}</td><td>${E(L(x.r[6]))}${srcs(x.r[7])}</td></tr>`).join('')||`<tr><td colspan="8">${E(T('No risks match these filters.','Hakuna hatari zinazolingana na vichujio hivi.'))}</td></tr>`;
 const c=document.getElementById('ab73Count');if(c)c.textContent=T(`Showing ${rows.length} of ${R.length} risks`,`Zinaonyeshwa hatari ${rows.length} kati ya ${R.length}`)+(ST.cat?' · '+L(CAT[ST.cat]):'')+(ST.cell?' · '+T(`likelihood ${ST.cell[0]} × impact ${ST.cell[1]}`,`uwezekano ${ST.cell[0]} × athari ${ST.cell[1]}`):'')+(ST.q?` · “${ST.q}”`:'');
 document.querySelectorAll('.ab73-cell[role="button"]').forEach(g=>g.setAttribute('aria-pressed',String(!!ST.cell&&+g.dataset.l===ST.cell[0]&&+g.dataset.i===ST.cell[1])));
 document.querySelectorAll('.ab73-cats [data-cat]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.cat===ST.cat)));
 const sel=document.getElementById('ab73Sort');if(sel&&sel.querySelector(`option[value="${ST.sk}"]`))sel.value=ST.sk;
 document.querySelectorAll('.ab73-reg th button').forEach(b=>{if(b.dataset.sk===ST.sk)b.setAttribute('aria-sort',ST.dir===1?'ascending':'descending');else b.removeAttribute('aria-sort')})}

function init(){if(!document.getElementById('ab73Body'))return;
 document.querySelectorAll('.ab73-cell[role="button"]').forEach(g=>{const fn=()=>{const l=+g.dataset.l,i=+g.dataset.i;ST.cell=(ST.cell&&ST.cell[0]===l&&ST.cell[1]===i)?null:[l,i];draw()};
  g.addEventListener('click',fn);g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();fn()}})});
 document.querySelectorAll('.ab73-cats [data-cat]').forEach(b=>b.addEventListener('click',()=>{ST.cat=b.dataset.cat;draw()}));
 const q=document.getElementById('ab73Q');if(q)q.addEventListener('input',()=>{ST.q=q.value.trim().toLowerCase();draw()});
 const cl=document.getElementById('ab73Clear');if(cl)cl.addEventListener('click',()=>{ST.cat='';ST.cell=null;ST.q='';if(q)q.value='';draw()});
 const sel=document.getElementById('ab73Sort');if(sel)sel.addEventListener('change',()=>{ST.sk=sel.value;ST.dir=(ST.sk==='o'||ST.sk==='n')?1:-1;draw()});
 document.querySelectorAll('.ab73-reg th button').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.sk;if(ST.sk===k)ST.dir=-ST.dir;else{ST.sk=k;ST.dir=(k==='r'||k==='o'||k==='n')?1:-1}draw()}));
 draw()}

window.SECTIONS['s7-3']={render,init,v2:true};
})();
