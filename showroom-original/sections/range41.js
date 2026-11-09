/* Section 4.1 · The engine (tech platform). Built from r41/*.js by r41/build.sh */
(function(){
/* 4.1 helpers, numbers from the master model, and every chapter's words (English · Kiswahili) */
const lang=()=>window.AFYA_LANG==='sw'?1:0;
const T=(e,s)=>lang()?s:e;
const L=a=>Array.isArray(a)?(a[lang()]||a[0]):a;
const E=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const NF=n=>Math.round(n).toLocaleString('en-US');
const TS=n=>'TSh '+NF(n);
const TM=n=>'TSh '+(n/1e6).toFixed(n>=1e7?0:1)+'M';
const IM=k=>`img/e1/${k}.webp`;

/* ---------- master model ---------- */
const MM=(()=>{const o={sys:800000,seed:15000000,rev12:132492340,tx:0,stores:[1,2,4,7,10,14,18,23,28,34,40,47],regions:[[1,'Dar es Salaam flagship'],[2,'Second Dar es Salaam store + packing hub'],[4,'Dar es Salaam network'],[7,'Arusha & Dodoma'],[10,'Mwanza & Zanzibar'],[14,'All major Tanzanian cities'],[23,'Nairobi & Kampala pilots'],[47,'East African chain']],sc:{}};
 try{const M=window.MODEL,I=M.inputs;o.sys=I.opex_month.systems_software;o.seed=I.seed.use.find(x=>/Technology/i.test(x[0]))[1];
  const b=M.get('base'),m=b.months[11];o.rev12=m.revenue;o.tx=m.visitors_day*I.store.conversion*30+I.online.orders_day_m12*30;
  o.stores=I.growth.stores_by_year;o.regions=I.growth.regions;
  ['base','best','downside'].forEach(k=>{try{const s=M.get(k),q=s.months[11];o.sc[k]={rev:q.revenue/30,gp:q.gross_profit/q.revenue,cust:Math.round(q.visitors_day*s.inputs.store.conversion+s.inputs.online.orders_day_m12),mem:q.members,checks:Math.round((s.inputs.check&&s.inputs.check.per_day)||60)}}catch(e){}});
 }catch(e){}
 if(!o.tx)o.tx=110*.5*30+25*30;
 if(!o.sc.base)o.sc.base={rev:o.rev12/30,gp:.3,cust:80,mem:600,checks:60};
 return o})();

/* ---------- sources ---------- */
const SRC=[
 ['ALN Africa, 2023: Tanzania’s Personal Data Protection Act comes into effect (commencement 1 May 2023)','https://aln.africa/insight/tanzanias-personal-data-protection-act-comes-into-effect/'],
 ['Clyde & Co, February 2023: Tanzania, the Personal Data Protection Act 2022 (Commission, registration, sensitive data, penalties)','https://www.clydeco.com/en/insights/2023/02/tanzania-personal-data-protection-act-of-2022'],
 ['DLA Piper Africa, 10 April 2025: Registration with the Personal Data Protection Commission in Tanzania (grace period to 30 April 2025)','https://www.dlapiperafrica.com/en/tanzania/insights/2025/legal-article-a28156-registration-with-the-ersonal-data-protection-commission-in-tanzania-flyer-v2'],
 ['Tanzania Revenue Authority: approved EFD and VFD suppliers (every sale recorded on an approved fiscal device or virtual fiscal device)','https://tra.go.tz/page/efd-vfd-suppliers'],
 ['Tally Solutions: What is a Virtual Fiscal Device (VFD) in Tanzania','https://tallysolutions.com/ssa/vat/vfd-tanzania/']];
const CI=n=>`<sup class="ci"><a href="#e1-src" data-jump="e1-src">${n}</a></sup>`;

/* ---------- chapter index ---------- */
const CH=[['e1-why',['Why','Kwa nini']],['e1-sale',['One sale','Mauzo moja']],['e1-stack',['Tools and prices','Zana na bei']],['e1-arch',['Architecture','Muundo']],['e1-touch',['Devices','Vifaa']],['e1-mod',['How it works','Inavyofanya kazi']],['e1-try',['Try it','Jaribu']],['e1-res',['Resilience','Uimara']],['e1-trust',['Data and law','Taarifa na sheria']],['e1-build',['Build plan','Mpango wa ujenzi']],['e1-cost',['Cost','Gharama']],['e1-scale',['Scale','Ukuaji']],['e1-risk',['Risks','Hatari']]];

/* ---------- chapter 2 · one sale, followed (also the film) ---------- */
const SALE=[
 {img:'scan',t:'10:14:02',h:['The scan','Kuchanganua'],s:['One scan identifies product, batch and price.','Uchanganuzi mmoja unatambua bidhaa, kundi na bei.'],
  p:['A health adviser scans a Microlife BP A2 blood-pressure monitor at the counter. In the same instant the catalogue returns the product, its batch number, its expiry date and the single price that the store, the app, the website and WhatsApp all share. Nothing is typed, so nothing can be mistyped.','Mshauri wa afya anachanganua mashine ya presha ya Microlife BP A2 kaunta. Papo hapo katalogi inarudisha bidhaa, namba ya kundi lake, tarehe ya kuisha muda na bei moja ambayo duka, programu, tovuti na WhatsApp vyote vinatumia. Hakuna kinachoandikwa kwa mkono, kwa hiyo hakuna kosa la kuandika.'],
  w:[['product 315 · Microlife BP A2 · TSh 180,000','batch MB-2611 · expires 08/2029','price source: one catalogue, all channels'],['bidhaa 315 · Microlife BP A2 · TSh 180,000','kundi MB-2611 · inaisha 08/2029','chanzo cha bei: katalogi moja, njia zote']]},
 {img:'pay',t:'10:14:09',h:['The payment','Malipo'],s:['Paid on her own phone, receipted in seconds.','Analipa kwa simu yake, risiti ndani ya sekunde.'],
  p:['The customer receives a mobile-money prompt on her own phone and approves it with her PIN; card and cash work the same way. The sale is recorded on the till’s approved fiscal connection to the Tanzania Revenue Authority, and the official receipt arrives by SMS or WhatsApp. The money, the VAT and the margin are posted to the books at the same moment.','Mteja anapokea ombi la malipo ya pesa ya simu kwenye simu yake na kulikubali kwa PIN yake; kadi na pesa taslimu zinafanya kazi vivyo hivyo. Mauzo yanarekodiwa kupitia muunganisho wa kifaa cha kodi kilichoidhinishwa na Mamlaka ya Mapato Tanzania, na risiti rasmi inafika kwa SMS au WhatsApp. Pesa, VAT na faida vinaingizwa kwenye hesabu wakati huohuo.'],
  w:[['payment · mobile money · approved','fiscal receipt issued · sent by SMS','ledger · sales, VAT and margin posted'],['malipo · pesa ya simu · yamekubaliwa','risiti ya kodi imetolewa · imetumwa kwa SMS','daftari · mauzo, VAT na faida vimeingizwa']]},
 {img:'shelf',t:'10:14:10',h:['The shelf','Rafu'],s:['The reorder is drafted automatically.','Oda ya kuagiza upya inaandaliwa yenyewe.'],
  p:['Stock of this monitor falls from 7 to 6, which is its reorder point. The system drafts a purchase order for the buyer to approve with one tap, and it sells the oldest batch first so nothing expires on the shelf. Nobody walks the aisle with a notebook, and the founders see the same number the shelf does.','Stoku ya mashine hii inashuka kutoka 7 hadi 6, ambayo ndiyo kiwango chake cha kuagiza upya. Mfumo unaandaa oda ya ununuzi ambayo mnunuzi anaidhinisha kwa mguso mmoja, na unauza kundi la zamani kwanza ili kitu kisiharibike rafuni. Hakuna anayepita rafu na daftari, na waanzilishi wanaona namba ileile inayoonekana rafuni.'],
  w:[['stock · 7 → 6 · reorder point reached','purchase order drafted · awaiting approval','sell-first rule · oldest batch out first'],['stoku · 7 → 6 · kiwango cha kuagiza kimefikiwa','oda ya ununuzi imeandaliwa · inasubiri idhini','kanuni ya kuuza kwanza · kundi la zamani linatoka kwanza']]},
 {img:'kiosk',t:'10:14:11',h:['The household','Kaya'],s:['The sale is added to the household record.','Mauzo yanaongezwa kwenye kumbukumbu ya kaya.'],
  p:['The monitor is added to the household record of an Afya Senior member. Her consented Afya Check readings already sit in that record, so the Afya Twin now plans the cuff, batteries and next check for her. If her son in another country has her permission, he sees that the monitor reached his mother, and nothing more.','Mashine inaongezwa kwenye kumbukumbu ya kaya ya mwanachama wa Afya Senior. Vipimo vyake vya Afya Check alivyoridhia tayari viko humo, kwa hiyo Afya Twin sasa inapanga kafu, betri na kipimo kijacho kwa ajili yake. Kama mwanawe aliye nchi nyingine ana ruhusa yake, anaona kwamba mashine imemfikia mama yake, na hakuna zaidi.'],
  w:[['household · Afya Senior · member card','Afya Twin · cuff and batteries planned','family view · shared with her consent'],['kaya · Afya Senior · kadi ya mwanachama','Afya Twin · kafu na betri zimepangwa','mtazamo wa familia · kwa ridhaa yake']]},
 {img:'bench',t:['Thu 07:30','Alh 07:30'],h:['The packing bench','Meza ya kufunga'],s:['The next box is planned two days ahead.','Box ijayo inapangwa siku mbili kabla.'],
  p:['Two days before her delivery day, the packing tablet lists her Afya Box from the choices she locked in. Each item is scanned into the box, which removes it from stock, and the sealed box is photographed. If a brand runs short, the buyer has known for days, not minutes.','Siku mbili kabla ya siku yake ya kuletewa, kishikwambi cha kufungia kinaorodhesha Afya Box yake kutokana na machaguo aliyothibitisha. Kila bidhaa inachanganuliwa ndani ya box, jambo linaloiondoa kwenye stoku, na box iliyofungwa inapigwa picha. Kama chapa fulani inakaribia kuisha, mnunuzi amejua siku kadhaa kabla, si dakika chache.'],
  w:[['pick list · built from locked choices','12 of 12 items scanned · box sealed','photo stored · box ready for wave 2'],['orodha ya kuchukua · kutoka machaguo yaliyothibitishwa','bidhaa 12 kati ya 12 zimechanganuliwa · box imefungwa','picha imehifadhiwa · box tayari kwa wimbi la 2']]},
 {img:'road',t:['Thu 16:40','Alh 16:40'],h:['The road','Barabarani'],s:['The rider sees an address and a code. Nothing else.','Msafirishaji anaona anwani na namba ya siri. Basi.'],
  p:['The rider’s phone shows the afternoon’s drops in zone order with only what the job needs: a first name, an area, a phone number and a four-digit hand-over code. A photo and the code close the delivery, and the household is told in seconds. The rider never sees a health reading or a price history.','Simu ya msafirishaji inaonyesha safari za mchana kwa mpangilio wa kanda, ikiwa na kile kinachohitajika tu: jina la kwanza, eneo, namba ya simu na namba ya siri ya tarakimu nne ya kukabidhi. Picha na namba hiyo vinafunga safari, na kaya inaarifiwa ndani ya sekunde. Msafirishaji haoni kamwe kipimo cha afya wala historia ya bei.'],
  w:[['route · wave 2 · Kinondoni, 9 drops','proof · photo + code 4417','customer notified · delivered 16:52'],['njia · wimbi la 2 · Kinondoni, safari 9','uthibitisho · picha + namba 4417','mteja amearifiwa · imefika 16:52']]},
 {img:'founder',t:'21:00',h:['The founders','Waanzilishi'],s:['The whole day reaches the founders in one report.','Siku nzima inawafikia waanzilishi kwa ripoti moja.'],
  p:['At nine every evening the day closes itself. The founders receive one WhatsApp report: sales by channel, customers served, Afya Checks and referrals, new members, stock risks and anything that went wrong. A single reply approves the purchase orders that the shelf drafted that morning.','Saa tatu kila usiku siku inajifunga yenyewe. Waanzilishi wanapokea ripoti moja ya WhatsApp: mauzo kwa kila njia, wateja waliohudumiwa, vipimo vya Afya Check na rufaa, wanachama wapya, hatari za stoku na chochote kilichoharibika. Jibu moja linaidhinisha oda za ununuzi ambazo rafu iliandaa asubuhi.'],
  w:[['21:00 report · sent automatically','cash-up · matched to the shilling','reply “1” · purchase orders approved'],['ripoti ya 21:00 · imetumwa yenyewe','hesabu ya pesa · imelingana hadi shilingi','jibu “1” · oda za ununuzi zimeidhinishwa']]}];

/* ---------- chapter 3 · architecture ---------- */
const ARCH=[
 {n:'05',h:['Intelligence','Akili'],r:['Turns the record into decisions.','Inageuza kumbukumbu kuwa maamuzi.'],
  live:['Afya Twin forecasts, the 21:00 report, the founder dashboard, the investor pack and scenario planning.','Utabiri wa Afya Twin, ripoti ya saa 3 usiku, dashibodi ya waanzilishi, kifurushi cha mwekezaji na mipango ya hali tofauti.'],
  how:['Reads from the record and never writes to it, so a report can never change a sale. Forecasts start as simple rules (how fast each household uses each product) and become statistical models once there are twelve months of history.','Inasoma kutoka kwenye kumbukumbu na haiandiki humo kamwe, kwa hiyo ripoti haiwezi kubadilisha mauzo. Utabiri unaanza kama kanuni rahisi (kila kaya inatumia kila bidhaa kwa kasi gani) na kuwa modeli za takwimu zikishapatikana historia ya miezi kumi na miwili.'],
  b:['Build','Tunajenga']},
 {n:'04',h:['Connections','Miunganisho'],r:['Connects the store to national payment and messaging networks.','Inaunganisha duka na mitandao ya kitaifa ya malipo na ujumbe.'],
  live:['Mobile money and card payments, the TRA fiscal link, the WhatsApp Business Platform, the SMS gateway, the accounting package and maps.','Malipo ya pesa ya simu na kadi, kiungo cha kodi cha TRA, WhatsApp Business Platform, lango la SMS, programu ya uhasibu na ramani.'],
  how:['Each outside service is reached through one adapter of our own. If a provider changes its price or fails, we replace one adapter, not the store.','Kila huduma ya nje inafikiwa kupitia kiunganishi kimoja chetu. Mtoa huduma akibadili bei au akishindwa, tunabadilisha kiunganishi kimoja, si duka zima.'],
  b:['Connect','Tunaunganisha']},
 {n:'03',h:['Rules','Kanuni'],r:['Written rules replace personal memory.','Kanuni zilizoandikwa zinachukua nafasi ya kumbukumbu za watu.'],
  live:['Reorder points, sell-oldest-first, renewal and box-change deadlines, Afya Check referral thresholds, role permissions and three-tap workflows.','Viwango vya kuagiza upya, uza-la-zamani-kwanza, tarehe za kuhuisha na kubadilisha box, viwango vya rufaa vya Afya Check, ruhusa kwa majukumu na mtiririko wa miguso mitatu.'],
  how:['Rules are written as settings, not code, so the store lead can change a reorder point or a reminder time without a developer. Every rule raises an alert in time, so nothing depends on someone remembering.','Kanuni zinaandikwa kama mipangilio, si msimbo, kwa hiyo kiongozi wa duka anaweza kubadili kiwango cha kuagiza au muda wa ukumbusho bila msanidi. Kila kanuni inatoa tahadhari kwa wakati, kwa hiyo hakuna kinachotegemea mtu kukumbuka.'],
  b:['Build on bought tools','Tunajenga juu ya zana tulizonunua']},
 {n:'02',h:['The record','Kumbukumbu'],r:['One source of truth. Written once.','Chanzo kimoja cha ukweli. Kinaandikwa mara moja.'],
  live:['Products and prices, stock by batch and expiry, households and members, boxes and orders, consented readings, staff, and money.','Bidhaa na bei, stoku kwa kundi na tarehe ya kuisha, kaya na wanachama, box na oda, vipimo vilivyoridhiwa, wafanyakazi, na pesa.'],
  how:['Every change is saved as an event with a time, a device and a person attached, which gives a full audit trail. Nothing is overwritten and nothing is copied by hand, so every screen in the company reads the same number.','Kila badiliko linahifadhiwa kama tukio lenye muda, kifaa na mtu aliyehusika, jambo linalotoa historia kamili ya ukaguzi. Hakuna kinachofutwa juu yake na hakuna kinachonakiliwa kwa mkono, kwa hiyo kila skrini ya kampuni inasoma namba ileile.'],
  b:['We own it','Ni yetu']},
 {n:'01',h:['Touchpoints','Vituo vya kugusa'],r:['Every screen is a window onto the same record.','Kila skrini ni dirisha la kumbukumbu ileile.'],
  live:['Inside: the handheld till, the Afya Check kiosk, the packing tablet, the rider’s phone and the founders’ phones. Outside: the app, the website, WhatsApp and SMS from section 3.8.','Ndani: mashine ya mauzo ya mkononi, kibanda cha Afya Check, kishikwambi cha kufungia, simu ya msafirishaji na simu za waanzilishi. Nje: programu, tovuti, WhatsApp na SMS kutoka sehemu 3.8.'],
  how:['Touchpoints hold no truth of their own. They keep a working copy so they can sell offline, then hand every change back to the record.','Vituo havina ukweli wao binafsi. Vinatunza nakala ya kazi ili viweze kuuza bila mtandao, kisha vinarudisha kila badiliko kwenye kumbukumbu.'],
  b:['Buy the hardware','Tunanunua vifaa']}];
const FOUND=[['Security and resilience run underneath every layer','Usalama na uimara viko chini ya kila tabaka'],['Encryption, access by role, daily backups, offline selling, a 4G backup line and registration with the Personal Data Protection Commission.','Usimbaji fiche, ruhusa kwa majukumu, nakala za kila siku, kuuza bila mtandao, laini ya akiba ya 4G na usajili na Tume ya Ulinzi wa Taarifa Binafsi.']];

/* ---------- chapter 4 · devices (hotspots on the flat-lay) ---------- */
const DEV=[
 {x:13.5,y:52,h:['Handheld till','Mashine ya mauzo ya mkononi'],who:['Health advisers, at the counter and on the floor','Washauri wa afya, kaunta na sakafuni'],
  d:['Scans, sells, signs up members and prints or sends the fiscal receipt. Because it moves, the queue moves with the adviser instead of forming at one counter.','Inachanganua, inauza, inasajili wanachama na kuchapisha au kutuma risiti ya kodi. Kwa sababu inatembea, foleni inamfuata mshauri badala ya kujikusanya kaunta moja.'],
  why:['An Android point-of-sale terminal with a built-in scanner and printer: one device instead of four.','Mashine ya mauzo ya Android yenye skana na printa ndani: kifaa kimoja badala ya vinne.']},
 {x:43,y:28,h:['Packing tablet','Kishikwambi cha kufungia'],who:['The picker and packer','Mchukuaji na mfungaji'],
  d:['Shows the day’s pick lists built from members’ locked choices, checks each scanned item against the box and stores the photo of the sealed box.','Kinaonyesha orodha za kuchukua za siku kutoka machaguo ya wanachama, kinakagua kila bidhaa iliyochanganuliwa dhidi ya box na kuhifadhi picha ya box iliyofungwa.'],
  why:['A large screen that can be read at arm’s length while both hands are busy.','Skrini kubwa inayosomeka kwa urefu wa mkono wakati mikono yote miwili iko kazini.']},
 {x:69,y:31,h:['Rider phone','Simu ya msafirishaji'],who:['Riders','Wasafirishaji'],
  d:['Lists drops in zone order with one-tap navigation, then closes each delivery with a photo and the customer’s hand-over code.','Inaorodhesha safari kwa mpangilio wa kanda pamoja na urambazaji kwa mguso mmoja, kisha inafunga kila safari kwa picha na namba ya siri ya mteja.'],
  why:['A company phone with a locked rider app, so personal phones never hold customer data.','Simu ya kampuni yenye programu ya msafirishaji iliyofungwa, ili simu binafsi zisibebe taarifa za wateja.']},
 {x:91,y:26,h:['Founders’ laptop','Kompyuta ya waanzilishi'],who:['Founders, the accountant and the store lead','Waanzilishi, mhasibu na kiongozi wa duka'],
  d:['Opens the dashboard, the admin console and the books from anywhere, including Greater Noida.','Inafungua dashibodi, dashibodi ya usimamizi na hesabu kutoka popote, ikiwemo Greater Noida.'],
  why:['Nothing is installed: everything runs in a secure browser session with two-step sign-in.','Hakuna kinachosakinishwa: kila kitu kinaendeshwa kwenye kivinjari salama chenye kuingia kwa hatua mbili.']},
 {x:36,y:73,h:['Receipt and label printer','Printa ya risiti na lebo'],who:['Counter and packing bench','Kaunta na meza ya kufunga'],
  d:['Prints paper receipts for customers who ask for them, and shelf and box labels with barcodes.','Inachapisha risiti za karatasi kwa wateja wanaozihitaji, na lebo za rafu na box zenye msimbopau.'],
  why:['Most receipts go by SMS or WhatsApp, so one compact printer serves the whole store.','Risiti nyingi zinaenda kwa SMS au WhatsApp, kwa hiyo printa moja ndogo inatosha duka zima.']},
 {x:55,y:74,h:['Barcode scanner','Skana ya msimbopau'],who:['Receiving and the packing bench','Upokeaji na meza ya kufunga'],
  d:['Books deliveries from suppliers in by scanning cartons, batch and expiry, and checks every item that goes into an Afya Box.','Inapokea mizigo ya wasambazaji kwa kuchanganua katoni, kundi na tarehe ya kuisha, na kukagua kila bidhaa inayoingia kwenye Afya Box.'],
  why:['Scanning is ten times faster than typing and removes spelling and price errors.','Kuchanganua ni kwa kasi zaidi kuliko kuandika na kunaondoa makosa ya tahajia na bei.']},
 {x:75,y:74,h:['4G backup router','Ruta ya akiba ya 4G'],who:['Nobody touches it','Hakuna anayeigusa'],
  d:['Takes over automatically when the fixed line fails, so payments and syncing carry on.','Inachukua nafasi yenyewe laini ya kawaida ikikatika, ili malipo na usawazishaji viendelee.'],
  why:['Two networks from two providers: a single fault cannot close the till.','Mitandao miwili ya watoa huduma wawili: hitilafu moja haiwezi kufunga mauzo.']}];

/* ---------- chapter 5 · modules ---------- */
const MODS=[
 {img:'scan',h:['Till and checkout','Mauzo na malipo'],b:['Buy','Tunanunua'],
  d:['In-store sales, scan-and-go in the app, the self-checkout kiosk and the adviser’s handheld. It takes mobile money, card and cash and sends the official receipt by SMS or WhatsApp.','Mauzo dukani, changanua-uende kwenye programu, kibanda cha kujilipia na mashine ya mkononi ya mshauri. Inapokea pesa ya simu, kadi na taslimu na kutuma risiti rasmi kwa SMS au WhatsApp.'],
  u:['Health advisers, and customers themselves','Washauri wa afya, na wateja wenyewe'],x:['Hand-written receipts, cash errors and the queue at a single counter','Risiti za kuandika kwa mkono, makosa ya pesa na foleni kaunta moja'],
  w:['A proven retail system that already issues TRA receipts and works offline. Building our own fiscal till would add risk and no advantage.','Mfumo wa mauzo uliothibitishwa ambao tayari unatoa risiti za TRA na kufanya kazi bila mtandao. Kujenga wetu wenyewe kungeongeza hatari bila faida.']},
 {img:'shelf',h:['Catalogue and pricing','Katalogi na bei'],b:['Buy + our content','Tunanunua + maudhui yetu'],
  d:['One catalogue of about 520 product families with one price for every channel, a “best for” card on each product, Care Zone tags and four to five brand choices per need.','Katalogi moja ya familia za bidhaa takriban 520 yenye bei moja kwa kila njia, kadi ya “inafaa kwa” kwenye kila bidhaa, lebo za Kanda za Huduma na machaguo ya chapa nne hadi tano kwa kila hitaji.'],
  u:['The buyer and the store lead','Mnunuzi na kiongozi wa duka'],x:['Price stickers, mismatched prices between shop and app, guesswork at the shelf','Stika za bei, bei zisizolingana kati ya duka na programu, kubahatisha rafuni'],
  w:['The catalogue comes with the till. Our advantage is the content we write into it.','Katalogi inakuja na mfumo wa mauzo. Faida yetu ni maudhui tunayoandika ndani yake.']},
 {img:'bench',h:['Stock and reorder','Stoku na kuagiza upya'],b:['Buy + our rules','Tunanunua + kanuni zetu'],
  d:['Counts by batch and expiry, sells the oldest batch first, drafts purchase orders at the reorder point and moves stock between stores once there are two.','Inahesabu kwa kundi na tarehe ya kuisha, inauza kundi la zamani kwanza, inaandaa oda za ununuzi kwenye kiwango cha kuagiza na kuhamisha stoku kati ya maduka yakishakuwa mawili.'],
  u:['The buyer, the packer and the store lead','Mnunuzi, mfungaji na kiongozi wa duka'],x:['Stock notebooks, surprise stock-outs and expired products on the shelf','Madaftari ya stoku, kuishiwa ghafla na bidhaa zilizoisha muda rafuni'],
  w:['Inventory is standard. Our reorder and expiry rules from section 4.2 sit on top.','Usimamizi wa stoku ni wa kawaida. Kanuni zetu za kuagiza na tarehe za kuisha kutoka sehemu 4.2 zinakaa juu yake.']},
 {img:'pay',h:['Members and Afya Boxes','Wanachama na Afya Box'],b:['Build','Tunajenga'],
  d:['Cards, household records, box plans, brand swaps up to 12 days before month end, renewals without a single click and reminders by phone or email.','Kadi, kumbukumbu za kaya, mipango ya box, kubadilisha chapa hadi siku 12 kabla ya mwisho wa mwezi, kuhuisha bila kubonyeza chochote na ukumbusho kwa simu au barua pepe.'],
  u:['Members, advisers and the packer','Wanachama, washauri na mfungaji'],x:['Phone calls to renew, lost member lists, boxes packed from memory','Simu za kuhuisha, orodha za wanachama zilizopotea, box zilizofungwa kwa kukumbuka'],
  w:['This is the heart of the business and no ready-made tool does it our way.','Huu ndio moyo wa biashara na hakuna zana iliyo tayari inayofanya hivi kwa njia yetu.']},
 {img:'road',h:['Orders and delivery','Oda na usafirishaji'],b:['Connect + build','Tunaunganisha + tunajenga'],
  d:['Collects orders from the app, the website, WhatsApp and SMS into one queue, groups them into delivery waves by zone and closes each one with proof.','Inakusanya oda kutoka programu, tovuti, WhatsApp na SMS kwenye foleni moja, inazipanga katika mawimbi ya usafirishaji kwa kanda na kufunga kila moja kwa uthibitisho.'],
  u:['Riders, the packer and customers','Wasafirishaji, mfungaji na wateja'],x:['Orders lost in personal chats and “where is my parcel?” calls','Oda zinazopotea kwenye gumzo binafsi na simu za “mzigo wangu uko wapi?”'],
  w:['WhatsApp and the payment provider supply the channels; our own light layer handles zones, waves and proof.','WhatsApp na mtoa huduma wa malipo wanatoa njia; tabaka letu jepesi linashughulikia kanda, mawimbi na uthibitisho.']},
 {img:'kiosk',h:['Afya Check Station','Kituo cha Afya Check'],b:['Build','Tunajenga'],
  d:['Consent on screen, readings saved only if the customer agrees, results by SMS and an instant flag to the adviser when a referral rule is met.','Ridhaa kwenye skrini, vipimo vinahifadhiwa tu mteja akikubali, majibu kwa SMS na tahadhari ya papo hapo kwa mshauri kanuni ya rufaa ikifikiwa.'],
  u:['Customers and advisers','Wateja na washauri'],x:['Paper result slips and readings that nobody follows up','Karatasi za majibu na vipimo ambavyo hakuna anayevifuatilia'],
  w:['The kiosk hardware is bought. Consent, records and referral logic are ours.','Vifaa vya kibanda vinanunuliwa. Ridhaa, kumbukumbu na mantiki ya rufaa ni vyetu.']},
 {img:'hero',h:['People','Watu'],b:['Buy','Tunanunua'],
  d:['Rota, opening and closing checklists, standard operating procedures, training records and sign-in by role.','Ratiba ya zamu, orodha za kufungua na kufunga, taratibu za kazi, kumbukumbu za mafunzo na kuingia kwa majukumu.'],
  u:['The whole team','Timu nzima'],x:['Paper rotas, forgotten checks and “nobody told me”','Ratiba za karatasi, ukaguzi uliosahaulika na “hakuna aliyeniambia”'],
  w:['A ready-made rota and checklist app, loaded with our procedures from section 4.4.','Programu iliyo tayari ya ratiba na orodha, ikiwa na taratibu zetu kutoka sehemu 4.4.']},
 {img:'old',h:['Money','Pesa'],b:['Buy','Tunanunua'],
  d:['Every sale, refund and supplier bill flows into a standard accounting package used by Tanzanian accountants; the cash-up is matched to the shilling every night.','Kila mauzo, marejesho na bili ya msambazaji vinaingia kwenye programu ya kawaida ya uhasibu inayotumiwa na wahasibu wa Tanzania; hesabu ya pesa inalinganishwa hadi shilingi kila usiku.'],
  u:['The accountant and the founders','Mhasibu na waanzilishi'],x:['Month-end spreadsheets and copying sales into books by hand','Majedwali ya mwisho wa mwezi na kunakili mauzo kwenye vitabu kwa mkono'],
  w:['Accounting is a solved problem. We feed it automatically from the till.','Uhasibu ni tatizo lililotatuliwa. Tunaulisha moja kwa moja kutoka kwenye mauzo.']},
 {img:'founder',h:['Dashboard and reports','Dashibodi na ripoti'],b:['Build','Tunajenga'],
  d:['Five numbers that matter every day, the 21:00 WhatsApp report, alerts and the monthly investor pack.','Namba tano muhimu kila siku, ripoti ya WhatsApp ya saa 3 usiku, tahadhari na kifurushi cha mwekezaji cha kila mwezi.'],
  u:['Founders, the board and investors','Waanzilishi, bodi na wawekezaji'],x:['Learning about a stock-out or a cash gap days later, if at all','Kujua kuhusu kuishiwa stoku au upungufu wa pesa siku kadhaa baadaye, au kutojua kabisa'],
  w:['These are our own five numbers, read from every other module.','Hizi ni namba zetu tano, zinazosomwa kutoka kila moduli nyingine.']}];

/* ---------- chapter 8 · who sees what ---------- */
const ROLES=[['Customer','Mteja'],['Health adviser','Mshauri wa afya'],['Packer','Mfungaji'],['Rider','Msafirishaji'],['Founders','Waanzilishi'],['Accountant','Mhasibu']];
const DATA=[['Purchases','Manunuzi'],['Health readings','Vipimo vya afya'],['Address','Anwani'],['Money','Pesa']];
const ACC=[ // per role: [purchases, readings, address, money]
 [['Own','Zake'],['Own','Zake'],['Own','Yake'],['Own payments','Malipo yake']],
 [['Customer in front of them','Mteja aliye mbele yake'],['Customer in front of them','Mteja aliye mbele yake'],['When booking a delivery','Anapopanga usafirishaji'],['Own till only','Mauzo yake tu']],
 [['Items in the box','Bidhaa za box'],['Never','Kamwe'],['Area only','Eneo tu'],['Never','Kamwe']],
 [['Never','Kamwe'],['Never','Kamwe'],['Drop address and code','Anwani ya kufikisha na namba ya siri'],['Never','Kamwe']],
 [['All, in reports','Zote, kwenye ripoti'],['Totals only, never a named reading','Jumla tu, kamwe kipimo chenye jina'],['On request, logged','Kwa ombi, linarekodiwa'],['All','Zote']],
 [['Totals','Jumla'],['Never','Kamwe'],['Never','Kamwe'],['All','Zote']]];
const ROLEX=[['A customer sees their own record in the app and can download or delete it.','Mteja anaona kumbukumbu yake kwenye programu na anaweza kuipakua au kuifuta.'],['An adviser opens a record only for the customer they are serving; every opening is logged.','Mshauri anafungua kumbukumbu ya mteja anayemhudumia tu; kila ufunguzi unarekodiwa.'],['The packer needs the contents of a box and nothing about the person.','Mfungaji anahitaji vilivyomo kwenye box na hakuna kuhusu mtu.'],['The rider needs a place and a code, and the code expires after delivery.','Msafirishaji anahitaji mahali na namba ya siri, na namba hiyo inaisha baada ya kufikisha.'],['Founders manage the business from totals; named health data stays with the customer and the adviser.','Waanzilishi wanaendesha biashara kwa jumla; taarifa za afya zenye majina zinabaki kwa mteja na mshauri.'],['The accountant sees the books and nothing about health.','Mhasibu anaona hesabu na hakuna kuhusu afya.']];

/* ---------- chapter 9 · cost split (illustrative, sums to the model line) ---------- */
const SPLIT=[[['Retail till and inventory licences','Leseni za mfumo wa mauzo na stoku'],.30],[['Afya platform hosting (members, boxes, dashboard)','Uhifadhi wa jukwaa la Afya (wanachama, box, dashibodi)'],.22],[['WhatsApp Business messages and SMS','Ujumbe wa WhatsApp Business na SMS'],.20],[['Accounting and rota apps','Programu za uhasibu na ratiba'],.12],[['Backup internet line and device management','Laini ya akiba ya intaneti na usimamizi wa vifaa'],.10],[['Security, backups and domain','Usalama, nakala za akiba na kikoa'],.06]];

/* ---------- chapter 10 · what changes as the chain grows ---------- */
const STAGE={1:['One store runs on one record. Everything on this page is built for this store first.','Duka moja linaendeshwa na kumbukumbu moja. Kila kitu kwenye ukurasa huu kinajengwa kwa duka hili kwanza.'],
 2:['A second store and a packing hub: stock by location, transfers between sites and box packing moved off the shop floor. Same software, new logins.','Duka la pili na kituo cha kufungia: stoku kwa kila eneo, uhamisho kati ya maeneo na ufungaji wa box kuhamishwa kutoka dukani. Programu ileile, akaunti mpya.'],
 4:['A Dar es Salaam network: central buying across stores, one delivery map for the city and a head-office view comparing stores side by side.','Mtandao wa Dar es Salaam: ununuzi wa pamoja kwa maduka yote, ramani moja ya usafirishaji kwa jiji na mtazamo wa makao makuu unaolinganisha maduka.'],
 7:['Arusha and Dodoma: a regional warehouse, inter-city stock transfers and a store-opening checklist that turns a new site on in days.','Arusha na Dodoma: ghala la kanda, uhamisho wa stoku kati ya miji na orodha ya kufungua duka inayowasha eneo jipya ndani ya siku chache.'],
 10:['Mwanza and Zanzibar: the platform team becomes a small in-house group; the founders’ dashboard now ranks ten stores every morning.','Mwanza na Zanzibar: timu ya jukwaa inakuwa kikundi kidogo cha ndani; dashibodi ya waanzilishi sasa inapanga maduka kumi kila asubuhi.'],
 14:['Every major Tanzanian city: forecasting moves from rules to statistical models, using several years of household history.','Kila jiji kubwa Tanzania: utabiri unahama kutoka kanuni kwenda modeli za takwimu, ukitumia historia ya kaya ya miaka kadhaa.'],
 23:['Nairobi and Kampala pilots: a second currency, a second tax link and local data rules, each added as one more adapter.','Majaribio ya Nairobi na Kampala: sarafu ya pili, kiungo cha pili cha kodi na kanuni za taarifa za nchi husika, kila kimoja kikiongezwa kama kiunganishi kimoja zaidi.'],
 47:['An East African chain still running on the record designed for store number one.','Mnyororo wa Afrika Mashariki ukiendelea kuendeshwa na kumbukumbu iliyoundwa kwa duka namba moja.']};
const REGSW={'Dar es Salaam flagship':'Duka kuu la Dar es Salaam','Second Dar es Salaam store + packing hub':'Duka la pili Dar es Salaam + kituo cha kufungia','Dar es Salaam network':'Mtandao wa Dar es Salaam','Arusha & Dodoma':'Arusha na Dodoma','Mwanza & Zanzibar':'Mwanza na Zanzibar','All major Tanzanian cities':'Majiji yote makubwa Tanzania','Nairobi & Kampala pilots':'Majaribio ya Nairobi na Kampala','East African chain':'Mnyororo wa Afrika Mashariki'};

/* ---------- chapter 11 · risks ---------- */
const RISK=[
 [['A system failure stops the store.','Hitilafu ya mfumo inasimamisha duka.'],['Low','Chini'],['A till that sells offline, a 4G backup line, a battery pack, daily backups and a paper fallback procedure that the team rehearses every quarter.','Mfumo wa mauzo unaouza bila mtandao, laini ya akiba ya 4G, betri ya akiba, nakala za kila siku na utaratibu wa karatasi ambao timu inaufanyia mazoezi kila robo mwaka.']],
 [['A data breach exposes health readings.','Uvujaji wa taarifa unafichua vipimo vya afya.'],['Low','Chini'],['Registration with the Commission, consent on every saved reading, access by role, encryption, and a breach plan that informs the Commission and customers quickly.','Usajili na Tume, ridhaa kwa kila kipimo kinachohifadhiwa, ruhusa kwa majukumu, usimbaji fiche, na mpango wa uvujaji unaoarifu Tume na wateja haraka.']],
 [['Our own software runs late or over budget.','Programu yetu inachelewa au inazidi bajeti.'],['Medium','Wastani'],['Buy first. We build only memberships, the Check Station and the dashboard, start simple and add features after launch.','Tununue kwanza. Tunajenga uanachama, Kituo cha Check na dashibodi tu, tunaanza kwa urahisi na kuongeza vipengele baada ya kuzindua.']],
 [['Ready-made tools lock us in.','Zana zilizo tayari zinatufunga.'],['Medium','Wastani'],['We choose tools that let us export our data, and keep the master record of customers and members in our own platform.','Tunachagua zana zinazoturuhusu kutoa taarifa zetu, na kutunza kumbukumbu kuu ya wateja na wanachama kwenye jukwaa letu.']],
 [['A key provider raises prices.','Mtoa huduma muhimu anapandisha bei.'],['Medium','Wastani'],['Every outside service sits behind one adapter, so we can switch provider without touching the store.','Kila huduma ya nje iko nyuma ya kiunganishi kimoja, kwa hiyo tunaweza kubadili mtoa huduma bila kugusa duka.']],
 [['Staff find the system hard to use.','Wafanyakazi wanaona mfumo ni mgumu kutumia.'],['Low','Chini'],['Three taps or fewer for every routine task, training in Kiswahili and English, and a weekly review of the slowest screens.','Miguso mitatu au chini kwa kila kazi ya kawaida, mafunzo kwa Kiswahili na Kiingereza, na mapitio ya kila wiki ya skrini zinazochelewa zaidi.']]];
/* 4.1 depth: researched tools and prices, step-by-step walkthroughs, data inventory, build plan, and the long-form explanations */
const FX=2644.05; // TSh per US$, mid-market, 2 Nov 2026 (CurrencyBeacon)
const U=usd=>Math.round(usd*FX);
const PX={odooSrv:24,vfd:999,supa:25,d360:59,waU:.004,waM:.0225,sms:23,pos:650000,tab:410000,ups:200000,rtr:220000,kiosk:4990,jr:2500000,mid:6000000,sr:12000000,loyAdd:25,odooStd:31.10};
(()=>{try{PX.kiosk=MODEL.inputs.check.kiosk_usd||PX.kiosk}catch(e){}})();
/* extra sources, numbered after SRC */
SRC.push(
 ['AzamPay: merchant pricing (mobile money 1% when the customer pays operator fees, 3% when the merchant absorbs them; cards 3.5% + VAT; no setup or monthly fees)','https://azampay.com/pricing'],
 ['Meta: pricing on the WhatsApp Business Platform (service replies and utility templates inside the 24-hour window are free)','https://developers.facebook.com/docs/whatsapp/pricing'],
 ['Gupshup: Meta rate card effective 1 October 2025, Rest of Africa: marketing US$0.0225, utility US$0.0040, authentication US$0.0040 per message','https://www.gupshup.ai/resources/wp-content/uploads/2025/10/USD_Oct2025.pdf'],
 ['360dialog: prices and plans (Regular channel tier US$59 or €49 per WhatsApp number per month)','https://docs.360dialog.com/docs/360dialog/prices-plans-and-payment-options'],
 ['Celcom Africa: bulk SMS Tanzania (€0.0095 per SMS, about TSh 23, indicative)','https://celcomafrica.com/bulk-sms-tanzania'],
 ['Supabase: pricing (Pro plan US$25 a month: 8 GB database, daily backups kept 7 days, 100,000 monthly active users)','https://supabase.com/pricing'],
 ['DigitalOcean: Droplet pricing (Basic, 4 GiB RAM / 2 vCPU, US$24 a month)','https://www.digitalocean.com/pricing/droplets'],
 ['ERP Research: Odoo pricing, July 2026 (Community Edition free and open source; Standard about US$31.10 per user per month at renewal)','https://www.erpresearch.com/pricing/odoo'],
 ['Ecosire: Odoo Tanzania TRA EFD/VFD connector for Odoo 17–19 (indicative price from US$999)','https://ecosire.com/zh/apps/odoo/odoo-tanzania-tra-efd'],
 ['Loyverse: pricing (free point of sale; Advanced inventory and Employee management US$25 per store per month each)','https://loyverse.com/pricing'],
 ['Jiji Tanzania: handheld Android POS terminal, TSh 650,000 (Dar es Salaam listing)','https://jiji.co.tz/dar-es-salaam/299-point-of-sale'],
 ['Jiji Tanzania: new Samsung Galaxy Tab A11 64 GB, TSh 410,000','https://jiji.co.tz/dar-es-salaam/tablets/samsung-galaxy-tab-a11'],
 ['Jiji Tanzania: APC Easy UPS 650VA battery backup, TSh 200,000','https://jiji.co.tz/dar-es-salaam/284-ups/apc'],
 ['Jiji Tanzania: Huawei mobile Wi-Fi LTE Cat 4 router, TSh 220,000','https://jiji.co.tz/386-routers/huawei'],
 ['McTaba: software developer salaries in Tanzania (Dar es Salaam medians: junior TSh 2.5M, mid-level TSh 6M, senior TSh 12M a month, gross)','https://mctaba.com/learn/tanzania/software-developer-salaries-tanzania'],
 ['PKF Eastern Africa: Electronic Fiscal Devices in Tanzania (VAT-registered businesses must use an EFD; non-VAT above TSh 14M turnover; penalty up to TSh 4.5M or up to three years in prison)','https://www.pkfea.com/media/5jxfblq1/efd_article_feb.pdf'],
 ['CurrencyBeacon: USD to TZS, 2 November 2026 (about TSh 2,644 per US$)','https://www.currencybeacon.com/rates/USD/TZS']);
const SN=k=>SRC.findIndex(s=>s[1].includes(k))+1; // source number by URL fragment
const C=k=>CI(SN(k));

/* ---------- the stack: one line per job, with the chosen product and its real price ---------- */
const STACK=[
 {j:['Till, stock and accounts','Mauzo, stoku na hesabu'],p:['Odoo Community (POS + Inventory + Invoicing)','Odoo Community (mauzo + stoku + ankara)'],why:['One open-source system for the counter, the stockroom and the books, so the record starts whole. Free licence, our own server, our data exportable at any time.','Mfumo mmoja wa wazi kwa kaunta, stoo na hesabu, ili kumbukumbu ianze ikiwa kamili. Leseni ni bure, seva ni yetu, na taarifa zetu zinaweza kutolewa wakati wowote.'],
  c:()=>[0,U(PX.odooSrv)],cn:['Licence free · server US$24 a month','Leseni bure · seva US$24 kwa mwezi'],s:['erpresearch','digitalocean']},
 {j:['Tax receipts (TRA)','Risiti za kodi (TRA)'],p:['TRA VFD connector for Odoo','Kiunganishi cha TRA VFD kwa Odoo'],why:['Every sale is sent to the Tanzania Revenue Authority and comes back as a valid fiscal receipt with a QR code, without a separate EFD box at the counter.','Kila mauzo yanatumwa Mamlaka ya Mapato Tanzania na kurudi kama risiti halali ya kodi yenye QR code, bila kisanduku tofauti cha EFD kaunta.'],
  c:()=>[U(PX.vfd),0],cn:['One-off, from US$999','Mara moja, kuanzia US$999'],s:['ecosire','tallysolutions']},
 {j:['Mobile money and cards','Pesa ya simu na kadi'],p:['AzamPay','AzamPay'],why:['One connection reaches every mobile-money network and Visa or Mastercard. No setup or monthly fee; with the customer paying operator fees we pay 1%.','Muunganisho mmoja unafikia mitandao yote ya pesa ya simu na Visa au Mastercard. Hakuna ada ya kuanza wala ya mwezi; mteja akilipa ada za mtandao, sisi tunalipa 1%.'],
  c:()=>[0,0],cn:['1% per mobile-money payment · 3.5% + VAT per card','1% kwa kila malipo ya simu · 3.5% + VAT kwa kadi'],s:['azampay']},
 {j:['Members, boxes, Twin and dashboard','Wanachama, box, Twin na dashibodi'],p:['Afya platform on Supabase (our own build)','Jukwaa la Afya kwenye Supabase (tunalijenga wenyewe)'],why:['The part only Afya has. A managed database with daily backups, sign-in and an API, so a small team builds features instead of running servers.','Sehemu ambayo Afya peke yake inayo. Hifadhidata inayosimamiwa yenye nakala za kila siku, kuingia na API, ili timu ndogo ijenge vipengele badala ya kuendesha seva.'],
  c:()=>[0,U(PX.supa)],cn:['Pro plan US$25 a month','Mpango wa Pro US$25 kwa mwezi'],s:['supabase']},
 {j:['WhatsApp ordering and reminders','Kuagiza na ukumbusho kwa WhatsApp'],p:['WhatsApp Business Platform via 360dialog','WhatsApp Business Platform kupitia 360dialog'],why:['The official API, so orders, receipts and box reminders come from one verified Afya number. Replies to customers inside 24 hours are free.','API rasmi, ili oda, risiti na ukumbusho wa box vitoke kwenye namba moja ya Afya iliyothibitishwa. Kujibu wateja ndani ya saa 24 ni bure.'],
  c:()=>[0,U(PX.d360)],cn:['US$59 a month + Meta fee per template','US$59 kwa mwezi + ada ya Meta kwa kila kiolezo'],s:['360dialog','gupshup','developers.facebook']},
 {j:['SMS for any phone','SMS kwa simu yoyote'],p:['Bulk SMS gateway (e.g. Celcom Africa)','Lango la SMS nyingi (mfano Celcom Africa)'],why:['Afya Check results and receipts reach customers with basic phones, under a registered “AFYA” sender name.','Majibu ya Afya Check na risiti zinawafikia wateja wenye simu za kawaida, kwa jina la mtumaji “AFYA” lililosajiliwa.'],
  c:()=>[0,0],cn:['About TSh 23 per SMS','Takriban TSh 23 kwa SMS'],s:['celcomafrica']}];
const STACKALT=[[['Loyverse instead of Odoo for the till','Loyverse badala ya Odoo kwa mauzo'],['Easier to start and free at the counter, but stock and staff add US$25 a month each per store, accounts live elsewhere and TRA receipts need a separate provider. Kept as the fallback.','Rahisi kuanza na bure kaunta, lakini stoku na wafanyakazi vinaongeza US$25 kwa mwezi kila kimoja kwa duka, hesabu zinakaa mahali pengine na risiti za TRA zinahitaji mtoa huduma mwingine. Tunaiweka kama mbadala.'],'loyverse'],
 [['Odoo Online instead of our own Odoo server','Odoo Online badala ya seva yetu ya Odoo'],['Hosted by Odoo at about US$31 per user per month, but a custom TRA connector needs a higher plan. Our own server costs US$24 for the whole store.','Inahifadhiwa na Odoo kwa takriban US$31 kwa mtumiaji kwa mwezi, lakini kiunganishi maalum cha TRA kinahitaji mpango wa juu zaidi. Seva yetu inagharimu US$24 kwa duka zima.'],'erpresearch'],
 [['Selcom or ClickPesa instead of AzamPay','Selcom au ClickPesa badala ya AzamPay'],['Both are established aggregators. AzamPay publishes its fees openly, which lets us budget precisely; we will ask all three for quotes before signing.','Zote mbili ni waunganishaji wanaojulikana. AzamPay inachapisha ada zake wazi, jambo linalotuwezesha kupanga bajeti kwa usahihi; tutaomba bei kwa wote watatu kabla ya kusaini.'],'azampay']];

/* ---------- monthly bill at month-12 volumes ---------- */
function BILL(){const memb=(MM.sc.base&&MM.sc.base.mem)||600,ord=750,storeTx=Math.round(MM.tx-ord),checks=1800;
 const waU=memb*6+ord*3,waM=1000*2,sms=checks+Math.round(storeTx*.3);
 return [[['Odoo server (till, stock, accounts)','Seva ya Odoo (mauzo, stoku, hesabu)'],U(PX.odooSrv),['US$24 a month','US$24 kwa mwezi'],'digitalocean'],
  [['Afya platform on Supabase','Jukwaa la Afya kwenye Supabase'],U(PX.supa),['US$25 a month','US$25 kwa mwezi'],'supabase'],
  [['WhatsApp number (360dialog)','Namba ya WhatsApp (360dialog)'],U(PX.d360),['US$59 a month','US$59 kwa mwezi'],'360dialog'],
  [['WhatsApp utility messages','Ujumbe wa huduma wa WhatsApp'],Math.round(waU*PX.waU*FX),[`${NF(waU)} a month × US$0.004 (box reminders, delivery updates)`,`${NF(waU)} kwa mwezi × US$0.004 (ukumbusho wa box, taarifa za usafirishaji)`],'gupshup'],
  [['WhatsApp marketing messages','Ujumbe wa matangazo wa WhatsApp'],Math.round(waM*PX.waM*FX),[`${NF(waM)} a month × US$0.0225 (two offers to 1,000 opted-in customers)`,`${NF(waM)} kwa mwezi × US$0.0225 (ofa mbili kwa wateja 1,000 waliokubali)`],'gupshup'],
  [['SMS (Afya Check results, receipts to basic phones)','SMS (majibu ya Afya Check, risiti kwa simu za kawaida)'],sms*PX.sms,[`${NF(sms)} a month × TSh 23`,`${NF(sms)} kwa mwezi × TSh 23`],'celcomafrica']]}
function ONEOFF(){return [[['Afya Check kiosk','Kibanda cha Afya Check'],U(PX.kiosk),['US$4,990, master model','US$4,990, mpango mkuu'],''],
 [['Handheld Android till × 2','Mashine ya mauzo ya mkononi × 2'],PX.pos*2,['TSh 650,000 each','TSh 650,000 kila moja'],'299-point-of-sale'],
 [['Packing tablet','Kishikwambi cha kufungia'],PX.tab,['Samsung Galaxy Tab A11','Samsung Galaxy Tab A11'],'tab-a11'],
 [['Battery backup (UPS)','Betri ya akiba (UPS)'],PX.ups,['APC Easy UPS 650VA','APC Easy UPS 650VA'],'284-ups'],
 [['4G backup router','Ruta ya akiba ya 4G'],PX.rtr,['Huawei LTE Cat 4','Huawei LTE Cat 4'],'386-routers'],
 [['TRA VFD connector for Odoo','Kiunganishi cha TRA VFD kwa Odoo'],U(PX.vfd),['from US$999','kuanzia US$999'],'ecosire'],
 [['Set-up by a contracted developer, 1 month','Usanidi na msanidi wa mkataba, mwezi 1'],PX.mid,['median mid-level salary','mshahara wa kati wa ngazi ya kati'],'mctaba']]}

/* ---------- step-by-step walkthroughs for the nine modules (index-aligned with MODS) ---------- */
const WALK=[
 {s:[['The adviser scans each item on the handheld (or the customer scans in the app).','The basket shows the one catalogue price and the batch.','The customer chooses mobile money, card or cash; mobile money arrives as a prompt on their own phone.','On approval, Odoo records the sale and the VFD connector returns the TRA receipt.','The receipt goes out by WhatsApp or SMS; paper only if asked.'],['Mshauri anachanganua kila bidhaa kwenye mashine ya mkononi (au mteja anachanganua kwenye programu).','Kikapu kinaonyesha bei moja ya katalogi na kundi.','Mteja anachagua pesa ya simu, kadi au taslimu; pesa ya simu inafika kama ombi kwenye simu yake.','Akikubali, Odoo inarekodi mauzo na kiunganishi cha VFD kinarudisha risiti ya TRA.','Risiti inatumwa kwa WhatsApp au SMS; karatasi tu ikiombwa.']],
  e:['A mother buys Molfix size 4 (TSh 29,980) and Hobby wipes (TSh 6,500). Total TSh 36,480. She pays by mobile money; at 1% the fee is about TSh 365, and the receipt is in her WhatsApp before she reaches the door.','Mama ananunua Molfix saizi 4 (TSh 29,980) na wipes za Hobby (TSh 6,500). Jumla TSh 36,480. Analipa kwa pesa ya simu; kwa 1% ada ni takriban TSh 365, na risiti iko kwenye WhatsApp yake kabla hajafika mlangoni.']},
 {s:[['The buyer adds a product once: name, barcode, Care Zone, “best for” card and four to five brand choices.','A price is set once in Odoo.','The app, website, WhatsApp menu and shelf label all read that price.','A price change is scheduled with a start date and logged with the name of the person who made it.'],['Mnunuzi anaongeza bidhaa mara moja: jina, msimbopau, Kanda ya Huduma, kadi ya “inafaa kwa” na machaguo ya chapa nne hadi tano.','Bei inawekwa mara moja kwenye Odoo.','Programu, tovuti, menyu ya WhatsApp na lebo ya rafu zote zinasoma bei hiyo.','Mabadiliko ya bei yanapangwa na tarehe ya kuanza na kurekodiwa na jina la aliyeyafanya.']],
  e:['The Geratherm thermometer moves from TSh 39,000 to TSh 37,500 on the 1st of the month. One edit changes the shelf, the app and WhatsApp at midnight; nobody re-labels anything by hand.','Kipimajoto cha Geratherm kinashuka kutoka TSh 39,000 hadi TSh 37,500 tarehe 1 ya mwezi. Badiliko moja linabadilisha rafu, programu na WhatsApp saa sita usiku; hakuna anayebandika lebo upya kwa mkono.']},
 {s:[['Deliveries are scanned in with batch and expiry.','Every sale and every packed box reduces stock automatically.','When stock reaches its reorder point, Odoo drafts a purchase order.','The buyer approves it with one tap, or replies “1” to the 21:00 report.','Products expiring within 60 days are flagged to move to the front.'],['Mizigo inapokelewa kwa kuchanganua pamoja na kundi na tarehe ya kuisha.','Kila mauzo na kila box iliyofungwa vinapunguza stoku yenyewe.','Stoku ikifika kiwango cha kuagiza, Odoo inaandaa oda ya ununuzi.','Mnunuzi anaiidhinisha kwa mguso mmoja, au anajibu “1” kwenye ripoti ya 21:00.','Bidhaa zinazoisha ndani ya siku 60 zinawekwa alama zisogezwe mbele.']],
  e:['The reorder point for the Microlife monitor is 6 and stock is 7. One sale brings it to 6; a purchase order for 10 is drafted at 10:14 and approved at 21:03. No stock-out, and no notebook.','Kiwango cha kuagiza kwa mashine ya Microlife ni 6 na stoku ni 7. Mauzo moja yanaifikisha 6; oda ya ununuzi ya 10 inaandaliwa saa 4:14 asubuhi na kuidhinishwa saa 3:03 usiku. Hakuna kuishiwa, na hakuna daftari.']},
 {s:[['A family joins in store or in the app; one household record is created.','They choose a box plan for 1, 6 or 12 months and a brand for each item.','Up to 12 days before month end they can swap brands; after that the choices lock.','On renewal day AzamPay requests payment; reminders go by phone or email beforehand.','Locked choices become the packing list automatically.'],['Familia inajiunga dukani au kwenye programu; kumbukumbu moja ya kaya inaundwa.','Wanachagua mpango wa box wa mwezi 1, 6 au 12 na chapa kwa kila bidhaa.','Hadi siku 12 kabla ya mwisho wa mwezi wanaweza kubadili chapa; baada ya hapo machaguo yanafungwa.','Siku ya kuhuisha AzamPay inaomba malipo; ukumbusho unatumwa kwa simu au barua pepe kabla.','Machaguo yaliyofungwa yanakuwa orodha ya kufunga yenyewe.']],
  e:['A Mama na Mtoto member swaps Molfix for Huggies on the 17th. On the 19th her box locks, on the 25th the payment prompt arrives, and on the 28th the packer’s tablet lists Huggies, not Molfix.','Mwanachama wa Mama na Mtoto anabadilisha Molfix kwa Huggies tarehe 17. Tarehe 19 box yake inafungwa, tarehe 25 ombi la malipo linafika, na tarehe 28 kishikwambi cha mfungaji kinaonyesha Huggies, si Molfix.']},
 {s:[['Orders arrive from the app, the website, WhatsApp and SMS into one queue.','Each order gets a delivery zone and a time window.','At wave time the packer sees what to pack first.','The rider app shows drops in zone order with a four-digit code.','A photo and the code close the delivery; the customer is told at once.'],['Oda zinafika kutoka programu, tovuti, WhatsApp na SMS kwenye foleni moja.','Kila oda inapewa kanda ya usafirishaji na muda.','Wakati wa wimbi mfungaji anaona afunge nini kwanza.','Programu ya msafirishaji inaonyesha safari kwa mpangilio wa kanda pamoja na namba ya siri ya tarakimu nne.','Picha na namba vinafunga safari; mteja anaarifiwa papo hapo.']],
  e:['Nine Kinondoni orders placed before 13:00 leave together in wave 2 at 15:30. The rider closes the last one at 16:52; the delivery fee is TSh 4,000 per order. '+(window.MODEL&&MODEL.isLean()?'In the start-small option selected, partner riders are paid about TSh 3,000 per order (master model).':'The two riders are salaried, so each extra order costs about TSh 1,000 in charging and maintenance (master model).'),'Oda tisa za Kinondoni zilizowekwa kabla ya saa 7 mchana zinaondoka pamoja kwenye wimbi la 2 saa 9:30 alasiri. Msafirishaji anafunga ya mwisho saa 10:52; ada ya usafirishaji ni TSh 4,000 kwa kila oda. '+(window.MODEL&&MODEL.isLean()?'Katika chaguo la kuanza kidogo lililochaguliwa, wasafirishaji washirika wanalipwa takriban TSh 3,000 kwa kila oda (mpango mkuu).':'Wasafirishaji wawili wanalipwa mshahara, kwa hiyo kila oda ya ziada inagharimu takriban TSh 1,000 kwa kuchaji na matengenezo (mpango mkuu).')]},
 {s:[['The kiosk explains the check and asks for consent on screen.','Readings are taken; nothing is saved unless the customer agrees.','Results go by SMS; members also see them in the app.','If a reading crosses a referral rule, the adviser’s handheld is alerted.','The adviser explains, refers if needed and never sells at the kiosk.'],['Kibanda kinaeleza kipimo na kuomba ridhaa kwenye skrini.','Vipimo vinachukuliwa; hakuna kinachohifadhiwa mteja asipokubali.','Majibu yanatumwa kwa SMS; wanachama wanayaona pia kwenye programu.','Kipimo kikivuka kanuni ya rufaa, mashine ya mshauri inapata tahadhari.','Mshauri anaeleza, anatoa rufaa ikihitajika na kamwe hauzi kibandani.']],
  e:['Sixty checks a day in month 12 (master model) means about 1,800 result messages a month: about TSh 41,400 by SMS at TSh 23 each, or free by WhatsApp when the customer has just messaged us.','Vipimo sitini kwa siku mwezi wa 12 (mpango mkuu) ni takriban ujumbe 1,800 wa majibu kwa mwezi: takriban TSh 41,400 kwa SMS kwa TSh 23 kila mmoja, au bure kwa WhatsApp mteja akiwa ametutumia ujumbe muda mfupi kabla.']},
 {s:[['Each person signs in with their own account and role.','The day opens with a checklist on the handheld.','Procedures from section 4.4 are attached to each task.','Training and certificates are recorded with expiry dates.'],['Kila mtu anaingia kwa akaunti yake na jukumu lake.','Siku inafunguliwa kwa orodha kwenye mashine ya mkononi.','Taratibu kutoka sehemu 4.4 zimeambatishwa kwa kila kazi.','Mafunzo na vyeti vinarekodiwa pamoja na tarehe za kuisha.']],
  e:['At 08:30 the opening checklist shows “fridge 2 °C–8 °C checked” is not ticked. The store lead is reminded at 08:45, before any temperature-sensitive product is sold.','Saa 2:30 asubuhi orodha ya kufungua inaonyesha “friji 2 °C–8 °C imekaguliwa” haijawekewa alama. Kiongozi wa duka anakumbushwa saa 2:45, kabla bidhaa yoyote inayohitaji ubaridi haijauzwa.']},
 {s:[['Every sale posts revenue, VAT and cost of goods automatically.','AzamPay settlements are matched to sales.','At closing the till counts cash against the expected figure.','Supplier bills are entered once, against the purchase order.'],['Kila mauzo yanaingiza mapato, VAT na gharama ya bidhaa yenyewe.','Malipo ya AzamPay yanalinganishwa na mauzo.','Wakati wa kufunga, mashine inahesabu pesa taslimu dhidi ya kiasi kinachotarajiwa.','Bili za wasambazaji zinaingizwa mara moja, dhidi ya oda ya ununuzi.']],
  e:['At 21:00 the till expects TSh 412,000 in cash and the count is TSh 412,000. Mobile-money settlement for the day matches 64 payments to 64 sales. The accountant does nothing by hand.','Saa 3 usiku mashine inatarajia TSh 412,000 taslimu na hesabu ni TSh 412,000. Malipo ya pesa ya simu ya siku yanalinganisha malipo 64 na mauzo 64. Mhasibu hafanyi chochote kwa mkono.']},
 {s:[['Every module writes to the record; the dashboard only reads.','Five numbers update live: sales, customers, Afya Checks, new members, stock risks.','At 21:00 the day is summarised and sent by WhatsApp.','Each month the investor pack is produced from the same figures.'],['Kila moduli inaandika kwenye kumbukumbu; dashibodi inasoma tu.','Namba tano zinasasishwa moja kwa moja: mauzo, wateja, Afya Check, wanachama wapya, hatari za stoku.','Saa 3 usiku siku inafupishwa na kutumwa kwa WhatsApp.','Kila mwezi kifurushi cha mwekezaji kinaandaliwa kutoka takwimu zilezile.']],
  e:['A normal month-12 day in the master model: about '+TM(MM.sc.base.rev)+' of sales and '+MM.sc.base.cust+' customers. The founders read it in one message from Greater Noida.','Siku ya kawaida ya mwezi wa 12 katika mpango mkuu: takriban '+TM(MM.sc.base.rev)+' za mauzo na wateja '+MM.sc.base.cust+'. Waanzilishi wanaisoma kwa ujumbe mmoja kutoka Greater Noida.']}];

/* ---------- data inventory ---------- */
const DINV=[
 [['Products, prices, stock','Bidhaa, bei, stoku'],['Odoo server','Seva ya Odoo'],['Running the store','Kuendesha duka'],['Staff by role','Wafanyakazi kwa jukumu'],['As long as useful','Muda wote unaofaa']],
 [['Sales and receipts','Mauzo na risiti'],['Odoo + TRA','Odoo + TRA'],['Tax law, accounts','Sheria ya kodi, hesabu'],['Accountant, founders','Mhasibu, waanzilishi'],['The period tax law requires','Muda unaotakiwa na sheria ya kodi']],
 [['Name, phone, address','Jina, simu, anwani'],['Afya platform','Jukwaa la Afya'],['Delivering boxes and orders','Kufikisha box na oda'],['Adviser, rider (address only)','Mshauri, msafirishaji (anwani tu)'],['Until the customer leaves, then deleted','Hadi mteja aondoke, kisha inafutwa']],
 [['Health readings','Vipimo vya afya'],['Afya platform, encrypted','Jukwaa la Afya, imesimbwa'],['Customer’s consent','Ridhaa ya mteja'],['Customer, adviser serving them','Mteja, mshauri anayemhudumia'],['Until the customer deletes it','Hadi mteja aifute']],
 [['Payments','Malipo'],['AzamPay (we hold no card or PIN)','AzamPay (hatushiki kadi wala PIN)'],['Completing the sale','Kukamilisha mauzo'],['Accountant','Mhasibu'],['Per tax law','Kwa sheria ya kodi']],
 [['Messages','Ujumbe'],['WhatsApp / SMS provider','Mtoa huduma wa WhatsApp / SMS'],['Service and, with a separate yes, offers','Huduma na, kwa “ndiyo” tofauti, ofa'],['Advisers','Washauri'],['90 days in our logs','Siku 90 kwenye kumbukumbu zetu']]];

/* ---------- build plan ---------- */
const PH=[
 {k:['Phase 0','Awamu 0'],t:['8 weeks before opening','Wiki 8 kabla ya kufungua'],h:['Configure, do not code','Sanidi, usiandike msimbo'],
  d:['Odoo is installed on our server with the catalogue, prices, stock and accounts. The TRA connector is fitted and tested with real receipts. AzamPay, the WhatsApp number and the SMS sender name are registered. Devices are set up and locked. Staff train on the real system for two weeks.','Odoo inawekwa kwenye seva yetu pamoja na katalogi, bei, stoku na hesabu. Kiunganishi cha TRA kinawekwa na kujaribiwa kwa risiti halisi. AzamPay, namba ya WhatsApp na jina la mtumaji wa SMS vinasajiliwa. Vifaa vinasanidiwa na kufungwa. Wafanyakazi wanafunzwa kwenye mfumo halisi kwa wiki mbili.'],
  who:['One contracted mid-level developer for one month, with the founders as product owners','Msanidi mmoja wa ngazi ya kati wa mkataba kwa mwezi mmoja, waanzilishi wakiwa wamiliki wa bidhaa'],cost:()=>PX.mid,cn:['TSh 6M (one month, median salary)','TSh milioni 6 (mwezi mmoja, mshahara wa kati)']},
 {k:['Phase 1','Awamu 1'],t:['Months 1–10 after opening','Miezi 1–10 baada ya kufungua'],h:['Sell, learn, measure','Uza, jifunze, pima'],
  d:['The store trades on the bought tools. Members and boxes run inside Odoo’s customer records and recurring orders, so we learn real swap, renewal and delivery patterns before writing custom software. Every slow screen and every manual step is logged.','Duka linafanya biashara kwa zana zilizonunuliwa. Wanachama na box zinaendeshwa ndani ya kumbukumbu za wateja na oda za kujirudia za Odoo, ili tujifunze tabia halisi za kubadilisha, kuhuisha na usafirishaji kabla ya kuandika programu maalum. Kila skrini inayochelewa na kila hatua ya mkono inarekodiwa.'],
  who:['Founders and the store lead; the developer on call','Waanzilishi na kiongozi wa duka; msanidi anapatikana akihitajika'],cost:()=>0,cn:['Included in the monthly systems line','Imo kwenye mstari wa mifumo wa kila mwezi']},
 {k:['Phase 2','Awamu 2'],t:['Months 11–16','Miezi 11–16'],h:['Build the Afya platform','Jenga jukwaa la Afya'],
  d:['After the store reaches monthly profit (month 10 in the master model), we build what only Afya has: the members app and box engine, Afya Choice swaps, the Afya Twin rules, the Check Station records, the dashboard and the 21:00 report. Each feature ships every two weeks and is tested in the store before the next.','Baada ya duka kufikia faida ya mwezi (mwezi wa 10 katika mpango mkuu), tunajenga kile ambacho Afya peke yake inacho: programu ya wanachama na injini ya box, kubadilisha kwa Afya Choice, kanuni za Afya Twin, kumbukumbu za Kituo cha Check, dashibodi na ripoti ya 21:00. Kila kipengele kinatolewa kila wiki mbili na kujaribiwa dukani kabla ya kinachofuata.'],
  who:['One contracted mid-level full-stack developer for six months','Msanidi mmoja wa ngazi ya kati wa mkataba kwa miezi sita'],cost:()=>PX.mid*6,cn:['TSh 36M (six months, median salary)','TSh milioni 36 (miezi sita, mshahara wa kati)']},
 {k:['Phase 3','Awamu 3'],t:['Year 2','Mwaka 2'],h:['Two stores, one engine','Maduka mawili, injini moja'],
  d:['The second store and the packing hub plug in: stock by location, transfers, central buying. A junior developer joins in-house to maintain and improve the platform; the contracted developer moves to a support retainer.','Duka la pili na kituo cha kufungia vinaunganishwa: stoku kwa eneo, uhamisho, ununuzi wa pamoja. Msanidi mdogo anajiunga ndani ya kampuni kutunza na kuboresha jukwaa; msanidi wa mkataba anabaki kwa makubaliano ya msaada.'],
  who:['In-house junior developer','Msanidi mdogo wa ndani'],cost:()=>PX.jr*12,cn:['TSh 30M a year (median junior salary), a head-office cost','TSh milioni 30 kwa mwaka (mshahara wa kati wa ngazi ya chini), gharama ya makao makuu']}];
const TESTS=[[['Receipt test','Jaribio la risiti'],['Fifty real sales through the TRA connector before opening, checked against the TRA portal.','Mauzo halisi hamsini kupitia kiunganishi cha TRA kabla ya kufungua, yakikaguliwa dhidi ya tovuti ya TRA.']],
 [['Offline drill','Zoezi la bila mtandao'],['Unplug the internet for one hour during a trial day and confirm that every sale syncs, once, in order.','Kata intaneti kwa saa moja siku ya majaribio na kuthibitisha kwamba kila mauzo yanasawazishwa, mara moja, kwa mpangilio.']],
 [['Soft opening','Ufunguzi wa majaribio'],['One week with friends and family as customers, real money, and a feedback form at the counter.','Wiki moja na marafiki na familia kama wateja, pesa halisi, na fomu ya maoni kaunta.']],
 [['Three-tap audit','Ukaguzi wa miguso mitatu'],['Every routine task is timed on the handheld; anything over three taps is redesigned before launch.','Kila kazi ya kawaida inapimwa muda kwenye mashine ya mkononi; chochote kinachozidi miguso mitatu kinaundwa upya kabla ya kuzindua.']],
 [['Privacy review','Mapitio ya faragha'],['A lawyer reviews consent screens, data locations and the breach plan before any reading is stored.','Mwanasheria anapitia skrini za ridhaa, mahali taarifa zinapokaa na mpango wa uvujaji kabla kipimo chochote hakijahifadhiwa.']]];

/* ---------- glossary for the full explanation of chapter 1 ---------- */
const GLOSS=[[['The record','Kumbukumbu'],['One database where every fact about the business is written once: what we sold, to whom, what is on the shelf, what we owe. Every screen reads from it.','Hifadhidata moja ambamo kila ukweli wa biashara unaandikwa mara moja: tulichouza, kwa nani, kilicho rafuni, tunachodaiwa. Kila skrini inasoma kutoka humo.']],
 [['Sync','Kusawazisha'],['When a device has been offline, it sends what it recorded to the record as soon as it reconnects, in order and only once.','Kifaa kikiwa kimekaa bila mtandao, kinatuma kilichorekodi kwenye kumbukumbu mara kinapounganika, kwa mpangilio na mara moja tu.']],
 [['API','API'],['A door through which two systems talk safely. Our platform asks AzamPay to request a payment through its API, and AzamPay answers with “paid” or “failed”.','Mlango ambao mifumo miwili inazungumza kupitia kwa usalama. Jukwaa letu linaiomba AzamPay iombe malipo kupitia API yake, na AzamPay inajibu “imelipwa” au “imeshindwa”.']],
 [['Payment aggregator','Mkusanyaji wa malipo'],['A licensed company that connects one shop to every mobile-money network and card scheme, so we sign one contract instead of five.','Kampuni yenye leseni inayounganisha duka moja na mitandao yote ya pesa ya simu na kadi, ili tusaini mkataba mmoja badala ya mitano.']],
 [['VFD','VFD'],['A Virtual Fiscal Device: software that sends each sale to the Tanzania Revenue Authority and returns an official receipt, replacing the separate EFD machine.','Kifaa cha Kodi cha Mtandaoni: programu inayotuma kila mauzo kwa Mamlaka ya Mapato Tanzania na kurudisha risiti rasmi, badala ya mashine tofauti ya EFD.']],
 [['Open source','Programu huria'],['Software whose code is public and free to use. Odoo Community is open source, so no vendor can switch off our till or hold our data.','Programu ambayo msimbo wake uko wazi na bure kutumia. Odoo Community ni huria, kwa hiyo hakuna muuzaji anayeweza kuzima mauzo yetu au kushikilia taarifa zetu.']]];
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
/* 4.1 page: render */
const ARW='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 8h10M9 4l4 4-4 4"/></svg>';
const PLY='<svg viewBox="0 0 16 16" fill="currentColor"><path d="M4 2.5v11l9-5.5z"/></svg>';
const TILL=[{id:315,n:['Microlife BP A2 Basic monitor','Mashine ya presha Microlife BP A2'],p:180000,st:7,rp:6,u:'https://portalpharmacy.ke/medical-devices-kits/blood-pressure-monitors/microlife-bp-a2-basic-automatic-blood-pressure-monitor-with-gentle-plus'},
 {id:36,n:['Molfix 3D Large, size 4','Molfix 3D Large, saizi 4'],p:29980,st:14,rp:10,u:'https://www.carrefour.ke/mafken/en/baby-diapers/molfix-diapers-3d-9-1kg-15kgs-l64/p/102412'},
 {id:66,n:['Geratherm Baby Flex thermometer','Kipimajoto Geratherm Baby Flex'],p:39000,st:5,rp:4,u:'https://portalpharmacy.ke/geratherm-baby-flex-gt-3020-digital-fever-thermometer'},
 {id:39,n:['Hobby baby wipes','Wipes za mtoto Hobby'],p:6500,st:40,rp:24,u:'https://www.shoppers.co.tz/product-detail/66d6d78ead21bfe77df6ae3f'}];
const SPI=[36,34,39,66,82,315,322,379,295,112,128,502,438,245,252,385,274,467];
const SP=id=>{const k=Math.max(0,SPI.indexOf(+id));return `background-image:url(img/d8/pr.webp);background-size:600% 300%;background-position:${(k%6)*20}% ${Math.floor(k/6)*50}%;background-repeat:no-repeat`};

function opening(){return `<section class="op dk" id="e1-top"><div class="bg"></div><div class="sh"></div><div class="w">
 <div class="crumb rv">${T('Showroom / Part 4 · The engine / 4.1 The tech platform','Showroom / Sehemu 4 · Injini / 4.1 Jukwaa la teknolojia')}</div>
 <h1 class="rv">${T('The engine.','Injini.')}<em>${T('One record behind every sale, box, delivery and reading.','Kumbukumbu moja nyuma ya kila mauzo, box, usafirishaji na kipimo.')}</em></h1>
 <p class="ld rv">${T('Customers will never see this part of Afya Basics, yet it decides everything they do see: the price on the shelf, the box at the door, the reminder before they run out. This chapter explains how it is designed, what it costs and why it lets <b>a team of five to eight people run a full store</b> while the founders manage it from another country.','Wateja hawataiona sehemu hii ya Afya Basics, lakini ndiyo inayoamua kila wanachokiona: bei rafuni, box mlangoni, ukumbusho kabla hawajaishiwa. Sura hii inaeleza imeundwaje, inagharimu kiasi gani na kwa nini inaiwezesha <b>timu ya watu watano hadi wanane kuendesha duka zima</b> huku waanzilishi wakilisimamia kutoka nchi nyingine.')}</p>
 <div class="facts rv"><div><b>1</b><span>${T('record that every screen reads, from the till to the investor pack','kumbukumbu ambayo kila skrini inasoma, kuanzia mauzo hadi kifurushi cha mwekezaji')}</span></div><div><b>3</b><span>${T('taps or fewer for every routine task on a staff device','miguso au chini kwa kila kazi ya kawaida kwenye kifaa cha mfanyakazi')}</span></div><div><b>21:00</b><span>${T('the daily report reaches the founders, wherever they are','ripoti ya kila siku inawafikia waanzilishi, popote walipo')}</span></div><div><b>${TM(MM.sys)}</b><span>${T('a month to run all software, messaging and connectivity','kwa mwezi kuendesha programu zote, ujumbe na mtandao')}</span></div></div>
 <div class="acts rv"><button class="bt" type="button" data-film="0">${PLY}${T('Play the motion explainer','Cheza maelezo ya mwendo')}</button><button class="bt gh" type="button" data-jump="e1-arch">${T('See the architecture','Ona muundo')}${ARW}</button></div>
 </div></section>
 <nav class="cbar" aria-label="${T('Chapters','Sura')}"><div class="w"><b>4.1</b>${CH.map(c=>`<a href="#${c[0]}" data-jump="${c[0]}">${L(c[1])}</a>`).join('')}<button class="fl" type="button" data-film="0">${T('Play film','Cheza filamu')}</button></div></nav>`}

function why(){return `<section class="ch iv" id="e1-why"><div class="w">
 <div class="ey rv">${T('Chapter 1 · Why an engine','Sura 1 · Kwa nini injini')}</div>
 <h2 class="rv">${T('Most shops are run by memory. <em>Ours is run by a record.</em>','Maduka mengi yanaendeshwa kwa kumbukumbu za kichwa. <em>Letu linaendeshwa kwa kumbukumbu ya mfumo.</em>')}</h2>
 <div class="two"><div class="prose rv">
  <p>${T('<b>A typical shop runs on five tools that never speak to each other:</b> a till that prints paper, a stock notebook, a cash box, a personal WhatsApp for orders and a spreadsheet at month end. People do the joining by hand. Someone counts, someone copies, someone phones a customer to remind them. Every copy is a chance for an error, and every hour of copying is an hour not spent with a customer.','<b>Duka la kawaida linaendeshwa na zana tano zisizowasiliana:</b> mashine ya mauzo inayochapisha karatasi, daftari la stoku, sanduku la pesa, WhatsApp binafsi kwa oda na jedwali mwisho wa mwezi. Watu ndio wanaounganisha kwa mkono. Mmoja anahesabu, mwingine ananakili, mwingine anampigia mteja kumkumbusha. Kila nakala ni nafasi ya kosa, na kila saa ya kunakili ni saa isiyotumika na mteja.')}</p>
  <p>${T('<b>An owner who is not in the room cannot see the business.</b> Fahmy studies in Greater Noida and Cecilia leads on the ground in Dar es Salaam. Without one system, a stock-out or a cash gap is discovered days later, if it is discovered at all.','<b>Mmiliki asiyekuwepo hawezi kuiona biashara.</b> Fahmy anasoma Greater Noida na Cecilia anaongoza kazi Dar es Salaam. Bila mfumo mmoja, kuishiwa stoku au upungufu wa pesa vinagunduliwa siku kadhaa baadaye, kama vitagunduliwa kabisa.')}</p>
  <p>${T('<b>A health store raises the stakes further.</b> Batch numbers, expiry dates, blood-pressure readings and family details must be exact, and they are protected by law. A notebook cannot meet that standard; an engine can.','<b>Duka la afya linaongeza uzito zaidi.</b> Namba za kundi, tarehe za kuisha, vipimo vya presha na taarifa za familia lazima viwe sahihi, na vinalindwa na sheria. Daftari haliwezi kufikia kiwango hicho; injini inaweza.')}</p>
 </div><figure class="ph rv"><img src="${IM('old')}" alt="${T('A stock notebook, a cash box, a receipt spike and a calculator on a worn counter','Daftari la stoku, sanduku la pesa, risiti na kikokotoo juu ya kaunta iliyochakaa')}" loading="lazy" width="1920" height="1080"><figcaption>${T('The five-tool shop: every number lives in a different place','Duka la zana tano: kila namba iko mahali tofauti')}</figcaption></figure></div>
 <p class="quote rv">${T('Record it <em>once</em>. Let the system <em>remind</em>. Keep every task within <em>three taps</em>.','Rekodi <em>mara moja</em>. Acha mfumo <em>ukumbushe</em>. Kila kazi ndani ya <em>miguso mitatu</em>.')}</p>
 <div class="rules rv"><div><small>${T('Principle 01','Kanuni 01')}</small><h3>${T('Record once','Rekodi mara moja')}</h3><p>${T('A sale updates stock, money, the member’s record and the dashboard together. Nobody types the same number twice, so no two screens can disagree.','Mauzo yanasasisha stoku, pesa, kumbukumbu ya mwanachama na dashibodi kwa pamoja. Hakuna anayeandika namba ileile mara mbili, kwa hiyo skrini mbili haziwezi kutofautiana.')}</p></div>
 <div><small>${T('Principle 02','Kanuni 02')}</small><h3>${T('The system reminds','Mfumo unakumbusha')}</h3><p>${T('Reorders, renewals, expiry dates, licence renewals and staff training raise alerts on time. The business no longer depends on anyone’s memory.','Kuagiza upya, kuhuisha, tarehe za kuisha, kuhuisha leseni na mafunzo ya wafanyakazi vinatoa tahadhari kwa wakati. Biashara haitegemei tena kumbukumbu ya mtu.')}</p></div>
 <div><small>${T('Principle 03','Kanuni 03')}</small><h3>${T('Three taps or fewer','Miguso mitatu au chini')}</h3><p>${T('Every routine task on a staff device takes three taps at most. Simple screens are what allow a small team to deliver premium service.','Kila kazi ya kawaida kwenye kifaa cha mfanyakazi haizidi miguso mitatu. Skrini rahisi ndizo zinazoiwezesha timu ndogo kutoa huduma ya kiwango cha juu.')}</p></div></div>
 </div></section>`}

function sale(){return `<section class="ch dk" id="e1-sale" style="padding-bottom:40px"><div class="w">
 <div class="ey rv">${T('Chapter 2 · The engine in motion','Sura 2 · Injini ikifanya kazi')}</div>
 <h2 class="rv">${T('One sale, <em>followed through the engine.</em>','Mauzo moja, <em>yakifuatiliwa ndani ya injini.</em>')}</h2>
 <p class="ld rv">${T('A blood-pressure monitor is sold at 10:14 in the morning. The steps below show how stock, money, the member record and the founders’ report all update from that one scan, with no number copied by hand. Beside each image is the exact entry the system writes. The same sequence is available as <b>a film of under one minute</b>.','Mashine ya presha inauzwa saa 4:14 asubuhi. Hatua zifuatazo zinaonyesha jinsi stoku, fedha, kumbukumbu ya mwanachama na ripoti ya waanzilishi vinavyosasishwa kutokana na uchanganuzi huo mmoja, bila namba yoyote kunakiliwa kwa mkono. Pembeni ya kila picha kuna kumbukumbu halisi ambayo mfumo unaandika. Mfuatano huohuo unapatikana pia kama <b>filamu ya chini ya dakika moja</b>.')}</p>
 <div class="acts rv" style="margin-top:28px"><button class="bt" type="button" data-film="0">${PLY}${T('Play the film','Cheza filamu')}</button></div>
 </div>
 <div class="sale"><div class="stg" id="e1stg">${SALE.map((s,i)=>`<img src="${IM(s.img)}" alt="" class="${i?'':'on'}" loading="${i<2?'eager':'lazy'}" width="1920" height="1080">`).join('')}
  <div class="pg">${SALE.map((s,i)=>`<span class="${i?'':'on'}"></span>`).join('')}</div>
  <div class="hd2"><div class="clk" id="e1clk">${L(SALE[0].t)}</div><div class="lg" id="e1lg">${L(SALE[0].w).map(x=>`<i>›</i> ${E(x)}`).join('<br>')}</div></div></div>
  <div class="stps">${SALE.map((s,i)=>`<article class="stp${i?'':' on'}" data-i="${i}"><div class="k">${T('Step','Hatua')} ${String(i+1).padStart(2,'0')} · ${L(s.t)}</div><h3>${L(s.h)}</h3><p class="s">${L(s.s)}</p><p>${L(s.p)}</p><ul>${L(s.w).map(x=>`<li>${E(x)}</li>`).join('')}</ul></article>`).join('')}</div></div>
 </section>`}

function arch(){return `<section class="ch wh" id="e1-arch"><div class="w">
 <div class="ey rv">${T('Chapter 4 · Architecture','Sura 4 · Muundo')}</div>
 <h2 class="rv">${T('Five layers. <em>One record at the centre.</em>','Tabaka tano. <em>Kumbukumbu moja katikati.</em>')}</h2>
 <p class="ld rv">${T('The platform is built in five layers, each with one job. The top layer turns data into decisions; the bottom layer is the screens staff and customers use. Because each layer can be replaced without touching the others, a supplier change never becomes a rebuild. <b>Open any layer</b> to see what it contains and how it works.','Jukwaa limejengwa kwa tabaka tano, kila moja likiwa na kazi moja. Tabaka la juu linageuza takwimu kuwa maamuzi; tabaka la chini ni skrini wanazotumia wafanyakazi na wateja. Kwa kuwa kila tabaka linaweza kubadilishwa bila kugusa mengine, kubadilisha msambazaji hakugeuki kuwa ujenzi mpya. <b>Fungua tabaka lolote</b> kuona lina nini na linavyofanya kazi.')}</p>
 <div class="stk5 rv">${ARCH.map((a,i)=>`<div class="lyr${i===3?' op2':''}"><button type="button" aria-expanded="${i===3}"><span class="n">${a.n}</span><h3>${L(a.h)}</h3><span class="r">${L(a.r)}</span><span class="b">${L(a.b)}</span><span class="pl">+</span></button>
  <div class="bd"><div></div><div><small>${T('What lives here','Kilichomo')}</small><p>${L(a.live)}</p></div><div><small>${T('How it works','Kinavyofanya kazi')}</small><p>${L(a.how)}</p></div></div></div>`).join('')}
  <div class="fnd"><span class="n">00</span><div><h3>${L(FOUND[0])}</h3><p>${L(FOUND[1])}</p></div></div></div>
 <div class="princ rv"><div><b>${T('Own the record, rent the rest','Miliki kumbukumbu, kodi vingine')}</b><span>${T('Customers, members and households live in our own platform. Tills, accounting and messaging are proven services we connect to.','Wateja, wanachama na kaya wanakaa kwenye jukwaa letu. Mauzo, uhasibu na ujumbe ni huduma zilizothibitishwa tunazounganisha nazo.')}</span></div>
 <div><b>${T('Events, not edits','Matukio, si kufuta')}</b><span>${T('Every change is kept with a time and a name, so any number can be traced back to the moment it was created.','Kila badiliko linatunzwa na muda na jina, kwa hiyo kila namba inaweza kufuatiliwa hadi wakati ilipoundwa.')}</span></div>
 <div><b>${T('Offline first','Bila mtandao kwanza')}</b><span>${T('Devices keep selling without the internet and synchronise when the connection returns, so a network fault never stops a sale.','Vifaa vinaendelea kuuza bila intaneti na kusawazisha mtandao unaporudi, kwa hiyo hitilafu ya mtandao haisimamishi mauzo.')}</span></div>
 <div><b>${T('Privacy by design','Faragha tangu mwanzo')}</b><span>${T('Each role sees only what its job needs. Health data never leaves the customer and the adviser serving them.','Kila jukumu linaona kile kazi yake inahitaji tu. Taarifa za afya haziondoki kwa mteja na mshauri anayemhudumia.')}</span></div></div>
 </div></section>`}

function devices(){return `<section class="ch dk" id="e1-touch"><div class="w">
 <div class="ey rv">${T('Chapter 5 · The hardware','Sura 5 · Vifaa')}</div>
 <h2 class="rv">${T('Seven devices. <em>No server room.</em>','Vifaa saba. <em>Hakuna chumba cha seva.</em>')}</h2>
 <p class="ld rv">${T('Everything the store needs fits on one table. The record lives in secure cloud hosting, so the shop holds no server to maintain, cool or protect. <b>Tap a number on the photograph</b> to see what each device does and why we chose it.','Kila kitu ambacho duka linahitaji kinatosha mezani moja. Kumbukumbu inakaa kwenye uhifadhi salama wa wingu, kwa hiyo duka halina seva ya kutunza, kupoza au kulinda. <b>Gusa namba kwenye picha</b> kuona kila kifaa kinafanya nini na kwa nini tulikichagua.')}</p>
 <div class="flat rv"><img src="${IM('flat')}" alt="${T('The store’s devices laid out on a dark stone table','Vifaa vya duka vimepangwa juu ya meza ya jiwe jeusi')}" loading="lazy" width="1920" height="1080">${DEV.map((d,i)=>`<button type="button" class="hs${i?'':' on'}" data-dev="${i}" style="left:${d.x}%;top:${d.y}%" aria-label="${E(L(d.h))}">0${i+1}</button>`).join('')}</div>
 <div class="devx"><div class="dlist">${DEV.map((d,i)=>`<button type="button" data-dev="${i}" class="${i?'':'on'}"><i>0${i+1}</i>${L(d.h)}</button>`).join('')}</div><div class="dcard" id="e1dc">${devCard(0)}</div></div>
 <p class="tag rv">${T('Seed budget for technology, the Afya Check kiosk and screens: ','Bajeti ya mtaji wa awali kwa teknolojia, kibanda cha Afya Check na skrini: ')}${TS(MM.seed)} · ${T('specific models are chosen after quotations and a test period','modeli maalum zinachaguliwa baada ya bei na kipindi cha majaribio')}</p>
 </div></section>`}
function devCard(i){const d=DEV[i];return `<h3>${L(d.h)}</h3><div class="who">${T('Used by','Kinatumiwa na')}: ${L(d.who)}</div><p>${L(d.d)}</p><p class="y">${L(d.why)}</p>`}

function modules(){return `<section class="ch wh" id="e1-mod"><div class="w">
 <div class="ey rv">${T('Chapter 6 · How it works','Sura 6 · Inavyofanya kazi')}</div>
 <h2 class="rv">${T('Nine jobs. <em>One system doing all of them.</em>','Kazi tisa. <em>Mfumo mmoja ukizifanya zote.</em>')}</h2>
 <p class="ld rv">${T('Each module is a part of the store’s daily work. For each one you will find what it does, who uses it, what it removes from people’s days and whether we buy it, build it or connect to it. <b>We do not write software we can buy;</b> we build only where Afya Basics is different.','Kila moduli ni sehemu ya kazi ya kila siku ya duka. Kwa kila moja utaona inafanya nini, nani anaitumia, inaondoa nini katika siku za watu na kama tunainunua, tunaijenga au tunaunganisha nayo. <b>Hatuandiki programu tunayoweza kununua;</b> tunajenga pale tu Afya Basics inapotofautiana.')}</p>
 <div class="mdl"><div class="mlist">${MODS.map((m,i)=>`<button type="button" data-mod="${i}" class="${i?'':'on'}"><i>0${i+1}</i>${L(m.h)}</button>`).join('')}</div><div id="e1md">${modCard(0)}</div></div>
 </div></section>`}
function modCard(i){const m=MODS[i];return `<div class="mdet"><figure class="ph"><img src="${IM(m.img)}" alt="" loading="lazy" width="1920" height="1080"></figure>
 <h3>${String(i+1).padStart(2,'0')} · ${L(m.h)}</h3><span class="bb">${L(m.b)}</span><p class="lead">${L(m.d)}</p>
 <div class="mgrid"><div><small>${T('Who uses it','Nani anaitumia')}</small><p>${L(m.u)}</p></div><div><small>${T('What it removes','Inaondoa nini')}</small><p>${L(m.x)}</p></div><div><small>${T('Why this approach','Kwa nini njia hii')}</small><p>${L(m.w)}</p></div></div></div>`}

function tryit(){return `<section class="ch iv" id="e1-try" style="background:#f5ebe3"><div class="w">
 <div class="ey rv">${T('Chapter 7 · Try the engine','Sura 7 · Jaribu injini')}</div>
 <h2 class="rv">${T('A working till <em>and the founder dashboard.</em>','Mashine ya mauzo inayofanya kazi <em>na dashibodi ya waanzilishi.</em>')}</h2>
 <p class="ld rv">${T('This is a working model of the staff till and the founder dashboard, using real catalogue prices. <b>Add products and press Charge.</b> Sell the monitor twice to reach its reorder point. Then tap the network badge to switch the internet off, keep selling, and switch it back on.','Huu ni mfano unaofanya kazi wa mashine ya mauzo ya wafanyakazi na dashibodi ya waanzilishi, ukitumia bei halisi za katalogi. <b>Ongeza bidhaa na bonyeza Lipisha.</b> Uza mashine ya presha mara mbili kufikia kiwango cha kuagiza upya. Kisha gusa alama ya mtandao kuzima intaneti, endelea kuuza, na uiwashe tena.')}</p>
 <div class="tryg"><div class="dvp rv"><div class="scr" id="e1till"></div><img class="frm" src="img/d8/dev-phone.webp" alt=""></div>
  <div class="lpt rv"><div class="scr"><div class="zs" id="e1db"></div></div><img src="img/d8/dev-laptop.webp" alt=""></div></div>
 <div class="tryx rv"><div><b>${T('What you just saw','Ulichoona sasa hivi')}</b><span>${T('One action on the till changed stock, money, the activity feed and the alerts at the same time.','Kitendo kimoja kwenye mashine ya mauzo kilibadilisha stoku, pesa, mtiririko wa shughuli na tahadhari kwa wakati mmoja.')}</span></div><div><b>${T('Why it matters','Kwa nini ni muhimu')}</b><span>${T('The founders and the shelf always agree, so decisions are made on today’s numbers, not last month’s.','Waanzilishi na rafu wanakubaliana kila wakati, kwa hiyo maamuzi yanafanywa kwa namba za leo, si za mwezi uliopita.')}</span></div><div><b>${T('Where the numbers come from','Namba zinatoka wapi')}</b><span>${T('Prices from the section 3.6 catalogue. The “Normal day” tab shows the master model’s month-12 figures divided by 30.','Bei kutoka katalogi ya sehemu 3.6. Kichupo cha “Siku ya kawaida” kinaonyesha takwimu za mwezi wa 12 za mpango mkuu zikigawanywa kwa 30.')}</span></div></div>
 </div></section>`}

function resil(){return `<section class="ch dk" id="e1-res"><div class="w">
 <div class="ey rv">${T('Chapter 8 · Resilience','Sura 8 · Uimara')}</div>
 <h2 class="rv">${T('Designed for power cuts <em>and weak networks.</em>','Imeundwa kuhimili kukatika kwa umeme <em>na mtandao dhaifu.</em>')}</h2>
 <p class="ld rv">${T('Power cuts and patchy mobile data are part of daily life. A premium store cannot answer them with “the system is down”. Here is what happens, minute by minute, when the power and the fixed internet line both fail at the busiest time of day.','Kukatika kwa umeme na mtandao dhaifu ni sehemu ya maisha ya kila siku. Duka la hadhi ya juu haliwezi kujibu kwa “mfumo umekatika”. Hiki ndicho kinachotokea, dakika kwa dakika, umeme na laini ya intaneti vikikatika wakati wa shughuli nyingi zaidi.')}</p>
 <div class="resg"><figure class="ph rv"><img src="${IM('power')}" alt="${T('A backup 4G router, a battery unit and a network switch on a wall shelf','Ruta ya akiba ya 4G, betri ya akiba na swichi ya mtandao kwenye rafu ya ukutani')}" loading="lazy" width="1920" height="1080"><figcaption>${T('The resilience shelf in the back office','Rafu ya uimara ofisini nyuma')}</figcaption></figure>
 <ol class="tl rv">
  <li><b>17:02</b><div><h4>${T('Power and fixed line drop','Umeme na laini ya kawaida vinakatika')}</h4><p>${T('The battery pack keeps the router, the till and the printer running without a flicker.','Betri ya akiba inaendelea kuwasha ruta, mashine ya mauzo na printa bila kukatika hata kidogo.')}</p></div></li>
  <li><b>17:02</b><div><h4>${T('The 4G line takes over','Laini ya 4G inachukua nafasi')}</h4><p>${T('The backup router switches network automatically. Mobile-money prompts keep reaching customers’ phones.','Ruta ya akiba inabadilisha mtandao yenyewe. Maombi ya malipo ya pesa ya simu yanaendelea kufika kwenye simu za wateja.')}</p></div></li>
  <li><b>17:20</b><div><h4>${T('If the internet goes completely','Intaneti ikikatika kabisa')}</h4><p>${T('The till sells from its own copy of the catalogue, prices and member list. Each sale is saved with a time stamp and marked “waiting to sync”.','Mashine ya mauzo inauza kutoka nakala yake ya katalogi, bei na orodha ya wanachama. Kila mauzo yanahifadhiwa na muda wake na kuwekwa alama “inasubiri kusawazisha”.')}</p></div></li>
  <li><b>17:45</b><div><h4>${T('Connection returns','Mtandao unarudi')}</h4><p>${T('Waiting sales flow into the record in order. Stock, money and the dashboard catch up within seconds; nothing is entered twice.','Mauzo yaliyokuwa yakisubiri yanaingia kwenye kumbukumbu kwa mpangilio. Stoku, pesa na dashibodi vinarudi sawa ndani ya sekunde; hakuna kinachoingizwa mara mbili.')}</p></div></li>
  <li><b>21:00</b><div><h4>${T('Cash-up','Hesabu ya pesa')}</h4><p>${T('Any payment that could not be confirmed is held as “pending” and checked at cash-up. A sale can wait; it is never lost.','Malipo yoyote yasiyothibitishwa yanashikiliwa kama “yanasubiri” na kukaguliwa wakati wa hesabu. Mauzo yanaweza kusubiri; hayapotei kamwe.')}</p></div></li></ol></div>
 <div class="four rv"><div><b>${T('Two networks','Mitandao miwili')}</b><span>${T('A fixed line and a 4G backup from a different provider.','Laini ya kawaida na akiba ya 4G kutoka mtoa huduma mwingine.')}</span></div><div><b>${T('Battery pack','Betri ya akiba')}</b><span>${T('Carries the till and network through short power cuts.','Inabeba mauzo na mtandao wakati wa kukatika kwa umeme kwa muda mfupi.')}</span></div><div><b>${T('Daily backups','Nakala za kila siku')}</b><span>${T('Encrypted copies of the record, kept in a second location.','Nakala zilizosimbwa za kumbukumbu, zikitunzwa mahali pa pili.')}</span></div><div><b>${T('Paper drill','Zoezi la karatasi')}</b><span>${T('A written fallback procedure, rehearsed by the team every quarter.','Utaratibu wa akiba ulioandikwa, unaofanyiwa mazoezi na timu kila robo mwaka.')}</span></div></div>
 </div></section>`}

function trust(){return `<section class="ch iv" id="e1-trust"><div class="w">
 <div class="ey rv">${T('Chapter 9 · Data, security and the law','Sura 9 · Taarifa, usalama na sheria')}</div>
 <h2 class="rv">${T('Health data is <em>held in trust.</em>','Taarifa za afya <em>zinatunzwa kwa uaminifu.</em>')}</h2>
 <div class="two"><div class="prose rv">
  <p>${T('Afya Basics will hold blood-pressure readings, purchase histories and family details. In Tanzania that is regulated. The Personal Data Protection Act, 2022 came into force on 1 May 2023','Afya Basics itatunza vipimo vya presha, historia za manunuzi na taarifa za familia. Tanzania hili linadhibitiwa. Sheria ya Ulinzi wa Taarifa Binafsi ya 2022 ilianza kutumika tarehe 1 Mei 2023')}${CI(1)}${T(' and created the Personal Data Protection Commission, which registers everyone who collects or processes personal data','. Iliunda Tume ya Ulinzi wa Taarifa Binafsi, inayosajili kila anayekusanya au kuchakata taarifa binafsi')}${CI(2)}${T('. Health information is sensitive personal data under the Act','. Taarifa za afya ni taarifa nyeti chini ya Sheria hii')}${CI(2)}.</p>
  <p>${T('<b>We treat this as a design rule, not paperwork.</b> Consent is asked on screen before any reading is saved, each role sees only what its job needs, and a customer can see, download or delete their own record.','<b>Tunalichukulia hili kama kanuni ya muundo, si makaratasi.</b> Ridhaa inaombwa kwenye skrini kabla kipimo chochote hakijahifadhiwa, kila jukumu linaona kile kazi yake inahitaji tu, na mteja anaweza kuona, kupakua au kufuta kumbukumbu yake.')}</p>
 </div><figure class="ph rv"><img src="${IM('kiosk')}" alt="${T('The Afya Check kiosk beside a privacy screen in a calm lobby','Kibanda cha Afya Check kando ya skrini ya faragha kwenye ukumbi tulivu')}" loading="lazy" width="1920" height="1080"><figcaption>${T('Consent is asked on this screen before any reading is saved','Ridhaa inaombwa kwenye skrini hii kabla kipimo chochote hakijahifadhiwa')}</figcaption></figure></div>
 <div class="law rv"><div><b>${T('1 May 2023','1 Mei 2023')}</b><span>${T('The Act came into force','Sheria ilianza kutumika')}${CI(1)}</span></div><div><b>${T('5 years','Miaka 5')}</b><span>${T('Validity of a registration certificate; renewal is due three months before expiry','Muda wa cheti cha usajili; kuhuisha kunafanyika miezi mitatu kabla ya kuisha')}${CI(2)}</span></div><div><b>${T('TSh 5 bn','TSh bilioni 5')}</b><span>${T('Upper limit of the fine a company faces for unlawful disclosure; officers can be liable personally','Kiwango cha juu cha faini kwa kampuni kwa kufichua taarifa kinyume cha sheria; viongozi wanaweza kuwajibika binafsi')}${CI(2)}</span></div></div>
 <div class="pr6 rv">
  <div><small>01 · ${T('Register','Sajili')}</small><h3>${T('Registration before launch','Usajili kabla ya kuzindua')}</h3><p>${T('Afya Basics registers as a data controller before it collects a single phone number. The grace period for existing businesses ended on 30 April 2025','Afya Basics inajisajili kama mdhibiti wa taarifa kabla ya kukusanya namba hata moja ya simu. Muda wa neema kwa biashara zilizopo uliisha tarehe 30 Aprili 2025')}${CI(3)}.</p></div>
  <div><small>02 · ${T('Consent','Ridhaa')}</small><h3>${T('Ask, explain, record','Uliza, eleza, rekodi')}</h3><p>${T('A customer can take an Afya Check without saving anything. Marketing messages need a separate “yes”.','Mteja anaweza kufanya Afya Check bila kuhifadhi chochote. Ujumbe wa matangazo unahitaji “ndiyo” tofauti.')}</p></div>
  <div><small>03 · ${T('Collect less','Kusanya kidogo')}</small><h3>${T('Only what the service needs','Kile tu huduma inachohitaji')}</h3><p>${T('A phone number and an address for a box; readings only if the customer wants a history; no copies of identity documents unless the law asks.','Namba ya simu na anwani kwa ajili ya box; vipimo tu kama mteja anataka historia; hakuna nakala za vitambulisho isipokuwa sheria ikitaka.')}</p></div>
  <div><small>04 · ${T('Family sharing','Kushirikisha familia')}</small><h3>${T('Only with permission','Kwa ruhusa tu')}</h3><p>${T('A son abroad sees his mother’s readings only if she agrees, and she can stop it with one tap.','Mwana aliye nje anaona vipimo vya mama yake tu akikubali, na anaweza kusitisha kwa mguso mmoja.')}</p></div>
  <div><small>05 · ${T('Lock it down','Funga')}</small><h3>${T('Encrypted and logged','Imesimbwa na kurekodiwa')}</h3><p>${T('Data is encrypted in transit and at rest, backed up daily, and every time a record is opened, the system notes who and when.','Taarifa zinasimbwa zikiwa safarini na zikiwa zimehifadhiwa, nakala kila siku, na kila kumbukumbu inapofunguliwa mfumo unaandika nani na lini.')}</p></div>
  <div><small>06 · ${T('Abroad','Nje ya nchi')}</small><h3>${T('Cross-border hosting reviewed','Uhifadhi wa nje unakaguliwa')}</h3><p>${T('Where data is hosted outside Tanzania, cross-border transfer rules apply. A legal review is completed before launch.','Taarifa zikihifadhiwa nje ya Tanzania, kanuni za kuhamisha taarifa nje zinatumika. Mapitio ya kisheria yanakamilika kabla ya kuzindua.')}</p></div></div>
 <div class="acc rv"><div class="ey">${T('Who sees what','Nani anaona nini')}</div><h3 style="margin-top:12px;font-size:1.6rem">${T('Choose a role to see exactly what it can open.','Chagua jukumu kuona hasa kile linachoweza kufungua.')}</h3>
  <div class="rbtn">${ROLES.map((r,i)=>`<button type="button" data-role="${i}">${L(r)}</button>`).join('')}</div>
  <div class="accw"><table class="atab"><thead><tr><th>${T('Role','Jukumu')}</th>${DATA.map(d=>`<th>${L(d)}</th>`).join('')}</tr></thead><tbody>${ROLES.map((r,i)=>`<tr data-r="${i}"><td>${L(r)}</td>${ACC[i].map(c=>`<td class="${/^(Never)$/.test(c[0])?'no':''}">${L(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
  <p class="rx" id="e1rx">${T('Every role is designed around the least it needs to know.','Kila jukumu limeundwa kuzunguka kiwango kidogo zaidi linachohitaji kujua.')}</p></div>
 </div></section>`}

function cost(){const sys=MM.sys;return `<section class="ch wh" id="e1-cost"><div class="w">
 <div class="ey rv">${T('Chapter 11 · What it costs','Sura 11 · Inagharimu kiasi gani')}</div>
 <h2 class="rv">${T('What the platform <em>costs to run.</em>','Gharama ya <em>kuendesha jukwaa.</em>')}</h2>
 <p class="ld rv">${T('All software, messaging and connectivity sit in one line of the master model: <b>'+TS(sys)+' a month</b>. That is the cost of letting a small team run a full store, and of the founders seeing it from anywhere.','Programu zote, ujumbe na mtandao viko kwenye mstari mmoja wa mpango mkuu: <b>'+TS(sys)+' kwa mwezi</b>. Hiyo ndiyo gharama ya kuiwezesha timu ndogo kuendesha duka zima, na waanzilishi kuliona kutoka popote.')}</p>
 <div class="nmb rv"><div><b>${TM(sys)}</b><span>${T('per month, all systems','kwa mwezi, mifumo yote')}</span></div><div><b>${TM(sys*12)}</b><span>${T('per year','kwa mwaka')}</span></div><div><b>${(sys/MM.rev12*100).toFixed(1)}%</b><span>${T('of month-12 revenue in the base case','ya mapato ya mwezi wa 12 katika hali ya msingi')}</span></div><div><b>${TS(sys/MM.tx)}</b><span>${T('per customer transaction in month 12','kwa kila muamala wa mteja mwezi wa 12')}</span></div><div><b>${TM(MM.seed)}</b><span>${T('one-off seed budget for technology, the kiosk and screens','bajeti ya mara moja ya mtaji wa awali kwa teknolojia, kibanda na skrini')}</span></div></div>
 <div class="split"><div class="rv"><h3>${T('How the monthly line could split','Jinsi mstari wa mwezi unavyoweza kugawanyika')}</h3><div class="spl" style="margin-top:16px">${SPLIT.map(x=>`<div><span>${L(x[0])}</span><b>${TS(sys*x[1])}</b><i>${Math.round(x[1]*100)}%</i></div>`).join('')}<div class="t"><span>${T('Total, as in the master model','Jumla, kama kwenye mpango mkuu')}</span><b>${TS(sys)}</b><i>100%</i></div></div>
  <p class="tag">${T('Split is illustrative and sums to the model line · confirmed by quotations · payment fees are a share of sales and sit in the price, not here','Mgawanyo ni wa mfano na unajumlisha mstari wa mpango · unathibitishwa kwa bei · ada za malipo ni sehemu ya mauzo na ziko ndani ya bei, si hapa')}</p></div>
  <div class="bbc rv"><h3 style="margin-bottom:18px">${T('Buy, build, connect','Nunua, jenga, unganisha')}</h3>
   <small>${T('Buy','Nunua')} · 4 ${T('modules','moduli')}</small><h4>${T('Till, people, money and the catalogue engine','Mauzo, watu, pesa na injini ya katalogi')}</h4><p>${T('Every shop needs them and proven products already do them well. Buying is faster, cheaper and safer.','Kila duka linazihitaji na bidhaa zilizothibitishwa tayari zinazifanya vizuri. Kununua ni haraka, nafuu na salama zaidi.')}</p>
   <small>${T('Build','Jenga')} · 3 ${T('modules','moduli')}</small><h4>${T('Members and boxes, the Check Station, the dashboard','Wanachama na box, Kituo cha Check, dashibodi')}</h4><p>${T('This is where Afya Basics is different, so this is where our money and our intellectual property go.','Hapa ndipo Afya Basics inapotofautiana, kwa hiyo hapa ndipo pesa zetu na mali yetu ya kiakili zinapoenda.')}</p>
   <small>${T('Connect','Unganisha')} · 2 ${T('modules','moduli')}</small><h4>${T('Orders and delivery, payments and messaging','Oda na usafirishaji, malipo na ujumbe')}</h4><p>${T('WhatsApp, SMS and mobile money are national rails. We plug into them through adapters we can swap.','WhatsApp, SMS na pesa ya simu ni mifumo ya kitaifa. Tunaunganishwa nayo kupitia viunganishi tunavyoweza kubadili.')}</p>
   <p class="tag">${T('Specific vendors are chosen after quotations and a test period · no supplier agreement exists yet','Wauzaji maalum wanachaguliwa baada ya bei na kipindi cha majaribio · hakuna mkataba na msambazaji bado')}</p></div></div>
 </div></section>`}

function scale(){const S=MM.stores;return `<section class="ch dk scl" id="e1-scale"><div class="bg"></div><div class="sh"></div><div class="w">
 <div class="ey rv">${T('Chapter 12 · Scale','Sura 12 · Ukuaji')}</div>
 <h2 class="rv">${T('Every new store <em>runs on the same platform.</em>','Kila duka jipya <em>linatumia jukwaa lilelile.</em>')}</h2>
 <p class="ld rv">${T('The engine is designed once and reused by every store. A new store arrives with devices, logins and an opening checklist, not a new software project. <b>Choose a year</b> to see the network in the master model and what changes in the technology at that stage.','Injini inaundwa mara moja na kutumiwa na kila duka. Duka jipya linakuja na vifaa, akaunti na orodha ya kufungua, si mradi mpya wa programu. <b>Chagua mwaka</b> kuona mtandao katika mpango mkuu na kinachobadilika katika teknolojia kwa hatua hiyo.')}</p>
 <div class="yrs rv">${S.map((n,i)=>`<button type="button" data-yr="${i}" class="${i?'':'on'}"><small>${T('Year','Mwaka')} ${i+1}</small><b>${n}</b></button>`).join('')}</div>
 <div class="ydet rv" id="e1yd">${yearCard(0)}</div>
 </div></section>`}
function yearCard(i){const n=MM.stores[i];let reg=MM.regions[0][1],key=1;MM.regions.forEach(r=>{if(n>=r[0]){reg=r[1];key=r[0]}});const st=STAGE[key]||STAGE[1];
 return `<div class="big">${n}<small>${n===1?T('store','duka'):T('stores','maduka')} · ${T('year','mwaka')} ${i+1}</small></div><div><h3>${lang()?(REGSW[reg]||reg):reg}</h3><p>${L(st)}</p><p class="tag">${T('Store count and regions from the master model (section 5.1)','Idadi ya maduka na maeneo kutoka mpango mkuu (sehemu 5.1)')}</p></div>`}

function risks(){return `<section class="ch wh" id="e1-risk"><div class="w">
 <div class="ey rv">${T('Chapter 13 · Risks and our answer','Sura 13 · Hatari na jibu letu')}</div>
 <h2 class="rv">${T('What could fail, <em>and what we have already done.</em>','Kinachoweza kushindwa, <em>na tulichokwisha kufanya.</em>')}</h2>
 <div class="rk rv">${RISK.map(r=>`<div><h3>${L(r[0])}</h3><i>${T('Likelihood','Uwezekano')}: ${L(r[1])}</i><p>${L(r[2])}</p></div>`).join('')}</div>
 </div></section>`}

function ending(pv,nx){return `${window.V3?window.V3.injSec('s4-1'):''}<section class="ch dk" id="e1-end"><div class="w">
 <div class="ey">${T('Investor takeaway','Muhtasari kwa mwekezaji')}</div>
 <p class="tkw">${T('One connected record lets <em>five to eight people</em> run a full store and lets the founders manage it from a phone. Every new store plugs into the same engine, so <em>sales grow faster than head-office cost.</em>','Kumbukumbu moja iliyounganishwa inawawezesha <em>watu watano hadi wanane</em> kuendesha duka zima na inawawezesha waanzilishi kulisimamia kwa simu. Kila duka jipya linaunganishwa na injini ileile, kwa hiyo <em>mauzo yanakua kwa kasi kuliko gharama za makao makuu.</em>')}</p>
 <div class="src" id="e1-src"><div class="ey">${T('Sources','Vyanzo')}</div><ol>${SRC.map(s=>`<li><a href="${s[1]}" target="_blank" rel="noopener">${E(s[0])}</a></li>`).join('')}<li>${T('Product prices: section 3.6 catalogue, each linked to its public listing:','Bei za bidhaa: katalogi ya sehemu 3.6, kila moja ikiunganishwa na orodha yake ya wazi:')} ${TILL.map(p=>`<a href="${p.u}" target="_blank" rel="noopener">${E(L(p.n))}</a>`).join(' · ')}</li><li>${T('Running costs, seed budget, revenue, transactions and store network: master model.','Gharama za uendeshaji, bajeti ya mtaji wa awali, mapato, miamala na mtandao wa maduka: mpango mkuu.')}</li><li>${T('Photographs are concept images created for this showroom.','Picha ni za dhana zilizotengenezwa kwa ajili ya showroom hii.')}</li></ol></div>
 <nav class="pgn">${pv?`<a href="#${pv.id}"><small>← ${pv.no}</small><span>${E(pv.title)}</span></a>`:'<span></span>'}${nx?`<a class="nx" href="#${nx.id}"><small>${nx.no} →</small><span>${E(nx.title)}</span></a>`:'<span></span>'}</nav>
 </div></section>`}

function render41(s,p,pv,nx){css41();return `<div class="e1" id="e1">${opening()}${why()}${sale()}${arch()}${devices()}${modules()}${tryit()}${resil()}${trust()}${cost()}${scale()}${risks()}${ending(pv,nx)}</div>`}
/* 4.1 depth layer: new chapters (tools and prices, build plan), richer module and cost chapters, and the full-explanation reader */
const RB=(k,h)=>`<button type="button" class="rb rv" data-deep="${k}"><span>${T('Read the full explanation','Soma maelezo kamili')}</span><b>${L(h)}</b>${ARW}</button>`;
const SRCL=k=>k?C(k):'';
const TT=(head,rows)=>`<div class="dtw"><table class="dt"><thead><tr>${head.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const SUM=a=>a.reduce((x,r)=>x+r[1],0);

const Y1P=(()=>{try{return MODEL.get('base').months[11].cum_profit}catch(e){return 63554058}})();
const RSV=(()=>{try{return MODEL.inputs.seed.use.find(x=>/reserve/i.test(x[0]))[1]}catch(e){return 42e6}})();
const P510=(()=>{try{return MODEL.get('base').months.slice(4,10).reduce((a,m)=>a+m.profit,0)}catch(e){return 47e6}})();
/* ---------- chapter 3 · tools and prices ---------- */
function stackCh(){return `<section class="ch wh" id="e1-stack"><div class="w">
 <div class="ey rv">${T('Chapter 3 · The tools we use and what they cost','Sura 3 · Zana tunazotumia na gharama zake')}</div>
 <h2 class="rv">${T('Six proven tools. <em>One record we own.</em>','Zana sita zilizothibitishwa. <em>Kumbukumbu moja tunayoimiliki.</em>')}</h2>
 <p class="ld rv">${T('Here is the engine with real names and real prices. We chose each tool against four tests: <b>it already works in Tanzania</b>, it publishes its price, it lets us take our data out at any time, and a single developer can look after it. Where Afya Basics is different (members, boxes, the Twin, the Check Station) we build our own platform; everywhere else we buy.','Hii ndiyo injini kwa majina halisi na bei halisi. Tulichagua kila zana kwa vipimo vinne: <b>tayari inafanya kazi Tanzania</b>, inachapisha bei yake, inaturuhusu kutoa taarifa zetu wakati wowote, na msanidi mmoja anaweza kuitunza. Pale Afya Basics inapotofautiana (wanachama, box, Twin, Kituo cha Check) tunajenga jukwaa letu; kwingine kote tunanunua.')}</p>
 <div class="stx rv">${STACK.map((x,i)=>`<div class="sti"><span class="n">0${i+1}</span><div><small>${L(x.j)}</small><h3>${E(L(x.p))}</h3><p>${L(x.why)}</p></div><div class="pr"><b>${L(x.cn)}</b>${x.s.map(SRCL).join('')}</div></div>`).join('')}</div>
 <div class="kpis rv"><div><b>${TS(SUM(BILL()))}</b><span>${T('estimated monthly running bill at month-12 volumes','makadirio ya gharama ya mwezi kwa kiwango cha mwezi wa 12')}</span></div><div><b>${TS(MM.sys)}</b><span>${T('what the master model allows each month','kile ambacho mpango mkuu unaruhusu kila mwezi')}</span></div><div><b>${TS(MM.sys-SUM(BILL()))}</b><span>${T('headroom for growth in messages and support','nafasi ya ziada kwa ongezeko la ujumbe na msaada')}</span></div></div>
 <p class="tag rv">${T('US$ prices converted at TSh 2,644 per US$ (2 November 2026)','Bei za US$ zimebadilishwa kwa TSh 2,644 kwa US$ (2 Novemba 2026)')}${C('currencybeacon')} · ${T('vendors are confirmed after quotations and a test period','wauzaji wanathibitishwa baada ya bei na kipindi cha majaribio')}</p>
 ${RB('stack',['How we chose each tool, the alternatives, and the full monthly bill','Tulivyochagua kila zana, mbadala, na gharama kamili ya mwezi'])}
 </div></section>`}

/* ---------- chapter 6 · module card with steps and a worked example ---------- */
function modCard(i){const m=MODS[i],w=WALK[i];return `<div class="mdet"><figure class="ph"><img src="${IM(m.img)}" alt="" loading="lazy" width="1920" height="1080"></figure>
 <h3>${String(i+1).padStart(2,'0')} · ${L(m.h)}</h3><span class="bb">${L(m.b)}</span><p class="lead">${L(m.d)}</p>
 <div class="wk"><div><small>${T('Step by step','Hatua kwa hatua')}</small><ol>${L(w.s).map(x=>`<li>${x}</li>`).join('')}</ol></div><div class="ex"><small>${T('A worked example','Mfano halisi')}</small><p>${L(w.e)}</p></div></div>
 <div class="mgrid"><div><small>${T('Who uses it','Nani anaitumia')}</small><p>${L(m.u)}</p></div><div><small>${T('What it removes','Inaondoa nini')}</small><p>${L(m.x)}</p></div><div><small>${T('Why this approach','Kwa nini njia hii')}</small><p>${L(m.w)}</p></div></div></div>`}

/* ---------- chapter 5 · devices with prices ---------- */
const DEVP=[[PX.pos,'299-point-of-sale'],[PX.tab,'tab-a11'],[0,''],[0,''],[0,''],[0,''],[PX.rtr,'386-routers']];
function devCard(i){const d=DEV[i],p=DEVP[i];return `<h3>${L(d.h)}</h3><div class="who">${T('Used by','Kinatumiwa na')}: ${L(d.who)}</div><p>${L(d.d)}</p><p class="y">${L(d.why)}</p><p class="dpx">${p[0]?`${T('Price in Dar es Salaam today','Bei Dar es Salaam leo')}: <b>${TS(p[0])}</b>${SRCL(p[1])}`:T('Price: by quotation before purchase','Bei: kwa nukuu kabla ya kununua')}</p>`}

/* ---------- chapter 9 · data, security and the law (adds the inventory and tax rules) ---------- */
function trustX(){return insEnd(trust(),`<div class="inv rv"><div class="ey">${T('What we keep, where, and for how long','Tunachotunza, wapi, na kwa muda gani')}</div>
 ${TT([T('Data','Taarifa'),T('Where it lives','Inakaa wapi'),T('Why we keep it','Kwa nini tunaitunza'),T('Who can open it','Nani anaweza kuifungua'),T('How long','Kwa muda gani')],DINV.map(r=>r.map(L)))}
 <div class="two" style="margin-top:46px"><div class="prose"><h3>${T('Tax receipts are the law, not an option','Risiti za kodi ni sheria, si hiari')}</h3><p>${T('Every VAT-registered business must issue fiscal receipts through an approved device, whatever its turnover, and a non-VAT business must do so once turnover passes TSh 14 million a year. Failing to issue a receipt can cost up to TSh 4.5 million, or up to three years in prison, or both','Kila biashara iliyosajiliwa kwa VAT lazima itoe risiti za kodi kupitia kifaa kilichoidhinishwa, bila kujali mauzo yake, na biashara isiyo ya VAT lazima ifanye hivyo mauzo yakizidi TSh milioni 14 kwa mwaka. Kushindwa kutoa risiti kunaweza kugharimu hadi TSh milioni 4.5, au kifungo hadi miaka mitatu, au vyote')}${C('pkfea')}. ${T('Afya Basics will pass that threshold in its first months, so the TRA connector is fitted before the first sale.','Afya Basics itavuka kiwango hicho katika miezi yake ya kwanza, kwa hiyo kiunganishi cha TRA kinawekwa kabla ya mauzo ya kwanza.')}</p></div>
 <div class="prose"><h3>${T('We never hold a card or a PIN','Hatushiki kadi wala PIN kamwe')}</h3><p>${T('Customers approve mobile-money payments on their own phones and type card details into AzamPay’s secure page. Our systems only receive “paid” or “failed” with a reference number, so a breach of our servers could never expose a customer’s money.','Wateja wanaidhinisha malipo ya pesa ya simu kwenye simu zao na kuandika taarifa za kadi kwenye ukurasa salama wa AzamPay. Mifumo yetu inapokea tu “imelipwa” au “imeshindwa” pamoja na namba ya kumbukumbu, kwa hiyo uvunjaji wa seva zetu hauwezi kamwe kufichua pesa ya mteja.')}</p></div></div></div>
 ${RB('trust',['The full data, security and legal design','Muundo kamili wa taarifa, usalama na sheria'])}`)}

/* ---------- chapter 10 · build plan and team ---------- */
function buildCh(){return `<section class="ch dk" id="e1-build"><div class="w">
 <div class="ey rv">${T('Chapter 10 · Build plan and team','Sura 10 · Mpango wa ujenzi na timu')}</div>
 <h2 class="rv">${T('Configure first. <em>Build what only we need.</em>','Sanidi kwanza. <em>Jenga kile tunachohitaji peke yetu.</em>')}</h2>
 <p class="ld rv">${T('The fastest way to fail with software is to build everything before the first customer arrives. We open on proven tools, learn from real trading until the store reaches monthly profit (month 10 in the master model), and only then build the Afya platform, paid from the store’s operating profit. <b>Each phase has a team, a cost from published salary data, and a test it must pass.</b>','Njia ya haraka zaidi ya kushindwa na programu ni kujenga kila kitu kabla mteja wa kwanza hajafika. Tunafungua kwa zana zilizothibitishwa, tunajifunza kutokana na biashara halisi hadi duka lifikie faida ya mwezi (mwezi wa 10 katika mpango mkuu), na hapo ndipo tunajenga jukwaa la Afya, likilipiwa kutoka faida ya uendeshaji ya duka. <b>Kila awamu ina timu, gharama kutoka takwimu za mishahara zilizochapishwa, na jaribio inalopaswa kupita.</b>')}</p>
 <div class="phs rv">${PH.map(p=>`<div class="phi"><div class="pk"><b>${L(p.k)}</b><span>${L(p.t)}</span></div><div><h3>${L(p.h)}</h3><p>${L(p.d)}</p><div class="pm"><span><i>${T('Team','Timu')}</i>${L(p.who)}</span><span><i>${T('Cost','Gharama')}</i>${L(p.cn)}${C('mctaba')}</span></div></div></div>`).join('')}</div>
 <div class="four rv">${TESTS.slice(0,4).map(t=>`<div><b>${L(t[0])}</b><span>${L(t[1])}</span></div>`).join('')}</div>
 ${RB('build',['Roles, timeline, tests and how the build is paid for','Majukumu, ratiba, majaribio na jinsi ujenzi unavyolipiwa'])}
 </div></section>`}

/* ---------- chapter 11 · cost (real bill and one-off list) ---------- */
function cost(){const B=BILL(),O=ONEOFF(),b=SUM(B),o=SUM(O),sys=MM.sys;return `<section class="ch wh" id="e1-cost"><div class="w">
 <div class="ey rv">${T('Chapter 11 · What it costs','Sura 11 · Inagharimu kiasi gani')}</div>
 <h2 class="rv">${T('Every shilling, <em>itemised.</em>','Kila shilingi, <em>kipengele kwa kipengele.</em>')}</h2>
 <p class="ld rv">${T('Two bills matter: what the engine costs to run each month, and what it costs to switch on. Both are built here from published prices, then compared with the master model, including where the model is short.','Bili mbili ni muhimu: injini inagharimu kiasi gani kuendesha kila mwezi, na inagharimu kiasi gani kuiwasha. Zote zinajengwa hapa kutoka bei zilizochapishwa, kisha kulinganishwa na mpango mkuu, ikiwemo pale mpango unapopungukiwa.')}</p>
 <div class="split"><div class="rv"><h3>${T('Running bill, per month','Gharama ya uendeshaji, kwa mwezi')}</h3><div class="spl" style="margin-top:16px">${B.map(x=>`<div><span>${L(x[0])}<em>${L(x[2])}</em></span><b>${TS(x[1])}</b><i>${SRCL(x[3])}</i></div>`).join('')}<div class="t"><span>${T('Estimated total','Jumla ya makadirio')}</span><b>${TS(b)}</b><i></i></div><div><span>${T('Master model line','Mstari wa mpango mkuu')}</span><b>${TS(sys)}</b><i></i></div><div class="ok2"><span>${T('Headroom','Nafasi ya ziada')}</span><b>${TS(sys-b)}</b><i>${Math.round((sys-b)/sys*100)}%</i></div></div></div>
 <div class="rv"><h3>${T('Switch-on bill, before opening','Gharama ya kuwasha, kabla ya kufungua')}</h3><div class="spl" style="margin-top:16px">${O.map(x=>`<div><span>${L(x[0])}<em>${L(x[2])}</em></span><b>${TS(x[1])}</b><i>${SRCL(x[3])}</i></div>`).join('')}<div class="t"><span>${T('Estimated total','Jumla ya makadirio')}</span><b>${TS(o)}</b><i></i></div><div><span>${T('Seed line: technology, kiosk and screens','Mstari wa mtaji: teknolojia, kibanda na skrini')}</span><b>${TS(MM.seed)}</b><i></i></div><div class="gap"><span>${T('Shortfall to close','Upungufu wa kuziba')}</span><b>${TS(o-MM.seed)}</b><i></i></div></div></div></div>
 <div class="prop rv"><b>${T('What we propose','Tunachopendekeza')}</b><p>${T(`At today’s exchange rate the switch-on bill is about ${TM(o-MM.seed)} above the seed line, and in-store screens are not yet priced. We propose covering that amount from the ${TM(RSV)} working-capital reserve, or raising the technology line to about ${TM(Math.ceil(o/1e6)*1e6+2e6)} to include screens. The Phase 2 build (${TM(PX.mid*6)}) is not yet in the master model; it starts only after the store reaches monthly profit (month 10) and is paid from operating profit, not from the seed. Both changes will be carried into the financials in Part 6.`,`Kwa kiwango cha ubadilishaji cha leo, gharama ya kuwasha iko takriban ${TM(o-MM.seed)} juu ya mstari wa mtaji, na skrini za dukani bado hazijawekewa bei. Tunapendekeza kiasi hicho kilipwe kutoka akiba ya mtaji wa kazi ya ${TM(RSV)}, au kuongeza mstari wa teknolojia hadi takriban ${TM(Math.ceil(o/1e6)*1e6+2e6)} ili kujumuisha skrini. Ujenzi wa Awamu 2 (${TM(PX.mid*6)}) bado haumo kwenye mpango mkuu; unaanza tu baada ya duka kufikia faida ya mwezi (mwezi wa 10) na unalipiwa kutoka faida ya uendeshaji, si kutoka mtaji wa awali. Mabadiliko yote mawili yataingizwa kwenye takwimu za fedha katika Sehemu 6.`)}</p></div>
 <div class="nmb rv"><div><b>${TS(sys/MM.tx)}</b><span>${T('systems cost per customer transaction in month 12','gharama ya mifumo kwa kila muamala wa mteja mwezi wa 12')}</span></div><div><b>${(sys/MM.rev12*100).toFixed(1)}%</b><span>${T('of month-12 revenue','ya mapato ya mwezi wa 12')}</span></div><div><b>1%</b><span>${T('AzamPay fee per mobile-money payment, customer pays operator fees','ada ya AzamPay kwa kila malipo ya simu, mteja akilipa ada za mtandao')}${C('azampay')}</span></div><div><b>US$0</b><span>${T('for WhatsApp replies inside 24 hours','kwa majibu ya WhatsApp ndani ya saa 24')}${C('developers.facebook')}</span></div><div><b>${TM(PX.mid*6)}</b><span>${T('Phase 2 platform build, from operating profit','ujenzi wa jukwaa Awamu 2, kutoka faida ya uendeshaji')}</span></div></div>
 ${RB('cost',['Every assumption behind both bills','Kila dhana nyuma ya bili zote mbili'])}
 </div></section>`}

/* ---------- read buttons on the existing chapters ---------- */
const insEnd=(html,add)=>{const i=html.lastIndexOf('</div></section>');return html.slice(0,i)+add+html.slice(i)};
const addRB=(html,k,h)=>insEnd(html,RB(k,h));
function whyX(){return addRB(why(),'why',['The engine in plain words, with a glossary','Injini kwa maneno rahisi, pamoja na kamusi'])}
function saleX(){const h=sale();const i=h.indexOf('<div class="acts rv" style="margin-top:28px">');return h.slice(0,i)+`<div class="acts rv" style="margin-top:28px"><button class="bt" type="button" data-film="0">${PLY}${T('Play the film','Cheza filamu')}</button><button class="bt gh" type="button" data-deep="sale">${T('Read the technical trace','Soma ufuatiliaji wa kiufundi')}${ARW}</button></div>`+h.slice(h.indexOf('</div>',i)+6)}
function archX(){return addRB(arch(),'arch',['Which tool sits in each layer, and the life of one record','Zana ipi iko kwenye kila tabaka, na maisha ya kumbukumbu moja'])}
function devicesX(){return addRB(devices(),'touch',['The full device list with prices and the switch-on budget','Orodha kamili ya vifaa pamoja na bei na bajeti ya kuwasha'])}
function modulesX(){return addRB(modules().replace(T('Each module is a part of the store’s daily work. For each one you will find what it does, who uses it, what it removes from people’s days and whether we buy it, build it or connect to it.','Kila moduli ni sehemu ya kazi ya kila siku ya duka. Kwa kila moja utaona inafanya nini, nani anaitumia, inaondoa nini katika siku za watu na kama tunainunua, tunaijenga au tunaunganisha nayo.'),T('Each module is one part of the store’s daily work, shown step by step with a worked example using real prices. You will also see who uses it, what it removes from people’s days and whether we buy it, build it or connect to it.','Kila moduli ni sehemu moja ya kazi ya kila siku ya duka, ikionyeshwa hatua kwa hatua pamoja na mfano halisi wenye bei halisi. Utaona pia nani anaitumia, inaondoa nini katika siku za watu na kama tunainunua, tunaijenga au tunaunganisha nayo.')),'mod',['All nine walkthroughs on one page','Maelezo yote tisa kwenye ukurasa mmoja'])}
function resilX(){return addRB(resil(),'res',['What works offline, what does not, and how we recover','Kinachofanya kazi bila mtandao, kisichofanya, na tunavyorejea'])}

/* ---------- the full explanations ---------- */
const DH=(t,l)=>`<div class="ey">${T('Full explanation','Maelezo kamili')}</div><h2>${t}</h2><p class="dl">${l}</p>`;
const DEEP={
 why:()=>DH(T('The engine in plain words','Injini kwa maneno rahisi'),T('If you read only one explanation, read this one. It describes what the engine is, what problem it solves and the six words you need to follow the rest of the chapter.','Ukisoma maelezo moja tu, soma haya. Yanaeleza injini ni nini, inatatua tatizo gani na maneno sita unayohitaji kufuata sura nzima.'))+
 `<h3>${T('What the engine is','Injini ni nini')}</h3><p>${T('The engine is the set of software and devices that records everything Afya Basics does, in one place, the moment it happens. A sale at the counter, a box packed on Thursday, a blood-pressure reading taken with consent, a rider’s delivery and a supplier’s bill all land in the same record. Every screen in the company, from the adviser’s handheld to the founders’ phones, reads from that record and nothing else.','Injini ni mkusanyiko wa programu na vifaa vinavyorekodi kila kitu Afya Basics inachofanya, mahali pamoja, wakati kinapotokea. Mauzo kaunta, box iliyofungwa Alhamisi, kipimo cha presha kilichochukuliwa kwa ridhaa, safari ya msafirishaji na bili ya msambazaji vyote vinaingia kwenye kumbukumbu ileile. Kila skrini ya kampuni, kuanzia mashine ya mshauri hadi simu za waanzilishi, inasoma kutoka kumbukumbu hiyo na si kwingine.')}</p>
 <h3>${T('Why that matters in money','Kwa nini ni muhimu kwa pesa')}</h3><p>${T('In a shop that runs on separate tools, every number is typed more than once. The sale is written on a receipt, again in a stock book and again in a spreadsheet. Each copy costs time and invites a mistake, and mistakes in a health store are expensive: an expired product sold, a stock-out of a monitor a regular customer needed, or a cash gap nobody can explain. The engine removes the copies. That is why a team of five to eight people, depending on the funding option, can run a store that would otherwise need more, and why the founders can manage it from another country.','Katika duka linaloendeshwa kwa zana tofauti, kila namba inaandikwa zaidi ya mara moja. Mauzo yanaandikwa kwenye risiti, tena kwenye daftari la stoku na tena kwenye jedwali. Kila nakala inagharimu muda na kuleta makosa, na makosa katika duka la afya ni ghali: bidhaa iliyoisha muda kuuzwa, kuishiwa mashine ambayo mteja wa kawaida aliihitaji, au upungufu wa pesa usioweza kuelezwa. Injini inaondoa nakala hizo. Ndiyo sababu timu ya watu watano hadi wanane, kulingana na chaguo la ufadhili, inaweza kuendesha duka ambalo vinginevyo lingehitaji zaidi, na ndiyo sababu waanzilishi wanaweza kulisimamia kutoka nchi nyingine.')}</p>
 <h3>${T('Six words you will meet','Maneno sita utakayokutana nayo')}</h3><dl class="gl">${GLOSS.map(g=>`<dt>${L(g[0])}</dt><dd>${L(g[1])}</dd>`).join('')}</dl>
 <h3>${T('The three rules, in practice','Kanuni tatu, kwa vitendo')}</h3><p>${T('<b>Record once</b> means no screen has its own copy of the truth. <b>The system reminds</b> means every deadline in the business (a reorder, a renewal, an expiry date, a licence) is a rule with an alert, not a memory. <b>Three taps or fewer</b> means we design for the busiest Saturday, not the quiet Tuesday: if an adviser cannot complete a task in three taps with a customer waiting, the screen is redesigned before launch.','<b>Rekodi mara moja</b> maana yake hakuna skrini yenye nakala yake ya ukweli. <b>Mfumo unakumbusha</b> maana yake kila tarehe ya mwisho katika biashara (kuagiza, kuhuisha, tarehe ya kuisha, leseni) ni kanuni yenye tahadhari, si kumbukumbu ya kichwa. <b>Miguso mitatu au chini</b> maana yake tunaunda kwa ajili ya Jumamosi yenye shughuli nyingi, si Jumanne tulivu: mshauri asipoweza kukamilisha kazi kwa miguso mitatu huku mteja akisubiri, skrini inaundwa upya kabla ya kuzindua.')}</p>`,
 sale:()=>DH(T('The technical trace of one sale','Ufuatiliaji wa kiufundi wa mauzo moja'),T('The same story as the film, but showing which system acts at each moment and what it writes. Times are illustrative; each step takes about a second.','Hadithi ileile ya filamu, lakini ikionyesha mfumo upi unafanya kazi kila wakati na unaandika nini. Muda ni wa mfano; kila hatua inachukua takriban sekunde moja.'))+
 TT([T('Time','Muda'),T('System','Mfumo'),T('What happens','Kinachotokea'),T('What is written','Kinachoandikwa')],[
  ['10:14:02','Odoo POS',T('Barcode scanned on the handheld','Msimbopau unachanganuliwa kwenye mashine'),T('Basket line: product 315, batch MB-2611, TSh 180,000','Mstari wa kikapu: bidhaa 315, kundi MB-2611, TSh 180,000')],
  ['10:14:05','AzamPay',T('Payment prompt sent to the customer’s phone','Ombi la malipo linatumwa kwenye simu ya mteja'),T('Payment request with our reference number','Ombi la malipo pamoja na namba yetu ya kumbukumbu')],
  ['10:14:09','AzamPay → Odoo',T('Customer enters PIN; AzamPay confirms','Mteja anaweka PIN; AzamPay inathibitisha'),T('Payment “paid”, fee 1% borne by the customer','Malipo “yamelipwa”, ada 1% inabebwa na mteja')],
  ['10:14:09','TRA VFD',T('Sale sent to TRA, receipt returned with QR code','Mauzo yanatumwa TRA, risiti inarudi na QR code'),T('Fiscal receipt number stored on the sale','Namba ya risiti ya kodi inahifadhiwa kwenye mauzo')],
  ['10:14:10','Odoo',T('Stock and accounts update','Stoku na hesabu zinasasishwa'),T('Stock 7 → 6; revenue, VAT and cost of goods posted','Stoku 7 → 6; mapato, VAT na gharama ya bidhaa vinaingizwa')],
  ['10:14:10','Odoo rule',T('Reorder point reached','Kiwango cha kuagiza kimefikiwa'),T('Draft purchase order for 10 monitors','Rasimu ya oda ya ununuzi ya mashine 10')],
  ['10:14:11','Afya platform',T('Sale copied to the household record','Mauzo yananakiliwa kwenye kumbukumbu ya kaya'),T('Afya Twin plans cuff and batteries; family view updated','Afya Twin inapanga kafu na betri; mtazamo wa familia unasasishwa')],
  ['10:14:12','360dialog / SMS',T('Receipt delivered','Risiti inafikishwa'),T('WhatsApp message (free inside 24 h) or SMS (about TSh 23)','Ujumbe wa WhatsApp (bure ndani ya saa 24) au SMS (takriban TSh 23)')],
  ['21:00','Afya platform',T('Day closes; report sent to the founders','Siku inafungwa; ripoti inatumwa kwa waanzilishi'),T('Daily summary; reply “1” approves purchase orders','Muhtasari wa siku; jibu “1” linaidhinisha oda za ununuzi')]])+
 `<h3>${T('If something fails mid-way','Kitu kikishindwa katikati')}</h3><p>${T('If the customer does not approve the payment within two minutes, the basket is kept and the adviser can retry or take cash. If the TRA link is slow, the sale is stored and the receipt is fetched as soon as the link answers; the customer is told the receipt will follow by message. Nothing is ever recorded twice, because every step carries the same reference number.','Mteja asipoidhinisha malipo ndani ya dakika mbili, kikapu kinahifadhiwa na mshauri anaweza kujaribu tena au kupokea taslimu. Kiungo cha TRA kikichelewa, mauzo yanahifadhiwa na risiti inachukuliwa mara kiungo kinapojibu; mteja anaambiwa risiti itafuata kwa ujumbe. Hakuna kinachorekodiwa mara mbili, kwa sababu kila hatua inabeba namba ileile ya kumbukumbu.')}</p>`,
 stack:()=>{const B=BILL();return DH(T('How we chose each tool','Tulivyochagua kila zana'),T('Every choice below was made against the same four tests, and every price is linked to where it is published.','Kila chaguo hapa chini lilifanywa kwa vipimo vinne vilevile, na kila bei imeunganishwa na mahali ilipochapishwa.'))+
 `<h3>${T('The four tests','Vipimo vinne')}</h3><ol class="ol"><li>${T('<b>Proven in Tanzania.</b> It already serves Tanzanian businesses, in shillings, with local support.','<b>Imethibitishwa Tanzania.</b> Tayari inahudumia biashara za Tanzania, kwa shilingi, ikiwa na msaada wa ndani.')}</li><li>${T('<b>Published price.</b> We can budget without a sales call, and an investor can check the number.','<b>Bei iliyochapishwa.</b> Tunaweza kupanga bajeti bila simu ya mauzo, na mwekezaji anaweza kukagua namba.')}</li><li>${T('<b>Our data, our exit.</b> We can export everything and leave without losing a customer.','<b>Taarifa zetu, njia yetu ya kutoka.</b> Tunaweza kutoa kila kitu na kuondoka bila kupoteza mteja.')}</li><li>${T('<b>One person can run it.</b> No tool needs a team of specialists to keep it alive.','<b>Mtu mmoja anaweza kuiendesha.</b> Hakuna zana inayohitaji timu ya wataalamu kuiweka hai.')}</li></ol>`+
 STACK.map(x=>`<h3>${L(x.j)}: ${E(L(x.p))}</h3><p>${L(x.why)}</p><p class="pxl">${L(x.cn)} ${x.s.map(SRCL).join('')}</p>`).join('')+
 `<h3>${T('Alternatives we considered','Mbadala tuliofikiria')}</h3>`+STACKALT.map(a=>`<p><b>${L(a[0])}.</b> ${L(a[1])}${C(a[2])}</p>`).join('')+
 `<h3>${T('The monthly bill, line by line','Gharama ya mwezi, mstari kwa mstari')}</h3>`+TT([T('Item','Kipengele'),T('Basis','Msingi'),T('TSh a month','TSh kwa mwezi')],B.map(x=>[L(x[0])+SRCL(x[3]),L(x[2]),TS(x[1])]).concat([[`<b>${T('Total','Jumla')}</b>`,'',`<b>${TS(SUM(B))}</b>`]]))+
 `<p>${T(`Volumes are month-12 figures: ${NF(MM.sc.base.mem)} members receiving about six utility messages a month, about 750 online orders with three updates each, two offers a month to 1,000 customers who opted in, 1,800 Afya Check results and SMS receipts for roughly a third of store sales. Payment fees are not in this bill: with AzamPay’s customer-pays model they are carried by the payer, and card fees (3.5% + VAT) are inside the selling price.`,`Viwango ni vya mwezi wa 12: wanachama ${NF(MM.sc.base.mem)} wakipokea takriban ujumbe sita wa huduma kwa mwezi, oda takriban 750 za mtandaoni zenye taarifa tatu kila moja, ofa mbili kwa mwezi kwa wateja 1,000 waliokubali, majibu 1,800 ya Afya Check na risiti za SMS kwa takriban theluthi moja ya mauzo ya dukani. Ada za malipo hazimo kwenye bili hii: kwa mfumo wa AzamPay wa mteja-analipa zinabebwa na mlipaji, na ada za kadi (3.5% + VAT) ziko ndani ya bei ya kuuza.`)}</p>`},
 arch:()=>DH(T('Which tool sits in each layer','Zana ipi iko kwenye kila tabaka'),T('The five layers from chapter 4, with the actual product in each and the path one piece of information takes through them.','Tabaka tano kutoka sura ya 4, pamoja na bidhaa halisi kwenye kila moja na njia ambayo taarifa moja inapita ndani yake.'))+
 TT([T('Layer','Tabaka'),T('Product','Bidhaa'),T('Owned or rented','Tunamiliki au tunakodi')],[
  ['05 · '+T('Intelligence','Akili'),T('Afya platform: Twin rules, dashboard, 21:00 report','Jukwaa la Afya: kanuni za Twin, dashibodi, ripoti ya 21:00'),T('Built and owned','Tumejenga na tunamiliki')],
  ['04 · '+T('Connections','Miunganisho'),'AzamPay · TRA VFD · 360dialog · SMS',T('Rented services behind our own adapters','Huduma za kukodi nyuma ya viunganishi vyetu')],
  ['03 · '+T('Rules','Kanuni'),T('Odoo reorder rules + Afya platform rules','Kanuni za kuagiza za Odoo + kanuni za jukwaa la Afya'),T('Configured and built','Tumesanidi na kujenga')],
  ['02 · '+T('The record','Kumbukumbu'),T('Odoo database (products, stock, sales, accounts) + Supabase database (households, members, boxes, readings)','Hifadhidata ya Odoo (bidhaa, stoku, mauzo, hesabu) + hifadhidata ya Supabase (kaya, wanachama, box, vipimo)'),T('Owned: both run on accounts in our name','Tunamiliki: zote zinaendeshwa kwa akaunti kwa jina letu')],
  ['01 · '+T('Touchpoints','Vituo vya kugusa'),T('Handhelds, tablet, kiosk, phones; app, website, WhatsApp, SMS','Mashine za mkononi, kishikwambi, kibanda, simu; programu, tovuti, WhatsApp, SMS'),T('Hardware bought; apps built','Vifaa vimenunuliwa; programu zimejengwa')]])+
 `<h3>${T('Why two databases, and how they stay one record','Kwa nini hifadhidata mbili, na zinavyobaki kumbukumbu moja')}</h3><p>${T('Odoo is excellent at what every shop does: products, stock, sales and accounts. It is not built for monthly health boxes, household records or consented readings. Rather than force one tool to do both badly, each fact has exactly one home. Products and money live in Odoo; households and members live in the Afya platform. They share a customer number, and each sale is passed from Odoo to the platform within seconds, so the dashboard always combines them. No fact is ever stored in both places, which is what keeps it one record.','Odoo ni bora kwa kile kila duka linafanya: bidhaa, stoku, mauzo na hesabu. Haikujengwa kwa box za afya za kila mwezi, kumbukumbu za kaya au vipimo vilivyoridhiwa. Badala ya kulazimisha zana moja kufanya vyote vibaya, kila ukweli una nyumba moja tu. Bidhaa na pesa zinakaa Odoo; kaya na wanachama wanakaa kwenye jukwaa la Afya. Zinashiriki namba ya mteja, na kila mauzo yanapitishwa kutoka Odoo kwenda jukwaa ndani ya sekunde, kwa hiyo dashibodi inaziunganisha kila wakati. Hakuna ukweli unaohifadhiwa sehemu zote mbili, na hilo ndilo linaloifanya iwe kumbukumbu moja.')}</p>
 <h3>${T('The life of one record','Maisha ya kumbukumbu moja')}</h3><p>${T('A new household is created when a mother joins at the counter (touchpoint). It is written once in the Afya platform (record) with her consent choices. Rules attach to it: her box locks 12 days before month end, her renewal is due on the 25th (rules). On the 25th the platform asks AzamPay for payment and sends a WhatsApp reminder (connections). Her purchases and usage then feed the Afya Twin, which predicts when nappies will run out, and her family appears in the founders’ totals without her name (intelligence).','Kaya mpya inaundwa mama anapojiunga kaunta (kituo cha kugusa). Inaandikwa mara moja kwenye jukwaa la Afya (kumbukumbu) pamoja na machaguo yake ya ridhaa. Kanuni zinaambatishwa: box yake inafungwa siku 12 kabla ya mwisho wa mwezi, kuhuisha kwake ni tarehe 25 (kanuni). Tarehe 25 jukwaa linaiomba AzamPay malipo na kutuma ukumbusho wa WhatsApp (miunganisho). Manunuzi na matumizi yake kisha yanailisha Afya Twin, inayotabiri nepi zitaisha lini, na familia yake inaonekana kwenye jumla za waanzilishi bila jina lake (akili).')}</p>`,
 touch:()=>{const O=ONEOFF();return DH(T('Devices, prices and the switch-on budget','Vifaa, bei na bajeti ya kuwasha'),T('What we buy before opening, what each item costs in Dar es Salaam today, and why we chose it.','Tunachonunua kabla ya kufungua, kila kitu kinagharimu kiasi gani Dar es Salaam leo, na kwa nini tulikichagua.'))+
 TT([T('Item','Kipengele'),T('Detail','Maelezo'),'TSh'],O.map(x=>[L(x[0])+SRCL(x[3]),L(x[2]),TS(x[1])]).concat([[`<b>${T('Total','Jumla')}</b>`,'',`<b>${TS(SUM(O))}</b>`]]))+
 `<p>${T('The handheld tills include a built-in receipt printer and barcode scanner, so no separate printer is needed at the counter. A separate scanner for receiving and the riders’ phones are bought after quotations; in-store screens are priced with the fit-out supplier. The kiosk price comes from the master model; at today’s exchange rate it is the largest item by far.','Mashine za mauzo za mkononi zina printa ya risiti na skana ya msimbopau ndani, kwa hiyo hakuna haja ya printa tofauti kaunta. Skana tofauti ya kupokea mizigo na simu za wasafirishaji zinanunuliwa baada ya nukuu; skrini za dukani zinawekewa bei na msambazaji wa ukarabati. Bei ya kibanda inatoka mpango mkuu; kwa kiwango cha ubadilishaji cha leo ndicho kipengele kikubwa zaidi.')}</p>
 <h3>${T('How devices are kept safe','Vifaa vinavyolindwa')}</h3><p>${T('Every device is registered to the company, signs in by role and can be locked or wiped remotely if it is lost. No customer data is kept permanently on a device; it holds only the working copy needed to sell offline, encrypted, and cleared after sync.','Kila kifaa kimesajiliwa kwa kampuni, kinaingia kwa jukumu na kinaweza kufungwa au kufutwa kwa mbali kikipotea. Hakuna taarifa za mteja zinazokaa kwa kudumu kwenye kifaa; kinashikilia tu nakala ya kazi inayohitajika kuuza bila mtandao, ikiwa imesimbwa, na inafutwa baada ya kusawazisha.')}</p>`},
 mod:()=>DH(T('All nine modules, step by step','Moduli zote tisa, hatua kwa hatua'),T('The same walkthroughs as the chapter, gathered on one page so they can be read or printed in order.','Maelezo yaleyale ya sura, yamekusanywa kwenye ukurasa mmoja ili yasomwe au kuchapishwa kwa mpangilio.'))+
 MODS.map((m,i)=>`<h3>${String(i+1).padStart(2,'0')} · ${L(m.h)} <small>${L(m.b)}</small></h3><p>${L(m.d)}</p><ol class="ol">${L(WALK[i].s).map(x=>`<li>${x}</li>`).join('')}</ol><p class="exq">${L(WALK[i].e)}</p>`).join(''),
 res:()=>DH(T('What works offline, what does not, and how we recover','Kinachofanya kazi bila mtandao, kisichofanya, na tunavyorejea'),T('Resilience is a promise to customers: the store never turns them away because of a network problem.','Uimara ni ahadi kwa wateja: duka halimrudishi mtu kwa sababu ya tatizo la mtandao.'))+
 TT([T('Task','Kazi'),T('With no internet','Bila intaneti'),T('Why','Kwa nini')],[
  [T('Scan and sell','Changanua na uza'),T('Works','Inafanya kazi'),T('The till keeps its own copy of the catalogue and prices','Mashine inatunza nakala yake ya katalogi na bei')],
  [T('Cash','Taslimu'),T('Works','Inafanya kazi'),T('Counted at cash-up as normal','Inahesabiwa wakati wa hesabu kama kawaida')],
  [T('Mobile money','Pesa ya simu'),T('Usually works','Mara nyingi inafanya kazi'),T('The 4G backup carries the request; the customer approves on their own network','Akiba ya 4G inabeba ombi; mteja anaidhinisha kwenye mtandao wake')],
  [T('Card','Kadi'),T('Needs a connection','Inahitaji mtandao'),T('Card approval is online; 4G backup normally keeps it available','Kuidhinisha kadi ni mtandaoni; akiba ya 4G kwa kawaida inaiweka hai')],
  [T('TRA receipt','Risiti ya TRA'),T('Delayed, not lost','Inachelewa, haipotei'),T('Sale stored; receipt fetched and sent when the link returns','Mauzo yanahifadhiwa; risiti inachukuliwa na kutumwa kiungo kikirudi')],
  [T('Afya Check','Afya Check'),T('Works','Inafanya kazi'),T('Readings shown on screen; results sent after sync','Vipimo vinaonyeshwa kwenye skrini; majibu yanatumwa baada ya kusawazisha')]])+
 `<h3>${T('Recovery targets','Malengo ya kurejea')}</h3><p>${T('If a cloud server fails, the store keeps selling offline while we restore from the latest daily backup (Supabase keeps seven days of backups on the Pro plan','Seva ya wingu ikishindwa, duka linaendelea kuuza bila mtandao huku tukirejesha kutoka nakala ya kila siku ya hivi karibuni (Supabase inatunza nakala za siku saba kwenye mpango wa Pro')}${C('supabase')}${T('). Our target is to have the dashboard back within four hours and to lose no sale, because every sale also sits on the device that made it until the record confirms it.','). Lengo letu ni kurudisha dashibodi ndani ya saa nne bila kupoteza mauzo yoyote, kwa sababu kila mauzo yanabaki pia kwenye kifaa kilichoyafanya hadi kumbukumbu iyathibitishe.')}</p>`,
 trust:()=>DH(T('Data, security and the law in full','Taarifa, usalama na sheria kwa ukamilifu'),T('Health data is the most sensitive thing Afya Basics will hold. This is how it is designed, step by step, and which laws shape it.','Taarifa za afya ndizo nyeti zaidi Afya Basics itakazotunza. Hivi ndivyo zinavyoundwa, hatua kwa hatua, na sheria zipi zinaziongoza.'))+
 `<h3>${T('The two laws that shape the engine','Sheria mbili zinazounda injini')}</h3><p>${T('<b>Personal data.</b> The Personal Data Protection Act, 2022 came into force on 1 May 2023','<b>Taarifa binafsi.</b> Sheria ya Ulinzi wa Taarifa Binafsi ya 2022 ilianza kutumika tarehe 1 Mei 2023')}${CI(1)}${T('. Anyone collecting personal data registers with the Personal Data Protection Commission; certificates last five years; health data is sensitive and needs extra care; unlawful disclosure can bring a company fine of up to TSh 5 billion','. Yeyote anayekusanya taarifa binafsi anajisajili na Tume ya Ulinzi wa Taarifa Binafsi; vyeti vinadumu miaka mitano; taarifa za afya ni nyeti na zinahitaji uangalifu wa ziada; kufichua kinyume cha sheria kunaweza kuleta faini kwa kampuni ya hadi TSh bilioni 5')}${CI(2)}.</p>
 <p>${T('<b>Tax.</b> VAT-registered businesses must issue fiscal receipts through an approved EFD or VFD on every sale','<b>Kodi.</b> Biashara zilizosajiliwa kwa VAT lazima zitoe risiti za kodi kupitia EFD au VFD iliyoidhinishwa kwa kila mauzo')}${C('pkfea')}${T('. A VFD links the business system directly to the TRA portal, which validates each invoice and returns it with a QR code','. VFD inaunganisha mfumo wa biashara moja kwa moja na tovuti ya TRA, inayothibitisha kila ankara na kuirudisha na QR code')}${C('tallysolutions')}.</p>
 <h3>${T('What we keep','Tunachotunza')}</h3>`+TT([T('Data','Taarifa'),T('Where','Wapi'),T('Why','Kwa nini'),T('Who','Nani'),T('How long','Muda gani')],DINV.map(r=>r.map(L)))+
 `<h3>${T('Consent, step by step','Ridhaa, hatua kwa hatua')}</h3><ol class="ol"><li>${T('The kiosk explains, in Kiswahili or English, what will be measured and why.','Kibanda kinaeleza, kwa Kiswahili au Kiingereza, nini kitapimwa na kwa nini.')}</li><li>${T('The customer chooses: “show me only”, “save to my record”, or “save and share with my family”.','Mteja anachagua: “nionyeshe tu”, “hifadhi kwenye kumbukumbu yangu”, au “hifadhi na shirikisha familia yangu”.')}</li><li>${T('The choice is stored with the time, so we can prove consent.','Chaguo linahifadhiwa pamoja na muda, ili tuweze kuthibitisha ridhaa.')}</li><li>${T('Marketing is a separate question with its own “yes”.','Matangazo ni swali tofauti lenye “ndiyo” yake.')}</li><li>${T('Any choice can be changed or withdrawn in the app or at the counter.','Chaguo lolote linaweza kubadilishwa au kuondolewa kwenye programu au kaunta.')}</li></ol>
 <h3>${T('If something goes wrong','Kitu kikiharibika')}</h3><p>${T('Our breach plan has four steps: contain the problem and lock the affected accounts; find out exactly which records were touched; inform the Commission and the affected customers quickly and plainly; fix the cause and record what we changed. The plan is rehearsed once a year with the same seriousness as a fire drill.','Mpango wetu wa uvujaji una hatua nne: kudhibiti tatizo na kufunga akaunti zilizoathirika; kujua hasa kumbukumbu zipi ziliguswa; kuiarifu Tume na wateja walioathirika haraka na kwa uwazi; kurekebisha chanzo na kurekodi tulichobadilisha. Mpango unafanyiwa mazoezi mara moja kwa mwaka kwa uzito uleule wa zoezi la moto.')}</p>`,
 build:()=>DH(T('Roles, timeline, tests and funding','Majukumu, ratiba, majaribio na ufadhili'),T('The build plan in full, with the people involved, the order of work and how each phase is paid for.','Mpango wa ujenzi kwa ukamilifu, pamoja na watu wanaohusika, mpangilio wa kazi na jinsi kila awamu inavyolipiwa.'))+
 PH.map(p=>`<h3>${L(p.k)} · ${L(p.h)} <small>${L(p.t)}</small></h3><p>${L(p.d)}</p><p class="pxl">${T('Team','Timu')}: ${L(p.who)} · ${T('Cost','Gharama')}: ${L(p.cn)}${C('mctaba')}</p>`).join('')+
 `<h3>${T('Who does what','Nani anafanya nini')}</h3>`+TT([T('Role','Jukumu'),T('Responsibility','Wajibu')],[
  [T('Founders (product owners)','Waanzilishi (wamiliki wa bidhaa)'),T('Decide what is built next, accept or reject each feature, own the budget','Wanaamua kinachojengwa kifuatacho, wanakubali au kukataa kila kipengele, wanamiliki bajeti')],
  [T('Store lead','Kiongozi wa duka'),T('Tests every feature on the shop floor and reports what slows the team down','Anajaribu kila kipengele sakafuni dukani na kuripoti kinachochelewesha timu')],
  [T('Contracted developer','Msanidi wa mkataba'),T('Sets up Odoo and the connections (Phase 0), builds the Afya platform (Phase 2)','Anasanidi Odoo na miunganisho (Awamu 0), anajenga jukwaa la Afya (Awamu 2)')],
  [T('In-house developer (year 2)','Msanidi wa ndani (mwaka 2)'),T('Maintains, secures and improves the platform as stores are added','Anatunza, analinda na kuboresha jukwaa maduka yanapoongezeka')],
  [T('Lawyer (on retainer)','Mwanasheria (kwa makubaliano)'),T('Reviews consent, data location and the breach plan before launch','Anapitia ridhaa, mahali pa taarifa na mpango wa uvujaji kabla ya kuzindua')]])+
 `<h3>${T('How we test before customers do','Tunavyojaribu kabla wateja hawajajaribu')}</h3>`+TESTS.map(t=>`<p><b>${L(t[0])}.</b> ${L(t[1])}</p>`).join('')+
 `<h3>${T('How it is paid for','Inavyolipiwa')}</h3><p>${T(`Phase 0 is a switch-on cost (chapter 11). Phase 1 costs nothing beyond the monthly systems line. Phase 2, about ${TM(PX.mid*6)}, starts only after the store makes a monthly profit (month 10 in the master model) and is paid from operating profit over the following six months. If the store is behind plan, Phase 2 waits: the store keeps trading on the bought tools, so a late build delays new features but never stops sales.`,`Awamu 0 ni gharama ya kuwasha (sura ya 11). Awamu 1 haigharimu chochote zaidi ya mstari wa mifumo wa kila mwezi. Awamu 2, takriban ${TM(PX.mid*6)}, inaanza tu baada ya duka kupata faida ya mwezi (mwezi wa 10 katika mpango mkuu) na inalipiwa kutoka faida ya uendeshaji ya miezi sita inayofuata. Duka likiwa nyuma ya mpango, Awamu 2 inasubiri: duka linaendelea kufanya biashara kwa zana zilizonunuliwa, kwa hiyo ujenzi ukichelewa unachelewesha vipengele vipya lakini hausimamishi mauzo.`)}</p>`,
 cost:()=>{const B=BILL(),O=ONEOFF();return DH(T('Every assumption behind both bills','Kila dhana nyuma ya bili zote mbili'),T('How each figure in chapter 11 was built, so it can be checked and challenged.','Kila takwimu katika sura ya 11 ilivyojengwa, ili iweze kukaguliwa na kuhojiwa.'))+
 `<h3>${T('Exchange rate','Kiwango cha ubadilishaji')}</h3><p>${T('All US$ prices are converted at TSh 2,644 per US$, the mid-market rate on 2 November 2026','Bei zote za US$ zimebadilishwa kwa TSh 2,644 kwa US$, kiwango cha soko la kati tarehe 2 Novemba 2026')}${C('currencybeacon')}. ${T('A 10% weaker shilling would raise the monthly bill by about','Shilingi ikidhoofika kwa 10% gharama ya mwezi ingepanda kwa takriban')} ${TS(SUM(B.slice(0,5))*.1)} ${T('and the switch-on bill by about','na gharama ya kuwasha kwa takriban')} ${TS((U(PX.kiosk)+U(PX.vfd))*.1)}.</p>
 <h3>${T('Running bill','Gharama ya uendeshaji')}</h3>`+TT([T('Item','Kipengele'),T('Basis','Msingi'),'TSh'],B.map(x=>[L(x[0])+SRCL(x[3]),L(x[2]),TS(x[1])]))+
 `<h3>${T('Switch-on bill','Gharama ya kuwasha')}</h3>`+TT([T('Item','Kipengele'),T('Basis','Msingi'),'TSh'],O.map(x=>[L(x[0])+SRCL(x[3]),L(x[2]),TS(x[1])]))+
 `<h3>${T('Payment fees, worked through','Ada za malipo, kwa mfano')}</h3><p>${T('On a TSh 36,480 basket paid by mobile money, AzamPay’s 1% customer-pays fee is about TSh 365 and is carried by the payer. If we chose to absorb operator fees instead, AzamPay charges 3%, about TSh 1,094, which would come out of our margin. On a card payment of the same basket, 3.5% plus VAT is about TSh 1,507, which is why card prices are built into the selling price','Kwa kikapu cha TSh 36,480 kilicholipwa kwa pesa ya simu, ada ya AzamPay ya 1% ya mteja-analipa ni takriban TSh 365 na inabebwa na mlipaji. Kama tungechagua kubeba ada za mtandao wenyewe, AzamPay inatoza 3%, takriban TSh 1,094, ambazo zingetoka kwenye faida yetu. Kwa malipo ya kadi ya kikapu hicho, 3.5% pamoja na VAT ni takriban TSh 1,507, ndiyo sababu bei za kadi zimejumuishwa kwenye bei ya kuuza')}${C('azampay')}.</p>
 <h3>${T('What is not yet in the master model','Kisichomo bado kwenye mpango mkuu')}</h3><p>${T(`Two items: the switch-on shortfall of about ${TM(SUM(O)-MM.seed)} and the Phase 2 build of ${TM(PX.mid*6)}. Year 1 is a planned loss year for the store (about TSh 96M in the flagship case). The shortfall is covered from the working-capital reserve. Phase 2 starts after monthly profit in month 10, so about ${TM(PX.mid*2)} of it falls in year 1 and the remaining ${TM(PX.mid*4)} in year 2. Neither item requires new capital, and the platform they pay for is what makes stores 2 to 47 cheaper to open.`,`Vipengele viwili: upungufu wa kuwasha wa takriban ${TM(SUM(O)-MM.seed)} na ujenzi wa Awamu 2 wa ${TM(PX.mid*6)}. Mwaka 1 ni mwaka wa hasara iliyopangwa kwa duka (takriban TSh milioni 96 katika chaguo la duka kuu). Upungufu unalipwa kutoka akiba ya mtaji wa kazi. Awamu 2 inaanza baada ya faida ya mwezi katika mwezi wa 10, kwa hiyo takriban ${TM(PX.mid*2)} yake inaangukia mwaka 1 na ${TM(PX.mid*4)} iliyobaki mwaka 2. Hakuna kati ya hivi kinachohitaji mtaji mpya, na jukwaa vinavyolipia ndilo linalofanya maduka 2 hadi 47 kuwa nafuu kufungua.`)}</p>`}};

/* ---------- reader panel ---------- */
const DKEYS=['why','sale','stack','arch','touch','mod','res','trust','build','cost'];
function openDeep(k){closeDeep();const f=DEEP[k];if(!f)return;const i=DKEYS.indexOf(k),pv=DKEYS[i-1],nx=DKEYS[i+1];
 const w=document.createElement('div');w.className='e1d';w.innerHTML=`<div class="sc" data-dx></div><aside role="dialog" aria-modal="true"><button type="button" class="x" data-dx aria-label="${T('Close','Funga')}">✕</button><div class="bd2">${f()}<nav class="dn">${pv?`<button type="button" data-dg="${pv}">← ${T('Previous explanation','Maelezo yaliyotangulia')}</button>`:'<span></span>'}${nx?`<button type="button" data-dg="${nx}">${T('Next explanation','Maelezo yanayofuata')} →</button>`:''}</nav></div></aside>`;
 w.addEventListener('click',e=>{if(e.target.closest('[data-dx]')){closeDeep();return}const g=e.target.closest('[data-dg]');if(g){openDeep(g.dataset.dg);return}const a=e.target.closest('sup.ci a');if(a){e.preventDefault();closeDeep();const t=document.getElementById('e1-src');if(t)scrollTo({top:t.getBoundingClientRect().top+scrollY-60,behavior:'smooth'})}});
 document.body.appendChild(w);document.documentElement.style.overflow='hidden';requestAnimationFrame(()=>w.classList.add('on'));w.querySelector('.x').focus();
 const key=e=>{if(e.key==='Escape')closeDeep()};addEventListener('keydown',key);w._k=key}
function closeDeep(){const w=document.querySelector('.e1d');if(!w)return;removeEventListener('keydown',w._k);w.remove();document.documentElement.style.overflow=''}

function render41(s,p,pv,nx){css41();css41p();return `<div class="e1" id="e1">${opening()}${whyX()}${saleX()}${stackCh()}${archX()}${devicesX()}${modulesX()}${tryit()}${resilX()}${trustX()}${buildCh()}${cost()}${scale()}${risks()}${ending(pv,nx)}</div>`}
/* 4.1 page: behaviour */
let e1io=null,e1so=null,e1co=null,e1film=null;
const TS0={cart:{},net:1,queue:[],sales:0,rev:0,n:0,stock:{},feed:[],alerts:[],tab:'live',sc:'base',po:{}};
let TSS=JSON.parse(JSON.stringify(TS0));
const PB=id=>TILL.find(p=>p.id===id);
const clock=()=>{const d=new Date();return String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0')};
const OKI='<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><circle cx="24" cy="24" r="21"/><path d="M15 24.5l6 6 12-13"/></svg>';

function tillHTML(){const S=TSS,c=Object.entries(S.cart).filter(x=>x[1]>0),tot=c.reduce((a,[id,q])=>a+PB(+id).p*q,0),cnt=c.reduce((a,x)=>a+x[1],0);
 return `<div class="ta"><div class="sb"><span>${clock()}</span><button type="button" class="net${S.net?'':' off'}" data-net>${S.net?T('● Online','● Mtandaoni'):T('○ Offline · '+S.queue.length+' waiting','○ Bila mtandao · '+S.queue.length+' zinasubiri')}</button></div>
 <div class="hd"><small>${T('Afya till · Adviser 2','Mauzo ya Afya · Mshauri 2')}</small><b>${T('New sale','Mauzo mapya')}</b></div>
 <div class="pl">${TILL.map(p=>{const q=S.cart[p.id]||0,st=S.stock[p.id];return `<div class="pi"><div class="im" style="${SP(p.id)}"></div><div><b>${E(L(p.n))}</b><span>${TS(p.p)} · ${T('stock','stoku')} ${st}${q?` · <strong style="color:#1d5a43">×${q}</strong>`:''}</span></div><button type="button" class="ad" data-add="${p.id}" ${st-q<=0?'disabled':''}>${q?'+1':T('Add','Ongeza')}</button></div>`}).join('')}</div>
 <div class="ft"><div class="tot"><span>${cnt} ${T('items','bidhaa')}</span><span>${TS(tot)}</span></div><button type="button" class="chg" data-charge ${cnt?'':'disabled'}>${T('Charge','Lipisha')} ${cnt?TS(tot):''}</button></div>
 <div class="ok" id="e1ok"></div></div>`}

function dbHTML(){const S=TSS;const sc=MM.sc[S.sc]||MM.sc.base;
 const tabs=`<div class="tabs"><button type="button" data-tab="live" class="${S.tab==='live'?'on':''}">${T('Live today','Leo moja kwa moja')}</button><button type="button" data-tab="day" class="${S.tab==='day'?'on':''}">${T('Normal day','Siku ya kawaida')}</button><button type="button" data-tab="rep" class="${S.tab==='rep'?'on':''}">${T('21:00 report','Ripoti ya 21:00')}</button></div>`;
 let body='';
 if(S.tab==='live'){body=`<div class="k5"><div><small>${T('Sales','Mauzo')}</small><b id="k1">${TS(S.rev)}</b><span>${S.n} ${T('transactions','miamala')}</span></div><div><small>${T('Synced','Imesawazishwa')}</small><b id="k2">${S.sales}</b><span>${S.queue.length} ${T('waiting on device','zinasubiri kwenye kifaa')}</span></div><div><small>${T('Items sold','Bidhaa zilizouzwa')}</small><b id="k3">${Object.values(S.sold||{}).reduce((a,b)=>a+b,0)}</b><span>${T('across 4 products','katika bidhaa 4')}</span></div><div><small>${T('Purchase orders','Oda za ununuzi')}</small><b id="k4">${Object.keys(S.po).length}</b><span>${T('drafted by rules','zimeandaliwa na kanuni')}</span></div><div><small>${T('Network','Mtandao')}</small><b id="k5" style="font-size:18px;margin-top:12px">${S.net?T('Online','Mtandaoni'):T('Offline','Bila mtandao')}</b><span>${S.net?T('4G backup ready','Akiba ya 4G tayari'):T('Till keeps selling','Mauzo yanaendelea')}</span></div></div>
  <div class="row"><div><h5>${T('Activity','Shughuli')}</h5><div class="feed">${S.feed.length?S.feed.map((f,i)=>`<div class="${i?'':'new'}"><i>${f[0]}</i><span>${f[1]}</span></div>`).join(''):`<div><i>${clock()}</i><span style="color:#8b8f8c">${T('Waiting for the first sale. Add a product on the till and press Charge.','Inasubiri mauzo ya kwanza. Ongeza bidhaa kwenye mashine na bonyeza Lipisha.')}</span></div>`}</div></div>
  <div><h5>${T('Stock and alerts','Stoku na tahadhari')}</h5><div class="stk">${TILL.map(p=>`<span>${E(L(p.n))}</span><span class="${S.stock[p.id]<=p.rp?'lo':''}">${S.stock[p.id]} / ${p.rp}</span>`).join('')}</div><div class="al" style="margin-top:14px">${S.alerts.length?S.alerts.slice(0,3).map(a=>`<div class="${a[0]}">${a[1]}</div>`).join(''):`<div class="ok">${T('All products above their reorder points.','Bidhaa zote ziko juu ya viwango vya kuagiza upya.')}</div>`}</div></div></div>`}
 else if(S.tab==='day'){body=`<div class="scn">${['base','best','downside'].filter(k=>MM.sc[k]).map(k=>`<button type="button" data-sc="${k}" class="${S.sc===k?'on':''}">${({base:T('Base','Msingi'),best:T('Best','Bora'),downside:T('Downside','Mbaya')})[k]}</button>`).join('')}</div>
  <div class="k5"><div><small>${T('Sales per day','Mauzo kwa siku')}</small><b>${TM(sc.rev)}</b><span>${T('gross margin','faida ghafi')} ${Math.round(sc.gp*100)}%</span></div><div><small>${T('Customers served','Wateja waliohudumiwa')}</small><b>${sc.cust}</b><span>${T('store + online','duka + mtandaoni')}</span></div><div><small>${T('Afya Checks','Afya Check')}</small><b>${sc.checks}</b><span>${T('free, with consent','bure, kwa ridhaa')}</span></div><div><small>${T('Active members','Wanachama hai')}</small><b>${NF(sc.mem)}</b><span>${T('month 12','mwezi 12')}</span></div><div><small>${T('Systems cost','Gharama ya mifumo')}</small><b>${TS(MM.sys/30)}</b><span>${T('per day','kwa siku')}</span></div></div>
  <p style="font-size:12px;color:#6b6f6c;margin-top:16px;line-height:1.6">${T('Master model, month 12 of year 1, divided by 30. Switch scenario to compare the best and downside cases.','Mpango mkuu, mwezi wa 12 wa mwaka 1, ukigawanywa kwa 30. Badili hali kulinganisha hali bora na mbaya.')}</p>`}
 else{const sc2=MM.sc.base;body=`<div class="rep"><div class="m"><b>Afya Basics · ${T('Store #1','Duka #1')} · 21:00</b><br>${T('Sales','Mauzo')}: ${TS(sc2.rev+S.rev)}<br>${T('Customers served','Wateja')}: ${sc2.cust+S.n}<br>${T('Afya Checks','Afya Check')}: ${sc2.checks} · ${T('2 referred to a clinic','2 wamepewa rufaa kliniki')}<br>${T('Purchase orders waiting','Oda za ununuzi zinasubiri')}: ${Object.keys(S.po).length}<br>${T('Sales waiting to sync','Mauzo yanasubiri kusawazisha')}: ${S.queue.length}<br>${T('Cash-up','Hesabu ya pesa')}: ${T('matched to the shilling','imelingana hadi shilingi')}<br><br>${T('Reply 1 to approve open purchase orders.','Jibu 1 kuidhinisha oda za ununuzi.')}<small>21:00</small></div>${S.approved?`<div class="m me">1<small>21:03 ✓✓</small></div><div class="m">${T('Approved. Suppliers have been sent the orders.','Imeidhinishwa. Wasambazaji wametumiwa oda.')}<small>21:03</small></div>`:`<div style="text-align:center;margin-top:14px"><button type="button" data-appr style="appearance:none;border:0;background:#1d5a43;color:#fff;border-radius:18px;padding:8px 16px;font:600 12px var(--sans)">${T('Reply 1','Jibu 1')}</button></div>`}</div>`}
 return `<div class="db"><div class="tb"><b>${T('Founder dashboard','Dashibodi ya waanzilishi')}</b><span>${T('Store #1','Duka #1')} · Dar es Salaam</span>${tabs}</div><div class="bd">${body}</div></div>`}

function paintTry(){const t=document.getElementById('e1till'),d=document.getElementById('e1db');if(t)t.innerHTML=tillHTML();if(d){d.innerHTML=dbHTML();fitDb()}}
function fitDb(){const d=document.getElementById('e1db');if(!d)return;const w=d.parentElement.clientWidth;d.style.transform=`scale(${(w/820).toFixed(4)})`}
function charge(){const S=TSS,items=Object.entries(S.cart).filter(x=>x[1]>0);if(!items.length)return;const tot=items.reduce((a,[id,q])=>a+PB(+id).p*q,0);const t=clock();
 S.sold=S.sold||{};items.forEach(([id,q])=>{S.stock[id]-=q;S.sold[id]=(S.sold[id]||0)+q;const p=PB(+id);if(S.stock[id]<=p.rp&&!S.po[id]){S.po[id]=1;S.alerts.unshift(['',`${E(L(p.n))}: ${T('stock','stoku')} ${S.stock[id]}, ${T('reorder point reached. Purchase order drafted for approval.','kiwango cha kuagiza kimefikiwa. Oda ya ununuzi imeandaliwa kwa idhini.')}`]);S.feed.unshift([t,T('Purchase order drafted · ','Oda ya ununuzi imeandaliwa · ')+E(L(p.n))])}});
 const desc=items.map(([id,q])=>`${q}× ${E(L(PB(+id).n))}`).join(', ');
 if(S.net){S.rev+=tot;S.n++;S.sales++;S.feed.unshift([t,`${T('Sale','Mauzo')} ${TS(tot)} · ${desc} · ${T('receipt sent by SMS','risiti imetumwa kwa SMS')}`])}
 else{S.queue.push({tot,desc,t});S.feed.unshift([t,`<span style="color:#9a5a00">${T('Saved on device, waiting to sync','Imehifadhiwa kwenye kifaa, inasubiri kusawazisha')} · ${TS(tot)}</span>`])}
 S.cart={};S.feed=S.feed.slice(0,30);paintTry();const ok=document.getElementById('e1ok');if(ok){ok.innerHTML=`${OKI}<b>${S.net?T('Paid','Imelipwa'):T('Saved offline','Imehifadhiwa bila mtandao')}</b><span>${S.net?T('Receipt sent by SMS. Stock, money and the dashboard have updated.','Risiti imetumwa kwa SMS. Stoku, pesa na dashibodi zimesasishwa.'):T('The sale is safe on this device and will sync when the internet returns.','Mauzo yako salama kwenye kifaa hiki na yatasawazishwa intaneti ikirudi.')}</span>`;ok.classList.add('on');setTimeout(()=>ok.classList.remove('on'),1600)}
 ['k1','k2','k4'].forEach(k=>{const e=document.getElementById(k);if(e)e.classList.add('fl')})}
function toggleNet(){const S=TSS;S.net=!S.net;const t=clock();if(S.net&&S.queue.length){S.queue.forEach(q=>{S.rev+=q.tot;S.n++;S.sales++});S.feed.unshift([t,`${T('Back online','Mtandao umerudi')} · ${S.queue.length} ${T('waiting sales synced in order','mauzo yaliyosubiri yamesawazishwa kwa mpangilio')}`]);S.queue=[]}else S.feed.unshift([t,S.net?T('Back online','Mtandao umerudi'):T('Internet lost · till keeps selling from its own copy','Intaneti imekatika · mauzo yanaendelea kutoka nakala ya kifaa')]);paintTry()}

/* film */
function filmOpen(start){filmClose();const N=SALE.length,D=8000;let i=start||0,t0=0,paused=false,raf=0,el=0;
 const ov=document.createElement('div');ov.className='e1f on';ov.setAttribute('role','dialog');ov.setAttribute('aria-label',T('The engine in motion','Injini ikifanya kazi'));
 ov.innerHTML=SALE.map(s=>`<img src="${IM(s.img)}" alt="">`).join('')+`<div class="vg"></div><div class="top"><span>Afya Basics · ${T('The engine in motion','Injini ikifanya kazi')}</span><div><button type="button" data-f="snd">${T('Sound off','Zima sauti')}</button><button type="button" data-f="pp">${T('Pause','Simamisha')}</button><button type="button" data-f="x">${T('Close','Funga')} ✕</button></div></div><div class="tx"></div><div class="bar">${SALE.map((s,k)=>`<button type="button" data-f="go" data-k="${k}" aria-label="${E(L(s.h))}"><i><b></b></i></button>`).join('')}</div>`;
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

function init41(){const root=document.getElementById('e1');if(!root)return;
 TSS=JSON.parse(JSON.stringify(TS0));TILL.forEach(p=>TSS.stock[p.id]=p.st);paintTry();addEventListener('resize',fitDb);
 // reveal
 if(e1io)e1io.disconnect();const rv=root.querySelectorAll('.rv');
 if('IntersectionObserver' in window){e1io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');e1io.unobserve(en.target)}}),{rootMargin:'0px 0px -6% 0px'});rv.forEach(x=>e1io.observe(x))}else rv.forEach(x=>x.classList.add('in'));
 // chapter bar
 if(e1co)e1co.disconnect();const links=[...root.querySelectorAll('.cbar a')];
 e1co=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){links.forEach(a=>a.classList.toggle('on',a.dataset.jump===en.target.id));const on=root.querySelector('.cbar a.on');if(on&&on.scrollIntoView){const bar=on.parentElement;bar.scrollTo({left:on.offsetLeft-bar.clientWidth/3,behavior:'smooth'})}}}),{rootMargin:'-45% 0px -50% 0px'});
 CH.forEach(c=>{const s=document.getElementById(c[0]);if(s)e1co.observe(s)});
 // sale steps
 if(e1so)e1so.disconnect();const stg=document.getElementById('e1stg'),imgs=stg?stg.querySelectorAll('img'):[],pg=stg?stg.querySelectorAll('.pg span'):[],steps=root.querySelectorAll('.stp');
 const setStep=i=>{imgs.forEach((m,j)=>m.classList.toggle('on',j===i));pg.forEach((m,j)=>m.classList.toggle('on',j<=i));steps.forEach((s,j)=>s.classList.toggle('on',j===i));const c=document.getElementById('e1clk'),l=document.getElementById('e1lg');if(c)c.textContent=L(SALE[i].t);if(l)l.innerHTML=L(SALE[i].w).map(x=>`<i>›</i> ${E(x)}`).join('<br>')};
 e1so=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting)setStep(+en.target.dataset.i)}),{rootMargin:'-45% 0px -45% 0px'});steps.forEach(s=>e1so.observe(s));
 // clicks
 root.addEventListener('click',e=>{
  const j=e.target.closest('[data-jump]');if(j){e.preventDefault();const t=document.getElementById(j.dataset.jump);if(t)scrollTo({top:t.getBoundingClientRect().top+scrollY-50,behavior:'smooth'});return}
  const dp=e.target.closest('[data-deep]');if(dp){openDeep(dp.dataset.deep);return}
  const f=e.target.closest('[data-film]');if(f){filmOpen(+f.dataset.film||0);return}
  const ly=e.target.closest('.lyr>button');if(ly){const L2=ly.parentElement,o=!L2.classList.contains('op2');L2.classList.toggle('op2',o);ly.setAttribute('aria-expanded',o);return}
  const dv=e.target.closest('[data-dev]');if(dv){const i=+dv.dataset.dev;root.querySelectorAll('[data-dev]').forEach(b=>b.classList.toggle('on',+b.dataset.dev===i));const c=document.getElementById('e1dc');c.innerHTML=devCard(i);if(dv.classList.contains('hs')&&innerWidth<980)c.scrollIntoView({behavior:'smooth',block:'center'});return}
  const md=e.target.closest('[data-mod]');if(md){const i=+md.dataset.mod;root.querySelectorAll('[data-mod]').forEach(b=>b.classList.toggle('on',+b.dataset.mod===i));document.getElementById('e1md').innerHTML=modCard(i);if(innerWidth<980)document.getElementById('e1md').scrollIntoView({behavior:'smooth',block:'start'});return}
  const ad=e.target.closest('[data-add]');if(ad){const id=+ad.dataset.add;TSS.cart[id]=(TSS.cart[id]||0)+1;paintTry();return}
  if(e.target.closest('[data-charge]')){charge();return}
  if(e.target.closest('[data-net]')){toggleNet();return}
  const tb=e.target.closest('[data-tab]');if(tb){TSS.tab=tb.dataset.tab;paintTry();return}
  const sc=e.target.closest('[data-sc]');if(sc){TSS.sc=sc.dataset.sc;paintTry();return}
  if(e.target.closest('[data-appr]')){TSS.approved=1;TSS.po={};TSS.alerts=TSS.alerts.map(a=>['ok',a[1]]);paintTry();return}
  const ro=e.target.closest('[data-role]');if(ro){const i=+ro.dataset.role,was=ro.classList.contains('on');root.querySelectorAll('[data-role]').forEach(b=>b.classList.toggle('on',!was&&+b.dataset.role===i));root.querySelectorAll('.atab tr[data-r]').forEach(r=>{r.classList.toggle('dim',!was&&+r.dataset.r!==i);r.classList.toggle('hi',!was&&+r.dataset.r===i)});document.getElementById('e1rx').textContent=was?T('Every role is designed around the least it needs to know.','Kila jukumu limeundwa kuzunguka kiwango kidogo zaidi linachohitaji kujua.'):L(ROLEX[i]);return}
  const yr=e.target.closest('[data-yr]');if(yr){const i=+yr.dataset.yr;root.querySelectorAll('[data-yr]').forEach(b=>b.classList.toggle('on',+b.dataset.yr===i));document.getElementById('e1yd').innerHTML=yearCard(i);return}
 });
 addEventListener('afya:leave',()=>{filmClose();closeDeep();removeEventListener('resize',fitDb);[e1io,e1so,e1co].forEach(o=>o&&o.disconnect())},{once:true})}
window.SECTIONS['s4-1']={render:render41,init:init41};
})();
