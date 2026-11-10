# R4 — Pre-sale and phased launch (feeds 5.1, 5.4, 6.3, 7.1)

Checked 10 Nov 2026. Draft for the founder; nothing here changes the showroom code, the financial model or the brief. Every figure is either (a) read from `showroom/model.js` v1.2 in a node `vm` sandbox, (b) taken from another research file (named), or (c) labelled **estimate** with its basis. Legal sources could not be opened from this session (every Tanzanian legal host and `www.fcc.go.tz` were refused by the network proxy); each legal point is marked **search snippet, page not opened**, and the whole terms sheet needs a Tanzanian lawyer's review before use.

## In plain language

- **What the pre-sale is.** For 60 days, before the lease is signed, Afya invites people to become one of 300 founding members. Each one pays a **TSh 10,000 deposit**. The deposit counts in full towards their first box, and they can ask for it back at any time before that first box.
- **What founding members get, for as long as they stay members:** the saving of the next longer plan. On the monthly plan they save 6% instead of 3%. On the 6-month plan they save 9% instead of 6%. On the 12-month plan they get 9%, which is the most any plan gives. No member, founding or not, ever pays more than 9% below Afya's shelf price, so the approved price rule (D4) is not broken. The margin stays at or above the 12-month plan's margin, and R6 shows that margin is positive in every Mama na Mtoto stage and every pregnancy box.
- **The gate (D-20).** If 300 deposits are in on day 60, store 1 is the flagship (TSh 340M). If not, store 1 opens as the start-small store (TSh 150M), and the founding members keep their rate. The gate is read on day 60, before the lease is signed, because the store's size is fixed when the lease is signed.
- **The rule that protects the investor.** Tranche 1 is paid on signing. Before the gate, only the spending both store sizes need is allowed, up to TSh 60M (the start-small tranche 1). Tranche 2 is paid on the gate. Tranche 3 is paid on store results. No amount in the model changes.
- **The rule that protects members.** Deposits sit in a separate bank account and are not spent. They are refunded in full within 7 days of a request, with Afya paying the transfer fee. If the store opens late or the plan changes, members are offered a refund. A deposit is never forfeited.
- **Law.** The terms are a standard-form consumer contract. Commentary says these must be filed with the Fair Competition Commission **at least 21 days before use** (search snippet). The Fair Competition Act 2003 also bars taking payment without being able to supply, bait advertising and misleading prices (search snippets). The design answers each point; see section 3.
- **Campaign cost (estimate):** about **TSh 4.0M**, taken from the seed's existing "Launch marketing" line. This works out at about TSh 13,300 per founding member. The model's year-1 marketing works out at about TSh 36,300 per new member (flagship base case).
- **Launch phases.** Phase 1 (opening to month 6): three packages, one tier each, fixed contents. Phase 2 (months 6–12): tiers, swaps, Afya Siku, Afya Kazini and Afya's own TBS registrations. Phase 3 (year 2): business and hotel kits, the nutrition shelf and store 2. The shop manager (the store lead in the model) starts two months before opening.

---

## 1. Inputs used

| Input | Value | Source |
|---|---|---|
| Seed and split, flagship | TSh 340,000,000 · 40% / 35% / 25% = 136,000,000 / 119,000,000 / 85,000,000 | `model.js` `A.seed` (line ~84) |
| Seed and split, start small | TSh 150,000,000 · same split = 60,000,000 / 52,500,000 / 37,500,000 | `model.js` `LEAN_DIFF.seed` (line ~165), split inherited from `A.seed.tranches` |
| Current milestones (both options) | T1 "on signing — lease advance, company & licences, fit-out starts"; T2 "fit-out complete, TMDA & business licences in hand, stock ordered"; T3 "store open 3 months, 100 Afya Box members and monthly loss below TSh 16M" | `model.js` `A.seed.milestones` |
| Launch marketing in the seed | flagship 7,000,000 · start small 4,000,000 | `model.js` seed `use` |
| Running marketing after opening | flagship 2,500,000 a month · start small 1,500,000 | `model.js` `opex_month.marketing` |
| Base case, flagship | break-even month 12; year-1 profit −119.7M; members 34 (m1), 113 (m3), 157 (m4), 305 (m7), 593 (m12); month-3 loss −16.6M, month-4 −14.8M | model run, 10 Nov 2026 |
| Base case, start small | break-even month 10; year-1 profit −37.4M; members 23 (m1), 75 (m3), 104 (m4), 389 (m12); month-4 loss −6.1M | model run |
| Year-1 joins and marketing | flagship 826 joins, TSh 30M → ≈ 36,311 per join; start small 543 joins, TSh 18M → ≈ 33,167 | model run (marketing ÷ joins) |
| Monthly churn | 8% | `model.js` `members.monthly_churn` (estimate) |
| Phase 0 gap | research and setup 33,300,000 against a budget of 3,150,000 (gap 30,150,000) | `model.js` `seed.phase0_gap` |
| Investor share | 30% in both options (the start-small inputs copy the flagship's) | `model.js` `ownership` |
| Member box prices, Mama na Mtoto | month 1: 282,500 / 273,500 / 265,000 (1 / 6 / 12 months); recurring: 96,500–127,500; 36-month average 115,972 / 112,486 / 108,833 | `research/R6-mama-na-mtoto.md` §6 |
| Margin floor, Mama na Mtoto | every stage and plan ≥ 0; on the 12-month plan the thinnest is TSh 2,651 a month (months 14–24) at a 78% landed-cost share; it fails if landed cost exceeds about 80% | R6 §6 |
| Mama Mjamzito (per trimester box) | 12-month price 96,500 / 126,500 / 221,000; 12-month margin +7,145 / +8,502 / +33,338 | `research/R6-mama-mjamzito.md` |
| Margin by plan (R3 example, stage b) | 1-month 18.0% · 6-month 15.4% · 12-month 12.5% | `research/R3-pricing.md` §4b |
| Mobile-money collection cost | about TSh 2,700 per TSh 100,000 (estimate, rate card not verified) | `research/R5-payments.md` |
| Pre-opening timeline | company M−6 to M−4.5; TIN and bank to about M−3.4; lease scoring and signing M−4.6 to M−3; fit-out M−3 to opening; store lead from M−2 | `sections/part7.js` lanes (7.1); `sections/part4.js` (4.4) |

**Two facts about the model that matter for this file** (reported here, not changed):
1. **The model starts with zero members.** It does not count founding members converting at opening. Every member figure above comes from walk-in and check-station joins. No conversion rate from deposits to paying members is claimed here; the pre-sale will produce the first real one.
2. **The model is not phased.** It applies the full 17-box service mix from month 1, and it ramps Kazini small-business accounts from month 1 (to 40 by month 12 in the flagship). The phased launch below puts the business kits in year 2. Aligning the model with the phases is an open item (section 8).

---

## 2. The pre-sale terms

### 2a. Choices and reasons

**Deposit: TSh 10,000 (recommended, as proposed in Part J item 1).**
- *Size against the box.* It is 3.7% of the Mama na Mtoto month-1 box on the 6-month plan (273,500) and 7.8–10.4% of a recurring month (96,500–127,500). The whole deposit is credited to the first box, so the member pays nothing extra.
- *Afya Men and Afya Glow* have no R6 list yet. The model's planning prices (`services.packs`) are 50,000 and 78,000 a month. These predate D4 and are not final. On them the deposit is 13–20% of a month, still below one box.
- *Why not lower.* At TSh 5,000 a deposit is close to a "like" and says little about intent. The gate decides TSh 190M of investor money (340M against 150M), so the signal has to mean something.
- *Why not higher.* At TSh 20,000 or more, a mother at a maternity ward or a worker in an office lobby is less likely to pay on the spot. The deposit is collected by mobile money in under a minute (R5). Keeping it at a level people pay without a second thought keeps the 300 reachable in 60 days.
- *Cost to handle.* Collection costs about TSh 270 per deposit (R5 estimate, 2.7%), or about TSh 81,000 for 300. A refund costs about the same again. Afya pays both; they are in the campaign budget.
- *Held, not spent.* 300 × 10,000 = TSh 3,000,000 at most. This cannot fund the build or the Phase 0 gap, and it must not; see section 6c.

**Lifetime founding rate: one plan step up, capped at 9% (recommended).**

| Plan the founding member chooses | Normal saving (D4) | Founding saving | Margin it equals | Example: Mama na Mtoto months 3–6 (shelf 131,631) |
|---|---|---|---|---|
| 1 month | 3% | **6%** | the 6-month margin | 127,500 → **123,500** |
| 6 months (Gold) | 6% | **9%** | the 12-month margin | 123,500 → **120,000** |
| 12 months (Platinum) | 9% | **9%** (the ceiling) | the 12-month margin | 120,000 → 120,000 |

- *Why not "the 12-month rate on any plan".* That was the first example in the brief. It gives a monthly payer 9%, so a founding member gains nothing by prepaying. R5 names the 6- and 12-month prepaid plans as the main defence against churn and the main source of early cash. The step-up keeps a reason to prepay: 9% on 6 months against 6% on monthly.
- *Why not a bigger saving on 12 months.* Anything above 9% breaks D4. On R6's numbers, months 14–24 on the 12-month plan already earn only TSh 2,651 a month at a 78% landed-cost share.
- *Margin test.* With the step-up, every founding price equals a price D4 already allows on a longer plan. Its margin is therefore at least the 12-month margin. R6 shows that margin is ≥ 0 in every Mama na Mtoto stage. R6 shows +7,145 / +8,502 / +33,338 per Mama Mjamzito box. In R3's stage-b example it is 12.5%.
  - *Caveat.* This rests on R3's planning landed-cost share, not on supplier quotes. If landed cost goes above about 80%, the thinnest stage fails on 12 months and on founding 6 months alike. D4's own check then applies: the box is delivered less often or collected in store.
- *What the 12-month founding member gets.* The rate is locked for life. If the member later moves to the monthly plan, they keep 6% instead of dropping to 3%.
- *Cost, as revenue given up (estimate).* On the Mama na Mtoto 36-month averages, the step-up is worth 3,486 a month (monthly plan) or 3,653 (6-month plan) per founding member.
  - If all 300 deposits became paying members and left at the model's 8% a month, that is about 2,371 member-months in year 1, or **about TSh 8.3–8.7M** of revenue given up.
  - If all 300 stayed the whole year, it is at most TSh 13.2M.
  - Neither figure is in the model, which has no founding members (section 1).
- *Afya Men and Afya Glow.* The same rule applies, but the margin test can only be run once their R6 lists exist. The terms say that the founding rate applies "on the price set by Afya's published price rule". They do not promise a TSh figure for a box that is not final.

**Member cap: 300, one place per person.**
- One place per person, checked by phone number and ID number, so that 300 deposits means 300 people. The gate decides TSh 190M of investor money, so the count has to be clean.
- Deposits are taken only by mobile money into the company's own merchant number, so that every deposit appears on a statement. No cash is taken at events.
- Once 300 places are taken, people join a **waitlist without paying**. A place freed by a refund is offered to the next person on the waitlist within 48 hours.
- **The gate equals the cap.** The flagship needs every place filled and held on day 60, so the waitlist is what keeps refunds from sinking the gate.
- **One founding box per place.** The founding rate applies to one active box per founding membership. It moves with the member to any later box, for example from Mama Mjamzito to Mama na Mtoto, or from Mama na Mtoto when the child turns three.

**Gate date: day 60 of the pre-sale, before the lease is signed.**
- D-20 says "before opening". The lease and the fit-out fix the store size, and 7.1 has them starting about three months before opening. So the gate has to be read before the lease is signed, not on opening day.
- Reading it on day 60 meets D-20 (it is before opening) and protects both the investor and the landlord negotiation.
- Founding places that are still open after day 60 (start-small path) stay open until opening day.

**Refund rule.** See the terms table. In short: on request, any time before the first box is paid, in full, within 7 days, to the same wallet, with no fee taken. Members are offered a refund if the store is late or the plan changes. Afya returns the deposit itself if it is still unused 120 days after opening. A deposit is never forfeited.

### 2b. Terms table (English and Kiswahili)

The Kiswahili text is a working draft and needs review by a native-speaking lawyer before it is filed (section 3). Each cell is in one language only (B7).

| # | Term | English | Kiswahili |
|---|---|---|---|
| 1 | What this is | A founding membership of Afya Basics: a reserved membership place, held by a refundable deposit, before the store opens. It is a membership, not a share in the company or an investment. | Uanachama wa mwanzilishi wa Afya Basics: nafasi ya uanachama inayohifadhiwa kwa amana inayorejeshwa, kabla duka halijafunguliwa. Ni uanachama, si hisa katika kampuni wala uwekezaji. |
| 2 | Who can join | The first 300 people. One place per person (one phone number and one ID number). When the 300 places are taken, others can join a waitlist free of charge. | Watu 300 wa kwanza. Nafasi moja kwa kila mtu (namba moja ya simu na namba moja ya kitambulisho). Nafasi 300 zikijaa, wengine wanaweza kujiandikisha kwenye orodha ya kusubiri bila malipo. |
| 3 | Offer period | 60 days, from [start date] to [end date]. | Siku 60, kuanzia [tarehe ya kuanza] hadi [tarehe ya mwisho]. |
| 4 | Deposit | TSh 10,000, paid once, by mobile money to the Afya Basics company merchant number shown on your receipt. No cash. | TSh 10,000, inalipwa mara moja, kwa pesa za simu kwenda namba ya biashara ya kampuni ya Afya Basics iliyoandikwa kwenye risiti yako. Hakuna malipo ya taslimu. |
| 5 | What the deposit does | The full TSh 10,000 is taken off the price of your first box. | TSh 10,000 yote inapunguzwa kwenye bei ya sanduku lako la kwanza. |
| 6 | Your founding saving | You get the saving of the next longer plan. Monthly plan: 6% below Afya's shelf price (instead of 3%). 6-month plan: 9% (instead of 6%). 12-month plan: 9%, the highest saving on any plan. Packing and delivery stay included in the price. | Unapata punguzo la mpango unaofuata ulio mrefu zaidi. Mpango wa mwezi mmoja: 6% chini ya bei ya rafu ya Afya (badala ya 3%). Mpango wa miezi 6: 9% (badala ya 6%). Mpango wa miezi 12: 9%, punguzo la juu kabisa katika mpango wowote. Gharama ya kufunga na kufikisha mzigo inabaki ndani ya bei. |
| 7 | Price example | Mama na Mtoto, months 3–6, shelf value TSh 131,631 a month: founding price TSh 123,500 on the monthly plan and TSh 120,000 on the 6- or 12-month plan (prices of 10 Nov 2026, from Afya's shelf prices). | Mama na Mtoto, miezi 3–6, thamani ya rafu TSh 131,631 kwa mwezi: bei ya mwanzilishi TSh 123,500 kwa mpango wa mwezi mmoja na TSh 120,000 kwa mpango wa miezi 6 au 12 (bei za tarehe 10 Nov 2026, kutoka bei za rafu za Afya). |
| 8 | How long it lasts | For life, as long as your membership continues. It moves with you to any other Afya box (for example when your child turns three). It ends if your membership lapses (neither paid nor formally paused) for more than 60 days in a row. | Maisha yote, ilimradi uanachama wako unaendelea. Unahamia nawe kwenye sanduku jingine lolote la Afya (kwa mfano mtoto wako akifikisha miaka mitatu). Unakoma kama uanachama wako umekatika (haujalipwa wala haujasitishwa rasmi) kwa zaidi ya siku 60 mfululizo. |
| 9 | One box per place | The founding saving applies to one active box per founding membership. | Punguzo la mwanzilishi linahusu sanduku moja linaloendelea kwa kila uanachama wa mwanzilishi. |
| 10 | What it does not cover | The saving applies to the box's core price only. It does not apply to partner-service fees, the "taste of luxury" item, or medicines (medicines are sold by the licensed partner pharmacy, not by Afya). | Punguzo linahusu bei ya msingi ya sanduku tu. Halihusu ada za huduma za washirika, bidhaa ya "ladha ya anasa", wala dawa (dawa zinauzwa na famasia mshirika iliyosajiliwa, si na Afya). |
| 11 | Prices can change | Your saving is a percentage, not a fixed price. Afya's shelf prices are reviewed every quarter. You see the new price before you pay for the next period, and you can stop before paying. | Punguzo lako ni asilimia, si bei isiyobadilika. Bei za rafu za Afya zinapitiwa kila robo mwaka. Unaona bei mpya kabla ya kulipia kipindi kinachofuata, na unaweza kuacha kabla ya kulipa. |
| 12 | Refund before your first box | You can ask for your deposit back at any time before you pay for your first box, without giving a reason, by WhatsApp, SMS, phone or in store. | Unaweza kuomba amana yako irudishwe wakati wowote kabla ya kulipia sanduku lako la kwanza, bila kutoa sababu, kwa WhatsApp, SMS, simu au dukani. |
| 13 | How refunds are paid | The full TSh 10,000, within 7 days of your request, to the same mobile-money number. Afya Basics pays the transfer cost. | TSh 10,000 kamili, ndani ya siku 7 tangu ombi lako, kwenye namba ile ile ya pesa za simu. Afya Basics inalipa gharama ya kutuma. |
| 14 | If opening is late | We tell you the target opening date when you join and every month after. If the store has not opened within 60 days after that date, we write to you and you choose: keep your place, or take a full refund. | Tunakujulisha tarehe lengwa ya kufungua unapojiunga na kila mwezi baadaye. Duka lisipofunguliwa ndani ya siku 60 baada ya tarehe hiyo, tunakuandikia na unachagua: kubaki na nafasi yako, au kurudishiwa amana yote. |
| 15 | If fewer than 300 join | If fewer than 300 places are filled on day 60, the first store opens as a smaller store. We tell you within 7 days. Your founding saving stays the same, and you may ask for a full refund. | Kama nafasi zilizojazwa ni chini ya 300 siku ya 60, duka la kwanza litafunguliwa likiwa dogo zaidi. Tunakujulisha ndani ya siku 7. Punguzo lako la mwanzilishi linabaki vile vile, na unaweza kuomba amana yote irudishwe. |
| 16 | If the store does not open | If Afya Basics decides not to open the store, every deposit is refunded in full within 7 days of that decision, without any request. | Kama Afya Basics itaamua kutofungua duka, kila amana inarudishwa yote ndani ya siku 7 tangu uamuzi huo, bila kuhitaji ombi. |
| 17 | Unused deposits | If you have not started a box 90 days after opening, we contact you. If we do not hear from you within 30 days, we return your deposit to your mobile-money number. A deposit is never kept by Afya. | Kama hujaanza sanduku siku 90 baada ya kufungua, tunawasiliana nawe. Tusiposikia kutoka kwako ndani ya siku 30, tunarudisha amana yako kwenye namba yako ya pesa za simu. Afya haibaki na amana ya mtu kamwe. |
| 18 | Where deposits are kept | In a separate company bank account used only for deposits. They are not spent on building the store or on any other cost until they are credited to a first box or refunded. | Kwenye akaunti ya benki ya kampuni iliyotengwa kwa ajili ya amana tu. Hazitumiki kwa ujenzi wa duka wala gharama nyingine yoyote hadi zihesabiwe kwenye sanduku la kwanza au zirudishwe. |
| 19 | Prepaid plans later | On a 6- or 12-month plan you can cancel at any time. We refund the unused whole months, after re-pricing the months you received at the plan that matches their number. The founding step-up stays in that re-pricing. | Kwenye mpango wa miezi 6 au 12 unaweza kusitisha wakati wowote. Tunarudisha miezi kamili ambayo haijatumika, baada ya kukokotoa upya miezi uliyopokea kwa bei ya mpango unaolingana na idadi yake. Punguzo la ziada la mwanzilishi linabaki katika ukokotoaji huo. |
| 20 | Your data | We use your name, phone and ID number only to run your membership and the founding count, as set out in our privacy notice. We do not sell them. | Tunatumia jina lako, simu na namba ya kitambulisho kuendesha uanachama wako na hesabu ya waanzilishi tu, kama ilivyoelezwa kwenye taarifa yetu ya faragha. Hatuziuzi. |
| 21 | Complaints | Call or WhatsApp [number]; we reply within 3 working days. You may also complain to the Fair Competition Commission. | Piga simu au WhatsApp [namba]; tunajibu ndani ya siku 3 za kazi. Unaweza pia kuwasilisha malalamiko kwa Tume ya Ushindani (FCC). |

Brackets are filled when the dates and the WhatsApp number are fixed.

---

## 3. Consumer-protection check

**What could be opened:** nothing primary. `www.fcc.go.tz`, `fcc.go.tz`, `tanzlii.org`, `wipo.int`, `viwanda.go.tz`, `elibrary.osg.go.tz`, `mof.go.tz`, `parliament.go.tz` and every law-firm site tried were refused by this session's network proxy (10 Nov 2026). Everything below comes from **search snippets, page not opened**. Section numbers follow the 2003 Act as quoted in the snippets. One snippet says the 2002 consolidation (Cap. 285 as at 31 July 2002) numbers the same provisions differently (e.g. bait advertising at 58), so every number must be checked against the current revised edition (Cap. 285 R.E. 2023 is named in one snippet).

| Rule (as found) | Source status | How the terms answer it |
|---|---|---|
| **Standard-form consumer contracts must be registered with the FCC.** Standard Form (Consumer Contracts) Regulations 2014 (GN 305 of 2014, published 29 Aug 2014). File SFC Form No. 1 at least 21 days before the contract is used. The fee is non-refundable, set by the applicant's "capital value", paid every 3 years. One fragment shows TSh 300,000 for the top band (≥ TSh 501M); Afya's band was not found. The FCC reviews within 14 or 21 days (sources disagree). | Snippets: Clyde & Co (Oct 2025), KG Partners, Mondaq, Lexology. Page not opened. | The founding terms are filed with the FCC **during Phase 0**, at least 21 days before day 1 of the pre-sale. The member terms (plans, renewal, pause, cancellation, R5) are filed at the same time. The fee is held at TSh 300,000 in the campaign budget as an upper placeholder (the top band; Afya's real band is lower or unknown). **To confirm with the FCC.** |
| **Indicative list of unfair terms** in the 2014 Regulations. The example given is a provider changing fees or terms "at any time without prior notice". Consumers complain on Form SFC No. 2; the provider has 7 days to reply; appeal to the Fair Competition Tribunal within 28 days. | Snippets: KG Partners. Full list not seen. | Prices change only through the quarterly shelf review, and members see the new price before they pay (term 11). The founding rate cannot be withdrawn while membership continues (term 8). The complaints route names the FCC (term 21). The full unfair-terms list must be checked by the lawyer. |
| **s.23: accepting payment without intending or being able to supply as ordered** (unfair business practice). It bars taking payment where, at the time, the supplier intends not to supply or to supply something materially different. | Snippets: WIPO Lex text; government e-library heading. | This is the biggest risk of any pre-sale: money is taken before the store exists. The answer is that the deposit is a refundable reservation, not a purchase: the store is described as "not yet open" with a target date, deposits are held apart and not spent (term 18), there is a refund on request (12, 13), an offer of a refund on delay (14), an automatic refund if the store does not open (16), and the plan change is disclosed (15). A box is paid for only once the store can supply it. |
| **s.22: bait advertising.** No advertising at a stated price without reasonable grounds to supply at that price for a reasonable period and in reasonable quantities. | Snippet. | The offer states its limit plainly ("first 300", "60 days"). When the cap is reached, the materials say so on the same day, and the waitlist is free. The example price (term 7) is a real D4 price from R6. |
| **s.17: cash price.** A representation about part of a price must also state the cash price. | Snippet. | Every material that mentions "6%" or "9%" also shows a TSh price for a named box and plan (term 7). |
| **s.15 and s.16: misleading or deceptive conduct; false or misleading representations.** | Snippet (headings only; operative text not seen). | (i) "Lifetime" is defined (term 8). (ii) The saving is stated against **Afya's own shelf price**, which R3 shows is the only claim that currently holds. Pre-sale materials never say "below market prices" until the Kariakoo and Shoppers checks (R3 §5) support it. (iii) No retention, health or savings figure appears that is not in a research file. |
| **s.24: harassment and coercion** in supply or in getting payment; **s.25: unconscionable conduct.** | Snippet. | No sign-up during a clinical consultation or straight after a high Afya Check reading; this is already a 5.1 rule ("No product is offered at that point"). Promoters at maternity wards hand out the terms and take no deposit at the bedside. Reminders are limited to the four in R5. Afya pays no clinic per referral (existing 5.1 rule). |
| **Fair Competition (Amendments) Act 2024** (passed 3 Sep 2024): the FCC now receives and decides consumer complaints (formerly the courts), and a new general penalty provision applies to Parts VI–VII (implied conditions in consumer contracts; manufacturers' obligations). | Snippets: Clyde & Co (Nov 2024), The Citizen. | This raises the cost of getting it wrong and makes the FCC the place a member complains (term 21). Part VI (implied conditions) applies to the boxes once sold; the lawyer to confirm what it implies about quality and fitness for the box goods. |
| **Electronic Transactions Act 2015** (Cap. 442), Part VI consumer protection: an online supplier must state its name, legal status, address and contacts, and let the consumer review, correct and withdraw before ordering. If the goods are unavailable: notify within 30 days and refund within 30 days. A late order can be cancelled on 7 days' notice with a refund. A 14-day cancellation right is reported by one firm but not confirmed. | Snippets: Commonwealth trade repository, ICT Policy Africa, FB Attorneys. | Sign-up by WhatsApp or the web shows the company name, BRELA number, address and contacts before payment, with a review-and-confirm step. Afya's refund (7 days) is faster than the 30 days reported. |
| **Not researched here, to put to the lawyer:** (a) whether holding refundable deposits needs anything under banking or payment-systems law (it is a prepayment for a service, held in the company's own account; no claim is made either way); (b) whether health facilities allow any promotion on their premises, and how Tanzania's rules on marketing breast-milk substitutes apply to materials in maternity wards. The boxes carry no formula, bottles or teats (D-19), but the rule's scope was not checked. (c) Personal Data Protection Act registration (PDPC) before IDs are collected; 7.1 already has this step. | Not found / not opened. | Listed as open items 4–6 (section 8). |

**Verdict.** The terms are drafted to meet every rule found. They cannot be called compliant until (1) a Tanzanian lawyer has read the current Act, the 2014 Regulations and the ETA, and (2) the FCC has registered the form.

---

## 4. The pre-sale campaign: cost (estimate)

**Basis.** The campaign runs before the gate, so it is paid only from spending that both store sizes need. It is funded from the seed's existing **Launch marketing** line and capped at the start-small figure of **TSh 4,000,000**. That leaves TSh 3,000,000 of the flagship's 7,000,000 for the opening itself if the gate is met. No model amount changes. The channels are those named in R4 (clinics, maternity wards, offices in Dar es Salaam) plus the WhatsApp and community-talk channels already in 5.1. **No supplier quote exists for any line.** Lines that rest on a model rate say so; the rest are allocations, labelled estimate.

| Line | TSh | Basis |
|---|---|---|
| One pre-sale promoter for the 60 days | 1,989,000 | The model's health-adviser rate (900,000 a month, `staff`) × 2 months × 1.105 on-costs (`staff_oncost`). The founders cover the remaining hours. Model rate, not a quote |
| Printed terms leaflets, founding cards, two pull-up stands | 800,000 | **Estimate** (allocation; no print quote) |
| WhatsApp and social posts, boosted | 500,000 | **Estimate** (allocation; the 5.1 split gives digital the largest share, 30%) |
| Transport to clinics, wards and offices; small venue costs | 211,000 | **Estimate** (allocation; the remainder of the cap) |
| Mobile-money fees: 300 collections and up to 300 refunds | 200,000 | R5 estimate: 2.7% × 10,000 ≈ 270 per transaction, × 600 = 162,000, rounded up |
| FCC registration of the standard-form terms | 300,000 | Snippet: top fee band; Afya's band not found. Upper placeholder |
| **Total** | **4,000,000** | = start-small "Launch marketing" seed line |

- **Per founding member:** 4,000,000 ÷ 300 ≈ **TSh 13,300**. In the model's base case, year-1 marketing per joined member is about TSh 36,300 (flagship) and 33,200 (start small). A deposit is not yet a paying member, so the two are not the same measure, and the comparison is not a claim.
- **The weekly target** is 300 in 60 days, about 35 a week. **Day-30 checkpoint: 150 deposits.** Below 150, the founders apply D-20's "bigger pre-sale" answer in the second month, from inside the same cap. More hours go to the best channel by deposits per day, and offices are added to the ward rounds. The investor is told the same week (risk line in 7.3).
- **Not in this budget:** the revenue given up through the founding rate (section 2a, about TSh 8.3–8.7M in year 1, estimate). It is a lower price, not a cash cost, and it is not in the model.

---

## 5. Roadmap table for section 5.4

Months are counted from opening (M0). The pre-opening months follow 7.1, except where section 6c moves the company lane earlier. Money columns quote existing model or research figures only.

| Phase | When | What happens | What it must show (gate to the next phase) | Money (existing figures) |
|---|---|---|---|---|
| **Phase 0: setup** | Before M−5 | Company, TIN, bank and mobile-money merchant number; FCC registration of the founding and member terms (≥ 21 days before use); research trips (7.1) | Company able to receive and refund deposits; terms registered | Phase 0 costs 33.3M against a budget of 3.15M (gap 30.15M, estimate; see section 6c) |
| **Pre-sale** | M−5 to M−3 (60 days) | Founding-member pre-sale at clinics, maternity wards, offices, WhatsApp; investment agreement signed and tranche 1 paid at its start | **Pre-sale gate (D-20):** ≥ 300 founding deposits held on day 60 → flagship; fewer → start small | Campaign ≈ 4.0M from "Launch marketing" (estimate); deposits ≤ 3.0M, held apart |
| **Build** | M−3 to M0 | Lease signed for the size the gate chose; fit-out; permits; stock; **shop manager (store lead) hired at M−2**; advisers and picker from week −3; riders from week −2 (4.4) | Fit-out done, TMDA/TBS premises and business licences in hand | Tranche 2 on the gate; pre-opening team 9.0M (flagship) / 4.5M (start small) |
| **Phase 1: focus** | M0 to M6 | Three packages, one tier each (Regular), fixed contents, add-ons. Mama na Mtoto (built as two boxes: Mama Mjamzito and Mama na Mtoto, D-12), Afya Men, Afya Glow. Partner services for Mama na Mtoto only. Founding members convert. Products bought already registered locally (D-14) | Tranche-3 milestone (section 6). The first real figures: deposit-to-member conversion, churn by plan, box margin against R6 | Launch compliance 2,301,625 (D-21); base-case members m3 113 / m6 253 (flagship), 75 / 168 (start small) |
| **Phase 2: choice** | M6 to M12 | Tiers (Premium and Luxury "taste of luxury" lines), brand swaps between 4–5 brands with the box locked 12 days before month end (B20), **Afya Siku**, **Afya Kazini** (office box), Afya's own **TBS product registration** (D-14) | Margin holds with swaps; the store reaches break-even (base case: month 12 flagship, month 10 start small) | Own TBS registration ≈ 11.1M (R1 scenario C total, including the 2.3M launch fees; the increment is 20 × 440,000 = 8.8M). After opening, not from the seed (6.3) |
| **Phase 3: reach** | Year 2 | Business and hotel kits (Afya Biashara, with the five trade kits as sizes, D-3; Afya Hoteli; R8); the customer-chosen nutrition shelf (R9); the remaining boxes of B16 in roadmap order; **store 2** with the packing hub. The low-income "Msingi" edition is reviewed (D-4) | Store-2 growth gate (5.4): store 1 profitable 3 months in a row, 150+ Afya Box members with churn at or below plan, check-to-purchase and basket within 10% of the model, daily report running without the founders | New store capex 170M (model `growth.new_store_capex`), from a growth round, not the seed |

The long-term goal stays a multi-store chain (5.4). The founder's reference point is a goal, not a model to copy (B6).

---

## 6. Tranche table for section 6.3

### 6a. Flagship (TSh 340M), with the gate

| Tranche | Amount (model) | Released when | Evidence | Base case |
|---|---|---|---|---|
| 1 · 40% | TSh 136,000,000 | **On signing**, at the start of the 60-day pre-sale. Paid into the company's project account. Until the gate, spending is limited to what both store sizes need (company and licences, launch compliance fees, the pre-sale campaign, hiring preparation, the core stock order), **up to TSh 60,000,000** (the start-small tranche 1). The lease is not signed before the gate. | Signed agreement; monthly statement of the project account | Day 0 |
| 2 · 35% | TSh 119,000,000 | **On the gate**: at least 300 founding-member deposits held on day 60, one per person, counted from the merchant statement and checked by the company's accountant. Then the flagship lease is signed and the fit-out starts | Deposit register and merchant statement; accountant's letter; signed lease | Day 60 (M−3), if the pre-sale reaches 300 |
| 3 · 25% | TSh 85,000,000 | **On store results**: store open 3 months, 100 Afya Box members, and monthly loss below TSh 16M (milestone unchanged from the model) | Three months of store-system reports; member count | Met in month 4 (113 members but a −16.6M loss in month 3; 157 and −14.8M in month 4) |

**If the gate is missed:** the agreement falls back to the start-small option (D-20). Of tranche 1, TSh 60,000,000 is kept as the start-small tranche 1. The unspent TSh 76,000,000 balance goes back to the investor within 30 days. From then on the start-small table applies. The investor's total is then the start-small seed of TSh 150M; no amount is new.

### 6b. Start small (TSh 150M), as the fallback

| Tranche | Amount (model) | Released when | Evidence | Base case |
|---|---|---|---|---|
| 1 · 40% | TSh 60,000,000 | **On signing** (the part of the flagship tranche 1 kept after the fallback) | As above | Day 0 |
| 2 · 35% | TSh 52,500,000 | **On the gate date with fewer than 300 deposits**, provided at least 100 deposits are held (proposal). Then the 100 m² lease is signed. Below 100, the release waits for a joint decision by the investor and founders: extend the pre-sale by 30 days, change the offer, or stop and return the unspent balance | Deposit register; accountant's letter; signed lease | Day 60 (M−3) |
| 3 · 25% | TSh 37,500,000 | **On store results**: store open 3 months, 100 Afya Box members, and monthly loss below TSh 7M (proposal; the model's TSh 16M is never binding for this store, whose deepest base-case loss is 9.4M in month 1) | Three months of store-system reports | Met in month 4 (104 members, −6.1M) |

### 6c. Three settlements this table depends on

- **Timeline.** The pre-sale needs a company that can take and refund money on day 1. The 60 days have to end before the lease is signed (M−3). So the company, TIN, bank and merchant number, and the FCC filing are done in **Phase 0, before M−5**. That is about 1.5 months earlier than the 7.1 lanes show today (incorporation M−6 to M−4.5; TIN and bank to about M−3.4). The opening date does not move.
- **Phase 0 gap (D-8): recommend a founders' bridge.**
  - *Not the pre-sale.* Deposits are refundable and held apart (term 18). Spending them would make refunds depend on the build, which is the s.23 risk. At most they total TSh 3.0M against a TSh 30.15M gap.
  - *Not tranche 1.* None of the seed's use-of-funds lines covers Phase 0. Paying it from tranche 1 would take money from the reserve or another line, which changes an amount.
  - *The bridge.* The founders fund Phase 0 before signing, with every payment receipted in the data room (already the rule in 7.1). Whether the bridge is repaid, converted or treated as the founders' contribution is set in the investment agreement. Repayment from the seed would need a new use-of-funds line, which is not proposed here.
- **Investor share (D-11): recommend setting it per option.** At 30% for TSh 340M, the implied pre-money value is TSh 793.3M (340 ÷ 0.30 − 340). At that same pre-money value, TSh 150M buys 15.9% (150 ÷ 943.3). Keeping 30% in the fallback would hand the same share for less than half the money. The showroom should show the share for the selected option only (B5). The figure is a negotiation, so it needs legal and valuation review; 15.9% is the reference point, not a decided number.

---

## 7. Decided on the founder's behalf

Each item is a proposal until the founder approves it.

1. **Deposit TSh 10,000**, mobile money only (no cash), credited in full to the first box.
2. **Founding rate = one plan step up, capped at 9%**: monthly 6%, 6-month 9%, 12-month 9%. This replaces both examples in the request ("12-month rate on any plan"; "6-month rate on monthly only").
3. **"Lifetime" defined** as continuous membership; it ends after more than 60 days' lapse. It moves to any later box. One founding box per place.
4. **Cap 300, one place per person** (phone and ID number), with a free waitlist that refills places freed by refunds within 48 hours.
5. **Gate read on day 60, before the lease is signed**, as the way to meet D-20's "before opening". Places left open after a missed gate stay open until opening.
6. **Refund rules**: on request until the first box is paid; full TSh 10,000 within 7 days; Afya pays the fee; a refund offer if opening is more than 60 days late; an offer on fallback; automatic if the store does not open; automatic after 90 + 30 days unused. Never forfeited.
7. **Deposits held in a separate company bank account** and never spent before they are credited or refunded.
8. **Prepaid-plan cancellation rule** (answers R5's open point): unused whole months refunded after re-pricing the months taken at the matching plan, with the founding step-up kept.
9. **No sign-ups at the bedside or straight after a high reading**; leaflets only in wards.
10. **Terms and member terms filed with the FCC in Phase 0**, at least 21 days before day 1.
11. **Campaign capped at TSh 4.0M from the "Launch marketing" seed line**, with the line split in section 4 (allocations labelled estimate).
12. **Day-30 checkpoint of 150 deposits.**
13. **Mama na Mtoto in Phase 1 includes both its boxes** (Mama Mjamzito and Mama na Mtoto, D-12).
14. **Phase 1 tier is Regular**; Premium and Luxury lines start in Phase 2.
15. **Tranche 1 pre-gate spending cap of TSh 60M**, and the **76M return** if the gate is missed.
16. **Tranche 2 tied to the gate**; the flagship's old tranche-2 milestone (fit-out done, licences in hand) becomes evidence for tranche 3's start, not a release trigger.
17. **Start-small tranche 2 floor of 100 deposits** with a joint decision below it.
18. **Start-small tranche 3 loss threshold of TSh 7M** (the flagship keeps 16M).
19. **Company, bank and merchant setup moved into Phase 0, before M−5** (about 1.5 months earlier than 7.1).
20. **Phase 0 gap: founders' bridge**, with its treatment set in the investment agreement.
21. **Investor share set per option**, with 15.9% at equal pre-money as the reference point for start small.

---

## 8. Open items

1. **Lawyer review** of the terms against the current Fair Competition Act (R.E. 2023 numbering), the 2014 Standard Form Regulations (including the full unfair-terms list and Afya's fee band) and the Electronic Transactions Act.
2. **FCC**: confirm the filing route, the fee for Afya's capital value and the review time. The site is blocked from this session.
3. **Native Kiswahili review** of the terms table.
4. Whether holding refundable deposits triggers any banking or payment-systems rule (lawyer).
5. Rules on promotion inside health facilities, and the scope of the breast-milk-substitute marketing rules for ward materials (lawyer, and each facility's own permission).
6. PDPC registration before ID numbers are collected (7.1 step).
7. **Model alignment (K4, not done here):**
   - the model starts with zero members, so a founding-member conversion line is needed once a rate exists;
   - the model is not phased: Kazini accounts start in month 1 and the full 17-box service mix applies from month 1;
   - the tranche-3 milestone is the same for both options (section 6b proposes 7M for start small);
   - the start-small milestones copy the flagship's text.
8. **Afya Men and Afya Glow R6 lists**, so that the founding-rate margin test can be run for them before the pre-sale names their prices.
9. **Showroom text to update once approved:**
   - 6.3 and 7.3 say the pre-sale terms are "still to be set";
   - s63 and s73 list the Phase 0 gap as open;
   - 6.3 and 5.4 tranche milestones;
   - the 7.1 lanes;
   - 4.4 names the "store lead" (the brief's "shop manager") — one name to be chosen.
10. **Store-2 gate (150+ members) and tranche 3 (100 members)** stay different on purpose: one releases the seed's last quarter after three months, and the other funds a second store after profit. 6.3 should say so instead of calling them misaligned.

## 9. Hosts needed (refused on 10 Nov 2026)

`www.fcc.go.tz`, `fcc.go.tz`, `tanzlii.org`, `media.tanzlii.org`, `www.wipo.int`, `www.viwanda.go.tz`, `elibrary.osg.go.tz`, `www.mof.go.tz`, `www.parliament.go.tz`, `www.clydeco.com`, `kgpartners.co.tz`, `www.mondaq.com`, `www.lexology.com`, `fbattorneys.co.tz`, `ictpolicyafrica.org`.

## 10. Sources

Legal sources are search snippets; none of these pages was opened.
- Fair Competition Act 2003 (Act No. 8 of 2003), WIPO Lex: https://www.wipo.int/wipolex/en/legislation/details/9060 and text https://www.wipo.int/wipolex/en/text/216550
- Same Act, TanzLII: https://tanzlii.org/akn/tz/act/2003/8/eng@2003-12-31/source.pdf
- Same Act, Ministry of Industry copy: https://www.viwanda.go.tz/uploads/documents/sw-1618818548-fca_no_8-2003.pdf
- Fair Competition Act, Office of the Solicitor General e-library: https://elibrary.osg.go.tz/server/api/core/bitstreams/8b4eb83a-59ee-4b48-b6a8-d419257fca7f/content
- Fair Competition Act Cap. 285 as at 31 July 2002, TanzLII: https://tanzlii.org/akn/tz/act/1994/4/eng@2002-07-31/source
- Clyde & Co, "Tanzania's Requirement to Register Standard Form Consumer Contracts with the Fair Competition Commission" (Oct 2025): https://www.clydeco.com/en/insights/2025/10/tanzania-s-requirement-to-register-standard-form-c
- Clyde & Co, "Notable Amendments to the Fair Competition Act of 2003" (Nov 2024): https://www.clydeco.com/en/insights/2024/11/notable-amendments-to-the-fair-competition-act
- KG Partners, "An insight into the regulations that guide standard form consumer contracts in Tanzania": https://kgpartners.co.tz/?p=630
- Mondaq, "Statutory Registration Of Standard Terms And Conditions": https://www.mondaq.com/contracts-and-commercial-law/411234/statutory-registration-of-standard-terms-and-conditions
- Lexology, "Tanzania's public notice on Standard Form Consumer Contracts": https://www.lexology.com/library/detail.aspx?g=2fb515d8-7a1f-4386-9406-c3e5c5b6f8cc
- The Citizen, "Stakeholders seek stronger rules to make consumer reforms work": https://www.thecitizen.co.tz/tanzania/business/stakeholders-seek-stronger-rules-to-make-consumer-reforms-work-5387482
- Electronic Transactions Act, Commonwealth trade repository: https://tradecca.thecommonwealth.org/policy-repository/electronic-transactions-act-11/
- Electronic Transactions Act, ICT Policy Africa: https://ictpolicyafrica.org/en/document/0gcpmf7udd75?page=6
- FB Attorneys, "Online suppliers of services": https://fbattorneys.co.tz/online-suppliers-of-services/
- Electronic Transactions Act Cap 442 R.E. 2022, Ministry of Finance: https://www.mof.go.tz/uploads/documents/en-1676545044-THE%20ELECTRONIC%20TRANSACTIONS%20ACT,%20CAP%20442%20R.E.%202022.pdf
- Project files: `showroom/model.js` v1.2 (run 10 Nov 2026); `research/R1-compliance.md`, `R3-pricing.md`, `R5-payments.md`, `R6-mama-na-mtoto.md`, `R6-mama-mjamzito.md`; `showroom/sections/part4.js` (4.4), `part5.js` (5.1, 5.4), `part7.js` (7.1), `s63.js` (6.3), `s73.js` (7.3).
