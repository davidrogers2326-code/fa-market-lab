# R3 — Pricing benchmark and churn defence

Feeds sections 3.5, 6.1, 6.2 and 5.3. Prices checked 9 Nov 2026. Draft for the founder; nothing here changes the showroom code or the brief.

## In plain language

- AfyaDepot publishes real prices for 20 of the 61 Mama na Mtoto items: either the same product as the box, or the same brand in another pack size. It has a different brand for 8 more items and nothing for 33.
- Nappies are 43–52% of the value of every baby box. On AfyaDepot the same Softcare packs cost 16–21% more than the shelf prices the showroom uses today. Huggies size-4 pants cost 30% less.
- All 13 prices the showroom already takes from AfyaDepot are unchanged on 9 Nov 2026.
- The brief says AfyaDepot gives free delivery above TZS 250,000. The live site says free delivery on pharmacy orders above 150K in Dar. Same-day delivery appears only in search results; the page that stated it has been removed (it now returns 404).
- Today's engine adds packing and delivery (TSh 10,000) on top of a 3/6/9% saving. As a result, the box costs more than its shelf value on every 1-month plan and on most 6-month plans. Only the 12-month plan passes the brief's test for most baby stages.
- The old "13/16/20% below shelf" cannot be funded. At a 78% landed cost, a 20% saving leaves almost nothing after delivery, and in most stages less than nothing.
- Recommended rule: **members pay 3% / 6% / 9% less than the shelf price of what is inside (1 / 6 / 12-month plans), with packing and doorstep delivery included.** Included partner services are added as a separate line. This rule passes the test by construction.
- Under this rule the baby boxes still earn a margin (7–21% gross on planning costs). The monthly pregnancy box loses money because delivery is too large a share of a TSh 22–44k basket. Delivering it once per trimester fixes that.
- Coverage is too low to say the box beats *market* prices in general. It does beat AfyaDepot on the lines covered: nappies and wipes, 51–57% of box value in four of the five baby stages.
- Still missing: the second benchmark (Shoppers is recommended, but its host is blocked here), the Kariakoo calls (founder action), real landed costs, and partner service quotes.

---

## 1. AfyaDepot benchmark

**Method.** AfyaDepot (afyadepot.co.tz) is a Next.js front end on a WooCommerce back end. Its robots.txt disallows `/api`, so no API was called. The sitemap (`/sitemap.xml`, lastmod 9 Nov 2026) lists 1,239 product pages. The schema.org Product data (name, price, currency, availability) was read from every one of them. Variant prices and pack labels for 45 relevant pages were read from the page data embedded in the HTML. Matching to the pilot list was done by product name, not by URL. Working files: `/tmp/claude-0/-home-user-fa-market-lab/763e29dd-dd47-5b19-b730-923fee20ac28/scratchpad/r3/` (`catalog.json`, `matched.tsv`, `obs.json`, `test.json`).

**Working list.** The list comes from `showroom/sections/part3c.js` `D.PKG.preg` and `D.PKG.mama`, run in a Node sandbox. It has 61 item keys (23 pregnancy, 38 baby) and 209 distinct products, which matches audit 06 §3.

### 1a. The brief's "already found" item

| Claim in brief (R3) | What the site shows on 9 Nov 2026 | Status |
|---|---|---|
| Softcare diapers TSh 6,000–26,000 | Softcare variants are priced 6,000 / 14,000 / 17,000 / 24,000 / 26,000. The lowest is the "No. 1 -14’s" pack; the highest are the "No. 1 -80’s" and "No. 2-72’s" packs. [S/M page](https://afyadepot.co.tz/product/softcare-premium-soft-diapers-for-3-6-kg-s-no-1) | **Confirmed.** Pack labels on the page conflict: the title says "Pack of 40" at 6,000, while the variant data says 14. |
| Same-day delivery in Dar | Not stated on any page opened. A web search snippet quotes a "Delivery & Return Policy" page: "1 – 3 Hours (After Order Confirmation)" in Dar, 4:00 PM cut-off, "last updated October 2025". That page (`/delivery-return-policy`) now returns 404. | **Not confirmed** (search snippet, page not opened) |
| Free delivery above TZS 250,000 | Home page banner: "Free delivery on **150K+ Pharmacy** orders in Dar · Discount auto-applied at checkout". The search snippet also shows "Free Delivery for Orders >150k Sh. in Dar. [See>Fees]". 250,000 appears only in a search engine's summary. | **Changed: use 150,000.** The brief's 250,000 should be corrected. |
| Delivery fee below the threshold | 5,500 TZS for the core central zones and 9,000 TZS for midtown/northern zones. | Search snippet, page not opened (page now 404) |

### 1b. Shelf prices for Mama na Mtoto items

All 51 observations are in `data/prices.json`. **Match** means:
- *same*: same product, same pack as the code;
- *same line*: same brand and line, other pack;
- *alt*: a different brand for the same job.

"Code price" is what `part3c.js` uses today (TZ = Tanzanian retailer, 2 Nov 2026; KE = Kenyan price × 20, 2 Nov 2026). For KE rows, the KES original and the BoT rate from `research/fx.md` are shown.

| Item (key) | AfyaDepot product, exactly as listed | Pack | TSh | Match | Code price today |
|---|---|---|---|---|---|
| Nappies S (mama:diap, preg:nbd) | Softcare Premium Soft Baby Diapers (Small, 3-6kg) — variant "No. 1 -80’s Pack" | 80 | 26,000 | same | 21,450 TZ (superstore.co.tz). AfyaDepot +21% |
| | same page — "No. 1 -48’s Pack" | 48 | 17,000 | same line | |
| | same page — "No. 1 -14’s Pack" | 14 | 6,000 | same line | |
| Nappies M (mama:diap) | same page — "Softcare Premium Soft Diapers for 6–9 kg (M) \| No. 2-42’s Pack" | 42 | 17,000 | same | 14,700 TZ. AfyaDepot +16% |
| | same page — "No. 2-72’s Pack" | 72 | 26,000 | same line | |
| Pants M (mama:diap) | Softcare Baby Pants Pull-Up Diapers (Medium, 6-9kg) — "No. 2-32’s" / "No. 2-42’s" | 32 / 42 | 14,000 / 24,000 | alt | not in code |
| Pants L (mama:diap, stage e) | Softcare Baby Pants Pull-Up Diapers (Large, 9-15kg) — "No. 3-40’s" / "No. 3-10’s" | 40 / 10 | 24,000 / 6,000 | same line | 11,400 for 30 TZ (380 each, vs 600 each) |
| Huggies pants 4 (mama:diap C/L) | Huggies Paints — "No: 4 (9-14Kg), 32Pants" | 32 | 22,000 | same | 31,500 TZ. AfyaDepot −30% |
| Huggies pants 3 | Huggies Paints — "No:3 (6-9Kg),40Pants" | 40 | 22,000 | alt | — |
| Huggies newborn | Huggies Newborn Diapers — "Size 1 (3.6–6.4 kg) - 31's" (Size 2, 32's, same price) | 31 | 42,000 | same line | 25,000 for 26 TZ (962 each, vs 1,355 each) |
| Huggies Gold | Huggies Gold Ultra-Absorbent Baby Diapers - 1 Pack of 50 Diapers | 50, size not stated | 35,000 | alt | — |
| Value nappy | Sleepy Soft Baby Diapers (Assorted Sizes) — "Sleepy Sensitive Diapers No; 3 Midi 4-9 kg - 48's" | 48 | 15,200 | alt | — (TSh 317 each, the cheapest seen; No.1 72's out of stock) |
| Wipes (mama:wip) | Angels Ultra Compact Baby Wet Wipes - 1 Pack of 120 Wipes | 120 | 6,000 | same | 6,000 ✓ |
| | MomEasy Gentle Baby Wet Wipes - 1 Pack of 80 Wipes | 80 | 4,500 | same | 4,500 ✓ |
| | Momo Ultra Compact Baby Wet Wipes - 1 Pack of 120 Wipes · Ultra Compact Sensitive Baby Wet Wipes - 1 Pack of 120 Wipes | 120 | 6,000 · 8,500 | alt | — |
| Barrier (mama:bar) | Zincast Gel - pack (225g) | 225 g | 25,000 | same | 25,000 ✓ |
| | Antiseptic Healing Cream (Sudocrem) — "250grams" | 250 g | 28,000 | same | 59,000 KE = KES 2,950 × 20 (code, 2 Nov). At BoT mean KES 20.33 (10 Nov 2026) = 59,974. AfyaDepot −53% |
| Milk bags (mama:milk) | MomEasy Breast Milk Storage Bags - 1 Pack of 25 Bags | 25 | 6,490 | alt | CMbear 30 bags 15,000 TZ |
| Thermometer (mama:therm) | Non-Contact Infrared Digital Thermometer - 1 Unit | 1 | 75,000 | alt | IR row 63,000 TZ |
| Teether (mama:teeth1) | MomEasy Baby Fresh Food Feeder & Teether - 1 Unit | 1 | 5,800 | same | 5,800 ✓ |
| First foods (mama:feed) | MomEasy Comprehensive Baby Weaning & Feeding Set - 1 Kit | 1 | 29,661 (site shows 29,661.01695) | alt | separate pieces |
| Delivery kit (preg:dkit) | MamaSave Delivery Kit — "💙 Standards" / "💛 Care" / "❤️ Plus" | 1 | 25,000 / 28,000 / 35,000 | same | 25,000 ✓ |
| Lip balm | Nivea Shea Butter Lip Balm - 4.8g Stick | 4.8 g | 10,000 | same | 10,000 ✓ |
| Intimate wash | Vivasol Daily Intimate V Wash - 100ml Bottle | 100 ml | 15,000 | alt | Beauty Formulas 250 ml 17,900 KE (KES 895 × 20; at 20.33 = 18,195) |
| Repellent | No-Bite Mosquito Repellent Spray - 120ml Bottle | 120 ml | 15,000 | same | 10,600 TZ (shoppers.co.tz). AfyaDepot +42% |
| | No-Bite Mosquito Repellent Roll-On - 45ml Bottle | 45 ml | 9,000 | alt | Odomos 50 g 4,600 TZ |
| Hand soap | Protex Herbal Antibacterial Soap - 90g Bar · Protex Deep Clean Antibacterial Soap - 100g Bar | 90 g · 100 g | 4,500 · 4,500 | same line · alt | Protex Herbal 150 g 6,000 KE (KES 300 × 20; at 20.33 = 6,099) |
| Child toothpaste (mama:teeth) | Colgate Kids Toothpaste 0-2 years | 50 ml (from page address) | 5,000 | same | 4,400 KE (KES 220 × 20; at 20.33 = 4,473) |
| Toothpaste/brush (preg:tpm) | Double Action Activated Charcoal Toothbrush (Medium) - 1 Unit · Colgate Natural Extracts Toothpaste - 75ml · Darbur Red Toothpaste with Brush — "100g" | 1 · 75 ml · 100 g | 2,000 · 8,500 · 5,000 | alt | Whitedent 1,550 + 350 TZ |
| Calcium (preg:calc) | Vitabiotics Osteocare Chewable Calcium Tablets - 1 Pack of 30 Tablets | 30 | 30,000 | same | 30,000 ✓ |
| | Calcivita tablets -50's · Maxcal Calcium & Vitamin D3 Capsules - 1 Bottle of 30 Capsules | 50 · 30 | 19,500 · 24,000 | alt | — |
| Pads (mpad, pads) | Human Cherish HC Pads — "Kubwa - 338mm" (also "Ndogo - 290mm") | 10 (page address only) | 5,000 | same line | night pads 338 mm, 8 for 3,800 TZ |
| Body lotion (blot, skin) | Bodidoc Deep Hydrating Tissue Oil Lotion - 400ml Bottle | 400 ml | 15,000 | alt | Vaseline Cocoa Glow 400 ml 14,600 TZ |
| **Medicines (partner pharmacy only, outside the box price)** | Ferrolic LF tablets - 10's · Ranferon Antianemia Iron & Folic Acid - 1 Strip of 10 Capsules · Folron Iron & Folic Acid Blood Building Capsules - 1 Strip of 10 Capsules · Hemovit Iron with folic acid tablets · IYFE ORS Sachhets-1's · PedZinc tablets -10's · Avaprozinc Probiotic & Zinc ORS Solution (Orange) - 1 Box of 10 Sachets | 10 · 10 · 10 · not stated · 1 · 10 · 10 | 1,000 · 300 · 12,000 · 5,500 · 500 · 1,000 · 2,500 | same (Hemovit alt) | all match the code ✓ |

**Not found on AfyaDepot** (none of its 1,239 products in the 9 Nov 2026 sitemap). These 33 item keys cover:
- preg: ginger tea, treated net, water treatment, body wash/bar, uji, panty liners, maternity belt, maternity briefs, bodysuits, nipple cream, signature scent, monthly gift;
- mama: cloth nappies, disposal bags, cotton wool, baby wash, laundry powder and laundry bar, water treatment, bodysuits, towel and grooming set, toy, treated nets (3 keys), breast pads, breast pump, body bar for mum, uji, muslin cloths, gift, plasters, potty.

AfyaDepot is a pharmacy and health shop. It does not carry the household and baby-clothing half of the box, which is why a supermarket benchmark is needed.

**Coverage:**
- Items: 20 of 61 have a same-product or same-line AfyaDepot price; 28 of 61 have any AfyaDepot price.
- Products: 24 of the 209 pilot products have a same-product or same-line AfyaDepot price.

---

## 2. Second benchmark (Part J item 4)

**Recommendation: Shoppers Supermarket, www.shoppers.co.tz.** Reasons:
1. **It already publishes per-product prices, with per-product URLs.** The showroom's 2 Nov pass took 26 pilot prices from `shoppers.co.tz/product-detail/...` pages (audit 06 §3). Examples: Odomos roll-on, No-Bite spray, Peaceful Sleep, Dettol soap 175 g.
2. **It covers the half AfyaDepot lacks:** soap, body care, repellents and household goods.
3. **It is a Dar chain with several branches.** Web results place Shoppers at Masaki (Haile Selassie Rd), Mikocheni and Mbezi Beach. These are informal sources (travel listings and a 2015 JETRO retail survey) and should be confirmed.
4. **The same products can be compared directly.** No-Bite spray 120 ml is 10,600 on Shoppers (2 Nov, code) and 15,000 on AfyaDepot (9 Nov).

**Reserve: superstore.co.tz.** It is the source of 10 pilot prices, including the Softcare tape nappies and Biox hand soap. Web search could not confirm who runs it or whether it is a Dar chain; one directory result is a Zanzibar "Fumba Superstore". Use it only after confirming its identity.

**Not usable from search:** no current online price list was found for Shoprite TZ, Village Supermarket, Game or Carrefour Tanzania. Piki, GengeXpress, duka.direct and Inalipa are delivery apps, not chains with web price pages.

**Collected: nothing.** shoppers.co.tz and superstore.co.tz were both refused by this session's network proxy on 9 Nov 2026. No prices were guessed.

**Host to allow:** `www.shoppers.co.tz` (and `shoppers.co.tz`). Reserve: `superstore.co.tz`.

---

## 3. Kariakoo wholesale — call script and log (founder action)

Make two calls per item group, to two different wholesalers, and log each call. Ask for the carton (case) price and the unit price.

**Opening (Kiswahili or English, one language per call):**
"Good morning. I am opening a health-essentials shop in Dar es Salaam and want a monthly supply. Could I get your wholesale price for a few items?"

**Items, in priority order (by share of box value):**

| # | Item | Pack to ask for | Carton / bale | Why |
|---|---|---|---|---|
| 1 | Softcare Premium Soft diapers S (3–6 kg), M (6–9 kg), L (9–15 kg) | 80, 42/72, 40 | bale | ~50% of every baby box |
| 2 | Softcare Baby Pants L (9–15 kg) | 30 or 40 | bale | stage e |
| 3 | Sleepy Sensitive diapers No.1 and No.3 | 72, 48 | bale | value brand (AfyaDepot 317/pc) |
| 4 | Angels Ultra Compact wipes | 120 | carton | monthly |
| 5 | Sunlight washing powder; Omo | 1 kg | carton | not on AfyaDepot |
| 6 | Velvex cotton wool | 400 g | carton | not on AfyaDepot |
| 7 | Pedal-bin liners / nappy bags | 30 bags | carton | not on AfyaDepot |
| 8 | Vaseline Blue Seal petroleum jelly; Vaseline Cocoa Glow lotion | 100 ml; 400 ml | carton | |
| 9 | Johnson's Baby soap; Dove cream bar | 100 g | carton | |
| 10 | Biox liquid hand soap; Dettol Original soap | 500 ml; 100 g | carton | |
| 11 | Odomos roll-on; No-Bite spray | 50 g; 120 ml | carton | |
| 12 | Softcare Long sanitary pads; Human Cherish 338 mm pads; Kotex liners | 10; 8–10; 40 | carton | |
| 13 | Whitedent toothpaste + brush; Colgate Kids 50 ml | 80 g; 50 ml | carton | |

**Questions for each item:**
1. Price per carton and number of units in the carton.
2. Price per single pack if we buy fewer than a carton.
3. Minimum order, and the price at about 50 and about 200 member boxes a month (stage b needs 240 nappies per box).
4. Do you issue an EFD/TRA receipt? Is VAT included?
5. Is the stock imported by an authorised distributor? Expiry date on current stock? Batch numbers on the carton?
6. Delivery to our shop: cost, and same day or next day?
7. Payment: cash, M-Pesa/Tigo Pesa/Airtel Money, credit days?
8. How long is this price valid? When did it last change?

**Log template (one row per item per call):**

| Date | Time | Wholesaler (shop name, street) | Contact role (owner / sales / cashier) | Phone | Call no. (1 or 2) | Item | Brand | Pack | Units per carton | Price per carton (TSh) | Price per unit (TSh) | MOQ | EFD receipt Y/N | VAT incl. Y/N | Delivery cost | Price valid until | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| | | | | | | | | | | | | | | | | | |

Record it in `data/prices.json` with `source:"kariakoo-call"`, `url:null`, and a note naming the wholesaler, contact role and call number. Never record a price you were not actually quoted.

---

## 4. The D4 conflict (3/6/9% versus 13/16/20%)

### 4a. Two mechanisms in the code

**Rendered engine, `part3c.js:529–560` (`window.AFYAMB`, section 3.5):**
- `PLAN={0:0,1:.03,6:.06,12:.09}`: the plan saving is 0% for buy-once, then 3/6/9% for 1/6/12 months, applied to the goods only.
- `PDBY`: packing and delivery are added **on top**, at cost: S 7,000 · M 8,500 · L 10,000 (box 3,500/5,000/6,500 + delivery 3,500). Mama is L (10,000); pregnancy is S (7,000).
- `box = r500(goods + pd)` with `r500 = Math.ceil(v/500)*500`, so it **rounds up**.
- `TADJ.L = .10`: Luxury adds 10% back for curation and the gift box.
- Points: 1% of the box (`PTS=.01`) on every plan. There is no service-fee term; partner services are priced separately at partner price × 1.25 (`HUD`).

**Old engine, `part3b.js:531–540, 877–885` (`window.AFYABOX`, still used in 3.4):**
- `disc = BASE + PLD[plan]` with `BASE=.08`, `PLD={1:0,3:.05,6:.08,12:.12}`, which gives **8 / 13 / 16 / 20%** for 1/3/6/12 months (Try/Silver/Gold/Platinum).
- `price = r500(val*(1-disc) + fee + pd)` with `pd` = box by size + 3,500. Here `r500` is `Math.round`, which is nearest 500.
- The comment on line 531 still says "3%, 6% or 9%". The perk text (`PL`, 537–540) says "8% / 13% / 16% / 20% below shelf price".

So "3/6/9" and "13/16/20" are two different discount tables. Neither one states what the member actually pays relative to shelf, because both add packing and delivery after the discount.

### 4b. One example box under each

**Example box:** Mama na Mtoto, stage b (2–6 months), Essential, default brands.
- Core shelf value S = **TSh 161,770** a month, computed by the code (`AFYAMB.stage`, 12-month, recurring month) without "This month’s gift" (10,000).
- Medicines: none in this month. Packing + delivery: 10,000.
- Landed cost of goods: 117,101 (planning shares 78/72/50%, `part3c.js:11`, not yet supplier quotes).
- S mixes TZ and KE-converted rows (KES × 20, 2 Nov).

| Mechanism | Buy once | 1 month | 3 months | 6 months | 12 months |
|---|---|---|---|---|---|
| Old: 8/13/16/20% + 10,000, nearest 500 | — | 159,000 (gross margin 19.1%) | 150,500 | 146,000 | 139,500 (7.9%) |
| Current: 3/6/9% + 10,000, rounded up | 172,000 | 167,000 (22.9%) | — | 162,500 | 157,500 (18.3%) |
| **Recommended: 3/6/9% off shelf, packing + delivery included, nearest 500** | ≤ 161,500 | **157,000** (18.0%) | — | **152,000** (15.4%) | **147,000** (12.5%) |
| Shelf value of the same goods | 161,770 | 161,770 | 161,770 | 161,770 | 161,770 |

- Gross margin here = price − goods at landed cost − packing and delivery − 1% points.
- As displayed today (gift included, S = 171,770), the current engine gives 182,000 / 177,000 / 171,500 / 166,500, which matches audit 06 §4.
- The old 20% applied with delivery included would leave 1,104 a month in stage b, and a loss in stages c, d and e.

### 4c. Recommendation: one headline, and how it is made up

**Headline: "Members pay 3% less than the shelf price on a monthly plan, 6% less on 6 months and 9% less on 12 months. Packing and doorstep delivery are included."**

1. **The saving is measured against the final price.** It is the only figure that is true of what the member pays, and it meets the R3 condition (member price ≤ shelf) by construction.
2. **B18 is kept.** Packing and delivery (S 7,000 · M 8,500 · L 10,000, at landed cost) are a cost line *inside* the price. The breakdown shows them as "included: TSh 10,000", not as an extra. Every expense is recovered through the price. The engine must check that margin stays positive (rule 5).
3. **B19 is kept.** Included partner services are a separate line added after the core price, at partner price × 1.25. Extra services are booked as add-ons, and the partner pays Afya a commission. Store and public-reminder services cost the member nothing extra.
4. **Retire** the 8% base, the 13/16/20% table, the 3-month Silver plan (not in the brief) and the Luxury +10% "negative saving". Luxury curation and the gift box become a priced "taste of luxury" line outside the core.
5. **Minimum box rule.** A plan is offered by home delivery only if core goods at landed cost + packing + delivery + points ≤ price. In practice the core shelf value must be at least about TSh 77k (L box) or 54k (S box) on the 12-month plan.
   - Monthly pregnancy boxes (22–44k) fall below this.
   - The pregnancy box is therefore **delivered once per trimester** (one box carrying 3 months of goods), or collected in store with no delivery charge.
   - Trimester delivery gives a 12-month gross margin of 2.2% (t1), 8.1% (t2) and 9.3% (t3), against −20.6% / −5.3% / −2.4% if delivered monthly.

**Corrected D4 formula (change it once, in the brief's D4):**
```
Core price  = shelf value of the box goods × (1 − member saving by plan: 3% / 6% / 9%)
              → rounded to the nearest 500, never above the shelf value
              (packing at landed cost of the box size S 3,500 · M 5,000 · L 6,500
               and delivery 3,500 are INCLUDED in this price, not added)
Service fee = Σ included partner services at partner price × 1.25, each rounded to the nearest 500,
              charged in the month the service is delivered (store and public services: 0)
Price per box = Core price + Service fee
Check: Core price − goods at landed cost − packing − delivery − points ≥ 0;
       if not, the box is delivered less often (e.g. once per trimester) or collected in store.
Excluded from shelf value and from the saving: medicines (sold by the partner pharmacy),
and the "taste of luxury" item, which is priced as its own line.
Plans: 1-month, 6-month, 12-month (+ buy once at shelf price).
```

**Service-fee example** (planning figures, no partner quote yet, R7): stage a with both midwife home visits included = 2 × r500(40,000 × 1.25) = 100,000. The stage a price on 12 months would be 152,500 + 100,000 = 252,500 for that month.

### 4d. Rounding and other code notes

- **Rounding.** `part3c.js:535` rounds **up** (`Math.ceil`). `part3b.js:877` and `model.js:106` round to the **nearest** 500, as D4 says. Rounding up adds about TSh 250 per box on average and pushes 6-month mama stage a to 168,000 instead of 167,500. Use nearest 500, with one exception: if rounding would take the price above the shelf value, round down.
- **Missing service-fee term.** D4 has "+ service fee" but `part3c` has no such term. `part3b` adds `r.fee` inside `r500(...)`. The formula above defines the term.
- **`model.js:15` and `avg_box`.** `model.js:15` (`m6:0.969, m12:0.938`) and the `avg_box 80500` comment ("8% member discount, 0–12% plan discounts") must be rebuilt from this one formula (K4).
- **FX rate.** The code's KE conversion is KES × 20; `fx.md` says 20.33 (BoT mean, 10 Nov 2026). Every KE-converted shelf value in the code is about 1.6% low. This does not change any pass or fail below.

---

## 5. The model condition test

**Test:** member price ≤ sum of shelf prices of the core box. The core box excludes the "taste of luxury" item (monthly gift, signature scent), medicines (partner pharmacy) and services. The box is Mama na Mtoto Essential, recurring month, default brands.
- Column A uses the code's shelf prices (TZ and KE mixed).
- Column B swaps in AfyaDepot unit prices wherever AfyaDepot has the same product or the same line.

| Stage | Core lines | Lines priced on AfyaDepot | Share of value | A: shelf (code) | B: shelf with AfyaDepot | Current engine 1 / 6 / 12 m vs A | Recommended 1 / 6 / 12 m |
|---|---|---|---|---|---|---|---|
| mama a (month 1) | 13 | 2 (nappies, wipes) | 53% | 167,798 | 184,860 | 173,000 ✗ / 167,500 ✓ / 162,500 ✓ | 163,000 / 157,500 / 152,500 ✓ |
| mama b (2–6) | 16 | 2 | 57% | 161,770 | 174,913 | 167,000 ✗ / 162,000 ✗ / 157,000 ✓ | 157,000 / 152,000 / 147,000 ✓ |
| mama c (7–12) | 15 | 2 | 57% | 149,803 | 161,503 | 155,500 ✗ / 151,000 ✗ / 146,500 ✓ | 145,500 / 141,000 / 136,500 ✓ |
| mama d (13–24) | 15 | 1 (wipes) | 9% | 136,973 | 137,173 | 143,000 ✗ / 139,000 ✗ / 134,500 ✓ | 133,000 / 129,000 / 124,500 ✓ |
| mama e (25–36) | 14 | 2 | 51% | 106,003 | 132,603 | 113,000 ✗ / 109,500 ✗ / 106,500 ✗ | 103,000 / 99,500 / 96,500 ✓ |
| preg t1, t2, t3 | 7 / 9 / 9 | 0 | 0% | 22,453 / 39,814 / 43,996 | same | fails on every plan | passes, but loses money if delivered monthly (see 4c) |

The current-engine column is shown at nearest-500 rounding; with the code's round-up, the results are the same or worse.

**Findings:**
- **Current engine.** Only the 12-month plan passes, and only in stages a–d. The 1-month plan always fails, because the 3% saving (about 4,900 on a 162k box) is smaller than the 10,000 packing and delivery. Break-even core value is 333,333 (1-month) and 166,667 (6-month) for an L box.
- **Against AfyaDepot.** On the covered lines AfyaDepot is dearer than the code's shelf, mainly because Softcare nappies cost 16–21% more. So column B is higher than A, and the box beats AfyaDepot more easily. With AfyaDepot prices, the current engine passes on 6 and 12 months in stages a–b and on 12 months in every baby stage.
- **Recommended rule.** It passes on every plan and stage by construction. On planning costs, the 12-month gross margin is:

  | Stage | a | b | c | d | e |
  |---|---|---|---|---|---|
  | 12-month gross margin | 15.2% | 12.5% | 10.7% | 9.3% | 6.9% |

  Stage e is thin because the code's Softcare pants price (380 each, superstore.co.tz) is low. AfyaDepot sells the same line at 600 each.

**Can we conclude?** Partly.
- *Proven:* for the lines AfyaDepot covers (nappies and wipes, about half the baby box by value), the member price under the recommended rule is below both the code's shelf and AfyaDepot's shelf.
- *Not proven:* the other 41–49% of the value (laundry, soap, cotton wool, bin bags, toys, body care) has no Tanzanian online check on 9 Nov. Stage d's tape nappies (Softcare Large) and the whole pregnancy box are 0–9% covered.
- *Next:* these must come from the Shoppers benchmark and the Kariakoo calls before the 3.5 tables say "below shelf price" as a market claim.
- *Already a valid claim:* "below *Afya's own* shelf price", which is what D4 defines, holds for every plan under the recommended rule.

---

## 6. Plan perks: consistency check

| Perk | Where stated | What the rendered 3.5 engine does | Verdict |
|---|---|---|---|
| Afya Points ×1.5 (6 months), ×2 (12 months) | `part3b.js:539–540` only (old engine, Gold/Platinum) | `part3c.js:534` `PTS=.01`: a flat 1% on every plan, with no multiplier. Copy: "1% of every box returns to the member as points" (`part3c.js:4156`, 699) | **Flag:** not in 3.5. If kept, ×2 on 12 months costs another 1% of the box (stage b: about 1,470 a month) and must be in the margin. |
| Pause 1 month (3-month plan), pause 2 months (12-month plan) | `part3b.js:538, 540` | No pause logic in part3c. `sw-dict.js` copy mentions a "one-month pause" as a win-back offer | **Flag:** the 3-month plan does not exist in D4. Recommend 1 pause month on 6 months and 2 on 12 months, stated in 3.4/3.5. |
| Priority WhatsApp line (12 months) | `part3b.js:540` | Not in part3c | **Flag:** keep it. It costs little and it is a retention lever. |
| "8/13/16/20% below shelf" | `part3b.js:537–540` | 3/6/9% | **Remove** (section 4c) |
| Devices free, starter items 15% / 50% off | `part3b.js:537–540, 887` | Not in part3c | **Flag:** needs a cost line before it is shown. |
| Member saving 3/6/9% | `part3c.js:530`, copy 4148, `model.js:15`, `sw-dict.js:64` | 3/6/9% | **Consistent.** Keep as the headline, redefined against the final price. |

---

## 7. Draft for 5.3: "Why members stay"

*Prices checked 9 Nov 2026. Each figure links to its source in `data/prices.json`.*

**1. Nappies are half the box, and members get them for less than the shelf price.**
- In the first year a baby uses about 240–300 nappies a month. They make up 43–52% of the Mama na Mtoto box in every baby stage, or 51–57% with wipes in four of the five stages.
- Dar shoppers pay TSh 17,000 for 42 Softcare Medium (TSh 405 each) and TSh 26,000 for 80 Softcare Small (TSh 325 each) at AfyaDepot.
- On a 12-month plan the member pays 9% less than the shelf price of the whole box, delivered.
- Stage b is TSh 147,000 a month against TSh 161,770 on our shelf: TSh 14,770 less each month, about TSh 177,000 a year.

**2. One box replaces two shops.** 33 of the 61 items in the pilot boxes are not sold by Tanzania's large online pharmacy: laundry powder, cotton wool, nappy bags, baby wash, bodysuits, treated nets, toys and porridge flour. Without the box, a mother orders from the pharmacy and then makes a second trip to a supermarket.

**3. Delivery is included, even for small orders.**
- The online pharmacy delivers free in Dar only above TSh 150,000. The box includes packing and doorstep delivery at every size.
- Pregnancy boxes are delivered once per trimester, so the delivery cost is shared across three months.

**4. The box changes with the child, so there is no reason to leave at a milestone.** The box moves through five stages from birth to age three and three trimesters before birth. Nappy size, foods, toy and the mother's items change automatically, and the member does not have to re-shop when the baby grows.

**5. Leaving costs more than staying.** The 12-month member saves 9% instead of 3%: on stage b, TSh 10,000 a month more than on the monthly plan. A member can pause instead of cancelling, and swap between 4–5 brands in the same price range up to 12 days before month end (B20).

*Still to be measured, and not to be claimed yet: churn by plan, and the share of members who renew. Until the pre-sale (R4) produces data, the showroom states no retention rate.*

---

## 8. Open items

1. **Shoppers benchmark.** Allow `www.shoppers.co.tz` and collect the same core lines (section 3 list). Confirm the chain's branches.
2. **Kariakoo calls** (founder): two calls per item group, using the log template above.
3. **AfyaDepot delivery terms.** Confirm 150,000 vs 250,000 at checkout, and whether same-day delivery still applies; the policy page now returns 404. Correct the brief's R3 "already found" line.
4. **Softcare pack labels.** AfyaDepot's titles and variant data disagree (40 vs 14, 34 vs 32, 30 vs 10/40). Confirm by phone before using per-diaper prices.
5. **Landed cost.** The 78/72/50% shares are planning assumptions. The stage e margin (6.9%) depends on them.
6. **Partner service prices.** These are planning figures (R7). The service-fee example uses them.
7. **Founder decisions:**
   - adopt the recommended D4 formula;
   - drop the 3-month plan, the 8% base and the Luxury +10%;
   - set points (flat 1% or ×1.5/×2), pause months and priority WhatsApp;
   - trimester delivery for the pregnancy box.
8. **Code follow-up (later phase, not done here):**
   - one D4 function in `model.js` read by 3.4, 3.5 and the Build-your-box calculator;
   - nearest-500 rounding;
   - KE rows at 20.33 (or replaced with TZ prices);
   - part3b's 13/16/20 perk copy removed.
9. Re-check the KE-sourced rows. Hosts are refused here.

## 9. Hosts needed

| Host | Why |
|---|---|
| `www.shoppers.co.tz`, `shoppers.co.tz` | Recommended second benchmark (26 pilot rows) |
| `superstore.co.tz` | Reserve benchmark (10 pilot rows incl. Softcare tape nappies) |
| `epictotostore.co.tz`, `findandgetgroup.com`, `www.impala.co.tz` | Re-verify the other TZ rows in the pilot |
| `www.carrefour.ke`, `portalpharmacy.ke`, `www.goodlife.co.ke`, `www.jumia.co.ke` | Re-verify KE-converted rows until TZ prices replace them |
| `www.bot.go.tz` | Quarterly FX refresh |

## 10. Sources

- AfyaDepot sitemap, https://afyadepot.co.tz/sitemap.xml (lastmod 2026-11-09), and robots.txt, https://afyadepot.co.tz/robots.txt. Opened 9 Nov 2026.
- AfyaDepot home page banner ("Free delivery on 150K+ Pharmacy orders in Dar"), https://afyadepot.co.tz/. Opened 9 Nov 2026.
- AfyaDepot product pages: every URL in `data/prices.json`. Opened 9 Nov 2026.
- AfyaDepot delivery policy, https://afyadepot.co.tz/delivery-return-policy: 404 on 9 Nov 2026. Text quoted only from a search snippet.
- Shoppers branch locations: search snippets only, pages not opened. Sources: Airbnb guide pages (Shoppers Plaza Masaki), https://yopki.com/explore/tz/dsm/mbezi-beach/shoppers-plaza, and JETRO 2015, https://www.jetro.go.jp/ext_images/theme/bop/precedents/pdf/retail-basicdata_20150913_tz.pdf.
- Exchange rates: `research/fx.md` (Bank of Tanzania mean rates, trading date 10 Nov 2026).
- Code: `showroom/sections/part3c.js` (catalogue `B`, `D.PKG.preg/mama`, engine lines 529–560), `part3b.js` (531–540, 877–885), `model.js:15–17, 106`. Audits `audit/06-s35.md` §3–4 and `audit/01-shell-model.md` §3.
