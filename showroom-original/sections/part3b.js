/* part3b: sections 3.5 Afya Boxes & Afya Choice · 3.6 The product range · 3.7 Premium, gifts and rentals · 3.8 Digital store and app */
(function(){
const I=MODEL.inputs, F=MODEL.fmt, T=F.tsh;
const MB=I.members, PACK=MB.packing_delivery_in_price;
const r1k=n=>Math.round(n/1000)*1000;
const bnd=(a,b)=>'TSh '+Math.round(a/1000)+'k–'+Math.round(b/1000)+'k';
const kk=n=>n>=1e6?F.m(n):'TSh '+Math.round(n/1000).toLocaleString('en-US')+'k';

/* ---------- sources (opened and checked, Oct–Nov 2026) ---------- */
const S={
 who:['WHO, United Republic of Tanzania hypertension profile (2012 STEPS survey data)','https://cdn.who.int/media/docs/default-source/country-profiles/hypertension/tza_en.pdf'],
 q2:['TanzaniaInvest, Aug 2026: Telecom subscriptions reach 117 million in Q2 2026 (TCRA data, quarter ending June 2026)','https://tanzaniainvest.com/telecoms/telecom-subscriptions-q2-2026'],
 dn:['AllAfrica / Daily News, 17 Aug 2026: Tanzania’s digital rise, what the latest TCRA report tells us (quarter ending June 2026)','https://allafrica.com/stories/202608170282.html'],
 mm:['AllAfrica / Daily News, 10 Feb 2026: Mobile money accounts double in five years (TCRA, December 2025)','https://allafrica.com/stories/202602100375.html'],
 wa:['TanzaniaInvest, 31 Oct 2022: Facebook No.1 social network in Tanzania, WhatsApp No.2 (TCRA statistics, Q3 2022)','https://www.tanzaniainvest.com/telecoms/social-media-network-ranking-q3-2022'],
 ecom:['US International Trade Administration, Tanzania Country Commercial Guide: eCommerce (updated 19 May 2026)','https://trade.gov/country-commercial-guides/tanzania-e-commerce'],
 rem:['The Citizen, 27 May 2026: Diaspora remittances hit Sh3.3 trillion (2024/25 financial year)','https://www.thecitizen.co.tz/tanzania/diaspora/diaspora-remittances-hit-sh3-3-trillion-as-tanzania-deepens-global-engagement-5473984'],
 md:['Tanzania Food, Drugs and Cosmetics (Control of Medical Devices) Regulations, 2015, regulations 6 and 50 (via TradeBarriers.org NTM record)','https://www.tradebarriers.org/ntm/measures/view/7912'],
 idf:['IDF Diabetes Atlas, country report: United Republic of Tanzania (2024 estimates)','https://diabetesatlas.org/data-by-location/country/united-republic-of-tanzania/'],
 nbs:['National Bureau of Statistics, June 2024: 2022 Population and Housing Census, key findings (basic demographic and socio-economic profile)','https://sensa.nbs.go.tz/publication/08.%20Key_Findings_Basic_Demographic_and_Socio-economic_%20Eng_%2012.06.2024%20Final.pdf'],
 dhs:['Countdown to 2030, Feb 2025: Tanzania DHS-MIS 2022 coverage profile (exclusive breastfeeding, antenatal care)','https://www.countdown2030.org/wp-content/uploads/2025/02/Tanzania-DHS-2022.pdf'],
 nap:['NHS: How to change your baby’s nappy','https://www.nhs.uk/conditions/baby/caring-for-a-newborn/how-to-change-your-babys-nappy/'],
 cord:['WHO recommendations on maternal and newborn care for a positive postnatal experience (2022): clean, dry cord care (BIGG-REC record)','https://bigg-rec.bvsalud.org/en/recommendations/650dedcdad49cb5c6764a26081081fd813d8178c'],
 iycf:['WHO fact sheet, 4 Aug 2026: Infant and young child feeding','https://www.who.int/News-Room/Fact-Sheets/Detail/Infant-and-Young-Child-Feeding'],
 ifa:['WHO eLENA, updated 26 Jul 2024: Daily iron and folic acid supplementation during pregnancy','https://who.int/tools/elena/interventions/daily-iron-pregnancy'],
 loch:['University Hospital Southampton NHS FT, reviewed Feb 2024: Blood loss, what to expect after the birth of your baby','https://www.uhs.nhs.uk/Media/UHS-website-2019/Patientinformation/Pregnancyandbirth/Blood-loss-what-to-expect-after-the-birth-of-your-baby-743a-PIL.pdf'],
 nice:['GPnotebook: NICE (NG17) blood glucose self-monitoring for adults with type 1 diabetes','https://gpnotebook.com/pages/diabetes-and-endocrinology/nice-blood-glucose-self-monitoring-for-type-1-diabetes'],
 iwgdf:['Bus et al., Diabetes/Metabolism Research and Reviews 2023: IWGDF guidelines on the prevention of foot ulcers in persons with diabetes (abstract)','https://pubmed.ncbi.nlm.nih.gov/37302121/'],
 ish:['American Family Physician, 15 Jun 2021: Hypertension, new guidelines from the International Society of Hypertension (ISH 2020)','https://www.aafp.org/pubs/afp/issues/2021/0615/p763.html'],
 salt:['WHO Europe, 14 Mar 2022: 5 recommendations to reduce salt intake','https://www.who.int/europe/news/item/14-03-2022-5-recommendations-to-reduce-salt-intake-to-live-longer-and-healthier-lives'],
 wales:['Welsh Government, Nov 2022: Guidance for the provision of continence containment products for adults in Wales (consensus document)','https://www.llyw.cymru/sites/default/files/publications/2022-11/guidance-for-the-provision-of-continence-containment-products-for-adults-in-wales-consensus-document-2022_0.pdf'],
 per:['NHS 111 Wales: Periods','https://111.wales.nhs.uk/periods/'],
 ssi:['WHO recommendation: advanced versus standard dressings on primarily closed surgical wounds, surgical site infection prevention (BIGG-REC record)','https://bigg-rec.bvsalud.org/en/recommendations/ff6ad489b3dc0eface606fac1dabe248c8adce23'],
 arc:['American Red Cross: Anatomy of a first aid kit','https://www.redcross.org/get-help/how-to-prepare-for-emergencies/anatomy-of-a-first-aid-kit'],
 rf:['Royal Free London NHS FT: Kidney patients, how to manage your fluid','https://www.royalfree.nhs.uk/patients-and-visitors/patient-information-leaflets/kidney-patients-how-manage-your-fluid'],
 rb:['Royal Berkshire NHS FT, Jan 2026: Care of fistulas and grafts in dialysis patients','https://www.royalberkshire.nhs.uk/media/tbakqdm2/care-of-fistulas-and-grafts-in-dialysis-patients-for-care-home-staff_jan26.pdf'],
 kcuk:['Kidney Care UK (hosted by NHS Wales): Itching and chronic kidney disease','https://emedia2.nhs.wales/wrcn/assets/Medicines/Itching_and_chronic_kidney_disease_CKD%20KCUK.pdf'],
 itn:['WHO eLENA, updated 9 Aug 2023: Insecticide-treated nets for preventing malaria in pregnant women','https://www.who.int/tools/elena/interventions/bednets-malaria-pregnancy'],
 teeth:['NHS: Taking care of children’s teeth (fluoride toothpaste by age, brushing twice a day)','https://www.nhs.uk/live-well/healthy-body/taking-care-of-childrens-teeth/'],
 hypo:['NHS 111 Wales: Hypoglycaemia (treat below 4 mmol/L with fast sugar, recheck after 10–15 minutes)','https://111.wales.nhs.uk/Hypoglycaemia/'],
 falls:['WHO global report on falls prevention in older age (28–35% of people 65+ fall each year)','https://www.who.int/publications/i/item/9789241563536'],
 pu:['NHS: Pressure ulcers (pressure sores), who is at risk and prevention','https://www.nhs.uk/conditions/pressure-sores/'],
 lice:['NHS: Head lice and nits (detection combing, wet-combing days 1, 5, 9, 13)','https://www.nhs.uk/conditions/head-lice-and-nits/'],
 acne:['NHS: Acne, self-help (gentle cleanser twice a day, non-comedogenic products)','https://www.nhs.uk/conditions/acne/'],
 ms:['NHS: Vomiting and morning sickness in pregnancy (ginger, acupressure, usually clears by weeks 16–20)','https://www.nhs.uk/pregnancy/related-conditions/common-symptoms/vomiting-and-morning-sickness/'],
 osh:['Tanzania: Occupational Safety and Health (First Aid and Welfare Facilities) Rules, 2015 (GN 147), TanzLII','https://tanzlii.org/en/akn/tz/act/gn/2015/147/eng@2015-04-03'],
 wound:['Cambridge University Hospitals NHS FT: Caring for your surgical wound','https://cuh.nhs.uk/patient-information/caring-for-your-surgical-wound'],
 tbs:['Daily News, 19 Mar 2025: Tanzania bans over 100 cosmetic products amid health concerns (TBS)','https://dailynews.co.tz/tanzania-bans-over-100-cosmetic-products-amid-health-concerns/']};
const src=keys=>keys.map(k=>S[k]);
const cn=(keys,k)=>cref(S[k][1],keys.indexOf(k)+1,S[k][0]);

/* ---------- Care Zones ---------- */
const ZN=[{k:'mb',n:I.care_zones[0],c:'#ff9fc4',fam:110},{k:'hd',n:I.care_zones[1],c:'#ff8a7a',fam:70},{k:'mr',n:I.care_zones[2],c:'#d9b56e',fam:80},
 {k:'fa',n:I.care_zones[3],c:'#ffb36b',fam:85},{k:'pc',n:I.care_zones[4],c:'#c9b8ff',fam:115},{k:'sr',n:I.care_zones[5],c:'#f2c96b',fam:60}];
const Z=k=>ZN.find(z=>z.k===k);
/* ---------- CSS ---------- */
/* addCSS lives in the main script, which loads after this file, so inject directly with the same id convention */
(typeof addCSS==='function'?addCSS:function(id,css){if(document.getElementById('css-'+id))return;const st=document.createElement('style');st.id='css-'+id;st.textContent=css;document.head.appendChild(st)})('p3b',`
.p3b-tiles{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}
.p3b-tile{position:relative;display:flex;flex-direction:column;text-align:left;padding:16px 16px 18px;border-radius:20px;border:1px solid var(--edge);background:linear-gradient(170deg,var(--panel2),rgba(2,6,8,.75));color:var(--ink);cursor:pointer;min-width:0;overflow:hidden;transition:border-color .25s,transform .2s,box-shadow .3s;font:inherit}
.p3b-tile::before{content:"";position:absolute;inset:0 0 auto;height:3px;background:var(--c)}
.p3b-tile:hover,.p3b-tile.on{border-color:var(--c);transform:translateY(-3px);box-shadow:0 20px 50px -24px var(--c)}
.p3b-tile svg{width:100%;height:auto;max-height:118px;margin:2px 0 8px}
.p3b-tile .z{font:500 .58rem var(--f-hud);letter-spacing:.16em;text-transform:uppercase;color:var(--c)}
.p3b-tile b{display:block;margin-top:4px;font:700 1rem/1.2 var(--f-display)}
.p3b-tile i{display:block;margin-top:2px;font-style:italic;font-size:.8rem;color:var(--gold2)}
.p3b-tile p{margin:8px 0 0;font-size:.8rem;line-height:1.45;color:var(--ink2)}
.p3b-tile .pr{margin-top:auto;padding-top:10px;font:500 .82rem var(--f-hud);color:var(--neon2)}
.p3b-boxinfo{margin-top:14px;display:grid;grid-template-columns:minmax(0,220px) minmax(0,1fr);gap:22px;align-items:center;padding:22px 24px;border-radius:22px;border:1px solid var(--edge2);background:linear-gradient(140deg,rgba(242,201,107,.08),rgba(2,6,8,.6))}
.p3b-boxinfo h3{font:700 1.3rem var(--f-display)}
.p3b-boxinfo .who{margin:4px 0 12px;color:var(--ink2);font-size:.92rem}
.p3b-cats{display:flex;flex-wrap:wrap;gap:7px;margin:0;padding:0;list-style:none}
.p3b-cats li{padding:6px 11px;border-radius:999px;border:1px dashed rgba(242,201,107,.4);font-size:.8rem;color:var(--ink)}
.p3b-ex{display:block;margin-top:12px;font:500 .62rem var(--f-hud);letter-spacing:.14em;text-transform:uppercase;color:var(--gold)}
.p3b-seg{display:inline-flex;flex-wrap:wrap;gap:6px;padding:5px;border-radius:14px;border:1px solid var(--edge);background:rgba(2,10,8,.6)}
.p3b-seg button{padding:9px 14px;border-radius:10px;border:0;background:none;color:var(--ink2);font:600 .84rem var(--f-body);cursor:pointer}
.p3b-seg button.on{background:linear-gradient(135deg,var(--gold2),var(--gold));color:#1a1204}
.p3b-sel{width:100%;padding:11px 12px;border-radius:12px;border:1px solid var(--edge2);background:#04110d;color:var(--ink);font:600 .92rem var(--f-body)}
.p3b-plans{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.p3b-plan{padding:22px;border-radius:20px;border:1px solid var(--edge);background:var(--panel);min-width:0}
.p3b-plan.best{border-color:var(--edge2);background:linear-gradient(160deg,rgba(242,201,107,.12),rgba(2,6,8,.6))}
.p3b-plan small{font:500 .6rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--gold)}
.p3b-plan h3{margin-top:6px;font:700 1.15rem var(--f-display)}
.p3b-plan b{display:block;margin-top:10px;font:500 1.5rem var(--f-hud);color:var(--neon2)}
.p3b-plan p{margin:6px 0 0;font-size:.86rem;color:var(--ink2)}
.p3b-stack{display:flex;height:46px;border-radius:12px;overflow:hidden;margin:14px 0 10px;border:1px solid var(--edge)}
.p3b-stack div{display:flex;align-items:center;justify-content:center;font:500 .7rem var(--f-hud);color:#04110d;white-space:nowrap;overflow:hidden;transition:flex-basis .5s}
.p3b-legend{display:grid;gap:6px;font-size:.86rem;color:var(--ink2)}
.p3b-legend span{display:flex;gap:10px;align-items:baseline}
.p3b-legend i{flex:0 0 10px;height:10px;border-radius:3px;transform:translateY(1px)}
.p3b-legend b{margin-left:auto;font:500 .86rem var(--f-hud);color:var(--ink)}
.p3b-demo{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);gap:16px}
.p3b-pane{padding:22px;border-radius:20px;border:1px solid var(--edge);background:var(--panel);min-width:0}
.p3b-pane.g{border-color:var(--edge2);background:linear-gradient(150deg,rgba(242,201,107,.10),rgba(2,6,8,.6))}
.p3b-cat{padding:14px 0;border-top:1px solid var(--edge)}
.p3b-cat:first-of-type{border-top:0}
.p3b-cat h4{margin:0 0 8px;font:700 .9rem var(--f-display);display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap}
.p3b-cat h4 span{font:500 .66rem var(--f-hud);color:var(--ink3);letter-spacing:.08em}
.p3b-opts{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:6px}
.p3b-opt{padding:8px 8px;border-radius:11px;border:1px solid var(--edge);background:rgba(2,10,8,.5);color:var(--ink2);text-align:left;cursor:pointer;min-width:0;font:inherit;transition:all .2s}
.p3b-opt b{display:block;font:700 .8rem var(--f-body);color:var(--ink)}
.p3b-opt small{display:block;font-size:.66rem;line-height:1.3}
.p3b-opt em{display:block;margin-top:3px;font:500 .66rem var(--f-hud);font-style:normal;color:var(--neon2)}
.p3b-opt:hover{border-color:var(--edge2)}
.p3b-opt.on{border-color:var(--neon);background:rgba(95,191,143,.12);box-shadow:0 0 0 1px rgba(95,191,143,.4)}
.p3b-opt:disabled{cursor:not-allowed;opacity:.5}
.p3b-opt.on:disabled{opacity:1}
.p3b-gauge{position:relative;height:12px;margin:26px 0 8px;border-radius:12px;background:linear-gradient(90deg,rgba(95,191,143,.2),rgba(95,191,143,.5),rgba(95,191,143,.2));border:1px solid var(--edge)}
.p3b-gauge i{position:absolute;top:50%;width:18px;height:18px;margin:-9px 0 0 -9px;border-radius:50%;background:var(--gold2);box-shadow:0 0 14px var(--gold);transition:left .4s}
.p3b-gauge span{position:absolute;top:-20px;font:500 .6rem var(--f-hud);color:var(--ink3)}
.p3b-big{display:block;font:500 clamp(1.6rem,3vw,2.3rem) var(--f-hud);color:var(--gold2)}
.p3b-k{display:block;font:500 .6rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--ink3)}
.p3b-msg{min-height:44px;margin-top:12px;padding:10px 12px;border-radius:12px;background:rgba(95,191,143,.08);border:1px solid var(--edge);font-size:.84rem;color:var(--neon2)}
.p3b-btnrow{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}
.p3b-b{padding:11px 16px;border-radius:12px;border:1px solid var(--edge2);background:rgba(242,201,107,.08);color:var(--gold2);font:600 .86rem var(--f-body);cursor:pointer}
.p3b-b.solid{background:linear-gradient(135deg,var(--neon2),var(--neon));color:#021510;border-color:transparent}
.p3b-b:disabled{opacity:.45;cursor:not-allowed}
.p3b-clock{display:grid;grid-template-columns:minmax(0,360px) minmax(0,1fr);gap:26px;align-items:center}
.p3b-clock svg{width:100%;height:auto;max-width:360px;display:block;margin:auto}
.p3b-clock .nd{cursor:pointer}
.p3b-clock .nd circle{transition:r .2s}
.p3b-clock .nd.on circle.d{fill:var(--gold2);stroke:#fff}
.p3b-tl{margin:0;padding:0;list-style:none;display:grid;gap:6px}
.p3b-tl li{display:grid;grid-template-columns:62px minmax(0,1fr);gap:12px;padding:11px 14px;border-radius:14px;border:1px solid var(--edge);background:rgba(2,10,8,.45);cursor:pointer;transition:all .2s}
.p3b-tl li span{font:500 .7rem var(--f-hud);color:var(--gold);padding-top:3px}
.p3b-tl li b{font:700 .9rem var(--f-display)}
.p3b-tl li p{display:none;margin:4px 0 0;font-size:.85rem;color:var(--ink2);line-height:1.5}
.p3b-tl li small{display:block;font:500 .62rem var(--f-hud);letter-spacing:.1em;color:var(--neon);margin-top:2px}
.p3b-tl li.on{border-color:var(--edge2);background:linear-gradient(120deg,rgba(242,201,107,.12),rgba(2,6,8,.5))}
.p3b-tl li.on p{display:block}
.p3b-cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.p3b-card{padding:22px;border-radius:20px;border:1px solid var(--edge);background:var(--panel);min-width:0}
.p3b-card h3{font:700 1.02rem var(--f-display)}
.p3b-card .k{display:block;margin-bottom:8px;font:500 .6rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--c,var(--neon))}
.p3b-card p{margin:8px 0 0;font-size:.88rem;line-height:1.55;color:var(--ink2)}
.p3b-card ul{margin:10px 0 0;padding-left:18px;font-size:.86rem;color:var(--ink2);line-height:1.55}
.p3b-card .pr{display:block;margin-top:12px;font:500 .9rem var(--f-hud);color:var(--gold2)}
.p3b-nums .num span.tagi{display:inline-block;margin:8px 0 0;font:500 .56rem var(--f-hud);letter-spacing:.14em;color:var(--ink3)}
.p3b-nums .num b{white-space:nowrap;font-size:clamp(1.2rem,2vw,1.8rem)}
.p3b-scen{display:flex;flex-wrap:wrap;gap:12px;align-items:center;margin-bottom:16px}
.p3b-table{width:100%;border-collapse:collapse;font-size:.88rem}
.p3b-table th{text-align:left;font:500 .6rem var(--f-hud);letter-spacing:.16em;text-transform:uppercase;color:var(--ink3);padding:8px 10px;border-bottom:1px solid var(--edge2)}
.p3b-table td{padding:10px;border-bottom:1px solid var(--edge);color:var(--ink2);vertical-align:top}
.p3b-table td b{color:var(--ink)}
.p3b-table td.n{font-family:var(--f-hud);color:var(--gold2);white-space:nowrap}
.p3b-tw{overflow-x:auto;border-radius:16px;border:1px solid var(--edge);background:var(--panel)}
/* 3.6 explorer */
.p3b-zone{display:grid;grid-template-columns:minmax(0,340px) minmax(0,1fr);gap:28px;align-items:center}
.p3b-zone svg{width:100%;max-width:340px;height:auto;display:block;margin:auto}
.p3b-zone path.sg{cursor:pointer;transition:opacity .2s,transform .2s;transform-origin:170px 170px}
.p3b-zone path.sg:hover,.p3b-zone path.sg.on{transform:scale(1.04)}
.p3b-zone path.sg.dim{opacity:.3}
.p3b-zl{display:grid;gap:8px}
.p3b-zl button{display:grid;grid-template-columns:12px minmax(0,1fr) auto;gap:12px;align-items:center;padding:10px 14px;border-radius:14px;border:1px solid var(--edge);background:rgba(2,10,8,.45);color:var(--ink);cursor:pointer;text-align:left;font:inherit}
.p3b-zl button i{width:12px;height:12px;border-radius:50%;background:var(--c);box-shadow:0 0 10px var(--c)}
.p3b-zl button b{font:700 .9rem var(--f-display)}
.p3b-zl button small{display:block;font-size:.76rem;color:var(--ink2)}
.p3b-zl button em{font:500 .9rem var(--f-hud);font-style:normal;color:var(--c)}
.p3b-zl button .bar{grid-column:2/-1;height:4px;border-radius:4px;background:rgba(255,255,255,.06);overflow:hidden}
.p3b-zl button .bar span{display:block;height:100%;background:var(--c)}
.p3b-zl button.on{border-color:var(--c);background:rgba(255,255,255,.04)}
.p3b-xbar{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-bottom:14px}
.p3b-xbar input{flex:1 1 240px;min-width:0;padding:13px 16px;border-radius:14px;border:1px solid var(--edge2);background:#04110d;color:var(--ink);font:500 .95rem var(--f-body)}
.p3b-chips{display:flex;flex-wrap:wrap;gap:6px}
.p3b-chips button{padding:8px 12px;border-radius:999px;border:1px solid var(--edge);background:rgba(2,10,8,.5);color:var(--ink2);font:600 .78rem var(--f-body);cursor:pointer;display:inline-flex;gap:7px;align-items:center}
.p3b-chips button i{width:8px;height:8px;border-radius:50%;background:var(--c,var(--neon))}
.p3b-chips button.on{border-color:var(--c,var(--neon));color:var(--ink);background:rgba(255,255,255,.06)}
.p3b-xwrap{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);gap:16px;align-items:start}
.p3b-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;max-height:620px;overflow-y:auto;padding-right:4px;scrollbar-width:thin;scrollbar-color:rgba(95,191,143,.25) transparent}
.p3b-it{position:relative;padding:12px 14px 12px 18px;border-radius:14px;border:1px solid var(--edge);background:rgba(2,10,8,.5);text-align:left;color:var(--ink);cursor:pointer;min-width:0;font:inherit;transition:border-color .2s}
.p3b-it::before{content:"";position:absolute;left:0;top:10px;bottom:10px;width:3px;border-radius:3px;background:var(--c)}
.p3b-it b{display:block;font:700 .86rem/1.3 var(--f-body)}
.p3b-it small{display:block;margin-top:2px;font-size:.74rem;color:var(--ink3)}
.p3b-it span{display:flex;justify-content:space-between;gap:8px;margin-top:6px;font:500 .68rem var(--f-hud);color:var(--neon2)}
.p3b-it.on,.p3b-it:hover{border-color:var(--c)}
.p3b-count{font:500 .7rem var(--f-hud);color:var(--ink3);letter-spacing:.1em}
.p3b-detail{position:sticky;top:20px;padding:22px;border-radius:20px;border:1px solid var(--edge2);background:linear-gradient(160deg,rgba(242,201,107,.10),rgba(2,6,8,.7));min-width:0}
.p3b-detail h3{font:700 1.15rem var(--f-display);margin-top:6px}
.p3b-detail p{margin:8px 0 0;font-size:.88rem;color:var(--ink2);line-height:1.55}
.p3b-bf{margin-top:14px;padding:14px;border-radius:14px;background:#f7faf8;color:#0b2219}
.p3b-bf small{display:block;font:700 .58rem var(--f-hud);letter-spacing:.16em;text-transform:uppercase;color:#0f7a52}
.p3b-bf div{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:4px 10px;margin-top:8px;font-size:.8rem}
.p3b-bf div b{font-weight:700}
.p3b-bf div em{font-style:normal;color:#0f7a52;font-weight:700;font-family:var(--f-hud);font-size:.76rem}
.p3b-bf div span{grid-column:1/-1;color:#5b6f66;font-size:.72rem;margin:-3px 0 4px}
.p3b-reg{display:inline-block;margin-top:10px;padding:4px 9px;border-radius:999px;font:500 .6rem var(--f-hud);letter-spacing:.1em;text-transform:uppercase;border:1px solid var(--edge2);color:var(--gold2)}
.p3b-rules{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}
.p3b-rule{position:relative;padding:22px 20px;border-radius:20px;border:1px solid var(--edge);background:var(--panel);min-width:0}
.p3b-rule .n{font:500 1.6rem var(--f-hud);color:var(--neon);text-shadow:0 0 16px rgba(95,191,143,.45)}
.p3b-rule b{display:block;margin-top:6px;font:700 .98rem var(--f-display)}
.p3b-rule p{margin:8px 0 0;font-size:.86rem;color:var(--ink2);line-height:1.55}
.p3b-pipe{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:0;counter-reset:pp}
.p3b-pipe div{position:relative;padding:20px 18px 18px;border:1px solid var(--edge);background:var(--panel);min-width:0}
.p3b-pipe div+div{border-left:0}
.p3b-pipe div:first-child{border-radius:18px 0 0 18px}.p3b-pipe div:last-child{border-radius:0 18px 18px 0}
.p3b-pipe div::before{counter-increment:pp;content:"0" counter(pp);font:500 .66rem var(--f-hud);color:var(--gold)}
.p3b-pipe b{display:block;margin-top:4px;font:700 .92rem var(--f-display)}
.p3b-pipe p{margin:6px 0 0;font-size:.82rem;color:var(--ink2);line-height:1.5}
.p3b-pipe small{display:block;margin-top:8px;font:500 .62rem var(--f-hud);color:var(--neon);letter-spacing:.08em}
/* 3.7 */
.p3b-royal{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:20px;align-items:center}
.p3b-royal .shot{margin:0}
.p3b-rcard{position:relative;aspect-ratio:1.586;max-width:420px;border-radius:20px;padding:22px 24px;background:radial-gradient(120% 120% at 0% 0%,#1d5c43,#08261b 55%,#04140e);border:1px solid rgba(242,201,107,.55);box-shadow:0 30px 70px -30px rgba(242,201,107,.6),inset 0 0 0 1px rgba(255,231,168,.12);overflow:hidden;color:#f7ecd0}
.p3b-rcard::after{content:"";position:absolute;inset:0;background:linear-gradient(115deg,transparent 40%,rgba(255,231,168,.18) 50%,transparent 60%)}
.p3b-rcard small{font:500 .58rem var(--f-hud);letter-spacing:.3em;text-transform:uppercase;color:var(--gold)}
.p3b-rcard b{display:block;margin-top:6px;font:900 1.5rem var(--f-display);letter-spacing:-.02em;background:linear-gradient(92deg,var(--gold2),var(--gold));-webkit-background-clip:text;background-clip:text;color:transparent}
.p3b-rcard .chip{position:absolute;left:24px;top:44%;width:42px;height:32px;border-radius:7px;background:linear-gradient(135deg,#ffe7a8,#b88a2e)}
.p3b-rcard .nm{position:absolute;left:24px;bottom:20px;font:500 .78rem var(--f-hud);letter-spacing:.14em}
.p3b-rcard svg{position:absolute;right:20px;bottom:16px;width:40px;height:40px}
.p3b-gb{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);gap:16px}
.p3b-gb .p3b-pane>label,.p3b-fld{display:block;margin-top:16px}
.p3b-fld>span{display:block;margin-bottom:7px;font:500 .62rem var(--f-hud);letter-spacing:.18em;text-transform:uppercase;color:var(--ink3)}
.p3b-gb textarea{width:100%;min-height:74px;padding:12px;border-radius:12px;border:1px solid var(--edge2);background:#04110d;color:var(--ink);font:500 .92rem var(--f-body);resize:vertical}
.p3b-gift{position:relative;aspect-ratio:1.45;border-radius:20px;overflow:hidden;padding:22px;display:flex;flex-direction:column;justify-content:space-between;background:linear-gradient(150deg,#0f7a52,#0a4f36);border:1px solid rgba(255,255,255,.2);color:#fff;transition:background .4s}
.p3b-gift.royal{background:radial-gradient(120% 120% at 0% 0%,#1d5c43,#06201a 60%);border-color:rgba(242,201,107,.6)}
.p3b-gift::before{content:"";position:absolute;top:0;bottom:0;left:70%;width:18px;background:linear-gradient(90deg,#d9ad4f,#ffe7a8,#d9ad4f);opacity:.9}
.p3b-gift::after{content:"";position:absolute;left:70%;right:0;top:42%;height:18px;background:linear-gradient(0deg,#d9ad4f,#ffe7a8,#d9ad4f);opacity:.9}
.p3b-gift>*{position:relative;z-index:1}
.p3b-gift small{font:500 .58rem var(--f-hud);letter-spacing:.24em;text-transform:uppercase;color:#ffe7a8}
.p3b-gift b{display:block;font:800 1.3rem var(--f-display);max-width:58%}
.p3b-gift q{display:block;max-width:56%;font-style:italic;font-size:.86rem;line-height:1.4;color:rgba(255,255,255,.92);quotes:"“" "”"}
.p3b-gift .to{font:500 .7rem var(--f-hud);letter-spacing:.08em;color:#ffe7a8;max-width:56%}
.p3b-sum{display:grid;gap:8px;margin-top:16px}
.p3b-sum div{display:flex;justify-content:space-between;gap:10px;font-size:.88rem;color:var(--ink2)}
.p3b-sum div b{font:500 .9rem var(--f-hud);color:var(--ink)}
.p3b-sum div.t{padding-top:10px;border-top:1px solid var(--edge2)}
.p3b-sum div.t b{font-size:1.3rem;color:var(--gold2)}
.p3b-steps{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px}
.p3b-steps div{padding:16px;border-radius:16px;border:1px solid var(--edge);background:var(--panel);min-width:0}
.p3b-steps .t{font:500 1.2rem var(--f-hud);color:var(--neon)}
.p3b-steps b{display:block;margin-top:4px;font:700 .9rem var(--f-display)}
.p3b-steps p{margin:6px 0 0;font-size:.8rem;color:var(--ink2);line-height:1.45}
.p3b-tbar{position:relative;height:10px;margin:18px 0 6px;border-radius:10px;background:rgba(95,191,143,.1);overflow:hidden}
.p3b-tbar i{position:absolute;inset:0 auto 0 0;background:linear-gradient(90deg,var(--neon),var(--gold));border-radius:10px}
.p3b-rent{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:8px;margin-bottom:14px}
.p3b-rent button{padding:12px 10px;border-radius:14px;border:1px solid var(--edge);background:rgba(2,10,8,.5);color:var(--ink2);font:600 .8rem/1.3 var(--f-body);cursor:pointer;text-align:left;min-width:0}
.p3b-rent button small{display:block;font:500 .62rem var(--f-hud);color:var(--ink3);margin-top:3px}
.p3b-rent button.on{border-color:transparent;background:linear-gradient(135deg,var(--gold2),var(--gold));color:#1a1204}
.p3b-rent button.on small{color:#4a3a10}
.p3b-vs{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:6px}
.p3b-vs div{padding:14px;border-radius:14px;border:1px solid var(--edge);background:rgba(2,10,8,.45)}
.p3b-vs div.win{border-color:var(--neon);background:rgba(95,191,143,.08)}
.p3b-chart{width:100%;height:auto;display:block;margin-top:10px}
.cin .p3b-chk,.p3b-chk{display:flex;grid-template-columns:none;gap:10px;align-items:center;margin-top:14px;font-size:.88rem;color:var(--ink2);cursor:pointer}
.p3b-chk input{accent-color:var(--neon);width:18px;height:18px}
/* 3.8 phones */
.p3b-proto{display:grid;grid-template-columns:minmax(0,1fr) 330px minmax(0,1fr);gap:26px;align-items:center}
.p3b-scrlist{display:grid;gap:6px}
.p3b-scrlist button{display:grid;grid-template-columns:28px minmax(0,1fr);gap:10px;align-items:center;padding:10px 12px;border-radius:13px;border:1px solid var(--edge);background:rgba(2,10,8,.45);color:var(--ink2);cursor:pointer;text-align:left;font:600 .86rem var(--f-body)}
.p3b-scrlist button span{font:500 .66rem var(--f-hud);color:var(--gold)}
.p3b-scrlist button.on{border-color:var(--neon);color:var(--ink);background:rgba(95,191,143,.08)}
.p3b-why h3{font:700 1.15rem var(--f-display)}
.p3b-why p{margin:8px 0 0;font-size:.9rem;line-height:1.6;color:var(--ink2)}
.p3b-why .tg{display:inline-block;margin-top:12px;padding:6px 12px;border-radius:999px;border:1px solid var(--edge2);font:500 .66rem var(--f-hud);letter-spacing:.12em;color:var(--gold2)}
.p3b-lang{display:inline-flex;margin-bottom:14px;border-radius:999px;border:1px solid var(--edge2);overflow:hidden}
.p3b-lang button{padding:8px 16px;border:0;background:none;color:var(--ink2);font:600 .8rem var(--f-body);cursor:pointer}
.p3b-lang button.on{background:var(--gold);color:#1a1204}
.p3b-ph{position:relative;width:300px;height:610px;margin:auto;border-radius:44px;padding:11px;background:linear-gradient(160deg,#2c3631,#090d0b);box-shadow:0 50px 90px -30px rgba(0,0,0,.8),0 0 60px -20px rgba(95,191,143,.35),inset 0 0 0 1px rgba(255,255,255,.1)}
.p3b-ph::before{content:"";position:absolute;top:20px;left:50%;width:84px;height:22px;border-radius:14px;background:#090d0b;transform:translateX(-50%);z-index:3}
.p3b-scr{position:relative;height:100%;border-radius:34px;overflow:hidden;background:#f3f7f5;color:#0b2219;font-family:var(--f-body);display:flex;flex-direction:column}
.p3b-sb{display:flex;justify-content:space-between;padding:14px 24px 0;font:700 .66rem var(--f-body);color:#0b2219;height:40px;flex:0 0 40px}
.p3b-body{flex:1;overflow-y:auto;padding:6px 14px 12px;display:flex;flex-direction:column;gap:8px;scrollbar-width:none}
.p3b-body::-webkit-scrollbar{display:none}
.p3b-body.anim{animation:p3bIn .35s cubic-bezier(.2,.8,.2,1)}
@keyframes p3bIn{from{opacity:0;transform:translateX(14px)}}
.p3b-ah{display:flex;justify-content:space-between;align-items:center}
.p3b-ah b{font:800 1.05rem var(--f-display);color:#0f7a52}
.p3b-ah span{font-size:.7rem;color:#5b6f66}
.p3b-ah button{border:0;background:#e6f4ed;color:#0f7a52;font:700 .66rem var(--f-body);padding:5px 9px;border-radius:999px;cursor:pointer}
.p3b-h2{font:800 .98rem var(--f-display);color:#0b2219;margin:2px 0 0}
.p3b-gc{padding:12px 13px;border-radius:16px;background:linear-gradient(140deg,#0f7a52,#0a5a3c);color:#fff}
.p3b-gc small{display:block;font-size:.58rem;letter-spacing:.1em;text-transform:uppercase;opacity:.85}
.p3b-gc b{display:block;font:700 .95rem var(--f-display);margin-top:3px}
.p3b-gc span{display:block;font-size:.7rem;opacity:.9}
.p3b-gc i{display:block;height:4px;border-radius:4px;background:rgba(255,255,255,.25);margin-top:8px}
.p3b-gc i em{display:block;height:100%;border-radius:4px;background:#f2c96b}
.p3b-r{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:10px 11px;border-radius:13px;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.06);font-size:.74rem;border:0;width:100%;text-align:left;color:#0b2219;font-family:var(--f-body);cursor:pointer}
.p3b-gcb{display:block;width:100%;padding:0;border:0;background:none;text-align:left;cursor:pointer;font:inherit}
.p3b-r small{display:block;color:#5b6f66;font-size:.64rem}
.p3b-r b{color:#0f7a52;font-weight:800;white-space:nowrap}
.p3b-r .pill{padding:4px 8px;border-radius:8px;background:#e6f4ed}
.p3b-r.dz{background:#fff7e6}
.p3b-cta{margin-top:auto;padding:12px;border-radius:13px;border:0;background:#0b2219;color:#f2c96b;font:800 .78rem var(--f-body);cursor:pointer;text-align:center}
.p3b-cta.g{background:#0f7a52;color:#fff}
.p3b-nav{flex:0 0 auto;display:grid;grid-template-columns:repeat(5,1fr);padding:6px 6px 14px;background:#fff;border-top:1px solid #e3ebe7}
.p3b-nav button{border:0;background:none;display:flex;flex-direction:column;align-items:center;gap:2px;padding:5px 0;color:#8aa096;font:700 .56rem var(--f-body);cursor:pointer}
.p3b-nav button svg{width:18px;height:18px}
.p3b-nav button.on{color:#0f7a52}
.p3b-sw{display:grid;grid-template-columns:repeat(2,1fr);gap:6px}
.p3b-sw button{padding:8px;border-radius:11px;border:1.5px solid #dfe8e3;background:#fff;text-align:left;font:600 .66rem var(--f-body);color:#0b2219;cursor:pointer}
.p3b-sw button small{display:block;color:#5b6f66;font-weight:500;font-size:.58rem}
.p3b-sw button.on{border-color:#0f7a52;background:#e9f6ef}
.p3b-toast{padding:9px 11px;border-radius:11px;background:#0b2219;color:#b5dfc6;font-size:.68rem;font-weight:600}
.p3b-map{position:relative;height:150px;border-radius:14px;overflow:hidden;background:#dfe9e4}
.p3b-map svg{position:absolute;inset:0;width:100%;height:100%}
.p3b-prog{display:grid;gap:0;margin:0;padding:0;list-style:none}
.p3b-prog li{position:relative;padding:0 0 10px 20px;font-size:.7rem;color:#5b6f66}
.p3b-prog li::before{content:"";position:absolute;left:3px;top:3px;width:9px;height:9px;border-radius:50%;background:#cfdcd5}
.p3b-prog li::after{content:"";position:absolute;left:7px;top:13px;bottom:0;width:1px;background:#cfdcd5}
.p3b-prog li:last-child::after{display:none}
.p3b-prog li.d{color:#0b2219}.p3b-prog li.d::before{background:#0f7a52}
.p3b-prog li.n::before{background:#f2c96b;box-shadow:0 0 0 4px rgba(242,201,107,.3)}
.p3b-prog li b{display:block;font-weight:700}
.p3b-spark{background:#fff;border-radius:13px;padding:10px 11px;box-shadow:0 1px 3px rgba(0,0,0,.06)}
.p3b-spark svg{width:100%;height:70px;display:block}
.p3b-spark small{font-size:.6rem;color:#5b6f66}
/* whatsapp */
.p3b-wa{display:grid;grid-template-columns:330px minmax(0,1fr);gap:26px;align-items:center}
.p3b-wscr{background:#ece5dd;background-image:radial-gradient(rgba(0,0,0,.035) 1px,transparent 1px);background-size:14px 14px}
.p3b-wh{flex:0 0 auto;display:flex;align-items:center;gap:9px;padding:6px 12px 9px;background:#0b5e43;color:#fff}
.p3b-wh i{width:30px;height:30px;border-radius:50%;background:#fff;display:grid;place-items:center}
.p3b-wh b{display:block;font-size:.8rem}
.p3b-wh small{display:block;font-size:.6rem;opacity:.85}
.p3b-wbody{flex:1;overflow-y:auto;padding:10px;display:flex;flex-direction:column;gap:6px;scrollbar-width:none}
.p3b-bub{max-width:84%;padding:7px 9px 5px;border-radius:10px;font-size:.72rem;line-height:1.4;box-shadow:0 1px 1px rgba(0,0,0,.12);animation:p3bPop .3s ease-out both;color:#111}
@keyframes p3bPop{from{opacity:0;transform:translateY(8px) scale(.97)}}
.p3b-bub.me{align-self:flex-end;background:#d9fdd3;border-top-right-radius:2px}
.p3b-bub.af{align-self:flex-start;background:#fff;border-top-left-radius:2px}
.p3b-bub.sys{align-self:center;background:#fdf4c5;font-size:.64rem;text-align:center}
.p3b-bub em{display:block;font-style:normal;color:#667;font-size:.62rem;margin-top:2px}
.p3b-bub time{display:block;text-align:right;font-size:.56rem;color:#889;margin-top:2px}
.p3b-bub .qr{display:grid;gap:4px;margin-top:6px}
.p3b-bub .qr span{display:block;padding:6px;border-radius:7px;border:1px solid #cfe3da;text-align:center;color:#0b7a55;font-weight:700}
.p3b-wfoot{flex:0 0 auto;display:flex;gap:6px;padding:8px 10px 16px;background:#f0f0f0}
.p3b-wfoot span{flex:1;padding:8px 12px;border-radius:999px;background:#fff;font-size:.68rem;color:#999}
.p3b-wfoot i{width:32px;height:32px;border-radius:50%;background:#0b7a55}
/* online store mock */
.p3b-web{border-radius:18px;overflow:hidden;border:1px solid var(--edge2);box-shadow:0 40px 90px -40px rgba(95,191,143,.4);background:#f5f8f6;color:#0b2219}
.p3b-wbar{display:flex;align-items:center;gap:10px;padding:10px 14px;background:#e3e9e6}
.p3b-wbar i{width:10px;height:10px;border-radius:50%;background:#c9d3ce}
.p3b-wbar span{flex:1;min-width:0;padding:6px 12px;border-radius:999px;background:#fff;font:500 .7rem var(--f-hud);color:#5b6f66;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.p3b-whd{display:flex;flex-wrap:wrap;align-items:center;gap:12px 18px;padding:14px 20px;background:#fff;border-bottom:1px solid #e3ebe7}
.p3b-whd b{font:800 1.1rem var(--f-display);color:#0f7a52}
.p3b-whd .s{flex:1 1 200px;padding:9px 14px;border-radius:999px;background:#f0f4f2;font-size:.8rem;color:#7a8d84}
.p3b-whd .c{padding:8px 14px;border-radius:999px;background:#0f7a52;color:#fff;font:700 .78rem var(--f-body)}
.p3b-wz{display:flex;gap:6px;flex-wrap:wrap;padding:12px 20px 0}
.p3b-wz span{padding:6px 11px;border-radius:999px;font:600 .7rem var(--f-body);background:#fff;border:1px solid #dfe8e3}
.p3b-wz span.on{background:#0b2219;color:#fff;border-color:#0b2219}
.p3b-wmain{display:grid;grid-template-columns:minmax(0,1fr) 230px;gap:16px;padding:14px 20px 20px}
.p3b-wg{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
.p3b-wp{padding:12px;border-radius:14px;background:#fff;border:1px solid #e3ebe7;min-width:0;display:flex;flex-direction:column}
.p3b-wp .im{height:64px;border-radius:10px;margin-bottom:8px;background:linear-gradient(135deg,var(--c),#fff);opacity:.55}
.p3b-wp b{font-size:.78rem;line-height:1.3}
.p3b-wp small{font-size:.66rem;color:#5b6f66;margin-top:2px}
.p3b-wp .bf{font-size:.64rem;color:#0f7a52;margin-top:4px}
.p3b-wp div{display:flex;justify-content:space-between;align-items:center;margin-top:auto;padding-top:8px}
.p3b-wp div em{font-style:normal;font:700 .74rem var(--f-hud)}
.p3b-wp button{border:0;border-radius:8px;background:#0f7a52;color:#fff;font:700 .66rem var(--f-body);padding:6px 9px;cursor:pointer}
.p3b-wc{padding:14px;border-radius:14px;background:#fff;border:1px solid #e3ebe7;font-size:.76rem;align-self:start}
.p3b-wc h4{margin:0 0 8px;font:800 .86rem var(--f-display)}
.p3b-wc div{display:flex;justify-content:space-between;padding:4px 0;color:#5b6f66}
.p3b-wc div b{color:#0b2219;font-family:var(--f-hud);font-size:.72rem}
.p3b-wc .p3b-wl{display:block;padding:0}
.p3b-wc .tot{border-top:1px solid #e3ebe7;margin-top:6px;padding-top:8px}
.p3b-wc .tot b{font-size:.9rem;color:#0f7a52}
.p3b-wc p{margin:8px 0 0;font-size:.66rem;color:#5b6f66}
.p3b-wc .go{display:block;margin-top:10px;padding:9px;border-radius:10px;background:#0b2219;color:#f2c96b;text-align:center;font-weight:800}
/* lock screen */
.p3b-ls{background:radial-gradient(140% 90% at 30% 0%,#1f6b4c,#06201a 60%,#020a07)}
.p3b-ls .tm{text-align:center;color:#fff;margin-top:20px}
.p3b-ls .tm b{display:block;font:300 3.2rem/1 var(--f-display)}
.p3b-ls .tm small{font-size:.74rem;opacity:.8}
.p3b-nt{margin:0 10px;padding:10px 12px;border-radius:16px;background:rgba(255,255,255,.82);backdrop-filter:blur(10px);color:#0b2219;font-size:.7rem;line-height:1.4}
.p3b-nt small{display:flex;justify-content:space-between;font-size:.58rem;color:#5b6f66;text-transform:uppercase;letter-spacing:.06em;margin-bottom:2px}
.p3b-nt b{display:block;font-size:.74rem}
.p3b-nts{display:flex;flex-direction:column;gap:7px;margin-top:22px}
.p3b-duo2{display:grid;grid-template-columns:330px minmax(0,1fr);gap:26px;align-items:center}
@media (max-width:1150px){
 .p3b-tiles{grid-template-columns:repeat(3,minmax(0,1fr))}.p3b-demo,.p3b-xwrap,.p3b-gb,.p3b-royal{grid-template-columns:1fr}
 .p3b-rules{grid-template-columns:repeat(2,minmax(0,1fr))}.p3b-pipe{grid-template-columns:1fr}.p3b-pipe div+div{border-left:1px solid var(--edge);border-top:0}
 .p3b-pipe div:first-child{border-radius:18px 18px 0 0}.p3b-pipe div:last-child{border-radius:0 0 18px 18px}
 .p3b-steps{grid-template-columns:repeat(3,minmax(0,1fr))}.p3b-rent{grid-template-columns:repeat(3,minmax(0,1fr))}
 .p3b-proto{grid-template-columns:330px minmax(0,1fr)}.p3b-proto .p3b-why{grid-column:1/-1}
 .p3b-detail{position:static}.p3b-wmain{grid-template-columns:1fr}
}
@media (max-width:820px){
 .p3b-demo .p3b-pane.g{order:-1}
 .p3b-tiles{grid-template-columns:repeat(2,minmax(0,1fr))}.p3b-tile{padding:12px}.p3b-tile p{display:none}
 .p3b-boxinfo,.p3b-clock,.p3b-zone{grid-template-columns:1fr}.p3b-boxinfo svg{max-width:200px;margin:auto}
 .p3b-plans,.p3b-cards,.p3b-rules{grid-template-columns:1fr}.p3b-opts{grid-template-columns:repeat(3,minmax(0,1fr))}
 .p3b-grid{grid-template-columns:1fr;max-height:520px}.p3b-steps{grid-template-columns:1fr 1fr}.p3b-rent{grid-template-columns:1fr 1fr}
 .p3b-proto,.p3b-wa,.p3b-duo2{grid-template-columns:1fr}.p3b-scrlist{grid-template-columns:1fr 1fr}
 .p3b-wg{grid-template-columns:1fr 1fr}.p3b-vs{grid-template-columns:1fr}
}
@media (max-width:420px){.p3b-ph{width:282px;height:580px}}
`);
(typeof addCSS==='function'?addCSS:function(id,css){if(document.getElementById('css-'+id))return;const st=document.createElement('style');st.id='css-'+id;st.textContent=css;document.head.appendChild(st)})('p3b5',`
.p3b-draft{display:inline-block;margin-top:12px;padding:6px 10px;border-radius:8px;border:1px dashed rgba(242,201,107,.45);font:500 .6rem/1.5 var(--f-hud);letter-spacing:.12em;text-transform:uppercase;color:var(--gold)}
.p3b-nma{display:grid;grid-template-columns:30px minmax(0,1fr);gap:12px;align-items:start;margin-top:16px;padding:14px 16px;border-radius:16px;border:1px solid rgba(255,138,122,.35);background:rgba(255,138,122,.06);font-size:.86rem;color:var(--ink2);line-height:1.55}
.p3b-nma svg{width:26px;height:26px;stroke:#ff8a7a;fill:none;stroke-width:1.8}
.p3b-nma b{color:var(--ink)}
.p3b-mth{position:relative;display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:8px;margin:8px 0 0;padding:0;list-style:none}
.p3b-mth::before{content:"";position:absolute;left:6%;right:6%;top:27px;height:3px;border-radius:3px;background:linear-gradient(90deg,var(--neon),#d9b56e 45%,var(--gold) 80%,#ff8a7a)}
.p3b-mth button{position:relative;display:flex;flex-direction:column;align-items:center;text-align:center;gap:8px;width:100%;padding:0 4px 12px;border:0;background:none;color:var(--ink2);font:inherit;cursor:pointer}
.p3b-mth .dot{display:grid;place-items:center;width:56px;height:56px;border-radius:50%;border:2px solid var(--c);background:#04110d;font:700 1rem var(--f-display);color:var(--c);box-shadow:0 0 0 6px #020a08;transition:all .25s}
.p3b-mth b{font:700 .82rem/1.25 var(--f-display);color:var(--ink)}
.p3b-mth small{font-size:.72rem;line-height:1.35;color:var(--ink3)}
.p3b-mth button.on .dot,.p3b-mth button:hover .dot{background:var(--c);color:#04110d;box-shadow:0 0 0 6px #020a08,0 0 26px var(--c)}
.p3b-mthd{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:16px;margin-top:10px;padding:22px 24px;border-radius:22px;border:1px solid var(--edge2);background:linear-gradient(150deg,rgba(95,191,143,.07),rgba(2,6,8,.6))}
.p3b-mthd h3{font:700 1.2rem var(--f-display)}
.p3b-mthd p{margin:8px 0 0;color:var(--ink2);line-height:1.6;font-size:.92rem}
.p3b-mthd .exb{padding:16px;border-radius:16px;border:1px solid var(--edge);background:rgba(2,10,8,.55)}
.p3b-mthd .exb p{font-size:.88rem;color:var(--ink)}
.p3b-eq{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin-top:18px;padding:18px 20px;border-radius:20px;border:1px solid var(--edge);background:var(--panel)}
.p3b-eq span{padding:10px 14px;border-radius:12px;border:1px solid var(--edge2);background:rgba(2,10,8,.6);font:500 .86rem var(--f-hud);color:var(--ink)}
.p3b-eq span.r{border-color:transparent;background:linear-gradient(135deg,var(--gold2),var(--gold));color:#1a1204}
.p3b-eq i{font:500 1.1rem var(--f-hud);font-style:normal;color:var(--gold)}
.p3b-eq em{flex:1 1 100%;font-style:normal;font-size:.82rem;color:var(--ink3)}
.p3b-shared{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px;margin-top:12px}
.p3b-sh{padding:16px;border-radius:18px;border:1px solid var(--edge);background:var(--panel);min-width:0}
.p3b-sh b{display:block;font:700 .86rem/1.3 var(--f-display)}
.p3b-sh p{margin:8px 0 0;font-size:.8rem;line-height:1.5;color:var(--ink2)}
.p3b-sh .in{display:flex;flex-wrap:wrap;gap:4px;margin-top:10px}
.p3b-sh .in span{padding:3px 8px;border-radius:999px;font:500 .62rem var(--f-hud);color:#04110d;background:var(--c)}
.p3b-fam{display:flex;flex-wrap:wrap;gap:8px;margin:4px 0 14px}
.p3b-fam button{padding:9px 14px;border-radius:999px;border:1px solid var(--edge);background:rgba(2,10,8,.5);color:var(--ink2);font:600 .82rem var(--f-body);cursor:pointer}
.p3b-fam button small{margin-left:6px;font:500 .66rem var(--f-hud);color:var(--ink3)}
.p3b-fam button.on{border-color:transparent;background:linear-gradient(135deg,var(--gold2),var(--gold));color:#1a1204}
.p3b-fam button.on small{color:#4a3510}
.p3b-tiles.p3b-t5 .p3b-tile svg{max-height:84px}
.p3b-tile .gq{display:block;margin-top:8px;font:500 .66rem/1.4 var(--f-hud);color:var(--ink3)}
.p3b-tile[hidden]{display:none}
.p3b-x{margin-top:14px;padding:24px;border-radius:24px;border:1px solid var(--edge2);background:linear-gradient(160deg,rgba(95,191,143,.06),rgba(2,6,8,.75))}
.p3b-xh{display:grid;grid-template-columns:120px minmax(0,1fr) auto;gap:20px;align-items:center}
.p3b-xh svg{width:120px;height:auto}
.p3b-xh h3{font:700 1.45rem var(--f-display)}
.p3b-xh h3 i{font:300 italic .95rem var(--f-body);color:var(--gold2)}
.p3b-xh p{margin:6px 0 0;color:var(--ink2);font-size:.92rem}
.p3b-pb{text-align:right;padding:14px 16px;border-radius:16px;border:1px solid var(--edge2);background:rgba(242,201,107,.07);min-width:0}
.p3b-pb small{display:block;font:500 .58rem var(--f-hud);letter-spacing:.16em;text-transform:uppercase;color:var(--ink3)}
.p3b-pb b{display:block;margin-top:4px;font:500 1.15rem var(--f-hud);color:var(--gold2);white-space:nowrap}
.p3b-pb span{display:block;margin-top:4px;font-size:.72rem;color:var(--ink3)}
.p3b-xtabs{display:flex;flex-wrap:wrap;gap:6px;margin:20px 0 16px;padding:5px;border-radius:14px;border:1px solid var(--edge);background:rgba(2,10,8,.6)}
.p3b-xtabs button{flex:1 1 auto;padding:10px 12px;border-radius:10px;border:0;background:none;color:var(--ink2);font:600 .82rem var(--f-body);cursor:pointer}
.p3b-xtabs button.on{background:linear-gradient(135deg,var(--neon2),var(--neon));color:#021510}
.p3b-xg{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.35fr);gap:18px}
.p3b-xg h4,.p3b-x h4{margin:0 0 8px;font:500 .6rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--gold)}
.p3b-xg p{margin:0 0 14px;color:var(--ink2);font-size:.9rem;line-height:1.6}
.p3b-ev{margin:0;padding:0;list-style:none;display:grid;gap:8px}
.p3b-ev li{position:relative;padding:10px 12px 10px 30px;border-radius:12px;border:1px solid var(--edge);background:rgba(2,10,8,.45);font-size:.84rem;line-height:1.5;color:var(--ink2)}
.p3b-ev li::before{content:"";position:absolute;left:12px;top:16px;width:8px;height:8px;border-radius:50%;background:var(--neon);box-shadow:0 0 8px var(--neon)}
.p3b-core td:first-child{min-width:150px}
.p3b-core td:nth-child(2){font-family:var(--f-hud);font-size:.78rem;color:var(--neon2)}
.p3b-stl{display:grid;gap:8px}
.p3b-stl>div{display:grid;grid-template-columns:150px minmax(0,1fr);gap:14px;padding:12px 14px;border-radius:14px;border:1px solid var(--edge);background:rgba(2,10,8,.45)}
.p3b-stl b{font:700 .86rem var(--f-display);color:var(--ink)}
.p3b-stl p{margin:0;font-size:.86rem;color:var(--ink2)}
.p3b-3c{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
.p3b-slot{display:flex;flex-wrap:wrap;gap:6px}
.p3b-slot span{padding:7px 11px;border-radius:10px;border:1px solid var(--edge2);font-size:.8rem;color:var(--ink)}
.p3b-slot span small{margin-left:6px;font:500 .62rem var(--f-hud);color:var(--neon2)}
.p3b-no{display:grid;gap:8px}
.p3b-no div{display:grid;grid-template-columns:22px minmax(0,1fr);gap:10px;padding:12px 14px;border-radius:14px;border:1px solid rgba(255,138,122,.28);background:rgba(255,138,122,.05);font-size:.86rem;color:var(--ink2)}
.p3b-no svg{width:20px;height:20px;stroke:#ff8a7a;fill:none;stroke-width:2}
.p3b-no b{display:block;color:var(--ink)}
.p3b-safe{margin-top:12px;padding:14px 16px;border-radius:14px;border-left:3px solid #ff8a7a;background:rgba(255,138,122,.07);font-size:.88rem;color:var(--ink)}
.p3b-help{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);gap:16px}
.p3b-help blockquote{margin:0;padding:20px 22px;border-radius:18px;border:1px solid var(--edge2);background:rgba(242,201,107,.06);font-size:.95rem;line-height:1.65;color:var(--ink)}
.p3b-help blockquote .tagi{margin-bottom:8px}
.p3b-gl td:first-child b{display:block}
.p3b-gl td small{color:var(--ink3)}
.p3b-gl tr{cursor:pointer}
.p3b-gl tr:hover td{background:rgba(95,191,143,.05)}
.p3b-gl i.zc{display:inline-block;width:9px;height:9px;border-radius:50%;margin-right:7px;background:var(--c)}
.p3b-st{padding:22px;border-radius:22px;border:1px solid var(--edge);background:var(--panel)}
.p3b-bar{display:flex;gap:4px;margin:18px 0 6px}
.p3b-bar button{position:relative;min-width:0;padding:14px 10px 12px;border-radius:12px;border:1px solid var(--edge);background:rgba(2,10,8,.5);color:var(--ink2);text-align:left;cursor:pointer;font:inherit;transition:all .2s}
.p3b-bar button b{display:block;font:700 .82rem/1.25 var(--f-display);color:var(--ink)}
.p3b-bar button small{display:block;margin-top:3px;font:500 .62rem var(--f-hud);color:var(--ink3)}
.p3b-bar button::after{content:"";position:absolute;left:10px;right:10px;top:6px;height:3px;border-radius:3px;background:var(--edge2)}
.p3b-bar button.done::after{background:var(--neon)}
.p3b-bar button.on{border-color:var(--neon);background:rgba(95,191,143,.1)}
.p3b-bar button.on::after{background:linear-gradient(90deg,var(--neon),var(--gold))}
.p3b-stc{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.3fr);gap:16px;margin-top:14px}
.p3b-stc h3{font:700 1.2rem var(--f-display)}
.p3b-stc p{margin:8px 0 0;color:var(--ink2);font-size:.9rem;line-height:1.6}
.p3b-chg{display:grid;gap:6px;margin:0;padding:0;list-style:none}
.p3b-chg li{display:grid;grid-template-columns:30px minmax(0,1fr);gap:10px;align-items:center;padding:9px 12px;border-radius:12px;border:1px solid var(--edge);background:rgba(2,10,8,.45);font-size:.88rem;color:var(--ink)}
.p3b-chg li span{display:grid;place-items:center;width:26px;height:26px;border-radius:8px;font:700 .9rem var(--f-hud)}
.p3b-chg li.a span{background:rgba(95,191,143,.18);color:var(--neon)}
.p3b-chg li.k span{background:rgba(169,196,184,.12);color:var(--ink2)}
.p3b-chg li.d span{background:rgba(255,138,122,.16);color:#ff8a7a}
.p3b-chg li.d{color:var(--ink3);text-decoration:line-through;text-decoration-color:rgba(255,138,122,.5)}
.p3b-chg li.m span{background:rgba(242,201,107,.18);color:var(--gold)}
.p3b-qc{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.15fr);gap:16px;align-items:start}
.p3b-qc .cin label{grid-template-columns:minmax(0,1fr) 120px}
.p3b-qsel{display:flex;flex-wrap:wrap;gap:6px;margin-top:4px}
.p3b-qsel button{padding:8px 12px;border-radius:10px;border:1px solid var(--edge);background:rgba(2,10,8,.5);color:var(--ink2);font:600 .8rem var(--f-body);cursor:pointer}
.p3b-qsel button.on{border-color:var(--neon);color:var(--ink);background:rgba(95,191,143,.12)}
.p3b-qbig{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap}
.p3b-qbig b{font:500 clamp(2rem,4vw,3rem) var(--f-hud);color:var(--gold2);line-height:1}
.p3b-qbig span{font-size:.9rem;color:var(--ink2)}
.p3b-qf{padding:10px 12px;border-radius:12px;background:rgba(2,10,8,.6);border:1px solid var(--edge);font:500 .8rem/1.6 var(--f-hud);color:var(--neon2)}
.p3b-month{width:100%;height:auto;display:block}
.p3b-qrows{display:grid;gap:6px}
.p3b-qrows div{display:flex;justify-content:space-between;gap:10px;padding:8px 12px;border-radius:10px;border:1px solid var(--edge);font-size:.86rem;color:var(--ink2)}
.p3b-qrows b{font:500 .9rem var(--f-hud);color:var(--ink);white-space:nowrap}
.p3b-qnote{font-size:.8rem;color:var(--ink3);line-height:1.5}
@media (max-width:1100px){.p3b-shared{grid-template-columns:repeat(3,minmax(0,1fr))}}
@media (max-width:860px){
 .p3b-mth{grid-template-columns:minmax(0,1fr);gap:4px}
 .p3b-mth::before{left:27px;right:auto;top:20px;bottom:20px;width:3px;height:auto;background:linear-gradient(180deg,var(--neon),#d9b56e 45%,var(--gold) 80%,#ff8a7a)}
 .p3b-mth button{flex-direction:row;align-items:center;text-align:left;gap:14px;padding:4px 0}
 .p3b-mth .dot{flex:0 0 56px}
 .p3b-mth b{display:block}.p3b-mth button>span:last-child{display:block}
 .p3b-mthd,.p3b-xg,.p3b-3c,.p3b-help,.p3b-stc,.p3b-qc{grid-template-columns:minmax(0,1fr)}
 .p3b-xh{grid-template-columns:80px minmax(0,1fr)}.p3b-xh svg{width:80px}.p3b-pb{grid-column:1/-1;text-align:left}
 .p3b-shared{grid-template-columns:repeat(2,minmax(0,1fr))}
 .p3b-stl>div{grid-template-columns:minmax(0,1fr);gap:4px}
 .p3b-bar{flex-wrap:wrap}.p3b-bar button{flex:1 1 40% !important}
}
@media (max-width:640px){
 .p3b-gl thead,.p3b-core thead{display:none}
 .p3b-gl,.p3b-gl tbody,.p3b-gl tr,.p3b-core,.p3b-core tbody,.p3b-core tr{display:block}
 .p3b-gl tr{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:4px 12px;padding:14px;border-bottom:1px solid var(--edge)}
 .p3b-gl td{display:block;padding:0;border:0}
 .p3b-gl td:first-child,.p3b-gl td:nth-child(4),.p3b-gl td:nth-child(5){grid-column:1/-1}
 .p3b-gl td[data-l]:not([data-l=""])::before{content:attr(data-l);display:block;font:500 .56rem var(--f-hud);letter-spacing:.14em;text-transform:uppercase;color:var(--ink3);margin-top:6px}
 .p3b-core tr{padding:12px 14px;border-bottom:1px solid var(--edge)}
 .p3b-core td{display:block;padding:2px 0;border:0}
 .p3b-core td:first-child{min-width:0}
 .p3b-fam button small{display:none}
}
@media (max-width:520px){.p3b-shared{grid-template-columns:minmax(0,1fr)}.p3b-x{padding:18px}.p3b-xtabs button{flex:1 1 40%;font-size:.76rem;padding:9px 8px}.p3b-xh h3{font-size:1.15rem}}
`);
const XI='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M8 8l8 8M16 8l-8 8"/></svg>';
const NMA=`<div class="p3b-nma"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l9 16H3z"/><path d="M12 10v4M12 17v.5"/></svg><div><b>Not medical advice.</b> Afya Boxes carry everyday health supplies, not treatment. Quantities shown are examples of how a box is sized; how often to test, which dressing, what fluid limit, or any medicine is decided by the person’s clinic. Afya advisers explain, never diagnose, and refer to a clinic whenever a sign needs a doctor.</div></div>`;
/* ======================================================================
   3.5 AFYA BOXES AND AFYA CHOICE  ·  rebuilt from the founders' Research Lab price list
   Items, quantities and shelf prices come from the Research Lab catalogue (CAT, TSh shelf prices).
   Price per box = shelf value × (1 − member saving of 3%, 6% or 9% by plan) + service fee + packing at the landed cost of the box size (S 3,500 · M 5,000 · L 6,500) + delivery 3,500, rounded to 500.
   ====================================================================== */
const BCAT={"1":["Upper-arm BP monitor","Kipimo cha presha (mkono wa juu)",70000],"2":["Talking BP monitor (voice, Swahili/English)","Kipimo cha presha chenye sauti",86000],"3":["Wrist BP monitor","Kipimo cha presha cha kiganja",49000],"4":["BP monitor with extra-large cuff","Kipimo cha presha chenye mkanda mkubwa",84000],"5":["Bluetooth BP monitor with phone app","Kipimo cha presha chenye Bluetooth",130000],"6":["Manual BP kit with stethoscope","Seti ya kupima presha na stethoskopu",56000],"7":["Digital stick thermometer","Kipimajoto cha kidijitali",7000],"8":["Infrared forehead thermometer","Kipimajoto cha paji la uso (infrared)",47000],"9":["Infrared ear thermometer","Kipimajoto cha sikio",63000],"10":["Fingertip pulse oximeter","Kipimo cha oksijeni kidoleni",47000],"11":["Children's pulse oximeter","Kipimo cha oksijeni cha watoto",63000],"12":["Digital bathroom scale","Mzani wa kidijitali wa bafuni",48000],"13":["Smart body-fat scale","Mzani wa kupima mafuta mwilini",72000],"14":["Body measuring tape (waist/BMI)","Utepe wa kupima kiuno",2000],"15":["Stethoscope (dual head)","Stethoskopu",21000],"16":["Wall height chart / stadiometer","Kipimo cha urefu cha ukutani",35000],"17":["Digital baby scale","Mzani wa watoto wachanga",96000],"18":["Glucometer starter kit","Kipimo cha sukari (seti ya kuanzia)",63000],"19":["Glucose test strips (50)","Vipande vya kupima sukari (50)",39000],"20":["Lancets (box of 100)","Sindano za kuchoma kidole (100)",9000],"22":["Insulin cooling travel pouch","Mfuko wa kupoza insulini",29000],"23":["Diabetic socks (pair)","Soksi za wenye kisukari (jozi)",11000],"24":["Sharps disposal container","Chombo cha kutupia sindano",6000],"25":["Diabetic foot care cream","Krimu ya miguu kwa wenye kisukari",11000],"26":["Foot sensation test (monofilament)","Kipimo cha hisia za mguu",3000],"27":["Adjustable aluminium walking stick","Fimbo ya kutembelea inayorekebishwa",19500],"30":["Underarm crutches (pair)","Magongo ya kwapani (jozi)",71000],"36":["Lightweight transport wheelchair","Kiti cha magurudumu chepesi",460000],"40":["Rubber cane tips (pair)","Vifuniko vya mpira vya fimbo",2000],"44":["Raised toilet seat","Kiti cha kuinua choo",89000],"45":["Shower chair","Kiti cha kuogea",110000],"47":["Suction grab bar","Kishikio cha bafuni cha kunata",24000],"49":["Non-slip bath mat","Mkeka wa bafuni usioteleza",14500],"50":["Bed safety rail","Kizuizi cha kitanda",145000],"53":["Waterproof mattress protector","Kinga ya godoro isiyopitisha maji",29000],"54":["Adult diapers (pack of 10)","Nepi za watu wazima (10)",24000],"55":["Disposable underpads (pack of 10)","Shuka za kutupwa (10)",14500],"56":["Bedpan","Sahani ya haja kitandani",14000],"57":["Male urinal bottle","Chupa ya mkojo ya wanaume",10500],"60":["Overbed table","Meza ya juu ya kitanda",165000],"61":["Wedge pillow","Mto wa pembetatu",50000],"63":["Big-button phone for seniors","Simu yenye vitufe vikubwa kwa wazee",84000],"64":["No-rinse shampoo cap","Kofia ya kuoshea nywele bila maji",7000],"65":["Body cleansing wipes (40)","Vitambaa vya kusafishia mwili (40)",8000],"66":["Weekly pill organiser","Kisanduku cha dawa cha wiki",8000],"77":["Reading glasses (+1.0 to +3.0)","Miwani ya kusomea",6500],"79":["Motion-sensor night light","Taa ya usiku yenye sensa",18500],"80":["Easy-grip key turner","Kishikio cha kugeuza ufunguo",7000],"90":["Ankle support sleeve","Soksi ya kifundo cha mguu",10500],"91":["Arm sling","Kibebeo cha mkono",8000],"94":["Abdominal binder (post-surgery / post-natal)","Mkanda wa tumbo baada ya upasuaji au kujifungua",32000],"95":["Maternity support belt","Mkanda wa kushikilia tumbo la ujauzito",32000],"96":["Rib belt","Mkanda wa mbavu",17500],"100":["Walker boot (fracture)","Buti ya kuvunjika mguu",145000],"102":["Arch-support insoles (flat feet)","Soli za kunyanyua upinde wa mguu",14000],"104":["Compression stockings (varicose veins)","Soksi za kubana (mishipa ya damu)",24000],"113":["Reusable hot/cold gel pack","Pakiti ya jeli ya joto/baridi",8000],"114":["Hot water bottle","Chupa ya maji ya moto",11000],"115":["Instant ice pack","Pakiti ya barafu ya papo hapo",3500],"120":["Pedal exerciser for seniors","Kifaa cha kupiga pedeli kwa wazee",99000],"125":["Menthol pain-relief balm","Mafuta ya kupunguza maumivu",8000],"126":["Flexible baby thermometer","Kipimajoto cha mtoto",12000],"127":["Manual nasal aspirator","Kifaa cha kuvuta kamasi",8000],"131":["Manual breast pump","Pampu ya maziwa ya mkono",32000],"132":["Electric breast pump","Pampu ya maziwa ya umeme",140000],"133":["Breast milk storage bags (30)","Mifuko ya kuhifadhi maziwa ya mama (30)",14500],"135":["Nursing pads (30)","Pedi za kunyonyeshea (30)",11000],"137":["Steam bottle steriliser","Kifaa cha kusafisha chupa kwa mvuke",115000],"138":["Baby bath seat","Kiti cha kuogea mtoto",50000],"140":["Silicone feeding spoon set","Vijiko vya silikoni vya mtoto",10000],"142":["Baby nail clipper set","Seti ya kukata kucha za mtoto",7000],"144":["Umbilical cord care kit","Seti ya kutunza kitovu",7000],"146":["Baby cot mosquito net","Chandarua cha kitanda cha mtoto",24000],"147":["Waterproof changing mat","Mkeka wa kubadilishia nepi",14500],"149":["Nappy rash cream","Krimu ya vipele vya nepi",7500],"150":["Ergonomic baby carrier","Kibebeo cha mtoto",58000],"151":["Silicone bibs","Bibu za silikoni",7000],"152":["Home baby-safety kit (corner guards, locks)","Seti ya usalama wa mtoto nyumbani",22000],"155":["Kids' electric toothbrush","Mswaki wa umeme wa watoto",22000],"156":["Kids' soft toothbrush","Mswaki laini wa watoto",1500],"157":["Kids' fluoride toothpaste","Dawa ya meno ya watoto",4000],"158":["Head-lice comb","Kitana cha chawa",5500],"160":["Kids' cartoon plasters (box)","Plasta za watoto (boksi)",6000],"161":["School first-aid pouch","Kifurushi cha huduma ya kwanza cha shule",24000],"162":["Insect-repellent wristband","Mkanda wa mkononi wa kufukuza mbu",3000],"163":["Kids' water bottle with time markers","Chupa ya maji ya mtoto yenye alama za muda",13500],"164":["Children's multivitamin gummies","Vitamini za watoto (gummies)",24000],"168":["Pregnancy test strips","Kipimo cha ujauzito",1500],"169":["Ovulation test strips","Kipimo cha siku za kupata mimba",1500],"170":["Menstrual cup","Kikombe cha hedhi",12000],"171":["Reusable sanitary pads (pack of 4)","Pedi za hedhi zinazofuliwa (4)",16000],"172":["Period-pain heat patches","Plasta za joto za maumivu ya hedhi",3000],"173":["Pelvic floor (Kegel) trainer","Kifaa cha mazoezi ya nyonga",28000],"174":["Feminine intimate wash","Sabuni ya usafi wa sehemu za siri",7500],"176":["Maternity pads (pack of 10)","Pedi za kujifungulia (10)",11000],"177":["U-shaped pregnancy pillow","Mto wa ujauzito",99000],"178":["Handheld cooling fan","Feni ndogo ya mkononi",13500],"180":["Portable mesh nebuliser","Nebulaiza ndogo ya kubeba",105000],"183":["Incentive spirometer","Kifaa cha mazoezi ya mapafu",14000],"190":["Home first-aid kit (own brand)","Sanduku la huduma ya kwanza la nyumbani",24000],"191":["Workplace first-aid kit (50 people)","Sanduku la huduma ya kwanza la ofisi (watu 50)",94000],"192":["Car first-aid kit","Sanduku la huduma ya kwanza la gari",32000],"193":["Travel first-aid pouch","Kifurushi kidogo cha safari",14000],"194":["Adhesive plasters (box of 100)","Plasta (boksi 100)",6000],"195":["Sterile gauze swabs","Gozi safi",3000],"196":["Crepe bandage","Bendeji ya kunyumbulika",2500],"197":["Elastic adhesive bandage","Bendeji inayonata",5000],"198":["Triangular bandage","Bendeji ya pembetatu",2000],"199":["Micropore surgical tape","Plasta ya karatasi (micropore)",2500],"200":["Cotton wool roll","Pamba",3500],"201":["Antiseptic liquid","Dawa ya kusafishia vidonda",6000],"202":["Burn gel dressing","Jeli ya majeraha ya moto",10500],"203":["Blister plasters (hydrocolloid)","Plasta za malengelenge",7000],"204":["First-aid scissors and tweezers set","Mkasi na koleo ndogo za huduma ya kwanza",6000],"205":["Disposable gloves (box of 100)","Glavu za kutupwa (100)",17500],"206":["CPR face shield","Kinga ya mdomo ya CPR",3000],"207":["Emergency foil blanket","Blanketi la dharura",2500],"208":["Eye-wash cup and saline","Kikombe na maji ya kuoshea macho",6000],"209":["Emergency splint","Gango la dharura",28000],"210":["Wound closure strips","Vipande vya kufunga kidonda",3000],"211":["Hand sanitiser 500ml","Kitakasa mikono 500ml",7000],"212":["Pocket hand sanitiser 60ml","Kitakasa mikono cha mfukoni 60ml",2500],"213":["Surgical face masks (box of 50)","Barakoa za upasuaji (50)",12000],"215":["Surface disinfectant spray","Dawa ya kupuliza kuua vijidudu",9000],"216":["Antibacterial soap","Sabuni ya kuua bakteria",2500],"217":["Disinfecting wipes (80)","Vitambaa vya kuua vijidudu (80)",10000],"218":["UV-C steriliser box","Kisanduku cha UV cha kuua vijidudu",73000],"219":["Automatic soap dispenser","Kitoa sabuni cha kujiendesha",44000],"220":["Foot-pedal sanitiser stand (offices)","Stendi ya kitakasa mikono ya kukanyaga",165000],"221":["Long-lasting family mosquito net","Chandarua cha familia",22000],"222":["Insect-repellent lotion","Losheni ya kufukuza mbu",8000],"223":["Water purification tablets","Vidonge vya kusafisha maji",7000],"224":["Ceramic home water filter","Kichujio cha maji cha nyumbani",125000],"225":["Adult nail clipper set","Seti ya kukata kucha",10000],"226":["Foot file / callus remover","Kisugua miguu",5500],"228":["Hair clipper / trimmer","Mashine ya kunyoa nywele",44000],"234":["Emollient cream for dry skin","Krimu ya ngozi kavu",14500],"235":["Lip balm with SPF","Mafuta ya midomo yenye SPF",3500],"236":["Acne pimple patches (36)","Plasta za chunusi (36)",6500],"240":["Dental floss picks (50)","Vijiti vya uzi wa meno (50)",5500],"242":["Denture box and cleaning tablets","Kisanduku na vidonge vya kusafisha meno bandia",14500],"244":["Sensitive toothpaste","Dawa ya meno kwa meno yanayouma",7000],"248":["Sleep eye mask","Barakoa ya macho ya kulala",3500],"249":["Foam ear plugs (10 pairs)","Vizibo vya masikio (jozi 10)",3000],"251":["Personal sound amplifier (hearing aid)","Kifaa cha kusaidia kusikia",78000],"253":["Blue-light screen glasses","Miwani ya kuzuia mwanga wa skrini",11000],"255":["Memory-foam neck pillow","Mto wa shingo wa povu",24000],"270":["Step counter (pedometer)","Kihesabu hatua",23000],"271":["Smart watch (heart rate, SpO2)","Saa janja ya kupima mapigo na oksijeni",130000],"274":["Sports knee pads","Kinga za magoti za michezo",13500],"278":["Sports mouthguard","Kinga ya meno ya michezo",5000],"285":["Washable incontinence pants","Chupi za kuzuia mkojo zinazofuliwa",22000],"286":["Heel protector boots (pressure relief)","Kinga za visigino kitandani",35000],"288":["Adult waterproof bib","Bibu ya watu wazima",10000],"289":["Elderly SOS button with GPS","Kitufe cha dharura chenye GPS kwa wazee",130000],"290":["Medical alert ID bracelet","Bangili ya taarifa za afya",10000],"296":["BP logbook (own brand, Swahili/English)","Daftari la kurekodi presha",2500],"297":["Glucose tablets (fast sugar)","Vidonge vya sukari ya haraka",11000],"298":["Silicone scar sheets","Plasta za silikoni za makovu",21000],"311":["Postnatal belly wrap","Mkanda wa tumbo baada ya kujifungua",29000],"312":["Breastfeeding pillow","Mto wa kunyonyeshea",50000],"313":["Foldable baby bath tub","Beseni la kuogea mtoto la kukunja",82000],"315":["Baby wipes, fragrance-free (80)","Vitambaa vya mtoto bila manukato (80)",5500],"316":["Baby diapers, premium (30)","Nepi za mtoto, daraja la juu (30)",21000],"317":["Baby pants diapers (30)","Nepi za suruali za mtoto (30)",22000],"318":["Baby head-to-toe wash 400 ml","Sabuni ya mtoto kichwa hadi miguu 400 ml",13000],"319":["Baby lotion 400 ml","Losheni ya mtoto 400 ml",12000],"320":["Baby massage oil 200 ml","Mafuta ya kumchua mtoto 200 ml",11000],"321":["Baby laundry detergent, gentle 1 L","Sabuni ya kufulia nguo za mtoto 1 L",8000],"322":["Waterproof cot sheet","Shuka la kitanda cha mtoto lisilopitisha maji",26000],"323":["Muslin cloths (6)","Vitambaa vya muslin (6)",24000],"324":["Swaddle wrap with velcro","Kitambaa cha kumfunga mtoto chenye velcro",19000],"326":["Bottle and teat brush set","Brashi za kusafisha chupa na chuchu",9000],"327":["Bottle and toy cleanser 500 ml","Sabuni ya kusafisha chupa na midoli 500 ml",11000],"329":["Saline nasal spray for babies","Dawa ya chumvi ya pua ya mtoto",8500],"331":["Baby sleeping bag","Mfuko wa kulala wa mtoto",33000],"332":["Baby bodysuits, cotton (5)","Nguo za mtoto za pamba (5)",37000],"333":["Baby socks and mittens set","Soksi na glovu za mtoto",9500],"334":["Teething gel-free silicone teether","Kifaa cha meno cha silicone",7500],"335":["Sippy cup with handles","Kikombe cha mtoto chenye vishikio",12000],"339":["Hospital delivery kit (mama kit)","Kifurushi cha kujifungulia hospitali (mama kit)",36000],"340":["Lanolin nipple cream 40 g","Krimu ya chuchu ya lanolin 40 g",18000],"341":["Disposable maternity briefs (5)","Chupi za kutupwa za wazazi (5)",11000],"342":["Stretch mark oil 125 ml","Mafuta ya michirizi ya ngozi 125 ml",18000],"343":["Morning sickness acupressure bands","Mikanda ya kiganja ya kichefuchefu",7000],"344":["Pregnancy compression socks","Soksi za kubana za ujauzito",17000],"345":["Peri bottle (postpartum wash)","Chupa ya kuosha baada ya kujifungua",8500],"348":["Nursing bra (2)","Sidiria za kunyonyesha (2)",37000],"350":["Sanitary pads, ultra-thin (10)","Pedi nyembamba sana (10)",4500],"351":["Panty liners (40)","Pedi nyembamba za kila siku (40)",4000],"352":["Organic cotton tampons (16)","Tamponi za pamba asilia (16)",14000],"353":["Period underwear","Chupi za hedhi",26000],"354":["Intimate wipes, pH-balanced (20)","Vitambaa vya usafi wa siri (20)",7500],"355":["Period pain relief TENS mini","Kifaa kidogo cha TENS cha maumivu ya hedhi",63000],"357":["Gentle foaming cleanser 150 ml","Sabuni ya uso laini 150 ml",18000],"359":["Hydrating toner 200 ml","Tona ya kulainisha 200 ml",15000],"360":["Vitamin C brightening serum 30 ml","Seramu ya vitamini C 30 ml",21000],"361":["Niacinamide 10% serum 30 ml","Seramu ya niacinamide 10% 30 ml",18000],"362":["Hyaluronic moisturiser gel 50 ml","Losheni ya uso ya hyaluronic 50 ml",19000],"363":["Invisible sunscreen SPF 50 for dark skin","Kinga ya jua SPF 50 isiyoacha weupe",23000],"364":["Shea butter body lotion 400 ml","Losheni ya mwili ya shea 400 ml",10000],"365":["Moisturising body wash 500 ml","Sabuni ya kuogea yenye unyevu 500 ml",15000],"366":["Gentle exfoliating scrub 200 ml","Skrabu laini ya kuondoa ngozi iliyokufa 200 ml",16000],"367":["Sheet face masks (5)","Barakoa za uso za karatasi (5)",11000],"369":["Cotton pads (120)","Pedi za pamba (120)",6500],"370":["Jade roller and gua sha set","Seti ya jade roller na gua sha",19000],"371":["LED light therapy face mask","Barakoa ya mwanga wa LED",200000],"372":["Natural hair moisturiser 250 ml","Krimu ya kulainisha nywele asilia 250 ml",9000],"373":["Scalp and hair growth oil 100 ml","Mafuta ya ngozi ya kichwa 100 ml",12000],"374":["Satin bonnet and pillowcase set","Kofia ya satin na foronya",18000],"375":["Detangling brush","Brashi ya kufumua nywele",11000],"376":["Roll-on deodorant 50 ml","Deodoranti ya roll-on 50 ml",7500],"377":["Nail care kit (10 pieces)","Seti ya kutunza kucha (vipande 10)",14000],"378":["Hand cream 75 ml","Krimu ya mikono 75 ml",7000],"379":["Fragrance body mist 150 ml","Marashi ya mwili 150 ml",11000],"380":["Lip care trio (balm, scrub, oil)","Seti ya kutunza midomo",12000],"381":["Eye patches, hydrogel (30 pairs)","Pedi za macho za hydrogel (jozi 30)",14000],"382":["Electric facial cleansing brush","Brashi ya umeme ya kusafisha uso",42000],"384":["Men's face wash, oil control 150 ml","Sabuni ya uso ya wanaume 150 ml",15000],"385":["Shaving gel for sensitive skin 200 ml","Jeli ya kunyolea ngozi nyeti 200 ml",11000],"386":["Razor cartridges, 5-blade (4)","Viwembe vya akiba vya makali 5 (4)",18000],"388":["Aftershave balm 100 ml","Balmu ya baada ya kunyoa 100 ml",13000],"389":["Beard oil 30 ml","Mafuta ya ndevu 30 ml",11000],"390":["Ingrown hair and razor bump serum","Seramu ya vipele vya kunyoa",13000],"391":["Men's roll-on deodorant 50 ml","Deodoranti ya wanaume 50 ml",7500],"392":["Antifungal foot powder 100 g","Poda ya miguu dhidi ya fangasi 100 g",7500],"393":["Men's body wash 3-in-1 500 ml","Sabuni ya wanaume 3-katika-1 500 ml",13000],"394":["Anti-dandruff shampoo 400 ml","Shampoo ya mba 400 ml",15000],"395":["Hair clipper guard and blade oil kit","Seti ya mafuta na vilinda vya mashine ya nywele",10000],"396":["Nose and ear hair trimmer","Kinyolea nywele za pua na masikio",25000],"397":["Men's grooming bag","Mfuko wa vifaa vya urembo wa wanaume",27000],"398":["Fistula protection arm sleeve","Kinga ya mkono wa fistula",28000],"399":["Measured fluid-intake bottle (1 L)","Chupa ya kupima maji ya kunywa (1 L)",16000],"400":["Sterile catheter-site dressing pack (10)","Pakiti za kufunga kidonda cha katheta (10)",32000],"401":["Chlorhexidine skin-prep wipes (50)","Vitambaa vya chlorhexidine vya kusafisha ngozi (50)",21000],"402":["Fragrance-free itch-relief moisturiser 400 ml","Losheni ya kupunguza muwasho bila manukato 400 ml",20000],"403":["Kidney diet guide and food diary (own brand)","Mwongozo wa lishe ya figo na daftari (chapa yetu)",6500],"404":["Dialysis day comfort bag","Begi la siku ya dialisisi",58000],"405":["Sugar-free mints for dry mouth (100)","Pipi zisizo na sukari za mdomo mkavu (100)",8000],"406":["Weekly BP and weight log (own brand)","Daftari la presha na uzito la wiki (chapa yetu)",3500],"408":["Handheld ECG monitor (single-lead)","Kipimo cha ECG cha mkononi",225000],"415":["Baby video monitor with cry alert","Kamera ya mtoto yenye arifa ya kulia",170000],"426":["Antibacterial hand wash 500 ml","Sabuni ya mikono ya antibakteria 500 ml",5000],"427":["Antiseptic laundry rinse 1 L","Dawa ya kusuuza nguo ya antiseptiki 1 L",8000],"428":["Toilet cleaner gel 750 ml","Jeli ya kusafisha choo 750 ml",4500],"429":["Multi-surface disinfectant cleaner 1 L","Dawa ya kusafisha nyuso zote 1 L",7500],"430":["Antibacterial kitchen wipes (80)","Vitambaa vya jikoni vya antibakteria (80)",11000],"431":["Microfibre cleaning cloths (10)","Vitambaa vya microfibre vya kusafisha (10)",15000],"432":["Pedal waste bin with lid 12 L","Pipa la taka lenye kifuniko 12 L",46000],"433":["Mosquito repellent plug-in with refill","Kifaa cha kufukuza mbu cha plagi",15000],"434":["Household first-aid refill pack","Pakiti ya kujaza sanduku la huduma ya kwanza",16000],"439":["Adult soft toothbrush (4)","Miswaki laini ya watu wazima (4)",9500],"440":["Alcohol-free mouthwash 500 ml","Dawa ya kusukutua isiyo na pombe 500 ml",13000],"442":["Insulin pen needles (100)","Sindano za kalamu ya insulini (100)",42000],"443":["Glucometer control solution","Dawa ya kuhakiki kipimo cha sukari",12000],"445":["Adult wet wipes, extra large (48)","Vitambaa vikubwa vya watu wazima (48)",7000],"446":["Barrier cream for skin care 200 ml","Krimu ya kulinda ngozi 200 ml",18000],"447":["Pressure-relief seat cushion, gel","Kiti cha jeli cha kupunguza shinikizo",63000],"448":["Non-slip grip socks (3 pairs)","Soksi zisizoteleza (jozi 3)",18000],"450":["Large-print medication chart (own brand)","Chati kubwa ya dawa (chapa yetu)",3000],"451":["Disposable bed bath kit","Kifurushi cha kuogesha kitandani",19000],"452":["Kids' toothbrush, 2-pack, age 3-8","Miswaki ya watoto pakiti 2",6000],"453":["Kids' SPF 50 roll-on for school","Kinga ya jua ya watoto ya kupaka shuleni",16000],"455":["Lunch box with water bottle set","Seti ya sanduku la chakula na chupa",27000],"456":["Children's digital thermometer, flexible","Kipimajoto cha watoto kinachopinda",10000],"457":["Baby bath sponge, natural","Sponji ya kuogeshea mtoto",5500],"458":["Baby sunscreen SPF 50, mineral 50 ml","Kinga ya jua ya mtoto SPF 50",19000],"462":["Baby car seat sunshade and mosquito cover","Kifuniko cha mbu na jua cha kiti cha mtoto",17000],"463":["Toddler training potty","Choo cha kufundishia mtoto",33000],"466":["Kids' hand sanitiser clip-on 30 ml","Sanitaiza ya watoto ya kubana kwenye begi",4500],"467":["Maternity hospital bag (empty, organiser)","Begi la hospitali la mama",40000],"468":["Pregnancy belly support band","Mkanda wa kusaidia tumbo la ujauzito",18000],"470":["Cooling perineal pads (10)","Pedi za kupoza baada ya kujifungua (10)",21000],"472":["Daily face moisturiser SPF 30 for men","Losheni ya uso yenye SPF 30 ya wanaume",18000],"475":["Men's intimate wash 200 ml","Sabuni ya usafi wa siri ya wanaume 200 ml",10000],"476":["Cuticle oil pen","Kalamu ya mafuta ya kucha",7000],"478":["Retinol night cream 50 ml","Krimu ya usiku ya retinol 50 ml",22000],"479":["Dark spot corrector cream 30 ml","Krimu ya kurekebisha madoa meusi 30 ml",23000],"480":["Clay purifying mask 100 g","Barakoa ya udongo 100 g",14000],"482":["Silk-feel hair serum 100 ml","Seramu ya nywele 100 ml",15000],"483":["Wig and braid care spray 250 ml","Spray ya kutunza wigi na misuko 250 ml",7500],"485":["Smart blood glucose meter with Bluetooth","Kipimo janja cha sukari chenye Bluetooth",98000],"489":["Kidney-friendly low-sodium salt alternative","Mbadala wa chumvi yenye sodiamu kidogo",14000],"490":["Dialysis patient medical ID wristband","Mkanda wa kitambulisho cha mgonjwa wa dialisisi",9000],"491":["Home peritoneal dialysis hygiene kit","Seti ya usafi wa dialisisi ya tumbo nyumbani",42000],"493":["Floor disinfectant concentrate 5 L","Dawa ya sakafu iliyokolea 5 L",18000],"494":["Bathroom anti-mould spray 500 ml","Spray ya kuondoa ukungu bafuni 500 ml",12000],"495":["Hand towel dispenser paper (6 rolls)","Taulo za karatasi za mikono (rolls 6)",14000],"500":["Smart posture chair cushion","Mto janja wa kiti wa mkao",82000],"501":["Electric toothbrush for kids, sonic","Mswaki wa umeme wa watoto",26000],"502":["Baby diapers, jumbo value pack (90)","Nepi za mtoto, pakiti kubwa ya akiba (90)",51000],"503":["Push walker, sit-to-stand","Kitembezi cha kusukuma cha mtoto",115000],"504":["Baby high chair, foldable","Kiti kirefu cha mtoto kinachokunjwa",185000],"505":["Portable baby net bed, foldable","Kitanda cha mtoto chenye chandarua, kinachokunjwa",74000],"506":["Child-size bed mosquito net (long-lasting)","Chandarua cha kitanda cha mtoto (cha muda mrefu)",16000],"507":["Washing basin set, 3 sizes","Seti ya mabeseni 3 ya kufulia na kuogea",12000],"508":["Cloth nappy set: 6 inserts + 2 covers","Seti ya nepi za kitambaa: 6 na vifuniko 2",37000],"509":["Reusable cotton washcloths (10)","Vitambaa vya pamba vinavyofuliwa (10)",15000],"510":["Baby cotton socks (6 pairs)","Soksi za pamba za mtoto (jozi 6)",12000],"511":["Baby warm hat & cardigan set","Seti ya kofia na sweta ya mtoto",26000],"512":["Prickly-heat cooling powder, talc-free 100 g","Poda ya kupoza vipele vya joto, bila talc 100 g",9500],"513":["Mosquito repellent stickers, DEET-free (24)","Stika za kufukuza mbu bila DEET (24)",11000],"514":["Warm fleece blanket","Blanketi laini la joto",37000],"515":["Warm bed socks, non-slip (3 pairs)","Soksi za joto zisizoteleza (jozi 3)",19000],"516":["Warming joint massage oil 200 ml","Mafuta ya kuchua viungo 200 ml",14000],"517":["Breast self-exam card & guide","Kadi na mwongozo wa kujipima matiti",1500],"518":["Sanitary disposal bags (50)","Mifuko ya kutupia pedi (50)",4500],"519":["Breathable cotton underwear (3)","Chupi za pamba zinazopitisha hewa (3)",19000],"520":["Leave-in conditioner & edge care 250 ml","Krimu ya nywele na kingo 250 ml",13000],"521":["Anti-chafing balm 50 g","Balmu ya kuzuia michubuko ya joto 50 g",11000],"522":["Children's rain poncho with hood","Koti la mvua la mtoto lenye kofia",11000],"n1":["AA batteries (4)","Betri AA (4)",4000],"n2":["Ginger lozenges (20)","Pipi za tangawizi (20)",4000],"n8":["Sterile saline wound wash 100 ml","Maji ya chumvi ya kusafisha kidonda",9000],"n9":["Sterile island dressings, assorted (10)","Plasta kubwa za kidonda (10)",9500],"n13":["Family fluoride toothpaste 1,450 ppm","Dawa ya meno yenye floraidi",4000],"n14":["Disposable razors (5)","Viwembe vya kutupwa (5)",5000],"n15":["Waterproof cast and dressing shower cover","Kifuniko cha kuogea kwa kidonda/hogo",12000],"n18":["Discreet school period pouch","Kimfuko cha pedi cha shule",6000],"n19":["Period calendar card (own brand)","Kadi ya kalenda ya hedhi",1500],"n24":["First-aid guide card in Kiswahili","Kadi ya mwongozo wa huduma ya kwanza",1500]};
const NEWI={n1:1,n2:1,n8:1,n9:1,n13:1,n14:1,n15:1,n18:1,n19:1,n24:1}; /* items added in this rebuild: shelf price is a planning estimate */
const it=id=>BCAT[id]||['Item','',0];
const BASE=.08,PLD={1:0,3:.05,6:.08,12:.12},PACKC=5000,DELC=3500,PSZ={preg:'S',mama:'L',shule:'S',binti:'M',kijana:'S',glow:'L',siku:'S',man:'M',home:'M',senior:'L',sugar:'M',presha:'S',kidney:'M',rec:'M',aid:'M',office:'L',hotel:'L'},PACKS={S:3500,M:5000,L:6500},PK=b=>PACKS[PSZ[b.k]||'M'],SMALLP=.18,TRIP=2000;
const PL=[{p:1,t:'Try',sw:'Jaribu',best:'Trying a box for the first time',perks:['Cancel any time','8% below shelf price','Starter items 15% off','Free Afya Check every month']},
 {p:3,t:'Silver',sw:'Fedha',best:'A season: a trimester, a school term, a recovery',perks:['13% below shelf price on every box','Starter items 15% off','Pause 1 month']},
 {p:6,t:'Gold',sw:'Dhahabu',best:'Most families: the best value for money',perks:['16% below shelf price on every box','Devices free (BP monitor, glucometer)','Other starter items 50% off','Afya Points ×1.5']},
 {p:12,t:'Platinum',sw:'Platinamu',best:'Long needs: baby’s first years, diabetes, BP, parents',perks:['20% below shelf price on every box','Devices free, other starters 50% off','Pause 2 months','Afya Points ×2 and priority WhatsApp line']}];
const DLT=[0,-0.05,0.04,-0.02,0.06];
const ORI=['India','China','India','China','East Africa'];
const TAGS=['Most chosen','Value pick','Larger pack','Local favourite','Premium finish'];
/* Research Lab (old) 1-month delivered price for the default options, extracted from the lab's own calculator */
const LAB={mama:376500,glow:146000,siku:40000,man:84500,senior:175000,sugar:71000,presha:32500,kidney:62500,home:79000,shule:56500,office:168000,hotel:205000};
const LAB12={mama:203000,glow:127500,siku:35500,man:74000,senior:155000,sugar:62500,presha:30500,kidney:55000,home:69500,shule:50000,office:153500,hotel:183000};
const CAP='Concept image · products of the kind included';
const GRPS=[['all','All boxes'],['mb','Mother & baby'],['kids','Children & teens'],['adult','Women & men'],['cond','Living with a condition'],['care','Older adults & recovery'],['home','Home & first aid'],['biz','Businesses · Afya Kazini']];

/* ---------- the boxes ---------- */
const BOXES=[
/* 1 ---------------------------------------------------------------- PREGNANCY */
{k:'preg',n:'Mama Mjamzito',en:'Pregnancy, trimester by trimester',g:'mb',age:'Pregnancy · weeks 1–40',img:'img/prod-care.webp',card:'Afya Family',cad:'Monthly',
 who:'An expectant mother from the first positive test to the hospital bag, and the husband, mother or sister abroad who wants to help in a real way.',
 why:'Pregnancy is nine months of small, changing needs. In the first trimester it is nausea, tiredness and the first clinic visit; in the second the skin stretches, legs swell and sleep gets harder; in the third the mother must prepare a delivery kit that many Tanzanian hospitals ask families to bring. Today she buys these one at a time, often late, often from several shops. The box follows the trimester automatically and protects two things that matter most in Tanzania: sleeping under a mosquito net every night and attending antenatal care.',
 ev:[['WHO: all pregnant women in malaria areas should receive a long-lasting insecticidal net as early as possible in pregnancy. If the family has no net, it is the first starter item.','itn'],['WHO recommends daily iron and folic acid in pregnancy. The tablets come free from the antenatal clinic, so the box does not sell them; it gives a weekly organiser and a reminder so none are missed.','ifa'],['NHS: morning sickness usually clears by weeks 16 to 20; there is some evidence that ginger and wrist acupressure help. Both are in trimester 1 only.','ms'],['Bleeding after birth lasts two to six weeks; maternity pads, not tampons, are advised. The trimester-3 delivery kit carries them.','loch'],['Tanzania DHS 2022 coverage profile: antenatal care is widely attended; the box supports, never replaces, those visits.','dhs']],
 qty:'Daily-use items follow uses per day × 30: one panty liner a day (a 40-pack lasts a month), one bottle of lotion for daily use, half a bottle of intimate wash. Items that last longer are given as fractions: a toothbrush every 3 months (¼ of a 4-pack a month). One-time items (tests, bands, pillow, net, delivery kit) are starter items, placed in the month they are first needed, not in month 1.',
 stg:'Trimester 1 (weeks 1–13): pregnancy tests, nausea care, thermometer and the pill organiser. Trimester 2 (weeks 14–27): ginger and bands stop; stretch-mark oil, belly band, compression socks and the side-sleeping pillow start. Trimester 3 (weeks 28–40): the same daily care, plus in the last month the full hospital bag: mama kit, maternity pads, briefs, peri bottle and the baby’s first clothes. After the birth the member moves to Mama na Mtoto with one tap.',
 excl:[['Iron, folic acid and any medicine','Given free at the antenatal clinic or sold only through a licensed pharmacy counter on a health worker’s advice.'],['Pregnancy vitamins and herbal teas','Supplements only when a health worker advises them; many herbal products are untested in pregnancy.'],['Skin-lightening or unregistered creams','Some cosmetics are banned by TBS for harmful ingredients; only registered products are stocked.']],
 ex:'Rehema in Mbagala is 9 weeks pregnant with her first baby. Her husband, who works in Muscat, starts a 6-month Gold plan. Her first box brings pregnancy tests, ginger lozenges, wrist bands, a long-lasting net and a pill organiser for the clinic’s iron tablets. At week 14 the ginger stops and the stretch-mark oil and belly band arrive. In week 36 the hospital bag is complete, delivered to her door.',
 safe:'Bleeding, severe headache, blurred vision, swelling of the face, fever or reduced baby movements: the adviser tells her to go to the clinic now, and the box never delays that.',
 slots:[['Body lotion',364],['Intimate wash',174],['Panty liners',351],['Stretch-mark oil',342]],
 stages:[['t1','Trimester 1 · weeks 1–13',3],['t2','Trimester 2 · weeks 14–27',3],['t3','Trimester 3 · weeks 28–40',3]],
 opt:[{k:'net',n:'Mosquito net at home',o:[['need','We need a net'],['have','We already sleep under one']],d:'need'}],
 items(o){const st=o.stage,mi=o._mi||0,m=[],s=[],x=[],a=[];
  m.push([174,.5,'pH-balanced intimate wash · ½ bottle a month (discharge increases in pregnancy)'],[351,1,'Panty liners ×40 · 1–2 a day'],[364,1,'Shea body lotion 400 ml · daily, as the skin stretches'],[222,1,'Insect-repellent lotion · evenings outdoors (malaria is more dangerous in pregnancy)'],[519,.34,'Breathable cotton underwear ×3 · a new set every 3 months, bigger as the bump grows'],[244,1,'Sensitive toothpaste · twice a day, gums are more tender in pregnancy'],[439,.25,'Soft toothbrushes ×4 · one every 3 months'],[212,1,'Pocket hand sanitiser · clinic visits and daladala rides'],[223,.5,'Water purification tablets · safe drinking water'],[296,.34,'Readings logbook · BP and weight from the free Afya Check between clinic visits']);
  if(st==='t1')m.push(['n2',1,'Ginger lozenges · NHS: some evidence ginger eases nausea (trimester 1 only)']);
  if(st!=='t1')m.push([342,1,'Stretch-mark oil 125 ml · daily belly massage'],[521,.34,'Anti-chafing balm · hot days, thighs and under the bump']);
  if(st==='t1'&&mi===0)s.push([168,2,'Pregnancy tests ×2 · confirm before the first clinic visit'],[343,1,'Acupressure wrist bands · for nausea'],[7,1,'Digital thermometer · fever in pregnancy always needs the clinic'],[66,1,'Weekly pill organiser · for the clinic’s iron and folic acid tablets'],[163,1,'Water bottle with time markers · about 8 glasses a day']);
  if(st==='t2'&&mi===0)s.push([468,1,'Belly support band · back and pelvic comfort'],[344,1,'Compression socks · tired, swollen legs (clinic first if one leg is red or painful)'],[177,1,'U-shaped pregnancy pillow · side sleeping'],[178,1,'Handheld cooling fan · Dar heat']);
  if(o._join&&st!=='t1')s.push([66,1,'Weekly pill organiser · for the clinic’s iron and folic acid tablets'],[7,1,'Digital thermometer']);
  if(o._join&&st==='t3')s.push([177,1,'U-shaped pregnancy pillow'],[344,1,'Compression socks']);
  if(o._join&&o.net==='need')s.push([221,1,'Long-lasting mosquito net · WHO: as early as possible in pregnancy, every night']);
  if(st==='t3'&&mi===2)x.push([339,1,'Hospital delivery kit (mama kit) · what many hospitals ask families to bring'],[467,1,'Hospital bag organiser'],[176,3,'Maternity pads ×30 · first days after birth'],[341,2,'Disposable maternity briefs ×10'],[345,1,'Peri bottle · gentle washing after birth'],[332,1,'Baby bodysuits 0–3 months ×5'],[323,1,'Muslin cloths ×6'],[333,1,'Baby socks and mittens']);
  a.push([95,1,'Maternity support belt (firmer)'],[173,1,'Pelvic floor trainer'],[312,1,'Breastfeeding pillow, ready for the birth'],[17,1,'Digital baby scale']);
  return{m,s,x,a,svc:['Free BP and weight check every visit, danger signs explained','WhatsApp Mama Club with a nurse every Thursday','Reminder before each antenatal clinic date']}}},
/* 2 ---------------------------------------------------------------- MAMA NA MTOTO */
{k:'mama',n:'Mama na Mtoto',en:'Newborn to toddler, 0–3 years',g:'mb',age:'Baby 0–12 months · toddler 1–3 years',img:'/_blob/2bb4505a3beb6ce3a3858851a95dcc2a',card:'Afya Family',cad:'Monthly',
 who:'A mother and her baby from the day they come home to the third birthday; also grandmothers who raise grandchildren and relatives who gift real help.',
 why:'Nappies are the biggest repeat cost of the first years and the number changes fast: a newborn uses almost twice as many as a toddler. The mother needs her own care for six weeks after birth. The baby moves through sizes, starts solids, cuts teeth and learns to walk. Families usually discover the wrong size or the wrong count when the pack is already empty, at night. This box changes by itself when the baby grows, which is the whole point.',
 ev:[['NHS: young babies may need changing 10 to 12 times a day, older babies about 6 to 8. The box’s counts (9–10, 8, 6 and 5 a day) sit inside those bands and are checked each month with the mother.','nap'],['WHO recommends clean, dry cord care. The box gives a cord kit for keeping it clean and dry, and no creams, powders or spirit.','cord'],['WHO and UNICEF: exclusive breastfeeding for 6 months, safe solid foods from 6 months. The box supports breastfeeding (pads, nipple cream, optional pump) and carries no formula.','iycf'],['NHS: brush as soon as the first tooth appears, with a smear of toothpaste of at least 1,000 ppm fluoride, twice a day.','teeth'],['Bleeding after birth lasts 2 to 6 weeks: maternity pads in month 1 and a lighter pack in month 2, then they stop.','loch'],['In Tanzania 66.2% of babies under 6 months were exclusively breastfed in 2022: a strong habit the box protects.','dhs']],
 qty:'Nappies = changes per day × 30, packed in jumbo packs of 90 plus top-up packs of 30: newborn 270 a month (about 9–10 a day), 3–6 months 240 (8 a day), 6–12 months 180 (6 a day), toddler 150 pants (5 a day). With cloth by day, disposables cover nights and outings (120 or 90 a month). Wipes = about 2 per change in packs of 80 (7 packs for a newborn, 4 for a toddler). Creams and washes are one bottle or tube a month; long-lasting items are fractions (washcloths every 4 months).',
 stg:'0–3 months: newborn nappies, maternity pads (month 1 and 2), nursing pads, cord kit and the first-month starter set (thermometer, net bed, bath, changing mat). 3–6 months: nappies move up a size and fall to 8 a day; teether and carrier arrive. 6–12 months: solids start, so spoons, cup, bibs, high chair, a toothbrush and fluoride smear; the baby outgrows the net bed and gets a cot net; a push walker at about 9 months. 1–3 years: pants nappies, kids’ toothpaste, potty, SPF and repellent wristbands for outdoor play.',
 excl:[['Infant formula and bottles','Not in the box: WHO advises exclusive breastfeeding to 6 months. Available separately for families advised by a health worker.'],['Cord creams, powders, spirit','WHO recommends clean, dry cord care.'],['Fever syrup and any medicine','Only through a licensed pharmacy counter, with advice.'],['Talc on the baby','The seasonal powder is talc-free; talc is not used on babies.']],
 ex:'Neema in Sinza has her first baby. Week 1: newborn nappies, 60 maternity pads, nursing pads, nipple cream, cord kit and a net bed beside her. Month 4: the system moves nappies up a size and lowers the count, so nobody has to remember. Month 6: spoons, cup and a high chair arrive with the first toothbrush. When she returns to work, the box goes to her mother’s house in Kimara.',
 safe:'Fever in a baby under 3 months, a red or smelly cord, poor feeding, fewer wet nappies, or a mother soaking a pad every hour: the adviser refers to the clinic the same day.',
 slots:[['Nappies',502],['Wipes',315],['Nappy cream',149],['Baby wash',318],['Baby lotion',319]],
 stages:[['nb','Newborn · 0–3 months',3],['m3','Baby · 3–6 months',3],['m6','Baby · 6–12 months',6],['tod','Toddler · 1–3 years',24]],
 opt:[{k:'nappy',n:'Nappies',o:[['full','All disposable'],['mix','Cloth by day, disposable at night'],['none','I use my own']],d:'full'},{k:'pump',n:'Expressing milk',o:[['no','No'],['yes','Yes (working mother)']],d:'no'}],
 items(o){const st=o.stage,mi=o._mi||0,m=[],s=[],x=[],a=[];
  const NAP={nb:{full:270,mix:120,per:'9–10'},m3:{full:240,mix:120,per:'8'},m6:{full:180,mix:90,per:'6'},tod:{full:150,mix:90,per:'5'}},SZ={nb:'Newborn → S',m3:'S → M',m6:'M → L',tod:'L/XL pants'};
  if(o.nappy!=='none'){const N=NAP[st][o.nappy];if(st==='tod')m.push([317,N/30,`Pants nappies ${SZ[st]} · ${N} a month (${o.nappy==='full'?NAP[st].per+' a day':'nights and outings'}) = ${N/30} packs of 30`]);else{const j=Math.floor(N/90),r=Math.ceil((N-90*j)/30);if(j)m.push([502,j,`Nappies ${SZ[st]} · ${j} jumbo packs of 90`]);if(r)m.push([316,r,`Top-up packs of 30 · total ${N} a month = ${o.nappy==='full'?NAP[st].per+' a day × 30':'nights and outings'}`])}}
  const W={nb:7,m3:6,m6:5,tod:4}[st];
  m.push([315,W,`Fragrance-free wipes ×${W*80} · about 2 per change`],[149,st==='tod'?.5:1,'Nappy rash (barrier) cream · thin layer at changes'],[318,1,'Head-to-toe baby wash 400 ml'],[319,1,'Baby lotion 400 ml'],[321,1,'Gentle laundry detergent for baby clothes'],[320,st==='nb'?1:.5,'Baby massage oil · daily massage'],[509,.25,'Reusable cotton washcloths ×10 · fresh set every 4 months'],[457,.25,'Natural bath sponge · every 4 months'],[426,.5,'Antibacterial hand wash · hands washed after every change'],[212,1,'Pocket hand sanitiser · clinic, church, outings'],[511,.17,'Season · June: warm hat and cardigan, next size'],[512,.34,'Season · Dec–Feb: talc-free prickly-heat powder'],[513,.34,'Season · rains: repellent stickers for clothes and cot']);
  if(st==='m6'||st==='tod')m.push([160,.5,'Plasters for little falls']);
  if(st==='m6')m.push([327,.5,'Bottle, cup and spoon cleanser'],[458,.5,'Baby mineral sunscreen SPF 50 · outdoors from 6 months'],[156,.34,'Soft baby toothbrush · from the first tooth, every 3 months'],[157,.5,'Fluoride toothpaste · a smear, twice a day']);
  if(st==='nb'){m.push([135,1,'Nursing pads ×30 · 1–2 a day'],[174,.5,'Intimate wash for the mother · after birth']);
   if(mi===0)m.push([176,6,'Month 1 · maternity pads ×60 for bleeding after birth (2–6 weeks)'],[340,1,'Lanolin nipple cream'],[470,1,'Cooling perineal pads'],[311,1,'Postnatal belly wrap (traditional “kufunga tumbo”, done safely)']);
   if(mi===1)m.push([176,2,'Month 2 · maternity pads ×20 for nights']);
   if(mi===0)s.push([126,1,'Flexible digital thermometer'],[127,1,'Nasal aspirator'],[329,1,'Saline nasal spray'],[142,1,'Baby nail clipper set'],[144,1,'Cord care kit · clean and dry'],[313,1,'Foldable baby bath tub'],[322,2,'Waterproof cot sheet ×2'],[505,1,'Portable baby net bed · sleeps under a net beside mama for 6 months'],[507,1,'Washing basin set · bath, laundry and nappy soaking kept apart'],[510,1,'Baby socks 0–6 months ×6'],[462,1,'Rain and mosquito cover for carrier or pram'],[348,1,'Nursing bras ×2'],[221,1,'Long-lasting net for the mother’s bed'],[147,1,'Waterproof changing mat'],[324,1,'Swaddle wrap'],...(o.nappy==='mix'?[[508,2,'Cloth nappy sets for daytime']]:[]))}
  if(st==='m3'){m.push([135,1,'Nursing pads ×30']);if(mi===0)s.push([334,1,'Silicone teether'],[150,1,'Ergonomic baby carrier'],[331,1,'Baby sleeping bag'],...(o.nappy==='mix'?[[508,1,'Cloth nappies, next size']]:[]))}
  if(st==='m6'){if(mi===0)s.push([140,1,'Silicone feeding spoons'],[335,1,'Sippy cup with handles'],[151,1,'Silicone bibs'],[504,1,'Foldable high chair'],[152,1,'Home baby-safety kit (corners, locks)'],[146,1,'Cot mosquito net · baby has outgrown the net bed'],[138,1,'Bath seat for sitting up'],[510,1,'Baby socks 6–12 months ×6'],...(o.nappy==='mix'?[[508,1,'Cloth nappies, size M–L']]:[]));if(mi===3)x.push([503,1,'Push walker · standing practice at about 9 months'])}
  if(st==='tod'){m.push([157,1,'Kids’ fluoride toothpaste · pea-size from age 3'],[156,.34,'Soft toothbrush · every 3 months'],[466,.5,'Clip-on hand sanitiser for the nursery bag'],[162,1,'Insect-repellent wristband · evening play'],[453,.5,'Kids’ SPF 50 roll-on · outdoor play']);if(mi===0)s.push([463,1,'Training potty'],[506,1,'Child-size long-lasting bed net'],[510,1,'Socks 1–2 years ×6'],[452,1,'Kids’ toothbrushes ×2 (age 3–8, for later)'])}
  if(o.pump==='yes'&&st!=='tod'){m.push([133,1,'Milk storage bags ×30'],[326,.25,'Bottle and teat brush set']);if(mi===0&&(st==='nb'||o._join))s.push([131,1,'Manual breast pump'])}
  a.push([17,1,'Digital baby scale'],[137,1,'Steam bottle steriliser'],[132,1,'Electric breast pump'],[415,1,'Baby video monitor with cry alert'],[16,1,'Wall height chart']);
  const svc={nb:['Free baby weight check every visit','WhatsApp Mama Club with a nurse every Thursday'],m3:['Free weight check and growth chart','Nurse Q&A in Mama Club'],m6:['Weaning guide in Kiswahili','Nurse Q&A in Mama Club'],tod:['Potty-training guide','Free growth check']}[st];
  return{m,s,x,a,svc}}},
/* 3 ---------------------------------------------------------------- SCHOOL CHILD */
{k:'shule',n:'Afya Shule',en:'School children, 4–12 years',g:'kids',age:'Child 4–12 years',img:'/_blob/e2cd281dbe2e6ad2fea904d3813d2cb0',card:'Afya Family',cad:'Monthly',
 who:'Parents of children aged 4 to 12, sized per child (1, 2 or 3 children), including grandparents who send grandchildren to school.',
 why:'School-age children in Dar face the same five risks every term: tooth decay, malaria and mosquito bites in the evening, sun on the walk and the playground, scrapes from play, and infections passed hand to hand. Each is cheap to prevent and expensive when it is not. Parents usually remember toothpaste and forget everything else until the school calls. The box covers the term without the list living in a mother’s head.',
 ev:[['NHS: children brush twice a day for about 2 minutes, with 1,000–1,500 ppm fluoride toothpaste (pea-size from 3 to 6; 1,350–1,500 ppm from 7), spit and do not rinse.','teeth'],['NHS: head lice are found with a fine-toothed detection comb; wet-combing on days 1, 5, 9 and 13 clears them without staying off school.','lice'],['WHO: sleeping under a long-lasting insecticidal net is the core protection against malaria; one net per child is a starter item.','itn'],['American Red Cross: a basic kit carries plasters, gauze, tape and gloves; the school pouch follows that list in a child size.','arc']],
 qty:'Per child: toothpaste 0.7 tube a month (a pea twice a day), a new toothbrush every 3 months, one clip-on sanitiser and one repellent wristband a month, half a roll-on SPF. Shared items (repellent lotion for evenings, plasters, hand wash) do not multiply by the number of children. A child-size net and water bottle per child are starter items.',
 stg:'The box changes by term, not by month: before each term the system asks what changed (new school, sport, a new size of poncho) and the rainy-season items (poncho, uniform stickers) appear only in March–May and October–December.',
 excl:[['Deworming tablets and any medicine','Given at school and clinic campaigns or sold through a licensed pharmacy counter.'],['Multivitamin gummies','Supplements only when a health worker advises them; available as an add-on on that advice.'],['Sugary “energy” drinks','Water with time markers instead; sugar drives tooth decay.']],
 ex:'Baraka and Amani, 6 and 9, go to school in Tabata. Their mother’s box brings two toothpastes, two clip-on sanitisers, two repellent wristbands and SPF roll-ons each month, with plasters and an evening repellent lotion for the house. In March the rain ponchos arrive. At the start of term the Afya Check station measures height, weight and eyesight for free.',
 safe:'Fever in a child in Dar is treated as possible malaria: the adviser refers to the clinic for a test the same day.',
 slots:[['Toothpaste',157],['SPF roll-on',453],['Hand sanitiser',466],['Repellent wristband',162]],
 opt:[{k:'kids',n:'Children',o:[['1','1 child'],['2','2 children'],['3','3 children']],d:'2'}],
 items(o){const n=+o.kids,m=[],s=[],a=[];
  m.push([157,n*.7,`Kids’ fluoride toothpaste · pea-size twice a day × ${n} child${n>1?'ren':''}`],[452,n*.17,'Kids’ toothbrushes ×2 · a new brush every 3 months'],[453,n*.5,'SPF 50 roll-on for the school day'],[466,n,'Clip-on hand sanitiser for the school bag'],[162,n,'Insect-repellent wristband · evenings'],[222,.5,'Insect-repellent lotion · evenings at home'],[160,.5,'Kids’ plasters'],[426,.5,'Hand wash · after school and before food'],[235,n*.34,'Lip balm with SPF · dry season and walking to school'],[364,.34,'Shea body lotion · dry skin after bathing'],[522,n*.17,'Season · rains: hooded rain poncho over the school bag'],[513,.34,'Season · rains: repellent stickers for uniforms']);
  s.push([161,1,'School first-aid pouch'],[456,1,'Fast children’s thermometer'],[158,1,'Head-lice detection comb'],[163,n,'Water bottle with time markers · one per child'],[506,n,'Long-lasting bed net · one per child'],[455,n,'Lunch box with water bottle set']);
  a.push([16,1,'Wall height chart'],[501,1,'Sonic electric toothbrush for kids'],[164,1,'Children’s multivitamin (only on health-worker advice)'],[102,1,'Arch-support insoles (flat feet)']);
  return{m,s,a,svc:['Free height, weight and eye-chart check every term','Term-start message: what changed before school opens']}}},
/* 4 ---------------------------------------------------------------- TEEN GIRL */
{k:'binti',n:'Afya Binti',en:'Teen girls, 13–19: periods, skin, school',g:'kids',age:'Teen girl 13–19',img:'/_blob/91dd116344cc8df9f71a9c33ddf59b38',card:'Afya Family',cad:'Monthly · arrives before the period',
 who:'Girls aged 13 to 19 at secondary school or college, and the parents or aunts who buy for them.',
 why:'In the teenage years three needs arrive together: periods, acne and body odour. Missing pads is the one that hurts most: girls stay home or improvise with cloth when money or shops fail at the wrong moment. Skin care is often the cheapest bleaching cream in the market, which can damage skin for life. The box arrives a few days before the period, in plain packaging, with gentle registered products that are safe for young skin.',
 ev:[['NHS: periods usually last 2 to 7 days; pads should be changed regularly and products chosen by flow. The box sizes pads to the flow the girl chooses.','per'],['NHS: for acne, wash twice a day with a gentle cleanser, do not scrub, and use non-comedogenic products.','acne'],['TBS banned over 100 cosmetic products in 2025 for harmful ingredients: only registered, safe products are used.','tbs'],['NHS: fluoride toothpaste 1,350–1,500 ppm twice a day from age 7, spit and do not rinse.','teeth']],
 qty:'Pads = days × changes: a regular flow uses about 20 day pads and 10 night pads (2 packs of 10 + 1 pack); light 10 + 10; heavy 30 + 20. Liners: one 40-pack. Cleanser: half a bottle (twice a day, a small amount). Deodorant, lip balm and toothpaste: one a month. Underwear: a new set of 3 every 4 months.',
 stg:'At 13–15 the box is pads, liners, hygiene and a gentle face routine. From about 16 the girl can choose the eco option (menstrual cup and reusable pads) and the oily-skin routine. The calendar card and WhatsApp reminders teach her to track her own cycle.',
 excl:[['Pain tablets','Medicines only through a licensed pharmacy counter; heat patches and a hot-water bottle are first-line comfort.'],['Skin-lightening creams','Never stocked: harmful and often banned.'],['Make-up','Not a health need; available in the store if the family wants it.']],
 ex:'Zawadi, 15, is in Form 2 in Temeke. Her aunt in Dodoma pays a 12-month plan. Three days before her period, a plain pouch arrives with pads for a regular flow, liners, intimate wipes for school, heat patches and her face wash. When she complained about pimples in Form 3, the adviser switched her cleanser to the oily-skin version and added pimple patches.',
 safe:'Periods that soak a pad every hour, last more than 7 days, stop for three months, or pain that keeps her from school: the adviser refers to the clinic.',
 slots:[['Day pads',350],['Liners',351],['Face cleanser',357],['Deodorant',376]],
 opt:[{k:'flow',n:'Flow',o:[['light','Light'],['reg','Regular'],['heavy','Heavy']],d:'reg'},{k:'type',n:'Style',o:[['pads','Pads'],['eco','Eco (cup + reusable)']],d:'pads'},{k:'skin',n:'Skin',o:[['norm','Normal'],['oily','Oily / acne-prone']],d:'norm'}],
 items(o){const f={light:1,reg:2,heavy:3}[o.flow],m=[],s=[],a=[];
  if(o.type==='pads')m.push([350,f,`Day pads ×${f*10} · ${f*10} for a ${o.flow==='light'?'light':o.flow==='reg'?'regular':'heavy'} flow`],[350,Math.ceil(f/2)+(f===3?1:0),`Night pads ×${(Math.ceil(f/2)+(f===3?1:0))*10}`],[518,.5,'Sanitary disposal bags']);
  m.push([351,1,'Panty liners ×40'],[354,1,'Intimate wipes ×20 · for school'],[172,1,'Period heat patches · cramps'],[519,.25,'Breathable cotton underwear ×3 · every 4 months'],[357,.5,`Gentle foaming cleanser · twice a day${o.skin==='oily'?', oil-control':''}`],[363,.34,'Invisible SPF 50 for dark skin · school walk, prevents dark marks'],[235,1,'Lip balm with SPF'],[376,1,'Roll-on deodorant'],[364,.5,'Shea body lotion'],[372,.34,'Natural hair moisturiser'],['n13',1,'Fluoride toothpaste 1,450 ppm · twice a day'],[439,.25,'Soft toothbrushes ×4 · one every 3 months'],[212,1,'Pocket hand sanitiser']);
  if(o.skin==='oily')m.push([236,1,'Acne pimple patches ×36'],[361,.34,'Niacinamide serum · oil and marks, from 16']);
  s.push([353,1,'Period underwear · back-up for heavy days and nights'],[114,1,'Hot-water bottle · cramps'],['n18',1,'Discreet school period pouch'],['n19',1,'Period calendar card (own brand)'],[374,1,'Satin bonnet and pillowcase · protects braids and edges'],[375,1,'Detangling brush']);
  if(o.type==='eco')s.push([170,1,'Menstrual cup · lasts years'],[171,1,'Reusable pads ×4']);
  a.push([355,1,'Mini TENS for period pain'],[253,1,'Blue-light screen glasses'],[163,1,'Water bottle with time markers']);
  return{m,s,a,svc:['Delivered 3 days before the next period (tracked on WhatsApp)','Plain packaging; parent and girl both get the reminder','Free skin advice with a trained adviser']}}},
/* 5 ---------------------------------------------------------------- TEEN BOY */
{k:'kijana',n:'Afya Kijana',en:'Teen boys, 13–19: skin, freshness, sport',g:'kids',age:'Teen boy 13–19',img:'/_blob/bf248ddb4135cbbb3d4ce571b6b249b1',card:'Afya Family',cad:'Monthly',
 who:'Boys aged 13 to 19 at secondary school, in sport or starting college, and the parents who buy for them.',
 why:'Teen boys are the forgotten group in health retail: they sweat more, get acne, play football in the heat and start shaving with whatever blade they find. Razor bumps and infected cuts are common. Nobody plans their hygiene. The box gives them a simple routine they can follow alone, plus the things sport needs: blister and scrape care, foot powder, a mouthguard.',
 ev:[['NHS: for acne, wash twice a day with a gentle cleanser, avoid scrubbing, choose non-comedogenic products.','acne'],['NHS: fluoride toothpaste 1,350–1,500 ppm twice a day from age 7.','teeth'],['American Red Cross: plasters, gauze and instant cold packs are basic kit items; sport is where teens use them.','arc']],
 qty:'Face wash: half a bottle (twice a day). Deodorant and toothpaste: one a month. Body wash: 0.7 bottle (daily). Foot powder: half a tin. Shaving (from about 16): 5 disposable razors every 2 months, gel every 3 months. Sport add-ons only if he plays.',
 stg:'13–15: freshness, face and teeth. From about 16: the shaving option and a razor-bump serum. The sport option adds a mouthguard, ankle sleeve and cold packs at the start of each season.',
 excl:[['Protein powders and supplements','Not for teenagers without medical advice.'],['Bleaching or steroid creams','Never stocked.'],['Energy drinks','Not a health product.']],
 ex:'Juma, 16, plays for his school team in Kinondoni. His box brings an oil-control face wash, roll-on, 3-in-1 body wash, foot powder and razors with gel. After his first season a sprained ankle taught the family the value of the instant cold packs and the ankle sleeve in his starter set.',
 safe:'A sport head injury, a swollen joint that cannot bear weight, or an infected cut: the adviser refers to the clinic.',
 slots:[['Face wash',384],['Deodorant',391],['Body wash',393]],
 opt:[{k:'shave',n:'Shaving',o:[['no','Not yet'],['yes','Yes (about 16+)']],d:'no'},{k:'sport',n:'Plays sport',o:[['yes','Yes'],['no','No']],d:'yes'},{k:'skin',n:'Skin',o:[['norm','Normal'],['oily','Oily / acne-prone']],d:'norm'}],
 items(o){const m=[],s=[],a=[];
  m.push([384,.5,'Oil-control face wash · twice a day'],[391,1,'Roll-on deodorant'],[393,.7,'3-in-1 body wash · daily'],[394,.34,'Anti-dandruff shampoo'],[392,.5,'Antifungal foot powder · football boots and school shoes'],[235,.5,'Lip balm with SPF'],[472,.34,'Daily face moisturiser SPF 30'],['n13',1,'Fluoride toothpaste 1,450 ppm'],[439,.25,'Soft toothbrushes ×4 · one every 3 months'],[212,1,'Pocket hand sanitiser'],[222,.5,'Insect-repellent lotion · evening football'],[194,.25,'Plasters ×100 · scrapes'],[203,.25,'Blister plasters · new boots']);
  if(o.skin==='oily')m.push([236,1,'Acne pimple patches ×36']);
  if(o.shave==='yes')m.push(['n14',.5,'Disposable razors ×5 · every 2 months'],[385,.34,'Shaving gel for sensitive skin'],[390,.34,'Razor-bump serum']);
  if(o.sport==='yes')m.push([115,1,'Instant ice pack · first aid for knocks and sprains']);
  s.push([163,1,'Water bottle with time markers'],[225,1,'Nail clipper set']);
  if(o.sport==='yes')s.push([278,1,'Sports mouthguard'],[90,1,'Ankle support sleeve'],[113,1,'Reusable hot/cold gel pack']);
  a.push([228,1,'Hair clipper'],[274,1,'Sports knee pads'],[155,1,'Electric toothbrush']);
  return{m,s,a,svc:['Free BP, weight and BMI check every term','Sport first-aid tips on WhatsApp']}}},
/* 6 ---------------------------------------------------------------- ADULT WOMAN */
{k:'glow',n:'Afya Glow',en:'Women 20–59: skin, hair, intimate care',g:'adult',age:'Adult woman 20–59',img:'/_blob/1cc07786a0e0ac3fcda20042a8d9999a',card:'Afya Green',cad:'Monthly',
 who:'Women from their twenties to their fifties who care about skin, hair and feeling fresh every day, and want safe products chosen for brown and dark skin.',
 why:'Daily care is where unsafe products do the most damage: bleaching creams, unknown imports and harsh soaps. Sunscreen is rarely used in Dar, yet dark marks from the sun and from acne are the most common skin worry. The box builds a simple, dermatologist-style routine (cleanse, treat, moisturise, protect) with registered products, adds intimate and breast-health habits, and refills before anything runs out.',
 ev:[['TBS banned over 100 cosmetic products in 2025 because of harmful ingredients: the box uses registered products only.','tbs'],['NHS: wash twice a day with a gentle cleanser and use non-comedogenic products to prevent breakouts.','acne'],['NHS 111 Wales: periods and how to manage them; the period option sizes pads to flow.','per']],
 qty:'Cleanser lasts two months (½ a month); sunscreen one a month (every morning); serums 0.7 a month (a few drops daily); body lotion one a month; cotton pads every two months. Period option: 20 day pads, 10 night pads and 40 liners for a regular flow.',
 stg:'Three levels (Essential, Signature, Luxe) and three skin types change the products, not the habits. The family-planning option adds ovulation and pregnancy tests; when she becomes pregnant she moves to Mama Mjamzito.',
 excl:[['Skin-lightening, hydroquinone or steroid creams','Harmful and often banned; never stocked.'],['Contraceptive pills','Medicines only through a licensed pharmacy counter or clinic.'],['Supplements “for glow”','Only on health-worker advice.']],
 ex:'Asha, 31, a bank officer in Kariakoo, starts on Signature with oily skin. Her first box brings a gentle cleanser, niacinamide serum, invisible SPF 50, body lotion, intimate wash and the surprise of the month. The breast self-exam card goes in the shower; a WhatsApp reminder comes every month.',
 safe:'A breast lump, bleeding between periods, or a skin patch that changes: the adviser refers to the clinic.',
 slots:[['Cleanser',357],['Sunscreen',363],['Body lotion',364],['Serum',361]],
 opt:[{k:'tier',n:'Level',o:[['ess','Essential'],['sig','Signature'],['lux','Luxe']],d:'sig'},{k:'skin',n:'Skin type',o:[['norm','Normal'],['oily','Oily / acne-prone'],['dry','Dry / sensitive']],d:'norm'},{k:'per',n:'Period care',o:[['no','No'],['pads','Pads'],['eco','Eco cup']],d:'no'},{k:'fam',n:'Planning a baby?',o:[['no','No'],['yes','Add ovulation & pregnancy tests']],d:'no'}],
 items(o){const surprise=[366,381,482,379,378,476,480,483][new Date().getMonth()%8];const m=[[357,.5,`Gentle cleanser (${{norm:'normal',oily:'oily',dry:'dry/sensitive'}[o.skin]} skin) · lasts 2 months`],[363,1,'Invisible SPF 50 · every morning'],[364,1,'Shea body lotion 400 ml'],[376,1,'Roll-on deodorant'],[369,.5,'Cotton pads ×120 · every 2 months']],s=[],a=[];
  if(o.tier!=='ess')m.push([362,.7,o.skin==='dry'?'Hyaluronic cream':'Hyaluronic gel moisturiser'],[o.skin==='oily'?361:360,.7,o.skin==='oily'?'Niacinamide serum · oil and pores':'Vitamin C serum · dark spots'],[367,1,'Sheet masks ×5'],[380,.34,'Lip care trio'],[surprise,1,'Surprise of the month: '+it(surprise)[0]]);
  m.push([174,.5,'pH-balanced intimate wash'],[378,.5,'Hand cream'],[519,.25,'Breathable cotton underwear ×3 · every 4 months'],[521,.34,'Season · Dec–Feb: anti-chafing balm'],[226,.17,'Foot file · every 6 months'],['n13',1,'Fluoride toothpaste'],[439,.25,'Soft toothbrushes ×4 · one every 3 months'],[222,.5,'Insect-repellent lotion']);
  if(o.tier!=='ess')m.push([365,.5,'Moisturising body wash'],[359,.5,'Hydrating toner'],[520,.5,'Leave-in conditioner and edge care · natural hair and braids'],[379,.34,'Fragrance body mist']);
  if(o.per==='pads')m.push([350,2,'Period · day pads ×20'],[350,1,'Period · night pads ×10'],[351,1,'Panty liners ×40'],[172,1,'Heat patches for cramps'],[518,.5,'Sanitary disposal bags']);
  if(o.per==='eco')m.push([351,1,'Panty liners'],[172,1,'Heat patches']);
  if(o.fam==='yes')m.push([169,10,'Ovulation tests ×10'],[168,2,'Pregnancy tests ×2']);
  if(o.skin==='oily')m.push([236,1,'Acne pimple patches ×36']);
  if(o.tier==='lux')m.push([483,.5,'Wig and braid care spray'],[372,1,'Natural hair moisturiser'],[373,.5,'Scalp oil'],[478,.5,'Retinol night cream'],[479,.5,'Dark spot corrector']);
  s.push([517,1,'Breast self-exam shower card · monthly 5-step check']);if(o.per==='eco')s.push([170,1,'Menstrual cup (lasts years)']);if(o.tier!=='ess')s.push([375,1,'Detangling brush']);if(o.tier==='lux')s.push([377,1,'Nail care kit'],[370,1,'Welcome gift: jade roller and gua sha'],[374,1,'Satin bonnet and pillowcase']);if(o.tier==='sig')s.push([374,1,'Welcome gift: satin bonnet and pillowcase']);
  a.push([382,1,'Electric facial cleansing brush'],[173,1,'Pelvic floor trainer'],[371,1,'LED light therapy mask']);
  return{m,s,a,svc:['Free skin consultation with a trained adviser','Monthly breast self-check reminder and a free BP and BMI check','Swap any product you don’t love next month']}}},
/* 7 ---------------------------------------------------------------- PERIOD */
{k:'siku',n:'Afya Siku',en:'Period care, on time every cycle',g:'adult',age:'Girls and women 13–50',img:'/_blob/890416e89835e1e933712a2dea1cf31c',card:'Afya Green',cad:'Every cycle · 3 days early',
 who:'Any girl or woman who wants period care only, delivered a few days before her cycle; often bought as an add-on to another box.',
 why:'Running out of pads is a small problem with large consequences: missed school or work, unsafe cloth, an urgent trip at night. A focused period box solves exactly that, with nothing extra, sized to the flow and timed to the cycle.',
 ev:[['NHS 111 Wales: a period lasts 2 to 7 days; pads changed regularly; heavy bleeding needs a doctor.','per']],
 qty:'Day pads 10 × flow level (10, 20, 30), night pads 10 × half that rounded up, one pack of 40 liners, intimate wipes for school or work, heat patches, intimate wash every 3 months. Eco: a cup and reusable pads once, then only liners and comfort items.',
 stg:'The flow and style can change any month in the swap window; the delivery date follows the cycle logged on WhatsApp.',
 excl:[['Pain tablets','Medicines through a licensed pharmacy counter only.'],['Scented sprays for intimate areas','Can irritate; a pH-balanced wash is used instead.']],
 ex:'Mariam, 24, a nurse in Mwananyamala on night shifts, logs her cycle on WhatsApp; her pads arrive three days before, at her hostel.',
 safe:'Soaking a pad every hour, periods over 7 days or severe pain: clinic.',
 slots:[['Day pads',350],['Liners',351],['Intimate wipes',354]],
 opt:[{k:'type',n:'Style',o:[['pads','Pads'],['eco','Eco (cup + reusable)']],d:'pads'},{k:'flow',n:'Flow',o:[['light','Light'],['reg','Regular'],['heavy','Heavy']],d:'reg'}],
 items(o){const f={light:1,reg:2,heavy:3}[o.flow];
  if(o.type==='eco')return{m:[[351,1,'Panty liners ×40'],[354,1,'Intimate wipes'],[172,1,'Heat patches for cramps'],[174,.5,'Intimate wash'],[519,.25,'Breathable cotton underwear ×3 · every 4 months']],s:[[170,1,'Menstrual cup (lasts years)'],[171,1,'Reusable pads ×4'],[114,1,'Hot-water bottle']],a:[[355,1,'Mini TENS for period pain']],svc:['Period-tracker reminders on WhatsApp']};
  return{m:[[350,f,`Day pads ×${f*10}`],[350,Math.ceil(f/2),`Night pads ×${Math.ceil(f/2)*10}`],[351,1,'Panty liners ×40'],[354,1,'Intimate wipes · school or work'],[172,1,'Heat patches for cramps'],[174,.34,'pH-balanced intimate wash'],[518,.5,'Sanitary disposal bags'],[519,.25,'Breathable cotton underwear ×3 · every 4 months']],s:[[517,1,'Breast self-exam card'],[353,1,'Period underwear · heavy days and nights'],[114,1,'Hot-water bottle']],a:[[355,1,'Mini TENS for period pain'],[352,1,'Organic cotton tampons']],svc:['Delivered 3 days before your next period (tracked on WhatsApp)','Discreet packaging']}}},
/* 8 ---------------------------------------------------------------- ADULT MAN */
{k:'man',n:'Afya Men',en:'Men 20–59: shave, skin, freshness',g:'adult',age:'Adult man 20–59',img:'/_blob/395cb0963d3d1896edacec1f249b3e00',card:'Afya Green',cad:'Monthly',
 who:'Men from their twenties to their fifties: office workers, drivers, traders, students; often bought by a wife or sister.',
 why:'Men in Tanzania rarely shop for health, and rarely check their blood pressure. Curly beard hair causes razor bumps; long hot days cause odour and fungal feet. A monthly box gets the basics right and brings men to the free Afya Check each month, where silent high blood pressure is found early.',
 ev:[['WHO STEPS Tanzania: about 1 in 4 adults aged 25–64 had high blood pressure, and few knew it. The box includes a free BP and BMI check every month.','who'],['NHS: wash twice a day with a gentle cleanser; non-comedogenic products help skin prone to breakouts.','acne']],
 qty:'Face wash every 2 months; deodorant monthly; body wash 0.7 a month; cartridges 4 every 2 months; toothbrush every 3 months.',
 stg:'Two levels and two shaving styles (razor or clipper and beard). From 40, the adviser suggests adding the Presha or Sugar box after an Afya Check reading.',
 excl:[['Sexual-performance pills and supplements','Medicines only through a licensed pharmacy counter on a doctor’s advice; supplements only on health-worker advice.'],['Bleaching creams','Never stocked.']],
 ex:'Hamisi, 42, a taxi driver in Ubungo, gets his razor cartridges, gel, foot powder and roll-on each month. At his third free Afya Check his BP reading was high twice; the adviser referred him to a clinic and his wife added the Presha box.',
 safe:'A high BP reading twice, or chest pain: clinic or emergency care.',
 slots:[['Face wash',384],['Deodorant',391],['Body wash',393],['Shaving',386]],
 opt:[{k:'tier',n:'Level',o:[['ess','Essential'],['sig','Signature']],d:'sig'},{k:'shave',n:'Shaving',o:[['razor','Razor'],['clip','Clipper / beard']],d:'razor'}],
 items(o){const m=[[384,.5,'Oil-control face wash'],[391,1,'Roll-on deodorant'],[393,.7,'3-in-1 body wash'],[394,.5,'Anti-dandruff shampoo'],[439,.25,'Soft toothbrushes ×4 · one every 3 months'],['n13',1,'Fluoride toothpaste'],[235,.5,'Lip balm with SPF']],s=[],a=[];
  if(o.shave==='razor')m.push([385,.5,'Shaving gel'],[386,.5,'5-blade cartridges · 4 every 2 months']);else m.push([389,.5,'Beard oil'],[395,.34,'Clipper oil and guards']);
  if(o.tier==='sig')m.push([388,.5,'Aftershave balm'],[390,.5,'Razor-bump serum'],[392,.5,'Antifungal foot powder'],[472,.5,'Daily SPF moisturiser'],[440,.5,'Alcohol-free mouthwash'],[475,.5,'Men’s intimate wash']);
  s.push([14,1,'Waist tape · track waist size at home']);if(o.tier==='sig')s.push([397,1,'Welcome gift: grooming bag'],[396,1,'Nose and ear trimmer']);
  a.push([228,1,'Hair clipper'],[1,1,'Upper-arm BP monitor'],[271,1,'Smart watch (heart rate)']);
  return{m,s,a,svc:['Free BP and BMI check every month']}}},
/* 9 ---------------------------------------------------------------- HOUSEHOLD */
{k:'home',n:'Afya Home',en:'Family hygiene for the whole household',g:'home',age:'Every household',img:'/_blob/57ee118cad2a419bfd2786b5235ebc6f',card:'Afya Family',cad:'Monthly',
 who:'Families and shared homes of 1–2, 3–5 or 6+ people; the base box most households keep alongside a life-stage box.',
 why:'Cholera, diarrhoea and malaria still follow the rainy seasons in Dar. Most of the protection is simple and cheap: hand washing with soap, safe drinking water, clean toilets and a net on every bed. Small bottles bought daily cost far more than refill sizes. The box brings the household hygiene list in refill sizes, scaled to the number of people, with nets and a first-aid kit at the start.',
 ev:[['WHO: a long-lasting insecticidal net on every sleeping space is the core malaria protection; nets for every bed are starter items.','itn'],['American Red Cross: every home should have a basic first-aid kit; the family kit is a starter item.','arc'],['NHS: family fluoride toothpaste of 1,350–1,500 ppm, twice a day.','teeth']],
 qty:'All quantities scale by household: ×0.6 for 1–2 people, ×1 for 3–5, ×1.5 for 6+. Base (3–5 people): one refill of hand wash, one disinfectant, two toilet gels, four soap bars, one antiseptic rinse, toothpaste 2 tubes, water tablets one pack. Nets: 1, 2 or 3 at the start.',
 stg:'The box auto-adjusts each month if the family ran out early or has stock left; repellent appears in the rains, anti-mould spray after them.',
 excl:[['Bleach-based cleaners mixed with acids','Dangerous combinations are not sold together; labels in Kiswahili.'],['Insecticide sprays for indoor use','Nets and plug-ins are safer for children.']],
 ex:'The Mushi family of five in Kimara gets two toilet gels, a hand-wash refill, four soap bars, disinfectant, water tablets and toothpaste every month, and three nets with a first-aid kit in the first box. In April the repellent lotion arrives with the rains.',
 safe:'Watery diarrhoea in the house during an outbreak: the adviser explains ORS from the pharmacy counter and refers to the clinic.',
 slots:[['Hand wash',426],['Disinfectant',429],['Toilet gel',428],['Soap bars',216]],
 opt:[{k:'size',n:'Household',o:[['2','1–2 people'],['4','3–5 people'],['6','6+ people']],d:'4'}],
 items(o){const f={2:.6,4:1,6:1.5}[o.size];const q=x=>+(x*f).toFixed(2);
  return{m:[[426,q(1),'Antibacterial hand wash (refill)'],[429,q(1),'Multi-surface disinfectant cleaner'],[428,q(2),'Toilet cleaner gel'],[427,q(1),'Antiseptic laundry rinse'],[430,q(.5),'Kitchen wipes'],[433,q(.7),'Mosquito plug-in refill'],[211,q(.5),'Hand sanitiser 500 ml'],[434,.17,'First-aid refill · every 6 months'],[223,q(1),'Water purification tablets · safe drinking water, cholera protection'],[493,q(.34),'Floor disinfectant concentrate'],[216,q(4),'Antibacterial soap bars'],[431,.17,'Microfibre cloths · every 6 months'],['n13',q(2),'Family fluoride toothpaste 1,450 ppm'],[439,q(.34),'Soft toothbrushes ×4 · each person every 3 months'],[222,q(.34),'Season · rains: insect-repellent lotion']],
   s:[[190,1,'Home first-aid kit'],[433,1,'Mosquito plug-in device'],[7,1,'Digital thermometer for the family'],[221,{2:1,4:2,6:3}[o.size],'Long-lasting mosquito nets for every bed'],[432,1,'Pedal waste bin with lid']],
   a:[[494,1,'Bathroom anti-mould spray · after the rains'],[224,1,'Ceramic home water filter'],[219,1,'Automatic soap dispenser'],[218,1,'UV-C steriliser box']],svc:['Auto-adjusts each month if you ran out early or have stock left']}}},
/* 10 ---------------------------------------------------------------- SENIOR */
{k:'senior',n:'Bibi na Babu',en:'Older adults 60+, three care levels',g:'care',age:'Older adult 60+',img:'/_blob/e36714cb56fb3fb0d10521d7a44bb352',card:'Afya Senior',cad:'Monthly · with a home visit',
 who:'Older parents at home and the adult children who care for them, in Dar or abroad; three care levels from independent to mostly in bed.',
 why:'Tanzania has about 3.5 million people aged 60 or over, most cared for at home by family. The real risks are falls, skin breakdown, continence, missed pills and loneliness, and the carer is often a daughter or granddaughter with a job. The box brings dignity supplies sized to the care level and a monthly home visit with BP, sugar, weight and a safety check, reported to the family.',
 ev:[['WHO: about 28–35% of people aged 65 and over fall each year, rising to 32–42% over 70. Grab bar, non-slip mat, night light and grip socks are in the box for that reason.','falls'],['NHS: people who have difficulty moving are at higher risk of pressure ulcers; check skin daily, change position, use pressure-relieving cushions and mattresses.','pu'],['Welsh Government continence consensus: products are matched to assessed need and pattern (day, night); the box sizes pads by the care level the family chooses.','wales'],['NBS 2022 census: 3.49 million Tanzanians are aged 60 or over.','nbs']],
 qty:'Adult diapers: none (independent), 1 a night ≈ 30 a month (needs help), about 4 a day ≈ 120 a month (mostly in bed), in packs of 10. Underpads: 1 or 3 packs. Wipes 2 packs of 48. Grip socks every 3 months. Seasonal items as fractions (blanket once a year).',
 stg:'Care levels change the box, not the person’s dignity: Independent (falls prevention, teeth, skin), Needs help (night continence, barrier cream, underpads), Mostly in bed (day-and-night continence, bed bath, no-rinse shampoo, pressure-relief cushion, heel protectors). The visiting adviser suggests a level change; the family approves it on WhatsApp.',
 excl:[['Prescription medicines','Stay with the doctor and a licensed pharmacy; the box brings the organiser and reminders.'],['Hospital beds and wheelchairs','Rented, not boxed (see 3.7).'],['Sleeping tablets or sedatives','Never sold outside a prescription.']],
 ex:'Bibi Mwanaidi, 78, lives in Tandika; her grandson works in Birmingham. He pays a 12-month plan from abroad. Each month her box brings night pull-ups, barrier cream, wipes, grip socks and the joint oil she likes. The adviser visits, checks her BP and sugar, fixes a loose mat, and the family gets a photo report on WhatsApp.',
 safe:'A fall with pain, confusion, a red patch that does not fade, or very high BP: the adviser calls the family and refers to the clinic.',
 slots:[['Adult diapers',54],['Wipes',445],['Barrier cream',446],['Skin cream',234]],
 opt:[{k:'level',n:'Care level',o:[['ind','Independent'],['help','Needs help (night)'],['bed','Mostly in bed']],d:'help'},{k:'teeth',n:'Teeth',o:[['own','Own teeth'],['dent','Dentures']],d:'own'},{k:'dias',n:'Paid from',o:[['local','Tanzania'],['abroad','Abroad (photo report)']],d:'local'}],
 items(o){const n={ind:0,help:3,bed:12}[o.level];const m=[[445,2,'Extra-large adult wipes ×96'],[234,.5,'Emollient for dry skin'],[65,1,'Body cleansing wipes'],[448,.34,'Non-slip grip socks · every 3 months'],o.teeth==='dent'?[242,.5,'Denture box and cleaning tablets']:[244,1,'Sensitive toothpaste'],[439,.25,'Soft toothbrush · every 3 months'],[516,.5,'Warming joint massage oil'],[509,.25,'Reusable cotton washcloths'],[515,.25,'Season · June–Aug: warm non-slip bed socks'],[514,.08,'Season · June: warm fleece blanket (once a year)'],[222,.34,'Season · rains: insect-repellent lotion'],[178,.08,'Season · Dec–Feb: rechargeable hand fan'],['n1',.25,'AA batteries ×4 · night light and thermometer'],[235,.5,'Lip balm']],s=[],a=[];
  if(n)m.unshift([54,n,`Adult diapers ×${n*10} (${o.level==='bed'?'about 4 a day':'1 a night'})`],[446,.5,'Barrier cream · skin protection'],[55,o.level==='bed'?3:1,'Bed underpads ×'+(o.level==='bed'?30:10)]);
  if(o.level!=='ind')m.push([285,.25,'Washable incontinence pants · rotated every 4 months']);
  if(o.level==='bed')m.push([451,1,'Disposable bed-bath kit'],[64,2,'No-rinse shampoo caps'],[288,.5,'Adult waterproof bib'],[205,.25,'Disposable gloves for the carer']);
  s.push([66,1,'Weekly pill organiser'],[450,1,'Large-print medication chart'],[79,1,'Motion-sensor night light · night toilet trips'],[47,1,'Suction grab bar for the bathroom'],[49,1,'Non-slip bath mat'],[77,1,'Reading glasses (strength checked at the first visit)'],[221,1,'Long-lasting mosquito net'],[507,1,'Washing basin set'],[225,1,'Nail clipper set']);
  if(o.level==='bed')s.push([447,1,'Pressure-relief gel cushion'],[286,1,'Heel protector boots'],[53,1,'Waterproof mattress protector'],[56,1,'Bedpan'],[61,1,'Wedge pillow · changing position']);
  a.push([27,1,'Adjustable walking stick'],[45,1,'Shower chair'],[63,1,'Big-button phone'],[251,1,'Personal sound amplifier'],[289,1,'SOS button with GPS']);
  return{m,s,a,fee:o.dias==='abroad'?35000:15000,svc:['Monthly home visit: BP, sugar, weight and a safety check by Afya staff','Pill reminders on WhatsApp',...(o.dias==='abroad'?['Monthly photo and health report to the family abroad; emergency delivery within 3 hours']:[])]}}},
/* 11 ---------------------------------------------------------------- DIABETES */
{k:'sugar',n:'Sukari Care',en:'Living with diabetes',g:'cond',age:'Adults with diabetes',img:'/_blob/7f00075e6b0698bc45ab0380a7855f63',card:'Afya Care',cad:'Monthly',
 who:'People living with type 1 or type 2 diabetes, and the family member who manages the readings and the foot checks.',
 why:'About 2.9 million Tanzanian adults live with diabetes. The supplies are expensive and they run out unevenly: strips that do not fit the meter, lancets forgotten, a hypo with nothing sweet at hand. Feet are the silent danger: a small wound on a numb foot can lead to amputation. The box keeps strips and lancets matched to the meter and the testing plan, and builds the daily foot check into the routine.',
 ev:[['IDF Diabetes Atlas: about 2.9 million adults in Tanzania live with diabetes (2024).','idf'],['NICE NG17 (type 1): test at least 4 times a day; the 4-a-day option exists for people on insulin. Type 2 testing is set by the clinic.','nice'],['IWGDF 2023: inspect feet daily, wear suitable socks and shoes, moisturise dry skin (not between the toes) and check sensation yearly.','iwgdf'],['NHS: treat a hypo (below 4 mmol/L) with fast sugar such as 5 glucose tablets and recheck after 10–15 minutes.','hypo']],
 qty:'Strips = tests per day × 30 ÷ 50 per pack (2 a day = 60 strips = 1.2 packs). Lancets = tests × 30 ÷ 100. Pen needles = injections × 30 ÷ 100. Foot cream half a tube; socks a pair every 3 months; control solution every 3 months; glucose tablets half a pack (refilled when used).',
 stg:'The testing frequency is set by the clinic and changed in the swap window. Starting insulin adds pen needles, a sharps bin and a cooling pouch for Dar heat. A glucometer is free on 6- and 12-month plans.',
 excl:[['Insulin and diabetes tablets','Prescription medicines: through the clinic or a licensed pharmacy counter only.'],['“Diabetes cure” herbal products','Unproven; never stocked.'],['Sugar-free sweets as “treatment”','Food, not care.']],
 ex:'Mzee Saidi, 58, in Temeke, tests twice a day. His daughter set up a 6-month Gold plan: the glucometer came free, and each month 60 strips, 60 lancets, foot cream and glucose tablets arrive. The adviser checks his feet with the monofilament at the monthly visit.',
 safe:'Two readings above the clinic’s target, a hypo that does not recover, or any foot wound: the adviser calls and refers the same day.',
 slots:[['Test strips',19],['Lancets',20],['Foot cream',25],['Diabetic socks',23]],
 opt:[{k:'tests',n:'Sugar tests a day',o:[['1','1 a day'],['2','2 a day'],['4','4 a day (insulin)']],d:'2'},{k:'ins',n:'Insulin pen',o:[['no','No'],['yes','Yes, 2 injections a day']],d:'no'}],
 items(o){const t=+o.tests;const m=[[19,+(t*30/50).toFixed(2),`Test strips · ${t} a day × 30 = ${t*30} a month`],[20,+(t*30/100).toFixed(2),`Lancets · ${t*30} a month`],[25,.5,'Diabetic foot cream · daily, not between toes'],[23,.34,'Diabetic socks · a pair every 3 months'],[297,.5,'Glucose tablets for lows'],[443,.34,'Control solution · every 3 months'],[296,.34,'Readings logbook'],[426,.5,'Hand wash · clean hands before every finger-prick'],['n1',.17,'AA batteries for the meter']],s=[],a=[];
  if(o.ins==='yes')m.push([442,.6,'Pen needles ×60'],[24,.17,'Sharps container · replaced every 6 months']);
  s.push([18,1,'Glucometer kit (free on 6- and 12-month plans)'],[24,1,'Sharps container'],[26,1,'Foot sensation tester (monofilament)'],[225,1,'Nail clipper set · cut straight across'],[49,1,'Non-slip bath mat']);
  if(o.ins==='yes')s.push([22,1,'Insulin cooling pouch · Dar heat'],[290,1,'Medical alert ID bracelet']);
  a.push([485,1,'Bluetooth glucose meter'],[12,1,'Bathroom scale'],[270,1,'Step counter']);
  return{m,s,a,free:[18],svc:['Free monthly 15-measurement Afya Check','We call if readings shared on WhatsApp are high or low']}}},
/* 12 ---------------------------------------------------------------- BLOOD PRESSURE */
{k:'presha',n:'Presha Care',en:'Blood pressure and heart',g:'cond',age:'Adults with high BP',img:'/_blob/2af55184a7081eaaf103b589c13080b9',card:'Afya Care',cad:'Monthly · with a monthly report',
 who:'Adults with high blood pressure, or found high twice at the free Afya Check and confirmed by a clinic.',
 why:'High blood pressure is silent and common: about 1 in 4 Tanzanian adults aged 25–64, most of them unaware. Treatment works only if readings are taken and pills are not missed. The box puts a validated monitor in the home (free on longer plans), a logbook the clinic can read in seconds, a pill organiser, salt reduction, and a monthly 15-measurement Afya Check report with a reminder every week.',
 ev:[['WHO STEPS Tanzania: 25.7% of adults 25–64 had raised blood pressure; only 17.6% of them knew.','who'],['ISH 2020: home BP monitoring with a validated upper-arm device is recommended to confirm and follow treatment.','ish'],['WHO: reduce salt to under 5 g a day; a low-sodium alternative helps cooking taste without the salt.','salt']],
 qty:'Consumables are small, so the box is priced low and the value is the device and the service: logbook every 3 months, salt alternative one jar a month, organiser replaced every 6 months, batteries every 4 months. The monthly report and the yearly cuff are paid through a service fee of TSh 12,000.',
 stg:'Month 1 brings the monitor, scale, waist tape and organiser. If the reading stays high, the adviser refers to the clinic; diabetes found at the full check adds Sukari Care.',
 excl:[['Blood-pressure tablets','Prescription medicines: clinic or licensed pharmacy counter only.'],['“Natural BP cures”','Unproven; never stocked.']],
 ex:'Mama Joyce, 55, in Ilala, was found at 162/98 twice at the free Afya Check. The clinic started treatment; her son set up Presha Care on 6 months. The monitor came free; each Sunday WhatsApp reminds her to measure and send the reading; the monthly report goes to her doctor.',
 safe:'A reading of 180/120 or more, chest pain, weakness on one side or severe headache: emergency care now.',
 slots:[['Salt alternative',489]],
 opt:[{k:'mon',n:'Monitor',o:[['std','Standard upper-arm'],['talk','Talking (Kiswahili)']],d:'std'}],
 items(o){return{m:[[296,.34,'BP logbook'],[489,1,'Low-sodium salt alternative · one jar a month'],[66,.17,'Pill organiser replacement · every 6 months'],['n1',.25,'AA batteries ×4 · monitor, every 4 months'],[14,.08,'Waist tape · yearly']],s:[[o.mon==='talk'?2:1,1,'BP monitor (free on 6- and 12-month plans, yours to keep)'],[66,1,'Weekly pill organiser'],[12,1,'Bathroom scale · every 5 kg lost lowers BP'],[14,1,'Waist tape'],[270,1,'Step counter · 30 minutes’ walking most days']],a:[[5,1,'Bluetooth BP monitor with app'],[408,1,'Handheld ECG monitor'],[104,1,'Compression stockings (if advised)']],free:[1,2],fee:12000,svc:['Monthly 15-measurement Afya Check report','Weekly WhatsApp reminder to measure and send your reading','Replacement cuff every 12 months']}}},
/* 13 ---------------------------------------------------------------- KIDNEY */
{k:'kidney',n:'Figo Care',en:'Kidney and dialysis support',g:'cond',age:'Adults on dialysis',img:'/_blob/60c52901b830b472815281db3ceaafe0',card:'Afya Care',cad:'Monthly · timed to sessions',
 who:'People on haemodialysis or peritoneal dialysis and their carers.',
 why:'Life on dialysis is a weekly timetable of sessions, fluid limits and skin problems. Between sessions the patient must weigh daily, measure every drink, protect the fistula or catheter and live with itchy dry skin. Hospitals provide the treatment; families improvise the rest. This box brings exactly those in-between supplies, timed to the session schedule.',
 ev:[['Royal Free London NHS: kidney patients manage fluid by measuring drinks and weighing daily; sugar-free sweets and ice help thirst.','rf'],['Royal Berkshire NHS: protect the fistula arm, no tight sleeves or BP cuffs on it, check the thrill daily.','rb'],['Kidney Care UK: itching is common in CKD; fragrance-free moisturisers help.','kcuk']],
 qty:'Itch moisturiser one bottle a month (twice a day); sugar-free mints one tub; gloves and masks half a box; catheter dressings 10 a month (about 3 a week at sessions) for catheter access.',
 stg:'The access type changes the box: fistula (protection sleeve), catheter (sterile dressings and chlorhexidine wipes), peritoneal at home (PD hygiene kit). Diet guide and weighing scale arrive at the start.',
 excl:[['Any medicine, potassium-containing salt substitutes','Normal salt alternatives often contain potassium, which is dangerous in kidney failure; only the renal-safe version is used.'],['Dialysis consumables (lines, fluids)','Provided by the renal unit.']],
 ex:'Mr Kassim, 61, in Mwananyamala, has dialysis three times a week. His box arrives the day after his Monday session: itch-relief cream, mints, gloves, a weekly log, and dressings for his catheter. The scale and measured bottle help him keep his fluid gain down between sessions.',
 safe:'A fistula without a thrill, fever with a catheter, breathlessness or swelling: the renal unit at once.',
 slots:[['Itch moisturiser',402],['Mints',405]],
 opt:[{k:'access',n:'Access',o:[['fist','Fistula'],['cath','Catheter'],['pd','Peritoneal (at home)']],d:'fist'}],
 items(o){const m=[[402,1,'Fragrance-free itch-relief moisturiser'],[211,1,'Hand sanitiser'],[205,.5,'Gloves'],[213,.5,'Surgical masks'],[235,1,'Lip balm for dry lips'],[405,1,'Sugar-free mints for thirst'],[406,.5,'BP and weight log'],[489,.5,'Low-sodium salt alternative (renal-safe, no potassium)'],[440,.5,'Alcohol-free mouthwash · dry mouth']],s=[],a=[];
  if(o.access==='cath')m.push([400,1,'Sterile catheter-site dressings ×10'],[401,1,'Chlorhexidine wipes ×50']);
  if(o.access==='pd')m.push([491,1,'Home PD hygiene kit'],[401,1,'Chlorhexidine wipes']);
  if(o.access==='fist')s.push([398,1,'Fistula protection sleeve']);
  s.push([12,1,'Bathroom scale · weigh daily between sessions'],[399,1,'Measured fluid bottle'],[403,1,'Kidney diet guide (Kiswahili)'],[490,1,'Medical ID wristband'],[404,1,'Dialysis day comfort bag']);
  a.push([1,1,'Upper-arm BP monitor (non-fistula arm)'],[255,1,'Neck pillow for sessions'],[514,1,'Warm fleece blanket for sessions']);
  return{m,s,a,svc:['Delivery timed to your dialysis schedule','Weekly weight and BP reminders','No medicines: prescriptions stay with the renal team']}}},
/* 14 ---------------------------------------------------------------- RECOVERY */
{k:'rec',n:'Kupona',en:'Recovery after surgery or injury',g:'care',age:'Any age after hospital',img:'/_blob/4a25158a02f04d523884d5eea923eca2',card:'Afya Care',cad:'Monthly · 1–3 months',
 who:'Anyone coming home after an operation (caesarean, hernia, fracture fixation) or an injury, and the family member who helps.',
 why:'Discharge comes fast and families go home with a letter, not supplies. Wound dressings, tape, a way to shower without wetting the wound, ice for swelling, and support for moving safely are bought in a rush, often wrongly. Infection and falls are the two risks of the first weeks. The box follows the discharge advice, changes from month 1 to month 2, and stops when recovery is done.',
 ev:[['Cambridge University Hospitals NHS: keep the first dressing on at least 48 hours, keep it dry, change it if it gets wet, no antiseptic cream needed; watch for redness, pus, smell or fever.','wound'],['WHO surgical-site infection guidance: standard dressings are as good as advanced ones on closed wounds, so the box uses standard sterile dressings.','ssi'],['NHS: people who have had surgery or difficulty moving are at higher risk of pressure ulcers; change position and protect the skin.','pu'],['WHO: falls rise with age and reduced mobility; the box adds non-slip and support items for that reason.','falls']],
 qty:'Dressings = changes per week × 4.3: about 3 a week ≈ 13 a month = 1.5 packs of 10 in month 1, 1 pack in month 2. Gauze 2 packs, tape 1 roll, saline wash 1, gloves ¼ box. Ice packs 4 a month for a fracture or sprain. Body wipes and no-rinse caps in month 1 while showering is limited.',
 stg:'Weeks 1–4: dressings, saline, shower cover, body wipes, thermometer to check for fever. Weeks 5–8: fewer dressings; silicone scar sheets once the wound is closed. Month 3 onward: only what the clinic still advises, then the plan ends by itself.',
 excl:[['Antibiotics and pain medicine','Prescribed by the surgeon; licensed pharmacy counter only.'],['Wound-closure strips and sutures','Applied by clinicians.'],['Compression stockings and abdominal binders','Only when the surgeon advises (add-ons).']],
 ex:'Halima, 34, came home to Kigamboni after a caesarean. Her sister ordered Kupona with Mama na Mtoto. Month 1: island dressings, gauze, tape, saline, a shower cover and a thermometer. In week 6, scar sheets replaced the dressings. She returned to her clinic once, for a check the adviser suggested.',
 safe:'Redness, pus, a bad smell, an opening wound, fever, or calf pain and swelling: the adviser refers to the clinic or hospital at once.',
 slots:[['Dressings','n9'],['Gauze',195],['Tape',199]],
 stages:[['m1','Weeks 1–4 at home',1],['m2','Weeks 5–8',1],['m3','Month 3 onward',10]],
 opt:[{k:'type',n:'Recovering from',o:[['wound','Surgery (wound)'],['bone','Fracture or sprain'],['both','Both']],d:'wound'},{k:'mob',n:'Moving around',o:[['walk','Walks alone'],['lim','Limited / in bed']],d:'walk'}],
 items(o){const st=o.stage,mi=o._mi||0,w=o.type!=='bone',b=o.type!=='wound',m=[],s=[],x=[],a=[];
  if(w){m.push(['n9',st==='m1'?1.5:st==='m2'?1:.5,'Sterile island dressings ×10 · about 3 changes a week'],[195,st==='m1'?2:1,'Sterile gauze swabs'],[199,1,'Micropore surgical tape'],['n8',st==='m3'?.5:1,'Sterile saline wound wash'],[205,.25,'Disposable gloves ·  for every dressing change']);if(st!=='m1')m.push([298,.5,'Silicone scar sheets · once the wound is closed'])}
  if(b)m.push([115,4,'Instant ice packs · swelling, first weeks'],[40,.17,'Rubber cane/crutch tips']);
  m.push([211,1,'Hand sanitiser · before and after care'],[65,st==='m1'?2:1,'Body cleansing wipes · while showering is limited'],[235,.5,'Lip balm'],[234,.5,'Emollient for dry skin'],[445,1,'Extra-large wipes'],[222,.34,'Insect-repellent lotion']);
  if(st==='m1')m.push([64,2,'No-rinse shampoo caps']);
  if(o.mob==='lim')m.push([55,1,'Bed underpads ×10'],[446,.5,'Barrier cream · pressure areas']);
  if(mi===0&&(st==='m1'||o._join)){s.push([7,1,'Digital thermometer · fever is a warning sign'],[66,1,'Weekly pill organiser · for prescribed medicines'],['n15',1,'Waterproof cast and dressing shower cover'],[49,1,'Non-slip bath mat'],[79,1,'Motion-sensor night light']);if(b)s.push([113,2,'Reusable hot/cold gel packs'],[91,1,'Arm sling (if an arm is injured)']);if(o.mob==='lim')s.push([447,1,'Pressure-relief gel cushion'],[286,1,'Heel protector boots'],[57,1,'Urinal bottle'])}
  a.push([30,1,'Underarm crutches (or rent)'],[44,1,'Raised toilet seat'],[183,1,'Incentive spirometer (if advised after chest or abdominal surgery)'],[94,1,'Abdominal binder (if the surgeon advises)'],[104,1,'Compression stockings (if advised)'],[61,1,'Wedge pillow']);
  return{m,s,x,a,svc:['Optional home visit to check the wound and the house for falls risks','WhatsApp photo check-in with an adviser (refers, never diagnoses)']}}},
/* 15 ---------------------------------------------------------------- FIRST AID HOME */
{k:'aid',n:'Huduma ya Kwanza',en:'First aid for the home and car',g:'home',age:'Every home and car',img:'/_blob/d0289fd65724c9e0969d59e12ecac446',card:'Afya Green',cad:'Refill every 3 months',every:3,
 who:'Every household and car; especially homes with children, older parents or a long commute.',
 why:'Burns from cooking, cuts, falls, scalds and road accidents happen at home and on the road. Most homes either have no kit or a kit that was opened once and never refilled. The box starts with a complete kit and then refills only what was used or what expires, every three months, so the kit is always full.',
 ev:[['American Red Cross: a family kit carries plasters in several sizes, gauze, adhesive tape, elastic and triangular bandages, gloves, a cold pack, scissors, tweezers, an emergency blanket and a breathing barrier.','arc'],['WHO: falls and burns are common home injuries; quick cooling and clean covering matter most.','falls']],
 qty:'Refill = what a family of four uses in 3 months on average, with a top-up if the member reports more: one box of plasters, 2 packs of gauze, 1 crepe bandage, 1 roll of tape, antiseptic, a burn gel, 2 instant ice packs, eye-wash and blister plasters as fractions. Children add kids’ plasters.',
 stg:'The starter kit comes once; refills every 3 months. Adding a car adds a car kit. Expired items (burn gel, saline) are replaced before the date.',
 excl:[['Aspirin, antibiotic and hydrocortisone creams','Medicines: only if the licensed pharmacy counter exists, with advice.'],['Tourniquets for home use','Training needed; included only in workplace kits per OSH rules.']],
 ex:'The Lyimo family in Mbezi have two small children. The first box brought a full home kit, a car kit and a Kiswahili first-aid guide card. In June the refill replaced 40 plasters, the burn gel used after a cooking accident and two ice packs.',
 safe:'Heavy bleeding, large burns, head injuries, a child who swallowed something: emergency care, not the kit.',
 slots:[['Plasters',194],['Antiseptic',201]],
 opt:[{k:'car',n:'Car kit',o:[['no','Home only'],['yes','Home + car']],d:'no'},{k:'kids',n:'Children at home',o:[['yes','Yes'],['no','No']],d:'yes'}],
 items(o){const m=[[194,1,'Adhesive plasters ×100'],[195,2,'Sterile gauze swabs'],[196,1,'Crepe bandage'],[197,.5,'Elastic adhesive bandage'],[198,.5,'Triangular bandage'],[199,1,'Micropore tape'],[200,.5,'Cotton wool roll'],[201,1,'Antiseptic liquid'],[202,1,'Burn gel dressing'],[203,.5,'Blister plasters'],[205,.25,'Disposable gloves'],[208,.5,'Eye-wash cup and saline'],[115,2,'Instant ice packs'],[207,.5,'Emergency foil blanket'],[210,.5,'Wound closure strips (small cuts)']],s=[],a=[];
  if(o.kids==='yes')m.push([160,1,'Kids’ plasters']);
  s.push([190,1,'Home first-aid kit'],[7,1,'Digital thermometer'],[204,1,'First-aid scissors and tweezers'],[206,1,'CPR face shield'],[113,1,'Reusable hot/cold gel pack'],['n24',1,'First-aid guide card in Kiswahili']);
  if(o.car==='yes')s.push([192,1,'Car first-aid kit']);
  a.push([209,1,'Emergency splint'],[10,1,'Pulse oximeter'],[193,1,'Travel first-aid pouch']);
  return{m,s,a,svc:['Kit check at Afya Check: bring it, we refill on the spot','Free first-aid basics session in the store every month']}}},
/* 16 ---------------------------------------------------------------- OFFICE */
{k:'office',n:'Afya Ofisi',en:'Workplace first aid & hygiene · per 25 staff',g:'biz',age:'Workplaces',img:'/_blob/e5771abf50821abc0d0c50ddbed973ee',card:'Afya Kazini',cad:'Monthly',
 who:'Offices, schools, factories and NGOs, per 25 staff.',
 why:'Tanzanian law requires workplaces to keep a first-aid box and trained first aiders, and to keep it ready for use. Most offices buy a box once and never refill it. The box keeps the workplace compliant and adds hygiene supplies and a monthly staff BP and BMI screening day.',
 ev:[['OSH (First Aid and Welfare Facilities) Rules, 2015: one first-aid box and two trained first aiders for 10–50 employees; marked “FIRST AID”, kept clean and ready for use (rule 4).','osh'],['WHO STEPS Tanzania: raised BP is common and mostly unknown; screening at work finds it early.','who']],
 qty:'Per 25 staff: hand sanitiser and hand wash 3 bottles each, 2 packs of paper towels, 2 disinfectant sprays, desk wipes, masks, and a quarterly first-aid refill.',
 stg:'Larger offices multiply the box; the yearly OSH review report comes in month 12.',
 excl:[['Paracetamol and aspirin from the OSH schedule','Supplied only through a licensed pharmacy counter.']],
 ex:'An NGO office in Masaki with 25 staff keeps its first-aid box full, and once a month Afya’s mobile check day screens staff BP; two staff were referred in the first quarter.',
 safe:'Workplace injury beyond first aid: emergency care.',
 slots:[['Sanitiser',211],['Hand wash',426]],opt:[],
 items(){return{m:[[211,3,'Hand sanitiser 500 ml'],[426,3,'Hand wash'],[495,2,'Hand towels ×6 rolls'],[215,2,'Disinfectant spray'],[213,1,'Surgical masks ×50'],[217,2,'Disinfecting wipes for desks and phones'],[194,.5,'Plasters'],[434,.34,'First-aid refill · quarterly (OSH rules)'],[202,.34,'Burn gel dressing'],[208,.34,'Eye-wash cup and saline'],[115,.5,'Instant ice packs']],s:[[191,1,'Workplace first-aid kit (OSH Rules 2015)']],a:[[220,1,'Foot-pedal sanitiser stand'],[1,1,'BP monitor for the office']],svc:['Monthly staff BP and BMI screening day with the mobile check station','Annual OSH first-aid review report'],fee:50000}}},
/* 17 ---------------------------------------------------------------- HOTEL */
{k:'hotel',n:'Afya Hoteli',en:'Guest care & safety · per 20 rooms',g:'biz',age:'Hotels and lodges',img:'/_blob/5d2dfa27d3bc386bf3e42e6c3eb9c004',card:'Afya Kazini',cad:'Monthly',
 who:'Hotels, lodges and serviced apartments, per 20 rooms.',
 why:'Guests arrive with jet lag, mosquitoes and small injuries. A hotel that has plasters, repellent and a working thermometer at the desk looks after them; one that does not sends them out at night. The box keeps rooms and the front desk stocked.',
 ev:[['WHO: nets and repellent protect against malaria; replacement nets rotate through rooms.','itn'],['American Red Cross: basic first-aid kit contents for the front desk.','arc']],
 qty:'Per 20 rooms: ear plugs 2 packs, eye masks 4, plug-in refills 4, repellent 3, pocket sanitisers 6, a replacement net one room a month, quarterly first-aid refill.',
 stg:'Seasonal: more repellent in the rains; more sanitiser in the high season.',
 excl:[['Medicines for guests','Pharmacy referral within 2 hours instead.']],
 ex:'A 40-room lodge in Kigamboni takes two boxes; the front desk calls the Afya line when a guest needs a thermometer or BP check.',
 safe:'A sick guest with fever: clinic referral, malaria test.',
 slots:[['Repellent',222],['Sanitiser',211]],opt:[],
 items(){return{m:[[249,2,'Ear plugs ×20 pairs'],[248,4,'Sleep eye masks'],[433,4,'Mosquito plug-in refills'],[194,1,'Plasters'],[211,2,'Hand sanitiser'],[215,2,'Disinfectant'],[222,3,'Insect-repellent lotion for guests'],[221,1,'Replacement bed net · one room a month, rotating'],[212,6,'Pocket sanitisers for the welcome tray'],[434,.34,'Front-desk first-aid refill']],s:[[190,1,'Front-desk first-aid kit'],[8,1,'Infrared thermometer']],a:[[1,1,'BP monitor for the front desk']],svc:['Guest health line: thermometer, BP check or pharmacy referral to any room within 2 hours'],fee:30000}}}
];
const BK=k=>BOXES.find(b=>b.k===k);

/* ---------- pricing engine (same formula as the Research Lab) ---------- */
const r500=n=>Math.round(n/500)*500;
const dopt=b=>Object.fromEntries((b.opt||[]).map(x=>[x.k,x.d]));
function schedule(b,o,plan){if(!b.stages)return [{st:null,mi:0}];const out=[];let si=Math.max(0,b.stages.findIndex(s=>s[0]===o.stage)),mi=0;
 for(let m=0;m<plan;m++){const s=b.stages[si];out.push({st:s[0],mi});mi++;if(mi>=s[2]&&si<b.stages.length-1){si++;mi=0}}return out}
function month(b,o,q,plan,pick,sw,first){const r=b.items({...o,stage:q.st,_mi:q.mi,_join:first});const mon=r.m.filter(x=>x[1]>0);
 const sd={};(b.slots||[]).forEach((sl,i)=>{if(sw&&sw[i])sd[sl[1]]=DLT[sw[i]]});
 const line=([id,qq])=>it(id)[2]*qq*(1+(sd[id]||0));
 const val=mon.reduce((t,x)=>t+line(x),0),fee=r.fee||0,pd=PK(b)+(pick?0:DELC),disc=BASE+PLD[plan];
 const price=r500(val*(1-disc)+fee+pd);const sx=[...(r.s||[]),...(r.x||[])],free=r.free||[];
 const sv=sx.reduce((t,[id,qq])=>t+it(id)[2]*qq,0),fv=sx.filter(([id])=>free.includes(id)).reduce((t,[id,qq])=>t+it(id)[2]*qq,0);
 const sp=plan>=6?r500((sv-fv)*.5):r500(sv*.85);
 return{r,mon,val,fee,pd,disc,price,sv,fv,sp,st:q.st,mi:q.mi}}
function calc(b,o,plan,pick,sw,fixed){o=o||dopt(b);if(b.stages&&!o.stage)o={...o,stage:b.stages[0][0]};
 const nBox=b.every?Math.max(1,Math.round(plan/b.every)):plan;
 const sch=b.stages&&!fixed?schedule(b,o,plan):[{st:b.stages?o.stage:null,mi:0}];const ms=sch.map((q,i)=>month(b,o,q,plan,pick,sw,i===0));
 const n=ms.length,avg=f=>ms.reduce((t,x)=>t+x[f],0)/n;
 const c={ms,first:ms[0],val:avg('val'),price:r500(avg('price')),fee:ms[0].fee,pd:ms[0].pd,disc:ms[0].disc,sv:ms.reduce((t,x)=>t+x.sv,0),fv:ms.reduce((t,x)=>t+x.fv,0),sp:ms.reduce((t,x)=>t+x.sp,0),plan,nBox};
 c.total=c.price*nBox+c.sp;c.shop=c.val*(1+SMALLP)+TRIP*4+c.fee*1.4;c.save=c.shop-c.price;c.shelfSave=c.val+c.fee-c.price+c.pd;return c}
const bp=b=>calc(b,dopt(b),1).price;
const bpf=(b,p)=>calc(b,dopt(b),p,false,null,true).price;
window.AFYABOX={calc,BK,dopt,it,PACKC,DELC,PSZ,PACKS,PK};
const countLines=b=>{const c=calc(b,dopt(b),1).first;return{m:c.mon.length,s:(c.r.s||[]).length+(c.r.x||[]).length,a:(c.r.a||[]).length}};
const qfmt=q=>{if(q>=1)return (Math.round(q*100)/100).toString().replace(/\.0+$/,'');for(const d of [2,3,4,5,6,8,10,12]){const a=Math.round(q*d);if(a>=1&&Math.abs(a/d-q)<.021)return a===1?`1 every ${d} mo`:`${a} every ${d} mo`}return q.toFixed(2)};

/* ---------- 3.5 sources, month timeline, CSS ---------- */
const K5=['who','idf','nbs','dhs','nap','cord','iycf','ifa','loch','ms','itn','teeth','lice','acne','per','tbs','nice','iwgdf','hypo','ish','salt','rf','rb','kcuk','wales','falls','pu','ssi','wound','arc','osh','q2','mm'];
const TL=[[1,'Box delivered','The month’s box arrives on the member’s fixed day. The rider confirms with a photo or a code; the member gets the itemised list on WhatsApp.'],
 [2,'Swap window opens','From the day after delivery, next month’s box is open: change a brand (Afya Choice), a size, a quantity, add an add-on or pause. App, WhatsApp, phone or in store.'],
 [18,'Last swap day','Twelve days before month end the system sends one clear reminder by SMS, WhatsApp, email and push: “Your next box locks tonight.”'],
 [19,'Choices lock','At midnight the packing list for every member is final, so buying is exact and nothing is wasted.'],
 [21,'Stock topped up','The system adds up every locked box and drafts purchase orders for anything below the level the locked boxes need.'],
 [25,'Renewal, zero clicks','The plan renews on its date by mobile money or card; the member does nothing unless they want to change.'],
 [27,'Pack and check','Boxes are packed from the locked list; every item is scanned against the member’s list.'],
 [28,'Photograph and seal','The packed box is photographed, sealed and labelled; the photo is stored with the order.'],
 [30,'Out for delivery','Riders get routes by zone the evening before; the member gets a tracking link.']];
const ARC=(cx,cy,r,a1,a2)=>{const p=a=>[cx+r*Math.cos(a*Math.PI/180),cy+r*Math.sin(a*Math.PI/180)];const [x1,y1]=p(a1),[x2,y2]=p(a2);return `M${x1.toFixed(1)} ${y1.toFixed(1)}A${r} ${r} 0 ${a2-a1>180?1:0} 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`};
const AGEL=[['Pregnancy','Trimester 1','preg','t1'],['','Trimester 2','preg','t2'],['','Trimester 3','preg','t3'],['Newborn','0–3 months','mama','nb'],['Baby','3–6 months','mama','m3'],['Baby','6–12 months','mama','m6'],['Toddler','1–3 years','mama','tod'],['Child','4–12 years','shule'],['Teen girl','13–19','binti'],['Teen boy','13–19','kijana'],['Woman','20–59','glow'],['Man','20–59','man'],['Older adult','60+','senior']];
const ANY=['home','siku','sugar','presha','kidney','rec','aid','office','hotel'];
const FB={preg:'img/boxdoor.webp',mama:'img/boxdoor.webp',shule:'img/boxdoor.webp',binti:'img/boxdoor.webp',kijana:'img/boxdoor.webp',glow:'img/interior.webp',siku:'img/interior.webp',man:'img/interior.webp',home:'img/hub.webp',senior:'img/team.webp',sugar:'img/team.webp',presha:'img/team.webp',kidney:'img/team.webp',rec:'img/team.webp',aid:'img/hub.webp',office:'img/hub.webp',hotel:'img/interior.webp'};
const GN=g=>(GRPS.find(x=>x[0]===g)||['',''])[1];

(typeof addCSS==='function'?addCSS:function(id,css){if(document.getElementById('css-'+id))return;const st=document.createElement('style');st.id='css-'+id;st.textContent=css;document.head.appendChild(st)})('p35',`
.p35-kpis{display:flex;flex-wrap:wrap;gap:10px;margin-top:22px}
.p35-kpis span{padding:8px 14px;border-radius:999px;border:1px solid var(--edge2);background:rgba(2,6,8,.55);backdrop-filter:blur(8px);font:500 .78rem/1.2 var(--f-body);color:var(--ink2)}
.p35-kpis b{color:var(--gold2);font-family:var(--f-hud);font-weight:600;margin-right:4px}
.p35-h3{font:600 1.05rem/1.3 var(--f-display);color:var(--ink);margin:30px 0 6px;letter-spacing:.01em}
.p35-sub{color:var(--ink2);font-size:.92rem;line-height:1.6;margin:0 0 14px;max-width:880px}
/* age timeline */
.p35-tlw{position:relative;margin:18px 0 6px;padding:20px 18px 16px;border-radius:22px;border:1px solid var(--edge);background:linear-gradient(180deg,rgba(15,122,82,.10),rgba(2,6,8,.35));overflow-x:auto;scrollbar-width:thin}
.p35-tl{position:relative;display:grid;grid-template-columns:repeat(13,minmax(78px,1fr));min-width:1020px}
.p35-tl::before{content:"";position:absolute;left:4%;right:4%;top:15px;height:2px;background:linear-gradient(90deg,#ff9fc4,#f2c96b 45%,#5fbf8f 70%,#b5dfc6)}
.p35-tn{position:relative;display:flex;flex-direction:column;align-items:center;gap:4px;padding:0 4px;background:none;border:0;color:var(--ink2);cursor:pointer;text-align:center;font:inherit}
.p35-tn i{width:12px;height:12px;border-radius:50%;margin:9px 0 8px;background:var(--void);border:2px solid var(--gold);box-shadow:0 0 0 4px rgba(2,6,8,.9);transition:transform .2s,background .2s}
.p35-tn b{font:600 .72rem/1.15 var(--f-body);color:var(--ink);min-height:1.15em}
.p35-tn small{font:500 .64rem/1.2 var(--f-hud);color:var(--ink3);letter-spacing:.02em}
.p35-tn em{font-style:normal;font:500 .62rem/1.2 var(--f-body);color:var(--neon2);opacity:.85}
.p35-tn:hover i,.p35-tn.p35-on i{background:var(--neon);border-color:var(--neon);transform:scale(1.25)}
.p35-tn.p35-on b{color:var(--neon2)}
.p35-any{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:12px 0 0}
.p35-any>span{font:600 .62rem/1 var(--f-hud);letter-spacing:.14em;text-transform:uppercase;color:var(--ink3);margin-right:6px}
.p35-chip{padding:8px 13px;border-radius:999px;border:1px solid var(--edge2);background:rgba(255,255,255,.03);color:var(--ink2);font:500 .78rem/1 var(--f-body);cursor:pointer}
.p35-chip:hover,.p35-chip.p35-on{border-color:var(--neon);color:var(--ink);background:rgba(95,191,143,.08)}
/* filter + cards */
.p35-flt{display:flex;flex-wrap:wrap;gap:8px;margin:26px 0 14px}
.p35-cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
.p35-card{display:flex;flex-direction:column;text-align:left;padding:0;border-radius:22px;overflow:hidden;border:1px solid var(--edge);background:linear-gradient(180deg,rgba(255,255,255,.035),rgba(255,255,255,.01));color:var(--ink);cursor:pointer;transition:transform .25s,border-color .25s,box-shadow .25s;font:inherit}
.p35-card:hover,.p35-card.p35-on{transform:translateY(-3px);border-color:rgba(242,201,107,.55);box-shadow:0 26px 60px -30px rgba(95,191,143,.45)}
.p35-card[hidden]{display:none}
.p35-ph{position:relative;aspect-ratio:16/9;background:#0b2a1e linear-gradient(135deg,#0f7a52 0%,#06231a 60%,#020608 100%);background-size:cover;background-position:center}
.p35-ph::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(2,6,8,0) 45%,rgba(2,6,8,.78))}
.p35-ph .p35-tg{position:absolute;z-index:1;left:10px;top:10px;padding:4px 8px;border-radius:6px;background:rgba(2,6,8,.62);font:500 .56rem/1 var(--f-hud);letter-spacing:.06em;color:var(--ink2)}
.p35-ph .p35-ag{position:absolute;z-index:1;left:14px;bottom:12px;font:600 .7rem/1 var(--f-hud);letter-spacing:.08em;text-transform:uppercase;color:var(--gold2)}
.p35-cb{display:flex;flex-direction:column;gap:6px;padding:16px 18px 18px;flex:1}
.p35-cb small{font:600 .6rem/1 var(--f-hud);letter-spacing:.14em;text-transform:uppercase;color:var(--ink3)}
.p35-cb h4{margin:0;font:600 1.12rem/1.2 var(--f-display);color:var(--ink)}
.p35-cb p{margin:0;color:var(--ink2);font-size:.86rem;line-height:1.45}
.p35-cm{display:flex;flex-wrap:wrap;gap:6px 14px;margin-top:6px;font-size:.74rem;color:var(--ink3)}
.p35-cm b{color:var(--ink);font-family:var(--f-hud)}
.p35-cp{display:flex;justify-content:space-between;align-items:flex-end;gap:10px;margin-top:auto;padding-top:12px;border-top:1px solid var(--edge)}
.p35-cp span{font-size:.72rem;color:var(--ink3);line-height:1.3}
.p35-cp b{display:block;font:600 1.02rem/1.1 var(--f-hud);color:var(--neon2)}
.p35-cp .p35-r{text-align:right}.p35-cp .p35-r b{color:var(--ink2);font-size:.86rem}
.p35-capn{margin:10px 0 0;font:500 .66rem/1.4 var(--f-hud);color:var(--ink3);letter-spacing:.04em}
/* pricing method */
.p35-form{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:0;margin:14px 0 6px;border:1px solid var(--edge);border-radius:18px;overflow:hidden}
.p35-form>div{padding:14px 12px;border-right:1px solid var(--edge);background:rgba(255,255,255,.02)}
.p35-form>div:last-child{border-right:0;background:rgba(95,191,143,.08)}
.p35-form small{display:block;font:600 .58rem/1.2 var(--f-hud);letter-spacing:.1em;text-transform:uppercase;color:var(--ink3);min-height:2.4em}
.p35-form b{display:block;font:600 .98rem/1.2 var(--f-hud);color:var(--ink);margin-top:6px}
.p35-form span{display:block;font-size:.7rem;color:var(--ink3);margin-top:4px;line-height:1.35}
.p35-form>div:last-child b{color:var(--neon2)}
.p35-plans{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-top:16px}
.p35-plan{position:relative;padding:18px;border-radius:18px;border:1px solid var(--edge);background:rgba(255,255,255,.02)}
.p35-plan.p35-gold{border-color:rgba(242,201,107,.55);background:linear-gradient(180deg,rgba(242,201,107,.09),rgba(255,255,255,.01))}
.p35-plan small{font:600 .6rem/1 var(--f-hud);letter-spacing:.14em;text-transform:uppercase;color:var(--ink3)}
.p35-plan h4{margin:6px 0 2px;font:600 1.15rem/1.2 var(--f-display);color:var(--ink)}
.p35-plan .p35-d{font:600 1.7rem/1 var(--f-hud);color:var(--neon2);margin:8px 0}
.p35-plan.p35-gold .p35-d{color:var(--gold2)}
.p35-plan p{margin:0 0 8px;font-size:.8rem;color:var(--ink2);line-height:1.4}
.p35-plan ul{margin:0;padding:0 0 0 16px;font-size:.78rem;color:var(--ink2);line-height:1.55}
.p35-plan .p35-fl{position:absolute;top:14px;right:14px;font:600 .56rem/1 var(--f-hud);letter-spacing:.1em;color:var(--void);background:var(--gold);padding:4px 7px;border-radius:5px}
/* configurator */
.p35-cfg{display:grid;grid-template-columns:340px minmax(0,1fr);gap:18px;margin-top:10px}
.p35-side,.p35-main{border:1px solid var(--edge);border-radius:22px;background:linear-gradient(180deg,rgba(255,255,255,.035),rgba(255,255,255,.01))}
.p35-side{padding:16px;align-self:start;position:sticky;top:76px}
.p35-main{padding:20px;min-width:0}
.p35-lab{display:block;margin:14px 0 7px;font:600 .6rem/1 var(--f-hud);letter-spacing:.14em;text-transform:uppercase;color:var(--ink3)}
.p35-sel{width:100%;padding:11px 12px;border-radius:12px;border:1px solid var(--edge2);background:#04110c;color:var(--ink);font:500 .9rem var(--f-body)}
.p35-shd{position:relative;margin-top:12px;border-radius:16px;overflow:hidden;aspect-ratio:16/9;background:#0b2a1e linear-gradient(135deg,#0f7a52,#020608);background-size:cover;background-position:center}
.p35-shd::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(2,6,8,0) 35%,rgba(2,6,8,.85))}
.p35-shd div{position:absolute;z-index:1;left:12px;right:12px;bottom:10px}
.p35-shd b{display:block;font:600 1.05rem/1.2 var(--f-display);color:#fff}
.p35-shd span{font-size:.74rem;color:var(--ink2)}
.p35-shd .p35-tg{position:absolute;z-index:1;left:10px;top:10px;padding:3px 7px;border-radius:6px;background:rgba(2,6,8,.62);font:500 .54rem/1 var(--f-hud);color:var(--ink2)}
.p35-seg{display:flex;flex-wrap:wrap;gap:6px}
.p35-seg button{flex:1 1 auto;padding:9px 10px;border-radius:10px;border:1px solid var(--edge2);background:rgba(255,255,255,.02);color:var(--ink2);font:500 .76rem/1.2 var(--f-body);cursor:pointer;text-align:center}
.p35-seg button[aria-pressed="true"]{border-color:var(--neon);background:rgba(95,191,143,.1);color:var(--ink)}
.p35-pls{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px}
.p35-pls button{padding:10px;border-radius:12px;border:1px solid var(--edge2);background:rgba(255,255,255,.02);color:var(--ink2);text-align:left;cursor:pointer;font:inherit}
.p35-pls button b{display:block;font:600 .82rem/1.2 var(--f-body);color:var(--ink)}
.p35-pls button span{font:500 .66rem/1.3 var(--f-hud);color:var(--ink3)}
.p35-pls button[aria-pressed="true"]{border-color:var(--gold);background:rgba(242,201,107,.1)}
.p35-pls button[aria-pressed="true"] span{color:var(--gold2)}
.p35-kpi{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}
.p35-kpi div{padding:14px;border-radius:16px;border:1px solid var(--edge);background:rgba(2,6,8,.4)}
.p35-kpi small{display:block;font:600 .58rem/1.25 var(--f-hud);letter-spacing:.12em;text-transform:uppercase;color:var(--ink3)}
.p35-kpi b{display:block;margin-top:7px;font:600 1.1rem/1.15 var(--f-hud);color:var(--ink);white-space:nowrap}
.p35-kpi span{display:block;margin-top:5px;font-size:.7rem;color:var(--ink3);line-height:1.35}
.p35-kpi div:first-child{border-color:rgba(95,191,143,.45);background:rgba(95,191,143,.07)}
.p35-kpi div:first-child b{color:var(--neon2);font-size:1.32rem}
.p35-brk{margin:12px 0 0;padding:11px 14px;border-radius:12px;background:rgba(255,255,255,.025);border:1px dashed var(--edge2);font:500 .74rem/1.6 var(--f-hud);color:var(--ink2)}
.p35-brk b{color:var(--ink)}.p35-brk em{font-style:normal;color:var(--neon2)}
.p35-bars{margin-top:16px}
.p35-bars svg{display:block;width:100%;height:auto}
.p35-bars rect.p35-bb{cursor:pointer}
.p35-tabs{display:flex;flex-wrap:wrap;gap:6px;margin:18px 0 10px;border-bottom:1px solid var(--edge);padding-bottom:10px}
.p35-tabs button{padding:8px 12px;border-radius:10px;border:1px solid transparent;background:none;color:var(--ink3);font:600 .78rem/1 var(--f-body);cursor:pointer}
.p35-tabs button[aria-selected="true"]{border-color:var(--edge2);background:rgba(255,255,255,.04);color:var(--ink)}
.p35-tw{overflow-x:auto}
.p35-tbl{width:100%;border-collapse:collapse;font-size:.82rem}
.p35-tbl.p35-it{table-layout:fixed}.p35-tbl.p35-it th.c-ix{width:28px}.p35-tbl.p35-it th:nth-child(2){width:32%}.p35-tbl.p35-it th:nth-child(4){width:120px}.p35-tbl.p35-it th:nth-child(5){width:96px}
.p35-tbl th{text-align:left;font:600 .58rem/1.2 var(--f-hud);letter-spacing:.12em;text-transform:uppercase;color:var(--ink3);padding:8px 8px;border-bottom:1px solid var(--edge2);white-space:nowrap}
.p35-tbl td{padding:9px 8px;border-bottom:1px solid var(--edge);vertical-align:top;color:var(--ink2);line-height:1.4}
.p35-tbl td.c-it{color:var(--ink);font-weight:600;min-width:180px}
.p35-tbl td.c-it small{display:block;font-weight:400;font-size:.7rem;color:var(--ink3);font-style:italic;margin-top:2px}
.p35-tbl .c-n{text-align:right;font-family:var(--f-hud);white-space:nowrap;color:var(--ink);font-size:.78rem}
.p35-tbl .c-ix{width:24px;color:var(--ink3);font-family:var(--f-hud);font-size:.68rem}
.p35-tbl .c-nt{font-size:.78rem}
.p35-tbl .c-q small{display:block;color:var(--ink3);font-size:.68rem;margin-top:2px}
.p35-tbl th,.p35-tbl td{padding-left:6px;padding-right:6px}
.p35-tbl tfoot td{border-bottom:0;padding-top:7px;padding-bottom:4px;font-size:.78rem}
.p35-tbl tfoot tr.p35-t td{border-top:1px solid var(--edge2);padding-top:10px;font-weight:700;color:var(--neon2);font-size:.92rem}
.p35-tbl .p35-pe{display:inline-block;margin-left:5px;padding:1px 5px;border-radius:4px;border:1px solid rgba(242,201,107,.4);font:500 .52rem/1.4 var(--f-hud);color:var(--gold2);font-style:normal;vertical-align:1px}
.p35-tbl .p35-fr{color:var(--neon2);font:600 .62rem/1 var(--f-hud);margin-left:6px}
.p35-svc{margin:0;padding:0;list-style:none;display:grid;gap:8px}
.p35-svc li{padding:12px 14px;border-radius:12px;border:1px solid var(--edge);color:var(--ink2);font-size:.86rem}
.p35-svc li b{color:var(--neon2);font-family:var(--f-hud);margin-right:8px}
.p35-ch{margin-top:20px;padding:16px;border-radius:18px;border:1px solid rgba(242,201,107,.3);background:rgba(242,201,107,.04)}
.p35-ch h5{margin:0 0 4px;font:600 .92rem/1.3 var(--f-display);color:var(--ink)}
.p35-ch>p{margin:0 0 12px;font-size:.8rem;color:var(--ink2);line-height:1.5}
.p35-slot{display:grid;grid-template-columns:150px minmax(0,1fr);gap:10px;align-items:center;padding:9px 0;border-top:1px solid var(--edge)}
.p35-slot>b{font-size:.8rem;color:var(--ink)}
.p35-slot>b small{display:block;font-weight:400;color:var(--ink3);font-size:.68rem}
.p35-br{display:flex;flex-wrap:wrap;gap:5px}
.p35-br button{padding:6px 9px;border-radius:9px;border:1px solid var(--edge2);background:rgba(255,255,255,.02);color:var(--ink2);font:500 .68rem/1.25 var(--f-body);cursor:pointer;text-align:left}
.p35-br button small{display:block;font:500 .56rem/1.2 var(--f-hud);color:var(--ink3)}
.p35-br button[aria-pressed="true"]{border-color:var(--gold);background:rgba(242,201,107,.12);color:var(--ink)}
/* guide */
.p35-guide{margin-top:18px;border:1px solid var(--edge);border-radius:22px;padding:22px;background:rgba(255,255,255,.015)}
.p35-gh{display:flex;flex-wrap:wrap;align-items:baseline;gap:8px 16px;margin-bottom:12px}
.p35-gh h4{margin:0;font:600 1.3rem/1.2 var(--f-display);color:var(--ink)}
.p35-gh span{color:var(--ink3);font-size:.84rem}
.p35-gg{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
.p35-gc{padding:16px;border-radius:16px;border:1px solid var(--edge);background:rgba(2,6,8,.35)}
.p35-gc.p35-gw{grid-column:1/-1}
.p35-gc h5{margin:0 0 8px;font:600 .62rem/1.2 var(--f-hud);letter-spacing:.14em;text-transform:uppercase;color:var(--gold2)}
.p35-gc p{margin:0;color:var(--ink2);font-size:.88rem;line-height:1.65}
.p35-gc ul{margin:0;padding:0 0 0 18px;color:var(--ink2);font-size:.86rem;line-height:1.6}
.p35-gc li{margin-bottom:6px}
.p35-gc li b{color:var(--ink)}
.p35-gc.p35-gx{border-color:rgba(95,191,143,.3);background:rgba(95,191,143,.05)}
.p35-gc.p35-gs{border-color:rgba(255,138,122,.35);background:rgba(255,138,122,.05)}
/* month strip */
.p35-ms{display:grid;grid-template-columns:repeat(30,minmax(0,1fr));gap:3px;margin:16px 0 8px}
.p35-ms button{position:relative;height:46px;border:0;border-radius:6px;cursor:pointer;background:rgba(95,191,143,.16);color:var(--ink3);font:500 .56rem/1 var(--f-hud);padding:0}
.p35-ms button.p35-lk{background:rgba(242,201,107,.16)}
.p35-ms button.p35-ev{background:rgba(95,191,143,.5);color:var(--void);font-weight:700}
.p35-ms button.p35-lk.p35-ev{background:rgba(242,201,107,.65)}
.p35-ms button.p35-on{outline:2px solid #fff;outline-offset:1px}
.p35-msl{display:flex;justify-content:space-between;gap:10px;font:500 .62rem/1.3 var(--f-hud);color:var(--ink3);letter-spacing:.06em;text-transform:uppercase}
.p35-msd{margin-top:12px;padding:16px 18px;border-radius:16px;border:1px solid var(--edge);background:rgba(2,6,8,.4);min-height:84px}
.p35-msd b{display:block;font:600 1rem/1.3 var(--f-display);color:var(--ink);margin-bottom:6px}
.p35-msd b em{font-style:normal;color:var(--gold2);font-family:var(--f-hud);font-size:.8rem;margin-right:8px}
.p35-msd p{margin:0;color:var(--ink2);font-size:.88rem;line-height:1.6}
/* numbers */
.p35-cov td.c-it{min-width:170px}
.p35-cov td.p35-up{color:#ffb36b}.p35-cov td.p35-dn{color:var(--neon2)}
.p35-chart{margin-top:18px;padding:16px;border-radius:18px;border:1px solid var(--edge);background:rgba(2,6,8,.35)}
.p35-chart svg{display:block;width:100%;height:auto}
.p35-chart h5{margin:0 0 4px;font:600 .9rem/1.3 var(--f-display);color:var(--ink)}
.p35-chart p{margin:0 0 10px;font-size:.78rem;color:var(--ink3)}
.p35-two{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
.p35-recon{margin-top:16px;padding:14px 16px;border-radius:14px;border:1px solid rgba(242,201,107,.35);background:rgba(242,201,107,.05);font-size:.84rem;color:var(--ink2);line-height:1.6}
.p35-recon b{color:var(--gold2)}
@media (max-width:1100px){.p35-cards{grid-template-columns:repeat(2,minmax(0,1fr))}.p35-cfg{grid-template-columns:1fr}.p35-side{position:static}.p35-form{grid-template-columns:repeat(4,minmax(0,1fr))}.p35-form>div{border-bottom:1px solid var(--edge)}.p35-plans{grid-template-columns:repeat(2,minmax(0,1fr))}.p35-two{grid-template-columns:1fr}}
@media (max-width:640px){.p35-cov th:nth-child(2),.p35-cov td:nth-child(2),.p35-cov th:nth-child(4),.p35-cov td:nth-child(4),.p35-cov th:nth-child(6),.p35-cov td:nth-child(6),.p35-cov th:nth-child(7),.p35-cov td:nth-child(7){display:none}.p35-cov td.c-it{min-width:120px}.p35-cards{grid-template-columns:1fr}.p35-kpi{grid-template-columns:repeat(2,minmax(0,1fr))}.p35-kpi b{font-size:1.05rem}.p35-kpi div:first-child b{font-size:1.2rem}.p35-gg{grid-template-columns:1fr}.p35-form{grid-template-columns:repeat(2,minmax(0,1fr))}.p35-plans{grid-template-columns:1fr}.p35-slot{grid-template-columns:1fr}.p35-main{padding:14px}.p35-guide{padding:14px}.p35-ms{grid-template-columns:repeat(15,minmax(0,1fr))}.p35-ms button{height:34px}
 .p35-tbl.p35-it thead{display:none}.p35-tbl.p35-it tr{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:2px 10px;padding:10px 0;border-bottom:1px solid var(--edge)}.p35-tbl.p35-it td{border:0;padding:0}.p35-tbl.p35-it td.c-ix{display:none}.p35-tbl.p35-it td.c-nt{grid-column:1/-1;font-size:.74rem;color:var(--ink3)}.p35-tbl.p35-it td.c-q{grid-column:1;font-size:.72rem;color:var(--ink2);text-align:left}.p35-tbl.p35-it td.c-q small{display:inline}.p35-tbl.p35-it td.c-sp{display:none}.p35-tbl.p35-it td.c-it{min-width:0;grid-column:1/-1}.p35-tbl.p35-it td.c-v{grid-column:2;grid-row:3}
 .p35-tbl.p35-it tfoot tr{grid-template-columns:minmax(0,1fr) auto;padding:4px 0;border:0}.p35-tbl.p35-it tfoot td:empty{display:none}.p35-tbl.p35-it tfoot td.c-it{grid-column:1}.p35-tbl.p35-it tfoot td.c-n{grid-column:2;grid-row:1}}
`);

/* ---------- render ---------- */
function s35(s,p,pv,nx){const c=k=>k?cn(K5,k):'';
 const lines=BOXES.reduce((t,b)=>{const l=countLines(b);return t+l.m+l.s+l.a},0);
 const card=b=>{const l=countLines(b);return `<button type="button" class="p35-card" data-k="${b.k}" data-g="${b.g}"><div class="p35-ph" style="background-image:url(${b.img}),url(${FB[b.k]})"><span class="p35-tg">Concept image</span><span class="p35-ag">${esc(b.age)}</span></div>
  <div class="p35-cb"><small>${esc(GN(b.g))} · ${esc(b.card)}</small><h4>${esc(b.n)}</h4><p>${esc(b.en)}</p>
  <div class="p35-cm"><span><b>${l.m}</b> monthly items</span><span><b>${l.s}</b> starter</span><span><b>${l.a}</b> add-ons</span></div>
  <div class="p35-cp"><span>12-month plan<b>${T(bpf(b,12))}</b>${b.every?'per 3-month refill':'per box'}</span><span class="p35-r">1-month<b>${T(bpf(b,1))}</b></span></div></div></button>`};
 const ex=BK('mama'),exo={...dopt(ex),stage:'nb'},exc=calc(ex,exo,6,false,null,true);
 const mods=[
 ['The problem it solves',`<div class="plain"><span class="modno" style="margin:0 0 12px">In plain words</span><ol>
  <li><b>Every age has a list that runs out.</b> A pregnant mother, a newborn, a schoolchild, a teenage girl, a father with diabetes, a grandmother in bed: each uses the same things every month, and each list changes as life changes. Families notice only when something is already finished, often at night.</li>
  <li><b>Running out costs money and health.</b> A missed strip means a missed reading; a forgotten net means malaria; no pads means a girl stays home from school. The urgent trip costs transport, hours and a higher small-pack price: the founders’ Research Lab assumed neighbourhood small packs cost about ${Math.round(SMALLP*100)}% more, plus four trips a month.</li>
  <li><b>The need is large and mostly hidden.</b> About 1 in 4 adults aged 25–64 had raised blood pressure (25.7%), but only 17.6% of them knew ${c('who')}. About 2.9 million adults live with diabetes ${c('idf')}, and 3.49 million Tanzanians are aged 60 or over ${c('nbs')}.</li>
  <li><b>Most “health boxes” are random.</b> A box of things that loosely belong to a baby or a patient looks generous but wastes money: wrong size, wrong count, items nobody uses. Afya Boxes start from guidance (WHO, UNICEF, NHS, IDF, Red Cross, Tanzanian OSH rules), and every line has a reason, a quantity formula and a shelf price.</li>
  <li><b>Paying monthly is now normal.</b> Tanzania had about 87 million mobile money accounts by mid-2026 ${c('q2')}, more than double five years earlier ${c('mm')}. A box that renews itself is finally practical.</li></ol></div>`],
 ['Our answer · one box for every age',`<p class="s11lead">Seventeen boxes cover a life from the first positive pregnancy test to the care of a grandparent, plus the conditions and places that need supplies every month. Tap any age on the line, or any box below, and the configurator opens on that box and stage.</p>
  <div class="p35-tlw"><div class="p35-tl" id="p35TL">${AGEL.map((a,i)=>`<button type="button" class="p35-tn" data-k="${a[2]}" ${a[3]?`data-st="${a[3]}"`:''}><i></i><b>${a[0]||'&nbsp;'}</b><small>${a[1]}</small><em>${esc(BK(a[2]).n)}</em></button>`).join('')}</div>
  <div class="p35-any"><span>At any age</span>${ANY.map(k=>`<button type="button" class="p35-chip" data-k="${k}">${esc(BK(k).n)} · ${esc(BK(k).en.split(',')[0].split(' · ')[0])}</button>`).join('')}</div></div>
  <div class="p35-flt" id="p35Flt" role="tablist">${GRPS.map((g,i)=>`<button type="button" class="p35-chip${i?'':' p35-on'}" data-g="${g[0]}">${g[1]}</button>`).join('')}</div>
  <div class="p35-cards" id="p35Cards">${BOXES.map(card).join('')}</div>
  <p class="p35-capn">Photos: concept images · products of the kind included, not the inside of a specific Afya Box. Prices: delivered, packing and delivery included, from the founders’ Research Lab price list ${PE}.</p>`],
 ['How a box is priced · the Research Lab method',`<p class="s11lead">The price is not a guess. It is built line by line from the store’s own shelf prices, exactly as in the founders’ Research Lab, so a member can always see what they get and what they save.</p>
  <div class="p35-form">
   <div><small>Shelf value</small><b>${T(exc.val)}</b><span>Σ item shelf price × monthly quantity</span></div>
   <div><small>Member discount</small><b>−${Math.round(BASE*100)}%</b><span>Every member, every box</span></div>
   <div><small>Plan discount</small><b>−${Math.round(PLD[6]*100)}%</b><span>0 / 5 / 8 / 12% for 1 / 3 / 6 / 12 months</span></div>
   <div><small>Service fee</small><b>${exc.fee?T(exc.fee):'—'}</b><span>Only boxes with visits or reports</span></div>
   <div><small>Packing · box ${PSZ[ex.k]}</small><b>+${T(PK(ex))}</b><span>The box itself at landed cost (S 3,500 · M 5,000 · L 6,500), insert, seal, photo check</span></div>
   <div><small>Delivery</small><b>+${T(DELC)}</b><span>Rider to the door (collect in store: 0)</span></div>
   <div><small>Price paid</small><b>${T(exc.price)}</b><span>Rounded to TSh 500 · Mama na Mtoto, newborn, Gold</span></div></div>
  <p class="note">Worked example: Mama na Mtoto, newborn stage, 6-month Gold plan, delivered. Packing (the cost of the box size this package uses) and delivery (${T(PK(ex)+DELC)} together) are inside the price the customer pays, so neither the box nor the ride is ever a hidden loss.</p>
  <div class="p35-plans">${PL.map(x=>`<div class="p35-plan${x.p===6?' p35-gold':''}">${x.p===6?'<span class="p35-fl">MOST CHOSEN</span>':''}<small>${x.p} month${x.p>1?'s':''} · ${x.sw}</small><h4>${x.t}</h4><div class="p35-d">−${Math.round((BASE+PLD[x.p])*100)}%</div><p>${esc(x.best)}</p><ul>${x.perks.map(k=>`<li>${esc(k)}</li>`).join('')}</ul></div>`).join('')}</div>
  <p class="note">Starter items (one-time things such as a net, a thermometer, a BP monitor) are charged once: 15% off on 1- and 3-month plans; on 6- and 12-month plans devices are free and other starters are 50% off. Plan names, discounts and perks are those of the founders’ Research Lab.</p>`],
 ['Try it · the box configurator',`<div class="p35-cfg">
   <div class="p35-side">
    <span class="p35-lab" style="margin-top:0">1 · Choose a box</span>
    <select class="p35-sel" id="p35Sel" aria-label="Choose a box">${GRPS.slice(1).map(g=>`<optgroup label="${g[1]}">${BOXES.filter(b=>b.g===g[0]).map(b=>`<option value="${b.k}">${esc(b.n)} · ${esc(b.en.split(/[,:·]/)[0])}</option>`).join('')}</optgroup>`).join('')}</select>
    <div class="p35-shd" id="p35Shd"></div>
    <div id="p35Stg"></div>
    <div id="p35Opt"></div>
    <span class="p35-lab">4 · Plan</span><div class="p35-pls" id="p35Pl">${PL.map(x=>`<button type="button" data-p="${x.p}" aria-pressed="${x.p===6}"><b>${x.t} · ${x.p} mo</b><span>−${Math.round((BASE+PLD[x.p])*100)}% on shelf</span></button>`).join('')}</div>
    <span class="p35-lab">5 · Receive by</span><div class="p35-seg" id="p35Rc"><button type="button" data-pk="0" aria-pressed="true">Home delivery</button><button type="button" data-pk="1" aria-pressed="false">Collect in store</button></div>
   </div>
   <div class="p35-main" aria-live="polite">
    <div class="p35-kpi" id="p35Kpi"></div>
    <div class="p35-brk" id="p35Brk"></div>
    <div class="p35-bars" id="p35Bars"></div>
    <div class="p35-tabs" id="p35Tabs" role="tablist"></div>
    <div class="p35-tw" id="p35Tbl"></div>
    <div class="p35-ch" id="p35Ch"></div>
   </div></div>
  <div class="p35-guide" id="p35Guide"></div>${NMA}`,'p35cfg'],
 ['Afya Choice · swap the brand, keep the box',`<p class="s11lead">Every core slot in a box (nappies, strips, pads, cleanser) has 4–5 registered brands in the same price range, mostly from India and China and some from East Africa ${PE}. Members swap freely until <b>12 days before month end</b>; the price moves only by the small difference shown in the configurator. Tap a day to see what happens in an Afya Box month.</p>
  <div class="p35-ms" id="p35Ms">${Array.from({length:30},(_,i)=>{const d=i+1,e=TL.findIndex(t=>t[0]===d);return `<button type="button" class="${d>=19?'p35-lk':''}${e>=0?' p35-ev':''}${d===1?' p35-on':''}" data-d="${d}" aria-label="Day ${d}">${d}</button>`}).join('')}</div>
  <div class="p35-msl"><span>Days 2–18 · swap window (green)</span><span>Days 19–30 · locked, buy, pack, deliver (gold)</span></div>
  <div class="p35-msd" id="p35Msd"></div>`],
 ['The numbers · every box, every plan',`<p class="p35-sub">Default options for each box (first stage for staged boxes), delivered. “Research Lab” is the price the founders’ lab calculated for the same box; the change comes from the items added in this rebuild.</p>
  <div class="p35-tw"><table class="p35-tbl p35-cov"><thead><tr><th>Box</th><th>For</th><th class="c-n">Monthly lines</th><th class="c-n">Starter</th><th class="c-n">1 mo</th><th class="c-n">3 mo</th><th class="c-n">6 mo</th><th class="c-n">12 mo</th><th class="c-n">Research Lab 1 mo</th><th class="c-n">Change</th></tr></thead><tbody>
  ${BOXES.map(b=>{const l=countLines(b),pr=[1,3,6,12].map(x=>bpf(b,x)),lb=LAB[b.k],ch=lb?(pr[0]/lb-1):null;return `<tr><td class="c-it">${esc(b.n)}<small>${esc(b.en)}</small></td><td>${esc(b.age)}</td><td class="c-n">${l.m}</td><td class="c-n">${l.s}</td>${pr.map(v=>`<td class="c-n">${kk(v)}</td>`).join('')}<td class="c-n">${lb?kk(lb):'new box'}</td><td class="c-n ${ch==null?'':ch>0.005?'p35-up':'p35-dn'}">${ch==null?'—':(ch>0?'+':'')+(ch*100).toFixed(0)+'%'}</td></tr>`}).join('')}
  </tbody></table></div>
  <div class="p35-two"><div class="p35-chart"><h5>Price ladder</h5><p>Per box, delivered: 12-month plan (bar) and 1-month plan (gold tick).</p><div id="p35Lad"></div></div>
   <div class="p35-chart"><h5>Mama na Mtoto · the first 24 months</h5><p>Box price each month on the 12-month plan; it falls as nappies fall from 9–10 to 5 a day. Starter items not included.</p><div id="p35Yr"></div></div></div>
  <div class="p35-recon">${(()=>{const cons=BOXES.filter(b=>b.g!=='biz'),avg=cons.reduce((t,b)=>t+bpf(b,6),0)/cons.length;return `<b>Model check.</b> The master model uses an average box of ${T(MB.avg_box)} with ${T(PACK)} for packing and delivery. The simple average of the ${cons.length} household boxes on a 6-month plan is ${T(r1k(avg))}, and packing plus delivery averages ${T(r1k(cons.reduce((t,b)=>t+PK(b),0)/cons.length+DELC))} (box S 3,500, M 5,000 or L 6,500, plus delivery 3,500). <b>Box prices from the founders’ Research Lab price list; model to be reconciled</b> (the real average depends on which boxes members choose; nappy-heavy baby boxes pull it up, period and BP boxes pull it down).`})()}</div>`],
 ['Risks and our answer',`<div class="risks">
  <div class="risk"><span class="q">Prices rise with imports or the shilling.</span><span class="ar">→</span><span class="a">Box prices are rebuilt from shelf prices each quarter; members see the new price before renewal and can swap to a value brand (Afya Choice) to keep the total.</span></div>
  <div class="risk"><span class="q">A box sells medicine by the back door.</span><span class="ar">→</span><span class="a">No prescription medicine in any box. Medicines only through a Pharmacy Council-licensed counter, if it exists. Supplements only on a health worker’s advice, as add-ons.</span></div>
  <div class="risk"><span class="q">Quantities are wrong for a family.</span><span class="ar">→</span><span class="a">Every line has a formula the member can change in the swap window; the system learns from “ran out early” and “stock left” and adjusts next month.</span></div>
  <div class="risk"><span class="q">Baby boxes are expensive because of nappies.</span><span class="ar">→</span><span class="a">The cloth-by-day option and “I use my own nappies” cut the price sharply while keeping everything else; the 12-month plan is 20% below shelf.</span></div>
  <div class="risk"><span class="q">Advisers drift into diagnosis.</span><span class="ar">→</span><span class="a">Every box carries a written “when we refer” rule; advisers explain readings and send people to clinics, they never diagnose.</span></div></div>`]];
 return secShell({s,p,pv,nx,img:'img/boxdoor.webp',imgAlt:'Concept image: a closed royal-green Afya Box handed over at a home doorstep',
  h1:'A box for every age,',em:'priced line by line.',
  lede:'Afya Boxes bring what a household uses up every month, from pregnancy and the first nappies to school, teenage years, adult care, conditions such as diabetes and blood pressure, and the care of an older parent. Every item is researched, every quantity has a formula, and every price is built from the store’s own shelf prices with packing and delivery inside.',
  heroExtra:`<div class="p35-kpis"><span><b>${BOXES.length}</b>boxes</span><span><b>13</b>life stages · pregnancy to 60+</span><span><b>${lines}</b>researched lines</span><span><b>1·3·6·12</b>month plans, up to −20%</span><span><b>${T(PACKS.S+DELC)}–${T(PACKS.L+DELC).replace('TSh ','')}</b>box & delivery at cost, inside the price</span></div>`,
  mods,
  takeaway:'Seventeen boxes, <b>researched line by line</b> and priced from the founders’ own shelf prices, turn one-off shoppers into <b>members who renew every month</b>, from a mother’s first trimester to her parents’ old age.',
  doors:['s3-6','s3-7','s3-8'],sources:src(K5)});}

/* ---------- interactivity ---------- */
function initS35(){const sel=document.getElementById('p35Sel');if(!sel)return;
 const st={k:'mama',o:{},plan:6,pick:false,sw:{},tab:'m',mon:0};
 const O=k=>{if(!st.o[k]){const b=BK(k);st.o[k]={...dopt(b)};if(b.stages)st.o[k].stage=b.stages[0][0]}return st.o[k]};
 const $=id=>document.getElementById(id);
 const nm=id=>{const x=it(id);return `${esc(x[0])}${NEWI[id]?'<i class="p35-pe">est. price</i>':''}<small>${esc(x[1])}</small>`};
 const stName=(b,k)=>{const s=(b.stages||[]).find(x=>x[0]===k);return s?s[1]:''};
 function paintSide(){const b=BK(st.k),o=O(st.k);sel.value=b.k;
  $('p35Shd').style.backgroundImage=`url(${b.img}),url(${FB[b.k]})`;$('p35Shd').innerHTML=`<span class="p35-tg">${CAP}</span><div><b>${esc(b.n)}</b><span>${esc(b.en)} · ${esc(b.cad)}</span></div>`;
  $('p35Stg').innerHTML=b.stages?`<span class="p35-lab">2 · Start at</span><div class="p35-seg">${b.stages.map(s=>`<button type="button" data-st="${s[0]}" aria-pressed="${o.stage===s[0]}">${esc(s[1])}</button>`).join('')}</div>`:'';
  $('p35Opt').innerHTML=(b.opt||[]).length?`<span class="p35-lab">3 · Options</span>`+b.opt.map(x=>`<div style="margin-bottom:10px"><div style="font-size:.74rem;color:var(--ink2);margin:0 0 6px">${esc(x.n)}</div><div class="p35-seg">${x.o.map(v=>`<button type="button" data-ok="${x.k}" data-ov="${v[0]}" aria-pressed="${o[x.k]===v[0]}">${esc(v[1])}</button>`).join('')}</div></div>`).join(''):`<span class="p35-lab">3 · Options</span><p style="margin:0;font-size:.78rem;color:var(--ink3)">Fixed contents per ${b.k==='office'?'25 staff':'20 rooms'}; order more boxes for larger sites.</p>`;
  document.querySelectorAll('#p35Pl button').forEach(x=>x.setAttribute('aria-pressed',+x.dataset.p===st.plan));
  document.querySelectorAll('#p35Rc button').forEach(x=>x.setAttribute('aria-pressed',(x.dataset.pk==='1')===st.pick));}
 function paint(){const b=BK(st.k),o=O(st.k),sw=st.sw[st.k]||{};const c=calc(b,o,st.plan,st.pick,sw);if(st.mon>=c.ms.length)st.mon=0;const m=c.ms[st.mon];
  const pl=PL.find(x=>x.p===st.plan),per=b.every?'per refill (every 3 months)':'per box';
  $('p35Kpi').innerHTML=`<div><small>Price ${per}</small><b>${T(c.price)}</b><span>${pl.t} plan · ${st.pick?'collect in store':'delivered'}${b.stages&&c.ms.length>1?' · average over the plan':''}</span></div>
   <div><small>Shelf value</small><b>${T(c.val)}</b><span>Same items at normal store prices</span></div>
   <div><small>Saving vs piece by piece</small><b>${T(Math.max(0,c.save))}</b><span>Small packs +${Math.round(SMALLP*100)}% and 4 trips (lab assumption)</span></div>
   <div><small>Plan total</small><b>${kk(c.total)}</b><span>${c.nBox} box${c.nBox>1?'es':''} + starters ${T(c.sp)}${c.fv?' · devices free':''}</span></div>`;
  $('p35Brk').innerHTML=`<b>This ${b.stages?'month':'box'}:</b> shelf ${T(m.val)} − ${Math.round(m.disc*100)}% (8% member + ${Math.round(PLD[st.plan]*100)}% plan) = ${T(m.val*(1-m.disc))}${m.fee?` + service ${T(m.fee)}`:''} + box ${PSZ[b.k]} ${T(PK(b))}${st.pick?'':` + delivery ${T(DELC)}`} → <em>${T(m.price)}</em> (rounded to 500)`;
  /* month bars */
  if(b.stages&&c.ms.length>1){const W=640,H=120,n=c.ms.length,bw=W/n,mx=Math.max(...c.ms.map(x=>x.price))*1.1;const cols=['#ff9fc4','#f2c96b','#5fbf8f','#b5dfc6'];
   $('p35Bars').innerHTML=`<div style="font:600 .58rem/1 var(--f-hud);letter-spacing:.12em;text-transform:uppercase;color:var(--ink3);margin-bottom:8px">Your plan month by month · tap a month to see its items</div><svg viewBox="0 0 ${W} ${H+24}" role="img" aria-label="Price of each month's box over the plan">${c.ms.map((x,i)=>{const h=x.price/mx*H,si=b.stages.findIndex(s=>s[0]===x.st);return `<rect class="p35-bb" data-m="${i}" x="${(i*bw+2).toFixed(1)}" y="${(H-h).toFixed(1)}" width="${(bw-4).toFixed(1)}" height="${h.toFixed(1)}" rx="3" fill="${cols[si%4]}" opacity="${i===st.mon?1:.45}"/><text x="${(i*bw+bw/2).toFixed(1)}" y="${H+14}" text-anchor="middle" font-size="9" fill="#6a8a7d" font-family="JetBrains Mono, monospace">${i+1}</text>`}).join('')}</svg><div style="display:flex;flex-wrap:wrap;gap:12px;font-size:.7rem;color:var(--ink3);margin-top:4px">${b.stages.filter(s=>c.ms.some(x=>x.st===s[0])).map(s=>`<span><i style="display:inline-block;width:9px;height:9px;border-radius:2px;background:${cols[b.stages.indexOf(s)%4]};margin-right:5px"></i>${esc(s[1])}</span>`).join('')}<span style="margin-left:auto;color:var(--ink2)">Month ${st.mon+1}: <b style="color:var(--neon2)">${T(m.price)}</b></span></div>`}
  else $('p35Bars').innerHTML='';
  /* tabs + tables */
  const r=m.r,S_=[...(r.s||[]),...(r.x||[])],free=r.free||[];
  const tabs=[['m',`Monthly items · ${m.mon.length}`],['s',`Starter · ${S_.length}`],['a',`Add-ons · ${(r.a||[]).length}`],['v','Services']];
  $('p35Tabs').innerHTML=tabs.map(t=>`<button type="button" role="tab" data-t="${t[0]}" aria-selected="${st.tab===t[0]}">${t[1]}</button>`).join('')+(b.stages?`<span style="margin-left:auto;align-self:center;font-size:.72rem;color:var(--ink3)">${esc(stName(b,m.st))} · month ${m.mi+1} of this stage</span>`:'');
  const sd={};(b.slots||[]).forEach((sl,i)=>{if(sw[i])sd[sl[1]]=DLT[sw[i]]});
  let h='';
  if(st.tab==='m'){h=`<table class="p35-tbl p35-it"><thead><tr><th class="c-ix">#</th><th>Item · Swahili</th><th>How the quantity is set</th><th class="c-n">Qty × price</th><th class="c-n">Value</th></tr></thead><tbody>${m.mon.map((x,i)=>{const v=it(x[0])[2]*x[1]*(1+(sd[x[0]]||0));return `<tr><td class="c-ix">${i+1}</td><td class="c-it">${nm(x[0])}</td><td class="c-nt">${esc(x[2])}</td><td class="c-n c-q">${qfmt(x[1])}<small> × ${T(it(x[0])[2])}</small></td><td class="c-n c-v">${T(v)}</td></tr>`}).join('')}</tbody>
   <tfoot><tr><td class="c-ix"></td><td class="c-it">Shelf value</td><td class="c-nt"></td><td></td><td class="c-n">${T(m.val)}</td></tr><tr><td class="c-ix"></td><td class="c-it">Member and plan discount −${Math.round(m.disc*100)}%</td><td class="c-nt"></td><td></td><td class="c-n">−${T(m.val*m.disc)}</td></tr>${m.fee?`<tr><td class="c-ix"></td><td class="c-it">Service fee (visits, reports)</td><td class="c-nt"></td><td></td><td class="c-n">+${T(m.fee)}</td></tr>`:''}<tr><td class="c-ix"></td><td class="c-it">Packing${st.pick?'':' and delivery'}</td><td class="c-nt"></td><td></td><td class="c-n">+${T(m.pd)}</td></tr><tr class="p35-t"><td class="c-ix"></td><td class="c-it">Price of this box</td><td class="c-nt"></td><td></td><td class="c-n">${T(m.price)}</td></tr></tfoot></table>`}
  else if(st.tab==='s'){h=S_.length?`<table class="p35-tbl p35-it"><thead><tr><th class="c-ix">#</th><th>Item · Swahili</th><th>Why it is in the box</th><th class="c-n">Qty × price</th><th class="c-n">Value</th></tr></thead><tbody>${S_.map((x,i)=>`<tr><td class="c-ix">${i+1}</td><td class="c-it">${nm(x[0])}${free.includes(x[0])&&st.plan>=6?'<span class="p35-fr">FREE</span>':''}</td><td class="c-nt">${esc(x[2])}${(r.x||[]).includes(x)?' · arrives later in this stage':''}</td><td class="c-n c-q">${qfmt(x[1])}<small> × ${T(it(x[0])[2])}</small></td><td class="c-n c-v">${T(it(x[0])[2]*x[1])}</td></tr>`).join('')}</tbody>
   <tfoot><tr><td class="c-ix"></td><td class="c-it">Starter value this month</td><td class="c-nt"></td><td></td><td class="c-n">${T(m.sv)}</td></tr><tr class="p35-t"><td class="c-ix"></td><td class="c-it">You pay once (${st.plan>=6?'devices free, others −50%':'−15%'})</td><td class="c-nt"></td><td></td><td class="c-n">${T(m.sp)}</td></tr></tfoot></table>`:`<p class="p35-sub">No one-time items in this month. ${b.stages?'Pick month 1 of a stage on the bars above to see its starter set.':''}</p>`}
  else if(st.tab==='a'){h=`<table class="p35-tbl p35-it"><thead><tr><th class="c-ix">#</th><th>Optional add-on · Swahili</th><th>Note</th><th class="c-n">Qty × price</th><th class="c-n">Member price</th></tr></thead><tbody>${(r.a||[]).map((x,i)=>`<tr><td class="c-ix">${i+1}</td><td class="c-it">${nm(x[0])}</td><td class="c-nt">${esc(x[2])} · one tap, delivered in the next box</td><td class="c-n c-q">1<small> × ${T(it(x[0])[2])}</small></td><td class="c-n c-v">${T(r500(it(x[0])[2]*(1-BASE)))}</td></tr>`).join('')}</tbody></table><p class="note">Add-ons are not in the box price. Members pay the shelf price less the member saving (3% monthly, 6% on 6 months, 9% on 12 months); nothing is added without the member’s tap.</p>`}
  else h=`<ul class="p35-svc">${(r.svc||[]).map((x,i)=>`<li><b>${String(i+1).padStart(2,'0')}</b>${esc(x)}</li>`).join('')}</ul><p class="note">Services are part of membership. Where a service has a real cost (home visits, reports), it is recovered through the service fee shown in the price.</p>`;
  $('p35Tbl').innerHTML=h;
  /* Afya Choice */
  $('p35Ch').innerHTML=`<h5>Afya Choice · brand per slot</h5><p>Pick a brand for each core slot. Changes are allowed until 12 days before month end; the box price updates by the difference only.</p>${(b.slots||[]).map((sl,i)=>{const line=(m.mon.find(x=>x[0]===sl[1])||[sl[1],0])[1]*it(sl[1])[2];return `<div class="p35-slot"><b>${esc(sl[0])}<small>${line?T(line)+' shelf / month':'not in this month'}</small></b><div class="p35-br">${['A','B','C','D','E'].map((L,j)=>`<button type="button" data-sl="${i}" data-br="${j}" aria-pressed="${(sw[i]||0)===j}">Brand ${L} ${j?`(${DLT[j]>0?'+':'−'}${T(Math.abs(line*DLT[j]*(1-m.disc)))})`:''}<small>${ORI[j]} · ${TAGS[j]}</small></button>`).join('')}</div></div>`}).join('')}<p class="note" style="margin-top:10px">Brands A–E are placeholders for 4–5 registered brands per slot ${PE}; final brands set with the founders after supplier quotations and TMDA checks.</p>`;
  /* guide */
  $('p35Guide').innerHTML=`<div class="p35-gh"><h4>${esc(b.n)} · ${esc(b.en)}</h4><span>${esc(b.age)} · ${esc(b.card)} card · ${esc(b.cad)}</span></div>
   <div class="p35-gg"><div class="p35-gc"><h5>Who it is for</h5><p>${esc(b.who)}</p></div><div class="p35-gc"><h5>Why it exists</h5><p>${esc(b.why)}</p></div>
   <div class="p35-gc p35-gw"><h5>What the evidence says</h5><ul>${b.ev.map(e=>`<li>${esc(e[0])} ${cn(K5,e[1])}</li>`).join('')}</ul></div>
   <div class="p35-gc"><h5>How quantities are set</h5><p>${esc(b.qty)}</p></div><div class="p35-gc"><h5>What changes by stage or option</h5><p>${esc(b.stg)}</p></div>
   <div class="p35-gc"><h5>Not included, and why</h5><ul>${b.excl.map(e=>`<li><b>${esc(e[0])}.</b> ${esc(e[1])}</li>`).join('')}</ul></div>
   <div class="p35-gc p35-gx"><h5>How it helps · ${tagi('Illustrative')}</h5><p>${esc(b.ex)}</p></div>
   <div class="p35-gc p35-gs p35-gw"><h5>When the adviser refers</h5><p>${esc(b.safe)}</p></div></div>`;
  document.querySelectorAll('#p35Cards .p35-card').forEach(x=>x.classList.toggle('p35-on',x.dataset.k===st.k));
  document.querySelectorAll('#p35TL .p35-tn').forEach(x=>x.classList.toggle('p35-on',x.dataset.k===st.k&&(!x.dataset.st||x.dataset.st===o.stage)));
  document.querySelectorAll('.p35-any .p35-chip').forEach(x=>x.classList.toggle('p35-on',x.dataset.k===st.k));}
 const go=(k,stg,scroll)=>{st.k=k;st.mon=0;st.tab='m';if(stg)O(k).stage=stg;paintSide();paint();if(scroll){const t=document.getElementById('p35cfg');if(t)t.scrollIntoView({behavior:'smooth',block:'start'})}};
 sel.onchange=()=>go(sel.value);
 document.getElementById('p35TL').onclick=e=>{const t=e.target.closest('.p35-tn');if(t)go(t.dataset.k,t.dataset.st,true)};
 document.querySelector('.p35-any').onclick=e=>{const t=e.target.closest('.p35-chip');if(t)go(t.dataset.k,null,true)};
 document.getElementById('p35Cards').onclick=e=>{const t=e.target.closest('.p35-card');if(t)go(t.dataset.k,null,true)};
 document.getElementById('p35Flt').onclick=e=>{const t=e.target.closest('.p35-chip');if(!t)return;document.querySelectorAll('#p35Flt .p35-chip').forEach(x=>x.classList.toggle('p35-on',x===t));document.querySelectorAll('#p35Cards .p35-card').forEach(x=>x.hidden=!(t.dataset.g==='all'||x.dataset.g===t.dataset.g))};
 document.querySelector('.p35-side').onclick=e=>{const t=e.target.closest('button');if(!t)return;const o=O(st.k);
  if(t.dataset.st){o.stage=t.dataset.st;st.mon=0}else if(t.dataset.ok){o[t.dataset.ok]=t.dataset.ov}else if(t.dataset.p){st.plan=+t.dataset.p;st.mon=0}else if(t.dataset.pk!=null){st.pick=t.dataset.pk==='1'}else return;paintSide();paint()};
 document.querySelector('.p35-main').onclick=e=>{const r=e.target.closest('rect.p35-bb');if(r){st.mon=+r.dataset.m;paint();return}const t=e.target.closest('button');if(!t)return;
  if(t.dataset.t){st.tab=t.dataset.t;paint()}else if(t.dataset.sl!=null){(st.sw[st.k]=st.sw[st.k]||{})[t.dataset.sl]=+t.dataset.br;paint()}};
 /* month strip */
 const msd=$('p35Msd');const showDay=d=>{const e=TL.filter(t=>t[0]<=d).pop();document.querySelectorAll('#p35Ms button').forEach(x=>x.classList.toggle('p35-on',+x.dataset.d===d));msd.innerHTML=`<b><em>DAY ${d}</em>${esc(e[1])}${d!==e[0]?' (continues)':''}</b><p>${esc(e[2])}</p>`};
 document.getElementById('p35Ms').onclick=e=>{const t=e.target.closest('button');if(t)showDay(+t.dataset.d)};showDay(1);
 /* charts */
 const lad=[...BOXES].map(b=>({b,a:bpf(b,12),o:bpf(b,1)})).sort((x,y)=>y.o-x.o);const LW=560,rh=24,LH=lad.length*rh+20,mx=Math.max(...lad.map(x=>x.o))*1.08,x0=130;
 $('p35Lad').innerHTML=`<svg viewBox="0 0 ${LW} ${LH}" role="img" aria-label="Price per box by plan">${lad.map((x,i)=>{const y=i*rh+6,w=(x.a/mx)*(LW-x0-60),wo=(x.o/mx)*(LW-x0-60);return `<text x="${x0-8}" y="${y+12}" text-anchor="end" font-size="11" fill="#a9c4b8" font-family="Manrope, Arial, sans-serif">${esc(x.b.n)}</text><rect x="${x0}" y="${y+3}" width="${w.toFixed(1)}" height="12" rx="3" fill="#5fbf8f" opacity=".7"/><rect x="${(x0+wo-1.5).toFixed(1)}" y="${y}" width="3" height="18" fill="#f2c96b"/><text x="${(x0+wo+6).toFixed(1)}" y="${y+12}" font-size="9" fill="#effaf5" font-family="JetBrains Mono, monospace">${Math.round(x.o/1000)}k</text>`}).join('')}</svg>`;
 const mb=BK('mama'),mo={...dopt(mb),stage:'nb'},yr=schedule(mb,mo,24).map((q,i)=>month(mb,mo,q,12,false,null,i===0));const YW=560,YH=200,ymx=Math.max(...yr.map(x=>x.price))*1.1,bw=(YW-40)/24,cols={nb:'#ff9fc4',m3:'#f2c96b',m6:'#5fbf8f',tod:'#b5dfc6'};
 $('p35Yr').innerHTML=`<svg viewBox="0 0 ${YW} ${YH+30}" role="img" aria-label="Mama na Mtoto monthly box price over 24 months">${[0,.5,1].map(f=>`<line x1="36" x2="${YW}" y1="${(YH-f*YH/1.1).toFixed(1)}" y2="${(YH-f*YH/1.1).toFixed(1)}" stroke="rgba(255,255,255,.07)"/><text x="32" y="${(YH-f*YH/1.1+3).toFixed(1)}" text-anchor="end" font-size="9" fill="#6a8a7d" font-family="JetBrains Mono, monospace">${Math.round(f*ymx/1.1/1000)}k</text>`).join('')}${yr.map((x,i)=>{const h=x.price/ymx*YH;return `<rect x="${(40+i*bw+1.5).toFixed(1)}" y="${(YH-h).toFixed(1)}" width="${(bw-3).toFixed(1)}" height="${h.toFixed(1)}" rx="2" fill="${cols[x.st]}" opacity=".8"><title>Month ${i+1}: ${T(x.price)}</title></rect>${(i%3===0)?`<text x="${(40+i*bw+bw/2).toFixed(1)}" y="${YH+13}" text-anchor="middle" font-size="9" fill="#6a8a7d" font-family="JetBrains Mono, monospace">${i+1}</text>`:''}`}).join('')}<text x="${40}" y="${YH+27}" font-size="9" fill="#a9c4b8" font-family="Manrope, Arial, sans-serif">Month · pink 0–3 m · gold 3–6 m · green 6–12 m · mint toddler</text></svg>`;
 go('mama');}
window.SECTIONS['s3-5']={render:s35,init:initS35};









/* ---- shared editorial photo components (edp-) · real concept photographs in designed layouts ---- */
addCSS('edp-photo',`
.edp-ph{position:relative;margin:0;border-radius:22px;overflow:hidden;border:1px solid var(--edge2);background:#03100c;box-shadow:0 30px 70px -45px rgba(95,191,143,.35);min-width:0}
.edp-ph img{display:block;width:100%;height:auto;aspect-ratio:16/10;object-fit:cover;transition:transform 1.4s cubic-bezier(.2,.7,.2,1)}
.edp-ph:hover img{transform:scale(1.035)}
.edp-ph figcaption,.edp-bc{position:absolute;left:14px;bottom:12px;z-index:2;font:500 .56rem var(--f-hud);letter-spacing:.16em;text-transform:uppercase;color:#effaf5;background:rgba(2,6,8,.6);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);padding:6px 10px;border-radius:999px;border:1px solid rgba(255,255,255,.08);max-width:calc(100% - 28px)}
.edp-ph.has-ov figcaption{top:12px;bottom:auto}
.edp-ov{position:absolute;left:0;right:0;bottom:0;z-index:1;padding:56px 20px 18px;background:linear-gradient(to top,rgba(2,6,8,.95) 10%,rgba(2,6,8,.6) 55%,rgba(2,6,8,0))}
.edp-ov b{display:block;font:700 1rem/1.25 var(--f-display);color:#fff}
.edp-ov span{display:block;font-size:.84rem;color:#d3e6dd;line-height:1.5;margin-top:5px}
.edp-k{display:block;font:500 .62rem var(--f-hud);letter-spacing:.22em;text-transform:uppercase;color:var(--gold);margin-bottom:10px}
.edp-feat{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);gap:clamp(18px,3.2vw,44px);align-items:center}
.edp-feat.rev>.edp-ph{order:2}
.edp-feat h3,.edp-tile h3,.edp-band h3{font:700 clamp(1.12rem,1.7vw,1.5rem)/1.22 var(--f-display);margin:0 0 12px;color:var(--ink);letter-spacing:-.01em}
.edp-body{min-width:0}
.edp-body p,.edp-band p{color:var(--ink2);font-size:.95rem;line-height:1.68;margin:0 0 12px}
.edp-body p b,.edp-band p b,.edp-tile p b{color:var(--ink)}
.edp-facts{list-style:none;padding:0;margin:16px 0 0;border-top:1px solid var(--edge)}
.edp-facts li{display:flex;justify-content:space-between;align-items:baseline;gap:16px;padding:10px 0;border-bottom:1px solid var(--edge);font-size:.86rem;color:var(--ink2)}
.edp-facts li b{font:500 .86rem var(--f-hud);color:var(--neon2);text-align:right;white-space:nowrap}
.edp-gal{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(0,1fr);grid-template-rows:1fr 1fr;gap:14px}
.edp-gal .edp-ph:first-child{grid-row:1/3}
.edp-gal .edp-ph:first-child img{aspect-ratio:16/11;height:100%}
.edp-gal .edp-ph:not(:first-child){min-height:170px}
.edp-gal .edp-ph:not(:first-child) img{position:absolute;inset:0;height:100%;aspect-ratio:auto}
.edp-tiles{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
.edp-tiles.c2{grid-template-columns:repeat(2,minmax(0,1fr))}
.edp-tiles.c4{grid-template-columns:repeat(4,minmax(0,1fr))}
.edp-tile{border-radius:22px;border:1px solid var(--edge);background:linear-gradient(170deg,var(--panel2),rgba(2,6,8,.7));overflow:hidden;min-width:0;display:flex;flex-direction:column}
.edp-tile .edp-ph{border:0;border-radius:0;box-shadow:none}
.edp-tile .edp-tb{padding:18px 20px 22px}
.edp-tile h3{font-size:1.02rem;margin-bottom:8px}
.edp-tile p{margin:0;color:var(--ink2);font-size:.88rem;line-height:1.62}
.edp-tile small{display:block;margin-top:12px;padding-top:10px;border-top:1px solid var(--edge);font:500 .6rem var(--f-hud);letter-spacing:.14em;text-transform:uppercase;color:var(--gold)}
.edp-band{position:relative;margin:0;border-radius:26px;overflow:hidden;border:1px solid var(--edge2);min-height:440px;display:flex;align-items:flex-end;background:#03100c}
.edp-band>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.edp-band::before{content:'';position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,rgba(2,6,8,.95) 0%,rgba(2,6,8,.8) 36%,rgba(2,6,8,.1) 72%,rgba(2,6,8,0))}
.edp-band .edp-bc{top:14px;bottom:auto;left:auto;right:14px}
.edp-bt{position:relative;z-index:2;max-width:540px;padding:clamp(22px,4vw,46px)}
.edp-pair{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:14px}
@media(max-width:900px){.edp-feat{grid-template-columns:1fr}.edp-feat.rev>.edp-ph{order:0}.edp-tiles,.edp-tiles.c4{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:620px){.edp-gal{grid-template-columns:1fr;grid-template-rows:auto}.edp-gal .edp-ph:first-child{grid-row:auto}.edp-gal .edp-ph:not(:first-child){min-height:0}.edp-gal .edp-ph img,.edp-gal .edp-ph:not(:first-child) img{position:static;aspect-ratio:16/10;height:auto}
 .edp-tiles,.edp-tiles.c2,.edp-tiles.c4,.edp-pair{grid-template-columns:1fr}
 .edp-band{min-height:0;display:block}.edp-band>img{position:static;aspect-ratio:16/10;height:auto}.edp-band::before{display:none}.edp-bt{padding:20px 18px 22px;background:linear-gradient(170deg,var(--panel2),rgba(2,6,8,.85))}
 .edp-ov{padding:40px 14px 12px}.edp-ov span{font-size:.8rem}
 .edp-facts li{flex-wrap:wrap;gap:2px 12px}.edp-facts li b{white-space:normal;text-align:left}}
`);
const PH=(f,alt,cap,o={})=>`<figure class="edp-ph${o.ov?' has-ov':''}${o.cls?' '+o.cls:''}"><img src="img/${f}.webp" width="1680" height="944" loading="lazy" alt="${esc(alt)}"${o.pos?` style="object-position:${o.pos}"`:''}><figcaption>Concept image · ${cap}</figcaption>${o.ov?`<div class="edp-ov"><b>${o.ov[0]}</b><span>${o.ov[1]}</span></div>`:''}</figure>`;
const FEAT=o=>`<div class="edp-feat${o.rev?' rev':''}">${PH(o.f,o.alt,o.cap,{pos:o.pos})}<div class="edp-body">${o.k?`<span class="edp-k">${o.k}</span>`:''}<h3>${o.h}</h3>${o.body}${o.facts?`<ul class="edp-facts">${o.facts.map(x=>`<li><span>${x[0]}</span><b>${x[1]}</b></li>`).join('')}</ul>`:''}</div></div>`;
const GAL=a=>`<div class="edp-gal">${a.map(x=>PH(x.f,x.alt,x.cap,{pos:x.pos,ov:x.ov})).join('')}</div>`;
const TILES=(a,c)=>`<div class="edp-tiles${c?' c'+c:''}">${a.map(x=>`<article class="edp-tile">${PH(x.f,x.alt,x.cap,{pos:x.pos,cls:x.cls})}<div class="edp-tb">${x.k?`<span class="edp-k">${x.k}</span>`:''}<h3>${x.h}</h3><p>${x.p}</p>${x.s?`<small>${x.s}</small>`:''}</div></article>`).join('')}</div>`;
const BAND=o=>`<figure class="edp-band"><img src="img/${o.f}.webp" width="1680" height="944" loading="lazy" alt="${esc(o.alt)}"${o.pos?` style="object-position:${o.pos}"`:''}><figcaption class="edp-bc">Concept image · ${o.cap}</figcaption><div class="edp-bt">${o.k?`<span class="edp-k">${o.k}</span>`:''}<h3>${o.h}</h3>${o.body}</div></figure>`;
/* ---- end edp ---- */
addCSS('p3b-dc2',`
.p3b-gift::before,.p3b-gift::after{display:none}
.p3b-gift{background:linear-gradient(150deg,#0f7a52,#0a4f36);box-shadow:inset 0 0 0 1px rgba(255,231,168,.25)}
.p3b-gift>div:first-child::after{content:"";display:block;width:56px;height:1px;margin-top:12px;background:linear-gradient(90deg,#f2c96b,transparent)}
.p3b-roycrop{overflow:hidden}
.p3b-roycrop img{aspect-ratio:4/3!important;transform:scale(1.75);transform-origin:52% 98%}
.p3b-roycrop:hover img{transform:scale(1.8)}
.p3b-shop{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
.p3b-wp .im.ph{height:92px;opacity:1;background-color:#f4f6f5;background-repeat:no-repeat;border:1px solid #e3ebe7}
`);
/* ======================================================================
   3.6 THE PRODUCT RANGE
   ====================================================================== */
const K6=['md','ecom'];
// [name, zone, typical use, brand options, low, high, registration class]
const CAT=[
 ['Disposable nappies (by size)','mb','Daily baby care; sold in the baby’s exact size',5,18000,32000,'G'],['Baby wipes','mb','Nappy changes and quick clean-ups',5,4000,8000,'G'],['Baby lotion and cream','mb','Daily skin care for babies',5,6000,14000,'C'],['Nappy-rash cream','mb','Protects and soothes irritated skin',4,7000,15000,'C'],
 ['Feeding bottles and teats','mb','Bottle feeding, sized by age',5,8000,20000,'G'],['Bottle steriliser','mb','Steam-cleans bottles at home',4,45000,110000,'G'],['Digital thermometer','mb','Checks a fever in seconds',5,8000,18000,'D'],['Nasal aspirator','mb','Clears a baby’s blocked nose',4,6000,15000,'D'],
 ['Breast pads','mb','Comfort for breastfeeding mothers',4,7000,14000,'G'],['Maternity pads','mb','After-birth care',4,6000,12000,'G'],['Baby bath set','mb','Gentle wash, shampoo and sponge',4,15000,35000,'C'],['Teething rings and gel','mb','Soothes sore gums',4,5000,12000,'G'],
 ['Upper-arm blood-pressure monitor','hd','Home BP readings, the most accurate type for daily use',5,45000,95000,'D'],['Wrist blood-pressure monitor','hd','Portable BP checks for travel',4,35000,70000,'D'],['Glucose meter starter kit','hd','Meter, first strips and lancing device',5,35000,75000,'D'],['Glucose test strips (50)','hd','Daily sugar readings; always matched to the meter',5,30000,60000,'D'],
 ['Lancets (100)','hd','Single-use finger-prick needles',5,8000,16000,'D'],['Insulin pen needles','hd','For insulin pens prescribed by a doctor',4,20000,40000,'D'],['Diabetic foot cream','hd','Prevents dry, cracked feet',4,10000,22000,'C'],['Diabetic socks','hd','Seam-free, non-binding socks',4,8000,18000,'G'],
 ['Weekly pill organiser','hd','Never miss or double a dose',5,4000,12000,'G'],['Pulse oximeter','hd','Oxygen level and pulse at the fingertip',5,25000,55000,'D'],['Digital bathroom scale','hd','Tracks weight at home',5,25000,60000,'G'],['Sugar-free sweetener','hd','A swap for sugar in tea',4,6000,14000,'G'],
 ['Walking stick','mr','Balance support, adjustable height',5,15000,40000,'D'],['Crutches (pair)','mr','Short-term support after injury',4,40000,90000,'D'],['Knee support brace','mr','Stability for weak or injured knees',5,15000,40000,'D'],['Back support belt','mr','Lower-back support for lifting and posture',5,20000,50000,'D'],
 ['Cervical collar','mr','Neck support after strain',4,15000,35000,'D'],['Hot and cold packs','mr','Pain relief and swelling control',5,6000,15000,'G'],['Compression stockings','mr','Circulation support, by size',4,25000,60000,'D'],['Resistance bands','mr','Home physiotherapy exercises',4,10000,28000,'G'],
 ['Massage gel','mr','Muscle comfort after exercise',4,8000,18000,'C'],['Post-surgery wound dressings','mr','Sterile dressings for healing wounds',5,10000,25000,'D'],['Ankle support','mr','Stability after a sprain',4,12000,30000,'D'],['TENS pain-relief unit','mr','Drug-free pain relief pads',4,60000,140000,'D'],
 ['Home first-aid kit','fa','Everything for cuts, burns and sprains',5,25000,60000,'D'],['Plasters, assorted','fa','Small cuts and blisters',5,3000,8000,'D'],['Sterile gauze and tape','fa','Covers larger wounds',5,4000,10000,'D'],['Antiseptic solution','fa','Cleans cuts and grazes',5,5000,12000,'M'],
 ['Elastic bandages','fa','Sprains and support',5,4000,9000,'D'],['Burn gel','fa','Cools minor burns',4,8000,18000,'D'],['Disposable gloves (100)','fa','Hygiene for carers and first aid',5,15000,30000,'D'],['Face masks (50)','fa','Protection when someone is unwell',5,10000,22000,'D'],
 ['Mosquito repellent','fa','Protection against bites',5,6000,15000,'C'],['Hand sanitiser','fa','Clean hands without water',5,4000,10000,'C'],['Office first-aid kit','fa','Workplace kit, with refill service',4,90000,180000,'D'],['Oral rehydration salts','fa','Replaces fluids after diarrhoea',4,2000,6000,'M'],
 ['Sensitive toothpaste','pc','Daily oral care for sensitive teeth',5,4000,10000,'C'],['Soft toothbrushes','pc','Gentle on gums',5,3000,8000,'G'],['Sanitary pads','pc','Monthly care, day and night',5,3000,7000,'G'],['Body wash','pc','Daily wash, gentle formulas',5,6000,15000,'C'],
 ['Deodorant','pc','All-day freshness',5,7000,16000,'C'],['Sunscreen SPF 50','pc','Daily sun protection',5,18000,40000,'C'],['Face moisturiser','pc','Hydration for every skin type',5,12000,30000,'C'],['Hair and scalp care','pc','Shampoo, conditioner, scalp oil',5,8000,20000,'C'],
 ['Men’s shaving kit','pc','Razor, gel and after-shave balm',5,8000,20000,'G'],['Intimate wash','pc','pH-balanced feminine hygiene',4,8000,16000,'C'],['Lip balm','pc','Dry-lip care',4,3000,7000,'C'],['Electric toothbrush','pc','Better plaque control',4,40000,90000,'G'],
 ['Adult diapers','sr','Continence care, by size and absorbency',5,22000,40000,'G'],['Bed underpads','sr','Protects the bed overnight',5,15000,30000,'G'],['Barrier cream','sr','Protects fragile skin',5,10000,22000,'C'],['Walking frame','sr','Stable support at home',4,70000,130000,'D'],
 ['Shower chair','sr','Safe seated bathing',4,60000,120000,'G'],['Reading magnifier','sr','Reading labels and small print',4,10000,25000,'G'],['Pill splitter and crusher','sr','Makes tablets easier to take',4,3000,8000,'G'],['Bathroom grab bar','sr','Prevents falls',4,25000,55000,'G'],
 ['Non-slip mat','sr','Safer bathroom floor',5,12000,28000,'G'],['Personal sound amplifier','sr','Helps with mild hearing difficulty',4,40000,90000,'D'],['Pressure-relief cushion','sr','Comfort for long sitting',4,50000,110000,'D'],['Large-display BP monitor','sr','Easy-to-read numbers for older eyes',4,55000,100000,'D']];
const REG={D:['Medical device','TMDA registration required before import or sale (low-risk Class A may be exempt)'],C:['Cosmetic','TMDA cosmetic notification/registration and Kiswahili or English labelling'],M:['Non-prescription medicine','TMDA-registered product; sold only where the store’s Pharmacy Council permit allows (to confirm)'],G:['General health product','Quality standard and label checked on receipt (TBS where applicable)']};
function donut(){const tot=ZN.reduce((a,z)=>a+z.fam,0),c=170,r=120,w=46;let a0=-90;
 return `<svg viewBox="0 0 340 340" role="img" aria-label="Product families by Care Zone">${ZN.map((z,i)=>{const a1=a0+z.fam/tot*360-1.2;const pth=ARC(c,c,r,a0,a1);const mid=(a0+a1)/2*Math.PI/180;a0+=z.fam/tot*360;
  return `<path class="sg" data-z="${z.k}" d="${pth}" fill="none" stroke="${z.c}" stroke-width="${w}"><title>${esc(z.n)}: ${z.fam}</title></path><text x="${(c+r*Math.cos(mid)).toFixed(1)}" y="${(c+r*Math.sin(mid)+4).toFixed(1)}" text-anchor="middle" font-family="JetBrains Mono" font-size="12" fill="#04110d" pointer-events="none">${z.fam}</text>`}).join('')}
 <text x="${c}" y="${c-8}" text-anchor="middle" font-family="Unbounded" font-weight="700" font-size="34" fill="#effaf5">~${I.product_families}</text><text x="${c}" y="${c+16}" text-anchor="middle" font-family="JetBrains Mono" font-size="10" letter-spacing="2" fill="#a9c4b8">PRODUCT FAMILIES</text><text x="${c}" y="${c+34}" text-anchor="middle" font-family="Manrope" font-size="11" fill="#f2c96b">${I.brands_per_item} brands each</text></svg>`}

function s36(s,p,pv,nx){const skus=Math.round(I.product_families*4.5),stock=I.seed.use[1][1];
 const mods=[
 ['The problem it solves',`<div class="plain"><span class="modno" style="margin:0 0 12px">In plain words</span><ol>
  <li><b>Too much choice, too little help.</b> A typical shelf shows twenty kinds of the same item with no guidance. A father buying his first blood-pressure monitor cannot tell which one is accurate, which one fits his arm, or why one costs twice as much.</li>
  <li><b>Too little trust.</b> Registered, fake and expired goods sit side by side. Medical devices must by law be registered with the authority before they are imported or sold ${cn(K6,'md')}, but customers have no easy way to check.</li>
  <li><b>Things are scattered.</b> Nappies are in the supermarket, the thermometer in the pharmacy, the walking frame somewhere across town. Online, most Tanzanians buy through social-media pages and pay by mobile money or on delivery ${cn(K6,'ecom')}, with no catalogue they can rely on.</li>
  <li><b>So the range itself must be the advice.</b> Fewer, better products, each one registered, each with a short “best for” line, organised by the life situation of the person who needs it.</li></ol></div>`],
 ['Our answer · ~520 families, 4–5 brands, six zones',`<div class="p3b-zone"><div>${donut()}</div><div><p class="s11lead">The whole range is about <b>${I.product_families} product families</b> (a family is one kind of product, such as “upper-arm blood-pressure monitor”). Each family has <b>${I.brands_per_item} registered brands in the same price range</b>, so whichever a customer picks is a safe choice. Families sit in six Care Zones; tap a zone to see its share and filter the explorer below.</p><div class="p3b-zl" id="p3bZL">${ZN.map(z=>`<button type="button" data-z="${z.k}" style="--c:${z.c}"><i></i><span><b>${esc(z.n)}</b><small>${CAT.filter(x=>x[1]===z.k).length} sample families shown below</small></span><em>${z.fam}</em><span class="bar"><span style="width:${z.fam/120*100}%"></span></span></button>`).join('')}</div></div></div>
  <p class="note">Split of families between zones is a planning estimate · total of ${I.product_families} from the master model</p>`],
 ['The six Care Zones, in product',`<p class="s11lead">Each zone is built around a person and a situation, not a product category. The concept images below show the kind of everyday essentials each zone holds. ${tagi('Concept images · example products, final range and brands set by the buyer')}</p>
  ${TILES([
   {f:'prod-baby',alt:'Concept image: flat lay of baby care essentials: nappies, wipes, lotion, feeding bottle, thermometer, hairbrush',cap:'Mother &amp; Baby',k:`Zone 1 · about ${Z('mb').fam} families`,h:'Mother &amp; Baby',p:'For an expectant mother, a new mama and a toddler. Nappies in every size, wipes, gentle skin care, feeding bottles and sterilisers, a baby thermometer, breast and maternity pads. The single most repeated shopping list in a household, and the base of the mother &amp; baby Afya Box.',s:'Who: Mama Neema, baby of 6 months'},
   {f:'prod-heart',alt:'Concept image: flat lay of heart and diabetes care: blood-pressure monitor, glucose meter, test strips, pill organiser, diabetic socks',cap:'Heart &amp; Diabetes',k:`Zone 2 · about ${Z('hd').fam} families`,h:'Heart &amp; Diabetes',p:'For people managing blood pressure or blood sugar every day. Upper-arm monitors, glucose meters with matched strips and lancets, pill organisers, diabetic socks and foot cream. Placed opposite the Afya Check, so a raised reading leads straight to the right, validated device.',s:'Who: Baba Juma, 48, diabetic'},
   {f:'prod-firstaid',alt:'Concept image: flat lay of recovery and first-aid supplies: bandages, sterile dressings, gauze, cold packs, gloves and scissors',cap:'Mobility &amp; Recovery',k:`Zone 3 · about ${Z('mr').fam} families`,h:'Mobility &amp; Recovery',p:'For the weeks after an operation, a sprain or a fall. Bandages and sterile dressings, hot and cold packs, knee and back supports, resistance bands, crutches and walking aids, with rentals on show. The store lead, a physiotherapy graduate, fits supports here.',s:'Who: a young man after knee surgery'},
   {f:'prod-kids',alt:'Concept image: flat lay of family and home first-aid items: a first-aid pouch, thermometer, plasters, sanitiser, repellent, toothbrush, water bottle',cap:'First Aid &amp; Home',k:`Zone 4 · about ${Z('fa').fam} families`,h:'First Aid &amp; Home',p:'For the small emergencies every home has: a cut, a burn, a fever at night, a child with diarrhoea. First-aid kits, plasters, antiseptic, burn gel, ORS, mosquito repellent and hand sanitiser, plus office kits with a refill service for companies.',s:'Who: every household, every school'},
   {f:'prod-care',alt:'Concept image: flat lay of personal care: body wash, lotions, sanitary pads, toothbrushes, deodorant and skin care',cap:'Personal Care',k:`Zone 5 · about ${Z('pc').fam} families`,h:'Personal Care',p:'For daily hygiene and confidence: sanitary pads, intimate wash, toothpaste and soft brushes, body wash, deodorant, sunscreen and skin care. Fast-moving lines that bring people back every few weeks and fill the personal hygiene and women’s beauty boxes.',s:'Who: a student, a working woman'},
   {f:'prod-senior',alt:'Concept image: flat lay of elderly care: adult diapers, underpads, barrier cream, walking stick, reacher and a magnifier',cap:'Seniors',k:`Zone 6 · about ${Z('sr').fam} families`,h:'Seniors',p:'For older people and the relatives who care for them: adult diapers and underpads by size, barrier cream, a large-display BP monitor, a walking stick, a reacher, a magnifier and bathroom safety. Often bought by a granddaughter or a son abroad, which is why the Senior card has carer access.',s:'Who: Bibi Zawadi, 78, and her carer'}])}`],
 ['How it works · how the range is chosen and reviewed',`<div class="p3b-pipe">
   <div><b>Start from the need</b><p>For each Care Zone, list what a household in that situation uses in a normal month and in an emergency.</p><small>Advisers + founders</small></div>
   <div><b>Shortlist brands</b><p>Find 6–8 candidate brands per family from suppliers in China and India and local distributors, within one price range.</p><small>Buyer · section 4.2</small></div>
   <div><b>Check and register</b><p>Confirm TMDA registration (or the right exemption), labels, shelf life and samples. Anything that fails is dropped.</p><small>Quality lead · section 4.5</small></div>
   <div><b>Keep the best 4–5</b><p>Write the “best for” card for each: who it suits, what is different, warranty.</p><small>Catalogue in the one system</small></div>
   <div><b>Review every quarter</b><p>Sales, swaps, returns and complaints decide: keep, replace or remove. One in, one out keeps the range near ${I.product_families}.</p><small>Quarterly range review</small></div></div>`],
 ['Curation rules · what earns a place on the shelf',`<div class="p3b-rules">
   <div class="p3b-rule"><span class="n">01</span><b>Registered only</b><p>Every medical device, cosmetic or medicine is registered or notified with TMDA where the law requires it. The registration number is stored on the product record and printed on the shelf screen.</p></div>
   <div class="p3b-rule"><span class="n">02</span><b>Quality-checked</b><p>New brands are sampled before listing: packaging, labels in Kiswahili or English, batch numbers, and for devices a test against a reference (for example, a BP monitor against the clinic standard).</p></div>
   <div class="p3b-rule"><span class="n">03</span><b>Expiry control</b><p>First-expiry-first-out by batch. Planning rule: goods must arrive with at least two-thirds of their shelf life left, and are removed from sale 90 days before expiry. ${PE}</p></div>
   <div class="p3b-rule"><span class="n">04</span><b>One honest price</b><p>All 4–5 brands in a family sit in one price range, with one printed price each, identical in store, app and WhatsApp. No haggling, no hidden mark-ups.</p></div></div>`],
 ['The experience · the “best for” card',`<figure class="shot"><img src="img/interior.webp" width="1680" height="944" loading="lazy" alt="Concept image of the Afya Basics store interior with lit white display towers and digital shelf labels"><figcaption>Concept image · lit display towers, one Care Zone per tower</figcaption></figure>
  <div class="edp-pair" style="margin-top:14px">${PH('team','Concept image of advisers at the counter ready to explain a best-for card','advisers explain the card when asked',{pos:'50% 30%'})}${PH('prod-heart','Concept image of heart and diabetes devices laid out side by side','4–5 options of one family, side by side',{pos:'60% 40%'})}</div>
  <p class="s11lead" style="margin-top:18px">In the store, each family sits on one lit shelf with its 4–5 brands side by side. A digital label shows the price and a short “best for” line for each brand, the same text the app and WhatsApp show. A customer who knows what they want takes it and pays; a customer who is unsure reads the card or asks an adviser. The explorer below shows what these cards look like. ${tagi('Illustrative')}</p>
  <p class="s11lead">A worked example. A father in Mwenge comes in for his first upper-arm blood-pressure monitor. The shelf shows five registered brands in one price band. Brand A: <i>best for most households</i>. Brand B: <i>best for the lowest price</i>. Brand C: <i>best for a large arm, comes with a wide cuff</i>. Brand D: <i>best for older eyes, large display</i>. Brand E: <i>best for a longer warranty</i>. He does not need to understand accuracy standards: every one of the five has passed the same registration and sample check. He only needs to choose what fits his life. ${tagi('Illustrative')}</p>`],
 ['Try it · the catalogue explorer',`<p class="s11lead">A representative sample of ${CAT.length} of the ~${I.product_families} product families. Search by name or use (try “fever”, “walking” or “strips”), filter by Care Zone, and tap a family to open its “best for” card. No brand names are shown; Brand A–E stand in for the registered brands the buyer will select.</p>
  <div class="p3b-xbar"><input type="search" id="p3bQ" placeholder="Search families or uses…" aria-label="Search the catalogue"><span class="p3b-count" id="p3bCount"></span></div>
  <div class="p3b-chips" id="p3bZC" style="margin-bottom:14px"><button type="button" class="on" data-z="">All zones</button>${ZN.map(z=>`<button type="button" data-z="${z.k}" style="--c:${z.c}"><i></i>${esc(z.n)}</button>`).join('')}</div>
  <div class="p3b-xwrap"><div class="p3b-grid" id="p3bGrid"></div><div class="p3b-detail" id="p3bDet"></div></div>
  <p class="note">Price bands are planning estimates to be verified with supplier quotations · registration classes are indicative and confirmed product by product</p>`,'p3b-explorer'],
 ['Sourcing · where the range comes from',`${TILES([
   {f:'prod-heart',alt:'Concept image: flat lay of devices such as a blood-pressure monitor and glucose meter',cap:'devices from China and India',k:'China and India',h:'Most goods, imported legally',p:'Devices, disposables and many personal-care lines come from manufacturers in China and India, bought direct or through registered agents. Each import goes through TMDA registration where required, customs and TRA duties. A BP monitor that leaves a factory at about US$10 lands in Dar at roughly 1.6–1.7 times that once freight, duty and clearing are added (worked example in section 4.2).',s:'Landed cost · section 4.2'},
   {f:'prod-baby',alt:'Concept image: flat lay of nappies, wipes and baby care',cap:'fast lines bought locally',k:'Local distributors',h:'Fast lines and back-up',p:'Fast-moving items such as nappies, pads and soaps are bought from licensed Tanzanian distributors where prices match, delivered weekly, so cash is not tied up in a container. They are also the second source if a ship is late: every key family has at least two approved suppliers.',s:'Two suppliers per key family'},
   {f:'hub',alt:'Concept image of staff receiving and packing goods in the Afya hub',cap:'receiving at the hub',k:'Why curation helps buying',h:'Fewer lines, bigger orders',p:`Holding ~${I.product_families} families instead of thousands of random lines means larger orders per item, better prices from each supplier and easier quality checks on receipt. Afya Box locks add a known monthly demand on top: the buyer knows, twelve days ahead, how many packs of each brand members need.`,s:'Known demand from box locks'}])}`],
 ['The numbers',`<div class="nums p3b-nums"><div class="num"><b>~${I.product_families}</b><span>product families</span></div><div class="num"><b>~${skus.toLocaleString('en-US')}</b><span>brand lines (families × ~4.5) ${PE}</span></div><div class="num"><b>${F.m(stock)}</b><span>opening stock in the seed plan</span></div><div class="num"><b>${kk(stock/I.product_families)}</b><span>average opening stock per family ${PE}</span></div><div class="num g"><b>${F.pct(I.store.retail_gm)}</b><span>retail gross margin, store sales</span></div></div>
  <div class="p3b-tw" style="margin-top:14px"><table class="p3b-table"><thead><tr><th>Care Zone</th><th>Families</th><th>Share</th><th>Opening stock at average</th></tr></thead><tbody>${ZN.map(z=>`<tr><td><b style="color:${z.c}">${esc(z.n)}</b></td><td class="n">${z.fam}</td><td class="n">${F.pct(z.fam/I.product_families)}</td><td class="n">${F.m(stock*z.fam/I.product_families)}</td></tr>`).join('')}</tbody></table></div>
  <p class="note">Zone split and stock per zone are planning estimates · opening stock and margin from the master model</p>`],
 ['Risks and our answer',`<div class="risks">
  <div class="risk"><span class="q">Registration takes longer than planned for some brands.</span><span class="ar">→</span><span class="a">Launch with brands already registered in Tanzania; add new imports as their registrations arrive. A family can open with 3 brands and grow to 5.</span></div>
  <div class="risk"><span class="q">Too narrow a range sends customers elsewhere.</span><span class="ar">→</span><span class="a">Requests are logged at the counter, in the app and on WhatsApp; the quarterly review adds families that customers keep asking for.</span></div>
  <div class="risk"><span class="q">Expired or slow stock eats margin.</span><span class="ar">→</span><span class="a">First-expiry-first-out by batch, alerts 90 days before expiry, and Afya Box locks that turn known demand into orders.</span></div>
  <div class="risk"><span class="q">Selling non-prescription medicines needs the right permit.</span><span class="ar">→</span><span class="a">Medicines are a small part of the range and are listed only once the store’s Pharmacy Council permit is confirmed (section 7.1).</span></div></div>`]];
 return secShell({s,p,pv,nx,img:'img/interior.webp',imgAlt:'Concept image of the Afya Basics store interior with lit display towers',
  h1:'Fewer products, better chosen,',em:'every one a safe choice.',
  lede:`About ${I.product_families} product families across six Care Zones, each with ${I.brands_per_item} registered brands in the same price range and a short “best for” card, so the right product is found first time.`,mods,
  takeaway:'A curated, registered range turns <b>trust into a reason to switch</b>, and fewer, bigger buying lines <b>protect margin</b> as stores multiply.',
  doors:['s4-2','s4-5','s3-1','s3-5'],sources:src(K6)})}

function initS36(){const g=document.getElementById('p3bGrid');if(!g)return;let zf='',q='',cur=0;
 const det=document.getElementById('p3bDet');
 const showDet=i=>{cur=i;const x=CAT[i],z=Z(x[1]),r=REG[x[6]];const opts=Array.from({length:x[3]},(_,j)=>x[4]+(x[5]-x[4])*[0.5,0.15,0.7,0.35,0.9][j]);
  det.innerHTML=`<span class="p3b-k" style="color:${z.c}">${esc(z.n)}</span><h3>${esc(x[0])}</h3><p>${esc(x[2])}.</p><span class="p3b-reg">${r[0]}</span><p style="font-size:.8rem">${esc(r[1])}</p>
  <div class="p3b-bf"><small>“Best for” card · in-store screen and app</small><div>${opts.map((p,j)=>`<b>Brand ${'ABCDE'[j]}</b><em>${kk(p)}</em><span>Best for: ${esc(['most households','the lowest price','larger families or heavy use','sensitive users','a longer warranty'][j])}</span>`).join('')}</div></div>
  <p style="font-size:.78rem;color:var(--ink3)">Price band ${bnd(x[4],x[5])} · ${x[3]} brand options · ${PE}</p>`;
  g.querySelectorAll('.p3b-it').forEach(b=>b.classList.toggle('on',+b.dataset.i===i))};
 const list=()=>{const qq=q.trim().toLowerCase();const hits=CAT.map((x,i)=>[x,i]).filter(([x])=>(!zf||x[1]===zf)&&(!qq||(x[0]+' '+x[2]).toLowerCase().includes(qq)));
  g.innerHTML=hits.length?hits.map(([x,i])=>`<button type="button" class="p3b-it" data-i="${i}" style="--c:${Z(x[1]).c}"><b>${esc(x[0])}</b><small>${esc(x[2])}</small><span><i style="font-style:normal">${x[3]} brands</i><i style="font-style:normal">${bnd(x[4],x[5])}</i></span></button>`).join(''):`<p style="color:var(--ink2);grid-column:1/-1">No family matches “${esc(q)}” in this sample. In the real catalogue the request would be logged for the range review.</p>`;
  document.getElementById('p3bCount').textContent=hits.length+' of '+CAT.length+' sample families';
  g.querySelectorAll('.p3b-it').forEach(b=>b.onclick=()=>showDet(+b.dataset.i));
  if(hits.length&&!hits.some(h=>h[1]===cur))showDet(hits[0][1]);else if(hits.length)showDet(cur)};
 const setZ=z=>{zf=z;document.querySelectorAll('#p3bZC button').forEach(b=>b.classList.toggle('on',b.dataset.z===z));
  document.querySelectorAll('#p3bZL button').forEach(b=>b.classList.toggle('on',b.dataset.z===z));
  document.querySelectorAll('.p3b-zone path.sg').forEach(p=>{p.classList.toggle('on',p.dataset.z===z);p.classList.toggle('dim',!!z&&p.dataset.z!==z)});list()};
 document.querySelectorAll('#p3bZC button').forEach(b=>b.onclick=()=>setZ(b.dataset.z));
 document.querySelectorAll('#p3bZL button,.p3b-zone path.sg').forEach(b=>b.addEventListener('click',()=>setZ(zf===b.dataset.z?'':b.dataset.z)));
 document.getElementById('p3bQ').oninput=e=>{q=e.target.value;list()};list()}
window.SECTIONS['s3-6']={render:s36,init:initS36};

/* ======================================================================
   3.7 PREMIUM, GIFTS AND RENTALS
   ====================================================================== */
const K7=['rem','who','md'];
const ROYAL=I.cards.find(c=>c.key==='royal'),SENIOR=I.cards.find(c=>c.key==='senior');
// rental items: [name, retail buy price, weekly fee, refundable deposit, note] — planning estimates
const RENT=[['Wheelchair','Standard folding',350000,15000,100000,'Delivered, adjusted to the user, collected when no longer needed.'],
 ['Walking frame','Height-adjustable',90000,5000,30000,'Ideal for the weeks after a fall or a hip operation.'],
 ['Hospital bed','Manual, two-crank, with mattress',1600000,60000,300000,'Delivered and assembled at home by two staff; mattress cover replaced for every renter.'],
 ['Oxygen concentrator','5 litres per minute',2200000,90000,500000,'Rented only with a doctor’s written oxygen prescription; setup explained at home.'],
 ['Nebuliser','Compressor type',120000,8000,40000,'Each renter buys a new personal mask and tubing kit; the machine is cleaned and tested.'],
 ['Breast pump','Electric, double',250000,12000,60000,'Each mother buys her own new milk-contact kit; the motor unit is cleaned and tested.']];
const GIFTS=[['New baby','mama','A new baby in the family'],['Expecting mother','preg','For a mama mjamzito'],['Get well soon','rec','Back home after hospital'],['For a parent at home','senior','Care for Mama or Baba'],['Thank you','glow','A thank-you that is useful'],['Any occasion','card','A gift card, they choose']];
const CARDV=[25000,50000,100000,250000];
const ROYALPACK=15000;

function rentChart(it,weeks){const W=520,H=170,pd=34,max=Math.max(it[2],it[4]+it[3]*26)*1.05;const x=w=>pd+w/26*(W-pd*2),y=v=>H-pd+4-(v/max)*(H-pd*1.6);
 const rent=Array.from({length:27},(_,w)=>`${x(w).toFixed(1)},${y(it[3]*w).toFixed(1)}`).join(' ');const be=Math.ceil(it[2]/it[3]);
 return `<svg class="p3b-chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Rent versus buy over 26 weeks">
 <line x1="${pd}" y1="${y(0)}" x2="${W-pd}" y2="${y(0)}" stroke="rgba(169,196,184,.3)"/>
 <line x1="${pd}" y1="${y(it[2])}" x2="${W-pd}" y2="${y(it[2])}" stroke="#ff9b87" stroke-width="2" stroke-dasharray="5 5"/><text x="${W-pd}" y="${y(it[2])-6}" text-anchor="end" fill="#ff9b87" font-family="JetBrains Mono" font-size="10">BUY ${kk(it[2])}</text>
 <polyline points="${rent}" fill="none" stroke="#5fbf8f" stroke-width="2.5"/><text x="${x(26)}" y="${y(it[3]*26)+18}" text-anchor="end" fill="#5fbf8f" font-family="JetBrains Mono" font-size="10">RENT FEES (deposit refunded)</text>
 <line x1="${x(weeks)}" y1="${pd-14}" x2="${x(weeks)}" y2="${y(0)}" stroke="#f2c96b"/><circle cx="${x(weeks)}" cy="${y(it[3]*weeks)}" r="5" fill="#f2c96b"/>
 ${be<=26?`<text x="${x(be)}" y="${H-6}" text-anchor="middle" fill="#a9c4b8" font-family="JetBrains Mono" font-size="9">break-even wk ${be}</text>`:`<text x="${W-pd}" y="${H-6}" text-anchor="end" fill="#a9c4b8" font-family="JetBrains Mono" font-size="9">renting stays cheaper for 6+ months</text>`}
 ${[0,13,26].map(w=>`<text x="${x(w)}" y="${y(0)+14}" text-anchor="middle" fill="#6a8a7d" font-family="JetBrains Mono" font-size="9">${w}w</text>`).join('')}</svg>`}

function s37(s,p,pv,nx){const M=MODEL.get('base');const b2b2=M.years[1].revenue*I.growth.b2b_share;
 const mods=[
 ['The problem it solves',`<div class="plain"><span class="modno" style="margin:0 0 12px">In plain words</span><ol>
  <li><b>Gifts of care are hard to give well.</b> Visiting a new mother or a relative back from hospital, people bring something, but rarely the thing that is actually needed. A health gift that is useful, beautiful and delivered is hard to find.</li>
  <li><b>Families abroad want proof.</b> Tanzanians abroad sent home about TSh 3.3 trillion in the 2024/25 financial year ${cn(K7,'rem')}. A son in Dubai or London can send money, but cannot easily send the right care, or see that it arrived.</li>
  <li><b>Equipment is needed for weeks, not years.</b> After a fall or an operation, a family may need a wheelchair, a walking frame or a hospital bed for six weeks. Buying one costs a month’s income and then it sits in a corner.</li>
  <li><b>Some households want more.</b> Busy professionals and companies will pay for premium brands, a personal adviser and priority delivery, if the service is truly better.</li></ol></div>`],
 ['Our answer · four premium lines, one standard',`<p class="s11lead">The everyday store serves everyone. These four lines serve the moments when people want to give, to impress, to look after staff or to get through a few difficult weeks. They use the <b>same stock, the same advisers and the same riders</b>, so each shilling they bring in carries little extra fixed cost.</p>
  ${TILES([
   {f:'royal',alt:'Concept image: detail of the closed Afya Royal box in dark green with a satin ribbon',cap:'Afya Royal packaging, detail',cls:'p3b-roycrop',k:`Afya Royal · ${T(ROYAL.fee_year)} a year`,h:'The premium membership',p:`${esc(ROYAL.who)}. ${ROYAL.perks.map(esc).join(', ')}. Royal boxes come in the dark-green-and-gold box with the premium brand in each Afya Choice category. For a busy family in Masaki or Oyster Bay, the personal adviser is the real product: one person who knows the household’s sizes, conditions and preferences.`,s:'Premium brands · personal adviser'},
   {f:'boxdoor',alt:'Concept image of a rider handing a closed Afya Box to a mother with her baby at the door',cap:'a gift arrives at the door',pos:'55% 40%',k:'Gifts &amp; diaspora',h:'Care you can send in under 2 minutes',p:'Gift cards and gift boxes, bought in store, on the app or from abroad with an international card. The family receives a sealed box at the door; the sender receives a delivery photo and the time. A son in Muscat cannot carry a box to his mother, but he can see that it arrived.',s:'Photo proof to the sender'},
   {f:'prod-kids',alt:'Concept image of a first-aid pouch with family health items',cap:'office and school kits',pos:'50% 50%',k:'Corporate gifts',h:'Wellness for teams and clients',p:'Staff wellness boxes, client gifts in Royal packaging, and office first-aid kits with a quarterly refill service. One invoice, one contact person, delivery to every address. A bank branch, a hotel or a school becomes a customer that orders every quarter without being asked.',s:'Recurring B2B orders'},
   {f:'prod-senior',alt:'Concept image of elderly care and mobility items, including a walking stick and a reacher',cap:'mobility and recovery equipment',pos:'85% 60%',k:'Equipment rental',h:'Rent for weeks, return when better',p:`Wheelchairs, walking frames, hospital beds, oxygen concentrators (on prescription), nebulisers and breast pumps, delivered, set up, collected and cleaned. ${esc(SENIOR.name)} members get a rental discount. A family pays for six weeks of a wheelchair instead of a month’s income to own one.`,s:'Deposit refunded on return'}],2)}`],
 ['The experience · Afya Royal',`<div class="p3b-royal">${PH('royal','Concept image: detail of the premium Afya Royal box, dark green with a satin ribbon and a printed card','Afya Royal box, detail',{cls:'p3b-roycrop'})}
   <div><div class="p3b-rcard"><small>Afya Basics · Royal</small><b>Afya Royal</b><span class="chip"></span><span class="nm">MEMBER · 0000 2026</span><svg viewBox="0 0 24 24" fill="none" stroke="#f2c96b" stroke-width="1.4"><path d="M 3.26 10.86 L 12 3.64 L 20.74 10.86"/><path d="M 12 20.36 C 7.44 17.32 5.54 15.04 5.54 12.57 C 5.54 10.67 7.06 9.34 8.77 9.34 C 10.1 9.34 11.24 10.1 12 11.24 C 12.76 10.1 13.9 9.34 15.23 9.34 C 16.94 9.34 18.46 10.67 18.46 12.57 C 18.46 15.04 16.56 17.32 12 20.36 Z"/></svg></div>
   <p class="s11lead" style="margin-top:18px">Premium packaging is part of the product: a rigid dark-green box with a fine gold border, a satin ribbon and a printed card. It costs more to make, so it is priced in: <b>${T(ROYALPACK)}</b> for Royal packaging on any gift ${PE}, and included in the Royal membership. The card is a design concept.</p>
   <ul class="p3b-cats">${ROYAL.perks.map(x=>`<li>${esc(x)}</li>`).join('')}<li>${T(ROYAL.fee_year)} / year</li></ul></div></div>`],
 ['How it works · a diaspora gift in under 2 minutes',`<p class="s11lead">Example: Juma works in Muscat. His mother in Sinza has high blood pressure. On his phone, from abroad, he sends her the Heart &amp; blood pressure box. Each step has a time budget; together they stay under two minutes. ${tagi('Illustrative')}</p>
  <div class="p3b-steps">${[['0:25','Choose','Pick a box or gift card. The “for a parent at home” shortcut shows the right boxes first.'],['0:30','Who and where','Mother’s name, phone number and area. She confirms the address by a call or WhatsApp from the store.'],['0:15','Message','A short note, printed on the gift card and read out by the rider if she wishes.'],['0:25','Pay','International card (or mobile money from family in Tanzania). Price in TSh with the card’s conversion shown.'],['0:15','Confirm','Delivery slot and the promise: a photo of the sealed box at her door, sent to Juma.']].map(x=>`<div><span class="t">${x[0]}</span><b>${x[1]}</b><p>${x[2]}</p></div>`).join('')}</div>
  <div class="p3b-tbar"><i style="width:91.7%"></i></div><p class="note">Total 1 min 50 s of a 2-minute target · photo confirmation after delivery</p>
  <div style="margin-top:20px">${FEAT({f:'rider',alt:'Concept image of an Afya rider on an electric motorbike with a closed green insulated box on a Dar es Salaam street',cap:'the gift on its way',pos:'55% 45%',rev:true,k:'What happens after Juma taps Pay',h:'From Muscat to Sinza, the same afternoon',
    body:`<p>The order lands in the Afya system as a gift: the packer prints Juma’s note on a card, packs the one-off Heart &amp; blood pressure kit into a closed box, seals it and photographs it. An adviser calls his mother to confirm she is home. If the order was placed before 15:00, a rider takes it out on the afternoon wave. ${tagi('Illustrative')}</p><p>At the door, the rider hands over the box, reads the note aloud if she wishes, and takes a photo of the sealed box at her doorstep. Within seconds, Juma’s phone shows the photo and the time. Next month, one tap sends it again. Remittances to Tanzania are large and growing ${cn(K7,'rem')}; the opportunity is to turn a part of them into care that is <b>seen to arrive</b>.</p>`,
    facts:[['Diaspora gift, end to end','under 2 min'],['Same-day in Dar','ordered before 15:00'],['Proof','photo + time at the door']]})}</div>`],
 ['Try it · the gift builder',`<p class="s11lead">Build a gift the way a customer would: pick the occasion, the box or card, the packaging and a message, and see the gift card and the total. Delivery in Dar es Salaam is inside the price. ${tagi('Illustrative')}</p>
  <div class="p3b-gb"><div class="p3b-pane">
   <div class="p3b-fld"><span>1 · Occasion</span><div class="p3b-chips" id="p3bOcc">${GIFTS.map((g,i)=>`<button type="button" data-i="${i}" class="${i?'':'on'}">${g[0]}</button>`).join('')}</div></div>
   <div class="p3b-fld" id="p3bGWhat"></div>
   <div class="p3b-fld"><span>3 · Packaging</span><div class="p3b-seg" id="p3bPack"><button type="button" data-v="0" class="on">Afya green sleeve · included</button><button type="button" data-v="1">Royal box · +${kk(ROYALPACK)}</button></div></div>
   <label class="p3b-fld"><span>4 · Message (up to 120 characters)</span><textarea id="p3bMsgT" maxlength="120">Hongera sana! With love from all of us.</textarea></label>
   <div class="p3b-fld"><span>5 · Sent from</span><div class="p3b-seg" id="p3bFrom"><button type="button" data-v="tz" class="on">Tanzania · mobile money</button><button type="button" data-v="ab">Abroad · international card</button></div></div></div>
   <div class="p3b-pane g"><div class="p3b-gift" id="p3bGift"></div><div class="p3b-sum" id="p3bSum"></div><p style="font-size:.8rem;color:var(--ink3);margin:12px 0 0" id="p3bGNote"></p></div></div>`,'p3b-gifts'],
 ['Corporate gifts',`<div class="p3b-tw"><table class="p3b-table"><thead><tr><th>Offer</th><th>For</th><th>Price basis ${PE}</th></tr></thead><tbody>
   <tr><td><b>Staff wellness box</b></td><td>Employers who want a monthly benefit for staff (personal hygiene, women’s beauty or men’s care box)</td><td class="n">12-month plan rate, from ${kk(r1k(bp(BK('home'))*MB.plans.m12))}/box</td></tr>
   <tr><td><b>Client gift</b></td><td>Banks, hotels, embassies, NGOs at year end or Eid, Christmas and staff events</td><td class="n">Box or gift card + ${kk(ROYALPACK)} Royal packaging</td></tr>
   <tr><td><b>Office first-aid kit + refills</b></td><td>Offices, schools, hotels, building sites</td><td class="n">Kit ${kk(90000)}–${kk(180000)}, refill box quarterly</td></tr>
   <tr><td><b>New-baby gift for staff</b></td><td>Employers marking a birth in a staff family</td><td class="n">Mama na mtoto one-off kit, ${kk(bp(BK('mama')))}</td></tr></tbody></table></div>
  <div class="edp-pair" style="margin-top:16px">${PH('hub','Concept image of staff packing many closed Afya Boxes for a corporate order','a corporate order packed at the hub',{pos:'45% 45%'})}${PH('prod-firstaid','Concept image of office first-aid supplies laid out: bandages, dressings, gloves, cold packs','office first-aid refill contents, example',{pos:'50% 50%'})}</div>
  <p class="s11lead" style="margin-top:14px">Corporate gifting is the first step into business customers. The master model sets B2B at ${F.pct(I.growth.b2b_share)} of revenue from year 2, about <b>${F.m(b2b2)}</b> in year 2 ${PE}. Section 5.2 covers partnerships in full.</p>`],
 ['Try it · rent or buy?',`${FEAT({f:'prod-senior',alt:'Concept image of elderly care and mobility aids: a walking stick, a reacher, continence products and a pill organiser',cap:'recovery at home',pos:'80% 55%',k:'Why rental, and why us',h:'Six weeks of need should not cost a month’s income',
    body:`<p>After a hip operation at Muhimbili, a grandmother in Ubungo may need a walking frame for six weeks and a wheelchair for the first two. Buying both new could cost several hundred thousand shillings, and they then sit in a corner for years. Renting turns that into a weekly fee, with a refundable deposit, and the equipment goes back to Afya cleaned and checked for the next family. ${tagi('Illustrative')}</p><p>For the business, one wheelchair can be rented to many families over its life. Every item is logged in the system with its condition photos, cleaning record and next booking, so rental never becomes a pile of lost equipment.</p>`})}
  <p class="s11lead" style="margin-top:20px">Choose an item and how many weeks it is needed. The deposit is refunded on return; delivery, setup, cleaning and collection are inside the weekly fee, so the customer pays for the service and the business recovers its cost. ${PE}</p>
  <div class="p3b-rent" id="p3bRent">${RENT.map((r,i)=>`<button type="button" data-i="${i}" class="${i?'':'on'}">${r[0]}<small>${kk(r[3])}/week</small></button>`).join('')}</div>
  <div class="calc"><div class="cin"><label><span>Weeks needed</span><input type="range" id="p3bWk" min="1" max="26" value="6"><output id="p3bWkO"></output></label>
   <label class="p3b-chk"><input type="checkbox" id="p3bSen"> ${esc(SENIOR.name)} card holder (10% off the weekly fee ${PE})</label>
   <div id="p3bRChart"></div><p style="font-size:.84rem;color:var(--ink2);margin:6px 0 0" id="p3bRNote"></p></div>
   <div class="cout"><div><small>Rent: fees for the period</small><b id="p3bRc">–</b></div><div><small>Refundable deposit</small><b id="p3bRd" style="font-size:1.3rem">–</b></div><div><small>Buy new instead</small><b id="p3bRb" style="font-size:1.3rem">–</b></div><div class="p3b-vs" id="p3bVs"></div></div></div>`,'p3b-rentcalc'],
 ['The numbers',`<div class="nums p3b-nums"><div class="num g"><b>${kk(ROYAL.fee_year)}</b><span>Afya Royal, per year (${kk(ROYAL.fee_year/12)} a month)</span></div><div class="num"><b>${CARDV.length} values</b><span>gift cards of ${CARDV.map(v=>kk(v)).join(', ')} ${PE}</span></div><div class="num"><b>&lt;2 min</b><span>diaspora gift, end to end</span></div><div class="num"><b>${F.pct(I.growth.b2b_share)}</b><span>B2B share of revenue from year 2</span></div><div class="num"><b>${Math.ceil(RENT[0][2]*(1-I.store.retail_gm)/RENT[0][3])} wks</b><span>for a wheelchair’s rent to repay its landed cost ${PE}</span></div></div>
  <div class="p3b-tw" style="margin-top:14px"><table class="p3b-table"><thead><tr><th>Rental item</th><th>Buy new</th><th>Weekly fee</th><th>Deposit</th><th>Weeks to repay landed cost</th></tr></thead><tbody>${RENT.map(r=>`<tr><td><b>${r[0]}</b><br><span style="font-size:.78rem">${r[1]}</span></td><td class="n">${kk(r[2])}</td><td class="n">${kk(r[3])}</td><td class="n">${kk(r[4])}</td><td class="n">${Math.ceil(r[2]*(1-I.store.retail_gm)/r[3])}</td></tr>`).join('')}</tbody></table></div>
  <p class="note">Landed cost assumed at shelf price × (1 − ${F.pct(I.store.retail_gm)} retail margin) · all rental figures are planning estimates to be checked against supplier quotes</p>`],
 ['Risks and our answer',`<div class="risks">
  <div class="risk"><span class="q">Rented equipment is damaged or not returned.</span><span class="ar">→</span><span class="a">Refundable deposit sized to the item, ID and phone verified at hand-over, condition photos at delivery and collection, and a simple damage scale agreed upfront.</span></div>
  <div class="risk"><span class="q">Oxygen concentrators are clinical equipment.</span><span class="ar">→</span><span class="a">Rented only against a doctor’s prescription, registered devices only ${cn(K7,'md')}, setup explained at home and a 24-hour support number; people with low readings at the Afya Check are referred to a clinic first.</span></div>
  <div class="risk"><span class="q">Royal may attract too few members to justify its packaging.</span><span class="ar">→</span><span class="a">Royal packaging is priced separately and only made to order; Royal starts as a gift and corporate line and grows into a membership as demand proves itself.</span></div>
  <div class="risk"><span class="q">Card payments from abroad bring fraud risk.</span><span class="ar">→</span><span class="a">Use a payment provider with card-security checks; first-time diaspora orders are confirmed by phone with the recipient before dispatch.</span></div></div>`]];
 return secShell({s,p,pv,nx,img:'img/boxdoor.webp',imgAlt:'Concept image: an Afya rider hands a closed royal-green Afya Box to a mother holding her baby at the doorstep',
  h1:'Care worth giving,',em:'equipment only when you need it.',
  lede:'Afya Royal for households that want more, gifts that a son abroad can send in under two minutes, corporate wellness, and medical equipment rented by the week, delivered and collected.',mods,
  takeaway:'Premium, gifting and rental add <b>higher-value revenue</b> on the same stock, staff and riders, and <b>turn diaspora money into visible care</b>.',
  doors:['s3-4','s5-2','s6-2'],sources:src(K7)})}

function initS37(){const what=document.getElementById('p3bGWhat');if(!what)return;let oc=0,pack=0,from='tz',val=1,bx=0;
 const drawWhat=()=>{const g=GIFTS[oc];if(g[1]==='card'){what.innerHTML=`<span>2 · Gift card value</span><div class="p3b-seg" id="p3bCV">${CARDV.map((v,i)=>`<button type="button" data-i="${i}" class="${i===val?'on':''}">${kk(v)}</button>`).join('')}</div>`;
   what.querySelectorAll('button').forEach(b=>b.onclick=()=>{val=+b.dataset.i;drawWhat();paint()})}
  else{bx=BOXES.findIndex(b=>b.k===g[1]);what.innerHTML=`<span>2 · Gift box (one-off kit)</span><select class="p3b-sel" id="p3bGB">${BOXES.map((b,i)=>`<option value="${i}" ${i===bx?'selected':''}>${esc(b.n)} · ${kk(bp(b))}</option>`).join('')}</select>`;
   document.getElementById('p3bGB').onchange=e=>{bx=+e.target.value;paint()}}};
 const paint=()=>{const g=GIFTS[oc],isCard=g[1]==='card';const item=isCard?CARDV[val]:bp(BOXES[bx]);const pk=pack?ROYALPACK:0;
  const msg=document.getElementById('p3bMsgT').value.trim()||'With love.';
  const gift=document.getElementById('p3bGift');gift.classList.toggle('royal',!!pack);
  gift.innerHTML=`<div><small>${pack?'Afya Royal · gift':'Afya Basics · gift'}</small><b>${isCard?'Gift card · '+kk(item):esc(BOXES[bx].n)}</b></div><q>${esc(msg)}</q><span class="to">${from==='ab'?'Sent from abroad · photo on delivery':'Delivered in Dar · same day before 15:00'}</span>`;
  document.getElementById('p3bSum').innerHTML=`<div><span>${isCard?'Gift card':'Gift box (one-off kit)'}</span><b>${T(item)}</b></div><div><span>Packing &amp; delivery in Dar</span><b>${isCard?'digital or with box':'inside price'}</b></div><div><span>${pack?'Royal packaging':'Green sleeve'}</span><b>${pack?T(pk):'included'}</b></div><div class="t"><span>Total</span><b>${T(item+pk)}</b></div>`;
  document.getElementById('p3bGNote').textContent=from==='ab'?'Paid by international card in TSh. The sender gets a photo of the sealed gift at the door and the delivery time.':'Paid by mobile money or card. TRA receipt by SMS or WhatsApp.'};
 document.querySelectorAll('#p3bOcc button').forEach(b=>b.onclick=()=>{oc=+b.dataset.i;document.querySelectorAll('#p3bOcc button').forEach(x=>x.classList.toggle('on',x===b));
  document.getElementById('p3bMsgT').value=['Karibu mtoto! With love from all of us.','Wishing you a calm, healthy pregnancy.','Pole sana, get well soon.','Mama, this is for you. Love from far away.','Asante sana for everything.','Choose what you need. With love.'][oc];drawWhat();paint()});
 const seg=(id,fn)=>document.querySelectorAll('#'+id+' button').forEach(b=>b.onclick=()=>{document.querySelectorAll('#'+id+' button').forEach(x=>x.classList.toggle('on',x===b));fn(b.dataset.v);paint()});
 seg('p3bPack',v=>pack=+v);seg('p3bFrom',v=>from=v);document.getElementById('p3bMsgT').oninput=paint;drawWhat();paint();
 /* rental */
 let ri=0;const wk=document.getElementById('p3bWk'),sen=document.getElementById('p3bSen');
 const rent=()=>{const r=RENT[ri],w=+wk.value,fee=r[3]*(sen.checked?0.9:1),cost=fee*w;
  document.getElementById('p3bWkO').textContent=w+(w>1?' weeks':' week');document.getElementById('p3bRc').textContent=T(cost);document.getElementById('p3bRd').textContent=T(r[4]);document.getElementById('p3bRb').textContent=T(r[2]);
  const win=cost<r[2];document.getElementById('p3bVs').innerHTML=`<div class="${win?'win':''}"><small style="font:500 .58rem var(--f-hud);letter-spacing:.16em;color:var(--ink3)">RENT</small><br><b style="font-size:1rem">${win?'Saves '+T(r[2]-cost):'Costs more'}</b></div><div class="${win?'':'win'}"><small style="font:500 .58rem var(--f-hud);letter-spacing:.16em;color:var(--ink3)">BUY</small><br><b style="font-size:1rem">${win?'Owned, but idle later':'Better for long use'}</b></div>`;
  document.getElementById('p3bRChart').innerHTML=rentChart([r[0],r[1],r[2],fee,r[4]],w);document.getElementById('p3bRNote').textContent=r[5]};
 document.querySelectorAll('#p3bRent button').forEach(b=>b.onclick=()=>{ri=+b.dataset.i;document.querySelectorAll('#p3bRent button').forEach(x=>x.classList.toggle('on',x===b));rent()});
 wk.oninput=rent;sen.onchange=rent;rent()}
window.SECTIONS['s3-7']={render:s37,init:initS37};

/* ======================================================================
   3.8 DIGITAL STORE AND APP
   ====================================================================== */
const K8=['q2','dn','mm','wa','ecom','rem'];
const L={en:{hi:'Hi, Amina',box:'Your Afya Box',arr:'Arrives Friday',mb:'Mother & baby · monthly',swin:'Swap window',left:'12 days left',again:'Order again',strips:'Baby wipes + nappies, size 4',last:'Last Afya Check',normal:'Normal',track:'Track delivery',rider:'Rider on the way',fam:'Pay for family',famS:'Mama’s box, paid from abroad',nH:'Home',nB:'Box',nO:'Orders',nR:'Results',nF:'Family',
 boxT:'Afya Box · Mother & baby',plan:'12-month plan · renews 25 Nov',locks:'Choices lock in 12 days',swap:'Swap a brand',keep:'Keep as it is',skip:'Pause one month',inside:'Next box · example categories',
 reT:'Order again',reS:'Your last basket',total:'Total, delivery included',pay:'Pay with mobile money',push:'Approve the payment on your phone…',paid:'Paid · TRA receipt sent by SMS',goT:'Track my order',
 swT:'Swap a brand',swS:'Nappies, size 4 · same price range',price:'Price unchanged',done:'Swapped. Price stays',
 rsT:'My Afya Check results',bp:'Blood pressure',ox:'Oxygen level',pl:'Pulse',share:'Share with my family',hist:'Last 6 checks',
 trT:'Delivery tracking',eta:'Arrives 16:40 – 17:00',st1:'Order paid',st2:'Packed and photographed',st3:'Rider on the way',st4:'At your door · code 4821',
 diT:'Pay for family',diS:'For: Mama Halima · Sinza, Dar',diB:'Heart & blood pressure box',card:'Pay by international card',diDone:'Done in 1:32 · photo of delivery will be sent'},
 sw:{hi:'Habari, Amina',box:'Afya Box yako',arr:'Inafika Ijumaa',mb:'Mama na mtoto · kila mwezi',swin:'Muda wa kubadilisha',left:'Siku 12 zimebaki',again:'Agiza tena',strips:'Wipes za mtoto + nepi, saizi 4',last:'Afya Check ya mwisho',normal:'Kawaida',track:'Fuatilia mzigo',rider:'Msafirishaji yuko njiani',fam:'Lipia familia',famS:'Box ya Mama, imelipiwa ughaibuni',nH:'Nyumbani',nB:'Box',nO:'Oda',nR:'Vipimo',nF:'Familia',
 boxT:'Afya Box · Mama na mtoto',plan:'Mpango wa miezi 12 · inajirudia 25 Nov',locks:'Machaguo yanafungwa baada ya siku 12',swap:'Badilisha chapa',keep:'Acha kama ilivyo',skip:'Sitisha mwezi mmoja',inside:'Box ijayo · mifano ya makundi',
 reT:'Agiza tena',reS:'Kikapu chako cha mwisho',total:'Jumla, usafirishaji umejumuishwa',pay:'Lipa kwa pesa ya simu',push:'Thibitisha malipo kwenye simu yako…',paid:'Umelipa · risiti ya TRA imetumwa kwa SMS',goT:'Fuatilia oda yangu',
 swT:'Badilisha chapa',swS:'Nepi, saizi 4 · bei ileile',price:'Bei haibadiliki',done:'Imebadilishwa. Bei inabaki',
 rsT:'Matokeo yangu ya Afya Check',bp:'Presha ya damu',ox:'Kiwango cha oksijeni',pl:'Mapigo ya moyo',share:'Shiriki na familia yangu',hist:'Vipimo 6 vya mwisho',
 trT:'Ufuatiliaji wa mzigo',eta:'Inafika 16:40 – 17:00',st1:'Oda imelipiwa',st2:'Imefungwa na kupigwa picha',st3:'Msafirishaji yuko njiani',st4:'Mlangoni kwako · namba 4821',
 diT:'Lipia familia',diS:'Kwa: Mama Halima · Sinza, Dar',diB:'Box ya moyo na presha',card:'Lipa kwa kadi ya kimataifa',diDone:'Imekamilika ndani ya 1:32 · picha ya mzigo itatumwa'}};
const SCR=[['home','Home','The home screen answers the three questions a member has: when does my box come, can I still change it, and what do I need now. Every routine task is one tap away.','One tap to anything'],
 ['box','Afya Box','The member’s box, plan and renewal date, with the swap window counting down. Doing nothing is a valid choice: the box simply renews (zero clicks).','Zero clicks to renew'],
 ['reorder','Reorder in one tap','The last basket, saved address and saved payment. One tap sends a mobile-money prompt; the member approves on their phone and the order is in.','Repeat order < 30 s'],
 ['swap','Swap a brand','Afya Choice inside the app: 4–5 registered brands in the same price range. The price line confirms nothing changes.','Swaps until 12 days before month end'],
 ['results','Check results history','Afya Check readings saved with consent, shown as simple trends. With permission, a member can share them with a relative or take them to their clinic.','Free check, history kept'],
 ['track','Delivery tracking','Live status from payment to door: packed and photographed, rider on the way, arrival window and a code for the door.','Same day if ordered before 15:00'],
 ['diaspora','Diaspora pay','A relative abroad pays for a parent’s box by international card, in under two minutes, and receives a delivery photo.','Diaspora gift < 2 min']];
const NAVI={home:'<path d="M3 11l9-7 9 7v9h-6v-6H9v6H3z"/>',box:'<path d="M3 8l9-5 9 5v9l-9 5-9-5z"/><path d="M3 8l9 5 9-5M12 13v9"/>',reorder:'<path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v5h-5"/>',results:'<path d="M3 12h4l2-5 4 10 2-5h6"/>',diaspora:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/>'};
const WAMSG=[['me','Habari! Naomba oda yangu ya kawaida ya strips.','Hello! I’d like my usual strips order.','16:02:05'],
 ['af','Karibu tena, Baba Juma.','Welcome back. Your last order:','16:02:09','<div class="qr"><span>Test strips (50) · Brand B</span><span>Lancets (100) · Brand A</span></div>'],
 ['af','Jumla '+T(42000+4000)+' pamoja na usafirishaji. Ithibitishwe?','Total including delivery. Confirm?','16:02:10','<div class="qr"><span>Ndiyo, agiza · Yes, order</span><span>Ongea na mshauri · Talk to an adviser</span></div>'],
 ['me','Ndiyo, agiza','Yes, order','16:02:18'],
 ['sys','Ombi la malipo limetumwa kwa simu yako · Mobile-money prompt sent','','16:02:19'],
 ['af','Malipo yamepokelewa. Risiti ya TRA imetumwa kwa SMS.','Payment received. TRA receipt sent by SMS.','16:02:31'],
 ['af','Msafirishaji atafika kati ya 17:30 na 18:00. Fuatilia hapa: afya.link/t/4821','Rider arrives 17:30–18:00. Tracking link included.','16:02:32'],
 ['sys','Oda imekamilika ndani ya sekunde 27 · Order done in 27 seconds','','']];
const WEBP=[['Upper-arm BP monitor','hd',45000,5,'Best for: daily home readings'],['Glucose test strips (50)','hd',30000,5,'Matched to your meter'],['Digital thermometer','mb',8000,5,'Best for: fast fever checks'],['Adult diapers, M','sr',22000,5,'Best for: overnight comfort'],['Knee support brace','mr',15000,5,'Best for: weak or sore knees'],['Home first-aid kit','fa',25000,5,'Best for: families with children']];

const WPH=[['prod-heart','330% auto','93% 12%'],['prod-heart','330% auto','6% 18%'],['prod-baby','330% auto','40% 80%'],['prod-senior','330% auto','8% 10%'],['prod-firstaid','330% auto','40% 30%'],['prod-kids','330% auto','58% 45%']];
function s38(s,p,pv,nx){const M=MODEL.get('base'),m12=M.months[11],o=I.online,y1on=M.months.reduce((a,x)=>a+x.online,0);
 const mods=[
 ['The problem it solves',`<div class="plain"><span class="modno" style="margin:0 0 12px">In plain words</span><ol>
  <li><b>Tanzania now shops on the phone.</b> TCRA counted ${'62.79'} million internet subscriptions and ${'31.34'} million smartphones by June 2026 (smartphone penetration 44.74%) ${cn(K8,'q2')}. Mobile money accounts reached about 87.05 million ${cn(K8,'q2')}, after more than doubling from 35.3 million in 2021 to 76.5 million in December 2025 ${cn(K8,'mm')}.</li>
  <li><b>But many phones are still basic.</b> Feature-phone penetration was 83.38% in June 2026 ${cn(K8,'dn')}, so SMS reminders and mobile-money prompts must work without an app.</li>
  <li><b>Buying online is informal.</b> Most online buying happens through social-media pages: the buyer contacts the seller, then pays on delivery or by mobile money ${cn(K8,'ecom')}. WhatsApp was the second-ranked social network by devices in TCRA’s Q3 2022 figures ${cn(K8,'wa')}. There is no catalogue, no saved basket, no record.</li>
  <li><b>Families abroad want to help directly.</b> Diaspora remittances reached about TSh 3.3 trillion in 2024/25 ${cn(K8,'rem')}, but money sent is not the same as care delivered.</li></ol></div>`],
 ['Our answer · three digital doors, one account',`<div class="p3b-cards">
   <div class="p3b-card"><span class="k">The Afya app</span><h3>For members and regular buyers</h3><p>Afya Box, one-tap reorder, Afya Choice swaps, check results, tracking and diaspora pay. Kiswahili and English, switchable on every screen.</p></div>
   <div class="p3b-card" style="--c:#25d366"><span class="k">WhatsApp ordering</span><h3>For everyone, no download</h3><p>A verified Afya Basics business number with the catalogue, quick replies and a staff inbox. Answer in under 5 minutes during opening hours; repeat orders in under 30 seconds.</p></div>
   <div class="p3b-card" style="--c:var(--gold)"><span class="k">Online store</span><h3>For browsers and gift buyers</h3><p>The full catalogue on the web, the same price as in store, with “best for” cards, click and collect within 2 hours and gift sending from abroad.</p></div></div>
  <div style="margin-top:20px">${FEAT({f:'check',alt:'Concept image of a customer at the Afya Check kiosk with an adviser; her readings will be saved to her account with consent',cap:'a reading saved to the app, with consent',pos:'72% 40%',k:'Why the app matters to health, not just shopping',h:'The app remembers, so the customer does not have to',
    body:`<p>A member who has an Afya Check in the store can choose to save the reading to the app. Over months, <b>Baba Juma</b> sees his blood pressure as a line, not a single scary number: 142/94 in March, 136/88 in May after he cut salt, 131/84 in July. The adviser sees the same line at his next visit. ${tagi('Illustrative')}</p><p>The app also holds the things families forget: the baby’s nappy size, which strips match the meter, Bibi’s diaper size, the date the next box locks. That memory is what makes reordering take seconds instead of a phone call and a search, and it is why a member stays.</p>`,
    facts:[['Repeat order','under 30 s'],['Languages','Kiswahili · English'],['Works without the app','WhatsApp · SMS']]})}</div>
  <p class="oneline" style="margin-top:30px">One account, <b>one price</b>, one stock: whatever door a customer uses, the store, the box and the rider <b>see the same order</b>.</p>`],
 ['Try it · the clickable app prototype',`<p class="s11lead">This is a working prototype. Tap the buttons inside the phone, use the tab bar, or jump to any screen from the list. Switch the language to see the Kiswahili version. ${tagi('Prototype · draft Kiswahili')}</p>
  <div class="p3b-lang" id="p3bLang"><button type="button" data-l="en" class="on">English</button><button type="button" data-l="sw">Kiswahili</button></div>
  <div class="p3b-proto"><div class="p3b-scrlist" id="p3bScr">${SCR.map((x,i)=>`<button type="button" data-s="${x[0]}" class="${i?'':'on'}"><span>0${i+1}</span>${x[1]}</button>`).join('')}</div>
   <div class="p3b-ph"><div class="p3b-scr"><div class="p3b-sb"><span>9:41</span><span>4G ▮▮▮</span></div><div class="p3b-body" id="p3bApp"></div><nav class="p3b-nav" id="p3bNav"></nav></div></div>
   <div class="p3b-why" id="p3bWhy"></div></div>`,'p3b-proto'],
 ['How it works · WhatsApp ordering in 27 seconds',`<div class="p3b-wa"><div class="p3b-ph"><div class="p3b-scr p3b-wscr"><div class="p3b-sb" style="background:#0b5e43;color:#fff"><span>16:02</span><span>4G</span></div><div class="p3b-wh"><i><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#0f7a52" stroke-width="2.2"><path d="M 3.26 10.86 L 12 3.64 L 20.74 10.86"/><path d="M 12 20.36 C 7.44 17.32 5.54 15.04 5.54 12.57 C 5.54 10.67 7.06 9.34 8.77 9.34 C 10.1 9.34 11.24 10.1 12 11.24 C 12.76 10.1 13.9 9.34 15.23 9.34 C 16.94 9.34 18.46 10.67 18.46 12.57 C 18.46 15.04 16.56 17.32 12 20.36 Z"/></svg></i><div><b>Afya Basics</b><small>Business account · replies in minutes</small></div></div><div class="p3b-wbody" id="p3bWA"></div><div class="p3b-wfoot"><span>Andika ujumbe…</span><i></i></div></div></div>
   <div><p class="s11lead">A father with diabetes reorders his test strips on WhatsApp, in Kiswahili. The Afya number recognises his phone, shows his last order, sends a mobile-money prompt, and books the rider. Staff only step in when he asks for an adviser. ${tagi('Illustrative')}</p>
   <ol class="p3b-tl" id="p3bWAsteps">${[['0 s','He writes as he would to a friend','No app, no login. His number is his account.'],['4 s','Last order appears','Quick replies built from his saved basket and meter-matched strips.'],['13 s','He taps “Yes”','Price includes delivery; the same price as the store and the app.'],['14–26 s','Mobile-money prompt','He approves on his own phone; the TRA receipt arrives by SMS.'],['27 s','Rider booked','A tracking link and a time window; same day if ordered before 15:00.']].map((x,i)=>`<li data-i="${i}" class="on"><span>${x[0]}</span><div><b>${x[1]}</b><p>${x[2]}</p></div></li>`).join('')}</ol>
   <div class="p3b-btnrow"><button type="button" class="p3b-b solid" id="p3bWAplay">Play the chat</button><button type="button" class="p3b-b" id="p3bWAnext">Next message</button></div></div></div>`],
 ['The experience · after the tap',`<p class="s11lead">Whatever door the order came through, it leaves the same way. The screen work ends in seconds; what the customer actually experiences is a packed box, a rider and a doorstep. These are the three moments the digital store must get right.</p>
  ${GAL([
   {f:'rider',alt:'Concept image of an Afya rider on an electric motorbike with a closed green box on a Dar street',cap:'live tracking: the rider on the way',pos:'55% 45%',ov:['Tracked from the app or WhatsApp','The customer sees a time window the evening before and a message when the rider is 5 minutes away. Riders are assigned by zone automatically, so no one at the store has to plan routes by hand.']},
   {f:'hub',alt:'Concept image of staff packing closed Afya Boxes with a tablet',cap:'packed and photographed',pos:'45% 45%',ov:['Packed from the order, scanned','Every item scanned in; the box sealed and photographed.']},
   {f:'boxdoor',alt:'Concept image of a closed Afya Box handed over at a doorstep',cap:'the delivery photo',pos:'55% 40%',ov:['Proof at the door','A 4-digit code and a photo close every delivery.']}])}`],
 ['The experience · the online store',`<div class="p3b-web" aria-label="Online store mock-up"><div class="p3b-wbar"><i></i><i></i><i></i><span>Afya Basics · online store · Heart &amp; Diabetes</span></div>
  <div class="p3b-whd"><b>Afya</b><span class="s">Search 520 families…</span><span class="c" id="p3bCartB">Basket · 0</span></div>
  <div class="p3b-wz">${ZN.map((z,i)=>`<span class="${i===1?'on':''}">${esc(z.n)}</span>`).join('')}</div>
  <div class="p3b-wmain"><div class="p3b-wg">${WEBP.map((x,i)=>`<div class="p3b-wp" style="--c:${Z(x[1]).c}"><div class="im ph" role="img" aria-label="Product photo: ${esc(x[0])}" style="background-image:url(img/${WPH[i][0]}.webp);background-size:${WPH[i][1]};background-position:${WPH[i][2]}"></div><b>${esc(x[0])}</b><small>${x[3]} brands · same range</small><span class="bf">${esc(x[4])}</span><div><em>from ${kk(x[2])}</em><button type="button" data-w="${i}">Add</button></div></div>`).join('')}</div>
   <div class="p3b-wc"><h4>Your basket</h4><div id="p3bWL" class="p3b-wl"><div><span>Empty, tap Add</span><b></b></div></div><div class="tot"><span>Total</span><b id="p3bWT">TSh 0</b></div><p>Delivery fee ${T(o.delivery_fee)} shown before paying · click &amp; collect in 2 h · same day before 15:00</p><span class="go">Pay with mobile money</span></div></div></div>
  <p class="note">Mock-up · product names are generic families; real listings show registered brands and their “best for” cards</p>`],
 ['The experience · notifications that do the remembering',`<div class="p3b-duo2"><div class="p3b-ph"><div class="p3b-scr p3b-ls"><div class="p3b-sb" style="color:#fff"><span></span><span>4G</span></div><div class="tm"><b>08:15</b><small>Thursday 19 November</small></div><div class="p3b-nts">
   <div class="p3b-nt"><small><span>Afya · app</span><span>now</span></small><b>Your next box locks tonight</b>Keep it as it is, or swap a brand by 23:59.</div>
   <div class="p3b-nt"><small><span>WhatsApp · Afya Basics</span><span>07:50</span></small><b>Rider is 5 minutes away</b>Code for the door: 4821.</div>
   <div class="p3b-nt"><small><span>SMS · AFYA</span><span>yesterday</span></small><b>TRA receipt</b>Order #2381 paid. Receipt: tap link.</div>
   <div class="p3b-nt"><small><span>Afya · app</span><span>Mon</span></small><b>Mama’s box delivered</b>Photo of the sealed box at the door is ready.</div>
   <div class="p3b-nt"><small><span>Afya · app</span><span>Sun</span></small><b>Your Afya Check reading is saved</b>BP 128/82 · next free check in 30 days.</div></div></div></div>
   <div><p class="s11lead">Reminders are the quiet engine of the business. The system sends them, not the manager: swap-window reminders, renewal notices, delivery updates, receipts and check follow-ups. Each member picks their channels (app push, WhatsApp, SMS or email), and SMS always works, even on a basic phone.</p>
   <div class="p3b-tw"><table class="p3b-table"><thead><tr><th>Message</th><th>When</th><th>Channel</th></tr></thead><tbody>
    <tr><td><b>Swap reminder</b></td><td>12 days before month end</td><td>Push, WhatsApp, SMS, email</td></tr>
    <tr><td><b>Renewal notice</b></td><td>On renewal date, after payment</td><td>SMS receipt + app</td></tr>
    <tr><td><b>Delivery window</b></td><td>Evening before, and rider 5 min away</td><td>WhatsApp or SMS</td></tr>
    <tr><td><b>Delivery photo</b></td><td>At the door (also to a diaspora payer)</td><td>App or WhatsApp</td></tr>
    <tr><td><b>Check follow-up</b></td><td>30 days after a check, with consent</td><td>SMS or app</td></tr></tbody></table></div></div></div>`],
 ['The numbers',`<div class="nums p3b-nums"><div class="num"><b>${o.orders_day_m12}</b><span>online orders a day by month 12</span></div><div class="num"><b>${kk(o.basket)}</b><span>average online basket</span></div><div class="num"><b>${F.m(m12.online)}</b><span>online revenue in month 12</span></div><div class="num"><b>${F.m(y1on)}</b><span>online revenue, year 1</span></div><div class="num g"><b>${kk(o.delivery_fee-o.rider_cost_per_order)}</b><span>left per order after the rider (${kk(o.delivery_fee)} fee − ${kk(o.rider_cost_per_order)} cost)</span></div></div>
  <div class="p3b-tw" style="margin-top:14px"><table class="p3b-table"><thead><tr><th>Speed target</th><th>Goal</th><th>How the digital store meets it</th></tr></thead><tbody>
   <tr><td><b>Repeat order online</b></td><td class="n">&lt; 30 s</td><td>Saved basket, saved address, mobile-money push</td></tr>
   <tr><td><b>WhatsApp answer</b></td><td class="n">&lt; 5 min</td><td>Quick replies, catalogue links, shared staff inbox</td></tr>
   <tr><td><b>Click and collect</b></td><td class="n">&lt; 2 h</td><td>Order goes straight to the picker’s handheld</td></tr>
   <tr><td><b>Same-day delivery</b></td><td class="n">before 15:00</td><td>Riders assigned automatically by zone</td></tr>
   <tr><td><b>Monthly box</b></td><td class="n">0 clicks</td><td>Automatic renewal and locked packing list</td></tr>
   <tr><td><b>Diaspora gift</b></td><td class="n">&lt; 2 min</td><td>Shortcut for parents, international card, photo confirmation</td></tr></tbody></table></div>
  <p class="note">Planning estimates from the master model (base case) · build cost and tools are in section 4.1</p>`],
 ['Risks and our answer',`<div class="risks">
  <div class="risk"><span class="q">Many customers will not download another app.</span><span class="ar">→</span><span class="a">WhatsApp and SMS do everything essential without an app; the app is a better experience, never a requirement.</span></div>
  <div class="risk"><span class="q">Building a full app is expensive before the store proves itself.</span><span class="ar">→</span><span class="a">Launch on ready-made tools (online store, WhatsApp Business, payment provider) connected to our own membership layer; build custom screens only where they add an advantage (section 4.1).</span></div>
  <div class="risk"><span class="q">Health readings are sensitive personal data.</span><span class="ar">→</span><span class="a">Readings are saved only with consent, shared only with the member’s permission, and handled under Tanzania’s data-protection rules (section 4.5).</span></div>
  <div class="risk"><span class="q">Mobile-money prompts fail or time out.</span><span class="ar">→</span><span class="a">Automatic retry, a second payment option (card or another wallet), and the order held for 30 minutes before release.</span></div></div>`]];
 return secShell({s,p,pv,nx,img:'img/rider.webp',imgAlt:'Concept image: an Afya Basics delivery rider on an electric motorbike with a closed green insulated box on a Dar es Salaam street',
  h1:'Reorder in thirty seconds,',em:'in Kiswahili or English.',
  lede:'An app, a WhatsApp number and an online store share one account, one price and one stock. Members reorder in one tap, swap brands, see their check results and track the rider; family abroad pay in under two minutes.',mods,
  takeaway:'Digital ordering makes every member <b>cheaper to serve and easier to keep</b>, and puts <b>diaspora spending</b> straight into the order book.',
  doors:['s4-1','s3-2','s4-3','s5-1'],sources:src(K8)})}

function initS38(){const app=document.getElementById('p3bApp');if(!app)return;let lang='en',scr='home',sw=0,reSt=0,diSt=0;
 const t=k=>L[lang][k];
 const spark=(vals,lo,hi,c)=>{const W=240,H=60;const pts=vals.map((v,i)=>`${(i/(vals.length-1)*(W-10)+5).toFixed(1)},${(H-6-(v-lo)/(hi-lo)*(H-14)).toFixed(1)}`).join(' ');return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none"><polyline points="${pts}" fill="none" stroke="${c}" stroke-width="2.5" stroke-linejoin="round"/>${vals.map((v,i)=>`<circle cx="${(i/(vals.length-1)*(W-10)+5).toFixed(1)}" cy="${(H-6-(v-lo)/(hi-lo)*(H-14)).toFixed(1)}" r="3" fill="${c}"/>`).join('')}</svg>`};
 const V={
  home:()=>`<div class="p3b-ah"><b>Afya</b><span>${t('hi')}</span></div>
   <button type="button" class="p3b-gcb" data-go="box"><div class="p3b-gc"><small>${t('box')}</small><b>${t('arr')}</b><span>${t('mb')}</span><i><em style="width:60%"></em></i></div></button>
   <button type="button" class="p3b-r" data-go="swap"><span>${t('swin')}<small>${t('locks')}</small></span><b>${t('left')}</b></button>
   <button type="button" class="p3b-r" data-go="reorder"><span>${t('again')}<small>${t('strips')}</small></span><b class="pill">1 tap</b></button>
   <button type="button" class="p3b-r" data-go="results"><span>${t('last')}<small>BP 128/82 · SpO2 98%</small></span><b>${t('normal')}</b></button>
   <button type="button" class="p3b-r" data-go="track"><span>${t('track')}<small>${t('rider')}</small></span><b>16:40</b></button>
   <button type="button" class="p3b-cta" data-go="diaspora">${t('fam')} →</button>`,
  box:()=>`<div class="p3b-ah"><b>${t('nB')}</b><span>Afya Family</span></div><div class="p3b-gc"><small>${t('boxT')}</small><b>${T(bp(BK('mama')))}</b><span>${t('plan')}</span><i><em style="width:60%"></em></i></div>
   <div class="p3b-r dz"><span>${t('locks')}<small>Day 18 · 23:59</small></span><b>12</b></div>
   <p style="margin:2px 0 0;font-size:.62rem;color:#5b6f66;text-transform:uppercase;letter-spacing:.08em">${t('inside')}</p>
   ${((BK('mama')||BOXES[0]).slots||(BOXES[0].cats)||[]).slice(0,4).map(c=>`<div class="p3b-r"><span>${esc(c[0])}</span><b>Brand A</b></div>`).join('')}
   <button type="button" class="p3b-cta g" data-go="swap">${t('swap')}</button><button type="button" class="p3b-cta" style="margin-top:0" data-toast="keep">${t('keep')} · 0 clicks</button>`,
  reorder:()=>`<div class="p3b-ah"><b>${t('reT')}</b><span>${t('reS')}</span></div>
   <div class="p3b-r"><span>Baby wipes ×2<small>Brand B</small></span><b>${kk(12000)}</b></div><div class="p3b-r"><span>Nappies, size 4<small>Brand A</small></span><b>${kk(24000)}</b></div><div class="p3b-r"><span>Nappy-rash cream<small>Brand C</small></span><b>${kk(9000)}</b></div>
   <div class="p3b-r dz"><span>${t('total')}</span><b>${T(45000+I.online.delivery_fee)}</b></div>
   ${reSt===0?`<button type="button" class="p3b-cta" data-act="pay">${t('pay')}</button>`:reSt===1?`<div class="p3b-toast">${t('push')}</div><button type="button" class="p3b-cta g" data-act="approve">✓ Approve · PIN</button>`:`<div class="p3b-toast">${t('paid')} · 0:21</div><button type="button" class="p3b-cta g" data-go="track">${t('goT')} →</button>`}`,
  swap:()=>{const O=['A','B','C','D','E'];return `<div class="p3b-ah"><b>${t('swT')}</b><button type="button" data-go="box">←</button></div><p style="margin:0;font-size:.72rem;color:#5b6f66">${t('swS')}</p>
   <div class="p3b-sw">${O.map((o,i)=>`<button type="button" data-sw="${i}" class="${i===sw?'on':''}">Brand ${o}<small>${ORI[i]} · ${TAGS[i]}</small></button>`).join('')}</div>
   <div class="p3b-r dz"><span>${t('price')}</span><b>${T(bp(BK('mama')))}</b></div>
   <div class="p3b-toast">${t('done')} ${T(bp(BK('mama')))} · Brand ${O[sw]}</div><button type="button" class="p3b-cta g" data-go="box">✓ ${t('keep')}</button>`},
  results:()=>`<div class="p3b-ah"><b>${t('nR')}</b><span>${t('hist')}</span></div><p style="margin:0;font:800 .8rem var(--f-display)">${t('rsT')}</p>
   <div class="p3b-spark"><small>${t('bp')} · mmHg (systolic)</small>${spark([142,138,135,131,129,128],120,150,'#0f7a52')}<small>142 → 128 · ${t('normal')}</small></div>
   <div class="p3b-r"><span>${t('ox')}<small>SpO2</small></span><b>98%</b></div><div class="p3b-r"><span>${t('pl')}<small>bpm</small></span><b>72</b></div>
   <button type="button" class="p3b-cta" data-toast="share">${t('share')}</button>`,
  track:()=>`<div class="p3b-ah"><b>${t('trT')}</b><span>#2381</span></div>
   <div class="p3b-map"><svg viewBox="0 0 260 150" preserveAspectRatio="xMidYMid slice"><path d="M0 40h260M0 100h260M60 0v150M170 0v150M0 130L260 10" stroke="#fff" stroke-width="7"/><path d="M30 120 L60 100 L170 100 L170 40 L220 30" fill="none" stroke="#0f7a52" stroke-width="3" stroke-dasharray="6 5"/><circle cx="30" cy="120" r="7" fill="#0b2219"/><circle cx="170" cy="70" r="9" fill="#f2c96b" stroke="#fff" stroke-width="3"/><circle cx="220" cy="30" r="7" fill="#0f7a52"/></svg></div>
   <div class="p3b-r dz"><span>${t('eta')}</span><b>16:50</b></div>
   <ol class="p3b-prog"><li class="d"><b>${t('st1')}</b>16:02</li><li class="d"><b>${t('st2')}</b>16:21</li><li class="n"><b>${t('st3')}</b>16:30</li><li><b>${t('st4')}</b></li></ol>`,
  diaspora:()=>`<div class="p3b-ah"><b>${t('diT')}</b><span>Muscat → Dar</span></div><div class="p3b-r"><span>${t('diS')}</span><b>✓</b></div>
   <div class="p3b-gc"><small>${t('diB')}</small><b>${T(bp(BK('sugar')))}</b><span>${esc(Z('hd').n)} · one-off or monthly</span></div>
   <div class="p3b-r"><span>Message<small>“Mama, take care. Juma.”</small></span><b>✎</b></div>
   ${diSt?`<div class="p3b-toast">${t('diDone')}</div><button type="button" class="p3b-cta g" data-go="track">${t('track')} →</button>`:`<button type="button" class="p3b-cta" data-act="dpay">${t('card')}</button>`}`};
 const NAVS=[['home','nH'],['box','nB'],['reorder','nO'],['results','nR'],['diaspora','nF']];
 const why=document.getElementById('p3bWhy'),nav=document.getElementById('p3bNav');
 const go=(k,anim=true)=>{scr=k;if(k!=='reorder')reSt=reSt===2?0:reSt;app.innerHTML=V[k]();if(anim){app.classList.remove('anim');void app.offsetWidth;app.classList.add('anim')}app.scrollTop=0;
  nav.innerHTML=NAVS.map(n=>`<button type="button" data-go="${n[0]}" class="${n[0]===k||(k==='swap'&&n[0]==='box')||(k==='track'&&n[0]==='reorder')?'on':''}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${NAVI[n[0]]}</svg>${t(n[1])}</button>`).join('');
  const d=SCR.find(x=>x[0]===k),i=SCR.indexOf(d);why.innerHTML=`<span class="p3b-k">Screen 0${i+1} of 07</span><h3 style="margin-top:6px">${d[1]}</h3><p>${d[2]}</p><span class="tg">${d[3]}</span>`;
  document.querySelectorAll('#p3bScr button').forEach(b=>b.classList.toggle('on',b.dataset.s===k))};
 const root=app.closest('.p3b-scr');
 root.addEventListener('click',e=>{const g=e.target.closest('[data-go]'),a=e.target.closest('[data-act]'),s=e.target.closest('[data-sw]'),ts=e.target.closest('[data-toast]');
  if(s){sw=+s.dataset.sw;go('swap',false);return}
  if(a){const v=a.dataset.act;if(v==='pay')reSt=1;if(v==='approve')reSt=2;if(v==='dpay')diSt=1;go(scr,false);return}
  if(ts){ts.insertAdjacentHTML('beforebegin',`<div class="p3b-toast">${ts.dataset.toast==='share'?(lang==='en'?'Shared with Juma (son) · with your consent':'Imeshirikiwa na Juma · kwa ridhaa yako'):(lang==='en'?'Kept. Your box renews automatically.':'Sawa. Box yako itajirudia yenyewe.')}</div>`);ts.disabled=true;return}
  if(g){if(g.dataset.go==='reorder')reSt=0;if(g.dataset.go==='diaspora')diSt=0;go(g.dataset.go)}});
 document.querySelectorAll('#p3bScr button').forEach(b=>b.onclick=()=>{if(b.dataset.s==='reorder')reSt=0;if(b.dataset.s==='diaspora')diSt=0;go(b.dataset.s)});
 document.querySelectorAll('#p3bLang button').forEach(b=>b.onclick=()=>{lang=b.dataset.l;document.querySelectorAll('#p3bLang button').forEach(x=>x.classList.toggle('on',x===b));go(scr,false)});
 go('home',false);
 /* whatsapp */
 const wa=document.getElementById('p3bWA');let wi=0,wt=null;const steps=[...document.querySelectorAll('#p3bWAsteps li')];const stepOf=[0,1,1,2,3,3,4,4];
 const bub=m=>`<div class="p3b-bub ${m[0]}">${esc(m[1])}${m[2]?`<em>${esc(m[2])}</em>`:''}${m[4]||''}${m[3]&&m[0]!=='sys'?`<time>${m[3]}</time>`:''}</div>`;
 const showTo=n=>{wi=n;wa.innerHTML=WAMSG.slice(0,n).map(bub).join('');wa.scrollTop=wa.scrollHeight;const st=n?stepOf[Math.min(n,WAMSG.length)-1]:-1;steps.forEach((l,i)=>l.classList.toggle('on',i===st))};
 const next=()=>{if(wi>=WAMSG.length){showTo(0)}wa.insertAdjacentHTML('beforeend',bub(WAMSG[wi]));wi++;wa.scrollTop=wa.scrollHeight;steps.forEach((l,i)=>l.classList.toggle('on',i===stepOf[wi-1]));
  document.getElementById('p3bWAnext').textContent=wi>=WAMSG.length?'Start again':'Next message'};
 document.getElementById('p3bWAnext').onclick=()=>{clearInterval(wt);next()};
 document.getElementById('p3bWAplay').onclick=()=>{clearInterval(wt);showTo(0);next();wt=setInterval(()=>{if(wi>=WAMSG.length||!document.body.contains(wa)){clearInterval(wt);return}next()},1100)};
 addEventListener('afya:leave',()=>clearInterval(wt),{once:true});
 showTo(WAMSG.length);document.getElementById('p3bWAnext').textContent='Start again';
 /* web store */
 const cart={};const draw=()=>{const ks=Object.keys(cart);let tot=0;document.getElementById('p3bWL').innerHTML=ks.length?ks.map(k=>{const x=WEBP[k];tot+=x[2]*cart[k];return `<div><span>${esc(x[0])} ×${cart[k]}</span><b>${kk(x[2]*cart[k])}</b></div>`}).join('')+`<div><span>Delivery</span><b>${kk(I.online.delivery_fee)}</b></div>`:'<div><span>Empty, tap Add</span><b></b></div>';
  document.getElementById('p3bWT').textContent=T(ks.length?tot+I.online.delivery_fee:0);document.getElementById('p3bCartB').textContent='Basket · '+ks.reduce((a,k)=>a+cart[k],0)};
 document.querySelectorAll('.p3b-wp button').forEach(b=>b.onclick=()=>{cart[b.dataset.w]=(cart[b.dataset.w]||0)+1;draw()})}
window.SECTIONS['s3-8']={render:s38,init:initS38};
})();
