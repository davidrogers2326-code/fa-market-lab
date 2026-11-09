# Audit 10 — Part 7 (sections 7.1–7.5) · `showroom-original/sections/part7.js`

File: `sections/part7.js`, 1,343 lines, 190,470 bytes. All references below are `part7.js:LINE`. These numbers come from rendering the five sections in Node with the real `model.js` and a stub `secShell`, in both funding modes (flagship, then `afyaOpt=lean`). Kiswahili coverage was checked by matching every rendered text node against `AFYA_SWDICT`/`AFYA_SWRULES` in `sw-dict.js`. No file in the repo was modified.

Shared structure:
- CSS block `P7CSS`: lines 9–421. The editorial-photo helpers `p7pho/p7ed/p7pcs/p7band` are at 437–441.
- Source registry `S7`: 28 entries, at 444–474.
- Sections: 7.1 at 491–716, 7.2 at 717–912, 7.3 at 913–1040, 7.4 at 1041–1165, 7.5 at 1166–1343.
- Nothing outside part7.js overrides `SECTIONS['s7-*']`. No `V3MODS`/`V3DROP` entries exist for s7.

## Cross-cutting rule findings (apply to all five sections)

| Rule | Evidence |
|---|---|
| C7 neon / glow / gradient | `var(--neon)` is used about 30 times (e.g. 14, 27, 44, 64, 83, 129, 188, 238, 255, 303, 382, 634). The section eyebrows `.p7sub` are coloured `--neon` (14). Glow `box-shadow:0 0 18px -6px var(--neon)/gold/#9f8cff` on timeline bars (64–66) and at 188. Gradient fills: `.p7box.g` (16), `.p7b.on` active button (24), timeline bars (64–66), Phase-0 gap bars (650–652), tracker ring `linearGradient#p7rg` (617), jobs-chart bars `linearGradient#p7jg` (1064). Image overlay gradient (374). `backdrop-filter:blur` (376). In total there are 63 gradient/shadow/filter declarations. The index.html "brand guard" strips only glows and gradient text at runtime. |
| C2 palette | Off-token hex colours appear everywhere: `#ff9b87 #c9b8ff #ffb36b #9fd3ff #ff7b9c #b5f27a #ff6f61 #ff8f7d #9f8cff` (risk categories at 917, heat map at 948, evidence cards at 562–567 and 1080–1085), plus SDG colours `#4c9f38 #ff3a21 #a21942` (1140–1142). Purple `#c9b8ff`/`#9f8cff` is used even though purple was rejected in B9. |
| C5 motion | Hover zoom on every editorial photo: `.p7-ph:hover img{transform:scale(1.03)}` with a 1.4 s transition (371–372). `transition:all .2s` on buttons (22, 117, 153, 161). There is no `prefers-reduced-motion` rule anywhere in part7 (0 hits). Smooth `scrollIntoView` on heat-map clicks (1034). Action-driven motion such as the ring and bars is allowed. |
| C3 typography | All-caps tracked eyebrows `.p7sub` (`text-transform:uppercase; letter-spacing:.2em`, 14). Table headers in caps (30). Heat-map axis labels "IMPACT →" / "LIKELIHOOD →" in caps (956–957). There are many middle-dot meta strings ("Tool · …", "Trip 1 · Months −6 to −5"). |
| B8 missing Kiswahili | The SW layer is an exact-text dictionary. Text nodes split by `<b>`/`${c()}` cannot match it. **Text nodes with no SW match (total / of which ≥3 words):** 7.1 162/91 · 7.2 13/7 · 7.3 8/2 · 7.4 16/3 · 7.5 81/57. The worst gaps are all fifteen 7.1 step "Details" bodies (e.g. "replaced the old ORS in May 2026…", "Under Cap. 219, regulated products may only be sold…"), the "What Afya sells / How members get medicines" boxes (577–580), and most 7.5 Q&A answers. Other gaps: 7.2 "Purchase within budget", "Borrowing / loan" (744–748); 7.3 "Sort: highest score"; 7.4 "Afya Check kiosk". |
| B7 mixed language | Because coverage is partial, the Kiswahili view shows English fragments inside Kiswahili paragraphs. That is mixed language within a paragraph. "daladala/BRT" sits inside English labels (531, 625). Box names such as "Heart &amp; Diabetes box" (1113) do not match the B16 Kiswahili-named line-up. |
| A4 process narration | "The TBS pages we opened do not list the retail requirements" (507). "Our adviser source gives…" (510). "cited from the pages we opened … reconciled in Step 2 of the framework" (1174). Data-room rows "Master framework … approved by Fahmy" (1207), "Concept image library" (1209), "Earlier 60-chapter lab (archive)" (1210). Open questions "Canva Business payment confirmed, so Step 1 (brand) can start" (1232), "Who checks the Kiswahili text" (1237), "Found in Part 7" ×8 (1238–1245). "eight we found while building this part" (1276, 1301). The file header comment says "pages opened during research" (4–5); that comment is fine because it is code only. |
| B12 faces | Seven photo slots probably show people: `today3`, `team` (×2), `today2`, `hub`, `rider` (×2), `check`. See the image list. K5 names "team images" explicitly. |
| B21 Cecilia | **No relationship is stated.** She appears as "Founder director · Cecilia" (723). Her role is "(to be confirmed between the founders)". The text says "Fahmy Abbas Cothema and Cecilia" (1200) and "Share split between Fahmy and Cecilia" (1235). This passes, but the 7.2 role text is a placeholder. |
| B4 medicines | The sections are consistently clear that Afya sells no medicines (505, 571, 577–580, 931, 1186). Residual risk: the tracker still has an "Option B only" tag and a hidden "Medicines" button (615–616, `#p7med`). Q26 says "Not yet included: a pharmacist (option B only)" (1199). That stale wording suggests a medicines option still exists. |
| B5 funding side by side | No 340M/150M side-by-side was found. Numbers follow `ISL()`. **Funding-switch leaks** (text typed for the flagship that stays in start-small mode): step 6 renders "The flagship budget is TSh 3,700,000 a month for about 100 m², the Knight Frank prime rate of about US$25 per m²" in lean mode (502). 7.2 says "The flagship trades 09:00–20:00" (813). Q01 "the flagship rent is the Knight Frank prime rate" (1174). Q13 "This keeps the payroll at 8" while lean staff = 5 (1186). Q24 and Q26 "The flagship model carries … 5 people" (1197, 1199). |

---

## 7.1 Setup, licences, research & travel (`s7-1`, 539–716)

**Today.**
- Hero image `img/exterior.webp` (550). H1 "Open legally, on time, with every step costed."
- Eight modules:
  1. Problem: four plain points and six evidence cards, all cited (556–568).
  2. Regulator map: five rows (BRELA/TRA/council, TMDA, Pharmacy Council, TBS, PDPC), plus "What Afya sells / medicines via partner" boxes and an interior photo (570–588).
  3. Eight-month swim-lane timeline, M−6 to M+1, hand-coded bar positions (541–548, 590–595), plus seed tranches from the MODEL.
  4. Three research trips with on/off switch, days and traveller sliders (598–612).
  5. **The 15-step tracker** with status cycling (to do / in progress / done) saved in `localStorage` `afya.p7.steps`, phase filter, progress ring, cost totals (613–622).
  6. Location scoring tool: nine weighted criteria, three example sites (623–635).
  7. Phase 0 gap with "three ways to close the gap" (636–658).
  8. Risks (660–667).
- Sources: `K71` = 18 S7 keys (494).

**Key numbers.**

| Figure | Value (flagship / lean) | Origin |
|---|---|---|
| Tranches | 136M / 119M / 85M (40/35/25%) · lean 60M / 52.5M / 37.5M | MODEL `seed.tranches`, `seed.milestones` |
| Phase 0 need vs budget | TSh 33.3M vs 3.15M; gap 30.15M (8.9% of the 340M seed / 20% of the 150M seed) | MODEL `seed.phase0_gap` (hand-set constants in model.js, no source) |
| 15-step costs | Sum TSh 15.6M (1.2M, 3M, 0.3M, 0.2M, 1.5M, 1.5M, 1.5M, 1.5M, 0.5M, 1M, 0.5M, 0.8M, 0.3M, 0.8M, 1M) | **Hand-typed** in `STEPS71` (496–510). Labelled "Planning estimate" once, in the module lead (614), not beside each figure |
| Trip budgets | Dar ≈ 10.6M, India ≈ 2.72M, China ≈ 4.77M → ≈ 18.09M; itemised total ≈ 33.69M (+0.39M vs model) | **Hand-typed** `TRIPS.rates` (514–524); computed by `tripCost` (537). Labelled "planning estimates" |
| Rent | 11.9M per month for 180 m² (lean 3.7M for 100 m²) | MODEL `opex_month.rent` |
| "Knight Frank prime rate of about US$25 per m²" | — | **Hand-typed, no citation, USD with no rate or date** (502) → B1, B2 |
| Location weights 20/15/15/10/10/10/10/5/5 and example scores | — | Hand-typed (525–535, 694). Example scores are labelled "Example scores only" |
| Regulatory facts: 15 days TIN, TSh 100M VAT, 30 June, 30 days WCF, 5 yrs PDPC, 6 weeks import permit, TSh 10M fines | — | Hand-typed **with citations** (562–567) |

**The 15 steps as coded (`STEPS71`, 496–510): title · owner · timing · cost · funded by.**
1. "Clear the name and incorporate the company with BRELA" · Founders + company lawyer · M−6 · TSh 1,200,000 · Phase 0. Text: BRELA Online Service replaced ORS May 2026; "at least two shareholders and has no minimum capital"; the UBO declaration is filed "at the same time".
2. "Shareholders’ agreement, founders’ 25% protection and the ownership check" · lawyer + founders + seed investor · M−6 · 3,000,000 · Phase 0. Covers the non-citizen order GN 487A.
3. "TIN, VAT plan and receipt system with TRA" · Accountant · M−5 · 300,000 · Phase 0.
4. "Corporate bank account and bookkeeping set-up" · M−5 · 200,000 · Phase 0.
5. "Regulatory scoping: what we sell decides who licenses us" · consultant · M−5 · 1,500,000 · Phase 0. Text: devices→TMDA, medicines→Pharmacy Council, "Cosmetics and food supplements go to TBS".
6. "Location shortlist, scoring and lease negotiation" · M−4 · 1,500,000 · Phase 0.
7. "Fit-out, building and signage permits" · M−3 · 1,500,000 · Seed T1. This step is the municipal approval for renovation and signage.
8. "TMDA premises registration and business permit (medical devices)" · M−3 · 1,500,000 · Seed T1.
9. "Partner pharmacy agreement signed; its premises permit and pharmacist registration checked" · M−3 · 500,000 · Seed T1.
10. "TBS registration for cosmetics and food supplements" · Regulatory consultant · M−3 · 1,000,000 · Seed T1. Text: "The TBS pages we opened do not list the retail requirements…"
11. "General business licence (after the sector permits)" · M−2 · 500,000 · Seed T1. Class A by BRELA, Class B by council; 14–20 working days.
12. "Fire safety certificate and OSHA workplace registration" · M−1 · 800,000 · Seed T2.
13. "Employer registrations: NSSF, WCF and payroll taxes" · M−1 · 300,000 · Seed T2.
14. "Data protection registration with the PDPC" · M−2 · 800,000 · Seed T1.
15. "Payments and insurance: mobile money, card, cover" · M−1 · 1,000,000 · Seed T2.

**Comparison with Brief R1 facts.**

| R1 fact | In 7.1 today? |
|---|---|
| Cosmetics and food moved TMDA→TBS in July 2019; TMDA keeps medicines and devices | Partly. The TMDA/TBS split is right (505, 579), but the July 2019 transfer is **never mentioned** (0 hits for "2019"). |
| GN 681 of 2021 (TBS registration before import) and importer registration under Standards Act Cap 130 | **Missing.** 0 hits for "681" or "Cap 130". Step 10 says TBS scope is unknown. |
| TBS fees TZS 50,000 registration and 150,000 premises | **Missing.** Step 10 costs a hand-typed 1,000,000 with no fee breakdown. |
| PVoC CoC before shipping, USD 250–5,000 per shipment, Intertek / Bureau Veritas, Route B | **Missing entirely.** 0 hits for PVoC, CoC, Intertek or Bureau Veritas. No step covers shipment conformity. |
| Missing CoC → 15% of CIF penalty plus destination inspection (TZS 100,000) | **Missing.** |
| BRELA ≈ TZS 217,200 for TZS 1M capital | **Conflicts.** Step 1 costs TSh 1,200,000 (lawyer included, no breakdown) and says "no minimum capital". The R1 figure is absent. |
| UBO rule: BRELA blocks non-filers since 15 April 2025 | Partly. A UBO filing is mentioned (497) but **not the 15 April 2025 enforcement date or the blocking consequence**. |
| TIN at TRA | Present (step 3, cited `tin`). |
| Municipal business licence | Present (step 11, cited `lic`). Step 7 also covers municipal fit-out and signage approval. |
| Compliance budget TSh 8–12M, to be confirmed by a clearing agent's quote | Not present. The 15 steps sum to TSh 15.6M, which mixes legal, bank, insurance and similar costs. |
| Clearing-agent quote, and kiosk TMDA device question | Not present. |

**Decision.** Rewrite the 15 steps from R1. Keep the status-tracker control (K1.40), the trip planner and the research/travel budget. **Retire or rebuild** the hand-placed swim-lane timeline as a K2 SVG. Remove the "Option B / Medicines" remnants. Fix the lean-mode leak in step 6 text. Visual: Table (Part G).
- Research: **R1** (steps, fees, PVoC), **R4** (pre-sale; tranche milestones; R4 "feeds 7.1").
- Add the missing steps: TBS importer and product registration (GN 681); a PVoC CoC step per shipment; clearing agent.

**Rule issues, 7.1.**
- B1: STEPS71 costs, TRIPS rates, the US$25/m² figure, CRIT weights, and timeline bar positions (541–548) are all hand-typed.
- B2: "US$25 per m²" (502); India trip "price in USD" (519).
- A4: 507, 510.
- B14: "glass frontage" in lease terms (502) and the interior alt text "kiosk by the glass" (581). Both risk the rejected glass look; check against B14.
- "ADDOs" is used with no definition (610).
- Fact noted: "The founders are based in India, so domestic travel only" (519). Compare 2.x and the team section.

**Images and video.** `img/exterior.webp` (550, hero) Regenerate · `img/interior.webp` (581) Regenerate · `img/today3.webp` (609) Faces · `img/rider.webp` (624) Check. No video.

---

## 7.2 Governance and reporting (`s7-2`, 717–912)

**Today.**
- Hero `img/interior.webp` (772). Eight modules:
  1. Problem (778–782).
  2. **Board: five seats, four votes** — Fahmy, Cecilia, investor nominee, independent chair; the company secretary has no vote. Quorum 3 including the investor. Seat buttons plus a tally bar (721–727, 765–769, 786–790).
  3. Reserved matters: eight items (728, 788).
  4. Delegation-of-authority matrix (10 decisions × 5 roles) plus an "Approval finder" log slider (731–748, 792–798).
  5. Monthly investor pack mock-up: three layers × six KPIs, scenario and month controls, revenue/profit sparkline (800–806, 870–888).
  6. **Daily 21:00 WhatsApp report mock-up**: a phone frame, five "A day in month N" buttons, a generated message (806–818, 889–899).
  7. 12-month governance and compliance calendar (820–826, 900–902).
  8. Access-level matrix: 6 roles × 8 data types (749–759, 828–833). Then a numbers strip (835–841) and risks (843–849).
- Sources: `K72`, 8 keys (720).

**Key numbers.**
- From MODEL: Year 1 revenue TSh 800M (lean 535M). Break-even M10 (best M8; downside not in Y1) / lean M8 (M6, M12). Members at M12: 593 (lean 389). Opex 26.8M per month (lean 13.8M). New store 170M. 100 members in month 3 (downside 4) / lean month 4 (5). Tranche amounts.
- Hand-typed and labelled "Proposal": DOA limits 300k / 2M / 10M / 1.5M / 8M / 25M / 5M / 50M (731–748); "Debt above TSh 20M" (728).
- Hand-typed: "monthly loss below TSh 16M" (821; duplicates the model milestone string); "by the 10th"; NPS ≥ 60, < 3 min, < 30 s, < 2% (labelled "target"); "TMDA permit renewal due in 54 days", "2 items below reorder point", "1 delivery late (rain)" (900, labelled illustrative); "More than 360 daily reports a year" (815).

**Decision.** Keep (Part G, K1.41). Re-skin on C2 tokens.
- Re-render the WhatsApp mock-up on the **customer palette** as K1.41 asks. Today it uses hard-coded `#0f7a52 / #e9e4dc / #c99a2e` (213–224, 884). Its header icon is a **cross/plus symbol** path (807). It is green, not red (B11), but it is a medical-cross motif and should be removed. The phone frame is a "floating device mock-up" with a deep drop shadow (213; banned by C7). It should come from the K6.2 Figma screens.
- Part J item 6: build the board, DoA, access matrix and investor pack as data-driven tables, so they can later become the founder's online reporting layer. The access roles (`ACC_ROLES`, 749) already include founders and investor; Cecilia's access level is not yet distinguished.
- Research: none (Part G "—"). R5 may later add payment-failure alerts.

**Rule issues, 7.2.**
- B21 OK. The role text says "to be confirmed between the founders" (723).
- Funding leak: "The flagship trades 09:00–20:00" in lean mode, while the report is still "21:00" (813–815, 806).
- C7: the phone shadow and glow on the calendar/seats (188).
- B8: 7 multi-word strings with no SW match (e.g. "Purchase within budget", "Borrowing / loan", "Afya Check readings (health data)").

**Images and video.** `img/interior.webp` (772 hero) Regenerate · `img/team.webp` (785) Faces · `img/exterior.webp` (813) Regenerate.

---

## 7.3 Risks (`s7-3`, 913–1040)

**Today.**
- Hero `img/today3.webp` (959).
- Modules:
  1. Problem (962–967).
  2. **5×5 heat map** (SVG, clickable cells), category tiles and a colour-band legend (944–957, 968–973).
  3. Warning → owner → act → report flow, top-five cards, and two worked examples with photos (974–995).
  4. **Full register**: search, sort (score, L, I, owner, #), category filter, cell filter (996–1001, 1017–1037; K1.42).
  5. Scenario compare bars, best/base/down (1003–1009).
  6. Numbers strip (1011–1017) and meta-risks.
- Sources: `K73`, 10 keys (916).

**The register (`RISKS`, 919–942): 22 risks in 10 categories** — "[L×I]" scores are hand-typed founder estimates:
1. Market — Families join the Afya Box more slowly than planned [3×4]
2. Market — Walk-in visitors grow more slowly than the model ramp (40→110 a day) [3×4]
3. Regulatory — Sector permit (TMDA, Pharmacy Council or TBS) delayed [3×5]
4. Regulatory — Product line not registered or notified [3×4]
5. Regulatory — A medicine is sold or handled by Afya instead of the partner pharmacy [2×5]
6. Regulatory — Ownership challenged under the 2025 non-citizen order [2×4]
7. Supply — Shipment from China or India late or held at clearance [4×3]
8. Supply — Substandard or falsified product [2×5]
9. FX — Shilling weakens [4×3]. "model rate (TSh 2,640 per USD)": MODEL `meta.fx_usd`, but **no date shown**. model.js has `fx_source` "4 Nov 2026" and the page does not show it (B2).
10. Operations — Stock-outs or expiry [3×3]
11. Operations — Same-day delivery missed [3×3]
12. Tech/data — Data or health readings leaked [2×5]
13. Tech/data — System or internet down [3×3]
14. People — Store lead or adviser leaves [3×3]
15. People — Founders run the business partly from India [3×4]
16. Finance — Phase 0 gap (TSh 30.1M) not funded [4×4]
17. Finance — Downside uses the loss budget and reserve [3×4]
18. Finance — Cash or mobile-money takings go missing [2×3]
19. Reputation — Afya Check misread or adviser oversteps into diagnosis [2×5]
20. Reputation — Device fails at home [2×4]
21. Competition — Pharmacies or supermarkets copy [4×3]
22. Competition — Online marketplaces cheaper [3×2]

Rendered: 2 red, 12 orange, average 10.5, 9 owner roles. The top-five list is led by the Phase 0 gap (16) and permit delay (15). Downside Y1 loss TSh 166M vs 119M loss budget + 41M reserve, so the downside "would exhaust them by about TSh 6.4M". In lean mode the loss is 64.6M vs 46M + 29.5M ("covered with little to spare").

**Part G required risks.**

| Required | Present? |
|---|---|
| Churn | **No.** There is no churn risk. #1 is acquisition pace. The model's 8% monthly churn appears only in 7.5. |
| Build-before-demand (pre-sale) | **No.** There is no pre-sale or demand-proof risk. |
| Scope (too many packages or products at launch) | **No.** |
| Regulation | **Yes**, #3–#6 (TMDA, Pharmacy Council, non-citizen order). There is **no TBS/PVoC/CoC risk** and no 15% CIF penalty. |
| Payment collection (recurring billing / mandates) | **No.** #18 is cash theft, not failed recurring payments (R5). |
| Kiosk failure | **No.** #19 is reading interpretation, #20 is home devices, #13 is IT outage. There is no Afya Check kiosk hardware failure risk (R2: assume one failure per year). |

**Decision.** Rewrite the rows (K1.19). Keep the heat map, search and sort logic (K1.42). Re-skin the heat map and category colours on C2. The current traffic-light hexes and purple are off-palette (917, 948). Add the six required risks with answers from R1–R5, and retire or merge low-value duplicates.
- Visual: Table. Research: **R1–R5**.

**Rule issues, 7.3.**
- B1: all L/I scores are hand-typed. They are labelled "Founder estimate" (969). Other hand-typed thresholds: "TSh 20,000" cash-up mismatch (937), "90%", "2%", "6 weeks", "costs +5%".
- B2: FX rate shown without its date (928).
- C7: gradient striped loss bars `repeating-linear-gradient` (1006).
- C3: caps axis labels (956–957).

**Images and video.** `img/today3.webp` (959 hero) Faces · `img/hub.webp` (983) Faces? / Box-check · `img/rider.webp` (988) Check.

---

## 7.4 Social impact (`s7-4`, 1041–1165)

**Today.**
- Hero `img/exterior.webp` (1073).
- Modules:
  1. Evidence: four points and six cited cards (1076–1086).
  2. Five impact pathways with photos plus a "What we do not claim" card (1088–1098).
  3. Theory of change: inputs → activities → outputs → outcomes (1100–1106).
  4. Illustrative referral story with photo (1108–1114).
  5. **Impact calculator**: scenario, year 1–12, referral share, trips, hours, diaspora share (1116–1130, 1158–1164).
  6. **Direct store jobs by year** SVG bar chart plus a 10-row impact dashboard (1061–1066, 1132–1137; K1.39).
  7. SDG 3/5/8 alignment (1139–1143) and risks.
- Sources: `K74`, 12 keys (1044).

**Measures and sources.**

| Measure / fact | Value | Source |
|---|---|---|
| Raised BP 25.7% and aware 17.6%; controlled 2.2% | — | `whotz` (WHO TZ profile, **2012 STEPS data**). 0.257 and 0.176 are hand-typed in code (1059) |
| Diabetes 2.9M adults, 9.8%, 60.2% undiagnosed (2024) | — | `idf` |
| Adherence ~50% | — | `adh` (WHO **2003** release) |
| 1 in 10 substandard or falsified | — | `whosf` (2017) |
| 4.6 h vs 1.2 h unpaid care | — | `nbsg` (NBS 2023); hand-typed in code (1059, 1160) |
| TSh 3.3T remittances | — | `rem` (The Citizen, 27 May 2026) |
| Checks Y1 / Y3 | 14,727 / 68,967 (lean 8,663 / 40,231) | MODEL-derived (`impactYears`, 1046) |
| Referrals | 15% of checks | **Hand-typed assumption** (1067), labelled |
| Targets ≥50%, ≥60%, ≥90%, ≥95%, 100% | — | Hand-typed planning targets, labelled "≥ … planning targets" |
| **Direct store jobs chart** | Y1 8 → Y12 376 (8/16/32/56/80/112/144/184/224/272/320/376). Lean: 5 → 235 | MODEL `staff` × `growth.stores_by_year` (47 stores in Y12); responds to the switch |

**Decision.** Keep content (Part G). Rebuild the jobs chart and dashboard on K2 chart style: no gradient bar fill (`#p7jg`, 1064), no rounded bars, hairline axes. Remove the off-palette evidence and SDG colours.
- Each measure gets an explicit source line. Add check dates.
- Flag the stale 2012 and 2003 evidence as "latest available".
- Visual: Still. Research: none. Sources should be verified (K1.21).

**Rule issues, 7.4.**
- B1: the 15% referral share and the targets are labelled; the evidence values are cited.
- Consistency with R2: "a full Afya Check of 15 measurements in about 4 minutes" (1093). R2 says the 3.3 list must be corrected to the basic tier.
- B16: "Heart &amp; Diabetes box" (1113) does not match the line-up names (sukari/presha).
- The SDG target-colour chips are off-palette (1140–1142).

**Images and video.** `img/exterior.webp` (1073 hero) Regenerate · `img/interior.webp` (1093) Regenerate · `img/prod-heart.webp` (1094) Unbranded? · `img/prod-care.webp` (1095) Unbranded? · `img/today2.webp` (1096) Faces · `img/boxdoor.webp` (1097) Box-check · `img/check.webp` (1108, falls back to `img/interior.webp` on error) Faces? / Kiosk.

`boxdoor.webp` is the only image held locally (`showroom-original/img/`) and was inspected. It shows hands only and no faces. A green box with a "SUKARI CARE" label is handed over at a door, and a hand-drawn phone screen shows a check mark. Check it against the E1 locked box reference and the B15 gold side label.

---

## 7.5 Proof pack, Q&A and sources (`s7-5`, 1166–1343)

**Today.**
- Hero `img/interior.webp` (1262).
- Modules:
  1. Problem.
  2. Four-pillar summary (1272–1278).
  3. Four ways to verify, with the `team` photo (1279–1291).
  4. **Investor Q&A** with search, category filter and open-all (1292–1296, 1321–1329; K1.20/K1.43).
  5. Data-room index, 24 rows: 5 exist, 13 to prepare, 6 after funding, with a filter (1205–1229, 1297–1300).
  6. Open questions, 14: 6 "Framework" + 8 "Found in Part 7" (1231–1246, 1301–1303).
  7. Numbers strip (1304–1311).
  8. **Master sources**: gathered live from every built section's `.srcs`/`a.cite` via DOMParser, deduplicated by URL, with search (1247–1256, 1312–1316, 1333–1341). Then risks.
- Sources: `K75`, 12 keys (1169).

**Q&A: 30 questions in 7 categories.** Numbers 5 · Money & ownership 6 · Regulation 4 · Operations 5 · Business 5 · Team 3 · Risk 2 (1170–1204).
- Churn question: **none**. Churn appears only inside answers Q03 and Q22 ("8% monthly churn").
- Build-before-demand / pre-sale question: **none**. Q22 "How will you get the first members?" contains no pre-sale.
- Scope question: **none**.
- Payment-collection question: **none**.
- So all four of K1.20's new questions are missing.

**Sources.**
- The `S7` registry has **28 entries, every one with an https URL** (444–474).
- 18 carry a publication date in the title. 10 have **no date**: lic, tmda, tmdaprem, tmdaimp, tbs, rsm, canton, sdg3, sdg5, sdg8.
- **None carries a "checked on" date** (0 hits for checked/accessed). This fails Part I ("Every source link in 7.5 opens (checked, dated)").
- The master list is built at runtime from all sections, so its count is not fixed in code. A rough count of distinct http URLs across sections/*.js and index.html is about 1,198, but that includes non-source links and was not deduplicated the same way. Its data is scraped from rendered HTML, not from the research files (K1.21 wants generated from `research/`).
- Several sources are secondary (law firms, HR blogs: `wcf`, `nssf` via Lenvica). One is a 2008 historic TFDA guideline (`tfda08`). This is acknowledged at 1318.

**Hand-typed numbers in 7.5.**
- "How does the plan reach **47 stores**?" — the question title (1198) hard-codes the model value.
- "Corporate income tax is 30%" — **no source** (1188).
- "payroll at 8" (1186; wrong in lean mode).
- "18% VAT", "NSSF 10%", "WCF 0.5%" — partially cited.
- "TSh 16M" (1241).
- "Dated 31 October 2026" (1207).
- Data-room note "Operating losses & lease advances until break-even (month 11)" comes from a MODEL label but conflicts with base break-even M10. Verify against 6.3.

**Decision.** Rebuild the Q&A content: keep the search/filter logic (K1.43) and add the four K1.20 questions with answers from R3–R5. Rebuild the source list from the research files, with publisher, date and a check date for each (K1.21).
- **Retire or rewrite the Open-questions and Data-room rows that narrate process** (A4): framework, Canva, "who checks the Kiswahili", "found while building", "60-chapter lab", "concept image library".
- Visual: Table. Research: all, plus **R10** (benchmark checklist applies to 7.5).

**Rule issues, 7.5.**
- A4: 1174, 1207–1210, 1232, 1237, 1276, 1301.
- B4 stale: "a pharmacist (option B only)" (1199).
- Funding leaks: 1174, 1186, 1197, 1199.
- B8: 57 multi-word Q&A fragments have no SW match.

**Images and video.** `img/interior.webp` (1262 hero) Regenerate · `img/team.webp` (1286) Faces. One non-image path matched by the search, `media/docs/default-source/…/tza_en.pdf`, is part of the WHO source URL (464) and is not an asset.

---

## Every image and video path in part7.js

| Path | Lines | Flag |
|---|---|---|
| img/exterior.webp | 550, 813 (`f:'exterior'`), 1073 | Regenerate (B14 approved store; "glass frontage" wording) |
| img/interior.webp | 581, 772, 1093, 1108 (fallback), 1262 | Regenerate (alt text "kiosk by the glass") |
| img/today3.webp | 609, 959 | Faces |
| img/rider.webp | 624, 988 | Check |
| img/team.webp | 785, 1286 | Faces (K5 team images) |
| img/hub.webp | 983 | Faces? |
| img/prod-heart.webp | 1094 | Unbranded? |
| img/prod-care.webp | 1095 | Unbranded? |
| img/today2.webp | 1096 | Faces |
| img/boxdoor.webp | 1097 | Box-check (inspected: hands only) |
| img/check.webp | 1108 | Faces? / Kiosk (R2) |
| Videos | none (0 `.mp4` / `<video>`) | — |

Also: every photo caption says "Concept image", the `alt` text is English only (B8 / K5 needs both languages), and all images are 1680×944 placeholders loaded lazily.

---

## Present in Part 7 but not mentioned in Part K (K1.19–21, K1.39–43)

1. 7.1 **regulator map** (five-row product → regulator diagram, 572–578).
2. 7.1 **eight-month swim-lane timeline**, M−6 to M+1 (541–548, 590–595).
3. 7.1 **seed tranche cards** (596–597). These duplicate 6.3.
4. 7.1 **research-trip planner** with switches and sliders (598–612). Part K mentions only "add research and travel budget".
5. 7.1 **location-scoring tool**: nine weighted criteria, three sites, deal-breaker flag (623–635, 691–702).
6. 7.1 **Phase 0 gap bars** and the **"three ways to close the gap"** option selector with illustrative dilution maths (636–658, 676–683).
7. 7.2 **reserved-matters list** (728, 788).
8. 7.2 **delegation-of-authority matrix** and **approval-finder slider** (731–748, 792–798, 856–866).
9. 7.2 **monthly investor-pack mock-up**: three layers × six KPIs, scenario and month controls, revenue/profit sparkline (800–806, 867–888). The sparkline overlaps K1.39 "monthly revenue and profit chart", which Part K places at 7.4/6.1.
10. 7.2 **12-month governance and compliance calendar** (820–826, 900–902).
11. 7.2 **access-level matrix**, roles × data, with role highlight (828–833, 904–905).
12. 7.3 **scenario comparison bars**, best/base/down Y1 (1003–1009).
13. 7.3 **top-five risk cards** and two worked-example editorial blocks (978–995).
14. 7.4 **impact calculator** with five sliders (1116–1130).
15. 7.4 **theory-of-change chain** (1100–1106) and **SDG 3/5/8 alignment cards** (1139–1143).
16. 7.4 **impact dashboard table**: 10 measures, Y1/Y3 targets, SDG tags (1067–1068, 1135–1136).
17. 7.5 **data-room index** with status filter (1205–1229, 1297–1300).
18. 7.5 **open-questions board**, 14 items (1231–1246, 1301–1303).
19. Every section has a **"Risks and our answer" module** (mini risk lists in 7.1, 7.2, 7.4 and 7.5), separate from the 7.3 register.
20. **localStorage persistence**: tracker status, trips, location scores (`afya.p7.*`, 432).
21. `window.AFYA_P7_SOURCES` global (475), plus `window.__p7R` and `__p7Q` globals (946, 1258).
