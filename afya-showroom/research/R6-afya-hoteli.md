# R6 — Afya Hoteli (hotels and guest houses, monthly)

Feeds section 3.5. Prices checked 10 Nov 2026. Data file: `data/boxes/afya-hoteli.json` (validated against `data/boxes/SCHEMA.md`; `final: false` because the treated net is an estimate). Draft for the founder; the showroom code and the brief are unchanged.

## In plain language

- Afya Hoteli supplies the health and hygiene goods of a hotel every month: shower and hand soap, sanitiser, toilet paper, bathroom bin liners, mosquito protection, housekeeping disinfection and gloves, and a front-desk first-aid box for guests and staff.
- Two sizes, modelled as stages: a **guest house of about 10 rooms** and a **3-star hotel of about 40 rooms**.
- Every quantity is set **per occupied room-night**. **Estimate:** 55% occupancy, so 165 occupied room-nights a month (guest house) and 660 (hotel). The 2024 national bed occupancy ranged from 39.3% to 73.3% (NBS, search results only).
- Core goods at shelf value: **TSh 277,319 a month (guest house)** and **1,118,596 (hotel)**, about 1,681 per occupied room-night.
- 12-month plan: **252,500** and **1,018,000** a month. Quarterly pest control and first-aid training are billed when they happen (324,000 and 368,000 a year).
- **Both sizes pay their way easily** (12-month margin +43,839 and +192,212), even with the hotel's goods in three L boxes.
- The treated-net price is an estimate, so the box is **not final**. Hotels buy wholesale: a trade price list is needed before selling to larger hotels.

---

## 1. Who it is for, and the guidance it is built from

**English.** For hotels and guest houses: a guest house of about 10 rooms or a 3-star hotel of about 40 rooms. The box carries the guest-room goods that protect health and hygiene, a front-desk first-aid box for guests and staff, hand sanitiser, housekeeping disinfection, and treated nets on a replacement rotation.



Every quantity is set per occupied room-night and multiplied by an occupancy estimate of 55%. That estimate sits inside the national bed occupancy reported by the National Bureau of Statistics for 2024 (from 39.3% in April to 73.3% in July, seen in search results only). The hotel tells Afya its real occupancy, and the next box follows it.



The guidance is WHO’s: treated nets and repellent against malaria; safe water, sanitation and hygiene against cholera; alcohol hand rub where there is no sink; cool water and a clean non-adherent dressing for burns. As cited in the old code, the OSH Rules 2015 require a stocked first-aid box and welfare facilities for staff. Afya does not sell medicines: oral rehydration salts for guests come from the licensed partner pharmacy.

### The occupancy assumption (estimate)

| | Guest house | 3-star hotel |
|---|---|---|
| Rooms | 10 | 40 |
| Occupancy (estimate) | 55% | 55% |
| Occupied room-nights a month | 10 × 30 × 0.55 = 165 | 40 × 30 × 0.55 = 660 |
| Average stay (estimate) | 2 nights → 83 check-ins | 2 nights → 330 check-ins |
| Staff (estimate) | 5 | 30 |

Basis: NBS hotel statistics for 2024 report national bed occupancy of 44.7% (January), 39.3% (April), 53.9% (June), 73.3% (July) and 70.7% (December). These figures were **seen in search results only**; nbs.go.tz was refused here. Bed occupancy is not room occupancy, and no Dar es Salaam figure was found. 55% sits inside that range. **Per-room-night rates (15 ml body wash, 5 ml hand soap, 0.5 toilet roll, and so on) are planning estimates**, labelled in every formula.

**Kiswahili.** Kwa hoteli na nyumba za wageni: nyumba ya wageni ya takriban vyumba 10 au hoteli ya nyota tatu ya takriban vyumba 40. Boksi linabeba bidhaa za vyumba vya wageni zinazolinda afya na usafi, sanduku la huduma ya kwanza la mapokezi kwa wageni na wafanyakazi, kitakasa mikono, dawa za kusafisha za wahudumu wa vyumba, na vyandarua vyenye dawa vinavyobadilishwa kwa zamu.



Kila kiasi kimewekwa kwa kila usiku wa chumba chenye mgeni na kuzidishwa kwa makadirio ya vyumba kujaa 55%. Makadirio hayo yako ndani ya kiwango cha vitanda kujaa kitaifa kilichotolewa na Ofisi ya Taifa ya Takwimu kwa 2024 (kuanzia 39.3% Aprili hadi 73.3% Julai, kilichoonekana kwenye matokeo ya utafutaji tu). Hoteli inaiambia Afya kiwango chake halisi, na boksi linalofuata linafuata hicho.



Miongozo ni ya WHO: vyandarua vyenye dawa na dawa ya kufukuza mbu dhidi ya malaria; maji salama, usafi wa mazingira na usafi binafsi dhidi ya kipindupindu; kitakasa chenye alkoholi pasipo na sinki; maji ya baridi na kifuniko safi kisichonata kwa majeraha ya moto. Kama zilivyonukuliwa kwenye msimbo wa zamani, Kanuni za OSH 2015 zinataka sanduku la huduma ya kwanza lenye vifaa na huduma za ustawi kwa wafanyakazi. Afya haiuzi dawa: chumvi za kurudisha maji mwilini kwa wageni zinatoka kwa famasia mshirika yenye leseni.

### Safety line (shown on the page)

- **EN:** First aid at the front desk is for small injuries only. A guest with a fever is sent for a malaria test; a deep wound, a large burn or diarrhoea with weakness goes to a health facility straight away. Medicines come from the licensed partner pharmacy.
- **SW:** Huduma ya kwanza mapokezi ni kwa majeraha madogo tu. Mgeni mwenye homa anapelekwa kupima malaria; jeraha kubwa, jeraha kubwa la moto au kuharisha pamoja na udhaifu kunapelekwa kituo cha afya mara moja. Dawa zinatoka kwa famasia mshirika yenye leseni.

## 2. What changed from the code (`part3c.js` `D.PKG.hotel`)

| Code | Now | Why |
|---|---|---|
| One stage, "block of 20 rooms", fixed monthly counts | Two stages (10 and 40 rooms); every quantity per occupied room-night × a stated occupancy | The brief asks for guest house and 3-star sizes, per room-night |
| No body wash, toilet paper or bin liners for rooms | Added | Guest-room hygiene goods |
| 20 × 50 ml in-room sanitiser bottles | Sanitiser at reception, dining and rooms, 2 ml per room-night + fixed | Same purpose, bulk packs |
| 1 net a month for 20 rooms | Rooms ÷ 36 months (about a 3-year net life) | Stated formula |
| First-aid essentials priced monthly | Starter set, charged once | One-off items |
| Staff drinking-water treatment | Removed | Hotels supply treated or bottled water already |
| KES × 20 | KES × 20.33 | `fx.md` |

## 3. Items, line by line

Status: **TZ** = Tanzanian listing opened 10 Nov 2026 (Shoppers category crawl or AfyaDepot product page, schema.org data) unless marked "2 Nov" (code row on superstore.co.tz, a host refused here). **KE** = Kenyan listing from the code, KES shown, converted at 20.33 (BoT mean, 10 Nov 2026, `fx.md`), *not re-opened* (hosts refused). **EST** = labelled estimate with its basis. ◆ = default brand (headline price). Goods cost = price × units ÷ pack units. Where an item ships every 2–3 months, `units` is the monthly average and the quantity says when it ships.

| # | Item | Why (guidance) | Quantity and formula, by stage | Brand choices: product, pack — TSh (status) | Afya Choice |
|---|---|---|---|---|---|
| 1 | Body wash for the shower dispenser | A wall dispenser in each shower gives every guest clean soap without the waste of half-used bars. | **Guest house (about 10 rooms):** 2,500 ml a month. *15 ml per occupied room-night × 165 room-nights = 2,475 → 2,500 (rates are planning estimates)* (units 2500)<br>**3-star hotel (about 40 rooms):** 9,900 ml a month. *15 ml per occupied room-night × 660 room-nights = 9,900 (rates are planning estimates)* (units 9900) | **[Odeon Shower Gel, assorted](https://www.shoppers.co.tz/product-detail/6980bc51d0b62e115fe9041d), 1 L — 11,500 (TZ)** ◆<br>[Hobby Body Wash, assorted](https://www.shoppers.co.tz/product-detail/68de835e92a77f6bb268ba9a), 1 L — 15,800 (TZ)<br>[Niara Niya Body Wash, assorted](https://www.shoppers.co.tz/product-detail/683ed9b9d0c44e03353fb3fa), 400 ml — 8,300 (TZ)<br>[Dove Shower Cream](https://www.shoppers.co.tz/product-detail/6026875053c6d5732d0a35ef), 500 ml — 12,000 (TZ) | Odeon Shower Gel, assorted, 1 L |
| 2 | Liquid hand soap for room basins and staff | Soap at every basin for guests, and soap for employees as a welfare duty in the OSH Rules 2015 (as cited in the old code; not opened here). | **Guest house (about 10 rooms):** 1,850 ml a month. *5 ml per occupied room-night × 165 room-nights + 200 ml per staff × 5 staff = 1,825 → 1,850 (rates are planning estimates)* (units 1850)<br>**3-star hotel (about 40 rooms):** 9,300 ml a month. *5 ml per occupied room-night × 660 room-nights + 200 ml per staff × 30 staff = 9,300 (rates are planning estimates)* (units 9300) | **[Hobby Liquid Soap](https://www.shoppers.co.tz/product-detail/602a420353c6d5732d0a3659), 400 ml — 3,500 (TZ)** ◆<br>[Biox liquid hand soap](https://superstore.co.tz/shop/all-products/biox-liquid-hand-soap-rose-500ml/), 500 ml — 1,800 (TZ, 2 Nov)<br>[Savlon Germ Protection Hand Wash](https://www.shoppers.co.tz/product-detail/602b7fe153c6d5732d0a373f), 200 ml — 6,200 (TZ)<br>[Dettol liquid handwash Original](https://www.carrefour.ke/mafken/en/liquid-soap-antibacterial/dettol-hand-wash-original-400ml/p/53700), 400 ml — 15,247 (KE, KES 750) | Hobby Liquid Soap, 400 ml |
| 3 | Alcohol hand sanitiser for reception, dining and rooms | An alcohol rub at reception and the dining-room door cleans hands where there is no sink (WHO 2009 hand hygiene guidelines). | **Guest house (about 10 rooms):** 850 ml a month. *2 ml per occupied room-night × 165 room-nights + 500 ml for reception and dining = 830 → 850 (rates are planning estimates)* (units 850)<br>**3-star hotel (about 40 rooms):** 2,800 ml a month. *2 ml per occupied room-night × 660 room-nights + 1,500 ml for reception and dining = 2,820 → 2,800 (rates are planning estimates)* (units 2800) | **[Jet Hand Sanitizer](https://www.shoppers.co.tz/product-detail/602a587253c6d5732d0a366d), 500 ml — 8,500 (TZ)** ◆<br>[Body Guard Hand Sanitizer](https://www.shoppers.co.tz/product-detail/6026664053c6d5732d0a358c), 250 ml — 4,500 (TZ)<br>[Bodyguard Hand Sanitizer refill](https://www.shoppers.co.tz/product-detail/60a3672305aea259ff2f8878), 5 L — 96,000 (TZ)<br>[Saraya hand sanitiser](https://www.carrefour.ke/mafken/en/hand-sanitizers/saraya-hand-sanitizer-500ml/p/141354), 500 ml — 17,077 (KE, KES 840) | Jet Hand Sanitizer, 500 ml |
| 4 | Toilet paper for rooms and staff toilets | Basic guest hygiene, and a welfare item for staff in the OSH Rules 2015 (as cited in the old code). | **Guest house (about 10 rooms):** 98 rolls a month. *0.5 rolls per occupied room-night × 165 room-nights + 3 rolls per staff × 5 staff = 98 → 98 (rates are planning estimates)* (units 98)<br>**3-star hotel (about 40 rooms):** 420 rolls a month. *0.5 rolls per occupied room-night × 660 room-nights + 3 rolls per staff × 30 staff = 420 (rates are planning estimates)* (units 420) | **[Rexa Toilet Papers White](https://www.shoppers.co.tz/product-detail/604f52aeda3fef0287051068), 8 rolls — 6,500 (TZ)** ◆<br>[Fay Pink Toilet Papers](https://www.shoppers.co.tz/product-detail/6aa97cd1835ef903d63150bd), 10 rolls — 10,200 (TZ)<br>[Velvex Premium toilet tissue](https://superstore.co.tz/shop/all-products/velvex-premium-toilet-tissue-10-pack/), 10 rolls — 11,550 (TZ, 2 Nov)<br>[Comfi Bathroom Tissue](https://www.shoppers.co.tz/product-detail/6026797a53c6d5732d0a35c8), 4 rolls — 11,000 (TZ)<br>[Andrex Bathroom Tissue](https://www.shoppers.co.tz/product-detail/602641f553c6d5732d0a3561), 4 rolls — 14,000 (TZ) | Rexa Toilet Papers White, 8 rolls |
| 5 | Bathroom bin liners | A fresh liner at each check-out and when used keeps sanitary waste sealed and the bathroom clean. | **Guest house (about 10 rooms):** 83 liners a month. *0.5 liners per occupied room-night × 165 room-nights = 83 → 83 (rates are planning estimates)* (units 83)<br>**3-star hotel (about 40 rooms):** 330 liners a month. *0.5 liners per occupied room-night × 660 room-nights = 330 (rates are planning estimates)* (units 330) | **[Draw-tape pedal-bin liners, for small and sanitary bins](https://www.carrefour.ke/mafken/en/garbage-bags-flat-with-ties/bio-pedal-bin-liner-yellow-tape/p/154431), 30 bags — 11,751 (KE, KES 578)** ◆<br>[Scented small bin bags 46 × 52 cm](https://www.jumia.co.ke/generic-scented-trash-garbage-dustbin-bags-30-pieces-326905305.html), 30 bags — 27,445 (KE, KES 1,350)<br>[Classic Trash Bags 30 gallon](https://www.shoppers.co.tz/product-detail/6026749553c6d5732d0a35ba), 20 bags — 25,000 (TZ) | Draw-tape pedal-bin liners, for small and sanitary bins, 30 bags |
| 6 | Room insect spray at turn-down | Kills mosquitoes resting in the room before the guest sleeps. It adds to the net and screens and never replaces them; WHO names treated nets and indoor residual spraying as the core vector controls. | **Guest house (about 10 rooms):** 650 ml a month. *4 ml per occupied room-night × 165 room-nights = 660 → 650 (rates are planning estimates)* (units 650)<br>**3-star hotel (about 40 rooms):** 2,650 ml a month. *4 ml per occupied room-night × 660 room-nights = 2,640 → 2,650 (rates are planning estimates)* (units 2650) | **[Hit Insect Spray](https://www.shoppers.co.tz/product-detail/602a3e9853c6d5732d0a364d), 750 ml — 7,500 (TZ)** ◆<br>[Rungu mosquito spray](https://superstore.co.tz/shop/all-products/rungu-mosquito-spray-850ml/), 850 ml — 8,200 (TZ, 2 Nov)<br>[Vape A1 Mosquito Spray](https://www.shoppers.co.tz/product-detail/6867b384914cc5c6cdeaf5cc), 600 ml — 9,300 (TZ)<br>[Mortein Doom Fast Kill](https://www.shoppers.co.tz/product-detail/65cf814b0eb6b270e24f70c7), 600 ml — 12,000 (TZ)<br>[Mortein Doom Odorless](https://www.shoppers.co.tz/product-detail/602a795b53c6d5732d0a36c8), 600 ml — 14,500 (TZ) | Hit Insect Spray, 750 ml |
| 7 | Mosquito repellent for guests, on request at reception | WHO advises repellents with DEET, IR3535 or icaridin after dusk; guests often arrive without one. | **Guest house (about 10 rooms):** 6 packs a month. *0.03333333333333333 packs per occupied room-night × 165 room-nights = 6 → 6 (rates are planning estimates)* (units 6)<br>**3-star hotel (about 40 rooms):** 22 packs a month. *0.03333333333333333 packs per occupied room-night × 660 room-nights = 22 (rates are planning estimates)* (units 22) | **[Odomos Roll On](https://www.shoppers.co.tz/product-detail/602b6d4553c6d5732d0a36f8), 50 g — 4,600 (TZ)** ◆<br>[Nobite Roll On Insect Repellent](https://www.shoppers.co.tz/product-detail/602b993f53c6d5732d0a379e), 40 ml — 8,200 (TZ)<br>[No-Bite Mosquito Repellent Roll-On](https://afyadepot.co.tz/product/mosquito-repellent-roll-on-no-bite-45m), 45 ml — 9,000 (TZ)<br>[Peaceful Sleep Stick Roll On](https://www.shoppers.co.tz/product-detail/602b71ec53c6d5732d0a370e), 30 ml — 9,500 (TZ)<br>[No-bite Spray Insect Repellent](https://www.shoppers.co.tz/product-detail/604f5e82da3fef0287051085), 120 ml — 10,600 (TZ) | Odomos Roll On, 50 g |
| 8 | Treated mosquito net replacement | Every bed keeps a treated net (WHO core vector control). A net lasts about three years in daily use; nets are replaced on a rotation so none is torn. | **Guest house (about 10 rooms):** About 0.3 nets a month (10 nets replaced over 36 months). *10 rooms × 1 net ÷ 36 months (about a 3-year life; planning estimate)* (units 0.28)<br>**3-star hotel (about 40 rooms):** About 1.1 nets a month (40 nets replaced over 36 months). *40 rooms × 1 net ÷ 36 months (about a 3-year life; planning estimate)* (units 1.11) | **[Long-lasting insecticidal net, family size](https://www.mdpi.com/2414-6366/10/6/175), 1 net — 10,000 (EST)** ◆ | Long-lasting insecticidal net, family size, 1 net |
| 9 | Bleach for toilets, basins and drains | Chlorine bleach disinfects toilets and basins between guests; safe water, sanitation and hygiene are WHO’s first defence against cholera. | **Guest house (about 10 rooms):** 2,400 ml a month. *10 ml per occupied room-night × 165 room-nights + 750 ml for public and staff toilets = 2,400 (rates are planning estimates)* (units 2400)<br>**3-star hotel (about 40 rooms):** 9,600 ml a month. *10 ml per occupied room-night × 660 room-nights + 3,000 ml for public and staff toilets = 9,600 (rates are planning estimates)* (units 9600) | **[Omo Bleach](https://www.shoppers.co.tz/product-detail/602b6f2153c6d5732d0a36ff), 750 ml — 5,500 (TZ)** ◆<br>[Domestos Pine Fresh Bleach](https://www.shoppers.co.tz/product-detail/6026845c53c6d5732d0a35e8), 750 ml — 6,800 (TZ)<br>[Jik Bleach Regular](https://www.shoppers.co.tz/product-detail/602a58b953c6d5732d0a366e), 750 ml — 8,200 (TZ)<br>[Clorox Regular liquid bleach](https://www.carrefour.ke/mafken/en/bleach/clorox-regular-750ml/p/48592), 750 ml — 7,359 (KE, KES 362) | Omo Bleach, 750 ml |
| 10 | Floor and surface disinfectant for housekeeping | Floors, bedside tables, handles and switches are cleaned at every check-out and daily. | **Guest house (about 10 rooms):** 2,650 ml a month. *10 ml per occupied room-night × 165 room-nights + 1,000 ml for corridors, kitchen and reception = 2,650 (rates are planning estimates)* (units 2650)<br>**3-star hotel (about 40 rooms):** 10,600 ml a month. *10 ml per occupied room-night × 660 room-nights + 4,000 ml for corridors, kitchen and reception = 10,600 (rates are planning estimates)* (units 10600) | **[Lit Pine Disinfectant](https://www.shoppers.co.tz/product-detail/604f53e6da3fef028705106c), 5 L — 11,900 (TZ)** ◆<br>[Lit household disinfectant, pine](https://superstore.co.tz/shop/all-products/lit-household-cleaner-disinfectant-pine-fresh-1ltr/), 1 L — 2,700 (TZ, 2 Nov)<br>[Handy Andy All Purpose, Ocean](https://www.shoppers.co.tz/product-detail/68a07c9126163eea42517723), 750 ml — 10,000 (TZ)<br>[Dettol Kitchen Cleaner Spray](https://www.shoppers.co.tz/product-detail/6026833f53c6d5732d0a35e4), 500 ml — 16,500 (TZ)<br>[Astonish anti-bacterial surface cleaner](https://www.carrefour.ke/mafken/en/antiseptic-disinfectant/astonish-anti-b-surface-cl-t750ml/p/22977), 750 ml — 12,910 (KE, KES 635) | Lit Pine Disinfectant, 5 L |
| 11 | Disposable gloves for housekeeping and first aid | Housekeepers change gloves after each bathroom; protective equipment is an employer duty (OHS Act 2003, as cited in the old code). | **Guest house (about 10 rooms):** 330 gloves a month. *2 gloves per occupied room-night × 165 room-nights = 330 (rates are planning estimates)* (units 330)<br>**3-star hotel (about 40 rooms):** 1,320 gloves a month. *2 gloves per occupied room-night × 660 room-nights = 1,320 (rates are planning estimates)* (units 1320) | **[Latex examination gloves, medium](https://www.goodlife.co.ke/product/latex-examination-gloves-medium-100s/), 100 gloves — 10,673 (KE, KES 525)** ◆<br>[Latex powder-free gloves, medium](https://www.goodlife.co.ke/product/latex-powder-free-gloves-medium-100s/), 100 gloves — 17,443 (KE, KES 858)<br>[Bergamot Sentrile nitrile powder-free gloves](https://www.carrefour.ke/mafken/en/safety/nitrile-powder-free-gloves-100pc/p/166751), 100 gloves — 35,252 (KE, KES 1,734) | Latex examination gloves, medium, 100 gloves |
| 12 | Plasters for the front-desk first-aid box | For guests and staff: small cuts and blisters from walking. The OSH Rules 2015 require a stocked first-aid box (as cited in the old code). | **Guest house (about 10 rooms):** 15 plasters a month. *0.05 plasters per occupied room-night × 165 room-nights + 1 plasters per staff × 5 staff = 13 → 15 (rates are planning estimates)* (units 15)<br>**3-star hotel (about 40 rooms):** 65 plasters a month. *0.05 plasters per occupied room-night × 660 room-nights + 1 plasters per staff × 30 staff = 63 → 65 (rates are planning estimates)* (units 65) | **[Sonaplast plasters](https://www.carrefour.ke/mafken/en/first-aid/sonaplast-100-s/p/118642), 100 strips — 3,253 (KE, KES 160)** ◆<br>[Steroplast fabric plasters, assorted](https://www.goodlife.co.ke/product/steroplast-fabric-ass-16s/), 16 strips — 3,497 (KE, KES 172)<br>[Steroplast washproof plasters, assorted](https://www.goodlife.co.ke/product/steroplast-washproof-ass-16s/), 16 strips — 3,497 (KE, KES 172)<br>[Elastoplast fabric plasters](https://www.goodlife.co.ke/product/elastoplast-fabric-100s/), 100 strips — 20,330 (KE, KES 1,000)<br>[Elastoplast water-resistant plaster strips](https://portalpharmacy.ke/elastoplast-water-resi-40s), 40 strips — 30,495 (KE, KES 1,500) | Sonaplast plasters, 100 strips |
| 13 | Antiseptic liquid for the first-aid box | Cleans the skin around a wound before it is covered. | **Guest house (about 10 rooms):** 50 ml a month. *0.2 ml per occupied room-night × 165 room-nights + 2 ml per staff × 5 staff = 43 → 50 (rates are planning estimates)* (units 50)<br>**3-star hotel (about 40 rooms):** 200 ml a month. *0.2 ml per occupied room-night × 660 room-nights + 2 ml per staff × 30 staff = 192 → 200 (rates are planning estimates)* (units 200) | **[Dettol Antiseptic Liquid](https://www.shoppers.co.tz/product-detail/6026826753c6d5732d0a35e2), 500 ml — 13,000 (TZ)** ◆<br>[U-SOL antiseptic wound solution](https://afyadepot.co.tz/product/u-sol-antiseptic-wound-solution100mils), 100 ml — 1,500 (TZ)<br>[Savlon antiseptic liquid](https://www.carrefour.ke/mafken/en/antiseptic-disinfectant/savlon-antiseptic-liquid-750ml/p/9854), 750 ml — 25,819 (KE, KES 1,270)<br>[Betadine antiseptic solution, 10% povidone-iodine](https://portalpharmacy.ke/first-aid/antiseptics), 500 ml — 39,644 (KE, KES 1,950)<br>[Tincture of iodine](https://www.goodlife.co.ke/product/tincture-of-iodine-100ml/), 100 ml — 3,964 (KE, KES 195) | Dettol Antiseptic Liquid, 500 ml |
| 14 | Sterile gauze swabs for the first-aid box | To clean a wound and press on it to stop bleeding. | **Guest house (about 10 rooms):** 5 swabs a month. *0.02 swabs per occupied room-night × 165 room-nights + 0.5 swabs per staff × 5 staff = 6 → 5 (rates are planning estimates)* (units 5)<br>**3-star hotel (about 40 rooms):** 30 swabs a month. *0.02 swabs per occupied room-night × 660 room-nights + 0.5 swabs per staff × 30 staff = 28 → 30 (rates are planning estimates)* (units 30) | **[Sterile gauze swabs 3×3 in](https://www.goodlife.co.ke/product/gauze-swabs-sterile-3x3-100s/), 100 swabs — 19,374 (KE, KES 953)** ◆<br>[Sterile gauze swabs 4×4 in](https://www.goodlife.co.ke/product/gauze-swabs-sterile-44-100s/), 100 swabs — 21,306 (KE, KES 1,048)<br>[Steroplast sterile dressing pads 5×5 cm](https://www.goodlife.co.ke/product/steroplast-dressing-pads-sterile-5s-5cm-x-5cm/), 5 pads — 5,611 (KE, KES 276) | Sterile gauze swabs 3×3 in, 100 swabs |
| 15 | Sterile non-adherent dressing for kitchen burns | WHO burns first aid: cool running water for about 20 minutes, then a clean non-adherent dressing, then care. | **Guest house (about 10 rooms):** 5 pads a month. *1 pack of 5 a month by the kitchen (planning estimate)* (units 5)<br>**3-star hotel (about 40 rooms):** 10 pads a month. *2 packs of 5 a month (main kitchen and bar)* (units 10) | **[Steroplast sterile dressing pads 5×5 cm](https://www.goodlife.co.ke/product/steroplast-dressing-pads-sterile-5s-5cm-x-5cm/), 5 pads — 5,611 (KE, KES 276)** ◆<br>[Sterile gauze swabs 4×4 in](https://www.goodlife.co.ke/product/gauze-swabs-sterile-44-100s/), 100 swabs — 21,306 (KE, KES 1,048)<br>[Sterile gauze swabs 3×3 in](https://www.goodlife.co.ke/product/gauze-swabs-sterile-3x3-100s/), 100 swabs — 19,374 (KE, KES 953) | Steroplast sterile dressing pads 5×5 cm, 5 pads |
| 16 | Sanitary pads for guests on request and the staff toilet | An emergency supply at reception and in the staff toilet. | **Guest house (about 10 rooms):** 10 pads a month. *0.02 pads per occupied room-night × 165 room-nights + 1 pads per staff × 5 staff = 8 → 10 (rates are planning estimates)* (units 10)<br>**3-star hotel (about 40 rooms):** 40 pads a month. *0.02 pads per occupied room-night × 660 room-nights + 1 pads per staff × 30 staff = 43 → 40 (rates are planning estimates)* (units 40) | **[Softcare Long sanitary pads](https://superstore.co.tz/shop/all-products/softcare-long-pads-pink/), 10 pads — 1,400 (TZ, 2 Nov)** ◆<br>[Always Maxi Thick Softer Extra Long](https://www.shoppers.co.tz/product-detail/60263ec453c6d5732d0a3559), 7 pads — 1,900 (TZ)<br>[Human Cherish Pads 338 mm](https://www.shoppers.co.tz/product-detail/602a3f7d53c6d5732d0a3650), 8 pads — 3,800 (TZ)<br>[Human Cherish HC Pads](https://afyadepot.co.tz/product/human-cherish-hc-hq-aerobic-sanitary-pads10s), 10 pads — 5,000 (TZ)<br>[Kotex Maxi Wide Super Wings Long](https://www.shoppers.co.tz/product-detail/602a66f253c6d5732d0a3692), 8 pads — 4,400 (TZ) | Softcare Long sanitary pads, 10 pads |
| 17 | Oral rehydration salts for guests (partner pharmacy)<br>*kind: medicine — partner pharmacy, not priced (B4)* | Travellers’ diarrhoea is common; WHO: oral rehydration solution treats most cases, and starting quickly matters. Supplied by the licensed partner pharmacy; not priced in the box. | **Guest house (about 10 rooms):** 3 sachets a month. *0.02 sachets per occupied room-night × 165 room-nights = 3 → 3 (rates are planning estimates)* (units 3)<br>**3-star hotel (about 40 rooms):** 13 sachets a month. *0.02 sachets per occupied room-night × 660 room-nights = 13 → 13 (rates are planning estimates)* (units 13) | **[Low-osmolarity ORS sachet](https://afyadepot.co.tz/product/iyfe-ors-sachhets-1s), 1 sachet — 500 (TZ)** ◆ | Low-osmolarity ORS sachet, 1 sachet |

### Starter items (first box only)

| # | Item | Why (guidance) | Quantity and formula, by stage | Brand choices: product, pack — TSh (status) | Afya Choice |
|---|---|---|---|---|---|
| 1 | First-aid box, marked “First Aid”, at the front desk | A search result quoting the 2015 Rules says the box must be marked “FIRST AID” and hold only first-aid equipment, with one box and two trained first-aiders for 10–50 employees (snippet only; not opened). | **Guest house (about 10 rooms):** 1 boxes, first box only. *1 at reception; the hotel adds 1 in the main kitchen* (units 1)<br>**3-star hotel (about 40 rooms):** 2 boxes, first box only. *1 at reception; the hotel adds 1 in the main kitchen* (units 2) | [Silver Smart First Aid Container (empty)](https://afyadepot.co.tz/product/empty-kit-silver-smart-first-aid-kit), 1 — 17,000 (TZ)<br>[Premium Transparent Plastic Container (empty)](https://afyadepot.co.tz/product/cello-transparent-plastic-first-aid-box-empty), 1 — 35,000 (TZ)<br>[Heavy Duty Orange Plastic Container (empty)](https://afyadepot.co.tz/product/smart-first-aid-kit-bag-empty), 1 — 65,000 (TZ)<br>**[Aluminium First Aid Box (empty)](https://afyadepot.co.tz/product/first-aid-box), 1 — 80,000 (TZ)** ◆<br>[Medium Metal Wall Cabinet (empty)](https://afyadepot.co.tz/product/medium-metal-wall-cabinet-empty), 1 — 99,000 (TZ) | Silver Smart First Aid Container (empty), 1 |
| 2 | Crepe bandages | For sprains and to hold dressings. | **Guest house (about 10 rooms):** 2 bandages, first box only. *2 per first-aid box* (units 2)<br>**3-star hotel (about 40 rooms):** 4 bandages, first box only. *2 per first-aid box* (units 4) | **[Elastolite crepe bandage 7.5 cm](https://www.goodlife.co.ke/product/crepe-bandage-3in-7-5cm-elastolite/), 1 — 1,850 (KE, KES 91)** ◆<br>[Elastolite crepe bandage 10 cm](https://www.goodlife.co.ke/product/crepe-bandage-4in-10cm-elastolite/), 1 — 2,033 (KE, KES 100)<br>[Elastolite crepe bandage 15 cm](https://www.goodlife.co.ke/product/crepe-bandage-6in-15cm-elastolite/), 1 — 2,257 (KE, KES 111) | Elastolite crepe bandage 7.5 cm, 1 |
| 3 | Triangular bandages | Arm sling or large dressing. | **Guest house (about 10 rooms):** 2 bandages, first box only. *2 per first-aid box* (units 2)<br>**3-star hotel (about 40 rooms):** 4 bandages, first box only. *2 per first-aid box* (units 4) | **[Triangular bandage (arm sling)](https://portalpharmacy.ke/first-aid/band-aids-bandages/triangular-bandages), 1 — 3,049 (KE, KES 150)** ◆<br>[Qualicare triangular bandage, individually packed](https://portalpharmacy.ke/m-t-accessories/qualicare-triangular-bandages), 1 — 7,115 (KE, KES 350) | Triangular bandage (arm sling), 1 |
| 4 | First-aid scissors | To cut tape and dressings. | **Guest house (about 10 rooms):** 1 pairs, first box only. *1 per first-aid box* (units 1)<br>**3-star hotel (about 40 rooms):** 2 pairs, first box only. *1 per first-aid box* (units 2) | **[First-aid scissors](https://www.goodlife.co.ke/product/first-aid-scissors/), 1 — 4,168 (KE, KES 205)** ◆ | First-aid scissors, 1 |
| 5 | Emergency foil blanket | Keeps an injured guest warm while help comes. | **Guest house (about 10 rooms):** 1 blankets, first box only. *1 per first-aid box* (units 1)<br>**3-star hotel (about 40 rooms):** 2 blankets, first box only. *1 per first-aid box* (units 2) | **[Qualicare emergency foil blanket 140 × 204 cm](https://portalpharmacy.ke/qualicare-emergency-blanket), 1 — 17,281 (KE, KES 850)** ◆ | Qualicare emergency foil blanket 140 × 204 cm, 1 |
| 6 | First-aid record book | A record of each treatment (the old code cites the 2015 Rules; not opened here). | **Guest house (about 10 rooms):** 1 books, first box only. *1 per property* (units 1)<br>**3-star hotel (about 40 rooms):** 1 books, first box only. *1 per property* (units 1) | **[Kasuku A5 exercise book, 200 pages](https://www.carrefour.ke/mafken/en/local-notebook/kasuku-ex-book-single-line-200p-a5/p/2418), 1 — 1,118 (KE, KES 55)** ◆<br>[Office Point A5 hardcover book](https://www.carrefour.ke/mafken/en/local-notebook/op-exercise-book-sc02-col-a5/p/116611), 1 — 2,948 (KE, KES 145) | Kasuku A5 exercise book, 200 pages, 1 |
| 7 | Digital thermometer at reception | Confirms a guest’s fever, so the guest is sent for a malaria test promptly. | **Guest house (about 10 rooms):** 1 thermometers, first box only. *1 at reception* (units 1)<br>**3-star hotel (about 40 rooms):** 1 thermometers, first box only. *1 at reception* (units 1) | **[MT 810 digital stick thermometer](https://portalpharmacy.ke/microlife-mt810-digital-thermometer), 1 — 19,314 (KE, KES 950)** ◆<br>[UT-103 digital thermometer](https://portalpharmacy.ke/ad-medical-ut-103-digital-thermometer), 1 — 30,495 (KE, KES 1,500)<br>[Non-Contact Infrared Digital Thermometer](https://afyadepot.co.tz/product/infrared-thermometer), 1 — 75,000 (TZ) | MT 810 digital stick thermometer, 1 |

| Stage | Starter items (first box only) | Shelf value | Landed |
|---|---|---|---|
| Guest house (about 10 rooms) | First-aid box, marked “First Aid”, at the front desk 80,000; Crepe bandages 3,700; Triangular bandages 6,098; First-aid scissors 4,168; Emergency foil blanket 17,281; First-aid record book 1,118; Digital thermometer at reception 19,314 | 131,679 | 76,046 |
| 3-star hotel (about 40 rooms) | First-aid box, marked “First Aid”, at the front desk 160,000; Crepe bandages 7,400; Triangular bandages 12,196; First-aid scissors 8,336; Emergency foil blanket 34,562; First-aid record book 1,118; Digital thermometer at reception 19,314 | 242,926 | 137,627 |

The starter set is charged once at shelf price (no saving), in the first box, with no extra delivery. Its margin is its shelf value minus landed cost.

## 4. Taste of luxury

One premium and one luxury item, priced as their own line at shelf price, outside the saving (D4), rounded to the nearest 500.

| Tier | Item | Source | TSh |
|---|---|---|---|
| premium | Peaceful Sleep repellent at the bedside: Peaceful Sleep Insect Repellant, 100 ml | [Shoppers Supermarket](https://www.shoppers.co.tz/product-detail/602b6c0453c6d5732d0a36f3) (TZ) | 25,800 → 26,000 |
| luxury | Bath & Body Works 3-wick candle for the lobby: Bath & Body Works 3-wick scented candle, Berry Spritzer, 1 candle | [Jumia Kenya](https://www.jumia.co.ke/bath-body-works-berry-spritzer-3-wick-scented-candle-326152671.html) (KE, KES 4,700) | 95,551 → 95,500 |

Tier price per month, 12-month plan:

| Stage | Regular | Premium | Luxury |
|---|---|---|---|
| Guest house (about 10 rooms) | 252,500 | 278,500 | 348,000 |
| 3-star hotel (about 40 rooms) | 1,018,000 | 1,044,000 | 1,113,500 |

## 5. Services

| Key | What the member gets | Walk-in (planning) | Afya pays (70%) | Member fee each time (×1.25) | Times a year | Basis |
|---|---|---|---|---|---|---|
| `first-aid-box-check` | First-aid box check on delivery: The rider checks the front-desk first-aid box at each delivery and refills what was used. | — | — | 0 (store service) | 12 | Store service |
| `pest-control-visit` | Pest-control visit: Once a quarter a licensed pest-control company treats rooms and kitchen. | 80,000 | 56,000 | 70,000 | chakula 2, gh 4, h3 4 | model.js services.packs hotel (planning figure, no partner quote) |
| `first-aid-training-seat` | Accredited first-aid training seat: Staff trained and certified as first-aiders: one a year for the guest house, two for the hotel. | 50,000 | 35,000 | 44,000 | gh 1, h3 2, duka 1, chakula 1, saluni 1, karakana 1, ofisi 1 | model.js services.packs hotel add-on (planning figure, no partner quote) |

Partner prices are the financial model's planning figures (`model.js`), not quotes; they are marked EST until R7 adds partner quotes. Service keys are new and still have to be added to `data/services.json` (not edited here).

## 6. Price per month (D4)

Shelf value = default-brand goods, excluding medicines, starter items and the luxury line. Price = shelf × (1 − 3% / 6% / 9%), nearest 500, never above shelf. Packing and one delivery are included.

**Goods at shelf, default brands (TSh a month):**

| Item | Guest house (about 10 rooms) | 3-star hotel (about 40 rooms) | Cost class |
|---|---|---|---|
| Body wash for the shower dispenser | 28,750 | 113,850 | brand |
| Liquid hand soap for room basins and staff | 16,188 | 81,375 | brand |
| Alcohol hand sanitiser for reception, dining and rooms | 14,450 | 47,600 | brand |
| Toilet paper for rooms and staff toilets | 79,625 | 341,250 | brand |
| Bathroom bin liners | 32,511 | 129,261 | own |
| Room insect spray at turn-down | 6,500 | 26,500 | brand |
| Mosquito repellent for guests, on request at reception | 27,600 | 101,200 | brand |
| Treated mosquito net replacement | 2,800 | 11,100 | own |
| Bleach for toilets, basins and drains | 17,600 | 70,400 | brand |
| Floor and surface disinfectant for housekeeping | 6,307 | 25,228 | brand |
| Disposable gloves for housekeeping and first aid | 35,221 | 140,884 | own |
| Plasters for the front-desk first-aid box | 488 | 2,114 | pharm |
| Antiseptic liquid for the first-aid box | 1,300 | 5,200 | brand |
| Sterile gauze swabs for the first-aid box | 969 | 5,812 | pharm |
| Sterile non-adherent dressing for kitchen burns | 5,611 | 11,222 | pharm |
| Sanitary pads for guests on request and the staff toilet | 1,400 | 5,600 | brand |
| Oral rehydration salts for guests (partner pharmacy) (medicine, not priced) | — | — | pharmacy |
| **Shelf value per month** | **277,319** | **1,118,596** | |
| Goods at landed cost | 196,136 | 792,608 | |

**Member price per month:**

| Stage | Box | Shelf value per delivery | 1-month plan (−3%) | 6-month plan (−6%) | 12-month plan (−9%) | Buy once |
|---|---|---|---|---|---|---|
| Guest house (about 10 rooms) | L | 277,319 | **269,000** | **260,500** | **252,500** | 277,000 |
| 3-star hotel (about 40 rooms) | 3 × L | 1,118,596 | **1,085,000** | **1,051,500** | **1,018,000** | 1,118,500 |

Source coverage of the shelf value by status: Guest house (about 10 rooms): TZ 72%, KE 27%, EST 1%; 3-star hotel (about 40 rooms): TZ 73%, KE 26%, EST 1%.

## 7. Does the box pay its way?

**Check (D4):** price − goods at landed cost − packing − delivery (3,500) − 1% points ≥ 0. Landed cost uses R3's planning shares: brand 78%, pharm 72%, own 50%.

| Stage | Goods at landed cost | Packing + delivery | Margin, 1-month | Margin, 6-month | Margin, 12-month | Landed share now → share at which 12-month margin is 0 |
|---|---|---|---|---|---|---|
| Guest house (about 10 rooms) | 196,136 | 10,000 | +60,174 (22.4%) | +51,759 (19.9%) | +43,839 (17.4%) | 70.7% → 86.5% |
| 3-star hotel (about 40 rooms) | 792,608 | 23,000 | +258,542 (23.8%) | +225,377 (21.4%) | +192,212 (18.9%) | 70.9% → 88.0% |

**Plainly: yes.** Both sizes carry large goods values, so packing and delivery are small against the price. The 3-star hotel's goods are packed in three L boxes (19,500) and arrive in one delivery. The margin stays positive at landed shares up to 86.5% (guest house) and 88.0% (hotel).

**Per occupied room-night (12-month plan):** guest house 1,530, hotel 1,542.

Services margin a year (member fee − partner price): Guest house (about 10 rooms) 65,000; 3-star hotel (about 40 rooms) 74,000.

## 8. Images (places only, never faces)

- EN: A made guest-room bed under a white treated net, bedside table with repellent; no people<br>SW: Kitanda cha chumba cha wageni kilichotandikwa chini ya chandarua cheupe, meza ya kando yenye dawa ya mbu; bila watu
- EN: A hotel bathroom with wall dispensers for body wash and hand soap; no people<br>SW: Bafu la hoteli lenye vifaa vya ukutani vya sabuni ya kuogea na ya mikono; bila watu
- EN: A reception desk with a marked first-aid box and sanitiser stand; no people<br>SW: Meza ya mapokezi yenye sanduku la huduma ya kwanza lenye alama na kitakasa mikono; bila watu

## 9. Kiswahili for native review

- *usiku wa chumba chenye mgeni* for occupied room-night
- *vyumba kujaa* for occupancy
- *kifaa cha ukutani* for wall dispenser
- *kuandaa chumba jioni* for turn-down

## 10. Open items

1. Occupancy (55%), average stay and every per-room-night rate are labelled estimates; replace them with the hotel’s own figures at sign-up.
2. Open the NBS hotel statistics releases (nbs.go.tz was refused here) for a Dar es Salaam room-occupancy figure.
3. Treated net price is an estimate; a distributor quote is needed. This is why the box is not final.
4. Hotels buy many of these goods in bulk from wholesalers below supermarket shelf price. A trade price list is needed before selling to 3-star hotels.
5. Code follow-up (not done here): `part3c.js` `D.PKG.hotel` and `model.js` `services.packs` row `hotel` (box price 214,000) should take their figures from this JSON.

## 11. Sources

**Guidance and occupancy:**
- Tanzania NBS, Hotel Statistics releases 2024 (national bed occupancy 39.3% in April, 44.7% in January, 53.9% in June, 70.7% in December, 73.3% in July). SEARCH SNIPPETS ONLY: nbs.go.tz refused by this session’s network: https://www.nbs.go.tz/uploads/statistics/documents/en-1743078564-HOTEL%20Statistics%20Release_December,%202024.pdf (checked 2026-11-10)
- WHO fact sheet, Malaria (nets, repellents with DEET, IR3535 or icaridin, coils and vaporizers; ITNs and IRS as the two core vector controls): https://www.who.int/news-room/fact-sheets/detail/malaria (checked 2026-11-10)
- WHO fact sheet, Cholera (safe water, sanitation and hygiene essential; most cases treated with oral rehydration solution): https://www.who.int/news-room/fact-sheets/detail/cholera (checked 2026-11-10)
- WHO fact sheet, Drinking-water (about 505,000 diarrhoeal deaths a year from contaminated drinking water; household water treatment scheme): https://www.who.int/news-room/fact-sheets/detail/drinking-water (checked 2026-11-10)
- WHO 2009, Guidelines on hand hygiene in health care (alcohol hand rub): https://www.who.int/publications/i/item/9789241597906 (checked 2026-11-10)
- WHO fact sheet, Burns (first aid: cool running water about 20 minutes; clean non-adherent dressing): https://www.who.int/news-room/fact-sheets/detail/burns (checked 2026-11-10)
- Tanzania, Occupational Safety and Health (First Aid and Welfare Facilities) Rules 2015, GN 147. NOT OPENED (tanzlii.org refused by this session’s network); contents known from the old code’s citation and a search-result snippet only: https://tanzlii.org/en/akn/tz/act/gn/2015/147/eng@2015-04-03 (checked 2026-11-10)
- Tanzania, Occupational Health and Safety Act 2003 (Act No. 5): employer duty to provide protective equipment. NOT OPENED (host refused); cited from the old code: https://tanzlii.org/akn/tz/act/2003/5/eng@2003-04-05/source (checked 2026-11-10)

**Prices:** Shoppers Supermarket category crawl, 10 Nov 2026; AfyaDepot product pages (schema.org data), 10 Nov 2026; Kenyan rows from the code catalogue (2 Nov 2026). Every URL is in the JSON.

Working files: `/tmp/claude-0/-home-user-fa-market-lab/763e29dd-dd47-5b19-b730-923fee20ac28/scratchpad/r6d/` (`bin/spec_hoteli.js`, `bin/brands.js`, `bin/engine.js`, `bin/validate.js`).
