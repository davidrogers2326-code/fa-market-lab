# AUDIT.md — Afya Basics Investor Showroom, Phase 0

Audit of the showroom as published on 5 Nov 2026 (artifact version 1793856736-53a6), measured against AFYA_SHOWROOM_BRIEF.md v1.0. Written 9 Nov 2026. **No showroom file has been changed.**

- **Code audited:** `showroom-original/` (index.html, model.js and all 25 section and range scripts, 8.3 MB).
- **Images:** 325 images and video posters were downloaded from the artifact and checked by eye. Brand `t-*` and `th/*` thumbnails were skipped because they duplicate larger files.
- **Videos:** the mp4 files have not been watched yet. Only their posters were checked. See K3.
- **Evidence:** every finding below has a file and line reference in the appendices under [`audit/`](audit/):

| File | Covers |
|---|---|
| [00-images](audit/00-images.md) | visual check of every image |
| [01-shell-model](audit/01-shell-model.md) | index.html, model.js, sw-dict.js |
| [02-part0](audit/02-part0.md) | 0.1–0.2 |
| [03-part1](audit/03-part1.md) | 1.1–1.5 |
| [04-part2](audit/04-part2.md) | 2.1–2.3 |
| [05-part3a](audit/05-part3a.md) | 3.1–3.4 and fp.js |
| [06-s35](audit/06-s35.md) | 3.5 |
| [07-s36-38](audit/07-s36-38.md) | 3.6–3.8 and the range library |
| [08-part4](audit/08-part4.md) | 4.1–4.5 |
| [09-part5-6](audit/09-part5-6.md) | 5.1–6.4 |
| [10-part7](audit/10-part7.md) | 7.1–7.5 |

- **Not yet compared:** the Master Framework artifact (A3) was not opened in this phase. The brief–framework comparison A3 asks for is open item O1.

---

## 1. The ten things that matter most

1. **None of Part C exists yet.**
   - None of the nine C2 colours is used, and there is no Sora font. Seven font families load.
   - The UI uses neon mint `#5fbf8f` and `#2ef5a8`, gold `#f2c96b`, purple `#c9b8ff`, teal, cyan, coral and pink.
   - Gradient text is used in every section heading.
   - There are at least 31 glow shadows, a particle canvas, 14 or more keyframe animations, and scroll-reveal plus count-up on every module.
   - A "brand guard" script strips some glows after the page renders.
   - `prefers-reduced-motion` is handled in only a few places.
   - This is a full re-skin of every section. The written content is mostly sound underneath.
2. **The funding switch only partly works.**
   - `MODEL.get()` and `MODEL.inputs` always return the 340M option, so Parts 1, 2 and 5, most of 3.1–3.4, 4.3, the range files and the dictionary ignore the switch.
   - Both options are shown side by side on the live home page ("150M · 340M"), in 5.4 ("alternative Start Small option requires TSh 150M"), in a 4.4 module, and in a 1.3 tile pair. That breaks B5.
   - In 150M mode, 5.1 shows about 389 members (injected brief) and 593 members (body) on the same page.
3. **Afya appears to sell medicines in several places, against B4.**
   - The 3.6 catalogue puts 79 medicine families on Afya's shelf, 69 of them as Afya own-label medicines (paracetamol, ibuprofen, albendazole and others).
   - 4.2 lists over-the-counter medicines as an Afya product family.
   - 4.3 offers "an Afya pharmacist".
   - Persona and box text includes "iron tablets", "her BP tablets" and "fever medicine, same day".
   - 4.5 and the model do state the rule correctly (licensed partner pharmacy), which shows the intended model. The rest of the page must follow it.
4. **The box price formula conflicts with itself, and with D4.**
   - 3.5 (`part3c.js:530`) uses 3/6/9% by plan.
   - The old engine, still used by 3.4 (`part3b.js:536`), uses 8% plus 0/5/8/12%, i.e. 8/13/16/20% below shelf.
   - Both rounding functions round up, not to the nearest 500. There is no service-fee term, and the Luxury edition adds 10% on top of shelf price.
   - 3.5 never reads `model.js`.
   - R3 must settle this once (D4 note). Until then every price on the page is provisional.
5. **`model.js` is not yet the single source K4 describes.**
   - Lines 1–186 are the model. The rest (to line 1,400) is a package catalogue, a second design system, 35 sections of injected text modules and an inline Kiswahili dictionary.
   - No assumption cites a research file.
   - Many figures are typed by hand and disagree with each other:
     - `avg_box` 80,500;
     - 17 box prices that disagree with the "from" price table (Mama na Mtoto 192,500 vs 122,500);
     - four different kiosk prices (TSh 13.2M, 15M, 15.8M, against R2's 9–10M);
     - break-even "month 11" in the text while the model computes month 10;
     - packing plus delivery at 8,000 in one place and 8,500 in another.
   - The 6.x sensitivity and founders'-pay tools re-implement the model and disagree with it by TSh 27–43M in year 1.
6. **Afya Check (3.3) contradicts R2.**
   - It promises 15 measurements in about 4 minutes, sells finger-prick paid tests (glucose, cholesterol, uric acid, haemoglobin; image `ac-prick`), and lists ECG, glucose, cholesterol and urine add-ons.
   - It prices the kiosk at US$4,990 (landed ≈ TSh 15.8M) and presents SiSU Health as the model (B6).
   - The 15-measurement claim is repeated in 0.1, 0.2, 2.x, 3.6, 3.8, 6.x and 7.4.
7. **People's faces appear throughout the imagery.**
   - About 55 images show visible faces (AI-generated, invented people), including all of the Afya Check, customer-journey, persona, team and "today" photos.
   - B12 allows invented people. K5 says every person image is replaced by a faceless shot. **A ruling is needed (decision D-1).**
   - Separately:
     - one red cross (`prod-kids.webp`, B11);
     - gold, green and white medical crosses on the old box art (`abox-hero`), a first-aid kit, the store sign in the walkthrough posters, and a WhatsApp icon (7.2);
     - glowing storefront and shelf lights (`exterior-side`, `s-night`, `s-heart`, `s-videowall`, `s-baby`) against B10.
8. **Boxes do not yet match E1.**
   - About 45 box images are old designs: all 30 `pk/*` flat-lays and the 9 `mb/*` flat-lays (green or kraft open boxes), plus the white or cream `d8/*` boxes and `abox-hero`.
   - 4.3 describes an E-flute mailer with a coloured sleeve, not a rigid lidded box.
   - Two "locked" variants exist: the doorstep reference `boxdoor` has a black band, and the three approved renders have none. **Decision D-2.**
9. **The package line-up and names do not match B16.**
   - Code has 18 boxes plus a Msingi Family box, but the names "Afya Glow", "Afya Men" and "Afya Siku" appear nowhere. The boxes are "Women's skin & care", "Men's care" and "Period care".
   - "Afya Kazini" is a set of five trade kits (duka, chakula, saluni, karakana, ofisi ndogo), and the office box is "Afya Ofisi".
   - There is no separate newborn 0–3 m, 3–6 m or business box, and shule covers ages 6–12, not 4–12.
   - The boda boda kit is correctly absent.
   - The 16 non-pilot boxes show full item lists instead of the D3 "item list in research" notice.
10. **Sources and language need work before any publish.**
    - Every section carries source links (31 in Part 1, 28 in 7.5, 101 behind the catalogue, more elsewhere), but **none has a check date** (fails Part I).
    - About 67% of catalogue prices are Kenyan shelf prices × 20, with no date on the rate.
    - USD figures in 3.3, 4.5, 5.x and 7.x lack a rate or date.
    - sw-dict.js holds about 7,670 exact-text entries and 63 regex rules, but nothing can detect a missing translation. Large blocks are English-only in Kiswahili mode: speaker notes, 7.1 steps, the 150M-option text and **all image alt text**. Mixed-language strings appear in most sections.
    - Process narration reaches the investor:
      - "Draft · ready for your review" on every section;
      - "Signed off 0/36";
      - "AI video" in a film caption;
      - "Canva";
      - "who checks the Kiswahili text";
      - "audit of the model in November 2026".

---

## 2. Decisions needed from you before Phase 1

**Status, 9 Nov 2026: all decided.** D-1 no faces anywhere (real or invented). D-2 the three no-band renders are the locked box. D-9 36 sections. D-10 the landing page is retired. D-3 to D-8 and D-11 follow my recommendation in the table. All are recorded in the brief, Part J.

These are the conflicts found in the brief, or between the brief and the showroom, that I cannot settle myself. Each one blocks a named section.

| # | Decision | What I found | My recommendation | Blocks |
|---|---|---|---|---|
| D-1 | **Faces: are invented (AI-generated) people allowed?** | B12 allows "invented people"; K5 says every person image becomes faceless. About 55 images show faces. | Follow K5: faceless only. Hands, backs and places. It is safer for investor trust and simpler to check. | Every section with photos |
| D-2 | **Which box is locked: with the black band (`boxdoor`) or without (the three approved renders)?** | E1 names `boxdoor` as the reference, but the approved renders drop the band. | The no-band renders. They are the newer approved work, and E2 generates from `afya-box-mama-na-mtoto`. | 0.1 hero, 3.5, 4.3 |
| D-3 | **Package names.** Rename "Women's skin & care", "Men's care" and "Period care" to Afya Glow, Afya Men and Afya Siku? Is Afya Kazini the office box (B16) or the five trade kits (code)? | Code and B16 disagree. J-5 already asks about Siku and Kazini. | Use the B16 names. Afya Kazini = office. Fold the trade kits into "businesses" (Afya Biashara) with sub-sizes. | 3.5, 0.1, 1.4, 2.1 |
| D-4 | **Tiers.** Code has Essential / Comfort / Luxury plus a fourth, low-income tier, "Msingi" (7% under shelf, weekly mobile-money payment, no delivery), and a Msingi Family box. The brief has Regular / Premium / Luxury. | Msingi is not in the brief. | Keep three tiers named as in the brief. Park Msingi as a Phase 3 idea in 5.4 unless you want it now. | 3.5 template |
| D-5 | **Medicines in the catalogue.** 79 families, 69 of them Afya own-label. | B4 is clear. The question is presentation. | Remove them from Afya's shelf. Show a "partner pharmacy counter" line in 3.1 and 3.6 with the partner as seller, and no Afya own-label medicine. | 3.6, 3.8, 4.2 |
| D-6 | **Cecilia on the cap table.** 6.4 names "Fahmy Abbas Cothema and Cecilia" as founders with an equity split still to be decided. | B21 says no relationship is stated. The cap table itself is a business statement. | Keep both names and show the founders' combined 25% floor as one line. Say nothing about the split until you decide it. | 6.4, 4.4 |
| D-7 | **Benchmarks named in the text** (B6): Goodlife Pharmacies as "proof from the region" (5.3), SiSU Health as the kiosk model (3.3). | Both read as a model to copy. | Keep them only as cited market evidence, in the same way AfyaDepot is a price benchmark. Remove "following their model". | 3.3, 5.3 |
| D-8 | **Phase 0 gap.** The model records TSh 33.3M of research and setup cost against a TSh 3.15M budget (6.3, 7.1). | This is not in Part J. | Add it to Part J. R4 decides how it is funded: pre-sale, a founders' bridge, or tranche 1. | 6.3, 7.1 |
| D-9 | **Section count.** The brief says 37 sections; the code and contents have 36. | 0.1–0.2, 1.1–1.5, 2.1–2.3, 3.1–3.8, 4.1–4.5, 5.1–5.4, 6.1–6.4, 7.1–7.5 = 36. | Treat it as 36 unless a section is missing from your list. | Index, PDF |
| D-10 | **Landing page.** A separate live home page (`home()`, 9 exhibits: a 69-second film, "Afya Way" principles, interior hotspots…) opens before 0.1, behind a cover dialog. | Part G makes 0.1 the home page. | Retire the cover and `home()`. Move the film to 0.1 and the hotspots to 3.1. Drop "Afya Way" or fold it into 2.1. | Phase 1 |
| D-11 | **Seed share.** The investor gets 30% in both options, so post-money is TSh 1.13B (340M) vs TSh 500M (150M). | This may be intended, but it is worth confirming. | Confirm, or set a per-option share in R4. | 6.3, 6.4 |

The open decisions already in Part J (pre-sale deposit, Mama na Mtoto as one or two boxes, buying or leasing the kiosk, the second price benchmark, Siku and Kazini scope) still stand.

---

## 3. Findings that apply across the whole page

| Area | Today | Action | Brief ref |
|---|---|---|---|
| Colours | Two `:root` token sets, none matching C2. `--neon` is used hundreds of times. Off-palette colours: purple `#c9b8ff`, cyan `#7fe3ff`, teal `#7fd6c2`/`#a8e3d4`, coral, pink, blue. Care Zone colours include violet `#7A5BB0` and teal `#11807A`. | Replace with `tokens.css` (9 values). Zone and package colours move into imagery only. | C2, B9 |
| Type | Unbounded, Manrope (never loaded, falls back to Plus Jakarta Sans), JetBrains Mono, a HUD mono, Georgia serif (51 uses in 3.5). Tracked all-caps eyebrows everywhere. | Sora 300/400/600, the C3 scale, sentence case, no eyebrows. | C3 |
| Effects | Gradient text in 3 shell rules and per-section copies. Glow shadows, drop-shadow glows, a particle canvas, an "aurora" background, "phone rig with orbit rings and a HUD", `backdrop-filter` glass panels, a dead 3D heart canvas. | Remove all of it. | C7, B10 |
| Motion | Scroll-reveal and count-up on every module, Ken Burns zooms, endless loops (scan laser, route pulses, blink, an auto-turning ring, a list rotating every 2.6 s, an autoplaying money explainer). Reduced motion is handled in only a few places. | Motion only in the four C6 moments and in direct responses to an action. Every C6 moment gets a static end state. | C5 |
| Funding switch | `setOpt` stores the choice and re-renders the section. The `afya-opt` event is fired, but nothing listens to it. Most sections read flagship-only getters. | One model API that always follows the switch. Every dependent number subscribes. Numbers animate (C6.4). | B5, K1.5 |
| Language | sw-dict replaces exact text after render (7,670 entries and 63 regex rules). Four parallel translation mechanisms, plus per-section toggles in 0.1, 1.1 and 2.2. Dictionary keys contain frozen flagship numbers. | Keep `sw-dict.js` as the one file (D1), with keyed entries. Remove the per-section toggles. Add the missing-string report script (K6.1). Alt text in both languages. | B7, B8, D1, K6.1 |
| Numbers | Many hand-typed figures in strings (detail in each appendix). Several sections re-implement model logic. | Every printed number read from `model.js`, each assumption commented with its research file. | K4 |
| Sources | Links in every section, several parallel citation systems, no check dates, and the 7.5 master list scraped from the page at runtime. | One sources footer per section (D1), generated from `research/*.md`, every link with a check date. | B1, K1.21 |
| Currency | Kenyan prices × 20 TSh/KES (date 2 Nov 2026 is only in a code comment). USD × 2,644.05 (2 Nov 2026, shown in 4.1). USD × 2,640 elsewhere with no date. AED × 0.2723 (3.2) hidden. | Show the original currency, rate and date beside every converted price. | B2 |
| Process narration | Section state badges, "Signed off 0/36", "AI video", "Canva", "framework", "Built…" notes, `MODEL.inputs…` printed in 6.x, "who checks the Kiswahili", "audit of the model". | Remove all of it. Versioning becomes "Version 2.x · date" (M5). | A4, M5 |
| Dead code | A large share of the shipped code never renders: part3b's old 3.5–3.8, part4's 4.1–4.3, the old fallback renderers in index.html, unused CSS and globals. Some of it still feeds live sections (3.4 calls the old box engine). | Remove it in the section rebuild. Keep only data that a live section still needs, and move that data into `data/`. | K7 |
| Store copy | Text still says "glass frontage", "kiosk by the glass" and "locker outside the glass". | Rewrite to B14 (protected windows). | B14 |

---

## 4. Section by section (Part G)

For each row: what Part G asks, what the audit found, the action I propose, the visual treatment and the research that feeds it. **Bold** marks a change to Part G's action.

| § | Part G | Found | Proposed action | Visual | Research |
|---|---|---|---|---|---|
| 0.1 | Rewrite | The hero is a photo (`real-mother-baby`), not the Box Opens, and the page carries 15 modules: a video library, reading paths and search, a one-page summary, the Huduma and Kazini explainers, the six moments with hotspots, the scene player, a 26-question FAQ, risks and doors. The five hero numbers are read from the model but have no "estimate" label and do not follow the switch. | Rewrite to the brief: Box Opens hero (from `preview-box-opens.html`), one line on the problem, five sourced gold numbers, the ask, the doors. Move the Huduma and Kazini explainers to 3.5 and 5.2, the FAQ and risks to 7.5 and 7.3, and the hotspots to 3.1. Keep the brand film and Filamu ya Juma (K3). | Hero C6.1 | R3, R4, R6, R10 |
| 0.2 | Keep structure | 16 slides with model numbers. Kiswahili covers only titles and the first line; 5 slides have no Kiswahili line; all 16 speaker notes are English only (the page claims both). Slide 15 is fixed to "flagship". Slide 9 shows blood-prick tests. The question map, timeline, rehearsal mode and three-scenario table are extra. | Keep the 16-slide structure; rebuild per K1.1. Write Kiswahili speaker notes. All numbers live. Remove the paid tests. | Still per slide | all |
| 1.1 | Keep text | The text is strong. It has its own language toggle, a scroll-driven month story with an invented "measured" meter, the Juma photo player, a cost calculator and a nine-row evidence table. Medicine items appear (B4). Persona and Juma photos show faces. | Keep the text. Re-skin the map (K1.22). Replace the people photos (D-1). Remove the section toggle. Label the meter as illustrative, or drop it. Fix the B4 lines. | Still | — |
| 1.2 | Keep | 33 evidence cards with URLs and no check dates. Only 7 of 33 labels are translated. Theme and confidence filters work. There is no household chooser (K1.23 expects one). | Keep. Add check dates and translations. Drop "household chooser" from K1.23 or build it. **Decision: drop it**; it duplicates 1.4. | Interactive | R1 verify |
| 1.3 | Keep calculation | The 400-houses grid stands in for the nested circles (K1.7). There are a TAM/SAM/SOM calculator and a cross-check. Market constants (`MK`) are cited but typed into the section. Flagship and 150M tiles appear side by side. | Keep the calculation. Move `MK` into the model. Rebuild as one SVG plus a calculation table that responds to the switch. | Table | R3 |
| 1.4 | Keep | Six personas, 12+ photos with faces, no sources for monthly spend, medicine items ("iron & folic acid", "her tablets"), mixed-language labels, a 22-package grid. | Keep the six personas. Faceless imagery. Source the spend figures (R3). Fix B4 and B7. Remove the package grid (it duplicates 3.5). | Still | R3 |
| 1.5 | Keep | The seven trend strands are dead code. An indexed line chart, then-and-now bars and a year slider render instead. | Keep. Rebuild as one SVG timeline with a source per strand. Add the mobile-money and online-pharmacy evidence. | Still | R3, R5 |
| 2.1 | Rewrite | Has a package-range table, promise cards, the Mama Neema week story, a segment chooser and the "We are / We are not" table. The K1.29 charts live here. Infinite animations. | Rewrite into one concept picture (store + membership + digital) and the promise. Move "We are / not" to 2.2. Move the K1.29 charts to 5.4. | Still (one diagram) | — |
| 2.2 | Rewrite | The brand palette documented here (`#0F7A52`, `#0A5A3C`, `#F2C96B`, …) matches neither C2 nor the C1 customer palette. Zone colours include violet and teal. Type is Unbounded and Manrope. The photo rules contradict B12. "Gold seal" box wording. | Rewrite against Part C: both palettes (C1 customer, C2 showroom), Sora, faceless photo style, tone, the E1 box. Keep the marks (already SVG) and the merch (check the clothing mock-ups for faces). | Still | — |
| 2.3 | Keep flow | Animated flow, the afya-chain film, an order simulator, "one sale, six updates", a stage cost table. Copy says TMDA for everything, mentions medicine imports, and has Afya ordering "syrup" (B4). | Keep the flow. Rebuild as the single scroll-animated SVG (K1.28). Fix the R1 and B4 wording. | Animated diagram | — (R1 wording) |
| 3.1 | Rewrite | A 5D drag tour with WebGL depth maps, 4 walk and 2 plan videos, a 17-stop carousel, layered floor plan (fp.js), fit-out, technology and rent tables. fp.js line 34: "Medicines sold only on advice are kept here". Glowing interiors. | Rewrite per B14. C6.2 walkthrough from 8–12 stills. SVG floor plan (180 m²) with Care Zones. Retire the walk and plan videos. Keep the fit-out and rent tables, re-skinned. | Hero C6.2 | — |
| 3.2 | Keep | Journeys, time targets, scan-and-go, a counter demo, a locker module, the pay-demo and visit films. The counter prices Presha at 35,000 and Sukari at 77,500 (model: 42,500 / 53,500). A lipid test and a "prescription item". Swap window on day 25/28 contradicts the 12-day rule (B20). | Keep the logic and re-skin. Prices from the model. Remove the lab test and prescription references. Swap window 12 days. Screens from K6.2. Faceless imagery. | Interactive | R5 |
| 3.3 | Rewrite | See finding 6 in section 1. | Rewrite on R2: basic tier, 50-second flow, the corrected list, no blood prick, R2 cost. Keep the funnel (from the model). Remove SiSU as a model (D-7). | Still + table | R2 |
| 3.4 | Keep cards | Six flip cards, the members chart and the waterfall. Savings stated as 3/6/9% here vs 8/13/16/20% in the engine 3.4 uses. Points ×1.5/×2 and pause months appear only in dead 3.5 code. No renewal flow. | Keep the cards. Waterfall moves to 6.2. Add the R5 renewal flow and prepaid plans. Perks from R3. | Table + flow | R5, R3 |
| 3.5 | Rebuild on D3 | part3c's pilot fully replaces part3b. Mama na Mtoto: 61 items, 209 products (94 Tanzanian prices, 113 Kenyan converted, 2 estimates). Every item has a reason and a source tag. Only nappies state a quantity formula. 42 of 95 rows have fewer than 4 brands. No Afya Choice brand. A toy in every baby stage. Partner services at +25% with no source. The clinic line (B16) is missing. D3 steps 1, 2, 9 and 10 are missing; 3–6 and 8 are partial; 7 works as logic. | Rebuild on D3, Mama na Mtoto first, from `data/boxes/mama-na-mtoto.json`. Reuse part3c's item research as the starting R6 input; it is the most valuable content on the page. All other boxes get steps 1–3 plus the "item list in research" notice until their R6 is done. | Hero per box + interactive | R6, R7, R3, R9 |
| 3.6 | Keep catalogue | 2,810 products and 527 families confirmed. 168 products sit in two families, so the zone rows total 3,017. 67% of prices are Kenyan × 20. No regulation flag in the live data (the only one is in dead code and says TMDA for cosmetics). A nutrition category exists (73 products), but it is not R9's age-guided shelf. 79 medicine families (D-5). | Keep as data. Add the TBS/TMDA/unregulated flag per family (R1). Remove the medicines (D-5). Rebuild the nutrition shelf on R9. Re-skin. Many extra components to decide (section 7). | Table | R1, R9 |
| 3.7 | Keep | Rent or buy is a slider with tables (the 26-week chart is dead code). Typed fees (7.5% a week, 30% deposit, TSh 15,000 delivery, TSh 5,000 cleaning). 3 gift films (the header says 8). Michango has no mobile-money screens. "USD 244" with no rate. | Keep and re-skin. Source the prices or label them as estimates. Rebuild the 26-week chart as SVG. Add Michango mobile-money steps. Fix the film count. | Still | R3 |
| 3.8 | Keep screens | All screens are hand-built HTML, not Figma exports. No Build-your-box. No renewal flow ("renew" appears 0 times). Box prices typed (Mama na Mtoto 390,000 vs 3.7's 181,000). 12 Kenyan prices shown as TSh. Aurora background and phone-rig HUD. A developer spec and many features not in Part K. | Rebuild the screens from K6.2. Add Build-your-box and the renewal flow. Prices from the model. Remove the aurora and HUD. The extra features go to section 7 for decision. | Interactive | R5, R6 |
| 4.1 | Keep | Renders from range41. Payment fees are cited (AzamPay) but are not a row in the running bill. No kiosk maintenance line (the model has 600,000 a month). Kiosk at US$4,990 with no source. The offline-mode demo exists only in dead part4 code. | Keep and re-skin. Add payment-fee and kiosk-maintenance rows. Restore the offline demo (K1.30). | Table | R2, R5 |
| 4.2 | Rewrite | Renders from range42. China (~84 days to shelf), India (~45 days) and local (1–7 days) lanes match Part G. PVoC appears only in a hidden panel. No CoC fee, CIF penalty or TBS fees. Clearing agent "TSh 600,000 estimate". "TMDA import permit week 1" breaks the 6-week rule. OTC medicines are an Afya product family (B4). | Rewrite on R1: PVoC, duties, the agent quote, the lanes. Fix B4. | Table | R1 |
| 4.3 | Keep | Renders from range43. Says delivery is inside the price (B18 met in words). Packing plus delivery disagrees three ways: 8,000 / 8,500 / rider 1,000 or 3,000 by option. Ignores the switch. Mailer box with a sleeve (not E1). 17 package films; gloves and captions not confirmed. | Keep the content. Rebuild the K1.32 visuals from the model. Re-render the boxes and films (B15). | Still + video | R3 (D4) |
| 4.4 | Keep | Store lead (physiotherapy graduate preferred) starts 2 months before opening ✓. Cecilia listed with no relationship stated ✓. A "smaller first store" module sits beside the flagship figures (B5). Shift plan in purple. | Keep and re-skin. Make the 150M content follow the switch. | Still | R4 |
| 4.5 | Rewrite | The TBS/TMDA split already matches R1 ✓. Partner-pharmacy medicine flow ✓. The fee table lacks TBS, PVoC and BRELA. The TMDA device permit is 60,000 (2011 schedule) here vs 100,000 (2024) in 4.2. "USD 200 / USD 50" with no rate. | Rewrite the fee table from R1. Keep the calendar, expiry zones, recall procedure and medicine flow. | Table | R1 |
| 5.1 | Rewrite | No pre-sale or founding-member content. The body is always flagship, while injected briefs follow the switch. The window poster is CSS over `exterior.webp`. | Rewrite to lead with the 60-day founding-member pre-sale and the first-year calendar. | Table / calendar | R4 |
| 5.2 | Keep | Partner value matrix, school worked example, pipeline, Kazini employer dashboard. No provider terms, no business or hotel packages. | Keep and re-skin. Add R7 provider terms and R8 accounts. | Table | R7, R8 |
| 5.3 | Rewrite | Positioning map with a radial glow. Goodlife used as "proof". No AfyaDepot. The moat is adjectives, not the member-price number. `real-p-sold-out` is used here. | Rewrite: the moat as member price vs shelf, plus services. AfyaDepot as a benchmark point. Goodlife per D-7. | Table | R3 |
| 5.4 | Keep scenarios | Eight stages, stores per year, cumulative cash. Shows 340M and 150M side by side (line 1094). No launch phases, no Apollo goal line. | Keep the scenarios. Add the three launch phases and revenue gates. Apollo as a goal (B6). Fix B5. | Table | R4 |
| 6.1 | Keep model | Charts are inline SVG with drop-shadow glows. The sensitivity tool disagrees with the model (−66M vs −93M year-1 profit, flagship). The 12-year figures are identical in both options. | Keep the model. Rebuild as the funding-switch hero. Delete the duplicate maths; the tools call the model. | Hero C6.4 | R3, R1, R2 |
| 6.2 | Keep | Splits the TSh 80,500 average box, not the D4 decomposition. | Keep. Add one box's D4 price decomposition (from 3.4's waterfall). | Table | R3 |
| 6.3 | Rewrite | In 150M mode the use-of-funds detail lines shift under the wrong headings from line 5 on, and the motorbike card shows TSh 0M. Gate 150 members vs milestone 100. No compliance line. The kiosk is folded into "Technology". The hidden side-by-side module holds the founders' "preferred path" text. | Rewrite: tranches against pre-sale milestones; compliance and kiosk lines; fix the 150M mapping. Delete the hidden side-by-side module. | Table | R4, R1, R2 |
| 6.4 | Keep | Cap table, founders' 25% floor, protections, sale calculator, dilution simulator. The pay tool shares the faulty `sim()`. | Keep the logic and re-skin. Route through the model. D-6, D-11. | Interactive | — |
| 7.1 | Rewrite | 15 steps with status (kept in localStorage). R1 facts missing: TBS since 2019, GN 681, TBS fees, PVoC, 15% CIF penalty, BRELA ~217,200 (code says 1.2M), UBO date. Step costs total TSh 15.6M, hand-typed. Trip planner, location scoring and Phase 0 gap tools. | Rewrite the steps from R1. Keep the status control and the research and travel budget. | Table | R1 |
| 7.2 | Keep | Five seats, four votes, reserved matters, spending limits, investor pack, WhatsApp report (cross icon, floating phone with shadow), access matrix. | Keep and re-skin. Re-render the report on the customer palette with no cross. Build so it can later become the reporting layer (J-6). | Table | — |
| 7.3 | Rewrite | 22 risks, heat map in off-palette colours. Missing: churn, build-before-demand, scope, payment collection, kiosk failure. Regulation present, but without TBS or PVoC. | Rewrite the rows with answers from R1–R5. Keep the heat map, search and sort. | Table | R1–R5 |
| 7.4 | Keep | Sourced measures (some old: WHO 2012 and 2003). Jobs chart from the model (8→376 / 5→235). "15 measurements". | Keep. Re-skin the chart (K2). Fix the R2 claim. | Still | — |
| 7.5 | Rebuild sources | 30 questions in 7 categories, none of the four new ones. 28 section sources with no check dates. The master list is scraped at runtime. The data room and open-questions board narrate process. A stale "pharmacist (option B only)" line. | Rebuild the sources from the research files. Add the four questions. Remove the process narration. | Table | all |

---

## 5. Component inventory (Part K1)

Decisions: **Keep** (logic and content stay, re-skinned on Part C), **Rebuild** (new implementation), **Rewrite** (new content), **Replace**, **Retire**.

| K | Component | Status in code | Decision |
|---|---|---|---|
| K1.1 | Presenter mode | 16 slides, timer, notes, shortcuts. Notes English only; Kiswahili partial. | Rebuild. Notes in both languages; numbers live; Canva export (K6.3) later |
| K1.2 | Scene player | 6 scenes × 10 s with photo backgrounds | Replace with the Box Opens + five numbers + doors; keep the chapter timestamps as the reading path |
| K1.3 | Reading path / chapters | 286 px rail with accordion and overlay; reading paths and search also live inside 0.1 | Rebuild as the D1 index and phone bottom sheet; remove the 0.1 copies |
| K1.4 | Language toggle | Rail buttons plus duplicate toggles in 0.1, 1.1 and 2.2 | Keep one global toggle; remove the duplicates |
| K1.5 | Funding switch | Partly wired (finding 2) | Keep; rewire so every number follows; numeric animation |
| K1.6 | Evidence room | 33 cards with URLs, no dates | Keep; add check dates and Kiswahili |
| K1.7 | Market nested circles | **Absent** (the 400-houses grid is used instead) | Rebuild as SVG beside the calculation table |
| K1.8 | Persona cards | 6 personas, photos with faces | Keep the content; faceless images; spend sources |
| K1.9 | Nine-module system diagram | **Lives in part0, part4 and range41**, not 2.3. A six-module hub label in 2.x. | Rebuild as one SVG, defined once. Animated only in 2.3; static in 4.1 |
| K1.10 | 5D store tour | Drag tour, WebGL depth maps, 17 stops, 4 walk and 2 plan videos | Replace with the C6.2 stills walkthrough; stops become labelled points; SVG plan; retire the videos |
| K1.11 | Journeys + scan-and-go | Present, plus the counter POS demo and locker module | Keep the logic and re-skin; screens from K6.2 |
| K1.12 | Afya Check flow + funnel | 4-minute, 15-item flow; finger-prick tests | Rewrite on R2; funnel from the model |
| K1.13 | Card flip, members chart, waterfall | Present | Keep and re-skin; waterfall → 6.2; renewal flow added |
| K1.14 | Box chooser, calendar, price charts | Calendar, price ladder and 24-month chart exist **only in dead part3b**. Live part3c has a library, pickers and a receipt (already effectively Build-your-box). | Rebuild inside D3. Build-your-box (C6.3) grows from part3c's receipt logic. The calendar becomes D3 step 9 |
| K1.15 | Catalogue search | Present (lazy-loaded library) | Keep; add the regulation column and nutrition shelf; re-skin |
| K1.16 | Rent vs buy, premium ideas, gift films, Michango | Slider and tables (the chart is dead); 3 films | Keep; rebuild the chart as SVG; source the prices; Michango with mobile money |
| K1.17 | Online store, app screens, WhatsApp demo | Hand-built HTML | Rebuild from K6.2; add Build-your-box and renewal |
| K1.18 | Cap table, ring, scenarios, sale calculator, investor pack | Present; ring and cap table are SVG; tools re-implement the model | Keep the logic; route through the model; re-skin |
| K1.19 | Risk register | 22 rows | Rewrite the rows |
| K1.20 | Investor Q&A | 30 questions (plus a separate 26-question FAQ in 0.1) | Keep in 7.5 only; add the 4 new questions; retire the 0.1 copy |
| K1.21 | Sources footer | Several parallel systems | Rebuild per D1 from the research files |
| K1.22 | Five pains map | Inline SVG, chooser, day buttons as jump-to-moment | Re-skin; keep the chooser |
| K1.23 | Evidence filters | Theme and confidence present; no household chooser | Keep; translate; drop "household chooser" (duplicates 1.4) |
| K1.24 | 400 houses + household map | Flagship-only; persona photo fills | Rebuild as SVG from the model; follows the switch; no photos |
| K1.25 | Seven trend strands | Dead code; other charts render | Rebuild as one SVG timeline |
| K1.26 | Concept diagram | Present in 2.1 among many modules | Rebuild as the single still for 2.1 |
| K1.27 | Brand kit | Marks, swatches, contrast checker, type tester, voice switcher, merch lightbox | Keep the marks and merch; rewrite to both palettes; remove the in-section toggle |
| K1.28 | Supplier-to-aftercare flow | Animated, with film steps | Rebuild as the one scroll-animated SVG |
| K1.29 | Stores by year, revenue by channel | In 2.1 and 5.4; the stores chart has no scenario switch | From the model; 3 scenarios; switch-aware; shown in 5.4 |
| K1.30 | 4.1 demos | Live range41 has a 7-step story and dashboard tabs; the order chooser and offline toggle are **dead part4 code**; the "one sale" demo also exists in 2.3 | Keep the logic; restore the offline demo; one "one sale" demo (in 4.1) |
| K1.31 | Import timeline, lanes, stock, fees | Present in range42 | Rebuild from R1 and the model |
| K1.32 | Delivery zones, payment vs cost, box calendar | **Dead part4 code**; range43 has an OSM simulator instead | Rebuild as SVG; cost recovered inside the price |
| K1.33 | Org chart, shift plan | Present; store lead and Cecilia ✓ | Keep and re-skin |
| K1.34 | Compliance calendar, expiry, recall, medicine flow | Present; partner pharmacy shown as seller ✓ | Rebuild visuals from R1; keep the flow |
| K1.35 | Growth loop, funnel, poster | No pre-sale; the poster is CSS over the old exterior | Rewrite around the pre-sale; poster re-rendered |
| K1.36 | Partner value matrix | Present | Keep; add R7 and R8 rows |
| K1.37 | Positioning map | Glow background, no AfyaDepot | Rebuild as SVG; add AfyaDepot |
| K1.38 | Growth stages, stores by city, cash | Present | From the model; add the launch phases |
| K1.39 | Revenue/profit chart, jobs chart | The jobs chart is in 7.4 (not 6.1); a revenue sparkline is in 7.2 | From the model; one chart style |
| K1.40 | 15-step checklist | Present, with status | Rewrite the steps from R1; keep the status control |
| K1.41 | Board seats, WhatsApp report | Present | Keep; re-render the report on the customer palette |
| K1.42 | Risk heat map, search and sort | Present | Keep the logic; on-palette colours |
| K1.43 | Question and source search | Present | Keep; sources from the research files |
| K1.44 | Points, priority WhatsApp, pause | Points `PTS` in 3.4 (≈1% back); ×1.5/×2 and pause only in dead 3.5; priority WhatsApp attributed to two different products | Keep; confirm the values in R3; state once, in both languages |
| K1.45 | Range data files | lib.js (2,810 rows), sum.js, libtx-* (zone libraries), fp.js | Keep as data, moved to `data/`; add the regulation flag and nutrition shelf |

---

## 6. Charts, videos, model, images, companions, platform (K2–K7)

**K2 Charts.**
- Charts are already inline SVG throughout: model.js has a 19-type chart library, plus each section's own charts. The good part of K2 is in place.
- Every chart breaks the K2 style: neon series, drop-shadow glows, gradient fills, gridlines.
- Decision: keep the chart library, re-skin it to K2 (hairline axes in `--line`, series in `--green`/`--gold`, labels in `--mute`), and delete the per-section duplicate chart code.

**K3 Videos.** Found on the artifact (mp4, not yet watched frame by frame):

| Video | Where | Poster check | Decision |
|---|---|---|---|
| afya-boxes-film (15.7 MB), afya-box-ad (14.1 MB) | 3.5, 4.3 (not in 0.1) | Box-ad poster shows the E1 box, hands only ✓ | Watch frames; keep if no faces and no old box; add to 0.1 |
| Brand film, Filamu ya Juma 1–2 | 0.1 | Juma posters: faceless (car) ✓ / exterior ✓. Brand-film poster: exterior | Keep; the brand film's built-in figures (TSh 800M, month 10, 47 stores, TSh 80B) cannot follow the switch → re-cut or overlay |
| afya-check-1/2/3 | 3.3 | Faces; 15-measurement claim; blood-prick flow | Re-render on R2 (K3) |
| pay-demo-1…4 | 3.2 | Faces on 1–2 | Re-render from K6.2 |
| visit-film-1…3 | 3.2 | Faces ("Meet Mama Amani") | Re-render faceless |
| store-walk-1…4, store-plan-1/2 | 3.1 | Green cross on the store sign | Retire (C6.2 stills replace them) |
| afya-chain (EN/SW + VTT) | 2.3 | Faceless (document) | **Not in K3**; keep and re-link to K1.28 |
| Package films (`AFYA_PACKF`) | 4.3 | 17 packages, EN/SW; Mama na Mtoto filed under `fam`; pregnancy has none; 4 point to `media/pk/*` | Check frames for gloves and E1 box; add captions; also show in 3.5 (D3 step 8) |
| 3.5 film tab (`FILM`, 18 blobs) | 3.5 | Single language | **Not in K3**; merge with the package films |
| Gift films ×3, range films | 3.6–3.7 | `AFYA_FILMS` undefined; fallback `media/range/*` not on the artifact | Confirm what exists; re-link or retire |
| 69-second home film (EN/SW blobs) | home() | — | **Not in K3**; decide with D-10 |
| Shelf-display film, customer sample film | — | Not made yet | New (K3) |
| Caption files | — | `.txt` transcripts exist for 7 films; VTT for afya-chain | Every film needs EN and SW captions |
| Score audio `media/e1/score.mp3` | 4.1 | — | **Not in K3**; check it never autoplays |

**K4 Model.** See finding 5 in section 1, and [appendix 01 §3](audit/01-shell-model.md).
- Decision: rewrite the model core as `model.js` (assumptions + derived figures only, each assumption commented with its research file), reading from `data/prices.json` and `data/boxes/*.json`.
- Move the package catalogue to `data/`, the design system to `tokens.css` plus a components file, the injected text modules into their sections, and the inline dictionary into `sw-dict.js`.

**K5 Images.** Disposition of the 325 images checked (detail in [appendix 00](audit/00-images.md)):

| Group | Count | Decision |
|---|---|---|
| Visible faces (ac-*, cj-*, h-*, j-*, today*, team, most real-*, posters) | ~55 | Replace per D-1 |
| Old box designs (pk/* 30, mb/* 9, d8 boxes, abox-hero, j-box) | ~45 | Re-render from E1 when each package's R6 is final (E4 order) |
| Store renders with glow or glass front (exterior, exterior-side, s-night, s-heart, s-videowall, s-baby, s-counter, m-door) | 8 | Regenerate in the C6.2 walkthrough set |
| Crosses (prod-kids **red**, prod-firstaid, s_school, abox-hero; store sign in posters) | 5+ | Replace; no cross symbols on Afya imagery |
| Kiosk (ac-prick; two kiosk designs) | — | Retire ac-prick; one kiosk design after R2 |
| Product flat-lays with readable brands (d8/pr, fam/s0–s3) | 5 | Unbranded until R6 confirms brands |
| Text baked into images (posters, grand-poster, brochure mock-ups) | ~12 | EN+SW versions or no text (D1) |
| Faceless places, hands, products, merch, cards, warehouse, port | the rest | Keep (re-check at full size before reuse) |
| Duplicates (same file under two names) | 7 pairs | Keep one of each |

Four images the brief names for replacement (`real-mother-baby`, `real-mother-back`, persona and team images) are mostly confirmed. One exception: **`real-mother-baby` is in fact faceless** (hands and a baby's feet). It can stay if D-1 allows it.
All alt text is English only.

**K6 Companions.**
- K6.1: the missing-translation report script does not exist yet.
- K6.2: there is no Figma app design; every screen is hand-drawn.
- K6.3: a Canva deck link exists in part0 (`canva.link/jqb4gd2snqa5bpx`). It is not checked against the 16 slides.
- K6.4: there is no investor PDF; a one-page summary exists in 0.1.
- K6.5: there is no research folder; research lives inside the section code.
- K6.6: this file. CHANGELOG.md starts in Phase 1.

**K7 Platform.**
- The structure (index.html + `sections/*.js`) is kept.
- The page uses localStorage for funding option, reading progress, the 7.1 tracker, trips and location scores. Per the artifact rules these must be wrapped in try/catch and treated as conveniences only. The 7.1 tracker status should move to a runtime capability if it must persist across viewers.
- The published page also references `/_blob/` asset ids, about 146 of them. These must stay attached when the page is republished.
- Keyboard focus rings are not gold. Count-up and reveal delay the first screen. Total page weight is not yet measured.

---

## 7. Found in the showroom but not listed in Part K

Part K asks that nothing be dropped silently. Each item below has a proposed decision (Keep, Fold into another component, or Retire). Your approval of this file approves these defaults unless you mark a change.

**Shell and model**
- Cover dialog: seal, particles, counters → **Retire**; keep the motto text.
- Live home page `home()`, 9 exhibits → **Retire** per D-10; the film goes to 0.1, the hotspots to 3.1.
- Dead renderers: stale "TSh 110M ask" player, old 1.1, placeholder grid, 3D heart canvas → **Retire**.
- Brand-guard script, "Signed off N/36", section state badges → **Retire**.
- `AFYA_PKG` catalogue in model.js → **Fold** into `data/boxes/`.
- Afya Huduma service packs and the Afya Kazini business model in the model → **Keep** the logic; inputs from R7/R8.
- Editorial component set (lede, kpis, calc, story) and V3MODS/V3DROP section injections → **Keep** the components, re-skinned; **move** the text into the sections.
- Afya card yearly fees (Royal TSh 250,000) → **Keep**; state in 3.4.
- Phase 0 gap → see D-8.
- Growth path to Nairobi and Kampala → **Keep** in 5.4.

**0.1 and 0.2**
- Video library (11 films) → **Keep** as a quiet film list in 0.1 (brand film and Juma); the other films go to their own sections.
- One-page summary (print) → **Fold** into K6.4 (investor PDF).
- Fair-deal table, "Build your care", partner onboarding → **Fold** into 3.5 step 5 and 5.2.
- "Where every shilling goes" money explainer (autoplays) → **Fold** into 6.2; no autoplay.
- Kazini trade cards → **Fold** into the business packages (D-3).
- Six-moments editorial → **Retire** from 0.1.
- 0.2 question map, ten-minute timeline, rehearsal mode → **Keep** inside presenter mode.
- Three-scenario table → **Keep**, switch-aware.

**1.x**
- Scroll-driven month story with meter → **Rebuild** as a still, or retire.
- Juma evening photo player → **Fold** into Filamu ya Juma.
- Cost calculator, spend calculator, TAM/SAM/SOM calculator, cross-check → **Keep**, from the model.
- Waffle "100 adults", chart tabs, then-and-now bars, year slider → **Keep** at most one chart per section (D2); retire the rest.
- 22-package grid in 1.4 → **Retire** (duplicates 3.5).
- "Risks and our answer" block in every section → **Fold** into D2 "open questions"; the full register stays in 7.3.

**2.x**
- Package table, promise cards, week story, segment chooser → **Retire** from 2.1 (2.1 is one picture).
- Contrast checker, type tester, mark anatomy, icon set, misuse rules, touchpoint row → **Keep** in 2.2 (they are the brand documentation).
- Voice switcher (second language toggle) → **Rebuild** without its own toggle.
- 2.3 order simulator and stage cost table → **Keep**.
- "One sale, six updates" → **Fold** into 4.1 (single instance).
- Dead touchpoint mock-ups ("TIN: 000" receipt) → **Retire**.

**3.1–3.4**
- Time-of-day toggle, WebGL depth maps, 17-stop carousel → **Retire** (C6.2 replaces them).
- Floor-plan layers and tables, fit-out, technology and rent tables → **Keep**, re-skinned.
- Counter POS demo, locker module, six security layers, machine price table → **Keep**.
- Kiosk consent and privacy (PDPA), referral rules, capacity example → **Keep** (rewritten on R2).
- Funding options A/B/C for the kiosk → **Fold** into J-3.
- Three illustrative profiles → **Keep**.

**3.5**
- Msingi tier and Family box → D-4.
- Household plans (multi-box, 2% for 3+) → **Keep** if R3 confirms the saving.
- "How Afya earns" split and six strategy cards → **Fold** into 6.2.
- Membership simulator → **Rebuild** on the model, or retire.
- Lishe shelf cart → **Fold** into R9's nutrition shelf.
- Hotspot pins and thumbnail sprites, box search, package codes → **Keep**.
- Quantity adjuster and "I already have this" → **Keep** (they serve Build-your-box).
- Partner-pharmacy medicine line (sealed bag) → **Keep**; this is the correct B4 pattern.
- Package colour hex values used in the UI (`BOXV2`) → **Retire** from the UI (C2).

**3.6–3.8**
- Guided tour, Care Zone explorer, product locator, winning-products spotlight, seasons calendar, warehouse film, product lifecycle → **Keep** the explorer and locator; **retire** the auto-turning ring and the count-ups; one primary visual per section.
- Shelf planner and investor buying desk → **Keep** (strong due-diligence tools).
- Afya Gives, Pass-it-on fund, Care-from-afar planner, rental fleet planner, impact simulator, corporate care line → **Keep** in 3.7 if each has a source or is labelled as an estimate.
- Afya Twin refill predictor, Afya Verified scan, Scan the Empty, Care Circles, Four doors with SMS keypad, Kiswahili voice ordering, night operations, LTV and churn slider, "Us vs the market", developer spec → **Keep** Four doors and the LTV slider (it moves to 5.3/6.x). **Move the developer spec out of the investor page** into K6.2's design file. **Retire** the phone-rig opening scene. The rest are kept only if they are real roadmap items, as labelled roadmap.

**4.x**
- 4.1 stack and running bill, access matrix, data inventory, build plan, year chooser, glossary, reader panel → **Keep**.
- 4.1 slideshow "film" → **Retire**.
- 4.2 product families with regulator, candidate wholesalers, landed-cost calculator, factory-to-shelf waterfall, import cash chart, reorder simulator, quality gates, permits table, 12-week plan → **Keep**, rewritten on R1.
- 4.3 packaging engineering, die-lines, inserts, QR demo, unboxing layers, paper bags (GN 291), Rudisha box return, display wall, OSM delivery simulator, rider app → **Keep**; box visuals re-rendered on E1.
- 4.4 day timeline, SOP checklists, handheld demo, payroll calculator, hiring cost, career path → **Keep**.
- 4.5 product regulation tier table, shelf-entry checks, FEFO demo, licence readiness ring, quality KPIs → **Keep**.

**5.x and 6.x**
- Acquisition channels, budget split, ad worked example, customer mock-ups, campaigns, retention practices, CAC/LTV → **Keep**, led by the pre-sale.
- Partnership pipeline, referral slip, employer dashboard, B2B slider → **Keep**.
- Competitor cards, comparison matrix, switching moments, seven-advantage moat → **Keep** the matrix; the moat restated as numbers.
- One-store economics, stage gates, 90-day playbook, store-opening slider → **Keep**.
- 6.1 engine tree, P&L tables, cash derivation, sensitivity tool → **Keep**, routed through the model.
- 6.2 coverage map, "where each shilling goes" → **Keep**.
- 6.3 follow-your-investment calculator, Phase 0 gap options → **Keep**.
- 6.4 dilution simulator, founders' pay tool, protections → **Keep**, routed through the model.

**7.x**
- Regulator map, swim-lane timeline → **Keep**.
- Seed tranche cards → **Retire** (duplicates 6.3).
- Trip planner and location scoring → **Keep** in 7.1.
- Reserved matters, delegation matrix, approval finder, investor-pack mock-up, governance calendar, access matrix → **Keep** in 7.2; this is the base for J-6.
- Scenario bars, top-five risk cards → **Keep**.
- Impact calculator, theory of change, SDG cards, impact dashboard → **Keep** in 7.4.
- Data-room index and open-questions board → **Keep** the data room. **Move the open-questions board to CHANGELOG/NOTES** (it is process).
- localStorage persistence → see K7.

---

## 8. Brief vs Master Framework and Chapter 1 (read 9 Nov 2026)

**Master Framework** (`5xoU6WV8eFH5CAdoE8sg5g`, updated 1 Nov 2026). It is a light-themed handbook covering: vision, the five pains, the promise, positioning, the three layers (Experience / Engine / Economics), the Afya Way, journeys A–E with time targets, ten system modules, a nine-block section template, the 36-section map with source documents, brand, showroom style, the model, the build steps, decisions and open questions. Where it differs from the brief, **the brief wins** (A3):

| Topic | Framework says | Brief (wins) | Effect |
|---|---|---|---|
| People in images | Real free-licence photos (Pexels, Unsplash) of Tanzanians, labelled "Photo" (decision of 1 Nov) | No faces at all (B12 as updated 9 Nov) | All people photos are replaced; no stock photos (C7) |
| Showroom style | Dark green-black, glass panels, thin gold lines, "subtle glow on what you can click" | Black, no glows, no glass (C2, C7) | Glass and glow dropped |
| Fonts | Unbounded, Manrope, JetBrains Mono | Sora only (C3) | — |
| Logo | "The Afya cross with the heartbeat line" (its own icon is a white cross) | House-and-heart emblem as on the box; no cross symbols (B11, E1) | The house-and-heart emblem is the mark |
| Section template | Nine blocks: promise, problem, answer, how it works, experience, try it, numbers, risks and answer, investor takeaway | D2: number and title, summary, primary visual, body, key figures, cost/earn table, open questions, sources | D2 used. The framework's "risks and answer" maps to D2 "open questions"; the "investor takeaway" line is kept as the summary's last sentence |
| Seed | TSh 110M (to be confirmed) | Two options, TSh 340M / TSh 150M, switched (B5) | 110M is stale everywhere |
| Afya Check | 10 measurements, 5-minute flow (3.3); journey B "under 12 minutes" | R2: basic tier, 50-second flow | 3.3 rewritten on R2 |
| Membership cards | Five cards | Six cards in the showroom (Green, Family, Care, Senior, Kazini, Royal) | Keep six until R3/R5 say otherwise |
| Boxes | "17 boxes"; average box TSh 85,000 vs mix-weighted 131,000 open | 17-box line-up per B16; prices from D4 | Average box price comes out of R3; noted for 6.x |
| Services (Afya Huduma) | Four layers; partner 70%; member ~12% off; add-on commission 10%; 25% markup | B19 hybrid model, priced so all three sides gain | Consistent. R7 confirms the numbers |
| Afya Kazini | Business membership in three sizes (1–9, 10–50, 51+ staff) plus five sector kits | B16: Afya Kazini = office box; D-3 moves the trade kits under "businesses" | Sizes kept; naming per D-3 |
| Films | Soft music, **no voice-over**, captions in both languages | K3/E2: narrated in both languages, soft music | Brief wins (narration). Captions in both languages either way |
| Swap window | Reminder 12 days before | B20: at least 12 days | Consistent |
| Sign-off | Fahmy and Cecilia approve each section | A4: founder approves each section | Consistent |
| Phase 0 gap | TSh 32.8M vs 3.15M budget | Model: TSh 33.3M | Figure moved; R4 settles it (D-8) |

**Chapter 1** (`Dkyk4ZFi3nQ56p6qUYnh27`, 4 Nov 2026), "Care has moved home. Shopping for it has not." This is a long-form editorial chapter in six parts:
1. Disease and control: 23.1% raised blood pressure (2023 STEPS); cascade 17.6 / 8.3 / 2.2 per 100; 72.4% of diabetics undiagnosed; a Dar worked example from the 3,077,657 adults aged 20–69 in the 2022 census.
2. Supply: 11,356 ADDOs vs 1,334 pharmacies (2018).
3. Trust: WHO 10.5%; a TMDA seizure worth TSh 360M (Sep 2026).
4. City: Dar population 2.49M (2002) → 5.38M (2022).
5. Channel: 80.98M mobile-money accounts, 58.9M internet subscriptions, 42.5% smartphones (Mar 2026); diaspora remittances TSh 3.3T at TSh 2,640/US$.
6. The household: Juma's evening, 4 h 55 min.

It also has a "limits we state openly" box and 12 numbered sources. Its charts are inline SVG with sourced captions.

- **Reuse:** the text, numbers, worked examples, limits box and sources go into 1.1–1.5 in Phase 6. Every figure there is already sourced, which is the quality bar for the rest of the page.
- **Not reused:** its design: Literata and Source Serif fonts, gold `#c9a456`, entrance animations, parallax, count-ups, people photos (`j-*` with faces).
- **Fix:** "iron tablets" and "a fever medicine" in Juma's list need the partner-pharmacy note (B4) or a change to the list.

## 9. What happens after approval (Phase 1, Part H)

Phase 1 is foundations only. No research text changes yet.
1. Work inside `afya-showroom/` on the session branch (each phase is marked in the commit history and CHANGELOG, because this session can only push to its one assigned branch); copy `showroom-original/` to the working `showroom/` folder.
2. `tokens.css` (C2) with Sora, the type scale, spacing and focus rings; dark/light not needed (the showroom is black by design).
3. Global shell (D1): top bar, EN|SW, funding switch from 1.3, left index and phone bottom sheet, sources footer, version line. Retire the cover, `home()`, the brand guard, badges and the dead renderers.
4. The model API fix so the switch reaches every section. The number values stay as they are until Phase 2 research.
5. Reusable D2 section and D3 package templates.
6. Extend `sw-dict.js` and add the missing-string report script.
7. Migrate 0.1 onto the new shell with the Box Opens preview. Item labels stay "item list in research" until R6. Phase 1 screenshots at 360 px and 1280 px in both languages, then stop for approval.

The decisions in section 2 (D-1 to D-11) are needed before the sections they block. D-1, D-2, D-9 and D-10 affect Phase 1 directly.
