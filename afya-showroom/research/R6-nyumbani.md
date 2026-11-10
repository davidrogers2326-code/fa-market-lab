# R6 — Nyumbani (home health essentials, monthly)

Feeds section 3.5. Prices checked 10 Nov 2026. Data file: `data/boxes/nyumbani.json` (validated against `data/boxes/SCHEMA.md`; `final: false` because the treated net is an estimate). Draft for the founder; the showroom code and the brief are unchanged.

## In plain language

- Nyumbani is the monthly box that keeps a home healthy: hand soap and bath soap, drinking-water treatment, mosquito protection, cleaning goods and a small first-aid refill.
- It comes in two sizes, modelled as stages: a **small household (2–3 people)** and a **family household (5–6 people)**. The old code key was `home` with the same two variants.
- It is built on WHO guidance on drinking water, cholera, malaria, burns and food hygiene.
- Core goods at shelf value: **TSh 53,162 a month (small)** and **98,225 (family)**.
- On the 12-month plan the member pays **48,500** and **89,500** a month: 9% below shelf, packing and delivery included.
- The first box also brings a starter set (treated nets, a first-aid box, a crepe bandage, dressings, a thermometer), charged once: **63,500** (small) and **81,000** (family).
- **The box pays its way on every plan.** The small box is thin on 12 months (+1,767, 3.6%); it breaks even if goods land at 76.9% of shelf instead of 73.8%. Safeguard: if supplier quotes come in higher, the small box moves to one delivery every two months.
- 83% of the shelf value is on Tanzanian listings opened today. Water treatment, plasters and rubbish bags are Kenyan prices only. The treated net is an estimate, so the box is **not final**.
- ORS for the first-aid box is listed as a medicine: the partner pharmacy supplies it; it is not priced (B4).

---

## 1. Who it is for, and the guidance it is built from

**English.** For a household in Dar es Salaam: a small household of two or three people, or a family of five or six. The box brings, every month, what a home uses to keep hands washed, drinking water safe, mosquitoes off the family and the toilet, kitchen and floors clean, with a small first-aid refill. The first box also brings treated nets, a first-aid box and a thermometer.



It is built on WHO guidance. Contaminated drinking water causes about 505,000 diarrhoeal deaths a year, and safe water, sanitation and hygiene are essential to prevent cholera. Chlorinating stored water at home was the main household defence in Tanzania’s cholera epidemic. For malaria, WHO advises sleeping under a treated net, with repellent and other measures in the evening. WHO’s Five Keys to Safer Food start with keeping hands, surfaces and dishes clean.



Quantities are measured to the month for the size of the household. Afya does not sell medicines: the oral rehydration salts in the first-aid box come from the licensed partner pharmacy.

| Guidance | What the box does |
|---|---|
| WHO Drinking-water fact sheet: contaminated water causes about 505,000 diarrhoeal deaths a year | Water treatment every month, measured to the household |
| WHO Cholera fact sheet: safe water, sanitation and hygiene are essential; most cases treated with ORS | Hand soap, bleach, toilet paper; ORS in the first-aid box (partner pharmacy) |
| CDC MMWR 2016 (from the code, not re-opened): chlorinating stored water was the key household defence in Tanzania's cholera epidemic | WaterGuard (1 capful per 20 L, wait 30 minutes; Kiswahili instructions FHI 360/PSI, from the code) |
| WHO Malaria fact sheet: treated nets and IRS are the two core vector controls; use repellents with DEET, IR3535 or icaridin after dusk; coils and vaporizers | Treated nets in the first box; repellent monthly; room spray before bed (an addition, not IRS). Coils are not sent: the code cites Liu et al. 2003 (one coil ≈ PM2.5 of 75–137 cigarettes, not re-opened) |
| WHO Five Keys to Safer Food: keep clean | Dish liquid, surface disinfectant |
| WHO Burns fact sheet: cool running water about 20 minutes; clean non-adherent dressing | Sterile dressing pads in the starter set |

**Tanzania.** No Ministry of Health household-hygiene guideline was opened in this session. The Kiswahili WaterGuard instruction sheet is cited from the code.

**Kiswahili.** Kwa kaya ya Dar es Salaam: kaya ndogo ya watu wawili au watatu, au familia ya watu watano au sita. Kila mwezi boksi linaleta kile ambacho nyumba hutumia kunawa mikono, kuweka maji ya kunywa salama, kuzuia mbu kwa familia na kuweka choo, jiko na sakafu safi, pamoja na kujaza kidogo sanduku la huduma ya kwanza. Boksi la kwanza pia linaleta vyandarua vyenye dawa, sanduku la huduma ya kwanza na kipimajoto.



Limejengwa juu ya miongozo ya WHO. Maji machafu ya kunywa husababisha vifo takriban 505,000 vya kuharisha kila mwaka, na maji salama, usafi wa mazingira na usafi binafsi ni muhimu kuzuia kipindupindu. Kutia klorini maji yaliyohifadhiwa nyumbani ndiyo ilikuwa kinga kuu ya kaya wakati wa mlipuko wa kipindupindu Tanzania. Kuhusu malaria, WHO inashauri kulala ndani ya chandarua chenye dawa, pamoja na dawa ya kufukuza mbu na hatua nyingine jioni. Funguo Tano za WHO za Chakula Salama zinaanza na kuweka mikono, sehemu na vyombo safi.



Kiasi kimepimwa kwa mwezi kulingana na ukubwa wa kaya. Afya haiuzi dawa: chumvi za kurudisha maji mwilini zilizo kwenye sanduku la huduma ya kwanza zinatoka kwa famasia mshirika yenye leseni.

### Safety line (shown on the page)

- **EN:** First aid is for small injuries only. For a fever, test for malaria at a health facility; for a deep wound, a burn larger than the palm, or diarrhoea with weakness, go to a clinic straight away. Any medicine comes from the licensed partner pharmacy, as a clinician advises.
- **SW:** Huduma ya kwanza ni kwa majeraha madogo tu. Ukiwa na homa, pima malaria kituo cha afya; kwa jeraha kubwa, jeraha la moto kubwa kuliko kiganja, au kuharisha pamoja na udhaifu, nenda kliniki mara moja. Dawa yoyote inatoka kwa famasia mshirika yenye leseni, kama mtaalamu wa afya anavyoshauri.

## 2. What changed from the code (`part3c.js`, `D.PKG.home`)

| Code | Now | Why |
|---|---|---|
| Washing powder, fabric softener, kitchen towels | Removed | Not health goods; they made the box larger without protecting health |
| No first aid | Plasters and antiseptic monthly; first-aid box, crepe bandage, sterile pads, thermometer and ORS in the starter set | The brief asks for basic first aid |
| Coils, plug-in vaporiser and refills (Kenyan prices) | Removed; treated nets, repellent and a room spray | Coil smoke (code's own Liu 2003 citation); WHO puts nets first |
| Net "2/3 nets, once" priced inside the monthly box | Starter set, charged once | A one-off item cannot sit in a monthly price |
| "1 can every 3 months" priced as a whole pack | `units` = monthly average (e.g. 250 ml) | Each item needs a numeric `units` that matches the monthly cost |
| Monthly gift (candle or diffuser) | The premium and luxury lines | D4: the taste of luxury is its own line |
| Pest-control visit in the 3.5 service pack | Add-on only | Not needed every month by every home |
| KES × 20 | KES × 20.33 (BoT mean, 10 Nov 2026) | `fx.md` |

## 3. Items, line by line

Status: **TZ** = Tanzanian listing opened 10 Nov 2026 (Shoppers category crawl or AfyaDepot product page, schema.org data) unless marked "2 Nov" (code row on superstore.co.tz, a host refused here). **KE** = Kenyan listing from the code, KES shown, converted at 20.33 (BoT mean, 10 Nov 2026, `fx.md`), *not re-opened* (hosts refused). **EST** = labelled estimate with its basis. ◆ = default brand (headline price). Goods cost = price × units ÷ pack units. Where an item ships every 2–3 months, `units` is the monthly average and the quantity says when it ships.

| # | Item | Why (guidance) | Quantity and formula, by stage | Brand choices: product, pack — TSh (status) | Afya Choice |
|---|---|---|---|---|---|
| 1 | Liquid hand soap for the sink | Handwashing with soap is the first barrier against diarrhoea and cholera. WHO names safe water, sanitation and hygiene as essential to prevent cholera. A pump at the sink makes it easy to wash after the toilet and before food. | **Small household (2–3 people):** About 540 ml a month. *3 people × 6 washes a day × 1 ml × 30 days = 540 ml (planning assumption: one pump ≈ 1 ml)* (units 540)<br>**Family household (5–6 people):** About 1.1 litres a month. *6 people × 6 washes a day × 1 ml × 30 days = 1,080 ml* (units 1080) | **[Hobby Liquid Soap](https://www.shoppers.co.tz/product-detail/602a420353c6d5732d0a3659), 400 ml — 3,500 (TZ)** ◆<br>[Biox liquid hand soap](https://superstore.co.tz/shop/all-products/biox-liquid-hand-soap-rose-500ml/), 500 ml — 1,800 (TZ, 2 Nov)<br>[Savlon Germ Protection Hand Wash](https://www.shoppers.co.tz/product-detail/602b7fe153c6d5732d0a373f), 200 ml — 6,200 (TZ)<br>[Dettol liquid handwash Original](https://www.carrefour.ke/mafken/en/liquid-soap-antibacterial/dettol-hand-wash-original-400ml/p/53700), 400 ml — 15,247 (KE, KES 750) | Hobby Liquid Soap, 400 ml |
| 2 | Bath soap bars | Daily bathing with soap prevents skin infections and scabies, which spread in shared homes. One 175 g bar per person a month. | **Small household (2–3 people):** 3 bars a month. *1 bar of 175 g per person a month × 3 people (planning assumption)* (units 3)<br>**Family household (5–6 people):** 6 bars a month. *1 bar of 175 g per person a month × 6 people* (units 6) | **[Imperial Leather Soap](https://www.shoppers.co.tz/product-detail/602a459853c6d5732d0a3666), 175 g — 2,600 (TZ)** ◆<br>[Fa Soap](https://www.shoppers.co.tz/product-detail/602a2ea553c6d5732d0a3616), 175 g — 2,600 (TZ)<br>[Lifebuoy Soap](https://www.shoppers.co.tz/product-detail/6a6dd151d4b3dce59b40cc2f), 175 g — 3,500 (TZ)<br>[Dettol Soap](https://www.shoppers.co.tz/product-detail/602683c353c6d5732d0a35e6), 175 g — 4,500 (TZ) | Imperial Leather Soap, 175 g |
| 3 | Drinking-water treatment | WHO estimates that contaminated drinking water causes about 505,000 diarrhoeal deaths a year. Chlorinating stored water at home was the key household defence in Tanzania’s cholera epidemic (CDC MMWR 2016). WaterGuard: one capful per 20 L, wait 30 minutes. | **Small household (2–3 people):** Enough to treat about 450 litres a month (one bottle every two months). *3 people × 5 L a day for drinking and cooking × 30 days = 450 L; one 150 ml bottle treats about 1,000 L (planning assumption: 5 L per person per day)* (units 450)<br>**Family household (5–6 people):** Enough to treat about 900 litres a month (one bottle a month). *6 people × 5 L a day × 30 days = 900 L* (units 900) | **[Drinking-water treatment (sodium hypochlorite)](https://www.jumia.co.ke/waterguard-drinking-water-purifier-58949465.html), 150 ml, treats about 1,000 L — 6,099 (KE, KES 300)** ◆<br>[67 mg water purification tablets (1 tablet per 20 L)](https://www.jumia.co.ke/aquatabs-67mg-water-purification-tablets-pack-of-100-330120133.html), 100 tablets, treats 2,000 L — 10,165 (KE, KES 500) | Drinking-water treatment (sodium hypochlorite), 150 ml, treats about 1,000 L |
| 4 | Mosquito repellent for the evening | WHO advises sleeping under a net and using repellents containing DEET, IR3535 or icaridin after dusk. Repellent protects the evening hours before bed, when people sit outside. | **Small household (2–3 people):** 1 pack a month. *1 pack per 2–3 people a month, applied to exposed skin each evening (planning estimate; check the active ingredient on each pack)* (units 1)<br>**Family household (5–6 people):** 2 packs a month. *1 pack per 3 people a month × 6 people* (units 2) | **[Odomos Roll On](https://www.shoppers.co.tz/product-detail/602b6d4553c6d5732d0a36f8), 50 g — 4,600 (TZ)** ◆<br>[Nobite Roll On Insect Repellent](https://www.shoppers.co.tz/product-detail/602b993f53c6d5732d0a379e), 40 ml — 8,200 (TZ)<br>[No-Bite Mosquito Repellent Roll-On](https://afyadepot.co.tz/product/mosquito-repellent-roll-on-no-bite-45m), 45 ml — 9,000 (TZ)<br>[Peaceful Sleep Stick Roll On](https://www.shoppers.co.tz/product-detail/602b71ec53c6d5732d0a370e), 30 ml — 9,500 (TZ)<br>[No-bite Spray Insect Repellent](https://www.shoppers.co.tz/product-detail/604f5e82da3fef0287051085), 120 ml — 10,600 (TZ) | Odomos Roll On, 50 g |
| 5 | Room insect spray, before bedtime | Kills mosquitoes resting indoors before the family goes to bed. It is not indoor residual spraying, which WHO names as one of the two core vector controls with treated nets; it adds to the net and never replaces it. | **Small household (2–3 people):** About 250 ml a month (one can every three months). *2 bedrooms × about 4 ml a night × 30 nights ≈ 250 ml (planning estimate)* (units 250)<br>**Family household (5–6 people):** About 375 ml a month (one can every two months). *3 bedrooms × about 4 ml a night × 30 nights ≈ 375 ml* (units 375) | **[Hit Insect Spray](https://www.shoppers.co.tz/product-detail/602a3e9853c6d5732d0a364d), 750 ml — 7,500 (TZ)** ◆<br>[Rungu mosquito spray](https://superstore.co.tz/shop/all-products/rungu-mosquito-spray-850ml/), 850 ml — 8,200 (TZ, 2 Nov)<br>[Vape A1 Mosquito Spray](https://www.shoppers.co.tz/product-detail/6867b384914cc5c6cdeaf5cc), 600 ml — 9,300 (TZ)<br>[Mortein Doom Fast Kill](https://www.shoppers.co.tz/product-detail/65cf814b0eb6b270e24f70c7), 600 ml — 12,000 (TZ)<br>[Mortein Doom Odorless](https://www.shoppers.co.tz/product-detail/602a795b53c6d5732d0a36c8), 600 ml — 14,500 (TZ) | Hit Insect Spray, 750 ml |
| 6 | Bleach for the toilet, drains and disinfecting | Chlorine bleach disinfects the toilet, the latrine slab and surfaces soiled by a sick person, the household steps used against cholera. | **Small household (2–3 people):** 750 ml a month. *About 25 ml a day for the toilet and floors × 30 days = 750 ml (planning estimate)* (units 750)<br>**Family household (5–6 people):** 1 litre a month. *About 33 ml a day × 30 days ≈ 1,000 ml* (units 1000) | **[Omo Bleach](https://www.shoppers.co.tz/product-detail/602b6f2153c6d5732d0a36ff), 750 ml — 5,500 (TZ)** ◆<br>[Domestos Pine Fresh Bleach](https://www.shoppers.co.tz/product-detail/6026845c53c6d5732d0a35e8), 750 ml — 6,800 (TZ)<br>[Jik Bleach Regular](https://www.shoppers.co.tz/product-detail/602a58b953c6d5732d0a366e), 750 ml — 8,200 (TZ)<br>[Clorox Regular liquid bleach](https://www.carrefour.ke/mafken/en/bleach/clorox-regular-750ml/p/48592), 750 ml — 7,359 (KE, KES 362) | Omo Bleach, 750 ml |
| 7 | Floor and surface disinfectant | Clean surfaces are the first of WHO’s Five Keys to Safer Food: keep clean. Diluted pine disinfectant cleans floors, tables and the kitchen counter. | **Small household (2–3 people):** 500 ml a month. *About 17 ml of concentrate a day, diluted in a bucket × 30 days ≈ 500 ml (planning estimate)* (units 500)<br>**Family household (5–6 people):** 1 litre a month. *About 33 ml a day × 30 days ≈ 1,000 ml* (units 1000) | **[Lit Pine Disinfectant](https://www.shoppers.co.tz/product-detail/604f53e6da3fef028705106c), 5 L — 11,900 (TZ)** ◆<br>[Lit household disinfectant, pine](https://superstore.co.tz/shop/all-products/lit-household-cleaner-disinfectant-pine-fresh-1ltr/), 1 L — 2,700 (TZ, 2 Nov)<br>[Handy Andy All Purpose, Ocean](https://www.shoppers.co.tz/product-detail/68a07c9126163eea42517723), 750 ml — 10,000 (TZ)<br>[Dettol Kitchen Cleaner Spray](https://www.shoppers.co.tz/product-detail/6026833f53c6d5732d0a35e4), 500 ml — 16,500 (TZ)<br>[Astonish anti-bacterial surface cleaner](https://www.carrefour.ke/mafken/en/antiseptic-disinfectant/astonish-anti-b-surface-cl-t750ml/p/22977), 750 ml — 12,910 (KE, KES 635) | Lit Pine Disinfectant, 5 L |
| 8 | Dishwashing liquid | Washing plates, cups and cooking pots well stops food-borne germs passing from one meal to the next (WHO Five Keys: keep clean). | **Small household (2–3 people):** 750 ml a month. *About 25 ml a day × 30 days = 750 ml (planning estimate)* (units 750)<br>**Family household (5–6 people):** 1.5 litres a month. *About 50 ml a day × 30 days = 1,500 ml* (units 1500) | **[Sunlight Dishwashing Liquid Original](https://www.shoppers.co.tz/product-detail/602b865453c6d5732d0a3754), 750 ml — 6,500 (TZ)** ◆<br>[Morning Fresh Dishwashing Original](https://www.shoppers.co.tz/product-detail/683ede49d0c44e03353fb3fb), 800 g — 8,800 (TZ)<br>[Tritol Dish Washing Liquid](https://www.shoppers.co.tz/product-detail/64dc99e40eb6b270e24f0015), 5 L — 12,500 (TZ)<br>[Aava Dishwash Liquid](https://www.shoppers.co.tz/product-detail/682885e7d0c44e03353fad5f), 5 L — 11,000 (TZ)<br>[Fairy Dishwashing Liquid](https://www.shoppers.co.tz/product-detail/602a306e53c6d5732d0a361c), 750 ml — 12,500 (TZ) | Sunlight Dishwashing Liquid Original, 750 ml |
| 9 | Rubber gloves for the toilet and floors | Keep bleach off the skin and keep toilet germs off the hands of the person who cleans. | **Small household (2–3 people):** 1 pair every three months. *1 pair lasts about 3 months → 1/3 pair a month on average* (units 0.33)<br>**Family household (5–6 people):** 2 pairs every three months. *2 pairs (toilet, floors) every 3 months → 2/3 pair a month* (units 0.67) | **[Best One Household Gloves, medium](https://www.shoppers.co.tz/product-detail/604f5af7da3fef028705107d), 1 pair — 6,700 (TZ)** ◆<br>[Vileda Sensitive household gloves, medium](https://www.carrefour.ke/mafken/en/gloves/vileda-gloves-sensitive-medium/p/242257), 1 pair — 7,522 (KE, KES 370)<br>[Vileda Extra Sensation household gloves, medium](https://www.carrefour.ke/mafken/en/gloves/vileda-glove-extra-sensation-mdm/p/202158), 1 pair — 7,725 (KE, KES 380)<br>[Vileda Super Grip household gloves, large](https://www.carrefour.ke/mafken/en/gloves/vileda-glove-supergrip-large/p/202161), 1 pair — 8,539 (KE, KES 420)<br>[Spontex Wash Ups anti-slip reusable gloves, medium](https://www.carrefour.ke/mafken/en/gloves/spontex-gloves-protector-m/p/17720), 1 pair — 12,401 (KE, KES 610) | Best One Household Gloves, medium, 1 pair |
| 10 | Toilet paper | Clean toilet hygiene, with soap at the sink, keeps faecal germs out of the home. | **Small household (2–3 people):** 10 rolls a month. *About 3–4 rolls per person a month × 3 people ≈ 10 (planning estimate)* (units 10)<br>**Family household (5–6 people):** 16 rolls a month. *About 2.7 rolls per person a month × 6 people ≈ 16 (children use less)* (units 16) | **[Rexa Toilet Papers White](https://www.shoppers.co.tz/product-detail/604f52aeda3fef0287051068), 8 rolls — 6,500 (TZ)** ◆<br>[Fay Pink Toilet Papers](https://www.shoppers.co.tz/product-detail/6aa97cd1835ef903d63150bd), 10 rolls — 10,200 (TZ)<br>[Velvex Premium toilet tissue](https://superstore.co.tz/shop/all-products/velvex-premium-toilet-tissue-10-pack/), 10 rolls — 11,550 (TZ, 2 Nov)<br>[Comfi Bathroom Tissue](https://www.shoppers.co.tz/product-detail/6026797a53c6d5732d0a35c8), 4 rolls — 11,000 (TZ)<br>[Andrex Bathroom Tissue](https://www.shoppers.co.tz/product-detail/602641f553c6d5732d0a3561), 4 rolls — 14,000 (TZ) | Rexa Toilet Papers White, 8 rolls |
| 11 | Rubbish bags | Closed rubbish bags keep flies and rats away from food; flies carry diarrhoeal germs from waste to food. | **Small household (2–3 people):** 15 bags a month. *1 bag every 2 days × 30 days = 15* (units 15)<br>**Family household (5–6 people):** 30 bags a month. *1 bag a day × 30 days = 30* (units 30) | **[Heavy-duty black garbage bags 80 L (30×36")](https://www.jumia.co.ke/generic-black-30x36-heavy-duty-garbage-bags-80l-capacity-pack-of-50-137504902.html), 50 bags — 18,805 (KE, KES 925)** ◆<br>[Draw-tape biodegradable pedal-bin liners](https://www.carrefour.ke/mafken/en/garbage-bags-flat-with-ties/bio-pedal-bin-liner-yellow-tape/p/154431), 30 bags — 11,751 (KE, KES 578)<br>[Classic Trash Bags 30 gallon](https://www.shoppers.co.tz/product-detail/6026749553c6d5732d0a35ba), 20 bags — 25,000 (TZ) | Heavy-duty black garbage bags 80 L (30×36"), 50 bags |
| 12 | Plasters for small cuts | First aid for the small cuts and grazes of everyday life: clean the cut, then cover it. The home first-aid box is refilled each month so it is never empty. | **Small household (2–3 people):** 10 plasters a month. *About 3 small cuts per person a month × 3 people ≈ 10 (planning estimate)* (units 10)<br>**Family household (5–6 people):** 20 plasters a month. *About 3 per person a month × 6 people ≈ 20 (children graze more)* (units 20) | **[Sonaplast plasters](https://www.carrefour.ke/mafken/en/first-aid/sonaplast-100-s/p/118642), 100 strips — 3,253 (KE, KES 160)** ◆<br>[Steroplast fabric plasters, assorted](https://www.goodlife.co.ke/product/steroplast-fabric-ass-16s/), 16 strips — 3,497 (KE, KES 172)<br>[Steroplast washproof plasters, assorted](https://www.goodlife.co.ke/product/steroplast-washproof-ass-16s/), 16 strips — 3,497 (KE, KES 172)<br>[Elastoplast fabric plasters](https://www.goodlife.co.ke/product/elastoplast-fabric-100s/), 100 strips — 20,330 (KE, KES 1,000)<br>[Elastoplast water-resistant plaster strips](https://portalpharmacy.ke/elastoplast-water-resi-40s), 40 strips — 30,495 (KE, KES 1,500) | Sonaplast plasters, 100 strips |
| 13 | Antiseptic liquid for cleaning wounds | Cleans skin around a cut before it is covered. Used diluted, as the label says. | **Small household (2–3 people):** 50 ml a month (a 500 ml bottle lasts about 10 months). *About 10 uses × 5 ml diluted = 50 ml a month (planning estimate)* (units 50)<br>**Family household (5–6 people):** 100 ml a month. *About 20 uses × 5 ml = 100 ml a month* (units 100) | **[Dettol Antiseptic Liquid](https://www.shoppers.co.tz/product-detail/6026826753c6d5732d0a35e2), 500 ml — 13,000 (TZ)** ◆<br>[U-SOL antiseptic wound solution](https://afyadepot.co.tz/product/u-sol-antiseptic-wound-solution100mils), 100 ml — 1,500 (TZ)<br>[Savlon antiseptic liquid](https://www.carrefour.ke/mafken/en/antiseptic-disinfectant/savlon-antiseptic-liquid-750ml/p/9854), 750 ml — 25,819 (KE, KES 1,270)<br>[Betadine antiseptic solution, 10% povidone-iodine](https://portalpharmacy.ke/first-aid/antiseptics), 500 ml — 39,644 (KE, KES 1,950)<br>[Tincture of iodine](https://www.goodlife.co.ke/product/tincture-of-iodine-100ml/), 100 ml — 3,964 (KE, KES 195) | Dettol Antiseptic Liquid, 500 ml |

### Starter items (first box only)

| # | Item | Why (guidance) | Quantity and formula, by stage | Brand choices: product, pack — TSh (status) | Afya Choice |
|---|---|---|---|---|---|
| 1 | Long-lasting insecticidal mosquito net | WHO names insecticide-treated nets and indoor residual spraying as the two core malaria vector controls. One treated net for every sleeping space; the first box brings them, replaced when torn. | **Small household (2–3 people):** 2 nets, first box only. *1 net per sleeping space × 2 sleeping spaces* (units 2)<br>**Family household (5–6 people):** 3 nets, first box only. *1 net per sleeping space × 3 sleeping spaces (about 2 people per net)* (units 3) | **[Long-lasting insecticidal net, family size](https://www.mdpi.com/2414-6366/10/6/175), 1 net — 10,000 (EST)** ◆ | Long-lasting insecticidal net, family size, 1 net |
| 2 | First-aid box (container) | A marked box in one known place, so plasters, antiseptic and dressings are found fast. | **Small household (2–3 people):** 1 box, first box only. *1 per home* (units 1)<br>**Family household (5–6 people):** 1 box, first box only. *1 per home* (units 1) | **[Silver Smart First Aid Container (empty)](https://afyadepot.co.tz/product/empty-kit-silver-smart-first-aid-kit), 1 — 17,000 (TZ)** ◆<br>[Premium Transparent Plastic Container (empty)](https://afyadepot.co.tz/product/cello-transparent-plastic-first-aid-box-empty), 1 — 35,000 (TZ)<br>[Heavy Duty Orange Plastic Container (empty)](https://afyadepot.co.tz/product/smart-first-aid-kit-bag-empty), 1 — 65,000 (TZ)<br>[Aluminium First Aid Box (empty)](https://afyadepot.co.tz/product/first-aid-box), 1 — 80,000 (TZ)<br>[Medium Metal Wall Cabinet (empty)](https://afyadepot.co.tz/product/medium-metal-wall-cabinet-empty), 1 — 99,000 (TZ) | Silver Smart First Aid Container (empty), 1 |
| 3 | Crepe bandage | Supports a sprained ankle or wrist and holds a dressing in place. | **Small household (2–3 people):** 1 bandage, first box only. *1 per first-aid box* (units 1)<br>**Family household (5–6 people):** 2 bandages, first box only. *2 per family first-aid box* (units 2) | **[Elastolite crepe bandage 7.5 cm](https://www.goodlife.co.ke/product/crepe-bandage-3in-7-5cm-elastolite/), 1 — 1,850 (KE, KES 91)** ◆<br>[Elastolite crepe bandage 10 cm](https://www.goodlife.co.ke/product/crepe-bandage-4in-10cm-elastolite/), 1 — 2,033 (KE, KES 100)<br>[Elastolite crepe bandage 15 cm](https://www.goodlife.co.ke/product/crepe-bandage-6in-15cm-elastolite/), 1 — 2,257 (KE, KES 111) | Elastolite crepe bandage 7.5 cm, 1 |
| 4 | Sterile dressing pads | A clean, non-sticking cover for a larger wound or a burn after cooling it under running water for about 20 minutes (WHO burns fact sheet). | **Small household (2–3 people):** 5 pads, first box only. *1 pack of 5* (units 5)<br>**Family household (5–6 people):** 10 pads, first box only. *2 packs of 5* (units 10) | **[Steroplast sterile dressing pads 5×5 cm](https://www.goodlife.co.ke/product/steroplast-dressing-pads-sterile-5s-5cm-x-5cm/), 5 pads — 5,611 (KE, KES 276)** ◆<br>[Sterile gauze swabs 4×4 in](https://www.goodlife.co.ke/product/gauze-swabs-sterile-44-100s/), 100 swabs — 21,306 (KE, KES 1,048)<br>[Sterile gauze swabs 3×3 in](https://www.goodlife.co.ke/product/gauze-swabs-sterile-3x3-100s/), 100 swabs — 19,374 (KE, KES 953) | Steroplast sterile dressing pads 5×5 cm, 5 pads |
| 5 | Digital thermometer | Confirms a fever, so the family goes for a malaria test at a health facility instead of guessing. | **Small household (2–3 people):** 1, first box only. *1 per home* (units 1)<br>**Family household (5–6 people):** 1, first box only. *1 per home* (units 1) | **[MT 810 digital stick thermometer](https://portalpharmacy.ke/microlife-mt810-digital-thermometer), 1 — 19,314 (KE, KES 950)** ◆<br>[UT-103 digital thermometer](https://portalpharmacy.ke/ad-medical-ut-103-digital-thermometer), 1 — 30,495 (KE, KES 1,500)<br>[Non-Contact Infrared Digital Thermometer](https://afyadepot.co.tz/product/infrared-thermometer), 1 — 75,000 (TZ) | MT 810 digital stick thermometer, 1 |
| 6 | Oral rehydration salts, for the first-aid box (partner pharmacy)<br>*kind: medicine — partner pharmacy, not priced (B4)* | WHO: most people with cholera can be treated with oral rehydration solution, and starting quickly saves lives. Keeping a few sachets at home lets treatment start while the family goes to a clinic. Supplied by the licensed partner pharmacy, not priced in the box. | **Small household (2–3 people):** 4 sachets, first box only. *4 sachets kept in the first-aid box; replaced when used* (units 4)<br>**Family household (5–6 people):** 6 sachets, first box only. *6 sachets kept in the first-aid box; replaced when used* (units 6) | **[Low-osmolarity ORS sachet](https://afyadepot.co.tz/product/iyfe-ors-sachhets-1s), 1 sachet — 500 (TZ)** ◆ | Low-osmolarity ORS sachet, 1 sachet |

| Stage | Starter items (first box only) | Shelf value | Landed |
|---|---|---|---|
| Small household (2–3 people) | Long-lasting insecticidal mosquito net 20,000; First-aid box (container) 17,000; Crepe bandage 1,850; Sterile dressing pads 5,611; Digital thermometer 19,314; Oral rehydration salts, for the first-aid box (partner pharmacy) (medicine) 0 | 63,775 | 37,778 |
| Family household (5–6 people) | Long-lasting insecticidal mosquito net 30,000; First-aid box (container) 17,000; Crepe bandage 3,700; Sterile dressing pads 11,222; Digital thermometer 19,314; Oral rehydration salts, for the first-aid box (partner pharmacy) (medicine) 0 | 81,236 | 48,150 |

The starter set is charged once at shelf price (no saving), in the first box, with no extra delivery. Its margin is its shelf value minus landed cost.

## 4. Taste of luxury

One premium and one luxury item, priced as their own line at shelf price, outside the saving (D4), rounded to the nearest 500.

| Tier | Item | Source | TSh |
|---|---|---|---|
| premium | Air freshener refill for the living room: Air Wick Freshmatic Refill, 250 ml | [Shoppers Supermarket](https://www.shoppers.co.tz/product-detail/6026361453c6d5732d0a3548) (TZ) | 16,000 → 16,000 |
| luxury | Bath & Body Works scented candle: Bath & Body Works single-wick candle, 227 g | [Jumia Kenya](https://www.jumia.co.ke/bath-body-works-pink-obsessed-single-wick-candle-227g-329477440.html) (KE, KES 2,300) | 46,759 → 47,000 |

Tier price per month, 12-month plan:

| Stage | Regular | Premium | Luxury |
|---|---|---|---|
| Small household (2–3 people) | 48,500 | 64,500 | 95,500 |
| Family household (5–6 people) | 89,500 | 105,500 | 136,500 |

## 5. Services

| Key | What the member gets | Walk-in (planning) | Afya pays (70%) | Member fee each time (×1.25) | Times a year | Basis |
|---|---|---|---|---|---|---|
| `water-chlorine-check` | Drinking-water chlorine check: The store adviser tests a sample of the family’s treated water for free chlorine and shows the right dose. | — | — | 0 (store service) | 12 | Store service |
| `family-bp-check` | Family blood-pressure check: Any adult in the household can have blood pressure and weight checked in the store each month. | — | — | 0 (store service) | 12 | Store service |
| `home-pest-control` | Home pest-control visit (add-on): A licensed pest-control company treats the home for cockroaches and rodents. | 60,000 | 42,000 | add-on: 54,000 (90% of walk-in) | 2 | model.js services.packs (planning figure, no partner quote) |

Partner prices are the financial model's planning figures (`model.js`), not quotes; they are marked EST until R7 adds partner quotes. Service keys are new and still have to be added to `data/services.json` (not edited here).

## 6. Price per month (D4)

Shelf value = default-brand goods, excluding medicines, starter items and the luxury line. Price = shelf × (1 − 3% / 6% / 9%), nearest 500, never above shelf. Packing and one delivery are included.

**Goods at shelf, default brands (TSh a month):**

| Item | Small household (2–3 people) | Family household (5–6 people) | Cost class |
|---|---|---|---|
| Liquid hand soap for the sink | 4,725 | 9,450 | brand |
| Bath soap bars | 7,800 | 15,600 | brand |
| Drinking-water treatment | 2,745 | 5,489 | brand |
| Mosquito repellent for the evening | 4,600 | 9,200 | brand |
| Room insect spray, before bedtime | 2,500 | 3,750 | brand |
| Bleach for the toilet, drains and disinfecting | 5,500 | 7,333 | brand |
| Floor and surface disinfectant | 1,190 | 2,380 | brand |
| Dishwashing liquid | 6,500 | 13,000 | brand |
| Rubber gloves for the toilet and floors | 2,211 | 4,489 | own |
| Toilet paper | 8,125 | 13,000 | brand |
| Rubbish bags | 5,642 | 11,283 | own |
| Plasters for small cuts | 325 | 651 | pharm |
| Antiseptic liquid for cleaning wounds | 1,300 | 2,600 | brand |
| **Shelf value per month** | **53,162** | **98,225** | |
| Goods at landed cost | 39,248 | 72,160 | |

**Member price per month:**

| Stage | Box | Shelf value per delivery | 1-month plan (−3%) | 6-month plan (−6%) | 12-month plan (−9%) | Buy once |
|---|---|---|---|---|---|---|
| Small household (2–3 people) | S | 53,162 | **51,500** | **50,000** | **48,500** | 53,000 |
| Family household (5–6 people) | M | 98,225 | **95,500** | **92,500** | **89,500** | 98,000 |

Source coverage of the shelf value by status: Small household (2–3 people): TZ 84%, KE 16%; Family household (5–6 people): TZ 82%, KE 18%.

## 7. Does the box pay its way?

**Check (D4):** price − goods at landed cost − packing − delivery (3,500) − 1% points ≥ 0. Landed cost uses R3's planning shares: brand 78%, pharm 72%, own 50%.

| Stage | Goods at landed cost | Packing + delivery | Margin, 1-month | Margin, 6-month | Margin, 12-month | Landed share now → share at which 12-month margin is 0 |
|---|---|---|---|---|---|---|
| Small household (2–3 people) | 39,248 | 7,000 | +4,737 (9.2%) | +3,252 (6.5%) | +1,767 (3.6%) | 73.8% → 76.9% |
| Family household (5–6 people) | 72,160 | 8,500 | +13,885 (14.5%) | +10,915 (11.8%) | +7,945 (8.9%) | 73.5% → 81.4% |


**Plainly: yes, both sizes pay their way monthly.** The family box has a healthy margin. The small box is thin on the 12-month plan. If supplier quotes push the landed share above 76.9%, deliver the small box every two months (two months of goods, one packing and one delivery): its 12-month margin would then be about +10,533 per delivery.

## 8. Images (places only, never faces)

- EN: A clean, sunlit Dar es Salaam kitchen counter with the open green box, soap and water-treatment bottle; no people<br>SW: Kaunta safi ya jikoni ya Dar es Salaam yenye mwanga wa jua, boksi la kijani lililofunguliwa, sabuni na chupa ya dawa ya maji; bila watu
- EN: A bedroom with a treated net hung over a made bed, evening light; no people<br>SW: Chumba cha kulala chenye chandarua kilichotundikwa juu ya kitanda kilichotandikwa, mwanga wa jioni; bila watu

## 9. Kiswahili for native review

- *upuliziaji wa ukoko wa dawa ndani ya nyumba* for indoor residual spraying (IRS)
- *chandarua chenye dawa cha muda mrefu* for long-lasting insecticidal net
- *kinukisha hewa* for air freshener
- *kasha* for an empty first-aid container
- *kipimo cha klorini* for a free-chlorine check

## 10. Open items

1. Treated net: the price is an estimate (TSh 10,000). A distributor quote for a WHO-prequalified long-lasting net is needed; this is why the box is not final.
2. Water treatment, plasters, rubbish bags, thermometers, the luxury candle and four glove brands have Kenyan prices only (converted at KES 20.33). Kariakoo or distributor prices are needed.
3. Check the active ingredient on each repellent pack against WHO’s list (DEET, IR3535 or icaridin).
4. Quantities per person are planning estimates; adjust after three months of real member use.
5. Code follow-up (not done here): `part3c.js` `D.PKG.home` still holds laundry goods, coils and a monthly gift and uses KES × 20. It should render from this JSON. The front door (0.1/0.2) summary should follow once the box is final.

## 11. Sources

**Guidance:**
- WHO fact sheet, Malaria (nets, repellents with DEET, IR3535 or icaridin, coils and vaporizers; ITNs and IRS as the two core vector controls): https://www.who.int/news-room/fact-sheets/detail/malaria (checked 2026-11-10)
- WHO fact sheet, Drinking-water (about 505,000 diarrhoeal deaths a year from contaminated drinking water; household water treatment scheme): https://www.who.int/news-room/fact-sheets/detail/drinking-water (checked 2026-11-10)
- WHO fact sheet, Cholera (safe water, sanitation and hygiene essential; most cases treated with oral rehydration solution): https://www.who.int/news-room/fact-sheets/detail/cholera (checked 2026-11-10)
- WHO 2006, Five keys to safer food manual (keep clean; separate raw and cooked; cook thoroughly; safe temperatures; safe water and raw materials): https://www.who.int/publications/i/item/9789241594639 (checked 2026-11-10)
- WHO fact sheet, Burns (first aid: cool running water about 20 minutes; clean non-adherent dressing): https://www.who.int/news-room/fact-sheets/detail/burns (checked 2026-11-10)
- CDC MMWR 65(41), 2016: chlorination of drinking water during the cholera epidemic in Tanzania. Cited from the old code; not re-opened: https://www.cdc.gov/mmwr/volumes/65/wr/mm6541a6.htm (checked 2026-11-02)
- WaterGuard liquid instructions in Kiswahili (FHI 360 / PSI): one capful per 20 L, wait 30 minutes. Cited from the old code; not re-opened: https://hip.fhi360.org/file/26883/Waterguard_Liquid_Instructions_CC_-_Kiswahili.pdf (checked 2026-11-02)

**Prices:** Shoppers Supermarket category crawl, 10 Nov 2026 (`https://www.shoppers.co.tz/product-detail/<id>`, server-rendered name and price); AfyaDepot product pages (schema.org Product data, no `/api`), 10 Nov 2026; Kenyan rows from the code catalogue (2 Nov 2026). Every URL is in the JSON.

Working files: `/tmp/claude-0/-home-user-fa-market-lab/763e29dd-dd47-5b19-b730-923fee20ac28/scratchpad/r6d/` (`bin/brands.js` catalogue, `bin/spec_nyumbani.js`, `bin/engine.js` prices and margins, `bin/validate.js`).
