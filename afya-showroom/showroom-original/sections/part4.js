/* part4: Part 4 · The engine (sections 4.1–4.5) — built by the part-4 section builder */
(function(){
const M=window.MODEL,I=M.inputs,F=M.fmt;
const tz=n=>'TSh '+Math.round(n).toLocaleString('en-US');
const n0=n=>Math.round(n).toLocaleString('en-US');
const FB="this.onerror=null;this.src='img/interior.webp';this.closest('figure').classList.add('p4fb')";
const img=(src,alt,cap,cls)=>`<figure class="shot ${cls||''}"><img src="${src}" width="1680" height="944" loading="lazy" alt="${esc(alt)}" onerror="${FB}"><figcaption>${cap}</figcaption></figure>`;
const SV=(p,w)=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w||1.6}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
const ICO={
 till:'<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M7 20h10M12 16v4M7 8h4M7 11h7"/>',
 cat:'<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.5"/>',
 stock:'<path d="M3 7l9-4 9 4-9 4z"/><path d="M3 7v10l9 4 9-4V7"/><path d="M12 11v10"/>',
 mem:'<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3 10h18M7 15h4"/>',
 del:'<path d="M3 16V7h11v9"/><path d="M14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
 chk:'<path d="M3 12h4l2-5 4 10 2-5h6"/>',
 ppl:'<circle cx="9" cy="8" r="3.2"/><path d="M3 20c.6-3.4 3-5.4 6-5.4s5.4 2 6 5.4"/><circle cx="17.5" cy="9" r="2.4"/><path d="M16.5 14.4c2.3.2 4 1.9 4.5 4.6"/>',
 money:'<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.6"/><path d="M6 9v.01M18 15v.01"/>',
 dash:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'};
/* ---------- source helpers: each section numbers its own list ---------- */
function srcSet(list){const c=k=>{const i=list.findIndex(x=>x[0]===k);return cref(list[i][2],i+1,list[i][1])};c.list=list.map(x=>[x[1],x[2]]);return c}
/* ---- shared editorial photo components (edp-) · real concept photographs in designed layouts ---- */
addCSS('edp-photo',`
.edp-ph{position:relative;margin:0;border-radius:22px;overflow:hidden;border:1px solid var(--edge2);background:#03100c;box-shadow:0 30px 70px -45px rgba(95,191,143,.35);min-width:0}
.edp-ph img{display:block;width:100%;height:auto;aspect-ratio:16/10;object-fit:cover;transition:transform 1.4s cubic-bezier(.2,.7,.2,1)}
.edp-ph:hover img{transform:scale(1.035)}
.edp-ph figcaption,.edp-bc{position:absolute;left:14px;bottom:12px;z-index:2;font:500 .56rem var(--f-hud);letter-spacing:.16em;text-transform:uppercase;color:#effaf5;background:rgba(2,6,8,.6);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);padding:6px 10px;border-radius:999px;border:1px solid rgba(255,255,255,.08);max-width:calc(100% - 28px)}
.edp-ph.has-ov figcaption{top:12px;bottom:auto}
.edp-ov{position:absolute;left:0;right:0;bottom:0;z-index:1;padding:56px 20px 18px;background:linear-gradient(to top,rgba(2,6,8,.95) 10%,rgba(2,6,8,.6) 55%,rgba(2,6,8,0))}
.edp-ov b{display:block;font:700 1rem/1.25 var(--f-display);color:#fff}
.edp-ov span{display:block;font-size:.84rem;color:#d3e6dd;line-height:1.5;margin-top:5px}
.edp-k{display:block;font:500 .62rem var(--f-hud);letter-spacing:.22em;text-transform:uppercase;color:var(--gold);margin-bottom:10px}
.edp-feat{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);gap:clamp(18px,3.2vw,44px);align-items:center}
.edp-feat.rev>.edp-ph{order:2}
.edp-feat h3,.edp-tile h3,.edp-band h3{font:700 clamp(1.12rem,1.7vw,1.5rem)/1.22 var(--f-display);margin:0 0 12px;color:var(--ink);letter-spacing:-.01em}
.edp-body{min-width:0}
.edp-body p,.edp-band p{color:var(--ink2);font-size:.95rem;line-height:1.68;margin:0 0 12px}
.edp-body p b,.edp-band p b,.edp-tile p b{color:var(--ink)}
.edp-facts{list-style:none;padding:0;margin:16px 0 0;border-top:1px solid var(--edge)}
.edp-facts li{display:flex;justify-content:space-between;align-items:baseline;gap:16px;padding:10px 0;border-bottom:1px solid var(--edge);font-size:.86rem;color:var(--ink2)}
.edp-facts li b{font:500 .86rem var(--f-hud);color:var(--neon2);text-align:right;white-space:nowrap}
.edp-gal{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(0,1fr);grid-template-rows:1fr 1fr;gap:14px}
.edp-gal .edp-ph:first-child{grid-row:1/3}
.edp-gal .edp-ph:first-child img{aspect-ratio:16/11;height:100%}
.edp-gal .edp-ph:not(:first-child){min-height:170px}
.edp-gal .edp-ph:not(:first-child) img{position:absolute;inset:0;height:100%;aspect-ratio:auto}
.edp-tiles{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
.edp-tiles.c2{grid-template-columns:repeat(2,minmax(0,1fr))}
.edp-tiles.c4{grid-template-columns:repeat(4,minmax(0,1fr))}
.edp-tile{border-radius:22px;border:1px solid var(--edge);background:linear-gradient(170deg,var(--panel2),rgba(2,6,8,.7));overflow:hidden;min-width:0;display:flex;flex-direction:column}
.edp-tile .edp-ph{border:0;border-radius:0;box-shadow:none}
.edp-tile .edp-tb{padding:18px 20px 22px}
.edp-tile h3{font-size:1.02rem;margin-bottom:8px}
.edp-tile p{margin:0;color:var(--ink2);font-size:.88rem;line-height:1.62}
.edp-tile small{display:block;margin-top:12px;padding-top:10px;border-top:1px solid var(--edge);font:500 .6rem var(--f-hud);letter-spacing:.14em;text-transform:uppercase;color:var(--gold)}
.edp-band{position:relative;margin:0;border-radius:26px;overflow:hidden;border:1px solid var(--edge2);min-height:440px;display:flex;align-items:flex-end;background:#03100c}
.edp-band>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.edp-band::before{content:'';position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,rgba(2,6,8,.95) 0%,rgba(2,6,8,.8) 36%,rgba(2,6,8,.1) 72%,rgba(2,6,8,0))}
.edp-band .edp-bc{top:14px;bottom:auto;left:auto;right:14px}
.edp-bt{position:relative;z-index:2;max-width:540px;padding:clamp(22px,4vw,46px)}
.edp-pair{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:14px}
@media(max-width:900px){.edp-feat{grid-template-columns:1fr}.edp-feat.rev>.edp-ph{order:0}.edp-tiles,.edp-tiles.c4{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:620px){.edp-gal{grid-template-columns:1fr;grid-template-rows:auto}.edp-gal .edp-ph:first-child{grid-row:auto}.edp-gal .edp-ph:not(:first-child){min-height:0}.edp-gal .edp-ph img,.edp-gal .edp-ph:not(:first-child) img{position:static;aspect-ratio:16/10;height:auto}
 .edp-tiles,.edp-tiles.c2,.edp-tiles.c4,.edp-pair{grid-template-columns:1fr}
 .edp-band{min-height:0;display:block}.edp-band>img{position:static;aspect-ratio:16/10;height:auto}.edp-band::before{display:none}.edp-bt{padding:20px 18px 22px;background:linear-gradient(170deg,var(--panel2),rgba(2,6,8,.85))}
 .edp-ov{padding:40px 14px 12px}.edp-ov span{font-size:.8rem}
 .edp-facts li{flex-wrap:wrap;gap:2px 12px}.edp-facts li b{white-space:normal;text-align:left}}
`);
const PH=(f,alt,cap,o={})=>`<figure class="edp-ph${o.ov?' has-ov':''}${o.cls?' '+o.cls:''}"><img src="img/${f}.webp" width="1680" height="944" loading="lazy" alt="${esc(alt)}"${o.pos?` style="object-position:${o.pos}"`:''}><figcaption>Concept image · ${cap}</figcaption>${o.ov?`<div class="edp-ov"><b>${o.ov[0]}</b><span>${o.ov[1]}</span></div>`:''}</figure>`;
const FEAT=o=>`<div class="edp-feat${o.rev?' rev':''}">${PH(o.f,o.alt,o.cap,{pos:o.pos})}<div class="edp-body">${o.k?`<span class="edp-k">${o.k}</span>`:''}<h3>${o.h}</h3>${o.body}${o.facts?`<ul class="edp-facts">${o.facts.map(x=>`<li><span>${x[0]}</span><b>${x[1]}</b></li>`).join('')}</ul>`:''}</div></div>`;
const GAL=a=>`<div class="edp-gal">${a.map(x=>PH(x.f,x.alt,x.cap,{pos:x.pos,ov:x.ov})).join('')}</div>`;
const TILES=(a,c)=>`<div class="edp-tiles${c?' c'+c:''}">${a.map(x=>`<article class="edp-tile">${PH(x.f,x.alt,x.cap,{pos:x.pos,cls:x.cls})}<div class="edp-tb">${x.k?`<span class="edp-k">${x.k}</span>`:''}<h3>${x.h}</h3><p>${x.p}</p>${x.s?`<small>${x.s}</small>`:''}</div></article>`).join('')}</div>`;
const BAND=o=>`<figure class="edp-band"><img src="img/${o.f}.webp" width="1680" height="944" loading="lazy" alt="${esc(o.alt)}"${o.pos?` style="object-position:${o.pos}"`:''}><figcaption class="edp-bc">Concept image · ${o.cap}</figcaption><div class="edp-bt">${o.k?`<span class="edp-k">${o.k}</span>`:''}<h3>${o.h}</h3>${o.body}</div></figure>`;
/* ---- end edp ---- */
const base=M.get('base');const m12=base.months[11],m11=base.months[10];

const P4CSS=(`
.p4 .s01hero .s01img{background-position:60% 50%}
.p4lead{color:var(--ink2);font-size:1rem;margin:0 0 18px;max-width:72ch}
.p4lead b{color:var(--ink)}
.p4h3{font:800 clamp(1.1rem,2vw,1.4rem)/1.2 var(--f-display);letter-spacing:-.01em;margin:34px 0 12px}
.p4g2{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:16px}
.p4g3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
.p4card{padding:22px;border-radius:20px;border:1px solid var(--edge);background:linear-gradient(170deg,var(--panel2),rgba(2,6,8,.6));min-width:0}
.p4card h4{margin:0;font:700 1rem var(--f-display);color:var(--ink)}
.p4card p,.p4card li{color:var(--ink2);font-size:.9rem;line-height:1.55}
.p4card p{margin:8px 0 0}
.p4card ul{margin:10px 0 0;padding-left:18px}
.p4card .k{display:block;font:500 .6rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--neon);margin-bottom:8px}
.p4card.g{border-color:var(--edge2);background:linear-gradient(150deg,rgba(242,201,107,.10),rgba(2,6,8,.6))}
.p4card.g .k{color:var(--gold)}
.p4panel{border-radius:24px;border:1px solid var(--edge2);background:radial-gradient(600px 300px at 80% 0%,rgba(95,191,143,.08),transparent 60%),linear-gradient(170deg,rgba(10,34,27,.6),rgba(2,6,8,.8));padding:24px;min-width:0}
.p4btn{display:inline-flex;align-items:center;gap:8px;padding:11px 18px;border-radius:12px;border:1px solid var(--edge2);background:rgba(242,201,107,.07);color:var(--gold2);font:600 .88rem var(--f-body);cursor:pointer;transition:background .2s,box-shadow .3s}
.p4btn:hover{background:rgba(242,201,107,.14);box-shadow:0 0 22px -8px var(--gold)}
.p4btn.solid{border-color:transparent;background:linear-gradient(135deg,var(--neon2),var(--neon));color:#021510}
.p4btn svg{width:16px;height:16px}
.p4seg{display:inline-flex;flex-wrap:wrap;gap:6px;padding:5px;border-radius:14px;border:1px solid var(--edge);background:rgba(2,10,8,.5)}
.p4seg button{padding:8px 14px;border-radius:10px;border:0;background:none;color:var(--ink2);font:600 .82rem var(--f-body);cursor:pointer}
.p4seg button.on{background:linear-gradient(135deg,var(--gold2),var(--gold));color:#1a1204}
.p4tbl{width:100%;border-collapse:separate;border-spacing:0;font-size:.88rem}
.p4prose{max-width:860px}
.p4prose p{font-size:1.02rem;line-height:1.75;color:var(--ink2);margin:0 0 16px}
.p4prose p b{color:var(--ink)}
.p4prose h4{font:600 1.15rem/1.3 var(--f-serif,var(--f-display));color:var(--ink);margin:28px 0 10px}
.p4prose .p4sum{font-size:1.2rem;line-height:1.6;color:var(--ink);border-left:3px solid var(--gold2,#d8b25a);padding-left:18px}
.p4ex{margin:18px 0 22px;padding:18px 20px;border:1px solid rgba(216,178,90,.35);border-radius:14px;background:rgba(216,178,90,.06)}
.p4ex>span{display:block;font:600 .68rem/1.4 var(--f-hud,monospace);letter-spacing:.14em;text-transform:uppercase;color:var(--gold2,#d8b25a);margin-bottom:8px}
.p4ex p{margin:0;color:var(--ink)}
.p4prose .p4tblw{margin:14px 0 18px}
.p4prose p.note,.p4vis p.note{font-size:.62rem!important;line-height:1.55!important;letter-spacing:.1em;margin:10px 0 0}
@media (max-width:820px){.p4prose p{font-size:.98rem}}

.p4kv td:last-child{white-space:nowrap;text-align:right}.p4kv td:first-child{width:70%}
.p4glance{grid-template-columns:repeat(3,minmax(0,1fr))!important}@media (max-width:820px){.p4glance{grid-template-columns:repeat(2,minmax(0,1fr))!important}}
.p4 .nums .num b{overflow-wrap:anywhere}
.p4tbl th{text-align:left;font:500 .6rem var(--f-hud);letter-spacing:.18em;text-transform:uppercase;color:var(--gold);padding:10px 12px;border-bottom:1px solid var(--edge2)}
.p4tbl td{padding:12px;border-bottom:1px solid var(--edge);color:var(--ink2);vertical-align:top}
.p4tbl td b{color:var(--ink)}
.p4tbl tr:last-child td{border-bottom:0}
.p4tblw{border-radius:20px;border:1px solid var(--edge);background:var(--panel);overflow-x:auto}
.p4pill{display:inline-block;padding:3px 9px;border-radius:999px;font:500 .62rem var(--f-hud);letter-spacing:.1em;text-transform:uppercase;border:1px solid var(--c,var(--edge));color:var(--c,var(--ink2));white-space:nowrap}
.p4fb{position:relative}
.p4scrollhint{display:none;font:500 .58rem var(--f-hud);letter-spacing:.16em;text-transform:uppercase;color:var(--ink3);margin-top:8px}
.p4fb::before{content:"Concept image in production · placeholder shown";position:absolute;z-index:3;top:14px;right:14px;padding:5px 10px;border-radius:999px;background:rgba(2,8,6,.85);border:1px solid var(--edge2);font:500 .58rem var(--f-hud);letter-spacing:.14em;text-transform:uppercase;color:var(--gold2)}
.p4kv{display:grid;gap:10px}
.p4kv div{display:flex;justify-content:space-between;gap:12px;padding:10px 0;border-bottom:1px solid var(--edge);font-size:.9rem;color:var(--ink2)}
.p4kv div:last-child{border-bottom:0}
.p4kv b{font:500 .95rem var(--f-hud);color:var(--gold2);text-align:right;white-space:nowrap}
.p4kv .tot b{color:var(--neon);font-size:1.1rem}
/* ---- phone mock ---- */
.p4ph{width:270px;max-width:100%;margin:0 auto;border-radius:36px;padding:10px;background:linear-gradient(160deg,#2a332f,#0b0f0d);box-shadow:0 40px 70px -20px rgba(0,0,0,.8),inset 0 0 0 1px rgba(255,255,255,.08)}
.p4ph .scr{position:relative;border-radius:28px;overflow:hidden;background:#f4f7f5;color:#0b2219;min-height:480px;display:flex;flex-direction:column}
.p4ph .bar{display:flex;align-items:center;gap:10px;padding:30px 14px 10px;background:#0f7a52;color:#fff}
.p4ph .bar i{color:#0f7a52;width:30px;height:30px;border-radius:50%;background:#fff;display:grid;place-items:center;flex:0 0 30px}
.p4ph .bar i svg{width:20px;height:20px}
.p4ph .bar b{display:block;font:700 .82rem var(--f-body)}
.p4ph .bar small{display:block;font-size:.64rem;opacity:.8}
.p4wa{flex:1;padding:12px;background:#e9efe9;display:flex;flex-direction:column;gap:8px}
.p4wa .day{align-self:center;padding:3px 10px;border-radius:8px;background:#dfe9e3;font-size:.62rem;color:#4a5f55}
.p4wa .msg{align-self:flex-start;max-width:94%;padding:10px 12px 18px;border-radius:4px 14px 14px 14px;background:#fff;font-size:.72rem;line-height:1.45;position:relative;box-shadow:0 1px 1px rgba(0,0,0,.08)}
.p4wa .msg b{color:#0f7a52}
.p4wa .msg .t{position:absolute;right:9px;bottom:4px;font-size:.56rem;color:#7a8c83}
.p4wa .msg ul{margin:4px 0;padding-left:15px}
.p4wa .msg.me{align-self:flex-end;background:#d9fdd3;border-radius:14px 4px 14px 14px}
/* ---- 4.1 module map ---- */
.p4map{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);gap:22px;align-items:start}
.p4hub{width:100%;height:auto;display:block}
.p4lanes{position:relative;padding-top:22px}
.p4lax{position:relative;height:16px;margin-left:calc(240px + 16px);margin-right:84px;border-bottom:1px solid var(--edge)}
.p4lax span{position:absolute;bottom:4px;transform:translateX(-50%);font:500 .6rem var(--f-hud);color:var(--ink3)}
.p4lane{display:grid;grid-template-columns:240px minmax(0,1fr);gap:16px;align-items:center;padding:14px 0;border-bottom:1px solid var(--edge)}
.p4lh b{display:block;font:700 1rem var(--f-display);color:var(--ink)}.p4lh small{display:block;font-size:.8rem;color:var(--ink2);margin-top:2px}.p4lh em{display:block;font:500 .58rem var(--f-hud);letter-spacing:.1em;text-transform:uppercase;color:var(--ink3);font-style:normal;margin-top:4px}
.p4lbar{display:grid;grid-template-columns:minmax(0,1fr) 68px;gap:16px;align-items:center}
.p4ltrack{display:flex;height:14px;border-radius:2px;background:rgba(255,255,255,.03);overflow:hidden}
.p4ltrack i{display:block;height:100%;opacity:.88;border-right:1px solid rgba(2,6,8,.8)}
.p4ltot{font:500 .95rem var(--f-hud);color:var(--gold2);text-align:right;white-space:nowrap}
.p4lkey{display:flex;flex-wrap:wrap;gap:8px 18px;margin-top:14px;font-size:.76rem;color:var(--ink2)}.p4lkey i{display:inline-block;width:10px;height:10px;border-radius:2px;margin-right:6px;vertical-align:-1px}
@media(max-width:700px){.p4lax{margin-left:0;margin-right:84px}.p4lane{grid-template-columns:1fr;gap:8px}}
.p4hub .sp{stroke:rgba(95,191,143,.22);stroke-width:1.2;stroke-dasharray:3 6;animation:p4dash 18s linear infinite}
@keyframes p4dash{to{stroke-dashoffset:-200}}
.p4hub .nd{cursor:pointer}
.p4hub .nd circle.o{fill:rgba(6,24,19,.92);stroke:rgba(95,191,143,.35);stroke-width:1.3;transition:all .25s}
.p4hub .nd text{fill:var(--ink);font:600 13px var(--f-body);text-anchor:middle;pointer-events:none}
.p4hub .nd text.n{fill:var(--gold);font:500 12px var(--f-hud);letter-spacing:2px}
.p4hub .nd svg{color:var(--neon)}
.p4hub .nd:hover circle.o,.p4hub .nd:focus circle.o{stroke:var(--gold);fill:rgba(20,50,38,.95)}
.p4hub .nd.on circle.o{stroke:var(--gold);stroke-width:2.4;fill:rgba(242,201,107,.16);filter:drop-shadow(0 0 14px rgba(242,201,107,.55))}
.p4hub .sp.on{stroke:var(--gold);stroke-dasharray:none;stroke-width:2;opacity:.9}
.p4hub .core{fill:url(#p4core);stroke:var(--gold);stroke-width:1.2}
.p4det h3{font:800 1.5rem/1.15 var(--f-display);margin:6px 0 4px}
.p4det .hud{display:block}
.p4det dl{margin:16px 0 0;display:grid;gap:12px}
.p4det dt{font:500 .6rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--gold)}
.p4det dd{margin:3px 0 0;color:var(--ink2);font-size:.92rem;line-height:1.55}
.p4det dd b{color:var(--ink)}
.p4det .ex{margin-top:16px;padding:14px 16px;border-radius:14px;border:1px dashed var(--edge2);background:rgba(242,201,107,.05);font-size:.88rem;color:var(--ink2)}
.p4det .ex b{color:var(--gold2)}
.p4mchips{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;margin-top:14px}
.p4mchips button{display:flex;align-items:center;gap:8px;padding:9px 10px;border-radius:11px;border:1px solid var(--edge);background:rgba(2,10,8,.5);color:var(--ink2);font:600 .78rem/1.2 var(--f-body);cursor:pointer;text-align:left;min-width:0}
.p4mchips button em{font:500 .62rem var(--f-hud);font-style:normal;color:var(--gold);letter-spacing:.08em;flex:0 0 auto}
.p4mchips button.on{border-color:var(--gold);color:var(--gold2);background:rgba(242,201,107,.1)}
/* record once */
.p4rec{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:18px;align-items:center}
.p4rec .p4panel svg{width:100%;height:auto;display:block}
.p4rec .fp{fill:none;stroke:rgba(95,191,143,.18);stroke-width:2}
.p4rec .fl{fill:none;stroke:var(--gold2);stroke-width:3;stroke-linecap:round;stroke-dasharray:26 600;stroke-dashoffset:26;opacity:0}
.p4rec .fl.go{animation:p4flow 1.1s cubic-bezier(.5,0,.3,1) forwards}
@keyframes p4flow{0%{opacity:1;stroke-dashoffset:26}90%{opacity:1}100%{opacity:0;stroke-dashoffset:-560}}
.p4rec .bx{fill:rgba(6,24,19,.92);stroke:rgba(95,191,143,.35);stroke-width:1.2;transition:all .3s}
.p4rec .bx.hit{stroke:var(--gold);fill:rgba(242,201,107,.15)}
.p4rec text{fill:var(--ink);font:600 15px var(--f-body)}
.p4rec text.v{fill:var(--gold2);font:500 15px var(--f-hud)}
.p4rec text.s{fill:var(--ink3);font:500 11px var(--f-hud);letter-spacing:1px}
.p4log{margin:14px 0 0;padding:0;list-style:none;display:grid;gap:6px;max-height:170px;overflow:auto}
.p4log li{padding:8px 12px;border-radius:10px;background:rgba(2,10,8,.6);border:1px solid var(--edge);font:500 .74rem/1.4 var(--f-hud);color:var(--ink2)}
.p4log li b{color:var(--gold2);font-weight:500}
.p4log li.po{border-color:var(--edge2);color:var(--gold2)}
.p4rules{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:18px}
.p4rules div{padding:16px 18px;border-radius:16px;border:1px solid var(--edge);background:var(--panel)}
.p4rules b{display:block;font:700 .92rem var(--f-display);color:var(--neon2)}
.p4rules p{margin:5px 0 0;font-size:.85rem;color:var(--ink2);line-height:1.5}
/* dashboard mock */
.p4exp{display:grid;grid-template-columns:300px minmax(0,1fr);gap:22px;align-items:start}
.p4dash{border-radius:22px;overflow:hidden;background:#f6f9f7;color:#0b2219;box-shadow:0 40px 80px -30px rgba(0,0,0,.8),0 0 0 1px rgba(255,255,255,.06)}
.p4dash .top{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px;padding:14px 18px;background:#0f7a52;color:#fff}
.p4dash .top b{font:800 .95rem var(--f-display)}
.p4dash .top small{font:500 .62rem var(--f-hud);letter-spacing:.14em;opacity:.85}
.p4dash .sc{display:inline-flex;gap:4px;padding:3px;border-radius:10px;background:rgba(255,255,255,.15)}
.p4dash .sc button{border:0;background:none;color:#fff;font:600 .72rem var(--f-body);padding:5px 10px;border-radius:8px;cursor:pointer}
.p4dash .sc button.on{background:#fff;color:#0f7a52}
.p4dash .k5{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:1px;background:#dde7e1}
.p4dash .k5 div{background:#fff;padding:14px 12px;min-width:0}
.p4dash .k5 small{display:block;font:600 .62rem var(--f-body);color:#5b6f66;text-transform:uppercase;letter-spacing:.06em}
.p4dash .k5 b{display:block;margin-top:4px;font:600 1.15rem var(--f-hud);color:#0b2219;white-space:nowrap}
.p4dash .k5 span{display:block;font-size:.66rem;color:#0f7a52;margin-top:2px}
.p4dash .k5 span.w{color:#b5651d}
.p4dash .lo{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,1fr);gap:1px;background:#dde7e1}
.p4dash .lo>div{background:#fff;padding:14px 16px;min-width:0}
.p4dash h5{margin:0 0 8px;font:700 .72rem var(--f-body);color:#5b6f66;text-transform:uppercase;letter-spacing:.06em}
.p4dash svg{width:100%;height:auto;display:block}
.p4dash ul{margin:0;padding:0;list-style:none;display:grid;gap:6px;font-size:.76rem}
.p4dash li{display:flex;gap:8px;align-items:flex-start}
.p4dash li i{flex:0 0 8px;height:8px;border-radius:50%;margin-top:5px;background:#e0a33a}
.p4dash li i.r{background:#d2553f}.p4dash li i.g{background:#0f7a52}
/* offline */
.p4off{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:18px;align-items:stretch}
.p4net{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.p4sw{position:relative;width:58px;height:32px;border-radius:999px;border:1px solid var(--edge2);background:rgba(95,191,143,.2);cursor:pointer;flex:0 0 58px}
.p4sw::after{content:"";position:absolute;top:3px;left:29px;width:24px;height:24px;border-radius:50%;background:var(--neon);transition:all .25s;box-shadow:0 0 12px var(--neon)}
.p4sw.off{background:rgba(255,123,107,.15)}
.p4sw.off::after{left:3px;background:#ff9b87;box-shadow:0 0 12px #ff9b87}
.p4q{display:flex;flex-wrap:wrap;gap:6px;min-height:40px;margin-top:14px}
.p4q i{width:30px;height:30px;border-radius:9px;display:grid;place-items:center;font:500 .62rem var(--f-hud);background:rgba(242,201,107,.14);border:1px solid var(--edge2);color:var(--gold2);animation:rise .3s both}
.p4q i.ok{background:rgba(95,191,143,.14);border-color:rgba(95,191,143,.4);color:var(--neon2)}
.p4stat{font:500 .8rem var(--f-hud);color:var(--ink2);margin-top:12px}
.p4stat b{color:var(--gold2);font-weight:500}
/* cost bars */
.p4bars{display:grid;gap:10px;margin-top:6px}
.p4bar{display:grid;grid-template-columns:190px minmax(0,1fr) 110px;align-items:center;gap:12px;font-size:.86rem;color:var(--ink2)}
.p4bar i{display:block;height:12px;border-radius:6px;background:linear-gradient(90deg,var(--neon),var(--neon2));box-shadow:0 0 12px rgba(95,191,143,.35)}
.p4bar b{font:500 .85rem var(--f-hud);color:var(--gold2);text-align:right}
/* ---- 4.2 ---- */
.p4route svg{width:100%;height:auto;display:block}
.p4route .arc{fill:none;stroke:var(--gold);stroke-width:1.6;stroke-dasharray:6 8;animation:p4dash 12s linear infinite}
.p4route .arc.i{stroke:var(--neon)}
.p4route text{fill:var(--ink);font:700 15px var(--f-display)}
.p4route text.s{fill:var(--ink2);font:500 11.5px var(--f-hud);letter-spacing:.5px}
.p4gantt svg{width:100%;height:auto;display:block}
.p4gantt text{font:600 13px var(--f-body);fill:var(--ink)}
.p4gantt text.s{font:500 10.5px var(--f-hud);fill:var(--ink3)}
.p4gantt text.d{font:500 11px var(--f-hud);fill:var(--gold2)}
.p4gsum{display:flex;flex-wrap:wrap;gap:10px 22px;margin-top:12px;font:500 .8rem var(--f-hud);color:var(--ink2)}
.p4gsum b{color:var(--gold2);font-weight:500}
.p4calc{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);gap:16px}
.p4calc .cin label{grid-template-columns:minmax(0,1fr) 130px}
.p4calc select{grid-column:1/-1;width:100%;padding:9px 10px;border-radius:10px;border:1px solid var(--edge2);background:#04140f;color:var(--ink);font:600 .85rem var(--f-body)}
.p4stack{display:flex;height:22px;border-radius:8px;overflow:hidden;margin:8px 0 6px;border:1px solid var(--edge)}
.p4stack i{display:block;height:100%;transition:width .35s}
.p4leg{display:flex;flex-wrap:wrap;gap:6px 14px;font-size:.74rem;color:var(--ink2)}
.p4leg span{display:inline-flex;align-items:center;gap:6px}
.p4leg span::before{content:"";width:9px;height:9px;border-radius:3px;background:var(--c)}
.p4sim{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:16px;align-items:start}
.cin label.p4chk{display:flex;grid-template-columns:none}
.p4sim .p4panel svg{width:100%;height:auto;display:block}
.p4sim .cin label{grid-template-columns:minmax(0,1fr) 90px}
.p4chk{display:flex;align-items:center;gap:8px;margin-top:14px;font-size:.86rem;color:var(--ink2);cursor:pointer}
.p4chk input{accent-color:var(--neon);width:16px;height:16px}
.p4gate{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:0;counter-reset:gt}
.p4gate div{position:relative;padding:22px 16px 18px;border:1px solid var(--edge);background:var(--panel);min-width:0;counter-increment:gt}
.p4gate div+div{border-left:0}
.p4gate div:first-child{border-radius:18px 0 0 18px}.p4gate div:last-child{border-radius:0 18px 18px 0}
.p4gate div::before{content:counter(gt,decimal-leading-zero);display:block;font:500 1.2rem var(--f-hud);color:var(--neon);text-shadow:0 0 14px rgba(95,191,143,.4)}
.p4gate b{display:block;margin-top:6px;font:700 .9rem var(--f-display)}
.p4gate p{margin:6px 0 0;font-size:.8rem;color:var(--ink2);line-height:1.5}
/* ---- 4.3 ---- */
.p4boxflow{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px;position:relative}
.p4bf{position:relative;padding:20px 16px;border-radius:18px;border:1px solid var(--edge);background:linear-gradient(170deg,var(--panel2),rgba(2,6,8,.6));min-width:0}
.p4bf .ic{width:40px;height:40px;border-radius:12px;display:grid;place-items:center;background:rgba(95,191,143,.1);border:1px solid rgba(95,191,143,.3);color:var(--neon)}
.p4bf .ic svg{width:22px;height:22px}
.p4bf .t{display:block;margin-top:0;padding-top:10px;border-top:1px solid rgba(242,201,107,.4);font:500 .62rem var(--f-hud);letter-spacing:.16em;color:var(--gold);text-transform:uppercase}
.p4bf b{display:block;margin-top:4px;font:700 1rem var(--f-display)}
.p4bf p{margin:6px 0 0;font-size:.82rem;color:var(--ink2);line-height:1.5}
.p4bf:not(:last-child)::after{content:"";position:absolute;z-index:2;right:-11px;top:24px;width:10px;height:10px;border-top:1.5px solid var(--gold);border-right:1.5px solid var(--gold);transform:rotate(45deg)}
.p4cal{display:grid;grid-template-columns:repeat(31,minmax(0,1fr));gap:3px;margin-top:18px}
.p4cal i{height:30px;border-radius:5px;background:rgba(95,191,143,.06);border:1px solid var(--edge);display:grid;place-items:center;font:500 .58rem var(--f-hud);color:var(--ink3);font-style:normal}
.p4cal i.lk{background:rgba(242,201,107,.22);border-color:var(--gold);color:var(--gold2)}
.p4cal i.pk{background:rgba(217,181,110,.16);border-color:rgba(217,181,110,.5);color:#bff3ff}
.p4cal i.dl{background:rgba(95,191,143,.28);border-color:var(--neon);color:#fff}
.p4dmap{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);gap:18px;align-items:start}
.p4dmap .p4panel>svg{width:100%;height:auto;display:block}
.p4dmap .z{cursor:pointer;transition:fill .25s,stroke .25s}
.p4dmap .z path{fill:rgba(95,191,143,.035);stroke:rgba(95,191,143,.45);stroke-width:1.1;transition:all .25s}
.p4dmap .z:hover path{fill:rgba(95,191,143,.15)}
.p4dmap .z.on path{fill:rgba(242,201,107,.18);stroke:var(--gold);stroke-width:2}
.p4dmap .z text{fill:var(--ink);font:600 11px var(--f-hud);letter-spacing:1.6px;text-transform:uppercase;pointer-events:none;text-anchor:middle}
.p4dmap .z text.s{fill:var(--ink3);font:500 10px var(--f-hud);letter-spacing:1px}
.p4dmap .coast{fill:none;stroke:rgba(217,181,110,.45);stroke-width:1.5}
.p4dmap .ocean{fill:rgba(155,236,255,.45);font:500 9px var(--f-hud);letter-spacing:3px}
.p4dmap .ring{fill:none;stroke:rgba(207,227,218,.12);stroke-width:1;stroke-dasharray:2 5}
.p4dmap .axis{stroke:rgba(207,227,218,.06);stroke-width:1}
.p4dmap .rk{fill:#7f9c90;font:500 9px var(--f-hud);letter-spacing:1px}
@media(max-width:620px){.p4dmap .z text{font-size:17px;letter-spacing:.5px}.p4dmap .z text.s{font-size:13px}.p4dmap .rk{font-size:14px}.p4dmap .ocean{font-size:14px}.p4dmap .fn{display:none}}
.p4dmap .rt{fill:none;stroke:var(--gold2);stroke-width:1.6;stroke-linecap:round;stroke-dasharray:7 7;animation:p4dash 6s linear infinite;opacity:0;transition:opacity .3s}
.p4dmap .rt.on{opacity:1}
.p4dmap .bike{fill:var(--gold2)}
.p4time{margin-top:16px}
.p4time input{width:100%;accent-color:var(--gold)}
.p4time .row{display:flex;justify-content:space-between;align-items:baseline;gap:10px}
.p4time output{font:500 1.6rem var(--f-hud);color:var(--gold2)}
.p4verdict{margin-top:12px;padding:14px 16px;border-radius:14px;border:1px solid rgba(95,191,143,.35);background:rgba(95,191,143,.08);font-size:.9rem;color:var(--ink)}
.p4verdict.late{border-color:rgba(255,155,135,.4);background:rgba(255,123,107,.07)}
.p4verdict b{color:var(--neon2)}.p4verdict.late b{color:#ffb3a3}
.p4pod{display:grid;grid-template-columns:300px minmax(0,1fr);gap:22px;align-items:center}
.p4podphoto{margin:12px;border-radius:16px;height:150px;background:linear-gradient(160deg,#c9b79a,#8a7558);position:relative;overflow:hidden}
.p4podphoto::before,.p4podphoto::after{display:none!important}
.p4podphoto::before{content:"";position:absolute;left:0;right:0;bottom:0;height:42px;background:#6b5a45}
.p4podphoto::after{content:"";position:absolute;left:50%;bottom:22px;width:92px;height:62px;transform:translateX(-50%);border-radius:6px;background:linear-gradient(160deg,#139463,#0b5f40);box-shadow:0 8px 14px rgba(0,0,0,.35),inset 0 0 0 1px rgba(255,231,168,.4)}
.p4podphoto span{position:absolute;z-index:2;left:8px;top:8px;padding:3px 8px;border-radius:6px;background:rgba(0,0,0,.55);color:#fff;font:500 .56rem var(--f-hud)}
.p4code{display:flex;gap:6px;justify-content:center;margin:6px 0}
.p4code i{width:36px;height:42px;border-radius:10px;background:#fff;border:1.5px solid #0f7a52;display:grid;place-items:center;font:700 1.1rem var(--f-hud);color:#0b2219;font-style:normal}
.p4ok{margin:10px 12px;padding:10px 12px;border-radius:12px;background:#e3f6ec;color:#0f7a52;font:700 .74rem var(--f-body);display:flex;gap:8px;align-items:center}
.p4ok svg{width:18px;height:18px}
.p4fund svg{width:100%;height:auto;display:block}
.p4fund text{fill:var(--ink2);font:500 12px var(--f-hud)}
.p4fund text.b{fill:var(--ink);font:700 13px var(--f-body)}
/* ---- 4.4 ---- */
.p4org svg{width:100%;height:auto;display:block}
.p4org .nb{fill:rgba(6,24,19,.95);stroke:rgba(95,191,143,.4);stroke-width:1.2}
.p4org .nb.g{stroke:var(--gold);fill:rgba(242,201,107,.12)}
.p4org .nb.o{stroke:rgba(169,196,184,.4);stroke-dasharray:4 4;fill:rgba(2,10,8,.6)}
.p4org text{fill:var(--ink);font:700 14px var(--f-body);text-anchor:middle}
.p4org text.s{fill:var(--ink2);font:500 11px var(--f-hud)}
.p4org .ln{fill:none;stroke:var(--edge2);stroke-width:1.4}
.p4day{display:grid;grid-template-columns:minmax(0,1fr);gap:16px}
.p4tl{position:relative;display:grid;grid-template-columns:repeat(10,minmax(0,1fr));gap:6px;padding-top:6px}
.p4tl::before{content:"";position:absolute;left:4%;right:4%;top:27px;height:2px;background:linear-gradient(90deg,var(--neon),var(--gold))}
.p4tl button{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;gap:8px;padding:0;border:0;background:none;color:var(--ink2);cursor:pointer;font:500 .7rem var(--f-hud);min-width:0}
.p4tl button i{width:20px;height:20px;border-radius:50%;margin-top:11px;background:#04140f;border:2px solid var(--neon);transition:all .2s}
.p4tl button.on i{background:var(--gold);border-color:var(--gold2);box-shadow:0 0 0 6px rgba(242,201,107,.2),0 0 16px var(--gold)}
.p4tl button.on{color:var(--gold2)}
.p4tl button span{white-space:nowrap}
.p4tlc{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:16px}
.p4tlc h3{font:800 1.4rem/1.15 var(--f-display);margin:4px 0 8px}
.p4tlc p{color:var(--ink2);margin:0 0 10px}
.p4shift svg{width:100%;height:auto;display:block}
.p4shift text{fill:var(--ink2);font:500 11px var(--f-hud)}
.p4shift text.b{fill:var(--ink);font:600 12px var(--f-body)}
.p4hh{display:grid;grid-template-columns:290px minmax(0,1fr);gap:24px;align-items:center}
.p4hscr{flex:1;padding:14px;display:flex;flex-direction:column;gap:10px}
.p4hscr .ttl{font:800 1.05rem var(--f-display);color:#0b2219}
.p4hscr .sub{font-size:.72rem;color:#5b6f66}
.p4hscr .crd{padding:12px;border-radius:14px;background:#fff;border:1px solid #dde7e1;font-size:.76rem;color:#33463e}
.p4hscr .crd b{display:block;color:#0b2219;font-size:.84rem}
.p4hscr .big{margin-top:auto;padding:16px;border-radius:16px;border:0;background:#0f7a52;color:#fff;font:700 .95rem var(--f-body);cursor:pointer;box-shadow:0 10px 20px -8px rgba(15,122,82,.6)}
.p4hscr .big:active{transform:scale(.98)}
.p4hscr .dots{display:flex;gap:6px;justify-content:center}
.p4hscr .dots i{width:8px;height:8px;border-radius:50%;background:#cfdcd5}
.p4hscr .dots i.on{background:#0f7a52}
.p4hscr .scan{height:110px;border-radius:14px;background:repeating-linear-gradient(90deg,#0b2219 0 3px,transparent 3px 6px,#0b2219 6px 7px,transparent 7px 11px);opacity:.85;position:relative}
.p4hscr .scan::after{content:"";position:absolute;left:0;right:0;top:50%;height:2px;background:#e5484d;box-shadow:0 0 8px #e5484d}
.p4tasks{display:grid;gap:8px}
.p4tasks button{text-align:left;padding:14px 16px;border-radius:14px;border:1px solid var(--edge);background:var(--panel);color:var(--ink2);cursor:pointer;font-size:.86rem}
.p4tasks button b{display:block;color:var(--ink);font:700 .95rem var(--f-display)}
.p4tasks button.on{border-color:var(--gold);background:rgba(242,201,107,.08)}
.p4taps{font:500 .8rem var(--f-hud);color:var(--ink2);margin-top:10px}
.p4taps b{color:var(--gold2);font-weight:500}
.p4sop{display:grid;grid-template-columns:minmax(0,1fr) 220px;gap:18px;align-items:start}
.p4sopl{margin:0;padding:0;list-style:none;display:grid;gap:8px}
.p4sopl li label{display:grid;grid-template-columns:24px minmax(0,1fr) auto;gap:12px;align-items:start;padding:13px 16px;border-radius:14px;border:1px solid var(--edge);background:var(--panel);cursor:pointer;font-size:.9rem;color:var(--ink2);transition:all .2s}
.p4sopl li input{appearance:none;-webkit-appearance:none;width:22px;height:22px;margin:0;border-radius:7px;border:1.5px solid var(--edge2);background:rgba(2,10,8,.6);cursor:pointer;display:grid;place-items:center}
.p4sopl li input:checked{background:var(--neon);border-color:var(--neon)}
.p4sopl li input:checked::after{content:"";width:6px;height:11px;border:solid #021510;border-width:0 2.5px 2.5px 0;transform:rotate(45deg) translate(-1px,-1px)}
.p4sopl li label:has(input:checked){border-color:rgba(95,191,143,.4);background:rgba(95,191,143,.06)}
.p4sopl li label:has(input:checked) span{text-decoration:line-through;text-decoration-color:rgba(95,191,143,.6);color:var(--ink3)}
.p4sopl li b{color:var(--ink);font-weight:700}
.p4sopl li em{font-style:normal;font:500 .62rem var(--f-hud);color:var(--gold);white-space:nowrap;padding-top:3px}
.p4ring{position:relative;width:180px;height:180px;margin:0 auto}
.p4ring svg{width:100%;height:100%;transform:rotate(-90deg)}
.p4ring div{position:absolute;inset:0;display:grid;place-content:center;text-align:center}
.p4ring b{font:500 2rem var(--f-hud);color:var(--gold2)}
.p4ring span{font:500 .6rem var(--f-hud);letter-spacing:.16em;color:var(--ink3);text-transform:uppercase}
.p4train{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px}
.p4train div{position:relative;padding:20px 16px;border-radius:18px;border:1px solid var(--edge);background:var(--panel);min-width:0}
.p4train div::before{content:"";position:absolute;left:16px;right:16px;top:0;height:2px;background:linear-gradient(90deg,var(--neon),transparent)}
.p4train small{font:500 .6rem var(--f-hud);letter-spacing:.18em;color:var(--gold);text-transform:uppercase}
.p4train b{display:block;margin-top:6px;font:700 .95rem var(--f-display)}
.p4train ul{margin:8px 0 0;padding-left:16px;font-size:.8rem;color:var(--ink2);line-height:1.5}
/* ---- 4.5 ---- */
.p4reg{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}
.p4reg div{padding:20px;border-radius:18px;border:1px solid var(--edge);background:linear-gradient(170deg,var(--panel2),rgba(2,6,8,.6));min-width:0;position:relative;overflow:hidden}
.p4reg div::before{content:"";position:absolute;inset:0 0 auto;height:2px;background:linear-gradient(90deg,transparent,var(--c),transparent)}
.p4reg b{display:block;font:700 1.05rem var(--f-display);color:var(--c)}
.p4reg small{display:block;font:500 .6rem var(--f-hud);letter-spacing:.14em;color:var(--ink3);text-transform:uppercase;margin-top:3px}
.p4reg p{margin:10px 0 0;font-size:.85rem;color:var(--ink2);line-height:1.5}
.p4pc{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:18px;align-items:start}
.p4plist{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px}
.p4plist button{display:flex;align-items:center;gap:9px;padding:10px 12px;border-radius:12px;border:1px solid var(--edge);background:rgba(2,10,8,.5);color:var(--ink2);font:600 .8rem/1.25 var(--f-body);cursor:pointer;text-align:left;min-width:0}
.p4plist button i{flex:0 0 9px;height:9px;border-radius:50%;background:var(--c);box-shadow:0 0 8px var(--c)}
.p4plist button.on{border-color:var(--c);color:var(--ink);background:color-mix(in srgb,var(--c) 10%,transparent)}
.p4verd{padding:24px;border-radius:22px;border:1px solid var(--c);background:linear-gradient(160deg,color-mix(in srgb,var(--c) 12%,transparent),rgba(2,6,8,.7))}
.p4verd .st{display:inline-block;padding:5px 12px;border-radius:999px;background:var(--c);color:#06120d;font:700 .72rem var(--f-body)}
.p4verd h3{font:800 1.35rem/1.2 var(--f-display);margin:12px 0 6px}
.p4verd dl{margin:12px 0 0;display:grid;gap:10px}
.p4verd dt{font:500 .6rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--gold)}
.p4verd dd{margin:3px 0 0;color:var(--ink2);font-size:.9rem;line-height:1.5}
.p4lgd{display:flex;flex-wrap:wrap;gap:8px 18px;margin:0 0 14px;font-size:.8rem;color:var(--ink2)}
.p4lgd span{display:inline-flex;gap:7px;align-items:center}
.p4lgd span::before{content:"";width:10px;height:10px;border-radius:50%;background:var(--c)}
.p4fefo{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:18px;align-items:start}
.p4shelf{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}
.p4bt{padding:14px;border-radius:16px;border:1px solid var(--edge);background:var(--panel);min-width:0;transition:all .3s}
.p4bt small{display:block;font:500 .58rem var(--f-hud);letter-spacing:.14em;color:var(--ink3);text-transform:uppercase}
.p4bt b{display:block;margin-top:4px;font:500 1rem var(--f-hud);color:var(--ink)}
.p4bt .q{display:flex;flex-wrap:wrap;gap:3px;margin-top:10px;min-height:14px}
.p4bt .q i{width:10px;height:14px;border-radius:2px;background:var(--neon);opacity:.8}
.p4bt .tg{display:inline-block;margin-top:10px;padding:3px 8px;border-radius:999px;font:500 .58rem var(--f-hud);letter-spacing:.08em;text-transform:uppercase}
.p4bt.a{border-color:rgba(242,201,107,.5)}.p4bt.a .tg{background:rgba(242,201,107,.18);color:var(--gold2)}
.p4bt.r{border-color:rgba(255,123,107,.5)}.p4bt.r .tg{background:rgba(255,123,107,.18);color:#ffb3a3}
.p4bt.ok .tg{background:rgba(95,191,143,.12);color:var(--neon2)}
.p4bt.pick{box-shadow:0 0 0 2px var(--gold),0 0 30px -6px var(--gold);transform:translateY(-3px)}
.p4bt.out{opacity:.4}
.p4recall svg{width:100%;height:auto;display:block}
.p4recall .st{fill:rgba(6,24,19,.95);stroke:rgba(95,191,143,.4);stroke-width:1.2}
.p4recall .st.g{stroke:var(--gold);fill:rgba(242,201,107,.1)}
.p4recall text{fill:var(--ink);font:700 13px var(--f-body);text-anchor:middle}
.p4recall text.s{fill:var(--ink2);font:500 10.5px var(--f-body)}
.p4recall text.n{fill:var(--gold);font:500 10px var(--f-hud)}
.p4recall .ar{fill:none;stroke:var(--gold);stroke-width:1.4}
.p4recall .pulse{fill:var(--gold2);filter:drop-shadow(0 0 6px var(--gold))}
.p4cls{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:14px}
.p4cls div{padding:16px;border-radius:16px;border:1px solid var(--edge);background:var(--panel)}
.p4cls b{font:500 1.6rem var(--f-hud);color:var(--c)}
.p4cls span{display:block;font:700 .85rem var(--f-display);color:var(--ink);margin-top:2px}
.p4cls p{margin:5px 0 0;font-size:.8rem;color:var(--ink2)}
.p4cc{display:grid;grid-template-columns:minmax(0,1fr) 220px;gap:18px;align-items:start}
.p4ccl{display:grid;gap:8px}
.p4ccl label{display:grid;grid-template-columns:22px 110px minmax(0,1fr) auto;gap:12px;align-items:center;padding:12px 14px;border-radius:14px;border:1px solid var(--edge);background:var(--panel);cursor:pointer;font-size:.86rem;color:var(--ink2)}
.p4ccl input{appearance:none;-webkit-appearance:none;width:20px;height:20px;margin:0;border-radius:6px;border:1.5px solid var(--edge2);background:rgba(2,10,8,.6);display:grid;place-items:center;cursor:pointer}
.p4ccl input:checked{background:var(--neon);border-color:var(--neon)}
.p4ccl input:checked::after{content:"";width:5px;height:10px;border:solid #021510;border-width:0 2.5px 2.5px 0;transform:rotate(45deg) translate(-1px,-1px)}
.p4ccl label:has(input:checked){border-color:rgba(95,191,143,.4);background:rgba(95,191,143,.06)}
.p4ccl .w{font:500 .66rem var(--f-hud);letter-spacing:.08em;color:var(--gold);text-transform:uppercase}
.p4ccl b{color:var(--ink)}
.p4ccl small{display:block;font-size:.76rem;color:var(--ink3);margin-top:2px}
@media (max-width:1150px){
 .p4map,.p4rec,.p4exp,.p4off,.p4calc,.p4sim,.p4dmap,.p4pod,.p4hh,.p4tlc,.p4pc,.p4fefo{grid-template-columns:1fr}
 .p4exp .p4ph,.p4pod .p4ph,.p4hh .p4ph{margin:0 auto}
 .p4gate{grid-template-columns:repeat(3,minmax(0,1fr))}.p4gate div{border-radius:0!important;border-left:1px solid var(--edge)!important}
 .p4boxflow{grid-template-columns:repeat(3,minmax(0,1fr))}.p4bf::after{display:none}
 .p4train,.p4reg{grid-template-columns:repeat(2,minmax(0,1fr))}
 .p4rules,.p4g3{grid-template-columns:repeat(2,minmax(0,1fr))}
 .p4dash .k5{grid-template-columns:repeat(3,minmax(0,1fr))}.p4dash .k5 div:last-child{grid-column:span 2}
}
@media (max-width:820px){
 .p4g2,.p4g3,.p4rules,.p4gate,.p4boxflow,.p4train,.p4reg,.p4cls,.p4sop,.p4cc{grid-template-columns:1fr}
 .p4mchips{grid-template-columns:1fr 1fr}
 .p4plist button{font-size:.74rem;padding:9px 10px}
 .p4dash .k5{grid-template-columns:repeat(2,minmax(0,1fr))}.p4dash .lo{grid-template-columns:1fr}
 .p4stk thead{display:none}.p4stk tr{display:block;padding:12px 14px;border-bottom:1px solid var(--edge)}.p4stk td{display:block;border:0!important;padding:3px 0!important}
 .p4bar{grid-template-columns:1fr 90px}.p4bar i{grid-column:1/-1;grid-row:2}
 .p4cal{grid-template-columns:repeat(16,minmax(0,1fr))}
 .p4tl{grid-template-columns:repeat(5,minmax(0,1fr));row-gap:14px}.p4tl::before{display:none}
 .p4shelf{grid-template-columns:repeat(2,minmax(0,1fr))}
 .p4ccl label{grid-template-columns:22px minmax(0,1fr)}.p4ccl .w{grid-column:2}.p4ccl label>span:last-child{grid-column:2}
 .p4tbl{font-size:.8rem}.p4tbl td,.p4tbl th{padding:9px 8px}
 .p4panel{padding:18px}
 .p4ring{width:150px;height:150px}
 .p4dmap .z text{font-size:22px}.p4dmap .z text.s{font-size:15px}
 .p4hub .nd text{font-size:17px}.p4hub .nd text.n{font-size:12px}
 .p4org,.p4recall,.p4shift,.p4route{overflow-x:auto;-webkit-overflow-scrolling:touch}
 .p4org svg{min-width:640px}.p4recall svg{min-width:700px}.p4shift svg{min-width:500px}.p4route svg{min-width:600px}
 .p4scrollhint{display:block!important}
}
`);
const css=()=>addCSS('part4',P4CSS);

/* =====================================================================
   4.1 THE TECH PLATFORM
   ===================================================================== */
const S41=srcSet([
 ['aln','ALN Africa, 2023: Tanzania’s Personal Data Protection Act comes into effect (commencement 1 May 2023)','https://aln.africa/insight/tanzanias-personal-data-protection-act-comes-into-effect/'],
 ['clyde','Clyde & Co, February 2023: Tanzania — The Personal Data Protection Act of 2022 (Commission, registration, sensitive data, penalties)','https://www.clydeco.com/en/insights/2023/02/tanzania-personal-data-protection-act-of-2022'],
 ['dla','DLA Piper Africa, 10 April 2025: Registration with the Personal Data Protection Commission in Tanzania (grace period to 30 April 2025)','https://www.dlapiperafrica.com/en/tanzania/insights/2025/legal-article-a28156-registration-with-the-ersonal-data-protection-commission-in-tanzania-flyer-v2']]);
const MODS=[
 ['till','Till and checkout','Sales','In-store sales, scan-and-go in the app, the self-checkout kiosk and the adviser’s handheld till. Takes mobile money, card and cash, and sends the TRA receipt by SMS or WhatsApp.','Health advisers and customers themselves','Hand-written receipts, cash errors and the queue at a single counter','A grandmother’s granddaughter scans two packs of adult diapers with her phone, approves the mobile-money push and walks out. The receipt is already in her WhatsApp.',['stock','money','mem','dash']],
 ['cat','Catalogue and pricing','One price','One master list of about '+I.product_families+' product families, '+I.brands_per_item+' brands each, with barcodes, photos and a short “best for” card. One price, pushed at once to digital shelf labels, the app and WhatsApp.','Head office (the founders at first)','Price confusion between channels and hand-written tags','A price change for glucose strips is typed once. Within a minute the shelf label, the app and the WhatsApp catalogue all show the same new price.',['till','stock','del']],
 ['stock','Stock and reorder','Live stock','Live stock by shelf and by store. First-expiry-first-out picking, expiry alerts, and purchase orders drafted automatically when an item reaches its reorder point.','Store lead and the buyer','Counting stock by hand, stock-outs and losses from expired items','Blood-pressure monitors fall to the reorder point at 16:10. A draft purchase order sits on the store lead’s handheld; one tap approves it.',['cat','money','dash']],
 ['mem','Members and Afya Boxes','Members','The five membership cards, 1, 6 and 12-month plans, renewals, Afya Choice brand swaps up to 12 days before month end, points and reminders.','Member adviser and the customers','Chasing renewals by phone and building box lists by hand','Amina swaps her baby-wipe brand in the app 14 days before month end. Her box list updates and the packing sheet for her delivery day changes automatically.',['del','money','dash']],
 ['del','Orders and delivery','Orders','App and WhatsApp orders, click and collect, automatic rider assignment by zone, live tracking and proof of delivery with a photo or a code.','Picker and riders','Phone calls to find orders, lost parcels and delivery disputes','A WhatsApp order arrives at 13:20. It lands on the picker’s screen, is packed by 13:45 and joins the 14:00 rider wave to Temeke.',['stock','money','mem']],
 ['chk','Check Station','Afya Check','Readings from the free Afya Check, taken only with consent, sent by SMS, saved to the customer’s record if they wish, with a referral flag when a reading needs a doctor.','Advisers and customers','Paper forms and lost results','A father’s blood pressure reads high twice. The screen flags “see a clinic today” and the adviser explains why. No product is pushed.',['mem','dash']],
 ['ppl','People','People','Shifts, attendance, training records, daily checklists and written procedures (SOPs) on the staff handheld.','Store lead','Rotas on paper and forgotten routines','At 08:30 the opening checklist appears on the handheld. Each item is ticked and time-stamped; nothing depends on memory.',['dash']],
 ['money','Money','Money','Daily cash-up, profit and loss, budget versus actual and the tax calendar, linked to the accounting package.','Founders and the accountant','Spreadsheets rebuilt every month','At 20:30 two people count the cash. The system already knows what the drawer should hold, and any gap is logged with names.',['dash']],
 ['dash','Dashboard and reports','Dashboard','Today’s 5 numbers, alerts, the 21:00 daily report by WhatsApp and the monthly investor pack.','Founders, board and investors','Writing reports by hand','Fahmy is in Greater Noida. At 21:00 the day’s report arrives on his phone: sales, checks, new members, stock risks, issues.',['money','mem','stock']]];
const BUILD=[
 ['Till and checkout','Buy','A proven retail point-of-sale system that issues TRA receipts and works offline. Building our own fiscal till adds risk and no advantage.'],
 ['Catalogue and pricing','Buy + our content','Comes with the POS. Our advantage is the content: “best for” cards, Care Zone tags and the 4–5 brand choices.'],
 ['Stock and reorder','Buy + our rules','POS inventory handles counts. We add our own reorder-point and expiry rules (section 4.2) on top.'],
 ['Members and Afya Boxes','Build','The core of the business: cards, plans, Afya Choice swaps and zero-click renewal. No ready tool does this our way.'],
 ['Orders and delivery','Connect + build','WhatsApp Business and a payment provider for the channels; our own light layer for zones, rider waves and proof of delivery.'],
 ['Check Station','Build','Consent, readings, SMS and referral flags are unique to Afya. The kiosk hardware is bought.'],
 ['People','Buy','A ready rota and checklist app; our SOPs are loaded into it.'],
 ['Money','Buy','A standard accounting package used by Tanzanian accountants, fed automatically from the till.'],
 ['Dashboard and reports','Build','Our 5 numbers, the 21:00 report and the investor pack, built on the data from every module.']];

function sec41(s,p,pv,nx){css();const c=S41;const sys=I.opex_month.systems_software;
 const tx=m12.visitors_day*I.store.conversion*30+I.online.orders_day_m12*30;
 const SPLIT=[['Retail POS + inventory licences',0.30],['Afya platform hosting (members, boxes, dashboard)',0.22],['WhatsApp Business messages and SMS',0.20],['Accounting and rota apps',0.12],['Internet backup line and device management',0.10],['Security, backups and domain',0.06]];
 const ang=i=>(-90+i*40)*Math.PI/180;const R=218,C=300;
 const hub=`<svg class="p4hub" viewBox="0 0 600 600" role="group" aria-label="Module map of the one Afya system"><defs><radialGradient id="p4core"><stop offset="0" stop-color="#139463"/><stop offset="1" stop-color="#06301f"/></radialGradient></defs>
  <circle cx="300" cy="300" r="${R}" fill="none" stroke="rgba(242,201,107,.18)" stroke-width="1"/><circle cx="300" cy="300" r="150" fill="none" stroke="rgba(95,191,143,.08)"/>
  ${MODS.map((m,i)=>{const x=C+R*Math.cos(ang(i)),y=C+R*Math.sin(ang(i));return `<line class="sp" data-i="${i}" x1="300" y1="300" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}"/>`}).join('')}
  <circle class="core" cx="300" cy="300" r="84"/><path d="M291 248h18v20h20v18h-20v20h-18v-20h-20v-18h20z" fill="#fff" opacity=".95"/><text x="300" y="334" text-anchor="middle" fill="#ffe7a8" style="font:600 13px var(--f-body)">One record</text><text x="300" y="352" text-anchor="middle" fill="#a9c4b8" style="font:500 9.5px var(--f-hud);letter-spacing:1.5px">EVERY SCREEN READS IT</text>
  ${MODS.map((m,i)=>{const x=C+R*Math.cos(ang(i)),y=C+R*Math.sin(ang(i));return `<g class="nd" data-i="${i}" tabindex="0" role="button" aria-label="${esc(m[1])}"><circle class="o" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="50"/><text class="n" x="${x.toFixed(1)}" y="${(y-10).toFixed(1)}">0${i+1}</text><path d="M${(x-14).toFixed(1)} ${(y-2).toFixed(1)}h28" stroke="rgba(242,201,107,.45)" stroke-width="1"/><text x="${x.toFixed(1)}" y="${(y+17).toFixed(1)}">${esc(m[2])}</text></g>`}).join('')}
 </svg>`;
 const RN=[['stock','Stock',30,'p4r-st'],['money','Money',105,'p4r-mo'],['mem','Points',180,'p4r-pt'],['dash','Dashboard',255,'p4r-db']];
 const recSvg=`<svg viewBox="0 0 560 330" aria-label="One sale updating four records at once">
  ${RN.map(t=>`<path class="fp" d="M160 165 C 240 165, 240 ${t[2]+25}, 300 ${t[2]+25}"/><path class="fl" data-k="${t[0]}" d="M160 165 C 240 165, 240 ${t[2]+25}, 300 ${t[2]+25}"/>`).join('')}
  <rect class="bx" id="p4r-till" x="6" y="110" width="154" height="110" rx="18"/><text x="22" y="146" style="font-size:18px">Till · sale</text><text class="v" id="p4r-item" x="22" y="174" style="font-size:14px">Tap “Ring up”</text><text class="s" id="p4r-price" x="22" y="198" style="font-size:11px">ILLUSTRATIVE</text>
  ${RN.map(t=>`<rect class="bx" id="${t[3]}-b" x="300" y="${t[2]}" width="254" height="50" rx="12"/><text x="316" y="${t[2]+32}" style="font-size:19px">${t[1]}</text><text class="v" id="${t[3]}" x="540" y="${t[2]+32}" text-anchor="end" style="font-size:18px">–</text>`).join('')}
 </svg>`;
 const sc=['base','best','down'];
 return secShell({s,p,pv,nx,cls:'p4',img:'img/interior.webp',imgAlt:'Concept image of the Afya Basics store interior with the counter, digital menu screens and Afya Check kiosk',
  h1:'One system runs the store,',em:'so three people can.',
  lede:'Till, stock, members, deliveries, the Afya Check, staff, money and reports all live in one connected system. Every action is recorded once, and every screen, reorder and report updates from it, including the founders’ phones in India.',
  mods:[
  ['The problem it solves',`<div class="plain"><span class="modno" style="margin:0 0 12px">In plain words</span><ol>
   <li><b>Most shops run on five separate tools.</b> A till that prints paper, a stock notebook, a cash box, a personal WhatsApp for orders and a spreadsheet at month end. None of them talk to each other.</li>
   <li><b>So people do the joining by hand.</b> Someone counts stock, someone copies sales into a book, someone phones customers to renew. Every copy is a chance for an error, and every hour of copying is an hour not spent helping a customer.</li>
   <li><b>The owner cannot see the business.</b> Fahmy studies in Greater Noida and Cecilia is on the ground; without one system, the founders only learn about a stock-out or a cash gap days later, if at all.</li>
   <li><b>Health products raise the stakes.</b> Expiry dates, batch numbers, readings from the Afya Check and personal health data must be tracked exactly and protected by law. A notebook cannot do that.</li></ol></div>
   <p class="oneline" style="margin-top:34px">Record it <b>once</b>. Let the system <b>remind</b>, not the manager. Keep it to <b>three taps</b>.</p>`],
  ['Our answer · nine modules, one record',`<p class="p4lead">The one-system model has nine modules around one shared record of products, customers, stock and money. <b>Tap a module</b> to see what it does, who uses it, what it removes from people’s work and an example from a normal day. <span class="tagi">Illustrative examples</span></p>
   <div class="p4map"><div>${hub}<div class="p4mchips" id="p4mchips">${MODS.map((m,i)=>`<button type="button" data-i="${i}"><em>0${i+1}</em><span>${esc(m[1])}</span></button>`).join('')}</div></div>
   <div class="p4panel p4det" id="p4det" aria-live="polite"></div></div>`],
  ['Where the system lives · four screens, one record',`<p class="p4lead">“One system” can sound abstract. In the store it is four very physical things: the adviser’s handheld at the counter, the Afya Check kiosk by the door, the tablet on the packing bench and the rider’s phone. Each is a window onto the same record, so what one person does, everyone else sees immediately.</p>
   ${TILES([
    {f:'team',alt:'Concept image of advisers in royal green at the corner counter, one holding a tablet used as a handheld till',cap:'the handheld till at the counter',pos:'50% 32%',k:'Modules 01 · 04 · 07',h:'The counter: till, members, people',p:'The adviser rings up a sale, signs up an Afya Family member and ticks the opening checklist, all on one handheld. A member’s card number brings up the household, the box plan and the last Afya Check, so no customer has to explain themselves twice.',s:'Three taps or fewer per task'},
    {f:'check',alt:'Concept image of the Afya Check kiosk in use with an adviser beside the customer',cap:'the Afya Check kiosk',pos:'72% 40%',k:'Module 06',h:'The kiosk: readings, with consent',p:'Readings are taken only after consent on screen. If the customer agrees, they are saved to their record and sent by SMS; if a referral rule is triggered, the adviser’s handheld shows it at once. The kiosk never sells; it only measures and explains.',s:'Consent before every saved reading'},
    {f:'hub',alt:'Concept image of packing staff using a tablet on the bench to pack closed Afya Boxes',cap:'the tablet on the packing bench',pos:'60% 50%',k:'Modules 03 · 05',h:'The bench: pick lists and stock',p:'Two days before a delivery day, the tablet shows the pick list built from members’ locked choices. Each item is scanned in, which also takes it out of stock, and the sealed box is photographed. If a brand is short, the buyer sees it days before, not at the bench.',s:'Every box scanned and photographed'},
    {f:'rider',alt:'Concept image of an Afya rider on an electric motorbike in a Dar es Salaam street',cap:'the rider’s phone on the road',pos:'55% 45%',k:'Module 05',h:'The road: routes and proof',p:'The rider app lists the drops for the wave, in zone order, with only what the rider needs: name, area, phone and a 4-digit code. A photo and the code close each delivery, and the customer (or a son abroad) is notified in seconds. The rider never sees a health reading.',s:'Access by role'}],2)}`],
  ['Try it · record once','<p class="p4lead">This is the rule that keeps the store simple. <b>One sale updates stock, money, member points and the dashboard at the same moment</b>; no one copies anything. Ring up a few sales and watch what happens when an item reaches its reorder point. <span class="tagi">Illustrative prices</span></p>'+
   `<div class="p4rec"><div class="p4panel" style="padding:16px">${recSvg}</div>
    <div><div style="display:flex;gap:10px;flex-wrap:wrap"><button class="p4btn solid" type="button" id="p4ring">${SV('<path d="M5 12h14M13 6l6 6-6 6"/>',2)} Ring up a sale</button><button class="p4btn" type="button" id="p4reset">Reset</button></div>
    <ul class="p4log" id="p4log"><li>The system is waiting for the first sale of the day.</li></ul></div></div>
   <div class="p4rules">
    <div><b>Record once</b><p>A sale updates stock, money, points and the dashboard together. Nobody re-types a number.</p></div>
    <div><b>Scan, don’t type</b><p>Every product has a barcode; every member has a card or a phone number. Scanning removes spelling and price errors.</p></div>
    <div><b>The system reminds</b><p>Reorders, renewals, expiry, licences and staff training all raise alerts on time, so nothing depends on memory.</p></div>
    <div><b>Three taps or fewer</b><p>Every routine task on the staff handheld takes at most three taps (try it in section 4.4).</p></div>
    <div><b>Works on a phone</b><p>Staff and founders use the same system on a phone, tablet or laptop.</p></div>
    <div><b>Works offline</b><p>The till keeps selling when the internet drops and syncs later (see below).</p></div></div>`,'p4try41'],
  ['The experience · 21:00 report and founder dashboard',`<p class="p4lead">What the founders see. At 21:00 every evening the day’s report arrives by WhatsApp; at any time the dashboard shows <b>today’s 5 numbers</b>. The values below come live from the master model for a normal day in month 12 of year 1. Switch the scenario to see the best and downside cases. ${PE}</p>
   <div class="p4exp"><div class="p4ph"><div class="scr"><div class="bar"><i>${SV('<path d="M10 5h4v5h5v4h-5v5h-4v-5H5v-4h5z" fill="#0f7a52" stroke="none"/>')}</i><div><b>Afya Basics · Daily report</b><small>automated · Store #1</small></div></div>
     <div class="p4wa"><span class="day">TODAY</span><div class="msg" id="p4wa"></div><div class="msg me">Thanks. Approve the strips order.<span class="t">21:04 ✓✓</span></div></div></div></div>
    <div class="p4dash"><div class="top"><div><b>Founder dashboard</b><br><small>STORE #1 · TODAY · MONTH 12</small></div><div class="sc" id="p4sc">${sc.map((k,i)=>`<button type="button" data-k="${k}" class="${i?'':'on'}">${M.inputs.scenarios[k].label}</button>`).join('')}</div></div>
     <div class="k5" id="p4k5"></div>
     <div class="lo"><div><h5>Sales per day · year 1, by month</h5><div id="p4spark"></div></div><div><h5>Alerts</h5><ul id="p4alerts"></ul></div></div></div></div>
   <p class="note">Daily figures = model month-12 values ÷ 30 · alerts are illustrative examples of what the system raises</p>`],
  ['Build versus buy',`<p class="p4lead">We do not write software we can buy. Proven tools run the parts every shop needs; we build only where Afya is different (memberships, Afya Choice, the Check Station, the dashboard), then connect everything into one record.</p>
   <div class="p4tblw"><table class="p4tbl p4stk"><thead><tr><th>Module</th><th>Approach</th><th>Why</th></tr></thead><tbody>${BUILD.map(b=>`<tr><td><b>${b[0]}</b></td><td><span class="p4pill" style="--c:${b[1].startsWith('Build')?'#f2c96b':b[1].startsWith('Connect')?'#d9b56e':'#5fbf8f'}">${b[1]}</span></td><td>${b[2]}</td></tr>`).join('')}</tbody></table></div>
   <p class="note">Specific vendors are chosen after quotations and a test period · no supplier agreement exists yet</p>`],
  ['Works when the internet drops',`<div class="p4off"><div class="p4card"><span class="k">Offline mode</span><h4>The till never stops selling</h4>
    <p>Power cuts and patchy mobile data happen. The till and the handhelds keep a copy of the catalogue, prices and member list on the device. Sales are saved locally with a time stamp and sent to the main record when the connection returns. Card and cash work as normal; mobile money is approved on the customer’s own phone network, so it usually keeps working too.</p>
    <ul><li>A backup 4G router switches on automatically if the fixed line fails.</li><li>The till runs on a small battery pack (UPS) through short power cuts.</li><li>If a payment cannot be confirmed, the sale is held as “pending” and checked at cash-up, never lost.</li></ul></div>
   <div class="p4panel"><div class="p4net"><button type="button" class="p4sw" id="p4sw" aria-label="Toggle internet connection" aria-pressed="true"></button><b id="p4netl" style="font:700 1rem var(--f-display)">Internet: connected</b></div>
    <p class="p4lead" style="margin:12px 0 0;font-size:.9rem">Switch the internet off, ring up some sales, then switch it back on.</p>
    <div style="margin-top:12px"><button type="button" class="p4btn" id="p4offsell">Sell one item</button></div>
    <div class="p4q" id="p4q"></div><div class="p4stat" id="p4offstat">Synced sales today: <b>0</b> · waiting on device: <b>0</b></div></div></div>`],
  ['Data protection and privacy',`<p class="p4lead">Afya Basics holds health readings, purchase histories and family details. In Tanzania that is regulated: the <b>Personal Data Protection Act, 2022</b> came into force on <b>1 May 2023</b> ${c('aln')}. It created the <b>Personal Data Protection Commission (PDPC)</b>, which registers anyone who collects or processes personal data; certificates are valid for five years and renewal is due three months before expiry ${c('clyde')}. The Commission set a registration grace period to 30 April 2025 ${c('dla')}, so registration is mandatory before we collect a single phone number. Health data is <b>sensitive personal data</b> under the Act ${c('clyde')}.</p>
   <div class="p4g3">
    <div class="p4card"><span class="k">1 · Register</span><h4>PDPC registration before launch</h4><p>Afya Basics registers as a data controller, and any processor we use (hosting, messaging) must be compliant too. Renewal is put in the compliance calendar (section 4.5).</p></div>
    <div class="p4card"><span class="k">2 · Consent</span><h4>Ask, explain, record</h4><p>The Afya Check asks for consent on screen before saving any reading. A customer can take a check without saving anything at all. Marketing messages need a separate “yes”.</p></div>
    <div class="p4card"><span class="k">3 · Collect less</span><h4>Only what the service needs</h4><p>A phone number and a delivery address for a box. Readings only if the customer wants a history. No ID copies unless the law asks for them.</p></div>
    <div class="p4card"><span class="k">4 · Family sharing</span><h4>Only with permission</h4><p>A son abroad sees his mother’s Afya Check readings only if she agrees, and she can stop it in one tap. Carer access on the Afya Senior card works the same way.</p></div>
    <div class="p4card"><span class="k">5 · Lock it down</span><h4>Access by role</h4><p>A rider sees an address and a delivery code, never a reading. Advisers see readings only for the customer in front of them. Data is encrypted and backed up daily.</p></div>
    <div class="p4card g"><span class="k">6 · Penalties are real</span><h4>Why this matters to investors</h4><p>For a company, unconsented disclosure can bring a fine of TSh 1 million up to TSh 5 billion, and officers who allowed it can be liable personally ${c('clyde')}. Privacy is a board-level duty, not an IT detail.</p></div></div>
   <p class="note">Where data is stored abroad (cloud hosting), cross-border transfer rules apply · legal review needed before launch</p>`],
  ['The numbers · running costs',`<p class="p4lead">All software, messaging and connectivity sit in one model line: <b>${tz(sys)} a month</b>. ${PE} That is the price of letting a small team run a full store and of the founders seeing it live.</p>
   <div class="nums"><div class="num g"><b>${F.m(sys)}</b><span>systems and software per month</span></div><div class="num"><b>${F.m(sys*12)}</b><span>per year</span></div><div class="num"><b>${F.pct(sys/m12.revenue)}</b><span>of month-12 revenue (base case)</span></div><div class="num"><b>${tz(sys/tx)}</b><span>per customer transaction in month 12</span></div><div class="num"><b>${F.m((I.seed.use.find(x=>/technology/i.test(x[0]))||[0,0])[1])}</b><span>one-off seed budget: technology, Afya Check kiosk and screens</span></div></div>
   <h3 class="p4h3">How the monthly line could split</h3><div class="p4bars">${SPLIT.map(x=>`<div class="p4bar"><span>${x[0]}</span><i style="width:${x[1]/0.30*100}%"></i><b>${tz(sys*x[1])}</b></div>`).join('')}</div>
   <p class="note">Split is illustrative and sums to the model line · confirmed by quotations · payment-provider fees are a % of sales and sit in the price, not here</p>`],
  ['Risks and our answer',`<div class="risks">
   <div class="risk"><span class="q">A system failure stops the store.</span><span class="ar">→</span><span class="a">Offline-capable till, backup 4G router, battery pack, daily backups, and a written paper fallback procedure tested each quarter.</span></div>
   <div class="risk"><span class="q">A data breach exposes health readings.</span><span class="ar">→</span><span class="a">PDPC registration, consent on every saved reading, role-based access, encryption, and a breach plan that informs the Commission and customers quickly.</span></div>
   <div class="risk"><span class="q">Building our own software runs late or over budget.</span><span class="ar">→</span><span class="a">Buy first. We build only memberships, the Check Station and the dashboard, starting simple and adding features after launch.</span></div>
   <div class="risk"><span class="q">Ready-made tools lock us in.</span><span class="ar">→</span><span class="a">We pick tools that let us export our data, and keep the master record of customers and members in our own platform.</span></div></div>`]],
  takeaway:'One connected system is what lets <b>three to six people run a full store</b> and the founders manage it from a phone. Every new store plugs into the same system, so <b>growth adds sales faster than head-office cost</b>.',
  doors:['s4-4','s3-8','s6-1','s7-2'],sources:c.list});}

function init41(){const det=document.getElementById('p4det');if(!det)return;
 const nds=[...document.querySelectorAll('.p4hub .nd')],sps=[...document.querySelectorAll('.p4hub .sp')],chs=[...document.querySelectorAll('#p4mchips button')];
 const nm=k=>MODS.find(m=>m[0]===k)[1];
 const show=i=>{const m=MODS[i];nds.forEach((n,k)=>n.classList.toggle('on',k===i));sps.forEach((n,k)=>n.classList.toggle('on',k===i));chs.forEach((n,k)=>n.classList.toggle('on',k===i));
  det.innerHTML=`<span class="hud">Module 0${i+1} of 09</span><h3>${esc(m[1])}</h3><dl><dt>What it does</dt><dd>${m[3]}</dd><dt>Who uses it</dt><dd><b>${m[4]}</b></dd><dt>What it removes from people’s work</dt><dd>${m[5]}</dd><dt>Feeds into</dt><dd>${m[7].map(nm).join(' · ')}</dd></dl><div class="ex"><b>A normal day · </b>${m[6]}</div>`};
 nds.forEach((n,i)=>{n.onclick=()=>show(i);n.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();show(i)}}});chs.forEach((b,i)=>b.onclick=()=>show(i));show(0);
 // record once
 const ITEMS=[['Upper-arm BP monitor',95000,'bp'],['Glucose test strips ×50',38000,'gs'],['Newborn nappies ×44',32000,'np'],['Upper-arm BP monitor',95000,'bp'],['First-aid kit, home',45000,'fa'],['Upper-arm BP monitor',95000,'bp']];
 let st,k,sales,vat,pts,cnt,poDone;const g=id=>document.getElementById(id),log=g('p4log');
 const reset=()=>{st=8;k=0;sales=0;vat=0;pts=0;cnt=0;poDone=false;g('p4r-st').textContent='8 BP mon.';g('p4r-mo').textContent=tz(0);g('p4r-pt').textContent='0 pts';g('p4r-db').textContent='0 sales';g('p4r-item').textContent='Tap “Ring up”';g('p4r-price').textContent='ILLUSTRATIVE';log.innerHTML='<li>The system is waiting for the first sale of the day. Reorder point for BP monitors: <b>6</b>.</li>'};
 reset();g('p4reset').onclick=reset;
 g('p4ring').onclick=()=>{const it=ITEMS[k%ITEMS.length];k++;g('p4r-item').textContent=it[0].length>15?it[0].slice(0,14)+'…':it[0];g('p4r-price').textContent=tz(it[1]);
  const tb=g('p4r-till');tb.classList.add('hit');setTimeout(()=>tb.classList.remove('hit'),500);
  document.querySelectorAll('.p4rec .fl').forEach((f,i)=>{f.classList.remove('go');void f.getBBox();setTimeout(()=>f.classList.add('go'),i*90)});
  setTimeout(()=>{if(!g('p4r-st'))return;if(it[2]==='bp')st--;sales+=it[1];vat+=it[1]*18/118;pts+=Math.floor(it[1]/1000);cnt++;
   g('p4r-st').textContent=st+' BP mon.';g('p4r-mo').textContent=tz(sales);g('p4r-pt').textContent=pts+' pts';g('p4r-db').textContent=cnt+(cnt>1?' sales':' sale');
   ['p4r-st','p4r-mo','p4r-pt','p4r-db'].forEach(id=>{const b=g(id+'-b');b.classList.add('hit');setTimeout(()=>b.classList.remove('hit'),700)});
   let h=`<li><b>${it[0]}</b> sold for ${tz(it[1])} · VAT ${tz(it[1]*18/118)} recorded · ${Math.floor(it[1]/1000)} points to the member · receipt sent by WhatsApp</li>`;
   if(it[2]==='bp'&&st<=6&&!poDone){poDone=true;h+=`<li class="po">Reorder point reached (${st} left). Purchase order drafted for 24 BP monitors · waiting for the store lead’s one-tap approval</li>`}
   log.insertAdjacentHTML('afterbegin',h)},1000)};
 // dashboard
 const day=key=>{const r=M.get(key),a=r.months[11],b=r.months[10],sc=I.scenarios[key];
  return {sales:a.revenue/30,cust:(a.visitors_day*I.store.conversion)+I.online.orders_day_m12*sc.demand*(0.25+0.75),checks:I.check.checks_day_m12*sc.demand,newm:Math.max(0,(a.members-b.members*(1-I.members.monthly_churn))/30),gm:a.gross_profit/a.revenue,months:r.months,members:a.members,walk:a.walkin/30,box:a.boxes/30,onl:a.online/30}};
 const paint=key=>{const d=day(key);
  g('p4k5').innerHTML=`<div><small>Sales today</small><b>TSh ${(d.sales/1e6).toFixed(2)}M</b><span>gross margin ${F.pct(d.gm)}</span></div><div><small>Customers served</small><b>${n0(d.cust)}</b><span>store + online</span></div><div><small>Afya Checks</small><b>${n0(d.checks)}</b><span>${F.pct(I.check.check_to_purchase)} then buy</span></div><div><small>New members</small><b>${d.newm.toFixed(1)}</b><span>${n0(d.members)} active</span></div><div><small>Stock risks</small><b>3</b><span class="w">below reorder point</span></div>`;
  const vals=d.months.map(m=>m.revenue/30),mx=Math.max(...day('best').months.map(m=>m.revenue/30));const W=320,H=110;
  const pts=vals.map((v,i)=>[10+i*(W-20)/11,H-14-(v/mx)*(H-30)]);
  g('p4spark').innerHTML=`<svg viewBox="0 0 ${W} ${H}"><path d="M${pts.map(p=>p.map(x=>x.toFixed(1)).join(' ')).join(' L')}" fill="none" stroke="#0f7a52" stroke-width="2.4" stroke-linejoin="round"/><path d="M${pts[0][0]} ${H-14} L${pts.map(p=>p.map(x=>x.toFixed(1)).join(' ')).join(' L')} L${pts[11][0]} ${H-14}Z" fill="rgba(15,122,82,.12)"/>${pts.map((p,i)=>`<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${i===11?4:2.2}" fill="${i===11?'#c99a2e':'#0f7a52'}"/>`).join('')}<text x="10" y="${H-1}" style="font:600 9px var(--f-body)" fill="#5b6f66">M1</text><text x="${W-28}" y="${H-1}" style="font:600 9px var(--f-body)" fill="#5b6f66">M12</text><text x="${W-10}" y="${(pts[11][1]-8).toFixed(1)}" text-anchor="end" style="font:700 10px var(--f-hud)" fill="#0b2219">${F.m(vals[11])}</text></svg>`;
  g('p4alerts').innerHTML=`<li><i class="r"></i>Glucose strips (brand B): 4 days of stock left · PO drafted</li><li><i></i>12 boxes still unpacked for tomorrow’s Kinondoni round</li><li><i></i>Batch of baby lotion expires in 58 days · move to front</li><li><i class="g"></i>Cash-up matched to the shilling</li>`;
  g('p4wa').innerHTML=`<b>Afya Basics · Store #1 · 21:00</b><br>Here is today’s report:<ul><li>Sales: <b>${tz(d.sales)}</b> (store ${F.m(d.walk)}, boxes ${F.m(d.box)}, online ${F.m(d.onl)})</li><li>Customers served: <b>${n0(d.cust)}</b></li><li>Afya Checks: <b>${n0(d.checks)}</b> · 2 referred to a clinic</li><li>New members: <b>${Math.round(d.newm)}</b> · active ${n0(d.members)}</li><li>Stock risks: <b>3</b> items below reorder point</li><li>Issues: rider 2 late on one Ubungo drop (traffic)</li></ul>Reply 1 to approve open purchase orders.<span class="t">21:00</span>`};
 const sb=[...document.querySelectorAll('#p4sc button')];sb.forEach(b=>b.onclick=()=>{sb.forEach(x=>x.classList.toggle('on',x===b));paint(b.dataset.k)});paint('base');
 // offline
 let on=true,synced=0,wait=0;const sw=g('p4sw'),q=g('p4q');
 const stat=()=>{g('p4offstat').innerHTML=`Synced sales today: <b>${synced}</b> · waiting on device: <b>${wait}</b>`;g('p4netl').textContent=on?'Internet: connected':'Internet: down · selling offline';sw.classList.toggle('off',!on);sw.setAttribute('aria-pressed',String(on))};
 sw.onclick=()=>{on=!on;if(on&&wait){const items=[...q.querySelectorAll('i:not(.ok)')];items.forEach((it,i)=>setTimeout(()=>{it.classList.add('ok');it.textContent='✓';wait--;synced++;stat()},180*(i+1)))}stat()};
 g('p4offsell').onclick=()=>{if(q.children.length>=24)q.innerHTML='';const i=document.createElement('i');if(on){i.className='ok';i.textContent='✓';synced++}else{i.textContent='S'+(wait+1);wait++}q.appendChild(i);stat()};stat()}

/* =====================================================================
   4.2 SOURCING AND SUPPLY
   ===================================================================== */
const S42=srcSet([
 ['tmdaimp','TMDA: Import and export control of medicines (permit 6 weeks before loading, 7-day processing, shelf-life rules, who may import)','https://www.tmda.go.tz/pages/import-and-export-control'],
 ['tmdadev','TMDA: Import and export control of medical devices (premises registration, permit, shelf-life rules)','https://www.tmda.go.tz/pages/import-and-export-control-of-medical-devices'],
 ['tra','Tanzania Revenue Authority: Taxes and Duties at a Glance 2025/2026 (import duty bands, Railway Development Levy 2% of CIF, Customs Processing Fee 0.6% of FOB)','https://www.tra.go.tz/images/uploads/pages/TAXES_AND_DUTIES_AT_A_GLANCE_2025_2026.pdf'],
 ['vat','Tanzania Revenue Authority: VAT rate structure (18% on taxable supplies and imports, Mainland Tanzania)','https://tra.go.tz/index.php/value-added-tax-vat/99-rate-structure'],
 ['ship','Welltrans Logistics: Shipping from China to Tanzania — sea transit times to Dar es Salaam (about 22–45 days by origin port)','https://welltrans-logistics.com/?p=2695'],
 ['omc','OMC Medical: Tanzania medical device registration (Classes A–D, 90/240-day review, local representative, 5-year licence)','https://omcmedical.com/tanzania'],
 ['tbs','News Central, 30 August 2019: Tanzania shifts cosmetics regulation to the standards bureau (TBS)','https://newscentraltv.com/?p=20889'],
 ['who','WHO news release, 28 November 2017: 1 in 10 medical products in developing countries is substandard or falsified','https://www.who.int/news/item/28-11-2017-1-in-10-medical-products-in-developing-countries-is-substandard-or-falsified'],
 ['fee','TFDA (now TMDA) fee schedule effective 1 October 2011: annual dealer’s permit for medical devices, retail distributor TSh 60,000','https://pharmexcil.com/docs/DRProcedures/TANZANIA/Ifeestanzania_tanzania.pdf'],
 ['pdpc','Afriwise: initial compliance with Tanzania’s Personal Data Protection Act (registration TSh 100,000 for small businesses, renewal TSh 50,000, valid five years)','https://www.afriwise.com/blog/regulatory-and-compliance-update-a-guide-to-initial-compliance-with-tanzanias-data-protection-act'],
 ['ret','Pure Global, 2026: TMDA 2027 retention fees under GN No. 686 of 2021 (USD 200 registered imported device; USD 50 notified Class A)','https://www.pureglobal.com/news/tanzania-tmda-2027-retention-fee-deadlines'],
 ['rsm','RSM Tanzania: Compliance when operating a company in Tanzania (TIN within 15 days, VAT threshold, business licence, OSHA, WCF within 30 days, fire certificate)','https://www.rsm.global/tanzania/insights/consulting-insights/compliance-when-operating-company-tanzania']]);
const LEG={china:[['Order & deposit','Purchase order signed, deposit paid',0,3,'#b5dfc6'],['Production','Factory makes the batch',3,33,'#5fbf8f'],['TMDA import permit','Applied ≥ 6 weeks before loading; processed in about 7 days',3,10,'#c9b8ff'],['Pre-shipment check','Inspection, samples, documents',33,37,'#f2c96b'],['Sea freight','Shenzhen or Shanghai to Dar es Salaam',37,77,'#d9b56e'],['Port & clearing','TRA declaration, TMDA/TBS checks, taxes paid',77,85,'#ffb36b'],['To warehouse','Truck to the Afya store and hub',85,87,'#b5dfc6'],['Receive & shelve','Count, batch, expiry, barcode',87,89,'#5fbf8f']],
 india:[['Order & deposit','Purchase order signed, deposit paid',0,3,'#b5dfc6'],['Production','Factory makes the batch',3,23,'#5fbf8f'],['TMDA import permit','Applied ≥ 6 weeks before loading; processed in about 7 days',3,10,'#c9b8ff'],['Pre-shipment check','Inspection, samples, documents',23,26,'#f2c96b'],['Sea freight','Nhava Sheva or Mundra to Dar es Salaam',26,46,'#d9b56e'],['Port & clearing','TRA declaration, TMDA/TBS checks, taxes paid',46,54,'#ffb36b'],['To warehouse','Truck to the Afya store and hub',54,56,'#b5dfc6'],['Receive & shelve','Count, batch, expiry, barcode',56,58,'#5fbf8f']]};
function sec42(s,p,pv,nx){css();const c=S42;const gm=I.store.retail_gm;const stock=I.seed.use[1][1];
 const cogsDay=(m12.revenue-m12.gross_profit)/30;const cover=stock/cogsDay;
 const seg=L=>{const d=n=>{const r=L.find(x=>x[0]===n);return r[3]-r[2]};const tot=L[L.length-1][3];const prod=d('Production'),sea=d('Sea freight'),port=d('Port & clearing');return {tot,parts:[['Order, production &amp; checks',tot-sea-port-L.slice(-2).reduce((a,x)=>a+x[3]-x[2],0),'#5fbf8f'],['Sea freight',sea,'#d9b56e'],['Port &amp; clearing',port,'#ffb36b'],['Truck &amp; shelving',L.slice(-2).reduce((a,x)=>a+x[3]-x[2],0),'#c9b8ff']]}};
 const LANES=[['China','Devices · hygiene · packaging','Shenzhen / Shanghai → Dar es Salaam',seg(LEG.china)],['India','Diagnostics · dressings · generics*','Nhava Sheva / Mundra → Dar es Salaam',seg(LEG.india)],['Local wholesaler','Fast movers · emergency back-up','Licensed Tanzanian importer → store',{tot:7,parts:[['Order to delivery',7,'#b5dfc6']]}]];
 const MX=95;
 const route=`<div class="p4lanes" role="img" aria-label="Order-to-shelf days by sourcing lane">
  <div class="p4lax">${[0,15,30,45,60,75,90].map(v=>`<span style="left:${v/MX*100}%">${v}</span>`).join('')}</div>
  ${LANES.map(l=>`<div class="p4lane"><div class="p4lh"><b>${l[0]}</b><small>${l[1]}</small><em>${l[2]}</em></div><div class="p4lbar"><div class="p4ltrack">${l[3].parts.map(p=>`<i style="width:${p[1]/MX*100}%;background:${p[2]}" title="${p[0]}: ${p[1]} days"></i>`).join('')}</div><span class="p4ltot">${l[3].tot} days</span></div></div>`).join('')}
  <div class="p4lkey">${[['Order, production &amp; checks','#5fbf8f'],['Sea freight','#d9b56e'],['Port &amp; clearing','#ffb36b'],['Truck &amp; shelving','#c9b8ff'],['Local order to delivery','#b5dfc6']].map(k=>`<span><i style="background:${k[1]}"></i>${k[0]}</span>`).join('')}</div></div>`;
 return secShell({s,p,pv,nx,cls:'p4',img:'img/hub.webp),url(img/interior.webp',imgAlt:'Concept image of the Afya packing hub with staff and closed green Afya boxes',
  h1:'Registered products, bought well,',em:'on the shelf before they run out.',
  lede:'Most of the range is made in China and India. We buy from checked factories and licensed Tanzanian importers, bring goods in legally with TMDA and TBS approval, know the true landed cost of every item before we price it, and reorder automatically before a shelf goes empty.',
  mods:[
  ['The problem it solves',`<div class="plain"><span class="modno" style="margin:0 0 12px">In plain words</span><ol>
   <li><b>Fakes are a real danger.</b> WHO estimates that 1 in 10 medical products in low- and middle-income countries is substandard or falsified ${c('who')}. A shop that buys whatever is cheapest passes that risk to the family.</li>
   <li><b>Imports are slow and full of rules.</b> Medicines and devices need a TMDA import permit, applied for at least six weeks before loading ${c('tmdaimp')}. A sea shipment from China alone takes about 22 to 45 days ${c('ship')}.</li>
   <li><b>Many shops do not know their true cost.</b> They price from the factory price and forget freight, duty, levies, clearing and transport. The margin they think they make is not the margin they get.</li>
   <li><b>Stock-outs lose customers.</b> When glucose strips run out, the customer goes elsewhere, and may not come back. With 60–90 days between order and shelf, reordering late is not a small mistake.</li></ol></div>`],
  ['Our answer · two sourcing hubs, one rulebook',`<p class="p4lead">Afya Basics sources from two regions and follows one rule: <b>registered, checked, traceable or not on our shelf</b>. China supplies most devices (blood-pressure monitors, thermometers, nebulisers), hygiene products and our own packaging. India supplies diagnostics, dressings and, through licensed channels only, generic medicines.</p>
   <div class="p4panel" style="padding:clamp(16px,2.4vw,26px)"><h3 class="p4h3" style="margin:0 0 4px">Order-to-shelf time by lane</h3><p class="note" style="margin:0 0 16px">Days from a signed purchase order to a product on the Afya shelf · planning estimates built from the import timeline below</p>${route}</div>
   <div style="margin-top:16px">${TILES([
    {f:'prod-heart',alt:'Concept image of devices such as blood-pressure monitors, a glucose meter and a pill organiser',cap:'devices · mostly from China',pos:'70% 30%',k:'China · devices',h:'Monitors, meters, thermometers',p:'China makes most of the world’s home medical devices at every price point. Afya buys only models that are clinically validated and registered with TMDA, and tests samples against a clinic reference before the first order. A device is a long-life purchase, so reliability matters more than the last shilling.',s:'Sea about 22–45 days'},
    {f:'prod-care',alt:'Concept image of personal care and hygiene products',cap:'hygiene and personal care',pos:'50% 50%',k:'China and India · hygiene',h:'Pads, wipes, skin and oral care',p:'High-volume, lower-value goods where the landed cost decides the margin. These are the lines that fill monthly boxes, so the buyer orders against known demand from member locks and keeps a local distributor as a second source.',s:'Volume lines · two suppliers'},
    {f:'prod-firstaid',alt:'Concept image of first-aid and wound care supplies: bandages, dressings, gauze and cold packs',cap:'dressings · often from India',pos:'50% 50%',k:'India · dressings &amp; diagnostics',h:'Dressings, gauze, test kits',p:'India is a strong source of sterile dressings, diagnostics and, through licensed channels only, generic medicines. Medicines are not imported by Afya at launch; they come from licensed Tanzanian wholesalers where the store’s permit allows (section 4.5).',s:'Licensed channels only'}])}</div>
   <div class="p4g3" style="margin-top:16px">
    <div class="p4card"><span class="k">Phase 1 · launch</span><h4>Buy locally first</h4><p>TMDA allows only registered wholesalers, manufacturers and a few other groups to import medicines ${c('tmdaimp')}. At launch we buy every regulated item from <b>licensed Tanzanian importers and wholesalers</b>, so each pack is already registered and cleared.</p></div>
    <div class="p4card"><span class="k">Phase 2 · from store 2</span><h4>Import directly</h4><p>Once volumes justify it, the packing hub is registered with TMDA as an importing premises (registration comes before any permit ${c('tmdadev')}). Devices and non-medicine goods then come straight from the factory, which lifts our margin.</p></div>
    <div class="p4card g"><span class="k">Always</span><h4>Two suppliers per key item</h4><p>Every fast-moving item has a second approved supplier, so one late container never empties a shelf. The 4–5 brands per item already give us this backup.</p></div></div>
   <p class="note">* Medicines only through licensed channels and where the Pharmacy Council rules allow (see section 4.5) · supplier names follow due diligence; none is contracted yet</p>`],
  ['How it works · the import timeline',`<p class="p4lead">From a signed order to a product on the shelf, drawn to scale. The import permit is applied for in parallel while the factory produces, so it never holds up the ship. Switch origin to compare. ${PE}</p>
   <div class="p4seg" id="p4leg"><button type="button" data-k="china" class="on">From China</button><button type="button" data-k="india">From India</button></div>
   <div class="p4panel p4gantt" style="margin-top:14px;padding:16px" id="p4gantt"></div>
   <div class="p4gsum" id="p4gsum"></div>
   <p class="note">Sea time for China from the cited range (40 days used); India sea time, production and clearing days are planning estimates · confirmed with forwarders</p>`],
  ['Try it · landed cost calculator',`<p class="p4lead">What does one imported product really cost when it reaches our shelf, and what must the shelf price be? Change the example (a blood-pressure monitor) to any product. Tax rates follow TRA’s published 2025/26 rates ${c('tra')} ${c('vat')}; the duty band depends on the product’s tariff code.</p>
   <div class="p4calc"><div class="cin">
    <label><span>Factory price per unit (US$)</span><input type="range" id="lc_fob" min="0.5" max="60" step="0.5" value="9.5"><output id="lco_fob"></output></label>
    <label><span>Units in this shipment</span><input type="range" id="lc_qty" min="50" max="3000" step="50" value="500"><output id="lco_qty"></output></label>
    <label><span>Sea freight for this shipment (US$)</span><input type="range" id="lc_fr" min="0" max="5000" step="50" value="900"><output id="lco_fr"></output></label>
    <label><span>Insurance (% of goods + freight)</span><input type="range" id="lc_ins" min="0" max="2" step="0.1" value="0.5"><output id="lco_ins"></output></label>
    <label><span>Import duty band (EAC common external tariff)</span><select id="lc_duty"><option value="0">0% · pharmaceuticals, raw materials, capital goods</option><option value="0.10">10% · semi-finished goods</option><option value="0.25" selected>25% · finished consumer goods</option><option value="0.35">35% · sensitive finished goods</option></select></label>
    <label><span>Clearing agent, port and handling (TSh per shipment)</span><input type="range" id="lc_clr" min="0" max="5000000" step="50000" value="1200000"><output id="lco_clr"></output></label>
    <label><span>TMDA / TBS permits and fees (TSh per shipment)</span><input type="range" id="lc_reg" min="0" max="2000000" step="25000" value="300000"><output id="lco_reg"></output></label>
    <label><span>Truck from port to store (TSh per shipment)</span><input type="range" id="lc_trk" min="0" max="1000000" step="25000" value="150000"><output id="lco_trk"></output></label>
   </div><div class="cout">
    <div><small>Landed cost per unit (before VAT)</small><b id="lc_land">–</b><p id="lc_landp"></p></div>
    <div><div class="p4stack" id="lc_stack"></div><div class="p4leg" id="lc_leg"></div></div>
    <div><small>Shelf price at the ${F.pct(gm)} retail margin (before VAT)</small><b id="lc_shelf">–</b></div>
    <div><small>One honest shelf price incl. 18% VAT</small><b id="lc_shelfv" style="color:var(--neon2)">–</b><p id="lc_vatp"></p></div>
   </div></div>
   <p class="note">Exchange rate ${n0(I.meta.fx_usd)} TSh per US$ from the master model · clearing, fees, freight and insurance are planning estimates · duty band per HS code to be confirmed with a licensed clearing agent · some medical goods may be VAT-exempt under the VAT Act schedule</p>`,'p4lc'],
  ['Try it · reorder point simulator',`<p class="p4lead">The system never waits for an empty shelf. For every item it knows the daily sales and the lead time, and it orders when stock falls to the <b>reorder point</b>:</p>
   <p class="oneline" style="font-size:clamp(1.1rem,2.2vw,1.6rem);max-width:none;margin:0 0 18px">Reorder point = <b>daily sales × lead time</b> + <b>safety stock</b></p>
   <p class="p4lead">Safety stock covers surprises: a busy week, a late ship, a closed port. Choose China, set safety stock to zero and turn on “real-life ups and downs” to see why it matters.</p>
   <div class="p4sim"><div class="p4panel" style="padding:14px"><div id="p4simchart"></div></div>
    <div class="cin">
     <div class="p4seg" id="p4pre" style="margin-bottom:4px"><button type="button" data-l="7" class="on">Local wholesaler</button><button type="button" data-l="58">India</button><button type="button" data-l="89">China</button></div>
     <label><span>Units sold per day</span><input type="range" id="rs_d" min="1" max="30" value="4"><output id="rso_d"></output></label>
     <label><span>Lead time (days)</span><input type="range" id="rs_l" min="2" max="100" value="7"><output id="rso_l"></output></label>
     <label><span>Safety stock (days of sales)</span><input type="range" id="rs_s" min="0" max="30" value="7"><output id="rso_s"></output></label>
     <label><span>Order size (days of sales)</span><input type="range" id="rs_q" min="14" max="120" step="7" value="28"><output id="rso_q"></output></label>
     <label class="p4chk"><input type="checkbox" id="rs_v"> Real-life ups and downs (±50% daily sales, late arrivals)</label>
     <div class="p4kv" style="margin-top:14px"><div><span>Reorder point</span><b id="rs_rop">–</b></div><div><span>Safety stock</span><b id="rs_ss">–</b></div><div><span>Days out of stock (180 days)</span><b id="rs_out">–</b></div><div class="tot"><span>Average units on the shelf</span><b id="rs_avg">–</b></div></div>
    </div></div>
   <p class="note">Simulation of one product over 180 days · the same rule runs for every item in the stock module</p>`,'p4rop'],
  ['Supplier quality checks · six gates',`<p class="p4lead">A product reaches the shelf only after passing every gate. The gates are written into the stock module: a batch that has not passed gate 5 cannot be sold, because the till refuses its barcode.</p>
   <div class="p4gate">
    <div><b>Registration check</b><p>The product is on TMDA’s registered list (devices, medicines) or certified by TBS (cosmetics; TBS took over cosmetics from 1 July 2019 ${c('tbs')}).</p></div>
    <div><b>Supplier vetting</b><p>Factory licence, quality certificates for devices, export record, references; a video or in-person audit.</p></div>
    <div><b>Samples tested</b><p>Samples checked against the spec: accuracy of monitors, packaging, Kiswahili/English labels, instructions.</p></div>
    <div><b>Pre-shipment inspection</b><p>Random cartons opened at the factory: quantity, batch numbers, expiry dates, damage.</p></div>
    <div><b>Arrival inspection</b><p>At least 60% of shelf life left on arrival for products with a shelf life over 24 months, 80% for shorter ones (TMDA rule) ${c('tmdaimp')}.</p></div>
    <div><b>Traceable on the shelf</b><p>Every unit is linked to its batch and supplier, so a recall finds every pack and every buyer in minutes.</p></div></div>
   <div style="margin-top:20px">${FEAT({f:'hub',alt:'Concept image of staff in royal green receiving and checking goods at the Afya hub, with shelves of green boxes and a tablet',cap:'arrival inspection at the hub',pos:'50% 45%',k:'Gate 5 in practice',h:'Nothing is shelved until it is counted, dated and scanned',
    body:`<p>When a delivery arrives at the hub, the picker opens a sample of cartons from every batch. The tablet shows what the purchase order expected: quantity, batch number, expiry date and the minimum shelf life allowed. Each carton is scanned; anything that does not match is set aside, photographed and logged against the supplier.</p><p>Only when the batch passes does the system release its barcode to the till. Until then the product cannot be sold, even by mistake. That is how a small team keeps a big promise: the rule lives in the system, not in someone’s memory on a busy afternoon.</p>`,
    facts:[['Minimum shelf life on arrival','60% (over 24 months) · 80% (shorter)'],['Batch released to the till','only after inspection'],['Every unit traceable','batch + supplier + buyer']]})}</div>
   <p class="p4lead" style="margin-top:18px">Device registration takes time: TMDA’s review runs about 90 days for Class A devices and 240 days for Classes B to D, a foreign maker needs a local authorised representative, and a licence lasts 5 years ${c('omc')}. We start registration early, and we prefer brands already registered.</p>`],
  ['The numbers',`<div class="nums">
    <div class="num g"><b>${F.m(stock)}</b><span>opening stock in the seed budget (about ${I.product_families} product families)</span></div>
    <div class="num"><b>${F.pct(gm)}</b><span>retail gross margin used to set shelf prices</span></div>
    <div class="num"><b>${Math.round(cover)} days</b><span>of sales the opening stock covers at month-12 pace (derived)</span></div>
    <div class="num"><b>2%</b><span>Railway Development Levy on CIF value ${c('tra')}</span></div>
    <div class="num"><b>18%</b><span>VAT on imports, reclaimed as input tax when we are VAT-registered ${c('vat')}</span></div></div>
   <p class="note">Stock cover = opening stock ÷ (month-12 cost of goods ÷ 30), base case · derived from the master model · planning estimate</p>`],
  ['Risks and our answer',`<div class="risks">
   <div class="risk"><span class="q">A container is delayed at sea or at the port.</span><span class="ar">→</span><span class="a">Safety stock for imported items, a second supplier for every fast mover, and a local wholesaler as the emergency source.</span></div>
   <div class="risk"><span class="q">A supplier sends a substandard batch.</span><span class="ar">→</span><span class="a">Six quality gates, pre-shipment inspection, and contracts that make the supplier pay for rejected goods.</span></div>
   <div class="risk"><span class="q">Exchange rate moves raise our costs.</span><span class="ar">→</span><span class="a">Landed costs are recalculated with each shipment; shelf prices are reviewed monthly, with notice to members before box prices change.</span></div>
   <div class="risk"><span class="q">Registration of new devices takes longer than planned.</span><span class="ar">→</span><span class="a">Launch with brands already registered; register our preferred brands early, in parallel with the store build.</span></div></div>`]],
  takeaway:'Knowing the <b>true landed cost of every item</b> and never running out protects both the margin and the customer’s trust. Direct imports from store 2 onwards are a <b>margin lever that grows with scale</b>.',
  doors:['s4-5','s3-6','s6-2','s7-3'],sources:c.list});}

function init42(){const gw=document.getElementById('p4gantt');if(!gw)return;const g=id=>document.getElementById(id);
 const drawG=k=>{const L=LEG[k],tot=L[L.length-1][3],W=Math.max(330,Math.min(760,gw.clientWidth-32)),nar=W<560,rowH=34,top=34,H=top+L.length*rowH+30,x0=nar?128:190,sc=(W-x0-20)/tot;
  let h=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Import timeline from ${k}">`;
  for(let d=0;d<=tot;d+=(nar?20:10)){const x=x0+d*sc;h+=`<line x1="${x}" y1="${top-8}" x2="${x}" y2="${H-24}" stroke="rgba(242,201,107,.08)"/><text class="s" x="${x}" y="${top-14}" text-anchor="middle">${d}</text>`}
  L.forEach((r,i)=>{const y=top+i*rowH,x=x0+r[2]*sc,w=Math.max(4,(r[3]-r[2])*sc);
   h+=`<text x="0" y="${y+15}" style="font-size:${nar?11.5:13}px">${r[0]}</text><text class="s" x="0" y="${y+28}">${r[3]-r[2]} days</text><rect x="${x}" y="${y+4}" width="${w}" height="20" rx="6" fill="${r[4]}" opacity=".85"><animate attributeName="width" from="0" to="${w}" dur=".7s" begin="${i*0.08}s" fill="freeze"/></rect>`});
  h+=`<text class="d" x="${x0}" y="${H-6}">Day 0</text><text class="d" x="${W-20}" y="${H-6}" text-anchor="end">Day ${tot} · on the shelf</text></svg>`;gw.innerHTML=h;
  const sea=L[4][3]-L[4][2];g('p4gsum').innerHTML=`<span>Order to shelf: <b>${tot} days</b></span><span>At sea: <b>${sea} days</b></span><span>Lead time used for reorder point: <b>${tot} days</b></span>`};
 const lb=[...document.querySelectorAll('#p4leg button')];lb.forEach(b=>b.onclick=()=>{lb.forEach(x=>x.classList.toggle('on',x===b));drawG(b.dataset.k)});drawG('china');
 // landed cost
 const fx=I.meta.fx_usd,gm=I.store.retail_gm,v=id=>+g(id).value;
 const up=()=>{const fob=v('lc_fob'),q=v('lc_qty'),fr=v('lc_fr'),ins=v('lc_ins')/100,du=+g('lc_duty').value,clr=v('lc_clr'),reg=v('lc_reg'),trk=v('lc_trk');
  g('lco_fob').textContent='$'+fob.toFixed(2);g('lco_qty').textContent=n0(q);g('lco_fr').textContent='$'+n0(fr);g('lco_ins').textContent=(ins*100).toFixed(1)+'%';g('lco_clr').textContent=F.auto(clr);g('lco_reg').textContent=F.auto(reg);g('lco_trk').textContent=F.auto(trk);
  const FOB=fob*q*fx,FR=fr*fx,INS=(FOB+FR)*ins,CIF=FOB+FR+INS,DUTY=CIF*du,RDL=CIF*0.02,CPF=FOB*0.006,LOC=clr+reg+trk,LAND=CIF+DUTY+RDL+CPF+LOC,VAT=(CIF+DUTY)*0.18;
  const u=LAND/q,shelf=u/(1-gm),shelfV=Math.ceil(shelf*1.18/500)*500;
  g('lc_land').textContent=tz(u);g('lc_landp').textContent=`Factory price ${tz(FOB/q)} → landed ${tz(u)}: ${(u/(FOB/q)).toFixed(2)}× the factory price.`;
  g('lc_shelf').textContent=tz(shelf);g('lc_shelfv').textContent=tz(shelfV);
  g('lc_vatp').textContent=`Import VAT of about ${tz(VAT/q)} per unit is paid at the port and reclaimed as input VAT, so it is not part of our cost. Rounded up to the nearest TSh 500 for one clear price.`;
  const parts=[['Factory',FOB,'#5fbf8f'],['Freight & insurance',FR+INS,'#d9b56e'],['Duty',DUTY,'#f2c96b'],['Levies (RDL 2%, CPF 0.6%)',RDL+CPF,'#ffb36b'],['Clearing, fees, truck',LOC,'#c9b8ff']];
  g('lc_stack').innerHTML=parts.map(x=>`<i style="width:${x[1]/LAND*100}%;background:${x[2]}" title="${x[0]}"></i>`).join('');
  g('lc_leg').innerHTML=parts.map(x=>`<span style="--c:${x[2]}">${x[0]} ${F.pct(x[1]/LAND)}</span>`).join('')};
 ['lc_fob','lc_qty','lc_fr','lc_ins','lc_duty','lc_clr','lc_reg','lc_trk'].forEach(k=>{g(k).oninput=up;g(k).onchange=up});up();
 // reorder sim
 const rnd=seed=>()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646};
 const sim=()=>{const d=v('rs_d'),L=v('rs_l'),sd=v('rs_s'),qd=v('rs_q'),vr=g('rs_v').checked;
  g('rso_d').textContent=d;g('rso_l').textContent=L+' d';g('rso_s').textContent=sd+' d';g('rso_q').textContent=qd+' d';
  const SS=d*sd,ROP=d*L+SS,Q=d*qd,T=180,r=rnd(42);let st=ROP+Q,pipe=[],out=0,sum=0;const pts=[],orders=[],arr=[];
  for(let t=0;t<T;t++){pipe=pipe.filter(o=>{if(o.at===t){st+=o.q;arr.push(t);return false}return true});
   const dem=vr?Math.max(0,Math.round(d*(0.5+r()))):d;const sold=Math.min(st,dem);if(st<dem)out++;st-=sold;sum+=st;pts.push(st);
   const onOrder=pipe.reduce((a,o)=>a+o.q,0);if(st+onOrder<=ROP){const late=vr&&r()<0.3?Math.round(L*0.35):0;pipe.push({at:t+L+late,q:Q});orders.push(t)}}
  g('rs_rop').textContent=n0(ROP)+' units';g('rs_ss').textContent=n0(SS)+' units';g('rs_out').textContent=out;g('rs_out').style.color=out?'#ffb3a3':'';g('rs_avg').textContent=n0(sum/T)+' units';
  const cw=g('p4simchart').clientWidth||640,W=Math.max(320,Math.min(640,cw)),H=W<500?260:300,pl=44,pb=34,pt=W<500?30:16,mx=Math.max(ROP+Q,...pts)*1.08,X=t=>pl+t*(W-pl-12)/(T-1),Y=y=>H-pb-(y/mx)*(H-pb-pt);
  let h=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Stock level over 180 days">`;
  for(let i=0;i<=4;i++){const yv=mx*i/4;h+=`<line x1="${pl}" x2="${W-12}" y1="${Y(yv)}" y2="${Y(yv)}" stroke="rgba(242,201,107,.08)"/><text x="${pl-8}" y="${Y(yv)+4}" text-anchor="end" style="font:500 10px var(--f-hud)" fill="#6a8a7d">${n0(yv)}</text>`}
  for(let t=0;t<=T;t+=(W<500?60:30))h+=`<text x="${X(Math.min(t,T-1))}" y="${H-12}" text-anchor="${t===0?'start':t>=T?'end':'middle'}" style="font:500 10px var(--f-hud)" fill="#6a8a7d">day ${t}</text>`;
  h+=`<rect x="${pl}" y="${Y(SS)}" width="${W-12-pl}" height="${Y(0)-Y(SS)}" fill="rgba(242,201,107,.06)"/>`;
  h+=`<line x1="${pl}" x2="${W-12}" y1="${Y(ROP)}" y2="${Y(ROP)}" stroke="#f2c96b" stroke-dasharray="6 5" stroke-width="1.4"/><text x="${W-14}" y="${Y(ROP)-6}" text-anchor="end" style="font:500 10.5px var(--f-hud)" fill="#ffe7a8">reorder point ${n0(ROP)}</text>`;
  if(SS>0)h+=`<text x="${W-14}" y="${Y(SS)-5}" text-anchor="end" style="font:500 10px var(--f-hud)" fill="#a9c4b8">safety stock ${n0(SS)}</text>`;
  const path=pts.map((y,t)=>`${t?'L':'M'}${X(t).toFixed(1)} ${Y(y).toFixed(1)}`).join(' ');
  h+=`<path d="${path} L${X(T-1)} ${Y(0)} L${X(0)} ${Y(0)}Z" fill="rgba(95,191,143,.08)"/><path d="${path}" fill="none" stroke="#5fbf8f" stroke-width="2" stroke-linejoin="round"/>`;
  pts.forEach((y,t)=>{if(y===0)h+=`<rect x="${X(t)-2}" y="${Y(0)-6}" width="4" height="6" fill="#ff7b6b"/>`});
  orders.forEach(t=>h+=`<circle cx="${X(t)}" cy="${Y(pts[t])}" r="4" fill="#f2c96b"/>`);
  arr.forEach(t=>h+=`<path d="M${X(t)} ${Y(0)} v-10" stroke="#d9b56e" stroke-width="2"/>`);
  h+=`<g style="font:500 10px var(--f-hud)"><circle cx="${pl+6}" cy="10" r="4" fill="#f2c96b"/><text x="${pl+14}" y="13" fill="#a9c4b8">order placed</text><rect x="${pl+96}" y="5" width="3" height="10" fill="#d9b56e"/><text x="${pl+104}" y="13" fill="#a9c4b8">arrives</text><rect x="${pl+164}" y="7" width="6" height="6" fill="#ff7b6b"/><text x="${pl+174}" y="13" fill="#a9c4b8">out of stock</text></g></svg>`;
  g('p4simchart').innerHTML=h};
 ['rs_d','rs_l','rs_s','rs_q','rs_v'].forEach(k=>{g(k).oninput=sim;g(k).onchange=sim});
 const pb=[...document.querySelectorAll('#p4pre button')];pb.forEach(b=>b.onclick=()=>{pb.forEach(x=>x.classList.toggle('on',x===b));g('rs_l').value=b.dataset.l;if(+b.dataset.l>30)g('rs_q').value=63;sim()});sim()}

/* =====================================================================
   4.3 PACKING AND DELIVERY
   ===================================================================== */
const S43=srcSet([
 ['nbs','National Bureau of Statistics, 2022 Population and Housing Census, Dar es Salaam region by municipal council (via City Population)','https://www.citypopulation.de/en/tanzania/admin/07__dar_es_salaam']]);
const ZONES=[
 {k:'kin',a:[-112,-52],r:[4,10],lr:9.4,n:'Kinondoni',pop:982328,d:'M300 40 L420 30 L470 120 L455 205 L370 215 L330 160 Z',lx:400,ly:120,km:'4–10 km',min:'35–60 min',waves:[10,13,16]},
 {k:'ubu',a:[-178,-114],r:[6,15],lr:12.6,n:'Ubungo',pop:1086912,d:'M120 70 L300 40 L330 160 L370 215 L300 260 L170 250 L95 170 Z',lx:225,ly:160,km:'6–15 km',min:'45–80 min',waves:[10,13,16]},
 {k:'ila',a:[112,176],r:[0,12],n:'Ilala',pop:1649912,d:'M170 250 L300 260 L370 215 L455 205 L470 290 L420 330 L330 360 L210 350 Z',lx:330,ly:295,km:'0–12 km',min:'20–60 min',waves:[10,13,16]},
 {k:'tem',a:[52,110],r:[6,16],n:'Temeke',pop:1346674,d:'M210 350 L330 360 L420 330 L440 390 L410 470 L290 490 L200 430 Z',lx:320,ly:425,km:'6–16 km',min:'45–80 min',waves:[10,13,16]},
 {k:'kig',a:[4,50],r:[8,20],n:'Kigamboni',pop:317902,d:'M470 340 L540 330 L590 420 L560 500 L450 490 L430 440 Z',lx:510,ly:420,km:'8–20 km',min:'50–90 min',waves:[10,16]}];
const STORE=[300,262];const KM=11;
const SECT=(a0,a1,r0,r1)=>{const P=(a,r)=>[(STORE[0]+r*Math.cos(a*Math.PI/180)).toFixed(1),(STORE[1]+r*Math.sin(a*Math.PI/180)).toFixed(1)];const R0=r0*KM,R1=r1*KM;const [x1,y1]=P(a0,R1),[x2,y2]=P(a1,R1);if(R0<1){return `M${STORE[0]} ${STORE[1]} L${x1} ${y1} A${R1} ${R1} 0 0 1 ${x2} ${y2} Z`}const [x3,y3]=P(a1,R0),[x4,y4]=P(a0,R0);return `M${x1} ${y1} A${R1} ${R1} 0 0 1 ${x2} ${y2} L${x3} ${y3} A${R0} ${R0} 0 0 0 ${x4} ${y4} Z`};
const LBL=z=>{const a=(z.a[0]+z.a[1])/2*Math.PI/180,r=z.lr?z.lr*KM:(z.r[0]+z.r[1])/2*KM+(z.r[0]?0:30);return [STORE[0]+r*Math.cos(a),STORE[1]+r*Math.sin(a)]};
function sec43(s,p,pv,nx){css();const c=S43;const on=I.online,mb=I.members;
 const boxCost=mb.packing_delivery_in_price*0.85;const packPart=boxCost-on.rider_cost_per_order;
 const perDay=mb.end_y1/26;
 const map=`<svg viewBox="0 0 640 540" role="group" aria-label="Delivery zone map: Dar es Salaam municipal councils by direction and distance band from the store">
  <defs><pattern id="p4mgrid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="rgba(207,227,218,.04)"/></pattern></defs>
  <rect width="640" height="540" fill="url(#p4mgrid)"/>
  <path class="coast" d="M420 0 C 455 70, 470 130, 452 200 C 440 240, 470 268, 505 280 C 545 300, 560 360, 600 400 C 620 430, 640 450, 640 470"/>
  <text x="560" y="150" text-anchor="middle" class="ocean">INDIAN OCEAN</text>
  ${[5,10,15,20].map(k=>`<circle cx="${STORE[0]}" cy="${STORE[1]}" r="${k*KM}" class="ring"/><text x="${(STORE[0]+k*KM*Math.cos(-0.45)+4).toFixed(1)}" y="${(STORE[1]+k*KM*Math.sin(-0.45)).toFixed(1)}" class="rk">${k} km</text>`).join('')}
  <path d="M${STORE[0]} ${STORE[1]-232}V${STORE[1]+232}M${STORE[0]-232} ${STORE[1]}H${STORE[0]+232}" class="axis"/>
  ${ZONES.map((z,i)=>{const [lx,ly]=LBL(z);return `<g class="z" data-i="${i}" tabindex="0" role="button" aria-label="${z.n}"><path d="${SECT(z.a[0],z.a[1],z.r[0],z.r[1])}"/><text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}">${z.n}</text><text class="s" x="${lx.toFixed(1)}" y="${(ly+15).toFixed(1)}">${z.km}</text></g>`}).join('')}
  ${ZONES.map((z,i)=>{const [lx,ly]=LBL(z);return `<path class="rt" data-i="${i}" d="M${STORE[0]} ${STORE[1]} L${lx.toFixed(1)} ${(ly-18).toFixed(1)}"/>`}).join('')}
  <circle cx="${STORE[0]}" cy="${STORE[1]}" r="9" fill="#03100c" stroke="#f2c96b" stroke-width="2"/><circle cx="${STORE[0]}" cy="${STORE[1]}" r="3.5" fill="#f2c96b"/>
  <text x="${STORE[0]+14}" y="${STORE[1]+22}" fill="#ffe7a8" style="font:600 10px var(--f-hud);letter-spacing:1.5px;paint-order:stroke;stroke:#04140f;stroke-width:3px">STORE &amp; HUB</text>
  <g transform="translate(600 500)"><circle r="18" fill="none" stroke="rgba(207,227,218,.4)"/><path d="M0 -14L5 4L0 0L-5 4Z" fill="rgba(207,227,218,.8)"/><text y="-22" text-anchor="middle" class="rk">N</text></g>
  <text x="16" y="528" class="rk fn">Zones placed by direction and distance band from a central store · schematic, not a survey map</text>
  <circle class="bike" id="p4bike" r="4.5" cx="${STORE[0]}" cy="${STORE[1]}"/></svg>`;
 const wf=on.delivery_fee,rc=on.rider_cost_per_order;
 return secShell({s,p,pv,nx,cls:'p4',img:'img/hub.webp),url(img/interior.webp',imgAlt:'Concept image of the Afya packing hub: staff packing closed green Afya boxes',
  h1:'Packed right, photographed,',em:'at the door the same day.',
  lede:'Monthly Afya Boxes are packed from members’ locked choices, photographed and dispatched on a fixed day. Online orders placed before 15:00 reach homes in Dar es Salaam the same day on electric motorbikes. The customer pays for packing and delivery inside the price, so every drop pays for itself.',
  mods:[
  ['The problem it solves',`<div class="plain"><span class="modno" style="margin:0 0 12px">In plain words</span><ol>
   <li><b>Dar es Salaam is big and busy.</b> More than 5.38 million people live in its five municipal councils ${c('nbs')}. Traffic makes delivery times hard to promise.</li>
   <li><b>Deliveries go wrong without a system.</b> Wrong items, a box left with the wrong neighbour, “it never arrived” disputes, riders phoning to find the house.</li>
   <li><b>Delivery can quietly eat the margin.</b> Many shops offer “free delivery” and pay for it out of the product margin. Each order then makes less, and growth makes losses bigger.</li>
   <li><b>Health deliveries are personal.</b> A new mother or a grandmother cared for at home needs the right box, on the expected day, handed to the right person.</li></ol></div>`],
  ['Our answer · one hub, our own riders, one rule',`<p class="p4lead">Delivery is where most health retailers lose either money or trust. Afya Basics keeps all three parts in its own hands: the room where boxes are packed, the people who carry them, and the rule that the customer’s price always covers the cost.</p>
   ${TILES([
    {f:'hub',alt:'Concept image of two packers in royal green packing closed Afya Boxes at a white bench with a tablet',cap:'the packing hub',pos:'45% 45%',k:'The packing hub',h:'One room, one method',p:`Boxes are packed in a dedicated hub at the back of Store #1 (a separate hub opens with the second store). Each member has a pick list; every item is scanned against it, and a photo of every closed box is taken before it leaves. At ${n0(mb.end_y1)} members, that is about ${perDay.toFixed(0)} boxes on a normal packing day ${PE}, a steady rhythm two trained people can hold.`,s:'Scan every item · photo every box'},
    {f:'rider',alt:'Concept image of an Afya rider in green on an electric motorbike with a closed insulated Afya box',cap:'an Afya rider on the road',pos:'55% 45%',k:'The riders',h:'Our own riders, electric bikes',p:'Two employed riders on electric motorbikes, in uniform, with closed insulated Afya boxes. The system assigns orders by zone and wave, and the rider app shows the route and the customer’s delivery code. A rider who is part of the team, not a stranger from an app, is someone a grandmother is comfortable opening her door to.',s:'Employed · uniformed · trained'},
    {f:'boxdoor',alt:'Concept image of a rider handing a closed Afya Box to a mother holding her baby at the doorstep',cap:'handed over at the door',pos:'55% 40%',k:'The rule',h:'The customer funds the drop',p:`Box members pay packing and delivery inside the box price (${tz(mb.packing_delivery_in_price)} per box); online customers pay a ${tz(wf)} delivery fee. Both are larger than what the drop costs (see the numbers), so every extra delivery adds profit instead of eating the product margin.`,s:'Customer-funded on every drop'}])}`],
  ['How it works · the monthly box flow',`<p class="p4lead">Every member has a fixed delivery day. Twelve days before month end their choices lock, the pick list is built automatically and the box moves through five steps. Nobody types a list.</p>
   <div class="p4boxflow">
    <div class="p4bf"><span class="t">Day −12 · automatic</span><b>Locked choices</b><p>Afya Choice swaps close 12 days before month end. The member’s brands, sizes and quantities are fixed and payment is confirmed.</p></div>
    <div class="p4bf"><span class="t">Day −2 · picker</span><b>Pick</b><p>The picker’s handheld lists each box. Every item is scanned; a wrong brand or a short-dated batch is refused on the spot (first-expiry-first-out).</p></div>
    <div class="p4bf"><span class="t">Day −1 · packer</span><b>Pack</b><p>Packed in the closed royal-green Afya Box, with the member’s name card and leaflet. Sealed with a tamper label carrying the box number.</p></div>
    <div class="p4bf"><span class="t">Day −1 · packer</span><b>Photograph</b><p>A photo of the sealed box is attached to the order. It settles any question later and is sent to a diaspora payer as confirmation.</p></div>
    <div class="p4bf"><span class="t">Delivery day · rider</span><b>Dispatch</b><p>Boxes are loaded by zone and wave. The customer gets a WhatsApp message with the time window and a 4-digit code.</p></div></div>
   <div class="p4cal" aria-label="One month of the box calendar for a member delivered on day 3">${Array.from({length:31},(_,i)=>{const d=i+1;const cl=d===19?'lk':(d===1||d===2)?'pk':d===3?'dl':'';return `<i class="${cl}" title="Day ${d}">${d}</i>`}).join('')}</div>
   <div class="p4lgd" style="margin-top:10px"><span style="--c:var(--gold)">Day 19: choices lock (12 days before month end), for next month’s box</span><span style="--c:#d9b56e">Days 1–2: pick, pack, photograph</span><span style="--c:var(--neon)">Day 3: this member’s delivery day</span></div>
   <p class="note">Example member with delivery on day 3 · ${n0(mb.end_y1)} members at end of year 1 ≈ ${perDay.toFixed(0)} boxes per packing day (26 days a month) · planning estimate</p>`],
  ['The experience · proof at the door',`<div class="p4pod"><div class="p4ph"><div class="scr"><div class="bar"><i>${SV(ICO.del,2)}</i><div><b>Rider app · Proof of delivery</b><small>Order A-2291 · Mikocheni</small></div></div>
     <div class="p4podphoto" style="background:url(img/boxdoor.webp) 62% 45%/cover no-repeat"><span>PHOTO · 14:32 · GPS saved</span></div>
     <div style="padding:0 12px;font-size:.72rem;color:#5b6f66;text-align:center">Customer reads out their code</div>
     <div class="p4code"><i>4</i><i>7</i><i>1</i><i>9</i></div>
     <div class="p4ok">${SV('<path d="M5 12l5 5 9-10"/>',2.4)} Code matched · delivered to Mama Neema</div>
     <div style="padding:0 12px 14px;font-size:.66rem;color:#7a8c83;text-align:center">Customer and payer notified on WhatsApp</div></div></div>
    <div><h3 class="p4h3" style="margin-top:0">Proof of delivery: a photo and a code</h3><p class="p4lead">Every delivery closes with two proofs. The customer reads out a <b>4-digit code</b> sent to their phone, and the rider takes a <b>photo</b> of the closed box at the door; the time and location are saved. If the customer is out, the rider calls once, then the box returns to the store and a new time is offered. It is never left with someone who cannot give the code.</p>
     <p class="p4lead">For a son abroad who paid for his mother’s box, the photo and “delivered to Mama Neema at 14:32” arrive on his phone within seconds. <span class="tagi">Illustrative</span></p></div></div>`],
  ['Try it · the delivery map of Dar es Salaam',`<p class="p4lead">A schematic zone map of the five municipal councils, each placed by its direction and distance band from a central store. Choose an area, then move the order time. Orders placed <b>before 15:00</b> are delivered the same day; later orders go on the first wave next morning. The store location is still being chosen; it is drawn centrally here. <span class="tagi">Illustrative times</span></p>
   <div class="p4dmap"><div class="p4panel" style="padding:12px">${map}</div>
    <div class="p4panel"><span class="hud" id="p4zh">Area</span><h3 class="p4h3" style="margin:6px 0 4px" id="p4zn">–</h3>
     <div class="p4kv" id="p4zkv"></div>
     <div class="p4time"><div class="row"><span style="color:var(--ink2);font-size:.9rem">Order placed at</span><output id="p4to">13:20</output></div><input type="range" id="p4t" min="480" max="1260" step="10" value="800" aria-label="Order time"></div>
     <div class="p4verdict" id="p4ver"></div></div></div>
   <p class="note">Populations: 2022 census ${c('nbs')} · rider waves leave at 10:00, 13:00 and 16:00 (Kigamboni 10:00 and 16:00) · planning estimate</p>`,'p4map'],
  ['The numbers · the customer-funded rule',`<p class="p4lead">The test of the customer-funded rule is simple: <b>what the customer pays for delivery must be more than what the delivery costs us</b>. The model says it is.</p>
   <div class="p4g2"><div class="p4panel p4fund" id="p4fund"></div>
    <div class="cin p4card" style="background:var(--panel)"><span class="k">Check the rider cost yourself</span>
     <label><span>Rider pay per month (TSh)</span><input type="range" id="dc_pay" min="300000" max="1200000" step="25000" value="${I.staff[3][2]}"><output id="dco_pay"></output></label>
     <label><span>Drops per rider per day</span><input type="range" id="dc_drops" min="4" max="30" value="14"><output id="dco_drops"></output></label>
     <label><span>Km per drop</span><input type="range" id="dc_km" min="1" max="20" value="6"><output id="dco_km"></output></label>
     <label><span>Electricity + maintenance per km (TSh)</span><input type="range" id="dc_ekm" min="20" max="400" step="10" value="100"><output id="dco_ekm"></output></label>
     <div class="p4kv" style="margin-top:14px"><div><span>Pay per drop</span><b id="dc_a">–</b></div><div><span>Motorbike (cost spread over 3 years)</span><b id="dc_b">–</b></div><div><span>Energy and maintenance</span><b id="dc_c">–</b></div><div><span>Phone, box, insurance</span><b>${tz(400)}</b></div><div class="tot"><span>Cost per drop</span><b id="dc_t">–</b></div></div>
     <p id="dc_v" style="margin:12px 0 0;font-size:.88rem;color:var(--ink2)"></p></div></div>
   <p class="note">Model inputs: delivery fee ${tz(wf)}, rider cost ${tz(rc)} per order, ${tz(mb.packing_delivery_in_price)} packing + delivery inside each box · box cost ${tz(boxCost)} = 85% of the allowance as in the master model (rider ${tz(rc)} + packing and materials ${tz(packPart)}, derived) · bike cost from the seed budget (${F.m((I.seed.use.find(x=>/motorbike/i.test(x[0]))||[0,0])[1])} for two) · calculator values are planning estimates</p>`],
  ['Electric motorbikes',`<div class="p4g3">
    <div class="p4card"><span class="k">Why electric</span><h4>Lower running cost</h4><p>Charging costs far less per kilometre than petrol, and there are fewer moving parts to service. That keeps the cost per drop under the fee the customer pays.</p></div>
    <div class="p4card"><span class="k">The brand on the road</span><h4>Quiet, clean, visible</h4><p>A silent green bike with a closed Afya box is the brand travelling through the city every day: calm, modern and trustworthy, the same feeling as the store.</p></div>
    <div class="p4card"><span class="k">Charging plan</span><h4>Charged at the store</h4><p>Bikes charge overnight at the store; a spare battery per bike (where the model allows swapping) covers long days. A petrol back-up hire is arranged for breakdowns.</p></div></div>
   <div class="nums" style="margin-top:14px"><div class="num g"><b>${F.m((I.seed.use.find(x=>/motorbike/i.test(x[0]))||[0,0])[1])}</b><span>seed budget for two electric delivery motorbikes</span></div><div class="num"><b>${I.staff[3][1]}</b><span>riders on the team at launch</span></div><div class="num"><b>15:00</b><span>same-day cut-off in Dar es Salaam</span></div><div class="num"><b>${n0(on.orders_day_m12)}</b><span>online orders a day by month 12</span></div><div class="num"><b>${tz(wf)}</b><span>delivery fee paid by the customer</span></div></div>`],
  ['Risks and our answer',`<div class="risks">
   <div class="risk"><span class="q">Traffic or rain makes deliveries late.</span><span class="ar">→</span><span class="a">Fixed waves with time windows, not exact times; live tracking; the 15:00 cut-off leaves a buffer; late deliveries are measured every day.</span></div>
   <div class="risk"><span class="q">A box is stolen or a delivery is disputed.</span><span class="ar">→</span><span class="a">Closed, sealed boxes with tamper labels, the 4-digit code, a photo and GPS time stamp for every drop.</span></div>
   <div class="risk"><span class="q">Electric bike batteries or spare parts are hard to get.</span><span class="ar">→</span><span class="a">Buy from a supplier with local service, keep spare parts, and arrange petrol back-up hire for peaks or breakdowns.</span></div>
   <div class="risk"><span class="q">Delivery volume outgrows two riders.</span><span class="ar">→</span><span class="a">Each extra rider is paid for by the fees of the drops they carry; a vetted courier partner covers peaks.</span></div></div>`]],
  takeaway:'Delivery is <b>paid for by the customer on every drop</b>, so more orders mean more profit, not more loss. The hub-and-rider method is the <b>same playbook for every future store</b>.',
  doors:['s3-5','s6-2','s4-4','s3-8'],sources:c.list});}

function init43(){const g=id=>document.getElementById(id);if(!g('p4ver'))return;const on=I.online,mb=I.members;
 const zs=[...document.querySelectorAll('.p4dmap .z')],rts=[...document.querySelectorAll('.p4dmap .rt')];let zi=2;
 const hm=m=>String(Math.floor(m/60)).padStart(2,'0')+':'+String(m%60).padStart(2,'0');
 const bike=g('p4bike');let anim=null;
 const ride=i=>{const r=rts[i];if(!r||!r.getTotalLength)return;cancelAnimationFrame(anim);const L=r.getTotalLength();let t0=null;
  const step=ts=>{if(!t0)t0=ts;const f=((ts-t0)/2200)%1;const p=r.getPointAtLength(f*L);bike.setAttribute('cx',p.x);bike.setAttribute('cy',p.y);anim=requestAnimationFrame(step)};anim=requestAnimationFrame(step)};
 const upd=()=>{const z=ZONES[zi],t=+g('p4t').value;g('p4to').textContent=hm(t);
  zs.forEach((e,k)=>e.classList.toggle('on',k===zi));rts.forEach((e,k)=>e.classList.toggle('on',k===zi));
  g('p4zn').textContent=z.n;g('p4zh').textContent='Area '+(zi+1)+' of 5';
  g('p4zkv').innerHTML=`<div><span>People (2022 census)</span><b>${n0(z.pop)}</b></div><div><span>Distance from store</span><b>${z.km}</b></div><div><span>Ride time</span><b>${z.min}</b></div><div><span>Rider waves</span><b>${z.waves.map(w=>w+':00').join(' · ')}</b></div><div><span>Delivery fee</span><b>${tz(on.delivery_fee)}</b></div>`;
  const ready=t+45;const w=z.waves.find(x=>x*60>=ready);const v=g('p4ver');
  if(t<=900&&w){v.className='p4verdict';v.innerHTML=`<b>Same day.</b> Picked and packed by ${hm(ready)}, leaves on the ${w}:00 wave, at the door by about ${hm(w*60+parseInt(z.min.split('–')[1]))}.`}
  else if(t<=900){v.className='p4verdict';v.innerHTML=`<b>Same day, last wave.</b> Ready by ${hm(ready)}; ${z.n} is served by the 16:00 wave, at the door before about ${hm(960+parseInt(z.min.split('–')[1]))}.`}
  else{v.className='p4verdict late';v.innerHTML=`<b>After the 15:00 cut-off.</b> Packed this evening, leaves on the ${z.waves[0]}:00 wave tomorrow morning. Click and collect stays open until 21:00.`}
  ride(zi)};
 zs.forEach((e,k)=>{e.onclick=()=>{zi=k;upd()};e.onkeydown=ev=>{if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();zi=k;upd()}}});g('p4t').oninput=upd;upd();
 addEventListener('afya:leave',()=>cancelAnimationFrame(anim),{once:true});
 // funding chart
 const boxCost=mb.packing_delivery_in_price*0.85;
 const rows=[['Online order',on.delivery_fee,on.rider_cost_per_order,'fee paid by customer','rider cost'],['Afya Box',mb.packing_delivery_in_price,boxCost,'packing + delivery in box price','packing + rider cost']];
 const fw=g('p4fund').clientWidth-48,W=Math.max(290,Math.min(520,fw||520)),mx=mb.packing_delivery_in_price*1.05,bw=v=>v/mx*W;
 g('p4fund').innerHTML=`<span class="hud">What the customer pays vs what it costs us · per drop</span><svg viewBox="0 0 ${W} 280" role="img" aria-label="Customer payment versus cost per delivery" style="margin-top:14px">${rows.map((r,i)=>{const y=i*145;return `<text class="b" x="0" y="${y+14}" style="font-size:15px">${r[0]}</text>
  <text x="0" y="${y+38}" style="fill:#b5dfc6;font:600 12.5px var(--f-body)">${tz(r[1])} · ${r[3]}</text><rect x="0" y="${y+44}" width="${bw(r[1])}" height="14" rx="5" fill="#5fbf8f" opacity=".85"/>
  <text x="0" y="${y+78}" style="fill:#ffb3a3;font:600 12.5px var(--f-body)">${tz(r[2])} · ${r[4]}</text><rect x="0" y="${y+84}" width="${bw(r[2])}" height="14" rx="5" fill="#ff9b87" opacity=".8"/>
  <text x="0" y="${y+120}" style="fill:#ffe7a8;font:600 13px var(--f-body)">+${tz(r[1]-r[2])} left over per drop (${F.pct((r[1]-r[2])/r[1])})</text>`}).join('')}</svg>
  <p class="p4lead" style="margin:6px 0 0;font-size:.9rem">In both cases the customer’s payment is larger than the cost, so <b>every extra delivery adds profit</b>. If routes get longer or riders carry fewer drops, the rider-cost calculator shows the cost per drop rising, and the fix (better waves, more drops per rider, a fee review) is decided before the rule breaks.</p>`;
 const dc=()=>{const pay=+g('dc_pay').value,dr=+g('dc_drops').value,km=+g('dc_km').value,e=+g('dc_ekm').value;
  g('dco_pay').textContent=F.auto(pay);g('dco_drops').textContent=dr;g('dco_km').textContent=km+' km';g('dco_ekm').textContent=tz(e);
  const a=pay/26/dr,b=(I.seed.use.find(x=>/motorbike/i.test(x[0]))||[0,0])[1]/2/36/26/dr,cc=km*e,t=a+b+cc+400;
  g('dc_a').textContent=tz(a);g('dc_b').textContent=tz(b);g('dc_c').textContent=tz(cc);g('dc_t').textContent=tz(t);
  const ok=t<on.delivery_fee;g('dc_v').innerHTML=ok?`<b style="color:var(--neon2)">Covered.</b> At ${tz(t)} a drop, the ${tz(on.delivery_fee)} fee leaves ${tz(on.delivery_fee-t)} per online order. The model assumes ${tz(on.rider_cost_per_order)}.`:`<b style="color:#ffb3a3">Not covered.</b> At ${tz(t)} a drop the fee is too low. Fix: more drops per rider (waves), shorter routes, or a review of the fee.`};
 ['dc_pay','dc_drops','dc_km','dc_ekm'].forEach(k=>g(k).oninput=dc);dc()}

/* =====================================================================
   4.4 TEAM AND DAILY OPERATIONS
   ===================================================================== */
const S44=srcSet([
 ['pa','Pharmacy Act, 2011 (Tanzania), via TanzLII: s.34 registered premises, s.43 pharmacist in charge of retail premises','https://tanzlii.org/akn/tz/act/2011/1/eng@2011-12-31/source'],
 ['mw','Labour Institutions (Minimum Wage for Private Sector) Order, 2025 (GN 605A), in force 1 January 2026: pharmacy TSh 240,000; business TSh 200,500; postal and courier services TSh 287,500 a month','https://www.tanzaniainvest.com/wp-content/uploads/2025/10/GN-NO.-605A-OF-2025-THE-LABOUR-INSTITUTIONS-MINIMUM-WAGE-FOR-PRIVATE-SECTOR-ORDER-2025-5.pdf'],
 ['tx','PwC Worldwide Tax Summaries, Tanzania: NSSF 20% of pay (employer may recover up to half from the employee), WCF 0.5%, SDL 3.5% for employers with 10 or more employees','https://taxsummaries.pwc.com/Tanzania/Individual/Other-taxes'],
 ['pye','PwC Worldwide Tax Summaries, Tanzania: monthly PAYE bands for residents (0% to TSh 270,000; 8%; 20%; 25%; 30% above TSh 1,000,000)','https://taxsummaries.pwc.com/tanzania/individual/taxes-on-personal-income'],
 ['el','Employment and Labour Relations Act, Cap. 366 (TanzLII): 45-hour ordinary week, overtime at 1.5 times, night work, 28 days annual leave, written contracts','https://tanzlii.org/en/akn/tz/act/2004/6/eng@2023-12-31'],
 ['lv','Mondaq, Labour and Employment Comparative Guide: Tanzania (January 2024): 28 days annual leave, 126 days sick leave per cycle, 84 days maternity, 3 days paternity, 28 days notice, written contracts','https://www.mondaq.com/employment/1418252/labour-and-employment-comparative-guide'],
 ['os','Tanzania Trade Portal: workplace registration with OSHA before operations start (OHS Act 2003, s.16), yearly compliance licence and electrical inspection','https://test.tradeportal.org/objective/268?l=en'],
 ['os2','Daily News, 24 December 2025: Government gives employers 90 days from January 2026 to register workplaces with OSHA (OHS Act ss.16–17)','https://dailynews.co.tz/?p=123471'],
 ['tf','TFDA (now TMDA), 2008: Guidelines for registration of premises and licensing of pharmaceutical business: retail premises under a registered pharmacist, at least 20 m², annual permit to 30 June','https://pharmexcil.com/docs/DRProcedures/TANZANIA/Hguidelinesforregistrationofpremisesandlicensingofpharmaceuticalbusiness_tanzania.pdf']]);
const DAY=[
 ['08:30','Opening checks','Store lead','The store lead runs the opening checklist on the handheld: the cash float is counted with a second person, today’s deliveries and box list are reviewed and low-stock alerts are read. The Afya Check kiosk, screens and shelf labels are tested before the doors open.','People · Stock · Orders','10 min'],
 ['09:00','Doors open','Early shift','One adviser is stationed at the Afya Check kiosk by the entrance and one works the floor. The quick check at the door (blood pressure, pulse, oxygen) takes about 50 seconds. Customers who know what they want find, scan and pay in under 3 minutes.','Till · Check Station','<3 min per visit'],
 ['10:00','First delivery wave','Picker, riders','Orders placed the previous evening and early morning leave on the first wave, together with today’s Afya Box deliveries, sorted by area.','Orders & delivery','by area'],
 ['11:00','Box packing','Picker & packer','The quietest hours are used to pack tomorrow’s Afya Boxes: pick, scan, pack, photograph. Click-and-collect orders are ready within 2 hours.','Members · Stock','~6 min a box'],
 ['13:00','Lunch rota, second wave','Store lead','Staff take lunch in turns so that two people are always on the floor. The second delivery wave leaves.','People · Orders','2 on floor'],
 ['15:00','Same-day cut-off','Picker','The last same-day orders are confirmed. Later orders move to the next morning’s wave, and the customer receives the new delivery time automatically.','Orders & delivery','15:00 sharp'],
 ['16:00','Supplier deliveries','Store lead','Supplier deliveries are counted, scanned for batch and expiry, and shelved first-expiry-first-out. The final delivery wave leaves.','Stock','3 taps per carton'],
 ['18:00','Evening peak','Late shift','The busiest period of the day. The two late-shift advisers run the floor, the till and the kiosk. Most full Afya Checks (15 measurements in about 4 minutes) take place now.','Till · Check Station','<12 min with a check'],
 ['20:30','Cash-up','Two people','Two staff count the cash and match it to the system total. Any difference is logged under both names. The second till keeps trading until 21:00.','Money','15 min'],
 ['21:00','Close and daily report','System','Doors close. The daily report reaches the founders by WhatsApp at 21:00: sales, checks, new members, stock risks and open issues.','Dashboard','automatic']];
const SOP={
 open:['Unlock, disarm, lights and screens on','Count the cash float with a second person','Afya Check kiosk: clean, calibration check, test reading','Walk the Care Zones: gaps, facing, price labels match the system','Fridge temperature logged (if cold-chain items held)','Read today’s deliveries, box packing list and low-stock alerts','Check staff on shift and uniforms','Toilets and lounge clean; doors open at 09:00'],
 day:['Greet every customer within 30 seconds','Offer the free Afya Check; never push a product','Answer WhatsApp within 5 minutes','Click-and-collect ready within 2 hours','Scan every supplier delivery: batch and expiry','Refer any reading flagged red to a clinic and log it','Move short-dated stock to the front (first-expiry-first-out)'],
 close:['Cash-up by two people at 20:30, matched to the system','Card and mobile-money totals matched','Expiry check: pull anything due within 30 days','Tomorrow’s boxes packed and photographed','Rider bikes on charge, boxes cleaned','Screens off, alarm set, doors locked','Daily report reviewed before 21:00'],
 week:['Stock count of the top 50 items by value','Review expiry list for the next 90 days','Clean and test the Afya Check kiosk fully','Staff training session (30 minutes)','Customer complaints reviewed and closed','Back-up of the system checked']};
const TASKS=[
 ['Receive a carton','Stock in, batch and expiry saved',[['Scan the carton','Point the camera at the supplier barcode.','scan','Scan'],['Confirm 24 × BP monitor','Batch B-2611 · expiry 08/2029 · matches the purchase order.','crd','Confirm'],['Shelf A3 · Heart & Diabetes','Put on shelf A3. Stock, cost and expiry updated.','crd','Done']]],
 ['Hand over click & collect','Order matched, customer notified',[['Scan the customer’s code','The customer shows the QR code from WhatsApp.','scan','Scan'],['Order C-118 · 3 items','Paid by mobile money · Mama Asha · bag on hook 2.','crd','Hand over'],['Collected','Receipt and thanks sent on WhatsApp.','crd','Done']]],
 ['Log a red reading','Referral recorded, follow-up set',[['Reading flagged red','BP 172/104 · customer consented to save.','crd','Refer'],['Clinic referral card','Printed and sent by SMS with nearby clinics.','crd','Confirm'],['Follow-up in 3 days','A reminder to call is set for the adviser.','crd','Done']]]];
function sec44(s,p,pv,nx){css();const c=S44;const stf=I.staff;const tot=stf.reduce((a,r)=>a+r[1]*r[2],0);const heads=stf.reduce((a,r)=>a+r[1],0);const emp=I.opex_month.staff;const LI=M.leanInputs();const lh=LI.staff.reduce((a,r)=>a+r[1],0);
 const org=`<svg viewBox="0 0 760 330" role="img" aria-label="Organisation chart of Store #1">
  <path class="ln" d="M380 64 V96 M380 140 V170 M100 170 H660 M100 170 V196 M287 170 V196 M473 170 V196 M660 170 V196"/>
  <path class="ln" d="M490 40 H580" stroke-dasharray="4 4"/><path class="ln" d="M270 40 H190" stroke-dasharray="4 4"/>
  <rect class="nb g" x="270" y="16" width="220" height="48" rx="14"/><text x="380" y="38">Founders &amp; board</text><text class="s" x="380" y="55">Fahmy · Cecilia · investors</text>
  <rect class="nb o" x="580" y="14" width="170" height="52" rx="14"/><text x="665" y="36" style="font-size:12.5px">Accountant</text><text class="s" x="665" y="53">outsourced</text>
  <rect class="nb o" x="10" y="14" width="180" height="52" rx="14"/><text x="100" y="36" style="font-size:12.5px">Partner pharmacy</text><text class="s" x="100" y="53" style="font-size:10px">licensed · under contract</text>
  <rect class="nb g" x="240" y="96" width="280" height="44" rx="14"/><text x="380" y="116">Store lead &amp; senior adviser</text><text class="s" x="380" y="132">physiotherapy graduate preferred</text>
  ${[[100,'Advisers × '+stf[1][1]/2+' · early','Afya Check · floor'],[287,'Advisers × '+stf[1][1]/2+' · late','members · WhatsApp'],[473,'Picker & packer','boxes · click & collect'],[660,'Riders × '+stf[3][1],'electric motorbikes']].map(b=>`<rect class="nb" x="${b[0]-88}" y="196" width="176" height="56" rx="14"/><text x="${b[0]}" y="220">${b[1]}</text><text class="s" x="${b[0]}" y="238" style="font-size:10px">${b[2]}</text>`).join('')}
  <text class="s" x="380" y="300" style="fill:#f2c96b">${heads} people on the payroll · one system covers the work of a cashier, a stock clerk and an office administrator</text></svg>`;
 const SX=h=>120+(h-8)*(430/13);
 const shifts=`<svg viewBox="0 0 560 190" aria-label="Shift plan from 08:30 to 21:00" style="margin-top:14px">${[8,11,14,17,21].map(h=>`<line x1="${SX(h)}" x2="${SX(h)}" y1="6" y2="160" stroke="rgba(242,201,107,.12)"/><text x="${SX(h)}" y="180" text-anchor="middle" style="font-size:12px">${h}:00</text>`).join('')}
  ${[['Store lead',8.5,17.5,'#f2c96b'],['Advisers · early',8.5,15.5,'#5fbf8f'],['Advisers · late',14,21,'#5fbf8f'],['Picker & packer',9,17,'#d9b56e'],['Riders',9.5,19.5,'#c9b8ff']].map((r,i)=>{const y=8+i*30;return `<text class="b" x="0" y="${y+15}" style="font-size:13px">${r[0]}</text><rect x="${SX(r[1])}" y="${y+2}" width="${(r[2]-r[1])*(430/13)}" height="18" rx="6" fill="${r[3]}" opacity=".8"/>`}).join('')}</svg><p class="note" style="margin-top:8px">Shifts overlap 14:00–15:30 to cover the 15:00 cut-off and handover · planning estimate</p>`;
 return secShell({s,p,pv,nx,cls:'p4',img:'img/s-counter.webp),url(img/interior.webp',imgAlt:'Concept image of the Afya Basics corner counter with screens and the green box wall',
  h1:'A trained team,',em:'run to written procedures.',
  lede:`The flagship store is staffed by ${heads} people on two shifts: a store lead (preferably a physiotherapy graduate), ${stf[1][1]} health advisers, a picker and packer, and ${stf[3][1]} riders. Written procedures, a handheld on which every routine task takes three taps or fewer, and one system keep the standard constant, whoever is on shift and wherever the founders are.`,
  mods:[
  ['In summary · what this section shows',`<div class="p4prose">
   <p class="p4sum">The flagship store is run by eight employed people: one store lead, four health advisers, one picker and packer, and two riders. Together they keep a 180 m² store open twelve hours a day, seven days a week, run the free Afya Check, pack every Afya Box and online order, and deliver across Dar es Salaam the same day.</p>
   <p>Eight people is a small team for that amount of work. It is possible for one reason: the routine work that normally needs a cashier, a stock clerk and an office administrator is done by the system. Prices, stock counts, receipts, reminders, reorders and reports are produced automatically. The people are left with the work that only people can do well: advising a customer, packing a box correctly and handing it over at the door.</p>
   <p>This section explains who does what, how the hours are covered, what a normal day looks like, how the team is hired and trained, what they are paid and why, how the law on pay and working hours is met, and how cash and stock are protected. The full cost of the team, including every contribution the law requires, is TSh 8,349,400 a month, about 7.3% of the store’s revenue in month 12 of the base case.</p></div>`],
  ['Why the team matters more here than in an ordinary shop',`<div class="p4prose">
   <p>In most Dar es Salaam shops, the quality of service depends on one good employee. When that person is on shift, customers are greeted, stock is in order and questions are answered. When that person is off sick or leaves for another job, the standard leaves with them. The owner usually cannot be in the shop all day to notice.</p>
   <p>A health store feels this problem more than most. A customer choosing a blood-pressure monitor, the right nappy size for a growing baby, or a walking frame for a parent after a fall is not only buying a product. They are asking for advice, and they need to trust that the advice is honest. If the person behind the counter is trained to sell rather than to advise, the customer is given a price, not guidance, and does not come back.</p>
   <p>Routine controls also slip without structure. A fridge temperature that should be written down twice a day, an expiry check that should happen weekly, a cash count that should be done by two people: each is easy to skip when nobody records who did it. In a business that sells health products, a skipped check is not a small mistake. It can mean an expired test strip reaching a diabetic customer.</p>
   <p>Afya Basics is designed so that the standard does not depend on any one person. Every routine task is written down, done on a handheld device, and recorded with a name and a time. Anything not done appears in a report that the founders read every night.</p></div>`],
  ['The eight people and what each one does',`<div class="p4prose">
   <h4>The store lead · 1 person · TSh 1,500,000 a month</h4>
   <p>The store lead runs the store and the team. They approve purchase orders, resolve complaints, sign the daily cash-up, lead the Afya Check and are the person a regulator or inspector speaks to. A physiotherapy graduate is preferred, for a practical reason: a large share of questions in the Mobility &amp; Recovery and Seniors zones are about movement, pain, falls and devices such as walking frames and wheelchairs. Clinical training gives the store lead sound judgement about when a customer should be sent to a doctor rather than sold a product.</p>
   <p>The salary of TSh 1.5 million is about six times the legal minimum for the health sector (TSh 240,000). It is set at that level because the store lead is the one person whose departure would hurt most, and because the same person is expected to open and run the second store in year 2.</p>
   <h4>Health advisers · 4 people · TSh 900,000 a month each</h4>
   <p>The advisers are the people most customers meet. They run the Afya Check kiosk and explain the results, advise on the shop floor, enrol members into the Afya Box, and answer WhatsApp messages within five minutes during opening hours. They work in pairs: two on an early shift and two on a late shift. All four are trained across every Care Zone, and each also specialises: two in mother and baby, two in heart, diabetes and senior care.</p>
   <p>Advisers are not paid commission and are not measured on how much a customer spends in one visit. They are measured on how many members are still active after three months. This is deliberate. A member who is pushed into an expensive box cancels; a member who is advised honestly stays, and a member who stays is worth far more to the business than one large sale.</p>
   <h4>Picker and packer · 1 person · TSh 700,000 a month</h4>
   <p>The picker and packer prepares every Afya Box and online order, photographs each box before it is sealed, prepares click-and-collect orders within two hours, and receives deliveries from suppliers. At every delivery they check, together with a second person, that the quantity, the batch number and the expiry date match the purchase order. This is the most process-driven job in the store, and the one where a single mistake reaches a customer’s home, which is why every step is scanned.</p>
   <h4>Riders · 2 people · TSh 600,000 a month each</h4>
   <p>The riders deliver on electric motorbikes in three waves a day, at 10:00, 13:00 and 16:00. At every door they confirm the handover with a four-digit code sent to the customer and a photograph. Riders are employed, uniformed and trained in road safety and in how to hand over a health product politely. For many members the rider is the only Afya employee they ever meet, so the rider is part of the brand, not an outside courier.</p>
   <h4>Who is not on the payroll, and why</h4>
   <p>Two functions are bought in. An outsourced accountant prepares the monthly accounts, the tax returns and the payroll from data the system exports, and IT support is on call. At one store, both are cheaper and safer to buy than to employ. The third outside party is the licensed partner pharmacy. Afya Basics does not sell medicines, because Tanzanian law allows medicines to be sold only from premises registered with the Pharmacy Council and run by a registered pharmacist ${c('pa')}. The partner pharmacy sells and dispenses them under its own licence. Afya staff never choose, recommend or hand over loose medicines; when a customer asks for one, the adviser passes the request to the partner’s pharmacist through the app, and the pharmacist calls the customer.</p></div>`],
  ['How twelve hours a day, seven days a week, are covered',`<div class="p4prose">
   <p>The store is open from 09:00 to 21:00 every day: 84 hours a week. The rule is that two people are on the shop floor at all times, so that one can run the Afya Check while the other serves customers and answers WhatsApp. The rota also has to respect three limits in Tanzanian law: an ordinary week of no more than 45 hours, overtime paid at one and a half times, and a weekly rest day ${c('el')}.</p>
   <p>Each day has two shifts. The early shift runs from 08:45 to 15:30 (6¾ hours, including the opening checks) and the late shift from 14:45 to 21:15 (6½ hours, including closing and the cash-up). The shifts overlap for 45 minutes in the afternoon. The overlap sits there on purpose: 15:00 is the cut-off for same-day orders, so it is the busiest packing time, and it is when the early pair hand over open WhatsApp conversations, follow-up calls and red Afya Check readings to the late pair.</p>
   <div class="p4ex"><span>Worked example · building the weekly rota</span><p>Two people on each of two shifts, seven days a week, means 2 × 2 × 7 = 28 shifts to fill every week. Each of the four advisers works six shifts, three early and three late, with one full day of rest: 4 × 6 = 24 shifts. Their hours are 3 × 6.75 + 3 × 6.5 = 39.75 hours a week, comfortably inside the 45-hour limit, with no overtime. The remaining 4 shifts are covered by the store lead, who works as the second person on the floor on four early shifts a week and spends the fifth working day on suppliers, banking and paperwork. The store lead’s week is 45 hours.</p></div>
   <p>When the store lead is not in the building, which is every late shift and two full days a week, a senior adviser is named as duty manager. The duty manager holds the keys, signs the cash-up, approves any refund and can stop a sale. The picker works 45 hours over five days, mostly in the morning and early afternoon when the boxes are packed, and the riders work 45 hours each, built around the three delivery waves.</p>
   <p>Every employee is entitled to 28 days of paid annual leave ${c('lv')}. The store cannot close for four weeks, so one part-time relief adviser is employed to cover leave, and rider leave is covered by partner riders paid per order. That cover costs TSh 538,462 a month before contributions, and it is included in the model. The calculation is shown in the pay module below.</p></div>`],
  ['A full day in the store, hour by hour',`<div class="p4prose">
   <p><b>08:45 · Opening.</b> The two people on the early shift unlock, disarm the alarm and switch on the lights and screens. They count the cash float together and both sign on the handheld. The Afya Check kiosk is cleaned and a test reading is taken to confirm it is working. The Care Zones are walked for gaps and wrong price labels. The handheld shows today’s deliveries, the list of boxes to pack and any low-stock alerts. About fifteen minutes.</p>
   <p><b>09:00 · Doors open.</b> The early pair of advisers take the floor and the kiosk. The picker starts packing the day’s Afya Boxes from the system’s list, scanning every item and photographing every finished box.</p>
   <p><b>10:00 · First delivery wave.</b> The riders leave with the morning orders and boxes. Each handover is confirmed with the customer’s code and a photo; the system shows the customer’s order as delivered within seconds.</p>
   <p><b>11:00 · Supplier delivery.</b> The picker and a second person receive the delivery: count, batch, expiry and pack condition are checked against the purchase order. Anything short-dated or damaged is refused at the door.</p>
   <p><b>13:00 · Second wave.</b> Lunch-hour orders go out. The advisers take the Afya Check queue, which is busiest at lunchtime.</p>
   <p><b>14:45 to 15:30 · Handover.</b> The late pair arrive. Open WhatsApp conversations, follow-up calls and red Afya Check readings are handed over on the handheld.</p>
   <p><b>15:00 · Same-day cut-off.</b> Orders placed after 15:00 are delivered the next morning.</p>
   <p><b>16:00 · Third wave.</b> The last same-day deliveries leave.</p>
   <p><b>18:00 · Evening.</b> The after-work peak: office workers collecting click-and-collect orders, checks and quick purchases.</p>
   <p><b>20:30 · Closing begins.</b> Shelves are faced and gaps noted for the morning order.</p>
   <p><b>21:00 · Doors close and cash-up.</b> Two people count the cash; mobile-money and card payments have already been matched to sales by the system. The day’s report is generated automatically: sales, members enrolled, checks done, deliveries completed and every checklist item not ticked on time. The founders read it each night.</p></div>`],
  ['Written procedures and the three-taps rule',`<div class="p4prose">
   <p>Every routine task in the store is a written procedure that runs on the staff handheld as a checklist. Each tick records who did it and when. A task not done on time appears in the 21:00 report. This means the founders can see every evening whether the store ran to standard, without being there.</p>
   <p>The handheld follows one design rule: any routine task takes three taps or fewer. The reason is practical. Every extra step is a chance to make a mistake, adds training time, and takes the adviser away from the customer.</p>
   <div class="p4ex"><span>Example · receiving a carton of test strips</span><p>Tap 1: scan the supplier barcode on the carton. The handheld shows the purchase order line it belongs to. Tap 2: scan the batch and expiry on one pack; the system checks the expiry against the rule and the batch against any recall. Tap 3: confirm the quantity. Stock is updated, the batch is linked to every future sale of those strips, and the supplier’s invoice is matched. Three taps replace a page of handwritten records.</p></div>
   <p>The procedures are grouped by time: opening (eight steps, from unlocking to opening the doors at 09:00), during the day (deliveries, receiving, fridge log if needed, follow-up calls), closing (facing shelves, cash-up, report), and weekly (stock counts, expiry review, cleaning of rental equipment, checking that every licence is in date).</p></div>`],
  ['Protecting cash and stock',`<div class="p4prose">
   <p>In retail, money is usually lost in three places: at the till, on the payment screen and in the stockroom. Each has a control that runs every day.</p>
   <p><b>Cash.</b> The float is counted by two people at opening and at closing, and both sign. Cash above the float is banked every day through a bank agent, and the deposit slip is photographed into the system. Any difference, however small, is recorded with a reason and reviewed by the store lead the next morning.</p>
   <p><b>Mobile money and cards.</b> Most customers pay by M-Pesa, Mixx by Yas, Airtel Money, HaloPesa or card. The system matches every payment to its sale automatically. A payment without a sale, or a sale without a payment, appears as an exception. Refunds and price changes need the store lead’s or duty manager’s PIN, so no single person can both make a sale and refund it.</p>
   <div class="p4ex"><span>Example · how a mismatch is caught</span><p>At 21:00 the report shows a TSh 42,500 Presha Care sale with no matching mobile-money payment. The handheld shows which adviser made the sale and when. The next morning the store lead checks the payment provider’s statement: the customer’s payment failed and the box was handed over anyway. The customer is called, pays, and the adviser is retrained on waiting for the payment confirmation. The loss is caught within twelve hours instead of at the month-end count.</p></div>
   <p><b>Stock.</b> Every delivery is checked by two people. A fifth of all products is counted each week, so the whole range is counted every five weeks; high-value devices are counted every month; and the whole store is counted every quarter. The target is that the system and the shelf agree on at least 98% of products. Cameras cover the till, the stockroom and the entrance, and recordings are kept for 30 days.</p></div>`],
  ['Hiring and training the first team',`<div class="p4prose">
   <p>People are hired in the order the store needs them. The store lead starts two months before opening, to help with the fit-out, the supplier set-up, the first stock order and the hiring of the rest of the team. The advisers and the picker start three weeks before opening, and the riders two weeks before.</p>
   <p>Every candidate goes through the same four steps. First, their qualifications are checked against the role: a registered physiotherapy or nursing diploma for the store lead; a health-related certificate or diploma, or retail experience with good Kiswahili and English, for advisers; a valid licence and two years of riding experience for riders. Second, a practical test: advisers explain a blood-pressure reading to a role-play customer, pickers pick a ten-line order against the clock, riders complete a route test. Third, an interview with both founders, focused on values: advice before sales, and honesty about what Afya does not sell. Fourth, two references are taken and certificates are verified.</p>
   <p>Training lasts four weeks. Week 1 is the Afya Way: the brand, the customer charter, and privacy and consent under the Personal Data Protection Act. Week 2 is the system: the till, scan-and-go, mobile money, stock and batches, members and boxes. Week 3 is health advice: how to explain Afya Check readings, when to refer a customer to a clinic, product knowledge for each Care Zone, and every employee’s first-aid certificate. Week 4 is supervised shifts after the soft opening, a written test on the procedures, role-plays, and sign-off by the store lead. After that, a 30-minute training session is held every week.</p>
   <p>The seed money set aside for this was previously a round TSh 8 million. It has now been calculated line by line:</p>
   <div class="p4tblw"><table class="p4tbl"><thead><tr><th>Line</th><th>Calculation</th><th>Cost</th></tr></thead><tbody>
    <tr><td>Store lead, from two months before opening</td><td>2 months × TSh 1,500,000 × 1.105</td><td>TSh 3,315,000</td></tr>
    <tr><td>Four advisers, three weeks before opening</td><td>0.75 month × TSh 3,600,000 × 1.105</td><td>TSh 2,983,500</td></tr>
    <tr><td>Picker and packer, three weeks before opening</td><td>0.75 month × TSh 700,000 × 1.105</td><td>TSh 580,125</td></tr>
    <tr><td>Two riders, two weeks before opening</td><td>0.5 month × TSh 1,200,000 × 1.105</td><td>TSh 663,000</td></tr>
    <tr><td>Uniforms</td><td>8 people × 2 sets × TSh 45,000</td><td>TSh 720,000</td></tr>
    <tr><td>First-aid certificates</td><td>8 people × TSh 60,000</td><td>TSh 480,000</td></tr>
    <tr><td>Job adverts, interviews, reference checks</td><td>Estimate</td><td>TSh 300,000</td></tr>
    <tr><td><b>Total</b></td><td></td><td><b>TSh 9,041,625</b></td></tr></tbody></table></div>
   <p>The factor 1.105 adds the employer’s 10% NSSF and 0.5% WCF contributions. Because the real cost is about TSh 9 million, the seed line has been raised to TSh 9 million and the working-capital reserve lowered by TSh 1 million, so the TSh 340 million total is unchanged. Uniform, first-aid course and advertising prices are planning estimates to be confirmed with suppliers.</p></div>`],
  ['Pay, contributions and the law',`<div class="p4prose">
   <p>The table shows the monthly cost of the team as it is entered in the master model. It has five parts: the salaries, cover for annual leave, the employer’s social security and workers’ compensation contributions, and the premium for night work.</p>
   <div class="p4tblw"><table class="p4tbl"><thead><tr><th>Line</th><th>People</th><th>Per person</th><th>Total a month</th></tr></thead><tbody>${stf.map(r=>`<tr><td>${esc(r[0])}</td><td>${r[1]}</td><td>${tz(r[2])}</td><td>${tz(r[1]*r[2])}</td></tr>`).join('')}
    <tr><td><b>Salaries</b></td><td><b>${heads}</b></td><td></td><td><b>${tz(tot)}</b></td></tr>
    <tr><td>Relief cover for 28 days of annual leave</td><td>1 part-time</td><td></td><td>${tz(Math.round(tot*I.staff_leave_cover))}</td></tr>
    <tr><td>Employer NSSF 10% and WCF 0.5%</td><td></td><td></td><td>${tz(Math.round(tot*(1+I.staff_leave_cover)*I.staff_oncost))}</td></tr>
    <tr><td>Night-work premium, 20:00 to 21:15</td><td>2</td><td></td><td>${tz(I.staff_night_month)}</td></tr>
    <tr><td><b>Total employment cost</b></td><td></td><td></td><td><b>${tz(emp)}</b></td></tr></tbody></table></div>
   <h4>Each salary against the legal minimum</h4>
   <p>Tanzania’s new minimum wage order came into force on 1 January 2026 ${c('mw')}. It sets TSh 240,000 a month for pharmacies in the health sector, TSh 200,500 for general business, and TSh 287,500 for postal and courier services. Comparing each Afya role with the highest category it could fall under: the store lead is paid 6.3 times the minimum, advisers 3.8 times, the picker 3.5 times and riders 2.1 times. Paying well above the minimum is a choice, not a legal requirement: it is what keeps trained people from leaving.</p>
   <h4>Worked example · one adviser’s payslip</h4>
   <p>Social security (NSSF) is 20% of pay, normally split equally between employer and employee ${c('tx')}. Income tax (PAYE) is charged on pay after the employee’s NSSF, using monthly bands ${c('pye')}.</p>
   <div class="p4tblw"><table class="p4tbl p4kv"><tbody>
    <tr><td>Gross salary</td><td>TSh 900,000</td></tr>
    <tr><td>Less employee NSSF, 10%</td><td>− TSh 90,000</td></tr>
    <tr><td>Taxable pay</td><td>TSh 810,000</td></tr>
    <tr><td>Less PAYE: TSh 68,000 on the first TSh 760,000, plus 25% of the remaining TSh 50,000</td><td>− TSh 80,500</td></tr>
    <tr><td><b>Take-home pay</b></td><td><b>TSh 729,500</b></td></tr>
    <tr><td>Plus employer NSSF 10% and WCF 0.5%, paid by Afya</td><td>+ TSh 94,500</td></tr>
    <tr><td><b>Total cost to Afya Basics</b></td><td><b>TSh 994,500</b></td></tr></tbody></table></div>
   <p>The same steps apply to every role. A rider on TSh 600,000 pays TSh 60,000 NSSF and TSh 24,000 PAYE, and takes home TSh 516,000.</p>
   <h4>Why leave cover and night work are in the model</h4>
   <p>Leave cover: every employee is entitled to 28 days of paid annual leave ${c('lv')}, roughly four weeks a year. The store must stay open, so four weeks of every role’s hours are bought back from a part-time relief adviser: TSh 7,000,000 × 4 ÷ 52 = TSh 538,462 a month, plus contributions. Using one part-time person keeps the payroll at nine, below the ten employees at which the 3.5% Skills Development Levy begins ${c('tx')}.</p>
   <p>Night work: the law treats work after 20:00 as night work and adds a premium of 5% of basic pay for each hour ${c('el')}. The two advisers on each late shift work until 21:15 to close and count the cash: 1.25 hours of night work per shift. Fourteen late shifts a week give about 76 hours of night work a month across the team, the same as two people working 38 hours each. At TSh 4,615 an hour (TSh 900,000 ÷ 195 hours), 5% of that is about TSh 231 an hour, so 76 hours cost about TSh 17,540 a month, or TSh 19,400 including contributions.</p>
   <h4>Other legal duties</h4>
   <p>Every employee signs a written contract before the first shift. The contract states the leave the law gives: 28 days of annual leave; sick leave of 126 days in a three-year cycle, the first 63 on full pay; 84 days of maternity leave (100 for multiple births); 3 days of paternity leave; and 28 days of notice after the first month ${c('lv')}. Before trading starts the workplace is registered with OSHA, which then issues a compliance licence every year after an inspection that includes the electrical installation ${c('os')}; the government gave unregistered workplaces 90 days from January 2026 to comply ${c('os2')}. The company registers with NSSF and the Workers Compensation Fund, and deducts PAYE and pays it to TRA every month. From the second store the company will pass ten employees, and the Skills Development Levy of 3.5% of payroll will be added to the group budget.</p></div>`],
  ['Measuring performance and keeping good people',`<div class="p4prose">
   <p>Each role has a small number of targets, all read from the system rather than from a manager’s impression. The store lead is measured on the store’s monthly result against the model, on 95% of checklist items done on time, and on complaints closed within 48 hours. Advisers are measured on members who are still active after three months (the model assumes 8% of members leave each month, so the target is to stay at or below that), on WhatsApp replies within five minutes, and on every red Afya Check reading being followed up within three days. The picker is measured on getting 99.5% of order lines right and on photographing every box. Riders are measured on delivering 95% of orders in the promised wave and on confirming every handover with a code and a photo.</p>
   <p>Every employee has a 20-minute one-to-one with the store lead each month, a scorecard review every quarter and a yearly review with both founders that sets their pay for the next year. There is a clear path upwards: health adviser, then senior adviser and duty manager in year 1, then store lead of the second store when it opens in year 2, then area lead across four stores in year 3. Promotions are filled from inside first, so each new store opens with a lead who already knows the system.</p>
   <p>Replacing a trained adviser costs roughly one month of their salary in recruitment and training time (a planning estimate), and members notice when the familiar face changes. Fair pay, regular feedback and a visible path to promotion are therefore part of the business plan, not extras.</p></div>`],
  ['The smaller first store',`<div class="p4prose">
   <p>If the founders start with the smaller TSh 150 million option, the store is 100 m² on a secondary street and opens from 09:00 to 20:00, seven days a week: 77 hours. Shifts run from 08:45 to 14:45 and from 14:15 to 20:15. It is run by five people: a store lead, three health advisers and a picker and packer. Deliveries are made by partner riders paid per order, and a simple check corner replaces the Afya Check kiosk.</p>
   <div class="p4ex"><span>Worked example · the rota in the smaller store</span><p>Two people in the store on two six-hour shifts a day, seven days a week, means 28 shifts a week. The three advisers work six shifts each, with one rest day: 18 shifts and 36 hours a week each. The store lead covers five shifts and the picker, who packs boxes in the store, covers the other five: 18 + 5 + 5 = 28. Nobody works more than 45 hours.</p></div>
   <p>The monthly employment cost of this team, with leave cover and contributions, is ${tz(LI.opex_month.staff)}. Its pre-opening hiring and training is calculated the same way as for the flagship: the store lead one month before opening (TSh 1,657,500), three advisers and the picker two weeks before (TSh 1,491,750 and TSh 386,750), uniforms (TSh 450,000), first-aid certificates (TSh 300,000) and adverts (TSh 200,000), a total of TSh 4,486,000. Its seed line is therefore TSh 4.5 million, with the reserve lowered by TSh 0.5 million so the TSh 150 million total does not change.</p></div>`],
  ['What could go wrong, and what we do about it',`<div class="p4prose">
   <p><b>The store lead or another key person leaves.</b> Because every procedure lives in the system and every adviser is trained across all zones, the store keeps running to the same standard. The senior adviser already acts as duty manager and can step up. Fair pay, training and a clear path to lead the next store reduce the chance of losing people in the first place.</p>
   <p><b>Standards slip when no manager is present.</b> Time-stamped checklists, two-person cash counts and the 21:00 report showing every missed task mean the founders know the same evening, wherever they are.</p>
   <p><b>An adviser is asked about a medicine.</b> Advisers are trained to stop and hand over. The request goes to the partner pharmacy’s pharmacist through the app and the customer is called back. Every hand-over is logged, so the founders can check that no medicine advice was given by Afya staff.</p>
   <p><b>Pay in Dar es Salaam rises faster than planned.</b> The salaries are benchmarked again before hiring. A 10% rise across the team would add about TSh 0.8 million a month to costs.</p></div>`]],
  takeaway:`A <b>${heads}-person team</b> can run a full flagship because <b>the system and written procedures carry the routine work</b>. The same staffing plan and training programme make <b>each new store faster to open</b>.`,
  doors:['s4-1','s4-5','s6-1','s7-2'],sources:c.list});}

function init44(){const g=id=>document.getElementById(id);if(!g('p4tl'))return;
 const tb=[...document.querySelectorAll('#p4tl button')];
 const sd=i=>{const d=DAY[i];tb.forEach((b,k)=>b.classList.toggle('on',k===i));g('p4tld').innerHTML=`<span class="hud">${d[0]} · ${esc(d[2])}</span><h3>${esc(d[1])}</h3><p>${d[3]}</p><div class="p4kv"><div><span>System</span><b>${d[4]}</b></div><div><span>Time budget</span><b>${d[5]}</b></div></div>`};
 tb.forEach((b,i)=>b.onclick=()=>sd(i));sd(0);
 // handheld
 let ti=0,step=0,taps=0;
 const rh=()=>{const t=TASKS[ti],sc=g('p4hscr');g('p4hht').textContent=t[0];
  if(step>=3){sc.innerHTML=`<div style="margin:auto;text-align:center"><div style="width:70px;height:70px;border-radius:50%;background:#0f7a52;display:grid;place-items:center;margin:0 auto;color:#fff">${SV('<path d="M5 12l5 5 9-10"/>',2.6).replace('<svg','<svg width="36" height="36"')}</div><div class="ttl" style="margin-top:14px">Done in 3 taps</div><div class="sub">${t[1]}</div></div><button class="big" type="button" id="p4hagain">Start again</button>`;g('p4hagain').onclick=()=>{step=0;taps=0;rh()}}
  else{const s=t[2][step];sc.innerHTML=`<div class="dots">${[0,1,2].map(k=>`<i class="${k<=step?'on':''}"></i>`).join('')}</div><div class="ttl">${s[0]}</div><div class="sub">Step ${step+1} of 3</div>${s[2]==='scan'?'<div class="scan"></div>':`<div class="crd"><b>${s[0]}</b>${s[1]}</div>`}<div class="sub">${s[2]==='scan'?s[1]:''}</div><button class="big" type="button" id="p4htap">${s[3]}</button>`;g('p4htap').onclick=()=>{taps++;step++;rh()}}
  g('p4taps').innerHTML=`Taps used: <b>${taps}</b> of 3 · the system updates stock, orders and records automatically`};
 const tk=[...document.querySelectorAll('#p4tasks button')];tk.forEach((b,i)=>b.onclick=()=>{tk.forEach(x=>x.classList.toggle('on',x===b));ti=i;step=0;taps=0;rh()});rh();
 // SOP
 const st={};let cur='open';const ring=g('p4ringc');
 const upd=()=>{const l=SOP[cur],d=st[cur]||(st[cur]=l.map(()=>false));const n=d.filter(Boolean).length,f=n/l.length;ring.style.strokeDashoffset=326.7*(1-f);g('p4ringv').textContent=Math.round(f*100)+'%';g('p4ringn').textContent=`${n} of ${l.length} ticked`+(n===l.length?' · checklist complete':'')};
 const rs=()=>{const l=SOP[cur],d=st[cur]||(st[cur]=l.map(()=>false));const times={open:['08:30','08:35','08:40','08:45','08:50','08:52','08:55','09:00'],day:Array(7).fill('all day'),close:['20:30','20:40','20:45','20:50','20:55','21:05','21:10'],week:['Mon','Mon','Wed','Thu','Fri','Sun']}[cur];
  g('p4sopl').innerHTML=l.map((x,i)=>`<li><label><input type="checkbox" data-i="${i}" ${d[i]?'checked':''}><span><b>${String(i+1).padStart(2,'0')}</b> · ${esc(x)}</span><em>${times[i]||''}</em></label></li>`).join('');
  g('p4sopl').querySelectorAll('input').forEach(c=>c.onchange=()=>{d[+c.dataset.i]=c.checked;upd()});upd()};
 const sb=[...document.querySelectorAll('#p4sopt button')];sb.forEach(b=>b.onclick=()=>{sb.forEach(x=>x.classList.toggle('on',x===b));cur=b.dataset.k;rs()});rs()}

/* =====================================================================
   4.5 QUALITY AND COMPLIANCE
   ===================================================================== */
const S45=srcSet([
 ['pa','Pharmacy Act, 2011 (Tanzania), via TanzLII: s.34 registered premises, s.36 permits, s.39 prescription medicines, s.43 pharmacist in charge, penalties','https://tanzlii.org/akn/tz/act/2011/1/eng@2011-12-31/source'],
 ['tmda','Tanzania Medicines and Medical Devices Authority (TMDA): services — registration, permits, premises, safety reporting (*152*00#), recalls','https://www.tmda.go.tz/'],
 ['prem','TMDA: Registration and licensing of premises for medical devices (permits expire 30 June each year)','https://www.tmda.go.tz/pages/registration-and-licensing-of-premises-1'],
 ['recall','TMDA: Recall of devices and diagnostics (Class I 14 days, II 21 days, III 30 days)','https://www.tmda.go.tz/pages/recall-of-devices-and-diagnostics-1'],
 ['imp','TMDA: Import and export control of medicines (shelf-life on arrival; who may import)','https://www.tmda.go.tz/pages/import-and-export-control'],
 ['omc','OMC Medical: Tanzania medical device registration (Classes A–D, review times, 5-year licence)','https://omcmedical.com/tanzania'],
 ['tbs','News Central, 30 August 2019: Tanzania shifts cosmetics regulation to the standards bureau (TBS)','https://newscentraltv.com/?p=20889'],
 ['tfda','TFDA (now TMDA), 2008: Guidelines for registration of premises and licensing of pharmaceutical business (superintendent must be a registered pharmacist)','https://pharmexcil.com/docs/DRProcedures/TANZANIA/Hguidelinesforregistrationofpremisesandlicensingofpharmaceuticalbusiness_tanzania.pdf'],
 ['clyde','Clyde & Co, February 2023: Tanzania — The Personal Data Protection Act of 2022','https://www.clydeco.com/en/insights/2023/02/tanzania-personal-data-protection-act-of-2022'],
 ['who','WHO news release, 28 November 2017: 1 in 10 medical products in developing countries is substandard or falsified','https://www.who.int/news/item/28-11-2017-1-in-10-medical-products-in-developing-countries-is-substandard-or-falsified'],
 ['fee','TFDA (now TMDA) fee schedule effective 1 October 2011: annual dealer’s permit for medical devices, retail distributor TSh 60,000','https://pharmexcil.com/docs/DRProcedures/TANZANIA/Ifeestanzania_tanzania.pdf'],
 ['pdpc','Afriwise: initial compliance with Tanzania’s Personal Data Protection Act (registration TSh 100,000 for small businesses, renewal TSh 50,000, valid five years)','https://www.afriwise.com/blog/regulatory-and-compliance-update-a-guide-to-initial-compliance-with-tanzanias-data-protection-act'],
 ['ret','Pure Global, 2026: TMDA 2027 retention fees under GN No. 686 of 2021 (USD 200 registered imported device; USD 50 notified Class A)','https://www.pureglobal.com/news/tanzania-tmda-2027-retention-fee-deadlines'],
 ['rsm','RSM Tanzania: Compliance when operating a company in Tanzania (TIN within 15 days, VAT threshold, business licence, OSHA, WCF within 30 days, fire certificate)','https://www.rsm.global/tanzania/insights/consulting-insights/compliance-when-operating-company-tanzania']]);
const TIER={ok:['#5fbf8f','We sell it'],ph:['#f2c96b','Partner pharmacy sells it'],rx:['#ff8f7a','Partner pharmacy · prescription only'],chk:['#d9b56e','Confirm the regulator']};
const PROD=[
 ['Blood-pressure monitor','ok','Medical device','TMDA (medical devices)','Sell only models registered or notified with TMDA. The premises that stores and sells devices needs TMDA premises registration, renewed every year.','A father with high blood pressure chooses between 4–5 registered monitors at one price, and the adviser shows him how to use it.'],
 ['Glucose meter & test strips','ok','Medical device / in-vitro diagnostic','TMDA (devices and diagnostics)','Registered meters and strips only; strips are tracked by batch and expiry and picked first-expiry-first-out.','Strips are saved to a diabetes member’s account so the right ones arrive in each box.'],
 ['Thermometer, nebuliser, pulse oximeter','ok','Medical device','TMDA (medical devices)','Registered models; written warranty card; tested at the counter before sale.','A mother buys a digital thermometer for a feverish baby and is shown how to read it.'],
 ['Dressings, plasters, first-aid kits','ok','Medical devices / first-aid goods','TMDA (devices) for medical dressings','Registered dressings; first-aid kits are assembled only from registered items. Kits must not include medicines unless sold from a registered pharmacy.','An office buys first-aid kits for each floor.'],
 ['Walking frames, wheelchairs, rental','ok','Mobility aids','TMDA (classification to confirm per item)','Sold or rented with a written condition check; cleaned and serviced between rentals.','A grandmother rents a walking frame after a fall; it is collected when no longer needed.'],
 ['Nappies, wipes, pads, adult diapers','ok','Hygiene products','TBS standards (quality marks)','Products carrying the required TBS certification; no medical claims.','The Mama na Mtoto box delivers nappies and wipes in the right size every month.'],
 ['Baby lotion, skin care, sunscreen','ok','Cosmetics','TBS (cosmetics, since 1 July 2019)','Only TBS-certified products, with ingredients on the label. No skin-lightening or banned ingredients.','Afya Glow box contents are chosen only from certified brands.'],
 ['Vitamins and food supplements','chk','Supplement (depends on claim)','TMDA or TBS, depending on the product and its claims','Classification is confirmed product by product before stocking. Products that make medicinal claims are treated as medicines.','Iron and folic acid for pregnancy may be classed as a medicine: see the next row.'],
 ['Paracetamol, ORS, antacids','ph','Non-prescription medicine','Pharmacy Council (premises, permit, pharmacist) + TMDA (product)','Medicines may be sold only from premises registered under the Pharmacy Act, with a permit, under a pharmacist in charge. The Act has no general carve-out for “over-the-counter” medicines, so Afya Basics never stocks them. The licensed partner pharmacy sells them, under its own permit and pharmacist.','A parent asks for children’s paracetamol at the Afya counter. The adviser sends the request to the partner pharmacist in the app; the pharmacist calls the parent, sells and dispenses the medicine, and the parent pays the pharmacy directly.'],
 ['Iron & folic acid tablets','ph','Medicine','Pharmacy Council + TMDA','As above: sold only by the partner pharmacy. Never relabelled as a supplement to avoid the rule.','An expectant mother on the Mama Mjamzito box orders her iron and folic acid from the partner pharmacy in the same app; the sealed pharmacy bag arrives inside her monthly delivery.'],
 ['Antibiotics, blood-pressure tablets','rx','Prescription medicine','Pharmacy Council + TMDA','Prescription medicines may be sold by retail only against a prescription. Afya Basics never sells them; the partner pharmacy dispenses them against the customer’s prescription, which its pharmacist checks.','The Afya Check flags a high reading and refers to a clinic. When the clinic prescribes tablets, the partner pharmacy dispenses them and can deliver them with the Presha Care box.'],
 ['Insulin, pen needles','rx','Prescription medicine (insulin); device (needles)','Pharmacy Council + TMDA','Insulin is dispensed only by the partner pharmacy against a prescription, from its own cold chain. Pen needles are devices and Afya can sell them when registered.','The Sukari Care box carries needles and strips from Afya; the insulin comes from the partner pharmacy in its own cool bag.']];
const CAL=[
 ['Monthly','TRA returns: VAT and payroll taxes','Accountant','From the Money module'],
 ['Monthly','Fridge and storage temperature log reviewed','Store lead','If temperature-sensitive goods are held'],
 ['Quarterly','Mock recall drill and offline-till test','Store lead','Procedure in the People module'],
 ['Quarterly','Expiry review of all stock due within 90 days','Store lead','Stock module report'],
 ['Before 30 June','Renew TMDA premises permit for devices','Founders','Permits expire 30 June every year'],
 ['Before 30 June','Partner pharmacy: copy of its renewed premises permit and pharmacist registration on file','Founders','Agreement suspended if either lapses'],
 ['Yearly','Business licence and BRELA annual return','Founders','Dates set at registration'],
 ['Yearly','Fire safety inspection and certificate','Store lead','Local fire authority'],
 ['Per product','TMDA device registration / TBS certificate valid','Buyer','Checked before every first order'],
 ['Every 5 years','Renew PDPC data-protection registration','Founders','Apply 3 months before expiry']];
/* ---- 4.5 visual components ---- */
addCSS('p4vis',`
.p4hero2{display:grid;grid-template-columns:1.1fr .9fr;gap:22px;align-items:stretch;margin:4px 0 26px}
.p4hero2 figure{margin:0;border-radius:20px;overflow:hidden;border:1px solid var(--edge2);position:relative;min-height:260px}
.p4hero2 figure img{width:100%;height:100%;object-fit:cover;display:block}
.p4hero2 figcaption{position:absolute;left:12px;bottom:12px;font:500 .62rem/1.3 var(--f-hud,monospace);letter-spacing:.12em;text-transform:uppercase;color:#f3e6c4;background:rgba(2,10,8,.7);padding:6px 10px;border-radius:999px}
.p4stat6{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
.p4stat6 div{border:1px solid var(--edge2);border-radius:14px;padding:14px 16px;background:linear-gradient(180deg,rgba(95,191,143,.06),rgba(0,0,0,0))}
.p4stat6 b{display:block;font:500 1.55rem/1.1 var(--f-display,serif);color:var(--gold2,#d8b25a)}
.p4stat6 span{display:block;margin-top:6px;font-size:.8rem;line-height:1.45;color:var(--ink2)}
.p4vis{margin:18px 0 24px;border:1px solid var(--edge2);border-radius:18px;padding:20px;background:rgba(3,16,12,.6)}
.p4vis>.hd{font:600 .66rem/1.4 var(--f-hud,monospace);letter-spacing:.14em;text-transform:uppercase;color:var(--gold2,#d8b25a);margin-bottom:14px}
.p4vis svg{width:100%;height:auto;display:block}
.p4vis svg text{fill:var(--ink2);font-family:var(--f-body,sans-serif)}
.p4one10{display:grid;grid-template-columns:repeat(10,1fr);gap:8px;margin:6px 0 10px}
.p4one10 i{aspect-ratio:3/4;border-radius:8px;border:1.5px solid rgba(95,191,143,.55);background:rgba(95,191,143,.12)}
.p4one10 i.x{border:1.5px dashed var(--gold2,#d8b25a);background:repeating-linear-gradient(45deg,rgba(216,178,90,.25) 0 4px,transparent 4px 8px)}
.p4one10+p{font-size:.85rem;color:var(--ink2);margin:0}
.p4reg4{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin:6px 0 20px}
.p4reg4 div{border:1px solid var(--edge2);border-radius:16px;padding:16px;background:rgba(3,16,12,.6);border-top:3px solid var(--c)}
.p4reg4 b{display:block;font:600 1.05rem/1.2 var(--f-display,serif);color:var(--ink)}
.p4reg4 small{display:block;margin:4px 0 10px;font:600 .6rem/1.3 var(--f-hud,monospace);letter-spacing:.12em;text-transform:uppercase;color:var(--c)}
.p4reg4 p{margin:0;font-size:.84rem;line-height:1.5;color:var(--ink2)}
.p4steps{display:grid;grid-template-columns:repeat(var(--n),minmax(0,1fr));gap:10px;counter-reset:st}
.p4steps div{position:relative;border:1px solid var(--edge2);border-radius:14px;padding:14px 12px 12px;background:rgba(95,191,143,.05)}
.p4steps div::before{counter-increment:st;content:counter(st);display:grid;place-items:center;width:28px;height:28px;border-radius:50%;background:var(--gold2,#d8b25a);color:#06140f;font:700 .8rem var(--f-body);margin-bottom:10px}
.p4steps b{display:block;font-size:.92rem;color:var(--ink);margin-bottom:4px}
.p4steps span{display:block;font-size:.78rem;line-height:1.45;color:var(--ink2)}
.p4two{display:grid;grid-template-columns:1fr 1fr;gap:20px;align-items:center}
.p4two figure{margin:0;border-radius:18px;overflow:hidden;border:1px solid var(--edge2);position:relative}
.p4two{align-items:start}.p4two figure{aspect-ratio:16/11}.p4two figure img{width:100%;height:100%;display:block;object-fit:cover}
.p4two figcaption{position:absolute;left:10px;bottom:10px;font:500 .6rem/1.3 var(--f-hud,monospace);letter-spacing:.12em;text-transform:uppercase;color:#f3e6c4;background:rgba(2,10,8,.7);padding:5px 9px;border-radius:999px}
.p4ban{border-radius:14px;overflow:hidden;aspect-ratio:21/8}.p4ban img{width:100%;height:100%;object-fit:cover;display:block}
.p4kpi{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.p4kpi div{border:1px solid var(--edge2);border-radius:16px;padding:16px;background:rgba(3,16,12,.6)}
.p4kpi b{display:block;font:500 1.6rem/1.1 var(--f-display,serif);color:var(--gold2,#d8b25a)}
.p4kpi span{display:block;margin-top:8px;font-size:.82rem;line-height:1.45;color:var(--ink2)}
.p4riskv{display:grid;gap:10px}
.p4riskv div{display:grid;grid-template-columns:1fr 1.4fr;gap:16px;border:1px solid var(--edge2);border-radius:14px;padding:14px 16px;background:rgba(3,16,12,.6)}
.p4riskv b{color:var(--gold2,#d8b25a);font-size:.95rem;line-height:1.45}
.p4riskv span{color:var(--ink2);font-size:.9rem;line-height:1.55}
@media (max-width:820px){.p4hero2,.p4two{grid-template-columns:1fr}.p4reg4{grid-template-columns:1fr 1fr}.p4steps{grid-template-columns:1fr 1fr}.p4kpi{grid-template-columns:1fr 1fr}.p4riskv div{grid-template-columns:1fr}.p4one10{gap:4px}}
`);
const V45={
 hero:()=>`<div class="p4hero2"><figure><img src="img/c-stock.webp" width="1680" height="944" loading="lazy" alt="Concept image of the Afya stockroom, shelves labelled by batch and expiry"><figcaption>Concept image · the stockroom, every shelf labelled by batch</figcaption></figure>
  <div class="p4stat6"><div><b>4</b><span>regulators covered: TMDA, the Pharmacy Council, TBS and the PDPC</span></div><div><b>5</b><span>checks on every pack before it reaches a shelf</span></div><div><b>30 days</b><span>before expiry, a batch is pulled from sale automatically</span></div><div><b>Same day</b><span>contact with every affected customer when a recall arrives</span></div><div><b>7 days</b><span>to swap any device that is faulty on arrival</span></div><div><b>0</b><span>medicines sold by Afya: a licensed partner pharmacy sells them</span></div></div></div>`,
 one10:()=>`<div class="p4vis"><div class="hd">One medical product in ten · WHO estimate for low- and middle-income countries</div><div class="p4one10">${'<i></i>'.repeat(9)}<i class="x"></i></div><p>Nine packs genuine and in standard, one substandard or falsified. A customer looking at the shelf cannot tell which.</p></div>`,
 reg:()=>`<div class="p4reg4">
  <div style="--c:#5fbf8f"><b>TMDA</b><small>Medicines and medical devices</small><p>Registers every device Afya sells, licenses the store for devices, receives safety reports, manages recalls.</p></div>
  <div style="--c:#d8b25a"><b>Pharmacy Council</b><small>Pharmacy premises and pharmacists</small><p>Licenses the partner pharmacy and its pharmacist. Afya sells no medicines, so the store itself needs no pharmacy licence.</p></div>
  <div style="--c:#9fd3b8"><b>TBS</b><small>Standards, cosmetics, hygiene</small><p>Certifies cosmetics, skin care, nappies and similar products before they are stocked.</p></div>
  <div style="--c:#c9b8ff"><b>PDPC</b><small>Personal data</small><p>Registers Afya as a data controller; Afya Check readings are sensitive data that need consent.</p></div></div>`,
 flow:()=>`<div class="p4vis"><div class="hd">How one medicine order works · two businesses, one delivery</div>
  <svg viewBox="0 0 900 250" role="img" aria-label="Medicine order flow between Afya Basics and the partner pharmacy">
   <rect x="0" y="0" width="900" height="110" rx="14" fill="rgba(95,191,143,.07)"/><rect x="0" y="130" width="900" height="110" rx="14" fill="rgba(216,178,90,.08)"/>
   <text x="16" y="24" style="font-size:12px;fill:#5fbf8f;font-weight:600">AFYA BASICS</text><text x="16" y="154" style="font-size:12px;fill:#d8b25a;font-weight:600">PARTNER PHARMACY</text>
   ${[[90,55,'1 · Request','Member asks in the app'],[230,185,'2 · Pharmacist','Calls, checks the prescription'],[400,185,'3 · Sale','Pharmacy receipt, paid directly'],[570,185,'4 · Sealed bag','Labelled with the member’s name'],[740,55,'5 · Delivery','Rider carries it with the box']].map(([x,y,a,b])=>`<rect x="${x-78}" y="${y-28}" width="156" height="58" rx="12" fill="#06140f" stroke="rgba(216,178,90,.6)"/><text x="${x}" y="${y-5}" text-anchor="middle" style="font-size:13px;fill:#f3e6c4;font-weight:600">${a}</text><text x="${x}" y="${y+14}" text-anchor="middle" style="font-size:10.5px">${b}</text>`).join('')}
   <path d="M168 55 C200 55 200 185 152 185" fill="none" stroke="#d8b25a" stroke-width="1.6" marker-end="url(#p4ar)"/><path d="M308 185 H322" stroke="#d8b25a" stroke-width="1.6" marker-end="url(#p4ar)"/><path d="M478 185 H492" stroke="#d8b25a" stroke-width="1.6" marker-end="url(#p4ar)"/><path d="M648 185 C700 185 700 55 662 55" fill="none" stroke="#d8b25a" stroke-width="1.6" marker-end="url(#p4ar)"/>
   <defs><marker id="p4ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#d8b25a"/></marker></defs>
   <text x="450" y="96" text-anchor="middle" style="font-size:11px;fill:#9fd3b8">Afya never chooses, opens, sells or takes payment for a medicine</text></svg>
  <span class="p4scrollhint">Swipe sideways to see the whole diagram</span></div>`,
 checks:()=>`<div class="p4vis"><div class="hd">Five checks on every pack before it reaches a shelf</div><div class="p4ban"><img src="img/prod-firstaid.webp" width="1680" height="944" loading="lazy" alt="Concept image of first-aid supplies and sterile dressings laid out for inspection"></div>
  <div class="p4steps" style="--n:5;margin-top:14px"><div><b>Registration</b><span>On TMDA’s register or TBS-certified, or the exemption recorded</span></div><div><b>Label</b><span>Kiswahili or English, maker’s name and address, sterility stated</span></div><div><b>Batch number</b><span>Scanned and linked to the supplier and the delivery</span></div><div><b>Expiry date</b><span>Enough shelf life left; oldest batch sold first</span></div><div><b>Pack integrity</b><span>A torn or damp sterile pack is never sold</span></div></div></div>`,
 fefo:()=>{const W=880,x0=170,days=[['B-2603',21,'22 Nov 2026'],['B-2607',39,'10 Dec 2026'],['B-2609',80,'20 Jan 2027'],['B-2604',302,'30 Aug 2027']],sc=d=>x0+Math.min(d,320)/320*(W-x0-20);
  return `<div class="p4vis"><div class="hd">Four batches of test strips on 1 November 2026 · days left before expiry</div><svg viewBox="0 0 ${W} 240" role="img" aria-label="Days left for four batches, with Afya expiry zones">
   <rect x="${sc(0)}" y="10" width="${sc(30)-sc(0)}" height="170" fill="rgba(216,178,90,.18)"/><rect x="${sc(30)}" y="10" width="${sc(90)-sc(30)}" height="170" fill="rgba(216,178,90,.08)"/><rect x="${sc(90)}" y="10" width="${sc(320)-sc(90)}" height="170" fill="rgba(95,191,143,.07)"/>
   <text x="${(sc(0)+sc(30))/2}" y="200" text-anchor="middle" style="font-size:10.5px;fill:#d8b25a">≤ 30 days · pulled</text><text x="${(sc(30)+sc(90))/2}" y="200" text-anchor="middle" style="font-size:10.5px;fill:#d8b25a">31–90 · front of shelf</text><text x="${(sc(90)+sc(320))/2}" y="200" text-anchor="middle" style="font-size:10.5px;fill:#5fbf8f">over 90 days · sold normally and in monthly boxes</text>
   ${days.map((b,i)=>{const y=24+i*40;return `<text x="0" y="${y+15}" style="font-size:12.5px;fill:#f3e6c4;font-weight:600">${b[0]}</text><text x="74" y="${y+15}" style="font-size:10.5px">${b[2]}</text><rect x="${sc(0)}" y="${y}" width="${sc(b[1])-sc(0)}" height="22" rx="6" fill="${b[1]<=30?'#d8b25a':b[1]<=90?'#b8964a':'#5fbf8f'}" opacity=".9"/><text x="${sc(b[1])+8}" y="${y+15}" style="font-size:12px;fill:#f3e6c4">${b[1]} days</text>`}).join('')}
   <text x="${x0}" y="228" style="font-size:10.5px">The system picks the batch that expires first, never simply the oldest delivery</text></svg>
   <span class="p4scrollhint">Swipe sideways to see the whole chart</span></div>`},
 recall:()=>`<div class="p4vis"><div class="hd">A recall in seven steps · and the worked example on one day</div>
  <div class="p4steps" style="--n:7"><div><b>Alert</b><span>TMDA or the maker notifies a batch</span></div><div><b>Block</b><span>The till refuses the batch barcode</span></div><div><b>Trace</b><span>The system lists every buyer</span></div><div><b>Contact</b><span>SMS, WhatsApp, phone, same day</span></div><div><b>Retrieve</b><span>Collect, refund or replace</span></div><div><b>Report</b><span>To TMDA; stock quarantined</span></div><div><b>Learn</b><span>Cause reviewed with the supplier</span></div></div>
  <svg viewBox="0 0 880 120" role="img" aria-label="Timeline of the recall example" style="margin-top:16px"><line x1="40" y1="50" x2="840" y2="50" stroke="rgba(216,178,90,.5)" stroke-width="2"/>
   ${[[40,'10:00','Class II alert arrives'],[200,'10:05','Till blocks the batch'],[380,'10:10','14 buyers listed'],[600,'13:00','All 14 contacted'],[840,'16:00','Replacements delivered']].map(([x,t,l])=>`<circle cx="${x}" cy="50" r="7" fill="#d8b25a"/><text x="${x}" y="30" text-anchor="middle" style="font-size:12.5px;fill:#f3e6c4;font-weight:600">${t}</text><text x="${x}" y="80" text-anchor="middle" style="font-size:10.5px">${l}</text>`).join('')}</svg>
  <p class="note" style="margin-top:6px">TMDA deadlines: Class I within 14 days, Class II within 21, Class III within 30 · Afya target: every affected customer contacted the same day</p></div>`,
 after:()=>`<div class="p4two"><figure><img src="img/e2/qc.webp" width="1680" height="944" loading="lazy" alt="Concept image of a blood-pressure monitor and cuff on a white surface"><figcaption>Concept image · a device with its written warranty</figcaption></figure>
  <div class="p4kpi" style="grid-template-columns:1fr 1fr"><div><b>7 days</b><span>faulty-on-arrival swap, in store or at the door</span></div><div><b>Free</b><span>monitor accuracy check at the Afya Check, any time</span></div><div><b>Every hire</b><span>rentals cleaned, inspected and photographed</span></div><div><b>Clear</b><span>return rules shown at the counter and in the app</span></div></div></div>`,
 cal:()=>{const M=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `<div class="p4vis"><div class="hd">The compliance year · what falls due, month by month</div><svg viewBox="0 0 880 210" role="img" aria-label="Compliance calendar across twelve months">
   ${M.map((m,i)=>{const x=20+i*71;return `<rect x="${x}" y="20" width="64" height="30" rx="8" fill="${i===5?'rgba(216,178,90,.35)':'rgba(95,191,143,.1)'}"/><text x="${x+32}" y="40" text-anchor="middle" style="font-size:12px;fill:#f3e6c4">${m}</text><circle cx="${x+32}" cy="68" r="4" fill="#5fbf8f"/>${i%3===2?`<circle cx="${x+32}" cy="84" r="4" fill="#9fd3b8"/>`:''}`}).join('')}
   <circle cx="30" cy="120" r="5" fill="#5fbf8f"/><text x="42" y="124" style="font-size:12px">Every month · VAT and payroll returns, temperature and complaint logs reviewed</text>
   <circle cx="30" cy="146" r="5" fill="#9fd3b8"/><text x="42" y="150" style="font-size:12px">Every quarter · mock recall, offline-till test, expiry review of stock due within 90 days</text>
   <rect x="24" y="166" width="12" height="12" rx="3" fill="rgba(216,178,90,.6)"/><text x="42" y="177" style="font-size:12px">June · TMDA device permit renewed before 30 June; partner pharmacy licences filed</text>
   <text x="42" y="202" style="font-size:12px">Yearly on set dates · business licence, OSHA licence, fire certificate · every 5 years · PDPC registration</text></svg>
   <span class="p4scrollhint">Swipe sideways to see the whole calendar</span></div>`},
 cost:()=>`<div class="p4vis"><div class="hd">Known fees against the yearly licence and insurance budget</div><svg viewBox="0 0 880 120" role="img" aria-label="Known fees compared with the budget">
   <rect x="20" y="20" width="840" height="34" rx="8" fill="rgba(95,191,143,.12)"/><rect x="20" y="20" width="${Math.max(6,840*(60000+20000)/6000000)}" height="34" rx="8" fill="#d8b25a"/>
   <text x="20" y="80" style="font-size:12.5px;fill:#f3e6c4">Published fees about TSh 80,000 a year (TMDA permit TSh 60,000; PDPC TSh 100,000 over five years)</text>
   <text x="860" y="80" text-anchor="end" style="font-size:12.5px">Budget TSh 6,000,000 a year</text>
   <text x="20" y="106" style="font-size:11px">The rest covers insurance and the fees set at inspection (OSHA, fire, business licence)</text></svg></div>`,
 kpi:()=>`<div class="p4kpi"><div><b>0</b><span>expired or recalled units sold</span></div><div><b>100%</b><span>deliveries checked for batch and expiry on arrival</span></div><div><b>0</b><span>temperature or humidity alarms left unreviewed after 24 hours</span></div><div><b>95%</b><span>complaints acknowledged within 5 minutes</span></div><div><b>90%</b><span>complaints closed within 5 days, with the customer’s agreement</span></div><div><b>1 hour</b><span>to list every affected customer in a mock recall</span></div></div>`
};

function sec45(s,p,pv,nx){css();const c=S45;
 const recall=`<svg viewBox="0 0 780 250" role="img" aria-label="Recall procedure in seven steps">
  ${[['Alert','TMDA or maker','notifies a batch'],['Block','till refuses','the batch barcode'],['Trace','system lists','every buyer'],['Contact','SMS, WhatsApp,','phone calls'],['Retrieve','collect, refund','or replace'],['Report','to TMDA,','quarantine stock'],['Learn','root cause,','supplier review']].map((st,i)=>{const x=20+i*110;const y=i%2?120:40;return `<rect class="st${i===0||i===6?' g':''}" x="${x}" y="${y}" width="96" height="82" rx="14"/><text class="n" x="${x+48}" y="${y+18}">0${i+1}</text><text x="${x+48}" y="${y+38}">${st[0]}</text><text class="s" x="${x+48}" y="${y+56}">${st[1]}</text><text class="s" x="${x+48}" y="${y+70}">${st[2]}</text>`}).join('')}
  <path id="p4rcp" class="ar" d="M116 81 C 125 81, 125 161, 130 161 M226 161 C 235 161, 235 81, 240 81 M336 81 C 345 81, 345 161, 350 161 M446 161 C 455 161, 455 81, 460 81 M556 81 C 565 81, 565 161, 570 161 M666 161 C 675 161, 675 81, 680 81"/>
  <circle class="pulse" r="5"><animateMotion dur="5s" repeatCount="indefinite" path="M68 81 L116 81 C 125 81, 125 161, 130 161 L226 161 C 235 161, 235 81, 240 81 L336 81 C 345 81, 345 161, 350 161 L446 161 C 455 161, 455 81, 460 81 L556 81 C 565 81, 565 161, 570 161 L666 161 C 675 161, 675 81, 680 81 L728 81"/></circle>
  <text class="s" x="390" y="232" style="fill:#ffe7a8;font-size:12px">Target: every affected customer contacted the same day the alert arrives</text></svg>`;
 return secShell({s,p,pv,nx,cls:'p4',img:'img/c-stock.webp),url(img/interior.webp',imgAlt:'Concept image of the Afya stockroom, every shelf labelled by batch and expiry',
  h1:'Registered, in date, traceable,',em:'or it is not on our shelf.',
  lede:'Trust is the product. Every item is registered with the correct authority, sold within its date, traceable to its batch and covered by a written warranty. The business is planned around what Tanzanian law allows a health-essentials store to sell.',
  mods:[
  ['In summary · what this section shows',`${V45.hero()}<div class="p4prose">
   <p class="p4sum">Every product Afya Basics sells must be registered with the right authority, sold well within its expiry date, traceable to its batch, and backed by a written warranty. A product whose status is unclear is not stocked until it is clarified.</p>
   <p>This section explains which authorities regulate which products, what Afya Basics is allowed to sell and why it does not sell medicines itself, how a product earns its place on the shelf, how stock is kept safe and in date, what happens when a customer complains or a product is recalled, which licences the business needs and when they are renewed, and what all of this costs. Compliance here is not only a cost: in a market where about one medical product in ten is substandard or falsified ${c('who')}, being able to prove that every pack is genuine and in date is one of the main reasons a family will switch to Afya Basics.</p></div>`],
  ['Why quality is the product',`<div class="p4prose">
   <p>A family buying a glucose meter, a pack of test strips or sterile dressings usually cannot tell whether the product is genuine, whether it is close to its expiry date, or whether it was stored correctly. The World Health Organization estimates that about one in ten medical products in low- and middle-income countries is substandard or falsified ${c('who')}. A test strip that has been stored in heat gives a wrong reading; a wrong reading leads to a wrong decision about medication.</p>${V45.one10()}
   <p>Expired stock also reaches homes when a shop has no record of batches and dates. New deliveries are put in front of old ones, and the old stock sits at the back until it is either sold or thrown away.</p>
   <p>The rules themselves are strict and split between several regulators. Medicines, medical devices, cosmetics and personal data each have their own authority. Selling medicinal products outside registered premises is an offence that can bring a fine of up to TSh 10 million, two years in prison, or both ${c('pa')}.</p>
   <p>Finally, most shops have no route for after-sale problems. If a blood-pressure monitor reads inconsistently, or a batch is recalled, the customer often has nowhere to go. Afya Basics treats each of these four problems as part of the service it sells.</p></div>`],
  ['Who regulates what, and what it means for Afya Basics',`${V45.reg()}<div class="p4prose">
   <p><b>TMDA, the Tanzania Medicines and Medical Devices Authority,</b> registers medicines, medical devices and diagnostics, licenses the premises that store and sell them, issues import permits, receives safety reports and manages recalls ${c('tmda')}. For Afya Basics this means three things: every device on the shelf, from a thermometer to a glucose meter, must be registered or notified with TMDA; the store itself must hold a TMDA permit for dealing in medical devices, which expires every year on 30 June ${c('prem')}; and any safety problem with a device must be reported to TMDA.</p>
   <p><b>The Pharmacy Council</b> registers pharmacy premises and pharmacists. Under the Pharmacy Act, medicinal products may be sold only from registered premises with a permit, and each retail pharmacy must be run by a registered pharmacist in charge ${c('pa')}. Because Afya Basics does not sell medicines, the store does not need Pharmacy Council registration. The partner pharmacy that sells medicines to Afya customers does.</p>
   <p><b>TBS, the Tanzania Bureau of Standards,</b> took over the control of cosmetics and food products from 1 July 2019 and certifies their quality and safety ${c('tbs')}. Baby lotion, sunscreen, skin care, nappies and similar products must carry the required TBS certification.</p>
   <p><b>The PDPC, the Personal Data Protection Commission,</b> registers every business that collects personal data. Health data, such as an Afya Check reading, is sensitive personal data and needs the customer’s explicit consent ${c('clyde')}. The handling of data is explained in section 4.1.</p>
   <p>Afya Basics applies the strictest of the four standards to everything it sells: if it is not clear which authority regulates a product, the product is not stocked until the authority confirms it in writing.</p></div>`],
  ['What Afya Basics sells, and why medicines come from a partner pharmacy',`<div class="p4prose">
   <p>This is the most important compliance decision in the business, and it has been made. Afya Basics sells medical devices and diagnostics, first-aid supplies, hygiene products, mother-and-baby products, mobility aids and cosmetics. It does not sell, dispense or take payment for any medicine, including simple ones such as paracetamol or oral rehydration salts, because the Pharmacy Act contains no general exception for over-the-counter medicines ${c('pa')}.</p>
   <p>Medicines are still part of what members need, so they come from a licensed retail pharmacy near the store, under a written agreement. The partner pharmacy is registered with the Pharmacy Council and run by its own pharmacist in charge ${c('tfda')}.</p>
   ${V45.flow()}<div class="p4ex"><span>Example · a member who needs medicine</span><p>Mama Neema is a Presha Care member. Her clinic has prescribed blood-pressure tablets. In the Afya app she adds “medicines from the pharmacy” to her monthly order. The partner pharmacist calls her, checks the prescription and confirms the medicine and the dose. The pharmacy sells the tablets on its own receipt, and Mama Neema pays the pharmacy directly through its own mobile-money number. The pharmacy packs the tablets in a sealed bag labelled with her name and the pharmacy’s details. When the Afya rider collects her monthly box, the sealed bag travels with it and is handed over with the same confirmation code. At no point does any Afya employee choose, open, sell or take payment for the medicine.</p></div>
   <p>The written agreement covers five points. The pharmacy keeps its premises permit and its pharmacist’s registration current and sends copies every June; if either lapses, the agreement is suspended the same day. The pharmacy pays Afya a fixed fee for each sealed bag delivered; the amount is to be agreed and the financial model counts none of it, so any fee is extra income. Customer details are shared only with the customer’s consent, under the data-protection law. The customer is free to use any pharmacy. And before launch, a Tanzanian regulatory lawyer and the Pharmacy Council confirm that Afya’s riders may carry the sealed bag; if they may not, the customer collects the bag from the pharmacy and Afya delivers only its own products.</p>
   <p>The alternative, opening Afya’s own pharmacy counter, would require registering the store as a pharmacy, employing a pharmacist in charge and meeting the licensing rules on premises, which have included a minimum distance from existing pharmacies ${c('tfda')}. The partner route keeps the flagship’s choice of site open and its payroll at eight people, while members still receive their medicines from a licensed source.</p>
   <p>The product list below shows the status of each type of product. Select one to see the regulator, Afya’s rule and an example.</p>
   <div class="p4lgd">${Object.values(TIER).map(t=>`<span style="--c:${t[0]}">${t[1]}</span>`).join('')}</div>
   <div class="p4pc"><div class="p4plist" id="p4plist">${PROD.map((x,i)=>`<button type="button" data-i="${i}" style="--c:${TIER[x[1]][0]}"><i></i>${esc(x[0])}</button>`).join('')}</div><div class="p4verd" id="p4verd" aria-live="polite"></div></div>
   <p class="note">Not legal advice · each product’s classification is confirmed with TMDA, TBS and the Pharmacy Council before it is stocked · a Tanzanian regulatory lawyer reviews this list before launch</p></div>`],
  ['How a product earns its place on the shelf',`<div class="p4prose">
   <p>Before any product reaches a shelf, two things have happened. Its supplier has been approved, and the specific delivery has passed five checks.</p>
   <p>Supplier approval is described in section 4.2: the supplier’s licence is checked, each product’s registration is confirmed against TMDA’s public register or TBS’s certificate, samples are inspected and references are taken. Only approved suppliers can be selected when a purchase order is raised.</p>${V45.checks()}
   <p>When a delivery arrives, the picker and a second person check it at the door against the purchase order.</p>
   <div class="p4ex"><span>Example · five checks on a box of sterile dressings</span><p>A parent will later buy these dressings after a child’s fall. Before they reach the Mobility &amp; Recovery shelf: 1. Registration: the dressing is on TMDA’s register, or the correct exemption is recorded. 2. Label: the label is in Kiswahili or English, shows the maker’s name and address, and states that the product is sterile and how it was sterilised. 3. Batch number: scanned and linked to the supplier and to this delivery, so every future sale can be traced. 4. Expiry date: enough shelf life is left on arrival, and the system will sell the oldest batch first. 5. Pack integrity: a sterile pack that is torn or damp is no longer sterile and is never sold. If any of the five is missing, the system refuses to accept the item, and the till will refuse its barcode.</p></div>
   <p>Imported products must also arrive with enough shelf life. TMDA’s rule is at least 60% of the total shelf life remaining for products with more than 24 months of shelf life, and at least 80% for products with 24 months or less ${c('imp')}. Afya applies the same rule to products bought locally.</p></div>`],
  ['Keeping stock safe and in date',`<div class="p4prose">
   <p>Most test strips, devices and dressings are labelled for storage at normal room temperature and away from humidity. Afya keeps the shop floor and the stockroom between 15 and 25 °C and below 65% humidity. Small data loggers record both every 15 minutes and raise an alarm if either goes out of range; the store lead reviews any alarm within 24 hours. If a product needs a different range, the system records it and the product is stored accordingly.</p>
   <p>Stock is issued first-expiry-first-out: the system always directs the picker to the batch that expires soonest, not to the one that arrived first. Afya’s rules are simple. A product with more than 90 days left is sold normally. Between 31 and 90 days it is moved to the front of the shelf and an alert is raised. A monthly Afya Box only ever contains products with more than 90 days left, so nothing expires in a member’s home before the next box arrives. At 30 days or less the product is pulled from sale automatically and returned to the supplier or destroyed, and the destruction is recorded.</p>
   <div class="p4ex"><span>Worked example · four batches of glucose test strips</span><p>The stockroom holds four batches: B-2603 expiring on 22 November 2026, B-2607 on 10 December 2026, B-2609 on 20 January 2027 and B-2604 on 30 August 2027. On 1 November, B-2603 has 21 days left, so the system has already pulled it from sale and listed it for return. B-2607 has 39 days left: it is sold first in the store, from the front of the shelf, but it cannot go into a monthly box. B-2609 has 80 days left and is also front-of-shelf only. B-2604, with 302 days left, is the only batch that goes into monthly boxes. A first-in-first-out system would have picked B-2603, the oldest delivery, and sold an almost-expired pack.</p></div>${V45.fefo()}</div>`],
  ['When something goes wrong · complaints, safety reports and recalls',`<div class="p4prose">
   <p>All complaints go into one log, whether they arrive in the store, on WhatsApp or by phone. During opening hours every complaint is acknowledged within five minutes, owned by the store lead and closed only when the customer agrees it is resolved. A complaint about the safety or performance of a product is also reported to TMDA, which accepts reports through its online tools and the USSD code *152*00# ${c('tmda')}.</p>
   <p>A recall is when a maker or TMDA withdraws a batch from the market. Because every unit Afya sells is linked to its batch, and for members and app buyers also to the customer, the system can list every affected household within seconds. Afya follows seven steps: the alert is received; the till is set to refuse the batch barcode; the system traces every buyer; each one is contacted by SMS, WhatsApp or phone the same day; the product is collected, refunded or replaced; the return is reported to TMDA and the stock quarantined; and the cause is reviewed with the supplier.</p>
   <p>TMDA sets deadlines by risk. A Class I recall, the most serious, must be completed within 14 days; Class II within 21 days; and Class III within 30 days. A recalled product may not be sold, offered or displayed ${c('recall')}. Afya’s own target is stricter: every affected customer contacted on the day the alert arrives.</p>
   ${V45.recall()}<div class="p4ex"><span>Example · a recalled batch of test strips</span><p>At 10:00 TMDA notifies a Class II recall of one batch of test strips. By 10:05 the till refuses that batch. The system shows 14 units sold: 9 to Sukari Care members inside their monthly boxes and 5 to walk-in customers who gave their phone number for their receipt. By 13:00 all 14 have been contacted. The members receive replacement strips from a different batch in the afternoon delivery wave; the walk-in customers are offered a refund or a replacement in the store. The 22 units still in the stockroom are quarantined, and the return report is sent to TMDA the same week.</p></div>
   <p>Every quarter the team runs a mock recall on a real batch, without contacting customers, to prove that the full list can be produced within one hour.</p></div>`],
  ['After the sale · warranty, accuracy checks, rentals and returns',`${V45.after()}<div class="p4prose">
   <p>Most shops end the relationship at the till. With health products, the important moments often come later.</p>
   <p>Every device carries an Afya warranty card that states the maker’s warranty period and is linked to the customer’s phone number, so no paper receipt is needed. A device that is faulty within seven days of purchase is replaced in the store or at the door. After seven days, Afya manages the warranty claim with the supplier on the customer’s behalf.</p>
   <p>Home blood-pressure monitors drift over time, cuffs wear and batteries weaken. Any customer can bring their monitor to the Afya Check kiosk and compare its reading with the kiosk’s, free of charge, at any time. Customers who trust their readings keep measuring, which is what their doctors want.</p>
   <p>Rental equipment, such as walking frames and wheelchairs, is cleaned, inspected and logged between customers, with photographs of its condition and a signed handover record. After a device purchase or a red Afya Check reading, a follow-up call is scheduled for the adviser, with the customer’s consent.</p>
   <p>Return rules are displayed at the counter and in the app: unopened, non-hygiene items can be returned; opened hygiene and medical items cannot, for safety reasons.</p></div>`],
  ['Licences, renewals and the compliance calendar',`<div class="p4prose">
   <p>A business like Afya Basics needs a set of registrations before it opens and a set of renewals every year. Missing a renewal can close the store, so each one is entered in the system with an owner and a due date, and an alert is raised 60 days before it falls due. The founders do not have to remember them.</p>
   <p>Before opening, the company is incorporated with BRELA, registers for tax with TRA (a TIN within 15 days of starting business, and VAT because taxable sales will pass TSh 100 million a year), obtains a business licence, registers the workplace with OSHA, registers with the Workers Compensation Fund within 30 days of hiring the first employee, obtains a fire safety certificate after an inspection, obtains the TMDA permit for dealing in medical devices, and registers with the PDPC ${c('rsm')}. The full step-by-step plan, with costs and dates, is in section 7.1.</p>
   <p>After opening, the recurring duties are: VAT and payroll returns every month; the temperature log and complaint log reviewed every month; a mock recall and an offline-till test every quarter; an expiry review of all stock due within 90 days every quarter; the TMDA permit renewed before 30 June every year; the partner pharmacy’s renewed permit and pharmacist registration filed every June; the business licence, OSHA compliance licence and fire certificate renewed every year; each product’s TMDA registration or TBS certificate checked before every first order; and the PDPC registration renewed every five years.</p>${V45.cal()}</div>`],
  ['What compliance costs',`<div class="p4prose">
   <p>The master model sets aside TSh 500,000 a month, TSh 6 million a year, for insurance and licences. The fees that are published are small compared with that amount:</p>
   <div class="p4tblw"><table class="p4tbl"><thead><tr><th>Item</th><th>Authority</th><th>Fee</th><th>How often</th></tr></thead><tbody>
    <tr><td>Dealer’s permit for medical devices, retail</td><td>TMDA</td><td>TSh 60,000 ${c('fee')}</td><td>Every year, by 30 June</td></tr>
    <tr><td>Data-protection registration, small business</td><td>PDPC</td><td>TSh 100,000; renewal TSh 50,000 ${c('pdpc')}</td><td>Every 5 years</td></tr>
    <tr><td>Workplace registration and compliance licence</td><td>OSHA</td><td>Set at inspection</td><td>Licence every year</td></tr>
    <tr><td>Fire safety certificate</td><td>Fire and Rescue Force</td><td>Set at inspection</td><td>Every year</td></tr>
    <tr><td>Business licence</td><td>Municipal council or ministry</td><td>Set by type of business</td><td>Every year</td></tr>
    <tr><td>Product registration</td><td>TMDA</td><td>None for Afya at launch</td><td>—</td></tr></tbody></table></div>${V45.cost()}
   <p>Product registration costs Afya nothing at launch for a simple reason. An imported device must be registered with TMDA, which can take up to 240 days for Classes B to D ${c('omc')}, and the holder of the registration then pays a yearly retention fee: USD 200 for each registered imported device and USD 50 for each notified Class A device ${c('ret')}. At launch Afya buys only brands that their Tanzanian distributors have already registered, and the distributors carry those fees. If Afya later imports devices under its own label, each product’s registration and retention fee is added to its landed cost in section 4.2 before it is ordered.</p>
   <p>The rest of the TSh 6 million covers insurance for the stock, the premises and public liability, and the fees that are set at inspection. The TMDA permit fee shown is from the most recent published fee schedule found (October 2011) and is confirmed with TMDA before filing.</p></div>`],
  ['The monthly quality review',`<div class="p4prose">
   <p>Once a month both founders read a one-page quality report produced by the system. It shows six numbers, each with a fixed target.</p>
   ${V45.kpi()}
   <p>Any number that misses its target is written up with a cause and an action, and checked again the next month. The same report is shared with the board (section 7.2).</p></div>`],
  ['What could go wrong, and what we do about it',`<div class="p4riskv"><div><b>The partner pharmacy loses its licence, or the courier step is not approved.</b><span>The agreement is suspended the same day, and a second licensed pharmacy is kept on standby under the same terms. If riders may not carry the sealed bag, customers collect it from the pharmacy and Afya delivers only its own products.</span></div><div><b>Device registration takes up to 240 days for Classes B to D.</b><span>Afya launches only with brands that are already registered ${c('omc')} and starts registering any preferred brands as soon as the company is formed.</span></div><div><b>It is not clear which authority regulates a product,</b><span>for example some supplements or mobility aids. The product stays off the shelf until TMDA or TBS confirms its classification in writing.</span></div><div><b>Rules and fees change.</b><span>A Tanzanian regulatory adviser reviews the compliance calendar every year, and changes are recorded in section 7.1.</span></div><div><b>A falsified or recalled product reaches a customer.</b><span>Six supplier gates (section 4.2), batch tracing, same-day contact with every affected customer and full disclosure of what happened limit the harm and protect trust.</span></div></div>`]],
  takeaway:'Where <b>trust is scarce</b>, being provably registered, in date and traceable is <b>a reason for customers to switch</b>, not only a cost. Settling licensing choices now protects <b>the launch date and the brand</b>.',
  doors:['s4-2','s7-1','s7-3','s3-6'],sources:c.list});}

function init45(){const g=id=>document.getElementById(id);if(!g('p4verd'))return;
 const pb=[...document.querySelectorAll('#p4plist button')];
 const sp=i=>{const x=PROD[i],t=TIER[x[1]];pb.forEach((b,k)=>b.classList.toggle('on',k===i));const v=g('p4verd');v.style.setProperty('--c',t[0]);
  v.innerHTML=`<span class="st">${t[1]}</span><h3>${esc(x[0])}</h3><dl><dt>What it is</dt><dd>${x[2]}</dd><dt>Regulator</dt><dd>${x[3]}</dd><dt>Our rule</dt><dd>${x[4]}</dd><dt>Example</dt><dd>${x[5]} <span class="tagi">Illustrative</span></dd></dl>`};
 pb.forEach((b,i)=>b.onclick=()=>sp(i));sp(0);if(!g('p4shelf'))return;
 // FEFO
 const today=new Date('2026-11-01');const B0=[['B-2604','2027-08-30',6,'Apr 2026'],['B-2607','2026-12-10',4,'Jul 2026'],['B-2609','2027-01-20',5,'Sep 2026'],['B-2603','2026-11-22',2,'Mar 2026']];
 let B;const days=d=>Math.round((new Date(d)-today)/864e5);
 const fmtD=d=>new Date(d).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});
 const cls=b=>{const d=days(b[1]);return d<=30?'r':d<=90?'a':'ok'};
 const lab=b=>{const d=days(b[1]);return d<=30?'pull from sale':d<=90?d+' days · front':d+' days left'};
 const draw=(hi)=>{g('p4shelf').innerHTML=B.map((b,i)=>`<div class="p4bt ${cls(b)}${b[2]===0?' out':''}${hi===i?' pick':''}"><small>Batch ${b[0]} · received ${b[3]}</small><b>${fmtD(b[1])}</b><div class="q">${'<i></i>'.repeat(b[2])}</div><span class="tg">${b[2]===0?'empty':lab(b)}</span></div>`).join('')};
 const log=h=>g('p4flog').insertAdjacentHTML('afterbegin',`<li>${h}</li>`);
 const reset=()=>{B=B0.map(x=>x.slice());g('p4flog').innerHTML='';draw();log('Batch B-2603 has 21 days left: the system has already pulled it from sale and listed it for return to the supplier.')};reset();
 g('p4freset').onclick=reset;
 g('p4pick').onclick=()=>{const c=B.map((b,i)=>[b,i]).filter(([b])=>b[2]>0&&days(b[1])>30).sort((a,b)=>new Date(a[0][1])-new Date(b[0][1]));
  if(!c.length){log('<b>Nothing sellable left.</b> The reorder point has passed; reset the demo.');return}const [b,i]=c[0];b[2]--;draw(i);log(`<b>Picked from ${b[0]}</b> (expires ${fmtD(b[1])}, ${days(b[1])} days). ${days(b[1])<=90?'Fine for a walk-in sale today; never used in a monthly box.':'Earliest sellable expiry on the shelf.'}`)};
 g('p4fifo').onclick=()=>{const c=B.map((b,i)=>[b,i]).filter(([b])=>b[2]>0).sort((a,b)=>new Date('1 '+a[0][3])-new Date('1 '+b[0][3]));if(!c.length)return;const [b,i]=c[0];draw(i);
  log(`<b>FIFO would pick ${b[0]}</b> (received ${b[3]}) only because it arrived first${days(b[1])<=30?', although it expires in '+days(b[1])+' days. FEFO blocks it.':'. FEFO looks at the expiry date instead.'}`)};
 // calendar
 const st=CAL.map(()=>false),r=g('p4ccr');
 const up=()=>{const n=st.filter(Boolean).length,f=n/CAL.length;r.style.strokeDashoffset=326.7*(1-f);g('p4ccv').textContent=Math.round(f*100)+'%';g('p4ccn').textContent=`${n} of ${CAL.length} in place`+(n===CAL.length?' · ready to trade':' · alerts raised for the rest')};
 document.querySelectorAll('#p4ccl input').forEach(c=>c.onchange=()=>{st[+c.dataset.i]=c.checked;up()});up()}

window.SECTIONS['s4-1']={render:sec41,init:init41};
window.SECTIONS['s4-2']={render:sec42,init:init42};
window.SECTIONS['s4-3']={render:sec43,init:init43};
window.SECTIONS['s4-4']={render:sec44,init:init44};
window.SECTIONS['s4-5']={render:sec45,init:init45};
})();
