# R6 — Kupona (recovery at home after surgery or injury)

Feeds section 3.5. Prices checked 10 Nov 2026. Data file: `data/boxes/kupona.json` (validated against `data/boxes/SCHEMA.md`). Built from the earlier code box `D.PKG.rec` in `part3c.js`. The showroom code and the brief are unchanged.

## In plain language

- Kupona is for a person going home after surgery or an injury, and the family member who helps. It comes as two boxes: a **discharge box for weeks 1–2** and a **box for weeks 3–6**.
- It carries wound-care supplies for the dressing the clinic chooses (dressings, sterile gauze, sterile saline, gloves, tape), hand rub, body wipes, a thermometer, a pill organiser, a non-slip bath mat, a walking aid of the type the clinic advises, and in week 3 a resistance band for home exercises.
- **The clinic line (B16) is on every page:** which dressing, how often it is changed, when stitches come out, when to shower, how much weight the leg may take, and every medicine are decided by the clinic.
- Paracetamol is listed as a medicine: the partner pharmacy supplies it on the discharge prescription, not priced in the box (B4).
- **Member price:** discharge box TSh 138,500 (1-month plan) to 130,000 (12-month); weeks 3–6 box 47,500 to 44,500. **Six weeks in all: 186,000 to 174,500**, against a shelf value of 191,664. Packing and delivery are included (D4).
- Of this, the crutches are 60,000. If the clinic says no walking aid is needed, the discharge box falls by about 55,000.
- **It pays its way** on every plan; no fix was needed. The weeks 3–6 box is the thinner one.
- **Taste of luxury** for the first shower: Premium Radox shower gel (TSh 7,500, TZ); Luxury Bath & Body Works shower gel (TSh 32,528, Kenyan price).
- **Sourcing:** 19 of 47 brand rows are Tanzanian listings opened today; 27 are Kenyan; 1 estimate (band set). Dressings, gauze and gloves exist only as Kenyan prices: AfyaDepot and Shoppers list none. On the default brands, 46–48% of each box is Tanzanian. Every core item has a sourced price, so `final` is true.

---

## 1. Who it is for, and the guidance it is built from

**English.** For a person going home after surgery or an injury (a fracture, an operation on the abdomen, hip or knee, a caesarean section or a large wound), and for the family member who helps them. The first six weeks decide much of the outcome: the wound must heal without infection, the person must start moving early and safely, and the new medicines must be taken correctly.

The box follows the clinic, not the other way round. It carries clean wound-care supplies for the dressing the clinic has chosen, hand hygiene for the carer (WHO hand-hygiene guidelines), a thermometer because fever and a red, hot or leaking wound are the earliest signs of infection, a walking aid of the type the clinic or physiotherapist advises, and a non-slip mat, because a fall in the first weeks can reopen a wound or break a repaired bone (WHO falls fact sheet). WHO notes that rehabilitation lets people return to work and stay independent at home, and that about 2.4 billion people live with a condition that would benefit from it.

It comes as two boxes: one at discharge for weeks 1–2, when changes are most frequent, and one for weeks 3–6, when the dressing changes slow down and home exercises start.

**Kiswahili.** Kwa mtu anayerudi nyumbani baada ya upasuaji au jeraha (kuvunjika mfupa, upasuaji wa tumbo, nyonga au goti, upasuaji wa kujifungua au jeraha kubwa), na kwa mwanafamilia anayemsaidia. Wiki sita za kwanza huamua mengi: jeraha lazima lipone bila maambukizi, mtu lazima aanze kutembea mapema na kwa usalama, na dawa mpya lazima zitumiwe ipasavyo.

Sanduku hufuata kliniki, si kinyume chake. Linaleta vifaa safi vya kutunza jeraha kwa bandeji iliyochaguliwa na kliniki, usafi wa mikono kwa mhudumu (miongozo ya WHO ya usafi wa mikono), kipimajoto kwa sababu homa na jeraha jekundu, la moto au linalotoa majimaji ni dalili za mwanzo za maambukizi, kifaa cha kutembelea cha aina inayoshauriwa na kliniki au mtaalamu wa tiba ya viungo, na mkeka usioteleza, kwa sababu kuanguka katika wiki za mwanzo kunaweza kufungua jeraha au kuvunja tena mfupa uliotibiwa (taarifa ya WHO kuhusu kuanguka). WHO inaeleza kwamba tiba ya kurejesha uwezo huwawezesha watu kurudi kazini na kubaki huru nyumbani, na kwamba takriban watu bilioni 2.4 wana hali ambayo ingenufaika nayo.

Huja kama masanduku mawili: moja wakati wa kuruhusiwa kwa wiki 1–2, ambapo bandeji hubadilishwa mara nyingi zaidi, na moja kwa wiki 3–6, ambapo kubadilisha bandeji hupungua na mazoezi ya nyumbani huanza.

| Topic | What the guidance says | How the box applies it | Source status |
|---|---|---|---|
| Surgical-site infection | WHO global SSI guidelines (2016, updated 2018): 29 recommendations, pre-, intra- and postoperative | Sterile dressings of the clinic’s type, sterile saline, gloves; no strong antiseptics on the wound | Publication page opened; text not read |
| Hand hygiene | WHO 2009 guidelines: alcohol rub first; gloves for wounds and body fluids | Hand rub in both boxes; a fresh pair of gloves per change | Publication page opened |
| Rehabilitation | WHO *Rehabilitation*: about 2.4 billion people could benefit; it lets people return to work and stay independent | Walking aid fitted at delivery; resistance band from week 3; physiotherapy as an add-on | WHO fact sheet opened 10 Nov |
| Falls | WHO *Falls*: home-hazard reduction works | Non-slip bathroom mat | WHO fact sheet opened 10 Nov |
| Wounds and tetanus | WHO *Tetanus*: infection enters through cuts and wounds; proper wound care for surgical procedures | Clean technique; tetanus check after a dirty injury (clinic) | WHO fact sheet opened 10 Nov |
| Wound cleansing, dressings, VTE | NICE NG125 (saline in the first 48 h), NICE NG89 (stockings only after assessment) | Saline; compression stockings only as a prescribed add-on | Cited in the code; host refused, not re-opened |
| Tanzania | No Ministry of Health guidance on home post-operative care was found by search | — | — |

### Clinic line (B16)

- **EN:** Your clinic or hospital decides which dressing you use and how often it is changed, when stitches or clips come out, when you may shower, how much weight your leg may take, and every medicine, including pain relief, antibiotics and blood thinners, and their doses. Afya does not sell medicines: the licensed partner pharmacy supplies them on the discharge prescription. A fever, a wound that becomes red, hot, swollen or starts to leak, new pain or swelling in the calf, or shortness of breath goes to the clinic the same day; do not wait for the next box.
- **SW:** Kliniki au hospitali yako ndiyo inayoamua bandeji ipi itumike na ibadilishwe mara ngapi, lini nyuzi au klipu zitolewe, lini unaweza kuoga, mguu wako unaweza kubeba uzito kiasi gani, na kila dawa, ikiwemo dawa za maumivu, antibiotiki na dawa za kuzuia damu kuganda, pamoja na dozi zake. Afya haiuzi dawa: famasia mshirika yenye leseni huzitoa kwa maagizo ya kuruhusiwa. Homa, jeraha linalokuwa jekundu, la moto, lililovimba au linaloanza kutoa majimaji, maumivu mapya au uvimbe kwenye ndama, au kushindwa kupumua hupelekwa kliniki siku hiyo hiyo; usisubiri sanduku lijalo.

## 2. What changed from the code (`part3c.js`, `D.PKG.rec`)

| Code | Now | Why |
|---|---|---|
| Paracetamol priced as goods | Medicine, partner pharmacy, not priced | B4 |
| Sterile saline as an estimate (MSF catalogue) | AfyaDepot 0.9% sodium chloride 500 ml, TSh 2,542 (TZ) | A real listing exists |
| Surgical tape: 3M Micropore 12-roll box (Kenyan) | Alban 1.25 cm × 5 m roll, TSh 200 (TZ); 3 more choices | One roll is enough for six weeks |
| Walking aid: stick at Essential | Forearm crutches as default (AfyaDepot, 60,000), stick and frame as choices | Crutches are the usual aid after a leg injury; the clinic decides |
| Compression stockings in the core (weeks 3–6) | Counter add-on, only on prescription | They need assessment and measuring (NICE NG89 in the code) and are unsafe for some |
| Oral nutrition supplement 800 g in the core | Counter add-on | Only when the clinic advises it |
| Mosquito repellent, lip balm, body lotion, tea gift | Removed | Not specific to recovery; gift replaced by the priced luxury line |
| KES × 20 | KES × 20.33 | fx.md |

## 3. Items, box by box

Bold with ★ = default brand (headline price) and Afya Choice. Status: **TZ** = Tanzanian listing, opened 10 Nov 2026 on AfyaDepot (schema.org product data) or Shoppers (category crawl), unless marked as a 2 Nov code row; **KE** = Kenyan listing from the earlier showroom code, original KES shown and converted at 20.33 (BoT mean, 10 Nov 2026), not re-opened (hosts refused); **EST** = estimate with its basis. Cost in this box = price × units ÷ pack units. Medicines are listed, never priced in the box (B4). The Afya Choice is the lowest-cost suitable row; a Tanzanian row is preferred when it is within 10% of a cheaper Kenyan one.

### Stage a · Weeks 1–2 · discharge box (delivered on the day of discharge; box L)

| Item | Why it is in the box | Qty and formula | Brands (pack, shelf price, status, source) | Afya Choice |
|---|---|---|---|---|
| Sterile adhesive island dressings | A surgical wound is kept covered with a sterile dressing while it heals, and the dressing is changed when it is wet, soiled or as the clinic says. The type and size of dressing, and how often it is changed, are decided by the clinic that treated the person; the box carries the type written on the discharge note. | 7 dressings; one change every 2 days × 14 days = 7 (the clinic may set another interval) | **Curapor Non-woven island dressing 10 × 8 cm (50) TSh 82,357 [KES 4,051] KE [Goodlife Pharmacy (Kenya)](https://www.goodlife.co.ke/product/curapor-non-woven-dressing-10x8cm-50s/) → 11,530 in this box — 2 Nov code row, not re-opened** ★<br>Primapore Adhesive wound dressing 15 × 8 cm (20) TSh 53,468 [KES 2,630] KE [Goodlife Pharmacy (Kenya)](https://www.goodlife.co.ke/product/primapore-awd-15cm8cm-20s/) → 18,714 in this box — 2 Nov code row, not re-opened<br>Opsite Post-Op Showerproof island dressing 15.5 × 8.5 cm (20) TSh 146,478 [KES 7,205] KE [Goodlife Pharmacy (Kenya)](https://www.goodlife.co.ke/product/opsite-dressing-15-5cmx8-5cm-20s/) → 51,267 in this box — 2 Nov code row, not re-opened | Curapor Non-woven island dressing 10 × 8 cm |
| Sterile gauze swabs | Used wet with sterile saline to clean around the wound at each dressing change, one swab per wipe, from the wound outwards. Cotton wool is not used on wounds because its fibres stick. | 20 swabs; about 2–3 swabs a change × 7 changes ≈ 20 | **Generic (Goodlife) Sterile gauze swabs 3 × 3 in (100) TSh 19,374 [KES 953] KE [Goodlife Pharmacy (Kenya)](https://www.goodlife.co.ke/product/gauze-swabs-sterile-3x3-100s/) → 3,875 in this box — 2 Nov code row, not re-opened** ★<br>Generic (Goodlife) Sterile gauze swabs 10 × 10 cm (100) TSh 21,306 [KES 1,048] KE [Goodlife Pharmacy (Kenya)](https://www.goodlife.co.ke/product/gauze-swabs-sterile-44-100s/) → 4,261 in this box — 2 Nov code row, not re-opened<br>Steroplast Sterile dressing pads 5 × 5 cm (5) TSh 5,611 [KES 276] KE [Goodlife Pharmacy (Kenya)](https://www.goodlife.co.ke/product/steroplast-dressing-pads-sterile-5s-5cm-x-5cm/) → 22,444 in this box — 2 Nov code row, not re-opened | Generic (Goodlife) Sterile gauze swabs 3 × 3 in |
| Sterile saline for cleaning the wound | Sterile 0.9% saline cleans a fresh wound without stinging or harming new tissue. Strong antiseptics and hydrogen peroxide are not sent, because they slow healing; the clinic says when plain showering can replace saline. | 500 ml; about 50 ml a change × 7 changes ≈ 350 ml → one 500 ml bottle | **Generic (AfyaDepot) Sodium chloride 0.9% sterile solution (500 ml) TSh 2,542 TZ [AfyaDepot](https://afyadepot.co.tz/product/normal-saline-infusion-solution-500mls) → 2,542 in this box — Sold as an infusion bottle; used here only to rinse the wound. Once opened, use within 24 hours.** ★<br>NeilMed NeilCleanse sterile saline wound wash spray (177 ml) TSh 40,457 [KES 1,990] KE [Delivery Pharmacy (Kenya)](https://deliverypharmacyke.com/product/neilmed-neilcleanse-wound-wash-sterile-saline-solution-6oz-177ml/) → 114,285 in this box — 2 Nov code row, not re-opened | Generic (AfyaDepot) Sodium chloride 0.9% sterile solution |
| Disposable gloves for dressing changes | Clean hands and fresh gloves at each change keep germs out of the wound (WHO hand-hygiene guidance). One pair to remove the old dressing, a fresh pair to put on the new one. | 20 gloves; 2 pairs a change (remove, then apply) × 7 changes = 28 → 20 with the person changing small dressings alone (planning assumption) | **Generic (Goodlife) Latex examination gloves, medium (100) TSh 10,572 [KES 520] KE [Goodlife Pharmacy (Kenya)](https://www.goodlife.co.ke/product/latex-examination-gloves-medium-100s/) → 2,114 in this box — 2 Nov code row, not re-opened** ★<br>Generic (Portal) Powder-free examination gloves (100) TSh 15,247 [KES 750] KE [Portal Pharmacy (Kenya)](https://portalpharmacy.ke/examination-gloves-pow-f-pack-of-100) → 3,049 in this box — 2 Nov code row, not re-opened<br>Generic (Goodlife) Latex powder-free examination gloves, medium (100) TSh 17,443 [KES 858] KE [Goodlife Pharmacy (Kenya)](https://www.goodlife.co.ke/product/latex-powder-free-gloves-medium-100s/) → 3,489 in this box — 2 Nov code row, not re-opened<br>Generic (Carrefour) Nitrile powder-free gloves (latex-free) (100) TSh 35,252 [KES 1,734] KE [Carrefour Kenya](https://www.carrefour.ke/mafken/en/safety/nitrile-powder-free-gloves-100pc/p/166751) → 7,050 in this box — 2 Nov code row, not re-opened | Generic (Goodlife) Latex examination gloves, medium |
| Hypoallergenic tape | Holds a gauze pad or the edge of a dressing in place, and fixes a dressing where the adhesive border lifts. | 1 roll; 1 roll for the 6 weeks | **Alban Hypoallergenic retention tape 1.25 cm × 5 m (1 roll) TSh 200 TZ [AfyaDepot](https://afyadepot.co.tz/product/alban-plaster) → 200 in this box — Variant “1.25cmx5m”.** ★<br>Generic (Goodlife) Zinc oxide plaster tape 2.5 cm × 4 m (1 roll) TSh 1,057 [KES 52] KE [Goodlife Pharmacy (Kenya)](https://www.goodlife.co.ke/product/zinc-oxide-plaster-1-2-5cm4m/) → 1,057 in this box — 2 Nov code row, not re-opened<br>Alban Hypoallergenic retention tape 5 cm × 5 m (1 roll) TSh 2,000 TZ [AfyaDepot](https://afyadepot.co.tz/product/alban-plaster) → 2,000 in this box — Variant “5cmx5m”.<br>Advasafe Non-woven fixation tape 5 cm × 10 m (1 roll) TSh 15,000 TZ [AfyaDepot](https://afyadepot.co.tz/product/advasafe-non-woven-fixation-dressing-tape1s) → 15,000 in this box — Variant “5cm * 10m roll”; higher price range.<br>Micropore (3M) Surgical tape 2.5 cm (12 rolls) TSh 115,312 [KES 5,672] KE [Goodlife Pharmacy (Kenya)](https://www.goodlife.co.ke/product/micropore-tape-1-inch/) → 9,609 in this box — 2 Nov code row, not re-opened | Alban Hypoallergenic retention tape 1.25 cm × 5 m |
| Alcohol hand rub | WHO’s hand-hygiene guidelines: alcohol rub before and after touching the wound or the dressing, for the person and the carer, is the simplest way to prevent wound infection at home. | 500 ml; about 3 ml a rub × about 8 rubs a day × 14 days ≈ 340 ml → 500 ml | **Luron Advanced hand sanitiser (525 ml) TSh 7,624 [KES 375] KE [Carrefour Kenya](https://www.carrefour.ke/mafken/en/hand-sanitizers/luron-advanced-hand-sanitizer-525ml/p/122197) → 7,261 in this box — 2 Nov code row, not re-opened** ★<br>Jet Hand sanitizer (500 ml) TSh 8,500 TZ [Shoppers Supermarket](https://www.shoppers.co.tz/product-detail/602a587253c6d5732d0a366d) → 8,500 in this box<br>Body Guard Hand sanitizer (250 ml) TSh 4,500 TZ [Shoppers Supermarket](https://www.shoppers.co.tz/product-detail/6026664053c6d5732d0a358c) → 9,000 in this box<br>Grounded Instant hand disinfectant (500 ml) TSh 12,178 [KES 599] KE [Carrefour Kenya](https://www.carrefour.ke/mafken/en/hand-sanitizers/grounded-instant-disinfectant-500ml/p/186682) → 12,178 in this box — 2 Nov code row, not re-opened | Luron Advanced hand sanitiser |
| Body wipes for washing in bed | Until the clinic allows a shower, the person washes in bed or at the basin. Wet wipes keep the skin clean and fresh without wetting the dressing. | 60 wipes; about 4 wipes a day × 14 days = 56 → 60 | **Angels Ultra Compact wet wipes (120) TSh 6,000 TZ [AfyaDepot](https://afyadepot.co.tz/product/angels-wet-towels-ultra-compact-120pcs) → 3,000 in this box** ★<br>Momo Ultra Compact wet wipes (120) TSh 6,000 TZ [AfyaDepot](https://afyadepot.co.tz/product/momo-wet-wipes-ultra-compact-120pcs) → 3,000 in this box<br>Velvex Adult body wipes (72) TSh 4,188 [KES 206] KE [Carrefour Kenya](https://www.carrefour.ke/mafken/en/refresing-wet-wipes/velvex-adult-body-wipes-72s/p/209670) → 3,490 in this box — 2 Nov code row, not re-opened<br>Hobby Wet wipes (90) TSh 6,500 TZ [Shoppers Supermarket](https://www.shoppers.co.tz/product-detail/66d6d78ead21bfe77df6ae3f) → 4,333 in this box<br>Ultra Compact Sensitive wet wipes (120) TSh 8,500 TZ [AfyaDepot](https://afyadepot.co.tz/product/ultra-compact-baby-wet-wipes-120pcs) → 4,250 in this box | Angels Ultra Compact wet wipes |
| Digital thermometer | A fever, or a wound that becomes red, hot, swollen or starts to leak, is the earliest sign of infection after surgery. A daily reading in the first two weeks lets the family call the clinic early. | 1, once; 1 per household | **Microlife MT 810 digital stick thermometer (1) TSh 19,314 [KES 950] KE [Portal Pharmacy (Kenya)](https://portalpharmacy.ke/microlife-mt810-digital-thermometer) → 19,314 in this box — 2 Nov code row, not re-opened** ★<br>A&D UT-103 digital thermometer (1) TSh 30,495 [KES 1,500] KE [Portal Pharmacy (Kenya)](https://portalpharmacy.ke/ad-medical-ut-103-digital-thermometer) → 30,495 in this box — 2 Nov code row, not re-opened<br>Generic (Impala) Non-contact infrared thermometer (1) TSh 63,000 TZ [impala.co.tz](https://impala.co.tz/gj/T87822DF0F/electronic-thermometer-infrared-forehead-body-digital-thermometer-gun-non-contact-body-temperature-measurement-meter-measurement-device) → 63,000 in this box — Tanzanian listing from the earlier showroom code (2 Nov 2026); not re-opened: the host was refused by this session’s network proxy on 10 Nov 2026.<br>Generic (AfyaDepot) Non-contact infrared digital thermometer (1) TSh 75,000 TZ [AfyaDepot](https://afyadepot.co.tz/product/infrared-thermometer) → 75,000 in this box — Higher price range. | Microlife MT 810 digital stick thermometer |
| Walking aid, the type the clinic or physiotherapist advises | After surgery or an injury to the leg, hip or back, a walking aid lets the person move early and safely; WHO notes that rehabilitation lets people return to work and stay independent at home. The clinic or physiotherapist decides whether crutches, a stick or a frame is needed, and how much weight the leg may take; the aid is adjusted to the person’s height at delivery. If no aid is needed it is removed and the price falls. | 1, once, adjusted at delivery; 1 per person, if the clinic advises one | **Generic (AfyaDepot) Height-adjustable aluminium forearm crutches (1 pair) TSh 60,000 TZ [AfyaDepot](https://afyadepot.co.tz/product/elbow-crutches-pair-open-arm-height-adjustable) → 60,000 in this box** ★<br>Generic (AfyaDepot) Underarm aluminium crutches (1 pair) TSh 65,000 TZ [AfyaDepot](https://afyadepot.co.tz/product/auxiliary-crutches-pair-2s) → 65,000 in this box<br>Generic (AfyaDepot) Adjustable aluminium elbow crutches (1 pair) TSh 65,000 TZ [AfyaDepot](https://afyadepot.co.tz/product/elbow-forearm-crutches1s) → 65,000 in this box<br>Generic (Delivery Pharmacy) Underarm adjustable crutches (1 pair) TSh 48,792 [KES 2,400] KE [Delivery Pharmacy (Kenya)](https://deliverypharmacyke.com/product/underarm-adjustable-crutches-l-pair/) → 48,792 in this box — 2 Nov code row, not re-opened<br>Generic (AfyaDepot) Adjustable aluminium walking stick (1) TSh 35,000 TZ [AfyaDepot](https://afyadepot.co.tz/product/adjustable-walking-stick-1-unit) → 35,000 in this box | Generic (AfyaDepot) Height-adjustable aluminium forearm crutches |
| Pill organiser for discharge medicines | People often go home with several new medicines at once. A morning-and-evening organiser, filled from the discharge prescription, prevents missed and double doses in the confused first days. | 1, once; 1 per person | **Generic (Goodlife) Daily AM/PM pill box (1) TSh 15,878 [KES 781] KE [Goodlife Pharmacy (Kenya)](https://www.goodlife.co.ke/product/pill-box-daily-am-pm-67433/) → 15,878 in this box — 2 Nov code row, not re-opened** ★<br>Equate Weekly pill planner (1) TSh 22,953 [KES 1,129] KE [Goodlife Pharmacy (Kenya)](https://www.goodlife.co.ke/product/equate-weekly-pill-planner-pill-box/) → 22,953 in this box — 2 Nov code row, not re-opened<br>Generic (Goodlife) Push-button 7-day AM/PM pill organiser (1) TSh 56,680 [KES 2,788] KE [Goodlife Pharmacy (Kenya)](https://www.goodlife.co.ke/product/pill-box-push-button-7-day-am-pm-67585/) → 56,680 in this box — 2 Nov code row, not re-opened | Generic (Goodlife) Daily AM/PM pill box |
| Non-slip bathroom mat | A person on crutches or still weak after surgery is at high risk of a fall on a wet floor; a fall can reopen a wound or break a repaired bone. WHO counts home-hazard reduction among the measures that prevent falls. | 1, once; 1 for the bathroom | **Estilo Anti-slip bath mat (1) TSh 17,179 [KES 845] KE [Carrefour Kenya](https://www.carrefour.ke/mafken/en/bath-mat/estilo-anti-slip-bathmat-1pc/p/225493) → 17,179 in this box — 2 Nov code row, not re-opened** ★<br>King’s Collection Anti-slip bath mat 71 × 40 cm (1) TSh 30,800 [KES 1,515] KE [Carrefour Kenya](https://www.carrefour.ke/mafken/en/bath-mat/kings-batmat-71-40-anti-slip/p/63816) → 30,800 in this box — 2 Nov code row, not re-opened<br>Decobella Anti-slip bath mat 25101 (1) TSh 38,119 [KES 1,875] KE [Carrefour Kenya](https://www.carrefour.ke/mafken/en/bathroom-toilet-accessories/decobella-anti-slip-mat-25101/p/194063) → 38,119 in this box — 2 Nov code row, not re-opened | Estilo Anti-slip bath mat |
| Paracetamol 500 mg for pain (partner pharmacy) *(medicine: partner pharmacy, not priced)* | Pain that is controlled lets the person move, breathe deeply and sleep, which speeds recovery. Which pain medicine, the dose and for how long are decided by the clinic; the licensed partner pharmacy supplies it on the discharge prescription. Afya does not sell or price it. | up to 40 tablets, if the clinic prescribes them; the clinic sets the dose; a typical adult maximum is 8 tablets a day, and 40 tablets cover about the first 5–7 days. Not priced in the box (B4). | **Paraquick Paracetamol 500 mg tablets (10 tablets) TSh 500 TZ [AfyaDepot](https://afyadepot.co.tz/product/paraquick-500mg-tablet-10s)** ★<br>Panadol Advance paracetamol 500 mg (10 tablets) TSh 1,500 TZ [AfyaDepot](https://afyadepot.co.tz/product/panadol-advance-500mg-caplet)<br>Cetamol Paracetamol 500 mg tablets (100 tablets) TSh 9,697 [KES 477] KE [Goodlife Pharmacy (Kenya)](https://www.goodlife.co.ke/product/cetamol-500mg-tabs-100s/) — 2 Nov code row, not re-opened<br>Panadol Advance paracetamol 500 mg (20 tablets) TSh 4,473 [KES 220] KE [Goodlife Pharmacy (Kenya)](https://www.goodlife.co.ke/product/panadol-advance-20s/) — 2 Nov code row, not re-opened | Paraquick Paracetamol 500 mg tablets |

Shelf value of core goods (default brands, no medicines, no luxury item): **TSh 142,893** — TZ 65,742 (46%), KE 77,151, EST 0.

### Stage b · Weeks 3–6 (in week 3; box S)

| Item | Why it is in the box | Qty and formula | Brands (pack, shelf price, status, source) | Afya Choice |
|---|---|---|---|---|
| Sterile adhesive island dressings | see stage a | 8 dressings; one change every 3–4 days × 4 weeks = 8 (many wounds no longer need one by week 4; unused dressings can be returned) | same brands as stage a; default Curapor → 13,177 in this box | Curapor Non-woven island dressing 10 × 8 cm |
| Sterile gauze swabs | see stage a | 16 swabs; 2 swabs a change × 8 changes = 16 | same brands as stage a; default Generic (Goodlife) → 3,100 in this box | Generic (Goodlife) Sterile gauze swabs 3 × 3 in |
| Sterile saline for cleaning the wound | see stage a | 500 ml; until the clinic allows plain showering; one 500 ml bottle | same brands as stage a; default Generic (AfyaDepot) → 2,542 in this box | Generic (AfyaDepot) Sodium chloride 0.9% sterile solution |
| Disposable gloves for dressing changes | see stage a | 16 gloves; 1 pair a change × 8 changes = 16 | same brands as stage a; default Generic (Goodlife) → 1,692 in this box | Generic (Goodlife) Latex examination gloves, medium |
| Alcohol hand rub | see stage a | 500 ml; about 3 ml a rub × about 5 rubs a day × 28 days ≈ 420 ml → 500 ml | same brands as stage a; default Luron → 7,261 in this box | Luron Advanced hand sanitiser |
| Resistance band for home exercises | From the third week most people start the strengthening exercises the physiotherapist sets. A light band makes them possible at home between sessions; the physiotherapist sets which exercises and when. | 1, once; 1 per person, for the exercises the physiotherapist sets | **Sactband Resistance loop band (1) TSh 21,000 TZ [AfyaDepot](https://afyadepot.co.tz/product/loop-band-sactband1s) → 21,000 in this box** ★<br>Generic Latex-free resistance loop band set, 5 strengths (1 set) TSh 15,000 EST [estimate](https://jiji.co.tz/kinondoni/sports-bicycles-and-fitness/5pcs-colors-fitness-resistance-bands-set-n0wzjxhiO7eonzL1AHXNQ1hs.html) → 15,000 in this box — Estimate. A classified-ad price on jiji.co.tz carried in the earlier showroom code (2 Nov 2026); not a shop listing and not re-opened. | Sactband Resistance loop band |
| Paracetamol 500 mg for pain (partner pharmacy) *(medicine: partner pharmacy, not priced)* | see stage a | up to 20 tablets, if the clinic prescribes them; pain is usually less after week 2; the clinic sets the dose. Not priced in the box (B4). | same brands as stage a; default Paraquick | Paraquick Paracetamol 500 mg tablets |

Shelf value of core goods (default brands, no medicines, no luxury item): **TSh 48,771** — TZ 23,542 (48%), KE 25,229, EST 0.

## 4. Taste of luxury

Priced as its own line at shelf price, outside the saving (D4); ships once, in the weeks 3–6 box.

| Tier | Item | Price | Source |
|---|---|---|---|
| Regular | none (the core box only) | 0 | — |
| Premium | Radox Feel Relaxed shower gel, for the first shower the clinic allows: Radox Feel Relaxed shower gel (250 ml) | TSh 7,500 | [Shoppers Supermarket](https://www.shoppers.co.tz/product-detail/62ed06d8fa11de0a43b39b1f), TZ, opened 2026-11-10 |
| Luxury | Bath & Body Works shower gel, for the first shower the clinic allows: Bath & Body Works Shower gel (A Thousand Wishes, Japanese Cherry Blossom or Warm Vanilla Sugar) (295 ml) | TSh 32,528 (KES 1,600 × 20.33) | [Portal Pharmacy (Kenya)](https://portalpharmacy.ke/bbw-cherry-blossom-shower-gel), KE, not re-opened |

**Add-ons at the counter, not in the core box** (shelf price, outside the saving):
- Compression stockings: Flamingo Below-knee stockings (1 pair), TSh 45,000 TZ, [AfyaDepot](https://afyadepot.co.tz/product/flamingo-below-knee-stockings). Only when the clinic prescribes them and measures the leg; they are not safe for everyone.
- Above-knee compression stockings: Generic (AfyaDepot) Above-knee compression stockings (1 pair), TSh 50,000 TZ, [AfyaDepot](https://afyadepot.co.tz/product/above-knee-compression-stockings2s). Only when the clinic prescribes them.
- Oral nutrition supplement: Abbott Ensure Vanilla powder (400 g), TSh 70,000 TZ, [AfyaDepot](https://afyadepot.co.tz/product/ensure-vanila-powder-400mg). Only when the clinic or a nutritionist advises it.
- Commode chair: Generic (AfyaDepot) Height-adjustable aluminium commode chair (1), TSh 165,000 TZ, [AfyaDepot](https://afyadepot.co.tz/product/height-adjustable-aluminium-frame-commode-chair). For someone who cannot yet reach the toilet safely.

## 5. Services inside this box

- Included at no fee (store services): a weekly temperature, wound-photo and pain check-in by phone or in store, and a blood pressure and weight check in week 6. Add-ons with no partner quote yet (R7), so not in the box price: a nurse home visit on days 2–3 (AfyaDepot lists a home “Minor Wound Dressing” visit at TSh 25,000 and a “Post-Op Wound Care Bundle” at TSh 85,000, as market references only), home physiotherapy sessions, and stitch or clip removal, booked with the operating clinic.
- `services` in the JSON is empty: none of these services is in `data/services.json` yet (R7).

## 6. Price per box and plan (D4)

Shelf value excludes medicines, add-ons and the luxury line. Price = shelf × (1 − 3% / 6% / 9%), nearest 500, never above shelf; packing and one delivery included.

| Stage | Box | Packing + delivery | Shelf value | Goods at landed cost | 1-month price (margin) | 6-month Gold (margin) | 12-month Platinum (margin) | Other mode, 12-month margin |
|---|---|---|---|---|---|---|---|---|
| a · Weeks 1–2 · discharge box | L | 6,500 + 3,500 | 142,893 | 97,385 | 138,500 (29,730) | 134,500 (25,770) | 130,000 (21,315) | — |
| b · Weeks 3–6 | S | 3,500 + 3,500 | 48,771 | 30,931 | 47,500 (9,094) | 46,000 (7,609) | 44,500 (6,124) | — |

| Six weeks | 1-month plan | 6-month Gold | 12-month Platinum |
|---|---|---|---|
| Both boxes | 186,000 | 180,500 | 174,500 |

For a one-off recovery the member pays the 1-month price; the 6- and 12-month savings apply when Kupona is taken inside a household membership (open for the founder to confirm).

## 7. Does it pay its way?

**Yes.** Both boxes cover their goods at landed cost, packing, delivery and 1% points on every plan (12-month margin +21,315 and +6,124).
- The weeks 3–6 box (S, 48,771 shelf) is the thin one. It breaks even if its goods land at about 76% of shelf on average; the planning shares give 63%. If quotes come in higher, it travels with the physiotherapist’s first home visit or is collected in store.
- No fix was applied. Delivering weekly would fail: a one-week share of the weeks 3–6 goods (about 12,000) cannot pay 7,000 of packing and delivery.

## 8. Open items

1. Dressings, gauze, gloves and the default hand rub have Kenyan prices only (KES × 20.33, not re-opened); AfyaDepot and Shoppers list none of them. Tanzanian distributor prices are needed.
2. Only three dressing brands were found, and the clinic chooses the type: the box must be able to source the dressing written on each discharge note.
3. The saline on AfyaDepot is an infusion bottle; R1 should confirm Afya may sell it for wound rinsing.
4. The weeks 3–6 box has the thinnest margin of the two; if its goods land above about 76% of shelf on average (the planning shares give 63%), it should travel with the physiotherapist’s visit or be collected in store.
5. **Fewer than 4 brands found (none invented):** dressings (3), gauze (3), saline (2), pill organiser (3), bath mat (3), band (2, one an estimate).
6. **Planning quantities:** 7 changes in weeks 1–2 and 8 in weeks 3–6, 2–3 swabs and 50 ml saline a change, hand rub per rub, 4 wipes a day. The clinic’s instructions override them; unused sterile packs can be returned.
7. **Plan reading:** how the 1/6/12-month plans apply to a six-week box (section 6).
8. **Code follow-up (not done here):** `D.PKG.rec` still prices paracetamol and uses KES × 20; it should render from this JSON.

### Kiswahili terms for native review

| Kiswahili used | English | Doubt |
|---|---|---|
| bandeji tasa zinazojibandika | sterile adhesive island dressings | no standard term |
| shashi tasa | sterile gauze swabs |  |
| maji tasa ya chumvi | sterile saline |  |
| magongo | crutches | regional variation |
| tiba ya viungo | physiotherapy | also “fiziotherapia” |
| dawa za kuzuia damu kuganda | blood thinners |  |
| barua ya kuruhusiwa | discharge note |  |

## 9. Sources

**Guidance:**
- WHO 2016/2018, Global guidelines for the prevention of surgical site infection: https://www.who.int/publications/i/item/9789241550475 — Publication page opened; the guideline text was not read.
- WHO 2009, Guidelines on hand hygiene in health care: https://www.who.int/publications/i/item/9789241597906 — Publication page opened; the guideline text was not re-read.
- WHO fact sheet, Rehabilitation: https://www.who.int/news-room/fact-sheets/detail/rehabilitation — opened 2026-11-10
- WHO fact sheet, Falls: https://www.who.int/news-room/fact-sheets/detail/falls — opened 2026-11-10
- WHO fact sheet, Tetanus (wound care): https://www.who.int/news-room/fact-sheets/detail/tetanus — opened 2026-11-10
- NICE NG125 Surgical site infections; NICE NG89 Venous thromboembolism: https://www.nice.org.uk/guidance/ng125 — Cited in the earlier code; host refused, not re-opened.

**Prices:** AfyaDepot product pages (schema.org data and variant data, opened 10 Nov 2026); Shoppers Supermarket (category crawl, 10 Nov 2026). Kenyan rows via the earlier code (2 Nov), not re-opened. Market references: AfyaDepot home-nursing listings “Minor Wound Dressing” (TSh 25,000) and “Post-Op Wound Care Bundle” (TSh 85,000), opened 10 Nov 2026. Rates: `research/fx.md`.

Working files: `/tmp/claude-0/-home-user-fa-market-lab/763e29dd-dd47-5b19-b730-923fee20ac28/scratchpad/r6b/`.
