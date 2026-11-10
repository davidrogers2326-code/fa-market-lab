/* 1.4 Our customers · v2 on the D2 template (brief G 1.4, K1.8).
   Six illustrative households, faceless (D-1): inline SVG object icons only, no photos.
   Monthly spend: the two finished boxes (Mama na Mtoto, Mama Mjamzito) are priced live with the D4 rule from
   data/boxes (window.AFYA_DATA + window.AFYA_D4); the other four use the financial model's average box, labelled
   "estimate" with that basis. Card fees from MODEL.inputs.cards. Medicines only via the licensed partner pharmacy (B4).
   The 22-package grid is removed (it duplicates 3.5). */
(function(){
'use strict';
const A=()=>window.AB,T=(e,s)=>A().T(e,s),E=s=>A().E(s),L=(e,s)=>E(T(e,s));
const nf=n=>Math.round(n).toLocaleString('en-US');
const tsh=n=>'TSh '+nf(n);
const est=()=>`<span class="ab-est">${L('estimate','makadirio')}</span>`;
const M=()=>window.MODEL;

/* ---------- sources ---------- */
const SRC=()=>[
 {t:T('Mayige et al., Tanzania Journal of Health Research 27(2), 2026: hypertension among adults aged 18–69, 2023 National STEPS survey','Mayige na wenzake, Tanzania Journal of Health Research 27(2), 2026: shinikizo la juu la damu kwa watu wazima wa miaka 18–69, utafiti wa kitaifa wa STEPS 2023'),u:'https://nhrdr.nimr.or.tz/records/209',chk:'9 Nov 2026'},
 {t:T('NBS, June 2024: 2022 Population and Housing Census, Key Findings, Basic Demographic and Socio-economic Profile (15.4% under five, 5.7% aged 60 and over)','NBS, Juni 2024: Sensa ya Watu na Makazi 2022, Matokeo Muhimu, Wasifu wa Msingi wa Kidemografia na Kijamii na Kiuchumi (asilimia 15.4 chini ya miaka mitano, asilimia 5.7 wenye miaka 60 na zaidi)'),u:'https://sensa.nbs.go.tz/publication/08. Key_Findings_Basic_Demographic_and_Socio-economic_ Eng_ 12.06.2024 Final.pdf'},
 {t:T('NBS: 2022 Population and Housing Census, Housing Condition, Household Amenities and Assets (1,537,293 households in Dar es Salaam region)','NBS: Sensa ya Watu na Makazi 2022, Hali ya Makazi, Huduma na Mali za Kaya (kaya 1,537,293 mkoa wa Dar es Salaam)'),u:'https://www.nbs.go.tz/uploads/statistics/documents/en-1764003000-Housing Condition, Household Amenities and Assets.pdf'},
 {t:T('MoH, NBS, OCGS and ICF, January 2023: Tanzania Demographic and Health Survey and Malaria Indicator Survey 2022, Key Indicators Report (3.6 children per urban woman)','Wizara ya Afya, NBS, OCGS na ICF, Januari 2023: Utafiti wa Demografia na Afya na Viashiria vya Malaria Tanzania 2022, Ripoti ya Viashiria Muhimu (watoto 3.6 kwa mwanamke wa mjini)'),u:'https://dhsprogram.com/pubs/pdf/PR144/PPR144.pdf'},
 {t:T('Afya Basics box price lists, section 3.5: Mama na Mtoto and Mama Mjamzito, every item with a sourced shelf price (checked 9 Nov 2026), priced with the member pricing rule (3% / 6% / 9% below shelf, packing and delivery included)','Orodha za bei za maboksi ya Afya Basics, sehemu 3.5: Mama na Mtoto na Mama Mjamzito, kila kitu na bei ya rafu yenye chanzo (imekaguliwa 9 Nov 2026), kwa kanuni ya bei ya mwanachama (3% / 6% / 9% chini ya bei ya rafu, ufungashaji na usafirishaji ukiwemo)'),u:''},
 {t:T('Afya Basics financial model v1.2, base case: average box price, card fees, average store basket, business share (planning estimates)','Modeli ya fedha ya Afya Basics v1.2, hali ya msingi: bei ya wastani ya boksi, ada za kadi, kikapu cha wastani dukani, sehemu ya biashara (makadirio ya mipango)'),u:''}];
const cite=n=>`<sup><a href="#abSrc" class="ab-cite" aria-label="${L('Source','Chanzo')} ${n}">${n}</a></sup>`;

/* ---------- faceless icons (objects only) ---------- */
const ICON={
 mm:'<path d="M9.5 2.5h5"/><path d="M10 2.5v3L8 8.5V20a1.5 1.5 0 0 0 1.5 1.5h5A1.5 1.5 0 0 0 16 20V8.5l-2-3v-3"/><path d="M8 12h8M8 16h8"/>',
 mj:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/><path d="M12 18.5s-3.2-1.9-3.2-3.8a1.6 1.6 0 0 1 3.2-.6 1.6 1.6 0 0 1 3.2.6c0 1.9-3.2 3.8-3.2 3.8z"/>',
 bd:'<rect x="6" y="4" width="12" height="17" rx="2"/><rect x="8.5" y="7" width="7" height="5" rx="1"/><path d="M11 4V1.5h2V4"/><circle cx="12" cy="16.5" r="1.5"/>',
 cr:'<path d="M6 4h12"/><path d="M7.5 4L5 21M16.5 4L19 21"/><path d="M6.3 12h11.4"/><path d="M4 21h2.5M17.5 21H20"/>',
 rc:'<rect x="2.5" y="8.5" width="19" height="7" rx="3.5" transform="rotate(-45 12 12)"/><path d="M9.5 9.5l5 5"/><path d="M10.6 12.4h.01M12.4 10.6h.01M13.4 13.4h.01M11.6 11.6h.01"/>',
 ds:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.4 3 14.6 0 18M12 3c-3 3.4-3 14.6 0 18"/>'};
const icon=(k,sz)=>`<svg class="s14-ic" width="${sz||32}" height="${sz||32}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICON[k]}</svg>`;

/* ---------- the six households (illustrative; names and ages invented) ---------- */
const PER=[
 {k:'mm',card:'family',box:{slug:'mama-na-mtoto',stage:'c'},boxName:['Mama na Mtoto box, months 8–12','Boksi la Mama na Mtoto, miezi 8–12'],j:['D','C'],
  who:['A new mother and her baby','Mama mpya na mtoto wake'],
  q:['“Nappies always seem to run out on a Sunday.”','“Nepi huwa zinaisha siku ya Jumapili kila mara.”'],
  sit:['Zawadi, 27, lives in Sinza with her nine-month-old son. She works mornings at a salon, and the other adults at home are out at work all day. Today she buys nappies, wipes and lotion in three places, and every change of nappy size means another search.','Zawadi, mwenye miaka 27, anaishi Sinza na mtoto wake wa kiume wa miezi tisa. Anafanya kazi saluni nyakati za asubuhi, na watu wazima wengine nyumbani wako kazini mchana kutwa. Leo ananunua nepi, vitambaa vya mtoto na losheni katika maduka matatu, na kila saizi ya nepi inapobadilika anaanza kutafuta upya.'],
  needs:['The right nappy size every month, fragrance-free wipes, a barrier cream, a mild baby wash, laundry powder for baby clothes, a toy of the month, and sanitary pads for herself.','Saizi sahihi ya nepi kila mwezi, vitambaa vya mtoto visivyo na manukato, krimu ya kuzuia vipele vya nepi, sabuni laini ya kuogea mtoto, sabuni ya unga ya nguo za mtoto, kichezeo cha mwezi, na pedi kwa ajili yake mwenyewe.'],
  med:['Medicines, such as oral rehydration salts and zinc for diarrhoea or her own iron and folic acid, are supplied by the licensed partner pharmacy, not by Afya.','Dawa, kama chumvi ya kurejesha maji mwilini (ORS) na zinki kwa kuharisha au vidonge vyake vya madini chuma na foliki asidi, zinatolewa na famasia mshirika yenye leseni, si na Afya.'],
  prod:[['Nappies, 6–9 kg','Nepi, kilo 6–9'],['Baby wipes','Vitambaa vya mtoto'],['Nappy-rash barrier','Krimu ya vipele vya nepi'],['Mild baby wash','Sabuni laini ya mtoto'],['Toy of the month','Kichezeo cha mwezi'],['Sanitary pads','Pedi']],
  sw2:['Nappies arrive before they run out, and the size changes with one swap, made up to 12 days before the end of the month.','Nepi zinafika kabla hazijaisha, na saizi inabadilishwa kwa kubadilisha mara moja, hadi siku 12 kabla ya mwisho wa mwezi.']},
 {k:'mj',card:'family',box:{slug:'mama-mjamzito',stage:'t2',per3:true},boxName:['Mama Mjamzito box, second trimester; then Mama na Mtoto','Boksi la Mama Mjamzito, miezi mitatu ya pili; kisha Mama na Mtoto'],j:['B','D'],
  who:['An expectant mother','Mama mjamzito'],
  q:['“I want to check my pressure without losing half a day.”','“Nataka kupima shinikizo langu bila kupoteza nusu siku.”'],
  sit:['Rehema, 31, is five months pregnant with her second child and lives in Kigamboni. Her clinic visits are long, her feet swell in the afternoon, and the list of things to buy for the baby grows every week.','Rehema, mwenye miaka 31, ana ujauzito wa miezi mitano wa mtoto wake wa pili na anaishi Kigamboni. Ziara zake za kliniki ni ndefu, miguu yake huvimba mchana, na orodha ya vitu vya kumnunulia mtoto inaongezeka kila wiki.'],
  needs:['Mosquito repellent, a body lotion for stretching skin, a shower and body wash, panty liners and a gentle intimate wash, drinking-water treatment, and a quick blood-pressure reading between clinic visits.','Dawa ya kufukuza mbu, losheni ya ngozi inayotanuka, sabuni ya kuogea, pedi nyembamba na sabuni laini ya sehemu za siri, dawa ya kusafisha maji ya kunywa, na kipimo cha haraka cha shinikizo la damu kati ya ziara za kliniki.'],
  med:['Her clinic decides any iron, folic acid or calcium and the dose. The licensed partner pharmacy supplies them on the clinic’s prescription; Afya does not sell them.','Kliniki yake inaamua madini chuma, foliki asidi au kalsiamu yoyote na kipimo chake. Famasia mshirika yenye leseni inazitoa kwa agizo la kliniki; Afya haziuzi.'],
  prod:[['Mosquito repellent','Dawa ya kufukuza mbu'],['Body lotion','Losheni ya mwili'],['Body wash','Sabuni ya kuogea'],['Panty liners','Pedi nyembamba'],['Water treatment','Dawa ya kusafisha maji']],
  sw2:['A free Afya Check whenever she passes, with a clear “see your clinic today” if a reading is high, and one box each trimester delivered to her door.','Afya Check ya bure kila anapopita, na ujumbe wazi wa “nenda kliniki leo” kama kipimo kiko juu, na boksi moja kila miezi mitatu linaloletwa mlangoni kwake.']},
 {k:'bd',card:'care',box:{slug:'sukari'},boxName:['Sukari box (item list in research)','Boksi la Sukari (orodha ya vitu inafanyiwa utafiti)'],j:['B','D'],
  who:['A father living with diabetes and high blood pressure','Baba anayeishi na kisukari na shinikizo la juu la damu'],
  q:['“My strips must fit my meter, every time.”','“Vipande vyangu vya kupimia lazima viendane na mashine yangu, kila mara.”'],
  sit:['Hassan, 54, runs a hardware shop in Mbezi. He was diagnosed with type 2 diabetes three years ago and now also has high blood pressure. He often runs out of test strips, and some shops stock only strips that do not fit his meter.','Hassan, mwenye miaka 54, anaendesha duka la vifaa vya ujenzi Mbezi. Aligundulika na kisukari aina ya pili miaka mitatu iliyopita na sasa pia ana shinikizo la juu la damu. Mara nyingi vipande vyake vya kupimia sukari vinaisha, na maduka mengine yana vipande visivyoendana na mashine yake tu.'],
  needs:['Test strips matched to his meter, lancets, a validated upper-arm blood-pressure monitor, foot-care products and a sharps container, with his readings from the free check saved over time.','Vipande vya kupimia vinavyoendana na mashine yake, sindano ndogo za kuchomea kidole, kipima shinikizo la damu cha mkono wa juu kilichothibitishwa, bidhaa za kutunza miguu na chombo cha kutupia sindano, pamoja na vipimo vyake vya kipimo cha bure vikihifadhiwa kwa muda.'],
  med:['His clinic decides how often he tests and which medicines he takes. Any prescribed medicine comes from the licensed partner pharmacy.','Kliniki yake inaamua anapima mara ngapi na anatumia dawa gani. Dawa yoyote iliyoagizwa inatoka kwa famasia mshirika yenye leseni.'],
  prod:[['Meter-matched strips','Vipande vinavyoendana na mashine'],['Lancets','Sindano za kuchomea kidole'],['Blood-pressure monitor','Kipima shinikizo la damu'],['Foot-care cream','Krimu ya kutunza miguu'],['Sharps container','Chombo cha kutupia sindano']],
  sw2:['His meter model is saved to his account, so matching strips always come, and the reading history from his free checks is ready to show his doctor.','Aina ya mashine yake imehifadhiwa kwenye akaunti yake, hivyo vipande vinavyoendana vinakuja kila mara, na historia ya vipimo vyake vya bure iko tayari kumwonyesha daktari.']},
 {k:'cr',card:'senior',box:{slug:'bibi-na-babu'},boxName:['Bibi na Babu box (item list in research)','Boksi la Bibi na Babu (orodha ya vitu inafanyiwa utafiti)'],j:['C','D'],
  who:['A daughter caring for her elderly mother','Binti anayemhudumia mama yake mzee'],
  q:['“I can’t leave work early every week to buy Mama’s things.”','“Siwezi kuondoka kazini mapema kila wiki kwenda kununua vitu vya Mama.”'],
  sit:['Halima, 36, is an accountant in the city centre. Her mother, 78, lives in Temeke with high blood pressure and limited mobility after a fall. Halima buys adult diapers, creams and batteries for the monitor, and arranges everything by phone.','Halima, mwenye miaka 36, ni mhasibu katikati ya jiji. Mama yake, mwenye miaka 78, anaishi Temeke akiwa na shinikizo la juu la damu na uwezo mdogo wa kutembea baada ya kuanguka. Halima ananunua nepi za watu wazima, krimu na betri za kipima shinikizo, na anapanga kila kitu kwa simu.'],
  needs:['Adult diapers and wipes, a barrier cream for the skin, bed pads, monitor batteries, and a walking frame to rent, delivered straight to her mother’s door and managed from a carer login.','Nepi za watu wazima na vitambaa, krimu ya kulinda ngozi, shuka za kuzuia unyevu kitandani, betri za kipima shinikizo, na kitembezi cha kukodi, vikiletwa moja kwa moja mlangoni kwa mama yake na kusimamiwa kupitia akaunti ya mlezi.'],
  med:['Her mother’s blood-pressure tablets are prescribed by her clinic and supplied by the licensed partner pharmacy, in a sealed bag that travels with the box.','Vidonge vya shinikizo la damu vya mama yake vinaagizwa na kliniki yake na kutolewa na famasia mshirika yenye leseni, katika mfuko uliofungwa unaosafiri pamoja na boksi.'],
  prod:[['Adult diapers','Nepi za watu wazima'],['Wipes and barrier cream','Vitambaa na krimu ya kulinda ngozi'],['Bed pads','Shuka za kuzuia unyevu'],['Monitor batteries','Betri za kipima shinikizo'],['Walking frame, rented','Kitembezi, cha kukodi']],
  sw2:['A carer account: she manages her mother’s box from her desk, receives the reminders, and rented equipment is delivered and collected.','Akaunti ya mlezi: anasimamia boksi la mama yake akiwa ofisini, anapokea vikumbusho, na vifaa vya kukodi vinaletwa na kuchukuliwa.']},
 {k:'rc',card:'green',box:{slug:'kupona'},boxName:['Kupona box for 6–8 weeks (item list in research)','Boksi la Kupona kwa wiki 6–8 (orodha ya vitu inafanyiwa utafiti)'],j:['B','C'],
  who:['A man recovering after surgery','Mwanamume anayepona baada ya upasuaji'],
  q:['“I need dressings today, not next week.”','“Nahitaji vifaa vya kufunga jeraha leo, si wiki ijayo.”'],
  sit:['Peter, 41, had knee surgery after a motorbike accident and lives in Upanga. For six to eight weeks he needs dressings, cold packs and crutches, and he cannot walk from shop to shop.','Peter, mwenye miaka 41, alifanyiwa upasuaji wa goti baada ya ajali ya pikipiki na anaishi Upanga. Kwa wiki sita hadi nane anahitaji vifaa vya kufunga jeraha, vifurushi vya baridi na magongo, na hawezi kutembea kutoka duka moja hadi jingine.'],
  needs:['Sterile dressings and tape, cold and hot packs, crutches or a knee brace to rent or buy, and someone who can explain how to use them safely.','Vifaa safi vya kufunga jeraha na plasta, vifurushi vya baridi na joto, magongo au kifaa cha kushikilia goti vya kukodi au kununua, na mtu anayeweza kueleza jinsi ya kuvitumia kwa usalama.'],
  med:['His surgeon decides which dressing and any pain relief. Medicines come from the licensed partner pharmacy, not from Afya.','Daktari wake wa upasuaji anaamua kifaa gani cha kufunga jeraha na dawa yoyote ya maumivu. Dawa zinatoka kwa famasia mshirika yenye leseni, si kwa Afya.'],
  prod:[['Sterile dressings','Vifaa safi vya kufunga jeraha'],['Cold and hot packs','Vifurushi vya baridi na joto'],['Crutches, rented','Magongo, ya kukodi'],['Knee brace','Kifaa cha kushikilia goti']],
  sw2:['A ready recovery kit delivered in Dar es Salaam, and advice from the store lead on using the aids safely.','Kifurushi cha kupona kilicho tayari kinaletwa Dar es Salaam, pamoja na ushauri wa kiongozi wa duka kuhusu kutumia vifaa hivyo kwa usalama.']},
 {k:'ds',card:'senior',box:{slug:'presha'},boxName:['Presha or Bibi na Babu box, paid from abroad (item lists in research)','Boksi la Presha au la Bibi na Babu, linalolipwa kutoka nje ya nchi (orodha za vitu zinafanyiwa utafiti)'],j:['E','D'],
  who:['A son working abroad','Mwana anayefanya kazi nje ya nchi'],
  q:['“I send money home. I want to see it become care.”','“Natuma pesa nyumbani. Nataka kuona zinageuka kuwa huduma.”'],
  sit:['Abdul, 33, works in Muscat. His mother in Dar es Salaam has high blood pressure and has lived alone since his father died. He sends money every month but cannot be sure it becomes her monitor batteries and daily essentials.','Abdul, mwenye miaka 33, anafanya kazi Muscat. Mama yake aliyeko Dar es Salaam ana shinikizo la juu la damu na anaishi peke yake tangu baba yake afariki. Anatuma pesa kila mwezi lakini hana uhakika kama zinageuka kuwa betri za kipima shinikizo na mahitaji yake ya kila siku.'],
  needs:['A monthly box for his mother paid by international card in a few minutes, a photo confirmation when it arrives, reminders, and her Afya Check readings shared only with her permission.','Boksi la kila mwezi kwa mama yake linalolipwa kwa kadi ya kimataifa kwa dakika chache, picha ya uthibitisho linapofika, vikumbusho, na vipimo vyake vya Afya Check vikishirikishwa kwa ruhusa yake tu.'],
  med:['Her tablets are prescribed by her clinic and supplied by the licensed partner pharmacy; Abdul pays the pharmacy, not Afya, for them.','Vidonge vyake vinaagizwa na kliniki yake na kutolewa na famasia mshirika yenye leseni; Abdul analipa famasia, si Afya, kwa ajili yake.'],
  prod:[['A parent’s care box','Boksi la huduma ya mzazi'],['Monitor batteries and cuff','Betri na mkanda wa kipima shinikizo'],['Personal-care essentials','Mahitaji ya usafi binafsi'],['Gift card for occasions','Kadi ya zawadi kwa sikukuu']],
  sw2:['He pays by card from abroad, ideally for 6 or 12 months at once, a photo confirms each delivery, and her readings are shared only with her consent.','Analipa kwa kadi kutoka nje ya nchi, ikiwezekana kwa miezi 6 au 12 kwa mara moja, picha inathibitisha kila usafirishaji, na vipimo vyake vinashirikishwa kwa ridhaa yake tu.']}];
const JN=[['A','Walk-in','Kuingia dukani'],['B','Advice with Afya Check','Ushauri na Afya Check'],['C','Online and WhatsApp','Mtandaoni na WhatsApp'],['D','Afya Box member','Mwanachama wa Afya Box'],['E','Diaspora gift','Zawadi kutoka diaspora']];
const PLANS=[['m1','1 month','Mwezi 1'],['m6','6 months · Gold','Miezi 6 · Gold'],['m12','12 months · Platinum','Miezi 12 · Platinum']];
const CARD_NAME={green:['Afya Green','Afya Green'],family:['Afya Family','Afya Family'],care:['Afya Care','Afya Care'],senior:['Afya Senior','Afya Senior']};
let plan='m1',cur=0;

/* ---------- prices ---------- */
function d4Box(slug,stageKey,pl){const D=window.AFYA_DATA,D4=window.AFYA_D4;const b=D&&D.boxes&&D.boxes[slug];if(!b||!b.final||!D4)return null;
 const st=b.stages.find(s=>s.key===stageKey);if(!st)return null;
 const lines=(st.items||[]).filter(it=>it.kind!=='medicine').map(it=>{const bs=it.brands||[];const br=bs.find(x=>x.default)||bs[0];return D4.lineCost(br,it.units)});
 if(lines.some(c=>c==null))return null;
 const shelf=lines.reduce((t,c)=>t+c,0);return {shelf,core:D4.core(shelf,pl),label:st.label}}
function spend(x,pl){const I=M().inputs,c=I.cards.find(k=>k.key===x.card)||{fee_year:0},cardM=(c.fee_year||0)/12;
 const r=x.box.stage?d4Box(x.box.slug,x.box.stage,pl):null;
 if(r){const boxM=x.box.per3?r.core/3:r.core;return {final:true,boxPrice:r.core,boxM,cardM,tot:boxM+cardM,per3:!!x.box.per3,stage:r.label}}
 const f=(I.members.plans||{})[pl]||1,boxM=I.members.avg_box*f;return {final:false,boxPrice:boxM,boxM,cardM,tot:boxM+cardM}}

/* ---------- pieces ---------- */
const CSS=`
.s14 figure.ab-visual{margin-left:0;margin-right:0}
.s14 figcaption,.s14 .s14-cap{margin-top:var(--s2);color:var(--mute);font-size:var(--fs-cap);max-width:var(--measure)}
.s14 .s14-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0;border-top:1px solid var(--line);border-left:1px solid var(--line)}
.s14 .s14-card{display:flex;flex-direction:column;align-items:flex-start;gap:6px;text-align:left;background:var(--surface);border:0;border-right:1px solid var(--line);border-bottom:1px solid var(--line);padding:var(--s3);cursor:pointer;color:var(--ink);min-height:100%}
.s14 .s14-card:hover{background:var(--bg)}
.s14 .s14-card[aria-pressed="true"]{background:var(--green-deep)}
.s14 .s14-card .s14-ic{color:var(--green-edge)}
.s14 .s14-card[aria-pressed="true"] .s14-ic{color:var(--gold)}
.s14 .s14-card b{font-weight:600;font-size:var(--fs-body);line-height:1.35}
.s14 .s14-card .s14-bx{color:var(--mute);font-size:var(--fs-cap)}
.s14 .s14-card .s14-v{color:var(--gold);font-weight:600;font-variant-numeric:tabular-nums;margin-top:auto;padding-top:var(--s1)}
.s14 .s14-card .s14-v small{display:block;color:var(--mute);font-weight:400;font-size:var(--fs-cap)}
.s14 .s14-ctl{display:flex;flex-wrap:wrap;gap:var(--s2);align-items:center;margin-top:var(--s3)}
.s14 .s14-ctl>span{color:var(--mute);font-size:var(--fs-cap)}
.s14 .s14-pc{margin-top:var(--s3);border:1px solid var(--line);background:var(--surface);padding:var(--s4);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.2fr);gap:var(--s4)}
.s14 .s14-pc h3{margin-top:0!important;font-size:var(--fs-sub)!important}
.s14 .s14-pc .s14-q{color:var(--gold);margin-top:var(--s1)}
.s14 .s14-pc p+p{margin-top:var(--s2)}
.s14 .s14-pc dl{margin:0;display:grid;gap:var(--s2)}
.s14 .s14-pc dt{color:var(--mute);font-size:var(--fs-cap)}
.s14 .s14-pc dd{margin:4px 0 0}
.s14 .s14-tags{display:flex;flex-wrap:wrap;gap:6px}
.s14 .s14-tags span{border:1px solid var(--line);border-radius:999px;padding:2px 10px;font-size:var(--fs-cap)}
.s14 .s14-jr{display:flex;flex-wrap:wrap;gap:6px}
.s14 .s14-jr span{border:1px solid var(--line);padding:2px 8px;font-size:var(--fs-cap);color:var(--mute)}
.s14 .s14-jr span.on{border-color:var(--green-edge);color:var(--ink);background:var(--green-deep)}
.s14 .s14-med{border-left:2px solid var(--green-edge);padding-left:var(--s2);color:var(--ink)}
.s14 .s14-sp{border-top:1px solid var(--line);padding-top:var(--s2)}
.s14 .s14-sp .s14-big{color:var(--gold);font-size:var(--fs-sub);font-weight:600;font-variant-numeric:tabular-nums}
.s14 .ab-block>h2+*{margin-top:var(--s2)}
.s14 .ab-block>*+p,.s14 .ab-block>*+.ab-tw{margin-top:var(--s2)}
.s14 table.ab-t td small{display:block;color:var(--mute);font-size:var(--fs-cap)}
.s14 ul.s14-ul{margin:var(--s2) 0 0;padding-left:20px;max-width:var(--measure)}.s14 ul.s14-ul li+li{margin-top:6px}
@media (max-width:860px){.s14 .s14-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.s14 .s14-pc{grid-template-columns:1fr;padding:var(--s3)}}
@media (max-width:420px){.s14 .s14-card{padding:var(--s2)}}
`;
function cardsHTML(){return `<div class="s14-grid" role="group" aria-label="${L('Choose a household','Chagua kaya')}">${PER.map((x,i)=>{const sp=spend(x,plan);
 return `<button type="button" class="s14-card" data-p="${i}" aria-pressed="${i===cur}">${icon(x.k)}<b>${L(...x.who)}</b><span class="s14-bx">${L(...x.boxName)}</span><span class="s14-v">${tsh(sp.tot)} ${sp.final?'':est()}<small>${L('a month','kwa mwezi')}${sp.final?' · '+L('from the sourced box price','kutoka bei ya boksi yenye vyanzo'):' · '+L('model average box','wastani wa boksi wa modeli')}</small></span></button>`}).join('')}</div>`}
function planSeg(id){return `<div class="ab-seg" role="group" aria-label="${L('Plan length','Muda wa mpango')}" id="${id}">${PLANS.map(p=>`<button type="button" data-plan="${p[0]}" aria-pressed="${p[0]===plan}">${L(p[1],p[2])}</button>`).join('')}</div>`}
function pcHTML(i){const x=PER[i],sp=spend(x,plan),cd=CARD_NAME[x.card]||[x.card,x.card],I=M().inputs,c=I.cards.find(k=>k.key===x.card)||{fee_year:0};
 const boxLine=sp.final?(sp.per3?`${tsh(sp.boxPrice)} ${L('per trimester box','kwa boksi la miezi mitatu')} · ${L('about','takriban')} ${tsh(sp.boxM)} ${L('a month','kwa mwezi')}`:`${tsh(sp.boxPrice)} ${L('a month','kwa mwezi')}`):`${tsh(sp.boxM)} ${est()}`;
 const basis=sp.final?L('Box price: the sourced shelf value of the box goods, less the member saving for this plan, packing and delivery included (section 3.5).','Bei ya boksi: thamani ya rafu yenye vyanzo ya bidhaa za boksi, ukitoa punguzo la mwanachama kwa mpango huu, ufungashaji na usafirishaji ukiwemo (sehemu 3.5).')
  :L('Estimate: the item list for this box is still in research, so the financial model’s average box price is used, adjusted for the plan length.','Makadirio: orodha ya vitu vya boksi hili bado inafanyiwa utafiti, hivyo bei ya wastani ya boksi ya modeli ya fedha inatumika, ikirekebishwa kwa muda wa mpango.');
 return `<article class="s14-pc" aria-live="polite">
  <div><h3>${L(...x.who)}</h3><p class="s14-q">${L(...x.q)}</p><p>${L(...x.sit)}</p><p class="ab-mute" style="font-size:var(--fs-cap)">${L('Illustrative household: the name and age are invented; the situation is common in Dar es Salaam.','Kaya ya mfano: jina na umri vimebuniwa; hali hii ni ya kawaida Dar es Salaam.')}</p>
   <div class="s14-sp" style="margin-top:var(--s3)"><span class="s14-big">${tsh(sp.tot)}</span> ${sp.final?'':est()}<p class="ab-mute" style="font-size:var(--fs-cap)">${L('Estimated monthly spend on this plan: the box','Makadirio ya matumizi ya mwezi kwa mpango huu: boksi')} ${boxLine} + ${E(cd[0])} ${L('card','kadi')} ${tsh(c.fee_year||0)} ${L('a year','kwa mwaka')} ÷ 12 = ${tsh(sp.cardM)}. ${basis}</p></div></div>
  <dl>
   <div><dt>${L('What the household needs','Kaya inahitaji nini')}</dt><dd>${L(...x.needs)}</dd></div>
   <div><dt>${L('Example products','Mifano ya bidhaa')}</dt><dd><div class="s14-tags">${x.prod.map(t=>`<span>${L(...t)}</span>`).join('')}</div></dd></div>
   <div><dt>${L('Medicines','Dawa')}</dt><dd class="s14-med">${L(...x.med)}</dd></div>
   <div><dt>${L('Afya Box and card','Afya Box na kadi')}</dt><dd>${L(...x.boxName)} · ${E(cd[0])}</dd></div>
   <div><dt>${L('Main journeys (section 3.2)','Safari kuu (sehemu 3.2)')}</dt><dd><div class="s14-jr">${JN.map(j=>`<span class="${x.j.includes(j[0])?'on':''}">${j[0]} · ${L(j[1],j[2])}</span>`).join('')}</div></dd></div>
   <div><dt>${L('What makes them switch','Kinachowafanya wabadilike')}</dt><dd>${L(...x.sw2)}</dd></div>
  </dl></article>`}
function tableHTML(){const rows=PER.map(x=>{const sp=spend(x,plan),cd=CARD_NAME[x.card];
 return `<tr><td>${L(...x.who)}<small>${L(...x.boxName)}</small></td><td class="ab-n">${tsh(sp.boxM)}${sp.per3?`<small>${tsh(sp.boxPrice)} ${L('per trimester ÷ 3','kwa miezi mitatu ÷ 3')}</small>`:''}</td><td class="ab-n">${tsh(sp.cardM)}<small>${E(cd[0])}</small></td><td class="ab-n">${tsh(sp.tot)}</td><td>${sp.final?L('Sourced shelf prices, member pricing rule (3.5)','Bei za rafu zenye vyanzo, kanuni ya bei ya mwanachama (3.5)'):`${L('Estimate: model average box','Makadirio: wastani wa boksi wa modeli')} ${tsh(M().inputs.members.avg_box)}`}</td></tr>`}).join('');
 return `<div class="ab-tw"><table class="ab-t"><thead><tr><th>${L('Household and box','Kaya na boksi')}</th><th>${L('Box, per month','Boksi, kwa mwezi')}</th><th>${L('Card, per month','Kadi, kwa mwezi')}</th><th>${L('Estimated monthly spend','Makadirio ya matumizi ya mwezi')}</th><th>${L('Basis','Msingi wa hesabu')}</th></tr></thead><tbody>${rows}</tbody></table></div>`}
function refresh(){const g=id=>document.getElementById(id);if(!g('s14Cards'))return;
 g('s14Cards').innerHTML=cardsHTML();g('s14Pc').innerHTML=pcHTML(cur);g('s14Tbl').innerHTML=tableHTML();
 document.querySelectorAll('.s14 [data-plan]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.plan===plan)))}

function render(s,p,pv,nx){const I=M().inputs,mm=spend(PER[0],'m1'),mj=spend(PER[1],'m1');
 const fam=I.cards.find(c=>c.key==='family')||{fee_year:0};
 return `<article class="ab-sec s14" aria-labelledby="h-s1-4"><style>${CSS}</style><div class="ab-wrap">
 <div class="ab-sec-no">${E(s.no)}</div><h1 id="h-s1-4">${E(s.title)}</h1>
 <p class="ab-summary">${L('Six household types, common across Dar es Salaam, carry most of the early demand. Each is defined by a life situation, not an income bracket: a new baby, a pregnancy, diabetes, an ageing parent, an injury, a son abroad. For each, this section shows the need, the products, the matching Afya Box and card, what the household is likely to spend each month and on what basis, and what makes it switch. Medicines in every household come from the licensed partner pharmacy.','Aina sita za kaya, zinazopatikana kote Dar es Salaam, zinabeba sehemu kubwa ya mahitaji ya mwanzo. Kila moja inatambuliwa kwa hali ya maisha, si kwa kiwango cha kipato: mtoto mchanga, ujauzito, kisukari, mzazi anayezeeka, jeraha, mwana aliye nje ya nchi. Kwa kila moja, sehemu hii inaonyesha hitaji, bidhaa, Afya Box na kadi inayolingana, kiasi ambacho kaya ina uwezekano wa kutumia kila mwezi na msingi wake, na kinachoifanya ibadilike. Dawa katika kila kaya zinatoka kwa famasia mshirika yenye leseni.')}</p>

 <figure class="ab-visual" aria-label="${L('The six households and their estimated monthly spend','Kaya sita na makadirio ya matumizi yao ya mwezi')}">
  <div id="s14Cards">${cardsHTML()}</div>
  <div class="s14-ctl"><span>${L('Plan length','Muda wa mpango')}</span>${planSeg('s14Plan')}</div>
  <figcaption>${L('Select a household to open its profile below. Spend per month: box plus card fee spread over 12 months. The two finished boxes are priced from sourced shelf prices; the other four are estimates from the financial model’s average box until their item lists are complete.','Chagua kaya ili kufungua wasifu wake hapa chini. Matumizi kwa mwezi: boksi pamoja na ada ya kadi ikigawanywa kwa miezi 12. Maboksi mawili yaliyokamilika yanapewa bei kutoka bei za rafu zenye vyanzo; mengine manne ni makadirio kutoka wastani wa boksi wa modeli ya fedha hadi orodha zao za vitu zikamilike.')}</figcaption>
 </figure>

 <div class="ab-body">
  <section class="ab-block" id="s14Persona">
   <h2>${L('Meet the six households','Zifahamu kaya sita')}</h2>
   <div id="s14Pc">${pcHTML(cur)}</div>
  </section>

  <section class="ab-block">
   <h2>${L('Needs follow life situations, not shops','Mahitaji yanafuata hali za maisha, si maduka')}</h2>
   <p>${L('A new baby, a pregnancy, a diagnosis of diabetes, an ageing parent, an injury, a son working abroad: each of these situations arrives with its own list of products, its own rhythm and its own worries. Today each item on that list is bought separately, wherever it can be found. No retailer organises the shelf, the reminder or the delivery around the situation itself, so the household carries the planning alone.','Mtoto mchanga, ujauzito, kugundulika na kisukari, mzazi anayezeeka, jeraha, mwana anayefanya kazi nje ya nchi: kila hali kati ya hizi inakuja na orodha yake ya bidhaa, mdundo wake na wasiwasi wake. Leo kila kitu kwenye orodha hiyo hununuliwa peke yake, popote kinapopatikana. Hakuna muuzaji anayepanga rafu, kikumbusho au usafirishaji kuzunguka hali yenyewe, hivyo kaya inabeba mipango peke yake.')}</p>
   <p>${T(`These households are common. Almost one adult in four has raised blood pressure (2023)${cite(1)}. In the 2022 census, 15.4% of Tanzanians were under five and 5.7% were 60 or older${cite(2)}, and the Dar es Salaam region alone counted 1,537,293 households${cite(3)}. Urban women have 3.6 children on average${cite(4)}, so a household often moves from one pregnancy to a baby and back again within a few years.`,`Kaya hizi ni za kawaida. Karibu mtu mzima mmoja kati ya wanne ana shinikizo la juu la damu (2023)${cite(1)}. Katika sensa ya 2022, asilimia 15.4 ya Watanzania walikuwa chini ya miaka mitano na asilimia 5.7 walikuwa na miaka 60 au zaidi${cite(2)}, na mkoa wa Dar es Salaam peke yake ulihesabu kaya 1,537,293${cite(3)}. Wanawake wa mijini wana watoto 3.6 kwa wastani${cite(4)}, hivyo mara nyingi kaya inahama kutoka ujauzito hadi mtoto mchanga na kurudi tena ndani ya miaka michache.`)}</p>
   <p>${L('The six households are not segments invented for a slide. Each maps to a Care Zone in the store, a named Afya Box, a membership card and a customer journey. A feature that serves none of them is not built.','Kaya hizi sita si makundi yaliyobuniwa kwa ajili ya slaidi. Kila moja inahusiana na Eneo la Huduma dukani, Afya Box yenye jina, kadi ya uanachama na safari ya mteja. Huduma isiyomhudumia yeyote kati yao haijengwi.')}</p>
  </section>

  <section class="ab-block">
   <h2>${L('What each household spends, and where the number comes from','Kila kaya inatumia kiasi gani, na namba inatoka wapi')}</h2>
   <p>${L('The table follows the plan length chosen above. A member on the 6-month (Gold) or 12-month (Platinum) plan pays once and saves 6% or 9% on the box goods instead of 3%. Packing and delivery are already inside the box price; nothing is added at the door.','Jedwali linafuata muda wa mpango uliochaguliwa hapo juu. Mwanachama wa mpango wa miezi 6 (Gold) au miezi 12 (Platinum) analipa mara moja na anaokoa 6% au 9% kwa bidhaa za boksi badala ya 3%. Ufungashaji na usafirishaji tayari viko ndani ya bei ya boksi; hakuna kinachoongezwa mlangoni.')}</p>
   <div class="s14-ctl">${planSeg('s14Plan2')}</div>
   <div id="s14Tbl">${tableHTML()}</div>
   <p class="s14-cap">${T(`Box prices for Mama na Mtoto (months 8–12) and Mama Mjamzito (second trimester) are computed from the item lists in section 3.5${cite(5)}. Card fees and the average box are planning estimates from the financial model${cite(6)}. Medicines are not in any box price: the partner pharmacy charges for them separately. Extra visits or online orders come on top, at an average store basket of ${tsh(I.store.basket)} (estimate${cite(6)}).`,`Bei za maboksi ya Mama na Mtoto (miezi 8–12) na Mama Mjamzito (miezi mitatu ya pili) zimekokotolewa kutoka orodha za vitu katika sehemu 3.5${cite(5)}. Ada za kadi na wastani wa boksi ni makadirio ya mipango kutoka modeli ya fedha${cite(6)}. Dawa hazimo kwenye bei ya boksi lolote: famasia mshirika inazitoza kando. Ziara za ziada au oda za mtandaoni zinaongezeka juu ya hapo, kwa kikapu cha wastani dukani cha ${tsh(I.store.basket)} (makadirio${cite(6)}).`)}</p>
   <p>${L('The two households living with a long-term condition, the father with diabetes and the daughter caring for her mother, are also the least likely to leave: what they buy is not optional, and running out has consequences. Their exact box prices follow when the Sukari and Bibi na Babu item lists are complete.','Kaya mbili zinazoishi na ugonjwa wa muda mrefu, baba mwenye kisukari na binti anayemhudumia mama yake, ndizo pia zisizo na uwezekano mkubwa wa kuondoka: wanachonunua si cha hiari, na kuishiwa kuna madhara. Bei kamili za maboksi yao zitafuata orodha za vitu vya Sukari na Bibi na Babu zitakapokamilika.')}</p>
  </section>

  <section class="ab-block">
   <h2>${L('One family, many years','Familia moja, miaka mingi')}</h2>
   <p>${L('Households do not stay in one situation. A pregnancy becomes a baby, the baby goes to school, a parent is diagnosed, a grandmother needs care. Each change is a moment when a household that already trusts the store simply changes its box, rather than looking for a new shop. Rehema’s Mama Mjamzito box hands over to Mama na Mtoto at birth; Zawadi’s Mama na Mtoto box runs to the child’s third birthday.','Kaya hazibaki katika hali moja. Ujauzito unakuwa mtoto, mtoto anakwenda shule, mzazi anagundulika na ugonjwa, bibi anahitaji huduma. Kila mabadiliko ni wakati ambapo kaya inayoliamini duka tayari inabadilisha boksi lake tu, badala ya kutafuta duka jipya. Boksi la Mama Mjamzito la Rehema linakabidhi kwa Mama na Mtoto mtoto anapozaliwa; boksi la Mama na Mtoto la Zawadi linaendelea hadi mtoto atimize miaka mitatu.')}</p>
   <p>${L('This is why the value of a customer is measured in years, not in visits. Retention across life stages, not a larger first basket, is where the value of the business sits.','Ndiyo maana thamani ya mteja hupimwa kwa miaka, si kwa ziara. Kuwabakiza wateja katika hatua zote za maisha, si kikapu kikubwa cha kwanza, ndiko thamani ya biashara ilipo.')}</p>
  </section>

  <section class="ab-block">
   <h2>${L('Business customers: offices, schools and hotels','Wateja wa biashara: ofisi, shule na hoteli')}</h2>
   <p>${T(`Businesses are a channel rather than a seventh household. Afya Kazini, the business account with no card fee, supplies monthly safety, hygiene and first-aid kits and staff health-check days. In the financial model, business sales add ${Math.round(I.growth.b2b_share*100)}% to store revenue from year 2 (estimate${cite(6)}). The packages for offices, small businesses and hotels are in sections 3.5 and 5.2.`,`Biashara ni njia ya mauzo badala ya kaya ya saba. Afya Kazini, akaunti ya biashara isiyo na ada ya kadi, inaleta kila mwezi vifurushi vya usalama, usafi na huduma ya kwanza, pamoja na siku za vipimo vya afya kwa wafanyakazi. Katika modeli ya fedha, mauzo kwa biashara yanaongeza ${Math.round(I.growth.b2b_share*100)}% kwenye mapato ya duka kuanzia mwaka wa 2 (makadirio${cite(6)}). Vifurushi vya ofisi, biashara ndogo na hoteli viko katika sehemu 3.5 na 5.2.`)}</p>
  </section>
 </div>

 <section class="ab-block"><h2>${L('Key figures','Takwimu muhimu')}</h2>
  ${A().figsHTML([
   {v:tsh(mm.boxPrice),l:T('Mama na Mtoto box, months 8–12, 1-month plan','Boksi la Mama na Mtoto, miezi 8–12, mpango wa mwezi 1'),s:L('Sourced shelf prices, member pricing rule (section 3.5)','Bei za rafu zenye vyanzo, kanuni ya bei ya mwanachama (sehemu 3.5)')},
   {v:tsh(mj.boxPrice),l:T('Mama Mjamzito box, second trimester, one box per trimester','Boksi la Mama Mjamzito, miezi mitatu ya pili, boksi moja kila miezi mitatu'),s:L('Sourced shelf prices, member pricing rule (section 3.5)','Bei za rafu zenye vyanzo, kanuni ya bei ya mwanachama (sehemu 3.5)')},
   {v:`${tsh(I.members.avg_box)} ${est()}`,l:T('Average box price in the financial model, used for the four boxes still in research','Bei ya wastani ya boksi katika modeli ya fedha, inayotumika kwa maboksi manne yaliyo bado kwenye utafiti'),s:L('Financial model v1.2','Modeli ya fedha v1.2')},
   {v:'1,537,293',l:T('Households in the Dar es Salaam region','Kaya katika mkoa wa Dar es Salaam'),s:L('2022 census (NBS)','Sensa ya 2022 (NBS)')}])}
 </section>

 ${A().openHTML([
  L('The six households are illustrative: they are built from national data on who has these needs, not from interviews. Before opening, 60 to 100 short interviews in the store’s catchment will test each household’s needs and willingness to pay.','Kaya sita ni za mfano: zimejengwa kutoka takwimu za kitaifa kuhusu nani ana mahitaji haya, si kutoka mahojiano. Kabla ya kufungua, mahojiano mafupi 60 hadi 100 katika eneo la duka yatapima mahitaji ya kila kaya na utayari wake wa kulipa.'),
  L('Four of the six monthly spends are estimates from the model’s average box. They are replaced by sourced prices when the Sukari, Bibi na Babu, Kupona and Presha item lists are complete.','Matumizi manne kati ya sita ya mwezi ni makadirio kutoka wastani wa boksi wa modeli. Yatabadilishwa na bei zenye vyanzo orodha za vitu za Sukari, Bibi na Babu, Kupona na Presha zitakapokamilika.'),
  L('Card fees are planning figures; they are confirmed with the membership terms in section 3.4.','Ada za kadi ni takwimu za mipango; zitathibitishwa pamoja na masharti ya uanachama katika sehemu 3.4.'),
  L('Whether diaspora relatives will pay for a parent’s box every month is not yet measured. They can start with a single gift box, and prepaid 6- or 12-month plans avoid a monthly card payment.','Kama ndugu walioko nje ya nchi watalipia boksi la mzazi kila mwezi bado haijapimwa. Wanaweza kuanza na boksi moja la zawadi, na mipango ya miezi 6 au 12 inayolipwa mapema inaepusha malipo ya kadi kila mwezi.')])}

 <div id="abSrc">${A().sourcesHTML(SRC())}</div>
 ${A().pagerHTML(pv,nx)}
 </div></article>`}

function init(){const root=document.querySelector('.s14');if(!root)return;
 root.addEventListener('click',e=>{const c=e.target.closest('[data-p]');if(c){cur=+c.dataset.p;refresh();
   const pc=document.getElementById('s14Persona');if(pc&&pc.getBoundingClientRect().top>innerHeight*0.6)pc.scrollIntoView({block:'start'});return}
  const b=e.target.closest('[data-plan]');if(b){plan=b.dataset.plan;refresh()}})}

window.SECTIONS['s1-4']={render,init,v2:true};
})();
