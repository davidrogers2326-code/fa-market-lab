# How to rebuild a section on the v2 template

Read `../AFYA_SHOWROOM_BRIEF.md` (v1.2): Part B (rules), C (design), D2 (section template). The worked example is `sections/s01.js` (0.1); `sections/s35.js` (3.5) shows tables and interactives.

## File and registration
- One file per section: `sections/sXY.js` (e.g. `s33.js` for 3.3). Wrap everything in an IIFE, with `'use strict'`.
- Register with `window.SECTIONS['s3-3']={render,init,v2:true};`. Add the script tag to `index.html` just before `shell/templates.js`.
- `render(s,p,pv,nx)` returns HTML. `s.no` and `s.title` come from the shell (already in the right language). `init()` wires interactions after render. Listen for `afya:leave` to remove any window listeners.

## Helpers (`window.AB`, from shell/shell.js)
- `AB.T(en,sw)` picks the language. `AB.E(s)` escapes HTML. **Every visible string goes through `T(en,sw)`**, including alt text, aria-labels, table headers and button labels (B8).
- `AB.figsHTML([{v:'TSh 2.3M <span class="ab-est">estimate</span>',l:'label',s:'source line'}])`: up to four gold key figures.
- `AB.openHTML([html,…])`: the "Not yet verified" block. `AB.sourcesHTML([{t,u,chk}])`: the collapsible sources footer (`chk` = date checked). `AB.pagerHTML(pv,nx)`: previous and next. `AB.doorsHTML(ids)`.
- `AB.numHTML(key,value,fmt)` (fmt `tsh` | `tshM` | `int` | `pct`): wrap every number that differs between the two funding options in it. After the funding switch, it counts from the old value to the new one (C6.4). Keys must be unique on the page.
- `AB.isLean()` is true when the 150M option is selected. `window.MODEL.get('base')` and `MODEL.inputs` already follow the funding switch. Never show both options side by side (B5); show the selected one only.

## D2 order (always)
```html
<article class="ab-sec"><div class="ab-wrap">
 <div class="ab-sec-no">3.3</div><h1>title</h1>
 <p class="ab-summary">60–90 words: what the investor learns here</p>
 <figure class="ab-visual">one primary visual: an inline SVG chart/diagram, a table, or one allowed image</figure>
 <div class="ab-body"> … full written depth, <h2> every 150–250 words, <section class="ab-block"> per topic … </div>
 <section class="ab-block"><h2>Key figures</h2>${AB.figsHTML(...)}</section>
 <section class="ab-block"><h2>What this costs</h2> table (if money is involved; must follow the switch) </section>
 ${AB.openHTML([...])}
 ${AB.sourcesHTML([...])}
 ${AB.pagerHTML(pv,nx)}
</div></article>
```
Classes available: `ab-tw` + `table.ab-t` (`td.ab-n` = right-aligned gold number), `ab-notice`, `ab-mute`, `ab-gold`, `ab-est`, `ab-seg` (button group with `aria-pressed`), `ab-btn`, `ab-timeline` (ol), `ab-lineup`, `ab-doors`.

## Content rules
- **Keep the depth.** Read the old section (the legacy file listed in your task) and keep its full explanations and good material. Reorganise, sharpen and correct them with the research. Do not shorten to a summary.
- **Numbers.** Every TSh figure is read from `MODEL`, or from a research file with its source link, or labelled "estimate" beside it. Foreign currency shows the original, the rate and the date (`research/fx.md`: US$1 = TSh 2,642.50, BoT 10 Nov 2026). Never invent a number, source or quote.
- **No process narration.** Never mention Claude, AI, Canva, Weavy, drafts, the brief, "framework", "audit" or "research phase" in visible text. Gaps go in "Not yet verified", in investor language.
- **Medicines** are sold only by the licensed partner pharmacy (B4).
- **Images.** No faces. Use no image, an inline SVG diagram, or only these faceless files: `img/interior.webp`, `img/e1/kiosk.webp`, `img/ck-studio.webp`, `img/ac-studio.webp`, `img/ac-oxi.webp`, `img/e2/sea.webp`, `img/e2/load.webp`, `img/e2/recv.webp`, `img/e2/shelf.webp`, `img/c-port.webp`, `img/c-scan.webp`, `img/c-seal.webp`, `img/c-stock.webp`, `img/range/w_*.webp`, `img/range/z_*.webp`, `img/e3/dieline-photo.webp`, `img/e3/sizes.webp`. Every `<img>` needs `alt` via `T()`, `loading="lazy"`, width and height.
- **Charts** are inline SVG (K2): hairline axes in `var(--line)`, series in `var(--green)` / `var(--gold)`, labels in `var(--mute)`. No gradients, no shadows, no 3D. Each has a one-line caption with its source.
- **Colours:** only the token variables. No hex colours, no glows, no gradient text, no entrance animation. Motion only as a direct response to an action.
- **Kiswahili:** full, natural Kiswahili for every string. Flag any doubtful term in your report.

## Check before you finish
`node --check sections/sXY.js`. The server runs at http://127.0.0.1:8765; start it with `python3 -m http.server 8765` in `showroom/` if it is down.

Then:
- `node tools/shoot.js ../screens/raw s3-3` gives 1280 and 360 px in EN and SW, and reports page errors and horizontal scroll.
- `RM=1 FULL=1 node tools/shoot.js ../screens/raw s3-3` gives the full page.

Look at the screenshots yourself and fix what looks wrong. Then run `node tools/sw-missing.js s3-3`: the result must be 0, or explain each remaining hit.
