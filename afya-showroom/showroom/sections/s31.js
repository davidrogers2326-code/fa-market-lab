/* 3.1 The store · v2 on the D2 template.
   Walkthrough: stills only from the approved faceless set (SECTION-GUIDE); every other stop shows a calm
   "render in production" panel. Floor plan: inline SVG, flagship 180 m² or start-small 100 m², read from
   MODEL.inputs.store.area_m2 (only the selected option is drawn, B5). Medicines: partner pharmacy only (B4, D-5).
   Area schedule (flagship): concept store plan of the earlier 3.1, planning estimates. Fees: research/R1-compliance.md. */
(function(){
'use strict';
const A=()=>window.AB,T=(e,s)=>A().T(e,s),E=s=>A().E(s),L=(e,s)=>E(T(e,s));
const lang=()=>window.AFYA_LANG==='sw'?'sw':'en';
const nf=n=>Math.round(n).toLocaleString('en-US');
const est=()=>`<span class="ab-est">${L('estimate','makadirio')}</span>`;
const N=(k,v,f)=>A().numHTML(k,v,f);

/* ---------- model (follows the funding switch) ---------- */
function M(){const I=window.MODEL.inputs,st=I.store,lean=A().isLean(),use=I.seed.use||[];
 const line=re=>{const x=use.find(u=>re.test(u[0]));return x?x[1]:null};
 const buyers=st.visitors_day_m12*st.conversion,walk=buyers*st.basket*30,rent=I.opex_month.rent;
 const team=(I.staff||[]).filter(x=>!/rider/i.test(x[0])).reduce((a,x)=>a+x[1],0);
 return {I,st,lean,area:st.area_m2,rent,buyers,walk,team,fit:line(/fit-out/i),lease:line(/^Lease advance/i),tech:line(/^Technology/i),
  physio:(I.staff||[]).some(x=>/physiotherapy/i.test(x[0])),hours:hoursText(st.hours)}}
/* "09:00–21:00, 7 days" → English as given; Kiswahili in Swahili time (saa 3:00 asubuhi …) */
function hoursText(h){const m=String(h||'').match(/(\d{1,2}):(\d{2})\D+(\d{1,2}):(\d{2})/);if(!m)return E(h||'');
 const sw=(H,Mi)=>{const n=((H+6)%12)||12,per=H>=6&&H<12?'asubuhi':H>=12&&H<16?'mchana':H>=16&&H<19?'jioni':'usiku';return `saa ${n}:${Mi} ${per}`};
 return T(`${m[1]}:${m[2]} to ${m[3]}:${m[4]}, seven days a week`,`${sw(+m[1],m[2])} hadi ${sw(+m[3],m[4])}, siku saba kwa wiki`)}

/* ---------- areas of the plan (metres; x left→right, y back→front, entrance at the front) ---------- */
/* kinds: z = Care Zone, s = service, p = partner pharmacy, b = back of house */
const AREAS={
 flag:{w:18,d:10,door:[7.8,10.2],a:[
  {k:'stock',t:'b',x:0,y:0,w:11.2,h:1.8,en:'Stockroom and packing',sw:'Stoo na ufungashaji'},
  {k:'office',t:'b',x:11.2,y:0,w:3.4,h:1.8,en:'Manager’s office',sw:'Ofisi ya meneja'},
  {k:'staff',t:'b',x:14.6,y:0,w:3.4,h:1.8,en:'Staff room and WC',sw:'Chumba cha wafanyakazi na choo'},
  {k:'consult',t:'s',x:0,y:1.8,w:2.8,h:2.9,en:'Consultation room',sw:'Chumba cha ushauri'},
  {k:'pc',t:'z',x:2.8,y:1.8,w:7.7,h:0.9,en:'Personal Care',sw:'Huduma Binafsi'},
  {k:'pharm',t:'p',x:10.5,y:1.8,w:3,h:2.4,en:'Partner pharmacy',sw:'Famasia mshirika'},
  {k:'counter',t:'s',x:13.5,y:1.8,w:4.5,h:2.2,en:'Counter and screens',sw:'Kaunta na skrini'},
  {k:'mb',t:'z',x:0,y:4.7,w:1,h:3.3,en:'Mother & Baby',sw:'Mama na Mtoto'},
  {k:'hd',t:'z',x:5.6,y:4.8,w:4,h:1.4,en:'Heart & Diabetes',sw:'Moyo na Kisukari'},
  {k:'mr',t:'z',x:11,y:4.8,w:3.6,h:1.4,en:'Mobility & Recovery',sw:'Kutembea na Kupona'},
  {k:'sn',t:'z',x:17,y:4,w:1,h:3,en:'Seniors',sw:'Wazee'},
  {k:'check',t:'s',x:14,y:7,w:4,h:3,en:'Afya Check and waiting area',sw:'Afya Check na eneo la kusubiri'},
  {k:'fh',t:'z',x:3.4,y:8.9,w:3.9,h:0.8,en:'First Aid & Home',sw:'Huduma ya Kwanza na Nyumbani'},
  {k:'pay',t:'s',x:0,y:8,w:3,h:2,en:'Self-checkout and collect',sw:'Kujilipia na kuchukua'},
  {k:'books',t:'s',x:12.9,y:8.2,w:0.7,h:1.5,en:'Books and brochures',sw:'Vitabu na vipeperushi'}]},
 lean:{w:12.5,d:8,door:[5,7],a:[
  {k:'stock',t:'b',x:0,y:0,w:8.5,h:1.6,en:'Stockroom and packing',sw:'Stoo na ufungashaji'},
  {k:'staff',t:'b',x:8.5,y:0,w:4,h:1.6,en:'Staff room and WC',sw:'Chumba cha wafanyakazi na choo'},
  {k:'pc',t:'z',x:0,y:1.6,w:6.5,h:0.8,en:'Personal Care',sw:'Huduma Binafsi'},
  {k:'pharm',t:'p',x:6.5,y:1.6,w:2.6,h:1.9,en:'Partner pharmacy',sw:'Famasia mshirika'},
  {k:'counter',t:'s',x:9.1,y:1.6,w:3.4,h:1.9,en:'Counter and screens',sw:'Kaunta na skrini'},
  {k:'mb',t:'z',x:0,y:2.4,w:0.9,h:4.1,en:'Mother & Baby',sw:'Mama na Mtoto'},
  {k:'hd',t:'z',x:2.6,y:3.9,w:3,h:1.1,en:'Heart & Diabetes',sw:'Moyo na Kisukari'},
  {k:'mr',t:'z',x:6.4,y:3.9,w:2.8,h:1.1,en:'Mobility & Recovery',sw:'Kutembea na Kupona'},
  {k:'sn',t:'z',x:11.6,y:3.5,w:0.9,h:2.1,en:'Seniors',sw:'Wazee'},
  {k:'check',t:'s',x:9.4,y:5.6,w:3.1,h:2.4,en:'Check corner and waiting area',sw:'Kona ya vipimo na eneo la kusubiri'},
  {k:'fh',t:'z',x:0.9,y:7.2,w:3.6,h:0.8,en:'First Aid & Home',sw:'Huduma ya Kwanza na Nyumbani'}]}};

/* ---------- the walkthrough: stills from the approved faceless set, or "render in production" ---------- */
function STOPS(lean){return [
 {a:null,img:null,t:['The street front','Mbele ya duka barabarani'],
  p:['A single-storey, standalone building of medium size on a clean, open plot, with nothing built against its sides. The windows are protected and the entrance is shuttered at night. It reads as a calm health store from the pavement, not as a glass pavilion and not as a supermarket.','Jengo la ghorofa moja, linalojitegemea, la ukubwa wa kati kwenye kiwanja safi na wazi, bila jengo lolote lililobanwa pembeni mwake. Madirisha yana kinga na mlango unafungwa kwa shata usiku. Kutoka barabarani linaonekana duka tulivu la afya, si banda la vioo na si supamaketi.']},
 {a:'counter',img:{src:'img/interior.webp',w:2400,h:1340,alt:['Inside the store from the entrance: wood shelving on the walls, a fluted wooden counter, a green wall of Afya Boxes, a health kiosk and two armchairs by the window','Ndani ya duka ukiangalia kutoka mlangoni: rafu za mbao ukutani, kaunta ya mbao yenye mifereji, ukuta wa kijani wa Afya Box, kibanda cha vipimo na viti viwili karibu na dirisha']},t:['The first look','Mtazamo wa kwanza'],
  p:['From the threshold the whole room is visible: shelving on the walls, low pieces in the centre and the counter at the back. A visitor can see where their need is answered before taking a step. Warm wood, soft light and seating set the tone of a modern clinic lobby rather than a shop floor.','Ukiwa kizingitini chumba chote kinaonekana: rafu ukutani, vitu vifupi katikati na kaunta nyuma. Mgeni anaona hitaji lake litashughulikiwa wapi kabla hajapiga hatua. Mbao zenye rangi ya joto, mwanga laini na viti vinaleta hisia ya ukumbi wa kliniki ya kisasa badala ya sakafu ya duka.']},
 lean?{a:'check',img:null,t:['The check corner','Kona ya vipimo'],
  p:['In the start-small store an adviser takes the free readings at a check corner by the entrance, using separate devices, the same order and the same consent as the kiosk in 3.3. Seats and a screen with health tips sit beside it, so people waiting are seated rather than queuing.','Katika duka la kuanza kidogo mshauri anachukua vipimo vya bure kwenye kona ya vipimo karibu na mlango, kwa vifaa tofauti, kwa mpangilio uleule na ridhaa ileile kama kibanda cha 3.3. Viti na skrini yenye vidokezo vya afya viko kando yake, ili wanaosubiri waketi badala ya kupanga foleni.']}
  :{a:'check',img:{src:'img/e1/kiosk.webp',w:2400,h:1350,alt:['The Afya Check kiosk: a white column with a screen and a weighing platform, beside an armchair in a warm, quiet corner','Kibanda cha Afya Check: nguzo nyeupe yenye skrini na jukwaa la kupimia uzito, kando ya kiti katika kona tulivu yenye mwanga wa joto']},t:['Afya Check by the entrance','Afya Check karibu na mlango'],
  p:['The first thing a visitor meets is a free check, not a till. The kiosk takes seven readings (section 3.3) next to a small waiting area with digital screens showing health tips and the month’s Afya Boxes. No purchase is needed.','Kitu cha kwanza mgeni anachokutana nacho ni kipimo cha bure, si mashine ya malipo. Kibanda kinachukua vipimo saba (sehemu 3.3) kando ya eneo dogo la kusubiri lenye skrini za kidijitali zinazoonyesha vidokezo vya afya na Afya Box za mwezi. Hakuna sharti la kununua.']},
 {a:'mb',img:{src:'img/range/z_mb.webp',w:2400,h:1350,alt:['The Mother & Baby zone: wooden shelves of nappies and baby care, a cot with a net and a low display table','Eneo la Mama na Mtoto: rafu za mbao zenye nepi na mahitaji ya mtoto, kitanda cha mtoto chenye chandarua na meza fupi ya maonyesho']},t:['Mother & Baby','Mama na Mtoto'],
  p:['Floor-to-ceiling nappies in every size, wipes, bath care, feeding and sleep. The zone sits on the wall nearest the way out, because parents are the most frequent and most time-pressed visitors. The Lishe nutrition shelf (3.6) is here; infant formula is never on display.','Nepi za kila saizi kuanzia sakafuni hadi juu, wipes, mahitaji ya kuoga, kulisha na kulala. Eneo hili liko ukutani karibu zaidi na njia ya kutokea, kwa sababu wazazi ndio wageni wa mara kwa mara na wenye haraka zaidi. Rafu ya Lishe (3.6) iko hapa; maziwa ya kopo ya watoto hayaonyeshwi kamwe.']},
 {a:'hd',img:{src:'img/range/z_hd.webp',w:2400,h:1350,alt:['The Heart & Diabetes zone: blood-pressure monitors on a glass shelf, a demonstration counter and a small table with two chairs','Eneo la Moyo na Kisukari: vipima shinikizo la damu kwenye rafu ya kioo, meza ya kujaribu vifaa na meza ndogo yenye viti viwili']},t:['Heart & Diabetes','Moyo na Kisukari'],
  p:['Blood-pressure monitors and glucose meters on open display, with demonstration units an adviser can use with the customer. This is where a raised reading at the check becomes the right device and, with consent, a membership.','Vipima shinikizo la damu na vipima sukari vimeonyeshwa wazi, pamoja na vifaa vya kujaribu ambavyo mshauri anaweza kutumia na mteja. Hapa ndipo kipimo kilichopanda kwenye Afya Check kinageuka kuwa kifaa sahihi na, kwa ridhaa, uanachama.']},
 {a:'mr',img:{src:'img/range/z_mr.webp',w:2400,h:1350,alt:['The Mobility & Recovery zone: a wheelchair, a rollator, walking frames and sticks on a low platform, knee and ankle supports on the wall','Eneo la Kutembea na Kupona: kiti cha magurudumu, kitembezi chenye magurudumu, fremu za kutembelea na fimbo kwenye jukwaa fupi, vifaa vya kushikilia goti na kifundo ukutani']},t:['Mobility & Recovery','Kutembea na Kupona'],
  p:['Walking aids, wheelchairs, supports and bathroom safety, shown on the floor so they can be tried. An adviser fits supports correctly.','Vifaa vya kutembelea, viti vya magurudumu, vifaa vya kushikilia viungo na usalama wa bafuni, vimewekwa sakafuni ili vijaribiwe. Mshauri anamvalisha mteja vifaa hivi ipasavyo.']},
 {a:'pc',img:{src:'img/range/z_pc.webp',w:2400,h:1350,alt:['The Personal Care wall: lit wooden shelves of white bottles, tubes and bars of soap','Ukuta wa Huduma Binafsi: rafu za mbao zenye mwanga, chupa nyeupe, mirija na vipande vya sabuni']},t:['Personal Care','Huduma Binafsi'],
  p:['The longest run of shelving, on the back wall: oral care, bath and body, skin, hair, deodorants, shaving and period care. These are the everyday repeat purchases that bring a household back each month.','Mstari mrefu zaidi wa rafu, kwenye ukuta wa nyuma: utunzaji wa kinywa, kuoga na mwili, ngozi, nywele, viondoa harufu, kunyoa na huduma ya hedhi. Hivi ni vitu vinavyonunuliwa kila siku vinavyoirudisha kaya dukani kila mwezi.']},
 {a:'fh',img:null,t:['First Aid & Home','Huduma ya Kwanza na Nyumbani'],
  p:['Dressings, plasters, thermometers, safe-water and home hygiene, near the door for quick needs. Pain, fever, cough and stomach medicines are not on this shelf: they are sold at the partner pharmacy counter.','Vifaa vya kufunga vidonda, plasta, vipimajoto, maji salama na usafi wa nyumbani, karibu na mlango kwa mahitaji ya haraka. Dawa za maumivu, homa, kikohozi na tumbo haziko kwenye rafu hii: zinauzwa kwenye kaunta ya famasia mshirika.']},
 {a:'sn',img:{src:'img/range/z_sn.webp',w:2400,h:1350,alt:['The Seniors zone: shelves of continence and skin care, a grey armchair and a small table with a glass of water','Eneo la Wazee: rafu za mahitaji ya kujizuia haja na utunzaji wa ngozi, kiti cha kijivu na meza ndogo yenye glasi ya maji']},t:['Seniors','Wazee'],
  p:['Continence care, skin care, hearing and vision aids and fall prevention, with a seat beside the shelf. Older customers and carers can sit while an adviser brings items over.','Mahitaji ya kujizuia haja, utunzaji wa ngozi, vifaa vya kusikia na kuona na kuzuia kuanguka, pamoja na kiti kando ya rafu. Wateja wazee na walezi wanaweza kuketi wakati mshauri anawaletea bidhaa.']},
 {a:'pharm',img:null,t:['The partner pharmacy counter','Kaunta ya famasia mshirika'],
  p:['A separate counter run by a licensed partner pharmacy, with its own pharmacist, its own till and its own licence. Every medicine in the store is sold here, by the partner. Afya Basics staff do not sell, dispense or price medicines.','Kaunta tofauti inayoendeshwa na famasia mshirika yenye leseni, ikiwa na mfamasia wake, mashine yake ya malipo na leseni yake. Kila dawa dukani inauzwa hapa, na mshirika. Wafanyakazi wa Afya Basics hawauzi, hawatoi wala hawawekei bei dawa.']},
 {a:'counter',img:null,t:['The counter','Kaunta'],
  p:['The counter is topped with screens showing the Afya Boxes. It is where customers join a box, collect orders, return items and speak to an adviser. A small shelf of health books and brochures stands near the waiting area.','Juu ya kaunta kuna skrini zinazoonyesha Afya Box. Hapa ndipo wateja wanajiunga na boksi, wanachukua oda, wanarudisha bidhaa na wanazungumza na mshauri. Rafu ndogo ya vitabu vya afya na vipeperushi iko karibu na eneo la kusubiri.']},
 {a:'stock',img:{src:'img/c-stock.webp',w:2400,h:1350,alt:['The stockroom: white racks of labelled stock under bright light, with a small step ladder','Stoo: rafu nyeupe zenye bidhaa zilizowekwa lebo chini ya mwanga mkali, pamoja na ngazi ndogo']},t:['Back of house','Upande wa nyuma'],
  p:['Reserve stock on labelled racks, received with batch and expiry and picked first-expiry-first-out. Every Afya Box and online order is checked against its list, photographed and sealed on the packing bench here, then handed to delivery.','Akiba ya bidhaa kwenye rafu zenye lebo, inapokelewa pamoja na namba ya toleo na tarehe ya kuisha, na inachukuliwa kwa kuanza na inayoisha mapema. Kila Afya Box na oda ya mtandaoni inakaguliwa dhidi ya orodha yake, inapigwa picha na kufungwa kwenye meza ya kufungasha hapa, kisha inakabidhiwa kwa usafirishaji.']}]}

/* ---------- floor plan (inline SVG; only the selected option) ---------- */
function planSVG(lean,cur){const P=AREAS[lean?'lean':'flag'],S=45,ox=24,oy=24,W=P.w*S+ox*2,H=P.d*S+oy*2+40;
 const fill=t=>t==='b'?'var(--surface)':t==='z'?'var(--green-deep)':'var(--bg)';
 const stroke=t=>t==='p'?'var(--ink)':t==='z'?'var(--green-edge)':'var(--line)';
 const letters='ABCDEFGHIJKLMNOP';
 const rects=P.a.map((r,i)=>{const x=ox+r.x*S,y=oy+r.y*S,w=r.w*S,h=r.h*S,on=cur===r.k,tall=h>w;
  const lab=tall?'':`<text class="s31-lbl" x="${x+w/2}" y="${y+h/2+18}" text-anchor="middle" font-size="12" fill="var(--mute)">${E(T(r.en,r.sw))}</text>`;
  return `<g data-area="${r.k}"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${on?'var(--green)':fill(r.t)}" stroke="${on?'var(--ink)':stroke(r.t)}" stroke-width="${on?2:1}"${r.t==='p'?' stroke-dasharray="6 4"':''}/>${r.t==='p'?`<rect x="${x+4}" y="${y+4}" width="${w-8}" height="${h-8}" fill="url(#s31hatch)"/>`:''}
   <text x="${x+w/2}" y="${y+h/2+(tall?6:0)}" text-anchor="middle" font-size="17" font-weight="600" fill="var(--ink)">${letters[i]}</text>${lab}</g>`}).join('');
 const d0=ox+P.door[0]*S,d1=ox+P.door[1]*S,yb=oy+P.d*S;
 const door=`<line x1="${d0}" y1="${yb}" x2="${d1}" y2="${yb}" stroke="var(--bg)" stroke-width="4"/><path d="M${d0} ${yb} A ${(d1-d0)/2} ${(d1-d0)/2} 0 0 1 ${(d0+d1)/2} ${yb-(d1-d0)/2}" fill="none" stroke="var(--mute)" stroke-width="1"/><text x="${(d0+d1)/2}" y="${yb+22}" text-anchor="middle" font-size="13" fill="var(--mute)">${L('Entrance','Mlango')}</text>`;
 const title=lean?T('Floor plan of the start-small store, about 100 square metres, schematic','Ramani ya sakafu ya duka la kuanza kidogo, takriban mita za mraba 100, mchoro wa jumla'):T('Floor plan of the flagship store, 180 square metres, 18 by 10 metres','Ramani ya sakafu ya duka kuu, mita za mraba 180, mita 18 kwa 10');
 const dim=lean?'':`<text x="${ox+P.w*S/2}" y="${oy-8}" text-anchor="middle" font-size="12" fill="var(--mute)">${L('18 m','m 18')}</text><text transform="translate(${ox-8} ${oy+P.d*S/2}) rotate(-90)" text-anchor="middle" font-size="12" fill="var(--mute)">${L('10 m','m 10')}</text>`;
 return `<svg class="s31-plan" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="s31pt"><title id="s31pt">${E(title)}</title>
  <defs><pattern id="s31hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="8" stroke="var(--line)" stroke-width="2"/></pattern></defs>
  <rect x="${ox}" y="${oy}" width="${P.w*S}" height="${P.d*S}" fill="var(--bg)" stroke="var(--mute)" stroke-width="2"/>${rects}${door}${dim}</svg>`}
function legendHTML(lean,cur){const P=AREAS[lean?'lean':'flag'],letters='ABCDEFGHIJKLMNOP';
 const kind=t=>t==='z'?T('Care Zone','Eneo la Huduma'):t==='p'?T('Run by the licensed partner pharmacy','Inaendeshwa na famasia mshirika yenye leseni'):t==='b'?T('Back of house','Upande wa nyuma'):T('Service','Huduma');
 return `<ol class="s31-leg">${P.a.map((r,i)=>`<li data-area="${r.k}"${cur===r.k?' class="on"':''}><b>${letters[i]}</b><span>${L(r.en,r.sw)}<small>${E(kind(r.t))}</small></span></li>`).join('')}</ol>`}

/* ---------- pieces ---------- */
function stageHTML(lean){const S=STOPS(lean);
 const media=S.map((s,i)=>`<div class="s31-m${i===0?' on':''}" data-i="${i}"${i===0?'':' aria-hidden="true"'}>${s.img?`<img src="${s.img.src}" width="${s.img.w}" height="${s.img.h}" loading="lazy" alt="${L(s.img.alt[0],s.img.alt[1])}">`:`<div class="s31-ph" role="img" aria-label="${L('Render in production: ','Picha inaandaliwa: ')}${L(s.t[0],s.t[1])}"><span>${L(s.t[0],s.t[1])}</span><small>${L('Render in production','Picha inaandaliwa')}</small></div>`}</div>`).join('');
 return `<div class="s31-tour" id="s31Tour">
  <div class="s31-frame">${media}</div>
  <div class="s31-tx" aria-live="polite"><div class="s31-k" id="s31K"></div><h3 id="s31H"></h3><p id="s31P"></p>
   <div class="s31-nv"><button type="button" class="ab-btn" id="s31Prev" aria-label="${L('Previous stop','Kituo kilichotangulia')}">←</button><button type="button" class="ab-btn ab-pri" id="s31Next">${L('Next stop','Kituo kinachofuata')} →</button></div></div>
  <div class="s31-stops" role="group" aria-label="${L('Stops on the walk','Vituo vya matembezi')}">${S.map((s,i)=>`<button type="button" data-stop="${i}" aria-pressed="${i===0}"><b>${i+1}</b><span>${L(s.t[0],s.t[1])}</span></button>`).join('')}</div></div>`}

function zonesTable(){const Z=(window.AFYA_SUM&&AFYA_SUM.zones)||[];const pos={
  mb:['Left wall, nearest the way out','Ukuta wa kushoto, karibu zaidi na njia ya kutokea','Parents of babies and young children, and pregnant women','Wazazi wa watoto wachanga na wadogo, na wanawake wajawazito'],
  pc:['Back wall, the longest run','Ukuta wa nyuma, mstari mrefu zaidi','Every member of the household, every month','Kila mtu katika kaya, kila mwezi'],
  fh:['Front wall, by the door','Ukuta wa mbele, karibu na mlango','Households stocking a home kit, and quick needs','Kaya zinazojaza kifaa cha nyumbani, na mahitaji ya haraka'],
  hd:['Centre island','Meza ya katikati','People living with high blood pressure or diabetes','Watu wanaoishi na shinikizo la juu la damu au kisukari'],
  mr:['Centre, with room to try','Katikati, pakiwa na nafasi ya kujaribu','People recovering from surgery or injury, and their carers','Watu wanaopona baada ya upasuaji au jeraha, na walezi wao'],
  sn:['Right wall, beside the seats','Ukuta wa kulia, kando ya viti','Older adults and the people who care for them','Wazee na watu wanaowahudumia']};
 return `<div class="ab-tw"><table class="ab-t"><thead><tr><th>${L('Care Zone','Eneo la Huduma')}</th><th>${L('Who it serves','Linamhudumia nani')}</th><th>${L('Where it sits','Liko wapi')}</th><th>${L('Product families','Familia za bidhaa')}</th></tr></thead><tbody>
  ${Z.map(z=>{const q=pos[z.k]||['','','',''];return `<tr><td><b>${E(T(z.n[0],z.n[1]))}</b></td><td>${L(q[2],q[3])}</td><td>${L(q[0],q[1])}</td><td class="ab-n">${nf(z.fam)}</td></tr>`}).join('')}
  </tbody></table></div>`}

function areaTable(){const R=[['Sales floor: six Care Zones, island and tables','Sakafu ya mauzo: Maeneo sita ya Huduma, meza ya katikati na meza nyingine',112],['Afya Check and waiting area','Afya Check na eneo la kusubiri',12],['Counter with screens','Kaunta yenye skrini',10],['Consultation room','Chumba cha ushauri',8],['Self-checkout and collect','Kujilipia na kuchukua',6],['Stockroom and packing','Stoo na ufungashaji',20],['Manager’s office','Ofisi ya meneja',6],['Staff room and WC','Chumba cha wafanyakazi na choo',6]];
 return `<div class="ab-tw"><table class="ab-t"><thead><tr><th>${L('Area','Eneo')}</th><th>${L('Floor area','Eneo la sakafu')}</th></tr></thead><tbody>
  ${R.map(r=>`<tr><td>${L(r[0],r[1])}</td><td class="ab-n">${r[2]} m²</td></tr>`).join('')}
  <tr><td><b>${L('Total','Jumla')}</b></td><td class="ab-n"><b>180 m²</b></td></tr></tbody></table></div>`}

function costTable(m){const row=(en,sw,key,v,f,note)=>`<tr><td>${L(en,sw)}${note?`<br><span class="ab-mute">${note}</span>`:''}</td><td class="ab-n">${v==null?'—':N(key,v,f||'tsh')}</td></tr>`;
 const perM2=m.rent/m.area,share=m.rent/m.walk*100;
 return `<div class="ab-tw"><table class="ab-t"><thead><tr><th>${L('Line','Kipengele')}</th><th>${L('Amount','Kiasi')}</th></tr></thead><tbody>
  ${row('Seed line: store fit-out and signage','Mstari wa mtaji wa awali: kuandaa duka na mabango','s31fit',m.fit,'tsh')}
  ${row('Seed line: lease advance, first 6 months of rent paid up front','Mstari wa mtaji wa awali: kodi ya miezi 6 ya kwanza inayolipwa mapema','s31lease',m.lease,'tsh')}
  ${row(m.lean?'Seed line: technology, POS, app and check corner':'Seed line: technology, Afya Check kiosk and screens',m.lean?'Mstari wa mtaji wa awali: teknolojia, POS, programu na kona ya vipimo':'Mstari wa mtaji wa awali: teknolojia, kibanda cha Afya Check na skrini','s31tech',m.tech,'tsh')}
  ${row('Rent a month','Kodi kwa mwezi','s31rent',m.rent,'tsh')}
  ${row('Rent per square metre a month','Kodi kwa mita ya mraba kwa mwezi','s31rm2',perM2,'tsh')}
  ${row('Walk-in sales a month by month 12','Mauzo ya wanaoingia dukani kwa mwezi ifikapo mwezi 12','s31walk',m.walk,'tsh',T(`${m.st.visitors_day_m12} visitors a day × ${Math.round(m.st.conversion*100)}% who buy × TSh ${nf(m.st.basket)} basket × 30 days`,`wageni ${m.st.visitors_day_m12} kwa siku × ${Math.round(m.st.conversion*100)}% wanaonunua × kikapu cha TSh ${nf(m.st.basket)} × siku 30`)+' · '+T('estimate','makadirio'))}
  <tr><td>${L('Rent as a share of walk-in sales, month 12','Kodi kama sehemu ya mauzo ya wanaoingia dukani, mwezi 12')} ${est()}</td><td class="ab-n">${N('s31share',share,'pct')}</td></tr>
  </tbody></table></div>
  <p class="ab-mute" style="margin-top:var(--s2)">${L('All lines are planning estimates from the Afya Basics financial model v1.2 and follow the funding option selected at the top of the page. Afya Box and online orders are packed under the same rent, so walk-in sales are not the only income the space carries.','Vipengele vyote ni makadirio ya mipango kutoka modeli ya fedha ya Afya Basics v1.2 na vinafuata chaguo la ufadhili lililochaguliwa juu ya ukurasa. Afya Box na oda za mtandaoni zinafungashwa chini ya kodi ileile, kwa hiyo mauzo ya wanaoingia dukani si mapato pekee yanayobebwa na nafasi hii.')}</p>`}

const SRC=()=>[
 {t:T('Afya Basics financial model v1.2, base case: store area, opening hours, rent, visitors, conversion, basket and seed lines (planning estimates)','Modeli ya fedha ya Afya Basics v1.2, hali ya msingi: eneo la duka, saa za kufungua, kodi, wageni, wanaonunua, kikapu na mistari ya mtaji wa awali (makadirio ya mipango)'),u:'',lang:lang()},
 {t:T('Afya Basics concept store plan, flagship 18 m × 10 m: area schedule (planning estimate)','Ramani ya dhana ya duka la Afya Basics, duka kuu m 18 × m 10: mgawanyo wa maeneo (makadirio ya mipango)'),u:'',lang:lang()},
 {t:'TMDA, Registration and licensing of premises: retail premises for medicines are registered and licensed by the Pharmacy Council',u:'https://www.tmda.go.tz/pages/registration-and-licensing-of-premises',chk:'9 Nov 2026'},
 {t:'TMDA, Registration and licensing of premises (medical devices): documents, Trader Portal, permit expires 30 June each year',u:'https://www.tmda.go.tz/pages/registration-and-licensing-of-premises-1',chk:'9 Nov 2026'},
 {t:'TMDA, Fees and Charges (Amendment) Regulations 2024: retail medical device outlet TZS 100,000',u:'https://www.tmda.go.tz/uploads/1718887575-FEES%20AND%20CHARGES%20AMENDMENT%20JUNE%202024%20FINAL.pdf',chk:'9 Nov 2026'},
 {t:'Tanzania Medicines and Medical Devices Act, Cap 219 R.E. 2023, s.18(1): products regulated under the Act are sold only from registered premises',u:'https://www.tmda.go.tz/uploads/1779257152-2025%20TMDA%20ACT.pdf',chk:'9 Nov 2026'}];

const CSS=`
.s31 figure.ab-visual{margin-left:0;margin-right:0}
.s31 figcaption{margin-top:var(--s2);color:var(--mute);font-size:var(--fs-cap);max-width:var(--measure)}
.s31 h3{font-size:var(--fs-sub);font-weight:600;margin:0}
.s31 .s31-tour{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(0,1fr);gap:var(--s3);align-items:start}
.s31 .s31-frame{position:relative;aspect-ratio:16/9;background:var(--surface);border:1px solid var(--line);overflow:hidden}
.s31 .s31-m{position:absolute;inset:0;opacity:0;transition:opacity .45s ease;pointer-events:none}
.s31 .s31-m.on{opacity:1;pointer-events:auto}
.s31 .s31-m img{display:block;width:100%;height:100%;object-fit:cover}
.s31 .s31-ph{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;border:1px dashed var(--line);margin:12px;text-align:center;padding:var(--s2)}
.s31 .s31-ph span{color:var(--ink);font-size:var(--fs-sub);font-weight:300}
.s31 .s31-ph small{color:var(--mute);font-size:var(--fs-cap)}
.s31 .s31-tx{display:flex;flex-direction:column;gap:var(--s2)}
.s31 .s31-k{color:var(--gold);font-size:var(--fs-cap);font-variant-numeric:tabular-nums}
.s31 .s31-tx p{margin:0}
.s31 .s31-nv{display:flex;gap:var(--s1);flex-wrap:wrap}
.s31 .s31-stops{grid-column:1/-1;display:flex;flex-wrap:wrap;gap:var(--s1)}
.s31 .s31-stops button{display:inline-flex;align-items:center;gap:8px;background:none;border:1px solid var(--line);border-radius:999px;color:var(--mute);padding:6px 12px 6px 6px;cursor:pointer;font-size:var(--fs-cap);min-height:34px}
.s31 .s31-stops button b{display:inline-grid;place-items:center;width:22px;height:22px;border-radius:50%;border:1px solid var(--line);font-weight:400;color:var(--gold);font-variant-numeric:tabular-nums}
.s31 .s31-stops button[aria-pressed="true"]{background:var(--green-deep);border-color:var(--green-edge);color:var(--ink)}
.s31 .s31-stops button:hover{color:var(--ink)}
.s31 .s31-planw{display:grid;grid-template-columns:minmax(0,1.7fr) minmax(0,1fr);gap:var(--s3);margin-top:var(--s3);align-items:start}
.s31 .s31-plan{display:block;width:100%;height:auto}
.s31 .s31-plan g[data-area]{cursor:pointer}
.s31 .s31-leg{list-style:none;margin:0;padding:0;border-top:1px solid var(--line)}
.s31 .s31-leg li{display:grid;grid-template-columns:28px minmax(0,1fr);gap:var(--s1);padding:8px 0;border-bottom:1px solid var(--line);cursor:pointer}
.s31 .s31-leg li b{font-weight:600;color:var(--ink)}
.s31 .s31-leg li span{display:flex;flex-direction:column}
.s31 .s31-leg li small{color:var(--mute);font-size:var(--fs-cap)}
.s31 .s31-leg li.on b,.s31 .s31-leg li.on span{color:var(--green-edge)}
@media (max-width:900px){.s31 .s31-tour,.s31 .s31-planw{grid-template-columns:1fr}}
@media (max-width:720px){.s31 .s31-plan .s31-lbl{display:none}.s31 .s31-stops button span{display:none}.s31 .s31-stops button{padding:6px}}
@media (prefers-reduced-motion:reduce){.s31 .s31-m{transition:none}}
`;

function render(s,p,pv,nx){const m=M(),lean=m.lean,st=m.st;
 const figs=[
  {v:`${N('s31area',m.area,'int')} m² ${est()}`,l:lean?T('Start-small store, single storey','Duka la kuanza kidogo, ghorofa moja'):T('Flagship store, single storey, 18 m × 10 m','Duka kuu, ghorofa moja, m 18 × m 10'),s:L('Financial model v1.2, base case','Modeli ya fedha v1.2, hali ya msingi')},
  {v:`${N('s31vis',st.visitors_day_m12,'int')} ${est()}`,l:T('Visitors a day by month 12','Wageni kwa siku ifikapo mwezi 12'),s:L('Financial model v1.2, base case','Modeli ya fedha v1.2, hali ya msingi')},
  {v:`${N('s31team',m.team,'int')} ${est()}`,l:T('Store team, not counting riders','Timu ya duka, bila kuhesabu wasafirishaji'),s:L('Financial model v1.2, staff plan','Modeli ya fedha v1.2, mpango wa wafanyakazi')},
  {v:L('6','6'),l:T('Care Zones, each organised around a person and a situation','Maeneo ya Huduma, kila moja limepangwa kumzunguka mtu na hali yake'),s:L('Product range, section 3.6','Bidhaa, sehemu 3.6')}];
 const open=[
  L('The site and the lease are not yet signed. The plan is a set of rules (the check by the door, the counter at the back, quick needs near the exit, back of house in one strip), so it can be fitted to the building that is chosen.','Eneo na mkataba wa kodi bado havijasainiwa. Ramani ni seti ya kanuni (kipimo karibu na mlango, kaunta nyuma, mahitaji ya haraka karibu na njia ya kutokea, upande wa nyuma katika mstari mmoja), kwa hiyo inaweza kupangwa kwenye jengo litakalochaguliwa.'),
  lean?L('The start-small layout is schematic. Its area schedule, including whether it has a separate consultation room, is set when the site is chosen.','Mpangilio wa duka la kuanza kidogo ni mchoro wa jumla. Mgawanyo wa maeneo yake, ikiwemo kama litakuwa na chumba tofauti cha ushauri, utapangwa eneo litakapochaguliwa.'):L('The area schedule is a planning estimate. Architect drawings and fit-out quotations are still to come.','Mgawanyo wa maeneo ni makadirio ya mipango. Michoro ya mbunifu na bei za kuandaa duka bado zinasubiriwa.'),
  L('The partner pharmacy is not yet named. The agreement, the size of its counter and its Pharmacy Council premises licence are checked before opening; the commercial terms are not yet agreed.','Famasia mshirika bado haijatajwa. Mkataba, ukubwa wa kaunta yake na leseni ya majengo kutoka Baraza la Famasia vinakaguliwa kabla ya kufungua; masharti ya kibiashara bado hayajakubaliwa.'),
  L('Which qualification TMDA requires for the person in charge of the device shelf is still to be confirmed with TMDA in writing.','Sifa ambayo TMDA inahitaji kwa mtu anayesimamia rafu ya vifaa tiba bado inasubiri kuthibitishwa na TMDA kwa maandishi.'),
  L('Renders of the street front, the counter, the partner pharmacy counter, First Aid & Home and the check corner are in production, on the approved store design.','Picha za mbele ya duka, kaunta, kaunta ya famasia mshirika, Huduma ya Kwanza na Nyumbani na kona ya vipimo zinaandaliwa, kwa muundo wa duka ulioidhinishwa.')];
 return `<article class="ab-sec s31" aria-labelledby="h-s3-1"><style>${CSS}</style><div class="ab-wrap">
 <div class="ab-sec-no">${E(s.no)}</div><h1 id="h-s3-1">${E(s.title)}</h1>
 <p class="ab-summary">${lean?L(`In the start-small option the first Afya Basics store is a single-storey building of about ${m.area} m² on a good secondary street in Dar es Salaam. A visitor meets a free check by the door, six Care Zones on open shelves, a counter for boxes and advice, and a separate counter run by a licensed partner pharmacy, which sells every medicine. Afya Boxes are packed at the back. This section walks through the store and its plan, and what the space costs.`,`Katika chaguo la kuanza kidogo, duka la kwanza la Afya Basics ni jengo la ghorofa moja la takriban m² ${m.area} kwenye barabara nzuri ya pili jijini Dar es Salaam. Mgeni anakutana na kipimo cha bure karibu na mlango, Maeneo sita ya Huduma kwenye rafu wazi, kaunta ya maboksi na ushauri, na kaunta tofauti inayoendeshwa na famasia mshirika yenye leseni, inayouza kila dawa. Afya Box zinafungashwa nyuma. Sehemu hii inapitia duka na ramani yake, na gharama ya nafasi hiyo.`)
  :L(`The first Afya Basics store is a single-storey flagship of ${m.area} m² on a prime street in Dar es Salaam. A visitor meets the free Afya Check by the door, six Care Zones on open shelves, a counter with screens for boxes and advice, and a separate counter run by a licensed partner pharmacy, which sells every medicine. Afya Boxes are packed at the back. This section walks through the store and its plan, and what the space costs.`,`Duka la kwanza la Afya Basics ni duka kuu la ghorofa moja la m² ${m.area} kwenye barabara kuu jijini Dar es Salaam. Mgeni anakutana na Afya Check ya bure karibu na mlango, Maeneo sita ya Huduma kwenye rafu wazi, kaunta yenye skrini kwa maboksi na ushauri, na kaunta tofauti inayoendeshwa na famasia mshirika yenye leseni, inayouza kila dawa. Afya Box zinafungashwa nyuma. Sehemu hii inapitia duka na ramani yake, na gharama ya nafasi hiyo.`)}</p>

 <figure class="ab-visual">${stageHTML(lean)}
  <figcaption>${L('A walk through the store in twelve stops, from the street to the back of house. Images are concept renders of the store design; stops without an approved render are marked as in production.','Matembezi ndani ya duka kwa vituo kumi na viwili, kutoka barabarani hadi upande wa nyuma. Picha ni michoro ya dhana ya muundo wa duka; vituo visivyo na picha iliyoidhinishwa vimeandikwa kuwa vinaandaliwa.')}</figcaption></figure>

 <div class="ab-body">
 <section class="ab-block"><h2>${L('A store built around the work, not the shelves','Duka lililojengwa kuzunguka kazi, si rafu')}</h2>
  <p>${L('Most shops are designed around shelves. The Afya Basics store is designed around the work that has to happen in it every day: free checks at the door, advice on the floor, quick payment, and a month of Afya Boxes and online orders packed at the back. Every square metre is given to one of those jobs.','Maduka mengi yanaundwa kuzunguka rafu. Duka la Afya Basics limeundwa kuzunguka kazi inayopaswa kufanyika ndani yake kila siku: vipimo vya bure mlangoni, ushauri sakafuni, malipo ya haraka, na Afya Box za mwezi mzima pamoja na oda za mtandaoni zinazofungashwa nyuma. Kila mita ya mraba imepewa moja ya kazi hizo.')}</p>
  <p>${lean?L(`The start-small store opens ${m.hours} with a team of ${m.team}. It keeps the same six Care Zones and the same order of the visit as the flagship, in less space. Instead of the kiosk, an adviser takes the free readings at a check corner; the kiosk is bought from the store’s own cash once monthly profit is steady (section 3.3).`,`Duka la kuanza kidogo linafunguliwa ${m.hours} likiwa na timu ya watu ${m.team}. Linabaki na Maeneo sita yaleyale ya Huduma na mpangilio uleule wa ziara kama duka kuu, katika nafasi ndogo zaidi. Badala ya kibanda, mshauri anachukua vipimo vya bure kwenye kona ya vipimo; kibanda kinanunuliwa kwa fedha za duka lenyewe faida ya kila mwezi ikishakuwa thabiti (sehemu 3.3).`)
   :L(`The flagship opens ${m.hours} with a team of ${m.team}, two shifts overlapping at the busiest hours. The layout puts the Afya Check by the door, the six Care Zones in view from the threshold, the counter at the back and the back of house in one strip behind it.`,`Duka kuu linafunguliwa ${m.hours} likiwa na timu ya watu ${m.team}, zamu mbili zikipishana saa zenye shughuli nyingi. Mpangilio unaweka Afya Check karibu na mlango, Maeneo sita ya Huduma yakionekana tangu kizingitini, kaunta nyuma na upande wa nyuma katika mstari mmoja nyuma yake.`)}</p>
 </section>

 <section class="ab-block"><h2>${L('The building','Jengo')}</h2>
  <p>${L('The store is a single-storey, medium-sized, standalone building on a protected plot: security-protected windows, clean surroundings and nothing built on its sides. It is not an all-glass pavilion: from the street it should read as protected, calm and clean.','Duka ni jengo la ghorofa moja, la ukubwa wa kati, linalojitegemea kwenye kiwanja chenye ulinzi: madirisha yenye kinga, mazingira safi na hakuna jengo lililojengwa pembeni mwake. Si banda la vioo vitupu: kutoka barabarani linapaswa kuonekana lenye ulinzi, tulivu na safi.')}</p>
  <p>${L('Inside, the mood is a mix of a technology showroom, a modern clinic lobby, a consulting area and a quiet luxury store, never a supermarket: warm wood, soft light, no loud music and seating for anyone who needs it. The Afya Check sits by the entrance next to a waiting area with digital screens. The counter is topped with screens, and a small shelf of health books and brochures invites people to stay.','Ndani, hisia ni mchanganyiko wa chumba cha maonyesho ya teknolojia, ukumbi wa kliniki ya kisasa, eneo la ushauri na duka tulivu la hadhi ya juu, kamwe si supamaketi: mbao zenye rangi ya joto, mwanga laini, hakuna muziki wa sauti kubwa na viti kwa yeyote anayevihitaji. Afya Check iko karibu na mlango kando ya eneo la kusubiri lenye skrini za kidijitali. Juu ya kaunta kuna skrini, na rafu ndogo ya vitabu vya afya na vipeperushi inawakaribisha watu kukaa.')}</p>
  <p>${L('At closing a security shutter comes down and the cameras and alarm are armed. Tills, the check station, lights and fridges run on battery backup through power cuts, and the tills keep working offline and sync later.','Wakati wa kufunga shata ya usalama inashushwa na kamera na kengele ya tahadhari zinawashwa. Mashine za malipo, kituo cha vipimo, taa na friji zinaendelea kwa betri wakati umeme ukikatika, na mashine za malipo zinaendelea kufanya kazi bila mtandao na kuunganisha taarifa baadaye.')}</p>
 </section>

 <section class="ab-block"><h2>${L('The floor plan','Ramani ya sakafu')}</h2>
  <p>${lean?L(`The plan of the start-small store, about ${m.area} m². It is schematic: the zones keep the same order as the flagship, and the final dimensions follow the building that is chosen. Select an area, or a stop on the walk above, to see where it sits.`,`Ramani ya duka la kuanza kidogo, takriban m² ${m.area}. Ni mchoro wa jumla: maeneo yanabaki na mpangilio uleule wa duka kuu, na vipimo vya mwisho vitafuata jengo litakalochaguliwa. Chagua eneo, au kituo katika matembezi hapo juu, kuona liko wapi.`)
   :L(`The plan of the ${m.area} m² flagship, 18 m wide and 10 m deep, with the entrance on the street side. Select an area, or a stop on the walk above, to see where it sits.`,`Ramani ya duka kuu la m² ${m.area}, upana wa m 18 na kina cha m 10, mlango ukiwa upande wa barabara. Chagua eneo, au kituo katika matembezi hapo juu, kuona liko wapi.`)}</p>
  <div class="s31-planw" id="s31Plan">${planSVG(lean,'counter')}${legendHTML(lean,'counter')}</div>
  <p class="ab-mute" style="margin-top:var(--s2)">${L('Green outline: Care Zone. Dashed outline with hatching: the partner pharmacy, run by the licensed partner. Grey: back of house. Concept plan.','Mstari wa kijani: Eneo la Huduma. Mstari wa vistari wenye mistari ya mshazari: famasia mshirika, inayoendeshwa na mshirika mwenye leseni. Kijivu: upande wa nyuma. Ramani ya dhana.')}</p>
 </section>

 <section class="ab-block"><h2>${L('Six Care Zones','Maeneo sita ya Huduma')}</h2>
  <p>${L('The shelves are organised around a person and a situation, not around a product category. A mother looking for nappies, a man whose blood pressure was just read as high and a carer buying for an older parent each find one zone that answers the whole need. Frequent needs sit near the way out; advice-heavy zones sit in the centre, where an adviser can stand with the customer.','Rafu zimepangwa kumzunguka mtu na hali yake, si aina ya bidhaa. Mama anayetafuta nepi, mwanaume ambaye shinikizo lake la damu limepimwa kuwa juu muda mfupi uliopita na mlezi anayemnunulia mzazi mzee, kila mmoja anapata eneo moja linalojibu hitaji lake lote. Mahitaji ya mara kwa mara yako karibu na njia ya kutokea; maeneo yanayohitaji ushauri mwingi yako katikati, ambapo mshauri anaweza kusimama na mteja.')}</p>
  ${zonesTable()}
  <p class="ab-mute" style="margin-top:var(--s2)">${L('Families counted from the product range in section 3.6. Medicine families in these zones are sold at the partner pharmacy counter, not on Afya’s shelves.','Familia zimehesabiwa kutoka bidhaa za sehemu 3.6. Familia za dawa katika maeneo haya zinauzwa kwenye kaunta ya famasia mshirika, si kwenye rafu za Afya.')}</p>
 </section>

 <section class="ab-block"><h2>${L('The partner pharmacy counter','Kaunta ya famasia mshirika')}</h2>
  <p>${L('Afya Basics does not sell medicines. Every medicine in the store, from paracetamol to rehydration salts, is sold by a licensed partner pharmacy at its own counter, with its own pharmacist, its own till and its own receipts. In Tanzania, retail premises for medicines are registered and licensed by the Pharmacy Council, and that licence is held by the partner, not by Afya.','Afya Basics haiuzi dawa. Kila dawa dukani, kuanzia paracetamol hadi chumvi za kurudisha maji mwilini, inauzwa na famasia mshirika yenye leseni kwenye kaunta yake, ikiwa na mfamasia wake, mashine yake ya malipo na risiti zake. Tanzania, majengo ya rejareja ya dawa yanasajiliwa na kupewa leseni na Baraza la Famasia, na leseni hiyo inamilikiwa na mshirika, si Afya.')}</p>
  <p>${L('The counter sits next to Afya’s own counter so that a customer who needs a medicine is walked over, not sent away. Afya’s advisers explain readings and suggest a clinic when a reading needs a doctor; they do not recommend, dispense or price medicines, and no medicine is priced inside an Afya Box.','Kaunta hii iko kando ya kaunta ya Afya ili mteja anayehitaji dawa apelekwe hapo, si kuambiwa aende kwingine. Washauri wa Afya wanaeleza vipimo na kupendekeza kliniki pale kipimo kinapohitaji daktari; hawapendekezi, hawatoi wala hawawekei bei dawa, na hakuna dawa inayowekewa bei ndani ya Afya Box.')}</p>
  <p>${L('Afya’s own shelves do carry medical devices such as blood-pressure monitors, thermometers and walking aids. For these the store holds a TMDA retail medical device outlet permit, TSh 100,000 a year, and names a qualified person in charge.','Rafu za Afya zenyewe zinabeba vifaa tiba kama vipima shinikizo la damu, vipimajoto na vifaa vya kutembelea. Kwa hivi duka linashikilia kibali cha TMDA cha duka la rejareja la vifaa tiba, TSh 100,000 kwa mwaka, na linamtaja mtu mwenye sifa kuwa msimamizi.')}</p>
 </section>

 <section class="ab-block"><h2>${L('Back of house','Upande wa nyuma')}</h2>
  <p>${L('The back of house is larger than in a normal shop, because the store also packs every Afya Box and online order. In effect the back room is a small fulfilment centre that shares the same rent. Stock is received with batch and expiry, kept on labelled racks and picked first-expiry-first-out; slower variants are kept here and ordered at the counter or in the app, so the floor stays uncluttered.','Upande wa nyuma ni mkubwa kuliko katika duka la kawaida, kwa sababu duka pia linafungasha kila Afya Box na oda za mtandaoni. Kimsingi chumba cha nyuma ni kituo kidogo cha kusafirisha oda kinachotumia kodi ileile. Bidhaa zinapokelewa pamoja na namba ya toleo na tarehe ya kuisha, zinawekwa kwenye rafu zenye lebo na zinachukuliwa kwa kuanza na zinazoisha mapema; aina zinazouzwa polepole zinawekwa hapa na kuagizwa kwenye kaunta au kwenye programu, ili sakafu ibaki nadhifu.')}</p>
  ${lean?`<p>${L('In the start-small store the back of house is one strip behind the counters, with the stockroom, the packing bench and a staff room. Its exact size is set with the site.','Katika duka la kuanza kidogo upande wa nyuma ni mstari mmoja nyuma ya kaunta, ukiwa na stoo, meza ya kufungasha na chumba cha wafanyakazi. Ukubwa wake kamili utapangwa pamoja na eneo.')}</p>`
   :`<p>${L('In the flagship plan the back of house takes 32 m², or 18% of the floor, and 148 m² (82%) faces customers.','Katika ramani ya duka kuu upande wa nyuma unachukua m² 32, au asilimia 18 ya sakafu, na m² 148 (asilimia 82) ni kwa ajili ya wateja.')}</p>
   <h3 style="margin-top:var(--s3)">${L('Area schedule','Mgawanyo wa maeneo')} ${est()}</h3>${areaTable()}
   <p class="ab-mute" style="margin-top:var(--s2)">${L('The partner pharmacy counter sits inside the sales floor allowance; its exact size is set with the partner and its licence.','Kaunta ya famasia mshirika iko ndani ya nafasi ya sakafu ya mauzo; ukubwa wake kamili utapangwa na mshirika pamoja na leseni yake.')}</p>`}
 </section>
 </div>

 <section class="ab-block"><h2>${L('Key figures','Takwimu muhimu')}</h2>${A().figsHTML(figs)}</section>
 <section class="ab-block"><h2>${L('What this costs','Gharama yake')}</h2>${costTable(m)}</section>
 ${A().openHTML(open)}
 ${A().sourcesHTML(SRC())}
 ${A().pagerHTML(pv,nx)}
 </div></article>`}

/* ---------- interactions: stop selector, plan highlight (motion only in response to a click) ---------- */
function init(){const tour=document.getElementById('s31Tour');if(!tour)return;const lean=A().isLean(),S=STOPS(lean);let cur=0;
 const plan=document.getElementById('s31Plan');
 const paintPlan=k=>{if(!plan||!k)return;plan.innerHTML=planSVG(lean,k)+legendHTML(lean,k)};
 const go=i=>{cur=(i+S.length)%S.length;const s=S[cur];
  tour.querySelectorAll('.s31-m').forEach(el=>{const on=+el.dataset.i===cur;el.classList.toggle('on',on);if(on)el.removeAttribute('aria-hidden');else el.setAttribute('aria-hidden','true')});
  tour.querySelectorAll('[data-stop]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.stop===cur)));
  document.getElementById('s31K').textContent=T(`Stop ${cur+1} of ${S.length}`,`Kituo ${cur+1} kati ya ${S.length}`);
  document.getElementById('s31H').textContent=T(s.t[0],s.t[1]);document.getElementById('s31P').textContent=T(s.p[0],s.p[1]);
  if(s.a)paintPlan(s.a)};
 tour.addEventListener('click',e=>{const b=e.target.closest('[data-stop]');if(b)go(+b.dataset.stop)});
 document.getElementById('s31Prev').addEventListener('click',()=>go(cur-1));
 document.getElementById('s31Next').addEventListener('click',()=>go(cur+1));
 if(plan)plan.addEventListener('click',e=>{const g=e.target.closest('[data-area]');if(!g)return;const k=g.dataset.area,i=S.findIndex(s=>s.a===k);if(i>=0)go(i);else paintPlan(k)});
 go(0)}

window.SECTIONS['s3-1']={render,init,v2:true};
})();
