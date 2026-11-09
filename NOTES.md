# NOTES.md — how the original showroom code works

Working notes so the code is not re-read from scratch each phase (brief M6). Source: `showroom-original/`, audited 9 Nov 2026. Detail and line references are in `audit/`.

## Load order (index.html)
model.js → sections/sw-dict.js → part0 → part1 → part2 → part3a → part3b → part3c → range/sum.js → fp.js → range36 → range37 → (inline) → range38 → part4 → range41 → range42 → range43 → part5 → part6 → part7 → 3 inline scripts (boot, 3D heart (dead), brand guard).

Every file registers `window.SECTIONS['sX-Y']={render,init}`. **A later file overrides an earlier one:**

| Section | Rendered by | Overridden code (dead) |
|---|---|---|
| 0.1, 0.2 | part0.js | index.html `story01`, `sec11` fallbacks |
| 1.1–1.5 | part1.js | — |
| 2.1–2.3 | part2.js | — |
| 3.1–3.4 | part3a.js (+ fp.js for the plan) | — |
| 3.5 | part3c.js:4664 | part3b.js:527–1233 (the old engine `window.AFYABOX` is still called by 3.4) |
| 3.6, 3.7, 3.8 | range36/37/38.js | part3b.js:1307–1692 |
| 4.1, 4.2, 4.3 | range41/42/43.js | part4.js:476–910 |
| 4.4, 4.5 | part4.js | — |
| 5.x, 6.x, 7.x | part5/6/7.js | — |

On top of each section, `model.js` injects bilingual "V3MODS" text modules and hides named modules through `V3DROP` (model.js ~570–1401).

## Model
- `window.MODEL`: inputs `A` and `compute()` at model.js:1–186.
- `MODEL.get()` / `MODEL.inputs` always return the 340M option. Only `MODEL.cur` / `isLean` checks follow the switch.
- `MODEL.setOpt` writes localStorage and re-renders. It fires an `afya-opt` event that nothing listens to.
- Box price engines:
  - `window.AFYAMB` (part3c.js:529–560, 3/6/9%, rounds up to 500);
  - `window.AFYABOX` (part3b.js:897, 8% + 0/5/8/12%), used by 3.4.
- Package catalogue `AFYA_PKG` at model.js:188–250.

## Language
- `AFYA_LANG` is 'en' or 'sw'. Sections use `L([en,sw])` or `T(en,sw)`.
- `sw-dict.js` replaces exact text after render (about 7,670 entries and 63 regex rules). model.js:538 has a second inline dictionary.
- 0.1, 1.1 and 2.2 each have their own extra toggles.

## Assets
- Images: `img/…`, with about 146 `/_blob/<hash>` ids for videos (uploaded artifact assets).
- Package films are in `window.AFYA_PACKF` (range43.js:3–20).
- Only `img/boxdoor.webp` is local. Pull others with the Artifact tool (read, path).
- Downloaded copies for inspection are kept in the session scratchpad, not in the repo.
