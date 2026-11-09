# 04 — sections/part2.js (2.1 concept · 2.2 brand · 2.3 how it all works)

File: `showroom-original/sections/part2.js` (1,262 lines, 180,126 bytes). Line numbers below are `grep -n` lines.
Layout: photo-kit CSS + helpers 1–63 · part2 CSS 65–547 · shared helpers 548–602 (sources `S`, icons `P`, `mark()` 589, contrast fns 596–601) · **2.1** 603–790 (`window.SECTIONS['s2-1']` 656) · **2.2** 791–1049 (`s2-2` 905) · **2.3** 1050–1262 (`s2-3` 1147).

Note: only `img/boxdoor.webp` exists in this repo copy. No other image, `img/brand/*` or `media/*` file is present, so their content can be judged only from file names, alt text and captions.

---

## Cross-cutting findings (the whole file)

| Rule | Evidence |
|---|---|
| **C2 tokens not used** | The chrome uses the old showroom vars: `--neon #5fbf8f`, `--neon2 #b5dfc6`, `--gold #f2c96b`, `--gold2 #ffe7a8`, `--ink #effaf5`, `--edge rgba(95,191,143,.16)` (defined in index.html). Hard-coded hex values appear throughout: `#0B2219`×14, `#0F7A52`×10, `#5B6F66`×10, `#fff`×22, `#ffb3a3`, `#C9473A`, `#bff4ff`, `#7fd9ea`, `#d9b56e` (CSS 65–547 and JS). None of the nine C2 values (`#0E6B3A`, `#C9A227`, …) appears. |
| **B9/B10/C7 glows, gradient text, neon** | Gradient text: `.p2k-band h3 em,.p2k-split h3 em{background:linear-gradient(90deg,var(--neon),var(--gold2));background-clip:text}` (14). Glow: band `box-shadow:0 50px 110px -60px rgba(95,191,143,.45)` (6). `text-shadow:0 0 14px rgba(255,255,255,.65),0 0 30px rgba(95,191,143,.45)` and `drop-shadow(0 0 10px …)` (232, 234; `.p2-sign` is dead CSS). `.p2-pg circle{filter:drop-shadow(0 0 5px currentColor)}` (453). SVG dots with `drop-shadow(0 0 5px …)` / `(0 0 6px #f2c96b)` (627–628). Timeline dot `box-shadow:0 0 10px var(--neon)` (500). Neon→gold gradient rule (497). Cyan/ice "data" colour `#bff4ff` (438, 456, 1175) and `#7fd9ea` (1079): blue tech lighting, banned by C7. Radial and gradient panels throughout. |
| **C5 motion** | Infinite SMIL `animateMotion` in the 2.1 concept SVG (627–628) and `animateTransform rotate 24s` (638). These are outside the allowed places: K1.9/K1.28 allow animation only in 2.3. 2.3 flow: `animateMotion` goods/money/data loops (1086–1090), always running rather than scroll-driven, plus `@keyframes p2pulse` infinite (449, 452). Hover zooms: `.p2k-card:hover img scale(1.05)` (36), `.p2-pr:hover` (93), `.p2-ap:hover` (104), `.p2m-i:hover translateY(-3px)` (886), `.p23s article:hover scale(1.05)` (1139). Entrance animation `.p2-swap{animation:rise …}` (85). IntersectionObserver staggered reveal of "record once" list (1239–1240). **No `prefers-reduced-motion` anywhere** (0 matches). |
| **C3 type** | Uses Unbounded (display), Plus Jakarta Sans/Manrope (body) and JetBrains Mono (`--f-hud`), with uppercase tracked eyebrows (`.p2-k` 77, `.p2k-k` 11, `.p2k-cap` 19 "CONCEPT IMAGE" pill). C3 wants Sora only, with no all-caps or tracked eyebrows. Middle-dot meta strings appear everywhere ("Walk in · check · choose", module titles "The problem · …"). |
| **B5 funding options side by side** | 730: "funded either as Start Small (${F.m(MODEL.leanInputs().seed.amount)}, … m²) or as the Flagship (${F.m(IN.seed.amount)}, … m²)". 1069: "two salaried riders … in the Flagship option, partner riders … in the Start Small option". No part2 number responds to the funding switch: everything reads `IN` (Flagship), and the only event listener is `afya:leave`. |
| **A4 process narration** | 1010 "the Canva brand kit and the final colour codes are set in Step 1 of the framework". 993 "to be checked by a native speaker before launch (open question in the framework)". 978 "framework rule: …". 763 "founders’ planning view, to be tested in research". |
| **B8 Kiswahili coverage** | Only 2.2 mark/merch and 2.3 film cards use the inline `B2(en,sw)` pair (defined 844). Everything else relies on exact-text lookup in `sw-dict.js`. Missing from the dictionary: all `sim()` timeline strings (1108–1121, e.g. "Store closed.", "Arrive.", "Ready to collect", "About 2½ minutes door to door"), SVG text "ONE AFYA" / "ONE ACCOUNT · ONE PRICE" (643–645), "AFYA ONE SYSTEM", "TILL · STOCK · …" and "GOODS → · ← MONEY" (1079–1081, 1099), scenario-button suffix "case" (582), and the dead `USE`/`useMock` strings. |
| **K4 hand-typed numbers** | Many numbers are typed in by hand instead of read from `model.js`. They are listed per section below. Some are labelled `Planning estimate`/`Illustrative`, but most have no source. |

---

## 2.1 The Afya Basics concept (603–790)

**Today:** A hero (`img/exterior.webp`) and eight modules:
1. The problem: four points plus 3 photo cards, with a TMDA seizure cited from Daily News (678–687).
2. Four commitments (`PROM`, 4 photos) plus the "We are / We are not" positioning table (`POS`, 6 rows, 688–696).
3. The package range via `AFYA_PKG.html()` (697–700).
4. **Concept diagram** `conceptSVG('d'|'m')`: 3 photo nodes (store/box/app) around a "ONE AFYA" core, with an animated SVG and a click panel (`CH`, 604–620; 621–646; 701–707).
5. One-week story of "Mama Neema" (`WEEK`) with 2+4 photos (708–714).
6. Customer-group chooser (`SEG`, 6 groups, mix bars, card fit, 715–718).
7. Stacked monthly year-one revenue by channel, with a base/up/down scenario switch and 5 KPIs (719–725, draw 770–777).
8. The 12-year stores-by-year step chart (726–733, 779–788) and risks (734–741).

Colours in the diagram and chart: store `#5fbf8f`, box `#f2c96b`, app `#d9b56e`, core `#ffe7a8` (605–618, 722). These are neither C1 nor C2 values.

**Decision:** **Rewrite.** Part G asks for one diagram: store + membership + digital, plus the promise. Rebuild K1.26 as one static inline SVG with no photos inside the nodes and no motion. Move the stacked-revenue and stores-by-year charts (K1.29) to `model.js`-driven K2 charts that respond to the funding switch, and remove the scenario-side-by-side text. The week story, segment chooser and package range are extras (see the "Not in Part K" list).

**Visual today:** Hero photo + animated inline SVG + interactive. **Target:** Still (one diagram).
**Research:** none per G. The numbers need R3 (savings 3/6/9% vs 13/16/20%, D4 note), R2 (Afya Check spec) and R4 (tranches).

**Issues:**
- **K4/B1 hand-typed:** 607 "15 measurements in about 4 minutes", "about 50 seconds". 611 and 700 "3% monthly, 6% on 6 months, 9% on 12 months … TSh 3,500 delivery", "S TSh 3,500 · M 5,000 · L 6,500". 698 "17 Afya Boxes … two (Afya Ofisi and Afya Hoteli) … plus 5 Afya Kazini kits". The Kazini count conflicts with B16, where the boda kit is dropped. 786 label `47 stores` is hard-typed while the data comes from `IN.growth`. 780 y-axis `mx=50` is fixed. 738 fallback `'150'` members. `SEG.mix` scores (649–654) are labelled "founders’ planning view". Speed targets ("<3 min", "<30 s", "15:00", "2 hours", "5 min") have no source.
- **R2 conflict:** 607 describes a full check of 15 measurements in 4 minutes. K1.12/R2 specify a basic tier with a 50-second flow.
- **B4:** 671 "The thermometer and syrup she orders go out…". A syrup is a medicine sold by Afya, with no partner pharmacy mentioned.
- **B7 mixed language:** `SEG.s` puts Kiswahili under English titles in one button: "Mama na mtoto, mama mjamzito", "Bibi na mjukuu", "Baba na kisukari", "Mwana ughaibuni" (649–654). 690 "Afya yako, nyumbani kwako" inside an English sentence (motto, check policy). 686 "“imekwisha”: it has run out".
- **B9:** `SEG` card gradients `#D9607A`, `#C9473A`, `#11807A` (teal) (760). Gold used as fill/background `rgba(242,201,107,.10)` (782).
- **C5:** animated concept SVG (627–638); bar-width transition on segment bars (767).
- **B12 faces? (by alt):** `today2` "a mother with her baby walking…" (685), `today1` "a mother at a pharmacy counter" (686), `today3` "crowded pharmacy counter with a long queue" (684), `team`/`check` in WEEK (712), `rider` (631, 690).
- **Box imagery:** `boxdoor.webp` is the E1 reference itself. I inspected it: two pairs of hands, no faces, and the box reads "SUKARI CARE". Its alt texts claim "an Afya rider handing a closed green box to a mother with her baby" (838, 1199), which the image does not show. The alt is wrong, and the Sukari label is used for generic box and Mama contexts.

---

## 2.2 The brand (791–1049)

**Today:** A hero (`img/interior.webp`) and ten modules:
1. The problem (917–922).
2. The brand idea: three pillars (923–929).
3. The mark "Nyumba Heart": three PNG lockups, an app icon at 3 sizes, a 5-step anatomy, "why not a cross", 5 touchpoint photos and 4 misuse examples (930–958).
4. Colour: 9 swatches with live WCAG contrast and copy-hex, a proportion bar, 6 Care Zone colours (959–968; init 1024–1028).
5. Typography: a live type tester (969–978).
6. Photo style (do/don't), photo rules, tone of voice (4 do/don't) and an EN/SW example switcher (`EX`) (979–993).
7. Branded items: a 5-category filter with 17 items and a lightbox (994–997; init 1036–1047).
8. Customer charter: 10 promises (998–1000).
9. Brand cost KPIs from the model (1001–1010).
10. Risks (1011–1018).

**Brand palette documented (`PAL`, 792):**
- Afya Green `#0F7A52`
- Deep Green `#0A5A3C`
- Forest Ink `#0B2219`
- Mint `#E6F4ED`
- Warm White `#FAF7F0`
- Soft Grey `#E4E9E6`
- Slate `#5B6F66`
- Afya Gold `#F2C96B`
- Deep Gold `#8A6316`

**Zones (`ZONES`, 793):**
- Rose `#D9607A`
- Coral red `#C9473A`
- Recovery blue `#2D78B8`
- Amber `#D98B1E`
- **Violet `#7A5BB0`**
- **Teal `#11807A`**

**Proportion (964):** 55% `#FAF7F0` / 25% `#0F7A52` / 12% `#E4E9E6` / 5% `#0B2219` / 3% `#F2C96B`.

**App icon gradient (845):** `#14996a`→`#0a5a3c`, heartbeat `#f2c96b`. `mark()` defaults (589): bg `#0F7A52`, gold `#F2C96B`.

**Type documented:** "Display · Unbounded 800/700", "Body · Manrope 400/600/700", "Numbers · JetBrains Mono" (972–976). The wordmark is "Unbounded Bold" (944). Manrope is not loaded: the Google Fonts URL loads Unbounded, Plus Jakarta Sans, Fraunces and JetBrains Mono, and `--f-body` begins with Plus Jakarta Sans. The body sample therefore renders in Plus Jakarta Sans, not Manrope.

**Compared with C1 and C2:**
- C1's four customer colours (warm white, Afya Green, soft grey, gold) are all present and match in name.
- C1 does not mention Deep Green, Forest Ink, Mint, Slate, Deep Gold or the six zone colours.
- Against the C2 UI tokens, every value differs:
  - Afya Green `#0F7A52` vs `--green #0E6B3A`
  - Deep Green `#0A5A3C` vs `--green-deep #083F23`
  - Afya Gold `#F2C96B` vs `--gold #C9A227`
  - icon `#14996a` vs `--green-edge #15934F`
- Violet and teal zones break B9 (purple and teal rejected). C2 allows category colours only inside imagery, but here they are UI (zone cards 1028, card gradients 760/838).
- The section never states that two palettes exist. It is laid out on dark showroom panels (charter cards 414, `.p2n-hero .d` radial `#0f3b2b`), whereas C1 says 2.2 uses the customer palette.
- Brand type (Unbounded/Manrope/JetBrains Mono) and C3 (Sora) need a founder decision. Is Sora the UI font only, with Unbounded as the brand face? The brief does not say.

**Decision:** **Rewrite** (Part G; K1.27).
- **Keep** the marks. Convert the PNGs to SVG: `mark()` 589 is already an inline SVG of the mark.
- Document both palettes (C1 customer vs C2 UI).
- Rebuild the zone colours or move them into imagery only.
- Re-skin the merch filter/lightbox.
- Make the charter bilingual via the toggle.
- Add the box design (E1) and photo rules aligned with B12.

**Visual today:** Hero photo + interactive (swatches, type tester, filter, lightbox). **Target:** Still.
**Research:** none per G. The charter's "registered with TMDA" needs R1.

**Issues:**
- **B12 contradiction in the photo rules:** 981 "Tanzanian people in calm home and store settings". 988 "Real customers and staff only with written consent; children only with a parent’s consent". Both contradict "no real faces".
- **B12 faces? (by alt):**
  - `k-store-family` "a young family walking into…" (952, 983)
  - `k-check` "an adviser explaining a blood-pressure reading to a customer" (984)
  - `k-delivery` "rider handing a green box to a mother with her baby" (955)
  - `c-seal` "an Afya packer sealing…" (954)
  - `rider` (953)
  - `today3` / `today1` (985–986)
  - Merch photos for `tee-black`, `tee-white`, `polo`, `cap`, `hoodie`, `rider`, `badge`: likely worn by models. Each has a `t-` thumbnail (997) and an `m-` lightbox image (1040).
- **E1 box departures:** 954 "Closed emerald boxes with a **gold seal**". In the dead `USE.bag` (819): "Afya Green box with the **white** Nyumba Heart mark on the lid … a band in the category colour, and a QR code on the lid". E1 says gold foil wordmark and house emblem on the lid, gold side label and sticker. Box sizes "S 26×18×10, M 34×25×12, L 40×30×16 cm" (819) have no source.
- **B11:** no cross is drawn. The `P.aid` icon (572) is a first-aid case with a plus (`M12 10v6M9 13h6`), shown in amber `#D98B1E` for zone "First Aid & Home" (1028). It is not red, but it is a cross motif to check. The misuse example renders a red `#c9473a` offset shadow on the mark (910). Text about red/green crosses (919, 950) is explanatory and fine.
- **B7 mixed language:**
  - `VOICE` "Karibu, Mama Neema. Your box is on its way." (795)
  - `EX.en` "Habari Amina. Your Mother & Baby box…" and "Karibu. Yes, we have test strips…" (801–802)
  - "Asante for shopping with us." (803)
  - The charter shows the English title and the Kiswahili title side by side in one card (`c[0]` + `c[1]`, 1000), with an English-only body and measure.
  - The type-tester default "Afya yako, nyumbani kwako" (972) is a motto; check.
- **B8:** `PAL`/`ZONES` descriptions, `VOICE`, charter bodies, pillars and photo rules have no inline `sw`. They rely on the dictionary; spot checks hit for most, but there is no guarantee.
- **K4/B1 hand-typed:** prices "TSh 38,000", "TSh 9,500", "TSh 85,000", reading "118 / 76" (976, 1031) are labelled "prices shown are illustrative" (977). Merch specs "240 gsm", "330 ml", "500 ml", "09:00–21:00, 7 days". Proportion 55/25/12/5/3 (964). "TZS 11M" (816) is sourced (`S.tra`). The cost KPIs (1002–1008) come from the model: good.
- **B4 / R1:** 804 "Every regulated product on our shelves is registered with TMDA". R1 says cosmetics and food are TBS. 919–921 frame the brand around TMDA medicine seizures.
- **B14:** 865 door decal "at eye level on the glass entrance" (merch item). Check against the approved store.
- **C3:** wordmark and type spec are Unbounded/Manrope/JetBrains Mono, not Sora (944, 972–976).
- **Placeholders (dead code):** 833 "Simple Solution Ltd … TIN: 000-000-000"; 835 TOTAL 132,500, "+132" points.

**Dead code (defined but never rendered):** `USE` (814–820) and `useMock()` (821–842). These are the touchpoint mock-ups: shelf label, SMS thread, receipt, card picker, door. `lock()` (594) is used only inside them. `.p2-sign` CSS (231–234) is unused, and `p2kband` (56) is never called. Decide whether to harvest the content into a rebuilt 2.2 touchpoint row or retire it.

---

## 2.3 How it all works (1050–1262)

**Today:** A hero (`img/c-port.webp`) and eight modules:
1. The problem: four points plus a split photo on "registered only" (1154–1163).
2. **Film** "the chain in ten steps": `<video>` with poster, EN/SW sources, fetched VTT subtitles and 10 step cards (`CH10`, 1123–1133) with a "▶ m:ss" **"Play this step in the film"** button (`aria-label`, 1166; seek handler 1220).
3. Three operating rules (1168–1173).
4. **Animated 7-stage flow** `flowSVG('d'|'m')` (1074–1102): photo nodes, goods/money/data layer switch, play/pause auto-advance every 3.6 s (1231), stage detail panel (`ST`, 1052–1072: who / tool / time / cost).
5. Goods / money / data columns plus "one sale, six updates" reveal (1182–1189).
6. Order simulator: 5 order types × time slider (`ORD`/`sim`, 1104–1121; 1190–1199), plus a mosaic of 3 photos.
7. Cost/payer table with scenario switch and 5 KPIs from the model (1200–1205; 1248–1258).
8. Risks.

**Decision:** **Rebuild** (G: keep the end-to-end flow, rebuild as a clean animated-on-scroll diagram).
- **K1.28 flow:** rebuild as the one scroll-driven inline SVG with a reduced-motion end state. Drop photo-in-node `<image>`, glows, pulse, cyan data colour and infinite loops.
- **Film steps:** re-link to the re-rendered film.
- **Order simulator (K1.30-like) and cost table:** keep the logic, re-skin, feed from `model.js`.
- **Text:** rewrite the import stage on R1 (TBS/TMDA split, PVoC, clearing-agent quote).

**Visual today:** Hero photo + video + animated SVG + interactive. **Target:** Still/animated diagram.
**Research:** none per G. In practice R1 (import/TBS/PVoC) and R5 (mobile-money payments) are needed for the stage text.

**Issues:**
- **R1/B4:** Stage 2 (1056) "No one may import medicines or medical devices into Mainland Tanzania without a licence or permit from TMDA…". Supplier stage (1054) "Afya buys only products registered with TMDA". Lede (1152) "checked for TMDA registration". Problem (1156) "20 boxes of medicines". These place Afya in the medicine-import chain, with no TBS, no PVoC and no partner pharmacy.
- **K4 hand-typed:**
  - 1064 "S TSh 3,500 · M 5,000 · L 6,500 … TSh 3,500 delivery"
  - 1069 "two salaried riders on electric motorbikes"
  - 1107 `OPEN_M=9*60, CLOSE_M=21*60, CUT=15*60` (the note also prints `IN.store.hours`)
  - 1189 "11 boxes left, reorder point 12" (Illustrative)
  - 1187 "20:30 cash-up", "21:00" report
  - Film chapter times 17/27/45/67/87/96/114/127/138/155 s
  - Cost table and KPIs are model-driven (1248–1258): good.
- **B5:** 1069 shows Flagship vs Start Small side by side.
- **C5/C7:** infinite `animateMotion` (1086–1090), `p2pulse` (449–452), drop-shadow dots (453), cyan `#bff4ff`/`#7fd9ea` (438, 456, 1079), auto-advance timer (1231), hover zoom on step cards (1139), staggered reveal (1239). There is no scroll driver and no `prefers-reduced-motion`.
- **B8:** `ST`, `sim()` strings, SVG labels and the cost table are English-only (see the cross-cutting table). `CH10` cards are properly bilingual via `B2`.
- **K3:** the video source language is chosen once at render time from `window.AFYA_LANG` (1166), so it does not switch on toggle (subtitles do, 1220). The poster is JPG (`media/p-afya-chain.jpg`), not WebP. Captions are fetched from `.txt` files.
- **B12 faces? (by alt):**
  - `team` "Afya advisers at the counter" (1051)
  - `check` "a customer at the Afya Check kiosk with an adviser" (1051)
  - `hub` "packing hub staff sealing…" (1051, 1199)
  - `c-care` "care team", `c-riders`, `c-pay`, `c-factory` (CH10)
  - `boxdoor` alt claims a mother with a baby (1199); the image shows hands only.
- **Box imagery:** `c-seal` ("gold seal") and `hub` show sealed green boxes; check them against E1. `boxdoor` = the E1 reference (ok).
- **K1.9 nine modules:** not in part2. The 2.3 hub lists six modules "TILL · STOCK · MEMBERS · DELIVERY · MONEY · REPORTS" (1079). The nine-module diagram lives in `part0.js`/`part4.js`/`range41.js`.

---

## Every image / video path referenced in part2.js

| Path | Where (line) | Flag |
|---|---|---|
| img/exterior.webp | 2.1 hero 674, concept node 631, duo 710; 2.2 apply 952 | check (B14 store; "illuminated sign") |
| img/boxdoor.webp | 631, 690, 712, 717; dead useMock 842; 2.3 mos 1199 | ok (hands only, E1 ref; alt wrong; "Sukari Care" label) |
| img/rider.webp | 631, 690, 712, 953, STPH 1051, 1199 | faces? |
| img/today3.webp | 684, 985 | faces? |
| img/today2.webp | 685 | faces? |
| img/today1.webp | 686, 986 | faces? |
| img/interior.webp | 690, 711, 2.2 hero 913, STPH 1051 | check (B14) |
| img/prod-heart.webp | 690, 717, 1028, STPH 1051, split 1161 | ok |
| img/check.webp | 712 (WEEK), 1028 (Seniors zone), STPH 1051 | faces? |
| img/team.webp | 712, STPH 1051 | faces? |
| img/prod-baby.webp | 717, 1028 | check |
| img/prod-senior.webp | 717, 1028 | check |
| img/prod-firstaid.webp | 717, 1028, STPH 1051 | check (cross on kit?) |
| img/prod-kids.webp | 717 | check |
| img/prod-care.webp | 1028 | check |
| img/brand/l-stack-onDark.png | 933 | ok (PNG→SVG/WebP) |
| img/brand/l-stack-onLight.png | 934 | ok (PNG) |
| img/brand/l-horiz-gold.png | 937 | ok (PNG) |
| img/k-store-family.webp | 952, 983 | faces? |
| img/c-seal.webp | 954, CH10 step 8 | old-box? (gold seal) / hands |
| img/k-delivery.webp | 955 | faces? / old-box? |
| img/k-check.webp | 984 | faces? |
| img/brand/t-{tee-black,tee-white,polo,cap,hoodie}.webp | 997 (dynamic `t-${m.k}`) | faces? |
| img/brand/t-{brochure,cards,letter,insert,mug,bottle,tote,notebook,bag,door}.webp | 997 | check |
| img/brand/t-rider.webp, t-badge.webp | 997 | faces? |
| img/brand/m-{same 17 keys}.webp | 1040 (dynamic `m-${m.k}`) | same flags as t-; m-insert/m-bag box imagery: check |
| img/c-port.webp | 2.3 hero 1150 | ok |
| img/c-factory.webp | CH10 1124 | faces? |
| img/c-docs.webp | CH10 1125 | ok |
| img/c-dash.webp | CH10 1126 | ok |
| img/c-inspect.webp | CH10 1127 | check |
| img/c-scan.webp | CH10 1128 | check (hands) |
| img/c-stock.webp | CH10 1129 | ok |
| img/c-pay.webp | CH10 1130 | faces? |
| img/c-riders.webp | CH10 1132 | faces? |
| img/c-care.webp | CH10 1133 | faces? |
| img/hub.webp | STPH 1051, mos 1199 | faces? / old-box? |
| media/p-afya-chain.jpg (poster) | 1166 | check (JPG, faces?) |
| /_blob/5ae50546d50f352fa3ab8593261f02ce (afya-chain EN mp4) | 1166 | check (faces/old box per K3) |
| /_blob/435de6691a5e95c1c6a46fbaedfedbcc (afya-chain SW mp4) | 1166 | check |
| media/afya-chain.en.txt, media/afya-chain.sw.txt (subtitles) | 1220 | ok |

---

## Present in part2.js but not mentioned in Part K

1. **2.1 package-range table** `AFYA_PKG.html(null,'full')` (697–700). It is outside K1.26 and duplicates 3.5.
2. **2.1 "Four measurable commitments"** promise cards with photos (`PROM`, 688–690).
3. **2.1 "One household over one week"** story (`WEEK`, Mama Neema, 708–714).
4. **2.1 customer-group chooser** (`SEG`, 6 groups, channel-mix bars, card fit, 715–718, 757–768). It overlaps K1.8/1.4.
5. **2.1 positioning table** "We are / We are not". K1.27 lists it under 2.2, but it actually sits in **2.1** (692–695).
6. **2.2 colour swatches** with live WCAG contrast calculator and copy-to-clipboard (`lum`/`cr`/`aa` 596–601; 1024–1026).
7. **2.2 Care Zone colour cards** (`ZONES`, 6 colours with tints, 1028).
8. **2.2 live type tester** (input + size slider, 972–973, 1030–1032).
9. **2.2 tone-of-voice do/don't plus EN/SW example switcher** (`VOICE`, `EX`, 795–803, 990–992). This is a separate language toggle inside the section; the brief has one global toggle (D1).
10. **2.2 mark anatomy, app icon/favicon set, misuse rules** (938–958; `ICON` 845; `misuse` 908).
11. **2.2 touchpoint photo row** (`p2-apply`, 5 photos, 951–956).
12. **2.2 merch lightbox** with keyboard navigation (the "collection filter" in K1.27 covers only the filter).
13. **2.2 brand-cost KPIs** from the model (1001–1010).
14. **2.3 afya-chain film** (EN/SW mp4 + VTT). It is **not in the K3 video table**; K1.28 alludes to it only as "the film".
15. **2.3 order simulator** (5 order types × time of order, `sim()`). It resembles K1.30's "order-type / time-of-order chooser" (listed under 4.1), but this instance is in 2.3.
16. **2.3 "Record once · one sale, six updates"** reveal (1185–1189). Similar to K1.30's "one-sale-updates-four-records" in 4.1 (six here vs four there).
17. **2.3 goods / money / data three columns** (1182–1184).
18. **2.3 stage cost-and-payer table** with scenario switch (1200–1205, 1248–1258).
19. **Dead code:** `USE` / `useMock()` touchpoint mock-ups (shelf label, SMS, receipt, card picker, door; 814–842), `lock()`, `.p2-sign` CSS, `p2kband`.
20. The **K1.29 charts appear in 2.1** (stacked year-one revenue by channel with base/up/down switch; stores-by-year 1→`IN.growth.stores_by_year[11]`). Part K places them at "2.x / 5.4"; the stores chart has no scenario switch.
21. **K1.9 is not in this file**; only the six-module hub label is.
