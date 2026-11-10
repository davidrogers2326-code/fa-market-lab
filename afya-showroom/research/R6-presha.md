# R6 — Presha (living with high blood pressure)

Feeds section 3.5. Prices checked 10 Nov 2026. Data file: `data/boxes/presha.json` (validated with node against `data/boxes/SCHEMA.md`). Old code key: `presha` (`part3c.js`). Draft for the founder; the showroom code and the brief are unchanged.

## In plain language

- Presha is for an adult with high blood pressure. The first box brings a **validated upper-arm monitor (once)**, batteries, a **reading log**, **measuring spoons for salt**, a pill box and a scale. Every later box brings fresh batteries, **salt-free seasoning**, oats and unsalted nuts (to replace salty breakfasts and snacks) and toothpaste.
- Figures from `research/V01-front-door-figures.md`: **23.1%** of Tanzanian adults aged 18–69 have raised blood pressure (2023 STEPS), 46.4% at ages 46–69; in the last survey to measure control (2012, ages 25–64) **17.6% were aware, 8.3% treated and 2.2% controlled**.
- Blood-pressure medicines are kind "medicine": listed, supplied by the licensed partner pharmacy on prescription, not priced (B4).
- The B16 clinic line: the clinic decides the target, the medicines, how often to measure, and whether a salt substitute is safe.
- **Delivered every 3 months.** A monthly box (about TSh 40,400 of goods) would lose 1,882 a month on the 12-month plan; three months in one M box pays on every plan. The free in-store BP check stays monthly.
- **Price on the 12-month plan:** first box 302,500, then 110,500 every 3 months: TSh 634,000 a year, about 52,800 a month. The monitor alone is 155,000 of the first box.
- Margins: first box +48,208; later boxes +6,359 (5.8%), thin: negative if goods land above 83.2% of shelf.
- 53 of 85 brand rows are Tanzanian listings opened today; 91–100% of default value is Tanzanian. `final` is **true**.

---

## 1. Who it is for, and the guidance it is built from

**English.** For an adult diagnosed with hypertension, newly or long on treatment, and for adults told at the Afya Check kiosk that their reading is raised and referred to a clinic. Hypertension gives no warning; control depends on a daily routine that the box supplies.

| Figure (from V01, checked 9 Nov 2026) | Source |
|---|---|
| 23.1% of adults 18–69 with raised BP; 12.6% at 18–30, 46.4% at 46–69 (2023) | Mayige et al., TJHR 27(2) 2026, doi 10.4314/thrb.v27i2.8, https://nhrdr.nimr.or.tz/records/209 (re-opened 10 Nov 2026) |
| 2012 cascade, ages 25–64: aware 17.6%, treated 8.3%, controlled 2.2% | WHO Tanzania hypertension country profile, https://cdn.who.int/media/docs/default-source/country-profiles/hypertension/tza_en.pdf |

| Guidance | What the box does |
|---|---|
| WHO HEARTS (healthy-lifestyle counselling, evidence-based protocols, team-based care, monitoring) | Monthly free in-store check; refill and clinic reminders; the pill box |
| WHO 2021 guideline on pharmacological treatment of hypertension | Medicines stay with the clinic; listed as `kind: "medicine"` |
| WHO sodium fact sheet: adults < 2,000 mg sodium (< 5 g salt) a day; global mean 4,278 mg (≈ 11 g salt); "use herbs and spices… rather than salt" | Measuring spoons; salt-free seasoning; stock cubes and seasoning salts excluded |
| WHO 2025 lower-sodium salt substitute guideline: conditional recommendation for the general adult population, **not** for people with kidney impairment or reduced potassium excretion (*exclusion seen in search summaries; the publication page was opened, the PDF was not*) | Potassium salt substitutes are not sent; the clinic decides |
| ISH 2020: validated upper-arm home monitoring, 7-day series, home average ≥ 135/85 = uncontrolled; DASH-type diet; weight | Monitor, batteries, log, oats, unsalted nuts, scale |
| R1: BP monitors are TMDA Class B devices; batteries and logbooks general goods | Monitor bought from a TMDA-registered local supplier |

**Validated monitors.** Only upper-arm monitors whose model appears on a published validation list are sold. Omron M2 is the default (model to confirm on the box). SureSign and Rossmax are on AfyaDepot at 150,000 but the pages give no model, so they are offered only after their model is checked.

### Clinic line (B16), shown on every Presha page

- **EN:** Your blood pressure target, your medicines and their doses, how often you measure at home and whether you may use a salt substitute are decided by your clinic. Afya does not sell medicines: the licensed partner pharmacy supplies them only on the clinic’s prescription. A reading of 180/110 or above, or chest pain, weakness of one side, or a sudden severe headache, needs a clinic or hospital the same day.
- **SW:** Lengo la presha yako, dawa zako na dozi zake, mara ngapi upime nyumbani na kama unaweza kutumia chumvi mbadala huamuliwa na kliniki yako. Afya haiuzi dawa: famasia mshirika yenye leseni huzitoa tu kwa maelekezo ya kliniki. Kipimo cha 180/110 au zaidi, au maumivu ya kifua, udhaifu wa upande mmoja wa mwili, au kichwa kuuma ghafla kwa nguvu, vinahitaji kliniki au hospitali siku hiyo hiyo.

## 2. What changed from the code (`part3c.js`, `D.PKG.presha`)

| Code | Now | Why |
|---|---|---|
| One monthly stage, S box | Two stages: `p1` (first box, months 1–3, L) and `p` (every 3 months, M) | Monthly box does not pay its way (section 7) |
| Scale only in Comfort/Luxury | In the first box (Silverdome, TSh 25,000 TZ, cheaper than the Kenyan options) | Weight is a pillar (ISH 2020, STEPS) |
| Pill cutter, mosquito net, ORS, monthly gift | Removed | Pill cutter: only on the clinic's advice (add-on); net generic and an estimate; ORS is a pharmacy item; gift becomes the priced luxury line |
| Nuts: Kenyan raw peanuts as the Essential default | Munawar unsalted cashews (Shoppers, TZ) are default and Afya Choice; peanuts stay as a choice | A Tanzanian listing whose page says "unsalted"; the Shoppers Royal packs do not state it |
| No medicine lines | BP tablets listed as `kind: "medicine"` with AfyaDepot reference prices, not priced | B4 |
| KES × 20 | KES × 20.33 | `fx.md` |

## 3. Items, line by line

Status: **TZ** = Tanzanian listing opened 10 Nov 2026 on AfyaDepot (schema.org Product data on the product page, never /api) or Shoppers Supermarket (server-rendered product page). **KE** = Kenyan listing from the earlier catalogue in `part3c.js` (seen 2 Nov 2026), original KES shown, converted at 20.33 (BoT mean, 10 Nov 2026, `fx.md`); *not re-opened* (portalpharmacy.ke, goodlife.co.ke, mydawa.com, carrefour.ke, jumia.co.ke were refused from this session). **EST** = estimate with its basis. ◆ = default brand (headline price). `units` is the quantity per delivery in the unit of each brand's `pack_units`; goods cost = price × units ÷ pack_units.

| # | Item | In box | Why (guidance) | Quantity per delivery, and formula | Brand choices: product, pack — TSh (status) | Afya Choice |
|---|---|---|---|---|---|---|
| 1 | Validated upper-arm blood pressure monitor | p1 | Raised blood pressure gives no warning, so the only way to know it is controlled is to measure it. WHO HEARTS and the ISH 2020 guideline put home measurement with a validated upper-arm device at the centre of control; wrist devices and unvalidated monitors are left out because they can misread by 10 mmHg or more (ISH 2020, as cited earlier; not re-opened). Measure seated after five minutes’ rest, back supported, arm at heart level, twice in the morning and twice in the evening for seven days before each clinic visit. The standard cuff fits arms of about 22–32 cm; a wide cuff is available for larger arms. | **p1:** 1 monitor, first box only. *1 monitor, kept for years; checked against the store kiosk each month.* units = 1 | **[Omron M2 automatic upper-arm blood pressure monitor](https://afyadepot.co.tz/product/omron-m2-digital-automatic-blood-pressure-monitor-arm-type), 1 monitor — 155,000 (TZ)** ◆<br>[SureSign Digital upper-arm blood pressure monitor](https://afyadepot.co.tz/product/blood-pressure-monitor-suresign), 1 monitor — 150,000 (TZ)<br>[Rossmax Digital upper-arm blood pressure monitor](https://afyadepot.co.tz/product/digital-arm-blood-pressure-machine-rossmaxx), 1 monitor — 150,000 (TZ)<br>[Microlife BP A2 Basic upper-arm monitor](https://portalpharmacy.ke/medical-devices-kits/blood-pressure-monitors/microlife-bp-a2-basic-automatic-blood-pressure-monitor-with-gentle-plus), 1 monitor — 182,970 (KE, KES 9,000)<br>[A&D Medical UA-651SL upper-arm monitor](https://portalpharmacy.ke/medical-devices-kits/blood-pressure-monitors/ad-medical-ua-651sl-upper-arm-blood-pressure-monitor), 1 monitor — 201,267 (KE, KES 9,900)<br>[Omron M3 upper-arm monitor](https://mydawa.com/products/omron-blood-pressure-monitor-upper-arm-m3), 1 monitor — 251,929 (KE, KES 12,392) | Omron M2 automatic upper-arm blood pressure monitor |
| 2 | AA batteries for the monitor | p1, p | Upper-arm monitors usually run on four AA batteries, and weak batteries cause error messages and failed readings just when a reading matters. A fresh set in every 3-month box means the monitor never stops on a measuring week. Check the battery type in the monitor’s manual. | **p1, p:** 4 AA batteries in every 3-month box. *one set of 4 AA per 3-month box.* units = 4 | **[Varta Longlife AA batteries](https://www.shoppers.co.tz/product-detail/602b929253c6d5732d0a377a), 2 batteries — 4,600 (TZ)** ◆<br>[Duracell AA battery](https://www.shoppers.co.tz/product-detail/6026889a53c6d5732d0a35f3), pack (count not stated on the page) — 6,400 (TZ)<br>[Carrefour I-Tech AA alkaline batteries](https://www.carrefour.ke/mafken/en/alkaline-batteries/crf-battery-lr6-4b-i-tech/p/254980), 4 batteries — 5,062 (KE, KES 249)<br>[Duracell Power Plus AA batteries](https://www.carrefour.ke/mafken/en/alkaline-batteries/duracell-power-plus20-4aa/p/75437), 4 batteries — 18,277 (KE, KES 899)<br>[Energizer Max Plus AA alkaline batteries](https://www.jumia.co.ke/energizer-max-plus-alkaline-batteries-aa-6pack-258776314.html), 6 batteries — 40,640 (KE, KES 1,999) | Varta Longlife AA batteries |
| 3 | Blood pressure reading log | p1 | Treatment is decided from the average of home readings over several days, not from one number, so each reading is written with the date, time and arm, next to any missed dose or symptom (ISH 2020; WHO HEARTS). The log goes with you to the clinic and to the monthly in-store check. | **p1:** 1 book, first box only. *1 book: a 7-day series (2 morning + 2 evening readings) before each visit plus spot checks ≈ one page a week → 100 pages last about two years.* units = 1 | **[Academy Exercise book, 100 pages](https://www.shoppers.co.tz/product-detail/60262b0353c6d5732d0a353c), 1 book — 1,600 (TZ)** ◆<br>[Kasuku A5 exercise book, 200 pages](https://www.carrefour.ke/mafken/en/local-notebook/kasuku-ex-book-single-line-200p-a5/p/2418), 1 book — 1,118 (KE, KES 55)<br>[Office Point A5 hardcover book](https://www.carrefour.ke/mafken/en/local-notebook/op-exercise-book-sc02-col-a5/p/116611), 1 book — 2,948 (KE, KES 145)<br>[Office Point Executive A5 notebook](https://www.carrefour.ke/mafken/en/local-notebook/op-notebook-executive-oml-beat-a5/p/151986), 1 book — 11,060 (KE, KES 544) | Academy Exercise book, 100 pages |
| 4 | Measuring spoons for salt | p1 | WHO advises adults to eat less than 5 g of salt a day, just under one level teaspoon in total; the global average is about 11 g (WHO salt fact sheet, opened 10 Nov 2026). Cooking salt is usually poured by hand. Measuring the salt for the family pot with a spoon set lets the cook use a fixed amount and cut it step by step, which the palate accepts within a few weeks. | **p1:** 1 set, first box only. *1 set, kept for years.* units = 1 | **[Levs Measuring spoon set](https://www.carrefour.ke/mafken/en/utensil-measuring/levs-measuring-spoons-set-sk-3574/p/81800), 1 set — 6,709 (KE, KES 330)** ◆<br>[Ningsheng Measuring set, 3 pieces](https://www.carrefour.ke/mafken/en/utensil-measuring/measuring-cup-3pcs-set-16860-1a/p/193432), 1 set — 5,997 (KE, KES 295)<br>[Generic Stainless-steel stackable measuring spoons, 10 pieces](https://www.jumia.co.ke/generic-10-piece-stackable-stainless-steel-handle-precision-spoon-measuring-spoon-set-268738073.html), 1 set — 8,112 (KE, KES 399)<br>[vexiSeek Magnetic measuring spoons, 9 with leveller](https://www.jumia.co.ke/vexiseek-stainless-steel-magnetic-measuring-spoons-set-of-9-with-levelerdual-sided-stackable-adjustable-teaspoon-and-tablespoon-measuring-liquids-and-dry-ingredients-baking-cooking-gadgestmulticolor-326371150.html), 1 set — 17,159 (KE, KES 844) | Levs Measuring spoon set |
| 5 | Bathroom scale | p1 | In the 2023 STEPS survey raised blood pressure was far more common in overweight adults, and ISH 2020 notes that losing weight lowers blood pressure, roughly 1 mmHg per kilogram (as cited earlier; not re-opened). Weighing once a week at the same time puts weight beside blood pressure in the log. | **p1:** 1 scale, first box only. *1 scale, kept for years.* units = 1 | **[Silverdome Digital body scale WSD-100](https://www.shoppers.co.tz/product-detail/6957adf4d0b62e115fe9037e), 1 scale — 25,000 (TZ)** ◆<br>[Pulse Bathroom weighing scale, basic](https://www.goodlife.co.ke/product/pulse-weighing-scales-basic/), 1 scale — 62,006 (KE, KES 3,050)<br>[Pulse Bluetooth body-composition scale](https://www.goodlife.co.ke/product/pulse-weighing-scales-bluetooth/), 1 scale — 79,429 (KE, KES 3,907)<br>[Tefal Origins bathroom scale](https://www.carrefour.ke/mafken/en/bathroom-scales/tefal-origins-bathroom-scale/p/158990), 1 scale — 91,282 (KE, KES 4,490) | Silverdome Digital body scale WSD-100 |
| 6 | Weekly pill box | p1 | WHO HEARTS names daily adherence as the weak link: blood pressure rises again within days of stopping tablets, and most people need two or more medicines. A seven-day box filled once a week shows at once whether today’s dose was taken. It holds only what your clinic prescribes; the box never contains medicine. | **p1:** 1, first box only. *1 pill box, kept for years.* units = 1 | **[Equate Weekly pill planner](https://www.goodlife.co.ke/product/equate-weekly-pill-planner-pill-box/), 1 — 22,953 (KE, KES 1,129)** ◆<br>[Generic 7-day pill box, 2XL](https://www.goodlife.co.ke/product/pill-box-7-day-2xl-67578/), 1 — 36,899 (KE, KES 1,815)<br>[Generic 7-day AM/PM push-button pill box](https://www.goodlife.co.ke/product/pill-box-push-button-7-day-am-pm-67585/), 1 — 56,680 (KE, KES 2,788) | Equate Weekly pill planner |
| 7 | Salt-free seasoning (garlic, ginger, pepper or turmeric) | p1, p | Food cooked with less salt tastes flat at first; garlic, ginger, pepper and turmeric give flavour without sodium, which makes the salt cut last. WHO lists “use herbs and spices to flavour food, rather than salt” among its ways to cut sodium. Stock cubes, seasoning salts and mchuzi mixes are left out: they are among the largest hidden sources of salt. Potassium “low-sodium” salt substitutes are also left out of the box: WHO now suggests them for the general adult population, but not for people with kidney impairment, and many people with high blood pressure take tablets that raise potassium; ask your clinic first. | **p1, p:** 300 g per 3-month box (three 100 g jars). *about 100 g a month for a family pot × 3 months = 300 g.* units = 300 | **[Tropical Heat Turmeric powder](https://www.shoppers.co.tz/product-detail/602b921853c6d5732d0a3778), 100 g — 5,200 (TZ)** ◆<br>[Shoppers (loose) Black pepper powder, sold by weight](https://www.shoppers.co.tz/product-detail/6026656d53c6d5732d0a3589), 1 kg (sold by weight) — 44,000 (TZ)<br>[Tropical Heat Garlic powder](https://www.carrefour.ke/mafken/en/spices/trop-heat-garlic-powder-100g/p/32091), 100 g — 5,083 (KE, KES 250)<br>[Tropical Heat Ginger, ground](https://www.carrefour.ke/mafken/en/spices/trop-heat-ginger-ground-100g/p/32096), 100 g — 4,676 (KE, KES 230)<br>[Tropical Heat Black pepper, ground](https://www.carrefour.ke/mafken/en/spices/trop-heat-black-pepper-ground-45g/p/32040), 45 g — 3,964 (KE, KES 195) | Tropical Heat Turmeric powder |
| 8 | Whole-grain oats | p1, p | Diets rich in whole grains, vegetables, fruit and nuts, the DASH pattern endorsed by ISH 2020, lower blood pressure. Oats replace white bread and sweet buns at breakfast, which also removes hidden salt; their soluble fibre lowers LDL cholesterol. Cook with water or low-fat milk and no salt. The member can swap or remove it. | **p1, p:** 3 kg per 3-month box. *40 g bowl × 25 mornings ≈ 1 kg a month × 3 = 3 kg.* units = 3000 | **[Weetabix Oatibix jumbo oats, jar](https://www.shoppers.co.tz/product-detail/638a2dd3fa11de0a43b3dcd3), 1 kg — 10,300 (TZ)** ◆<br>[Golden Country White oats](https://www.shoppers.co.tz/product-detail/602a38e053c6d5732d0a363c), 500 g — 7,000 (TZ)<br>[Quaker White oats](https://www.shoppers.co.tz/product-detail/602b78bc53c6d5732d0a3727), 500 g — 9,000 (TZ)<br>[Bob’s Red Mill Quick-cooking rolled oats](https://www.carrefour.ke/mafken/en/oats/bobs-quick-cook-oats-rolled-w-g907g/p/158405), 907 g — 30,475 (KE, KES 1,499) | Weetabix Oatibix jumbo oats, jar |
| 9 | Unsalted nuts | p1, p | Unsalted nuts replace salty, fried snacks; they bring unsaturated fats, potassium and magnesium and are part of the heart-protective diets ISH 2020 endorses. Salted or fried nuts undo the benefit, so only plain packs are sent. A small handful, about 25 g, on most days. | **p1, p:** 1.5 kg per 3-month box. *25 g × 20 days ≈ 500 g a month × 3 = 1.5 kg.* units = 1500 | **[Munawar Cashew nuts, unsalted](https://www.shoppers.co.tz/product-detail/638a2bd7fa11de0a43b3dcd1), 500 g — 19,800 (TZ)** ◆<br>[Shoppers Royal Cashew nuts](https://www.shoppers.co.tz/product-detail/64ce44190eb6b270e24ef771), 500 g — 16,300 (TZ)<br>[Royal Cashew nuts, A grade](https://www.shoppers.co.tz/product-detail/639c4d85fa11de0a43b3e4cf), 250 g — 10,200 (TZ)<br>[Shoppers (loose) Almonds, sold by weight](https://www.shoppers.co.tz/product-detail/6026398153c6d5732d0a3550), 1 kg (sold by weight) — 46,500 (TZ)<br>[Green Forest Unpeeled raw peanuts](https://www.carrefour.ke/mafken/en/peanuts/greenforest-unpeeled-peanuts-250g/p/8724), 250 g — 4,798 (KE, KES 236) | Munawar Cashew nuts, unsalted |
| 10 | Fluoride toothpaste | p1, p | Gum disease is linked to high blood pressure: a 2020 meta-analysis in Cardiovascular Research found people with periodontitis more likely to be hypertensive (as cited earlier; not re-opened). Some blood-pressure tablets, such as amlodipine and nifedipine, can also make the gums swell, so twice-daily brushing with fluoride toothpaste matters more. | **p1, p:** 1 tube of about 190 g every 3 months. *about 2 g a day × 91 days ≈ 180 g → one 190 g tube per 3 months.* units = 190 | **[Whitedent Herbal Toothpaste](https://www.shoppers.co.tz/product-detail/602b959d53c6d5732d0a378c), 190 g — 4,100 (TZ)** ◆<br>[Whitedent Gel Toothpaste](https://www.shoppers.co.tz/product-detail/66eb11b5ad21bfe77df6b23e), 190 g — 3,800 (TZ)<br>[Whitedent Charcoal Toothpaste](https://www.shoppers.co.tz/product-detail/6ad10353835ef903d6315204), 190 g — 4,800 (TZ)<br>[Colgate Maximum Protection](https://www.shoppers.co.tz/product-detail/6026787c53c6d5732d0a35c5), 140 g — 5,900 (TZ) | Whitedent Herbal Toothpaste |
| 11 | Toothbrush, soft or medium | p1, p | A fresh brush every three months, as dentists advise; a soft or medium head is kinder to gums that bleed. | **p1, p:** 1 every 3 months. *1 brush every 3 months.* units = 1 | **[Double Action Activated Charcoal Toothbrush, medium](https://afyadepot.co.tz/product/charcoal-infused-double-action-toothbrush-medium), 1 — 2,000 (TZ)** ◆<br>[Colgate Extra Clean Toothbrush, medium](https://www.shoppers.co.tz/product-detail/6026784453c6d5732d0a35c4), 1 — 2,900 (TZ)<br>[Eco-Smile Essential Toothbrush with tongue scraper](https://afyadepot.co.tz/product/eco-smile-essential-toothbrush-with-a-tongue-scraper), 1 — 3,000 (TZ)<br>[Oral-B 3 Effect Toothbrush 40, medium](https://www.shoppers.co.tz/product-detail/602b6ef453c6d5732d0a36fe), 1 — 3,200 (TZ) | Double Action Activated Charcoal Toothbrush, medium |
| 12 | Blood pressure tablets, as prescribed (partner pharmacy)<br>*kind: medicine — partner pharmacy, not priced in the box (B4)* | p1, p | WHO’s 2021 hypertension treatment guideline and HEARTS protocols are applied by your clinic, which chooses the medicines and doses. Afya does not sell or price medicines: the licensed partner pharmacy supplies them on prescription, and the box reminds you before they run out. The products shown are examples sold in Tanzania, not a recommendation. | **p1, p:** As your clinic prescribes. *units 0: medicines and doses set by the clinic; not priced in the box (B4).* units = 0 | **[Amlosin Amlodipine 5 mg tablets](https://afyadepot.co.tz/product/amlosin-5mg-tablet), strip of 10 — 200 (TZ)** ◆<br>[Losartas Losartan 50 mg tablets](https://afyadepot.co.tz/product/losartas-50mg-tablet), strip of 10 — 600 (TZ)<br>[Losartas-HT Losartan 50 mg + hydrochlorothiazide 12.5 mg](https://afyadepot.co.tz/product/losartas-ht-50-12-5mg-tablet), strip of 10 — 1,000 (TZ)<br>[Nifedi-Denk Nifedipine retard 20 mg tablets](https://afyadepot.co.tz/product/nifedi-denk-20mg-tablet), strip of 10 — 300 (TZ)<br>[Catenol Atenolol 50 mg tablets](https://afyadepot.co.tz/product/catenol-50mg-tablet), strip of 10 — 1,000 (TZ) | Amlosin Amlodipine 5 mg tablets |


The pill box has three choices (no further listing found). Seasoning choices are different spices in the same price range, chosen by the member.

## 4. Taste of luxury (its own line, outside the saving)

| Tier | Item | TSh | Source |
|---|---|---|---|
| premium | Dove Intensive Cream 75 ml, each box | 6,500 (TZ) | [Shoppers Supermarket](https://www.shoppers.co.tz/product-detail/602686c153c6d5732d0a35ed) |
| luxury | Bath & Body Works Ultra Shea body cream 226 g, each box | 50,825 (KE, KES 2,500) | [portalpharmacy.ke](https://portalpharmacy.ke/bath-and-body-works-a-thousand-wishes-ultra-shea-body-cream-8-0-oz) |

Tier price of a later 3-month box on the 12-month plan: Regular 110,500 · Premium 117,000 · Luxury 161,500.

## 5. Services inside this box

Monthly in-store check (blood pressure on the kiosk, the member’s monitor compared with it, and weight): free, a store service. A yearly kidney profile through a partner laboratory is an add-on, charged in the month it is done; AfyaDepot’s walk-in price is TSh 55,000 (opened 10 Nov 2026, market reference only). Clinic and refill reminders: free.

Keys used: `afya-check`, `kidney-profile-test` (not yet in `data/services.json`; R7 follow-up). A large cuff (Omron wide-range 22–42 cm, AfyaDepot TSh 155,000) is an add-on for arms above 32 cm.

## 6. Price per box and plan (D4)

Shelf value = default-brand goods of the box, excluding medicines and the taste-of-luxury line. Price = shelf × (1 − 3% / 6% / 9%), rounded to the nearest 500 and never above shelf (D4). Packing (S 3,500 · M 5,000 · L 6,500) and one delivery (3,500) are inside the price. Check: price − goods at landed cost (R3 planning shares: health products 72%, branded goods 78%, simple goods 50%) − packing − delivery − 1% points ≥ 0.

| Item (default brand) | p1 | p |
|---|---|---|
| Validated upper-arm blood pressure monitor — Omron M2 automatic upper-arm blood pressure monitor | 155,000 | — |
| AA batteries for the monitor — Varta Longlife AA batteries | 9,200 | 9,200 |
| Blood pressure reading log — Academy Exercise book, 100 pages | 1,600 | — |
| Measuring spoons for salt — Levs Measuring spoon set | 6,709 | — |
| Bathroom scale — Silverdome Digital body scale WSD-100 | 25,000 | — |
| Weekly pill box — Equate Weekly pill planner | 22,953 | — |
| Salt-free seasoning (garlic, ginger, pepper or turmeric) — Tropical Heat Turmeric powder | 15,600 | 15,600 |
| Whole-grain oats — Weetabix Oatibix jumbo oats, jar | 30,900 | 30,900 |
| Unsalted nuts — Munawar Cashew nuts, unsalted | 59,400 | 59,400 |
| Fluoride toothpaste — Whitedent Herbal Toothpaste | 4,100 | 4,100 |
| Toothbrush, soft or medium — Double Action Activated Charcoal Toothbrush, medium | 2,000 | 2,000 |
| **Shelf value** | **332,462** | **121,200** |
| Goods at landed cost (R3 shares) | 241,267 (72.6%) | 94,536 (78%) |


| Box | Size | Delivery | Shelf value | 1-month plan (−3%) | 6-month plan (−6%) | 12-month plan (−9%) | Buy once |
|---|---|---|---|---|---|---|---|
| p1 · First box (months 1–3) | L | every-3-months | 332,462 | **322,500** | **312,500** | **302,500** | 332,000 |
| p · Every later 3-month box (months 4, 7, 10) | M | every-3-months | 121,200 | **117,500** | **114,000** | **110,500** | 121,000 |

| Box | Packing + delivery | Margin, 1-month | Margin, 6-month | Margin, 12-month | Landed share at which the 12-month margin reaches 0 (now) |
|---|---|---|---|---|---|
| p1 | 10,000 | +68,008 (21.1%) | +58,108 (18.6%) | **+48,208 (15.9%)** | 87.1% (72.6%) |
| p | 8,500 | +13,289 (11.3%) | +9,824 (8.6%) | **+6,359 (5.8%)** | 83.2% (78%) |


Year on the 12-month plan: **TSh 634,000** (first box + three 3-month boxes).

## 7. Does the box pay its way?

- **Monthly delivery: no.** One month of the later-box goods is about TSh 40,400: 1-month plan +98, 6-month -892, 12-month -1,882 a month (S box + delivery each month).
- **Fix applied: delivery every 3 months** (box-level `delivery` = "every-3-months", with `delivery_note`; SCHEMA lists only monthly and per-trimester, as Afya Glow's "every-2-months" already does). It pays on every plan: first box +48,208, later boxes +6,359 on 12 months.
- Caution: the later box is thin (5.8%); it turns negative if goods land above 83.2% of shelf (now 78%, all branded food at 78%). Cashew and oats quotes (74% of its value) decide it. A cheaper nut default (Shoppers Royal, if confirmed unsalted) would lower the price but also the margin in shillings.

## 8. Open items

1. SureSign and Rossmax monitors: the model and its validation are not stated; they are offered only once the model is found on a validation list. The Omron M2 model number is to be confirmed on the box.
2. Confirm in store that the Shoppers Royal and Royal A-grade cashews are unsalted, and how many batteries the Duracell AA pack holds.
3. Measuring spoons, pill boxes, garlic and ginger powder, peanuts and some batteries have Kenyan prices only (seen 2 Nov 2026), not re-checked.
4. The later 3-month box has a thin margin on the 12-month plan; it turns negative if goods land above about 83% of the shelf price.
5. The services afya-check and kidney-profile-test still need entries and partner prices in the services list.
6. ISH 2020 and the periodontitis meta-analysis were not re-opened (host refused).
7. **Kiswahili for native review:** *kipimo cha presha cha mkono wa juu kilichothibitishwa* (validated upper-arm monitor); *chumvi mbadala zenye potasiamu* (potassium salt substitutes); *viungo visivyo na chumvi*; *shayiri* for oats.
8. Images: places and products only (a kitchen with the measuring spoons, the store's kiosk corner), never faces (B12).

## 9. Sources

**Guidance:**
- Mayige M.T. et al., Hypertension burden and its determinants among adults aged 18 to 69 years in Tanzania: results from the 2023 National STEPS survey, Tanzania Journal of Health Research 27(2), 2026, doi 10.4314/thrb.v27i2.8: https://nhrdr.nimr.or.tz/records/209 (opened 2026-11-10)
- WHO, United Republic of Tanzania hypertension country profile (2012 STEPS cascade: 17.6% aware, 8.3% treated, 2.2% controlled): https://cdn.who.int/media/docs/default-source/country-profiles/hypertension/tza_en.pdf (opened 2026-11-09)
- WHO fact sheet: Hypertension: https://www.who.int/news-room/fact-sheets/detail/hypertension (opened 2026-11-10)
- WHO HEARTS technical package for cardiovascular disease management in primary health care: https://www.who.int/publications/i/item/9789240001367 (opened 2026-11-10)
- WHO 2021, Guideline for the pharmacological treatment of hypertension in adults: https://www.who.int/publications/i/item/9789240033986 (opened 2026-11-10)
- WHO fact sheet: Sodium reduction (adults: less than 2,000 mg sodium, under 5 g salt, a day): https://www.who.int/news-room/fact-sheets/detail/salt-reduction (opened 2026-11-10)
- WHO 2025, Use of lower-sodium salt substitutes: WHO guideline (publication page opened; the exclusion of people with kidney impairment was seen in search summaries only): https://www.who.int/publications/i/item/9789240105591 (opened 2026-11-10)
- ISH 2020 global hypertension practice guidelines (cited from the earlier listing; not re-opened): https://pubmed.ncbi.nlm.nih.gov/32370572/ (not re-opened; cited from the earlier listing)
- Muñoz Aguilera et al. 2020, Cardiovascular Research 116:28–39, periodontitis and hypertension (cited from the earlier listing; not re-opened): https://academic.oup.com/cardiovascres/article/116/1/28/5567071 (not re-opened; cited from the earlier listing)
- Afya Basics R1 compliance research: TMDA device classes (BP monitors Class B; glucose meters and strips IVD self-test Class C; lancets, needles, gauze devices) and ORS as a pharmacy item: https://www.tmda.go.tz/pages/registration-and-licensing-of-premises (opened 2026-11-09)

**Prices:** AfyaDepot (Omron M2, SureSign, Rossmax, Omron wide-range cuff; medicine reference rows Amlosin, Losartas, Losartas-HT, Nifedi-Denk, Catenol) and Shoppers Supermarket (Varta and Duracell AA, Academy exercise book, Silverdome scale, Tropical Heat turmeric, loose black pepper and almonds, Weetabix, Golden Country and Quaker oats, Munawar, Shoppers Royal and Royal cashews, Whitedent, Colgate, Oral-B, Dove Intensive Cream), opened 10 Nov 2026. Kenyan rows: `part3c.js` `D.PKG.presha.catalog`. Working files: `/tmp/claude-0/-home-user-fa-market-lab/763e29dd-dd47-5b19-b730-923fee20ac28/scratchpad/r6c/`.
