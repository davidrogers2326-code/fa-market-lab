# R8 — Businesses and hotels: monthly health and hygiene packages

Feeds sections 3.5 and 5.2. Built 10 Nov 2026 from the two package files, `data/boxes/afya-biashara.json` and `data/boxes/afya-hoteli.json`, and their research notes, `research/R6-afya-biashara.md` and `research/R6-afya-hoteli.md`. Prices follow brief D4 and `fx.md`. Draft for the founder; the showroom code and the brief are unchanged.

## In plain language

- Two packages make the business income line. **Afya Biashara** serves small businesses of about four staff, in five sizes: shop, restaurant, salon, workshop and small office. These are the old Afya Kazini trade kits (decision D-3). **Afya Hoteli** serves a guest house of about 10 rooms and a 3-star hotel of about 40 rooms. Larger offices are the Afya Kazini office box, researched separately.
- What they consume each month, at shelf value: from **52,054** (shop) to **135,992** (workshop) for small businesses; **277,319** for a guest house and **1,118,596** for a 3-star hotel.
- What they pay now, buying the same goods themselves in small lots, is an **estimate**: shelf price + 18% small-shop mark-up + 4 shop trips of TSh 2,000. Both figures are the financial model's planning assumptions, not observed. On that basis a member saves about a quarter on the 12-month plan.
- Package price per month on the 12-month plan: shop or kiosk **47,500**, restaurant or food stall **118,000**, salon or barbershop **102,000**, workshop or building site **124,000**, small office **50,500**, guest house (about 10 rooms) **252,500**, 3-star hotel (about 40 rooms) **1,018,000**. Packing and delivery are included. Partner services (first-aid training, fire-extinguisher service, pest control) are billed in the month they happen.
- **Every size pays its way.** The shop and small office are thin on 12 months; if supplier quotes push landed cost above about 77% of shelf, they move to delivery every two months.
- Hotel quantities are per occupied room-night at an **estimated 55% occupancy**. The 2024 national bed occupancy of 39–73% was seen in search results only.
- Biashara is **final** (every item has a sourced price; many first-aid lines are Kenyan). Hoteli is **not final**: the treated-net price is an estimate.
- Images use places only (shop counters, kitchens, salon chairs, workshop benches, hotel rooms and bathrooms), never faces.

## 1. What each business actually consumes a month

The quantity formulas are in the two R6 files, item by item. In summary:

| Who | Assumption | Biggest monthly lines (TSh, shelf) |
|---|---|---|
| Small business | 4 staff, 26 working days; quantities per staff, per wash, per client or per working day (planning estimates) | Shop or kiosk: toilet paper for staff 9,750, alcohol hand sanitiser 8,500, liquid hand soap for staff 7,438<br>Restaurant or food stall: liquid hand soap for staff 18,375, toilet paper for staff 13,000, paper towels for drying hands 12,600<br>Salon or barbershop: fresh razor blades, one per client 17,260, disposable gloves 17,077, toilet paper for staff 13,000<br>Workshop or building site: cut-resistant work gloves 32,447, foam ear plugs 25,453, liquid hand soap for staff 14,438<br>Small office: toilet paper for staff 13,000, alcohol hand sanitiser 8,500, liquid hand soap for staff 7,438 |
| Guest house | 10 rooms × 30 × 55% = 165 occupied room-nights; 5 staff | Guest house (about 10 rooms): toilet paper for rooms and staff toilets 79,625, disposable gloves for housekeeping and first aid 35,221, bathroom bin liners 32,511 |
| 3-star hotel | 40 rooms × 30 × 55% = 660 occupied room-nights; 30 staff | 3-star hotel (about 40 rooms): toilet paper for rooms and staff toilets 341,250, disposable gloves for housekeeping and first aid 140,884, bathroom bin liners 129,261 |

Rates per occupied room-night (estimates): body wash 15 ml, hand soap 5 ml (+200 ml per staff), sanitiser 2 ml (+500/1,500 ml for reception and dining), toilet paper 0.5 roll (+3 per staff), bin liner 0.5, room spray 4 ml, repellent 1 pack per 30, bleach 10 ml, disinfectant 10 ml, gloves 2. Treated nets are replaced at rooms ÷ 36 a month.

## 2. What they pay now, and the package price per size

| Size | What it consumes a month (shelf value of the same goods) | What it pays now, buying itself (estimate) | Afya price, 12-month plan | 6-month | 1-month | Saving vs buying itself (12-month) | Afya margin a month (12-month) |
|---|---|---|---|---|---|---|---|
| Shop or kiosk | 52,054 | 69,424 | **47,500** | 49,000 | 50,500 | 21,924 (32%) | +975 |
| Restaurant or food stall | 129,847 | 161,219 | **118,000** | 122,000 | 126,000 | 43,219 (27%) | +14,751 |
| Salon or barbershop | 112,184 | 140,377 | **102,000** | 105,500 | 109,000 | 38,377 (27%) | +11,201 |
| Workshop or building site | 135,992 | 168,471 | **124,000** | 128,000 | 132,000 | 44,471 (26%) | +11,163 |
| Small office | 55,304 | 73,259 | **50,500** | 52,000 | 53,500 | 22,759 (31%) | +1,410 |
| Guest house (about 10 rooms) | 277,319 | 335,237 | **252,500** | 260,500 | 269,000 | 82,737 (25%) | +43,839 |
| 3-star hotel (about 40 rooms) | 1,118,596 | 1,327,944 | **1,018,000** | 1,051,500 | 1,085,000 | 309,944 (23%) | +192,212 |

"What it pays now" = shelf value × 1.18 + 4 × 2,000. These are `model.js` `kazini` constants (`small_shop_markup`, `trip`, `trips`), **planning estimates, not observed**. A field check is needed: about 10 Kariakoo and Sinza businesses per trade, asked what they buy, where and at what price. Hotels often buy wholesale below supermarket shelf. For a 3-star hotel the saving shown is likely overstated, and the box must be priced from a trade list before it is offered.

Many small businesses do not buy the full OSH set at all today. As cited in the old code, the Rules' fines start at TSh 500,000; the Rules themselves were not opened here. For those businesses the package is a compliance purchase, not a saving.

## 3. Services, priced for three parties

| Size | Included services a year at walk-in (planning) | Afya member fees a year | Afya service margin a year | Starter set, once (shelf) |
|---|---|---|---|---|
| Shop or kiosk | 60,000 | 53,000 | 11,000 | 54,000 |
| Restaurant or food stall | 180,000 | 158,000 | 32,000 | 54,000 |
| Salon or barbershop | 60,000 | 53,000 | 11,000 | 54,000 |
| Workshop or building site | 60,000 | 53,000 | 11,000 | 79,000 |
| Small office | 60,000 | 53,000 | 11,000 | 54,000 |
| Guest house (about 10 rooms) | 370,000 | 324,000 | 65,000 | 131,500 |
| 3-star hotel (about 40 rooms) | 420,000 | 368,000 | 74,000 | 242,500 |

Fee rule (D4, R7): partner price = walk-in × 0.70 (nearest 500); member fee = partner price × 1.25 (nearest 500), charged in the month the service is delivered. Walk-in prices are `model.js` planning figures: first-aid seat 30,000 (hotels 50,000), extinguisher 30,000, pest control 60,000 (restaurants) and 80,000 (hotels). **No partner quotes yet.** The member pays less than walk-in, the partner gets prepaid, booked work, and Afya keeps the 25%.

## 4. As an income line

| Size | Goods margin a year (12-month plan) | Service margin a year | Total a year per account |
|---|---|---|---|
| Shop or kiosk | 11,703 | 11,000 | **22,703** |
| Restaurant or food stall | 177,018 | 32,000 | **209,018** |
| Salon or barbershop | 134,414 | 11,000 | **145,414** |
| Workshop or building site | 133,951 | 11,000 | **144,951** |
| Small office | 16,923 | 11,000 | **27,923** |
| Guest house (about 10 rooms) | 526,069 | 65,000 | **591,069** |
| 3-star hotel (about 40 rooms) | 2,306,548 | 74,000 | **2,380,548** |

Example: 40 Biashara accounts by month 12 (the `model.js` `accounts_m12` planning figure), at the trade mix in `model.js` (duka 35%, chakula 30%, saluni 20%, karakana 10%, ofisi 5%), give about **4,625,019 a year** of goods and service margin. That assumes everyone on the 12-month plan, before the store's fixed costs. One 3-star hotel account is worth about as much as 22 average small-business accounts.

## 5. Images (places only, never faces)

| Package | Image briefs (EN / SW) |
|---|---|
| Afya Biashara | A small Dar es Salaam shop counter at opening time with a wall-mounted first-aid box and sanitiser; no people / Kaunta ya duka dogo la Dar es Salaam wakati wa kufungua, sanduku la huduma ya kwanza ukutani na kitakasa mikono; bila watu<br>A clean food-stall kitchen with hand-wash station and steel counters; no people / Jiko safi la mama lishe lenye sehemu ya kunawa mikono na kaunta za chuma; bila watu<br>A barbershop chair and tool tray beside a sharps box; no people / Kiti cha kinyozi na trei ya vifaa kando ya kisanduku cha viwembe; bila watu<br>A workshop bench with goggles and ear plugs on a hook; no people / Meza ya karakana yenye miwani ya usalama na vizibo vya masikio kwenye kiango; bila watu |
| Afya Hoteli | A made guest-room bed under a white treated net, bedside table with repellent; no people / Kitanda cha chumba cha wageni kilichotandikwa chini ya chandarua cheupe, meza ya kando yenye dawa ya mbu; bila watu<br>A hotel bathroom with wall dispensers for body wash and hand soap; no people / Bafu la hoteli lenye vifaa vya ukutani vya sabuni ya kuogea na ya mikono; bila watu<br>A reception desk with a marked first-aid box and sanitiser stand; no people / Meza ya mapokezi yenye sanduku la huduma ya kwanza lenye alama na kitakasa mikono; bila watu |

## 6. Open items

1. **OSH Rules 2015 (GN 147):** open the text and its First Schedule (tanzlii.org was refused here) and match the first-aid box item by item.
2. **NBS hotel statistics:** open them (nbs.go.tz was refused here) for a Dar es Salaam room-occupancy figure. Replace 55% with each hotel's own figure at sign-up.
3. **"What they pay now":** a field survey per trade and a hotel trade price list. The 18% mark-up and the 4 trips are estimates.
4. **Supplier quotes for first-aid consumables:** plasters, gauze, gloves and dressings have Kenyan prices only. Also a treated-net quote.
5. **Partner quotes:** first-aid training, extinguisher service and pest control (R7). Add the new service keys to `data/services.json`.
6. **Code follow-up (not done here):** `model.js` `kazini` (card name, `KZ35` kit prices 67,500–100,000, `core` list) and `services.packs` row `hotel` (214,000), and `part3c.js` `D.PKG.kz` and `D.PKG.hotel`, should take their figures from the two JSON files.

## 7. Sources

See sections 11 of `R6-afya-biashara.md` and `R6-afya-hoteli.md`; every price URL is in the two JSON files. Occupancy: NBS hotel statistics releases 2024 (search snippets only), e.g. https://www.nbs.go.tz/uploads/statistics/documents/en-1743078564-HOTEL%20Statistics%20Release_December,%202024.pdf.
