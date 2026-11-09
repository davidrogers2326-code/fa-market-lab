# Audit 01 — Shell (index.html), model.js, sections/sw-dict.js

Scope: `showroom-original/index.html` (1,317 lines, 153 KB), `model.js` (1,403 lines, 336 KB), `sections/sw-dict.js` (109 lines, 1.24 MB). Only reading was done. File:line references point to `showroom-original/`.

**Main finding.** `model.js` is far more than a financial model. Lines 1–186 are the model. Lines 188–250 are the package catalogue. Lines 253–567 are a whole second design system ("v3": CSS, a 19-type SVG chart library, the runtime, the funding switch). Lines 570–1401 are the long-form "analyst brief" modules for 35 sections (`window.V3MODS[...]`). `index.html` is also two things at once: the shell, and a live hand-built home page with its own dead fallback renderers.

---

## 1. Shell (D1 / K1.3, K1.4, K1.5, K1.21)

### 1a. Navigation / reading path (K1.3)
- **What it does today:**
  - A fixed left sidebar `.rail`, 286 px wide (index.html:651–660). It holds the brand mark, the TOC (`rail()` at index.html:723), a part accordion with coloured dots per part (`--pc`), and the footer: a "Signed off 0/36" progress bar, the EN/SW buttons and the Overview / Cover buttons.
  - On a phone, the `tocBtn` button ("Contents · <current>") opens the rail as a drawer, with a scrim behind it (index.html:661, 1197–1198).
  - The `#index` "Overview" overlay lists every part (`buildIndex`, index.html:734).
  - Routing uses the hash (`route()`, index.html:1186). Each change runs `afya:leave` and a full `innerHTML` re-render of `#app`. Unknown hashes go to `home()`.
  - The section list is `PARTS`, with 36 sections (index.html:692–700; the brief says 37). Kiswahili titles come from the parallel `PARTS_SW` (index.html:702–709).
  - Prev/next is a `.pager` built in `secShell` (index.html:1161).
  - A cover "opening" dialog is shown once per session (index.html:632–650, 1199–1214).
  - `model.js:545` adds a gold scroll-progress bar `.v3prog`.
- **Decision: Rebuild.** It becomes the D1 index: numbers only, expanding to titles on hover, current section in gold, a bottom sheet on phone, and a sticky top bar (wordmark, EN|SW, funding switch).
  - Keep: `PARTS` data, the hash router, `secShell` prev/next.
  - Retire: the "Signed off" progress bar, part colour dots, `.lay` layer labels, the Overview overlay (it duplicates the index), the cover dialog (see §5) and `.v3prog`.
- **Visual:** C2 tokens only, Sora, gold for the current number.
- **Research:** none (R10 for the reading order).
- **Gaps against D1:**
  - There is no sticky top bar.
  - The funding switch shows from the first screen, not "from 1.3 onward".
  - The sidebar shows titles all the time.

### 1b. EN/SW toggle (K1.4)
- **What it does today:** `.glang` buttons in the rail footer (index.html:656) write `localStorage.afyaLang` and set `html.p0-swon` and `lang`. They then call `route()` and restore the scroll position (index.html:1196). Four translation mechanisms run side by side:
  1. `TL(en,sw)` ternaries at render time (index.html:710). Used for only part of the home page; most strings in `home()` are English only. Examples: "One business. Three ways in.", the SIG/WAY/STEPS/MONEY arrays, the ask block.
  2. The parallel arrays `PARTS_SW` / `applyLang()` (index.html:712–714).
  3. `V3.L(en,sw)` (model.js:259). It writes both `<span class="v3-en">` and `<span class="v3-sw">` into the DOM and lets CSS hide one (model.js:273).
  4. A Kiswahili text-replacement pass after render. `AFYA_SWDICT` holds exact strings and `AFYA_SWRULES` holds regex rules. A `MutationObserver` runs `swText` on every text node (index.html:1300–1305, "brand guard" script). See §4.
- **Decision: Keep the behaviour; Rebuild the mechanism** into one keyed dictionary (`t(key)` returning `{en,sw}`). Mechanisms 3 and 4 are the ones to fold into `sw-dict.js` (D1: extend, never fork).
- **Visual:** EN | SW text toggle in the top bar.
- **Research:** none.

### 1c. Funding switch 340M / 150M (K1.5)
- **Where it is defined:**
  - The model: `MODEL.setOpt`, `MODEL.cur`, `MODEL.isLean` (model.js:173–185).
  - The button: `V3.optSwitch` (model.js:550). `boot()` inserts it into the rail after the language buttons (model.js:537).
  - The same switch is also printed inline in sections through `V3.leanNote` and `optSwitch()`: 13 uses inside model.js, including the 0.1 summary at model.js:585.
- **How a change spreads:**
  - A document-level click handler on `[data-opt]` (model.js:551) calls `MODEL.setOpt(o)`.
  - `setOpt` writes `localStorage.afyaOpt`, toggles `html.opt-lean` and dispatches `CustomEvent('afya-opt')`.
  - The handler then calls `route()`, which re-renders the whole current section, restores the scroll position and runs `paintOpt()`.
  - `paintOpt()` (model.js:552) patches the cover stats `.op-stats b` and `.op-meta.b`.
  - Nothing listens to `afya-opt`. It is dispatched once and the codebase has 0 listeners. The `opt-lean` class has no CSS rules.
  - There is no numeric animation, so C6.4 is not met.
- **Which sections listen:** a section only "listens" if it reads `MODEL.cur`, `MODEL.isLean()` or the `CUR()` helper when it renders.
  - **Follow the switch:** V3MODS for 0.1, 1.3, 4.5, 5.1–5.4, 6.1–6.4, 7.1–7.5 (`CUR()` at model.js:1128, 1283; `MODEL.cur` at 736, 1386). Section files: part1 (1×), part6 (1×), range38 (4×), range41 (2×), part7 (2×).
  - **Lean note only:** 3.1, 3.3, 3.4, 3.6, 4.3, 4.4 and 5.4 show a lean note (`LN`, model.js:555–562) when "start small" is chosen. Their numbers stay flagship, because `FL()` (model.js:889, 1049) is hard-wired to `MODEL.flag`.
  - **Always flagship:** V3MODS 2.1–2.3, through `M12()` → `MODEL.get` (model.js:820).
  - **Wrong comment:** model.js:174 says "MODEL.get and MODEL.inputs follow it", but model.js:181 binds both to the flagship. Every caller of `MODEL.get` / `MODEL.inputs` therefore ignores the switch: part5 (11 + 8 uses), part2 (5 + 1), part3a, part3b, range38, range41, and **sw-dict.js (8 + 10)**.
- **B5 violations on the live home page:** both options appear side by side.
  - index.html:807 readout: "150M · 340M — seed options in TSh: start small or flagship".
  - index.html:886 and index.html:990 ask: "TSh 150M or 340M".
  - The stale cover still reads "TSh 340M · flagship" (index.html:641, 645) until `paintOpt` patches it.
- **Decision: Keep and extend.**
  - One store of state (`MODEL.cur`) plus a real `afya-opt` subscriber that updates numbers in place, animated (C6.4).
  - Remove `MODEL.get`/`MODEL.inputs` as flagship aliases, or rename them `MODEL.flag`, so that no section can silently stay flagship.
  - Show the switch in the top bar from 1.3 onward.
- **Visual:** quiet two-state segmented control, gold for the figure.
- **Research:** R4 (tranches), R1/R2 (compliance and kiosk lines).

### 1d. Sources footer (K1.21)
- **What it does today:** `secShell` renders `<section class="mod01 srcs"><ol>` from `o.sources` (index.html:1160). It is not collapsible.
  - Other source systems run in parallel: `cref()` inline [n] links (index.html:666), `SRC`/`cite()` (index.html:997–1002, dead code), and model.js `N()`/`srcList()` (model.js:628–629, with a separate `SRC` dictionary per brief).
  - A section without `o.sources` shows nothing.
- **Decision: Rebuild** as one standard collapsible "Sources for this section", generated from the research files, with prev/next inside the footer.
- **Visual:** hairline, `--mute` text.
- **Research:** all (R1–R10), K6.5.

### 1e. Footer / version
- **What it does today:** the home footer reads "Afya Basics Simple Solution Ltd · Dar es Salaam | Concept images · figures are planning estimates" (index.html:890). Section pages have no footer beyond the pager. No version or date is shown (M5).
- **Decision: Rewrite.** Show "Version 2.x · date" (M5).

---

## 2. Design system against Part C

### What is defined today
- **index.html `:root`** (index.html:8–15): "holographic operating room" theme (comment at index.html:7).
  - `--void #020608`, `--deep #04100d`
  - `--panel rgba(10,34,27,.55)`, `--panel2 rgba(14,46,36,.6)`
  - `--ink #effaf5`, `--ink2 #a9c4b8`, `--ink3 #6a8a7d`
  - `--neon #5fbf8f`, `--neon2 #b5dfc6`
  - `--gold #f2c96b`, `--gold2 #ffe7a8`
  - `--cyan #d9b56e` (a gold, despite the name)
  - `--edge rgba(95,191,143,.16)`, `--edge2 rgba(242,201,107,.32)`
- **model.js v3 layer** (model.js:263–264), which overrides index.html:
  - `--ink #f4f1e8`, `--ink2 #dbe3dc`, `--ink3 #97aa9f`
  - `--v3gold #c9a456`, `--v3green #3f8f70`, `--v3green2 #2b6a52`
  - `--v3panel #0c1412`, `--v3paper #f2ead9` (a light "paper" chart style)
  - `--v3hair rgba(244,241,232,.11)`
  - Chart palette `C` (model.js:362) also includes `#4b5a53`.
- **Package catalogue** (model.js:224–235): `#2ef5a8` (neon mint), `#f2c96b`, `#d8b46a`, `#fff`.
- **Hard-coded hex in index.html JS** (index.html:692–790):
  - Part colours `#ffe7a8`, `#e2c88c`, `#5fbf8f`, `#d9b56e`, `#f2c96b`, `#b5dfc6`.
  - Pain colours in `SIG`: `#ff9b87` salmon, `#ffb36b` orange, `#ff7b9c` pink, `#f2c96b`, **`#c9b8ff` lilac/purple** (index.html:743–748; repeated in `EV` at index.html:1004–1009).
  - Box art greens `#0f7a52`, `#0a5a3c`, `#139463`, `#0b6142`.
  - Shell-wide `a{color:var(--neon2)}` and a `--neon` focus ring (index.html:22–23).

### Counts
| Item | index.html CSS (l.6–631 + brand-rules l.1284–1296) | Notes |
|---|---|---|
| Distinct hex in CSS | 39 (80 uses) | plus 17 distinct hex in index.html JS/markup; 28 distinct hex in model.js |
| rgba() | 90 distinct, 170 uses in CSS (201 in the whole file) | mostly neon `rgba(95,191,143,…)` and gold `rgba(242,201,107,…)` tints |
| C2 token hex present | **0 of 9** | none of #000000/#0A0A0A/#262626/#F2F0EA/#8E8C85/#0E6B3A/#083F23/#15934F/#C9A227 is used as a token (`#000` appears 6× in CSS) |
| box-shadow | 42; ≥31 are coloured glows (`0 0 Npx` neon/gold/`--pc`) | e.g. `.state i{box-shadow:0 0 10px var(--gold)}` l.291; `@keyframes pulse … 0 0 18px var(--gold)` l.321 |
| text-shadow (glow) | 5 (l.216, 244, 349, 492, plus brand-rules reset l.1293) | `.sp b`, `.step .t`, `.evc b`, `.plate span` |
| filter:drop-shadow | 6 | `.brand svg` l.34, `.title .l2` l.165, l.204, 413, 438 |
| **Gradient text** (`background-clip:text`) | 3 rules | `.op-title .g` l.97, `.title .l2` l.165 (+30 px green drop-shadow), `.s01h em` l.333; all neon→gold |
| linear / radial / conic gradients | 67 / 21 / 1 | conic "radar sweep" l.77; rail radial glow l.29 |
| backdrop-filter / blur | 7 / 8 | "glass" panels |
| @keyframes | 14: subin, draw, titleup, sweep, fadeup, fadein, photoin, seam, blink, shine, spin, kb, pulse, rise | 30 `animation:` uses; `kb` = Ken Burns zoom l.313; `blink` on status dots |
| Entrance / scroll animation | v3 reveal `.mod01.v3rv` + count-up `.v3count` on every module (model.js:524–529) | breaks C5 everywhere outside hero moments |
| `text-transform:uppercase` | 29; `letter-spacing` 62 | `.hud` eyebrows `.24em` l.25, `.modno`, `.state` |
| prefers-reduced-motion | 1 CSS block (l.627) + 2 JS checks (l.1195, 1222) + model.js count-up check | the reveal and the dust canvas respect it |

### Fonts
- **index.html:5** loads Unbounded 300–900, Plus Jakarta Sans 300–800, Fraunces (with italic) and JetBrains Mono.
- **brand-rules** (index.html:1287) changes `--f-display` to Fraunces.
- **model.js:345** injects a second Google Fonts link: Literata, Source Serif 4, Inter. The v3 CSS then sets display/serif = Source Serif 4, body = Literata 18px/1.74, HUD/UI = Inter (model.js:263).
- The chart text font is `Inter` (model.js:363).
- That makes **7 families** loaded, plus Georgia/system fallbacks. **Sora (C3) appears 0 times.**

### Violations
- **C2 / B9:** zero C2 tokens are used. Off-palette colours in use:
  - salmon, pink, orange, lilac `#c9b8ff` (purple, banned by B9), neon mint `#2ef5a8`;
  - three different golds (`#f2c96b`, `#c9a456`, `#d8b46a`, plus `#ffe7a8`/`#e2c88c`) and several greens;
  - "paper" `#f2ead9` light panels;
  - white used beyond text (`#fff` in the box-art SVG and the brand-mark SVG, index.html:652).
  - Colours are hard-coded in JS and CSS everywhere, not taken from `tokens.css`.
- **B10 / C7:**
  - gradient text (3 rules);
  - glows (≥31 box-shadows, 5 text-shadows, 6 drop-shadows);
  - "neon" is literally a variable name;
  - "glass" `backdrop-filter` panels;
  - a particle effect (cover `#dust` canvas with 45–90 particles, index.html:1203–1205);
  - a confetti routine (disabled with `return;`, index.html:1209);
  - a 3D "glass Afya heart" canvas with a glow ring, comet, halo and data floor (index.html:1218–1282; its `#gl` canvas no longer exists in any file, so it is dead code);
  - a floating phone mock-up (`PHONE`, index.html:775).
- **C5:**
  - animations on non-hero UI: blink, pulse, shine, sweep and kb Ken Burns;
  - v3 scroll-reveal and count-up on every module;
  - pointer parallax on the cover (index.html:1207);
  - hover-transform effects.
- **C3:** an uppercase tracked-out HUD eyebrow on every module (`.hud`, `.modno`, `.state`), mid-dot meta strings ("Part 3 · …", "01 · Headline promise"), and no Sora.
- **The existing runtime "brand guard"** (index.html:1297–1316) tries to fix these after the fact.
  - On every DOM mutation, debounced, it walks every element with `getComputedStyle`.
  - It strips `background-clip:text` (recolouring to `--gold2`), glow box-shadows and drop-shadows. CSS kills all text-shadow (index.html:1293).
  - It is costly (performance against K7) and does not remove gradients, animation, blur or off-palette colour.
  - **Decision:** Retire it once `tokens.css` exists. Clean the CSS itself, not after render.
- **Decision for the whole CSS layer: Rebuild.** Replace both `:root` sets (index.html:8–15, model.js:263–264), the brand-rules block and the v3 CSS with `tokens.css` (C2) and Sora.
- **Chart library `CH`** (model.js:370–520; 19 types: waterfall, hbars, stack, line, cols, gantt, nest, dots, life, mult, pn, scatter, hub, tree, bridge, bridgeH, treemap, util, parts): **Re-skin and keep.** These are inline-SVG charts generated from the model, which matches K2. Recolour them to `--line` / `--green` / `--gold` / `--mute`, drop the "paper" style and remove the draw-on motion outside hero moments.

---

## 3. model.js against K4 / D4

### Structure
- **Inputs:** `const A` (model.js:6–96). Groups:
  - `meta` (FX 2,640 with a source line, l.7)
  - `store` (l.8–9)
  - `check` (15 free readings, 6 paid tests with prices, `kiosk_usd:4990`, l.10–14)
  - `members` (l.15–19)
  - `cards` (6 cards with yearly fees 0/20,000/30,000/25,000/250,000/0, l.20–26)
  - `services` (Afya Huduma: rates, plus 17 `packs` rows, each with a hand-typed box price, mix %, partner walk-in price and add-ons, l.27–52)
  - `kazini` (core kit of 7 items, safety services, 5 sector kits, l.53–74)
  - `online`, `tax`, `opex_month`, `staff` (4 roles), `staff_oncost`, `staff_leave_cover`, `staff_night_month`, `lease_advance_months`
  - `seed` (amount, tranches, 9 use lines, milestones, `phase0_gap`, l.84–87)
  - `ownership`, `growth` (12-year store path 1→47, l.89–92), `scenarios` (3), `care_zones`, `product_families:520`
- **Size:** about 70 scalar assumptions, plus about 200 numeric values inside the arrays (17 packs × ~6, 22 kit items, 9 use lines, 12 store counts, 6 test prices).
- **Derived:**
  - `A.opex_month.staff` (l.97)
  - `NETF` = 1 / (1 + 18% × 85%) (l.98)
  - `servicePacks()` (l.107–113)
  - `kaziniKits()` (l.114–121)
  - `compute(key, AA)` (l.122–152): a 12-month P&L (visitors → buyers → joins/churn → members; box, online, services, commission and Kazini revenue; gross profit; opex; cumulative profit), Y1 totals, break-even month and a 12-year chain view (revenue, GP, store opex, head office, EBITDA, capex, members).
  - **No cash-flow statement, no tranche timing and no market-size calculation in the model.** Market size is done inline in V3MODS 1.3 with typed constants: `960000` spend per household and `255845` households (model.js:736). The 0.1 brief repeats the same constants (model.js ~589).
- **Sources per assumption:** partial. Some comments cite sources: FX (fxfeed.io), churn 8% (churnkey.co), OSH Rules 2015 per Kazini item, ELRA s.20/s.31, NSSF/WCF, "6–8 months up front (The Citizen)", Knight Frank rent (l.156). Most are labelled "planning estimate" or have no comment at all: `store.*`, `conversion`, `basket`, `retail_gm`, `avg_box`, `opex_month.*`, `growth.*`, `scenarios`. **No comment points to a research file and line (K4).** Planning estimates are labelled as such.
- **Model results today** (computed by running l.1–186 under Node):

  | Measure | Flagship | Start small |
  |---|---|---|
  | Running costs per month | TSh 26.85M | TSh 13.83M |
  | Year-1 revenue | TSh 800.5M | TSh 534.9M |
  | Year-1 loss | TSh 93.0M | TSh 19.8M |
  | Break-even | month 10 | month 8 |
  | Members at month 12 | 593 | 389 |

  The year-12 chain is identical for both options (47 stores, TSh 80.0B).

### Box pricing formula (D4)
- **model.js does not implement D4.** The box price formula sits in `sections/part3b.js:536` and `:884–885` (outside my scope, quoted to settle D4). Its constants:
  - member discount `BASE=.08`;
  - plan discounts `PLD={1:0,3:.05,6:.08,12:.12}`;
  - packing `PACKS={S:3500,M:5000,L:6500}`, with a box size per package in `PSZ`;
  - delivery `DELC=3500`, dropped for pickup (`pick?0:DELC`);
  - `PACKC=5000`, unused here.
- **The formula:** `price = r500(val*(1-(BASE+PLD[plan])) + fee + pd)`, where `r500 = Math.ceil(v/500)*500` (part3c.js:535 has the same).
  - It **rounds up** to the next 500, while D4 says "nearest 500".
  - It has **four plans** (1/3/6/12 months: Try/Silver/Gold/Platinum, part3b.js:537–540), while D4 has three.
  - The result is 8 / 13 / 16 / 20 % below shelf.
- **model.js keeps different constants:**
  - `members.plans:{m1:1.00, m6:0.969, m12:0.938}` with the comment "member saving 3% / 6% / 9% off shelf on 1 / 6 / 12-month plans (section 3.5 engine)" (model.js:15). The factors equal (1−6%)/(1−3%) and (1−9%)/(1−3%).
  - `avg_box:80500` (model.js:16) is typed by hand. Its own comment says "margin on box goods after the **8% member discount, 0–12% plan discounts**", which describes the part3b engine.
  - `packing_delivery_in_price:8500` is typed: the M box 5,000 + delivery 3,500 (model.js:17).
  - Kazini uses `discount:0.03` and `pack_delivery:{S:7000,M:8500}` (model.js:54).
  - `r500` here is true nearest-500 rounding, `Math.round` (model.js:106). `up500` is a ceiling, used for service fees.
- **The 3/6/9 against 13/16/20 conflict flagged in D4 is present, and is worse.** One model, three statements:
  - model.js:15 says 3/6/9%. `plans.m6/m12` are read in part0, part1, part3a, part3b and part7.
  - The 3.5 engine (part3b.js:536–540) says 8/13/16/20%.
  - SW rules carry both texts: "Members save 3% … 6% … 9%" (sw-dict.js:64) and "after the member saving of 3–9% by plan" (sw-dict.js:59). part3b.js:1198 prints "3% monthly, 6% on 6 months, 9% on 12 months" next to a computation that uses `BASE` = 8%.
  - **R3 must resolve this.** One constant set then goes into model.js only.

### Two funding options
- **Flagship** is the base `A` (`seed.amount:340000000`, model.js:84).
- **Start small** is `LEAN_DIFF` (model.js:157–166), merged by `leanInputs()` (l.167–170). Differences:
  - store 100 m², 09:00–20:00, visitors 30 → 80 a day (flagship 40 → 110);
  - checks 35 a day (flagship 60);
  - online 15 orders a day, rider cost 3,000 per order (flagship 25 / 1,000);
  - Kazini 20 accounts (flagship 40);
  - staff of 3 roles, 5 people, no riders;
  - opex: rent 3.7M (flagship 11.9M), utilities 0.8M, systems 0.6M, marketing 1.5M, check station 0.3M, insurance 0.4M, packaging 0.7M;
  - seed 150M with 8 use lines;
  - text fields `rent_note` and `upgrade`.
- **Inherited without change:** tranches 40/35/25, the milestone text (which still says "TMDA & business licences", "monthly loss below TSh 16M" and "100 Afya Box members"), members, cards, services, growth and ownership.
- **Bugs and quirks:**
  - `compute()` always returns `inputs:A`, even for start small (model.js:151; checked: `b.inputs===MODEL.inputs` is true for start small).
  - `servicePacks()` and `kaziniKits()` always read `A`.
  - Start-small staff cost leaves out `staff_night_month` (l.169), although opening hours run to 20:00. This is probably intended, but it is not commented.

### Numbers typed by hand where they should be derived (K4)
- `avg_box 80500`, `packing_delivery_in_price 8500` (model.js:16–17).
- The 17 box prices in `services.packs` (32,000 … 214,000, l.36–52), plus the separate `FROM` "lowest price" table (model.js:216). They disagree:
  - `preg` 32,000 in packs against 35,000 in `FROM`;
  - `mama` 192,500 against 122,500;
  - `hotel` 214,000 against 217,000.
- `KZ35={duka:67500,chakula:100000,saluni:85500,karakana:95500,ofisi:71000}` overrides the model's own Kazini formula (model.js:117). The formula gives 64,500 / 96,000 / 87,500 / 90,000 / 71,500.
- Seed use line "until break-even (**month 11**)" (model.js:85). The model computes month 10.
- The kiosk price has four values:
  - `kiosk_usd 4990` × 2,640 = TSh 13.17M (model.js:14);
  - seed line "Technology, Afya Check kiosk & screens" 15M;
  - "about TSh 15.8M" in `LEAN_DIFF.upgrade` (l.166);
  - `kiosk=15.8e6` in the 3.3 brief (model.js:933).
  - R2 has "basic tier ≈ USD 3,267–3,630, TSh 9–10M".
- The 3.3 brief also hard-codes `ck=60*30`, `.35` and `run=600000` instead of reading `check.*` (model.js:933).
- Check spec: `check.minutes:4` with 15 readings including "Vision screening", plus finger-prick paid tests (model.js:10–13). This contradicts the R2 decision (basic tier, 50 s, no blood-prick tests).
- Chart axis limits typed by hand (`max:3600`, `ymax:90`, model.js:599–601).
- `seed.status` says "Recomputed from the corrected model". The use lines are typed numbers that sum to exactly 340M / 150M, so they are not derived.
- **Decision for model.js:**
  - **Rewrite** lines 1–186 as the pure K4 model: inputs read from `data/prices.json`, `data/services.json` and `data/boxes/*.json`; one D4 function used by the 3.5 tables, Build-your-box and `avg_box`; cash flow, tranches and market size added; a source comment per assumption (R-file:line).
  - **Move out** the v3 design system (l.253–567) into a re-skinned component and chart module.
  - **Move out** the V3MODS section prose (l.570–1401) into the section files.
  - **Move out** the inline Kiswahili dictionary at l.538 (a 17.6 KB line that `Object.assign`s into `AFYA_SWDICT`) into `sw-dict.js`.
  - **Research:** R3 (prices, D4), R2 (kiosk), R1 (compliance lines), R4 (tranches), R5 (payment fees), R7 (services), R8 (Kazini).

---

## 4. sw-dict.js against B7 / B8 / K6.1
- **Mechanism:** an exact-text dictionary plus regex rules, applied after render to DOM text nodes.
  - `AFYA_SWDICT` maps a whitespace-collapsed English text node to its Kiswahili text (sw-dict.js:1–8 and the version blocks l.56–109: "v102 dynamic strings", "v107"–"v111").
  - **63 regex rules** in `AFYA_SWRULES` (l.9–52, 62–81, 86–93). Several are number-templating rules; model.js:540–542 adds a generic "same sentence with different numbers" rule.
  - `swText` / `swfix` in index.html:1300–1305 apply both on every DOM mutation, but only when SW is on.
  - Matching is per text node, so a sentence split by `<b>` becomes several keys, such as fragments starting ", plus …".
- **Size:** **7,670 entries** in sw-dict.js. Model.js:538 adds more at runtime. Average key length is 70 characters; 185 keys are over 300 characters (whole paragraphs). Only 1 value equals its key ("Afya Choice"). No values are empty.
- **Missing-language detection:** **not possible today.**
  - A text node with no match stays English, silently.
  - No reporting script exists (K6.1 requires one).
  - Strings can only be found at runtime by walking text nodes. They cannot be checked statically, because keys are rendered English text that changes whenever a number in the model changes (hence the number rules).
  - Several sw-dict rules hard-code English sentences with model numbers. Some sw-dict code calls `MODEL.get` (8×) and `MODEL.inputs` (10×), so it is **flagship-only** and does not follow the funding switch.
- **Mixed-language strings found:**
  - "Ushahidi: Bank of Tanzania **via** The Citizen"
  - "**Store #1** inafunguliwa …", "… pale ambapo **Store #1** na …"
  - The live home page in SW mode keeps English: `home()` sections 01–08, SIG/WAY/STEPS/MONEY, "Photos are for illustration…" (unless the dictionary has them), the ask block. These are not wrapped in `TL()`.
  - `story01` keeps English labels such as "Play the 60-second story" (dead code, see §5).
  - The cover stays English in SW: "Investor showroom", "Open the showroom", "seed ask · flagship".
  - "Hi, Amina" phone mock-up.
  - Brand and product terms (Afya Box, Afya Check, scan-and-go → "scan-na-uende") are a policy question to settle in the dictionary.
- **Decision: Keep the file name and extend it (D1); Rewrite the mechanism** into keyed `{en, sw}` entries with templated numbers (`{n}`). Add a `check-i18n` script that walks every rendered section in both languages and reports untranslated nodes (K6.1, Part I). Text replacement after render is retired.
- **Research:** none. A Kiswahili review by a native editor is advised (not in Part F).

---

## 5. In the shell or model but not in Part K (must be listed in AUDIT.md)
1. **Opening cover dialog** (index.html:632–650, 1199–1214). It has: a seal SVG with motto arc text; a split "ribbon cut" exit; a dust particle canvas; count-up stats (340M, ~520 families, <3 min, 25%); a chapter list; "Confidential · for investor review"; Skip; and a "Cover" replay button. → **Retire**, replaced by the 0.1 Box Opens hero. Keep the motto text.
2. **Live home page `home()`** (index.html:790–891). It is never overridden by a section file and has 9 exhibits:
   - stage hero, with the coordinate tag "6.79°S 39.21°E" and a five-number readout;
   - 69-second film, with 7 chapter buttons and EN/SW blob videos (`/_blob/7fab…`, `/_blob/bf1b…`);
   - "Three ways in" cards, with the box-art SVG and the phone mock-up;
   - five-situations strip (SIG);
   - "Afya Way" eight principles with a filter by problem;
   - store visit with 6 hotspots on `img/interior.webp`;
   - five revenue streams;
   - three-layer stack (Experience / Engine / Economics);
   - route of 8 chapters, the ask, the footer.

   → **Decide.** 0.1 per Part G replaces this as the landing page. The film (K3 "afya-boxes-film" class), the Afya Way and the hotspot visit need explicit Keep/Retire decisions.
3. **Dead fallback renderers in index.html:**
   - `story01` and the 60-second `BEATS` player (index.html:909–995). It states "**The ask: TSh 110M**" and "TSh 110M seed ask", which is stale.
   - `sec11` with the cost-of-the-hunt calculator and the family month tabs (`FAM`), plus `SRC`/`cite` (index.html:997–1137).
   - Placeholder 9-cell grid "In production · frame ready" (index.html:899–906).
   - All are overridden by `SECTIONS['s0-1']` / `['s1-1']`. → **Retire** (delete).
4. **3D "glass Afya heart" canvas** (index.html:1218–1282). Its `#gl` element no longer exists. → **Retire.**
5. **Brand-guard script** (index.html:1297–1316). → **Retire** after tokens.css.
6. **"Signed off N/36" progress bar and the `DONE` set**, and per-section state badges ("Draft · ready for your review", the default in every `secShell`, index.html:1152; "In production · frame ready"). → **Retire** (process narration, see §6).
7. **Package catalogue `AFYA_PKG`** (model.js:188–250). 7 groups, 17 household boxes + 5 Kazini sector kits + office + hotel, each with a card, "from" price and tagline in EN/SW. → **Rebuild** from `data/boxes/*.json` on D3. This is the B16 line-up source.
8. **Afya Huduma service packs and Afya Kazini business model** in the model (model.js:27–74, 107–121). → **Keep logic; Rewrite inputs** from R7/R8.
9. **v3 editorial system** (model.js:253–567): components `lede`, `big`, `imp` "Investment implication", `quote`, `kpis`, `calc`, `fig`, `story` (sticky scrollytelling), plus the 19-type chart library, the reveal and the count-up. → **Re-skin** (components and charts); scrollytelling only for C6 moments.
10. **V3MODS analyst briefs** for 35 sections and **`V3DROP`** (hides named modules per section, including a getter that changes with the funding option for 4.4, model.js:1116–1118). → Move into the section files; review per Part G.
11. **Lean notes `LN`** for 7 sections (model.js:555–562). → **Replace** with real switch-driven numbers.
12. **Video maps** `AFYA_VID` (store-walk-1…4, store-plan-1…2, index.html:668) and `AFYA_D8FILM` (EN/SW blob ids, index.html:681). Covered by K3 (store walk retired; 3.8 film).
13. **Phase-0 funding gap** `seed.phase0_gap` (research/setup TSh 33.3M against a TSh 3.15M budget, "open question", model.js:87). It is not in Part K or Part J. → add to Part J / R4.
14. **Ownership inputs**: investor 30%, founders 65% after the seed, option pool 5%, "split between founders still open" (model.js:88). Feeds K1.18.
15. **Afya Cards with yearly fees** (model.js:20–26), including Afya Royal at TSh 250,000. K1.13 mentions cards but not their fees as model inputs.
16. **`phase` / `regions` growth path to "Nairobi & Kampala pilots", "East African chain"** (model.js:92). Feeds K1.29/K1.38.

---

## 6. Process narration, faces, red crosses, medicine wording
- **Process narration the investor can see:**
  - "Draft · ready for your review" badge on every `secShell` section (index.html:927, 1053, 1152).
  - "In production · frame ready" / "Signed off" (index.html:904).
  - Rail "Signed off 0 / 36" (index.html:655).
  - "Box design · coming in section 3.5" (index.html:788).
  - Film caption "**Concept images, AI video and app mock-ups**" / "video za AI" (index.html:815). This names AI.
  - "Realistic Canva concept visuals" (index.html:902, dead code) and "also a Canva deck" in the 0.2 plan line (index.html:693, 703).
  - "Planning estimates · confirmed against the master model before sign-off" (index.html:970).
  - sw-dict keys "Canva Business payment confirmed, so Step 1 (brand) can start", "The first draft asked for TSh 110M. A line-by-line audit in November 2026 found…".
  - "Built with capacity to spare" (model.js:902) is business language, not tooling. OK.
  - `<meta name="claude:viewport-fit-sides">` (index.html:3) is not visible. OK.
- **People and faces:**
  - "Photos are for illustration; people shown are not Afya Basics customers or staff." (index.html:816) confirms that people appear in the film and photos.
  - `img/today1/2/3.webp` show a mother with her baby on her back at a pharmacy counter, a mother walking, and a crowded queue (index.html:1047, 1079–1081; dead code here, but the same images are likely used in part1).
  - The phone mock-up "Hi, Amina" (index.html:777).
  - sw-dict key "Real-looking Tanzanian people in calm home and store settings…" (photo-style guidance that contradicts B12).
  - The `img/` folder here holds only `boxdoor.webp`. The other images are on the published artifact.
- **Cross symbols:**
  - The box-art SVG draws a **gold plus/cross** on the box lid: path `M-5-16h10v11h11v10H5v11H-5V5H-16V-5H-5z` stroke `#f2c96b` (index.html:787). It is not red, but it is a medical cross on the box. That conflicts with E1 (house emblem) and the spirit of B11.
  - The canvas code comments call its heart shape a "cross" (index.html:1226, 1253), but it draws a heart. Dead code.
  - model.js:848 (2.2 brief) mentions "the green cross on every street" as a description of the market. Acceptable, but check it.
  - No red cross was found in the shell or model.
- **Wording that could imply Afya sells medicines (B4):**
  - Live home SIG: "A new mother needs nappies, wipes and **iron tablets**" (index.html:744).
  - "Only registered products" / "100% registered stock" (WAY, index.html:757). This is ambiguous, but OK.
  - Dead `sec11`: "Mama's iron and folic acid tablets … She adds the tablets to next month's box in the app", "the right syrup", "the pregnancy box … iron and folic acid".
  - Model `senior` pack: "Pill reminders" (OK).
  - The model and dictionary do state the rule correctly: "Afya sells no medicines; a licensed partner pharmacy sells them…" (inline dictionary at model.js:538; model.js:607).
  - Also: STEPS says the box "waits in the smart locker outside the **glass**" (index.html:772). The glass pavilion is rejected (B14).
  - 3.3 copy: the "free 15-measurement check / about 4 minutes" (index.html:758, 766, 799) contradicts R2 (50-second basic tier).

---

## Component decision table (shell / model scope)
| Component | Today | Decision | Visual | Research | Evidence |
|---|---|---|---|---|---|
| Sidebar TOC / reading path (K1.3) | 286 px rail, accordion, Overview overlay, mobile drawer | Rebuild → D1 index + bottom sheet + sticky top bar | C2, gold current | — | index.html:651–662, 723–734 |
| EN/SW toggle (K1.4) | rail buttons, re-render, 4 translation mechanisms | Keep behaviour, Rebuild mechanism | top bar text toggle | — | index.html:656, 710–714, 1196, 1297–1305; model.js:259 |
| Funding switch (K1.5) | rail + inline `optSwitch`, re-render, unused event | Keep, extend to all numbers, animate | quiet segmented, gold figure | R4, R1, R2 | model.js:173–185, 550–552 |
| Sources footer (K1.21) | `<ol>` per section, several parallel citation systems | Rebuild, collapsible, from research files | hairline, mute | all | index.html:666, 1160; model.js:628–629 |
| Footer / version | "Concept images · figures are planning estimates" | Rewrite with "Version 2.x · date" | mute | — | index.html:890 |
| Cover dialog | particles, counters, seal, ribbon | Retire | — | — | index.html:632–650, 1199–1214 |
| Home page `home()` | 9 exhibits incl. film, Afya Way, hotspots | Retire as landing (0.1 replaces); salvage the film / Afya Way by decision | — | R10 | index.html:790–891 |
| Dead renderers (story01, sec11, grid9, 3D heart) | unused, stale 110M | Retire | — | — | index.html:899–1137, 1218–1282 |
| Brand guard | strips glows after render | Retire | — | — | index.html:1284–1316 |
| CSS tokens / fonts | 2 `:root` sets, 7 fonts | Rebuild as tokens.css + Sora | C2 | — | index.html:5–15; model.js:263, 345 |
| v3 components + chart lib | 19 SVG chart types | Re-skin | K2 chart style | — | model.js:253–567 |
| Financial model core | inputs A, compute, lean diff | Rewrite (K4/D4, data/*.json, sourced) | — | R1–R5, R7, R8 | model.js:1–186 |
| Package catalogue AFYA_PKG | 24 packages incl. Kazini | Rebuild from data/boxes | D3 | R6, R8 | model.js:188–250 |
| V3MODS analyst briefs | 35 section modules in model.js | Move to sections; review per Part G | D2 | per section | model.js:570–1401 |
| sw-dict.js (K6.1) | 7,670 exact strings + 63 regex rules | Keep file, Rewrite to keyed entries, add missing-string script | — | — | sw-dict.js:1–109; index.html:1300–1305 |
