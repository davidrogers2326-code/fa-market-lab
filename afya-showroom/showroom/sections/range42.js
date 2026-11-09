/* Section 4.2 · Sourcing and supply. Built from r42/*.js by r42/build.sh */
(function(){
/* 4.2 helpers, researched facts and every chapter's words (English · Kiswahili) */
const lang=()=>window.AFYA_LANG==='sw'?1:0;
const T=(e,s)=>lang()?s:e;
const L=a=>Array.isArray(a)?(a[lang()]||a[0]):a;
const E=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const NF=n=>Math.round(n).toLocaleString('en-US');
const TS=n=>'TSh '+NF(n);
const TM=n=>'TSh '+(n/1e6).toFixed(Math.abs(n)>=1e7?0:1)+'M';
const IM=k=>`img/e2/${k}.webp`;
const FX=2644.05;
const ARW='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 8h10M9 4l4 4-4 4"/></svg>';
const PLY='<svg viewBox="0 0 16 16" fill="currentColor"><path d="M4 2.5v11l9-5.5z"/></svg>';

/* ---------- master model ---------- */
const MM=(()=>{const o={stock:30000000,gm:.32,cogs1:17081686,cogs12:92697071};try{const M=window.MODEL,I=M.inputs,b=M.get('base');o.stock=I.seed.use.find(x=>/stock/i.test(x[0]))[1];o.gm=I.store.retail_gm||.32;const a=b.months[0],z=b.months[11];o.cogs1=a.revenue-a.gross_profit;o.cogs12=z.revenue-z.gross_profit}catch(e){}return o})();

/* ---------- sources ---------- */
const SRC=[
 ['TMDA: Import and export control of medical devices (premises registered first; apply at least 6 weeks before shipment; 7-day processing; minimum shelf life 60% or 80% on arrival)','https://www.tmda.go.tz/pages/import-and-export-control-of-medical-devices'],
 ['TMDA: Import and export control of medicines (who may import medicines; permit before loading)','https://www.tmda.go.tz/pages/import-and-export-control'],
 ['TMDA: Fees and Charges (Amendment) Regulations, June 2024 (import fee 2% of FOB on medicines and devices; device registration US$500–2,500; retention US$200 a year; importing-warehouse permit TSh 300,000; retail device outlet TSh 100,000; consignment inspection TSh 100,000)','https://www.tmda.go.tz/uploads/1718887575-FEES%20AND%20CHARGES%20AMENDMENT%20JUNE%202024%20FINAL.pdf'],
 ['Tanzania Revenue Authority: Taxes and Duties at a Glance 2025/2026 (duty bands 0/10/25/35%; Railway Development Levy 2% of CIF; Customs Processing Fee 0.6% of FOB; VAT on imports 18%)','https://www.tra.go.tz/images/uploads/pages/TAXES_AND_DUTIES_AT_A_GLANCE_2025_2026.pdf'],
 ['OMC Medical: Tanzania medical device registration (Classes A–D; about 90 days for Class A and 240 days for B–D; local authorised representative; 5-year licence)','https://omcmedical.com/tanzania'],
 ['Tanzania Bureau of Standards: Imports Registration and Batch Certification Regulations, 2021','https://www.tbs.go.tz/uploads/publications/en-1635244995-The%20Standards%20(%20Imports%20Registration%20And%20Batch%20Certification)%20Regulations,%202021.pdf'],
 ['News Central, 30 August 2019: Tanzania shifts cosmetics regulation to the standards bureau (TBS)','https://newscentraltv.com/?p=20889'],
 ['TÜV Rheinland: Tanzania Pre-Shipment Verification of Conformity (PVoC) — Certificate of Conformity for regulated categories','https://www.tuv.com/landingpage/en/government-inspections-international-trade/navigation/pvoc/exporting-to-africa/tanzania-pre-shipment-verification-of-conformity-pvoc/'],
 ['WHO, 28 November 2017: 1 in 10 medical products in low- and middle-income countries is substandard or falsified','https://www.who.int/news/item/28-11-2017-1-in-10-medical-products-in-developing-countries-is-substandard-or-falsified'],
 ['Great Hensen: South and East Africa container rates, July 2026 (China main ports to Dar es Salaam: 20ft US$2,100–2,600; 40ft US$3,700–4,600)','https://www.greathensen.com/en/guide/south-east-africa-shipping-rates.html'],
 ['Sino-Shipping: freight from China to Tanzania, June 2026 (LCL US$102 per CBM; 20ft US$3,068–3,824; sea 22–28 days FCL, 36–48 days LCL; indicative)','https://www.sino-shipping.com/freight-shipping-from-china-to-tanzania/'],
 ['5688.cn: LCL sailings to Dar es Salaam, August–September 2026 (e.g. ONE Shenzhen direct US$111 per CBM, 30 days; minimum 0.5 CBM)','https://www.5688.cn/en/lcl/tzdar.html'],
 ['DP World: India–Africa trade lane (Nhava Sheva to Dar es Salaam 10–14 days; Mundra 16–18 days)','https://www.dpworld.com/en/routes/india-africa-trade-lane'],
 ['Alibaba.com: upper-arm automatic blood-pressure monitors, CE-marked OEM listing US$9.90–11.70 per unit','https://www.alibaba.com/discover/measuring-bpm.html'],
 ['Sofeast / QualityInspection.org: cost of a quality inspection in China (US$299 per inspector-day)','https://qualityinspection.org/inspection-china-cost/'],
 ['Jing Sourcing: how to pay Chinese suppliers (30% deposit / 70% before shipping is standard; international wire US$40–80; Alibaba buyer processing about 2.99%)','https://jingsourcing.com/b-alibaba-payment/'],
 ['FEAFFA, 2026: Tanzania sets minimum fees for clearing and forwarding agents (TASAC order, Government Gazette No. 83, 20 March 2026)','https://magazine.feaffa.com/tanzania-sets-minimum-fees-for-clearing-and-forwarding-agents-to-regulate-industry-pricing/'],
 ['PharmChoices: list of medical equipment suppliers in Tanzania (Dar es Salaam entries incl. Reno Distributors, Pacific Diagnostic, NajRam)','https://pharmchoices.com/list-of-medical-equipment-suppliers-in-tanzania-2/3/'],
 ['CurrencyBeacon: USD to TZS, 2 November 2026 (about TSh 2,644 per US$)','https://www.currencybeacon.com/rates/USD/TZS']];
const SN=k=>{let i=SRC.findIndex(s=>s[1].endsWith(k));if(i<0)i=SRC.findIndex(s=>s[1].includes(k));return i+1};
const C=k=>`<sup class="ci"><a href="#e2-src" data-jump="e2-src">${SN(k)}</a></sup>`;

const CH=[['e2-why',['Why','Kwa nini']],['e2-trip',['One pack’s journey','Safari ya pakiti']],['e2-lanes',['Where we buy','Tunanunua wapi']],['e2-phase',['Phases','Awamu']],['e2-land',['Landed cost','Gharama halisi']],['e2-reo',['Reorder','Kuagiza upya']],['e2-gate',['Quality gates','Milango ya ubora']],['e2-law',['Permits and law','Vibali na sheria']],['e2-team',['Team and rhythm','Timu na mpangilio']],['e2-cash',['Stock and cash','Stoku na pesa']],['e2-risk',['Risks','Hatari']]];

/* ---------- chapter 2 · one pack’s journey ---------- */
const SALE=[
 {img:'factory',t:['Day 0','Siku 0'],h:['The order','Oda'],s:['A validated design, made to our specification.','Muundo uliothibitishwa, unaotengenezwa kwa vipimo vyetu.'],
  p:['The buyer signs a purchase order for 200 upper-arm blood-pressure monitors with a factory that holds ISO 13485 and a CE mark, and pays a 30% deposit. The order states the model, the cuff sizes, Kiswahili and English labels, batch numbering and the minimum shelf life we will accept.','Mnunuzi anasaini oda ya ununuzi ya mashine 200 za presha za mkono wa juu na kiwanda chenye ISO 13485 na alama ya CE, na analipa amana ya 30%. Oda inataja modeli, saizi za kafu, lebo za Kiswahili na Kiingereza, namba za kundi na muda wa chini wa matumizi tutakaoukubali.'],
  w:[['purchase order PO-0041 · 200 units · US$10.80 FOB','deposit 30% paid by bank transfer','production slot booked · 30 days'],['oda PO-0041 · vipande 200 · US$10.80 FOB','amana 30% imelipwa kwa benki','nafasi ya uzalishaji · siku 30']]},
 {img:'qc',t:['Day 30','Siku 30'],h:['The inspection','Ukaguzi'],s:['Nothing ships until an independent inspector says yes.','Hakuna kinachosafirishwa hadi mkaguzi huru akubali.'],
  p:['An independent inspector visits the factory for a day. Random cartons are opened; units are tested against a calibrated reference gauge; labels, batch numbers and expiry dates are checked against the order. Only a passed report releases the 70% balance.','Mkaguzi huru anatembelea kiwanda kwa siku moja. Katoni za kubahatisha zinafunguliwa; mashine zinajaribiwa dhidi ya kipimo cha marejeo kilichosawazishwa; lebo, namba za kundi na tarehe za kuisha zinakaguliwa dhidi ya oda. Ripoti iliyopita tu ndiyo inaruhusu salio la 70% kulipwa.'],
  w:[['inspection report · 80 units tested · pass','batch MB-2611 · expiry 08/2029','balance 70% released'],['ripoti ya ukaguzi · mashine 80 zimejaribiwa · imepita','kundi MB-2611 · inaisha 08/2029','salio 70% limeruhusiwa']]},
 {img:'load',t:['Day 34','Siku 34'],h:['The port','Bandari'],s:['Our cartons share a container with other importers.','Katoni zetu zinashiriki kontena na waagizaji wengine.'],
  p:['Two hundred monitors fill about 0.64 cubic metres, far less than a container, so they travel as less-than-container-load: we pay only for our space, around US$111 per cubic metre from Shenzhen. The freight forwarder issues the bill of lading, the document that proves the goods are ours.','Mashine mia mbili zinajaza takriban mita za ujazo 0.64, chini sana ya kontena, kwa hiyo zinasafiri kama mzigo pungufu wa kontena: tunalipa nafasi yetu tu, takriban US$111 kwa mita ya ujazo kutoka Shenzhen. Wakala wa usafirishaji anatoa hati ya mzigo, hati inayothibitisha bidhaa ni zetu.'],
  w:[['LCL · 0.64 CBM · Shenzhen → Dar es Salaam','bill of lading issued','TMDA import permit approved (applied week 1)'],['LCL · CBM 0.64 · Shenzhen → Dar es Salaam','hati ya mzigo imetolewa','kibali cha TMDA cha kuingiza kimeidhinishwa (kiliombwa wiki ya 1)']]},
 {img:'sea',t:['Days 36–70','Siku 36–70'],h:['The sea','Bahari'],s:['Thirty to forty days at sea, tracked every day.','Siku thelathini hadi arobaini baharini, zikifuatiliwa kila siku.'],
  p:['The ship crosses the Indian Ocean. The purchase order in our system now shows “in transit” with an expected arrival date, and that date feeds the reorder engine, so the store never sells its last monitor while the next batch is still at sea.','Meli inavuka Bahari ya Hindi. Oda ya ununuzi kwenye mfumo wetu sasa inaonyesha “safarini” pamoja na tarehe inayotarajiwa ya kufika, na tarehe hiyo inaingia kwenye injini ya kuagiza, ili duka lisiuze mashine yake ya mwisho wakati kundi linalofuata bado liko baharini.'],
  w:[['status · in transit · ETA day 70','marine insurance 0.5% of value','reorder engine counts 200 units on the way'],['hali · safarini · inafika siku 70','bima ya bahari 0.5% ya thamani','injini ya kuagiza inahesabu vipande 200 vilivyo njiani']]},
 {img:'clear',t:['Days 70–78','Siku 70–78'],h:['Customs','Forodha'],s:['Every shilling of tax paid, every permit shown.','Kila shilingi ya kodi inalipwa, kila kibali kinaonyeshwa.'],
  p:['A licensed clearing agent lodges the customs declaration with the TMDA permit, the invoice, the packing list and the bill of lading. We pay import duty, the 2% Railway Development Levy, the 0.6% Customs Processing Fee, TMDA’s 2% import fee and 18% import VAT, which we reclaim. The consignment can then be released.','Wakala wa forodha mwenye leseni anawasilisha tamko la forodha pamoja na kibali cha TMDA, ankara, orodha ya mzigo na hati ya mzigo. Tunalipa ushuru wa forodha, tozo ya Maendeleo ya Reli 2%, ada ya Uchakataji wa Forodha 0.6%, ada ya TMDA ya kuingiza 2% na VAT ya uagizaji 18%, ambayo tunairudisha. Kisha mzigo unaruhusiwa kutoka.'],
  w:[['customs declaration lodged by licensed agent','duty, levies, TMDA fee and VAT paid','release order issued'],['tamko la forodha limewasilishwa na wakala mwenye leseni','ushuru, tozo, ada ya TMDA na VAT vimelipwa','amri ya kutolewa imetolewa']]},
 {img:'recv',t:['Day 80','Siku 80'],h:['The hub','Kituo'],s:['Counted, dated and scanned before anyone can sell it.','Inahesabiwa, inatiwa tarehe na kuchanganuliwa kabla mtu hajaiuza.'],
  p:['At the hub the cartons are checked against the purchase order. A sample from the batch is opened and tested again, the expiry date is checked against TMDA’s minimum shelf-life rule, and every unit is scanned in. Until the batch passes, the till refuses its barcode.','Kituoni katoni zinakaguliwa dhidi ya oda ya ununuzi. Sampuli ya kundi inafunguliwa na kujaribiwa tena, tarehe ya kuisha inakaguliwa dhidi ya kanuni ya TMDA ya muda wa chini wa matumizi, na kila kipande kinachanganuliwa kuingia. Hadi kundi lipite, mashine ya mauzo inakataa msimbopau wake.'],
  w:[['goods received · 200 of 200','shelf life 92% on arrival · rule 60%','batch released to the till'],['bidhaa zimepokelewa · 200 kati ya 200','muda wa matumizi 92% ulipofika · kanuni 60%','kundi limeruhusiwa kwenye mauzo']]},
 {img:'shelf',t:['Day 82','Siku 82'],h:['The shelf','Rafu'],s:['A price set from the true cost, not a guess.','Bei inayowekwa kutoka gharama halisi, si kubahatisha.'],
  p:['The landed cost of each monitor is now known to the shilling, so its shelf price is set with the 32% retail margin and one honest price including VAT. Each unit carries its batch, so if TMDA or the factory ever recalls it, we know exactly who bought one.','Gharama halisi ya kila mashine sasa inajulikana hadi shilingi, kwa hiyo bei yake ya rafuni inawekwa kwa faida ya rejareja ya 32% na bei moja ya wazi ikiwemo VAT. Kila kipande kinabeba kundi lake, kwa hiyo TMDA au kiwanda kikiwahi kuirudisha, tunajua hasa nani alinunua.'],
  w:[['landed cost per unit calculated','shelf price set · 32% margin · VAT included','every unit traceable: batch → supplier → buyer'],['gharama halisi kwa kipande imehesabiwa','bei ya rafuni imewekwa · faida 32% · VAT imejumuishwa','kila kipande kinafuatilika: kundi → msambazaji → mnunuzi']]}];

/* ---------- chapter 3 · lanes ---------- */
const LANES=[
 {k:['China','China'],img:'factory',what:['Home medical devices (blood-pressure monitors, thermometers, nebulisers, glucometers), hygiene goods, packaging and our own box materials.','Vifaa vya afya vya nyumbani (mashine za presha, vipimajoto, nebulaiza, glukomita), bidhaa za usafi, vifungashio na vifaa vya box zetu.'],
  why:['China makes most of the world’s home medical devices at every quality level. We buy only clinically validated models from factories with ISO 13485, test samples before ordering, and inspect every shipment.','China inatengeneza vifaa vingi vya afya vya nyumbani duniani kwa kila kiwango cha ubora. Tunanunua modeli zilizothibitishwa kitabibu tu kutoka viwanda vyenye ISO 13485, tunajaribu sampuli kabla ya kuagiza, na kukagua kila mzigo.'],
  ship:['Shared container: about US$102–163 per cubic metre, 30–48 days. Full 20ft container: about US$2,100–3,800, 22–28 days.','Kontena la pamoja: takriban US$102–163 kwa mita ya ujazo, siku 30–48. Kontena kamili la futi 20: takriban US$2,100–3,800, siku 22–28.'],src:['greathensen','sino-shipping','5688'],lead:84},
 {k:['India','India'],img:'qc',what:['Sterile dressings and gauze, and registered diagnostic test kits. No medicines.','Bandeji na shashi tasa, pamoja na vifaa vya vipimo vilivyosajiliwa. Hakuna dawa.'],
  why:['India is a leading maker of dressings and diagnostics, and the sea route is short. Afya Basics does not import medicines at any stage; they always come from licensed Tanzanian wholesalers.','India ni mtengenezaji mkubwa wa bandeji na vipimo, na njia ya bahari ni fupi. Afya Basics haiagizi dawa kutoka nje katika hatua yoyote; dawa zote zinatoka kwa wauzaji wa jumla wa Tanzania wenye leseni.'],
  ship:['Nhava Sheva to Dar es Salaam 10–14 days at sea; Mundra 16–18 days. Rates by forwarder quotation.','Nhava Sheva hadi Dar es Salaam siku 10–14 baharini; Mundra siku 16–18. Bei kwa nukuu ya wakala.'],src:['dpworld'],lead:45},
 {k:['Licensed Tanzanian wholesalers','Wauzaji wa jumla wa Tanzania wenye leseni'],img:'recv',what:['Every regulated item at launch, fast movers that sell daily, all medicines the store may sell, and emergency top-ups.','Kila bidhaa inayodhibitiwa mwanzoni, bidhaa zinazouzwa kila siku, dawa zote ambazo duka linaruhusiwa kuuza, na kujaza kwa dharura.'],
  why:['Goods bought locally are already registered and cleared, so they are legal on our shelf from day one. The margin is lower than importing, but the risk and the cash tied up are far smaller.','Bidhaa zinazonunuliwa ndani tayari zimesajiliwa na kutolewa forodhani, kwa hiyo ni halali rafuni kwetu tangu siku ya kwanza. Faida ni ndogo kuliko kuagiza, lakini hatari na pesa zinazofungwa ni ndogo sana.'],
  ship:['Delivered in 1–7 days. Candidates for due diligence include Reno Distributors (Kariakoo), Pacific Diagnostic (Mikocheni) and NajRam (Kariakoo); none has been approached yet.','Inafikishwa ndani ya siku 1–7. Wanaofaa kuchunguzwa ni pamoja na Reno Distributors (Kariakoo), Pacific Diagnostic (Mikocheni) na NajRam (Kariakoo); hakuna aliyefikiwa bado.'],src:['pharmchoices'],lead:7}];

/* ---------- chapter 4 · phases ---------- */
const PHS=[
 {k:['Phase 1','Awamu 1'],t:['Launch','Uzinduzi'],h:['Buy locally, learn demand','Nunua ndani, jifunze mahitaji'],d:['Every regulated product comes from licensed Tanzanian importers and wholesalers. Two suppliers per key item. The till records exactly what sells, by day and by brand, which is the data we need before importing anything.','Kila bidhaa inayodhibitiwa inatoka kwa waagizaji na wauzaji wa jumla wa Tanzania wenye leseni. Wasambazaji wawili kwa kila bidhaa muhimu. Mashine ya mauzo inarekodi hasa kinachouzwa, kwa siku na kwa chapa, ambazo ndizo taarifa tunazohitaji kabla ya kuagiza chochote.']},
 {k:['Phase 2','Awamu 2'],t:['From store 2','Kuanzia duka la 2'],h:['Import the proven lines','Agiza bidhaa zilizothibitishwa'],d:['The packing hub is registered with TMDA as an importing warehouse (permit TSh 300,000). Devices and non-medicine goods that sell steadily, and own-brand box materials, are bought direct from validated factories in China and India. Local wholesalers stay as second source.','Kituo cha kufungia kinasajiliwa TMDA kama ghala la kuagiza (kibali TSh 300,000). Vifaa na bidhaa zisizo dawa zinazouzwa kwa uthabiti, na vifaa vya box vya chapa yetu, vinanunuliwa moja kwa moja kutoka viwanda vilivyothibitishwa China na India. Wauzaji wa jumla wa ndani wanabaki kama chanzo cha pili.']},
 {k:['Phase 3','Awamu 3'],t:['Seven stores and more','Maduka saba na zaidi'],h:['Consolidate and negotiate','Unganisha na jadiliana'],d:['Orders for all stores are combined into full containers, which costs less per unit than shared space, and annual supply agreements with the best factories fix prices for twelve months.','Oda za maduka yote zinaunganishwa kuwa makontena kamili, ambayo yanagharimu kidogo kwa kipande kuliko nafasi ya pamoja, na mikataba ya mwaka ya ugavi na viwanda bora inafunga bei kwa miezi kumi na miwili.']}];

/* ---------- chapter 7 · gates ---------- */
const GATES=[
 [['Registered','Imesajiliwa'],['The product is registered or notified with TMDA (devices, medicines) or certified by TBS (cosmetics). Not registered, not stocked.','Bidhaa imesajiliwa au kuarifiwa TMDA (vifaa, dawa) au imethibitishwa na TBS (vipodozi). Haijasajiliwa, haiwekwi.']],
 [['Supplier vetted','Msambazaji amechunguzwa'],['Factory licence, ISO 13485 for devices, export record and references; a video or in-person audit before the first order.','Leseni ya kiwanda, ISO 13485 kwa vifaa, rekodi ya kuuza nje na marejeo; ukaguzi kwa video au ana kwa ana kabla ya oda ya kwanza.']],
 [['Samples tested','Sampuli zimejaribiwa'],['Samples are checked against the specification: monitor accuracy against a reference, packaging, bilingual labels and instructions.','Sampuli zinakaguliwa dhidi ya vipimo: usahihi wa mashine dhidi ya marejeo, kifungashio, lebo za lugha mbili na maelekezo.']],
 [['Inspected before shipping','Imekaguliwa kabla ya kusafirishwa'],['An independent inspector opens random cartons: quantity, batch numbers, expiry dates, function and damage. The balance is paid only on a pass.','Mkaguzi huru anafungua katoni za kubahatisha: idadi, namba za kundi, tarehe za kuisha, utendaji na uharibifu. Salio linalipwa tu likipita.']],
 [['Inspected on arrival','Imekaguliwa ilipofika'],['At least 60% of shelf life left for products with a shelf life over 24 months, 80% for shorter ones, as TMDA requires. Damaged or short goods are photographed and claimed.','Angalau 60% ya muda wa matumizi kubaki kwa bidhaa zenye muda zaidi ya miezi 24, 80% kwa fupi zaidi, kama TMDA inavyotaka. Bidhaa zilizoharibika au pungufu zinapigwa picha na kudaiwa.']],
 [['Traceable on the shelf','Inafuatilika rafuni'],['Each unit is linked to its batch and supplier, and each sale to its buyer, so a recall reaches every pack in minutes.','Kila kipande kimeunganishwa na kundi lake na msambazaji, na kila mauzo na mnunuzi wake, kwa hiyo urejeshaji unafikia kila pakiti ndani ya dakika.']]];

/* ---------- chapter 8 · permits ---------- */
const LAW=[
 [['Premises registration','Usajili wa jengo'],['TMDA','TMDA'],['Before any import permit; retail device outlet TSh 100,000 a year; importing warehouse TSh 300,000','Kabla ya kibali chochote cha kuingiza; duka la rejareja la vifaa TSh 100,000 kwa mwaka; ghala la kuagiza TSh 300,000'],'1718887575'],
 [['Import permit, each consignment','Kibali cha kuingiza, kila mzigo'],['TMDA','TMDA'],['Apply online at least 6 weeks before shipment; processed in about 7 days','Omba mtandaoni angalau wiki 6 kabla ya kusafirisha; inashughulikiwa ndani ya takriban siku 7'],'import-and-export-control-of-medical-devices'],
 [['Import fee','Ada ya kuingiza'],['TMDA','TMDA'],['2% of FOB value on medicines and medical devices','2% ya thamani ya FOB kwa dawa na vifaa tiba'],'1718887575'],
 [['Device registration','Usajili wa kifaa'],['TMDA','TMDA'],['Imported Class A US$500, Classes B–D US$2,500, then US$200 a year; about 90 days (A) or 240 days (B–D); a local authorised representative is needed','Daraja A kutoka nje US$500, Madaraja B–D US$2,500, kisha US$200 kwa mwaka; takriban siku 90 (A) au 240 (B–D); mwakilishi wa ndani anahitajika'],'omcmedical'],
 [['Shelf life on arrival','Muda wa matumizi ulipofika'],['TMDA','TMDA'],['At least 60% left (shelf life over 24 months) or 80% (24 months or less)','Angalau 60% kubaki (muda zaidi ya miezi 24) au 80% (miezi 24 au chini)'],'import-and-export-control-of-medical-devices'],
 [['Who may import medicines','Nani anaweza kuagiza dawa'],['TMDA','TMDA'],['Registered wholesalers, manufacturers and a few named groups only, so Afya buys medicines locally at launch','Wauzaji wa jumla waliosajiliwa, watengenezaji na makundi machache yaliyotajwa tu, kwa hiyo Afya inanunua dawa ndani mwanzoni'],'import-and-export-control'],
 [['Cosmetics and personal care','Vipodozi na huduma binafsi'],['TBS','TBS'],['Regulated by the Tanzania Bureau of Standards since 2019; imports registered and batch-certified under the 2021 regulations','Vinadhibitiwa na Shirika la Viwango Tanzania tangu 2019; uagizaji unasajiliwa na kuthibitishwa kwa kundi chini ya kanuni za 2021'],'tbs.go.tz'],
 [['Taxes at the port','Kodi bandarini'],['TRA','TRA'],['Duty band 0–35% by tariff line; Railway Development Levy 2% of CIF; Customs Processing Fee 0.6% of FOB; VAT 18% (reclaimed)','Kiwango cha ushuru 0–35% kwa mstari wa ushuru; tozo ya Reli 2% ya CIF; ada ya Uchakataji wa Forodha 0.6% ya FOB; VAT 18% (inarudishwa)'],'TAXES_AND_DUTIES']];

/* ---------- chapter 9 · weekly rhythm ---------- */
const WEEK=[[['Monday','Jumatatu'],['The reorder list is reviewed: what reached its reorder point, what is in transit, what arrives this week.','Orodha ya kuagiza inapitiwa: kilichofikia kiwango cha kuagiza, kilicho njiani, kinachofika wiki hii.']],
 [['Tuesday','Jumanne'],['Purchase orders are approved, local ones sent, import orders confirmed with suppliers and the forwarder.','Oda za ununuzi zinaidhinishwa, za ndani zinatumwa, oda za kuagiza nje zinathibitishwa na wasambazaji na wakala.']],
 [['Thursday','Alhamisi'],['Receiving day at the hub: count, date-check, scan, release to the till.','Siku ya kupokea kituoni: kuhesabu, kukagua tarehe, kuchanganua, kuruhusu kwenye mauzo.']],
 [['Month end','Mwisho wa mwezi'],['Supplier scorecard (on time, complete, defects, price), expiry review, and landed costs updated for the new exchange rate.','Kadi ya alama ya msambazaji (kwa wakati, kamili, kasoro, bei), mapitio ya tarehe za kuisha, na gharama halisi zinasasishwa kwa kiwango kipya cha ubadilishaji.']]];
const ROLES=[[['Founders','Waanzilishi'],['Approve suppliers and every import order; own the landed-cost and pricing rules.','Wanaidhinisha wasambazaji na kila oda ya kuagiza nje; wanamiliki kanuni za gharama halisi na bei.']],
 [['Store lead (buyer at launch)','Kiongozi wa duka (mnunuzi mwanzoni)'],['Runs the weekly reorder list, places local orders, manages wholesaler relationships.','Anaendesha orodha ya kuagiza ya kila wiki, anaweka oda za ndani, anasimamia mahusiano na wauzaji wa jumla.']],
 [['Picker and packer','Mchukuaji na mfungaji'],['Receives, inspects and scans every delivery; sets aside anything that fails.','Anapokea, anakagua na kuchanganua kila mzigo; anatenga chochote kisichopita.']],
 [['Clearing agent (contracted)','Wakala wa forodha (mkataba)'],['Licensed by TASAC; lodges declarations and permits, pays duties on our behalf, arranges the truck.','Ana leseni ya TASAC; anawasilisha matamko na vibali, analipa ushuru kwa niaba yetu, anapanga lori.']],
 [['Inspection company (per order)','Kampuni ya ukaguzi (kwa oda)'],['Independent pre-shipment inspection at the factory, about US$299 per inspector-day.','Ukaguzi huru kabla ya kusafirisha kiwandani, takriban US$299 kwa siku ya mkaguzi.']],
 [['Importer and buyer (from store 2)','Mwagizaji na mnunuzi (kuanzia duka la 2)'],['A dedicated role once direct imports start: suppliers, forwarders, permits and the import calendar.','Jukumu maalum uagizaji wa moja kwa moja ukianza: wasambazaji, mawakala, vibali na kalenda ya uagizaji.']]];

/* ---------- chapter 11 · risks ---------- */
const RISK=[
 [['A container is delayed at sea or at the port.','Kontena linachelewa baharini au bandarini.'],['Medium','Wastani'],['Safety stock on every imported item, a second supplier for every fast mover, and a local wholesaler as the emergency source.','Akiba ya usalama kwa kila bidhaa inayoagizwa, msambazaji wa pili kwa kila bidhaa inayouzwa haraka, na muuzaji wa jumla wa ndani kama chanzo cha dharura.']],
 [['A supplier sends a substandard batch.','Msambazaji anatuma kundi lisilo na ubora.'],['Low','Chini'],['Six quality gates, independent inspection before the balance is paid, and contracts that make the supplier replace rejected goods.','Milango sita ya ubora, ukaguzi huru kabla salio halijalipwa, na mikataba inayomlazimisha msambazaji kubadilisha bidhaa zilizokataliwa.']],
 [['The shilling weakens and costs rise.','Shilingi inadhoofika na gharama zinapanda.'],['Medium','Wastani'],['Landed costs are recalculated with every shipment; shelf prices are reviewed monthly, and members get notice before any box price changes.','Gharama halisi zinahesabiwa upya kwa kila mzigo; bei za rafuni zinapitiwa kila mwezi, na wanachama wanapewa taarifa kabla bei ya box haijabadilika.']],
 [['Device registration takes longer than planned.','Usajili wa kifaa unachukua muda zaidi ya ilivyopangwa.'],['Medium','Wastani'],['Launch with brands already registered in Tanzania; start registering our preferred models early, in parallel with the store build.','Zindua na chapa zilizokwisha kusajiliwa Tanzania; anza kusajili modeli tunazopendelea mapema, sambamba na ujenzi wa duka.']],
 [['Cash is tied up in imported stock.','Pesa inafungwa kwenye stoku iliyoagizwa.'],['Medium','Wastani'],['No direct imports until store 2; order sizes are capped at a set number of days of sales, and imports start with the fastest movers only.','Hakuna uagizaji wa moja kwa moja hadi duka la 2; ukubwa wa oda una kikomo cha siku fulani za mauzo, na uagizaji unaanza na bidhaa zinazouzwa haraka zaidi tu.']],
 [['Counterfeits enter through a local supplier.','Bidhaa bandia zinaingia kupitia msambazaji wa ndani.'],['Low','Chini'],['Licensed wholesalers only, registration checked on every new product, and the same arrival inspection for local goods as for imports.','Wauzaji wa jumla wenye leseni tu, usajili unakaguliwa kwa kila bidhaa mpya, na ukaguzi uleule wa kufika kwa bidhaa za ndani kama za nje.']]];

/* ---------- glossary ---------- */
const GLOSS=[[['FOB','FOB'],['“Free on board”: the factory price including loading onto the ship in China or India. Freight, insurance and everything after are ours to pay.','“Free on board”: bei ya kiwanda ikijumuisha kupakia melini China au India. Usafiri, bima na kila kitu baada ya hapo ni juu yetu.']],
 [['CIF','CIF'],['Cost, insurance and freight: the value of the goods once they reach Dar es Salaam. Duty and the railway levy are calculated on it.','Gharama, bima na usafiri: thamani ya bidhaa zikifika Dar es Salaam. Ushuru na tozo ya reli vinahesabiwa juu yake.']],
 [['Landed cost','Gharama halisi'],['Everything it costs to put one unit on our shelf: factory price, freight, insurance, duty, levies, fees, clearing and transport.','Kila kinachogharimu kuweka kipande kimoja rafuni kwetu: bei ya kiwanda, usafiri, bima, ushuru, tozo, ada, forodha na usafirishaji.']],
 [['LCL and FCL','LCL na FCL'],['Less-than-container-load shares a container and pays per cubic metre; full-container-load books a whole container.','Mzigo pungufu wa kontena unashiriki kontena na kulipa kwa mita ya ujazo; mzigo kamili wa kontena unakodi kontena zima.']],
 [['Lead time','Muda wa kusubiri'],['Days from signing a purchase order to having the product on the shelf.','Siku tangu kusaini oda ya ununuzi hadi bidhaa kuwa rafuni.']],
 [['Safety stock','Akiba ya usalama'],['Extra units kept for surprises: a busy week, a late ship, a closed port.','Vipande vya ziada vinavyotunzwa kwa ajili ya mambo yasiyotarajiwa: wiki yenye shughuli nyingi, meli iliyochelewa, bandari iliyofungwa.']],
 [['MOQ','MOQ'],['Minimum order quantity: the smallest order a factory will accept for a product.','Kiwango cha chini cha oda: oda ndogo zaidi kiwanda kitakachokubali kwa bidhaa.']],
 [['Tariff line (HS code)','Mstari wa ushuru (HS code)'],['The international code that decides which duty band a product falls in. The clearing agent confirms it before we order.','Namba ya kimataifa inayoamua bidhaa iko kwenye kiwango kipi cha ushuru. Wakala wa forodha anaithibitisha kabla hatujaagiza.']]];
/* 4.1 design system: dark cinematic, ivory editorial, clean white. No glows, no gradient text, no drawn diagrams. */
function css41(){addCSS('e1',`
.e1{--dk:#0b0c0c;--dk2:#141615;--iv:#f3ece2;--iv2:#ebe2d5;--wh:#ffffff;--gd:#c9a55c;--gd2:#9a7838;--gr:#1d5a43;--ink:#121413;--mut:#6b6f6c;--dmut:rgba(244,239,230,.62);
 --sans:'Plus Jakarta Sans',-apple-system,'Segoe UI',system-ui,sans-serif;--serif:'Fraunces',Georgia,serif;--mono:'JetBrains Mono',ui-monospace,Menlo,monospace;
 font-family:var(--sans);font-size:16px;color:var(--ink);border-radius:14px;overflow:clip;background:var(--dk)}
.e1 *{box-sizing:border-box}
.e1 .w{max-width:1200px;margin:0 auto;padding:0 44px}
.e1 .ch{position:relative;padding:130px 0}
.e1 .dk{background:var(--dk);color:#f4efe6}.e1 .iv{background:var(--iv);color:var(--ink)}.e1 .wh{background:var(--wh);color:var(--ink)}
.e1 .ey{font:500 .7rem var(--mono);letter-spacing:.22em;text-transform:uppercase;color:var(--gd2)}
.e1 .dk .ey{color:var(--gd)}
.e1 h2{font:600 clamp(2.4rem,5.2vw,4.6rem)/1.02 var(--sans);letter-spacing:-.035em;margin:18px 0 0;max-width:16ch}
.e1 h2 em{font:italic 400 1em var(--serif);letter-spacing:-.02em;color:var(--gd2)}
.e1 .dk h2 em{color:var(--gd)}
.e1 h3{font:600 1.35rem/1.25 var(--sans);letter-spacing:-.01em;margin:0}
.e1 .ld{font:400 clamp(1.08rem,1.5vw,1.28rem)/1.65 var(--sans);color:var(--mut);max-width:60ch;margin:26px 0 0}
.e1 .dk .ld{color:var(--dmut)}
.e1 .ld b{color:var(--ink);font-weight:600}.e1 .dk .ld b{color:#f4efe6}
.e1 p{line-height:1.72}
.e1 .tag{display:inline-block;font:500 .62rem var(--mono);letter-spacing:.16em;text-transform:uppercase;color:var(--mut);border-top:1px solid currentColor;padding-top:8px;margin-top:22px;opacity:.8}
.e1 .dk .tag{color:var(--dmut)}
.e1 .rv{opacity:0;transform:translateY(22px);transition:opacity .9s cubic-bezier(.2,.7,.2,1),transform .9s cubic-bezier(.2,.7,.2,1)}.e1 .rv.in{opacity:1;transform:none}
.e1 button{font-family:inherit;cursor:pointer}
.e1 .bt{appearance:none;display:inline-flex;align-items:center;gap:12px;border:1px solid #f4efe6;background:#f4efe6;color:#0b0c0c;padding:15px 24px;font:600 .78rem var(--sans);letter-spacing:.14em;text-transform:uppercase;border-radius:2px;transition:background .25s,color .25s}
.e1 .bt:hover{background:transparent;color:#f4efe6}
.e1 .bt.gh{background:transparent;color:#f4efe6;border-color:rgba(244,239,230,.4)}.e1 .bt.gh:hover{border-color:#f4efe6}
.e1 .wh .bt,.e1 .iv .bt{background:var(--ink);color:#fff;border-color:var(--ink)}.e1 .wh .bt:hover,.e1 .iv .bt:hover{background:transparent;color:var(--ink)}
.e1 .bt svg{width:14px;height:14px}
.e1 sup.ci a{font:600 .62em var(--mono);color:var(--gd2);text-decoration:none;margin-left:2px}.e1 .dk sup.ci a{color:var(--gd)}

/* opening */
.e1 .op{position:relative;min-height:100vh;display:flex;align-items:flex-end;padding:0 0 70px;overflow:hidden}
.e1 .op .bg{position:absolute;inset:0;background:url(${'img/e1/hero.webp'}) center/cover no-repeat;transform:scale(1.06);animation:e1kb 24s ease-out forwards}
@keyframes e1kb{to{transform:scale(1)}}
.e1 .op .sh{position:absolute;inset:0;background:linear-gradient(90deg,rgba(8,9,9,.92) 0%,rgba(8,9,9,.7) 42%,rgba(8,9,9,.12) 75%),linear-gradient(0deg,rgba(8,9,9,.9),rgba(8,9,9,0) 45%)}
.e1 .op .w{position:relative;width:100%}
.e1 .op .crumb{font:500 .66rem var(--mono);letter-spacing:.2em;text-transform:uppercase;color:var(--dmut)}
.e1 .op h1{font:600 clamp(3.2rem,8.4vw,7.6rem)/.92 var(--sans);letter-spacing:-.05em;margin:22px 0 0;color:#f6f1e8}
.e1 .op h1 em{display:block;font:italic 300 .62em/1.1 var(--serif);letter-spacing:-.02em;color:var(--gd);margin-top:10px}
.e1 .op .ld{max-width:52ch}
.e1 .facts{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:34px;margin:54px 0 0;max-width:980px}
.e1 .facts div{border-top:1px solid rgba(244,239,230,.22);padding-top:16px}
.e1 .facts b{display:block;font:300 clamp(1.9rem,3.2vw,2.7rem)/1 var(--serif);color:#f6f1e8}
.e1 .facts span{display:block;margin-top:10px;font-size:.86rem;line-height:1.45;color:var(--dmut)}
.e1 .acts{display:flex;flex-wrap:wrap;gap:12px;margin-top:44px}

/* sticky chapter bar */
.e1 .cbar{position:sticky;top:0;z-index:30;background:rgba(11,12,12,.86);backdrop-filter:saturate(1.4) blur(14px);-webkit-backdrop-filter:saturate(1.4) blur(14px);border-bottom:1px solid rgba(244,239,230,.08)}
.e1 .cbar .w{display:flex;align-items:center;gap:6px;overflow-x:auto;scrollbar-width:none;height:52px}.e1 .cbar .w::-webkit-scrollbar{display:none}
.e1 .cbar b{font:600 .72rem var(--sans);letter-spacing:.06em;color:#f4efe6;margin-right:16px;white-space:nowrap}
.e1 .cbar a{font:500 .74rem var(--sans);color:var(--dmut);text-decoration:none;padding:8px 11px;white-space:nowrap;border-bottom:1px solid transparent;transition:color .2s}
.e1 .cbar a:hover{color:#f4efe6}.e1 .cbar a.on{color:#f4efe6;border-bottom-color:var(--gd)}
.e1 .cbar .fl{margin-left:auto;appearance:none;background:none;border:0;color:var(--gd);font:600 .7rem var(--sans);letter-spacing:.12em;text-transform:uppercase;white-space:nowrap;padding:8px 0 8px 14px}

/* why */
.e1 .two{display:grid;grid-template-columns:1.05fr .95fr;gap:70px;align-items:start;margin-top:56px}
.e1 .prose p{font-size:1.06rem;color:#2c2f2d;margin:0 0 20px}.e1 .prose p b{color:var(--ink)}
.e1 .ph{margin:0;position:relative}
.e1 .ph img{display:block;width:100%;height:auto;aspect-ratio:16/10;object-fit:cover;border-radius:4px}
.e1 .ph figcaption{font:500 .64rem var(--mono);letter-spacing:.14em;text-transform:uppercase;color:var(--mut);margin-top:12px}
.e1 .dk .ph figcaption{color:var(--dmut)}
.e1 .quote{margin:90px 0 0;font:300 clamp(1.8rem,3.6vw,3rem)/1.18 var(--serif);letter-spacing:-.015em;max-width:24ch}
.e1 .quote em{font-style:italic;color:var(--gd2)}
.e1 .rules{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:44px;margin-top:56px}
.e1 .rules div{border-top:1px solid rgba(18,20,19,.16);padding-top:18px}
.e1 .rules small{font:500 .64rem var(--mono);letter-spacing:.16em;color:var(--gd2)}
.e1 .rules h3{margin-top:10px}.e1 .rules p{margin:10px 0 0;color:#454946;font-size:.98rem}

/* one sale (sticky motion) */
.e1 .sale{display:grid;grid-template-columns:1.25fr .75fr;gap:0;margin-top:60px}
.e1 .stg{position:sticky;top:52px;height:calc(100vh - 52px);overflow:hidden;background:#000}
.e1 .stg img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transform:scale(1.08);transition:opacity 1.1s ease,transform 7s ease-out}
.e1 .stg img.on{opacity:1;transform:scale(1)}
.e1 .stg .hd2{position:absolute;left:28px;right:28px;bottom:26px;display:flex;justify-content:space-between;align-items:flex-end;gap:20px;color:#f4efe6}
.e1 .stg .hd2::before{content:"";position:absolute;inset:-120px -28px -26px;background:linear-gradient(0deg,rgba(0,0,0,.72),rgba(0,0,0,0));z-index:-1}
.e1 .stg .clk{font:300 clamp(2.4rem,4.6vw,4rem)/1 var(--serif);letter-spacing:-.02em}
.e1 .stg .lg{font:500 .72rem/1.8 var(--mono);color:rgba(244,239,230,.86);text-align:right;max-width:44ch}
.e1 .stg .lg i{font-style:normal;color:var(--gd)}
.e1 .stg .pg{position:absolute;left:28px;right:28px;top:24px;display:flex;gap:6px}
.e1 .stg .pg span{flex:1;height:2px;background:rgba(244,239,230,.22)}.e1 .stg .pg span.on{background:#f4efe6}
.e1 .stps{padding:0 0 0 54px}
.e1 .stp{min-height:92vh;display:flex;flex-direction:column;justify-content:center;opacity:.32;transition:opacity .5s}
.e1 .stp.on{opacity:1}
.e1 .stp .k{font:500 .66rem var(--mono);letter-spacing:.18em;color:var(--gd);text-transform:uppercase}
.e1 .stp h3{font:600 clamp(1.7rem,2.6vw,2.3rem)/1.1 var(--sans);letter-spacing:-.02em;margin-top:14px}
.e1 .stp .s{font:italic 400 1.15rem/1.45 var(--serif);color:#e9dcc2;margin:14px 0 0}
.e1 .stp p{color:var(--dmut);font-size:1rem;margin:16px 0 0}
.e1 .stp ul{list-style:none;margin:22px 0 0;padding:16px 0 0;border-top:1px solid rgba(244,239,230,.14)}
.e1 .stp li{font:500 .74rem/2 var(--mono);color:rgba(244,239,230,.8)}
.e1 .stp li::before{content:"› ";color:var(--gd)}

/* film */
.e1f{position:fixed;inset:0;z-index:99990;background:#000;display:none;color:#f4efe6;font-family:'Plus Jakarta Sans',system-ui,sans-serif}
.e1f.on{display:block}
.e1f img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity 1.2s ease}
.e1f img.on{opacity:1;animation:e1fz 8.5s linear forwards}
@keyframes e1fz{from{transform:scale(1.1) translateX(1.5%)}to{transform:scale(1) translateX(0)}}
.e1f .vg{position:absolute;inset:0;background:linear-gradient(0deg,rgba(0,0,0,.82) 0%,rgba(0,0,0,.25) 45%,rgba(0,0,0,.35) 100%)}
.e1f .tx{position:absolute;left:6vw;right:6vw;bottom:13vh;max-width:820px}
.e1f .tx small{font:500 .74rem 'JetBrains Mono',monospace;letter-spacing:.2em;color:#c9a55c;text-transform:uppercase}
.e1f .tx h4{font:600 clamp(2.2rem,5.4vw,4.8rem)/1 'Plus Jakarta Sans',sans-serif;letter-spacing:-.04em;margin:14px 0 0}
.e1f .tx p{font:italic 400 clamp(1.1rem,1.8vw,1.5rem)/1.45 'Fraunces',Georgia,serif;color:#eadfca;margin:16px 0 0;max-width:40ch}
.e1f .tx .lg{font:500 .78rem/1.9 'JetBrains Mono',monospace;color:rgba(244,239,230,.75);margin-top:18px}
.e1f .tx>*{opacity:0;transform:translateY(16px);transition:opacity .8s ease,transform .8s ease}
.e1f .tx.in>*{opacity:1;transform:none}.e1f .tx.in>*:nth-child(2){transition-delay:.15s}.e1f .tx.in>*:nth-child(3){transition-delay:.35s}.e1f .tx.in>*:nth-child(4){transition-delay:.6s}
.e1f .bar{position:absolute;left:6vw;right:6vw;bottom:6vh;display:flex;gap:6px}
.e1f .bar button{appearance:none;flex:1;height:18px;background:none;border:0;padding:8px 0;cursor:pointer}
.e1f .bar button i{display:block;height:2px;background:rgba(244,239,230,.25);position:relative;overflow:hidden}
.e1f .bar button i b{position:absolute;left:0;top:0;bottom:0;width:0;background:#f4efe6}
.e1f .top{position:absolute;top:3vh;left:6vw;right:6vw;display:flex;justify-content:space-between;align-items:center;font:500 .7rem 'JetBrains Mono',monospace;letter-spacing:.18em;text-transform:uppercase;color:rgba(244,239,230,.7)}
.e1f .top div{display:flex;gap:8px}
.e1f .top button{appearance:none;background:rgba(0,0,0,.35);border:1px solid rgba(244,239,230,.35);color:#f4efe6;padding:9px 14px;font:600 .66rem 'Plus Jakarta Sans',sans-serif;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;border-radius:2px}
.e1f .top button:hover{border-color:#f4efe6}

/* architecture */
.e1 .stk5{margin-top:64px;border-top:1px solid #111}
.e1 .lyr{border-bottom:1px solid rgba(17,17,17,.14)}
.e1 .lyr>button{appearance:none;width:100%;background:none;border:0;display:grid;grid-template-columns:90px 1.1fr 1.4fr 150px 30px;gap:24px;align-items:baseline;padding:30px 0;text-align:left;color:inherit}
.e1 .lyr>button:hover h3{color:var(--gr)}
.e1 .lyr .n{font:300 2.2rem/1 var(--serif);color:var(--gd2)}
.e1 .lyr h3{font:600 clamp(1.5rem,2.4vw,2.1rem)/1.1 var(--sans);letter-spacing:-.025em;transition:color .2s}
.e1 .lyr .r{font-size:1.02rem;color:var(--mut);line-height:1.5}
.e1 .lyr .b{font:500 .64rem var(--mono);letter-spacing:.14em;text-transform:uppercase;color:var(--gr);text-align:right}
.e1 .lyr .pl{font:300 1.6rem/1 var(--sans);color:var(--mut);transition:transform .3s}
.e1 .lyr.op2 .pl{transform:rotate(45deg)}
.e1 .lyr .bd{display:grid;grid-template-columns:90px 1fr 1fr;gap:24px;max-height:0;overflow:hidden;transition:max-height .5s cubic-bezier(.2,.7,.2,1)}
.e1 .lyr.op2 .bd{max-height:520px}
.e1 .lyr .bd>div{padding:0 0 34px}
.e1 .lyr .bd small{display:block;font:500 .62rem var(--mono);letter-spacing:.16em;text-transform:uppercase;color:var(--gd2);margin-bottom:10px}
.e1 .lyr .bd p{margin:0;color:#3a3e3b}
.e1 .fnd{display:grid;grid-template-columns:90px 1fr;gap:24px;padding:30px 0;background:var(--dk);color:#f4efe6;margin-top:0}
.e1 .fnd .n{padding-left:20px;font:300 2.2rem/1 var(--serif);color:var(--gd)}
.e1 .fnd h3{font-size:1.25rem}.e1 .fnd p{margin:8px 20px 0 0;color:var(--dmut)}
.e1 .princ{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:34px;margin-top:70px}
.e1 .princ div{border-top:1px solid rgba(17,17,17,.16);padding-top:16px}.e1 .princ b{display:block;font:600 1.02rem var(--sans)}.e1 .princ span{display:block;margin-top:8px;font-size:.92rem;line-height:1.55;color:var(--mut)}

/* devices */
.e1 .flat{position:relative;margin-top:60px}
.e1 .flat img{display:block;width:100%;height:auto;border-radius:4px}
.e1 .hs{position:absolute;transform:translate(-50%,-50%);appearance:none;border:1px solid rgba(244,239,230,.75);background:rgba(11,12,12,.55);color:#f4efe6;font:600 .66rem var(--mono);letter-spacing:.06em;padding:7px 10px;border-radius:2px;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);transition:background .2s,color .2s}
.e1 .hs:hover,.e1 .hs.on{background:#f4efe6;color:#0b0c0c}
.e1 .devx{display:grid;grid-template-columns:300px 1fr;gap:60px;margin-top:46px;align-items:start}
.e1 .dlist{display:flex;flex-direction:column}
.e1 .dlist button{appearance:none;background:none;border:0;border-top:1px solid rgba(244,239,230,.12);text-align:left;padding:14px 0;color:var(--dmut);font:500 .98rem var(--sans);display:flex;gap:14px}
.e1 .dlist button i{font:500 .7rem var(--mono);font-style:normal;color:var(--gd);padding-top:3px}
.e1 .dlist button.on,.e1 .dlist button:hover{color:#f4efe6}
.e1 .dcard h3{font:600 clamp(1.6rem,2.6vw,2.2rem)/1.1 var(--sans);letter-spacing:-.02em}
.e1 .dcard .who{font:500 .68rem var(--mono);letter-spacing:.14em;text-transform:uppercase;color:var(--gd);margin-top:12px}
.e1 .dcard p{color:var(--dmut);font-size:1.04rem;margin:18px 0 0;max-width:58ch}
.e1 .dcard p.y{color:#e9dcc2;font:italic 400 1.08rem/1.6 var(--serif)}

/* modules */
.e1 .mdl{display:grid;grid-template-columns:320px 1fr;gap:64px;margin-top:60px;align-items:start}
.e1 .mlist{position:sticky;top:80px;display:flex;flex-direction:column}
.e1 .mlist button{appearance:none;background:none;border:0;border-top:1px solid rgba(17,17,17,.1);text-align:left;padding:13px 0;color:var(--mut);font:500 1.02rem var(--sans);display:flex;gap:14px;align-items:baseline;transition:color .2s}
.e1 .mlist button i{font:500 .68rem var(--mono);font-style:normal;color:var(--gd2)}
.e1 .mlist button.on,.e1 .mlist button:hover{color:var(--ink)}
.e1 .mlist button.on{font-weight:600}
.e1 .mdet .ph img{aspect-ratio:16/9}
.e1 .mdet h3{font:600 clamp(1.8rem,3vw,2.6rem)/1.05 var(--sans);letter-spacing:-.03em;margin-top:34px}
.e1 .mdet .bb{display:inline-block;margin-top:14px;font:500 .64rem var(--mono);letter-spacing:.16em;text-transform:uppercase;color:var(--gr)}
.e1 .mdet .lead{font-size:1.12rem;color:#2c2f2d;margin:18px 0 0;max-width:62ch}
.e1 .mgrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:30px;margin-top:30px}
.e1 .mgrid div{border-top:1px solid rgba(17,17,17,.14);padding-top:14px}
.e1 .mgrid small{display:block;font:500 .6rem var(--mono);letter-spacing:.16em;text-transform:uppercase;color:var(--gd2)}
.e1 .mgrid p{margin:8px 0 0;font-size:.95rem;color:#3a3e3b;line-height:1.6}
.e1 .mdet{animation:e1in .5s ease}@keyframes e1in{from{opacity:0;transform:translateY(10px)}}

/* try it */
.e1 .tryg{display:grid;grid-template-columns:340px 1fr;gap:40px;align-items:center;margin-top:60px}
.e1 .dvp{position:relative;width:340px;aspect-ratio:643/1393;margin:0 auto}
.e1 .dvp .scr{position:absolute;left:6.86%;top:3.16%;width:86.4%;height:93.72%;border-radius:40px;overflow:hidden;background:#fbfaf7}
.e1 .dvp .frm{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
.e1 .lpt{position:relative;width:100%;aspect-ratio:1495/982}
.e1 .lpt>img{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
.e1 .lpt .scr{position:absolute;left:11.04%;top:4.07%;width:77.96%;height:72.57%;overflow:hidden;background:#fff;border-radius:3px}
.e1 .lpt .zs{width:820px;transform-origin:0 0;position:absolute;left:0;top:0}
/* till app */
.e1 .ta{position:absolute;inset:0;display:flex;flex-direction:column;font-family:var(--sans);color:#141614;font-size:13px}
.e1 .ta .sb{display:flex;justify-content:space-between;align-items:center;padding:16px 22px 6px;font:600 11px var(--sans)}
.e1 .ta .net{appearance:none;border:1px solid #d9d4ca;background:#fff;border-radius:20px;padding:3px 9px;font:600 10px var(--sans);color:#1d5a43}
.e1 .ta .net.off{color:#8a5a00;border-color:#e2c58c;background:#fff8ea}
.e1 .ta .hd{padding:6px 18px 10px;border-bottom:1px solid #eee}
.e1 .ta .hd small{font:500 9px var(--mono);letter-spacing:.14em;color:#8b8f8c;text-transform:uppercase}
.e1 .ta .hd b{display:block;font:600 17px var(--sans);letter-spacing:-.01em;margin-top:2px}
.e1 .ta .pl{flex:1;overflow:auto;padding:6px 14px}
.e1 .ta .pi{display:grid;grid-template-columns:46px 1fr auto;gap:10px;align-items:center;padding:9px 4px;border-bottom:1px solid #f0eee9}
.e1 .ta .pi .im{width:46px;height:46px;border-radius:8px;background-color:#f3f1ec}
.e1 .ta .pi b{display:block;font:600 12px/1.25 var(--sans)}.e1 .ta .pi span{display:block;font-size:10.5px;color:#8b8f8c;margin-top:2px}
.e1 .ta .pi .ad{appearance:none;border:1px solid #141614;background:#fff;border-radius:6px;font:600 11px var(--sans);padding:6px 10px;color:#141614}
.e1 .ta .pi .ad:active{background:#141614;color:#fff}
.e1 .ta .ft{padding:12px 16px 26px;border-top:1px solid #eee;background:#fff}
.e1 .ta .tot{display:flex;justify-content:space-between;font:600 13px var(--sans);margin-bottom:10px}
.e1 .ta .chg{appearance:none;width:100%;border:0;background:#141614;color:#fff;border-radius:10px;padding:13px;font:600 13px var(--sans)}
.e1 .ta .chg:disabled{background:#c9c6bf}
.e1 .ta .ok{position:absolute;inset:0;background:#fbfaf7;display:none;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:30px}
.e1 .ta .ok.on{display:flex;animation:e1in .35s ease}
.e1 .ta .ok svg{width:46px;height:46px;color:#1d5a43}
.e1 .ta .ok b{font:600 18px var(--sans);margin-top:14px}.e1 .ta .ok span{font-size:12px;color:#6b6f6c;margin-top:8px;line-height:1.5}
/* dashboard (1000px canvas, scaled into the laptop) */
.e1 .db{font-family:var(--sans);color:#141614;background:#fff;min-height:660px}
.e1 .db .tb{display:flex;align-items:center;gap:18px;padding:16px 26px;border-bottom:1px solid #eee}
.e1 .db .tb b{font:700 15px var(--sans)}.e1 .db .tb span{font:500 10px var(--mono);letter-spacing:.14em;color:#8b8f8c;text-transform:uppercase}
.e1 .db .tabs{margin-left:auto;display:flex;gap:4px}
.e1 .db .tabs button{appearance:none;border:1px solid #e5e2db;background:#fff;padding:6px 12px;font:600 11px var(--sans);border-radius:4px;color:#555}
.e1 .db .tabs button.on{background:#141614;color:#fff;border-color:#141614}
.e1 .db .bd{padding:22px 26px}
.e1 .db .k5{display:grid;grid-template-columns:repeat(5,1fr);gap:0;border:1px solid #eee;border-radius:6px}
.e1 .db .k5 div{padding:16px 18px;border-right:1px solid #eee}.e1 .db .k5 div:last-child{border-right:0}
.e1 .db .k5 small{display:block;font:500 9.5px var(--mono);letter-spacing:.12em;color:#8b8f8c;text-transform:uppercase}
.e1 .db .k5 b{display:block;font:600 24px var(--sans);letter-spacing:-.02em;margin-top:8px}
.e1 .db .k5 span{display:block;font-size:11px;color:#6b6f6c;margin-top:4px}
.e1 .db .k5 b.fl{animation:e1fl 1.2s ease}@keyframes e1fl{0%{color:#1d5a43}100%{color:#141614}}
.e1 .db .row{display:grid;grid-template-columns:1.3fr 1fr;gap:20px;margin-top:20px}
.e1 .db h5{font:600 12px var(--sans);margin:0 0 10px}
.e1 .db .feed{border:1px solid #eee;border-radius:6px;padding:12px 16px;min-height:220px;max-height:240px;overflow:auto}
.e1 .db .feed div{display:grid;grid-template-columns:62px 1fr;gap:10px;padding:7px 0;border-bottom:1px solid #f4f2ee;font-size:12px}
.e1 .db .feed div:last-child{border-bottom:0}
.e1 .db .feed i{font:500 10.5px var(--mono);font-style:normal;color:#8b8f8c}
.e1 .db .feed .new{animation:e1in .4s ease}
.e1 .db .al div{padding:9px 12px;border-left:2px solid #c9a55c;background:#faf7f0;font-size:12px;margin-bottom:8px;line-height:1.45}
.e1 .db .al div.ok{border-left-color:#1d5a43;background:#f2f7f4}
.e1 .db .stk{display:grid;grid-template-columns:1fr 60px;gap:6px 10px;font-size:12px;margin-top:6px}
.e1 .db .stk span:nth-child(2n){text-align:right;font-family:var(--mono)}
.e1 .db .stk .lo{color:#9a5a00;font-weight:600}
.e1 .db .rep{max-width:520px;margin:10px auto;background:#efe7dc;border-radius:8px;padding:18px}
.e1 .db .rep .m{background:#fff;border-radius:8px;padding:14px 16px;font-size:12.5px;line-height:1.6;box-shadow:0 1px 1px rgba(0,0,0,.06)}
.e1 .db .rep .m.me{background:#dcf3e5;margin:10px 0 0 auto;max-width:60%}
.e1 .db .rep small{display:block;text-align:right;font-size:10px;color:#8b8f8c;margin-top:4px}
.e1 .db .scn{display:flex;gap:4px;margin:0 0 14px}
.e1 .db .scn button{appearance:none;border:1px solid #e5e2db;background:#fff;padding:5px 10px;font:600 10.5px var(--sans);border-radius:4px;color:#555}
.e1 .db .scn button.on{border-color:#1d5a43;color:#1d5a43}
.e1 .tryx{margin-top:34px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:34px}
.e1 .tryx div{border-top:1px solid rgba(17,17,17,.16);padding-top:14px}.e1 .tryx b{display:block;font:600 1rem var(--sans)}.e1 .tryx span{display:block;margin-top:8px;font-size:.92rem;color:var(--mut);line-height:1.55}
.e1 .hint{margin-top:18px;font:500 .7rem var(--mono);letter-spacing:.12em;text-transform:uppercase;color:var(--gd2)}

/* resilience */
.e1 .resg{display:grid;grid-template-columns:1fr 1fr;gap:70px;margin-top:60px;align-items:start}
.e1 .tl{margin:0;padding:0;list-style:none}
.e1 .tl li{display:grid;grid-template-columns:96px 1fr;gap:20px;padding:20px 0;border-top:1px solid rgba(244,239,230,.12)}
.e1 .tl li b{font:300 1.5rem/1 var(--serif);color:var(--gd)}
.e1 .tl li h4{margin:0;font:600 1.04rem var(--sans);color:#f4efe6}.e1 .tl li p{margin:6px 0 0;color:var(--dmut);font-size:.96rem}
.e1 .four{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:30px;margin-top:70px}
.e1 .four div{border-top:1px solid rgba(244,239,230,.2);padding-top:16px}.e1 .four b{display:block;font:600 1rem var(--sans);color:#f4efe6}.e1 .four span{display:block;margin-top:8px;color:var(--dmut);font-size:.92rem;line-height:1.55}

/* trust */
.e1 .law{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:40px;margin-top:56px}
.e1 .law div{border-top:1px solid #111;padding-top:16px}
.e1 .law b{display:block;font:300 2.4rem/1 var(--serif);color:var(--ink)}.e1 .law span{display:block;margin-top:10px;color:#3a3e3b;font-size:.95rem;line-height:1.55}
.e1 .pr6{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:44px 40px;margin-top:70px}
.e1 .pr6 small{font:500 .62rem var(--mono);letter-spacing:.16em;color:var(--gd2);text-transform:uppercase}
.e1 .pr6 h3{margin-top:10px;font-size:1.2rem}.e1 .pr6 p{margin:10px 0 0;color:#3a3e3b;font-size:.96rem}
.e1 .acc{margin-top:80px}
.e1 .rbtn{display:flex;flex-wrap:wrap;gap:6px;margin-top:20px}
.e1 .rbtn button{appearance:none;border:1px solid rgba(17,17,17,.2);background:transparent;padding:9px 14px;font:600 .74rem var(--sans);border-radius:2px;color:#3a3e3b}
.e1 .rbtn button.on{background:var(--ink);color:#fff;border-color:var(--ink)}
.e1 .atab{width:100%;border-collapse:collapse;margin-top:22px;font-size:.92rem}
.e1 .atab th{font:500 .62rem var(--mono);letter-spacing:.14em;text-transform:uppercase;color:var(--mut);text-align:left;padding:10px 12px;border-bottom:1px solid #111}
.e1 .atab td{padding:13px 12px;border-bottom:1px solid rgba(17,17,17,.1);color:#3a3e3b;transition:background .25s,opacity .25s}
.e1 .atab td:first-child{font-weight:600;color:var(--ink)}
.e1 .atab tr.dim td{opacity:.32}.e1 .atab tr.hi td{background:#fff}
.e1 .atab td.no{color:#9b9f9c}
.e1 .rx{margin-top:16px;font:italic 400 1.08rem/1.6 var(--serif);color:#2c2f2d;min-height:1.6em}

/* cost */
.e1 .nmb{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:30px;margin-top:60px}
.e1 .nmb div{border-top:1px solid #111;padding-top:16px}
.e1 .nmb b{display:block;font:300 clamp(1.6rem,2.5vw,2.4rem)/1 var(--serif);letter-spacing:-.02em;white-space:nowrap}
.e1 .nmb span{display:block;margin-top:10px;color:var(--mut);font-size:.88rem;line-height:1.5}
.e1 .split{margin-top:70px;display:grid;grid-template-columns:1fr 1fr;gap:70px}
.e1 .spl div{display:grid;grid-template-columns:1fr 140px 34px;gap:16px;padding:14px 0;border-bottom:1px solid rgba(17,17,17,.1);font-size:.96rem;align-items:baseline}
.e1 .spl div b{font:500 .9rem var(--mono);text-align:right}.e1 .spl div i{font:500 .78rem var(--mono);font-style:normal;color:var(--mut);text-align:right}
.e1 .spl div.t{border-bottom:0;border-top:1px solid #111;font-weight:600}
.e1 .bbc h4{font:600 1.05rem var(--sans);margin:0 0 4px}.e1 .bbc p{margin:0 0 22px;color:#3a3e3b;font-size:.96rem}
.e1 .bbc small{font:500 .62rem var(--mono);letter-spacing:.16em;color:var(--gr);text-transform:uppercase}

/* scale */
.e1 .scl{position:relative;overflow:hidden}
.e1 .scl .bg{position:absolute;inset:0;background:url(${'img/e1/city.webp'}) center/cover no-repeat;opacity:.38}
.e1 .scl .sh{position:absolute;inset:0;background:linear-gradient(180deg,var(--dk) 0%,rgba(11,12,12,.55) 30%,rgba(11,12,12,.7) 70%,var(--dk) 100%)}
.e1 .scl .w{position:relative}
.e1 .yrs{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));margin-top:64px;border-top:1px solid rgba(244,239,230,.2)}
.e1 .yrs button{appearance:none;background:none;border:0;border-right:1px solid rgba(244,239,230,.08);padding:16px 8px 14px;text-align:left;color:var(--dmut);transition:background .2s,color .2s}
.e1 .yrs button:last-child{border-right:0}
.e1 .yrs button small{display:block;font:500 .6rem var(--mono);letter-spacing:.12em}
.e1 .yrs button b{display:block;font:300 1.7rem/1 var(--serif);margin-top:8px;color:#f4efe6}
.e1 .yrs button:hover{background:rgba(244,239,230,.05)}
.e1 .yrs button.on{background:#f4efe6;color:#0b0c0c}.e1 .yrs button.on b{color:#0b0c0c}
.e1 .ydet{display:grid;grid-template-columns:260px 1fr;gap:50px;margin-top:40px;min-height:150px}
.e1 .ydet .big{font:300 5rem/1 var(--serif);color:#f4efe6}.e1 .ydet .big small{display:block;font:500 .66rem var(--mono);letter-spacing:.16em;text-transform:uppercase;color:var(--gd);margin-top:12px}
.e1 .ydet h3{color:#f4efe6}.e1 .ydet p{color:var(--dmut);font-size:1.06rem;margin:12px 0 0;max-width:60ch}

/* risks */
.e1 .rk{margin-top:56px;border-top:1px solid #111}
.e1 .rk div{display:grid;grid-template-columns:1fr 110px 1.3fr;gap:36px;padding:24px 0;border-bottom:1px solid rgba(17,17,17,.12);align-items:baseline}
.e1 .rk h3{font-size:1.12rem}.e1 .rk i{font:500 .66rem var(--mono);font-style:normal;letter-spacing:.14em;text-transform:uppercase;color:var(--gd2)}
.e1 .rk p{margin:0;color:#3a3e3b}

/* end */
.e1 .tkw{font:300 clamp(1.7rem,3.2vw,2.7rem)/1.3 var(--serif);letter-spacing:-.01em;color:#f4efe6;max-width:30ch;margin:22px 0 0}
.e1 .tkw em{color:var(--gd)}
.e1 .src{margin-top:80px;padding-top:24px;border-top:1px solid rgba(244,239,230,.14)}
.e1 .src ol{margin:14px 0 0;padding-left:18px;color:var(--dmut);font-size:.86rem;line-height:1.8}
.e1 .src a{color:var(--dmut)}.e1 .src a:hover{color:#f4efe6}
.e1 .pgn{display:flex;justify-content:space-between;gap:20px;margin-top:60px}
.e1 .pgn a{text-decoration:none;color:#f4efe6;display:flex;flex-direction:column;gap:6px;padding:20px 0;border-top:1px solid rgba(244,239,230,.3);min-width:220px}
.e1 .pgn a.nx{text-align:right;align-items:flex-end}
.e1 .pgn small{font:500 .64rem var(--mono);letter-spacing:.16em;color:var(--gd)}.e1 .pgn span{font:500 1.15rem var(--sans)}

@media (max-width:980px){
 .e1 .w{padding:0 20px}.e1 .ch{padding:90px 0}
 .e1 .facts{grid-template-columns:1fr 1fr;gap:24px}
 .e1 .two,.e1 .resg,.e1 .split,.e1 .devx,.e1 .mdl,.e1 .tryg,.e1 .ydet{grid-template-columns:1fr;gap:36px}
 .e1 .rules,.e1 .law,.e1 .pr6,.e1 .tryx{grid-template-columns:1fr;gap:26px}
 .e1 .princ,.e1 .four{grid-template-columns:1fr 1fr}
 .e1 .nmb{grid-template-columns:1fr 1fr}
 .e1 .sale{grid-template-columns:1fr}
 .e1 .stg{top:52px;height:46vh;z-index:2}
 .e1 .stg .lg{display:none}.e1 .stg .clk{font-size:2.2rem}
 .e1 .stps{padding:0}.e1 .stp{min-height:70vh}
 .e1 .lyr>button{grid-template-columns:44px 1fr 24px;gap:14px}
 .e1 .lyr .r,.e1 .lyr .b{display:none}
 .e1 .lyr .bd{grid-template-columns:1fr;gap:4px;padding-left:58px}
 .e1 .fnd{grid-template-columns:44px 1fr;gap:14px}.e1 .fnd .n{padding-left:12px;font-size:1.6rem}
 .e1 .mlist{position:static;flex-direction:row;overflow-x:auto;gap:18px;scrollbar-width:none}
 .e1 .mlist button{white-space:nowrap;border-top:0;border-bottom:1px solid transparent}.e1 .mlist button.on{border-bottom-color:var(--ink)}
 .e1 .mgrid{grid-template-columns:1fr}
 .e1 .yrs{grid-template-columns:repeat(6,minmax(0,1fr))}.e1 .yrs button{border-bottom:1px solid rgba(244,239,230,.08)}
 .e1 .rk div{grid-template-columns:1fr;gap:8px}
 .e1 .atab{font-size:.8rem}.e1 .atab th,.e1 .atab td{padding:9px 6px}
 .e1 .hs{padding:4px 6px;font-size:.58rem}
 .e1 .dvp{width:300px}
}
@media (max-width:560px){.e1 .op h1{font-size:3.1rem}.e1 .facts b{font-size:1.7rem}.e1 .accw{overflow-x:auto}.e1 .atab{min-width:620px}}
`)}
/* 4.1 depth layer styles */
function css41p(){addCSS('e1p',`
.e1 .rb{appearance:none;display:flex;align-items:center;gap:22px;width:100%;margin-top:70px;padding:26px 0;background:none;border:0;border-top:1px solid currentColor;border-bottom:1px solid rgba(127,127,127,.25);text-align:left;color:inherit;transition:padding .3s}
.e1 .rb:hover{padding-left:12px}
.e1 .rb span{font:500 .66rem var(--mono);letter-spacing:.18em;text-transform:uppercase;color:var(--gd2);white-space:nowrap}
.e1 .dk .rb span{color:var(--gd)}
.e1 .rb b{flex:1;font:400 clamp(1.15rem,1.9vw,1.6rem)/1.3 var(--serif);letter-spacing:-.01em}
.e1 .rb svg{width:22px;height:22px;flex:none}
.e1 .stx{margin-top:56px;border-top:1px solid #111}
.e1 .sti{display:grid;grid-template-columns:70px 1fr 280px;gap:30px;padding:30px 0;border-bottom:1px solid rgba(17,17,17,.12);align-items:start}
.e1 .sti .n{font:300 2rem/1 var(--serif);color:var(--gd2)}
.e1 .sti small{font:500 .62rem var(--mono);letter-spacing:.16em;text-transform:uppercase;color:var(--gr)}
.e1 .sti h3{margin-top:8px;font-size:1.3rem}.e1 .sti p{margin:10px 0 0;color:#3a3e3b;font-size:.98rem;max-width:62ch}
.e1 .sti .pr b{display:block;font:400 1.05rem/1.4 var(--serif);color:var(--ink)}
.e1 .kpis{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:30px;margin-top:50px}
.e1 .kpis div{border-top:1px solid #111;padding-top:16px}.e1 .kpis b{display:block;font:300 clamp(1.7rem,2.6vw,2.4rem)/1 var(--serif);white-space:nowrap}.e1 .kpis span{display:block;margin-top:10px;color:var(--mut);font-size:.9rem;line-height:1.5}
.e1 .wk{display:grid;grid-template-columns:1.2fr 1fr;gap:30px;margin-top:28px}
.e1 .wk small{display:block;font:500 .6rem var(--mono);letter-spacing:.16em;text-transform:uppercase;color:var(--gd2);margin-bottom:10px}
.e1 .wk ol{margin:0;padding-left:20px}.e1 .wk li{margin:0 0 8px;line-height:1.6;color:#2c2f2d;font-size:.96rem}
.e1 .wk .ex{background:var(--iv);padding:20px 22px}.e1 .wk .ex p{margin:0;font:italic 400 1.02rem/1.65 var(--serif);color:#2c2f2d}
.e1 .dpx{font-size:.95rem;color:#f4efe6}.e1 .dpx b{font-weight:600}
.e1 .inv{margin-top:80px}
.e1 .dtw{overflow-x:auto;margin-top:18px}
.e1 .dt{width:100%;border-collapse:collapse;font-size:.9rem;min-width:640px}
.e1 .dt th,.e1d .dt th{font:500 .6rem var(--mono);letter-spacing:.14em;text-transform:uppercase;color:var(--mut,#6b6f6c);text-align:left;padding:10px 12px;border-bottom:1px solid #111}
.e1 .dt td,.e1d .dt td{padding:12px;border-bottom:1px solid rgba(17,17,17,.1);color:#3a3e3b;vertical-align:top;line-height:1.55}
.e1 .dt td:first-child,.e1d .dt td:first-child{font-weight:600;color:#121413}
.e1 .phs{margin-top:56px;border-top:1px solid rgba(244,239,230,.25)}
.e1 .phi{display:grid;grid-template-columns:220px 1fr;gap:40px;padding:34px 0;border-bottom:1px solid rgba(244,239,230,.12)}
.e1 .phi .pk b{display:block;font:300 2rem/1 var(--serif);color:#f4efe6}.e1 .phi .pk span{display:block;margin-top:10px;font:500 .64rem var(--mono);letter-spacing:.14em;text-transform:uppercase;color:var(--gd)}
.e1 .phi h3{color:#f4efe6;font-size:1.35rem}.e1 .phi p{color:var(--dmut);margin:10px 0 0}
.e1 .pm{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:16px}
.e1 .pm span{font-size:.9rem;color:rgba(244,239,230,.85);line-height:1.5}.e1 .pm i{display:block;font:500 .58rem var(--mono);font-style:normal;letter-spacing:.16em;text-transform:uppercase;color:var(--gd);margin-bottom:6px}
.e1 .spl div span em{display:block;font-style:normal;font-size:.8rem;color:var(--mut);margin-top:3px}
.e1 .spl div.ok2 b{color:var(--gr)}.e1 .spl div.gap b{color:#9a5a00}
.e1 .spl div.ok2,.e1 .spl div.gap{font-weight:600}
.e1 .prop{margin-top:50px;background:var(--iv);padding:28px 32px;border-left:2px solid var(--gd2)}
.e1 .prop b{font:500 .64rem var(--mono);letter-spacing:.16em;text-transform:uppercase;color:var(--gd2)}.e1 .prop p{margin:10px 0 0;color:#2c2f2d;font-size:1.02rem;max-width:80ch}
.e1 .nmb{margin-top:56px}
/* reader */
.e1d{position:fixed;inset:0;z-index:99980;font-family:'Plus Jakarta Sans',system-ui,sans-serif;--mono:'JetBrains Mono',monospace;--mut:#6b6f6c}
.e1d .sc{position:absolute;inset:0;background:rgba(8,9,9,.55);opacity:0;transition:opacity .35s}
.e1d aside{position:absolute;top:0;right:0;bottom:0;width:min(820px,100%);background:#f6f1e9;color:#121413;overflow-y:auto;transform:translateX(30px);opacity:0;transition:transform .45s cubic-bezier(.2,.7,.2,1),opacity .35s}
.e1d.on .sc{opacity:1}.e1d.on aside{transform:none;opacity:1}
.e1d .x{position:sticky;top:16px;float:right;margin:16px 16px 0 0;appearance:none;border:1px solid rgba(17,17,17,.25);background:#f6f1e9;width:40px;height:40px;font-size:15px;cursor:pointer;border-radius:2px;z-index:2}
.e1d .bd2{padding:56px 64px 80px}
.e1d .ey{font:500 .66rem 'JetBrains Mono',monospace;letter-spacing:.2em;text-transform:uppercase;color:#9a7838}
.e1d h2{font:600 clamp(1.9rem,3.4vw,2.8rem)/1.05 'Plus Jakarta Sans',sans-serif;letter-spacing:-.03em;margin:14px 0 0;max-width:20ch}
.e1d .dl{font:italic 400 1.18rem/1.55 'Fraunces',Georgia,serif;color:#3a3e3b;margin:18px 0 0;max-width:58ch}
.e1d h3{font:600 1.2rem/1.3 'Plus Jakarta Sans',sans-serif;margin:44px 0 0;padding-top:20px;border-top:1px solid rgba(17,17,17,.14)}
.e1d h3 small{display:block;font:500 .6rem 'JetBrains Mono',monospace;letter-spacing:.14em;text-transform:uppercase;color:#1d5a43;margin-top:6px}
.e1d p{font-size:1.02rem;line-height:1.78;color:#2a2d2b;margin:14px 0 0;max-width:66ch}
.e1d .ol{margin:14px 0 0;padding-left:22px}.e1d .ol li{line-height:1.7;margin-bottom:8px;color:#2a2d2b}
.e1d .gl{margin:14px 0 0;display:grid;grid-template-columns:170px 1fr;gap:12px 24px}.e1d .gl dt{font-weight:600}.e1d .gl dd{margin:0;line-height:1.65;color:#2a2d2b}
.e1d .exq{font:italic 400 1.02rem/1.65 'Fraunces',Georgia,serif;background:#ece4d7;padding:16px 18px}
.e1d .pxl{font:500 .82rem/1.6 'JetBrains Mono',monospace;color:#1d5a43}
.e1d .dtw{overflow-x:auto;margin-top:18px}.e1d .dt{width:100%;border-collapse:collapse;font-size:.88rem;min-width:560px}
.e1d sup.ci a{font:600 .62em 'JetBrains Mono',monospace;color:#9a7838;text-decoration:none;margin-left:2px}
.e1d .dn{display:flex;justify-content:space-between;gap:16px;margin-top:60px;padding-top:20px;border-top:1px solid #111}
.e1d .dn button{appearance:none;background:none;border:0;font:600 .78rem 'Plus Jakarta Sans',sans-serif;letter-spacing:.06em;cursor:pointer;color:#121413;padding:8px 0}
@media (max-width:980px){.e1 .sti{grid-template-columns:44px 1fr;gap:16px}.e1 .sti .pr{grid-column:2}.e1 .kpis{grid-template-columns:1fr}.e1 .wk{grid-template-columns:1fr}.e1 .phi{grid-template-columns:1fr;gap:12px}.e1 .pm{grid-template-columns:1fr}.e1 .rb{flex-wrap:wrap;gap:10px}.e1 .rb span{width:100%}.e1d .bd2{padding:30px 22px 60px}.e1d .gl{grid-template-columns:1fr;gap:4px}.e1d .gl dd{margin-bottom:12px}.e1 .prop{padding:22px}}
`)}
/* 4.2 v2 design: one calm palette (royal green, warm white, gold), modern sans type, big photography, cards, data shown as graphics. */
function css42b(){addCSS('e3',`
.e3{--g9:#0a2219;--g8:#0f2f23;--g6:#1d5a43;--g2:#e7efe9;--gold:#c9a55c;--gold2:#a5833f;--cr:#f7f4ee;--ink:#13201a;--mut:#5d6a63;--line:rgba(19,32,26,.09);--sans:'Plus Jakarta Sans',-apple-system,'Segoe UI',system-ui,sans-serif;--mono:'JetBrains Mono',ui-monospace,monospace;
 font-family:var(--sans);color:var(--ink);background:var(--cr);border-radius:14px;overflow:clip;font-size:16px}
.e3 *{box-sizing:border-box}.e3 button{font-family:inherit;cursor:pointer}
.e3 .w{max-width:1240px;margin:0 auto;padding:0 40px}
.e3 .sec{padding:120px 0}
.e3 .kick{display:inline-flex;align-items:center;gap:10px;font:600 .72rem var(--sans);letter-spacing:.14em;text-transform:uppercase;color:var(--g6)}
.e3 .kick i{font-style:normal;display:inline-grid;place-items:center;width:26px;height:26px;border-radius:50%;background:var(--g6);color:#fff;font-size:.68rem;letter-spacing:0}
.e3 .dk .kick{color:var(--gold)}.e3 .dk .kick i{background:var(--gold);color:var(--g9)}
.e3 h2{font:700 clamp(2.2rem,4.6vw,4rem)/1.04 var(--sans);letter-spacing:-.04em;margin:18px 0 0;max-width:18ch}
.e3 h2 span{color:var(--g6)}.e3 .dk h2 span{color:var(--gold)}
.e3 .sub{font-size:clamp(1.05rem,1.4vw,1.2rem);line-height:1.6;color:var(--mut);max-width:56ch;margin:18px 0 0}
.e3 .dk{background:var(--g9);color:#f3f6f4}.e3 .dk .sub{color:rgba(243,246,244,.7)}
.e3 .hd{display:flex;justify-content:space-between;align-items:flex-end;gap:30px;flex-wrap:wrap}
.e3 .more{appearance:none;display:inline-flex;align-items:center;gap:10px;border:0;background:var(--ink);color:#fff;padding:14px 22px;border-radius:999px;font:600 .82rem var(--sans);transition:transform .2s,background .2s}
.e3 .more:hover{transform:translateY(-2px);background:var(--g6)}.e3 .more svg{width:14px;height:14px}
.e3 .dk .more{background:#fff;color:var(--g9)}.e3 .dk .more:hover{background:var(--gold)}
.e3 .ghost svg{width:14px;height:14px}.e3 .ghost{appearance:none;display:inline-flex;align-items:center;gap:10px;border:1px solid currentColor;background:transparent;color:inherit;padding:13px 22px;border-radius:999px;font:600 .82rem var(--sans)}
.e3 .rv{opacity:0;transform:translateY(26px);transition:opacity .9s cubic-bezier(.2,.7,.2,1),transform .9s cubic-bezier(.2,.7,.2,1)}.e3 .rv.in{opacity:1;transform:none}
.e3 sup.ci a{font:600 .62em var(--mono);color:var(--gold2);text-decoration:none;margin-left:2px}.e3 .dk sup.ci a{color:var(--gold)}
/* hero */
.e3 .hero{position:relative;min-height:100vh;display:flex;align-items:flex-end;color:#fff;overflow:hidden;background:var(--g9)}
.e3 .hero .bg{position:absolute;inset:0;background-size:cover;background-position:center;transform:scale(1.06);animation:e3kb 22s ease-out forwards}@keyframes e3kb{to{transform:scale(1)}}
.e3 .hero .sh{position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,34,25,.15) 0%,rgba(10,34,25,.35) 45%,rgba(10,34,25,.96) 100%)}
.e3 .hero .w{position:relative;width:100%;padding-bottom:64px}
.e3 .crb{font:600 .7rem var(--sans);letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.7)}
.e3 .hero h1{font:800 clamp(3.4rem,9vw,8.4rem)/.9 var(--sans);letter-spacing:-.055em;margin:18px 0 0}
.e3 .hero h1 span{color:var(--gold)}
.e3 .hero p{font-size:clamp(1.1rem,1.6vw,1.35rem);line-height:1.55;max-width:44ch;color:rgba(255,255,255,.82);margin:22px 0 0}
.e3 .hchips{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin-top:44px}
.e3 .hchips div{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);border-radius:18px;padding:18px 20px;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}
.e3 .hchips b{display:block;font:700 2rem/1 var(--sans);letter-spacing:-.03em}.e3 .hchips span{display:block;margin-top:8px;font-size:.84rem;line-height:1.4;color:rgba(255,255,255,.72)}
.e3 .hacts{display:flex;gap:12px;flex-wrap:wrap;margin-top:30px}
/* chapter nav */
.e3 .nav{position:sticky;top:0;z-index:30;background:rgba(247,244,238,.9);backdrop-filter:saturate(1.4) blur(14px);-webkit-backdrop-filter:saturate(1.4) blur(14px);border-bottom:1px solid var(--line)}
.e3 .nav .w{display:flex;gap:4px;align-items:center;overflow-x:auto;scrollbar-width:none;height:56px}.e3 .nav .w::-webkit-scrollbar{display:none}
.e3 .nav b{font:800 .8rem var(--sans);margin-right:14px;color:var(--g6)}
.e3 .nav a{font:600 .78rem var(--sans);color:var(--mut);text-decoration:none;padding:8px 14px;border-radius:999px;white-space:nowrap;transition:background .2s,color .2s}
.e3 .nav a:hover{color:var(--ink)}.e3 .nav a.on{background:var(--ink);color:#fff}
/* stat cards */
.e3 .stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px;margin-top:56px}
.e3 .card{background:#fff;border-radius:24px;padding:28px;box-shadow:0 1px 0 var(--line),0 24px 60px -40px rgba(10,34,25,.35);transition:transform .3s,box-shadow .3s}
.e3 button.card{appearance:none;border:0;text-align:left;width:100%;color:inherit}
.e3 button.card:hover,.e3 a.card:hover{transform:translateY(-4px);box-shadow:0 1px 0 var(--line),0 34px 70px -38px rgba(10,34,25,.45)}
.e3 .stats b{display:block;font:800 clamp(2.4rem,3.6vw,3.4rem)/1 var(--sans);letter-spacing:-.05em;color:var(--g6)}
.e3 .stats p{margin:14px 0 0;font-size:.98rem;line-height:1.5;color:var(--ink)}
.e3 .stats small{display:block;margin-top:16px;font:600 .72rem var(--sans);color:var(--mut)}
.e3 .tag2{display:inline-block;font:600 .66rem var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--g6);background:var(--g2);padding:6px 10px;border-radius:999px}
/* journey carousel */
.e3 .jrl{display:grid;grid-auto-flow:column;grid-auto-columns:min(420px,82vw);gap:20px;overflow-x:auto;scroll-snap-type:x mandatory;padding:56px 40px 26px max(40px,calc((100vw - 1240px)/2 + 40px));scrollbar-width:thin}
.e3 .jc{appearance:none;border:0;padding:0;background:#000;border-radius:26px;overflow:hidden;position:relative;aspect-ratio:3/4;scroll-snap-align:start;color:#fff;text-align:left}
.e3 .jc img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform 1.2s cubic-bezier(.2,.7,.2,1)}
.e3 .jc:hover img{transform:scale(1.05)}
.e3 .jc .ov{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0) 35%,rgba(5,20,14,.92) 100%)}
.e3 .jc .tx{position:absolute;left:24px;right:24px;bottom:24px}
.e3 .jc .d{display:inline-block;font:700 .7rem var(--sans);letter-spacing:.08em;text-transform:uppercase;background:var(--gold);color:var(--g9);padding:6px 10px;border-radius:999px}
.e3 .jc h3{font:700 1.7rem/1.1 var(--sans);letter-spacing:-.03em;margin:14px 0 0}
.e3 .jc p{margin:10px 0 0;font-size:.95rem;line-height:1.45;color:rgba(255,255,255,.82)}
.e3 .jc .n{position:absolute;top:20px;left:24px;font:700 .8rem var(--sans);color:rgba(255,255,255,.85)}
.e3 .jc .pl{position:absolute;top:18px;right:18px;width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.18);display:grid;place-items:center;font-size:20px;line-height:1;backdrop-filter:blur(6px)}
.e3 .railnav{display:flex;gap:10px;justify-content:flex-end}
.e3 .railnav button{appearance:none;width:46px;height:46px;border-radius:50%;border:1px solid rgba(255,255,255,.3);background:transparent;color:#fff;font-size:18px}
.e3 .railnav button:hover{background:#fff;color:var(--g9)}
/* lanes */
.e3 .lanes2{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px;margin-top:56px}
.e3 .ln{appearance:none;border:0;padding:0;text-align:left;background:#fff;border-radius:26px;overflow:hidden;color:inherit;box-shadow:0 24px 60px -40px rgba(10,34,25,.35);transition:transform .3s}
.e3 .ln:hover{transform:translateY(-4px)}
.e3 .ln img{display:block;width:100%;aspect-ratio:16/11;object-fit:cover}
.e3 .ln .bd{padding:24px 26px 26px}
.e3 .ln h3{font:700 1.5rem/1.15 var(--sans);letter-spacing:-.03em;margin:12px 0 0}
.e3 .ln p{margin:10px 0 0;color:var(--mut);font-size:.96rem;line-height:1.5}
.e3 .ln .kv{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:20px;padding-top:18px;border-top:1px solid var(--line)}
.e3 .ln .kv b{display:block;font:800 1.6rem/1 var(--sans);letter-spacing:-.04em;color:var(--g6)}.e3 .ln .kv span{display:block;margin-top:6px;font-size:.78rem;color:var(--mut)}
/* phases */
.e3 .steps3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:56px;counter-reset:s}
.e3 .steps3 .card{position:relative;padding-top:34px}
.e3 .steps3 .card::before{content:"";position:absolute;left:28px;right:28px;top:0;height:4px;border-radius:0 0 4px 4px;background:var(--g2)}
.e3 .steps3 .card.on::before{background:var(--g6)}
.e3 .steps3 h3{font:700 1.3rem/1.2 var(--sans);letter-spacing:-.02em;margin:14px 0 0}.e3 .steps3 p{margin:10px 0 0;color:var(--mut);line-height:1.55;font-size:.96rem}
.e3 .rule{margin-top:22px;display:grid;grid-template-columns:auto 1fr;gap:24px;align-items:center;background:var(--g8);color:#fff;border-radius:24px;padding:26px 30px}
.e3 .rule b{font:800 .72rem var(--sans);letter-spacing:.12em;text-transform:uppercase;color:var(--gold)}
.e3 .rule ol{margin:0;padding:0;list-style:none;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}
.e3 .rule li{font-size:.95rem;line-height:1.45;color:rgba(255,255,255,.88)}.e3 .rule li em{display:block;font:800 1.4rem/1 var(--sans);font-style:normal;color:#fff;margin-bottom:6px}
/* dashboard */
.e3 .dash{background:var(--g9);color:#f3f6f4}.e3 .dash h2 span{color:var(--gold)}.e3 .dash .sub{color:rgba(243,246,244,.7)}.e3 .dash .kick{color:var(--gold)}.e3 .dash .kick i{background:var(--gold);color:var(--g9)}.e3 .dash .more{background:#fff;color:var(--g9)}
.e3 .tabs3{display:inline-flex;gap:6px;background:rgba(255,255,255,.07);padding:6px;border-radius:999px;margin-top:36px}
.e3 .tabs3 button{appearance:none;border:0;background:transparent;color:rgba(255,255,255,.72);padding:11px 20px;border-radius:999px;font:600 .84rem var(--sans)}
.e3 .tabs3 button.on{background:#fff;color:var(--g9)}
.e3 .pane{margin-top:30px;display:grid;grid-template-columns:360px 1fr;gap:22px;align-items:stretch}
.e3 .ctl{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:24px;padding:26px}
.e3 .ctl label{display:block;margin-bottom:22px}.e3 .ctl label>span{display:flex;justify-content:space-between;font-size:.86rem;color:rgba(255,255,255,.75)}.e3 .ctl label>span b{font:700 .95rem var(--sans);color:#fff}
.e3 .ctl input[type=range]{width:100%;margin-top:10px;accent-color:#c9a55c}
.e3 .sg{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}.e3 .sg button{appearance:none;border:1px solid rgba(255,255,255,.18);background:transparent;color:rgba(255,255,255,.85);padding:8px 13px;border-radius:999px;font:600 .76rem var(--sans)}
.e3 .sg button.on{background:var(--gold);border-color:var(--gold);color:var(--g9)}
.e3 .ctl .nt{font-size:.76rem;line-height:1.5;color:rgba(255,255,255,.55);margin-top:8px}
.e3 .ctl .tg{display:flex;gap:10px;align-items:center;font-size:.88rem;color:rgba(255,255,255,.8);cursor:pointer}.e3 .ctl .tg input{accent-color:#c9a55c;width:18px;height:18px}
.e3 .res{background:#fff;color:var(--ink);border-radius:24px;padding:30px 32px}
.e3 .res .top{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}
.e3 .res .top div small{display:block;font:600 .72rem var(--sans);color:var(--mut)}.e3 .res .top div b{display:block;font:800 clamp(1.6rem,2.6vw,2.4rem)/1 var(--sans);letter-spacing:-.04em;margin-top:8px}
.e3 .res .top div:first-child b{color:var(--g6)}
.e3 .stk3{display:flex;height:22px;border-radius:999px;overflow:hidden;margin:28px 0 14px;background:var(--g2)}
.e3 .stk3 i{display:block;height:100%}
.e3 .leg{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px 24px}
.e3 .leg div{display:grid;grid-template-columns:12px 1fr auto;gap:10px;align-items:center;font-size:.86rem;padding:6px 0;border-bottom:1px solid var(--line)}
.e3 .leg i{width:12px;height:12px;border-radius:3px}.e3 .leg b{font:600 .84rem var(--mono)}
.e3 .res .fine{font-size:.78rem;color:var(--mut);line-height:1.5;margin-top:16px}
.e3 .res canvas{width:100%;height:300px;display:block}
.e3 .cyc{position:relative;margin-top:24px}
.e3 .cyc .bar{position:relative;height:56px;border-radius:14px;background:var(--g2);overflow:hidden}
.e3 .cyc .seg2{position:absolute;top:0;bottom:0;display:flex;align-items:center;padding:0 10px;font:600 .74rem var(--sans);color:#fff;white-space:nowrap;overflow:hidden}
.e3 .cyc .ax{display:flex;justify-content:space-between;font:600 .72rem var(--mono);color:var(--mut);margin-top:8px}
.e3 .cyc .evs{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-top:22px}
.e3 .cyc .evs div{border-top:3px solid var(--g6);padding-top:10px}.e3 .cyc .evs small{display:block;font:600 .72rem var(--sans);color:var(--mut)}.e3 .cyc .evs b{display:block;font:800 1.2rem/1.2 var(--sans);margin-top:4px}.e3 .cyc .evs span{display:block;font-size:.8rem;color:var(--mut);margin-top:4px;line-height:1.4}
/* gates */
.e3 .gate2{display:grid;grid-template-columns:1.05fr .95fr;gap:22px;margin-top:56px;align-items:stretch}
.e3 .gg{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.e3 .gg .card{padding:22px}.e3 .gg b{display:inline-grid;place-items:center;width:34px;height:34px;border-radius:10px;background:var(--g2);color:var(--g6);font:800 .9rem var(--sans)}
.e3 .gg h3{font:700 1.06rem/1.25 var(--sans);margin:14px 0 0}.e3 .gg p{margin:6px 0 0;font-size:.88rem;line-height:1.45;color:var(--mut)}
.e3 .photo{position:relative;border-radius:26px;overflow:hidden;min-height:420px}
.e3 .photo img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.e3 .photo .cap{position:absolute;left:18px;bottom:18px;right:18px;background:rgba(10,34,25,.78);color:#fff;border-radius:16px;padding:14px 16px;font-size:.86rem;line-height:1.45;backdrop-filter:blur(8px)}
/* permits */
.e3 .permits{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;margin-top:56px}
.e3 .permits .card{padding:24px;display:flex;flex-direction:column}
.e3 .permits .bod{align-self:flex-start;font:700 .66rem var(--sans);letter-spacing:.1em;padding:5px 9px;border-radius:999px;background:var(--ink);color:#fff}
.e3 .permits .bod.tbs{background:var(--gold2)}.e3 .permits .bod.tra{background:var(--g6)}
.e3 .permits h3{font:700 1.04rem/1.3 var(--sans);margin:14px 0 0}
.e3 .permits .fee{font:800 1.5rem/1.1 var(--sans);letter-spacing:-.03em;color:var(--g6);margin-top:14px}
.e3 .permits p{margin:8px 0 0;font-size:.86rem;line-height:1.45;color:var(--mut)}
/* rhythm */
.e3 .week{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;margin-top:56px}
.e3 .week .card b{display:block;font:800 1.3rem/1 var(--sans);letter-spacing:-.02em}.e3 .week .card span{display:block;margin-top:10px;font-size:.92rem;line-height:1.5;color:var(--mut)}
.e3 .week .card small{display:block;font:700 .66rem var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--g6);margin-bottom:12px}
.e3 .people{display:flex;flex-wrap:wrap;gap:10px;margin-top:22px}
.e3 .people span{background:#fff;border-radius:999px;padding:10px 16px;font:600 .84rem var(--sans);box-shadow:0 1px 0 var(--line)}.e3 .people span em{font-style:normal;color:var(--mut);font-weight:500}
/* risks */
.e3 .acc2{margin-top:50px;display:grid;gap:12px}
.e3 .acc2 details{background:#fff;border-radius:20px;padding:0 26px;box-shadow:0 1px 0 var(--line)}
.e3 .acc2 summary{list-style:none;display:grid;grid-template-columns:1fr auto 24px;gap:20px;align-items:center;padding:22px 0;cursor:pointer;font:700 1.04rem var(--sans)}
.e3 .acc2 summary::-webkit-details-marker{display:none}
.e3 .acc2 summary i{font:600 .7rem var(--sans);font-style:normal;padding:5px 10px;border-radius:999px;background:var(--g2);color:var(--g6)}
.e3 .acc2 summary i.m{background:#f6ecd8;color:#8a6420}
.e3 .acc2 summary::after{content:"+";font:400 1.5rem/1 var(--sans);color:var(--mut);transition:transform .25s}
.e3 .acc2 details[open] summary::after{transform:rotate(45deg)}
.e3 .acc2 p{margin:0 0 22px;color:var(--mut);line-height:1.6;max-width:80ch}
/* end */
.e3 .end{background:var(--g9);color:#f3f6f4}
.e3 .end .tk{font:700 clamp(1.6rem,3vw,2.6rem)/1.25 var(--sans);letter-spacing:-.03em;max-width:28ch;margin:20px 0 0}.e3 .end .tk span{color:var(--gold)}
.e3 .src3{margin-top:70px;padding-top:26px;border-top:1px solid rgba(255,255,255,.12)}
.e3 .src3 summary{cursor:pointer;font:700 .8rem var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--gold)}
.e3 .src3 ol{margin:16px 0 0;padding-left:18px;color:rgba(243,246,244,.62);font-size:.86rem;line-height:1.8}.e3 .src3 a{color:inherit}
.e3 .pgn3{display:flex;justify-content:space-between;gap:16px;margin-top:50px}
.e3 .pgn3 a{flex:1;max-width:380px;text-decoration:none;color:#fff;background:rgba(255,255,255,.06);border-radius:20px;padding:20px 24px}
.e3 .pgn3 a.nx{text-align:right;margin-left:auto}.e3 .pgn3 small{display:block;font:700 .7rem var(--sans);letter-spacing:.1em;color:var(--gold)}.e3 .pgn3 span{display:block;margin-top:6px;font:700 1.1rem var(--sans)}
/* step dialog */
.e3x{position:fixed;inset:0;z-index:99985;display:grid;place-items:center;padding:20px;font-family:'Plus Jakarta Sans',system-ui,sans-serif}
.e3x .sc{position:absolute;inset:0;background:rgba(5,16,11,.6)}
.e3x .bx{position:relative;width:min(980px,100%);max-height:90vh;overflow:auto;background:#fff;border-radius:28px;display:grid;grid-template-columns:1fr 1fr}
.e3x .bx img{width:100%;height:100%;min-height:340px;object-fit:cover}
.e3x .in{padding:34px 34px 30px;color:#13201a}
.e3x .in small{font:700 .7rem 'Plus Jakarta Sans',sans-serif;letter-spacing:.1em;text-transform:uppercase;color:#1d5a43}
.e3x .in h3{font:800 2rem/1.05 'Plus Jakarta Sans',sans-serif;letter-spacing:-.04em;margin:10px 0 0}
.e3x .in p{line-height:1.65;color:#3b4a43;margin:14px 0 0}
.e3x .in ul{list-style:none;margin:18px 0 0;padding:14px 16px;background:#f2f6f3;border-radius:16px;font:500 .78rem/1.9 'JetBrains Mono',monospace;color:#1d5a43}
.e3x .nv{display:flex;justify-content:space-between;margin-top:22px}.e3x .nv button,.e3x .x{appearance:none;color:#13201a;border:1px solid rgba(19,32,26,.15);background:#fff;border-radius:999px;padding:10px 16px;font:600 .8rem 'Plus Jakarta Sans',sans-serif;cursor:pointer}
.e3x .x{position:absolute;top:14px;right:14px;z-index:2}
@media (max-width:980px){.e3 .w{padding:0 20px}.e3 .sec{padding:84px 0}.e3 .hchips,.e3 .stats{grid-template-columns:1fr 1fr}.e3 .lanes2,.e3 .steps3,.e3 .gate2,.e3 .pane{grid-template-columns:1fr}.e3 .permits,.e3 .week{grid-template-columns:1fr 1fr}.e3 .rule{grid-template-columns:1fr}.e3 .rule ol{grid-template-columns:1fr}.e3 .res .top{grid-template-columns:1fr 1fr 1fr}.e3 .leg{grid-template-columns:1fr}.e3 .jrl{padding:40px 20px 20px}.e3 .cyc .evs{grid-template-columns:1fr 1fr}.e3x .bx{grid-template-columns:1fr}.e3x .bx img{min-height:200px;max-height:240px}}
@media (max-width:560px){.e3 .stats,.e3 .permits,.e3 .week,.e3 .gg{grid-template-columns:1fr}.e3 .res{padding:22px}.e3 .res .top{grid-template-columns:1fr}.e3 .acc2 summary{grid-template-columns:1fr 24px}.e3 .acc2 summary i{display:none}}
`)}
/* 4.2 v4 · visual showroom: full-bleed real photography, big figure panels, real charts */
function css42d(){if(!document.getElementById('e5font')){const l=document.createElement('link');l.id='e5font';l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500&display=swap';document.head.appendChild(l)}
addCSS('e5',`
.e5{--g:#1d5a43;--g7:#2f7a5b;--g9:#0b2219;--g1:#eef4f0;--gold:#c9a55c;--gold2:#e6cf9a;--ink:#0e1a15;--tx:#34423c;--mut:#6a766f;--line:#e2e7e4;--bg2:#f4f6f5;--f:'Inter',-apple-system,'Segoe UI',system-ui,sans-serif;--se:'Fraunces',Georgia,serif;
 font-family:var(--f);background:#fff;color:var(--ink);font-size:16px;border-radius:14px;overflow:clip}
.e5 *{box-sizing:border-box}.e5 button{font-family:inherit;cursor:pointer}
.e5 .z5w{max-width:1320px;margin:0 auto;padding:0 56px}
.e5 sup.ci a{font:600 .64em var(--f);color:inherit;opacity:.7;text-decoration:none;margin-left:1px}
.e5 .rv{opacity:0;transform:translateY(18px);transition:opacity .8s ease,transform .8s ease}.e5 .rv.in{opacity:1;transform:none}
.e5 .z5kick{font:700 .74rem var(--f);letter-spacing:.16em;text-transform:uppercase;color:var(--g)}
.e5 .z5h{font:400 clamp(2.2rem,4.2vw,3.7rem)/1.06 var(--se);letter-spacing:-.02em;margin:14px 0 0;max-width:20ch}
.e5 .z5h i{font-style:italic;color:var(--g)}
.e5 .z5lead{font-size:1.14rem;line-height:1.7;color:var(--tx);margin:20px 0 0;max-width:64ch}
.e5 .z5sec{padding:110px 0}
.e5 .z5dark{background:var(--g9);color:#fff}.e5 .z5dark .z5kick{color:var(--gold2)}.e5 .z5dark .z5h i{color:var(--gold2)}.e5 .z5dark .z5lead{color:rgba(255,255,255,.78)}
.e5 .z5grey{background:var(--bg2)}
.e5 .z5more{appearance:none;display:inline-flex;align-items:center;gap:9px;margin-top:36px;background:none;border:0;padding:0 0 3px;font:600 .92rem var(--f);color:var(--g);border-bottom:1px solid currentColor}
.e5 .z5dark .z5more{color:var(--gold2)}.e5 .z5more svg{width:13px;height:13px}
.e5 .z5btn{appearance:none;display:inline-flex;align-items:center;gap:10px;border-radius:999px;padding:14px 22px;font:600 .9rem var(--f);border:1px solid rgba(255,255,255,.5);background:rgba(255,255,255,.08);color:#fff;backdrop-filter:blur(6px)}
.e5 .z5btn.z5solid{background:#fff;color:var(--g9);border-color:#fff}.e5 .z5btn svg{width:14px;height:14px}
.e5 .z5btn.z5g{background:var(--g);border-color:var(--g);color:#fff}
/* cover */
.e5 .z5cov{position:relative;min-height:100vh;display:flex;flex-direction:column;justify-content:flex-end;background:#0b2219 center/cover no-repeat;color:#fff}
.e5 .z5cov::before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(6,20,14,.78) 0%,rgba(6,20,14,.45) 45%,rgba(6,20,14,.05) 75%),linear-gradient(180deg,rgba(6,20,14,.2) 0%,rgba(6,20,14,0) 40%,rgba(6,20,14,.85) 100%)}
.e5 .z5cov>*{position:relative}
.e5 .z5cov small{font:600 .76rem var(--f);letter-spacing:.18em;text-transform:uppercase;color:var(--gold2)}
.e5 .z5cov h1{font:300 clamp(3.4rem,8vw,7.4rem)/.95 var(--se);letter-spacing:-.03em;margin:16px 0 0}
.e5 .z5cov h1 i{font-style:italic;color:var(--gold2)}
.e5 .z5cov p{font-size:1.2rem;line-height:1.55;color:rgba(255,255,255,.86);max-width:52ch;margin:22px 0 0}
.e5 .z5cov .z5row{display:flex;gap:12px;flex-wrap:wrap;margin-top:30px}
.e5 .z5strip{display:grid;grid-template-columns:repeat(4,1fr);margin-top:64px;border-top:1px solid rgba(255,255,255,.22)}
.e5 .z5strip div{padding:26px 26px 34px 0}.e5 .z5strip div+div{padding-left:26px;border-left:1px solid rgba(255,255,255,.22)}
.e5 .z5strip b{display:block;font:400 clamp(2rem,3.4vw,3rem)/1 var(--se);letter-spacing:-.02em}
.e5 .z5strip span{display:block;font-size:.88rem;line-height:1.45;color:rgba(255,255,255,.72);margin-top:10px}
/* contents */
.e5 .z5toc{position:sticky;top:0;z-index:30;background:rgba(255,255,255,.94);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-bottom:1px solid var(--line)}
.e5 .z5toc .z5w{display:flex;overflow-x:auto;scrollbar-width:none;height:54px;align-items:center}.e5 .z5toc .z5w::-webkit-scrollbar{display:none}
.e5 .z5toc a{font:500 .82rem var(--f);color:var(--mut);text-decoration:none;padding:17px 13px;white-space:nowrap;border-bottom:2px solid transparent}
.e5 .z5toc a span{font:600 .72rem var(--f);color:var(--g);margin-right:7px}.e5 .z5toc a.on{color:var(--ink);border-bottom-color:var(--g)}
/* big figure panels */
.e5 .z5stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:0;margin-top:64px;border-top:1px solid rgba(255,255,255,.18)}
.e5 .z5stats>div{padding:36px 30px 6px 0}.e5 .z5stats>div+div{padding-left:30px;border-left:1px solid rgba(255,255,255,.18)}
.e5 .z5stats b{display:block;font:300 clamp(2.8rem,5vw,4.6rem)/1 var(--se);letter-spacing:-.03em;color:var(--gold2)}
.e5 .z5stats h4{font:600 1.02rem/1.35 var(--f);margin:18px 0 0}
.e5 .z5stats p{font-size:.92rem;line-height:1.65;color:rgba(255,255,255,.72);margin:10px 0 0}
.e5 .z5quote{margin:80px 0 0;font:300 italic clamp(1.6rem,3vw,2.5rem)/1.3 var(--se);max-width:30ch}
.e5 .z5quote small{display:block;font:600 .74rem var(--f);font-style:normal;letter-spacing:.14em;text-transform:uppercase;color:var(--gold2);margin-top:16px}
/* journey timeline */
.e5 .z5tl{margin-top:56px}
.e5 .z5tl .z5bar{display:flex;height:58px;gap:2px}
.e5 .z5tl .z5bar div{position:relative;border-radius:4px;display:flex;flex-direction:column;justify-content:center;padding:0 12px;color:#fff;overflow:hidden;min-width:0}
.e5 .z5tl .z5bar b{font:600 .82rem var(--f);white-space:nowrap}.e5 .z5tl .z5bar span{font-size:.72rem;opacity:.82;white-space:nowrap}
.e5 .z5tl .z5ax{position:relative;height:28px;margin-top:8px;font:600 .74rem var(--f);color:var(--mut)}
.e5 .z5tl .z5ax span{position:absolute;transform:translateX(-50%);white-space:nowrap}.e5 .z5tl .z5ax span:first-child{transform:none}.e5 .z5tl .z5ax span:last-child{transform:translateX(-100%)}
.e5 .z5cards{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:12px;margin-top:40px}
.e5 .z5card{appearance:none;border:0;padding:0;background:none;text-align:left;color:inherit}
.e5 .z5card .z5im{border-radius:10px;overflow:hidden;aspect-ratio:3/4;background:#ddd}
.e5 .z5card img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .6s ease}.e5 .z5card:hover img{transform:scale(1.05)}
.e5 .z5card small{display:block;font:700 .7rem var(--f);letter-spacing:.1em;text-transform:uppercase;color:var(--g);margin-top:14px}
.e5 .z5card h4{font:600 1rem/1.3 var(--f);margin:5px 0 0}.e5 .z5card p{font-size:.84rem;line-height:1.55;color:var(--tx);margin:6px 0 0}
/* lanes */
.e5 .z5lanes{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;margin-top:56px}
.e5 .z5lane{background:#fff;border:1px solid var(--line);border-radius:14px;overflow:hidden;display:flex;flex-direction:column}
.e5 .z5lane img{width:100%;aspect-ratio:16/10;object-fit:cover;display:block}
.e5 .z5lane .z5in{padding:26px 26px 28px;display:flex;flex-direction:column;flex:1}
.e5 .z5lane .z5tag{font:700 .7rem var(--f);letter-spacing:.12em;text-transform:uppercase;color:var(--g)}
.e5 .z5lane h3{font:400 1.9rem/1.1 var(--se);margin:8px 0 0}
.e5 .z5lane .z5nums{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:20px 0 4px;padding:16px 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.e5 .z5lane .z5nums b{display:block;font:500 1.5rem/1 var(--se);color:var(--g)}.e5 .z5lane .z5nums span{display:block;font-size:.76rem;color:var(--mut);margin-top:6px;line-height:1.35}
.e5 .z5lane p{font-size:.92rem;line-height:1.65;color:var(--tx);margin:14px 0 0}
.e5 .z5lane p b{color:var(--ink)}
.e5 .z5chart{margin-top:56px;background:#fff;border:1px solid var(--line);border-radius:14px;padding:30px 32px}
.e5 .z5chart h4{font:600 1.02rem var(--f);margin:0}.e5 .z5chart .z5sub{font-size:.86rem;color:var(--mut);margin:6px 0 0}
.e5 .z5hb{margin-top:24px;display:grid;gap:14px}
.e5 .z5hb .z5r{display:grid;grid-template-columns:120px 1fr;gap:16px;align-items:center}
.e5 .z5hb .z5r>span{font:600 .9rem var(--f)}
.e5 .z5hb .z5t{position:relative;height:34px;background:var(--bg2);border-radius:4px}
.e5 .z5hb .z5t i{position:absolute;left:0;top:0;bottom:0;border-radius:4px;background:var(--g);transition:width 1s ease}
.e5 .z5hb .z5t em{position:absolute;top:50%;transform:translateY(-50%);font:600 .84rem var(--f);font-style:normal;color:var(--ink);white-space:nowrap}
.e5 .z5chart .z5fn{font-size:.78rem;color:var(--mut);margin-top:18px;line-height:1.55}
/* photo band */
.e5 .z5band{position:relative;height:78vh;min-height:420px;background:#0b2219 center/cover no-repeat;display:flex;align-items:flex-end}
.e5 .z5band::before{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(6,20,14,0) 30%,rgba(6,20,14,.8) 100%)}
.e5 .z5band .z5w{position:relative;width:100%;padding-bottom:64px;color:#fff}
.e5 .z5band small{font:600 .74rem var(--f);letter-spacing:.16em;text-transform:uppercase;color:var(--gold2)}
.e5 .z5band p{font:300 clamp(1.7rem,3.4vw,3rem)/1.18 var(--se);margin:12px 0 0;max-width:24ch}
/* landed cost */
.e5 .z5split{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:64px;align-items:end;margin-top:56px}
.e5 .z5hero{border-top:3px solid var(--g);padding-top:22px}
.e5 .z5hero b{display:block;font:300 clamp(4.4rem,8vw,7rem)/.95 var(--se);letter-spacing:-.04em;color:var(--g)}
.e5 .z5hero h4{font:600 1.1rem/1.4 var(--f);margin:16px 0 0}.e5 .z5hero p{font-size:.96rem;line-height:1.7;color:var(--tx);margin:12px 0 0}
.e5 .z5hero .z5pair{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:26px}
.e5 .z5hero .z5pair div{background:#fff;border:1px solid var(--line);border-radius:10px;padding:16px 18px}
.e5 .z5hero .z5pair small{display:block;font-size:.76rem;color:var(--mut)}.e5 .z5hero .z5pair strong{display:block;font:500 1.5rem var(--se);margin-top:6px}
.e5 #e5wf svg{display:block;width:100%;height:auto;overflow:visible}
.e5 #e5wf text{font-family:var(--f)}
.e5 .z5tip{position:fixed;z-index:9999;pointer-events:none;background:#0e1a15;color:#fff;font:500 .8rem/1.4 var(--f);padding:8px 11px;border-radius:6px;opacity:0;transition:opacity .12s;max-width:260px}
.e5 .z5tools{margin-top:72px;padding-top:56px;border-top:1px solid var(--line)}
.e5 .z5tools h3{font:400 2rem/1.15 var(--se);margin:0}
/* calculators (reuse markup from d2) */
.e5 .tabs4{display:inline-flex;border:1px solid var(--line);border-radius:999px;overflow:hidden;margin-top:24px;background:#fff}
.e5 .tabs4 button{appearance:none;border:0;background:#fff;padding:11px 20px;font:600 .86rem var(--f);color:var(--mut)}
.e5 .tabs4 button.on{background:var(--g);color:#fff}
.e5 .pane{display:grid;grid-template-columns:300px minmax(0,1fr);gap:20px;margin-top:20px}
.e5 .ctl{background:#fff;border:1px solid var(--line);border-radius:12px;padding:22px}
.e5 .ctl label{display:block;margin-bottom:20px}.e5 .ctl label>span{display:flex;justify-content:space-between;font-size:.86rem;color:var(--tx)}.e5 .ctl label>span b{font:700 .9rem var(--f);color:var(--ink)}
.e5 .ctl input[type=range]{width:100%;margin-top:8px;accent-color:#1d5a43}
.e5 .sg{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}.e5 .sg button{appearance:none;border:1px solid var(--line);background:#fff;padding:7px 12px;border-radius:6px;font:600 .78rem var(--f);color:var(--tx)}.e5 .sg button.on{background:var(--g);border-color:var(--g);color:#fff}
.e5 .ctl .nt{font-size:.76rem;line-height:1.5;color:var(--mut);margin-top:6px}
.e5 .ctl .tg{display:flex;gap:10px;align-items:center;font-size:.88rem;color:var(--tx);cursor:pointer}.e5 .ctl .tg input{accent-color:#1d5a43;width:17px;height:17px}
.e5 .res{border:1px solid var(--line);border-radius:12px;padding:24px 26px;background:#fff}
.e5 .res .top{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;background:var(--line);border:1px solid var(--line);border-radius:10px;overflow:hidden}
.e5 .res .top div{background:#fff;padding:16px 18px}.e5 .res .top small{display:block;font:600 .74rem var(--f);color:var(--mut)}.e5 .res .top b{display:block;font:500 1.6rem/1.1 var(--se);margin-top:8px}
.e5 .res .top div:first-child b{color:var(--g)}
.e5 .stk3{display:flex;gap:2px;height:16px;margin:22px 0 12px}.e5 .stk3 i{display:block;height:100%;border-radius:2px}
.e5 .leg{display:grid;grid-template-columns:1fr 1fr;gap:0 26px}
.e5 .leg div{display:grid;grid-template-columns:11px 1fr auto;gap:10px;align-items:center;font-size:.84rem;padding:7px 0;border-bottom:1px solid var(--line);color:var(--tx)}
.e5 .leg i{width:11px;height:11px;border-radius:2px}.e5 .leg b{font:600 .82rem var(--f);color:var(--ink);white-space:nowrap}
.e5 .res .fine{font-size:.78rem;color:var(--mut);line-height:1.55;margin-top:14px}
.e5 .res canvas{width:100%;height:290px;display:block;margin-top:16px}
.e5 .cyc{margin-top:20px}.e5 .cyc .bar{position:relative;height:42px;border-radius:6px;background:var(--g1);overflow:hidden}
.e5 .cyc .seg2{position:absolute;top:0;bottom:0;display:flex;align-items:center;padding:0 8px;font:600 .72rem var(--f);color:#fff;white-space:nowrap;overflow:hidden;border-right:2px solid #fff}
.e5 .cyc .ax{display:flex;justify-content:space-between;font:600 .72rem var(--f);color:var(--mut);margin-top:6px}
.e5 .cyc .evs{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-top:18px}.e5 .cyc .evs div{border-top:2px solid var(--g);padding-top:8px}.e5 .cyc .evs small{display:block;font:600 .72rem var(--f);color:var(--mut)}.e5 .cyc .evs b{display:block;font:600 1.05rem var(--f);margin-top:3px}.e5 .cyc .evs span{display:block;font-size:.78rem;color:var(--mut);margin-top:3px}
.e5 .z5pair2{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;background:var(--line);border:1px solid var(--line);border-radius:12px;overflow:hidden;margin-top:28px}
.e5 .z5pair2 div{background:#fff;padding:18px 20px}.e5 .z5pair2 small{display:block;font-size:.78rem;color:var(--mut)}.e5 .z5pair2 strong{display:block;font:500 1.55rem/1.1 var(--se);margin-top:8px}.e5 .z5pair2 div:nth-child(2) strong{color:var(--g)}
/* phases */
.e5 .z5ph{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0;margin-top:56px;border-top:1px solid var(--line)}
.e5 .z5ph>div{padding:34px 34px 0 0}.e5 .z5ph>div+div{padding-left:34px;border-left:1px solid var(--line)}
.e5 .z5ph .z5n{font:300 4.4rem/1 var(--se);color:var(--g)}
.e5 .z5ph small{display:block;font:700 .72rem var(--f);letter-spacing:.12em;text-transform:uppercase;color:var(--gold);margin-top:14px}
.e5 .z5ph h4{font:600 1.2rem/1.3 var(--f);margin:8px 0 0}.e5 .z5ph p{font-size:.94rem;line-height:1.7;color:var(--tx);margin:12px 0 0}
.e5 .z5rule{margin-top:64px;background:var(--g9);color:#fff;border-radius:16px;padding:40px 44px}
.e5 .z5rule h4{font:400 1.8rem/1.2 var(--se);margin:0}.e5 .z5rule h4 i{color:var(--gold2)}
.e5 .z5rule .z5c{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:28px;margin-top:28px}
.e5 .z5rule .z5c b{display:block;font:300 3rem/1 var(--se);color:var(--gold2)}.e5 .z5rule .z5c span{display:block;font-size:.94rem;line-height:1.6;color:rgba(255,255,255,.82);margin-top:10px}
/* quality */
.e5 .z5q{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:72px;align-items:start}
.e5 .z5q .z5ph2{position:sticky;top:80px;border-radius:14px;overflow:hidden;aspect-ratio:4/5}.e5 .z5q .z5ph2 img{width:100%;height:100%;object-fit:cover;display:block}
.e5 .z5gl{margin-top:40px;border-top:1px solid var(--line)}
.e5 .z5gl>div{display:grid;grid-template-columns:72px 1fr;gap:12px;padding:26px 0;border-bottom:1px solid var(--line)}
.e5 .z5gl b{font:300 2.8rem/1 var(--se);color:var(--g)}.e5 .z5gl h4{font:600 1.08rem var(--f);margin:4px 0 0}.e5 .z5gl p{font-size:.94rem;line-height:1.65;color:var(--tx);margin:8px 0 0}
/* permits */
.e5 .z5ag{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:56px}
.e5 .z5ag>div{border:1px solid var(--line);border-radius:14px;padding:30px;background:#fff}
.e5 .z5ag b{display:block;font:400 3.2rem/1 var(--se);color:var(--g)}.e5 .z5ag h4{font:600 1rem var(--f);margin:14px 0 0}.e5 .z5ag p{font-size:.9rem;line-height:1.6;color:var(--tx);margin:8px 0 0}
.e5 .z5tbw{overflow-x:auto;margin-top:40px}
.e5 .z5tb{width:100%;border-collapse:collapse;font-size:.92rem;background:#fff}
.e5 .z5tb th{text-align:left;font:600 .7rem var(--f);letter-spacing:.1em;text-transform:uppercase;color:var(--mut);border-bottom:2px solid var(--ink);padding:10px 12px}
.e5 .z5tb td{padding:14px 12px;border-bottom:1px solid var(--line);vertical-align:top;line-height:1.55;color:var(--tx)}
.e5 .z5tb td:first-child{font-weight:600;color:var(--ink)}
.e5 .z5pill{display:inline-block;font:700 .66rem var(--f);letter-spacing:.08em;padding:4px 9px;border-radius:999px;background:var(--g1);color:var(--g);white-space:nowrap}
.e5 .z5pill.z5m{background:#f7efdf;color:#7a5a1c}
/* team */
.e5 .z5wk{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px;margin-top:56px}
.e5 .z5wk>div{border-top:3px solid var(--g);padding-top:18px}.e5 .z5wk b{font:400 1.7rem var(--se)}.e5 .z5wk p{font-size:.92rem;line-height:1.65;color:var(--tx);margin:10px 0 0}
/* cash */
.e5 #e5cc svg{display:block;width:100%;height:auto;overflow:visible}.e5 #e5cc text{font-family:var(--f)}
.e5 .z5cf{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:28px}
.e5 .z5cf div{border-top:1px solid var(--line);padding-top:14px}.e5 .z5cf b{display:block;font:400 2.4rem/1 var(--se);color:var(--g)}.e5 .z5cf span{display:block;font-size:.86rem;color:var(--mut);margin-top:8px;line-height:1.45}
.e5 .z5two{display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-top:44px}
.e5 .z5two h4{font:600 1.08rem var(--f);margin:0}.e5 .z5two p{font-size:.96rem;line-height:1.7;color:var(--tx);margin:10px 0 0}
/* risks */
.e5 .z5rk{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:56px}
.e5 .z5rk>div{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.14);border-radius:14px;padding:28px}
.e5 .z5rk h4{font:600 1.04rem/1.35 var(--f);margin:14px 0 0}.e5 .z5rk p{font-size:.9rem;line-height:1.65;color:rgba(255,255,255,.74);margin:10px 0 0}
.e5 .z5dark .z5pill{background:rgba(255,255,255,.1);color:#bfe0cf}.e5 .z5dark .z5pill.z5m{background:rgba(201,165,92,.18);color:var(--gold2)}
/* closing */
.e5 .z5end{position:relative;background:#0b2219 center/cover no-repeat;color:#fff;padding:140px 0 70px}
.e5 .z5end::before{content:"";position:absolute;inset:0;background:rgba(6,20,14,.86)}
.e5 .z5end>*{position:relative}
.e5 .z5end h2{font:300 clamp(1.8rem,3.2vw,2.8rem)/1.25 var(--se);max-width:34ch;margin:16px 0 0}
.e5 .z5end details{margin-top:56px;border-top:1px solid rgba(255,255,255,.16);padding-top:20px}.e5 .z5end summary{cursor:pointer;font:700 .84rem var(--f);color:var(--gold2)}
.e5 .z5end ol{margin:14px 0 0;padding-left:18px;font-size:.86rem;line-height:1.8;color:rgba(255,255,255,.7)}.e5 .z5end ol a{color:inherit}
.e5 .z5pg{display:flex;justify-content:space-between;gap:16px;margin-top:44px}.e5 .z5pg a{color:#fff;text-decoration:none;border:1px solid rgba(255,255,255,.22);border-radius:12px;padding:18px 22px;min-width:220px}.e5 .z5pg a.z5nx{text-align:right;margin-left:auto}.e5 .z5pg small{display:block;font:700 .7rem var(--f);color:var(--gold2)}.e5 .z5pg span{display:block;margin-top:4px;font-weight:600}
@media (max-width:1100px){.e5 .z5cards{grid-template-columns:repeat(4,minmax(0,1fr))}}
@media (max-width:900px){.e5 .z5w{padding:0 20px}.e5 .z5sec{padding:72px 0}
 .e5 .z5strip,.e5 .z5stats{grid-template-columns:1fr 1fr}.e5 .z5strip div,.e5 .z5stats>div{padding:20px 14px 20px 0!important;border-left:0!important}.e5 .z5strip div:nth-child(even),.e5 .z5stats>div:nth-child(even){padding-left:14px!important;border-left:1px solid rgba(255,255,255,.18)!important}
 .e5 .z5lanes,.e5 .z5split,.e5 .z5ph,.e5 .z5rule .z5c,.e5 .z5q,.e5 .z5ag,.e5 .z5wk,.e5 .z5two,.e5 .z5rk,.e5 .pane,.e5 .z5cf{grid-template-columns:minmax(0,1fr);gap:24px}
 .e5 .z5ph>div{padding:28px 0 0!important;border-left:0!important}.e5 .z5q .z5ph2{position:static;aspect-ratio:16/10}
 .e5 .z5cards{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;margin-right:-20px;padding-right:20px}.e5 .z5card{flex:0 0 62%;scroll-snap-align:start}
 .e5 .z5tl .z5bar b,.e5 .z5tl .z5bar span{display:none}.e5 .z5tl .z5bar{height:22px}.e5 .z5tlk{display:grid!important}
 .e5 .z5chart,.e5 .z5rule{padding:24px 20px}.e5 .z5hb .z5r{grid-template-columns:78px 1fr}.e5 .leg{grid-template-columns:1fr}.e5 .res .top{grid-template-columns:1fr}.e5 .cyc .evs{grid-template-columns:1fr 1fr}.e5 .z5tb{min-width:640px}.e5 .z5stats{grid-template-columns:1fr}.e5 .z5stats>div:nth-child(n){padding:24px 0!important;border-left:0!important;border-bottom:1px solid rgba(255,255,255,.14)}.e5 .z5stats b{font-size:3.2rem}.e5 .z5tl .z5ax{display:none}.e5 #e5cc{overflow-x:auto}.e5 #e5cc svg{min-width:680px}.e5 .z5pair2{grid-template-columns:1fr}.e5 #e5wf{overflow-x:auto}.e5 #e5wf svg{min-width:720px}.e5 .z5band{height:60vh}.e5 .z5cov{min-height:92vh}.e5 .z5pg{flex-direction:column}.e5 .z5pg a{min-width:0}}
.e5 .z5tlk{display:none;grid-template-columns:repeat(5,auto);gap:6px 14px;margin-top:10px;font-size:.76rem;color:var(--tx)}.e5 .z5tlk i{display:inline-block;width:9px;height:9px;border-radius:2px;margin-right:6px}
`)}
/* 4.2 v5 · corporate logistics look (Maersk / DHL reference): bold sans, white cards, strong brand blocks, square corners */
function css42e(){addCSS('e6',`
.e5{--se:var(--f);--g:#145c43;--g9:#0a2b20;--acc:#19a974;--bg2:#f4f6f5;border-radius:0}
.e5 .z5h{font:700 clamp(2rem,3.6vw,3.2rem)/1.08 var(--f);letter-spacing:-.025em;max-width:22ch}
.e5 .z5h i{font-style:normal;color:var(--g)}.e5 .z5dark .z5h i{color:#7fd3ae}
.e5 .z5kick{font:700 .78rem var(--f);letter-spacing:.06em;color:var(--g)}.e5 .z5dark .z5kick{color:#7fd3ae}
.e5 .z5lead{font-size:1.12rem}
.e5 .z5more{border:1px solid currentColor;padding:12px 18px;border-radius:4px;font-weight:700}
.e5 .z5more:hover{background:var(--g);color:#fff;border-color:var(--g)}.e5 .z5dark .z5more{color:#fff;border-color:rgba(255,255,255,.5)}.e5 .z5dark .z5more:hover{background:#fff;color:var(--g9)}
.e5 .z5btn{border-radius:4px;font-weight:700;backdrop-filter:none}
/* hero with white panel */
.e5 .z6hero{position:relative;height:86vh;min-height:560px;background:#0a2b20 center/cover no-repeat}
.e5 .z6hero::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(10,43,32,.35),rgba(10,43,32,0) 60%)}
.e5 .z6panel{position:absolute;z-index:1;left:56px;bottom:64px;width:min(620px,calc(100% - 112px));background:#fff;padding:40px 44px 36px;border-top:6px solid var(--acc)}
.e5 .z6panel small{font:700 .78rem var(--f);letter-spacing:.06em;color:var(--g)}
.e5 .z6panel h1{font:800 clamp(2.4rem,4.4vw,3.8rem)/1.02 var(--f);letter-spacing:-.035em;margin:12px 0 0;color:var(--ink)}
.e5 .z6panel p{font-size:1.06rem;line-height:1.6;color:var(--tx);margin:16px 0 0}
.e5 .z6panel .z5row{display:flex;gap:10px;flex-wrap:wrap;margin-top:24px}
.e5 .z6b{appearance:none;display:inline-flex;align-items:center;gap:10px;border-radius:4px;padding:14px 20px;font:700 .9rem var(--f);border:1px solid var(--g);background:var(--g);color:#fff}
.e5 .z6b.z6o{background:#fff;color:var(--g)}.e5 .z6b svg{width:14px;height:14px}.e5 .z6b:hover{filter:brightness(1.1)}
.e5 .z6kpi{background:var(--g9);color:#fff}
.e5 .z6kpi .z5w{display:grid;grid-template-columns:repeat(4,minmax(0,1fr))}
.e5 .z6kpi div div{padding:30px 26px 32px 0}.e5 .z6kpi div div+div{padding-left:26px;border-left:1px solid rgba(255,255,255,.14)}
.e5 .z6kpi b{display:block;font:800 2.4rem/1 var(--f);letter-spacing:-.03em}.e5 .z6kpi span{display:block;font-size:.88rem;line-height:1.45;color:rgba(255,255,255,.72);margin-top:10px}
/* stats, quotes, bands */
.e5 .z5stats b{font:800 clamp(2.4rem,4vw,3.6rem)/1 var(--f);letter-spacing:-.035em;color:#fff}
.e5 .z5stats>div{border-top:4px solid var(--acc);margin-top:-1px}
.e5 .z5quote{font:700 clamp(1.4rem,2.4vw,2rem)/1.3 var(--f);font-style:normal;letter-spacing:-.015em;border-left:6px solid var(--acc);padding-left:24px}
.e5 .z5band p{font:700 clamp(1.5rem,3vw,2.6rem)/1.15 var(--f);letter-spacing:-.025em}
.e5 .z5band small,.e5 .z5cov small{color:#7fd3ae}
/* cards and panels */
.e5 .z5lane,.e5 .z5chart,.e5 .z5ag>div,.e5 .ctl,.e5 .res,.e5 .z5pair2,.e5 .z5rk>div{border-radius:4px}
.e5 .z5lane{transition:box-shadow .25s}.e5 .z5lane:hover{box-shadow:0 12px 30px rgba(10,43,32,.12)}
.e5 .z5lane h3{font:800 1.6rem/1.15 var(--f);letter-spacing:-.02em}
.e5 .z5lane .z5nums b,.e5 .z5pair2 strong,.e5 .res .top b{font:800 1.45rem/1.1 var(--f);letter-spacing:-.02em}
.e5 .z5card .z5im{border-radius:4px}.e5 .z5q .z5ph2{border-radius:4px}
.e5 .z5hero b{font:800 clamp(4rem,7vw,6rem)/.95 var(--f);letter-spacing:-.05em}
.e5 .z5ph .z5n,.e5 .z5gl b{font:800 3.2rem/1 var(--f);letter-spacing:-.04em;color:var(--acc)}
.e5 .z5rule{border-radius:4px}.e5 .z5rule h4{font:700 1.5rem/1.25 var(--f)}.e5 .z5rule h4 i{font-style:normal;color:#7fd3ae}.e5 .z5rule .z5c b{font:800 2.6rem/1 var(--f);color:#7fd3ae}
.e5 .z5ag b{font:800 2.6rem/1 var(--f);letter-spacing:-.03em}.e5 .z5wk b{font:800 1.4rem var(--f)}.e5 .z5cf b{font:800 2rem/1 var(--f);letter-spacing:-.03em}
.e5 .tabs4{border-radius:4px}.e5 .z5end h2{font:700 clamp(1.5rem,2.6vw,2.2rem)/1.3 var(--f);letter-spacing:-.015em}
.e5 .z5end details summary,.e5 .z5pg small{color:#7fd3ae}.e5 .z5pg a{border-radius:4px}
.e5 .z5toc a span{color:var(--acc)}
/* how it works */
.e5 .z6steps{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:0;margin-top:56px;counter-reset:s}
.e5 .z6steps>div{position:relative;padding:0 22px 0 0}
.e5 .z6steps>div::before{content:"";position:absolute;left:0;right:0;top:23px;height:2px;background:var(--line)}
.e5 .z6steps>div:last-child::before{right:auto;width:46px}
.e5 .z6steps .z6n{position:relative;display:flex;align-items:center;justify-content:center;width:48px;height:48px;background:var(--g);color:#fff;font:800 1.1rem var(--f)}
.e5 .z6steps small{display:block;font:700 .72rem var(--f);letter-spacing:.06em;color:var(--acc);margin-top:22px;text-transform:uppercase}
.e5 .z6steps h4{font:800 1.12rem/1.25 var(--f);margin:6px 0 0}.e5 .z6steps p{font-size:.9rem;line-height:1.6;color:var(--tx);margin:10px 0 0}
.e5 .z6who{font:600 .78rem/1.4 var(--f);color:var(--g);margin-top:12px;padding-top:10px;border-top:1px solid var(--line)}
/* catalogue */
.e5 .z6cat{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:56px}
.e5 .z6cat>div{background:#fff;border:1px solid var(--line);border-top:4px solid var(--g);border-radius:4px;padding:26px}
.e5 .z6cat h4{font:800 1.12rem/1.3 var(--f);margin:0}.e5 .z6cat p{font-size:.9rem;line-height:1.6;color:var(--tx);margin:8px 0 0}
.e5 .z6cat dl{display:grid;grid-template-columns:auto 1fr;gap:8px 14px;margin:18px 0 0;padding-top:16px;border-top:1px solid var(--line);font-size:.84rem}
.e5 .z6cat dt{color:var(--mut)}.e5 .z6cat dd{margin:0;font-weight:600;color:var(--ink)}
/* suppliers + terms */
.e5 .z6sup{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:40px}
.e5 .z6sup>div{background:#fff;border:1px solid var(--line);border-radius:4px;padding:22px 24px}
.e5 .z6sup b{display:block;font:800 1.05rem var(--f)}.e5 .z6sup span{display:block;font-size:.84rem;color:var(--mut);margin-top:4px}.e5 .z6sup p{font-size:.88rem;line-height:1.55;color:var(--tx);margin:10px 0 0}
.e5 .z6flag{margin-top:16px;background:#fff7e6;border-left:4px solid #c9a55c;padding:14px 18px;font-size:.9rem;line-height:1.55;color:#5b4413;border-radius:0 4px 4px 0}
.e5 .z6terms{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;margin-top:56px}
.e5 .z6terms>div{background:#fff;border:1px solid var(--line);border-radius:4px;overflow:hidden}
.e5 .z6terms h4{margin:0;background:var(--g9);color:#fff;font:800 1.05rem var(--f);padding:18px 24px}
.e5 .z6terms ul{list-style:none;margin:0;padding:6px 24px 14px}
.e5 .z6terms li{display:grid;grid-template-columns:150px 1fr;gap:16px;padding:14px 0;border-bottom:1px solid var(--line);font-size:.9rem;line-height:1.55;color:var(--tx)}
.e5 .z6terms li:last-child{border-bottom:0}.e5 .z6terms li b{color:var(--ink);font-weight:700}
.e5 .z6tag{display:inline-block;font:700 .64rem var(--f);letter-spacing:.06em;text-transform:uppercase;background:#fff7e6;color:#7a5a1c;padding:2px 7px;border-radius:3px;margin-left:6px;vertical-align:1px}
@media (max-width:1100px){.e5 .z6steps{grid-template-columns:repeat(3,minmax(0,1fr));row-gap:40px}}
@media (max-width:900px){.e5 .z6panel{left:20px;right:20px;width:auto;bottom:24px;padding:26px 22px}.e5 .z6hero{height:auto;min-height:0;padding-top:46vh;padding-bottom:24px}.e5 .z6panel{position:relative;left:auto;right:auto;bottom:auto;margin:0 20px}
 .e5 .z6kpi .z5w{grid-template-columns:1fr 1fr}.e5 .z6kpi div div{padding:20px 12px 20px 0!important;border-left:0!important}.e5 .z6kpi div div:nth-child(even){padding-left:14px!important;border-left:1px solid rgba(255,255,255,.14)!important}.e5 .z6kpi b{font-size:1.8rem}
 .e5 .z6steps{grid-template-columns:1fr;row-gap:28px}.e5 .z6steps>div::before{left:23px;right:auto;top:0;bottom:-28px;width:2px;height:auto}.e5 .z6steps>div{padding:0 0 0 70px}.e5 .z6steps .z6n{position:absolute;left:0;top:0}.e5 .z6steps small{margin-top:4px}.e5 .z6steps>div:last-child::before{display:none}
 .e5 .z6cat,.e5 .z6sup,.e5 .z6terms{grid-template-columns:1fr}.e5 .z6terms li{grid-template-columns:1fr;gap:4px}}
`)}
/* 4.2 v6 · black, green and gold (matches the showroom frame) + explainer boxes */
function css42f(){addCSS('e7',`
.e5{--ink:#f2f5f2;--tx:#c3cdc7;--mut:#8b9890;--line:rgba(255,255,255,.1);--bg2:#0b1712;--g:#3fbf87;--g9:#0f241a;--g1:rgba(63,191,135,.12);--acc:#c9a55c;--gold:#c9a55c;--gold2:#e2c88c;--pn:#0d1b15;
 background:#060d0a;color:var(--ink)}
.e5 .z5sec{background:#060d0a}.e5 .z5grey{background:#0a1611}.e5 .z5dark{background:linear-gradient(180deg,#0f241a,#0a1a13)}
.e5 .z5h i,.e5 .z5dark .z5h i{color:var(--gold2)}.e5 .z5kick,.e5 .z5dark .z5kick{color:var(--gold)}
.e5 .z5lead,.e5 .z5dark .z5lead{color:var(--tx)}
.e5 .z5more,.e5 .z5dark .z5more{color:var(--gold2);border-color:rgba(201,165,92,.55)}.e5 .z5more:hover,.e5 .z5dark .z5more:hover{background:var(--gold);color:#060d0a;border-color:var(--gold)}
/* hero */
.e5 .z6hero::after{background:linear-gradient(90deg,rgba(6,13,10,.7),rgba(6,13,10,.1) 65%),linear-gradient(180deg,rgba(6,13,10,0) 60%,#060d0a 100%)}
.e5 .z6panel{background:rgba(6,13,10,.88);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border-top:4px solid var(--gold);border-left:1px solid rgba(201,165,92,.25);border-right:1px solid rgba(201,165,92,.25);border-bottom:1px solid rgba(201,165,92,.25)}
.e5 .z6panel small{color:var(--gold)}.e5 .z6panel h1{color:#fff}.e5 .z6panel p{color:var(--tx)}
.e5 .z6b{background:var(--gold);border-color:var(--gold);color:#060d0a}.e5 .z6b.z6o{background:transparent;color:var(--gold2);border-color:rgba(201,165,92,.6)}
.e5 .z6kpi{background:#060d0a;border-top:1px solid rgba(201,165,92,.25);border-bottom:1px solid rgba(201,165,92,.25)}.e5 .z6kpi b{color:var(--gold2)}
.e5 .z6kpi div div+div{border-left-color:rgba(201,165,92,.2)}
.e5 .z5toc{background:rgba(6,13,10,.92);border-bottom-color:rgba(201,165,92,.2)}.e5 .z5toc a{color:var(--mut)}.e5 .z5toc a.on{color:#fff;border-bottom-color:var(--gold)}.e5 .z5toc a span{color:var(--gold)}
/* steps, cards */
.e5 .z6steps .z6n{background:var(--gold);color:#060d0a}.e5 .z6steps small{color:var(--g)}.e5 .z6who{color:var(--gold2);border-top-color:var(--line)}
.e5 .z5stats{border-top-color:rgba(201,165,92,.25)}.e5 .z5stats>div{border-top-color:var(--gold)}.e5 .z5stats b{color:var(--gold2)}.e5 .z5stats>div+div{border-left-color:var(--line)}
.e5 .z5stats p{color:var(--tx)}.e5 .z5quote{border-left-color:var(--gold);color:#fff}.e5 .z5quote small{color:var(--gold)}
.e5 .z6cat>div,.e5 .z6sup>div,.e5 .z5lane,.e5 .z5chart,.e5 .z5ag>div,.e5 .z6terms>div,.e5 .ctl,.e5 .res,.e5 .z5rk>div{background:var(--pn);border-color:var(--line)}
.e5 .z6cat>div{border-top-color:var(--gold)}.e5 .z6cat dd,.e5 .z6sup b{color:#fff}
.e5 .z5lane:hover{box-shadow:0 0 0 1px rgba(201,165,92,.45)}.e5 .z5lane .z5tag{color:var(--gold)}.e5 .z5lane .z5nums b{color:var(--gold2)}.e5 .z5lane p b{color:#fff}
.e5 .z6flag{background:rgba(201,165,92,.1);border-left-color:var(--gold);color:var(--gold2)}
.e5 .z6terms h4{background:#143826;border-bottom:1px solid rgba(201,165,92,.3)}.e5 .z6terms li b{color:#fff}.e5 .z6tag{background:rgba(201,165,92,.16);color:var(--gold2)}
.e5 .z5card small{color:var(--gold)}.e5 .z5card h4{color:#fff}
.e5 .z5hb .z5t{background:rgba(255,255,255,.06)}.e5 .z5hb .z5t i{background:linear-gradient(90deg,#1f7a55,#3fbf87)}.e5 .z5hb .z5t em{color:#fff}
.e5 .z5hero{border-top-color:var(--gold)}.e5 .z5hero b{color:var(--gold2)}
.e5 .z5pair2{background:var(--line);border-color:var(--line)}.e5 .z5pair2 div{background:var(--pn)}.e5 .z5pair2 div:nth-child(2) strong{color:var(--gold2)}
.e5 .z5ph{border-top-color:var(--line)}.e5 .z5ph>div+div{border-left-color:var(--line)}.e5 .z5ph .z5n,.e5 .z5gl b{color:var(--gold)}.e5 .z5ph small{color:var(--g)}
.e5 .z5rule{background:#0f241a;border:1px solid rgba(201,165,92,.3)}.e5 .z5rule .z5c b,.e5 .z5rule h4 i{color:var(--gold2)}
.e5 .z5gl,.e5 .z5gl>div{border-color:var(--line)}
.e5 .z5ag b{color:var(--gold2)}.e5 .z5wk>div{border-top-color:var(--gold)}.e5 .z5cf b{color:var(--gold2)}.e5 .z5cf div{border-top-color:var(--line)}
.e5 .z5tb{background:transparent}.e5 .z5tb th{color:var(--gold);border-bottom-color:rgba(201,165,92,.5)}.e5 .z5tb td{border-bottom-color:var(--line)}.e5 .z5tb td:first-child{color:#fff}
.e5 .z5pill{background:rgba(63,191,135,.14);color:#8fe0bb}.e5 .z5pill.z5m{background:rgba(201,165,92,.16);color:var(--gold2)}
.e5 .z5band::before{background:linear-gradient(180deg,rgba(6,13,10,.1) 20%,rgba(6,13,10,.92) 100%)}.e5 .z5band small{color:var(--gold)}
.e5 .z5end::before{background:rgba(6,13,10,.9)}.e5 .z5end details summary,.e5 .z5pg small{color:var(--gold)}
/* tools */
.e5 .z5tools{border-top-color:var(--line)}.e5 .z5tools h3{color:#fff}
.e5 .tabs4{background:transparent;border-color:rgba(201,165,92,.4)}.e5 .tabs4 button{background:transparent;color:var(--tx)}.e5 .tabs4 button.on{background:var(--gold);color:#060d0a}
.e5 .ctl label>span{color:var(--tx)}.e5 .ctl label>span b{color:#fff}.e5 .ctl input[type=range]{accent-color:#c9a55c}
.e5 .sg button{background:transparent;border-color:var(--line);color:var(--tx)}.e5 .sg button.on{background:var(--gold);border-color:var(--gold);color:#060d0a}
.e5 .res .top{background:var(--line);border-color:var(--line)}.e5 .res .top div{background:var(--pn)}.e5 .res .top div:first-child b{color:var(--gold2)}
.e5 .leg div{border-bottom-color:var(--line);color:var(--tx)}.e5 .leg b{color:#fff}
.e5 .cyc .bar{background:rgba(255,255,255,.05)}.e5 .cyc .seg2{border-right-color:#060d0a}.e5 .cyc .evs div{border-top-color:var(--gold)}.e5 .cyc .evs b{color:#fff}
/* charts on dark */
.e5 #e5wf text,.e5 #e5cc text{fill:#c3cdc7}.e5 #e5wf text[font-weight="600"],.e5 #e5wf text[font-weight="700"],.e5 #e5cc text[font-weight="600"]{fill:#fff}
.e5 #e5wf line,.e5 #e5cc line{stroke:rgba(255,255,255,.1)}.e5 #e5cc line[stroke="#0e1a15"]{stroke:rgba(201,165,92,.7)}
.e5 #e5wf rect[fill="#0e1a15"]{fill:#c9a55c}.e5 #e5wf rect[fill="#0f2f23"]{fill:#2a6e52}.e5 #e5wf rect[fill="#1d5a43"]{fill:#3fbf87}.e5 #e5wf rect[fill="#c9a55c"]{fill:#8a6e35}.e5 #e5wf rect[fill="#9aa6a0"]{fill:#55615b}
.e5 #e5cc path[stroke]{stroke:#3fbf87}.e5 #e5cc path[fill^="rgba"]{fill:rgba(63,191,135,.12)}.e5 #e5cc circle{fill:#060d0a;stroke:#c9a55c}
.e5 .z5tip{background:#c9a55c;color:#060d0a;font-weight:600}
/* step dialog dark */
.e3x .bx{background:#0d1b15!important;color:#f2f5f2;border:1px solid rgba(201,165,92,.35);border-radius:4px!important}
.e3x .in small{color:#c9a55c!important}.e3x .in h3{color:#fff!important}.e3x .in p{color:#c3cdc7!important}
.e3x .in ul{background:rgba(201,165,92,.08)!important;color:#e2c88c!important;border-radius:2px!important}.e3x .in ul li{color:#e2c88c!important}
.e3x button{background:transparent!important;color:#e2c88c!important;border:1px solid rgba(201,165,92,.5)!important;border-radius:4px!important}.e3x .x{background:rgba(6,13,10,.88)!important}.e3x button:hover{background:#c9a55c!important;color:#060d0a!important}
/* explainer box */
.e5 .z7x{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);margin-top:56px;border:1px solid rgba(201,165,92,.35);background:linear-gradient(180deg,rgba(201,165,92,.06),rgba(201,165,92,.02))}
.e5 .z7x>div{padding:30px 34px}.e5 .z7x>div+div{border-left:1px solid rgba(201,165,92,.25)}
.e5 .z7x h5{margin:0;font:700 .76rem var(--f);letter-spacing:.12em;text-transform:uppercase;color:var(--gold)}
.e5 .z7x p{margin:12px 0 0;font-size:.98rem;line-height:1.75;color:var(--tx)}.e5 .z7x p b{color:#fff}
.e5 .z7x ol{margin:14px 0 0;padding:0;list-style:none;counter-reset:x}
.e5 .z7x li{counter-increment:x;display:grid;grid-template-columns:28px 1fr auto;gap:10px;align-items:baseline;padding:10px 0;border-bottom:1px solid var(--line);font-size:.92rem;line-height:1.55;color:var(--tx)}
.e5 .z7x li::before{content:counter(x);font:700 .78rem var(--f);color:#060d0a;background:var(--gold);width:22px;height:22px;display:flex;align-items:center;justify-content:center}
.e5 .z7x li b{font-weight:700;color:var(--gold2);white-space:nowrap}
.e5 .z7x .z7so{margin-top:16px;padding:14px 16px;background:rgba(63,191,135,.1);border-left:3px solid #3fbf87;font-size:.92rem;line-height:1.6;color:#d8efe3}
.e5 .z7x .z7so b{color:#8fe0bb}
@media (max-width:900px){.e5 .z7x{grid-template-columns:1fr}.e5 .z7x>div{padding:22px 20px}.e5 .z7x>div+div{border-left:0;border-top:1px solid rgba(201,165,92,.25)}.e5 .z7x li{grid-template-columns:28px 1fr}.e5 .z7x li b{grid-column:2;white-space:normal}}
`)}
/* 4.2 v4 render · visual showroom */
const TT=(head,rows)=>`<div class="dtw"><table class="dt"><thead><tr>${head.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const MORE=(k,en,sw)=>`<button type="button" class="z5more" data-deep="${k}">${T(en||'Read the full explanation',sw||'Soma maelezo kamili')}${ARW}</button>`;
const CH2=[];
const CH5=[['e2-why',['Why it matters','Kwa nini ni muhimu']],['e2-trip',['The journey','Safari']],['e2-lanes',['Where we buy','Tunanunua wapi']],['e2-dash',['True cost','Gharama halisi']],['e2-phase',['The plan','Mpango']],['e2-gate',['Quality','Ubora']],['e2-law',['Permits','Vibali']],['e2-team',['Team','Timu']],['e2-cash',['Stock and cash','Stoku na pesa']],['e2-risk',['Risks','Hatari']]];
const SEC=(id,cls,inner)=>`<section class="z5sec ${cls||''}" id="${id}"><div class="z5w">${inner}${xp(id)}</div></section>`;
let HN=0;const HEAD=(n,kick,h,lead)=>`<div class="z5kick rv">${String(++HN).padStart(2,'0')} · ${kick}</div><h2 class="z5h rv">${h}</h2>${lead?`<p class="z5lead rv">${lead}</p>`:''}`;
const BAND5=(k,lab,txt)=>`<div class="z5band" style="background-image:url(${IM(k)})"><div class="z5w"><small class="rv">${L(lab)}</small><p class="rv">${L(txt)}</p></div></div>`;
const JSEG=[[0,30,'#0f2f23',['Production','Uzalishaji']],[30,34,'#2f7a5b',['Inspection','Ukaguzi']],[34,70,'#4f8f74',['At sea','Baharini']],[70,78,'#a5833f',['Customs','Forodha']],[78,82,'#c9a55c',['Hub','Kituo']]];

function wfData(){const c=lcCalc(),u=LC.units,g=ix=>ix.reduce((a,i)=>a+(c.r[i]?c.r[i][1]:0),0)/u,net=c.gross/(1+LCC.vat);
 return {c,steps:[[['Factory price','Bei ya kiwanda'],g([0]),'b'],[['Freight and insurance','Usafiri na bima'],g([1]),'a'],[['Import duty','Ushuru'],g([2]),'a'],[['Levies and TMDA fees','Tozo na ada za TMDA'],g([3,4,8]),'a'],[['Inspection and bank','Ukaguzi na benki'],g([5,6]),'a'],[['Clearing and truck','Forodha na lori'],g([7,9]),'a'],[['Landed cost','Gharama halisi'],c.per,'t'],[['Retail margin 32%','Faida ya rejareja 32%'],net-c.per,'m'],[['VAT 18%','VAT 18%'],c.gross-net,'v'],[['Shelf price','Bei ya rafuni'],c.gross,'t2']]}}
function wfSVG(){const {steps}=wfData(),W=980,H=430,P={l:8,r:8,t:34,b:78},n=steps.length,bw=(W-P.l-P.r)/n,mx=steps[n-1][1]*1.04,Y=v=>H-P.b-v/mx*(H-P.t-P.b);let run=0,out='';
 const col={b:'#0f2f23',a:'#4f8f74',t:'#1d5a43',m:'#c9a55c',v:'#9aa6a0',t2:'#0e1a15'};
 for(let g=0;g<=4;g++){const v=mx/4*g;out+=`<line x1="${P.l}" x2="${W-P.r}" y1="${Y(v)}" y2="${Y(v)}" stroke="#e2e7e4" stroke-width="1"/>`}
 steps.forEach((s,i)=>{const v=s[1];let y0,y1;if(s[2]==='b'||s[2]==='t'||s[2]==='t2'){y0=0;y1=v;run=v}else{y0=run;y1=run+v;run=y1}
  const x=P.l+i*bw+bw*.14,w=bw*.72,top=Y(y1),h=Math.max(2,Y(y0)-Y(y1));
  out+=`<g class="z5wb" data-tip="${E(L(s[0]))}: ${TS(v)}"><rect x="${x}" y="${top}" width="${w}" height="${h}" rx="3" fill="${col[s[2]]}"/><rect x="${x-bw*.14}" y="${P.t-20}" width="${bw}" height="${H-P.t-P.b+20}" fill="transparent"/>`;
  out+=`<text x="${x+w/2}" y="${top-8}" text-anchor="middle" font-size="13" font-weight="600" fill="#0e1a15">${v>=1e4?(v/1000).toFixed(1)+'k':NF(v)}</text>`;
  const words=L(s[0]).split(' ');let l1='',l2='';words.forEach(wd=>{(l1+' '+wd).trim().length<=13&&!l2?l1=(l1+' '+wd).trim():l2=(l2+' '+wd).trim()});
  out+=`<text x="${x+w/2}" y="${H-P.b+22}" text-anchor="middle" font-size="12" fill="${/t/.test(s[2])?'#0e1a15':'#6a766f'}" font-weight="${/t/.test(s[2])?700:500}">${E(l1)}</text>${l2?`<text x="${x+w/2}" y="${H-P.b+38}" text-anchor="middle" font-size="12" fill="${/t/.test(s[2])?'#0e1a15':'#6a766f'}" font-weight="${/t/.test(s[2])?700:500}">${E(l2)}</text>`:''}</g>`;
  if(i<n-1&&s[2]!=='t2'){const nx=P.l+(i+1)*bw+bw*.14;out+=`<line x1="${x+w}" x2="${nx}" y1="${Y(run)}" y2="${Y(run)}" stroke="#9aa6a0" stroke-width="1" stroke-dasharray="3 3"/>`}});
 out+=`<text x="${P.l}" y="${H-12}" font-size="12" fill="#6a766f">${T('TSh per unit · values in thousands (k)','TSh kwa kipande · thamani kwa maelfu (k)')}</text>`;
 return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${T('Waterfall of costs from factory price to shelf price','Mporomoko wa gharama kutoka bei ya kiwanda hadi bei ya rafuni')}">${out}</svg>`}

function ccData(){const c=lcCalc(),f=LC.fob*LC.units*FX,dep=f*.3,bal=f*.7+(LCC.inspUsd+LCC.bank)*FX,port=c.tot-dep-bal,net=c.gross/(1+LCC.vat),sell=Math.ceil(LC.units/RO.sales),pts=[[0,0],[0,-dep],[30,-dep],[30,-dep-bal],[72,-dep-bal],[72,-c.tot]];
 let pay=null;for(let d=82;d<=82+sell;d++){const v=-c.tot+(d-82)*RO.sales*net;pts.push([d,Math.min(v,-c.tot+LC.units*net)]);if(pay===null&&v>=0)pay=d}
 return {c,pts,pay,sell,dep,bal,port,net,end:82+sell}}
function ccSVG(){const {pts,c,pay,end}=ccData(),W=980,H=360,P={l:70,r:20,t:24,b:44},xm=Math.max(end,120),mn=-c.tot*1.12,mx=Math.max(pts[pts.length-1][1],0)*1.15+c.tot*.08,X=d=>P.l+d/xm*(W-P.l-P.r),Y=v=>P.t+(mx-v)/(mx-mn)*(H-P.t-P.b);let o='';
 for(let g=0;g<=4;g++){const v=mn+(mx-mn)/4*g;o+=`<line x1="${P.l}" x2="${W-P.r}" y1="${Y(v)}" y2="${Y(v)}" stroke="#e2e7e4"/><text x="${P.l-10}" y="${Y(v)+4}" text-anchor="end" font-size="12" fill="#6a766f">${(v/1e6).toFixed(1)}M</text>`}
 o+=`<line x1="${P.l}" x2="${W-P.r}" y1="${Y(0)}" y2="${Y(0)}" stroke="#0e1a15" stroke-width="1.2"/>`;
 [0,30,72,82].concat(pay?[pay]:[]).forEach(d=>{o+=`<text x="${X(d)}" y="${H-16}" text-anchor="middle" font-size="12" fill="#6a766f">${T('day','siku')} ${d}</text>`});
 const path=pts.map((p,i)=>(i?'L':'M')+X(p[0]).toFixed(1)+' '+Y(p[1]).toFixed(1)).join(' ');
 o+=`<path d="${path} L${X(pts[pts.length-1][0])} ${Y(0)} L${X(0)} ${Y(0)} Z" fill="rgba(29,90,67,.10)"/><path d="${path}" fill="none" stroke="#1d5a43" stroke-width="2.5" stroke-linejoin="round"/>`;
 const lo=-c.tot;o+=`<circle cx="${X(72)}" cy="${Y(lo)}" r="5" fill="#fff" stroke="#1d5a43" stroke-width="2"/><text x="${X(72)+10}" y="${Y(lo)+20}" font-size="13" font-weight="600" fill="#0e1a15">${T('Deepest point','Kina cha chini')} −${TM(c.tot)}</text>`;
 if(pay)o+=`<circle cx="${X(pay)}" cy="${Y(0)}" r="5" fill="#c9a55c"/><text x="${X(pay)}" y="${Y(0)-12}" text-anchor="middle" font-size="13" font-weight="600" fill="#0e1a15">${T('Cash back','Pesa imerudi')}</text>`;
 return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${T('Cash position of one import over time','Hali ya pesa ya uagizaji mmoja kwa muda')}">${o}</svg>`}
function ccFigs(){const {c,pay,sell}=ccData();return `<div><b>${TM(c.tot)}</b><span>${T('paid out before the first unit is sold','kinalipwa kabla kipande cha kwanza hakijauzwa')}</span></div><div><b>82 ${T('days','siku')}</b><span>${T('from deposit to the first sale','tangu amana hadi mauzo ya kwanza')}</span></div><div><b>${pay?pay+' '+T('days','siku'):T('not reached','haijafikiwa')}</b><span>${T(`until the cash is back, selling ${RO.sales} a day`,`hadi pesa irudi, ukiuza ${RO.sales} kwa siku`)}</span></div>`}

function cover5(){const c=lcCalc();return `<header class="z5cov" id="e2-top" style="background-image:url(${IM('hero')})"><div class="z5w" style="padding-top:120px">
 <small class="rv">${T('Part 4 · The engine · 4.2','Sehemu 4 · Injini · 4.2')}</small>
 <h1 class="rv">${T('Sourcing<br><i>and supply</i>','Upatikanaji<br><i>na ugavi</i>')}</h1>
 <p class="rv">${T('How Afya Basics buys only registered products, brings them in legally, knows the true cost of every item and keeps every shelf full.','Afya Basics inavyonunua bidhaa zilizosajiliwa tu, kuziingiza kihalali, kujua gharama halisi ya kila bidhaa na kuweka kila rafu ikiwa imejaa.')}</p>
 <div class="z5row rv"><button class="z5btn z5solid" type="button" data-film="0">${PLY}${T('Watch the 1-minute journey','Tazama safari ya dakika 1')}</button><button class="z5btn" type="button" data-jump="e2-dash">${T('See the true cost','Ona gharama halisi')}${ARW}</button></div>
 <div class="z5strip rv"><div><b>3</b><span>${T('supply lanes: Tanzania, China and India','njia za ugavi: Tanzania, China na India')}</span></div><div><b>6</b><span>${T('quality gates before anything is sold','milango ya ubora kabla ya kuuza chochote')}</span></div><div><b>${(c.per/c.fac).toFixed(2)}×</b><span>${T('factory price, once landed in Dar es Salaam','bei ya kiwanda, ikifika Dar es Salaam')}</span></div><div><b>${TM(MM.stock)}</b><span>${T('opening stock in the seed budget','stoku ya kufungulia kwenye bajeti ya mtaji')}</span></div></div></div></header>
 <nav class="z5toc" aria-label="${T('Contents','Yaliyomo')}"><div class="z5w">${CH5.map((c,i)=>`<a href="#${c[0]}" data-jump="${c[0]}"><span>${String(i+1).padStart(2,'0')}</span>${L(c[1])}</a>`).join('')}</div></nav>`}

function why5(){const c=lcCalc();return SEC('e2-why','z5dark',HEAD(1,T('Why it matters','Kwa nini ni muhimu'),T('Sourcing decides whether customers can <i>trust the shelf</i>','Upatikanaji unaamua kama wateja wanaweza <i>kuamini rafu</i>'),T('A health store is only as trustworthy as what it sells. Four facts make buying the first line of quality, not a back-office job.','Duka la afya linaaminika kadiri ya kile linachouza. Ukweli wanne unafanya ununuzi kuwa mstari wa kwanza wa ubora, si kazi ya ofisini tu.'))+
 `<div class="z5stats">
 <div class="rv"><b>1 ${T('in','kati ya')} 10</b><h4>${T('medical products is substandard or fake','ya bidhaa za afya haina ubora au ni bandia')}</h4><p>${T('The WHO estimate for low- and middle-income countries. A shop that buys on price alone passes that risk to the family that trusted it.','Makadirio ya WHO kwa nchi za kipato cha chini na kati. Duka linalonunua kwa bei tu linahamisha hatari hiyo kwa familia iliyoliamini.')}${C('who.int')}</p></div>
 <div class="rv"><b>6 ${T('weeks','wiki')}</b><h4>${T('notice for a TMDA import permit','taarifa ya kibali cha TMDA cha kuingiza')}</h4><p>${T('Then a month at sea and a week in customs. An order placed late means about three months with an empty shelf.','Kisha mwezi baharini na wiki forodhani. Oda iliyochelewa ni takriban miezi mitatu ya rafu tupu.')}${C('import-and-export-control-of-medical-devices')}</p></div>
 <div class="rv"><b>${(c.per/c.fac).toFixed(2)}×</b><h4>${T('the factory price, once it lands','bei ya kiwanda, ikifika')}</h4><p>${T('Freight, duty, levies, permits and clearing add about two thirds to a small order. Pricing from the factory price destroys the margin.','Usafiri, ushuru, tozo, vibali na forodha vinaongeza takriban theluthi mbili kwenye oda ndogo. Kuweka bei kutoka bei ya kiwanda kunaua faida.')}</p></div>
 <div class="rv"><b>0</b><h4>${T('tolerance for empty shelves','uvumilivu wa rafu tupu')}</h4><p>${T('When glucose strips run out, the customer goes elsewhere. For members, a stock-out also breaks a box that is already paid for.','Vipande vya sukari vikiisha, mteja anaenda kwingine. Kwa wanachama, kuishiwa pia kunavunja box iliyokwisha kulipiwa.')}</p></div></div>
 <p class="z5quote rv">${T('“Registered, checked and traceable, or it does not go on our shelf.”','“Imesajiliwa, imekaguliwa na inafuatilika, la sivyo haiwekwi rafuni kwetu.”')}<small>${T('The Afya Basics buying rule','Kanuni ya ununuzi ya Afya Basics')}</small></p>${MORE('why','Read the full explanation and glossary','Soma maelezo kamili na kamusi')}`)}

function trip5(){const P=d=>d/82*100;return SEC('e2-trip','',HEAD(2,T('The journey','Safari'),T('One import, <i>factory to shelf</i> in 82 days','Uagizaji mmoja, <i>kiwandani hadi rafuni</i> kwa siku 82'),T('We follow 200 upper-arm blood-pressure monitors from a factory in Shenzhen to our shelf in Dar es Salaam. Each stage is recorded in the stock system, so we always know where an order is and what it has cost so far.','Tunafuata mashine 200 za presha za mkono wa juu kutoka kiwanda Shenzhen hadi rafu yetu Dar es Salaam. Kila hatua inarekodiwa kwenye mfumo wa stoku, kwa hiyo tunajua oda iko wapi na imegharimu kiasi gani hadi sasa.'))+
 `<div class="z5tl rv"><div class="z5bar">${JSEG.map(s=>`<div style="flex:${s[1]-s[0]};background:${s[2]}" title="${E(L(s[3]))}: ${T('days','siku')} ${s[0]}–${s[1]}"><b>${L(s[3])}</b><span>${s[1]-s[0]} ${T('days','siku')}</span></div>`).join('')}</div>
 <div class="z5ax">${[0,30,34,70,78,82].map((d,i,a)=>`<span style="left:${P(d)}%;${i===a.length-1?'left:100%':''}">${i===0?T('Day 0','Siku 0'):d}</span>`).join('')}</div>
 <div class="z5tlk">${JSEG.map(s=>`<span><i style="background:${s[2]}"></i>${L(s[3])} · ${s[1]-s[0]}</span>`).join('')}</div></div>
 <div class="z5cards">${SALE.map((s,i)=>`<button type="button" class="z5card rv" data-step="${i}"><div class="z5im"><img src="${IM(s.img)}" alt="" loading="lazy"></div><small>${L(s.t)}</small><h4>${L(s.h)}</h4><p>${L(s.s)}</p></button>`).join('')}</div>
 ${MORE('trip','Follow the documents for this import','Fuatilia nyaraka za uagizaji huu')}`)}

function lanes5(){const ord=[[LANES[2],'recv',['1–7','1–7'],['days order to shelf','siku oda hadi rafu'],['Delivered','Inafikishwa'],['by the wholesaler','na muuzaji']],[LANES[0],'factory',['~84','~84'],['days order to shelf','siku oda hadi rafu'],['US$111','US$111'],['per m³, shared container','kwa m³, kontena la pamoja']],[LANES[1],'gates',['~45','~45'],['days order to shelf','siku oda hadi rafu'],['10–14','10–14'],['days at sea to Dar','siku baharini hadi Dar']]];
 const bars=[[T('Tanzania','Tanzania'),7,T('1–7 days','siku 1–7')],[T('India','India'),45,T('about 45 days','takriban siku 45')],[T('China','China'),84,T('about 84 days','takriban siku 84')]];
 return `<section class="z5sec z5grey" id="e2-lanes"><div class="z5w">${HEAD(3,T('Where we buy','Tunanunua wapi'),T('Three supply lanes, <i>one rulebook</i>','Njia tatu za ugavi, <i>kanuni moja</i>'),T('Licensed Tanzanian wholesalers supply every regulated item at launch, because their goods are already registered and cleared. Factories in China and India become direct sources from store 2, once sales show which products sell steadily enough to import.','Wauzaji wa jumla wa Tanzania wenye leseni wanasambaza kila bidhaa inayodhibitiwa mwanzoni, kwa sababu bidhaa zao tayari zimesajiliwa na kutolewa forodhani. Viwanda vya China na India vinakuwa vyanzo vya moja kwa moja kuanzia duka la 2, mauzo yakionyesha bidhaa zipi zinauzwa kwa uthabiti wa kutosha kuagiza.'))}
 <div class="z5lanes">${ord.map((o,i)=>{const l=o[0];return `<article class="z5lane rv"><img src="${IM(o[1])}" alt="" loading="lazy"><div class="z5in"><span class="z5tag">${i?T('From store 2','Kuanzia duka la 2'):T('From day one','Tangu siku ya kwanza')}</span><h3>${L(l.k)}</h3><div class="z5nums"><div><b>${L(o[2])}</b><span>${L(o[3])}</span></div><div><b>${L(o[4])}</b><span>${L(o[5])}${i===1?C('5688'):i===2?C('dpworld'):''}</span></div></div><p><b>${T('Supplies','Inasambaza')}:</b> ${L(l.what)}</p><p>${L(l.why)}</p></div></article>`}).join('')}</div>
 <div class="z5chart rv"><h4>${T('Order-to-shelf time by lane','Muda wa oda hadi rafu kwa kila njia')}</h4><p class="z5sub">${T('Days from purchase order to the product being on sale. Longer lanes need earlier orders and more safety stock.','Siku tangu oda hadi bidhaa kuwa sokoni. Njia ndefu zinahitaji kuagiza mapema na akiba zaidi ya usalama.')}</p>
 <div class="z5hb">${bars.map(b=>`<div class="z5r"><span>${b[0]}</span><div class="z5t" title="${b[0]}: ${b[2]}"><i style="width:${b[1]/90*100}%"></i><em style="left:calc(${b[1]/90*100}% + 10px)">${b[2]}</em></div></div>`).join('')}</div>
 <p class="z5fn">${T('China freight: US$102–163 per m³ in a shared container, US$2,100–3,800 for a full 20-foot container.','Usafiri wa China: US$102–163 kwa m³ kwenye kontena la pamoja, US$2,100–3,800 kwa kontena kamili la futi 20.')}${C('sino-shipping')}${C('greathensen')}</p></div>
 ${xp('e2-lanes')}${MORE('lanes','How we find, test and pay suppliers','Tunavyopata, kujaribu na kulipa wasambazaji')}</div></section>`}

function dash5(){const c=lcCalc();return SEC('e2-dash','',HEAD(4,T('True cost','Gharama halisi'),T('The landed cost of a <i>US$10.80</i> monitor','Gharama halisi ya mashine ya <i>US$10.80</i>'),T('Every product is priced from its landed cost: the factory price plus every charge needed to put it on our shelf. The chart follows one monitor from Shenzhen to the shelf, using published TRA and TMDA rates, real freight quotes and today’s exchange rate.','Kila bidhaa inawekewa bei kutoka gharama yake halisi: bei ya kiwanda pamoja na kila gharama ya kuifikisha rafuni. Chati inafuata mashine moja kutoka Shenzhen hadi rafuni, kwa viwango vilivyochapishwa vya TRA na TMDA, bei halisi za usafiri na kiwango cha ubadilishaji cha leo.'))+
 `<div class="z5split"><div class="z5hero rv"><b id="e5x">${(c.per/c.fac).toFixed(2)}×</b><h4>${T('the factory price, once landed in Dar es Salaam','bei ya kiwanda, ikifika Dar es Salaam')}</h4></div>
 <div class="rv"><p class="z5lead" style="margin:0">${T('Duty is planned at 25% until a licensed clearing agent confirms the tariff line. Import VAT is paid at the port and reclaimed, so it is not part of our cost. Clearing and the truck are estimates until quoted.','Ushuru umepangwa kwa 25% hadi wakala wa forodha mwenye leseni athibitishe mstari wa ushuru. VAT ya uagizaji inalipwa bandarini na kurudishwa, kwa hiyo si sehemu ya gharama yetu. Forodha na lori ni makadirio hadi nukuu zipatikane.')}${C('TAXES_AND_DUTIES')}${C('1718887575')}</p>
 <div class="z5pair2"><div><small>${T('Factory price','Bei ya kiwanda')}</small><strong id="e5f">${TS(c.fac)}</strong></div><div><small>${T('Landed cost','Gharama halisi')}</small><strong id="e5l">${TS(c.per)}</strong></div><div><small>${T('Shelf price incl. VAT','Bei ya rafuni pamoja na VAT')}</small><strong id="e5s">${TS(c.gross)}</strong></div></div></div></div>
 <div class="z5chart rv"><h4>${T('From factory price to shelf price, per monitor','Kutoka bei ya kiwanda hadi bei ya rafuni, kwa mashine moja')}</h4><p class="z5sub">${T('Each bar adds one charge. Dark bars are totals. Hover a bar for the exact amount.','Kila nguzo inaongeza gharama moja. Nguzo nzito ni jumla. Weka kielekezi juu ya nguzo kwa kiasi kamili.')}</p><div id="e5wf" style="margin-top:22px">${wfSVG()}</div></div>
 <div class="z5tools"><h3 class="rv">${T('Try it yourself','Jaribu mwenyewe')}</h3><p class="z5lead rv" style="margin-top:10px">${T('Change the factory price, the order size or the duty band, test a reorder rule, or see how long one import ties up cash. The chart above updates with the landed-cost tool.','Badili bei ya kiwanda, ukubwa wa oda au kiwango cha ushuru, jaribu kanuni ya kuagiza, au ona uagizaji mmoja unafunga pesa kwa muda gani. Chati ya juu inabadilika pamoja na zana ya gharama halisi.')}</p>
 <div class="tabs4 rv" role="tablist">${[['land',T('Landed cost','Gharama halisi')],['reo',T('Reorder engine','Injini ya kuagiza')],['cash',T('Cash cycle','Mzunguko wa pesa')]].map((t,i)=>`<button type="button" data-tab3="${t[0]}" class="${i?'':'on'}">${t[1]}</button>`).join('')}</div>
 <div id="e2pane"></div><div id="e2dm"></div></div>`)}

function phase5(){return SEC('e2-phase','',HEAD(5,T('The plan','Mpango'),T('Buy locally first, <i>then import what is proven</i>','Nunua ndani kwanza, <i>kisha agiza kilichothibitishwa</i>'),T('Importing too early ties cash up in products we have not yet proven we can sell. Each phase is unlocked by real sales data, not by a date.','Kuagiza mapema mno kunafunga pesa kwenye bidhaa ambazo bado hatujathibitisha tunaweza kuziuza. Kila awamu inafunguliwa na takwimu halisi za mauzo, si tarehe.'))+
 `<div class="z5ph">${PHS.map((p,i)=>`<div class="rv"><div class="z5n">0${i+1}</div><small>${L(p.t)}</small><h4>${L(p.h)}</h4><p>${L(p.d)}</p></div>`).join('')}</div>
 <div class="z5rule rv"><h4>${T('The switch rule: a product moves to direct import <i>only when all three are true</i>','Kanuni ya kubadili: bidhaa inahamia kuagizwa moja kwa moja <i>pale tu zote tatu ni kweli</i>')}</h4><div class="z5c"><div><b>3+</b><span>${T('months of steady sales, recorded by the till','miezi ya mauzo thabiti, yaliyorekodiwa na mashine ya mauzo')}</span></div><div><b>20%</b><span>${T('or more below the local wholesale price, after every fee','au zaidi chini ya bei ya jumla ya ndani, baada ya kila ada')}</span></div><div><b>TSh 300k</b><span>${T('TMDA importing-warehouse permit held by the hub','kibali cha TMDA cha ghala la kuagiza kinashikiliwa na kituo')}${C('1718887575')}</span></div></div></div>
 ${MORE('phase','When to import, and what it changes for the margin','Lini kuagiza, na kinavyobadilisha faida')}`)}

function gate5(){return SEC('e2-gate','',`<div class="z5q"><div class="z5ph2 rv"><img src="${IM('gates')}" alt="" loading="lazy"></div><div>${HEAD(6,T('Quality','Ubora'),T('Six gates, <i>no exceptions</i>','Milango sita, <i>bila kuachia</i>'),T('The gates live in the stock system, not in anyone’s memory. A batch that has not passed gate five cannot be sold, because the till refuses its barcode.','Milango iko kwenye mfumo wa stoku, si kwenye kumbukumbu ya mtu. Kundi ambalo halijapita mlango wa tano haliwezi kuuzwa, kwa sababu mashine ya mauzo inakataa msimbopau wake.'))}
 <div class="z5gl">${GATES.map((g,i)=>`<div class="rv"><b>${i+1}</b><div><h4>${L(g[0])}</h4><p>${L(g[1])}${i===3?C('qualityinspection'):''}</p></div></div>`).join('')}</div>${MORE('gate','What happens when a product fails','Kinachotokea bidhaa ikishindwa')}</div></div>`)}

function law5(){return SEC('e2-law','z5grey',HEAD(7,T('Permits','Vibali'),T('Every permit, <i>with its fee and timing</i>','Kila kibali, <i>na ada yake na muda wake</i>'),T('Three public bodies govern health products in Tanzania. The order is fixed: premises first, then product registration, then a permit for every consignment.','Taasisi tatu za umma zinaongoza bidhaa za afya Tanzania. Mpangilio ni thabiti: jengo kwanza, kisha usajili wa bidhaa, kisha kibali kwa kila mzigo.'))+
 `<div class="z5ag"><div class="rv"><b>TMDA</b><h4>${T('Medicines and medical devices','Dawa na vifaa tiba')}</h4><p>${T('Registers premises and products, issues import permits, charges 2% of FOB as an import fee.','Inasajili majengo na bidhaa, inatoa vibali vya kuingiza, inatoza 2% ya FOB kama ada ya kuingiza.')}${C('1718887575')}</p></div><div class="rv"><b>TBS</b><h4>${T('Cosmetics and personal care','Vipodozi na huduma binafsi')}</h4><p>${T('Has regulated cosmetics since 2019; imports are checked against standards before release.','Imedhibiti vipodozi tangu 2019; bidhaa zinazoingizwa zinakaguliwa dhidi ya viwango kabla ya kuruhusiwa.')}${C('newscentraltv')}</p></div><div class="rv"><b>TRA</b><h4>${T('Duties, levies and VAT','Ushuru, tozo na VAT')}</h4><p>${T('Collects import duty, the 2% railway levy, the 0.6% processing fee and 18% import VAT.','Inakusanya ushuru wa forodha, tozo ya reli ya 2%, ada ya uchakataji ya 0.6% na VAT ya uagizaji ya 18%.')}${C('TAXES_AND_DUTIES')}</p></div></div>
 <div class="z5tbw rv"><table class="z5tb"><thead><tr><th>${T('Requirement','Sharti')}</th><th>${T('Body','Taasisi')}</th><th>${T('What it means for Afya Basics','Maana yake kwa Afya Basics')}</th></tr></thead><tbody>${LAW.map(r=>`<tr><td>${L(r[0])}</td><td><span class="z5pill">${L(r[1])}</span></td><td>${L(r[2])}${C(r[3])}</td></tr>`).join('')}</tbody></table></div>
 ${MORE('law','How a permit is obtained, step by step','Kibali kinavyopatikana, hatua kwa hatua')}`)}

function team5(){return SEC('e2-team','',HEAD(8,T('Team','Timu'),T('A small team on a <i>fixed weekly rhythm</i>','Timu ndogo kwa <i>mpangilio thabiti wa wiki</i>'),T('No extra salaries at launch. Buying is driven by the system’s reorder list, and every week has the same moments.','Hakuna mishahara ya ziada mwanzoni. Ununuzi unaendeshwa na orodha ya kuagiza ya mfumo, na kila wiki ina nyakati zilezile.'))+
 `<div class="z5wk">${WEEK.map(w=>`<div class="rv"><b>${L(w[0])}</b><p>${L(w[1])}</p></div>`).join('')}</div>
 <div class="z5tbw rv"><table class="z5tb"><thead><tr><th>${T('Role','Jukumu')}</th><th>${T('Responsibility','Wajibu')}</th></tr></thead><tbody>${ROLES.map(r=>`<tr><td>${L(r[0])}</td><td>${L(r[1])}</td></tr>`).join('')}</tbody></table></div>
 ${MORE('team','The twelve weeks before opening, week by week','Wiki kumi na mbili kabla ya kufungua, wiki kwa wiki')}`)}

function cash5(){return SEC('e2-cash','z5grey',HEAD(9,T('Stock and cash','Stoku na pesa'),T('Stock is <i>cash sitting on a shelf</i>','Stoku ni <i>pesa iliyokaa rafuni</i>'),T('The chart shows our cash position for the example import: two payments to the factory, then freight, duty and fees at the port, then sales slowly paying it back. This is why the plan buys locally at launch.','Chati inaonyesha hali ya pesa kwa uagizaji wa mfano: malipo mawili kwa kiwanda, kisha usafiri, ushuru na ada bandarini, kisha mauzo yakirudisha pesa taratibu. Ndiyo sababu mpango unanunua ndani mwanzoni.'))+
 `<div class="z5chart rv"><h4>${T('Cash position of one import, TSh','Hali ya pesa ya uagizaji mmoja, TSh')}</h4><p class="z5sub">${T('200 monitors, 30% deposit at order, 70% after inspection, selling 2 a day. Change the inputs in the Cash cycle tool above.','Mashine 200, amana 30% wakati wa kuagiza, 70% baada ya ukaguzi, zikiuzwa 2 kwa siku. Badili vipengele kwenye zana ya Mzunguko wa pesa hapo juu.')}${C('jingsourcing')}</p><div id="e5cc" style="margin-top:18px">${ccSVG()}</div><div class="z5cf" id="e5cf">${ccFigs()}</div></div>
 <div class="z5two"><div class="rv"><h4>${T('Why local buying protects cash','Kwa nini kununua ndani kunalinda pesa')}</h4><p>${T(`A local order is on the shelf within a week and sold within weeks, so suppliers are paid from sales. An import is paid for months before it earns anything. The ${TM(MM.stock)} opening stock covers about ${Math.round(MM.stock/(MM.cogs1/30))} days of month-1 sales and ${Math.round(MM.stock/(MM.cogs12/30))} days at month-12 pace, so reorders are funded by what sells.`,`Oda ya ndani iko rafuni ndani ya wiki na kuuzwa ndani ya wiki chache, kwa hiyo wasambazaji wanalipwa kutoka mauzo. Uagizaji unalipwa miezi kabla haujaingiza chochote. Stoku ya kufungulia ya ${TM(MM.stock)} inatosha takriban siku ${Math.round(MM.stock/(MM.cogs1/30))} za mauzo ya mwezi 1 na siku ${Math.round(MM.stock/(MM.cogs12/30))} kwa kasi ya mwezi 12, kwa hiyo kuagiza kunalipiwa na kinachouzwa.`)}</p></div>
 <div class="rv"><h4>${T('How the system keeps stock lean','Mfumo unavyoweka stoku nyembamba')}</h4><p>${T('Order sizes are capped at a set number of days of sales, slow sellers are flagged after 60 days without a sale, and box products are bought against members’ confirmed choices, so the hub never holds stock nobody asked for.','Ukubwa wa oda una kikomo cha siku fulani za mauzo, bidhaa zinazouzwa polepole zinawekewa alama baada ya siku 60 bila kuuzwa, na bidhaa za box zinanunuliwa kulingana na machaguo yaliyothibitishwa ya wanachama, kwa hiyo kituo hakishiki stoku ambayo hakuna aliyeiomba.')}</p></div></div>
 ${MORE('cash','The cash cycle of one import, day by day','Mzunguko wa pesa wa uagizaji mmoja, siku kwa siku')}`)}

function risk5(){return SEC('e2-risk','z5dark',HEAD(10,T('Risks','Hatari'),T('What could go wrong, <i>and what is already in place</i>','Kinachoweza kuharibika, <i>na kilichokwisha kuwekwa</i>'),'')+
 `<div class="z5rk">${RISK.map(r=>`<div class="rv"><span class="z5pill${/Medium|Wastani/.test(L(r[1]))?' z5m':''}">${T('Likelihood','Uwezekano')}: ${L(r[1])}</span><h4>${L(r[0])}</h4><p>${L(r[2])}</p></div>`).join('')}</div>`)}

function end5(pv,nx){return `${window.V3?window.V3.injSec('s4-2'):''}<section class="z5end" id="e2-end" style="background-image:url(${IM('shelf')})"><div class="z5w"><div class="z5kick rv" style="color:var(--gold2)">${T('Investor takeaway','Muhtasari kwa mwekezaji')}</div>
 <h2 class="rv">${T('Afya Basics sells only registered, inspected and traceable products, prices every item from its true landed cost and reorders before shelves run empty. Local buying protects cash at launch; direct imports from store 2 become a margin lever that grows with every store.','Afya Basics inauza bidhaa zilizosajiliwa, kukaguliwa na zinazofuatilika tu, inaweka bei ya kila bidhaa kutoka gharama yake halisi na inaagiza kabla rafu hazijaisha. Kununua ndani kunalinda pesa mwanzoni; kuagiza moja kwa moja kuanzia duka la 2 kunakuwa nyenzo ya faida inayokua kwa kila duka.')}</h2>
 <details id="e2-src"><summary>${T('Sources','Vyanzo')} (${SRC.length})</summary><ol>${SRC.map(s=>`<li><a href="${s[1]}" target="_blank" rel="noopener">${E(s[0])}</a></li>`).join('')}<li>${T('Opening stock, margins and cost of sales: master model. Figures marked as estimates are planning figures to be replaced by quotations. Photographs: Pexels, used under the Pexels licence; they illustrate the steps and are not Afya Basics’ suppliers.','Stoku ya kufungulia, faida na gharama ya mauzo: mpango mkuu. Takwimu zilizowekwa alama ya makadirio ni za mipango zitakazobadilishwa na nukuu. Picha: Pexels, chini ya leseni ya Pexels; zinaonyesha hatua na si wasambazaji wa Afya Basics.')}</li></ol></details>
 <nav class="z5pg">${pv?`<a href="#${pv.id}"><small>← ${pv.no}</small><span>${E(pv.title)}</span></a>`:'<span></span>'}${nx?`<a class="z5nx" href="#${nx.id}"><small>${nx.no} →</small><span>${E(nx.title)}</span></a>`:''}</nav></div></section>`}

function render42(s,p,pv,nx){css41();css41p();css42b();css42d();CH2.length=0;CH2.push(...CH5);return `<div class="e5" id="e2">${cover5()}${why5()}${trip5()}${BAND5('sea',['Days 34 to 70','Siku 34 hadi 70'],['Five weeks at sea is why every import is ordered three months ahead.','Wiki tano baharini ndiyo sababu kila uagizaji unaagizwa miezi mitatu kabla.'])}${lanes5()}${dash5()}${phase5()}${BAND5('recv',['Day 80','Siku 80'],['Nothing reaches a shelf until it has been counted, checked and scanned.','Hakuna kinachofika rafuni hadi kihesabiwe, kikaguliwe na kuchanganuliwa.'])}${gate5()}${law5()}${team5()}${cash5()}${risk5()}${end5(pv,nx)}</div>`}
/* 4.2 v5 render additions: corporate hero, end-to-end overview, catalogue, suppliers and contract terms */
const CH6=[['e2-how',['How it works','Inavyofanya kazi']],['e2-why',['Why it matters','Kwa nini ni muhimu']],['e2-cat',['What we source','Tunachonunua']],['e2-lanes',['Where we buy','Tunanunua wapi']],['e2-trip',['The journey','Safari']],['e2-dash',['True cost','Gharama halisi']],['e2-terms',['Suppliers and terms','Wasambazaji na masharti']],['e2-phase',['The plan','Mpango']],['e2-gate',['Quality','Ubora']],['e2-law',['Permits','Vibali']],['e2-team',['Team','Timu']],['e2-cash',['Stock and cash','Stoku na pesa']],['e2-risk',['Risks','Hatari']]];

function cover5(){const c=lcCalc();return `<header class="z6hero" id="e2-top" style="background-image:url(${IM('hero')})"><div class="z6panel rv">
 <small>${T('Part 4 · The engine · Section 4.2','Sehemu 4 · Injini · Sehemu 4.2')}</small>
 <h1>${T('Sourcing and supply','Upatikanaji na ugavi')}</h1>
 <p>${T('How Afya Basics buys only registered health products, brings them into Tanzania legally, knows the true cost of every item and keeps every shelf full.','Afya Basics inavyonunua bidhaa za afya zilizosajiliwa tu, kuziingiza Tanzania kihalali, kujua gharama halisi ya kila bidhaa na kuweka kila rafu ikiwa imejaa.')}</p>
 <div class="z5row"><button class="z6b" type="button" data-jump="e2-how">${T('How it works','Inavyofanya kazi')}${ARW}</button><button class="z6b z6o" type="button" data-film="0">${PLY}${T('1-minute film','Filamu ya dakika 1')}</button></div></div></header>
 <div class="z6kpi"><div class="z5w"><div><b>3</b><span>${T('supply lanes: Tanzania, China and India','njia za ugavi: Tanzania, China na India')}</span></div><div><b>6</b><span>${T('quality gates before anything is sold','milango ya ubora kabla ya kuuza chochote')}</span></div><div><b>${(c.per/c.fac).toFixed(2)}×</b><span>${T('factory price, once landed in Dar es Salaam','bei ya kiwanda, ikifika Dar es Salaam')}</span></div><div><b>${TM(MM.stock)}</b><span>${T('opening stock in the seed budget','stoku ya kufungulia kwenye bajeti ya mtaji')}</span></div></div></div>
 <nav class="z5toc" aria-label="${T('Contents','Yaliyomo')}"><div class="z5w">${CH6.map((c,i)=>`<a href="#${c[0]}" data-jump="${c[0]}"><span>${String(i+1).padStart(2,'0')}</span>${L(c[1])}</a>`).join('')}</div></nav>`}

function how6(){const S=[
 [['Forecast','Kutabiri'],['The system knows what sells','Mfumo unajua kinachouzwa'],['Every sale at the till updates stock. Each product has a reorder point: daily sales × days to restock + a safety buffer.','Kila mauzo yanasasisha stoku. Kila bidhaa ina kiwango cha kuagiza: mauzo ya siku × siku za kujaza tena + akiba ya usalama.'],['Stock system, automatic','Mfumo wa stoku, kiotomatiki']],
 [['Choose','Kuchagua'],['Pick the right source','Chagua chanzo sahihi'],['Local wholesaler by default. A factory abroad only for proven products at least 20% cheaper after every fee.','Muuzaji wa ndani kwa kawaida. Kiwanda cha nje kwa bidhaa zilizothibitishwa tu zilizo nafuu kwa 20% baada ya kila ada.'],['Founders approve','Waanzilishi wanaidhinisha']],
 [['Order','Kuagiza'],['Order and pay safely','Agiza na ulipe salama'],['Local orders on agreed terms. Imports at FOB price: 30% deposit, 70% only after inspection, by bank transfer.','Oda za ndani kwa masharti yaliyokubaliwa. Uagizaji kwa bei ya FOB: amana 30%, 70% baada ya ukaguzi tu, kwa benki.'],['Store lead and founders','Kiongozi wa duka na waanzilishi']],
 [['Check','Kukagua'],['Inspect before it ships','Kagua kabla ya kusafirishwa'],['An independent inspector tests a sample at the factory. A failed batch is not paid for and is not shipped.','Mkaguzi huru anajaribu sampuli kiwandani. Kundi lililoshindwa halilipwi wala halisafirishwi.'],['Inspection company','Kampuni ya ukaguzi']],
 [['Move','Kusafirisha'],['Ship, permit and clear','Safirisha, kibali na forodha'],['A forwarder books the container, the TMDA permit is in place before loading, and a licensed agent clears TRA duty at Dar es Salaam.','Wakala anapanga kontena, kibali cha TMDA kipo kabla ya kupakia, na wakala mwenye leseni anatoa ushuru wa TRA Dar es Salaam.'],['Forwarder and clearing agent','Wakala wa usafirishaji na forodha']],
 [['Sell','Kuuza'],['Receive, price and sell','Pokea, weka bei na uuze'],['The hub counts, checks expiry and scans each batch. The price comes from the landed cost, and the cycle restarts.','Kituo kinahesabu, kinakagua muda wa matumizi na kuchanganua kila kundi. Bei inatoka gharama halisi, na mzunguko unaanza upya.'],['Picker and store team','Mchukuaji na timu ya duka']]];
 return SEC('e2-how','',HEAD(1,T('How it works','Inavyofanya kazi'),T('Sourcing in <i>six steps</i>, from forecast to shelf','Upatikanaji kwa <i>hatua sita</i>, kutoka utabiri hadi rafuni'),T('This is the whole system on one line. Every product follows these six steps, whether it comes from a wholesaler in Kariakoo or a factory in Shenzhen. The chapters below explain each step in detail, with real prices and sources.','Huu ni mfumo mzima kwa mstari mmoja. Kila bidhaa inafuata hatua hizi sita, iwe inatoka kwa muuzaji wa jumla Kariakoo au kiwanda Shenzhen. Sura zinazofuata zinaeleza kila hatua kwa kina, pamoja na bei halisi na vyanzo.'))+
 `<div class="z6steps">${S.map((s,i)=>`<div class="rv"><div class="z6n">${i+1}</div><small>${L(s[0])}</small><h4>${L(s[1])}</h4><p>${L(s[2])}</p><div class="z6who">${T('Who','Nani')}: ${L(s[3])}</div></div>`).join('')}</div>`)}

function cat6(){const K=[
 [['Home medical devices','Vifaa tiba vya nyumbani'],['Blood-pressure monitors, thermometers, glucometers, nebulisers, pulse oximeters.','Mashine za presha, vipimajoto, glukomita, nebulaiza, vipima oksijeni.'],'TMDA',['Licensed wholesaler','Muuzaji mwenye leseni'],['China, validated models','China, modeli zilizothibitishwa']],
 [['Diagnostic tests','Vipimo vya uchunguzi'],['Glucose strips, pregnancy tests and malaria rapid tests.','Vipande vya sukari, vipimo vya mimba na vipimo vya haraka vya malaria.'],'TMDA',['Licensed wholesaler','Muuzaji mwenye leseni'],['India, registered kits','India, vifaa vilivyosajiliwa']],
 [['Wound care and first aid','Huduma ya majeraha na huduma ya kwanza'],['Sterile dressings, gauze, plasters, bandages, first-aid kits.','Bendeji tasa, shashi, plasta, bendeji, sanduku za huduma ya kwanza.'],'TMDA',['Licensed wholesaler','Muuzaji mwenye leseni'],['India','India']],
 [['Over-the-counter medicines','Dawa zisizohitaji cheti'],['Pain relief, oral rehydration salts, vitamins and other non-prescription medicines.','Dawa za maumivu, chumvi za kurejesha maji, vitamini na dawa nyingine zisizohitaji cheti.'],'TMDA',['Licensed wholesaler only','Muuzaji mwenye leseni tu'],['Stays local','Inabaki ndani']],
 [['Personal care and cosmetics','Huduma binafsi na vipodozi'],['Skin care, sunscreen, oral care, baby care.','Huduma ya ngozi, kinga ya jua, huduma ya kinywa, huduma ya watoto.'],'TBS',['Local distributor','Msambazaji wa ndani'],['Local, selected imports','Ndani, baadhi kuagizwa']],
 [['Hygiene and box packaging','Usafi na vifungashio vya box'],['Sanitary pads, masks, gloves, sanitiser and our own Afya box materials.','Taulo za kike, barakoa, glovu, vitakasa mikono na vifaa vya box za Afya.'],T('TBS (hygiene)','TBS (usafi)'),['Local distributor','Msambazaji wa ndani'],['China','China']]];
 return SEC('e2-cat','',HEAD(3,T('What we source','Tunachonunua'),T('Six product families, <i>each with its regulator and source</i>','Familia sita za bidhaa, <i>kila moja na mdhibiti na chanzo chake</i>'),T('About 520 product families sit in the opening stock. They fall into six groups. The regulator decides what paperwork a product needs; the lane decides where we buy it at launch and from store 2.','Takriban familia 520 za bidhaa ziko kwenye stoku ya kufungulia. Zinaangukia makundi sita. Mdhibiti anaamua bidhaa inahitaji nyaraka gani; njia inaamua tunainunua wapi mwanzoni na kuanzia duka la 2.'))+
 `<div class="z6cat">${K.map(k=>`<div class="rv"><h4>${L(k[0])}</h4><p>${L(k[1])}</p><dl><dt>${T('Regulator','Mdhibiti')}</dt><dd>${k[2]}</dd><dt>${T('At launch','Mwanzoni')}</dt><dd>${L(k[3])}</dd><dt>${T('From store 2','Kuanzia duka la 2')}</dt><dd>${L(k[4])}</dd></dl></div>`).join('')}</div>
 <p class="z6flag rv">${T('Medicines are never imported by Afya Basics. Only licensed pharmaceutical wholesalers may import them, so we buy them locally at every stage.','Afya Basics haiagizi dawa kamwe. Wauzaji wa jumla wa dawa wenye leseni tu ndio wanaweza kuziagiza, kwa hiyo tunazinunua ndani katika kila hatua.')}${C('import-and-export-control-of-medical-devices')}</p>`)}

function terms6(){const sup=[['Reno Distributors','Kariakoo, Dar es Salaam',T('Medical devices and consumables wholesaler.','Muuzaji wa jumla wa vifaa tiba na bidhaa za matumizi.')],['Pacific Diagnostic','Mikocheni, Dar es Salaam',T('Diagnostics and laboratory supplies.','Vipimo na vifaa vya maabara.')],['NajRam','Kariakoo, Dar es Salaam',T('Medical and surgical supplies.','Vifaa vya tiba na upasuaji.')]];
 const imp=[[T('Price basis','Msingi wa bei'),T('<b>FOB</b> (free on board): the factory delivers to the export port; we pay freight, insurance and everything after.','<b>FOB</b>: kiwanda kinafikisha bandari ya kusafirisha; tunalipa usafiri, bima na kila kitu baadaye.')],[T('Payment','Malipo'),T('<b>30%</b> deposit with the order, <b>70%</b> only after the inspection passes, by bank transfer.','Amana ya <b>30%</b> na oda, <b>70%</b> baada ya ukaguzi kupita tu, kwa benki.')+C('jingsourcing')],[T('Inspection','Ukaguzi'),T('Independent pre-shipment inspection of a random sample (ISO 2859-1 sampling, AQL 2.5 for major defects), about US$299 a day.','Ukaguzi huru kabla ya kusafirisha kwa sampuli ya bahati nasibu (sampuli ya ISO 2859-1, AQL 2.5 kwa kasoro kubwa), takriban US$299 kwa siku.')+C('qualityinspection')],[T('Shelf life','Muda wa matumizi'),T('At least 60% of shelf life left on arrival (80% for short-life items), in line with TMDA rules.','Angalau 60% ya muda wa matumizi ukiwa umebaki ikifika (80% kwa bidhaa za muda mfupi), kulingana na kanuni za TMDA.')+C('import-and-export-control-of-medical-devices')],[T('Rejects','Zilizokataliwa'),T('Supplier replaces or refunds any batch that fails inspection, at its own cost.','Msambazaji anabadilisha au kurudisha pesa kwa kundi lolote linaloshindwa ukaguzi, kwa gharama yake.')+`<span class="z6tag">${T('to negotiate','kujadiliwa')}</span>`]];
 const loc=[[T('Licence check','Ukaguzi wa leseni'),T('Valid TMDA wholesale licence and premises registration, checked before the first order.','Leseni halali ya TMDA ya jumla na usajili wa jengo, vinakaguliwa kabla ya oda ya kwanza.')],[T('Two suppliers','Wasambazaji wawili'),T('Every key item has a first and a second supplier, so one stock-out never empties our shelf.','Kila bidhaa muhimu ina msambazaji wa kwanza na wa pili, kwa hiyo kuishiwa kwa mmoja hakumalizi rafu yetu.')],[T('Delivery','Usafirishaji'),T('Delivered to the hub within 1–7 days of the order.','Inafikishwa kituoni ndani ya siku 1–7 baada ya oda.')],[T('Credit','Mkopo'),T('Aim for 30-day payment terms once a trading record exists; cash on delivery at the start.','Lengo ni siku 30 za kulipa rekodi ya biashara ikiwepo; malipo wakati wa kupokea mwanzoni.')+`<span class="z6tag">${T('target','lengo')}</span>`],[T('Short-dated stock','Stoku inayokaribia kuisha muda'),T('Right to return items within 6 months of expiry.','Haki ya kurudisha bidhaa zilizobaki chini ya miezi 6 kabla ya kuisha muda.')+`<span class="z6tag">${T('to negotiate','kujadiliwa')}</span>`]];
 return SEC('e2-terms','z5grey',HEAD(7,T('Suppliers and terms','Wasambazaji na masharti'),T('Who we buy from, <i>and on what terms</i>','Tunanunua kutoka kwa nani, <i>na kwa masharti gani</i>'),T('At launch, every regulated product comes from licensed wholesalers in Dar es Salaam. The three below are candidates identified for the first supplier round; the terms are the standard every supplier must accept.','Mwanzoni, kila bidhaa inayodhibitiwa inatoka kwa wauzaji wa jumla wenye leseni Dar es Salaam. Watatu hapa chini ni wagombea waliotambuliwa kwa awamu ya kwanza; masharti ni kiwango ambacho kila msambazaji lazima akubali.'))+
 `<div class="z6sup">${sup.map(s=>`<div class="rv"><b>${s[0]}</b><span>${s[1]}</span><p>${s[2]}</p></div>`).join('')}</div>
 <p class="z6flag rv">${T('None of these suppliers has been approached yet. Each will be checked for a valid TMDA licence and price-tested before any order; overseas factories are chosen only from store 2, after sample testing and an audit.','Hakuna msambazaji kati ya hawa aliyefikiwa bado. Kila mmoja atakaguliwa leseni halali ya TMDA na kulinganishwa bei kabla ya oda yoyote; viwanda vya nje vinachaguliwa kuanzia duka la 2 tu, baada ya kujaribu sampuli na ukaguzi.')}</p>
 <div class="z6terms"><div class="rv"><h4>${T('Local wholesalers · from day one','Wauzaji wa ndani · tangu siku ya kwanza')}</h4><ul>${loc.map(r=>`<li><b>${r[0]}</b><span>${r[1]}</span></li>`).join('')}</ul></div><div class="rv"><h4>${T('Overseas factories · from store 2','Viwanda vya nje · kuanzia duka la 2')}</h4><ul>${imp.map(r=>`<li><b>${r[0]}</b><span>${r[1]}</span></li>`).join('')}</ul></div></div>`)}

function render42(s,p,pv,nx){css41();css41p();css42b();css42d();css42e();css42f();HN=0;CH5.splice(0,CH5.length,...CH6);CH2.length=0;CH2.push(...CH6);
 return `<div class="e5" id="e2">${cover5()}${how6()}${why5()}${cat6()}${lanes5()}${trip5()}${BAND5('sea',['Days 34 to 70','Siku 34 hadi 70'],['Five weeks at sea is why every import is ordered three months ahead.','Wiki tano baharini ndiyo sababu kila uagizaji unaagizwa miezi mitatu kabla.'])}${dash5()}${terms6()}${phase5()}${BAND5('recv',['Day 80','Siku 80'],['Nothing reaches a shelf until it has been counted, checked and scanned.','Hakuna kinachofika rafuni hadi kihesabiwe, kikaguliwe na kuchanganuliwa.'])}${gate5()}${law5()}${team5()}${cash5()}${risk5()}${end5(pv,nx)}</div>`}
/* 4.2 v6 · explainer box for every chapter: plain words + worked example + what it means for an investor */
function XB(plain,exT,rows,so){return `<div class="z7x rv"><div><h5>${T('In plain words','Kwa maneno rahisi')}</h5>${plain}</div><div><h5>${exT}</h5><ol>${rows.map(r=>`<li><span>${r[0]}</span><b>${r[1]}</b></li>`).join('')}</ol>${so?`<div class="z7so"><b>${T('For an investor:','Kwa mwekezaji:')}</b> ${so}</div>`:''}</div></div>`}
function xp(id){const c=lcCalc(),usd=LC.fob*LC.units,net=c.gross/(1+LCC.vat),gp=net-c.per,cc=ccData(),thr=c.per/0.8;
 const P=(en,sw)=>`<p>${T(en,sw)}</p>`;
 switch(id){
 case 'e2-how':return XB(P('Sourcing is a <b>loop, not a one-off purchase</b>. The till tells the stock system what sold; the system compares what is left with each product’s reorder point; when stock falls to that point, the product appears on Monday’s reorder list. A person then decides where to buy it, the order is paid and checked, the goods travel, are received and priced, and the loop starts again.','Upatikanaji ni <b>mzunguko, si ununuzi wa mara moja</b>. Mashine ya mauzo inaambia mfumo wa stoku kilichouzwa; mfumo unalinganisha kilichobaki na kiwango cha kuagiza cha kila bidhaa; stoku ikifika kiwango hicho, bidhaa inaonekana kwenye orodha ya kuagiza ya Jumatatu. Mtu anaamua wapi pa kununua, oda inalipwa na kukaguliwa, bidhaa zinasafiri, zinapokelewa na kuwekewa bei, na mzunguko unaanza tena.')+P('The <b>reorder point</b> is the key number: daily sales × days it takes to restock, plus a safety buffer for surprises. It is calculated per product, so fast sellers are reordered early and slow sellers are not over-bought.','<b>Kiwango cha kuagiza</b> ndiyo namba muhimu: mauzo ya siku × siku za kujaza tena, pamoja na akiba ya usalama kwa mambo yasiyotarajiwa. Kinahesabiwa kwa kila bidhaa, kwa hiyo zinazouzwa haraka zinaagizwa mapema na zinazouzwa polepole hazinunuliwi kupita kiasi.'),
  T('Worked example: glucose test strips','Mfano: vipande vya kupima sukari'),[[T('Average sales','Wastani wa mauzo'),T('6 boxes a day','boksi 6 kwa siku')],[T('Wholesaler delivery time','Muda wa muuzaji kufikisha'),T('5 days','siku 5')],[T('Safety buffer (5 days of sales)','Akiba ya usalama (siku 5 za mauzo)'),T('30 boxes','boksi 30')],[T('Reorder point = 6 × 5 + 30','Kiwango cha kuagiza = 6 × 5 + 30'),T('60 boxes','boksi 60')],[T('Stock reaches 60 on Sunday, so it is ordered on Tuesday and arrives by Thursday','Stoku inafika 60 Jumapili, inaagizwa Jumanne na kufika kabla ya Alhamisi'),T('never empty','haiishi')]],
  T('buying is rule-based and visible in the system, so it does not depend on one person remembering, and it scales to more stores without more buyers.','ununuzi unafuata kanuni na unaonekana kwenye mfumo, kwa hiyo hautegemei mtu mmoja kukumbuka, na unakua kwa maduka zaidi bila wanunuzi zaidi.'));
 case 'e2-why':return XB(P('A <b>substandard</b> product is a real product that fails its quality specification, for example a blood-pressure monitor that reads 15 points too low. A <b>falsified</b> product pretends to be something it is not, such as a copied brand or a fake registration number. Both look normal on a shelf. The only protection is to control where products come from and to check them before they are sold.','Bidhaa <b>isiyo na ubora</b> ni bidhaa halisi inayoshindwa vipimo vyake, kwa mfano mashine ya presha inayosoma pointi 15 chini. Bidhaa <b>bandia</b> inajifanya kuwa kitu ambacho siyo, kama chapa iliyonakiliwa au namba ya usajili ya uongo. Zote zinaonekana kawaida rafuni. Kinga pekee ni kudhibiti zinakotoka bidhaa na kuzikagua kabla ya kuuzwa.')+P('For Afya Basics, trust is the product. A family that relies on our monitor to manage hypertension is trusting our buying process, not just the brand on the box.','Kwa Afya Basics, uaminifu ndiyo bidhaa. Familia inayotegemea mashine yetu kudhibiti presha inaamini mchakato wetu wa ununuzi, si chapa iliyo kwenye boksi tu.'),
  T('What one bad product costs','Bidhaa moja mbaya inagharimu nini'),[[T('A monitor that reads low','Mashine inayosoma chini'),T('missed diagnosis','ugonjwa haugunduliwi')],[T('Customer finds out','Mteja anagundua'),T('refund + lost trust','kurudisha pesa + kupoteza imani')],[T('One complaint shared on WhatsApp','Lalamiko moja likisambazwa WhatsApp'),T('lasting damage to reputation','madhara ya kudumu kwa sifa')],[T('A TMDA finding of unregistered stock','TMDA ikikuta stoku isiyosajiliwa'),T('seizure and penalties','kukamatwa na adhabu')]],
  T('strict sourcing is what lets a new store charge fair prices and still win loyalty; it protects revenue, the licence and the brand at the same time.','upatikanaji makini ndio unaoruhusu duka jipya kuuza kwa bei nzuri na bado kupata uaminifu; unalinda mapato, leseni na chapa kwa wakati mmoja.'));
 case 'e2-cat':return XB(P('Every product family has a <b>regulator</b>. TMDA covers medicines and medical devices: each item must be registered or notified, and its number can be checked in TMDA’s public register. TBS covers cosmetics and many hygiene goods: they must meet a Tanzanian standard. Before a product is added to our catalogue, its registration is checked and saved against the product in the stock system.','Kila familia ya bidhaa ina <b>mdhibiti</b>. TMDA inasimamia dawa na vifaa tiba: kila bidhaa lazima isajiliwe au iarifiwe, na namba yake inaweza kukaguliwa kwenye rejista ya umma ya TMDA. TBS inasimamia vipodozi na bidhaa nyingi za usafi: lazima zikidhi kiwango cha Tanzania. Kabla bidhaa haijaongezwa kwenye katalogi yetu, usajili wake unakaguliwa na kuhifadhiwa kwenye mfumo wa stoku.'),
  T('Worked example: adding a digital thermometer','Mfano: kuongeza kipimajoto cha kidijitali'),[[T('Search the TMDA register for the brand and model','Tafuta chapa na modeli kwenye rejista ya TMDA'),T('found / not found','imepatikana / haikupatikana')],[T('Not found','Haikupatikana'),T('not stocked','haiwekwi')],[T('Found: record the registration number in the system','Imepatikana: rekodi namba ya usajili kwenye mfumo'),T('linked to SKU','imeunganishwa na SKU')],[T('Choose the lane: launch = licensed wholesaler','Chagua njia: mwanzoni = muuzaji mwenye leseni'),T('1–7 days','siku 1–7')],[T('Later, if it sells steadily: validated factory','Baadaye, ikiuzwa kwa uthabiti: kiwanda kilichothibitishwa'),T('from store 2','kuanzia duka la 2')]],
  T('the catalogue is built only from products that are legal to sell, so there is no hidden regulatory risk sitting on the shelves.','katalogi inajengwa kwa bidhaa halali kuuzwa tu, kwa hiyo hakuna hatari ya kisheria iliyojificha rafuni.'));
 case 'e2-lanes':return XB(P('A <b>supply lane</b> is a route from a source to our shelf. Buying from a licensed Tanzanian wholesaler costs more per unit, but the goods are already registered, already cleared and arrive in days. Importing directly is cheaper per unit, but needs a licensed warehouse, permits, a minimum order and about three months of cash tied up. So the lane is chosen per product, by a fixed rule.','<b>Njia ya ugavi</b> ni njia kutoka chanzo hadi rafu yetu. Kununua kwa muuzaji wa jumla wa Tanzania mwenye leseni kunagharimu zaidi kwa kipande, lakini bidhaa tayari zimesajiliwa, zimetolewa forodhani na zinafika kwa siku chache. Kuagiza moja kwa moja ni nafuu kwa kipande, lakini kunahitaji ghala lenye leseni, vibali, oda ya chini na takriban miezi mitatu ya pesa iliyofungwa. Kwa hiyo njia inachaguliwa kwa kila bidhaa, kwa kanuni thabiti.'),
  T('When the monitor switches to import','Lini mashine inahamia kuagizwa'),[[T('Landed cost if imported','Gharama halisi ikiagizwa'),TS(c.per)],[T('Rule: import only if at least 20% cheaper','Kanuni: agiza ikiwa nafuu kwa angalau 20% tu'),T('landed ÷ 0.8','halisi ÷ 0.8')],[T('So the local wholesale price must be above','Kwa hiyo bei ya jumla ya ndani lazima iwe juu ya'),TS(thr)],[T('Below that, the wholesaler stays','Chini ya hapo, muuzaji wa ndani anabaki'),T('no import','hakuna kuagiza')]],
  T('importing is never a bet: it only happens when the saving is proven and large enough to pay for the extra cash, time and risk.','kuagiza si kamari kamwe: kunatokea pale tu akiba imethibitishwa na ni kubwa kiasi cha kulipia pesa, muda na hatari ya ziada.'));
 case 'e2-trip':return XB(P('Three terms explain the journey. <b>FOB</b> (free on board) means the factory’s price includes delivery to the export port; from there, freight, insurance and risk are ours. <b>LCL</b> (less than container load) means our cartons share a container with other importers, so we pay only for the space we use. The <b>bill of lading</b> is the shipping document that proves ownership; the clearing agent needs it to release the goods in Dar es Salaam.','Maneno matatu yanaeleza safari. <b>FOB</b> maana yake bei ya kiwanda inajumuisha kufikisha bandari ya kusafirisha; kuanzia hapo, usafiri, bima na hatari ni zetu. <b>LCL</b> maana yake katoni zetu zinashiriki kontena na waagizaji wengine, kwa hiyo tunalipia nafasi tunayotumia tu. <b>Bill of lading</b> ni hati ya usafirishaji inayothibitisha umiliki; wakala wa forodha anaihitaji kutoa mzigo Dar es Salaam.'),
  T('The example shipment in numbers','Mzigo wa mfano kwa namba'),[[T('Order','Oda'),T('200 monitors','mashine 200')],[T('Factory value (FOB)','Thamani ya kiwanda (FOB)'),'US$'+NF(usd)],[T('Volume','Ujazo'),c.cbm.toFixed(2)+' m³'],[T('Sea freight at US$111 per m³','Usafiri wa bahari kwa US$111 kwa m³'),'US$'+NF(c.cbm*LCC.lcl)],[T('Freight per monitor','Usafiri kwa mashine moja'),TS(c.cbm*LCC.lcl*FX/LC.units)],[T('Order to shelf','Oda hadi rafu'),T('82 days','siku 82')]],
  T('freight is a small part of the cost; time is the big one. That is why ordering early, by system, matters more than haggling over shipping.','usafiri ni sehemu ndogo ya gharama; muda ndio mkubwa. Ndiyo sababu kuagiza mapema, kwa mfumo, ni muhimu kuliko kubishana bei ya usafiri.'));
 case 'e2-dash':return XB(P('<b>Landed cost</b> is everything we pay to get one unit onto our shelf: factory price, freight, insurance, duty, levies, permit fees, inspection, bank charges, clearing and the truck. <b>Import VAT</b> (18%) is paid at the port but claimed back from TRA, so it is not a cost. The shelf price is then landed cost plus our 32% margin, plus VAT charged to the customer.','<b>Gharama halisi</b> ni kila kitu tunacholipa kufikisha kipande kimoja rafuni: bei ya kiwanda, usafiri, bima, ushuru, tozo, ada za kibali, ukaguzi, ada za benki, forodha na lori. <b>VAT ya uagizaji</b> (18%) inalipwa bandarini lakini inadaiwa tena TRA, kwa hiyo si gharama. Bei ya rafuni ni gharama halisi pamoja na faida yetu ya 32%, pamoja na VAT anayotozwa mteja.'),
  T('One monitor, from cost to profit','Mashine moja, kutoka gharama hadi faida'),[[T('Factory price','Bei ya kiwanda'),TS(c.fac)],[T('Landed cost','Gharama halisi'),TS(c.per)],[T('Shelf price incl. VAT','Bei ya rafuni pamoja na VAT'),TS(c.gross)],[T('Less VAT paid to TRA','Toa VAT inayolipwa TRA'),TS(c.gross-net)],[T('Net sale','Mauzo halisi'),TS(net)],[T('Gross profit per monitor','Faida ghafi kwa mashine'),TS(gp)]],
  T(`every price in the store is built up from a known cost. On this monitor we keep ${TS(gp)} per unit after all import costs and VAT.`,`kila bei dukani inajengwa kutoka gharama inayojulikana. Kwa mashine hii tunabaki na ${TS(gp)} kwa kipande baada ya gharama zote za uagizaji na VAT.`));
 case 'e2-terms':return XB(P('Payment terms decide who carries the risk. With <b>30% deposit / 70% after inspection</b>, the factory has been paid enough to start, but it is not fully paid until an independent inspector confirms the goods are right. If the batch fails, we do not pay the balance and the contract makes the factory replace or refund it. With local wholesalers, the protection is their licence, a second supplier for every key item, and over time, credit terms that let sales pay for stock.','Masharti ya malipo yanaamua nani anabeba hatari. Kwa <b>amana 30% / 70% baada ya ukaguzi</b>, kiwanda kimelipwa kutosha kuanza, lakini hakilipwi kikamilifu hadi mkaguzi huru athibitishe bidhaa ziko sawa. Kundi likishindwa, hatulipi salio na mkataba unakilazimu kiwanda kubadilisha au kurudisha pesa. Kwa wauzaji wa ndani, kinga ni leseni yao, msambazaji wa pili kwa kila bidhaa muhimu, na kwa muda, masharti ya mkopo yanayoruhusu mauzo kulipia stoku.'),
  T('Money at risk on the example order','Pesa iliyo hatarini kwa oda ya mfano'),[[T('Factory value (FOB)','Thamani ya kiwanda (FOB)'),'US$'+NF(usd)],[T('Deposit paid with the order (30%)','Amana inayolipwa na oda (30%)'),'US$'+NF(usd*.3)],[T('Balance, paid only if inspection passes','Salio, linalolipwa ukaguzi ukipita tu'),'US$'+NF(usd*.7)],[T('Most we can lose before inspection','Kiwango cha juu tunachoweza kupoteza kabla ya ukaguzi'),'US$'+NF(usd*.3)],[T('Recovered under the replacement clause','Kinarudishwa chini ya kifungu cha kubadilisha'),T('if signed','kikisainiwa')]],
  T('the terms cap the downside of each import at the deposit, and the clauses marked “to negotiate” are the first items for the founders to close with each supplier.','masharti yanaweka kikomo cha hasara ya kila uagizaji kwenye amana, na vifungu vilivyowekwa “kujadiliwa” ndivyo vya kwanza kwa waanzilishi kukamilisha na kila msambazaji.'));
 case 'e2-phase':return XB(P('The plan has three phases because the right way to buy changes with size. With <b>one store</b>, the order volumes are small and the sales data is new, so local buying is safer and frees cash. From <b>store 2</b>, volumes and data justify importing the proven fast movers. From <b>seven stores</b>, orders fill whole containers, which cuts freight per unit and allows negotiating directly with the factory.','Mpango una awamu tatu kwa sababu njia sahihi ya kununua inabadilika na ukubwa. Na <b>duka moja</b>, oda ni ndogo na takwimu za mauzo ni mpya, kwa hiyo kununua ndani ni salama zaidi na kunaacha pesa huru. Kuanzia <b>duka la 2</b>, wingi na takwimu zinahalalisha kuagiza bidhaa zinazouzwa haraka zilizothibitishwa. Kuanzia <b>maduka saba</b>, oda zinajaza makontena mazima, jambo linalopunguza usafiri kwa kipande na kuruhusu kujadiliana moja kwa moja na kiwanda.'),
  T('Illustration: the saving from one product','Mfano: akiba kutoka bidhaa moja'),[[T('Local wholesale price (illustrative)','Bei ya jumla ya ndani (mfano)'),TS(60000)],[T('Landed cost if imported','Gharama halisi ikiagizwa'),TS(c.per)],[T('Saving per unit','Akiba kwa kipande'),TS(60000-c.per)+` (${Math.round((1-c.per/60000)*100)}%)`],[T('At 60 units a month','Kwa vipande 60 kwa mwezi'),TS((60000-c.per)*60)+T(' a month',' kwa mwezi')],[T('Passes the 20% rule?','Inapita kanuni ya 20%?'),(1-c.per/60000)>=.2?T('yes','ndiyo'):T('no','hapana')]],
  T('margin rises as the business grows, without raising prices. The wholesale price used here is illustrative and will be replaced by real quotes.','faida inaongezeka biashara inavyokua, bila kupandisha bei. Bei ya jumla iliyotumika hapa ni mfano na itabadilishwa na nukuu halisi.'));
 case 'e2-gate':return XB(P('Inspection does not test every unit; it tests a <b>random sample</b> chosen by an international standard (ISO 2859-1). The standard says how many units to check for a given batch size and how many defects are acceptable. If the defects found are at or below the limit, the batch passes; one more and it fails. Gate 5 is enforced by the till: a batch is only sellable after it is received and released in the system.','Ukaguzi haujaribu kila kipande; unajaribu <b>sampuli ya bahati nasibu</b> iliyochaguliwa kwa kiwango cha kimataifa (ISO 2859-1). Kiwango kinasema vipande vingapi vikaguliwe kwa ukubwa fulani wa kundi na kasoro ngapi zinakubalika. Kasoro zikiwa chini au sawa na kikomo, kundi linapita; moja zaidi, linashindwa. Mlango wa 5 unasimamiwa na mashine ya mauzo: kundi linauzwa tu baada ya kupokelewa na kuruhusiwa kwenye mfumo.'),
  T('Inspecting the 200 monitors','Kukagua mashine 200'),[[T('Batch size','Ukubwa wa kundi'),T('200 units','vipande 200')],[T('Sample under ISO 2859-1, level II','Sampuli chini ya ISO 2859-1, kiwango II'),T('32 units','vipande 32')],[T('Major defects accepted (AQL 2.5)','Kasoro kubwa zinazokubalika (AQL 2.5)'),T('up to 2','hadi 2')],[T('3 or more major defects','Kasoro kubwa 3 au zaidi'),T('batch rejected','kundi linakataliwa')],[T('Accuracy check','Ukaguzi wa usahihi'),T('vs calibrated reference','dhidi ya marejeo yaliyosawazishwa')]],
  T('quality is checked before the balance is paid and enforced by software after arrival, so a bad batch costs us time, not money or reputation.','ubora unakaguliwa kabla salio halijalipwa na kusimamiwa na programu baada ya kufika, kwa hiyo kundi baya linatugharimu muda, si pesa wala sifa.'));
 case 'e2-law':return XB(P('Permits follow a fixed order. First the <b>premises</b> are registered with TMDA (a retail outlet, and later an importing warehouse). Then each <b>product</b> must be registered or notified. Only then can we apply for an <b>import permit for each consignment</b>, at least six weeks before it ships. At the port, TRA collects duty, levies and VAT, and a licensed clearing agent handles the paperwork.','Vibali vinafuata mpangilio thabiti. Kwanza <b>jengo</b> linasajiliwa TMDA (duka la rejareja, na baadaye ghala la kuagiza). Kisha kila <b>bidhaa</b> lazima isajiliwe au iarifiwe. Hapo tu ndipo tunaweza kuomba <b>kibali cha kuingiza kwa kila mzigo</b>, angalau wiki sita kabla ya kusafirishwa. Bandarini, TRA inakusanya ushuru, tozo na VAT, na wakala wa forodha mwenye leseni anashughulikia nyaraka.'),
  T('Permits and fees for the example order','Vibali na ada kwa oda ya mfano'),[[T('Importing-warehouse registration (yearly)','Usajili wa ghala la kuagiza (kwa mwaka)'),TS(300000)],[T('Import permit applied for','Kibali kinaombwa'),T('6 weeks before loading','wiki 6 kabla ya kupakia')],[T('TMDA import fee: 2% of FOB','Ada ya TMDA: 2% ya FOB'),TS(usd*.02*FX)],[T('Railway levy + processing fee','Tozo ya reli + ada ya uchakataji'),TS(c.r[3][1])],[T('Import duty at 25%','Ushuru kwa 25%'),TS(c.r[2][1])]],
  T('every permit has a known fee and lead time, and all of them are already inside the landed-cost calculation, so nothing regulatory is left off the price.','kila kibali kina ada na muda unaojulikana, na vyote viko ndani ya hesabu ya gharama halisi, kwa hiyo hakuna gharama ya kisheria iliyoachwa nje ya bei.'));
 case 'e2-team':return XB(P('At launch there is <b>no dedicated buyer</b>. The store lead runs the weekly reorder list in about two hours, the picker receives and checks deliveries, and the founders approve suppliers and every import. A dedicated importer is hired from store 2, when import volumes make it a full-time job.','Mwanzoni <b>hakuna mnunuzi maalum</b>. Kiongozi wa duka anaendesha orodha ya kuagiza ya wiki kwa takriban saa mbili, mchukuaji anapokea na kukagua mizigo, na waanzilishi wanaidhinisha wasambazaji na kila uagizaji. Mwagizaji maalum anaajiriwa kuanzia duka la 2, wingi wa uagizaji ukifanya iwe kazi ya muda wote.'),
  T('One week of buying','Wiki moja ya ununuzi'),[[T('Monday: the system lists 14 products at their reorder point','Jumatatu: mfumo unaorodhesha bidhaa 14 zilizofika kiwango cha kuagiza'),T('review','mapitio')],[T('Tuesday: 3 wholesaler orders sent','Jumanne: oda 3 kwa wauzaji zinatumwa'),T('approve','idhinisha')],[T('Thursday: deliveries counted, dates checked, scanned','Alhamisi: mizigo inahesabiwa, tarehe zinakaguliwa, inachanganuliwa'),T('receive','pokea')],[T('Month end: supplier scorecard, slow sellers, price changes','Mwisho wa mwezi: alama za wasambazaji, zinazouzwa polepole, mabadiliko ya bei'),T('review','mapitio')]],
  T('buying needs no extra salary at launch, and the role grows only when volume pays for it.','ununuzi hauhitaji mshahara wa ziada mwanzoni, na nafasi inakua pale tu wingi unapoilipia.'));
 case 'e2-cash':return XB(P('<b>Stock is cash in another form.</b> Money leaves the bank when we pay a supplier and only comes back when a customer buys. The time in between is the <b>cash cycle</b>. For a local order it is a few weeks; for an import it is months, because we pay the factory long before the goods arrive. The longer the cycle, the more working capital the business needs.','<b>Stoku ni pesa kwa namna nyingine.</b> Pesa inatoka benki tunapomlipa msambazaji na inarudi tu mteja anaponunua. Muda wa katikati ni <b>mzunguko wa pesa</b>. Kwa oda ya ndani ni wiki chache; kwa uagizaji ni miezi, kwa sababu tunalipa kiwanda muda mrefu kabla bidhaa hazijafika. Mzunguko ukiwa mrefu, biashara inahitaji mtaji zaidi wa kufanyia kazi.'),
  T('The example import, day by day','Uagizaji wa mfano, siku kwa siku'),[[T('Day 0: 30% deposit','Siku 0: amana 30%'),'−'+TM(cc.dep)],[T('Day 30: balance, inspection, bank','Siku 30: salio, ukaguzi, benki'),'−'+TM(cc.bal)],[T('Days 70–78: freight, duty, fees, clearing','Siku 70–78: usafiri, ushuru, ada, forodha'),'−'+TM(cc.port)],[T('Day 82: first sale','Siku 82: mauzo ya kwanza'),T('cash starts returning','pesa inaanza kurudi')],[T(`Cash fully back, selling ${RO.sales} a day`,`Pesa imerudi yote, ukiuza ${RO.sales} kwa siku`),cc.pay?T('day ','siku ')+cc.pay:T('not reached','haijafikiwa')]],
  T('local buying at launch keeps the cash cycle short, which is why the seed budget can open with TSh 30M of stock and fund reorders from sales.','kununua ndani mwanzoni kunaweka mzunguko wa pesa mfupi, ndiyo sababu bajeti ya mtaji inaweza kufungua na stoku ya TSh 30M na kulipia kuagiza kutoka mauzo.'));
 case 'e2-risk':return XB(P('Each risk is rated by how likely it is, and each already has an answer built into the system rather than a promise to react later. The answers overlap on purpose: safety stock, a second supplier and inspection before payment protect against several risks at once.','Kila hatari imepimwa kwa uwezekano wake, na kila moja tayari ina jibu lililojengwa ndani ya mfumo badala ya ahadi ya kuchukua hatua baadaye. Majibu yanaingiliana kwa makusudi: akiba ya usalama, msambazaji wa pili na ukaguzi kabla ya malipo vinalinda dhidi ya hatari kadhaa kwa wakati mmoja.'),
  T('Scenario: the China container is 3 weeks late','Hali: kontena la China limechelewa wiki 3'),[[T('Safety stock held on the China lane','Akiba ya usalama kwenye njia ya China'),T('21 days','siku 21')],[T('Delay','Ucheleweshaji'),T('21 days','siku 21')],[T('Shelf impact','Athari rafuni'),T('none','hakuna')],[T('If the delay is longer: buy from the local wholesaler','Ucheleweshaji ukiwa mrefu zaidi: nunua kwa muuzaji wa ndani'),T('lower margin, full shelf','faida ndogo, rafu imejaa')]],
  T('the main sourcing risks cost margin, not continuity: the shelf stays full while the problem is fixed.','hatari kuu za upatikanaji zinagharimu faida, si mwendelezo: rafu inabaki imejaa wakati tatizo linarekebishwa.'));
 }return ''}
/* film player and reader panel (shared design with 4.1) */
let e1film=null;
/* film */
function filmOpen(start){filmClose();const N=SALE.length,D=8000;let i=start||0,t0=0,paused=false,raf=0,el=0;
 const ov=document.createElement('div');ov.className='e1f on';ov.setAttribute('role','dialog');ov.setAttribute('aria-label',T('One pack’s journey','Safari ya pakiti moja'));
 ov.innerHTML=SALE.map(s=>`<img src="${IM(s.img)}" alt="">`).join('')+`<div class="vg"></div><div class="top"><span>Afya Basics · ${T('One pack’s journey','Safari ya pakiti moja')}</span><div><button type="button" data-f="snd">${T('Sound off','Zima sauti')}</button><button type="button" data-f="pp">${T('Pause','Simamisha')}</button><button type="button" data-f="x">${T('Close','Funga')} ✕</button></div></div><div class="tx"></div><div class="bar">${SALE.map((s,k)=>`<button type="button" data-f="go" data-k="${k}" aria-label="${E(L(s.h))}"><i><b></b></i></button>`).join('')}</div>`;
 document.body.appendChild(ov);const au=new Audio('media/e1/score.mp3');au.loop=true;au.volume=.55;au.play().catch(()=>{});
 const imgs=ov.querySelectorAll('img'),tx=ov.querySelector('.tx'),bars=ov.querySelectorAll('.bar b');
 const show=k=>{i=(k+N)%N;imgs.forEach((m,j)=>{m.classList.toggle('on',j===i);if(j===i){m.style.animation='none';void m.offsetWidth;m.style.animation=''}});const s=SALE[i];tx.classList.remove('in');tx.innerHTML=`<small>${String(i+1).padStart(2,'0')} / ${String(N).padStart(2,'0')} · ${L(s.t)}</small><h4>${L(s.h)}</h4><p>${L(s.s)}</p><div class="lg">${L(s.w).map(x=>'› '+E(x)).join('<br>')}</div>`;requestAnimationFrame(()=>requestAnimationFrame(()=>tx.classList.add('in')));bars.forEach((b,j)=>b.style.width=j<i?'100%':'0');el=0;t0=performance.now()};
 const loop=now=>{if(!paused){el=now-t0;const f=Math.min(1,el/D);bars[i].style.width=(f*100)+'%';if(el>=D){if(i===N-1){filmClose();return}show(i+1)}}raf=requestAnimationFrame(loop)};
 ov.addEventListener('click',e=>{const b=e.target.closest('[data-f]');if(!b){if(e.target.closest('.tx')||e.target.tagName==='IMG'||e.target.classList.contains('vg'))show(i+1);return}const f=b.dataset.f;
  if(f==='x')filmClose();else if(f==='go')show(+b.dataset.k);else if(f==='pp'){paused=!paused;if(!paused)t0=performance.now()-el;b.textContent=paused?T('Play','Cheza'):T('Pause','Simamisha');paused?au.pause():au.play().catch(()=>{})}else if(f==='snd'){au.muted=!au.muted;b.textContent=au.muted?T('Sound on','Washa sauti'):T('Sound off','Zima sauti')}});
 const key=e=>{if(e.key==='Escape')filmClose();else if(e.key==='ArrowRight')show(i+1);else if(e.key==='ArrowLeft')show(i-1);else if(e.key===' '){e.preventDefault();ov.querySelector('[data-f=pp]').click()}};addEventListener('keydown',key);
 document.documentElement.style.overflow='hidden';show(i);raf=requestAnimationFrame(loop);
 e1film={ov,au,stop:()=>{cancelAnimationFrame(raf);removeEventListener('keydown',key);au.pause();au.src='';ov.remove();document.documentElement.style.overflow=''}}}
function filmClose(){if(e1film){const f=e1film;e1film=null;f.stop()}}

/* ---------- reader panel ---------- */
const DKEYS=['why','trip','lanes','phase','land','reo','gate','law','team','cash'];
function openDeep(k){closeDeep();const f=DEEP[k];if(!f)return;const i=DKEYS.indexOf(k),pv=DKEYS[i-1],nx=DKEYS[i+1];
 const w=document.createElement('div');w.className='e1d';w.innerHTML=`<div class="sc" data-dx></div><aside role="dialog" aria-modal="true"><button type="button" class="x" data-dx aria-label="${T('Close','Funga')}">✕</button><div class="bd2">${f()}<nav class="dn">${pv?`<button type="button" data-dg="${pv}">← ${T('Previous explanation','Maelezo yaliyotangulia')}</button>`:'<span></span>'}${nx?`<button type="button" data-dg="${nx}">${T('Next explanation','Maelezo yanayofuata')} →</button>`:''}</nav></div></aside>`;
 w.addEventListener('click',e=>{if(e.target.closest('[data-dx]')){closeDeep();return}const g=e.target.closest('[data-dg]');if(g){openDeep(g.dataset.dg);return}const a=e.target.closest('sup.ci a');if(a){e.preventDefault();closeDeep();const t=document.getElementById('e2-src');if(t){t.open=true}if(t)scrollTo({top:t.getBoundingClientRect().top+scrollY-60,behavior:'smooth'})}});
 document.body.appendChild(w);document.documentElement.style.overflow='hidden';requestAnimationFrame(()=>w.classList.add('on'));w.querySelector('.x').focus();
 const key=e=>{if(e.key==='Escape')closeDeep()};addEventListener('keydown',key);w._k=key}
function closeDeep(){const w=document.querySelector('.e1d');if(!w)return;removeEventListener('keydown',w._k);w.remove();document.documentElement.style.overflow=''}

/* 4.2 styles, calculator, simulator, full explanations and behaviour */
function css42(){addCSS('e2',`
.e1 .lanes{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:34px;margin-top:56px}
.e1 .lanes small{display:block;margin-top:18px;font:500 .6rem var(--mono);letter-spacing:.16em;text-transform:uppercase;color:var(--gr)}
.e1 .lanes h3{margin-top:8px;font-size:1.35rem}.e1 .lanes p{margin:12px 0 0;font-size:.96rem;color:#3a3e3b}.e1 .lanes p b{color:var(--ink)}
.e1 .lanes .px{font:500 .8rem/1.6 var(--mono);color:var(--gr);border-top:1px solid rgba(17,17,17,.12);padding-top:12px}
.e1 .lanes .ph img{aspect-ratio:4/3}
.e1 .phs2{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:40px;margin-top:56px}
.e1 .phs2>div{border-top:1px solid #111;padding-top:18px}
.e1 .phs2 .pk b{font:300 1.9rem/1 var(--serif)}.e1 .phs2 .pk span{display:block;margin-top:8px;font:500 .62rem var(--mono);letter-spacing:.16em;text-transform:uppercase;color:var(--gd2)}
.e1 .phs2 h3{margin-top:18px;font-size:1.2rem}.e1 .phs2 p{margin:10px 0 0;color:#3a3e3b;font-size:.97rem}
.e1 .gts>div{display:grid;grid-template-columns:54px 1fr;gap:18px;padding:20px 0;border-top:1px solid rgba(244,239,230,.14)}
.e1 .gts span{font:300 1.7rem/1 var(--serif);color:var(--gd)}.e1 .gts h3{color:#f4efe6;font-size:1.08rem}.e1 .gts p{margin:6px 0 0;color:var(--dmut);font-size:.95rem}
.e1 .wkg{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:30px;margin:56px 0 40px}
.e1 .wkg div{border-top:1px solid #111;padding-top:16px}.e1 .wkg b{display:block;font:300 1.6rem/1 var(--serif)}.e1 .wkg span{display:block;margin-top:10px;font-size:.93rem;line-height:1.55;color:#3a3e3b}
/* calculator */
.e1 .lc{display:grid;grid-template-columns:1fr 1.1fr;gap:56px;margin-top:50px;align-items:start}
.e1 .lc label{display:block;margin-bottom:20px}
.e1 .lc label span{display:flex;justify-content:space-between;font-size:.9rem;color:#3a3e3b}.e1 .lc label span b{font:500 .9rem var(--mono);color:var(--ink)}
.e1 .lc input[type=range]{width:100%;margin-top:8px;accent-color:#1d5a43}
.e1 .lc .seg{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}
.e1 .lc .seg button{appearance:none;border:1px solid rgba(17,17,17,.2);background:#fff;padding:8px 12px;font:600 .74rem var(--sans);border-radius:2px;color:#3a3e3b}
.e1 .lc .seg button.on{background:var(--ink);color:#fff;border-color:var(--ink)}
.e1 .lc .hint2{font-size:.78rem;color:var(--mut);margin-top:6px;line-height:1.5}
.e1 .lc .out{background:var(--iv);padding:30px 32px}
.e1 .lc .big{font:300 clamp(2.4rem,4vw,3.4rem)/1 var(--serif);letter-spacing:-.02em}
.e1 .lc .big small{display:block;font:500 .62rem var(--mono);letter-spacing:.16em;text-transform:uppercase;color:var(--gd2);margin-bottom:12px}
.e1 .lc .mul{margin-top:10px;color:#3a3e3b;font-size:.95rem}
.e1 .lc .rows{margin-top:24px;border-top:1px solid #111}
.e1 .lc .rows div{display:grid;grid-template-columns:1fr 110px 54px;gap:12px;padding:10px 0;border-bottom:1px solid rgba(17,17,17,.1);font-size:.9rem;align-items:center}
.e1 .lc .rows div b{font:500 .85rem var(--mono);text-align:right}.e1 .lc .rows div i{font:500 .75rem var(--mono);font-style:normal;text-align:right;color:var(--mut)}
.e1 .lc .rows div em{grid-column:1/-1;display:block;height:2px;background:rgba(17,17,17,.08);font-style:normal;margin-top:-4px}.e1 .lc .rows div em s{display:block;height:2px;background:#1d5a43;text-decoration:none}
.e1 .lc .shelf{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:24px}
.e1 .lc .shelf div{border-top:1px solid #111;padding-top:12px}.e1 .lc .shelf b{display:block;font:300 1.8rem/1 var(--serif)}.e1 .lc .shelf span{display:block;margin-top:8px;font-size:.84rem;color:#3a3e3b;line-height:1.45}
/* simulator */
.e1 .ro{display:grid;grid-template-columns:320px 1fr;gap:50px;margin-top:50px;align-items:start}
.e1 .ro label{display:block;margin-bottom:18px}.e1 .ro label span{display:flex;justify-content:space-between;font-size:.9rem;color:#3a3e3b}.e1 .ro label span b{font:500 .9rem var(--mono)}
.e1 .ro input[type=range]{width:100%;margin-top:8px;accent-color:#1d5a43}
.e1 .ro .seg{display:flex;gap:6px;margin-bottom:22px;flex-wrap:wrap}.e1 .ro .seg button{appearance:none;border:1px solid rgba(17,17,17,.2);background:#fff;padding:8px 12px;font:600 .74rem var(--sans);border-radius:2px;color:#3a3e3b}.e1 .ro .seg button.on{background:var(--ink);color:#fff;border-color:var(--ink)}
.e1 .ro .tg{display:flex;align-items:center;gap:10px;font-size:.9rem;color:#3a3e3b;cursor:pointer}.e1 .ro .tg input{accent-color:#1d5a43;width:18px;height:18px}
.e1 .ro canvas{width:100%;height:320px;display:block;background:#fff}
.e1 .ro .k4{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px;margin-top:20px}
.e1 .ro .k4 div{border-top:1px solid #111;padding-top:10px}.e1 .ro .k4 b{display:block;font:300 1.7rem/1 var(--serif)}.e1 .ro .k4 span{display:block;margin-top:6px;font-size:.82rem;color:var(--mut)}
.e1 .ro .k4 b.bad{color:#9a5a00}
@media (max-width:980px){.e1 .lanes,.e1 .phs2,.e1 .lc,.e1 .ro{grid-template-columns:1fr;gap:30px}.e1 .wkg{grid-template-columns:1fr 1fr}.e1 .ro .k4{grid-template-columns:1fr 1fr}.e1 .lc .out{padding:22px}}
`)}

/* ---------- landed cost calculator ---------- */
const LC={fob:10.8,units:200,mode:'lcl',duty:.25,insp:1};
const LCC={cbm:.0032,lcl:111,fcl:2350,ins:.005,rdl:.02,cpf:.006,tmda:.02,inspUsd:299,bank:60,clear:600000,tmdaInsp:100000,truck:150000,vat:.18};
function lcCalc(){const f=LC.fob*LC.units,cbm=Math.max(.5,LC.units*LCC.cbm),fr=LC.mode==='lcl'?cbm*LCC.lcl:LCC.fcl,ins=(f+fr)*LCC.ins,cif=f+fr+ins;
 const usd={fob:f,fr:fr+ins,duty:cif*LC.duty,lev:cif*LCC.rdl+f*LCC.cpf,tmda:f*LCC.tmda,insp:LC.insp?LCC.inspUsd:0,bank:LCC.bank};
 const r=[[['Factory price (FOB)','Bei ya kiwanda (FOB)'],usd.fob*FX],[['Freight and insurance','Usafiri na bima'],usd.fr*FX],[['Import duty','Ushuru wa forodha'],usd.duty*FX],[['Railway levy 2% + processing fee 0.6%','Tozo ya reli 2% + ada ya uchakataji 0.6%'],usd.lev*FX],[['TMDA import fee 2% of FOB','Ada ya TMDA ya kuingiza 2% ya FOB'],usd.tmda*FX],[['Pre-shipment inspection','Ukaguzi kabla ya kusafirisha'],usd.insp*FX],[['Bank transfer fees','Ada za benki'],usd.bank*FX],[['Clearing agent (estimate)','Wakala wa forodha (makadirio)'],LCC.clear],[['TMDA consignment inspection','Ukaguzi wa mzigo wa TMDA'],LCC.tmdaInsp],[['Truck to the hub (estimate)','Lori hadi kituoni (makadirio)'],LCC.truck]];
 const tot=r.reduce((a,x)=>a+x[1],0),per=tot/LC.units,fac=LC.fob*FX,shelf=per/(1-MM.gm),gross=Math.ceil(shelf*(1+LCC.vat)/500)*500;
 return {r,tot,per,fac,shelf,gross,cbm,cif,vat:cif*FX*(1+LC.duty)*LCC.vat/LC.units}}
function lcHTML(){const c=lcCalc(),seg=(k,opts)=>`<div class="seg">${opts.map(o=>`<button type="button" data-lc="${k}" data-v="${o[0]}" class="${String(LC[k])===String(o[0])?'on':''}">${L(o[1])}</button>`).join('')}</div>`;
 return `<div><label><span>${T('Factory price per unit (FOB)','Bei ya kiwanda kwa kipande (FOB)')}<b>US$${LC.fob.toFixed(2)}</b></span><input type="range" min="2" max="40" step="0.1" value="${LC.fob}" data-lr="fob"></label>
 <label><span>${T('Units in this order','Vipande kwenye oda hii')}<b>${NF(LC.units)}</b></span><input type="range" min="50" max="3000" step="50" value="${LC.units}" data-lr="units"></label>
 <label><span>${T('How it travels','Inavyosafiri')}</span>${seg('mode',[['lcl',['Shared container (LCL)','Kontena la pamoja (LCL)']],['fcl',['Full 20ft container','Kontena kamili la futi 20']]])}<p class="hint2">${LC.mode==='lcl'?T(`About ${c.cbm.toFixed(2)} m³ at US$111 per m³ (minimum 0.5 m³)`,`Takriban m³ ${c.cbm.toFixed(2)} kwa US$111 kwa m³ (kiwango cha chini m³ 0.5)`):T('US$2,350, the midpoint of the July 2026 range','US$2,350, katikati ya kiwango cha Julai 2026')}</p></label>
 <label><span>${T('Import duty band (by tariff line)','Kiwango cha ushuru (kwa mstari wa ushuru)')}</span>${seg('duty',[[0,['0%','0%']],[.1,['10%','10%']],[.25,['25%','25%']],[.35,['35%','35%']]])}<p class="hint2">${T('We plan at 25% until a licensed clearing agent confirms the tariff line; many medical items fall in a lower band.','Tunapanga kwa 25% hadi wakala wa forodha mwenye leseni athibitishe mstari wa ushuru; vifaa vingi vya tiba viko kwenye kiwango cha chini.')}</p></label>
 <label><span>${T('Independent inspection before shipping','Ukaguzi huru kabla ya kusafirisha')}</span>${seg('insp',[[1,['Yes, always','Ndiyo, kila mara']],[0,['No (not our policy)','Hapana (si sera yetu)']]])}</label></div>
 <div class="out"><div class="big"><small>${T('Landed cost per unit, before VAT','Gharama halisi kwa kipande, kabla ya VAT')}</small>${TS(c.per)}</div><p class="mul">${T(`Factory price ${TS(c.fac)} becomes ${TS(c.per)} on our shelf: ${(c.per/c.fac).toFixed(2)}× the factory price.`,`Bei ya kiwanda ${TS(c.fac)} inakuwa ${TS(c.per)} rafuni kwetu: mara ${(c.per/c.fac).toFixed(2)} ya bei ya kiwanda.`)}</p>
 <div class="rows">${c.r.map(x=>`<div><span>${L(x[0])}</span><b>${TS(x[1]/LC.units)}</b><i>${Math.round(x[1]/c.tot*100)}%</i><em><s style="width:${Math.max(1,x[1]/c.tot*100)}%"></s></em></div>`).join('')}</div>
 <div class="shelf"><div><b>${TS(c.shelf)}</b><span>${T('shelf price before VAT at the 32% retail margin','bei ya rafuni kabla ya VAT kwa faida ya rejareja ya 32%')}</span></div><div><b>${TS(c.gross)}</b><span>${T('one honest price including 18% VAT, rounded to TSh 500','bei moja ya wazi ikiwemo VAT 18%, imezungushwa hadi TSh 500')}</span></div></div>
 <p class="hint2" style="margin-top:16px">${T(`Import VAT of about ${TS(c.vat)} per unit is paid at the port and reclaimed as input tax, so it is not a cost. Some medical goods are VAT-exempt under the VAT Act schedule; we confirm item by item.`,`VAT ya uagizaji ya takriban ${TS(c.vat)} kwa kipande inalipwa bandarini na kurudishwa kama kodi ya pembejeo, kwa hiyo si gharama. Baadhi ya bidhaa za tiba zimesamehewa VAT chini ya jedwali la Sheria ya VAT; tunathibitisha bidhaa moja moja.`)}${C('TAXES_AND_DUTIES')}</p></div>`}

/* ---------- reorder simulator ---------- */
const RO={lane:'local',sales:2,lead:7,safe:7,size:28,noise:0};
const LEADS={local:7,india:45,china:84};
function roSim(){const N=180;let seed=7;const rnd=()=>{seed=(seed*9301+49297)%233280;return seed/233280};
 const rp=Math.round(RO.sales*RO.lead+RO.sales*RO.safe),q=Math.round(RO.sales*RO.size);let st=rp+q,pipe=[],out=0,sum=0;const S=[],ords=[],arr=[];
 for(let d=0;d<N;d++){pipe=pipe.filter(p=>{if(p.at===d){st+=p.q;arr.push(d);return false}return true});
  const dem=RO.noise?Math.max(0,Math.round(RO.sales*(0.5+rnd()))):RO.sales;const sold=Math.min(st,dem);st-=sold;if(sold<dem)out++;
  const onOrder=pipe.reduce((a,p)=>a+p.q,0);if(st+onOrder<=rp){const late=RO.noise&&rnd()<.3?Math.round(RO.lead*.25):0;pipe.push({at:d+RO.lead+late,q});ords.push(d)}
  S.push(st);sum+=st}
 return {S,rp,q,ss:Math.round(RO.sales*RO.safe),out,avg:sum/N,ords,arr}}
function roHTML(){const lanes=[['local',['Local wholesaler','Muuzaji wa jumla wa ndani']],['india',['India','India']],['china',['China','China']]];
 return `<div><div class="seg">${lanes.map(l=>`<button type="button" data-rl="${l[0]}" class="${RO.lane===l[0]?'on':''}">${L(l[1])}</button>`).join('')}</div>
 ${[['sales',T('Units sold per day','Vipande vinavyouzwa kwa siku'),1,12,1,''],['lead',T('Lead time','Muda wa kusubiri'),3,120,1,T(' days',' siku')],['safe',T('Safety stock (days of sales)','Akiba ya usalama (siku za mauzo)'),0,45,1,T(' days',' siku')],['size',T('Order size (days of sales)','Ukubwa wa oda (siku za mauzo)'),7,120,1,T(' days',' siku')]].map(x=>`<label><span>${x[1]}<b id="rv-${x[0]}">${RO[x[0]]}${x[5]}</b></span><input type="range" min="${x[2]}" max="${x[3]}" step="${x[4]}" value="${RO[x[0]]}" data-rr="${x[0]}"></label>`).join('')}
 <label class="tg"><input type="checkbox" data-rn ${RO.noise?'checked':''}>${T('Real-life ups and downs (busy days, late ships)','Mabadiliko ya maisha halisi (siku za shughuli nyingi, meli zinazochelewa)')}</label></div>
 <div><canvas id="e2cv" width="1400" height="640"></canvas><div class="k4" id="e2k4"></div><p class="hint2" style="margin-top:12px;font-size:.8rem;color:var(--mut)">${T('One product over 180 days. Green line: units on the shelf. Dashed line: reorder point. Shaded band: safety stock. Ticks along the bottom mark orders placed (gold) and deliveries (green).','Bidhaa moja kwa siku 180. Mstari wa kijani: vipande rafuni. Mstari wa vistari: kiwango cha kuagiza. Ukanda uliotiwa kivuli: akiba ya usalama. Alama chini zinaonyesha oda zilizowekwa (dhahabu) na mizigo iliyofika (kijani).')}</p></div>`}
function roDraw(){const cv=document.getElementById('e2cv');if(!cv)return;const r=roSim(),x=cv.getContext('2d'),W=cv.width,H=cv.height,P={l:70,r:20,t:24,b:60};
 const mx=Math.max(...r.S,r.rp+r.q)*1.08||10,X=d=>P.l+d/179*(W-P.l-P.r),Y=v=>H-P.b-v/mx*(H-P.t-P.b);
 x.clearRect(0,0,W,H);x.font='22px JetBrains Mono, monospace';x.fillStyle='#8b8f8c';x.strokeStyle='rgba(17,17,17,.08)';x.lineWidth=1;
 for(let i=0;i<=4;i++){const v=mx/4*i;x.beginPath();x.moveTo(P.l,Y(v));x.lineTo(W-P.r,Y(v));x.stroke();x.fillText(Math.round(v),8,Y(v)+7)}
 [0,30,60,90,120,150,179].forEach(d=>x.fillText(T('day ','siku ')+(d===179?180:d),X(d)-30,H-18));
 x.fillStyle='rgba(201,165,92,.12)';x.fillRect(P.l,Y(r.ss),W-P.l-P.r,Y(0)-Y(r.ss));
 x.setLineDash([10,8]);x.strokeStyle='#9a7838';x.lineWidth=2;x.beginPath();x.moveTo(P.l,Y(r.rp));x.lineTo(W-P.r,Y(r.rp));x.stroke();x.setLineDash([]);
 x.strokeStyle='#1d5a43';x.lineWidth=3.2;x.beginPath();r.S.forEach((v,d)=>d?x.lineTo(X(d),Y(v)):x.moveTo(X(d),Y(v)));x.stroke();
 r.S.forEach((v,d)=>{if(v===0){x.fillStyle='rgba(154,90,0,.18)';x.fillRect(X(d)-3,P.t,6,Y(0)-P.t)}});
 r.ords.forEach(d=>{x.fillStyle='#c9a55c';x.fillRect(X(d)-2,H-P.b+6,4,12)});r.arr.forEach(d=>{x.fillStyle='#1d5a43';x.fillRect(X(d)-2,H-P.b+20,4,12)});
 document.getElementById('e2k4').innerHTML=`<div><b>${r.rp}</b><span>${T('reorder point (units)','kiwango cha kuagiza (vipande)')}</span></div><div><b>${r.ss}</b><span>${T('safety stock (units)','akiba ya usalama (vipande)')}</span></div><div><b class="${r.out?'bad':''}">${r.out}</b><span>${T('days out of stock in 180','siku za kuishiwa kati ya 180')}</span></div><div><b>${Math.round(r.avg)}</b><span>${T('average units on the shelf','wastani wa vipande rafuni')}</span></div>`}

/* ---------- full explanations ---------- */
const DH=(t,l)=>`<div class="ey">${T('Full explanation','Maelezo kamili')}</div><h2>${t}</h2><p class="dl">${l}</p>`;
const DEEP={
 why:()=>DH(T('Sourcing in plain words','Upatikanaji kwa maneno rahisi'),T('What sourcing means for a health store, why it is the first line of quality, and the eight terms used in the rest of this section.','Upatikanaji una maana gani kwa duka la afya, kwa nini ndio mstari wa kwanza wa ubora, na maneno manane yanayotumika katika sehemu iliyobaki.'))+
 `<h3>${T('What sourcing is','Upatikanaji ni nini')}</h3><p>${T('Sourcing is every decision between “we need this product” and “it is on the shelf”: which product, from which maker, through which supplier, by which route, at what true cost and with which paperwork. In most shops these decisions are made quickly, by phone, by whoever is free. In a health store they decide whether a blood-pressure reading is accurate, whether a dressing is sterile and whether a child’s thermometer is safe.','Upatikanaji ni kila uamuzi kati ya “tunahitaji bidhaa hii” na “iko rafuni”: bidhaa ipi, kutoka kwa mtengenezaji yupi, kupitia msambazaji yupi, kwa njia ipi, kwa gharama halisi ipi na kwa nyaraka zipi. Katika maduka mengi maamuzi haya yanafanywa haraka, kwa simu, na yeyote aliye huru. Katika duka la afya yanaamua kama kipimo cha presha ni sahihi, kama bandeji ni tasa na kama kipimajoto cha mtoto ni salama.')}</p>
 <h3>${T('Why it is the first line of quality','Kwa nini ndio mstari wa kwanza wa ubora')}</h3><p>${T('No amount of good service can fix a falsified product. That is why our rule comes before price: registered, checked, traceable or not on our shelf. Price matters, and the landed-cost chapter shows how hard we work on it, but only among products that have already passed the quality gates.','Huduma nzuri kiasi gani haiwezi kurekebisha bidhaa bandia. Ndiyo sababu kanuni yetu inakuja kabla ya bei: imesajiliwa, imekaguliwa, inafuatilika au haiko rafuni kwetu. Bei ni muhimu, na sura ya gharama halisi inaonyesha tunavyoifanyia kazi kwa bidii, lakini tu kati ya bidhaa zilizokwisha kupita milango ya ubora.')}</p>
 <h3>${T('Eight terms you will meet','Maneno manane utakayokutana nayo')}</h3><dl class="gl">${GLOSS.map(g=>`<dt>${L(g[0])}</dt><dd>${L(g[1])}</dd>`).join('')}</dl>`,
 trip:()=>DH(T('The paper trail of one import','Mfuatano wa nyaraka wa uagizaji mmoja'),T('Each step of the journey produces a document. Together they prove what we bought, that it is genuine, that every tax was paid and where every unit went.','Kila hatua ya safari inazalisha hati. Pamoja zinathibitisha tulichonunua, kwamba ni halisi, kwamba kila kodi ililipwa na kila kipande kilienda wapi.'))+
 TT([T('Day','Siku'),T('Document','Hati'),T('Who issues it','Nani anaitoa'),T('Why it matters','Kwa nini ni muhimu')],[
  ['0',T('Purchase order and proforma invoice','Oda ya ununuzi na ankara ya awali'),T('Afya / factory','Afya / kiwanda'),T('Fixes model, quantity, price, labels and minimum shelf life','Inafunga modeli, idadi, bei, lebo na muda wa chini wa matumizi')],
  ['0–7',T('TMDA import permit application','Ombi la kibali cha TMDA cha kuingiza'),T('Afya via the TMDA portal','Afya kupitia tovuti ya TMDA'),T('Must be filed at least six weeks before shipment','Lazima kiwasilishwe angalau wiki sita kabla ya kusafirisha')],
  ['30',T('Pre-shipment inspection report','Ripoti ya ukaguzi kabla ya kusafirisha'),T('Independent inspector','Mkaguzi huru'),T('Releases the 70% balance only on a pass','Inaruhusu salio la 70% tu ikipita')],
  ['34',T('Commercial invoice, packing list, certificate of origin','Ankara ya biashara, orodha ya mzigo, cheti cha asili'),T('Factory','Kiwanda'),T('Needed by customs to value and classify the goods','Zinahitajika na forodha kuthaminisha na kuainisha bidhaa')],
  ['34',T('Bill of lading','Hati ya mzigo'),T('Freight forwarder','Wakala wa usafirishaji'),T('Proves ownership; needed to collect the goods','Inathibitisha umiliki; inahitajika kuchukua bidhaa')],
  ['70–78',T('Customs declaration and tax receipts','Tamko la forodha na risiti za kodi'),T('Clearing agent / TRA','Wakala wa forodha / TRA'),T('Shows duty, levies and VAT paid; VAT reclaimed later','Inaonyesha ushuru, tozo na VAT vilivyolipwa; VAT inarudishwa baadaye')],
  ['78',T('Release order','Amri ya kutolewa'),T('TRA and TMDA','TRA na TMDA'),T('Goods may leave the port','Bidhaa zinaweza kutoka bandarini')],
  ['80',T('Goods received note','Hati ya kupokea bidhaa'),T('Afya hub','Kituo cha Afya'),T('Counts, batch, expiry and inspection result; releases the batch to the till','Idadi, kundi, tarehe ya kuisha na matokeo ya ukaguzi; inaruhusu kundi kwenye mauzo')]])+
 `<p>${T('All of these are stored against the purchase order in the stock system, so an auditor, TMDA or an investor can open one record and see the whole history of a batch.','Zote hizi zinahifadhiwa dhidi ya oda ya ununuzi kwenye mfumo wa stoku, kwa hiyo mkaguzi, TMDA au mwekezaji anaweza kufungua kumbukumbu moja na kuona historia nzima ya kundi.')}</p>`,
 lanes:()=>DH(T('How we find, test and pay suppliers','Tunavyopata, kujaribu na kulipa wasambazaji'),T('A supplier earns a place on our approved list through the same five steps, whether it is a factory in Shenzhen or a wholesaler in Kariakoo.','Msambazaji anapata nafasi kwenye orodha yetu iliyoidhinishwa kupitia hatua tano zilezile, kiwe kiwanda Shenzhen au muuzaji wa jumla Kariakoo.'))+
 `<h3>${T('Five steps to an approved supplier','Hatua tano hadi msambazaji aliyeidhinishwa')}</h3><ol class="ol"><li>${T('<b>Longlist.</b> Factories from B2B platforms such as Alibaba and Global Sources, filtered for ISO 13485 and CE or FDA clearance; local wholesalers from TMDA’s licensed lists and directories.','<b>Orodha ndefu.</b> Viwanda kutoka majukwaa ya B2B kama Alibaba na Global Sources, vikichujwa kwa ISO 13485 na CE au idhini ya FDA; wauzaji wa jumla wa ndani kutoka orodha za leseni za TMDA na saraka.')}${C('alibaba')}${C('pharmchoices')}</li><li>${T('<b>Documents.</b> Business licence, quality certificates, clinical validation for monitors, export references.','<b>Nyaraka.</b> Leseni ya biashara, vyeti vya ubora, uthibitisho wa kitabibu kwa mashine za presha, marejeo ya kuuza nje.')}</li><li>${T('<b>Samples.</b> Paid samples tested against a reference and reviewed for labels and instructions in Kiswahili and English.','<b>Sampuli.</b> Sampuli zilizolipiwa zinajaribiwa dhidi ya marejeo na kupitiwa kwa lebo na maelekezo ya Kiswahili na Kiingereza.')}</li><li>${T('<b>Audit.</b> A video audit of the factory floor, or an inspector’s visit for larger orders.','<b>Ukaguzi.</b> Ukaguzi wa video wa sakafu ya kiwanda, au ziara ya mkaguzi kwa oda kubwa.')}</li><li>${T('<b>Trial order.</b> A small first order with full inspection before the supplier is approved for repeat business.','<b>Oda ya majaribio.</b> Oda ndogo ya kwanza yenye ukaguzi kamili kabla msambazaji hajaidhinishwa kwa biashara ya kurudia.')}</li></ol>
 <h3>${T('How we pay','Tunavyolipa')}</h3><p>${T('The usual terms with Chinese factories are a 30% deposit to start production and the 70% balance before shipping. We only release the balance after an independent inspection passes. An international bank transfer costs about US$40–80; paying through Alibaba’s Trade Assurance adds buyer protection for a processing fee of about 2.99%, which we use for first orders with new factories.','Masharti ya kawaida na viwanda vya China ni amana ya 30% kuanza uzalishaji na salio la 70% kabla ya kusafirisha. Tunaruhusu salio tu baada ya ukaguzi huru kupita. Uhamisho wa benki wa kimataifa unagharimu takriban US$40–80; kulipa kupitia Trade Assurance ya Alibaba kunaongeza ulinzi wa mnunuzi kwa ada ya uchakataji ya takriban 2.99%, tunayoitumia kwa oda za kwanza na viwanda vipya.')}${C('jingsourcing')}</p>
 <h3>${T('How we score suppliers every month','Tunavyowapa alama wasambazaji kila mwezi')}</h3>`+TT([T('Measure','Kipimo'),T('Target','Lengo')],[[T('Delivered on time','Imefika kwa wakati'),'≥ 95%'],[T('Delivered complete','Imefika kamili'),'≥ 98%'],[T('Units rejected at inspection','Vipande vilivyokataliwa ukaguzini'),'≤ 1%'],[T('Shelf life on arrival','Muda wa matumizi ilipofika'),T('above TMDA minimum on every batch','juu ya kiwango cha chini cha TMDA kwa kila kundi')],[T('Price against the market','Bei dhidi ya soko'),T('reviewed every quarter','inapitiwa kila robo mwaka')]])+`<p>${T('A supplier that misses two targets for two months in a row goes on review, and its second-source alternative is given more of the volume.','Msambazaji anayekosa malengo mawili kwa miezi miwili mfululizo anawekwa kwenye mapitio, na mbadala wake wa chanzo cha pili anapewa sehemu kubwa zaidi ya kiasi.')}</p>`,
 phase:()=>DH(T('When to import, and what it changes','Lini kuagiza, na kinachobadilika'),T('Direct importing is a margin lever, but only for the right products at the right time. This is how we decide.','Kuagiza moja kwa moja ni nyenzo ya faida, lakini kwa bidhaa sahihi kwa wakati sahihi tu. Hivi ndivyo tunavyoamua.'))+
 `<h3>${T('Why not import from day one','Kwa nini tusiagize tangu siku ya kwanza')}</h3><p>${T('At launch we do not yet know which brands and sizes our customers prefer, a direct import ties up cash for about three months, and the hub does not yet hold its importing-warehouse permit. Buying from licensed local wholesalers removes all three risks while the till collects the sales history we need.','Mwanzoni bado hatujui chapa na saizi wateja wetu wanazopendelea, uagizaji wa moja kwa moja unafunga pesa kwa takriban miezi mitatu, na kituo bado hakina kibali cha ghala la kuagiza. Kununua kutoka wauzaji wa jumla wa ndani wenye leseni kunaondoa hatari zote tatu huku mashine ya mauzo ikikusanya historia ya mauzo tunayohitaji.')}</p>
 <h3>${T('The three-part switch test','Jaribio la sehemu tatu la kubadili')}</h3><ol class="ol"><li>${T('Steady sales for at least three months, so the order size can be calculated, not guessed.','Mauzo thabiti kwa angalau miezi mitatu, ili ukubwa wa oda uhesabiwe, si kubahatishwa.')}</li><li>${T('A landed cost at least 20% below the local wholesale price, after every fee in the calculator, so the saving survives a weaker shilling or a delayed ship.','Gharama halisi iliyo angalau 20% chini ya bei ya jumla ya ndani, baada ya kila ada kwenye kikokotoo, ili akiba ibaki hata shilingi ikidhoofika au meli ikichelewa.')}</li><li>${T('The hub registered with TMDA as an importing warehouse and, for devices, the model registered or notified with TMDA.','Kituo kimesajiliwa TMDA kama ghala la kuagiza na, kwa vifaa, modeli imesajiliwa au kuarifiwa TMDA.')}${C('1718887575')}</li></ol>
 <h3>${T('What it changes','Kinachobadilika')}</h3><p>${T('Every shilling saved on landed cost either becomes margin or lets us price below the market while keeping the 32% margin. Because box products are planned at a 26% margin after the member saving of 3–9% by plan, importing the steady box items is where the saving matters most. The first candidates are the products that sell every day and never change: wipes, gauze, gloves, thermometers and our own box packaging.','Kila shilingi inayookolewa kwenye gharama halisi inakuwa faida au inaturuhusu kuweka bei chini ya soko huku tukibaki na faida ya 32%. Kwa sababu bidhaa za box zimepangwa kwa faida ya 26% baada ya punguzo la mwanachama la 3–9% kulingana na mpango, kuagiza bidhaa thabiti za box ndipo akiba inapokuwa na maana zaidi. Za kwanza kuchaguliwa ni bidhaa zinazouzwa kila siku na hazibadiliki: wipes, shashi, glavu, vipimajoto na vifungashio vya box zetu.')}</p>`,
 land:()=>{const c=lcCalc();return DH(T('Every rate behind the calculator','Kila kiwango nyuma ya kikokotoo'),T('Published rates are linked to their source; planning estimates are labelled and will be replaced by quotations.','Viwango vilivyochapishwa vimeunganishwa na chanzo chake; makadirio ya mipango yamewekewa alama na yatabadilishwa na nukuu.'))+
 TT([T('Item','Kipengele'),T('Rate used','Kiwango kilichotumika'),T('Basis','Msingi')],[
  [T('Exchange rate','Kiwango cha ubadilishaji'),'TSh 2,644 / US$',T('Mid-market, 2 Nov 2026','Soko la kati, 2 Nov 2026')+C('currencybeacon')],
  [T('Factory price','Bei ya kiwanda'),'US$10.80',T('Midpoint of a CE-marked listing at US$9.90–11.70','Katikati ya orodha yenye CE kwa US$9.90–11.70')+C('alibaba')],
  [T('Shared-container freight','Usafiri wa kontena la pamoja'),'US$111 / m³',T('Shenzhen direct sailing, 30 days; range US$102–163','Safari ya moja kwa moja Shenzhen, siku 30; kiwango US$102–163')+C('5688')+C('sino-shipping')],
  [T('Full 20ft container','Kontena kamili la futi 20'),'US$2,350',T('Midpoint of US$2,100–2,600, July 2026','Katikati ya US$2,100–2,600, Julai 2026')+C('greathensen')],
  [T('Volume per monitor','Ujazo kwa mashine'),'0.0032 m³',T('Estimate for a boxed monitor with cuff','Makadirio kwa mashine iliyo kwenye boksi pamoja na kafu')],
  [T('Insurance','Bima'),'0.5%',T('Estimate, of goods + freight','Makadirio, ya bidhaa + usafiri')],
  [T('Import duty','Ushuru wa forodha'),'0 / 10 / 25 / 35%',T('EAC bands; tariff line confirmed by the agent','Viwango vya EAC; mstari wa ushuru unathibitishwa na wakala')+C('TAXES_AND_DUTIES')],
  [T('Railway Development Levy','Tozo ya Maendeleo ya Reli'),'2% CIF',T('TRA 2025/26','TRA 2025/26')+C('TAXES_AND_DUTIES')],
  [T('Customs Processing Fee','Ada ya Uchakataji wa Forodha'),'0.6% FOB',T('TRA 2025/26','TRA 2025/26')+C('TAXES_AND_DUTIES')],
  [T('TMDA import fee','Ada ya TMDA ya kuingiza'),'2% FOB',T('Fees regulations, June 2024','Kanuni za ada, Juni 2024')+C('1718887575')],
  [T('TMDA consignment inspection','Ukaguzi wa mzigo wa TMDA'),'TSh 100,000',T('Fees regulations, June 2024','Kanuni za ada, Juni 2024')+C('1718887575')],
  [T('Pre-shipment inspection','Ukaguzi kabla ya kusafirisha'),'US$299',T('One inspector-day','Siku moja ya mkaguzi')+C('qualityinspection')],
  [T('Bank transfer','Uhamisho wa benki'),'US$60',T('Midpoint of US$40–80','Katikati ya US$40–80')+C('jingsourcing')],
  [T('Clearing agent','Wakala wa forodha'),'TSh 600,000',T('Estimate per consignment; TASAC minimum fees apply from 2026','Makadirio kwa mzigo; ada za chini za TASAC zinatumika kuanzia 2026')+C('feaffa')],
  [T('Truck to the hub','Lori hadi kituoni'),'TSh 150,000',T('Estimate','Makadirio')],
  [T('VAT on imports','VAT ya uagizaji'),'18%',T('Paid and reclaimed as input tax','Inalipwa na kurudishwa kama kodi ya pembejeo')+C('TAXES_AND_DUTIES')]])+
 `<h3>${T('Two lessons from the numbers','Mafunzo mawili kutoka namba')}</h3><p>${T(`<b>Fixed costs punish small orders.</b> Clearing, inspection, the TMDA inspection and the truck cost about the same for 200 units as for 2,000. In the current example they add ${TS((LCC.clear+LCC.tmdaInsp+LCC.truck+(LCC.inspUsd+LCC.bank)*FX)/LC.units)} to every unit; at 2,000 units they would add a tenth of that. This is why imports wait for proven volume and, later, combined orders across stores.`,`<b>Gharama zisizobadilika zinaumiza oda ndogo.</b> Forodha, ukaguzi, ukaguzi wa TMDA na lori vinagharimu takriban sawa kwa vipande 200 kama kwa 2,000. Katika mfano wa sasa vinaongeza ${TS((LCC.clear+LCC.tmdaInsp+LCC.truck+(LCC.inspUsd+LCC.bank)*FX)/LC.units)} kwa kila kipande; kwa vipande 2,000 vingeongeza sehemu ya kumi ya hiyo. Ndiyo sababu uagizaji unasubiri kiasi kilichothibitishwa na, baadaye, oda zilizounganishwa za maduka.`)}</p><p>${T('<b>The duty band is the biggest unknown.</b> Moving from 25% to 0% changes the landed cost more than any freight choice, so the tariff line of every product is confirmed by a licensed clearing agent before the first order, and the calculator is re-run with the confirmed rate.','<b>Kiwango cha ushuru ndicho kisichojulikana zaidi.</b> Kuhama kutoka 25% hadi 0% kunabadilisha gharama halisi kuliko chaguo lolote la usafiri, kwa hiyo mstari wa ushuru wa kila bidhaa unathibitishwa na wakala wa forodha mwenye leseni kabla ya oda ya kwanza, na kikokotoo kinaendeshwa upya kwa kiwango kilichothibitishwa.')}</p>`},
 reo:()=>DH(T('The reorder rule, lane by lane','Kanuni ya kuagiza, njia kwa njia'),T('The same formula runs for every product. What changes between lanes is the lead time, and with it how much stock we must hold.','Fomula ileile inaendeshwa kwa kila bidhaa. Kinachobadilika kati ya njia ni muda wa kusubiri, na pamoja nao kiasi cha stoku tunachopaswa kushika.'))+
 `<p>${T('<b>Reorder point = daily sales × lead time + safety stock.</b> Take a product that sells 2 units a day with safety stock of 7 days:','<b>Kiwango cha kuagiza = mauzo ya siku × muda wa kusubiri + akiba ya usalama.</b> Chukua bidhaa inayouza vipande 2 kwa siku na akiba ya usalama ya siku 7:')}</p>`+
 TT([T('Lane','Njia'),T('Lead time','Muda wa kusubiri'),T('Reorder point','Kiwango cha kuagiza'),T('What it means','Maana yake')],[[T('Local wholesaler','Muuzaji wa jumla wa ndani'),T('7 days','Siku 7'),'2×7 + 14 = 28',T('Order when 28 are left','Agiza vikibaki 28')],[T('India','India'),T('about 45 days','takriban siku 45'),'2×45 + 14 = 104',T('Order when 104 are left','Agiza vikibaki 104')],[T('China','China'),T('about 84 days','takriban siku 84'),'2×84 + 14 = 182',T('Order when 182 are left','Agiza vikibaki 182')]])+
 `<p>${T('The longer the lane, the more stock sits on the shelf and in transit, and the more a forecasting error costs. That is why imported lanes carry more safety stock, why fast movers keep a local second source, and why the Afya Twin’s household forecasts (section 3.8) feed directly into these numbers: every member’s predicted use becomes a known part of daily sales.','Kadiri njia inavyokuwa ndefu, ndivyo stoku nyingi inakaa rafuni na njiani, na ndivyo kosa la utabiri linavyogharimu zaidi. Ndiyo sababu njia za kuagiza nje zinabeba akiba kubwa zaidi ya usalama, kwa nini bidhaa zinazouzwa haraka zinabaki na chanzo cha pili cha ndani, na kwa nini utabiri wa kaya wa Afya Twin (sehemu 3.8) unaingia moja kwa moja kwenye namba hizi: matumizi yanayotabiriwa ya kila mwanachama yanakuwa sehemu inayojulikana ya mauzo ya siku.')}</p>
 <h3>${T('What the system does automatically','Mfumo unachofanya wenyewe')}</h3><ol class="ol"><li>${T('Recalculates daily sales every week from the last 8 weeks, weighted to recent weeks.','Unahesabu upya mauzo ya siku kila wiki kutoka wiki 8 zilizopita, ukipa uzito wiki za karibuni.')}</li><li>${T('Counts stock in transit, so it never orders twice for the same gap.','Unahesabu stoku iliyo njiani, ili usiagize mara mbili kwa pengo lilelile.')}</li><li>${T('Drafts the purchase order for the buyer to approve with one tap.','Unaandaa oda ya ununuzi kwa mnunuzi kuidhinisha kwa mguso mmoja.')}</li><li>${T('Flags slow sellers after 60 days without a sale so cash is not tied up.','Unawekea alama bidhaa zinazouzwa polepole baada ya siku 60 bila kuuzwa ili pesa isifungwe.')}</li></ol>`,
 gate:()=>DH(T('Each gate in detail','Kila mlango kwa kina'),T('What is checked, who checks it, and what happens when something fails.','Kinachokaguliwa, nani anakagua, na kinachotokea kitu kikishindwa.'))+
 GATES.map((g,i)=>`<h3>0${i+1} · ${L(g[0])}</h3><p>${L(g[1])}</p>`).join('')+
 `<h3>${T('When a product fails','Bidhaa ikishindwa')}</h3><ol class="ol"><li>${T('The batch is blocked in the system; the till refuses its barcode.','Kundi linazuiwa kwenye mfumo; mashine ya mauzo inakataa msimbopau wake.')}</li><li>${T('Units are set aside, photographed and logged against the supplier and the purchase order.','Vipande vinatengwa, vinapigwa picha na kurekodiwa dhidi ya msambazaji na oda ya ununuzi.')}</li><li>${T('The supplier replaces or refunds under the contract; the cost of re-inspection is theirs.','Msambazaji anabadilisha au kurudisha pesa chini ya mkataba; gharama ya ukaguzi upya ni yao.')}</li><li>${T('If a safety problem is suspected, it is reported to TMDA, which runs product safety reporting and recalls.','Tatizo la usalama likishukiwa, linaripotiwa TMDA, inayoendesha utoaji taarifa za usalama wa bidhaa na urejeshaji.')}</li><li>${T('The second-source supplier covers the gap while the case is open.','Msambazaji wa chanzo cha pili anaziba pengo wakati suala liko wazi.')}</li></ol>`,
 law:()=>DH(T('How a permit is obtained','Kibali kinavyopatikana'),T('The order of steps matters: premises first, products next, permits for each consignment last.','Mpangilio wa hatua ni muhimu: jengo kwanza, bidhaa kisha, vibali kwa kila mzigo mwisho.'))+
 `<ol class="ol"><li>${T('<b>Register the premises.</b> The store is licensed as a retail medical-device outlet (TSh 100,000 a year). From store 2, the hub is registered as an importing and medical-device warehouse (TSh 300,000 each). Importers must register premises before applying for any permit.','<b>Sajili jengo.</b> Duka linapewa leseni kama duka la rejareja la vifaa tiba (TSh 100,000 kwa mwaka). Kuanzia duka la 2, kituo kinasajiliwa kama ghala la kuagiza na la vifaa tiba (TSh 300,000 kila moja). Waagizaji lazima wasajili jengo kabla ya kuomba kibali chochote.')}${C('1718887575')}${C('import-and-export-control-of-medical-devices')}</li>
 <li>${T('<b>Check or register the product.</b> Devices must be registered or notified with TMDA. An imported Class A device costs US$500 to register and Classes B–D US$2,500, plus a yearly retention fee; review takes about 90 or 240 days, and a foreign maker needs a local authorised representative. We prefer models already registered and start new registrations early.','<b>Kagua au sajili bidhaa.</b> Vifaa lazima visajiliwe au kuarifiwa TMDA. Kusajili kifaa cha Daraja A kutoka nje kunagharimu US$500 na Madaraja B–D US$2,500, pamoja na ada ya mwaka; mapitio yanachukua takriban siku 90 au 240, na mtengenezaji wa nje anahitaji mwakilishi wa ndani. Tunapendelea modeli zilizokwisha kusajiliwa na kuanza usajili mpya mapema.')}${C('1718887575')}${C('omcmedical')}</li>
 <li>${T('<b>Apply for the import permit.</b> Online, at least six weeks before the goods are shipped, with the proforma invoice and product details. Processing takes about seven days.','<b>Omba kibali cha kuingiza.</b> Mtandaoni, angalau wiki sita kabla bidhaa hazijasafirishwa, pamoja na ankara ya awali na taarifa za bidhaa. Inashughulikiwa ndani ya takriban siku saba.')}${C('import-and-export-control-of-medical-devices')}</li>
 <li>${T('<b>Pay at entry.</b> TMDA’s 2% import fee on FOB value, TRA’s duty, levies and VAT, through the licensed clearing agent.','<b>Lipa wakati wa kuingiza.</b> Ada ya TMDA ya 2% kwenye thamani ya FOB, ushuru, tozo na VAT za TRA, kupitia wakala wa forodha mwenye leseni.')}${C('1718887575')}${C('TAXES_AND_DUTIES')}</li>
 <li>${T('<b>Check shelf life at arrival.</b> At least 60% (over 24 months) or 80% (24 months or less) remaining, or the consignment is refused.','<b>Kagua muda wa matumizi ikifika.</b> Angalau 60% (zaidi ya miezi 24) au 80% (miezi 24 au chini) ubaki, vinginevyo mzigo unakataliwa.')}${C('import-and-export-control-of-medical-devices')}</li></ol>
 <h3>${T('Cosmetics, soaps and personal care','Vipodozi, sabuni na huduma binafsi')}</h3><p>${T('Since 2019 these are regulated by the Tanzania Bureau of Standards rather than TMDA. Imported products are registered with TBS and certified batch by batch under the 2021 regulations; some categories also need a Certificate of Conformity issued before shipping under TBS’s pre-shipment verification programme.','Tangu 2019 hivi vinadhibitiwa na Shirika la Viwango Tanzania badala ya TMDA. Bidhaa zinazoagizwa zinasajiliwa TBS na kuthibitishwa kundi kwa kundi chini ya kanuni za 2021; baadhi ya makundi pia yanahitaji Cheti cha Ulinganifu kinachotolewa kabla ya kusafirisha chini ya mpango wa uthibitishaji wa TBS.')}${C('newscentraltv')}${C('tbs.go.tz')}${C('tuv.com')}</p>
 <h3>${T('Medicines','Dawa')}</h3><p>${T('TMDA allows only registered wholesalers, manufacturers and a few named groups to import medicines, so Afya Basics buys any medicines it is permitted to sell from licensed Tanzanian wholesalers. Section 4.5 explains what the store may sell and the pharmacist rules.','TMDA inaruhusu wauzaji wa jumla waliosajiliwa, watengenezaji na makundi machache yaliyotajwa tu kuagiza dawa, kwa hiyo Afya Basics inanunua dawa yoyote inayoruhusiwa kuuza kutoka wauzaji wa jumla wa Tanzania wenye leseni. Sehemu 4.5 inaeleza duka linaweza kuuza nini na kanuni za mfamasia.')}${C('import-and-export-control')}</p>`,
 team:()=>DH(T('The twelve weeks before opening','Wiki kumi na mbili kabla ya kufungua'),T('Sourcing starts long before the doors open. This is the calendar that fills the shelves with registered, checked products on day one.','Upatikanaji unaanza muda mrefu kabla milango haijafunguliwa. Hii ndiyo kalenda inayojaza rafu kwa bidhaa zilizosajiliwa na kukaguliwa siku ya kwanza.'))+
 TT([T('Week','Wiki'),T('Work','Kazi'),T('Owner','Mhusika')],[
  ['−12',T('Final range list from section 3.6; registration status checked for every product','Orodha ya mwisho ya bidhaa kutoka sehemu 3.6; hali ya usajili inakaguliwa kwa kila bidhaa'),T('Founders','Waanzilishi')],
  ['−11',T('Store premises application to TMDA (retail device outlet) and TBS where needed','Ombi la jengo la duka kwa TMDA (duka la rejareja la vifaa) na TBS pale inapohitajika'),T('Founders','Waanzilishi')],
  ['−10',T('Shortlist two licensed wholesalers per category; request price lists and terms','Orodha fupi ya wauzaji wa jumla wawili wenye leseni kwa kila kundi; omba orodha za bei na masharti'),T('Store lead','Kiongozi wa duka')],
  ['−8',T('Samples received and checked; supplier documents verified','Sampuli zinapokelewa na kukaguliwa; nyaraka za wasambazaji zinathibitishwa'),T('Store lead','Kiongozi wa duka')],
  ['−6',T('Suppliers approved; catalogue, barcodes and prices loaded into the stock system','Wasambazaji wanaidhinishwa; katalogi, misimbopau na bei zinaingizwa kwenye mfumo wa stoku'),T('Store lead + developer','Kiongozi wa duka + msanidi')],
  ['−4',T('Opening stock ordered against the seed budget, with reorder points set','Stoku ya kufungulia inaagizwa dhidi ya bajeti ya mtaji, pamoja na viwango vya kuagiza'),T('Founders','Waanzilishi')],
  ['−2',T('Deliveries received through gate 5; every batch scanned and released','Mizigo inapokelewa kupitia mlango wa 5; kila kundi linachanganuliwa na kuruhusiwa'),T('Picker and packer','Mchukuaji na mfungaji')],
  ['−1',T('Shelves filled; trial reorder cycle run; emergency second sources confirmed','Rafu zinajazwa; mzunguko wa majaribio wa kuagiza unaendeshwa; vyanzo vya pili vya dharura vinathibitishwa'),T('Whole team','Timu nzima')]])+
 `<h3>${T('Cost of the sourcing team','Gharama ya timu ya upatikanaji')}</h3><p>${T('At launch there is no extra salary: buying is done by the store lead and the founders, and the picker and packer receives. Clearing agents and inspection companies are paid per job and appear in the landed cost. A dedicated importer and buyer joins only from store 2, when direct imports begin.','Mwanzoni hakuna mshahara wa ziada: ununuzi unafanywa na kiongozi wa duka na waanzilishi, na mchukuaji na mfungaji anapokea. Mawakala wa forodha na kampuni za ukaguzi wanalipwa kwa kazi na wanaonekana kwenye gharama halisi. Mwagizaji na mnunuzi maalum anajiunga kuanzia duka la 2 tu, uagizaji wa moja kwa moja ukianza.')}</p>`,
 cash:()=>{const c=lcCalc(),f=LC.fob*LC.units*FX,dep=f*.3,bal=f*.7+LCC.inspUsd*FX+LCC.bank*FX,port=c.tot-f-LCC.inspUsd*FX-LCC.bank*FX;return DH(T('The cash cycle of one import','Mzunguko wa pesa wa uagizaji mmoja'),T('Using the calculator’s current example, this is when money leaves the bank and when it starts coming back.','Kwa kutumia mfano wa sasa wa kikokotoo, hii ndiyo wakati pesa zinatoka benki na zinapoanza kurudi.'))+
 TT([T('Day','Siku'),T('Cash event','Tukio la pesa'),'TSh'],[['0',T('30% deposit to the factory','Amana 30% kwa kiwanda'),'−'+NF(dep)],['30',T('70% balance, inspection and bank fees','Salio 70%, ukaguzi na ada za benki'),'−'+NF(bal)],['70–78',T('Freight, duty, levies, TMDA fees, clearing and truck (import VAT paid and reclaimed later)','Usafiri, ushuru, tozo, ada za TMDA, forodha na lori (VAT ya uagizaji inalipwa na kurudishwa baadaye)'),'−'+NF(port)],['82',T('First sales; cash starts returning at the shelf price','Mauzo ya kwanza; pesa zinaanza kurudi kwa bei ya rafuni'),'+'],[T('Total out','Jumla iliyotoka'),'',`<b>−${NF(c.tot)}</b>`]])+
 `<p>${T(`At ${RO.sales} units a day, ${NF(LC.units)} units take about ${Math.round(LC.units/RO.sales)} days to sell. The money is therefore out of the bank for roughly ${Math.round(82+LC.units/RO.sales/2)} days on average. A local purchase of the same stock is paid within days of selling it. This is the real cost of importing that the margin must pay for, and why the switch test asks for at least a 20% saving.`,`Kwa vipande ${RO.sales} kwa siku, vipande ${NF(LC.units)} vinachukua takriban siku ${Math.round(LC.units/RO.sales)} kuuzwa. Kwa hiyo pesa ziko nje ya benki kwa takriban siku ${Math.round(82+LC.units/RO.sales/2)} kwa wastani. Ununuzi wa ndani wa stoku ileile unalipwa ndani ya siku chache baada ya kuuzwa. Hii ndiyo gharama halisi ya kuagiza ambayo faida lazima iilipie, na kwa nini jaribio la kubadili linataka akiba ya angalau 20%.`)}</p>`}};

/* ---------- init ---------- */
let e2io=null,e2so=null,e2co=null;
function paintLC(){const el=document.getElementById('e2lc');if(el)el.innerHTML=lcHTML()}
function paintRO(){const el=document.getElementById('e2ro');if(el){el.innerHTML=roHTML();roDraw()}}
function init42(){const root=document.getElementById('e2');if(!root)return;paintLC();paintRO();
 if(e2io)e2io.disconnect();const rv=root.querySelectorAll('.rv');
 if('IntersectionObserver' in window){e2io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');e2io.unobserve(en.target)}}),{rootMargin:'0px 0px -6% 0px'});rv.forEach(x=>e2io.observe(x))}else rv.forEach(x=>x.classList.add('in'));
 if(e2co)e2co.disconnect();const links=[...root.querySelectorAll('.cbar a')];
 e2co=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){links.forEach(a=>a.classList.toggle('on',a.dataset.jump===en.target.id));const on=root.querySelector('.cbar a.on');if(on){const bar=on.parentElement;bar.scrollTo({left:on.offsetLeft-bar.clientWidth/3,behavior:'smooth'})}}}),{rootMargin:'-45% 0px -50% 0px'});
 CH.forEach(c=>{const s=document.getElementById(c[0]);if(s)e2co.observe(s)});
 if(e2so)e2so.disconnect();const stg=document.getElementById('e2stg'),imgs=stg?stg.querySelectorAll('img'):[],pg=stg?stg.querySelectorAll('.pg span'):[],steps=root.querySelectorAll('.stp');
 const setStep=i=>{imgs.forEach((m,j)=>m.classList.toggle('on',j===i));pg.forEach((m,j)=>m.classList.toggle('on',j<=i));steps.forEach((s,j)=>s.classList.toggle('on',j===i));const c=document.getElementById('e2clk'),l=document.getElementById('e2lg');if(c)c.textContent=L(SALE[i].t);if(l)l.innerHTML=L(SALE[i].w).map(x=>`<i>›</i> ${E(x)}`).join('<br>')};
 e2so=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting)setStep(+en.target.dataset.i)}),{rootMargin:'-45% 0px -45% 0px'});steps.forEach(s=>e2so.observe(s));
 root.addEventListener('click',e=>{
  const j=e.target.closest('[data-jump]');if(j){e.preventDefault();const t=document.getElementById(j.dataset.jump);if(t)scrollTo({top:t.getBoundingClientRect().top+scrollY-50,behavior:'smooth'});return}
  const dp=e.target.closest('[data-deep]');if(dp){openDeep(dp.dataset.deep);return}
  const f=e.target.closest('[data-film]');if(f){filmOpen(0);return}
  const lc=e.target.closest('[data-lc]');if(lc){const k=lc.dataset.lc,v=lc.dataset.v;LC[k]=k==='mode'?v:+v;paintLC();return}
  const rl=e.target.closest('[data-rl]');if(rl){RO.lane=rl.dataset.rl;RO.lead=LEADS[RO.lane];RO.safe=RO.lane==='local'?7:RO.lane==='india'?14:21;RO.size=RO.lane==='local'?28:60;paintRO();return}});
 root.addEventListener('input',e=>{const lr=e.target.closest('[data-lr]');if(lr){LC[lr.dataset.lr]=+lr.value;const y=scrollY;paintLC();scrollTo(0,y);return}
  const rr=e.target.closest('[data-rr]');if(rr){RO[rr.dataset.rr]=+rr.value;const b=document.getElementById('rv-'+rr.dataset.rr);if(b)b.textContent=rr.value+(rr.dataset.rr==='sales'?'':T(' days',' siku'));roDraw();return}
  if(e.target.matches('[data-rn]')){RO.noise=e.target.checked?1:0;roDraw()}});
 addEventListener('afya:leave',()=>{filmClose();closeDeep();[e2io,e2so,e2co].forEach(o=>o&&o.disconnect())},{once:true})}
window.SECTIONS['s4-2']={render:render42,init:init42};
/* 4.2 v2 dashboard, step dialog and behaviour */
const COLS=['#0f2f23','#2f7a5b','#c9a55c','#e0c88f','#6aa38a','#a5833f','#9fb8ad','#4c5f56','#d8e4dc','#b08d52'];
let TAB3='land';
function lcHTML(){const c=lcCalc(),sg=(k,opts)=>`<div class="sg">${opts.map(o=>`<button type="button" data-lc="${k}" data-v="${o[0]}" class="${String(LC[k])===String(o[0])?'on':''}">${L(o[1])}</button>`).join('')}</div>`;
 return `<div class="pane"><div class="ctl">
 <label><span>${T('Factory price per unit','Bei ya kiwanda kwa kipande')}<b>US$${LC.fob.toFixed(2)}</b></span><input type="range" min="2" max="40" step="0.1" value="${LC.fob}" data-lr="fob"></label>
 <label><span>${T('Units ordered','Vipande vilivyoagizwa')}<b>${NF(LC.units)}</b></span><input type="range" min="50" max="3000" step="50" value="${LC.units}" data-lr="units"></label>
 <label><span>${T('Shipping','Usafirishaji')}</span>${sg('mode',[['lcl',['Shared container','Kontena la pamoja']],['fcl',['Full 20ft','Kamili futi 20']]])}<p class="nt">${LC.mode==='lcl'?T(`${c.cbm.toFixed(2)} m³ × US$111`,`m³ ${c.cbm.toFixed(2)} × US$111`):T('US$2,350 per container','US$2,350 kwa kontena')}</p></label>
 <label><span>${T('Import duty band','Kiwango cha ushuru')}</span>${sg('duty',[[0,['0%','0%']],[.1,['10%','10%']],[.25,['25%','25%']],[.35,['35%','35%']]])}<p class="nt">${T('Planned at 25% until a licensed clearing agent confirms the tariff line.','Imepangwa kwa 25% hadi wakala wa forodha athibitishe mstari wa ushuru.')}</p></label>
 <label><span>${T('Independent inspection','Ukaguzi huru')}</span>${sg('insp',[[1,['Always','Kila mara']],[0,['Skip','Ruka']]])}</label></div>
 <div class="res"><div class="top"><div><small>${T('Landed cost per unit','Gharama halisi kwa kipande')}</small><b>${TS(c.per)}</b></div><div><small>${T('Shelf price incl. VAT','Bei ya rafuni pamoja na VAT')}</small><b>${TS(c.gross)}</b></div><div><small>${T('× factory price','× bei ya kiwanda')}</small><b>${(c.per/c.fac).toFixed(2)}×</b></div></div>
 <div class="stk3">${c.r.map((x,i)=>`<i style="width:${x[1]/c.tot*100}%;background:${COLS[i]}" title="${E(L(x[0]))}"></i>`).join('')}</div>
 <div class="leg">${c.r.map((x,i)=>`<div><i style="background:${COLS[i]}"></i><span>${L(x[0])}</span><b>${TS(x[1]/LC.units)}</b></div>`).join('')}</div>
 <p class="fine">${T(`Shelf price uses the 32% retail margin and is rounded to TSh 500. Import VAT (about ${TS(c.vat)} a unit) is paid at the port and reclaimed, so it is not a cost. Clearing and truck are estimates until quoted.`,`Bei ya rafuni inatumia faida ya rejareja ya 32% na imezungushwa hadi TSh 500. VAT ya uagizaji (takriban ${TS(c.vat)} kwa kipande) inalipwa bandarini na kurudishwa, kwa hiyo si gharama. Forodha na lori ni makadirio hadi nukuu zipatikane.`)}${C('TAXES_AND_DUTIES')}${C('1718887575')}</p></div></div>`}

function roHTML(){const lanes=[['local',['Tanzania','Tanzania']],['india',['India','India']],['china',['China','China']]];
 return `<div class="pane"><div class="ctl"><label><span>${T('Supply lane','Njia ya ugavi')}</span><div class="sg">${lanes.map(l=>`<button type="button" data-rl="${l[0]}" class="${RO.lane===l[0]?'on':''}">${L(l[1])}</button>`).join('')}</div></label>
 ${[['sales',T('Sold per day','Zinauzwa kwa siku'),1,12],['lead',T('Lead time, days','Muda wa kusubiri, siku'),3,120],['safe',T('Safety stock, days','Akiba ya usalama, siku'),0,45],['size',T('Order size, days','Ukubwa wa oda, siku'),7,120]].map(x=>`<label><span>${x[1]}<b id="rv-${x[0]}">${RO[x[0]]}</b></span><input type="range" min="${x[2]}" max="${x[3]}" step="1" value="${RO[x[0]]}" data-rr="${x[0]}"></label>`).join('')}
 <label class="tg"><input type="checkbox" data-rn ${RO.noise?'checked':''}>${T('Real-life ups and downs','Mabadiliko ya maisha halisi')}</label></div>
 <div class="res"><div class="top" id="e2k3"></div><canvas id="e2cv" width="1400" height="600"></canvas><p class="fine">${T('Reorder point = daily sales × lead time + safety stock. Green: units on the shelf. Dashed gold: reorder point. Shaded: safety stock. Amber bars: days out of stock.','Kiwango cha kuagiza = mauzo ya siku × muda wa kusubiri + akiba ya usalama. Kijani: vipande rafuni. Dhahabu ya vistari: kiwango cha kuagiza. Kivuli: akiba ya usalama. Nguzo za kahawia: siku za kuishiwa.')}</p></div></div>`}
function roDraw(){const cv=document.getElementById('e2cv');if(!cv)return;const r=roSim(),x=cv.getContext('2d'),W=cv.width,H=cv.height,P={l:64,r:16,t:20,b:50};
 const mx=Math.max(...r.S,r.rp+r.q)*1.08||10,X=d=>P.l+d/179*(W-P.l-P.r),Y=v=>H-P.b-v/mx*(H-P.t-P.b);
 x.clearRect(0,0,W,H);x.font='600 21px Plus Jakarta Sans, sans-serif';x.fillStyle='#8a958f';x.strokeStyle='rgba(19,32,26,.07)';x.lineWidth=1;
 for(let i=0;i<=4;i++){const v=mx/4*i;x.beginPath();x.moveTo(P.l,Y(v));x.lineTo(W-P.r,Y(v));x.stroke();x.fillText(Math.round(v),6,Y(v)+7)}
 [0,30,60,90,120,150].forEach(d=>x.fillText(T('day ','siku ')+d,X(d)-10,H-14));
 x.fillStyle='rgba(201,165,92,.14)';x.fillRect(P.l,Y(r.ss),W-P.l-P.r,Y(0)-Y(r.ss));
 r.S.forEach((v,d)=>{if(v===0){x.fillStyle='rgba(176,110,20,.28)';x.fillRect(X(d)-3,P.t,6,Y(0)-P.t)}});
 x.setLineDash([12,9]);x.strokeStyle='#c9a55c';x.lineWidth=3;x.beginPath();x.moveTo(P.l,Y(r.rp));x.lineTo(W-P.r,Y(r.rp));x.stroke();x.setLineDash([]);
 const g=x.createLinearGradient(0,P.t,0,H-P.b);g.addColorStop(0,'rgba(29,90,67,.22)');g.addColorStop(1,'rgba(29,90,67,0)');
 x.beginPath();r.S.forEach((v,d)=>d?x.lineTo(X(d),Y(v)):x.moveTo(X(d),Y(v)));x.lineTo(X(179),Y(0));x.lineTo(X(0),Y(0));x.closePath();x.fillStyle=g;x.fill();
 x.strokeStyle='#1d5a43';x.lineWidth=4;x.lineJoin='round';x.beginPath();r.S.forEach((v,d)=>d?x.lineTo(X(d),Y(v)):x.moveTo(X(d),Y(v)));x.stroke();
 const k=document.getElementById('e2k3');if(k)k.innerHTML=`<div><small>${T('Reorder point','Kiwango cha kuagiza')}</small><b>${r.rp}</b></div><div><small>${T('Days out of stock / 180','Siku za kuishiwa / 180')}</small><b style="color:${r.out?'#a5661a':'#1d5a43'}">${r.out}</b></div><div><small>${T('Average on shelf','Wastani rafuni')}</small><b>${Math.round(r.avg)}</b></div>`}

function cashHTML(){const c=lcCalc(),f=LC.fob*LC.units*FX,dep=f*.3,bal=f*.7+(LCC.inspUsd+LCC.bank)*FX,port=c.tot-dep-bal,sell=Math.round(LC.units/RO.sales),end=82+sell,span=Math.max(end,120),P=d=>d/span*100;
 const seg=[[0,30,'#0f2f23',T('Production','Uzalishaji')],[30,34,'#2f7a5b',T('Inspect','Ukaguzi')],[34,70,'#6aa38a',T('At sea','Baharini')],[70,82,'#c9a55c',T('Customs + hub','Forodha + kituo')],[82,end,'#a5833f',T(`Selling ${NF(LC.units)} units`,`Kuuza vipande ${NF(LC.units)}`)]];
 return `<div class="pane"><div class="ctl"><label><span>${T('Units ordered','Vipande vilivyoagizwa')}<b>${NF(LC.units)}</b></span><input type="range" min="50" max="3000" step="50" value="${LC.units}" data-lr="units"></label><label><span>${T('Sold per day','Zinauzwa kwa siku')}<b>${RO.sales}</b></span><input type="range" min="1" max="12" step="1" value="${RO.sales}" data-cs></label><p class="nt">${T('Uses the same order as the landed-cost tab. Terms: 30% deposit, 70% before shipping after inspection.','Inatumia oda ileile ya kichupo cha gharama halisi. Masharti: amana 30%, 70% kabla ya kusafirisha baada ya ukaguzi.')}${C('jingsourcing')}</p></div>
 <div class="res"><div class="top"><div><small>${T('Cash out before first sale','Pesa iliyotoka kabla ya mauzo ya kwanza')}</small><b>${TM(c.tot)}</b></div><div><small>${T('Days until first sale','Siku hadi mauzo ya kwanza')}</small><b>82</b></div><div><small>${T('Days to sell the order','Siku za kuuza oda')}</small><b>${sell}</b></div></div>
 <div class="cyc"><div class="bar">${seg.map(s=>`<span class="seg2" style="left:${P(s[0])}%;width:${P(s[1]-s[0])}%;background:${s[2]}">${s[3]}</span>`).join('')}</div><div class="ax"><span>${T('day','siku')} 0</span><span>${T('day','siku')} 82</span><span>${T('day','siku')} ${span}</span></div>
 <div class="evs"><div><small>${T('Day','Siku')} 0</small><b>−${TM(dep)}</b><span>${T('30% deposit','Amana 30%')}</span></div><div><small>${T('Day','Siku')} 30</small><b>−${TM(bal)}</b><span>${T('Balance, inspection, bank','Salio, ukaguzi, benki')}</span></div><div><small>${T('Days','Siku')} 70–78</small><b>−${TM(port)}</b><span>${T('Freight, duty, fees, clearing','Usafiri, ushuru, ada, forodha')}</span></div><div><small>${T('Day','Siku')} 82+</small><b>+${TM(c.gross/(1+LCC.vat)*LC.units)}</b><span>${T('Sales at shelf price, before VAT','Mauzo kwa bei ya rafuni, kabla ya VAT')}</span></div></div></div>
 <p class="fine">${T('This is why we buy locally at launch: a local order is paid within days of being sold, an import ties cash up for months.','Ndiyo sababu tunanunua ndani mwanzoni: oda ya ndani inalipwa siku chache baada ya kuuzwa, uagizaji unafunga pesa kwa miezi.')}</p></div></div>`}

function paintPane(){const el=document.getElementById('e2pane');if(!el)return;el.innerHTML=TAB3==='land'?lcHTML():TAB3==='reo'?roHTML():cashHTML();if(TAB3==='reo')roDraw();
 const m=document.getElementById('e2dm');if(m)m.innerHTML=MORE(TAB3,TAB3==='land'?'Every rate explained':TAB3==='reo'?'The reorder rule, lane by lane':'The cash cycle, day by day',TAB3==='land'?'Kila kiwango kimeelezwa':TAB3==='reo'?'Kanuni ya kuagiza, njia kwa njia':'Mzunguko wa pesa, siku kwa siku')}

/* step dialog */
function openStep(i){closeStep();const s=SALE[i],w=document.createElement('div');w.className='e3x';
 w.innerHTML=`<div class="sc" data-sx></div><div class="bx" role="dialog" aria-modal="true"><button type="button" class="x" data-sx>${T('Close','Funga')} ✕</button><img src="${IM(s.img)}" alt=""><div class="in"><small>${T('Step','Hatua')} ${i+1} / 7 · ${L(s.t)}</small><h3>${L(s.h)}</h3><p>${L(s.p)}</p><ul>${L(s.w).map(x=>`<li>› ${E(x)}</li>`).join('')}</ul><div class="nv">${i?`<button type="button" data-sg="${i-1}">← ${T('Previous','Iliyotangulia')}</button>`:'<span></span>'}${i<6?`<button type="button" data-sg="${i+1}">${T('Next','Inayofuata')} →</button>`:''}</div></div></div>`;
 w.addEventListener('click',e=>{if(e.target.closest('[data-sx]')){closeStep();return}const g=e.target.closest('[data-sg]');if(g)openStep(+g.dataset.sg)});
 document.body.appendChild(w);document.documentElement.style.overflow='hidden';const k=e=>{if(e.key==='Escape')closeStep()};addEventListener('keydown',k);w._k=k}
function closeStep(){const w=document.querySelector('.e3x');if(!w)return;removeEventListener('keydown',w._k);w.remove();document.documentElement.style.overflow=''}

function init42(){const root=document.getElementById('e2');if(!root)return;TAB3='land';paintPane();
 if(e2io)e2io.disconnect();const rv=root.querySelectorAll('.rv');
 if('IntersectionObserver' in window){e2io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');e2io.unobserve(en.target)}}),{rootMargin:'0px 0px -6% 0px'});rv.forEach(x=>e2io.observe(x))}else rv.forEach(x=>x.classList.add('in'));
 if(e2co)e2co.disconnect();const links=[...root.querySelectorAll('.nav a')];
 e2co=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){links.forEach(a=>a.classList.toggle('on',a.dataset.jump===en.target.id));const on=root.querySelector('.nav a.on');if(on){const bar=on.parentElement;bar.scrollTo({left:on.offsetLeft-bar.clientWidth/3,behavior:'smooth'})}}}),{rootMargin:'-45% 0px -50% 0px'});
 CH2.forEach(c=>{const s=document.getElementById(c[0]);if(s)e2co.observe(s)});
 root.addEventListener('click',e=>{
  const j=e.target.closest('[data-jump]');if(j){e.preventDefault();const t=document.getElementById(j.dataset.jump);if(t){if(t.tagName==='DETAILS')t.open=true;scrollTo({top:t.getBoundingClientRect().top+scrollY-60,behavior:'smooth'})}return}
  const dp=e.target.closest('[data-deep]');if(dp){openDeep(dp.dataset.deep);return}
  const f=e.target.closest('[data-film]');if(f){filmOpen(0);return}
  const st=e.target.closest('[data-step]');if(st){openStep(+st.dataset.step);return}
  const rl=e.target.closest('[data-rail]');if(rl){const r=document.getElementById('e2rail');r.scrollBy({left:(+rl.dataset.rail)*Math.min(440,r.clientWidth*.85),behavior:'smooth'});return}
  const tb=e.target.closest('[data-tab3]');if(tb){TAB3=tb.dataset.tab3;root.querySelectorAll('[data-tab3]').forEach(b=>b.classList.toggle('on',b===tb));paintPane();return}
  const lc=e.target.closest('[data-lc]');if(lc){const k=lc.dataset.lc,v=lc.dataset.v;LC[k]=k==='mode'?v:+v;paintPane();return}
  const rlz=e.target.closest('[data-rl]');if(rlz){RO.lane=rlz.dataset.rl;RO.lead=LEADS[RO.lane];RO.safe=RO.lane==='local'?7:RO.lane==='india'?14:21;RO.size=RO.lane==='local'?28:60;paintPane();return}});
 root.addEventListener('input',e=>{const lr=e.target.closest('[data-lr]');if(lr){LC[lr.dataset.lr]=+lr.value;const v=+lr.value,id=lr.dataset.lr;const lab=lr.parentElement.querySelector('b');if(lab)lab.textContent=id==='fob'?'US$'+v.toFixed(2):NF(v);clearTimeout(lr._t);lr._t=setTimeout(()=>{const y=scrollY;paintPane();scrollTo(0,y);const n=document.querySelector(`#e2pane [data-lr="${id}"]`);if(n)n.focus()},120);return}
  if(e.target.matches('[data-cs]')){RO.sales=+e.target.value;e.target.parentElement.querySelector('b').textContent=e.target.value;clearTimeout(e.target._t);e.target._t=setTimeout(()=>paintPane(),120);return}
  const rr=e.target.closest('[data-rr]');if(rr){RO[rr.dataset.rr]=+rr.value;const b=document.getElementById('rv-'+rr.dataset.rr);if(b)b.textContent=rr.value;roDraw();return}
  if(e.target.matches('[data-rn]')){RO.noise=e.target.checked?1:0;roDraw()}});
 addEventListener('afya:leave',()=>{filmClose();closeDeep();closeStep();[e2io,e2so,e2co].forEach(o=>o&&o.disconnect())},{once:true})}
/* 4.2 v4 behaviour */
function e5up(){const c=lcCalc(),q=id=>document.getElementById(id);if(q('e5wf'))q('e5wf').innerHTML=wfSVG();if(q('e5x'))q('e5x').textContent=(c.per/c.fac).toFixed(2)+'×';if(q('e5l'))q('e5l').textContent=TS(c.per);if(q('e5f'))q('e5f').textContent=TS(c.fac);if(q('e5s'))q('e5s').textContent=TS(c.gross);if(q('e5cc'))q('e5cc').innerHTML=ccSVG();if(q('e5cf'))q('e5cf').innerHTML=ccFigs()}
function init42(){const root=document.getElementById('e2');if(!root)return;TAB3='land';paintPane();
 if(e2io)e2io.disconnect();const rv=root.querySelectorAll('.rv');
 if('IntersectionObserver' in window){e2io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');e2io.unobserve(en.target)}}),{rootMargin:'0px 0px -6% 0px'});rv.forEach(x=>e2io.observe(x))}else rv.forEach(x=>x.classList.add('in'));
 if(e2co)e2co.disconnect();const links=[...root.querySelectorAll('.z5toc a')];
 e2co=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){links.forEach(a=>a.classList.toggle('on',a.dataset.jump===en.target.id));const on=root.querySelector('.z5toc a.on');if(on){const bar=on.parentElement;bar.scrollTo({left:on.offsetLeft-bar.clientWidth/3,behavior:'smooth'})}}}),{rootMargin:'-40% 0px -55% 0px'});
 CH5.forEach(c=>{const s=document.getElementById(c[0]);if(s)e2co.observe(s)});
 root.addEventListener('click',e=>{
  const j=e.target.closest('[data-jump]');if(j){e.preventDefault();const t=document.getElementById(j.dataset.jump);if(t){scrollTo({top:t.getBoundingClientRect().top+scrollY-56,behavior:'smooth'})}return}
  const dp=e.target.closest('[data-deep]');if(dp){openDeep(dp.dataset.deep);return}
  const f=e.target.closest('[data-film]');if(f){filmOpen(0);return}
  const st=e.target.closest('[data-step]');if(st){openStep(+st.dataset.step);return}
  const tb=e.target.closest('[data-tab3]');if(tb){TAB3=tb.dataset.tab3;root.querySelectorAll('[data-tab3]').forEach(b=>b.classList.toggle('on',b===tb));paintPane();return}
  const lc=e.target.closest('[data-lc]');if(lc){const k=lc.dataset.lc,v=lc.dataset.v;LC[k]=k==='mode'?v:+v;paintPane();e5up();return}
  const rlz=e.target.closest('[data-rl]');if(rlz){RO.lane=rlz.dataset.rl;RO.lead=LEADS[RO.lane];RO.safe=RO.lane==='local'?7:RO.lane==='india'?14:21;RO.size=RO.lane==='local'?28:60;paintPane();e5up();return}});
 root.addEventListener('input',e=>{const lr=e.target.closest('[data-lr]');if(lr){LC[lr.dataset.lr]=+lr.value;const v=+lr.value,id=lr.dataset.lr;const lab=lr.parentElement.querySelector('b');if(lab)lab.textContent=id==='fob'?'US$'+v.toFixed(2):NF(v);clearTimeout(lr._t);lr._t=setTimeout(()=>{const y=scrollY;paintPane();e5up();scrollTo(0,y);const n=document.querySelector(`#e2pane [data-lr="${id}"]`);if(n)n.focus()},120);return}
  if(e.target.matches('[data-cs]')){RO.sales=+e.target.value;e.target.parentElement.querySelector('b').textContent=e.target.value;clearTimeout(e.target._t);e.target._t=setTimeout(()=>{paintPane();e5up()},120);return}
  const rr=e.target.closest('[data-rr]');if(rr){RO[rr.dataset.rr]=+rr.value;const b=document.getElementById('rv-'+rr.dataset.rr);if(b)b.textContent=rr.value;roDraw();return}
  if(e.target.matches('[data-rn]')){RO.noise=e.target.checked?1:0;roDraw()}});
 const tip=document.createElement('div');tip.className='z5tip';root.appendChild(tip);
 root.addEventListener('mousemove',e=>{const t=e.target.closest('[data-tip]');if(!t){tip.style.opacity=0;return}tip.textContent=t.dataset.tip;tip.style.opacity=1;tip.style.left=Math.min(e.clientX+14,innerWidth-270)+'px';tip.style.top=(e.clientY+14)+'px'});root.addEventListener('mouseleave',()=>tip.style.opacity=0);
 addEventListener('afya:leave',()=>{filmClose();closeDeep();closeStep();[e2io,e2so,e2co].forEach(o=>o&&o.disconnect())},{once:true})}
})();
