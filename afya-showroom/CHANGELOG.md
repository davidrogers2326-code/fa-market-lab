# CHANGELOG — Afya Basics Investor Showroom refurbishment

## Phase 3 · Mama na Mtoto end to end — 10 November 2026 (complete)

**What changed**
- **3.5 rebuilt on the D3 package template.**
  - The line-up shows 18 boxes with the D-3 names.
  - Two complete package pages: Mama Mjamzito (pregnancy, one box per trimester) and Mama na Mtoto (birth to 3 years, 9 stage boxes).
  - Each page follows the ten D3 steps: the Box Opens hero; who it is for, with WHO guidance; every item with its reason, quantity, brand choices and sourced shelf prices (original currency, rate and date for Kenyan prices); services; tiers; Build-your-box on the D4 engine; packing; reminders and swaps; next box.
  - The Lishe nutrition shelf (R9) is on Mama na Mtoto.
- **Research written:**
  - R6 Mama na Mtoto: 31 items, 104 brand rows, 41 re-checked on Tanzanian sites.
  - R6 Mama Mjamzito: 77 brand rows, 48 re-checked.
  - R7 services: only the nurse home visit has a Dar price; the rest are planning figures.
  - R9 nutrition: 27 rows, no formula.
- **Renders:** two Weave runs for Mama Mjamzito (founder-approved, 14 credits, 3 credits left). Generated from the approved no-band render, unbranded items, no people.
- **Code:**
  - `shell/d4.js` is the one pricing engine; `tools/test-d4.js` passes the Part I baskets to the shilling.
  - `tools/build-data.js` bundles `data/` into the page.
  - The Box Opens hero is now a shared component.
  - C6.4 numbers count up after a funding switch.
- **Model:** box-goods margin 13.8% (D-17); kiosk 7 measurements.
- **Brief v1.2:** corrected D4, R1 corrections, decisions D-12 to D-18. D4 now states that the partner price is the negotiated rate (about 70% of walk-in).

**Decided on the founder's behalf (small decisions)**
- Both boxes are published in full, with the treated mosquito net shown as a labelled TSh 10,000 estimate (B1). No Tanzanian online price exists.
- Items with fewer than four sourced brands show only the brands found; nothing is invented. The page wording says "up to five" rather than "four or five".
- Quantity formulas without a Kiswahili version show in English mode only.
- Source titles are marked as English-language documents.
- The wording "cited in the pilot code" became "not re-checked" (A4).
- The pregnancy box's six render items were chosen from its own list. The Mama Mjamzito hero uses numbered markers, because the items sit close together.
- The R6 agents' changes are kept and listed in R6 §2 for confirmation:
  - uji moved to the Lishe shelf;
  - toothpaste and toothbrush split;
  - monthly gift and scent became the premium and luxury lines;
  - belt and nipple cream became counter add-ons.
- The Mama Mjamzito / Mama na Mtoto split settles J-2 as two boxes.

**Still open**
- **Prices to confirm by phone:** treated net shelf price, the Kenyan-priced items (Kariakoo calls), Softcare pack sizes, partner service quotes (PRINMAT, maternity hospitals, baby studios), Tanzanian uji wa lishe prices.
- **Native Kiswahili review:** the terms listed in R6, R6-preg, R9 and R7.
- **Formula policy:** stage-1 formula "on request only" is a founder decision (R9). The priced formula cards in the 3.6 catalogue should come down in the 3.6 rebuild.
- **Packing film:** gloved hands and captions are not yet verified frame by frame (K3).

## Phase 2 · Research R1, R2, R3, R5 — 9 November 2026 (approved)

**Network:** a personal environment "fa-market-lab (Afya research)" was approved. It opens 19 research sites: WHO, NIMR, the national statistics office, TBS, BRELA, TRA, TMDA, the Bank of Tanzania, AfyaDepot, the operators, and the kiosk marketplaces. This session moved onto it.

**Files** (`research/`, `data/`)
- `V01-front-door-figures.md`: both 0.1 health figures confirmed at source, with proposed wording that names each survey year.
- `fx.md`: Bank of Tanzania mean rates for trading date 10 Nov 2026 (US$1 = TSh 2,642.50). This is now the only rate table.
- `R1-compliance.md` (licences, fees and duties):
  - The TBS/TMDA split is confirmed.
  - **New big cost:** TBS registration of TSh 440,000 per imported cosmetic product.
  - The TMDA retail device permit is TSh 100,000.
  - The kiosk is a Class B medical device: registration US$2,500, supplied through a TMDA-registered dealer.
  - Tax changes from 1 Jul 2026: customs processing fee 1%, excise on cosmetics 15%.
  - A new 15-step checklist. Compliance budget: about TSh 2.3M (buying locally registered products) to about TSh 11.1M (self-registering 20 products).
- `R2-kiosk.md` (the Afya Check kiosk):
  - A basic-tier kiosk with 7 measurements.
  - Landed cost TSh 7.6–9.8M for a budget unit; TSh 19.1–22.2M for the unit the showroom quotes today.
  - 0% duty under HS 9018.19.
  - Maintenance about TSh 1.9–4.8M a year (estimate).
  - No leasing offer found.
- `R3-pricing.md` and `data/prices.json` (pricing):
  - 51 real AfyaDepot prices.
  - **Today's box engine prices the box above shelf value on every 1-month plan.**
  - Recommended D4 rule: 3/6/9% below shelf with packing and delivery included, services as a separate line, rounded to the nearest 500.
  - AfyaDepot free delivery is now 150K+, not 250K.
  - Shoppers Supermarket recommended as the second benchmark.
- `R5-payments.md` (payments):
  - No general standing-order service for mobile money in Tanzania yet (Bank of Tanzania 2025 report).
  - Payment requests to the member's phone (USSD push) through one aggregator reach all the wallets.
  - Fees are unverified; budget 2.7% (estimate).
  - Renewal-flow design for 3.4.

**Spot checks by the lead:**
- The BoT standing-orders quote.
- EAC tariff 9018.19.00 at 0%.
- AfyaDepot's 150K free-delivery threshold and one nappy price.
- TBS fee schedule cosmetics TSh 440,000.
- TMDA retail outlet fee TSh 100,000.
- PVoC fee table: Route A 0.50%, Route B 0.45%, Route C 0.25%.

**No section text was changed.**

**Decisions needed:**
- The D4 pricing rule (R3).
- The kiosk tier and budget (R2).
- Buying locally registered products versus self-registering (R1).
- Shoppers as the second benchmark (J-4). Its host must be allowed.

**Founder calls:**
- Clearing agent (container quote).
- TBS and TMDA (kiosk, nappies and pads, importer fee).
- Three kiosk quotes with certificates.
- Vodacom (mandate product and fees), Yas, Airtel and AzamPay (rate cards).
- Kariakoo price calls (script in R3).

## Phase 1 · Foundations — 9 November 2026 (approved)

All work stays inside `afya-showroom/`. This session can push only to its assigned branch (`claude/great-shannon-uwi0li`), so each phase is marked here and in the commit history rather than on its own branch (brief M1).

**Brief and audit**
- Founder decisions D-1 to D-11 recorded in the brief, now v1.1. Changes:
  - B12 tightened to no faces at all, real or invented.
  - E1 locked to the three approved no-band renders.
  - The section count corrected to 36.
  - Decisions added to Part J.
- AUDIT.md marked decided; the Master Framework and Chapter 1 comparison added (section 8).

**New files** (`showroom/`)
- `tokens.css`: the nine C2 colours, Sora, the C3 type scale and the C4 spacing.
- `shell.css`: the D1 global shell; the D2 section template; the C6.1 Box Opens stage; the D3 package-step styles; phone layout; reduced motion. All classes are prefixed `ab-` so they cannot collide with old section CSS.
- `shell/shell.js`: the new router and section index.
  - Index: numbers only on desktop, titles on hover; a bottom sheet on phone.
  - Top bar: EN | SW toggle, plus the funding switch shown from 1.3 onward.
  - Section frame (`secShell`) on the D2 order: gold number, title, summary, visual, body, sources footer, previous / next.
  - Template helpers (key figures, doors, open questions, sources).
  - Version line "Version 2.0 · date" (M5).
- `shell/templates.js`: the D3 package-page template (ten steps in fixed order). A box without a final R6 list shows steps 1–3 plus the "item list in research" notice.
- `shell/compat.js` and `shell/compat.css`: a temporary layer for sections not yet rebuilt.
  - Maps the old variables onto the tokens and uses Sora.
  - Switches off glows, gradient text, blur and entrance animation.
  - Keeps the Kiswahili dictionary working.
  - Hides images on the faces / red-cross list (AUDIT appendix 00), showing "Image in preparation".
  - Deleted when the last section is rebuilt.
- `shell/legacy-core.js` and `shell/legacy.css`: the old page's helpers and styles, extracted unchanged so the old sections still render.
- `sections/s01.js`: **0.1 rebuilt** on D2.
  - Box Opens hero from the approved renders (scroll-driven, static end state for reduced motion). Item labels are names only, with the "in research" notice.
  - The problem in one line, with two cited figures.
  - Five numbers from the model, labelled estimate.
  - The ask with tranches.
  - Doors to 0.2, 1.1, 3.5 and 6.3; open questions; sources.
  - Zero untranslated strings.
- `tools/shoot.js`: screenshots at 360 / 1280 px in both languages (M3).
- `tools/sw-missing.js`: report of text still in English on the Kiswahili page (K6.1).

**Retired:**
- The cover dialog with particles and counters.
- The separate landing page `home()`, per D-10.
- The "Signed off 0/36" rail.
- "Draft · ready for your review" badges.
- The brand-guard script.
- The second font loader in model.js.
- The per-section funding bars and "lean notes".

**Model.**
- `MODEL.get` and `MODEL.inputs` now follow the funding switch. Before this, most sections always showed the 340M figures.
- The page reloads on a switch, so every number in every section follows it.
- Check: in 340M mode year-1 revenue is TSh 800M, break-even month 10 and 593 members. In 150M mode it is TSh 535M, month 8 and 389 members.
- No model number has been changed; that waits for Phase 2 research.

**Checked:**
- All 36 sections render in the new shell, with no page errors and no horizontal scroll at 1280 and 360 px.
- The funding switch appears only from 1.3.
- The full static page renders with reduced motion.

**Open**
- The two health figures in 0.1 cite their sources, but could not be re-opened. This session's network blocks nhrdr.nimr.or.tz, who.int and citypopulation.de, so they carry no check date yet and are listed under "Not yet verified". Phase 2 research needs network access to these and the other source sites.
- Kiswahili report baseline: 667 English fragments remain across the 35 sections not yet rebuilt, 0 in 0.1. The full list is in `tools/sw-missing-report.json`.
- The 35 sections not yet rebuilt still use some off-palette colours from their own CSS. These go as each section is rebuilt (Phases 3–6).
- The "Image in preparation" placeholders will appear until the faceless replacements are rendered.
- Year-12 revenue (TSh 80B, 47 stores) is identical in both options in the model. To review with R4 (D-11).

## Phase 0 · Audit — 9 November 2026 (approved)
- `showroom-original/` backed up from the published artifact.
- AUDIT.md and the `audit/` evidence written. NOTES.md started.
