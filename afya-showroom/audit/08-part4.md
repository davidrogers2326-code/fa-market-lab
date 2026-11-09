# Audit 08 — Part 4 · The engine (sections 4.1–4.5)

Reader scope: `sections/part4.js`, `sections/range41.js`, `sections/range42.js`, `sections/range43.js` (read-only). Evidence is given as `file:line`. Numbers are quoted from code. Where a figure is marked "computed", I worked it out from the code's own constants with no new inputs.

---

## 0. Which file renders which section

- Load order (`index.html`): `part4.js` → `range41.js` → `range42.js` → `range43.js` → part5…
- `part4.js:1327-1331` registers `s4-1` … `s4-5` (sec41…sec45).
- `range41.js:1093` sets `SECTIONS['s4-1']`, `range42.js:1452` sets `s4-2`, and `range43.js:1467` sets `s4-3`. Each one overwrites the part4 entry.
- **Live today:** 4.1 = range41, 4.2 = range42, 4.3 = range43, 4.4 = part4 `sec44` (`part4.js:944-1087`), 4.5 = part4 `sec45` (`part4.js:1224-1332`).
- **Dead code:** part4 `sec41/42/43` (`part4.js:476-910`). This is where most of the K1.30–K1.32 components named in the brief now live (module map, "toggle internet connection", "one-sale-updates-four-records", Gantt import timeline, municipal-council delivery-zone map, payment-vs-cost check, box calendar "Day 3"). The live range4x pages replaced them with different components (listed below).
- The range files also carry their own dead layers. The later function declaration wins, so these earlier ones never render:
  - range41: `cost()` at :819 is overridden by :905; `modCard` :771 by :878; `devCard` :763 by :885; `render41` :856 by :1008.
  - range42: `render42` :1146 is overridden by :1187, and `cover5` :1073 by :1150. Four stacked CSS "versions" load together (v2 `css42b`, v4 `css42d`, v5 `css42e` "Maersk / DHL reference" comment at :889, v6 `css42f`). The v4 version also loads a Google Fonts **Inter** stylesheet (:705-707).
  - range43 re-includes the 4.2 CSS (`css42d/e/f`, :93-422) and the Maersk/DHL comment (:278).
- `window.V3.injSec('s4-x')` is called in the endings (`range41.js:849`, `range42.js:1141`), but `V3` is defined nowhere. It is a no-op.
- **Funding switch:** range41 reads `MODEL` (18 references, plus `MODEL.isLean()` at :254). range42 reads it only for stock and margin (`:17`). range43 never reads `window.MODEL`. All 4.3 numbers are typed by hand, so 4.3 does not respond to the 340M/150M switch.

---

## 4.1 The tech platform (live: `range41.js`)

**Today.** A long-form "engine" page with 13 chapters (`CH`, :34): Why · One sale · Tools and prices · Architecture · Devices · How it works (9 modules) · Try it · Resilience · Data and law · Build plan · Cost · Scale · Risks. Every chapter has a "Read the full explanation" reader (`DEEP`, :928-998). The page is bilingual through `T(en,sw)` pairs throughout.

**Key numbers (with sources).**
- FX rate: `const FX=2644.05; // TSh per US$, mid-market, 2 Nov 2026 (CurrencyBeacon)` (:182). It is shown in the UI as "US$ prices converted at TSh 2,644 per US$ (2 November 2026)" (:873, :993). Source: currencybeacon.com USD/TZS (:204). **The currency is USD→TZS, dated 2 Nov 2026.**
- Stack prices are hand-typed in `PX` (:184), and each has a source URL (:187-204): Odoo server US$24/mo (DigitalOcean), VFD connector from US$999 (Ecosire), Supabase US$25, 360dialog US$59, WhatsApp utility US$0.004 and marketing US$0.0225 (Gupshup), SMS TSh 23 (Celcom), POS TSh 650,000, Tab A11 TSh 410,000, UPS TSh 200,000 and router TSh 220,000 (Jiji listings), and developer salaries TSh 2.5M / 6M / 12M (McTaba).
- **Payment fees:** AzamPay "mobile money 1% when the customer pays operator fees, 3% when the merchant absorbs them; cards 3.5% + VAT; no setup or monthly fees" (:188). This appears as a KPI tile "1%" (:913) and a stack row (:213-214). **It is not a line in the running bill.** `BILL()` (:227-234) holds only Odoo, Supabase, 360dialog, WA utility, WA marketing and SMS. Computed at the code's constants, the bill is ≈ TSh 518,751 against the model line `systems_software` of TSh 800,000 (from MODEL).
- **Kiosk maintenance:** absent. The only "maintenance" in the file is rider charging/maintenance (:254). The model has an opex line `check_station: 600000`/month (model.js opex), but 4.1 never shows it. This is the Part G gap.
- **Kiosk price:** `ONEOFF()` shows "Afya Check kiosk US$4,990, master model" (:235), from `MODEL.inputs.check.kiosk_usd=4990` (:185). Its source key is `''`, so **no source**. R2 says the basic tier is US$3,267–3,630 (≈ TSh 9–10M landed). The 4,990 figure therefore contradicts R2.
- Switch-on bill computed ≈ TSh 23,965,215 against a seed line of TSh 15,000,000, a shortfall of ≈ TSh 8.97M. The page states this shortfall openly (:911). "Phase 2 platform build TSh 36M from operating profit" (`PX.mid*6`, :913) is not in the model, and the page says so.
- MM fallbacks are hand-typed defaults used if MODEL fails: `rev12:132492340`, `sys:800000`, `seed:15000000`, and so on (:14). Note that MODEL's m12 revenue is 114,385,226, so the fallback differs from the model.

**K1.30 check.** The live page has a working till plus founder dashboard ("Try it", :775-783). It includes the offline toggle (`toggleNet`, :1045; "tap the network badge to switch the internet off") and "one action changed stock, money, feed and alerts". It also has the 7-step "one sale" sticky story and film (`SALE`, :37-58). The "one account / one price / one stock" demo, the order-type / time-of-order chooser and the module map from K1.30 exist **only in dead part4 sec41** (e.g. "toggle internet" and "four records" appear only in part4).

**Present but not in Part K:** tools-and-prices stack with alternatives (`STACK`/`STACKALT`, :209-225), running bill and switch-on bill tables, device flat-lay hotspots with prices (:884), role-by-data access matrix "who sees what" (`ROLES/DATA/ACC/ROLEX`, :148-157), data inventory (`DINV`, :265), build plan with phases and acceptance tests (`PH`, `TESTS`, :274-292), year-by-year scale chooser 1→47 stores (`yearCard`, :840; overlaps K1.29), risk table (:174), glossary (:294), full-explanation reader panel (:1001), and a 1-minute "film" (an image slideshow, `filmOpen`, :1048).

**Images (all `img/e1/*` via `IM`, :11):**
| path | where | flag |
|---|---|---|
| img/e1/hero.webp | CSS bg :332; module "People" :134 | check-face |
| img/e1/city.webp | CSS bg :578 (scale) | place |
| img/e1/old.webp | :723 (alt: notebook, cash box) | object |
| img/e1/scan.webp | SALE :38, MODS :110 (alt="") | check-face |
| img/e1/pay.webp | SALE :41 ("paid on her own phone"), MODS :122 | check-face |
| img/e1/shelf.webp | SALE :44, MODS :114 | place |
| img/e1/kiosk.webp | SALE :47, MODS :130, :804 | place |
| img/e1/bench.webp | SALE :50, MODS :118 | check-face |
| img/e1/road.webp | SALE :53 (rider), MODS :126 | check-face |
| img/e1/founder.webp | SALE :56 ("The founders"), MODS :142, alt="" | **check-face** |
| img/e1/flat.webp | :759 devices flat-lay | object |
| img/e1/power.webp | :788 router/UPS | object |
| img/d8/pr.webp | product sprite :705 | sprite |
| img/d8/dev-phone.webp, img/d8/dev-laptop.webp | :779-780 device frames, alt="" | mockup |

**Rule issues.**
- B1: the kiosk US$4,990 has no source (:235). The BILL volumes are hand-typed (`ord=750`, `checks=1800`, `waM=1000*2`, :227-228). The `SPLIT` percentages are "illustrative" but sit in the dead cost() (:160).
- B2: every US$ row is converted with the 2 Nov 2026 rate shown (:873). This is OK.
- C7/C5: Ken-Burns hero `@keyframes e1kb` (:332-333) and a film zoom `e1fz` (:395-396); `.rv` scroll-reveal entrance on 18 blocks (:321); IntersectionObserver ×4. The reduced-motion rule (`prefers-reduced-motion`) is absent (0 hits).
- C1/C2/C3: the page's own design system declares "dark cinematic, ivory editorial, clean white" (:300). It uses ivory `#f3ece2` and white `#ffffff` chapter backgrounds (`ch iv`/`ch wh`; `tryit` `background:#f5ebe3`, :775) and fonts Plus Jakarta Sans, **Fraunces** serif and JetBrains Mono (:302-303). None of these are Sora or the C2 tokens.
- B4: no problem found in 4.1.
- R5: no mandate / recurring-billing content (no M-Pesa/Tigo/Airtel mandate, no D-3/D-1 sequence).
- B21 context: ":721 'Fahmy studies in Greater Noida and Cecilia leads on the ground in Dar es Salaam'". No relationship is stated, which is OK.

**Decision:** **Re-skin** (keep logic and depth) plus targeted rewrites. Re-source the kiosk to R2, add kiosk maintenance (the model's `check_station` line) and R5 mandate/payment fees as rows in the running bill, and move everything onto the C2 tokens and Sora. **Visual:** Table (running bill responding to the funding switch) plus the kept till/offline demo (K1.30). **Research:** R2, R5.

---

## 4.2 Sourcing and supply (live: `range42.js`, final `render42` at :1187)

**Chapter order (:1188):** cover → How it works (6 steps) → Why → What we source (6 families) → Where we buy (3 lanes) → The journey (82 days) → band "sea" → True cost (landed-cost calculator + waterfall) → Suppliers & terms → The plan (phases) → band "recv" → Quality gates → Permits → Team/weekly rhythm → Stock & cash (cash chart, reorder simulator) → Risks → end. Each chapter has an explainer box (`xp`, :1191) and a deep reader (`DEEP`, :1355).

**FX:** `const FX=2644.05;` (:12) has no inline comment. The source row reads "CurrencyBeacon: USD to TZS, 2 November 2026 (about TSh 2,644 per US$)" (:38). The rate and date are shown **only inside the deep reader table**: "Exchange rate · TSh 2,644 / US$ · Mid-market, 2 Nov 2026" (:1381). The main True-cost chapter says only "today's exchange rate" (:1105).

**Sourcing lanes (`LANES`, :70-79; `lanes5`, :1096):**
- China: devices, hygiene goods, box materials. Shared container US$102–163/m³, 30–48 days; 20ft US$2,100–3,800, 22–28 days. Order-to-shelf "~84" days.
- India: dressings, gauze, diagnostics, "No medicines". Nhava Sheva 10–14 days, Mundra 16–18 days. "~45" days.
- Licensed Tanzanian wholesalers: 1–7 days, "from day one".
- China/India become direct sources only "from store 2" (:1098). This matches Part G ("mostly China and India") and adds a local-first phase.

**Import timeline (`SALE`, :46-68):** Day 0 PO (US$10.80 FOB × 200) → Day 30 inspection → Day 34 port (LCL 0.64 CBM, US$111/m³) → Days 36–70 sea → Days 70–78 customs → Day 80 hub → Day 82 shelf.
- Inconsistency: step 3 says "TMDA import permit approved (applied week 1)" (:55). The TMDA source requires an application "at least 6 weeks before shipment" (:21, :98). Week 1 to day 34 is under 6 weeks.

**PVoC / CoC:** appears only as a source (TÜV Rheinland, :28) and in one deep-reader sentence: "some categories also need a Certificate of Conformity issued before shipping under TBS's pre-shipment verification programme" (:1412). Missing against R1:
- the US$250–5,000 per-shipment CoC fee;
- the 15% of CIF penalty and TZS 100,000 destination inspection;
- Route B product registration;
- TBS fees (TZS 50,000 registration / 150,000 premise);
- GN 681 of 2021 by number (the 2021 regulations are linked, :25).

There is no PVoC line in the landed-cost calculator. The "Pre-shipment inspection US$299" there is a private QC inspector (`LCC.inspUsd:299`, :1309; Sofeast source :34).

**Duties / landed cost (`LC`, `LCC`, `lcCalc`, :1308-1313):** FOB US$10.80 × 200; LCL US$111/m³; FCL US$2,350; insurance 0.5%; duty 25% ("planned at 25% until a licensed clearing agent confirms", :1319); RDL 2% CIF; CPF 0.6% FOB; TMDA import fee 2% FOB; bank US$60; clearing agent TSh 600,000 "(estimate)"; TMDA inspection TSh 100,000; truck TSh 150,000 "(estimate)"; VAT 18% reclaimed. Computed defaults: landed ≈ TSh 47,384/unit, 1.66× the factory price, shelf price ex-VAT ≈ 69,683, gross price TSh 82,500. All sources are TRA 2025/26, TMDA fees June 2024, freight sites and Alibaba.
- **Clearing agent:** an estimate only. There is no written quote (R1 to-do). FEAFFA/TASAC minimum-fee order is cited (:36).
- Model ties: opening stock `TSh 30M` from MODEL (`MM.stock`, :17); retail margin 32% from MODEL. "About 520 product families" is typed by hand (:1171).

**Permits table (`LAW`, :97-106):** all TMDA rows have fees and sources. There is one TBS row for cosmetics with no fee. Food is not mentioned (R1: food moved to TBS). TRA taxes are included.

**B4 — contradictions (medicines):**
- `:77` the local lane supplies "all medicines the store may sell".
- `:103` "so Afya buys medicines locally at launch".
- `:1172` "What we source" lists **"Over-the-counter medicines … Licensed wholesaler only · Stays local"** as one of Afya's six families.
- `:1177` "we buy them locally at every stage".

All four say Afya buys and stocks medicines, which contradicts B4 and 4.5 ("Afya Basics never stocks them", `part4.js:1116`).

**Other rule issues.**
- B2: US$ figures in the visible chapters (US$10.80, US$111, US$2,350, US$299, US$500/2,500 device registration, :101) have no adjacent rate and date. The rate appears only in the deep reader (:1381).
- B6: comment ":889 corporate logistics look (Maersk / DHL reference)" is code-only and not shown to the investor. Note it anyway.
- The lane photo for India reuses `gates` (:1096). The "Hygiene … TBS (hygiene)" family includes masks and gloves (:1173). Under R1 these may be TMDA devices. Verify.
- Phases are "From store 2 / Seven stores" (:82-86) rather than R4's opening–month 6 / 6–12 / year 2. They do not align with R4.
- C5/C7: `.rv` reveal in three CSS versions (:158, :553, :712); `@keyframes e1kb/e1fz/e1in/e3kb`; `backdrop-filter`/`blur` ×15–16; 17 linear gradients; 10 box-shadows; white "corporate cards" (v5) and grey sections (`z5grey`). The Inter font is loaded from Google (:705). There is no reduced-motion rule.
- B8: alt="" on every photo (:1093, :1099, :1119); source titles are English only.

**Images (`img/e2/*`, :11):**
| path | where | flag |
|---|---|---|
| img/e2/hero.webp | cover :1150 | check |
| img/e2/factory.webp | SALE :47, China lane | place |
| img/e2/qc.webp | SALE :50 (inspector) | check-face |
| img/e2/load.webp | SALE :53 | place |
| img/e2/sea.webp | SALE :56, band | place |
| img/e2/clear.webp | SALE :59 (customs/agent) | check-face |
| img/e2/recv.webp | SALE :62, local lane, band | check-face |
| img/e2/shelf.webp | SALE :65, end :1141 | place |
| img/e2/gates.webp | gate5 :1119, India lane | check |
| img/e1/hero.webp, img/e1/city.webp | 4.1 CSS duplicated :169, :415 (not rendered in 4.2) | dead |

**Decision:** **Rewrite** (Part G). Rebuild the landed-cost chapter on R1:
- add a PVoC CoC line and fee, the 15% penalty and the TBS fees;
- add the agent's written quote;
- show the rate and date beside each US$ figure;
- fix the B4 lines (:77, :103, :1172, :1177);
- fix the permit timing;
- consolidate the four CSS layers onto the tokens.

Keep the calculator, waterfall, cash chart and reorder simulator logic (K1.31). **Visual:** Table plus calculator. **Research:** R1 (and R4 for phases).

---

## 4.3 Packing and delivery (live: `range43.js`, `render43` at :1451)

**Chapters (`CH`, :1308):** How it works · The box idea (unboxing layers, ad film) · Scan the box (QR) · Engineering (BCT/McKee box compression, die-line SVG) · A box per package ("17 boxes, 22 packages, 3 sizes, 4 inserts") · Box cost · Bags at the till (plastic ban) · Shop display (video) · Delivery model · Live map (OSM simulator) · Rider app · Risks.

**FX:** `const FX=2640;` (:31) has no date. The source row is "CurrencyBeacon … about TSh 2,644" with no date (:63). The UI text says "× TSh 2,644 per US$" (:1402) while the code multiplies by 2,640, so the two disagree. The battery swap TSh 5,923 is derived from US$2.24 × 2,644.05 (:534), so a third value is in use.

**Delivery cost vs payment (`del3`, :1433-1438).** Cost per drop at month 12 is built from hand-typed figures:
- rider TSh 25,000/day (FES source);
- e-bike lease 7,000 "Kenyan leases KES 200–527 a day" estimate;
- swap "KES 290 ≈ US$2.24";
- insurance 1,000 estimate;
- Shipday ≈ US$94/mo;
- data 1,000 estimate.

These are spread over 24 drops and compared with "Plan allows (rider cost per order) TSh 3,000" (`RIDER=3000`, :74). "Online customers pay a TSh 4,000 delivery fee; Afya Box delivery is already inside the box price" (:1434). This satisfies B18 in words. However:
- MODEL base `rider_cost_per_order:1000` (model.js:75). The 3,000 figure is the **150M** value (model.js:160). 4.3 also uses the 340M volumes (600 members, 25 orders/day, typed at :1433), so it mixes the two funding options without the switch.
- The box cost chapter says "master model already includes TSh 8,000 for packing and delivery … of which TSh 3,000 is the rider, leaving TSh 5,000 for packaging" (:1385). The model says `packing_delivery_in_price:8500` = M 5,000 + delivery 3,500 (model.js:17, :54), and D4 says delivery 3,500. **There are three inconsistent splits.**
- The packing fee per size (S 3,500 / M 5,000 / L 6,500, `PACKFEE` :74, :1399) matches D4.

**Box cost:** E-flute box FOB per size (`BX`, :68), insert, card/tissue/seal, sea freight, 25% duty, levies, a local band and envelope estimate. The page states "packaging is fully paid by the customer inside the box price" (:1402). B18 is OK in words. The "Rudisha" return credit is TSh 1,000.

**Package prices table `PK` (:87-89):** 22 hand-typed prices, e.g. Mama na Mtoto 195,500, Afya Hoteli 217,000, Presha Care 43,000. The page claims they come "from the section 3.5 box engine" (:1419), but they are not read from it (B1).

**K1.32 check.**
- Delivery-zone map by municipal councils: **absent live**. It survives only in dead `part4.js:789-797` (ZONES, Ilala/Temeke/Ubungo/Kigamboni). Live has an OSM street-map simulator with zones A ≤5 km / B ≤12 / C (`z8zone`, :538), map data "© OpenStreetMap contributors (ODbL), extract 3 Nov 2026" (:91).
- Payment-vs-cost per delivery: shown live as a table, not a chart.
- Box calendar "member delivered on day 3": **absent live**. It is only in dead `part4.js:838`.

**Package films — `window.AFYA_PACKF` (:3-20; consumed only in range43 `packfilms()` :1413-1420).** All 17 packages have EN and SW films:
- `/_blob/` pairs (13 packages): fam (Mama na Mtoto), binti, glow, man, kijana, sugar, home, aid, presha, kidney, kz, office, hotel.
- `media/pk/<k>.en.mp4` / `.sw.mp4` (4 packages): siku, shule, rec, senior.
- Posters come from `OPEN[k]` blob renders (:1412). The default plays `sugar` first (:1415).
- The description says products go into the open box, then box size, cost and QR shelf guide (:1418). It says **nothing about gloved hands**, so B15 must be checked frame by frame.
- No `<track>` captions on any video. There is no WebP poster for the ad film (`afya-box-ad-poster.jpg`).

**Box design vs E1/B15.** The live box is a printed **E-flute corrugated mailer** ("FEFCO 0427" roll-end tuck-front, sources :45-46). It has a "coloured sleeve, a round sticker, a thin stripe along the bottom edge and the package name in gold foil" (:1425), with the name "printed in gold on the front" (:1377), and a "matte black paper band" with the member's name (:1329). E1 locks a **rigid lidded box** with the package name on the *side*. B15 allows only the gold side label plus a colour sticker to change. Flag as **old/variant box design**. `BOXV2` (:1411) gives each of the 17 boxes its own UI colour hex (#C98B7A … #7A3E3E). C2 says package colours exist only inside imagery.

**Line-up (`BOXV2`):** Mama na Mtoto, Binti, Siku, Glow, Men, Kijana, Shule, Home, Huduma ya Kwanza, Presha, Sukari, Figo, Kupona, Bibi na Babu, Kazini, Ofisi, Hoteli. B16's pregnancy-trimester, newborn/baby/toddler and business boxes are not separate. `PK` adds Mama Mjamzito and Kazini Duka/Saluni/Karakana/Chakula/Ofisi Ndogo (:87-89).

**B4 problem:** QR page item "Ask a pharmacist — A WhatsApp line to an **Afya pharmacist** during opening hours" (:1339). This implies Afya employs a pharmacist and gives medicine advice. It conflicts with 4.4 ("no medicine advice was given by Afya staff", `part4.js:1064`) and with 4.5's partner-pharmacy flow. The "Pharmacy envelope … Any medicine travels sealed … with its dispensing label" (:1329) does not name the partner pharmacy.

**Other rule issues.**
- B2: KES prices are converted with no stated rate or date (:1433). US$ table lines have no date (:1388).
- B7/B8: alt is hard-coded English `"${b[0]}, open and packed"` / `", closed"` (:1426), and many images use alt="". In English mode the package names are Kiswahili ("Huduma ya Kwanza", "Kupona", "Bibi na Babu"). The SW text alternates "dereva" and "msafirishaji" for "rider" (:994).
- C5: 16 `@keyframes` (z8ride, z8scan, z8draw…), infinite alternating `z8trw/z8trk` (:1293-1295), and an auto-rotating QR list `setInterval(...,2600)` (:1464). There is only a partial reduced-motion rule (:1305).
- C7: 11 gradients, 6 box-shadows, `backdrop-filter` ×6; Inter font (:1038); C3 uppercase "AFYA BOX · SUK-M-2611" (:1342).
- A4 (process narration, borderline): the sources footer reads "Images are photorealistic renders of the proposed design, not photographs of produced items" (:1448). "Concept renders" appears at :1427 and "concept images" at :1420.
- B6: Maersk/DHL comment (:278, code only).
- European RePack and Dotcom Distribution (US) packaging-survey stats are used as evidence (:56-58). These are context, not a model.

**Images and videos (`img/e3/*` via `IM`, :30, plus blobs):**
| path | where | flag |
|---|---|---|
| img/e3/box-closed.webp | cover :1318 | check-oldbox |
| img/e3/box-open.webp, box-inside.webp, box-shelf.webp, box-cabinet.webp | idea3 :1331 | check-oldbox |
| img/e3/mark-gold.png (`.webp`→`.png` replace) | QR centre :1341 | brand |
| img/e3/dieline-photo.webp | :1358 | object |
| img/e3/sizes.webp | :1377 | check-oldbox |
| img/e3/bags.webp, img/e3/shop-counter.webp | :1405 | place |
| img/e3/shop-wall.webp | end3 :1446 | place |
| img/e3/dsm-streets.webp | map bg :784 | map |
| media/e3/afya-box-ad.mp4 (+ `afya-box-ad-poster.jpg`) | :1332 | check-oldbox |
| /_blob/3b757ff4…, /_blob/40cfe32d… | QR photos :1341 | check |
| /_blob/2041d6ed… | 17-box line-up :1425 | check-oldbox |
| /_blob/fcfff253… … /_blob/520a8d1e… (17, `BOXV2`) | closed renders :1411 | check-oldbox |
| /_blob/2bb4505a… … /_blob/5d2dfa27… (17, `OPEN`) | open renders / posters :1412 | check-oldbox |
| `AFYA_PACKF` 26 blob videos (:4-20) + media/pk/{siku,shule,rec,senior}.{en,sw}.mp4 (:6, :11, :16, :17) | package films | check-gloves |
| /_blob/85fc1849… (EN) / /_blob/9f90f2d1… (SW) | shop-display video :1429 | check |
| /_blob/f17abc40… | display poster + wall photo :1429-1430 | place |
| /_blob/1555a23e… | aisle-end photo :1430 | place |

There are 67 unique `/_blob/` ids in range43 and none in the other three files.

**Decision:**
- **Keep** the content depth.
- **Rebuild** K1.32: municipal-council zone map SVG, payment-vs-cost chart with cost recovered inside the price, the box-calendar day-3 view. Read every number from MODEL so the funding switch works.
- Reconcile 8,000 / 8,500 / 3,000 / 1,000 against D4.
- **Re-render** the box imagery and films on E1 with gloved hands (B15).
- Fix the "Afya pharmacist" line (B4).

**Visual:** Still plus video (Part G), the map simulator kept as an interactive. **Research:** D4 reconciliation; R6 for package prices; no R-package is named in Part G.

---

## 4.4 Team and daily operations (live: `part4.js` sec44, :911-1087)

**Today.** Built with the `secShell` template: hero, lede, accordion modules. It contains an org chart SVG (:945-955), a shift plan 08:30–21:00 SVG (:957-958), a clickable day timeline (`DAY`, :924-934; init `p4tl`), SOP checklists open/day/close/week with a progress ring (`SOP`, :935-939; `p4sopl`, `p4ring*`), a handheld "three taps" demo (`TASKS`, :940-943; `p4hscr`, `p4taps`), the eight roles with pay, hiring and training, pay law (minimum wage GN 605A, NSSF, PAYE, WCF, SDL), a pre-opening hiring cost table, careers, "The smaller first store" module and risks. Sources: 9 (`S44`, :914-923).

**Numbers.**
- Staff come from MODEL `I.staff` (store lead 1 × 1,500,000; advisers 4 × 900,000; picker 1 × 700,000; riders 2 × 600,000), and the employment cost from `I.opex_month.staff` = 8,349,400.
- The prose also hand-types "eight employed people", "TSh 8,349,400 a month, about 7.3% of revenue" and "180 m²" (:963). These do not respond to the switch.
- Pre-opening table: "Store lead, from two months before opening · 2 × 1,500,000 × 1.105 · TSh 3,315,000" (:1018).

**Checks.**
- **Cecilia (B21):** org chart box "Founders & board — Fahmy · Cecilia · investors" (:948). **No relationship is stated.** OK.
- **Manager two months pre-opening:** yes. "The store lead starts two months before opening" (:1013) and the cost row (:1018). The role is called "Store lead & senior adviser", "physiotherapy graduate preferred" (:951, :972), not "shop manager". The 150M module says "one month before opening" (:1063).
- **Team photos:** none in 4.4. The only images are `img/s-counter.webp` (hero, counter and box wall) with fallback `img/interior.webp` (:957). `img/team.webp` (alt "advisers in royal green at the corner counter") appears only in **dead** part4 sec41 (:536), with check.webp/hub.webp/rider.webp (:537-539, people in alt). `img/e1/founder.webp` is live in **4.1**, not 4.4.
- Org chart shows "Partner pharmacy · licensed · under contract" (:950), and the risk text says advisers hand medicine questions to the partner pharmacist (:1064). B4 is OK here.

**Rule issues.**
- **B5:** module "The smaller first store" (:1058-1062) describes the TSh 150M option (100 m², 5 people, `LI.opex_month.staff`) on the same page as the flagship figures. Both options are shown side by side instead of through the switch.
- B9/C2: shift-plan rider bar colour `#c9b8ff` (**purple**, :957). Other colours (#5fbf8f, #f2c96b, #d9b56e) are not tokens.
- C7: the 4.4 CSS block (:325-386) uses a neon gradient line, `box-shadow:0 0 16px var(--gold)` glow (:338) and a red scan line with glow `#e5484d … box-shadow:0 0 8px` (:359).
- B7/B8: English-only source, relying on the `sw-dict.js` layer. Prose text nodes are well covered (87 of 90 found exactly). Misses include "Store lead & senior adviser" (SVG). Array strings such as "Doors open", "~6 min a box", "2 on floor" and source titles are not exact dictionary keys, so they risk mixed-language output in SW mode.
- R2 inconsistency: DAY says quick check "about 50 seconds" (:926) but also "full Afya Checks (15 measurements in about 4 minutes)" (:931).
- 4.3 rider pay is TSh 25,000/day against MODEL's 600,000/month for riders. These do not reconcile.

**Decision:** **Keep / Re-skin** (Part G Keep). Make the 150M content switch-driven, not a module. Replace hand-typed totals with MODEL reads. Remove the purple and the glows. **Visual:** Still (org chart and shift plan as clean SVG, no photos per K1.33). **Research:** R4.

---

## 4.5 Quality and compliance (live: `part4.js` sec45, :1088-1332)

**Today.** `secShell` with 12 modules (titles at part4 :1234-1300): summary · why quality · who regulates what · what Afya sells (partner pharmacy) · shelf entry checks · stock safe and in date · complaints/recalls · after-sale · licences and calendar · what compliance costs · monthly quality review · risks. Visuals: `V45` (:1174-1222) has a hero with six KPIs, the WHO 1-in-10 grid, 4-regulator cards, the medicine order flow SVG, five checks, FEFO expiry zones, a 7-step recall with timeline, after-sale KPIs, a 12-month compliance calendar, fee-vs-budget bar and quality KPIs. Interactives: product-tier list `p4plist` (`PROD`, :1107-1119), FEFO/FIFO pick demo (`p4fifo`), compliance checklist ring (`p4ccl`), verdict `p4verd`. Sources: 14 (`S45`, :1091-1105).

**TBS vs TMDA split.** "TMDA … registers medicines, medical devices and diagnostics, licenses the premises … recalls"; "TBS … took over the control of cosmetics and food products from 1 July 2019" (module "Who regulates what"; s45 extract lines 155-160 ≈ part4.js:1242-1247). This matches R1. The product table, however, never lists food. Nappies and wipes are given as "TBS standards" and supplements as "TMDA or TBS, depending on claims" (:1112-1114).

**Fee table ("What compliance costs", ≈ part4.js:1284-1294):**
- TMDA retail device dealer's permit TSh 60,000 (2011 fee schedule).
- PDPC TSh 100,000 / renewal 50,000.
- OSHA, fire and business licence "set at inspection".
- Product registration "None for Afya at launch".
- Retention USD 200 / USD 50, with **no TSh figure and no rate**.
- Budget: model `insurance_licences` 500,000/mo, TSh 6M/yr.

Gaps against R1: no TBS registration TZS 50,000 or premise TZS 150,000, no PVoC US$250–5,000, no 15% CIF penalty, no BRELA TZS 217,200 or UBO rule. BRELA appears only as "annual return" in `CAL` (:1126). The compliance budget is not the R1 TSh 8–12M line.
- **Conflict with 4.2:** 4.2 cites the TMDA 2024 regulations at "retail device outlet TSh 100,000" (`range42.js:23, :99`). 4.5 uses TSh 60,000 "from the most recent published fee schedule found (October 2011)".

**Compliance calendar (K1.34):** present (`CAL`, :1120-1130, and `V45.cal`). It covers monthly TRA, quarterly mock recall, 30 June TMDA permit, partner-pharmacy licences filed, yearly business licence/BRELA/fire, per product, and PDPC every 5 years. **Expiry zones:** four batches on 1 Nov 2026 (B-2603 21 days, B-2607 39, B-2609 80, B-2604 302) with ≤30 pulled / 31–90 front / >90 normal (:1196-1201). **Recall:** seven steps plus a timeline 10:00→16:00 with "14 buyers", using TMDA Class I/II/III deadlines of 14/21/30 days (:1202-1206, :1225-1228).

**Medicine order flow — B4: PASS.** SVG lanes "AFYA BASICS" / "PARTNER PHARMACY". Steps: 1 Request → 2 Pharmacist → 3 Sale "Pharmacy receipt, paid directly" → 4 Sealed bag → 5 Rider delivery. It reads "Afya never chooses, opens, sells or takes payment for a medicine" (:1181-1188). `PROD` tiers say "Partner pharmacy sells it" and "Partner pharmacy · prescription only" (:1106). The KPI reads "0 medicines sold by Afya" (:1175). This conflicts with 4.2 (:77, :103, :1172, :1177) and 4.3 (:1339). The shipment process (Part G) is not in 4.5; it lives in 4.2.

**Rule issues.**
- B2: "USD 200 … USD 50" with no TSh figure, rate or date (≈ :1293).
- B9/C2: TIER colour `#ff8f7a` (coral-red, :1106) and PDPC card `--c:#c9b8ff` (purple, :1182).
- C7: 4.5 CSS (:387-473) has glow dots `box-shadow:0 0 8px var(--c)` (:397), `.p4bt.pick … 0 0 30px -6px var(--gold)` (:419), recall pulse `drop-shadow(0 0 6px var(--gold))` (:428), and gradient panels (`linear-gradient` :1138, :1147).
- C5: SVG `<animateMotion dur="5s" repeatCount="indefinite">` pulse in the recall diagram (:1228) autoplays forever with no reduced-motion handling.
- C3: uppercase HUD captions ("Concept image · …" with `text-transform:uppercase`, :1136, :1142, :1152, :1162), and SVG labels "AFYA BASICS", "PARTNER PHARMACY".
- B7/B8: relies on `sw-dict.js`. Prose is 106 of 110 text nodes found. Misses include "Swipe sideways to see the whole diagram/chart/calendar" (×3). SVG strings and source titles are English only.
- B11: no red-cross glyph found in code. `img/prod-firstaid.webp` should be checked visually.

**Images:**
| path | where | flag |
|---|---|---|
| img/c-stock.webp | hero :1230, V45.hero :1175 | place |
| img/interior.webp | hero fallback :1230, `FB` onerror :6 | fallback |
| img/prod-firstaid.webp | five checks :1192 | check-redcross |
| img/e2/qc.webp | after-sale :1206 (alt: monitor and cuff) | object |

**Decision:** **Rewrite** on R1 (Part G):
- build an R1 fee table in TSh with source and date (TBS, PVoC, penalty, BRELA, TMDA 2024 fees);
- add food and the regulation flag per family;
- add the shipment process (PVoC → TMDA permit → clearing);
- reconcile 60,000 vs 100,000.

**Rebuild** the visuals on tokens (no glow, no infinite pulse). Keep the B4 medicine flow as the reference that 4.2 and 4.3 must match. **Visual:** Table. **Research:** R1.

---

## Cross-section findings (summary)

1. **B4 conflict:**
   - 4.5 and 4.4 say Afya never stocks medicines.
   - 4.2 says Afya buys OTC medicines from wholesalers (`range42.js:77, :103, :1172, :1177`).
   - 4.3 promises "an Afya pharmacist" (`range43.js:1339`).
2. **FX:** 4.1 and 4.2 use 2644.05 USD→TZS dated 2 Nov 2026 (CurrencyBeacon); in 4.2 the rate and date appear only in the deep reader. 4.3 uses `FX=2640` with no date, while its text says 2,644. KES values (4.3) have no rate.
3. **Delivery economics:** 4.3 "8,000 (3,000 rider + 5,000 pack)" disagrees with MODEL 8,500 (5,000 + 3,500), with D4 delivery 3,500, and with MODEL rider/order 1,000 (340M) versus 3,000 (150M). range43 never reads MODEL.
4. **TMDA retail permit:** TSh 100,000 (4.2, 2024 regulations) versus TSh 60,000 (4.5, 2011).
5. **K1.30–K1.32 components named in Part K survive mostly in dead part4 code.** The live range4x pages replaced them with other, richer components that are not in Part K.
6. **Design:** none of the five sections uses Sora or the C2 tokens. Fonts are Plus Jakarta Sans/Fraunces/JetBrains Mono (4.1), Inter (4.2/4.3) and part4 vars. Ivory/white/grey sections, purple `#c9b8ff`, coral `#ff8f7a`, glows, scroll-reveal entrances and Ken-Burns/infinite animations appear throughout.

## Present but not in Part K (explicit list)

- **4.1:** stack and alternatives table; running bill and switch-on bill; device flat-lay with prices; role/data access matrix; data inventory; build plan and acceptance tests; year chooser (1→47 stores); risk table; glossary; full-explanation reader panel; "1-minute film" slideshow; 7-step "one sale" sticky story; dashboard scenario tabs (base/best/downside).
- **4.2:** six-step "How it works"; six product families with regulator; candidate wholesalers (Reno Distributors, Pacific Diagnostic, NajRam) and terms; landed-cost slider calculator; factory→shelf waterfall SVG; cash-position-of-one-import chart; reorder simulator; three phases by store count; six quality gates; permits table; weekly rhythm and roles; explainer boxes per chapter; 12-week pre-opening plan (reader); film slideshow; glossary.
- **4.3:** packaging engineering (McKee BCT, iPack factors, die-line SVG per size); 3 sizes × 4 inserts; scannable QR demo; unboxing layers; box cost table; paper bags at the till (GN 291 plastic ban) with prices; Rudisha box return (TSh 1,000 credit); shop display wall, aisle-end and display film; 17-box colour line-up with hover closed/open; package-films player (`AFYA_PACKF`); OSM live delivery simulator (waves, battery swaps, cost per drop); rider app step demo; risks.
- **4.4:** clickable day timeline; SOP checklists with progress ring; handheld three-tap task demo; payroll and labour-law calculation; pre-opening hiring cost table; career path; "smaller first store" module; cash/stock protection.
- **4.5:** product-by-product regulation and tier table; WHO 1-in-10 grid; five shelf-entry checks; FEFO vs FIFO pick demo; after-sale warranty and rental KPIs; fee-vs-budget bar; licence checklist ring "ready to trade"; monthly quality KPIs; verdict panel.
