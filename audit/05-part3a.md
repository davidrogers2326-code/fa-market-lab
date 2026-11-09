# Audit 05 — `sections/part3a.js` (3.1–3.4) + `sections/fp.js` (store footprint)

Read-only audit. Line numbers are `file:line`. MODEL = `model.js` `window.MODEL` (master model v1.2, header says every input is a "planning estimate"). "Typed" = a literal number in the section file, not read from MODEL.

## 0. Cross-cutting findings (apply to all four sections)

| Issue | Evidence |
|---|---|
| **No section responds to the funding switch (B5/K1.5).** Every number reads `M.get('base')`, which is the Flagship scenario. Text says "Flagship base case" outright. 3.1 also gives the Start Small size inline ("scales down to the ${LI.store.area_m2} m² Start Small store"). | part3a.js:458 `const B=()=>M.get('base')`; :593, :1640, :1709 "Flagship base case"; :821 Start Small |
| **Gradient text (B9/C7).** Each section's `h1 em` gets the shell's `.s01h em{background:linear-gradient(92deg,var(--neon2),var(--neon) 40%,var(--gold2));background-clip:text}` (index.html). 3.4 alone overrides it. So 3.1, 3.2 and 3.3 headlines render as gradient text. | index.html `.s01h em`; override only at part3a.js:1601 |
| **Off-token colours (B9/C2).** `--neon:#5fbf8f` and `--neon2:#b5dfc6` (teal/mint green) are used throughout. Zone colours: pink `#ff9bb8`, red `#ff7b6b`, lavender/purple `#c9b8ff`, orange `#ff9b5a`. Teal `#7fd6c2` in fp.js. | part3a.js:466–480, 563–576, 844, 919–921, 1292; fp.js:9–48, 53, 88, 95, 101 |
| **Glows (B10/C7).** Green `box-shadow` on photo cards; neon `text-shadow` on journey time; glowing gold target line; neon hover glow on shelf products; glowing scan laser; phone mock-up glow; hotspot glow (dead code). | :8, :169 `text-shadow:0 0 18px rgba(95,191,143,.45)`, :175, :186, :190, :206, :126 |
| **Motion outside hero moments (C5).** Photo zoom on hover (`scale(1.035)`); journey bars grow on load (`@keyframes p3grow`); infinite scan-laser loop (`p3scan … infinite`); speed gauges animate on scroll (IntersectionObserver); `rise` entrance animations; floor-plan routes animate forever (`fpd … infinite`), plus SVG `animateMotion` dots (`repeatCount="indefinite"`) and pulsing season points. | :10, :172–174, :206–208, :1136–1138, :211/219/233/333; fp.js:77–78, :82, :105 |
| **`prefers-reduced-motion` handled only once.** fp.js:83 stops the CSS animations but not the SMIL `animateMotion` (fp.js:105). part3a.js never checks it, including the WebGL tour with its constant idle sway (:730). | grep finds no `prefers-reduced-motion` or `matchMedia` in part3a.js |
| **Kiswahili coverage (B8).** Only the 3.1 lede (`V3.L(en,sw)`, :766) and all of fp.js carry inline `sw`. Everything else depends on `sw-dict.js`, which matches whole text nodes exactly (index.html:1302). A heuristic scan of live, displayed static strings found about **115 with no dict entry** (counts are approximate): 3.1 about 23, 3.2 about 52, 3.3 about 22, 3.4 about 6. Examples: the five journeys' `who` and step text (:849–859), STOPS chips (:579–594), the kiosk result sentences (:1276–1290), kiosk step names (:1461), the CEX/C34 example lines (:1497). **`alt` attributes are never translated** (swText only walks text nodes), so every image's alt text is English-only (Part I). | scratchpad `sw3.js` heuristic |
| **Mixed English and Kiswahili in one string (B7).** | "Karibu Afya Basics" header on the English customer screen (:927); "Asante · Paid" (:932, :974); "Lipa TSh 47,000 kwa AFYA BASICS LTD" inside English text (:973); "taps TUMA" (:980); "Asante, karibu tena." (:1006, :1116); "Karibu, Juma" (:1076); "… · Asante" receipt (:1163); kiosk sign "Pima afya bure · Free health check" (:1403); "Karibu · Welcome" (:1450); the sw string contains the English word "wipes" (fp.js:10) |
| **English-only photo caption prefix (B8).** Every PH/BAND/FIG caption is prefixed with the literal "Concept image · ". | :53, :57, :1293 |
| **Process narration (A4).** | "The tour is built from the store's concept images, each with an estimated depth map" (:769); "Every view carries a depth map" (:697); "Illustrative customer · AI-generated people, no real faces" (:1313); "Concept images · real interface designs" (:1029) |
| **Dead code to retire or log.** Never rendered: `ZONES`, `FIX`, `ALLZ`, `WALK`, `planSVG()` (an older hand-drawn SVG plan, "GLAZED FAÇADE · SOLAR-CONTROL GLASS"), `HS` hotspots ("makes the glass room feel alive at night"), `TECH`, `_unused`, `cardFace`, `CEX`, `CCLS`, `LOGO`, `IX`. `RZ` text is never shown; it is used only for minimap coordinates. | :465–559, :762, :1496–1503, :67 |

---

## 3.1 The store — `S['s3-1']` part3a.js:750–839; footprint fp.js (whole file)

**Part G:** Rewrite per B14; floor plan; Care Zones. **Visual:** Hero C6.2 (store walkthrough). **Research:** none listed. In practice it leans on R2 (kiosk cost, capacity) and on fit-out quotations.
**Decision:** **Rebuild.** Replace the 5D WebGL tour and the 17-stop carousel with the C6.2 scroll walkthrough (8–12 stills). Rebuild the footprint as clean inline SVG. Keep the planning tables but rewrite them on the template. Retire the walk and plan videos unless they are re-rendered.

**What it is today**
- Hero `img/s-entry.webp` (:764). h1 "The store, inside out". The lede is bilingual and reads `I.store.area_m2` (180) and `St.hours` from MODEL (:766).
- Modules (:767–821):
  - 5D tour: `tourHTML/tourInit`, WebGL with depth maps. Has Day/Evening/After-hours, "Walk the store" auto-advance every 6.5 s, full screen, and a minimap.
  - "Watch it · two films".
  - "Inside out · 17 stops" carousel (`STOPS`, 17 items: :578–594).
  - Store footprint (`FP.html`, fp.js).
  - Planning tables for space, people and flow, and money.
  - "Why it is designed this way" (6 tiles).
  - Risks.
- **Numbers from MODEL:** area 180, hours, visitors_day_m12 110, conversion 0.50, basket 25,000, rent 3,700,000, staff counts, seed lines (fit-out 40M, lease 71M, technology 15M, reserve 41M), `product_families` 520, `checks_day_m12` 60, month-12 members.
- **Typed numbers:**
  - FITB `9e6`, `8e6`; the façade line is a plug (`fit-17e6`) (:759).
  - TECHB `3.0e6` (SUNMI D3 PRO), `4.0e6`, `1.85e6`, `0.6e6`, `1.5e6` (:760). Tagged `PE` "Planning estimate" (:800).
  - AREA m² `112/12/10/8/6/20/6/6` (:646), duplicated in fp.js SCHED (:64).
  - Shelf figures "≈ 23 m", "≈ 9 m", "≈ 1,700 facings", "≈150 labels" (:790).
  - "≈ 144 a day" kiosk capacity (:580, :795, :796).
  - "≈ 120 payments an hour (240…)" (:795); multipliers 1.7× and 45 h/week (:753, :756).
  - "Retail practice puts back of house at 15–25%", **no source** (:789).
  - "The model assumes 35% of checks lead to a purchase", typed rather than read from `check_to_purchase` (:581).
  - "Open 09:00–21:00", typed (:578).
  - fp.js "180 m² · 18 m × 10 m" and "32 m of shelving × 5 = 160 m" typed (fp.js:58, :63, :108, :111).
- **Gap stated honestly (B3, good):** "Gap · founders' decision in 3.3" (:803).

**Rule issues**
- **B14 store design:** live copy describes "a charcoal facade with emerald fins, a gold LED line … avoids an all-glass front" (:578), which is broadly compatible. Gaps against B14:
  - It never says single-storey, standalone, or "nothing built on the sides"; :821 says it "fits any rectangular site of about 150–220 m²".
  - Glow language in the interior copy: "the glowing counter" (:579, alt :764), "an emerald glow at the floor" (:588), "glowing screens" (:571) → B10.
  - Dead code still describes a glass store ("GLAZED FAÇADE", :513; "the glass room", :541; "Laminated glass … Glass stays open by day", :558).
  - Brochure shelf: in the live UI it appears only in fp.js f2 (no brochures) and RZ text (not shown). The live STOPS lounge text omits books and brochures (:586) → B14 wants "small shelf of books and brochures".
- **B4 (medicines), fp.js:34:** "Medicines sold only on advice are kept here." / sw "Dawa zinazouzwa kwa ushauri tu zinahifadhiwa hapa." **This implies Afya sells medicines.** Borderline lines: "ORS and zinc" (fp.js:19); "iron and folic acid" (fp.js:10).
- **Kiosk (R2):** "Quick check ≈ 50 s · full check ≈ 4 min" and "fifteen measurements" (:580, :811). The consultation room offers "Optional paid tests here" (:587), which are finger-prick tests (see 3.3).
- **C6.2 mismatch:** the tour is not scroll-driven. It is a drag/arrow WebGL viewer with constant idle sway (:730) and no reduced-motion state. The footprint uses raster `s-plan.webp`/`s-iso.webp` under an SVG overlay, not clean SVG (K1.10).
- **B5:** Flagship-only numbers; the Start Small size is mentioned inline (:821).
- **Reading path inconsistency:** the 5D tour has **12** stops (TOUR :650–653). The carousel has **17** (STOPS), and the lede says "a 17-stop tour".

**K1.10 inventory:** 5D tour (drag, stops, next/prev) ✓ present; floor plan 180 m² ✓ (fp.js); videos store-walk-1…4, store-plan-1…2 ✓ (:599–600).

**Present but not in Part K:** Time-of-day toggle, auto-walk and full screen. WebGL depth maps `img/d/*.png`. The separate 17-stop carousel with inset minimap. FP layers (Care Zones/Areas/customer route/restock route/season points) and Top/3D cut-away (`img/s-iso.webp`), shared with 3.6. Area schedule and shelf-capacity tables. Traffic and capacity, and staffing tables. Fit-out, technology, rent-vs-sales and in-store advertising tables ("Revenue in the model: not counted (upside)", :806). "Why designed this way" tiles. Risks. The dead SVG plan with an animated walk path (:482–536).

---

## 3.2 Customer journey & fast checkout — `S['s3-2']` :1009–1172 (+ JOUR :845–860, MACH :885–893, CPRO :919–942, deepMods :965–1007)

**Part G:** Keep journeys and time targets; keep scan-and-go demo. **Visual:** Interactive (existing). **Research:** R5.
**Decision:** **Re-skin** (keep the demo logic). Replace people imagery. Re-render screens from K6.2. The renewal and reminder content belongs in R5.

**What it is today**
- Hero `img/cj-cnt.webp` (:1013). The lede is English-only and not wrapped in V3.L (:1015).
- Modules:
  - Cost of a slow checkout (FEAT + tiles).
  - Two films (pay-demo, visit-film).
  - Five ways to pay (6 tiles).
  - deepMods:
    - Counter step-by-step (6 steps with `img/ui` screens).
    - Online ordering (5 steps).
    - Smart locker (4 steps plus cost table).
    - "The Afya Box · a real example" (live from the 3.5 box engine `AFYABOX`).
    - Self-checkout and door check.
  - Two-way counter demo (`counterDemo`).
  - Six security layers.
  - Machines price table (MACH) and fit against the seed.
  - Five journeys (tabs, bars, steps).
  - Scan-and-go demo.
  - "Behind the 30-second payment" sequence.
  - Speed dashboard (8 gauges) and online economics.
  - Risks.
- **Five journeys and time targets (typed):**
  - Walk-in "under 3 min", target 180 s, steps 10+60+60+30+10 = "2 min 50 s".
  - Advice "under 12 min", target 720 s, steps total "10 min 30 s".
  - Online/WhatsApp "under 30 s", target 30.
  - Afya Box member "0 clicks".
  - Diaspora gift "under 2 min", target 120 s, steps total "1 min 55 s" (:845–860).
  - Speed targets (SPEED :862–870): find 1 min; find and pay 3 min; pay 30 s; repeat order 30 s; click and collect 2 h; 15:00 cut-off; WhatsApp 5 min; box 0 clicks. Credited only to "targets from the master framework" (:1104).
- **From MODEL:** conversion, basket, check_to_purchase, online orders/day, delivery fee, rider cost, avg_box, fx_usd 2,640, kiosk landed. The month-12 online revenue and the box example come from the 3.5 box engine.
- **Typed prices:**
  - Scan-and-go `PROD` 65,000 / 38,000 / 28,500 / 6,500 / 12,000 / 5,000 (:861), tagged "Illustrative prices" (:1071).
  - Counter demo CPRO (:919–921): adds knee support 22,000, "Lipid profile test · 4 values" 15,000, delivery 4,000, walker rental 30,000, **"Afya Box · Presha Care, monthly" 35,000 and "Sukari Care" 77,500**. These conflict with MODEL services packs: Presha Care 42,500 and Sukari Care 53,500 (model.js `services.packs`).
  - Basket totals "TSh 47,000" (:970, :973, :998) and "TSh 42,000" (:979).
  - Hardware approximations "about TSh 3 million … TSh 1.8 million" (:1027).
  - K2 "≈ TSh 8.3–10.0M" (:887); ESL "≈ TSh 7.8–18.7M" (:891).
  - Box fallback values `188000/184500/205500/217525/76680/161000/273500, disc .16` (:963), used if the engine fails.
  - Store and locker hours 84 h / 168 h (:990).
- **Sourced (good):** TCRA 76,466,691 accounts (:1025); NeoTech AED list prices; KORONA ESL; locker $16,187.50; Kolonell fee ≈1.5–2%.

**Rule issues**
- **B2 (foreign currency):** AED prices are converted with an AED→USD factor `2.723e-1` that is **not shown** (:884). The page shows only "1 USD = TSh 2,640" linked to Pound Sterling Live "at time of research", with **no date** (:881, :1057). MODEL has the date ("4 Nov 2026", model.js:7) but the section does not show it. USD ESL, locker and EAS figures have no rate or date beside them (:891–893).
- **B1:** door podium 0.6M, CCTV 1.5M and self-checkout 4.0M are labelled "Planning estimate" ✓. CPRO and PROD prices are tagged "Illustrative" but are not research prices. "≈ 90 s / ≈ 20 s / ≈ 25 s / 4 taps" are typed (:968, :977).
- **B4:** self-checkout "flags an age-restricted or **prescription item** for an adviser" (:1004) implies prescription items are on sale.
- **B20 / R5 inconsistency:**
  - The box example reminder is "on the 25th (reply SWAP … before the 28th)", with the calendar "Day 25 reminder · Day 28 Box list locked · Day 1 Payment request" (:999, :1001). This is a 3-day window.
  - Journey D says "Twelve days before month end" (:856), and 3.4 says "Day −12" (:1682).
  - B20 requires ≥12 days. There is no R5 reminder sequence (D-3, D-1, D0, D+2) or mandate; only "If not approved within 48 hours, an adviser calls her" (:999).
- **Blood test in the counter demo:** a "Lipid profile test" service is sold (:920), which conflicts with the R2 no-prick decision.
- **B12 (faces):** see the image table. The alt texts describe people: tired customers in a queue, a man walking out, an adviser and customer, Mama Amani at home, the door host.
- **B7:** the mixed strings listed in §0. The demo phone number "+255 754 210 318" is pre-filled (:928). It may be a real subscriber number; use an obviously fictional one.
- **C5/C7:** journey bar grow animation, neon glow on the time figure, infinite scan laser, gauge animation, hover glow.

**K1.11 inventory:** five journeys ✓, time targets ✓, clickable scan-and-go ✓, cj-* images ✓, pay-demo video ✓; visit-film is K3.

**Present but not in Part K:** two-way counter POS demo (Afya Green join with OTP and consent, simulated mobile money, card or cash); step-by-step flows with `img/ui/*` screenshots (counter, online, locker, box, self-checkout/door); smart-locker module with cost table; live Mama na Mtoto box example from the 3.5 engine; machine price table and seed fit; six security layers; 30-second payment sequence diagram; 8-ring speed dashboard; online economics figures; "Five ways to pay" tiles.

---

## 3.3 The Afya Check Station — `S['s3-3']` :1295–1491 (+ KIOSK :1177, S33 :1178–1186, MEAS :1253–1268, PROF :1269–1272, FILMS.p33f :1251)

**Part G:** Rewrite with the chosen spec and corrected measurement list. **Visual:** Still + Table. **Research:** R2 (plus R1 for TMDA).
**Decision:** **Rewrite.** Basic tier only, 50-second flow, no blood prick, corrected measurement list. Funnel from MODEL ✓ (keep it, re-skin as K2). Simulator rebuilt on the actual basic-tier list.

**Measurement list, quoted exactly (MODEL `check.free_readings`, model.js:12), 15 items:**
`'Height','Weight','Body mass index (BMI)','Body fat %','Muscle mass','Body water %','Bone mass','Visceral fat level','Basal metabolic rate','Body age estimate','Blood pressure','Pulse','Blood oxygen (SpO2)','Body temperature','Vision screening'`
- The section table MEAS (:1254–1268) carries the same 15 under shorter labels: Height, Weight, Body mass index, Body fat, Muscle mass, Body water, Bone mass, Visceral fat, Basal metabolic rate, Body age, Blood pressure, Pulse, Blood oxygen, Temperature, Vision. Of these, "10 standing values", "5 seated".
- Against R2 basic tier (height, weight, BMI, BP, SpO2, temperature, body composition): **vision screening and pulse are extra, and body composition is split into 7 derived values.** Correct this per R2.
- Kiosk start screen summary: "Height, weight, body composition, blood pressure, pulse, oxygen, temperature, vision" (:1451).

**Flow and timing:** MODEL `check.minutes:4`, `quick_seconds:50`. Headline "Fifteen measurements, free, in about four minutes" (:1303); quick check "blood pressure, pulse and oxygen in about 50 seconds" (:1304). R2 wants a single 50-second wellness flow; today the 4-minute full check is the main product.

**Kiosk price:**
- MODEL `kiosk_usd:4990` × `fx_usd 2640`.
- Landed = FOB × **1.2**, a typed multiplier (:1177), shown as "+20% freight, duty, clearance" (:1347, :1417). Computed ≈ TSh 15.8M (my arithmetic: 4,990 × 2,640 × 1.2 = 15,808,320). R2 records basic tier USD 3,267–3,630, landed ≈ TSh 9–10M.
- "falling to US$4,490 for fifty" typed (:1344).
- Spec list (97×71×232 cm, 55 kg, 15″, 0–299 mmHg, ±0.1 kg/±0.5 cm) typed from the supplier listing (:1348–1353).
- **"Add-ons later: ECG · glucose · cholesterol · urine"** (:1353) contradicts R2 basic tier.
- Technology seed line 15M against kiosk plus day-one kit gives a computed gap. Options A/B/C (:1428–1432): "about TSh 4M" is typed twice.

**Blood prick (R2 violation):**
- MODEL `paid_tests` lists Blood glucose 3,000, Total cholesterol 5,000, Uric acid 4,000, Haemoglobin 5,000, Urine 3,000, Lipid profile 15,000 (model.js:13), rendered as a table "Finger-prick with a single-use lancet" (:1373).
- Step "Optional: a finger-prick test … blood sugar for TSh 3,000" with image **`img/ac-prick.webp`** (:1382).
- Film chapter 3 "Advice, optional test, hygiene…" (:1251) and film description "one optional paid test" (:1313).
- Referral rule "Random blood sugar 11.1 mmol/L" (:1398).

**Funnel (K1.12):** `drawF` (:1484–1490) from MODEL (visitors_day_m12 × scenario demand → checks → 35% buy → sales, GP, × check_station 300,000/mo). It switches by **scenario** (base/best/down), not by funding option. Colours `#d9b56e/#5fbf8f/#f2c96b` are off-token.

**Other numbers:** WHO STEPS 25.7% / 17.6% / 2.2% sourced (:1319–1321). SiSU 180,442 checks, 192 sites, 15.8→12.9% sourced (JMIR) (:1333–1334). Capacity: `cap=floor(60/5)=12/h`, 144/day (computed); 1.7× peak and 70% threshold typed. "100 adults → 26 → 5 → <1" is derived by hand (:1324).

**Rule issues:**
- **B6:** "Afya Check follows the same model" as SiSU Health (:1331), i.e. another brand presented as the basis of the idea.
- **B12:** "AI-generated people, no real faces" (:1313). The alt texts show a man and an adviser in most stills. B12 allows invented people; K5 is stricter (faceless, back view, hands). Flag for founder.
- **B11:** none found. **B4:** none in 3.3 ("advisers never diagnose or prescribe", :1435).
- **B8:** result sentences, step names and alt texts lack sw (§0).
- **B7:** "Karibu · Welcome" (:1450); "Pima afya bure · Free health check" (:1403).
- **Honest gaps (good):** TMDA registration, validated cuff, legal review (:1359–1362, :1414).

**Present but not in Part K:** SiSU evidence module; machine spec list; referral rules table (4 levels, clinician sign-off pending); consent and privacy module (PDPA); capacity worked example; founders' kiosk-funding Options A/B/C; three illustrative profiles (Mama Neema / Baba Juma / Mzee Hamisi) in the simulator; kiosk UI screen overlays `img/ui/k-*`; paid-tests table.

---

## 3.4 Membership and cards — `S['s3-4']` :1625–1782 (+ PTS :1498, memberMath :1504, C34 :1618–1624)

**Part G:** Keep cards; add renewal flow and prepaid plans as churn defence. **Visual:** Table + flow. **Research:** R5 (and R3 for points per K1.44; the 3.5 box engine/R6 for prices).
**Decision:** **Keep logic, re-skin.** Move the waterfall to 6.2 as the worked example. **Add** the R5 renewal flow (reminders, grace, pause). Reconcile the plan discounts with 3.5.

**What it is today**
- Hero `/_blob/5adf45a1…` (cards on linen).
- Modules:
  - At a glance: 6 cards; packages count from `AFYA_PKG`; month-12 members; box sales and share.
  - Why membership (vs table, sourced 8.3%/2.2%).
  - The six cards.
  - Card↔package table.
  - Business accounts (Kazini Ndogo 5 sector kits, Afya Ofisi, Afya Hoteli, worked example).
  - Month-by-month timeline (6 figures) plus four rule tiles.
  - Member calculator (card / package / plan 1-6-12 / churn slider 1–10%).
  - How the company benefits (4 KPIs).
  - Waterfall.
  - "Why a member costs less" (3 images).
  - Members-by-scenario chart.
  - Risks table.
- **Six flip cards:** no longer CSS flip faces (`cardFace` is dead). Each card is a photo (`/_blob/…` ×6), and "See the back" crossfades to `img/cards/<key>-back.webp` (:1653, :1737). Fees come from MODEL `cards`: Green 0 · Family 20,000 · Care 30,000 · Senior 25,000 · Royal 250,000 · Kazini 0 per year (model.js:20–27). **No "estimate" label on the card fees** in the cards module (B1).
- **Members-by-scenario chart** (:1767–1773): MODEL `months[].members` for base/best/down. Scenario-based, not funding-switch. Gridlines, off-token colours.
- **Waterfall** (:1774–1781): MODEL avg_box 80,500, packing_delivery 8,500, box_products_gm 0.26, NETF, PTS, services avg margin, Family fee/12.
- **Calculator** box prices come from `AFYAMB`/`AFYABOX` engines with a fallback of `it.price × plans` (:1741).
- `up12` uses a typed "4 in 10" share (:1629), tagged Illustrative.

**Plan perks and figures (quotes)**
- **3/6/9% (3.4):** "Members save 3% off shelf prices on the monthly plan, 6% on a 6-month plan and 9% on a 12-month plan … the whole box costs about 2–3% less on 6 months and 4–6% less on 12 months … The financial model takes a cautious ${…}% and ${…}%" → renders 3% and 6% from MODEL `plans:{m1:1.00,m6:0.969,m12:0.938}` (:1688; model.js:15 comment "member saving 3% / 6% / 9%").
- **13/16/20% (3.5, part3b.js:537–540; not in my files, quoted for reconciliation):**
  - "Try … '8% below shelf price'"
  - "Silver (3 m) … '13% below shelf price on every box' … 'Pause 1 month'"
  - "Gold (6 m) … '16% below shelf price on every box' … 'Afya Points ×1.5'"
  - "Platinum (12 m) … '20% below shelf price on every box' … 'Pause 2 months', 'Afya Points ×2 and priority WhatsApp line'"
  - The engine uses `BASE=.08, PLD={1:0,3:.05,6:.08,12:.12}` (part3b.js:536).
- **Contradictions:**
  - 3.4 says 3/6/9%, but 3.5 says 8/13/16/20%.
  - The 3.2 box example shows "Member + 6-month plan discount −16%" (:996, engine `disc`; fallback `.16` :963).
  - 3.4 offers only 1/6/12-month plans; 3.5 also has a 3-month Silver plan.
  - 3.4 never names Gold or Platinum, although the brief says they are the 6/12-month plans "from 3.4".
- **Afya Points:** typed `PTS={per:1000,value:10}` ("planning estimate" in a code comment only; on page "Points worth about 1% back", :1649, :1685, :1689). **No ×1.5/×2 in 3.4** (K1.44).
- **Pause months:** absent from 3.4 (only in part3b.js:538/540). 3.4 has "Stopping · No lock-in" only (:1690).
- **Priority WhatsApp:** in 3.4 it is an **Afya Family card** perk (model.js:22; part3a.js:1620, :1662). In 3.5 it is a **Platinum plan** perk, so it is attributed two ways.

**Rule issues:**
- **B4:** "Strips, **tablets** and cuffs come with the box" (:1647) implies medicines in the box.
- **R5 gap:** no renewal reminder sequence, mandate, grace period or pause in 3.4. Monthly members "approve a mobile-money request" (:1684).
- **B20:** "Day −12" choice lock ✓ (:1682). 3.2's Day 25/28 calendar contradicts it.
- **B8:** C34/CEX example lines and the hero alt are English-only.
- **B12:** card photos "photographed in use" may show hands or faces; `cj-member` "a customer joining at the counter" likely shows faces.

**K1.13 / K1.44 inventory:** six flip cards ✓ (changed mechanism); members chart ✓; waterfall ✓; renewal flow ✗ missing. ×1.5/×2 ✗ (in 3.5), pause ✗ (in 3.5), priority WhatsApp ✓ (as a card perk).

**Present but not in Part K:** member calculator (card/package/plan/churn slider, LTV, "where each shilling goes" bar); card→package mapping table from `AFYA_PKG`; **Afya Kazini business tiers** (Kazini Ndogo with 5 sector kits `kz-duka/chakula/saluni/karakana/ofisi`, Afya Ofisi per 25 staff, Afya Hoteli per 20 rooms, restaurant worked example, OSH Rules 2015 citation "as quoted in the master model" with no link); 6-step monthly timeline; 4 KPI tiles (incl. LTV, upfront cash, Huduma and Kazini streams); "Why a member costs less" figures; risks table.

---

## Image / video inventory (every reference)

Flags: ok · faces? (alt or caption implies a person) · old-store? (store render to check against B14) · prick · check (screens or box to verify against K5/K6.2/E1).

**3.1** (STOPS :578–594, TOUR :650–653, hero :764, minimap :624/:693, footprint fp.js)
| Path | Flag |
|---|---|
| img/exterior.webp | old-store? (K5 base reference; check B14 standalone) |
| img/s-entry.webp (hero + stop) | old-store? ("glowing counter") |
| img/s-kiosk.webp | check (kiosk tier) |
| img/ac-enter.webp (tour stop 3, 3.3 hero) | faces? ("a man walks into…") |
| img/k-check.webp | faces? (adviser sits with customer) |
| img/s-baby.webp, s-heart.webp, s-mobility.webp | old-store? |
| img/s-videowall.webp | old-store? |
| img/s-lounge.webp | old-store? / faces? |
| img/s-consult.webp | old-store? |
| img/s-counter.webp | old-store? ("emerald glow at the floor") |
| img/s-esl.webp, s-checkout.webp, s-office.webp | old-store? |
| img/c-stock.webp | ok |
| img/c-seal.webp | check (box design E1/B15, gloved hands) |
| img/s-night.webp | old-store? |
| img/d/{exterior,s-entry,ac-enter,s-baby,s-heart,s-mobility,s-videowall,s-lounge,s-consult,s-counter,s-checkout,s-night}.png (depth maps, :715) | ok (technical; retire with the tour) |
| img/s-plan.webp (fp.js:102, :624, :693) | check (raster plan; K1.10 wants SVG) |
| img/s-iso.webp (fp.js:102) | check |
| img/fam/s{N}.webp?v=2 (sprite tiles, fp.js:98) | ok |
| media/store-walk-1…4.mp4 + media/p-store-walk-1…4.jpg (:599) | old-store? (K3 retire) |
| media/store-plan-1…2.mp4 + media/p-store-plan-1…2.jpg (:600) | old-store? (K3 retire) |
| media/store-walkthrough.{en,sw}.txt, media/store-plan.{en,sw}.txt (subs, :609) | ok |

Posters are `.jpg`; K3 wants WebP.

**3.2**
| Path | Flag |
|---|---|
| img/cj-cnt.webp (hero, tile) | faces? (adviser and customer) |
| img/cj-queue.webp | faces? ("queue of tired customers") |
| img/cj-receipt.webp | ok |
| img/cj-walkout.webp | faces? ("a man leaving") |
| img/cj-home.webp | faces? |
| img/cj-selfco.webp | faces? ("a customer at the self-checkout") |
| img/cj-handheld.webp | faces? |
| img/cj-phone.webp | check |
| img/cj-locker.webp | check |
| img/cj-enter.webp | faces? |
| img/cj-m-check.webp | faces? |
| img/hub.webp | check (box/packing) |
| img/boxdoor.webp | faces? / check box |
| img/cj-keypad.webp | faces? (night, customer) |
| img/cj-boxcounter.webp | faces? / check box |
| img/cj-boxhome.webp | faces? / check box |
| img/cj-exit.webp | faces? (door host) |
| img/ui/p-posm, c-basket, c-join, c-pay, m-stk, c-wait, c-paid, m-sms .webp | check (K6.2) |
| img/ui/a-home, a-checkout, a-stk, a-paid, a-sms, a-track .webp | check (K6.2) |
| img/ui/k-open, a-lsms, a-locker, k-code .webp | check (K6.2) |
| img/ui/a-box, p-posbox, c-basketbox, a-boxsms .webp | check (K6.2) |
| img/ui/s-scan, s-paid, d-ok, d-bad .webp | check (K6.2) |
| media/pay-demo-1…4.mp4 + media/p-pay-demo-1…4.jpg (:597) | check (screens per K6.2; faces?) |
| media/visit-film-1…3.mp4 + media/p-visit-film-1…3.jpg (:598) | faces? / old-store? |
| media/pay-demo.{en,sw}.txt, media/visit-film.{en,sw}.txt | ok |

**3.3**
| Path | Flag |
|---|---|
| img/ac-enter.webp (hero, "In our store") | faces? |
| img/ac-cuff.webp + img/ui/k-bp.webp | faces? |
| img/ac-studio.webp | check (kiosk tier per R2) |
| img/ac-tap.webp + img/ui/k-consent.webp | faces? |
| img/ac-grips.webp + img/ui/k-stand.webp | faces? |
| img/ac-oxi.webp + img/ui/k-spo.webp | ok (fingertip) |
| img/ac-results.webp + img/ui/k-res.webp | faces? ("adviser walks over smiling") |
| img/ac-explain.webp | faces? |
| **img/ac-prick.webp** | **prick** |
| img/ac-clean.webp | faces? |
| img/ac-leave.webp + img/ui/k-sms.webp | faces? |
| media/afya-check-1…3.mp4 + media/p-afya-check-1…3.jpg (:1251) | prick / faces? / check (4-min flow, not 50 s) |
| media/afya-check.{en,sw}.txt | ok |

**3.4**
| Path | Flag |
|---|---|
| /_blob/5adf45a12c4693ff51013063995dbac1 (hero, cards on linen) | ok |
| /_blob/fcfff253559462f95df7f299b65cbfae (Mama na Mtoto box "rose category band and QR") | check (E1: green box, gold side label, sticker) |
| /_blob/7037a386… (green), b653d447… (family), 79545ffc… (care), f81e92c6… (senior), 467233b9… (royal), 5300515a… (kazini) — card photos "in use" | faces? (hands) |
| img/cards/{green,family,care,senior,royal,kazini}-back.webp?v=2 | ok |
| img/kz-{duka,chakula,saluni,karakana,ofisi}.webp (dynamic `kz-${r.k}`, :1670) | check (alt="") |
| img/s-office.webp, img/hotel.webp | ok (places) |
| img/ui/c-join.webp, img/ui/a-box.webp, img/ui/a-boxsms.webp (timeline) | check (K6.2) |
| img/c-seal.webp | check (box) |
| img/j-delivery.webp | faces? (rider at the door) |
| /_blob/40cfe32d8a7aaae77fb5ec2f5f65eab2 ("Points, and life changes") | check |
| img/c-dash.webp | ok |
| img/c-scan.webp | check (box) |
| img/cj-member.webp | faces? |

---

## Summary table

| § / component | Decision | Visual | Research | Top issues |
|---|---|---|---|---|
| 3.1 / K1.10 tour + fp.js plan | Rebuild (stills walkthrough; SVG plan) | Hero C6.2 | — (R2 kiosk, quotes) | Not scroll-driven; no reduced motion; fp.js:34 medicines (B4); glows; teal/purple zone colours; typed fit-out/tech/area; videos to retire |
| 3.2 / K1.11 journeys + scan-and-go + counter demo | Re-skin, keep logic | Interactive | R5 | Faces in cj-*; AED rate and FX date missing (B2); Presha/Sukari prices conflict with MODEL; lipid test; "prescription item"; 3-day swap window vs B20; mixed sw strings |
| 3.3 / K1.12 kiosk flow + funnel | Rewrite on R2 | Still + Table | R2, R1 | 15-item 4-min list vs 50 s basic tier; finger-prick tests and ac-prick; USD 4,990 vs R2 band; ECG/glucose add-ons; SiSU as model (B6) |
| 3.4 / K1.13 cards + chart + waterfall | Keep logic, re-skin; waterfall → 6.2; add R5 renewal flow | Table + flow | R5, R3 | 3/6/9% vs 3.5's 8/13/16/20%; no ×1.5/×2 or pause in 3.4; "tablets" (B4); no renewal flow; scenario not funding switch |
| K1.44 points / pause / priority WhatsApp | Keep, confirm in R3 | Table | R3 | Points typed `PTS` (1 per TSh 1,000, TSh 10) shown as "≈1% back"; ×1.5/×2 and pause only in part3b.js:539–540; priority WhatsApp attributed both to the Family card (3.4) and the Platinum plan (3.5) |
