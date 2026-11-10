/* 2.2 The brand · v2 on the D2 template.
   Documents the two palettes of brief C1: the bright customer brand (warm white, Afya Green, soft grey, gold: the store,
   the app and the box) and the dark investor showroom (the nine C2 tokens). Customer colours appear only inside
   swatch panels (class ab-swatch), which are documentation, never UI chrome. Care Zones are listed without colours (C2).
   The box is the locked E1 design (D-2). Brand costs are read from MODEL and follow the funding switch (B5).
   "We are / We are not" moved here from 2.1 (K1.27). Every visible string goes through T(en,sw) (B8). */
(function(){
'use strict';
const A=()=>window.AB,T=(e,s)=>A().T(e,s),E=s=>A().E(s),L=(e,s)=>E(T(e,s));
const lang=()=>window.AFYA_LANG==='sw'?'sw':'en';
const pct=x=>Math.round(x*1000)/10+'%';
const est=()=>`<span class="ab-est">${L('estimate','makadirio')}</span>`;
const CHK='10 Nov 2026';

/* ---------- sources (numbered in this order) ---------- */
const SRC=()=>[
 {t:T('Daily News, 10 September 2026: TMDA moves to destroy TSh 300 million of unregistered medical products seized in Dar es Salaam','Daily News, 10 Septemba 2026: TMDA kuteketeza bidhaa za tiba zisizosajiliwa zenye thamani ya TSh milioni 300 zilizokamatwa Dar es Salaam'),u:'https://dailynews.co.tz/?p=160552',chk:CHK},
 {t:T('Tanzania Medicines and Medical Devices Act, consolidated text (ss. 5, 22, 56, 73): registration, labelling and import permits','Sheria ya Dawa na Vifaa Tiba Tanzania, maandishi yaliyounganishwa (vif. 5, 22, 56, 73): usajili, uwekaji wa lebo na vibali vya kuingiza'),u:'https://www.tanzanialaws.com/?p=1215',chk:CHK},
 {t:T('Finance Act No. 8 of 2019 (in force 1 July 2019): cosmetics and food move to TBS; TMDA keeps medicines and medical devices','Sheria ya Fedha Na. 8 ya 2019 (ilianza 1 Julai 2019): vipodozi na chakula vinahamia TBS; TMDA inabaki na dawa na vifaa tiba'),u:'https://www.tmda.go.tz/uploads/1678774965-8.%20THE%20FINANCE%20ACT,%202019%20,%20Act%20NO.%208-.pdf',chk:CHK},
 {t:T('W3C, Understanding WCAG 2.1 Success Criterion 1.4.3: Contrast (Minimum): 4.5:1 for normal text, 3:1 for large text','W3C, Kuelewa kigezo cha WCAG 2.1 namba 1.4.3: Utofauti (kiwango cha chini): 4.5:1 kwa maandishi ya kawaida, 3:1 kwa maandishi makubwa'),u:'https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html',chk:CHK},
 {t:T('Google Fonts: Sora, open licence (SIL Open Font License 1.1)','Google Fonts: Sora, leseni huria (SIL Open Font License 1.1)'),u:'https://fonts.google.com/specimen/Sora',chk:CHK},
 {t:T('Afya Basics financial model v1.2, base case (planning estimates)','Modeli ya fedha ya Afya Basics v1.2, hali ya msingi (makadirio ya mipango)'),u:''}];
const cite=n=>`<sup><a href="#abSrc" class="ab-cite" aria-label="${L('Source','Chanzo')} ${n}">${n}</a></sup>`;

/* ---------- the customer palette (C1): documentation swatches only ---------- */
const CUST=[
 {k:'ww',hex:'#FAF7F0',n:['Warm White','Nyeupe ya Joto'],u:['Most of every surface: walls, shelf cards, the app background, the welcome card in the box. Calmer than pure white.','Sehemu kubwa ya kila uso: kuta, kadi za rafu, mandharinyuma ya programu, kadi ya karibu ndani ya boksi. Tulivu kuliko nyeupe tupu.']},
 {k:'gr',hex:'#0F7A52',n:['Afya Green','Kijani cha Afya'],u:['Recognition: the store sign, the app’s main buttons, uniforms, bags and the box itself.','Utambulisho: bango la duka, vitufe vikuu vya programu, sare, mifuko na boksi lenyewe.']},
 {k:'sg',hex:'#E4E9E6',n:['Soft Grey','Kijivu Laini'],u:['Quiet structure: dividers, shelf rails, receipts, disabled states.','Mpangilio tulivu: mistari ya kutenganisha, reli za rafu, risiti, vitufe visivyotumika.']},
 {k:'go',hex:'#F2C96B',n:['Afya Gold','Dhahabu ya Afya'],u:['The accent: the heartbeat line, the motto, the foil on the box. Never body text on white.','Kionjo: mstari wa mapigo ya moyo, kauli mbiu, rangi ya dhahabu kwenye boksi. Kamwe si maandishi ya kawaida juu ya nyeupe.']}];
const INK='#0B2219'; /* the customer brand's text ink on light surfaces (shown inside swatches only) */
const lum=h=>{const c=h.replace('#','');return [0,2,4].map(i=>parseInt(c.substr(i,2),16)/255).map(v=>v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)).reduce((a,v,i)=>a+v*[0.2126,0.7152,0.0722][i],0)};
const cr=(a,b)=>{const x=lum(a),y=lum(b);return (Math.max(x,y)+0.05)/(Math.min(x,y)+0.05)};
const grade=r=>r>=4.5?T('passes for all text','inafaa kwa maandishi yote'):r>=3?T('large text only','maandishi makubwa tu'):T('decoration only, never text','mapambo tu, kamwe si maandishi');
/* text pairs documented on each swatch: [text colour, label] */
const PAIRS={ww:[[CUST[1].hex,['Afya Green text','Maandishi ya kijani cha Afya']],[INK,['Ink text','Maandishi ya wino']]],
 gr:[[CUST[0].hex,['Warm white text','Maandishi meupe ya joto']],[CUST[3].hex,['Gold text','Maandishi ya dhahabu']]],
 sg:[[INK,['Ink text','Maandishi ya wino']],[CUST[1].hex,['Afya Green text','Maandishi ya kijani cha Afya']]],
 go:[[INK,['Ink text','Maandishi ya wino']],[CUST[0].hex,['Warm white text','Maandishi meupe ya joto']]]};
const PROP=[[55,'#FAF7F0',INK,['warm white','nyeupe ya joto']],[25,'#0F7A52','#FAF7F0',['green','kijani']],[12,'#E4E9E6',INK,['grey','kijivu']],[5,INK,'#FAF7F0',['ink','wino']],[3,'#F2C96B',INK,['gold','dhahabu']]];

/* ---------- the investor showroom tokens (C2) ---------- */
const TOK=[['--bg','#000000',['Page background','Mandharinyuma ya ukurasa']],['--surface','#0A0A0A',['Cards, tables, panels','Kadi, majedwali, paneli']],['--line','#262626',['Hairlines and borders','Mistari myembamba na mipaka']],
 ['--ink','#F2F0EA',['Body text','Maandishi ya kawaida']],['--mute','#8E8C85',['Secondary text and captions','Maandishi ya pili na maelezo ya picha']],['--green','#0E6B3A',['Royal green: buttons, active states, brand surfaces','Kijani cha kifalme: vitufe, hali zinazotumika, nyuso za chapa']],
 ['--green-deep','#083F23',['Shadow side of green, active tabs','Upande wa kivuli wa kijani, vichupo vinavyotumika']],['--green-edge','#15934F',['Wordmark accent, focus rings on green','Kionjo cha jina, mviringo wa kuonyesha uteuzi juu ya kijani']],['--gold','#C9A227',['Prices, key figures, the section number','Bei, takwimu kuu, namba ya sehemu']]];

/* ---------- positioning (moved from 2.1) ---------- */
const POS=()=>{const I=window.MODEL.inputs;return [
 [['A brand-led health-essentials store with a membership engine','Duka la bidhaa za afya linaloongozwa na chapa, lenye injini ya uanachama'],['The Afya Box makes repeat care the heart of the business; the store is where trust starts.','Afya Box inaifanya huduma ya kurudia kuwa kiini cha biashara; duka ndipo imani inapoanzia.'],['A traditional pharmacy','Duka la dawa la kawaida']],
 [['Curated: fewer, better products sorted by need','Imechaguliwa kwa makini: bidhaa chache na bora, zimepangwa kwa mahitaji'],[`${I.care_zones.length} Care Zones, ${I.brands_per_item} brands for each item in one price range, and a clear “best for” line on every shelf card.`,`Kanda ${I.care_zones.length} za Huduma, chapa ${I.brands_per_item} kwa kila bidhaa katika kiwango kimoja cha bei, na mstari wazi wa “inafaa kwa” kwenye kila kadi ya rafu.`],['A supermarket aisle of everything','Njia ya supamaketi yenye kila kitu']],
 [['Fast, digital, self-service where possible','Haraka, kidijitali, kujihudumia inapowezekana'],['Scan-and-go, self-checkout or the adviser’s handheld till; receipts by text message or WhatsApp.','Skani-na-uende, kujilipia mwenyewe au mashine ya mkononi ya mshauri; risiti kwa ujumbe mfupi au WhatsApp.'],['A queue at a counter','Foleni kaunta']],
 [['Advice-led staff: health advisers','Wafanyakazi wanaoongozwa na ushauri: washauri wa afya'],['The store lead is preferably a physiotherapy graduate; advisers explain readings and refer to a clinic when needed.','Msimamizi wa duka ni vyema awe mhitimu wa fiziotherapia; washauri wanaeleza vipimo na kumpeleka mteja kliniki inapohitajika.'],['Cashiers','Watunza fedha tu']],
 [['One honest price','Bei moja ya haki'],['The same printed price in store, in the app and on WhatsApp, on digital shelf labels.','Bei ileile iliyochapishwa dukani, kwenye programu na WhatsApp, kwenye lebo za kidijitali za rafu.'],['Haggling or hidden mark-ups','Kupatana bei au nyongeza zilizofichwa']],
 [['Customer-funded: every cost is recovered in a price the customer pays','Inalipiwa na mteja: kila gharama inarudishwa kwenye bei anayolipa mteja'],['Packing and delivery are charged at cost inside the box price; the delivery fee covers the rider.','Upakiaji na usafirishaji vinatozwa kwa gharama halisi ndani ya bei ya boksi; ada ya usafirishaji inalipia msafirishaji.'],['A business that relies on discounts or subsidies','Biashara inayotegemea punguzo au ruzuku']]]};

/* ---------- tone of voice (examples shown in the page language only) ---------- */
const VOICE=[
 [['Warm','Ukarimu'],['We speak like a trusted neighbour who knows health.','Tunaongea kama jirani anayeaminika anayejua mambo ya afya.'],['Welcome back, Mama Neema. Your box is on its way.','Karibu tena, Mama Neema. Boksi lako liko njiani.'],['Dear valued customer, your order has been dispatched.','Mpendwa mteja wetu wa thamani, oda yako imesafirishwa.']],
 [['Clear','Uwazi'],['Short sentences, one idea each, the important thing first.','Sentensi fupi, wazo moja kila moja, jambo muhimu kwanza.'],['Swap a brand by 18 November. After that, the box is packed.','Badilisha chapa kabla ya tarehe 18 Novemba. Baada ya hapo, boksi linapakiwa.'],['Modifications are subject to cut-off timelines as per policy.','Marekebisho yanategemea muda wa mwisho kwa mujibu wa sera.']],
 [['Respectful','Heshima'],['Adults are spoken to as adults, in their language, without judgement.','Watu wazima wanazungumzwa kama watu wazima, kwa lugha yao, bila kuhukumiwa.'],['Your reading is higher than usual. Shall we explain what it means?','Kipimo chako kiko juu kuliko kawaida. Tukueleze maana yake?'],['Warning: your blood pressure is dangerous.','Onyo: shinikizo lako la damu ni hatari.']],
 [['Never alarming','Bila kutisha'],['Health is serious, so the tone stays calm. We refer to a clinic; we never diagnose.','Afya ni jambo zito, hivyo sauti yetu inabaki tulivu. Tunampeleka mteja kliniki; hatutambui magonjwa.'],['It is a good idea to see a clinic this week. We can suggest one nearby.','Ni vyema uende kliniki wiki hii. Tunaweza kukupendekezea iliyo karibu.'],['You may have hypertension. Buy this monitor now.','Huenda una shinikizo la juu la damu. Nunua kipimo hiki sasa.']]];
const EX=[
 [['Shelf card','Kadi ya rafu'],['Upper-arm blood pressure monitor. Best for: daily checks at home for adults. Four brands, one price range. Not sure which? Ask an adviser for a free check.','Kipimo cha shinikizo la damu (mkono wa juu). Inafaa kwa: vipimo vya kila siku nyumbani kwa watu wazima. Chapa nne, kiwango kimoja cha bei. Huna uhakika? Muulize mshauri akupime bure.'],['Name first, then who it is for, then help. No technical specifications on the front.','Jina kwanza, kisha inamfaa nani, kisha msaada. Hakuna maelezo ya kiufundi upande wa mbele.']],
 [['Text message reminder','Ujumbe mfupi wa ukumbusho'],['Hello Amina. Your Mama na Mtoto box arrives on Friday. Want to swap a brand? You have 12 days. Reply SWAP or open the app. Afya Basics','Habari Amina. Boksi lako la Mama na Mtoto litafika Ijumaa. Unataka kubadilisha chapa? Una siku 12. Jibu BADILISHA au fungua programu. Afya Basics'],['Under 160 characters, one action, a reply word in the customer’s own language.','Chini ya herufi 160, hatua moja, neno la kujibu katika lugha ya mteja mwenyewe.']],
 [['WhatsApp reply','Jibu la WhatsApp'],['Yes, we have test strips that fit your meter, at the same price as in the store. Shall we deliver today? Orders paid before 15:00 arrive the same day in Dar es Salaam.','Ndiyo, tuna vipande vya kupimia vinavyoendana na kipimo chako, kwa bei ileile ya dukani. Tukuletee leo? Oda zinazolipwa kabla ya saa tisa alasiri zinafika siku hiyohiyo Dar es Salaam.'],['Answer the question, confirm the honest price, offer the next step.','Jibu swali, thibitisha bei ya haki, pendekeza hatua inayofuata.']],
 [['Receipt footer','Sehemu ya chini ya risiti'],['Thank you for shopping with us. Your TRA receipt is saved in your account. Your next free Afya Check: any time you pass.','Asante kwa kununua kwetu. Risiti yako ya TRA imehifadhiwa kwenye akaunti yako. Afya Check yako ijayo ya bure: wakati wowote utakapopita.'],['Thanks, proof, an invitation back. The Kiswahili motto closes every receipt. Never an upsell on a receipt.','Shukrani, uthibitisho, mwaliko wa kurudi. Kauli mbiu ya Kiswahili inafunga kila risiti. Kamwe hakuna kushawishi ununuzi zaidi kwenye risiti.']]];

/* ---------- the customer charter: ten promises, each with a measure ---------- */
const CHARTER=[
 [['Registered products only','Bidhaa zilizosajiliwa tu'],['Every regulated product is registered with its regulator before it reaches a shelf: TBS for cosmetics and food, TMDA for medical devices. Medicines are sold only by the licensed partner pharmacy.','Kila bidhaa inayodhibitiwa imesajiliwa na mdhibiti wake kabla ya kufika rafuni: TBS kwa vipodozi na chakula, TMDA kwa vifaa tiba. Dawa zinauzwa na famasia mshirika yenye leseni pekee.'],['Measured: every regulated line checked at goods-in','Kipimo: kila bidhaa inayodhibitiwa inakaguliwa inapopokelewa']],
 [['One honest price, everywhere','Bei moja ya haki, kila mahali'],['The price on the shelf label is the price in the app, on WhatsApp and in the box. No haggling, and no special prices for some.','Bei kwenye lebo ya rafu ndiyo bei kwenye programu, WhatsApp na ndani ya boksi. Hakuna kupatana bei, wala bei maalum kwa baadhi ya watu.'],['Measured: no price differences between channels','Kipimo: hakuna tofauti ya bei kati ya njia za mauzo']],
 [['A free check, never pressure','Kipimo cha bure, bila shinikizo'],['The Afya Check is free whether you buy or not. Advisers explain your reading; if it needs a doctor, they tell you so.','Afya Check ni bure ukinunua au usiponunua. Washauri wanaeleza kipimo chako; kikihitaji daktari, wanakuambia hivyo.'],['Measured: sales after a check are tracked, never set as a target for an adviser','Kipimo: mauzo baada ya kipimo yanafuatiliwa, kamwe hayawekwi kama lengo la mshauri']],
 [['Advice in plain words','Ushauri kwa lugha rahisi'],['In Kiswahili or English, without jargon. If we do not know, we say so and find out.','Kwa Kiswahili au Kiingereza, bila maneno magumu. Tusipojua, tunasema hivyo na kutafuta jibu.'],['Measured: every adviser certified in training','Kipimo: kila mshauri amethibitishwa kwenye mafunzo']],
 [['Pay in seconds','Lipa kwa sekunde'],['Mobile money, card or cash in under 30 seconds, with the TRA receipt sent by text message or WhatsApp.','Pesa ya simu, kadi au taslimu chini ya sekunde 30, na risiti ya TRA inatumwa kwa ujumbe mfupi au WhatsApp.'],['Measured: average payment time per till','Kipimo: wastani wa muda wa kulipa kwa kila kaunta']],
 [['Same day, or we tell you why','Siku hiyohiyo, au tunakueleza sababu'],['Orders paid before 15:00 in Dar es Salaam arrive the same day. If a delivery will be late, you hear it from us first.','Oda zinazolipwa kabla ya saa tisa alasiri Dar es Salaam zinafika siku hiyohiyo. Usafirishaji ukichelewa, utasikia kutoka kwetu kwanza.'],['Measured: share of deliveries on time','Kipimo: sehemu ya usafirishaji unaofika kwa wakati']],
 [['Before you run out','Kabla hujaishiwa'],['Your Afya Box arrives on its date. You can keep it as planned or swap brands up to 12 days before the month ends.','Afya Box yako inafika tarehe yake. Unaweza kuibakiza kama ilivyopangwa au kubadilisha chapa hadi siku 12 kabla mwezi haujaisha.'],['Measured: boxes delivered on the planned day','Kipimo: maboksi yanayofika siku iliyopangwa']],
 [['Your data is yours','Taarifa zako ni zako'],['Readings and purchases are shared with no one without your consent, not even with family abroad.','Vipimo na manunuzi havishirikishwi kwa mtu yeyote bila ridhaa yako, hata kwa familia iliyo nje ya nchi.'],['Measured: consent recorded for every shared reading','Kipimo: ridhaa imerekodiwa kwa kila kipimo kinachoshirikishwa']],
 [['Written warranty and aftercare','Dhamana ya maandishi na huduma baada ya mauzo'],['Every device comes with a written warranty and a named adviser to call if something goes wrong.','Kila kifaa kinakuja na dhamana ya maandishi na mshauri mwenye jina wa kumpigia simu kitu kikiharibika.'],['Measured: warranty claims closed on time','Kipimo: madai ya dhamana yanayofungwa kwa wakati']],
 [['A quick answer','Jibu la haraka'],['On WhatsApp we answer within 5 minutes during opening hours; every complaint gets a reply the same day.','Kwenye WhatsApp tunajibu ndani ya dakika 5 wakati wa saa za kazi; kila lalamiko linajibiwa siku hiyohiyo.'],['Measured: typical time to the first WhatsApp reply','Kipimo: muda wa kawaida hadi jibu la kwanza la WhatsApp']]];

/* ---------- branded items (concept mock-ups, product only; m-rider shows a jacket on a stand) ---------- */
const MCAT=[['all','All','Vyote'],['cl','Clothing','Mavazi'],['pr','Print','Machapisho'],['ev','Everyday','Vya kila siku'],['sd','Store and delivery','Duka na usafirishaji']];
const MERCH=[
 ['polo','cl',['Adviser polo','Polo ya mshauri'],['Royal-green piqué with the mark embroidered on the chest. The store uniform: approachable and clean, never a white coat.','Polo ya kijani yenye nembo iliyoshonwa kifuani. Sare ya dukani: rafiki na safi, kamwe si koti jeupe la hospitali.']],
 ['tee-black','cl',['Founder T-shirt, black','Fulana ya mwanzilishi, nyeusi'],['Heavy cotton with the primary lockup and the motto. Worn at launch events, investor visits and on opening day.','Pamba nzito yenye nembo kuu na kauli mbiu. Inavaliwa kwenye uzinduzi, ziara za wawekezaji na siku ya ufunguzi.']],
 ['tee-white','cl',['Team T-shirt, white','Fulana ya timu, nyeupe'],['The same lockup in Afya Green on white: the everyday version for the team and community health days.','Nembo ileile kwa kijani cha Afya juu ya nyeupe: toleo la kila siku kwa timu na siku za afya za jamii.']],
 ['hoodie','cl',['Founder hoodie','Hoodie ya mwanzilishi'],['Black fleece with the primary lockup on the chest. A small run for the founding team and the first partners.','Hoodie nyeusi yenye nembo kuu kifuani. Idadi ndogo kwa timu ya waanzilishi na washirika wa kwanza.']],
 ['cap','cl',['Cap','Kofia'],['Green twill with the embroidered mark, for outdoor Afya Check days and events.','Kofia ya kijani yenye nembo iliyoshonwa, kwa siku za Afya Check za nje na matukio.']],
 ['brochure','pr',['Gatefold brochure','Brosha ya kukunjwa'],['Three panels: the Afya Box on the cover, the promise inside and reasons to join on the flap. Handed out at the counter and at health days.','Kurasa tatu: Afya Box mbele, ahadi ndani na sababu za kujiunga pembeni. Zinatolewa kaunta na kwenye siku za afya.']],
 ['cards','pr',['Business cards','Kadi za biashara'],['Gold-foil mark and wordmark on green board; name, role and contact on warm white on the back.','Nembo na jina kwa dhahabu juu ya kadi ya kijani; jina, cheo na mawasiliano juu ya nyeupe ya joto upande wa nyuma.']],
 ['letter','pr',['Letterhead and envelope','Barua rasmi na bahasha'],['Horizontal lockup and address, for supplier, licence and investor letters.','Nembo ya mlalo na anwani, kwa barua za wasambazaji, leseni na wawekezaji.']],
 ['insert','pr',['Afya Box welcome card','Kadi ya karibu ya Afya Box'],['The first thing a family reads when it opens its first box: what is inside, how to change it, and the motto.','Kitu cha kwanza familia inasoma inapofungua boksi lake la kwanza: kilichomo, jinsi ya kubadilisha, na kauli mbiu.']],
 ['mug','ev',['Mug','Kikombe'],['White ceramic with the horizontal lockup, for the team, partners and loyal members.','Kikombe cheupe chenye nembo ya mlalo, kwa timu, washirika na wanachama waaminifu.']],
 ['bottle','ev',['Water bottle','Chupa ya maji'],['Insulated steel bottle in Afya Green with the mark, for advisers on long shifts and for riders.','Chupa ya chuma ya kijani yenye nembo, kwa washauri wa zamu ndefu na wasafirishaji.']],
 ['tote','ev',['Tote bag','Mkoba wa kitambaa'],['Natural canvas with the primary lockup: a reusable bag for shopping and health days.','Mkoba wa turubai wenye nembo kuu: wa kutumia tena kwa manunuzi na siku za afya.']],
 ['notebook','ev',['Notebook','Daftari'],['Green linen cover with the gold-foil lockup, for founders, advisers and partner meetings.','Jalada la kijani lenye nembo ya dhahabu, kwa waanzilishi, washauri na mikutano ya washirika.']],
 ['bag','sd',['Shopping bag','Mfuko wa duka'],['Green paper bag with the gold-foil lockup and rope handles: every purchase leaves the store as a small advert.','Mfuko wa karatasi wa kijani wenye nembo ya dhahabu na kamba za kushika: kila manunuzi yanatoka dukani kama tangazo dogo.']],
 ['rider','sd',['Rider jacket and delivery case','Jaketi la msafirishaji na sanduku la usafirishaji'],['Green jacket with reflective strips and the lockup on the back; an insulated case with the horizontal lockup.','Jaketi la kijani lenye vipande vya kuakisi mwanga na nembo mgongoni; sanduku linalohifadhi joto lenye nembo ya mlalo.']],
 ['badge','sd',['Staff ID badge','Kitambulisho cha mfanyakazi'],['Name, role and mark on a green lanyard, so every customer knows who is advising them.','Jina, cheo na nembo kwenye utepe wa kijani, ili kila mteja ajue nani anamshauri.']]];

const CSS=`
.s22 figure{margin:0}
.s22 figcaption,.s22 .s22-cap{margin-top:var(--s1);color:var(--mute);font-size:var(--fs-cap);max-width:var(--measure)}
.s22 .ab-block p,.s22 .ab-body p{max-width:var(--measure)}
.s22 .ab-block>h2+*{margin-top:var(--s2)}
.s22 .ab-block>*+p,.s22 .ab-block>*+.ab-tw,.s22 .ab-block>*+ul,.s22 .ab-block>*+ol,.s22 .ab-block>*+div{margin-top:var(--s2)}
.s22 h3{font-size:var(--fs-sub);font-weight:600}
.s22 .s22-two{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:var(--s2)}
.s22 .s22-pan{padding:var(--s3);border:1px solid var(--line);min-height:100%}
.s22 .s22-pan h3{margin:0!important;font-size:var(--fs-body)}
.s22 .s22-pan .s22-who{font-size:var(--fs-cap);margin-top:4px}
.s22 .ab-swatch.s22-pan{border-color:#E4E9E6}
.s22 .s22-board{background:#FAF7F0;color:#0B2219}
.s22 .s22-board .s22-who{color:#0F7A52}
.s22 .s22-board img{display:block;width:min(260px,70%);height:auto;margin:var(--s2) 0}
.s22 .s22-chips{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
.s22 .s22-chips span{display:block;height:56px;border:1px solid #E4E9E6}
.s22 .s22-chips small{display:block;font-size:11px;margin-top:4px;color:#0B2219;line-height:1.3}
.s22 .s22-dark{background:var(--bg)}
.s22 .s22-tokg{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-top:var(--s2)}
.s22 .s22-tokg span{display:block;height:44px;border:1px solid var(--line)}
.s22 .s22-tokg small{display:block;font-size:11px;margin-top:4px;color:var(--mute)}
.s22 .s22-sw{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:var(--s2)}
.s22 .s22-swc{padding:var(--s2);border:1px solid #E4E9E6}
.s22 .s22-swc b{display:block;font-weight:600;font-size:var(--fs-body)}
.s22 .s22-swc code{font-size:var(--fs-cap)}
.s22 .ab-body .s22-swc p{font-size:calc(var(--fs-body) - 2px);margin:8px 0 0;color:inherit}
.s22 .s22-swc ul{list-style:none;margin:10px 0 0;padding:0;font-size:var(--fs-cap)}
.s22 .s22-swc ul li{display:flex;gap:8px;justify-content:space-between;border-top:1px solid currentColor;padding:4px 0;opacity:.95}
.s22 .s22-prop{display:flex;height:56px;margin-top:var(--s2);border:1px solid var(--line)}
.s22 .s22-prop div{display:flex;align-items:flex-end;padding:6px;font-size:11px;line-height:1.2;overflow:hidden;min-width:0}
.s22 .s22-tok td:first-child{width:56px}
.s22 .s22-tok i{display:block;width:40px;height:24px;border:1px solid var(--line)}
.s22 .s22-tok code{color:var(--ink);white-space:nowrap}
.s22 .s22-spec{border-top:1px solid var(--line);margin-top:var(--s2)}
.s22 .s22-spec>div{display:grid;grid-template-columns:200px minmax(0,1fr);gap:var(--s2);padding:var(--s2) 0;border-bottom:1px solid var(--line);align-items:baseline}
.s22 .s22-spec small{color:var(--mute);font-size:var(--fs-cap)}
.s22 .s22-spec .w3{font-weight:300}.s22 .s22-spec .w4{font-weight:400}.s22 .s22-spec .w6{font-weight:600}
.s22 .s22-tab{font-variant-numeric:tabular-nums;color:var(--gold)}
.s22 .s22-marks{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--s2)}
.s22 .s22-mk{padding:var(--s3);display:flex;align-items:center;justify-content:center;aspect-ratio:3/2;border:1px solid var(--line)}
.s22 .s22-mk img{width:100%;height:auto;max-height:100%;object-fit:contain}
.s22 .s22-mk.k{background:var(--bg)}.s22 .s22-mk.g{background:var(--green-deep)}
.s22 .s22-mk.ab-swatch{background:#FAF7F0;border-color:#E4E9E6}
.s22 .s22-photos{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--s2)}
.s22 .s22-photos img,.s22 .s22-box img{display:block;width:100%;height:auto;border:1px solid var(--line)}
.s22 .s22-photos img{aspect-ratio:16/10;object-fit:cover}
.s22 .s22-pos th:first-child,.s22 .s22-pos td:first-child{width:56%}
.s22 .s22-pos td small{display:block;color:var(--mute);font-size:var(--fs-cap);margin-top:4px}
.s22 .s22-voice{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:var(--s2)}
.s22 .s22-vo{border:1px solid var(--line);background:var(--surface);padding:var(--s2)}
.s22 .s22-vo b{font-weight:600}
.s22 .s22-vo p{font-size:calc(var(--fs-body) - 1px);margin:6px 0 0}
.s22 .s22-vo dl{margin:10px 0 0;font-size:calc(var(--fs-body) - 2px)}
.s22 .s22-vo dt{color:var(--mute);font-size:var(--fs-cap);margin-top:8px}
.s22 .s22-vo dd{margin:2px 0 0}
.s22 .s22-vo dd.y{border-left:2px solid var(--green-edge);padding-left:10px}
.s22 .s22-vo dd.n{border-left:2px solid var(--line);padding-left:10px;color:var(--mute);text-decoration:line-through;text-decoration-color:var(--mute)}
.s22 .s22-ex{list-style:none;margin:var(--s2) 0 0;padding:0;border-top:1px solid var(--line)}
.s22 .s22-ex li{display:grid;grid-template-columns:200px minmax(0,1fr);gap:var(--s2);padding:var(--s2) 0;border-bottom:1px solid var(--line)}
.s22 .s22-ex li b{font-weight:600}
.s22 .s22-ex li small{display:block;color:var(--mute);font-size:var(--fs-cap);margin-top:6px}
.s22 .s22-ch{counter-reset:ch;list-style:none;margin:var(--s2) 0 0;padding:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1px;background:var(--line);border:1px solid var(--line)}
.s22 .s22-ch li{background:var(--surface);padding:var(--s2) var(--s2) var(--s2) 52px;position:relative;counter-increment:ch}
.s22 .s22-ch li::before{content:counter(ch);position:absolute;left:var(--s2);top:var(--s2);color:var(--gold);font-weight:600}
.s22 .s22-ch b{font-weight:600;display:block}
.s22 .s22-ch p{margin:6px 0 0;font-size:calc(var(--fs-body) - 1px)}
.s22 .s22-ch small{display:block;margin-top:8px;color:var(--mute);font-size:var(--fs-cap)}
.s22 .s22-box{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:var(--s3);align-items:start}
.s22 .s22-box ul,.s22 ul.s22-ul{margin:0;padding-left:20px}.s22 .s22-box li+li,.s22 ul.s22-ul li+li{margin-top:8px}
.s22 .s22-mg{list-style:none;margin:var(--s2) 0 0;padding:0;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:var(--s2)}
.s22 .s22-mg li[hidden]{display:none}
.s22 .s22-mg img{display:block;width:100%;height:auto;aspect-ratio:1/1;object-fit:cover;border:1px solid var(--line)}
.s22 .s22-mg b{display:block;font-weight:600;margin-top:8px;font-size:calc(var(--fs-body) - 1px)}
.s22 .s22-mg p{margin:4px 0 0;color:var(--mute);font-size:var(--fs-cap)}
.s22 .s22-pil{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--s2)}
.s22 .s22-pil div{border-top:2px solid var(--green-edge);padding-top:var(--s1)}
.s22 .s22-pil b{display:block;font-weight:600}.s22 .s22-pil p{margin:6px 0 0;font-size:calc(var(--fs-body) - 1px)}
.s22 .s22-zones{list-style:none;margin:var(--s2) 0 0;padding:0;display:flex;flex-wrap:wrap;gap:8px}
.s22 .s22-zones li{border:1px solid var(--line);padding:6px 12px;font-size:calc(var(--fs-body) - 2px)}
@media (max-width:860px){
 .s22 .s22-two,.s22 .s22-box{grid-template-columns:1fr}
 .s22 .s22-mg{grid-template-columns:repeat(2,minmax(0,1fr))}
 .s22 .s22-marks,.s22 .s22-photos,.s22 .s22-pil{grid-template-columns:1fr}
 .s22 .s22-voice,.s22 .s22-ch,.s22 .s22-sw{grid-template-columns:1fr}
 .s22 .s22-spec>div,.s22 .s22-ex li{grid-template-columns:1fr;gap:6px}
 .s22 .s22-prop div{font-size:0}
}`;

const ZONES_SW={'Mother & Baby':'Mama na Mtoto','Heart & Diabetes':'Moyo na Kisukari','Mobility & Recovery':'Kutembea na Kupona','First Aid & Home':'Huduma ya Kwanza na Nyumbani','Personal Care':'Usafi na Utunzaji Binafsi','Seniors':'Wazee'};

function custSwatches(){return `<div class="s22-sw">${CUST.map(c=>{const bg=c.hex,fg=c.k==='gr'?CUST[0].hex:INK;
 return `<div class="ab-swatch s22-swc" style="background:${bg};color:${fg}"><b>${L(c.n[0],c.n[1])}</b><code>${c.hex}</code><p>${L(c.u[0],c.u[1])}</p>
  <ul>${PAIRS[c.k].map(p=>{const r=cr(bg,p[0]);return `<li><span>${L(p[1][0],p[1][1])} ${r.toFixed(1)}:1</span><span>${E(grade(r))}</span></li>`}).join('')}</ul></div>`}).join('')}</div>`}

function tokTable(){return `<div class="ab-tw"><table class="ab-t s22-tok"><thead><tr><th><span class="ab-vh">${L('Colour','Rangi')}</span></th><th>${L('Token','Kigezo')}</th><th>${L('Value','Thamani')}</th><th>${L('Used for','Inatumika kwa')}</th></tr></thead><tbody>
 ${TOK.map(t=>`<tr><td><i style="background:var(${t[0]})" aria-hidden="true"></i></td><td><code>${t[0]}</code></td><td><code>${t[1]}</code></td><td>${L(t[2][0],t[2][1])}</td></tr>`).join('')}</tbody></table></div>`}

function costFigs(){const I=window.MODEL.inputs,use=I.seed.use,om=I.opex_month,lean=A().isLean();
 const opexM=Object.values(om).reduce((a,b)=>a+b,0),launch=(use.find(x=>/marketing/i.test(x[0]))||[0,0])[1],fit=(use.find(x=>/fit-out/i.test(x[0]))||[0,0])[1];
 const src=L('Financial model v1.2, base case','Modeli ya fedha v1.2, hali ya msingi');
 return A().figsHTML([
  {v:`${A().numHTML('s22-launch',launch,'tsh')} ${est()}`,l:T('Launch marketing, from the seed round','Masoko ya uzinduzi, kutoka mtaji wa awali'),s:src},
  {v:`${A().numHTML('s22-mkt',om.marketing,'tsh')} ${est()}`,l:T('Marketing each month, store one','Masoko kila mwezi, duka la kwanza'),s:L(`${pct(om.marketing/opexM)} of monthly running costs`,`${pct(om.marketing/opexM)} ya gharama za uendeshaji za mwezi`)},
  {v:`${A().numHTML('s22-pack',om.packaging_misc,'tsh')} ${est()}`,l:T('Packaging and sundries each month: bags, labels, welcome cards','Vifungashio na vitu vidogo kila mwezi: mifuko, lebo, kadi za karibu'),s:src},
  {v:`${A().numHTML('s22-fit',fit,'tsh')} ${est()}`,l:lean?T('Fit-out and signage, about 100 m² (seed line)','Ukarabati na mabango, takriban m² 100 (mstari wa mtaji wa awali)'):T('Fit-out and signage, 180 m² (seed line)','Ukarabati na mabango, m² 180 (mstari wa mtaji wa awali)'),s:src}])}

function render(s,p,pv,nx){const I=window.MODEL.inputs,lean=A().isLean();
 const zones=I.care_zones.map(z=>`<li>${E(T(z,ZONES_SW[z]||z))}</li>`).join('');
 return `<article class="ab-sec s22" aria-labelledby="h-s2-2"><style>${CSS}</style><div class="ab-wrap">
 <div class="ab-sec-no">${E(s.no)}</div><h1 id="h-s2-2">${E(s.title)}</h1>
 <p class="ab-summary">${L('Afya Basics is calm and bright to its customers: warm white space, one strong green, a touch of gold, and a mark that is a roof over a heart. This section is the brand book. It sets out the two colour palettes and where each one belongs, the type, the photo style, how the brand speaks in Kiswahili and English, the customer charter, the locked box design, the marks and the branded items, and what the brand is and is not.','Afya Basics ni tulivu na angavu kwa wateja wake: nafasi nyeupe ya joto, kijani kimoja imara, mguso wa dhahabu, na nembo ambayo ni paa juu ya moyo. Sehemu hii ni kitabu cha chapa. Inaeleza rangi za aina mbili na mahali kila moja inapotumika, aina ya herufi, mtindo wa picha, jinsi chapa inavyozungumza kwa Kiswahili na Kiingereza, ahadi kwa wateja, muundo wa boksi uliofungwa, nembo na vitu vyenye chapa, na kile chapa ilicho na isicho.')}</p>

 <figure class="ab-visual">
  <div class="s22-two">
   <div class="ab-swatch s22-pan s22-board">
    <h3>${L('The customer brand','Chapa kwa mteja')}</h3><p class="s22-who">${L('The store, the app and the box','Duka, programu na boksi')}</p>
    <img src="img/brand/l-stack-onLight.png" width="914" height="591" loading="lazy" alt="${L('The Afya Basics primary lockup for light backgrounds: a roof over a heart with a heartbeat line, the name Afya Basics and the motto','Nembo kuu ya Afya Basics kwa mandharinyuma angavu: paa juu ya moyo wenye mstari wa mapigo, jina Afya Basics na kauli mbiu')}">
    <div class="s22-chips">${CUST.map(c=>`<div><span style="background:${c.hex}"></span><small>${L(c.n[0],c.n[1])}</small></div>`).join('')}</div>
   </div>
   <div class="s22-pan s22-dark">
    <h3>${L('The investor showroom','Chumba cha maonyesho kwa wawekezaji')}</h3><p class="s22-who ab-mute">${L('This website: nine fixed colours','Tovuti hii: rangi tisa zisizobadilika')}</p>
    <div class="s22-tokg">${TOK.map(t=>`<div><span style="background:var(${t[0]})"></span><small>${E(t[0])}</small></div>`).join('')}</div>
   </div>
  </div>
  <figcaption>${L('Two palettes that must not be confused. Left: the bright customer brand, used on everything a customer sees. Right: the dark showroom in which this plan is presented. The showroom never uses the customer colours outside documentation panels like the one on the left.','Rangi za aina mbili ambazo hazipaswi kuchanganywa. Kushoto: chapa angavu kwa mteja, inayotumika kwenye kila kitu anachokiona mteja. Kulia: chumba cheusi cha maonyesho ambamo mpango huu unawasilishwa. Chumba cha maonyesho hakitumii rangi za mteja nje ya paneli za maelezo kama ile ya kushoto.')}</figcaption>
 </figure>

 <div class="ab-body">
 <section class="ab-block"><h2>${L('Why the brand matters: trust is not visible','Kwa nini chapa ni muhimu: imani haionekani')}</h2>
  <p>${L('Health retail in Dar es Salaam looks much the same everywhere: crowded counters, handwritten prices and green crosses on every street. A customer cannot tell a careful shop from a careless one by looking at it.','Biashara ya bidhaa za afya Dar es Salaam inafanana karibu kila mahali: kaunta zenye msongamano, bei zilizoandikwa kwa mkono na misalaba ya kijani kila mtaa. Mteja hawezi kutofautisha duka makini na lisilo makini kwa kuliangalia tu.')}</p>
  <p>${T(`Unregistered products exploit that sameness. In September 2026 TMDA seized medical products worth about TSh 300 million in Dar es Salaam, noting that their quality, safety and efficacy had not been verified${cite(1)}. The law already provides visible proof: a registered medicine or device carries its registered name and number when it is sold${cite(2)}, and since July 2019 cosmetics and food are registered with TBS rather than TMDA${cite(3)}.`,`Bidhaa zisizosajiliwa zinatumia ufanano huo. Septemba 2026 TMDA ilikamata bidhaa za tiba zenye thamani ya takriban TSh milioni 300 jijini Dar es Salaam, ikieleza kwamba ubora, usalama na ufanisi wake haukuwa umethibitishwa${cite(1)}. Sheria tayari inatoa uthibitisho unaoonekana: dawa au kifaa kilichosajiliwa kinabeba jina na namba yake ya usajili kinapouzwa${cite(2)}, na tangu Julai 2019 vipodozi na chakula vinasajiliwa na TBS badala ya TMDA${cite(3)}.`)}</p>
  <p>${L('A brand is a promise that customers can check. If every Afya touchpoint is calm, consistent and open about prices and registration, customers learn to trust the look itself: in the store, in the app and at the door. That trust is what leads a family to give Afya its monthly health budget.','Chapa ni ahadi ambayo wateja wanaweza kuikagua. Kama kila sehemu ambapo mteja anakutana na Afya ni tulivu, inafanana na iko wazi kuhusu bei na usajili, wateja wanajifunza kuuamini mwonekano wenyewe: dukani, kwenye programu na mlangoni. Imani hiyo ndiyo inayoifanya familia iipe Afya bajeti yake ya afya ya kila mwezi.')}</p>
  <h3>${L('The brand idea','Wazo la chapa')}</h3>
  <p>${L('The motto, always in Kiswahili on the brand’s artwork, says it in four words: your health, at your home. Three pillars turn it into behaviour.','Kauli mbiu, ambayo kila mara iko kwa Kiswahili kwenye kazi za sanaa za chapa, inasema kwa maneno manne: Afya yako, nyumbani kwako. Nguzo tatu zinaigeuza kuwa tabia.')}</p>
  <div class="s22-pil">
   <div><b>${L('Calm, not clinical','Tulivu, si kama hospitali')}</b><p>${L('Warm white space, soft light and one strong green. The store should feel like a modern home, not a hospital corridor.','Nafasi nyeupe ya joto, mwanga laini na kijani kimoja imara. Duka linapaswa kuhisi kama nyumba ya kisasa, si korido ya hospitali.')}</p></div>
   <div><b>${L('Open by design','Wazi kwa muundo wake')}</b><p>${L('One printed price, visible registration details and advice in plain words. Nothing hidden in small print.','Bei moja iliyochapishwa, taarifa za usajili zinazoonekana na ushauri kwa lugha rahisi. Hakuna kilichofichwa kwenye maandishi madogo.')}</p></div>
   <div><b>${L('Fast, with a person on hand','Haraka, na mtu wa kusaidia karibu')}</b><p>${L('Every process is designed to take seconds, and an adviser is always available. Speed never replaces care.','Kila mchakato umeundwa kuchukua sekunde, na mshauri yupo kila wakati. Kasi haichukui nafasi ya huduma.')}</p></div>
  </div>
 </section>

 <section class="ab-block"><h2>${L('What we are, and what we are not','Tulicho, na tusicho')}</h2>
  <p>${L('A position is useful only if it rules things out. Each line below is a decision already taken; the right-hand column is what the business will not become.','Msimamo una manufaa pale tu unapoondoa mambo fulani. Kila mstari hapa chini ni uamuzi ambao tayari umefanywa; safu ya kulia ni kile ambacho biashara haitakuwa.')}</p>
  <div class="ab-tw"><table class="ab-t s22-pos"><thead><tr><th>${L('We are','Sisi ni')}</th><th>${L('We are not','Sisi si')}</th></tr></thead><tbody>
   ${POS().map(r=>`<tr><td><b>${L(r[0][0],r[0][1])}</b><small>${L(r[1][0],r[1][1])}</small></td><td>${L(r[2][0],r[2][1])}</td></tr>`).join('')}</tbody></table></div>
 </section>

 <section class="ab-block"><h2>${L('The mark: a roof over a heart','Nembo: paa juu ya moyo')}</h2>
  <p>${L('The Afya mark is a roof over a heart, with a heartbeat line running through it. In one shape it states what the business does: health care, delivered to the home. It replaces the medical cross, which every pharmacy already uses and no one can own.','Nembo ya Afya ni paa juu ya moyo, na mstari wa mapigo ya moyo ukipita ndani yake. Kwa umbo moja inaeleza kazi ya biashara: huduma ya afya inayofikishwa nyumbani. Inachukua nafasi ya msalaba wa kitabibu, ambao kila duka la dawa tayari linautumia na hakuna anayeweza kuumiliki.')}</p>
  <div class="s22-marks">
   <figure><div class="s22-mk k"><img src="img/brand/l-stack-onDark.png" width="914" height="591" loading="lazy" alt="${L('Primary lockup for dark backgrounds: the mark in green, Afya in white and Basics in green, with the motto in gold','Nembo kuu kwa mandharinyuma meusi: alama kwa kijani, Afya kwa nyeupe na Basics kwa kijani, pamoja na kauli mbiu kwa dhahabu')}"></div><figcaption>${L('Primary lockup, on dark','Nembo kuu, juu ya rangi nzito')}</figcaption></figure>
   <figure><div class="s22-mk ab-swatch"><img src="img/brand/l-stack-onLight.png" width="914" height="591" loading="lazy" alt="${L('Primary lockup for light backgrounds, in Afya Green with the motto in gold','Nembo kuu kwa mandharinyuma angavu, kwa kijani cha Afya na kauli mbiu kwa dhahabu')}"></div><figcaption>${L('Primary lockup, on warm white','Nembo kuu, juu ya nyeupe ya joto')}</figcaption></figure>
   <figure><div class="s22-mk g"><img src="img/brand/l-horiz-gold.png" width="1000" height="234" loading="lazy" alt="${L('Horizontal lockup in gold foil: the mark beside the name Afya Basics, with the motto below','Nembo ya mlalo kwa dhahabu: alama kando ya jina Afya Basics, na kauli mbiu chini yake')}"></div><figcaption>${L('Horizontal, in gold foil for the box, packaging and print','Ya mlalo, kwa dhahabu kwa boksi, vifungashio na uchapishaji')}</figcaption></figure>
  </div>
  <h3>${L('How the mark is built','Jinsi nembo ilivyoundwa')}</h3>
  <ol class="ab-timeline">
   <li><b>${L('The roof','Paa')}</b><span>${L('The home is where Afya delivers: the box, the rider and the reminder. The roof is one open stroke with rounded ends.','Nyumbani ndiko Afya inakofikisha huduma: boksi, msafirishaji na ukumbusho. Paa ni mstari mmoja wazi wenye ncha za mviringo.')}</span></li>
   <li><b>${L('The heart','Moyo')}</b><span>${L('Care and family: the reason a mother, or a son abroad, chooses a monthly box. It sits under the roof, inside the home.','Huduma na familia: sababu mama, au mwana aliye nje ya nchi, anachagua boksi la kila mwezi. Uko chini ya paa, ndani ya nyumba.')}</span></li>
   <li><b>${L('The heartbeat','Mapigo ya moyo')}</b><span>${L('Health that is measured, not guessed: the free Afya Check at the door. It is cut out of the heart, or drawn in gold on light versions, never filled in.','Afya inayopimwa, si kukisiwa: Afya Check ya bure mlangoni. Imekatwa ndani ya moyo, au kuchorwa kwa dhahabu kwenye matoleo angavu, kamwe haijazwi.')}</span></li>
   <li><b>${L('The name','Jina')}</b><span>${L('“Afya Basics” is drawn artwork, never retyped: Afya in white or ink, Basics in Afya Green. Smallest size: the mark at 16 px on screen and 8 mm in print.','“Afya Basics” ni mchoro uliochorwa, kamwe haiandikwi upya kwa kibodi: Afya kwa nyeupe au wino, Basics kwa kijani cha Afya. Ukubwa mdogo zaidi: alama kwa px 16 kwenye skrini na mm 8 kwenye uchapishaji.')}</span></li>
   <li><b>${L('The motto below','Kauli mbiu chini')}</b><span>${L('Set in wide gold capitals under a thin gold rule, always in Kiswahili. It travels with the full lockup and is dropped only on very small uses.','Imeandikwa kwa herufi kubwa za dhahabu zilizotengana chini ya mstari mwembamba wa dhahabu, kila mara kwa Kiswahili. Inaambatana na nembo kamili na inaondolewa tu kwenye matumizi madogo sana.')}</span></li>
  </ol>
  <h3>${L('Why the mark is not a cross','Kwa nini nembo si msalaba')}</h3>
  <p>${L('Crosses hang over thousands of pharmacies, so a cross tells a customer nothing about who is careful. The red cross on white is also a protected emblem under the Geneva Conventions, and Afya never uses one. A roof and a heart can be owned, registered as a trademark, and describe the home-delivery promise that makes Afya different.','Misalaba iko juu ya maelfu ya maduka ya dawa, hivyo msalaba haumwambii mteja chochote kuhusu nani ni makini. Msalaba mwekundu juu ya nyeupe pia ni alama iliyolindwa na Mikataba ya Geneva, na Afya haiutumii kamwe. Paa na moyo vinaweza kumilikiwa, kusajiliwa kama alama ya biashara, na vinaeleza ahadi ya kufikisha nyumbani inayoitofautisha Afya.')}</p>
  <h3>${L('What is never done to the mark','Kisichofanywa kamwe kwa nembo')}</h3>
  <ul class="s22-ul">
   <li>${L('Stretching or squashing it.','Kuivuta au kuibana.')}</li>
   <li>${L('Recolouring it, or setting it in a package or zone colour. The mark is green, white or gold only.','Kuibadilisha rangi, au kuiweka kwa rangi ya kifurushi au kanda. Nembo ni kijani, nyeupe au dhahabu tu.')}</li>
   <li>${L('Adding effects: shadows, glows, outlines or bevels.','Kuongeza madoido: vivuli, mng’ao, mistari ya pembeni au miinuko.')}</li>
   <li>${L('Rotating it, or setting the name in another typeface.','Kuizungusha, au kuandika jina kwa aina nyingine ya herufi.')}</li>
  </ul>
 </section>

 <section class="ab-block"><h2>${L('Colour: two palettes, two jobs','Rangi: rangi za aina mbili, kazi mbili')}</h2>
  <p>${L('The customer brand is bright. Its four colours belong to the store, the app and the box: everything a customer sees, touches or receives. They are shown here as swatches, which is documentation. They are not used in this showroom’s own design.','Chapa kwa mteja ni angavu. Rangi zake nne ni za duka, programu na boksi: kila kitu ambacho mteja anakiona, kukigusa au kukipokea. Zinaonyeshwa hapa kama sampuli za rangi, ambazo ni maelezo tu. Hazitumiki katika muundo wa chumba hiki cha maonyesho.')}</p>
  <h3>${L('Customer brand: store, app and box','Chapa kwa mteja: duka, programu na boksi')}</h3>
  ${custSwatches()}
  <p class="s22-cap">${T(`Each swatch lists the measured contrast of text set on it, against the international accessibility standard: 4.5:1 for normal text, 3:1 for large text${cite(4)}. Text on light surfaces uses the brand’s dark green-black ink.`,`Kila sampuli inaonyesha utofauti uliopimwa wa maandishi yaliyowekwa juu yake, kulingana na kiwango cha kimataifa cha ufikivu: 4.5:1 kwa maandishi ya kawaida, 3:1 kwa maandishi makubwa${cite(4)}. Maandishi juu ya nyuso angavu yanatumia wino wa chapa wa kijani-nyeusi.`)}</p>
  <h3>${L('How much of each','Kiasi cha kila rangi')}</h3>
  <div class="ab-swatch s22-prop" role="img" aria-label="${L('Proportion of use: 55% warm white, 25% Afya Green, 12% soft grey, 5% ink for text, 3% gold','Uwiano wa matumizi: 55% nyeupe ya joto, 25% kijani cha Afya, 12% kijivu laini, 5% wino wa maandishi, 3% dhahabu')}">${PROP.map(x=>`<div style="flex:${x[0]};background:${x[1]};color:${x[2]}">${x[0]}% ${L(x[3][0],x[3][1])}</div>`).join('')}</div>
  <p class="s22-cap">${L('55% warm white, 25% Afya Green, 12% soft grey, 5% ink for text and 3% gold. White space sets the calm, green carries recognition, and gold is used sparingly as an accent.','55% nyeupe ya joto, 25% kijani cha Afya, 12% kijivu laini, 5% wino wa maandishi na 3% dhahabu. Nafasi nyeupe inaleta utulivu, kijani kinabeba utambulisho, na dhahabu inatumika kwa uchache kama kionjo.')}</p>
  <h3>${L('Care Zones: named, not coloured','Kanda za Huduma: zina majina, si rangi')}</h3>
  <p>${L('The store is organised into Care Zones. Each package also carries a small colour sticker on its box. Those category colours exist only on the physical sticker and in product imagery; they are never part of the mark, the app’s main colours or this showroom.','Duka limepangwa katika Kanda za Huduma. Kila kifurushi pia kina kibandiko kidogo cha rangi kwenye boksi lake. Rangi hizo za makundi zipo kwenye kibandiko halisi na kwenye picha za bidhaa tu; kamwe si sehemu ya nembo, rangi kuu za programu wala chumba hiki cha maonyesho.')}</p>
  <ul class="s22-zones">${zones}</ul>
  <h3>${L('Investor showroom: nine tokens','Chumba cha maonyesho kwa wawekezaji: vigezo tisa')}</h3>
  <p>${L('The showroom is black, so that the bright product reads like an object lit in a studio. Nine colours are allowed and no others. Gold is kept for numbers, prices and the section number; green is for brand surfaces and buttons, never for body text.','Chumba cha maonyesho ni cheusi, ili bidhaa angavu ionekane kama kitu kilichomulikwa studio. Rangi tisa zinaruhusiwa na hakuna nyingine. Dhahabu ni ya namba, bei na namba ya sehemu; kijani ni cha nyuso za chapa na vitufe, kamwe si cha maandishi ya kawaida.')}</p>
  ${tokTable()}
 </section>

 <section class="ab-block"><h2>${L('Type: one family, Sora','Herufi: familia moja, Sora')}</h2>
  <p>${T(`One open-licence typeface${cite(5)} is used in three weights, for the showroom and for the brand’s own text: shelf cards, the app, text messages and signs. The drawn name in the logo is artwork and is never retyped. Headings are in sentence case; there are no all-capital labels, apart from the motto in the lockup.`,`Aina moja ya herufi yenye leseni huria${cite(5)} inatumika kwa unene wa aina tatu, kwa chumba cha maonyesho na kwa maandishi ya chapa yenyewe: kadi za rafu, programu, ujumbe mfupi na mabango. Jina lililochorwa kwenye nembo ni kazi ya sanaa na kamwe haliandikwi upya. Vichwa vinaandikwa kwa herufi ndogo isipokuwa herufi ya kwanza; hakuna lebo za herufi kubwa tupu, isipokuwa kauli mbiu kwenye nembo.`)}</p>
  <div class="s22-spec">
   <div><small>${L('Headings · 600','Vichwa · 600')}</small><span class="w6" style="font-size:var(--fs-title);line-height:1.15">${L('Health essentials, without the hunt.','Bidhaa za afya, bila kuhangaika.')}</span></div>
   <div><small>${L('Interface · 400','Kiolesura · 400')}</small><span class="w4" style="font-size:var(--fs-sub)">${L('Swap a brand · Keep my box · Book a check','Badilisha chapa · Baki na boksi langu · Weka miadi ya kipimo')}</span></div>
   <div><small>${L('Body · 300','Maandishi · 300')}</small><span class="w3">${L('Advisers explain every reading in plain words and refer to a clinic when a reading needs a doctor.','Washauri wanaeleza kila kipimo kwa lugha rahisi na kumpeleka mteja kliniki pale kipimo kinapohitaji daktari.')}</span></div>
   <div><small>${L('Figures · tabular','Tarakimu · za safu')}</small><span class="s22-tab" style="font-size:var(--fs-sub)">0123456789 · ${E(I.store.hours.split(',')[0])}</span></div>
  </div>
  <p class="s22-cap">${L('Scale, desktop and phone: display 56/34 px, section title 32/24, sub-heading 22/18, body 17/15, caption 13/12. Body lines stay under 75 characters. Tabular figures give every digit the same width, so prices line up on labels and receipts.','Vipimo, kompyuta na simu: kichwa kikuu px 56/34, kichwa cha sehemu 32/24, kichwa kidogo 22/18, maandishi 17/15, maelezo ya picha 13/12. Mistari ya maandishi inabaki chini ya herufi 75. Tarakimu za safu zinaipa kila tarakimu upana uleule, hivyo bei zinapangika vizuri kwenye lebo na risiti.')}</p>
 </section>

 <section class="ab-block"><h2>${L('Photo style: faceless, warm and real','Mtindo wa picha: bila nyuso, wa joto na halisi')}</h2>
  <p>${L('No faces appear in any Afya image or film: not real people, and not invented ones. People are shown through their hands, their backs or out of frame; otherwise the picture shows a place or a product. Light is warm, soft and studio-like. Concept images are always labelled as such until real photography exists.','Hakuna nyuso zinazoonekana katika picha au filamu yoyote ya Afya: si za watu halisi, wala za watu wa kubuni. Watu wanaonyeshwa kupitia mikono yao, migongo yao au wakiwa nje ya picha; vinginevyo picha inaonyesha mahali au bidhaa. Mwanga ni wa joto, laini na kama wa studio. Picha za dhana zinaandikwa hivyo kila mara hadi picha halisi zitakapopatikana.')}</p>
  <div class="s22-photos">
   <figure><img src="img/interior.webp" width="2400" height="1340" loading="lazy" alt="${L('Concept image: the store interior with oak counters, white walls and green box shelving, with no people','Picha ya dhana: ndani ya duka lenye kaunta za mbao, kuta nyeupe na rafu za maboksi ya kijani, bila watu')}"><figcaption>${L('A place: calm, bright, room to breathe.','Mahali: tulivu, angavu, lenye nafasi.')}</figcaption></figure>
   <figure><img src="img/c-scan.webp" width="2400" height="1350" loading="lazy" alt="${L('Concept image: hands in a green sleeve scanning a carton at goods-in','Picha ya dhana: mikono yenye mkono wa shati la kijani ikiskani katoni wakati wa kupokea mzigo')}"><figcaption>${L('Hands at work: care shown through the task.','Mikono kazini: huduma inaonyeshwa kupitia kazi.')}</figcaption></figure>
   <figure><img src="img/ac-oxi.webp" width="2400" height="1350" loading="lazy" alt="${L('Concept image: a fingertip in the oxygen sensor of the check kiosk','Picha ya dhana: ncha ya kidole ndani ya kihisi cha oksijeni cha kibanda cha vipimo')}"><figcaption>${L('A detail: the free check, close up.','Undani: kipimo cha bure, kwa karibu.')}</figcaption></figure>
  </div>
  <ul class="s22-ul" style="margin-top:var(--s3)">
   <li>${L('No needles, blood or close-ups of illness. Show care and confidence, not fear.','Hakuna sindano, damu wala picha za karibu za ugonjwa. Onyesha huduma na kujiamini, si hofu.')}</li>
   <li>${L('No before-and-after claims. Products are shown as they are, in their real packaging.','Hakuna madai ya kabla na baada. Bidhaa zinaonyeshwa jinsi zilivyo, katika vifungashio vyake halisi.')}</li>
   <li>${L('No red crosses, no glows, no neon and no computer-generated look.','Hakuna misalaba myekundu, mng’ao, rangi za neon wala mwonekano wa picha za kompyuta.')}</li>
   <li>${L('Images of the problem (queues, empty shelves) appear only in investor material, never in Afya advertising.','Picha za tatizo (foleni, rafu tupu) zinaonekana katika nyaraka za wawekezaji tu, kamwe si katika matangazo ya Afya.')}</li>
  </ul>
 </section>

 <section class="ab-block"><h2>${L('Tone of voice','Sauti ya chapa')}</h2>
  <p>${L('The brand speaks Kiswahili first in text messages and WhatsApp, where most customers will meet it, and English where the customer prefers it. The examples below follow the language this page is shown in; switch the page language to read them in the other.','Chapa inazungumza Kiswahili kwanza kwenye ujumbe mfupi na WhatsApp, ambako wateja wengi watakutana nayo, na Kiingereza pale mteja anapopendelea. Mifano iliyo hapa chini inafuata lugha ya ukurasa huu; badilisha lugha ya ukurasa kuisoma kwa lugha nyingine.')}</p>
  <div class="s22-voice">${VOICE.map(v=>`<div class="s22-vo"><b>${L(v[0][0],v[0][1])}</b><p>${L(v[1][0],v[1][1])}</p><dl><dt>${L('We say','Tunasema')}</dt><dd class="y">${L(v[2][0],v[2][1])}</dd><dt>${L('We never say','Hatusemi kamwe')}</dt><dd class="n">${L(v[3][0],v[3][1])}</dd></dl></div>`).join('')}</div>
  <h3>${L('The voice at four touchpoints','Sauti katika sehemu nne za kukutana na mteja')}</h3>
  <ul class="s22-ex">${EX.map(x=>`<li><b>${L(x[0][0],x[0][1])}</b><div>${L(x[1][0],x[1][1])}<small>${L(x[2][0],x[2][1])}</small></div></li>`).join('')}</ul>
 </section>

 <section class="ab-block"><h2>${L('The customer charter: ten promises','Ahadi kwa wateja: ahadi kumi')}</h2>
  <p>${L('The charter hangs at the door, sits in the app and goes out in every member welcome message, in Kiswahili and English. Each promise has a measure, so staff, customers and investors can all check it.','Ahadi hizi zinabandikwa mlangoni, zinapatikana kwenye programu na zinatumwa katika kila ujumbe wa kumkaribisha mwanachama, kwa Kiswahili na Kiingereza. Kila ahadi ina kipimo, ili wafanyakazi, wateja na wawekezaji wote waweze kuikagua.')}</p>
  <ol class="s22-ch">${CHARTER.map(c=>`<li><b>${L(c[0][0],c[0][1])}</b><p>${L(c[1][0],c[1][1])}</p><small>${L(c[2][0],c[2][1])}</small></li>`).join('')}</ol>
 </section>

 <section class="ab-block"><h2>${L('The box: one locked design','Boksi: muundo mmoja uliofungwa')}</h2>
  <div class="s22-box">
   <figure><img src="assets/boxes/mama-na-mtoto-closed.webp" width="1376" height="768" loading="lazy" alt="${L('The Afya Box for Mama na Mtoto: a deep green rigid box with the lid lifted, the gold wordmark and house emblem on the lid and the package name in gold on the side','Afya Box ya Mama na Mtoto: boksi gumu la kijani kizito lenye mfuniko ulioinuliwa, jina na nembo ya nyumba kwa dhahabu juu ya mfuniko na jina la kifurushi kwa dhahabu ubavuni')}"><figcaption>${L('An approved render of the locked design. Concept image.','Picha iliyoidhinishwa ya muundo uliofungwa. Picha ya dhana.')}</figcaption></figure>
   <div>
    <p>${L('Every Afya Box is the same box. Only the name on the side and a small package-colour sticker change from one package to the next.','Kila Afya Box ni boksi lilelile. Ni jina la ubavuni na kibandiko kidogo cha rangi ya kifurushi pekee vinavyobadilika kutoka kifurushi kimoja hadi kingine.')}</p>
    <ul style="margin-top:var(--s2)">
     <li>${L('A deep matte royal-green rigid box with a lid. No band around it.','Boksi gumu la kijani kizito kisichong’aa lenye mfuniko. Hakuna utepe unaolizunguka.')}</li>
     <li>${L('The gold-foil wordmark and the house emblem on the lid.','Jina kwa dhahabu na nembo ya nyumba juu ya mfuniko.')}</li>
     <li>${L('The package name in gold on the side, for example Mama na Mtoto.','Jina la kifurushi kwa dhahabu ubavuni, kwa mfano Mama na Mtoto.')}</li>
     <li>${L('A small gold emblem and the motto on the front.','Nembo ndogo ya dhahabu na kauli mbiu upande wa mbele.')}</li>
     <li>${L('Made to be kept: a QR guide shows how to use the empty box as a decorative shelf box at home.','Limetengenezwa ili kuhifadhiwa: mwongozo wa QR unaonyesha jinsi ya kutumia boksi tupu kama boksi la mapambo la rafu nyumbani.')}</li>
    </ul>
    <p style="margin-top:var(--s2)">${L('Every new box image is made from the approved renders, never from a written description alone. Films of the box show gloved hands only.','Kila picha mpya ya boksi inatengenezwa kutoka picha zilizoidhinishwa, kamwe si kutoka maelezo ya maandishi peke yake. Filamu za boksi zinaonyesha mikono yenye glavu tu.')}</p>
   </div>
  </div>
 </section>

 <section class="ab-block"><h2>${L('The brand on everyday items','Chapa kwenye vitu vya kila siku')}</h2>
  <p>${L('The brand applied to the items the founding team, advisers and riders will use, and to the print a customer takes home. All are concept mock-ups; none has been produced yet.','Chapa ikitumika kwenye vitu ambavyo timu ya waanzilishi, washauri na wasafirishaji watatumia, na kwenye machapisho ambayo mteja anaenda nayo nyumbani. Vyote ni michoro ya dhana; hakuna kilichotengenezwa bado.')}</p>
  <div class="ab-seg" role="group" aria-label="${L('Filter the items','Chuja vitu')}" id="s22f" style="margin-top:var(--s2);flex-wrap:wrap">${MCAT.map((c,i)=>`<button type="button" data-c="${c[0]}" aria-pressed="${i===0}">${L(c[1],c[2])}</button>`).join('')}</div>
  <ul class="s22-mg" id="s22g">${MERCH.map(m=>`<li data-c="${m[1]}"><img src="img/brand/m-${m[0]}.webp" width="2400" height="${/brochure|cards|letter/.test(m[0])?1800:2400}" loading="lazy" alt="${L('Concept mock-up: '+m[2][0],'Mchoro wa dhana: '+m[2][1])}"><b>${L(m[2][0],m[2][1])}</b><p>${L(m[3][0],m[3][1])}</p></li>`).join('')}</ul>
 </section>
 </div>

 <section class="ab-block"><h2>${L('Key figures','Takwimu kuu')}</h2>
  <p>${L('Most brand assets are things the business needs anyway: signs, labels, bags and receipts. Dedicated brand spending is small. The figures follow the funding option selected at the top of the page.','Vitu vingi vya chapa ni vitu ambavyo biashara inavihitaji hata hivyo: mabango, lebo, mifuko na risiti. Matumizi maalum ya chapa ni madogo. Takwimu zinafuata chaguo la ufadhili lililochaguliwa juu ya ukurasa.')}</p>
  ${costFigs()}
 </section>

 <section class="ab-block"><h2>${L('Risks and our answer','Hatari na jibu letu')}</h2>
  <div class="ab-tw"><table class="ab-t"><thead><tr><th>${L('Risk','Hatari')}</th><th>${L('Our answer','Jibu letu')}</th></tr></thead><tbody>
   <tr><td>${L('Another health brand uses a similar roof-and-heart idea.','Chapa nyingine ya afya inatumia wazo linalofanana la paa na moyo.')}</td><td>${L('The open roof stroke, the cut-out heartbeat, the drawn wordmark and the Kiswahili motto together make the mark distinctive. Before launch the company searches the trademark register and registers the mark and the name.','Mstari wazi wa paa, mapigo yaliyokatwa ndani ya moyo, jina lililochorwa na kauli mbiu ya Kiswahili kwa pamoja vinaifanya nembo kuwa ya kipekee. Kabla ya uzinduzi kampuni inatafuta kwenye daftari la alama za biashara na kusajili nembo na jina.')}</td></tr>
   <tr><td>${L('Consistency slips as the chain grows.','Ufanano unapungua kadiri mnyororo wa maduka unavyokua.')}</td><td>${L('All assets sit in one brand kit, and shelf labels and receipts are generated by the system, so they cannot drift. Each new store follows the same playbook.','Vitu vyote vya chapa viko katika kifurushi kimoja cha chapa, na lebo za rafu na risiti zinatengenezwa na mfumo, hivyo haziwezi kubadilika. Kila duka jipya linafuata mwongozo uleule.')}</td></tr>
   <tr><td>${L('Kiswahili copy reads as a translation.','Maandishi ya Kiswahili yanasomeka kama tafsiri.')}</td><td>${L('Text messages and WhatsApp, where most customers meet the brand, are written in Kiswahili first, and all Kiswahili is reviewed by a native-speaking editor before launch.','Ujumbe mfupi na WhatsApp, ambako wateja wengi wanakutana na chapa, vinaandikwa kwa Kiswahili kwanza, na Kiswahili chote kinapitiwa na mhariri mzawa wa lugha kabla ya uzinduzi.')}</td></tr>
   <tr><td>${L('Gold is too faint for text on warm white.','Dhahabu ni hafifu mno kwa maandishi juu ya nyeupe ya joto.')}</td><td>${L('The swatches above measure it: gold is decoration on light surfaces and is used for text only on green.','Sampuli za rangi hapo juu zinaipima: dhahabu ni mapambo juu ya nyuso angavu na inatumika kwa maandishi juu ya kijani tu.')}</td></tr>
  </tbody></table></div>
 </section>

 ${A().openHTML([
  L('The customer colour codes are working values. They are fixed when print proofs of the box, the sign and the shelf cards are approved, and the contrast figures are re-measured then.','Namba za rangi za mteja ni thamani za kufanyia kazi. Zitathibitishwa pale sampuli za uchapishaji za boksi, bango na kadi za rafu zitakapoidhinishwa, na vipimo vya utofauti vitapimwa upya wakati huo.'),
  L('A trademark search, and registration of the mark and the name, are still to be done.','Utafutaji wa alama ya biashara, na usajili wa nembo na jina, bado haujafanyika.'),
  L('The branded items are concept mock-ups. Suppliers, unit costs and minimum order quantities have not been quoted.','Vitu vyenye chapa ni michoro ya dhana. Wasambazaji, gharama kwa kila kimoja na idadi ya chini ya kuagiza bado hazijatolewa bei.'),
  L('The service promises in the charter (payment time, same-day delivery, reply times) are planning targets, to be tested in the pre-opening trial.','Ahadi za huduma katika orodha ya ahadi (muda wa kulipa, usafirishaji wa siku hiyohiyo, muda wa kujibu) ni malengo ya mipango, yatakayojaribiwa kabla ya ufunguzi.'),
  L('All customer-facing Kiswahili will be reviewed by a native-speaking editor before launch.','Kiswahili chote kinachomfikia mteja kitapitiwa na mhariri mzawa wa lugha kabla ya uzinduzi.')])}

 <div id="abSrc">${A().sourcesHTML(SRC())}</div>
 ${A().pagerHTML(pv,nx)}
 </div></article>`}

function init(){const f=document.getElementById('s22f'),g=document.getElementById('s22g');if(!f||!g)return;
 f.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{f.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
  const c=b.dataset.c;g.querySelectorAll('li').forEach(li=>{li.hidden=!(c==='all'||li.dataset.c===c)})}))}

window.SECTIONS['s2-2']={render,init,v2:true};
})();
