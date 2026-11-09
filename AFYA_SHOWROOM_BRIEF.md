# AFYA BASICS INVESTOR SHOWROOM — REFURBISHMENT BRIEF

Version 1.0 · 7 November 2026 · Owner: Fahmy Abbas Cothema
For: Claude Code (the build agent). Read this whole file before writing any code.

---

## PART A — HOW TO USE THIS BRIEF

### A1. What this is
This file is the single guideline for refurbishing the Afya Basics Investor Showroom. The showroom already exists as a published Claude artifact (`https://claude.ai/artifact/B5XhoaAJsnACMvGJp3n2t7`) with 37 sections, 509 files, an English/Kiswahili toggle and a funding switch (TSh 340M flagship / TSh 150M start small). The written content has depth; the visual design does not match it. This brief sets out, in order: the rules that never change (Part B), the design system (Part C), the page architecture (Part D), the asset pipeline (Part E), the research work packages (Part F), the section-by-section edit plan (Part G), the build order (Part H), the quality checks before any publish (Part I), the open decisions (Part J), the complete component inventory (Part K), the definition of done (Part L) and the practical rules for the Claude Code session (Part M).

### A2. First instruction to Claude Code
Paste the block below as the first message of the session, with this file in the project root.

```
You are refurbishing the Afya Basics Investor Showroom. The guideline is
AFYA_SHOWROOM_BRIEF.md in this folder — read it fully before anything else.

Step 1: the showroom's complete code is already in ./showroom-original
(index.html and all sections/*.js, as published on 5 Nov 2026). Read it from
there. Images and videos are not local: pull a single one with the Artifact
tool (action "read", url https://claude.ai/artifact/B5XhoaAJsnACMvGJp3n2t7,
path "img/<name>" or "media/<name>") only when a section needs it. If the
Artifact tool is not available in this session, ask me for the file instead.

Step 2: produce a written audit (AUDIT.md) of every section against Part G and
every component, chart, video and image against Part K: what stays, what is
rewritten, what visual treatment it gets, and which research package (Part F)
feeds it. List anything you find that Part K does not mention. Do not change
any file yet.

Step 3: wait for my approval of AUDIT.md, then start Phase 1 in Part H.

Standing rules in Part B apply to every file you touch. Never invent a price,
a statistic or a source. Never publish without the Part I checklist passing.
Work section by section and show me each section before moving to the next.
```

### A3. Related artifacts and their status
Read these only when a section needs them; the Investor Showroom is the live document.
- `https://claude.ai/artifact/B5XhoaAJsnACMvGJp3n2t7` — **Afya Basics Investor Showroom** (5 Nov 2026): the document being refurbished.
- `https://claude.ai/artifact/5xoU6WV8eFH5CAdoE8sg5g` — **Afya Basics Master Framework** (1 Nov 2026): the approved section-by-section framework for the revamp; where this brief and the framework differ, this brief wins, and the difference is noted in AUDIT.md.
- `https://claude.ai/artifact/Dkyk4ZFi3nQ56p6qUYnh27` — **Afya Basics Chapter 1** (4 Nov 2026): the first chapter built on the framework; reuse what is approved there.
- `https://claude.ai/artifact/NPyaFEZNEzUQYeyovwUCN6` — **Afya Basics Research Lab** (17 Oct 2026): the earlier version. Treat as ideas and as the source of the original price list and formula (D4) only; do not copy its design.
- `https://claude.ai/artifact/85oPUYKRhTKJiCehwnsDmY` — **Market & Operations Research** (11 Oct 2026): background research; verify before reuse.
- `https://claude.ai/artifact/N2dCtwwi6XUrc6DpGkWGiy` — **The Box Opens (style preview)** (7 Nov 2026): the working hero preview with the two approved renders. Its item lists and brand-choice labels are placeholders written without research — take the motion and layout, never the item text.

### A4. Working method
- One section at a time. Finish, show, get approval, move on. No bulk rewrites.
- Research before writing. Every section in Part G names its research package; the research is done and written up before the section text is touched.
- Keep the word depth. Rewriting means reorganising and sharpening, not shortening. Where the current text explains something fully, keep that fullness.
- Everything is logged. Each phase ends with a short CHANGELOG entry: what changed, which files, what was researched, what is still open.
- No process narration inside the showroom. The investor never reads "we built this with…". Process lives in this brief and in CHANGELOG.md only.

---

## PART B — STANDING RULES (NON-NEGOTIABLE)

These rules come from the founder's decisions to date. They override any design instinct.

**Content and honesty**
1. Real prices only, with a source link. Every shilling figure in the showroom links to where it came from. An estimate is allowed only when labelled "estimate" beside the number. No invented prices, statistics, quotes or testimonials.
2. Prices are quoted in Tanzanian shillings. When a price originates in another currency (USD, CNY, INR), show the original beside the TSh figure and the exchange rate and date used.
3. Honest about funding gaps. If a cost is unknown or a number has not been verified, say so in the text rather than hiding it.
4. Afya Basics does not sell medicines itself. Medicines come through a licensed partner pharmacy. No section may imply otherwise.
5. The two funding options (TSh 340M flagship, TSh 150M start small) are never shown side by side. The viewer switches between them; every number that differs between the two responds to that switch.
6. The model is its own. Do not reference, copy or compare to other brands as the basis of the idea. (Zara/Uniqlo were only examples of fast payment; AfyaDepot in Part F is a price benchmark, not a model to copy.)

**Language**
7. English only on a page, with the whole-document English/Kiswahili toggle. Never mix the two languages in one paragraph, label, button or image caption.
8. Every string that appears in the UI has both an `en` and a `sw` value. A new string with only one language fails the Part I check.

**Visual**
9. Palette: black, royal green and gold. White is used only for text on dark surfaces and inside product/brand imagery. Purple and the earlier teal are rejected.
10. No glows, no gradient text, no neon, no CGI look. Lighting in imagery is warm, soft, studio-like.
11. No red cross symbols anywhere.
12. No real people's faces or photographs of real people in any image or video. Use faceless shots, hands, places (offices, restaurants, clinics) or invented people. Gloved hands are allowed in packing videos.
13. No cartoon-style visuals. Images must look real and professional.
14. The store is a single-storey, medium-sized, standalone, protected building (security-protected windows, clean surroundings, nothing built on the sides). Interior: a mix of tech showroom, modern clinic lobby, consulting area and luxury store — never a supermarket. Afya Check kiosk by the entrance next to a waiting area with TV/digital ad screens; counter topped with TV displays; small shelf of books and brochures. The all-glass "glass pavilion" is rejected.
15. Every Afya Box keeps the same green box design; only the gold side label (package name) and the package-colour sticker change per category. Box videos show gloved hands only, no faces, and show the box kept as decoration on a shelf (via its QR guide).

**Scope and line-up**
16. Package line-up wherever packages are presented must include: Mama na Mtoto, Afya Men, Afya Glow, Afya Siku, Afya Kazini, and packages for businesses and hotels. The full set of seventeen boxes in the current 3.5 is kept unless the founder removes one: by life stage — pregnancy (three trimesters), newborn 0–3 months, baby 3–6 and 6–12 months, toddler 1–3 years, child 4–12 (shule), teen girl (binti), teen boy (kijana), woman 20–59 (Afya Glow), man 20–59 (Afya Men), older adult 60+ (senior); by condition or need — diabetes (sukari), blood pressure (presha), kidney/dialysis care, recovery (rec), first aid (aid), home essentials (home), Afya Siku, office (Afya Kazini), hotel, and business. Disease-care boxes (sugar, presha, kidney, pregnancy) carry a line that how often to test, which dressing, what fluid limit, or any medicine is decided by the person's clinic. The boda boda/transport Afya Kazini kit is dropped for now (TSh 68,000/month was too high for riders); revisit a cheaper rider option later.
17. Mama na Mtoto is piloted first and replaces the old section 3.5 content as the model for every other package.
18. Packing and delivery costs are charged to the customer inside the box price. Every expense is recovered from the customer (the customer-funded model, section 6.2).
19. Partner services: hybrid model. Members pay for included services inside the box price; partners pay Afya a commission on extra services. Services can be taken inside the monthly package or as add-ons, booked in the app or in store. Prices must favour all three parties (buyer, provider, Afya).
20. Members can swap products between 4–5 brands in the same price range, customise next month's box at least 12 days before month end, and get renewal reminders by phone or email.

**Team and presentation**
21. Cecilia is listed beside the founder on the team; the relationship between them is not specified in any business material.
22. Target readers: a private investor and a development-finance fund. The materials are benchmarked against the best investor documents of breakthrough companies — explained in depth, with illustrations, not thin.
23. Test on desktop and phone, in both languages, before any publish.

---

## PART C — DESIGN SYSTEM

### C1. Intent
A bright, clean customer brand presented inside a dark, cinematic investor website. Two palettes exist and must not be confused: the **customer brand** (defined in 2.2: warm white, Afya Green, soft grey, gold — the colours of the store, the app, the box and the brand assets in `img/brand/`) and the **investor showroom UI** (the dark tokens in C2). The showroom is black; the brand it shows is bright. Section 2.2 and every customer-facing screen use the customer palette; the showroom chrome around them uses C2. The investor reads on a black page; the product (box, store, app) is lit like a luxury object in a studio. Restraint is the rule: three or four big visual moments across the whole showroom, and clean, quiet, readable layouts everywhere else. Every section keeps full written depth; design makes it easier to read, not shorter.

### C2. Tokens
Define once in a shared stylesheet (`tokens.css`) and never hard-code elsewhere.

```
--bg:        #000000   page background
--surface:   #0A0A0A   cards, tables, panels
--line:      #262626   hairlines, borders
--ink:       #F2F0EA   body text
--mute:      #8E8C85   secondary text, captions
--green:     #0E6B3A   royal green, brand surfaces and accents
--green-deep:#083F23   shadow side of green surfaces, active tabs
--green-edge:#15934F   brand wordmark accent, focus rings on green
--gold:      #C9A227   prices, section numbers, key figures, gold foil in imagery
```

Rules for use: gold is reserved for numbers and prices and the section number; it is never a background. Green is for brand surfaces (buttons, active states, box imagery), never for body text. No colour beyond these nine values appears in the UI. Package stickers (per-category colour on the box) exist only inside imagery, not in the UI.

### C3. Typography
- One family: **Sora** (Google Fonts), weights 300 (body), 400 (UI), 600 (headings). Fallback stack: system-ui, sans-serif.
- Scale (desktop / phone): display 56/34 px; section title 32/24; sub-heading 22/18; body 17/15; caption 13/12. Line height 1.55 for body, 1.1 for display.
- Line length under 75 characters for body text. Never justify.
- Headings in sentence case. No all-caps labels, no tracked-out eyebrows, no middle-dot meta strings.
- Numbers that matter (a price, a market size, a break-even month) are set in gold at sub-heading size with their unit and a one-line source beneath.

### C4. Layout
- Single column on phone; on desktop a 12-column grid with content at a maximum width of 1120 px, left-aligned text, media allowed to bleed to the viewport edge.
- Section numbering stays (0.1 … 7.5) because the content genuinely is a sequence the investor walks through. The number is shown in gold at the top of each section.
- Tables scroll horizontally inside their own container on phone; the page never scrolls sideways.
- Spacing scale: 8 / 16 / 24 / 40 / 64 / 96 px. Sections are separated by 96 px on desktop, 64 px on phone, with a 1 px hairline.

### C5. Motion
- Hero moments only (see C6). Everywhere else: no entrance animations, no hover effects beyond colour change, no parallax.
- Motion that answers an action is allowed everywhere: a tab switching, a box filling, a price updating, a funding switch changing numbers.
- Respect `prefers-reduced-motion`: every hero moment has a static end-state.
- Scroll-driven hero moments use a sticky stage of 250–300 vh and a 0–1 progress value; nothing autoplays with sound.

### C6. The hero moments (the only places that get full visual treatment)
1. **The Box Opens** — section 0.1 and the top of every package page in 3.5. The closed box fills the screen; on scroll it crossfades to the open box with its items rising, and a label appears on each item (name, quantity note, brand choices, price). Already built as a preview: `afya-box-opens.html` with two Weavy renders (`afya-box-mama-na-mtoto.png`, `afya-box-items-rising.png`).
2. **The store walkthrough** — section 3.1. Scroll moves the camera from the street, through the protected entrance, past the Afya Check kiosk and waiting area, to the counter with TV displays. Built as a sequence of 8–12 still renders crossfaded on scroll (not video), so it works on phone and respects reduced motion.
3. **Build your box** — inside each package page and in 3.8. The viewer taps a brand per item; the box image shows the item set and the price recalculates live from the Research Lab formula (Part F, R6).
4. **The funding switch** — 6.1–6.3. Switching between the TSh 340M and TSh 150M options animates every affected number to its new value. Quiet, numeric motion only.

Everything else is static, clean and readable.

### C7. What is explicitly banned in the UI
Glows, gradient text, neon colours, blue/purple tech lighting, floating device mockups with glowing screens, particle effects, generic rounded "SaaS cards" with identical shadows, background videos with sound, stock photos of people, red crosses, emoji in headings.

---

## PART D — PAGE ARCHITECTURE

### D1. Global shell
- Sticky top bar: wordmark left; EN | SW toggle right; funding option switch (340M | 150M) visible from section 1.3 onward.
- Left-side section index on desktop (numbers only, expands on hover to titles); a bottom sheet on phone. The index shows the current section in gold.
- Footer on every section: "Sources for this section" (collapsible list of links), previous / next section.
- The language toggle swaps every string via a dictionary (`sw-dict.js` already exists — extend it, never fork it). Images that carry text exist in two versions or carry no text.

### D2. Section template (used by every section except package pages)
```
[gold section number]  [section title, sentence case]
[one-paragraph summary — what the investor learns here, 60–90 words]
[primary visual — one still render, chart or table; never more than one hero-weight visual per section]
[body — the full written depth, with sub-headings every 150–250 words]
[key figures — up to four gold numbers with units and sources]
[what this costs / earns — if money is involved, a small table that responds to the funding switch]
[open questions — what is not yet verified, if anything]
[sources]
```

### D3. Package page template (section 3.5, one page per box, identical order)
1. **Closed box** — the hero render of this box with its own gold side label.
2. **The box opens** — crossfade to the open render; item labels appear.
3. **Who it is for and why** — the need, the age or condition, the guidance it is built from (WHO, UNICEF, NHS, IDF, Red Cross, Tanzanian OSH rules), written at expert depth.
4. **Every item, line by line** — table: item, why it is in the box, monthly quantity and the formula behind it, brand choices (4–5 in the same price range), shelf price with source, Afya Choice value brand.
5. **Services inside this box** — the partner services included, what the member gets, how it is priced for buyer, provider and Afya.
6. **Three tiers** — Regular, Premium, Luxury: the same essential core, what the "taste of luxury" item is at each tier, and the price built from the Research Lab formula. (Tiers are about what is in the box; Gold and Platinum are the 6- and 12-month plan lengths from 3.4 — keep the two ideas separate in every table.)
7. **Build your box** — interactive: choose brands, see the price update, see what the saving is versus shelf.
8. **How it is packed** — the packing video (gloved hands, no faces) and the QR guide; the box shown kept on a shelf.
9. **Reminders and swaps** — renewal reminders, the 12-day customisation window, how swaps work.
10. **Next box** — systematic navigation to the next package in the line-up.

The order never changes between packages. A package without a finished item list (R6) is shown with sections 1–3 only and a clearly labelled "item list in research" notice — never with placeholder items presented as real.

### D4. Pricing formula (from the existing Research Lab; keep as the single source of truth)
```
Price per box = shelf value × (1 − member saving by plan: 3% / 6% / 9%)
              + service fee
              + packing at landed cost of the box size (S 3,500 · M 5,000 · L 6,500)
              + delivery 3,500
              → rounded to the nearest 500
Plans: 1-month, 6-month (Gold), 12-month (Platinum) with the discounts and
perks already defined in sections 3.4/3.5.
```
Note for R3: the current showroom states both a member saving of 3/6/9% by plan and plan perks of "13/16/20% below shelf". These cannot both be true of the same price. R3 must resolve which is the headline saving and how it is composed, then the formula above is corrected once and every number follows.
Shelf value is rebuilt from the store's own shelf prices each quarter; members see the new price before renewal. This formula drives both the item tables and the Build-your-box calculator. If R3 changes any constant, change it once, here, and let every number follow.

---

## PART E — ASSET PIPELINE (WEAVY / FIGMA WEAVE)

### E1. The locked reference
The Afya Box design is fixed: deep matte royal green rigid box with lid; gold foil "Afya Basics" wordmark and house emblem on the lid; package name in gold on the side; small gold emblem and the motto "Afya yako, nyumbani kwako" on the front. Reference image: `afya-box-reference.webp` (from the showroom, `img/boxdoor.webp`). Every new box render is generated **from this reference**, never from a text prompt alone — text-only generation produced generic boxes and is not to be repeated.

Renders already approved and on file:
- `afya-box-render.png` — closed box, lid lifted, label "Sukari Care"
- `afya-box-mama-na-mtoto.png` — same, label "Mama na Mtoto"
- `afya-box-items-rising.png` — Mama na Mtoto open with six unbranded items rising

### E2. Model and process
- Model: Nano Banana 2.1 in Weavy (7 credits per run). Use `weave_upload_asset` for references, `weave_run_model`, then `weave_get_model_run_output`.
- Always quote the credit cost and get approval before each run. Never run twice for the same asset without showing the first result.
- Per box, exactly two runs: (a) closed box with that package's side label, generated from `afya-box-mama-na-mtoto.png` with the instruction "change only the side text to …"; (b) the open box with that package's core items rising, generated from (a). Products are generated unbranded (plain white/neutral packaging, no readable logos) so no wrong brand is baked into an image; brand names live in the labels and tables, not in the render.
- Store walkthrough (C6.2): 8–12 stills from one base render of the approved exterior/interior (`img/exterior.webp`, `img/exterior-side.webp`, `img/interior.webp` already exist in the showroom); each next still is generated from the previous one with a small camera move, so the space stays consistent.
- Package videos (packing, shelf display) and the Swahili/English narrated films stay in Weavy/Canva as already planned: brisk pace, narration in both languages, soft background music.

### E3. Naming and storage
```
assets/boxes/<slug>-closed.webp
assets/boxes/<slug>-open.webp
assets/store/walk-01.webp … walk-12.webp
assets/items/<slug>/<item-slug>.webp   (only once real brands are confirmed)
```
Slugs: `mama-na-mtoto`, `afya-men`, `afya-glow`, `afya-siku`, `afya-kazini-office`, `afya-biashara` (businesses), `afya-hoteli` (hotels), and the remaining boxes as named in the current 3.5.
Images are embedded in the published page as data URIs (WebP, quality 82, longest side 1100 px) or uploaded as artifact assets — the published page's content-security policy blocks remote images. Keep the whole page under 16 MB.

### E4. Budget note
Two runs per box ≈ 14 credits; the full line-up of 17 boxes ≈ 240 credits plus the store walkthrough (≈ 80–90). Generate in roadmap order (Mama na Mtoto, Afya Men, Afya Glow first), and only after that package's item list (R6) is final.

---

## PART F — RESEARCH WORK PACKAGES

Each package states what to find, where, what the output looks like, and which section it feeds. Findings already made are recorded so they are not researched twice. "Verify" means: open the source, confirm the figure still stands, record the date checked.

### R1. Regulation and compliance (feeds 4.5, 7.1, 7.3)
**Already found (7 Nov 2026):**
- Cosmetics and food regulation moved from TMDA to TBS in July 2019; TMDA keeps medicines and medical devices.
- Pre-packaged food and cosmetics must be registered with TBS before importation (Standards (Imports Registration and Batch Certification) Regulations, GN 681 of 2021); any trader importing or selling cosmetics/food must be registered as an importer (Standards Act, Cap 130). Fees published: TZS 50,000 registration, TZS 150,000 premise registration.
- Each shipment needs a PVoC Certificate of Conformity issued before shipping by a TBS contractor (Intertek, Bureau Veritas): minimum USD 250, maximum USD 5,000 per shipment; product registration (Route B) recommended for frequent shipments of the same products, renewable annually.
- Missing the CoC: 15% of CIF value penalty plus destination inspection (TZS 100,000 inspection fee, testing fees vary).
- Company: private limited company with TZS 1M capital ≈ TZS 217,200 in BRELA fees; since 15 April 2025 BRELA blocks companies that have not filed beneficial-owner (UBO) information; then TIN at TRA and a municipal business licence.
**To do:** verify every figure above on the TBS, BRELA and TRA sites and record the check date; obtain one written quote from a Dar es Salaam clearing agent for a 20 ft container of mixed cosmetics/consumables from China; confirm whether the Afya Check kiosk (R2) needs TMDA medical-device registration when used for non-diagnostic screening; list which product families in 3.6 are TBS-regulated, TMDA-regulated or unregulated.
**Output:** `research/R1-compliance.md` with a fee table (TSh, with source and date), a 15-step licence checklist (replacing the current one in 7.1 where it differs), and a compliance budget line of TSh 8–12M to be confirmed by the agent's quote.

### R2. Afya Check Station (feeds 3.3, 4.1)
**Already found:** Chinese all-in-one kiosks (height, weight, BMI, blood pressure, SpO2, temperature, body composition) list at about USD 3,267–3,630; units adding ECG, glucose and uric acid at about USD 6,820–7,425 (HW-V7000 class). Indicative landed cost for the basic tier ≈ TSh 9–10M.
**Decision to carry:** basic tier only; no blood-prick tests (consumables, trained staff, medical-device territory). Presented as a wellness screening station, 50-second flow.
**To do:** three supplier quotes with CE/ISO certificates, warranty terms and spare-part availability; freight and duty to Dar; a maintenance budget (assume one failure per year); confirm the 15-measurement list in 3.3 against what the basic tier actually measures and correct the section.
**Output:** `research/R2-kiosk.md` with a comparison table and the chosen spec; corrected measurement list for 3.3.

### R3. Pricing benchmark and churn defence (feeds 3.5, 6.1, 6.2)
**Already found:** a licensed Tanzanian online pharmacy (AfyaDepot, afyadepot.co.tz) sells e.g. Softcare diapers at TSh 6,000–26,000 with same-day delivery in Dar es Salaam and free delivery above TZS 250,000 — a live benchmark for retail prices and delivery expectations.
**To do:** for every item in the Mama na Mtoto list (R6), record the shelf price from (a) AfyaDepot, (b) one Dar supermarket chain's online listing, (c) a Kariakoo wholesale phone enquiry (two calls, logged with date and contact role). Build the box price from the D4 formula and show that the member price is at or below the sum of shelf prices before the "taste of luxury" item and services are added. If it is not, change items or suppliers until it is — this is the condition on which the whole model rests.
**Output:** `research/R3-pricing.md` plus `data/prices.json` consumed by the Build-your-box calculator and the 3.5 tables; a one-page "why members stay" argument for 5.3 based on the number, not adjectives.

### R4. Pre-sale and phased launch (feeds 5.1, 5.4, 6.3, 7.1)
**Decision to carry:** no online-only pilot. Demand is proven with a 60-day founding-member pre-sale during the build: first 300 members get a lifetime discount for a refundable deposit (TSh 10,000 proposed; confirm), promoted at clinics, maternity wards and offices in Dar. Launch is phased: Phase 1 (opening–month 6) three packages (Mama na Mtoto, Afya Men, Afya Glow), one tier each plus add-ons, fixed contents, partner services for Mama na Mtoto only; Phase 2 (month 6–12) tiers, brand swaps, Afya Siku, Afya Kazini; Phase 3 (year 2) business/hotel kits, nutrition shelf, second store. Shop manager hired two months before opening.
**To do:** draft the pre-sale terms (deposit, refund rule, lifetime discount value, member number cap) and check them against Tanzanian consumer-protection rules; cost the pre-sale campaign; add the pre-sale and the three phases to the roadmap and to the use-of-funds tranches so that investor money is released against pre-sale milestones.
**Output:** `research/R4-presale.md`; roadmap and tranche tables for 5.4 and 6.3.

### R5. Recurring payments (feeds 3.4, 3.8, 4.1)
**Already found:** true standing orders on M-Pesa (M-Pesa Ratiba) exist in Kenya; in Tanzania recurring billing over M-Pesa is done with payment mandates plus a reminder sequence (D-3, D-1, D0, D+2) rather than standing orders.
**To do:** confirm with Vodacom M-Pesa Business, Tigo Pesa and Airtel Money what merchant-side recurring/mandate products exist in Tanzania today, their fees and integration route; design the renewal flow (reminder sequence, grace period, pause) and the 6/12-month prepaid plans as the primary churn defence.
**Output:** `research/R5-payments.md`; renewal flow diagram for 3.4; fee line in 4.1 running costs.

### R6. Package design, item by item (feeds 3.5 — the core of the showroom)
Treat each package as a scientific and social-science project, as if designed by doctors, pharmacists, scientists and entrepreneurs. For each box: who it is for; the guidance it is built from; every item with the reason it is there, a monthly quantity formula, 4–5 brand choices in the same price range, the Afya Choice value brand, and a sourced shelf price; one small "taste of luxury" item per tier (Regular → Premium → Luxury, same essential core); partner services included; at least one cheap, helpful developmental toy in baby boxes; quantities measured to the months paid; no filler, no empty space. Mama na Mtoto may be two boxes (mother, baby). The Luxury tier must look truly luxurious, using affordable premium brands (Bath & Body Works was the founder's example) priced to cover the premium. Each package aims at a "winning product": quality writing, a film, and every product with a choice of brands.
**Order:** Mama na Mtoto → Afya Men → Afya Glow → Afya Siku → Afya Kazini (office) → businesses → hotels → remaining boxes.
**Output per box:** `research/R6-<slug>.md` and `data/boxes/<slug>.json` (the structure the package page renders from). When each box is final, update the front door (0.1/0.2) so its package summaries match.

### R7. Partner services and pricing (feeds 3.5, 5.2, 6.2)
For each included or add-on service (baby massage, monthly check-up and weigh-in, skin consultation, blood-pressure checks, etc.): what a Dar provider charges today, what Afya pays, what the member pays inside the box or as an add-on, Afya's commission on extras. Three-party fairness is the test.
**Output:** `research/R7-services.md` and `data/services.json`.

### R8. Businesses and hotels (feeds 3.5, 5.2)
Monthly essentials packages for small and large businesses and for hotels, designed as a unique income line: what a small office, a restaurant, a guest house and a 3-star hotel actually consume monthly; what they pay now; a package and price per size. Images use places (offices, restaurants, hotel rooms), never faces.
**Output:** `research/R8-business-hotels.md` and two package JSON files.

### R9. Nutrition shelf for Mama na Mtoto (feeds 3.5, 3.6)
Customer-chosen (not assigned) food/nutrition shelf: uji wa lishe, infant cereals, milk, etc. Built on professional nutrition guidance (WHO/UNICEF infant feeding), with what is and is not appropriate to sell by age, and shelf prices.
**Output:** `research/R9-nutrition.md` and the shelf rows for 3.6.

### R10. Benchmark study — the world's best investor documents (feeds every section, especially 0.1, 0.2, 6.x, 7.5)
Study five to eight investor documents of breakthrough companies that are publicly available (S-1 filings, published pitch decks, annual reports praised in design and business press): how they open, how they state the ask, how they show unit economics, how they handle risk honestly, how they illustrate. Write what Afya adopts and what it rejects. This is the standard the showroom is measured against (B22).
**Output:** `research/R10-benchmark.md` with a checklist applied to 0.1, 0.2, 6.1–6.3 and 7.5 before Phase 7.

---

## PART G — SECTION-BY-SECTION EDIT PLAN

Legend — Keep: content stays, re-laid out on the template. Rewrite: content restructured and sharpened at the same depth, with research folded in. Visual: the treatment that section gets (Hero = one of C6; Still = one render or chart; Table; Interactive).

| § | Section | Action | Visual | Research |
|---|---|---|---|---|
| 0.1 | Home: the 60-second story | Rewrite — headline, the problem in one line, five key numbers (sourced), the ask, the doors | Hero: The Box Opens | R3, R4, R6 |
| 0.2 | The ten-minute presentation | Keep structure; numbers live from the model; speaker notes in both languages | Still per slide | all |
| 1.1 | The problem | Keep text; replace any people photos with places/hands | Still | — |
| 1.2 | The evidence | Keep; verify every citation link opens; add check dates | Interactive (existing) | R1 verify |
| 1.3 | Market size | Keep calculation; show the working as a table responding to the funding switch | Table | R3 |
| 1.4 | Our customers | Keep six personas; faceless imagery; add monthly spend sources | Still | R3 |
| 1.5 | Why now | Keep; add the mobile-money and online-pharmacy evidence from R3/R5 | Still | R3, R5 |
| 2.1 | The Afya Basics concept | Rewrite into one picture: store + membership + digital; the promise | Still (one diagram) | — |
| 2.2 | The brand | Rewrite against Part C: tokens, type, photo style, tone, the box design (E1) | Still | — |
| 2.3 | How it all works | Keep the end-to-end flow; rebuild as a clean animated-on-scroll diagram, no glows | Still/animated diagram | — |
| 3.1 | The store | Rewrite per rule B14; floor plan; Care Zones | Hero: store walkthrough | — |
| 3.2 | Customer journey & fast checkout | Keep journeys and time targets; keep scan-and-go demo | Interactive (existing) | R5 |
| 3.3 | The Afya Check Station | Rewrite with the chosen spec and corrected measurement list | Still + Table | R2 |
| 3.4 | Membership and cards | Keep cards; add renewal flow and prepaid plans as churn defence | Table + flow | R5 |
| 3.5 | Afya Boxes & Afya Choice | Rebuild as package pages on the D3 template, Mama na Mtoto first | Hero per box + Interactive | R6, R7, R3 |
| 3.6 | The product range | Keep the 2,810-product catalogue; add TBS/TMDA/unregulated flag per family; nutrition shelf | Table | R1, R9 |
| 3.7 | Premium, gifts and rentals | Keep; images faceless; prices sourced | Still | R3 |
| 3.8 | Digital store and app | Keep screens; add Build-your-box and renewal flow | Interactive | R5, R6 |
| 4.1 | The tech platform | Keep; add payment-provider fees and kiosk maintenance to running costs | Table | R2, R5 |
| 4.2 | Sourcing and supply | Rewrite landed-cost section with PVoC, duties and the clearing-agent quote; goods sourced mostly from China and India, with the sourcing lanes and lead times shown | Table | R1 |
| 4.3 | Packing and delivery | Keep; box flow videos per B15; delivery cost inside price (B18) | Still + video | — |
| 4.4 | Team and daily operations | Keep; add manager hired two months pre-opening; Cecilia per B21 | Still | R4 |
| 4.5 | Quality and compliance | Rewrite on R1: TBS for cosmetics/food, TMDA for medicines/devices, the fee table, the shipment process | Table | R1 |
| 5.1 | Winning customers | Rewrite to lead with the founding-member pre-sale and the first-year calendar | Table/calendar | R4 |
| 5.2 | Partnerships and B2B | Keep; add service-provider terms and business/hotel packages | Table | R7, R8 |
| 5.3 | Competition and our moat | Rewrite the moat as the number: member price vs shelf, plus services; AfyaDepot as benchmark | Table | R3 |
| 5.4 | The road to TSh billions | Keep scenarios; add the three launch phases and revenue gates; the long-term goal stays a multi-shop chain (the founder's reference point is Apollo Pharmacy — a goal, not a model to copy, per B6) | Table | R4 |
| 6.1 | Financials | Keep model; every constant traceable to D4 or a research file | Hero: funding switch | R3, R1, R2 |
| 6.2 | The customer-funded model | Keep; show one box's price decomposition as the worked example | Table | R3 |
| 6.3 | Funding and use of funds | Rewrite tranches against pre-sale milestones; compliance and kiosk lines | Table | R4, R1, R2 |
| 6.4 | Ownership and exit | Keep (founders' 25%, protections, sale calculator) | Interactive (existing) | — |
| 7.1 | Setup, licences, research & travel | Rewrite the 15-step checklist from R1; keep research/travel budget | Table | R1 |
| 7.2 | Governance and reporting | Keep | Table | — |
| 7.3 | Risks | Rewrite: churn, build-before-demand, scope, regulation, payment collection, kiosk failure — each with the answer from R1–R5 | Table | R1–R5 |
| 7.4 | Social impact | Keep; measures sourced | Still | — |
| 7.5 | Proof pack, Q&A and sources | Rebuild the source list from the research files; add the four new investor questions | Table | all |

---

## PART H — BUILD ORDER

**Phase 0 — Audit (no code changes).** Read the showroom. Write AUDIT.md against Part G. Approval gate.

**Phase 1 — Foundations.** `tokens.css`, typography, the global shell (D1), the section template (D2) and the package template (D3) as reusable components; extend `sw-dict.js`. Migrate 0.1 onto the new shell with the existing Box Opens preview. Approval gate.

**Phase 2 — Research R1, R2, R3, R5.** Write the four research files. No showroom text changes until each file is approved.

**Phase 3 — Mama na Mtoto end to end.** R6 for Mama na Mtoto (and R7/R9 as they apply), `data/boxes/mama-na-mtoto.json`, two Weavy renders, the full package page on D3, Build-your-box working from D4 and `data/prices.json`. Approval gate — this page is the model for everything else.

**Phase 4 — Compliance and money.** Sections 4.5, 7.1, 4.2, 3.3, 3.4, 6.1–6.3, 7.3 on the research. Funding switch verified across all of them.

**Phase 5 — Remaining packages.** Afya Men, Afya Glow, then Afya Siku, Afya Kazini, businesses, hotels, then the rest — each: R6 file → JSON → two renders → page → approval. Update 0.1/0.2 package summaries as each is finalised (B17).

**Phase 6 — Store walkthrough and the quiet sections.** 3.1 hero; sections 1.x, 2.x, 3.6–3.8, 4.1–4.4, 5.x, 6.4, 7.2, 7.4, 7.5 on the template.

**Phase 7 — Full QA and publish.** Part I in both languages, desktop and phone. Publish with the artifact's URL so it updates in place.

Each phase ends with a CHANGELOG.md entry and a list of open questions for the founder.

---

## PART I — QUALITY CHECKLIST (RUN BEFORE EVERY PUBLISH)

**Content**
- [ ] Every TSh figure has a source link or an "estimate" label beside it.
- [ ] Every foreign-currency figure shows the original currency, rate and date.
- [ ] No sentence implies Afya sells medicines.
- [ ] The two funding options never appear side by side; every dependent number responds to the switch.
- [ ] Package line-up (B16) is complete wherever packages are listed; the boda boda kit is absent.
- [ ] Cecilia is on the team; no relationship stated.
- [ ] No process narration in the showroom.

**Language**
- [ ] Every UI string has `en` and `sw`; toggle tested on every section; no mixed-language paragraph, label or caption.

**Visual**
- [ ] Only the nine token colours in the UI; no glows, gradient text, neon or CGI look.
- [ ] No red crosses; no real faces or photos of real people; no cartoon visuals.
- [ ] Every box image matches the locked reference (E1) and carries the right side label.
- [ ] Store imagery matches B14.
- [ ] At most one hero-weight visual per section; only the four C6 hero moments animate on scroll.
- [ ] `prefers-reduced-motion` gives a complete static page.
- [ ] Every image has `alt` text in both languages; every video has a poster frame and captions in both languages and does not autoplay with sound.
- [ ] No package page shows placeholder items as real; packages without a finished R6 list carry the "item list in research" notice.
- [ ] The R10 benchmark checklist has been applied to 0.1, 0.2, 6.1–6.3 and 7.5.

**Technical**
- [ ] Page under 16 MB; all images embedded (data URI or artifact assets); no remote images or scripts outside the allowed hosts.
- [ ] No horizontal page scroll on a 360 px phone; tables scroll inside their containers.
- [ ] Safe-area insets handled; sticky bar does not cover content.
- [ ] Build-your-box prices equal the D4 formula to the shilling for three test baskets.
- [ ] Every source link in 7.5 opens (checked, dated).

**Sign-off**
- [ ] Tested on desktop and phone in both languages by the founder. Then publish.

---

## PART J — OPEN DECISIONS FOR THE FOUNDER

These need an answer before the section that depends on them is built.
1. Pre-sale deposit amount and refund rule (R4) — TSh 10,000 proposed.
2. Mama na Mtoto as one box or two (mother / baby) (R6).
3. Whether the health kiosk is bought before opening or leased for the first year (R2).
4. Which Dar supermarket chain to use as the second price benchmark (R3).
5. Whether Afya Siku and Afya Kazini keep their current names and scope in the Phase 2 line-up (R6).
6. Out of scope for this refurbishment but to be designed later: the founder's plan to run the whole company online (investor, board, operations) with access levels for himself, Cecilia and others, kept simple. The showroom's 7.2 governance and the investor pack (K6.4) should be built so they can become that system's reporting layer without rework.

---

## PART K — COMPLETE COMPONENT INVENTORY (EVERYTHING THAT MUST BE BUILT OR REBUILT)

This part exists so that nothing in the showroom is left as "the old version". Every component below is either rebuilt on the new design system or explicitly kept, and each one is listed in AUDIT.md with its decision. If Claude Code finds a component in the showroom that is not listed here, it adds it to AUDIT.md before touching it — nothing is silently dropped.

### K1. Interactive simulators and demos (all rebuilt on Part C tokens; logic kept unless stated)
| # | Component | Where | What it does today | Action |
|---|---|---|---|---|
| K1.1 | Presenter mode | 0.2 | 16 slides, timer, speaker notes, keyboard shortcuts, first/next/previous/all-slides, close | Rebuild on the design system; numbers pulled live from `model.js` (K4); speaker notes in both languages; one static render per slide; export the same 16 slides to the Canva deck (K6.3) |
| K1.2 | Scene player (the 60-second story) | 0.1 | Concept images per scene, play/pause, next/previous scene, timestamps | Replace with the Box Opens hero (C6.1) followed by the five numbers and doors; keep the chapter timestamps as the reading path |
| K1.3 | Reading path and chapter navigation | shell | Chapter list, "reading path" control | Becomes the left index / bottom sheet (D1) |
| K1.4 | Language / Lugha toggle | shell | Whole-document EN/SW | Keep; audit every string (I); no mixed-language output |
| K1.5 | Funding switch 340M / 150M | shell, 6.x | Changes dependent numbers | Keep; extend so every dependent number in every section responds (I); animate numerically (C6.4) |
| K1.6 | Evidence room | 1.2 | Interactive evidence cards with citations | Keep; verify each link, add check dates |
| K1.7 | Market-size nested circles | 1.3 | "Nested circles, not to scale" diagram | Rebuild as a clean inline-SVG diagram, with the calculation table beside it |
| K1.8 | Persona cards | 1.4 | Six personas, images | Faceless imagery (B12); add spend sources |
| K1.9 | "One connected system with nine modules" | 2.3 / 4.1 | System diagram | Rebuild as inline SVG, animated on scroll only in 2.3 |
| K1.10 | 5D store tour | 3.1 | "Drag to look around", stops, next/previous stop, videos store-walk-1…4, store-plan-1…2 | Replace with the still-based scroll walkthrough (C6.2); keep the stops as labelled points; floor plan (180 m²) rebuilt as clean SVG; the old walk videos retired unless re-rendered on the approved store design |
| K1.11 | Customer journey + scan-and-go demo | 3.2 | Five journeys, time targets, clickable scan-and-go, images cj-* , pay-demo video | Keep the demo logic; re-skin; replace any people imagery; demo screens re-rendered from the app design (K6.2) |
| K1.12 | Afya Check flow + funnel | 3.3 | Four-minute flow, "funnel from visitors to checks to purchases", afya-check video | Rewrite on R2 (basic tier, 50-second flow); funnel chart rebuilt from `model.js`; simulator shows the actual measurement list |
| K1.13 | Membership card flip + members-by-scenario chart + waterfall | 3.4 | Six flip cards, 12-month members chart, "waterfall of one member's monthly box" | Keep logic; re-skin; waterfall becomes the worked example in 6.2; renewal flow (R5) added |
| K1.14 | Box chooser + calendar day picker + price charts | 3.5 | Choose a box, pick the customisation day, price per box by plan, price over 24 months | Rebuild inside the package page template (D3): Build-your-box (C6.3) replaces the chooser; the 12-day calendar becomes section 9 of the template; charts from `data/prices.json` |
| K1.15 | Catalogue search, product families by Care Zone | 3.6 | Search over 2,810 products / 527 families | Keep logic; re-skin; add regulation flag column (R1); nutrition shelf (R9) |
| K1.16 | Rent-versus-buy chart, seven premium ideas, gift films, Michango ya Afya (health gift contributions) | 3.7 | 26-week comparison; premium, gift and rental ideas | Keep; re-skin; prices sourced; gift films per K3; Michango flow shown with mobile-money contributions |
| K1.17 | Online store mock-up, app screens, WhatsApp ordering demo | 3.8 | Static mock-ups | Re-render from the app design (K6.2); add Build-your-box and the renewal flow |
| K1.18 | Cap table, use-of-funds ring, scenario switch, sale calculator, investor-pack mock-up | 6.x | Financial interactives | Keep logic; every input traceable to `model.js`; sale calculator keeps the founders' 25%; ring and cap table rebuilt as inline SVG |
| K1.19 | Risk register | 7.3 | Table with owners and answers | Rewrite rows per Part G |
| K1.20 | Investor Q&A with category filter | 7.5 | Filterable questions | Keep; add the four new questions (churn, build-before-demand, scope, payment collection) with the answers from R3–R5 |
| K1.21 | Sources footer | every section | Collapsible list | Standardise (D1); generated from the research files |
| K1.22 | Five pains map, "choose a pain", jump-to-moment | 1.1 | Stylised Dar es Salaam district map with the five pains; pain chooser | Rebuild map as inline SVG; faceless/scene imagery; keep chooser |
| K1.23 | Evidence filters (theme, confidence, measure), household chooser | 1.2 | Filterable evidence with confidence levels | Keep; verify links; add check dates; confidence labels in both languages |
| K1.24 | 400-houses market diagram, household map by frequency and urgency | 1.3 / 1.4 | Dar households as 400 houses; six households mapped | Rebuild as inline SVG from `model.js`; responds to funding switch where the first-target market differs |
| K1.25 | Seven trend strands timeline | 1.5 | Trends converging on the 2026–27 opening | Rebuild as clean SVG timeline; sources per strand |
| K1.26 | Concept diagram store + membership + app | 2.1 | One picture of the concept | Rebuild as the single still for 2.1 |
| K1.27 | Brand kit: marks (`img/brand/l-horiz-gold.png`, `l-stack-onDark.png`, `l-stack-onLight.png`), colour proportion, type samples, tone, customer charter, "we are / we are not" positioning, collection filter | 2.2 | Brand section | Keep the marks (convert to SVG if the originals exist); rewrite the section to document both palettes (C1); customer charter in both languages |
| K1.28 | Animated supplier-to-aftercare flow with "play this step in the film" | 2.3 | Goods, money and data moving through stages | Rebuild as scroll-animated inline SVG (the one animated diagram allowed); film steps re-linked to the re-rendered films |
| K1.29 | Stores-by-year chart (1 to 47 over 12 years), stacked year-one revenue by channel, scenario switch | 2.x / 5.4 | Growth charts | From `model.js`; three scenarios; responds to funding switch |
| K1.30 | "One account, one price, one stock" demo, order-type / time-of-order chooser, offline toggle ("toggle internet connection"), one-sale-updates-four-records demo, module map | 4.1 | Tech platform demos | Keep logic; re-skin; offline mode demo stays (it is a real selling point for Dar) |
| K1.31 | Import timeline, order-to-shelf days by sourcing lane, stock level over 180 days, known fees vs budget | 4.2 | Sourcing visuals | Rebuild from R1 (PVoC, duties, agent quote) and `model.js` |
| K1.32 | Delivery zone map (municipal councils), customer payment vs cost per delivery, one month of the box calendar (member delivered on day 3) | 4.3 | Delivery visuals | Rebuild as SVG; payment-vs-cost must show the cost recovered inside the price (B18) |
| K1.33 | Organisation chart of Store #1, shift plan 08:30–21:00 | 4.4 | Team visuals | Keep; add the shop manager (preferably a physiotherapy graduate) hired two months before opening; Cecilia per B21; no photos |
| K1.34 | Compliance calendar (12 months), expiry zones (days left for four batches), recall procedure (seven steps) and recall timeline, medicine order flow with the partner pharmacy | 4.5 | Compliance visuals | Rebuild from R1; medicine flow must show the licensed partner pharmacy as the seller (B4) |
| K1.35 | Growth loop (five steps), month-12 funnel, window-poster concept image | 5.1 | Growth visuals | Rewrite to lead with the pre-sale (R4); poster concept re-rendered on the approved store; `img/real-p-sold-out.webp` replaced (K5) |
| K1.36 | Partner value matrix | 5.2 | Partners by value | Keep; add service providers (R7) and business/hotel accounts (R8) |
| K1.37 | Positioning map (advice/trust vs convenience) | 5.3 | Competitor map | Rebuild as SVG; add AfyaDepot as a benchmark point; moat stated as the member-price number (R3) |
| K1.38 | Eight growth stages, stores by city per year, cumulative cash over twelve years (three scenarios) | 5.4 | Chain visuals | From `model.js`; add the three launch phases (R4) before stage one |
| K1.39 | Monthly revenue and profit chart, direct store jobs by year | 7.4 / 6.1 | Impact and finance charts | From `model.js` |
| K1.40 | Fifteen-step setup checklist with status per step | 7.1 | Checklist with changeable status | Rewrite steps from R1; keep status control; add research and travel budget |
| K1.41 | Board seats (four votes), daily WhatsApp report mock-up | 7.2 | Governance visuals | Keep; report mock-up re-rendered on the customer palette |
| K1.42 | Risk heat map (likelihood × impact, clickable cells), risk register search and sort | 7.3 | Risk interactives | Keep logic; rewrite rows per Part G |
| K1.43 | Investor question search, source search | 7.5 | Searchable Q&A and sources | Keep; sources regenerated from research files |
| K1.44 | Afya Points loyalty (×1.5 / ×2 by plan), priority WhatsApp line, pause months | 3.4 | Plan perks | Keep; confirm the point values in R3 and state them in both languages |
| K1.45 | Product range data files (`sections/range36.js`, `range37.js`, `range38.js`, `range/sum.js`, `fp.js`) | 3.6–3.8 | Catalogue and front-page data | Keep as data; add regulation flag and nutrition shelf; no product is renamed without a source |

### K2. Charts and diagrams
All charts are inline SVG generated from data (`model.js`, `data/*.json`), never images, so they respond to the funding switch and the language toggle. One chart style: hairline axes in `--line`, series in `--green` and `--gold`, labels in `--mute`, no gridlines heavier than 1 px, no 3D, no drop shadows. Every chart has a one-line caption stating what it shows and its source.

### K3. Videos (all kept in Weavy/Canva; the page holds poster frames and the video files)
| Video | Where | Rule |
|---|---|---|
| afya-boxes-film, afya-box-ad | 0.1 / 3.5 | Box design per B15; gloved hands only; re-render if any frame shows the old box or a face |
| pay-demo | 3.2 | Screens re-rendered from the app design; no faces |
| afya-check | 3.3 | Must show the chosen basic-tier kiosk and the 50-second flow |
| visit-film, "a day in the store" | 3.2 / 4.4 | Faceless; store per B14 |
| store-plan-1/2, store-walk-1…4 | 3.1 | Retired in favour of the still walkthrough unless re-rendered on the approved store design |
| pk/<box>.en.mp4 and pk/<box>.sw.mp4 (package films) | 3.5 | One per package, narrated in both languages, brisk pace, soft music; shows packing (gloved hands) and the box kept on a shelf via the QR guide |
| Brand film, "Filamu ya Juma" | 0.1 / 5.1 | Same rules; posters replaced if they carry faces |
| Shelf-display film | 3.1 / 3.5 | New: how the boxes are displayed on the shop's aisles and shelves, matching the approved store design |
| Customer sample film | 0.1 / 3.8 | New or re-rendered: one customer shopping in store, ordering online and benefiting — educational and business eye-catching, faceless, narrated in both languages |
Every video has a poster frame in WebP, captions in both languages, and never autoplays with sound.

### K4. The financial model as code
A single `model.js` holds every assumption (prices from `data/prices.json`, member numbers, churn, costs, the two funding options, tranches) and every derived figure (P&L, cash flow, break-even, scenarios, market size, per-member profit). Every number printed anywhere in the showroom is read from `model.js` at render time. No number is typed by hand into a section. The model file carries a comment on every assumption with its source (research file and line). The three test baskets in Part I are run against it.

### K5. Images — rules by type
| Type | Rule |
|---|---|
| Box renders | From the locked reference only (E1); two per box |
| Store exterior / interior | Only the approved design (B14); regenerate from the existing `img/exterior.webp`, `img/exterior-side.webp`, `img/interior.webp` so the building stays the same across all views |
| People | **No real faces.** The current showroom contains photographs of real people (e.g. `img/real-mother-baby.webp`, `img/real-mother-back.webp`, persona and team images). Every one is replaced by a faceless shot, a back view, hands, or a place. Team section uses names and roles, not photos |
| Places (offices, restaurants, hotels, clinics) | Allowed and preferred for Afya Kazini, business and hotel packages |
| Product photos | Unbranded renders until a brand is confirmed in R6; then the real product photo with the brand named in the caption and table |
| App / store screens | Rendered from the Figma app design (K6.2), never hand-drawn mock-ups |
| Diagrams | Inline SVG (K2) |
Every image has `alt` text in both languages, is WebP, longest side ≤ 1600 px for hero images and ≤ 1100 px for others, and is embedded or stored as an artifact asset.

### K6. Companion deliverables (outside the HTML page, built from the same content)
- K6.1 **Translation dictionary** — `sw-dict.js` extended to every new string; a script reports any string missing a language.
- K6.2 **App and online-store design** — one Figma file (Design type) with the screens used in 3.2, 3.8 and the demos: home, Afya Check result, Build-your-box, checkout (scan-and-go and mobile money), renewal reminder, delivery tracking. Screens are exported from this file into the showroom; the showroom never carries screens drawn any other way.
- K6.3 **Canva presentation deck** — the 16 slides of 0.2, exported from the same content and numbers, in English and Kiswahili versions.
- K6.4 **Investor pack PDF** — the showroom's 37 sections in a printable dark-mode PDF with the funding option chosen at export (one PDF per option, never both in one file).
- K6.5 **Research folder** — `research/R1…R9.md` and `data/*.json`, the only sources the sections read from.
- K6.6 **CHANGELOG.md and AUDIT.md** — as described in Part A.

### K7. Technical platform
- Published as the same artifact (update in place with its URL). Call the Artifact tool's `capabilities` action for the current runtime contract before writing any runtime code; pass `contract: "latest"` only when deliberately upgrading.
- One `index.html` shell plus `sections/*.js` (existing structure kept), `tokens.css`, `model.js`, `data/`, `assets/`. No frameworks beyond what the page already uses; no external scripts except from the allowed CDN hosts, pinned to exact versions.
- Keyboard: every interactive control reachable by Tab, visible focus ring in `--gold`; presenter mode keeps its shortcuts.
- Performance: first screen under 2 seconds on a mid-range phone on 4G; hero images lazy-loaded below the fold; total page under 16 MB.

---

## PART L — DEFINITION OF "EVERYTHING"

The refurbishment is complete only when all of the following are true: every row in Part G has been actioned; every component in K1 is rebuilt or explicitly kept in AUDIT.md; every chart is generated (K2); every video meets K3; every number comes from `model.js` (K4); no image breaks K5; the six companion deliverables in K6 exist; R10 has been applied; Part M has been followed; Part I passes in both languages on desktop and phone; and Part J has no open decision left that a built section depends on.

---

## PART M — PRACTICAL RULES FOR THE CLAUDE CODE SESSION

1. **Back up before touching.** Phase 0 copies the pulled showroom to `showroom-original/` and commits it. Every phase is a git branch; nothing is published from a branch that has not been merged after approval.
2. **Weavy inside Claude Code.** If the Figma/Weave MCP connector is available in the session, renders are generated there with the same approval step (quote credits → approve → run). If it is not available, renders are generated in the Weavy app or in this chat and the files are dropped into `assets/` with the names in E3; the brief does not depend on which route is used.
3. **See it before you say it is done.** After each section, render screenshots at 360 px and 1280 px in both languages (the `artifact-emulator` skill, or Playwright) and attach them to the approval message. A section is not "done" on the strength of its code.
4. **No silent substitutions.** If a rule in Part B cannot be met for a section (for example a source cannot be found), the section says so in its "open questions" block and the CHANGELOG records it. Never fill the gap with an invented figure or a stock image.
5. **Versioning.** The showroom footer carries a version and date; each publish increments it. The investor sees "Version 2.x · date", nothing about tools.
6. **Credits.** Claude Code works section by section and does not re-read the whole showroom on every turn; it keeps a `NOTES.md` of what it has learned about the code so it is not re-derived. Weavy runs are batched per box (two runs), never one at a time with a chat in between.
7. **Stop and ask** only at the approval gates in Part H and on the Part J decisions; everything else proceeds from this brief.

---

End of brief.
