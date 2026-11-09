# Audit 02 — `sections/part0.js` (0.1 Home: the 60-second story · 0.2 The ten-minute presentation)

File: `/home/user/fa-market-lab/showroom-original/sections/part0.js` (2,323 lines, 401 KB). Registered at L2321–2322 (`s0-1` → `render01`/`init01`, `s0-2` → `render02`/`init02`).
Structure: v1 shared code L1–604 (photo kit, cited facts `SRC` L81–86, derived numbers `D()` L91–100, SVG charts L112–138, CSS L140–591); v2 shared L605–1016 (own language toggle, image fallbacks `FB` L613, module-title SW map `MT` L634); 0.1 L1017–2009; 0.2 L2010–2316.
Model values quoted below were read by running `model.js` (base case, `meta.version` "v1.2", flagship option). They are model output, not new numbers.

Legend for numbers: **MODEL** = read from `window.MODEL` at render; **CITED** = hand-typed but carries a source link `c(n)`; **HAND** = typed into the string, no source or "estimate" label beside it.

---

## 0.1 Home: the 60-second story — `render01` L1786–1873

**Decision vs Part G:** Rewrite. **Target visual:** Hero C6.1 The Box Opens (not present today). **Research:** R3, R4, R6, plus R10 (benchmark), and R2/R7/R8 for the parts that stay.

**Today:** `secShell` with hero photo `img/real-mother-baby.webp`, alt "Concept image: a smiling mother holding her baby daughter outdoors" (L1863). Headline "Health essentials, *without the hunt.*" / "Bidhaa za afya, *bila kuhangaika.*" (L1864). SW motto "Afya yako, nyumbani kwako." (L1866). Buttons: brand film, family film, 0.2 link, search (L1867). Reading-time chips 60 s / 10 min / Hours (L1868). Five hero numbers (L1869), all MODEL, base case: Year 1 revenue `F.auto(b.y1rev)` (≈TSh 800M), break-even "Month 10" plus payback text, members month 12 `num(b.mem12)` (593), Year 12 `F.auto(b.y12.revenue)` (≈TSh 80B, 47 stores), the ask `F.m(SEED.amount)` (TSh 340M). Note: the hero numbers are always `D('base')` and do not follow the 0.1 scenario switch. Then **15 modules** (L1788–1862), takeaway (L1870), doors `s0-2, s1-1, s3-4, s6-3` (L1871), sources `SRC` (5 cited links, L81–86).

The hero has no "estimate" label beside the five numbers. The label only appears in the numbers module further down.

### Module-by-module (in page order)

| # | Module (L) | Content / numbers | Decision | Visual | Research | Rule issues (evidence) |
|---|---|---|---|---|---|---|
| 1 | Watch it work · video library (L1789, `vlibHTML` L1109–1127, `VIDS` L1047–1106) | 11 films with chapters, EN/SW transcripts on 4 films, autoplay-next toggle | Keep the library as a reading aid. Brand film and Filamu ya Juma stay at 0.1 (K3). Move the other 9 films to their own sections (2.3, 3.2, 3.4, 3.5) | Video posters | — | Not in Part K as a component. See the video table below |
| 2 | Find your way · reading paths + search (L1790, `PATHS` L1131–1142, `searchHTML` L1160) | 3 paths (60 s / 10 min / due diligence), localStorage ticks, full-text search across all sections | Rebuild as the shell index K1.3 (D1) and remove from 0.1 | Interactive | — | B8: path group label `Part ${n} · ${name}` (L1148), section titles, search chips `['break-even','Afya Check','diaspora','TMDA',…]` (L1162) and the "FAQ" tag are English only. Says "all 36 sections" (L1790), but A1 says 37 |
| 3 | The problem in one line (L1791–1800) | One line + 5 pain chips + 5 fact tiles: **23.1%** c(5), **2.2%**/**17.6%** c(1), **1 in 10** c(2), **5.38M** c(3), **TSh 3.3T** c(4), all CITED. Mosaic of 3 photos | Rewrite. Keep the line and the cited facts as part of the five numbers | Still | R3, R10 | C2: tile colours `#ff9b87 #ffb36b #ff7b9c #c9b8ff` (purple) (L1794–1798). Images `real-p-mama-load`, `real-p-crowd` (faces?) and `real-p-sold-out` (K1.35 says replace) (L1800). C7: gradient text on `em` (L16) |
| 4 | One-page investor summary (L1801–1802, `sumHTML` L1230–1245) | A4 sheet: 5 KPIs (MODEL), 3-scenario table, ask tranches + use-of-funds bars, ownership, risks. Print / copy buttons | Rebuild (closest Part K item is K6.4). It must respond to the funding switch | Table | R4, R10 | A4: "The Canva one-pager follows once the brand kit is set up" (L1802, EN only). Shows `SEED.status` = "Recomputed from the corrected model (Nov 2026)…" (L1232; also L1842). That is process narration and English only. `SEED.use` labels are English only (B8), and one says "until break-even (month 11)" while the model gives month 10 (model.js seed.use). "Simple Solution Ltd" on the sheet (L1232) needs confirming. Tranche colours `#17a06b #0f7a52 #0b5a3d` are off-token |
| 5 | Our answer · store, membership, app (L1803–1812) | 3 cards. Product families `IN.product_families` (520) and `brands_per_item` (4–5) are MODEL. "Under 3 minutes", "under 30 seconds", "before 15:00" and "under 2 minutes" are HAND service targets. Package list `AFYA_PKG.html(L,'compact')` (L1812) | Rewrite into the "doors" | Still ×3 | R6 | **B16:** the line-up rendered from model.js is 15 household packages (Mama Mjamzito, Mama na Mtoto, Afya Shule, Binti, Kijana, Glow, Siku, Men, Home, Huduma ya Kwanza, Bibi na Babu, Kupona, Sukari, Presha, Figo) + 7 Kazini (Duka, Chakula, Saluni, Karakana, Ofisi Ndogo, Afya Ofisi, Afya Hoteli). Missing as separate boxes: newborn 0–3 m, baby 3–6/6–12 m, toddler 1–3, trimesters, and a separate "business" box. Boda boda kit: **absent** (good). Phone mock-up is hand-drawn `PHONE` (K5: screens must come from K6.2). Inline `#d8b46a` (L1812) |
| 6 | How it works · reading to doorstep (L1813–1819) | 5 steps with time badges. `IN.check.quick_seconds` is MODEL, but the step text hand-types "about 50 seconds… full 15-measurement check takes about 4 minutes" (L1814) | Retire from 0.1 (belongs in 2.3/3.2). If kept, Re-skin | Still ×5 | R2 | HAND figures. R2 conflict: 15 measurements in 4 minutes vs the basic tier and the 50-second flow. Images `real-health-check`, `advice`, `real-phone-pay`, `hub`, `real-delivery`: faces? |
| 7 | Services in every box · Afya Huduma (L1820, `hudumaHTML` L1337–1375) | 4 layers; a 17-box picker; per-member money table (MODEL `M.services()`); 5 totals; side-by-side table of all 17 boxes; includes the Fair-deal module (`fairHTML` L1698) and the money explainer (`moneyFlowHTML` L1540) | Retire from 0.1. Move to 3.5 (D3 step 5) and 5.2 | Interactive | R7 | HAND: "(70%)" (L1326), "about 87%… (90%)… 10%" (L1344), "30% below walk-in… 10% commission" (L1369), "× 1.25" (L1331). The model constants `IN.services.*` exist but these strings do not use them. B8: box, service, partner and add-on names come from `esc(r.box/r.service/r.partner/a[0])` with no SW. C2: `HLC` includes `#c9b8ff` (purple) (L1318), and the gold-gradient active pill (L1275). "nurse… on WhatsApp" (L1342) |
| 8 | Afya Kazini business membership (L1821, `kaziniHTML` L1421–1453, `kvHTML` L1777) | 3 sizes; sector picker; per-business money table; 5 totals (MODEL `M.kazini()`); trade cards; OSH Rules 2015 citation (L1453) | Retire from 0.1. Move to 3.5 (business/hotel package pages) and 5.2 | Interactive | R8, R3 | **HAND prices:** `KZOFF={m1:174500,m6:169500,m12:164500,hotel:217000}` (L1405), shown as "TSh 174,500 / 25 staff" with no source (B1, K4). HAND "3% member saving", "× 30%", "+18%, 4 trips × TSh 2,000", "× 1.25", "25% markup", "about 3 new a month" (L1413–1418, L1446). B8: `L(esc(r.en),esc(r.en))`, so the SW is the same English text (L1409). Item names are English only. Images `kz-*` are "Real photos… from Pexels" (L1782) with empty `alt=""` (L1779) |
| 9 | The experience · six moments + interior hotspots (L1822–1827, `momentsHTML` L1248–1259, `HS` L1787) | 6 timed vignettes; 6 hotspots on `interior.webp`. `F.tsh` values in the sp blocks; "TSh 3.3T" CITED | Retire from 0.1. Hotspots go to 3.1 (C6.2 stops) | Still/Interactive | R2 | Faces? on `advice`, `scan`, `real-phone-pay`, `dad`, `diaspora`, `real-elder-care`. B7: "Mama, nakupenda." inside the EN string (L1256). B4: "Before, he sent money and hoped it became medicine. Now he knows exactly what will arrive" (L1256). HAND "fifteen free measurements in about four minutes" (L1787). C5: hotspot hover scale + glow (L186) |
| 10 | **K1.2 Scene player** "Try it · the 60-second story" (L1828–1838; `SCENES` L1021–1027; player L1987–2008) | 6 scenes × 10 s, play/pause, prev/next/restart, keyboard, chapter strip with timestamps 0:00–0:50. Scene stats: 23.1% c(5), 1 in 10 c(2), `~IN.product_families`, `free_readings.length` (15), `num(d.mem12)`, `P(OWN.founders_floor)` (25%) | **Replace** with the Box Opens hero (C6.1) + five numbers + doors. Keep the chapter timestamps as the reading path (K1.2) | Hero C6 | R3, R4, R6 | C5: Ken Burns `p0kb` (L199–200) and blur-in captions `p0up` (L217–223) outside a C6 moment. C7: gradient text (L215). Backgrounds `real-pharmacy`, `real-queue`, `scan`, `dad`: faces?. B8: `aria-label`s and "Space · ← →" are English only (L1829–1834). Scene 6 tranche text `SEED.tranches.map(t=>t*100)` prints "40 · 35 · 25" without a % sign |
| 11 | The numbers · five that matter (L1839–1843, `kpis01` L1034–1044) | 5 KPIs with a working toggle: year-1 revenue (walk-in/box/online split), break-even, members m12, year 12, seed ask. All MODEL, with section links. Scenario switch Base/Best/Downside; `revBars` SVG (L112) and a revenue-split chart | Keep logic, Rewrite (the five sourced gold numbers of G 0.1), Re-skin charts to K2 | Inline SVG chart | R3, R4 | Labelled "Planning estimate", which is good. C2: chart CSS uses `--neon` and glows (L152, L156, L251). Scenario button labels `SC=[…'Base','Best','Downside']` (L70) are English only (B8). The "Year 12" working hand-types "in Tanzania and East Africa" |
| 12 | The ask (L1844–1853) | `F.m(SEED.amount)`, area, staff, break-even, 3 tranches + milestones, post-money `F.m(POSTMONEY)`, founders' floor 25%. MODEL. `ISL()` switches the flagship/start-small text | Rewrite (R4: tranches against pre-sale milestones) | Table | R4, R1, R2 | **SW milestones are hand-typed** (L1846): "…leseni za TMDA…", "wanachama 100… chini ya TSh milioni 16". These will drift from the EN `SEED.milestones`. B1: "TSh 16M" with no source. The SW `h3` always says "kufungua duka kuu" (L1845), even under the start-small option (B5 mismatch). Open-question line on the Phase 0 gap is MODEL, which is good |
| 13 | Ask the showroom · 26 questions (L1854, `FAQf` L1194–1220) | 26 Q&As, EN+SW, 7 category filters, search | Retire from 0.1 and link to 7.5 (K1.20 lives there) | Interactive | R3–R5 | HAND: "tranche 3 waits for 100 members and a monthly loss below TSh 16M" (L1216). B4 / R1: "TMDA registration where required" (L1204) and "TMDA… Pharmacy Council requirements" (L1218). R1 says cosmetics and food are now registered with TBS. Founders: Fahmy + Cecilia with no relationship stated (L1215), which passes B21 |
| 14 | Risks and our answer (L1855–1862) | 7 risk rows, EN+SW | Rewrite → move to 7.3 (link only from 0.1) | Table | R1–R5 | HAND "70% of their walk-in price… 25% markup… below 4 stars" (L1856). **A4 process narration:** "The films show a store that is not built yet… AI video" (L1859) and "The Kiswahili text is a draft… who checks it is an open question" (L1860) |
| 15 | Where to go next · eight parts (L1862) | Part cards from `PARTS` | Keep as the doors (D1/D2), Rebuild | — | — | B8: `Part ${n} · ${layer}`, `pt.name` and `pt.line` are English only. Inline `--pc` part colours |

**Present in 0.1 but not mentioned in Part K:** video library player (11 films, chapters, autoplay-next, transcripts); reading paths + full-text search inside 0.1; one-page investor summary (print/copy); "problem in one line" fact tiles; three-card "Our answer"; 5-step How-it-works strip; Afya Huduma 17-box explainer + table; **Fair deal table + "Build your care" service chooser + 5-step partner onboarding** (`fairHTML` L1698–1719); **"Where every shilling goes" animated money explainer** with a phone mock-up (`moneyFlowHTML` L1540, `mfInit` L1590; it autoplays 6 s steps unless reduced motion, L1591); Afya Kazini sizes/sector picker/trade cards (`kvHTML`); six-moments editorial; interior hotspot image (6 points); 26-question FAQ duplicated from 7.5; risks list; eight-part navigator; **part0's own EN/SW toggle + floating language bar `p0langfx`** (L655–666), which duplicates K1.4; SW-only "Rasimu ya Kiswahili · itakaguliwa…" badge `swNote` (L654); photo disclaimer `PNOTE` (L57).

---

## 0.2 The ten-minute presentation — `render02` L2138–2225 + deck code L2013–2137, `init02` L2227–2315

**Decision vs Part G:** Keep the structure; numbers live from the model; speaker notes in both languages. **K1.1 Presenter mode → Rebuild.** **Visual:** Still per slide. **Research:** all (R1–R10, R10 especially).

**Today:** hero `img/real-mother-back.webp`, alt "a mother with her baby on her back at a pharmacy counter" (L2218). K5 names this file for replacement. Headline "The whole case, *in ten minutes.*" (L2219). 10 modules (L2152–2216), doors `s0-1, s6-1, s5-4, s6-3`.

**K1.1 deck facts:** **16 slides** (`slides()` L2024–2105), 9 investor questions `Q` (L2013–2016), per-slide time budget `BUDGET` summing to 600 s (L2017), proof link per slide `PROOF` (L2109). Controls: first/prev/next, notes, overview grid, presenter view, rehearsal (1×/2×/5×), full screen, help, 10:00 countdown, pace panel; keys ← → PgUp/PgDn Home End T P R N G F 1 2 3 ? Esc (`KEYS` L2146–2153; handler ~L2300–2311).
- **Slide text bilingual only partly.** SW exists only for the H2 title and the first `p0-L` lede (`SLIDE_SW` L2110–2126, injected by regex in `slideOne` L2127–2129). The SW lede is `null` on slides 5, 7, 8, 9 and 14. Every tile, list, table, figcaption and SVG label on every slide stays English. In SW mode each slide mixes the two languages (B7/B8).
- **Speaker notes are English only.** `notesData=slides(...).map(x=>x.n)` (L2230, L2275) has no SW field. The module note claims "speaker notes in English and Kiswahili" (L2200), which is false (B8; G 0.2 requirement not met).
- Numbers per slide: S1 none. S2 23.1% c(5), 17.6% c(1), 2.2% c(1), 1 in 10 c(2): CITED. S3 SVG `5,383,728` HAND-in-SVG (cited elsewhere), city share/buyers/members MODEL, "TSh 3.313T" c(4). S4 average box `F.tsh(IN.members.avg_box)` MODEL (TSh 80,500). S5 cited facts. S6 `~product_families`. S7 `quick_seconds` MODEL but "full 15-measurement check in about 4 minutes" HAND; service-time targets HAND. S8 "15 free measurements in about 4 minutes" HAND (L2066). S9 count of free readings, `paid_tests` (Blood glucose, Total cholesterol, Uric acid, Haemoglobin), checks/day, conversion: MODEL. "+ 11 more" HAND (L2070). The R2 decision says no blood-prick tests. S10 card fees `IN.cards`, plan prices `PLANP`, members, Huduma averages: MODEL. "pay Afya 10%" HAND. S11 staff & payroll MODEL. S12 competitor-type matrix (our own assessment). S13 `profitBars` + Y1 revenue/profit/opex MODEL. S14 `revBars` + first TSh 1B year, Y12 revenue/EBITDA, regions MODEL. S15 seed use + tranches MODEL. S16 ownership donut MODEL.
- **B5:** the S15 EN title is hard-coded "…to open the flagship *and launch the box.*" (L2097) and ignores `ISL()`. The footer does switch (L2099).
- Scenario switch Base/Best/Downside (`SC` labels EN only). "The numbers" table shows the three scenarios side by side (L2207). These are scenarios, not the two funding options, so B5 is not breached, but the table only reflects whichever funding option is active.

### Module-by-module

| # | Module (L) | Decision | Visual | Issues (evidence) |
|---|---|---|---|---|
| 1 | The problem it solves (L2154–2159) | Retire. It speaks to the presenter about "most founders run out of time on slide nine" and "a deck typed by hand drifts" | — | A4 process narration aimed at the founder, not the investor |
| 2 | Our answer · nine questions, sixteen slides + 3-act mosaic (L2160–2163) | Keep the question map, Re-skin | Still | Q colours `#ff9b87 #ffb36b #ff7b9c #b5dfc6 #ffe7a8 #c9b8ff` (L2014–2016), the last being purple (C2). Mosaic `real-empty-shelf`, `scan`, `real-elder-physio` (faces?). Says "every slide carries a real concept photograph" |
| 3 | Presenter's controls (L2165–2166) | Keep (K7 keyboard) | — | OK, bilingual |
| 4 | Ten minutes, drawn: timeline SVG + Canva card (L2167–2173) | Keep, Rebuild SVG on K2 tokens | Inline SVG | Timeline blocks filled with Q colours; `stroke="#fff"` marker. Canva card: link `https://canva.link/jqb4gd2snqa5bpx` (L1, read at L2145); "designed… in Afya royal green and white". K6.3 needs EN **and** SW versions, but only one link exists. Fallback "Canva deck in production" (L2172) is process narration. Cover image `exterior` |
| 5 | **Try it · the presentation (deck, K1.1)** (L2174–2200) | **Rebuild** on the design system: numbers via `model.js`, notes EN+SW, one static render per slide, export to Canva | Still per slide | See deck facts above. Slide CSS: gradient text `.p0-T em` (L355). Slide-in animation `p0sin/p0sinb` (L335–338) is a response to an action, so allowed. `--neon` glows (L332). Card gradients `care:#2a7db8…` (blue) and `senior:#6b5aa8…` (purple) (L2025) breach C2/C7. Ring SVG uppercase "ONE SYSTEM" and module names English only (L2026–2029). B7: S16 "Afya yako, nyumbani kwako. Your health, at your home. Thank you." in one string (L2104). S4 persona labels "Mama na mtoto"/"A new mother" side by side (L2050). B8: "Photo · today" (L2040), "Timer not started", `Slide ${n} of 16` aria labels and the note heading "Slide 01 · " are English only. B4 check: S4 lists "iron tablets" as monthly Mama na Mtoto contents (L2050) |
| 6 | Slide 10, opened up · Huduma compact (L2201) | Retire from 0.2 (link to 3.5) | Interactive | "Slide 10 now carries the services layer" (L2201) is change-log narration (A4). Same Huduma issues as 0.1 #7 |
| 7 | Afya Kazini for the Q&A (L2202) | Retire from 0.2 (link) | Interactive | Same KZOFF HAND prices as 0.1 #8 |
| 8 | Rehearse it (L2203–2208) | Keep, Re-skin | — | "35 to 45 seconds" HAND but matches `BUDGET` |
| 9 | The numbers, all three cases (L2209–2211) | Keep (MODEL) | Table | Scenario notes `demand ×`, `cost ×` MODEL. The note `<p class="note">Best case: …` is English only, not wrapped in `L()` (L2211) |
| 10 | Risks and our answer (L2212–2217) | Rewrite | Table | "the Canva PowerPoint/PDF export once it is ready" (L2215) is process narration |

**Present in 0.2 but not mentioned in Part K:** nine-question map; three-act mosaic; ten-minute timeline SVG; keyboard-shortcut help dialog; rehearsal mode with 1×/2×/5× speed; pace panel; "numbers in all three cases" table; Huduma and Kazini compact panels; risks list. (Part K mentions only "timer, speaker notes, keyboard shortcuts, first/next/previous/all-slides, close".)

---

## Videos referenced (all in `VIDS`, L1047–1106; src are `/_blob/<hash>` with separate SW audio `srcSw`; some also `av1En/av1Sw`)

| # | Film (f) | Dur | Poster (po → fallback) | K3 status / decision | Rule flags |
|---|---|---|---|---|---|
| 1 | afya-brand-film | 273 s | `media/p-afya-brand-film.jpg` → `img/exterior.webp` | K3 "Brand film" at 0.1: **Keep**, check frames | **HAND numbers in the description:** "about TSh 800M in year one net of VAT for the flagship, monthly profit from month 10, 47 stores and about TSh 80B a year by year 12" (L1051). They are baked into the film and cannot follow the funding switch (B5/K4). "billion-dollar" ambition is USD with no rate (B2). Transcripts `media/afya-brand-film.en.txt/.sw.txt`. Poster is JPG, not WebP (K3) |
| 2 | afya-filamu-juma-1 | 155 s | `media/p-afya-filamu-juma-1.jpg` → `img/j-mlango.webp` | K3 "Filamu ya Juma": **Keep**, check poster/frames for faces | "no medicine for a baby with a fever" (L1057). Transcripts en/sw |
| 3 | afya-filamu-juma-2 | 260 s | `media/p-afya-filamu-juma-2.jpg` → `img/k-store-family.webp` | K3 "Filamu ya Juma": **Keep / re-edit** | **B4:** "same-day medicine ordered on WhatsApp" (L1063); the partner pharmacy is not named. Closes on model numbers (they may be baked in). Transcripts en/sw |
| 4 | afya-chain | 230 s | `media/p-afya-chain.jpg` → `img/c-port.webp` | Not in K3. Belongs in 2.3 (K1.28) | "TMDA registration" as a step (L1069). R1 says cosmetics/food go to TBS. Uses "Mother & Baby Box" |
| 5 | afya-how-it-works | 69 s | `media/video-poster.jpg` → `img/exterior.webp` | Not in K3. Move to 2.3 or retire | No transcript track (`tr` missing) |
| 6 | v-store-visit | 35 s | `media/p-v-store-visit.jpg` (built at L1107) → `scan`, `interior` | K3 "visit-film" (3.2): move | "A father walks in…" faces? |
| 7 | v-online-order | 32 s | `media/p-v-online-order.jpg` → `pay`, `hub` | Not in K3 (3.8?) | App screens must come from K6.2 |
| 8 | v-afya-box | 40 s | `media/p-v-afya-box.jpg` → `dad`, `boxdoor` | Not named in K3 (3.4/3.5) | old-box? check against E1 |
| 9 | v-diaspora | 34 s | `media/p-v-diaspora.jpg` → `diaspora`, `bibi`, `boxdoor` | Not in K3 | faces? |
| 10 | v-huduma | 45 s | `media/p-v-huduma.jpg` → `real-mother-baby` | Not in K3 | HAND "10% commission", "all 17 boxes" (L1100) |
| 11 | v-investor-60 | 62 s | `media/p-v-investor-60.jpg` → `exterior` | Not in K3. Candidate for the 0.1 "60 seconds" | Figures baked into the film (L1105). They cannot follow the funding switch |

**Not present in part0:** `afya-boxes-film` and `afya-box-ad`. K3 places them at 0.1/3.5, but they only appear in `part3c.js` and `range43.js`. The K3 "Customer sample film" for 0.1 also does not exist yet. Library text (L1109) says "Eleven films… seven short films"; the count is correct.

## Every image path referenced (literal + built by `p0kimg`/`bgi`/`imgFb`/`mxImg`/`KV`/`SIMG`/`FB` fallbacks)

All resolve to `img/<name>.webp` unless shown otherwise. Fallback map `FB` (L613): scan→interior, pay→team, dad→check, diaspora→boxdoor, bibi→boxdoor, advice→team.

| Image | Where (L) | Flag |
|---|---|---|
| real-mother-baby | 0.1 hero L1863; MX_MEMBER mama L1535; v-huduma fallback | **faces?** (alt "smiling mother", named in K5) |
| real-mother-back | 0.2 hero L2218; MX_MEMBER preg | **faces?** (named in K5) |
| real-pharmacy | scene 1 L1022; slide 2 SIMG | faces? |
| real-queue | scene 2 L1023; slide 1 SIMG | faces? |
| interior | scene 3; hotspots L1824; slides 9, 12; fallback | ok (approved base, E2) |
| exterior | 0.1 card L1805; slides 6, 15, 16; Canva cover L2170; poster fallbacks | ok |
| exterior-side | scene 6 L1027 | ok |
| scan (→interior) | scene 4; moments L1251; slide 7; act mosaic | faces? |
| check (fallback of scan/dad) | L1025, L613 | check |
| dad (→boxdoor/check) | scene 5; moments L1254; slides 4, 10 | faces? |
| boxdoor | 0.1 card L1807; fallbacks | ok (locked reference E1) |
| real-p-mama-load | problem mosaic L1800 | faces? |
| real-p-crowd | problem mosaic L1800 | faces? |
| real-p-sold-out | problem mosaic L1800 | check (K1.35: replace) |
| real-health-check | how-it-works L1814; MX sugar/kidney; slides 5, 9 | faces? |
| advice (→team) | how-it-works L1815; FAQ L1221; moments L1249; slide 4 | faces? |
| team (fallback) | FB L613; slides 8, 13 SIMG | **faces?** (K5 team) |
| real-phone-pay | how-it-works L1816; moments L1252 | faces? |
| hub | how-it-works L1817; slides 7, 11 | old-box? |
| real-delivery | how-it-works L1818; slides 5, 14 | check (rider from behind) |
| diaspora (→boxdoor) | moments L1256; slides 4, 5 | faces? |
| bibi (fallback) | v-diaspora | faces? |
| real-elder-care | moments L1257 | faces? |
| real-stress (→real-street-walk) | slide 1 L2040 | faces? |
| real-street-walk | slides 3, 5 | faces? |
| real-elder-portrait (→boxdoor) | slides 4 (persona), 4 SIMG; MX senior | **faces?** (portrait) |
| real-woman-phone (→team) | slides 5, 13; MX office/hotel/glow/siku | faces? |
| prod-baby | slides 4, 10 | check (brands visible?) |
| prod-firstaid | slide 4 persona | check (red cross on kit? B11) |
| real-empty-shelf | 0.2 act mosaic L2164 | check |
| real-elder-physio | act mosaic; MX_PART senior/rec | faces? |
| real-recovery, real-bp-nurse, real-man-phone, real-family | MX_MEMBER L1535 | faces? (nurse, family) |
| real-baby-massage, real-nurse-newborn, real-dental, real-partner-clinic, real-lab | MX_PART L1536 (`real-lab` captioned "Photo · Pexels", L58–59) | faces? (real stock photo) |
| kz-duka, kz-chakula, kz-saluni, kz-karakana, kz-ofisi | KV cards L1772–1779, `alt=""` | faces? ("Real photos… from Pexels", L1782) |
| kz-cpr | L1781 | check (hands, Pexels stock) |
| j-mlango, k-store-family, c-port | poster fallbacks L1053/1059/1065 | faces? / old-store? / ok |
| pay (fallback) | v-online-order | check |
| media/p-afya-brand-film.jpg, p-afya-filamu-juma-1.jpg, p-afya-filamu-juma-2.jpg, p-afya-chain.jpg, video-poster.jpg, p-v-store-visit.jpg, p-v-online-order.jpg, p-v-afya-box.jpg, p-v-diaspora.jpg, p-v-huduma.jpg, p-v-investor-60.jpg | video posters (L1049–1107) | check (JPG not WebP; faces unknown) |

**Disclaimer conflict (B12):** `PNOTE` (L57) says "no real person's photograph is used, and people appear only from behind or as hands". The page contradicts it in three ways: alt texts describe frontal people ("smiling mother", "worried woman, hands on her head", "health worker checking an older woman's blood pressure", "crowd pressing around one busy counter"); `real-lab` is captioned "Photo · Pexels"; and the KV note says "Real photos of workplaces from Pexels". Image captions "Concept image" / "Photo · Pexels" (L58–59, `p0kcap`) are English only (B8).

## Cross-cutting rule findings (file-wide)

- **C2/C7 colour and effects:** `--neon` is used 67 times. Off-token colours include coral/pink/orange `#ff9b87 #ffb36b #ff7b9c #ff8f7a #ff9f8b`, purple `#c9b8ff`, cyan `#7fe3ff` (money explainer, L1458–1534), blue `#2a7db8`, purple `#6b5aa8` (L2025). Glows `0 0 Npx` at L152, 156, 179, 186, 208, 221, 227, 251, 332, 695, 699, 709, 870, 1474, 1505, plus `drop-shadow` glow at L400. **Gradient text** at L16, L215, L355 (every `<em>` in band/split, scene and slide headings). All-caps tracked eyebrows are everywhere (e.g. `.p0k-k` L13, `letter-spacing:.2em;text-transform:uppercase`), which C3 bans. Fonts are `--f-hud`/`--f-display`, not Sora.
- **C5 motion outside the C6 moments:** `p0kb` Ken Burns (L199), `p0up` blur-in (L217, L223), `phpop` pop-in (L1479–1480), `rise` (L1493), infinite blink `p0blink`/`blink` (L709, L977, L1474), hover scale/translate on cards and images (L38, 175, 186, 233, 291, 516, 701, 741, 859, 1748, 1751), money explainer autoplay (L1591). Only `.mx-*` has a reduced-motion override (L1533). The scene player and Ken Burns have no `prefers-reduced-motion` guard in this file.
- **B11 red crosses:** none found in code. Check `prod-firstaid` and `kz-cpr` imagery.
- **B4:** Juma film part 2 "same-day medicine ordered on WhatsApp" (L1063); moments "hoped it became medicine. Now he knows…" (L1256); slide 4 "iron tablets" in the Mama box (L2050); FAQ mentions "Pharmacy Council requirements where they apply to the range" (L1218). Nowhere does part0 state that medicines come through the licensed partner pharmacy.
- **B5:** no side-by-side 340M/150M display. `LSEED/LAREA/LSTAFF/LBE` with HAND fallbacks (150e6, 100, 5, 8) are defined but unused (L107). Gaps: S15 EN title fixed to "flagship" (L2097); 0.1 Ask SW `h3` fixed to "duka kuu" (L1845); film figures are flagship-only.
- **B7/B8:** SW slide bodies and speaker notes are missing (above). Model labels `SEED.use`, `SEED.milestones` (EN), `SEED.status`, `IN.staff`, Huduma/Kazini item names, `SC` scenario names, `PARTS`, ARIA labels and the SW-only `swNote` badge are each in one language only.
- **A4 process narration:** L1802, L1842 (`SEED.status`), L1859, L1860, L2154–2159, L2172, L2201, L2215, L1718 ("This is the short version for the front door").
- **K4 hand-typed figures still in strings** (not via `model.js`): KZOFF prices (L1405); services percentages 70/30/10/87/90/81/12/20 and ×1.25 (L1326–1371, L1690–1735); Afya Check "15 measurements / 4 minutes / 50 seconds / + 11 more" (L1787, L1814, L2066, L2070); "TSh 16M / 100 members" SW and FAQ copies (L1212, L1216, L1846); brand-film and investor-60 figures (L1051, L1105). Service-time targets (<30 s, <3 min, 15:00, <2 min) are unlabelled targets.
- **R2 conflict:** model `check.paid_tests` (glucose, cholesterol, uric acid, haemoglobin, lipids) appear on slide 9 (L2070) and the FAQ. R2 says basic tier only, with no blood-prick tests.
