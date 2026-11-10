/* 7.2 Governance and reporting · v2 on the D2 template.
   The board, reserved matters, approval limits, governance calendar and access levels are kept as plain data records
   (window.AFYA_GOV) and rendered from them, so the same records can later drive the company's own online reporting and
   access system (Part J-6) without rework. D-6: the two founders are named together; no split and no relationship.
   The investor pack and the 21:00 report read the selected funding option from MODEL (B5); numbers that differ between
   the options are wrapped in AB.numHTML. Approval limits and speed targets are proposals, labelled as such.
   The report mock-up is a flat panel on the C2 tokens: no device frame, no shadow, no cross symbol. */
(function(){
'use strict';
const A=()=>window.AB,T=(e,s)=>A().T(e,s),E=s=>A().E(s),N=(k,v,f)=>A().numHTML(k,v,f),L=x=>T(x[0],x[1]);
const sw=()=>window.AFYA_LANG==='sw';
const tsh=n=>'TSh '+Math.round(n).toLocaleString('en-US');
const tshM=n=>{if(Math.abs(n)>=1e9){const b=n/1e9,y=(b<0?'−':'')+String(parseFloat(Math.abs(b).toFixed(2)));return sw()?'TSh '+y+' bilioni':'TSh '+y+'B'}const v=n/1e6,a=Math.abs(v),x=(v<0?'−':'')+String(parseFloat(a.toFixed(a>=100?0:1)));return sw()?'TSh '+x+' milioni':'TSh '+x+'M'};
const sg=n=>(n<0?'−':'')+tshM(Math.abs(n));
const nf=n=>Math.round(n).toLocaleString('en-US');
const pc=(n,d)=>String(parseFloat((n*100).toFixed(d==null?0:d)))+'%';
const est=()=>`<span class="ab-est">${E(T('estimate','makadirio'))}</span>`;
const prop=()=>`<span class="ab-est">${E(T('proposal','pendekezo'))}</span>`;
const NRC=[' · not re-checked',' · haijakaguliwa upya'];
const SCN={base:['Base case','Hali ya msingi'],best:['Best case','Hali bora'],down:['Downside case','Hali mbaya']};

/* ---------- governance records (Part J-6: the future reporting layer reads these) ---------- */
const SEATS=[
 {id:'f1',vote:1,seat:['Founder director','Mkurugenzi mwanzilishi'],who:['Fahmy Abbas Cothema','Fahmy Abbas Cothema'],grp:'f'},
 {id:'f2',vote:1,seat:['Founder director','Mkurugenzi mwanzilishi'],who:['Cecilia','Cecilia'],grp:'f'},
 {id:'inv',vote:1,seat:['Investor director','Mkurugenzi wa mwekezaji'],who:['Nominee of the seed investor','Mteule wa mwekezaji wa awali'],grp:'i'},
 {id:'ind',vote:1,seat:['Independent chair','Mwenyekiti huru'],who:['To be appointed: health retail or finance','Atateuliwa: rejareja ya afya au fedha'],grp:'c'},
 {id:'sec',vote:0,seat:['Company secretary and accountant','Katibu wa kampuni na mhasibu'],who:['Outside firm, attends without a vote','Kampuni ya nje, inahudhuria bila kura'],grp:'s'}];
const ROLE={
 f:[['Set strategy, sourcing and the investor relationship together','Kuweka mkakati, upatikanaji wa bidhaa na uhusiano na mwekezaji kwa pamoja'],['Sign off the monthly investor pack','Kuidhinisha kifurushi cha kila mwezi cha mwekezaji'],['Hold the founders’ rights linked to the 25% floor (legal review)','Kushikilia haki za waanzilishi zinazohusiana na kiwango cha chini cha 25% (mapitio ya kisheria)'],['Review operations monthly with the store lead','Kupitia uendeshaji kila mwezi pamoja na kiongozi wa duka']],
 i:[['One seat for the seed investor','Kiti kimoja kwa mwekezaji wa awali'],['Must consent to the reserved matters','Lazima atoe ridhaa kwa mambo yaliyohifadhiwa'],['Receives the full investor pack, bank statements and board papers','Anapokea kifurushi kamili cha mwekezaji, taarifa za benki na nyaraka za bodi']],
 c:[['A pharmacist, health-retail operator or chartered accountant with no stake in either side','Mfamasia, mwendeshaji wa rejareja ya afya au mhasibu aliyesajiliwa asiye na maslahi upande wowote'],['Chairs the board and breaks deadlocks on ordinary business','Anaongoza bodi na kuvunja mkwamo katika mambo ya kawaida'],['Leads the audit and risk review each quarter','Anaongoza mapitio ya ukaguzi na hatari kila robo mwaka']],
 s:[['Minutes, statutory filings and annual returns with BRELA','Kumbukumbu za vikao, uwasilishaji wa kisheria na ritani za mwaka BRELA'],['Monthly management accounts and the tax calendar','Hesabu za uongozi za kila mwezi na kalenda ya kodi'],['Reconciles the figures in the monthly pack with the bank and the till','Kulinganisha takwimu za kifurushi cha mwezi na benki na mauzo']]};
const GRP={f:'--green',i:'--gold',c:'--green-edge',s:'--mute'};
const RESERVED=[
 [['New shares or options','Hisa mpya au haki za hisa'],['Any issue that changes ownership','Utoaji wowote unaobadilisha umiliki']],
 [['Borrowing above TSh 20M','Mikopo zaidi ya TSh 20M'],['Loans, overdrafts and guarantees','Mikopo, overdrafti na dhamana']],
 [['Annual budget and plan','Bajeti na mpango wa mwaka'],['Approved before each financial year','Inaidhinishwa kabla ya kila mwaka wa fedha']],
 [['A new store or city','Duka jipya au mji mpya'],null],
 [['Sale, merger or listing','Kuuza, kuunganisha au kuorodheshwa sokoni'],['Any change of control','Mabadiliko yoyote ya udhibiti']],
 [['Related-party deals','Mikataba na watu wenye uhusiano'],['Any contract with a founder or a founder’s family','Mkataba wowote na mwanzilishi au familia ya mwanzilishi']],
 [['Directors’ pay','Malipo ya wakurugenzi'],['Salaries and bonuses of directors, including the founders','Mishahara na bonasi za wakurugenzi, wakiwemo waanzilishi']],
 [['Change of business','Kubadilisha biashara'],['Leaving health essentials, or entering a new country','Kuacha bidhaa muhimu za afya, au kuingia nchi mpya']]];
const ROLES=[['Store lead','Kiongozi wa duka'],['One founder','Mwanzilishi mmoja'],['Both founders','Waanzilishi wote wawili'],['Board','Bodi'],['Investor consent','Ridhaa ya mwekezaji']];
const LV={A:['Approves','Anaidhinisha'],R:['Recommends','Anapendekeza'],C:['Consents','Anatoa ridhaa'],I:['Informed','Anajulishwa'],'-':['—','—']};
const DOA=[
 {d:['Day-to-day purchases and petty cash','Manunuzi ya kila siku na fedha ndogo'],n:['Within the monthly budget','Ndani ya bajeti ya mwezi'],l:[[300000,'A'],[2000000,'A'],[10000000,'A'],[0,'I'],[0,'I']]},
 {d:['Stock reorders (system-drafted orders)','Kuagiza bidhaa tena (oda zinazoandaliwa na mfumo)'],n:['Approved suppliers at approved cost only','Wasambazaji walioidhinishwa kwa gharama iliyoidhinishwa tu'],l:[[1500000,'A'],[8000000,'A'],[25000000,'A'],[0,'I'],[0,'I']]},
 {d:['New supplier or new brand','Msambazaji mpya au chapa mpya'],n:['TMDA or TBS registration evidence on file','Ushahidi wa usajili wa TMDA au TBS kwenye faili'],l:[[0,'R'],[0,'R'],[0,'A'],[0,'I'],[0,'I']]},
 {d:['Price changes','Mabadiliko ya bei'],n:['One price in store, app and WhatsApp','Bei moja dukani, kwenye programu na WhatsApp'],l:[[0,'R'],[0,'R'],[0,'A'],[0,'I'],[0,'I']]},
 {d:['Hiring and pay within budget','Kuajiri na malipo ndani ya bajeti'],n:['The store lead recommends advisers, riders and packers','Kiongozi wa duka anapendekeza washauri, wasafirishaji na wafungashaji'],l:[[0,'R'],[0,'A'],[0,'I'],[0,'I'],[0,'I']]},
 {d:['Capital spending outside the budget','Matumizi ya mtaji nje ya bajeti'],n:['Above TSh 50M, or any new store, needs investor consent','Zaidi ya TSh 50M, au duka jipya lolote, kunahitaji ridhaa ya mwekezaji'],l:[[0,'-'],[0,'R'],[5000000,'A'],[50000000,'A'],[0,'C']]},
 {d:['Contracts and leases','Mikataba na pango'],n:['Above TSh 10M over the term, and every lease, go to the board; leases over 3 years need investor consent','Zaidi ya TSh 10M kwa muda wote, na kila pango, vinaenda kwa bodi; pango la zaidi ya miaka 3 linahitaji ridhaa ya mwekezaji'],l:[[0,'-'],[0,'R'],[10000000,'A'],[0,'A'],[0,'C']]},
 {d:['Borrowing','Kukopa'],n:['Above TSh 20M is a reserved matter','Zaidi ya TSh 20M ni jambo lililohifadhiwa'],l:[[0,'-'],[0,'-'],[0,'R'],[20000000,'A'],[0,'C']]},
 {d:['Issuing shares or options','Kutoa hisa au haki za hisa'],n:['Always needs investor consent, and protects the founders’ 25% floor','Daima kunahitaji ridhaa ya mwekezaji, na kunalinda kiwango cha chini cha 25% cha waanzilishi'],l:[[0,'-'],[0,'-'],[0,'R'],[0,'R'],[0,'C']]},
 {d:['Annual budget and business plan','Bajeti ya mwaka na mpango wa biashara'],n:['Adopted before each financial year','Inapitishwa kabla ya kila mwaka wa fedha'],l:[[0,'-'],[0,'R'],[0,'R'],[0,'A'],[0,'C']]}];
const PATHS=[
 {d:['Purchase within the budget','Ununuzi ndani ya bajeti'],p:[[300000,0],[2000000,1],[10000000,2],[Infinity,3]]},
 {d:['Stock reorder from an approved supplier','Kuagiza bidhaa tena kutoka kwa msambazaji aliyeidhinishwa'],p:[[1500000,0],[8000000,1],[25000000,2],[Infinity,3]]},
 {d:['Capital spending outside the budget','Matumizi ya mtaji nje ya bajeti'],p:[[5000000,2],[50000000,3],[Infinity,4]]},
 {d:['Borrowing','Kukopa'],p:[[20000000,3],[Infinity,4]]},
 {d:['Contract or lease (value over the term)','Mkataba au pango (thamani kwa muda wote)'],p:[[10000000,2],[Infinity,3]]}];
const ACC_ROLES=[['Founders','Waanzilishi'],['Store lead','Kiongozi wa duka'],['Health adviser','Mshauri wa afya'],['Picker and rider','Mchaguaji na msafirishaji'],['Accountant','Mhasibu'],['Investor','Mwekezaji']];
const ACC_L={full:['Full','Kamili'],read:['Read only','Kusoma tu'],own:['Own records','Kumbukumbu zake'],agg:['Totals only','Jumla tu'],none:['No access','Hakuna ruhusa']};
const ACC=[
 {d:['Sales, stock and the daily dashboard','Mauzo, stoku na dashibodi ya kila siku'],a:['full','full','read','none','read','agg']},
 {d:['Member names, phones and addresses','Majina, simu na anwani za wanachama'],a:['full','full','own','own','none','none']},
 {d:['Afya Check readings (health data)','Vipimo vya Afya Check (taarifa za afya)'],a:['agg','agg','own','none','none','none']},
 {d:['Payroll and staff records','Mishahara na kumbukumbu za wafanyakazi'],a:['full','own','own','own','full','none']},
 {d:['Bank, mobile money and cash-up','Benki, pesa za simu na hesabu ya fedha'],a:['full','read','none','none','full','read']},
 {d:['Board papers and the investor pack','Nyaraka za bodi na kifurushi cha mwekezaji'],a:['full','none','none','none','read','full']},
 {d:['Prices, suppliers and landed cost','Bei, wasambazaji na gharama ya kufika'],a:['full','read','none','none','read','agg']},
 {d:['System settings and user rights','Mipangilio ya mfumo na haki za watumiaji'],a:['full','none','none','none','none','none']}];
const CT={pack:['--green',['Monthly investor pack','Kifurushi cha kila mwezi cha mwekezaji']],board:['--green-edge',['Board meeting','Kikao cha bodi']],comp:['--ink',['Licence and compliance','Leseni na uzingatiaji wa sheria']],tax:['--mute',['Tax and accounts','Kodi na hesabu']],ms:['--gold',['Milestone','Lengo']]};
const CAL=[
 {m:1,e:[['ms',['Opening','Ufunguzi']],['pack',['Pack no. 1','Kifurushi Na. 1']]]},
 {m:2,e:[['pack',['Pack','Kifurushi']],['tax',['Monthly PAYE, NSSF and WCF','PAYE, NSSF na WCF za kila mwezi']]]},
 {m:3,e:[['pack',['Pack','Kifurushi']],['board',['Board, quarter 1','Bodi, robo ya 1']]]},
 {m:4,e:[['pack',['Pack','Kifurushi']],['comp',['Risk review','Mapitio ya hatari']]]},
 {m:5,e:[['pack',['Pack','Kifurushi']],['comp',['TMDA renewal filed','Maombi ya kuhuisha TMDA yawasilishwa']]]},
 {m:6,e:[['pack',['Pack','Kifurushi']],['board',['Board, quarter 2','Bodi, robo ya 2']]]},
 {m:7,e:[['pack',['Pack','Kifurushi']],['tax',['Budget draft','Rasimu ya bajeti']]]},
 {m:8,e:[['pack',['Pack','Kifurushi']],['comp',['30 June: TMDA permits expire','30 Juni: vibali vya TMDA vinaisha']]]},
 {m:9,e:[['pack',['Pack','Kifurushi']],['board',['Board, quarter 3','Bodi, robo ya 3']],['comp',['Mystery shop','Ukaguzi wa siri wa huduma']]]},
 {m:10,e:[['pack',['Pack','Kifurushi']],['tax',['Audit planning','Mipango ya ukaguzi']]]},
 {m:11,e:[['pack',['Pack','Kifurushi']],['tax',['Next year’s budget','Bajeti ya mwaka ujao']]]},
 {m:12,e:[['pack',['Pack','Kifurushi']],['board',['Board, quarter 4 and AGM preparation','Bodi, robo ya 4 na maandalizi ya mkutano mkuu']],['comp',['OSHA licence renewal','Kuhuisha leseni ya OSHA']],['ms',['Year-1 report','Ripoti ya mwaka 1']]]}];
window.AFYA_GOV={seats:SEATS,roles:ROLE,reserved:RESERVED,approvals:{roles:ROLES,levels:LV,matrix:DOA,paths:PATHS},calendar:{types:CT,months:CAL},access:{roles:ACC_ROLES,levels:ACC_L,matrix:ACC}};

const SRC=[
 ['Afya Basics financial model v1.2: revenue, members, running costs, tranches, head-office budget (planning estimates)','Modeli ya fedha ya Afya Basics v1.2: mapato, wanachama, gharama za uendeshaji, awamu za fedha, bajeti ya ofisi kuu (makadirio ya mipango)','','10 Nov 2026'],
 ['TMDA: registration and licensing of premises dealing in medical devices (business permits expire on 30 June)','TMDA: usajili na leseni za majengo yanayoshughulikia vifaa tiba (vibali vya biashara vinaisha tarehe 30 Juni)','https://www.tmda.go.tz/pages/registration-and-licensing-of-premises-1'],
 ['DLA Piper Africa (IMMMA Advocates), 10 April 2025: registration with the Personal Data Protection Commission in Tanzania','DLA Piper Africa (IMMMA Advocates), 10 Aprili 2025: usajili na Tume ya Ulinzi wa Taarifa Binafsi Tanzania','https://www.dlapiperafrica.com/en/tanzania/insights/2025/legal-article-a28156-registration-with-the-ersonal-data-protection-commission-in-tanzania-flyer-v2'],
 ['Bowmans, 23 June 2023: Tanzania regulations made under the Personal Data Protection Act 2022 (certificate renewal every five years)','Bowmans, 23 Juni 2023: kanuni za Tanzania chini ya Sheria ya Ulinzi wa Taarifa Binafsi 2022 (kuhuisha cheti kila miaka mitano)','https://bowmanslaw.com/insights/tanzania-regulations-made-under-the-personal-data-protection-act-2022/'],
 ['RSM Tanzania: compliance when operating a company in Tanzania (OSHA, tax clearance, fire certificate)','RSM Tanzania: uzingatiaji wa sheria katika kuendesha kampuni Tanzania (OSHA, cheti cha kodi, cheti cha zimamoto)','https://www.rsm.global/tanzania/insights/consulting-insights/compliance-when-operating-company-tanzania'],
 ['Daily News (Tanzania), 28 May 2026: BRELA rolls out an upgraded online system for company registration','Daily News (Tanzania), 28 Mei 2026: BRELA yazindua mfumo ulioboreshwa wa mtandaoni wa kusajili kampuni','https://dailynews.co.tz/brela-rolls-out-an-upgraded-online-system-to-speed-up-company-registration/'],
 ['Clyde & Co, July 2025: practical implications of the Business Licensing (Prohibition of Business Activities for Non-Citizens) Order, 2025','Clyde & Co, Julai 2025: athari za kiutendaji za Amri ya Leseni za Biashara (Marufuku ya Shughuli za Biashara kwa Wasio Raia), 2025','https://www.clydeco.com/en/insights/2025/07/practical-implications-of-the-business-licensing']];

const CSS=`<style>
.s72-body .ab-block>p{margin-top:var(--s2)}
.s72-vis{border:1px solid var(--line);background:var(--surface);padding:var(--s3)}
.s72-seats{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:var(--s1)}
.s72-seat{display:flex;flex-direction:column;gap:6px;text-align:left;background:var(--bg);border:1px solid var(--line);border-top:3px solid var(--c);padding:var(--s2);color:var(--ink);cursor:pointer;font:inherit;min-height:120px}
.s72-seat[aria-pressed="true"]{border-color:var(--green-edge);border-top-color:var(--c)}
.s72-seat b{font-weight:600;font-size:calc(var(--fs-body) - 2px)}
.s72-seat span{color:var(--mute);font-size:var(--fs-cap)}
.s72-seat em{font-style:normal;margin-top:auto;font-size:var(--fs-cap);color:var(--ink)}
.s72-tally{display:flex;height:10px;margin-top:var(--s3);gap:2px}.s72-tally i{display:block}
.s72-tl{display:flex;flex-wrap:wrap;gap:4px 18px;margin-top:8px;font-size:var(--fs-cap);color:var(--mute)}
.s72-info{margin-top:var(--s3);border-top:1px solid var(--line);padding-top:var(--s2)}
.s72-info h3{margin:0;font-size:var(--fs-body);font-weight:600}
.s72-info ul{margin:var(--s1) 0 0;padding-left:18px;font-size:calc(var(--fs-body) - 2px)}
.s72-rep p{margin-top:var(--s2)}.s72-rep p:first-child{margin-top:0}
.s72-cap{font-size:var(--fs-cap);margin-top:8px;max-width:var(--measure)}
.s72-res{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1px;background:var(--line);border:1px solid var(--line);margin-top:var(--s2)}
.s72-res div{background:var(--surface);padding:12px var(--s2);font-size:calc(var(--fs-body) - 2px)}.s72-res b{display:block;font-weight:600}.s72-res span{color:var(--mute)}
table.ab-t td.s72-lv{white-space:nowrap;font-size:var(--fs-cap)}
td.s72-lv.A{color:var(--ink)}td.s72-lv.C{color:var(--green-edge)}td.s72-lv.R,td.s72-lv.I,td.s72-lv.x{color:var(--mute)}
.s72-tool{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.2fr);gap:var(--s3);margin-top:var(--s3);border:1px solid var(--line);background:var(--surface);padding:var(--s3)}
.s72-tool label{display:block;font-size:calc(var(--fs-body) - 2px);margin-top:var(--s2)}.s72-tool label:first-child{margin-top:0}
.s72-tool select{display:block;width:100%;margin-top:6px;background:var(--bg);color:var(--ink);border:1px solid var(--line);padding:8px;font:inherit}
.s72-tool input[type=range]{width:100%;margin-top:6px;accent-color:var(--green-edge)}
.s72-chain{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-top:var(--s1)}
.s72-chain span{border:1px solid var(--line);padding:4px 10px;border-radius:999px;font-size:var(--fs-cap);color:var(--mute)}
.s72-chain span.on{background:var(--green-deep);border-color:var(--green-edge);color:var(--ink)}
.s72-pack{margin-top:var(--s3);border:1px solid var(--line);background:var(--surface)}
.s72-ph{display:flex;flex-wrap:wrap;gap:var(--s2);justify-content:space-between;align-items:center;padding:var(--s2) var(--s3);border-bottom:1px solid var(--line)}
.s72-ph b{font-weight:600}.s72-ph .ab-mute{font-size:var(--fs-cap)}
.s72-pc{display:flex;flex-wrap:wrap;gap:var(--s2);align-items:center}
.s72-pc input{accent-color:var(--green-edge);width:140px}
.s72-lay{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;background:var(--line)}
.s72-lay>div{background:var(--surface);padding:var(--s2) var(--s3)}
.s72-lay h3{margin:0 0 var(--s1);font-size:var(--fs-body);font-weight:600}.s72-lay h3 span{color:var(--mute);font-weight:300;font-size:var(--fs-cap);margin-left:6px}
.s72-k{padding:8px 0;border-top:1px solid var(--line)}
.s72-k small{display:block;color:var(--mute);font-size:var(--fs-cap)}
.s72-k b{display:block;color:var(--gold);font-weight:400;font-variant-numeric:tabular-nums}
.s72-k b.t{color:var(--ink)}
.s72-k i{display:block;font-style:normal;color:var(--mute);font-size:var(--fs-cap)}
.s72-spark{padding:var(--s2) var(--s3);border-top:1px solid var(--line)}
.s72-rep{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:var(--s3);margin-top:var(--s3);align-items:start}
.s72-msgw{border:1px solid var(--line);background:var(--surface)}
.s72-msgh{padding:12px var(--s2);border-bottom:1px solid var(--line);background:var(--green-deep)}
.s72-msgh b{display:block;font-weight:600;font-size:calc(var(--fs-body) - 2px)}.s72-msgh small{color:var(--ink);opacity:.8;font-size:var(--fs-cap)}
.s72-msg{margin:var(--s2);padding:var(--s2);background:var(--bg);border:1px solid var(--line);font-size:calc(var(--fs-body) - 2px)}
.s72-msg .r{display:flex;justify-content:space-between;gap:var(--s2);padding:3px 0}.s72-msg .r b{font-weight:600}.s72-msg .r span:last-child{font-variant-numeric:tabular-nums;color:var(--gold)}
.s72-msg hr{border:0;border-top:1px solid var(--line);margin:8px 0}
.s72-msg .al{color:var(--green-edge)}
.s72-msg time{display:block;text-align:right;color:var(--mute);font-size:var(--fs-cap);margin-top:8px}
.s72-btns{display:flex;flex-wrap:wrap;gap:6px;margin-top:var(--s2)}
.s72-btns button{background:none;border:1px solid var(--line);color:var(--mute);border-radius:999px;padding:6px 12px;font:inherit;font-size:var(--fs-cap);cursor:pointer;min-height:34px}
.s72-btns button[aria-pressed="true"]{background:var(--green-deep);border-color:var(--green-edge);color:var(--ink)}
.s72-cal{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:1px;background:var(--line);border:1px solid var(--line);margin-top:var(--s2)}
.s72-cal>div{background:var(--surface);padding:10px;min-height:110px}
.s72-cal>div>b{display:block;color:var(--gold);font-weight:600;font-size:var(--fs-cap);margin-bottom:6px}
.s72-ev{display:block;font-size:var(--fs-cap);line-height:1.35;border-left:3px solid var(--c);padding:1px 0 1px 6px;margin:4px 0}
.s72-leg{display:flex;flex-wrap:wrap;gap:6px 18px;margin-top:8px;font-size:var(--fs-cap);color:var(--mute)}
.s72-leg i{display:inline-block;width:3px;height:12px;margin-right:6px;vertical-align:-2px}
table.ab-t th.hi,table.ab-t td.hi{background:var(--green-deep)}
.s72-ul{margin:var(--s2) 0 0;padding-left:20px;max-width:var(--measure)}.s72-ul li{margin:8px 0}
@media (max-width:860px){.ab-sec table.ab-t td:first-child{min-width:180px}.s72-seats{grid-template-columns:repeat(2,minmax(0,1fr))}.s72-vis{padding:var(--s2)}.s72-res{grid-template-columns:minmax(0,1fr)}
 .s72-tool,.s72-rep{grid-template-columns:minmax(0,1fr)}.s72-tool{padding:var(--s2)}.s72-lay{grid-template-columns:minmax(0,1fr)}.s72-cal{grid-template-columns:repeat(2,minmax(0,1fr))}.s72-ph{padding:var(--s2)}}
</style>`;

function seatInfo(i){const st=SEATS[i];return `<h3>${E(L(st.seat))} · ${E(L(st.who))}</h3><span class="ab-mute" style="font-size:var(--fs-cap)">${E(st.vote?T('Voting seat','Kiti chenye kura'):T('Attends, no vote','Anahudhuria, hana kura'))}</span><ul>${ROLE[st.grp].map(r=>`<li>${E(L(r))}</li>`).join('')}</ul>`}
function lvCell(v){const [amt,c]=v;const lim=c==='A'&&amt>0?` ≤ ${tshM(amt)}`:'';return `<td class="s72-lv ${c==='-'?'x':c}">${E(L(LV[c]))}${E(lim)}</td>`}

function render(s,p,pv,nx){const M=window.MODEL,I=M.inputs,lean=A().isLean(),base=M.get('base'),best=M.get('best'),down=M.get('down');
 const m12=base.months[11],tr=I.seed.tranches.map(t=>t*I.seed.amount);
 let t3=null,t3d=null;try{t3=window.AB_S6.t3Month(I,base);t3d=window.AB_S6.t3Month(I,down)}catch(e){}
 const close=(/–\s*(\d{1,2}:\d{2})/.exec(I.store.hours)||[])[1]||'';
 const optName=lean?T('start-small','kuanza kidogo'):T('flagship','duka kuu');
 const votes=SEATS.filter(x=>x.vote);
 return `<article class="ab-sec" aria-labelledby="h-s7-2">${CSS}<div class="ab-wrap">
 <div class="ab-sec-no">${E(s.no)}</div><h1 id="h-s7-2">${E(s.title)}</h1>
 <p class="ab-summary">${E(T('Who decides what at Afya Basics, how money is approved and how the investor sees performance. A board of four votes balances the founders and the investor, with an independent chair. Eight reserved matters need the investor’s consent. Spending limits let the store run without daily sign-off. A monthly investor pack and a nightly 21:00 report come straight from the store system, and every role sees only the data its job needs. All of it is a proposal for the shareholders’ agreement, after legal review.','Nani anaamua nini katika Afya Basics, fedha zinaidhinishwa vipi na mwekezaji anaona utendaji vipi. Bodi ya kura nne inasawazisha waanzilishi na mwekezaji, ikiwa na mwenyekiti huru. Mambo manane yaliyohifadhiwa yanahitaji ridhaa ya mwekezaji. Viwango vya matumizi vinaruhusu duka kuendeshwa bila idhini ya kila siku. Kifurushi cha kila mwezi cha mwekezaji na ripoti ya kila usiku ya saa 21:00 vinatoka moja kwa moja kwenye mfumo wa duka, na kila nafasi inaona tu taarifa ambazo kazi yake inahitaji. Yote ni pendekezo kwa mkataba wa wanahisa, baada ya mapitio ya kisheria.'))}</p>

 <figure class="ab-visual s72-vis">
  <div class="s72-seats" role="group" aria-label="${E(T('The proposed board: five seats, four votes','Bodi inayopendekezwa: viti vitano, kura nne'))}">${SEATS.map((st,i)=>`<button type="button" class="s72-seat" data-s72seat="${i}" aria-pressed="${i===0}" style="--c:var(${GRP[st.grp]})"><b>${E(L(st.seat))}</b><span>${E(L(st.who))}</span><em>${E(st.vote?T('1 vote','Kura 1'):T('No vote','Hana kura'))}</em></button>`).join('')}</div>
  <div class="s72-tally" aria-hidden="true">${votes.map(v=>`<i style="flex:1;background:var(${GRP[v.grp]})"></i>`).join('')}</div>
  <div class="s72-tl"><span>${E(T('Founders: 2 votes','Waanzilishi: kura 2'))}</span><span>${E(T('Investor: 1 vote','Mwekezaji: kura 1'))}</span><span>${E(T('Independent chair: 1 vote','Mwenyekiti huru: kura 1'))}</span><span>${E(T('Quorum: 3, including the investor director','Akidi: 3, akiwemo mkurugenzi wa mwekezaji'))}</span></div>
  <div class="s72-info" id="s72-seat" aria-live="polite">${seatInfo(0)}</div>
  <figcaption class="ab-mute s72-cap">${E(T('The proposed board. Select a seat to see its role. A proposal for the shareholders’ agreement, after legal review.','Bodi inayopendekezwa. Chagua kiti kuona jukumu lake. Pendekezo kwa mkataba wa wanahisa, baada ya mapitio ya kisheria.'))}</figcaption>
 </figure>

 <div class="ab-body s72-body">
 <section class="ab-block"><h2>${E(T('Why a small company needs structure','Kwa nini kampuni ndogo inahitaji muundo'))}</h2>
  <ul class="s72-ul">
   <li>${T('<b>Informal trust does not scale.</b> When one person can spend, sign and report, errors and disputes stay hidden until they are large. Investors price that risk in.','<b>Kuaminiana bila utaratibu hakukui.</b> Mtu mmoja akiweza kutumia, kusaini na kuripoti, makosa na migogoro hubaki yamejificha hadi yawe makubwa. Wawekezaji huiweka hatari hiyo katika bei.')}</li>
   <li>${T('<b>The founders are not always in the store.</b> Approvals, cash and performance have to be visible from anywhere, the same day.','<b>Waanzilishi hawako dukani kila wakati.</b> Idhini, fedha na utendaji lazima vionekane kutoka popote, siku hiyohiyo.')}</li>
   <li>${T('<b>Health data raises the stakes.</b> Members’ names, addresses and Afya Check readings are personal data. A company that holds them registers with the Personal Data Protection Commission, and not every employee should see everything.','<b>Taarifa za afya zinaongeza uzito.</b> Majina, anwani na vipimo vya Afya Check vya wanachama ni taarifa binafsi. Kampuni inayozihifadhi inajisajili na Tume ya Ulinzi wa Taarifa Binafsi, na si kila mfanyakazi anapaswa kuona kila kitu.')}</li>
   <li>${T('<b>Licences expire.</b> TMDA business permits lapse every 30 June, and company records at BRELA must stay current. A missed date can close the store, so the compliance calendar is part of governance.','<b>Leseni zinaisha.</b> Vibali vya biashara vya TMDA vinaisha kila tarehe 30 Juni, na kumbukumbu za kampuni BRELA lazima ziwe za sasa. Tarehe ikipitwa duka linaweza kufungwa, hivyo kalenda ya uzingatiaji wa sheria ni sehemu ya utawala.')}</li>
  </ul>
 </section>

 <section class="ab-block"><h2>${E(T('The board: four votes, balanced','Bodi: kura nne, zilizosawazishwa'))}</h2>
  <p>${E(T('The board meets every quarter. Fahmy Abbas Cothema and Cecilia each hold a founder director’s seat; the seed investor names one director; an independent chair, with no stake on either side, holds the fourth vote. A company secretary and accountant attend without a vote. The founders cannot outvote the investor on matters that protect its capital, and the investor cannot run the company from the board. The chair breaks deadlocks on ordinary business; a deadlock on a reserved matter goes to mediation and then to an agreed expert, written into the shareholders’ agreement. If a foreign investor joins, the share structure is checked against the 2025 order on business activities reserved for citizens.','Bodi inakutana kila robo mwaka. Fahmy Abbas Cothema na Cecilia kila mmoja ana kiti cha mkurugenzi mwanzilishi; mwekezaji wa awali anateua mkurugenzi mmoja; mwenyekiti huru, asiye na maslahi upande wowote, ana kura ya nne. Katibu wa kampuni na mhasibu wanahudhuria bila kura. Waanzilishi hawawezi kumshinda mwekezaji kwa kura katika mambo yanayolinda mtaji wake, na mwekezaji hawezi kuendesha kampuni kupitia bodi. Mwenyekiti anavunja mkwamo katika mambo ya kawaida; mkwamo katika jambo lililohifadhiwa unaenda kwa usuluhishi kisha kwa mtaalamu aliyekubaliwa, kama itakavyoandikwa katika mkataba wa wanahisa. Mwekezaji wa kigeni akijiunga, muundo wa hisa unakaguliwa dhidi ya amri ya 2025 kuhusu shughuli za biashara zilizohifadhiwa kwa raia.'))} ${prop()}</p>
  <h3>${E(T('Reserved matters: the investor must consent','Mambo yaliyohifadhiwa: mwekezaji lazima atoe ridhaa'))}</h3>
  <div class="s72-res">${RESERVED.map((r,i)=>`<div><b>${E(L(r[0]))}</b><span>${i===3?T(`Each new store is budgeted at ${N('r-capex',I.growth.new_store_capex,'tshM')}`,`Kila duka jipya limepangiwa bajeti ya ${N('r-capex',I.growth.new_store_capex,'tshM')}`):E(L(r[1]))}</span></div>`).join('')}</div>
 </section>

 <section class="ab-block"><h2>${E(T('Who approves what, and up to how much','Nani anaidhinisha nini, na hadi kiasi gani'))}</h2>
  <p>${T(`A delegation table lets the store run without founder sign-off on routine spending, while large or unusual decisions go up. The limits are sized against the model: running costs are ${N('d-opex',base.opex_month,'tshM')} a month in this option, and a new store is ${N('d-capex',I.growth.new_store_capex,'tshM')}.`,`Jedwali la ugawaji wa mamlaka linaruhusu duka kuendeshwa bila idhini ya waanzilishi kwa matumizi ya kawaida, huku maamuzi makubwa au yasiyo ya kawaida yakipandishwa. Viwango vimepimwa dhidi ya modeli: gharama za uendeshaji ni ${N('d-opex',base.opex_month,'tshM')} kwa mwezi katika chaguo hili, na duka jipya ni ${N('d-capex',I.growth.new_store_capex,'tshM')}.`)} ${prop()}</p>
  <div class="ab-tw"><table class="ab-t"><thead><tr><th>${E(T('Decision','Uamuzi'))}</th>${ROLES.map(r=>`<th>${E(L(r))}</th>`).join('')}</tr></thead><tbody>
   ${DOA.map(r=>`<tr><td><b>${E(L(r.d))}</b><br><span class="ab-mute" style="font-size:var(--fs-cap)">${E(L(r.n))}</span></td>${r.l.map(lvCell).join('')}</tr>`).join('')}
  </tbody></table></div>
  <div class="s72-tool">
   <div><label>${E(T('Decision type','Aina ya uamuzi'))}<select id="s72-dt">${PATHS.map((x,i)=>`<option value="${i}">${E(L(x.d))}</option>`).join('')}</select></label>
    <label>${E(T('Amount','Kiasi'))} <b class="ab-gold" id="s72-amo"></b><input type="range" id="s72-am" min="0" max="100" value="38" aria-label="${E(T('Amount','Kiasi'))}"></label></div>
   <div><span class="ab-mute" style="font-size:var(--fs-cap)">${E(T('Approval path','Njia ya idhini'))}</span><div class="s72-chain" id="s72-ch"></div><p class="s72-cap" id="s72-cht"></p></div>
  </div>
  <p>${E(T('The limits are built into the store system: an order above a role’s limit cannot be released, and every override appears in the next investor pack.','Viwango vimejengwa ndani ya mfumo wa duka: oda iliyo juu ya kiwango cha nafasi haiwezi kutolewa, na kila ubatilishaji unaonekana katika kifurushi kinachofuata cha mwekezaji.'))}</p>
 </section>

 <section class="ab-block"><h2>${E(T('The monthly investor pack','Kifurushi cha kila mwezi cha mwekezaji'))}</h2>
  <p>${E(T('By the 10th of each month the investor receives a one-page report generated from the store system, in three layers: experience (repeat demand), engine (how simply the store runs) and economics (profit). This mock-up shows the model’s planned figures for the selected option. Move the month or switch the case.','Kabla ya tarehe 10 ya kila mwezi mwekezaji anapokea ripoti ya ukurasa mmoja inayotolewa na mfumo wa duka, katika ngazi tatu: uzoefu (mahitaji ya kujirudia), injini (urahisi wa kuendesha duka) na uchumi (faida). Mfano huu unaonyesha takwimu zilizopangwa za modeli kwa chaguo lililochaguliwa. Sogeza mwezi au badilisha hali.'))} ${est()}</p>
  <div class="s72-pack">
   <div class="s72-ph"><div><b>${E(T('Afya Basics · investor pack','Afya Basics · kifurushi cha mwekezaji'))}</b><br><span class="ab-mute" id="s72-pm"></span></div>
    <div class="s72-pc"><span class="ab-seg" role="group" aria-label="${E(T('Case','Hali'))}">${['base','best','down'].map(k=>`<button type="button" data-s72sc="${k}" aria-pressed="${k==='base'}">${E(L(SCN[k]))}</button>`).join('')}</span>
     <label style="font-size:var(--fs-cap)">${E(T('Month','Mwezi'))} <b class="ab-gold" id="s72-mo">12</b><br><input type="range" id="s72-m" min="1" max="12" value="12" aria-label="${E(T('Month','Mwezi'))}"></label></div></div>
   <div class="s72-lay" id="s72-lay"></div>
   <div class="s72-spark"><div class="ab-mute" style="font-size:var(--fs-cap)">${E(T('Monthly revenue (green) and store profit (gold), year 1, financial model v1.2','Mapato ya kila mwezi (kijani) na faida ya duka (dhahabu), mwaka 1, modeli ya fedha v1.2'))}</div><div id="s72-sp"></div></div>
  </div>
  <p class="ab-mute s72-cap">${E(T('Lines marked as targets are speed and service targets, measured by the system once trading starts. Every other figure is a planning estimate from the financial model, not a result.','Mistari iliyoandikwa kama malengo ni malengo ya kasi na huduma, yatakayopimwa na mfumo biashara ikianza. Kila takwimu nyingine ni makadirio ya mipango kutoka modeli ya fedha, si matokeo.'))}</p>
 </section>

 <section class="ab-block"><h2>${E(T('The daily 21:00 report','Ripoti ya kila siku ya saa 21:00'))}</h2>
  <div class="s72-rep">
   <div class="s72-msgw" role="img" aria-label="${E(T('Mock-up of the daily WhatsApp report','Mfano wa ripoti ya kila siku ya WhatsApp'))}"><div class="s72-msgh"><b>${E(T('Afya Basics · daily report','Afya Basics · ripoti ya kila siku'))}</b><small>${E(T('Automated · founders and board','Inajitokeza yenyewe · waanzilishi na bodi'))}</small></div><div class="s72-msg" id="s72-msg"></div></div>
   <div>
    <p>${E(T(`The ${lean?'start-small':'flagship'} store closes at ${close||'the end of trading'}. After the two-person cash-up, which matches the till, the mobile-money statements and the cash in the drawer, the system sends the founders and the board a WhatsApp summary at 21:00: sales by channel, visitors, new and leaving members, stock risks and issues. It is generated from the till records and cannot be edited before it is sent.`,`Duka la ${lean?'kuanza kidogo':'kuu'} linafungwa saa ${close||'mwisho wa biashara'}. Baada ya hesabu ya fedha ya watu wawili, inayolinganisha mauzo, taarifa za pesa za simu na fedha taslimu kwenye droo, mfumo unatuma kwa waanzilishi na bodi muhtasari wa WhatsApp saa 21:00: mauzo kwa njia, wageni, wanachama wapya na wanaoondoka, hatari za stoku na changamoto. Unatolewa kutoka kumbukumbu za mauzo na hauwezi kuhaririwa kabla ya kutumwa.`))}</p>
    <div class="s72-btns">${[1,3,6,9,12].map(m=>`<button type="button" data-s72day="${m}" aria-pressed="${m===12}">${E(T(`A day in month ${m}`,`Siku moja mwezi ${m}`))}</button>`).join('')}</div>
    <p class="ab-mute s72-cap">${E(T('The day’s figures are one thirtieth of the model’s month, base case, so they show a typical planned day. The alert lines are examples of what the system flags.','Takwimu za siku ni sehemu moja ya thelathini ya mwezi wa modeli, hali ya msingi, hivyo zinaonyesha siku ya kawaida iliyopangwa. Mistari ya tahadhari ni mifano ya kile mfumo unachoonyesha.'))}</p>
    <p>${T('<b>Weekly:</b> Monday 09:00, a one-page week summary and the open-issues list to both founders and the store lead. <b>At once:</b> a cash-up mismatch, a failed payment, a licence due within 60 days, a referral not followed up, or a stock-out on a top item.','<b>Kila wiki:</b> Jumatatu saa 09:00, muhtasari wa wiki wa ukurasa mmoja na orodha ya changamoto zilizo wazi kwa waanzilishi wote wawili na kiongozi wa duka. <b>Papo hapo:</b> hesabu ya fedha isiyolingana, malipo yaliyoshindwa, leseni inayoisha ndani ya siku 60, rufaa isiyofuatiliwa, au kuishiwa bidhaa muhimu.')}</p>
   </div>
  </div>
 </section>

 <section class="ab-block"><h2>${E(T('The twelve-month governance calendar','Kalenda ya utawala ya miezi kumi na miwili'))}</h2>
  <p>${E(T('Twelve months of governance, counted from opening (month 1). Licence and tax items follow the dates in the cited rules; board and pack dates are a proposal. The month that holds 30 June depends on the opening date and is shown here as month 8.','Miezi kumi na miwili ya utawala, ikihesabiwa kuanzia ufunguzi (mwezi 1). Mambo ya leseni na kodi yanafuata tarehe za kanuni zilizotajwa; tarehe za bodi na kifurushi ni pendekezo. Mwezi wenye tarehe 30 Juni unategemea tarehe ya ufunguzi na unaonyeshwa hapa kama mwezi 8.'))}</p>
  <div class="s72-cal">${CAL.map(c=>{const ev=c.e.slice();if(c.m>2)ev.push(['tax',['Payroll filings','Uwasilishaji wa mishahara']]);if(t3&&c.m===t3)ev.push(['ms',['Tranche 3 milestone met (model)','Lengo la awamu ya 3 limefikiwa (modeli)']]);
   return `<div><b>${E(T('Month ','Mwezi '))}${c.m}</b>${ev.map(e=>`<span class="s72-ev" style="--c:var(${CT[e[0]][0]})">${E(L(e[1]))}</span>`).join('')}</div>`}).join('')}</div>
  <div class="s72-leg">${Object.keys(CT).map(k=>`<span><i style="background:var(${CT[k][0]})"></i>${E(L(CT[k][1]))}</span>`).join('')}</div>
  <p>${T(`Fixed dates from the rules: TMDA business permits expire on 30 June every year; OSHA issues a yearly compliance licence; the data-protection certificate is renewed every five years, up to three months before it expires; a tax clearance certificate is needed to renew the business licence. Tranche 3 needs the store open three months, enough members and a monthly loss below the agreed limit (section 6.3): ${t3?T(`the base case meets it in month ${N('c-t3',t3,'int')}`,`hali ya msingi inalifikia mwezi ${N('c-t3',t3,'int')}`):E(T('the base case does not meet it in year 1','hali ya msingi hailifikii mwaka 1'))}, ${t3d?T(`the downside case in month ${N('c-t3d',t3d,'int')}`,`hali mbaya mwezi ${N('c-t3d',t3d,'int')}`):E(T('the downside case not in year 1','hali mbaya si ndani ya mwaka 1'))}.`,`Tarehe zisizobadilika kutoka kanuni: vibali vya biashara vya TMDA vinaisha tarehe 30 Juni kila mwaka; OSHA inatoa leseni ya uzingatiaji kila mwaka; cheti cha ulinzi wa taarifa kinahuishwa kila miaka mitano, hadi miezi mitatu kabla ya kuisha; cheti cha kodi kinahitajika ili kuhuisha leseni ya biashara. Awamu ya 3 inahitaji duka liwe wazi miezi mitatu, wanachama wa kutosha na hasara ya mwezi chini ya kiwango kilichokubaliwa (sehemu ya 6.3): ${t3?`hali ya msingi inalifikia mwezi ${N('c-t3',t3,'int')}`:'hali ya msingi hailifikii mwaka 1'}, ${t3d?`hali mbaya mwezi ${N('c-t3d',t3d,'int')}`:'hali mbaya si ndani ya mwaka 1'}.`)}</p>
 </section>

 <section class="ab-block"><h2>${E(T('Access levels','Viwango vya ruhusa'))}</h2>
  <p>${E(T('All staff work in one system, but each role sees only the data its job needs. Health readings are the most protected: an adviser sees a member’s readings only while serving that member, and the founders see totals, not names. The two founders hold the same access. Select a role to highlight it.','Wafanyakazi wote wanafanya kazi katika mfumo mmoja, lakini kila nafasi inaona tu taarifa ambazo kazi yake inahitaji. Vipimo vya afya ndivyo vinavyolindwa zaidi: mshauri anaona vipimo vya mwanachama tu wakati anamhudumia, na waanzilishi wanaona jumla, si majina. Waanzilishi wote wawili wana ruhusa sawa. Chagua nafasi kuiangazia.'))} ${prop()}</p>
  <div class="s72-btns" id="s72-ar">${ACC_ROLES.map((r,i)=>`<button type="button" data-s72r="${i}" aria-pressed="false">${E(L(r))}</button>`).join('')}</div>
  <div class="ab-tw"><table class="ab-t" id="s72-acc"><thead><tr><th>${E(T('Data','Taarifa'))}</th>${ACC_ROLES.map((r,i)=>`<th data-r="${i}">${E(L(r))}</th>`).join('')}</tr></thead><tbody>
   ${ACC.map(a=>`<tr><td><b>${E(L(a.d))}</b></td>${a.a.map((l,i)=>`<td data-r="${i}" class="${l==='none'?'ab-mute':''}">${E(L(ACC_L[l]))}</td>`).join('')}</tr>`).join('')}
  </tbody></table></div>
  <p>${E(T('Every view of a health reading is logged. Access is removed on the day someone leaves. Two-step sign-in is required for the founders, the accountant and the investor. These are the safeguards that registration with the data-protection commission describes.','Kila mara kipimo cha afya kinapotazamwa kinarekodiwa. Ruhusa inaondolewa siku mtu anapoondoka. Kuingia kwa hatua mbili kunahitajika kwa waanzilishi, mhasibu na mwekezaji. Hizi ndizo kinga zinazoelezwa na usajili na tume ya ulinzi wa taarifa.'))}</p>
 </section>

 <section class="ab-block"><h2>${E(T('One set of records, later the company’s own reporting system','Kumbukumbu moja, baadaye mfumo wa kampuni wenyewe wa kuripoti'))}</h2>
  <p>${E(T('The board seats, the reserved matters, the approval limits, the calendar and the access table on this page are kept as structured records, not as pictures. The same records are planned to become the company’s online reporting and access system for the founders, the board, the investor and the store team, with each person’s access level set from the table above. The rules the investor reads here are the rules the system will enforce.','Viti vya bodi, mambo yaliyohifadhiwa, viwango vya idhini, kalenda na jedwali la ruhusa katika ukurasa huu vinatunzwa kama kumbukumbu zilizopangwa, si kama picha. Kumbukumbu hizohizo zimepangwa kuwa mfumo wa kampuni wa mtandaoni wa kuripoti na ruhusa kwa waanzilishi, bodi, mwekezaji na timu ya duka, kiwango cha ruhusa cha kila mtu kikiwekwa kutoka jedwali lililo juu. Kanuni ambazo mwekezaji anasoma hapa ndizo kanuni ambazo mfumo utazisimamia.'))}</p>
 </section>

 <section class="ab-block"><h2>${E(T('Risks and the planned answer','Hatari na jibu lililopangwa'))}</h2>
  <ul class="s72-ul">
   <li>${T('<b>Founders and investor deadlock on a big decision.</b> An independent chair, a written list of reserved matters and a deadlock clause (mediation, then an agreed expert).','<b>Waanzilishi na mwekezaji wanakwama katika uamuzi mkubwa.</b> Mwenyekiti huru, orodha iliyoandikwa ya mambo yaliyohifadhiwa na kifungu cha mkwamo (usuluhishi, kisha mtaalamu aliyekubaliwa).')}</li>
   <li>${T('<b>Limits are ignored in a busy week.</b> The limits sit inside the system; an order above a limit cannot be released, and every override is reported.','<b>Viwango vinapuuzwa katika wiki yenye shughuli nyingi.</b> Viwango viko ndani ya mfumo; oda iliyo juu ya kiwango haiwezi kutolewa, na kila ubatilishaji unaripotiwa.')}</li>
   <li>${T('<b>Reports look good because the founders prepare them.</b> The pack is generated from the till, stock and bank records, the accountant reconciles it, and the investor can read the totals at any time.','<b>Ripoti zinaonekana nzuri kwa sababu waanzilishi wanaziandaa.</b> Kifurushi kinatolewa kutoka kumbukumbu za mauzo, stoku na benki, mhasibu anakilinganisha, na mwekezaji anaweza kusoma jumla wakati wowote.')}</li>
   <li>${T('<b>Too much process slows a small team.</b> Daily decisions stay with the store lead; only large or unusual items go up, and routine approvals take one tap on the handheld.','<b>Taratibu nyingi zinachelewesha timu ndogo.</b> Maamuzi ya kila siku yanabaki kwa kiongozi wa duka; ni mambo makubwa au yasiyo ya kawaida tu yanayopandishwa, na idhini za kawaida zinachukua mguso mmoja kwenye kifaa cha mkononi.')}</li>
  </ul>
 </section>
 </div>

 <section class="ab-block"><h2>${E(T('Key figures','Takwimu muhimu'))}</h2>
  ${A().figsHTML([
   {v:`${N('f-rev',base.y1.revenue,'tshM')} ${est()}`,l:T('Revenue in year 1, base case: the first number the pack tracks','Mapato mwaka 1, hali ya msingi: namba ya kwanza ambayo kifurushi kinafuatilia'),s:E(T(`Financial model v1.2, ${lean?'start-small':'flagship'} option`,`Modeli ya fedha v1.2, chaguo la ${lean?'kuanza kidogo':'duka kuu'}`))},
   {v:base.breakeven_month?`${E(T('Month','Mwezi'))} ${N('f-be',base.breakeven_month,'int')}`:E(T('After year 1','Baada ya mwaka 1')),l:T('First month with a store profit, base case','Mwezi wa kwanza wenye faida ya duka, hali ya msingi'),s:E(T(`Best case: ${best.breakeven_month?'month '+best.breakeven_month:'after year 1'}; downside: ${down.breakeven_month?'month '+down.breakeven_month:'not in year 1'}`,`Hali bora: ${best.breakeven_month?'mwezi '+best.breakeven_month:'baada ya mwaka 1'}; hali mbaya: ${down.breakeven_month?'mwezi '+down.breakeven_month:'si ndani ya mwaka 1'}`))},
   {v:N('f-mem',m12.members,'int'),l:T('Afya Box members by month 12, base case','Wanachama wa Afya Box ifikapo mwezi 12, hali ya msingi'),s:E(T('Financial model v1.2','Modeli ya fedha v1.2'))},
   {v:N('f-opex',base.opex_month,'tshM'),l:T('Running costs a month: the yardstick for the spending limits','Gharama za uendeshaji kwa mwezi: kipimo cha viwango vya matumizi'),s:E(T('Financial model v1.2','Modeli ya fedha v1.2'))}])}
 </section>

 <section class="ab-block"><h2>${E(T('What this costs','Hii inagharimu nini'))}</h2>
  <div class="ab-tw"><table class="ab-t"><thead><tr><th>${E(T('Item','Kipengele'))}</th><th>${E(T('Amount','Kiasi'))}</th><th>${E(T('Where it sits','Kinakaa wapi'))}</th></tr></thead><tbody>
   <tr><td>${E(T('Head-office budget a year, from year 2','Bajeti ya ofisi kuu kwa mwaka, kuanzia mwaka 2'))}</td><td class="ab-n">${tsh(I.growth.ho_fixed_year)} ${est()}</td><td class="ab-mute">${E(T('Financial model v1.2, the same in both options; governance costs are expected to sit inside it','Modeli ya fedha v1.2, ileile katika machaguo yote; gharama za utawala zinatarajiwa kukaa ndani yake'))}</td></tr>
   <tr><td>${E(T('Independent chair’s sitting fee','Posho ya vikao ya mwenyekiti huru'))}</td><td class="ab-mute">${E(T('to be quoted','nukuu inasubiriwa'))}</td><td class="ab-mute">${E(T('Not yet a separate line in the model','Bado si mstari tofauti katika modeli'))}</td></tr>
   <tr><td>${E(T('Outside accountant, company secretary and annual audit','Mhasibu wa nje, katibu wa kampuni na ukaguzi wa mwaka'))}</td><td class="ab-mute">${E(T('to be quoted','nukuu inasubiriwa'))}</td><td class="ab-mute">${E(T('Year 1: inside the store’s systems and running costs; to be confirmed','Mwaka 1: ndani ya mifumo na gharama za uendeshaji za duka; inasubiri kuthibitishwa'))}</td></tr>
   <tr><td>${E(T('Seed tranches released only against milestones in the pack','Awamu za mtaji wa awali zinazotolewa tu dhidi ya malengo yaliyo katika kifurushi'))}</td><td class="ab-n">${tr.map((v,i)=>N('w-t'+i,v,'tshM')).join(' · ')}</td><td class="ab-mute">${E(T(`Financial model v1.2, ${optName} option (section 6.3)`,`Modeli ya fedha v1.2, chaguo la ${optName} (sehemu ya 6.3)`))}</td></tr>
  </tbody></table></div>
 </section>

 ${A().openHTML([
  E(T('The cost of governance: the independent chair’s fee, the outside accountant and company secretary, and the annual audit are still to be quoted and added to the model.','Gharama ya utawala: posho ya mwenyekiti huru, mhasibu wa nje na katibu wa kampuni, na ukaguzi wa mwaka bado zinasubiri nukuu na kuongezwa kwenye modeli.')),
  E(T('The approval limits, the reserved matters, the deadlock clause and the board composition are proposals, to be written into the shareholders’ agreement after legal review.','Viwango vya idhini, mambo yaliyohifadhiwa, kifungu cha mkwamo na muundo wa bodi ni mapendekezo, yataandikwa katika mkataba wa wanahisa baada ya mapitio ya kisheria.')),
  E(T('The independent chair is not yet named.','Mwenyekiti huru bado hajatajwa.')),
  E(T('The data-protection registration and its renewal dates are to be confirmed once the company is registered.','Usajili wa ulinzi wa taarifa na tarehe zake za kuhuisha vitathibitishwa kampuni ikishasajiliwa.')),
  E(T('The calendar dates for 30 June and the OSHA renewal depend on the opening date.','Tarehe za kalenda za 30 Juni na kuhuisha OSHA zinategemea tarehe ya ufunguzi.'))])}

 ${A().sourcesHTML(SRC.map(x=>x[3]?{t:T(x[0],x[1]),u:x[2],chk:x[3]}:{t:T(x[0],x[1])+L(NRC),u:x[2]}))}
 ${A().pagerHTML(pv,nx)}
 </div></article>`}

function init(){const M=window.MODEL,I=M.inputs,$=id=>document.getElementById(id);if(!$('s72-seat'))return;
 const press=(sel,b)=>document.querySelectorAll(sel).forEach(q=>q.setAttribute('aria-pressed',String(q===b)));
 document.querySelectorAll('[data-s72seat]').forEach(b=>b.onclick=()=>{$('s72-seat').innerHTML=seatInfo(+b.dataset.s72seat);press('[data-s72seat]',b)});
 /* approval finder: log scale from TSh 50,000 to TSh 200M */
 const amt=v=>{const lo=Math.log(5e4),hi=Math.log(2e8),x=Math.exp(lo+(hi-lo)*v/100),mg=Math.pow(10,Math.floor(Math.log10(x))-1);return Math.round(x/mg)*mg};
 const chain=()=>{const P=PATHS[+$('s72-dt').value],a=amt(+$('s72-am').value);$('s72-amo').textContent=tsh(a);const k=P.p.findIndex(x=>a<=x[0]),hit=P.p[k];
  $('s72-ch').innerHTML=P.p.map((x,i)=>`<span class="${i===k?'on':''}">${E(L(ROLES[x[1]]))}</span>`).join('<span aria-hidden="true" style="border:0;padding:0">›</span>');
  const who=L(ROLES[hit[1]]),inv=hit[1]===4;
  $('s72-cht').textContent=T(`${who}: ${inv?'the board approves and the investor director must consent in writing':'approves'} ${tsh(a)} for “${L(P.d).toLowerCase()}”.${k>0?` Up to ${tsh(P.p[k-1][0])} it stays with: ${L(ROLES[P.p[k-1][1]]).toLowerCase()}.`:''}`,`${who}: ${inv?'bodi inaidhinisha na mkurugenzi wa mwekezaji lazima atoe ridhaa kwa maandishi':'anaidhinisha'} ${tsh(a)} kwa “${L(P.d).toLowerCase()}”.${k>0?` Hadi ${tsh(P.p[k-1][0])} inabaki kwa: ${L(ROLES[P.p[k-1][1]]).toLowerCase()}.`:''}`)};
 $('s72-dt').onchange=chain;$('s72-am').oninput=chain;chain();
 /* investor pack */
 let sc='base',mo=12;
 const kp=(l,v,n,t)=>`<div class="s72-k"><small>${E(l)}</small><b class="${t?'t':''}">${E(v)}</b>${n?`<i>${E(n)}</i>`:''}</div>`;
 const pack=()=>{const r=M.get(sc),m=r.months[mo-1],pm=mo>1?r.months[mo-2]:null,cum=m.cum_profit,gm=m.gross_profit/m.revenue,tgt=T('target','lengo');
  $('s72-mo').textContent=mo;$('s72-pm').textContent=T(`Month ${mo} · ${L(SCN[sc]).toLowerCase()} · planning estimates`,`Mwezi ${mo} · ${L(SCN[sc]).toLowerCase()} · makadirio ya mipango`);
  $('s72-lay').innerHTML=`<div><h3>${E(T('Experience','Uzoefu'))}<span>${E(T('repeat demand','mahitaji ya kujirudia'))}</span></h3>
    ${kp(T('Visitors a day','Wageni kwa siku'),nf(m.visitors_day),T(`model ramp from ${I.store.visitors_day_start} to ${I.store.visitors_day_m12}`,`ongezeko la modeli kutoka ${I.store.visitors_day_start} hadi ${I.store.visitors_day_m12}`))}
    ${kp(T('Afya Box members','Wanachama wa Afya Box'),nf(m.members),pm?T(`+${nf(m.joins)} joined, −${nf(m.left)} left this month`,`+${nf(m.joins)} wamejiunga, −${nf(m.left)} wameondoka mwezi huu`):T('opening month','mwezi wa ufunguzi'))}
    ${kp(T('Members who leave each month','Wanachama wanaoondoka kila mwezi'),pc(I.members.monthly_churn,1),T('model assumption','dhana ya modeli'))}
    ${kp(T('Average walk-in basket','Wastani wa manunuzi ya dukani'),tsh(I.store.basket),T('model input','pembejeo ya modeli'))}
    ${kp(T('Satisfaction score (NPS)','Alama ya kuridhika (NPS)'),'≥ 60',tgt+' · '+T('SMS survey after a visit','utafiti wa SMS baada ya kutembelea'),1)}</div>
   <div><h3>${E(T('Engine','Injini'))}<span>${E(T('how simply the store runs','urahisi wa kuendesha duka'))}</span></h3>
    ${kp(T('Find and pay in store','Kupata na kulipa dukani'),T('under 3 min','chini ya dak. 3'),tgt+' · '+T('timed by the till','inapimwa na mfumo wa mauzo'),1)}
    ${kp(T('Payment time','Muda wa kulipa'),T('under 30 s','chini ya sek. 30'),tgt+' · '+T('mobile-money push to receipt','ombi la pesa za simu hadi risiti'),1)}
    ${kp(T('Stock-outs, top 100 items','Kuishiwa bidhaa, bidhaa 100 kuu'),T('under 2%','chini ya 2%'),tgt,1)}
    ${kp(T('People on the store team','Watu katika timu ya duka'),String(I.staff.reduce((a,x)=>a+x[1],0)),T('model staff plan','mpango wa wafanyakazi wa modeli'))}
    ${kp(T('Online and WhatsApp sales','Mauzo ya mtandaoni na WhatsApp'),tshM(m.online),T('this month','mwezi huu'))}</div>
   <div><h3>${E(T('Economics','Uchumi'))}<span>${E(T('profit','faida'))}</span></h3>
    ${kp(T('Revenue this month','Mapato mwezi huu'),tshM(m.revenue),pm?T(`${((m.revenue/pm.revenue-1)*100).toFixed(1)}% on last month`,`${((m.revenue/pm.revenue-1)*100).toFixed(1)}% ukilinganisha na mwezi uliopita`):'')}
    ${kp(T('Gross margin','Faida ghafi'),pc(gm,1),T('store, boxes and online together','duka, maboksi na mtandaoni kwa pamoja'))}
    ${kp(T('Running costs','Gharama za uendeshaji'),tshM(m.opex),T('rent, staff, systems, marketing and more','kodi, wafanyakazi, mifumo, matangazo na mengineyo'))}
    ${kp(T('Store profit this month','Faida ya duka mwezi huu'),sg(m.profit),m.profit<0?T('below break-even','chini ya kufikia faida'):T('above break-even','juu ya kufikia faida'))}
    ${kp(T('Cumulative profit to date','Faida ya jumla hadi sasa'),sg(cum),T('before head office and tax','kabla ya ofisi kuu na kodi'))}</div>`;
  const el=$('s72-sp'),W=Math.max(260,Math.floor(el.clientWidth)),H=110,pl=8,pr=8,pt=10,pb=22,ms=r.months,mx=Math.max(...ms.map(x=>x.revenue)),mn=Math.min(0,...ms.map(x=>x.profit));
  const x=i=>pl+i*(W-pl-pr)/11,y=v=>pt+(H-pt-pb)*(mx-v)/(mx-mn),ln=k=>ms.map((q,i)=>(i?'L':'M')+x(i).toFixed(1)+','+y(q[k]).toFixed(1)).join(' ');
  el.innerHTML=`<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${E(T('Monthly revenue and store profit in year 1','Mapato ya kila mwezi na faida ya duka mwaka 1'))}" style="display:block"><line x1="${pl}" x2="${W-pr}" y1="${y(0).toFixed(1)}" y2="${y(0).toFixed(1)}" style="stroke:var(--line)"/><path d="${ln('revenue')}" fill="none" style="stroke:var(--green-edge)" stroke-width="2"/><path d="${ln('profit')}" fill="none" style="stroke:var(--gold)" stroke-width="2"/>${ms.map((q,i)=>`<text x="${x(i).toFixed(1)}" y="${H-6}" font-size="10" text-anchor="middle" style="fill:var(--mute)">${i+1}</text>`).join('')}<line x1="${x(mo-1).toFixed(1)}" x2="${x(mo-1).toFixed(1)}" y1="${pt}" y2="${H-pb}" style="stroke:var(--mute)" stroke-dasharray="2 3"/></svg>`;
 };
 document.querySelectorAll('[data-s72sc]').forEach(b=>b.onclick=()=>{sc=b.dataset.s72sc;press('[data-s72sc]',b);pack()});$('s72-m').oninput=e=>{mo=+e.target.value;pack()};pack();
 /* daily report */
 const rep=mm=>{const r=M.get('base'),m=r.months[mm-1],d=30,w=m.walkin/d,bx=m.boxes/d,on=m.online/d,ot=(m.services+m.commission+m.kazini)/d;
  const row=(a,b,bold)=>`<div class="r">${bold?`<b>${E(a)}</b><b>${E(b)}</b>`:`<span>${E(a)}</span><span>${E(b)}</span>`}</div>`;
  $('s72-msg').innerHTML=`<b>${E(T(`Store 1 · a typical day in month ${mm}`,`Duka 1 · siku ya kawaida mwezi ${mm}`))}</b><hr>
   ${row(T('Walk-in sales','Mauzo ya dukani'),tsh(w))}${row(T('Afya Box revenue (one day’s share)','Mapato ya Afya Box (sehemu ya siku moja)'),tsh(bx))}${row(T('Online and WhatsApp','Mtandaoni na WhatsApp'),tsh(on))}${row(T('Services and business kits','Huduma na vifurushi vya biashara'),tsh(ot))}${row(T('Total','Jumla'),tsh(w+bx+on+ot),1)}<hr>
   ${row(T('Visitors','Wageni'),nf(m.visitors_day))}${row(T('New members (average)','Wanachama wapya (wastani)'),(m.joins/d).toFixed(1))}${row(T('Members leaving (average)','Wanachama wanaoondoka (wastani)'),(m.left/d).toFixed(1))}${row(T('Cash-up','Hesabu ya fedha'),T('matched','inalingana'))}<hr>
   <span class="al">${E(T('Stock: 2 items below reorder point, orders drafted for approval','Stoku: bidhaa 2 chini ya kiwango cha kuagiza, oda zimeandaliwa kwa idhini'))}</span><br>${E(T('Issue: 1 delivery late (rain), customer called back','Changamoto: usafirishaji 1 umechelewa (mvua), mteja amepigiwa simu'))}<br><span class="al">${E(T('Licence: TMDA permit renewal due in 54 days','Leseni: kuhuisha kibali cha TMDA kunatakiwa ndani ya siku 54'))}</span><time>21:00</time>`;
  press('[data-s72day]',document.querySelector(`[data-s72day="${mm}"]`))};
 document.querySelectorAll('[data-s72day]').forEach(b=>b.onclick=()=>rep(+b.dataset.s72day));rep(12);
 /* access highlight */
 let ar=-1;document.querySelectorAll('[data-s72r]').forEach(b=>b.onclick=()=>{const r=+b.dataset.s72r;ar=ar===r?-1:r;document.querySelectorAll('[data-s72r]').forEach(q=>q.setAttribute('aria-pressed',String(+q.dataset.s72r===ar)));
  document.querySelectorAll('#s72-acc [data-r]').forEach(c=>c.classList.toggle('hi',+c.dataset.r===ar))});
 let t,onRz=()=>{clearTimeout(t);t=setTimeout(pack,120)};addEventListener('resize',onRz);addEventListener('afya:leave',()=>removeEventListener('resize',onRz),{once:true})}

window.SECTIONS['s7-2']={render,init,v2:true};
})();
