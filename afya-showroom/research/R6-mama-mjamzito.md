# R6 — Mama Mjamzito (pregnancy box, delivered once per trimester)

Feeds section 3.5. Prices checked 10 Nov 2026. Data file: `data/boxes/mama-mjamzito.json` (validated against `data/boxes/SCHEMA.md`, including the new numeric `units` per trimester box). Draft for the founder; the showroom code and the brief are unchanged.

## In plain language

- Mama Mjamzito is three boxes, one at the start of each trimester, each carrying three months of goods (founder decision D-12).
- It is built on the WHO 2016 antenatal care recommendations. The clinic stays in charge of tests, visits and every medicine.
- Iron, folic acid and calcium are listed as medicines. The partner pharmacy supplies them on the clinic's prescription; they are not in the box price (B4).
- Core goods per box at shelf value: **TSh 106,013 (first trimester), 138,760 (second) and 242,878 (third, with the full hospital bag)**.
- On the 12-month plan the member pays **96,500 / 126,500 / 221,000** per box: 9% below shelf, packing and delivery included.
- **The box now pays its way.** On every plan and in every trimester the price covers goods at R3's landed cost, packing (M 5,000 or L 6,500), one delivery (3,500) and 1% points. The 12-month margin is +7,145 / +8,502 / +33,338.
- Delivered monthly, the same goods would lose about 1,500–2,000 a month in the first and second trimesters. Trimester delivery is what fixes that.
- Margins in the first two boxes are thin (6.7–7.4% on 12 months). They turn negative if goods land above about 82–84% of the shelf price; R3's planning assumption is 75–78%.
- 48 of the 77 brand rows were re-opened today on AfyaDepot or Shoppers, covering 56% / 75% / 67% of each box's value. Ginger tea, liners, intimate wash, water treatment and briefs have Kenyan prices only. The treated net is an estimate, so the box is **not final** (`"final": false`).
- Each trimester has one premium item and one luxury item, priced as their own line. Two partner services apply: the in-store antenatal check (free) and an optional midwife home visit in the third trimester (no quote yet).

---

## 1. Who it is for, and the guidance it is built from

**English.** For a woman who is pregnant, from her first antenatal visit to birth. The box arrives three times, each carrying three months of goods. It is built on the **WHO recommendations on antenatal care for a positive pregnancy experience (2016)**. The recommendations used, with their codes in the WHO summary chart:

| WHO 2016 recommendation | What the box does |
|---|---|
| A.1.1 Counselling on healthy eating and staying physically active | The adviser counsels; mother's foods are on the customer-chosen Lishe shelf (R9), not assigned |
| A.2.1 Daily oral iron 30–60 mg + folic acid 400 µg (eLENA, updated 26 Jul 2024) | Listed as **medicine**; partner pharmacy, on the clinic's prescription; not priced |
| A.3 Where dietary calcium is low, 1.5–2.0 g elemental calcium a day (revalidated 2018: from 20 weeks) | Listed as **medicine** in t2 and t3; the clinic sets the dose |
| A.6, A.7, A.8 Multiple micronutrients, vitamin B6, vitamins C and E: *not recommended* | Not in the box. Pregnacare and similar products are not sent |
| C.5 Tetanus toxoid; C.6 IPTp-SP in malaria-endemic Africa | Reminders (antenatal-support service); repellent and treated net in the box, as additions to IPTp |
| D.1 Ginger, chamomile, vitamin B6 and/or acupuncture for nausea | Ginger tea in t1 |
| D.4 Regular exercise for low back and pelvic pain; D.5 fibre for constipation | Advice; oats on the Lishe shelf. The support belt is not in the core box (see 2) |
| Eight antenatal contacts | Reminders, and an in-store blood pressure, weight and danger-sign check |

**Tanzania.** A Ministry of Health "Draft ANC Guidelines 2018" PDF is hosted by WHO Afro. Studies describe it as adopting the eight-contact model. *The host was refused here, so this is known from search results only and the document was not opened.*

**Kiswahili.** Kwa mwanamke mjamzito, tangu kliniki yake ya kwanza ya ujauzito hadi kujifungua. Boksi linakuja mara tatu, mwanzoni mwa kila kipindi cha miezi mitatu, kila moja likiwa na bidhaa za miezi mitatu. Limejengwa juu ya mapendekezo ya WHO kuhusu huduma ya ujauzito kwa uzoefu chanya wa ujauzito (2016): angalau mahudhurio manane ya kliniki ya ujauzito; madini ya chuma na foliki kila siku; kalsiamu pale vyakula vina kalsiamu kidogo; tangawizi kwa kichefuchefu; dawa ya kuzuia malaria na chandarua chenye dawa; na ushauri wa kula vizuri na kufanya mazoezi. Mwongozo wa 2016 haushauri virutubisho mchanganyiko, vitamini B6 wala vitamini C na E kwa wajawazito, hivyo hakuna kinachotumwa. Afya haichukui nafasi ya kliniki: dawa na virutubisho vinatoka kwa famasia mshirika yenye leseni, kama kliniki inavyoandika tu.

### Clinic line (B16), shown on every Mama Mjamzito page

- **EN:** Your clinic decides your tests, your antenatal visits and any medicine or supplement, including iron, folic acid and calcium, and their doses. Afya does not sell medicines: the licensed partner pharmacy supplies them only on the clinic's prescription. If anything worries you, go to your clinic straight away; do not wait for the next box.
- **SW:** Kliniki yako ndiyo inayoamua vipimo vyako, mahudhurio yako ya kliniki ya ujauzito na dawa au virutubisho vyovyote, ikiwemo madini ya chuma, foliki na kalsiamu, pamoja na dozi zake. Afya haiuzi dawa: famasia mshirika yenye leseni huzitoa tu kwa maelekezo ya kliniki. Ukiona dalili yoyote inayokutia wasiwasi, nenda kliniki yako mara moja; usisubiri boksi lijalo.

## 2. What changed from the code (`part3c.js`, `D.PKG.preg`)

| Code (23 item keys) | Now | Why |
|---|---|---|
| `ifa`, `calc` priced as box goods (calcium in the `pharm` class, priced) | `kind: "medicine"`, not priced | B4 and the brief: any supplement or medicine goes through the partner pharmacy |
| `uji` (fortified porridge flour, assigned to every mother) | Moved to the Lishe shelf (R9), customer-chosen | Food on the shelf is chosen, never assigned. Its only prices are Kenyan |
| `tpm` (toothpaste + brush as one line) | Split into `tpm` (toothpaste, g) and `tbr` (brush, 1) | Each item needs one `units` number in the same unit as its packs |
| `zaw` (monthly gift) and `scent` | Become the per-trimester **premium** and **luxury** lines | D4: the "taste of luxury" is its own line, outside the saving. A monthly gift has no place in a 3-month box |
| `belt` (support belt / nursing pillow), `nip` (nipple cream) | Not in the core box. Offered as add-ons at the counter | The belt must be fitted (WHO D.4 puts exercise first). Nipple cream is postnatal, and the latch fix matters more; it belongs in Mama na Mtoto |
| Repellent, soap, water treatment, liners "a month" | × 3 for a trimester box, with `units` | Per-trimester delivery |
| Calcium "60/120 tablets" | units 0, dose by the clinic | WHO says 1.5–2.0 g; the Dar es Salaam trial used 500 mg. The clinic decides (B16) |

## 3. Items, line by line

Bold with ◆ = default brand (headline price). Status: **TZ** = Tanzanian listing, opened 10 Nov 2026 (AfyaDepot or Shoppers) unless marked "2 Nov" (code row on a host this session could not reach). **KE** = Kenyan listing from the code, original KES shown and converted at 20.33 (BoT mean, 10 Nov 2026), *not re-opened* (host refused). **EST** = estimate with basis. `units` is the quantity per trimester box, in the unit of each brand's `pack_units`; goods cost = price × units ÷ pack_units.

| # | Item | In box | Why (guidance) | Quantity per trimester box, and formula | Brand choices: product, pack — TSh (status) | Afya Choice |
|---|---|---|---|---|---|---|
| 1 | Iron and folic acid, one a day (partner pharmacy)<br>*kind: medicine — partner pharmacy, not priced in the box (B4)* | t1, t2, t3 | WHO (2016, A.2.1) recommends daily oral iron (30–60 mg elemental iron) with 400 µg folic acid through pregnancy, to prevent maternal anaemia, puerperal sepsis, low birth weight and preterm birth. Folic acid should start as early as possible. The tablets are free at public antenatal clinics; the partner pharmacy supplies them only when the clinic prescribes them and is out of stock. Afya does not sell or price them. | 90 tablets, if the clinic prescribes one a day. *1 tablet a day × 91 days (13 weeks) ≈ 90 = 9 strips of 10. Dose and product are set by the clinic (B16); not priced in the box (B4).* units = 90 | **[Ferrolic LF tablets](https://afyadepot.co.tz/product/ferrolic-lf-tablets10s), 10 tablets — 1,000 (TZ)** ◆<br>[Ranferon Antianemia Iron & Folic Acid capsules](https://afyadepot.co.tz/product/ranferon-antianemia-capsules), 10 capsules — 300 (TZ)<br>[Hemovit Iron with folic acid tablets](https://afyadepot.co.tz/product/hemovit-iron-with-folic-acid-tablets), pack size not stated on the page — 5,500 (TZ)<br>[Folron Iron & Folic Acid Blood Building Capsules](https://afyadepot.co.tz/product/folron-iron-with-folic-acid-capsule), 10 capsules — 12,000 (TZ) | Ferrolic LF tablets, 10 tablets |
| 2 | Ginger tea for morning sickness | t1 | Nausea affects most women in early pregnancy. WHO (2016, D.1) recommends ginger, chamomile, vitamin B6 and/or acupuncture for relief, based on the woman’s preference. Small, frequent cups of ginger tea are cheap and easy to keep down. Severe vomiting is a reason to go to the clinic. | 90 tea bags. *1 cup a day × 13 weeks ≈ 90 bags (first trimester only).* units = 90 | **[Melvins Ginger tea bags](https://www.carrefour.ke/mafken/en/black-bags/melvins-ginger-tea-bags-untag-100g/p/40538), 100 bags — 2,948 (KE, KES 145)** ◆<br>[Kericho Gold Ginger & lemon tea](https://www.carrefour.ke/mafken/en/flavored-bags/kericho-gold-ginger-lemon-40/p/56542), 20 bags — 5,387 (KE, KES 265)<br>[Heath & Heather Organic lemon & ginger tea](https://www.jumia.co.ke/organic-lemon-and-ginger-tea-20s-heath-heather-mpg10586418.html), 20 bags — 36,574 (KE, KES 1,799) | Melvins Ginger tea bags, 100 bags |
| 3 | Mosquito repellent | t1, t2, t3 | Malaria in pregnancy causes maternal anaemia, low birth weight and stillbirth. A repellent covers the evening hours outdoors before the woman is under her net. It adds to, and never replaces, the clinic’s preventive malaria treatment (IPTp, WHO 2016 C.6) and the treated net. Use only products whose label states the active ingredient and that they may be used in pregnancy. | 3 packs (one a month). *1 roll-on or spray a month × 3 months = 3.* units = 3 | **[Odomos Roll On](https://www.shoppers.co.tz/product-detail/602b6d4553c6d5732d0a36f8), 50 g — 4,600 (TZ)** ◆<br>[No-Bite Nobite Roll On Insect Repellent](https://www.shoppers.co.tz/product-detail/602b993f53c6d5732d0a379e), 40 ml — 8,200 (TZ)<br>[No-Bite Mosquito Repellent Roll-On](https://afyadepot.co.tz/product/mosquito-repellent-roll-on-no-bite-45m), 45 ml — 9,000 (TZ)<br>[Peaceful Sleep Stick Roll On](https://www.shoppers.co.tz/product-detail/602b71ec53c6d5732d0a370e), 30 ml — 9,500 (TZ)<br>[No-bite Spray Insect Repellent](https://www.shoppers.co.tz/product-detail/604f5e82da3fef0287051085), 120 ml — 10,600 (TZ) | Odomos Roll On, 50 g |
| 4 | Long-lasting insecticide-treated mosquito net | t1 | Sleeping under an insecticide-treated net protects the mother now and the newborn later, who will sleep in the parents’ bed or beside it. Most nets sold in Tanzanian shops are untreated, so the box brings one WHO-prequalified long-lasting treated net, once, in the first trimester box. | 1 net (first trimester box only). *1 net for the parents’ bed; lasts about 3 years.* units = 1 | **[WHO-prequalified LLIN (brand to be quoted) Long-lasting insecticidal net, family size](https://www.mdpi.com/2414-6366/10/6/175), 1 net — 10,000 (EST)** ◆ | WHO-prequalified LLIN (brand to be quoted) Long-lasting insecticidal net, family size, 1 net |
| 5 | Hand soap for the home | t1, t2, t3 | Handwashing with soap is the cheapest infection control a household has: community handwashing promotion cuts child diarrhoea by about 30% (Cochrane). The habit set in pregnancy protects the newborn: wash after the toilet, before food and, later, after every nappy and before every feed. | About 1,050 g of bar soap (six 175 g bars). *2 bars of about 175 g a month × 3 months = 6 bars ≈ 1,050 g.* units = 1050 | **[Lifebuoy Soap, assorted](https://www.shoppers.co.tz/product-detail/6a6dd151d4b3dce59b40cc2f), 175 g — 3,500 (TZ)** ◆<br>[Dettol Herbal Soap 6-pack](https://www.shoppers.co.tz/product-detail/649fd5a40eb6b270e24edef3), 6 × 175 g — 21,000 (TZ)<br>[Dettol Soap](https://www.shoppers.co.tz/product-detail/602683c353c6d5732d0a35e6), 175 g — 4,500 (TZ)<br>[Protex Herbal Antibacterial Soap](https://afyadepot.co.tz/product/protex-herbal-bar-soap-90g), 90 g — 4,500 (TZ)<br>[Protex Deep Clean Antibacterial Soap](https://afyadepot.co.tz/product/protex-deep-clean-bar-soap-100g), 100 g — 4,500 (TZ) | Lifebuoy Soap, assorted, 175 g |
| 6 | Drinking-water treatment | t1, t2, t3 | Tap and well water in Dar es Salaam is not reliably safe, and diarrhoea in pregnancy dehydrates the mother. Chlorinating drinking water at home cuts diarrhoea by about a quarter (Cochrane). Boiling is a good alternative where fuel allows. | Enough to treat about 1,000 litres. *about 10 L of drinking and cooking water a day × 91 days ≈ 910 L → one 150 ml WaterGuard bottle (≈1,000 L). units = litres treated.* units = 1000 | **[WaterGuard Drinking-water treatment (sodium hypochlorite)](https://www.jumia.co.ke/waterguard-drinking-water-purifier-58949465.html), 150 ml, treats about 1,000 L — 6,099 (KE, KES 300)** ◆<br>[Aquatabs 67 mg water purification tablets (1 tablet per 20 L)](https://www.jumia.co.ke/aquatabs-67mg-water-purification-tablets-pack-of-100-330120133.html), 100 tablets, treats 2,000 L — 10,165 (KE, KES 500)<br>[Aquaguard Water purifier liquid](https://www.carrefour.ke/mafken/en/face-care-whitening/aquaguard-water-purifier-500ml/p/9272), 500 ml (litres treated not stated) — 2,033 (KE, KES 100) | WaterGuard Drinking-water treatment (sodium hypochlorite), 150 ml, treats about 1,000 L |
| 7 | Shower and body wash for mum | t1, t2, t3 | Skin is often drier and more sensitive in pregnancy. A mild, creamy wash every day is part of the mother’s own care; strongly perfumed soaps are the commonest irritant. | 750 ml. *about 8 ml a day × 91 days ≈ 730 ml → 750 ml.* units = 750 | **[Dove Shower Cream](https://www.shoppers.co.tz/product-detail/6026875053c6d5732d0a35ef), 500 ml — 12,000 (TZ)** ◆<br>[Dove Shower Gel Relaxing Natural](https://www.shoppers.co.tz/product-detail/6a930e3fd4b3dce59b40cdf3), 500 ml — 13,800 (TZ)<br>[Hobby Body Wash, assorted](https://www.shoppers.co.tz/product-detail/68de835e92a77f6bb268ba9a), 1 L — 15,800 (TZ)<br>[Nivea Shower Gel Creme Soft](https://www.shoppers.co.tz/product-detail/60c064c6753c0d1ace90a872), 250 ml — 11,500 (TZ)<br>[Dettol Shower Gel Sensitive](https://www.shoppers.co.tz/product-detail/60bf5ba6791c2d11b5e2a64f), 300 ml — 13,000 (TZ) | Dove Shower Cream, 500 ml |
| 8 | Fluoride toothpaste | t1, t2, t3 | Hormonal change makes gums swell and bleed more easily in pregnancy. Twice-daily brushing with fluoride toothpaste is the simple protection. Check that the pack says it contains fluoride. | One tube of about 190 g. *about 2 g a day (two brushings) × 91 days ≈ 180 g → one 190 g tube.* units = 190 | **[Whitedent Herbal Toothpaste](https://www.shoppers.co.tz/product-detail/602b959d53c6d5732d0a378c), 190 g — 4,100 (TZ)** ◆<br>[Whitedent Gel Toothpaste](https://www.shoppers.co.tz/product-detail/66eb11b5ad21bfe77df6b23e), 190 g — 3,800 (TZ)<br>[Colgate Maximum Protection](https://www.shoppers.co.tz/product-detail/6026787c53c6d5732d0a35c5), 140 g — 5,900 (TZ)<br>[Sensodyne Extra Fresh](https://www.shoppers.co.tz/product-detail/602b7d5a53c6d5732d0a3735), 75 ml — 5,300 (TZ)<br>[Colgate Natural Extracts Toothpaste](https://afyadepot.co.tz/product/colgate-natural-extracts-toothpaste-75ml), 75 ml — 8,500 (TZ) | Whitedent Herbal Toothpaste, 190 g |
| 9 | Toothbrush | t1, t2, t3 | A fresh brush every three months, as dentists advise; a soft or medium head is kinder to bleeding gums. | 1 brush. *1 brush every 3 months = 1 per trimester box.* units = 1 | **[Double Action Activated Charcoal Toothbrush (Medium)](https://afyadepot.co.tz/product/charcoal-infused-double-action-toothbrush-medium), 1 — 2,000 (TZ)** ◆<br>[Colgate Extra Clean Tooth Brush Medium](https://www.shoppers.co.tz/product-detail/6026784453c6d5732d0a35c4), 1 — 2,900 (TZ)<br>[Eco-Smile Essential Toothbrush with Tongue Scraper](https://afyadepot.co.tz/product/eco-smile-essential-toothbrush-with-a-tongue-scraper), 1 — 3,000 (TZ)<br>[Oral-B Oral B 3 Effect Toothbrush 40 Medium](https://www.shoppers.co.tz/product-detail/602b6ef453c6d5732d0a36fe), 1 — 3,200 (TZ)<br>[Whitedent toothbrush regular](https://superstore.co.tz/shop/all-products/whitedent-toothbrush-regular/), 1 — 350 (TZ, 2 Nov) | Double Action Activated Charcoal Toothbrush (Medium), 1 |
| 10 | Panty liners | t1, t2, t3 | Vaginal discharge normally increases in pregnancy. Breathable, unscented liners keep the day comfortable. A change in colour or smell, itching or any bleeding is a reason to go to the clinic. | 80 liners. *about one a day on most days × 91 days → two packs of 40 = 80.* units = 80 | **[Kotex Normal panty liners](https://www.carrefour.ke/mafken/en/woman-pantyliners/kotex-panty-liners-normal40-s/p/95513), 40 — 5,083 (KE, KES 250)** ◆<br>[Molped Intense panty liners](https://www.carrefour.ke/mafken/en/woman-pantyliners/molped-panty-linner-intense-pr20-s/p/221959), 20 — 3,253 (KE, KES 160)<br>[Always Everyday panty liners, large](https://www.carrefour.ke/mafken/en/woman-pantyliners/always-everyday-large-liner16/p/23396), 16 — 5,387 (KE, KES 265)<br>[Always Dailies 100% organic cotton panty liners](https://portalpharmacy.ke/feminine-care/always-dailies-100-organic-cotton-pantiliners-x28), 28 — 17,281 (KE, KES 850) | Kotex Normal panty liners, 40 |
| 11 | Gentle intimate wash, external use only | t1, t2, t3 | The vagina cleans itself. Wash only the outside, once a day, with water and a mild unperfumed cleanser; never douche. Perfumed soaps and gels irritate, which is why a gentle, pH-balanced wash is offered. Plain water is also enough. | 1 bottle of about 250 ml. *2–3 ml once a day × 91 days ≈ 230 ml → one 250 ml bottle.* units = 250 | **[Beauty Formulas Feminine Intimate Wash, gentle](https://www.carrefour.ke/mafken/en/woman-tampons-hygiene/b-formulas-intimate-wash-gentl250ml/p/84764), 250 ml — 18,195 (KE, KES 895)** ◆<br>[Vivasol Daily Intimate V Wash](https://afyadepot.co.tz/product/daily-intimate-wash-vivasol-v-wash), 100 ml — 15,000 (TZ)<br>[Femfresh Intimate Sensitive Wash](https://portalpharmacy.ke/feminine-care/femfresh-intimate-sensitive-wash-250ml), 250 ml — 30,495 (KE, KES 1,500)<br>[Sebamed Feminine Intimate Wash pH 3.8](https://portalpharmacy.ke/feminine-care/intimate-wash/sebamed-feminine-intimate-wash-200ml), 200 ml — 50,825 (KE, KES 2,500) | Beauty Formulas Feminine Intimate Wash, gentle, 250 ml |
| 12 | Calcium, from week 20 (partner pharmacy, if the clinic prescribes it)<br>*kind: medicine — partner pharmacy, not priced in the box (B4)* | t2, t3 | Pre-eclampsia (dangerously high blood pressure in pregnancy) is a leading cause of maternal death. Where diets are low in calcium, WHO (2016, A.3; revalidated 2018) recommends 1.5–2.0 g elemental calcium a day from 20 weeks to birth. A 2024 trial in Dar es Salaam and India found 500 mg a day non-inferior against pre-eclampsia, but the dose is the clinic’s decision. Calcium is taken at a different meal from iron. Sold by the partner pharmacy; not priced in the box. | As the clinic prescribes. *units 0: dose set by the clinic. Covers weeks 20–27 (56 days). WHO: 1.5–2.0 g elemental calcium a day where diets are low in calcium; Dar es Salaam trial: 500 mg a day.* units = 0 | **[Vitabiotics Osteocare Chewable Calcium Tablets](https://afyadepot.co.tz/product/osteocare-chewable-tablets-30s), 30 tablets — 30,000 (TZ)** ◆<br>[Calcivita tablets](https://afyadepot.co.tz/product/calcivita-tablets-50s), 50 tablets — 19,500 (TZ)<br>[Maxcal Calcium & Vitamin D3 Capsules](https://afyadepot.co.tz/product/maxcal-capsules-30s), 30 capsules — 24,000 (TZ)<br>[Vitabiotics Osteocare Original Tablet](https://afyadepot.co.tz/product/osteocare-original), 30 tablets — 28,000 (TZ)<br>[Jamieson Calcium Magnesium + D3 caplets (333 mg calcium each)](https://www.goodlife.co.ke/product/jamieson-calcium-magnesium-d3-caplets-200s/), 200 caplets — 42,510 (KE, KES 2,091) | Vitabiotics Osteocare Chewable Calcium Tablets, 30 tablets |
| 13 | Body lotion for stretching skin | t2, t3 | From the second trimester the skin of the belly, breasts and thighs stretches and often itches. A rich lotion eases dryness. No cream or oil has been shown to prevent stretch marks, and Afya makes no such claim. Intense itching, especially of the palms and soles, is a reason to tell the clinic. | 800 ml (two 400 ml bottles). *about 8 ml a day (belly, breasts, thighs) × 91 days ≈ 730 ml → two 400 ml bottles.* units = 800 | **[Dove Intensive Nourish Body Lotion](https://www.shoppers.co.tz/product-detail/630f80a1fa11de0a43b3ab91), 400 ml — 12,700 (TZ)** ◆<br>[Vaseline Intensive Dry Skin Lotion](https://www.shoppers.co.tz/product-detail/60c06eda753c0d1ace90a894), 400 ml — 14,600 (TZ)<br>[Vaseline Intensive Cocoa Glow Lotion](https://www.shoppers.co.tz/product-detail/60c06e8e753c0d1ace90a893), 400 ml — 14,600 (TZ)<br>[Vaseline Intensive Aloe Smooth Lotion](https://www.shoppers.co.tz/product-detail/60c06e5c753c0d1ace90a892), 400 ml — 14,600 (TZ)<br>[Bodidoc Deep Hydrating Tissue Oil Lotion](https://afyadepot.co.tz/product/bodydoc-lotion), 400 ml — 15,000 (TZ) | Dove Intensive Nourish Body Lotion, 400 ml |
| 14 | Lip balm for mum | t2, t3 | Nausea, mouth-breathing at night, the heat and, later, labour dry the lips. A plain shea or petrolatum balm without camphor, menthol or mint is kind to cracked lips and safe near a newborn’s face. | 2 sticks. *one 4.8 g stick lasts about 6 weeks at 3–4 uses a day → 2 per 13 weeks.* units = 2 | **[Nivea Shea Butter Lip Balm](https://afyadepot.co.tz/product/nivea-lip-balm-with-shea-butter-4-8g), 4.8 g stick — 10,000 (TZ)** ◆<br>[Nivea Hydro Care lip balm](https://www.goodlife.co.ke/product/nivea-lip-balm-hydro-care/), 4.8 g stick — 10,084 (KE, KES 496)<br>[Vaseline Lip Therapy Original tin](https://www.carrefour.ke/mafken/en/digestive-health-lip/vaseline-lip-balm-original-20g/p/71572), 20 g tin (counted as one piece; lasts longer than a stick) — 7,827 (KE, KES 385)<br>[Sebamed Lip Defence stick SPF 30](https://www.carrefour.ke/mafken/en/digestive-health-lip/sebamed-lip-defence-stick-sp30-4-8g/p/82108), 4.8 g stick — 15,044 (KE, KES 740) | Nivea Shea Butter Lip Balm, 4.8 g stick |
| 15 | Clean delivery kit for the hospital bag | t3 | Many Tanzanian facilities ask mothers to bring their own delivery supplies (gauze, a cover sheet, gloves). A sealed kit in the third-trimester box means the hospital bag is ready well before 36 weeks. | 1 sealed kit. *1 per pregnancy.* units = 1 | **[MamaSave Delivery Kit, “Standards”](https://afyadepot.co.tz/product/mamasave-delivery-kit), 1 kit — 25,000 (TZ)** ◆<br>[MamaSave Delivery Kit, “Care”](https://afyadepot.co.tz/product/mamasave-delivery-kit), 1 kit — 28,000 (TZ)<br>[MamaSave Delivery Kit, “Plus”](https://afyadepot.co.tz/product/mamasave-delivery-kit), 1 kit — 35,000 (TZ) | MamaSave Delivery Kit, “Standards”, 1 kit |
| 16 | Long night or maternity pads for the hospital bag | t3 | Bleeding after birth (lochia) is heaviest in the first days. Long, absorbent pads, changed at least every four hours, are kinder to stitches. Twenty cover the hospital stay and the first days home; the Mama na Mtoto box continues from there. | 20 pads. *about 6–8 a day for the first 2–3 days → 20.* units = 20 | **[Human Cherish Pads 338 mm](https://www.shoppers.co.tz/product-detail/602a3f7d53c6d5732d0a3650), 8 pads — 3,800 (TZ)** ◆<br>[Always Maxi Thick Softer Extra Long](https://www.shoppers.co.tz/product-detail/60263ec453c6d5732d0a3559), 7 pads — 1,900 (TZ)<br>[Kotex Maxi Wide Super Wings Long](https://www.shoppers.co.tz/product-detail/602a66f253c6d5732d0a3692), 8 pads — 4,400 (TZ)<br>[Human Cherish HC Pads, “Kubwa” 338 mm](https://afyadepot.co.tz/product/human-cherish-hc-hq-aerobic-sanitary-pads10s), 10 pads (count from the page address only) — 5,000 (TZ)<br>[Medicott Maternity pads](https://www.carrefour.ke/mafken/en/woman-pads/medicott-maternity-pads-x10/p/997), 10 pads — 1,931 (KE, KES 95) | Human Cherish Pads 338 mm, 8 pads |
| 17 | Maternity briefs | t3 | Soft, high-waisted briefs hold maternity pads securely and do not press on a caesarean wound or perineal stitches. | 1 pack. *1 pack for the hospital stay and first weeks.* units = 1 | **[Baby Banda Maternity briefs](https://www.carrefour.ke/mafken/en/trousers-dress/baby-banda-maternity-briefs/p/71847), 1 pack (count not stated) — 19,618 (KE, KES 965)** ◆<br>[Whisper Super Absorbent overnight period pants M–L](https://portalpharmacy.ke/feminine-care/whisper-super-absorbent-period-panty-m-l-6-panties), 6 — 11,181 (KE, KES 550)<br>[Bébéconfort Stretch net maternity panties](https://findandgetgroup.com/products/bbconfort-stretch-net-panties-5pk), 5 pairs — 65,000 (TZ, 2 Nov) | Baby Banda Maternity briefs, 1 pack (count not stated) |
| 18 | First newborn nappies | t3 | Newborn-size nappies for the first two to three days, so the family leaves the ward prepared whatever stock the ward has. The Mama na Mtoto box takes over after that. | 26 nappies. *8–10 changes a day × 2–3 days ≈ 26.* units = 26 | **[Huggies New Born 6 kg](https://www.shoppers.co.tz/product-detail/602a445353c6d5732d0a3661), 26 — 25,000 (TZ)** ◆<br>[Softcare Premium Soft Diapers S (3–6 kg), “No. 1 - 14’s Pack”](https://afyadepot.co.tz/product/softcare-premium-soft-diapers-for-3-6-kg-s-no-1), 14 — 6,000 (TZ)<br>[Softcare Premium Soft Diapers S (3–6 kg), “No. 1 - 48’s Pack”](https://afyadepot.co.tz/product/softcare-premium-soft-diapers-for-3-6-kg-s-no-1), 48 — 17,000 (TZ)<br>[Huggies Newborn Diapers Size 1 (3.6–6.4 kg), 31’s](https://afyadepot.co.tz/product/huggies-newborn-diapers), 31 — 42,000 (TZ)<br>[Pampers New Baby S1 2–5 kg](https://www.carrefour.ke/mafken/en/baby-diapers/pampers-newborn-dry-s1-34pcs/p/186283), 34 — 23,339 (KE, KES 1,148) | Softcare Premium Soft Diapers S (3–6 kg), “No. 1 - 14’s Pack”, 14 |
| 19 | Newborn bodysuits for the hospital bag | t3 | Clean cotton for the baby to leave the ward in, whatever the facility provides. Long sleeves and a cap keep a newborn warm; skin-to-skin contact does the rest (WHO 2022 postnatal care). | 1 set (3 bodysuits or 2 kimonos). *1 set for the stay and the first days.* units = 1 | **[Generic Long-sleeve kimono bodysuits 0–6 months](https://epictotostore.co.tz/product/bodysuit-set-2-pack-long-sleeve-kimono-wrap-white-0-6-months/), 2 — 25,000 (TZ, 2 Nov)** ◆<br>[Sunnozy Bodysuits 0–3 months, short sleeve](https://epictotostore.co.tz/product/bodysuit-set-3-pack-short-sleeve-white-baby-unisex-0-3-months-sunnozy/), 3 — 30,000 (TZ, 2 Nov)<br>[George Long-sleeve bodysuits, 100% cotton, 0–3 months](https://findandgetgroup.com/products/george-baby-3pack-bodysuit-am-longsleeve), 3 — 65,000 (TZ, 2 Nov) | Generic Long-sleeve kimono bodysuits 0–6 months, 2 |

The fifth brand choice is missing where no fifth listing exists in the same range:
- net: 1 choice;
- ginger tea, water treatment, delivery kit, briefs and bodysuits: 3 choices;
- lip balm and liners: 4 choices.

None was invented.

### Box contents by trimester

| Box | Size | Core items (medicines in italics) |
|---|---|---|
| t1, weeks 1–13 | M | *iron + folic acid*, ginger tea, repellent ×3, treated net, hand soap, water treatment, body wash, toothpaste, toothbrush, liners, intimate wash |
| t2, weeks 14–27 | M | *iron + folic acid*, *calcium from week 20*, repellent ×3, hand soap, water treatment, body wash, body lotion, toothpaste, toothbrush, liners, intimate wash, lip balm |
| t3, weeks 28–40 | L | the t2 list, plus the hospital bag: clean delivery kit, 20 long pads, maternity briefs, 26 newborn nappies, newborn bodysuits |

The t3 box arrives at about week 28, so the hospital bag is ready well before 36 weeks.

## 4. Taste of luxury: one premium and one luxury item per trimester

Priced as their own line at shelf price, outside the saving (D4). Shown here rounded to the nearest 500.

| Trimester | Premium | TSh | Luxury | TSh |
|---|---|---|---|---|
| t1 | Satin sleep bonnet, [Carrefour Kenya](https://www.carrefour.ke/mafken/en/hair-accessories/storesome-satin-sleep-cap-wm002/p/238791) (KE, KES 165) | 3,354 → 3,500 | Bath & Body Works A Thousand Wishes fine fragrance mist 88 ml, [Portal Pharmacy KE](https://portalpharmacy.ke/bbw-a-thousand-wishes-mist) (KE, KES 2,250) | 45,742 → 45,500 |
| t2 | Cotton newborn beanies, 2-pack, [epictotostore.co.tz](https://epictotostore.co.tz/product/baby-hats-2-pack-white-cotton-beanies-with-bear-ears-newborn-dymples/) (TZ, 2 Nov, not re-opened) | 5,000 | Bath & Body Works Ultra Shea body cream 226 g, [Portal Pharmacy KE](https://portalpharmacy.ke/bath-and-body-works-a-thousand-wishes-ultra-shea-body-cream-8-0-oz) (KE, KES 2,500) | 50,825 → 51,000 |
| t3 | Cotton swaddle blanket, [epictotostore.co.tz](https://epictotostore.co.tz/product/gray-baby-swaddle-blanket-white-stripe-cotton-soft-stylish/) (TZ, 2 Nov, not re-opened) | 20,000 | Bath & Body Works fine fragrance mist 236 ml, for the mother and never sprayed near the baby, [Portal Pharmacy KE](https://portalpharmacy.ke/bbw-warm-vanilla-sugar-mist) (KE, KES 2,500) | 50,825 → 51,000 |

Tier price per box on the 12-month plan:

| Trimester | Regular | Premium | Luxury |
|---|---|---|---|
| t1 | 96,500 | 100,000 | 142,000 |
| t2 | 126,500 | 131,500 | 177,500 |
| t3 | 221,000 | 241,000 | 272,000 |

**Add-ons at the counter, not in the core box:**
- maternity support belt: Kedley, KE, KES 5,800 = 117,914;
- nursing pillow: epictotostore, TZ 50,000, 2 Nov;
- nipple cream: Bennetts, KE, KES 1,500 = 30,495; Lansinoh 40 ml, findandgetgroup, TZ 55,000, 2 Nov.

## 5. Services inside this box

| Key | What the member gets | Price in box |
|---|---|---|
| `antenatal-support` | In-store blood pressure, weight and danger-sign check each month. Reminders for the 8 WHO antenatal contacts, IPTp and the tetanus vaccine | 0 (store and public services, D4) |
| `midwife-home-visit` | Optional in t3: birth preparedness and breastfeeding preparation at home | Not in the price. No partner quote yet (R7). R3's planning figure of 40,000 would give r500(40,000 × 1.25) = 50,000, charged in the month it is delivered |

**Market reference, not a model followed (B6):** AfyaDepot sells the following, all opened 10 Nov 2026 ([1](https://afyadepot.co.tz/product/mamasave-protocol-per-trimester), [2](https://afyadepot.co.tz/product/mamasave-anc-profile)):
- a "MamaSave™ Pregnancy Support Protocol Bundle", described as "trimester-specific", at **TSh 79,900**; its contents are not listed on the page;
- a "MamaSave ANC Profile" laboratory test at TSh 75,000.

## 6. Price per trimester box and plan (D4)

Shelf value = default-brand goods of the box, excluding medicines and the luxury line. Price = shelf × (1 − 3% / 6% / 9%), rounded to the nearest 500 and never above shelf. Packing and one delivery are included in the price.

**Goods at shelf, default brands (TSh, per box):**

| Item | t1 | t2 | t3 | Cost class |
|---|---|---|---|---|
| Ginger tea, Melvins 100 bags × 90/100 | 2,653 | — | — | brand 78% |
| Repellent, Odomos 50 g × 3 | 13,800 | 13,800 | 13,800 | brand |
| Treated net (EST) | 10,000 | — | — | own 50% |
| Hand soap, Lifebuoy 175 g × 6 | 21,000 | 21,000 | 21,000 | brand |
| Water treatment, WaterGuard 150 ml × 1 | 6,099 | 6,099 | 6,099 | brand |
| Body wash, Dove Shower Cream 500 ml × 1.5 | 18,000 | 18,000 | 18,000 | brand |
| Body lotion, Dove Intensive 400 ml × 2 | — | 25,400 | 25,400 | brand |
| Toothpaste, Whitedent 190 g × 1 | 4,100 | 4,100 | 4,100 | brand |
| Toothbrush, Double Action × 1 | 2,000 | 2,000 | 2,000 | brand |
| Liners, Kotex 40 × 2 | 10,166 | 10,166 | 10,166 | brand |
| Intimate wash, Beauty Formulas 250 ml × 1 | 18,195 | 18,195 | 18,195 | brand |
| Lip balm, Nivea shea × 2 | — | 20,000 | 20,000 | brand |
| Delivery kit, MamaSave Standards | — | — | 25,000 | pharm 72% |
| Long pads, Human Cherish 338 mm, 20 (8-pack) | — | — | 9,500 | brand |
| Maternity briefs, Baby Banda | — | — | 19,618 | own |
| Newborn nappies, Huggies New Born 26 | — | — | 25,000 | brand |
| Bodysuits, kimono 2-pack | — | — | 25,000 | own |
| **Shelf value** | **106,013** | **138,760** | **242,878** | |
| Goods at landed cost (R3 shares) | 79,890 | 108,233 | 175,452 | |

**Member price per trimester box:**

| Box | Shelf value | 1-month plan (−3%) | 6-month plan (−6%) | 12-month plan (−9%) | Buy once |
|---|---|---|---|---|---|
| t1 | 106,013 | **103,000** | **99,500** | **96,500** | 106,000 |
| t2 | 138,760 | **134,500** | **130,500** | **126,500** | 138,500 |
| t3 | 242,878 | **235,500** | **228,500** | **221,000** | 242,500 |
| Whole pregnancy | 487,651 | 473,000 | 458,500 | 444,000 | |

On the 12-month plan, per month of pregnancy the box works out at about 32,200 (t1), 42,200 (t2) and 73,700 (t3).
- The plans keep D4's names. For a pregnancy, the "6-month" and "12-month" plans mean the member commits to two or three trimester boxes, and the 12-month plan continues into Mama na Mtoto after the birth. The founder should confirm this reading (Open item 6).
- Medicines are bought from the partner pharmacy at its own price, outside the box.

## 7. Does the trimester box pay its way?

**Check (D4):** price − goods at landed cost − packing − one delivery (3,500) − 1% points ≥ 0.
- Landed cost uses R3's planning shares: brand 78%, pharm 72%, own 50%.
- Packing: t1 and t2 are M boxes (5,000); t3 is an L box (6,500).

| Box | Packing + delivery | Margin, 1-month plan | Margin, 6-month plan | Margin, 12-month plan | Landed-cost share at which the 12-month margin reaches 0 (now) |
|---|---|---|---|---|---|
| t1 | 8,500 | +13,580 (13.2%) | +10,115 (10.2%) | **+7,145 (7.4%)** | 82.1% (75.4%) |
| t2 | 8,500 | +16,422 (12.2%) | +12,462 (9.5%) | **+8,502 (6.7%)** | 84.1% (78.0%) |
| t3 | 10,000 | +47,693 (20.3%) | +40,763 (17.8%) | **+33,338 (15.1%)** | 86.0% (72.2%) |

**Plainly: yes, it now pays its way.** Every trimester box covers its goods, packing, one delivery and points on every plan.

Compare the same goods split into three monthly boxes (S packing 3,500 + delivery 3,500 each month, 12-month plan). The margin is about −1,950 a month in t1 and −1,498 a month in t2. This confirms R3 §4c: monthly delivery loses money and trimester delivery fixes it.

Two cautions:
1. The first two boxes have thin margins. If goods land above about 82–84% of shelf instead of 75–78%, the 12-month plan loses money. Supplier quotes for soap, body wash and lotion (37% of t1 value, 46% of t2) decide this.
2. The member saving is only 3/6/9% because packing and delivery are inside the price (D4). Against the online market, the box's advantage is one delivery of everything every three months; AfyaDepot delivers free in Dar only above 150,000 (R3).

## 8. Open items

1. **Treated net** (EST 10,000). Get a distributor quote for a WHO-prequalified long-lasting net. This is the only reason `final` is false.
2. **Kenyan-only lines:** ginger tea, liners, intimate wash, water treatment, maternity briefs. They are 35% of t1 value, 25% of t2 and 22% of t3. Replace them with Kariakoo or distributor prices. The hosts were refused here: carrefour.ke, jumia.co.ke, portalpharmacy.ke, goodlife.co.ke.
3. **Tanzanian rows not re-opened:** bodysuits, premium items (epictotostore.co.tz, findandgetgroup.com), and the Whitedent brush (superstore.co.tz). The hosts were refused.
4. **Pack checks:**
   - the active ingredient of each repellent, and that its label allows use in pregnancy (CDC lists DEET, picaridin, IR3535, OLE, PMD and 2-undecanone as registered; not re-opened here);
   - that Whitedent contains fluoride;
   - the calcium per Calcivita tablet;
   - the Softcare pack labels (14 vs 40; R3);
   - the contents of the MamaSave delivery kit variants.
5. **Landed cost** (78/72/50%) is a planning assumption; see the break-even shares in section 7.
6. **Plan reading** for a 9-month pregnancy (section 6), and whether the 12-month plan rolls into Mama na Mtoto.
7. **Midwife home visit:** partner quote (R7).
8. **Tanzanian guidance:** open the MoH 2018 ANC guideline (afro.who.int was refused) and confirm the national IFA and calcium dosing.
9. **Kiswahili for native review:**
   - *priklampsia*: the code uses "kifafa cha mimba", which is eclampsia;
   - *pedi nyembamba za kila siku (panty liners)*;
   - *chupi za baada ya kujifungua*;
   - *sabuni laini ya sehemu za siri*;
   - *mahudhurio ya kliniki ya ujauzito* for "antenatal contacts";
   - *kofia ya satin ya kulalia*.
10. **Code follow-up (not done here):** `part3c.js` `D.PKG.preg` still prices calcium and iron as goods, assigns uji, sends a monthly gift and uses KES × 20. It should render from this JSON.

## 9. Sources

**Guidance (opened 10 Nov 2026 unless stated):**
- WHO 2016, *Recommendations on antenatal care for a positive pregnancy experience*: https://www.who.int/publications/i/item/9789241549912
- Its summary chart (A.1–A.8, C.5, C.6, D.1–D.5, eight contacts): https://www.who.int/docs/default-source/reproductive-health/maternal-health/anc.pdf?sfvrsn=5e2c740e_2
- WHO news release, 7 Nov 2016: https://www.who.int/news/item/07-11-2016-new-guidelines-on-antenatal-care-for-a-positive-pregnancy-experience
- WHO eLENA, *Daily iron and folic acid supplementation during pregnancy* (updated 26 Jul 2024): https://www.who.int/tools/elena/interventions/daily-iron-pregnancy
- WHO eLENA, *Calcium supplementation during pregnancy* (updated 9 Aug 2023): https://www.who.int/tools/elena/interventions/calcium-pregnancy
- WHO 2018 calcium recommendation: https://www.who.int/publications/i/item/9789241550451
- WHO 2022, *Recommendations on maternal and newborn care for a positive postnatal experience*: https://www.who.int/publications/i/item/9789240045989
- Tanzania MoH, *Draft ANC Guidelines 2018*: https://afro.who.int/sites/default/files/2019-06/Draft%20ANC%20Guidelines%202018%20-%20Final%20Copy.pdf. **Not opened (host refused); search result only.**
- Dar es Salaam low-dose calcium trial (NEJM 2024), as cited in the code (`cal24`, `cal24tz`): not re-opened.
- Cochrane handwashing and water-treatment reviews: as cited in the code (`hw`, `wat`), not re-opened.

**Prices:**
- AfyaDepot product pages (schema.org Product data and page variant data, no `/api`), opened 10 Nov 2026. Every URL is in the JSON.
- Softcare variant prices are from R3 / `data/prices.json` (9 Nov 2026).
- Shoppers Supermarket product pages, `https://www.shoppers.co.tz/product-detail/<id>`, opened 10 Nov 2026 (server-rendered name and price). Stock text on these pages sits inside HTML comments and was not used.
- Kenyan rows: code `part3c.js` catalogue `B` (2 Nov 2026). KES = code value ÷ 20, converted at 20.33 (`research/fx.md`).
- Working files: `/tmp/claude-0/-home-user-fa-market-lab/763e29dd-dd47-5b19-b730-923fee20ac28/scratchpad/r6preg/`:
  - `bin/build_preg.js` builds the JSON and prices;
  - `bin/validate.js`;
  - `ad_obs.json`, `shoppers_obs.json`, `shp_list.json`.

**Price changes seen versus the code:** none. Every Shoppers and AfyaDepot page that was already in the code shows the same price on 10 Nov as on 2 Nov:
- Shoppers: Odomos, No-Bite spray, Peaceful Sleep, Dettol soap and gel, Vaseline, Colgate, Sensodyne, Oral-B, Always, Human Cherish, Kotex, Huggies;
- AfyaDepot: iron and folic acid, Osteocare, MamaSave, Nivea.

For the nutrition-shelf changes, see R9.
