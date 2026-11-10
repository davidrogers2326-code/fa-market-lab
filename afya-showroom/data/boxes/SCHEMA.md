# data/boxes/<slug>.json — the structure a package page renders from (brief D3, R6)

```jsonc
{
  "slug": "mama-na-mtoto",                       // E3 slug
  "name": {"en": "Mama na Mtoto", "sw": "Mama na Mtoto"},
  "final": true,                                  // false = page shows steps 1–3 + "item list in research"
  "delivery": "monthly",                          // "monthly" | "per-trimester"
  "box_size": "M",                                // S | M | L (packing 3,500 / 5,000 / 6,500)
  "who": {"en": "<p>…</p>", "sw": "<p>…</p>"},    // who it is for and why, expert depth (step 3)
  "clinic_line": {"en": "…", "sw": "…"},          // B16: required on disease-care and pregnancy boxes
  "guidance": [{"t": "WHO …", "u": "https://…", "chk": "2026-11-10"}],
  "stages": [{
    "key": "a", "label": {"en": "Month 1", "sw": "Mwezi 1"}, "months": "0–1",
    "items": [{
      "key": "diap",
      "name": {"en": "Nappies, newborn", "sw": "Nepi za mtoto mchanga"},
      "why": {"en": "…", "sw": "…"},                       // the reason it is in the box, with its guidance
      "qty": {"en": "240 a month", "sw": "240 kwa mwezi"},
      "qty_formula": "8 changes a day × 30 days",           // the arithmetic behind the quantity
      "units": 240,                                        // REQUIRED number: units needed per delivery (per month, or per trimester for per-trimester boxes), in the same unit as pack_units
      "kind": "goods",                                     // goods | toy | medicine (partner pharmacy, not priced in box)
      "brands": [{                                         // 4–5 choices in the same price range where found
        "brand": "Softcare", "product": "Premium Soft Diapers S", "pack": "80",
        "pack_units": 80,                                  // units per pack, so the monthly cost can be computed
        "price_tsh": 26000,                                // shelf price for one pack, as observed
        "src": {"name": "AfyaDepot", "u": "https://…", "chk": "2026-11-09"},
        "orig": null,                                      // or {"cur":"KES","amount":1200,"rate":20.33,"date":"2026-11-10"}
        "status": "TZ",                                    // TZ (Tanzanian listing) | KE (Kenyan listing converted) | EST (labelled estimate)
        "afya_choice": false,                              // true on the one value brand
        "default": true                                    // the brand used for the headline price
      }]
    }]
  }],
  "luxury": [{"tier": "premium", "name": {"en":"…","sw":"…"}, "price_tsh": 0, "src": {…}, "status": "TZ"}],
  "services": ["midwife-visit"],                  // keys into data/services.json
  "packing": {"film": {"en": "/_blob/…", "sw": "/_blob/…"}, "poster": "…"},
  "open": [{"en": "…", "sw": "…"}]                // what is not yet verified
}
```
Goods cost of an item per delivery = price_tsh × units ÷ pack_units (if pack_units or units is missing → one pack per delivery).
For items bought once and lasting several months (e.g. a toy, a thermometer), set units to the fraction used per delivery only if the box really ships it every time; otherwise list it in the stage where it ships.
Medicines are listed (kind "medicine") but never priced in the box: the partner pharmacy sells them (B4).
