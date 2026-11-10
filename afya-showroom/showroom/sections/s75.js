/* 7.5 Proof pack, Q&A and sources · v2 on the D2 template.
   Investor Q&A (category filter and search), the data-room index, the open questions and the master source list.
   Sources are regenerated from the research files: a curated list per research topic (R1–R5, R7, R9, the 0.1 figures,
   the exchange rate), plus every guidance link and shelf-price page held in window.AFYA_DATA (built from data/),
   de-duplicated by address. Each source shows the date it was checked, or that it was seen only in search results or
   not re-opened. Numbers in the answers are read from MODEL (they follow the funding switch) or from the research. */
(function(){
'use strict';
const A=()=>window.AB,T=(e,s)=>A().T(e,s),E=s=>A().E(s),N=(k,v,f)=>A().numHTML(k,v,f);
const DATA=()=>window.AFYA_DATA||{boxes:{},services:[],nutrition:[]};
const tsh=n=>'TSh '+Math.round(n).toLocaleString('en-US');
const pct=n=>String(parseFloat((n*100).toFixed(1)))+'%';
const sum=a=>a.reduce((t,x)=>t+x,0);
const est=()=>`<span class="ab-est">${E(T('estimate','makadirio'))}</span>`;
const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const day=iso=>{const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso||''));return m?`${+m[3]} ${MON[+m[2]-1]} ${m[1]}`:(iso||'')};
const key=u=>String(u||'').trim().replace(/[#?]$/,'').replace(/\/+$/,'').toLowerCase();

/* ---------- curated sources from the research files (st: ok = opened on chk; snip = search result only; old = seen earlier, not re-opened) ---------- */
const o=(t,u,chk,st)=>({t,u,chk,st:st||'ok'});
const G=[
 {k:'fig',en:'Health figures on the home page',sw:'Takwimu za afya kwenye ukurasa wa mwanzo',items:[
  o('Mayige M.T. et al., Hypertension burden among adults aged 18 to 69 in Tanzania: 2023 National STEPS survey, Tanzania Journal of Health Research 27(2), 2026','https://nhrdr.nimr.or.tz/records/209','9 Nov 2026'),
  o('WHO, United Republic of Tanzania hypertension country profile (2012 STEPS survey)','https://cdn.who.int/media/docs/default-source/country-profiles/hypertension/tza_en.pdf','9 Nov 2026')]},
 {k:'reg',en:'Regulation, licences, duties and fees',sw:'Udhibiti, leseni, ushuru na ada',items:[
  o('TBS, Pre-shipment Verification of Conformity (PVoC) page','https://www.tbs.go.tz/pages/pre-shipment-verification-of-conformity-pvoc','9 Nov 2026'),
  o('TBS, Guideline for the PVoC Programme 2025','https://www.tbs.go.tz/uploads/text-editor/files/GUIDELINE%20FOR%20PVOC%20PROGRAMME%20-%202025_1786358618.pdf','9 Nov 2026'),
  o('TBS, Summarised PVoC procedure, August 2026','https://www.tbs.go.tz/uploads/text-editor/files/SUMMERISED%20PVOC%20PROCEDURE-AUGUST%202026_1786359313.pdf','9 Nov 2026'),
  o('TBS, List of contracted PVoC service providers and their zones','https://www.tbs.go.tz/uploads/text-editor/files/LIST%20OF%20CONTRACTED%20PSPs%20FOR%20GENERAL%20GOODS%20AND%20THEIR%20RESPECTIVE%20ZONES%20(1)_1786359965.pdf','9 Nov 2026'),
  o('TBS, Penalty for un-inspected general goods under PVoC, 2025','https://www.tbs.go.tz/uploads/text-editor/files/PENALTY%20FOR%20UN-INSPECTED%20GENERAL%20GOODS%20REGULATED%20UNDER%20PVOC%20PROGRAMME-2025_1786359408.pdf','9 Nov 2026'),
  o('TBS, PVoC exempted categories and criteria','https://www.tbs.go.tz/uploads/text-editor/files/PVoC%20EXEMPTED%20CATEGORIES%20&%20CRITERIA.FINAL_1786358807.pdf','9 Nov 2026'),
  o('TBS, PVoC regulated HS codes, 29 March 2025','https://www.tbs.go.tz/uploads/text-editor/files/PVoC%20HS%20Codes%2029%20March%202025_1785233045.pdf','9 Nov 2026'),
  o('TBS, Destination inspection page','https://www.tbs.go.tz/pages/destination-inspection-di','9 Nov 2026'),
  o('TBS, Products and premises registration page','https://www.tbs.go.tz/pages/products-and-premises-registration','9 Nov 2026'),
  o('TBS, Standards (Fees and Charges) Regulations 2021, GN 496L','https://www.tbs.go.tz/uploads/documents/en-1786361569-The%20Standards%20(Fees%20and%20Charges)%20Regulations,%202021.pdf','9 Nov 2026'),
  o('TBS, Standards (Imports Registration and Batch Certification) Regulations 2021, GN 681','https://www.tbs.go.tz/uploads/documents/sw-1786362149-The%20Standards%20(%20Imports%20Registration%20And%20Batch%20Certification)%20Regulations,%202021.pdf','9 Nov 2026'),
  o('TBS, Batch certification amendment regulations, GN 127 of 2025','https://www.tbs.go.tz/uploads/documents/sw-1786362319-Batch%20Amendment%20Regulation.pdf','9 Nov 2026'),
  o('TBS, Guideline for registration of cosmetics (Nov 2022)','https://www.tbs.go.tz/uploads/documents/sw-1786606993-GUIDELINE%20FOR%20A%20CLIENT%20WHO%20WISH%20TO%20APPLY%20FOR%20REGISTRATION%20OF%20COSMETICS.pdf','9 Nov 2026'),
  o('TBS, List of compulsory Tanzania standards (Oct 2026)','https://www.tbs.go.tz/uploads/text-editor/files/LIST%20OF%20COMPULSORY%20TANZANIA%20STANDARD_1793265667.pdf','9 Nov 2026'),
  o('TBS, Handbook 2026','https://www.tbs.go.tz/uploads/documents/sw-1786625976-TBS_Handbook_A5_2026.pdf','9 Nov 2026'),
  o('Finance Act No. 8 of 2019 (cosmetics and food move from TMDA to TBS)','https://www.tmda.go.tz/uploads/1678774965-8.%20THE%20FINANCE%20ACT,%202019%20,%20Act%20NO.%208-.pdf','9 Nov 2026'),
  o('Tanzania Medicines and Medical Devices Act, Cap 219 (R.E. 2023 text)','https://www.tmda.go.tz/uploads/1779257152-2025%20TMDA%20ACT.pdf','9 Nov 2026'),
  o('TMDA, Fees and Charges (Amendment) Regulations 2024','https://www.tmda.go.tz/uploads/1718887575-FEES%20AND%20CHARGES%20AMENDMENT%20JUNE%202024%20FINAL.pdf','9 Nov 2026'),
  o('TMDA, Fees and Charges Regulations, GN 686 of 2021','https://www.tmda.go.tz/uploads/publications/en1651218601-GN%20NO.%20686%20FEES%20REG%20(1).pdf','9 Nov 2026'),
  o('TMDA, Fees and charges for medical device premises licensing and compliance','https://www.tmda.go.tz/pages/fees-and-charges-for-medical-devices-premises-licensing-and-compliance','9 Nov 2026'),
  o('TMDA, Medical devices assessment fees and charges','https://www.tmda.go.tz/pages/medical-devices-assessment-fees-and-charges','9 Nov 2026'),
  o('TMDA, Registration and licensing of premises (medical devices)','https://www.tmda.go.tz/pages/registration-and-licensing-of-premises-1','9 Nov 2026'),
  o('TMDA, Registration and licensing of premises (medicines)','https://www.tmda.go.tz/pages/registration-and-licensing-of-premises','9 Nov 2026'),
  o('TMDA, Import and export control of medical devices','https://www.tmda.go.tz/pages/import-and-export-control-of-medical-devices','9 Nov 2026'),
  o('TMDA, Guidelines for importation and exportation of medical devices, Rev 02 (May 2024)','https://www.tmda.go.tz/uploads/publications/en1755006678-en1728063896-GUIDELINES%20FOR%20IMPORTATION%20AND%20EXPORTATION%20OF%20MEDICAL%20DEVICES%20-%2017.05%20(1).pdf','9 Nov 2026'),
  o('TMDA, Compendium of guidelines for marketing authorisation of medical devices (June 2024)','https://www.tmda.go.tz/uploads/publications/en1755088789-Compendium%20of%20Guidelines%20for%20Marketing%20Authorization%20of%20Medical%20Devices,%20Diagnostics%20and%20Laboratory%20Equipment,%20June%202024.pdf','9 Nov 2026'),
  o('TMDA, Good Storage and Distribution Practices Regulations 2021','https://www.tmda.go.tz/uploads/publications/en1755613583-en1667292289-The%20Tanzania%20Medicines%20and%20Medical%20Devices%20(Good%20Storage%20and%20Distribution%20Practices)%20Regulations,%202021.pdf','9 Nov 2026'),
  o('TRA, Taxes and Duties at a Glance 2025/2026','https://www.tra.go.tz/images/uploads/pages/TAXES_AND_DUTIES_AT_A_GLANCE_2025_2026.pdf','9 Nov 2026'),
  o('TRA, EAC Common External Tariff 2022 (updated June 2025)','https://www.tra.go.tz/images/uploads/pages/CET_2022_VERSION_Updated_June_2025.pdf','9 Nov 2026'),
  o('TRA, Customs Processing Fee Regulations 2026, GN 158D','https://www.tra.go.tz/images/uploads/acts/GN_158D-THE_TANZANIA_REVENUE_AUTHORITY_%28CUSTOMS_PROCESSING_FEE%29_REGULATIONS%2C_2026-TGPA.pdf','9 Nov 2026'),
  o('TRA, Finance Act 2026','https://www.tra.go.tz/images/uploads/acts/THE_FINANCE_ACT%2C_2026.pdf','9 Nov 2026'),
  o('TRA, Finance Act 2024','https://www.tra.go.tz/images/uploads/acts/Finance_Act_2024_%281%29.pdf','9 Nov 2026'),
  o('TRA, Value Added Tax Act Cap. 148 R.E. 2019','https://www.tra.go.tz/images/uploads/acts/CAP_148-THE_VALUE_ADDED_TAX_ACT.pdf','9 Nov 2026'),
  o('TRA, Value added tax page','https://www.tra.go.tz/page/value-added-tax-vat','9 Nov 2026'),
  o('TRA, Starting a business and taxpayer identification number','https://www.tra.go.tz/page/starting-business-income-for-individuals-and-paying-taxes%20','9 Nov 2026'),
  o('TRA, Import procedures','https://www.tra.go.tz/page/import-procedures','9 Nov 2026'),
  o('TRA, Trading across borders','https://www.tra.go.tz/page/trading-across-borders','9 Nov 2026'),
  o('TRA, Stamp duty','https://www.tra.go.tz/page/stamp-duty%20','9 Nov 2026'),
  o('BRELA, Company fees (tozo za kampuni)','https://www.brela.go.tz/pages/tozo-za-kampuni','9 Nov 2026'),
  o('BRELA, Public notice on beneficial-owner filing, 6 Jan 2026','https://www.brela.go.tz/uploads/documents/sw-1767859137-TAARIFA%20KWA%20UMMA%20BO%20-%20BRELA%202.pdf','9 Nov 2026'),
  o('BRELA, Public notice on the upgraded online service system, 8 Apr 2026','https://www.brela.go.tz/uploads/documents/sw-1775729096-TAARIFA%20KWA%20UMMA%20-%20MATUMIZI%20YA%20MFUMO%20ULIOBORESHWA%20%20WA%20UTOAJI%20HUDUMA.pdf','9 Nov 2026'),
  o('BRELA, Public notice on Class A business licences online, 29 Jul 2026','https://www.brela.go.tz/uploads/documents/sw-1785309217-TAARIFA%20KWA%20UMMA-BRELA.pdf','9 Nov 2026'),
  o('BRELA, Public notice on annual returns, 6 Aug 2026','https://www.brela.go.tz/uploads/documents/sw-1786089983-TAARIFA%20KWA%20UMMA-ANNUAL%20RETURNS.pdf','9 Nov 2026'),
  o('Business Licensing Regulations 2023, GN 626','https://www.brela.go.tz/uploads/documents/sw-1713267776-Kanuni%20za%20Utoaji%20wa%20Leseni%20za%20Biashara%20za%20Mwaka%202023.pdf','9 Nov 2026'),
  o('Business licence fee schedule, Finance Act 2014','https://www.brela.go.tz/uploads/documents/sw-1667378781-Finance%20Act%202014%20(1).pdf','9 Nov 2026'),
  o('KPMG, BRELA public notice of 10 March 2025 on beneficial ownership','https://assets.kpmg.com/content/dam/kpmg/ke/pdf/tax/2025/BRELA%20Public%20Notice_10%20March%202025.pdf','','snip'),
  o('KPMG, Submission of beneficial ownership information in the company','https://kpmg.com/ke/en/insights/2025/03/submission-of-beneficial-ownership-information-in-the-company.html','','snip'),
  o('Clyde & Co, Tanzania tax update: Finance Act 2024','https://www.clydeco.com/en/insights/2024/07/tanzania-tax-update-finance-act-2024','','snip'),
  o('Trading TZ, Cost of registering a business in Tanzania','https://tradingtz.blogspot.com/2025/10/coat-of-registering-business-in-tanzania.html','','snip'),
  o('WikiProcedure, Tanzania: apply for a cosmetic import permit or licence','https://wikiprocedure.com/index.php/Tanzania_-_Apply_for_Cosmetic_Import_Permit_or_License','','snip')]},
 {k:'fx',en:'Exchange rates',sw:'Viwango vya kubadilisha fedha',items:[
  o('Bank of Tanzania, exchange rates: mean rates for trading date 10 Nov 2026 (US$1 = TSh 2,642.50)','https://www.bot.go.tz/ExchangeRate/excRates','10 Nov 2026')]},
 {k:'kiosk',en:'The Afya Check kiosk',sw:'Kibanda cha Afya Check',items:[
  o('Made-in-China, Leka HW-900G self health check-up kiosk (listing price)','https://www.made-in-china.com/video-channel/lekascale_BOQtqHLynZRA_Hw-900g-Multi-Functions-Self-Health-Check-up-Physical-Examination-Kiosk.html','9 Nov 2026'),
  o('Made-in-China, Dingheng DHM-900C health station (listing price)','https://www.made-in-china.com/video-channel/dingheng_OGcpeLguXNrV_Dhm-900c-Physical-Training-Health-Station-with-and-Secure-Data-Transfer-for-Paperless-Records.html','9 Nov 2026'),
  o('Made-in-China, Dingheng DHM-900C-S multi-parameter health station','https://www.made-in-china.com/video-channel/dingheng_iGbRlKXCEjUz_Multi-Parameter-Health-Station-with-Thermal-Printer-Instant-Patient-Reports.html','9 Nov 2026'),
  o('Made-in-China, Dingheng DHM-T90 drugstore health kiosk','https://www.made-in-china.com/video-channel/dingheng_OTgYNrnlYhRe_Smart-Drugstore-Clinic-Kiosk-for-Health-Assessments-and-Services.html','9 Nov 2026'),
  o('Made-in-China, Shanghe health check-up kiosk','https://www.made-in-china.com/video-channel/zzshdz_vQupGNqKLBhZ_China-Factory-Price-Health-Checkup-Machine-Touch-Screen-Monitor-Vending-Hospital-Self-Service-Kiosk-Body-Fat-Analysis.html','9 Nov 2026'),
  o('Made-in-China, WinVast 17-indicator health kiosk','https://www.made-in-china.com/video-channel/yingfan666888_ePYpzUoKgghi_Self-Service-Touch-Screen-Health-Kiosk-Teleconsultation-Health-Check-Kiosk-Medical-Kiosk-Health-ATM-3D-Body-Composition-Analyzer.html','9 Nov 2026'),
  o('Made-in-China, WinVast 36-item health screening kiosk','https://www.made-in-china.com/video-channel/yingfan666888_tuAUHxOMgzWZ_21-5inch-HD-LCD-Medical-Examination-Kiosk-Self-Service-Health-Screening-Kiosk-Health-Checkup-Kiosk-with-Blood-Pressure-BMI-OEM.html','9 Nov 2026'),
  o('Made-in-China, Leka HW-V6000 health screening kiosk','https://www.made-in-china.com/video-channel/lekascale_GOLAHoXTXZUl_Hw-V6000-Self-Service-Health-Screening-Kiosk-Healthcare-Kiosk.html','9 Nov 2026'),
  o('Made-in-China, Shanghe SH-T16 self-service health check kiosk','https://www.made-in-china.com/video-channel/zzshdz_LRXYwPJvaGcU_Sh-T16-Hospital-Medical-Clinic-Self-Service-Health-Check-Self-Service-Kiosk.html','9 Nov 2026'),
  o('Made-in-China, Dingheng DHM-T600 modular health check-up kiosk','https://www.made-in-china.com/video-channel/dingheng_FfrRYqlDgOUp_Modular-Health-Check-up-Kiosk-Dhm-T600-Optional-Spirometry-Vision-Test-Grip-Strength.html','9 Nov 2026'),
  o('Made-in-China, Health kiosk search listing (prices, minimum orders, certificates)','https://www.made-in-china.com/products-search/hot-china-products/Health_Kiosk.html','9 Nov 2026'),
  o('Made-in-China, Health screening kiosk search listing','https://www.made-in-china.com/products-search/hot-china-products/Health_Screening_Kiosk.html','9 Nov 2026'),
  o('Sonka, company profile (E600A kiosk)','https://sonka.en.alibaba.com/company_profile.html','','snip'),
  o('China.org.ru, Sonka E600A kiosk listing','https://china.org.ru/product/1600977690741','','snip'),
  o('China.org.ru, HW-V7000 kiosk listing','https://china.org.ru/product/1600596223802','','snip'),
  o('Leka, Alibaba company profile','https://hnljdz.en.alibaba.com/en_US/company_profile.html','','snip'),
  o('How We Made It In Africa, Ilara Health device leasing (Kenya)','https://www.howwemadeitinafrica.com/p/how-ilara-health-found-a-way-to-sell-healthcare-devices-to-informal-cl','','snip')]},
 {k:'price',en:'Pricing benchmark',sw:'Ulinganisho wa bei',items:[
  o('AfyaDepot, home page (free delivery on pharmacy orders above TSh 150,000 in Dar es Salaam)','https://afyadepot.co.tz/','9 Nov 2026'),
  o('AfyaDepot, sitemap of product pages','https://afyadepot.co.tz/sitemap.xml','9 Nov 2026'),
  o('AfyaDepot, delivery and return policy (page returned an error; text seen in search results)','https://afyadepot.co.tz/delivery-return-policy','','snip'),
  o('Yopki, Shoppers Plaza, Mbezi Beach (branch location)','https://yopki.com/explore/tz/dsm/mbezi-beach/shoppers-plaza','','snip'),
  o('JETRO 2015, Retail basic data, Tanzania','https://www.jetro.go.jp/ext_images/theme/bop/precedents/pdf/retail-basicdata_20150913_tz.pdf','','snip')]},
 {k:'presale',en:'Pre-sale and consumer law',sw:'Mauzo ya awali na sheria ya walaji',items:[
  o('Fair Competition Act 2003 (Act No. 8 of 2003), WIPO Lex','https://www.wipo.int/wipolex/en/legislation/details/9060','','snip'),
  o('Fair Competition Act 2003, WIPO Lex text','https://www.wipo.int/wipolex/en/text/216550','','snip'),
  o('Fair Competition Act 2003, TanzLII','https://tanzlii.org/akn/tz/act/2003/8/eng@2003-12-31/source.pdf','','snip'),
  o('Fair Competition Act 2003, Ministry of Industry copy','https://www.viwanda.go.tz/uploads/documents/sw-1618818548-fca_no_8-2003.pdf','','snip'),
  o('Fair Competition Act, Office of the Solicitor General e-library','https://elibrary.osg.go.tz/server/api/core/bitstreams/8b4eb83a-59ee-4b48-b6a8-d419257fca7f/content','','snip'),
  o('Fair Competition Act Cap. 285 as at 31 July 2002, TanzLII','https://tanzlii.org/akn/tz/act/1994/4/eng@2002-07-31/source','','snip'),
  o('Clyde & Co, Tanzania’s requirement to register standard form consumer contracts with the Fair Competition Commission (Oct 2025)','https://www.clydeco.com/en/insights/2025/10/tanzania-s-requirement-to-register-standard-form-c','','snip'),
  o('Clyde & Co, Notable amendments to the Fair Competition Act of 2003 (Nov 2024)','https://www.clydeco.com/en/insights/2024/11/notable-amendments-to-the-fair-competition-act','','snip'),
  o('KG Partners, The regulations that guide standard form consumer contracts in Tanzania','https://kgpartners.co.tz/?p=630','','snip'),
  o('Mondaq, Statutory registration of standard terms and conditions','https://www.mondaq.com/contracts-and-commercial-law/411234/statutory-registration-of-standard-terms-and-conditions','','snip'),
  o('Lexology, Tanzania’s public notice on standard form consumer contracts','https://www.lexology.com/library/detail.aspx?g=2fb515d8-7a1f-4386-9406-c3e5c5b6f8cc','','snip'),
  o('The Citizen, Stakeholders seek stronger rules to make consumer reforms work','https://www.thecitizen.co.tz/tanzania/business/stakeholders-seek-stronger-rules-to-make-consumer-reforms-work-5387482','','snip'),
  o('Electronic Transactions Act, Commonwealth trade repository','https://tradecca.thecommonwealth.org/policy-repository/electronic-transactions-act-11/','','snip'),
  o('Electronic Transactions Act, ICT Policy Africa','https://ictpolicyafrica.org/en/document/0gcpmf7udd75?page=6','','snip'),
  o('FB Attorneys, Online suppliers of services','https://fbattorneys.co.tz/online-suppliers-of-services/','','snip'),
  o('Electronic Transactions Act Cap 442 R.E. 2022, Ministry of Finance','https://www.mof.go.tz/uploads/documents/en-1676545044-THE%20ELECTRONIC%20TRANSACTIONS%20ACT,%20CAP%20442%20R.E.%202022.pdf','','snip')]},
 {k:'pay',en:'Payments',sw:'Malipo',items:[
  o('Bank of Tanzania, National Payment Systems Annual Report 2025','https://www.bot.go.tz/Publications/Regular/Annual%20Report/en/2026060211494565.pdf','9 Nov 2026'),
  o('Bank of Tanzania, National Payment System Annual Report 2024','https://www.bot.go.tz/Publications/Regular/Annual%20Report/sw/2025032515311662.pdf','9 Nov 2026'),
  o('Bank of Tanzania, National Payment System Annual Report 2023','https://www.bot.go.tz/Publications/Regular/Annual%20Report/en/2024082116493467.pdf','9 Nov 2026'),
  o('Bank of Tanzania, National Payment Systems Annual Report 2022','https://www.bot.go.tz/Publications/Regular/Annual%20Report/en/2024020511594863.pdf','9 Nov 2026'),
  o('Bank of Tanzania, Customer Experience Guideline for Merchant Payments (May 2023)','https://www.bot.go.tz/Publications/Acts,%20Regulations,%20Circulars,%20Guidelines/Guidelines/sw/2023062016582894.pdf','9 Nov 2026'),
  o('Vodacom Tanzania PLC, Annual Integrated Report 2025','https://www.vodacom.co.tz/assets/uploads/Vodacom_Tanzania_PLC_Annual_Integrated_Report_2025_f75bdd1d49.pdf','9 Nov 2026'),
  o('python-pesa 0.7, third-party Vodacom Tanzania Open API client','https://pypi.org/project/python-pesa/0.7','9 Nov 2026'),
  o('azampay 0.0.5, third-party Node SDK','https://registry.npmjs.org/azampay/-/azampay-0.0.5.tgz','9 Nov 2026'),
  o('Safaricom, Standing order feature for M-PESA users (Kenya, 20 Sep 2024)','https://safaricom.co.ke/media-center-landing/press-releases/safaricom-rolls-out-a-standing-order-feature-for-m-pesa-users','','snip'),
  o('Eastleigh Voice, Safaricom standing order feature','https://eastleighvoice.co.ke/business/79169/safaricom-rolls-out-standing-order-feature-for-m-pesa-users','','snip'),
  o('python-pesa documentation, direct debit','https://kalebu.github.io/python-pesa/docs/direct_debit','','snip'),
  o('Yas, Lipa kwa Simu terms and conditions','https://www.yas.co.tz/wp-content/uploads/2025/03/LIPA-KWA-SIMU-TERMS-AND-CONDITIONS.pdf','','snip'),
  o('TemboPlus, Mobile money collection','https://tembo.gitbook.io/tembo/reference/mobile-money-collection','','snip'),
  o('pyairtel','https://pypi.org/project/pyairtel/','','snip'),
  o('ClickPesa engineering blog, USSD push for mobile money payments','https://medium.com/clickpesa-engineering-blog/get-to-know-ussd-push-for-mobile-money-payments-741da153e5ad','','snip'),
  o('Pesapal API 3.0, recurring payments','https://developer.pesapal.com/how-to-integrate/e-commerce/api-30-json/recurringpayments','','snip'),
  o('Bakhresa Group, AzamPay Tanzania Limited','https://bakhresa.com/azampay-tanzania-limited/','','snip'),
  o('Business Today, DPO Pay approval to operate in Tanzania','https://businesstoday.co.ke/digital-payments-firm-dpo-pay-gets-nod-to-operate-in-tanzania','','snip'),
  o('Kolonell, Recurring billing and subscriptions with M-Pesa in Tanzania','https://kolonell.com/en/blog/recurring-billing-subscriptions-mpesa-tanzania-2026','','snip'),
  o('AzamPay, pricing page (could not be opened)','https://azampay.com/pricing','','snip')]},
 {k:'svc',en:'Partner services',sw:'Huduma za washirika',items:[
  o('AfyaDepot, Home nursing care: senior home-care visit','https://www.afyadepot.co.tz/product/senior-home-care-visit','10 Nov 2026'),
  o('AfyaDepot, Bed bath and hygiene','https://www.afyadepot.co.tz/product/bed-bath-hygiene','10 Nov 2026'),
  o('AfyaDepot, IM/SC injection administration','https://www.afyadepot.co.tz/product/im-sc-injection-admin','10 Nov 2026'),
  o('AfyaDepot, Full vital signs check','https://www.afyadepot.co.tz/product/full-vital-signs-check','10 Nov 2026'),
  o('AfyaDepot, Lymphatic drainage massage','https://www.afyadepot.co.tz/product/lymphatic-drainage-massage','10 Nov 2026'),
  o('AfyaDepot, MamaSave antenatal profile','https://www.afyadepot.co.tz/product/mamasave-anc-profile','10 Nov 2026'),
  o('The Citizen, How mothers in rural Tanzania pay the price for “free” maternal care (27 Apr 2026)','https://www.thecitizen.co.tz/tanzania/news/national/how-mothers-in-rural-tanzania-pay-the-price-for-free-maternal-care-5437524','10 Nov 2026'),
  o('EA Health, PRINMAT','https://eahealth.org/node/7250','','snip'),
  o('Shree Hindu Mandal Hospital, Baby and child wellness clinic','https://www.shm.or.tz/baby-and-child-wellness-clinic','','snip'),
  o('London Health Centre, Paediatrics','https://www.lhc.co.tz/service-page/paediatrics','','snip'),
  o('Massage prices, Dar es Salaam','https://massageprices.pages.dev/tanzania/dar-es-salaam','','snip'),
  o('Fresha, Massage listings in Dar es Salaam','https://www.fresha.com/lp/en/bt/massage/in/tz-dar-es-salaam','','snip')]},
 {k:'nut',en:'Infant and young child feeding',sw:'Ulishaji wa watoto wachanga na wadogo',items:[
  o('WHO fact sheet, Infant and young child feeding','https://www.who.int/news-room/fact-sheets/detail/infant-and-young-child-feeding','10 Nov 2026'),
  o('WHO health topic, Complementary feeding','https://www.who.int/health-topics/complementary-feeding','10 Nov 2026'),
  o('WHO 2023, Guideline for complementary feeding of infants and young children 6–23 months of age','https://www.who.int/publications/i/item/9789240081864','10 Nov 2026'),
  o('WHO 1981, International Code of Marketing of Breast-milk Substitutes','https://www.who.int/publications/i/item/9241541601','10 Nov 2026'),
  o('WHO eLENA, Regulation of marketing breast-milk substitutes','https://www.who.int/tools/elena/interventions/regulation-breast-milk-substitutes','10 Nov 2026'),
  o('WHO 2016, Guidance on ending the inappropriate promotion of foods for infants and young children','https://www.who.int/publications/i/item/9789241513470','10 Nov 2026'),
  o('WHO and UNICEF, Marketing of breast-milk substitutes: national implementation of the International Code, status report 2026','https://www.who.int/publications/i/item/9789240122758','10 Nov 2026'),
  o('WHO 2016 antenatal care recommendations, summary chart','https://www.who.int/docs/default-source/reproductive-health/maternal-health/anc.pdf?sfvrsn=5e2c740e_2','10 Nov 2026'),
  o('ENN Field Exchange 72, WHO guideline for complementary feeding','https://ennonline.net/fex/72/who-guideline-for-complementary-feeding-of-infants-and-young-children','','snip'),
  o('Baby Milk Action, WHO complementary feeding guideline','https://www.babymilkaction.org/?p=40236','','snip'),
  o('Tanzania GN 60 of 2013 regulations on marketing of foods for infants and young children (trade barriers database)','https://tradebarriers.org/ntm/regulations/view/2594','','snip')]}];

/* ---------- sources held in the box data: guidance and shelf-price pages ---------- */
const CUT=/\s*[(,.;:–—-]*\s*(NOT OPENED|not opened|not re-?checked|not re-?opened|search[- ](snippet|result)s?|seen in (a )?search|cited (in|from)|from the (old|earlier)|host refused|refused by|this session|page not opened)/i;
const flagOf=(t,note)=>{const s=(t||'')+' '+(note||'');if(/not re-?checked|not re-?opened|cited (in|from)|from the (old|earlier)/i.test(s))return 'old';if(/NOT OPENED|not opened|snippet|search result|not reachable|could not be opened|host refused/i.test(s))return 'snip';return 'ok'};
const clean=t=>{let s=String(t||'');const i=s.search(CUT);if(i>0)s=s.slice(0,i);return s.replace(/\(draft, /i,'(').replace(/[\s(,;:.–—-]+$/,'').trim()};
const BOXN={};
function dataGroups(){const D=DATA(),gd=[],shelf=[];const names=k=>{const b=D.boxes[k];return b&&b.name?(b.name.en||k):k};
 Object.keys(D.boxes).forEach(k=>{const b=D.boxes[k];BOXN[k]=names(k);
  (b.guidance||[]).forEach(x=>{if(x.u)gd.push({t:clean(x.t),u:x.u,chk:day(x.chk),st:flagOf(x.t,x.note),box:names(k)})});
  const rows=[];(b.stages||[]).forEach(s=>(s.items||[]).filter(it=>it.kind!=='medicine').forEach(it=>(it.brands||[]).forEach(br=>{const src=br.src;if(!src||!src.u)return;
   rows.push({t:`${clean(src.name||'')}: ${br.brand||''} ${br.product||''}${br.pack?', '+br.pack:''}`.replace(/\s+/g,' ').trim(),u:src.u,chk:day(src.chk),st:flagOf(src.name,br.note),cur:br.status})})));
  (b.luxury||[]).forEach(x=>{if(x.src&&x.src.u)rows.push({t:`${clean(x.src.name||'')}: ${(x.name&&x.name.en)||''}`,u:x.src.u,chk:day(x.src.chk),st:flagOf(x.src.name,x.note),cur:x.status})});
  if(rows.length)shelf.push({k,en:names(k),sw:(b.name&&b.name.sw)||names(k),items:rows})});
 const nut=(D.nutrition||[]).filter(x=>x.src&&x.src.u).map(x=>({t:`${clean(x.src.name||'')}: ${x.brand||''} ${(x.name&&x.name.en)||''}${x.pack?', '+x.pack:''}`.replace(/\s+/g,' ').trim(),u:x.src.u,chk:day(x.src.chk),st:flagOf(x.src.name,x.note),cur:x.status}));
 if(nut.length)shelf.push({k:'lishe',en:'Lishe nutrition shelf',sw:'Rafu ya Lishe',items:nut});
 const svc=(D.services||[]).map(s=>s.src&&typeof s.src==='object'&&s.src.u?{t:clean(s.src.name||''),u:s.src.u,chk:day(s.src.chk),st:flagOf(s.src.name,s.note)}:(typeof s.src==='string'&&/^https?:/.test(s.src)?{t:(s.name&&s.name.en)||s.src,u:s.src,chk:'',st:'old'}:null)).filter(Boolean);
 return {gd,shelf,svc}}

/* all groups, de-duplicated by address (first group wins) */
let CACHE=null;
function allSources(){if(CACHE)return CACHE;const seen=new Set(),add=(list)=>list.filter(x=>{const k2=key(x.u);if(!x.u||seen.has(k2))return false;seen.add(k2);return true});
 const {gd,shelf,svc}=dataGroups();
 const groups=G.map(g=>({k:g.k,en:g.en,sw:g.sw,items:add(g.k==='svc'?g.items.concat(svc):g.items)}));
 groups.push({k:'guide',en:'Health guidance behind the boxes',sw:'Miongozo ya afya inayoongoza maboksi',items:add(gd)});
 const sh=shelf.map(s=>({k:'shelf-'+s.k,en:s.en,sw:s.sw,items:add(s.items)})).filter(s=>s.items.length);
 CACHE={groups:groups.filter(g=>g.items.length),shelf:sh};return CACHE}
function counts(){const {groups,shelf}=allSources(),all=groups.flatMap(g=>g.items).concat(shelf.flatMap(s=>s.items));
 return {all,n:all.length,ok:all.filter(x=>x.st==='ok').length,snip:all.filter(x=>x.st==='snip').length,old:all.filter(x=>x.st==='old').length,shelfN:sum(shelf.map(s=>s.items.length)),ke:shelf.flatMap(s=>s.items).filter(x=>x.cur==='KE').length}}
const stTxt=x=>x.st==='ok'?T(`checked ${x.chk}`,`imekaguliwa ${x.chk}`):x.st==='snip'?T('search result only, page not opened','matokeo ya utafutaji pekee, ukurasa haukufunguliwa'):(x.chk?T(`seen ${x.chk}, not re-opened`,`ilionekana ${x.chk}, haijafunguliwa tena`):T('not re-opened','haijafunguliwa tena'));
const li=x=>`<li data-q="${E((x.t+' '+x.u+(x.box?' '+x.box:'')).toLowerCase())}"><span lang="en"><a href="${E(x.u)}" target="_blank" rel="noopener">${E(x.t)}</a></span> <span class="ab-chk s75-${x.st}">· ${E(stTxt(x))}</span></li>`;
const grpHTML=(g,lvl)=>`<details class="s75-g" data-g="${E(g.k)}"><summary><span>${E(T(g.en,g.sw))}</span> <span class="ab-mute">(${g.items.length})</span></summary><ol>${g.items.map(li).join('')}</ol></details>`;

/* ---------- investor questions ---------- */
function QA(){const M=window.MODEL,I=M.inputs,r=M.get('base'),bt=M.get('best'),dn=M.get('down'),lean=A().isLean(),sd=I.seed,D4=window.AFYA_D4||{SAVING:{m1:.03,m6:.06,m12:.09},DELIVERY:3500};
 const mem=Math.round(r.months[11].members),churn=I.members.monthly_churn,own=I.ownership,comp=sum(sd.use.filter(u=>/compliance/i.test(u[0])).map(u=>u[1]));
 let low=null;try{low=window.AB_S6.cashPath(I,dn).low}catch(e){}
 const opt=lean?T('start-small','kuanza kidogo'):T('flagship','duka kuu');const C=counts();
 const sv=`${Math.round(D4.SAVING.m1*100)}% / ${Math.round(D4.SAVING.m6*100)}% / ${Math.round(D4.SAVING.m12*100)}%`;
 const bm=v=>v?T(`month ${v}`,`mwezi ${v}`):T('after year 1','baada ya mwaka 1');
 return [
 ['num',T('How reliable are the numbers on this site?','Namba zilizo kwenye tovuti hii zinaaminika kiasi gani?'),T(`<p>Every business number comes from one financial model (v1.2), so the same figure appears in every section, and every number that differs between the two funding options follows the switch at the top. The model’s inputs are <b>planning estimates</b> and are labelled so. Every shelf price links to the page it was read from, with the date checked; foreign prices show the original currency, the rate and the date (Bank of Tanzania, 10 Nov 2026). Of the ${N('q-sn',C.n,'int')} sources listed below, ${N('q-so',C.ok,'int')} were opened and checked; the rest are marked as seen only in search results or not re-opened.</p>`,`<p>Kila namba ya biashara inatoka kwenye modeli moja ya fedha (v1.2), kwa hiyo takwimu ileile inaonekana katika kila sehemu, na kila namba inayotofautiana kati ya machaguo mawili ya mtaji inafuata kibadilishi kilicho juu. Viingizo vya modeli ni <b>makadirio ya mipango</b> na vimeandikwa hivyo. Kila bei ya rafu inaunganishwa na ukurasa ilipochukuliwa, pamoja na tarehe ya kukaguliwa; bei za nje zinaonyesha sarafu ya asili, kiwango na tarehe (Benki Kuu ya Tanzania, 10 Nov 2026). Kati ya vyanzo ${N('q-sn',C.n,'int')} vilivyoorodheshwa hapa chini, ${N('q-so',C.ok,'int')} vilifunguliwa na kukaguliwa; vingine vimewekwa alama kuwa vilionekana kwenye matokeo ya utafutaji tu au havikufunguliwa tena.</p>`)],
 ['num',T('When does the store make its first monthly profit?','Duka linaanza kupata faida ya mwezi lini?'),T(`<p>In the base case of the ${opt} option the store makes its first monthly profit in <b>${bm(r.breakeven_month)}</b>; in the best case ${bm(bt.breakeven_month)}, in the downside case ${bm(dn.breakeven_month)}. This is the store level: gross profit less running costs, before head office, interest and tax. Section 6.1 shows the full path.</p>`,`<p>Katika hali ya msingi ya chaguo la ${opt}, duka linaanza kupata faida ya kila mwezi katika <b>${bm(r.breakeven_month)}</b>; katika hali bora ${bm(bt.breakeven_month)}, katika hali mbaya ${bm(dn.breakeven_month)}. Hii ni ngazi ya duka: faida ghafi ukiondoa gharama za uendeshaji, kabla ya ofisi kuu, riba na kodi. Sehemu 6.1 inaonyesha njia nzima.</p>`)],
 ['num',T('What revenue is expected in year 1?','Mapato ya mwaka 1 yanatarajiwa kuwa kiasi gani?'),T(`<p>Base-case year-1 revenue for the ${opt} option is <b>${N('q-rev',r.y1.revenue,'tshM')}</b> ${est()}, net of VAT, with <b>${N('q-mem',mem,'int')}</b> Afya Box members by month 12 ${est()}. Revenue comes from walk-in sales, Afya Box memberships, online orders and partner-service commissions.</p>`,`<p>Mapato ya mwaka 1 katika hali ya msingi kwa chaguo la ${opt} ni <b>${N('q-rev',r.y1.revenue,'tshM')}</b> ${est()}, bila VAT, pamoja na wanachama <b>${N('q-mem',mem,'int')}</b> wa Afya Box ifikapo mwezi 12 ${est()}. Mapato yanatoka kwenye mauzo ya dukani, uanachama wa Afya Box, oda za mtandaoni na kamisheni za huduma za washirika.</p>`)],
 ['num',T('What happens in the downside case?','Nini kinatokea katika hali mbaya?'),T(`<p>With demand 25% lower and running costs 5% higher, year-1 revenue is ${N('q-drev',dn.y1.revenue,'tshM')} ${est()}${low?` and the lowest bank balance in year 1 is <b>${N('q-dlow',low.v,'tshM')}</b> in month ${N('q-dlm',low.i,'int')}`:''}. Three answers are planned: more capital through a bridge agreed in advance, a bigger pre-sale, and cost cuts (marketing first, then hiring delayed). Sections 6.3 and 7.3 set out the triggers.</p>`,`<p>Mahitaji yakiwa chini kwa 25% na gharama za uendeshaji juu kwa 5%, mapato ya mwaka 1 ni ${N('q-drev',dn.y1.revenue,'tshM')} ${est()}${low?` na salio la chini kabisa la benki mwaka 1 ni <b>${N('q-dlow',low.v,'tshM')}</b> mwezi ${N('q-dlm',low.i,'int')}`:''}. Majibu matatu yamepangwa: mtaji zaidi kupitia mkopo wa muda uliokubaliwa mapema, mauzo makubwa zaidi ya awali, na kupunguza gharama (matangazo kwanza, kisha kuchelewesha ajira). Sehemu 6.3 na 7.3 zinaeleza vichochezi.</p>`)],
 ['money',T('How much is asked, and how is it released?','Kiasi gani kinaombwa, na kinatolewa vipi?'),T(`<p>The ${opt} seed is <b>${N('q-seed',sd.amount,'tshM')}</b>, released in three tranches of ${sd.tranches.map(t=>Math.round(t*100)+'%').join(', ')}, each against a milestone that can be checked: the lease and licences, the finished fit-out, then three months of trading with a member count from the store system. Section 6.3 shows every line of the use of funds.</p>`,`<p>Mtaji wa awali wa chaguo la ${opt} ni <b>${N('q-seed',sd.amount,'tshM')}</b>, unaotolewa kwa awamu tatu za ${sd.tranches.map(t=>Math.round(t*100)+'%').join(', ')}, kila moja dhidi ya lengo linaloweza kuthibitishwa: mkataba wa pango na leseni, ujenzi wa ndani uliokamilika, kisha miezi mitatu ya biashara na idadi ya wanachama kutoka mfumo wa duka. Sehemu 6.3 inaonyesha kila mstari wa matumizi ya fedha.</p>`)],
 ['money',T('What share does the investor receive?','Mwekezaji anapata hisa kiasi gani?'),T(`<p>The model uses <b>${pct(own.seed_investor_share)}</b> for the seed investor, as an illustration. The founders, Fahmy Abbas Cothema and Cecilia, keep at least ${pct(own.founders_floor)} together for life, protected in the shareholder agreement. Whether the investor share is the same in both funding options is still to be confirmed, and the terms need legal review before the term sheet.</p>`,`<p>Modeli inatumia <b>${pct(own.seed_investor_share)}</b> kwa mwekezaji wa awali, kama mfano. Waanzilishi, Fahmy Abbas Cothema na Cecilia, wanabaki pamoja na angalau ${pct(own.founders_floor)} maisha yote, kwa ulinzi katika mkataba wa wanahisa. Kama hisa ya mwekezaji ni ileile katika machaguo yote mawili ya mtaji bado inathibitishwa, na masharti yanahitaji kupitiwa kisheria kabla ya hati ya makubaliano.</p>`)],
 ['money',T('How is a box priced?','Bei ya boksi inawekwa vipi?'),T(`<p>Members pay ${sv} less than the shelf price of what is inside, on the 1-, 6- and 12-month plans, rounded to the nearest TSh 500 and never above the shelf value. Packing (the landed cost of the box size) and a TSh ${(D4.DELIVERY||3500).toLocaleString('en-US')} delivery are included, not added. Partner services inside a box are a separate line at the partner’s price plus 25%. Medicines are not in the box price: they are sold by the licensed partner pharmacy.</p>`,`<p>Wanachama wanalipa ${sv} chini ya bei ya rafu ya vilivyomo, kwa mipango ya mwezi 1, miezi 6 na miezi 12, ikizungushwa hadi TSh 500 iliyo karibu na kamwe isizidi thamani ya rafu. Ufungashaji (gharama halisi ya ukubwa wa boksi) na usafirishaji wa TSh ${(D4.DELIVERY||3500).toLocaleString('en-US')} vimo ndani, havijaongezwa juu. Huduma za washirika ndani ya boksi ni mstari tofauti kwa bei ya mshirika pamoja na 25%. Dawa hazimo kwenye bei ya boksi: zinauzwa na famasia mshirika yenye leseni.</p>`)],
 ['new',T('What stops members from leaving?','Nini kinawazuia wanachama kuondoka?'),T(`<p>Five things. Nappies, pads and other repeat items are a large share of each box and cost the member less than on the shelf. One box replaces two shops: many items are not sold by the large online pharmacy. Delivery is included at every size. The box changes with the stage of life, so there is no reason to leave at a milestone. And longer plans save more (up to 9%), a member can pause instead of cancelling, and brands can be swapped up to 12 days before month end. The model assumes <b>${pct(churn)}</b> of members leave each month ${est()}; churn has not been measured, and no retention rate is claimed until the pre-sale produces data.</p>`,`<p>Mambo matano. Nepi, pedi na bidhaa nyingine zinazojirudia ni sehemu kubwa ya kila boksi na zinamgharimu mwanachama kidogo kuliko rafuni. Boksi moja linachukua nafasi ya maduka mawili: bidhaa nyingi haziuzwi na famasia kubwa ya mtandaoni. Usafirishaji umejumuishwa kwa kila ukubwa. Boksi linabadilika kulingana na hatua ya maisha, kwa hiyo hakuna sababu ya kuondoka hatua mpya inapofika. Na mipango mirefu inaokoa zaidi (hadi 9%), mwanachama anaweza kusimamisha badala ya kufuta, na chapa zinaweza kubadilishwa hadi siku 12 kabla ya mwisho wa mwezi. Modeli inachukulia kuwa <b>${pct(churn)}</b> ya wanachama wanaondoka kila mwezi ${est()}; kuondoka huku hakujapimwa, na hakuna kiwango cha kubaki kinachodaiwa hadi mauzo ya awali yatoe takwimu.</p>`)],
 ['new',T('Is the store being built before there is demand?','Je, duka linajengwa kabla ya kuwa na mahitaji?'),T(`<p>No. Before the lease is signed, a 60-day pre-sale invites 300 founding members to pay a refundable deposit of TSh 10,000, credited to their first box. The gate is read on day 60: with 300 deposits, store 1 is the flagship; with fewer, it opens as the start-small store, and founding members keep their rate. Before the gate, only the spending both store sizes need is allowed. Deposits are held in a separate account and refunded within 7 days on request.</p>`,`<p>Hapana. Kabla ya kusaini mkataba wa pango, mauzo ya awali ya siku 60 yanawaalika wanachama waanzilishi 300 kulipa amana inayorejeshwa ya TSh 10,000, inayohesabiwa kwenye boksi lao la kwanza. Kigezo kinasomwa siku ya 60: amana 300 zikifikiwa, duka la 1 ni duka kuu; zikiwa chache, linafunguliwa kama duka la kuanza kidogo, na wanachama waanzilishi wanabaki na bei yao. Kabla ya kigezo, ni matumizi yanayohitajika kwa ukubwa wote wa duka pekee yanayoruhusiwa. Amana zinahifadhiwa katika akaunti tofauti na kurejeshwa ndani ya siku 7 zikiombwa.</p>`)],
 ['new',T('Is the line-up too wide for a first store?','Je, mpangilio wa maboksi ni mpana mno kwa duka la kwanza?'),T(`<p>The launch is phased. Phase 1, from opening to month 6: three packages, one tier each, with fixed contents. Phase 2, months 6 to 12: tiers, brand swaps, Afya Siku, Afya Kazini and Afya’s own product registrations. Phase 3, year 2: business and hotel packages, the nutrition shelf and store 2. Each phase starts only when the one before is working. The full line-up in section 3.5 is the destination, not the opening shelf.</p>`,`<p>Uzinduzi una awamu. Awamu ya 1, tangu kufungua hadi mwezi 6: vifurushi vitatu, ngazi moja kila kimoja, vyenye vilivyomo visivyobadilika. Awamu ya 2, miezi 6 hadi 12: ngazi, kubadilisha chapa, Afya Siku, Afya Kazini na usajili wa bidhaa za Afya yenyewe. Awamu ya 3, mwaka 2: vifurushi vya biashara na hoteli, rafu ya lishe na duka la 2. Kila awamu inaanza tu ile iliyotangulia ikifanya kazi. Mpangilio kamili katika sehemu 3.5 ndio lengo, si rafu ya siku ya kufungua.</p>`)],
 ['new',T('How will monthly payments be collected?','Malipo ya kila mwezi yatakusanywa vipi?'),T(`<p>Fully automatic monthly collection is not yet a normal service in Tanzania; the Bank of Tanzania lists standing orders for subscriptions as a future improvement. What works today on every mobile-money network is the payment request: on payment day the member’s phone shows a request for the exact amount and the member approves it with a PIN. One payment-company connection reaches all the wallets. Reminders go out before payment day, a second request follows two days later, and the membership is paused, not cancelled, after a five-day grace period. Members on 6- and 12-month plans pay once. Provider fees are not yet confirmed; about 2.7% is budgeted for mobile-money collection ${est()}.</p>`,`<p>Ukusanyaji wa kila mwezi unaojiendesha kikamilifu bado si huduma ya kawaida Tanzania; Benki Kuu ya Tanzania inaorodhesha maagizo ya kudumu kwa usajili kama uboreshaji wa baadaye. Kinachofanya kazi leo katika kila mtandao wa pesa ya simu ni ombi la malipo: siku ya malipo simu ya mwanachama inaonyesha ombi la kiasi kamili na mwanachama anaidhinisha kwa PIN. Muunganisho mmoja wa kampuni ya malipo unafikia pochi zote. Vikumbusho vinatumwa kabla ya siku ya malipo, ombi la pili linafuata siku mbili baadaye, na uanachama unasimamishwa, haufutwi, baada ya siku tano za neema. Wanachama wa mipango ya miezi 6 na 12 wanalipa mara moja. Ada za watoa huduma bado hazijathibitishwa; takriban 2.7% imepangwa kwa ukusanyaji wa pesa ya simu ${est()}.</p>`)],
 ['reg',T('Does Afya Basics sell medicines?','Je, Afya Basics inauza dawa?'),T('<p>No. Medicines are sold only by a licensed partner pharmacy, whose pharmacist dispenses and advises. There is no medicine on Afya’s shelf and no Afya own-label medicine. Where the law allows, the pharmacy’s sealed bag travels with the member’s box; a regulatory lawyer and the Pharmacy Council confirm this before launch (section 4.5).</p>','<p>Hapana. Dawa zinauzwa tu na famasia mshirika yenye leseni, ambayo mfamasia wake anatoa dawa na ushauri. Hakuna dawa kwenye rafu ya Afya na hakuna dawa yenye chapa ya Afya. Pale sheria inaporuhusu, mfuko uliofungwa wa famasia unasafiri pamoja na boksi la mwanachama; wakili wa masuala ya udhibiti na Baraza la Famasia wanathibitisha hili kabla ya uzinduzi (sehemu 4.5).</p>')],
 ['reg',T('Which licences are needed, and what do they cost?','Leseni gani zinahitajika, na zinagharimu kiasi gani?'),T(`<p>Cosmetics and food fall under TBS; medical devices under TMDA. At launch Afya buys products that are already registered in Tanzania, so the one-off compliance fees (company registration, two business licences, TBS and TMDA premises, the first shipment certificate) are about <b>${N('q-comp',comp,'tsh')}</b>, their own line in the use of funds. Registering Afya’s own products with TBS (about TSh 11.1M for 20 products) moves to launch Phase 2. Section 7.1 lists the 15 steps with their sources.</p>`,`<p>Vipodozi na chakula viko chini ya TBS; vifaa tiba chini ya TMDA. Wakati wa uzinduzi Afya inanunua bidhaa ambazo tayari zimesajiliwa Tanzania, kwa hiyo ada za uzingatiaji za mara moja (usajili wa kampuni, leseni mbili za biashara, majengo ya TBS na TMDA, cheti cha shehena ya kwanza) ni takriban <b>${N('q-comp',comp,'tsh')}</b>, mstari wake katika matumizi ya fedha. Kusajili bidhaa za Afya yenyewe kwa TBS (takriban TSh 11.1M kwa bidhaa 20) kunahamia Awamu ya 2 ya uzinduzi. Sehemu 7.1 inaorodhesha hatua 15 pamoja na vyanzo vyake.</p>`)],
 ['reg',T('Is the health-check kiosk a regulated device?','Je, kibanda cha kupima afya ni kifaa kinachodhibitiwa?'),T('<p>Yes. The kiosk is a Class B medical device. Afya buys a basic-tier unit with seven measurements from a TMDA-registered dealer, which holds the registration; if Afya were the holder, TMDA registration would be US$2,500 (TSh 6,606,250 at the Bank of Tanzania rate of 10 Nov 2026). The check is a screening service, not a diagnosis: high readings are referred to a clinic (section 3.3).</p>','<p>Ndiyo. Kibanda ni kifaa tiba cha Daraja B. Afya inanunua kifaa cha ngazi ya msingi chenye vipimo saba kutoka kwa muuzaji aliyesajiliwa na TMDA, ambaye anashikilia usajili; kama Afya ingekuwa mshikaji, usajili wa TMDA ungekuwa US$2,500 (TSh 6,606,250 kwa kiwango cha Benki Kuu ya Tanzania cha 10 Nov 2026). Kipimo ni huduma ya uchunguzi wa awali, si utambuzi wa ugonjwa: vipimo vya juu vinapelekwa kliniki (sehemu 3.3).</p>')],
 ['ops',T('Does delivery lose money?','Je, usafirishaji unaleta hasara?'),T(`<p>No, by design. Every box price includes TSh ${(D4.DELIVERY||3500).toLocaleString('en-US')} for delivery and the landed cost of the box, and online customers pay a ${N('q-fee',I.online.delivery_fee,'tsh')} fee. Section 4.3 sets these against the cost of a delivery in the option selected, and explains why some boxes are delivered every two or three months.</p>`,`<p>Hapana, kwa muundo wake. Bei ya kila boksi inajumuisha TSh ${(D4.DELIVERY||3500).toLocaleString('en-US')} za usafirishaji na gharama halisi ya boksi, na wateja wa mtandaoni wanalipa ada ya ${N('q-fee',I.online.delivery_fee,'tsh')}. Sehemu 4.3 inalinganisha hivi na gharama ya safari moja katika chaguo lililochaguliwa, na inaeleza kwa nini baadhi ya maboksi yanafikishwa kila miezi miwili au mitatu.</p>`)],
 ['ops',T('How are fake or expired products kept out?','Bidhaa bandia au zilizoisha muda zinazuiwa vipi?'),T('<p>Only registered products from approved suppliers are stocked. Each delivery is checked at the door against the purchase order, batch numbers are scanned and linked to the supplier, the batch that expires first is picked first, and the system raises expiry alerts. Every sale can be traced to its batch, so a recall reaches the right members (section 4.5).</p>','<p>Bidhaa zilizosajiliwa kutoka kwa wasambazaji walioidhinishwa pekee ndizo zinazohifadhiwa. Kila mzigo unakaguliwa mlangoni dhidi ya oda ya ununuzi, namba za kundi zinachanganuliwa na kuunganishwa na msambazaji, kundi linaloisha muda mapema zaidi linachukuliwa kwanza, na mfumo unatoa tahadhari za kuisha muda. Kila mauzo yanaweza kufuatiliwa hadi kundi lake, kwa hiyo bidhaa ikirudishwa inawafikia wanachama sahihi (sehemu 4.5).</p>')],
 ['team',T('Who are the founders?','Waanzilishi ni akina nani?'),T('<p>Fahmy Abbas Cothema and Cecilia. Together they keep at least 25% of the company for life, protected in the shareholder agreement; the split between them is agreed before closing. A store lead starts two months before opening and runs the store day to day (section 4.4).</p>','<p>Fahmy Abbas Cothema na Cecilia. Kwa pamoja wanabaki na angalau 25% ya kampuni maisha yote, kwa ulinzi katika mkataba wa wanahisa; mgawanyo kati yao unakubaliwa kabla ya kukamilisha uwekezaji. Kiongozi wa duka anaanza miezi miwili kabla ya kufungua na anaendesha duka kila siku (sehemu 4.4).</p>')],
 ['risk',T('What can I verify myself today?','Ninaweza kuthibitisha nini mwenyewe leo?'),T(`<p>Every source in the list below, with the date it was checked; the regulators’ fee schedules on their own sites; every shelf price on the shop page it came from (${N('q-shn',C.shelfN,'int')} pages); and the financial model, by switching the funding option and watching every dependent number follow. The open questions below say what is not yet verified and when it will be.</p>`,`<p>Kila chanzo katika orodha hapa chini, pamoja na tarehe kilipokaguliwa; ratiba za ada za wadhibiti kwenye tovuti zao; kila bei ya rafu kwenye ukurasa wa duka ilipotoka (kurasa ${N('q-shn',C.shelfN,'int')}); na modeli ya fedha, kwa kubadilisha chaguo la mtaji na kuona kila namba inayotegemea ikifuata. Maswali yaliyo wazi hapa chini yanaeleza kisichothibitishwa bado na kitathibitishwa lini.</p>`)]]}
const CATS=[['num','Numbers','Namba'],['money','Money and ownership','Fedha na umiliki'],['new','Demand, scope and payments','Mahitaji, upana na malipo'],['reg','Regulation','Udhibiti'],['ops','Operations','Uendeshaji'],['team','Team','Timu'],['risk','Checking','Kuthibitisha']];

/* ---------- data room ---------- */
function room(){const n=Object.values(DATA().boxes).filter(b=>b.final).length;return [
 ['ex',T('Investor showroom (this website), in English and Kiswahili','Chumba cha maonyesho kwa wawekezaji (tovuti hii), kwa Kiingereza na Kiswahili'),T('Live','Kinapatikana')],
 ['ex',T('Financial model v1.2, both funding options (planning estimates)','Modeli ya fedha v1.2, machaguo yote mawili ya mtaji (makadirio ya mipango)'),T('Live in this site; a spreadsheet export is to be prepared','Inapatikana katika tovuti hii; nakala ya jedwali itatayarishwa')],
 ['ex',T(`Item lists with sourced shelf prices for ${n} Afya Boxes`,`Orodha za vitu zenye bei za rafu zenye vyanzo kwa Afya Box ${n}`),T('Section 3.5; every price links to its page','Sehemu 3.5; kila bei inaunganishwa na ukurasa wake')],
 ['ex',T('Research files: regulation and fees, the kiosk, pricing, pre-sale, payments, partner services, nutrition shelf','Faili za utafiti: udhibiti na ada, kibanda, bei, mauzo ya awali, malipo, huduma za washirika, rafu ya lishe'),T('Sources listed below with check dates','Vyanzo vimeorodheshwa hapa chini pamoja na tarehe za kukaguliwa')],
 ['ex',T('Approved Afya Box renders','Picha za Afya Box zilizoidhinishwa'),T('Renders of the proposed design, not photographs of produced boxes','Picha za muundo unaopendekezwa, si picha za maboksi yaliyozalishwa')],
 ['pr',T('Certificate of incorporation, memorandum and articles, beneficial-owner filing','Cheti cha usajili wa kampuni, katiba ya kampuni, taarifa za wamiliki manufaa'),T('Status to be confirmed by the founders','Hali yake itathibitishwa na waanzilishi')],
 ['pr',T('Taxpayer identification number and VAT registration','Namba ya utambulisho wa mlipakodi na usajili wa VAT'),T('After incorporation','Baada ya usajili wa kampuni')],
 ['pr',T('Shareholder agreement with the founders’ 25% floor and reserved matters','Mkataba wa wanahisa wenye kiwango cha chini cha 25% cha waanzilishi na mambo yanayohitaji ridhaa'),T('Lawyer’s text before the term sheet','Maandishi ya wakili kabla ya hati ya makubaliano')],
 ['pr',T('Legal opinion on the regulatory pathway and on foreign shareholding','Maoni ya kisheria kuhusu njia ya udhibiti na umiliki wa hisa na wageni'),T('Condition before closing','Sharti kabla ya kukamilisha')],
 ['pr',T('Pre-sale terms reviewed by a lawyer, and filed with the Fair Competition Commission if required','Masharti ya mauzo ya awali yaliyopitiwa na wakili, na kuwasilishwa kwa Tume ya Ushindani kama inahitajika'),T('Before the pre-sale opens','Kabla ya mauzo ya awali kufunguliwa')],
 ['pr',T('Supplier and distributor quotations, with registration status','Nukuu za wasambazaji na wasambazaji wakuu, pamoja na hali ya usajili'),T('Replace listing prices before tranche 1','Zinachukua nafasi ya bei za matangazo kabla ya awamu ya 1')],
 ['pr',T('Kiosk, fit-out, technology, insurance, clearing-agent and payment-provider quotations','Nukuu za kibanda, ujenzi wa ndani, teknolojia, bima, wakala wa forodha na watoa huduma za malipo'),T('Replace planning estimates','Zinachukua nafasi ya makadirio ya mipango')],
 ['pr',T('Partner agreements: pharmacy and service providers','Mikataba ya washirika: famasia na watoa huduma'),T('Before opening','Kabla ya kufungua')],
 ['pr',T('Location shortlist with scores','Orodha fupi ya maeneo pamoja na alama'),T('No lease signed; no address chosen','Hakuna mkataba wa pango uliosainiwa; hakuna anwani iliyochaguliwa')],
 ['pr',T('Board charter, delegation of authority, risk register, data-protection policy','Katiba ya bodi, mgawanyo wa mamlaka, rejista ya hatari, sera ya ulinzi wa taarifa'),T('Proposals in sections 7.2 and 7.3','Mapendekezo katika sehemu 7.2 na 7.3')],
 ['pr',T('Founders’ CVs and identity documents','Wasifu na vitambulisho vya waanzilishi'),T('Founders to supply','Waanzilishi watawasilisha')],
 ['af',T('Signed lease','Mkataba wa pango uliosainiwa'),T('Tranche 1','Awamu ya 1')],
 ['af',T('TBS and TMDA premises registrations, business licences','Usajili wa majengo wa TBS na TMDA, leseni za biashara'),T('Before tranche 2','Kabla ya awamu ya 2')],
 ['af',T('Fire certificate, workplace safety registration, NSSF, WCF and data-protection certificates','Cheti cha zimamoto, usajili wa usalama mahali pa kazi, vyeti vya NSSF, WCF na ulinzi wa taarifa'),T('Before opening','Kabla ya kufungua')],
 ['af',T('Bank and payment merchant agreements','Mikataba ya benki na ya malipo ya wafanyabiashara'),T('Before opening','Kabla ya kufungua')],
 ['af',T('Monthly investor pack and audited yearly accounts','Kifurushi cha kila mwezi cha mwekezaji na hesabu za mwaka zilizokaguliwa'),T('From month 1','Kuanzia mwezi 1')]]}
const RST={ex:['Exists now','Kipo sasa'],pr:['To prepare before closing','Kitatayarishwa kabla ya kukamilisha'],af:['After funding','Baada ya ufadhili']};

/* ---------- open questions (investor language) ---------- */
function openQ(C){const I=window.MODEL.inputs;return [
 [T('Pre-sale terms: a lawyer’s review, and whether the standard terms must be filed with the Fair Competition Commission before use','Masharti ya mauzo ya awali: mapitio ya wakili, na kama masharti ya kawaida lazima yawasilishwe kwa Tume ya Ushindani kabla ya kutumika'),T('Commentary says standard-form consumer contracts are filed at least 21 days before use; this was seen in search results only.','Maoni ya wataalamu yanasema mikataba ya kawaida ya walaji huwasilishwa angalau siku 21 kabla ya kutumika; hili limeonekana kwenye matokeo ya utafutaji tu.'),T('Before the pre-sale opens','Kabla ya mauzo ya awali kufunguliwa')],
 [T('Afya Kazini: a check against the official first-aid schedule in Tanzania’s workplace safety rules (2015)','Afya Kazini: ukaguzi dhidi ya orodha rasmi ya huduma ya kwanza katika kanuni za usalama mahali pa kazi za Tanzania (2015)'),T('The office box follows the rules as seen in search results; the official text has not been opened.','Boksi la ofisi linafuata kanuni kama zilivyoonekana kwenye matokeo ya utafutaji; maandishi rasmi hayajafunguliwa.'),T('Before the office box is sold','Kabla ya boksi la ofisi kuuzwa')],
 [T('Tanzanian distributor quotes to replace Kenyan shelf prices','Nukuu za wasambazaji wa Tanzania kuchukua nafasi ya bei za rafu za Kenya'),T(`${C.ke} of the ${C.shelfN} shelf-price pages are Kenyan listings, converted at the Bank of Tanzania rate; Dar es Salaam prices may differ.`,`Kurasa ${C.ke} kati ya ${C.shelfN} za bei za rafu ni matangazo ya Kenya, yamebadilishwa kwa kiwango cha Benki Kuu ya Tanzania; bei za Dar es Salaam zinaweza kutofautiana.`),T('Before tranche 1','Kabla ya awamu ya 1')],
 [T('Partner service quotes: home visits, baby massage, antenatal classes, postnatal checks, skin consultations, staff blood-pressure visits','Nukuu za huduma za washirika: ziara za nyumbani, kukanda mtoto, madarasa ya ujauzito, uchunguzi baada ya kujifungua, ushauri wa ngozi, ziara za kupima shinikizo la damu kwa wafanyakazi'),T('Only the nurse home visit has a Dar es Salaam benchmark price; the other services are planning figures.','Ziara ya muuguzi nyumbani pekee ndiyo ina bei ya kulinganisha ya Dar es Salaam; huduma nyingine ni makadirio ya mipango.'),T('Before the partner agreements are signed','Kabla ya mikataba ya washirika kusainiwa')],
 [T('Clearing agent: a written quote for a container, and the tariff line for each product family','Wakala wa forodha: nukuu ya maandishi kwa kontena, na mstari wa ushuru kwa kila familia ya bidhaa'),T('Duty, levies and clearing are planned from published rates; the tariff codes are Afya’s own reading until the agent confirms them.','Ushuru, tozo na forodha vimepangwa kutoka viwango vilivyochapishwa; misimbo ya ushuru ni tafsiri ya Afya hadi wakala aithibitishe.'),T('Before the first direct import (launch Phase 2)','Kabla ya uagizaji wa kwanza wa moja kwa moja (Awamu ya 2 ya uzinduzi)')],
 [T('Kiosk: three written quotes with certificates, and the dealer’s TMDA registration','Kibanda: nukuu tatu za maandishi pamoja na vyeti, na usajili wa TMDA wa muuzaji'),T('Kiosk prices are marketplace listings; no supplier has quoted, and freight, insurance and clearing are estimates.','Bei za kibanda ni matangazo ya soko; hakuna msambazaji aliyetoa nukuu, na usafiri, bima na forodha ni makadirio.'),T('Before the kiosk is ordered','Kabla ya kuagiza kibanda')],
 [T('Payment provider fees: rate cards from the mobile-money networks and a payment company','Ada za watoa huduma za malipo: viwango kutoka mitandao ya pesa ya simu na kampuni ya malipo'),T(`About 2.7% is budgeted for mobile-money collection; the model carries ${pct(I.tax.payment_fees)} of all sales. Neither is a quote.`,`Takriban 2.7% imepangwa kwa ukusanyaji wa pesa ya simu; modeli inabeba ${pct(I.tax.payment_fees)} ya mauzo yote. Hakuna kati ya hivi ni nukuu.`),T('Before the store system goes live','Kabla ya mfumo wa duka kuanza kufanya kazi')],
 [T('TBS and TMDA: the importer fee, the written view on the kiosk class, nappies and pads, and the council licence class','TBS na TMDA: ada ya mwagizaji, maoni ya maandishi kuhusu daraja la kibanda, nepi na pedi, na daraja la leseni ya halmashauri'),T('The fee schedules were read on the regulators’ sites; these points need a written answer from each office.','Ratiba za ada zilisomwa kwenye tovuti za wadhibiti; hoja hizi zinahitaji jibu la maandishi kutoka kila ofisi.'),T('Before tranche 2','Kabla ya awamu ya 2')],
 [T('Kiswahili medical and technical terms: a review by a native-speaking health professional','Istilahi za kitabibu na kiufundi kwa Kiswahili: mapitio na mtaalamu wa afya mzungumzaji wa Kiswahili'),T('Every page is in both languages; some medical terms need a professional check before customer use.','Kila ukurasa uko kwa lugha zote mbili; baadhi ya istilahi za kitabibu zinahitaji ukaguzi wa kitaalamu kabla ya kutumiwa na wateja.'),T('Before customer materials are printed','Kabla ya nyaraka za wateja kuchapishwa')],
 [T('The research and setup costs before the round (Phase 0)','Gharama za utafiti na maandalizi kabla ya awamu ya uwekezaji (Awamu 0)'),T('They are larger than the Phase 0 budget; the gap is closed by the pre-sale, a founders’ bridge or tranche 1 (section 6.3).','Ni kubwa kuliko bajeti ya Awamu 0; pengo linazibwa kwa mauzo ya awali, mkopo wa muda wa waanzilishi au awamu ya 1 (sehemu 6.3).'),T('Before the term sheet','Kabla ya hati ya makubaliano')],
 [T('Packing films on the approved box design, in both languages','Filamu za ufungashaji kwa muundo wa boksi ulioidhinishwa, kwa lugha zote mbili'),T('The earlier films are withdrawn (section 4.3).','Filamu za awali zimeondolewa (sehemu 4.3).'),T('Before launch marketing','Kabla ya matangazo ya uzinduzi')]]}

/* ---------- CSS ---------- */
const CSS=`<style>
.s75-b .ab-block>p,.s75-b .ab-block>h3+p,.s75-b .ab-block>div{margin-top:var(--s2)}
.s75-cap{font-size:var(--fs-cap);margin-top:8px;max-width:var(--measure)}
.s75-chart{border:1px solid var(--line);background:var(--surface);padding:var(--s2)}
.s75-tools{display:flex;flex-wrap:wrap;gap:var(--s1);align-items:center;margin-top:var(--s3)}
.s75-tools .ab-seg{flex:0 1 auto;max-width:100%;flex-wrap:wrap;border-radius:8px}
.s75-in{min-width:0}
.s75-in{flex:1 1 260px;max-width:420px;min-height:40px;padding:8px 12px;background:var(--surface);border:1px solid var(--line);border-radius:8px;color:var(--ink);font:inherit;font-size:var(--fs-cap)}
.s75-in:focus{outline:1px solid var(--green-edge);outline-offset:1px}
.s75-qa{margin-top:var(--s3);border-top:1px solid var(--line)}
.s75-q{border-bottom:1px solid var(--line)}
.s75-q summary{cursor:pointer;list-style:none;display:flex;gap:var(--s2);align-items:baseline;padding:var(--s2) 0}
.s75-q summary::-webkit-details-marker{display:none}
.s75-q summary small{color:var(--gold);font-variant-numeric:tabular-nums;flex:0 0 auto;font-size:var(--fs-cap)}
.s75-q summary b{font-weight:600;flex:1}
.s75-q summary i{font-style:normal;color:var(--mute)}
.s75-q[open] summary i{transform:rotate(45deg)}
.s75-q .s75-a{padding:0 0 var(--s2) calc(var(--s2) + 28px);max-width:var(--measure)}
.s75-q .s75-a p{margin:0}
.s75-q .s75-a .s75-cat{display:inline-block;margin-top:8px;color:var(--mute);font-size:var(--fs-cap)}
.s75-n{margin-top:var(--s2);font-size:var(--fs-cap)}
.s75-g{border-bottom:1px solid var(--line)}
.s75-g summary{cursor:pointer;list-style:none;padding:12px 0;font-weight:400}
.s75-g summary::-webkit-details-marker{display:none}
.s75-g summary::before{content:"+ ";color:var(--mute)}
.s75-g[open] summary::before{content:"− "}
.s75-g ol{margin:0 0 var(--s2);padding-left:22px;font-size:var(--fs-cap);color:var(--mute);max-width:var(--measure)}
.s75-g li{margin:6px 0;overflow-wrap:anywhere}
.s75-g a{color:var(--ink);text-underline-offset:2px}
.s75-snip,.s75-old{color:var(--mute)}
.s75-src{margin-top:var(--s3);border-top:1px solid var(--line)}
.s75-src h3{margin-top:var(--s3)!important}
.s75-t td{vertical-align:top}
@media (max-width:640px){.s75-q .s75-a{padding-left:0}}
</style>`;

/* ---------- chart: sources by topic, opened vs not (drawn at container width) ---------- */
function chartRows(){const {groups,shelf}=allSources();const rows=groups.map(g=>({l:T(g.en,g.sw),ok:g.items.filter(x=>x.st==='ok').length,no:g.items.filter(x=>x.st!=='ok').length}));
 const si=shelf.flatMap(s=>s.items);return rows}
function chartSVG(W){const rows=chartRows(),ph=W<520,lw=ph?Math.min(140,W*.42):260,pr=ph?40:56,rh=ph?30:26,pt=6,H=pt+rows.length*rh+30,mx=Math.max(...rows.map(r=>r.ok+r.no)),x=v=>(W-lw-pr)*v/mx;let g='';
 const wrap=(t,n)=>{const w=String(t).split(' '),o=[];let l='';w.forEach(s=>{if((l+' '+s).trim().length>n&&l){o.push(l);l=s}else l=(l+' '+s).trim()});if(l)o.push(l);return o.slice(0,2)};
 rows.forEach((r,i)=>{const y=pt+i*rh;wrap(r.l,ph?20:40).forEach((ln,j)=>{g+=`<text x="0" y="${y+11+j*12}" font-size="${ph?10.5:12}" style="fill:var(--mute)">${E(ln)}</text>`});
  g+=`<rect x="${lw}" y="${y+2}" width="${Math.max(r.ok?1:0,x(r.ok)).toFixed(1)}" height="14" style="fill:var(--green)"/><rect x="${(lw+x(r.ok)).toFixed(1)}" y="${y+2}" width="${Math.max(r.no?1:0,x(r.no)).toFixed(1)}" height="14" style="fill:var(--line)"/><text x="${(lw+x(r.ok+r.no)+6).toFixed(1)}" y="${y+13}" font-size="12" style="fill:var(--gold)">${r.ok+r.no}</text>`});
 const ly=H-10;g+=`<rect x="${lw}" y="${ly-9}" width="10" height="10" style="fill:var(--green)"/><text x="${lw+14}" y="${ly}" font-size="11" style="fill:var(--mute)">${E(T('opened and checked','imefunguliwa na kukaguliwa'))}</text><rect x="${lw+(ph?110:150)}" y="${ly-9}" width="10" height="10" style="fill:var(--line)"/><text x="${lw+(ph?124:164)}" y="${ly}" font-size="11" style="fill:var(--mute)">${E(T('not opened or not re-opened','haijafunguliwa au haijafunguliwa tena'))}</text>`;
 return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${E(T('Number of sources by topic, opened and not opened','Idadi ya vyanzo kwa mada, vilivyofunguliwa na visivyofunguliwa'))}" style="display:block">${g}</svg>`}
function draw(){const el=document.getElementById('s75Chart');if(!el)return;const W=Math.floor(el.clientWidth);if(W<120)return;el.innerHTML=chartSVG(W)}

/* ---------- render ---------- */
function render(s,p,pv,nx){CACHE=null;const Q=QA(),C=counts(),R=room(),O=openQ(C),{groups,shelf}=allSources();
 const qa=Q.map((q,i)=>{const c=CATS.find(x=>x[0]===q[0]);return `<details class="s75-q" data-c="${q[0]}"><summary><small>${String(i+1).padStart(2,'0')}</small><b>${E(q[1])}</b><i aria-hidden="true">+</i></summary><div class="s75-a">${q[2]}<span class="s75-cat">${E(T(c[1],c[2]))}</span></div></details>`}).join('');
 const nEx=R.filter(r=>r[0]==='ex').length,nPr=R.filter(r=>r[0]==='pr').length,nAf=R.filter(r=>r[0]==='af').length;
 return `${CSS}<article class="ab-sec" aria-labelledby="h-s7-5"><div class="ab-wrap">
 <div class="ab-sec-no">${E(s.no)}</div><h1 id="h-s7-5">${E(s.title)}</h1>
 <p class="ab-summary">${E(T(`This section is for due diligence. It answers ${Q.length} investor questions with numbers read live from the financial model, lists what is in the data room today and what will be added before closing, sets out the ${O.length} questions still open with the step at which each is settled, and lists every source behind the showroom: ${C.n} in all, grouped by topic, each with the date it was checked or a note that it was seen only in search results.`,`Sehemu hii ni kwa uchunguzi wa kina wa mwekezaji. Inajibu maswali ${Q.length} ya wawekezaji kwa namba zinazosomwa moja kwa moja kutoka modeli ya fedha, inaorodhesha kilichopo kwenye chumba cha nyaraka leo na kitakachoongezwa kabla ya kukamilisha, inaeleza maswali ${O.length} ambayo bado yako wazi pamoja na hatua ambapo kila moja litajibiwa, na inaorodhesha kila chanzo kilicho nyuma ya chumba hiki cha maonyesho: ${C.n} kwa jumla, vimepangwa kwa mada, kila kimoja na tarehe kilipokaguliwa au maelezo kwamba kilionekana kwenye matokeo ya utafutaji tu.`))}</p>

 <figure class="ab-visual s75-chart"><div id="s75Chart"></div>
  <figcaption class="ab-mute s75-cap">${E(T(`Sources by topic: ${C.ok} opened and checked on 9 or 10 Nov 2026, ${C.snip} seen only in search results, ${C.old} seen earlier and not re-opened. The ${C.shelfN} shop pages behind the shelf prices are counted in these totals but not drawn. From the research files and the box data.`,`Vyanzo kwa mada: ${C.ok} vimefunguliwa na kukaguliwa tarehe 9 au 10 Nov 2026, ${C.snip} vimeonekana kwenye matokeo ya utafutaji tu, ${C.old} vilionekana awali na havikufunguliwa tena. Kurasa ${C.shelfN} za maduka zilizo nyuma ya bei za rafu zimo katika jumla hizi lakini hazijachorwa. Kutoka faili za utafiti na takwimu za maboksi.`))}</figcaption></figure>

 <div class="ab-body s75-b">
 <section class="ab-block"><h2>${E(T('Four ways to check what you read','Njia nne za kuthibitisha unachosoma'))}</h2>
  <p>${E(T('A new brand, a new store format and a membership not yet tested in Dar es Salaam: an investor prices unverified claims as risk. So every figure here comes from one model, every fact from a cited page, and every gap is stated rather than left to be found.','Chapa mpya, muundo mpya wa duka na uanachama ambao bado haujajaribiwa Dar es Salaam: mwekezaji anahesabu madai yasiyothibitishwa kama hatari. Kwa hiyo kila takwimu hapa inatoka kwenye modeli moja, kila ukweli kutoka ukurasa uliotajwa, na kila pengo linaelezwa badala ya kuachwa ligunduliwe.'))}</p>
  <ol class="ab-timeline">
   <li><b>${E(T('Read','Soma'))}</b><span>${E(T('Each section ends with its sources; each number follows the funding option selected.','Kila sehemu inaishia na vyanzo vyake; kila namba inafuata chaguo la mtaji lililochaguliwa.'))}</span></li>
   <li><b>${E(T('Open the source','Fungua chanzo'))}</b><span>${E(T('Official pages first: TBS, TMDA, TRA, BRELA, the Bank of Tanzania, WHO.','Kurasa rasmi kwanza: TBS, TMDA, TRA, BRELA, Benki Kuu ya Tanzania, WHO.'))}</span></li>
   <li><b>${E(T('Test the model','Jaribu modeli'))}</b><span>${E(T('Switch the funding option and move the sensitivity in section 6.1; the numbers stay consistent everywhere.','Badilisha chaguo la mtaji na usogeze kipimo cha unyeti katika sehemu 6.1; namba zinabaki sawa kila mahali.'))}</span></li>
   <li><b>${E(T('Ask and visit','Uliza na tembelea'))}</b><span>${E(T('Use the questions below, ask the founders in person, or join the research visits in Dar es Salaam before the round closes.','Tumia maswali hapa chini, waulize waanzilishi ana kwa ana, au jiunge na ziara za utafiti Dar es Salaam kabla ya awamu ya uwekezaji kukamilika.'))}</span></li>
  </ol>
 </section>

 <section class="ab-block"><h2>${E(T('Investor questions','Maswali ya wawekezaji'))}</h2>
  <p>${E(T('The answers draw their numbers from the financial model, so they change with it and with the funding option selected. The four questions on demand, scope and payments answer the hardest points raised about the plan: whether members stay, whether the store is built before demand is proven, whether the line-up is too wide, and how monthly payments are collected.','Majibu yanachukua namba zake kutoka modeli ya fedha, kwa hiyo yanabadilika pamoja nayo na chaguo la mtaji lililochaguliwa. Maswali manne kuhusu mahitaji, upana na malipo yanajibu hoja ngumu zaidi kuhusu mpango: kama wanachama wanabaki, kama duka linajengwa kabla mahitaji hayajathibitishwa, kama mpangilio wa maboksi ni mpana mno, na jinsi malipo ya kila mwezi yanavyokusanywa.'))}</p>
  <div class="s75-tools">
   <div class="ab-seg" role="group" aria-label="${E(T('Filter questions by topic','Chuja maswali kwa mada'))}" id="s75Cat"><button type="button" data-c="" aria-pressed="true">${E(T('All','Yote'))} (${Q.length})</button>${CATS.map(c=>{const n=Q.filter(q=>q[0]===c[0]).length;return n?`<button type="button" data-c="${c[0]}" aria-pressed="false">${E(T(c[1],c[2]))} (${n})</button>`:''}).join('')}</div>
   <input class="s75-in" id="s75Qq" type="search" placeholder="${E(T('Search the questions, for example: churn, deposit, pharmacy','Tafuta maswali, kwa mfano: kuondoka, amana, famasia'))}" aria-label="${E(T('Search the questions','Tafuta maswali'))}">
  </div>
  <div class="s75-qa" id="s75Qa">${qa}</div>
  <p class="ab-mute s75-n" id="s75Qn" aria-live="polite"></p>
 </section>

 <section class="ab-block"><h2>${E(T('The data room','Chumba cha nyaraka'))}</h2>
  <p>${E(T(`What an investor can open today, and what will be added and when. Only the first group exists now (${nEx} items); the ${nPr} items to prepare and the ${nAf} items after funding are commitments with a due point, not claims.`,`Kile mwekezaji anachoweza kufungua leo, na kitakachoongezwa na lini. Kundi la kwanza pekee ndilo lipo sasa (vitu ${nEx}); vitu ${nPr} vya kutayarishwa na vitu ${nAf} vya baada ya ufadhili ni ahadi zenye muda wake, si madai.`))}</p>
  <div class="s75-tools"><div class="ab-seg" role="group" aria-label="${E(T('Filter the data room','Chuja chumba cha nyaraka'))}" id="s75Dr"><button type="button" data-s="" aria-pressed="true">${E(T('All','Yote'))} (${R.length})</button>${Object.keys(RST).map(k=>`<button type="button" data-s="${k}" aria-pressed="false">${E(T(...RST[k]))} (${R.filter(r=>r[0]===k).length})</button>`).join('')}</div></div>
  <div class="ab-tw"><table class="ab-t s75-t"><thead><tr><th>${E(T('Document','Nyaraka'))}</th><th>${E(T('Status','Hali'))}</th><th>${E(T('Note','Maelezo'))}</th></tr></thead><tbody id="s75Drb">${R.map(r=>`<tr data-s="${r[0]}"><td>${E(r[1])}</td><td>${r[0]==='ex'?`<span class="ab-gold">${E(T(...RST[r[0]]))}</span>`:`<span class="ab-mute">${E(T(...RST[r[0]]))}</span>`}</td><td class="ab-mute">${E(r[2])}</td></tr>`).join('')}</tbody></table></div>
 </section>

 <section class="ab-block"><h2>${E(T('Open questions','Maswali yaliyo wazi'))}</h2>
  <p>${E(T('These are the points an investor should know are not yet settled. Each is disclosed here with why it matters and the step at which it is settled; none of them is hidden in a figure.','Hizi ni hoja ambazo mwekezaji anapaswa kujua bado hazijakamilika. Kila moja imewekwa wazi hapa pamoja na kwa nini ni muhimu na hatua ambapo itakamilishwa; hakuna hata moja iliyofichwa ndani ya takwimu.'))}</p>
  <div class="ab-tw"><table class="ab-t s75-t"><thead><tr><th>${E(T('Open question','Swali lililo wazi'))}</th><th>${E(T('Why it matters','Kwa nini ni muhimu'))}</th><th>${E(T('Settled','Litakamilishwa'))}</th></tr></thead><tbody>${O.map((x,i)=>`<tr><td><span class="ab-gold">${String(i+1).padStart(2,'0')}</span> ${E(x[0])}</td><td>${E(x[1])}</td><td class="ab-mute">${E(x[2])}</td></tr>`).join('')}</tbody></table></div>
 </section>

 <section class="ab-block"><h2>${E(T('Every source, by topic','Kila chanzo, kwa mada'))}</h2>
  <p>${E(T(`${C.n} sources, each listed once, with the date it was opened and checked. Where a page could not be opened, the line says it was seen only in search results; where it was seen earlier and not opened again, it says so. Titles are given in the language of the document. Search by publisher, topic, product or year.`,`Vyanzo ${C.n}, kila kimoja kimeorodheshwa mara moja, pamoja na tarehe kilipofunguliwa na kukaguliwa. Pale ukurasa haukuweza kufunguliwa, mstari unasema kilionekana kwenye matokeo ya utafutaji tu; pale kilipoonekana awali na hakikufunguliwa tena, unasema hivyo. Majina ya vyanzo yanatolewa kwa lugha ya nyaraka husika. Tafuta kwa mchapishaji, mada, bidhaa au mwaka.`))}</p>
  <div class="s75-tools"><input class="s75-in" id="s75Sq" type="search" placeholder="${E(T('Search the sources, for example: TMDA, WHO, nappies, 2026','Tafuta vyanzo, kwa mfano: TMDA, WHO, nepi, 2026'))}" aria-label="${E(T('Search the sources','Tafuta vyanzo'))}"></div>
  <p class="ab-mute s75-n" id="s75Sn" aria-live="polite"></p>
  <div class="s75-src" id="s75Src">
   ${groups.map(g=>grpHTML(g)).join('')}
   <h3>${E(T('Shelf prices, by box','Bei za rafu, kwa boksi'))}</h3>
   <p class="ab-mute s75-cap">${E(T(`${C.shelfN} shop pages behind the shelf prices in section 3.5; ${C.ke} are Kenyan listings, converted at the Bank of Tanzania rate of 10 Nov 2026.`,`Kurasa ${C.shelfN} za maduka zilizo nyuma ya bei za rafu katika sehemu 3.5; ${C.ke} ni matangazo ya Kenya, yamebadilishwa kwa kiwango cha Benki Kuu ya Tanzania cha 10 Nov 2026.`))}</p>
   ${shelf.map(g=>grpHTML(g)).join('')}
  </div>
 </section>
 </div>

 <section class="ab-block"><h2>${E(T('Key figures','Takwimu muhimu'))}</h2>
  ${A().figsHTML([
   {v:String(Q.length),l:T('Investor questions answered, four of them on demand, scope and payments','Maswali ya wawekezaji yaliyojibiwa, manne kati yake kuhusu mahitaji, upana na malipo'),s:E(T('Answers read from the financial model v1.2','Majibu yanasomwa kutoka modeli ya fedha v1.2'))},
   {v:`${nEx} / ${R.length}`,l:T('Data-room documents that exist today','Nyaraka za chumba cha nyaraka zilizopo leo'),s:E(T('The rest have a due point','Zilizobaki zina muda wake'))},
   {v:String(C.n),l:T('Sources, each listed once','Vyanzo, kila kimoja kimeorodheshwa mara moja'),s:E(T(`${C.ok} opened and checked on 9 or 10 Nov 2026`,`${C.ok} vimefunguliwa na kukaguliwa 9 au 10 Nov 2026`))},
   {v:String(O.length),l:T('Open questions, each with the step at which it is settled','Maswali yaliyo wazi, kila moja na hatua litakapokamilishwa'),s:E(T('Listed above','Yameorodheshwa hapo juu'))}])}
 </section>

 ${A().openHTML([
  E(T(`${C.snip+C.old} of the ${C.n} sources were seen only in search results or were not opened again; each is marked in the list, and each is to be opened and dated before closing.`,`Vyanzo ${C.snip+C.old} kati ya ${C.n} vilionekana kwenye matokeo ya utafutaji tu au havikufunguliwa tena; kila kimoja kimewekwa alama kwenye orodha, na kila kimoja kitafunguliwa na kuwekewa tarehe kabla ya kukamilisha.`)),
  E(T('Web pages change. The key regulatory documents are to be saved as files in the data room at each review, so that a moved page can still be checked.','Kurasa za mtandao hubadilika. Nyaraka muhimu za udhibiti zitahifadhiwa kama mafaili katika chumba cha nyaraka kila mapitio, ili ukurasa uliohamishwa bado uweze kuthibitishwa.')),
  E(T('Some sources are secondary (law firms, commentary, marketplaces) where the official text was not reached. A lawyer and an accountant are to confirm those points in writing.','Baadhi ya vyanzo ni vya pili (makampuni ya sheria, maoni, masoko ya mtandaoni) pale maandishi rasmi hayakufikiwa. Wakili na mhasibu watathibitisha hoja hizo kwa maandishi.'))])}

 ${A().sourcesHTML([
  {t:T('Afya Basics financial model v1.2 (planning estimates): every number in the answers','Modeli ya fedha ya Afya Basics v1.2 (makadirio ya mipango): kila namba katika majibu'),u:'',chk:'10 Nov 2026',lang:window.AFYA_LANG==='sw'?'sw':'en'},
  {t:'Bank of Tanzania, exchange rates (mean rate, trading date 10 Nov 2026)',u:'https://www.bot.go.tz/ExchangeRate/excRates',chk:'10 Nov 2026'}])}
 ${A().pagerHTML(pv,nx)}
 </div></article>`}

/* ---------- interactions ---------- */
let onR=null;
function init(){draw();if(onR)removeEventListener('resize',onR);onR=()=>draw();addEventListener('resize',onR);
 addEventListener('afya:leave',()=>{if(onR){removeEventListener('resize',onR);onR=null}},{once:true});
 const $=id=>document.getElementById(id);if(!$('s75Qa'))return;
 let qc='',qq='';const qs=[...document.querySelectorAll('#s75Qa .s75-q')];
 const qdraw=()=>{let n=0;qs.forEach(el=>{const show=(!qc||el.dataset.c===qc)&&(!qq||el.textContent.toLowerCase().includes(qq));el.hidden=!show;if(show)n++;if(qq&&show)el.open=true});
  $('s75Qn').textContent=T(`Showing ${n} of ${qs.length} questions`,`Yanaonyeshwa maswali ${n} kati ya ${qs.length}`);
  document.querySelectorAll('#s75Cat [data-c]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.c===qc)))};
 document.querySelectorAll('#s75Cat [data-c]').forEach(b=>b.addEventListener('click',()=>{qc=b.dataset.c;qdraw()}));
 $('s75Qq').addEventListener('input',e=>{qq=e.target.value.trim().toLowerCase();qdraw()});qdraw();
 document.querySelectorAll('#s75Dr [data-s]').forEach(b=>b.addEventListener('click',()=>{const s=b.dataset.s;document.querySelectorAll('#s75Dr [data-s]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));document.querySelectorAll('#s75Drb tr').forEach(r=>{r.hidden=!!s&&r.dataset.s!==s})}));
 const gs=[...document.querySelectorAll('#s75Src .s75-g')],tot=document.querySelectorAll('#s75Src li').length;
 const sdraw=q=>{let n=0;gs.forEach(g=>{let k=0;g.querySelectorAll('li').forEach(li=>{const show=!q||li.dataset.q.includes(q);li.hidden=!show;if(show)k++});g.hidden=k===0;if(q)g.open=k>0;n+=k});
  $('s75Sn').textContent=q?T(`${n} of ${tot} sources match`,`Vyanzo ${n} kati ya ${tot} vinalingana`):''};
 $('s75Sq').addEventListener('input',e=>sdraw(e.target.value.trim().toLowerCase()))}

window.SECTIONS['s7-5']={render,init,v2:true};
})();
