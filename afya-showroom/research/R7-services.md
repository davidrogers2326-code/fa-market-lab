# R7 — Partner services and their pricing (Mama Mjamzito and Mama na Mtoto)

Prepared 10 Nov 2026 against brief v1.2 (B19, D4, F R7, Part J). Data file: `data/services.json`. Exchange rates: none needed, because every figure here is in TSh (`research/fx.md`).

## In plain language

- The two mother boxes use five services. Three are partner services that can go inside the box: the **midwife or nurse home visit**, the **baby massage session** and the **antenatal class**. One is offered as an add-on only: the **postnatal check at a private clinic**. One is an Afya store service at no extra charge: the **monthly weigh-in and growth chart**.
- Inside the box the member pays the partner's member rate × 1.25 (D4), rounded to the nearest 500. Partners give Afya 70% of their walk-in price, so the member pays about **88% of the walk-in price, about 12% less**. Home visit: TSh 44,000 against 50,000. Baby massage: 22,000 against 25,000. Antenatal class: 17,500 against 20,000.
- In the box the provider receives **70% of walk-in**, paid in advance for a guaranteed booking. Afya keeps the remaining **17.5% of walk-in**, which is 20% of what the member pays.
- Booked once as an add-on, the member pays **90% of walk-in**. The provider keeps **81%** and pays Afya a **10% booking commission**, which is 9% of walk-in.
- **Government RCH clinics are free** for antenatal visits, postnatal care and under-five growth checks (2007 National Health Policy). Afya does not charge for any of these. It sends reminders only, and medical antenatal care stays with the clinic.
- **Only one figure comes from a Dar price list.** AfyaDepot charges **TSh 50,000** for a nurse home visit (senior home care), and this note uses it as the reference for the midwife visit. The other walk-in prices are **EST (planning, no quote)**. No Dar provider of baby massage or antenatal classes publishes a price online.
- One code correction: the showroom's 40,000 "partner price" for the midwife visit gives a member price of 50,000, the same as walk-in. A partner price of **35,000** keeps the member's saving.
- **Founder calls needed:** 2–3 home-nursing agencies or private midwives (PRINMAT members), 2 private maternity hospitals and 2 baby or antenatal studios. Ask each for the walk-in price, the rate for prepaid monthly volume, coverage area and TNMC registration.

---

## 1. The pricing rules used (from the brief and `model.js`)

| Term | Rule | Source |
|---|---|---|
| Walk-in price **W** | What the provider charges anyone who walks in | Provider (quote) |
| Partner price **P** (in the box) | `r500(W × 0.70)`: the partner gives members 70% of walk-in for prepaid, guaranteed bookings | `model.js` `services.member_rate: 0.70` |
| Member pays in the box | `r500(P × 1.25)`, nearest 500, charged in the month the service is delivered | Brief D4; `model.js` `markup: 0.25` |
| Afya in the box | member price − P | — |
| Add-on, member | `r500(W × 0.90)` | `model.js` `addon_rate: 0.90` |
| Add-on, provider net | add-on × 0.90 (= 81% of W) | `model.js` comment |
| Add-on, Afya | add-on × 0.10 (= 9% of W) | `model.js` `commission: 0.10` |
| Store and public services | 0 | Brief D4 |

`r500(n) = Math.round(n/500) × 500`, so the nearest 500 (D4; R3 §4d).

**"Partner price" in D4 must mean P, the negotiated member rate, not the walk-in price.** If the walk-in price is multiplied by 1.25, the member pays 125% of what a walk-in customer pays, and the buyer test fails. The break point is P ≤ 80% of W: above it, the box price is higher than walk-in.

---

## 2. Service tables

### 2.1 `midwife-home-visit`: midwife or nurse home visit (Mama na Mtoto, stage a: day 2–3 and day 7–14)

| Field | Value |
|---|---|
| Dar provider price today | **Not found** for a midwife postnatal visit. **Comparable (TZ):** AfyaDepot, Home Nursing Care, "Senior Home-care Visit", "50,000 Tsh / unit", https://www.afyadepot.co.tz/product/senior-home-care-visit, opened 10 Nov 2026. Other Dar home-nursing items on the same site: Bed Bath & Hygiene 40,000; IM/SC injection 20,000 per injection; Full Vital Signs Check 15,000 (price read from the page data). |
| Walk-in W used | **50,000**, status **EST** (taken from the comparable, not a quote for this service) |
| Partner price P | 35,000 |
| **Member pays in the box (D4)** | **44,000** (88% of W) |
| Afya in the box | 9,000 |
| Add-on: member / provider / Afya | 45,000 / 40,500 / 4,500 |
| Free public alternative | Postnatal care is free at RCH clinics, but it is given at the clinic, not at home |
| Code today | `part3c.js` mama svc: `p:40000` × 2 visits → member 50,000 each |

### 2.2 `baby-massage`: baby massage session or class (Mama na Mtoto)

| Field | Value |
|---|---|
| Dar provider price today | **Not found.** Searches in English and Kiswahili found no Dar baby-massage provider or studio. Context from search snippets only (pages blocked, not opened): adult massage in Dar runs about TSh 50,000–80,000 for 60 minutes (massageprices.pages.dev), and Fresha lists adult spas in Masaki and Oyster Bay. AfyaDepot's adult home "Lymphatic Drainage Massage" costs 75,000 (TZ, opened 10 Nov 2026). None of these is a baby service. |
| Walk-in W used | **25,000**, status **EST (planning, no quote)**, the `model.js` mama-pack figure |
| Partner price P | 17,500 |
| **Member pays in the box (D4)** | **22,000** (88% of W) |
| Afya in the box | 4,500 |
| Add-on: member / provider / Afya | 22,500 / 20,250 / 2,250 |
| Free public alternative | None known |
| Code today | `model.js` mama pack: walk-in 25,000, included 12 a year. `part3c.js`: `w:'option'`, `p:25000` used as the partner price, which gives a member price of 31,500 |

### 2.3 `antenatal-support`: antenatal class or check-in (Mama Mjamzito; not a medical visit)

| Field | Value |
|---|---|
| Dar provider price today | **Not found.** No Dar antenatal or childbirth-education class price is online. Priced results were all outside Tanzania (Singapore, UAE). Aga Khan Nairobi runs classes but publishes no fee. |
| Walk-in W used | **20,000**, status **EST (planning, no quote)**, the `model.js` preg-pack "Prenatal class" figure |
| Partner price P | 14,000 |
| **Member pays in the box (D4)** | **17,500** (87.5% of W) |
| Afya in the box | 3,500 |
| Add-on: member / provider / Afya | 18,000 / 16,200 / 1,800 |
| Free public alternative | Medical antenatal visits, iron and folic acid, and IPTp are free at RCH clinics. Afya sends reminders only. |
| Kept out of Afya's price | Medical antenatal tests are for the clinic. For reference, AfyaDepot's "MamaSave ANC Profile" lab bundle costs 75,000 (opened 10 Nov 2026). The pregnancy ultrasound (`part3c.js` preg, `p:50000`) is also a clinic service: see Open item 6. |
| Code today | `model.js` preg pack: "Prenatal class" walk-in 20,000, included 6 a year. `part3c.js`: `w:'option'`, `p:20000` |

### 2.4 `postnatal-check`: postnatal check for mother and baby (Mama na Mtoto, about week 6)

| Field | Value |
|---|---|
| Dar provider price today | **Not found.** Shree Hindu Mandal Hospital runs a Baby & Child Wellness Clinic with a paediatrician, and London Health Centre and Aga Khan polyclinics list paediatricians. None publishes a fee (search snippets; hosts blocked). |
| Walk-in W used | **40,000**, status **EST (planning, no quote)**, the existing `model.js` figure for a women's-health clinic consult (Gynaecology check-up, Postnatal physiotherapy, Lactation consultant) |
| Partner price P | 28,000 |
| Member pays in the box, if included (D4) | 35,000 (87.5% of W). **Not included by default.** |
| Afya in the box | 7,000 |
| Add-on: member / provider / Afya | **36,000 / 32,400 / 3,600** |
| Free public alternative | **Free** at RCH clinics, and Afya's own week-6 mood and blood-pressure screen in store is free (`part3c.js`, `w:'store'`). Offered as a paid add-on only, for families who want a private doctor. |

### 2.5 `baby-weigh-in`: monthly growth and weigh-in check

| Field | Value |
|---|---|
| Who | Afya store adviser (store service, no partner) |
| Member pays | **0** (D4: store services 0). The cost sits in the core price. |
| Walk-in | Not needed (`null`) |
| Free public alternative | Monthly growth monitoring is free at RCH clinics for under-fives |
| Code today | Consistent: `part3c.js` `w:'store'`; `model.js` mama `instore` |

### Summary (TSh)

| Key | W | Status | P | Member in box | Afya in box | Add-on member | Provider net (add-on) | Afya (add-on) |
|---|---|---|---|---|---|---|---|---|
| midwife-home-visit | 50,000 | EST (TZ comparable) | 35,000 | **44,000** | 9,000 | 45,000 | 40,500 | 4,500 |
| baby-massage | 25,000 | EST | 17,500 | **22,000** | 4,500 | 22,500 | 20,250 | 2,250 |
| antenatal-support | 20,000 | EST | 14,000 | **17,500** | 3,500 | 18,000 | 16,200 | 1,800 |
| postnatal-check | 40,000 | EST | 28,000 | 35,000 (add-on only) | 7,000 | **36,000** | 32,400 | 3,600 |
| baby-weigh-in | — | store | — | **0** | 0 | 0 | 0 | 0 |

**R3 service-fee example recalculated.** Stage a with two home visits costs 2 × 44,000 = **88,000**, not 100,000. The stage a 12-month price for that month is 152,500 + 88,000 = **240,500**, not 252,500.

---

## 3. Three-party fairness check

| Test | In the box | Add-on | Pass? |
|---|---|---|---|
| **Member** vs walk-in | pays 87.5–88% (saves about 12%) | pays 90% (saves 10%) | Yes, as long as P ≤ 80% of W. If P is 75%, the member pays 94%; at 80% the member pays 100% and the test fails. |
| **Provider** net vs walk-in | 70%, prepaid, guaranteed, with no marketing cost and no no-shows | 81%, a new customer brought by Afya | Plausible but **unproven**: the founder calls (§6) must confirm that providers accept 70% for volume. If one refuses, the rule above sets how far P can rise. |
| **Afya** margin | 17.5% of W (20% of the fee) for booking, prepayment float, quality follow-up and 1.2% payment fees (`model.js` `tax.payment_fees`) | 9% of W (10% of the booking), with no cost beyond the app booking | Yes. No breakage income is assumed, because the fee is charged only in the month the service is delivered (D4). |
| **Free services** | 0 for weigh-in, reminders and the week-6 store screen; RCH services are never charged | — | Yes |

Overall the members and Afya win on these rules. The provider's side is the one that still has to be confirmed by phone.

---

## 4. `model.js` and code constants: verified or corrected

| Constant / text | Value | Verdict |
|---|---|---|
| `services.member_rate` | 0.70 | **Verified** against the framework. Comment is correct. |
| `services.markup` | 0.25 | **Verified** = D4 × 1.25 |
| `servicePacks()` fee rounding | `up500` (round **up**) | **Correct to nearest 500** (`r500`), as D4 says |
| `services.addon_rate` | 0.90 | **Verified** (member 90%, partner keeps 81% of W) |
| `services.commission` | 0.10 | **Verified**: 10% of the booking, which is **9% of walk-in**, not 10% of walk-in |
| "member about 12% off" | 1 − 0.70 × 1.25 = 12.5% | **Verified** |
| `part3c.js` `HUD=1.25`, `services()` uses `r500(p × HUD)` | — | Rounding correct. **But `p` must be P (70% of W).** Today `p` holds walk-in-sized numbers. |
| `part3c.js` mama midwife visits `p:40000` | member 50,000 | **Correct to `p:35000`** (member 44,000), or confirm a real walk-in of at least 57,500 |
| `part3c.js` baby massage `p:25000` | member 31,500 = 126% of the `model.js` walk-in | **Correct to `p:17500`** (member 22,000) |
| `part3c.js` antenatal class `p:20000` | member 25,000 = 125% of walk-in | **Correct to `p:14000`** (member 17,500) |
| `part0.js` L1344 "about 87%… (90%)… 10%" | — | Verified (87.5% / 90% / 10% of the booking). Hand-typed: should read from `IN.services`. |
| `part0.js` L1369 "30% below walk-in for members" | — | **Wrong.** 30% is the partner's discount to Afya. Members get about 12.5% off in the box and 10% off as an add-on. |
| `part0.js` L1326 "(70%)", L1331 "× 1.25" | — | Verified, but hand-typed (audit 02, module 7) |
| Included or optional: baby massage (`model.js` 12 a year included vs `part3c` option) and prenatal class (`model.js` 6 a year included vs `part3c` option) | — | **Inconsistent.** Founder decision needed (Open item 5). |

No showroom code was edited: these are the corrections for the build phase.

---

## 5. Open items (founder actions)

1. **Midwife or nurse home visit: call 3 providers.** Call 2 Dar home-nursing agencies, and private midwives through PRINMAT (Private Nurses Midwives Association of Tanzania, head office in Dar; search snippet, eahealth.org, not opened). AfyaDepot's home-nursing team can serve as a price benchmark only (D-7). Ask:
   - the walk-in price of a postnatal visit to mother and baby (how long, what is checked, whether transport is included);
   - the price for 20–50 prepaid visits a month (target: 70% of walk-in, and no more than 80%);
   - which districts they cover and how far ahead they need a booking;
   - TNMC registration and indemnity.
2. **Postnatal check: call 2 private maternity hospitals**, for example Shree Hindu Mandal Baby & Child Wellness Clinic, Aga Khan Hospital Dar polyclinics, London Health Centre, Kairuki or Regency. Names are from search snippets and their pages were not opened. Ask for the consult fees for mother and baby, whether a joint mother-and-baby slot exists, and the corporate or member rate.
3. **Baby massage: find 2 providers.** Try baby wellness studios, paediatric physiotherapists, and nurses trained in infant massage (hospital maternity units, Masaki and Oyster Bay spas). Ask for the session price, the group size and the trainer's qualification.
4. **Antenatal class: call 2 providers.** Try private maternity hospitals' parent-education units and antenatal fitness studios. Ask for the price per class and per course, and whether partners can attend.
5. **Decide included vs add-on**: baby massage (12 a year in `model.js`) and prenatal class (6 a year) against "optional" in `part3c.js`. Recommendation: home visits included in stage a; massage and class offered as add-ons until quotes exist.
6. **Pregnancy ultrasound** (`part3c.js` preg, `p:50000`) is a medical antenatal service. Keep it with the clinic partner as an add-on, outside Afya's service fee, or confirm with R1 that it may be booked through Afya.
7. **VAT on Afya's service margin and commission**: check with R1 whether the 1.25 markup is a taxable supply by Afya.
8. **Replace each EST** with the median of the quotes, set P at no more than 0.70 × W, then rerun `data/services.json` from that rule.

---

## 6. Hosts needed (blocked from this session)

| Host | Why |
|---|---|
| `jiji.co.tz` | Dar classified listings for home nurses, maternity and health services with prices |
| `www.fresha.com`, `massageprices.pages.dev` | Spa and massage prices in Dar (snippet only so far) |
| `www.shm.or.tz`, `www.lhc.co.tz`, `www.agakhanhospitals.org`, `medwaypolyclinic2.webyetu.online` | Dar hospital and clinic service pages (fees, if published) |
| `www.udsm.ac.tz` | UDSM Hospital maternity services PDF (2026) |
| `eahealth.org` | PRINMAT and Tanzania Midwives Association entries |
| `www.moh.go.tz`, `dailynews.co.tz`, `allafrica.com` | Ministry guidance on free maternal and child services (March 2026 directive, snippet only) |
| `www.tnmc.go.tz` | Nurse and midwife registration check |
| `hospitals.aku.edu`, `www.riotimesonline.com` | Class formats and expat fee guides |

Reachable and used: `www.afyadepot.co.tz`, `www.thecitizen.co.tz`.

---

## 7. Sources

- AfyaDepot, Senior Home-care Visit, "Home Nursing Care … 50,000 Tsh / unit", https://www.afyadepot.co.tz/product/senior-home-care-visit. Opened 10 Nov 2026.
- AfyaDepot, Bed Bath & Hygiene, 40,000 Tsh, https://www.afyadepot.co.tz/product/bed-bath-hygiene; IM/SC Injection Admin, "20,000 Tsh / per injection", https://www.afyadepot.co.tz/product/im-sc-injection-admin; Full Vital Signs Check, 15,000 (from the page's price data), https://www.afyadepot.co.tz/product/full-vital-signs-check; Lymphatic Drainage Massage, 75,000 Tsh, https://www.afyadepot.co.tz/product/lymphatic-drainage-massage; MamaSave ANC Profile, 75,000 Tsh, https://www.afyadepot.co.tz/product/mamasave-anc-profile. All opened 10 Nov 2026. Service list taken from https://afyadepot.co.tz/sitemap.xml.
- The Citizen, "How mothers in rural Tanzania pay the price for 'free' maternal care", 27 Apr 2026: "The 2007 National Health Policy provides for free healthcare services for expectant mothers, family planning clients and children under five." The article also reports informal charges (for example a Dar case of TSh 50,000 asked for delivery supplies), so the founder should keep calling these services "free by policy". https://www.thecitizen.co.tz/tanzania/news/national/how-mothers-in-rural-tanzania-pay-the-price-for-free-maternal-care-5437524. Opened 10 Nov 2026.
- Search snippets only (pages not opened): PRINMAT, https://eahealth.org/node/7250; Shree Hindu Mandal Baby & Child Wellness Clinic, https://www.shm.or.tz/baby-and-child-wellness-clinic; London Health Centre paediatrics, https://www.lhc.co.tz/service-page/paediatrics; Dar massage prices, https://massageprices.pages.dev/tanzania/dar-es-salaam; Fresha Dar massage listings, https://www.fresha.com/lp/en/bt/massage/in/tz-dar-es-salaam. Searched 10 Nov 2026.
- Code: `showroom/model.js` (`services`, `servicePacks()`, `r500`/`up500`); `showroom/sections/part3c.js` (preg and mama `svc`, `HUD`, `services()`); `showroom/sections/part0.js` L1326, L1331, L1344, L1369; `audit/02-part0.md` module 7; `research/R3-pricing.md` §4c.
