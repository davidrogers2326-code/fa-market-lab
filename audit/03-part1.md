# Audit 03: `sections/part1.js` (1.1–1.5)

File: `/home/user/fa-market-lab/showroom-original/sections/part1.js` (1,433 lines, 251 KB). Read-only audit. All line numbers refer to this file unless another file is named.

## 0. Shared machinery (applies to all five sections)

| Item | Where | Finding |
|---|---|---|
| Source registry `S1` | 67–95, plus `S1.hbs/tira/addo` at 905–907 | **31 sources, every one with a URL. None has a check date** (searched for checked/accessed/verified: nothing). Each section's footer list comes from `srcSet([...])`, which numbers the citations `[n]`. |
| Short source labels `SH` | 96 | Shown on the evidence cards as "source · year". |
| Confidence tags `CONF` | 106–107 | High / Medium / Indicative, English only. `title=` tooltip is English only. The sw-dict has "High" and "Indicative" but **not "Medium"**. |
| `M=()=>MODEL` | 102 | **Funding-switch defect.** `MODEL.get`/`MODEL.inputs` always return the flagship figures (model.js:181–183: "older sections keep the flagship explicitly"). Only one value in part1 reads `MODEL.cur` (562). Everything else ignores the 340M/150M switch, e.g. checks/day at m12 is 60 for flagship and 35 for lean, and orders/day is 25 vs 15 (model.js:14,159,75,160), but part1 always prints the flagship value (420, 538). |
| `lineChart()` | 113–132 | Inline SVG, which is fine for K2. But the series carry a `drop-shadow` glow (125), there is a gradient band, and the colours are off-token. |
| Photo kit `p1kband/p1ksplit/p1kcards/p1kmos` | 5–64 | "Editorial real-photo layouts": glow `box-shadow` in green (7), **gradient text** on `h3 em` (15), blur captions. `p1kmos` is never called (dead code). |
| Language helper `L1(en,sw)` | 908 | Used only by 1.1 (and the 400-houses legend in 1.3). Sections 1.2–1.5 print English only and depend on the `sw-dict.js` exact-text layer (index.html:1302). |
| `prefers-reduced-motion` | 1172 only | Covers CSS11B (1.1) only. Sections 1.2–1.5 have no reduced-motion rule. |

**Rule scans across the whole file:**
- **C2/B9 colours.** Off-token hex values are used throughout: `#ff9b87` coral (38×), `#c9b8ff` violet (13×; purple is rejected), `#ffb3d1` pink, `#ff7b9c`, `#ffb36b`, `#9df7d0`, `#b5dfc6`, plus `var(--neon)` on 17 lines.
- **C7 gradient text:** 15, 918.
- **C7 glows:** `drop-shadow` at 125, 498, 870–871; coloured `box-shadow` on 18 lines; `-webkit-text-stroke` outline numerals at 931.
- **Blur:** `backdrop-filter` on 8 lines.
- **C3 typography:** `text-transform:uppercase` on 40 lines, tracked eyebrows (`letter-spacing:.2em`) on 18 lines, SVG labels in all caps, and middle-dot meta strings in every module title ("The problem it solves · …").
- **C5 motion:**
  - `@keyframes` at 498 (an infinite pulse on the houses), 786 (bar grow), 1081–1165 (8 keyframes in 1.1) and 1332.
  - Staggered card entrances: `animation-delay` at 456.
  - Hover lift `translateY(-4px)` at 921.
  - IntersectionObserver reveals at 1277 and 1417.
- **B11 red crosses:** none found.
- **K5 alt text:** all `alt`/`imgAlt` strings are English only. 0 of 12 checked are in the sw-dict, and alt attributes are not translated by the text-node dict anyway. This fails Part I "alt in both languages".

---

## 1.1 The problem (`sec11`, 1352–1430; data 997–1350)

**Part G:** Keep text; replace people photos with places/hands; visual: Still. **K1.22:** rebuild the map as inline SVG, use faceless imagery, keep the chooser.

**Decision:** Keep the text. **Rebuild** the visuals: retire the month story's scroll stage and its photos, and re-skin the map on the C2 tokens. **Retire** the in-section language toggle. Treatment: **Still** (one still, plus the map as quiet inline SVG). Research: none in G. R1 should verify the ADDO/WHO/TMDA facts, and R3 should source the fares shown.

**Content today.** Hero h1 "Care moved home. / Shopping for it did not." Then 10 modules:
1. **Problem in one line + five-pains rail** (anchor jump links).
2. **"One household, one month"**: a scroll-driven sticky story (8 steps, `STORY` 1175–1207). It has a running meter (shops, hours, fares, items missing, unverified products, days without BP tablets) and "jump to a moment" day buttons.
3. **"Same month with Afya"** comparison bars (`vsHTML` 1235–1244).
4. **"A second household · one evening"**: Juma's evening player (`J11` 1283–1322), with 10 steps, play/pause, prev/next, a tally and a today-vs-Afya table.
5. **Problem map**: an inline-SVG stylised Dar district map (`mapHTML` 1245, `DIST/PINS` 1211–1212), five pins and tabs, opening a detail panel (`detHTML` 1263) with mini animated SVG infographics (`IG11` 1257–1262).
6. **"Who is most affected"**: 4 cards (`WHO11` 1034–1038).
7. **"Try it · monthly cost today"** calculator: presets `PRE11` 1039 and 4 sliders.
8. **Evidence table**: 9 rows, each with source, year and strength.
9. **Risks**: 3 items.
10. **Takeaway and doors.**

Bilingual through `L1` everywhere. **15 sources** (1352). Pain cards carry facts with a confidence tag.

**Numbers:**

*Cited facts:*
- 11,356 vs 1,334 (addo, 2018).
- +23% / 4.36M→5.38M (citypop).
- 1 in 10 (who_sf).
- TSh 360M (jnia).
- 23.1% and 72.4% (STEPS).
- TSh 3.31T (rem25).
- 27%, TSh 1.82T (nha).
- 37% (tira).
- TSh 720,946 (hbs).

*From MODEL:* `online.delivery_fee` (1354, 1236), the model version string (1394), and checks/day, check-to-purchase and churn (1267).

*Hand-typed, not labelled as estimates:*
- STORY meter values (fares TSh 1,000→6,000, 10 h, 6 shops; 1175–1207).
- Juma tallies (3 h 40, 142/92).
- PRE11 preset fares 2,000/2,500/4,000 (1039).
- "about 520 product families" (1004, 1216). **This conflicts with 527 in K1.15.**
- "six Care Zones", "4–5 registered brands", "under 30 seconds", "50-second Afya Check" (1025, 1208, 1225).
- "about 2.2 million births a year" (1035), cited to the census.

**Rule issues:**
- **B1/K4 (contradictory claim).** The month-story lead says "every number beside the story is measured" (1365). The meter's hours, fares and shops are invented, illustrative values. Only the "why it matters" facts are measured.
- **B4: implies Afya sells medicines.**
  - AF11 step 3: "the father's tablet and his strips sit side by side with 4–5 registered brands, each with a clear price" (1208).
  - AF11 step 5: iron tablets "in their box with a leaflet" (1208).
  - vs-row "Days without BP tablets → Bibi's box … delivered before the month ends" (1241).
  - J11T "Fever medicine → Registered, same day on WhatsApp" (1294).
  - MAPX[0] "Medicines, baby care, devices … sold in different shops" vs "Six Care Zones in one store" (1214).
  - EX11 "Anyone on medicine for life … epilepsy" (1256).
  - Pain 5 "money is not medicine … whether the tablets were bought" resolved by "the box" (1027).
  - **None of these mentions the licensed partner pharmacy.**
- **B7 mixed language.** The hero group `aria-label="Language / Lugha"` (1361). Otherwise text is clean through L1.
- **B8.** Module titles are passed as English strings to `secShell` (they rely on the sw-dict; "The problem in one line" etc. are in the dict). The J11 rail `aria-label` "Juma's day" (1302) and all `alt` text are English only.
- **C2/C7.**
  - Gradient text `.p11-one b` (918).
  - Neon gradient on the active language button (916).
  - Outline numerals with coral stroke (931).
  - Glow on day squares `box-shadow 0 0 8px` (981).
  - Coral `#ff9b87` as the dominant accent colour.
- **C5.**
  - The sticky scroll story is a hero-weight scroll moment, and it is not one of the four C6 moments.
  - The pain cards zoom in when scrolled into view (928, 1417).
  - 8 keyframe loops in the mini infographics and pins (1081–1165).
  - The Juma player auto-advances at 6.5 s (1318).
  - Hover lift (921).
- **K5/B12.** Many images are files named `real-*` or show people (see the list below). They are captioned "Concept image" even though K5 names `real-mother-back` as a photo of a real person.
- **A4 process narration.** "(master model v1.2)" is printed in the calculator note (1394). Minor.
- **Internal inconsistency.** Neema is Juma's wife in 1.1 (1284) and also a 27-year-old Sinza persona in 1.4 (619).
- **Duplicate toggle.** 1.1 has its own EN/Kiswahili toggle (`p11-lang`, 1362; `setLang1` 910). This duplicates the shell toggle (K1.4).

**Images (1.1):**

| Path | Built at | Flag |
|---|---|---|
| img/p1-hero.webp (hero; story step 2; alt "a mother with her baby on her back…") | 1361, 1180 | faces? |
| img/real-mother-back.webp | 998, 1184 | faces? (named in K5) |
| img/real-p-crowd.webp | 1005, 1188 | faces? |
| img/p1-untrusted.webp (hand with blister strip) | 1012, 1192 | check (hands OK; medicine imagery B4) |
| img/real-stress.webp ("worried mother… head in hands") | 1019, 1176 | faces? |
| img/p1-far.webp (elderly woman by window) | 1026, 1200 | faces? |
| img/today2.webp (mother walking between shops) | 1196 | faces? |
| img/today3.webp (crowded pharmacy queue) | 1204 | faces? |
| img/real-p-mama-load.webp | 1035 | faces? |
| img/real-health-check.webp | 1036 | faces? |
| img/real-elder-care.webp | 1037 | faces? |
| img/real-man-phone.webp | 1038 | faces? |
| img/j-asubuhi, j-foleni, j-ofisi, j-simu, j-mvua, j-duka1, j-duka2, j-duka3, j-mlango, j-usiku (.webp), built as `img/j-${s.img}.webp` | 1296, data 1284–1293 | faces? (Juma, Neema, baby, "fictional family" photos) |

There are no videos in 1.1. The Juma note points to "the video library (0.1)" (1305).

---

## 1.2 The evidence (`sec12`, 383–452; `init12` 454–482; data 333–381)

**Part G:** Keep; verify every citation link; add check dates; visual: Interactive (existing); research: R1 verify. **K1.6 / K1.23:** keep; verify links; add check dates; confidence labels in both languages.

**Decision:** **Keep** the evidence room (K1.6) and the filters (K1.23). **Re-skin.** Add check dates. Charts become token-styled inline SVG. Treatment: **Interactive (existing)**. Research: R1 verify, plus TCRA/BoT refresh.

**Content today.** Hero "The need is measured, not assumed." Modules:
1. Plain-words list, 2012 vs 2023 BP comparison, and a split photo (`today3`).
2. "Three rules for every number" (RULE 1–3).
3. Number→decision chain (5 rows, hand-typed, 386–391), plus 4 photo cards (`p1kcards`, 419–423).
4. **Waffle "100 adults on a Dar street"** (4 measures, `WAF` 377–381).
5. **Evidence room**: **33 cards** (`EVW` 340–373) with 8 theme filters and 3 confidence filters (Any/High/Medium/Indicative), plus a count.
6. **Trend charts**: rider band, then 3 chart tabs: digital-rails line chart (SVG), BP-by-group bars (HTML divs), diabetes survey-vs-model panels.
7. Risks (4).

All in English. **25 sources** (`KEYS12`, 375).

**Evidence cards.** Each card has figure, label, meaning, short source and year, a confidence tag, and a numbered link to the S1 URL. **Every card has a URL. No card has a check date.**

**Numbers.**
- *Cited and hand-typed in EVW:* 23.1%, 46.4%, 72.4%, 2.9M, 2.2%, 18.9%, >40%, 4.8→3.6, 85.0%, 30.0%, 15.4%, 5,383,728, 1,537,293, 22%→37%, 5.7%, 16.7M, 80.98M, +116%, 6.31bn, 58.9M, 42.5%, 94.0%, TSh 3.31T, TSh 837B→1.3T, TSh 698B, 1 in 10, >90%, TSh 360M, 2019/20, 27%, TSh 114,752, 14.8%, 26 Jan 2026.
- *Chart points hand-typed:* 473–475, 477.
- *From MODEL (flagship only):* `check.quick_seconds` (50), `free_readings.length`, `minutes` (4), `checks_day_m12` (60, labelled "planning estimate") at 420.

**Rule issues:**
- **B2:** "TSh 114,752 … (about USD 50)" has no rate or date (371). The model holds `fx_usd 2640, 4 Nov 2026` (model.js:6) but it is not used.
- **B5/K1.5:** "Flagship plan by month 12: 60 checks a day" (420) is hard-wired to flagship. The lean value is 35.
- **B4 (check):** "Counterfeits target the chronic-care products in the core range" and "Buying only from licensed importers" (369) present diabetes/BP drugs as part of Afya's range. The 2019/20 card and the TSh 360M card frame Afya as a medicine buyer.
- **B8:**
  - All strings are English-only source.
  - In the sw-dict: only **7 of 33** EVW labels and **18 of 33** "meaning" lines.
  - Not in the dict: "RULE 1/2/3", "Medium", "Digital rails, 2018–2026", "No cards match this filter.", and the chart legends.
- **B7 (check):** box names "Sukari Care and Presha Care" appear inside English sentences (341, 421). "Bibi na Babu box" (355).
- **R2 conflict:** "Full check: N measurements in about 4 minutes" (420) vs the brief's basic-tier 50-second flow (R2).
- **A4:** "RULE 1 · Cited from the page we opened" (411) is process narration to the investor.
- **C2/C5/C7:**
  - Theme colours are off-token: coral, pink, violet, orange (333–336).
  - Line-chart glow (125).
  - Staggered card entrance animation (456).
  - Bar width animation (479).
  - Uppercase "RULE n" labels.
- **K2:** the BP-by-group bars are HTML divs, not SVG. They are generated from data, though, so the K2 intent is partly met.
- **K1.23 gap:** the "household chooser" named in K1.23 **does not exist in 1.2**. The household chooser lives in 1.4.

**Images (1.2):**

| Path | Line | Flag |
|---|---|---|
| img/today3.webp (hero and split; "crowded … queue", "the man in this queue") | 392, 406 | faces? |
| img/check.webp ("a woman taking a BP reading … with an adviser") | 420 | faces? |
| img/prod-heart.webp (flat lay) | 421 | ok |
| img/today2.webp (mother on street) | 422 | faces? |
| img/boxdoor.webp (rider hands box to mother with baby) | 423 | faces? / old-box? (also the E1 locked box reference; check that the box matches E1) |
| img/rider.webp (rider on e-motorbike) | 440 | faces? |

There are no videos.

---

## 1.3 Market size (`sec13`, 504–574; `rings` 576–581; `init13` 583–612)

**Part G:** Keep the calculation; show the working as a table that responds to the funding switch; visual: Table; research: R3. **K1.7:** rebuild the nested circles as inline SVG with a calculation table beside it. **K1.24:** the 400-houses diagram from `model.js`, responding to the switch.

**Decision:** **Keep** the calculation logic. **Rebuild:**
- Move the 400-houses grid to the tokens and to `model.js`.
- The step list (`#p1steps`) and formula (`#p1form`) already form the "working" table. Restyle them as a real table.
- Wire everything to `MODEL.cur`.

Treatment: **Table** (+ quiet inline SVG). Research: R3 (monthly spend), and later the catchment survey for the 50%/30%/1% shares.

**Content today.** Hero "One city is a large market. Year 1 needs well under 1% of it." Modules:
1. Plain words.
2. TAM/SAM/SOM photo cards (3).
3. **The calculation**: 400-houses SVG grid on a photo background (`rings`), a numbered step list and a formula line.
4. Top-down cross-check bars (NHA → OOP 27% → Dar share → SAM).
5. Rider band with 3 stats.
6. **Market calculator**: 5 sliders, TAM/SAM/SOM outputs, a scenario switch (Base/Best/Downside), and a "% of SAM the plan needs" meter.
7. "The numbers": 5 tiles.
8. Risks (4).

**7 sources** (504).

**Numbers.**
- *Hand-typed constants (`MK`, line 486):* hh 1,537,293 (cited housing), pop 5,383,728 (cited), natpop 61,741,120 (cited census), che TSh 6,718,540M (cited nha), oop 0.27 (cited), growth 0.021 (cited/derived). **K4 requires market size inside `model.js`. It is not there** (no market block in model.js).
- *Slider defaults hand-typed, labelled `PE` "Planning estimate":* need 50%, afford 30%, win 1% (547–550).
- *From MODEL:* `members.avg_box` (80,500); `M().get(scn).y1.revenue`; `base.months[11].members`; `online.orders_day_m12`; `stores_by_year`; Year-12 revenue.
- *Hand-typed, unlabelled:* "15:00" cut-off (538).

**Rule issues:**
- **B5/K1.5 (switch inconsistency inside one module).**
  - Tile 3 uses `MODEL.cur` and labels itself start-small or flagship (562).
  - Tile 4 ("homes-equivalent") uses the flagship `base` and `box` (563). With 150M selected, the two tiles mix options.
  - The calculator "What the plan needs" (`M().get(scn)`, 599), the band "members by month 12, **flagship plan** (model)" and "25 a day" online orders (538) never follow the switch.
  - Lean values differ (orders 15/day).
- **K1.7:** the "nested circles, not to scale" diagram **does not exist**. The container is the 400-houses grid (`rings`; aria-label 539). K1.7 and K1.24 are effectively one component here.
- **B8:**
  - Step labels and the formula are English (586–609). Labels like "Grown to 2027" are in the dict.
  - The SW branch of `r_needp` is inline Kiswahili. Good.
  - The houses legend uses L1. Good.
  - "% of need homes", "× 12 months" and the `(1+g)` formula text are English.
- **C2/C7/C5:**
  - Infinite pulsing glow on the first-target houses: `filter:drop-shadow(0 0 6px #d9b56e);animation:p1cf 1.6s infinite` (498).
  - Cascading fill delays (577).
  - Cross-check bars in coral and orange (532–535).
  - Uppercase gold eyebrow "What the plan needs · Year 1" (554).
- **A4/B3:** "values marked planning estimate are founder assumptions" (520). Acceptable honesty, but it is phrased as process.

**Images (1.3):**

| Path | Line | Flag |
|---|---|---|
| img/j-aerial.webp (hero; houses background) | 508, 577 | ok (place) |
| img/c-port.webp (onerror fallback) | 577 | ok/check |
| img/today2.webp (TAM card) | 513 | faces? |
| img/boxdoor.webp (SAM card) | 514 | faces? / old-box? |
| img/exterior.webp (SOM card, "flagship at dusk") | 515 | old-store? (check against B14) |
| img/rider.webp (band) | 538 | faces? |

---

## 1.4 Our customers (`sec14`, 665–726; `pcard` 728–738; `pmap` 740–751; `init14` 753–765; data 616–663)

**Part G:** Keep six personas; faceless imagery; add monthly spend sources; visual: Still; research: R3. **K1.8:** persona cards with faceless imagery (B12) and spend sources. **K1.24 (part):** household map by frequency and urgency.

**Decision:** **Keep** the six personas and the spend logic. **Rewrite** the medicine wording. **Rebuild:** replace all persona photos, turn the map into token SVG without photo fills, and wire the numbers to `MODEL.cur`. Treatment: **Still** (one still), with the persona chooser kept as light interaction. Research: R3 (shelf prices and box prices), R6 (box contents).

**Content today.** Hero "Six core households, each with a monthly need." Modules:
1. Plain words.
2. Zone/box/card/journey **table** (6 rows, persona thumbnails), plus **6 flat-lay cards** with the 1-month box price.
3. **Frequency × urgency SVG map**: circles filled with persona photos, sized by spend.
4. **Persona chooser** (6 tabs, then `pcard` with 2 photos each).
5. **Monthly spend calculator**: household select, plan 1/6/12, top-up slider.
6. Spend table, plus a "Business customers" note.
7. **"Beyond the six"**: `AFYA_PKG.html(null,'compact')` (22 packages).
8. Risks (4).

**7 sources** (665).

**Numbers.**
- *From MODEL:* `members.avg_box`, `plans.m1/m6/m12`, `cards[].fee_year`, `store.basket`, `services.packs[...][2]` (box prices: Mama na Mtoto 192,500, Mama Mjamzito 32,000, Sukari 53,500, Bibi na Babu 82,500, Kupona 59,000, Afya Shule 43,000 per model.js:36–49), `packing_delivery_in_price`, `growth.b2b_share` (8%).
- *Persona multipliers and visits hand-typed in `PER`,* labelled "planning estimates" in a comment and the note (617).

*Hand-typed in the UI:*
- "member saving (3% monthly, 6% on 6 months, 9% on 12 months)" and "delivery at **TSh 3,500**" via `tz(3500)` (684). This is the **D4 3/6/9 vs 13/16/20 conflict that R3 must resolve.** No source link.
- "22 packages: 17 Afya Boxes and 5 Afya Kazini business kits" (716).
- "60–100 short interviews" (721).

**Spend sources:** none. K1.8 asks for spend sources, but the spend is model-derived with no shelf-price source (B1).

**Rule issues:**
- **B4.**
  - Persona products "Iron & folic acid", "Prenatal vitamins (as advised)", "Pain-relief (OTC)" (622, 628, 646).
  - "pain-relief options available without prescription" (644).
  - Abdul "cannot be sure it becomes her **tablets**" → solved by the box (650).
  - None of these mentions the partner pharmacy.
- **B7 mixed language in one label.**
  - Card kickers "Mother &amp; Baby · Mama na mtoto", "Personal Care · Mama mjamzito", "Heart &amp; Diabetes · Baba na kisukari" (686–688).
  - Persona names in Kiswahili inside the English UI ("Mama na mtoto", "Baba na kisukari", "Mwana ughaibuni"; 619–649). These names are not in the sw-dict.
  - Small-screen map labels mix "Mjamzito/Baba/Ughaibuni" with "Carer/Recovery" (749).
- **B8:**
  - Only 12 of 30 PER text fields are in the sw-dict.
  - The `sw` field holds English quotes (misnamed).
  - Map axis labels "HOW OFTEN THEY BUY →", "MONTHLY BOX CORE" etc. are not in the dict.
  - Table headers are English.
- **B16 line-up names:** "Mama Mjamzito box", "Bibi na Babu", "Kupona", "Afya Shule", "Presha Care". Check these against the B16 slugs. `AFYA_PKG` (22 packages) lives outside part1, so the boda-kit check needs model.js / AFYA_PKG.
- **B5/K1.5:** all figures come from flagship `M().inputs`. Nothing responds to the switch.
- **C2/C3/C7:**
  - Persona colours are off-token (pink, violet, coral).
  - Uppercase SVG labels.
  - Glow `box-shadow`s in the 1.4 CSS block (234–283; e.g. 241–243, 250).
  - `<select>` hard-coded `#061612`.
- **K2:** `pmap` is inline SVG, which is good. But it embeds `<image href="img/h-*.webp">` photo fills (749), which are persona faces.

**Images (1.4):**

| Path | Line | Flag |
|---|---|---|
| img/h-mm.webp (hero: "a young mother changing her baby's nappy"; persona) | 668, 655 | faces? |
| img/h-mj.webp | 656 | faces? |
| img/h-bd.webp | 657 (also 1.5 card 818) | faces? |
| img/h-cr.webp | 658 | faces? |
| img/h-rc.webp | 659 | faces? |
| img/h-ds.webp | 660 (also 1.5) | faces? |
| built `img/${PPH[x.k][0][0]}.webp` (thumbnails, CSS background, aria-hidden) and `img/h-${x.k}.webp` (map) | 661, 730, 749 | faces? (same six persona files) |
| img/boxdoor.webp (persona 2nd photo) | 655 | faces? / old-box? |
| img/prod-care.webp | 656, 687 | ok |
| img/team.webp ("Advisers who explain…") | 657 | faces? |
| img/rider.webp | 658, 660 | faces? |
| img/hub.webp (packing hub) | 659 | check (staff faces?) |
| img/prod-baby, prod-heart, prod-senior, prod-firstaid, prod-kids (.webp) | 686–691, 714 | ok (flat lays; check no readable brands, K5) |

---

## 1.5 Why now (`sec15`, 792–859; `init15` 861–884; data 770–790)

**Part G:** Keep; add mobile-money and online-pharmacy evidence from R3/R5; visual: Still; research: R3, R5. **K1.25:** seven trend strands timeline, rebuilt as a clean SVG timeline with sources per strand.

**Decision:** **Keep** the text and the seven trends. **Rebuild:** one clean SVG timeline in place of the indexed chart plus the then-and-now bars, without glow. Delete the dead strands code. **Add** the R5 (M-Pesa mandates) and R3 (AfyaDepot online pharmacy) evidence. Treatment: **Still** (one inline-SVG timeline). Research: R3, R5.

**Content today.** Hero "Seven trends converge in 2026–27." Modules:
1. Plain words.
2. **Seven trend cards** (`TR`, 795–802), each with sources.
3. **Then and now**: 6 animated bar rows with multiples (816).
4. **Indexed trend-line chart**: SVG via `lineChart`, with a series toggle, the gold 2026–27 band and violet event diamonds (`EVT` 777).
5. 6 photo cards "trends in daily life", plus a rider band with 3 stats.
6. **Year slider "data by year"**: chart cursor and "known by year" tiles.
7. Growth-rate tiles.
8. Risks (5).

**18 sources** (792). Every trend cites at least one source.

**Numbers.**
- *Cited and hand-typed:* the TS series (771–776), TR texts, and EVT dates.
- *Computed from typed figures:* `growth()` (+116%, +147%) and ×3.96 / ×6.2.
- *From MODEL (flagship):* `stores_by_year[0]→[11]` (1→47) and Year-12 revenue (849).

*Hand-typed, unlabelled:*
- "15:00 cut-off" (833, 836).
- "**three tranches (40/35/25%)**" (853). Matches flagship `seed.tranches`, but is typed by hand.
- "tranche 3 … after the store has been open 3 months with 100 Afya Box members and a monthly loss below **TSh 16M**" (855). No model reference and no funding-option switch.

**Rule issues:**
- **B5/K1.5:** the tranche terms, store count and revenue are flagship-only. The 150M option is not reflected.
- **B1/K4:** the tranche terms and the TSh 16M gate are hand-typed in the section.
- **K1.25:** the "seven trend strands converging" SVG (`conv()`, 866–874) is **dead code**. Its containers `#p1cs/#p1conv/#p1cl` are never rendered by `sec15`, though its CSS remains (305–311). If ever shown it would break C7: `drop-shadow` glow strands (870), a radial-gradient halo, and a 24 s rotating ring (871). What actually renders is the indexed line chart and the then-and-now bars.
- **C2/C5/C7:**
  - Trend colours: coral, violet `#c9b8ff`, pink `#ff7b9c`, orange.
  - Line glow (125).
  - Then-and-now bars use a green gradient and a staggered `p15g` grow animation on render (785–786).
  - Uppercase "STORE #1 OPENS" (871).
- **B8:** most strings are in the dict, but "The seven trends converge on one household.", "STORE #1 OPENS", "not yet published", "no figure by …", and the chart aria labels are not.
- **B4 (check):**
  - "the regulator is tightening control of unregistered medicine" is used as Afya's selling point.
  - The trend 6 card says "every regulated product shows its registration number" (821).
  - Acceptable if the wording makes clear that medicines come through the partner pharmacy.
- **Missing per G:** no R5 mobile-money mandate evidence and no R3 AfyaDepot online-pharmacy benchmark.

**Images (1.5):**

| Path | Line | Flag |
|---|---|---|
| img/j-aerial.webp (hero; trend card 2) | 806, 818 | ok |
| img/h-bd.webp (trend 1: Hassan) | 818 | faces? |
| img/c-pay.webp (customer approving payment on phone) | 818 | faces? / check |
| img/j-balcony.webp | 818 | check |
| img/h-ds.webp (son in Muscat) | 818 | faces? |
| img/c-inspect.webp (shelf with registration numbers) | 818 | check / old-store? |
| img/j-rider.webp (band) | 836 | faces? |

There are no videos.

---

## Things present that Part K does not mention

1. **1.1 in-section language toggle** (`p11-lang`, 1362; `setLang1` 910). It duplicates K1.4 and should be retired.
2. **1.1 "One household, one month" scroll-driven sticky story** with a live meter (1175–1244, `initStory11` 1270). K1.22 covers only the map, the chooser and "jump-to-moment".
3. **1.1 "Same month with Afya" comparison bars** (`vsHTML`, 1235).
4. **1.1 Juma evening player** (`J11`, 1283–1322): 10 photo steps, play/pause/auto-advance, tally and comparison table. K3 lists "Filamu ya Juma" as a video only.
5. **1.1 "Who is most affected"** 4 photo cards (`WHO11`).
6. **1.1 monthly-cost calculator** (sliders and presets, 1380–1395; logic 1413–1429).
7. **1.1 animated mini-infographics** in the map detail (`IG11`, 1257).
8. **1.1 nine-row evidence table** (1397–1408).
9. **1.2 waffle "100 adults on a Dar street"** (`WAF`, 377; 429–437).
10. **1.2 number→decision chain** (386–391) and **three-rules pillars** (409–413).
11. **1.2 three chart tabs** (digital rails line chart, BP-by-group bars, diabetes survey-vs-model; 444–446, 469–480).
12. **1.3 top-down cross-check bars** (529–536) and the **TAM/SAM/SOM calculator with scenario switch** (Base/Best/Downside; 541–557).
13. **1.4 monthly-spend calculator** (698–712), **spend table** (764), **business-customers note** (714), and the **`AFYA_PKG` 22-package grid** (716–717).
14. **1.5 then-and-now bars** (816), **indexed trend chart with events** (822–826), **year slider "time travel"** (838–842; 876–883), and **daily-life photo cards** (830–835).
15. **Dead code:** the 1.5 convergence-strands SVG (866–875), `p1kmos` (63), and the legacy fallback `sec11`/`initCalc` in index.html:1002/1133. The legacy code is out of scope, but it means two 1.1 implementations exist.
16. **Every section has a "Risks and our answer" block** and a "takeaway + doors" footer. These are not in K, though D2 has "open questions".

## K-component decision summary

| K | Status in code | Decision |
|---|---|---|
| K1.6 Evidence room (1.2) | Present: 33 cards with URLs, no check dates | **Keep** + re-skin; add check dates; tokens; Swahili for the 26 untranslated labels |
| K1.7 Market nested circles (1.3) | **Absent as circles.** Replaced by the 400-houses grid | **Rebuild** as one inline-SVG diagram beside a real calculation table; on `model.js`; switch-aware |
| K1.8 Persona cards (1.4) | Present: 6 personas, 12+ people photos, no spend sources | **Rebuild** imagery (faceless); **Rewrite** medicine items (B4); add spend sources (R3) |
| K1.22 Five-pains map + chooser + jump-to-moment (1.1) | Present: the map is already inline SVG; "jump-to-moment" is the month-story day buttons | **Re-skin** the map to tokens; keep the chooser; retire the photo-driven scroll story or rebuild it as a quiet still |
| K1.23 Evidence filters, confidence (1.2) | Present: theme + confidence filters. **No household chooser in 1.2** | **Keep**; translate the confidence labels and tooltips ("Medium" missing) |
| K1.24 400 houses (1.3) + household map (1.4) | Present: both flagship-only; the map uses persona photo fills | **Rebuild** as SVG from `model.js`, `MODEL.cur`-aware; no photo fills |
| K1.25 Seven trend strands (1.5) | **Strands are dead code.** Indexed line chart + then-and-now bars render instead | **Rebuild** as one clean SVG timeline with sources per strand; delete the dead code |
