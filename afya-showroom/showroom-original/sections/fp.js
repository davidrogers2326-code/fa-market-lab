/* The store footprint · one interactive plan of the flagship, shared by 3.1 (The store) and 3.6 (The product range).
   Plan coordinates are in the 1280 × 720 space of img/s-plan.webp (18 m × 10 m room). */
(function(){
const lang=()=>window.AFYA_LANG==='sw'?1:0;const L=a=>Array.isArray(a)?(a[lang()]||a[0]):a;
const E=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const T=n=>'TSh '+Math.round(n).toLocaleString('en-US');const TM=n=>n>=1e6?'TSh '+(n/1e6).toFixed(1)+' m':T(n);
// areas: id, Care Zone key (3.6), colour, rect, size, shelf metres, name, what, why, 3.1 tour stop
const A=[
 {id:'z1',k:'mb',c:'#ff9bb8',r:[78,140,165,590],m:8,s:['≈ 8 m of wall shelving','≈ mita 8 za rafu ukutani'],n:['Mother & Baby','Mama na Mtoto'],
  w:['Nappies in every size, wipes, baby skin care, feeding, thermometers, maternity pads, iron and folic acid.','Nepi za kila saizi, wipes, huduma ya ngozi ya mtoto, ulishaji, vipimajoto, pedi za uzazi, madini ya chuma na foliki.'],
  y:['The left wall, nearest the self-checkout. Mothers are the most frequent visitors; with a baby on her back, a mother is in and out in minutes with a hand free.','Ukuta wa kushoto, karibu zaidi na malipo ya kujihudumia. Akina mama ndio wageni wa mara kwa mara; akiwa amembeba mtoto mgongoni, mama anaingia na kutoka kwa dakika chache akiwa na mkono mmoja huru.'],stop:4},
 {id:'z2',k:'hd',c:'#ff7b6b',r:[298,298,540,392],m:6,s:['Double-sided island · ≈ 6 m of shelf','Kisiwa cha pande mbili · ≈ mita 6 za rafu'],n:['Heart & Diabetes','Moyo na Kisukari'],
  w:['Blood-pressure monitors, glucose meters with their strips and lancets, pen needles, diabetic foot care, low-sugar foods. Demo units can be tried.','Vipimo vya shinikizo, mashine za sukari pamoja na vipande na sindano zake, sindano za kalamu, huduma ya miguu kwa wenye kisukari, vyakula vyenye sukari kidogo. Vifaa vya maonyesho vinaweza kujaribiwa.'],
  y:['In the open centre, a few steps from the Afya Check kiosk: a raised reading leads straight to a device the customer can hold and try. The two end-caps of the island carry the season’s products.','Katikati ya duka, hatua chache kutoka kituo cha Afya Check: kipimo kikiwa juu kinampeleka mteja moja kwa moja kwenye kifaa anachoweza kushika na kujaribu. Ncha mbili za kisiwa zinabeba bidhaa za msimu.'],stop:5},
 {id:'z3',k:'mr',c:'#d9b56e',r:[660,250,770,490],m:3,s:['Two round tables + fitting bench · ≈ 3 m','Meza mbili za mviringo + benchi la kupimia · ≈ mita 3'],n:['Mobility & Recovery','Kutembea na Kupona'],
  w:['Walking aids, knee and back supports, dressings, hot and cold packs, physiotherapy bands, and one floor model of each rental item.','Vifaa vya kutembelea, vifaa vya kushikilia goti na mgongo, bandeji, vifurushi vya joto na baridi, bendi za mazoezi, na mfano mmoja sakafuni wa kila kifaa cha kukodisha.'],
  y:['In the centre with space all around, so the store lead, a physiotherapy graduate, can fit a support in front of a mirror. Stock and rentals stay in the back.','Katikati na nafasi pande zote, ili kiongozi wa duka, mhitimu wa tiba ya viungo, aweze kumpimia mteja kifaa mbele ya kioo. Stoo na vifaa vya kukodisha hubaki nyuma.'],stop:6},
 {id:'z4',k:'fh',c:'#f2c96b',r:[1118,355,1215,570],m:3.5,s:['≈ 3.5 m of wall shelving','≈ mita 3.5 za rafu ukutani'],n:['First Aid & Home','Huduma ya Kwanza na Nyumbani'],
  w:['First-aid kits for homes, offices and schools, plasters, antiseptic, ORS and zinc, nets and repellents, gloves, sanitiser.','Visanduku vya huduma ya kwanza kwa nyumba, ofisi na shule, plasta, dawa za kusafisha vidonda, ORS na zinki, vyandarua na dawa za mbu, glovu, vitakasa mikono.'],
  y:['The right wall beside the entrance: grab-and-go items that need no advice, the first thing a hurried customer reaches.','Ukuta wa kulia kando ya mlango: bidhaa za kuchukua na kuondoka zisizohitaji ushauri, kitu cha kwanza anachofikia mteja mwenye haraka.'],stop:null},
 {id:'z5',k:'pc',c:'#c9b8ff',r:[400,108,905,218],m:8,s:['≈ 8 m of wall + LED video wall','≈ mita 8 za ukuta + skrini kubwa ya LED'],n:['Personal Care','Huduma Binafsi'],
  w:['Oral care, soap and body care, skin and sun care, natural hair care, period care and intimate hygiene.','Huduma ya kinywa, sabuni na huduma ya mwili, ngozi na kinga ya jua, nywele asilia, huduma za hedhi na usafi wa siri.'],
  y:['The whole back wall, under the video wall. The fastest-moving zone sits at the back so every visitor walks past the other zones to reach it.','Ukuta wote wa nyuma, chini ya skrini kubwa. Kanda inayouza kwa kasi zaidi iko nyuma ili kila mgeni apite kanda nyingine akielekea huko.'],stop:7},
 {id:'z6',k:'sn',c:'#b5dfc6',r:[1118,130,1215,350],m:3.5,s:['≈ 3.5 m of wall shelving','≈ mita 3.5 za rafu ukutani'],n:['Seniors','Wazee'],
  w:['Continence care by absorbency, bed pads, barrier creams, pill organisers, magnifiers, non-slip mats, oral nutrition.','Bidhaa za kujizuia kwa kiwango cha kunyonya, pedi za kitanda, krimu za kinga, vipangilio vya vidonge, miwani ya kukuza, mikeka isiyoteleza, lishe ya ziada.'],
  y:['The right wall beside the lounge chairs and the counter, so an older customer or a carer can sit while an adviser brings items over.','Ukuta wa kulia kando ya viti vya kupumzikia na kaunta, ili mzee au mlezi aweze kuketi wakati mshauri anamletea bidhaa.'],stop:8},
 {id:'f1',c:'#5fbf8f',r:[505,575,780,640],s:['Automatic glass doors','Milango ya kioo ya kujifungua'],n:['Entrance and window','Mlango na dirisha'],
  w:['Automatic doors in a protected facade, a door screen saying “Free health check inside”, and the season window on both sides.','Milango ya kujifungua kwenye mbele salama, skrini ya mlangoni inayosema “Kipimo cha afya bila malipo ndani”, na dirisha la msimu pande zote mbili.'],
  y:['The whole room is visible from the threshold, and the first thing offered is a free service, not a sales counter.','Chumba chote kinaonekana kutoka mlangoni, na kitu cha kwanza kinachotolewa ni huduma ya bure, si kaunta ya mauzo.'],stop:1},
 {id:'f2',c:'#5fbf8f',r:[800,455,1095,615],s:['12 m²','m² 12'],n:['Afya Check and lounge','Afya Check na sehemu ya kupumzika'],
  w:['The Afya Check kiosk (fifteen measurements in about four minutes), four lounge chairs and a health-tips screen.','Kituo cha Afya Check (vipimo kumi na tano kwa takriban dakika nne), viti vinne vya kupumzikia na skrini ya ushauri wa afya.'],
  y:['Right of the door, by the glass: a reason to step in and a calm place to wait or talk.','Kulia mwa mlango, karibu na kioo: sababu ya kuingia na mahali tulivu pa kusubiri au kuzungumza.'],stop:2},
 {id:'f3',c:'#f2c96b',r:[892,125,1085,285],s:['10 m²','m² 10'],n:['Signature counter','Kaunta kuu'],
  w:['Advice, Afya Box sign-up, collections and returns, under four screens showing the boxes. Medicines sold only on advice are kept here.','Ushauri, kujiunga na Afya Box, kuchukua oda na kurudisha bidhaa, chini ya skrini nne zinazoonyesha masanduku. Dawa zinazouzwa kwa ushauri tu zinahifadhiwa hapa.'],
  y:['The back-right corner, so every visitor walks past the Care Zones; the screens are visible from the door.','Kona ya nyuma kulia, ili kila mgeni apite Kanda za Huduma; skrini zinaonekana kutoka mlangoni.'],stop:10},
 {id:'f4',c:'#d9b56e',r:[235,490,445,605],s:['6 m²','m² 6'],n:['Self-checkout and collect','Malipo ya kujihudumia na kuchukua'],
  w:['Two self-checkout stations for mobile money and cards, and the click-and-collect shelf.','Vituo viwili vya kujilipia kwa pesa ya simu na kadi, na rafu ya kuchukua oda za mtandaoni.'],
  y:['Near the exit: customers who know what they want never wait for staff.','Karibu na mlango wa kutokea: wateja wanaojua wanachotaka hawasubiri wafanyakazi.'],stop:12},
 {id:'f5',c:'#c9b8ff',r:[95,35,288,142],s:['8 m²','m² 8'],n:['Consultation room','Chumba cha ushauri'],
  w:['A private room with a desk, two chairs, a scale and a blood-pressure device.','Chumba binafsi chenye meza, viti viwili, mizani na kipimo cha shinikizo.'],
  y:['For full checks, referrals and condition-box set-up that should not happen across a counter.','Kwa vipimo kamili, rufaa na kuanzisha masanduku ya hali ya afya, mambo yasiyopaswa kufanyika juu ya kaunta.'],stop:9},
 {id:'f6',c:'#6a8a7d',r:[400,38,945,106],s:['20 m²','m² 20'],n:['Stockroom and packing','Stoo na ufungashaji'],
  w:['Reserve racks labelled first-expiry-first-out, the packing bench and sealed boxes waiting for riders.','Rafu za akiba zenye lebo za inayoisha kwanza inatoka kwanza, benchi la kufungashia na masanduku yaliyofungwa yakisubiri wasafirishaji.'],
  y:['Behind the back wall: restocking and packing never cross the shop floor.','Nyuma ya ukuta wa nyuma: kujaza rafu na kufungasha hakuvuki sakafu ya duka.'],stop:14},
 {id:'f7',c:'#5fbf8f',r:[950,38,1065,106],s:['6 m²','m² 6'],n:['Manager’s office','Ofisi ya meneja'],
  w:['The stock, sales and camera dashboard, the safe, and a table for supplier meetings.','Dashibodi ya stoo, mauzo na kamera, sefu, na meza ya mikutano na wasambazaji.'],
  y:['Behind the counter, next to the stockroom.','Nyuma ya kaunta, kando ya stoo.'],stop:13},
 {id:'f8',c:'#6a8a7d',r:[292,38,398,106],s:['6 m²','m² 6'],n:['Staff room and WC','Chumba cha wafanyakazi na choo'],
  w:['Lockers, a small kitchenette and a staff toilet.','Makabati, jiko dogo na choo cha wafanyakazi.'],y:['Out of sight, next to the stockroom.','Nje ya macho ya wateja, kando ya stoo.'],stop:null}];
const ROUTES={
 cust:{c:'#ecd6a2',d:'M642 640 L642 560 L900 520 L900 470 L560 430 L470 400 L200 400 L180 300 L300 250 L650 245 L880 250 L960 300 L760 520 L400 520 L340 560 L560 610 L642 640',
  n:['The customer route','Njia ya mteja'],t:['In through the door, a free check at the kiosk, the island and the Mother & Baby wall, along Personal Care at the back, to the counter, and out past self-checkout. About 40 metres, every zone in sight.','Kuingia mlangoni, kipimo cha bure kwenye kituo, kisiwa na ukuta wa Mama na Mtoto, kando ya Huduma Binafsi nyuma, hadi kaunta, na kutoka kupitia malipo ya kujihudumia. Takriban mita 40, kila kanda ikionekana.']},
 rest:{c:'#7fd6c2',d:'M520 106 L520 240 L230 250 L190 330 L190 520 L420 420 L700 300 L1100 240 L1100 460',
  n:['The restock route','Njia ya kujaza rafu'],t:['Every night a crate per zone leaves the stockroom through the back door, along the back wall, down the Mother & Baby wall, through the island and tables, to the right-hand walls. The floor is never crossed with stock during opening hours.','Kila usiku kreti moja kwa kila kanda inatoka stoo kupitia mlango wa nyuma, kando ya ukuta wa nyuma, chini ya ukuta wa Mama na Mtoto, kupitia kisiwa na meza, hadi kuta za upande wa kulia. Sakafu haivukwi na stoo wakati duka liko wazi.']}};
const SEAS=[[560,612],[725,612],[292,345],[546,345]];
const UI={areas:['Areas','Maeneo'],zones:['Care Zones','Kanda za Huduma'],cust:['Customer route','Njia ya mteja'],rest:['Restock route','Njia ya kujaza'],sea:['Season points','Sehemu za msimu'],top:['Top view','Kwa juu'],iso:['3D cut-away','Mkato wa 3D'],
 tap:['Tap any area on the plan','Gusa eneo lolote kwenye ramani'],glance:['The plan at a glance','Ramani kwa mtazamo mmoja'],
 gl:['A single floor of 180 m², 18 m wide and 10 m deep. The entrance and the Afya Check face the street; the Care Zones line three walls, with the island and the round tables in the centre; the counter sits in the back-right corner and the consultation room in the back-left. Behind the back wall are the staff room, the stockroom with the packing bench, and the manager’s office.','Sakafu moja ya m² 180, upana wa mita 18 na kina cha mita 10. Mlango na Afya Check vinaangalia barabara; Kanda za Huduma zimepangwa kwenye kuta tatu, kisiwa na meza za mviringo katikati; kaunta iko kona ya nyuma kulia na chumba cha ushauri kona ya nyuma kushoto. Nyuma ya ukuta wa nyuma kuna chumba cha wafanyakazi, stoo yenye benchi la kufungashia, na ofisi ya meneja.'],
 why:['Why it is here','Kwa nini iko hapa'],what:['What is here','Kilichopo hapa'],fam:['families','familia'],prod:['products','bidhaa'],pm:['planned sales a month','mauzo yaliyopangwa kwa mwezi'],shelf:['metres of shelf','mita za rafu'],
 tour:['See it in the walk-through','Ione kwenye matembezi'],zone:['Open the zone in 3.6','Fungua kanda katika 3.6'],
 seaT:['Season points','Sehemu za msimu'],seaP:['The two window bays either side of the door and the two end-caps of the island change on the first day of every season: nets and ORS in the long rains, school bundles in January and July, the gift wall in December. Everything else in the store stays where customers expect it.','Sehemu mbili za dirisha pande zote za mlango na ncha mbili za kisiwa hubadilishwa siku ya kwanza ya kila msimu: vyandarua na ORS wakati wa masika, vifurushi vya shule Januari na Julai, ukuta wa zawadi Desemba. Kila kitu kingine dukani kinabaki mahali wateja wanapokitarajia.'],
 sched:['Area schedule','Mgawanyo wa eneo'],floor:['Sales floor, six Care Zones','Sakafu ya mauzo, Kanda sita'],tot:['Total','Jumla'],front:['Customer-facing','Eneo la wateja'],back:['Back of house','Nyuma ya duka'],
 cap:['Shelf capacity','Uwezo wa rafu'],capt:['32 m of shelving × 5 shelves = 160 m of shelf, the equivalent of 32 one-metre bays.','Mita 32 za rafu × ngazi 5 = mita 160 za rafu, sawa na rafu 32 za mita moja.']};
const SCHED=[[['Sales floor · six Care Zones, island, tables','Sakafu ya mauzo · Kanda sita, kisiwa, meza'],112,1],[['Afya Check and lounge','Afya Check na sehemu ya kupumzika'],12,1],[['Signature counter','Kaunta kuu'],10,1],[['Consultation room','Chumba cha ushauri'],8,1],[['Self-checkout and collect','Malipo ya kujihudumia na kuchukua'],6,1],[['Stockroom and packing','Stoo na ufungashaji'],20,0],[['Manager’s office','Ofisi ya meneja'],6,0],[['Staff room and WC','Chumba cha wafanyakazi na choo'],6,0]];
const CSS=`
.fp{--g:#d8b46a;--i:#f7f2e8;--m:rgba(247,242,232,.66);--l:rgba(236,228,210,.13)}
.fpbar{display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px;margin-top:18px}
.fpseg{display:inline-flex;flex-wrap:wrap;border:1px solid var(--l);border-radius:30px;overflow:hidden}.fpseg button{border:0;background:none;color:rgba(247,242,232,.82);padding:8px 15px;font:500 .9rem inherit;cursor:pointer;display:inline-flex;align-items:center;gap:7px}.fpseg button.on{background:var(--i);color:#141210}.fpseg button i{width:9px;height:9px;border-radius:50%;background:var(--c0)}
.fpw{display:grid;grid-template-columns:minmax(0,1.65fr) minmax(0,1fr);gap:22px;margin-top:14px;align-items:start}
.fpp{position:relative;border-radius:18px;overflow:hidden;background:#d8d2c6;border:1px solid rgba(216,180,106,.3);box-shadow:0 26px 70px rgba(0,0,0,.45)}
.fpp>img{display:block;width:100%;height:auto;transition:opacity .4s}.fpp>img.iso{position:absolute;inset:0;opacity:0;width:100%;height:100%;object-fit:cover}.fpp.iso>img.iso{opacity:1}.fpp.iso svg{opacity:0;pointer-events:none}
.fpp svg{position:absolute;inset:0;width:100%;height:100%;transition:opacity .3s}
.fpp .ar{fill:var(--c);fill-opacity:.0;stroke:var(--c);stroke-opacity:.0;stroke-width:3;cursor:pointer;transition:fill-opacity .25s,stroke-opacity .25s}
.fpp.L-areas .ar,.fpp.L-zones .ar.z{fill-opacity:.16;stroke-opacity:.9}.fpp .ar:hover{fill-opacity:.32;stroke-opacity:1}.fpp .ar.on{fill-opacity:.42;stroke-opacity:1;stroke-width:5}
.fpp .lb{font:700 15px Helvetica,Arial,sans-serif;fill:#101311;paint-order:stroke;stroke:#f7f2e8;stroke-width:4px;pointer-events:none;opacity:0;transition:opacity .25s}
.fpp.L-areas .lb,.fpp.L-zones .lb.z{opacity:1}
.fpp .rt{fill:none;stroke-width:6;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:14 12;opacity:0;transition:opacity .3s;animation:fpd 1.2s linear infinite}
@keyframes fpd{to{stroke-dashoffset:-26}}
.fpp.L-cust .rt.cust,.fpp.L-rest .rt.rest{opacity:.95}
.fpp .dot{opacity:0}.fpp.L-cust .dot.cust,.fpp.L-rest .dot.rest{opacity:1}
.fpp .sp{opacity:0;transition:opacity .3s}.fpp.L-sea .sp{opacity:1}
.fpp .sp circle.p{animation:fpp 1.8s ease-out infinite;transform-box:fill-box;transform-origin:center}@keyframes fpp{0%{transform:scale(.6);opacity:.9}100%{transform:scale(2.4);opacity:0}}
@media(prefers-reduced-motion:reduce){.fpp .rt,.fpp .sp circle.p{animation:none}}
.fpi{border-radius:18px;padding:20px;background:linear-gradient(170deg,#151917,#0c0e0d);border:1px solid var(--l);min-height:260px}
.fpi small{display:block;font:600 .64rem var(--f-hud,monospace);letter-spacing:.15em;text-transform:uppercase;color:var(--c,var(--g))}
.fpi h4{margin:8px 0 0;font:400 1.75rem/1.12 var(--f-serif,Georgia,serif);color:var(--i)}
.fpi p{margin:10px 0 0;font:400 1.02rem/1.7 var(--f-serif,Georgia,serif);color:rgba(247,242,232,.88)}
.fpi .why{margin-top:12px;padding:12px 14px;border-radius:12px;background:rgba(127,214,194,.08);border:1px solid rgba(127,214,194,.25);font-size:.95rem;line-height:1.55;color:#cdf3e9}.fpi .why b{display:block;font:600 .6rem var(--f-hud,monospace);letter-spacing:.14em;text-transform:uppercase;color:#7fd6c2;margin-bottom:4px}
.fpn{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:14px}.fpn div{padding:10px;border-radius:10px;background:rgba(255,255,255,.04);border:1px solid var(--l)}.fpn b{display:block;font:400 1.25rem var(--f-serif,Georgia,serif);color:var(--i)}.fpn span{font-size:.74rem;color:var(--m)}
.fpt{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-top:12px}.fpt span{aspect-ratio:1;border-radius:8px;background-color:#e9e6df;background-repeat:no-repeat}
.fpb{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}.fpb button,.fpb a{border:1px solid rgba(216,180,106,.5);border-radius:20px;background:none;color:#ecd6a2;padding:8px 14px;font:600 .74rem var(--f-hud,monospace);letter-spacing:.06em;cursor:pointer;text-decoration:none}
.fps{margin-top:18px;display:grid;grid-template-columns:minmax(0,1.65fr) minmax(0,1fr);gap:22px}
.fps table{width:100%;border-collapse:collapse;font-size:.92rem}.fps td{padding:8px 10px;border-bottom:1px solid var(--l);color:rgba(247,242,232,.86)}.fps td.n{text-align:right;font-family:var(--f-hud,monospace)}.fps tr.t td{font-weight:600;color:var(--i)}
.fps td i{display:inline-block;width:8px;height:8px;border-radius:2px;margin-right:8px;background:var(--c)}
.fpc{padding:16px 18px;border-radius:14px;background:var(--c,#0f1211);background:linear-gradient(150deg,#1d2a20,#0f1211);border:1px solid rgba(127,214,194,.3)}.fpc small{font:600 .62rem var(--f-hud,monospace);letter-spacing:.14em;text-transform:uppercase;color:#7fd6c2}.fpc b{display:block;margin-top:6px;font:400 1.6rem var(--f-serif,Georgia,serif);color:#fff}.fpc p{margin:6px 0 0;font-size:.92rem;line-height:1.55;color:rgba(247,242,232,.8)}
@media(max-width:1000px){.fpw,.fps{grid-template-columns:1fr}}`;
function css(){if(document.getElementById('fp-css'))return;const e=document.createElement('style');e.id='fp-css';e.textContent=CSS;document.head.appendChild(e)}
const tile=im=>{if(!im)return '';const g=im[0],k=g%9,c=(k%3)*4+im[1]%4,r=Math.floor(k/3)*4+(im[1]>>2);return `background-image:url(img/fam/s${Math.floor(g/9)}.webp?v=2);background-size:1200% 1200%;background-position:${(c/11*100).toFixed(3)}% ${(r/11*100).toFixed(3)}%`};
const zs=k=>window.AFYA_SUM&&AFYA_SUM.zones.find(z=>z.k===k);
function html(id){css();const u=k=>L(UI[k]);
 return `<div class="fp" id="${id}"><div class="fpbar"><div class="fpseg" data-g="layer"><button type="button" data-v="zones" class="on">${u('zones')}</button><button type="button" data-v="areas">${u('areas')}</button><button type="button" data-v="cust"><i style="--c0:#ecd6a2"></i>${u('cust')}</button><button type="button" data-v="rest"><i style="--c0:#7fd6c2"></i>${u('rest')}</button><button type="button" data-v="sea"><i style="--c0:#ff9b5a"></i>${u('sea')}</button></div><div class="fpseg" data-g="view"><button type="button" data-v="top" class="on">${u('top')}</button><button type="button" data-v="iso">${u('iso')}</button></div></div>
 <div class="fpw"><div class="fpp L-zones"><img src="img/s-plan.webp" width="1680" height="944" alt="Concept top-down plan of the 180 m² Afya Basics flagship"><img class="iso" src="img/s-iso.webp" loading="lazy" alt="Concept 3D cut-away of the same layout">
 <svg viewBox="0 0 1280 720" preserveAspectRatio="none" aria-label="${E(u('tap'))}">${A.map(a=>{const [x1,y1,x2,y2]=a.r;return `<rect class="ar${a.k?' z':''}" data-a="${a.id}" x="${x1}" y="${y1}" width="${x2-x1}" height="${y2-y1}" rx="8" style="--c:${a.c}"><title>${E(L(a.n))}</title></rect>`}).join('')}
 ${A.map(a=>{const [x1,y1,x2,y2]=a.r,v=(y2-y1)>(x2-x1)*1.6;return `<text class="lb${a.k?' z':''}" x="${(x1+x2)/2}" y="${(y1+y2)/2+5}" text-anchor="middle" ${v?`transform="rotate(-90 ${(x1+x2)/2} ${(y1+y2)/2})"`:''}>${E(L(a.n))}</text>`}).join('')}
 ${Object.keys(ROUTES).map(k=>{const r=ROUTES[k];return `<path id="${id}-${k}" class="rt ${k}" d="${r.d}" stroke="${r.c}"/><g class="dot ${k}"><circle r="12" fill="${r.c}" stroke="#101311" stroke-width="3"><animateMotion dur="${k==='cust'?14:10}s" repeatCount="indefinite"><mpath href="#${id}-${k}"/></animateMotion></circle></g>`}).join('')}
 <g class="sp">${SEAS.map(p=>`<circle class="p" cx="${p[0]}" cy="${p[1]}" r="16" fill="#ff9b5a"/><circle cx="${p[0]}" cy="${p[1]}" r="11" fill="#ff9b5a" stroke="#101311" stroke-width="3"/>`).join('')}</g></svg></div>
 <aside class="fpi" aria-live="polite"></aside></div>
 <div class="fps"><table><tbody>${SCHED.map(x=>`<tr><td><i style="--c:${x[2]?'#d8b46a':'#6a8a7d'}"></i>${E(L(x[0]))}</td><td class="n">${x[1]} m²</td></tr>`).join('')}<tr class="t"><td>${u('tot')} · ${u('front')} ${SCHED.filter(x=>x[2]).reduce((t,x)=>t+x[1],0)} m² · ${u('back')} ${SCHED.filter(x=>!x[2]).reduce((t,x)=>t+x[1],0)} m²</td><td class="n">180 m²</td></tr></tbody></table>
 <div class="fpc"><small>${u('cap')}</small><b>32 ${lang()?'rafu':'bays'}</b><p>${u('capt')}</p></div></div></div>`}
function init(id,o){o=o||{};const root=document.getElementById(id);if(!root)return;const u=k=>L(UI[k]);const pl=root.querySelector('.fpp'),info=root.querySelector('.fpi');
 const glance=()=>{info.style.removeProperty('--c');info.innerHTML=`<small>${u('glance')}</small><h4>180 m² · 18 m × 10 m</h4><p>${u('gl')}</p><p style="font-size:.9rem;color:var(--m)">${u('tap')}.</p>`};
 const show=aid=>{const a=A.find(x=>x.id===aid);root.querySelectorAll('.ar').forEach(r=>r.classList.toggle('on',r.dataset.a===aid));info.style.setProperty('--c',a.c);
  const z=a.k&&zs(a.k);
  info.innerHTML=`<small>${E(L(a.s))}</small><h4>${E(L(a.n))}</h4><p>${E(L(a.w))}</p><div class="why"><b>${u('why')}</b>${E(L(a.y))}</div>${z?`<div class="fpn"><div><b>${z.fam}</b><span>${u('fam')}</span></div><div><b>${z.prod.toLocaleString('en-US')}</b><span>${u('prod')}</span></div><div><b>${a.m*5}</b><span>${u('shelf')}</span></div></div><div class="fpt">${z.hero.slice(0,4).map(h=>`<span title="${E(L(h.n))}" style="${tile(h.im)}"></span>`).join('')}</div>`:''}
  <div class="fpb">${a.stop!=null&&o.onStop?`<button type="button" data-s="${a.stop}">${u('tour')} →</button>`:''}${a.k&&o.zoneLink?`<a href="#s3-6">${u('zone')} →</a>`:''}${a.k&&o.onZone?`<button type="button" data-z="${a.k}">${L(['See its products','Ona bidhaa zake'])} →</button>`:''}</div>`;
  const sb=info.querySelector('[data-s]');if(sb)sb.onclick=()=>o.onStop(a.id,+sb.dataset.s);const zb=info.querySelector('[data-z]');if(zb)zb.onclick=()=>o.onZone(a.k)};
 const layer=v=>{pl.className='fpp L-'+v+(pl.classList.contains('iso')?' iso':'');root.querySelectorAll('[data-g=layer] button').forEach(b=>b.classList.toggle('on',b.dataset.v===v));
  if(v==='cust'||v==='rest'){const r=ROUTES[v];info.style.setProperty('--c',r.c);info.innerHTML=`<small>${E(L(r.n))}</small><h4>${E(L(r.n))}</h4><p>${E(L(r.t))}</p>`}
  else if(v==='sea'){info.style.setProperty('--c','#ff9b5a');info.innerHTML=`<small>${u('seaT')}</small><h4>${u('seaT')}</h4><p>${u('seaP')}</p>`}else glance()};
 root.querySelectorAll('[data-g=layer] button').forEach(b=>b.onclick=()=>layer(b.dataset.v));
 root.querySelectorAll('[data-g=view] button').forEach(b=>b.onclick=()=>{pl.classList.toggle('iso',b.dataset.v==='iso');root.querySelectorAll('[data-g=view] button').forEach(x=>x.classList.toggle('on',x===b))});
 root.querySelectorAll('.ar').forEach(r=>r.addEventListener('click',()=>{if(!/L-(zones|areas)/.test(pl.className))layer('areas');show(r.dataset.a)}));
 glance()}
window.FP={html,init,AREAS:A};
})();
