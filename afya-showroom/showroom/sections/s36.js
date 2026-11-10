/* 3.6 The product range · v2 on the D2 template.
   Catalogue: sections/range/sum.js (AFYA_SUM, loaded with the page) and sections/range/lib.js (AFYA_LIB, loaded on demand):
   6 Care Zones, 61 categories, 523 families, 2,796 product lines.
   Regulator per category: research/R1-compliance.md section 4. Medicines: partner pharmacy only (B4, D-5).
   Nutrition shelf: research/R9-nutrition.md and data/nutrition.json (AFYA_DATA.nutrition). Infant formula is never listed (D-19).
   Kenyan prices are converted at the BoT mean rate KES 1 = TSh 20.33, 10 Nov 2026 (research/fx.md). */
(function(){
'use strict';
const A=()=>window.AB,T=(e,s)=>A().T(e,s),E=s=>A().E(s),L=(e,s)=>E(T(e,s)),TL=a=>T(a[0],a[1]);
const lang=()=>window.AFYA_LANG==='sw'?'sw':'en';
const nf=n=>Math.round(n).toLocaleString('en-US');
const tsh=n=>'TSh '+nf(n);
const est=()=>`<span class="ab-est">${L('estimate','makadirio')}</span>`;
const SUM=()=>window.AFYA_SUM||{zones:[],tot:{fam:0,prod:0,kinds:[0,0,0,0,0]}};
const KES=20.33,FXD='10 Nov 2026';

/* ---------- medicine families: sold only by the licensed partner pharmacy (B4). Built from R1 section 4:
   medicines, medicated creams and drops, and vitamin, mineral and probiotic supplements. ---------- */
const PP=new Set(['mb_preg_ifa','mb_preg_multi','mb_preg_cal','mb_post_vit','mb_hlth_ors','mb_hlth_orsz','mb_hlth_para','mb_hlth_ibu','mb_hlth_antis','mb_hlth_deworm','mb_hlth_rub',
 'pc_skin_bpo','pc_lhf_fung','pc_eye_tear','pc_eye_wash','pc_ear_wax',
 'fh_wnd_antl','fh_wnd_pvi','fh_wnd_cream','fh_skin_burngel','fh_skin_bite','fh_skin_calam','fh_pain_partab','fh_pain_parsol','fh_pain_parsyr','fh_pain_ibu','fh_pain_ibusyr','fh_pain_rub',
 'fh_cold_loz','fh_cold_vrub','fh_cold_inh','fh_cold_cough','fh_cold_combo','fh_cold_anti','fh_stom_ors','fh_stom_orsz','fh_stom_antliq','fh_stom_antfz','fh_stom_probio','fh_kit_eye',
 'hd_hypo_ors','mr_p_coldgel','mr_p_heatrub','mr_p_heatpatch','mr_p_nsaid',
 'sn_skin_itch','sn_sens_wax','sn_sens_tears','sn_sens_eyewash','sn_med_pain','sn_nut_calcium','sn_nut_multi','sn_nut_omega','sn_nut_fibre','sn_foot_fungal']);
/* infant foods: no multi-packs and no own-label lines are offered (R9 open items 4 and own-label note) */
const NO_MULTI=new Set(['mb_nutr_cer','mb_nutr_wean']);

/* ---------- regulators ---------- */
const FLAG={
 tbs:['TBS','TBS','Tanzania Bureau of Standards: cosmetics, food and goods with a compulsory standard','Shirika la Viwango Tanzania: vipodozi, chakula na bidhaa zenye kiwango cha lazima'],
 tmda:['TMDA','TMDA','Tanzania Medicines and Medical Devices Authority: medical devices and diagnostics','Mamlaka ya Dawa na Vifaa Tiba Tanzania: vifaa tiba na vipimo'],
 pp:['Partner pharmacy','Famasia mshirika','Medicines registered with TMDA, sold only by the licensed partner pharmacy','Dawa zilizosajiliwa na TMDA, zinauzwa na famasia mshirika yenye leseni pekee'],
 gen:['General goods','Bidhaa za kawaida','No product registration found; a shipment certificate may still apply','Hakuna usajili wa bidhaa uliopatikana; cheti cha shehena kinaweza kuhitajika'],
 open:['Not yet confirmed','Bado haijathibitishwa','The regulator is still to be confirmed','Mdhibiti bado anasubiri kuthibitishwa']};
const R=(f,en,sw)=>({f,en,sw});
const CATREG={
 mb_preg:R(['tbs','tmda','pp','open'],'Oils and washes are TBS cosmetics; maternity belts and stockings are TMDA devices; bed nets carry a TBS standard; supplements are sold by the partner pharmacy; the regulator for repellents is not yet confirmed.','Mafuta na sabuni maalum ni vipodozi vya TBS; mikanda ya ujauzito na soksi za kubana ni vifaa tiba vya TMDA; vyandarua vina kiwango cha TBS; virutubisho vinauzwa na famasia mshirika; mdhibiti wa dawa za kufukuza mbu bado hajathibitishwa.'),
 mb_bag:R(['tbs','tmda','gen'],'Maternity pads and cotton wool carry TBS standards; clean delivery kits are TMDA devices; clothing and bags are general goods.','Pedi za kujifungulia na pamba zina viwango vya TBS; vifaa safi vya kujifungulia ni vifaa tiba vya TMDA; nguo na mabegi ni bidhaa za kawaida.'),
 mb_post:R(['tmda','tbs','pp','gen'],'Breast pumps are TMDA devices; nipple creams are TBS cosmetics; postnatal vitamins are sold by the partner pharmacy; bras and storage bags are general goods.','Pampu za kukamua maziwa ni vifaa tiba vya TMDA; krimu za chuchu ni vipodozi vya TBS; vitamini za baada ya kujifungua zinauzwa na famasia mshirika; sidiria na mifuko ya kuhifadhi ni bidhaa za kawaida.'),
 mb_napp:R(['tbs'],'Nappies carry a compulsory TBS standard and are on TMDA’s list of possible medical devices; creams and wipes are TBS cosmetics.','Nepi zina kiwango cha lazima cha TBS na ziko kwenye orodha ya TMDA ya bidhaa zinazoweza kuwa vifaa tiba; krimu na wipes ni vipodozi vya TBS.'),
 mb_bath:R(['tbs','gen'],'Cleansers, lotions and oils are TBS cosmetics; towels, tubs and clippers are general goods.','Sabuni laini, losheni na mafuta ni vipodozi vya TBS; taulo, beseni na visu vya kucha ni bidhaa za kawaida.'),
 mb_feed:R(['gen','open'],'Bottles, cups and sterilisers are general goods; the regulator for sterilising tablets is not yet confirmed. Bottles and teats are never promoted, discounted or given away, in line with the WHO Code.','Chupa, vikombe na vifaa vya kuua vijidudu ni bidhaa za kawaida; mdhibiti wa vidonge vya kuua vijidudu bado hajathibitishwa. Chupa na nyonyo hazitangazwi, hazipunguziwi bei wala hazitolewi bure, kwa kufuata Kanuni ya WHO.'),
 mb_hlth:R(['tmda','pp','tbs'],'Thermometers, nasal aspirators and saline drops are TMDA products; rehydration salts, zinc, paracetamol, ibuprofen, antiseptics, chest rubs and deworming tablets are sold by the partner pharmacy.','Vipimajoto, vifaa vya kuvuta kamasi na matone ya chumvi ni bidhaa za TMDA; chumvi za kurudisha maji mwilini, zinki, paracetamol, ibuprofen, dawa za kuua vijidudu, dawa za kupaka kifuani na vidonge vya minyoo vinauzwa na famasia mshirika.'),
 mb_nutr:R(['tbs'],'Complementary foods from 6 months are TBS food. Infant formula is not part of the range.','Vyakula vya nyongeza kuanzia miezi 6 ni chakula kinachodhibitiwa na TBS. Maziwa ya kopo ya watoto si sehemu ya bidhaa.'),
 mb_tod:R(['gen','tbs'],'Potties, teethers and toys are general goods; children’s toothpaste is a TBS cosmetic.','Vyungu vya choo, vya kuota meno na vichezeo ni bidhaa za kawaida; dawa ya meno ya watoto ni kipodozi cha TBS.'),
 mb_sleep:R(['gen','tbs'],'Cot nets carry a TBS standard; the rest are general goods.','Vyandarua vya kitanda cha mtoto vina kiwango cha TBS; vingine ni bidhaa za kawaida.'),
 pc_oral:R(['tbs','gen'],'Toothpastes and mouthwashes are TBS cosmetics; brushes and floss are general goods.','Dawa za meno na za kusukutua ni vipodozi vya TBS; miswaki na uzi wa meno ni bidhaa za kawaida.'),
 pc_bath:R(['tbs','gen'],'Soaps, gels and lotions are TBS cosmetics; tissues carry a TBS standard; sponges are general goods.','Sabuni, jeli na losheni ni vipodozi vya TBS; tishu zina kiwango cha TBS; sponji ni bidhaa za kawaida.'),
 pc_skin:R(['tbs','pp'],'Cleansers, moisturisers and sunscreens are TBS cosmetics; benzoyl peroxide spot gel is sold by the partner pharmacy.','Visafishaji, vilainishi na mafuta ya kuzuia jua ni vipodozi vya TBS; jeli ya chunusi ya benzoyl peroxide inauzwa na famasia mshirika.'),
 pc_hair:R(['tbs','gen'],'Shampoos, oils and stylers are TBS cosmetics; combs, bonnets and ties are general goods.','Shampuu, mafuta na vitengeneza mtindo ni vipodozi vya TBS; masega, kofia za kulalia na vibanio ni bidhaa za kawaida.'),
 pc_deo:R(['tbs'],'TBS cosmetics.','Vipodozi vya TBS.'),
 pc_men:R(['tbs','gen','open'],'Shave gels and aftershaves are TBS cosmetics; razors and clippers are general goods; razor-bump treatments are not yet classified.','Jeli za kunyolea na losheni za baada ya kunyoa ni vipodozi vya TBS; nyembe na mashine za kunyoa ni bidhaa za kawaida; dawa za vipele vya kunyoa bado hazijapangiwa kundi.'),
 pc_per:R(['tbs','tmda','open'],'Pads, liners and tampons carry TBS standards and are on TMDA’s list of possible medical devices; heat patches with a pain claim are TMDA devices; menstrual cups are not yet classified.','Pedi, pedi nyembamba na tamponi zina viwango vya TBS na ziko kwenye orodha ya TMDA ya bidhaa zinazoweza kuwa vifaa tiba; viraka vya joto vinavyodai kupunguza maumivu ni vifaa tiba vya TMDA; vikombe vya hedhi bado havijapangiwa kundi.'),
 pc_lhf:R(['tbs','tmda','pp','gen'],'Balms and creams are TBS cosmetics; corn and blister plasters are TMDA devices; antifungal creams and powders are sold by the partner pharmacy; files and clippers are general goods.','Mafuta na krimu ni vipodozi vya TBS; plasta za sugu na malengelenge ni vifaa tiba vya TMDA; krimu na poda za fangasi zinauzwa na famasia mshirika; tupa na visu vya kucha ni bidhaa za kawaida.'),
 pc_eye:R(['tmda','pp','gen'],'Lens solutions are TMDA products; eye drops, eye washes and ear drops are sold by the partner pharmacy; sleep masks and ear plugs are general goods.','Dawa za kusafishia lenzi ni bidhaa za TMDA; matone ya macho, dawa za kuosha macho na matone ya masikio vinauzwa na famasia mshirika; vitambaa vya kufunika macho na vizibo vya masikio ni bidhaa za kawaida.'),
 pc_srh:R(['tmda','open'],'Condoms and lubricants are TMDA devices; pregnancy and ovulation self-tests are TMDA diagnostics; whether HIV self-tests may be sold in a retail store is not yet confirmed.','Kondomu na vilainishi ni vifaa tiba vya TMDA; vipimo binafsi vya ujauzito na vya siku za kupata mimba ni vipimo vya TMDA; kama vipimo binafsi vya VVU vinaweza kuuzwa dukani bado haijathibitishwa.'),
 fh_wnd:R(['tmda','pp'],'Plasters, gauze, tape and dressings are TMDA devices (gauze and crepe also carry TBS standards); antiseptics, povidone-iodine and healing creams are sold by the partner pharmacy.','Plasta, shashi, utepe na vifaa vya kufunga vidonda ni vifaa tiba vya TMDA (shashi na bandeji pia zina viwango vya TBS); dawa za kuua vijidudu, povidone-iodine na krimu za kuponya vinauzwa na famasia mshirika.'),
 fh_skin:R(['tmda','pp','tbs'],'Hydrogel dressings are TMDA devices; burn, bite and calamine creams are sold by the partner pharmacy; aloe gel is a TBS cosmetic.','Vifaa vya jeli vya kufunga majeraha ya moto ni vifaa tiba vya TMDA; krimu za moto, za kuumwa na wadudu na calamine zinauzwa na famasia mshirika; jeli ya aloe ni kipodozi cha TBS.'),
 fh_pain:R(['pp','tmda'],'Paracetamol, ibuprofen and pain rubs are sold by the partner pharmacy; thermometers are TMDA devices.','Paracetamol, ibuprofen na dawa za kupaka za maumivu zinauzwa na famasia mshirika; vipimajoto ni vifaa tiba vya TMDA.'),
 fh_cold:R(['pp','tmda'],'Lozenges, rubs, inhalers, syrups and antihistamines are sold by the partner pharmacy; saline sprays are TMDA products.','Pipi za koo, dawa za kupaka, vipumulio, sharubati na dawa za mzio vinauzwa na famasia mshirika; dawa za chumvi za kunyunyizia puani ni bidhaa za TMDA.'),
 fh_stom:R(['pp'],'Rehydration salts, zinc, antacids and probiotics are sold by the partner pharmacy.','Chumvi za kurudisha maji mwilini, zinki, dawa za kiungulia na probiotiki vinauzwa na famasia mshirika.'),
 fh_mal:R(['tbs','open'],'Nets carry a TBS standard; repellents, coils and vaporisers are pesticides whose regulator is not yet confirmed.','Vyandarua vina kiwango cha TBS; dawa za kufukuza mbu, koili na vifaa vya mvuke ni viuatilifu ambavyo mdhibiti wake bado hajathibitishwa.'),
 fh_wat:R(['tbs','gen'],'Chlorine treatment carries a TBS standard; filters and bottles are general goods.','Dawa za klorini za kutibu maji zina kiwango cha TBS; vichujio na chupa ni bidhaa za kawaida.'),
 fh_hyg:R(['tbs','tmda','gen'],'Disinfectants carry TBS standards and a TMDA import fee; toilet tissue carries a TBS standard; gloves and sponges are general goods.','Dawa za kuua vijidudu zina viwango vya TBS na ada ya uingizaji ya TMDA; karatasi ya chooni ina kiwango cha TBS; glavu na sponji ni bidhaa za kawaida.'),
 fh_pest:R(['open'],'Pesticides: the regulator is not yet confirmed.','Viuatilifu: mdhibiti bado hajathibitishwa.'),
 fh_kit:R(['tmda','pp','gen'],'First-aid kits are a TMDA device group; eye wash is sold by the partner pharmacy; boxes and scissors are general goods.','Vifaa vya huduma ya kwanza ni kundi la vifaa tiba vya TMDA; dawa ya kuosha macho inauzwa na famasia mshirika; masanduku na mikasi ni bidhaa za kawaida.'),
 fh_ppe:R(['tmda','tbs','gen'],'Examination gloves and medical masks are TMDA devices (gloves also carry a TBS standard); aprons are general goods.','Glavu za uchunguzi na barakoa za kitabibu ni vifaa tiba vya TMDA (glavu pia zina kiwango cha TBS); aproni ni bidhaa za kawaida.'),
 fh_hand:R(['tbs','open'],'Hand sanitisers carry a TBS standard; whether TMDA treats them as antiseptics is not yet confirmed.','Vitakasa mikono vina kiwango cha TBS; kama TMDA inavichukulia kuwa dawa za kuua vijidudu bado haijathibitishwa.'),
 hd_bp:R(['tmda'],'Blood-pressure monitors are TMDA Class B devices.','Vipima shinikizo la damu ni vifaa tiba vya TMDA vya Daraja B.'),
 hd_glu:R(['tmda'],'Glucose meters and strips are TMDA Class C diagnostics; lancets and alcohol pads are TMDA devices.','Vipima sukari na vijiti vyake ni vipimo vya TMDA vya Daraja C; sindano ndogo za kuchoma kidole na vitambaa vya alkoholi ni vifaa tiba vya TMDA.'),
 hd_hypo:R(['open','pp'],'Glucose tablets and powder are TBS food or a medicine, not yet confirmed; rehydration salts are sold by the partner pharmacy.','Vidonge na poda ya glukosi ni chakula cha TBS au dawa, bado haijathibitishwa; chumvi za kurudisha maji mwilini zinauzwa na famasia mshirika.'),
 hd_ins:R(['tmda','gen'],'Pen needles and syringes are TMDA devices (they also carry TBS standards); cool bags are general goods.','Sindano za kalamu na sindano za insulini ni vifaa tiba vya TMDA (pia zina viwango vya TBS); mifuko ya baridi ni bidhaa za kawaida.'),
 hd_foot:R(['tbs','tmda','gen'],'Creams are TBS cosmetics; the foot-wound kit is a TMDA device; socks and clippers are general goods.','Krimu ni vipodozi vya TBS; kifaa cha vidonda vya mguu ni kifaa tiba cha TMDA; soksi na visu vya kucha ni bidhaa za kawaida.'),
 hd_food:R(['tbs'],'TBS food; kitchen scales and spoons are general goods.','Chakula cha TBS; mizani ya jikoni na vijiko ni bidhaa za kawaida.'),
 hd_vit:R(['tmda'],'Pulse oximeters and thermometers are TMDA Class B devices; scales sold for health monitoring are notified with TMDA as Class A.','Vipima oksijeni na vipimajoto ni vifaa tiba vya TMDA vya Daraja B; mizani zinazouzwa kwa kufuatilia afya zinatolewa taarifa TMDA kama Daraja A.'),
 hd_med:R(['gen'],'Pill boxes and organisers are general goods.','Visanduku vya vidonge na vipangaji ni bidhaa za kawaida.'),
 hd_kid:R(['gen'],'General goods.','Bidhaa za kawaida.'),
 mr_walk:R(['tmda'],'Walking sticks, crutches and frames are TMDA devices.','Fimbo, magongo na fremu za kutembelea ni vifaa tiba vya TMDA.'),
 mr_chair:R(['tmda'],'Wheelchairs and commodes are TMDA devices.','Viti vya magurudumu na viti vya choo ni vifaa tiba vya TMDA.'),
 mr_leg:R(['tmda'],'Supports and orthoses are TMDA devices.','Vifaa vya kushikilia viungo ni vifaa tiba vya TMDA.'),
 mr_arm:R(['tmda'],'Supports and orthoses are TMDA devices.','Vifaa vya kushikilia viungo ni vifaa tiba vya TMDA.'),
 mr_spine:R(['tmda'],'Spinal, abdominal and neck supports are TMDA devices.','Vifaa vya kushikilia mgongo, tumbo na shingo ni vifaa tiba vya TMDA.'),
 mr_comp:R(['tmda','tbs','gen'],'Support bandages and compression stockings are TMDA devices (crepe also carries a TBS standard); travel socks are general goods.','Bandeji za kushikilia na soksi za kubana ni vifaa tiba vya TMDA (bandeji ya crepe pia ina kiwango cha TBS); soksi za safari ni bidhaa za kawaida.'),
 mr_wound:R(['tmda'],'Post-surgery dressings, tapes and scar gels are TMDA devices.','Vifaa vya kufunga vidonda baada ya upasuaji, utepe na jeli za makovu ni vifaa tiba vya TMDA.'),
 mr_pain:R(['tmda','pp'],'Heating pads and hot and cold packs are TMDA devices; cold gels, heat rubs, pain patches and anti-inflammatory gels are sold by the partner pharmacy.','Pedi za joto na mifuko ya joto na baridi ni vifaa tiba vya TMDA; jeli za baridi, dawa za kupaka za joto, viraka vya maumivu na jeli za kupunguza uvimbe vinauzwa na famasia mshirika.'),
 mr_rehab:R(['gen','tmda'],'Exercise aids are general goods; TENS units are TMDA devices.','Vifaa vya mazoezi ni bidhaa za kawaida; mashine za TENS ni vifaa tiba vya TMDA.'),
 mr_bath:R(['gen'],'General goods, or TMDA devices where a medical purpose is claimed.','Bidhaa za kawaida, au vifaa tiba vya TMDA pale kusudi la kitabibu linapodaiwa.'),
 mr_press:R(['tmda','gen'],'Pressure-relief mattresses and cushions are TMDA devices; ordinary pillows are general goods.','Magodoro na mito ya kupunguza shinikizo ni vifaa tiba vya TMDA; mito ya kawaida ni bidhaa za kawaida.'),
 sn_cont:R(['tbs','tmda'],'Adult nappies carry a TBS standard and are on TMDA’s list of possible medical devices; urinals and bedpans are TMDA devices; creams and wipes are TBS cosmetics.','Nepi za watu wazima zina kiwango cha TBS na ziko kwenye orodha ya TMDA ya bidhaa zinazoweza kuwa vifaa tiba; vyombo vya mkojo na vya haja ni vifaa tiba vya TMDA; krimu na wipes ni vipodozi vya TBS.'),
 sn_skin:R(['tbs','pp'],'Lotions and creams are TBS cosmetics; medicated anti-itch lotions are sold by the partner pharmacy.','Losheni na krimu ni vipodozi vya TBS; losheni za dawa za kuwasha zinauzwa na famasia mshirika.'),
 sn_oral:R(['tbs','open'],'Toothpastes are TBS cosmetics; the regulator for denture adhesives and cleaners is not yet confirmed.','Dawa za meno ni vipodozi vya TBS; mdhibiti wa gundi na dawa za kusafisha meno ya bandia bado hajathibitishwa.'),
 sn_sens:R(['tmda','pp','gen','open'],'Eye and ear drops are sold by the partner pharmacy; ready-made reading glasses are not yet classified; magnifiers and batteries are general goods.','Matone ya macho na masikio yanauzwa na famasia mshirika; miwani ya kusomea iliyotengenezwa tayari bado haijapangiwa kundi; vikuza na betri ni bidhaa za kawaida.'),
 sn_med:R(['gen','pp'],'Pill organisers, clocks and record books are general goods; paracetamol is sold by the partner pharmacy.','Vipangaji vya vidonge, saa na madaftari ya kumbukumbu ni bidhaa za kawaida; paracetamol inauzwa na famasia mshirika.'),
 sn_nut:R(['tbs','pp'],'Foods and milk powders are TBS food; vitamin, mineral, fish-oil and fibre supplements are sold by the partner pharmacy.','Vyakula na maziwa ya unga ni chakula cha TBS; virutubisho vya vitamini, madini, mafuta ya samaki na nyuzinyuzi vinauzwa na famasia mshirika.'),
 sn_safe:R(['gen'],'General goods; electrical items need a shipment certificate.','Bidhaa za kawaida; vifaa vya umeme vinahitaji cheti cha shehena.'),
 sn_bed:R(['gen','tmda'],'General goods; examination-grade care gloves are TMDA devices.','Bidhaa za kawaida; glavu za daraja la uchunguzi ni vifaa tiba vya TMDA.'),
 sn_foot:R(['tbs','gen','pp'],'Creams are TBS cosmetics; tools are general goods; antifungal creams are sold by the partner pharmacy.','Krimu ni vipodozi vya TBS; vifaa ni bidhaa za kawaida; krimu za fangasi zinauzwa na famasia mshirika.')};

/* ---------- model (follows the funding switch) ---------- */
function M(){const I=window.MODEL.inputs,use=I.seed.use||[],lean=A().isLean();
 const stock=use.find(u=>/^Opening stock/i.test(u[0])),comp=use.find(u=>/compliance/i.test(u[0]));
 const m=stock&&stock[0].match(/(\d+)\s+product families/);
 return {lean,stock:stock?stock[1]:null,fams:m?+m[1]:I.product_families,comp:comp?comp[1]:null,bpi:I.brands_per_item}}

/* ---------- primary visual: families per Care Zone, split by who sells them ---------- */
function zoneSVG(v){const Z=SUM().zones,max=Math.max(...Z.map(z=>z.fam)),W=v?400:1000,rowH=v?98:58,top=v?40:34,lx=v?0:250,bw=W-lx-(v?50:90),H=top+Z.length*rowH+20,dy=v?26:0;
 const rows=Z.map((z,i)=>{const pp=[...PP].filter(k=>k.startsWith(z.k+'_')).length,own=z.fam-pp,y=top+i*rowH,w1=own/max*bw,w2=pp/max*bw;
  return `<g><text x="${v?0:lx-14}" y="${y+(v?14:22)}" text-anchor="${v?'start':'end'}" font-size="16" fill="var(--ink)">${E(TL(z.n))}</text>
   <rect x="${lx}" y="${y+6+dy}" width="${w1}" height="24" fill="var(--green)"/>
   ${pp?`<rect x="${lx+w1}" y="${y+6+dy}" width="${w2}" height="24" fill="url(#s36h${v?'v':''})" stroke="var(--ink)" stroke-width="1" stroke-dasharray="4 3"/>`:''}
   <text x="${lx+w1+w2+10}" y="${y+24+dy}" font-size="16" fill="var(--gold)">${z.fam}</text>
   <text x="${lx}" y="${y+48+dy}" font-size="13" fill="var(--mute)">${E(T(`${own} on Afya’s shelves`,`${own} kwenye rafu za Afya`))}${pp?' · '+E(T(`${pp} at the partner pharmacy`,`${pp} kwenye famasia mshirika`)):''}</text></g>`}).join('');
 return `<svg class="s36-chart ${v?'s36-v':'s36-h'}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="s36ct${v?'v':''}"><title id="s36ct${v?'v':''}">${L('Product families per Care Zone, split between Afya’s own shelves and the partner pharmacy','Familia za bidhaa kwa kila Eneo la Huduma, zikigawanywa kati ya rafu za Afya na famasia mshirika')}</title>
  <defs><pattern id="s36h${v?'v':''}" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="8" stroke="var(--mute)" stroke-width="2"/></pattern></defs>
  ${v?'':`<line x1="${lx}" y1="${top-6}" x2="${lx}" y2="${H-14}" stroke="var(--line)"/>`}
  <rect x="${lx}" y="4" width="14" height="14" fill="var(--green)"/><text x="${lx+22}" y="16" font-size="13" fill="var(--mute)">${L('Afya’s shelves','Rafu za Afya')}</text>
  <rect x="${lx+(v?150:190)}" y="4" width="14" height="14" fill="url(#s36h${v?'v':''})" stroke="var(--ink)" stroke-dasharray="4 3"/><text x="${lx+(v?172:212)}" y="16" font-size="13" fill="var(--mute)">${L('Medicines: partner pharmacy','Dawa: famasia mshirika')}</text>
  ${rows}</svg>`}

/* ---------- catalogue explorer (lib.js loaded on demand) ---------- */
const ST={z:'mb',f:'all',shelf:'all',q:''};
function needLib(cb){if(window.AFYA_LIB)return cb();
 if(!document.getElementById('r6lib')){const s=document.createElement('script');s.id='r6lib';s.src='sections/range/lib.js?v=2';s.async=true;document.head.appendChild(s)}
 let n=0;const t=setInterval(()=>{if(window.AFYA_LIB){clearInterval(t);cb()}else if(++n>200){clearInterval(t);const r=document.getElementById('s36Res');if(r)r.innerHTML=`<p class="ab-mute">${L('The catalogue could not be loaded. Reload the page to try again.','Katalogi haikuweza kupakiwa. Pakia ukurasa upya kujaribu tena.')}</p>`}},50)}
const chip=k=>`<span class="s36-chip s36-${k}">${L(FLAG[k][0],FLAG[k][1])}</span>`;
/* medicine families show only the real shop listings: no Afya own-label medicine and no Afya pack variants (D-5) */
function famProducts(f){const P=window.AFYA_LIB.P,pp=PP.has(f.k);return f.p.map(i=>P[i]).filter(x=>pp?(x[5]!=='OWN'&&x[9]<=1):!(NO_MULTI.has(f.k)&&(x[9]===2||x[9]===3||x[5]==='OWN')))}
function priceCell(x,isPP){if(isPP)return `<span class="ab-mute">${L('Sold and priced by the partner pharmacy','Inauzwa na kuwekewa bei na famasia mshirika')}</span>`;
 const src=x[6]?` <a href="${E(x[6])}" target="_blank" rel="noopener">${L('source','chanzo')}</a>`:'';const k=x[9];
 if(x[5]==='OWN')return `<span class="ab-gold">${tsh(x[4])}</span> ${est()}<br><span class="ab-mute">${L('Afya own label, planned for launch phase 2','Chapa ya Afya, imepangwa kwa awamu ya 2 ya uzinduzi')}</span>`;
 if(k===2||k===4)return `<span class="ab-gold">${tsh(x[4])}</span> ${est()}<br><span class="ab-mute">${k===2?L('Planned two-pack','Pakiti mbili iliyopangwa'):L('Planned small pack','Pakiti ndogo iliyopangwa')}</span>`;
 if(x[5]==='KE'&&x[7]>0)return `<span class="ab-gold">${tsh(x[7]*KES)}</span><br><span class="ab-mute">${L('Kenyan shelf price','Bei ya rafu Kenya')}: KES ${nf(x[7])} × ${KES} (BoT, ${FXD})${src}</span>`;
 if(x[5]==='EST'||k===1)return `<span class="ab-gold">${tsh(x[4])}</span> ${est()}${src?`<br><span class="ab-mute">${src}</span>`:''}`;
 return `<span class="ab-gold">${tsh(x[4])}</span><br><span class="ab-mute">${L('Tanzanian shelf price','Bei ya rafu Tanzania')}${src}</span>`}
function famBody(f){const isPP=PP.has(f.k),rows=famProducts(f);
 return `<p>${E(TL(f.best))}</p>${isPP?`<p class="ab-notice">${L('Medicine: sold only by the licensed partner pharmacy at its own counter. Not stocked or priced by Afya Basics.','Dawa: inauzwa na famasia mshirika yenye leseni pekee kwenye kaunta yake. Haiwekwi stoo wala haiwekewi bei na Afya Basics.')}</p>`:''}
 <div class="ab-tw"><table class="ab-t"><thead><tr><th>${L('Product','Bidhaa')}</th><th>${L('Brand','Chapa')}</th><th>${L('Pack','Pakiti')}</th><th>${isPP?L('Seller','Muuzaji'):L('Shelf price','Bei ya rafu')}</th></tr></thead><tbody>
 ${rows.map(x=>`<tr><td><span lang="en">${E(x[1])}</span></td><td><span lang="en">${E(x[2]||'')}</span></td><td>${E(x[3]||'')}</td><td>${priceCell(x,isPP)}</td></tr>`).join('')}</tbody></table></div>`}
function results(){const Lb=window.AFYA_LIB,q=ST.q.trim().toLowerCase();let nf_=0,np=0;
 const cats=Lb.cats.filter(c=>(ST.z==='all'||c.z===ST.z)&&(ST.f==='all'||(CATREG[c.k]&&CATREG[c.k].f.includes(ST.f))));
 const html=cats.map(c=>{const reg=CATREG[c.k]||R(['open'],'','');
  const fams=Lb.fams.map((f,i)=>[f,i]).filter(([f])=>f.cat===c.k&&(ST.shelf==='all'||(ST.shelf==='pp')===PP.has(f.k))&&(!q||(f.txt||'').includes(q)||f.n[0].toLowerCase().includes(q)||f.n[1].toLowerCase().includes(q)));
  if(!fams.length)return '';
  const items=fams.map(([f,i])=>{const n=famProducts(f).length;nf_++;np+=n;return `<details class="s36-fam" data-f="${i}"><summary><span>${E(TL(f.n))}</span><small>${E(n===1?T("1 product","bidhaa 1"):T(`${n} products`,`bidhaa ${n}`))}</small>${PP.has(f.k)?chip('pp'):''}</summary><div class="s36-fb"></div></details>`}).join('');
  return `<section class="s36-cat"><div class="s36-ch"><h3>${E(TL(c.n))}</h3><div class="s36-chips">${reg.f.map(chip).join('')}</div></div><p class="ab-mute">${E(TL(c.d))}</p>${reg.en?`<p class="s36-reg">${L(reg.en,reg.sw)}</p>`:''}${items}</section>`}).join('');
 return `<p class="s36-cnt" aria-live="polite">${E(T(`Showing ${nf_} families and ${nf(np)} products`,`Inaonyesha familia ${nf_} na bidhaa ${nf(np)}`))}</p>${html||`<p class="ab-mute">${L('Nothing matches these filters.','Hakuna kinacholingana na vichujio hivi.')}</p>`}`}
function controlsHTML(){const Z=SUM().zones;
 return `<div class="s36-ctl">
  <label class="s36-lb">${L('Care Zone','Eneo la Huduma')}<select id="s36Z">${[['all',T('All six zones','Maeneo yote sita')],...Z.map(z=>[z.k,TL(z.n)])].map(o=>`<option value="${o[0]}"${ST.z===o[0]?' selected':''}>${E(o[1])}</option>`).join('')}</select></label>
  <label class="s36-lb">${L('Regulator','Mdhibiti')}<select id="s36F">${[['all',T('All regulators','Wadhibiti wote')],...Object.keys(FLAG).map(k=>[k,T(FLAG[k][0],FLAG[k][1])])].map(o=>`<option value="${o[0]}"${ST.f===o[0]?' selected':''}>${E(o[1])}</option>`).join('')}</select></label>
  <label class="s36-lb">${L('Sold by','Inauzwa na')}<select id="s36S">${[['all',T('Everyone in the store','Wote dukani')],['afya',T('Afya Basics','Afya Basics')],['pp',T('Partner pharmacy','Famasia mshirika')]].map(o=>`<option value="${o[0]}"${ST.shelf===o[0]?' selected':''}>${E(o[1])}</option>`).join('')}</select></label>
  <label class="s36-lb s36-q">${L('Search','Tafuta')}<input type="search" id="s36Q" value="${E(ST.q)}" placeholder="${L('nappies, thermometer, uji…','nepi, kipimajoto, uji…')}"></label></div>`}

/* ---------- the Lishe nutrition shelf (R9) ---------- */
function lisheHTML(){const N=((window.AFYA_DATA||{}).nutrition)||[];if(!N.length)return '';
 const band=x=>x.age_from_months==null?T('All ages in the family','Umri wote katika familia'):x.age_to_months==null?T(`From ${x.age_from_months} months`,`Kuanzia miezi ${x.age_from_months}`):T(`${x.age_from_months} to ${x.age_to_months} months`,`Miezi ${x.age_from_months} hadi ${x.age_to_months}`);
 const G=new Map();N.forEach(x=>{const k=band(x);if(!G.has(k))G.set(k,[]);G.get(k).push(x)});
 const price=x=>{const s=x.src&&x.src.u?` <a href="${E(x.src.u)}" target="_blank" rel="noopener">${E(x.src.name||T('source','chanzo'))}</a>`:'';
  return x.status==='KE'&&x.orig?`${tsh(x.price_tsh)}<br><span class="ab-mute">${L('Kenyan shelf price','Bei ya rafu Kenya')}: ${E(x.orig.cur)} ${nf(x.orig.amount)} × ${x.orig.rate} (BoT, ${FXD})${s}</span>`:`${tsh(x.price_tsh)}<br><span class="ab-mute">${L('Tanzanian shelf price','Bei ya rafu Tanzania')}${s}</span>`};
 return [...G].map(([g,rows])=>`<h3>${E(g)}</h3><div class="ab-tw"><table class="ab-t"><thead><tr><th>${L('Food','Chakula')}</th><th>${L('Why it is on the shelf','Kwa nini kiko rafuni')}</th><th>${L('Shelf price','Bei ya rafu')}</th></tr></thead><tbody>${rows.map(x=>`<tr><td><b>${E(T(x.name.en,x.name.sw))}</b><br><span class="ab-mute" lang="en">${E(x.brand||'')} · ${E(x.product||'')} · ${E(x.pack||'')}</span></td><td>${E(T(x.why.en,x.why.sw))}</td><td class="s36-pr">${price(x)}</td></tr>`).join('')}</tbody></table></div>`).join('')}

/* ---------- regulator summary ---------- */
function regTable(){const C=SUM().zones.flatMap(z=>z.cats);const cnt=k=>C.filter(c=>CATREG[c.k]&&CATREG[c.k].f.includes(k)).length;
 return `<div class="ab-tw"><table class="ab-t"><thead><tr><th>${L('Flag','Alama')}</th><th>${L('What it covers','Inahusu nini')}</th><th>${L('Categories with products under it','Makundi yenye bidhaa chini yake')}</th></tr></thead><tbody>
  ${Object.keys(FLAG).map(k=>`<tr><td>${chip(k)}</td><td>${L(FLAG[k][2],FLAG[k][3])}</td><td class="ab-n">${cnt(k)} ${L('of','kati ya')} ${C.length}</td></tr>`).join('')}</tbody></table></div>`}

function costTable(m){const N=(k,v,f)=>A().numHTML(k,v,f);
 return `<div class="ab-tw"><table class="ab-t"><thead><tr><th>${L('Line','Kipengele')}</th><th>${L('Amount','Kiasi')}</th></tr></thead><tbody>
 <tr><td>${m.lean?L('Seed line: opening stock, core product families','Mstari wa mtaji wa awali: bidhaa za kuanzia, familia kuu za bidhaa'):L('Seed line: opening stock, the full range','Mstari wa mtaji wa awali: bidhaa za kuanzia, bidhaa zote')} ${est()}</td><td class="ab-n">${m.stock==null?'—':N('s36stock',m.stock,'tsh')}</td></tr>
 <tr><td>${L('Seed line: launch compliance fees (licences, registrations, first shipment certificate), locally registered products','Mstari wa mtaji wa awali: ada za kufuata sheria wakati wa uzinduzi (leseni, usajili, cheti cha shehena ya kwanza), bidhaa zilizosajiliwa nchini')} ${est()}</td><td class="ab-n">${m.comp==null?'—':N('s36comp',m.comp,'tsh')}</td></tr>
 <tr><td>${L('TMDA permit for a retail medical device outlet, a year','Kibali cha TMDA cha duka la rejareja la vifaa tiba, kwa mwaka')}</td><td class="ab-n">TSh 100,000</td></tr>
 <tr><td>${L('Launch phase 2: TBS registration of a cosmetic product Afya imports itself, valid 5 years (half for a colour or scent variant)','Awamu ya 2 ya uzinduzi: usajili wa TBS wa kipodozi ambacho Afya inaingiza yenyewe, halali miaka 5 (nusu kwa toleo la rangi au harufu)')}</td><td class="ab-n">TSh 440,000</td></tr>
 <tr><td>${L('Launch phase 2: own registration of 20 self-imported products','Awamu ya 2 ya uzinduzi: usajili wa bidhaa 20 zinazoingizwa na Afya yenyewe')} ${est()}</td><td class="ab-n">TSh 11.1M</td></tr>
 </tbody></table></div>
 <p class="ab-mute" style="margin-top:var(--s2)">${L('Seed lines are from the Afya Basics financial model v1.2 and follow the funding option selected at the top of the page. Fees are from the TMDA and TBS fee regulations; the phase-2 total is a planning estimate.','Mistari ya mtaji wa awali inatoka modeli ya fedha ya Afya Basics v1.2 na inafuata chaguo la ufadhili lililochaguliwa juu ya ukurasa. Ada zinatoka kanuni za ada za TMDA na TBS; jumla ya awamu ya 2 ni makadirio ya mipango.')}</p>`}

const SRC=()=>{const base=[
 {t:T('Afya Basics range catalogue, November 2026: 6 Care Zones, 61 categories, 523 families, 2,796 product lines, with a source link for every shop price','Katalogi ya bidhaa za Afya Basics, Novemba 2026: Maeneo 6 ya Huduma, makundi 61, familia 523, bidhaa 2,796, kila bei ya duka ikiwa na kiungo cha chanzo'),u:'',lang:lang()},
 {t:T('Afya Basics financial model v1.2, base case: opening stock and compliance seed lines (planning estimates)','Modeli ya fedha ya Afya Basics v1.2, hali ya msingi: mistari ya mtaji wa awali ya bidhaa za kuanzia na ada za kufuata sheria (makadirio ya mipango)'),u:'',lang:lang()},
 {t:'TMDA, Compendium of guidelines for marketing authorisation of medical devices, diagnostics and laboratory equipment, June 2024 (classification rules; borderline products, pp. 35–37)',u:'https://www.tmda.go.tz/uploads/publications/en1755088789-Compendium%20of%20Guidelines%20for%20Marketing%20Authorization%20of%20Medical%20Devices,%20Diagnostics%20and%20Laboratory%20Equipment,%20June%202024.pdf',chk:'9 Nov 2026'},
 {t:'TMDA, Registration and licensing of premises: retail premises for medicines are licensed by the Pharmacy Council',u:'https://www.tmda.go.tz/pages/registration-and-licensing-of-premises',chk:'9 Nov 2026'},
 {t:'TMDA, Fees and Charges (Amendment) Regulations 2024: retail medical device outlet TZS 100,000',u:'https://www.tmda.go.tz/uploads/1718887575-FEES%20AND%20CHARGES%20AMENDMENT%20JUNE%202024%20FINAL.pdf',chk:'9 Nov 2026'},
 {t:'TBS, Standards (Imports Registration and Batch Certification) Regulations 2021, GN 681',u:'https://www.tbs.go.tz/uploads/documents/sw-1786362149-The%20Standards%20(%20Imports%20Registration%20And%20Batch%20Certification)%20Regulations,%202021.pdf',chk:'9 Nov 2026'},
 {t:'TBS, Standards (Fees and Charges) Regulations 2021: cosmetic product registration TZS 440,000',u:'https://www.tbs.go.tz/uploads/documents/en-1786361569-The%20Standards%20(Fees%20and%20Charges)%20Regulations,%202021.pdf',chk:'9 Nov 2026'},
 {t:'TBS, List of compulsory Tanzania standards, October 2026',u:'https://www.tbs.go.tz/uploads/text-editor/files/LIST%20OF%20COMPULSORY%20TANZANIA%20STANDARD_1793265667.pdf',chk:'9 Nov 2026'},
 {t:'WHO fact sheet: Infant and young child feeding',u:'https://www.who.int/news-room/fact-sheets/detail/infant-and-young-child-feeding',chk:'10 Nov 2026'},
 {t:'WHO health topic: Complementary feeding',u:'https://www.who.int/health-topics/complementary-feeding',chk:'10 Nov 2026'},
 {t:'WHO guideline for complementary feeding of infants and young children 6–23 months of age, 2023',u:'https://www.who.int/publications/i/item/9789240081864',chk:'10 Nov 2026'},
 {t:'WHO, International Code of Marketing of Breast-milk Substitutes (1981)',u:'https://www.who.int/publications/i/item/9241541601'},
 {t:'WHO eLENA: Regulation of the marketing of breast-milk substitutes',u:'https://www.who.int/tools/elena/interventions/regulation-breast-milk-substitutes',chk:'10 Nov 2026'},
 {t:'Bank of Tanzania, exchange rates: KES 1 = TSh 20.33 (mean rate, trading date 10 Nov 2026)',u:'https://www.bot.go.tz/ExchangeRate/excRates',chk:'9 Nov 2026'}];
 const seen=new Set(base.map(x=>x.u));const more=(SUM().refs||[]).filter(r=>r[1]&&!seen.has(r[1])).map(r=>({t:r[0],u:r[1]}));return base.concat(more)};

const CSS=`
.s36 figure.ab-visual{margin-left:0;margin-right:0}
.s36 figcaption{margin-top:var(--s2);color:var(--mute);font-size:var(--fs-cap);max-width:var(--measure)}
.s36 .s36-chart{display:block;width:100%;height:auto}
.s36 .s36-v{display:none;max-width:480px}
@media (max-width:720px){.s36 .s36-h{display:none}.s36 .s36-v{display:block}}
.s36 .ab-block p+p,.s36 .ab-block h2+p{margin-top:var(--s2)}
.s36 h3{font-size:var(--fs-sub);font-weight:600;margin:var(--s4) 0 0}
.s36 .s36-ctl{display:flex;flex-wrap:wrap;gap:var(--s2);margin-top:var(--s3);align-items:flex-end}
.s36 .s36-lb{display:flex;flex-direction:column;gap:6px;color:var(--mute);font-size:var(--fs-cap);min-width:0}
.s36 .s36-lb select,.s36 .s36-lb input{background:var(--surface);color:var(--ink);border:1px solid var(--line);border-radius:8px;padding:9px 12px;font:inherit;font-size:calc(var(--fs-body) - 2px);min-height:40px;max-width:100%}
.s36 .s36-lb select:focus,.s36 .s36-lb input:focus{outline:2px solid var(--green-edge);outline-offset:1px}
.s36 .s36-q{flex:1 1 220px}
.s36 .s36-cnt{margin-top:var(--s3);color:var(--mute);font-size:var(--fs-cap)}
.s36 .s36-cat{margin-top:var(--s4);border-top:1px solid var(--line);padding-top:var(--s3)}
.s36 .s36-ch{display:flex;flex-wrap:wrap;gap:var(--s1) var(--s2);align-items:baseline}
.s36 .s36-ch h3{margin:0}
.s36 .s36-chips{display:flex;flex-wrap:wrap;gap:6px}
.s36 .s36-chip{display:inline-block;font-size:var(--fs-cap);border:1px solid var(--line);border-radius:999px;padding:1px 9px;color:var(--ink);white-space:nowrap}
.s36 .s36-tbs{border-color:var(--green-edge)}
.s36 .s36-tmda{background:var(--green-deep);border-color:var(--green-deep)}
.s36 .s36-pp{border-style:dashed;border-color:var(--ink)}
.s36 .s36-gen{color:var(--mute)}
.s36 .s36-open{color:var(--mute);border-style:dotted}
.s36 .s36-cat>p{margin-top:var(--s1);max-width:var(--measure)}
.s36 .s36-reg{font-size:calc(var(--fs-body) - 2px)}
.s36 .s36-fam{border-bottom:1px solid var(--line)}
.s36 .s36-fam:first-of-type{margin-top:var(--s2);border-top:1px solid var(--line)}
.s36 .s36-fam summary{display:flex;flex-wrap:wrap;gap:6px var(--s2);align-items:baseline;padding:10px 0;cursor:pointer;list-style:none}
.s36 .s36-fam summary::-webkit-details-marker{display:none}
.s36 .s36-fam summary::before{content:'+';color:var(--mute);width:12px}
.s36 .s36-fam[open] summary::before{content:'–'}
.s36 .s36-fam summary small{color:var(--mute);font-size:var(--fs-cap)}
.s36 .s36-fb{padding:0 0 var(--s2) 20px}
.s36 .s36-fb>p{max-width:var(--measure)}
.s36 .s36-fb table{min-width:560px}
.s36 td.s36-pr{color:var(--gold);font-variant-numeric:tabular-nums;min-width:200px;max-width:280px}
@media (max-width:720px){.s36 .s36-lb{flex:1 1 100%}.s36 .s36-fb{padding-left:0}}
`;

function render(s,p,pv,nx){const m=M(),t=SUM().tot,ppN=PP.size;
 const figs=[
  {v:nf(t.fam),l:T('Product families in six Care Zones and 61 categories','Familia za bidhaa katika Maeneo sita ya Huduma na makundi 61'),s:L('Range catalogue, November 2026','Katalogi ya bidhaa, Novemba 2026')},
  {v:nf(t.prod),l:T('Product lines, each with a brand, a pack and a price','Bidhaa, kila moja na chapa, pakiti na bei'),s:L(`${nf(t.kinds[0])} with a shop price and link`,`${nf(t.kinds[0])} zina bei ya duka na kiungo`)},
  {v:`${A().numHTML('s36open',m.fams,'int')} ${est()}`,l:m.lean?T('Core families on the shelves of the 100 m² store at opening','Familia kuu kwenye rafu za duka la m² 100 siku ya kufungua'):T('Families on the shelves of the flagship at opening','Familia kwenye rafu za duka kuu siku ya kufungua'),s:L('Financial model v1.2, opening stock line','Modeli ya fedha v1.2, mstari wa bidhaa za kuanzia')},
  {v:String(ppN),l:T('Medicine families, sold only by the partner pharmacy','Familia za dawa, zinauzwa na famasia mshirika pekee'),s:L('Regulator review of the catalogue','Mapitio ya wadhibiti kwa katalogi')}];
 const open=[
  L('Most shelf prices in the catalogue are Kenyan listings converted to shillings, because the Tanzanian shops checked do not list them online. Before launch the buyer replaces them with Tanzanian distributor quotes; they are used to size the range, not as final prices.','Bei nyingi za rafu katika katalogi ni bei za Kenya zilizobadilishwa kuwa shilingi, kwa sababu maduka ya Tanzania yaliyokaguliwa hayaziweki mtandaoni. Kabla ya uzinduzi mnunuzi atazibadilisha kwa bei za wasambazaji wa Tanzania; zinatumika kupima ukubwa wa bidhaa, si kama bei za mwisho.'),
  L('Tanzanian brands and prices of uji wa lishe flours are still to be collected in shops and from distributors; the shelf shows Kenyan prices for now.','Chapa na bei za Tanzania za unga wa uji wa lishe bado zinakusanywa madukani na kwa wasambazaji; kwa sasa rafu inaonyesha bei za Kenya.'),
  L('The current text of Tanzania’s 2013 regulations on marketing foods for infants and young children is to be read with TMDA, including whether complementary foods may carry a member saving.','Maandishi ya sasa ya kanuni za Tanzania za 2013 kuhusu matangazo ya vyakula vya watoto wachanga na wadogo yatasomwa pamoja na TMDA, ikiwemo kama vyakula vya nyongeza vinaweza kupata punguzo la mwanachama.'),
  L('Regulator not yet confirmed for repellents, coils and insecticides, sterilising tablets, menstrual cups, denture products, reading glasses and glucose tablets. Whether HIV self-tests may be sold in a retail store is to be checked.','Mdhibiti bado hajathibitishwa kwa dawa za kufukuza mbu, koili na viuatilifu, vidonge vya kuua vijidudu, vikombe vya hedhi, bidhaa za meno ya bandia, miwani ya kusomea na vidonge vya glukosi. Kama vipimo binafsi vya VVU vinaweza kuuzwa dukani bado kunakaguliwa.'),
  L('TMDA’s written view on nappies, sanitary pads and adult incontinence pads sold without medical claims is still to be obtained.','Maoni ya maandishi ya TMDA kuhusu nepi, pedi za hedhi na pedi za watu wazima zinazouzwa bila madai ya kitabibu bado yanasubiriwa.'),
  m.lean?L('Which families make up the core set for the 100 m² store is chosen from first sales; slower lines are ordered for delivery.','Familia zipi zitaunda seti kuu ya duka la m² 100 zitachaguliwa kutokana na mauzo ya mwanzo; bidhaa zinazouzwa polepole zinaagizwa kwa usafirishaji.'):L('Shelf space per family is set with the final fit-out drawings.','Nafasi ya rafu kwa kila familia itapangwa pamoja na michoro ya mwisho ya kuandaa duka.')];
 return `<article class="ab-sec s36" aria-labelledby="h-s3-6"><style>${CSS}</style><div class="ab-wrap">
 <div class="ab-sec-no">${E(s.no)}</div><h1 id="h-s3-6">${E(s.title)}</h1>
 <p class="ab-summary">${L(`The range is ${nf(t.fam)} product families and ${nf(t.prod)} product lines across six Care Zones, each family with a reason to be on the shelf and a sourced price. Every category carries the regulator that governs it: TBS for cosmetics and food, TMDA for medical devices. Medicines are not Afya stock: the licensed partner pharmacy sells all of them. Infant formula is never listed. Filter the catalogue below, then see the Lishe nutrition shelf.`,`Bidhaa ni familia ${nf(t.fam)} na bidhaa ${nf(t.prod)} katika Maeneo sita ya Huduma, kila familia ikiwa na sababu ya kuwa rafuni na bei yenye chanzo. Kila kundi linaonyesha mdhibiti wake: TBS kwa vipodozi na chakula, TMDA kwa vifaa tiba. Dawa si bidhaa za Afya: famasia mshirika yenye leseni inaziuza zote. Maziwa ya kopo ya watoto hayaorodheshwi kamwe. Chuja katalogi hapa chini, kisha tazama rafu ya Lishe.`)}</p>

 <figure class="ab-visual">${zoneSVG(false)}${zoneSVG(true)}
  <figcaption>${L('Product families per Care Zone. Hatched: medicine families, sold at the partner pharmacy counter and not stocked by Afya. Source: Afya Basics range catalogue, November 2026.','Familia za bidhaa kwa kila Eneo la Huduma. Mistari ya mshazari: familia za dawa, zinauzwa kwenye kaunta ya famasia mshirika na hazibebwi na Afya. Chanzo: katalogi ya bidhaa za Afya Basics, Novemba 2026.')}</figcaption></figure>

 <div class="ab-body">
 <section class="ab-block"><h2>${L('How the range is built','Jinsi bidhaa zilivyopangwa')}</h2>
  <p>${L('The store is organised around a person and a situation, not a product category. Each of the six Care Zones answers one kind of household need, and within it the categories follow the order in which that need arises: for a new mother, pregnancy, the birth bag, the first weeks, nappies, bathing, feeding, health, food, the toddler years and safe sleep.','Duka limepangwa kumzunguka mtu na hali yake, si aina ya bidhaa. Kila moja ya Maeneo sita ya Huduma linajibu aina moja ya hitaji la kaya, na ndani yake makundi yanafuata mpangilio ambao hitaji hilo linatokea: kwa mama mpya, ujauzito, begi la kujifungulia, wiki za mwanzo, nepi, kuoga, kulisha, afya, chakula, miaka ya utoto wa mwanzo na usingizi salama.')}</p>
  <p>${L(`A family is one need, such as digital thermometers or nappy-rash creams. Each family carries a short note on who it is best for, and offers ${m.bpi} brands in the same price range so that members can swap at the shelf or in the app. Families are sorted into winning lines that are always at eye level, core lines that complete the range, specialist lines of low volume and high value, and seasonal lines built up ahead of the rains, the cool season, school terms and the holidays.`,`Familia ni hitaji moja, kama vipimajoto vya kidijitali au krimu za vipele vya nepi. Kila familia ina maelezo mafupi ya inamfaa nani zaidi, na inatoa chapa ${m.bpi} za bei inayolingana ili wanachama wabadilishe rafuni au kwenye programu. Familia zimegawanywa kuwa bidhaa bora zilizo daima usawa wa macho, bidhaa za msingi zinazokamilisha mpangilio, bidhaa maalum za mauzo madogo na thamani kubwa, na bidhaa za msimu zinazoandaliwa kabla ya mvua, msimu wa baridi, mihula ya shule na sikukuu.`)}</p>
  <p>${m.lean?L(`In the start-small option the 100 m² store opens with about ${m.fams} core families on fewer bays. The rest of the range stays in the catalogue and is ordered for delivery.`,`Katika chaguo la kuanza kidogo duka la m² 100 linafunguliwa na takriban familia kuu ${m.fams} kwenye rafu chache zaidi. Bidhaa nyingine zinabaki kwenye katalogi na zinaagizwa kwa usafirishaji.`)
   :L(`In the flagship the opening stock covers about ${m.fams} families. Slower variants are held in the stockroom and ordered at the counter or in the app, so the floor stays uncluttered.`,`Katika duka kuu bidhaa za kuanzia zinahusisha takriban familia ${m.fams}. Aina zinazouzwa polepole zinawekwa stoo na kuagizwa kwenye kaunta au kwenye programu, ili sakafu ibaki nadhifu.`)}</p>
 </section>

 <section class="ab-block"><h2>${L('What is on Afya’s shelves, and what is not','Kilicho kwenye rafu za Afya, na kisichokuwepo')}</h2>
  <p>${L(`Afya Basics does not sell medicines. ${ppN} families in the catalogue are medicines or supplements: paracetamol and ibuprofen, rehydration salts and zinc, cough and cold remedies, antiseptic and antifungal creams, eye and ear drops, deworming tablets and vitamin and mineral supplements. They are listed here so that the investor sees the whole need each zone answers, but every one is sold and priced only by the licensed partner pharmacy at its own counter. None is stocked, priced or put in an Afya Box by Afya.`,`Afya Basics haiuzi dawa. Familia ${ppN} katika katalogi ni dawa au virutubisho: paracetamol na ibuprofen, chumvi za kurudisha maji mwilini na zinki, dawa za kikohozi na mafua, krimu za kuua vijidudu na za fangasi, matone ya macho na masikio, vidonge vya minyoo na virutubisho vya vitamini na madini. Zimeorodheshwa hapa ili mwekezaji aone hitaji lote linalojibiwa na kila eneo, lakini kila moja inauzwa na kuwekewa bei na famasia mshirika yenye leseni pekee kwenye kaunta yake. Hakuna inayowekwa stoo, kuwekewa bei au kuwekwa kwenye Afya Box na Afya.`)}</p>
  <p>${L('Infant formula is not part of the range. It is never displayed, listed, discounted or put in a box; a family whose health worker advises it can ask for it, at the ordinary price. Multi-packs of infant cereal are not offered either.','Maziwa ya kopo ya watoto si sehemu ya bidhaa. Hayaonyeshwi, hayaorodheshwi, hayapunguziwi bei wala hayawekwi kwenye boksi; familia ambayo mhudumu wake wa afya ameyashauri inaweza kuyaomba, kwa bei ya kawaida. Pakiti nyingi za nafaka za watoto hazitolewi pia.')}</p>
  <p>${L('The store opens with products already registered in Tanzania by their local distributors. Afya’s own-label lines, shown in the catalogue as planned and priced as estimates, follow in launch phase 2, once Afya registers its own products with TBS.','Duka linafunguliwa na bidhaa ambazo tayari zimesajiliwa Tanzania na wasambazaji wa ndani. Bidhaa za chapa ya Afya, zinazoonyeshwa katika katalogi kama zilizopangwa na bei zake kama makadirio, zinafuata katika awamu ya 2 ya uzinduzi, Afya itakaposajili bidhaa zake yenyewe TBS.')}</p>
 </section>

 <section class="ab-block"><h2>${L('Who regulates what','Nani anadhibiti nini')}</h2>
  <p>${L('Cosmetics and food are regulated by the Tanzania Bureau of Standards (TBS), which moved them from TMDA on 1 July 2019. Medical devices and diagnostics, from thermometers and blood-pressure monitors to walking aids, supports and pregnancy tests, are regulated by TMDA. Many everyday goods also carry a compulsory TBS standard, so a shipment needs a certificate of conformity even when the product itself needs no registration. Nappies, sanitary pads and adult incontinence pads sit on both lists.','Vipodozi na chakula vinadhibitiwa na Shirika la Viwango Tanzania (TBS), lililovichukua kutoka TMDA tarehe 1 Julai 2019. Vifaa tiba na vipimo, kuanzia vipimajoto na vipima shinikizo la damu hadi vifaa vya kutembelea, vya kushikilia viungo na vipimo vya ujauzito, vinadhibitiwa na TMDA. Bidhaa nyingi za kila siku pia zina kiwango cha lazima cha TBS, kwa hiyo shehena inahitaji cheti cha ulinganifu hata kama bidhaa yenyewe haihitaji usajili. Nepi, pedi za hedhi na pedi za watu wazima ziko kwenye orodha zote mbili.')}</p>
  <p>${L('Each category in the catalogue shows its flags and a line on the families that differ. A category can carry more than one flag.','Kila kundi katika katalogi linaonyesha alama zake na mstari kuhusu familia zinazotofautiana. Kundi moja linaweza kuwa na alama zaidi ya moja.')}</p>
  ${regTable()}
 </section>

 <section class="ab-block"><h2>${L('The catalogue','Katalogi')}</h2>
  <p>${L('Choose a zone, a regulator or who sells it, or search. Open any family to see its products, packs and shelf prices, each with where the price comes from.','Chagua eneo, mdhibiti au anayeuza, au tafuta. Fungua familia yoyote kuona bidhaa zake, pakiti na bei za rafu, kila bei ikiwa na chanzo chake.')}</p>
  ${controlsHTML()}
  <div id="s36Res"><p class="s36-cnt">${L('Loading the catalogue…','Katalogi inapakiwa…')}</p></div>
  <p class="ab-mute" style="margin-top:var(--s3)">${L(`Prices: ${nf(t.tz)} lines carry a Tanzanian shop price and ${nf(t.ke)} a Kenyan shop price converted at KES 1 = TSh ${KES} (BoT, ${FXD}). Two-packs, small packs and own-label lines are planned and priced as estimates.`,`Bei: bidhaa ${nf(t.tz)} zina bei ya duka la Tanzania na ${nf(t.ke)} bei ya duka la Kenya iliyobadilishwa kwa KES 1 = TSh ${KES} (BoT, ${FXD}). Pakiti mbili, pakiti ndogo na bidhaa za chapa ya Afya zimepangwa na bei zake ni makadirio.`)}</p>
 </section>

 <section class="ab-block"><h2>${L('The Lishe nutrition shelf','Rafu ya Lishe')}</h2>
  <p>${L('Beside Mother & Baby, Lishe offers foods for the child and the mother. The family chooses: nothing on it is put in a box automatically. Following WHO and UNICEF guidance, a baby under 6 months needs breast milk only, so the shelf offers nothing for that age. Complementary foods start at 6 months, alongside breastfeeding to 2 years and beyond; cow’s milk is a drink from 12 months.','Kando ya Mama na Mtoto, Lishe inatoa vyakula kwa mtoto na mama. Familia ndiyo inachagua: hakuna kinachowekwa kwenye boksi bila kuchaguliwa. Kwa mujibu wa mwongozo wa WHO na UNICEF, mtoto chini ya miezi 6 anahitaji maziwa ya mama pekee, kwa hiyo rafu haina chochote kwa umri huo. Vyakula vya nyongeza vinaanza miezi 6, pamoja na kunyonyesha hadi miaka 2 na zaidi; maziwa ya ng’ombe ni kinywaji kuanzia miezi 12.')}</p>
  <p class="ab-notice"><b>${L('Breastfeeding is recommended.','Kunyonyesha kunapendekezwa.')}</b> ${L('In line with WHO’s International Code of Marketing of Breast-milk Substitutes and Tanzania’s rules on marketing foods for infants and young children, Afya Basics does not display, list or promote infant formula, follow-on formula or growing-up milks on any shelf, box or page.','Kwa kufuata Kanuni ya Kimataifa ya WHO kuhusu matangazo ya vibadala vya maziwa ya mama na sheria za Tanzania kuhusu matangazo ya vyakula vya watoto wachanga na wadogo, Afya Basics haionyeshi, haiorodheshi wala haitangazi maziwa ya kopo ya watoto, maziwa ya kopo ya hatua inayofuata wala maziwa ya ukuaji katika rafu, boksi au ukurasa wowote.')}</p>
  ${lisheHTML()}
  <p class="ab-mute" style="margin-top:var(--s2)">${L('Supplements for mothers are sold by the partner pharmacy, not on this shelf.','Virutubisho vya akina mama vinauzwa na famasia mshirika, si kwenye rafu hii.')}</p>
 </section>
 </div>

 <section class="ab-block"><h2>${L('Key figures','Takwimu muhimu')}</h2>${A().figsHTML(figs)}</section>
 <section class="ab-block"><h2>${L('What this costs','Gharama yake')}</h2>${costTable(m)}</section>
 ${A().openHTML(open)}
 ${A().sourcesHTML(SRC())}
 ${A().pagerHTML(pv,nx)}
 </div></article>`}

function init(){const res=document.getElementById('s36Res');if(!res)return;
 const draw=()=>{const el=document.getElementById('s36Res');if(el)el.innerHTML=results()};
 needLib(draw);
 const on=(id,k)=>{const el=document.getElementById(id);if(el)el.addEventListener('change',()=>{ST[k]=el.value;needLib(draw)})};
 on('s36Z','z');on('s36F','f');on('s36S','shelf');
 const q=document.getElementById('s36Q');let tm=0;
 if(q)q.addEventListener('input',()=>{clearTimeout(tm);tm=setTimeout(()=>{ST.q=q.value;if(ST.q.trim()&&ST.z!=='all'){ST.z='all';const z=document.getElementById('s36Z');if(z)z.value='all'}needLib(draw)},250)});
 res.addEventListener('toggle',e=>{const d=e.target;if(!d.matches||!d.matches('details[data-f]')||!d.open)return;const b=d.querySelector('.s36-fb');if(b&&!b.dataset.ok){b.dataset.ok='1';b.innerHTML=famBody(window.AFYA_LIB.fams[+d.dataset.f])}},true)}

window.SECTIONS['s3-6']={render,init,v2:true};
})();
