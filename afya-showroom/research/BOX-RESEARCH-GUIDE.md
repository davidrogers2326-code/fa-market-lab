# How to research one Afya Box (R6) — shared instructions

Read first:
- `../AFYA_SHOWROOM_BRIEF.md` (v1.2): Part B (B1–B4, B16 incl. the clinic line on disease-care and pregnancy boxes, B20), D3, D4, F R6 (and F R8 for business and hotel), and decisions D-1 to D-21 in Part J.
- `../data/boxes/SCHEMA.md`: the exact JSON (numeric `units` per item, `pack_units` per brand, exactly one `default` and one `afya_choice` per item).
- The finished models to copy in quality and structure: `R6-mama-na-mtoto.md` and `../data/boxes/mama-na-mtoto.json`; also `R6-mama-mjamzito.md`.
- `R3-pricing.md` (landed-cost planning shares 78/72/50%, the margin check) and `fx.md` (the ONLY rates: KES 20.33, US$ 2,642.50, BoT 10 Nov 2026).

Starting point: the old box in `../showroom/sections/part3c.js` `D.PKG` (keys: preg, mama, shule, binti, kijana, glow, siku, man, home, aid, senior, rec, sugar, presha, kidney, kz, office, hotel, fam) and the catalogue in `../showroom/sections/range/lib.js` (`AFYA_LIB`: zones, cats, fams, P). Load both with node in a `vm` sandbox, providing `Event` and `dispatchEvent` stubs.

The box:
- **Who and why:** who it is for and why, at expert depth, in English and Kiswahili, with the guidance it is built from. Cite WHO and Tanzanian MoH where they can be opened; who.int is allowed. Mark anything seen only in a search snippet.
- **Items:** every item with why it is in the box, a monthly quantity with its formula, and 4–5 brand choices in the same price range with sourced shelf prices. One Afya Choice. No filler.
- **Luxury:** one premium and one luxury "taste of luxury" item, priced as its own line.
- **Medicines:** kind "medicine", via the licensed partner pharmacy, NOT priced (B4).
- **Clinic line (B16):** disease-care boxes (sugar, presha, kidney, recovery) carry it: how often to test, which dressing, what fluid limit or any medicine is decided by the person's clinic.
- **Images:** places only, never faces (B12).

Prices: AfyaDepot (afyadepot.co.tz; read the schema.org data on product pages, never /api) and Shoppers (www.shoppers.co.tz; crawl the category pages). Existing KE prices in the code may be used as status "KE" (KES original × 20.33, "not re-checked"). An estimate must be status "EST" with its basis. Never invent a price, brand, pack, rule or URL.

Never write process wording ("pilot code", "agent", "research phase") in visible strings.

Price check: compute the D4 price on the 1/6/12-month plans and the margin (landed shares, packing S 3,500 / M 5,000 / L 6,500, delivery 3,500, 1% points). If the box does not pay its way monthly, choose a fix (less frequent delivery, a minimum basket, or shipping with another box), apply it, and document it.

Outputs for each box:
- `research/R6-<slug>.md`, with a top section "In plain language";
- `data/boxes/<slug>.json`: `final` true if every core item has a sourced price, or a labelled estimate where no listing exists anywhere; `"packing":{"film":null}`. Validate it with node against SCHEMA.md.

Kiswahili for every visible string; list doubtful terms in the md. curl through Bash (`curl -sL --max-time 40 -A "Mozilla/5.0" URL`); WebSearch via ToolSearch "select:WebSearch". Do not edit showroom code or the brief.
